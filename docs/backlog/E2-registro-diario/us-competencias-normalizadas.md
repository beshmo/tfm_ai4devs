# E2-4 · Escribir competencias con sugerencias y sin duplicados

| Campo            | Valor                                              |
| ---------------- | -------------------------------------------------- |
| ID               | `E2-4` (etiqueta provisional, **pendiente de ID**) |
| Épica            | E2 · Registro diario                               |
| Funcionalidad    | F1 · Registro diario de entradas (must-have)       |
| Origen en el PRD | RF-13 · RNF-11                                     |
| Depende de       | [E2-1](./us-registrar-entrada-del-dia.md)          |
| Tickets          | Sin descomponer (ver [backlog](../backlog-mvp.md)) |

## Historia

Como propietaria del diario, quiero que al escribir una competencia se me sugieran las que ya uso y que se guarde con la grafía que ya tenía, para que cada competencia cuente una sola vez en las fortalezas del informe aunque la escriba con otras mayúsculas.

## Criterios de aceptación

1. **Sugerencias al escribir.** Existe la competencia "Kubernetes". Cuando escribo "kube" en el campo de competencias, se sugiere "Kubernetes". Las sugerencias salen de todas las competencias conocidas de la usuaria y se comparan sin distinguir mayúsculas.
2. **Grafía existente.** Guardar "kubernetes" asocia "Kubernetes" a la tarea y no crea una competencia nueva.
3. **Sin duplicados.** Introducir "Kubernetes" y "KUBERNETES" en la misma tarea deja una sola competencia, "Kubernetes".
4. **Intro elige, no envía.** Pulsar Intro en el campo elige la primera sugerencia; pulsar Intro en ese campo nunca guarda la entrada, haya o no sugerencias.
5. **Pulsar una sugerencia.** Pulsar una sugerencia sustituye el fragmento escrito por la competencia sugerida.
6. **Campo vacío.** Con el campo vacío no se muestran botones de competencias más usadas ni "Ver todas".
7. **Privacidad.** Las sugerencias solo incluyen competencias de la usuaria autenticada: una competencia que solo usa el segundo usuario de prueba nunca se sugiere.

## Fuera de esta historia

- El mismo campo en la edición en línea de la pestaña Tareas: lo reutiliza [E4-3](../E4-seguimiento-de-tareas/us-editar-tarea-en-linea.md).
