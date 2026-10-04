'use strict';

// Tests del renderizador PDF con campos rellenables (AcroForm).
// Cubren: apertura del PDF con pdf-lib, presencia de un formulario con al
// menos dos campos (uno de ellos PDFTextField) y render de acentos (WinAnsi).

const test = require('node:test');
const assert = require('node:assert');
const os = require('node:os');
const path = require('node:path');
const fs = require('node:fs');

const { PDFDocument, PDFTextField } = require('pdf-lib');

const { renderPdf } = require('../tools/render-pdf.js');
const blocks = require('../tools/blocks.js');

// Definición mínima con campos sueltos y un bloque de firmas vacío.
function definicionPrueba() {
  return [
    blocks.title('Carta de prueba'),
    blocks.p('Párrafo de prueba con acentos: á é í ó ú ñ ¿ ¡.'),
    blocks.field('Nombre y Apellido'),
    blocks.field('Cédula de Identidad'),
    blocks.signatureBlock([
      { rol: 'EL/LA TRABAJADOR(A)', nombre: '', cargo: '', ci: '', fecha: '' },
    ]),
  ];
}

test('genera un PDF que abre con pdf-lib', async () => {
  const bytes = await renderPdf(definicionPrueba(), { empresa: 'EMPRESA DE PRUEBA' });

  const pdf = await PDFDocument.load(bytes);
  assert.ok(pdf.getPageCount() >= 1, 'el PDF debe tener al menos una página');
});

test('el formulario tiene >= 2 campos y al menos uno es PDFTextField', async () => {
  const bytes = await renderPdf(definicionPrueba(), { empresa: 'EMPRESA DE PRUEBA' });
  const pdf = await PDFDocument.load(bytes);

  const campos = pdf.getForm().getFields();
  assert.ok(campos.length >= 2, `esperaba >= 2 campos, hay ${campos.length}`);
  assert.ok(
    campos.some((c) => c instanceof PDFTextField),
    'al menos un campo debe ser PDFTextField',
  );
});

test('los campos tienen nombres únicos y estables', async () => {
  const bytes = await renderPdf(definicionPrueba(), { empresa: 'EMPRESA DE PRUEBA' });
  const pdf = await PDFDocument.load(bytes);

  const nombres = pdf.getForm().getFields().map((f) => f.getName());
  assert.strictEqual(
    new Set(nombres).size,
    nombres.length,
    `los nombres no deben repetirse: ${nombres.join(', ')}`,
  );
  assert.ok(nombres.includes('nombre_1'), `falta nombre_1 en: ${nombres.join(', ')}`);
  assert.ok(nombres.includes('cedula_1'), `falta cedula_1 en: ${nombres.join(', ')}`);
});

test('renderiza acentos sin lanzar y produce un PDF válido que se reabre', async () => {
  const bytes = await renderPdf([blocks.p('á é í ó ú ñ ¿ ¡ Á É Í Ó Ú Ñ')], {
    empresa: 'EMPRESA DE PRUEBA',
  });

  const pdf = await PDFDocument.load(bytes);
  assert.ok(pdf.getPageCount() >= 1);

  // pdf-lib no extrae texto: comprobamos que el archivo se guarda y reabre.
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kit-pdf-'));
  const destino = path.join(dir, 'acentos.pdf');
  fs.writeFileSync(destino, bytes);

  const reabierto = await PDFDocument.load(fs.readFileSync(destino));
  assert.ok(reabierto.getPageCount() >= 1);
  assert.ok(fs.statSync(destino).size > 0);

  fs.rmSync(dir, { recursive: true, force: true });
});
