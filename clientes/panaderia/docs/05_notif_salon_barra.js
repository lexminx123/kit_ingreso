'use strict';

// Notificación de riesgos laborales — salón y barra (LOPCYMAT).

const { buildNotificacion } = require('../../../tools/riesgos-base.js');
const cliente = require('../cliente.json');

module.exports = {
  id: '05_notif_salon_barra',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Notificacion_Riesgos_Salon_y_Barra',
  empresa: cliente.empresa,
  blocks: () => buildNotificacion(cliente, 'salon_barra'),
};
