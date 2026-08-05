# Jato Labs Landing Page

Landing page estática de [Jato Labs](https://jatolabs.tech), enfocada en servicios de diagnóstico, auditoría y rediseño de procesos apoyados por tecnología.

## Stack

- HTML semántico.
- CSS responsive sin framework.
- JavaScript nativo con ES Modules.
- Configuración y contenido centralizados.
- Vitest y jsdom para pruebas.
- TypeScript `checkJs` en modo estricto.

La aplicación publicada no necesita Node.js ni `node_modules`. Las dependencias de npm se utilizan únicamente durante desarrollo y validación.

## Desarrollo local

Requisitos:

- Node.js 20.19 o posterior.
- npm.

Instala las dependencias:

```bash
npm ci
```

Sirve la raíz del proyecto mediante HTTP. Por ejemplo:

```bash
ruby -run -e httpd . -p 4173
```

Después abre `http://localhost:4173`. Los ES Modules no deben probarse directamente mediante `file://`.

## Comandos

```bash
npm test
```

Ejecuta una vez la suite de Vitest.

```bash
npm run test:watch
```

Ejecuta Vitest en modo interactivo.

```bash
npm run typecheck
```

Valida JavaScript y pruebas con `checkJs --strict`.

```bash
npm run verify
```

Ejecuta pruebas y typecheck. Este es el comando recomendado antes de publicar cambios.

## Arquitectura

- `index.html`: estructura semántica y contenido crítico con fallback progresivo.
- `styles.css`: sistema visual, responsive y accesibilidad.
- `site-config.js`: fuente central de contenido, enlaces y configuración comercial.
- `site-types.d.ts`: contratos de configuración y dependencias.
- `script.js`: punto de entrada del navegador.
- `scripts/app.js`: composición de renderizadores y controladores.
- `scripts/content-renderers.js`: presentación de contenido dinámico.
- `scripts/interactions.js`: menú móvil, acordeón y efectos de viewport.
- `scripts/dom.js`: utilidades DOM seguras.
- `scripts/links.js`: resolución de enlaces de agenda y contacto.
- `tests/`: pruebas unitarias y contratos del grafo de módulos.

El contenido crítico de cliente ideal existe inicialmente en HTML para permanecer visible e indexable aunque JavaScript no cargue. El renderizador lo sincroniza con `site-config.js` y las pruebas evitan divergencias.

## Contenido y contacto

Los textos, CTA, navegación, correo, LinkedIn, modalidades, reporte ilustrativo, FAQ y SEO se editan en `site-config.js`.

Cuando `bookingUrl` está vacío, el CTA utiliza el correo configurado y genera un enlace `mailto:` con asunto.

No agregues datos comerciales, clientes, precios, redes sociales o páginas legales que no estén confirmados.

## Despliegue

El sitio se publica como archivos estáticos. El despliegue debe incluir, como mínimo:

- `index.html`.
- `styles.css`.
- `script.js`.
- `site-config.js`.
- El directorio completo `scripts/`.
- El directorio `assets/`.

Si falta un archivo de `scripts/`, el navegador interrumpe el grafo de imports y el contenido dinámico no se inicializa. Verifica que todos los módulos respondan con estado HTTP `200` después de publicar.

No publiques `node_modules`, pruebas ni archivos temporales como parte de los recursos del sitio.

## Accesibilidad

- Conserva un único `h1`.
- Mantén navegación por teclado y foco visible.
- Preserva los atributos ARIA del menú y del acordeón.
- No uses únicamente color para comunicar estados.
- Respeta `prefers-reduced-motion`.
- Evita que contenido crítico dependa de animaciones o JavaScript.

## Flujo recomendado

1. Escribe o actualiza una prueba que represente el comportamiento esperado.
2. Confirma que la prueba falle por la razón correcta.
3. Implementa el cambio mínimo.
4. Refactoriza manteniendo la suite en verde.
5. Ejecuta `npm run verify`.
6. Revisa anclas, responsive, teclado y carga HTTP antes de desplegar.
