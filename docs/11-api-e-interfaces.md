# API e Interfaces

La comunicación entre la SPA (frontend) y el servidor (backend) se realiza mediante una interfaz RESTful que intercambia datos en formato JSON.

---

### 1. Módulo: Clientes (`/api/clients`)

#### API-001 — Registrar Cliente
* **Método**: `POST`
* **Ruta**: `/api/clients`
* **Objetivo**: Registra de forma permanente a un cliente en el sistema.
* **Entrada (JSON Body)**:
  ```json
  {
    "cedula": "12345678",
    "name": "María González",
    "phone": "+584120000000"
  }
  ```
* **Salida (211 Created)**:
  ```json
  {
    "success": true,
    "data": {
      "cedula": "12345678",
      "name": "María González",
      "phone": "+584120000000",
      "createdAt": "2026-06-22T02:00:00.000Z"
    }
  }
  ```
* **Errores posibles**:
  * `400 Bad Request`: Campos obligatorios vacíos o formato inválido.
  * `400 Bad Request`: La Cédula ya está registrada en el sistema.
* **Autenticación**: No obligatoria en API (validación visual de panel en cliente).

#### API-002 — Consultar Cliente por Cédula (Búsqueda / Autorelleno)
* **Método**: `GET`
* **Ruta**: `/api/clients/:cedula`
* **Objetivo**: Busca a un cliente registrado por su cédula y devuelve sus datos junto con el recuento histórico de reparaciones asociadas.
* **Entrada**: Cédula en parámetros de la URL (ej. `/api/clients/12345678`).
* **Salida (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "cedula": "12345678",
      "name": "María González",
      "phone": "+584120000000",
      "createdAt": "2026-06-22T02:00:00.000Z",
      "serviceCount": 3
    }
  }
  ```
* **Errores posibles**:
  * `404 Not Found`: El cliente no está registrado en el sistema.

---

### 2. Módulo: Órdenes de Servicio (`/api/services`)

#### API-003 — Obtener Todas las Órdenes (Listado Técnico)
* **Método**: `GET`
* **Ruta**: `/api/services`
* **Objetivo**: Obtiene la lista completa de órdenes de servicio registradas con los datos del cliente asociados mediante un cruce interno.
* **Salida (200 OK)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "code": "X1Y2Z3",
        "clientCedula": "12345678",
        "clientName": "María González",
        "clientPhone": "+584120000000",
        "deviceType": "Impresoras",
        "deviceBrand": "Epson",
        "deviceModel": "L3110",
        "currentStatus": "En Revisión",
        "estimatedCost": 35.0,
        "createdAt": "2026-06-22T02:05:00.000Z"
      }
    ]
  }
  ```

#### API-004 — Consultar Orden por Código (Consulta Pública Segura)
* **Método**: `GET`
* **Ruta**: `/api/services/:code`
* **Objetivo**: Permite que un cliente consulte el estado de su equipo. Protege la información sensible (no incluye notas técnicas internas ni datos del cliente).
* **Entrada**: Código de 6 caracteres en la URL (ej. `/api/services/X1Y2Z3`).
* **Salida (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "code": "X1Y2Z3",
      "deviceType": "Impresoras",
      "deviceBrand": "Epson",
      "deviceModel": "L3110",
      "issueDescription": "No imprime en color negro.",
      "currentStatus": "En Revisión",
      "statusHistory": [
        {
          "status": "Recibido",
          "timestamp": "2026-06-22T02:05:00.000Z",
          "note": "Equipo ingresado al taller."
        },
        {
          "status": "En Revisión",
          "timestamp": "2026-06-22T02:15:00.000Z",
          "note": "Limpieza de cabezales en proceso."
        }
      ],
      "createdAt": "2026-06-22T02:05:00.000Z",
      "updatedAt": "2026-06-22T02:15:00.000Z"
    }
  }
  ```
* **Errores posibles**:
  * `404 Not Found`: El código de seguimiento no coincide con ninguna orden.

#### API-005 — Generar Nueva Orden de Servicio
* **Método**: `POST`
* **Ruta**: `/api/services`
* **Objetivo**: Crea un registro de reparación en el sistema.
* **Entrada (JSON Body)**:
  ```json
  {
    "clientCedula": "12345678",
    "deviceType": "Impresoras",
    "deviceBrand": "Epson",
    "deviceModel": "L3110",
    "issueDescription": "No imprime en color negro.",
    "technicalDiagnosis": "Cabezal obstruido por falta de uso.",
    "estimatedCost": 35.0,
    "technicalNotes": "Requiere tintas originales."
  }
  ```
* **Salida (201 Created)**: Retorna la orden creada incluyendo el código de 6 caracteres generado.
  ```json
  {
    "success": true,
    "data": {
      "code": "X1Y2Z3",
      "clientCedula": "12345678",
      "currentStatus": "Recibido"
    }
  }
  ```
* **Errores posibles**:
  * `400 Bad Request`: Falta algún campo requerido (cédula del cliente o diagnóstico obligatorio).
  * `400 Bad Request`: La cédula del cliente ingresada no está registrada en el sistema.

#### API-006 — Actualizar Estado de Orden
* **Método**: `PATCH`
* **Ruta**: `/api/services/:code/status`
* **Objetivo**: Cambia el estado del equipo y añade una nota explicativa al historial de auditoría.
* **Entrada (JSON Body)**:
  ```json
  {
    "status": "Listo",
    "note": "Limpieza de cabezales completada con éxito. Impresión de prueba OK."
  }
  ```
* **Salida (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "code": "X1Y2Z3",
      "currentStatus": "Listo"
    }
  }
  ```
* **Errores posibles**:
  * `400 Bad Request`: Falta la nota explicativa o el estado seleccionado no es válido.
  * `404 Not Found`: La orden indicada no existe.
