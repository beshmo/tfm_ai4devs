# E3-1 · Repasar lo que he registrado, mes a mes

| Campo            | Valor                                                         |
| ---------------- | ------------------------------------------------------------- |
| ID               | `E3-1` (etiqueta provisional, **pendiente de ID**)            |
| Épica            | E3 · Historial cronológico                                    |
| Funcionalidad    | F2 · Historial cronológico (must-have)                        |
| Origen en el PRD | RF-16, RF-19 · RF-6 (carga en Diario)                         |
| Depende de       | [E2-1](../E2-registro-diario/us-registrar-entrada-del-dia.md) |
| Tickets          | 3 (ver [Tickets](#tickets))                                   |

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

## Tickets

IDs provisionales `E3-1.<n>`, **pendientes de ID** como su historia. Cada ticket hereda los criterios que indica y cumple, además de lo suyo, el Definition of Done común del [backlog](../backlog-mvp.md#por-qué-solo-algunas-traen-tickets).

**Sin ticket de base de datos:** el listado lee tablas e índices que ya crea [E4-1.1](../E4-seguimiento-de-tareas/us-lista-de-tareas.md#e4-11--tablas-de-tareas-competencias-y-entradas) (`entry (user_id, entry_date)` y `entry_item.position`, [modelo de datos](../../modelo-de-datos.md) §7.3).

Con esta historia, E1-1 y E2-1 completan el flujo de registrar el día y verlo en el historial.

| Ticket                                                  | Capa     | Hereda (criterios)  | Depende de             | Talla | Riesgo |
| ------------------------------------------------------- | -------- | ------------------- | ---------------------- | ----- | ------ |
| [E3-1.1](#e3-11--historial-en-la-api)                   | Backend  | 1, 2 y 3 (datos), 6 | E2-1.4                 | S     | Bajo   |
| [E3-1.2](#e3-12--agrupación-por-mes-y-columna-de-fecha) | Frontend | 1, 2 (fecha)        | E5-1.2, E1-1.6         | S     | Bajo   |
| [E3-1.3](#e3-13--listado-bajo-el-editor)                | Frontend | 2, 3, 4, 5          | E3-1.1, E3-1.2, E2-1.6 | M     | Bajo   |

### E3-1.1 · Historial en la API

- **Capa:** backend.
- **Origen:** RF-16, RF-3 · [`openapi.yaml`](../../api/openapi.yaml) `listEntries` · [modelo de datos](../../modelo-de-datos.md) §7.3.
- **Entrega:** caso de uso `ListEntries` y `GET /api/entries`: entradas de la usuaria por fecha descendente, con sus elementos en el orden de guardado y los valores actuales de cada tarea (objetivo y competencias en su orden).
- **DoD específico:**
  - Tests de contrato escritos antes con entradas del 2026-02-27, 2026-03-02 y 2026-03-10 preparadas en el propio test.
  - La operación se añade a los tests de `401` y de aislamiento: las entradas de la segunda usuaria no aparecen (criterio 6).

### E3-1.2 · Agrupación por mes y columna de fecha

- **Capa:** frontend (lógica pura).
- **Origen:** RF-16, RNF-4, RNF-10 · [arquitectura](../../arquitectura.md) §6.2.
- **Entrega:** función de agrupación por mes que conserva el orden descendente y formato en español del día, el mes y el día de la semana a partir de `CalendarDate`, sin convertir a hora.
- **DoD específico:**
  - Tests de Vitest escritos antes con el ejemplo del criterio 1; con el navegador en una zona distinta de UTC, el día de la semana del 2026-03-10 sigue siendo el correcto.

### E3-1.3 · Listado bajo el editor

- **Capa:** frontend.
- **Origen:** RF-6, RF-16, RF-19 · [arquitectura](../../arquitectura.md) §6.1 (`EntryHistory`, `LoadingState`, `LoadError`, `EmptyState`) · [interfaz](../../modelo/interfaz.md).
- **Entrega:** listado de la pestaña Diario con grupos de mes, tarjeta de entrada y fila de elemento; estado vacío; mensaje de carga y de error de carga con los componentes comunes de [E5-1.4](../E5-objetivos/us-crear-y-editar-objetivos.md#e5-14--mensajes-carga-y-fecha-del-cliente). Tras guardar en el editor, la entrada aparece sin recargar.
- **DoD específico:**
  - Tests de componentes escritos antes: respuesta retrasada → mensaje de carga y no estado vacío; respuesta fallida → error de carga y no estado vacío; sin entradas → texto del criterio 4 y ningún grupo vacío.
  - El test E2E de [E2-1.8](../E2-registro-diario/us-registrar-entrada-del-dia.md#e2-18--base-e2e-y-registro-sin-salir-del-diario) se amplía para comprobar que la entrada guardada aparece en el listado: cierra el flujo de registrar y repasar el día.
