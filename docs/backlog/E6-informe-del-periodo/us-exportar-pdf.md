# E6-6 · Llevarme el informe en PDF (S1, opcional)

| Campo            | Valor                                                       |
| ---------------- | ----------------------------------------------------------- |
| ID               | `E6-6` (etiqueta provisional, **pendiente de ID**)          |
| Épica            | E6 · Informe del periodo                                    |
| Funcionalidad    | S1 · Exportación del informe en PDF (should-have, opcional) |
| Origen en el PRD | RF-40                                                       |
| Depende de       | [E6-5](./us-exportar-markdown.md)                           |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md))          |

## Historia

Como propietaria del diario, quiero descargar el informe del periodo como PDF, para enviarlo o imprimirlo con un formato que se lea igual en cualquier sitio.

## Criterios de aceptación

1. **Fichero.** Para el periodo 2026-01-01 a 2026-06-30, "Descargar PDF" genera en el navegador el fichero `informe-diario-2026-01-01_2026-06-30.pdf`, en tamaño A4.
2. **Contenido.** El PDF lleva título y periodo, y contiene las cuatro secciones del Markdown (Resumen, Logros, Fortalezas y Detalle por objetivo) en el mismo orden.
3. **Páginas numeradas.** Cada página lleva su número.
4. **Sin confirmación propia.** La descarga no pide ninguna confirmación propia; solo muestra el mensaje de éxito o de error.

## Notas

- Es una should-have: no es condición para cerrar el MVP y va después de todas las must-have en el orden del backlog.
