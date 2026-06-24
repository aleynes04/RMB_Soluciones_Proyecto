# RMB Soluciones — Lenguaje de Programación 3

> Sistema de Gestión de Tareas para Servicio Técnico (Impresoras, Laptops, Móviles y Otros) con base en persistencia relacional local y portal público de consulta segura.

---

## 1. Datos generales
* **Asignatura**: Lenguaje de Programación 3 
* **Modalidad**: Grupal Aleynes Valbuena V-30142570 Isaac Vivas V-30158353
* **Formato documental**: Markdown (.md)
* **Tipo de proyecto**: Aplicación de Gestión y Seguimiento de Servicio Técnico
* **Objetivo formativo**: Aplicar buenas prácticas de arquitectura cliente-servidor (SPA + REST API), diseño relacional con Cédula como PK, manejo estructurado de reglas de negocio y control de transiciones asistido por directrices de IA (**Rules** y **Agents**).

## 2. Propósito del proyecto
El proyecto **RMB Soluciones** resuelve la falta de transparencia y control administrativo en los talleres de reparaciones de hardware. Permite a los técnicos registrar clientes permanentes mediante su Cédula, autocompletar formularios de ingresos calculando el conteo de servicios históricos, categorizar dispositivos (con énfasis especial en **Impresoras**), registrar diagnósticos y controlar cambios de estado agregando notas obligatorias. Los clientes cuentan con un buscador que visualiza una línea de tiempo del avance de forma segura, protegiendo los datos y anotaciones internas de taller.

## 3. Estructura del repositorio

```text
servicio-tecnico/
├── README.md                      # Portada ejecutiva y descriptiva de LP3
├── package.json                   # Dependencias y scripts del backend
├── .gitignore                     # Configuración de exclusiones de Git
├── docs/                          # Documentación académica oficial del proyecto
│   ├── 00-index.md                # Índice navegable de documentación
│   ├── 01-planteamiento-del-proyecto.md
│   ├── 02-objetivos-y-alcance.md
│   ├── 03-requerimientos-funcionales.md
│   ├── 04-requerimientos-no-funcionales.md
│   ├── 05-casos-de-uso.md
│   ├── 06-reglas-de-negocio.md
│   ├── 07-arquitectura-general.md
│   ├── 08-diseno-frontend.md
│   ├── 09-diseno-backend.md
│   ├── 10-modelo-de-datos.md
│   ├── 11-api-e-interfaces.md
│   ├── 12-plan-de-pruebas.md
│   ├── 13-manual-tecnico.md
│   ├── 14-manual-de-usuario.md
│   ├── 15-bitacora-de-avances.md
│   ├── 16-entrega-final-y-checklist.md
│   └── 17-guia-de-uso-de-rules-y-agents.md
├── ai/                            # Directrices y configuración de soporte de IA
│   ├── README.md                  # Explicación del soporte IA
│   ├── rules/                     # Reglas de estricto cumplimiento para IA
│   │   ├── reglas-de-documentacion.md
│   │   ├── reglas-de-codigo.md
│   │   ├── reglas-de-arquitectura.md
│   │   └── reglas-de-pruebas.md
│   ├── agents/                    # Perfiles y roles especializados de IA
│   │   ├── agent-arquitecto.md
│   │   ├── agent-frontend.md
│   │   ├── agent-backend.md
│   │   ├── agent-qa.md
│   │   └── agent-documentador.md
│   └── prompts/                   # Instrucciones estructuradas reutilizables
│       ├── prompt-requerimientos.md
│       ├── prompt-casos-de-uso.md
│       ├── prompt-pruebas.md
│       └── prompt-debugging.md
├── src/                           # Código fuente de la aplicación
│   ├── backend/
│   │   ├── server.js              # Servidor Express y control de puertos
│   │   ├── database.js            # Lógica relacional y manipulación del JSON
│   │   ├── data.json              # Base de datos local (clientes y órdenes)
│   │   └── routes/
│   │       ├── clients.js         # Rutas de Clientes
│   │       └── services.js        # Rutas de Órdenes de Servicio
│   └── frontend/
│       ├── index.html             # Interfaz SPA (Gris y Azul Claro)
│       ├── logo.jpg               # Logotipo de marca
│       ├── css/
│       │   └── styles.css         # Hoja de estilos con variables de color
│       └── js/
│           └── app.js             # Enrutador, Fetch, y eventos de cliente
└── deliverables/                  # Entregables y reportes académicos
    ├── evidencia/                 # Carpeta para reportes y capturas de prueba
    └── release-notes/             # Historial de versiones y notas de entrega
```

## 4. Cómo ejecutar el proyecto

### Requisitos previos
Tener instalado **Node.js** (versión 18.0 o superior recomendada) y **npm**.

### Paso 1: Instalar dependencias
En la terminal, ejecute en la raíz del proyecto:
```bash
npm install
```

### Paso 2: Iniciar servidor de desarrollo
Para arrancar el backend en modo de desarrollo local:
```bash
npm run dev
```
El servidor escuchará en el puerto `3000` ([http://localhost:3000](http://localhost:3000)). En caso de colisión de puerto, se informará en la consola y se sugerirán alternativas de solución.

### Clave de Demostración del Técnico
* Contraseña: `admin123`

## 5. Reglas mínimas de calidad del repositorio
* **Trazabilidad**: La documentación técnica y relacional coincide al 100% con el código desplegado.
* **Privacidad**: La consulta pública del cliente no expone datos sensibles ni notas internas de taller.
* **Robustez**: Las excepciones y validaciones de Cédula duplicada e ingresos obligatorios son controladas en el backend.
