# AGENTS.md

## Objetivo del repositorio

Mantener la landing estática de Jato Labs clara, comercial, accesible y fácil de desplegar. Realiza cambios incrementales; no reescribas la página ni sustituyas el stack sin autorización explícita.

## Principios de trabajo

- Inspecciona el estado actual antes de editar.
- Preserva cambios existentes y evita modificaciones fuera del alcance.
- Aplica TDD para correcciones y comportamiento nuevo: rojo, verde y refactor.
- Mantén responsabilidades separadas entre contenido, renderizado, interacción y composición.
- Prefiere funciones pequeñas y dependencias explícitas sobre clases o abstracciones innecesarias.
- No agregues dependencias de producción; cualquier dependencia de pruebas debe justificarse.

## Arquitectura y contenido

- Centraliza contenido y enlaces comerciales en `site-config.js`.
- Mantén los tipos explícitos en `site-types.d.ts`; no uses `any`.
- `script.js` debe seguir siendo un punto de entrada mínimo.
- Los renderizadores pertenecen en `scripts/content-renderers.js`.
- Las interacciones pertenecen en `scripts/interactions.js`.
- Las utilidades DOM y de enlaces deben permanecer desacopladas.
- No introduzcas estado global como `window.SITE_CONFIG`.
- Los renderizadores de colecciones deben ser idempotentes y evitar duplicados.

## Reglas de producto

- CTA principal: `Agendar llamada de 30 minutos`.
- Reutiliza el destino configurado; no inventes URLs.
- No inventes clientes, cifras, precios, certificaciones, redes sociales ni páginas legales.
- Mantén claramente marcada como ficticia cualquier información ilustrativa.
- El contenido crítico debe existir como HTML semántico o contar con un fallback HTML verificable.

## Accesibilidad y frontend

- Mantén un solo `h1` y una jerarquía correcta de encabezados.
- Conserva estados de foco visibles y navegación completa por teclado.
- El menú móvil debe cerrar con `Escape`, cerrar al navegar y restaurar el foco.
- El FAQ debe usar botones nativos, `aria-expanded`, `aria-controls` e IDs únicos.
- Respeta `prefers-reduced-motion` y no uses solo color como indicador.
- Evita overflow horizontal y valida móvil, tablet y escritorio.

## Pruebas y validación

Antes de entregar, ejecuta:

```bash
pnpm verify
git diff --check
```

Para cambios de renderizado:

- Prueba cantidad, orden y contenido de los elementos.
- Prueba idempotencia cuando el renderizador pueda ejecutarse más de una vez.
- Mantén actualizado el test del grafo de imports.
- Sirve el sitio por HTTP y valida el DOM en un navegador real cuando sea posible.

## Despliegue

- Incluye siempre el directorio completo `scripts/` junto con `script.js` y `site-config.js`.
- Verifica que todos los ES Modules respondan HTTP `200`.
- No versionar ni publicar `node_modules`, `coverage` o perfiles temporales del navegador.
- No uses `file://` para validar módulos.

## Entrega

Resume archivos y decisiones relevantes, reporta pruebas y typecheck, y señala cualquier validación manual o información comercial pendiente. No declares una comprobación como exitosa si no fue ejecutada.
