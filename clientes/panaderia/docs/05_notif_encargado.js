'use strict';

// Notificación de riesgos laborales — encargado y administración (LOPCYMAT).

const { buildNotificacion } = require('../../../tools/riesgos-base.js');
const cliente = require('../cliente.json');

module.exports = {
  id: '05_notif_encargado',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Notificacion_Riesgos_Encargado_Administracion',
  empresa: cliente.empresa,
  blocks: () => buildNotificacion(cliente, 'encargado'),
};
