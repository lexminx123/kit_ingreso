'use strict';

// Acta de Entrega de Uniforme y Dotación.
//
// Deja constancia de la dotación de ropa y calzado entregada al trabajador(ra),
// con tallas, cantidades, fechas de entrega y de reposición. Cuando el puesto lo
// requiera, incluye además la relación de equipos de protección personal (EPP).
// Cita la LOPCYMAT art. 53 num. 4 por clave: derecho a ser provisto de los
// implementos y equipos de protección personal adecuados.

const b = require('../../../tools/blocks.js');
const clienteBase = require('../cliente.json');

/** Combina el cliente recibido con el cliente.json del kit (por si llega vacío). */
function contexto(cliente) {
  if (cliente && cliente.empresa) return cliente;
  return clienteBase;
}

// Dotación de ropa y calzado habitual en el rubro; tallas y cantidades a mano.
const DOTACION = [
  'Franela o chemise de trabajo',
  'Pantalió de trabajo',
  'Delantal',
  'Gorra o red para el cabello',
  'Calzado antideslizante',
  'Medias de trabajo',
];

// EPP que acompaña a la dotación cuando el puesto lo requiere; se completa a mano.
const EPP = [
  'Guantes de manipulación de alimentos',
  'Guantes anticorte',
  'Guantes térmicos',
  'Mascarilla',
  'Protector de ojos',
  'Gel antibacterial',
];

module.exports = {
  id: '05_uniforme',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Acta_Entrega_Uniforme_y_Dotacion',
  empresa: clienteBase.empresa,
  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const representante = c.representante || {};

    return [
      b.title('ACTA DE ENTREGA DE UNIFORME Y DOTACIÓN'),
      b.subtitle(`${empresa} · Panadería y pastelería`),

      b.p(
        'Se deja constancia de la entrega del uniforme y la dotación de ropa y calzado de ' +
          'trabajo, así como de los equipos de protección personal (EPP) requeridos para el ' +
          'desempeño seguro del puesto, con la instrucción sobre su uso, cuidado y reposición.',
      ),
      b.legalRef('lopcymat_53_4_epp'),

      b.chapter('1. Datos del trabajador'),
      b.field('Nombre y Apellido'),
      b.field('Cédula de Identidad'),
      b.field('Cargo'),
      b.field('Área / Puesto de trabajo'),
      b.field('Fecha de ingreso'),

      b.chapter('2. Dotación entregada'),
      b.h3('2.1 Uniforme, ropa y calzado'),
      b.table(
        [
          'Prenda / artículo',
          'Talla',
          'Cantidad',
          'Fecha de entrega',
          'Fecha de reposición',
          'Firma de recibido',
        ],
        DOTACION.map((item) => [item, '', '', '', '', '']),
      ),

      b.h3('2.2 Equipos de protección personal (EPP)'),
      b.table(
        ['EPP', 'Talla', 'Cantidad', 'Fecha de entrega', 'Firma de recibido'],
        EPP.map((item) => [item, '', '', '', '']),
      ),

      b.chapter('3. Compromisos del trabajador'),
      b.numbered('Usar el uniforme y la dotación durante la jornada de trabajo.'),
      b.numbered('Mantener el uniforme y el calzado en condiciones de higiene y presentación.'),
      b.numbered('Usar y conservar el EPP entregado según la instrucción recibida.'),
      b.numbered('Reportar el deterioro o la pérdida del uniforme, la dotación o el EPP.'),
      b.numbered('Solicitar la reposición cuando corresponda, según la fecha indicada.'),

      b.chapter('4. Constancia y firma'),
      b.p(
        'Declaro haber recibido el uniforme, la dotación y el EPP indicados, y haber sido ' +
          'instruido(a) sobre su uso, cuidado, conservación y reposición.',
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
        'Acta de entrega de uniforme y dotación. Requiere revisión por abogado laboralista ' +
          'antes de su uso formal. Se firma por duplicado.',
      ),
    ];
  },
};
