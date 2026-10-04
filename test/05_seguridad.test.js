'use strict';

// Ticket #6 — Seguridad laboral (LOPCYMAT) por rol, actividad gastronómica.
// Pruebas de la base de notificaciones por área y de los módulos 05_*.

const test = require('node:test');
const assert = require('node:assert');
const os = require('node:os');
const path = require('node:path');
const fs = require('node:fs');

const { buildNotificacion, AREAS, nivelRiesgo } = require('../tools/riesgos-base.js');
const build = require('../tools/build.js');

const cliente = require('../clientes/icabaru/cliente.json');
const DOCS = path.join(__dirname, '..', 'clientes', 'icabaru', 'docs');

/** Módulos de este ticket en disco. */
function modulos05() {
  return fs
    .readdirSync(DOCS)
    .filter((f) => f.startsWith('05_') && f.endsWith('.js'))
    .sort();
}

/** Carga un módulo declarativo por nombre de archivo. */
function cargar(archivo) {
  return require(path.join(DOCS, archivo));
}

/** Recolecta todo el texto visible de una lista de bloques. */
function textoDe(bloques) {
  const partes = [];
  const visitar = (v) => {
    if (typeof v === 'string') partes.push(v);
    else if (Array.isArray(v)) v.forEach(visitar);
    else if (v && typeof v === 'object') {
      if (typeof v.text === 'string') partes.push(v.text);
      if (typeof v.label === 'string') partes.push(v.label);
      for (const [clave, valor] of Object.entries(v)) {
        if (clave === 'type' || clave === 'text' || clave === 'label') continue;
        visitar(valor);
      }
    }
  };
  visitar(bloques);
  return partes.join(' \n ');
}

// --- Matriz probabilidad × consecuencia -------------------------------------

test('nivelRiesgo combina probabilidad y consecuencia en tres niveles', () => {
  assert.deepStrictEqual(nivelRiesgo(1, 1), { valor: 1, etiqueta: 'Bajo' });
  assert.deepStrictEqual(nivelRiesgo(2, 2), { valor: 4, etiqueta: 'Medio' });
  assert.deepStrictEqual(nivelRiesgo(3, 3), { valor: 9, etiqueta: 'Alto' });
});

// --- buildNotificacion ------------------------------------------------------

test('buildNotificacion devuelve bloques y el primero es un título', () => {
  const bloques = buildNotificacion(cliente, 'cocina');
  assert.ok(Array.isArray(bloques) && bloques.length > 0, 'debe devolver bloques');
  assert.strictEqual(bloques[0].type, 'title');
});

test('buildNotificacion cita LOPCYMAT art. 56 num. 3 (notificación de riesgos)', () => {
  const bloques = buildNotificacion(cliente, 'cocina');
  const cita = bloques.find((x) => x.type === 'legalRef');
  assert.ok(cita, 'debe incluir una referencia legal');
  assert.strictEqual(cita.key, 'lopcymat_56_notif_riesgos');
});

test('buildNotificacion incluye matriz probabilidad × consecuencia con riesgos reales', () => {
  const bloques = buildNotificacion(cliente, 'cocina');
  const tabla = bloques.find(
    (x) => x.type === 'table' && x.header.join(' ').match(/probabilidad/i) && x.header.join(' ').match(/consecuencia/i),
  );
  assert.ok(tabla, 'debe existir la tabla de la matriz de riesgos');

  const txt = textoDe(bloques).toLowerCase();
  for (const termino of [
    'cuchillo',
    'quemadura',
    'freidora',
    'gas',
    'resbal',
    'carga',
    'químic',
    'ruido',
    'estrés',
  ]) {
    assert.match(txt, new RegExp(termino), `debe contemplar el riesgo: ${termino}`);
  }
});

test('buildNotificacion de caja/bartender contempla violencia o robo', () => {
  const txt = textoDe(buildNotificacion(cliente, 'cajero')).toLowerCase();
  assert.match(txt, /robo|asalto|violencia/, 'debe contemplar violencia/robo');
});

test('buildNotificacion exige un área conocida', () => {
  assert.throws(() => buildNotificacion(cliente, 'desconocida'), /desconocida/);
});

test('buildNotificacion define EPP y constancia de firma del trabajador', () => {
  const bloques = buildNotificacion(cliente, 'cocina');
  const firmas = bloques.find((x) => x.type === 'signatureBlock');
  assert.ok(firmas && firmas.signers.length >= 1, 'debe incluir bloque de firmas');
  assert.match(textoDe(bloques).toLowerCase(), /guante/, 'debe listar EPP');
});

test('buildNotificacion no escribe el nombre de la ley a mano en el texto', () => {
  const bloques = buildNotificacion(cliente, 'cocina');
  const visibles = bloques
    .map((b) => (b.type === 'legalRef' ? (b.ref && b.ref.texto) || '' : b.text || ''))
    .join(' ');
  assert.ok(
    !/LOPCYMAT/.test(visibles),
    'el texto renderizado no debe nombrar la LOPCYMAT a mano (usar legalRef)',
  );
});

// --- Módulos 05_* -----------------------------------------------------------

test('existen al menos los 10 módulos del ticket (7 notificaciones + EPP + examen + cartilla)', () => {
  const archivos = modulos05();
  assert.ok(archivos.length >= 10, `esperaba >=10 módulos 05_, hay ${archivos.length}`);
});

test('cada módulo 05_* carga, declara metadatos y su primer bloque es title', () => {
  for (const archivo of modulos05()) {
    const mod = cargar(archivo);
    assert.strictEqual(mod.dir, '05_SEGURIDAD_LABORAL', `${archivo}: dir`);
    assert.ok(mod.id && mod.filename, `${archivo}: id/filename`);
    assert.strictEqual(typeof mod.blocks, 'function', `${archivo}: blocks debe ser función`);
    const bloques = mod.blocks(cliente);
    assert.ok(Array.isArray(bloques) && bloques.length > 0, `${archivo}: bloques`);
    assert.strictEqual(bloques[0].type, 'title', `${archivo}: primer bloque title`);
  }
});

test('el examen médico pre-empleo cita la LOPCYMAT art. 53 num. 10', () => {
  const bloques = cargar('05_examen.js').blocks(cliente);
  const cita = bloques.find((x) => x.type === 'legalRef');
  assert.ok(cita, 'debe incluir referencia legal');
  assert.strictEqual(cita.key, 'lopcymat_53_10_examen');
});

test('la cartilla de manipulación de alimentos cubre higiene y acuse de recibo', () => {
  const bloques = cargar('05_cartilla.js').blocks(cliente);
  const txt = textoDe(bloques).toLowerCase();
  assert.match(txt, /lavado de manos|manos/, 'debe tratar el lavado de manos');
  assert.match(txt, /frío|cadena de frío/, 'debe tratar la cadena de frío');
  assert.match(txt, /contaminación cruzada/, 'debe tratar la contaminación cruzada');
  assert.ok(bloques.find((x) => x.type === 'signatureBlock'), 'debe incluir acuse de recibo');
});

// --- Construcción DOCX/PDF --------------------------------------------------

test('construye .docx y .pdf no vacíos para todos los módulos del ticket', async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kit-05-'));
  try {
    const trabajos = build.trabajos().filter((t) => String(t.id).startsWith('05_'));
    assert.ok(trabajos.length >= 10, `esperaba >=10 trabajos 05_, hay ${trabajos.length}`);
    for (const trabajo of trabajos) {
      const res = await build.construir(trabajo, {
        out: path.join(tmp, `${trabajo.id}.docx`),
        outPdf: path.join(tmp, `${trabajo.id}.pdf`),
      });
      assert.ok(res.bytesDocx > 0, `${trabajo.id}: docx vacío`);
      assert.ok(res.bytesPdf > 0, `${trabajo.id}: pdf vacío`);
    }
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
