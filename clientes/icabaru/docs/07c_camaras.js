'use strict';

// Ticket #7 — Autorización y notificación de videovigilancia.

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
  id: 'autorizacion_videovigilancia',
  dir: '07_AUTORIZACIONES',
  filename: 'Autorizacion_Videovigilancia',

  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const rif = c.rif || '[COMPLETAR: RIF]';

    return [
      b.title('AUTORIZACIÓN Y NOTIFICACIÓN DE VIDEOVIGILANCIA'),
      b.subtitle(`${empresa} — RIF ${rif}`),

      b.p(
        'Declaro que he sido informado(a) de que ' +
          empresa +
          ' mantiene un sistema de videovigilancia en sus instalaciones. Conozco las áreas ' +
          'monitoreadas, la finalidad del sistema y las condiciones de su uso, y otorgo mi ' +
          'consentimiento para la captación y el tratamiento de las imágenes.',
      ),

      b.chapter('Datos del titular'),
      b.field('Nombre y Apellido'),
      b.field('Cédula de Identidad'),
      b.field('Cargo a desempeñar'),
      b.field('Fecha'),

      b.chapter('1. Áreas monitoreadas'),
      b.p(
        'El sistema de videovigilancia cubre las zonas comunes y de trabajo, entre ellas:',
      ),
      b.bullet('Entrada principal y accesos al establecimiento.'),
      b.bullet('Salón de comensales y área de caja.'),
      b.bullet('Cocina, parrilla, barra y depósito.'),
      b.bullet('Pasillos, almacén y estacionamiento.'),
      b.note(
        'No se instalan cámaras en baños, vestidores ni en zonas que afecten la intimidad de ' +
          'las personas.',
      ),

      b.chapter('2. Finalidad'),
      b.bullet('Proteger la seguridad de trabajadores, clientes, visitantes y bienes.'),
      b.bullet('Prevenir y detectar hechos ilícitos o situaciones de riesgo.'),
      b.bullet('Aportar elementos de prueba ante incidentes o reclamaciones.'),

      b.chapter('3. Condiciones de uso'),
      b.numbered('Las imágenes se tratarán de forma confidencial y con acceso restringido.'),
      b.numbered(
        'Se conservarán por el tiempo necesario para las finalidades indicadas y luego serán ' +
          'eliminadas.',
      ),
      b.numbered(
        'No se usarán para fines distintos de los señalados ni se difundirán a terceros no ' +
          'autorizados.',
      ),

      b.chapter('4. Aceptación'),
      b.p(
        'Autorizo el tratamiento de mis imágenes en los términos descritos. La información ' +
          'recibida me permite comprender el alcance y las condiciones de la videovigilancia.',
      ),

      b.signatureBlock([
        { rol: 'EL/LA TRABAJADOR(A)', nombre: '', cargo: '', ci: '', fecha: '' },
        { rol: 'LA EMPRESA', nombre: '', cargo: '', ci: '', fecha: '' },
      ]),
    ];
  },
};
