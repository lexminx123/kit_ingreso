'use strict';

// Notificación de riesgos laborales del área de barra (LOPCYMAT).

const { buildNotificacion } = require('../../../tools/riesgos-base.js');
const cliente = require('../cliente.json');

module.exports = {
  id: '05_notif_bartender',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Notificacion_Riesgos_Bartender',
  empresa: cliente.empresa,
  blocks: () => buildNotificacion(cliente, 'bartender'),
};
