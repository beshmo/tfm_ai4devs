# Backlog del MVP — E1 a E6: acceso y marco común, registro diario, historial, tareas, objetivos e informe

> **Origen:** [PRD del MVP](../prd/mvp.md) y [alcance del MVP](../prd/alcance-mvp.md).
> Los **criterios de aceptación viven en las historias**, en [`E1-acceso-y-marco-comun/`](./E1-acceso-y-marco-comun/), [`E2-registro-diario/`](./E2-registro-diario/), [`E3-historial-cronologico/`](./E3-historial-cronologico/), [`E4-seguimiento-de-tareas/`](./E4-seguimiento-de-tareas/), [`E5-objetivos/`](./E5-objetivos/) y [`E6-informe-del-periodo/`](./E6-informe-del-periodo/). Este archivo solo recoge lo que cruza historias: la matriz y el orden.

El PRD dice _qué_ debe hacer el producto; las historias dicen _cuándo se da por cumplido_; este backlog dice _en qué orden_ se construye y _qué lo bloquea_.

---

## ⚠️ Qué NO está aquí, y no es un fallo

Todo el trabajo de producto vive en este repositorio: no se usa ninguna herramienta de seguimiento externa, así que no hay issues ni subtareas que recrear. Lo único que no está en este backlog son los tres tickets detallados (backend, frontend y base de datos) que exige el README de la entrega: viven en el README y los redacta la propietaria.

---

## Las historias

23 historias cubren las épicas E1 a E6, **todas con criterios de aceptación escritos**. Ninguna está descompuesta todavía en tickets.

### E1 · Acceso, privacidad y marco común (requisitos transversales)

| Historia                                                                                                                                           | Qué resuelve                                                                                             | Tickets             |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------- |
| [**E1-1** — Entrar en mi diario privado y salir de él](./E1-acceso-y-marco-comun/us-iniciar-y-cerrar-sesion.md)                                    | Entro con mi cuenta, salgo o se me cierra la sesión sola, y nadie más ve ni toca mis registros           | — (sin descomponer) |
| [**E1-2** — Saber siempre qué está pasando, en cualquier pestaña y pantalla](./E1-acceso-y-marco-comun/us-mensajes-carga-y-pantallas-estrechas.md) | Todas las pestañas me confirman cada acción, me avisan al cargar o fallar y se usan en pantalla estrecha | — (sin descomponer) |
| [**E1-3** — Ver de un vistazo cuánto llevo registrado](./E1-acceso-y-marco-comun/us-resumen-en-cabecera.md)                                        | La cabecera me dice cuántas entradas, tareas y logros llevo, al día tras cada cambio                     | — (sin descomponer) |

### E2 · Registro diario (F1)

| Historia                                                                                                                  | Qué resuelve                                                                                                 | Tickets             |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------- |
| [**E2-1** — Registrar el trabajo del día desde un solo formulario](./E2-registro-diario/us-registrar-entrada-del-dia.md)  | Anoto el día con sus tareas, notas y estados, creando tareas y objetivos sobre la marcha sin salir de Diario | — (sin descomponer) |
| [**E2-2** — Volver a guardar en un día que ya tiene entrada](./E2-registro-diario/us-fusionar-entrada-misma-fecha.md)     | Puedo anotar el mismo día en varios ratos sin duplicarlo ni perder lo escrito                                | — (sin descomponer) |
| [**E2-3** — Rellenar un día olvidado sin estropear lo más reciente](./E2-registro-diario/us-rellenar-fechas-pasadas.md)   | Recupero días pasados y el estado y los datos fijados después se conservan                                   | — (sin descomponer) |
| [**E2-4** — Escribir competencias con sugerencias y sin duplicados](./E2-registro-diario/us-competencias-normalizadas.md) | Elijo competencias que ya uso y cada una cuenta una sola vez, la escriba como la escriba                     | — (sin descomponer) |
| [**E2-5** — Corregir o eliminar una entrada sin perder mis tareas](./E2-registro-diario/us-editar-y-eliminar-entrada.md)  | Arreglo o borro una entrada y el estado de sus tareas se recalcula con lo que queda                          | — (sin descomponer) |

### E3 · Historial cronológico (F2)

| Historia                                                                                                     | Qué resuelve                                                            | Tickets             |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ------------------- |
| [**E3-1** — Repasar lo que he registrado, mes a mes](./E3-historial-cronologico/us-ver-historial-por-mes.md) | Veo mis entradas de la más reciente a la más antigua, agrupadas por mes | — (sin descomponer) |
| [**E3-2** — Saltar del historial a la tarea](./E3-historial-cronologico/us-abrir-tarea-desde-historial.md)   | Desde un día concreto llego a la tarea desplegada con toda su historia  | — (sin descomponer) |

### E4 · Seguimiento de tareas (F3; incluye S2)

| Historia                                                                                                                          | Qué resuelve                                                                            | Tickets             |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------- |
| [**E4-1** — Ver todas mis tareas, con lo más reciente arriba](./E4-seguimiento-de-tareas/us-lista-de-tareas.md)                   | Sé de un vistazo en qué estado está cada tarea y cuándo la trabajé por última vez       | — (sin descomponer) |
| [**E4-2** — Ver la historia completa de una tarea](./E4-seguimiento-de-tareas/us-linea-de-tiempo-de-tarea.md)                     | Veo cada día que trabajé una tarea, lo que anoté y cuándo cambió de estado              | — (sin descomponer) |
| [**E4-3** — Completar y corregir una tarea sin escribir una entrada](./E4-seguimiento-de-tareas/us-editar-tarea-en-linea.md)      | Completo el resultado, las evidencias o el estado de una tarea sin inventar una entrada | — (sin descomponer) |
| [**E4-4** — Eliminar una tarea que no aparece en ninguna entrada](./E4-seguimiento-de-tareas/us-eliminar-tarea-sin-entradas.md)   | Limpio la lista sin poder romper el historial                                           | — (sin descomponer) |
| [**E4-5** — Encontrar una tarea por texto o por filtros (S2, opcional)](./E4-seguimiento-de-tareas/us-buscar-y-filtrar-tareas.md) | Doy con una tarea concreta sin recorrer toda la lista                                   | — (sin descomponer) |

### E5 · Objetivos (F4)

| Historia                                                                                                            | Qué resuelve                                                                                   | Tickets             |
| ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------- |
| [**E5-1** — Definir mis objetivos y ver cómo avanzan](./E5-objetivos/us-crear-y-editar-objetivos.md)                | Doy de alta y completo mis objetivos y veo cuántas tareas, completadas y logros tiene cada uno | — (sin descomponer) |
| [**E5-2** — Retirar un objetivo sin perder su historial](./E5-objetivos/us-archivar-restaurar-eliminar-objetivo.md) | Archivo lo que ya no uso, lo restauro si me equivoco y solo elimino lo que no tiene tareas     | — (sin descomponer) |

### E6 · Informe del periodo (F5; incluye S1)

| Historia                                                                                                           | Qué resuelve                                                                       | Tickets             |
| ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ------------------- |
| [**E6-1** — Elegir el periodo y ver su resumen](./E6-informe-del-periodo/us-periodo-y-resumen.md)                  | Elijo el semestre de mi evaluación y veo sus totales                               | — (sin descomponer) |
| [**E6-2** — Ver los logros que cerré en el periodo](./E6-informe-del-periodo/us-logros-destacados.md)              | Llevo a la reunión todos mis logros del periodo, con su resultado y sus evidencias | — (sin descomponer) |
| [**E6-3** — Ver en qué competencias me apoyé más](./E6-informe-del-periodo/us-fortalezas-por-competencia.md)       | Describo mis fortalezas con un recuento de tareas y no con impresiones             | — (sin descomponer) |
| [**E6-4** — Ver el trabajo del periodo agrupado por objetivo](./E6-informe-del-periodo/us-detalle-por-objetivo.md) | Demuestro el progreso de cada objetivo con las tareas que lo sostienen             | — (sin descomponer) |
| [**E6-5** — Llevarme el informe en Markdown](./E6-informe-del-periodo/us-exportar-markdown.md)                     | Copio o descargo el informe completo, siempre idéntico con los mismos datos        | — (sin descomponer) |
| [**E6-6** — Llevarme el informe en PDF (S1, opcional)](./E6-informe-del-periodo/us-exportar-pdf.md)                | Descargo el informe en un PDF A4 con páginas numeradas                             | — (sin descomponer) |

> **E2-1 es la historia clave y está sin descomponer.** El registro diario (JTBD-1) sostiene a todos los demás trabajos: sin él no hay historial, ni seguimiento, ni informe. No se descompone porque aún no hay stack tecnológico (R-3) y no se ha decidido qué historias se abordan primero en construcción. Antes de descomponerla hay que elegir el stack y confirmar el orden de abajo; con eso, E1-1, E2-1 y E3-1 son las primeras candidatas a descomponerse, porque juntas dan la primera funcionalidad de extremo a extremo que exige la Entrega 2.

**Cobertura del alcance.** F1 → E2-1 a E2-5 · F2 → E3-1, E3-2 y E2-5 (edición y eliminación desde el listado) · F3 → E4-1 a E4-4 · F4 → E5-1 y E5-2 · F5 → E6-1 a E6-5 · S1 → E6-6 · S2 → E4-5 · Requisitos transversales → E1-1 a E1-3, más un criterio de mensajes, carga o privacidad en cada historia que los necesita.

### Por qué solo algunas traen tickets

Porque **descomponer es planificación de entrega, no de producto**: se hace cuando el trabajo está próximo. Un ticket escrito con muchas historias de antelación caduca antes de que alguien lo abra, y da una falsa sensación de plan.

Ninguna historia está descompuesta todavía, porque no hay stack elegido (R-3), así que no se puede nombrar la capa que toca cada ticket, y porque no se ha decidido qué se aborda primero en construcción. Las historias llegan a la implementación **con sus criterios**, que es lo que hace falta para empezar: la regla de negocio la escribe producto, y el reparto por capas se decide al construir.

**Identificadores.** No hay herramienta de seguimiento ni ID asignados. Todas las historias conservan su etiqueta provisional (épica y número de historia, por ejemplo `E2-1`), **pendiente de ID**; por eso su archivo lleva nombre descriptivo y no ID. Cuando se asigne un ID a una historia, sus tickets lo heredarán con un sufijo (`.1`, `.2`…). No se inventan aquí.

**Qué es un ticket.** Una unidad de trabajo que una persona termina en una sesión de trabajo. **Hereda** los criterios de su historia; su Definition of Done es una checklist de _cómo entregamos_ (pruebas escritas antes del código según TDD, manejo de error, convenciones del repositorio), **no** criterios nuevos ni estimación en horas. Nombra la capa que toca; **no diseña**: tipo de columna, nulabilidad, índices, rutas y códigos de estado se deciden al implementar.

**Tallas.** S/M/L miden _dentro_ de ese techo, no en horas. Talla y riesgo van por separado. Aún no hay ningún ticket tallado.

**Tickets del README.** La entrega exige en el README tres tickets detallados (backend, frontend y base de datos) con el detalle suficiente para desarrollarlos de principio a fin. Esos tickets viven en el README, los escribe la propietaria y siguen su propia definición. Este backlog mantiene la versión ligera de ticket descrita arriba, y no mezcla las dos.

---

## Bloqueos transversales

Condicionan cuándo se puede cerrar el trabajo, y ninguno se resuelve dentro de la historia que lo sufre:

| Bloqueo                                                                                                  | Efecto                                                                                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Stack tecnológico sin elegir** (PRD, R-3)                                                              | Impide descomponer cualquier historia en tickets, porque un ticket nombra la capa que toca, y escribir el código de las 23. Su elección corresponde a la documentación técnica de la Entrega 1.                            |
| **Entrega 1 sin código** (PRD, R-1)                                                                      | Ninguna historia puede cerrarse antes de la Entrega 2. La Entrega 2 exige al menos una funcionalidad de extremo a extremo, lo que fija las primeras historias del orden; la Entrega 3 exige F1–F5 completas y no S1 ni S2. |
| **Suite de tests inexistente** (PRD, R-4)                                                                | Todas las historias tienen criterios que se cierran con tests (unitarios, integración y E2E), y hoy el comando de tests no ejecuta nada. Ninguna historia puede cerrarse sin esa base.                                     |
| **Datos semilla ficticios con dos usuarios y recuento independiente** (PRD, R-6, RF-3, P-2, P-3, RNF-12) | Condicionan E1-1 (aislamiento), E6-1, E6-3 y E6-5 (totales, orden de fortalezas, P-3) y la verificación por un revisor externo (P-4). Ninguna historia los resuelve sola: crecen con cada historia.                        |

> **Ya no son bloqueos, son trabajo.** Los doce puntos abiertos del PRD (PA-1 a PA-12) están resueltos e integrados en los requisitos, y de ahí en los criterios de las historias: la fusión de notas (PA-1) está en E2-2; el recálculo al eliminar (PA-2) en E2-5; la protección dato a dato (PA-3) en E2-3; "Últimos 6 meses" y las fechas obligatorias del rango personalizado (PA-4, PA-10) en E6-1; los desempates y los casos límite del informe (PA-5, PA-6, PA-7) en E4-1, E6-2, E6-3 y E6-4; los ID retirados (PA-10) en E4-4; el cierre y la caducidad de sesión (PA-11) en E1-1. También estaba sin definir si se puede cambiar la fecha al editar una entrada (RF-7, RF-14, RF-18); ya está resuelto (no se puede: solo se editan los elementos, RF-14) y el criterio 2 de [E2-5](./E2-registro-diario/us-editar-y-eliminar-entrada.md) lo recoge.

**Sobre los tests y los datos semilla, que tienen coste compartido:** la primera historia del orden, E1-1, carga con montar la base de pruebas unitarias y de integración, el control del reloj (caducidad de sesión) y los datos semilla con los dos usuarios. E2-1 carga con montar la base de los tests E2E (P-5). E6-1 carga con preparar a mano el recuento independiente de los datos semilla (P-2) que después reutilizan E6-3 y E6-5. Las demás historias solo añaden sus casos a esas bases.

---

## Matriz impacto / complejidad

**Impacto** = cuánto sirve a la promesa central del alcance (sección 3): _cada día se escribe una entrada con las tareas trabajadas, y con ese historial la aplicación genera el informe del periodo de evaluación y lo exporta para llevarlo a la reunión_ ("Lo que anotas cada día en un solo formulario se convierte, al final del semestre, en el informe de tu evaluación", PRD sección 3).
**Complejidad** = esfuerzo relativo de construcción, no riesgo.

> Ninguna historia está descompuesta ni tallada: todas se valoran solo a nivel de historia, con menos base. Las que tienen menos base son E2-3 (la regla dato a dato exige saber qué cambió cada entrada), E2-5 (recálculo con varios caminos de cambio de estado), E1-1 (depende de cómo resuelva la sesión el stack elegido) y E6-1 (aritmética de fechas, zona horaria y tiempo de respuesta).

| Historia                                        | Impacto | Complejidad | Notas                                                                                                                                                              |
| ----------------------------------------------- | ------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **E1-1** Entrar en mi diario privado            | Bajo    | Media       | No acerca la promesa por sí sola; entra por requisito transversal del alcance (privacidad) y habilita todo, porque toda operación exige sesión. Riesgo: seguridad. |
| **E1-2** Saber siempre qué está pasando         | Medio   | Media       | Entra por requisito transversal. Comprueba en las cuatro pestañas lo que cada historia ya exige y suma 360 px, tema y dos navegadores.                             |
| **E1-3** Ver cuánto llevo registrado            | Bajo    | Baja        | Entra por requisito transversal; refuerza que lo guardado ha contado.                                                                                              |
| **E2-1** Registrar el trabajo del día           | Alto    | Alta        | Es la mitad de la promesa: sin registro no hay informe. Formulario rico, creación en línea, ID atómicos y guardado todo o nada.                                    |
| **E2-2** Volver a guardar en un día con entrada | Alto    | Media       | Protege "una entrada por fecha", que se activa en cuanto se guarda dos veces el mismo día.                                                                         |
| **E2-3** Rellenar un día olvidado               | Alto    | Alta        | Sin ella, rellenar fechas pasadas corrompe los estados en los que se basa el informe. Mayor riesgo de integridad del backlog (S-2).                                |
| **E2-4** Competencias con sugerencias           | Medio   | Media       | No da valor visible por sí sola; habilita que las fortalezas (E6-3) cuenten bien cada competencia.                                                                 |
| **E2-5** Corregir o eliminar una entrada        | Medio   | Media       | Entra por decisión explícita del alcance (F1 y F2 incluyen editar y eliminar). El recálculo es de riesgo alto aunque la complejidad sea media.                     |
| **E3-1** Repasar lo registrado mes a mes        | Alto    | Baja        | Es la devolución inmediata del registro ("ver el trabajo ordenado", PRD sección 3), que sostiene el hábito diario.                                                 |
| **E3-2** Saltar del historial a la tarea        | Bajo    | Baja        | Atajo de navegación; la tarea ya se alcanza desde la lista de Tareas.                                                                                              |
| **E4-1** Ver todas mis tareas                   | Alto    | Baja        | Da "el estado de todas sus tareas al día", la otra devolución inmediata del registro.                                                                              |
| **E4-2** Ver la historia de una tarea           | Alto    | Media       | JTBD-3: la historia de cada tarea sin buscarla en otras herramientas.                                                                                              |
| **E4-3** Completar y corregir una tarea         | Medio   | Media       | Sirve para completar resultados antes de generar el informe, pero esos datos también se pueden poner desde el Diario.                                              |
| **E4-4** Eliminar una tarea sin entradas        | Bajo    | Baja        | Entra por decisión explícita del alcance (F3); protege el historial y los ID retirados.                                                                            |
| **E4-5** Buscar y filtrar tareas (S2)           | Bajo    | Media       | Should-have: F3 ya permite llegar a cualquier tarea. Entra por decisión del alcance, no por impacto.                                                               |
| **E5-1** Definir mis objetivos                  | Alto    | Baja        | Sin objetivos no hay Detalle por objetivo (JTBD-4); los contadores son recuentos directos.                                                                         |
| **E5-2** Retirar un objetivo                    | Medio   | Baja        | Mantiene los selectores limpios sin perder historial; entra por decisión explícita del alcance (F4).                                                               |
| **E6-1** Elegir el periodo y ver su resumen     | Alto    | Media       | Es la otra mitad de la promesa. Reglas de fechas y totales con semántica precisa.                                                                                  |
| **E6-2** Logros destacados                      | Alto    | Media       | Responde al problema de partida: que los logros de los primeros meses lleguen a la reunión.                                                                        |
| **E6-3** Fortalezas por competencia             | Alto    | Media       | Responde a "las fortalezas se describen con impresiones"; desempates y recuento de entradas distintas.                                                             |
| **E6-4** Detalle por objetivo                   | Alto    | Media       | Responde a "el progreso por objetivo no se puede demostrar"; varias reglas de orden y archivados.                                                                  |
| **E6-5** Informe en Markdown                    | Alto    | Media       | "Lo exporta para llevarlo a la reunión"; determinismo byte a byte y alternativa de portapapeles. Cierra el flujo principal.                                        |
| **E6-6** Informe en PDF (S1)                    | Bajo    | Media       | Should-have: el Markdown ya cubre llevar el informe a la reunión. Entra por decisión del alcance, no por impacto.                                                  |

**Lectura por cuadrantes**

- **Alto impacto / baja complejidad:** E3-1, E4-1 y E5-1. Lo más rentable del backlog.
- **Alto impacto / complejidad media o alta:** E2-1, E2-2, E2-3, E4-2, E6-1, E6-2, E6-3, E6-4 y E6-5. El núcleo del trabajo.
- **Bajo impacto / baja complejidad:** E1-3, E3-2 y E4-4, y, con impacto medio, E5-2. Relleno útil; E4-4 y E5-2 entran además por decisión explícita del alcance.
- **Bajo impacto / complejidad media o alta:** E1-1, que se justifica porque habilita todo y lo exige el alcance (privacidad); E1-2 (impacto medio), por requisito transversal; E2-4 (impacto medio), por lo que habilita en E6-3; E2-5 y E4-3 (impacto medio), por decisión explícita del alcance (F1, F2 y F3); E4-5 (S2) y E6-6 (S1), que son should-have decididas en el alcance y no una prioridad.

---

## Orden de backlog priorizado

Respeta a la vez prioridad de producto y dependencias. **La dependencia manda sobre la épica**: E1-1 va primero aunque su impacto directo sea bajo, porque toda operación exige sesión; E2-4 va antes que E6-3 aunque sea de otra épica, porque las fortalezas solo cuentan bien con competencias normalizadas; y E2-5 va después de E4-3, porque su test de "fecha de finalización solo en `Completada`" recorre también el cambio de estado desde Tareas.

| #   | Historia                                        | Motivo                                                                                                                                  |
| --- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **E1-1** Entrar en mi diario privado            | Dependencia de todas: toda operación exige sesión. Monta la base de tests y los datos semilla con dos usuarios.                         |
| 2   | **E2-1** Registrar el trabajo del día           | La historia clave; todo lo demás necesita entradas y tareas.                                                                            |
| 3   | **E3-1** Repasar lo registrado mes a mes        | Alto impacto y baja complejidad. Con E1-1 y E2-1 completa la primera funcionalidad de extremo a extremo (Entrega 2).                    |
| 4   | **E2-2** Volver a guardar en un día con entrada | Integridad: en cuanto se registra a diario, el mismo día se guarda dos veces.                                                           |
| 5   | **E5-1** Definir mis objetivos                  | Alto impacto y baja complejidad; el flujo principal empieza creando un objetivo.                                                        |
| 6   | **E4-1** Ver todas mis tareas                   | Alto impacto y baja complejidad; solo depende de E2-1.                                                                                  |
| 7   | **E2-3** Rellenar un día olvidado               | El informe solo es fiable si los estados lo son; va antes de cualquier sección del informe.                                             |
| 8   | **E6-1** Elegir el periodo y ver su resumen     | Abre el informe, la otra mitad de la promesa.                                                                                           |
| 9   | **E6-2** Logros destacados                      | Sección del flujo principal.                                                                                                            |
| 10  | **E6-4** Detalle por objetivo                   | Sección del flujo principal.                                                                                                            |
| 11  | **E2-4** Competencias con sugerencias           | Dependencia de E6-3, aunque sea de otra épica.                                                                                          |
| 12  | **E6-3** Fortalezas por competencia             | Última sección del informe; necesita E2-4.                                                                                              |
| 13  | **E6-5** Informe en Markdown                    | Cierra el flujo principal de extremo a extremo (P-1) y P-3.                                                                             |
| 14  | **E4-2** Ver la historia de una tarea           | Alto impacto; va tras el informe porque el flujo principal no la necesita.                                                              |
| 15  | **E3-2** Saltar del historial a la tarea        | Necesita E4-2; baja complejidad.                                                                                                        |
| 16  | **E4-3** Completar y corregir una tarea         | Necesita E4-2 y E2-4.                                                                                                                   |
| 17  | **E2-5** Corregir o eliminar una entrada        | Necesita E3-1 y E4-3; además está bloqueada por la decisión sobre el cambio de fecha.                                                   |
| 18  | **E5-2** Retirar un objetivo                    | Necesita E5-1 y los selectores de E2-1 y E4-3.                                                                                          |
| 19  | **E4-4** Eliminar una tarea sin entradas        | Baja complejidad; cierra F3.                                                                                                            |
| 20  | **E1-3** Ver cuánto llevo registrado            | Necesita todas las acciones que cambian los contadores (E2-1, E2-5, E4-3, E4-4).                                                        |
| 21  | **E1-2** Saber siempre qué está pasando         | Solo se puede cerrar con las cuatro pestañas y las tres eliminaciones construidas. Cierra las must-have y los requisitos transversales. |
| 22  | **E6-6** Informe en PDF (S1, opcional)          | Should-have, después de todas las must-have.                                                                                            |
| 23  | **E4-5** Buscar y filtrar tareas (S2, opcional) | Should-have, después de todas las must-have. Su orden respecto a E6-6 sigue el del alcance y no responde a una prioridad.               |

**Lo más rentable ahora mismo no es un ticket:** elegir el stack tecnológico (R-3). Cuesta una decisión, forma parte de la Entrega 1 y desbloquea a la vez la descomposición de E1-1, E2-1 y E3-1 y los tres tickets detallados del README.
