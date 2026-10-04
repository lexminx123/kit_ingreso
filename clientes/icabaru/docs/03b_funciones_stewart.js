'use strict';

// Descripción de funciones del cargo STEWART / LAVAPLATOS (área: cocina).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

const CONTENIDO = {
  proposito:
    'Garantizar el lavado, la desinfección y el resguardo de la vajilla, los ' +
    'utensilios y la cristalería, así como el aseo general de la zona de cocina, ' +
    'para asegurar un servicio higiénico y continuo.',
  funciones: [
    'Lavar, enjuagar y desinfectar platos, cubiertos, vasos, ollas y utensilios.',
    'Secar, clasificar y guardar la vajilla en sus espacios asignados.',
    'Mantener limpios los fregaderos, las máquinas lavavajillas y los contenedores de desechos.',
    'Apoyar el aseo de mesones, pisos y áreas comunes de la cocina.',
    'Cumplir los protocolos de separación y disposición de residuos.',
    'Colaborar en la limpieza de cierre al final de cada turno.',
  ],
  responsabilidades: [
    'Mantener la zona de lavado y el área de secado siempre limpias y ordenadas.',
    'Reportar roturas, faltantes o daños de vajilla y utensilios.',
    'Evitar la contaminación cruzada entre áreas sucias y limpias.',
    'Cuidar el agua, los insumos de limpieza y los equipos a su cargo.',
  ],
  requisitos: [
    'Educación básica concluida.',
    'Experiencia en lavado de vajilla o aseo de cocinas (deseable).',
    'Disposición para tareas de limpieza y esfuerzo físico.',
    'Disponibilidad para trabajar por turnos, fines de semana y feriados.',
  ],
  condiciones: [
    'Permanencia prolongada de pie y manejo de cargas.',
    'Exposición a agua caliente, vapor y sustancias de limpieza.',
    'Uso obligatorio de uniforme, guantes y calzado antideslizante.',
  ],
};

module.exports = {
  id: 'funciones_stewart',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03b_Descripcion_Funciones_Stewart',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'stewart');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
