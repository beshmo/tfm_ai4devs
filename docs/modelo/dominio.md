# Manual del dominio: diarios de trabajo

> Este documento consolida la propuesta inicial (`docs/propuesta/dominio.md`) con las decisiones ya cerradas en el alcance (`docs/prd/alcance-mvp.md`) y el PRD (`docs/prd/mvp.md`), incluidos los puntos abiertos ya resueltos. Es la referencia vigente del dominio; la propuesta original se conserva sin modificar como documento histórico.

El Diario de trabajo es un cuaderno personal para registrar el trabajo realizado día a día, seguir cada tarea a lo largo del tiempo y convertir ese historial en material para las reuniones semestrales de evaluación de objetivos.

- **Un solo usuario** (la propietaria). Los datos son privados: solo la propietaria puede leerlos o escribirlos. Puede cerrar sesión explícitamente, y la sesión caduca sola a los 30 minutos de inactividad.
- Uso en sesiones cortas: registro al final del día de las tareas más relevantes, revisión ocasional y una sesión más larga antes de cada reunión de evaluación.

Modelo básico:

- **Entrada** — una por fecha del calendario (la fecha es su identificador), nunca con fecha posterior a hoy. Contiene varios **elementos**.
- **Elemento** — una línea dentro de una entrada: referencia a una tarea, una nota opcional de ese día y el estado de la tarea tras ese día.
- **Tarea** — ID secuencial estable (`T-001`, `T-002`…), estado (`En curso`, `En pausa`, `Completada`), objetivo opcional, competencias, resultado, evidencias, marca de logro y fechas de creación y finalización.
- **Objetivo** — una meta del periodo de evaluación, con descripción y cómo se mide. Puede archivarse sin perder su historial de tareas.
- **Competencia** — una etiqueta de texto libre, comparada sin distinguir mayúsculas y normalizada a la grafía ya existente.
- **Usuario** — propietario de todos los registros. Es imprescindible en cuanto hay inicio de sesión.

Invariantes que debes proteger en cada historia, ticket, esquema y endpoint:

- Rellenar una fecha pasada nunca sobrescribe, dato a dato, un valor de tarea fijado por una entrada más reciente (estado, fecha de finalización, objetivo, competencias, resultado o impacto, evidencias y marca de logro): cada dato se propaga a la tarea solo si ninguna entrada con fecha posterior cambió ese mismo dato.
- La fecha de finalización que se fija al marcar `Completada` desde una entrada es la fecha de esa entrada, nunca la de hoy ni la de la última actividad; si la tarea ya estaba `Completada`, marcarla de nuevo en una entrada posterior mueve la fecha a la de esa entrada.
- Rellenar una fecha que ya tiene entrada fusiona los elementos; nunca crea una entrada duplicada para esa fecha. Si la tarea ya tenía elemento ese día, las notas se concatenan sin rechazar el guardado y sin ningún aviso especial.
- La misma tarea no puede aparecer dos veces entre los elementos de un mismo guardado.
- Al eliminar una entrada, o quitar un elemento al editarla, el estado y la fecha de finalización de cada tarea afectada se recalculan a partir de la entrada restante más reciente que la mencione; si no queda ninguna, la tarea conserva su estado y su fecha de finalización tal como estaban.
- Una tarea referenciada por alguna entrada no puede eliminarse; un objetivo con tareas vinculadas tampoco.
- La fecha de finalización solo existe mientras el estado es `Completada`.
- Toda consulta se limita al usuario autenticado; una petición sin autenticar devuelve `401`. La sesión termina al cerrarla explícitamente o a los 30 minutos de inactividad.

Semántica del informe (defínela siempre de forma explícita, porque es donde se esconde la ambigüedad):

- Una tarea está "trabajada en el periodo" si al menos una entrada del rango la menciona.
- "Completada en el periodo" se calcula con la fecha de finalización, no con las entradas.
- Un **logro** es una tarea con la marca activada. "Logros destacados" y el total de logros del resumen solo cuentan los logros **completados en el periodo** (fecha de finalización dentro del rango), no los simplemente trabajados.
- El intervalo de fechas y el número de entradas de una tarea en el informe se calculan solo con las entradas del periodo, nunca con su historial completo. Si el intervalo cae en un solo día, se muestra como esa única fecha, no como un rango con la fecha repetida. Un logro sin ninguna entrada en el periodo (por ejemplo, completado desde la pestaña Tareas) muestra como intervalo su fecha de finalización y 0 entradas.
- Las fortalezas ordenan las competencias por número de tareas trabajadas en el periodo que las usan; el primer desempate es el número de entradas **distintas** del periodo que mencionan alguna tarea con esa competencia (no el número de elementos), y el segundo desempate, el nombre de la competencia en orden alfabético.
- Un objetivo entra en "Detalle por objetivo" solo si tiene alguna tarea trabajada en el periodo. Un objetivo archivado entra igual si la tiene, porque archivar no borra su historial de trabajo; uno sin ninguna tarea trabajada en el periodo no aparece.
- Las exportaciones deben ser deterministas, para poder verificarlas con tests byte a byte.

Errores habituales que debes señalar pronto: el manejo de fechas sin hora y de zonas horarias, la generación de identificadores con accesos concurrentes, totales del informe que no coinciden con los datos de origen, y la deriva del alcance hacia colaboración, adjuntos o integraciones.
