'use strict';

// Descripción de funciones del cargo SUPERVISOR DE SALÓN (área: salón).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

const CONTENIDO = {
  proposito:
    'Coordinar y supervisar la operación del salón, asegurando la calidad del ' +
    'servicio, el cumplimiento de los estándares de atención y la satisfacción de ' +
    'los clientes durante toda la jornada.',
  funciones: [
    'Organizar los turnos, las secciones y las tareas del personal de salón.',
    'Supervisar el montaje, el servicio y el desmontaje de las mesas.',
    'Atender los requerimientos y quejas de los clientes, resolviendo o escalando según corresponda.',
    'Coordinar con cocina y barra la fluidez y los tiempos del servicio.',
    'Verificar la presentación personal, la puntualidad y el cumplimiento de las normas del personal a su cargo.',
    'Elaborar reportes de ocupación, incidencias y cierre del salón.',
  ],
  responsabilidades: [
    'Garantizar la calidad del servicio y el trato al cliente en el salón.',
    'Cuidar el uso correcto de la vajilla, el mobiliario y los equipos del salón.',
    'Aplicar y hacer cumplir las normas de higiene y seguridad.',
    'Informar al administrador sobre el desempeño del personal y las necesidades del área.',
  ],
  requisitos: [
    'Educación media concluida; deseable formación en servicios gastronómicos o turismo.',
    'Experiencia en atención al cliente y supervisión de personal (deseable).',
    'Liderazgo, comunicación efectiva y manejo de conflictos.',
    'Disponibilidad para trabajar por turnos, fines de semana y feriados.',
  ],
  condiciones: [
    'Permanencia prolongada de pie y desplazamiento continuo por el salón.',
    'Responsabilidad sobre el equipo de trabajo y la operación del área.',
    'Jornada con horario rotativo y atención en horas pico.',
  ],
};

module.exports = {
  id: 'funciones_supervisor_salon',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03g_Descripcion_Funciones_Supervisor_de_Salon',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'supervisor_salon');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
