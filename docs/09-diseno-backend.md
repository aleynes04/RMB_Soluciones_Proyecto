# Diseño Backend

## 1. Responsabilidades del backend
El backend de **RMB Soluciones** actúa como un servidor de servicios RESTful y de hosting de archivos estáticos. Sus principales responsabilidades son:
* Servir el archivo `index.html`, los estilos CSS, scripts de JS, y la imagen `logo.jpg`.
* Exponer rutas de la API bajo el prefijo `/api/`.
* Procesar validaciones lógicas y de integridad referencial.
* Generar códigos únicos alfanuméricos de 6 caracteres no repetitivos.
* Escribir de forma segura en la base de datos local `data.json` encapsulando la E/S en disco.

## 2. Módulos o capas
El backend está estructurado de manera modular y limpia en tres capas:

```text
src/backend/
├── server.js               # Capa de inicialización y configuración
├── database.js             # Capa de acceso a datos (E/S disco)
└── routes/                 # Capa de enrutamiento y lógica de negocio
    ├── clients.js          # Control de Clientes
    └── services.js         # Control de Órdenes de Servicio
```

### A. Capa de Inicialización (`server.js`)
* Configura la aplicación Express, middlewares para parsear JSON, y sirve de forma estática la carpeta `src/frontend`.
* Registra los enrutadores en `/api/clients` y `/api/services`.
* Configura el listener en el puerto 3000 con detección automática y reintento en caso de colisión de puertos.

### B. Capa de Enrutamiento (`routes/`)
* **`clients.js`**: Procesa las peticiones `POST /` para registrar clientes y `GET /:cedula` para buscar la información y el recuento histórico de reparaciones de un cliente específico.
* **`services.js`**: Procesa `POST /` para registrar una orden de servicio, `GET /` para el listado técnico, `GET /:code` para la consulta del cliente y `PATCH /:code/status` para la actualización de estados de reparación con nota obligatoria.

### C. Capa de Datos (`database.js`)
* Módulo autocontenido que se comunica directamente con `data.json`.
* Implementa bloqueos implícitos mediante el uso de operaciones de lectura/escritura síncronas (`fs.readFileSync` y `fs.writeFileSync`), previniendo condiciones de carrera e inconsistencia de datos al escribir el archivo JSON.
* Retorna copias de los datos y realiza uniones (joins) lógicas entre las colecciones de clientes y servicios.

## 3. Manejo de errores
* El backend valida que ningún campo obligatorio esté vacío y que las referencias cumplan la integridad (ej. que la cédula del cliente exista al crear una orden).
* Todas las excepciones dentro de las funciones de ruta se capturan en bloques `try-catch` para evitar fallos catastróficos que detengan el servidor.
* **Estructura de Respuesta de Error (JSON)**:
  ```json
  {
    "success": false,
    "error": "Descripción detallada del error de validación o del sistema"
  }
  ```
  Acompañado de los códigos de estado HTTP semánticos (400, 404, 500).
