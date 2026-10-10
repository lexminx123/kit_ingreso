'use strict';

// Checklist de inscripción y constancias ante IVSS, FAOV/BVV e INCES.
//
// Citas legales solo por clave contra legal/ve.js (nunca se escriben a mano).

const cliente = require('../cliente.json');
const b = require('../../../tools/blocks.js');

// Constancias y trámites exigidos al ingreso, con casilla de control.
const CONSTANCIAS = [
  ['IVSS', 'Inscripción del trabajador en el IVSS (número de afiliación)', '[ ]'],
  ['IVSS', 'Constancia de afiliación y cotizaciones al IVSS', '[ ]'],
  ['FAOV / BVV', 'Inscripción del trabajador en el FAOV (BVV)', '[ ]'],
  ['FAOV / BVV', 'Constancia de aportes al FAOV / BVV', '[ ]'],
  ['INCES', 'Inscripción de la empresa y del trabajador en el INCES', '[ ]'],
  ['INCES', 'Constancia de declaración y aportes al INCES', '[ ]'],
  ['Paro forzoso', 'Inscripción del trabajador en el régimen de paro forzoso', '[ ]'],
  ['RIF', 'Constancia de RIF del trabajador', '[ ]'],
];

module.exports = {
  id: 'checklist_ivss_faov_inces',
  dir: '06_REGISTROS_LEGALES',
  filename: 'Checklist_IVSS_FAOV_INCES',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.empresa ? entrada : cliente;

    return [
      b.title('CHECKLIST IVSS / FAOV / INCES'),
      b.subtitle(`Registros legales del trabajador — ${c.empresa}`),

      b.p(
        'Control de inscripción y constancias ante los organismos de seguridad ' +
          'social y de formación. Marque cada casilla una vez obtenida la constancia ' +
          'correspondiente.',
      ),

      b.chapter('Datos del trabajador'),
      b.field('Nombre y Apellido'),
      b.field('Cédula de Identidad'),
      b.field('Cargo'),
      b.field('Fecha de ingreso'),

      b.chapter('Constancias y trámites'),
      b.table(
        ['Organismo', 'Constancia / Trámite', 'Obtenido'],
        CONSTANCIAS.map(([organismo, tramite, check]) => [organismo, tramite, check]),
      ),

      b.chapter('Base legal'),
      b.p(
        'La inscripción y el aporte a la seguridad social y al régimen prestacional ' +
          'de vivienda y hábitat se rigen por las normas siguientes:',
      ),
      b.legalRef('loss_2002'),
      b.legalRef('bvv_2005_faov'),

      b.chapter('Observaciones'),
      b.field('Observaciones'),
      b.field('Responsable de la gestión'),

      b.note(
        'Incorpore copia de cada constancia al expediente del trabajador y conserve ' +
          'el original cuando corresponda.',
      ),

      b.signatureBlock([
        { rol: 'EL/LA TRABAJADOR(A)', nombre: '', cargo: '', ci: '', fecha: '' },
        { rol: 'LA EMPRESA', nombre: '', cargo: '', ci: '', fecha: '' },
      ]),
    ];
  },
};
