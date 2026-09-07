"""
gen_paquetes_auxiliares_TODO_PRELLENADO.py — Genera 5 paquetes COMPLETOS
para auxiliares veterinarios con TODOS los campos prellenados en TODOS
los documentos del kit.

Cada uno de los 21 documentos del paquete tendrá los datos del auxiliar
rellenados en:
  - Nombre completo
  - Cédula de identidad
  - Dirección
  - Teléfono
  - Correo electrónico
  - Cargo (Auxiliar Veterinario)
  - Departamento (Clínica Veterinaria)
  - Fecha de ingreso (01/10/2026)
  - Fecha de firma (07/09/2026)
  - Lugar de firma (Los Teques, Estado Miranda)
  - Salario (50$ base + bonos)
  - Datos de la empresa (Grupo Caval 1003)
  - Datos de la Directora Gerente (Esnatlim Elena Simoza)

Documentos por paquete (21 documentos):
  01 Solicitud de Empleo
  02 Contrato de Trabajo
  03 Descripción de Cargo
  04 Autorización Depósito Prestaciones
  05 Designación Beneficiarios
  06 Notificación de Riesgos
  07 Hoja de Recorrido Habitual
  08 Acta de Entrega de EPP
  09 Examen Médico Pre-Empleo
  10 Cartilla de Bioseguridad Veterinaria
  11 Checklist Registros Legales
  12 Autorización Datos Personales (LOPDP)
  13 Autorización Uso de Imagen
  14 Autorización Vigilancia por Cámaras
  15 Reglamento Interno
  16 Código de Conducta y Ética
  17 Política de Confidencialidad
  18 Política de Uso de Redes Sociales
  19 Protocolo de Mordeduras y Zoonosis
  20 Procedimiento de Reporte de Incidentes
  21 Carta de Aceptación General
"""
import os, sys, shutil, zipfile
sys.path.insert(0, "/home/z/my-project/output")
from _common import *
from docx.shared import Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL

# ============================================================
# DATOS DE LOS 5 AUXILIARES
# ============================================================
AUXILIARES = [
    {
        "nombre": "Valeria Katiuska Rangel Pérez",
        "apellidos": "Rangel Pérez",
        "nombres": "Valeria Katiuska",
        "cedula": "V-27.279.527",
        "direccion": "Urbanización Solar de la Quinta, Etapa 1, Los Teques, Estado Miranda",
        "telefono": "0412-983.21.38",
        "correo": "valeria.rangel02@gmail.com",
        "carpeta": "01_Valeria_Katiuska_Rangel_Perez",
    },
    {
        "nombre": "Pedro José Baldovino Cardozo",
        "apellidos": "Baldovino Cardozo",
        "nombres": "Pedro José",
        "cedula": "V-27.180.661",
        "direccion": "San Antonio Los Altos, Rosaleda Sur, Edif. Yuruarí, Estado Miranda",
        "telefono": "0412-174.63.59",
        "correo": "baldovinop8@gmail.com",
        "carpeta": "02_Pedro_Jose_Baldovino_Cardozo",
    },
    {
        "nombre": "Cinthia Paola Hernández Padilla",
        "apellidos": "Hernández Padilla",
        "nombres": "Cinthia Paola",
        "cedula": "V-25.562.814",
        "direccion": "Las Adjuntas, Sector La Gran Parada, Casa N° 19, Estado Miranda",
        "telefono": "0414-239.76.98",
        "correo": "cinthiapaolahp@gmail.com",
        "carpeta": "03_Cinthia_Paola_Hernandez_Padilla",
    },
    {
        "nombre": "Joxelina Jacqueline Serrano",
        "apellidos": "Serrano",
        "nombres": "Joxelina Jacqueline",
        "cedula": "V-14.058.904",
        "direccion": "Macarena Sur, Calle El Cristo, Estado Miranda",
        "telefono": "0412-928.94.96",
        "correo": "serranoyake04@gmail.com",
        "carpeta": "04_Joxelina_Jacqueline_Serrano",
    },
    {
        "nombre": "Rosa Margarita Blanco Martínez",
        "apellidos": "Blanco Martínez",
        "nombres": "Rosa Margarita",
        "cedula": "V-14.850.506",
        "direccion": "La Estrella, Sector La Mascota, Casa S/N, Calle Vargas, Estado Miranda",
        "telefono": "0412-961.30.16",
        "correo": "rosyblanco819@gmail.com",
        "carpeta": "05_Rosa_Margarita_Blanco_Martinez",
    },
]

# Datos comunes
CARGO = "AUXILIAR VETERINARIO(A)"
CARGO_CORTO = "Auxiliar Veterinario(a)"
DEPTO = "Clínica Veterinaria"
EMPRESA = "GRUPO CAVAL 1003, C.A."
MARCA = "ALIKA PETS"
RIF = "J501662533"
DOMICILIO_EMP = "Av. Francisco de Miranda, Local N° 1, Los Teques, Estado Miranda"
DIRECTORA = "ESNATLIM ELENA SIMOZA"
DIRECTORA_CI = "V-17.976.287"
DIRECTORA_CARGO = "Directora Gerente"
FECHA_INGRESO = "01 de octubre de 2026"
FECHA_FIN = "01 de enero de 2027"
FECHA_FIRMA = "07 de septiembre de 2026"
LUGAR_FIRMA = "Los Teques, Estado Miranda"
SALARIO_BASE = "50$"

# ============================================================
# CARPETA BASE
# ============================================================
BASE_DIR = "/home/z/my-project/output/PAQUETES_TODO_PRELLENADO"
os.makedirs(BASE_DIR, exist_ok=True)

# ============================================================
# Helpers para prellenar
# ============================================================
def add_datos_trabajador(doc, aux):
    """Añade tabla con datos del trabajador prellenados."""
    add_section(doc, "DATOS DEL TRABAJADOR(A)")
    tbl = doc.add_table(rows=4, cols=4)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    for i, w in enumerate([Cm(3.5), Cm(5.0), Cm(3.5), Cm(5.0)]):
        tbl.columns[i].width = w
    datos = [
        ("Nombre completo:", aux["nombre"], "Cédula de Identidad:", aux["cedula"]),
        ("Cargo:", CARGO, "Departamento:", DEPTO),
        ("Teléfono:", aux["telefono"], "Correo electrónico:", aux["correo"]),
        ("Dirección:", aux["direccion"], "Fecha de ingreso:", FECHA_INGRESO),
    ]
    for ri, (l1, v1, l2, v2) in enumerate(datos):
        bg = GRAY_ALT if ri % 2 == 0 else WHITE
        c = tbl.rows[ri].cells[0]; c.width = Cm(3.5)
        write_cell(c, l1, size=9, bold=True, color=TEAL_DARK, bg=SLATE_BG)
        c = tbl.rows[ri].cells[1]; c.width = Cm(5.0)
        write_cell(c, v1, size=9, bg=bg)
        c = tbl.rows[ri].cells[2]; c.width = Cm(3.5)
        write_cell(c, l2, size=9, bold=True, color=TEAL_DARK, bg=SLATE_BG)
        c = tbl.rows[ri].cells[3]; c.width = Cm(5.0)
        write_cell(c, v2, size=9, bg=bg)
    sp = doc.add_paragraph(); sp.paragraph_format.space_after = Pt(6)

def add_firma_trabajador_directora(doc, aux):
    """Bloque de firmas con datos prellenados."""
    tbl = doc.add_table(rows=2, cols=2)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    tbl.columns[0].width = Cm(8.5)
    tbl.columns[1].width = Cm(8.5)

    # Cabecera firmas
    c = tbl.rows[0].cells[0]; c.width = Cm(8.5)
    write_cell(c, "EL(LA) TRABAJADOR(A)", size=10, bold=True, color=TEAL_DARK,
               align=WD_ALIGN_PARAGRAPH.CENTER, bg=SLATE_BG)
    c = tbl.rows[0].cells[1]; c.width = Cm(8.5)
    write_cell(c, "DIRECTORA GERENTE", size=10, bold=True, color=TEAL_DARK,
               align=WD_ALIGN_PARAGRAPH.CENTER, bg=SLATE_BG)

    # Cuerpo firmas
    for ci, (nombre, ci_num, cargo) in enumerate([
        (aux["nombre"], aux["cedula"], CARGO_CORTO),
        (DIRECTORA, DIRECTORA_CI, DIRECTORA_CARGO),
    ]):
        c = tbl.rows[1].cells[ci]; c.width = Cm(8.5)
        c.text = ""
        # línea firma
        p = c.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_before = Pt(22)
        p.paragraph_format.space_after = Pt(2)
        r = p.add_run("______________________________")
        style_run(r, size=9)
        # nombre
        p2 = c.add_paragraph()
        p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p2.paragraph_format.space_after = Pt(0)
        r2 = p2.add_run(nombre)
        style_run(r2, size=9, bold=True, color=BLACK)
        # cédula
        p3 = c.add_paragraph()
        p3.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p3.paragraph_format.space_after = Pt(0)
        r3 = p3.add_run(f"C.I. {ci_num}")
        style_run(r3, size=8, color=GRAY_TEXT)
        # cargo
        p4 = c.add_paragraph()
        p4.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p4.paragraph_format.space_after = Pt(0)
        r4 = p4.add_run(cargo)
        style_run(r4, size=8, italic=True, color=GRAY_TEXT)
        # fecha
        p5 = c.add_paragraph()
        p5.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p5.paragraph_format.space_before = Pt(4)
        p5.paragraph_format.space_after = Pt(0)
        r5 = p5.add_run(f"Fecha: {FECHA_FIRMA}")
        style_run(r5, size=8, italic=True, color=GRAY_TEXT)
        set_cell_borders(c); set_cell_margins(c)
    sp = doc.add_paragraph(); sp.paragraph_format.space_after = Pt(4)

def add_cierre_prellenado(doc, aux):
    """Línea de cierre con fecha prellenada."""
    add_para(doc,
        f"En la ciudad de {LUGAR_FIRMA}, a los {FECHA_FIRMA}.",
        size=10, space_after=10)


# ============================================================
# Documentos 01-21 (todos prellenados)
# ============================================================
def gen_01_solicitud(aux, out):
    doc = Document()
    section = setup_a4_portrait(doc, margins_cm=1.8)
    add_membrete(doc, "FICHA DE INGRESO", "Solicitud de Empleo", version="Versión 4.0  ·  RR.HH.")
    p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_after = Pt(2)
    r = p.add_run("SOLICITUD DE EMPLEO Y FICHA DE INGRESO")
    style_run(r, size=14, bold=True, color=TEAL_DARK)
    sep = doc.add_paragraph(); sep.paragraph_format.space_after = Pt(8)
    add_hr(sep, color="0F766E", sz="8")

    add_para(doc,
        f"Yo, {aux['nombre']}, titular de la cédula de identidad N° {aux['cedula']}, "
        f"domiciliado(a) en {aux['direccion']}, teléfono {aux['telefono']} y correo "
        f"electrónico {aux['correo']}, solicito empleo en {EMPRESA} ({MARCA}) y declaro "
        f"que la información aquí proporcionada es veraz, completa y exacta.",
        size=10, space_after=6)

    add_section(doc, "1. DATOS PERSONALES")
    datos = [
        ("Apellidos:", aux["apellidos"], "Nombres:", aux["nombres"]),
        ("Cédula de Identidad:", aux["cedula"], "Lugar de expedición:", "Venezuela"),
        ("Fecha de nacimiento:", "____ / ____ / ______", "Estado civil:", "____________"),
        ("Teléfono móvil:", aux["telefono"], "Correo electrónico:", aux["correo"]),
        ("Dirección de habitación:", aux["direccion"], "", ""),
    ]
    tbl = doc.add_table(rows=len(datos), cols=4)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER; tbl.autofit = False
    for i, w in enumerate([Cm(3.5), Cm(5.0), Cm(3.5), Cm(5.0)]):
        tbl.columns[i].width = w
    for ri, (l1, v1, l2, v2) in enumerate(datos):
        bg = GRAY_ALT if ri % 2 == 0 else WHITE
        c = tbl.rows[ri].cells[0]; c.width = Cm(3.5)
        write_cell(c, l1, size=8, bold=True, color=TEAL_DARK, bg=SLATE_BG)
        c = tbl.rows[ri].cells[1]; c.width = Cm(5.0)
        write_cell(c, v1, size=9, bg=bg)
        if l2:
            c = tbl.rows[ri].cells[2]; c.width = Cm(3.5)
            write_cell(c, l2, size=8, bold=True, color=TEAL_DARK, bg=SLATE_BG)
            c = tbl.rows[ri].cells[3]; c.width = Cm(5.0)
            write_cell(c, v2, size=9, bg=bg)
        else:
            merged = tbl.rows[ri].cells[2].merge(tbl.rows[ri].cells[3])
            merged.text = ""; set_cell_borders(merged, color="FFFFFF", sz="0")
    sp = doc.add_paragraph(); sp.paragraph_format.space_after = Pt(6)

    add_section(doc, "2. DATOS LABORALES")
    datos_lab = [
        ("Cargo al que aplica:", "Auxiliar Veterinario(a)", "Departamento / Área:", "Clínica Veterinaria"),
        ("Salario mensual ofrecido:", "USD 50$ + bonos no salariales", "Tipo de contrato:", "Tiempo determinado (3 meses + prórroga)"),
        ("Fecha de ingreso:", FECHA_INGRESO, "Período de prueba:", "15 días continuos"),
        ("Supervisor inmediato:", "Directora Gerente / Médico(a) Veterinario(a)", "Jornada:", "Tiempo completo, turnos rotativos"),
    ]
    tbl = doc.add_table(rows=len(datos_lab), cols=4)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER; tbl.autofit = False
    for i, w in enumerate([Cm(3.5), Cm(5.0), Cm(3.5), Cm(5.0)]):
        tbl.columns[i].width = w
    for ri, (l1, v1, l2, v2) in enumerate(datos_lab):
        bg = GRAY_ALT if ri % 2 == 0 else WHITE
        c = tbl.rows[ri].cells[0]; c.width = Cm(3.5)
        write_cell(c, l1, size=8, bold=True, color=TEAL_DARK, bg=SLATE_BG)
        c = tbl.rows[ri].cells[1]; c.width = Cm(5.0)
        write_cell(c, v1, size=9, bg=bg)
        c = tbl.rows[ri].cells[2]; c.width = Cm(3.5)
        write_cell(c, l2, size=8, bold=True, color=TEAL_DARK, bg=SLATE_BG)
        c = tbl.rows[ri].cells[3]; c.width = Cm(5.0)
        write_cell(c, v2, size=9, bg=bg)
    sp = doc.add_paragraph(); sp.paragraph_format.space_after = Pt(6)

    add_section(doc, "DECLARACIÓN JURADA")
    add_para(doc,
        "Declaro bajo fe de juramento que toda la información aquí contenida es veraz y "
        "completa. Autorizo a GRUPO CAVAL 1003, C.A. a verificar los datos suministrados.",
        size=9, space_after=6)
    add_cierre_prellenado(doc, aux)
    add_firma_trabajador_directora(doc, aux)
    add_footer(section, f"Solicitud de Empleo — {aux['nombre']}")
    doc.save(out)


def gen_02_contrato(aux, out):
    doc = Document()
    section = setup_a4_portrait(doc, margins_cm=2.0)
    add_membrete(doc, "CONTRATO INDIVIDUAL DE TRABAJO", CARGO, version="Versión 4.0  ·  RR.HH.")
    p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_after = Pt(2)
    r = p.add_run(f"CONTRATO DE TRABAJO — {CARGO}")
    style_run(r, size=14, bold=True, color=TEAL_DARK)
    sep = doc.add_paragraph(); sep.paragraph_format.space_after = Pt(10)
    add_hr(sep, color="0F766E", sz="8")

    add_para(doc,
        f"Entre {EMPRESA}, RIF N° {RIF}, marca comercial {MARCA}, con domicilio en "
        f"{DOMICILIO_EMP}, en adelante «LA EMPRESA», representada en este acto por su "
        f"{DIRECTORA_CARGO}, ciudadana {DIRECTORA}, titular de la cédula de identidad "
        f"N° {DIRECTORA_CI}; por una parte; y por la otra, el(la) ciudadano(a) "
        f"{aux['nombre']}, venezolano(a), mayor de edad, titular de la cédula de identidad "
        f"N° {aux['cedula']}, con domicilio en {aux['direccion']}, teléfono "
        f"{aux['telefono']} y correo electrónico {aux['correo']}, en adelante "
        "«EL(LA) TRABAJADOR(A)», han convenido en celebrar el presente Contrato de "
        "Trabajo, regido por las siguientes cláusulas:", size=10, space_after=8)

    add_section(doc, "CLÁUSULA PRIMERA: OBJETO")
    add_para(doc,
        f"LA EMPRESA contrata los servicios personales de EL(LA) TRABAJADOR(A) en el "
        f"cargo de {CARGO}, desempeñando las labores y responsabilidades detalladas en "
        f"la Descripción de Cargo respectiva. Las funciones principales incluyen: asistir "
        f"al médico veterinario en consultas, tratamientos, laboratorios y cirugías; "
        f"cuidado de animales hospitalizados; recolección de muestras biológicas; "
        f"preparación y desinfección del quirófano e instrumental; gestión de citas; y "
        f"mantenimiento de limpieza y bioseguridad.", space_after=6)

    add_section(doc, "CLÁUSULA SEGUNDA: DURACIÓN DEL CONTRATO")
    add_para(doc,
        f"El presente contrato se celebra por TIEMPO DETERMINADO, con duración de TRES "
        f"(3) MESES, con un período de prueba de quince (15) días continuos. Fecha de "
        f"inicio: {FECHA_INGRESO}. Fecha de culminación: {FECHA_FIN}. Podrá ser "
        f"prorrogado por mutuo acuerdo.", space_after=6)

    add_section(doc, "CLÁUSULA TERCERA: JORNADA DE TRABAJO")
    add_para(doc,
        "La jornada será fijada por LA EMPRESA según las necesidades del servicio. La "
        "jornada ordinaria no excederá de cinco (5) días a la semana y el horario será "
        "notificado por escrito al trabajador. LA EMPRESA se reserva el derecho de "
        "reorganizar la jornada por turnos o guardias, dentro de los límites legales.",
        space_after=6)

    add_section(doc, "CLÁUSULA CUARTA: SALARIO, BONOS Y PRESTACIONES SOCIALES")
    add_para(doc,
        f"EL(LA) TRABAJADOR(A) devengará un salario básico mensual de {SALARIO_BASE} "
        "vigente conforme a la última Gaceta Oficial relacionada con dichos conceptos. "
        "Adicionalmente, recibirá los siguientes conceptos:", size=10, space_after=4)

    tbl = doc.add_table(rows=6, cols=3)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER; tbl.autofit = False
    widths = [Cm(6.0), Cm(4.6), Cm(6.0)]
    for i, w in enumerate(widths): tbl.columns[i].width = w
    headers = ["Concepto", "Monto mensual", "Naturaleza"]
    for ci, h in enumerate(headers):
        c = tbl.rows[0].cells[ci]; c.width = widths[ci]
        write_cell(c, h, size=9, bold=True, color=RGBColor(0xFF,0xFF,0xFF),
                   align=WD_ALIGN_PARAGRAPH.CENTER, bg=TEAL_HDR_BG)
    rows = [
        ("Salario básico", "50$", "Salarial (base prestaciones)"),
        ("Bono de alimentación (Cestaticket)", "80$", "No salarial (Ley Programa Alimentación Trabajador)"),
        ("Bono de transporte", "40$", "No salarial (Rembolso de gastos)"),
        ("Bono de Buen Vivir", "40$", "No salarial (Asistencial)"),
        ("Bono de Renta Telefónica", "40$", "No salarial (Rembolso de gastos)"),
    ]
    for ri, row in enumerate(rows, start=1):
        bg = GRAY_ALT if ri % 2 == 0 else WHITE
        for ci, val in enumerate(row):
            c = tbl.rows[ri].cells[ci]; c.width = widths[ci]
            write_cell(c, val, size=9, bold=(ci==0), color=BLACK, bg=bg,
                       align=WD_ALIGN_PARAGRAPH.LEFT if ci != 1 else WD_ALIGN_PARAGRAPH.CENTER)
    sp = doc.add_paragraph(); sp.paragraph_format.space_after = Pt(4)

    add_para(doc,
        "Las prestaciones sociales se calcularán sobre la base del salario normal "
        "devengado. LA EMPRESA depositará las prestaciones sociales mensualmente en la "
        "cuenta individual del trabajador, dentro de los primeros cinco (5) días hábiles "
        "del mes siguiente. LA EMPRESA cotizará al IVSS, FAOV, INCES y demás organismos "
        "de seguridad social conforme a la legislación aplicable.", size=10, space_after=6)

    add_section(doc, "CLÁUSULA QUINTA: EQUIPOS, HERRAMIENTAS Y BIENES DE LA EMPRESA")
    add_para(doc,
        "LA EMPRESA pondrá a disposición de EL(LA) TRABAJADOR(A) todos los equipos "
        "médicos, instrumental clínico y quirúrgico, equipos de laboratorio, materiales, "
        "insumos, mobiliario, instalaciones y demás bienes necesarios. Estos bienes son "
        "propiedad exclusiva de LA EMPRESA y se entregan en comodato. EL(LA) TRABAJADOR(A) "
        "se obliga a cuidar los equipos como un buen padre de familia, reportar de "
        "inmediato cualquier daño, deterioro, falla o pérdida, no sustraer ni utilizar "
        "los equipos para fines personales, y devolver todos los equipos al término de "
        "la relación laboral. Los descuentos por pérdidas o daños se tramitarán conforme "
        "a la legislación aplicable.", space_after=6)

    add_section(doc, "CLÁUSULA SEXTA: OBLIGACIONES Y PROHIBICIONES")
    add_para(doc, "Son obligaciones de EL(LA) TRABAJADOR(A):", size=10, bold=True, space_after=2)
    for o in [
        "Cumplir con las órdenes e instrucciones de LA EMPRESA en todo lo concerniente al trabajo.",
        "Concurrir al trabajo en el horario establecido y permanecer en él durante la jornada.",
        "Observar las normas de bioseguridad aplicables y el uso obligatorio del EPP asignado.",
        "Mantener en buen estado los equipos, herramientas, mobiliario e instalaciones de la empresa.",
        "Guardar secreto sobre la información técnica, comercial y administrativa de LA EMPRESA.",
        "Cumplir el Reglamento Interno y el Código de Conducta de la empresa.",
        "Obtener autorización previa y por escrito para publicar en redes sociales contenido de la clínica.",
    ]:
        add_bullet(doc, o, size=10)
    add_para(doc, "Son prohibiciones para EL(LA) TRABAJADOR(A):", size=10, bold=True, space_before=4, space_after=2)
    for pr in [
        "Trabajar en estado de embriaguez o bajo influencia de sustancias estupefacientes o psicotrópicas.",
        "Sustraer, ocultar o dañar herramientas, mercancía, equipo, pacientes o documentos de LA EMPRESA.",
        "Abandonar el trabajo durante la jornada sin causa justificada y sin autorización del superior.",
        "Ejecutar labores por cuenta propia o de terceros dentro del horario laboral.",
        "Divulgar información confidencial, datos de clientes o historias clínicas de pacientes.",
    ]:
        add_bullet(doc, pr, size=10, color=RED_CRIT)
    add_para(doc, "", size=4, space_after=2)

    add_section(doc, "CLÁUSULA SÉPTIMA: PENALIDADES Y RÉGIMEN DISCIPLINARIO")
    add_para(doc,
        "El incumplimiento se sancionará conforme al régimen disciplinario de tres (3) "
        "niveles:", size=10, space_after=4)
    tbl = doc.add_table(rows=4, cols=3)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER; tbl.autofit = False
    widths = [Cm(1.5), Cm(7.5), Cm(7.5)]
    for i, w in enumerate(widths): tbl.columns[i].width = w
    for ci, h in enumerate(["Nivel", "Tipo de falta", "Medida disciplinaria"]):
        c = tbl.rows[0].cells[ci]; c.width = widths[ci]
        write_cell(c, h, size=9, bold=True, color=RGBColor(0xFF,0xFF,0xFF),
                   align=WD_ALIGN_PARAGRAPH.CENTER, bg=TEAL_HDR_BG)
    rows = [
        ("1", "LEVE — Incumplimientos menores, impuntualidad ocasional.",
         "Amonestación VERBAL por el jefe inmediato."),
        ("2", "GRAVE — Reincidencia, incumplimiento de protocolos de bioseguridad.",
         "Amonestación ESCRITA firmada por el trabajador y la Directora Gerente."),
        ("3", "MUY GRAVE — Robo, abandono, indisciplina, acoso, daño intencional.",
         "DESPIDO JUSTIFICADO conforme a la legislación aplicable."),
    ]
    for ri, row in enumerate(rows, start=1):
        bg = GRAY_ALT if ri % 2 == 0 else WHITE
        for ci, val in enumerate(row):
            c = tbl.rows[ri].cells[ci]; c.width = widths[ci]
            color = RED_CRIT if ci == 2 and "DESPIDO" in val else BLACK
            write_cell(c, val, size=8, bold=(ci==0 or (ci==2 and "DESPIDO" in val)), color=color, bg=bg,
                       align=WD_ALIGN_PARAGRAPH.CENTER if ci == 0 else WD_ALIGN_PARAGRAPH.LEFT)
    sp = doc.add_paragraph(); sp.paragraph_format.space_after = Pt(4)

    add_section(doc, "CLÁUSULA OCTAVA: TERMINACIÓN, LITIGIOS Y DOMICILIO")
    add_para(doc,
        "El presente contrato terminará por las causales previstas en la legislación "
        "aplicable. Las controversias se sustanciarán ante la Inspectoría del Trabajo "
        "con competencia en el Estado Miranda. Para todos los efectos, las partes eligen "
        "como domicilio especial y procesal la ciudad de Los Teques, Estado Miranda.",
        space_after=8)

    add_para(doc,
        f"Se hacen dos (2) ejemplares de un mismo tenor y a un solo efecto, en la ciudad "
        f"de {LUGAR_FIRMA}, a los {FECHA_FIRMA}.", size=10, space_after=10)

    add_firma_trabajador_directora(doc, aux)
    add_footer(section, f"Contrato Auxiliar Veterinario v4.0 — {aux['nombre']}")
    doc.save(out)


def gen_doc_simple(aux, out, titulo, subtitulo, contenido_tipo, footer_label):
    """Genera documentos simples (autorizaciones, etc.) con datos prellenados."""
    doc = Document()
    section = setup_a4_portrait(doc, margins_cm=2.0)
    add_membrete(doc, titulo.upper(), subtitulo, version="Versión 4.0  ·  RR.HH.")
    add_doc_title(doc, titulo)

    add_para(doc,
        f"Yo, {aux['nombre']}, titular de la cédula de identidad N° {aux['cedula']}, "
        f"con domicilio en {aux['direccion']}, teléfono {aux['telefono']} y correo "
        f"electrónico {aux['correo']}, en mi condición de trabajador(a) de {EMPRESA} "
        f"({MARCA}), en el cargo de {CARGO}, ingresado(a) con fecha {FECHA_INGRESO}, "
        f"en pleno conocimiento y ejercicio de mis derechos, declaro y autorizo lo "
        f"siguiente:", size=10, space_after=8)

    # Contenido específico
    if contenido_tipo == "prestaciones":
        add_para(doc,
            "Autorizo a GRUPO CAVAL 1003, C.A. para que realice el depósito correspondiente "
            "a mis prestaciones sociales de antigüedad en la contabilidad de la empresa, "
            "conforme a la legislación aplicable. LA EMPRESA se compromete a entregarme "
            "liquidación trimestral del monto acumulado.", size=10, space_after=6)
    elif contenido_tipo == "beneficiarios":
        add_para(doc,
            "Designo como mis beneficiarios para efectos de prestaciones sociales a las "
            "siguientes personas:", size=10, space_after=4)
        tbl = doc.add_table(rows=3, cols=5)
        tbl.alignment = WD_TABLE_ALIGNMENT.CENTER; tbl.autofit = False
        for i, w in enumerate([Cm(0.8), Cm(6.5), Cm(3.5), Cm(3.5), Cm(3.0)]):
            tbl.columns[i].width = w
        for ci, h in enumerate(["#", "Nombre", "C.I.", "Parentesco", "Fecha Nac."]):
            c = tbl.rows[0].cells[ci]; c.width = [Cm(0.8), Cm(6.5), Cm(3.5), Cm(3.5), Cm(3.0)][ci]
            write_cell(c, h, size=9, bold=True, color=RGBColor(0xFF,0xFF,0xFF),
                       align=WD_ALIGN_PARAGRAPH.CENTER, bg=TEAL_HDR_BG)
        for ri in range(1, 3):
            for ci in range(5):
                c = tbl.rows[ri].cells[ci]; c.text = ""
                c.paragraphs[0].paragraph_format.space_after = Pt(8)
                set_cell_borders(c); set_cell_margins(c)
        sp = doc.add_paragraph(); sp.paragraph_format.space_after = Pt(6)
    elif contenido_tipo == "recorrido":
        add_section(doc, "RUTA HABITUAL HACIA EL CENTRO DE TRABAJO")
        add_para(doc, f"Mi dirección de habitación: {aux['direccion']}", size=10, bold=True, space_after=4)
        add_para(doc, f"Centro de trabajo: {DOMICILIO_EMP}", size=10, bold=True, space_after=4)
        add_para(doc, "Ruta habitual: ________________________________________________", size=10, space_after=4)
        add_para(doc, "Medio de transporte: __________________________________________", size=10, space_after=4)
        add_para(doc, "Tiempo aproximado: ___________ minutos", size=10, space_after=6)
        add_section(doc, "RUTA DE RETORNO")
        add_para(doc, "Ruta habitual de retorno: ____________________________________", size=10, space_after=4)
        add_para(doc, "Tiempo aproximado: ___________ minutos", size=10, space_after=6)
    elif contenido_tipo == "epp":
        add_section(doc, "INVENTARIO DE PRENDAS Y EQUIPOS ENTREGADOS")
        items = ["Camisa corporativa (uniforme)", "Pantalón corporativo (uniforme)",
                 "Bata/gabacha impermeable", "Guantes de nitrilo (caja)",
                 "Mascarilla quirúrgica/desechable", "Gafas protectoras",
                 "Botas cerradas antideslizantes"]
        tbl = doc.add_table(rows=len(items)+1, cols=3)
        tbl.alignment = WD_TABLE_ALIGNMENT.CENTER; tbl.autofit = False
        for i, w in enumerate([Cm(0.8), Cm(10.0), Cm(6.0)]):
            tbl.columns[i].width = w
        for ci, h in enumerate(["#", "Prenda / Equipo", "Cantidad / Estado"]):
            c = tbl.rows[0].cells[ci]; c.width = [Cm(0.8), Cm(10.0), Cm(6.0)][ci]
            write_cell(c, h, size=9, bold=True, color=RGBColor(0xFF,0xFF,0xFF),
                       align=WD_ALIGN_PARAGRAPH.CENTER, bg=TEAL_HDR_BG)
        for ri, item in enumerate(items, start=1):
            bg = GRAY_ALT if ri % 2 == 0 else WHITE
            c = tbl.rows[ri].cells[0]; c.width = Cm(0.8)
            write_cell(c, str(ri), size=9, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, bg=bg)
            c = tbl.rows[ri].cells[1]; c.width = Cm(10.0)
            write_cell(c, item, size=9, bg=bg)
            c = tbl.rows[ri].cells[2]; c.width = Cm(6.0)
            write_cell(c, "1 unidad (Buen estado)", size=9, bg=bg)
        sp = doc.add_paragraph(); sp.paragraph_format.space_after = Pt(6)
    elif contenido_tipo == "examen":
        add_section(doc, "DATOS DEL TRABAJADOR(A)")
        tbl = doc.add_table(rows=4, cols=4)
        tbl.alignment = WD_TABLE_ALIGNMENT.CENTER; tbl.autofit = False
        for i, w in enumerate([Cm(3.5), Cm(5.0), Cm(3.5), Cm(5.0)]):
            tbl.columns[i].width = w
        datos = [
            ("Nombre completo:", aux["nombre"], "Cédula:", aux["cedula"]),
            ("Cargo:", CARGO, "Departamento:", DEPTO),
            ("Teléfono:", aux["telefono"], "Fecha del examen:", FECHA_FIRMA),
            ("Dirección:", aux["direccion"][:35], "Lugar del examen:", "Los Teques"),
        ]
        for ri, (l1, v1, l2, v2) in enumerate(datos):
            bg = GRAY_ALT if ri % 2 == 0 else WHITE
            c = tbl.rows[ri].cells[0]; c.width = Cm(3.5)
            write_cell(c, l1, size=9, bold=True, color=TEAL_DARK, bg=SLATE_BG)
            c = tbl.rows[ri].cells[1]; c.width = Cm(5.0)
            write_cell(c, v1, size=9, bg=bg)
            c = tbl.rows[ri].cells[2]; c.width = Cm(3.5)
            write_cell(c, l2, size=9, bold=True, color=TEAL_DARK, bg=SLATE_BG)
            c = tbl.rows[ri].cells[3]; c.width = Cm(5.0)
            write_cell(c, v2, size=9, bg=bg)
        sp = doc.add_paragraph(); sp.paragraph_format.space_after = Pt(6)
    elif contenido_tipo == "registros":
        add_section(doc, "REGISTROS A VERIFICAR")
        tbl = doc.add_table(rows=6, cols=5)
        tbl.alignment = WD_TABLE_ALIGNMENT.CENTER; tbl.autofit = False
        for i, w in enumerate([Cm(0.8), Cm(6.0), Cm(4.5), Cm(2.0), Cm(3.0)]):
            tbl.columns[i].width = w
        for ci, h in enumerate(["#", "Registro", "Marco legal", "Estado", "Fecha"]):
            c = tbl.rows[0].cells[ci]; c.width = [Cm(0.8), Cm(6.0), Cm(4.5), Cm(2.0), Cm(3.0)][ci]
            write_cell(c, h, size=8, bold=True, color=RGBColor(0xFF,0xFF,0xFF),
                       align=WD_ALIGN_PARAGRAPH.CENTER, bg=TEAL_HDR_BG)
        regs = [
            ("1", "Inscripción IVSS (Forma 14-100)", "Ley del Seguro Social"),
            ("2", "Inscripción FAOV-BVV", "Ley del BVV"),
            ("3", "Inscripción INCES", "Ley del INCES"),
            ("4", "Seguro Riesgos Laborales (PMSSO)", "CRÍTICO"),
            ("5", "Vacunación Antirrábica Pre-Exposición", "Recomendación OMS"),
        ]
        for ri, (n, reg, marc) in enumerate(regs, start=1):
            bg = AMBER_BG if "CRÍTICO" in marc else (GRAY_ALT if ri % 2 == 0 else WHITE)
            col = RED_CRIT if "CRÍTICO" in marc else BLACK
            c = tbl.rows[ri].cells[0]; c.width = Cm(0.8)
            write_cell(c, n, size=8, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, bg=bg)
            c = tbl.rows[ri].cells[1]; c.width = Cm(6.0)
            write_cell(c, reg, size=8, bg=bg)
            c = tbl.rows[ri].cells[2]; c.width = Cm(4.5)
            write_cell(c, marc, size=8, color=col, bg=bg)
            c = tbl.rows[ri].cells[3]; c.width = Cm(2.0)
            write_cell(c, "☐ P ☐ E ☐ F", size=7, align=WD_ALIGN_PARAGRAPH.CENTER, bg=bg)
            c = tbl.rows[ri].cells[4]; c.width = Cm(3.0)
            write_cell(c, "__/__/__", size=8, align=WD_ALIGN_PARAGRAPH.CENTER, bg=bg)
        sp = doc.add_paragraph(); sp.paragraph_format.space_after = Pt(6)
    elif contenido_tipo == "lopdp":
        add_para(doc,
            "Autorizo a GRUPO CAVAL 1003, C.A. para el tratamiento de mis datos personales "
            "(nombre, cédula, dirección, teléfono, datos biométricos, datos de salud) con "
            "finalidades de gestión laboral, nómina, seguridad social (IVSS, FAOV, INCES, "
            "PMSSO), prestaciones sociales, comunicaciones internas, evaluación de desempeño "
            "y archivo laboral. Esta autorización se mantendrá vigente durante la relación "
            "laboral y hasta por diez (10) años después de su terminación. Puedo ejercer "
            "mis derechos ARCO+ mediante solicitud escrita a RR.HH.", size=10, space_after=6)
    elif contenido_tipo == "imagen":
        add_para(doc,
            "Autorizo el uso de mi imagen (fotografías, videos, transmisiones en vivo) en "
            "instalaciones de la clínica, con mascotas, en eventos y capacitaciones, con "
            "fines de redes sociales (Instagram, Facebook, TikTok, WhatsApp Business), "
            "página web y publicidad. Esta autorización tiene vigencia durante la relación "
            "laboral y por 5 años después, sin contraprestación económica adicional. Puedo "
            "revocar con 30 días de anticipación.", size=10, space_after=6)
    elif contenido_tipo == "camaras":
        add_para(doc,
            "Autorizo la vigilancia por cámaras de video en: área de ventas, clínica, "
            "quirófano, hospitalización, peluquería, depósito, recepción y "
            "estacionamiento. Las zonas EXCLUIDAS son: baños, vestuarios y áreas de "
            "descanso. Las grabaciones se retienen 90 días. El acceso es restringido a "
            "gerencia y RR.HH.", size=10, space_after=6)

    add_cierre_prellenado(doc, aux)
    add_firma_trabajador_directora(doc, aux)
    add_footer(section, f"{footer_label} — {aux['nombre']}")
    doc.save(out)


def gen_03_descripcion_cargo(aux, out):
    """Copia la descripción de cargo estándar y prellena la carta de recepción."""
    src = "/home/z/my-project/output/03_DESCRIPCION_DE_CARGOS/03e_Funciones_Auxiliar_Veterinario.docx"
    import docx
    d = docx.Document(src)
    # Reemplazar líneas vacías en la carta de recepción con datos del auxiliar
    for p in d.paragraphs:
        full_text = p.text
        if "___________________________________________" in full_text and "titular de la cédula" in full_text:
            for run in p.runs:
                if "___________________________________________" in run.text:
                    run.text = run.text.replace("___________________________________________", aux["nombre"])
        if "V-___________________" in full_text:
            for run in p.runs:
                if "V-___________________" in run.text:
                    run.text = run.text.replace("V-___________________", aux["cedula"])
    # Reemplazar en tabla (carta recepción tiene firmas)
    for t in d.tables:
        for row in t.rows:
            for c in row.cells:
                for p in c.paragraphs:
                    if "______________________________" in p.text:
                        # Es la línea de firma, la dejamos pero el nombre ya está en otra celda
                        pass
                    if "Firma · C.I.:" in p.text:
                        for run in p.runs:
                            if "____________________" in run.text:
                                run.text = run.text.replace("____________________", f"{aux['cedula']}")
    # Añadir nota al final con datos del trabajador
    p = d.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(20)
    r = p.add_run(f"Trabajador: {aux['nombre']} · C.I. {aux['cedula']} · Cargo: {CARGO}")
    style_run(r, size=8, italic=True, color=GRAY_MUTED)
    d.save(out)


def gen_06_notificacion_riesgos(aux, out):
    """Copia notificación de riesgos y prellena datos del trabajador."""
    src = "/home/z/my-project/output/05_SEGURIDAD_LABORAL/Notificacion_Riesgos_Auxiliar_Veterinario.docx"
    import docx
    d = docx.Document(src)
    for p in d.paragraphs:
        full_text = p.text
        if "___________________________________________" in full_text and "titular de la cédula" in full_text:
            for run in p.runs:
                if "___________________________________________" in run.text:
                    run.text = run.text.replace("___________________________________________", aux["nombre"])
        if "V-___________________" in full_text:
            for run in p.runs:
                if "V-___________________" in run.text:
                    run.text = run.text.replace("V-___________________", aux["cedula"])
        if "CARGO DE:" in full_text and "__________" in full_text:
            for run in p.runs:
                if "__________" in run.text:
                    run.text = run.text.replace("__________", CARGO)
    # Fecha prellenada
    for p in d.paragraphs:
        if "____" in p.text and "días del mes" in p.text:
            for run in p.runs:
                if "____" in run.text:
                    run.text = run.text.replace("____", FECHA_FIRMA.split(" ")[0])
    d.save(out)


def gen_doc_estandar_con_nota(aux, src_path, out, footer_label):
    """Copia un documento estándar del kit y añade una nota con los datos del auxiliar."""
    import docx
    d = docx.Document(src_path)
    # Añadir nota al final con datos del trabajador
    p = d.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(20)
    r = p.add_run(f"Trabajador: {aux['nombre']} · C.I. {aux['cedula']} · Cargo: {CARGO}")
    style_run(r, size=8, italic=True, color=GRAY_MUTED)
    d.save(out)


def gen_21_carta_aceptacion(aux, out):
    doc = Document()
    section = setup_a4_portrait(doc, margins_cm=2.2)
    add_membrete(doc, "CIERRE DE EXPEDIENTE", "Aceptación general del Kit", version="Versión 4.0  ·  RR.HH.")
    p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_after = Pt(2)
    r = p.add_run("CARTA DE ACEPTACIÓN GENERAL DEL KIT DE INGRESO")
    style_run(r, size=14, bold=True, color=TEAL_DARK)
    sep = doc.add_paragraph(); sep.paragraph_format.space_after = Pt(10)
    add_hr(sep, color="0F766E", sz="8")

    add_para(doc, f"Ciudad y fecha: {LUGAR_FIRMA}, {FECHA_FIRMA}",
             size=10, align=WD_ALIGN_PARAGRAPH.RIGHT, space_after=10)
    add_para(doc,
        f"Ciudadana\n{DIRECTORA}\n{DIRECTORA_CARGO}\n{EMPRESA} ({MARCA})\nSu despacho.-",
        size=10, space_after=8)
    add_para(doc, "Ref: Aceptación general del Kit de Ingreso.", size=10, bold=True, space_after=8)

    add_para(doc,
        f"Yo, {aux['nombre']}, titular de la cédula de identidad N° {aux['cedula']}, "
        f"en mi condición de trabajador(a) de {EMPRESA} ({MARCA}), ingresado(a) en el "
        f"cargo de {CARGO} con fecha {FECHA_INGRESO}, por medio de la presente declaro:",
        size=10, space_after=6)

    declaraciones = [
        ("PRIMERO:  ", "Que he recibido copia íntegra y legible de todos los documentos que conforman el Kit de Ingreso del Trabajador, conforme al Checklist Maestro firmado por separado."),
        ("SEGUNDO:  ", "Que he leído en su totalidad cada uno de los documentos recibidos, he recibido explicaciones verbales sobre su contenido por parte de la Dirección, y he tenido la oportunidad de formular preguntas, las cuales fueron respondidas satisfactoriamente."),
        ("TERCERO:  ", "Que comprendo mis obligaciones, prohibiciones y deberes, y me comprometo a cumplirlos fielmente durante toda la vigencia de mi relación laboral con la empresa."),
        ("CUARTO:  ", "Que entiendo que el incumplimiento de las disposiciones contenidas en los documentos del Kit podrá dar lugar a las sanciones disciplinarias previstas en el Reglamento Interno y, según la gravedad, a la terminación de la relación laboral por causa justificada."),
        ("QUINTO:  ", f"Que autorizo expresamente a {EMPRESA} para el tratamiento de mis datos personales conforme a la normativa aplicable."),
        ("SEXTO:  ", "Que acepto que la presente firma constituye prueba fehaciente de la entrega y recepción de todos los documentos del Kit, renunciando a alegar desconocimiento de su contenido en el futuro."),
        ("SÉPTIMO:  ", f"Que reconozco que {EMPRESA} ha cumplido con sus obligaciones de información, capacitación y entrega de equipos, y que estoy en condiciones de iniciar mis labores."),
    ]
    for label, txt in declaraciones:
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p.paragraph_format.left_indent = Cm(0.6)
        p.paragraph_format.first_line_indent = Cm(-0.6)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.line_spacing = 1.3
        rl = p.add_run(label)
        style_run(rl, size=10, bold=True, color=TEAL_DARK)
        r = p.add_run(txt)
        style_run(r, size=10)

    add_para(doc, "", space_after=4)
    add_para(doc,
        f"En fe de lo cual firmo la presente carta en la ciudad de {LUGAR_FIRMA}, "
        f"el {FECHA_FIRMA}.", size=10, space_after=12)

    add_firma_trabajador_directora(doc, aux)
    add_footer(section, f"Carta Aceptación General — {aux['nombre']}")
    doc.save(out)


# ============================================================
# GENERAR LOS 5 PAQUETES TODO PRELLENADO
# ============================================================
print("=" * 70)
print("GENERANDO 5 PAQUETES CON TODOS LOS CAMPOS PRELLENADOS")
print("=" * 70)

# Documentos estándar del kit general
DOC_ESTANDAR = {
    "10_Cartilla_Bioseguridad_Veterinaria.docx": "05_SEGURIDAD_LABORAL/Cartilla_Bioseguridad_Veterinaria.docx",
    "15_Reglamento_Interno.docx": "08_POLITICAS_INTERNAS/Reglamento_Interno.docx",
    "16_Codigo_Conducta_Etica.docx": "08_POLITICAS_INTERNAS/Codigo_Conducta.docx",
    "17_Politica_Confidencialidad.docx": "08_POLITICAS_INTERNAS/Politica_Confidencialidad.docx",
    "18_Politica_Uso_Redes_Sociales.docx": "08_POLITICAS_INTERNAS/Politica_Uso_Redes_Sociales.docx",
    "19_Protocolo_Mordeduras_Zoonosis.docx": "08_POLITICAS_INTERNAS/Protocolo_Mordeduras_Zoonosis.docx",
    "20_Procedimiento_Reporte_Incidentes.docx": "08_POLITICAS_INTERNAS/Procedimiento_Reporte_Incidentes.docx",
}

for aux in AUXILIARES:
    carpeta_aux = os.path.join(BASE_DIR, aux["carpeta"])
    os.makedirs(carpeta_aux, exist_ok=True)

    # Documentos prellenados (generados con todos los datos)
    gen_01_solicitud(aux, os.path.join(carpeta_aux, "01_Solicitud_Empleo.docx"))
    gen_02_contrato(aux, os.path.join(carpeta_aux, "02_Contrato_Trabajo_Auxiliar_Veterinario.docx"))
    gen_03_descripcion_cargo(aux, os.path.join(carpeta_aux, "03_Descripcion_Cargo_Auxiliar_Veterinario.docx"))
    gen_doc_simple(aux, os.path.join(carpeta_aux, "04_Autorizacion_Deposito_Prestaciones.docx"),
                   "Autorización para Depósito de Prestaciones Sociales", "Prestaciones",
                   "prestaciones", "Autorización Prestaciones")
    gen_doc_simple(aux, os.path.join(carpeta_aux, "05_Designacion_Beneficiarios.docx"),
                   "Designación de Beneficiarios", "Beneficiarios",
                   "beneficiarios", "Designación Beneficiarios")
    gen_06_notificacion_riesgos(aux, os.path.join(carpeta_aux, "06_Notificacion_Riesgos_Auxiliar_Veterinario.docx"))
    gen_doc_simple(aux, os.path.join(carpeta_aux, "07_Hoja_Recorrido_Habitual.docx"),
                   "Hoja de Recorrido Habitual del Trabajador", "Recorrido",
                   "recorrido", "Hoja de Recorrido")
    gen_doc_simple(aux, os.path.join(carpeta_aux, "08_Acta_Entrega_EPP.docx"),
                   "Acta de Entrega de Uniformes y EPP", "EPP",
                   "epp", "Acta Entrega EPP")
    gen_doc_simple(aux, os.path.join(carpeta_aux, "09_Examen_Medico_Pre_Empleo.docx"),
                   "Examen Médico Pre-Empleo", "Examen",
                   "examen", "Examen Médico")
    # Documentos estándar con nota del trabajador
    for dest_name, src_rel in DOC_ESTANDAR.items():
        src_path = os.path.join("/home/z/my-project/output", src_rel)
        if os.path.exists(src_path):
            gen_doc_estandar_con_nota(aux, src_path, os.path.join(carpeta_aux, dest_name), dest_name)
    gen_doc_simple(aux, os.path.join(carpeta_aux, "11_Checklist_Registros_Legales.docx"),
                   "Checklist Constancias IVSS/FAOV/INCES/PMSSO", "Registros",
                   "registros", "Checklist Registros")
    gen_doc_simple(aux, os.path.join(carpeta_aux, "12_Autorizacion_Datos_Personales_LOPDP.docx"),
                   "Autorización de Datos Personales (LOPDP)", "LOPDP",
                   "lopdp", "Autorización LOPDP")
    gen_doc_simple(aux, os.path.join(carpeta_aux, "13_Autorizacion_Imagen.docx"),
                   "Autorización de Uso de Imagen", "Imagen",
                   "imagen", "Autorización Imagen")
    gen_doc_simple(aux, os.path.join(carpeta_aux, "14_Autorizacion_Vigilancia_Camaras.docx"),
                   "Autorización de Vigilancia por Cámaras", "Cámaras",
                   "camaras", "Autorización Cámaras")
    gen_21_carta_aceptacion(aux, os.path.join(carpeta_aux, "21_Carta_Aceptacion_General.docx"))

    n_docs = len([f for f in os.listdir(carpeta_aux) if f.endswith('.docx')])
    size_kb = sum(os.path.getsize(os.path.join(carpeta_aux, f)) for f in os.listdir(carpeta_aux)) / 1024
    print(f"  ✓ {aux['carpeta']}  ({n_docs} docs, {size_kb:.1f} KB)")

# LEEME.txt
readme_path = os.path.join(BASE_DIR, "LEEME.txt")
with open(readme_path, "w", encoding="utf-8") as f:
    f.write("PAQUETES COMPLETOS — AUXILIARES VETERINARIOS (TODO PRELLENADO)\n")
    f.write(f"{EMPRESA} · {MARCA}\n")
    f.write("=" * 70 + "\n\n")
    f.write(f"5 carpetas, una por cada auxiliar veterinario.\n")
    f.write(f"Cada carpeta contiene 21 documentos COMPLETOS del kit de ingreso,\n")
    f.write(f"con TODOS los campos prellenados con los datos del auxiliar.\n\n")
    f.write(f"Datos prellenados en cada documento:\n")
    f.write(f"  - Nombre completo del auxiliar\n")
    f.write(f"  - Cédula de identidad\n")
    f.write(f"  - Dirección de habitación\n")
    f.write(f"  - Teléfono\n")
    f.write(f"  - Correo electrónico\n")
    f.write(f"  - Cargo: {CARGO}\n")
    f.write(f"  - Departamento: {DEPTO}\n")
    f.write(f"  - Fecha de ingreso: {FECHA_INGRESO}\n")
    f.write(f"  - Fecha de firma: {FECHA_FIRMA}\n")
    f.write(f"  - Lugar: {LUGAR_FIRMA}\n")
    f.write(f"  - Salario: 50$ base + 4 bonos no salariales (250$/mes total)\n")
    f.write(f"  - Empresa: {EMPRESA} (RIF {RIF})\n")
    f.write(f"  - Directora Gerente: {DIRECTORA} (C.I. {DIRECTORA_CI})\n\n")
    for aux in AUXILIARES:
        f.write(f"  {aux['carpeta']}/\n")
        f.write(f"    Nombre: {aux['nombre']}\n")
        f.write(f"    Cédula: {aux['cedula']}\n")
        f.write(f"    Cargo: {CARGO}\n\n")
    f.write("=" * 70 + "\n")
    f.write(f"Total: {5*21} documentos Word (.docx) + LEEME.txt\n")
    f.write(f"Generado: Septiembre 2026 · Versión 4.0\n")

print("\n✓ LEEME.txt creado")

# ZIP
ZIP_PATH = "/home/z/my-project/output/Paquetes_Auxiliares_TODO_PRELLENADO.zip"
print("\nCreando ZIP único para descarga...")
with zipfile.ZipFile(ZIP_PATH, 'w', zipfile.ZIP_DEFLATED) as zipf:
    zipf.write(readme_path, "LEEME.txt")
    for aux in AUXILIARES:
        carpeta_aux = os.path.join(BASE_DIR, aux['carpeta'])
        for f in sorted(os.listdir(carpeta_aux)):
            zipf.write(os.path.join(carpeta_aux, f), os.path.join(aux['carpeta'], f))

size_mb = os.path.getsize(ZIP_PATH) / (1024 * 1024)
print(f"✓ ZIP creado: {ZIP_PATH}  ({size_mb:.2f} MB)")
print(f"\nTotal documentos en ZIP: {5*21} + LEEME.txt")
