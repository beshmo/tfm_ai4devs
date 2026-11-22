---
name: prd-mvp
description: Procedimiento para crear o actualizar el PRD del MVP (docs/prd/mvp.md) a partir de la plantilla, subordinado al documento de alcance. Úsalo al redactar, rehacer o revisar el PRD.
user-invocable: false
---

# PRD del MVP

Plantilla: `docs/templates/plantilla-mvp.md`. Destino: `docs/prd/mvp.md`.

1. **Parte del alcance.** Lee `docs/prd/alcance-mvp.md` antes de empezar. Si no existe o no está cerrado, dilo y detente. El PRD no define alcance: lo desarrolla. Si el alcance y el PRD se contradicen, prevalece el alcance. No lo modifiques para que encaje el PRD: señala la contradicción, propón el cambio y espera a que la propietaria lo apruebe.
2. **Sin diseño técnico.** Ni modelo de datos, ni arquitectura, ni endpoints, ni elección de stack. Si una restricción técnica ya está decidida, regístrala solo como restricción (sección 8).
3. **Trazabilidad.** Cada funcionalidad must-have (F1–F5) debe caer en una épica y tener al menos un requisito funcional con criterio de aceptación. Cada JTBD debe reflejarse en algún requisito o métrica. Rellena la tabla de trazabilidad opcional.
4. **Criterios que puedan suspender.** Sustituye cada adjetivo ("rápido", "razonable", "evidente") por un umbral o un protocolo de comprobación. Marca con `[SUPUESTO]` cualquier umbral o decisión no validada. No inventes cifras que no te hayan dado.
5. **Honestidad en la validación.** No presentes como validado nada que no haya sido usado por personas reales. En métricas, distingue lo medible de lo "no medible en este MVP", sin poner sustitutos de adorno. Indica el contexto de validación (caso de estudio o usuarios reales) en la sección 1.
6. **Puntos abiertos.** Registra las decisiones pendientes y los conflictos entre apartados con el formato de la plantilla (nombre del conflicto y "para decidirlo hace falta"). No reabras el alcance desde esa sección.
7. **Cierre.** Aplica la lista de comprobación del final, elimina todos los bloques "Guía:" y los marcadores `<...>`, y comunica el resultado. Si el fichero de destino ya existe, propón cambios por apartado en lugar de sobrescribirlo, salvo petición explícita.
