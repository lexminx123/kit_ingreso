'use strict';

// Descripción de funciones del cargo BARRA (área: barra).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

// Las funciones principales se toman de cliente.json (cargo.funciones); aquí
// solo se declara el contenido descriptivo propio del puesto.
const CONTENIDO = {
  proposito: "Preparar y servir las bebidas y productos de la barra con calidad y rapidez, manteniendo el área limpia y abastecida.",
  responsabilidades: [
    "Responder por la preparación y la presentación de los productos de barra.",
    "Controlar el inventario y el uso racional de los insumos.",
    "Mantener limpios la barra, los equipos y los utensilios.",
    "Informar al encargado sobre faltantes o consumos irregulares.",
  ],
  requisitos: [
    "Educación básica concluida.",
    "Experiencia en barra, cafetería o atención al público (deseable).",
    "Conocimientos de higiene y manejo de bebidas.",
    "Disponibilidad para trabajar por turnos, fines de semana y feriados.",
  ],
  condiciones: [
    "Permanencia prolongada de pie y traslados con insumos y bandejas.",
    "Exposición a cortes con cristalería, quemaduras y superficies húmedas.",
    "Uso obligatorio de uniforme, gorra y calzado antideslizante.",
  ],
};

module.exports = {
  id: 'funciones_barra',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03l_Descripcion_Funciones_Barra',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'barra');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
