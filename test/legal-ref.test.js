'use strict';

const test = require('node:test');
const assert = require('node:assert');

const LEGAL = require('../legal/ve.js');
const { legalRef, legalRefText } = require('../tools/blocks.js');

const ESTADOS = new Set(['verificado', 'por_confirmar']);

// Ticket #9: claves eliminadas o renombradas. No deben reaparecer nunca.
const CLAVES_OBSOLETAS = ['lottt_44_prueba', 'lopcymat_53_info_riesgos', 'lopcymat_regl_27_examen'];

// Ticket #9: claves nuevas que debe incorporar el registro corregido.
const CLAVES_NUEVAS = [
  'lopcymat_56_notif_riesgos',
  'lopcymat_53_4_epp',
  'lopcymat_53_11_confidencialidad',
  'lopcymat_53_10_examen',
  'lopcymat_46_comite',
  'lopcymat_41_delegados',
  'lopcymat_69_3_itinere',
  'lopcymat_73_accidente',
  'reglamento_lopcymat_2007',
  'nt_04_2023',
  'decreto_inamovilidad_2025',
  'decreto_salario_minimo_2022',
];

// Anti-invención: toda entrada del registro declara norma, fuente y estado.
test('cada entrada del registro legal declara ley, fuente y estado válidos', () => {
  const claves = Object.keys(LEGAL);
  assert.ok(claves.length > 0, 'el registro legal no debe estar vacío');

  for (const clave of claves) {
    const entrada = LEGAL[clave];
    assert.strictEqual(entrada.key, clave, `${clave}: "key" debe coincidir con la clave`);
    assert.ok(
      typeof entrada.ley === 'string' && entrada.ley.trim() !== '',
      `${clave}: "ley" no puede estar vacío`,
    );
    assert.ok(
      typeof entrada.fuente === 'string' && entrada.fuente.trim() !== '',
      `${clave}: "fuente" no puede estar vacía`,
    );
    assert.ok(ESTADOS.has(entrada.estado), `${clave}: estado inválido "${entrada.estado}"`);
  }
});

// Anti-invención: las claves con citas falsas quedaron fuera del registro.
test('el registro legal no contiene claves obsoletas o inventadas', () => {
  for (const clave of CLAVES_OBSOLETAS) {
    assert.ok(!(clave in LEGAL), `la clave obsoleta "${clave}" no debe existir`);
  }
});

// Las claves nuevas del Ticket #9 deben estar registradas.
test('el registro legal incorpora las claves corregidas del Ticket #9', () => {
  for (const clave of CLAVES_NUEVAS) {
    assert.ok(clave in LEGAL, `falta la clave nueva "${clave}"`);
  }
});

// Los artículos de las claves LOPCYMAT nuevas deben ser los correctos.
test('las claves LOPCYMAT nuevas apuntan al artículo correcto', () => {
  assert.strictEqual(LEGAL.lopcymat_56_notif_riesgos.articulo, '56');
  assert.strictEqual(LEGAL.lopcymat_53_10_examen.articulo, '53');
  assert.strictEqual(LEGAL.lopcymat_53_4_epp.articulo, '53');
  assert.strictEqual(LEGAL.lopcymat_53_11_confidencialidad.articulo, '53');
  assert.strictEqual(LEGAL.lopcymat_46_comite.articulo, '46');
  assert.strictEqual(LEGAL.lopcymat_69_3_itinere.articulo, '69');
  assert.strictEqual(LEGAL.lopcymat_73_accidente.articulo, '73');
});

test('legalRef lanza error cuando la clave no existe en legal/ve.js', () => {
  assert.throws(
    () => legalRef('inexistente'),
    /inexistente/,
    'debe lanzar error mencionando la clave faltante',
  );
});

test('legalRef devuelve la referencia registrada para una clave válida', () => {
  const ref = legalRef('lottt_60_modalidades');
  assert.strictEqual(ref.key, 'lottt_60_modalidades');
  assert.ok(ref.ref, 'debe incluir la entrada del registro en "ref"');
  assert.strictEqual(ref.ref.articulo, '60');
});

test('legalRefText devuelve una cita corta que incluye el artículo', () => {
  const texto = legalRefText('lottt_60_modalidades');
  assert.strictEqual(typeof texto, 'string');
  assert.match(texto, /60/, 'la cita debe mencionar el artículo 60');
  assert.match(texto, /LOTTT/, 'la cita debe abreviar la norma');
});

test('legalRefText lanza error con una clave inexistente', () => {
  assert.throws(() => legalRefText('clave_inexistente'), /clave_inexistente/);
});
