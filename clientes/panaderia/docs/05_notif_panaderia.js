'use strict';

// Notificación de riesgos laborales — amasado y panadería (LOPCYMAT).

const { buildNotificacion } = require('../../../tools/riesgos-base.js');
const cliente = require('../cliente.json');

module.exports = {
  id: '05_notif_panaderia',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Notificacion_Riesgos_Panaderia_y_Amasado',
  empresa: cliente.empresa,
  blocks: () => buildNotificacion(cliente, 'panaderia'),
};
