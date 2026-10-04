'use strict';

// Descripción de funciones del cargo MESONERO / ATENDEDOR (área: salón).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

const CONTENIDO = {
  proposito:
    'Brindar una atención cordial y eficiente a los clientes en el salón, tomando ' +
    'las órdenes, sirviendo los alimentos y bebidas y velando por una experiencia ' +
    'de servicio satisfactoria.',
  funciones: [
    'Recibir y acomodar a los clientes, entregar el menú y orientar sobre la oferta gastronómica.',
    'Tomar las órdenes y registrarlas en el sistema o comanda interna.',
    'Servir los platos y bebidas, verificando la correspondencia con lo solicitado.',
    'Montar y desmontar mesas, mantelería y vajilla según el protocolo de servicio.',
    'Atender solicitudes, quejas y requerimientos de los clientes, escalando al supervisor cuando corresponda.',
    'Presentar y entregar la cuenta, gestionando el cobro con caja.',
  ],
  responsabilidades: [
    'Mantener limpias y ordenadas las mesas y su área de trabajo durante todo el turno.',
    'Conocer el menú, los ingredientes y las recomendaciones de servicio.',
    'Cuidar la vajilla, la cristalería y los utensilios del salón.',
    'Cumplir las normas de higiene, presentación personal y trato al cliente.',
  ],
  requisitos: [
    'Educación media concluida; deseable certificado de manipulación de alimentos.',
    'Experiencia en atención al cliente o servicio de mesonero (deseable).',
    'Buena presentación personal, comunicación y actitud de servicio.',
    'Disponibilidad para trabajar por turnos, fines de semana y feriados.',
  ],
  condiciones: [
    'Permanencia prolongada de pie y desplazamiento continuo por el salón.',
    'Manejo de bandejas y cargas ligeras.',
    'Jornada con horario rotativo y atención en horas pico.',
  ],
};

module.exports = {
  id: 'funciones_mesonero',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03c_Descripcion_Funciones_Mesonero',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'mesonero');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
