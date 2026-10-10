'use strict';

// Descripción de funciones del cargo COCINERA (área: cocina).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

// Las funciones principales se toman de cliente.json (cargo.funciones); aquí
// solo se declara el contenido descriptivo propio del puesto.
const CONTENIDO = {
  proposito: "Preparar los alimentos y platos de la carta con calidad e higiene, cumpliendo los tiempos y las porciones establecidas.",
  responsabilidades: [
    "Responder por la preparación, el sabor y la presentación de los platos.",
    "Controlar las porciones y evitar el desperdicio de alimentos.",
    "Mantener la limpieza y el orden del área de cocina.",
    "Reportar al encargado los faltantes y las fallas de los equipos.",
  ],
  requisitos: [
    "Educación básica concluida; deseable curso de manipulación de alimentos.",
    "Experiencia previa en cocina (deseable).",
    "Conocimientos de higiene, cortes y técnicas de cocción.",
    "Disponibilidad para trabajar por turnos y fines de semana.",
  ],
  condiciones: [
    "Permanencia prolongada de pie y ambiente caluroso.",
    "Exposición a cortes, quemaduras, gas y equipos calientes.",
    "Uso obligatorio de uniforme, gorra o red y guantes según la tarea.",
  ],
};

module.exports = {
  id: 'funciones_cocinera',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03h_Descripcion_Funciones_Cocinera',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'cocinera');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
