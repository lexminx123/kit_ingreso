'use strict';

// Notificación de riesgos laborales del área de cocina (LOPCYMAT).

const { buildNotificacion } = require('../../../tools/riesgos-base.js');
const cliente = require('../cliente.json');

module.exports = {
  id: '05_notif_cocina',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Notificacion_Riesgos_Cocina',
  empresa: cliente.empresa,
  blocks: () => buildNotificacion(cliente, 'cocina'),
};
