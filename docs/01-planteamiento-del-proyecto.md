# Planteamiento del Proyecto

## 1. Título del proyecto
**RMB Soluciones** — Sistema de Gestión de Tareas para Servicio Técnico

## 2. Descripción del problema
En los talleres de servicio técnico independientes de dispositivos electrónicos (como computadoras, móviles e impresoras), el control de los equipos en reparación suele presentar múltiples desafíos organizativos:
* **Falta de visibilidad para el cliente**: El cliente no dispone de un portal directo para conocer el estado de su reparación (`Recibido`, `En Revisión`, `Listo`, `Entregado`) y depende de llamadas constantes, lo cual interrumpe el flujo del taller.
* **Falta de control relacional**: No se asocian de forma estricta los equipos con los registros de clientes únicos, lo que genera duplicidad de datos e imposibilidad de rastrear el historial de reparaciones por cliente.
* **Ingreso deficiente de datos**: Es habitual que no se obligue al técnico a consignar un diagnóstico inicial o a documentar detalladamente el motivo de cada cambio de estado, perdiendo la trazabilidad de la auditoría interna.

## 3. Justificación
La construcción de esta aplicación es sumamente valiosa por varios factores:
* **Académico**: Aplica conceptos fundamentales de programación web (Node.js/Express, JS SPA, peticiones asíncronas fetch, manejo de middleware, diseño responsivo con Bootstrap 5, y estructuración de proyectos asistidos por directrices de IA).
* **Técnico**: Demuestra cómo implementar una base de datos relacional ligera persistida localmente en formato JSON (`data.json`) utilizando JavaScript asíncrono y operaciones robustas de lectura/escritura en el filesystem.
* **Práctico**: Ofrece una herramienta real de alta usabilidad, con identidad visual profesional y moderna en Azul Claro y Gris.

## 4. Público objetivo
* **Técnicos del Taller (Operadores privados)**: Necesitan un panel para registrar clientes, autorellenar datos al generar órdenes usando la Cédula del cliente, registrar diagnósticos y actualizar los estados del equipo mediante comentarios obligatorios.
* **Clientes del Servicio Técnico (Público general)**: Necesitan una barra de búsqueda para rastrear sus dispositivos de forma segura a través de un código único de 6 caracteres, viendo solo datos relevantes (sin notas privadas del técnico).

## 5. Idea general de la solución
RMB Soluciones se estructura como una SPA (Single Page Application) limpia y profesional con una paleta en color Gris y Azul Claro. El sistema cuenta con dos flujos principales:
1. **Público**: Un portal de consulta donde el cliente ingresa su código de 6 caracteres para visualizar el estado actual y la línea de tiempo del historial de su equipo.
2. **Privado (Panel Técnico)**: Protegido por una clave de acceso única, permite gestionar de forma ordenada el registro de clientes usando la **Cédula de Identidad** como clave primaria (PK), autocompletar formularios al crear órdenes, asociar el tipo de equipo (con énfasis especial en **"Impresoras"**), capturar fallas, diagnósticos y registrar auditorías detalladas en cada transición.

## 6. Alcance inicial del proyecto
En la versión actual del sistema se ha completado:
* Diseño SPA responsivo con sidebar dinámico (Inicio, Inicio de Sesión / Panel Técnico, Consulta).
* Módulo de Clientes: registro con validación de Cédula como clave única (PK).
* Módulo de Órdenes de Servicio: autorelleno inmediato al escribir la Cédula de un cliente registrado y visualización de su conteo histórico de reparaciones.
* Generador backend de códigos alfanuméricos únicos de 6 caracteres.
* Sistema de bitácora de auditoría inmutable de estados de reparación.

## 7. Restricciones
* **Base de datos local**: Los datos se almacenan exclusivamente en un archivo JSON local en el servidor, sin usar bases de datos externas en la nube.
* **Autenticación simplificada**: Acceso al panel administrativo protegido por una clave estática local (`admin123`).
* **Límites de tiempo**: La aplicación debe ser funcional y estar completamente implementada y documentada en los plazos académicos definidos.

## 8. Riesgos iniciales
* **Conflictos de puertos**: Conflicto de inicio en el puerto 3000 si está ocupado por otra instancia de desarrollo. Se mitiga mediante validaciones de puerto en el backend.
* **Concurrencia en JSON**: Riesgo de inconsistencia al leer y escribir en caliente el archivo `data.json`. Se mitiga mediante operaciones controladas en el módulo de base de datos (`database.js`).
