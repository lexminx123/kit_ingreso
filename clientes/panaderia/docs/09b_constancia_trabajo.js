'use strict';

// Constancia de Trabajo.
//
// Documento mediante el cual la empresa certifica el cargo, la fecha de ingreso
// y la remuneración del trabajador(ra), a los fines que estime convenientes.
// Cita por clave la definición de salario y la denominación del cargo con
// descripción de los servicios.

const b = require('../../../tools/blocks.js');
const clienteBase = require('../cliente.json');

/** Combina el cliente recibido con el cliente.json del kit (por si llega vacío). */
function contexto(cliente) {
  if (cliente && cliente.empresa) return cliente;
  return clienteBase;
}

module.exports = {
  id: 'constancia_de_trabajo',
  dir: '09_CIERRE',
  filename: 'Constancia_de_Trabajo',
  empresa: clienteBase.empresa,
  blocks(cliente) {
    const c = contexto(cliente);
    const empresa = c.empresa || 'LA EMPRESA';
    const rif = c.rif || '[COMPLETAR: RIF]';
    const representante = c.representante || {};

    return [
      b.title('CONSTANCIA DE TRABAJO'),
      b.subtitle(`${empresa} — RIF ${rif}`),

      b.p(
        'Quien suscribe, en su carácter de representante de ' +
          empresa +
          ', hace constar que el trabajador(ra) cuyos datos se indican a continuación presta ' +
          'servicios en esta empresa, según la información siguiente:',
      ),

      b.chapter('Datos del trabajador(ra)'),
      b.field('Nombre y Apellido'),
      b.field('Cédula de Identidad'),
      b.field('Cargo'),
      b.field('Área / Departamento'),
      b.field('Fecha de ingreso'),
      b.field('Tipo de contrato'),

      b.chapter('Datos de la relación laboral'),
      b.kvTable([
        { label: 'Tipo de jornada', value: '' },
        { label: 'Remuneración mensual', value: '' },
        { label: 'Beneficio de alimentación', value: '' },
        { label: 'Otros beneficios', value: '' },
      ]),
      b.legalRef('lottt_104_salario'),
      b.legalRef('lottt_59_cargo'),

      b.chapter('Funciones del cargo'),
      b.field('Descripción de los servicios prestados'),

      b.chapter('Constancia de egreso (cuando aplique)'),
      b.field('Fecha de egreso'),
      b.field('Motivo del egreso'),

      b.chapter('Uso y vigencia'),
      b.p(
        'La presente constancia se expide a solicitud del trabajador(ra) para los fines que ' +
          'estime convenientes. Su contenido refleja la información cierta a la fecha de ' +
          'emisión y no sustituye otros documentos legales.',
      ),
      b.field('Lugar y fecha de emisión'),

      b.chapter('Firma'),
      b.field('Nombre del representante'),
      b.field('Cargo del representante'),
      b.field('Cédula de Identidad del representante'),
      b.field('Sello de la empresa'),

      b.signatureBlock([
        {
          rol: 'LA EMPRESA',
          nombre: representante.nombre || '',
          cargo: representante.cargo || '',
          ci: representante.ci || '',
          fecha: '',
        },
      ]),
      b.note(
        'Constancia de trabajo. Requiere revisión por abogado laboralista antes de su uso ' +
          'formal. Se entrega al trabajador(ra) a su solicitud.',
      ),
    ];
  },
};
