# Guía de Uso de Rules y Agents

## 1. Propósito
Este documento detalla cómo se estructuran y utilizan las directrices contenidas en la carpeta `ai/` para dar soporte al análisis, diseño, desarrollo, pruebas y documentación técnica del proyecto **RMB Soluciones**.

## 2. Flujo metodológico sugerido
Para integrar de manera efectiva la IA en el ciclo de vida del proyecto:
1. **Modelado y Alcance**: Definir el problema en [01-planteamiento-del-proyecto.md](01-planteamiento-del-proyecto.md) y extraer las reglas de negocio críticas en [06-reglas-de-negocio.md](06-reglas-de-negocio.md).
2. **Establecer Directrices (Rules)**: Configurar los archivos en `ai/rules/` para indicarle al modelo de lenguaje qué estándares técnicos seguir (ej. persistencia relacional en JSON, tema azul/gris, respuestas API estructuradas).
3. **Instanciar Agentes (Agents)**: Invocar el perfil especializado de la subcarpeta `ai/agents/` según la tarea actual:
   * **Agent Arquitecto**: Valida el desacoplamiento SPA/REST.
   * **Agent Backend**: Valida las validaciones y endpoints de clientes y servicios.
   * **Agent Frontend**: Revisa la adaptabilidad del sidebar y los colores de la marca.
   * **Agent QA**: Genera escenarios borde para transiciones de estado y unicidad del código.
   * **Agent Documentador**: Asegura que la bitácora y especificaciones estén completas.
4. **Ejecutar Prompts de Soporte**: Utilizar las plantillas de `ai/prompts/` para resolver problemas frecuentes o acelerar la documentación de casos de uso y planes de prueba.

## 3. Consideraciones importantes
* Las directrices y prompts de IA no sustituyen la supervisión ni el criterio de ingeniería del estudiante.
* Todos los entregables generados por asistencia de IA deben verificarse y ejecutarse localmente en el servidor para comprobar su correcto funcionamiento antes de su subida.
