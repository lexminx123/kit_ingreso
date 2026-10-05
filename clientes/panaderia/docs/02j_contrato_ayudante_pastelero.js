'use strict';

// Contrato individual de trabajo — AYUDANTE PASTELERO (área: pasteleria).

const { buildContrato } = require('../../../tools/contrato-base.js');

// `c` puede ser el cliente completo (tests) o un stub { slug } (auto-descubrimiento
// de tools/build.js). Si no trae cargos, se carga el cliente del repositorio.
function clienteDe(c) {
  return c && Array.isArray(c.cargos) ? c : require('../cliente.json');
}

module.exports = {
  id: 'contrato_ayudante_pastelero',
  dir: '02_CONTRATOS',
  filename: '02j_Contrato_Ayudante_Pastelero',
  blocks: (c) => {
    const cliente = clienteDe(c);
    return buildContrato(cliente, cliente.cargos.find((x) => x.id === 'ayudante_pastelero'));
  },
};
