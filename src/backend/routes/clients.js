const express = require('express');
const router = express.Router();
const db = require('../database');

// Middleware para validar campos de registro de cliente
function validateClientCreation(req, res, next) {
  const { cedula, name, phone } = req.body;
  
  if (!cedula || !name || !phone) {
    return res.status(400).json({
      success: false,
      error: 'Todos los campos (Cédula, Nombre y Teléfono) son obligatorios.'
    });
  }
  
  if (cedula.trim().length < 6) {
    return res.status(400).json({
      success: false,
      error: 'La Cédula de Identidad debe tener al menos 6 caracteres.'
    });
  }
  
  next();
}

// 1. Obtener todos los clientes (Técnico)
router.get('/', (req, res) => {
  try {
    const clients = db.getAllClients();
    res.json({
      success: true,
      data: clients
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al recuperar los clientes.'
    });
  }
});

// 2. Buscar cliente por cédula con autorelleno e historial (Técnico)
router.get('/:cedula', (req, res) => {
  try {
    const client = db.getClientByCedula(req.params.cedula);
    if (!client) {
      return res.status(404).json({
        success: false,
        error: 'Cliente no encontrado.'
      });
    }
    
    // Contar las reparaciones asociadas
    const repairCount = db.getServiceCountByClient(client.cedula);
    
    res.json({
      success: true,
      data: {
        ...client,
        repairCount: repairCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al buscar el cliente.'
    });
  }
});

// 3. Registrar un nuevo cliente (Técnico)
router.post('/', validateClientCreation, (req, res) => {
  try {
    const { cedula, name, phone } = req.body;
    
    // Validar duplicado
    const existingClient = db.getClientByCedula(cedula);
    if (existingClient) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un cliente registrado con esta Cédula de Identidad.'
      });
    }
    
    const newClient = db.createClient({ cedula, name, phone });
    if (!newClient) {
      return res.status(500).json({
        success: false,
        error: 'No se pudo guardar el cliente.'
      });
    }
    
    res.status(201).json({
      success: true,
      data: newClient
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al registrar el cliente.'
    });
  }
});

module.exports = router;
