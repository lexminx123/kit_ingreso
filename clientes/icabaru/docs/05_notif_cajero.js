'use strict';

// Notificación de riesgos laborales del área de caja (LOPCYMAT).

const { buildNotificacion } = require('../../../tools/riesgos-base.js');
const cliente = require('../cliente.json');

module.exports = {
  id: '05_notif_cajero',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Notificacion_Riesgos_Cajero',
  empresa: cliente.empresa,
  blocks: () => buildNotificacion(cliente, 'cajero'),
};
