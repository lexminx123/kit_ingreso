'use strict';

// Renderizador de la lista de bloques (tools/blocks.js) a un archivo .docx.
//
// Diseño A4 vertical, márgenes ~2 cm, Calibri, encabezado con el nombre de la
// empresa y pie con número de página.

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  PageBreak,
  Header,
  Footer,
  PageNumber,
  LevelFormat,
  convertMillimetersToTwip,
} = require('docx');

// Tamaño A4 en twips (1 mm ≈ 56.7 twips).
const A4 = {
  width: convertMillimetersToTwip(210),
  height: convertMillimetersToTwip(297),
};

const MARGEN = {
  top: convertMillimetersToTwip(20),
  right: convertMillimetersToTwip(20),
  bottom: convertMillimetersToTwip(20),
  left: convertMillimetersToTwip(20),
};

// Clave interna de numeración para los bloques `numbered`.
const NUM_REF = 'kit-numbered';

/** Texto subrayado en blanco para los campos a completar. */
function lineaEnBlanco(largo = 44) {
  return ' '.repeat(largo);
}

/** Etiqueta en negrita seguida de un valor subrayado (o línea vacía). */
function parrafoCampo(label, valor) {
  const relleno = valor && String(valor).trim() !== '' ? ` ${valor} ` : lineaEnBlanco();
  return new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({ text: `${label}: `, bold: true }),
      new TextRun({ text: relleno, underline: {} }),
    ],
  });
}

/** Celda de tabla simple. */
function celda(texto, { bold = false } = {}) {
  return new TableCell({
    children: [
      new Paragraph({
        children: [new TextRun({ text: String(texto ?? ''), bold })],
      }),
    ],
  });
}

// --- Renderizadores por tipo de bloque -------------------------------------

function renderTitle(b) {
  return new Paragraph({
    heading: HeadingLevel.TITLE,
    alignment: AlignmentType.CENTER,
    spacing: { after: 240 },
    children: [new TextRun({ text: b.text })],
  });
}

function renderSubtitle(b) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 240 },
    children: [new TextRun({ text: b.text, italics: true, size: 24 })],
  });
}

function renderChapter(b) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: b.text })] });
}

function renderH3(b) {
  return new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun({ text: b.text })] });
}

function renderP(b) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 120 },
    children: [new TextRun({ text: b.text })],
  });
}

function renderBullet(b) {
  return new Paragraph({ text: b.text, bullet: { level: 0 } });
}

function renderNumbered(b) {
  return new Paragraph({ text: b.text, numbering: { reference: NUM_REF, level: 0 } });
}

function renderNote(b) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text: b.text, italics: true, size: 20 })],
  });
}

function renderField(b) {
  return parrafoCampo(b.label, b.value);
}

function renderKvTable(b) {
  const filas = b.rows.map(
    (r) =>
      new TableRow({
        children: [celda(r.label, { bold: true }), celda(r.value)],
      }),
  );
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: filas,
  });
}

function renderTable(b) {
  const filas = [];
  if (b.header && b.header.length) {
    filas.push(
      new TableRow({
        tableHeader: true,
        children: b.header.map((h) => celda(h, { bold: true })),
      }),
    );
  }
  for (const row of b.rows || []) {
    filas.push(new TableRow({ children: row.map((c) => celda(c)) }));
  }
  return new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: filas });
}

function renderSignatureBlock(b) {
  const nodos = [];
  for (const firmante of b.signers || []) {
    nodos.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 240, after: 120 },
        children: [new TextRun({ text: firmante.rol || '', bold: true })],
      }),
    );
    nodos.push(parrafoCampo('Nombre y Apellido', firmante.nombre));
    nodos.push(parrafoCampo('Cargo', firmante.cargo));
    nodos.push(parrafoCampo('Cédula de Identidad', firmante.ci));
    nodos.push(parrafoCampo('Fecha', firmante.fecha));
  }
  return nodos;
}

function renderPageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function renderLegalRef(b) {
  const texto = b.ref && b.ref.texto ? b.ref.texto : `[${b.key}]`;
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text: texto, size: 20 })],
  });
}

/**
 * Convierte un bloque en uno o varios nodos DOCX.
 * @returns {Array} nodos (Paragraph | Table)
 */
function renderBloque(b) {
  switch (b.type) {
    case 'title':
      return [renderTitle(b)];
    case 'subtitle':
      return [renderSubtitle(b)];
    case 'chapter':
      return [renderChapter(b)];
    case 'h3':
      return [renderH3(b)];
    case 'p':
      return [renderP(b)];
    case 'bullet':
      return [renderBullet(b)];
    case 'numbered':
      return [renderNumbered(b)];
    case 'note':
      return [renderNote(b)];
    case 'field':
      return [renderField(b)];
    case 'kvTable':
      return [renderKvTable(b)];
    case 'table':
      return [renderTable(b)];
    case 'signatureBlock':
      return renderSignatureBlock(b);
    case 'pageBreak':
      return [renderPageBreak()];
    case 'legalRef':
      return [renderLegalRef(b)];
    default:
      throw new Error(`Tipo de bloque desconocido: "${b.type}"`);
  }
}

/**
 * Construye el documento DOCX (objeto de la librería docx).
 * @param {Array} blocks
 * @param {{empresa?:string}} [options]
 */
function buildDocument(blocks, options = {}) {
  const empresa = options.empresa || 'NOMBRE DE LA EMPRESA';

  const children = [];
  for (const bloque of blocks) {
    for (const nodo of renderBloque(bloque)) children.push(nodo);
  }

  return new Document({
    styles: {
      default: { document: { run: { font: 'Calibri', size: 22 } } },
    },
    numbering: {
      config: [
        {
          reference: NUM_REF,
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: '%1.',
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 720, hanging: 360 } } },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: { size: { width: A4.width, height: A4.height }, margin: MARGEN },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [new TextRun({ text: empresa, size: 18, color: '888888' })],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Página ', size: 18 }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 18 }),
                ],
              }),
            ],
          }),
        },
        children,
      },
    ],
  });
}

/**
 * Renderiza la lista de bloques a un Buffer .docx.
 * @param {Array} blocks
 * @param {{empresa?:string}} [options]
 * @returns {Promise<Buffer>}
 */
async function renderDocx(blocks, options = {}) {
  const doc = buildDocument(blocks, options);
  return Packer.toBuffer(doc);
}

module.exports = { buildDocument, renderDocx };
