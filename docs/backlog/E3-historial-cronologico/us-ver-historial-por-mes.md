# E3-1 · Repasar lo que he registrado, mes a mes

| Campo            | Valor                                                         |
| ---------------- | ------------------------------------------------------------- |
| ID               | `E3-1` (etiqueta provisional, **pendiente de ID**)            |
| Épica            | E3 · Historial cronológico                                    |
| Funcionalidad    | F2 · Historial cronológico (must-have)                        |
| Origen en el PRD | RF-16, RF-19 · RF-6 (carga en Diario)                         |
| Depende de       | [E2-1](../E2-registro-diario/us-registrar-entrada-del-dia.md) |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md))            |

## Historia

Como propietaria del diario, quiero ver debajo del editor mis entradas de la más reciente a la más antigua, agrupadas por mes y con el detalle de cada tarea, para comprobar lo que llevo anotado y recordar qué hice cada día.

## Criterios de aceptación

1. **Orden y agrupación.** Con entradas del 2026-02-27, 2026-03-02 y 2026-03-10, el listado muestra primero el grupo de marzo, con el 10 y después el 2, y luego el grupo de febrero.
2. **Qué muestra cada entrada.** Cada entrada muestra una columna de fecha con el día, el mes y el día de la semana, y sus elementos. Cada elemento muestra el ID de la tarea, su título, la marca de logro, el estado, la nota y una línea con el objetivo y las competencias.
3. **Orden de los elementos.** Dentro de una entrada, los elementos aparecen en el orden en que se guardaron; los añadidos por una fusión ([E2-2](../E2-registro-diario/us-fusionar-entrada-misma-fecha.md)) van detrás de los que ya había.
4. **Estado vacío.** Con una usuaria sin entradas, el listado muestra un texto que indica usar el editor de la parte superior para guardar la primera entrada, y no muestra grupos de mes vacíos.
5. **Carga.** Con la respuesta de los datos retrasada, el listado muestra un mensaje de carga y no el estado vacío. Con el almacenamiento detenido, muestra un mensaje de error de carga en lugar del estado vacío.
6. **Privacidad.** El listado solo muestra entradas de la usuaria autenticada: con el segundo usuario de prueba, sus entradas no aparecen.

## Fuera de esta historia

- Los botones "Editar" y "Eliminar" de cada entrada: [E2-5](../E2-registro-diario/us-editar-y-eliminar-entrada.md).
- Pulsar el ID para abrir la tarea: [E3-2](./us-abrir-tarea-desde-historial.md).
