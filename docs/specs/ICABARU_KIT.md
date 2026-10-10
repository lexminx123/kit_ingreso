# Spec — Kit de Ingreso del Trabajador · PARRILLA Y LUNCHERÍA ICABARU SRL

> Estado: **borrador para revisión**
> Fecha: 2026-10-04
> Cliente piloto: **Parrilla y Lunchería Icabaru SRL** (RIF J-30079219-0)
> Base legal: `docs/legal/BASE_LEGAL_VE.md` (investigación en curso)
> Autor: Orquestador (Tech Lead)

---

## 1. Objetivo

Producir un **Kit de Ingreso del Trabajador** completo para el cliente Icabaru que:

1. Esté **estructurado sobre legislación venezolana vigente y verificada** (LOTTT, LOPCYMAT, LOSSS, FAOV/BVV, INCES, Ley de Alimentación, etc.), sin **ninguna** cita inventada.
2. Genere, por cada documento, **dos entregables**:
   - `.pdf` con **campos de formulario rellenables** (AcroForm) para el trabajador.
   - `.docx` **editable** para la empresa.
3. Sea **multi-cliente** por diseño: Icabaru hoy, Panadería después, sin duplicar plantillas.
4. Reemplace el enfoque del kit existente (mejore el contrato de trabajo, que hoy es insuficiente) para este cliente.

### Por qué no reutilizar los scripts Python
Los generadores actuales (`*.py`, `python-docx`) **no pueden ejecutarse en el entorno** (no hay Python ni LibreOffice). El nuevo motor es **Node**, sin dependencia de Python.

---

## 2. Alcance

### Dentro
- Cliente **Icabaru** únicamente.
- Kit completo de ingreso (documentos listados en §5), en `.pdf` llenable + `.docx`.
- Registro legal verificado `legal/ve.js` + documento `docs/legal/BASE_LEGAL_VE.md`.
- Motor de render Node con tests.

### Fuera (fases posteriores)
- Corrección del kit ALIKA existente (citas falsas, textos duplicados).
- Cliente Panadería (se replica la plantilla cuando estén sus datos: razón social y RIF pendientes).
- App web / plataforma de llenado en línea.

---

## 3. Datos del cliente

| Campo | Valor |
|---|---|
| Razón social | PARRILLA Y LUNCHERÍA ICABARU SRL |
| RIF | J-30079219-0 |
| Domicilio fiscal | Los Teques, Estado Miranda `[dirección exacta: COMPLETAR]` |
| Actividad | Restaurante / parrilla (servicio de comidas y bebidas) |
| Representante legal | `[COMPLETAR: nombre, C.I., cargo]` |
| N° de trabajadores | `[COMPLETAR — determina si el Reglamento Interno es obligatorio por ley]` |

### Cargos (del PDF `cargos-icabaru.pdf`)
| # | Cargo | Sueldo base PDF (USD) |
|---|---|---|
| 1 | AYUDANTE DE COCINA | 42 |
| 2 | STEWART (LAVAPLATOS) | 40 |
| 3 | MESONERO / ATENDEDOR | 42 |
| 4 | CAJERO | 45 |
| 5 | BARTENDER | 50 |
| 6 | PARRILLERO | 60 |
| 7 | SUPERVISOR DE SALÓN | 70 |
| 8 | ADMINISTRADOR | 100 |

> El "sueldo base" del PDF se conserva como referencia interna de nómina. **En el contrato manda el paquete único** de §4.

---

## 4. Política de remuneración (decidida)

Paquete **único para todos los cargos**: **USD 240,00/mes**, discriminado igual que el kit ALIKA:

| Concepto | Monto USD | Carácter | Quincenal |
|---|---|---|---|
| Salario Base | 40,00 | SALARIAL | 20,00 |
| Bono de Alimentación (Cestaticket) | 80,00 | SALARIAL | 40,00 |
| Bono de Buen Vivir | 40,00 | NO SALARIAL | 20,00 |
| Bono de Transporte | 40,00 | NO SALARIAL | 20,00 |
| Otros beneficios no salariales | 40,00 | NO SALARIAL | 20,00 |
| **TOTAL** | **240,00** | — | **120,00** |

- **Base de cálculo de prestaciones:** USD 120,00 (salario base + cestaticket).
- Montos en Bs se calculan según **tasa BCV** a la fecha de pago (a definir cómo se expresa en el contrato: monto USD + Bs equivalente BCV del día de pago).
- Cestaticket conforme a la **Ley de Alimentación para los Trabajadores**.

> ⚠️ Pendiente de revisión legal: la expresión de salarios en USD y su conversión a Bs debe quedar redactada de forma conforme a la LOTTT (el salario se causa en Bs).

---

## 5. Inventario de documentos (Icabaru)

Bloques y documentos. Cada uno se genera en **PDF llenable + DOCX**.

| Bloque | Documento | Genera | Campos llenables principales |
|---|---|---|---|
| 00 Control | Checklist Maestro de Ingreso | 1 | Empresa completa el control |
| 01 Ingreso | Solicitud de Empleo / Ficha de Ingreso | 1 | Datos personales, laborales, referencias, salud, declaración |
| 02 Contrato | Contrato Individual de Trabajo | **8** (uno por cargo) | Partes, cargo, sueldo, fecha inicio, firma |
| 03 Cargo | Descripción de Funciones | **8** (uno por cargo) | Trabajador, fecha, firma de recepción |
| 04 Prestaciones | Autorización de depósito de prestaciones | 1 | Datos, modalidad, firma |
| 04 Prestaciones | Designación de beneficiarios | 1 | Beneficiarios, porcentajes, firma |
| 05 Seguridad | Notificación de Riesgos (por rol/área) | **7** | Riesgos, medidas, trabajador, firma |
| 05 Seguridad | Acta de Entrega de EPP | 1 | Ítems, tallas, cantidades, firmas |
| 05 Seguridad | Examen Médico Pre-Empleo | 1 | Datos, antecedentes, aptitud, médico |
| 05 Seguridad | Cartilla de Riesgos de Cocina / Manipulación de Alimentos | 1 | Acuse de recibo |
| 06 Registros | Checklist IVSS / FAOV / INCES / RPE | 1 | Constancias, fechas, responsable |
| 07 Autorizaciones | Autorización de Datos Personales | 1 | Titular, finalidad, firma |
| 07 Autorizaciones | Autorización de Imagen / Redes Sociales | 1 | Titular, alcance, firma |
| 07 Autorizaciones | Autorización de Videovigilancia | 1 | Titular, áreas, firma |
| 08 Políticas | Reglamento Interno de Trabajo | 1 | Acuse de recibo (obligatorio por ley) |
| 08 Políticas | Código de Conducta | 1 | Acuse |
| 08 Políticas | Política de Confidencialidad | 1 | Acuse |
| 08 Políticas | Política de Uso de Redes Sociales | 1 | Acuse |
| 08 Políticas | Procedimiento de Reporte de Incidentes | 1 | Acuse |
| 09 Cierre | Carta de Aceptación General | 1 | Firma |

**Conteo base:** ~40 documentos por generación (contratos y descripciones × 8).

> El "15" que mencionaste puede interpretarse como los documentos por trabajador (paquete individual). Se confirmará al generar el primer paquete.

---

## 6. Arquitectura técnica

```
kit_ingreso/
├─ legal/
│   └─ ve.js                      ← registro ÚNICO de citas verificadas
├─ tools/
│   ├─ blocks.js                  ← vocabulario de bloques declarativos
│   ├─ layout-pdf.js              ← motor de flujo A4 para PDF (pdf-lib)
│   ├─ render-pdf.js              ← bloque → PDF con AcroForm
│   ├─ render-docx.js             ← bloque → DOCX (npm docx)
│   └─ build.js                   ← orquesta cliente → entregables
├─ clientes/
│   ├─ _plantilla/cliente.json
│   └─ icabaru/
│       ├─ cliente.json           ← datos, cargos, remuneración
│       ├─ docs/                  ← definiciones de documentos (bloques)
│       └─ entregables/           ← .pdf + .docx generados
├─ test/
│   └─ *.test.js                  ← node:test
└─ docs/
    ├─ legal/BASE_LEGAL_VE.md
    └─ specs/ICABARU_KIT.md       ← este archivo
```

### Dependencias
- **Node 24** + **npm 11** (disponibles). Bun disponible como acelerador opcional.
- `docx` (generación Word), `pdf-lib` (PDF + campos AcroForm). Sin Python, sin LibreOffice.
- Fuente de PDF: Helvetica/WinAnsi (cubre acentos y `ñ`), sin `fontkit`.

### Modelo de bloques (vocabulario)
`title`, `subtitle`, `chapter`, `h3`, `p`, `bullet`, `numbered`, `field` (campo llenable), `kvTable`, `table`, `signatureBlock`, `pageBreak`, `note`, `legalRef`.

`legalRef(key)` es la **única** forma de citar una ley: resuelve en `legal/ve.js`.

---

## 7. Blindaje legal (anti-invención)

1. **Registro único** `legal/ve.js`: cada entrada `{ key, ley, articulo, gaceta, fecha, texto, fuente }`.
2. Los documentos **no** escriben nombres de leyes a mano; usan `legalRef(key)`.
3. **Test obligatorio**: falla si un documento cita una `key` inexistente, o si una entrada del registro no tiene `fuente` (URL).
4. Toda cita proviene de `docs/legal/BASE_LEGAL_VE.md`, con fuentes oficiales (gacetas, TSJ, ministerios, ILO/OEA).

---

## 8. Criterios de aceptación

- [ ] `npm run build:icabaru` genera todos los `.pdf` y `.docx` sin Python ni LibreOffice.
- [ ] Cada PDF abre con sus **campos AcroForm** rellenables (verificado por test).
- [ ] Cada DOCX es un zip válido con `word/document.xml`.
- [ ] **Cero** citas legales fuera del registro verificado (test en verde).
- [ ] Remuneración USD 240 discriminada; base de prestaciones USD 120.
- [ ] Reglamento Interno conforme a la actividad gastronómica.
- [ ] Contrato de trabajo corregido y ampliado (supera al existente).
- [ ] `node --test` en verde.
- [ ] PR abierto sobre `main`, sin merge.

---

## 9. Riesgos y supuestos

| Riesgo | Mitigación |
|---|---|
| Exactitud legal | Registro verificado + **revisión por abogado laboralista** antes del uso formal (declarado en el README) |
| Salario en USD vs. causación en Bs | Redacción explícita de conversión BCV; revisar con abogado |
| Datos incompletos (representante, dirección, N° trabajadores) | Campos `[COMPLETAR]` marcados en los documentos |
| PDF llenable en lectores diversos | Probar en Adobe/Chrome/Edge; AcroForm estándar |
| Panadería sin razón social/RIF | Se difiere hasta recibir datos |

---

## 10. Flujo de entrega

1. Spec (este documento) → revisión.
2. Tickets en GitHub Issues (`lexminx123/kit_ingreso`).
3. Rama `agente/icabaru` por ticket.
4. TDD rojo→verde→refactor por el implementador; auditoría del revisor.
5. PR (sin merge) con evidencia de tests.
