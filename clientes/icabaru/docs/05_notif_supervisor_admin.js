'use strict';

// Notificación de riesgos laborales de supervisión / administración (LOPCYMAT).

const { buildNotificacion } = require('../../../tools/riesgos-base.js');
const cliente = require('../cliente.json');

module.exports = {
  id: '05_notif_supervisor_admin',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Notificacion_Riesgos_Supervisor_Admin',
  empresa: cliente.empresa,
  blocks: () => buildNotificacion(cliente, 'supervisor_admin'),
};
