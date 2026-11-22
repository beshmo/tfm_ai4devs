# Lección 1 - Introducción y Reglas del Proyecto Final

📌 Cómo usar estas tres lecciones: esta Lección 1 es la fuente de verdad de las reglas (alcance, entregas, privacidad, ramas y Prompts.md). La Lección 2 te ayuda a desbloquearte durante el desarrollo y la Lección 3 es el checklist de cierre. Si algo parece distinto entre lecciones, manda lo que dice esta.

🎯 ¿Para qué existe el Proyecto Final?
El Proyecto Final es uno de los criterios para obtener tu certificado de AI4Devs. Es el hito más importante del programa porque es donde llevas todo lo aprendido a la práctica real: desarrollar un producto de software end-to-end, apoyándote en IA en todas las fases del ciclo de vida, desde la idea hasta un producto funcionando y verificable (desplegarlo es opcional).

El criterio de evaluación tiene tres ejes:

La idea y arquitectura del producto.

La calidad del código y de los tests.

Cómo usaste la IA a lo largo del proceso.

🛠 ¿Qué tienes que construir? (El MVP)
Debes construir un MVP (Producto Mínimo Viable) de tema libre. El dominio es tuyo:

Puede ser algo de tu trabajo actual (una feature, un módulo, una automatización).

Puede ser un proyecto personal o una idea que tengas en mente.

Puede hacerse en equipo, de máximo 2 personas (ver "Trabajo en equipo" más abajo).

¿Aún no tienes idea? Parte de un problema real y acótalo:

Una tarea repetitiva o manual que tú o tu equipo hacen hoy.

Una herramienta que echas en falta en tu día a día.

Comprueba que se puede resolver con 3 a 5 funcionalidades (ver más abajo). Si necesita más, recorta el alcance.

Alcance esperado: Define entre 3 y 5 funcionalidades must-have (imprescindibles). Cada funcionalidad se redacta como una historia de usuario y es la unidad de alcance en las tres lecciones. Las funcionalidades should-have (deseables, 1-2) son opcionales: no se exigen operativas y no sustituyen a las must-have. No intentes incluir todo lo aprendido de una sola vez. El proyecto tiene que ser robusto: debe tener al menos un flujo completo (ej. frontend, backend y base de datos, o su equivalente según tu stack).

Casos especiales:

¿Sin interfaz visual? Sin problema. Un pipeline, CLI o sistema de agentes es válido. Documenta cómo verificar que funciona y, para los tests, consulta la sección "Qué cuenta como test" más abajo.

¿Hardware? También vale. Como evidencia de funcionamiento entregarás un video de 2-3 minutos mostrando el funcionamiento.

🚀 Las 3 Entregas del Proyecto
El proyecto se divide en tres entregas progresivas para asegurar un buen ritmo de trabajo.

📌 Base del proyecto Todo parte de las plantillas oficiales. Encuentra la ficha del proyecto (Readme.md) y el archivo de seguimiento (Prompts.md) en nuestro repositorio base: 👉 Repositorio AI4Devs-finalproject en GitHub

Entrega 1 — Documentación técnica (0% código): Configuración inicial de tu Readme.md y Prompts.md. Incluye: ficha del proyecto, descripción general (objetivo y funcionalidades), arquitectura (diagrama y componentes), modelo de datos, especificación de la API, historias de usuario y tickets de trabajo (backend, frontend y base de datos), stack tecnológico y registro inicial de prompts. Recibe feedback: mira qué revisamos en "Proceso de Feedback".

Entrega 2 — Código funcional: Archivos actualizados + scaffolds de tu arquitectura conectados + el flujo principal parcialmente operativo: al menos una funcionalidad operativa de extremo a extremo (ya hace algo real, aunque el flujo aún no esté completo). La Entrega 2 incluye todo lo de la Entrega 1.

Entrega 3 — Entrega Final: Producto con 3 a 5 funcionalidades 100% operativas + suite de tests (unitarios, integración y E2E) + evidencia de funcionamiento (URL, video o acceso al repo con credenciales de prueba) + credenciales de prueba y pasos de verificación en el Readme.md.

✅ Requisitos de la Entrega Final
Tests (qué cuenta como "suite básica"):

Unitarios sobre la lógica clave de tus funcionalidades.

Integración sobre la conexión entre componentes (ej. API + base de datos).

Al menos un test E2E que recorra el flujo principal de principio a fin.

Qué cuenta como E2E según el tipo de proyecto:

CLI: ejecutar el comando real con datos de ejemplo y verificar la salida.

Pipeline: pasar un conjunto de datos de ejemplo desde la entrada hasta el resultado final.

Hardware: probar contra un simulador o dispositivo real y documentar cómo verificarlo (el video complementa, no sustituye).

Sistemas de agentes / LLM: las respuestas del modelo no son deterministas. Testea de forma determinista los componentes alrededor (parseo, herramientas, orquestación) usando respuestas simuladas, y valida las salidas reales con criterios flexibles (estructura, campos obligatorios, reglas) en lugar de comparar texto exacto.

Evidencia de funcionamiento (elige al menos una):

URL pública del proyecto desplegado.

Video de 2-3 minutos mostrando el flujo principal.

Acceso al repositorio con credenciales de prueba y pasos claros para revisarlo en local.

Para revisar tu proyecto en local, tu Readme.md debe incluir: pasos de instalación, datos de prueba (seed), un .env.example con las variables necesarias y, si aplica, docker-compose.

🔑 Credenciales y claves: usa solo credenciales de prueba, nunca reales, y nunca subas secretos al repositorio. Deja un .env.example con las variables vacías.

🧠 El Archivo de Registro de IA (Prompts.md)
Este archivo es crucial. Aquí debes documentar tu flujo de trabajo con IA. Es lo que nos permite evaluar tus habilidades adquiridas.

Debe incluir:

Herramientas: qué usaste en cada fase (Claude, Cursor, ChatGPT).

Modelos: cuáles usaste y para qué (ej: un modelo de razonamiento para specs, un modelo de código para implementar).

Contexto avanzado: skills, rules, subagentes, archivos CLAUDE.md o system prompts.

Prompts clave: entre 3 y 5 prompts o workflows que fueron el núcleo de tu desarrollo, agrupados por fase si tienes mucho historial (arquitectura, código, tests, despliegue).

Criterio humano: qué ajustes manuales tuviste que hacer sobre el output de la IA.

▶ Ejemplo real: así se ve un flujo de trabajo con IA en un proyecto

(En este clip puedes ver cómo documentar el flujo completo de agentes. Es para que entiendas el nivel de detalle que buscamos, no tienes que replicarlo exactamente).

🔒 Repositorios y Privacidad (Dónde trabajar)
Trabajarás sobre tu propio repositorio (personal o de empresa). Si tu proyecto es privado, elige una de estas opciones para que podamos evaluarte:

![Opciones de entrega](image__1_.avif)

Opción A (Recomendada, ~90% de los alumnos): Repositorio con acceso Copia las plantillas del repo oficial en tu propio repositorio. Si es privado, otorga acceso de lectura a la cuenta LIDR-AI4Devs. Incluye credenciales de prueba y pasos de verificación en tu Readme.md. Código y documentación viven juntos.

Opción B: Proyecto confidencial o de empresa (Sin acceso al código) Si por políticas no puedes darnos acceso al código:

Haz un fork del repo oficial de LIDR (AI4Devs-finalproject). Será público.

Usa ese fork únicamente para alojar tu documentación (Readme.md y Prompts.md). El código se queda en tu empresa.

Graba un video de 2-3 min mostrando el producto funcionando (súbelo a YouTube No Listado y pon el link en el Readme).

⚠ No incluyas información confidencial en el Readme.md, Prompts.md, tickets, diagramas de arquitectura ni en el video: el fork es público.

Qué se espera igualmente: el mismo alcance (3-5 funcionalidades) y tests en tu repositorio interno. Como no podemos ver el código, añade al Readme.md una sección "Pruebas" que describa tu suite y muestre su resultado (captura o reporte de ejecución/cobertura).

Tu checklist es el mismo que el de las demás lecciones, adaptado: no se exigen scaffolds ni código en el fork; en su lugar, documentación completa + video + sección "Pruebas". (Nota: Al no ver el código, no daremos feedback técnico profundo, pero evaluaremos tu arquitectura y uso de IA).

👥 Trabajo en equipo: Puedes hacer el proyecto con otra persona de tu edición (por ejemplo, un colega de tu empresa): los equipos son de máximo 2 personas. El alcance exigido (3-5 funcionalidades, tests y documentación) es el mismo que en un proyecto individual.

📤 Proceso de Entrega (Ramas y Typeform)
🎥 Video tutorial de entregas:

1. Nomenclatura de Ramas: Para cada entrega debes crear una rama específica con este formato exacto, donde [TUS_INICIALES] son las iniciales de tu nombre y apellidos, en minúsculas (ej: Ana María López → aml):

Entrega 1: feature/entrega-1-[TUS_INICIALES] (ej: feature/entrega-1-aml)

Entrega 2: feature/entrega-2-[TUS_INICIALES]

Entrega final: final-project-[TUS_INICIALES]

Crea cada rama en el repositorio que nos vas a enviar (tu repo, o tu fork en la Opción B), partiendo del estado más reciente de tu trabajo, de modo que incluya lo de las entregas anteriores.

2. Formulario Typeform (Indispensable): Ninguna entrega es válida si no completas el formulario con: tu nombre, correo (el mismo del calendario de formación), número de entrega y el enlace directo a la rama en GitHub. 👉 Enlace al Typeform del proyecto final

3. Esto no es un Pull Request: la entrega es rama + Typeform. No tienes que abrir ningún PR.

💬 Proceso de Feedback
Las Entregas 1 y Final reciben feedback personalizado por escrito (revisión híbrida Humano + IA). La Entrega 2 no lleva feedback formal.

Entrega 1 (documentación, diseño e idea): no hay código que probar. Revisamos que lo obligatorio de la lista anterior esté completo (con tu propio contenido, no los textos guía de la plantilla) y valoramos:

Problema y caso de uso: qué resuelves, para quién, qué introduce el usuario y qué le devuelve el sistema.

MVP viable: que el alcance se pueda construir en el curso, centrado en el flujo principal.

Coherencia técnica: que arquitectura, modelo de datos, API y tickets encajen entre sí.

IA en el ciclo de vida: que la uses (o planees usarla) en al menos 4 de las 6 fases del ciclo de vida del desarrollo de software: análisis, diseño, implementación, pruebas, despliegue y mantenimiento.

Despliegue, instalación, tests y pull requests no se piden todavía. El feedback incluye un semáforo (🟢 / 🟡 / 🔴) y próximos pasos para ajustar alcance o definiciones antes de programar.

Entrega Final:

Revisión técnica: código, tests y técnicas de prompting.

Revisión funcional: comprobación de que el flujo definido funciona correctamente.

💡 Inspiración: Proyectos anteriores
Chatbot en Telegram para reportar basura con geolocalización → evolucionó en sistema de delivery.

Dashboard de orquestación de agentes que ejecuta tickets y abre pull requests automáticos.

Sistema de control bovino con integración de hardware (chip) y backend.

CMS educativo tipo Moodle con interfaz drag & drop generada por IA.

(Puedes ver estos y más ejemplos en la sección de Pull Requests del repositorio oficial. Son solo de inspiración: tú no tienes que abrir ningún PR).

❓ Preguntas Frecuentes (FAQ)
¿Qué tecnología tengo que usar? La que quieras. No hay restricción de stack.

¿Tengo que implementar todo lo que se enseña en el máster? No. Usa solo lo que tenga sentido para tu proyecto.

¿Puedo usar un proyecto existente? Sí, puedes sumarle features con IA. Si arrancas de cero, la ventaja es que la IA estructura una mejor arquitectura desde el inicio.

¿Qué pasa si mi proyecto es una migración legacy? Es válido, pero complejo porque la IA arrastra errores viejos. Consúltalo con tu TA antes de arrancar.

¿Cuántas horas toma? Depende de tu alcance y experiencia. El programa estima unas 30 horas de trabajo guiado, pero un MVP con 3-5 funcionalidades, tests y documentación suele requerir bastante más; planifica con holgura.

¿Qué pasa si no llego a la fecha de entrega final? Existe una prórroga de hasta 2 semanas a partir de la fecha límite. Pídela a tu TA por WhatsApp con anticipación, nunca el mismo día del vencimiento (se evalúa caso por caso).

Si tengo una duda técnica ahora, ¿a quién le escribo? Primero al grupo de WhatsApp de tu cohort, que es el canal más rápido. Si es específico de tu proyecto, a tu TA. Si es urgente o el plazo está cerca, escribe directamente a tu TA. Si requiere un mentor especializado, tu TA te conectará con él.

¿Tienes dudas después de leer esto? Déjanos tus preguntas al pie de esta lección. Si es sobre tu stack o empresa, detállalo bien para darte respuesta personalizada.
