'use strict';

// Acta de entrega de Equipos de Protección Personal (EPP) — área gastronómica.

const b = require('../../../tools/blocks.js');
const cliente = require('../cliente.json');

// Ítems de EPP habituales en el rubro; tallas y cantidades se completan a mano.
const ITEMS = [
  'Guantes de manipulación de alimentos',
  'Guantes anticorte',
  'Guantes térmicos',
  'Guantes de caucho',
  'Delantal',
  'Delantal impermeable',
  'Gorra o red para el cabello',
  'Calzado antideslizante',
  'Mascarilla',
  'Protector de ojos',
  'Gel antibacterial',
];

module.exports = {
  id: '05_epp',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Acta_Entrega_EPP',
  empresa: cliente.empresa,
  blocks: () => [
    b.title('ACTA DE ENTREGA DE EQUIPOS DE PROTECCIÓN PERSONAL (EPP)'),
    b.subtitle(`${cliente.empresa} · Actividad gastronómica`),

    b.p(
      'Se deja constancia de la entrega de los equipos de protección personal (EPP) ' +
        'requeridos para el desempeño seguro del puesto de trabajo, así como de la ' +
        'instrucción sobre su uso, cuidado y conservación.',
    ),
    b.legalRef('lopcymat_53_4_epp'),

    b.chapter('1. Datos del trabajador'),
    b.field('Nombre y Apellido'),
    b.field('Cédula de Identidad'),
    b.field('Cargo'),
    b.field('Área / Puesto de trabajo'),
    b.field('Fecha de ingreso'),

    b.chapter('2. Ítems entregados'),
    b.table(
      ['Ítem / EPP', 'Talla', 'Cantidad', 'Fecha de entrega', 'Firma de recibido'],
      ITEMS.map((item) => [item, '', '', '', '']),
    ),

    b.note(
      'El trabajador(ra) se compromete a usar y conservar el EPP, a reportar su ' +
        'deterioro o pérdida y a solicitar su reposición.',
    ),

    b.chapter('3. Constancia y firma'),
    b.p(
      'Declaro haber recibido el EPP indicado y haber sido instruido(a) sobre su uso ' +
        'correcto y obligatorio durante la jornada de trabajo.',
    ),
    b.signatureBlock([
      { rol: 'EL/LA TRABAJADOR(A)', nombre: '', cargo: '', ci: '', fecha: '' },
      {
        rol: 'LA EMPRESA',
        nombre: cliente.representante.nombre || '',
        cargo: cliente.representante.cargo || '',
        ci: cliente.representante.ci || '',
        fecha: '',
      },
    ]),
  ],
};
