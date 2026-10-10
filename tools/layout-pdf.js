'use strict';

// Motor de flujo para PDF A4 vertical con tipografía estándar Helvetica
// (WinAnsiEncoding, que cubre á é í ó ú ñ ¿ ¡).
//
// Este módulo SOLO dibuja y calcula posiciones. La creación de los campos
// AcroForm vive en render-pdf.js, que coloca cada campo sobre las coordenadas
// devueltas/registradas por las primitivas de aquí.

const { StandardFonts, rgb } = require('pdf-lib');

// Tamaño A4 en puntos PDF (1 pt = 1/72 pulgada).
const A4 = { width: 595.28, height: 841.89 };

// Margen uniforme (~2 cm) y separación del encabezado/pie.
const MARGEN = 56;

const COLOR = {
  texto: rgb(0.1, 0.1, 0.1),
  suave: rgb(0.42, 0.42, 0.42),
  linea: rgb(0.4, 0.4, 0.4),
  rejilla: rgb(0.75, 0.75, 0.75),
  cabecera: rgb(0.91, 0.91, 0.91),
};

class PdfLayout {
  constructor(pdfDoc, options = {}) {
    this.doc = pdfDoc;
    this.empresa = options.empresa || 'NOMBRE DE LA EMPRESA';
    this.margen = options.margin ?? MARGEN;

    this.lineaSuperior = A4.height - this.margen; // tope del contenido
    this.lineaInferior = this.margen + 8; // piso del contenido
    this.anchoUtil = A4.width - 2 * this.margen;

    this.page = null;
    this.numPagina = 0;
    this.y = 0;

    // Posiciones de los campos rellenables, en orden de aparición.
    this.campos = [];
  }

  /** Incrusta las fuentes y crea la primera página. */
  async iniciar() {
    this.fuente = await this.doc.embedFont(StandardFonts.Helvetica);
    this.fuenteNegrita = await this.doc.embedFont(StandardFonts.HelveticaBold);
    this.fuenteCursiva = await this.doc.embedFont(StandardFonts.HelveticaOblique);
    this.nuevaPagina();
  }

  // --- Estructura de página -------------------------------------------------

  /** Añade una página nueva y dibuja encabezado y pie. */
  nuevaPagina() {
    this.page = this.doc.addPage([A4.width, A4.height]);
    this.numPagina += 1;
    this.y = this.lineaSuperior;
    this._encabezadoPie();
    return this.page;
  }

  _encabezadoPie() {
    // Encabezado: nombre de empresa (marcador) alineado a la derecha.
    const anchoEmpresa = this.fuente.widthOfTextAtSize(this.empresa, 9);
    this.page.drawText(this.empresa, {
      x: A4.width - this.margen - anchoEmpresa,
      y: A4.height - this.margen + 18,
      size: 9,
      font: this.fuente,
      color: COLOR.suave,
    });
    this.page.drawLine({
      start: { x: this.margen, y: A4.height - this.margen + 12 },
      end: { x: A4.width - this.margen, y: A4.height - this.margen + 12 },
      thickness: 0.5,
      color: COLOR.rejilla,
    });

    // Pie: número de página centrado.
    const pie = `Página ${this.numPagina}`;
    const anchoPie = this.fuente.widthOfTextAtSize(pie, 9);
    this.page.drawText(pie, {
      x: (A4.width - anchoPie) / 2,
      y: this.margen - 28,
      size: 9,
      font: this.fuente,
      color: COLOR.suave,
    });
  }

  /** Salta de página si no caben `altura` puntos en el espacio restante. */
  asegurar(altura) {
    if (this.y - altura < this.lineaInferior) this.nuevaPagina();
  }

  // --- Texto ----------------------------------------------------------------

  /** Divide `texto` en líneas que quepan en `ancho`, respetando saltos \n. */
  envolver(texto, fuente, tamano, ancho) {
    const parrafos = String(texto ?? '').split('\n');
    const lineas = [];
    for (const parrafo of parrafos) {
      const palabras = parrafo.split(/\s+/).filter((w) => w.length > 0);
      if (palabras.length === 0) {
        lineas.push('');
        continue;
      }
      let actual = palabras[0];
      for (let i = 1; i < palabras.length; i += 1) {
        const prueba = `${actual} ${palabras[i]}`;
        if (fuente.widthOfTextAtSize(prueba, tamano) <= ancho) {
          actual = prueba;
        } else {
          lineas.push(actual);
          actual = palabras[i];
        }
      }
      lineas.push(actual);
    }
    return lineas;
  }

  /**
   * Dibuja un texto con wrap y salto de página automático.
   * @returns {{x:number,y:number,ancho:number,alto:number,lineas:string[]}}
   */
  texto(text, opts = {}) {
    const fuente = opts.fuente || this.fuente;
    const tamano = opts.tamano ?? 11;
    const color = opts.color || COLOR.texto;
    const x = opts.x ?? this.margen;
    const ancho = opts.ancho ?? this.anchoUtil;
    const interlinea = opts.interlinea ?? tamano * 1.3;
    const align = opts.align || 'left';

    const lineas = this.envolver(text, fuente, tamano, ancho);
    const inicioY = this.y;
    for (const linea of lineas) {
      this.asegurar(interlinea);
      this.y -= interlinea;
      if (linea === '') continue;
      let dx = x;
      if (align === 'center') dx = x + (ancho - fuente.widthOfTextAtSize(linea, tamano)) / 2;
      else if (align === 'right') dx = x + ancho - fuente.widthOfTextAtSize(linea, tamano);
      this.page.drawText(linea, {
        x: dx,
        y: this.y + interlinea * 0.25,
        size: tamano,
        font: fuente,
        color,
      });
    }
    return { x, y: inicioY, ancho, alto: inicioY - this.y, lineas };
  }

  // --- Primitivas de bloque -------------------------------------------------

  titulo(text) {
    this.asegurar(34);
    this.y -= 10;
    const r = this.texto(text, {
      fuente: this.fuenteNegrita,
      tamano: 20,
      align: 'center',
      interlinea: 24,
    });
    this.y -= 8;
    return r;
  }

  subtitulo(text) {
    const r = this.texto(text, {
      fuente: this.fuenteCursiva,
      tamano: 12,
      align: 'center',
      interlinea: 15,
      color: COLOR.suave,
    });
    this.y -= 8;
    return r;
  }

  capitulo(text) {
    this.asegurar(28);
    this.y -= 10;
    const r = this.texto(text, { fuente: this.fuenteNegrita, tamano: 14, interlinea: 18 });
    this.y -= 4;
    return r;
  }

  h3(text) {
    this.asegurar(24);
    this.y -= 6;
    const r = this.texto(text, { fuente: this.fuenteNegrita, tamano: 12, interlinea: 15 });
    this.y -= 2;
    return r;
  }

  parrafo(text) {
    const r = this.texto(text, { tamano: 11, interlinea: 14.5 });
    this.y -= 6;
    return r;
  }

  nota(text) {
    const r = this.texto(text, {
      fuente: this.fuenteCursiva,
      tamano: 9.5,
      x: this.margen + 8,
      ancho: this.anchoUtil - 8,
      interlinea: 12.5,
      color: COLOR.suave,
    });
    this.y -= 6;
    return r;
  }

  /** Ítem con prefijo (viñeta o número) y sangría francesa simple. */
  _item(prefijo, text, sangria = 18) {
    const ancho = this.anchoUtil - sangria;
    const lineas = this.envolver(text, this.fuente, 11, ancho);
    for (let i = 0; i < lineas.length; i += 1) {
      this.asegurar(14.5);
      this.y -= 14.5;
      const baseY = this.y + 3;
      if (i === 0) {
        this.page.drawText(prefijo, {
          x: this.margen,
          y: baseY,
          size: 11,
          font: this.fuente,
          color: COLOR.texto,
        });
      }
      this.page.drawText(lineas[i], {
        x: this.margen + sangria,
        y: baseY,
        size: 11,
        font: this.fuente,
        color: COLOR.texto,
      });
    }
    this.y -= 4;
  }

  vineta(text) {
    this._item('•', text);
  }

  numerado(text, n) {
    this._item(`${n}.`, text, 20);
  }

  /** Regla horizontal; si no se pasa `y`, baja el cursor y la dibuja. */
  linea(y = null, opts = {}) {
    const x1 = opts.x1 ?? this.margen;
    const x2 = opts.x2 ?? A4.width - this.margen;
    const color = opts.color || COLOR.rejilla;
    const thickness = opts.thickness ?? 0.5;
    let ty = y;
    if (ty === null) {
      this.asegurar(8);
      this.y -= 8;
      ty = this.y;
    }
    this.page.drawLine({ start: { x: x1, y: ty }, end: { x: x2, y: ty }, thickness, color });
    return { x1, x2, y: ty };
  }

  /**
   * Campo con etiqueta y línea subrayada. Registra la posición para que
   * render-pdf.js coloque encima un PDFTextField (si `rellenable`).
   * @returns {{page:object,x:number,y:number,width:number,height:number,label:string,value:string}}
   */
  campo(label, valor, opts = {}) {
    const rellenable = opts.rellenable !== false;
    const tamano = 11;
    const interlinea = 18;

    this.asegurar(interlinea + 6);
    this.y -= interlinea;
    const baseY = this.y;

    const etiqueta = `${label}: `;
    const anchoEtiqueta = this.fuenteNegrita.widthOfTextAtSize(etiqueta, tamano);
    this.page.drawText(etiqueta, {
      x: this.margen,
      y: baseY + 4,
      size: tamano,
      font: this.fuenteNegrita,
      color: COLOR.texto,
    });

    const x = this.margen + anchoEtiqueta;
    const width = this.anchoUtil - anchoEtiqueta;
    this.page.drawLine({
      start: { x, y: baseY },
      end: { x: x + width, y: baseY },
      thickness: 0.7,
      color: COLOR.linea,
    });

    const rect = { page: this.page, x, y: baseY + 3, width, height: 13, label, value: valor };
    if (rellenable) {
      this.campos.push(rect);
    } else if (valor != null && String(valor) !== '') {
      this.page.drawText(String(valor), {
        x: x + 2,
        y: baseY + 4,
        size: tamano,
        font: this.fuente,
        color: COLOR.texto,
      });
    }

    this.y -= 6;
    return rect;
  }

  /** Tabla genérica con encabezado opcional y columnas de igual ancho. */
  tabla(header, rows) {
    const filas = [];
    if (header && header.length) filas.push({ celdas: header, cabecera: true });
    for (const fila of rows || []) filas.push({ celdas: fila, cabecera: false });

    const cols = Math.max(1, ...filas.map((f) => f.celdas.length));
    const anchoCol = this.anchoUtil / cols;
    const tamano = 10;
    const interlinea = 12.5;
    const pad = 4;
    const cajas = [];

    for (const fila of filas) {
      const fuente = fila.cabecera ? this.fuenteNegrita : this.fuente;
      const celdas = [];
      for (let c = 0; c < cols; c += 1) {
        const valor = fila.celdas[c] ?? '';
        celdas.push(this.envolver(valor, fuente, tamano, anchoCol - 2 * pad));
      }
      const maxLineas = Math.max(1, ...celdas.map((l) => l.length));
      const alto = maxLineas * interlinea + 2 * pad;

      this.asegurar(alto);
      const top = this.y;
      const bottom = top - alto;

      for (let c = 0; c < cols; c += 1) {
        const x = this.margen + c * anchoCol;
        if (fila.cabecera) {
          this.page.drawRectangle({
            x,
            y: bottom,
            width: anchoCol,
            height: alto,
            color: COLOR.cabecera,
          });
        }
        this.page.drawRectangle({
          x,
          y: bottom,
          width: anchoCol,
          height: alto,
          borderColor: COLOR.rejilla,
          borderWidth: 0.5,
        });
        celdas[c].forEach((linea, i) => {
          this.page.drawText(linea, {
            x: x + pad,
            y: top - pad - (i + 1) * interlinea + 3,
            size: tamano,
            font: fuente,
            color: COLOR.texto,
          });
        });
      }

      cajas.push({ y: bottom, alto });
      this.y = bottom;
    }

    this.y -= 6;
    return cajas;
  }

  /** Tabla clave/valor de dos columnas (la clave con fondo suave). */
  tablaKv(rows) {
    const anchoLabel = Math.min(this.anchoUtil * 0.38, 190);
    const anchoValor = this.anchoUtil - anchoLabel;
    const tamano = 10.5;
    const interlinea = 13;
    const pad = 5;
    const cajas = [];

    for (const fila of rows || []) {
      const lLineas = this.envolver(fila.label, this.fuenteNegrita, tamano, anchoLabel - 2 * pad);
      const vLineas = this.envolver(fila.value, this.fuente, tamano, anchoValor - 2 * pad);
      const maxLineas = Math.max(1, lLineas.length, vLineas.length);
      const alto = maxLineas * interlinea + 2 * pad;

      this.asegurar(alto);
      const top = this.y;
      const bottom = top - alto;

      this.page.drawRectangle({
        x: this.margen,
        y: bottom,
        width: anchoLabel,
        height: alto,
        color: COLOR.cabecera,
      });
      this.page.drawRectangle({
        x: this.margen,
        y: bottom,
        width: anchoLabel,
        height: alto,
        borderColor: COLOR.rejilla,
        borderWidth: 0.5,
      });
      this.page.drawRectangle({
        x: this.margen + anchoLabel,
        y: bottom,
        width: anchoValor,
        height: alto,
        borderColor: COLOR.rejilla,
        borderWidth: 0.5,
      });

      lLineas.forEach((linea, i) => {
        this.page.drawText(linea, {
          x: this.margen + pad,
          y: top - pad - (i + 1) * interlinea + 3,
          size: tamano,
          font: this.fuenteNegrita,
          color: COLOR.texto,
        });
      });
      vLineas.forEach((linea, i) => {
        this.page.drawText(linea, {
          x: this.margen + anchoLabel + pad,
          y: top - pad - (i + 1) * interlinea + 3,
          size: tamano,
          font: this.fuente,
          color: COLOR.texto,
        });
      });

      cajas.push({ y: bottom, alto });
      this.y = bottom;
    }

    this.y -= 6;
    return cajas;
  }

  /**
   * Bloque de firmas. Los datos vacíos se registran como campos rellenables;
   * los ya rellenados se dibujan como texto.
   */
  bloqueFirmas(signers) {
    const lleno = (v) => v != null && String(v).trim() !== '';

    for (const firma of signers || []) {
      this.asegurar(30);
      this.y -= 10;
      if (firma.rol) {
        this.texto(firma.rol, {
          fuente: this.fuenteNegrita,
          tamano: 11,
          align: 'center',
          interlinea: 14,
        });
        this.y -= 4;
      }
      this.campo('Nombre y Apellido', lleno(firma.nombre) ? firma.nombre : undefined, {
        rellenable: !lleno(firma.nombre),
      });
      this.campo('Cargo', lleno(firma.cargo) ? firma.cargo : undefined, {
        rellenable: !lleno(firma.cargo),
      });
      this.campo('Cédula de Identidad', lleno(firma.ci) ? firma.ci : undefined, {
        rellenable: !lleno(firma.ci),
      });
      this.campo('Fecha', lleno(firma.fecha) ? firma.fecha : undefined, {
        rellenable: !lleno(firma.fecha),
      });
      this.y -= 8;
    }
  }
}

module.exports = { PdfLayout, A4, MARGEN };
