'use strict';

// Valida que el JSON Schema del trabajador sea coherente y que el ejemplo lo cumpla.
// Sin dependencias externas: comprobaciones mínimas pero significativas.

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const RUTA_ESQUEMA = path.join(ROOT, 'schemas', 'trabajador.schema.json');
const RUTA_EJEMPLO = path.join(ROOT, 'schemas', 'trabajador.ejemplo.json');

/** Lee un JSON del disco y lo parsea (falla si el archivo no es JSON válido). */
function leerJson(ruta) {
  return JSON.parse(fs.readFileSync(ruta, 'utf8'));
}

test('el esquema del trabajador es JSON Schema draft-07 válido', () => {
  const esquema = leerJson(RUTA_ESQUEMA);
  assert.match(String(esquema.$schema), /draft-07/, 'debe declarar draft-07');
  assert.strictEqual(esquema.type, 'object');
  assert.ok(Array.isArray(esquema.required) && esquema.required.length > 0, 'debe tener required');
  assert.ok(esquema.properties && typeof esquema.properties === 'object');

  for (const clave of esquema.required) {
    assert.ok(esquema.properties[clave], `la propiedad requerida "${clave}" debe estar definida`);
    assert.strictEqual(typeof esquema.properties[clave].type, 'string', `"${clave}" debe declarar type`);
  }
});

test('el esquema mapea campos hacia _manifest.json (x-campo-manifest)', () => {
  const esquema = leerJson(RUTA_ESQUEMA);
  const conMapeo = Object.values(esquema.properties).filter(
    (p) => typeof p['x-campo-manifest'] === 'string',
  );
  assert.ok(conMapeo.length >= 4, 'debe haber al menos 4 campos con x-campo-manifest');
});

test('el ejemplo cumple el mínimo del esquema', () => {
  const esquema = leerJson(RUTA_ESQUEMA);
  const ejemplo = leerJson(RUTA_EJEMPLO);

  for (const clave of esquema.required) {
    assert.ok(ejemplo[clave] !== undefined, `el ejemplo debe traer "${clave}"`);
  }
  assert.strictEqual(typeof ejemplo.nombres, 'string');
  assert.strictEqual(typeof ejemplo.cedula, 'string');
  assert.strictEqual(typeof ejemplo.cargo, 'string');
  assert.strictEqual(typeof ejemplo.fecha_ingreso, 'string');

  assert.ok(Array.isArray(ejemplo.contactos_emergencia), 'contactos_emergencia debe ser arreglo');
  assert.ok(ejemplo.contactos_emergencia.length >= 1, 'debe haber al menos un contacto');

  assert.ok(Array.isArray(ejemplo.beneficiarios), 'beneficiarios debe ser arreglo');
  const suma = ejemplo.beneficiarios.reduce((total, b) => total + (b.porcentaje || 0), 0);
  assert.ok(suma <= 100, `la suma de porcentajes no debe exceder 100 (fue ${suma})`);
});

test('los campos requeridos del esquema aparecen en el ejemplo como cadenas no vacías', () => {
  const esquema = leerJson(RUTA_ESQUEMA);
  const ejemplo = leerJson(RUTA_EJEMPLO);
  for (const clave of esquema.required) {
    assert.strictEqual(typeof ejemplo[clave], 'string', `"${clave}" debe ser cadena en el ejemplo`);
    assert.ok(ejemplo[clave].trim().length > 0, `"${clave}" no debe estar vacío`);
  }
});
