# Manual Técnico

## 1. Requisitos para ejecutar el proyecto
Para correr y mantener el sistema **RMB Soluciones** en su entorno local, se requiere:
* **Entorno de ejecución (Runtime)**: Node.js (versión 18.0 o superior recomendada).
* **Gestor de paquetes**: npm (incluido por defecto con Node.js).
* **Navegador**: Google Chrome o cualquier navegador moderno compatible con ES6 y Fetch API.

## 2. Instalación
1. Descargue o clone el código del repositorio en su directorio local de trabajo.
2. Abra una terminal de comandos en la carpeta raíz del proyecto (`servicio-tecnico`).
3. Instale las dependencias de red de Node.js ejecutando:
   ```bash
   npm install
   ```

## 3. Configuración y Despliegue
* **Puertos de Red**: Por defecto, el backend corre en el puerto `3000`. Si el puerto estuviera ocupado, el servidor detectará la colisión de forma controlada.
* **Persistencia local**: La base de datos local se configura de manera automática. Al arrancar el servidor por primera vez, este leerá el archivo `src/backend/data.json`. Si el archivo no existe o carece de la estructura relacional obligatoria, el sistema inicializará las colecciones vacías:
  ```json
  {
    "clientes": [],
    "ordenes_servicio": []
  }
  ```

## 4. Estructura de código relevante
* `src/backend/server.js`: Levanta el servidor Express y mapea las rutas API y estáticas.
* `src/backend/database.js`: Abstracción relacional del JSON. Implementa filtros sincrónicos y escrituras seguras en el archivo local.
* `src/frontend/index.html`: Estructura SPA y formularios de Bootstrap 5 con tema en Gris y Azul Claro.
* `src/frontend/js/app.js`: Coordina las llamadas fetch asíncronas de red, autorelleno, transiciones e intercambio visual de secciones.
* `src/frontend/css/styles.css`: Definición de la paleta de colores azul/gris, sombreados, sidebar fijo y adaptabilidad responsiva.
