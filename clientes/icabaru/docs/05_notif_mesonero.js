'use strict';

// Notificación de riesgos laborales del área de mesonero (LOPCYMAT).

const { buildNotificacion } = require('../../../tools/riesgos-base.js');
const cliente = require('../cliente.json');

module.exports = {
  id: '05_notif_mesonero',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Notificacion_Riesgos_Mesonero',
  empresa: cliente.empresa,
  blocks: () => buildNotificacion(cliente, 'mesonero'),
};
