'use strict';

// Reglamento de Caja y Propinas — panadería y pastelería.
//
// Regula el manejo de la caja, los arqueos, los faltantes y sobrantes, y la
// administración y el reparto de las propinas del personal. Cita por clave la
// definición de salario (nunca el nombre de la ley a mano).

const b = require('../../../tools/blocks.js');
const clienteBase = require('../cliente.json');

/** Combina el cliente recibido con el cliente.json del kit (por si llega vacío). */
function contexto(cliente) {
  if (cliente && cliente.empresa) return cliente;
  return clienteBase;
}

// Causas frecuentes de diferencias en el arqueo de caja.
const DIFERENCIAS = [
  ['Faltante', 'Dinero menor al esperado al cierre del turno.'],
  ['Sobrante', 'Dinero mayor al esperado al cierre del turno.'],
  ['Error de cobro', 'Monto cobrado distinto al registrado en el sistema.'],
  ['Error de vuelto', 'Devolución incorrecta de cambio al cliente.'],
  ['Registro omitido', 'Venta realizada sin registrar en el punto de venta.'],
];

module.exports = {
  id: 'reglamento_caja_propinas',
  dir: '08_POLITICAS_INTERNAS',
  filename: 'Reglamento_Caja_y_Propinas',
  empresa: clienteBase.empresa,
  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const rif = c.rif || '[COMPLETAR: RIF]';
    const representante = c.representante || {};

    return [
      b.title('REGLAMENTO DE CAJA Y PROPINAS'),
      b.subtitle(`${empresa} — RIF ${rif}`),

      b.p(
        'El presente reglamento establece las normas para el manejo de la caja, los arqueos y ' +
          'la administración y el reparto de las propinas del personal de ' +
          empresa +
          '. Su contenido se interpreta y aplica conforme a la legislación laboral vigente.',
      ),
      b.legalRef('lottt_104_salario'),

      b.chapter('CAPÍTULO I. Disposiciones generales'),
      b.numbered('El manejo de la caja se realiza únicamente por el personal autorizado.'),
      b.numbered('Cada turno inicia y cierra con el arqueo y el registro correspondiente.'),
      b.numbered('La caja se abre con el fondo fijo asignado y se cierra con el cuadre de las ventas.'),
      b.numbered('Las diferencias se documentan y se reportan de inmediato al supervisor.'),

      b.chapter('CAPÍTULO II. Apertura y cierre de caja'),
      b.field('Responsable de la caja'),
      b.field('Fondo fijo asignado'),
      b.field('Turno'),
      b.field('Fecha de apertura'),
      b.field('Hora de apertura'),
      b.field('Monto de apertura'),
      b.field('Hora de cierre'),
      b.field('Monto de cierre'),

      b.chapter('CAPÍTULO III. Arqueo de caja'),
      b.p(
        'El arqueo se practica al cierre del turno y, de forma sorpresiva, cuando la empresa ' +
          'lo considere necesario. El arqueo compara el efectivo físico, los pagos ' +
          'electrónicos y las ventas registradas en el punto de venta.',
      ),
      b.kvTable([
        { label: 'Efectivo contado', value: '' },
        { label: 'Pagos electrónicos', value: '' },
        { label: 'Ventas registradas', value: '' },
        { label: 'Diferencia (faltante / sobrante)', value: '' },
      ]),
      b.table(['Tipo de diferencia', 'Descripción'], DIFERENCIAS),
      b.field('Observaciones del arqueo'),

      b.chapter('CAPÍTULO IV. Faltantes y sobrantes'),
      b.numbered('El faltante injustificado se documenta y se informa al supervisor y a la administración.'),
      b.numbered('El sobrante se registra y se incorpora al cierre del turno.'),
      b.numbered(
        'Cuando corresponda un descuento por faltante, se aplica solo con la autorización ' +
          'previa y por escrito del trabajador(ra), conforme a la ley.',
      ),
      b.numbered('El faltante por error comprobado se corrige en el registro del turno.'),

      b.chapter('CAPÍTULO V. Propinas'),
      b.p(
        'Las propinas son cantidades entregadas voluntariamente por los clientes al personal. ' +
          'La empresa las administra por cuenta de los trabajadores y las trabajadoras, sin ' +
          'retenerlas indebidamente, y define la forma de registro y reparto entre el personal ' +
          'que participó en el servicio.',
      ),
      b.numbered('Las propinas se registran diariamente, por separado del arqueo de caja.'),
      b.numbered('El reparto se realiza entre el personal que participó en el servicio del turno.'),
      b.numbered('El criterio de reparto se informa por escrito al personal.'),
      b.numbered('Las propinas no pueden ser retenidas indebidamente ni usadas para cubrir faltantes de caja.'),
      b.numbered(
        'Cuando las propinas integren el salario conforme a la ley, se reflejan en el recibo de ' +
          'pago correspondiente.',
      ),
      b.field('Criterio de reparto de propinas'),
      b.field('Responsable del registro de propinas'),

      b.chapter('CAPÍTULO VI. Prohibiciones'),
      b.numbered('Apropiarse de dinero, propinas o bienes de la empresa o de terceros.'),
      b.numbered('Realizar ventas sin registrar en el punto de venta.'),
      b.numbered('Modificar, anular o falsear registros de caja o de propinas.'),
      b.numbered('Compartir claves o accesos del sistema de caja con personas no autorizadas.'),

      b.chapter('CAPÍTULO VII. Sanciones'),
      b.p(
        'El incumplimiento de este reglamento se considera una falta leve, grave o muy grave, ' +
          'según el caso, y se sanciona conforme al reglamento interno, sin perjuicio de las ' +
          'responsabilidades legales que correspondan.',
      ),

      b.chapter('Acuse de recibo'),
      b.p(
        'Declaro haber recibido y comprendido el presente Reglamento de Caja y Propinas, y me ' +
          'comprometo a respetarlo.',
      ),
      b.field('Nombre y Apellido'),
      b.field('Cédula de Identidad'),
      b.field('Cargo'),
      b.field('Fecha'),

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
        'Reglamento de caja y propinas. Requiere revisión por abogado laboralista antes de su ' +
          'uso formal. Se entrega junto con el reglamento interno.',
      ),
    ];
  },
};
