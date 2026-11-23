# E1-1 · Entrar en mi diario privado y salir de él

| Campo            | Valor                                                  |
| ---------------- | ------------------------------------------------------ |
| ID               | `E1-1` (etiqueta provisional, **pendiente de ID**)     |
| Épica            | E1 · Acceso, privacidad y marco común                  |
| Funcionalidad    | Requisitos transversales del alcance (sin F-id propio) |
| Origen en el PRD | RF-1, RF-2, RF-3 · R-6                                 |
| Depende de       | Ninguna historia                                       |
| Tickets          | 7 (ver [Tickets](#tickets))                            |

## Historia

Como propietaria del diario, quiero entrar con mi cuenta, salir cuando termine y que la sesión se cierre sola si la dejo abierta, para que nadie más pueda ver ni tocar lo que escribo sobre mi trabajo.

## Criterios de aceptación

1. **Acceso con la cuenta semilla.** Dadas las credenciales de prueba documentadas en el README, cuando inicio sesión, entonces llego a la pestaña Diario y veo la navegación con las cuatro pestañas: Diario, Tareas, Objetivos e Informe.
2. **Contraseña incorrecta.** Cuando inicio sesión con una contraseña incorrecta, entonces el acceso se rechaza con un mensaje de error, no se muestra ningún dato y el mensaje no indica si el usuario existe.
3. **Sin alta ni recuperación.** La pantalla de acceso no contiene enlaces ni formularios de registro de cuentas, de recuperación de contraseña ni de inicio de sesión con proveedores externos.
4. **Cerrar sesión desde cualquier pestaña.** La acción "Cerrar sesión" está visible en las cuatro pestañas. Cuando la pulso, vuelvo a la pantalla de acceso, y cualquier petición posterior sin iniciar sesión de nuevo recibe `401`.
5. **Caducidad por inactividad.** Dado que han pasado 30 minutos sin ninguna acción, cuando hago la siguiente operación, entonces se rechaza como sin sesión y la interfaz me pide iniciar sesión de nuevo. Si hago una acción antes de los 30 minutos, el conteo de inactividad vuelve a empezar. El test controla el reloj; no espera 30 minutos reales.
6. **Toda operación exige sesión.** Cualquier petición sin sesión recibe `401` y no devuelve datos. Un test lo comprueba para cada operación de lectura y escritura que exista; cada historia posterior añade sus operaciones a ese test.
7. **Aislamiento entre usuarios.** Con los dos usuarios de prueba de los datos semilla, ninguno ve en ninguna vista, contador, informe ni exportación registros del otro, y cualquier intento de modificar o eliminar un registro del otro falla sin alterarlo. El test de aislamiento empieza aquí y cada historia posterior lo amplía con los registros que introduce (entradas, tareas, objetivos, competencias sugeridas e informe).

## Fuera de esta historia

- El contenido de las pestañas: cada una llega con su propia historia.
- Registro público de cuentas, recuperación de contraseña, proveedores externos y roles (NO-alcance).

## Notas

- Esta historia fija las dos reglas que heredan todas las demás: "toda operación exige sesión" (criterio 6) y "solo se ven y se modifican los registros propios" (criterio 7). Por eso las demás historias solo las recuerdan en un criterio de privacidad.
- Los datos semilla deben incluir desde aquí a la usuaria y a un segundo usuario de prueba, con credenciales ficticias (R-6).

## Tickets

IDs provisionales `E1-1.<n>`, **pendientes de ID** como su historia. Cada ticket hereda los criterios que indica y cumple, además de lo suyo, el Definition of Done común del [backlog](../backlog-mvp.md#por-qué-solo-algunas-traen-tickets). Las referencias de diseño apuntan a documentos ya aprobados: el ticket no las rediseña.

Esta historia, por ser la primera del orden, carga con el esqueleto del monorepo y con la base de pruebas (R-4).

| Ticket                                                        | Capa          | Hereda (criterios)             | Depende de     | Talla | Riesgo |
| ------------------------------------------------------------- | ------------- | ------------------------------ | -------------- | ----- | ------ |
| [E1-1.1](#e1-11--monorepo-y-esqueleto-de-appsapi)             | Backend       | Base de 6 y 7                  | —              | L     | Medio  |
| [E1-1.2](#e1-12--prisma-postgresql-local-y-tablas-de-acceso)  | Base de datos | Base de 6 y 7                  | E1-1.1         | M     | Bajo   |
| [E1-1.3](#e1-13--datos-semilla-idempotentes-con-dos-usuarias) | Base de datos | 1, 7                           | E1-1.2         | S     | Bajo   |
| [E1-1.4](#e1-14--iniciar-y-cerrar-sesión-en-la-api)           | Backend       | 2 y 4 (lado servidor)          | E1-1.3         | L     | Alto   |
| [E1-1.5](#e1-15--sesión-obligatoria-caducidad-y-aislamiento)  | Backend       | 5 (lado servidor), 6, 7        | E1-1.4         | M     | Alto   |
| [E1-1.6](#e1-16--esqueleto-de-appsweb-y-cliente-http)         | Frontend      | Base de 5 (lado interfaz)      | E1-1.1         | M     | Bajo   |
| [E1-1.7](#e1-17--pantalla-de-acceso-y-marco-de-pestañas)      | Frontend      | 1, 2, 3, 4 y 5 (lado interfaz) | E1-1.4, E1-1.6 | M     | Medio  |

### E1-1.1 · Monorepo y esqueleto de `apps/api`

- **Capa:** backend (y raíz del monorepo).
- **Origen:** R-4 · ADR-0001, ADR-0002 · [arquitectura](../../arquitectura.md) §4, §5.1, §5.7 (fila "Errores").
- **Entrega:** workspaces de `pnpm` con `apps/api` y `packages/shared`; aplicación NestJS con las carpetas `domain/`, `application/`, `infrastructure/` e `interface/`; regla de ESLint de límites de importación; Jest para unitarios y Jest + supertest para contrato; `pnpm test` ejecuta la suite real (sustituye el marcador actual y se actualiza la sección de comandos de `CLAUDE.md`); `GET /api/health`; filtro de errores que responde con el esquema `Error` de [`openapi.yaml`](../../api/openapi.yaml), incluidos `413` y `415`.
- **DoD específico:**
  - Los tests de contrato de `health` (`200` sin sesión), `413` y `415` se escriben antes que el código y se ven fallar.
  - Un test o una comprobación de lint demuestra que importar `@nestjs/*` o `@prisma/client` desde `domain/` o `application/` falla.
  - Ningún error devuelve trazas (OWASP A05).

### E1-1.2 · Prisma, PostgreSQL local y tablas de acceso

- **Capa:** base de datos.
- **Origen:** RF-1, RF-3 · [modelo de datos](../../modelo-de-datos.md) §3.2, §3.10, §4 y DM-8.
- **Entrega:** Prisma en `apps/api`; servicio `postgres` en `deploy/compose/`; primera migración, `add_auth`, con `app_user` y `session` (las migraciones se nombran en `snake_case` por su contenido; Prisma antepone la marca de tiempo); `.env.example` con las variables vacías (RNF-12); base de tests de integración contra PostgreSQL real, con una base aislada y limpieza entre tests.
- **DoD específico:**
  - El test de integración que comprueba que `username` repetido se rechaza se escribe antes que la migración.
  - La migración se aplica desde cero con `prisma migrate deploy` y `schema.prisma` no presenta deriva respecto a la base.
  - Ningún valor real en `.env.example` ni en el repositorio (RNF-7).

### E1-1.3 · Datos semilla idempotentes con dos usuarias

- **Capa:** base de datos.
- **Origen:** R-6, RF-1, RF-3 · [modelo de datos](../../modelo-de-datos.md) §9.
- **Entrega:** `prisma/seed.ts` crea las dos usuarias de prueba con identificadores fijos y `upsert`, y contraseñas tomadas de variables de entorno (`SEED_USER1_PASSWORD`, `SEED_USER2_PASSWORD`) y guardadas solo como hash Argon2id ([modelo de datos](../../modelo-de-datos.md) §3.2 y §9; [ADR-0002](../../adr/0002-practicas-de-ingenieria.md), A02).
- **Usuarios de prueba (decisión de la propietaria):** la usuaria principal es `demo` y el segundo usuario de prueba es `demo2`. Las contraseñas **no se escriben en el repositorio** (ni en el README, ni en `.env.example`, ni en tests o documentación): la propietaria las guarda fuera del proyecto y las facilita cuando se necesiten. Llegan al _seed_ por `SEED_USER1_PASSWORD` y `SEED_USER2_PASSWORD`; `.env.example` mantiene las variables vacías y la base solo guarda su hash. El README solo nombra los usuarios.
- **DoD específico:**
  - Test primero: ejecutar el _seed_ dos veces deja exactamente las mismas filas.
  - La contraseña no aparece en claro en la base; si falta la variable de entorno, el _seed_ termina con un error que lo dice.
  - Con `SEED_USER1_PASSWORD` y `SEED_USER2_PASSWORD` definidas en el entorno, `demo` y `demo2` pueden iniciar sesión (lo comprueba E1-1.4). Los tests toman las contraseñas del entorno, nunca de un literal en el código.

### E1-1.4 · Iniciar y cerrar sesión en la API

- **Capa:** backend.
- **Origen:** RF-1 · OWASP A02, A07, A09 · [`openapi.yaml`](../../api/openapi.yaml) `login`, `logout`, `getCurrentUser` · [arquitectura](../../arquitectura.md) §5.7.
- **Entrega:** casos de uso `Login`, `Logout` y `GetCurrentUser` con sus puertos (`UserRepository`, `PasswordHasher`) y adaptadores (Prisma, Argon2id); `express-session` + `connect-pg-simple` sobre la tabla `session`; regeneración del identificador de sesión al entrar; límite de **3 intentos fallidos seguidos** de login (decisión de la propietaria; un login correcto reinicia el conteo), a partir del cual se responde `429 RATE_LIMITED`; el bloqueo dura **15 minutos** (`Retry-After: 900`); registro de los fallos de autenticación.
- **DoD específico:**
  - Tests primero: con credenciales correctas, `200` y cookie `HttpOnly` y `SameSite=Strict`; con usuario inexistente y con contraseña incorrecta, la misma respuesta `401 INVALID_CREDENTIALS`; el identificador de sesión cambia al entrar; tras `logout`, `me` responde `401`; tras 3 intentos fallidos seguidos, el siguiente responde `429` con `Retry-After`; con el reloj controlado, pasados 15 minutos se puede volver a intentar; con 2 fallos, un login correcto y otros 2 fallos, no se bloquea (el login correcto reinicia el conteo).
  - Los casos de uso se prueban con dobles en memoria, sin Nest ni base de datos; los adaptadores, contra PostgreSQL real.

### E1-1.5 · Sesión obligatoria, caducidad y aislamiento

- **Capa:** backend.
- **Origen:** RF-1 (caducidad), RF-2, RF-3 · OWASP A01 · [arquitectura](../../arquitectura.md) §5.7 y D-8.
- **Entrega:** `SessionGuard` global en todo `/api` salvo `login` y `health`; caducidad a los 30 min de inactividad, renovada en cada petición; `userId` tomado solo de la sesión; el test de contrato que recorre todas las rutas registradas y exige `401` sin sesión (criterio 6) y el arnés del test de aislamiento con las dos usuarias del _seed_ (criterio 7), preparados para que cada historia posterior añada sus casos.
- **DoD específico:**
  - Tests primero, con el reloj controlado (criterio 5): una petición antes de los 30 min reinicia el conteo; la primera después de 30 min sin actividad responde `401`.
  - La lista de rutas del test de `401` se obtiene del enrutador, no se escribe a mano: una ruta nueva sin protección hace fallar el test.

### E1-1.6 · Esqueleto de `apps/web` y cliente HTTP

- **Capa:** frontend.
- **Origen:** RF-1, RF-2 · [arquitectura](../../arquitectura.md) §4, §6.1 (`AuthGate` + cliente HTTP), §6.2, §8.1 y D-1, D-7.
- **Entrega:** aplicación React + Vite en `apps/web` con TanStack Query, Vitest y React Testing Library; cliente HTTP único que, ante cualquier `401`, limpia la caché y avisa de que se ha perdido la sesión; `nginx.conf` que sirve la SPA y redirige `/api` a la API; servicios `api` y `web` en `docker compose`, en el mismo origen.
- **DoD específico:**
  - Tests de Vitest del cliente escritos antes: una respuesta `401` vacía la caché y emite el aviso de sesión perdida.
  - `docker compose up` sirve la SPA en `/` y `GET /api/health` en el mismo origen, sin CORS.

### E1-1.7 · Pantalla de acceso y marco de pestañas

- **Capa:** frontend.
- **Origen:** RF-1 · [arquitectura](../../arquitectura.md) §6.1 (`AuthGate`, `LoginPage`, `AppShell`) · [interfaz](../../modelo/interfaz.md).
- **Entrega:** `LoginPage` sin enlaces de alta, recuperación ni proveedores externos; `AuthGate`, que consulta la sesión al arrancar; `AppShell` con las cuatro pestañas (su contenido llega con cada historia) y "Cerrar sesión" visible en todas; vuelta a la pantalla de acceso tras cerrar sesión o al recibir `401` por caducidad.
- **DoD específico:**
  - Tests de componentes escritos antes, uno por criterio heredado: entrar lleva a Diario con las cuatro pestañas; el error de acceso no distingue usuario inexistente de contraseña incorrecta; no hay enlaces de alta ni de recuperación; "Cerrar sesión" está en las cuatro pestañas; un `401` devuelve a la pantalla de acceso.
  - Textos en español (RNF-10); formulario de acceso usable solo con teclado.
