# E4-1 · Ver todas mis tareas, con lo más reciente arriba

| Campo            | Valor                                                                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| ID               | `E4-1` (etiqueta provisional, **pendiente de ID**)                                                                                             |
| Épica            | E4 · Seguimiento de tareas                                                                                                                     |
| Funcionalidad    | F3 · Seguimiento y edición de tareas (must-have)                                                                                               |
| Origen en el PRD | RF-20 · RF-6 (carga en Tareas)                                                                                                                 |
| Depende de       | [E1-1](../E1-acceso-y-marco-comun/us-iniciar-y-cerrar-sesion.md) y [E5-1](../E5-objetivos/us-crear-y-editar-objetivos.md) (tabla de objetivos) |
| Tickets          | 3 (ver [Tickets](#tickets))                                                                                                                    |

## Historia

Como propietaria del diario, quiero ver en la pestaña Tareas todas mis tareas con su estado, ordenadas por la última vez que las trabajé, para saber de un vistazo en qué punto está cada una.

## Criterios de aceptación

1. **Qué muestra cada fila.** Cada fila muestra el ID, el título, la marca de logro, el estado, la fecha de la última actividad y el número de entradas.
2. **Fecha de la última actividad.** La fecha de la última actividad es la de la entrada más reciente que menciona la tarea: T-003, con entradas del 2026-03-01 y del 2026-03-22, muestra 2026-03-22.
3. **Orden por actividad.** T-002 aparece en una entrada del 2026-03-20 y T-001 en una del 2026-03-18: T-002 va antes que T-001. Con T-003 del criterio 2, el orden es T-003, T-002, T-001.
4. **Empate.** Con T-009 y T-005 con última actividad el 2026-03-15, T-005 va antes que T-009.
5. **Tareas sin entradas al final.** Con T-010 y T-008 sin ninguna entrada, ambas aparecen después de todas las tareas con entradas (incluidas T-005 y T-009), y T-008 antes que T-010. No muestran fecha de la última actividad.
6. **Número de entradas.** El número de entradas de cada fila coincide con el número de entradas que mencionan la tarea.
7. **Tareas no es una entrada.** Cambiar el estado o editar T-001 desde la pestaña Tareas no cambia su fecha de la última actividad ni su posición en la lista.
8. **Carga.** Con la respuesta de los datos retrasada, la pestaña muestra un mensaje de carga y no una lista vacía; con el almacenamiento detenido, un mensaje de error de carga.
9. **Privacidad.** La lista solo muestra tareas de la usuaria autenticada.

## Fuera de esta historia

- Desplegar una tarea: [E4-2](./us-linea-de-tiempo-de-tarea.md). Editarla: [E4-3](./us-editar-tarea-en-linea.md).
- Búsqueda y filtros (S2): [E4-5](./us-buscar-y-filtrar-tareas.md).

## Notas

- **Va antes que E2-1 por decisión de la propietaria**, para que el selector de tarea del Diario use la lista ya construida. Como todavía no hay forma de registrar entradas desde la interfaz, los criterios 2 a 6 se prueban con entradas y tareas preparadas en el propio test. El criterio 7 solo puede comprobarse cuando exista la edición desde Tareas ([E4-3](./us-editar-tarea-en-linea.md)); su test se añade allí y la historia no se cierra hasta entonces.

## Tickets

IDs provisionales `E4-1.<n>`, **pendientes de ID** como su historia. Cada ticket hereda los criterios que indica y cumple, además de lo suyo, el Definition of Done común del [backlog](../backlog-mvp.md#por-qué-solo-algunas-traen-tickets). Las referencias de diseño apuntan a documentos ya aprobados: el ticket no las rediseña.

| Ticket                                                     | Capa          | Hereda (criterios) | Depende de     | Talla | Riesgo |
| ---------------------------------------------------------- | ------------- | ------------------ | -------------- | ----- | ------ |
| [E4-1.1](#e4-11--tablas-de-tareas-competencias-y-entradas) | Base de datos | 2, 6 (datos), 9    | E5-1.1         | M     | Medio  |
| [E4-1.2](#e4-12--lista-de-tareas-en-la-api)                | Backend       | 1 a 6 (datos), 9   | E4-1.1, E5-1.2 | M     | Medio  |
| [E4-1.3](#e4-13--pestaña-tareas)                           | Frontend      | 1, 5, 8 (interfaz) | E4-1.2, E5-1.4 | M     | Bajo   |

### E4-1.1 · Tablas de tareas, competencias y entradas

- **Capa:** base de datos.
- **Origen:** RF-3, RF-10, RF-11, RF-20, RF-24, RF-25 · [modelo de datos](../../modelo-de-datos.md) §3.1, §3.5–§3.9, §4, §5, §8.
- **Entrega:** migración propia con el tipo `task_status` y las tablas `task`, `skill`, `task_skill`, `entry` y `entry_item`, con sus claves foráneas compuestas, restricciones `UNIQUE`, el SQL complementario de `CHECK` de esas tablas y sus índices. Las tablas de entradas entran aquí porque la última actividad y el número de entradas se calculan sobre ellas. La secuencia de ID (`task_code_sequence`) queda para [E2-1.1](../E2-registro-diario/us-registrar-entrada-del-dia.md#e2-11--secuencia-de-id-de-tarea). El _seed_ añade tareas y entradas ficticias mínimas para las dos usuarias.
- **DoD específico:**
  - Antes de la migración se escribe un test de integración por restricción que intenta guardar la fila que debe rechazarse (modelo de datos §5, último párrafo) y se ve fallar.
  - Un test comprueba que la clave foránea compuesta impide un `entry_item` que mezcle registros de dos usuarias (RF-3).
  - El _seed_ sigue siendo idempotente.

### E4-1.2 · Lista de tareas en la API

- **Capa:** backend.
- **Origen:** RF-15 (formato del ID), RF-20 · [`openapi.yaml`](../../api/openapi.yaml) `listTasks` (sin los parámetros de S2) · [modelo de datos](../../modelo-de-datos.md) §7.3.
- **Entrega:** `TaskStatus` en `packages/shared` y `TaskCode` (forma canónica `T-003`); caso de uso `ListTasks` con la parte de lectura del repositorio de tareas; `GET /api/tasks` con la última actividad, el número de entradas y el orden de RF-20 (sin entradas al final; empates por ID ascendente).
- **DoD específico:**
  - Tests de contrato escritos antes con los ejemplos de los criterios 2 a 6, preparados en el propio test.
  - La operación se añade a los tests de `401` y de aislamiento (criterio 9).

### E4-1.3 · Pestaña Tareas

- **Capa:** frontend.
- **Origen:** RF-20, RF-6 · [arquitectura](../../arquitectura.md) §6.1 (`TaskList`, `TaskRow`) · [interfaz](../../modelo/interfaz.md).
- **Entrega:** lista de la pestaña Tareas en el orden del servidor, con el ID, el título, la marca de logro, el estado, la fecha de la última actividad (ninguna en tareas sin entradas) y el número de entradas; mensajes de carga y de error con los componentes de E5-1.4; consulta de tareas que reutiliza el selector del Diario (E2-1.6). Desplegar una tarea es de [E4-2](./us-linea-de-tiempo-de-tarea.md).
- **DoD específico:**
  - Tests de componentes escritos antes: la lista no se reordena en el cliente; con la respuesta retrasada o fallida no aparece una lista vacía.
