# E5-2 · Retirar un objetivo sin perder su historial

| Campo            | Valor                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| ID               | `E5-2` (etiqueta provisional, **pendiente de ID**)                                                               |
| Épica            | E5 · Objetivos                                                                                                   |
| Funcionalidad    | F4 · Gestión de objetivos (must-have)                                                                            |
| Origen en el PRD | RF-28 (archivar y restaurar), RF-30, RF-9 (objetivos archivados en los selectores) · RF-5 (confirmación) · RNF-6 |
| Depende de       | [E5-1](./us-crear-y-editar-objetivos.md) y [E4-3](../E4-seguimiento-de-tareas/us-editar-tarea-en-linea.md)       |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md))                                                               |

## Historia

Como propietaria del diario, quiero archivar los objetivos que ya no uso, restaurarlos si me equivoco y eliminar solo los que no tienen tareas, para que los selectores muestren los objetivos vigentes sin perder el trabajo vinculado a los antiguos.

## Criterios de aceptación

1. **Archivar.** Archivar un objetivo lo mueve a la sección "Archivados" y conserva sus tareas vinculadas.
2. **Restaurar.** Restaurar un objetivo archivado lo devuelve a la sección principal y a los selectores de objetivo.
3. **Selectores.** Con un objetivo archivado asignado a T-003 y otro archivado sin tareas: al elegir T-003 en un elemento del Diario o editarla en Tareas, su objetivo archivado aparece seleccionado; el otro archivado no aparece en ningún selector.
4. **Bloqueo si tiene tareas.** Intentar eliminar un objetivo con una tarea vinculada muestra un mensaje que propone archivarlo, y el objetivo sigue existiendo.
5. **Eliminación con confirmación en la página.** Pulsar "Eliminar" en un objetivo sin tareas muestra una confirmación dentro de la página, sin diálogo del navegador. Cancelar no elimina nada; confirmar lo elimina y muestra un mensaje de éxito.
6. **Privacidad.** Intentar archivar, restaurar o eliminar un objetivo del segundo usuario de prueba falla sin cambiarlo.

## Fuera de esta historia

- Que un objetivo archivado siga apareciendo en el informe si tiene tareas trabajadas en el periodo: [E6-4](../E6-informe-del-periodo/us-detalle-por-objetivo.md).
