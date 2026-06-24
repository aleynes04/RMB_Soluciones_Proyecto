# Reglas de Código

1. **Nomenclatura Clara**: Emplear nombres descriptivos en español o inglés técnico para variables, funciones y controladores (ej: `getClientByCedula`, `createServiceOrder`).
2. **Estándares del Backend (Node/Express)**:
   * Mapear rutas de API prefijadas por `/api/`.
   * Utilizar métodos HTTP de forma semántica: `POST` para registrar, `GET` para consultar, y `PATCH` para transiciones de estado.
   * Manejar errores con bloques `try-catch` y devolver siempre respuestas JSON estructuradas: `{ success: true, data }` o `{ success: false, error }` junto con el código HTTP correspondiente.
3. **Estándares del Frontend (JS SPA)**:
   * Emplear `async/await` al consumir APIs mediante Fetch.
   * Validar y sanitizar las entradas de formularios (cédula, nombre, teléfono, costo, diagnóstico) en el cliente antes de ser enviadas.
   * Implementar indicadores visuales (spinners o placeholders de carga) durante llamadas asíncronas.
4. **CSS Limpio**: No usar estilos inline en HTML, agrupar todos los estilos en `styles.css` utilizando variables de CSS para la paleta de colores azul/gris.
