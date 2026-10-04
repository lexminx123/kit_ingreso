'use strict';

// Descripción de funciones del cargo PARRILLERO (área: parrilla).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

const CONTENIDO = {
  proposito:
    'Preparar y cocinar carnes y demás especialidades a la parrilla con el punto ' +
    'solicitado, controlando tiempos, temperaturas y sazón para asegurar la calidad ' +
    'y la inocuidad de los platos.',
  funciones: [
    'Seleccionar, porcionar y preparar las carnes y proteínas antes de la cocción.',
    'Encender, regular y mantener la parrilla a la temperatura adecuada.',
    'Cocinar los cortes según el término solicitado por el cliente.',
    'Controlar la sazón, la presentación y el despacho oportuno de los platos.',
    'Mantener limpia la parrilla, la campana, los utensilios y la zona de trabajo.',
    'Verificar la cadena de frío y el estado de los insumos cárnicos.',
  ],
  responsabilidades: [
    'Garantizar la calidad y el punto correcto de cada preparación a la parrilla.',
    'Cumplir las normas de higiene e inocuidad de los alimentos.',
    'Reportar al jefe de cocina anomalías en insumos, equipos o existencias.',
    'Cuidar los equipos, utensilios e instalaciones a su cargo.',
  ],
  requisitos: [
    'Educación básica concluida; deseable curso de manipulación de alimentos.',
    'Experiencia comprobable en parrilla o cocina de carnes (deseable).',
    'Conocimiento de cortes, puntos de cocción y manejo de parrilla.',
    'Disponibilidad para trabajar por turnos, fines de semana y feriados.',
  ],
  condiciones: [
    'Permanencia prolongada de pie frente a fuente de calor.',
    'Exposición a altas temperaturas, humo, grasa y superficies calientes.',
    'Uso obligatorio de uniforme, guantes y protección contra el calor.',
  ],
};

module.exports = {
  id: 'funciones_parrillero',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03f_Descripcion_Funciones_Parrillero',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'parrillero');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
