# ADR-0002: Prácticas de ingeniería — Clean Architecture, TDD y OWASP Top 10

> **Estado:** Aceptada · **Fecha:** 2026-11-22

---

## Contexto

Además del stack tecnológico ([ADR-0001](./0001-stack-tecnologico.md)), el proyecto adopta prácticas de ingeniería transversales, válidas con independencia de la herramienta concreta. TDD ya estaba recogida en `docs/base-standards.md`; esta decisión añade **Clean Architecture** como forma de estructurar `apps/api` y **OWASP Top 10** como lista de comprobación de seguridad por defecto en cada funcionalidad, no como una auditoría aparte al cerrar el MVP.

El dominio tiene reglas de negocio no triviales con test propio en el PRD (fusión de entradas, protección por fecha al rellenar días pasados, recálculo al eliminar, ID atómico) que conviene poder probar sin arrancar Nest, Prisma ni una base de datos real — ese es el motivo práctico de Clean Architecture aquí, no una preferencia estética.

## Decisión

**Clean Architecture en `apps/api`**, con cuatro capas y la dependencia siempre hacia dentro:

```
┌─────────────────────────────────────────────┐
│ interfaz (controllers, DTOs, guards de Nest)  │  depende de →
│ ┌───────────────────────────────────────────┐│
│ │ infraestructura (Prisma, connect-pg-simple) ││  depende de →
│ │ ┌─────────────────────────────────────────┐││
│ │ │ aplicación (casos de uso)                │││  depende de →
│ │ │ ┌───────────────────────────────────────┐│││
│ │ │ │ dominio (entidades, reglas, puertos)  ││││
│ │ │ └───────────────────────────────────────┘│││
│ │ └─────────────────────────────────────────┘││
│ └───────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

- **Dominio**: clases/funciones TypeScript planas (sin decoradores de Nest ni de Prisma) con las entidades (`Entry`, `Task`, `Objective`: entrada, tarea y objetivo) y las reglas de negocio de las RF (fusión, protección por fecha, recálculo). Define **puertos** (interfaces) para lo que necesita de fuera, por ejemplo `TaskRepository`.
- **Aplicación**: casos de uso (p. ej. `SaveDailyEntry`, `GeneratePeriodReport`) que orquestan el dominio y los puertos. Sin SQL ni HTTP.
- **Infraestructura**: implementa los puertos del dominio con Prisma/PostgreSQL y la sesión con `connect-pg-simple`. Es la única capa que conoce el esquema de base de datos.
- **Interfaz**: controladores, DTOs, guards y pipes de NestJS. Traduce HTTP a casos de uso y de vuelta; no contiene reglas de negocio.
- La inyección de dependencias de NestJS conecta las capas: los casos de uso declaran el puerto (interfaz del dominio) y el módulo de infraestructura provee la implementación concreta vía _token_ de DI. El dominio y la aplicación no importan nada de `@nestjs/*` ni de `@prisma/client`.
- En el frontend no se replica la misma separación formal (React no se presta a ello de forma natural), pero se mantiene el principio: la lógica de las RF que no es puramente de interfaz (por ejemplo, qué competencias sugerir, cómo se calculan los contadores en vivo) vive en funciones/hooks puros, separados de los componentes, para poder probarlos con Vitest sin montar el DOM.

**TDD** (ya en `docs/base-standards.md`): se aplica capa por capa — las reglas de dominio y los casos de uso se prueban primero con tests unitarios puros (sin Nest ni base de datos), y los adaptadores de infraestructura se prueban después contra PostgreSQL real.

**OWASP Top 10 (2021) por defecto**, leído para este producto:

| Categoría                                      | Cómo se cubre aquí                                                                                                                                                                                                   |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A01 Broken Access Control                      | RF-2/RF-3: toda operación exige sesión y se filtra por usuaria autenticada a nivel de caso de uso, no solo en el controller — un test cubre cada operación de lectura y escritura (ya exigido por el PRD)            |
| A02 Cryptographic Failures                     | Contraseñas de las credenciales semilla con hash (bcrypt/argon2), nunca en texto plano; secretos solo en variables de entorno, nunca en el repositorio (ya en el alcance)                                            |
| A03 Injection                                  | Prisma parametriza las consultas; ninguna concatenación de SQL crudo. Si hace falta `$queryRaw` (p. ej. para la secuencia atómica de IDs), siempre con parámetros, nunca con interpolación de strings                |
| A04 Insecure Design                            | La caducidad de sesión por inactividad (RF-1) y el bloqueo de eliminación con referencias (RF-25, RF-30) son reglas de dominio con test, no parches posteriores                                                      |
| A05 Security Misconfiguration                  | Imágenes Docker con usuario no root y base mínima; sin endpoints de depuración ni stack traces expuestos en producción; sin `CORS`: la SPA y la API comparten origen (`/` y `/api`, decisión D-1 de la arquitectura) |
| A06 Vulnerable and Outdated Components         | `pnpm audit` (o equivalente) en el pipeline de GitHub Actions antes de construir las imágenes                                                                                                                        |
| A07 Identification and Authentication Failures | Sin registro público ni recuperación de contraseña (ya fuera de alcance); regenerar el identificador de sesión al iniciar sesión; límite de intentos razonable en el login                                           |
| A08 Software and Data Integrity Failures       | `pnpm-lock.yaml` fija versiones; las imágenes Docker se construyen desde el pipeline de CI, no se publican a mano                                                                                                    |
| A09 Security Logging and Monitoring Failures   | Deliberadamente ligero en el MVP (una sola usuaria, sin operación 24/7): se registran los fallos de autenticación, sin más infraestructura de observabilidad                                                         |
| A10 Server-Side Request Forgery                | No aplica: las evidencias de una tarea son texto o enlaces que se muestran como enlace pulsable, nunca se obtienen (`fetch`) desde el servidor con una URL que escriba la usuaria                                    |

## Alternativas consideradas

| Alternativa                                                                                                          | Por qué se descarta                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Arquitectura en capas sin separación estricta de dependencias (p. ej. servicios de Nest que llaman directo a Prisma) | Mezclaría reglas de negocio con detalles de Prisma, dificultando probar la fusión/protección por fecha sin una base de datos real                                       |
| Hexagonal/Ports-and-Adapters formal también en el frontend                                                           | React no tiene un contenedor de DI natural para eso; forzarlo añadiría ceremonia sin beneficio proporcional al tamaño del frontend de este MVP                          |
| Revisión de seguridad puntual al final del MVP en vez de OWASP por defecto desde el diseño                           | Encontrar un problema de control de acceso o de inyección al final obligaría a rehacer piezas ya probadas; más barato decidir con OWASP en mente desde cada caso de uso |
| Programa de logging/monitorización completo (SIEM, alertas)                                                          | Desproporcionado para una sola usuaria y un MVP de TFM; se deja fuera de forma explícita (A09)                                                                          |

## Consecuencias

- Cada caso de uso tiene una interfaz de repositorio (puerto) además de la implementación con Prisma, lo que añade algo de código de más frente a llamar a Prisma directamente, a cambio de que el dominio sea testeable sin base de datos.
- El equipo (una sola persona) debe mantener la disciplina de no importar `@nestjs/*` ni `@prisma/client` en las capas de dominio/aplicación; conviene reforzarlo con una regla de ESLint de límites de import cuando se scaffoldee `apps/api`.
- OWASP Top 10 como checklist por defecto no sustituye una auditoría de seguridad externa; para un TFM de una sola usuaria se considera proporcionado.
