'use strict';

// Ticket #4 — Contrato Individual de Trabajo (8 cargos gastronómicos).
//
// Verifica que buildContrato() produzca bloques válidos con `title` inicial y
// mención del cargo, que los 8 módulos declaren metadata correcta, que se citen
// por clave las normas mínimas y que `node tools/build.js --all` genere los
// 8 .docx y 8 .pdf esperados. No sustituye a los tests de build existentes.

const test = require('node:test');
const assert = require('node:assert');
const os = require('node:os');
const path = require('node:path');
const fs = require('node:fs');
const cp = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const CLIENTE = require('../clientes/icabaru/cliente.json');
const { buildContrato } = require('../tools/contrato-base.js');

const RUTA_DOCS = path.join(ROOT, 'clientes', 'icabaru', 'docs');

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

// Un caso por cargo, en el mismo orden que cliente.cargos.
const CASOS = [
  {
    id: 'ayudante_cocina',
    archivo: '02a_contrato_ayudante_cocina.js',
    filename: '02a_Contrato_Ayudante_de_Cocina',
  },
  { id: 'stewart', archivo: '02b_contrato_stewart.js', filename: '02b_Contrato_Stewart' },
  { id: 'mesonero', archivo: '02c_contrato_mesonero.js', filename: '02c_Contrato_Mesonero' },
  { id: 'cajero', archivo: '02d_contrato_cajero.js', filename: '02d_Contrato_Cajero' },
  { id: 'bartender', archivo: '02e_contrato_bartender.js', filename: '02e_Contrato_Bartender' },
  { id: 'parrillero', archivo: '02f_contrato_parrillero.js', filename: '02f_Contrato_Parrillero' },
  {
    id: 'supervisor_salon',
    archivo: '02g_contrato_supervisor_salon.js',
    filename: '02g_Contrato_Supervisor_de_Salon',
  },
  {
    id: 'administrador',
    archivo: '02h_contrato_administrador.js',
    filename: '02h_Contrato_Administrador',
  },
];

// Claves legales mínimas exigidas al contrato (siempre por clave, nunca a mano).
const CLAVES_REQUERIDAS = [
  'lottt_60_modalidades',
  'lottt_173_jornada',
  'crbv_90_jornada',
  'lottt_184_feriados',
  'lottt_188_descanso',
  'lottt_178_horas_extra',
  'lottt_118_horas_extra',
  'lottt_104_salario',
  'crbv_91_salario',
  'lat_2004_alimentacion',
  'lottt_142_garantia',
  'lottt_143_deposito',
  'crbv_92_prestaciones',
  'lottt_190_vacaciones',
  'lottt_192_bono_vacacional',
  'lottt_131_utilidades',
  'lopcymat_56_notif_riesgos',
  'lopcymat_53_4_epp',
  'lopcymat_53_10_examen',
  'lottt_79_despido',
  'lottt_81_preaviso',
  'crbv_89_irrenunciabilidad',
  'crbv_87_trabajo',
];

/** Texto serializado de un bloque, para búsquedas simples. */
function textoDe(bloque) {
  return JSON.stringify(bloque);
}

for (const caso of CASOS) {
  const cargo = CLIENTE.cargos.find((c) => c.id === caso.id);

  test(`buildContrato(${caso.id}): bloques válidos, primer bloque title y mención del cargo`, () => {
    const bloques = buildContrato(CLIENTE, cargo);

    assert.ok(Array.isArray(bloques) && bloques.length > 0, 'debe devolver bloques');
    assert.strictEqual(bloques[0].type, 'title', 'el primer bloque debe ser title');

    for (const bloque of bloques) {
      assert.ok(
        TIPOS_VALIDOS.has(bloque.type),
        `tipo de bloque desconocido "${bloque.type}"`,
      );
    }

    const texto = bloques.map(textoDe).join(' ');
    assert.ok(
      texto.includes(cargo.nombre),
      `el contrato debe mencionar el cargo "${cargo.nombre}"`,
    );
  });

  test(`módulo ${caso.archivo}: metadata y bloques correctos`, () => {
    const modulo = require(path.join(RUTA_DOCS, caso.archivo));

    assert.strictEqual(modulo.id, `contrato_${caso.id}`, 'id inesperado');
    assert.strictEqual(modulo.dir, '02_CONTRATOS', 'dir inesperado');
    assert.strictEqual(modulo.filename, caso.filename, 'filename inesperado');
    assert.strictEqual(typeof modulo.blocks, 'function', 'blocks debe ser función');

    // Los tests entregan el cliente completo; la CLI pasa un stub { slug }.
    const bloques = modulo.blocks(CLIENTE);
    assert.ok(Array.isArray(bloques) && bloques.length > 0, 'debe producir bloques');
    assert.strictEqual(bloques[0].type, 'title', 'el primer bloque debe ser title');
  });
}

test('el contrato cita por clave todas las normas mínimas', () => {
  const bloques = buildContrato(CLIENTE, CLIENTE.cargos[0]);
  const claves = new Set(
    bloques.filter((b) => b.type === 'legalRef').map((b) => b.key),
  );

  for (const clave of CLAVES_REQUERIDAS) {
    assert.ok(claves.has(clave), `falta la cita legal "${clave}"`);
  }
});

test('el contrato no incluye período de prueba ni cita la clave inventada', () => {
  const bloques = buildContrato(CLIENTE, CLIENTE.cargos[0]);
  const claves = bloques.filter((b) => b.type === 'legalRef').map((b) => b.key);
  assert.ok(!claves.includes('lottt_44_prueba'), 'no debe citar "lottt_44_prueba"');

  const texto = bloques
    .filter((b) => b.type === 'chapter' || b.type === 'p')
    .map((b) => b.text || '')
    .join(' ')
    .toLowerCase();
  assert.ok(!texto.includes('período de prueba'), 'no debe existir la cláusula de período de prueba');
  assert.ok(!texto.includes('periodo de prueba'), 'no debe existir la cláusula de período de prueba');
});

// La CLI real, en copia aislada, genera los .docx/.pdf de los 8 contratos.
test('node tools/build.js --all genera los 8 contratos (.docx y .pdf)', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kit-contrato-'));
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
      const base = path.join(tmp, 'clientes', 'icabaru', 'entregables', '02_CONTRATOS', caso.filename);
      assert.ok(fs.existsSync(`${base}.docx`), `debe generar ${caso.filename}.docx`);
      assert.ok(fs.existsSync(`${base}.pdf`), `debe generar ${caso.filename}.pdf`);
      assert.ok(fs.statSync(`${base}.docx`).size > 0, `${caso.filename}.docx no debe estar vacío`);
      assert.ok(fs.statSync(`${base}.pdf`).size > 0, `${caso.filename}.pdf no debe estar vacío`);
    }
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
