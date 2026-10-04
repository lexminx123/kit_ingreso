'use strict';

// Ticket #7 — Autorización para el tratamiento de datos personales.
// Citas siempre por clave contra legal/ve.js (nunca escritas a mano).

const path = require('path');
const fs = require('fs');
const b = require('../../../tools/blocks.js');

// build.js puede invocar blocks({ slug }); en ese caso cargamos cliente.json.
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
  id: 'autorizacion_datos_personales',
  dir: '07_AUTORIZACIONES',
  filename: 'Autorizacion_Datos_Personales',

  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const rif = c.rif || '[COMPLETAR: RIF]';

    return [
      b.title('AUTORIZACIÓN PARA EL TRATAMIENTO DE DATOS PERSONALES'),
      b.subtitle(`${empresa} — RIF ${rif}`),

      b.p(
        'Por medio de la presente manifiesto, de forma libre, expresa e informada, mi ' +
          'consentimiento para que ' +
          empresa +
          ' trate mis datos personales con las finalidades y bajo las condiciones que se ' +
          'describen a continuación.',
      ),

      b.chapter('Datos del titular'),
      b.field('Nombre y Apellido'),
      b.field('Cédula de Identidad'),
      b.field('Cargo a desempeñar'),
      b.field('Área / Departamento'),
      b.field('Fecha de ingreso'),

      b.chapter('1. Finalidad del tratamiento'),
      b.p(
        'Los datos serán tratados únicamente para las siguientes finalidades vinculadas a la ' +
          'relación laboral:',
      ),
      b.bullet('Gestión de ingreso, expediente laboral y control de asistencia.'),
      b.bullet('Procesamiento de nómina, pagos y beneficios contractuales o legales.'),
      b.bullet('Afiliación y trámites ante la seguridad social y demás entes obligatorios.'),
      b.bullet('Cumplimiento de obligaciones legales, contables, fiscales y de seguridad laboral.'),
      b.bullet('Contacto en caso de emergencia y notificaciones relacionadas con el empleo.'),

      b.chapter('2. Datos objeto de tratamiento'),
      b.p(
        'Se tratarán datos de identificación, contacto, datos laborales, académicos y de ' +
          'salud estrictamente necesarios para las finalidades indicadas. Los datos sensibles ' +
          'se tratarán con especial reserva y solo cuando resulten imprescindibles.',
      ),

      b.chapter('3. Derechos del titular'),
      b.p(
        'De conformidad con el derecho de acceso a la información y a la protección de datos ' +
          'personales, puedo ejercer los derechos de acceso, rectificación, actualización y ' +
          'supresión de mis datos, así como solicitar información sobre su uso.',
      ),
      b.numbered('Acceder a los datos personales que la empresa conserve sobre mi persona.'),
      b.numbered('Solicitar la rectificación o actualización de datos inexactos o incompletos.'),
      b.numbered('Solicitar la supresión de los datos cuando su conservación no sea exigible.'),
      b.numbered('Ser informado sobre las finalidades y el uso dado a mis datos.'),
      b.legalRef('crbv_28_habeas_data'),

      b.chapter('4. Conservación y seguridad'),
      b.p(
        'La empresa conservará los datos durante el tiempo necesario para cumplir las ' +
          'finalidades señaladas y las obligaciones legales aplicables, y adoptará medidas ' +
          'razonables de seguridad para evitar su pérdida, alteración o uso no autorizado.',
      ),
      b.legalRef('delitos_informaticos_2001'),

      b.chapter('5. Consentimiento y revocatoria'),
      b.p(
        'Autorizo el tratamiento descrito en esta autorización. Puedo revocar el ' +
          'consentimiento por escrito cuando no exista una obligación legal que imponga la ' +
          'conservación de los datos.',
      ),
      b.note(
        'Esta autorización se firma por duplicado; un ejemplar queda en poder del titular y ' +
          'otro en el expediente laboral de la empresa.',
      ),

      b.signatureBlock([
        { rol: 'EL/LA TRABAJADOR(A)', nombre: '', cargo: '', ci: '', fecha: '' },
        { rol: 'LA EMPRESA', nombre: '', cargo: '', ci: '', fecha: '' },
      ]),
    ];
  },
};
