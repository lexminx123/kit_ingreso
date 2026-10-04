'use strict';

// Base reutilizable de las Notificaciones de Riesgos laborales (LOPCYMAT)
// por área/rol para una actividad gastronómica.
//
// Solo produce bloques declarativos (tools/blocks.js); el render DOCX/PDF vive
// aparte. Las citas legales van SIEMPRE por clave contra legal/ve.js.

const b = require('./blocks.js');

// --- Escala de la matriz probabilidad × consecuencia ------------------------

// Probabilidad y consecuencia se puntúan de 1 (baja) a 3 (alta).
// Nivel = probabilidad × consecuencia (1–9).
function nivelRiesgo(probabilidad, consecuencia) {
  const valor = Number(probabilidad) * Number(consecuencia);
  let etiqueta = 'Alto';
  if (valor <= 2) etiqueta = 'Bajo';
  else if (valor <= 4) etiqueta = 'Medio';
  return { valor, etiqueta };
}

// --- Riesgos reales por área ------------------------------------------------

const RIESGOS_POR_AREA = {
  cocina: [
    {
      riesgo: 'Cortes con cuchillos y utensilios de corte',
      p: 3,
      c: 2,
      medidas:
        'Usar guantes anticorte, cuchillos afilados y técnica correcta de corte; guardar los filos en soporte.',
    },
    {
      riesgo: 'Quemaduras por aceite caliente, freidora y plancha',
      p: 3,
      c: 3,
      medidas:
        'No sobrecargar la freidora; escurrir antes de freír; usar pinzas y guantes térmicos; alejar el rostro.',
    },
    {
      riesgo: 'Contacto o fuga de gas',
      p: 1,
      c: 3,
      medidas:
        'Verificar mangueras, conexiones y llaves; ventilar; no encender llama ante olor a gas; extintor a la mano.',
    },
    {
      riesgo: 'Pisos húmedos y resbalones',
      p: 3,
      c: 2,
      medidas:
        'Limpiar derrames de inmediato; usar calzado antideslizante; colocar letreros de piso húmedo.',
    },
    {
      riesgo: 'Manipulación manual de cargas (ollas, bombonas, cajas)',
      p: 3,
      c: 2,
      medidas:
        'Técnica de levantamiento con piernas; ayudas mecánicas; solicitar apoyo en cargas pesadas.',
    },
    {
      riesgo: 'Contacto con químicos de limpieza',
      p: 2,
      c: 2,
      medidas:
        'Diluir según indicación; usar guantes; nunca mezclar cloro con amoníaco; mantener ventilación.',
    },
    {
      riesgo: 'Ruido de equipos (campana, licuadora, extractores)',
      p: 2,
      c: 1,
      medidas: 'Mantener equipos; usar protección auditiva en tareas prolongadas.',
    },
    {
      riesgo: 'Estrés y fatiga por turnos y alta carga de trabajo',
      p: 3,
      c: 2,
      medidas: 'Planificar turnos; rotar tareas; respetar pausas y descansos.',
    },
  ],
  lavaplatos: [
    {
      riesgo: 'Cortes con vajilla y vidrio roto',
      p: 3,
      c: 2,
      medidas: 'Usar guantes; manipular vidrio con cuidado; recoger fragmentos con utensilios.',
    },
    {
      riesgo: 'Quemaduras por agua caliente y vapor',
      p: 3,
      c: 2,
      medidas: 'Regular la temperatura del agua; usar guantes resistentes al calor; abrir con cuidado.',
    },
    {
      riesgo: 'Contacto con químicos de limpieza y detergentes',
      p: 3,
      c: 2,
      medidas: 'Usar guantes de caucho; diluir correctamente; evitar salpicaduras y ventilación.',
    },
    {
      riesgo: 'Pisos húmedos y resbalones',
      p: 3,
      c: 2,
      medidas: 'Mantener el piso seco; calzado antideslizante; letreros de piso húmedo.',
    },
    {
      riesgo: 'Manipulación manual de cargas (bandejas, ollas)',
      p: 3,
      c: 2,
      medidas: 'Levantar con las piernas; no cargar en exceso; usar carros de transporte.',
    },
    {
      riesgo: 'Ruido de equipos y lavaderos',
      p: 2,
      c: 1,
      medidas: 'Mantener equipos; protección auditiva en turnos prolongados.',
    },
    {
      riesgo: 'Estrés por ritmo de trabajo',
      p: 2,
      c: 2,
      medidas: 'Ordenar el flujo de trabajo; respetar pausas.',
    },
  ],
  mesonero: [
    {
      riesgo: 'Pisos húmedos y resbalones en el salón',
      p: 3,
      c: 2,
      medidas: 'Limpiar derrames; calzado antideslizante; señalizar zonas mojadas.',
    },
    {
      riesgo: 'Manipulación de bandejas y cargas',
      p: 3,
      c: 2,
      medidas: 'Distribuir el peso; no sobrecargar la bandeja; técnica de levantamiento.',
    },
    {
      riesgo: 'Cortes con vajilla y vidrio',
      p: 2,
      c: 2,
      medidas: 'Usar guantes de manejo; recoger vidrio con utensilios.',
    },
    {
      riesgo: 'Estrés por trato con público y turnos',
      p: 3,
      c: 2,
      medidas: 'Pausas; rotación de mesas; manejo de clientes difíciles.',
    },
    {
      riesgo: 'Agresión verbal o física de clientes',
      p: 2,
      c: 2,
      medidas: 'Protocolo de atención; pedir apoyo del supervisor; no confrontar solo.',
    },
    {
      riesgo: 'Posturas forzadas y largos períodos de pie',
      p: 3,
      c: 1,
      medidas: 'Calzado adecuado; alternar tareas; pausas activas.',
    },
  ],
  cajero: [
    {
      riesgo: 'Violencia, robo o asalto en caja',
      p: 2,
      c: 3,
      medidas:
        'Manejo discreto del efectivo; cajón con cierre; protocolo de seguridad y cámaras; no oponer resistencia.',
    },
    {
      riesgo: 'Estrés por manejo de dinero y público',
      p: 3,
      c: 2,
      medidas: 'Cuadres frecuentes; pausas; apoyo ante incidencias.',
    },
    {
      riesgo: 'Posturas prolongadas y ergonomía de caja',
      p: 2,
      c: 1,
      medidas: 'Ajustar altura del puesto; pausas activas; apoyo lumbar.',
    },
    {
      riesgo: 'Fatiga visual por pantallas',
      p: 2,
      c: 1,
      medidas: 'Iluminación adecuada; pausas visuales; distancia y brillo del monitor.',
    },
    {
      riesgo: 'Resbalones y caídas en el puesto',
      p: 1,
      c: 2,
      medidas: 'Mantener el piso seco; calzado antideslizante.',
    },
  ],
  bartender: [
    {
      riesgo: 'Cortes con cuchillos, hielo y cristalería',
      p: 3,
      c: 2,
      medidas: 'Usar guantes anticorte; técnica de corte; manejar vidrio con cuidado.',
    },
    {
      riesgo: 'Contacto con licores inflamables y gas',
      p: 2,
      c: 3,
      medidas: 'Alejar fuentes de ignición; ventilar; extintor a la mano; no fumar en el área.',
    },
    {
      riesgo: 'Pisos húmedos por líquidos derramados',
      p: 3,
      c: 2,
      medidas: 'Limpiar de inmediato; calzado antideslizante; letreros de piso húmedo.',
    },
    {
      riesgo: 'Ruido y música a alto volumen',
      p: 3,
      c: 1,
      medidas: 'Regular el volumen; pausas auditivas; protección auditiva.',
    },
    {
      riesgo: 'Manipulación de cargas (cajas, botellas, hieleras)',
      p: 2,
      c: 2,
      medidas: 'Levantar con las piernas; ayudas de transporte; no cargar en exceso.',
    },
    {
      riesgo: 'Estrés por turnos nocturnos',
      p: 3,
      c: 2,
      medidas: 'Planificar turnos; descansos; rotación de personal.',
    },
    {
      riesgo: 'Agresión o robo en la barra',
      p: 2,
      c: 2,
      medidas: 'Protocolo de seguridad; apoyo del supervisor; manejo discreto del efectivo.',
    },
  ],
  parrillero: [
    {
      riesgo: 'Quemaduras por brasas, carbón y planchas',
      p: 3,
      c: 3,
      medidas: 'Usar guantes térmicos y pinzas largas; alejar el rostro; no manipular brasas a mano.',
    },
    {
      riesgo: 'Contacto o fuga de gas',
      p: 1,
      c: 3,
      medidas: 'Verificar conexiones y llaves; ventilar; extintor a la mano; no encender llama ante olor a gas.',
    },
    {
      riesgo: 'Cortes con cuchillos y utensilios',
      p: 3,
      c: 2,
      medidas: 'Guantes anticorte; cuchillos afilados; técnica correcta de corte.',
    },
    {
      riesgo: 'Exposición a humo y calor',
      p: 3,
      c: 2,
      medidas: 'Extracción y ventilación; mascarilla para humo; hidratación y pausas.',
    },
    {
      riesgo: 'Pisos húmedos y resbalones',
      p: 2,
      c: 2,
      medidas: 'Mantener el piso seco; calzado antideslizante.',
    },
    {
      riesgo: 'Manipulación manual de cargas (bombonas, sacos)',
      p: 2,
      c: 2,
      medidas: 'Levantar con las piernas; usar carro o pedir apoyo; no cargar en exceso.',
    },
  ],
  supervisor_admin: [
    {
      riesgo: 'Estrés por responsabilidad y turnos',
      p: 3,
      c: 2,
      medidas: 'Planificar turnos; delegar; pausas; apoyo al personal.',
    },
    {
      riesgo: 'Violencia o robo en el local',
      p: 2,
      c: 3,
      medidas: 'Protocolo de seguridad; cámaras; manejo discreto del efectivo; capacitación al personal.',
    },
    {
      riesgo: 'Posturas prolongadas y ergonomía de oficina',
      p: 3,
      c: 1,
      medidas: 'Ajustar silla y escritorio; pausas activas; apoyo lumbar.',
    },
    {
      riesgo: 'Fatiga visual por computadoras',
      p: 2,
      c: 1,
      medidas: 'Iluminación adecuada; pausas visuales; distancia y brillo del monitor.',
    },
    {
      riesgo: 'Resbalones o caídas al recorrer el local',
      p: 2,
      c: 1,
      medidas: 'Calzado antideslizante; señalizar y limpiar derrames.',
    },
  ],
};

// --- EPP requerido por área -------------------------------------------------

const EPP_POR_AREA = {
  cocina: [
    'Guantes anticorte',
    'Guantes térmicos',
    'Delantal resistente al calor',
    'Gorra o red para el cabello',
    'Calzado antideslizante',
    'Mascarilla',
  ],
  lavaplatos: [
    'Guantes de caucho',
    'Delantal impermeable',
    'Botas o calzado antideslizante',
    'Mascarilla',
    'Protector de ojos',
  ],
  mesonero: ['Calzado antideslizante', 'Delantal', 'Gorra', 'Guantes de manejo'],
  cajero: ['Gorra', 'Delantal', 'Gel antibacterial'],
  bartender: ['Guantes', 'Delantal impermeable', 'Calzado antideslizante', 'Gorra'],
  parrillero: [
    'Guantes térmicos',
    'Guantes anticorte',
    'Delantal de cuero',
    'Calzado antideslizante',
    'Gorra',
    'Mascarilla para humo',
  ],
  supervisor_admin: ['Gorra', 'Delantal', 'Calzado antideslizante', 'Gel antibacterial'],
};

// --- Metadatos de cada área/rol ---------------------------------------------

const AREAS = {
  cocina: { titulo: 'COCINA', cargo: 'AYUDANTE DE COCINA / COCINERO(A)' },
  lavaplatos: { titulo: 'LAVAPLATOS (STEWARD)', cargo: 'STEWART (LAVAPLATOS)' },
  mesonero: { titulo: 'MESONERO / ATENDEDOR', cargo: 'MESONERO / ATENDEDOR' },
  cajero: { titulo: 'CAJERO(A)', cargo: 'CAJERO(A)' },
  bartender: { titulo: 'BARTENDER', cargo: 'BARTENDER' },
  parrillero: { titulo: 'PARRILLERO', cargo: 'PARRILLERO' },
  supervisor_admin: {
    titulo: 'SUPERVISOR / ADMINISTRACIÓN',
    cargo: 'SUPERVISOR DE SALÓN / ADMINISTRACIÓN',
  },
};

// --- Utilidades -------------------------------------------------------------

/** Nombre de la empresa a partir del cliente; marca genérica si no hay dato. */
function nombreEmpresa(cliente) {
  if (cliente && typeof cliente === 'object') {
    if (cliente.empresa) return cliente.empresa;
    if (cliente.marca) return cliente.marca;
  }
  return 'LA EMPRESA';
}

/** Fila de la matriz de riesgos con el nivel ya calculado. */
function filaRiesgo(item) {
  const nivel = nivelRiesgo(item.p, item.c);
  return [item.riesgo, String(item.p), String(item.c), nivel.etiqueta, item.medidas];
}

/**
 * Construye la Notificación de Riesgos de un área/rol.
 * @param {object} cliente  Objeto del cliente (cliente.json).
 * @param {string} area     Clave de área (cocina, cajero, ...).
 * @returns {Array} Bloques declarativos.
 */
function buildNotificacion(cliente, area) {
  const cfg = AREAS[area];
  if (!cfg) throw new Error(`Área desconocida: "${area}".`);

  const empresa = nombreEmpresa(cliente);
  const representante = (cliente && cliente.representante) || {};
  const riesgos = RIESGOS_POR_AREA[area];
  const epp = EPP_POR_AREA[area];

  const matriz = riesgos.map(filaRiesgo);
  const filasEpp = epp.map((item) => [item, '', '', '']);

  return [
    b.title(`NOTIFICACIÓN DE RIESGOS LABORALES — ${cfg.titulo}`),
    b.subtitle(`${empresa} · Actividad gastronómica`),

    b.p(
      'En cumplimiento del deber de informar, notifico al trabajador(ra) los riesgos ' +
        'existentes en su puesto de trabajo y las medidas preventivas aplicables.',
    ),
    b.legalRef('lopcymat_56_notif_riesgos'),

    b.chapter('1. Datos del trabajador'),
    b.field('Nombre y Apellido'),
    b.field('Cédula de Identidad'),
    b.field('Cargo', { value: cfg.cargo }),
    b.field('Área / Puesto de trabajo', { value: cfg.titulo }),
    b.field('Fecha de ingreso'),

    b.chapter('2. Matriz de riesgos (probabilidad × consecuencia)'),
    b.p(
      'Escala: Probabilidad (P) y Consecuencia (C) de 1 (baja) a 3 (alta). ' +
        'Nivel = P × C: 1–2 Bajo, 3–4 Medio, 6–9 Alto.',
    ),
    b.table(
      ['Riesgo', 'Probabilidad (P)', 'Consecuencia (C)', 'Nivel', 'Medidas preventivas'],
      matriz,
    ),

    b.chapter('3. Equipos de protección personal (EPP) requeridos'),
    b.table(['EPP', 'Talla', 'Cantidad', 'Fecha de entrega'], filasEpp),

    b.chapter('4. Medidas generales de prevención'),
    b.bullet('Mantener el orden y la limpieza del puesto de trabajo.'),
    b.bullet('Reportar de inmediato equipos defectuosos, derrames o condiciones inseguras.'),
    b.bullet('Usar el EPP entregado durante toda la jornada.'),
    b.bullet('Respetar las señalizaciones y el protocolo de seguridad del establecimiento.'),
    b.bullet('Conocer la ubicación de extintores y salidas de emergencia.'),

    b.chapter('5. Constancia y firma'),
    b.p(
      'Declaro que he sido informado(a) de los riesgos de mi puesto y de las medidas ' +
        'preventivas, y que recibo copia de la presente notificación.',
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
      'Notificación de riesgos conforme al deber de información al trabajador. ' +
        'Se firma por duplicado.',
    ),
  ];
}

module.exports = {
  AREAS,
  RIESGOS_POR_AREA,
  EPP_POR_AREA,
  nivelRiesgo,
  nombreEmpresa,
  buildNotificacion,
};
