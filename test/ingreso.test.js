'use strict';

// Ticket #5 — Ingreso, descripciones de cargo, prestaciones y registros.
//
// Verifica que cada módulo declarativo (00, 01, 03a..03h, 04a, 04b, 06) cargue,
// produzca bloques con `title` como primer bloque y que `build --all` genere los
// .docx y .pdf esperados. No sustituye a los tests de build existentes.

const test = require('node:test');
const assert = require('node:assert');
const os = require('node:os');
const path = require('node:path');
const fs = require('node:fs');
const cp = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const CLIENTE = require('../clientes/icabaru/cliente.json');

const TIPOS_VALIDOS = new Set([
  'title',
  'subtitle',
  'chapter',
  'h3',
  'p',
  'bullet',
  'numbered',
  'note',
  'field',
  'kvTable',
  'table',
  'signatureBlock',
  'pageBreak',
  'legalRef',
]);

// Cada caso declara el módulo y la salida esperada de build --all.
const CASOS = [
  {
    archivo: '00_checklist.js',
    id: 'checklist_maestro_ingreso',
    dir: '00_CONTROL',
    filename: 'Checklist_Maestro_Ingreso',
  },
  {
    archivo: '01_solicitud.js',
    id: 'solicitud_de_empleo',
    dir: '01_INGRESO',
    filename: 'Solicitud_de_Empleo',
  },
  {
    archivo: '03a_funciones_ayudante_cocina.js',
    id: 'funciones_ayudante_cocina',
    dir: '03_DESCRIPCION_DE_CARGOS',
    filename: '03a_Descripcion_Funciones_Ayudante_de_Cocina',
  },
  {
    archivo: '03b_funciones_stewart.js',
    id: 'funciones_stewart',
    dir: '03_DESCRIPCION_DE_CARGOS',
    filename: '03b_Descripcion_Funciones_Stewart',
  },
  {
    archivo: '03c_funciones_mesonero.js',
    id: 'funciones_mesonero',
    dir: '03_DESCRIPCION_DE_CARGOS',
    filename: '03c_Descripcion_Funciones_Mesonero',
  },
  {
    archivo: '03d_funciones_cajero.js',
    id: 'funciones_cajero',
    dir: '03_DESCRIPCION_DE_CARGOS',
    filename: '03d_Descripcion_Funciones_Cajero',
  },
  {
    archivo: '03e_funciones_bartender.js',
    id: 'funciones_bartender',
    dir: '03_DESCRIPCION_DE_CARGOS',
    filename: '03e_Descripcion_Funciones_Bartender',
  },
  {
    archivo: '03f_funciones_parrillero.js',
    id: 'funciones_parrillero',
    dir: '03_DESCRIPCION_DE_CARGOS',
    filename: '03f_Descripcion_Funciones_Parrillero',
  },
  {
    archivo: '03g_funciones_supervisor_salon.js',
    id: 'funciones_supervisor_salon',
    dir: '03_DESCRIPCION_DE_CARGOS',
    filename: '03g_Descripcion_Funciones_Supervisor_de_Salon',
  },
  {
    archivo: '03h_funciones_administrador.js',
    id: 'funciones_administrador',
    dir: '03_DESCRIPCION_DE_CARGOS',
    filename: '03h_Descripcion_Funciones_Administrador',
  },
  {
    archivo: '04a_prestaciones.js',
    id: 'autorizacion_deposito_prestaciones',
    dir: '04_PRESTACIONES',
    filename: 'Autorizacion_Deposito_Prestaciones',
  },
  {
    archivo: '04b_beneficiarios.js',
    id: 'designacion_beneficiarios',
    dir: '04_PRESTACIONES',
    filename: 'Designacion_Beneficiarios',
  },
  {
    archivo: '06_registros.js',
    id: 'checklist_ivss_faov_inces',
    dir: '06_REGISTROS_LEGALES',
    filename: 'Checklist_IVSS_FAOV_INCES',
  },
];

const RUTA_DOCS = path.join(ROOT, 'clientes', 'icabaru', 'docs');

for (const caso of CASOS) {
  test(`módulo ${caso.archivo}: carga, metadata válida y bloque inicial "title"`, () => {
    const modulo = require(path.join(RUTA_DOCS, caso.archivo));

    assert.strictEqual(modulo.id, caso.id, `${caso.archivo}: id inesperado`);
    assert.strictEqual(modulo.dir, caso.dir, `${caso.archivo}: dir inesperado`);
    assert.strictEqual(modulo.filename, caso.filename, `${caso.archivo}: filename inesperado`);
    assert.strictEqual(
      typeof modulo.blocks,
      'function',
      `${caso.archivo}: blocks debe ser función`,
    );

    const bloques = modulo.blocks(CLIENTE);
    assert.ok(Array.isArray(bloques) && bloques.length > 0, 'debe producir bloques');
    assert.strictEqual(bloques[0].type, 'title', 'el primer bloque debe ser title');

    for (const bloque of bloques) {
      assert.ok(
        TIPOS_VALIDOS.has(bloque.type),
        `${caso.archivo}: tipo de bloque desconocido "${bloque.type}"`,
      );
    }
  });
}

test('los cargos 03x cubren los 8 cargos declarados en cliente.json', () => {
  const idsFunciones = CASOS.filter((c) => c.archivo.startsWith('03')).map((c) => c.id);
  assert.strictEqual(idsFunciones.length, 8, 'deben existir 8 descripciones de cargo');
  assert.strictEqual(CLIENTE.cargos.length, 8, 'cliente.json declara 8 cargos');
});

test('las descripciones de cargo citan lottt_59_cargo', () => {
  const bloques = require(path.join(RUTA_DOCS, '03a_funciones_ayudante_cocina.js')).blocks(CLIENTE);
  const claves = bloques.filter((b) => b.type === 'legalRef').map((b) => b.key);
  assert.ok(
    claves.includes('lottt_59_cargo'),
    'debe citar la denominación del cargo con descripción de servicios (art. 59 num. 3)',
  );
});

test('04a cita lottt_142_garantia y lottt_143_deposito', () => {
  const bloques = require(path.join(RUTA_DOCS, '04a_prestaciones.js')).blocks(CLIENTE);
  const claves = bloques.filter((b) => b.type === 'legalRef').map((b) => b.key);
  assert.ok(claves.includes('lottt_142_garantia'), 'debe citar la garantía (142)');
  assert.ok(claves.includes('lottt_143_deposito'), 'debe citar el depósito (143)');
});

test('04b cita lottt_145_herederos', () => {
  const bloques = require(path.join(RUTA_DOCS, '04b_beneficiarios.js')).blocks(CLIENTE);
  const claves = bloques.filter((b) => b.type === 'legalRef').map((b) => b.key);
  assert.ok(claves.includes('lottt_145_herederos'), 'debe citar herederos (145)');
});

test('06 cita loss_2002 y bvv_2005_faov', () => {
  const bloques = require(path.join(RUTA_DOCS, '06_registros.js')).blocks(CLIENTE);
  const claves = bloques.filter((b) => b.type === 'legalRef').map((b) => b.key);
  assert.ok(claves.includes('loss_2002'), 'debe citar LOSSS');
  assert.ok(claves.includes('bvv_2005_faov'), 'debe citar FAOV/BVV');
});

// La CLI real, en copia aislada, genera los .docx/.pdf de todo el ticket.
test('node tools/build.js --all genera los entregables del ticket', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kit-ingreso-'));
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

    for (const caso of CASOS) {
      const base = path.join(tmp, 'clientes', 'icabaru', 'entregables', caso.dir, caso.filename);
      assert.ok(fs.existsSync(`${base}.docx`), `debe generar ${caso.filename}.docx`);
      assert.ok(fs.existsSync(`${base}.pdf`), `debe generar ${caso.filename}.pdf`);
      assert.ok(fs.statSync(`${base}.docx`).size > 0, `${caso.filename}.docx no debe estar vacío`);
      assert.ok(fs.statSync(`${base}.pdf`).size > 0, `${caso.filename}.pdf no debe estar vacío`);
    }
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
