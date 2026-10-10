'use strict';

// Recibo de Pago — mensual / quincenal.
//
// Deja constancia de los conceptos salariales y no salariales pagados al
// trabajador(ra) en el período, con su carácter y los montos correspondientes.
// Cita por clave la definición de salario, el beneficio de alimentación y la
// garantía de prestaciones sociales.

const b = require('../../../tools/blocks.js');
const clienteBase = require('../cliente.json');

/** Combina el cliente recibido con el cliente.json del kit (por si llega vacío). */
function contexto(cliente) {
  if (cliente && cliente.empresa) return cliente;
  return clienteBase;
}

// Conceptos habituales del esquema de remuneración, con su carácter salarial.
const CONCEPTOS = [
  ['Salario Base', 'SALARIAL'],
  ['Bono de Alimentación (Cestaticket)', 'SALARIAL'],
  ['Bono de Buen Vivir', 'NO SALARIAL'],
  ['Bono de Transporte', 'NO SALARIAL'],
  ['Otros beneficios no salariales', 'NO SALARIAL'],
];

module.exports = {
  id: 'recibo_de_pago',
  dir: '04_PRESTACIONES',
  filename: 'Recibo_de_Pago',
  empresa: clienteBase.empresa,
  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const rif = c.rif || '[COMPLETAR: RIF]';
    const representante = c.representante || {};

    // Si el cliente declara un esquema de remuneración, se usa como base del recibo.
    const esquema =
      c.remuneracion && Array.isArray(c.remuneracion.esquema) && c.remuneracion.esquema.length
        ? c.remuneracion.esquema.map((e) => [e.concepto, e.caracter || '', e.quincenal != null ? String(e.quincenal) : ''])
        : CONCEPTOS.map(([concepto, caracter]) => [concepto, caracter, '']);

    return [
      b.title('RECIBO DE PAGO'),
      b.subtitle(`${empresa} — RIF ${rif}`),

      b.p(
        'Se deja constancia del pago efectuado al trabajador(ra) en el período indicado, ' +
          'discriminando los conceptos salariales y no salariales que lo integran y su ' +
          'carácter conforme a la ley.',
      ),
      b.legalRef('lottt_104_salario'),

      b.chapter('1. Datos del trabajador'),
      b.field('Nombre y Apellido'),
      b.field('Cédula de Identidad'),
      b.field('Cargo'),
      b.field('Área / Departamento'),
      b.field('Fecha de ingreso'),

      b.chapter('2. Datos del período'),
      b.kvTable([
        { label: 'Período pagado', value: '' },
        { label: 'Tipo de pago (mensual / quincenal)', value: '' },
        { label: 'Fecha de pago', value: '' },
        { label: 'Forma de pago', value: '' },
        { label: 'N° de recibo', value: '' },
      ]),

      b.chapter('3. Conceptos pagados'),
      b.p(
        'Se indican los conceptos con su carácter (salarial o no salarial) y el monto ' +
          'correspondiente. Los beneficios sociales de carácter no remunerativo no forman ' +
          'parte del salario, conforme a la ley.',
      ),
      b.table(['Concepto', 'Carácter', 'Monto (USD / Bs.)'], esquema),
      b.field('Total salarial'),
      b.field('Total no salarial'),
      b.field('Total pagado'),

      b.chapter('4. Beneficio de alimentación'),
      b.p(
        'El beneficio de alimentación se otorga conforme a la ley que regula la materia, en ' +
          'la modalidad y el monto vigentes, y se identifica de forma separada en este recibo.',
      ),
      b.legalRef('lat_2004_alimentacion'),
      b.field('Modalidad del beneficio de alimentación'),
      b.field('Monto del período'),

      b.chapter('5. Prestaciones sociales'),
      b.p(
        'El depósito o acreditación de la garantía de prestaciones sociales se efectúa ' +
          'conforme al régimen legal. Este recibo no extingue ni sustituye el derecho del ' +
          'trabajador(ra) sobre sus prestaciones sociales.',
      ),
      b.legalRef('lottt_142_garantia'),

      b.chapter('6. Observaciones'),
      b.field('Observaciones'),

      b.chapter('7. Constancia y firma'),
      b.p(
        'Recibí conforme el monto indicado en el presente recibo de pago, correspondiente al ' +
          'período señalado.',
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
        'Recibo de pago. Requiere revisión por abogado laboralista antes de su uso formal. ' +
          'Se entrega una copia al trabajador(ra) y otra se conserva en el expediente.',
      ),
    ];
  },
};
