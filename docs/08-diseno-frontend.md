# Diseño Frontend

## 1. Objetivo del frontend
Proporcionar una interfaz limpia, profesional y moderna basada en una aplicación de página única (SPA). La UI está orientada a optimizar la experiencia tanto del cliente (consulta de orden simplificada con marcas visuales claras) como del técnico (flujo de trabajo ordenado, autorelleno rápido y visualización estadística).

## 2. Estructura de pantallas
La SPA maneja tres secciones principales en el mismo archivo index.html:

### A. Vista de Inicio (Bienvenida)
* **Contenido**: Muestra un banner con el logotipo de la marca (`logo.jpg`), un mensaje de bienvenida formal que saluda al usuario de **RMB Soluciones** y un resumen de las funciones operativas de la plataforma.

### B. Vista de Consulta Pública
* **Contenido**: Campo de búsqueda de 6 caracteres ("Rastrear Equipo"). Al ingresar un código correcto, se despliega una tarjeta de información con los datos del equipo y una línea de tiempo del historial de reparación. El fondo cambia suavemente para destacar el estado actual.

### C. Vista de Inicio de Sesión / Panel Técnico
* **Inicio de Sesión**: Contiene un formulario simplificado con la frase "ingresar clave" y un input para la "clave de acceso".
* **Dashboard / Métricas**: 4 tarjetas de conteo estadístico agrupadas en colores grises y acentos azules que totalizan los equipos en estado `Recibido`, `En Revisión`, `Listo` y `Entregado`.
* **Registrar Cliente**: Formulario de tres campos obligatorios: Cédula, Nombre y Teléfono.
* **Generar Orden**: Formulario avanzado que incluye autorelleno al escribir la Cédula de Identidad, selector obligatorio con la categoría **"Impresoras"**, marca, modelo, falla, diagnóstico técnico inicial obligatorio, costo y notas técnicas.
* **Listado de Tareas**: Tabla interactiva con filtro de búsqueda en tiempo real y botón de actualización que abre un modal para ingresar el nuevo estado y la nota técnica obligatoria.

## 3. Navegación
* **Barra Lateral (Sidebar)**: Panel fijo en el lateral izquierdo en pantallas de escritorio, y colapsable en el menú de navegación superior en móviles. Contiene enlaces a:
  * **Inicio** (Bienvenida)
  * **Consulta** (Portal de Clientes)
  * **Inicio de Sesión** (para técnicos, cambia a **Panel Técnico** al autenticarse, e incluye un botón de "Cerrar Sesión").
* **Enrutamiento SPA**: JavaScript nativo intercepta los clics en el menú y gestiona la visualización agregando o quitando la clase `d-none` de Bootstrap en las secciones correspondientes del DOM.

## 4. Paleta de colores y componentes
* **Fondo general**: `#e9ecef` (gris suave profesional).
* **Color Primario (Acentos)**: Azul Claro (`#0d6efd` adaptado y `#0056b3` para estados de hover).
* **Tarjetas y Rejillas**: Tarjetas blancas con bordes sutiles y sombras grises que le otorgan un aspecto limpio y premium.
* **Tipografía**: Fuente del sistema sans-serif limpia.
* **Logotipo**: `src/frontend/logo.jpg` renderizado con bordes redondeados.
