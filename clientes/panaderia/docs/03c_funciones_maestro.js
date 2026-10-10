'use strict';

// Descripción de funciones del cargo MAESTRO (área: panaderia).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

// Las funciones principales se toman de cliente.json (cargo.funciones); aquí
// solo se declara el contenido descriptivo propio del puesto.
const CONTENIDO = {
  proposito: "Elaborar y garantizar la calidad de las masas y productos de panadería, dirigiendo la producción de la línea de panes.",
  responsabilidades: [
    "Responder por la calidad, el sabor y la presentación de los productos de panadería.",
    "Coordinar al personal de panadería y el orden de la producción.",
    "Controlar el rendimiento de la materia prima y reducir el desperdicio.",
    "Cuidar los equipos de panadería y reportar sus fallas.",
  ],
  requisitos: [
    "Experiencia comprobable como maestro panadero o panadero de producción.",
    "Conocimiento de formulaciones, fermentación, formado y horneado de panes.",
    "Curso de manipulación de alimentos vigente (deseable).",
    "Disponibilidad para trabajar de madrugada y por turnos.",
  ],
  condiciones: [
    "Trabajo de pie y ambiente caluroso durante el horneado.",
    "Exposición a harina en polvo, calor y equipos en movimiento.",
    "Uso obligatorio de uniforme, gorra o red y calzado antideslizante.",
  ],
};

module.exports = {
  id: 'funciones_maestro',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03c_Descripcion_Funciones_Maestro',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'maestro');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
