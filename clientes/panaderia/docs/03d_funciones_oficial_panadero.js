'use strict';

// Descripción de funciones del cargo OFICIAL PANADERO (área: panaderia).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

// Las funciones principales se toman de cliente.json (cargo.funciones); aquí
// solo se declara el contenido descriptivo propio del puesto.
const CONTENIDO = {
  proposito: "Preparar, amasar y hornear los productos de la línea de panes conforme a las recetas y a las instrucciones del maestro.",
  responsabilidades: [
    "Responder por la preparación correcta de las masas y el formado de los panes.",
    "Cuidar la materia prima y evitar el desperdicio.",
    "Mantener limpios los equipos y utensilios del área de panadería.",
    "Informar al maestro sobre anomalías en insumos, masas o equipos.",
  ],
  requisitos: [
    "Educación básica concluida.",
    "Experiencia previa en panadería o producción de alimentos (deseable).",
    "Conocimientos básicos de higiene y manejo de alimentos.",
    "Disponibilidad para trabajar de madrugada y por turnos.",
  ],
  condiciones: [
    "Trabajo de pie, esfuerzo físico y manipulación de sacos de harina.",
    "Exposición a harina en polvo, calor, cortes y equipos en movimiento.",
    "Uso obligatorio de uniforme, gorra o red y guantes según la tarea.",
  ],
};

module.exports = {
  id: 'funciones_oficial_panadero',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03d_Descripcion_Funciones_Oficial_Panadero',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'oficial_panadero');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
