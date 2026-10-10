'use strict';

// Notificación de riesgos laborales del área de lavaplatos (LOPCYMAT).

const { buildNotificacion } = require('../../../tools/riesgos-base.js');
const cliente = require('../cliente.json');

module.exports = {
  id: '05_notif_lavaplatos',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Notificacion_Riesgos_Lavaplatos',
  empresa: cliente.empresa,
  blocks: () => buildNotificacion(cliente, 'lavaplatos'),
};
