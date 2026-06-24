# Requerimientos No Funcionales

### RNF-001 — Usabilidad e Identidad Visual
* **Descripción**: La interfaz debe ser intuitiva, responsiva y de carga ágil. Adopta una paleta de colores limpia basada exclusivamente en **Azul Claro** y **Gris** con bordes suavizados e iconografía de Bootstrap Icons.
* **Detalles**:
  * Menú lateral (sidebar) responsivo que se transforma en menú de colapso en pantallas móviles.
  * Mensaje de bienvenida visible al iniciar que explica de forma amigable el propósito del sistema.
  * Logo corporativo visible en la cabecera y sección de bienvenida.

### RNF-002 — Rendimiento y Concurrencia
* **Descripción**: El sistema debe responder de forma casi instantánea a las peticiones del frontend.
* **Detalles**:
  * Las llamadas REST (`fetch`) deben completarse en un tiempo promedio inferior a 100 milisegundos en entorno local.
  * El autorelleno por cédula al crear órdenes debe ejecutarse de forma asíncrona mediante el evento `input` sin bloquear la interacción general del usuario.
  * La lectura y escritura en la persistencia local JSON se maneja de forma eficiente evitando bloqueos y fugas de memoria.

### RNF-003 — Seguridad y Privacidad
* **Descripción**: Control de acceso a las vistas administrativas y resguardo de la información interna.
* **Detalles**:
  * Autenticación local en el panel técnico protegida mediante clave de acceso única.
  * Separación estricta de la información técnica/privada: el endpoint público `/api/services/:code` no expone bajo ninguna circunstancia el campo `technicalNotes` ni la cédula completa del cliente, protegiendo su privacidad.
  * Sanitización de cadenas en inputs de formularios para prevenir inyección de scripts HTML/XSS.

### RNF-004 — Disponibilidad y Resiliencia
* **Descripción**: Tolerancia a fallas locales y ejecución fuera de línea.
* **Detalles**:
  * La aplicación debe funcionar localmente sin depender de bases de datos externas en la nube (ejecución 100% autocontenida).
  * Tolerancia a fallas de formato en archivos de base de datos (`data.json`): si el archivo se encuentra vacío o dañado, el backend debe regenerar la estructura inicial automáticamente para evitar caídas del servidor.

### RNF-005 — Mantenibilidad y Estructura de Código
* **Descripción**: Organización y separación clara de responsabilidades arquitectónicas.
* **Detalles**:
  * Separación del frontend (HTML, CSS, JS) del backend (servicios Express).
  * El backend no debe hacer manipulación directa del archivo JSON fuera del módulo `database.js`.
  * La base de datos debe almacenar las colecciones de clientes y órdenes por separado de manera relacional.
