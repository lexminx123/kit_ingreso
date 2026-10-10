'use strict';

// Programa de Exámenes Médicos Periódicos.
//
// Define los tipos de exámenes de salud (ingreso, periódicos, egreso y
// post-incapacidad), su frecuencia y la confidencialidad de los resultados.
// Cita por clave el derecho a los exámenes de salud preventivos y la norma
// técnica del programa de seguridad y salud en el trabajo.

const b = require('../../../tools/blocks.js');
const clienteBase = require('../cliente.json');

/** Combina el cliente recibido con el cliente.json del kit (por si llega vacío). */
function contexto(cliente) {
  if (cliente && cliente.empresa) return cliente;
  return clienteBase;
}

// Tipos de examen de salud y su momento de práctica.
const EXAMENES = [
  ['Examen de ingreso', 'Previo al inicio de la actividad, para conocer el estado de salud inicial.'],
  ['Examen periódico', 'Durante la relación laboral, según la frecuencia establecida.'],
  ['Examen de egreso', 'Al terminar la relación de trabajo, para dejar constancia del estado de salud final.'],
  ['Examen post-incapacidad', 'Al reincorporarse después de una incapacidad o ausencia prolongada.'],
];

module.exports = {
  id: 'programa_examenes_medicos_periodicos',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Programa_Examenes_Medicos_Periodicos',
  empresa: clienteBase.empresa,
  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const rif = c.rif || '[COMPLETAR: RIF]';
    const representante = c.representante || {};

    return [
      b.title('PROGRAMA DE EXÁMENES MÉDICOS PERIÓDICOS'),
      b.subtitle(`${empresa} — RIF ${rif} · Vigilancia de la salud`),

      b.p(
        'El presente programa establece los exámenes de salud que se practican al personal de ' +
          empresa +
          ', con el objeto de vigilar su estado de salud en relación con los riesgos del ' +
          'puesto, detectar de forma temprana las alteraciones y adoptar las medidas ' +
          'preventivas correspondientes.',
      ),
      b.legalRef('lopcymat_53_10_examen'),
      b.legalRef('nt_04_2023'),

      b.chapter('1. Objeto y alcance'),
      b.p(
        'Aplica a todas las trabajadoras y los trabajadores del establecimiento, en todas las ' +
          'áreas y turnos, incluido el personal en período de inducción. Los exámenes se ' +
          'practican sin costo para el trabajador(ra).',
      ),

      b.chapter('2. Tipos de exámenes'),
      b.table(['Tipo de examen', 'Momento de práctica'], EXAMENES),

      b.chapter('3. Frecuencia y población'),
      b.p(
        'La periodicidad de los exámenes se determina según el riesgo del puesto y la ' +
          'normativa aplicable. Los puestos con exposición a calor, cortes, químicos o ' +
          'manipulación de alimentos requieren especial atención.',
      ),
      b.table(
        ['Área / puesto', 'Riesgo principal', 'Frecuencia del examen periódico'],
        [
          ['Cocina y horno', 'Calor, cortes, gases', 'Anual'],
          ['Lavado de platos', 'Químicos y humedad', 'Anual'],
          ['Salón y atención al público', 'Ergonomía y estrés', 'Anual'],
          ['Caja y administración', 'Fatiga visual y postural', 'Anual'],
        ],
      ),
      b.field('Médico o servicio de salud ocupacional'),
      b.field('Fecha del último examen periódico'),

      b.chapter('4. Confidencialidad de los resultados'),
      b.p(
        'Los resultados de los exámenes son confidenciales. Solo se comunican al personal ' +
          'médico y a las autoridades sanitarias competentes, con la autorización informada ' +
          'del trabajador(ra). La empresa no accede al detalle clínico, sino únicamente a la ' +
          'información sobre la aptitud para el puesto y las recomendaciones preventivas.',
      ),
      b.numbered('El trabajador(ra) conoce previamente el alcance y la finalidad del examen.'),
      b.numbered('Los datos de salud no se difunden ni se usan para fines distintos a la vigilancia de la salud.'),
      b.numbered('No se exigen exámenes que vulneren la intimidad sin consentimiento libre, expreso y manifiesto.'),
      b.field('Consentimiento informado registrado (sí / no)'),

      b.chapter('5. Registros'),
      b.numbered('Se conserva el registro de los exámenes practicados, con fecha y resultado de aptitud.'),
      b.numbered('La información se guarda con medidas que garanticen su reserva.'),
      b.numbered('El trabajador(ra) puede solicitar constancia de los exámenes realizados.'),

      b.chapter('6. Aprobación y firma'),
      b.p(
        'El presente programa se aprueba para su ejecución en el establecimiento a partir de ' +
          'la fecha señalada.',
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
        'Programa de exámenes médicos periódicos. Requiere revisión por abogado laboralista y ' +
          'por un profesional de seguridad y salud antes de su uso formal.',
      ),
    ];
  },
};
