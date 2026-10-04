'use strict';

// Ticket #7 — Autorización para el uso de imagen y redes sociales.

const path = require('path');
const fs = require('fs');
const b = require('../../../tools/blocks.js');

function contexto(cliente = {}) {
  let datos = {};
  if (!cliente || !cliente.empresa) {
    try {
      datos = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'cliente.json'), 'utf8'));
    } catch (_) {
      datos = {};
    }
  }
  return { ...datos, ...cliente };
}

module.exports = {
  id: 'autorizacion_imagen',
  dir: '07_AUTORIZACIONES',
  filename: 'Autorizacion_Imagen_Redes_Sociales',

  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const rif = c.rif || '[COMPLETAR: RIF]';

    return [
      b.title('AUTORIZACIÓN PARA EL USO DE IMAGEN Y REDES SOCIALES'),
      b.subtitle(`${empresa} — RIF ${rif}`),

      b.p(
        'Autorizo de forma libre, expresa e informada a ' +
          empresa +
          ' para que use, reproduzca y publique mi imagen, voz y nombre en fotografías y ' +
          'videos captados en el desarrollo de mis actividades laborales, conforme al alcance ' +
          'y a los límites establecidos en esta autorización.',
      ),

      b.chapter('Datos del titular'),
      b.field('Nombre y Apellido'),
      b.field('Cédula de Identidad'),
      b.field('Cargo a desempeñar'),
      b.field('Fecha'),

      b.chapter('1. Alcance de la autorización'),
      b.numbered(
        'Fotografías, videos y grabaciones de audio obtenidos en las instalaciones o durante ' +
          'actividades organizadas por la empresa.',
      ),
      b.numbered(
        'Publicación en redes sociales, sitio web, material promocional e informativo de la ' +
          'empresa.',
      ),
      b.numbered(
        'Reproducción total o parcial, sin que ello implique remuneración adicional distinta ' +
          'de mi salario.',
      ),

      b.chapter('2. Finalidad'),
      b.bullet('Promover los productos y servicios de la empresa.'),
      b.bullet('Documentar actividades internas, eventos y reconocimientos.'),
      b.bullet('Elaborar material de capacitación y comunicación institucional.'),

      b.chapter('3. Límites y garantías'),
      b.numbered(
        'La empresa no utilizará mi imagen en contextos que afecten mi dignidad, honor o ' +
          'reputación.',
      ),
      b.numbered(
        'No se publicarán datos sensibles ni contenido íntimo sin mi consentimiento específico.',
      ),
      b.numbered(
        'No se cederá el uso de mi imagen a terceros ajenos a la empresa sin mi autorización.',
      ),

      b.chapter('4. Vigencia y revocatoria'),
      b.p(
        'Esta autorización tiene vigencia indefinida, salvo que la revoque por escrito. La ' +
          'revocatoria no afectará los usos y publicaciones realizados con anterioridad de ' +
          'buena fe por la empresa.',
      ),
      b.note(
        'La revocatoria se presentará por escrito ante la administración y surtirá efectos a ' +
          'partir de su recepción.',
      ),

      b.signatureBlock([
        { rol: 'EL/LA TRABAJADOR(A)', nombre: '', cargo: '', ci: '', fecha: '' },
        { rol: 'LA EMPRESA', nombre: '', cargo: '', ci: '', fecha: '' },
      ]),
    ];
  },
};
