'use strict';

// Registro verificado de referencias legales de Venezuela.
//
// Anti-invención: cada entrada declara `ley`, `gaceta`, `fecha`, `texto`,
// `fuente` y `estado` (`verificado` | `por_confirmar`). Los documentos citan
// por `key` a través de tools/blocks.js -> legalRef()/legalRefText(); nunca se
// escriben nombres de leyes ni artículos a mano.
//
// `texto` es un resumen breve, no una cita textual. `fuente` es una URL o
// referencia oficial no vacía, verificable en docs/legal/BASE_LEGAL_VE.md.

// --- Bases por norma (metadatos compartidos por sus artículos) --------------

const LOTTT = {
  ley: 'Ley Orgánica del Trabajo, los Trabajadores y las Trabajadoras (LOTTT)',
  gaceta: '6.076 Extraordinaria',
  fecha: '07/05/2012',
  fuente: 'https://www.ley.com.ve/laboral',
  estado: 'verificado',
};

const LOPCYMAT = {
  ley: 'Ley Orgánica de Prevención, Condiciones y Medio Ambiente de Trabajo (LOPCYMAT)',
  gaceta: '38.236',
  fecha: '26/07/2005',
  fuente: 'https://www.bolipuertos.gob.ve/wp-content/uploads/2021/07/LOPCYMAT.pdf',
  estado: 'verificado',
};

const CRBV = {
  ley: 'Constitución de la República Bolivariana de Venezuela',
  gaceta: '5.453 Extraordinaria',
  fecha: '24/03/2000',
  fuente: 'https://www.oas.org/juridico/spanish/const_ven.htm',
  estado: 'verificado',
};

/** Artículo de una norma con metadatos base. */
function articulo(base, articulo, texto) {
  return { base, articulo, texto };
}

// --- Contenido del registro -------------------------------------------------

const ENTRADAS = {
  // --- LOTTT ---
  // Nota: la LOTTT no regula un período de prueba general; por eso no existe
  // una cita de "prueba" (ver docs/legal/BASE_LEGAL_VE.md §3.1 y §5.4).
  lottt_60_modalidades: articulo(
    LOTTT,
    '60',
    'Modalidades del contrato: por tiempo indeterminado, a tiempo determinado o para una obra determinada.',
  ),
  lottt_62_determinado: articulo(
    LOTTT,
    '62',
    'Prórroga del contrato de trabajo por tiempo determinado.',
  ),
  lottt_63_obra: articulo(LOTTT, '63', 'Contrato para una obra determinada.'),
  lottt_79_despido: articulo(LOTTT, '79', 'Causas justificadas de despido.'),
  lottt_81_preaviso: articulo(LOTTT, '81', 'Preaviso por retiro.'),
  lottt_104_salario: articulo(LOTTT, '104', 'Definición de salario.'),
  lottt_131_utilidades: articulo(
    LOTTT,
    '131',
    'Utilidades: mínimo 30 días de salario; máximo 4 meses.',
  ),
  lottt_142_garantia: articulo(
    LOTTT,
    '142',
    'Garantía y cálculo de las prestaciones sociales (depósito trimestral).',
  ),
  lottt_143_deposito: articulo(
    LOTTT,
    '143',
    'Depósito de la garantía de prestaciones en fideicomiso, cuenta o contabilidad.',
  ),
  lottt_145_herederos: articulo(
    LOTTT,
    '145',
    'Derecho de herederos y herederas sobre prestaciones y beneficiarios.',
  ),
  lottt_173_jornada: articulo(LOTTT, '173', 'Límites de la jornada diurna, nocturna y mixta.'),
  lottt_178_horas_extra: articulo(
    LOTTT,
    '178',
    'Definición de las horas extraordinarias; carácter eventual o accidental.',
  ),
  lottt_118_horas_extra: articulo(
    LOTTT,
    '118',
    'Pago de las horas extraordinarias con un recargo mínimo del 50%.',
  ),
  lottt_184_feriados: articulo(LOTTT, '184', 'Días hábiles y feriados.'),
  lottt_188_descanso: articulo(LOTTT, '188', 'Descanso semanal y compensatorio.'),
  lottt_190_vacaciones: articulo(
    LOTTT,
    '190',
    'Vacaciones: 15 días hábiles más 1 día adicional por año de servicio.',
  ),
  lottt_192_bono_vacacional: articulo(
    LOTTT,
    '192',
    'Bono vacacional; pago con ocasión de las vacaciones y carácter salarial.',
  ),

  // --- LOPCYMAT ---
  lopcymat_56_notif_riesgos: articulo(
    LOPCYMAT,
    '56',
    'Deber del patrono de informar por escrito al trabajador sobre los riesgos y las ' +
      'medidas de prevención, tanto al ingresar como cuando cambien las condiciones (num. 3).',
  ),
  lopcymat_53_10_examen: articulo(
    LOPCYMAT,
    '53',
    'Derecho a exámenes de salud preventivos y al acceso y confidencialidad de sus ' +
      'resultados (num. 10); los exámenes periódicos se detallan en el Reglamento parcial, ' +
      'art. 27.',
  ),
  lopcymat_53_4_epp: articulo(
    LOPCYMAT,
    '53',
    'Derecho a ser provisto de los implementos y equipos de protección personal adecuados ' +
      '(num. 4).',
  ),
  lopcymat_53_11_confidencialidad: articulo(
    LOPCYMAT,
    '53',
    'Confidencialidad de los datos personales de salud (num. 11).',
  ),
  lopcymat_46_comite: articulo(
    LOPCYMAT,
    '46',
    'Comité de Seguridad y Salud Laboral: órgano paritario y colegiado de participación.',
  ),
  lopcymat_41_delegados: articulo(
    LOPCYMAT,
    '41-43',
    'Delegados y delegadas de prevención: elección, atribuciones y facultades (arts. 41 a 43).',
  ),
  lopcymat_69_3_itinere: articulo(
    LOPCYMAT,
    '69',
    'Accidentes in itinere: los ocurridos en el trayecto habitual entre la residencia y el ' +
      'trabajo (num. 3).',
  ),
  lopcymat_73_accidente: articulo(
    LOPCYMAT,
    '73',
    'Notificación de los accidentes de trabajo dentro de las 24 horas siguientes.',
  ),

  // --- CRBV ---
  crbv_28_habeas_data: articulo(
    CRBV,
    '28',
    'Acceso a la información y habeas data (protección de datos personales).',
  ),
  crbv_87_trabajo: articulo(CRBV, '87', 'Derecho al trabajo.'),
  crbv_89_irrenunciabilidad: articulo(
    CRBV,
    '89',
    'Irrenunciabilidad de los derechos laborales.',
  ),
  crbv_90_jornada: articulo(CRBV, '90', 'Jornada de trabajo.'),
  crbv_91_salario: articulo(CRBV, '91', 'Derecho al salario.'),
  crbv_92_prestaciones: articulo(CRBV, '92', 'Derecho a prestaciones sociales.'),

  // --- Otras normas (citadas como ley completa) ---
  lat_2004_alimentacion: {
    base: {
      ley: 'Ley de Alimentación para los Trabajadores (LAT)',
      gaceta: '38.094',
      fecha: '27/12/2004',
      fuente: 'Gaceta Oficial N° 38.094',
      estado: 'verificado',
    },
    articulo: '',
    texto: 'Beneficio de alimentación (cestaticket).',
  },
  delitos_informaticos_2001: {
    base: {
      ley: 'Ley Especial contra los Delitos Informáticos',
      gaceta: '37.313',
      fecha: '30/10/2001',
      fuente: 'Gaceta Oficial N° 37.313',
      estado: 'verificado',
    },
    articulo: '',
    texto: 'Protección penal de los sistemas y datos informáticos.',
  },
  loss_2002: {
    base: {
      ley: 'Ley Orgánica del Sistema de Seguridad Social (LOSSS)',
      gaceta: '37.600',
      fecha: '30/12/2002',
      fuente: 'Gaceta Oficial N° 37.600',
      estado: 'verificado',
    },
    articulo: '',
    texto: 'Régimen de seguridad social obligatoria (IVSS).',
  },
  bvv_2005_faov: {
    base: {
      ley: 'Ley del Régimen Prestacional de Vivienda y Hábitat',
      gaceta: '38.204',
      fecha: '08/06/2005',
      fuente: 'Gaceta Oficial N° 38.204',
      // Discrepancia sin resolver: la Gaceta original aparece como 38.204
      // (08/06/2005) y también como 38.182 (09/05/2005). Ver BASE_LEGAL_VE.md.
      estado: 'por_confirmar',
    },
    articulo: '',
    texto: 'Aporte al Fondo de Ahorro Obligatorio para la Vivienda (FAOV/BVV).',
  },
  reglamento_lopcymat_2007: {
    base: {
      ley:
        'Reglamento Parcial de la Ley Orgánica de Prevención, Condiciones y Medio Ambiente ' +
        'de Trabajo (LOPCYMAT)',
      gaceta: '38.596',
      fecha: '03/01/2007',
      fuente: 'Decreto N° 5.078, Gaceta Oficial N° 38.596',
      estado: 'verificado',
    },
    articulo: '',
    texto: 'Reglamento parcial de la LOPCYMAT (Decreto N° 5.078).',
  },
  nt_04_2023: {
    base: {
      ley: 'Norma Técnica Programa de Seguridad y Salud en el Trabajo (NT-04-2023)',
      gaceta: '42.712',
      fecha: '12/09/2023',
      fuente:
        'https://www.gacetaoficialvenezuela.com/gaceta-oficial-de-venezuela-42712-del-martes-12-septiembre-2023',
      estado: 'verificado',
    },
    articulo: '',
    texto: 'Programa de Seguridad y Salud en el Trabajo; deroga la NT-01-2008.',
  },
  decreto_inamovilidad_2025: {
    base: {
      ley: 'Decreto N° 5.070 — Inamovilidad laboral 2025-2026',
      gaceta: '6.868 Extraordinaria',
      fecha: '27/12/2024',
      fuente:
        'https://www.mpppst.gob.ve/mpppstweb/wp-content/uploads/2024/12/1_5152204470058222725_241228_165355-1.pdf',
      estado: 'verificado',
    },
    articulo: '',
    texto: 'Inamovilidad laboral del 01/01/2025 al 31/12/2026, ambos inclusive (LOTTT art. 422).',
  },
  decreto_salario_minimo_2022: {
    base: {
      ley: 'Decretos N° 4.653 y 4.654 — Salario mínimo y cestaticket socialista',
      gaceta: '6.691 Extraordinaria',
      fecha: '15/03/2022',
      fuente: 'https://gacetaoficial.org/descarga/2022_go-6691.pdf',
      estado: 'verificado',
    },
    articulo: '',
    texto: 'Salario mínimo mensual de Bs. 130,00 y cestaticket socialista.',
  },
};

/** Expande cada artículo a la entrada plana del registro. */
function construirRegistro(entradas) {
  const registro = {};
  for (const [key, entrada] of Object.entries(entradas)) {
    registro[key] = {
      key,
      ley: entrada.base.ley,
      articulo: entrada.articulo,
      gaceta: entrada.base.gaceta,
      fecha: entrada.base.fecha,
      texto: entrada.texto,
      fuente: entrada.base.fuente,
      estado: entrada.base.estado,
    };
  }
  return registro;
}

module.exports = construirRegistro(ENTRADAS);
