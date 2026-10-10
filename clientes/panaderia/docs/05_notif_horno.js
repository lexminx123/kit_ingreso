'use strict';

// Notificación de riesgos laborales — área del horno (LOPCYMAT).

const { buildNotificacion } = require('../../../tools/riesgos-base.js');
const cliente = require('../cliente.json');

module.exports = {
  id: '05_notif_horno',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Notificacion_Riesgos_Horno',
  empresa: cliente.empresa,
  blocks: () => buildNotificacion(cliente, 'horno'),
};
