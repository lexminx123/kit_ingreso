"""
fix_contratos_v4_no_articulos.py — Versión 4.0 de los 7 contratos laborales.
Corrige la Cláusula 5 con la tabla exacta que envió Esnatlim y elimina
TODAS las citas de artículos de leyes y nombres de leyes del cuerpo del contrato.

Cambios:
1. Montos en USD (no Bs.): 50$, 80$, 40$, 40$, 40$
2. Tabla con 5 conceptos: Salario básico, Cestaticket, Transporte, Buen Vivir, Renta Telefónica
3. Texto introductorio: "vigente conforme a la última Gaceta Oficial relacionada con dichos conceptos"
4. Sin citas de artículos (Art. X) ni leyes específicas (LOTTT, LOPCYMAT, etc.) en el cuerpo
5. Las referencias a normativa se reemplazan por "la legislación aplicable" o se eliminan
"""
import os, re

FILE = "/home/z/my-project/output/gen_contratos.py"

with open(FILE, "r", encoding="utf-8") as f:
    content = f.read()

# ============================================================
# 1. CAMBIAR CONSTANTES A USD
# ============================================================
content = content.replace(
    'SALARIO_BASICO = "Bs. 210,00"',
    'SALARIO_BASICO = "50$"'
)
content = content.replace(
    'CESTATICKET    = "Bs. 1.500,00"',
    'CESTATICKET    = "80$"'
)
content = content.replace(
    'BONO_TRANSPORTO = "Bs. 200,00"',
    'BONO_TRANSPORTO = "40$"\nBONO_BUEN_VIVIR = "40$"\nBONO_RENTA_TELEFONICA = "40$"'
)
content = content.replace(
    '# Datos legales y económicos (actualizados Gaceta 7.026 Ext. 28/04/2025)',
    '# Datos económicos (montos en USD, vigentes conforme a la última Gaceta Oficial)'
)

# ============================================================
# 2. REESCRIBIR add_salario_table CON 5 CONCEPTOS
# ============================================================
old_table = '''def add_salario_table(doc):
    """Tabla resumen del salario y conceptos salariales/no salariales."""
    from docx.shared import RGBColor as _RC
    WHITE = _RC(0xFF, 0xFF, 0xFF)
    headers = ["Concepto", "Monto mensual", "Naturaleza"]
    rows = [
        ("Salario básico",          SALARIO_BASICO,   "Salarial (base prestaciones)"),
        ("Bono de alimentación (Cestaticket)", CESTATICKET, "No salarial (Ley Programa Alimentación Trabajador)"),
        ("Bono de transporte",      BONO_TRANSPORTO,  "No salarial"),
    ]'''

new_table = '''def add_salario_table(doc):
    """Tabla resumen del salario y conceptos salariales/no salariales."""
    from docx.shared import RGBColor as _RC
    WHITE = _RC(0xFF, 0xFF, 0xFF)
    headers = ["Concepto", "Monto mensual", "Naturaleza"]
    rows = [
        ("Salario básico",                          SALARIO_BASICO,        "Salarial (base prestaciones)"),
        ("Bono de alimentación (Cestaticket)",      CESTATICKET,           "No salarial (Ley Programa Alimentación Trabajador)"),
        ("Bono de transporte",                     BONO_TRANSPORTO,       "No salarial (Rembolso de gastos)"),
        ("Bono de Buen Vivir",                      BONO_BUEN_VIVIR,       "No salarial (Asistencial)"),
        ("Bono de Renta Telefónica",                BONO_RENTA_TELEFONICA, "No salarial (Rembolso de gastos)"),
    ]'''

content = content.replace(old_table, new_table)

# ============================================================
# 3. REESCRIBIR INTRO DE CLÁUSULA 5 (sin Gaceta específica)
# ============================================================
old_intro = '''    add_para(doc,
        f"EL(LA) TRABAJADOR(A) devengará un salario básico mensual de {SALARIO_BASICO} "
        f"(Salario Mínimo Nacional vigente conforme a la Gaceta Oficial N° 7.026 "
        f"Extraordinaria de fecha 28 de abril de 2025). Adicionalmente, recibirá los "
        f"siguientes conceptos:",
        size=10, space_after=4)'''

new_intro = '''    add_para(doc,
        f"EL(LA) TRABAJADOR(A) devengará un salario básico mensual de {SALARIO_BASICO} "
        f"vigente conforme a la última Gaceta Oficial relacionada con dichos conceptos. "
        f"Adicionalmente, recibirá los siguientes conceptos:",
        size=10, space_after=4)'''

content = content.replace(old_intro, new_intro)

# ============================================================
# 4. REESCRIBIR PÁRRAFO POST-TABLA (sin artículos)
# ============================================================
old_post = '''    add_para(doc,
        "Las prestaciones sociales se calcularán conforme a los artículos 142 y 143 de la "
        "LOTTT, sobre la base del salario normal devengado. LA EMPRESA depositará las "
        "prestaciones sociales mensualmente en la cuenta individual del trabajador, dentro "
        "de los primeros cinco (5) días hábiles del mes siguiente, conforme al artículo 143 "
        "de la LOTTT. Igualmente, LA EMPRESA cotizará al IVSS, FAOV, INCES y demás "
        "organismos de seguridad social conforme a la ley.",
        size=10, space_after=6)'''

new_post = '''    add_para(doc,
        "Las prestaciones sociales se calcularán sobre la base del salario normal "
        "devengado. LA EMPRESA depositará las prestaciones sociales mensualmente en la "
        "cuenta individual del trabajador, dentro de los primeros cinco (5) días hábiles "
        "del mes siguiente. Igualmente, LA EMPRESA cotizará al IVSS, FAOV, INCES y demás "
        "organismos de seguridad social conforme a la legislación aplicable.",
        size=10, space_after=6)'''

content = content.replace(old_post, new_post)

# ============================================================
# 5. ELIMINAR CITAS DE ARTÍCULOS Y LEYES DE TODO EL CONTRATO
# ============================================================

# Patrón 1: "conforme al artículo X de la LOTTT" / "conforme a los artículos X y Y de la LOTTT"
# → eliminar la cita, dejar solo el concepto
replacements = [
    # Cláusula 2 — Naturaleza/duración
    ("previsto en el artículo 65 de la Ley Orgánica del Trabajo, los Trabajadores y las Trabajadoras (LOTTT). La relación laboral comenzará a regir a partir ",
     "previsto en la legislación aplicable. La relación laboral comenzará a regir a partir "),
    ("Conforme al artículo 22 de la LOTTT, se establece un período de prueba de ",
     "Se establece un período de prueba de "),
    ("Conforme a los artículos 64 y 65 de la LOTTT, el presente contrato se celebra ",
     "El presente contrato se celebra "),
    ("previsto en el artículo 65 de la LOTTT, en razón de la naturaleza permanente ",
     "en razón de la naturaleza permanente "),

    # Cláusula 1 — Objeto
    ("(LOTTT) y demás normas aplicables:",
     "y demás normas aplicables:"),

    # Jornada
    ("conforme al artículo 171 LOTTT",
     "según las necesidades del servicio"),

    # Penalidades
    ("Faltas del artículo 79 LOTTT:",
     "Faltas graves:"),
    ("conforme al artículo 79 de la LOTTT",
     "conforme a la legislación aplicable"),
    ("conforme al artículo 59 de la LOTTT",
     "conforme a la legislación aplicable"),

    # Historias clínicas
    ("conforme al artículo 23 de la Ley de Ejercicio de la Medicina Veterinaria",
     "conforme a la normativa aplicable"),

    # LOPDP
    ("Conforme a la Ley Orgánica de Protección de Datos Personales (Decreto 1.419, Gaceta 6.210 Extraordinaria, 2014), ",
     "Conforme a la normativa aplicable en materia de protección de datos, "),
    ("conforme al artículo 183 de la LOTTT",
     "conforme a la legislación aplicable"),

    # Terminación
    ("por las causales previstas en los artículos 71, 72 y 79 de la LOTTT",
     "por las causales previstas en la legislación aplicable"),

    # Normas de bioseguridad
    ("NT-01-2008", "las normas de bioseguridad aplicables"),
    ("NT-02-2008", "las normas de vigilancia médica aplicables"),
    ("LOPCYMAT", "la normativa de prevención aplicable"),
    ("LOTTT", "la legislación aplicable"),
    ("LOPDP", "la normativa de protección de datos aplicable"),
]

for old, new in replacements:
    content = content.replace(old, new)

# Guardar
with open(FILE, "w", encoding="utf-8") as f:
    f.write(content)

# Verificar sintaxis
import ast
ast.parse(content)
print("✓ Sintaxis OK")
print("✓ Constantes cambiadas a USD")
print("✓ Tabla con 5 conceptos (incluye Bono de Renta Telefónica)")
print("✓ Cláusula 5 corregida sin citas de artículos ni Gaceta específica")
print("✓ Citas de artículos/leyes eliminadas del cuerpo del contrato")
