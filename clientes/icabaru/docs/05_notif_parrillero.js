'use strict';

// Notificación de riesgos laborales del área de parrilla (LOPCYMAT).

const { buildNotificacion } = require('../../../tools/riesgos-base.js');
const cliente = require('../cliente.json');

module.exports = {
  id: '05_notif_parrillero',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Notificacion_Riesgos_Parrillero',
  empresa: cliente.empresa,
  blocks: () => buildNotificacion(cliente, 'parrillero'),
};
