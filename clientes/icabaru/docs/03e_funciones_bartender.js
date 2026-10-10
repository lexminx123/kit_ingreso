'use strict';

// Descripción de funciones del cargo BARTENDER (área: barra).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

const CONTENIDO = {
  proposito:
    'Preparar y servir bebidas y cócteles con calidad, rapidez y presentación ' +
    'cuidada, manteniendo la barra abastecida, limpia y bajo control sanitario.',
  funciones: [
    'Preparar bebidas alcohólicas y no alcohólicas conforme a las recetas de la casa.',
    'Servir en barra y despachar los pedidos del salón de forma oportuna.',
    'Mantener la barra limpia, ordenada y debidamente equipada.',
    'Controlar inventarios de licores, insumos, cristalería y suministros de barra.',
    'Verificar la edad de los clientes y aplicar las normas de servicio responsable de alcohol.',
    'Realizar el montaje y desmontaje de la barra al inicio y cierre de cada turno.',
  ],
  responsabilidades: [
    'Custodiar las botellas, insumos y equipos asignados a la barra.',
    'Reportar faltantes, mermas y necesidades de reposición al administrador.',
    'Cumplir las normas de higiene y manipulación de bebidas y alimentos.',
    'Mantener una atención cordial y profesional con los clientes.',
  ],
  requisitos: [
    'Educación media concluida; deseable curso de bartender o coctelería.',
    'Experiencia en barra o preparación de bebidas (deseable).',
    'Conocimiento de recetas de cócteles y técnicas de servicio.',
    'Disponibilidad para trabajar por turnos, fines de semana y feriados.',
  ],
  condiciones: [
    'Permanencia prolongada de pie detrás de la barra.',
    'Exposición a frío, hielo, cuchillos y superficies mojadas.',
    'Jornada con horario rotativo y atención en horas pico.',
  ],
};

module.exports = {
  id: 'funciones_bartender',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03e_Descripcion_Funciones_Bartender',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'bartender');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
