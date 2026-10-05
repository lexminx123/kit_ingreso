'use strict';

// Descripción de funciones del cargo ENCARGADO (área: admin).

const cliente = require('../cliente.json');
const { cargoPorId, descripcionFunciones } = require('../../../tools/funciones-base.js');

// Las funciones principales se toman de cliente.json (cargo.funciones); aquí
// solo se declara el contenido descriptivo propio del puesto.
const CONTENIDO = {
  proposito: "Dirigir y supervisar la operación integral de la panadería, garantizando la producción, la calidad, el cumplimiento sanitario y la rentabilidad del negocio.",
  responsabilidades: [
    "Responder por la operación diaria y por el cumplimiento de las metas de producción y venta.",
    "Coordinar y evaluar al personal de todas las áreas del establecimiento.",
    "Velar por el cumplimiento de las normas laborales, sanitarias y de seguridad aplicables.",
    "Rendir cuentas ante la representación legal de la empresa.",
  ],
  requisitos: [
    "Educación media concluida; deseable formación técnica o administrativa.",
    "Experiencia comprobable en supervisión de panaderías, pastelerías o establecimientos de alimentos.",
    "Conocimientos de producción, costos, inventarios e higiene de los alimentos.",
    "Liderazgo, capacidad de organización y disponibilidad por turnos.",
  ],
  condiciones: [
    "Permanencia prolongada de pie y recorridos frecuentes por el establecimiento.",
    "Exposición a calor, ruido y superficies calientes en las áreas de producción.",
    "Uso obligatorio de uniforme, gorra y calzado antideslizante.",
  ],
};

module.exports = {
  id: 'funciones_encargado',
  dir: '03_DESCRIPCION_DE_CARGOS',
  filename: '03a_Descripcion_Funciones_Encargado',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.cargos ? entrada : cliente;
    const cargo = cargoPorId(c.cargos, 'encargado');
    return descripcionFunciones(cargo, CONTENIDO, { empresa: c.empresa, cliente: c });
  },
};
