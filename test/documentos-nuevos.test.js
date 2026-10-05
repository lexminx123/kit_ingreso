'use strict';

// Documentos nuevos del Kit Icabaru (10 módulos):
//   - 08f_acoso.js                (políticas internas)
//   - 05_emergencias.js           (seguridad laboral)
//   - 04c_recibo_pago.js          (prestaciones)
//   - 06_constancias.js           (registros legales)
//   - 06_comite_sst.js            (registros legales)
//   - 05_equipos.js               (seguridad laboral)
//   - 08g_caja_propinas.js        (políticas internas)
//   - 05_examenes_periodicos.js   (seguridad laboral)
//   - 07d_descuentos.js           (autorizaciones)
//   - 09b_constancia_trabajo.js   (cierre)
//
// Verifica el contrato { id, dir, filename, blocks }, que blocks(cliente) no
// lance, que el primer bloque sea `title`, que las claves legales citadas
// existan en legal/ve.js y que el build genere .docx + .pdf en temporales.

const test = require('node:test');
const assert = require('node:assert');
const os = require('node:os');
const path = require('node:path');
const fs = require('node:fs');

const build = require('../tools/build.js');
const LEGAL = require('../legal/ve.js');

const ROOT = path.resolve(__dirname, '..');
const DOCS = path.join(ROOT, 'clientes', 'icabaru', 'docs');
const CLIENTE = require('../clientes/icabaru/cliente.json');

// Manifiesto de los 10 documentos nuevos, con las claves legales exigidas.
const MODULOS = [
  {
    archivo: '08f_acoso.js',
    id: 'politica_acoso_no_discriminacion',
    dir: '08_POLITICAS_INTERNAS',
    filename: 'Politica_Prevencion_Acoso_y_No_Discriminacion',
    legales: ['crbv_89_irrenunciabilidad', 'crbv_87_trabajo'],
  },
  {
    archivo: '05_emergencias.js',
    id: 'protocolo_emergencias_evacuacion',
    dir: '05_SEGURIDAD_LABORAL',
    filename: 'Protocolo_Emergencias_y_Evacuacion',
    legales: ['lopcymat_56_notif_riesgos', 'lopcymat_73_accidente'],
  },
  {
    archivo: '04c_recibo_pago.js',
    id: 'recibo_de_pago',
    dir: '04_PRESTACIONES',
    filename: 'Recibo_de_Pago',
    legales: ['lottt_104_salario', 'lat_2004_alimentacion', 'lottt_142_garantia'],
  },
  {
    archivo: '06_constancias.js',
    id: 'constancias_ivss_faov_inces',
    dir: '06_REGISTROS_LEGALES',
    filename: 'Constancias_IVSS_FAOV_INCES',
    legales: ['loss_2002', 'bvv_2005_faov', 'decreto_inamovilidad_2025'],
  },
  {
    archivo: '06_comite_sst.js',
    id: 'acta_comite_sst',
    dir: '06_REGISTROS_LEGALES',
    filename: 'Acta_Comite_Seguridad_y_Salud_Laboral',
    legales: ['lopcymat_46_comite', 'lopcymat_41_delegados'],
  },
  {
    archivo: '05_equipos.js',
    id: 'acta_entrega_herramientas_equipos',
    dir: '05_SEGURIDAD_LABORAL',
    filename: 'Acta_Entrega_Herramientas_y_Equipos',
    legales: ['lopcymat_53_4_epp'],
  },
  {
    archivo: '08g_caja_propinas.js',
    id: 'reglamento_caja_propinas',
    dir: '08_POLITICAS_INTERNAS',
    filename: 'Reglamento_Caja_y_Propinas',
    legales: ['lottt_104_salario'],
  },
  {
    archivo: '05_examenes_periodicos.js',
    id: 'programa_examenes_medicos_periodicos',
    dir: '05_SEGURIDAD_LABORAL',
    filename: 'Programa_Examenes_Medicos_Periodicos',
    legales: ['lopcymat_53_10_examen', 'nt_04_2023'],
  },
  {
    archivo: '07d_descuentos.js',
    id: 'consentimiento_descuentos',
    dir: '07_AUTORIZACIONES',
    filename: 'Consentimiento_Descuentos_Autorizados',
    legales: ['lottt_104_salario', 'crbv_89_irrenunciabilidad'],
  },
  {
    archivo: '09b_constancia_trabajo.js',
    id: 'constancia_de_trabajo',
    dir: '09_CIERRE',
    filename: 'Constancia_de_Trabajo',
    legales: ['lottt_104_salario', 'lottt_59_cargo'],
  },
];

/** Carga el módulo declarativo del documento. */
function cargar(modulo) {
  return require(path.join(DOCS, modulo.archivo));
}

/** Claves legales citadas dentro de una lista de bloques. */
function clavesLegales(bloques) {
  return bloques.filter((x) => x && x.type === 'legalRef').map((x) => x.key);
}

for (const modulo of MODULOS) {
  test(`[nuevos] ${modulo.archivo} cumple el contrato { id, dir, filename, blocks }`, () => {
    const def = cargar(modulo);
    assert.strictEqual(def.id, modulo.id, `id de ${modulo.archivo}`);
    assert.strictEqual(def.dir, modulo.dir, `dir de ${modulo.archivo}`);
    assert.strictEqual(def.filename, modulo.filename, `filename de ${modulo.archivo}`);
    assert.strictEqual(typeof def.blocks, 'function', `blocks() de ${modulo.archivo}`);
  });

  test(`[nuevos] ${modulo.archivo} no lanza y su primer bloque es title`, () => {
    const bloques = cargar(modulo).blocks(CLIENTE);
    assert.ok(Array.isArray(bloques) && bloques.length > 0, `${modulo.archivo}: bloques`);
    assert.strictEqual(bloques[0].type, 'title', `${modulo.archivo}: primer bloque title`);
    assert.ok(bloques[0].text, `${modulo.archivo}: el title tiene texto`);
  });

  test(`[nuevos] ${modulo.archivo} cita sus claves legales verificadas`, () => {
    const presentes = clavesLegales(cargar(modulo).blocks(CLIENTE));
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

test('[nuevos] build.descubrirModulos reconoce los 10 documentos', () => {
  const ids = new Set(build.descubrirModulos().map((m) => m.id));
  for (const modulo of MODULOS) {
    assert.ok(ids.has(modulo.id), `id descubierto: ${modulo.id}`);
  }
});

test('[nuevos] construir genera .docx + .pdf de cada documento en temporales', async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kit-nuevos-'));
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
