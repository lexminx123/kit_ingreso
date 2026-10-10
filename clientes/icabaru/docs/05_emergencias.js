'use strict';

// Protocolo de Emergencias y Evacuación — restaurante / parrilla.
//
// Define los roles, las rutas de evacuación y los procedimientos de respuesta
// ante incendio, fuga de gas, primeros auxilios y otras emergencias. Cita por
// clave la notificación de riesgos y la notificación de accidentes de trabajo.

const b = require('../../../tools/blocks.js');
const clienteBase = require('../cliente.json');

/** Combina el cliente recibido con el cliente.json del kit (por si llega vacío). */
function contexto(cliente) {
  if (cliente && cliente.empresa) return cliente;
  return clienteBase;
}

// Roles de la brigada de emergencia y su responsabilidad principal.
const ROLES = [
  ['Coordinador(a) de emergencias', 'Activa el protocolo, da la orden de evacuación y coordina la respuesta.'],
  ['Responsable de aviso', 'Llama a los servicios de emergencia e informa la ubicación y el tipo de evento.'],
  ['Brigada de evacuación', 'Guía al personal y a los clientes hacia las salidas y el punto de encuentro.'],
  ['Responsable de primeros auxilios', 'Presta la atención inicial y organiza el traslado de los lesionados.'],
  ['Custodio de instalaciones', 'Corta el gas y la electricidad y colabora con los bomberos al llegar.'],
];

// Procedimientos por tipo de emergencia.
const PROCEDIMIENTOS = [
  [
    'Incendio',
    'Cortar el gas y la energía; usar el extintor solo si el fuego es incipiente; evacuar por las rutas señalizadas; no usar ascensores.',
  ],
  [
    'Fuga de gas',
    'Cerrar la válvula del cilindro o de la tubería; no encender llamas ni accionar interruptores; ventilar; evacuar y avisar.',
  ],
  [
    'Lesión o quemadura',
    'No mover al lesionado salvo peligro inminente; aplicar primeros auxilios; llamar a la emergencia médica y notificar el accidente.',
  ],
  [
    'Sismo',
    'Ubicarse en zonas seguras lejos de vidrios y objetos que puedan caer; evacuar hacia el punto de encuentro al ceder el movimiento.',
  ],
  [
    'Robo o violencia',
    'No oponer resistencia; mantener la calma; avisar de inmediato a las autoridades y al supervisor.',
  ],
];

module.exports = {
  id: 'protocolo_emergencias_evacuacion',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Protocolo_Emergencias_y_Evacuacion',
  empresa: clienteBase.empresa,
  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const rif = c.rif || '[COMPLETAR: RIF]';
    const representante = c.representante || {};

    return [
      b.title('PROTOCOLO DE EMERGENCIAS Y EVACUACIÓN'),
      b.subtitle(`${empresa} — RIF ${rif} · Restaurante / parrilla`),

      b.p(
        'El presente protocolo establece las medidas de actuación del personal de ' +
          empresa +
          ' ante emergencias, con el objeto de proteger la vida, la salud y la integridad de ' +
          'las trabajadoras, los trabajadores, los clientes y los visitantes. Se aplica a ' +
          'todas las áreas y turnos del establecimiento.',
      ),
      b.legalRef('lopcymat_56_notif_riesgos'),
      b.legalRef('lopcymat_73_accidente'),

      b.chapter('1. Objeto y alcance'),
      b.p(
        'Definir los roles, las rutas de evacuación y los procedimientos de respuesta ante ' +
          'incendio, fuga de gas, primeros auxilios, sismo, robo o violencia, y las demás ' +
          'situaciones que puedan poner en riesgo a las personas o a las instalaciones.',
      ),

      b.chapter('2. Roles y responsabilidades'),
      b.p(
        'La empresa conforma una brigada de emergencia con personal debidamente instruido, ' +
          'sin perjuicio de la participación de todo el personal.',
      ),
      b.table(['Rol', 'Responsabilidad principal'], ROLES),
      b.field('Coordinador(a) de emergencias'),
      b.field('Brigadistas designados'),
      b.field('Fecha de designación'),

      b.chapter('3. Tipos de emergencia y procedimientos'),
      b.p(
        'Ante cualquiera de los eventos siguientes, el personal actúa conforme al ' +
          'procedimiento descrito, priorizando la evacuación segura y el aviso a los ' +
          'servicios de emergencia.',
      ),
      b.table(['Tipo de emergencia', 'Procedimiento de respuesta'], PROCEDIMIENTOS),

      b.chapter('4. Rutas de evacuación y punto de encuentro'),
      b.p(
        'Las salidas y las rutas de evacuación deben permanecer señalizadas, iluminadas y ' +
          'libres de obstáculos. Todo el personal debe conocer la salida más próxima a su ' +
          'puesto de trabajo y el punto de encuentro exterior.',
      ),
      b.field('Salida principal'),
      b.field('Salidas alternas'),
      b.field('Ruta de evacuación desde cocina y parrilla'),
      b.field('Ruta de evacuación desde salón y caja'),
      b.field('Punto de encuentro exterior'),
      b.field('Responsable del conteo de personal'),

      b.chapter('5. Primeros auxilios'),
      b.numbered('Evaluar la escena y garantizar la seguridad antes de actuar.'),
      b.numbered('Verificar el estado de conciencia y la respiración de la persona afectada.'),
      b.numbered('Llamar o hacer llamar a la emergencia médica e informar el estado del lesionado.'),
      b.numbered('Aplicar únicamente los primeros auxilios para los que se tenga capacitación.'),
      b.numbered('No administrar medicamentos ni alimentos a la persona lesionada.'),
      b.field('Botiquín: ubicación'),
      b.field('Responsable: revisión del botiquín'),

      b.chapter('6. Notificación de accidentes'),
      b.p(
        'Todo accidente de trabajo se notifica de inmediato al supervisor y al servicio de ' +
          'seguridad y salud laboral, y se declara ante el organismo competente conforme a la ' +
          'ley, dentro del lapso previsto. La empresa investiga el hecho y adopta las medidas ' +
          'correctivas para evitar su repetición.',
      ),
      b.field('Fecha y hora del evento'),
      b.field('Descripción del hecho'),
      b.field('Personas lesionadas'),
      b.field('Medidas adoptadas'),

      b.chapter('7. Simulacros y capacitación'),
      b.numbered('Realizar simulacros de evacuación al menos una vez al año.'),
      b.numbered('Capacitar al personal en el uso de extintores y primeros auxilios.'),
      b.numbered('Revisar periódicamente las rutas, la señalización y los equipos de emergencia.'),
      b.field('Fecha del último simulacro'),
      b.field('Observaciones'),

      b.chapter('8. Aprobación y firma'),
      b.p(
        'El presente protocolo se aprueba para su aplicación en el establecimiento a partir ' +
          'de la fecha señalada.',
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
        { rol: 'TRABAJADOR(A) / BRIGADISTA', nombre: '', cargo: '', ci: '', fecha: '' },
      ]),
      b.note(
        'Protocolo de emergencias y evacuación. Requiere revisión por abogado laboralista y ' +
          'por un profesional de seguridad y salud antes de su uso formal.',
      ),
    ];
  },
};
