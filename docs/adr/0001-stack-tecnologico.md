# ADR-0001: Stack tecnológico del MVP

> **Estado:** Aceptada · **Fecha:** 2026-11-22

---

## Contexto

El alcance ([alcance-mvp.md](../prd/alcance-mvp.md)) y el PRD ([mvp.md](../prd/mvp.md)) están cerrados y fijan: una sola usuaria privada, sin colaboración ni roles; reglas de integridad estrictas con test propio (IDs de tarea secuenciales y atómicos sin duplicados ni con peticiones simultáneas — RF-15; aislamiento por usuaria — RF-3; exportación de informe determinista byte a byte — RF-39); y un requisito de verificabilidad para un revisor externo (instalación local reproducible, datos semilla, credenciales de prueba).

A eso se añade un requisito fuera del alcance de producto pero real para la entrega del TFM: la aplicación tiene que publicarse en un entorno en la nube para que el evaluador la vea funcionando, y se busca de forma explícita practicar Kubernetes en ese despliegue, aun con poca experiencia previa.

El repositorio no tiene código de aplicación todavía; solo el gestor de paquetes (`pnpm`), lint, formateo y ganchos de git ya configurados (`CLAUDE.md`).

## Decisión

| Pieza                           | Elección                                                                  | Motivo                                                                                                                                                                                                      |
| ------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Monorepo                        | `pnpm` workspaces, sin Nx ni Turborepo                                    | Solo `apps/api` + `apps/web` + un paquete de tipos/DTOs compartido; no hay build lento que justifique caché de build todavía                                                                                |
| Lenguaje                        | TypeScript en todo el repositorio                                         | Tipado compartido entre frontend y backend                                                                                                                                                                  |
| Backend                         | NestJS (Node.js)                                                          | Su estructura modular (módulos/servicios/guards) encaja con la lógica de dominio de las reglas de fusión y protección por fecha (RF-10, RF-12, RF-14)                                                       |
| Frontend                        | React + Vite                                                              | Estándar, buen soporte de tests con Vitest y Testing Library                                                                                                                                                |
| Base de datos                   | PostgreSQL                                                                | Transacciones y restricciones de unicidad resuelven de forma nativa RF-3 y RF-15                                                                                                                            |
| Acceso a datos                  | Prisma                                                                    | El ID de tarea secuencial por usuaria (RF-15) se implementa con transacción explícita (`$transaction`/`$queryRaw`), no con `autoincrement()` simple                                                         |
| Sesión                          | `connect-pg-simple` sobre la misma base PostgreSQL, sin Redis             | Con una sola usuaria y un solo reemplazo en producción, no hace falta un segundo almacén en memoria; la caducidad por inactividad (RF-1) se resuelve consultando la actividad de la sesión en la misma base |
| Tests backend                   | Jest + supertest                                                          | Idiomático en Nest (`@nestjs/testing`), sin configuración adicional para decoradores                                                                                                                        |
| Tests frontend                  | Vitest + React Testing Library                                            | —                                                                                                                                                                                                           |
| Tests E2E                       | Playwright                                                                | Cubre el flujo principal de punta a punta exigido por el criterio de aceptación del alcance                                                                                                                 |
| Contenedores                    | Docker (imagen de `api` y de `web`)                                       | —                                                                                                                                                                                                           |
| Entorno local / revisor externo | `docker compose`                                                          | Reproducibilidad exigida por el README (RF de verificabilidad)                                                                                                                                              |
| CI                              | GitHub Actions: construye y publica las imágenes Docker de `api` y `web`  | —                                                                                                                                                                                                           |
| Despliegue en la nube           | Kubernetes en DOKS (DigitalOcean Kubernetes), control plane gestionado    | Destino real de evaluación; aprendizaje de Kubernetes buscado de forma explícita, sin sumarle además el aprendizaje de montar un clúster a mano                                                             |
| Despliegue a DOKS               | Manual (`kubectl apply` o similar) en esta fase, no automatizado desde CI | Decisión explícita: el pipeline de CI construye las imágenes, pero el `kubectl apply` al clúster se ejecuta a mano cuando llega el momento                                                                  |
| PostgreSQL en DOKS              | Dentro del propio clúster (`StatefulSet` + `PersistentVolumeClaim`)       | Decisión explícita para practicar el ciclo de vida de un `StatefulSet` en Kubernetes                                                                                                                        |

## Alternativas consideradas

| Alternativa                                                            | Por qué se descarta                                                                                                                                                                         |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nx o Turborepo para el monorepo                                        | Solo dos aplicaciones y un paquete compartido; añadir un orquestador de build es complejidad sin beneficio en este tamaño                                                                   |
| TypeORM o Drizzle como capa de acceso a datos                          | Prisma da migraciones declarativas más cómodas; el único punto fino (secuencia atómica de IDs) se resuelve igual con una transacción explícita                                              |
| Vitest también en el backend (un solo test runner en todo el monorepo) | NestJS viene configurado con Jest por defecto; forzar Vitest exige configurar soporte de decoradores (SWC) sin aportar nada al dominio                                                      |
| Contract testing formal (p. ej. Pact) entre frontend y backend         | Los construye la misma persona; un test de integración HTTP con supertest contra la app real ya verifica el contrato sin la carga de mantener contratos Pact                                |
| PostgreSQL gestionado por el proveedor cloud, fuera del clúster        | Reduciría el riesgo de pérdida de datos y la superficie de aprendizaje, pero se descarta porque el objetivo explícito es practicar `StatefulSet`/`PVC` en Kubernetes                        |
| k3s manual sobre una VPS en vez de un control plane gestionado         | Con poca experiencia previa en Kubernetes, acumular el aprendizaje de bootstrapear un clúster y el de desplegar la aplicación a la vez aumenta el riesgo de entrega sin aportar al producto |
| Redis como almacén de sesión                                           | Con una sola usuaria y sin necesidad de escalar horizontalmente, añadir un segundo almacén solo para sesiones no se justifica frente a reutilizar PostgreSQL                                |
| Despliegue continuo automatizado a DOKS desde GitHub Actions           | Decisión explícita de la propietaria del proyecto: el primer despliegue y los siguientes, en esta fase, se hacen a mano para controlar el proceso mientras se aprende Kubernetes            |

## Consecuencias

- El backend usa Jest y el frontend usa Vitest: dos configuraciones de test en el monorepo en vez de una sola, a cambio de evitar configuración no estándar en Nest.
- Postgres dentro del clúster implica gestionar manualmente el `PersistentVolumeClaim` y sus backups; el riesgo se acepta porque los datos son semilla ficticia y reproducible — el script de seed debe ser idempotente para poder regenerar los datos si se pierde el volumen, en lugar de depender de una copia de seguridad real.
- El pipeline de CI deja las imágenes construidas y publicadas, pero no despliega: el paso a DOKS depende de una acción manual de la propietaria, que debe documentarse en el README para que sea repetible.
- Elegir un control plane gestionado (DOKS) en vez de un clúster autogestionado reduce lo que hay que aprender a la vez, a cambio de depender de un proveedor cloud de pago.
