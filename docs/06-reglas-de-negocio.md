# Reglas de Negocio

### RN-001 — Formato de Código de Seguimiento Único
* **Descripción**: Al crear una orden de servicio, el sistema debe generar de manera obligatoria un código de seguimiento único.
* **Condición**: El código debe tener exactamente **6 caracteres**, alfanumérico y en letras mayúsculas (ej: `AZ4590`).
* **Resultado esperado**: Debe validarse que no existan colisiones (duplicados) en la base de datos de órdenes antes de guardarse.
* **Tipo**: Restricción y generación automática.
* **Fuente**: Requerimiento del cliente y seguridad.

---

### RN-002 — Flujo Lineal de Estados
* **Descripción**: El dispositivo del cliente debe seguir un ciclo de vida ordenado.
* **Condición**: Los estados permitidos y su orden habitual de transición son:
  `Recibido` ➔ `En Revisión` ➔ `Listo` ➔ `Entregado`.
* **Resultado esperado**: No se debe permitir transiciones a estados inexistentes. El estado inicial por defecto al crear cualquier orden siempre es `Recibido`.
* **Tipo**: Flujo de proceso.
* **Fuente**: Estándar operativo del taller.

---

### RN-003 — Cédula de Identidad como PK del Cliente
* **Descripción**: Todo cliente registrado debe poseer un identificador nacional único en el sistema.
* **Condición**: La Cédula de Identidad actúa como Clave Primaria (PK). No se admiten clientes sin cédula, ni duplicados. Debe tener un mínimo de 6 caracteres numéricos o formato nacional válido.
* **Resultado esperado**: El sistema rechaza cualquier intento de registrar un cliente con una Cédula que ya exista en la colección de clientes.
* **Tipo**: Validación / Integridad.
* **Fuente**: Optimización del modelo de datos de RMB Soluciones.

---

### RN-004 — Relación Clientes-Órdenes (Integridad Referencial)
* **Descripción**: Una orden de servicio no puede existir de forma huérfana en el sistema; debe estar estrictamente vinculada a un cliente.
* **Condición**: Al crear la orden, se debe proveer una Cédula de Identidad que exista en la colección `clientes` (actúa como FK).
* **Resultado esperado**: Si la Cédula ingresada no existe en la base de datos, el formulario de órdenes no se puede enviar y se solicita registrar al cliente de antemano.
* **Tipo**: Integridad Referencial.
* **Fuente**: Optimización relacional.

---

### RN-005 — Historial de Auditoría Obligatorio
* **Descripción**: Cada transición del estado de reparación debe registrar un historial detallado para control interno y consulta.
* **Condición**: Se debe registrar:
  * El nuevo estado asignado.
  * La marca de tiempo exacta (ISO UTC).
  * Una nota o justificación técnica provista por el operador, la cual es obligatoria.
* **Resultado esperado**: Si el técnico no ingresa el comentario, el sistema detiene el cambio de estado.
* **Tipo**: Validación / Auditoría.
* **Fuente**: Requerimiento operacional de RMB Soluciones.

---

### RN-006 — Clasificación del Dispositivo "Impresoras"
* **Descripción**: El selector de dispositivos debe contemplar de manera explícita y obligatoria la categoría de impresoras.
* **Condición**: Se debe incluir el término **"Impresoras"** dentro de las opciones principales del selector de dispositivos (junto a laptops, móviles, tablets, etc.).
* **Resultado esperado**: Permite categorizar y segmentar las reparaciones específicas de este tipo de periféricos.
* **Tipo**: Restricción de Dominio.
* **Fuente**: Especificación técnica del taller.
