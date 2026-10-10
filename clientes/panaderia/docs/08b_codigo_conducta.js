'use strict';

// Ticket #7 — Código de Conducta.

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
  id: 'codigo_conducta',
  dir: '08_POLITICAS_INTERNAS',
  filename: 'Codigo_Conducta',

  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const rif = c.rif || '[COMPLETAR: RIF]';

    return [
      b.title('CÓDIGO DE CONDUCTA'),
      b.subtitle(`${empresa} — RIF ${rif}`),

      b.p(
        'El presente Código de Conducta establece los principios y las pautas de comportamiento ' +
          'esperados del personal de ' +
          empresa +
          ', con el fin de asegurar un ambiente de trabajo respetuoso, íntegro y seguro en el ' +
          'servicio de panadería y pastelería.',
      ),

      b.chapter('1. Principios generales'),
      b.bullet('Actuar con honestidad, integridad y responsabilidad.'),
      b.bullet('Tratar con respeto y equidad a clientes, compañeros y supervisores.'),
      b.bullet('Cumplir la ley, este código y las políticas internas de la empresa.'),
      b.bullet('Preservar la reputación y los bienes de la empresa.'),

      b.chapter('2. Conductas esperadas'),
      b.numbered('Brindar un servicio cordial, diligente y de calidad.'),
      b.numbered('Cumplir el horario y las tareas encomendadas con diligencia.'),
      b.numbered('Mantener la higiene y aplicar las normas de inocuidad alimentaria.'),
      b.numbered('Informar oportunamente cualquier incidente o irregularidad.'),

      b.chapter('3. Conflicto de intereses'),
      b.p(
        'Se debe evitar toda situación en la que un interés personal pueda influir indebida' +
          'mente en las decisiones laborales. Los posibles conflictos se informan a la ' +
          'administración.',
      ),

      b.chapter('4. Regalos y atenciones'),
      b.numbered(
        'No se aceptan regalos o pagos que pretendan obtener un trato favorable indebido.',
      ),
      b.numbered(
        'Las propinas se ajustan a la política de la empresa y no generan compromisos ' +
          'indebidos.',
      ),

      b.chapter('5. Acoso y discriminación'),
      b.p(
        'La empresa mantiene una política de tolerancia cero frente al acoso laboral, sexual y ' +
          'toda forma de discriminación. Estas conductas se reportan de inmediato y se tratan ' +
          'con reserva.',
      ),

      b.chapter('6. Uso de bienes y equipos'),
      b.numbered('Los bienes, insumos y equipos se usan exclusivamente para fines laborales.'),
      b.numbered('Se reporta de inmediato la pérdida, daño o mal funcionamiento de equipos.'),

      b.chapter('7. Consecuencias'),
      b.p(
        'El incumplimiento de este código puede generar las sanciones previstas en las ' +
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
