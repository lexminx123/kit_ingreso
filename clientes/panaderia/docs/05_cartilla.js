'use strict';

// Cartilla de riesgos, higiene y manipulación de alimentos — área de cocina.

const b = require('../../../tools/blocks.js');
const cliente = require('../cliente.json');

module.exports = {
  id: '05_cartilla',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Cartilla_Riesgos_Cocina_Manipulacion_Alimentos',
  empresa: cliente.empresa,
  blocks: () => [
    b.title('CARTILLA DE RIESGOS, HIGIENE Y MANIPULACIÓN DE ALIMENTOS'),
    b.subtitle(`${cliente.empresa} · Área de cocina`),

    b.p(
      'Resumen de normas de higiene y buenas prácticas de manipulación de alimentos ' +
        'que todo el personal del área de cocina debe cumplir y conocer.',
    ),
    b.legalRef('lopcymat_56_notif_riesgos'),

    b.chapter('1. Higiene personal'),
    b.bullet('Baño diario y uniforme limpio; mantener el cabello recogido con gorra o red.'),
    b.bullet('Uñas cortas, limpias y sin esmalte; retirar anillos, pulseras y relojes.'),
    b.bullet('Lavado de manos con agua y jabón antes de manipular alimentos y tras ir al baño.'),
    b.bullet('Cubrir heridas con apósito impermeable y reportar enfermedades contagiosas.'),

    b.chapter('2. Manipulación segura de alimentos'),
    b.bullet('No manipular alimentos con síntomas de gripe, diarrea o lesiones en las manos.'),
    b.bullet('Usar utensilios limpios para cada tipo de alimento; evitar el contacto directo.'),
    b.bullet('Cocinar los alimentos a temperatura segura y evitar recalentar más de una vez.'),

    b.chapter('3. Cadena de frío y almacenamiento'),
    b.bullet('Conservar los perecederos refrigerados; no romper la cadena de frío.'),
    b.bullet('Separar alimentos crudos de cocidos para evitar la contaminación cruzada.'),
    b.bullet('Etiquetar y rotar los alimentos (primero en entrar, primero en salir).'),

    b.chapter('4. Limpieza y desinfección'),
    b.bullet('Limpiar y desinfectar superficies, tablas y utensilios después de cada uso.'),
    b.bullet('Usar paños y tablas de color distinto para crudos y cocidos.'),
    b.bullet('Manejar los químicos de limpieza diluidos y nunca mezclar cloro con amoníaco.'),

    b.chapter('5. Seguridad en el puesto'),
    b.bullet('Usar calzado antideslizante y limpiar de inmediato los derrames.'),
    b.bullet('Manejar cuchillos, freidoras y planchas con el EPP correspondiente.'),
    b.bullet('Reportar condiciones inseguras y conocer la ubicación de extintores y salidas.'),

    b.chapter('6. Acuse de recibo'),
    b.p(
      'Declaro que he recibido y leído esta cartilla y que me comprometo a cumplir las ' +
        'normas de higiene y manipulación de alimentos en ella descritas.',
    ),
    b.signatureBlock([
      { rol: 'EL/LA TRABAJADOR(A)', nombre: '', cargo: '', ci: '', fecha: '' },
      {
        rol: 'LA EMPRESA',
        nombre: cliente.representante.nombre || '',
        cargo: cliente.representante.cargo || '',
        ci: cliente.representante.ci || '',
        fecha: '',
      },
    ]),
  ],
};
