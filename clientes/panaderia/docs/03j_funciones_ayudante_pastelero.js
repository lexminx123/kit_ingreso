'use strict';

// Descripción de funciones del cargo AYUDANTE PASTELERO (área: pasteleria).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

// Las funciones principales se toman de cliente.json (cargo.funciones); aquí
// solo se declara el contenido descriptivo propio del puesto.
const CONTENIDO = {
  proposito: "Apoyar la elaboración y decoración de tortas, postres y productos de pastelería, manteniendo la higiene y el orden del área.",
  responsabilidades: [
    "Responder por la preparación de ingredientes y el apoyo en la decoración.",
    "Mantener limpios los utensilios, batidoras y el área de pastelería.",
    "Cuidar los insumos y evitar el desperdicio.",
    "Informar al pastelero sobre faltantes o fallas de equipos.",
  ],
  requisitos: [
    "Educación básica concluida.",
    "Experiencia previa en pastelería o panadería (deseable).",
    "Conocimientos básicos de higiene y manejo de alimentos.",
    "Disponibilidad para trabajar por turnos y fines de semana.",
  ],
  condiciones: [
    "Trabajo de pie y movimientos repetitivos con mangas y batidoras.",
    "Exposición a harina, azúcar, calor, cortes y superficies calientes.",
    "Uso obligatorio de uniforme, gorra o red y guantes anticorte.",
  ],
};

module.exports = {
  id: 'funciones_ayudante_pastelero',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03j_Descripcion_Funciones_Ayudante_Pastelero',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'ayudante_pastelero');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
