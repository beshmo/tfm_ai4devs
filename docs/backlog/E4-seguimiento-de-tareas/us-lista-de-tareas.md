# E4-1 · Ver todas mis tareas, con lo más reciente arriba

| Campo            | Valor                                                         |
| ---------------- | ------------------------------------------------------------- |
| ID               | `E4-1` (etiqueta provisional, **pendiente de ID**)            |
| Épica            | E4 · Seguimiento de tareas                                    |
| Funcionalidad    | F3 · Seguimiento y edición de tareas (must-have)              |
| Origen en el PRD | RF-20 · RF-6 (carga en Tareas)                                |
| Depende de       | [E2-1](../E2-registro-diario/us-registrar-entrada-del-dia.md) |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md))            |

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
