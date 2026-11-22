# Interfaz del diario de trabajo

Estructura de la página principal, pestañas y flujos típicos de uso. La interfaz se adapta a pantallas estrechas y sigue el tema del visor (claro u oscuro).

- **Cabecera:** título y un resumen en vivo: número de entradas, tareas y logros.
- **Pestañas:** Diario, Tareas, Objetivos, Informe. Se recuerda la última pestaña usada.
- **Aviso:** aparece solo mientras existan datos de ejemplo.
- **Mensajes emergentes:** confirmaciones breves y errores ("Entrada guardada", "No se pudo guardar…").
- **Confirmaciones en línea:** cada eliminación pide confirmación dentro de la página (sin diálogos del navegador).
- **Tema y diseño:** las paletas clara y oscura siguen el tema del visor; las vistas pasan a una columna en pantallas estrechas; la página no tiene desplazamiento horizontal.
- **Carga y errores:** mensaje de carga hasta que llegan todas las colecciones; mensaje claro si el almacenamiento no está disponible o no se pueden cargar los datos.

## Pestaña "Diario"

**Objetivo:** registrar rápidamente el trabajo del día y consultar el historial cronológico.

### Editor de entradas

- Selector de **fecha**, con hoy como valor por defecto.
- Una lista de **elementos**, que empieza con uno. Cada elemento contiene:
  - **Selector de tarea:** "Nueva tarea…" o una tarea existente, agrupadas en _En curso y en pausa_ y _Completadas_.
  - **Título de la tarea** (solo para una tarea nueva).
  - **Nota** de esta entrada.
  - **Estado de la tarea** tras esta entrada (por defecto `En curso`; en las tareas existentes empieza con el estado actual).
  - **Casilla de logro.**
  - **Sección plegable "Detalles de la tarea"** (abierta por defecto en tareas nuevas, cerrada en las existentes):
    - Selector de **Objetivo**, con la opción **"+ Nuevo objetivo…"**, que muestra un campo para escribir el título del nuevo objetivo.
    - **Competencias y tecnologías** con sugerencias en vivo (ver apartado "Sugerencias de competencias").
    - **Resultado o impacto** y **Evidencias y notas**.
- Acciones: **+ Añadir otra tarea**, **Quitar** (cuando hay más de un elemento), **Guardar entrada** y **Cancelar** (al editar).

### Sugerencias de competencias

- Con el campo vacío: las 10 competencias más usadas aparecen como botones de activación, más **Ver todas (N)** para mostrar todas las usadas hasta ahora.
- Al escribir: las sugerencias se filtran por el texto que se está escribiendo, entre **todas** las competencias conocidas.
- Pulsar una sugerencia sustituye el fragmento escrito y permite seguir con la siguiente; pulsar una ya seleccionada la quita.
- **Intro** elige la primera sugerencia (y nunca envía el formulario desde este campo).
- Los nombres se normalizan: al escribir "kubernetes" se reutiliza la grafía existente "Kubernetes"; los duplicados se eliminan.

### Listado cronológico

- Entradas en orden de fecha descendente, agrupadas por mes.
- Cada entrada muestra una **columna de fecha** (día, mes, día de la semana) y sus elementos.
- Cada elemento muestra: etiqueta con el ID, título de la tarea, estrella de logro, indicador de estado, la nota y una línea con el objetivo y las competencias.
- **Pulsar la etiqueta del ID** abre la pestaña Tareas con esa tarea desplegada.
- **Editar** carga la entrada en el editor; **Eliminar** pide confirmación y borra solo la entrada (las tareas se conservan).
- El estado vacío explica cómo escribir la primera entrada.

## Pestaña "Tareas"

**Objetivo:** ver todas las tareas con su historial completo y mantener sus detalles.

### Filtros

Búsqueda de texto libre (ID, título, resultado, evidencias, competencias y notas de las entradas), estado, objetivo (incluido "Sin objetivo"), competencia y "Solo logros". Un contador muestra el número de resultados.

### Lista de tareas

- Ordenada por actividad más reciente.
- Cada fila: ID, título, estrella de logro, indicador de estado, fecha de la última actividad y número de entradas.
- Solo se puede desplegar una tarea a la vez.

### Tarea desplegada

- **Datos:** objetivo, resultado o impacto, competencias, evidencias (enlaces pulsables).
- **Línea de tiempo ("Seguimiento"):** fecha, un indicador de estado cada vez que el estado cambia y la nota de cada entrada que menciona la tarea.
- **Editar tarea:** formulario en línea con título, estado, objetivo (con "+ Nuevo objetivo…"), marca de logro, competencias (con sugerencias), resultado y evidencias.
- **Eliminar:** requiere confirmación; **se bloquea si la tarea aparece en alguna entrada** (hay que quitarla antes de esas entradas).

### Reglas propias de esta pestaña

- Cambiar el estado aquí fija la fecha de finalización (la existente; si no, la de la última actividad; si no, hoy) o la borra; **no** añade un elemento a la línea de tiempo.
- Se rechaza un título vacío.

## Pestaña "Objetivos"

**Objetivo:** definir lo que se espera del periodo y ver el progreso de cada objetivo.

- **+ Nuevo objetivo** abre un formulario: título (obligatorio), descripción y "Cómo se mide".
- Cada tarjeta de objetivo muestra el título, la descripción, los criterios y tres contadores: **tareas, completadas, logros**.
- **Editar**, **Archivar / Restaurar** y **Eliminar** (con confirmación).
  - Eliminar se **bloquea si hay tareas vinculadas**; en su lugar se sugiere archivar.
  - Los objetivos archivados pasan a una sección "Archivados" y dejan de aparecer en los selectores de tarea (salvo que una tarea ya los use).
- Los objetivos también pueden crearse sobre la marcha (solo con título) desde los formularios de Diario y Tareas; la descripción y los criterios se completan después aquí.
- El estado vacío explica por qué conviene definir objetivos para el informe.

## Pestaña "Informe"

**Objetivo:** generar el resumen de trabajo, logros y fortalezas para la reunión de evaluación.

### Selección del periodo

| Opción                           | Rango                                                                                   |
| -------------------------------- | --------------------------------------------------------------------------------------- |
| Últimos 6 meses (por defecto)    | Ventana móvil que termina hoy                                                           |
| Enero – junio _(año actual)_     | 1 ene – 30 jun                                                                          |
| Julio – diciembre _(año actual)_ | 1 jul – 31 dic                                                                          |
| Personalizado                    | Cualquier fecha "desde" y "hasta" (se intercambian automáticamente si están invertidas) |

Una tarea se considera **trabajada en el periodo** si al menos una entrada del rango la menciona.

### Secciones del informe

1. **Franja de resumen:** entradas del periodo, tareas trabajadas, tareas completadas en el periodo (fecha de finalización dentro del rango) y logros.
2. **Logros destacados:** tareas trabajadas marcadas como logro. Cada tarjeta muestra ID, título, objetivo, intervalo de fechas, número de entradas, resultado (o una indicación para añadirlo), competencias y evidencias.
3. **Fortalezas y competencias:** competencias ordenadas por número de tareas en el periodo (el desempate es el número de entradas), con barras proporcionales y hasta seis IDs de tarea cada una (se muestran las 15 primeras).
4. **Detalle por objetivo:** un grupo por objetivo con sus criterios, que lista cada tarea con estado, intervalo de fechas, número de entradas y resultado; las tareas sin objetivo aparecen en "Sin objetivo asignado".
5. **Vista previa en Markdown:** área de texto plegable con el informe completo en Markdown.

### Exportación

| Acción              | Resultado                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Copiar Markdown** | Copia el informe al portapapeles. Si el navegador lo rechaza, se abre la vista previa y se selecciona su texto para copiarlo manualmente.  |
| **Descargar .md**   | Ofrece un archivo Markdown (`informe-diario-<desde>_<hasta>.md`).                                                                          |
| **Descargar PDF**   | Genera en el navegador un PDF A4 con título, periodo, las mismas secciones y numeración de páginas (`informe-diario-<desde>_<hasta>.pdf`). |

Las descargas siempre piden confirmación a la usuaria, y los botones de descarga se ocultan si el entorno no permite guardar archivos. El Markdown y el PDF comparten la misma estructura de contenido: Resumen, Logros, Fortalezas, Detalle por objetivo.

## Flujos típicos

1. **Registro diario:** abrir Diario, mantener la fecha de hoy, elegir o crear una tarea, escribir una nota breve y guardar.
2. **Cerrar una tarea:** en una entrada nueva elegir la tarea, poner el estado _Completada_, abrir "Detalles", rellenar resultado y evidencias y marcar "Marcar como logro" si procede.
3. **Rellenar fechas pasadas:** elegir una fecha anterior y añadir los elementos; los estados de las tareas con actividad posterior se conservan.
4. **Organizar por objetivos:** definir objetivos en Objetivos (o crearlos en línea) y vincular tareas al escribir las entradas.
5. **Preparar la evaluación:** abrir Informe, elegir el periodo, revisar logros y fortalezas, completar los resultados que falten en Tareas y después copiar o descargar el informe.
