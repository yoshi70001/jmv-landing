"""
Verificación de view transitions del sitio JMV:
  1. Graba video de navegaciones internas (inicio -> blog -> articulo -> inicio).
  2. Comprueba tras cada swap: html.sin-reveal aplicado y ninguna seccion
     [data-reveal] invisible (opacity 0) tras la transicion.

Uso (con preview/dev en :4321):
  uv run --project E:/Proyectos/fb-fotos-jumavi python scripts/verificar_transiciones.py
"""

import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

OUT = Path(__file__).parent.parent / "capturas"
BASE = "http://localhost:4321"


def comprobar_estado(page, etiqueta: str) -> None:
    estado = page.evaluate(
        """() => {
            const sinReveal = document.documentElement.classList.contains('sin-reveal');
            const invisibles = [...document.querySelectorAll('[data-reveal]')]
                .filter(el => getComputedStyle(el).opacity === '0').length;
            const visibles = document.querySelectorAll('[data-reveal]').length - invisibles;
            return { sinReveal, invisibles, visibles };
        }"""
    )
    ok = estado["sinReveal"] and estado["invisibles"] == 0
    print(
        f"    [{etiqueta}] sin-reveal={estado['sinReveal']} "
        f"invisibles={estado['invisibles']}/{estado['visibles']} -> {'OK' if ok else 'FALLA'}",
        flush=True,
    )


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)
        ctx = browser.new_context(
            viewport={"width": 1440, "height": 900},
            record_video_dir=str(OUT),
            record_video_size={"width": 1440, "height": 900},
        )
        page = ctx.new_page()

        page.goto(f"{BASE}/", wait_until="networkidle")
        page.wait_for_timeout(1200)

        # navegación cruzada: inicio -> blog
        page.click("header nav a[href='/blog']")
        page.wait_for_timeout(900)
        comprobar_estado(page, "inicio->blog")

        # a un artículo
        page.click("article a[href*='/blog/']")
        page.wait_for_timeout(900)
        comprobar_estado(page, "blog->articulo")

        # inicio -> formacion (donde se reportó el flash)
        page.goto(f"{BASE}/", wait_until="networkidle")
        page.wait_for_timeout(600)
        page.click("header nav a[href='/formacion']")
        page.wait_for_timeout(900)
        comprobar_estado(page, "inicio->formacion")

        # formacion -> tema
        page.click("article a[href*='/formacion/']")
        page.wait_for_timeout(900)
        comprobar_estado(page, "formacion->tema")

        # de regreso al inicio (ancla #somos en la misma ruta raíz)
        page.goto(f"{BASE}/", wait_until="networkidle")
        page.wait_for_timeout(600)
        # ancla de la misma página: scroll suave, sin view transition
        page.click("header nav a[href='/#somos']")
        page.wait_for_timeout(1200)
        y = page.evaluate("window.scrollY")
        print(f"    [ancla #somos] scrollY={y} -> {'OK' if y > 300 else 'FALLA'}", flush=True)

        video = page.video
        ctx.close()
        ruta_video = video.path()
        destino = OUT / "transiciones.webm"
        Path(ruta_video).replace(destino)
        print(f"    + video: {destino} ({destino.stat().st_size // 1024} KB)", flush=True)

        browser.close()


if __name__ == "__main__":
    main()
