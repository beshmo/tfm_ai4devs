# E5-1 · Definir mis objetivos y ver cómo avanzan

| Campo            | Valor                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| ID               | `E5-1` (etiqueta provisional, **pendiente de ID**)                                               |
| Épica            | E5 · Objetivos                                                                                   |
| Funcionalidad    | F4 · Gestión de objetivos (must-have)                                                            |
| Origen en el PRD | RF-27, RF-28 (edición), RF-29, RF-31 · RF-6 (carga en Objetivos)                                 |
| Depende de       | [E1-1](../E1-acceso-y-marco-comun/us-iniciar-y-cerrar-sesion.md) (ver Notas sobre el criterio 3) |
| Tickets          | 5 (ver [Tickets](#tickets))                                                                      |

## Historia

Como propietaria del diario, quiero dar de alta y editar los objetivos del periodo y ver en cada uno cuántas tareas tiene, cuántas están completadas y cuántas son logros, para saber qué objetivos están avanzando antes de la evaluación.

## Criterios de aceptación

1. **Alta completa.** "+ Nuevo objetivo" en la pestaña Objetivos abre un formulario con título (obligatorio), descripción y "Cómo se mide". Guardar muestra un mensaje de éxito y el objetivo aparece como tarjeta.
2. **Título obligatorio.** Guardar sin título se rechaza con un mensaje de error y no crea nada.
3. **Los creados en línea también están aquí.** Un objetivo creado solo con título desde el Diario ([E2-1](../E2-registro-diario/us-registrar-entrada-del-dia.md), criterio 6) aparece en Objetivos sin descripción ni "Cómo se mide".
4. **Edición.** Editar un objetivo permite cambiar su título, descripción y "Cómo se mide"; así se completa después un objetivo creado en línea.
5. **Tarjeta con tres contadores.** Cada tarjeta muestra el título, la descripción, "Cómo se mide" y los contadores de tareas, completadas y logros. Un objetivo con T-001 (`Completada`, logro), T-002 (`En curso`, logro) y T-003 (`En pausa`) muestra 3 tareas, 1 completada y 2 logros.
6. **Sin filtro de periodo.** Los contadores cuentan todas las tareas vinculadas, sea cual sea la fecha de sus entradas.
7. **Estado vacío.** Con una usuaria sin objetivos, la pestaña muestra un texto que indica que los objetivos agrupan las tareas en el "Detalle por objetivo" del informe.
8. **Carga.** Con la respuesta de los datos retrasada, la pestaña muestra un mensaje de carga y no el estado vacío; con el almacenamiento detenido, un mensaje de error de carga.
9. **Privacidad.** La pestaña solo muestra objetivos de la usuaria autenticada, y sus contadores solo cuentan tareas suyas; intentar editar un objetivo del segundo usuario de prueba falla sin cambiarlo.

## Fuera de esta historia

- Archivar, restaurar y eliminar: [E5-2](./us-archivar-restaurar-eliminar-objetivo.md).

## Notas

- **Va antes que E2-1 por decisión de la propietaria**, para que los selectores del Diario usen la lista de objetivos ya construida. Consecuencia: el criterio 3 (objetivos creados en línea desde el Diario) solo puede comprobarse cuando exista [E2-1](../E2-registro-diario/us-registrar-entrada-del-dia.md); su test se añade en E2-1.7 y la historia no se cierra hasta entonces. Los contadores del criterio 5 se prueban con tareas preparadas en el propio test.

## Tickets

IDs provisionales `E5-1.<n>`, **pendientes de ID** como su historia. Cada ticket hereda los criterios que indica y cumple, además de lo suyo, el Definition of Done común del [backlog](../backlog-mvp.md#por-qué-solo-algunas-traen-tickets). Las referencias de diseño apuntan a documentos ya aprobados: el ticket no las rediseña.

Es la primera historia con contenido en una pestaña, así que carga con el interceptor de `X-Client-Date`, `CalendarDate` y los componentes comunes de mensajes, carga y error que reutilizan las demás.

| Ticket                                                        | Capa          | Hereda (criterios)          | Depende de     | Talla | Riesgo |
| ------------------------------------------------------------- | ------------- | --------------------------- | -------------- | ----- | ------ |
| [E5-1.1](#e5-11--tabla-de-objetivos)                          | Base de datos | 2 (red de seguridad), 9     | E1-1.2, E1-1.3 | S     | Bajo   |
| [E5-1.2](#e5-12--alta-y-edición-de-objetivos-en-la-api)       | Backend       | 1, 2, 4 (servidor), 9       | E5-1.1, E1-1.5 | M     | Medio  |
| [E5-1.3](#e5-13--lista-de-objetivos-con-contadores-en-la-api) | Backend       | 5, 6 (datos), 9             | E5-1.2, E4-1.1 | S     | Bajo   |
| [E5-1.4](#e5-14--mensajes-carga-y-fecha-del-cliente)          | Frontend      | 8; 1 y 2 (mensajes)         | E1-1.7, E5-1.2 | M     | Bajo   |
| [E5-1.5](#e5-15--pestaña-objetivos)                           | Frontend      | 1, 2, 4, 5, 7, 8 (interfaz) | E5-1.3, E5-1.4 | M     | Bajo   |

### E5-1.1 · Tabla de objetivos

- **Capa:** base de datos.
- **Origen:** RF-27, RF-3 · [modelo de datos](../../modelo-de-datos.md) §3.4, §4, §5, §8.
- **Entrega:** migración propia `add_objectives` con la tabla `objective` (título no vacío, `UNIQUE (id, user_id)` para las foráneas compuestas, índice por usuaria), coherente con el reparto de migraciones por historia; el _seed_ añade objetivos ficticios mínimos para las dos usuarias.
- **DoD específico:**
  - Tests de integración escritos antes: un título en blanco se rechaza; el _seed_ sigue siendo idempotente.

### E5-1.2 · Alta y edición de objetivos en la API

- **Capa:** backend.
- **Origen:** RF-27, RF-28 (edición), RF-3, RNF-4 · D-3 · [`openapi.yaml`](../../api/openapi.yaml) `createObjective`, `updateObjective` · [arquitectura](../../arquitectura.md) §5.6.
- **Entrega:** `CalendarDate` en `packages/shared`; entidad `Objective` y casos de uso `CreateObjective` y `UpdateObjective` con su repositorio; `POST /api/objectives` y `PATCH /api/objectives/{id}`; interceptor de `X-Client-Date` (solo ±1 día respecto a la fecha UTC del servidor), que reutilizan las escrituras posteriores.
- **DoD específico:**
  - Tests escritos antes: título vacío → `400` y nada creado; `X-Client-Date` ausente o fuera de margen → `400 CLIENT_DATE_INVALID`; editar un objetivo de la otra usuaria → `404` sin cambiarlo (criterio 9).
  - Las dos operaciones se añaden a los tests de `401` y de aislamiento.

### E5-1.3 · Lista de objetivos con contadores en la API

- **Capa:** backend.
- **Origen:** RF-29 · [`openapi.yaml`](../../api/openapi.yaml) `listObjectives` · [modelo de datos](../../modelo-de-datos.md) §3.4, §7.3.
- **Entrega:** caso de uso `ListObjectives` y `GET /api/objectives`, con los tres contadores sobre todas las tareas vinculadas y sin filtro de periodo. Depende de la tabla `task` de E4-1.1.
- **DoD específico:**
  - Test de contrato escrito antes con el ejemplo del criterio 5 (3 tareas, 1 completada, 2 logros), preparado en el propio test.
  - Los contadores de una usuaria no cuentan tareas de la otra; la operación se añade a los tests de `401` y de aislamiento.

### E5-1.4 · Mensajes, carga y fecha del cliente

- **Capa:** frontend (componentes comunes y cliente HTTP).
- **Origen:** RF-5, RF-6, RNF-4 · [arquitectura](../../arquitectura.md) §6.1 (`ToastHost`, `LoadingState`, `LoadError`, `EmptyState`), §5.6.
- **Entrega:** el cliente HTTP añade `X-Client-Date` con la fecha local en cada escritura fuera de `/auth`; `ToastHost` para los mensajes de éxito y error; `LoadingState`, `LoadError` y `EmptyState`, que reutilizan las demás pestañas ([E1-2](../E1-acceso-y-marco-comun/us-mensajes-carga-y-pantallas-estrechas.md)).
- **DoD específico:**
  - Tests de Vitest escritos antes: con el navegador simulado en una zona distinta de UTC, la cabecera lleva la fecha local; un estado de carga nunca muestra el estado vacío.

### E5-1.5 · Pestaña Objetivos

- **Capa:** frontend.
- **Origen:** RF-27, RF-29, RF-31, RF-6 · [arquitectura](../../arquitectura.md) §6.1 (`ObjectiveList`, `ObjectiveCard`, `ObjectiveForm`) · [interfaz](../../modelo/interfaz.md).
- **Entrega:** pestaña Objetivos con "+ Nuevo objetivo", formulario de alta y edición (título, descripción y "Cómo se mide"), tarjetas con los tres contadores, estado vacío y mensajes de carga y de error; consulta de objetivos que reutiliza el selector del Diario (E2-1.7). La sección de archivados es de [E5-2](./us-archivar-restaurar-eliminar-objetivo.md).
- **DoD específico:**
  - Tests de componentes escritos antes, uno por criterio heredado.
  - Formulario usable solo con teclado; textos en español.
