# Kit de Ingreso del Trabajador — ALIKA PETS

> Kit completo de documentos laborales para **GRUPO CAVAL 1003, C.A.** (marca comercial **ALIKA PETS**), clínica veterinaria + tienda de mascotas + peluquería canina ubicada en Los Teques, Estado Miranda, Venezuela.

[![Licencia](https://img.shields.io/badge/Licencia-MIT-teal.svg)](LICENSE)
[![Versión](https://img.shields.io/badge/Versión-3.1-teal.svg)](#)
[![Documentos](https://img.shields.io/badge/Documentos-39-teal.svg)](#estructura-del-kit)
[![Cobertura](https://img.shields.io/badge/Cobertura-100%25-teal.svg)](#)

---

## 📋 Tabla de contenido

- [Descripción](#-descripción)
- [Estructura del kit](#-estructura-del-kit)
- [Documentos incluidos](#-documentos-incluidos)
- [Datos de la empresa](#-datos-de-la-empresa)
- [Requisitos](#-requisitos)
- [Uso rápido](#-uso-rápido)
- [Personalización](#-personalización)
- [Normativa aplicada](#-normativa-aplicada)
- [Descarga rápida](#-descarga-rápida)
- [Licencia](#-licencia)

---

## 📖 Descripción

Este repositorio contiene el **Kit de Ingreso del Trabajador** completo para **ALIKA PETS** (Grupo Caval 1003, C.A.), empresa venezolana dedicada a la atención clínica veterinaria, comercialización de productos para mascotas y servicios de peluquería canina.

El kit incluye **39 documentos Word editables (.docx)** organizados en 10 bloques temáticos, cubriendo el 100% de las exigencias legales venezolanas (LOTTT, LOPCYMAT, LOPDP, NT-01-2008, NT-02-2008) y políticas internas específicas para el sector veterinario.

### Características principales

- ✅ **39 documentos** Word editables, listos para imprimir y firmar
- ✅ **7 contratos individuales** (uno por cargo) con cláusulas específicas para veterinarios
- ✅ **5 notificaciones de riesgos** específicas por rol con matriz probabilidad × consecuencia
- ✅ **4 protocolos veterinarios** técnicos (bioseguridad, sustancias controladas, mordeduras/zoonosis, incidentes)
- ✅ **Documentación Python completa** (~7,950 líneas) para regenerar todos los formatos
- ✅ **Política de remuneraciones** con discriminación salarial/no salarial conforme a LOTTT
- ✅ Razón social correcta (**Grupo Caval 1003, C.A.**, RIF J501662533)
- ✅ Firma centralizada en **Directora Gerente** (Esnatlim Elena Simoza, C.I. V-17.976.287)

---

## 🗂 Estructura del kit

```
kit_ingreso_alika_pets/
│
├── 00_Checklist_Maestro_Ingreso_Trabajador.docx       ← control maestro (A4 horizontal)
│
├── 01_Solicitud_de_Empleo/
│   └── Solicitud_de_Empleo_Ficha_Ingreso.docx         ← 8 secciones, 2 páginas
│
├── 02_CONTRATOS/                                      ← 7 contratos (uno por cargo)
│   ├── 02a_Contrato_Gerente.docx
│   ├── 02b_Contrato_Encargado_Clinica.docx
│   ├── 02c_Contrato_Encargado_Tienda.docx
│   ├── 02d_Contrato_Medico_Veterinario.docx           ← + cláusula historias clínicas
│   ├── 02e_Contrato_Auxiliar_Veterinario.docx         ← + cláusula historias clínicas
│   ├── 02f_Contrato_Dog_Groomer.docx                  ← + cláusula historias clínicas
│   └── 02g_Contrato_Asistente_Ventas.docx
│
├── 03_DESCRIPCION_DE_CARGOS/                          ← 7 descripciones con carta de recepción
│   ├── 03a_Funciones_Gerente.docx
│   ├── 03b_Funciones_Encargado_Clinica.docx
│   ├── 03c_Funciones_Encargado_Tienda.docx
│   ├── 03d_Funciones_Medico_Veterinario.docx
│   ├── 03e_Funciones_Auxiliar_Veterinario.docx
│   ├── 03f_Funciones_Dog_Groomer.docx
│   └── 03g_Funciones_Asistente_Ventas.docx
│
├── 04_PRESTACIONES/
│   ├── Autorizacion_Deposito_Prestaciones.docx        ← Art. 143 LOTTT
│   └── Designacion_Beneficiarios.docx                 ← Art. 137 LOTTT
│
├── 05_SEGURIDAD_LABORAL/                              ← 9 documentos
│   ├── Acta_Entrega_EPP.docx
│   ├── Cartilla_Bioseguridad_Veterinaria.docx         ← NT-01-2008, 9 páginas
│   ├── Examen_Medico_Pre_Empleo.docx                  ← Art. 32 LOPCYMAT + NT-02-2008
│   ├── Hoja_Recorrido_Habitual.docx                   ← Art. 69 LOPCYMAT
│   ├── Notificacion_Riesgos_Auxiliar_Veterinario.docx
│   ├── Notificacion_Riesgos_Dog_Groomer.docx
│   ├── Notificacion_Riesgos_Encargado_Tienda.docx
│   ├── Notificacion_Riesgos_Gerente.docx
│   └── Notificacion_Riesgos_Medico_Veterinario.docx
│
├── 06_REGISTROS_LEGALES/
│   └── Checklist_Constancias_IVSS_FAOV_INCES_PMSSO.docx  ← PMSSO CRÍTICO
│
├── 07_AUTORIZACIONES/
│   ├── Autorizacion_Datos_Personales_LOPDP.docx
│   ├── Autorizacion_Imagen_Redes_Sociales.docx
│   └── Autorizacion_Vigilancia_Camaras.docx
│
├── 08_POLITICAS_INTERNAS/                             ← 7 políticas
│   ├── Codigo_Conducta.docx
│   ├── Politica_Confidencialidad.docx                  ← + cláusula no competencia 12m
│   ├── Politica_Uso_Redes_Sociales.docx
│   ├── Procedimiento_Reporte_Incidentes.docx
│   ├── Protocolo_Mordeduras_Zoonosis.docx
│   ├── Protocolo_Sustancias_Controladas.docx
│   └── Reglamento_Interno.docx                        ← Art. 191 LOTTT
│
├── 09_CIERRE/
│   └── Carta_Aceptacion_General.docx
│
├── Discriminacion_Remuneraciones.docx                 ← Política salarial USD 250
├── Kit_de_Ingresos.docx                               ← Documentación con todos los códigos
│
└── *.py                                               ← 11 scripts Python
```

---

## 📄 Documentos incluidos

Total: **39 documentos Word (.docx)** + 1 política de remuneraciones + 1 documentación técnica + 11 scripts Python.

| Bloque | Cantidad | Descripción |
|--------|----------|-------------|
| 00 — Control | 1 | Checklist maestro (A4 horizontal, 6+ páginas) |
| 01 — Solicitud | 1 | Ficha de ingreso ampliada (2 páginas compacta) |
| 02 — Contratos | 7 | Un contrato por cargo, con cláusulas específicas |
| 03 — Cargos | 7 | Descripciones con funciones + carta de recepción |
| 04 — Prestaciones | 2 | Autorización depósito + designación beneficiarios |
| 05 — Seguridad | 9 | 5 notif. riesgos + EPP + examen + bioseguridad + recorrido |
| 06 — Registros | 1 | Checklist IVSS/FAOV/INCES/PMSSO (CRÍTICO) |
| 07 — Autorizaciones | 3 | LOPDP + imagen + cámaras |
| 08 — Políticas | 7 | Reglamento + código + confidencialidad + redes + 3 protocolos vet |
| 09 — Cierre | 1 | Carta de aceptación general |
| **Total** | **39** | **+ 1 remuneraciones + 1 documentación técnica** |

---

## 🏢 Datos de la empresa

| Campo | Valor |
|-------|-------|
| **Razón social** | GRUPO CAVAL 1003, C.A. |
| **RIF** | J501662533 |
| **Marca comercial** | ALIKA PETS |
| **Domicilio fiscal** | Av. Francisco de Miranda, Local N° 1, Sector Francisco de Miranda, Los Teques, Estado Miranda, Zona Postal 1201 |
| **Actividad** | Clínica veterinaria + Tienda de mascotas + Peluquería canina |
| **Directora Gerente** | Esnatlim Elena Simoza, C.I. V-17.976.287 |

### Política de remuneraciones

Total mensual: **USD 250,00** discriminados en:

| Concepto | Monto USD | Carácter | Quincenal |
|----------|-----------|----------|-----------|
| Salario Base | $50,00 | SALARIAL | $25,00 |
| Bono de Alimentación (Cestaticket) | $80,00 | SALARIAL | $40,00 |
| Bono de Buen Vivir | $40,00 | NO SALARIAL | $20,00 |
| Bono de Transporte | $40,00 | NO SALARIAL | $20,00 |
| Otros beneficios no salariales | $40,00 | NO SALARIAL | $20,00 |
| **TOTAL** | **$250,00** | — | **$125,00** |

Base de cálculo para prestaciones: USD 130,00 (salario + cestaticket).

---

## ⚙️ Requisitos

### Para regenerar los documentos

- **Python 3.6+** (para f-strings)
- **python-docx**: `pip install python-docx`
- **LibreOffice** (opcional, para conversión a PDF): `apt install libreoffice`

### Para visualizar/editar los documentos

- Microsoft Word, LibreOffice Writer, Google Docs o cualquier editor compatible con .docx

---

## 🚀 Uso rápido

### Opción 1: Descargar los documentos ya generados

Los 39 documentos `.docx` están listos en este repositorio. Solo clona o descarga el ZIP y ábrelos con tu editor de Word.

### Opción 2: Regenerar todos los documentos desde los scripts Python

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd kit_ingreso_alika_pets

# (Opcional) Crear entorno virtual
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate  # Windows

# Instalar dependencias
pip install python-docx

# Ejecutar scripts en orden
python3 gen_solicitud_v3.py          # genera 1 documento
python3 gen_contratos.py            # genera 7 contratos
python3 gen_funciones_por_cargo.py  # genera 7 descripciones
python3 gen_prestaciones.py         # genera 2 prestaciones
python3 gen_riesgos_por_rol.py      # genera 5 notificaciones
python3 gen_protocolos_vet.py       # genera 4 protocolos
python3 gen_documentos_finales_v3.py # genera 5 documentos finales
python3 gen_autorizaciones.py       # genera 3 autorizaciones
python3 gen_politicas.py            # genera 4 políticas
python3 gen_checklist_v3.py         # genera 1 checklist maestro
python3 gen_discriminacion_remuneracion.py  # genera 1 política salarial
python3 gen_kit_documentacion.py    # genera 1 doc con todos los códigos
```

Total: 39 documentos + 2 adicionales (remuneraciones y documentación).

---

## 🛠 Personalización

### Cambiar datos de la empresa

Edita las constantes al inicio del archivo `_common.py`:

```python
EMPRESA = "GRUPO CAVAL 1003, C.A."
RIF_EMP = "J501662533"
MARCA = "ALIKA PETS"
DOMICILIO_EMP = "Av. Francisco de Miranda, Local N° 1, Sector Francisco de Miranda, Los Teques, Estado Miranda, Zona Postal 1201"
```

### Cambiar la Directora Gerente

Edita en `_common.py`:

```python
DIRECTORA_NOMBRE = "ESNATLIM ELENA SIMOZA"
DIRECTORA_CARGO = "Directora Gerente"
DIRECTORA_CI = "V-17.976.287"
```

### Cambiar salarios

Edita en `gen_contratos.py`:

```python
SALARIO_BS = "210,00"     # salario mínimo Venezuela (Gaceta 7.026, abril 2025)
SALARIO_USD = "50,00"     # salario base en USD
CESTATICKET_BS = "1.500,00"
CESTATICKET_USD = "80,00"
```

Y en `gen_discriminacion_remuneracion.py` para la política salarial.

### Cambiar textos legales

Los textos de cada script están hardcodeados en español venezolano. Edítalos según las necesidades específicas del negocio.

---

## ⚖️ Normativa aplicada

Este kit cumple con la normativa venezolana vigente:

- **LOTTT** (Ley Orgánica del Trabajo, los Trabajadores y las Trabajadoras) — Gaceta 6.071 Extraordinaria, 7/05/2012
- **LOPCYMAT** (Ley Orgánica de Prevención, Condiciones y Medio Ambiente de Trabajo) — Gaceta 5.624 Extraordinaria, 31/12/2005
- **LOPDP** (Ley Orgánica de Protección de Datos Personales) — Decreto 1.419, Gaceta 6.210 Extraordinaria, 2014
- **NT-01-2008** (Norma Técnica para Sustancias, Materiales y Procesos Peligrosos)
- **NT-02-2008** (Norma Técnica sobre Vigilancia de la Salud de los Trabajadores)
- **Ley del Seguro Social Obligatorio**
- **Ley del INCES**
- **Ley del Banco de Vivienda y Hábitat** (FAOV-BVV)
- **Ley de Alimentación para los Trabajadores**
- **Ley de Ejercicio de la Medicina Veterinaria**
- **Constitución de la República Bolivariana de Venezuela** (arts. 60, 89-92)

### Salarios vigentes (abril 2025)

- Salario mínimo: Bs. 210/mes (Gaceta 7.026 Extraordinaria, 28/04/2025)
- Cestaticket: Bs. 1.500/mes
- Tipo de cambio referencial: BCV

---

## 📥 Descarga rápida

### Documentos individuales

Cada archivo `.docx` está en su carpeta correspondiente. Puedes clonar el repo o descargar el ZIP completo desde GitHub.

### Documentación completa

El archivo `Kit_de_Ingresos.docx` contiene **todos los códigos Python** (~7,950 líneas) en un solo documento Word, con portada, índice e instrucciones de uso.

---

## ⚠️ Advertencia legal

Aunque los documentos cumplen con la normativa venezolana vigente y están verificados visualmente, **se recomienda encarecidamente que un abogado laboralista revise los 7 contratos antes del primer uso formal**. Los autores no se responsabilizan por el uso indebido de estos formatos sin revisión legal profesional.

---

## 📞 Contacto

**ALIKA PETS · Grupo Caval 1003, C.A.**
- RIF: J501662533
- Av. Francisco de Miranda, Local N° 1, Los Teques, Estado Miranda, Venezuela
- Directora Gerente: Esnatlim Elena Simoza

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

Puedes usar, modificar y distribuir libremente este kit, siempre que incluyas la atribución correspondiente.

---

**Versión 3.1** · Conforme LOTTT · LOPCYMAT · LOPDP · NT-01-2008 · NT-02-2008
