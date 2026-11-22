# E2-3 · Rellenar un día olvidado sin estropear lo más reciente

| Campo            | Valor                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------- |
| ID               | `E2-3` (etiqueta provisional, **pendiente de ID**)                                       |
| Épica            | E2 · Registro diario                                                                     |
| Funcionalidad    | F1 · Registro diario de entradas (must-have)                                             |
| Origen en el PRD | RF-12, RF-10 (efecto sobre la tarea), RF-24 · RNF-6 · S-2                                |
| Depende de       | [E2-1](./us-registrar-entrada-del-dia.md) y [E2-2](./us-fusionar-entrada-misma-fecha.md) |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md))                                       |

## Historia

Como propietaria del diario, quiero registrar trabajo de días anteriores sin que eso cambie el estado ni los datos que ya fijé en días posteriores, para recuperar un día olvidado con la tranquilidad de que el estado de hoy sigue siendo el de hoy.

## Criterios de aceptación

1. **Una fecha pasada no pisa el estado.** T-001 tiene una entrada del 2026-03-12 con estado `Completada` y está `Completada` con fecha de finalización 2026-03-12. Cuando guardo una entrada del 2026-03-05 con T-001 en `En curso`, el elemento del 2026-03-05 se guarda con `En curso`, pero T-001 sigue `Completada` con fecha de finalización 2026-03-12.
2. **Una fecha posterior sí manda.** A continuación, guardar una entrada del 2026-03-15 con T-001 de nuevo en `Completada` mueve su fecha de finalización a 2026-03-15.
3. **Salir de `Completada` borra la fecha.** Después, guardar una entrada del 2026-03-18 con T-001 en `En pausa` deja T-001 en `En pausa` y sin fecha de finalización.
4. **Protección dato a dato.** T-002 tiene una entrada del 2026-04-10 que cambió su resultado a "Latencia reducida un 30 %" y activó su marca de logro, sin cambiar sus competencias. Cuando guardo una entrada del 2026-04-03 con T-002 que cambia el resultado a "Primer prototipo", desactiva la marca de logro y añade la competencia "Grafana", T-002 conserva el resultado "Latencia reducida un 30 %" y la marca de logro activada, y gana "Grafana" en sus competencias. La misma regla se aplica al objetivo y a las evidencias.
5. **Qué cuenta como cambio.** Un dato cuenta como cambiado por una entrada solo si, al guardarla, el valor del elemento era distinto del que tenía la tarea. Los cambios hechos desde la pestaña Tareas no son entradas y no activan la protección: T-003 tiene una sola entrada, del 2026-04-10, que no cambió su resultado; tras poner en Tareas el resultado "Informe publicado", guardar una entrada del 2026-04-03 que cambia el resultado a "Borrador" deja T-003 con "Borrador".
6. **Decide la fecha, no el orden de guardado.** Guardar las entradas del 2026-03-05 y del 2026-03-12 de los criterios 1 y 2 en cualquiera de los dos órdenes deja T-001 con el mismo estado y la misma fecha de finalización.
7. **Fusión en una fecha con menciones posteriores.** Existe una entrada del 2026-03-10 con T-001 y otra del 2026-03-12 que también menciona T-001. Cuando fusiono en el 2026-03-10 un elemento de T-001 en `Completada`, el estado y la fecha de finalización de T-001 no cambian.
8. **La fecha de finalización solo existe en `Completada`.** Tras cada uno de los casos anteriores, la tarea tiene fecha de finalización si y solo si su estado es `Completada`.
9. **Privacidad.** Las entradas del segundo usuario de prueba nunca cuentan como "entrada posterior" para las tareas de la usuaria.

## Notas

- Esta historia sostiene JTBD-2 y el indicador de salud S-2: sus tests de integridad deben pasar en cada ejecución de la suite.
- Es la historia de mayor riesgo de E2: la regla dato a dato obliga a saber qué datos cambió cada entrada al guardarse, no solo su estado.
