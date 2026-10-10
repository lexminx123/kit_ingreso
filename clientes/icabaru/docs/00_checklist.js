'use strict';

// Control maestro de ingreso: inventario de documentos entregados al trabajador.

const cliente = require('../cliente.json');
const b = require('../../../tools/blocks.js');

// Documentos que integran el kit, con su código y carpeta de archivo.
const DOCUMENTOS = [
  ['01', 'Solicitud de Empleo', '01_INGRESO'],
  ['03a', 'Descripción de Funciones — Ayudante de Cocina', '03_DESCRIPCION_DE_CARGOS'],
  ['03b', 'Descripción de Funciones — Stewart (Lavaplatos)', '03_DESCRIPCION_DE_CARGOS'],
  ['03c', 'Descripción de Funciones — Mesonero / Atendedor', '03_DESCRIPCION_DE_CARGOS'],
  ['03d', 'Descripción de Funciones — Cajero', '03_DESCRIPCION_DE_CARGOS'],
  ['03e', 'Descripción de Funciones — Bartender', '03_DESCRIPCION_DE_CARGOS'],
  ['03f', 'Descripción de Funciones — Parrillero', '03_DESCRIPCION_DE_CARGOS'],
  ['03g', 'Descripción de Funciones — Supervisor de Salón', '03_DESCRIPCION_DE_CARGOS'],
  ['03h', 'Descripción de Funciones — Administrador', '03_DESCRIPCION_DE_CARGOS'],
  ['04a', 'Autorización de Depósito de Prestaciones', '04_PRESTACIONES'],
  ['04b', 'Designación de Beneficiarios', '04_PRESTACIONES'],
  ['06', 'Checklist IVSS / FAOV / INCES', '06_REGISTROS_LEGALES'],
  ['09', 'Carta de Aceptación General', '09_CIERRE'],
];

/** Fila de la tabla con casillas de entregado y firmado. */
function filaDocumento(codigo, nombre, carpeta) {
  return [codigo, nombre, carpeta, '[ ]', '[ ]'];
}

module.exports = {
  id: 'checklist_maestro_ingreso',
  dir: '00_CONTROL',
  filename: 'Checklist_Maestro_Ingreso',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.empresa ? entrada : cliente;
    return [
      b.title('CHECKLIST MAESTRO DE INGRESO'),
      b.subtitle(`Control de documentos del Kit de Ingreso — ${c.empresa}`),

      b.p(
        'Este control permite verificar que el trabajador recibió todos los ' +
          'documentos del kit de ingreso y que cada uno fue firmado. Marque la ' +
          'casilla "Entregado" y "Firmado" según corresponda.',
      ),

      b.chapter('Datos del trabajador'),
      b.field('Nombre y Apellido'),
      b.field('Cédula de Identidad'),
      b.field('Cargo'),
      b.field('Fecha de ingreso'),

      b.chapter('Documentos entregados'),
      b.table(
        ['Código', 'Documento', 'Carpeta', 'Entregado', 'Firmado'],
        DOCUMENTOS.map(([codigo, nombre, carpeta]) => filaDocumento(codigo, nombre, carpeta)),
      ),

      b.chapter('Observaciones'),
      b.field('Observaciones'),
      b.field('Recibido por (nombre y apellido)'),
      b.field('Fecha de verificación'),

      b.note(
        'Conserve este control en el expediente del trabajador. Cualquier documento ' +
          'pendiente debe regularizarse a la brevedad.',
      ),

      b.signatureBlock([
        { rol: 'EL/LA TRABAJADOR(A)', nombre: '', cargo: '', ci: '', fecha: '' },
        { rol: 'LA EMPRESA', nombre: '', cargo: '', ci: '', fecha: '' },
      ]),
    ];
  },
};
