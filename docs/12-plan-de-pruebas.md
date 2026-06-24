# Plan de Pruebas

## 1. Objetivo
Validar y asegurar el comportamiento funcional y la persistencia de datos en el sistema **RMB Soluciones**, garantizando el cumplimiento estricto de las reglas de negocio (RN-001 a RN-006).

## 2. Tipos de prueba
* **Pruebas de Integración (API)**: Verificación del correcto funcionamiento de los endpoints RESTful expuestos por Node.js/Express, respuestas semánticas JSON y persistencia en el archivo `data.json`.
* **Pruebas Funcionales (Frontend SPA)**: Validación en navegador del flujo SPA, eventos en caliente (autorelleno al tipear la cédula), y renderizado de la línea de tiempo.
* **Pruebas de Seguridad/Privacidad**: Comprobación de que la consulta pública restringe el acceso a la cédula completa y notas técnicas del operador.

---

## 3. Casos de prueba detallados

### CP-001 — Registro de Cliente y Validación de Duplicados
* **Objetivo**: Validar el registro de un cliente y que el sistema impida duplicar la Cédula (PK).
* **Precondición**: El técnico ha iniciado sesión y se encuentra en el panel de clientes.
* **Pasos**:
  1. Completar el formulario con Cédula: `11223344`, Nombre: `Pedro Pérez`, Teléfono: `5551234`.
  2. Hacer clic en "Registrar Cliente" (verifica creación exitosa).
  3. Intentar rellenar el formulario con la misma Cédula: `11223344`, Nombre: `Pedro Gómez`, Teléfono: `5554321`.
  4. Hacer clic en "Registrar Cliente" (verifica rechazo).
* **Resultado esperado**: El primer registro es exitoso y se guarda en `data.json`. El segundo registro falla arrojando un mensaje que indica que la cédula ya se encuentra registrada.
* **Estado**: Aprobado

### CP-002 — Autorelleno y Consulta de Frecuencia del Cliente
* **Objetivo**: Verificar que al escribir la Cédula de un cliente registrado en la orden de servicio, sus datos se completen solos e informe la cantidad de reparaciones previas.
* **Precondición**: El cliente con Cédula `11223344` ya está registrado en el sistema.
* **Pasos**:
  1. Acceder a la sección de "Generar Orden de Servicio".
  2. Escribir `11223344` en el campo Cédula.
* **Resultado esperado**: Los campos de Nombre Completo y Teléfono de la interfaz se autocompletan de forma inmediata con los datos de "Pedro Pérez" y "5551234". Se muestra un mensaje dinámico indicando cuántas órdenes previas tiene registradas (ej. "Cliente frecuente: 0 servicios anteriores").
* **Estado**: Aprobado

### CP-003 — Generación de Orden de Servicio y Código Único
* **Objetivo**: Crear una orden con todos los campos requeridos, verificar que se asocie al cliente, y genere el código de 6 caracteres.
* **Precondición**: El cliente `11223344` existe en el sistema.
* **Pasos**:
  1. Completar la cédula `11223344`.
  2. Seleccionar el tipo de dispositivo "Impresoras".
  3. Ingresar Marca: `Epson`, Modelo: `EcoTank`, Falla: `Rayas en impresión`, Diagnóstico Técnico: `Inyectores tapados`.
  4. Costo: `20`, Notas: `Limpieza profunda`.
  5. Hacer clic en "Crear Orden de Servicio".
* **Resultado esperado**: Se genera una alerta de éxito con un código alfanumérico único de 6 caracteres (ej: `HJ90P2`). El equipo aparece en el listado con estado `Recibido`.
* **Estado**: Aprobado

### CP-004 — Cambio de Estado con Comentario Obligatorio
* **Objetivo**: Verificar que un técnico pueda cambiar el estado de un equipo y que se exija ingresar una nota justificativa.
* **Precondición**: Existe la orden creada en el paso anterior.
* **Pasos**:
  1. En la tabla del panel técnico, ubicar la orden y hacer clic en el botón de actualización.
  2. Seleccionar el nuevo estado "En Revisión".
  3. Dejar el campo de notas vacío e intentar presionar "Guardar". (Debe lanzar error).
  4. Completar el campo de notas con "Se desarma el equipo para limpieza manual" y presionar "Guardar".
* **Resultado esperado**: El sistema impide guardar si no hay nota. Al ingresar la nota, el cambio de estado se realiza con éxito, se actualiza en la tabla y se añade al historial.
* **Estado**: Aprobado

### CP-005 — Consulta Pública Segura (Cliente)
* **Objetivo**: Verificar que el cliente visualice el avance de su equipo de manera segura y sin datos privados.
* **Precondición**: Se conoce el código único de 6 caracteres generado (ej. `HJ90P2`).
* **Pasos**:
  1. Ir a la sección pública "Consulta".
  2. Escribir el código y presionar "Buscar".
* **Resultado esperado**: Se despliega el tipo de equipo, marca, modelo, falla e historial de estados. Las notas técnicas privadas de taller ("Limpieza profunda") y la cédula del cliente no son visibles ni se transmiten en la respuesta del backend.
* **Estado**: Aprobado
