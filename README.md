# 🏥 Nueva EPS - Consulta de Medicamentos en Tiempo Real (ITIL 4)

> **Parcial 1: Aplicación Práctica de ITIL 4 en Proyectos TIC**  
> **Asignatura:** Formulación y Evaluación de Proyectos  
> **Programa:** Ingeniería de Sistemas y Computación  
> **Modalidad:** Equipo de 3 integrantes  

Este repositorio contiene la solución completa de ingeniería para la **Transformación Digital del Servicio de Medicamentos en la Nueva EPS**, implementando de forma holística las **4 Dimensiones de la Gestión de Servicios** y los **7 Principios Guía de ITIL 4**, junto con un **Prototipo Interactivo Desplegable en GitHub Pages**, un **Dashboard Ejecutivo de SLAs/KPIs en vivo**, la **Matriz de Decisiones Tecnológicas**, el **Guión del Pitch de Sustentación para 3 Integrantes** y la **Bibliografía Académica** en formato APA 7.ª edición.

---

## 🚀 Cómo Desplegar este Proyecto en GitHub Pages (Gratis y en 2 Minutos)

El proyecto fue construido con tecnología web pura (**HTML5, CSS3 moderno y Vanilla JavaScript**), lo que significa que **no requiere compilar dependencias (`npm install`), no necesita Node.js ni servidor backend de pago**. Corre de manera 100% autónoma y gratuita en GitHub Pages.

### Opción A: Desde la consola con Git (Recomendada)
1. Abre tu terminal o PowerShell en esta carpeta:
   ```bash
   git init
   git add .
   git commit -m "feat: Sistema de consulta de medicamentos Nueva EPS con ITIL 4"
   ```
2. Crea un nuevo repositorio público en tu cuenta de [GitHub](https://github.com/new) (ejemplo: `medicamentos-nueva-eps`).
3. Conecta tu repositorio local con GitHub y sube los archivos:
   ```bash
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/medicamentos-nueva-eps.git
   git push -u origin main
   ```
4. En GitHub, ve a la pestaña **Settings** (Configuración) de tu repositorio &rarr; menú izquierdo **Pages**.
5. En la sección **Build and deployment**:
   - **Source**: Selecciona `Deploy from a branch`.
   - **Branch**: Selecciona `main` y la carpeta `/ (root)`.
   - Haz clic en **Save** (Guardar).
6. ¡Listo! En 1 minuto GitHub te dará un enlace público:  
   `https://TU-USUARIO.github.io/medicamentos-nueva-eps/`

### Opción B: Subiendo directamente los archivos por la web de GitHub
1. Crea un nuevo repositorio público en [GitHub](https://github.com/new).
2. Haz clic en **"Upload an existing file"** (Subir archivos existentes).
3. Arrastra `index.html`, `style.css`, `app.js` y `README.md`.
4. Haz clic en **"Commit changes"**.
5. Ve a **Settings &rarr; Pages**, selecciona la rama `main` y guarda.

---

## 🎯 Estructura de Entregables del Parcial

La plataforma interactiva contiene 7 módulos navegables estructurados de acuerdo a la rúbrica oficial del examen:

| Módulo en la Web | Contenido Académico / Rúbrica | Funcionalidad Interactiva |
| :--- | :--- | :--- |
| **1. Portal del Paciente** | Regla de los **3 Clics** (Keep it simple) | Buscador por cédula, filtro por ciudad/medicamento, semáforo de disponibilidad, generación de **Turno Digital Express con QR** y simulador de WhatsApp. |
| **2. Dashboard SLAs & KPIs** | Monitoreo 24/7 y telemetría Cloud | Indicadores en vivo (SLA Uptime 99.94%, latencia 1.18s, reducción de filas 64.2%, exactitud inventario 98.6%) y gráficas dinámicas SVG. |
| **3. Flujo de Valor (VSM)** | Value Streams & Desperdicios Lean | Comparativa gráfica interactiva: Flujo tradicional de 210 min (5 desperdicios) vs Flujo ITIL 4 de 15 min. |
| **4. Informe Técnico** | **FASE 1, FASE 2 y FASE 3** completas | Documento de ingeniería formal con acordeones interactivos, justificaciones profundas de arquitectura, seguridad (Ley 1581) y gestión del cambio (ADKAR). |
| **5. Matriz 7 Principios ITIL** | Cuadro comparativo de decisiones | Principio ITIL &rarr; Decisión de Ingeniería &rarr; Justificación &rarr; Impacto medible en Nueva EPS. |
| **6. Pitch para 3 Integrantes** | Video de sustentación (3 a 5 min) | Guión textual palabra por palabra balanceado para 3 personas, con apoyos visuales, consejos de oratoria y **temporizador de 5:00 minutos integrado**. |
| **7. Bibliografía & Evidencias** | Fuentes académicas y benchmark | Referencias en formato APA 7.ª Edición y análisis comparativo con proyectos reales (*MiAudifarma*, *Cruz Verde Express*, *NHS EPS* y *CVS Tracker*). |

---

## 🛠️ Arquitectura de la Solución (Información y Tecnología)

```
[ Paciente / Cuidador ]             [ Regente de Farmacia ]           [ Directivos Nueva EPS ]
   (Web PWA / WhatsApp)                (Tótem Lector QR)               (Dashboard Ejecutivo)
           │                                   │                                 │
           ▼                                   ▼                                 ▼
   ┌─────────────────────────────────────────────────────────────────────────────────┐
   │                       API Gateway Seguro (OAuth 2.0 / JWT)                      │
   └────────────────────────────────────────┬────────────────────────────────────────┘
                                            │
               ┌────────────────────────────┼────────────────────────────┐
               ▼                            ▼                            ▼
      ┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
      │  Microservicio  │          │  Microservicio  │          │  Microservicio  │
      │  Disponibilidad │          │  Turno Express  │          │ Notificaciones  │
      │    (En Memoria) │          │    (Reservas)   │          │  (WhatsApp/SMS) │
      └────────┬────────┘          └────────┬────────┘          └────────┬────────┘
               │                            │                            │
   ┌───────────┴────────────────────────────┴────────────────────────────┴───────────┐
   │              Middleware de Interoperabilidad Cloud (HL7 FHIR)                   │
   │               Change Data Capture (CDC) + Webhooks Bidireccionales              │
   └───────────┬────────────────────────────┬────────────────────────────┬───────────┘
               │                            │                            │
               ▼                            ▼                            ▼
      [ Audifarma S.A. ]            [ Droguerías Cafam ]         [ Cruz Verde Col ]
         (SAP / ERP)                    (SysMan / POS)             (WMS Logístico)
```

---

## 👥 Guión del Pitch de Sustentación (Estructurado para 3 Integrantes)

- **Integrante 1 (00:00 - 01:20 | 1m 20s):** Contexto del problema en Nueva EPS, dolor de las filas de 4 horas, Dimensión *Organizaciones y Personas* y plan de gestión del cambio *ADKAR*.
- **Integrante 2 (01:20 - 03:00 | 1m 40s):** Arquitectura Cloud sin reconstruir desde cero (*Start where you are*), principios de simplicidad y demostración en vivo de los 3 clics y el código QR.
- **Integrante 3 (03:00 - 04:30 | 1m 30s):** SLAs 24/7 (99.9% uptime), cumplimiento de KPIs (64.2% reducción de filas, 98.6% inventario), Retorno de Inversión (ROI) y cierre ejecutivo para la Junta Directiva.

---

## 📄 Archivos del Repositorio
- `index.html`: Aplicación web interactiva responsive con accesibilidad integrada.
- `style.css`: Hojas de estilo clínicas y modernas con variables CSS.
- `app.js`: Lógica funcional, catálogo de medicamentos, generador de tiques QR, gráficos SVG y cronómetro del pitch.
- `INFORME_TECNICO_ITIL4.md`: Documento académico monográfico completo para entregar en la plataforma universitaria.
- `README.md`: Documentación del proyecto e instrucciones de despliegue.
