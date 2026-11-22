# E4-4 · Eliminar una tarea que no aparece en ninguna entrada

| Campo            | Valor                                                     |
| ---------------- | --------------------------------------------------------- |
| ID               | `E4-4` (etiqueta provisional, **pendiente de ID**)        |
| Épica            | E4 · Seguimiento de tareas                                |
| Funcionalidad    | F3 · Seguimiento y edición de tareas (must-have)          |
| Origen en el PRD | RF-25, RF-15 (ID retirados) · RF-5 (confirmación) · RNF-6 |
| Depende de       | [E4-2](./us-linea-de-tiempo-de-tarea.md)                  |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md))        |

## Historia

Como propietaria del diario, quiero poder eliminar una tarea que ya no aparece en ninguna entrada y que el sistema me impida eliminar las que sí aparecen, para limpiar la lista sin romper nunca el historial.

## Criterios de aceptación

1. **Bloqueo si está referenciada.** Intentar eliminar T-001, mencionada en una entrada, muestra un mensaje que indica que hay que quitarla antes de esas entradas, y T-001 sigue existiendo.
2. **Eliminación con confirmación en la página.** Pulsar "Eliminar" en T-008, sin entradas, muestra una confirmación dentro de la página, sin diálogo del navegador. Cancelar no elimina nada; confirmar la quita de la lista y muestra un mensaje de éxito.
3. **Tarea que se quedó sin entradas.** Una tarea que se quedó sin entradas al eliminar su única entrada ([E2-5](../E2-registro-diario/us-editar-y-eliminar-entrada.md), criterio 6) se puede eliminar igual que T-008.
4. **El ID eliminado no se reutiliza.** Con T-001 a T-004 creadas, eliminar T-003 (sin entradas) y crear una tarea nueva le asigna T-005; la lista muestra T-001, T-002, T-004 y T-005, y ninguna tarea posterior recibe T-003.
5. **Tampoco el más alto.** Con T-001 a T-004 creadas, eliminar T-004 y crear una tarea nueva le asigna T-005, no T-004.
6. **Privacidad.** Intentar eliminar una tarea del segundo usuario de prueba falla y la tarea sigue existiendo.
