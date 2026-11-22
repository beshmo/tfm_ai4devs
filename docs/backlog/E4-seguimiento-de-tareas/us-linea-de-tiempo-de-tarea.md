# E4-2 · Ver la historia completa de una tarea

| Campo            | Valor                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------- |
| ID               | `E4-2` (etiqueta provisional, **pendiente de ID**)                                            |
| Épica            | E4 · Seguimiento de tareas                                                                    |
| Funcionalidad    | F3 · Seguimiento y edición de tareas (must-have)                                              |
| Origen en el PRD | RF-21 · RF-12 (línea de tiempo tras rellenar una fecha pasada)                                |
| Depende de       | [E4-1](./us-lista-de-tareas.md) y [E2-3](../E2-registro-diario/us-rellenar-fechas-pasadas.md) |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md))                                            |

## Historia

Como propietaria del diario, quiero desplegar una tarea y ver sus datos y una línea de tiempo con cada día que la trabajé, lo que anoté y cuándo cambió de estado, para reconstruir su historia sin buscarla en otras herramientas.

## Criterios de aceptación

1. **Una tarea desplegada cada vez.** Con T-001 desplegada, desplegar T-002 pliega T-001.
2. **Datos de la tarea.** La tarea desplegada muestra el objetivo, el resultado o impacto, las competencias y las evidencias.
3. **Enlaces pulsables.** Una URL escrita en las evidencias se abre al pulsarla.
4. **Línea de tiempo "Seguimiento", de la más reciente a la más antigua.** Una tarea con entradas del 2026-03-01 (`En curso`), del 2026-03-05 (`En curso`) y del 2026-03-09 (`Completada`) muestra tres filas en el orden 2026-03-09, 2026-03-05 y 2026-03-01, cada una con su fecha y su nota, y un indicador de estado solo en la del 2026-03-01 (primer estado) y en la del 2026-03-09 (cambia a `Completada`); la del 2026-03-05 no lleva indicador porque repite el estado anterior.
5. **Fechas pasadas en su sitio.** T-001 tiene entradas del 2026-03-12 y, guardada después, del 2026-03-05: la línea de tiempo muestra primero la del 2026-03-12 y después la del 2026-03-05, por fecha de entrada y no por orden de guardado.
6. **Privacidad.** No se puede desplegar una tarea del segundo usuario de prueba ni ver sus entradas en la línea de tiempo.

## Fuera de esta historia

- Que un cambio de estado desde Tareas no añada filas: [E4-3](./us-editar-tarea-en-linea.md), criterio 4.
