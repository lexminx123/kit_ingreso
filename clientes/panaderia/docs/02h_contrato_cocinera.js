'use strict';

// Contrato individual de trabajo — COCINERA (área: cocina).

const { buildContrato } = require('../../../tools/contrato-base.js');

// `c` puede ser el cliente completo (tests) o un stub { slug } (auto-descubrimiento
// de tools/build.js). Si no trae cargos, se carga el cliente del repositorio.
function clienteDe(c) {
  return c && Array.isArray(c.cargos) ? c : require('../cliente.json');
}

module.exports = {
  id: 'contrato_cocinera',
  dir: '02_CONTRATOS',
  filename: '02h_Contrato_Cocinera',
  blocks: (c) => {
    const cliente = clienteDe(c);
    return buildContrato(cliente, cliente.cargos.find((x) => x.id === 'cocinera'));
  },
};
