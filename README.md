# JUMAVI — Juventud Mariana Vicentina (JMV) Perú

Landing institucional de JMV Perú: sitio **estático** hecho con Astro 7 + Tailwind v4.
Sin framework cliente ni CMS: el contenido es Markdown y los datos, módulos TypeScript.

```sh
pnpm install
pnpm dev        # servidor de desarrollo en localhost:4321
pnpm build      # build de producción en ./dist
pnpm preview    # sirve ./dist localmente
pnpm check      # astro check (tipos + diagnósticos de Astro)
pnpm build:og   # regenera public/og.png y public/apple-touch-icon.png
pnpm build:todo # og + build completo
```

## Estructura

```text
src/
  assets/            fotos reales y de dominio público (optimizadas por astro:assets)
  components/
    Header.astro     cabecera fija + menú móvil (persistente entre páginas)
    Footer.astro     pie
    CtaMovil.astro   barra fija inferior de WhatsApp (móvil)
    sections/        secciones de la home, en orden narrativo
  content/
    blog/            crónicas (content collection "blog")
    formacion/       temas de formación (collection "formacion"; _*.md excluidos)
  layouts/Layout.astro   <head>, fuentes, JSON-LD, reveals, view transitions
  lib/
    datos/           fuente única de contacto, encuentros, hitos, navegación y voces
    fotos.ts         registro central de todas las fotos con alt descriptivo
    sitio.ts         URL base canónica del sitio (urlAbsoluta)
    utils.ts         helpers (fechas en español)
  pages/             /, /historia, /blog, /formacion, /rss.xml, 404
  styles/global.css  tokens de @theme (paleta, tipografía, sombras) + utilidades
scripts/
  og-image.mjs       genera og.png e icono con la paleta del sitio (sharp)
```

## Convenciones

- **Datos, no JSX disperso**: contactos, eventos, hitos y voces viven en `src/lib/datos/*`.
  Cambiar un dato ahí lo cambia en todo el sitio.
- **Fotos**: registrar en `src/lib/fotos.ts` con alt descriptivo; reutilizar ahí en vez
  de importar assets sueltos en los componentes.
- **Contenido nuevo**: agregar un `.md` en `src/content/blog/` o `src/content/formacion/`
  con el frontmatter del schema (`src/content.config.ts`). `draft: true` lo excluye.
- **URLs canónicas**: siempre vía `urlAbsoluta()` de `src/lib/sitio.ts`, sin barra final.
  El dominio está hardcodeado en `astro.config.mjs` (`site`) y en `src/lib/sitio.ts`.
- **Accesibilidad**: foco visible con `:focus-visible`, `prefers-reduced-motion` respetado,
  menú móvil con focus trap e `inert` en el contenido de atrás.

## Despliegue

El sitio se publica en un **VPS propio** desde `./dist`:

1. `pnpm build:todo` (regenera OG + build completo).
2. Sincronizar `dist/` con el directorio web del VPS:

   ```sh
   rsync -avz --delete dist/ usuario@vps:/var/www/jumavi.org/
   ```

3. La sección de encuentros filtra eventos vencidos **al compilar**, así que conviene
   reconstruir periódicamente (cron semanal ejecutando `pnpm build:todo` + rsync).
