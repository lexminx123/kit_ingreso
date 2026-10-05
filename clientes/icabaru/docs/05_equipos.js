'use strict';

// Acta de Entrega de Herramientas y Equipos del cargo.
//
// Deja constancia de las herramientas, utensilios y equipos entregados al
// trabajador(ra) para el desempeño de su puesto, su estado y su devolución.
// Cita por clave el derecho a los implementos y equipos de protección personal.

const b = require('../../../tools/blocks.js');
const clienteBase = require('../cliente.json');

/** Combina el cliente recibido con el cliente.json del kit (por si llega vacío). */
function contexto(cliente) {
  if (cliente && cliente.empresa) return cliente;
  return clienteBase;
}

// Herramientas y equipos habituales por área de trabajo; cantidades a mano.
const EQUIPOS_POR_AREA = [
  ['Cocina / parrilla', 'Cuchillos y utensilios de corte'],
  ['Cocina / parrilla', 'Tablas, ollas y sartenes'],
  ['Parrilla', 'Pinzas, espátulas y cepillos de limpieza'],
  ['Salón', 'Bandejas, charolas y servicio de mesa'],
  ['Barra', 'Medidores, cocteleras y utensilios de bar'],
  ['Caja / administración', 'Equipo de punto de venta y calculadora'],
];

module.exports = {
  id: 'acta_entrega_herramientas_equipos',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Acta_Entrega_Herramientas_y_Equipos',
  empresa: clienteBase.empresa,
  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const representante = c.representante || {};

    return [
      b.title('ACTA DE ENTREGA DE HERRAMIENTAS Y EQUIPOS'),
      b.subtitle(`${empresa} · Restaurante / parrilla`),

      b.p(
        'Se deja constancia de la entrega de las herramientas, los utensilios y los equipos ' +
          'necesarios para el desempeño del cargo, así como de las instrucciones sobre su ' +
          'uso adecuado, su cuidado y su devolución.',
      ),
      b.legalRef('lopcymat_53_4_epp'),

      b.chapter('1. Datos del trabajador'),
      b.field('Nombre y Apellido'),
      b.field('Cédula de Identidad'),
      b.field('Cargo'),
      b.field('Área / Puesto de trabajo'),
      b.field('Fecha de ingreso'),

      b.chapter('2. Herramientas y equipos entregados'),
      b.p(
        'Se relacionan las herramientas y los equipos entregados, con su estado y la firma de ' +
          'recibido. Las cantidades y los códigos se completan al momento de la entrega.',
      ),
      b.table(
        [
          'Área',
          'Herramienta / equipo',
          'Cantidad',
          'Estado de entrega',
          'Firma de recibido',
        ],
        EQUIPOS_POR_AREA.map(([area, equipo]) => [area, equipo, '', '', '']),
      ),
      b.field('Observaciones sobre el estado de entrega'),

      b.chapter('3. Compromisos del trabajador'),
      b.numbered('Usar las herramientas y los equipos únicamente para las actividades del puesto.'),
      b.numbered('Mantener las herramientas y los equipos en condiciones de higiene y seguridad.'),
      b.numbered('Reportar de inmediato el deterioro, la falla o la pérdida del equipo.'),
      b.numbered('No retirar del establecimiento las herramientas o los equipos sin autorización.'),
      b.numbered('Devolver las herramientas y los equipos al momento de la terminación de la relación laboral.'),

      b.chapter('4. Devolución'),
      b.p(
        'Al terminar la relación de trabajo, el trabajador(ra) devuelve las herramientas y los ' +
          'equipos recibidos en condiciones razonables de uso, salvo el desgaste normal por el ' +
          'trabajo. Se deja constancia del estado en que se devuelven.',
      ),
      b.table(
        ['Herramienta / equipo', 'Estado de devolución', 'Fecha', 'Firma de recibido'],
        [
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
        ],
      ),
      b.field('Responsable de recibir la devolución'),

      b.chapter('5. Constancia y firma'),
      b.p(
        'Declaro haber recibido las herramientas y los equipos indicados y haber sido ' +
          'instruido(a) sobre su uso, cuidado y devolución.',
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
        'Acta de entrega de herramientas y equipos. Requiere revisión por abogado laboralista ' +
          'antes de su uso formal. Se firma por duplicado.',
      ),
    ];
  },
};
