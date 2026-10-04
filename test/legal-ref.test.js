'use strict';

const test = require('node:test');
const assert = require('node:assert');

const { legalRef } = require('../tools/blocks.js');

// El registro legal está vacío en el Ticket #1: ninguna cita debe inventarse.
test('legalRef lanza error cuando la clave no existe en legal/ve.js', () => {
  assert.throws(
    () => legalRef('inexistente'),
    /inexistente/,
    'debe lanzar error mencionando la clave faltante',
  );
});
