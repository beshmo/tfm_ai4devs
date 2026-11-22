# E1-1 · Entrar en mi diario privado y salir de él

| Campo            | Valor                                                  |
| ---------------- | ------------------------------------------------------ |
| ID               | `E1-1` (etiqueta provisional, **pendiente de ID**)     |
| Épica            | E1 · Acceso, privacidad y marco común                  |
| Funcionalidad    | Requisitos transversales del alcance (sin F-id propio) |
| Origen en el PRD | RF-1, RF-2, RF-3 · R-6                                 |
| Depende de       | Ninguna historia                                       |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md))     |

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
