'use strict';

// Constancias IVSS / FAOV / INCES.
//
// Control de inscripción y constancias del trabajador ante la seguridad social,
// el régimen prestacional de vivienda y hábitat y el instituto de capacitación,
// con referencia a la inamovilidad laboral vigente. Citas solo por clave.

const b = require('../../../tools/blocks.js');
const clienteBase = require('../cliente.json');

/** Combina el cliente recibido con el cliente.json del kit (por si llega vacío). */
function contexto(cliente) {
  if (cliente && cliente.empresa) return cliente;
  return clienteBase;
}

// Constancias y trámites exigidos al ingreso, con casilla de control.
const CONSTANCIAS = [
  ['IVSS', 'Inscripción del trabajador en el IVSS (número de afiliación)', '[ ]'],
  ['IVSS', 'Constancia de afiliación y cotizaciones al IVSS', '[ ]'],
  ['FAOV / BVV', 'Inscripción del trabajador en el FAOV (BVV)', '[ ]'],
  ['FAOV / BVV', 'Constancia de aportes al FAOV / BVV', '[ ]'],
  ['INCES', 'Inscripción de la empresa y del trabajador en el INCES', '[ ]'],
  ['INCES', 'Constancia de declaración y aportes al INCES', '[ ]'],
];

module.exports = {
  id: 'constancias_ivss_faov_inces',
  dir: '06_REGISTROS_LEGALES',
  filename: 'Constancias_IVSS_FAOV_INCES',
  empresa: clienteBase.empresa,
  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const rif = c.rif || '[COMPLETAR: RIF]';
    const representante = c.representante || {};

    return [
      b.title('CONSTANCIAS IVSS / FAOV / INCES'),
      b.subtitle(`${empresa} — RIF ${rif}`),

      b.p(
        'El presente documento controla la inscripción del trabajador(ra) y la obtención de ' +
          'las constancias ante los organismos de seguridad social, de vivienda y hábitat y de ' +
          'capacitación, conforme a las normas que rigen la materia.',
      ),
      b.legalRef('loss_2002'),
      b.legalRef('bvv_2005_faov'),

      b.chapter('1. Datos del trabajador'),
      b.field('Nombre y Apellido'),
      b.field('Cédula de Identidad'),
      b.field('Cargo'),
      b.field('Área / Departamento'),
      b.field('Fecha de ingreso'),

      b.chapter('2. Constancias y trámites'),
      b.p(
        'Marque cada casilla una vez obtenida la constancia correspondiente e incorpore copia ' +
          'al expediente del trabajador(ra).',
      ),
      b.table(['Organismo', 'Constancia / Trámite', 'Obtenido'], CONSTANCIAS),
      b.field('Fecha de verificación'),
      b.field('Responsable de la gestión'),

      b.chapter('3. Datos de afiliación'),
      b.kvTable([
        { label: 'N° de afiliación IVSS', value: '' },
        { label: 'N° de cuenta FAOV / BVV', value: '' },
        { label: 'N° de inscripción INCES', value: '' },
        { label: 'Fecha de inscripción', value: '' },
      ]),

      b.chapter('4. Inamovilidad laboral'),
      b.p(
        'Se informa al trabajador(ra) que se encuentra vigente un decreto de inamovilidad ' +
          'laboral que protege a los trabajadores y las trabajadoras del sector privado ' +
          'durante su período de vigencia. En consecuencia, el despido, el traslado o la ' +
          'desmejora de condiciones requieren la calificación previa ante la autoridad ' +
          'competente.',
      ),
      b.legalRef('decreto_inamovilidad_2025'),

      b.chapter('5. Observaciones'),
      b.field('Observaciones'),

      b.chapter('6. Constancia y firma'),
      b.p(
        'Recibí la información sobre mi inscripción y las constancias indicadas en el ' +
          'presente documento.',
      ),
      b.signatureBlock([
        { rol: 'EL/LA TRABAJADOR(A)', nombre: '', cargo: '', ci: '', fecha: '' },
        {
          rol: 'LA EMPRESA',
          nombre: representante.nombre || '',
          cargo: representante.cargo || '',
          ci: representante.ci || '',
          fecha: '',
        },
      ]),
      b.note(
        'Constancias de seguridad social. Requiere revisión por abogado laboralista antes de ' +
          'su uso formal. Los porcentajes y topes de aporte deben confirmarse en el texto ' +
          'vigente.',
      ),
    ];
  },
};
