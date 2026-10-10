'use strict';

const test = require('node:test');
const assert = require('node:assert');
const os = require('node:os');
const path = require('node:path');
const fs = require('node:fs');
const cp = require('node:child_process');

const build = require('../tools/build.js');

const ROOT = path.resolve(__dirname, '..');

// Auto-descubrimiento: un módulo nuevo en clientes/<slug>/docs declara
// { id, dir, filename, blocks(cliente) } y se construye sin tocar build.js.
test('descubre y construye un módulo { id, dir, filename, blocks } en temporales', async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kit-build-'));
  const docsDir = path.join(tmp, 'demo', 'docs');
  fs.mkdirSync(docsDir, { recursive: true });
  fs.writeFileSync(
    path.join(docsDir, 'mod.js'),
    "'use strict';\n" +
      "module.exports = {\n" +
      "  id: 'demo',\n" +
      "  dir: '01_DOCS',\n" +
      "  filename: 'Demo',\n" +
      "  blocks: () => [{ type: 'title', text: 'Demo' }],\n" +
      "};\n",
  );

  try {
    const modulos = build.descubrirModulos(tmp);
    assert.strictEqual(modulos.length, 1, 'debe descubrir exactamente un módulo');
    assert.strictEqual(modulos[0].id, 'demo');

    const res = await build.construir(modulos[0], { baseClientes: tmp });
    assert.ok(fs.existsSync(res.destinoDocx), 'debe crear el .docx');
    assert.ok(fs.existsSync(res.destinoPdf), 'debe crear el .pdf');
    assert.ok(res.destinoDocx.endsWith(path.join('entregables', '01_DOCS', 'Demo.docx')));
    assert.ok(res.bytesDocx > 0 && res.bytesPdf > 0);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test('la lista de trabajos conserva el documento legacy "carta"', () => {
  const carta = build.trabajos().find((t) => t.id === 'carta');
  assert.ok(carta, 'debe existir el documento legacy "carta"');
  assert.strictEqual(carta.dir, '09_CIERRE');
  assert.strictEqual(carta.filename, 'Carta_Aceptacion_General');
});

// La CLI real: `node tools/build.js --all` corre en una copia aislada.
test('node tools/build.js --all construye sin error (aunque solo exista carta)', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kit-cli-'));
  try {
    for (const dir of ['tools', 'legal', 'clientes']) {
      fs.cpSync(path.join(ROOT, dir), path.join(tmp, dir), { recursive: true });
    }
    fs.cpSync(path.join(ROOT, 'package.json'), path.join(tmp, 'package.json'));
    fs.symlinkSync(path.join(ROOT, 'node_modules'), path.join(tmp, 'node_modules'), 'junction');

    const res = cp.spawnSync(process.execPath, ['tools/build.js', '--all'], {
      cwd: tmp,
      encoding: 'utf8',
    });

    assert.strictEqual(res.status, 0, `stderr: ${res.stderr}\nstdout: ${res.stdout}`);
    assert.ok(
      fs.existsSync(
        path.join(tmp, 'clientes', 'icabaru', 'entregables', '09_CIERRE', 'Carta_Aceptacion_General.docx'),
      ),
      'debe generar el .docx de la carta',
    );
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
