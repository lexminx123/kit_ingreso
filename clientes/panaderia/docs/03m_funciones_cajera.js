'use strict';

// Descripción de funciones del cargo CAJERA (área: caja).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

// Las funciones principales se toman de cliente.json (cargo.funciones); aquí
// solo se declara el contenido descriptivo propio del puesto.
const CONTENIDO = {
  proposito: "Cobrar y facturar los productos, custodiar el fondo de caja y cuadrar el turno con exactitud y cortesía.",
  responsabilidades: [
    "Responder por el manejo del efectivo, el fondo fijo y los documentos de cobro.",
    "Efectuar el arqueo y el cuadre de caja al cierre del turno.",
    "Reportar de inmediato diferencias, irregularidades o intentos de fraude.",
    "Cuidar el equipo de caja y mantener su puesto ordenado.",
  ],
  requisitos: [
    "Educación media concluida (deseable).",
    "Experiencia en caja, cobros o atención al público (deseable).",
    "Manejo básico de caja registradora y medios de pago.",
    "Disponibilidad para trabajar por turnos, fines de semana y feriados.",
  ],
  condiciones: [
    "Postura sedente o de pie prolongada y uso continuo de pantallas.",
    "Exposición al trato directo con el público y riesgo de robo o violencia.",
    "Uso obligatorio de uniforme y presentación impecable.",
  ],
};

module.exports = {
  id: 'funciones_cajera',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03m_Descripcion_Funciones_Cajera',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'cajera');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
