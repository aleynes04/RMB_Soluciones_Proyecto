# Objetivos y Alcance

## 1. Objetivo general
Diseñar, desarrollar e implementar la plataforma web **RMB Soluciones**, un sistema de gestión y seguimiento de tareas para talleres de servicio técnico, empleando una arquitectura desacoplada REST API + SPA con Node.js/Express, persistencia estructurada local en formato JSON y una interfaz de usuario optimizada en tonos de Azul Claro y Gris.

## 2. Objetivos específicos
* **Implementar el Módulo de Clientes**: Construir una base de datos relacional de clientes que emplee la Cédula de Identidad como clave primaria (PK) con validaciones de unicidad y formato.
* **Diseñar el Módulo de Creación de Órdenes**: Permitir la generación de tareas vinculadas de forma relacional al cliente mediante Cédula (FK), con autorelleno en tiempo real de nombre/teléfono y visualización del conteo histórico de reparaciones del cliente.
* **Desarrollar el Módulo de Consulta Pública**: Crear una interfaz segura para los clientes donde puedan buscar el estado de su equipo ingresando un código único alfanumérico de 6 caracteres, mostrando una línea de tiempo del historial sin comprometer datos confidenciales.
* **Maquetar una UI/UX Premium**: Implementar una interfaz SPA (Single Page Application) responsiva con un menú lateral (sidebar), una sección de bienvenida y un tema visual basado exclusivamente en Azul Claro y Gris, incorporando el logo de la empresa.
* **Garantizar la Trazabilidad y Calidad**: Registrar marcas de tiempo y notas obligatorias en cada transición del estado de reparación y documentar el uso de IA mediante perfiles de agentes y reglas estructuradas.

## 3. Alcance funcional
El sistema permite realizar las siguientes acciones en su versión actual:
* **Módulo Público**:
  * Consulta del estado de equipos por código de 6 caracteres.
  * Visualización interactiva de la línea de tiempo de transiciones de estado.
* **Módulo Privado (Técnicos)**:
  * Control de acceso mediante clave de seguridad del técnico (`admin123`).
  * Dashboard técnico con métricas de órdenes (Recibidas, En Revisión, Listas, Entregadas).
  * Registro permanente de clientes.
  * Formulario de órdenes con búsqueda y autorelleno de cliente y contador de frecuencia.
  * Selector obligatorio de tipo de dispositivo incluyendo **"Impresoras"**.
  * Actualización de estados del equipo agregando notas técnicas obligatorias.

## 4. Alcance técnico
* **Frontend**: SPA responsiva de página única que utiliza HTML5 semántico, CSS3 personalizado y Bootstrap 5, comunicándose mediante JavaScript Fetch asíncrono.
* **Backend**: Servidor Node.js con framework Express 4, organizando rutas en `/api/clients` y `/api/services`.
* **Persistencia**: Módulo `src/backend/database.js` para la lectura y escritura sincronizada en el archivo local `src/backend/data.json`.

## 5. Fuera de alcance
* Pasarela de pagos en línea o facturación electrónica.
* Envío automatizado de correos electrónicos o mensajes por WhatsApp/SMS.
* Gestión de inventario de repuestos y refacciones.
* Soporte para múltiples talleres o sedes.

## 6. Criterios de éxito
* Funcionamiento sin errores de los módulos público y privado en el navegador Chrome.
* Interfaz con acabados limpios en Gris y Azul Claro con el logo RMB.
* Persistencia consistente de datos (clientes y órdenes relacionados correctamente) en `data.json`.
* Cumplimiento completo de la estructura de 18 archivos de documentación.
