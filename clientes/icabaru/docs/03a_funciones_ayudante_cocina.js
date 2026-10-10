'use strict';

// Descripción de funciones del cargo AYUDANTE DE COCINA (área: cocina).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

const CONTENIDO = {
  proposito:
    'Apoyar la operación de la cocina en la preparación previa de alimentos, la ' +
    'limpieza de la zona de trabajo y el mantenimiento del orden, garantizando la ' +
    'higiene y la continuidad del servicio.',
  funciones: [
    'Realizar la mise en place: lavar, pelar, cortar y porcionar vegetales, frutas y demás insumos.',
    'Preparar los ingredientes básicos bajo la instrucción del cocinero o jefe de cocina.',
    'Mantener limpios y en orden los mesones, utensilios y equipos de la cocina.',
    'Guardar y rotular los alimentos conforme a las normas de higiene y refrigeración.',
    'Apoyar el emplatado y el despacho de los platos durante el servicio.',
    'Retirar los desechos y mantener limpias las áreas de lavado y almacenamiento.',
  ],
  responsabilidades: [
    'Cumplir las normas de higiene e inocuidad de los alimentos durante toda la jornada.',
    'Reportar de inmediato al jefe de cocina cualquier anomalía en insumos o equipos.',
    'Cuidar los utensilios, equipos e instalaciones asignados.',
    'Usar el uniforme y los implementos de protección personal exigidos.',
  ],
  requisitos: [
    'Educación básica concluida; deseable curso de manipulación de alimentos.',
    'Experiencia previa en cocina o preparación de alimentos (deseable).',
    'Conocimientos básicos de higiene y manejo de alimentos.',
    'Disponibilidad para trabajar por turnos, fines de semana y feriados.',
  ],
  condiciones: [
    'Permanencia prolongada de pie y esfuerzo físico moderado.',
    'Exposición a calor, humedad, cortes y superficies calientes.',
    'Uso obligatorio de uniforme, redecilla y guantes según la tarea.',
  ],
};

module.exports = {
  id: 'funciones_ayudante_cocina',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03a_Descripcion_Funciones_Ayudante_de_Cocina',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'ayudante_cocina');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
