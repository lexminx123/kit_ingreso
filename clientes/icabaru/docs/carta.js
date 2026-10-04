'use strict';

// Definición declarativa de la Carta de Aceptación General.
// Solo describe bloques: el render DOCX/PDF vive en tools/.
//
// No se incluyen citas legales: las referencias verificadas llegarán en el
// Ticket #3 a través de legalRef() contra legal/ve.js.

const b = require('../../../tools/blocks.js');

module.exports = {
  nombre: 'Carta_Aceptacion_General',
  empresa: 'GRUPO CAVAL 1003, C.A. — ALIKA PETS',
  blocks: [
    b.title('CARTA DE ACEPTACIÓN GENERAL'),
    b.subtitle('Kit de Ingreso del Trabajador — ALIKA PETS'),

    b.p(
      'Por medio de la presente dejo constancia de que he recibido, leído y comprendido ' +
        'la totalidad de los documentos que integran el Kit de Ingreso del Trabajador de ' +
        'GRUPO CAVAL 1003, C.A. (marca comercial ALIKA PETS), y que acepto las condiciones ' +
        'en ellos establecidas.',
    ),

    b.field('Nombre y Apellido'),
    b.field('Cédula de Identidad'),
    b.field('Cargo a desempeñar'),
    b.field('Fecha de ingreso'),

    b.chapter('Cláusulas de aceptación'),

    b.numbered(
      'Acepto el cargo, las funciones y la remuneración descritos en la documentación entregada.',
    ),
    b.numbered(
      'Acepto las normas de seguridad y salud laboral, así como las notificaciones de riesgos ' +
        'correspondientes a mi puesto de trabajo.',
    ),
    b.numbered(
      'Acepto las políticas internas de la empresa, el código de conducta, la política de ' +
        'confidencialidad y el reglamento interno del trabajador.',
    ),
    b.numbered(
      'Autorizo el tratamiento de mis datos personales conforme a las autorizaciones que he ' +
        'suscrito de manera libre, expresa e informada.',
    ),

    b.note(
      'Declaro que la presente carta se firma por duplicado, quedando un ejemplar en poder de ' +
        'la empresa y otro en mi poder.',
    ),

    b.signatureBlock([
      {
        rol: 'EL/LA TRABAJADOR(A)',
        nombre: '',
        cargo: '',
        ci: '',
        fecha: '',
      },
      {
        rol: 'LA EMPRESA',
        nombre: 'ESNATLIM ELENA SIMOZA',
        cargo: 'Directora Gerente',
        ci: 'V-17.976.287',
        fecha: '',
      },
    ]),
  ],
};
