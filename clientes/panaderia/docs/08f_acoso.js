'use strict';

// Política de Prevención del Acoso Laboral, el Acoso Sexual y la No Discriminación.
//
// Establece los principios, las conductas prohibidas, el canal de denuncia y el
// procedimiento de actuación frente a cualquier forma de acoso, hostigamiento,
// violencia o discriminación. Cita por clave la irrenunciabilidad de los
// derechos laborales y el derecho al trabajo (nunca el nombre de la ley a mano).

const b = require('../../../tools/blocks.js');
const clienteBase = require('../cliente.json');

/** Combina el cliente recibido con el cliente.json del kit (por si llega vacío). */
function contexto(cliente) {
  if (cliente && cliente.empresa) return cliente;
  return clienteBase;
}

// Conductas expresamente prohibidas, agrupadas por tipo.
const CONDUCTAS = [
  [
    'Acoso laboral',
    'Hostigamiento o trato humillante reiterado que afecta la dignidad, la salud o el desempeño del trabajador(ra).',
  ],
  [
    'Acoso sexual',
    'Conductas de connotación sexual no consentidas, con o sin amenaza de represalia o condicionamiento del empleo.',
  ],
  [
    'Discriminación',
    'Trato desigual por razón de sexo, edad, estado civil, orientación sexual, nacionalidad, religión, discapacidad, condición social o estado de salud.',
  ],
  [
    'Represalia',
    'Actos de venganza contra quien denuncia, testifica o participa en una investigación de acoso o discriminación.',
  ],
  [
    'Violencia laboral',
    'Agresión física, verbal o psicológica ocurrida en el entorno de trabajo o con ocasión de él.',
  ],
];

module.exports = {
  id: 'politica_acoso_no_discriminacion',
  dir: '08_POLITICAS_INTERNAS',
  filename: 'Politica_Prevencion_Acoso_y_No_Discriminacion',
  empresa: clienteBase.empresa,
  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const representante = c.representante || {};

    return [
      b.title('POLÍTICA DE PREVENCIÓN DEL ACOSO Y LA NO DISCRIMINACIÓN'),
      b.subtitle(`${empresa} · Ambientes de trabajo libres de violencia`),

      b.p(
        'La presente política tiene por objeto prevenir, detectar y sancionar toda forma de ' +
          'acoso laboral, acoso sexual, hostigamiento, violencia y discriminación en ' +
          empresa +
          ', y garantizar un ambiente de trabajo digno, respetuoso y seguro para todo el ' +
          'personal, con independencia del cargo, la modalidad o el tiempo de servicio.',
      ),
      b.legalRef('crbv_87_trabajo'),
      b.legalRef('crbv_89_irrenunciabilidad'),

      b.chapter('1. Alcance'),
      b.p(
        'Esta política aplica a las trabajadoras y los trabajadores, al personal en período ' +
          'de inducción, a los contratados y a cualquier persona que preste servicios o ' +
          'interactúe con el personal en el establecimiento. Comprende las conductas ' +
          'realizadas dentro del centro de trabajo y aquellas vinculadas con la relación ' +
          'laboral, incluidas las comunicaciones electrónicas.',
      ),

      b.chapter('2. Principios'),
      b.numbered('Respeto a la dignidad de la persona y a la igualdad de trato.'),
      b.numbered('Prohibición de toda forma de discriminación, acoso o violencia.'),
      b.numbered('Confidencialidad de la denuncia y protección de la persona afectada.'),
      b.numbered('Prohibición de represalias contra quien denuncia de buena fe.'),
      b.numbered(
        'Irrenunciabilidad de los derechos laborales: esta política no puede desmejorar los ' +
          'derechos que la ley reconoce al personal.',
      ),

      b.chapter('3. Conductas prohibidas'),
      b.p(
        'Quedan expresamente prohibidas, entre otras, las siguientes conductas, sin importar ' +
          'el nivel jerárquico de quien las cometa:',
      ),
      b.table(['Tipo de conducta', 'Descripción'], CONDUCTAS),

      b.chapter('4. Canal de denuncia'),
      b.p(
        'Toda persona que presencie o sufra una conducta de acoso, violencia o discriminación ' +
          'puede denunciarla por los canales internos previstos. La empresa habilitará más de ' +
          'un canal para que la denuncia pueda presentarse incluso cuando la conducta ' +
          'provenga de un superior inmediato.',
      ),
      b.field('Responsable de recibir la denuncia'),
      b.field('Correo o medio de contacto habilitado'),
      b.field('Teléfono o canal alternativo'),
      b.field('Fecha de la denuncia'),
      b.field('Relato de los hechos'),

      b.chapter('5. Procedimiento de actuación'),
      b.numbered('Recepción de la denuncia y registro reservado de la información.'),
      b.numbered(
        'Análisis preliminar para determinar la gravedad y las medidas de protección ' +
          'inmediatas.',
      ),
      b.numbered(
        'Apertura de la investigación con respeto al derecho a ser oído(a) de las partes.',
      ),
      b.numbered('Adopción de medidas para impedir la continuidad de la conducta.'),
      b.numbered('Determinación de responsabilidades y aplicación de las sanciones del caso.'),
      b.numbered('Seguimiento del caso y cierre con notificación a las partes.'),
      b.note(
        'El procedimiento se tramita con estricta confidencialidad. Cuando la conducta sea ' +
          'constitutiva de delito, la empresa orientará a la persona afectada y, de ser el ' +
          'caso, notificará a las autoridades competentes.',
      ),

      b.chapter('6. Medidas de protección'),
      b.bullet('Separación preventiva de las partes cuando resulte necesario.'),
      b.bullet('Acompañamiento y apoyo a la persona afectada durante la investigación.'),
      b.bullet('Reserva de la identidad de quien denuncia, en la medida de lo posible.'),
      b.bullet('Ajuste de turnos o tareas para evitar el contacto con la persona señalada.'),
      b.bullet('Prohibición expresa de represalias contra quien denuncia o testifica.'),

      b.chapter('7. Sanciones'),
      b.p(
        'El incumplimiento de esta política se considera una falta grave o muy grave, según ' +
          'el caso, y se sanciona conforme al reglamento interno, sin perjuicio de las ' +
          'responsabilidades legales que correspondan. Las conductas de acoso y ' +
          'discriminación se valoran entre las más graves del régimen disciplinario interno.',
      ),

      b.chapter('8. Compromiso'),
      b.p(
        `${empresa} se compromete a difundir esta política, a capacitar al personal y a ` +
          'revisar periódicamente las medidas adoptadas para erradicar el acoso y la ' +
          'discriminación en el trabajo.',
      ),
      b.field('Fecha de entrega al trabajador(ra)'),

      b.chapter('Acuse de recibo'),
      b.p(
        'Declaro haber recibido y comprendido la presente Política de Prevención del Acoso y ' +
          'la No Discriminación, y me comprometo a respetarla.',
      ),
      b.field('Nombre y Apellido'),
      b.field('Cédula de Identidad'),
      b.field('Cargo'),
      b.field('Fecha'),

      b.signatureBlock([
        { rol: 'EL/LA TRABAJADOR(A)', nombre: '', cargo: '', ci: '', fecha: '' },
        {
          rol: 'LA EMPRESA',
          nombre: representante.nombre || '',
          cargo: representante.cargo || '',
          ci: representante.ci || '',
          fecha: '',
        },
      ]),
      b.note(
        'Política interna de prevención del acoso y la no discriminación. Requiere revisión ' +
          'por abogado laboralista antes de su uso formal. Se entrega junto con el reglamento ' +
          'interno y el código de conducta.',
      ),
    ];
  },
};
