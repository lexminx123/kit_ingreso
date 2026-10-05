'use strict';

// Ticket #7 — Reglamento Interno de Trabajo.
//
// Documento extenso adaptado a la actividad de panadería y pastelería.
// Las citas legales se resuelven por clave contra legal/ve.js:
// el reglamento no cita a la LOTTT como si fuera un artículo del propio
// reglamento.

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
  id: 'reglamento_interno',
  dir: '08_POLITICAS_INTERNAS',
  filename: 'Reglamento_Interno_de_Trabajo',

  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const rif = c.rif || '[COMPLETAR: RIF]';

    return [
      b.title('REGLAMENTO INTERNO DE TRABAJO'),
      b.subtitle(`${empresa} — RIF ${rif}`),

      b.p(
        'El presente Reglamento Interno de Trabajo regula las condiciones a las que deben ' +
          'sujetarse las trabajadoras y los trabajadores de ' +
          empresa +
          ', dedicada a la actividad de panadería, pastelería y venta de panes y derivados. ' +
          'Su contenido se interpreta y aplica conforme a la legislación ' +
          'laboral venezolana.',
      ),
      b.note(
        'Las remisiones normativas de este reglamento se expresan por referencia a la ley ' +
          'aplicable y no sustituyen los derechos que la ley garantiza a las trabajadoras y ' +
          'los trabajadores.',
      ),

      b.chapter('CAPÍTULO I. Disposiciones generales'),
      b.h3('Objeto y ámbito de aplicación'),
      b.p(
        'Este reglamento es obligatorio para todo el personal, con independencia del cargo, ' +
          'modalidad o tiempo de servicio. Se entrega al momento del ingreso y forma parte de ' +
          'la documentación laboral.',
      ),
      b.h3('Principios'),
      b.numbered('Respeto a la dignidad, a la igualdad y a la no discriminación.'),
      b.numbered('Cumplimiento de las normas de seguridad, higiene y salud en el trabajo.'),
      b.numbered('Conservación de los bienes, equipos e instalaciones de la empresa.'),
      b.numbered(
        'Los derechos laborales reconocidos por la ley son irrenunciables y no pueden ' +
          'desmejorarse por este reglamento.',
      ),
      b.legalRef('crbv_89_irrenunciabilidad'),
      b.legalRef('crbv_87_trabajo'),

      b.chapter('CAPÍTULO II. Jornada de trabajo, horarios y turnos'),
      b.p(
        'La jornada ordinaria de trabajo es diurna y se distribuye según la organización de ' +
          'turnos por área y las necesidades del servicio. La jornada y sus límites se ' +
          'ajustan a lo previsto en la ley.',
      ),
      b.legalRef('lottt_173_jornada'),
      b.numbered(
        'Los turnos se publican con anticipación en las áreas de trabajo y pueden ser ' +
          'rotativos (apertura, intermedio y cierre).',
      ),
      b.numbered(
        'Los cambios de turno se solicitan con la debida antelación y quedan sujetos a la ' +
          'aprobación del supervisor.',
      ),
      b.numbered(
        'Las horas extraordinarias se prestan solo cuando resulten necesarias y con la debida ' +
          'autorización, conforme a la ley.',
      ),
      b.numbered(
        'Se garantiza el disfrute del descanso semanal y de los días feriados que ' +
          'correspondan.',
      ),
      b.legalRef('lottt_188_descanso'),
      b.legalRef('lottt_184_feriados'),

      b.chapter('CAPÍTULO III. Puntualidad y asistencia'),
      b.numbered(
        'La jornada inicia a la hora del turno asignado; el registro de entrada y salida es ' +
          'obligatorio.',
      ),
      b.numbered(
        'Se admite una tolerancia breve y razonable; la reincidencia se considera falta.',
      ),
      b.numbered(
        'Las inasistencias deben justificarse ante el supervisor lo antes posible; las causas ' +
          'justificadas se valoran conforme a la ley.',
      ),
      b.numbered(
        'El abandono del puesto durante la jornada requiere autorización del supervisor.',
      ),

      b.chapter('CAPÍTULO IV. Presentación personal e higiene'),
      b.numbered('Asistir bañado(a) y con la ropa limpia; usar uñas cortas y aseadas.'),
      b.numbered(
        'Mantener el cabello recogido y, en el área de cocina, cubierto cuando corresponda.',
      ),
      b.numbered(
        'No usar joyas, anillos, pulseras ni relojes en las áreas de producción y ' +
          'manipulación de alimentos.',
      ),
      b.numbered('Mantener el uniforme limpio y en buen estado durante toda la jornada.'),
      b.numbered('Informar cualquier enfermedad contagiosa o lesión que afecte el servicio.'),

      b.chapter('CAPÍTULO V. Normas de manipulación de alimentos'),
      b.p(
        'Dada la naturaleza del servicio, se observan estrictas normas de inocuidad ' +
          'alimentaria:',
      ),
      b.numbered('Lavarse las manos con frecuencia y cada vez que se cambie de tarea.'),
      b.numbered('Respetar la cadena de frío y la separación entre alimentos crudos y cocidos.'),
      b.numbered('Mantener limpias las superficies, utensilios y equipos de trabajo.'),
      b.numbered(
        'No manipular alimentos con heridas descubiertas; se deben cubrir de forma adecuada.',
      ),
      b.numbered(
        'No comer, fumar ni ingerir bebidas en las áreas de producción y almacenamiento.',
      ),
      b.numbered(
        'Almacenar y rotular los alimentos conforme a las instrucciones del responsable del ' +
          'área.',
      ),

      b.chapter('CAPÍTULO VI. Uniformes y equipos de protección personal'),
      b.numbered(
        'La empresa entrega el uniforme y los equipos de protección personal (EPP) que ' +
          'correspondan al puesto.',
      ),
      b.numbered(
        'El uso del uniforme y del EPP es obligatorio durante la jornada, según el área.',
      ),
      b.numbered(
        'El trabajador cuida los uniformes y equipos entregados y responde por su uso ' +
          'adecuado.',
      ),
      b.numbered(
        'Las condiciones de riesgo e instrucciones de prevención son informadas al trabajador.',
      ),
      b.legalRef('lopcymat_56_notif_riesgos'),

      b.chapter('CAPÍTULO VII. Conducta con clientes, compañeros y supervisores'),
      b.numbered(
        'Brindar un trato cordial, respetuoso y profesional a clientes y a todo el personal.',
      ),
      b.numbered(
        'Queda prohibida toda forma de discriminación, acoso, hostigamiento o violencia.',
      ),
      b.numbered(
        'Atender oportunamente las solicitudes e instrucciones del supervisor y canalizar los ' +
          'reclamos por la vía correspondiente.',
      ),
      b.numbered(
        'Cuidar el lenguaje y evitar toda conducta que afecte la imagen del establecimiento.',
      ),

      b.chapter('CAPÍTULO VIII. Uso de caja, propinas y bienes de la empresa'),
      b.numbered(
        'El manejo de la caja se realiza conforme al procedimiento autorizado; los faltantes ' +
          'injustificados deben reportarse de inmediato.',
      ),
      b.numbered(
        'Las propinas se administran conforme a la política de la empresa y a la ley; no ' +
          'pueden retenerse indebidamente.',
      ),
      b.numbered(
        'Queda prohibido apropiarse de dinero, mercancía, insumos o bienes de la empresa o de ' +
          'terceros.',
      ),
      b.numbered(
        'Los bienes y equipos de la empresa se usan solo para actividades laborales.',
      ),

      b.chapter('CAPÍTULO IX. Faltas y sanciones'),
      b.p(
        'Las faltas se clasifican en leves, graves y muy graves. La sanción es proporcional a ' +
          'la falta, sin menoscabo de los derechos laborales.',
      ),
      b.table(
        ['Tipo de falta', 'Ejemplos', 'Sanción'],
        [
          [
            'LEVE',
            'Retardos reiterados, descuido en la presentación personal, incumplimiento menor de instrucciones.',
            'Llamado de atención verbal y registro.',
          ],
          [
            'GRAVE',
            'Inasistencia injustificada, descuido que comprometa la inocuidad de los alimentos, trato descortés al cliente.',
            'Llamado de atención escrito.',
          ],
          [
            'MUY GRAVE',
            'Apropiación de bienes o dinero, agresión o acoso, manipulación deliberada e insegura de alimentos, incumplimiento grave de las normas de seguridad.',
            'Suspensión o terminación de la relación laboral por causa justificada.',
          ],
        ],
      ),
      b.numbered('La reincidencia agrava la falta y habilita una sanción mayor.'),
      b.numbered(
        'La terminación por causa justificada se aplica conforme a las causales previstas en ' +
          'la ley.',
      ),
      b.legalRef('lottt_79_despido'),

      b.chapter('CAPÍTULO X. Procedimiento para la imposición de sanciones'),
      b.numbered('El hecho se reporta al supervisor inmediato, quien lo documenta.'),
      b.numbered(
        'El trabajador es informado de los hechos que se le imputan y puede presentar sus ' +
          'descargos.',
      ),
      b.numbered('La sanción se notifica por escrito y se incorpora al expediente laboral.'),
      b.numbered(
        'El trabajador puede exponer su inconformidad por los canales internos previstos.',
      ),

      b.chapter('CAPÍTULO XI. Salario, prestaciones y beneficios'),
      b.p(
        'La remuneración, las prestaciones sociales y los beneficios se rigen por la ley, el ' +
          'contrato individual de trabajo y las políticas de la empresa.',
      ),
      b.legalRef('lottt_104_salario'),
      b.numbered(
        'Las prestaciones sociales se depositan y acreditan conforme al régimen legal.',
      ),
      b.legalRef('lottt_142_garantia'),
      b.legalRef('lottt_143_deposito'),
      b.numbered('Las vacaciones y el bono vacacional se otorgan según la ley.'),
      b.legalRef('lottt_190_vacaciones'),
      b.legalRef('lottt_192_bono_vacacional'),
      b.numbered('Las utilidades se pagan conforme a lo previsto en la ley.'),
      b.legalRef('lottt_131_utilidades'),

      b.chapter('CAPÍTULO XII. Disposiciones finales'),
      b.numbered('Este reglamento entra en vigencia a partir de su entrega al trabajador.'),
      b.numbered(
        'La empresa podrá ajustarlo para adaptarlo a cambios legales u operativos, informando ' +
          'oportunamente al personal.',
      ),
      b.numbered(
        'Toda duda de interpretación se resuelve conforme a la legislación laboral vigente.',
      ),

      b.chapter('Acuse de recibo'),
      b.p(
        'Declaro haber recibido y leído el presente Reglamento Interno de Trabajo, comprender ' +
          'su contenido y aceptar las condiciones en él establecidas.',
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
