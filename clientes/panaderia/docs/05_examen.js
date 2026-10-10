'use strict';

// Examen médico pre-empleo — actividad de panadería y pastelería (LOPCYMAT art. 53 num. 10;
// los exámenes periódicos se detallan en el Reglamento parcial, art. 27).

const b = require('../../../tools/blocks.js');
const cliente = require('../cliente.json');

module.exports = {
  id: '05_examen',
  dir: '05_SEGURIDAD_LABORAL',
  filename: 'Examen_Medico_Pre_Empleo',
  empresa: cliente.empresa,
  blocks: () => [
    b.title('EXAMEN MÉDICO PRE-EMPLEO'),
    b.subtitle(`${cliente.empresa} · Panadería y pastelería`),

    b.p(
      'Registro del examen médico de pre-empleo practicado al aspirante, orientado a ' +
        'determinar su aptitud para el cargo y a detectar condiciones que requieran ' +
        'vigilancia de la salud.',
    ),
    b.legalRef('lopcymat_53_10_examen'),

    b.chapter('1. Datos del trabajador'),
    b.field('Nombre y Apellido'),
    b.field('Cédula de Identidad'),
    b.field('Fecha de nacimiento'),
    b.field('Cargo al que aspira'),
    b.field('Área / Puesto de trabajo'),
    b.field('Fecha del examen'),

    b.chapter('2. Antecedentes'),
    b.field('Antecedentes personales'),
    b.field('Antecedentes familiares'),
    b.field('Alergias'),
    b.field('Medicamentos que consume'),
    b.field('Cirugías previas'),
    b.field('Hábitos (tabaco / alcohol)'),

    b.chapter('3. Examen físico y resultados'),
    b.field('Peso'),
    b.field('Talla'),
    b.field('Presión arterial'),
    b.field('Frecuencia cardíaca'),
    b.field('Examen de laboratorio'),
    b.field('Observaciones'),

    b.chapter('4. Aptitud'),
    b.kvTable([
      { label: 'Apto', value: '( ) Sí   ( ) No   ( ) Apto con restricciones' },
      { label: 'Restricciones / recomendaciones', value: '' },
      { label: 'Vigilancia de la salud sugerida', value: '' },
    ]),

    b.chapter('5. Constancia y firma'),
    b.signatureBlock([
      {
        rol: 'MÉDICO(A)',
        nombre: '',
        cargo: 'Médico(a) ocupacional',
        ci: '',
        fecha: '',
      },
      { rol: 'EL/LA TRABAJADOR(A)', nombre: '', cargo: '', ci: '', fecha: '' },
    ]),
  ],
};
