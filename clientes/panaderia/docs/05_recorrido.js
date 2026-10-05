'use strict';

// Hoja de Recorrido Habitual del trabajador (riesgo del trayecto, in itinere).
//
// Deja constancia del domicilio, el centro de trabajo, el medio de transporte y
// los riesgos del recorrido habitual, con las medidas preventivas aplicables.
// Cita la LOPCYMAT art. 69 num. 3 por clave: accidentes ocurridos en el
// trayecto habitual entre la residencia y el trabajo.

const b = require('../../../tools/blocks.js');
const clienteBase = require('../cliente.json');

/** Combina el cliente recibido con el cliente.json del kit (por si llega vacío). */
function contexto(cliente) {
  if (cliente && cliente.empresa) return cliente;
  return clienteBase;
}

// Riesgos habituales del trayecto en la zona; se completan con lo observado.
const RIESGOS_TRAYECTO = [
  ['Espera en parada o punto de abordaje', 'Robo o asalto', 'Esperar en zonas iluminadas y concurridas; no exhibir objetos de valor.'],
  ['Tramo en transporte público', 'Accidente de tránsito', 'Usar el cinturón; sujetarse; abordar unidades en buen estado.'],
  ['Vías con tránsito vehicular', 'Atropello o colisión', 'Cruzar por las esquinas y pasos peatonales; respetar las señales.'],
  ['Calles oscuras o solitarias', 'Agresión o robo', 'Preferir rutas iluminadas y transitadas; avisar la llegada.'],
  ['Conducción de motocicleta', 'Caída o lesión grave', 'Usar casco y protección; no conducir bajo lluvia fuerte.'],
  ['Lluvia y vías mojadas', 'Resbalón o accidente', 'Calzado antideslizante; salir con tiempo; extremar la precaución.'],
];

module.exports = {
  id: '05_recorrido',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Hoja_Recorrido_Habitual',
  empresa: clienteBase.empresa,
  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const representante = c.representante || {};

    return [
      b.title('HOJA DE RECORRIDO HABITUAL DEL TRABAJADOR'),
      b.subtitle(`${empresa} · Riesgo del trayecto (in itinere)`),

      b.p(
        'La presente hoja registra el recorrido habitual del trabajador(ra) entre su ' +
          'residencia y el centro de trabajo, con el fin de identificar los riesgos del ' +
          'trayecto y establecer las medidas preventivas correspondientes.',
      ),
      b.legalRef('lopcymat_69_3_itinere'),

      b.chapter('1. Datos del trabajador'),
      b.field('Nombre y Apellido'),
      b.field('Cédula de Identidad'),
      b.field('Cargo'),
      b.field('Área / Puesto de trabajo'),
      b.field('Fecha de registro'),

      b.chapter('2. Datos del recorrido habitual'),
      b.p(
        'Complete los datos del trayecto que el trabajador(ra) realiza habitualmente para ' +
          'llegar al centro de trabajo y regresar a su residencia.',
      ),
      b.h3('2.1 Puntos de origen y destino'),
      b.field('Domicilio habitual (punto de partida)'),
      b.field('Centro de trabajo (punto de llegada)'),
      b.field('Ruta o vía habitual'),
      b.field('Puntos de referencia del recorrido'),
      b.h3('2.2 Medio de transporte y tiempos'),
      b.field('Medio de transporte habitual'),
      b.field('Tiempo estimado de recorrido (ida)'),
      b.field('Tiempo estimado de recorrido (vuelta)'),
      b.field('Horario habitual de entrada'),
      b.field('Horario habitual de salida'),

      b.chapter('3. Riesgos identificados en el recorrido'),
      b.p(
        'Escala de referencia para valorar cada riesgo del trayecto; el nivel se completa ' +
          'según la probabilidad y la consecuencia observadas.',
      ),
      b.table(
        ['Tramo o punto del recorrido', 'Riesgo identificado', 'Medidas preventivas'],
        RIESGOS_TRAYECTO,
      ),

      b.chapter('4. Medidas generales de prevención'),
      b.bullet('Planificar el recorrido con tiempo suficiente para evitar apuros y carreras.'),
      b.bullet('Preferir rutas iluminadas, transitadas y de menor riesgo.'),
      b.bullet('Informar a un familiar o compañero el recorrido y el horario estimado.'),
      b.bullet('Mantener comunicación disponible para reportar cualquier eventualidad.'),
      b.bullet('Evitar el uso del teléfono o audífonos que dificulten percibir el entorno.'),

      b.chapter('5. Constancia y firma'),
      b.p(
        'Declaro que los datos del presente recorrido son ciertos y que he sido informado(a) ' +
          'de los riesgos del trayecto y de las medidas preventivas recomendadas.',
      ),
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
        'Documento de control del riesgo in itinere. Requiere revisión por abogado ' +
          'laboralista antes de su uso formal. Se firma por duplicado.',
      ),
    ];
  },
};
