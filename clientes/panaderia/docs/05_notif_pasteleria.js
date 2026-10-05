'use strict';

// Notificación de riesgos laborales — pastelería (LOPCYMAT).

const { buildNotificacion } = require('../../../tools/riesgos-base.js');
const cliente = require('../cliente.json');

module.exports = {
  id: '05_notif_pasteleria',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Notificacion_Riesgos_Pasteleria',
  empresa: cliente.empresa,
  blocks: () => buildNotificacion(cliente, 'pasteleria'),
};
