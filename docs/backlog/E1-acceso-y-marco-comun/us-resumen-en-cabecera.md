# E1-3 · Ver de un vistazo cuánto llevo registrado

| Campo            | Valor                                                                                                                                                                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ID               | `E1-3` (etiqueta provisional, **pendiente de ID**)                                                                                                                                                                                                                    |
| Épica            | E1 · Acceso, privacidad y marco común                                                                                                                                                                                                                                 |
| Funcionalidad    | Requisitos transversales del alcance (sin F-id propio)                                                                                                                                                                                                                |
| Origen en el PRD | RF-4, RF-18 (cabecera tras eliminar)                                                                                                                                                                                                                                  |
| Depende de       | [E2-1](../E2-registro-diario/us-registrar-entrada-del-dia.md), [E2-5](../E2-registro-diario/us-editar-y-eliminar-entrada.md), [E4-3](../E4-seguimiento-de-tareas/us-editar-tarea-en-linea.md) y [E4-4](../E4-seguimiento-de-tareas/us-eliminar-tarea-sin-entradas.md) |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md))                                                                                                                                                                                                                    |

## Historia

Como propietaria del diario, quiero ver en la cabecera cuántas entradas, tareas y logros llevo, al día tras cada cambio, para saber que lo que acabo de guardar ha contado sin tener que ir a buscarlo.

## Criterios de aceptación

1. **Tres contadores.** La cabecera muestra el número total de entradas, de tareas y de logros (tareas con la marca de logro) de la usuaria, sin filtrar por periodo.
2. **Al guardar.** Partiendo de N entradas, M tareas y L logros, cuando guardo una entrada en una fecha sin entrada con una tarea nueva marcada como logro, la cabecera muestra N+1, M+1 y L+1 sin recargar la página.
3. **Al eliminar una entrada.** Cuando elimino esa entrada, la cabecera muestra N entradas y mantiene M+1 tareas y L+1 logros, porque la tarea se conserva.
4. **Fusión.** Guardar una entrada en una fecha que ya tiene entrada no cambia el número de entradas.
5. **Desde Tareas.** Activar o desactivar la marca de logro de una tarea en la pestaña Tareas suma o resta un logro, y eliminar una tarea sin entradas resta una tarea, en ambos casos sin recargar la página.
6. **Privacidad.** Los contadores solo cuentan registros de la usuaria autenticada: con el segundo usuario de prueba, sus registros no suman en la cabecera de la usuaria (criterio 7 de [E1-1](./us-iniciar-y-cerrar-sesion.md)).
