'use strict';

// Descripción de funciones del cargo CAJERO (área: caja).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

const CONTENIDO = {
  proposito:
    'Gestionar el cobro de los consumos, la facturación y el arqueo de caja, ' +
    'garantizando la exactitud de los montos, la seguridad del efectivo y un cierre ' +
    'de caja ordenado y conciliado.',
  funciones: [
    'Registrar y cobrar los consumos en el sistema de punto de venta.',
    'Emitir facturas y comprobantes conforme a la normativa fiscal vigente.',
    'Recibir pagos en efectivo, tarjeta de débito/crédito y otros medios autorizados.',
    'Entregar el vuelto correcto y manejar el fondo fijo de caja.',
    'Realizar el arqueo y el cierre de caja al final de cada turno.',
    'Reportar al administrador las diferencias, incidencias y reversos del día.',
  ],
  responsabilidades: [
    'Custodiar el efectivo, los comprobantes y los equipos asignados a la caja.',
    'Mantener organizada y actualizada la documentación del turno.',
    'Cumplir los procedimientos de apertura y cierre de caja.',
    'Guardar confidencialidad sobre montos, clientes y operaciones.',
  ],
  requisitos: [
    'Educación media concluida; deseable formación en administración o contabilidad.',
    'Experiencia en manejo de caja o punto de venta (deseable).',
    'Manejo básico de equipos de punto de venta y herramientas ofimáticas.',
    'Conducta íntegra, responsabilidad y atención al detalle.',
  ],
  condiciones: [
    'Permanencia prolongada de pie o sentado frente al punto de venta.',
    'Responsabilidad directa sobre valores en efectivo.',
    'Jornada con turnos rotativos, fines de semana y feriados.',
  ],
};

module.exports = {
  id: 'funciones_cajero',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03d_Descripcion_Funciones_Cajero',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'cajero');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
