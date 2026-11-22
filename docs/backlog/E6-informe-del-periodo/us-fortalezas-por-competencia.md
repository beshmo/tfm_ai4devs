# E6-3 · Ver en qué competencias me apoyé más

| Campo            | Valor                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| ID               | `E6-3` (etiqueta provisional, **pendiente de ID**)                                                |
| Épica            | E6 · Informe del periodo                                                                          |
| Funcionalidad    | F5 · Informe del periodo y exportación Markdown (must-have)                                       |
| Origen en el PRD | RF-35 · P-2 (orden de las fortalezas)                                                             |
| Depende de       | [E6-1](./us-periodo-y-resumen.md) y [E2-4](../E2-registro-diario/us-competencias-normalizadas.md) |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md))                                                |

## Historia

Como propietaria del diario, quiero que el informe ordene mis competencias por el número de tareas del periodo en que las usé, con los ID de esas tareas, para describir mis fortalezas con un recuento y no con impresiones.

## Criterios de aceptación

1. **Orden por tareas.** Las competencias se ordenan por el número de tareas trabajadas en el periodo que las usan, de mayor a menor.
2. **Primer desempate: entradas.** Con "SQL" en 4 tareas y 6 entradas y "Python" en 4 tareas y 9 entradas, "Python" va antes que "SQL".
3. **Segundo desempate: nombre.** Con "Redes" y "Docker" en 2 tareas y 3 entradas cada una, "Docker" va antes que "Redes".
4. **Entradas distintas, no elementos.** Con "Kubernetes" usada solo por T-017 y T-018, una entrada del 2026-03-10 que menciona T-017 y T-018 y otra del 2026-03-15 que menciona solo T-017, "Kubernetes" cuenta 2 tareas y 2 entradas, no 3.
5. **Las 15 primeras.** Con 20 competencias en el periodo, se muestran las 15 primeras del orden, cada una con una barra proporcional.
6. **Hasta 6 ID por competencia.** Los ID de cada competencia se ordenan de forma ascendente y se muestran los 6 primeros: una competencia usada en T-002, T-004, T-005, T-007, T-009, T-010, T-011, T-012 y T-013 muestra T-002, T-004, T-005, T-007, T-009 y T-010, en ese orden.
7. **Fidelidad.** Sobre los datos semilla, el orden de las fortalezas de un periodo fijo coincide con el esperado en el recuento independiente (P-2).
8. **Privacidad.** Las competencias y tareas del segundo usuario de prueba no cuentan ni aparecen.

## Notas

- Va después de [E2-4](../E2-registro-diario/us-competencias-normalizadas.md) porque, sin normalización, "Kubernetes" y "kubernetes" contarían como dos fortalezas distintas.
