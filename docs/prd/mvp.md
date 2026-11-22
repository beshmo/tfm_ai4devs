# PRD — Diario de trabajo MVP

> **Estado:** Borrador · **Fecha:** 2026-11-22
> **Base de alcance:** [alcance-mvp.md](./alcance-mvp.md). Ese documento manda: si este PRD y el alcance se contradicen, gana el alcance.
> **Nota de documento:** aquí no hay diseño técnico. Ni modelo de datos, ni arquitectura, ni endpoints. Solo qué debe hacer el producto y cómo se comprueba.

**Convenciones de identificadores:** `JTBD-n` (trabajos del usuario), `E<n>` (épicas), `RF-n` (requisitos funcionales), `RNF-n` (no funcionales), `R-n` (restricciones), `P-n` (proxies de éxito), `S-n` (indicadores de salud), `PA-n` (puntos abiertos). Las funcionalidades del alcance conservan sus identificadores sin guion: `F1`–`F5` (must-have) y `S1`–`S2` (should-have); no deben confundirse con los indicadores de salud `S-1`, `S-2`… Lo marcado con `[SUPUESTO]` aún no está validado y requiere confirmación de la propietaria.

---

## 1. Problema y contexto

Quien prepara las reuniones semestrales de evaluación de objetivos tiene que reconstruir de memoria lo que hizo durante seis meses. El trabajo diario queda repartido entre tickets, correos, chats y notas sueltas, y en ninguno de esos sitios se ve cómo avanzó cada tarea, a qué objetivo contribuyó ni qué competencias puso en juego. Reunirlo justo antes de la reunión es lento y el resultado sale incompleto.

El coste no es el rato que se pasa recopilando antes de la reunión, sino sus consecuencias:

- **Se pierde la primera mitad del periodo.** Los logros de los primeros meses se olvidan o se cuentan sin su resultado ni sus evidencias, y la evaluación se queda con lo más reciente.
- **El progreso por objetivo no se puede demostrar.** No hay un vínculo explícito entre el trabajo hecho y los objetivos acordados, así que el avance de cada objetivo se argumenta de memoria.
- **Las fortalezas se describen con impresiones.** En lugar de un recuento de las tareas en las que se usó cada competencia, se ofrecen valoraciones generales difíciles de sostener.

No hay documentado un episodio de referencia concreto (fecha, reunión o logro olvidado); el caso que motiva el producto es el patrón general descrito arriba.

**Qué cambia y qué no.** Desaparece la reconstrucción de memoria: el informe del periodo sale del historial que se fue escribiendo día a día. Sigue existiendo el esfuerzo de anotar el trabajo con regularidad, la reunión de evaluación en sí y las herramientas de trabajo de siempre (tickets, correo, chat), que el producto no sustituye ni integra. Este MVP no resuelve la colaboración con responsables, no redacta el informe con IA, no importa datos de otras herramientas ni protege contra la pérdida de datos con copias de seguridad.

**Contexto de partida.** No existe ninguna parte del producto construida. El repositorio contiene solo documentación (dominio, interfaz propuesta, alcance cerrado) y herramientas de repositorio ya configuradas (gestor de paquetes, linter, formateador y ganchos de git). Todo el producto está por construir: interfaz, lógica, persistencia, inicio de sesión, datos semilla y suite de tests.

**Contexto de validación.** La validación es un caso de estudio de una sola persona, la propietaria del diario, que además es quien construye el producto. No hay usuarios reales diversos. Los criterios se comprueban con tests automáticos y con datos semilla ficticios. Ninguna afirmación de este documento debe presentarse como validada por uso real.

---

## 2. Usuarios y jobs-to-be-done

### Usuario primario

Una sola persona: la propietaria del diario, una profesional que registra su propio trabajo y que tiene evaluaciones de objetivos cada semestre. Es la única que lee y escribe los datos, que son privados. No hay otras partes dentro de la aplicación: responsables, compañeros o recursos humanos solo reciben, si ella lo decide, el fichero exportado del informe.

El valor se cobra en dos momentos: en la sesión de registro diaria (anotar en pocos pasos y ver el estado de cada tarea al día) y, sobre todo, en la sesión previa a la reunión semestral (obtener el informe ya hecho).

**Perfil de referencia:** profesional que trabaja con gestores de tickets, correo y chat; usa el navegador tanto en escritorio como en pantallas estrechas; dedica una sesión corta casi a diario al final de la jornada, revisa de vez en cuando y prepara una sesión más larga antes de cada evaluación semestral. No se dispone de más datos sobre su empresa, sector o tamaño de equipo, y no se inventan.

### Jobs-to-be-done

| #      | Job                                                     | Situación                                              | Resultado esperado                                                                                                              |
| ------ | ------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| JTBD-1 | **Anotar el trabajo del día mientras está fresco**      | Al final de la jornada, en una sesión corta            | La entrada de hoy queda guardada desde un único formulario, con cada tarea en su estado actual                                  |
| JTBD-2 | **Recuperar un día olvidado sin estropear lo de hoy**   | Cuando recuerda trabajo de días anteriores             | La fecha pasada queda registrada y ninguna tarea pierde un estado más reciente                                                  |
| JTBD-3 | **Ver la historia completa de una tarea**               | En una revisión ocasional, o al preparar la evaluación | Ve en un solo sitio cuándo trabajó la tarea, qué anotó cada día y cómo cambió su estado                                         |
| JTBD-4 | **Relacionar el trabajo con los objetivos del periodo** | Al definir los objetivos y al registrar cada tarea     | Cada objetivo muestra cuántas tareas tiene, cuántas están completadas y cuántas son logros                                      |
| JTBD-5 | **Llegar a la evaluación con el informe ya hecho**      | Antes de la reunión semestral                          | Un informe del periodo con resumen, logros, fortalezas y detalle por objetivo, exportado en Markdown para llevarlo a la reunión |

JTBD-1 sostiene a todos los demás: si el registro diario cuesta más de lo que devuelve en el momento, el historial no existe y JTBD-3, JTBD-4 y JTBD-5 no tienen datos sobre los que trabajar. JTBD-2 es la red de seguridad de JTBD-1 para los días en que no se registró a tiempo.

### No-usuarios, explícitamente

- **Responsables, compañeros y recursos humanos.** No tienen acceso: no pueden ver, comentar ni revisar diarios. Diseñar para ellos convertiría el diario en un instrumento de control y cambiaría lo que la propietaria se atreve a escribir; además exigiría roles, permisos y compartición, que están fuera del alcance.
- **Equipos o varias personas en la misma instancia con roles distintos.** El producto es de una sola usuaria. Soportar equipos exigiría gestión de cuentas, registro público y administración, y desplazaría el esfuerzo del flujo principal.
- **Quien busca un control de horas o un gestor de tareas.** El producto no mide tiempo ni planifica trabajo futuro; registra lo hecho para evaluarlo después.

---

## 3. Propuesta de valor

> **Lo que anotas cada día en un solo formulario se convierte, al final del semestre, en el informe de tu evaluación.**

El producto responde a una pregunta concreta: "¿qué hice este periodo, para qué objetivo y con qué competencias?", y la responde sin reconstruir de memoria, sin buscar en otras herramientas y sin depender de nadie más.

### El intercambio que lo sostiene

La usuaria da un poco de esfuerzo casi a diario: elegir o crear una tarea, escribir una nota breve y fijar el estado. A cambio recibe dos cosas. En el momento, ve el estado de todas sus tareas al día y su historia sin buscarla en otras herramientas. Al final del periodo, recibe el informe hecho. El balance compensa en el momento solo si anotar cuesta menos que lo que devuelve ver el trabajo ordenado; si el beneficio llegara solo en la reunión semestral, el hábito no sobreviviría seis meses.

De ahí el principio de diseño que no se negocia:

> **Registrar el día nunca debe obligar a salir del formulario de la pestaña Diario.**

Si para registrar hay que pasar antes por Objetivos o por Tareas, o rellenar campos que no aportan nada ese día, el registro se aplaza, aparecen huecos en el historial y el informe vuelve a ser incompleto. Es la forma habitual en que fracasan los diarios de logros: se abandonan a las pocas semanas y se reconstruyen de memoria antes de la evaluación, que es justo el problema de partida.

### Posicionamiento

El producto convive con las herramientas de trabajo (tickets, correo, chat) y no las sustituye ni se integra con ellas. Sustituye a las notas sueltas y a los documentos de logros hechos a mano. Se descarta la integración con otras herramientas porque multiplica el alcance (autenticación con terceros, mapeo de datos, mantenimiento) y porque lo que esas herramientas registran no es lo que la evaluación necesita: el resultado, el objetivo al que contribuye y la competencia usada solo los aporta la propietaria.

### Qué es «trabajada en el periodo» aquí

El informe depende de términos que parecen evidentes y no lo son. En este producto:

- **Fecha** es una fecha de calendario sin hora. **"Hoy"** es la fecha local del navegador de la usuaria, no la del servidor.
- **Periodo** es un rango de fechas **inclusivo en los dos extremos**. Se elige al generar el informe; no es una entidad que se gestione aparte.
- Una tarea está **trabajada en el periodo** si al menos una entrada con fecha dentro del rango la menciona. No significa que se creara ni que se completara en el periodo.
- Una tarea está **completada en el periodo** si su fecha de finalización cae dentro del rango, con independencia de las entradas.
- **Logro** es una tarea con la marca de logro activada. No implica que esté completada. Sin embargo, el listado de Logros destacados y el total de logros del resumen solo incluyen los logros **completados en el periodo** (fecha de finalización dentro del rango), no los trabajados en el periodo: para esa sección no se miran las entradas.
- **Fortaleza** es una competencia ordenada por el número de tareas trabajadas en el periodo que la usan; el primer desempate es el número de entradas y el segundo, el nombre de la competencia en orden alfabético ascendente.

---

## 4. Alcance / Fuera de alcance

Esta sección resume `alcance-mvp.md`. No introduce decisiones nuevas.

### 4.1 Dentro (la vertical)

**Con sesión iniciada, la usuaria crea un objetivo, escribe una entrada con una tarea nueva vinculada a él, cierra esa tarea en una entrada posterior como `Completada` y marcada como logro, genera el informe de un periodo que incluye ambas fechas y descarga el `.md`; la tarea aparece en Logros, en Detalle por objetivo y en el resumen.**

Se prioriza la profundidad frente a la amplitud: cinco funcionalidades must-have que se terminan de punta a punta, con sus reglas de integridad protegidas por tests, en lugar de más funcionalidades a medias.

1. **F1 · Registro diario de entradas.** Crear, editar y eliminar la entrada de una fecha con uno o varios elementos, con fusión en fechas existentes, sin tareas repetidas en una entrada, sin sobrescribir estados más recientes al rellenar fechas pasadas y con competencias normalizadas y sugeridas al escribir.
2. **F2 · Historial cronológico.** Listado de entradas por fecha descendente, agrupado por mes, con edición, eliminación y navegación a la tarea.
3. **F3 · Seguimiento y edición de tareas.** Lista de tareas con ID estable, ficha desplegable con línea de tiempo, edición en línea y reglas de fecha de finalización y de eliminación.
4. **F4 · Gestión de objetivos.** Crear, editar, archivar y restaurar objetivos, con tres contadores por tarjeta y bloqueo de la eliminación si hay tareas vinculadas.
5. **F5 · Informe del periodo y exportación Markdown.** Informe con resumen, logros destacados, fortalezas por competencia y detalle por objetivo, con vista previa, copia y descarga deterministas en Markdown.

Opcionales, que no sustituyen a ninguna must-have: **S1 · Exportación del informe en PDF** y **S2 · Búsqueda y filtros de tareas**.

Requisitos transversales: mensajes de éxito y error, confirmación de eliminaciones dentro de la página, mensajes de carga y de error de carga, resumen en vivo en la cabecera, diseño adaptado a pantallas estrechas y al tema del sistema, una sola usuaria con inicio de sesión y aislamiento de datos, datos semilla ficticios y ningún secreto en el repositorio.

### 4.2 Fuera, y por qué

| Excluido                                                                                            | Motivo                                                                                                                                        |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Varios usuarios con roles, compartir diarios, comentarios o revisión por responsables               | El diario es privado; abrirlo a terceros lo convierte en instrumento de control (ver no-usuarios) y multiplica el alcance                     |
| Registro público de cuentas, recuperación de contraseña e inicio de sesión con proveedores externos | Con una sola usuaria, la cuenta se crea con los datos semilla o la configuración; no aporta al flujo principal                                |
| Adjuntar ficheros a tareas o entradas                                                               | Las evidencias son texto y enlaces; los adjuntos añaden almacenamiento y riesgo de filtrar información confidencial en un repositorio público |
| Integraciones con tickets, calendarios, correo o mensajería, e importación de datos                 | El producto convive con esas herramientas (ver posicionamiento); integrarlas es deriva de alcance asumida como riesgo                         |
| Redacción o resumen del informe con IA generativa dentro de la aplicación                           | El informe debe ser determinista y verificable con tests                                                                                      |
| Edición manual del informe dentro de la aplicación y plantillas personalizables                     | El informe se corrige corrigiendo los datos de origen (por ejemplo, el resultado de una tarea); se exporta y, si hace falta, se edita fuera   |
| Botones con las 10 competencias más usadas y "Ver todas (N)" en el editor                           | Las sugerencias mientras se escribe cubren la normalización, que es lo que protege la calidad de las fortalezas                               |
| Recordar la última pestaña usada y el aviso de datos de ejemplo                                     | No afectan al flujo principal                                                                                                                 |
| Periodos de evaluación como entidad propia                                                          | El periodo solo se elige al generar el informe                                                                                                |
| Recordatorios, notificaciones, aplicación móvil nativa y uso sin conexión                           | El navegador en escritorio y pantallas estrechas cubre el contexto de uso; los recordatorios no forman parte de la vertical                   |
| Copia de seguridad, exportación completa e importación de los datos del diario                      | Riesgo aceptado en el alcance; la exportación del informe guarda fuera el contenido de cada periodo                                           |

Todo lo que no figura en el apartado 4 del alcance queda fuera del MVP.

### 4.3 Supuestos declarados, no construidos

No son deuda oculta: son límites conocidos y aceptados.

1. **Una sola usuaria, concurrencia baja.** Se asume que la única concurrencia realista son dos pestañas abiertas o reintentos. Aun así, la asignación de ID de tarea nunca puede producir duplicados (RF-15).
2. **El almacenamiento no falla de forma irrecuperable.** No hay copias de seguridad ni exportación completa. Es razonable para un MVP de curso con datos semilla; no lo sería en un producto real con años de historial.
3. **La zona horaria del navegador es la referencia.** Si la usuaria cambia de zona horaria, "hoy" cambia con ella. Se acepta porque las fechas son de calendario y sin hora.
4. **La cuenta existe de antemano.** Se crea con los datos semilla o la configuración; no hay flujo de alta ni de recuperación.

### 4.4 Limitación conocida frente al caso fundacional

El MVP cubre la reconstrucción del periodo **solo si el registro se hizo**. Si la propietaria deja de anotar durante semanas, el informe será tan incompleto como la memoria; rellenar fechas pasadas (JTBD-2) mitiga los huecos cortos, no los largos. Además:

- Las competencias, el resultado, las evidencias y la marca de logro pertenecen a la tarea, no a cada día: el informe muestra su valor actual, no el que tenían durante el periodo.
- El informe no se puede retocar dentro de la aplicación; lo que falte se corrige en los datos (por ejemplo, completando el resultado en Tareas) y se vuelve a generar.
- El contenido del informe depende de la convención de la usuaria al marcar logros y asignar competencias; el producto normaliza la grafía de las competencias, pero no impide que use etiquetas distintas para lo mismo.

---

## 5. Épicas del MVP

| Épica                                     | Qué agrupa                                                                                                                                                                                                                                                   |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **E1 · Acceso, privacidad y marco común** | Requisitos transversales del alcance: inicio de sesión con cuenta semilla, acceso exigido en toda lectura y escritura, aislamiento entre usuarios, resumen en vivo de la cabecera, mensajes de acción, confirmaciones en página y mensajes de carga y error. |
| **E2 · Registro diario**                  | F1: editor de entradas, elementos, creación de tareas y objetivos en línea, fusión en fechas existentes, propagación de estados en fechas pasadas, competencias normalizadas, ID de tarea estables, edición y eliminación de entradas.                       |
| **E3 · Historial cronológico**            | F2: listado de entradas por mes, navegación a la tarea, edición y eliminación desde el listado, estado vacío.                                                                                                                                                |
| **E4 · Seguimiento de tareas**            | F3: lista de tareas, ficha desplegable con línea de tiempo, edición en línea, reglas de fecha de finalización y de eliminación. Incluye S2 (opcional): búsqueda y filtros.                                                                                   |
| **E5 · Objetivos**                        | F4: alta completa y en línea, edición, archivado y restauración, contadores y bloqueo de la eliminación.                                                                                                                                                     |
| **E6 · Informe del periodo**              | F5: selección del periodo, secciones del informe, vista previa, copia y descarga deterministas en Markdown. Incluye S1 (opcional): exportación en PDF.                                                                                                       |

_Trazabilidad:_

| Funcionalidad del alcance                       | Épica | Requisitos                                                 |
| ----------------------------------------------- | ----- | ---------------------------------------------------------- |
| F1 · Registro diario de entradas                | E2    | RF-7, RF-8, RF-9, RF-10, RF-11, RF-12, RF-13, RF-14, RF-15 |
| F2 · Historial cronológico                      | E3    | RF-16, RF-17, RF-18, RF-19                                 |
| F3 · Seguimiento y edición de tareas            | E4    | RF-20, RF-21, RF-22, RF-23, RF-24, RF-25                   |
| F4 · Gestión de objetivos                       | E5    | RF-27, RF-28, RF-29, RF-30, RF-31                          |
| F5 · Informe del periodo y exportación Markdown | E6    | RF-32, RF-33, RF-34, RF-35, RF-36, RF-37, RF-38, RF-39     |
| S1 · Exportación del informe en PDF (opcional)  | E6    | RF-40                                                      |
| S2 · Búsqueda y filtros de tareas (opcional)    | E4    | RF-26                                                      |
| Requisitos transversales                        | E1    | RF-1, RF-2, RF-3, RF-4, RF-5, RF-6                         |

| Job    | Requisitos y métricas                               |
| ------ | --------------------------------------------------- |
| JTBD-1 | RF-7, RF-8, RF-13, RNF-1, P-5, S-1                  |
| JTBD-2 | RF-10, RF-12, RNF-4, S-2                            |
| JTBD-3 | RF-16, RF-17, RF-20, RF-21                          |
| JTBD-4 | RF-8, RF-27, RF-29, RF-36                           |
| JTBD-5 | RF-32 a RF-39, métrica primaria, P-1, P-2, P-3, S-3 |

---

## 6. Requisitos funcionales

Nivel producto: qué debe hacer el sistema y cómo se comprueba. Cada requisito lleva su criterio de aceptación. Los ejemplos usan datos ficticios.

### E1 · Acceso, privacidad y marco común

No hay nada construido. Todo está por verificar.

**RF-1 — Inicio de sesión con cuenta semilla.** Debe poder iniciarse sesión con las credenciales de prueba de los datos semilla. No debe existir ninguna opción de registro de cuentas, recuperación de contraseña ni inicio de sesión con proveedores externos.
_Aceptación:_ con las credenciales de prueba documentadas en el README, la usuaria accede a la pestaña Diario; con una contraseña incorrecta, el acceso se rechaza con un mensaje de error y no se muestra ningún dato. La pantalla de acceso no contiene enlaces ni formularios de registro o recuperación. El mensaje de error no indica si el usuario existe. `[SUPUESTO]`

**RF-2 — Acceso exigido en toda operación.** Toda lectura y escritura debe exigir sesión iniciada.
_Aceptación:_ cualquier petición sin sesión recibe `401` y no devuelve datos; un test lo comprueba para cada operación de lectura y escritura del producto.

**RF-3 — Aislamiento entre usuarios.** Toda consulta y modificación debe limitarse a los registros de la usuaria autenticada.
_Aceptación:_ con dos usuarios de prueba en los datos semilla, ninguna vista, contador, informe ni exportación de uno contiene registros del otro, y cualquier intento de modificar o eliminar un registro del otro falla sin alterarlo. Un test cubre entradas, tareas, objetivos, competencias sugeridas e informe.

**RF-4 — Resumen en vivo de la cabecera.** La cabecera debe mostrar el número de entradas, de tareas y de logros de la usuaria, y actualizarse tras cada guardado o eliminación sin recargar la página.
_Aceptación:_ partiendo de N entradas, M tareas y L logros, guardar una entrada en una fecha nueva con una tarea nueva marcada como logro muestra N+1, M+1 y L+1 sin recargar; eliminar esa entrada muestra N y mantiene M+1 y L+1 (la tarea se conserva).

**RF-5 — Mensajes de acción y confirmación en la página.** Cada acción debe mostrar un mensaje breve de éxito o de error. Cada eliminación debe pedir confirmación dentro de la página, sin diálogos del navegador.
_Aceptación:_ guardar una entrada muestra "Entrada guardada"; un fallo al guardar muestra un mensaje que empieza por "No se pudo guardar". Pulsar Eliminar en cualquier elemento (entrada, tarea u objetivo) muestra una confirmación en la página; cancelarla no elimina nada. Un test E2E verifica que no se abre ningún diálogo nativo del navegador.

**RF-6 — Carga y fallo de carga.** Mientras llegan los datos debe mostrarse un mensaje de carga; si no se pueden cargar o el almacenamiento no está disponible, un mensaje que lo diga.
_Aceptación:_ con el almacenamiento detenido, la aplicación muestra un mensaje de error de carga en lugar de listas vacías o del estado vacío "escribe tu primera entrada".

### E2 · Registro diario

**RF-7 — Editor de entradas en la pestaña Diario.** El editor debe tener un selector de fecha, con la fecha local de hoy por defecto, y una lista de elementos que empieza con uno. Debe permitir añadir elementos ("+ Añadir otra tarea") y quitarlos ("Quitar", solo si hay más de uno). Al editar una entrada existente, debe ofrecer "Cancelar".
_Aceptación:_ al abrir Diario, la fecha mostrada es la fecha local del navegador; con un solo elemento no aparece "Quitar"; con dos, sí. Una entrada no puede guardarse sin elementos.

**RF-8 — Contenido de cada elemento.** Cada elemento debe permitir elegir una tarea existente o "Nueva tarea…" (con título obligatorio), escribir una nota, fijar el estado de la tarea tras ese día (`En curso`, `En pausa`, `Completada`) y activar la marca de logro. En una sección plegable "Detalles de la tarea" (abierta por defecto en tareas nuevas, cerrada en existentes) debe permitir asignar el objetivo, incluido "+ Nuevo objetivo…" con solo título, y completar competencias, resultado o impacto y evidencias.
_Aceptación:_ el estado por defecto es `En curso` en una tarea nueva y el estado actual en una existente. Guardar con una tarea nueva sin título se rechaza con un mensaje de error y no guarda nada de la entrada. Crear "+ Nuevo objetivo…" desde el elemento deja el objetivo disponible en la pestaña Objetivos sin descripción ni "Cómo se mide". Todo el recorrido se completa sin cambiar de pestaña.

**RF-9 — Selectores de tarea y de objetivo.** El selector de tarea debe agrupar las tareas en "En curso y en pausa" y "Completadas". El selector de objetivo no debe mostrar objetivos archivados, salvo el que ya tenga asignado la tarea del elemento.
_Aceptación:_ con un objetivo archivado asignado a T-003 y otro archivado sin tareas, al elegir T-003 su objetivo archivado aparece seleccionado; el otro archivado no aparece en ningún selector.

**RF-10 — Fusión en una fecha existente.** Guardar una entrada en una fecha que ya tiene entrada debe fusionar los elementos en la entrada existente; nunca debe crear una segunda entrada para la misma fecha.
_Aceptación:_ existe una entrada del 2026-03-10 con T-001; guardar desde el editor una entrada nueva del 2026-03-10 con T-002 deja una sola entrada del 2026-03-10 con dos elementos (T-001 y T-002). El caso en que el nuevo guardado incluye una tarea que ya estaba en la entrada queda pendiente (PA-1).

**RF-11 — Una tarea, una vez por entrada.** La misma tarea no debe aparecer dos veces en una entrada.
_Aceptación:_ guardar una entrada con dos elementos que eligen T-001 se rechaza con un mensaje de error que identifica la tarea repetida, y no se guarda nada.

**RF-12 — Rellenar fechas pasadas sin sobrescribir estados más recientes.** Al guardar un elemento, el estado elegido solo debe pasar a ser el estado actual de la tarea si ninguna entrada con fecha posterior menciona esa tarea.
_Aceptación:_ T-001 tiene una entrada del 2026-03-12 con estado `Completada`; guardar una entrada del 2026-03-05 con T-001 en `En curso` deja T-001 en `Completada` con su fecha de finalización sin cambios, y su línea de tiempo muestra las dos fechas en orden. Guardar una entrada del 2026-03-15 con T-001 en `En pausa` sí cambia su estado a `En pausa` y borra su fecha de finalización.

**RF-13 — Competencias normalizadas y sugeridas al escribir.** Mientras se escribe en el campo de competencias, el sistema debe sugerir, entre todas las competencias conocidas de la usuaria, las que coinciden con el texto. Las competencias se comparan sin distinguir mayúsculas y se guardan con la grafía ya existente; los duplicados se eliminan. Intro elige la primera sugerencia y nunca envía el formulario desde ese campo. Pulsar una sugerencia sustituye el fragmento escrito. Con el campo vacío no se muestran botones de competencias más usadas ni "Ver todas".
_Aceptación:_ existe "Kubernetes"; escribir "kube" sugiere "Kubernetes"; guardar "kubernetes" asocia "Kubernetes" y no crea una competencia nueva; introducir "Kubernetes" y "KUBERNETES" en la misma tarea deja una sola. Pulsar Intro en el campo no guarda la entrada.

**RF-14 — Editar y eliminar una entrada.** Debe poder editarse una entrada existente (se carga en el editor) y eliminarse con confirmación. Eliminar una entrada no elimina sus tareas.
_Aceptación:_ T-005 aparece solo en la entrada del 2026-04-02; eliminar esa entrada deja T-005 en la pestaña Tareas con 0 entradas. El efecto de la eliminación sobre el estado de T-005 queda pendiente (PA-2).

**RF-15 — ID de tarea estables y únicos.** Cada tarea nueva debe recibir el siguiente ID secuencial de la usuaria (`T-001`, `T-002`…). El ID no cambia nunca y no puede repetirse, tampoco con peticiones simultáneas.
_Aceptación:_ con T-001 a T-004 existentes, la siguiente tarea creada es T-005. Dos creaciones simultáneas desde dos pestañas producen dos ID distintos; si hay conflicto, la operación falla y se reintenta, nunca se guardan dos tareas con el mismo ID. Editar el título no cambia el ID. Cada usuaria tiene su propia secuencia. La reutilización del ID de una tarea eliminada queda pendiente (PA-10).

### E3 · Historial cronológico

**RF-16 — Listado por fecha descendente, agrupado por mes.** La pestaña Diario debe mostrar las entradas en orden de fecha descendente, agrupadas por mes. Cada entrada muestra una columna de fecha (día, mes y día de la semana) y sus elementos; cada elemento muestra el ID, el título, la marca de logro, el estado, la nota y una línea con el objetivo y las competencias.
_Aceptación:_ con entradas del 2026-02-27, 2026-03-02 y 2026-03-10, el listado muestra primero el grupo de marzo (10 y luego 2) y después el de febrero. El orden de los elementos dentro de una entrada es el de guardado `[SUPUESTO]`.

**RF-17 — Del ID a la tarea.** Pulsar la etiqueta del ID de un elemento debe abrir la pestaña Tareas con esa tarea desplegada.
_Aceptación:_ pulsar "T-003" en el listado abre Tareas con T-003 desplegada y ninguna otra.

**RF-18 — Editar y eliminar desde el listado.** "Editar" debe cargar la entrada en el editor; "Eliminar" debe pedir confirmación en la página y borrar solo la entrada.
_Aceptación:_ tras confirmar la eliminación, la entrada desaparece del listado, sus tareas siguen en Tareas y la cabecera resta una entrada.

**RF-19 — Estado vacío del historial.** Sin entradas, el listado debe explicar cómo escribir la primera.
_Aceptación:_ con una usuaria sin entradas, el listado muestra un texto que indica usar el editor de la parte superior para guardar la primera entrada, y no muestra grupos de mes vacíos.

### E4 · Seguimiento de tareas

**RF-20 — Lista de tareas por actividad más reciente.** La pestaña Tareas debe listar todas las tareas de la usuaria ordenadas por actividad más reciente. La **fecha de la última actividad** de una tarea es la fecha de la entrada más reciente que la menciona; la lista se ordena por esa fecha en orden descendente (la tarea con la entrada más reciente va primero) y, a igual fecha de última actividad, por ID de tarea ascendente. Las tareas sin ninguna entrada no tienen fecha de última actividad y van al final de la lista, después de todas las que sí la tienen, ordenadas entre sí por ID de tarea ascendente. Cada fila muestra el ID, el título, la marca de logro, el estado, la fecha de la última actividad y el número de entradas.
_Aceptación:_ T-002 aparece en una entrada del 2026-03-20 y T-001 en una del 2026-03-18; T-002 va antes que T-001. T-003 aparece en entradas del 2026-03-01 y del 2026-03-22; su fecha de última actividad es 2026-03-22 y va antes que T-002. Cambiar el estado o editar T-001 desde la pestaña Tareas no cambia su fecha de última actividad ni su posición, porque no crea ninguna entrada. El número de entradas de cada fila coincide con el número de entradas que la mencionan. Con T-009 y T-005 con última actividad el 2026-03-15, T-005 va antes que T-009. Con T-010 y T-008 sin ninguna entrada, ambas aparecen después de todas las tareas con entradas (incluidas T-005 y T-009), y T-008 antes que T-010.

**RF-21 — Tarea desplegada con línea de tiempo.** Solo debe poder desplegarse una tarea a la vez. La tarea desplegada muestra el objetivo, el resultado o impacto, las competencias y las evidencias (los enlaces son pulsables), y una línea de tiempo "Seguimiento" con la fecha y la nota de cada entrada que menciona la tarea y un indicador de estado cada vez que el estado cambia.
_Aceptación:_ desplegar T-002 con T-001 desplegada pliega T-001. Una tarea con entradas del 2026-03-01 (`En curso`), 2026-03-05 (`En curso`) y 2026-03-09 (`Completada`) muestra tres fechas con sus notas e indicadores de estado solo en la primera y en la tercera. Una URL escrita en evidencias se abre al pulsarla.

**RF-22 — Edición en línea de la tarea.** Debe poder editarse en línea el título, el estado, el objetivo (con "+ Nuevo objetivo…"), la marca de logro, las competencias (con las sugerencias de RF-13), el resultado y las evidencias.
_Aceptación:_ guardar con el título vacío o solo con espacios se rechaza con un mensaje de error y no cambia nada.

**RF-23 — Cambio de estado desde Tareas.** Al cambiar el estado desde la pestaña Tareas, la fecha de finalización debe fijarse al pasar a `Completada` (la existente; si no hay, la de la última actividad; si no hay, hoy) o borrarse al salir de `Completada`. Este cambio no añade nada a la línea de tiempo.
_Aceptación:_ T-007 `En curso` con última actividad el 2026-05-14 pasa a `Completada` con fecha de finalización 2026-05-14; T-008 sin entradas pasa a `Completada` con la fecha de hoy; al volver T-007 a `En curso`, su fecha de finalización desaparece. La línea de tiempo de T-007 tiene las mismas filas antes y después.

**RF-24 — La fecha de finalización solo existe en `Completada`.** Ninguna tarea puede tener fecha de finalización si su estado no es `Completada`, venga el cambio de la pestaña Diario o de la pestaña Tareas.
_Aceptación:_ un test recorre todos los caminos que cambian el estado (RF-12, RF-23) y comprueba que, tras cada uno, la tarea tiene fecha de finalización solo si está `Completada`. La fecha que se fija al completar desde el Diario queda pendiente (PA-3).

**RF-25 — Eliminación bloqueada si la tarea está referenciada.** No debe poder eliminarse una tarea que aparezca en alguna entrada; la eliminación de una tarea sin entradas requiere confirmación.
_Aceptación:_ intentar eliminar T-001, mencionada en una entrada, muestra un mensaje que indica que hay que quitarla antes de esas entradas, y T-001 sigue existiendo; eliminar T-008, sin entradas, tras confirmar, la quita de la lista.

**RF-26 — Búsqueda y filtros de tareas (S2, opcional).** La pestaña Tareas puede ofrecer una búsqueda de texto libre (ID, título, resultado, evidencias, competencias y notas de las entradas), filtros por estado, objetivo (incluido "Sin objetivo"), competencia y "Solo logros", y un contador de resultados.
_Aceptación:_ buscar una palabra que solo aparece en la nota de una entrada de T-004 deja T-004 como único resultado y el contador muestra 1; combinar "Solo logros" con un estado muestra solo las tareas que cumplen ambos. No es condición para cerrar el MVP.

### E5 · Objetivos

**RF-27 — Crear objetivos.** "+ Nuevo objetivo" en la pestaña Objetivos debe abrir un formulario con título (obligatorio), descripción y "Cómo se mide". También debe poder crearse un objetivo solo con título desde los formularios de Diario y Tareas.
_Aceptación:_ guardar sin título se rechaza con un mensaje de error; un objetivo creado desde el Diario aparece en Objetivos y puede completarse después con descripción y "Cómo se mide".

**RF-28 — Editar, archivar y restaurar.** Debe poder editarse, archivarse y restaurarse un objetivo. Los archivados pasan a una sección "Archivados" y salen de los selectores de tarea, salvo en las tareas que ya los usan (RF-9).
_Aceptación:_ archivar un objetivo lo mueve a "Archivados" y conserva sus tareas vinculadas; restaurarlo lo devuelve a la sección principal y a los selectores.

**RF-29 — Tarjeta con tres contadores.** Cada tarjeta de objetivo debe mostrar el título, la descripción, "Cómo se mide" y tres contadores: tareas, completadas y logros.
_Aceptación:_ un objetivo con T-001 (`Completada`, logro), T-002 (`En curso`, logro) y T-003 (`En pausa`) muestra 3 tareas, 1 completada y 2 logros. Los contadores cuentan todas las tareas vinculadas, sin filtrar por periodo. `[SUPUESTO]`

**RF-30 — Eliminación bloqueada con tareas vinculadas.** No debe poder eliminarse un objetivo con tareas vinculadas; en su lugar, se propone archivarlo. Un objetivo sin tareas se elimina tras confirmar.
_Aceptación:_ intentar eliminar un objetivo con una tarea vinculada muestra un mensaje que propone archivarlo y el objetivo sigue existiendo.

**RF-31 — Estado vacío de objetivos.** Sin objetivos, la pestaña debe explicar por qué conviene definirlos para el informe.
_Aceptación:_ con una usuaria sin objetivos, la pestaña muestra un texto que indica que los objetivos agrupan las tareas en el "Detalle por objetivo" del informe.

### E6 · Informe del periodo

**RF-32 — Selección del periodo.** El informe debe ofrecer cuatro opciones: "Últimos 6 meses" (por defecto, ventana móvil que termina hoy), "Enero – junio" del año actual (1 ene – 30 jun), "Julio – diciembre" del año actual (1 jul – 31 dic) y "Personalizado" (cualquier "desde" y "hasta"). Si las fechas del rango personalizado están invertidas, se intercambian. Los rangos son inclusivos en los dos extremos.
_Aceptación:_ con hoy = 2026-11-22, "Julio – diciembre" usa 2026-07-01 a 2026-12-31; un rango personalizado de 2026-06-30 a 2026-01-01 se trata como 2026-01-01 a 2026-06-30; una entrada del 2026-06-30 cuenta en ese rango. La fecha de inicio exacta de "Últimos 6 meses" queda pendiente (PA-4).

**RF-33 — Franja de resumen.** El informe debe mostrar cuatro totales del periodo: entradas, tareas trabajadas, tareas completadas en el periodo y logros, con la semántica de la sección 3. El total de logros es el número de tareas de Logros destacados (RF-34): tareas con marca de logro cuya fecha de finalización cae dentro del periodo.
_Aceptación:_ sobre los datos semilla, los cuatro totales coinciden con un recuento independiente hecho fuera de la aplicación (P-2). Una tarea con fecha de finalización en el periodo cuenta como completada aunque ninguna entrada del rango la mencione. Una tarea con marca de logro trabajada en el periodo pero sin fecha de finalización dentro del rango (por ejemplo, `En curso`) no suma en el total de logros.

**RF-34 — Logros destacados.** El informe debe listar las tareas con marca de logro cuya fecha de finalización cae dentro del periodo (el mismo criterio que "completada en el periodo"), con independencia de que alguna entrada del rango las mencione. Cada tarjeta muestra el ID, el título, el objetivo, el intervalo de fechas, el número de entradas, el resultado (o una indicación para añadirlo si falta), las competencias y las evidencias. El intervalo de fechas (de la primera a la última entrada) y el número de entradas se calculan solo con las entradas con fecha dentro del periodo, nunca con el historial completo de la tarea. Las tarjetas se ordenan por fecha de finalización de la tarea en orden descendente (el logro completado más recientemente va primero) y, a igual fecha de finalización, por ID de tarea ascendente.
_Aceptación:_ con el periodo 2026-03-01 a 2026-03-31, un logro T-004 con fecha de finalización 2026-03-12 y otro T-006 con fecha de finalización 2026-03-25, la tarjeta de T-006 aparece antes que la de T-004. Con dos logros T-011 y T-007 con fecha de finalización 2026-03-20, la tarjeta de T-007 aparece antes que la de T-011. Un logro sin resultado muestra la indicación para añadirlo en Tareas en lugar de un hueco vacío. Una tarea con marca de logro `En curso` mencionada en una entrada del periodo no aparece; una tarea con marca de logro completada antes del periodo tampoco. Con el periodo 2026-03-01 a 2026-03-31 y un logro con entradas el 2026-02-20, 2026-03-05 y 2026-03-12 y fecha de finalización 2026-03-12, la tarjeta muestra el intervalo 2026-03-05 a 2026-03-12 y 2 entradas.

**RF-35 — Fortalezas y competencias.** El informe debe ordenar las competencias por número de tareas trabajadas en el periodo que las usan, con el número de entradas como primer desempate y el nombre de la competencia en orden alfabético ascendente como desempate final, mostrar las 15 primeras con una barra proporcional y hasta 6 ID de tarea por competencia. Los ID de tarea de cada competencia se ordenan por ID ascendente (T-001 antes que T-002) y se muestran los 6 primeros de ese orden.
_Aceptación:_ con "SQL" en 4 tareas y 6 entradas y "Python" en 4 tareas y 9 entradas, "Python" va antes que "SQL"; con "Redes" y "Docker" en 2 tareas y 3 entradas cada una, "Docker" va antes que "Redes"; con 20 competencias en el periodo, se muestran 15; una competencia usada en T-002, T-004, T-005, T-007, T-009, T-010, T-011, T-012 y T-013 muestra T-002, T-004, T-005, T-007, T-009 y T-010, en ese orden. Cómo se cuentan las entradas de una competencia queda pendiente (PA-6).

**RF-36 — Detalle por objetivo.** El informe debe mostrar un grupo por objetivo con su "Cómo se mide" y, en cada uno, sus tareas trabajadas en el periodo con estado, intervalo de fechas, número de entradas y resultado. Los grupos de objetivos se ordenan alfabéticamente en orden ascendente por título del objetivo. Si dos objetivos tienen el mismo título, va primero el grupo cuya tarea con el ID más bajo, entre las tareas que muestra ese grupo en el periodo, tenga un ID menor (los objetivos no tienen un ID visible propio; como dos grupos no comparten tareas, este desempate nunca empata). Dentro de cada grupo, las tareas se ordenan por ID ascendente. El intervalo de fechas (de la primera a la última entrada) y el número de entradas se calculan solo con las entradas con fecha dentro del periodo, nunca con el historial completo de la tarea. Las tareas sin objetivo aparecen en el grupo "Sin objetivo asignado", que va siempre al final, después de todos los objetivos con título.
_Aceptación:_ en el flujo principal (4.1), la tarea cerrada aparece en el grupo de su objetivo con estado `Completada`; una tarea trabajada sin objetivo aparece en "Sin objetivo asignado". Con tareas trabajadas en el periodo en los objetivos "Mejorar la observabilidad" y "Automatizar despliegues" y una tarea trabajada sin objetivo, los grupos aparecen en este orden: "Automatizar despliegues", "Mejorar la observabilidad" y "Sin objetivo asignado". Con T-005 y T-002 en el mismo objetivo, T-002 aparece antes que T-005. Con dos objetivos titulados "Reducir incidencias", uno con las tareas T-006 y T-012 trabajadas en el periodo y otro con T-003 y T-009, el grupo con T-003 y T-009 aparece primero. Con el periodo 2026-03-01 a 2026-03-31 y una tarea con entradas el 2026-02-20, 2026-03-05 y 2026-03-12, la tarea muestra el intervalo 2026-03-05 a 2026-03-12 y 2 entradas. La presencia de objetivos archivados o sin tareas en el periodo queda pendiente (PA-6).

**RF-37 — Vista previa y copia en Markdown.** El informe debe ofrecer una vista previa plegable con el informe completo en Markdown (Resumen, Logros, Fortalezas, Detalle por objetivo) y un botón "Copiar Markdown". Si el navegador rechaza el acceso al portapapeles, se abre la vista previa con su texto seleccionado para copiarlo a mano.
_Aceptación:_ el texto copiado es idéntico al de la vista previa; con el permiso de portapapeles denegado, la vista previa queda abierta y con todo su texto seleccionado.

**RF-38 — Descarga del `.md`.** "Descargar .md" debe ofrecer el fichero `informe-diario-<desde>_<hasta>.md`, donde `<desde>` y `<hasta>` son las fechas del periodo en formato `AAAA-MM-DD` `[SUPUESTO]`.
_Aceptación:_ para el periodo 2026-01-01 a 2026-06-30, el fichero se llama `informe-diario-2026-01-01_2026-06-30.md` y su contenido es idéntico al de la vista previa.

**RF-39 — Exportación determinista.** Con los mismos datos y el mismo periodo, el Markdown exportado debe ser idéntico byte a byte.
_Aceptación:_ un test genera dos veces el informe del mismo periodo sobre los datos semilla, en momentos distintos, y compara los ficheros byte a byte. El Markdown no incluye la fecha ni la hora de generación, como el ejemplo de referencia `docs/propuesta/informe.md`. El orden de cada lista del informe, incluidos sus desempates, está fijado en RF-34, RF-35 y RF-36, de modo que ningún empate deja el orden sin determinar.

**RF-40 — Exportación en PDF (S1, opcional).** El informe puede generarse en el navegador como PDF A4 `informe-diario-<desde>_<hasta>.pdf`, con título, periodo, numeración de páginas y las mismas secciones que el Markdown.
_Aceptación:_ el PDF contiene las cuatro secciones en el mismo orden que el Markdown y cada página lleva su número. No es condición para cerrar el MVP.

---

## 7. Requisitos no funcionales

**RNF-1 — Coste del registro diario.** El registro del día debe completarse desde un único formulario de la pestaña Diario, con la fecha de hoy por defecto, sin pasar por otras pestañas, incluso para crear una tarea nueva y un objetivo nuevo (solo con título). Los únicos datos obligatorios son la fecha y, por cada elemento, la tarea (existente o el título de una nueva). Es la condición del principio de diseño (sección 3).
_Comprobación:_ un test E2E registra una entrada con una tarea nueva vinculada a un objetivo nuevo y verifica 0 cambios de pestaña. Que la nota no sea obligatoria es un `[SUPUESTO]` (PA-10).

**RNF-2 — Respuesta percibida.** En instalación local con los datos semilla, guardar una entrada y ver el mensaje de confirmación debe tardar como máximo 1 s, y generar el informe de un periodo de 6 meses como máximo 2 s. `[SUPUESTO]` Importa porque la sesión de registro es corta y cualquier espera la alarga.

**RNF-3 — Escala objetivo.** El producto debe cumplir RNF-2 con el volumen de una usuaria durante dos periodos de evaluación (un año) de registro casi diario. Se toma como referencia 300 entradas y 600 tareas `[SUPUESTO]`. No se diseña para varias usuarias activas ni para volúmenes de equipo.

**RNF-4 — Fechas sin hora y zona horaria.** Las fechas de las entradas y la fecha de finalización deben tratarse como fechas de calendario sin hora; "hoy" es la fecha local del navegador; los rangos del informe son inclusivos en los dos extremos.
_Comprobación:_ un test con el navegador en una zona horaria distinta de UTC guarda una entrada a las 23:30 locales y verifica que queda en la fecha local de ese día, y que aparece en un informe cuyo "hasta" es esa fecha.

**RNF-5 — Comportamiento ante fallos.** Si guardar falla, debe mostrarse el mensaje de error de RF-5 y no debe quedar guardada una parte de la entrada: o se guardan todos sus elementos o ninguno. El formulario conserva lo escrito para reintentar `[SUPUESTO]`. Si hay conflicto al asignar un ID de tarea, la operación falla y se reintenta; nunca se generan ID duplicados.
_Comprobación:_ un test fuerza un fallo al guardar una entrada de tres elementos y verifica que no hay ningún elemento nuevo guardado.

**RNF-6 — Integridad de los datos.** Ninguna regla del dominio puede incumplirse por ningún camino: una entrada por fecha, ninguna tarea repetida en una entrada, ningún estado más reciente sobrescrito al rellenar fechas pasadas, ninguna tarea referenciada ni objetivo con tareas eliminados, fecha de finalización solo en `Completada`, ID de tarea únicos y estables.
_Comprobación:_ cada regla tiene al menos un test automático (RF-10, RF-11, RF-12, RF-15, RF-24, RF-25, RF-30).

**RNF-7 — Privacidad.** Los datos solo son accesibles para la usuaria autenticada (RF-2, RF-3). El repositorio no contiene secretos ni credenciales reales; los datos semilla y las credenciales de prueba son ficticios y no contienen información personal ni de ninguna empresa. El producto no envía datos de uso a terceros `[SUPUESTO]`.
_Comprobación:_ revisión del repositorio antes de cada entrega: existe un `.env.example` con las variables vacías y ningún fichero versionado contiene valores de secretos.

**RNF-8 — Dispositivos, diseño y tema.** La interfaz debe funcionar en navegador de escritorio y en pantallas estrechas, pasando a una sola columna sin desplazamiento horizontal, y seguir el tema claro u oscuro del sistema.
_Comprobación:_ un test E2E a 360 px de ancho `[SUPUESTO]` recorre las cuatro pestañas y verifica que el ancho del documento no supera el de la ventana; con el sistema en tema oscuro, la interfaz usa la paleta oscura.

**RNF-9 — Navegadores.** El producto debe funcionar en las versiones estables actuales de Chrome y Firefox `[SUPUESTO]`. La copia al portapapeles tiene la alternativa de RF-37 para navegadores que la rechacen.

**RNF-10 — Idioma.** La interfaz, los mensajes y el informe exportado están en español `[SUPUESTO]`.

**RNF-11 — Teclado.** Los flujos de registro diario y de generación del informe deben poder completarse solo con teclado; en el campo de competencias, Intro nunca envía el formulario (RF-13) `[SUPUESTO]`.

**RNF-12 — Verificabilidad.** El README debe incluir los pasos de instalación en local, un `.env.example` con las variables vacías, los datos semilla ficticios (con los dos usuarios de prueba) y las credenciales de prueba, de modo que un revisor externo reproduzca el flujo principal y ejecute la suite de tests.
_Comprobación:_ P-4.

---

## 8. Restricciones

**R-1 — Entregas por fases del curso.** La Entrega 1 es solo documentación (0 % código). La Entrega 2 exige al menos una funcionalidad operativa de extremo a extremo. La Entrega 3 exige de 3 a 5 funcionalidades must-have 100 % operativas, suite de tests (unitarios, integración y al menos un E2E del flujo principal) y evidencia de funcionamiento. Las should-have no se exigen operativas.

**R-2 — Criterio de recorte.** De 3 a 5 must-have (aquí, 5: F1–F5) y como máximo 2 should-have (S1, S2). Cualquier petición nueva se valora indicando qué funcionalidad se aplaza o se recorta. Al tener las 5 must-have en el límite superior, no hay margen para añadir otra sin quitar una.

**R-3 — Stack sin elegir; herramientas de repositorio ya configuradas.** No hay stack tecnológico decidido. El repositorio ya tiene configurados pnpm como gestor de paquetes, ESLint, Prettier y ganchos de git con Husky. El trabajo se organiza con OpenSpec (propuestas de cambio antes de implementar). La elección del stack corresponde a la documentación técnica de la Entrega 1, no a este PRD.

**R-4 — No hay tests hoy y su coste forma parte del MVP.** El comando de tests existe pero no ejecuta nada. La suite (unitarios, integración y E2E), con un test por cada regla de integridad y por cada criterio de fidelidad del informe, se construye dentro del MVP siguiendo TDD.

**R-5 — Repositorio público y datos ficticios.** Toda la documentación, los datos semilla y las credenciales de prueba son públicos y ficticios. Ningún secreto real se sube al repositorio.

**R-6 — Cuenta creada por semilla o configuración.** No hay alta pública de cuentas. Los datos semilla incluyen la cuenta de la usuaria y un segundo usuario de prueba para verificar el aislamiento.

**R-7 — Validación como caso de estudio.** Una sola persona, la propietaria, que además construye el producto. Condiciona las métricas (sección 9).

**R-8 — Sin diseño visual definido.** No hay maquetas ni guía visual más allá de la estructura de `docs/propuesta/interfaz.md`. Los requisitos de diseño se limitan a una columna en pantallas estrechas, ausencia de desplazamiento horizontal y tema claro u oscuro del sistema.

**R-9 — Lenguas del proyecto.** La documentación dirigida a personas (README, PRD, backlog) se redacta en español; el código, las especificaciones de API, los esquemas de datos y los mensajes de commit, en inglés.

---

## 9. Métricas de éxito

**Nota previa.** El producto no incluye analítica, telemetría ni instrumentación de uso, y la validación es un caso de estudio de una sola persona. Lo que sigue se comprueba con tests automáticos, con los datos semilla o con observación manual. Lo que exigiría uso real sostenido o varias personas queda declarado como no medible en este MVP.

### 9.1 Métrica primaria

**La propietaria llega a una reunión semestral de evaluación con el informe del periodo generado por la aplicación, sin reconstruir de memoria, y el informe incluye los logros de los dos primeros meses del periodo con su resultado y sus evidencias.**

No medible en este MVP. Exige haber registrado el trabajo real durante un periodo de evaluación completo (seis meses) y llegar a la reunión, y el MVP se construye y entrega dentro del calendario del curso con datos semilla ficticios. Construir el producto no equivale a validarlo: los proxies de 9.2 comprueban que el producto es capaz de producir ese resultado, no que la usuaria lo obtenga.

### 9.2 Proxies comprobables ahora

**P-1 — Flujo principal de extremo a extremo.** Sujeto: un test E2E automatizado y, como comprobación manual, la propietaria (conoce el producto). Escenario: el flujo de 4.1 con sesión iniciada. Umbral: el test pasa completo; la tarea cerrada aparece en Logros, en Detalle por objetivo dentro de su objetivo y en los totales de completadas y logros del resumen. Falla si falta en cualquiera de los tres sitios.

**P-2 — Fidelidad del informe.** Sujeto: un test automatizado. Escenario: informe de un periodo fijo sobre los datos semilla. Umbral: los cuatro totales del resumen coinciden exactamente con un recuento independiente de los datos semilla preparado a mano; el orden de las fortalezas coincide con el esperado; dos exportaciones del mismo periodo son idénticas byte a byte. Una sola diferencia es un fallo.

**P-3 — Escenario fundacional: no perder el principio del periodo.** Sujeto: un test automatizado. Escenario: datos semilla ficticios que cubren el periodo enero–junio de un año con, al menos, un logro completado en enero con resultado, evidencias, objetivo y una competencia `[SUPUESTO]` sobre la composición de los datos semilla. Tarea: generar el informe "Enero – junio". Umbral: ese logro aparece en Logros destacados con su resultado y evidencias, en el grupo de su objetivo en Detalle por objetivo, y su competencia figura en Fortalezas con su ID. Falla si falta cualquiera de los cuatro.

**P-4 — Reproducción por un revisor externo.** Sujeto: una persona que ve el producto por primera vez (por ejemplo, quien revise la entrega del curso). Escenario: solo con el README. Tarea: instalar en local, iniciar sesión con las credenciales de prueba, recorrer el flujo principal y ejecutar la suite de tests. Umbral: lo consigue sin pedir ayuda. Falla si necesita preguntar algo o modificar ficheros que el README no indica. `[SUPUESTO]` sobre la disponibilidad de un revisor que lo haga y lo comunique.

**P-5 — Registro sin salir del Diario.** Sujeto: un test E2E y, en comprobación manual, la propietaria. Escenario: una fecha nueva sin entrada. Tarea: registrar una entrada con una tarea nueva vinculada a un objetivo nuevo y otra tarea existente marcada como `Completada`. Umbral: 0 cambios de pestaña y ningún campo obligatorio fuera de los de RNF-1. Falla si cualquier paso exige ir a Tareas u Objetivos.

### 9.3 Indicadores de salud

**S-1 — Abandono del registro diario. NO MEDIBLE EN ESTE MVP.** Es el riesgo principal (JTBD-1 sostiene a los demás). El indicador natural sería la proporción de días laborables con entrada durante semanas de uso real. Exige uso real sostenido con datos propios, y en este MVP la única usuaria es la propia constructora, que durante el curso trabaja sobre datos semilla y tiene un incentivo evidente para usarlo. No se pone un sustituto.

**S-2 — Corrupción de estados al rellenar fechas pasadas. MEDIBLE.** Se mide con los tests de integridad de RNF-6: deben pasar todos en cada ejecución de la suite. Un fallo indica que el historial ya no es fiable para el informe.

**S-3 — Descuadre entre el informe y los datos. MEDIBLE.** Se mide con P-2 sobre los datos semilla en cada ejecución de la suite. Solo cubre los casos representados en los datos semilla.

**Consecuencia.** El MVP no puede detectar que la usuaria deje de registrar, que los informes reales no le sirvan en la reunión, ni que los datos reales contengan casos que los datos semilla no cubren. Tampoco puede avisar de una pérdida de datos, porque no hay copias de seguridad. No existe ninguna alarma para estos fallos.

### 9.4 Anti-métricas

Explícitamente **no** se mide ni se muestra: tiempo dedicado a cada tarea o jornada, número de tareas o entradas por día como objetivo, rachas de días consecutivos, puntuaciones de productividad, comparaciones con otras personas ni ningún dato de uso enviado fuera de la instancia. Medirlas convertiría el diario en un instrumento de control y de presión, justo lo que el producto rechaza al excluir a responsables y equipos.

### 9.5 Señales de fracaso

- Para registrar el día hay que pasar por Tareas u Objetivos, o la usuaria deja la nota en blanco de forma sistemática porque anotar le cuesta.
- Antes de la reunión, la usuaria reescribe a mano buena parte del Markdown exportado o vuelve a buscar en otras herramientas para completarlo.
- Los totales del informe no coinciden con un recuento manual, o dos exportaciones del mismo periodo difieren.
- Aparecen peticiones de compartir el diario con responsables, de comentarios o de roles: el producto está atrayendo al no-usuario.

---

## 10. Puntos abiertos

Ninguno de estos puntos reabre el alcance: todos cuestionan bordes o consecuencias de funcionalidades ya incluidas.

**PA-1 — Fusión con una tarea que ya está en la entrada.** F1 dice que guardar en una fecha con entrada fusiona los elementos y, a la vez, que una tarea no puede aparecer dos veces en una entrada. No está definido qué pasa si el nuevo guardado incluye una tarea que ya tiene elemento en la entrada existente: rechazar el guardado, sustituir la nota y el estado, o concatenar las notas. Mientras tanto, RF-10 solo se comprueba con tareas distintas.
_Para decidirlo hace falta:_ que la propietaria elija una de las tres conductas y el mensaje que verá la usuaria.

**PA-2 — Efecto de eliminar una entrada o quitar un elemento sobre el estado de la tarea.** F1 dice que eliminar una entrada conserva sus tareas, pero no qué pasa con su estado y su fecha de finalización si la entrada eliminada era la más reciente que las mencionaba (por ejemplo, la que la dejó `Completada`). Lo mismo al quitar un elemento al editar una entrada. RF-12 recalcula el estado al guardar; nada dice si se recalcula al eliminar.
_Para decidirlo hace falta:_ decidir si el estado se recalcula a partir de la entrada restante más reciente o se conserva tal cual, y qué ocurre con una tarea que se queda sin entradas.

**PA-3 — Fecha de finalización al completar desde el Diario, y datos de tarea editados desde fechas pasadas.** F3 fija la regla de la fecha de finalización solo para los cambios hechos en Tareas. No está definido qué fecha se fija al marcar `Completada` en una entrada (la fecha de la entrada parece lo natural), ni si una tarea ya `Completada` que vuelve a marcarse `Completada` en una entrada posterior conserva su fecha o la mueve. Tampoco está definido si el objetivo, las competencias, el resultado, las evidencias y la marca de logro editados desde una entrada de fecha pasada sobrescriben los valores actuales (la regla de RF-12 solo protege el estado).
_Para decidirlo hace falta:_ que la propietaria fije la fecha de finalización en ambos casos y si la protección de RF-12 se extiende a los demás datos de la tarea.

**PA-4 — Inicio exacto de "Últimos 6 meses".** El alcance define una ventana móvil que termina hoy, pero no su primer día. Con hoy = 2026-11-22 puede empezar el 2026-05-22 o el 2026-05-23, y hay que decidir qué pasa cuando el día no existe en el mes de inicio (por ejemplo, hoy = 31 de agosto).
_Para decidirlo hace falta:_ una regla única de cálculo del día de inicio, que se fijará con un test.

**PA-5 — Resuelto.** Los empates de orden se deshacen por ID de tarea ascendente (en Detalle por objetivo, por el ID de tarea más bajo de cada grupo) y las tareas sin entradas van al final de la lista de Tareas; queda integrado en RF-20, RF-34 y RF-36. Se conserva el identificador para no renumerar los demás puntos.

**PA-6 — Objetivos que entran en Detalle por objetivo y recuento de entradas por competencia.** El universo de Logros destacados y del total de logros ya está fijado (RF-33, RF-34). Falta decidir si los objetivos archivados aparecen en Detalle por objetivo cuando tienen tareas trabajadas en el periodo, si se muestran objetivos sin ninguna tarea trabajada en el periodo, y cómo se cuentan las "entradas" de una competencia en Fortalezas (entradas distintas o elementos). Además, al combinar RF-34 con el cálculo del intervalo solo dentro del periodo, un logro completado en el periodo sin ninguna entrada en el rango (por ejemplo, cerrado desde Tareas) no tiene intervalo y tiene 0 entradas: falta decidir qué muestra su tarjeta en esos dos campos.
_Para decidirlo hace falta:_ una decisión de la propietaria para cada caso, que se añadirá a los datos de P-2.

**PA-7 — Resuelto.** El intervalo de fechas y el número de entradas de cada tarea en el informe se calculan solo con las entradas del periodo; queda integrado en RF-34 y RF-36. Se conserva el identificador para no renumerar los demás puntos.

**PA-8 — Descargas con confirmación y botones ocultos según el entorno.** `docs/propuesta/interfaz.md` dice que las descargas siempre piden confirmación y que los botones se ocultan si el entorno no permite guardar archivos. El alcance no recoge ninguna de las dos reglas. Parecen propias de un entorno de artefactos alojados, no de una aplicación web con su propio servidor. Mientras tanto, RF-38 no las incluye.
_Para decidirlo hace falta:_ que la propietaria confirme si se descartan (y se corrige `interfaz.md`) o si se mantienen, en cuyo caso deben pasar primero al alcance.

**PA-9 — Resuelto.** `interfaz.md` ya no tiene referencias rotas ni numeración huérfana; los elementos que el alcance excluye (recordar última pestaña, aviso de datos de ejemplo, botones de competencias más usadas) siguen descritos en `interfaz.md` como parte de la propuesta inicial, sin afectar al alcance ni al PRD. Se conserva el identificador para no renumerar los demás puntos.

**PA-10 — Validaciones de entrada sin definir.** El alcance no dice si la nota de un elemento es obligatoria (RNF-1 asume que no), si se pueden registrar entradas con fecha futura, cómo se comporta un rango personalizado con una de las dos fechas vacía, ni si el ID de una tarea eliminada puede volver a asignarse (RF-15 solo garantiza que no cambia ni se duplica).
_Para decidirlo hace falta:_ una decisión de la propietaria para cada caso, con el mensaje de error correspondiente.

**PA-11 — Cierre y caducidad de la sesión.** El alcance exige inicio de sesión, pero no menciona el cierre de sesión ni cuánto dura una sesión. Sin cierre de sesión, en un equipo compartido los datos privados quedan expuestos.
_Para decidirlo hace falta:_ confirmar si "Cerrar sesión" forma parte del requisito transversal de inicio de sesión (sin ser una funcionalidad nueva) y si hay caducidad por inactividad.

**PA-12 — Umbrales marcados como supuesto.** Los tiempos de RNF-2, el volumen de RNF-3, el ancho de RNF-8, los navegadores de RNF-9, el idioma de RNF-10, el teclado de RNF-11, el formato de fecha del nombre del fichero (RF-38) y los contadores sin filtro de periodo (RF-29) no vienen de ninguna fuente; son propuestas.
_Para decidirlo hace falta:_ que la propietaria confirme o ajuste cada cifra; mientras tanto, se usan como objetivo de prueba sin presentarlos como validados.
