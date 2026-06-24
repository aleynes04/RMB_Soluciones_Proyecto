const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');

// Inicializa el archivo de base de datos si no existe con la nueva estructura
function initDatabase() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ clientes: [], ordenes_servicio: [] }, null, 2), 'utf8');
  } else {
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        // Migrar formato antiguo plano a la nueva estructura relacional
        fs.writeFileSync(DATA_FILE, JSON.stringify({ clientes: [], ordenes_servicio: parsed }, null, 2), 'utf8');
      } else if (!parsed.clientes || !parsed.ordenes_servicio) {
        fs.writeFileSync(DATA_FILE, JSON.stringify({
          clientes: parsed.clientes || [],
          ordenes_servicio: parsed.ordenes_servicio || []
        }, null, 2), 'utf8');
      }
    } catch (e) {
      fs.writeFileSync(DATA_FILE, JSON.stringify({ clientes: [], ordenes_servicio: [] }, null, 2), 'utf8');
    }
  }
}

// --- CLIENTES ---

function getAllClients() {
  initDatabase();
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return data.clientes || [];
  } catch (error) {
    console.error('Error leyendo clientes:', error);
    return [];
  }
}

function getClientByCedula(cedula) {
  if (!cedula) return null;
  initDatabase();
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return (data.clientes || []).find(c => c.cedula.toUpperCase() === cedula.toUpperCase()) || null;
  } catch (error) {
    console.error('Error buscando cliente por cédula:', error);
    return null;
  }
}

function createClient(clientData) {
  initDatabase();
  try {
    const fileData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    
    // Validar si ya existe un cliente con esa cédula (insensible a mayúsculas/minúsculas)
    const exists = fileData.clientes.some(c => c.cedula.toUpperCase() === clientData.cedula.toUpperCase());
    if (exists) return null;
    
    const newClient = {
      cedula: clientData.cedula,
      name: clientData.name,
      phone: clientData.phone,
      createdAt: new Date().toISOString()
    };
    
    fileData.clientes.push(newClient);
    fs.writeFileSync(DATA_FILE, JSON.stringify(fileData, null, 2), 'utf8');
    return newClient;
  } catch (error) {
    console.error('Error al registrar cliente:', error);
    return null;
  }
}

function getServiceCountByClient(cedula) {
  if (!cedula) return 0;
  initDatabase();
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const services = data.ordenes_servicio || [];
    return services.filter(s => s.clientCedula && s.clientCedula.toUpperCase() === cedula.toUpperCase()).length;
  } catch (error) {
    console.error('Error al contar reparaciones del cliente:', error);
    return 0;
  }
}

// --- ÓRDENES DE SERVICIO ---

function getAllServices() {
  initDatabase();
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const clients = data.clientes || [];
    return (data.ordenes_servicio || []).map(service => {
      const client = (service.clientCedula && clients.length > 0)
        ? clients.find(c => c.cedula.toUpperCase() === service.clientCedula.toUpperCase())
        : null;
      return {
        ...service,
        clientName: client ? client.name : (service.clientName || 'Desconocido'),
        clientPhone: client ? client.phone : (service.clientPhone || '')
      };
    });
  } catch (error) {
    console.error('Error leyendo la base de datos:', error);
    return [];
  }
}

function getServiceByCode(code) {
  if (!code) return null;
  initDatabase();
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const service = (data.ordenes_servicio || []).find(s => s.code.toUpperCase() === code.toUpperCase());
    if (!service) return null;
    
    const client = service.clientCedula
      ? (data.clientes || []).find(c => c.cedula.toUpperCase() === service.clientCedula.toUpperCase())
      : null;
    return {
      ...service,
      clientName: client ? client.name : (service.clientName || 'Desconocido'),
      clientPhone: client ? client.phone : (service.clientPhone || '')
    };
  } catch (error) {
    console.error('Error al obtener servicio:', error);
    return null;
  }
}

function createService(serviceData) {
  initDatabase();
  try {
    const fileData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const code = generateTrackingCode();
    const timestamp = new Date().toISOString();
    
    const newService = {
      code: code,
      clientCedula: serviceData.clientCedula,
      deviceType: serviceData.deviceType,
      deviceBrand: serviceData.deviceBrand,
      deviceModel: serviceData.deviceModel,
      issueDescription: serviceData.issueDescription,
      technicalDiagnosis: serviceData.technicalDiagnosis || 'Pendiente de revisión.',
      currentStatus: 'Recibido',
      createdAt: timestamp,
      updatedAt: timestamp,
      statusHistory: [
        {
          status: 'Recibido',
          timestamp: timestamp,
          note: 'Equipo ingresado al sistema.'
        }
      ],
      technicalNotes: serviceData.technicalNotes || '',
      estimatedCost: parseFloat(serviceData.estimatedCost) || 0
    };
    
    fileData.ordenes_servicio.push(newService);
    fs.writeFileSync(DATA_FILE, JSON.stringify(fileData, null, 2), 'utf8');
    
    const client = (fileData.clientes || []).find(c => c.cedula.toUpperCase() === newService.clientCedula.toUpperCase());
    return {
      ...newService,
      clientName: client ? client.name : 'Desconocido',
      clientPhone: client ? client.phone : ''
    };
  } catch (error) {
    console.error('Error al crear el servicio:', error);
    return null;
  }
}

function updateServiceStatus(code, newStatus, technicianNote) {
  initDatabase();
  try {
    const fileData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const index = fileData.ordenes_servicio.findIndex(s => s.code.toUpperCase() === code.toUpperCase());
    if (index === -1) return null;
    
    const timestamp = new Date().toISOString();
    const service = fileData.ordenes_servicio[index];
    
    service.currentStatus = newStatus;
    service.updatedAt = timestamp;
    service.statusHistory.push({
      status: newStatus,
      timestamp: timestamp,
      note: technicianNote || `Cambio de estado a ${newStatus}.`
    });
    
    fileData.ordenes_servicio[index] = service;
    fs.writeFileSync(DATA_FILE, JSON.stringify(fileData, null, 2), 'utf8');
    
    const client = service.clientCedula
      ? (fileData.clientes || []).find(c => c.cedula.toUpperCase() === service.clientCedula.toUpperCase())
      : null;
    return {
      ...service,
      clientName: client ? client.name : (service.clientName || 'Desconocido'),
      clientPhone: client ? client.phone : (service.clientPhone || '')
    };
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    return null;
  }
}

function generateTrackingCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  initDatabase();
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const services = data.ordenes_servicio || [];
    
    let code;
    let isUnique = false;
    
    while (!isUnique) {
      code = '';
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      isUnique = !services.some(s => s.code === code);
    }
    return code;
  } catch (e) {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }
}

module.exports = {
  getAllClients,
  getClientByCedula,
  createClient,
  getServiceCountByClient,
  getAllServices,
  getServiceByCode,
  createService,
  updateServiceStatus
};
