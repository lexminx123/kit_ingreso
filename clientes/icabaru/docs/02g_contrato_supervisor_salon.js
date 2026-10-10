'use strict';

// Contrato individual de trabajo — SUPERVISOR DE SALÓN (Ticket #4).

const { buildContrato } = require('../../../tools/contrato-base.js');

// `c` puede ser el cliente completo (tests) o un stub { slug } (auto-descubrimiento
// de tools/build.js). Si no trae cargos, se carga el cliente del repositorio.
function clienteDe(c) {
  return c && Array.isArray(c.cargos) ? c : require('../cliente.json');
}

module.exports = {
  id: 'contrato_supervisor_salon',
  dir: '02_CONTRATOS',
  filename: '02g_Contrato_Supervisor_de_Salon',
  blocks: (c) => {
    const cliente = clienteDe(c);
    return buildContrato(cliente, cliente.cargos.find((x) => x.id === 'supervisor_salon'));
  },
};
