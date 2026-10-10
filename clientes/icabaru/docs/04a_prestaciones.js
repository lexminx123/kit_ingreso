'use strict';

// Autorización de depósito de prestaciones sociales.
//
// Citas legales solo por clave contra legal/ve.js (nunca se escriben a mano).

const cliente = require('../cliente.json');
const b = require('../../../tools/blocks.js');

module.exports = {
  id: 'autorizacion_deposito_prestaciones',
  dir: '04_PRESTACIONES',
  filename: 'Autorizacion_Deposito_Prestaciones',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.empresa ? entrada : cliente;
    const garantia = b.legalRefText('lottt_142_garantia');
    const deposito = b.legalRefText('lottt_143_deposito');

    return [
      b.title('AUTORIZACIÓN DE DEPÓSITO DE PRESTACIONES'),
      b.subtitle(`Kit de Ingreso del Trabajador — ${c.empresa}`),

      b.p(
        'Por medio de la presente, el/la trabajador(a) autoriza a la empresa a ' +
          'realizar el depósito de la garantía de sus prestaciones sociales conforme ' +
          `a lo previsto en el ${garantia} y el ${deposito}.`,
      ),

      b.chapter('Datos del trabajador'),
      b.field('Nombre y Apellido'),
      b.field('Cédula de Identidad'),
      b.field('Cargo'),
      b.field('Fecha de ingreso'),

      b.chapter('Modalidad del depósito'),
      b.p(
        'El depósito trimestral de la garantía de prestaciones sociales se realizará ' +
          'en la modalidad que el/la trabajador(a) seleccione a continuación:',
      ),
      b.field('Cuenta de fideicomiso (banco / entidad)'),
      b.field('Cuenta de ahorro (banco / número)'),
      b.field('Contabilidad de la empresa (por no indicar institución financiera)'),

      b.chapter('Declaración'),
      b.p(
        'Declaro que la selección anterior se realiza de manera libre, expresa e ' +
          'informada, y que conozco el derecho que me asiste sobre la garantía de mis ' +
          'prestaciones sociales.',
      ),

      b.legalRef('lottt_142_garantia'),
      b.legalRef('lottt_143_deposito'),

      b.note(
        'El presente documento se firma por duplicado, quedando un ejemplar en poder ' +
          'de la empresa y otro en poder del trabajador.',
      ),

      b.signatureBlock([
        { rol: 'EL/LA TRABAJADOR(A)', nombre: '', cargo: '', ci: '', fecha: '' },
        { rol: 'LA EMPRESA', nombre: '', cargo: '', ci: '', fecha: '' },
      ]),
    ];
  },
};
