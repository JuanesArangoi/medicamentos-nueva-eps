/**
 * ==========================================================================
 * SISTEMA INTEGRAL DE GESTIÓN Y CONSULTA DE MEDICAMENTOS EN TIEMPO REAL
 * NUEVA EPS - ARQUITECTURA ITIL 4 Y SIMULADOR INTERACTIVO
 * ==========================================================================
 */

// Base de Datos Simulada en Memoria (Operadores: Audifarma, Cafam, Cruz Verde)
const PHARMACIES_DB = [
  {
    id: 'FAR-001',
    name: 'Audifarma Calle 53 - Sede Principal',
    operator: 'Audifarma S.A.',
    city: 'Bogota',
    address: 'Calle 53 # 14-45, Chapinero',
    schedule: 'Lunes a Sábado: 06:00 - 20:00',
    distanceKm: 1.2,
    currentWaitMins: 8,
    inventory: {
      'losartan-50': { stock: 142, status: 'disponible', nextRestock: 'Disponible hoy' },
      'metformina-850': { stock: 88, status: 'disponible', nextRestock: 'Disponible hoy' },
      'insulina-glargina': { stock: 4, status: 'critico', nextRestock: 'Reabastecimiento mañana 08:00' },
      'atorvastatina-20': { stock: 0, status: 'agotado', nextRestock: 'Estimado: En 48h (Jueves)' },
      'levotiroxina-50': { stock: 65, status: 'disponible', nextRestock: 'Disponible hoy' },
      'acetaminofen-500': { stock: 320, status: 'disponible', nextRestock: 'Disponible hoy' },
      'omeprazol-20': { stock: 110, status: 'disponible', nextRestock: 'Disponible hoy' },
      'salbutamol-100': { stock: 18, status: 'critico', nextRestock: 'Reabastecimiento hoy 16:00' }
    }
  },
  {
    id: 'FAR-002',
    name: 'Droguerías Cafam Floresta',
    operator: 'Cafam Droguerías',
    city: 'Bogota',
    address: 'Av. Carrera 68 # 90-88, Local 120',
    schedule: '24 Horas (Atención Continua)',
    distanceKm: 3.5,
    currentWaitMins: 5,
    inventory: {
      'losartan-50': { stock: 210, status: 'disponible', nextRestock: 'Disponible hoy' },
      'metformina-850': { stock: 140, status: 'disponible', nextRestock: 'Disponible hoy' },
      'insulina-glargina': { stock: 26, status: 'disponible', nextRestock: 'Disponible hoy' },
      'atorvastatina-20': { stock: 74, status: 'disponible', nextRestock: 'Disponible hoy' },
      'levotiroxina-50': { stock: 95, status: 'disponible', nextRestock: 'Disponible hoy' },
      'acetaminofen-500': { stock: 500, status: 'disponible', nextRestock: 'Disponible hoy' },
      'omeprazol-20': { stock: 80, status: 'disponible', nextRestock: 'Disponible hoy' },
      'salbutamol-100': { stock: 42, status: 'disponible', nextRestock: 'Disponible hoy' }
    }
  },
  {
    id: 'FAR-003',
    name: 'Cruz Verde Carrera 7 - EPS Express',
    operator: 'Cruz Verde Colombia',
    city: 'Bogota',
    address: 'Carrera 7 # 40-62, Teusaquillo',
    schedule: 'Lunes a Viernes: 07:00 - 19:00',
    distanceKm: 2.1,
    currentWaitMins: 12,
    inventory: {
      'losartan-50': { stock: 5, status: 'critico', nextRestock: 'Reabastecimiento mañana 07:00' },
      'metformina-850': { stock: 0, status: 'agotado', nextRestock: 'Estimado: Viernes' },
      'insulina-glargina': { stock: 12, status: 'disponible', nextRestock: 'Disponible hoy' },
      'atorvastatina-20': { stock: 33, status: 'disponible', nextRestock: 'Disponible hoy' },
      'levotiroxina-50': { stock: 0, status: 'agotado', nextRestock: 'Estimado: Mañana 14:00' },
      'acetaminofen-500': { stock: 180, status: 'disponible', nextRestock: 'Disponible hoy' },
      'omeprazol-20': { stock: 22, status: 'disponible', nextRestock: 'Disponible hoy' },
      'salbutamol-100': { stock: 0, status: 'agotado', nextRestock: 'Estimado: Jueves' }
    }
  },
  {
    id: 'FAR-004',
    name: 'Audifarma El Poblado - Mall del Este',
    operator: 'Audifarma S.A.',
    city: 'Medellin',
    address: 'Carrera 25 # 3-45, El Poblado, Medellín',
    schedule: 'Lunes a Sábado: 07:00 - 19:00',
    distanceKm: 2.8,
    currentWaitMins: 6,
    inventory: {
      'losartan-50': { stock: 95, status: 'disponible', nextRestock: 'Disponible hoy' },
      'metformina-850': { stock: 110, status: 'disponible', nextRestock: 'Disponible hoy' },
      'insulina-glargina': { stock: 18, status: 'disponible', nextRestock: 'Disponible hoy' },
      'atorvastatina-20': { stock: 6, status: 'critico', nextRestock: 'Reabastecimiento mañana' },
      'levotiroxina-50': { stock: 40, status: 'disponible', nextRestock: 'Disponible hoy' },
      'acetaminofen-500': { stock: 300, status: 'disponible', nextRestock: 'Disponible hoy' },
      'omeprazol-20': { stock: 75, status: 'disponible', nextRestock: 'Disponible hoy' },
      'salbutamol-100': { stock: 25, status: 'disponible', nextRestock: 'Disponible hoy' }
    }
  },
  {
    id: 'FAR-005',
    name: 'Droguerías Cafam San Fernando',
    operator: 'Cafam Droguerías',
    city: 'Cali',
    address: 'Calle 5 # 38-25, Cali',
    schedule: 'Lunes a Domingo: 06:00 - 22:00',
    distanceKm: 1.9,
    currentWaitMins: 10,
    inventory: {
      'losartan-50': { stock: 130, status: 'disponible', nextRestock: 'Disponible hoy' },
      'metformina-850': { stock: 85, status: 'disponible', nextRestock: 'Disponible hoy' },
      'insulina-glargina': { stock: 0, status: 'agotado', nextRestock: 'Estimado: Miércoles' },
      'atorvastatina-20': { stock: 50, status: 'disponible', nextRestock: 'Disponible hoy' },
      'levotiroxina-50': { stock: 20, status: 'disponible', nextRestock: 'Disponible hoy' },
      'acetaminofen-500': { stock: 240, status: 'disponible', nextRestock: 'Disponible hoy' },
      'omeprazol-20': { stock: 35, status: 'disponible', nextRestock: 'Disponible hoy' },
      'salbutamol-100': { stock: 5, status: 'critico', nextRestock: 'Reabastecimiento mañana' }
    }
  },
  {
    id: 'FAR-006',
    name: 'Cruz Verde Prado Norte',
    operator: 'Cruz Verde Colombia',
    city: 'Barranquilla',
    address: 'Carrera 54 # 72-105, Barranquilla',
    schedule: 'Lunes a Sábado: 07:00 - 20:00',
    distanceKm: 3.1,
    currentWaitMins: 7,
    inventory: {
      'losartan-50': { stock: 80, status: 'disponible', nextRestock: 'Disponible hoy' },
      'metformina-850': { stock: 92, status: 'disponible', nextRestock: 'Disponible hoy' },
      'insulina-glargina': { stock: 15, status: 'disponible', nextRestock: 'Disponible hoy' },
      'atorvastatina-20': { stock: 45, status: 'disponible', nextRestock: 'Disponible hoy' },
      'levotiroxina-50': { stock: 30, status: 'disponible', nextRestock: 'Disponible hoy' },
      'acetaminofen-500': { stock: 400, status: 'disponible', nextRestock: 'Disponible hoy' },
      'omeprazol-20': { stock: 60, status: 'disponible', nextRestock: 'Disponible hoy' },
      'salbutamol-100': { stock: 14, status: 'disponible', nextRestock: 'Disponible hoy' }
    }
  }
];

// Prescripciones pre-cargadas para la simulación
const SAMPLE_PRESCRIPTIONS = {
  '1020304050': {
    patientName: 'Juan Esteban Morales Ramírez',
    docType: 'CC',
    docNumber: '1020304050',
    age: 48,
    regime: 'Contributivo - Cotizante Principal',
    assignedIps: 'Clínica Universitaria Méderi (Bogotá D.C.)',
    doctor: 'Dra. Marcela Restrepo - Medicina Interna (RM 45892-Bog)',
    codeMipres: 'MIP-2026-984210',
    dateIssued: '28 Sep 2026',
    expirationDate: '28 Oct 2026',
    medicines: [
      { id: 'losartan-50', name: 'Losartán Potásico 50 mg', dosage: 'Tomar 1 tableta cada 12 horas por 30 días', quantity: 60 },
      { id: 'atorvastatina-20', name: 'Atorvastatina 20 mg', dosage: 'Tomar 1 tableta cada noche por 30 días', quantity: 30 }
    ]
  },
  '52418933': {
    patientName: 'María Gladys Gómez de Torres',
    docType: 'CC',
    docNumber: '52418933',
    age: 72,
    regime: 'Subsidiado - Adulto Mayor Prioritario',
    assignedIps: 'Centro de Salud Suba Rincón (Bogotá D.C.)',
    doctor: 'Dr. Carlos Mendoza - Endocrinología',
    codeMipres: 'MIP-2026-773120',
    dateIssued: '29 Sep 2026',
    expirationDate: '29 Oct 2026',
    medicines: [
      { id: 'metformina-850', name: 'Metformina Clorhidrato 850 mg', dosage: '1 tableta con el almuerzo y cena', quantity: 60 },
      { id: 'insulina-glargina', name: 'Insulina Glargina 100 UI/ml (Lapicero)', dosage: 'Aplicar 22 UI subcutáneas cada noche', quantity: 2 }
    ]
  },
  '1098765432': {
    patientName: 'Andrés Felipe Cardona',
    docType: 'CC',
    docNumber: '1098765432',
    age: 34,
    regime: 'Contributivo - Beneficiario',
    assignedIps: 'Sede Prado Centro (Medellín)',
    doctor: 'Dra. Laura Peláez - Neumología',
    codeMipres: 'MIP-2026-440192',
    dateIssued: '30 Sep 2026',
    expirationDate: '30 Oct 2026',
    medicines: [
      { id: 'salbutamol-100', name: 'Salbutamol Inhalador 100 mcg', dosage: '2 inhalaciones cada 8 horas o rescate', quantity: 1 },
      { id: 'acetaminofen-500', name: 'Acetaminofén 500 mg', dosage: '1 tableta cada 8 horas si hay dolor', quantity: 30 }
    ]
  }
};

// Catálogo general de medicamentos
const MEDICINES_CATALOG = [
  { id: 'losartan-50', name: 'Losartán Potásico 50 mg', category: 'Cardiovascular / Antihipertensivo' },
  { id: 'metformina-850', name: 'Metformina Clorhidrato 850 mg', category: 'Metabólico / Antidiabético' },
  { id: 'insulina-glargina', name: 'Insulina Glargina 100 UI/ml', category: 'Endocrino / Hormona' },
  { id: 'atorvastatina-20', name: 'Atorvastatina 20 mg', category: 'Cardiovascular / Hipolipemiante' },
  { id: 'levotiroxina-50', name: 'Levotiroxina Sódica 50 mcg', category: 'Endocrino / Tiroides' },
  { id: 'acetaminofen-500', name: 'Acetaminofén 500 mg', category: 'Analgésico y Antipirético' },
  { id: 'omeprazol-20', name: 'Omeprazol 20 mg', category: 'Gastroenterología' },
  { id: 'salbutamol-100', name: 'Salbutamol Inhalador 100 mcg', category: 'Neumología / Broncodilatador' }
];

// Estado global de la aplicación
const AppState = {
  activeTab: 'fase1',
  currentStep: 1,
  currentPatient: null,
  selectedMedicineId: 'losartan-50',
  selectedCity: 'Bogota',
  selectedPharmacy: null,
  currentTicket: null,
  isAccessibleMode: false,
  timerInterval: null,
  timerSecondsRemaining: 300, // 5 minutos exactos para el pitch
  timerRunning: false
};

// Inicialización cuando carga el DOM
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initFormControls();
  initAccordions();
  initPitchTimer();
  renderKpiCharts();
  
  // Realizar búsqueda inicial de demostración
  loadSamplePrescription('1020304050');
});

// Control de Pestañas Principales
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-tab');
      switchTab(tabTarget);
    });
  });
}

function switchTab(tabId) {
  AppState.activeTab = tabId;
  
  // Actualizar botones
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });
  
  // Actualizar paneles
  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `tab-${tabId}`);
  });

  // Si entra a la Fase 3 (SLAs y KPIs), refrescar gráficos
  if (tabId === 'fase3' || tabId === 'management-dashboard') {
    renderKpiCharts();
  }

  // Scroll suave al inicio del contenido
  window.scrollTo({ top: 120, behavior: 'smooth' });
}

// Inicialización de controles del formulario y accesibilidad
function initFormControls() {
  const docInput = document.getElementById('input-doc');
  const citySelect = document.getElementById('select-city');
  const medSelect = document.getElementById('select-medicine');
  const searchBtn = document.getElementById('btn-search-stock');
  const accessToggle = document.getElementById('toggle-accessibility');

  if (citySelect) {
    citySelect.addEventListener('change', (e) => {
      AppState.selectedCity = e.target.value;
      updatePharmacyResults();
    });
  }

  if (medSelect) {
    medSelect.addEventListener('change', (e) => {
      AppState.selectedMedicineId = e.target.value;
      updatePharmacyResults();
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      handleManualSearch();
    });
  }

  if (accessToggle) {
    accessToggle.addEventListener('click', () => {
      AppState.isAccessibleMode = !AppState.isAccessibleMode;
      document.body.classList.toggle('accessible-mode', AppState.isAccessibleMode);
      accessToggle.innerHTML = AppState.isAccessibleMode 
        ? '<span>👁️ Modo Normal</span>' 
        : '<span>👓 Modo Adulto Mayor / Alto Contraste</span>';
    });
  }
}

// Cargar prescripción de ejemplo con 1 clic
window.loadSamplePrescription = function(docNumber) {
  const inputDoc = document.getElementById('input-doc');
  if (inputDoc) inputDoc.value = docNumber;

  const data = SAMPLE_PRESCRIPTIONS[docNumber];
  if (!data) return;

  AppState.currentPatient = data;
  AppState.selectedMedicineId = data.medicines[0].id;

  // Actualizar selector de medicamentos con los formulados
  const medSelect = document.getElementById('select-medicine');
  if (medSelect) {
    medSelect.value = AppState.selectedMedicineId;
  }

  // Mostrar tarjeta de información del paciente
  const patientCard = document.getElementById('patient-prescription-card');
  if (patientCard) {
    patientCard.style.display = 'block';
    patientCard.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px;">
        <div>
          <span class="badge badge-success">✓ Afiliación Activa - ${data.regime}</span>
          <h3 style="color: var(--primary); margin: 6px 0 2px; font-size: 1.15rem;">${data.patientName}</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted);">
            <strong>${data.docType}:</strong> ${data.docNumber} | <strong>IPS:</strong> ${data.assignedIps}
          </p>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 0.8rem; background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 6px; font-weight: 700;">
            MIPRES: ${data.codeMipres}
          </span>
          <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">Vigencia: Hasta ${data.expirationDate}</p>
        </div>
      </div>
      <div style="margin-top: 12px; padding-top: 10px; border-top: 1px dashed var(--border-color); display: flex; gap: 8px; flex-wrap: wrap;">
        <span style="font-size: 0.85rem; font-weight: 600; color: var(--primary);">Medicamentos Formulados:</span>
        ${data.medicines.map(m => `
          <button class="btn btn-sm ${m.id === AppState.selectedMedicineId ? 'btn-primary' : 'btn-outline'}" 
                  onclick="selectFormulatedMed('${m.id}')">
            💊 ${m.name} (${m.quantity} uds)
          </button>
        `).join('')}
      </div>
    `;
  }

  // Avanzar al paso 2 (Resultados de disponibilidad)
  setStep(2);
  updatePharmacyResults();
};

window.selectFormulatedMed = function(medId) {
  AppState.selectedMedicineId = medId;
  const medSelect = document.getElementById('select-medicine');
  if (medSelect) medSelect.value = medId;
  
  if (AppState.currentPatient) {
    loadSamplePrescription(AppState.currentPatient.docNumber);
  } else {
    updatePharmacyResults();
  }
};

function handleManualSearch() {
  const docInput = document.getElementById('input-doc');
  const docVal = docInput ? docInput.value.trim() : '';

  if (SAMPLE_PRESCRIPTIONS[docVal]) {
    loadSamplePrescription(docVal);
  } else {
    // Si no está registrado en los ejemplos, hacer búsqueda libre por el catálogo
    const medSelect = document.getElementById('select-medicine');
    AppState.selectedMedicineId = medSelect ? medSelect.value : 'losartan-50';
    AppState.currentPatient = {
      patientName: 'Usuario Consulta Nueva EPS',
      docType: 'CC',
      docNumber: docVal || '1000000000',
      regime: 'Contributivo',
      assignedIps: 'Red Nacional Nueva EPS',
      codeMipres: 'GEN-2026-10492',
      expirationDate: '30 días calendario'
    };

    const patientCard = document.getElementById('patient-prescription-card');
    if (patientCard) {
      patientCard.style.display = 'block';
      patientCard.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
          <div>
            <span class="badge badge-info">Consulta Rápida por Catálogo</span>
            <h4 style="color: var(--primary); margin-top: 4px;">Identificación: ${AppState.currentPatient.docNumber}</h4>
          </div>
          <span style="font-size: 0.82rem; color: var(--text-muted);">Validado en Base de Datos Nueva EPS</span>
        </div>
      `;
    }
    setStep(2);
    updatePharmacyResults();
  }
}

// Actualizar lista de farmacias según medicamento y ciudad
function updatePharmacyResults() {
  const container = document.getElementById('pharmacies-container');
  if (!container) return;

  const medId = AppState.selectedMedicineId;
  const city = AppState.selectedCity;

  // Filtrar farmacias por ciudad si se seleccionó una en específico o mostrar todas
  let filtered = PHARMACIES_DB.filter(p => city === 'all' || p.city.toLowerCase() === city.toLowerCase());
  
  if (filtered.length === 0) {
    filtered = PHARMACIES_DB;
  }

  // Obtener info del medicamento
  const medObj = MEDICINES_CATALOG.find(m => m.id === medId) || { name: 'Medicamento', category: 'General' };

  let html = `
    <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h4 style="color: var(--primary-dark); font-size: 1.05rem;">Disponibilidad de: ${medObj.name}</h4>
        <p style="font-size: 0.82rem; color: var(--text-muted);">${filtered.length} farmacias aliadas monitoreadas con stock en tiempo real</p>
      </div>
      <span class="badge badge-primary">Sincronizado vía API REST</span>
    </div>
  `;

  filtered.forEach(pharmacy => {
    const inv = pharmacy.inventory[medId] || { stock: 0, status: 'agotado', nextRestock: 'Consultando proveedor...' };
    
    let badgeClass = 'badge-danger';
    let statusText = 'Agotado';
    let cardClass = 'no-stock';
    let canReserve = false;

    if (inv.status === 'disponible') {
      badgeClass = 'badge-success';
      statusText = `Disponible (${inv.stock} uds)`;
      cardClass = 'has-stock';
      canReserve = true;
    } else if (inv.status === 'critico') {
      badgeClass = 'badge-warning';
      statusText = `Stock Bajo (${inv.stock} uds)`;
      cardClass = 'low-stock';
      canReserve = true;
    } else {
      badgeClass = 'badge-danger';
      statusText = 'Agotado Temporalmente';
      cardClass = 'no-stock';
      canReserve = false;
    }

    html += `
      <div class="pharmacy-card ${cardClass}">
        <div class="pharmacy-details">
          <h4>${pharmacy.name}</h4>
          <span style="font-size: 0.8rem; font-weight: 700; color: #0284c7; background: #e0f2fe; padding: 2px 8px; border-radius: 4px;">
            Operador: ${pharmacy.operator}
          </span>
          <div class="pharmacy-meta">
            <span>📍 ${pharmacy.address}</span>
            <span>🕒 ${pharmacy.schedule}</span>
            <span>⏱️ Fila estimada: <strong>${pharmacy.currentWaitMins} min</strong></span>
          </div>
          ${!canReserve ? `
            <div style="margin-top: 8px; font-size: 0.8rem; color: #b91c1c; background: #fef2f2; padding: 4px 8px; border-radius: 4px; display: inline-block;">
              🔔 Alerta ITIL: ${inv.nextRestock}. Te notificaremos a WhatsApp cuando arribe el lote.
            </div>
          ` : ''}
        </div>
        <div class="stock-indicator">
          <span class="badge ${badgeClass}">${statusText}</span>
          ${canReserve ? `
            <button class="btn btn-accent btn-sm" onclick="generateExpressTicket('${pharmacy.id}', '${medId}')">
              ⚡ Reservar Turno Express
            </button>
          ` : `
            <button class="btn btn-outline btn-sm" onclick="subscribeToRestockAlert('${pharmacy.name}', '${medObj.name}')">
              📲 Activar Alerta WhatsApp
            </button>
          `}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Clic 3: Generación del Turno Digital Express
window.generateExpressTicket = function(pharmacyId, medId) {
  const pharmacy = PHARMACIES_DB.find(p => p.id === pharmacyId);
  const med = MEDICINES_CATALOG.find(m => m.id === medId);
  if (!pharmacy || !med) return;

  AppState.selectedPharmacy = pharmacy;
  
  // Generar código único de turno
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const ticketNumber = `EPS-${pharmacy.operator.substring(0,3).toUpperCase()}-${randomSuffix}`;
  
  // Calcular hora estimada de cita (ventana de 15 min)
  const now = new Date();
  const arrivalTime = new Date(now.getTime() + 45 * 60000); // en 45 min
  const timeString = arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  AppState.currentTicket = {
    ticketNumber,
    pharmacy,
    medicine: med,
    patient: AppState.currentPatient || { patientName: 'Afiliado Nueva EPS', docNumber: '1020304050' },
    reservedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    scheduledWindow: `${timeString} - ${new Date(arrivalTime.getTime() + 15*60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  };

  // Renderizar Ticket
  const ticketResultBox = document.getElementById('ticket-result-box');
  if (ticketResultBox) {
    ticketResultBox.style.display = 'block';
    ticketResultBox.innerHTML = `
      <div class="ticket-container">
        <div class="ticket-header">
          <div>
            <span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: #7dd3fc; font-weight: 700;">
              NUEVA EPS - TURNO DIGITAL EXPRESS (ITIL 4 VALUE STREAM)
            </span>
            <h3 style="color: white; font-size: 1.35rem; margin-top: 4px;">Dispensación Prioritaria Garantizada</h3>
          </div>
          <div class="ticket-code">${ticketNumber}</div>
        </div>

        <div class="ticket-body-grid">
          <div>
            <p style="font-size: 0.9rem; margin-bottom: 6px;">
              <strong>👤 Paciente:</strong> ${AppState.currentTicket.patient.patientName} (${AppState.currentTicket.patient.docNumber})
            </p>
            <p style="font-size: 0.9rem; margin-bottom: 6px;">
              <strong>💊 Medicamento Reservado:</strong> ${med.name} (1 mes de tratamiento)
            </p>
            <p style="font-size: 0.9rem; margin-bottom: 6px;">
              <strong>🏥 Punto de Dispensación:</strong> ${pharmacy.name}
            </p>
            <p style="font-size: 0.9rem; margin-bottom: 6px;">
              <strong>📍 Dirección:</strong> ${pharmacy.address}
            </p>
            <p style="font-size: 0.95rem; margin-top: 10px; color: #a7f3d0; background: rgba(0,168,107,0.25); padding: 6px 12px; border-radius: 6px; border-left: 3px solid #34d399;">
              <strong>⏰ Ventana de Reclamo Preferencial:</strong> Hoy, ${AppState.currentTicket.scheduledWindow}
            </p>
            <p style="font-size: 0.78rem; color: #cbd5e1; margin-top: 8px;">
              * Al llegar al dispensario, dirígete directamente al módulo <strong>"Turno Express Digital"</strong> y presenta este código QR. Tiempo de espera garantizado < 10 minutos.
            </p>
          </div>

          <div class="ticket-qr">
            <div class="qr-placeholder" id="qr-canvas-target">
              <!-- SVG QR Dinámico generado -->
              <svg width="120" height="120" viewBox="0 0 100 100" fill="#002d54">
                <rect x="0" y="0" width="30" height="30" fill="#002d54"/>
                <rect x="5" y="5" width="20" height="20" fill="white"/>
                <rect x="10" y="10" width="10" height="10" fill="#002d54"/>
                
                <rect x="70" y="0" width="30" height="30" fill="#002d54"/>
                <rect x="75" y="5" width="20" height="20" fill="white"/>
                <rect x="80" y="10" width="10" height="10" fill="#002d54"/>
                
                <rect x="0" y="70" width="30" height="30" fill="#002d54"/>
                <rect x="5" y="75" width="20" height="20" fill="white"/>
                <rect x="10" y="80" width="10" height="10" fill="#002d54"/>

                <!-- Patrón simulado -->
                <rect x="35" y="10" width="8" height="8"/>
                <rect x="48" y="15" width="8" height="8"/>
                <rect x="35" y="35" width="8" height="8"/>
                <rect x="50" y="35" width="12" height="12"/>
                <rect x="70" y="45" width="15" height="8"/>
                <rect x="35" y="60" width="8" height="18"/>
                <rect x="55" y="65" width="14" height="10"/>
                <rect x="75" y="75" width="18" height="18"/>
              </svg>
            </div>
            <span style="font-size: 0.72rem; color: #475569; margin-top: 6px; font-weight: 700;">Escanear en Dispensario</span>
          </div>
        </div>
      </div>
    `;

    // Scroll hasta el ticket
    ticketResultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Disparar simulación de WhatsApp en el chat widget
  simulateWhatsAppNotification(AppState.currentTicket);
  setStep(3);
};

// Notificación simulada de WhatsApp
function simulateWhatsAppNotification(ticket) {
  const chatBody = document.getElementById('chat-simulator-messages');
  if (!chatBody) return;

  const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  chatBody.innerHTML = `
    <div class="chat-bubble">
      <strong>👋 ¡Hola ${ticket.patient.patientName.split(' ')[0]}!</strong>
      <p style="margin-top: 4px;">Confirmamos tu <strong>Turno Digital Express</strong> en Nueva EPS para el reclamo de <em>${ticket.medicine.name}</em>.</p>
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 6px 10px; margin: 8px 0; font-size: 0.83rem;">
        🎫 <strong>Turno:</strong> ${ticket.ticketNumber}<br>
        🏥 <strong>Sede:</strong> ${ticket.pharmacy.name}<br>
        📍 <strong>Dirección:</strong> ${ticket.pharmacy.address}<br>
        🕒 <strong>Ventana:</strong> ${ticket.scheduledWindow}
      </div>
      <p style="font-size: 0.8rem; color: #475569;">Al llegar, acércate al módulo exclusivo de ITIL Digital Express y ahorra hasta 3 horas de fila.</p>
      <span class="time">${nowTime} ✓✓</span>
    </div>
  `;
}

window.subscribeToRestockAlert = function(pharmacyName, medName) {
  const phone = prompt(`Ingresa tu número de WhatsApp para avisarte cuando haya stock de ${medName} en ${pharmacyName}:`, '3101234567');
  if (phone) {
    const chatBody = document.getElementById('chat-simulator-messages');
    if (chatBody) {
      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      chatBody.innerHTML = `
        <div class="chat-bubble">
          <strong>🔔 Alerta de Stock Automatizada (Principio ITIL 7)</strong>
          <p style="margin-top: 4px;">Has suscrito el medicamento <strong>${medName}</strong> en la sede <em>${pharmacyName}</em>.</p>
          <p style="font-size: 0.82rem; margin-top: 4px; color: #15803d;">Nuestro conector Cloud monitorea el inventario cada 60 segundos. Tan pronto el camión descargue el lote en bodega, recibirás un mensaje de WhatsApp prioritario para reservar tu turno.</p>
          <span class="time">${nowTime} ✓✓</span>
        </div>
      `;
    }
    alert(`✅ ¡Alerta registrada con éxito! El sistema te notificará automáticamente vía WhatsApp al número ${phone} apenas el operador cargue el lote.`);
  }
};

// Manejo visual de los 3 pasos
function setStep(stepNum) {
  AppState.currentStep = stepNum;
  document.querySelectorAll('.step-item').forEach(item => {
    const s = parseInt(item.getAttribute('data-step'), 10);
    item.classList.remove('active', 'completed');
    if (s === stepNum) {
      item.classList.add('active');
    } else if (s < stepNum) {
      item.classList.add('completed');
    }
  });
}

// Acordeones para el Informe Técnico
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('open');
    });
  });
}

// Renderizado de Gráficos SVG para el Dashboard Ejecutivo
function renderKpiCharts() {
  // Gráfico 1: Afluencia de Usuarios por Hora (Antes vs Después con Turno Express)
  const chartEl1 = document.getElementById('chart-hourly-traffic');
  if (chartEl1) {
    chartEl1.innerHTML = `
      <svg width="100%" height="240" viewBox="0 0 500 240" style="overflow: visible;">
        <!-- Ejes y Líneas Guía -->
        <line x1="50" y1="200" x2="480" y2="200" stroke="#cbd5e1" stroke-width="1.5" />
        <line x1="50" y1="150" x2="480" y2="150" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="4" />
        <line x1="50" y1="100" x2="480" y2="100" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="4" />
        <line x1="50" y1="50" x2="480" y2="50" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="4" />

        <!-- Etiquetas de Hora -->
        <text x="50" y="218" font-size="11" fill="#64748b" text-anchor="middle">7am</text>
        <text x="120" y="218" font-size="11" fill="#64748b" text-anchor="middle">9am</text>
        <text x="190" y="218" font-size="11" fill="#64748b" text-anchor="middle">11am</text>
        <text x="260" y="218" font-size="11" fill="#64748b" text-anchor="middle">1pm</text>
        <text x="330" y="218" font-size="11" fill="#64748b" text-anchor="middle">3pm</text>
        <text x="400" y="218" font-size="11" fill="#64748b" text-anchor="middle">5pm</text>
        <text x="470" y="218" font-size="11" fill="#64748b" text-anchor="middle">7pm</text>

        <!-- Curva Tradicional (Pico desbordado en la mañana) -->
        <path d="M 50 180 Q 120 20, 190 60 T 330 110 T 470 190" 
              fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="5,3" />

        <!-- Curva Con ITIL 4 y Turnos Express (Demanda aplanada y balanceada) -->
        <path d="M 50 150 Q 120 120, 190 125 T 330 130 T 470 160" 
              fill="none" stroke="#00a86b" stroke-width="3.5" />

        <!-- Leyenda -->
        <circle cx="100" cy="25" r="5" fill="#ef4444" />
        <text x="112" y="29" font-size="12" fill="#ef4444" font-weight="700">Modelo As-Is (Filas de hasta 4 horas)</text>
        
        <circle cx="300" cy="25" r="5" fill="#00a86b" />
        <text x="312" y="29" font-size="12" fill="#00a86b" font-weight="700">Modelo To-Be ITIL 4 (Espera < 15 min)</text>
      </svg>
    `;
  }

  // Gráfico 2: Participación de Dispensación por Gestor Farmacéutico
  const chartEl2 = document.getElementById('chart-dispensary-share');
  if (chartEl2) {
    chartEl2.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-around; flex-wrap: wrap; height: 100%; min-height: 200px;">
        <svg width="180" height="180" viewBox="0 0 42 42" class="donut">
          <circle class="donut-ring" cx="21" cy="21" r="15.915" fill="transparent" stroke="#f1f5f9" stroke-width="6"></circle>
          <!-- Audifarma (45%) -->
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#004884" stroke-width="6" stroke-dasharray="45 55" stroke-dashoffset="25"></circle>
          <!-- Cafam (32%) -->
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#0098da" stroke-width="6" stroke-dasharray="32 68" stroke-dashoffset="80"></circle>
          <!-- Cruz Verde (23%) -->
          <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#00a86b" stroke-width="6" stroke-dasharray="23 77" stroke-dashoffset="48"></circle>
          <g class="donut-text">
            <text x="50%" y="46%" font-size="6" font-weight="800" text-anchor="middle" fill="#004884">2.4M</text>
            <text x="50%" y="58%" font-size="3" text-anchor="middle" fill="#64748b">Fórmulas/Mes</text>
          </g>
        </svg>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 0.88rem;">
            <span style="width: 12px; height: 12px; border-radius: 3px; background: #004884;"></span>
            <strong>Audifarma S.A.</strong> (45% - 1.08M fórmulas)
          </div>
          <div style="display: flex; align-items: center; gap: 8px; font-size: 0.88rem;">
            <span style="width: 12px; height: 12px; border-radius: 3px; background: #0098da;"></span>
            <strong>Cafam Droguerías</strong> (32% - 768k fórmulas)
          </div>
          <div style="display: flex; align-items: center; gap: 8px; font-size: 0.88rem;">
            <span style="width: 12px; height: 12px; border-radius: 3px; background: #00a86b;"></span>
            <strong>Cruz Verde</strong> (23% - 552k fórmulas)
          </div>
          <p style="font-size: 0.78rem; color: #64748b; margin-top: 6px;">* Sincronizados a través del Middleware de Integración Cloud HL7 FHIR.</p>
        </div>
      </div>
    `;
  }
}

// Control del Temporizador para el Pitch de Sustentación (3 a 5 minutos)
function initPitchTimer() {
  const btnStart = document.getElementById('btn-timer-start');
  const btnReset = document.getElementById('btn-timer-reset');
  const display = document.getElementById('timer-display');
  const activeSpeakerIndicator = document.getElementById('timer-active-speaker');

  if (!btnStart || !btnReset || !display) return;

  function updateTimerDisplay() {
    const mins = Math.floor(AppState.timerSecondsRemaining / 60);
    const secs = AppState.timerSecondsRemaining % 60;
    display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    // Identificar a qué integrante le corresponde el tiempo actual
    // Duración total: 300s (5:00 min)
    // Integrante 1: 0:00 a 1:20 (restante 300s a 220s) -> 80 seg
    // Integrante 2: 1:20 a 3:10 (restante 220s a 110s) -> 110 seg
    // Integrante 3: 3:10 a 4:45 (restante 110s a 0s) -> 110 seg
    const elapsed = 300 - AppState.timerSecondsRemaining;
    if (activeSpeakerIndicator) {
      if (elapsed <= 80) {
        activeSpeakerIndicator.innerHTML = '🎤 Hablando: <strong>Integrante 1</strong> (Problema, Paciente y Gestión del Cambio)';
      } else if (elapsed <= 190) {
        activeSpeakerIndicator.innerHTML = '🎤 Hablando: <strong>Integrante 2</strong> (Arquitectura TI, 7 Principios ITIL y Demo)';
      } else {
        activeSpeakerIndicator.innerHTML = '🎤 Hablando: <strong>Integrante 3</strong> (SLAs, KPIs, ROI Financiero y Cierre)';
      }
    }
  }

  btnStart.addEventListener('click', () => {
    if (AppState.timerRunning) {
      clearInterval(AppState.timerInterval);
      AppState.timerRunning = false;
      btnStart.textContent = '▶️ Reanudar';
      btnStart.classList.remove('btn-warning');
      btnStart.classList.add('btn-accent');
    } else {
      AppState.timerRunning = true;
      btnStart.textContent = '⏸️ Pausar';
      btnStart.classList.remove('btn-accent');
      btnStart.classList.add('btn-warning');

      AppState.timerInterval = setInterval(() => {
        if (AppState.timerSecondsRemaining > 0) {
          AppState.timerSecondsRemaining--;
          updateTimerDisplay();
        } else {
          clearInterval(AppState.timerInterval);
          AppState.timerRunning = false;
          btnStart.textContent = '▶️ Iniciar';
          alert('⏰ ¡Tiempo cumplido! Tu pitch ha finalizado en los 5:00 minutos reglamentarios.');
        }
      }, 1000);
    }
  });

  btnReset.addEventListener('click', () => {
    clearInterval(AppState.timerInterval);
    AppState.timerRunning = false;
    AppState.timerSecondsRemaining = 300;
    btnStart.textContent = '▶️ Iniciar Pitch';
    btnStart.classList.remove('btn-warning');
    btnStart.classList.add('btn-accent');
    updateTimerDisplay();
  });

  updateTimerDisplay();
}

// Función global para imprimir el informe técnico académico en PDF o papel
window.printAcademicReport = function() {
  // Asegurarse de abrir todos los acordeones para la impresión
  document.querySelectorAll('.accordion-item').forEach(item => item.classList.add('open'));
  window.print();
};
