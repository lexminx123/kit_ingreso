'use strict';

// Consentimiento para Descuentos Autorizados.
//
// Autorización escrita del trabajador(ra) para los descuentos que se practiquen
// sobre su remuneración, con indicación del concepto, el monto o porcentaje y la
// periodicidad. Cita por clave la definición de salario y la irrenunciabilidad
// de los derechos laborales.

const b = require('../../../tools/blocks.js');
const clienteBase = require('../cliente.json');

/** Combina el cliente recibido con el cliente.json del kit (por si llega vacío). */
function contexto(cliente) {
  if (cliente && cliente.empresa) return cliente;
  return clienteBase;
}

// Descuentos que el trabajador(ra) puede autorizar; montos a completar.
const DESCUENTOS = [
  ['Cuota de préstamo o adelanto de salario', '', ''],
  ['Cuota de crédito o financiamiento', '', ''],
  ['Aporte voluntario a caja de ahorro', '', ''],
  ['Aporte voluntario a seguro o plan de salud', '', ''],
  ['Cuota sindical, cuando corresponda', '', ''],
  ['Otro descuento autorizado', '', ''],
];

module.exports = {
  id: 'consentimiento_descuentos',
  dir: '07_AUTORIZACIONES',
  filename: 'Consentimiento_Descuentos_Autorizados',
  empresa: clienteBase.empresa,
  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const rif = c.rif || '[COMPLETAR: RIF]';
    const representante = c.representante || {};

    return [
      b.title('CONSENTIMIENTO PARA DESCUENTOS AUTORIZADOS'),
      b.subtitle(`${empresa} — RIF ${rif}`),

      b.p(
        'Por medio de la presente manifiesto, de forma libre, expresa e informada, mi ' +
          'consentimiento para que ' +
          empresa +
          ' practique sobre mi remuneración los descuentos que autorizo a continuación, con ' +
          'indicación de su concepto, monto o porcentaje y periodicidad.',
      ),
      b.legalRef('lottt_104_salario'),
      b.legalRef('crbv_89_irrenunciabilidad'),

      b.chapter('1. Datos del trabajador'),
      b.field('Nombre y Apellido'),
      b.field('Cédula de Identidad'),
      b.field('Cargo'),
      b.field('Área / Departamento'),
      b.field('Fecha de ingreso'),

      b.chapter('2. Descuentos autorizados'),
      b.p(
        'Completo, para cada concepto, el monto o porcentaje y la periodicidad del descuento. ' +
          'Los conceptos no marcados no serán objeto de descuento.',
      ),
      b.table(
        ['Concepto del descuento', 'Monto o porcentaje', 'Periodicidad'],
        DESCUENTOS,
      ),

      b.chapter('3. Modalidad y vigencia'),
      b.field('Modalidad del descuento (fijo / porcentaje)'),
      b.field('Fecha de inicio'),
      b.field('Fecha de finalización (si aplica)'),
      b.field('Descuento máximo mensual aplicable'),

      b.chapter('4. Límites y derechos'),
      b.p(
        'Reconozco que los descuentos se aplican únicamente sobre conceptos y en los límites ' +
          'que la ley permite, y que esta autorización no puede afectar los derechos ' +
          'irrenunciables que la ley me reconoce. Los descuentos legales obligatorios no ' +
          'requieren autorización.',
      ),
      b.numbered('Los descuentos no pueden menoscabar el salario mínimo ni los derechos irrenunciables.'),
      b.numbered('Se me informará el detalle de cada descuento en el recibo de pago correspondiente.'),
      b.numbered('Puedo solicitar información sobre el saldo y el estado de cada descuento.'),

      b.chapter('5. Revocatoria'),
      b.p(
        'Puedo revocar esta autorización por escrito en cualquier momento, salvo cuando la ' +
          'obligación que origine el descuento se haya contraído con la empresa o con un ' +
          'tercero con mi consentimiento y mientras subsista la deuda.',
      ),
      b.field('Observaciones'),

      b.chapter('6. Constancia y firma'),
      b.p(
        'Declaro haber leído, comprendido y aceptado el contenido de esta autorización, que ' +
          'suscribo de forma voluntaria.',
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
        'Autorización de descuentos. Requiere revisión por abogado laboralista antes de su uso ' +
          'formal. Se firma por duplicado; un ejemplar queda en poder del trabajador(ra).',
      ),
    ];
  },
};
