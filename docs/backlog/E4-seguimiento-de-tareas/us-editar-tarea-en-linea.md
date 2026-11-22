# E4-3 · Completar y corregir una tarea sin escribir una entrada

| Campo            | Valor                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| ID               | `E4-3` (etiqueta provisional, **pendiente de ID**)                                                       |
| Épica            | E4 · Seguimiento de tareas                                                                               |
| Funcionalidad    | F3 · Seguimiento y edición de tareas (must-have)                                                         |
| Origen en el PRD | RF-22, RF-23, RF-24 · RF-27 (objetivo desde Tareas) · RF-15 (el título no cambia el ID)                  |
| Depende de       | [E4-2](./us-linea-de-tiempo-de-tarea.md) y [E2-4](../E2-registro-diario/us-competencias-normalizadas.md) |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md))                                                       |

## Historia

Como propietaria del diario, quiero editar en línea los datos de una tarea y cambiar su estado desde la pestaña Tareas, para completar el resultado, las evidencias o el objetivo que me faltan antes de generar el informe, sin inventarme una entrada para ello.

## Criterios de aceptación

1. **Campos editables.** La tarea desplegada permite editar en línea el título, el estado, el objetivo (con "+ Nuevo objetivo…"), la marca de logro, las competencias, el resultado y las evidencias. Guardar muestra un mensaje de éxito; un fallo muestra un mensaje que empieza por "No se pudo guardar" y no cambia nada.
2. **Título obligatorio.** Guardar con el título vacío o solo con espacios se rechaza con un mensaje de error y no cambia nada.
3. **Completar desde Tareas.** T-007 está `En curso` con última actividad el 2026-05-14: al pasarla a `Completada`, su fecha de finalización es 2026-05-14. T-008, sin entradas, al pasar a `Completada` toma la fecha de hoy. Al volver T-007 a `En curso`, su fecha de finalización desaparece.
4. **No añade nada a la línea de tiempo.** La línea de tiempo de T-007 tiene las mismas filas antes y después de los cambios del criterio 3.
5. **La fecha de finalización solo existe en `Completada`.** Tras cualquier cambio de estado desde Tareas, la tarea tiene fecha de finalización si y solo si está `Completada`.
6. **Objetivo nuevo desde Tareas.** Crear "+ Nuevo objetivo…" desde la edición de la tarea crea un objetivo solo con título, lo asigna a la tarea y lo deja disponible en la pestaña Objetivos.
7. **Competencias.** El campo de competencias ofrece las mismas sugerencias y la misma normalización que en el Diario ([E2-4](../E2-registro-diario/us-competencias-normalizadas.md)).
8. **El ID no cambia.** Editar el título de T-005 no cambia su ID.
9. **Privacidad.** Intentar editar una tarea del segundo usuario de prueba falla y la tarea no cambia.

## Notas

- Los cambios hechos aquí no son entradas: no mueven la fecha de la última actividad ([E4-1](./us-lista-de-tareas.md), criterio 7) ni activan la protección por fecha de [E2-3](../E2-registro-diario/us-rellenar-fechas-pasadas.md) (criterio 5 de esa historia).
