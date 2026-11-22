# Alcance del MVP — <Nombre del proyecto>

**Fecha de cierre del alcance:** <AAAA-MM-DD>
**Estado:** <Borrador | Cerrado a esta fecha>

> **Cómo usar esta plantilla.** Sustituye cada `<marcador>` por contenido propio y **borra todas las guías** (los bloques que empiezan por "Guía:", incluida esta) antes de dar el documento por cerrado. Si una sección no aplica, déjala con una frase que explique por qué, en lugar de eliminarla.

---

## 1. Problema

<Describe en 2-4 frases qué situación real se quiere resolver, quién la sufre y qué la hace costosa o frustrante hoy.>

Consecuencias:

- <Consecuencia 1: qué se pierde, se retrasa o se hace mal por culpa del problema.>
- <Consecuencia 2.>
- <Consecuencia 3.>

> **Guía:** describe el problema, no la solución. Si al leerlo ya se intuye la aplicación, estás adelantando la propuesta de valor. Evita cifras que no puedas respaldar.

## 2. Usuarios

**Usuario objetivo.** <Perfil de la persona que usará el producto, la situación en que lo usa y si es un solo usuario o varios.>

**Contexto de uso.**

- <Frecuencia y duración de las sesiones habituales.>
- <Momento o disparador en que se usa (por ejemplo, al final del día, antes de una reunión).>
- <Dispositivos o entornos de uso.>

**Quién no es usuario en este MVP.** <Perfiles que podrían esperar usarlo pero quedan fuera, y qué no se les ofrece.>

> **Guía:** si hay más de un perfil, añade un subapartado por perfil y marca cuál es el principal. Para un proyecto individual basta con uno.

## 3. Propuesta de valor

**Propuesta.** <Una descripción de 2-4 frases de qué es el producto y cómo resuelve el problema del apartado 1.>

**Valor para los usuarios.**

- <Beneficio 1, formulado desde el punto de vista del usuario.>
- <Beneficio 2.>
- <Beneficio 3.>

**Qué introduce el usuario y qué recibe.** <Entrada principal que da el usuario y salida principal que le devuelve el sistema.>

### Cómo sabríamos que funciona

> **Guía:** define señales observables que se puedan comprobar con una prueba o una revisión, no deseos. Evita cifras sin base; si pones un umbral, indica por qué. Cubre al menos el flujo principal, la integridad de los datos, la privacidad (si hay datos personales) y la verificabilidad por un revisor externo.

| Criterio                                   | Señal de que funciona                                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Flujo principal de extremo a extremo       | <Recorrido completo, desde la entrada del usuario hasta el resultado final esperado.>                         |
| <Criterio de calidad o rapidez de uso>     | <Señal observable.>                                                                                           |
| <Fidelidad o corrección de los resultados> | <Señal observable.>                                                                                           |
| <Integridad de los datos>                  | <Reglas que nunca deben romperse.>                                                                            |
| <Privacidad y acceso>                      | <Qué ocurre sin sesión o con otro usuario.>                                                                   |
| Verificabilidad                            | <Cómo un revisor reproduce el flujo principal en local: instalación, datos semilla y credenciales de prueba.> |

### Riesgos asumidos

> **Guía:** incluye solo los riesgos que has decidido aceptar de forma consciente, y qué haces (o qué renuncias a hacer) por ellos. Añade filas según haga falta.

| Riesgo                                                | Cómo se asume                                          |
| ----------------------------------------------------- | ------------------------------------------------------ |
| <Riesgo 1: qué podría salir mal o quedar sin cubrir.> | <Decisión tomada: mitigación, renuncia o seguimiento.> |
| <Riesgo 2.>                                           | <Decisión tomada.>                                     |

## 4. Alcance (in)

> **Guía:** funcionalidades **must-have** (imprescindibles), cada una expresable como historia de usuario. **should-have** (deseables), opcionales, que no sustituyen a ninguna must-have. Todo lo que no figure aquí queda fuera. Cada funcionalidad debe poder trazarse hasta una historia, entidades del modelo de datos, endpoints y un ticket.

### Must-have

| Id  | Funcionalidad  | Resumen                                                             |
| --- | -------------- | ------------------------------------------------------------------- |
| F1  | <Nombre corto> | <Comportamiento esencial y reglas de negocio clave, en 2-4 frases.> |
| F2  | <Nombre corto> | <Comportamiento esencial y reglas de negocio clave.>                |
| F3  | <Nombre corto> | <Comportamiento esencial y reglas de negocio clave.>                |
| F4  | <Nombre corto> | <Comportamiento esencial y reglas de negocio clave.>                |
| F5  | <Nombre corto> | <Comportamiento esencial y reglas de negocio clave.>                |

### Should-have (opcionales)

| Id  | Funcionalidad  | Resumen                            |
| --- | -------------- | ---------------------------------- |
| S1  | <Nombre corto> | <Qué añade y por qué es opcional.> |
| S2  | <Nombre corto> | <Qué añade y por qué es opcional.> |

### Requisitos transversales

- <Requisito que afecta a todas las funcionalidades (por ejemplo, mensajes de éxito y error, confirmación de borrados).>
- <Requisito de seguridad o privacidad.>
- Los secretos y credenciales reales nunca van al repositorio.

## 5. NO-alcance (out)

> **Guía:** enumera lo que alguien podría esperar razonablemente y se deja fuera de forma explícita: ideas recortadas de un diseño más amplio y mejoras futuras. Usa frases cortas y concretas. Termina con una línea que deje claro que todo lo no incluido en el apartado 4 también queda fuera.

- <Funcionalidad recortada 1.>
- <Funcionalidad recortada 2.>
- <Integración o capacidad que no se ofrece.>
- <Mejora futura no comprometida.>
- Todo lo que no figura en el apartado 4 queda fuera del MVP.

---

> **Guía — lista de comprobación antes de cerrar** _(bórrala al terminar)_
>
> - [ ] Cada must-have tiene un Id y se puede expresar como historia de usuario.
> - [ ] Los criterios de "Cómo sabríamos que funciona" son observables y comprobables.
> - [ ] Nada de lo que aparece en NO-alcance reaparece en el alcance (in), y viceversa.
> - [ ] No quedan marcadores `<...>` ni bloques de guía.
> - [ ] No hay datos confidenciales ni información personal real.
