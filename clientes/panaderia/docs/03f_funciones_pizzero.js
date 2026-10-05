'use strict';

// Descripción de funciones del cargo PIZZERO (área: horno).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

// Las funciones principales se toman de cliente.json (cargo.funciones); aquí
// solo se declara el contenido descriptivo propio del puesto.
const CONTENIDO = {
  proposito: "Elaborar pizzas y productos afines con calidad, rapidez y buena presentación, cumpliendo la receta y las normas sanitarias.",
  responsabilidades: [
    "Responder por la preparación y el horneado de las pizzas.",
    "Controlar el inventario y el uso racional de los insumos de la línea.",
    "Mantener limpios el área, los utensilios y el horno de pizzas.",
    "Informar al encargado sobre faltantes o productos en mal estado.",
  ],
  requisitos: [
    "Educación básica concluida.",
    "Experiencia en pizzas o cocina (deseable).",
    "Conocimientos de higiene y manejo de alimentos.",
    "Disponibilidad para trabajar por turnos y fines de semana.",
  ],
  condiciones: [
    "Trabajo de pie y ambiente caluroso cercano al horno.",
    "Exposición a calor, harina y superficies calientes.",
    "Uso obligatorio de uniforme, gorra o red y calzado antideslizante.",
  ],
};

module.exports = {
  id: 'funciones_pizzero',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03f_Descripcion_Funciones_Pizzero',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'pizzero');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
