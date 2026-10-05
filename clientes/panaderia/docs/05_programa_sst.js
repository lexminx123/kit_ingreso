'use strict';

// Programa de Seguridad y Salud en el Trabajo (PSST) — panadería y pastelería.
//
// Documento marco de las obligaciones del patrono en materia de seguridad y
// salud laboral, adaptado a la actividad de panadería y pastelería. Cita por clave la
// NT-04-2023, la LOPCYMAT (arts. 46, 53 num. 4 y 56) y el Reglamento parcial.

const b = require('../../../tools/blocks.js');
const clienteBase = require('../cliente.json');

/** Combina el cliente recibido con el cliente.json del kit (por si llega vacío). */
function contexto(cliente) {
  if (cliente && cliente.empresa) return cliente;
  return clienteBase;
}

// Peligros y riesgos propios del rubro, por área de trabajo.
const RIESGOS_POR_AREA = [
  ['Cocina y horno', 'Cortes, quemaduras, contacto con gas, carga manual', 'EPP, mantenimiento de equipos, ventilación y extintores.'],
  ['Lavado de platos', 'Cortes con vajilla, químicos de limpieza, pisos húmedos', 'Guantes, dilución correcta, señalización y calzado antideslizante.'],
  ['Salón y atención al público', 'Resbalones, carga de bandejas, estrés, agresión de clientes', 'Pisos secos, técnica de carga, protocolo de atención y apoyo del supervisor.'],
  ['Caja y administración', 'Robo o violencia, fatiga visual, posturas prolongadas', 'Manejo discreto del efectivo, pausas activas y ergonomía del puesto.'],
];

module.exports = {
  id: '05_programa_sst',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Programa_Seguridad_y_Salud_Laboral',
  empresa: clienteBase.empresa,
  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const rif = c.rif || '[COMPLETAR: RIF]';
    const representante = c.representante || {};

    return [
      b.title('PROGRAMA DE SEGURIDAD Y SALUD EN EL TRABAJO'),
      b.subtitle(`${empresa} — RIF ${rif} · Panadería y pastelería`),

      b.p(
        'El presente Programa de Seguridad y Salud en el Trabajo (PSST) establece las ' +
          'obligaciones del patrono y las medidas de prevención aplicables a la actividad ' +
          'de panadería y pastelería de ' +
          empresa +
          ', con el objeto de proteger la vida, la salud y la integridad del personal.',
      ),
      b.legalRef('nt_04_2023'),
      b.legalRef('reglamento_lopcymat_2007'),

      b.chapter('1. Objeto, alcance y definiciones'),
      b.h3('1.1 Objeto'),
      b.p(
        'Definir, organizar y ejecutar las actividades de promoción, prevención y control de ' +
          'los riesgos laborales del establecimiento, conforme a la normativa vigente.',
      ),
      b.h3('1.2 Alcance'),
      b.p(
        'Aplica a todo el personal de la empresa, en todas las áreas y turnos, incluido el ' +
          'personal contratado o en período de inducción.',
      ),
      b.h3('1.3 Definiciones'),
      b.bullet('Peligro: fuente o situación con potencial de causar daño.'),
      b.bullet('Riesgo: probabilidad de que un peligro se materialice y cause daño.'),
      b.bullet('Accidente de trabajo: suceso que produce una lesión relacionada con el trabajo.'),

      b.chapter('2. Política de seguridad y salud'),
      b.p(
        `${empresa} asume el compromiso de mantener un ambiente de trabajo seguro y saludable, ` +
          'de cumplir la normativa aplicable y de mejorar de forma continua sus condiciones ' +
          'de trabajo, con la participación activa de los trabajadores y las trabajadoras.',
      ),
      b.numbered('Integrar la seguridad y la salud en cada puesto y proceso de trabajo.'),
      b.numbered('Identificar los peligros y evaluar los riesgos de forma periódica.'),
      b.numbered('Capacitar al personal sobre los riesgos de su puesto y su prevención.'),
      b.numbered('Garantizar el uso adecuado del EPP entregado.'),

      b.chapter('3. Obligaciones del patrono'),
      b.numbered(
        'Informar por escrito a cada trabajador(ra) sobre los riesgos de su puesto y las ' +
          'medidas de prevención, al ingresar y cuando cambien las condiciones.',
      ),
      b.legalRef('lopcymat_56_notif_riesgos'),
      b.numbered(
        'Proveer los implementos y equipos de protección personal adecuados, sin costo para ' +
          'el trabajador(ra), y velar por su uso.',
      ),
      b.legalRef('lopcymat_53_4_epp'),
      b.numbered('Realizar la vigilancia de la salud de los trabajadores y las trabajadoras.'),
      b.numbered('Notificar e investigar los accidentes de trabajo conforme a la ley.'),
      b.numbered('Mantener un registro de las condiciones y de las acciones preventivas.'),

      b.chapter('4. Organización de la seguridad y salud'),
      b.p(
        'La empresa conforma y apoya el Comité de Seguridad y Salud Laboral y la figura de los ' +
          'delegados o delegadas de prevención, como órganos de participación en la materia.',
      ),
      b.legalRef('lopcymat_46_comite'),
      b.field('Coordinador(a) de Seguridad y Salud Laboral'),
      b.field('Delegado(s) de prevención'),
      b.field('Fecha de constitución del Comité'),

      b.chapter('5. Identificación de peligros y evaluación de riesgos'),
      b.p(
        'Se identifican los peligros por área de trabajo y se definen las medidas preventivas ' +
          'y de control correspondientes a la actividad de panadería y pastelería.',
      ),
      b.table(
        ['Área de trabajo', 'Peligros y riesgos', 'Medidas preventivas y de control'],
        RIESGOS_POR_AREA,
      ),

      b.chapter('6. Plan de formación'),
      b.bullet('Inducción en seguridad y salud al ingresar al trabajo.'),
      b.bullet('Formación en manipulación de alimentos e higiene.'),
      b.bullet('Uso correcto del EPP y manejo de equipos de cocina y horno.'),
      b.bullet('Simulacros de emergencia y uso de extintores.'),

      b.chapter('7. Planes de emergencia y respuesta'),
      b.numbered('Mantener señalizadas las salidas y las rutas de evacuación.'),
      b.numbered('Disponer de extintores vigentes, botiquín y números de emergencia.'),
      b.numbered('Definir el procedimiento de respuesta ante incendio, gas, sismo o lesión.'),
      b.numbered('Designar un responsable de activar la evacuación y el aviso a los servicios.'),

      b.chapter('8. Vigilancia de la salud'),
      b.numbered('Practicar los exámenes de salud de ingreso, periódicos y de egreso.'),
      b.numbered('Mantener la confidencialidad de los datos de salud del personal.'),
      b.numbered('Referir a los servicios médicos los casos que lo requieran.'),

      b.chapter('9. Registros y evaluación'),
      b.numbered('Registrar los riesgos, los incidentes, los accidentes y las acciones tomadas.'),
      b.numbered('Evaluar el programa de manera periódica y actualizarlo cuando cambien las condiciones.'),
      b.numbered('Conservar la documentación a disposición de la autoridad competente.'),

      b.chapter('10. Aprobación y firma'),
      b.p(
        'El presente Programa de Seguridad y Salud en el Trabajo se aprueba para su ejecución ' +
          'y aplicación en el establecimiento a partir de la fecha señalada.',
      ),
      b.field('Fecha de aprobación'),
      b.signatureBlock([
        {
          rol: 'LA EMPRESA',
          nombre: representante.nombre || '',
          cargo: representante.cargo || '',
          ci: representante.ci || '',
          fecha: '',
        },
        { rol: 'TRABAJADOR(A) / DELEGADO(A)', nombre: '', cargo: '', ci: '', fecha: '' },
      ]),
      b.note(
        'Programa de Seguridad y Salud en el Trabajo. Requiere revisión por abogado ' +
          'laboralista y por un profesional de seguridad y salud antes de su uso formal.',
      ),
    ];
  },
};
