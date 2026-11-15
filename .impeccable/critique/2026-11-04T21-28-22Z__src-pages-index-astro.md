---
target: la landing (página principal)
total_score: 26
max_score: 36
na_heuristics: 9
p0_count: 1
p1_count: 2
target_identity: "file:E:\\Jumavi\\jmv-landing\\src\\pages\\index.astro"
target_fingerprint: "sha256:0181a5a0987e21d6a3c31d2f0b7e551f32c494eb88ebc430c5bea1ab3a9e959e"
target_path: "E:\\Jumavi\\jmv-landing\\src\\pages\\index.astro"
timestamp: 2026-11-04T21-28-22Z
slug: src-pages-index-astro
closed: true
---
# Critique — Landing JMV (`src/pages/index.astro`)

`Method: dual-agent (A: agent_df3a7068 · B: agent_4fba1df6)`

Nota de ejecución: ambos agentes compartieron brevemente la sesión de navegador; el agente A limpió el DOM inyectado por B en su pestaña y repitió capturas, y B rehízo su pase móvil con viewport verificado. `impeccable detect` solo lo ejecutó B. Los overlays del detector se inyectaron y leyeron en desktop (1440×900) y móvil (390×844), y luego se retiraron (live-server detenido con `--keep-inject`, pestañas cerradas).

## Veredicto de especificidad de diseño

**ALTO en contenido, MEDIO en contenedor.** Nadie confundiría esta landing con otra: WhatsApp como canal de conversión real, copy es-PE auténtico («Te respondemos rapidito», «llega sin compromiso»), la cinta «Eclesial ✦ Laical ✦ Mariana ✦ Vicenciana», hitos de 1830/1858/1999 con la Medalla Milagrosa, fotos reales de peregrinaciones limeñas (no stock) y paleta mariana marino/celeste/dorado. El skin en cambio — chips uppercase con tracking, tarjetas redondeadas, botón brutalista, clamps tipográficos — es la fórmula editorial-genérica del momento. Lo que salva la especificidad es que ese skin está al servicio de fotos y datos que solo JUMAVI tiene.

**Escaneo determinista:** 7 hallazgos, 0 falsos positivos (3 del CLI: 3 avisos `overused-font` por Fraunces Variable ×2 y Space Grotesk Variable en `Layout.astro:72-86`; 4 del overlay: `hero-eyebrow-chip`, `low-contrast` 3.7:1, `cream-palette`, `straggler` «1830» huérfano a 390px). Los avisos de fuentes y la paleta marfil son la identidad vigente comprometida del sitio — en un refinamiento se preservan; los que exigen acción inmediata son contraste y straggler (coinciden con lo que la revisión humana vio por su cuenta).

## Design Health Score

| # | Heurística | Score | Hallazgo clave |
|---|-----------|-------|----------------|
| 1 | Visibilidad del estado | 3 | Detección de zona sin estado de carga: la tarjeta aparece y luego se sustituye en seco |
| 2 | Match sistema/real | 4 | es-PE genuino, WhatsApp-first, fechas reales |
| 3 | Control y libertad | 3 | Esc + focus trap bien hechos; pero no hay forma de rechazar la geolocalización por IP |
| 4 | Consistencia | 3 | `.boton` coherente; pero «VER EL CENTRO →» es enlace subrayado cuando sus gemelas usan `.boton` |
| 5 | Prevención de errores | 3 | Flags `verificado` que rompen el build; no inventa eventos |
| 6 | Reconocimiento sobre memoria | 3 | Iconos+texto en Contacto; pero la galería (7 fotos) sin captions |
| 7 | Flexibilidad/eficiencia | 2 | El centro detectado por IP no se persiste: el recurrente re-paga demora y fetch a terceros en cada visita |
| 8 | Estética minimalista | 3 | Muy cuidada; pero chip→h2→intro lateral se repite idéntico en 5 secciones |
| 9 | Recuperación de errores | n/a | No hay formularios ni entradas en la landing: no existen estados de error |
| 10 | Ayuda/documentación | 2 | Nunca dice qué pasa en un primer encuentro ni tras escribir por WhatsApp |
| **Total** | | **26/36** | **Good** (72%): base sólida, lastrada por contenido vacío y eficiencia de recurrentes |

Máximo aplicable: 36 (heurística 9 n/a). Modo de la superficie: Persuade.

## Impresión general

Landing competente y honesta por arquitectura, con un primer viewport genuinamente bueno. Su problema no es formal sino de verdad persuasiva: en el tramo exacto donde el visitante busca razones para actuar («¿cuándo puedo ir?», «¿la gente de verdad lo pasa bien?»), dos secciones consecutivas entregan estados vacíos. La mayor oportunidad: resolver esos dos valles — con datos reales o con copys que no prometan lo que no hay.

## Qué funciona

1. **Física táctil del botón** (`global.css` `.boton`): sombra dura de tinta, hover que traslada 2px, active que se hunde 3px — feedback tangible aplicado sin excepción a toda la familia de botones.
2. **Integridad de contenido como sistema** (`contacto.ts`, `encuentros.ts`, `voces.ts`): flags `verificado` que rompen el build, «NO inventar eventos», testimonios sin publicar sin consentimiento. La honestidad está arquitecturada, no prometida.
3. **A11y por encima del estándar**: skip link funcional, focus trap + Esc + `inert` en menú móvil, foco dorado 3px, `prefers-reduced-motion` respetado.

## Problemas prioritarios

1. **[P0] «Próximos encuentros» promete y no entrega.** El h2 de `Encuentros.astro` promete «Lo que se viene», pero `encuentros.ts` es un array vacío → la sección entera es «La agenda se está preparando». Peor: el CTA del bloque Perú («VER PRÓXIMOS ENCUENTROS →», `Peru.astro:47-52`) desliza hasta ese callejón, cuya mejor salida es «Ver actividades pasadas». Para PERSUADE esto mata la conversión en el punto exacto de decisión.
   **Arreglo**: poblar `encuentros.ts` con los encuentros semanales reales que los centros ya describen; si no hay agenda confirmada, reescribir el titular como estado honesto y cambiar el CTA de `Peru.astro` a «Encuentra tu centro» → `#centro-cercano`. · Sugerido: `/impeccable clarify`
2. **[P1] Prueba social vacía justo antes del cierre.** `Voces.astro` encabeza «Jóvenes reales, historias reales» y muestra una caja punteada «Aquí pronto compartiremos…» porque las 3 voces tienen `autorizado: false`. Cero testimonios en toda la página.
   **Arreglo**: recoger 2-3 testimonios con permiso; mientras tanto ocultar la sección o apoyar la prueba social en captions de galería. · Sugerido: `/impeccable clarify`
3. **[P1] Cuatro superficies de conversión en el primer viewport móvil.** A 390×844 conviven «Únete ✦» del header, «QUIERO UNIRME ✦», «CONOCE JUMAVI» y el CTA fijo «ÚNETE POR WHATSAPP ✦», que además tapa la base de la foto del hero. La insistencia suena a desesperación.
   **Arreglo**: ocultar «Únete» del header en móvil (el CTA fijo ya cubre) o reducir el hero a 1 primario + enlace de texto. · Sugerido: `/impeccable distill`
4. **[P2] Contraste AA incumplido en textos pequeños** (coincidencia revisión humana + detector). «JUMAVI · JUVENTUD MARIANA VICENTINA» (`Hero.astro:38`) y la nota de privacidad de `CentroCercano.astro` rinden ≈3.7:1 (#79808a = `text-tinta/60` sobre marfil #f8f5ef); labels de stats al borde.
   **Arreglo**: subir esas opacidades a /75-/80. Además, el chip del hero deja «1830» huérfano en la segunda línea a 390px (`straggler`). · Sugerido: `/impeccable polish`
5. **[P2] Robustez**: (a) `[data-reveal]` fija `opacity:0` sin fallback `<noscript>` — sin JS la página es invisible, contradiciendo el propio comentario del código; (b) la detección por IP no se guarda en localStorage (solo la manual) y no hay botón «no usar mi ubicación»; (c) `Historia.astro` está vacío (0 bytes) pero sigue importado en `index.astro`.
   **Arreglo**: `<noscript>` en `Layout.astro`, cachear resultado de IP con opción de rechazo, y retirar o poblar `Historia`. · Sugerido: `/impeccable harden`

## Red flags por persona

**Jordan (primerizo)** — Entiende qué es JMV en 10 segundos (bien). Pero al pulsar «VER PRÓXIMOS ENCUENTROS» aterriza en «La agenda se está preparando» — su pregunta real («¿cuándo puedo ir?») queda sin respuesta; «Voces» no le da ni una historia con la que identificarse; y el botón «ESCRÍBENOS Y TE CONECTAMOS ✦» no dice a quién escribe ni qué pasará después (es el fallback nacional porque `corpus-christi` tiene `canales: []`) — una caja negra para quien teme comprometerse.

**Riley (stress-tester)** — Cada visita dispara fetch a geojs.io/ipapi.co sin persistencia ni opción de rechazo; `Historia.astro` vacío e importado (si alguien lo llena, aparece sin chip ni fondo entre Bitácora y Contacto); `text-tinta/60` a 12-14px bajo AA; enlaces del footer móvil con ~15px de alto por target. A su favor: Esc, focus trap, `inert`, reduced-motion — todo correcto.

**Casey (móvil)** — 4 CTAs de unión en el primer viewport; el botón «ESCRÍBENOS Y TE CONECTAMOS ✦» se parte a 390px dejando el ✦ huérfano solo en la segunda línea; el copy «Detectamos tu zona…» aparece incluso antes de que exista detección alguna (texto estático visible también sin JS). A su favor: menú móvil excelente y CTA fijo con safe-area.

## Observaciones menores

- La tarjeta de centro detectado (`max-w-3xl`) deja media fila vacía a 1440px.
- Patrón chip→h2→intro idéntico en 5 secciones seguidas: monotonía de ritmo.
- Stats: la etiqueta uppercase se renderiza encima del número grande — el dato payload lee segundo (también en móvil); el `dl` usa dt antes de dd, semánticamente válido, visualmente invertido.
- Galería sin captions (¿dónde, cuándo?): oportunidad perdida de anclaje local.
- La landing es larga para su contenido real: con los 2 vacíos, ~6 secciones dirían lo mismo.

## Preguntas para considerar

- Si un chico de 16 abre esto un sábado a las 11 pm y lo único «próximo» que encuentra es «La agenda se está preparando», ¿qué razón concreta tiene para volver el domingo?
- Quita las fotos reales y las fechas de 1830/1858: ¿cuánto de esta página podría vender un gimnasio? ¿Por qué lo único irrenunciablemente JUMAVI es una cinta de cuatro palabras?
- ¿Quién responde «rapidito» ese WhatsApp nacional cuando la landing empiece a enviarle 20 jóvenes por semana?
