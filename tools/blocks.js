'use strict';

// Vocabulario declarativo de bloques para armar documentos.
//
// Cada bloque es un objeto plano `{ type, ...datos }`. Los renderizadores
// (DOCX hoy, PDF en el Ticket #2) consumen esa lista y no dependen entre sí.
//
// Uso típico:
//   const b = require('./blocks');
//   const doc = [ b.title('Hola'), b.p('Texto'), b.pageBreak() ];

const LEGAL = require('../legal/ve.js');

// --- Bloques de texto -------------------------------------------------------

/** Título principal del documento. */
function title(text) {
  return { type: 'title', text };
}

/** Subtítulo / bajada del título. */
function subtitle(text) {
  return { type: 'subtitle', text };
}

/** Encabezado de capítulo (sección de primer nivel). */
function chapter(text) {
  return { type: 'chapter', text };
}

/** Encabezado de tercer nivel. */
function h3(text) {
  return { type: 'h3', text };
}

/** Párrafo normal. */
function p(text) {
  return { type: 'p', text };
}

/** Ítem de lista con viñeta. */
function bullet(text) {
  return { type: 'bullet', text };
}

/** Ítem de lista numerada. */
function numbered(text) {
  return { type: 'numbered', text };
}

/** Nota aclaratoria (texto menor, habitualmente en cursiva). */
function note(text) {
  return { type: 'note', text };
}

// --- Bloques de datos -------------------------------------------------------

/**
 * Campo para completar a mano: etiqueta + línea en blanco subrayada.
 * `value` opcional prellenado (si no, queda la línea).
 */
function field(label, opts = {}) {
  return { type: 'field', label, value: opts.value };
}

/**
 * Tabla clave/valor.
 * @param {Array<{label:string, value:string}>} rows
 */
function kvTable(rows = []) {
  return { type: 'kvTable', rows };
}

/**
 * Tabla genérica.
 * @param {string[]} header  Encabezados de columna.
 * @param {string[][]} rows  Filas de celdas.
 */
function table(header = [], rows = []) {
  return { type: 'table', header, rows };
}

/**
 * Bloque de firmas.
 * Cada firmante: { rol, nombre, cargo, ci, fecha }. Los campos vacíos se
 * renderizan como línea para completar.
 * @param {Array<object>} signers
 */
function signatureBlock(signers = []) {
  return { type: 'signatureBlock', signers };
}

// --- Bloques estructurales / legales ---------------------------------------

/** Salto de página explícito. */
function pageBreak() {
  return { type: 'pageBreak' };
}

/**
 * Devuelve la entrada del registro legal o lanza si la clave no existe:
 * nunca se inventan citas.
 */
function entradaLegal(key) {
  if (!Object.prototype.hasOwnProperty.call(LEGAL, key)) {
    throw new Error(`La clave legal "${key}" no existe en legal/ve.js.`);
  }
  return LEGAL[key];
}

/**
 * Referencia legal verificada contra legal/ve.js.
 * Lanza error si la clave no existe: nunca se inventan citas.
 */
function legalRef(key) {
  return { type: 'legalRef', key, ref: entradaLegal(key) };
}

// Sigla corta por norma, para citas dentro de párrafos.
const SIGLAS = [
  [/LOPCYMAT/, 'LOPCYMAT'],
  [/LOTTT|Trabajadores y las Trabajadoras/, 'LOTTT'],
  [/Constitución/, 'CRBV'],
  [/Alimentación/, 'LAT'],
  [/Delitos Informáticos/, 'Ley de Delitos Informáticos'],
  [/Seguridad Social/, 'LOSSS'],
  [/Vivienda y Hábitat/, 'Ley de Vivienda y Hábitat'],
];

/** Sigla corta de la norma a partir de su nombre completo. */
function siglaDe(ley) {
  for (const [patron, sigla] of SIGLAS) {
    if (patron.test(ley)) return sigla;
  }
  return ley;
}

/**
 * Cita corta de una clave legal, para incrustar dentro de un párrafo.
 * Ej: legalRefText('lottt_60_modalidades') -> "Art. 60 LOTTT".
 */
function legalRefText(key) {
  const entrada = entradaLegal(key);
  const sigla = siglaDe(entrada.ley);
  return entrada.articulo ? `Art. ${entrada.articulo} ${sigla}` : sigla;
}

module.exports = {
  title,
  subtitle,
  chapter,
  h3,
  p,
  bullet,
  numbered,
  note,
  field,
  kvTable,
  table,
  signatureBlock,
  pageBreak,
  legalRef,
  legalRefText,
};
