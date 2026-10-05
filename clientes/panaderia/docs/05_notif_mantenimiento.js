'use strict';

// Notificación de riesgos laborales — mantenimiento (LOPCYMAT).

const { buildNotificacion } = require('../../../tools/riesgos-base.js');
const cliente = require('../cliente.json');

module.exports = {
  id: '05_notif_mantenimiento',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Notificacion_Riesgos_Mantenimiento',
  empresa: cliente.empresa,
  blocks: () => buildNotificacion(cliente, 'mantenimiento'),
};
