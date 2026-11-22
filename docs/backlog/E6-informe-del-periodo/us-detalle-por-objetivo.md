# E6-4 · Ver el trabajo del periodo agrupado por objetivo

| Campo            | Valor                                                       |
| ---------------- | ----------------------------------------------------------- |
| ID               | `E6-4` (etiqueta provisional, **pendiente de ID**)          |
| Épica            | E6 · Informe del periodo                                    |
| Funcionalidad    | F5 · Informe del periodo y exportación Markdown (must-have) |
| Origen en el PRD | RF-36                                                       |
| Depende de       | [E6-1](./us-periodo-y-resumen.md)                           |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md))          |

## Historia

Como propietaria del diario, quiero que el informe agrupe por objetivo las tareas que trabajé en el periodo, con su estado y su resultado, para demostrar en la reunión el progreso de cada objetivo acordado.

## Criterios de aceptación

1. **Un grupo por objetivo con trabajo.** Hay un grupo por cada objetivo con al menos una tarea trabajada en el periodo, con su "Cómo se mide". No se muestran grupos vacíos.
2. **Qué muestra cada tarea.** Cada tarea del grupo muestra su estado, el intervalo de fechas, el número de entradas y el resultado.
3. **Orden de los grupos.** Con tareas trabajadas en el periodo en "Mejorar la observabilidad" y "Automatizar despliegues" y una tarea trabajada sin objetivo, los grupos aparecen en este orden: "Automatizar despliegues", "Mejorar la observabilidad" y "Sin objetivo asignado".
4. **Títulos repetidos.** Con dos objetivos titulados "Reducir incidencias", uno con T-006 y T-012 trabajadas en el periodo y otro con T-003 y T-009, el grupo con T-003 y T-009 aparece primero.
5. **Orden dentro del grupo.** Con T-005 y T-002 en el mismo objetivo, T-002 aparece antes que T-005.
6. **Sin objetivo, al final.** Las tareas trabajadas sin objetivo aparecen en "Sin objetivo asignado", que va siempre después de todos los grupos con título.
7. **Solo entradas del periodo.** Con el periodo 2026-03-01 a 2026-03-31 y una tarea con entradas el 2026-02-20, el 2026-03-05 y el 2026-03-12, la tarea muestra el intervalo 2026-03-05 a 2026-03-12 y 2 entradas.
8. **Intervalo de un solo día.** Con el mismo periodo y una tarea T-021 cuyas únicas entradas del periodo son dos del 2026-03-22, la tarea muestra el intervalo como "2026-03-22" (no como "2026-03-22 a 2026-03-22") y 2 entradas.
9. **Objetivos archivados y objetivos sin trabajo.** Con el periodo 2026-03-01 a 2026-03-31, un objetivo "Migrar la base de datos" archivado el 2026-04-02 cuya tarea T-019 tiene una entrada el 2026-03-08, y un objetivo activo "Documentar la arquitectura" cuya única tarea T-020 solo tiene entradas el 2026-02-14, el grupo "Migrar la base de datos" aparece con T-019 y el grupo "Documentar la arquitectura" no aparece.
10. **Flujo principal.** En el flujo principal del PRD (sección 4.1), la tarea cerrada aparece en el grupo de su objetivo con estado `Completada`.
11. **Privacidad.** No aparece ningún objetivo ni tarea del segundo usuario de prueba.

## Notas

- El criterio 9 se prueba con un objetivo archivado preparado en los datos de prueba, así que esta historia no espera a [E5-2](../E5-objetivos/us-archivar-restaurar-eliminar-objetivo.md).
