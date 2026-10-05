'use strict';

// Ticket #7 — Política de Confidencialidad.

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
  id: 'confidencialidad',
  dir: '08_POLITICAS_INTERNAS',
  filename: 'Politica_Confidencialidad',

  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const rif = c.rif || '[COMPLETAR: RIF]';

    return [
      b.title('POLÍTICA DE CONFIDENCIALIDAD'),
      b.subtitle(`${empresa} — RIF ${rif}`),

      b.p(
        'La presente política establece las obligaciones de reserva que asume el personal de ' +
          empresa +
          ' respecto de la información a la que acceda con motivo de su relación laboral.',
      ),

      b.chapter('1. Información confidencial'),
      b.p('Se considera información confidencial, entre otra:'),
      b.bullet('Recetas, procesos de elaboración y fichas técnicas de productos.'),
      b.bullet('Listas de proveedores, precios de compra y condiciones comerciales.'),
      b.bullet('Información de clientes, datos personales y de facturación.'),
      b.bullet('Datos financieros, de nómina, márgenes y estrategia del negocio.'),
      b.bullet('Contraseñas, accesos a sistemas y procedimientos internos.'),

      b.chapter('2. Obligaciones del personal'),
      b.numbered('Usar la información solo para el desempeño de las funciones asignadas.'),
      b.numbered('No divulgar la información a terceros ni a compañeros sin necesidad laboral.'),
      b.numbered('Resguardar documentos, dispositivos y accesos bajo su responsabilidad.'),
      b.numbered('Reportar de inmediato cualquier pérdida o divulgación no autorizada.'),

      b.chapter('3. Excepciones'),
      b.p(
        'No se considera incumplimiento la entrega de información cuando exista una orden ' +
          'de autoridad competente o una obligación legal que así lo exija.',
      ),

      b.chapter('4. Vigencia'),
      b.p(
        'La obligación de confidencialidad se mantiene durante la relación laboral y continúa ' +
          'después de su terminación, mientras la información conserve tal carácter.',
      ),

      b.chapter('5. Incumplimiento'),
      b.p(
        'El incumplimiento de esta política puede generar las sanciones previstas en las ' +
          'políticas internas y en el reglamento interno de trabajo, conforme a la ley.',
      ),

      b.chapter('Aceptación'),
      b.field('Nombre y Apellido'),
      b.field('Cédula de Identidad'),
      b.field('Cargo'),
      b.field('Fecha'),

      b.signatureBlock([
        { rol: 'EL/LA TRABAJADOR(A)', nombre: '', cargo: '', ci: '', fecha: '' },
        { rol: 'LA EMPRESA', nombre: '', cargo: '', ci: '', fecha: '' },
      ]),
    ];
  },
};
