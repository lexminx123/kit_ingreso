'use strict';

// Descripción de funciones del cargo MESERA (área: salon).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

// Las funciones principales se toman de cliente.json (cargo.funciones); aquí
// solo se declara el contenido descriptivo propio del puesto.
const CONTENIDO = {
  proposito: "Atender a los clientes en el salón con cortesía y eficiencia, garantizando un servicio oportuno y una buena experiencia.",
  responsabilidades: [
    "Responder por la atención, el servicio de mesa y la presentación del salón.",
    "Registrar y transmitir correctamente los pedidos.",
    "Canalizar las quejas y solicitudes de los clientes.",
    "Cuidar el material de servicio y mantener el orden del salón.",
  ],
  requisitos: [
    "Educación media concluida (deseable).",
    "Experiencia en atención al público o servicio de mesas (deseable).",
    "Conocimientos básicos de higiene y servicio al cliente.",
    "Disponibilidad para trabajar por turnos, fines de semana y feriados.",
  ],
  condiciones: [
    "Permanencia prolongada de pie y traslados constantes con bandejas.",
    "Exposición al trato directo con el público y horas de alta demanda.",
    "Uso obligatorio de uniforme, gorra y calzado antideslizante.",
  ],
};

module.exports = {
  id: 'funciones_mesera',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03g_Descripcion_Funciones_Mesera',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'mesera');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
