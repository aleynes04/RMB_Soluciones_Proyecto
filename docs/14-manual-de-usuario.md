# Manual de Usuario

## 1. Introducción
La plataforma **RMB Soluciones** permite realizar un seguimiento ágil y transparente de las reparaciones del taller de servicio técnico. Su interfaz SPA se adapta a computadoras y dispositivos móviles.

---

## 2. Flujo del Cliente (Consulta Pública)
1. Ingrese a la aplicación web. En el menú lateral (sidebar), seleccione **"Consulta"**.
2. Escriba el **código de seguimiento de 6 caracteres** (que le entregó el técnico en su comprobante, ej. `XJ89A2`).
3. Presione el botón **"Buscar"**.
4. En pantalla se mostrarán los datos de su equipo y una **Línea de Tiempo** detallada del estado actual (`Recibido`, `En Revisión`, `Listo` o `Entregado`) con marcas de tiempo históricas de cuándo cambió cada estado.

---

## 3. Flujo del Técnico (Panel de Control)
Para administrar los equipos y clientes, el técnico debe seguir estos pasos:

### Paso 1: Inicio de Sesión
1. En el menú lateral, seleccione la opción **"Inicio de Sesión"**.
2. En el campo **"ingresar clave"**, escriba la contraseña de acceso (`admin123`).
3. Presione el botón **"Ingresar"**. Verá que el menú lateral ahora muestra la opción **"Panel Técnico"**.

### Paso 2: Registrar un Cliente
1. Dentro del panel de control técnico, diríjase a la sección **"Registrar Cliente"**.
2. Complete los campos obligatorios: **Cédula de Identidad**, **Nombre Completo** y **Teléfono**.
3. Haga clic en **"Registrar Cliente"**. Un mensaje confirmará el registro.

### Paso 3: Generar una Orden de Servicio
1. En el panel técnico, localice la sección **"Generar Orden de Servicio"**.
2. Ingrese la **Cédula de Identidad** del cliente.
3. El sistema buscará en caliente al cliente: si está registrado, completará de forma automática el **Nombre** y **Teléfono** y mostrará la cantidad de servicios anteriores del cliente. Si no está registrado, le advertirá que debe registrarlo primero en el módulo correspondiente.
4. Seleccione el tipo de dispositivo (elija **"Impresoras"** para servicios de impresión, o laptops, teléfonos, etc.).
5. Complete la **Marca**, **Modelo**, **Falla Reportada**, **Diagnóstico Técnico** (obligatorio) e indique el costo estimado y notas de taller.
6. Haga clic en **"Crear Orden de Servicio"**. Se guardará el registro y se le mostrará el **código de 6 caracteres** de seguimiento para que lo anote en el comprobante del cliente.

### Paso 4: Actualizar el Estado de Reparación
1. En la tabla de órdenes de servicio del panel, localice el equipo deseado.
2. Presione el botón **"Actualizar Estado"**.
3. Seleccione el nuevo estado de la lista y escriba una **nota de avance técnica obligatoria**.
4. Haga clic en **"Guardar"**. El estado y la nota se guardarán y serán visibles en tiempo real en la consulta pública del cliente.
