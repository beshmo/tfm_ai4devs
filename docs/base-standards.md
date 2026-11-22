---
description: Este documento contiene todas las reglas y pautas de desarrollo para este proyecto.
alwaysApply: true
---

## 1. Core Principles

- **Test-Driven Development (TDD)**: Escribe primero las pruebas antes de escribir el código, comprueba que las pruebas fallen y luego escribe el código para que pasen.
- **Pregunta antes de asumir**: Si no estás seguro de algo, pregunta antes de asumir.
- **Clean Architecture**: La lógica de dominio y de casos de uso no depende de frameworks, de la base de datos ni de la interfaz; las dependencias siempre apuntan hacia dentro (infraestructura e interfaz dependen del dominio, nunca al revés). Ver `docs/adr/0002-practicas-de-ingenieria.md` para cómo se traduce en la estructura de `apps/api`.
- **OWASP Top 10 por defecto**: Cada funcionalidad nueva se diseña teniendo en cuenta las diez categorías de [OWASP Top 10](https://owasp.org/Top10/), no como una auditoría aparte al final. Ver `docs/adr/0002-practicas-de-ingenieria.md` para la lectura de cada categoría aplicada a este producto.

## 2. Language Standards

- **Spanish**: La siguiente documentación debe estar en español, README, guías, ADR, PRD, backlog.
- **English**:
  - Source code
  - API specifications and endpoints
  - Data schemas and database names
  - Configuration files and scripts
  - Git commit messages
  - Test names and descriptions

## 3. Commits Guidelines

- Usa la especificación de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) para los mensajes de commit.
- No incluyas el trailer "Co-Authored-By" en los commits.

### 4. Branch Naming

Usa la especificación de [Conventional Branch](https://conventionalbranch.org/v1.1.0/) para los nombres de las ramas.
