'use strict';

// Documentos de seguridad laboral faltantes del Kit Icabaru:
//   05_recorrido.js       — riesgo del trayecto (in itinere)
//   05_uniforme.js        — acta de entrega de uniforme y dotación
//   05_programa_sst.js    — Programa de Seguridad y Salud en el Trabajo
//
// Además verifica el manifiesto de campos para llenado automático
// (clientes/<slug>/entregables/_manifest.json) que produce tools/build.js.

const test = require('node:test');
const assert = require('node:assert');
const os = require('node:os');
const path = require('node:path');
const fs = require('node:fs');
const cp = require('node:child_process');

const build = require('../tools/build.js');

const ROOT = path.resolve(__dirname, '..');
const DOCS = path.join(ROOT, 'clientes', 'icabaru', 'docs');
const CLIENTE = require('../clientes/icabaru/cliente.json');
const LEGAL = require('../legal/ve.js');

// Cada módulo nuevo, con las claves legales que debe citar.
const MODULOS = [
  {
    archivo: '05_recorrido.js',
    id: '05_recorrido',
    dir: '05_SEGURIDAD_LABORAL',
    filename: 'Hoja_Recorrido_Habitual',
    legales: ['lopcymat_69_3_itinere'],
  },
  {
    archivo: '05_uniforme.js',
    id: '05_uniforme',
    dir: '05_SEGURIDAD_LABORAL',
    filename: 'Acta_Entrega_Uniforme_y_Dotacion',
    legales: ['lopcymat_53_4_epp'],
  },
  {
    archivo: '05_programa_sst.js',
    id: '05_programa_sst',
    dir: '05_SEGURIDAD_LABORAL',
    filename: 'Programa_Seguridad_y_Salud_Laboral',
    legales: [
      'nt_04_2023',
      'lopcymat_46_comite',
      'lopcymat_53_4_epp',
      'lopcymat_56_notif_riesgos',
      'reglamento_lopcymat_2007',
    ],
  },
];

/** Carga una lista de bloques del módulo con el cliente real. */
function bloquesDe(modulo) {
  return require(path.join(DOCS, modulo.archivo)).blocks(CLIENTE);
}

/** Claves legales citadas dentro de una lista de bloques. */
function clavesLegales(bloques) {
  return bloques.filter((x) => x && x.type === 'legalRef').map((x) => x.key);
}

for (const modulo of MODULOS) {
  test(`[faltantes] ${modulo.archivo} cumple el contrato { id, dir, filename, blocks }`, () => {
    const def = require(path.join(DOCS, modulo.archivo));
    assert.strictEqual(def.id, modulo.id, `id de ${modulo.archivo}`);
    assert.strictEqual(def.dir, modulo.dir, `dir de ${modulo.archivo}`);
    assert.strictEqual(def.filename, modulo.filename, `filename de ${modulo.archivo}`);
    assert.strictEqual(typeof def.blocks, 'function', `blocks() de ${modulo.archivo}`);
  });

  test(`[faltantes] ${modulo.archivo} no lanza y su primer bloque es title`, () => {
    const bloques = bloquesDe(modulo);
    assert.ok(Array.isArray(bloques) && bloques.length > 0, `${modulo.archivo}: bloques`);
    assert.strictEqual(bloques[0].type, 'title', `${modulo.archivo}: primer bloque title`);
    assert.ok(bloques[0].text, `${modulo.archivo}: el title tiene texto`);
  });

  test(`[faltantes] ${modulo.archivo} cita sus claves legales verificadas`, () => {
    const presentes = clavesLegales(bloquesDe(modulo));
    for (const clave of modulo.legales) {
      assert.ok(
        Object.prototype.hasOwnProperty.call(LEGAL, clave),
        `${modulo.archivo}: la clave "${clave}" debe existir en legal/ve.js`,
      );
      assert.ok(
        presentes.includes(clave),
        `${modulo.archivo}: debe citar "${clave}" (presentes: ${presentes.join(', ')})`,
      );
    }
  });
}

// --- Manifiesto de campos para llenado automático ---------------------------

test('[faltantes] node tools/build.js --all genera _manifest.json con los 53 documentos', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kit-faltantes-'));
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

    const ruta = path.join(tmp, 'clientes', 'icabaru', 'entregables', '_manifest.json');
    assert.ok(fs.existsSync(ruta), 'debe existir _manifest.json');

    const manifiesto = JSON.parse(fs.readFileSync(ruta, 'utf8'));
    assert.strictEqual(manifiesto.cliente, 'icabaru');
    assert.ok(manifiesto.generado, 'debe declarar una fecha de generación');
    assert.ok(Array.isArray(manifiesto.documentos), 'documentos debe ser un arreglo');
    assert.strictEqual(manifiesto.documentos.length, 53, 'deben listarse 53 documentos');

    const ids = manifiesto.documentos.map((d) => d.id);
    for (const modulo of MODULOS) {
      assert.ok(ids.includes(modulo.id), `el manifiesto incluye ${modulo.id}`);
    }

    for (const doc of manifiesto.documentos) {
      assert.ok(doc.carpeta && doc.archivo, `${doc.id}: carpeta/archivo`);
      assert.strictEqual(doc.docx, `${doc.carpeta}/${doc.archivo}.docx`, `${doc.id}: ruta docx`);
      assert.strictEqual(doc.pdf, `${doc.carpeta}/${doc.archivo}.pdf`, `${doc.id}: ruta pdf`);
      assert.ok(Array.isArray(doc.campos), `${doc.id}: campos debe ser arreglo`);
      assert.ok(doc.campos.length >= 1, `${doc.id}: debe tener al menos un campo`);
    }

    // Ordenado por carpeta y luego por archivo.
    const claves = manifiesto.documentos.map((d) => `${d.carpeta}/${d.archivo}`);
    const ordenadas = [...claves].sort();
    assert.deepStrictEqual(claves, ordenadas, 'los documentos deben estar ordenados');
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
