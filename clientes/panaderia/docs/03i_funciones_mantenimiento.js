'use strict';

// Descripción de funciones del cargo MANTENIMIENTO (área: mantenimiento).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

// Las funciones principales se toman de cliente.json (cargo.funciones); aquí
// solo se declara el contenido descriptivo propio del puesto.
const CONTENIDO = {
  proposito: "Conservar en buen estado los equipos e instalaciones del establecimiento mediante el mantenimiento preventivo y correctivo.",
  responsabilidades: [
    "Responder por el funcionamiento seguro de hornos, amasadoras, batidoras y neveras.",
    "Ejecutar y registrar las actividades de mantenimiento.",
    "Reportar las fallas que requieran proveedores o repuestos especializados.",
    "Cuidar las herramientas, los repuestos y el orden de los cuartos de máquinas.",
  ],
  requisitos: [
    "Educación básica concluida; deseable formación técnica en electricidad o mecánica.",
    "Experiencia en mantenimiento de equipos de cocina o industriales (deseable).",
    "Conocimientos de electricidad, gas, mecánica y seguridad laboral.",
    "Disponibilidad para atender emergencias fuera del horario habitual.",
  ],
  condiciones: [
    "Exposición a riesgos eléctricos, mecánicos y químicos.",
    "Trabajo en altura, espacios reducidos y con equipos energizados.",
    "Uso obligatorio de EPP: guantes, gafas, mascarilla y calzado de seguridad.",
  ],
};

module.exports = {
  id: 'funciones_mantenimiento',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03i_Descripcion_Funciones_Mantenimiento',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'mantenimiento');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
