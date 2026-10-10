'use strict';

// Carta de Aceptación General del Kit de Ingreso — panadería.
// Solo describe bloques: el render DOCX/PDF vive en tools/.

const b = require('../../../tools/blocks.js');
const cliente = require('../cliente.json');

module.exports = {
  id: 'carta_aceptacion_general',
  dir: '09_CIERRE',
  filename: 'Carta_Aceptacion_General',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.empresa ? entrada : cliente;
    const representante = c.representante || {};
    return [
      b.title('CARTA DE ACEPTACIÓN GENERAL'),
      b.subtitle(`Kit de Ingreso del Trabajador — ${c.empresa}`),

      b.p(
        `Por medio de la presente dejo constancia de que he recibido, leído y comprendido ` +
          `la totalidad de los documentos que integran el Kit de Ingreso del Trabajador de ` +
          `${c.empresa}, y que acepto las condiciones en ellos establecidas.`,
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
          nombre: representante.nombre || '',
          cargo: representante.cargo || '',
          ci: representante.ci || '',
          fecha: '',
        },
      ]),
    ];
  },
};
