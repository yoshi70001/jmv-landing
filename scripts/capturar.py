"""
Capturas de validación visual del sitio JMV.

Usa Playwright (env del proyecto fb-fotos-jumavi, canal msedge) para:
  1. Cargar la página con scroll progresivo (fuerza el lazy-loading real).
  2. Tomar captura de página completa en escritorio y móvil.

Uso (con el servidor de preview o dev corriendo en :4321):
  uv run --project E:/Proyectos/fb-fotos-jumavi python scripts/capturar.py

Opciones:
  --base http://localhost:4321   --out capturas
"""

import argparse
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")


def capturar(page, url: str, dest: Path, ancho: int, alto: int) -> None:
    page.set_viewport_size({"width": ancho, "height": alto})
    page.goto(url, wait_until="networkidle")
    # scroll progresivo para activar todos los loading="lazy"
    altura = page.evaluate("document.body.scrollHeight")
    y = 0
    while y < altura:
        page.evaluate(f"window.scrollTo(0, {y})")
        page.wait_for_timeout(300)
        y += max(400, alto // 2)
        altura = page.evaluate("document.body.scrollHeight")
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(800)
    page.screenshot(path=str(dest), full_page=True)
    print(f"    + {dest.name} ({dest.stat().st_size // 1024} KB)")


def main() -> None:
    ap = argparse.ArgumentParser(description="Capturas de validación JMV")
    ap.add_argument("--base", default="http://localhost:4321")
    ap.add_argument("--out", default=str(Path(__file__).parent.parent / "capturas"))
    args = ap.parse_args()

    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)

        escritorio = browser.new_context(viewport={"width": 1440, "height": 900})
        pagina = escritorio.new_page()
        capturar(pagina, f"{args.base}/", out / "escritorio-full.png", 1440, 900)
        capturar(pagina, f"{args.base}/historia", out / "historia.png", 1440, 900)

        movil = browser.new_context(
            viewport={"width": 375, "height": 812},
            device_scale_factor=2,
            is_mobile=True,
            has_touch=True,
        )
        pagina_movil = movil.new_page()
        capturar(pagina_movil, f"{args.base}/", out / "movil-full.png", 375, 812)

        browser.close()

    print("[OK] Capturas listas en", out)


if __name__ == "__main__":
    main()
