'use strict';

// Construcción declarativa del Contrato Individual de Trabajo (Ticket #4).
//
// `buildContrato(cliente, cargo)` devuelve la lista de bloques de tools/blocks.js
// para un cargo concreto. Las citas legales se referencian SIEMPRE por clave
// contra legal/ve.js: aquí no se escriben nombres de leyes ni artículos a mano.

const b = require('./blocks.js');

// --- Funciones específicas por cargo (área gastronómica) --------------------

const FUNCIONES = {
  ayudante_cocina: [
    'Recibir, clasificar y almacenar los alimentos e insumos conforme a la rotación y a la cadena de frío.',
    'Lavar, pelar, cortar y pre-elaborar los ingredientes que le indique el personal de cocina.',
    'Apoyar la preparación de platos y el emplatado en los momentos de mayor demanda del servicio.',
    'Mantener limpios y ordenados los puestos de trabajo, utensilios y equipos de la cocina.',
    'Cumplir las normas de higiene, manipulación de alimentos y bioseguridad aplicables al área.',
    'Informar oportunamente al supervisor o al administrador sobre faltantes, daños o anomalías.',
    'Realizar cualquier otra tarea afín al área de cocina que le encomienden sus superiores.',
  ],
  stewart: [
    'Lavar, desinfectar y secar la vajilla, cubiertos, vasos, utensilios y equipos de cocina.',
    'Operar el lavavajillas y los productos de limpieza conforme a las instrucciones del fabricante.',
    'Clasificar y resguardar la loza y los utensilios en los lugares asignados.',
    'Mantener el orden, la limpieza y la desinfección del área de lavado y sus alrededores.',
    'Apoyar la limpieza general de la cocina y el retiro de desechos conforme a los protocolos.',
    'Reportar al supervisor o al administrador cualquier faltante, daño o situación irregular.',
    'Realizar cualquier otra tarea afín al área de cocina que le encomienden sus superiores.',
  ],
  mesonero: [
    'Recibir y ubicar a los clientes, entregar el menú y tomar las órdenes de consumo.',
    'Registrar y transmitir las órdenes a cocina y barra, verificando su correcta preparación.',
    'Servir alimentos y bebidas, atender solicitudes adicionales y verificar la satisfacción del cliente.',
    'Montar, desmontar y mantener limpias y ordenadas las mesas y el salón.',
    'Coordinar con cocina, barra y caja los tiempos y el flujo del servicio.',
    'Reportar al supervisor o al administrador las quejas, incidentes o faltantes del servicio.',
    'Realizar cualquier otra tarea afín al área de salón que le encomienden sus superiores.',
  ],
  cajero: [
    'Facturar y cobrar los consumos de los clientes conforme a los precios vigentes.',
    'Recibir y procesar los medios de pago autorizados y entregar los comprobantes correspondientes.',
    'Manejar la caja registradora, el fondo fijo y los documentos de cobro del turno asignado.',
    'Efectuar el arqueo y el cuadre de caja al cierre de cada turno y reportar las diferencias.',
    'Atender al público con cortesía, resolver consultas de facturación y canalizar los reclamos.',
    'Reportar al supervisor o al administrador cualquier faltante, irregularidad o intento de fraude.',
    'Realizar cualquier otra tarea afín al área de caja que le encomienden sus superiores.',
  ],
  bartender: [
    'Preparar bebidas, cócteles, jugos y demás productos de barra conforme a las recetas de la empresa.',
    'Atender las órdenes de barra con calidad, rapidez y presentación uniforme.',
    'Controlar el inventario, las existencias y el uso racional de licores, insumos y utensilios de barra.',
    'Mantener el área de barra limpia, ordenada, desinfectada y con sus equipos en buen estado.',
    'Verificar el estado de los productos y rechazar los vencidos, dañados o en mal estado.',
    'Reportar al supervisor o al administrador faltantes, daños, pérdidas o consumos irregulares.',
    'Realizar cualquier otra tarea afín al área de barra que le encomienden sus superiores.',
  ],
  parrillero: [
    'Preparar y cocinar carnes, aves, embutidos y vegetales a la parrilla según el punto solicitado.',
    'Controlar la temperatura, el tiempo de cocción y las condiciones higiénicas de la parrilla y los hornos.',
    'Recibir, clasificar y conservar las proteínas conforme a la cadena de frío y la rotación de inventario.',
    'Despachar los platos de parrilla con la presentación y las porciones establecidas por la empresa.',
    'Mantener limpias, desinfectadas y en buen estado las áreas, utensilios y equipos de la parrilla.',
    'Reportar al supervisor o al administrador faltantes, daños o productos en mal estado.',
    'Realizar cualquier otra tarea afín al área de parrilla que le encomienden sus superiores.',
  ],
  supervisor_salon: [
    'Supervisar y coordinar la labor del personal de salón, mesoneros y áreas conexas.',
    'Organizar los turnos, las asignaciones y el montaje del salón conforme a la demanda prevista.',
    'Atender y resolver las quejas o reclamos de los clientes velando por su satisfacción.',
    'Verificar el cumplimiento de las normas de higiene, presentación y servicio del personal.',
    'Coordinar con cocina, barra y caja el flujo y los tiempos del servicio.',
    'Rendir informes periódicos al administrador sobre el servicio, el personal y los incidentes.',
    'Realizar cualquier otra tarea afín a la supervisión del salón que le encomienden sus superiores.',
  ],
  administrador: [
    'Coordinar y supervisar la operación diaria del establecimiento en todas sus áreas.',
    'Planificar y controlar los inventarios, compras, proveedores y costos operativos.',
    'Supervisar y evaluar al personal, los turnos, la asistencia y el cumplimiento de funciones.',
    'Administrar la caja, los ingresos y los egresos, y elaborar los informes financieros periódicos.',
    'Velar por el cumplimiento de la normativa laboral, sanitaria, tributaria y de seguridad aplicable.',
    'Atender a clientes, proveedores y entes públicos, y resolver las incidencias que se presenten.',
    'Rendir cuentas ante la representación legal de la empresa y ejecutar sus instrucciones.',
    'Realizar cualquier otra tarea afín a la administración que le encomienden sus superiores.',
  ],
};

// Respaldo por área, por si un cargo no tuviera lista propia.
const FUNCIONES_POR_AREA = {
  cocina: FUNCIONES.ayudante_cocina,
  salon: FUNCIONES.mesonero,
  caja: FUNCIONES.cajero,
  barra: FUNCIONES.bartender,
  parrilla: FUNCIONES.parrillero,
  administracion: FUNCIONES.administrador,
};

function funcionesDeCargo(cargo) {
  return FUNCIONES[cargo.id] || FUNCIONES_POR_AREA[cargo.area] || FUNCIONES.administrador;
}

// --- Remuneración -----------------------------------------------------------

/** Tabla con el esquema de remuneración del cliente más la fila de totales. */
function tablaRemuneracion(remuneracion) {
  const esquema = (remuneracion && remuneracion.esquema) || [];
  const rows = esquema.map((it) => [
    it.concepto,
    `USD ${Number(it.usd).toFixed(2)}`,
    it.caracter,
    `USD ${Number(it.quincenal).toFixed(2)}`,
  ]);
  const totalMensual = esquema.reduce((s, it) => s + Number(it.usd), 0);
  const totalQuincenal = esquema.reduce((s, it) => s + Number(it.quincenal), 0);
  rows.push(['TOTAL', `USD ${totalMensual.toFixed(2)}`, '—', `USD ${totalQuincenal.toFixed(2)}`]);

  return b.table(
    ['Concepto', 'Monto USD (mensual)', 'Carácter', 'Monto USD (quincenal)'],
    rows,
  );
}

// --- Contrato ---------------------------------------------------------------

/**
 * Construye la lista de bloques del Contrato Individual de Trabajo.
 * @param {object} cliente  Datos del cliente (clientes/<slug>/cliente.json).
 * @param {object} cargo    Uno de los cargos declarados en cliente.cargos.
 * @returns {Array} Bloques para tools/blocks.js.
 */
function buildContrato(cliente, cargo) {
  if (!cliente || !cliente.empresa) {
    throw new Error('buildContrato requiere el objeto cliente con "empresa".');
  }
  if (!cargo || !cargo.nombre) {
    throw new Error('buildContrato requiere un cargo válido (con "nombre").');
  }

  const r = cliente.representante || {};
  const rem = cliente.remuneracion || {};
  const jornada = cliente.jornada || {};

  // Cargos con manejo de caja, fondo fijo o cobros.
  const usaCaja =
    ['cajero', 'mesonero', 'bartender', 'administrador'].includes(cargo.id) ||
    ['caja', 'barra', 'salon', 'administracion'].includes(cargo.area);

  return [
    b.title('CONTRATO INDIVIDUAL DE TRABAJO'),
    b.subtitle(`${cliente.empresa} — RIF ${cliente.rif}`),
    b.p(
      'Entre LA EMPRESA y EL(LA) TRABAJADOR(A) se suscribe el presente Contrato Individual ' +
        'de Trabajo, regido por la legislación laboral venezolana vigente, conforme a las ' +
        'cláusulas siguientes:',
    ),

    // 1) Partes
    b.chapter('PRIMERA. DE LAS PARTES'),
    b.p(
      `LA EMPRESA: ${cliente.empresa}, RIF ${cliente.rif}, domiciliada en ${cliente.domicilio}, ` +
        `representada en este acto por ${r.nombre || '[COMPLETAR]'}, titular de la Cédula de ` +
        `Identidad N° ${r.ci || '[COMPLETAR]'}, en su condición de ${r.cargo || '[COMPLETAR]'}.`,
    ),
    b.p('EL(LA) TRABAJADOR(A):'),
    b.field('Nombre y Apellido'),
    b.field('Cédula de Identidad'),
    b.field('Nacionalidad'),
    b.field('Fecha de nacimiento'),
    b.field('Estado civil'),
    b.field('Domicilio'),
    b.field('Teléfono'),
    b.field('Correo electrónico'),

    // 2) Objeto y cargo
    b.chapter('SEGUNDA. OBJETO Y CARGO'),
    b.p(
      `EL(LA) TRABAJADOR(A) se obliga a prestar sus servicios personales, subordinados y ` +
        `remunerados a LA EMPRESA en el cargo de ${cargo.nombre}, adscrito al área de ` +
        `${cargo.area}, desempeñando las funciones descritas en la cláusula TERCERA y ` +
        'cualquier otra actividad conexa que le encomienden sus superiores.',
    ),

    // 3) Funciones del cargo
    b.chapter('TERCERA. FUNCIONES DEL CARGO'),
    b.p('Son funciones propias del cargo, sin carácter taxativo, las siguientes:'),
    ...funcionesDeCargo(cargo).map((f) => b.numbered(f)),

    // 4) Duración indeterminada
    b.chapter('CUARTA. DURACIÓN'),
    b.p(
      'La relación laboral se pacta por tiempo indeterminado y se mantendrá vigente mientras ' +
        'subsistan las causas que le dieron origen, sin perjuicio de las causales legales de ' +
        'terminación.',
    ),
    b.legalRef('lottt_60_modalidades'),

    // 5) Jornada
    b.chapter('QUINTA. JORNADA DE TRABAJO'),
    b.p(
      `La jornada será ${jornada.tipo || 'diurna'}, de ${jornada.horas_diarias || 8} horas ` +
        `diarias y ${jornada.horas_semanales || 40} horas semanales, distribuida conforme al ` +
        'horario que LA EMPRESA establezca por área.',
    ),
    b.legalRef('lottt_173_jornada'),
    b.legalRef('crbv_90_jornada'),

    // 6) Descansos y feriados
    b.chapter('SEXTA. DESCANSOS Y FERIADOS'),
    b.p(
      'EL(LA) TRABAJADOR(A) disfrutará del descanso semanal y de los días feriados previstos ' +
        'en la ley, así como de los descansos compensatorios que correspondan.',
    ),
    b.legalRef('lottt_184_feriados'),
    b.legalRef('lottt_188_descanso'),

    // 7) Horas extraordinarias
    b.chapter('SÉPTIMA. HORAS EXTRAORDINARIAS'),
    b.p(
      'Las horas extraordinarias se laborarán solo cuando LA EMPRESA las autorice y se pagarán ' +
        'con un recargo mínimo del cincuenta por ciento (50%) sobre el salario ordinario.',
    ),
    b.legalRef('lottt_178_horas_extra'),
    b.legalRef('lottt_118_horas_extra'),

    // 8) Remuneración
    b.chapter('OCTAVA. REMUNERACIÓN'),
    b.p(
      'EL(LA) TRABAJADOR(A) percibirá la remuneración que a continuación se detalla, según el ' +
        'esquema pactado entre las partes:',
    ),
    tablaRemuneracion(rem),
    b.note(
      `La base de cálculo para las prestaciones sociales y demás conceptos salariales será de ` +
        `USD ${Number(rem.base_prestaciones_usd || 0).toFixed(2)} mensuales, conforme al ` +
        'esquema de remuneración pactado.',
    ),
    b.legalRef('lottt_104_salario'),
    b.legalRef('crbv_91_salario'),

    // 9) Beneficio de alimentación
    b.chapter('NOVENA. BENEFICIO DE ALIMENTACIÓN'),
    b.p(
      'LA EMPRESA otorgará a EL(LA) TRABAJADOR(A) el beneficio de alimentación (cestaticket) ' +
        'en la modalidad y por el monto previsto en el esquema de remuneración, conforme a la ' +
        'ley que rige la materia.',
    ),
    b.legalRef('lat_2004_alimentacion'),

    // 10) Prestaciones sociales
    b.chapter('DÉCIMA. PRESTACIONES SOCIALES'),
    b.p(
      'LA EMPRESA garantizará y depositará las prestaciones sociales de EL(LA) TRABAJADOR(A) ' +
        'conforme a la ley, en fideicomiso, cuenta individual o en la contabilidad de la ' +
        'empresa, reconociendo los intereses que correspondan.',
    ),
    b.legalRef('lottt_142_garantia'),
    b.legalRef('lottt_143_deposito'),
    b.legalRef('crbv_92_prestaciones'),
    b.legalRef('lottt_145_herederos'),
    b.legalRef('loss_2002'),
    b.legalRef('bvv_2005_faov'),

    // 11) Vacaciones y bono vacacional
    b.chapter('DÉCIMA PRIMERA. VACACIONES Y BONO VACACIONAL'),
    b.p(
      'EL(LA) TRABAJADOR(A) tendrá derecho a las vacaciones y al bono vacacional en la ' +
        'oportunidad y por el número de días que establece la ley, con carácter salarial.',
    ),
    b.legalRef('lottt_190_vacaciones'),
    b.legalRef('lottt_192_bono_vacacional'),

    // 12) Utilidades
    b.chapter('DÉCIMA SEGUNDA. UTILIDADES'),
    b.p(
      'LA EMPRESA pagará a EL(LA) TRABAJADOR(A) su participación en las utilidades conforme a ' +
        'la ley, dentro de los plazos legales.',
    ),
    b.legalRef('lottt_131_utilidades'),

    // 13) Seguridad y salud laboral
    b.chapter('DÉCIMA TERCERA. SEGURIDAD Y SALUD LABORAL'),
    b.p(
      'LA EMPRESA informará a EL(LA) TRABAJADOR(A) sobre los riesgos de su puesto de trabajo ' +
        'y las medidas de prevención, y le entregará los equipos de protección personal ' +
        'necesarios. EL(LA) TRABAJADOR(A) se obliga a participar en los programas de ' +
        'seguridad y salud y a someterse a los exámenes médicos que correspondan.',
    ),
    b.legalRef('lopcymat_56_notif_riesgos'),
    b.legalRef('lopcymat_53_4_epp'),
    b.legalRef('lopcymat_53_10_examen'),

    // 14) Obligaciones del trabajador
    b.chapter('DÉCIMA CUARTA. OBLIGACIONES DEL(DE LA) TRABAJADOR(A)'),
    b.numbered('Cumplir las leyes, los reglamentos y las políticas internas de LA EMPRESA.'),
    b.numbered('Prestar el servicio con diligencia, eficiencia y buena fe.'),
    b.numbered('Observar las normas de higiene, seguridad y salud laboral.'),
    b.numbered('Cuidar los bienes, equipos, insumos y herramientas confiados a su cargo.'),
    b.numbered('Portar el uniforme y mantener una presentación adecuada.'),
    b.numbered('Registrar su asistencia y cumplir los horarios asignados.'),
    b.numbered('Informar oportunamente sus ausencias y toda condición que afecte el servicio.'),
    b.numbered('Mantener un trato respetuoso y cordial con compañeros y clientes.'),
    b.numbered('Abstenerse de laborar bajo los efectos del alcohol o de sustancias prohibidas.'),
    b.numbered('Someterse a los exámenes médicos y de aptitud que LA EMPRESA requiera.'),

    // 15) Prohibiciones
    b.chapter('DÉCIMA QUINTA. PROHIBICIONES'),
    b.numbered('Sustraer, retener o disponer de bienes, dinero o insumos de LA EMPRESA.'),
    b.numbered('Consumir o distribuir alimentos o bebidas no autorizados.'),
    b.numbered('Presentarse al trabajo bajo los efectos del alcohol o de drogas.'),
    b.numbered('Divulgar la información confidencial de LA EMPRESA o de sus clientes.'),
    b.numbered('Realizar actos de acoso, discriminación o violencia contra cualquier persona.'),
    b.numbered('Portar armas o sustancias no autorizadas en el lugar de trabajo.'),
    b.numbered('Manipular la caja, la facturación o los inventarios en beneficio propio o de terceros.'),
    b.numbered('Permitir el acceso de personas no autorizadas a áreas restringidas.'),
    b.numbered('Dañar de forma intencional los bienes de LA EMPRESA o de terceros.'),
    b.numbered('Realizar actividades ajenas al cargo durante la jornada de trabajo.'),

    // 16) Confidencialidad
    b.chapter('DÉCIMA SEXTA. CONFIDENCIALIDAD'),
    b.p(
      'EL(LA) TRABAJADOR(A) se obliga a mantener en reserva las recetas, precios, proveedores, ' +
        'información financiera y demás datos confidenciales de LA EMPRESA, así como los datos ' +
        'personales de clientes y trabajadores. Esta obligación subsiste después de la ' +
        'terminación de la relación laboral.',
    ),
    b.legalRef('crbv_28_habeas_data'),

    // 17) Uso de bienes, equipos y caja
    b.chapter('DÉCIMA SÉPTIMA. USO DE BIENES, EQUIPOS Y CAJA'),
    b.p(
      'EL(LA) TRABAJADOR(A) usará los bienes, equipos e instalaciones de LA EMPRESA ' +
        'exclusivamente para el desempeño de sus funciones, y responderá por su uso y ' +
        'conservación.',
    ),
    ...(usaCaja
      ? [
          b.p(
            'En caso de manejar caja, fondo fijo o cobros, EL(LA) TRABAJADOR(A) deberá ' +
              'efectuar el arqueo y el cuadre del turno, registrar los movimientos y reportar ' +
              'de inmediato cualquier diferencia o irregularidad.',
          ),
        ]
      : []),
    b.legalRef('delitos_informaticos_2001'),

    // 18) Causas de terminación
    b.chapter('DÉCIMA OCTAVA. CAUSAS DE TERMINACIÓN'),
    b.p(
      'La relación laboral podrá terminar por las causales justificadas previstas en la ley, ' +
        'por retiro voluntario con el preaviso correspondiente, o por cualquier otra causa ' +
        'legalmente establecida.',
    ),
    b.legalRef('lottt_79_despido'),
    b.legalRef('lottt_81_preaviso'),

    // 19) Irrenunciabilidad de derechos
    b.chapter('DÉCIMA NOVENA. IRRENUNCIABILIDAD DE DERECHOS'),
    b.p(
      'Ninguna de las disposiciones de este contrato podrá interpretarse en perjuicio de los ' +
        'derechos mínimos e irrenunciables que el ordenamiento jurídico reconoce a ' +
        'EL(LA) TRABAJADOR(A).',
    ),
    b.legalRef('crbv_89_irrenunciabilidad'),
    b.legalRef('crbv_87_trabajo'),

    // 20) Aceptación y firmas
    b.chapter('VIGÉSIMA. ACEPTACIÓN Y FIRMAS'),
    b.p(
      'Las partes declaran haber leído y comprendido el contenido íntegro de este contrato y ' +
        'lo firman por duplicado, quedando un ejemplar en poder de cada una.',
    ),
    b.signatureBlock([
      { rol: 'EL(LA) TRABAJADOR(A)' },
      {
        rol: 'LA EMPRESA',
        nombre: r.nombre,
        cargo: r.cargo,
        ci: r.ci,
      },
    ]),
  ];
}

module.exports = { buildContrato, funcionesDeCargo, tablaRemuneracion };
