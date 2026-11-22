---
name: backlog-mvp
description: Procedimiento para crear o actualizar el backlog del MVP (docs/backlog/backlog-mvp.md) a partir de la plantilla: historias por épica, bloqueos, matriz impacto/complejidad y orden priorizado. Úsalo al ordenar, priorizar o descomponer el trabajo del MVP.
user-invocable: false
---

# Backlog del MVP

Plantilla: `docs/templates/plantilla-backlog.md`. Destino: `docs/backlog/backlog-mvp.md`. Las historias viven en `docs/backlog/E<n>-<slug>/us-<slug>.md`, y es ahí donde están sus criterios de aceptación.

Lee siempre la plantilla con Read antes de redactar. No la reproduzca de memoria. Sigue su estructura: mismos apartados, mismo orden y mismos nombres de columnas e identificadores.

1. **Parte del alcance y del PRD.** Lee `docs/prd/alcance-mvp.md` y, si existe, `docs/prd/mvp.md`. Si el alcance no existe o no está cerrado, dilo y detente. El backlog no define alcance: ordena el ya acordado. Si algo del backlog lo contradice, prevalece el alcance: señala la contradicción y propón el cambio, sin modificar el alcance.
2. **Cobertura.** Cada funcionalidad must-have (F1–F5) debe estar cubierta por al menos una historia. Las should-have solo se incluyen si el alcance las contempla, y nunca antes que las must-have.
3. **Los criterios viven en las historias.** El backlog enlaza a cada historia y nunca repite sus criterios de aceptación. Si una historia enlazada no existe o no tiene criterios, dilo y propón escribirla antes de ordenarla; no inventes el contenido.
4. **Identificadores.** No inventes IDs. Si la herramienta de seguimiento aún no ha asignado uno, usa la etiqueta provisional `E<n>-<m>` y márcala como pendiente de ID. Los tickets derivan el ID de su historia (`<ID>.1`, `<ID>.2`…).
5. **Tickets.** Descompón en tickets solo las historias próximas de abordar. Un ticket es una unidad que una persona termina en una sesión, hereda los criterios de su historia, tiene un Definition of Done que describe cómo se entrega (pruebas, manejo de error, convenciones), nombra la capa que toca y no diseña. Si el README exige tickets más detallados (backend, frontend y base de datos), esos viven en el README y escribirlos es tarea de la propietaria (regla 1): ofrece borradores en el chat.
6. **Bloqueos.** Registra solo lo que condiciona a varias historias o que ninguna historia resuelve sola, y remite cada uno a su origen (restricción o punto abierto del PRD, alcance o historia). Lo que se pueda escribir como historia no es un bloqueo.
7. **Matriz impacto/complejidad.** Valora el impacto contra la propuesta de valor del PRD, no contra preferencias. Distingue complejidad de riesgo. Si una funcionalidad entra por decisión explícita aunque su impacto sea bajo, dilo en notas y en el cuadrante, para que no se disfrace de prioridad. Indica qué historias están valoradas con menos base.
8. **Orden.** Respeta prioridad de producto y dependencias, y deja claro que la dependencia manda sobre la épica. Comprueba que la matriz y el orden son coherentes: lo de alto impacto y baja complejidad va pronto, salvo dependencia o bloqueo explícito. Cierra con lo más rentable ahora mismo, aunque no sea un ticket.
9. **Cierre.** Aplica la lista de comprobación del final de la plantilla, elimina todos los bloques "Guía:" y los marcadores `<...>`, y comprueba que los enlaces relativos resuelven. Si el fichero de destino ya existe, propón cambios por apartado en lugar de sobrescribirlo, salvo petición explícita.
