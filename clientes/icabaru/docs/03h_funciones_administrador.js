'use strict';

// Descripción de funciones del cargo ADMINISTRADOR (área: administración).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

const CONTENIDO = {
  proposito:
    'Dirigir la administración del establecimiento, gestionando los recursos ' +
    'humanos, financieros y materiales para asegurar la operación rentable, el ' +
    'cumplimiento legal y la calidad del servicio.',
  funciones: [
    'Planificar y supervisar la operación diaria del restaurante en todas sus áreas.',
    'Gestionar compras, proveedores e inventarios de insumos y suministros.',
    'Controlar ingresos, gastos, caja y conciliaciones bancarias.',
    'Dirigir el personal: selección, jornadas, permisos y evaluación del desempeño.',
    'Velar por el cumplimiento de las obligaciones laborales, fiscales y de seguridad social.',
    'Elaborar reportes de gestión y proponer mejoras de productividad y servicio.',
  ],
  responsabilidades: [
    'Cumplir y hacer cumplir las leyes laborales y las normas de higiene y seguridad.',
    'Custodiar los documentos, valores y activos de la empresa.',
    'Mantener el registro y archivo de la documentación del personal y de la operación.',
    'Guardar confidencialidad sobre la información financiera y estratégica del negocio.',
  ],
  requisitos: [
    'Título universitario en administración, contaduría o carreras afines; deseable.',
    'Experiencia en administración de restaurantes o comercios (deseable).',
    'Conocimientos de contabilidad básica, nómina y legislación laboral.',
    'Liderazgo, organización y manejo de herramientas ofimáticas.',
  ],
  condiciones: [
    'Trabajo de oficina con desplazamientos por las áreas del establecimiento.',
    'Responsabilidad sobre recursos financieros, humanos y materiales.',
    'Disponibilidad según las necesidades operativas del establecimiento.',
  ],
};

module.exports = {
  id: 'funciones_administrador',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03h_Descripcion_Funciones_Administrador',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'administrador');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
