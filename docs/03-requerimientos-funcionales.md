# Requerimientos Funcionales

## RF-001 — Consulta de Estado Pública (Búsqueda por Cliente)
* **Descripción**: El cliente puede buscar el estado de su orden ingresando un código único.
* **Actor**: Cliente (Público)
* **Entrada**: Código alfanumérico de 6 caracteres (ej: `TR98A1`).
* **Proceso esperado**: El sistema valida el formato de entrada, busca la orden en la base de datos y, si existe, devuelve los detalles públicos (código, dispositivo, marca, modelo, falla, estado actual e historial de auditoría). Si no existe, muestra un mensaje de error controlado. No expone notas técnicas internas.
* **Salida**: Línea de tiempo visual del estado del equipo y detalles de la reparación.
* **Prioridad**: Alta
* **Observaciones**: No requiere autenticación.

## RF-002 — Autenticación de Técnico (Acceso al Panel)
* **Descripción**: Permite el ingreso del personal técnico al panel administrativo privado.
* **Actor**: Técnico
* **Entrada**: Clave de acceso (`admin123`).
* **Proceso esperado**: El técnico ingresa la clave de acceso. El sistema valida el string en el cliente/servidor y otorga acceso a la vista SPA administrativa.
* **Salida**: Acceso al panel administrativo y dashboard de control.
* **Prioridad**: Alta

## RF-003 — Registro de Clientes
* **Descripción**: Permite dar de alta a un cliente en la base de datos de manera permanente.
* **Actor**: Técnico
* **Entrada**: Cédula de Identidad (ID nacional único, longitud >= 6 caracteres), Nombre Completo, y Teléfono de contacto.
* **Proceso esperado**: El backend valida que la Cédula sea única en la base de datos y que los campos no estén vacíos. Si pasa la validación, registra el cliente.
* **Salida**: Confirmación de registro exitoso.
* **Prioridad**: Alta
* **Observaciones**: La Cédula actúa como Clave Primaria (PK).

## RF-004 — Autorelleno de Datos de Cliente en Orden
* **Descripción**: Al crear una orden, el sistema busca en tiempo real al cliente por su cédula para completar el formulario.
* **Actor**: Técnico / Sistema
* **Entrada**: Cédula de Identidad ingresada en el formulario de la orden.
* **Proceso esperado**: Al escribir o al dispararse el evento `input` en el campo Cédula, el frontend realiza una petición GET al backend. Si encuentra el cliente, completa automáticamente los campos de Nombre Completo y Teléfono en la interfaz, y muestra la cantidad de reparaciones históricas. Si no lo encuentra, indica que debe registrar al cliente primero.
* **Salida**: Autocompletado del formulario y contador de servicios anteriores del cliente.
* **Prioridad**: Alta

## RF-005 — Generación de Orden de Servicio
* **Descripción**: Registra el ingreso de un dispositivo en el taller asociándolo a un cliente existente.
* **Actor**: Técnico
* **Entrada**: Cédula del cliente, tipo de dispositivo (obligatorio, selector que incluye **"Impresoras"**, laptops, smartphones, tablets, otros), marca, modelo, falla reportada, diagnóstico técnico inicial obligatorio, costo estimado y notas técnicas iniciales.
* **Proceso esperado**: El backend verifica que el cliente exista en la base de datos, genera automáticamente un código alfanumérico único de 6 caracteres en mayúsculas, establece el estado inicial en `Recibido`, y registra la orden.
* **Salida**: Confirmación de orden creada y presentación del código único de 6 caracteres generado.
* **Prioridad**: Alta

## RF-006 — Actualización de Estado con Auditoría Obligatoria
* **Descripción**: Permite cambiar el estado de un equipo a lo largo de su ciclo de vida registrando una nota técnica obligatoria.
* **Actor**: Técnico
* **Entrada**: Código de orden, nuevo estado (`Recibido`, `En Revisión`, `Listo` o `Entregado`) y nota técnica explicativa obligatoria.
* **Proceso esperado**: El sistema actualiza el estado actual de la orden, calcula la fecha/hora actual, e inserta una nueva entrada en el historial de estados (`statusHistory`).
* **Salida**: Estado de la orden modificado e historial actualizado.
* **Prioridad**: Alta

## RF-007 — Dashboard Técnico y Métricas
* **Descripción**: Muestra el consolidado de órdenes y estadísticas globales en tiempo real.
* **Actor**: Técnico
* **Entrada**: Carga del panel administrativo.
* **Proceso esperado**: El sistema lee todas las órdenes de servicio vigentes y calcula contadores agrupados por estado (`Recibido`, `En Revisión`, `Listo`, `Entregado`) mostrando las tarjetas estadísticas correspondientes y permitiendo buscar y filtrar en una tabla interactiva.
* **Salida**: Panel de control con métricas y lista filtrable de equipos.
* **Prioridad**: Media
