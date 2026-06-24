# Bitácora de Avances

### Hito 1: Estructura del Servidor y Base de Datos Decolada
* **Fecha**: 19/06/2026
* **Avance realizado**: Configuración inicial de Node.js/Express, creación del enrutador de servicios y desarrollo del módulo de persistencia local en `data.json`.
* **Código modificado**: Creación de `src/backend/server.js`, `database.js` y `routes/services.js`.
* **Documentos creados**: `docs/requerimientos.md` (antiguo) y `docs/arquitectura.md` (antiguo).

---

### Hito 2: Desarrollo del Frontend SPA y Conexión de Red
* **Fecha**: 20/06/2026
* **Avance realizado**: Creación del frontend asíncrono interactivo. Implementación del flujo de la SPA para alternar entre el portal de consulta pública del cliente y el panel privado del técnico.
* **Código modificado**: Creación de `src/frontend/index.html`, `js/app.js` y `css/styles.css` (estilo oscuro Cyberpunk-Yellow original).

---

### Hito 3: Transición de Identidad Visual (RMB Soluciones) y Reglas Relacionales
* **Fecha**: 21/06/2026
* **Avance realizado**:
  * Rediseño estético completo del taller adoptando la paleta de colores **Azul Claro y Gris** con logo de la marca.
  * Reestructuración del backend y base de datos para almacenar de forma desacoplada la colección `clientes` (Cédula como PK) y `ordenes_servicio` (FK a cédula del cliente).
  * Implementación del autorelleno interactivo en tiempo real al escribir la cédula del cliente y visualización del contador de reparaciones previas.
  * Modificación de terminologías en interfaz: "clave de demostración" cambiada por "ingresar clave", y "clave de seguridad" cambiada por "clave de acceso".
* **Código modificado**: `database.js`, `routes/services.js`, `routes/clients.js`, `server.js`, `index.html`, `app.js` y `styles.css`.

---

### Hito 4: Reorganización Documental LP3 e Integración de Directrices de IA
* **Fecha**: 22/06/2026
* **Avance realizado**:
  * Adopción estricta de la estructura del repositorio `project_demo_template`.
  * Creación y despliegue de los 18 archivos de especificación numerados bajo la carpeta `docs/`, eliminando los archivos consolidados obsoletos.
  * Creación de las carpetas de IA `ai/rules/`, `ai/agents/` y `ai/prompts/` conteniendo las directrices para el soporte de modelos de lenguaje, eliminando los archivos anteriores fuera del estándar.
  * Generación del archivo `.gitignore` y de las carpetas deliverables (`evidencia` y `release-notes`).
  * Actualización de la portada principal `README.md`.
* **Código modificado**: Creación de archivos de configuración y documentación en las carpetas `docs/` y `ai/`. Eliminación de archivos obsoletos.
* **Próximo paso**: Validación y empaquetado para la entrega final del semestre.
