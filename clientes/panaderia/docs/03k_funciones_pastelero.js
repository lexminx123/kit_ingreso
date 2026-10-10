'use strict';

// Descripción de funciones del cargo PASTELERO (área: pasteleria).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

// Las funciones principales se toman de cliente.json (cargo.funciones); aquí
// solo se declara el contenido descriptivo propio del puesto.
const CONTENIDO = {
  proposito: "Elaborar y decorar tortas, postres y productos de pastelería de alta calidad, dirigiendo la línea de pastelería.",
  responsabilidades: [
    "Responder por la calidad, el sabor y la presentación de los productos de pastelería.",
    "Controlar el inventario y el uso racional de los insumos.",
    "Orientar al ayudante de pastelería.",
    "Reportar al encargado las necesidades de insumos y las fallas de equipos.",
  ],
  requisitos: [
    "Experiencia comprobable en pastelería o repostería.",
    "Conocimiento de masas, cremas, coberturas y técnicas de decoración.",
    "Curso de manipulación de alimentos vigente (deseable).",
    "Disponibilidad para trabajar por turnos y fines de semana.",
  ],
  condiciones: [
    "Trabajo de pie y ambiente caluroso cercano a los hornos.",
    "Exposición a harina, azúcar caliente, cortes y equipos en movimiento.",
    "Uso obligatorio de uniforme, gorra o red y guantes según la tarea.",
  ],
};

module.exports = {
  id: 'funciones_pastelero',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03k_Descripcion_Funciones_Pastelero',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'pastelero');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
