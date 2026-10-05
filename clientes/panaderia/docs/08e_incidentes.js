'use strict';

// Ticket #7 — Procedimiento para el Reporte de Incidentes.
// Cita LOPCYMAT art. 73 por clave: notificación de los accidentes de trabajo
// dentro de las 24 horas siguientes.

const path = require('path');
const fs = require('fs');
const b = require('../../../tools/blocks.js');

function contexto(cliente = {}) {
  let datos = {};
  if (!cliente || !cliente.empresa) {
    try {
      datos = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'cliente.json'), 'utf8'));
    } catch (_) {
      datos = {};
    }
  }
  return { ...datos, ...cliente };
}

module.exports = {
  id: 'reporte_incidentes',
  dir: '08_POLITICAS_INTERNAS',
  filename: 'Procedimiento_Reporte_Incidentes',

  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const rif = c.rif || '[COMPLETAR: RIF]';

    return [
      b.title('PROCEDIMIENTO PARA EL REPORTE DE INCIDENTES'),
      b.subtitle(`${empresa} — RIF ${rif}`),

      b.p(
        'El presente procedimiento define cómo el personal de ' +
          empresa +
          ' debe reportar los incidentes y las condiciones de riesgo en el trabajo, con el fin ' +
          'de prevenir accidentes y enfermedades ocupacionales.',
      ),
      b.legalRef('lopcymat_73_accidente'),

      b.chapter('1. Definiciones'),
      b.bullet(
        'Incidente: suceso con potencial de causar daño a las personas, los bienes o el ' +
          'ambiente, aunque no se materialice la lesión.',
      ),
      b.bullet(
        'Accidente de trabajo: suceso que produce una lesión o enfermedad relacionada con ' +
          'el trabajo.',
      ),
      b.bullet(
        'Condición insegura: situación del entorno o del proceso que puede originar un ' +
          'incidente.',
      ),

      b.chapter('2. Obligación de reportar'),
      b.numbered(
        'Todo trabajador reporta de inmediato los incidentes, accidentes y condiciones ' +
          'inseguras que observe.',
      ),
      b.numbered(
        'El reporte se realiza al supervisor inmediato y se documenta en el formato ' +
          'correspondiente.',
      ),
      b.numbered(
        'Ningún trabajador será objeto de represalias por reportar de buena fe un incidente.',
      ),

      b.chapter('3. Pasos del procedimiento'),
      b.numbered(
        'Prestar auxilio inmediato y asegurar la zona cuando exista riesgo para las personas.',
      ),
      b.numbered(
        'Informar al supervisor y, de ser necesario, activar los servicios de emergencia.',
      ),
      b.numbered(
        'Registrar el incidente: fecha, lugar, personas involucradas y descripción de los ' +
          'hechos.',
      ),
      b.numbered(
        'Reportar el evento al servicio de seguridad y salud en el trabajo de la empresa.',
      ),
      b.numbered(
        'Adoptar las medidas correctivas para evitar la repetición del incidente.',
      ),

      b.chapter('4. Investigación y seguimiento'),
      b.numbered(
        'La empresa investiga los incidentes graves y documenta las causas y las acciones ' +
          'preventivas.',
      ),
      b.numbered(
        'Se mantiene registro de los reportes y del seguimiento de las medidas adoptadas.',
      ),
      b.numbered(
        'Se informa al personal sobre los riesgos detectados y las medidas de prevención.',
      ),

      b.chapter('5. Derechos del trabajador'),
      b.numbered(
        'Ser informado de los riesgos del puesto y de las medidas de prevención.',
      ),
      b.numbered(
        'Recibir la atención y las prestaciones que correspondan en caso de accidente o ' +
          'enfermedad ocupacional.',
      ),
      b.numbered(
        'Participar en la identificación de riesgos y en las actividades de prevención.',
      ),

      b.chapter('Acuse de recibo'),
      b.p(
        'Declaro haber recibido y comprendido este procedimiento y las instrucciones de ' +
          'reporte de incidentes.',
      ),
      b.field('Nombre y Apellido'),
      b.field('Cédula de Identidad'),
      b.field('Cargo'),
      b.field('Fecha'),

      b.signatureBlock([
        { rol: 'EL/LA TRABAJADOR(A)', nombre: '', cargo: '', ci: '', fecha: '' },
        { rol: 'LA EMPRESA', nombre: '', cargo: '', ci: '', fecha: '' },
      ]),
    ];
  },
};
