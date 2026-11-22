# PRD — <Nombre del producto> MVP

> **Estado:** <Borrador | En revisión | Cerrado> · **Fecha:** <AAAA-MM-DD>
> **Base de alcance:** [alcance-mvp.md](./alcance-mvp.md). Ese documento manda: si este PRD y el alcance se contradicen, gana el alcance.
> **Nota de documento:** aquí no hay diseño técnico. Ni modelo de datos, ni arquitectura, ni endpoints. Solo qué debe hacer el producto y cómo se comprueba.

> **Cómo usar esta plantilla.** Sustituye cada `<marcador>` por contenido propio y **borra todas las guías** (los bloques que empiezan por "Guía:", incluida esta) antes de cerrar el documento. Si un apartado no aplica, déjalo con una frase que diga por qué en lugar de eliminarlo. Los apartados siguen el orden problema → usuarios → valor → alcance → requisitos → métricas → puntos abiertos, y cada uno apoya al siguiente.
>
> **Convenciones de identificadores:** `JTBD-n` (trabajos del usuario), `E<n>` (épicas), `RF-n` (requisitos funcionales), `RNF-n` (no funcionales), `R-n` (restricciones), `P-n` (proxies de éxito), `S-n` (indicadores de salud), `PA-n` (puntos abiertos). Marca con `[SUPUESTO]` cualquier dato, umbral o decisión que aún no esté validado.

---

## 1. Problema y contexto

<Describe en 2-4 frases la situación real, quién la sufre y por qué hoy se resuelve mal.>

El coste no es <la causa aparente>, sino sus consecuencias:

- **<Consecuencia 1>.** <Qué se pierde, se duplica o se retrasa. Incluye un episodio de referencia concreto si lo hay.>
- **<Consecuencia 2>.** <Idem.>

**Qué cambia y qué no.** <Qué desaparece gracias al producto y qué sigue existiendo aunque el producto exista. Declara con claridad lo que este MVP no resuelve ni pretende resolver.>

**Contexto de partida.** <Qué existe ya hoy en el producto o en el entorno, y qué está por construir.>

**Contexto de validación.** <Con quién o con qué se va a validar: clientes reales, un caso de estudio, usuarios de prueba. Si no hay uso real, dilo, y deja constancia de que ninguna afirmación del documento debe presentarse como validada por uso real.>

> **Guía:** describe el problema, no la solución. Evita cifras que no puedas respaldar. Si la validación es un caso de estudio y no un cliente, esta es la sección donde debe quedar escrito.

---

## 2. Usuarios y jobs-to-be-done

### Usuario primario

<Quién es la persona que usa el producto, en qué entorno y qué relación tiene con las demás partes. Indica dónde se cobra el valor (para quién y cuándo).>

**Perfil de referencia:** <Un ejemplo concreto y verosímil: tamaño, contexto, herramientas que usa hoy.>

### Jobs-to-be-done

| #      | Job                     | Situación                        | Resultado esperado                   |
| ------ | ----------------------- | -------------------------------- | ------------------------------------ |
| JTBD-1 | **<Qué quiere lograr>** | <Cuándo o en qué momento ocurre> | <Qué ve o consigue cuando se cumple> |
| JTBD-2 | **<...>**               | <...>                            | <...>                                |
| JTBD-3 | **<...>**               | <...>                            | <...>                                |

<Si hay trabajos que sostienen a los demás (por ejemplo, el que hace que quien escribe cobre en el momento, no solo quien lee), señálalo aquí.>

> **Guía:** cada job debe poder verificarse más adelante en algún requisito o métrica. Si hay un job que ningún requisito cubre, falta algo o sobra el job.

### No-usuarios, explícitamente

- **<Perfil que podría esperar usarlo>.** <Por qué no se diseña para él y qué se perdería si se hiciera.>
- **<Otro perfil>.** <Idem.>

---

## 3. Propuesta de valor

> **<Frase de una línea que resume la promesa del producto.>**

<Qué pregunta o problema concreto responde el producto y con qué cualidad (por ejemplo, sin coste social, sin esperas, sin configurar).>

### El intercambio que lo sostiene

<Qué da el usuario (esfuerzo, datos, atención) y qué recibe a cambio. Explica por qué el balance le compensa en el momento, no solo a largo plazo.>

De ahí el principio de diseño que no se negocia:

> **<Principio de diseño formulado en una sola frase.>**

<Qué ocurre si se rompe el principio y cómo suele acabar esa categoría de producto.>

### Posicionamiento

<Qué es el producto frente a lo que ya existe: sustituye, complementa o convive. Justifica la decisión, incluidos los costes de la alternativa descartada.>

### Qué es «<concepto clave>» aquí

<Si el producto depende de un término ambiguo (por ejemplo, "tiempo real", "inteligente", "seguro"), define aquí qué significa y qué no significa en este producto.>

---

## 4. Alcance / Fuera de alcance

> **Guía:** esta sección resume y debe coincidir con `alcance-mvp.md`, que es el documento que manda. De 3 a 5 funcionalidades must-have y como máximo 2 should-have. Todo lo que no figure en "Dentro" queda fuera. No copies aquí decisiones nuevas: si el alcance cambia, cambia primero `alcance-mvp.md`.

### 4.1 Dentro (la vertical)

**<Frase que describe el recorrido principal de punta a punta: entro, hago X, y otra persona/el sistema devuelve Y.>**

<Frase sobre el criterio de recorte: profundidad frente a amplitud.>

1. <Capacidad 1.>
2. <Capacidad 2.>
3. <Capacidad 3.>
4. <...>

### 4.2 Fuera, y por qué

| Excluido                    | Motivo                                                                         |
| --------------------------- | ------------------------------------------------------------------------------ |
| <Funcionalidad o capacidad> | <Por qué queda fuera, ligado al principio de diseño o a la propuesta de valor> |
| <...>                       | <...>                                                                          |

### 4.3 Supuestos declarados, no construidos

No son deuda oculta: son límites conocidos y aceptados.

1. **<Supuesto 1>.** <Qué se asume y por qué es razonable para este MVP, aunque no lo sea en un producto real.>
2. **<Supuesto 2>.** <...>

### 4.4 Limitación conocida frente al caso fundacional

<Si el episodio que motiva el producto no queda del todo cubierto por el MVP, dilo aquí: qué parte sí se cubre, qué parte depende de convenciones y qué se acepta conscientemente.>

---

## 5. Épicas del MVP

| Épica             | Qué agrupa                                      |
| ----------------- | ----------------------------------------------- |
| **E1 · <Nombre>** | <Funcionalidades o comportamientos que agrupa.> |
| **E2 · <Nombre>** | <...>                                           |
| **E3 · <Nombre>** | <...>                                           |

> **Guía:** cada funcionalidad must-have de `alcance-mvp.md` debe caer en una épica. Una épica puede agrupar varias funcionalidades, pero ninguna funcionalidad debe quedar fuera de todas ellas.

_Trazabilidad (opcional):_

| Funcionalidad del alcance | Épica | Requisitos     |
| ------------------------- | ----- | -------------- |
| F1 · <Nombre>             | E<n>  | RF-<n>, RF-<n> |
| F2 · <Nombre>             | E<n>  | RF-<n>         |

---

## 6. Requisitos funcionales

Nivel producto: qué debe hacer el sistema y cómo se comprueba. Cada requisito lleva su criterio de aceptación.

> **Guía:** un requisito = una obligación comprobable. Redáctalo como "El sistema debe…" o "Debe poder…". El criterio de aceptación debe poder suspender: sustituye los adjetivos ("rápido", "razonable", "evidente") por un umbral o un protocolo de comprobación. Incluye también requisitos negativos cuando formen parte de la identidad del producto ("no debe mostrar…").

### E1 · <Nombre de la épica>

<Si la épica ya está total o parcialmente construida, indícalo aquí y explica qué falta verificar.>

**RF-1 — <Título corto>.** <Qué debe hacer el sistema.>
_Aceptación:_ <Condición observable que lo da por cumplido, con valores concretos.>

**RF-2 — <Título corto>.** <...>
_Aceptación:_ <...>

### E2 · <Nombre de la épica>

**RF-3 — <Título corto>.** <...>
_Aceptación:_ <...> [SUPUESTO] <si el umbral o la decisión no está validada>

**RF-4 — <Título corto>.** <...>
_Aceptación:_ <...>

### E3 · <Nombre de la épica>

**RF-5 — <Título corto>.** <...>
_Aceptación:_ <...>

---

## 7. Requisitos no funcionales

> **Guía:** cubre, como mínimo y según apliquen: coste de uso del flujo principal, rendimiento o frescura, respuesta percibida, comportamiento ante fallos, escala objetivo, accesibilidad, privacidad, idioma, dispositivos y mensajes de error. Cada uno con un umbral o criterio comprobable. Marca `[SUPUESTO]` los umbrales no validados.

**RNF-1 — <Título>.** <Requisito con umbral numérico o criterio observable.> <Por qué importa para el producto.>

**RNF-2 — <Título>.** <...> [SUPUESTO]

**RNF-3 — <Título>.** <...>

---

## 8. Restricciones

**R-1 — <Título>.** <Decisión tomada o condición impuesta (tecnología, plazo, equipo, legal) y qué consecuencias tiene para el MVP.>

**R-2 — <Título>.** <...>

**R-3 — <Título>.** <...>

> **Guía:** incluye siempre, si aplican: la tecnología ya elegida, lo que ya está construido, las dependencias de terceros permitidas o prohibidas, la naturaleza de la validación (caso de estudio o cliente real), el criterio de recorte (amplitud frente a profundidad), el estado de las pruebas automáticas y las limitaciones de diseño visual. Si algo hoy no existe (por ejemplo, una base de pruebas automáticas) y su coste forma parte del MVP, dilo expresamente.

---

## 9. Métricas de éxito

**Nota previa.** <Qué se mide y qué no, y por qué. Si el producto excluye deliberadamente medir personas, instrumentación o informes, aclara aquí que lo que sigue se observa manualmente o queda declarado como no medible.>

### 9.1 Métrica primaria

**<Resultado observable que valida la hipótesis del producto, con el plazo y el sujeto que lo observa.>**

<Indica si se puede medir en este MVP. Si requiere usuarios reales y solo hay un caso de estudio, escribe «no medible en este MVP» y explica que construir no equivale a validar.>

### 9.2 Proxies comprobables ahora

**P-1 — <Título>.** <Prueba concreta con sujeto, escenario, tarea y umbral. Indica si el sujeto conoce el producto o lo ve por primera vez.> [SUPUESTO]

**P-2 — <Título>.** <...>

**P-3 — <Título>.** <Escenario basado en el episodio fundacional, con un criterio que pueda fallar de verdad.>

### 9.3 Indicadores de salud

**S-1 — <Riesgo principal>. <MEDIBLE | NO MEDIBLE EN ESTE MVP>.** <Indicador natural, qué exige medirlo y, si no es posible, por qué. No pongas un sustituto de adorno.>

**S-2 — <Riesgo secundario>. <MEDIBLE | NO MEDIBLE EN ESTE MVP>.** <...>

**Consecuencia.** <Qué fallos no puede detectar el MVP por sus propias decisiones de alcance. Dilo sin maquillar, para que nadie suponga que existe una alarma que no existe.>

### 9.4 Anti-métricas

Explícitamente **no** se mide ni se muestra: <lista de cosas que, medidas, convertirían el producto en algo que el documento rechaza>.

### 9.5 Señales de fracaso

- <Comportamiento observable que indica que la hipótesis falla.>
- <Otra señal.>
- <Señal de que el producto atrae al no-usuario.>

---

## 10. Puntos abiertos

> **Guía:** aquí van las decisiones de producto y los huecos de definición que no se resuelven ahora, para que no se resuelvan a la ligera ni se pierdan. Nada de esta sección reabre el alcance: si un punto cuestiona un elemento incluido, aclara que cuestiona sus bordes o consecuencias, no su inclusión. Un buen punto abierto nombra el conflicto entre dos partes del documento, explica por qué importa y dice qué hace falta para decidirlo.

**PA-1 — <Título que nombra el conflicto o el hueco>.** <Qué parte del documento promete una cosa y cuál la contradice o la deja sin definir. Qué se construye mientras tanto.>
_Para decidirlo hace falta:_ <Datos, decisión o experimento necesario.>

**PA-2 — <Título>.** <...>
_Para decidirlo hace falta:_ <...>

**PA-3 — <Título>.** <Punto sin decisión pendiente: solo hay que reflejarlo en la estimación o en otro documento.>
_No hay nada que decidir:_ <qué hay que corregir.>

---

> **Guía — lista de comprobación antes de cerrar** _(bórrala al terminar)_
>
> - [ ] El PRD no contradice `alcance-mvp.md`; si lo hace, gana el alcance y se corrige el PRD.
> - [ ] Cada funcionalidad must-have cae en una épica y tiene al menos un requisito con criterio de aceptación.
> - [ ] Cada job (JTBD) se refleja en algún requisito o métrica.
> - [ ] Ningún criterio de aceptación depende de un adjetivo sin umbral o protocolo.
> - [ ] Los supuestos no validados llevan `[SUPUESTO]`.
> - [ ] La sección de métricas distingue lo medible de lo no medible, y no vende como validado lo que no lo está.
> - [ ] Los puntos abiertos nombran el conflicto y lo que hace falta para decidirlos.
> - [ ] No hay diseño técnico (modelo de datos, arquitectura, endpoints) en el documento.
> - [ ] Identificadores, nombres y cifras coinciden con el README y con el resto de documentos.
> - [ ] No quedan marcadores `<...>` ni bloques de guía.
> - [ ] No hay datos confidenciales ni información personal real.
