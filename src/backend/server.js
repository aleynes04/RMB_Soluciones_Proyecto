const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const servicesRouter = require('./routes/services');
const clientsRouter = require('./routes/clients');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de utilidad
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Servir los archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas de la API
app.use('/api/services', servicesRouter);
app.use('/api/clients', clientsRouter);

// Fallback para SPA - Sirve index.html en cualquier otra ruta no controlada por la API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  Servidor iniciado en http://localhost:${PORT}`);
  console.log(`  Sistema de Gestión de Tareas de Servicio Técnico`);
  console.log(`=======================================================`);
});
