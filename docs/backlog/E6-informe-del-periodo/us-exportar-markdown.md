# E6-5 · Llevarme el informe en Markdown

| Campo            | Valor                                                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| ID               | `E6-5` (etiqueta provisional, **pendiente de ID**)                                                                   |
| Épica            | E6 · Informe del periodo                                                                                             |
| Funcionalidad    | F5 · Informe del periodo y exportación Markdown (must-have)                                                          |
| Origen en el PRD | RF-37, RF-38, RF-39 · RNF-9, RNF-10 · P-1, P-2 (exportación), P-3                                                    |
| Depende de       | [E6-2](./us-logros-destacados.md), [E6-3](./us-fortalezas-por-competencia.md) y [E6-4](./us-detalle-por-objetivo.md) |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md))                                                                   |

## Historia

Como propietaria del diario, quiero revisar el informe completo en Markdown, copiarlo o descargarlo como fichero, y obtener siempre el mismo texto con los mismos datos, para llevarlo a la reunión de evaluación sin rehacerlo a mano.

## Criterios de aceptación

1. **Vista previa.** El informe ofrece una vista previa plegable con el informe completo en Markdown y las secciones en este orden: Resumen, Logros, Fortalezas y Detalle por objetivo, con la estructura del ejemplo de referencia [`docs/modelo/informe.md`](../../modelo/informe.md).
2. **Copiar.** El texto que copia "Copiar Markdown" es idéntico al de la vista previa, y se muestra un mensaje de éxito.
3. **Portapapeles rechazado.** Con el permiso de portapapeles denegado, la vista previa queda abierta y con todo su texto seleccionado para copiarlo a mano.
4. **Descargar.** Para el periodo 2026-01-01 a 2026-06-30, "Descargar .md" ofrece el fichero `informe-diario-2026-01-01_2026-06-30.md`, cuyo contenido es idéntico al de la vista previa. La descarga no pide ninguna confirmación propia.
5. **Determinista.** Un test genera dos veces el informe del mismo periodo sobre los datos semilla, en momentos distintos, y los dos ficheros son idénticos byte a byte. El Markdown no incluye la fecha ni la hora de generación.
6. **Flujo principal de extremo a extremo (P-1).** Un test E2E, con sesión iniciada, crea un objetivo, escribe una entrada con una tarea nueva vinculada a él, la cierra en una entrada posterior como `Completada` y marcada como logro, genera el informe de un periodo que incluye las dos fechas y descarga el `.md`. La tarea aparece en Logros, en el grupo de su objetivo en Detalle por objetivo y en los totales de completadas y de logros del resumen; si falta en cualquiera de los tres sitios, el test falla.
7. **No perder el principio del periodo (P-3).** Con datos semilla que cubren enero a junio de un año, con al menos un logro completado en enero con resultado, evidencias, objetivo y una competencia, y con hoy fijado en el test dentro de ese mismo año, el informe "Enero – junio" cumple las cuatro condiciones: el logro aparece en Logros, su tarjeta muestra su resultado y sus evidencias, aparece en el grupo de su objetivo y su competencia figura en Fortalezas con su ID.
8. **Idioma.** El Markdown exportado está en español.
9. **Privacidad.** El Markdown nunca contiene registros del segundo usuario de prueba.

## Notas

- Al cerrar esta historia queda operativo el flujo principal de extremo a extremo del alcance.
