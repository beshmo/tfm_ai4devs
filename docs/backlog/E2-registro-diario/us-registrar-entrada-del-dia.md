# E2-1 · Registrar el trabajo del día desde un solo formulario

| Campo            | Valor                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------- |
| ID               | `E2-1` (etiqueta provisional, **pendiente de ID**)                                            |
| Épica            | E2 · Registro diario                                                                          |
| Funcionalidad    | F1 · Registro diario de entradas (must-have)                                                  |
| Origen en el PRD | RF-7, RF-8, RF-9 (selector de tarea), RF-11, RF-15 · RNF-1, RNF-2, RNF-4, RNF-5, RNF-11 · P-5 |
| Depende de       | [E1-1](../E1-acceso-y-marco-comun/us-iniciar-y-cerrar-sesion.md)                              |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md))                                            |

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
- La normalización y las sugerencias de competencias: [E2-4](./us-competencias-normalizadas.md).
- Editar y eliminar una entrada: [E2-5](./us-editar-y-eliminar-entrada.md).
- Ocultar los objetivos archivados en el selector: [E5-2](../E5-objetivos/us-archivar-restaurar-eliminar-objetivo.md).
- Ver lo guardado en el listado: [E3-1](../E3-historial-cronologico/us-ver-historial-por-mes.md).

## Notas

- Hasta que [E2-3](./us-rellenar-fechas-pasadas.md) esté hecha, el criterio 10 solo se prueba con entradas en fechas crecientes; guardar una fecha anterior a otra que ya menciona la tarea no está protegido todavía.
- Es la historia clave del backlog: JTBD-1 sostiene a todos los demás trabajos (PRD, sección 2).
