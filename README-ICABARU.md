# Kit de Ingreso del Trabajador — ICABARU

Motor en **Node.js** que genera el **Kit de Ingreso del Trabajador** para el cliente
piloto **Parrilla y Lunchería Icabaru SRL** (RIF J-30079219-0), a partir de
definiciones declarativas de documentos y un registro legal verificado.

Cada documento se produce en **dos formatos**:

- **`.pdf`** con **campos de formulario rellenables** (AcroForm), pensado para que el
  trabajador lo complete en pantalla.
- **`.docx`** **editable**, pensado para la empresa (ajustes, firmas, archivo).

Toda cita legal se resuelve por **clave** contra `legal/ve.js`; los documentos no
escriben nombres de leyes ni números de artículo a mano.

---

## Requisitos

- **Node.js 24 o superior** (probado con Node 24).
- **npm** (para instalar dependencias).
- No requiere Python, LibreOffice ni software ofimático.

---

## Uso

```sh
npm install
npm run build:icabaru
```

El script `build:icabaru` ejecuta `node tools/build.js --all` y regenera **todos**
los documentos del kit. La salida se escribe en
`clientes/icabaru/entregables/<bloque>/`.

También se puede construir un solo documento:

```sh
node tools/build.js --doc carta
```

El resultado es **reproducible byte a byte**: dos corridas consecutivas de
`build:icabaru` producen exactamente los mismos 80 archivos (ver
[*Reproducibilidad*](#reproducibilidad)).

---

## Estructura

```
kit_ingreso/
├─ legal/
│  └─ ve.js                       Registro único de citas legales verificadas
├─ tools/
│  ├─ blocks.js                   Vocabulario de bloques declarativos
│  ├─ layout-pdf.js               Motor de flujo A4 para PDF
│  ├─ render-pdf.js               Bloque → PDF con AcroForm
│  ├─ render-docx.js              Bloque → DOCX (docx)
│  ├─ contrato-base.js            Contrato individual (común)
│  ├─ funciones-base.js           Descripción de funciones (común)
│  ├─ riesgos-base.js             Notificación de riesgos por área (común)
│  └─ build.js                    Orquestador de la generación
├─ clientes/
│  ├─ _plantilla/
│  │  └─ cliente.json             Plantilla multi-cliente (valores a completar)
│  └─ icabaru/
│     ├─ cliente.json             Datos, cargos y remuneración del cliente
│     ├─ docs/                    Definición de cada documento (bloques)
│     └─ entregables/             .docx + .pdf generados, por bloque
├─ test/                          Pruebas con node:test
└─ docs/
   ├─ legal/BASE_LEGAL_VE.md      Base legal verificada de Venezuela
   └─ specs/ICABARU_KIT.md        Especificación del kit
```

El motor **descubre solo** los documentos: cada archivo en
`clientes/<slug>/docs/*.js` que exporte `{ id, dir, filename, blocks(cliente) }`
se construye automáticamente. Un cliente nuevo se crea copiando
`clientes/_plantilla/` y completando su `cliente.json` y sus `docs/`.

---

## Los 40 documentos por bloque

Cada documento se entrega en `.docx` y `.pdf` (**40 documentos → 80 archivos**).

| Bloque | Carpeta | Documentos | Cantidad |
|---|---|---|---|
| 00 Control | `00_CONTROL` | Checklist Maestro de Ingreso | 1 |
| 01 Ingreso | `01_INGRESO` | Solicitud de Empleo / Ficha de Ingreso | 1 |
| 02 Contratos | `02_CONTRATOS` | Contrato Individual de Trabajo (uno por cargo) | 8 |
| 03 Cargos | `03_DESCRIPCION_DE_CARGOS` | Descripción de Funciones (una por cargo) | 8 |
| 04 Prestaciones | `04_PRESTACIONES` | Autorización de Depósito de Prestaciones; Designación de Beneficiarios | 2 |
| 05 Seguridad laboral | `05_SEGURIDAD_LABORAL` | Notificación de Riesgos (7, por área); Acta de Entrega de EPP; Examen Médico Pre-Empleo; Cartilla de Riesgos de Cocina / Manipulación de Alimentos | 10 |
| 06 Registros legales | `06_REGISTROS_LEGALES` | Checklist IVSS / FAOV / INCES | 1 |
| 07 Autorizaciones | `07_AUTORIZACIONES` | Datos Personales; Imagen / Redes Sociales; Videovigilancia | 3 |
| 08 Políticas internas | `08_POLITICAS_INTERNAS` | Reglamento Interno de Trabajo; Código de Conducta; Política de Confidencialidad; Política de Uso de Redes Sociales; Procedimiento de Reporte de Incidentes | 5 |
| 09 Cierre | `09_CIERRE` | Carta de Aceptación General | 1 |
| **Total** | | | **40** |

Los **8 cargos** de Icabaru son: Ayudante de Cocina, Stewart (Lavaplatos),
Mesonero / Atendedor, Cajero, Bartender, Parrillero, Supervisor de Salón y
Administrador.

---

## Normativa aplicada

La base legal verificada del kit está en
[`docs/legal/BASE_LEGAL_VE.md`](docs/legal/BASE_LEGAL_VE.md), con el número de
gaceta y la fuente de cada norma: **Constitución (1999)**, **LOTTT**,
**LOPCYMAT** y su Reglamento parcial, normas técnicas del **INPSASEL**,
**LOSSS** / **IVSS** / **FAOV-BANAVIH** / **INCES**, **Ley de Alimentación
para los Trabajadores** y los decretos de coyuntura vigentes (inamovilidad y
salario mínimo).

El registro `legal/ve.js` sólo admite citas con `fuente` y `estado`, y las
pruebas fallan si un documento referencia una clave inexistente. Las citas de
los documentos se resuelven siempre por clave (`legalRef` / `legalRefText`).

---

## ⚠️ Advertencia importante

Este kit es una **herramienta de trabajo, no asesoría jurídica**. Antes de usarlo
con efectos legales, **debe ser revisado y validado por un abogado laboralista
en Venezuela**, en particular:

- la redacción de la remuneración en USD y su conversión a bolívares (el salario
  se causa en Bs conforme a la LOTTT);
- el Régimen Interno de Trabajo y las políticas internas;
- el tratamiento de datos personales, imagen y videovigilancia.

---

## Datos pendientes del cliente

El `clientes/icabaru/cliente.json` y varios documentos marcan estos datos como
`[COMPLETAR]` y deben completarse antes de la entrega formal:

- **Representante legal** (nombre, cédula de identidad y cargo).
- **Dirección fiscal** exacta.
- **Número de trabajadores** (determina, entre otros, la obligatoriedad del
  Reglamento Interno de Trabajo).

---

## PDF llenable y DOCX editable

- Los **PDF** incluyen un formulario **AcroForm** estándar: los campos se
  rellenan en Adobe Acrobat, Chrome/Edge u otros lectores compatibles. Los
  nombres de campo son únicos y estables.
- Los **DOCX** son editables con Word, LibreOffice u otro procesador de textos.

---

## Reproducibilidad

`npm run build:icabaru` es **byte-reproducible**: dos corridas consecutivas
generan exactamente los mismos 80 archivos (mismo hash SHA-256). Para ello:

- El **DOCX** fija las fechas de creación/modificación de sus *core properties*
  y reempaqueta el ZIP con fechas constantes (el paquete `docx` sella la fecha
  actual y no expone opción para cambiarla; se normaliza en
  `tools/render-docx.js`).
- El **PDF** fija `CreationDate` y `ModDate` mediante `pdf-lib`
  (`tools/render-pdf.js`).

Las pruebas `test/render-docx.test.js` y `test/render-pdf.test.js` verifican que
dos renderizados del mismo contenido sean idénticos.

---

## Pruebas

```sh
npm test
```

Ejecuta la suite con `node:test` (registro legal, contrato, ingreso, seguridad,
autorizaciones, políticas, render DOCX/PDF y build).
