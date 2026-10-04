'use strict';

// CLI para generar .docx y .pdf a partir de definiciones de bloques.
//
//   node tools/build.js --all            # descubre y construye todos los módulos
//   node tools/build.js --doc carta      # construye un documento concreto
//
// Auto-descubrimiento: cada archivo clientes/<slug>/docs/*.js que exporte
//   { id, dir, filename, blocks(cliente) }
// se construye a clientes/<slug>/entregables/<dir>/<filename>.{docx,pdf}.
// Otros tickets añaden documentos sin tocar este archivo.
//
// Los documentos legacy (bloques como arreglo, p. ej. carta) se conservan en
// DOCS para `--doc <id>` y también entran en `--all`.

const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const { renderDocx } = require('./render-docx.js');
const { renderPdf } = require('./render-pdf.js');

const ROOT = path.resolve(__dirname, '..');
const CLIENTES = path.join(ROOT, 'clientes');

// Fecha fija del manifiesto para que el archivo sea byte-reproducible.
const FECHA_MANIFIESTO = new Date('2026-01-01T00:00:00.000Z');

// Documentos legacy con metadatos explícitos (bloques en formato arreglo).
const DOCS = {
  carta: {
    slug: 'icabaru',
    modulo: '../clientes/icabaru/docs/carta.js',
    dir: '09_CIERRE',
    filename: 'Carta_Aceptacion_General',
  },
};

function parseArgs(argv) {
  const args = { all: false, doc: null, out: null, outPdf: null };
  for (let i = 0; i < argv.length; i += 1) {
    const actual = argv[i];
    if (actual === '--all') args.all = true;
    else if (actual === '--doc') args.doc = argv[++i];
    else if (actual === '--out') args.out = argv[++i];
    else if (actual === '--out-pdf') args.outPdf = argv[++i];
  }
  return args;
}

/** Rutas absolutas de salida de un documento dentro de un cliente. */
function resolverSalidas(baseClientes, slug, dir, filename) {
  const base = path.join(baseClientes, slug, 'entregables', dir);
  return {
    docx: path.join(base, `${filename}.docx`),
    pdf: path.join(base, `${filename}.pdf`),
  };
}

/**
 * Descubre módulos de documento en clientes/<slug>/docs/*.js.
 * @param {string} [baseClientes] Directorio raíz de clientes.
 * @returns {Array<{slug:string, modulo:string, id:string, dir:string, filename:string, definicion:object}>}
 */
function descubrirModulos(baseClientes = CLIENTES) {
  const encontrados = [];
  if (!fs.existsSync(baseClientes)) return encontrados;

  for (const slug of fs.readdirSync(baseClientes)) {
    const docsDir = path.join(baseClientes, slug, 'docs');
    if (!fs.existsSync(docsDir) || !fs.statSync(docsDir).isDirectory()) continue;

    for (const archivo of fs.readdirSync(docsDir)) {
      if (!archivo.endsWith('.js')) continue;
      const modulo = path.join(docsDir, archivo);
      let definicion;
      try {
        definicion = require(modulo);
      } catch (err) {
        throw new Error(`No se pudo cargar "${modulo}": ${err.message}`);
      }
      // Solo módulos declarativos con blocks() participan del auto-descubrimiento.
      if (!definicion || typeof definicion.blocks !== 'function') continue;
      if (!definicion.id || !definicion.dir || !definicion.filename) {
        throw new Error(`El módulo "${modulo}" debe exportar { id, dir, filename, blocks }.`);
      }
      encontrados.push({
        slug,
        modulo,
        id: definicion.id,
        dir: definicion.dir,
        filename: definicion.filename,
        definicion,
      });
    }
  }

  return encontrados;
}

/**
 * Lista de trabajos: módulos descubiertos + documentos legacy de DOCS.
 * @param {string} [rootDir] Raíz del repositorio.
 */
function trabajos(rootDir = ROOT) {
  const lista = [];
  const vistos = new Set();

  for (const modulo of descubrirModulos(path.join(rootDir, 'clientes'))) {
    if (vistos.has(modulo.id)) continue;
    vistos.add(modulo.id);
    lista.push({ ...modulo, legacy: false });
  }

  for (const [id, doc] of Object.entries(DOCS)) {
    if (vistos.has(id)) continue;
    vistos.add(id);
    lista.push({
      id,
      slug: doc.slug,
      modulo: path.resolve(rootDir, 'tools', doc.modulo),
      dir: doc.dir,
      filename: doc.filename,
      definicion: null,
      legacy: true,
    });
  }

  return lista;
}

/**
 * Construye un trabajo en .docx y .pdf.
 * @param {object} trabajo
 * @param {{baseClientes?:string, out?:string, outPdf?:string}} [opts]
 */
async function construir(trabajo, opts = {}) {
  const definicion = trabajo.definicion || require(trabajo.modulo);
  const bloques =
    typeof definicion.blocks === 'function'
      ? definicion.blocks({ slug: trabajo.slug })
      : definicion.blocks;

  if (!Array.isArray(bloques)) {
    throw new Error(`El documento "${trabajo.id}" no produce una lista de bloques.`);
  }

  const salidas = resolverSalidas(
    opts.baseClientes || CLIENTES,
    trabajo.slug,
    trabajo.dir,
    trabajo.filename,
  );
  const destinoDocx = path.resolve(opts.out || salidas.docx);
  const destinoPdf = path.resolve(opts.outPdf || salidas.pdf);

  const buffer = await renderDocx(bloques, { empresa: definicion.empresa });
  fs.mkdirSync(path.dirname(destinoDocx), { recursive: true });
  fs.writeFileSync(destinoDocx, buffer);
  console.log(`OK ${trabajo.id} -> ${destinoDocx} (${buffer.length} bytes)`);

  const pdf = await renderPdf(bloques, { empresa: definicion.empresa });
  fs.mkdirSync(path.dirname(destinoPdf), { recursive: true });
  fs.writeFileSync(destinoPdf, pdf);
  console.log(`OK ${trabajo.id} -> ${destinoPdf} (${pdf.length} bytes)`);

  return { destinoDocx, destinoPdf, bytesDocx: buffer.length, bytesPdf: pdf.length };
}

/**
 * Nombres de los campos AcroForm de un PDF ya generado.
 * @param {string} rutaPdf
 * @returns {Promise<string[]>}
 */
async function camposDePdf(rutaPdf) {
  const pdf = await PDFDocument.load(fs.readFileSync(rutaPdf), { updateMetadata: false });
  return pdf.getForm().getFields().map((f) => f.getName());
}

/**
 * Construye el manifiesto de campos de un cliente a partir de sus resultados.
 * @param {string} slug
 * @param {Array<{id:string, dir:string, filename:string, destinoPdf:string}>} resultados
 */
async function construirManifiesto(slug, resultados) {
  const documentos = [];
  for (const r of resultados) {
    documentos.push({
      id: r.id,
      carpeta: r.dir,
      archivo: r.filename,
      docx: `${r.dir}/${r.filename}.docx`,
      pdf: `${r.dir}/${r.filename}.pdf`,
      campos: await camposDePdf(r.destinoPdf),
    });
  }
  documentos.sort((a, b) => {
    if (a.carpeta !== b.carpeta) return a.carpeta < b.carpeta ? -1 : 1;
    if (a.archivo !== b.archivo) return a.archivo < b.archivo ? -1 : 1;
    return 0;
  });
  return { cliente: slug, generado: FECHA_MANIFIESTO.toISOString(), documentos };
}

/**
 * Escribe clientes/<slug>/entregables/_manifest.json por cada cliente tocado.
 * @param {string} baseClientes
 * @param {Array<object>} resultados  Resultados de construir() con slug/id/dir/filename.
 */
async function escribirManifiesto(baseClientes, resultados) {
  const porSlug = new Map();
  for (const r of resultados) {
    if (!porSlug.has(r.slug)) porSlug.set(r.slug, []);
    porSlug.get(r.slug).push(r);
  }

  const escritos = [];
  for (const [slug, res] of porSlug) {
    const manifiesto = await construirManifiesto(slug, res);
    const destino = path.join(baseClientes, slug, 'entregables', '_manifest.json');
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.writeFileSync(destino, `${JSON.stringify(manifiesto, null, 2)}\n`);
    escritos.push({ slug, destino, documentos: manifiesto.documentos.length });
  }
  return escritos;
}

async function main(argv) {
  const args = parseArgs(argv);
  const lista = trabajos();

  if (args.all) {
    if (lista.length === 0) {
      console.error('No hay módulos de documento para construir.');
      process.exitCode = 1;
      return;
    }
    const resultados = [];
    for (const trabajo of lista) {
      const res = await construir(trabajo);
      resultados.push({
        slug: trabajo.slug,
        id: trabajo.id,
        dir: trabajo.dir,
        filename: trabajo.filename,
        ...res,
      });
    }
    const manifiestos = await escribirManifiesto(CLIENTES, resultados);
    for (const m of manifiestos) {
      console.log(`OK manifiesto ${m.slug} -> ${m.destino} (${m.documentos} documentos)`);
    }
    return;
  }

  if (args.doc) {
    const trabajo = lista.find((t) => t.id === args.doc);
    if (!trabajo) {
      console.error(`Documento desconocido: ${args.doc}`);
      console.error(`Disponibles: ${lista.map((t) => t.id).join(', ') || '(ninguno)'}`);
      process.exitCode = 1;
      return;
    }
    await construir(trabajo, { out: args.out, outPdf: args.outPdf });
    return;
  }

  console.error('Uso: node tools/build.js --all | --doc <nombre>');
  console.error(`Documentos disponibles: ${lista.map((t) => t.id).join(', ') || '(ninguno)'}`);
  process.exitCode = 1;
}

if (require.main === module) {
  main(process.argv.slice(2)).catch((err) => {
    console.error(err.message);
    process.exitCode = 1;
  });
}

module.exports = {
  main,
  DOCS,
  resolverSalidas,
  descubrirModulos,
  trabajos,
  construir,
  camposDePdf,
  construirManifiesto,
  escribirManifiesto,
};
