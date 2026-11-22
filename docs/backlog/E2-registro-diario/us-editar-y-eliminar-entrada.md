# E2-5 · Corregir o eliminar una entrada sin perder mis tareas

| Campo            | Valor                                                                                                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID               | `E2-5` (etiqueta provisional, **pendiente de ID**)                                                                                                                         |
| Épica            | E2 · Registro diario                                                                                                                                                       |
| Funcionalidad    | F1 · Registro diario de entradas (must-have); también cubre la edición y eliminación desde el listado de F2                                                                |
| Origen en el PRD | RF-14, RF-18, RF-24 · RF-5 (confirmación) · RNF-6                                                                                                                          |
| Depende de       | [E2-3](./us-rellenar-fechas-pasadas.md), [E3-1](../E3-historial-cronologico/us-ver-historial-por-mes.md) y [E4-3](../E4-seguimiento-de-tareas/us-editar-tarea-en-linea.md) |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md))                                                                                                                         |

## Historia

Como propietaria del diario, quiero corregir o eliminar una entrada desde el historial y que el estado de cada tarea afectada se recalcule con lo que queda, para arreglar un error sin borrar las tareas ni dejar estados que ya no corresponden a ninguna entrada.

## Criterios de aceptación

1. **Editar desde el listado.** Pulsar "Editar" en una entrada del historial carga su fecha y sus elementos en el editor y muestra "Cancelar"; cancelar deja la entrada como estaba. Al guardar la edición se muestra "Entrada guardada", y los cambios de cada elemento sobre su tarea siguen la protección por fecha de [E2-3](./us-rellenar-fechas-pasadas.md).
2. **La fecha no se puede cambiar al editar.** El selector de fecha del editor no es editable cuando se edita una entrada existente; solo se editan sus elementos. Para mover el trabajo a otro día hay que eliminar la entrada y crear una nueva en la fecha correcta.
3. **Eliminar con confirmación en la página.** Pulsar "Eliminar" muestra una confirmación dentro de la página, sin diálogo del navegador; cancelarla no elimina nada. Tras confirmar, la entrada desaparece del listado y sus tareas siguen en Tareas.
4. **Recálculo con la mención más reciente que queda.** T-006 tiene entradas del 2026-04-01 (`En curso`) y del 2026-04-08 (`Completada`), y está `Completada` con fecha de finalización 2026-04-08. Eliminar la entrada del 2026-04-08 deja T-006 `En curso` sin fecha de finalización.
5. **Quitar un elemento también recalcula.** Si la entrada del 2026-04-01 deja T-006 `Completada` y la del 2026-04-08 la deja `En pausa`, quitar el elemento de T-006 al editar la entrada del 2026-04-08 deja T-006 `Completada` con fecha de finalización 2026-04-01.
6. **Si no era la mención más reciente, nada cambia.** Eliminar la entrada del 2026-04-01 mientras la del 2026-04-08 sigue mencionando T-006 no cambia su estado ni su fecha de finalización.
7. **Tarea sin entradas que quedan.** T-014 solo aparece en la entrada del 2026-04-15, que la deja `Completada` con fecha de finalización 2026-04-15; eliminar esa entrada deja T-014 en Tareas con 0 entradas, `Completada`, con fecha de finalización 2026-04-15 y al final de la lista junto a las demás tareas sin entradas. T-015 solo aparece en la entrada del 2026-04-20, que la deja `En pausa`; quitar su elemento al editar esa entrada deja T-015 con 0 entradas, `En pausa` y sin fecha de finalización. En ningún caso se borra la tarea ni se pide confirmación por ella.
8. **El recálculo solo toca estado y fecha de finalización.** El recálculo no modifica el objetivo, las competencias, el resultado, las evidencias ni la marca de logro, y no muestra ningún mensaje propio.
9. **La fecha de finalización solo existe en `Completada`, por cualquier camino.** Un test recorre todos los caminos que cambian el estado de una tarea (fusión, fecha pasada, eliminación o quitado de un elemento, y cambio desde Tareas) y comprueba que, tras cada uno, la tarea tiene fecha de finalización solo si está `Completada`.
10. **Privacidad.** No se puede editar ni eliminar una entrada del segundo usuario de prueba: el intento falla y la entrada no cambia.

## Fuera de esta historia

- El descuento en la cabecera al eliminar: [E1-3](../E1-acceso-y-marco-comun/us-resumen-en-cabecera.md).

## Notas

- **Decisión de ubicación pendiente de confirmar.** El PRD traza RF-18 (editar y eliminar desde el listado) a E3 y RF-14 (las reglas de edición y eliminación) a E2. Aquí van juntas en una sola historia de E2, porque son la misma acción de la usuaria y por separado ninguna de las dos entrega valor. F2 sigue cubierta por E3-1 y E3-2.
- El criterio 9 vive aquí porque esta es la última, en el orden del backlog, de las historias que añaden un camino de cambio de estado.
