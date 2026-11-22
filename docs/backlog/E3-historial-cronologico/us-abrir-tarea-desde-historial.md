# E3-2 · Saltar del historial a la tarea

| Campo            | Valor                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| ID               | `E3-2` (etiqueta provisional, **pendiente de ID**)                                                         |
| Épica            | E3 · Historial cronológico                                                                                 |
| Funcionalidad    | F2 · Historial cronológico (must-have)                                                                     |
| Origen en el PRD | RF-17                                                                                                      |
| Depende de       | [E3-1](./us-ver-historial-por-mes.md) y [E4-2](../E4-seguimiento-de-tareas/us-linea-de-tiempo-de-tarea.md) |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md))                                                         |

## Historia

Como propietaria del diario, quiero pulsar el ID de una tarea en el historial y llegar a esa tarea desplegada, para ver toda su historia en cuanto la reconozco en un día concreto.

## Criterios de aceptación

1. **Del ID a la tarea.** Pulsar "T-003" en un elemento del listado abre la pestaña Tareas con T-003 desplegada y ninguna otra.
2. **Sustituye a la que hubiera.** Si T-001 estaba desplegada en Tareas, pulsar "T-003" en el historial deja desplegada solo T-003.
