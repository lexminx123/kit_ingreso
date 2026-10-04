'use strict';

// Ticket #7 — Autorizaciones (07_*) y políticas internas (08_*).
//
// Verifica el contrato de cada módulo ({ id, dir, filename, blocks }),
// que blocks(cliente) no lance, que su primer bloque sea un `title`, que las
// citas legales exigidas estén presentes (siempre por clave verificada) y que
// el build genere .docx + .pdf en un directorio temporal aislado.

const test = require('node:test');
const assert = require('node:assert');
const os = require('node:os');
const path = require('node:path');
const fs = require('node:fs');

const build = require('../tools/build.js');

const ROOT = path.resolve(__dirname, '..');
const DOCS = path.join(ROOT, 'clientes', 'icabaru', 'docs');
const CLIENTE = require('../clientes/icabaru/cliente.json');

// Manifiesto del ticket #7.
const MODULOS = [
  {
    archivo: '07a_datos.js',
    id: 'autorizacion_datos_personales',
    dir: '07_AUTORIZACIONES',
    filename: 'Autorizacion_Datos_Personales',
    legales: ['crbv_28_habeas_data', 'delitos_informaticos_2001'],
  },
  {
    archivo: '07b_imagen.js',
    id: 'autorizacion_imagen',
    dir: '07_AUTORIZACIONES',
    filename: 'Autorizacion_Imagen_Redes_Sociales',
    legales: [],
  },
  {
    archivo: '07c_camaras.js',
    id: 'autorizacion_videovigilancia',
    dir: '07_AUTORIZACIONES',
    filename: 'Autorizacion_Videovigilancia',
    legales: [],
  },
  {
    archivo: '08a_reglamento_interno.js',
    id: 'reglamento_interno',
    dir: '08_POLITICAS_INTERNAS',
    filename: 'Reglamento_Interno_de_Trabajo',
    legales: [
      'lottt_173_jornada',
      'lottt_184_feriados',
      'lottt_188_descanso',
      'lottt_104_salario',
      'lottt_190_vacaciones',
      'lottt_192_bono_vacacional',
      'lottt_131_utilidades',
    ],
  },
  {
    archivo: '08b_codigo_conducta.js',
    id: 'codigo_conducta',
    dir: '08_POLITICAS_INTERNAS',
    filename: 'Codigo_Conducta',
    legales: [],
  },
  {
    archivo: '08c_confidencialidad.js',
    id: 'confidencialidad',
    dir: '08_POLITICAS_INTERNAS',
    filename: 'Politica_Confidencialidad',
    legales: [],
  },
  {
    archivo: '08d_redes.js',
    id: 'uso_redes_sociales',
    dir: '08_POLITICAS_INTERNAS',
    filename: 'Politica_Uso_Redes_Sociales',
    legales: [],
  },
  {
    archivo: '08e_incidentes.js',
    id: 'reporte_incidentes',
    dir: '08_POLITICAS_INTERNAS',
    filename: 'Procedimiento_Reporte_Incidentes',
    legales: ['lopcymat_73_accidente'],
  },
];

/** Carga el módulo declarativo del ticket. */
function cargar(modulo) {
  return require(path.join(DOCS, modulo.archivo));
}

/** Bloques del módulo con el cliente real. */
function bloques(modulo) {
  return cargar(modulo).blocks(CLIENTE);
}

/** Claves legales referenciadas dentro de una lista de bloques. */
function clavesLegales(bloquesDoc) {
  return bloquesDoc.filter((b) => b && b.type === 'legalRef').map((b) => b.key);
}

for (const modulo of MODULOS) {
  test(`[#7] ${modulo.archivo} cumple el contrato { id, dir, filename, blocks }`, () => {
    const def = cargar(modulo);
    assert.strictEqual(def.id, modulo.id, `id de ${modulo.archivo}`);
    assert.strictEqual(def.dir, modulo.dir, `dir de ${modulo.archivo}`);
    assert.strictEqual(def.filename, modulo.filename, `filename de ${modulo.archivo}`);
    assert.strictEqual(typeof def.blocks, 'function', `blocks() de ${modulo.archivo}`);
  });

  test(`[#7] ${modulo.archivo} produce bloques con title primero y no lanza`, () => {
    const lista = bloques(modulo);
    assert.ok(Array.isArray(lista), `blocks(cliente) devuelve un arreglo`);
    assert.ok(lista.length > 0, `blocks(cliente) no está vacío`);
    assert.strictEqual(lista[0].type, 'title', `primer bloque es title`);
    assert.ok(lista[0].text, `el title tiene texto`);
  });

  test(`[#7] ${modulo.archivo} cita las claves legales exigidas`, () => {
    if (modulo.legales.length === 0) return;
    const presentes = clavesLegales(bloques(modulo));
    for (const clave of modulo.legales) {
      assert.ok(
        presentes.includes(clave),
        `${modulo.archivo} debe citar "${clave}" (presentes: ${presentes.join(', ')})`,
      );
    }
  });
}

test('[#7] build.descubrirModulos reconoce los 9 documentos del ticket', () => {
  const ids = new Set(build.descubrirModulos().map((m) => m.id));
  for (const modulo of MODULOS) {
    assert.ok(ids.has(modulo.id), `id descubierto: ${modulo.id}`);
  }
});

test('[#7] construir genera .docx + .pdf de cada documento en temporales', async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kit-t7-'));
  try {
    const porId = new Map(build.descubrirModulos().map((m) => [m.id, m]));
    for (const modulo of MODULOS) {
      const trabajo = porId.get(modulo.id);
      assert.ok(trabajo, `módulo descubierto: ${modulo.id}`);
      const res = await build.construir(trabajo, { baseClientes: tmp });
      assert.ok(res.bytesDocx > 0, `${modulo.filename}: .docx con contenido`);
      assert.ok(res.bytesPdf > 0, `${modulo.filename}: .pdf con contenido`);
      assert.ok(
        res.destinoDocx.endsWith(path.join(modulo.dir, `${modulo.filename}.docx`)),
        `${modulo.filename}: ruta .docx`,
      );
      assert.ok(
        res.destinoPdf.endsWith(path.join(modulo.dir, `${modulo.filename}.pdf`)),
        `${modulo.filename}: ruta .pdf`,
      );
    }
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
