# Backlog del MVP — <Épicas que cubre este backlog>

> **Origen:** [PRD del MVP](../prd/mvp.md) y [alcance del MVP](../prd/alcance-mvp.md).
> Los **criterios de aceptación viven en las historias**, en [`<E1-slug>/`](./<E1-slug>/) y [`<E2-slug>/`](./<E2-slug>/). Este archivo solo recoge lo que cruza historias: la matriz y el orden.

> **Cómo usar esta plantilla.** Sustituye cada `<marcador>` por contenido propio y **borra todas las guías** (los bloques que empiezan por "Guía:", incluida esta) antes de cerrar el documento. Si un apartado no aplica, déjalo con una frase que diga por qué en lugar de eliminarlo.
>
> **Reparto de documentos.** El PRD dice _qué_ debe hacer el producto; las historias dicen _cuándo se da por cumplido_ (criterios de aceptación); este backlog dice _en qué orden_ se construye y _qué lo bloquea_. No repitas aquí criterios de aceptación: enlaza a la historia.

---

## ⚠️ Qué NO está aquí, y no es un fallo

> **Guía:** conserva esta sección solo si parte del trabajo vive fuera del repositorio (por ejemplo, issues en un gestor de tareas). Si todo vive en el repositorio, sustitúyela por una frase que lo diga y elimina la tabla.

**<Qué parte del trabajo no cabe en el repositorio.>** <Explica dónde se materializa (por ejemplo, historias como issues de tipo _Historia_ y tickets como _Subtarea_) y por qué no está en este repositorio.>

Si llegas aquí para retomar el trabajo sin haber hecho la sesión de planificación, esto es lo que tienes y lo que te falta:

|                                   | Dónde vive                                        | ¿Está en esta rama?       |
| --------------------------------- | ------------------------------------------------- | ------------------------- |
| PRD del MVP                       | `docs/prd/mvp.md`                                 | ✅                        |
| Alcance consensuado               | `docs/prd/alcance-mvp.md`                         | ✅                        |
| Historias con criterios           | `docs/backlog/<E1-slug>/` y `<E2-slug>/`          | ✅                        |
| Tickets con su Definition of Done | <dentro de las historias descompuestas>           | ✅                        |
| <Issues y subtareas del tablero>  | <Herramienta de seguimiento (proyecto `<CLAVE>`)> | ❌ **hay que recrearlas** |

El artefacto que dirige la implementación es el de este repositorio: los criterios de aceptación. El tablero es **seguimiento del trabajo** —quién lo tiene, en qué estado va—, no la fuente de verdad. Si los dos se contradicen, **manda el repositorio**.

---

## Las historias

<Número> historias cubren <las épicas>, **<todas | las siguientes> con criterios de aceptación escritos**. <Número> están además descompuestas en tickets.

### E1 · <Nombre de la épica>

| Historia                                              | Qué resuelve                                    | Tickets                                                |
| ----------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------ |
| [**<ID>** — <Título corto>](./<E1-slug>/us-<slug>.md) | <Una frase desde el punto de vista del usuario> | —                                                      |
| [**<ID>** — <Título corto>](./<E1-slug>/us-<slug>.md) | <...>                                           | **<n>** · <nota sobre el alcance de la descomposición> |

### E2 · <Nombre de la épica>

| Historia                                              | Qué resuelve | Tickets |
| ----------------------------------------------------- | ------------ | ------- |
| [**<ID>** — <Título corto>](./<E2-slug>/us-<slug>.md) | <...>        | —       |
| [**<ID>** — <Título corto>](./<E2-slug>/us-<slug>.md) | <...>        | —       |

> **<Historia clave sin descomponer, si la hay>.** <Por qué es la más importante, por qué todavía no se descompone y qué decisión debe tomarse antes.>

> **Guía:** cada funcionalidad must-have de `alcance-mvp.md` debe estar cubierta por al menos una historia. Si usas IDs provisionales (`E<n>-<m>`) y IDs de herramienta (`<CLAVE>-<n>`), indícalo en "Identificadores" más abajo. La columna "Qué resuelve" debe leerse desde el usuario, no desde la implementación.

### Por qué solo algunas traen tickets

Porque **descomponer es planificación de entrega, no de producto**: se hace cuando el trabajo está próximo. Un ticket escrito con muchas historias de antelación caduca antes de que alguien lo abra, y da una falsa sensación de plan.

<Historias descompuestas> están descompuestas porque <motivo>. Las demás llegan a la implementación **con sus criterios**, que es lo que hace falta para empezar: la regla de negocio la escribe producto, y el reparto por capas se decide al construir.

**Identificadores.** <Qué historias tienen ID asignado y cómo se derivan los de sus tickets, por ejemplo `<ID>.1`, `<ID>.2`…> Las demás conservan su etiqueta provisional `E<n>-<m>`, **pendiente de ID**; por eso su archivo lleva nombre descriptivo y no ID. No se inventan aquí.

**Qué es un ticket.** Una unidad de trabajo que una persona termina en una sesión, con <techo, por ejemplo media jornada> como máximo. **Hereda** los criterios de su historia; su Definition of Done es una checklist de _cómo entregamos_ (pruebas, manejo de error, convenciones), **no** criterios nuevos ni estimación en horas. Nombra la capa que toca; **no diseña**: tipo de columna, nulabilidad, índices, rutas y códigos de estado se deciden al implementar.

**Tallas.** S/M/L miden _dentro_ de ese techo, no en horas. Talla y riesgo van por separado: el ticket más peligroso de <historia> puede ser una M.

> **Guía:** si el proyecto o el entregable exige tickets más detallados que esta definición (por ejemplo, tickets de backend, frontend y base de datos con detalle de principio a fin), indica aquí que esos tickets detallados se documentan en el README y que este backlog mantiene la versión ligera. No mezcles las dos definiciones sin decir cuál aplica en cada sitio.

---

## Bloqueos transversales

Condicionan cuándo se puede cerrar el trabajo, y ninguno se resuelve dentro de la historia que lo sufre:

| Bloqueo                                                                    | Efecto                                                                   |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **<Bloqueo 1>** (<referencia al PRD o al alcance, por ejemplo R-n o PA-n>) | <Qué impide: escribir código, cerrar tickets, descomponer una historia…> |
| **<Bloqueo 2>** (<referencia>)                                             | <...>                                                                    |
| **<Contradicción abierta entre dos criterios>** (<referencia>)             | <Decisión de producto sin tomar y qué ticket o historia bloquea>         |

> **Guía:** un bloqueo es algo que condiciona varias historias o que ninguna historia puede resolver por sí sola. Cada fila debe remitir al punto abierto, restricción o criterio de donde sale (PRD, alcance o historia). Si algo se puede escribir como historia con criterios, no es un bloqueo: pásalo a la lista de historias.

> **Ya no son bloqueos, son trabajo.** <Si aplica: qué ausencias figuraban aquí y ahora son historias con criterios y sitio en el orden.>

**Sobre <el bloqueo con coste compartido>:** <Explica quién paga el coste y cuándo. Por ejemplo, el primer ticket cuyo DoD exija pruebas carga con montar la base de pruebas; los siguientes no.>

---

## Matriz impacto / complejidad

**Impacto** = cuánto sirve a la promesa central: _<propuesta de valor del PRD en una frase>_.
**Complejidad** = esfuerzo relativo de construcción, no riesgo.

> <Qué historias están descompuestas y talladas y cuáles se valoran solo a nivel de historia, con menos base.>

| Historia                | Impacto               | Complejidad           | Notas                                                   |
| ----------------------- | --------------------- | --------------------- | ------------------------------------------------------- |
| **<ID>** <Título corto> | <Alto / Medio / Bajo> | <Alta / Media / Baja> | <Por qué ese impacto o esa complejidad, o qué habilita> |
| **<ID>** <Título corto> | <...>                 | <...>                 | <...>                                                   |

**Lectura por cuadrantes**

- **Alto impacto / baja complejidad:** <historias>. Lo más rentable del backlog.
- **Alto impacto / complejidad media o alta:** <historias>. El núcleo del trabajo.
- **Bajo impacto / baja complejidad:** <historias>. Relleno útil.
- **Bajo impacto / complejidad media o alta:** <historias>. <Para cada una, indica si se justifica por lo que habilita o porque está decidida por otra razón. Escríbelo a propósito, para que la decisión no se disfrace de prioridad.>

> **Guía:** valora el impacto contra la propuesta de valor del PRD, no contra tu preferencia. Si una funcionalidad entra en el MVP por una decisión explícita aunque su impacto sea bajo, dilo en "Notas" y en el cuadrante correspondiente.

---

## Orden de backlog priorizado

Respeta a la vez prioridad de producto y dependencias. **La dependencia manda sobre la épica**: <historia> va primero aunque pertenezca a <otra épica>, porque <razón>.

| #   | Historia                | Motivo                                         |
| --- | ----------------------- | ---------------------------------------------- |
| 1   | **<ID>** <Título corto> | <Por qué va aquí: dependencia, impacto, coste> |
| 2   | **<ID>** <Título corto> | <...>                                          |
| 3   | **<ID>** <Título corto> | <...>                                          |

**Lo más rentable ahora mismo no es un ticket:** <si procede, la decisión, conversación o desbloqueo que cuesta poco y desbloquea la historia más valiosa del backlog>.

---

> **Guía — lista de comprobación antes de cerrar** _(bórrala al terminar)_
>
> - [ ] Cada funcionalidad must-have del alcance está cubierta por al menos una historia de este backlog.
> - [ ] Cada historia enlazada existe y tiene criterios de aceptación escritos; el backlog no los repite.
> - [ ] Los IDs y las etiquetas provisionales siguen la regla de "Identificadores"; no se inventan IDs.
> - [ ] Cada bloqueo remite a su origen (PRD, alcance o historia).
> - [ ] La matriz y el orden son coherentes: lo de alto impacto y baja complejidad va pronto salvo dependencia o bloqueo explícito.
> - [ ] Las dependencias mandan sobre las épicas, y está dicho.
> - [ ] Los tickets heredan criterios, tienen DoD y no diseñan; si hay tickets más detallados, se indica dónde viven.
> - [ ] No quedan marcadores `<...>` ni bloques de guía, y los enlaces relativos resuelven.
> - [ ] No hay datos confidenciales ni información personal real.
