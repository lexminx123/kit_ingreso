# AGENTS.md — Cómo generar un «Kit de Ingreso del Trabajador»

> Este archivo gobierna la generación de kits de ingreso en este repositorio.
> Léelo SIEMPRE antes de crear o modificar un ingreso.

## Regla de oro (no romper lo existente)

- **NUNCA borres, muevas ni sobrescribas un kit ya generado.** Cada ingreso vive en su **propia carpeta** `clientes/<slug>/`.
- Ejemplos: `clientes/icabaru/` (Parrilla y Lunchería Icabaru) · `clientes/panaderia/` (a futuro) · `clientes/alika_pets/` (cuando se migre).
- **NUNCA trabajes en `main`.** Crea rama `agente/<slug>` y entrega por Pull Request (sin merge).
- **NO toques el kit legado de ALIKA** (los `*.docx` y `*.py` de la raíz).

## Arquitectura (reutilizar, no reinventar)

```
legal/ve.js                  Registro ÚNICO de citas verificadas (clave -> ley/articulo/gaceta/fuente)
tools/                       Motor compartido (NO duplicar):
  blocks.js                  Vocabulario de bloques (title, p, field, table, signatureBlock, legalRef...)
  render-docx.js             Bloque -> .docx editable
  render-pdf.js              Bloque -> .pdf con campos AcroForm (llenables)
  build.js                   Descubre clientes/<slug>/docs/*.js y genera todas las salidas
clientes/
  _plantilla/cliente.json    Plantilla de datos de un negocio nuevo
  <slug>/
    cliente.json             Datos del negocio: razon social, RIF, domicilio, representante, cargos, remuneracion, jornada
    docs/*.js                Un modulo por documento: { id, dir, filename, blocks(cliente) }
    entregables/             Salida: <dir>/<filename>.docx + .pdf  (+ _manifest.json)
docs/legal/BASE_LEGAL_VE.md  Investigacion legal verificada (fuente de verdad de las citas)
```

## Proceso para generar un ingreso nuevo

Al pedido «generemos un ingreso para `<negocio>`»:

1. **Crear la carpeta del cliente**: copia `clientes/_plantilla/cliente.json` a `clientes/<slug>/cliente.json` y completa los datos reales (los que falten van como `[COMPLETAR]`).
2. **Reutilizar los módulos**: copia los `docs/*.js` de un cliente existente como **plantilla** y **adapta** lo específico:
   - cargos y sueldo base, funciones por cargo,
   - riesgos por área (según el rubro),
   - montos /remuneración, jornada, actividades.
   La **esencia del kit** (estructura de los 40+ documentos, cláusulas, políticas) **no se pierde ni se reinventa**: solo cambia lo que depende del negocio.
3. **Citas legales**: SOLO por clave con `legalRef('...')` / `legalRefText('...')`. **Nunca** escribas a mano el nombre de una ley ni «Art. N». Si falta una norma: verifícala en `docs/legal/BASE_LEGAL_VE.md` y agrégala a `legal/ve.js` (con `fuente` y `estado`).
4. **Generar**: `npm install` y `node tools/build.js --all` (o `npm run build:<slug>`).
5. **Verificar**: `node --test` en verde. Pasar por el **revisor**. Abrir **PR** (sin merge).

## Reglas legales (no dejar nada por el aire)

- **Cero citas inventadas.** Un test falla si un documento cita una clave que no existe en `legal/ve.js`, o si una entrada no tiene `fuente`.
- Antes de citar, confirma la norma en `docs/legal/BASE_LEGAL_VE.md` (incluye la lista de citas **falsas** detectadas en el repo legado).
- **Advertencia obligatoria**: todo kit debe declarar que requiere **revisión por abogado laboralista** antes de su uso formal.

## Salidas por documento

- `.pdf` — **llenables** (campos de formulario AcroForm).
- `.docx` — editables.
- `entregables/_manifest.json` — **manifiesto de campos** por documento (id, carpeta, archivo, campos llenables) para que un programa externo haga el **llenado automático**.

## Nunca tocar
- El kit ALIKA de la raíz (`*.docx`, `*.py`).
- `main` directamente.
- Kits de otros clientes.
