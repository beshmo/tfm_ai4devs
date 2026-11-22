# Alcance del MVP — Diario de trabajo

**Fecha de cierre del alcance:** 2026-11-22
**Estado:** Cerrado a esta fecha

---

## 1. Problema

Quien prepara las reuniones semestrales de evaluación de objetivos tiene que reconstruir de memoria lo que hizo durante seis meses. El trabajo del día a día queda repartido entre tickets, correos, chats y notas sueltas, y en ninguno de esos sitios se ve cómo avanzó cada tarea, a qué objetivo contribuyó ni qué competencias puso en juego. Reunir todo eso justo antes de la reunión es lento, y el resultado es incompleto.

Consecuencias:

- Los logros de los primeros meses del periodo se olvidan o se cuentan sin su resultado ni sus evidencias, y la evaluación se queda con lo más reciente.
- No hay un vínculo claro entre el trabajo hecho y los objetivos acordados, así que es difícil demostrar el progreso de cada objetivo.
- Las fortalezas se describen con impresiones generales y no con un recuento de las tareas en las que se usó cada competencia.

## 2. Usuarios

**Usuario objetivo.** Una sola persona, la propietaria del diario: una profesional que registra su propio trabajo y que tiene evaluaciones de objetivos cada semestre. Es la única que lee y escribe los datos, que son privados.

**Contexto de uso.**

- Sesiones cortas casi a diario para anotar las tareas más relevantes, revisiones de vez en cuando y una sesión más larga antes de cada reunión de evaluación.
- Se usa al final de la jornada (registro diario), cuando se recuerda trabajo de días anteriores (rellenar fechas pasadas) y antes de la reunión semestral (informe).
- Navegador web, tanto en escritorio como en pantallas estrechas, con tema claro u oscuro según el sistema.

**Quién no es usuario en este MVP.** Responsables, compañeros y equipos de recursos humanos no tienen acceso: no se pueden compartir diarios, comentarlos ni revisarlos dentro de la aplicación. El informe les llega solo como fichero exportado que la propietaria decide enviar. Tampoco hay varias personas usando la misma instancia con roles distintos.

## 3. Propuesta de valor

**Propuesta.** Diario de trabajo es una aplicación web personal en la que cada día se escribe una entrada con las tareas trabajadas, una nota y el estado en que queda cada tarea. Las tareas tienen un identificador estable y se vinculan a los objetivos del periodo y a competencias. Con ese historial, la aplicación genera el informe del periodo de evaluación (resumen, logros, fortalezas y detalle por objetivo) y lo exporta para llevarlo a la reunión.

**Valor para los usuarios.**

- Registro el trabajo en pocos pasos mientras lo tengo fresco, y puedo añadir días pasados sin estropear el estado actual de las tareas.
- Veo la historia completa de cada tarea (cuándo la trabajé, qué anoté y cómo cambió su estado) sin tener que buscarla en otras herramientas.
- Llego a la evaluación con un informe ya hecho que relaciona mis tareas con mis objetivos y muestra en qué competencias me apoyé más.

**Qué introduce el usuario y qué recibe.** La usuaria introduce entradas diarias (fecha, tareas, nota, estado, marca de logro, resultado y evidencias) y define sus objetivos. El sistema le devuelve el historial cronológico, el seguimiento de cada tarea, el progreso por objetivo y un informe del periodo elegido, exportable en Markdown.

### Cómo sabríamos que funciona

| Criterio                             | Señal de que funciona                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Flujo principal de extremo a extremo | Con sesión iniciada, la usuaria crea un objetivo, escribe una entrada con una tarea nueva vinculada a él, cierra esa tarea en una entrada posterior como `Completada` y marcada como logro, genera el informe de un periodo que incluye ambas fechas y descarga el `.md`. La tarea aparece en Logros, en Detalle por objetivo y en el resumen. Un test E2E recorre este flujo.                                                                                                                                    |
| Rapidez de registro                  | El registro del día se hace desde un único formulario de la pestaña Diario, con la fecha de hoy por defecto, sin pasar por otras pestañas, incluso para crear una tarea o un objetivo nuevos (el objetivo solo con título).                                                                                                                                                                                                                                                                                       |
| Fidelidad del informe                | Sobre los datos semilla, los totales del resumen coinciden con un recuento independiente de esos datos: "trabajada en el periodo" significa que la menciona al menos una entrada del rango; "completada en el periodo" se calcula con la fecha de finalización. Las fortalezas se ordenan por número de tareas y el desempate es el número de entradas. Con los mismos datos y el mismo periodo, el Markdown exportado es idéntico byte a byte.                                                                   |
| Integridad de los datos              | Nunca se incumplen estas reglas, y cada una tiene un test: no hay dos entradas con la misma fecha (guardar en una fecha existente fusiona los elementos); una tarea no aparece dos veces en la misma entrada; rellenar una fecha pasada no sobrescribe un estado más reciente; no se puede eliminar una tarea referenciada por una entrada ni un objetivo con tareas vinculadas; solo hay fecha de finalización mientras la tarea está `Completada`; los ID de tarea (`T-001`, `T-002`…) son únicos y no cambian. |
| Privacidad y acceso                  | Cualquier petición sin sesión recibe `401` y no devuelve datos. Toda consulta se limita a la usuaria autenticada: con un segundo usuario de prueba en los datos semilla, ninguno de los dos ve ni modifica los registros del otro.                                                                                                                                                                                                                                                                                |
| Verificabilidad                      | El README incluye los pasos de instalación en local, un `.env.example` con las variables vacías, datos semilla ficticios y credenciales de prueba. Con eso, un revisor externo puede reproducir el flujo principal y ejecutar la suite de tests.                                                                                                                                                                                                                                                                  |

### Riesgos asumidos

| Riesgo                                                                                                                                                | Cómo se asume                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fechas y zonas horarias: una entrada cerca de la medianoche podría quedar en el día equivocado, o "hoy" podría no coincidir entre cliente y servidor. | Las entradas y la fecha de finalización se guardan como fecha de calendario sin hora. "Hoy" es la fecha local del navegador de la usuaria. Los rangos del informe son inclusivos en los dos extremos.                                               |
| Generación de los ID secuenciales con peticiones simultáneas (dos pestañas abiertas, reintentos).                                                     | Con una sola usuaria la concurrencia es baja, pero no se descarta. El ID se asigna en el servidor, de forma atómica y con restricción de unicidad por usuario. Si hay conflicto, la operación falla y se reintenta; nunca se generan ID duplicados. |
| La validación del producto se basa en el uso de una sola persona (caso de estudio), no en usuarios reales diversos.                                   | Se acepta. Los criterios de "Cómo sabríamos que funciona" se comprueban con tests y con los datos semilla, y no se presenta nada como validado con usuarios.                                                                                        |
| No hay copias de seguridad ni exportación completa de los datos, así que un fallo del almacenamiento podría hacer perder el historial.                | Se renuncia a esto en el MVP. La exportación del informe permite guardar fuera de la aplicación el contenido de cada periodo.                                                                                                                       |
| Deriva del alcance hacia colaboración, adjuntos o integraciones con otras herramientas.                                                               | Se excluyen de forma explícita en el apartado 5. Cualquier petición nueva se valora indicando qué funcionalidad se aplaza o se recorta.                                                                                                             |

## 4. Alcance (in)

### Must-have

| Id  | Funcionalidad                              | Resumen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F1  | Registro diario de entradas                | Crear, editar y eliminar la entrada de una fecha (hoy por defecto) con uno o varios elementos. Cada elemento lleva una tarea existente o nueva (con título), una nota (opcional), el estado de la tarea tras ese día y la marca de logro; también se pueden completar el objetivo, las competencias, el resultado y las evidencias de la tarea. Guardar en una fecha que ya tiene entrada fusiona los elementos. No se admite la misma tarea dos veces en una entrada. En fechas pasadas, el estado solo se propaga a la tarea si ninguna entrada posterior la menciona. Las competencias se comparan sin distinguir mayúsculas, se normalizan a la grafía existente y se sugieren mientras se escribe. Eliminar una entrada conserva sus tareas. |
| F2  | Historial cronológico                      | Listado de entradas por fecha descendente, agrupadas por mes. Cada elemento muestra el ID, el título, la marca de logro, el estado, la nota, el objetivo y las competencias. Desde el listado se puede editar o eliminar una entrada (con confirmación en la página), y al pulsar el ID se abre la tarea en la pestaña Tareas. Si no hay entradas, se explica cómo escribir la primera.                                                                                                                                                                                                                                                                                                                                                           |
| F3  | Seguimiento y edición de tareas            | Lista de tareas con ID secuencial estable (`T-001`, `T-002`…), ordenada por actividad más reciente, con el estado, la marca de logro, la fecha de la última actividad y el número de entradas. La tarea desplegada (una cada vez) muestra sus datos y su línea de tiempo: fecha, nota y cambios de estado. La edición en línea rechaza un título vacío. Al cambiar el estado se fija la fecha de finalización (la de la última actividad; si no, hoy) o se borra, sin añadir nada a la línea de tiempo. No se puede eliminar una tarea que aparezca en alguna entrada.                                                                                                                                                                            |
| F4  | Gestión de objetivos                       | Crear objetivos con título (obligatorio), descripción y "Cómo se mide", o solo con título desde los formularios de Diario y Tareas. Editar, archivar y restaurar. Cada tarjeta muestra tres contadores: tareas, completadas y logros. Los archivados pasan a su propia sección y salen de los selectores, salvo en las tareas que ya los usan. No se puede eliminar un objetivo con tareas vinculadas; en su lugar se propone archivarlo.                                                                                                                                                                                                                                                                                                         |
| F5  | Informe del periodo y exportación Markdown | Generar el informe para un periodo: últimos 6 meses (por defecto), enero-junio o julio-diciembre del año actual, o un rango personalizado (si las fechas están invertidas, se intercambian). Secciones: resumen (entradas, tareas trabajadas, completadas en el periodo y logros), logros destacados, fortalezas por competencia (ordenadas por número de tareas, con el número de entradas como desempate; se muestran las 15 primeras, con hasta 6 ID por competencia) y detalle por objetivo, incluido "Sin objetivo asignado". Vista previa en Markdown, copia al portapapeles (si el navegador no lo permite, se recurre a la selección manual) y descarga `informe-diario-<desde>_<hasta>.md`. La exportación es determinista.              |

### Should-have (opcionales)

| Id  | Funcionalidad                  | Resumen                                                                                                                                                                                                                                                                                                                                             |
| --- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S1  | Exportación del informe en PDF | Genera en el navegador un PDF A4 (`informe-diario-<desde>_<hasta>.pdf`) con título, periodo, numeración de páginas y las mismas secciones que el Markdown. Es opcional porque el Markdown de F5 ya cubre la necesidad de llevar el informe a la reunión.                                                                                            |
| S2  | Búsqueda y filtros de tareas   | En la pestaña Tareas: búsqueda de texto libre (ID, título, resultado, evidencias, competencias y notas de las entradas) y filtros por estado, objetivo (incluido "Sin objetivo"), competencia y "Solo logros", con un contador de resultados. Es opcional porque F3 ya permite llegar a cualquier tarea por la lista ordenada y desde el historial. |

### Requisitos transversales

- Cada acción muestra un mensaje breve de éxito o de error (por ejemplo, "Entrada guardada" o "No se pudo guardar…"). Cada eliminación pide confirmación dentro de la página, sin diálogos del navegador.
- Se muestra un mensaje de carga mientras llegan los datos, y un mensaje claro si no se pueden cargar o el almacenamiento no está disponible.
- La cabecera muestra un resumen en vivo con el número de entradas, tareas y logros.
- La interfaz se adapta a pantallas estrechas (una sola columna y sin desplazamiento horizontal) y sigue el tema claro u oscuro del sistema.
- Un solo usuario con inicio de sesión, cierre de sesión y caducidad de la sesión a los 30 minutos de inactividad. Toda lectura y escritura exige sesión y se limita a los registros de la usuaria autenticada; sin sesión, la respuesta es `401`.
- Los datos semilla y las credenciales de prueba son ficticios. No se incluye información personal ni de ninguna empresa.
- Los secretos y credenciales reales nunca van al repositorio.

## 5. NO-alcance (out)

- Varios usuarios con roles, compartir diarios, comentarios o revisión por parte de responsables.
- Registro público de cuentas, recuperación de contraseña e inicio de sesión con proveedores externos. La cuenta de la usuaria se crea con los datos semilla o la configuración.
- Adjuntar ficheros a tareas o entradas. Las evidencias son texto y enlaces.
- Integraciones con gestores de tickets, calendarios, correo o mensajería, e importación de datos desde otras herramientas.
- Redacción o resumen del informe con IA generativa dentro de la aplicación.
- Edición manual del informe dentro de la aplicación y plantillas de informe personalizables.
- Botones con las 10 competencias más usadas y la opción "Ver todas (N)" en el editor. En el MVP solo se sugieren mientras se escribe (F1).
- Recordar la última pestaña usada y mostrar el aviso de datos de ejemplo en la interfaz.
- Gestión de los periodos de evaluación como entidad propia. El periodo solo se elige al generar el informe.
- Recordatorios y notificaciones, aplicación móvil nativa y uso sin conexión.
- Copia de seguridad, exportación completa e importación de los datos del diario.
- Todo lo que no figura en el apartado 4 queda fuera del MVP.
