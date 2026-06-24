const express = require('express');
const router = express.Router();
const db = require('../database');

// Middleware para validar campos obligatorios de creación
function validateServiceCreation(req, res, next) {
  const { clientCedula, deviceType, deviceBrand, deviceModel, issueDescription, technicalDiagnosis } = req.body;
  
  if (!clientCedula || !deviceType || !deviceBrand || !deviceModel || !issueDescription || !technicalDiagnosis) {
    return res.status(400).json({
      success: false,
      error: 'Todos los campos obligatorios (Cédula de Cliente, Tipo de Dispositivo, Marca, Modelo, Falla y Diagnóstico Técnico) deben estar completos.'
    });
  }
  next();
}

// Middleware para validar actualización de estado
function validateStatusUpdate(req, res, next) {
  const { status, note } = req.body;
  const validStatuses = ['Recibido', 'En Revisión', 'Listo', 'Entregado'];
  
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      error: `El estado es obligatorio y debe ser uno de: ${validStatuses.join(', ')}`
    });
  }
  
  if (!note || note.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Debe incluir una nota u observación técnica que justifique el cambio de estado.'
    });
  }
  next();
}

// 1. Obtener todas las órdenes de servicio (Vista del Técnico - incluye notas privadas)
router.get('/', (req, res) => {
  try {
    const services = db.getAllServices();
    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al recuperar las órdenes de servicio.'
    });
  }
});

// 2. Registrar nueva orden de servicio (Técnico)
router.post('/', validateServiceCreation, (req, res) => {
  try {
    // Validar primero si el cliente existe
    const client = db.getClientByCedula(req.body.clientCedula);
    if (!client) {
      return res.status(400).json({
        success: false,
        error: 'El cliente asociado no está registrado. Debe registrar al cliente antes de crear la orden de servicio.'
      });
    }

    const newService = db.createService(req.body);
    if (!newService) {
      return res.status(500).json({
        success: false,
        error: 'Error al crear el registro de orden de servicio.'
      });
    }

    res.status(201).json({
      success: true,
      data: newService
    });
  } catch (error) {
    console.error('Error al guardar la orden de servicio:', error);
    res.status(500).json({
      success: false,
      error: 'Error al registrar la orden de servicio.'
    });
  }
});

// 3. Consultar estado por código (Vista Pública del Cliente - Sanitizado para seguridad)
router.get('/:code', (req, res) => {
  try {
    const service = db.getServiceByCode(req.params.code);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'No se encontró ningún equipo con el código de seguimiento provisto.'
      });
    }
    
    // Si se pasa query 'role=admin', devolvemos el objeto completo (para el panel del técnico)
    const isAdmin = req.query.role === 'admin';
    
    if (isAdmin) {
      return res.json({
        success: true,
        data: service
      });
    }
    
    // Sanitización para el cliente público
    const sanitizedService = {
      code: service.code,
      deviceType: service.deviceType,
      deviceBrand: service.deviceBrand,
      deviceModel: service.deviceModel,
      issueDescription: service.issueDescription,
      currentStatus: service.currentStatus,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
      statusHistory: service.statusHistory // El historial de estados sí es público
    };
    
    res.json({
      success: true,
      data: sanitizedService
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al buscar el código de seguimiento.'
    });
  }
});

// 4. Actualizar estado y agregar historial (Técnico)
router.patch('/:code/status', validateStatusUpdate, (req, res) => {
  try {
    const { status, note } = req.body;
    const updatedService = db.updateServiceStatus(req.params.code, status, note);
    
    if (!updatedService) {
      return res.status(404).json({
        success: false,
        error: 'No se encontró el equipo para actualizar su estado.'
      });
    }
    
    res.json({
      success: true,
      data: updatedService
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al actualizar el estado de la orden.'
    });
  }
});

module.exports = router;
