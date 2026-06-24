# Reglas de Arquitectura

1. **Separación de Responsabilidades**: El frontend es una SPA puramente estática. El backend es una API RESTful desacoplada. No debe existir acoplamiento directo de vistas en las respuestas del servidor.
2. **Aislamiento de la Persistencia**: El acceso al archivo `data.json` debe encapsularse estrictamente en el módulo `database.js`. Ningún router o middleware puede importar o manipular directamente el filesystem de datos.
3. **Integridad Relacional en JSON**: Respetar las validaciones cruzadas. No crear órdenes para clientes que no existan previamente.
4. **Sincronización del Esquema**: Cualquier cambio de campos en las colecciones de base de datos debe actualizarse en el documento de modelo de datos.
