# Interfaz del diario de trabajo

> Este documento consolida la propuesta inicial (`docs/propuesta/interfaz.md`) con las decisiones ya cerradas en el alcance (`docs/prd/alcance-mvp.md`) y el PRD (`docs/prd/mvp.md`). Se han quitado los elementos que el alcance excluye explícitamente (recordar la última pestaña, el aviso de datos de ejemplo y los botones de competencias más usadas) y las dos reglas de descarga descartadas en PA-8; se han añadido el cierre de sesión y la caducidad por inactividad (PA-11) y el resto de puntos abiertos ya resueltos. La propuesta original se conserva sin modificar como documento histórico.

Estructura de la página principal, pestañas y flujos típicos de uso. La interfaz se adapta a pantallas estrechas y sigue el tema del sistema (claro u oscuro).

- **Cabecera:** título y un resumen en vivo: número de entradas, tareas y logros.
- **Pestañas:** Diario, Tareas, Objetivos, Informe.
- **Sesión:** acción de "Cerrar sesión" accesible desde cualquier pestaña, que termina la sesión; la sesión también caduca sola a los 30 minutos de inactividad. En ambos casos hay que volver a iniciar sesión para ver cualquier dato.
- **Mensajes emergentes:** confirmaciones breves y errores ("Entrada guardada", "No se pudo guardar…").
- **Confirmaciones en línea:** cada eliminación pide confirmación dentro de la página (sin diálogos del navegador).
- **Tema y diseño:** las paletas clara y oscura siguen el tema del sistema; las vistas pasan a una columna en pantallas estrechas; la página no tiene desplazamiento horizontal.
- **Carga y errores:** mensaje de carga hasta que llegan todas las colecciones; mensaje claro si el almacenamiento no está disponible o no se pueden cargar los datos.

## Pestaña "Diario"

**Objetivo:** registrar rápidamente el trabajo del día y consultar el historial cronológico.

### Editor de entradas

- Selector de **fecha**, con hoy como valor por defecto; no admite una fecha posterior a hoy.
- Una lista de **elementos**, que empieza con uno. Cada elemento contiene:
  - **Selector de tarea:** "Nueva tarea…" o una tarea existente, agrupadas en _En curso y en pausa_ y _Completadas_.
  - **Título de la tarea** (solo para una tarea nueva, obligatorio).
  - **Nota** de esta entrada (opcional).
  - **Estado de la tarea** tras esta entrada (por defecto `En curso`; en las tareas existentes empieza con el estado actual).
  - **Casilla de logro.**
  - **Sección plegable "Detalles de la tarea"** (abierta por defecto en tareas nuevas, cerrada en las existentes):
    - Selector de **Objetivo**, con la opción **"+ Nuevo objetivo…"**, que muestra un campo para escribir el título del nuevo objetivo.
    - **Competencias y tecnologías** con sugerencias en vivo (ver apartado "Sugerencias de competencias").
    - **Resultado o impacto** y **Evidencias y notas**.
- Acciones: **+ Añadir otra tarea**, **Quitar** (cuando hay más de un elemento), **Guardar entrada** y **Cancelar** (al editar).
- Guardar en una fecha que ya tiene entrada fusiona los elementos en ella, nunca crea una segunda entrada para esa fecha. Si la tarea de un elemento ya tenía elemento ese día, la nota nueva se añade al final de la existente (separadas por una línea en blanco), sin rechazar el guardado ni mostrar ningún aviso especial.

### Sugerencias de competencias

- Al escribir: las sugerencias se filtran por el texto que se está escribiendo, entre **todas** las competencias conocidas. Con el campo vacío no se muestra ningún botón de competencias.
- Pulsar una sugerencia sustituye el fragmento escrito y permite seguir con la siguiente.
- **Intro** elige la primera sugerencia (y nunca envía el formulario desde este campo).
- Los nombres se normalizan: al escribir "kubernetes" se reutiliza la grafía existente "Kubernetes"; los duplicados se eliminan.

### Listado cronológico

- Entradas en orden de fecha descendente, agrupadas por mes.
- Cada entrada muestra una **columna de fecha** (día, mes, día de la semana) y sus elementos.
- Cada elemento muestra: etiqueta con el ID, título de la tarea, estrella de logro, indicador de estado, la nota y una línea con el objetivo y las competencias.
- **Pulsar la etiqueta del ID** abre la pestaña Tareas con esa tarea desplegada.
- **Editar** carga la entrada en el editor; **Eliminar** pide confirmación y borra solo la entrada (las tareas se conservan). Eliminar una entrada, o quitar un elemento al editarla, recalcula el estado y la fecha de finalización de cada tarea afectada a partir de la entrada restante más reciente que la mencione; si no queda ninguna, la tarea conserva su estado y su fecha de finalización anteriores.
- El estado vacío explica cómo escribir la primera entrada.

## Pestaña "Tareas"

**Objetivo:** ver todas las tareas con su historial completo y mantener sus detalles.

### Filtros (opcional, S2)

Búsqueda de texto libre (ID, título, resultado, evidencias, competencias y notas de las entradas), estado, objetivo (incluido "Sin objetivo"), competencia y "Solo logros". Un contador muestra el número de resultados.

### Lista de tareas

- Ordenada por actividad más reciente (fecha de la entrada más reciente que la menciona); a igual fecha, por ID ascendente. Las tareas sin ninguna entrada van al final, ordenadas entre sí por ID ascendente.
- Cada fila: ID, título, estrella de logro, indicador de estado, fecha de la última actividad y número de entradas.
- Solo se puede desplegar una tarea a la vez.

### Tarea desplegada

- **Datos:** objetivo, resultado o impacto, competencias, evidencias (enlaces pulsables).
- **Línea de tiempo ("Seguimiento"):** fecha, un indicador de estado cada vez que el estado cambia y la nota de cada entrada que menciona la tarea.
- **Editar tarea:** formulario en línea con título, estado, objetivo (con "+ Nuevo objetivo…"), marca de logro, competencias (con sugerencias), resultado y evidencias.
- **Eliminar:** requiere confirmación; **se bloquea si la tarea aparece en alguna entrada** (hay que quitarla antes de esas entradas).

### Reglas propias de esta pestaña

- Cambiar el estado aquí fija la fecha de finalización (la de la última actividad; si no, hoy) o la borra; **no** añade un elemento a la línea de tiempo.
- Se rechaza un título vacío.

## Pestaña "Objetivos"

**Objetivo:** definir lo que se espera del periodo y ver el progreso de cada objetivo.

- **+ Nuevo objetivo** abre un formulario: título (obligatorio), descripción y "Cómo se mide".
- Cada tarjeta de objetivo muestra el título, la descripción, los criterios y tres contadores: **tareas, completadas, logros** (sin filtrar por periodo).
- **Editar**, **Archivar / Restaurar** y **Eliminar** (con confirmación).
  - Eliminar se **bloquea si hay tareas vinculadas**; en su lugar se sugiere archivar.
  - Los objetivos archivados pasan a una sección "Archivados" y dejan de aparecer en los selectores de tarea (salvo que una tarea ya los use). Conservan sus tareas y su historial, y pueden seguir apareciendo en el informe (ver más abajo).
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

"Últimos 6 meses" empieza el mismo día del mes, seis meses de calendario antes de hoy; si ese día no existe en el mes de inicio (por ejemplo, hoy 31 de agosto), se usa el último día de ese mes. Los dos extremos de cualquier periodo son inclusivos. Una tarea se considera **trabajada en el periodo** si al menos una entrada del rango la menciona.

### Secciones del informe

1. **Franja de resumen:** entradas del periodo, tareas trabajadas, tareas completadas en el periodo (fecha de finalización dentro del rango) y logros (logros completados en el periodo, no solo trabajados).
2. **Logros destacados:** tareas marcadas como logro **completadas en el periodo** (fecha de finalización dentro del rango), con independencia de que alguna entrada del rango las mencione. Cada tarjeta muestra ID, título, objetivo, intervalo de fechas, número de entradas, resultado (o una indicación para añadirlo), competencias y evidencias. El intervalo y el número de entradas se calculan solo con las entradas del periodo; si la tarea no tiene ninguna (por ejemplo, se completó desde Tareas), el intervalo muestra solo la fecha de finalización y 0 entradas. Cuando el intervalo cae en un solo día, se muestra como esa fecha, no como un rango repetido. Las tarjetas se ordenan por fecha de finalización descendente y, a igual fecha, por ID ascendente.
3. **Fortalezas y competencias:** competencias ordenadas por número de tareas trabajadas en el periodo; el primer desempate es el número de entradas distintas del periodo (no de elementos) y el segundo, el nombre en orden alfabético. Se muestran las 15 primeras, con barras proporcionales y hasta seis ID de tarea cada una (los seis primeros por ID ascendente).
4. **Detalle por objetivo:** un grupo por objetivo con sus criterios, para cada objetivo con alguna tarea trabajada en el periodo (los archivados también, si tienen alguna; los que no tienen ninguna no aparecen). Los grupos se ordenan alfabéticamente por título del objetivo. Cada grupo lista sus tareas (ordenadas por ID ascendente) con estado, intervalo de fechas, número de entradas y resultado, con el mismo cálculo e idéntico formato de intervalo de un solo día que en Logros destacados. Las tareas sin objetivo aparecen en "Sin objetivo asignado", al final.
5. **Vista previa en Markdown:** área de texto plegable con el informe completo en Markdown.

### Exportación

| Acción              | Resultado                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Copiar Markdown** | Copia el informe al portapapeles. Si el navegador lo rechaza, se abre la vista previa y se selecciona su texto para copiarlo manualmente.  |
| **Descargar .md**   | Ofrece un archivo Markdown (`informe-diario-<desde>_<hasta>.md`).                                                                          |
| **Descargar PDF**   | Genera en el navegador un PDF A4 con título, periodo, las mismas secciones y numeración de páginas (`informe-diario-<desde>_<hasta>.pdf`). |

El Markdown y el PDF comparten la misma estructura de contenido: Resumen, Logros, Fortalezas, Detalle por objetivo. Ninguna descarga pide una confirmación propia más allá del mensaje de éxito o error habitual, y los botones de descarga no se ocultan según el entorno.

## Flujos típicos

1. **Registro diario:** abrir Diario, mantener la fecha de hoy, elegir o crear una tarea, escribir una nota breve (opcional) y guardar.
2. **Cerrar una tarea:** en una entrada nueva elegir la tarea, poner el estado _Completada_, abrir "Detalles", rellenar resultado y evidencias y marcar "Marcar como logro" si procede. La fecha de finalización queda fijada a la fecha de esa entrada.
3. **Rellenar fechas pasadas:** elegir una fecha anterior y añadir los elementos; los datos de la tarea (estado, fecha de finalización, objetivo, competencias, resultado, evidencias y marca de logro) ya fijados por una entrada posterior se conservan, dato a dato.
4. **Organizar por objetivos:** definir objetivos en Objetivos (o crearlos en línea) y vincular tareas al escribir las entradas.
5. **Preparar la evaluación:** abrir Informe, elegir el periodo, revisar logros y fortalezas, completar los resultados que falten en Tareas y después copiar o descargar el informe.
