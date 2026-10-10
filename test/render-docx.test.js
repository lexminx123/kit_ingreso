'use strict';

const test = require('node:test');
const assert = require('node:assert');
const os = require('node:os');
const path = require('node:path');
const fs = require('node:fs');
const JSZip = require('jszip');

const { renderDocx } = require('../tools/render-docx.js');
const blocks = require('../tools/blocks.js');

// Genera un buffer .docx y comprueba que es un ZIP válido con word/document.xml.
test('genera un .docx válido que contiene word/document.xml', async () => {
  const definicion = [
    blocks.title('Carta de prueba'),
    blocks.p('Párrafo de prueba con texto.'),
    blocks.field('Nombre', { label: 'Nombre y Apellido' }),
    blocks.pageBreak(),
  ];

  const buf = await renderDocx(definicion, { empresa: 'EMPRESA DE PRUEBA' });

  assert.ok(Buffer.isBuffer(buf), 'renderDocx debe devolver un Buffer');

  const zip = await JSZip.loadAsync(buf);
  assert.ok(zip.file('word/document.xml'), 'el .docx debe contener word/document.xml');

  const xml = await zip.file('word/document.xml').async('string');
  assert.match(xml, /Carta de prueba/, 'el XML debe incluir el texto de los bloques');
});

test('escribe el .docx en un archivo temporal abrible con jszip', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kit-ingreso-'));
  const destino = path.join(dir, 'prueba.docx');

  const buf = await renderDocx([blocks.title('Temporal')], { empresa: 'X' });
  fs.writeFileSync(destino, buf);

  const zip = await JSZip.loadAsync(fs.readFileSync(destino));
  assert.ok(zip.file('word/document.xml'));
  fs.rmSync(dir, { recursive: true, force: true });
});

// Reproducibilidad: el .docx fija sus fechas internas (ver tools/render-docx.js).
test('el .docx sella fechas constantes en docProps/core.xml', async () => {
  const buf = await renderDocx([blocks.title('Repro')], { empresa: 'X' });
  const zip = await JSZip.loadAsync(buf);
  const core = await zip.file('docProps/core.xml').async('string');
  assert.match(core, /<dcterms:created[^>]*>2026-01-01T00:00:00Z<\/dcterms:created>/);
  assert.match(core, /<dcterms:modified[^>]*>2026-01-01T00:00:00Z<\/dcterms:modified>/);
});

test('dos .docx del mismo contenido son byte-idénticos', async () => {
  const definicion = [blocks.title('Repro'), blocks.p('Mismo contenido.')];
  const a = await renderDocx(definicion, { empresa: 'X' });
  const b = await renderDocx(definicion, { empresa: 'X' });
  assert.ok(a.equals(b), 'el .docx debe ser reproducible byte a byte');
});
