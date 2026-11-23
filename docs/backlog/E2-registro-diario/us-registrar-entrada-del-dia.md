# E2-1 · Registrar el trabajo del día desde un solo formulario

| Campo            | Valor                                                                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ID               | `E2-1` (etiqueta provisional, **pendiente de ID**)                                                                                                                                   |
| Épica            | E2 · Registro diario                                                                                                                                                                 |
| Funcionalidad    | F1 · Registro diario de entradas (must-have)                                                                                                                                         |
| Origen en el PRD | RF-7, RF-8, RF-9 (selector de tarea), RF-11, RF-15 · RNF-1, RNF-2, RNF-4, RNF-5, RNF-11 · P-5                                                                                        |
| Depende de       | [E1-1](../E1-acceso-y-marco-comun/us-iniciar-y-cerrar-sesion.md), [E5-1](../E5-objetivos/us-crear-y-editar-objetivos.md) y [E4-1](../E4-seguimiento-de-tareas/us-lista-de-tareas.md) |
| Tickets          | 8 (ver [Tickets](#tickets))                                                                                                                                                          |

## Historia

Como propietaria del diario, quiero anotar al final de la jornada las tareas que he trabajado, con una nota y el estado en que quedan, creando sobre la marcha la tarea o el objetivo que me falte, para registrar el día mientras lo tengo fresco sin salir de la pestaña Diario.

## Criterios de aceptación

1. **Formulario de partida.** Al abrir Diario, la fecha del editor es la fecha local del navegador y hay un solo elemento. Con un elemento no aparece "Quitar"; tras pulsar "+ Añadir otra tarea" hay dos elementos y los dos muestran "Quitar".
2. **Nada con fecha futura.** Con hoy = 2026-11-22, guardar una entrada con fecha 2026-11-23 se rechaza con un mensaje que empieza por "No se pudo guardar" y no guarda nada; con fecha 2026-11-22 se guarda.
3. **Lo único obligatorio.** Los únicos datos obligatorios son la fecha y, en cada elemento, la tarea: una existente, o "Nueva tarea…" con título. Un elemento sin nota es válido. Guardar con un elemento sin tarea, o con "Nueva tarea…" sin título, se rechaza con un mensaje de error y no guarda nada de la entrada.
4. **Estado y logro.** Cada elemento permite elegir el estado de la tarea tras ese día (`En curso`, `En pausa`, `Completada`) y activar la marca de logro. El estado propuesto es `En curso` en una tarea nueva y el estado actual en una existente.
5. **Detalles de la tarea.** La sección plegable "Detalles de la tarea" está abierta por defecto en una tarea nueva y cerrada en una existente, y permite asignar el objetivo, completar competencias, resultado o impacto y evidencias.
6. **Objetivo nuevo sin salir del Diario.** Elegir "+ Nuevo objetivo…" en el selector de objetivo muestra un campo para su título; al guardar la entrada, el objetivo queda creado solo con título, asignado a la tarea del elemento y disponible en el selector de objetivo de los demás elementos.
7. **Selector de tarea.** El selector de tarea agrupa las tareas existentes en "En curso y en pausa" y "Completadas".
8. **ID de tarea nuevos.** Con T-001 a T-004 creadas, la siguiente tarea nueva recibe T-005. Cada usuaria tiene su propia secuencia. Dos creaciones simultáneas desde dos pestañas producen dos ID distintos; si hay conflicto, la operación falla y se reintenta, y nunca se guardan dos tareas con el mismo ID.
9. **Una tarea, una vez por entrada.** Guardar una entrada con dos elementos que eligen T-001 se rechaza con un mensaje de error que identifica T-001, y no se guarda nada.
10. **El elemento actualiza la tarea.** Cuando la entrada guardada es la más reciente que menciona la tarea, el estado, la marca de logro y los detalles del elemento pasan a la tarea. Si el estado es `Completada`, la fecha de finalización es la fecha de la entrada, no la de hoy: T-009 marcada `Completada` en una entrada del 2026-06-03 guardada el 2026-06-10 queda con fecha de finalización 2026-06-03. Si el estado no es `Completada`, la tarea no tiene fecha de finalización.
11. **Confirmación y fallo.** Con la instalación local y los datos semilla, tras guardar se muestra "Entrada guardada" en 1 s como máximo. Si el guardado falla, se muestra un mensaje que empieza por "No se pudo guardar", no queda guardado ningún elemento de la entrada (un test fuerza el fallo con tres elementos) y el formulario conserva lo escrito para reintentar.
12. **Cero cambios de pestaña.** Un test E2E, en una fecha sin entrada, registra una entrada con una tarea nueva vinculada a un objetivo nuevo y otra tarea existente marcada `Completada`, y verifica 0 cambios de pestaña (P-5).
13. **Solo con teclado.** El registro de una entrada completa, incluido guardarla, se puede hacer solo con teclado.
14. **Fecha local.** Con el navegador en una zona horaria distinta de UTC, una entrada guardada a las 23:30 locales queda en la fecha local de ese día.
15. **Privacidad.** Las operaciones de esta historia exigen sesión y solo leen y escriben registros de la usuaria autenticada; se añaden a los tests de los criterios 6 y 7 de [E1-1](../E1-acceso-y-marco-comun/us-iniciar-y-cerrar-sesion.md).

## Fuera de esta historia

- Guardar en una fecha que ya tiene entrada: [E2-2](./us-fusionar-entrada-misma-fecha.md).
- La protección de los estados y datos fijados por entradas posteriores al rellenar fechas pasadas: [E2-3](./us-rellenar-fechas-pasadas.md).
- Las sugerencias de competencias y los tests de su normalización: [E2-4](./us-competencias-normalizadas.md).
- Editar y eliminar una entrada: [E2-5](./us-editar-y-eliminar-entrada.md).
- Ocultar los objetivos archivados en el selector: [E5-2](../E5-objetivos/us-archivar-restaurar-eliminar-objetivo.md).
- Ver lo guardado en el listado: [E3-1](../E3-historial-cronologico/us-ver-historial-por-mes.md).

## Notas

- Hasta que [E2-3](./us-rellenar-fechas-pasadas.md) esté hecha, el criterio 10 solo se prueba con entradas en fechas crecientes; guardar una fecha anterior a otra que ya menciona la tarea no está protegido todavía.
- Es la historia clave del backlog: JTBD-1 sostiene a todos los demás trabajos (PRD, sección 2).
- **Decisión tomada (propietaria):** E2-1 incluye la normalización mínima de competencias (`SkillNormalizer`), porque el esquema exige la clave `name_key` desde el primer guardado. Las sugerencias y los tests de los criterios 2 y 3 de [E2-4](./us-competencias-normalizadas.md) siguen en E2-4.
- **Decisión tomada (propietaria):** las listas de tareas y de objetivos que usan los selectores las construyen [E4-1](../E4-seguimiento-de-tareas/us-lista-de-tareas.md) y [E5-1](../E5-objetivos/us-crear-y-editar-objetivos.md), que van antes en el orden. Esta historia no las adelanta.

## Tickets

IDs provisionales `E2-1.<n>`, **pendientes de ID** como su historia. Cada ticket hereda los criterios que indica y cumple, además de lo suyo, el Definition of Done común del [backlog](../backlog-mvp.md#por-qué-solo-algunas-traen-tickets). Las referencias de diseño apuntan a documentos ya aprobados: el ticket no las rediseña.

Esta historia carga con la base de los tests E2E (P-5). Las tablas que escribe (`objective`, `task`, `skill`, `task_skill`, `entry` y `entry_item`) ya existen: las crean [E5-1.1](../E5-objetivos/us-crear-y-editar-objetivos.md#e5-11--tabla-de-objetivos) y [E4-1.1](../E4-seguimiento-de-tareas/us-lista-de-tareas.md#e4-11--tablas-de-tareas-competencias-y-entradas). Hasta que [E2-2](./us-fusionar-entrada-misma-fecha.md) esté hecha, sus tests solo guardan en fechas sin entrada.

| Ticket                                                           | Capa          | Hereda (criterios)                    | Depende de     | Talla | Riesgo |
| ---------------------------------------------------------------- | ------------- | ------------------------------------- | -------------- | ----- | ------ |
| [E2-1.1](#e2-11--secuencia-de-id-de-tarea)                       | Base de datos | 8                                     | E4-1.1         | S     | Medio  |
| [E2-1.2](#e2-12--reglas-de-dominio-del-registro)                 | Backend       | 2, 3, 9, 10                           | E4-1.2         | M     | Alto   |
| [E2-1.3](#e2-13--persistencia-transaccional-y-secuencia-de-id)   | Backend       | 8, 11 (todo o nada)                   | E2-1.1, E2-1.2 | L     | Alto   |
| [E2-1.4](#e2-14--guardar-la-entrada-del-día-en-la-api)           | Backend       | 2, 3, 6, 8, 9, 11, 14 y 15 (servidor) | E2-1.3, E5-1.2 | L     | Alto   |
| [E2-1.5](#e2-15--estado-del-formulario-y-guardado-en-el-cliente) | Frontend      | 1, 14; 2, 3, 9 y 11 (mensajes)        | E2-1.4, E5-1.4 | M     | Medio  |
| [E2-1.6](#e2-16--editor-fecha-y-elementos)                       | Frontend      | 1, 3, 4, 7, 11 y 13 (interfaz)        | E2-1.5, E4-1.3 | L     | Medio  |
| [E2-1.7](#e2-17--detalles-de-la-tarea-y-objetivo-nuevo)          | Frontend      | 5, 6                                  | E2-1.6, E5-1.5 | M     | Medio  |
| [E2-1.8](#e2-18--base-e2e-y-registro-sin-salir-del-diario)       | E2E           | 11 (1 s), 12, 13, 14                  | E2-1.7         | M     | Medio  |

### E2-1.1 · Secuencia de ID de tarea

- **Capa:** base de datos.
- **Origen:** RF-15 · D-5 · [modelo de datos](../../modelo-de-datos.md) §3.3, §5, §9.
- **Entrega:** migración `add_task_code_sequence` con la tabla `task_code_sequence` y su `CHECK`; el _seed_ añade la fila de cada usuaria con `last_number` igual al mayor número de tarea sembrado (`GREATEST`, nunca baja).
- **DoD específico:**
  - Tests escritos antes: `last_number` negativo se rechaza; ejecutar el _seed_ dos veces no duplica filas ni baja `last_number`.

### E2-1.2 · Reglas de dominio del registro

- **Capa:** backend (dominio y `packages/shared`).
- **Origen:** RF-7, RF-8, RF-11, RF-12 (solo la entrada más reciente), RF-13 (normalización mínima), RF-24 · [arquitectura](../../arquitectura.md) §5.3, §7.
- **Entrega:** esquema zod de `SaveEntryRequest` en `packages/shared`; entidad `Task` con la invariante "fecha de finalización si y solo si `Completada`"; validaciones de fecha no posterior a hoy, tarea obligatoria y tarea no repetida (el error identifica el ID); aplicación del elemento a la tarea cuando la entrada es la más reciente que la menciona; `SkillNormalizer` con la normalización mínima que exige `name_key` (decisión tomada; ver Notas). Reutiliza `CalendarDate`, `TaskStatus` y `TaskCode`, que ya existen ([E5-1.2](../E5-objetivos/us-crear-y-editar-objetivos.md#e5-12--alta-y-edición-de-objetivos-en-la-api) y [E4-1.2](../E4-seguimiento-de-tareas/us-lista-de-tareas.md#e4-12--lista-de-tareas-en-la-api)).
- **DoD específico:**
  - Tests unitarios escritos antes con los ejemplos de la historia: 2026-11-23 rechazada y 2026-11-22 aceptada con hoy = 2026-11-22; T-001 repetida; T-009 `Completada` en la entrada del 2026-06-03 guardada el 2026-06-10 queda con fecha de finalización 2026-06-03.
  - Sin dependencias de Nest, Prisma ni del reloj: "hoy" llega siempre como parámetro.

### E2-1.3 · Persistencia transaccional y secuencia de ID

- **Capa:** backend (infraestructura).
- **Origen:** RF-15, RNF-5 · D-5 · [modelo de datos](../../modelo-de-datos.md) §3.3, §6, §7.1.
- **Entrega:** `PrismaUnitOfWork`; `PrismaTaskCodeSequence` con el incremento atómico por usuaria; la parte de escritura de los repositorios de entradas, tareas, objetivos y competencias, todos con `userId` obligatorio; **hasta 2 reintentos** de la transacción cuando salta la unicidad del número de tarea; si el último también falla, error de conflicto (`409 TASK_CODE_CONFLICT`).
- **DoD específico:**
  - Tests de integración contra PostgreSQL real escritos antes: dos creaciones simultáneas reciben números distintos; cada usuaria tiene su propia secuencia; un fallo forzado en el tercer elemento no deja nada guardado ni consume número; con el conflicto forzado en todos los intentos, la operación se intenta 3 veces (la original y 2 reintentos) y termina en conflicto sin guardar nada.
  - El SQL crudo va siempre parametrizado, nunca con interpolación de cadenas (OWASP A03).

### E2-1.4 · Guardar la entrada del día en la API

- **Capa:** backend (aplicación e interfaz).
- **Origen:** RF-7, RF-8, RF-11, RF-15, RNF-5 · D-3 · [`openapi.yaml`](../../api/openapi.yaml) `saveDailyEntry` · [arquitectura](../../arquitectura.md) §5.4, §5.6.
- **Entrega:** caso de uso `SaveDailyEntry` en una sola transacción (objetivos y tareas nuevos, entrada y elementos); `PUT /api/entries/{date}` con validación zod y con el interceptor de `X-Client-Date` que ya existe desde E5-1.2; traducción de errores a `400`, `404`, `409` y `422` con los códigos del contrato. El guardado en una fecha que ya tiene entrada queda fuera: lo cierra [E2-2](./us-fusionar-entrada-misma-fecha.md), sin error temporal (el contrato define la fusión). E2-1 y E2-2 se entregan juntas: E2-1 no se integra en `main` sin E2-2.
- **DoD específico:**
  - Tests de contrato escritos antes, uno por criterio heredado, incluido el ejemplo de petición y respuesta del contrato.
  - La operación se añade al test de `401` y al de aislamiento de [E1-1](../E1-acceso-y-marco-comun/us-iniciar-y-cerrar-sesion.md): referenciar una tarea o un objetivo de la otra usuaria responde `404` y no guarda nada.

### E2-1.5 · Estado del formulario y guardado en el cliente

- **Capa:** frontend (lógica pura y estado de servidor).
- **Origen:** RF-5, RF-7, RNF-4, RNF-5 · D-3, D-7 · [arquitectura](../../arquitectura.md) §6.2.
- **Entrega:** funciones puras del formulario (estado inicial con la fecha local y un elemento, añadir y quitar elementos, conversión a `SaveEntryRequest`); mutación de guardado que envía `X-Client-Date` (lo añade el cliente HTTP desde E5-1.4), invalida las consultas de entradas, tareas, objetivos y resumen, y traduce cada código de error a su mensaje en español sin perder lo escrito. Las reglas las decide el servidor; el cliente no las replica.
- **DoD específico:**
  - Tests de Vitest escritos antes, sin montar el DOM: con el navegador simulado en una zona distinta de UTC a las 23:30, la fecha propuesta y la enviada son las locales; un fallo del guardado conserva el formulario.

### E2-1.6 · Editor: fecha y elementos

- **Capa:** frontend.
- **Origen:** RF-5, RF-7, RF-8, RF-9, RNF-1, RNF-11 · [arquitectura](../../arquitectura.md) §6.1 (`EntryEditor`) · [interfaz](../../modelo/interfaz.md).
- **Entrega:** editor de la pestaña Diario con selector de fecha (máximo hoy), elementos con "+ Añadir otra tarea" y "Quitar", selector de tarea agrupado con "Nueva tarea…" (a partir de la consulta de tareas de [E4-1.3](../E4-seguimiento-de-tareas/us-lista-de-tareas.md#e4-13--pestaña-tareas)), nota, estado y marca de logro; mensajes "Entrada guardada" y "No se pudo guardar…" con el `ToastHost` de E5-1.4.
- **DoD específico:**
  - Tests de componentes escritos antes, uno por criterio heredado.
  - Todo el formulario se recorre y se guarda solo con teclado, con etiquetas accesibles.

### E2-1.7 · Detalles de la tarea y objetivo nuevo

- **Capa:** frontend.
- **Origen:** RF-8, RF-9 · [interfaz](../../modelo/interfaz.md).
- **Entrega:** sección plegable "Detalles de la tarea" (abierta en tarea nueva, cerrada en existente) con objetivo (a partir de la consulta de objetivos de [E5-1.5](../E5-objetivos/us-crear-y-editar-objetivos.md#e5-15--pestaña-objetivos)), competencias, resultado o impacto y evidencias; "+ Nuevo objetivo…" con campo de título. Las sugerencias de competencias quedan para [E2-4](./us-competencias-normalizadas.md) y ocultar archivados, para [E5-2](../E5-objetivos/us-archivar-restaurar-eliminar-objetivo.md).
- **DoD específico:**
  - Tests de componentes escritos antes para los criterios 5 y 6, incluido que, tras guardar, el objetivo nuevo aparece en el selector de los demás elementos.

### E2-1.8 · Base E2E y registro sin salir del Diario

- **Capa:** E2E (frontend, backend y base de datos).
- **Origen:** P-5, RNF-1, RNF-2, RNF-4, RNF-11 · [arquitectura](../../arquitectura.md) §9.
- **Entrega:** Playwright contra el entorno de `docker compose` con los datos semilla; test del criterio 12 (0 cambios de pestaña); recorrido solo con teclado; zona horaria del navegador distinta de UTC; confirmación en 1 s como máximo.
- **DoD específico:**
  - El test se escribe antes de unir las piezas y se ve fallar; pasa de forma estable en ejecuciones repetidas.
  - Las credenciales salen de variables de entorno; el comando para ejecutar los E2E queda documentado para el README (RNF-12).
