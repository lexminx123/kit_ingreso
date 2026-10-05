'use strict';

// CLI para dar de alta un cliente nuevo del Kit de Ingreso.
//
//   npm run nuevo-cliente -- <slug> [--base icabaru]
//
// Reglas de oro (nunca rompe lo existente):
//   - Si clientes/<slug>/cliente.json ya existe: ABORTA sin borrar nada.
//   - Copia los docs/*.js del cliente base SOLO si no existen en el destino.
//   - Nunca borra ni sobrescribe archivos.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Slug seguro: minúsculas, dígitos, guion y guion bajo. Sin rutas ni mayúsculas.
const SLUG_VALIDO = /^[a-z0-9_][a-z0-9_-]*$/;
const BASE_POR_DEFECTO = 'icabaru';

const USO = [
  'Uso: npm run nuevo-cliente -- <slug> [--base <cliente>]',
  '',
  '  <slug>            Identificador del cliente nuevo (minúsculas, guion/guion bajo).',
  '  --base <cliente>  Cliente del que se copian los docs como plantilla (por defecto: icabaru).',
  '',
  'Ejemplo: npm run nuevo-cliente -- panaderia --base icabaru',
].join('\n');

/** Parsea argumentos simples (sin dependencias). */
function parseArgs(argv) {
  const args = { slug: null, base: BASE_POR_DEFECTO, help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const actual = argv[i];
    if (actual === '--help' || actual === '-h') {
      args.help = true;
    } else if (actual === '--base') {
      args.base = argv[++i];
    } else if (actual.startsWith('--base=')) {
      args.base = actual.slice('--base='.length);
    } else if (actual.startsWith('-')) {
      throw new Error(`Opción desconocida: ${actual}`);
    } else if (args.slug === null) {
      args.slug = actual;
    } else {
      throw new Error(`Argumento inesperado: ${actual}`);
    }
  }
  return args;
}

/**
 * Crea la carpeta de un cliente nuevo a partir de la plantilla y de un cliente base.
 * No borra ni sobrescribe nada existente.
 *
 * @param {{root?:string, slug:string, base?:string}} opts
 * @returns {{creado:boolean, motivo?:string, slug:string, base:string,
 *   clienteJson:string, docsCopiados:string[], docsOmitidos:string[]}}
 */
function crearCliente(opts) {
  const root = opts && opts.root ? opts.root : ROOT;
  const slug = opts && opts.slug;
  const base = (opts && opts.base) || BASE_POR_DEFECTO;
  const clientes = path.join(root, 'clientes');

  if (!slug || !SLUG_VALIDO.test(slug)) {
    throw new Error(
      `Slug inválido: "${slug}". Usa minúsculas, dígitos, guion bajo o guion (ej.: panaderia).`,
    );
  }
  if (slug === '_plantilla') {
    throw new Error('"_plantilla" es un nombre reservado; elige otro slug.');
  }

  const destinoDir = path.join(clientes, slug);
  const clienteDestino = path.join(destinoDir, 'cliente.json');

  // Regla de oro: si ya existe el cliente, abortar sin tocar nada.
  if (fs.existsSync(clienteDestino)) {
    return {
      creado: false,
      motivo: `Ya existe ${path.relative(root, clienteDestino)}. No se modificó nada.`,
      slug,
      base,
      clienteJson: clienteDestino,
      docsCopiados: [],
      docsOmitidos: [],
    };
  }

  const plantilla = path.join(clientes, '_plantilla', 'cliente.json');
  if (!fs.existsSync(plantilla)) {
    throw new Error(`No se encontró la plantilla: ${path.relative(root, plantilla)}`);
  }

  const baseDocs = path.join(clientes, base, 'docs');
  if (!fs.existsSync(baseDocs) || !fs.statSync(baseDocs).isDirectory()) {
    throw new Error(`El cliente base "${base}" no tiene carpeta docs/ en ${path.relative(root, baseDocs)}`);
  }

  // 1) cliente.json desde la plantilla, fijando el slug real.
  fs.mkdirSync(destinoDir, { recursive: true });
  const datos = JSON.parse(fs.readFileSync(plantilla, 'utf8'));
  datos.slug = slug;
  fs.writeFileSync(clienteDestino, `${JSON.stringify(datos, null, 2)}\n`);

  // 2) docs/*.js del cliente base como plantilla (sin sobrescribir).
  const docsDestino = path.join(destinoDir, 'docs');
  fs.mkdirSync(docsDestino, { recursive: true });

  const docsCopiados = [];
  const docsOmitidos = [];
  for (const archivo of fs.readdirSync(baseDocs).sort()) {
    if (!archivo.endsWith('.js')) continue;
    const destino = path.join(docsDestino, archivo);
    if (fs.existsSync(destino)) {
      docsOmitidos.push(archivo);
      continue;
    }
    fs.copyFileSync(path.join(baseDocs, archivo), destino);
    docsCopiados.push(archivo);
  }

  return { creado: true, slug, base, clienteJson: clienteDestino, docsCopiados, docsOmitidos };
}

/** Imprime el resumen del alta y los siguientes pasos. */
function imprimirResumen(res, { root = ROOT, log = console.log } = {}) {
  const rel = (p) => path.relative(root, p);
  log(`Cliente "${res.slug}" creado a partir de "${res.base}".`);
  log(`  - ${rel(res.clienteJson)}`);
  log(`  - ${res.docsCopiados.length} documento(s) copiado(s) a ${rel(path.dirname(res.clienteJson))}/docs`);
  if (res.docsOmitidos.length > 0) {
    log(`  - ${res.docsOmitidos.length} documento(s) omitido(s) por ya existir: ${res.docsOmitidos.join(', ')}`);
  }
  log('');
  log('Siguientes pasos:');
  log(`  1. Completa ${rel(res.clienteJson)} (razón social, RIF, cargos, remuneración, jornada).`);
  log('  2. Adapta los docs/ a la realidad del negocio (cargos, funciones, riesgos, montos).');
  log('  3. Reutiliza las citas legales por clave (legalRef) contra legal/ve.js; no escribas leyes a mano.');
  log('  4. Genera las salidas:  node tools/build.js --all');
  log('  5. Verifica:  npm test');
  log('  6. Revisión por abogado laboralista antes de su uso formal. Abre un PR (sin merge).');
}

/** Punto de entrada de la CLI. Devuelve el código de salida y ajusta process.exitCode. */
function main(argv, { root = ROOT, log = console.log, error = console.error } = {}) {
  let args;
  try {
    args = parseArgs(argv);
  } catch (err) {
    error(`ERROR: ${err.message}`);
    error(USO);
    process.exitCode = 1;
    return 1;
  }

  if (args.help) {
    log(USO);
    return 0;
  }
  if (!args.slug) {
    error(USO);
    process.exitCode = 1;
    return 1;
  }

  let res;
  try {
    res = crearCliente({ root, slug: args.slug, base: args.base });
  } catch (err) {
    error(`ERROR: ${err.message}`);
    process.exitCode = 1;
    return 1;
  }

  if (!res.creado) {
    error(`ABORTA: ${res.motivo}`);
    process.exitCode = 1;
    return 1;
  }

  imprimirResumen(res, { root, log });
  return 0;
}

if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = { main, parseArgs, crearCliente, imprimirResumen, USO, SLUG_VALIDO };
