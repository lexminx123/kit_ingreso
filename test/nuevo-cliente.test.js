'use strict';

// Pruebas del CLI `tools/nuevo-cliente.js`: crea la carpeta de un cliente nuevo
// a partir de la plantilla y copia los docs de un cliente base, sin borrar ni
// sobrescribir nada existente.

const test = require('node:test');
const assert = require('node:assert');
const os = require('node:os');
const path = require('node:path');
const fs = require('node:fs');
const cp = require('node:child_process');

const cli = require('../tools/nuevo-cliente.js');

const ROOT = path.resolve(__dirname, '..');
const CLI_REL = path.join('tools', 'nuevo-cliente.js');

/** Copia tools/, clientes/ y package.json al temporal para aislar la CLI. */
function prepararRepo(tmp) {
  fs.cpSync(path.join(ROOT, 'tools'), path.join(tmp, 'tools'), { recursive: true });
  fs.cpSync(path.join(ROOT, 'clientes'), path.join(tmp, 'clientes'), { recursive: true });
  fs.cpSync(path.join(ROOT, 'package.json'), path.join(tmp, 'package.json'));
}

test('la CLI crea cliente.json y copia los docs del cliente base', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kit-nuevo-'));
  const slug = `_test_${Date.now().toString(36)}`;
  try {
    prepararRepo(tmp);

    const res = cp.spawnSync(process.execPath, [CLI_REL, slug, '--base', 'icabaru'], {
      cwd: tmp,
      encoding: 'utf8',
    });
    assert.strictEqual(res.status, 0, `stderr: ${res.stderr}\nstdout: ${res.stdout}`);

    const clienteJson = path.join(tmp, 'clientes', slug, 'cliente.json');
    assert.ok(fs.existsSync(clienteJson), 'debe crear cliente.json');
    const datos = JSON.parse(fs.readFileSync(clienteJson, 'utf8'));
    assert.strictEqual(datos.slug, slug, 'debe fijar el slug real en cliente.json');

    const docsDestino = path.join(tmp, 'clientes', slug, 'docs');
    const esperados = fs
      .readdirSync(path.join(tmp, 'clientes', 'icabaru', 'docs'))
      .filter((f) => f.endsWith('.js'));
    const copiados = fs.readdirSync(docsDestino).filter((f) => f.endsWith('.js'));
    assert.strictEqual(copiados.length, esperados.length, 'debe copiar todos los docs del base');
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test('re-ejecutar la CLI aborta sin borrar lo existente y lo avisa', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kit-nuevo-'));
  const slug = `_test_${Date.now().toString(36)}`;
  try {
    prepararRepo(tmp);

    const primera = cp.spawnSync(process.execPath, [CLI_REL, slug, '--base', 'icabaru'], {
      cwd: tmp,
      encoding: 'utf8',
    });
    assert.strictEqual(primera.status, 0, `stderr: ${primera.stderr}`);

    const clienteJson = path.join(tmp, 'clientes', slug, 'cliente.json');
    const sentinela = path.join(tmp, 'clientes', slug, 'docs', 'sentinela.js');
    fs.writeFileSync(sentinela, '// no debe borrarse\n');

    const segunda = cp.spawnSync(process.execPath, [CLI_REL, slug, '--base', 'icabaru'], {
      cwd: tmp,
      encoding: 'utf8',
    });
    assert.notStrictEqual(segunda.status, 0, 'la segunda corrida debe abortar');
    assert.match(`${segunda.stderr}${segunda.stdout}`, /ABORTA/i, 'debe avisar del aborto');
    assert.ok(fs.existsSync(clienteJson), 'cliente.json debe seguir existiendo');
    assert.ok(fs.existsSync(sentinela), 'los archivos existentes no deben borrarse');
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test('al copiar docs no sobrescribe archivos ya presentes', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kit-nuevo-mod-'));
  try {
    const clientes = path.join(tmp, 'clientes');
    fs.mkdirSync(path.join(clientes, '_plantilla'), { recursive: true });
    fs.copyFileSync(
      path.join(ROOT, 'clientes', '_plantilla', 'cliente.json'),
      path.join(clientes, '_plantilla', 'cliente.json'),
    );
    const baseDocs = path.join(clientes, 'base', 'docs');
    fs.mkdirSync(baseDocs, { recursive: true });
    fs.writeFileSync(path.join(baseDocs, 'a.js'), '// base a\n');
    fs.writeFileSync(path.join(baseDocs, 'b.js'), '// base b\n');

    const nuevoDocs = path.join(clientes, 'nuevo', 'docs');
    fs.mkdirSync(nuevoDocs, { recursive: true });
    fs.writeFileSync(path.join(nuevoDocs, 'a.js'), '// SENTINELA a\n');

    const res = cli.crearCliente({ root: tmp, slug: 'nuevo', base: 'base' });
    assert.strictEqual(res.creado, true);
    assert.deepStrictEqual(res.docsCopiados, ['b.js']);
    assert.deepStrictEqual(res.docsOmitidos, ['a.js']);
    assert.strictEqual(
      fs.readFileSync(path.join(nuevoDocs, 'a.js'), 'utf8'),
      '// SENTINELA a\n',
      'no debe sobrescribir el doc existente',
    );
    assert.ok(fs.existsSync(path.join(nuevoDocs, 'b.js')), 'debe copiar el doc faltante');
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test('crearCliente rechaza slugs inválidos', () => {
  assert.throws(() => cli.crearCliente({ root: ROOT, slug: '../malo', base: 'icabaru' }));
  assert.throws(() => cli.crearCliente({ root: ROOT, slug: 'MALO', base: 'icabaru' }));
  assert.throws(() => cli.crearCliente({ root: ROOT, slug: '_plantilla', base: 'icabaru' }));
});
