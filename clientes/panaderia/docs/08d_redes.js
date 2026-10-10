'use strict';

// Ticket #7 — Política de Uso de Redes Sociales.

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
  id: 'uso_redes_sociales',
  dir: '08_POLITICAS_INTERNAS',
  filename: 'Politica_Uso_Redes_Sociales',

  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const rif = c.rif || '[COMPLETAR: RIF]';

    return [
      b.title('POLÍTICA DE USO DE REDES SOCIALES'),
      b.subtitle(`${empresa} — RIF ${rif}`),

      b.p(
        'La presente política orienta el uso de las redes sociales por parte del personal de ' +
          empresa +
          ', tanto en el ámbito laboral como en el personal, para proteger la imagen de la ' +
          'empresa y los datos de clientes y compañeros.',
      ),

      b.chapter('1. Uso personal'),
      b.numbered(
        'El uso de redes sociales con fines personales se realiza fuera de la jornada y fuera ' +
          'de las áreas de atención al público.',
      ),
      b.numbered(
        'No se permite el uso del teléfono personal durante el servicio, salvo emergencias.',
      ),

      b.chapter('2. Publicaciones sobre la empresa'),
      b.numbered(
        'No se publica información interna, confidencial o no autorizada de la empresa.',
      ),
      b.numbered(
        'No se realizan publicaciones que afecten la reputación o la imagen de la empresa.',
      ),
      b.numbered(
        'La comunicación oficial corresponde únicamente a las personas designadas por la ' +
          'administración.',
      ),

      b.chapter('3. Imagen de terceros'),
      b.numbered(
        'No se difunden fotografías o videos de clientes o compañeros sin su consentimiento.',
      ),
      b.numbered(
        'Se respeta la dignidad y la privacidad de todas las personas.',
      ),

      b.chapter('4. Uso de cuentas corporativas'),
      b.numbered(
        'Las cuentas oficiales de la empresa se usan solo por las personas autorizadas y con ' +
          'las credenciales asignadas.',
      ),
      b.numbered(
        'Las credenciales son personales e intransferibles y se resguardan conforme a la ' +
          'política de confidencialidad.',
      ),

      b.chapter('5. Consecuencias'),
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
