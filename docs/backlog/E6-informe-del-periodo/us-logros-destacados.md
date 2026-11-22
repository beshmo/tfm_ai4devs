# E6-2 · Ver los logros que cerré en el periodo

| Campo            | Valor                                                       |
| ---------------- | ----------------------------------------------------------- |
| ID               | `E6-2` (etiqueta provisional, **pendiente de ID**)          |
| Épica            | E6 · Informe del periodo                                    |
| Funcionalidad    | F5 · Informe del periodo y exportación Markdown (must-have) |
| Origen en el PRD | RF-34                                                       |
| Depende de       | [E6-1](./us-periodo-y-resumen.md)                           |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md))          |

## Historia

Como propietaria del diario, quiero que el informe liste los logros que completé en el periodo con su resultado, su objetivo, sus competencias y sus evidencias, para llevar a la reunión también los logros de los primeros meses, contados con lo que conseguí.

## Criterios de aceptación

1. **Qué logros entran.** Aparecen las tareas con marca de logro cuya fecha de finalización cae dentro del periodo, las mencione o no alguna entrada del rango. No aparecen una tarea con marca de logro `En curso` mencionada en una entrada del periodo ni una tarea con marca de logro completada antes del periodo.
2. **Qué muestra cada tarjeta.** Cada tarjeta muestra el ID, el título, el objetivo, el intervalo de fechas, el número de entradas, el resultado, las competencias y las evidencias.
3. **Resultado que falta.** Un logro sin resultado muestra una indicación para añadirlo en Tareas, en lugar de un hueco vacío.
4. **Solo entradas del periodo.** Con el periodo 2026-03-01 a 2026-03-31 y un logro con entradas el 2026-02-20, el 2026-03-05 y el 2026-03-12 y fecha de finalización 2026-03-12, la tarjeta muestra el intervalo 2026-03-05 a 2026-03-12 y 2 entradas.
5. **Logro sin entradas en el periodo.** Con el periodo 2026-03-01 a 2026-03-31 y una tarea T-016 con marca de logro, `Completada` con fecha de finalización 2026-03-18 y sin ninguna entrada con fecha dentro del rango, la tarjeta de T-016 aparece, muestra el intervalo como "2026-03-18" (no como "2026-03-18 a 2026-03-18") y muestra 0 entradas.
6. **Intervalo de un solo día.** Siempre que el intervalo es un solo día, se muestra como esa única fecha.
7. **Orden.** Con el periodo 2026-03-01 a 2026-03-31, el logro T-006 (fecha de finalización 2026-03-25) aparece antes que T-004 (2026-03-12). Con T-011 y T-007, ambos con fecha de finalización 2026-03-20, T-007 aparece antes que T-011.
8. **Coherencia con el resumen.** El número de tarjetas es igual al total de logros de la franja de resumen ([E6-1](./us-periodo-y-resumen.md), criterio 6).
9. **Privacidad.** No aparece ningún logro del segundo usuario de prueba.

## Notas

- El caso del criterio 5 se obtiene, por ejemplo, completando T-016 desde Tareas sin entradas con hoy = 2026-03-18 ([E4-3](../E4-seguimiento-de-tareas/us-editar-tarea-en-linea.md), criterio 3). Para no depender del orden de construcción, el test puede preparar ese estado directamente en los datos.
