'use strict';

// Designación de beneficiarios de prestaciones sociales y demás derechos.
//
// Cita legal por clave contra legal/ve.js (nunca se escribe a mano).

const cliente = require('../cliente.json');
const b = require('../../../tools/blocks.js');

module.exports = {
  id: 'designacion_beneficiarios',
  dir: '04_PRESTACIONES',
  filename: 'Designacion_Beneficiarios',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.empresa ? entrada : cliente;
    const herederos = b.legalRefText('lottt_145_herederos');

    return [
      b.title('DESIGNACIÓN DE BENEFICIARIOS'),
      b.subtitle(`Kit de Ingreso del Trabajador — ${c.empresa}`),

      b.p(
        'El/la trabajador(a) designa a las personas indicadas a continuación como ' +
          'beneficiarias de las prestaciones sociales y demás derechos que puedan ' +
          `corresponderle, conforme al ${herederos}.`,
      ),

      b.chapter('Datos del trabajador'),
      b.field('Nombre y Apellido'),
      b.field('Cédula de Identidad'),
      b.field('Cargo'),
      b.field('Fecha de ingreso'),

      b.chapter('Beneficiarios designados'),
      b.table(
        ['N°', 'Nombre y Apellido', 'Cédula de Identidad', 'Parentesco', '%'],
        [
          ['1', '', '', '', ''],
          ['2', '', '', '', ''],
          ['3', '', '', '', ''],
          ['4', '', '', '', ''],
        ],
      ),
      b.note(
        'La sumatoria de los porcentajes debe ser igual a 100%. En caso de no llenar ' +
          'este formulario, se aplicará el orden de suceder previsto en la ley.',
      ),

      b.legalRef('lottt_145_herederos'),

      b.chapter('Declaración y firma'),
      b.p(
        'Declaro que la designación anterior la realizo de manera libre y voluntaria ' +
          'y que puedo modificarla en cualquier momento mediante manifestación escrita ' +
          'ante la empresa.',
      ),

      b.signatureBlock([
        { rol: 'EL/LA TRABAJADOR(A)', nombre: '', cargo: '', ci: '', fecha: '' },
        { rol: 'LA EMPRESA', nombre: '', cargo: '', ci: '', fecha: '' },
      ]),
    ];
  },
};
