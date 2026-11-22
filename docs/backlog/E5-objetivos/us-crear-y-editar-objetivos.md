# E5-1 · Definir mis objetivos y ver cómo avanzan

| Campo            | Valor                                                            |
| ---------------- | ---------------------------------------------------------------- |
| ID               | `E5-1` (etiqueta provisional, **pendiente de ID**)               |
| Épica            | E5 · Objetivos                                                   |
| Funcionalidad    | F4 · Gestión de objetivos (must-have)                            |
| Origen en el PRD | RF-27, RF-28 (edición), RF-29, RF-31 · RF-6 (carga en Objetivos) |
| Depende de       | [E2-1](../E2-registro-diario/us-registrar-entrada-del-dia.md)    |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md))               |

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
