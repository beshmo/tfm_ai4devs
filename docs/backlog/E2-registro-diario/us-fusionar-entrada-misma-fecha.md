# E2-2 · Volver a guardar en un día que ya tiene entrada

| Campo            | Valor                                              |
| ---------------- | -------------------------------------------------- |
| ID               | `E2-2` (etiqueta provisional, **pendiente de ID**) |
| Épica            | E2 · Registro diario                               |
| Funcionalidad    | F1 · Registro diario de entradas (must-have)       |
| Origen en el PRD | RF-10, RF-11 · RNF-6                               |
| Depende de       | [E2-1](./us-registrar-entrada-del-dia.md)          |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md)) |

## Historia

Como propietaria del diario, quiero que lo que guardo en un día que ya tiene entrada se sume a esa entrada, para poder anotar el día en varios ratos sin duplicar el día ni perder lo que ya había escrito.

## Criterios de aceptación

1. **Una sola entrada por fecha.** Existe una entrada del 2026-03-10 con T-001. Cuando guardo desde el editor una entrada nueva del 2026-03-10 con T-002, queda una sola entrada del 2026-03-10 con dos elementos, T-001 y T-002, en ese orden.
2. **La misma tarea se fusiona, no se repite.** Existe una entrada del 2026-03-10 con T-001 (nota "Revisión del esquema", `En curso`). Cuando guardo una entrada nueva del 2026-03-10 con T-001 (nota "Migración aplicada", `Completada`), queda una sola entrada del 2026-03-10 con un solo elemento de T-001, cuya nota es "Revisión del esquema", una línea en blanco y "Migración aplicada", y cuyo estado es `Completada`.
3. **Notas vacías.** Si la nota existente o la nueva está vacía, el elemento fusionado conserva la otra, sin separador.
4. **Sin avisos propios.** La fusión no se rechaza ni muestra ningún aviso propio: solo "Entrada guardada", o el mensaje de error si el guardado falla.
5. **Efecto sobre la tarea.** En el caso del criterio 2, si ninguna entrada posterior al 2026-03-10 menciona T-001, T-001 pasa a `Completada` con fecha de finalización 2026-03-10.
6. **La regla de repetición mira el formulario.** La comprobación de "una tarea, una vez por entrada" se aplica a los elementos del formulario que se guarda, no a la fusión: guardar un formulario con T-001 una vez en una fecha cuya entrada ya tiene T-001 no se rechaza (criterio 2); un formulario con T-001 dos veces sí se rechaza.
7. **Todo o nada.** Si el guardado de la fusión falla, la entrada existente queda como estaba y no se añade ningún elemento.
8. **Privacidad.** La fusión solo se hace con una entrada de la usuaria autenticada: si el segundo usuario de prueba tiene una entrada del 2026-03-10, guardar el 2026-03-10 crea o fusiona la entrada de la usuaria y no toca la del otro.

## Fuera de esta historia

- Qué pasa con la tarea si una entrada posterior a la fecha fusionada ya la menciona: [E2-3](./us-rellenar-fechas-pasadas.md), criterio 7.
