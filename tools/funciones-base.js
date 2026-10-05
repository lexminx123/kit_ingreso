'use strict';

// Base compartida para armar las descripciones de funciones por cargo.
//
// Los módulos 03a..03h (clientes/<slug>/docs) aportan el contenido particular
// de cada puesto (funciones, responsabilidades, requisitos) y esta base ensambla
// los bloques comunes: encabezado, propósito, listas y carta de recepción.
//
// Solo depende de tools/blocks.js; no conoce a ningún cliente en concreto.

const b = require('./blocks.js');

// Etiqueta legible del área. Incluye las áreas gastronómicas (icabaru) y las
// de panadería; cualquier área desconocida cae al propio identificador.
const ETIQUETA_AREA = {
  cocina: 'Cocina',
  parrilla: 'Parrilla',
  salon: 'Salón',
  caja: 'Caja',
  barra: 'Barra',
  administracion: 'Administración',
  admin: 'Administración',
  panaderia: 'Panadería',
  pasteleria: 'Pastelería',
  horno: 'Horno',
  mantenimiento: 'Mantenimiento',
};

/** Área legible a partir de la clave de área del cargo. */
function etiquetaArea(area) {
  return ETIQUETA_AREA[area] || area;
}

/**
 * Busca un cargo por id en la lista del cliente.
 * Lanza si no existe: nunca se describe un cargo inventado.
 * @param {Array<{id:string,nombre:string,area:string,sueldo_base_usd:number}>} cargos
 * @param {string} id
 */
function cargoPorId(cargos, id) {
  const cargo = (cargos || []).find((c) => c && c.id === id);
  if (!cargo) throw new Error(`Cargo desconocido: "${id}"`);
  return cargo;
}

/** Limpia un valor de marcador "[COMPLETAR...]" para dejarlo en blanco. */
function limpiarValor(valor) {
  if (valor == null) return '';
  return /\[COMPLETAR/i.test(String(valor)) ? '' : String(valor);
}

/** Firmante trabajador: se completa a mano en el documento. */
function firmanteTrabajador(nombreCargo) {
  return {
    rol: 'EL/LA TRABAJADOR(A)',
    nombre: '',
    cargo: nombreCargo || '',
    ci: '',
    fecha: '',
  };
}

/** Firmante de la empresa a partir del representante del cliente. */
function firmanteEmpresa(cliente) {
  const r = (cliente && cliente.representante) || {};
  return {
    rol: 'LA EMPRESA',
    nombre: limpiarValor(r.nombre),
    cargo: limpiarValor(r.cargo),
    ci: limpiarValor(r.ci),
    fecha: '',
  };
}

/**
 * Ensambla la descripción de funciones completa de un cargo.
 *
 * @param {{id:string,nombre:string,area:string,sueldo_base_usd:number}} cargo
 * @param {{
 *   proposito:string,
 *   funciones:string[],
 *   responsabilidades:string[],
 *   requisitos:string[],
 *   condiciones?:string[],
 * }} contenido
 * @param {{empresa?:string, cliente?:object}} [opciones]
 * @returns {Array<object>} bloques listos para render
 */
function descripcionFunciones(cargo, contenido, opciones = {}) {
  const empresa = opciones.empresa || '';
  const bloques = [
    b.title(`DESCRIPCIÓN DE FUNCIONES — ${cargo.nombre}`),
    b.subtitle(
      `Kit de Ingreso del Trabajador${empresa ? ` — ${empresa}` : ''}`,
    ),
    b.kvTable([
      { label: 'Cargo', value: cargo.nombre },
      { label: 'Área', value: etiquetaArea(cargo.area) },
      { label: 'Sueldo base (USD)', value: String(cargo.sueldo_base_usd) },
      { label: 'Jornada', value: 'Diurna, 8 horas diarias / 40 horas semanales' },
    ]),
    b.legalRef('lottt_59_cargo'),
  ];

  if (contenido.proposito) {
    bloques.push(b.chapter('1. Propósito del cargo'));
    bloques.push(b.p(contenido.proposito));
  }

  // Data-driven: si el contenido no trae funciones, se usan las declaradas en
  // cliente.json para el cargo. Así icabaru (que las pasa en `contenido`)
  // conserva su salida y panadería las toma de una única fuente de verdad.
  const funciones =
    contenido.funciones && contenido.funciones.length
      ? contenido.funciones
      : cargo.funciones || [];

  if (funciones.length) {
    bloques.push(b.chapter('2. Funciones principales'));
    for (const fn of funciones) bloques.push(b.numbered(fn));
  }

  if (contenido.responsabilidades && contenido.responsabilidades.length) {
    bloques.push(b.chapter('3. Responsabilidades'));
    for (const r of contenido.responsabilidades) bloques.push(b.numbered(r));
  }

  if (contenido.requisitos && contenido.requisitos.length) {
    bloques.push(b.chapter('4. Requisitos del cargo'));
    for (const req of contenido.requisitos) bloques.push(b.bullet(req));
  }

  if (contenido.condiciones && contenido.condiciones.length) {
    bloques.push(b.chapter('5. Condiciones de trabajo y seguridad'));
    for (const c of contenido.condiciones) bloques.push(b.bullet(c));
  }

  bloques.push(b.pageBreak());
  bloques.push(b.chapter('6. Carta de recepción'));
  bloques.push(
    b.p(
      'Yo, el/la trabajador(a) que suscribe, declaro haber recibido, leído y ' +
        'comprendido la presente descripción de funciones correspondiente al cargo ' +
        `de ${cargo.nombre}, y me comprometo a desempeñarlo conforme a las ` +
        'instrucciones de la empresa, las normas de higiene y seguridad y el ' +
        'reglamento interno del trabajador.',
    ),
  );
  bloques.push(
    b.note(
      'Se firma por duplicado, quedando un ejemplar en poder de la empresa y otro ' +
        'en poder del trabajador.',
    ),
  );
  bloques.push(
    b.signatureBlock([
      firmanteTrabajador(cargo.nombre),
      firmanteEmpresa(opciones.cliente),
    ]),
  );

  return bloques;
}

module.exports = {
  ETIQUETA_AREA,
  etiquetaArea,
  cargoPorId,
  limpiarValor,
  firmanteTrabajador,
  firmanteEmpresa,
  descripcionFunciones,
};
