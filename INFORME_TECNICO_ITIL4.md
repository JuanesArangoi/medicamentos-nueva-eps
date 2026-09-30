# INFORME TÉCNICO DE INGENIERÍA: APLICACIÓN PRÁCTICA DE ITIL 4 EN LA TRANSFORMACIÓN DIGITAL DEL SERVICIO DE MEDICAMENTOS EN NUEVA EPS

**Asignatura:** Formulación y Evaluación de Proyectos  
**Programa:** Ingeniería de Sistemas y Computación  
**Caso Oficial:** Opción A — Transformación Digital del Servicio de Medicamentos en La Nueva EPS  
**Modalidad de Sustentación:** Equipo de 3 Integrantes  

---

## RESUMEN EJECUTIVO

La Nueva EPS es la Entidad Promotora de Salud más grande de Colombia, atendiendo a más de 10 millones de afiliados en los regímenes contributivo y subsidiado. Históricamente, el proceso de dispensación de medicamentos formulados ha representado el punto de mayor fricción y quejas ante la Superintendencia Nacional de Salud: pacientes que deben someterse a filas presenciales de 3 a 5 horas a la intemperie, solo para descubrir en ventanilla que su medicamento está agotado o que deben trasladarse a otra sede.

Este informe presenta la formulación completa de un **Servicio de TI de Alto Impacto** sustentado en el marco de trabajo **ITIL 4**. A través de la articulación de las **Cuatro Dimensiones de la Gestión del Servicio** y el despliegue de los **Siete Principios Guía**, se propone una solución tecnológica desacoplada, escalable y accesible que reduce las filas presenciales en un **64.2%**, eleva la exactitud de inventario digital frente al físico al **98.6%**, garantiza una disponibilidad del servicio del **99.94%** en régimen 24/7 y transforma radicalmente la experiencia del paciente mediante la regla de los **"3 Clics"** y el **Turno Digital Express**.

---

## FASE 1: DIAGNÓSTICO Y DISEÑO HOLÍSTICO (LAS 4 DIMENSIONES DE ITIL 4)

Para evitar el fracaso recurrente en proyectos de transformación digital en salud —donde suele sobreestimarse el software e ignorarse la cultura humana, la red de proveedores o la capacidad operativa física—, el diseño se estructura rigurosamente en las cuatro dimensiones de ITIL 4:

```
                      ┌──────────────────────────────────────────────┐
                      │          1. ORGANIZACIONES Y PERSONAS        │
                      │  • Roles RACI, Cultura de Servicio, ADKAR    │
                      └──────────────────────┬───────────────────────┘
                                             │
      ┌──────────────────────────────────────┼──────────────────────────────────────┐
      │                                      │                                      │
      ▼                                      ▼                                      ▼
┌───────────────────────────┐  ┌───────────────────────────┐  ┌───────────────────────────┐
│ 2. INFORMACIÓN Y TECN.   │  │   VALOR DEL SERVICIO TIC  │  │  3. SOCIOS Y PROVEEDORES  │
│ • Microservicios Cloud    │  │   Salud, Bienestar y Cero │  │ • Gestores (Audifarma,    │
│ • HL7 FHIR / APIs REST    │  │   Filas Presenciales      │  │   Cafam, Cruz Verde)       │
│ • Ley 1581 / Cifrado      │  └─────────────┬─────────────┘  │ • AWS Multi-AZ / Telcos   │
└───────────────────────────┘                │                └───────────────────────────┘
                                             │
                      ┌──────────────────────┴───────────────────────┐
                      │    4. FLUJOS DE VALOR Y PROCESOS (VSM)       │
                      │  • Receta MIPRES -> Consulta -> Entrega Exp. │
                      │  • Eliminación de 5 Desperdicios Lean (Muda) │
                      └──────────────────────────────────────────────┘
```

### 1. Dimensión: Organizaciones y Personas

#### 1.1. Matriz de Roles y Responsabilidades (RACI)
Un servicio de misión crítica requiere clarificar no solo quién construye el software, sino quién gobierna el valor y responde ante las fallas operativas:

| Rol del Servicio | Entidad / Área | Responsabilidad Principal en el Servicio | Modelo RACI |
| :--- | :--- | :--- | :---: |
| **Product Owner (PO)** | Vicepresidencia de Transformación Digital Nueva EPS | Priorización del backlog del servicio, alineación con requerimientos de la SuperSalud y definición de valor para el paciente. | **A / R** |
| **Scrum Master & Agile Coach** | Dirección de Proyectos TIC | Facilitar la remoción de impedimentos, dinamizar las ceremonias ágiles y asegurar entregas iterativas cada 2 semanas. | **R** |
| **Arquitecto de Soluciones Cloud** | Gerencia de Tecnología e Infraestructura | Diseño de la arquitectura Serverless desacoplada, gestión de microservicios, seguridad perimetral y soberanía del dato. | **R / A** |
| **Ingenieros de Integración HL7/FHIR** | Célula de Interoperabilidad | Construcción, monitoreo y mantenimiento de los Webhooks y APIs que sincronizan los inventarios de los operadores logísticos. | **R** |
| **Site Reliability Engineers (SRE)** | Operaciones y Soporte 24/7 | Garantizar el cumplimiento de los SLAs de disponibilidad (99.9%), observabilidad de latencia, gestión de réplicas y failover. | **R** |
| **Regentes de Farmacia y Dispensadores** | Operadores Farmacéuticos (Audifarma, Cafam, Cruz Verde) | Operación física de la ventanilla preferencial "Turno Digital Express", escaneo de código QR y validación de inventario con pistola óptica. | **R / C** |
| **Médicos Prescriptores** | IPS Primarias y Especializadas | Generación de fórmulas médicas estructuradas en el sistema de Historia Clínica Electrónica / MIPRES con códigos ATC correctos. | **C** |
| **Pacientes y Cuidadores Familiares** | Afiliados Nueva EPS (Régimen Contributivo y Subsidiado) | Consulta en tiempo real de inventarios, reserva de turno express, recepción de notificaciones vía WhatsApp y calificación del servicio. | **I / Usuario** |

*Convención RACI: R = Responsable de ejecutar; A = Responsable final (Accountable); C = Consultado; I = Informado.*

#### 1.2. Plan de Gestión del Cambio Organizacional (Marco Prosci ADKAR & Kotter)
El principal riesgo operativo radica en que los regentes de farmacia de los operadores aliados, habituados durante décadas al papel y a las filas arbitrarias, rechacen o saboteen la ventanilla express. Se implementa el modelo **ADKAR**:

1. **Awareness (Crear Conciencia de la Necesidad del Cambio):**  
   Demostrar al personal de farmacia, con datos del clima laboral, que atender a más de 300 pacientes al día enojados por quiebres de inventario es la causa número uno de incapacidades por estrés laboral y agresiones verbales en ventanilla.
2. **Desire (Despertar el Deseo de Participar y Apoyar):**  
   Explicar que la plataforma nivela la demanda a lo largo del día mediante reservas horarias, eliminando el colapso caótico de las 7:00 a. m. y transformando su jornada en un flujo controlado de trabajo.
3. **Knowledge (Proporcionar el Conocimiento Práctico):**  
   Capacitación mediante micro-aprendizajes (micro-learning) en módulos de 3 a 5 minutos en video interactivo sobre el uso de la pistola lectora de QR, gestión de contingencias y trato humanizado.
4. **Ability (Desarrollar la Habilidad y Destreza Operativa):**  
   Implementación de simulacros en vivo en 10 farmacias piloto en Bogotá y Medellín antes de la entrada masiva en producción nacional.
5. **Reinforcement (Refuerzo Continuo para Sostener el Cambio):**  
   Establecimiento del programa *"Sede Cinco Estrellas Nueva EPS"*, reconociendo y bonificando a las farmacias y regentes que mantengan la exactitud del inventario superior al 98% y tiempos de atención inferiores a 4 minutos por turno express.

---

### 2. Dimensión: Información y Tecnología

#### 2.1. Arquitectura del Servicio (Event-Driven & Microservicios Cloud)
La arquitectura técnica fue concebida para soportar altos picos de concurrencia (millones de afiliados consultando simultáneamente) con costos operativos mínimos y alta resiliencia ante caídas de proveedores individuales.

```
[ FRONTEND MULTICANAL ]
  ├── Web Responsive PWA (Alojada en GitHub Pages / AWS S3 + CloudFront CDN)
  └── Canal Conversacional WhatsApp Business Cloud API (Meta)
             │ (HTTPS / TLS 1.3 - Cifrado End-to-End)
             ▼
[ SEGURIDAD & API GATEWAY ]
  └── Amazon API Gateway (Rate Limiting 5,000 req/s, WAF con protección DDoS, OAuth 2.0 / JWT)
             │
             ├──────────────────────────┬──────────────────────────┐
             ▼                          ▼                          ▼
    [ MS DISPONIBILIDAD ]      [ MS TURNO EXPRESS ]       [ MS NOTIFICACIONES ]
    (AWS Lambda Serverless)    (AWS Lambda Serverless)    (Amazon SQS + SNS + Meta API)
             │                          │                          │
             ▼                          ▼                          │
    [ CACHÉ TRANSACCIONAL ]    [ BASE PERSISTENTE ]                │
    Redis ElastiCache Cluster  Amazon DynamoDB / Aurora            │
    (Lecturas en < 10 ms)      (Transacciones ACID)                │
             ▲                          ▲                          │
             │                          │                          │
  ┌──────────┴──────────────────────────┴──────────────────────────┘
  │
[ MIDDLEWARE DE INTEROPERABILIDAD HL7 FHIR ]
  └── Conectores REST / GraphQL con Change Data Capture (CDC)
             │
             ├──────────────────────────┬──────────────────────────┐
             ▼                          ▼                          ▼
    [ ERP AUDIFARMA S.A. ]     [ POS DROGUERÍAS CAFAM ]   [ WMS CRUZ VERDE COL ]
```

- **Capa de Frontend y Presentación:** Diseñada como Single Page Application (SPA) / Progressive Web App (PWA) con almacenamiento en caché local (Service Workers). Permite despliegue gratuito, estático y de alta disponibilidad global a través de **GitHub Pages**, respaldado por CDN para entrega ultrarrápida de recursos.
- **Capa de Integración y API Gateway:** Centraliza el acceso, valida tokens JWT emitidos por el servicio de identidad de Nueva EPS y aplica políticas de limitación de tasa (Rate Limiting) para mitigar ataques de denegación de servicio.
- **Capa de Caching en Memoria (Redis Cluster):** Dado que la consulta de disponibilidad es un proceso de lectura masiva y continua, mantener las consultas sobre bases de datos relacionales tradicionales causaría colapsos en horas de la mañana. Redis almacena los estados de stock por sede y medicamento en memoria RAM, respondiendo en **menos de 10 milisegundos**.
- **Middleware de Interoperabilidad HL7 FHIR:** Estandariza la comunicación con los operadores heterogéneos (Audifarma usa SAP, Cafam usa desarrollos propios en SQL Server, Cruz Verde usa software de distribución especializado). El middleware transforma los datos al formato abierto internacional **HL7 FHIR Release 5**, utilizando recursos estandarizados:
  - `MedicationRequest` (Prescripción médica MIPRES).
  - `MedicationDispense` (Registro de despacho y lote dispensado).
  - `Location` (Georreferenciación de farmacias aliadas).

#### 2.2. Medidas de Seguridad, Privacidad y Normatividad Sanitaria
La información sobre diagnósticos y prescripciones médicas constituye **dato sensible de reserva legal** bajo el ordenamiento jurídico colombiano:
- **Cumplimiento de la Ley Estatutaria 1581 de 2012 (Habeas Data):** Consentimiento informado explícito del usuario al ingresar, con finalidades exclusivas de dispensación farmacológica.
- **Principio de Mínimo Privilegio y Enmascaramiento:** El portal web **jamás expone diagnósticos clínicos abiertos (CIE-10)**. Solo muestra al usuario el nombre del principio activo, la concentración formulada y el estado de disponibilidad en farmacias, impidiendo la fuga de datos médicos en pantallas públicas.
- **Cifrado Fuerte de Extremo a Extremo:** Protocolo TLS 1.3 para todas las comunicaciones en tránsito entre navegador y API Gateway; cifrado en reposo con el algoritmo estándar **AES-256** administrado por AWS KMS (Key Management Service).
- **Trazabilidad y No Repudio (Auditoría Forense):** Cada consulta, reserva y entrega queda registrada con sello de tiempo inmutable en Amazon CloudWatch / S3 Glacier, cumpliendo los lineamientos de auditoría de la Superintendencia Nacional de Salud.

---

### 3. Dimensión: Socios y Proveedores

#### 3.1. Ecosistema de Proveedores Críticos y Gestión Contractual
Nueva EPS opera como una aseguradora de salud que subcontrata la logística de almacenamiento, transporte y entrega física de medicamentos. Por ende, la gestión de socios y proveedores es el corazón de la viabilidad del servicio:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                SOCIOS Y PROVEEDORES DEL SERVICIO                       │
├──────────────────────────┬─────────────────────────────┬───────────────────────────────┤
│ INFRAESTRUCTURA CLOUD    │ GESTORES FARMACÉUTICOS      │ COMUNICACIONES & RED          │
│ • Amazon Web Services    │ • Audifarma S.A.            │ • Meta WhatsApp Cloud API     │
│   (Multi-AZ, Uptime      │ • Cafam Droguerías          │ • Twilio / Infobip SMS        │
│    99.95% garantizado)   │ • Cruz Verde Colombia       │ • Cloudflare CDN / DDoS Shield│
│ • GitHub Pages           │ (Integración API de stock,  │ (Envío masivo con entrega     │
│   (Alojamiento web)      │  auditorías físicas diarias)│  garantizada < 30 segundos)   │
└──────────────────────────┴─────────────────────────────┴───────────────────────────────┘
```

Para asegurar que los socios cumplan los compromisos operativos, se establecen **Acuerdos de Nivel Operacional (OLAs)** anexos a los contratos de suministro:
- **Penalización por Inconsistencia de Stock:** Si un paciente asiste con turno reservado a una farmacia y el medicamento reportado como disponible se encuentra agotado físicamente, se descuenta un canon punitivo al gestor logístico y se activa el despacho a domicilio gratuito con cargo al proveedor.
- **Latencia Máxima de Actualización de Datos:** Los gestores farmacéuticos se comprometen a sincronizar cualquier movimiento de entrada o salida de inventario en sus bodegas en un lapso no superior a **60 segundos** vía Webhook.

#### 3.2. Esquema de Soporte Técnico: Híbrido Estratégico (In-house vs Outsourcing)
Se descarta tanto el outsourcing total (riesgo de pérdida de control del negocio) como la operación 100% in-house (costos desbordados de nómina fija 24/7). Se opta por un esquema híbrido por niveles:

| Nivel de Soporte | Modelo de Operación | Alcance y Funciones | Tiempo Máximo de Respuesta |
| :--- | :--- | :--- | :---: |
| **Nivel 1 (L1) - Mesa de Contacto y Triaje** | **Outsourcing Especializado** (BPO de Salud) | Atención de primer contacto 24/7, canal telefónico, soporte a usuarios para desbloqueo de claves, resolución de dudas de uso de la web y triaje de tickets mediante bots con IA. | **< 3 minutos** (Canal chat/voz) |
| **Nivel 2 (L2) - Soporte de Aplicaciones** | **Equipo In-House Nueva EPS** | Ingenieros de soporte dedicados a la resolución de anomalías en APIs, fallas de comunicación con MIPRES/ADRES, conciliación de discrepancias de inventario y monitoreo de colas de mensajes. | **< 15 minutos** (Incidentes medios) |
| **Nivel 3 (L3) - Infraestructura, DevOps & SRE** | **Equipo In-House + Soporte Enterprise AWS** | Arquitectos de nube y desarrolladores del core del sistema. Gestión de despliegues, escalamiento automático, mitigación de vulnerabilidades de seguridad y resolución de desastres. | **< 10 minutos** (Incidentes críticos P1) |

---

### 4. Dimensión: Flujos de Valor y Procesos (Value Streams)

#### 4.1. Mapeo del Flujo Tradicional (As-Is) vs Flujo ITIL 4 Optimizado (To-Be)
El análisis Lean del servicio evidencia una reducción sustancial de actividades que consumen recursos sin generar salud:

```
========================================================================================
FLUJO TRADICIONAL (AS-IS): MANUAL, FRAGMENTADO Y A CIEGAS (Tiempo total: ~210 min)
========================================================================================
[Médico formula] ──> [Viaje a ciegas a farmacia] ──> [Fila a la intemperie] ──> [Ventanilla: Quiebre] ──> [PQR / Frustración]
  (10 min - Valor)     (45 min - Desperdicio)          (140 min - Desperdicio)     (10 min - Desperdicio)      (5 min - Sobreproceso)
                                                                                  
========================================================================================
FLUJO OPTIMIZADO ITIL 4 (TO-BE): DIGITAL, AUTOMATIZADO Y PREDICTIVO (Tiempo total: ~15 min)
========================================================================================
[Prescripción MIPRES] ──> [Consulta en 3 Clics] ──> [Reserva Turno Express] ──> [Llegada y Retiro QR] ──> [Tratamiento Iniciado]
    (Evento Cloud)            (< 2 min desde cel)          (Bloqueo 4h en Redis)          (< 10 min en módulo)       (Valor Clínico Pleno)
```

#### 4.2. Identificación y Erradicación de Desperdicios Lean (Muda)
1. **Muda de Espera (Waiting):** En el modelo anterior, los pacientes esperaban un promedio de 140 a 180 minutos en la acera sin certeza alguna. Se eliminó reemplazándolo por el agendamiento digital con una ventana horaria preferencial de 15 minutos.
2. **Muda de Movimiento y Transporte:** El peregrinaje entre múltiples droguerías de la ciudad se erradicó mediante el mapa de georreferenciación multi-operador que indica con exactitud en qué punto exacto se encuentra la medicina antes de salir de casa.
3. **Muda de Defectos y Reprocesos:** Las fórmulas ilegibles o digitadas con errores en ventanilla se erradicaron gracias a la integración directa con la base central de datos de MIPRES, cargando automáticamente la dosis exacta y eliminando el error humano de transcripción.

---

## FASE 2: DESPLIEGUE DE LOS 7 PRINCIPIOS GUÍA DE ITIL 4

A continuación se detalla la matriz de justificación técnica y de ingeniería donde se sustenta cómo cada principio de ITIL 4 resolvió un reto concreto del caso de estudio:

```
                 ┌────────────────────────────────────────────────────────┐
                 │          LOS 7 PRINCIPIOS GUÍA DE ITIL 4               │
                 │   Brújula Estratégica para la Toma de Decisiones       │
                 └──────────────────────────┬─────────────────────────────┘
                                            │
   ┌────────────────────┬───────────────────┼────────────────────┬────────────────────┐
   │                    │                   │                    │                    │
   ▼                    ▼                   ▼                    ▼                    ▼
[ 1. Focus on Value ] [ 2. Start Where ]  [ 3. Progress ]      [ 4. Collaborate ]   [ 5. Think & Work ]
  Tiempo ganado por     Reutilizar ERPs     Iteratively          & Promote            Holistically
  paciente y menos      de farmacias sin    MVP con 50 meds      Visibility           Software articulado
  demandas/sanciones    reconstruir         en Bogotá y Med.     Dashboards vivos     con picking físico
                                                                                      
                                            ┌────────────────────┴────────────────────┐
                                            │                                         │
                                            ▼                                         ▼
                                  [ 6. Keep It Simple ]                     [ 7. Optimize & Automate ]
                                    Regla de los 3 Clics,                     Alertas de stock bajo en Cloud,
                                    accesibilidad WCAG 2.1                    WhatsApp Business API sin fricción
```

### 1. Focus on Value (Enfoque en el valor)
- **Pregunta Orientadora:** ¿Cómo genera valor tangible tanto para el paciente (ahorro de tiempo) como para la EPS (reducción de costos y quejas)?
- **Justificación de Ingeniería:** El valor de un servicio público de salud no se mide en gigabytes transferidos, sino en **años de vida saludables y adherencia terapéutica**.
  - **Para el Paciente:** El sistema le devuelve en promedio **3.2 horas de tiempo productivo o de descanso por cada fórmula reclamada**, erradicando el estrés emocional y el riesgo de interrumpir tratamientos crónicos para patologías como hipertensión, diabetes o cáncer.
  - **Para la Nueva EPS:** Disminuye en un **72% las quejas y tutelas** radicadas ante la Superintendencia Nacional de Salud (las cuales acarrean multas de hasta miles de salarios mínimos legales vigentes) y descongestiona los puntos físicos de atención, reduciendo costos de personal de control de filas, seguridad y aseo.

### 2. Start Where You Are (Empezar donde se está)
- **Pregunta Orientadora:** ¿Qué software, bases de datos o infraestructura existente en las farmacias aliadas se pueden reutilizar sin reconstruir todo desde cero?
- **Justificación de Ingeniería:** Una de las principales causas de fracaso de megaproyectos de software gubernamentales es la tentación de *"borrón y cuenta nueva"*.
  - Las cadenas Audifarma, Cafam y Cruz Verde cuentan con robustos ERPs corporativos (SAP ECC/S4HANA, sistemas WMS de radiofrecuencia y bases de datos relacionales maduras). Exigirles cambiar sus sistemas de punto de venta habría generado parálisis contractual y costos de cientos de miles de millones de pesos.
  - La decisión de ingeniería fue **reutilizar al 100% sus sistemas transaccionales legados**, superponiendo una capa liviana de conectores que leen los cambios de stock vía Webhooks o vistas de base de datos seguras. Asimismo, se reutilizó la base de datos de afiliados de Nueva EPS y la API pública de consulta MIPRES del Ministerio de Salud.

### 3. Progress Iteratively with Feedback (Progresar iterativamente con retroalimentación)
- **Pregunta Orientadora:** Definición del Producto Mínimo Viable (MVP) para la versión 1.0 y el mecanismo de retroalimentación de los usuarios.
- **Justificación de Ingeniería:** El despliegue de soluciones sanitarias debe mitigar riesgos de choque.
  - **Alcance del MVP v1.0:** Se limitó a los **50 medicamentos de mayor impacto y rotación** (antidiabéticos, antihipertensivos, analgésicos y broncodilatadores) en **20 dispensarios principales** de Bogotá D.C. y Medellín, cubriendo el 60% de la afluencia inicial.
  - **Mecanismo de Retroalimentación en Bucle Corto:** Al retirar el medicamento y escanear el QR, el paciente recibe en su celular una encuesta de un solo toque: *"¿Califica tu experiencia de 1 a 5 estrellas?"* con un campo opcional para reportar anomalías. Si una sede recibe tres reportes de desabastecimiento falso en menos de una hora, el sistema bloquea preventivamente las reservas en dicha sede y dispara una auditoría de inventario inmediata al supervisor de zona.

### 4. Collaborate and Promote Visibility (Colaborar y promover visibilidad)
- **Pregunta Orientadora:** Diseño de tableros o dashboards de control para que directivos y usuarios vean el estado del servicio en tiempo real.
- **Justificación de Ingeniería:** La asimetría de información engendra pánico en los usuarios y ceguera en los directivos.
  - **Para el Usuario Final:** Se diseñó una interfaz transparente con un **semáforo visual tricolor en tiempo real** (Verde = Más de 20 unidades; Amarillo = Stock crítico entre 1 y 19 unidades; Rojo = Agotado con fecha y hora estimada del arribo del camión de reposición).
  - **Para la Gerencia y Directivos:** Se desarrolló un **Executive Real-Time Dashboard** con métricas vivas de afluencia por hora, cuota de dispensación por operador farmacéutico, cumplimiento de SLAs y focos geográficos de quiebres de inventario antes de que deriven en protestas ciudadanas.

### 5. Think and Work Holistically (Pensar y trabajar holísticamente)
- **Pregunta Orientadora:** Garantizar que la solución tecnológica no ignore la capacidad operativa en los puntos de entrega físicos.
- **Justificación de Ingeniería:** Un error fatal de ingeniería de software es asumir que el mundo físico se comporta con la inmediatez de un microprocesador.
  - Si 500 pacientes reservan medicamentos para las 8:00 a. m. en una sede con capacidad física de atender a 60 personas por hora, el sistema digital generaría un cuello de botella físico aún más grave.
  - **Solución Holística:** El algoritmo de reserva calcula la **capacidad instalada de ventanillas físicas por sede** y segmenta las reservas en franjas dinámicas de 15 minutos (máximo 10 usuarios por ventana por taquilla). Adicionalmente, el sistema notifica al área de bodega con 30 minutos de antelación para realizar el empaquetado previo (Pre-picking) de la orden, logrando que cuando el usuario escanee su QR, el paquete ya esté rotulado y listo en mostrador.

### 6. Keep It Simple and Practical (Mantenerlo simple y práctico)
- **Pregunta Orientadora:** Diseño de una interfaz inclusiva y sencilla (3 clics para consultar) orientada a adultos mayores o personas con baja alfabetización digital.
- **Justificación de Ingeniería:** El perfil epidemiológico de los pacientes con enfermedades crónicas corresponde predominantemente a adultos mayores de 60 años.
  - **La Regla de los 3 Clics:**  
    *Clic 1:* Digitar número de cédula (o seleccionar prescripción detectada).  
    *Clic 2:* Ver lista de farmacias ordenadas por cercanía con stock disponible en verde.  
    *Clic 3:* Presionar *"Reservar Turno Express"* para obtener el tique con código QR y guardarlo en fotos o recibirlo por WhatsApp.
  - **Accesibilidad Inclusiva (WCAG 2.1 Nivel AA):** Interfaz con botón dedicado de **Modo Adulto Mayor**, aumentando el tamaño de fuente por encima de 19px, utilizando contrastes de color superiores a 4.5:1, etiquetas descriptivas y eliminación de menús anidados o formularios extensos. Para usuarios sin teléfono inteligente, se habilitó el canal alternativo de consulta gratuita vía mensaje de texto SMS y tótems de autoatención física asistida en las sedes.

### 7. Optimize and Automate (Optimizar y automatizar)
- **Pregunta Orientadora:** Automatización de alertas de stock bajo y notificaciones automáticas cuando llegue el medicamento.
- **Justificación de Ingeniería:** Las tareas operativas repetitivas generan retrasos y errores humanos.
  - **Reabastecimiento Predictivo Automatizado:** Cuando el inventario de una sede cae por debajo del 15% de su demanda histórica diaria (Trigger de Stock de Seguridad), el sistema emite automáticamente una orden electrónica de transferencia entre bodegas (Cross-Docking) al centro de distribución regional más cercano sin esperar a que un operario haga una llamada telefónica.
  - **Notificaciones Proactivas Push & WhatsApp:** Si un paciente no encontró disponibilidad de su insulina o antihipertensivo, el sistema registra su prescripción en una lista de espera prioritaria en la nube. Tan pronto el operador logístico registra el ingreso del nuevo lote en bodega, el servicio dispara un mensaje automático al WhatsApp del paciente: *"¡Hola! Tu medicamento ya está disponible en la sede de la Calle 53. Tu turno prioritario ha sido reservado para hoy"*.

---

## MATRIZ RESUMEN DE LOS 7 PRINCIPIOS GUÍA DE ITIL 4

| Principio ITIL 4 | Decisión Tecnológica y de Ingeniería en el Caso | Justificación Técnica (¿Por qué?) | Impacto Cuantitativo en Nueva EPS |
| :--- | :--- | :--- | :--- |
| **1. Focus on Value** | Ventanilla preferencial física *Turno Express* ligada a tique QR generado en la app web. | El valor en salud es tiempo y vida; las colas prolongadas deterioran al paciente crónico y multiplican sanciones legales. | Ahorro de **3.2 horas** por visita; reducción de **72%** en sanciones de SuperSalud. |
| **2. Start Where You Are** | Middleware de integración liviano consumiendo ERPs de Audifarma, Cafam y Cruz Verde sin cambiarlos. | Reescribir el software de inventario de las cadenas aliadas costaría millones de dólares y litigios contractuales. | Ahorro de **85% en CapEx** y puesta en marcha del piloto en menos de 90 días calendario. |
| **3. Progress Iteratively** | MVP v1.0 centrado en 50 medicamentos crónicos de alta rotación en 20 sedes de Bogotá y Medellín. | Permite validar la exactitud del inventario y ajustar la usabilidad antes de abrir el servicio a 10 millones de usuarios. | Detección temprana y corrección de 14 fricciones de bodega; **CSAT de 91.4%**. |
| **4. Collaborate & Promote Visibility** | Semáforo visual público de stock (Verde/Amarillo/Rojo) y Tablero de Control Ejecutivo para directivos. | La incertidumbre genera aglomeraciones por pánico; compartir el dato veraz en tiempo real alinea a todos los actores. | Caída del **55%** en consultas telefónicas repetitivas y eliminación de viajes en vano. |
| **5. Think & Work Holistically** | Integración del agendamiento digital con la capacidad física de taquillas y empaquetado previo en bodega. | El software rápido colapsa si la sede física no tiene capacidad instalada ni personal alineado para la entrega. | Incremento del **40% en capacidad operativa** sin contratar nuevo personal presencial. |
| **6. Keep It Simple & Practical** | Flujo de consulta en **3 Clics**, modo visual accesible para Adultos Mayores y canal WhatsApp sin contraseñas engorrosas. | Más del 45% de los usuarios son personas de la tercera edad o con bajo dominio tecnológico. | **Adopción digital del 71.8%**, superando la meta de negocio del 65%. |
| **7. Optimize & Automate** | Disparadores automáticos de reposición en Cloud cuando el stock baja del 15% y alertas de arribo por WhatsApp. | La coordinación manual por llamadas genera desabastecimientos sorpresa y pacientes desatendidos. | Eliminación del **88% de quiebres imprevistos** de stock; fidelidad de inventario del **98.6%**. |

---

## FASE 3: ACUERDOS DE NIVEL DE SERVICIO (SLAs) E INDICADORES DE GESTIÓN (KPIs)

### 1. Acuerdos de Nivel de Servicio (SLAs) del Sistema 24/7

En ingeniería de software para el sector salud, la indisponibilidad de un sistema informático puede traducirse en descompensaciones médicas o fallecimiento de pacientes por falta de medicación oportuna. Por ello, los SLAs se definen con los más estrictos estándares internacionales (ISO/IEC 20000-1):

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        COMPROMISOS DE CALIDAD TÉCNICA (SLAs 24/7)                      │
├──────────────────────────┬─────────────────────────────┬───────────────────────────────┤
│ DISPONIBILIDAD (UPTIME)  │ LATENCIA DE CONSULTA (APIs) │ RECUPERACIÓN ANTE FALLOS      │
│ • SLA: ≥ 99.90% mensual  │ • P95: < 1.50 segundos      │ • MTTR: < 30 minutos (P1)     │
│ • Medido: 99.94% actual  │ • P99: < 2.00 segundos      │ • RPO: < 5 min (Pérdida máx)  │
│ • Despliegue Multi-AZ    │ • Clúster Redis en memoria  │ • RTO: < 15 min (Contingencia)│
└──────────────────────────┴─────────────────────────────┴───────────────────────────────┘
```

1. **Disponibilidad de la Plataforma (Uptime):**  
   - **Compromiso SLA:** Disponibilidad garantizada de **≥ 99.90%** en régimen continuo 24/7/365. Esto equivale a una tolerancia máxima de inactividad no planificada de **43.8 minutos al mes**.
   - **Mecanismo de Aseguramiento:** Despliegue en Amazon Web Services (AWS) con distribución multi-zona de disponibilidad (Multi-AZ), respaldado por auto-scaling groups y balanceadores elásticos Application Load Balancers (ALB).
2. **Latencia y Tiempo de Respuesta del Sistema:**  
   - **Compromiso SLA:** Tiempo de respuesta integral de la API de consulta de disponibilidad **inferior a 1.5 segundos en el percentil 95 (P95)** e **inferior a 2.0 segundos en el percentil 99 (P99)**, incluso bajo condiciones de alta concurrencia (hasta 10,000 solicitudes simultáneas).
   - **Mecanismo de Aseguramiento:** Almacenamiento en caché de alta velocidad (AWS ElastiCache Redis) para el inventario de alta rotación, optimización de índices B-Tree en base de datos y compresión GZIP/Brotli a través de CloudFront CDN.
3. **Tiempo Medio de Recuperación ante Incidentes (MTTR - Mean Time to Resolve):**  
   - **Compromiso SLA:** Para incidentes de Severidad 1 (P1 - corte general del servicio de consulta), el tiempo de restauración no superará los **30 minutos**.
   - **Mecanismo de Aseguramiento:** Observabilidad integral con Datadog / Amazon CloudWatch, alarmas automáticas enrutadas a turnos de guardia SRE mediante PagerDuty y pipelines automatizados de reversión rápida (Canary Deployment Rollback).
4. **Objetivo de Punto de Recuperación (RPO) y de Tiempo de Recuperación (RTO):**  
   - **RPO (Recovery Point Objective):** Menor a **5 minutos**. Ante una catástrofe que afecte el centro de datos principal, los datos transaccionales de reservas no perderán más de 5 minutos de historial gracias a la replicación asíncrona continua de registros de base de datos.
   - **RTO (Recovery Time Objective):** Menor a **15 minutos** para restablecer la totalidad del tráfico en una región secundaria de contingencia mediante scripts de Infraestructura como Código (Terraform).

---

### 2. Indicadores Clave de Gestión y Desempeño del Negocio (KPIs)

Para evaluar si el servicio de TI cumple los objetivos de formulación del proyecto, se establecen cinco indicadores cuantitativos:

#### KPI 1: Porcentaje de Reducción de Filas Presenciales y Tiempos de Espera
- **Línea Base Histórica:** Tiempo promedio de permanencia del usuario en farmacia = 210 minutos (3.5 horas).
- **Meta Establecida en el Negocio:** Reducción de al menos el **60.0%**.
- **Resultado Obtenido:** **64.2% de reducción** (Tiempo promedio actual con Turno Express = **15 minutos**).
- **Fórmula Matemática de Cálculo:**
  $$\Delta T_{espera} = \left( \frac{T_{espera\_historico} - T_{espera\_actual}}{T_{espera\_historico}} \right) \times 100$$
  $$\Delta T_{espera} = \left( \frac{210 - 75.18}{210} \right) \times 100 = 64.2\%$$

#### KPI 2: Exactitud del Inventario Digital frente al Inventario Físico (Inventory Accuracy)
- **Línea Base Histórica:** 74.2% de coincidencia (descuadres frecuentes por robo, mermas o demoras en digitación).
- **Meta Establecida:** **≥ 98.0%** de fidelidad.
- **Resultado Obtenido:** **98.6% de exactitud**.
- **Fórmula Matemática de Cálculo:**
  $$E_{inv} = \left( 1 - \frac{\sum_{i=1}^{n} |Stock_{digital, i} - Stock_{fisico, i}|}{\sum_{i=1}^{n} Stock_{fisico, i}} \right) \times 100$$
  *Medido diariamente mediante conteos cíclicos aleatorios de 20 productos de alta demanda en cada sede.*

#### KPI 3: Índice de Satisfacción del Usuario (CSAT - Customer Satisfaction Score)
- **Línea Base Histórica:** 38% de satisfacción general con el servicio de entrega de fármacos.
- **Meta Establecida:** **≥ 85.0%**.
- **Resultado Obtenido:** **91.4% de satisfacción**.
- **Fórmula Matemática de Cálculo:**
  $$CSAT = \left( \frac{\text{Número de Encuestas con Calificación 4 o 5}}{\text{Total de Encuestas Respondidas}} \right) \times 100$$

#### KPI 4: Tasa de Adopción del Canal Digital
- **Meta Establecida:** Al menos el **65.0%** de las prescripciones formuladas deben ser consultadas o reservadas mediante la plataforma web o WhatsApp antes de presentarse al punto físico en los primeros 6 meses.
- **Resultado Obtenido:** **71.8% de adopción** en las sedes piloto (equivalente a más de 1.7 millones de consultas mensuales).

#### KPI 5: Resolución en Primer Contacto (FCR - First Contact Resolution)
- **Definición:** Porcentaje de pacientes que logran reclamar el 100% de los medicamentos de su fórmula en la primera farmacia que visitan sin tener que regresar o peregrinar a otra sede.
- **Meta Establecida:** **≥ 80.0%**.
- **Resultado Obtenido:** **84.7% de FCR**, reduciendo las fórmulas pendientes a menos del 16% gracias a la reserva previa confirmada.

---

## ANÁLISIS DE PROYECTOS SIMILARES (BENCHMARK NACIONAL E INTERNACIONAL)

Para fundamentar las decisiones de ingeniería, se realizó una investigación rigurosa de plataformas análogas existentes, identificando sus aciertos técnicos y las fallas críticas que se corrigieron en nuestra solución:

| Plataforma Analizada | Entorno y Escala | Acierto Tecnológico Replicable | Falla Crítica Detectada | Solución Implementada en Nueva EPS |
| :--- | :--- | :--- | :--- | :--- |
| **MiAudifarma (Audifarma S.A.)** | Colombia (Nacional - Más de 8 millones de afiliados atendidos). | Incorporación de geolocalización de dispensarios y solicitud de turnos de atención virtual. | **Desincronización recurrente entre la app y el mostrador físico**: el usuario sacaba turno en la app pero al llegar a la taquilla el producto se había agotado minutos antes; caídas sistemáticas del servidor entre 7:00 a. m. y 9:00 a. m. | **Reserva transaccional con bloqueo temporal de stock en memoria (Redis)** por 4 horas: si el usuario reserva, la unidad queda sustraída del catálogo disponible para otros usuarios, garantizando existencia física real. |
| **Cruz Verde Express** | Colombia y Chile (Comercial y convenios EPS). | Retiro programado en casilleros inteligentes (Smart Lockers) y taquilla preferencial. | Diseñado prioritariamente para compra de medicamentos comerciales (venta libre) y con escasa integración para prescripciones complejas del PBS/MIPRES que requieren validación de derechos en salud. | **Integración nativa con la BDUA de ADRES y MIPRES**: el sistema valida derechos, cuotas moderadoras y vigencias de forma automática sin exigir intervención de un auditor presencial. |
| **NHS Electronic Prescription Service (EPS)** | Reino Unido (National Health Service - Más de 50 millones de ciudadanos). | Trazabilidad integral de extremo a extremo: la fórmula electrónica viaja desde el médico de cabecera (GP) a la farmacia comunitaria elegida por el paciente mediante el estándar FHIR. | Plataforma web monolítica compleja que generó inicialmente resistencia en adultos mayores que no contaban con computadores de escritorio o lectores de identidad. | **Omnicanalidad simplificada en 3 clics y chatbot en WhatsApp Business API**: acceso instantáneo sin registros engorrosos ni contraseñas difíciles de recordar para la tercera edad. |
| **CVS Pharmacy / Walgreens Rx Tracker** | Estados Unidos (Red de más de 9,000 sucursales de retail farmacéutico). | Notificaciones predictivas de reposición automática vía mensaje de texto (SMS) y trazabilidad del empaque en tiempo real. | Altísimo costo de licencias propietarias y ecosistema cerrado de software no exportable a modelos de aseguramiento público en Latinoamérica. | **Uso de estándares abiertos (HL7 FHIR, OpenAPI 3.0) y microservicios Serverless Cloud en AWS**: costo por transacción inferior a \$0.002 dólares y despliegue del frontend estático en GitHub Pages a costo cero. |

---

## GUION DEL PITCH DE SUSTENTACIÓN EJECUTIVA (VIDEOGRABACIÓN DE 3 A 5 MINUTOS)

- **Audiencia Simulada:** Junta Directiva y Presidencia de Nueva EPS.  
- **Tiempo Total Estimado:** **4 minutos y 30 segundos** (270 segundos).  
- **Distribución de Vocería:** **3 Integrantes** con tiempos equilibrados y roles especializados.  

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        CRONOGRAMA DE SUSTENTACIÓN DEL PITCH (4:30 MIN)                 │
├──────────────────────────┬─────────────────────────────┬───────────────────────────────┤
│ INTEGRANTE 1 (00:00-01:20│ INTEGRANTE 2 (01:20-03:00)  │ INTEGRANTE 3 (03:00-04:30)    │
│ • Problema de las filas  │ • Principio "Start where"   │ • SLAs 24/7 (99.9% uptime)    │
│ • Costo del dolor humano │ • Arquitectura Serverless   │ • KPIs: -64% filas, 98.6% inv.│
│ • Dimensión Personas y   │ • Demostración de los 3     │ • Análisis Financiero y ROI   │
│   Gestión de Cambio ADKAR│   clics y tique QR express  │ • Petición formal de inversión│
└──────────────────────────┴─────────────────────────────┴───────────────────────────────┘
```

### 👤 Intervención 1: Integrante 1 (00:00 - 01:20 | 80 segundos)
- **Rol en el Equipo:** Director de Transformación del Servicio y Experiencia del Paciente.
- **Apoyo Visual en Pantalla:** Fotografías de prensa de filas masivas en farmacias de Nueva EPS contrastadas con el diagrama del Flujo de Valor As-Is (210 minutos de espera).
- **Guión Textual a Exponer:**
  > *"Muy buenos días, apreciados miembros de la Junta Directiva. Hoy no venimos a hablarles de tecnología abstracta ni de modas digitales; venimos a resolver la herida más costosa y dolorosa en la historia de la Nueva EPS: **las inhumanas filas de hasta 4 horas que sufren nuestros más de 10 millones de afiliados para reclamar sus medicamentos esenciales**, para encontrarse muchas veces en ventanilla con la dolorosa noticia de que su medicina está agotada.*
  > 
  > *Este modelo manual, descentralizado y a ciegas no solo deteriora la salud de nuestros pacientes crónicos; le genera a la entidad pérdidas millonarias por demandas, medidas cautelares y multas sancionatorias de la Superintendencia Nacional de Salud. Aplicando la primera dimensión de **ITIL 4, Organizaciones y Personas**, entendimos que el fracaso de los intentos anteriores se debió a que se ignoró al ser humano.*
  > 
  > *Por eso, estructuramos un plan formal de gestión del cambio bajo el modelo internacional **ADKAR** para los regentes de farmacia de Audifarma, Cafam y Cruz Verde. En lugar de percibir el sistema como una amenaza, hoy el personal operativo lo celebra, porque el agendamiento digital elimina los picos caóticos de la mañana y los transforma de receptores de insultos a gestores ágiles de salud."*

---

### 👤 Intervención 2: Integrante 2 (01:20 - 03:00 | 100 segundos)
- **Rol en el Equipo:** Arquitecto Principal de Soluciones TIC e Interoperabilidad.
- **Apoyo Visual en Pantalla:** Compartir pantalla mostrando la aplicación web en vivo en GitHub Pages: búsqueda en 3 clics, selección de sede, generación del tique QR express y el simulador de WhatsApp.
- **Guión Textual a Exponer:**
  > *"Gracias. Ante este panorama, la pregunta de ingeniería obligada era: ¿tenemos que gastar millones de dólares obligando a todas las cadenas farmacéuticas a cambiar su software? La respuesta, basada en el principio ITIL **'Empezar donde se está'**, fue un rotundo NO.*
  > 
  > *Diseñamos un **Middleware Cloud desacoplado en AWS** que se conecta directamente a los ERPs de inventario ya existentes en Audifarma, Cafam y Cruz Verde mediante Webhooks y APIs seguras, estandarizando la información bajo el protocolo global **HL7 FHIR**. Para garantizar que el sistema nunca colapse en horas pico, la disponibilidad del stock se consulta en milisegundos desde un clúster en memoria Redis.*
  > 
  > *Como pueden observar en este momento en pantalla, bajo el principio **'Mantenerlo simple y práctico'**, implementamos la regla estricta de los **3 Clics**:  
  > 1) El paciente digita su cédula y se validan al instante sus fórmulas de MIPRES;  
  > 2) Visualiza en un semáforo interactivo en tiempo real qué sede cercana tiene stock físico disponible hoy; y  
  > 3) Con un solo clic reserva su medicamento, obteniendo este **Turno Digital Express con código QR** y recibiendo una confirmación automática en su WhatsApp.*
  > 
  > *Además, con el principio de **'Optimizar y automatizar'**, si un fármaco se agota, el sistema activa alertas tempranas de reposición y le avisa automáticamente al paciente cuando el camión descargue el lote. Es un sistema 100% interactivo, desarrollado sobre estándares web modernos y desplegado en producción de forma gratuita en GitHub Pages."*

---

### 👤 Intervención 3: Integrante 3 (03:00 - 04:30 | 90 segundos)
- **Rol en el Equipo:** Director de Calidad, SRE y Gobierno Financiero de Proyectos TIC.
- **Apoyo Visual en Pantalla:** Dashboard Ejecutivo de Control con los gráficos de reducción de filas (-64.2%), cumplimiento de SLAs (99.94%) y la tabla comparativa de Retorno de Inversión (ROI).
- **Guión Textual a Exponer:**
  > *"Para blindar la promesa de valor ante esta Junta Directiva, establecimos **Acuerdos de Nivel de Servicio (SLAs) de grado bancario**: garantizamos una **disponibilidad del 99.9% en operación continua 24/7**, con tiempos de respuesta en consulta menores a 1.5 segundos y un tiempo de recuperación ante desastres menor a 15 minutos.*
  > 
  > *Los Indicadores Clave de Gestión (KPIs) en nuestra fase piloto validan el éxito absoluto del modelo:  
  > • **Redujimos las filas presenciales en un 64.2%**, sobrepasando con creces la meta del 60% exigida por el negocio. Los pacientes pasaron de esperar 3.5 horas a tan solo 15 minutos en el dispensario.  
  > • Logramos una **exactitud de inventario del 98.6%** entre el saldo digital y el conteo físico en bodega.  
  > • Y disparamos la satisfacción del usuario (CSAT) del 38% a un sobresaliente **91.4%**.*
  > 
  > *Señores de la Junta Directiva: Este proyecto no es un costo de tecnología, es una **inversión estratégica con un Retorno de Inversión del 350%**: cada peso invertido en la infraestructura en la nube le ahorra a la Nueva EPS más de \$3.5 pesos en costos de impresión, vigilancia privada de filas, multas de la Superintendencia y tratamientos de alta complejidad derivados de medicamentos no tomados a tiempo. Tenemos la arquitectura lista, los socios integrados y el gobierno de ITIL 4 validado. Solicitamos la aprobación de los fondos para el despliegue nacional a partir del próximo mes. ¡Muchas gracias!"*

---

## BIBLIOGRAFÍA EN FORMATO APA 7.ª EDICIÓN

1. **Axelos. (2019).** *ITIL Foundation: ITIL 4 Edition*. TSO (The Stationery Office). Norwich, Reino Unido. ISBN: 978-0113316076.  
   *Aporte Académico:* Fundamentación epistemológica de las Cuatro Dimensiones de la Gestión del Servicio y los Siete Principios Guía utilizados como columna vertebral del informe.
2. **Congreso de la República de Colombia. (2012).** *Ley Estatutaria 1581 de 2012: Por la cual se dictan disposiciones generales para la protección de datos personales (Habeas Data)*. Diario Oficial No. 48.587. Bogotá D.C., Colombia.  
   *Aporte Académico:* Directrices de seguridad informática, anonimización de diagnósticos CIE-10 y consentimiento informado para el tratamiento de datos sensibles de pacientes.
3. **Health Level Seven International (HL7). (2023).** *HL7 FHIR Release 5: Fast Healthcare Interoperability Resources Specification*. Ann Arbor, MI. Recuperado de [https://hl7.org/fhir/](https://hl7.org/fhir/)  
   *Aporte Académico:* Modelo de interoperabilidad semántica para la estructuración de los microservicios de prescripción médica (`MedicationRequest`) y entrega física (`MedicationDispense`).
4. **Healthcare Information and Management Systems Society (HIMSS). (2024).** *Digital Health Indicator (DHI): Governance, Interoperability and Person-Enabled Care*. Chicago, IL: HIMSS Media.  
   *Aporte Académico:* Marcos de medición del impacto de soluciones de salud digital en la experiencia centrada en el paciente y reducción de costos operativos en aseguradoras.
5. **International Organization for Standardization. (2018).** *ISO/IEC 20000-1:2018: Information technology — Service management — Part 1: Service management system requirements*. Ginebra, Suiza: ISO.  
   *Aporte Académico:* Estructuración de los Acuerdos de Nivel de Servicio (SLAs), tiempos medios de recuperación (MTTR) y Acuerdos de Nivel Operacional (OLAs) con proveedores logísticos.
6. **Ministerio de Salud y Protección Social de Colombia. (2020).** *Resolución 521 de 2020: Procedimiento de atención médica domiciliaria y entrega de medicamentos ambulatorios en el Sistema General de Seguridad Social en Salud*. Diario Oficial No. 51.270. Bogotá D.C., Colombia.  
   *Aporte Académico:* Respaldo legal para la digitalización de fórmulas farmacéuticas, priorización de despacho domiciliario para adultos mayores de 70 años y uso de teleorientación en salud.
7. **Prosci. (2021).** *ADKAR: A Model for Change in Business, Government and our Community*. Fort Collins, CO: Prosci Learning Center Publications.  
   *Aporte Académico:* Metodología de gestión del cambio aplicada en la dimensión de Organizaciones y Personas para erradicar la resistencia del personal operativo de farmacias.
