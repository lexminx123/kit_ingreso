'use strict';

// Renderizador de la lista de bloques (tools/blocks.js) a un PDF A4 con
// formulario AcroForm.
//
// Cada bloque `field` y cada dato vacío de un `signatureBlock` se convierte en
// un PDFTextField rellenable colocado sobre la línea en blanco que dibuja el
// motor de layout. Los nombres de campo son únicos y estables.

const { PDFDocument, rgb } = require('pdf-lib');
const { PdfLayout } = require('./layout-pdf.js');

/** Normaliza un texto a una clave ASCII en minúsculas y con guiones bajos. */
function slug(texto) {
  return String(texto)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita tildes/diéresis
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/** Nombre base estable del campo a partir de su etiqueta. */
function nombreBase(label) {
  const s = slug(label);
  if (s.includes('nombre')) return 'nombre';
  if (s.includes('cedula')) return 'cedula';
  if (s.includes('cargo')) return 'cargo';
  if (s.includes('fecha')) return 'fecha';
  return s || 'campo';
}

/**
 * Convierte una lista de bloques a bytes de un PDF con AcroForm.
 * @param {Array} blocks
 * @param {{empresa?:string}} [options]
 * @returns {Promise<Uint8Array>}
 */
async function renderPdf(blocks, options = {}) {
  const doc = await PDFDocument.create();
  const layout = new PdfLayout(doc, options);
  await layout.iniciar();

  let numeroItem = 0;

  for (const bloque of blocks) {
    switch (bloque.type) {
      case 'title':
        layout.titulo(bloque.text);
        break;
      case 'subtitle':
        layout.subtitulo(bloque.text);
        break;
      case 'chapter':
        numeroItem = 0;
        layout.capitulo(bloque.text);
        break;
      case 'h3':
        layout.h3(bloque.text);
        break;
      case 'p':
        layout.parrafo(bloque.text);
        break;
      case 'bullet':
        layout.vineta(bloque.text);
        break;
      case 'numbered':
        numeroItem += 1;
        layout.numerado(bloque.text, numeroItem);
        break;
      case 'note':
        layout.nota(bloque.text);
        break;
      case 'field':
        layout.campo(bloque.label, bloque.value);
        break;
      case 'kvTable':
        layout.tablaKv(bloque.rows);
        break;
      case 'table':
        layout.tabla(bloque.header, bloque.rows);
        break;
      case 'signatureBlock':
        layout.bloqueFirmas(bloque.signers);
        break;
      case 'pageBreak':
        layout.nuevaPagina();
        break;
      case 'legalRef':
        layout.parrafo(bloque.ref && bloque.ref.texto ? bloque.ref.texto : `[${bloque.key}]`);
        break;
      default:
        throw new Error(`Tipo de bloque desconocido: "${bloque.type}"`);
    }
  }

  // Crear los campos AcroForm sobre las coordenadas registradas por el layout.
  const form = doc.getForm();
  const contadores = new Map();

  for (const c of layout.campos) {
    const base = nombreBase(c.label);
    const n = (contadores.get(base) || 0) + 1;
    contadores.set(base, n);
    const nombre = `${base}_${n}`;

    const campo = form.createTextField(nombre);
    if (c.value != null && String(c.value).trim() !== '') campo.setText(String(c.value));
    campo.addToPage(c.page, {
      x: c.x,
      y: c.y,
      width: c.width,
      height: c.height,
      borderWidth: 0,
      textColor: rgb(0.1, 0.1, 0.1),
      font: layout.fuente,
    });
  }

  form.updateFieldAppearances(layout.fuente);

  return doc.save();
}

module.exports = { renderPdf, nombreBase, slug };
