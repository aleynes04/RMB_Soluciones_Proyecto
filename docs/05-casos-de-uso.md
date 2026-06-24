# Casos de Uso

### CU-001 — Consultar Estado de Equipo
* **Objetivo**: Permitir que un cliente consulte de forma remota y segura el estado de reparación de su equipo.
* **Actor principal**: Cliente (Público)
* **Precondiciones**: Debe existir una orden registrada en el sistema con un código de seguimiento de 6 caracteres.
* **Flujo principal**:
  1. El cliente accede a la opción "Consulta" en el menú de la SPA.
  2. El cliente ingresa el código de 6 caracteres de su comprobante y presiona "Buscar".
  3. El sistema busca la orden mediante Fetch API.
  4. El sistema responde con los datos públicos del equipo (marca, modelo, falla) y renderiza una línea de tiempo con los estados y marcas de tiempo del historial.
* **Excepciones**:
  * Código no registrado o con longitud diferente a 6 caracteres: el sistema muestra una alerta clara indicando "Código no encontrado" o "Formato incorrecto".
* **Postcondiciones**: El cliente visualiza la información de estado sin poder editar ningún dato.
* **Requerimientos asociados**: RF-001

---

### CU-002 — Registrar Nuevo Cliente
* **Objetivo**: Registrar de forma permanente a un cliente nuevo en la base de datos mediante su Cédula.
* **Actor principal**: Técnico
* **Precondiciones**: El técnico ha ingresado al panel privado mediante autenticación exitosa.
* **Flujo principal**:
  1. El técnico selecciona el módulo "Clientes" en el panel.
  2. El técnico completa el formulario ingresando Cédula de Identidad, Nombre Completo y Teléfono de contacto.
  3. El técnico hace clic en "Registrar Cliente".
  4. El sistema valida los datos (campos no vacíos y cédula única) y los persiste en `data.json`.
* **Excepciones**:
  * Cédula de Identidad ya registrada o formato inválido: el sistema rechaza la petición mostrando una alerta de error de duplicidad.
* **Postcondiciones**: El cliente queda registrado de forma permanente y disponible para vincular a órdenes de servicio.
* **Requerimientos asociados**: RF-003

---

### CU-003 — Generar Nueva Orden de Servicio
* **Objetivo**: Crear una orden de reparación vinculando un equipo a un cliente registrado de forma relacional.
* **Actor principal**: Técnico
* **Precondiciones**: El técnico ha iniciado sesión y el cliente está registrado en el sistema.
* **Flujo principal**:
  1. El técnico abre el módulo "Nueva Orden".
  2. El técnico comienza a escribir la Cédula del cliente.
  3. Al detectar la entrada, el sistema busca al cliente de forma asíncrona. Si existe, autorellena los campos Nombre y Teléfono en modo lectura e indica el conteo de servicios previos de ese cliente.
  4. El técnico selecciona el tipo de dispositivo (ej. **"Impresoras"**), marca, modelo, y describe la falla.
  5. El técnico ingresa el diagnóstico inicial obligatorio, coste estimado y notas internas.
  6. El técnico hace clic en "Crear Orden de Servicio".
  7. El backend genera el código único de 6 caracteres, guarda la orden en `data.json` y muestra el comprobante con el código de seguimiento.
* **Excepciones**:
  * El cliente no existe en la base de datos: el sistema muestra una advertencia indicando que la cédula no existe y que debe registrar al cliente primero.
  * Falta algún campo obligatorio (ej. diagnóstico inicial o marca): el sistema resalta los campos pendientes.
* **Postcondiciones**: Se genera la orden en estado `Recibido` y el código de seguimiento queda impreso para el cliente.
* **Requerimientos asociados**: RF-004, RF-005

---

### CU-004 — Actualizar Estado de Reparación
* **Objetivo**: Modificar el estado actual del equipo en su ciclo de vida y documentar el avance.
* **Actor principal**: Técnico
* **Precondiciones**: El técnico ha iniciado sesión, la orden existe y no está en estado final `Entregado`.
* **Flujo principal**:
  1. El técnico localiza la orden en la lista del panel y hace clic en "Actualizar Estado" (o abre su detalle).
  2. El técnico selecciona el nuevo estado (`En Revisión`, `Listo` o `Entregado`).
  3. El técnico escribe una nota u observación obligatoria que justifique el cambio.
  4. El técnico hace clic en "Guardar Estado".
  5. El backend registra la nueva transición en `statusHistory` con la fecha y hora actual y la nota ingresada.
* **Excepciones**:
  * Intento de guardar sin ingresar una nota técnica explicativa: el sistema detiene el envío y solicita el comentario.
* **Postcondiciones**: El estado del equipo se actualiza inmediatamente en el listado privado y en el buscador público.
* **Requerimientos asociados**: RF-006, RF-007
