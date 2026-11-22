# E6-1 · Elegir el periodo y ver su resumen

| Campo            | Valor                                                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| ID               | `E6-1` (etiqueta provisional, **pendiente de ID**)                                                                   |
| Épica            | E6 · Informe del periodo                                                                                             |
| Funcionalidad    | F5 · Informe del periodo y exportación Markdown (must-have)                                                          |
| Origen en el PRD | RF-32, RF-33 · RNF-2, RNF-3, RNF-4, RNF-11 · P-2 (totales)                                                           |
| Depende de       | [E2-3](../E2-registro-diario/us-rellenar-fechas-pasadas.md) y [E5-1](../E5-objetivos/us-crear-y-editar-objetivos.md) |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md))                                                                   |

## Historia

Como propietaria del diario, quiero elegir el periodo de mi evaluación y ver cuántas entradas, tareas trabajadas, tareas completadas y logros tiene, para comprobar de entrada que el informe cubre el semestre que voy a presentar.

## Criterios de aceptación

1. **Cuatro opciones.** La pestaña Informe ofrece "Últimos 6 meses" (seleccionada por defecto), "Enero – junio" y "Julio – diciembre" del año actual, y "Personalizado".
2. **Semestres del año actual.** Con hoy = 2026-11-22, "Enero – junio" usa 2026-01-01 a 2026-06-30 y "Julio – diciembre" usa 2026-07-01 a 2026-12-31.
3. **Últimos 6 meses.** El primer día es el mismo día del mes, seis meses de calendario antes de hoy, o el último día de ese mes si ese día no existe; el último es hoy. Con hoy = 2026-11-22: 2026-05-22 a 2026-11-22. Con hoy = 2026-08-31: 2026-02-28 a 2026-08-31. Con hoy = 2028-08-31: 2028-02-29 a 2028-08-31. Con hoy = 2027-02-15: 2026-08-15 a 2027-02-15.
4. **Personalizado, con fechas invertidas.** Un rango de 2026-06-30 a 2026-01-01 se trata como 2026-01-01 a 2026-06-30, y una entrada del 2026-06-30 cuenta en él: los extremos son inclusivos.
5. **Personalizado, con fechas vacías.** En "Personalizado", ninguna de las dos fechas tiene valor por defecto. Con "desde" = 2026-01-01 y "hasta" vacía, el informe no se genera (ni resumen, ni secciones, ni vista previa, ni nada que copiar o descargar) y se muestra "Indica la fecha «hasta» para generar el informe". Con "desde" vacía y "hasta" = 2026-06-30, el mensaje es "Indica la fecha «desde» para generar el informe". Con las dos vacías, "Indica las fechas «desde» y «hasta» para generar el informe". La fecha que falta nunca se rellena con hoy ni con otro valor; al completarla, el informe se genera con el rango indicado.
6. **Franja de resumen.** El informe muestra cuatro totales del periodo: entradas, tareas trabajadas (las que menciona al menos una entrada del rango), tareas completadas en el periodo (fecha de finalización dentro del rango) y logros (tareas con marca de logro y fecha de finalización dentro del rango).
7. **Completada sin entradas en el rango.** Una tarea con fecha de finalización en el periodo cuenta como completada aunque ninguna entrada del rango la mencione.
8. **Logro sin completar.** Una tarea con marca de logro trabajada en el periodo pero sin fecha de finalización dentro del rango (por ejemplo, `En curso`) no suma en el total de logros.
9. **Fidelidad.** Sobre los datos semilla, los cuatro totales de un periodo fijo coinciden exactamente con un recuento independiente preparado a mano (P-2).
10. **Fecha local.** Con el navegador en una zona horaria distinta de UTC, una entrada guardada a las 23:30 locales aparece en un informe cuyo "hasta" es esa fecha.
11. **Tiempo de respuesta.** En instalación local, con un volumen de 300 entradas y 600 tareas, generar el informe de un periodo de 6 meses tarda como máximo 2 s.
12. **Solo con teclado.** Elegir el periodo y generar el informe se puede hacer solo con teclado.
13. **Privacidad.** Los totales solo cuentan registros de la usuaria autenticada: los del segundo usuario de prueba no suman.

## Fuera de esta historia

- Las secciones Logros destacados, Fortalezas y Detalle por objetivo: [E6-2](./us-logros-destacados.md), [E6-3](./us-fortalezas-por-competencia.md) y [E6-4](./us-detalle-por-objetivo.md).
- Vista previa, copia y descarga: [E6-5](./us-exportar-markdown.md).
