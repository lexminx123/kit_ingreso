'use strict';

// Descripción de funciones del cargo HORNERO (área: horno).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

// Las funciones principales se toman de cliente.json (cargo.funciones); aquí
// solo se declara el contenido descriptivo propio del puesto.
const CONTENIDO = {
  proposito: "Operar los hornos y garantizar el horneado uniforme y de calidad de los productos, en condiciones seguras.",
  responsabilidades: [
    "Responder por el punto, el color y la calidad del producto horneado.",
    "Vigilar que los hornos operen a la temperatura y el tiempo correctos.",
    "Reportar de inmediato fugas de gas o fallas de los equipos.",
    "Mantener limpio, ventilado y despejado el área del horno.",
  ],
  requisitos: [
    "Educación básica concluida.",
    "Experiencia en manejo de hornos de panadería (deseable).",
    "Conocimientos básicos de seguridad y manejo de gas.",
    "Disponibilidad para trabajar de madrugada y por turnos.",
  ],
  condiciones: [
    "Exposición permanente a calor radiante y superficies calientes.",
    "Riesgo de quemaduras y de fugas de gas.",
    "Uso obligatorio de guantes térmicos, delantal y calzado antideslizante.",
  ],
};

module.exports = {
  id: 'funciones_hornero',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03e_Descripcion_Funciones_Hornero',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'hornero');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
