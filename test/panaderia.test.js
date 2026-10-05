'use strict';

// Ticket panadería — Kit de ingreso adaptado a panadería, pastelería y venta.
//
// Verifica el cliente.json de panadería, los 13 contratos, las 13 descripciones
// de funciones, las notificaciones de riesgos por área de panadería y que el
// build genere entregables para panadería sin romper icabaru.

const test = require('node:test');
const assert = require('node:assert');
const os = require('node:os');
const path = require('node:path');
const fs = require('node:fs');
const cp = require('node:child_process');

const build = require('../tools/build.js');
const { buildContrato } = require('../tools/contrato-base.js');
const { AREAS, buildNotificacion } = require('../tools/riesgos-base.js');

const ROOT = path.resolve(__dirname, '..');
const CLIENTE = require('../clientes/panaderia/cliente.json');
const DOCS = path.join(ROOT, 'clientes', 'panaderia', 'docs');

// --- Manifiesto de los 13 cargos de panadería ------------------------------

const CARGOS = [
  { id: 'encargado', nombre: 'ENCARGADO', area: 'admin', archivo: '02a_contrato_encargado.js', filename: '02a_Contrato_Encargado', func: '03a_funciones_encargado.js', funcFilename: '03a_Descripcion_Funciones_Encargado' },
  { id: 'encargada', nombre: 'ENCARGADA', area: 'admin', archivo: '02b_contrato_encargada.js', filename: '02b_Contrato_Encargada', func: '03b_funciones_encargada.js', funcFilename: '03b_Descripcion_Funciones_Encargada' },
  { id: 'maestro', nombre: 'MAESTRO', area: 'panaderia', archivo: '02c_contrato_maestro.js', filename: '02c_Contrato_Maestro', func: '03c_funciones_maestro.js', funcFilename: '03c_Descripcion_Funciones_Maestro' },
  { id: 'oficial_panadero', nombre: 'OFICIAL PANADERO', area: 'panaderia', archivo: '02d_contrato_oficial_panadero.js', filename: '02d_Contrato_Oficial_Panadero', func: '03d_funciones_oficial_panadero.js', funcFilename: '03d_Descripcion_Funciones_Oficial_Panadero' },
  { id: 'hornero', nombre: 'HORNERO', area: 'horno', archivo: '02e_contrato_hornero.js', filename: '02e_Contrato_Hornero', func: '03e_funciones_hornero.js', funcFilename: '03e_Descripcion_Funciones_Hornero' },
  { id: 'pizzero', nombre: 'PIZZERO', area: 'horno', archivo: '02f_contrato_pizzero.js', filename: '02f_Contrato_Pizzero', func: '03f_funciones_pizzero.js', funcFilename: '03f_Descripcion_Funciones_Pizzero' },
  { id: 'mesera', nombre: 'MESERA', area: 'salon', archivo: '02g_contrato_mesera.js', filename: '02g_Contrato_Mesera', func: '03g_funciones_mesera.js', funcFilename: '03g_Descripcion_Funciones_Mesera' },
  { id: 'cocinera', nombre: 'COCINERA', area: 'cocina', archivo: '02h_contrato_cocinera.js', filename: '02h_Contrato_Cocinera', func: '03h_funciones_cocinera.js', funcFilename: '03h_Descripcion_Funciones_Cocinera' },
  { id: 'mantenimiento', nombre: 'MANTENIMIENTO', area: 'mantenimiento', archivo: '02i_contrato_mantenimiento.js', filename: '02i_Contrato_Mantenimiento', func: '03i_funciones_mantenimiento.js', funcFilename: '03i_Descripcion_Funciones_Mantenimiento' },
  { id: 'ayudante_pastelero', nombre: 'AYUDANTE PASTELERO', area: 'pasteleria', archivo: '02j_contrato_ayudante_pastelero.js', filename: '02j_Contrato_Ayudante_Pastelero', func: '03j_funciones_ayudante_pastelero.js', funcFilename: '03j_Descripcion_Funciones_Ayudante_Pastelero' },
  { id: 'pastelero', nombre: 'PASTELERO', area: 'pasteleria', archivo: '02k_contrato_pastelero.js', filename: '02k_Contrato_Pastelero', func: '03k_funciones_pastelero.js', funcFilename: '03k_Descripcion_Funciones_Pastelero' },
  { id: 'barra', nombre: 'BARRA', area: 'barra', archivo: '02l_contrato_barra.js', filename: '02l_Contrato_Barra', func: '03l_funciones_barra.js', funcFilename: '03l_Descripcion_Funciones_Barra' },
  { id: 'cajera', nombre: 'CAJERA', area: 'caja', archivo: '02m_contrato_cajera.js', filename: '02m_Contrato_Cajera', func: '03m_funciones_cajera.js', funcFilename: '03m_Descripcion_Funciones_Cajera' },
];

// Mismas claves mínimas exigidas al contrato de icabaru.
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

/** Texto serializado de los bloques, para búsquedas simples. */
function textoDe(bloques) {
  return JSON.stringify(bloques);
}

// --- cliente.json -----------------------------------------------------------

test('panadería: cliente.json declara los 13 cargos con funciones', () => {
  assert.strictEqual(CLIENTE.slug, 'panaderia');
  assert.strictEqual(CLIENTE.actividad, 'Panadería, pastelería y venta de panes y derivados');
  assert.strictEqual(CLIENTE.cargos.length, 13);

  for (const esperado of CARGOS) {
    const cargo = CLIENTE.cargos.find((c) => c.id === esperado.id);
    assert.ok(cargo, `debe existir el cargo "${esperado.id}"`);
    assert.strictEqual(cargo.nombre, esperado.nombre, `nombre de ${esperado.id}`);
    assert.strictEqual(cargo.area, esperado.area, `área de ${esperado.id}`);
    assert.strictEqual(cargo.sueldo_base_usd, 50, `sueldo base de ${esperado.id}`);
    assert.ok(Array.isArray(cargo.funciones), `${esperado.id}: funciones debe ser arreglo`);
    assert.ok(
      cargo.funciones.length >= 8 && cargo.funciones.length <= 12,
      `${esperado.id}: entre 8 y 12 funciones (hay ${cargo.funciones.length})`,
    );
  }
});

test('panadería: remuneración USD 240 con el esquema pactado', () => {
  const rem = CLIENTE.remuneracion;
  assert.strictEqual(rem.total_usd, 240);
  assert.strictEqual(rem.base_prestaciones_usd, 120);
  assert.strictEqual(rem.esquema.length, 5);

  const porConcepto = Object.fromEntries(rem.esquema.map((e) => [e.concepto, e]));
  assert.strictEqual(porConcepto['Salario Base'].usd, 40);
  assert.strictEqual(porConcepto['Bono de Alimentación (Cestaticket)'].usd, 80);
  assert.strictEqual(porConcepto['Bono de Buen Vivir'].usd, 40);
  assert.strictEqual(porConcepto['Bono de Transporte'].usd, 40);
  assert.strictEqual(porConcepto['Otros beneficios no salariales'].usd, 40);

  assert.strictEqual(porConcepto['Salario Base'].quincenal, 20);
  assert.strictEqual(porConcepto['Bono de Alimentación (Cestaticket)'].quincenal, 40);
  assert.strictEqual(porConcepto['Bono de Buen Vivir'].quincenal, 20);
  assert.strictEqual(porConcepto['Bono de Transporte'].quincenal, 20);
  assert.strictEqual(porConcepto['Otros beneficios no salariales'].quincenal, 20);
});

test('panadería: jornada diurna de 8 horas / 40 semanales', () => {
  assert.strictEqual(CLIENTE.jornada.tipo, 'diurna');
  assert.strictEqual(CLIENTE.jornada.horas_diarias, 8);
  assert.strictEqual(CLIENTE.jornada.horas_semanales, 40);
});

// --- Contratos (13) ---------------------------------------------------------

for (const c of CARGOS) {
  const cargo = CLIENTE.cargos.find((x) => x.id === c.id);

  test(`panadería contrato ${c.id}: metadata y bloques válidos`, () => {
    const modulo = require(path.join(DOCS, c.archivo));
    assert.strictEqual(modulo.id, `contrato_${c.id}`);
    assert.strictEqual(modulo.dir, '02_CONTRATOS');
    assert.strictEqual(modulo.filename, c.filename);
    assert.strictEqual(typeof modulo.blocks, 'function');

    const bloques = modulo.blocks(CLIENTE);
    assert.ok(Array.isArray(bloques) && bloques.length > 0);
    assert.strictEqual(bloques[0].type, 'title');
  });

  test(`panadería contrato ${c.id}: usa las funciones del cargo`, () => {
    const bloques = buildContrato(CLIENTE, cargo);
    const texto = textoDe(bloques);
    assert.ok(texto.includes(cargo.funciones[0]), `debe incluir la primera función de ${c.id}`);
    assert.ok(texto.includes(c.nombre), `debe mencionar el cargo ${c.nombre}`);
  });
}

test('panadería: el contrato cita por clave todas las normas mínimas', () => {
  const bloques = buildContrato(CLIENTE, CLIENTE.cargos[0]);
  const claves = new Set(bloques.filter((x) => x.type === 'legalRef').map((x) => x.key));
  for (const clave of CLAVES_REQUERIDAS) {
    assert.ok(claves.has(clave), `falta la cita legal "${clave}"`);
  }
});

// --- Descripciones de funciones (13) ---------------------------------------

for (const c of CARGOS) {
  const cargo = CLIENTE.cargos.find((x) => x.id === c.id);

  test(`panadería funciones ${c.id}: metadata y bloques válidos`, () => {
    const modulo = require(path.join(DOCS, c.func));
    assert.strictEqual(modulo.id, `funciones_${c.id}`);
    assert.strictEqual(modulo.dir, '03_DESCRIPCION_DE_CARGOS');
    assert.strictEqual(modulo.filename, c.funcFilename);
    assert.strictEqual(typeof modulo.blocks, 'function');

    const bloques = modulo.blocks(CLIENTE);
    assert.strictEqual(bloques[0].type, 'title');
    const texto = textoDe(bloques);
    assert.ok(texto.includes(c.nombre), `debe mencionar el cargo ${c.nombre}`);
    assert.ok(texto.includes(cargo.funciones[0]), 'debe incluir las funciones del cargo');
    const claves = bloques.filter((x) => x.type === 'legalRef').map((x) => x.key);
    assert.ok(claves.includes('lottt_59_cargo'), 'debe citar lottt_59_cargo');
  });
}

// --- Sin módulos de restaurante --------------------------------------------

test('panadería no conserva módulos de restaurante/icabaru', () => {
  const archivos = fs.readdirSync(DOCS);
  const prohibidos = [
    '02a_contrato_ayudante_cocina.js',
    '02b_contrato_stewart.js',
    '02c_contrato_mesonero.js',
    '02d_contrato_cajero.js',
    '02e_contrato_bartender.js',
    '02f_contrato_parrillero.js',
    '02g_contrato_supervisor_salon.js',
    '02h_contrato_administrador.js',
    '03a_funciones_ayudante_cocina.js',
    '03b_funciones_stewart.js',
    '03c_funciones_mesonero.js',
    '03d_funciones_cajero.js',
    '03e_funciones_bartender.js',
    '03f_funciones_parrillero.js',
    '03g_funciones_supervisor_salon.js',
    '03h_funciones_administrador.js',
    '05_notif_bartender.js',
    '05_notif_lavaplatos.js',
    '05_notif_mesonero.js',
    '05_notif_parrillero.js',
    '05_notif_supervisor_admin.js',
  ];
  for (const f of prohibidos) {
    assert.ok(!archivos.includes(f), `no debe existir ${f}`);
  }
});

// --- Riesgos por área de panadería -----------------------------------------

const AREAS_PANADERIA = {
  horno: [/quemadura/i, /calor|temperatura/i, /gas/i],
  panaderia: [/harina/i, /amasadora|amasado/i, /esfuerzo|carga/i],
  pasteleria: [/manga/i, /corte/i, /horno/i],
  cocina: [/corte/i, /gas/i, /freidora/i],
  salon_barra: [/carga|bandeja/i, /resbal/i, /cristal|vidrio/i],
  cajero: [/robo|asalto|violencia/i, /ergonom/i, /estrés|estres/i],
  mantenimiento: [/eléctric|electric/i, /mecánic|mecanic/i, /químic|quimic/i],
  encargado: [/estrés|estres/i, /ergonom/i],
};

test('riesgos-base define las áreas de panadería (retrocompatible)', () => {
  for (const area of Object.keys(AREAS_PANADERIA)) {
    assert.ok(AREAS[area], `debe existir el área "${area}"`);
    // Las áreas de icabaru siguen intactas.
  }
  for (const area of ['cocina', 'lavaplatos', 'mesonero', 'cajero', 'bartender', 'parrillero', 'supervisor_admin']) {
    assert.ok(AREAS[area], `no debe desaparecer el área de icabaru "${area}"`);
  }
});

for (const [area, patrones] of Object.entries(AREAS_PANADERIA)) {
  test(`notificación de riesgos de "${area}" cubre los riesgos del oficio`, () => {
    const bloques = buildNotificacion(CLIENTE, area);
    assert.strictEqual(bloques[0].type, 'title');
    const texto = textoDe(bloques);
    for (const patron of patrones) {
      assert.match(texto, patron, `"${area}" debe contemplar ${patron}`);
    }
    const firmas = bloques.find((x) => x.type === 'signatureBlock');
    assert.ok(firmas && firmas.signers.length >= 1, `"${area}": debe firmarse`);
  });
}

test('panadería declara al menos 8 notificaciones de riesgos', () => {
  const notifs = fs.readdirSync(DOCS).filter((f) => /^05_notif_.*\.js$/.test(f));
  assert.ok(notifs.length >= 8, `esperaba >= 8 notificaciones, hay ${notifs.length}`);
});

// --- Build completo (aislado) ----------------------------------------------

test('node tools/build.js --all genera entregables de panadería y conserva icabaru', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kit-panaderia-'));
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

    // icabaru no cambia: 53 documentos.
    const manifiestoIcabaru = JSON.parse(
      fs.readFileSync(path.join(tmp, 'clientes', 'icabaru', 'entregables', '_manifest.json'), 'utf8'),
    );
    assert.strictEqual(manifiestoIcabaru.documentos.length, 53, 'icabaru debe seguir con 53 documentos');

    // panadería construye su kit completo.
    const manifiestoPan = JSON.parse(
      fs.readFileSync(path.join(tmp, 'clientes', 'panaderia', 'entregables', '_manifest.json'), 'utf8'),
    );
    assert.strictEqual(manifiestoPan.cliente, 'panaderia');
    assert.ok(manifiestoPan.documentos.length >= 60, `panadería debe tener >= 60 documentos, hay ${manifiestoPan.documentos.length}`);

    for (const c of CARGOS) {
      assert.ok(
        fs.existsSync(path.join(tmp, 'clientes', 'panaderia', 'entregables', '02_CONTRATOS', `${c.filename}.pdf`)),
        `debe generar ${c.filename}.pdf`,
      );
      assert.ok(
        fs.existsSync(path.join(tmp, 'clientes', 'panaderia', 'entregables', '03_DESCRIPCION_DE_CARGOS', `${c.funcFilename}.pdf`)),
        `debe generar ${c.funcFilename}.pdf`,
      );
    }
    assert.ok(
      fs.existsSync(path.join(tmp, 'clientes', 'icabaru', 'entregables', '09_CIERRE', 'Carta_Aceptacion_General.docx')),
      'icabaru debe seguir generando su carta',
    );
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
