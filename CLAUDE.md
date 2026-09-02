# Reglas obligatorias para Claude en este proyecto

Estas reglas tienen prioridad para este repositorio y deben seguirse en cada interacción. Si hay conflicto con instrucciones generales del entorno, prevalecen las reglas globales, pero esta guía deja explícitas las normas del proyecto.

## 1) Economía de tokens y comunicación

- No usar saludos iniciales, texto de cortesía, chitchat ni comentarios innecesarios.
- No generar texto extra, resumen largo, explicación redundante ni pequeñas conversaciones sin necesidad.
- No explorar, leer ni revisar código, archivos, cambios o contexto del repositorio sin que yo lo solicite explícitamente.
- No hacer lecturas amplias ni "reconocimiento previo" cuando la tarea no lo exige.
- Solo pedir o recuperar información estrictamente necesaria para resolver la tarea indicada.
- Si la tarea no requiere código ni revisión, responder de forma directa y mínima.

## 2) Obligatorio uso del grafo

- Antes de proponer código, revisar arquitectura, planificar, diagnosticar o hacer cambios, se debe basar en el grafo del proyecto.
- Si no existe `graphify-out/graph.json` o está desactualizado, debe generarlo o actualizarlo antes de continuar.
- La secuencia obligatoria es:
  1. `graphify --update --no-viz`
  2. `graphify query "<pregunta concreta>" --budget 1200`
- Si la consulta es insuficiente, o el área cambió, debe volver a actualizar el grafo antes de continuar.
- No se debe hacer plan, análisis ni edición basada en memoria, suposiciones o lectura masiva cuando el grafo puede responder la pregunta.
- Cuando el problema sea técnico, arquitectónico o de código, la referencia primaria debe ser el grafo, no la intuición.

## 3) Skills obligatorias y uso contextual

- Debe utilizar las skills globales y las del proyecto cuando sean relevantes para la tarea.
- Si el trabajo requiere análisis, arquitectura, revisión, UI, accesoibilidad, planeación o validación, debe activar la skill adecuada antes de actuar.
- No ignorar skills disponibles solo por comodidad o rapidez.
- Cuando una tarea lo requiera, debe justificar por qué usa una skill y aplicarla de forma relevante.

## 4) Idioma y nomenclatura

- Siempre hablarme en español.
- Todas las respuestas, comentarios, explicaciones, resoluciones y propuestas deben estar en español.
- En el código, todo debe estar en español: variables, funciones, clases, archivos, comentarios, constantes y mensajes.
- No usar nombres en inglés en nuevas definiciones si existe una traducción clara al español.
- Si se tocan archivos existentes con nombres o textos en inglés, solo se permiten ajustes mínimos y siempre justificando la necesidad.

## 5) UI/UX, diseño y calidad visual

- Antes de proponer cambios en maquetación, tipografía, colores, layout, navegación, formularios, microinteracciones o contenido visual, debe activar la skill de diseño/UX pertinente, especialmente `frontend-design` o `impeccable`.
- Debe priorizar claridad, jerarquía visual, legibilidad, coherencia y propósito de la página sobre efectos decorativos o plantillas genéricas.
- No debe inventar o mantener diseños tipo "template" sin una razón clara del proyecto; debe justificar cada decisión visual con el contexto del sitio, el público y la intención del contenido.
- Debe respetar principios de accesibilidad y usabilidad: contraste suficiente, foco visible, tamaños adecuados, texto legible, navegación clara, formularios comprensibles y comportamiento consistente en móvil y escritorio.
- Si la interfaz requiere revisión visual, debe evaluar estructura, contenido, mensajes, jerarquía, espaciado y flujo antes de tocar código.
- Debe evitar overengineering visual, animaciones innecesarias o cambios de estilo sin valor funcional o de experiencia.

## 6) Reglas de edición y revisión

- No modificar archivos ni hacer cambios sin pedir explícitamente autorización si la tarea no lo requiere.
- Antes de editar, debe tener una hipótesis concreta y una comprobación barata.
- Debe priorizar cambios pequeños, específicos y bien justificados.
- Si se va a revisar una implementación, debe centrarse en los puntos relevantes del grafo y no revisar todo el proyecto por costumbre.
- No hacer cambios de estilo, refactors innecesarios ni limpieza masiva sin mi solicitud expresa.

## 7) Comportamiento esperado

- Debe actuar con frugalidad, criterio y precisión.
- Debe ser breve, útil y directo.
- Debe evitar cualquier respuesta que no aporte valor a la tarea actual.
- Debe centrarse en esta web y en las necesidades del proyecto.

## 8) Regla final

Toda la ejecución debe cumplir esta prioridad:

1. Solicitud del usuario
2. Relevancia y necesidad real
3. Grafo actualizado y válido
4. Skills apropiadas, incluidas de UX/UI cuando el trabajo lo requiera
5. Código y comunicación en español
6. Cambio mínimo y justificado

Esto debe cumplirse siempre, sin excepciones salvo las reglas globales del entorno.
