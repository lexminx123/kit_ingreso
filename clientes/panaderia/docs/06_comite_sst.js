'use strict';

// Acta de Constitución del Comité de Seguridad y Salud Laboral.
//
// Deja constancia de la constitución del Comité, la designación de los delegados
// o delegadas de prevención y las funciones asumidas. Cita por clave el Comité y
// los delegados de prevención.

const b = require('../../../tools/blocks.js');
const clienteBase = require('../cliente.json');

/** Combina el cliente recibido con el cliente.json del kit (por si llega vacío). */
function contexto(cliente) {
  if (cliente && cliente.empresa) return cliente;
  return clienteBase;
}

// Funciones principales de los delegados o delegadas de prevención.
const FUNCIONES = [
  'Constituir el Comité junto con los representantes del patrono.',
  'Acompañar las inspecciones de seguridad y salud en el trabajo.',
  'Recibir y canalizar las denuncias del personal sobre condiciones inseguras.',
  'Promover la capacitación y la participación en materia de prevención.',
  'Vigilar el cumplimiento de las medidas de seguridad y salud laboral.',
  'Informar al Comité y al patrono sobre los riesgos detectados.',
];

module.exports = {
  id: 'acta_comite_sst',
  dir: '06_REGISTROS_LEGALES',
  filename: 'Acta_Comite_Seguridad_y_Salud_Laboral',
  empresa: clienteBase.empresa,
  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const rif = c.rif || '[COMPLETAR: RIF]';
    const representante = c.representante || {};

    return [
      b.title('ACTA DE CONSTITUCIÓN DEL COMITÉ DE SEGURIDAD Y SALUD LABORAL'),
      b.subtitle(`${empresa} — RIF ${rif}`),

      b.p(
        'En el centro de trabajo indicado se reunieron los representantes del patrono y los ' +
          'delegados o delegadas de prevención elegidos por las trabajadoras y los ' +
          'trabajadores, con el objeto de constituir el Comité de Seguridad y Salud Laboral, ' +
          'órgano paritario y colegiado de participación en la materia.',
      ),
      b.legalRef('lopcymat_46_comite'),
      b.legalRef('lopcymat_41_delegados'),

      b.chapter('1. Lugar y fecha de la constitución'),
      b.field('Lugar'),
      b.field('Fecha'),
      b.field('Hora de inicio'),
      b.field('Hora de cierre'),

      b.chapter('2. Representantes del patrono'),
      b.table(
        ['Nombre y Apellido', 'Cédula de Identidad', 'Cargo', 'Firma'],
        [
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
        ],
      ),

      b.chapter('3. Delegados y delegadas de prevención'),
      b.p(
        'Se deja constancia de los delegados y delegadas de prevención elegidos por el ' +
          'personal, quienes representan a los trabajadores y las trabajadoras ante el ' +
          'Comité.',
      ),
      b.table(
        ['Nombre y Apellido', 'Cédula de Identidad', 'Área / Turno', 'Firma'],
        [
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
        ],
      ),

      b.chapter('4. Funciones asumidas'),
      ...FUNCIONES.map((funcion) => b.numbered(funcion)),

      b.chapter('5. Periodicidad y registro'),
      b.p(
        'El Comité sesiona de forma ordinaria con la periodicidad que acuerde y de forma ' +
          'extraordinaria cuando sea necesario. Sus actuaciones se registran en actas y se ' +
          'informan al organismo competente conforme a la ley.',
      ),
      b.field('Periodicidad de las reuniones'),
      b.field('Responsable de las actas'),
      b.field('Fecha de registro ante el organismo competente'),

      b.chapter('6. Aprobación y firma'),
      b.p(
        'No habiendo otro asunto que tratar, se levanta la presente acta, que suscriben los ' +
          'presentes en señal de conformidad.',
      ),
      b.signatureBlock([
        {
          rol: 'REPRESENTANTE DEL PATRONO',
          nombre: representante.nombre || '',
          cargo: representante.cargo || '',
          ci: representante.ci || '',
          fecha: '',
        },
        { rol: 'DELEGADO(A) DE PREVENCIÓN', nombre: '', cargo: '', ci: '', fecha: '' },
      ]),
      b.note(
        'Acta de constitución del Comité de Seguridad y Salud Laboral. Requiere revisión por ' +
          'abogado laboralista antes de su uso formal. Se registra ante el organismo ' +
          'competente.',
      ),
    ];
  },
};
