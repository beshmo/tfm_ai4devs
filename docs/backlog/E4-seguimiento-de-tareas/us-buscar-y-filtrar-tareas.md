# E4-5 · Encontrar una tarea por texto o por filtros (S2, opcional)

| Campo            | Valor                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| ID               | `E4-5` (etiqueta provisional, **pendiente de ID**)                                              |
| Épica            | E4 · Seguimiento de tareas                                                                      |
| Funcionalidad    | S2 · Búsqueda y filtros de tareas (should-have, opcional)                                       |
| Origen en el PRD | RF-26                                                                                           |
| Depende de       | [E4-1](./us-lista-de-tareas.md) y [E2-4](../E2-registro-diario/us-competencias-normalizadas.md) |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md))                                              |

## Historia

Como propietaria del diario, quiero buscar por texto y filtrar la lista de tareas, para dar con una tarea concreta cuando ya tengo muchas sin recorrer la lista entera.

## Criterios de aceptación

1. **Búsqueda de texto libre.** La búsqueda mira el ID, el título, el resultado, las evidencias, las competencias y las notas de las entradas de cada tarea. Buscar una palabra que solo aparece en la nota de una entrada de T-004 deja T-004 como único resultado y el contador muestra 1.
2. **Filtros.** Hay filtros por estado, por objetivo (incluido "Sin objetivo"), por competencia y "Solo logros".
3. **Filtros combinados.** Combinar "Solo logros" con un estado muestra solo las tareas que cumplen las dos condiciones.
4. **Contador.** El contador muestra siempre el número de tareas que cumplen la búsqueda y los filtros activos.
5. **Privacidad.** La búsqueda nunca devuelve tareas ni notas del segundo usuario de prueba.

## Notas

- Es una should-have: no es condición para cerrar el MVP y va después de todas las must-have en el orden del backlog.
