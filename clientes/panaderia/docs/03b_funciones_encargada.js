'use strict';

// Descripción de funciones del cargo ENCARGADA (área: admin).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

// Las funciones principales se toman de cliente.json (cargo.funciones); aquí
// solo se declara el contenido descriptivo propio del puesto.
const CONTENIDO = {
  proposito: "Supervisar el salón, la atención al público y la exhibición de los productos, velando por la calidad del servicio y la satisfacción del cliente.",
  responsabilidades: [
    "Responder por la atención, la presentación del salón y la reposición de la vitrina.",
    "Coordinar los turnos del personal de atención, caja y limpieza.",
    "Atender y canalizar las quejas y sugerencias de los clientes.",
    "Apoyar el cierre de caja y el reporte diario de la operación.",
  ],
  requisitos: [
    "Educación media concluida.",
    "Experiencia en atención al público o supervisión de salón (deseable).",
    "Conocimientos de higiene de los alimentos y servicio al cliente.",
    "Disponibilidad para trabajar por turnos, fines de semana y feriados.",
  ],
  condiciones: [
    "Permanencia prolongada de pie y desplazamientos constantes en el salón.",
    "Exposición al trato directo con el público y horas de alta demanda.",
    "Uso obligatorio de uniforme y presentación impecable.",
  ],
};

module.exports = {
  id: 'funciones_encargada',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03b_Descripcion_Funciones_Encargada',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'encargada');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
