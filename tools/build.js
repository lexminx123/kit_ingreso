'use strict';

// CLI para generar un .docx y un .pdf a partir de una definición de bloques.
//
//   node tools/build.js --doc carta
//
// El registro DOCS mapea el nombre lógico del documento con su módulo de
// definición (bloques) y las rutas de salida dentro del repositorio.

const fs = require('fs');
const path = require('path');
const { renderDocx } = require('./render-docx.js');
const { renderPdf } = require('./render-pdf.js');

const ROOT = path.resolve(__dirname, '..');

const DOCS = {
  carta: {
    modulo: '../clientes/icabaru/docs/carta.js',
    salida: 'clientes/icabaru/entregables/09_CIERRE/Carta_Aceptacion_General.docx',
    salidaPdf: 'clientes/icabaru/entregables/09_CIERRE/Carta_Aceptacion_General.pdf',
  },
};

function parseArgs(argv) {
  const args = { doc: null, out: null, outPdf: null };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--doc') args.doc = argv[++i];
    else if (argv[i] === '--out') args.out = argv[++i];
    else if (argv[i] === '--out-pdf') args.outPdf = argv[++i];
  }
  return args;
}

async function main(argv) {
  const args = parseArgs(argv);

  if (!args.doc || !DOCS[args.doc]) {
    const disponibles = Object.keys(DOCS).join(', ');
    console.error(`Uso: node tools/build.js --doc <nombre>`);
    console.error(`Documentos disponibles: ${disponibles}`);
    process.exitCode = 1;
    return;
  }

  const entrada = DOCS[args.doc];
  const definicion = require(path.resolve(__dirname, entrada.modulo));
  const blocks = Array.isArray(definicion) ? definicion : definicion.blocks;

  if (!Array.isArray(blocks)) {
    throw new Error(`La definición "${args.doc}" no exporta una lista de bloques.`);
  }

  const destinoDocx = path.resolve(ROOT, args.out || entrada.salida);

  const buffer = await renderDocx(blocks, { empresa: definicion.empresa });
  fs.mkdirSync(path.dirname(destinoDocx), { recursive: true });
  fs.writeFileSync(destinoDocx, buffer);

  console.log(`OK ${args.doc} -> ${destinoDocx} (${buffer.length} bytes)`);

  // Mismo documento en PDF con formulario rellenable (AcroForm).
  const destinoPdf = args.outPdf
    ? path.resolve(ROOT, args.outPdf)
    : args.out
      ? destinoDocx.replace(/\.docx$/i, '.pdf')
      : path.resolve(ROOT, entrada.salidaPdf);

  const pdf = await renderPdf(blocks, { empresa: definicion.empresa });
  fs.mkdirSync(path.dirname(destinoPdf), { recursive: true });
  fs.writeFileSync(destinoPdf, pdf);

  console.log(`OK ${args.doc} -> ${destinoPdf} (${pdf.length} bytes)`);
}

if (require.main === module) {
  main(process.argv.slice(2)).catch((err) => {
    console.error(err.message);
    process.exitCode = 1;
  });
}

module.exports = { main, DOCS };
