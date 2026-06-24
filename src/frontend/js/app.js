// Configuración Global de la API
const API_SERVICES = '/api/services';
const API_CLIENTS = '/api/clients';

// Instancias de Modales Bootstrap (para control programático)
let authModal;
let successModal;
let updateModal;
let newOrderModal;

// Inicialización cuando carga el DOM
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar modales de Bootstrap
  authModal = new bootstrap.Modal(document.getElementById('view-login')); 
  successModal = new bootstrap.Modal(document.getElementById('successOrderModal'));
  updateModal = new bootstrap.Modal(document.getElementById('updateStatusModal'));
  newOrderModal = new bootstrap.Modal(document.getElementById('newOrderModal'));
  
  // Sincronizar estado de sesión técnica en sidebar
  updateSidebarSessionText();

  // Navegar a la vista inicial (Inicio/Home)
  navigateTo('home');
});

// --- SISTEMA DE NAVEGACIÓN SPA ---

function navigateTo(viewId, event) {
  if (event) event.preventDefault();
  
  // Cerrar sidebar móvil si está abierto
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.remove('active');

  // Si está autenticado y va a 'login', redirigir a 'dashboard'
  const isAuth = sessionStorage.getItem('techAuthenticated') === 'true';
  if (viewId === 'login' && isAuth) {
    viewId = 'dashboard';
  }
  // Si intenta ir a 'dashboard' y no está autenticado, mandar a 'login'
  if (viewId === 'dashboard' && !isAuth) {
    viewId = 'login';
  }

  // Ocultar todas las secciones de vista
  const views = ['view-home', 'view-search', 'view-login', 'view-dashboard'];
  views.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('d-none');
  });

  // Mostrar la vista seleccionada
  const targetView = document.getElementById(`view-${viewId}`);
  if (targetView) targetView.classList.remove('d-none');

  // Actualizar clases activas en los enlaces del sidebar
  const navLinks = {
    'home': 'nav-home',
    'search': 'nav-search',
    'login': 'nav-login',
    'dashboard': 'nav-login'
  };

  Object.values(navLinks).forEach(linkId => {
    const linkEl = document.getElementById(linkId);
    if (linkEl) linkEl.classList.remove('active');
  });

  const activeLinkId = navLinks[viewId];
  const activeLinkEl = document.getElementById(activeLinkId);
  if (activeLinkEl) activeLinkEl.classList.add('active');

  // Cargar datos dinámicos según la sección
  if (viewId === 'dashboard') {
    loadDashboard();
    loadClients();
  }
}

// Sincroniza el texto del enlace de inicio de sesión
function updateSidebarSessionText() {
  const isAuth = sessionStorage.getItem('techAuthenticated') === 'true';
  const loginNavText = document.getElementById('login-nav-text');
  if (loginNavText) {
    loginNavText.innerText = isAuth ? 'Panel Técnico' : 'Inicio de Sesión';
  }
}

// Alternar sidebar en móvil
function toggleMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('active');
}

// --- SECCIÓN: AUTENTICACIÓN DEL TÉCNICO ---

function authenticateTech(event) {
  event.preventDefault();
  const passwordInput = document.getElementById('tech-password').value;
  
  // Clave de seguridad simulada
  if (passwordInput === 'admin123') {
    sessionStorage.setItem('techAuthenticated', 'true');
    document.getElementById('tech-password').value = '';
    document.getElementById('login-error-msg').classList.add('d-none');
    updateSidebarSessionText();
    navigateTo('dashboard');
  } else {
    document.getElementById('login-error-msg').classList.remove('d-none');
  }
}

function logoutTech() {
  sessionStorage.removeItem('techAuthenticated');
  updateSidebarSessionText();
  navigateTo('home');
}

// --- SECCIÓN: MÓDULO 1 - REGISTRO DE CLIENTES ---

async function registerClient(event) {
  event.preventDefault();
  
  const payload = {
    cedula: document.getElementById('clientCedula').value.trim(),
    name: document.getElementById('clientName').value.trim(),
    phone: document.getElementById('clientPhone').value.trim()
  };

  try {
    const response = await fetch(API_CLIENTS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!result.success) {
      alert(result.error || 'Ocurrió un error al registrar al cliente.');
      return;
    }

    alert('Cliente registrado con éxito.');
    document.getElementById('new-client-form').reset();
    loadClients(); 

  } catch (error) {
    console.error('Error al registrar cliente:', error);
    alert('Error de conexión con el servidor.');
  }
}

// Cargar todos los clientes en la tabla de administración
async function loadClients() {
  try {
    const response = await fetch(API_CLIENTS);
    const result = await response.json();
    
    if (!result.success) return;

    const tbody = document.getElementById('clients-table-body');
    tbody.innerHTML = '';

    if (result.data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" class="text-center text-secondary py-3">No hay clientes registrados.</td></tr>`;
      return;
    }

    result.data.forEach(client => {
      const dateStr = new Date(client.createdAt).toLocaleDateString('es-ES');
      const rowHTML = `
        <tr>
          <td class="fw-bold">${client.cedula}</td>
          <td>${client.name}</td>
          <td>${client.phone}</td>
          <td class="text-end text-secondary text-sm">${dateStr}</td>
        </tr>
      `;
      tbody.insertAdjacentHTML('beforeend', rowHTML);
    });

  } catch (error) {
    console.error('Error al cargar clientes:', error);
  }
}

// --- SECCIÓN: MÓDULO 2 - GENERAR ORDEN DE SERVICIO & AUTORELLENO ---

async function handleCedulaLookup(cedula) {
  const feedbackEl = document.getElementById('cedula-lookup-feedback');
  const nameInput = document.getElementById('orderClientName');
  const phoneInput = document.getElementById('orderClientPhone');
  const submitBtn = document.getElementById('btn-submit-order');

  const cleanCedula = cedula.trim();

  if (cleanCedula.length < 6) {
    nameInput.value = '';
    phoneInput.value = '';
    submitBtn.disabled = true;
    feedbackEl.className = "text-xs fw-semibold p-2 rounded-2 mt-1 bg-white border border-light-subtle d-flex align-items-center";
    feedbackEl.innerHTML = `<i class="bi bi-info-circle me-2 text-secondary"></i><span class="text-secondary">Ingrese una cédula registrada para verificar...</span>`;
    return;
  }

  try {
    const response = await fetch(`${API_CLIENTS}/${cleanCedula}`);
    const result = await response.json();

    if (response.status === 200 && result.success) {
      const client = result.data;
      nameInput.value = client.name;
      phoneInput.value = client.phone;
      submitBtn.disabled = false;
      
      const historyMsg = client.repairCount > 0 
        ? `Cliente frecuente: ${client.repairCount} reparación(es) previa(s).` 
        : 'Nuevo cliente (sin reparaciones previas).';

      feedbackEl.className = "text-xs fw-semibold p-2 rounded-2 mt-1 bg-success-subtle text-success border border-success-subtle d-flex align-items-center";
      feedbackEl.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i><span><strong>Cliente verificado.</strong> ${historyMsg}</span>`;
    } else {
      nameInput.value = '';
      phoneInput.value = '';
      submitBtn.disabled = true;
      feedbackEl.className = "text-xs fw-semibold p-2 rounded-2 mt-1 bg-danger-subtle text-danger border border-danger-subtle d-flex align-items-center";
      feedbackEl.innerHTML = `<i class="bi bi-x-circle-fill me-2"></i><span>Cliente no registrado. Regístrelo primero en el módulo de clientes.</span>`;
    }
  } catch (error) {
    console.error('Error al verificar cédula:', error);
    feedbackEl.innerHTML = `<span class="text-danger">Error de conexión al verificar cliente.</span>`;
  }
}

function prepareNewOrderModal() {
  document.getElementById('new-order-form').reset();
  handleCedulaLookup('');
}

async function registerOrder(event) {
  event.preventDefault();

  const payload = {
    clientCedula: document.getElementById('orderClientCedula').value.trim(),
    deviceType: document.getElementById('devType').value,
    deviceBrand: document.getElementById('devBrand').value.trim(),
    deviceModel: document.getElementById('devModel').value.trim(),
    issueDescription: document.getElementById('issueDesc').value.trim(),
    technicalDiagnosis: document.getElementById('techDiagnosis').value.trim(),
    technicalNotes: document.getElementById('techNotes').value.trim(),
    estimatedCost: parseFloat(document.getElementById('estCost').value) || 0
  };

  try {
    const response = await fetch(API_SERVICES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!result.success) {
      alert(result.error || 'Ocurrió un error al registrar la orden.');
      return;
    }

    newOrderModal.hide();
    document.getElementById('success-code-display').innerText = result.data.code;
    successModal.show();

    loadDashboard();

  } catch (error) {
    console.error('Error al registrar orden:', error);
    alert('Error al conectar con el servidor.');
  }
}

// --- SECCIÓN: DASHBOARD TÉCNICO ---

async function loadDashboard() {
  try {
    const response = await fetch(API_SERVICES);
    const result = await response.json();
    
    if (!result.success) return;

    const services = result.data;
    
    const stats = { 'Recibido': 0, 'En Revisión': 0, 'Listo': 0, 'Entregado': 0 };
    services.forEach(s => { if (stats[s.currentStatus] !== undefined) stats[s.currentStatus]++; });

    document.getElementById('stat-recibido').innerText = stats['Recibido'];
    document.getElementById('stat-revision').innerText = stats['En Revisión'];
    document.getElementById('stat-listo').innerText = stats['Listo'];
    document.getElementById('stat-entregado').innerText = stats['Entregado'];

    const tbody = document.getElementById('orders-table-body');
    tbody.innerHTML = '';

    if (services.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-secondary">No hay órdenes registradas. Crea una con "Nueva Orden".</td></tr>`;
      return;
    }

    [...services].reverse().forEach(s => {
      let statusBadgeClass = 'badge-recibido';
      switch (s.currentStatus) {
        case 'En Revisión': statusBadgeClass = 'badge-revision'; break;
        case 'Listo': statusBadgeClass = 'badge-listo'; break;
        case 'Entregado': statusBadgeClass = 'badge-entregado'; break;
      }
      
      const dateStr = new Date(s.updatedAt).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' });
      const rowHTML = `
        <tr data-code="${s.code}" data-client="${s.clientName}">
          <td class="font-monospace fw-bold text-primary">${s.code}</td>
          <td>
            <div class="fw-semibold">${s.clientName}</div>
            <div class="text-secondary text-xs">${s.clientCedula}</div>
          </td>
          <td>${s.deviceType} <span class="text-secondary text-sm">(${s.deviceBrand} ${s.deviceModel})</span></td>
          <td><span class="badge-status ${statusBadgeClass}">${s.currentStatus}</span></td>
          <td class="text-secondary text-sm">${dateStr}</td>
          <td class="text-end">
            <button class="btn btn-outline-primary btn-sm px-2 py-1 rounded-3" onclick="openUpdateModal('${s.code}')">
              <i class="bi bi-pencil-square"></i> Gestionar
            </button>
          </td>
        </tr>
      `;
      tbody.insertAdjacentHTML('beforeend', rowHTML);
    });

  } catch (error) {
    console.error('Error cargando el dashboard:', error);
  }
}

function filterTable() {
  const query = document.getElementById('table-filter').value.toLowerCase();
  const rows = document.querySelectorAll('#orders-table-body tr');

  rows.forEach(row => {
    const code = row.getAttribute('data-code');
    const client = row.getAttribute('data-client');
    
    if (code && client) {
      if (code.toLowerCase().includes(query) || client.toLowerCase().includes(query)) {
        row.classList.remove('d-none');
      } else {
        row.classList.add('d-none');
      }
    }
  });
}

// --- SECCIÓN: DETALLES DE ORDEN Y ACTUALIZACIÓN DE ESTADO ---

async function openUpdateModal(code) {
  try {
    const response = await fetch(`${API_SERVICES}/${code}?role=admin`);
    const result = await response.json();
    
    if (!result.success) {
      alert('No se pudo obtener el detalle de la orden.');
      return;
    }

    const service = result.data;
    
    document.getElementById('modal-code').innerText = service.code;
    document.getElementById('modal-client').innerText = service.clientName;
    document.getElementById('modal-phone').innerText = `Cédula: ${service.clientCedula} | Teléfono: ${service.clientPhone}`;
    document.getElementById('modal-device').innerText = `${service.deviceType} ${service.deviceBrand} (${service.deviceModel})`;
    document.getElementById('modal-issue').innerText = service.issueDescription;
    document.getElementById('modal-diagnosis').innerText = service.technicalDiagnosis || 'Sin diagnóstico cargado.';
    document.getElementById('modal-cost').innerText = `$ ${service.estimatedCost.toFixed(2)}`;
    document.getElementById('modal-notes').innerText = service.technicalNotes || 'Sin notas adicionales.';
    
    document.getElementById('update-target-code').value = service.code;
    document.getElementById('updateStatusSelect').value = service.currentStatus;
    document.getElementById('updateStatusNote').value = ''; 

    const timelineContainer = document.getElementById('modal-timeline');
    timelineContainer.innerHTML = '';
    
    [...service.statusHistory].reverse().forEach(hist => {
      const dateStr = new Date(hist.timestamp).toLocaleString('es-ES');
      const itemHTML = `
        <div class="timeline-item">
          <div class="timeline-date">${dateStr}</div>
          <div class="timeline-title">${hist.status}</div>
          <div class="timeline-desc">${hist.note}</div>
        </div>
      `;
      timelineContainer.insertAdjacentHTML('beforeend', itemHTML);
    });

    updateModal.show();

  } catch (error) {
    console.error('Error al recuperar detalles:', error);
  }
}

async function submitStatusUpdate(event) {
  event.preventDefault();
  
  const code = document.getElementById('update-target-code').value;
  const status = document.getElementById('updateStatusSelect').value;
  const note = document.getElementById('updateStatusNote').value.trim();

  if (!note) {
    alert('Debe justificar el cambio de estado con una nota técnica.');
    return;
  }

  try {
    const response = await fetch(`${API_SERVICES}/${code}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, note })
    });

    const result = await response.json();

    if (!result.success) {
      alert(result.error || 'Error al actualizar el estado.');
      return;
    }

    updateModal.hide();
    loadDashboard();
    
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    alert('Error al conectar con el servidor.');
  }
}

// --- SECCIÓN: PORTAL PÚBLICO DE CLIENTES (BÚSQUEDA) ---

async function searchService(event) {
  event.preventDefault();
  const codeInput = document.getElementById('search-code').value.trim().toUpperCase();
  const resultContainer = document.getElementById('client-result-container');
  
  if (codeInput.length !== 6) {
    alert('El código de seguimiento debe contener exactamente 6 caracteres.');
    return;
  }

  try {
    const response = await fetch(`${API_SERVICES}/${codeInput}`);
    const result = await response.json();

    if (!result.success) {
      alert(result.error || 'Código de seguimiento no encontrado.');
      resultContainer.classList.add('d-none');
      return;
    }

    const service = result.data;
    
    document.getElementById('res-code').innerText = service.code;
    document.getElementById('res-date').innerText = new Date(service.createdAt).toLocaleString('es-ES');
    document.getElementById('res-device').innerText = `${service.deviceType} ${service.deviceBrand} - ${service.deviceModel}`;
    document.getElementById('res-issue').innerText = service.issueDescription;

    const badge = document.getElementById('res-badge-status');
    badge.className = 'badge-status'; 
    badge.innerText = service.currentStatus;
    
    switch (service.currentStatus) {
      case 'Recibido': badge.classList.add('badge-recibido'); break;
      case 'En Revisión': badge.classList.add('badge-revision'); break;
      case 'Listo': badge.classList.add('badge-listo'); break;
      case 'Entregado': badge.classList.add('badge-entregado'); break;
    }

    const timelineContainer = document.getElementById('res-timeline');
    timelineContainer.innerHTML = '';

    [...service.statusHistory].reverse().forEach(hist => {
      const dateStr = new Date(hist.timestamp).toLocaleString('es-ES');
      const itemHTML = `
        <div class="timeline-item">
          <div class="timeline-date">${dateStr}</div>
          <div class="timeline-title">${hist.status}</div>
          <div class="timeline-desc">${hist.note}</div>
        </div>
      `;
      timelineContainer.insertAdjacentHTML('beforeend', itemHTML);
    });

    resultContainer.classList.remove('d-none');
    resultContainer.scrollIntoView({ behavior: 'smooth' });

  } catch (error) {
    console.error('Error al realizar búsqueda:', error);
    alert('Ocurrió un error de conexión con el servidor.');
  }
}
