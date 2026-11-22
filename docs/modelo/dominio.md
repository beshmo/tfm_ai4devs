# Manual del dominio: diarios de trabajo

Modelo básico:

- **Entrada** — una por fecha del calendario (la fecha es su identificador). Contiene varios **elementos**.
- **Elemento** — una línea dentro de una entrada: referencia a una tarea, una nota de ese día y el estado de la tarea tras ese día.
- **Tarea** — ID secuencial estable (`T-001`, `T-002`…), estado (`En curso`, `En pausa`, `Completada`), objetivo opcional, competencias, resultado, evidencias, marca de logro y fechas de creación y finalización.
- **Objetivo** — una meta del periodo de evaluación, con descripción y cómo se mide.
- **Competencia** — una etiqueta de texto libre, comparada sin distinguir mayúsculas y normalizada a la grafía ya existente.
- **Usuario** — propietario de todos los registros. Es imprescindible en cuanto hay inicio de sesión.

Invariantes que debes proteger en cada historia, ticket, esquema y endpoint:

- Rellenar una fecha pasada nunca sobrescribe un estado de tarea más reciente: el estado se propaga solo si ninguna entrada posterior menciona la tarea.
- Rellenar una fecha que ya tiene entrada fusiona los elementos; nunca crea una entrada duplicada.
- La misma tarea no puede aparecer dos veces en una entrada.
- Una tarea referenciada por alguna entrada no puede eliminarse; un objetivo con tareas vinculadas tampoco.
- La fecha de finalización solo existe mientras el estado es `Completada`.
- Toda consulta se limita al usuario autenticado; una petición sin autenticar devuelve `401`.

Semántica del informe (defínela siempre de forma explícita, porque es donde se esconde la ambigüedad):

- Una tarea está "trabajada en el periodo" si al menos una entrada del rango la menciona.
- "Completada en el periodo" se calcula con la fecha de finalización, no con las entradas.
- Las fortalezas ordenan las competencias por número de tareas en el periodo; el desempate es el número de entradas.
- Las exportaciones deben ser deterministas, para poder verificarlas con tests.

Errores habituales que debes señalar pronto: un diseño pensado para un entorno de artefactos alojados que no tiene API, el manejo de fechas sin hora y de zonas horarias, la generación de identificadores con accesos concurrentes, totales del informe que no coinciden con los datos de origen, y la deriva del alcance hacia colaboración, adjuntos o integraciones.
