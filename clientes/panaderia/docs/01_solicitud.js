'use strict';

// Ficha de solicitud de empleo: datos personales, domicilio, emergencia,
// instrucción, experiencia, referencias, salud, cargo al que aspira y firma.

const cliente = require('../cliente.json');
const b = require('../../../tools/blocks.js');

module.exports = {
  id: 'solicitud_de_empleo',
  dir: '01_INGRESO',
  filename: 'Solicitud_de_Empleo',
  empresa: cliente.empresa,
  blocks(entrada = cliente) {
    const c = entrada && entrada.empresa ? entrada : cliente;
    return [
      b.title('SOLICITUD DE EMPLEO'),
      b.subtitle(`Kit de Ingreso del Trabajador — ${c.empresa}`),

      b.p(
        'Complete todos los campos con letra legible. La información suministrada ' +
          'se utilizará para evaluar su solicitud y será tratada de forma ' +
          'confidencial.',
      ),

      b.chapter('1. Datos personales'),
      b.kvTable([
        { label: 'Nombres', value: '' },
        { label: 'Apellidos', value: '' },
        { label: 'Cédula de Identidad', value: '' },
        { label: 'Fecha de nacimiento', value: '' },
        { label: 'Estado civil', value: '' },
        { label: 'Nacionalidad', value: '' },
        { label: 'Teléfono', value: '' },
        { label: 'Correo electrónico', value: '' },
      ]),

      b.chapter('2. Domicilio'),
      b.kvTable([
        { label: 'Estado', value: '' },
        { label: 'Municipio', value: '' },
        { label: 'Parroquia', value: '' },
        { label: 'Dirección exacta', value: '' },
        { label: 'Tiempo de residencia', value: '' },
      ]),

      b.chapter('3. Contactos de emergencia'),
      b.table(
        ['Nombre y Apellido', 'Parentesco', 'Teléfono', 'Dirección'],
        [
          ['', '', '', ''],
          ['', '', '', ''],
        ],
      ),

      b.chapter('4. Instrucción académica'),
      b.table(
        ['Nivel', 'Institución', 'Título obtenido', 'Año'],
        [
          ['Primaria', '', '', ''],
          ['Secundaria', '', '', ''],
          ['Técnico / Universitario', '', '', ''],
          ['Cursos / Otros', '', '', ''],
        ],
      ),

      b.chapter('5. Experiencia laboral'),
      b.table(
        ['Empresa', 'Cargo', 'Desde', 'Hasta', 'Motivo de retiro'],
        [
          ['', '', '', '', ''],
          ['', '', '', '', ''],
          ['', '', '', '', ''],
        ],
      ),

      b.chapter('6. Referencias personales'),
      b.table(
        ['Nombre y Apellido', 'Parentesco / Relación', 'Teléfono'],
        [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
      ),

      b.chapter('7. Salud'),
      b.field('¿Padece alguna enfermedad o condición que deba informar?'),
      b.field('Detalle (si aplica)'),
      b.field('Tratamiento o medicación actual'),
      b.field('¿Presenta alguna alergia?'),

      b.chapter('8. Cargo al que aspira'),
      b.field('Cargo solicitado'),
      b.field('Área'),
      b.field('Disponibilidad de horario'),
      b.field('Pretensión salarial (USD)'),

      b.chapter('9. Declaración y firma'),
      b.p(
        'Declaro que la información contenida en esta solicitud es veraz y ' +
          'completa. Autorizo a la empresa a verificarla y a tratarla conforme a la ' +
          'normativa aplicable sobre protección de datos personales.',
      ),
      b.note(
        'Toda omisión o falsedad podrá ser motivo de no continuar con el proceso o ' +
          'de terminación del vínculo laboral, según corresponda.',
      ),
      b.signatureBlock([
        { rol: 'EL/LA SOLICITANTE', nombre: '', cargo: '', ci: '', fecha: '' },
      ]),
    ];
  },
};
