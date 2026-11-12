"""Plantilla de marca para posts de Instagram de Xperience Studio (1080x1350).
Uso: python3 render.py salida.png [--formato post|story] --tema claro|oscuro --titulo "Texto con *acento*" --sub "..." --pie "..."
Fuentes: Inter Tight (titulares y texto) + Instrument Serif Italic (palabra de acento, en naranja).
"""
import argparse, html, re
from playwright.sync_api import sync_playwright
TEMAS = {"oscuro": dict(bg="#14120f", fg="#fbfaf8", sub="#c9c3b8", pie="#ded9d0"),
         "claro":  dict(bg="#fbfaf8", fg="#17130a", sub="#4d4740", pie="#4d4740")}
ACENTO = "#e2481b"
def acento(t):
    t = html.escape(t)
    return re.sub(r"\*(.+?)\*", r'<em>\1</em>', t).replace("\\n", "<br>")
def render(out, tema, titulo, sub, pie, formato="post"):
    c = TEMAS[tema]
    H = 1920 if formato == "story" else 1350
    top, bot = (260, 300) if formato == "story" else (110, 100)
    css = f"""*{{margin:0;padding:0;box-sizing:border-box}}
body{{width:1080px;height:{H}px;background:{c['bg']};color:{c['fg']};font-family:'Inter Tight';position:relative;overflow:hidden}}
.logo{{position:absolute;left:96px;top:{top}px;font-size:40px;font-weight:500;letter-spacing:-.02em}}
.logo em{{font-family:'Instrument Serif';font-style:italic;color:{ACENTO};font-weight:400;letter-spacing:0}}
.main{{position:absolute;left:96px;right:96px;top:50%;transform:translateY(-46%)}}
h1{{font-size:136px;line-height:.98;font-weight:600;letter-spacing:-.045em}}
h1 em{{font-family:'Instrument Serif';font-style:italic;font-weight:400;color:{ACENTO};letter-spacing:-.01em}}
p{{font-size:44px;line-height:1.3;color:{c['sub']};margin-top:48px;max-width:860px;font-weight:400;letter-spacing:-.01em}}
.pie{{position:absolute;left:96px;bottom:{bot}px;font-size:34px;color:{c['pie']};font-weight:400}}"""
    body = f'<div class="logo">Xperience <em>Studio</em></div><div class="main"><h1>{acento(titulo)}</h1><p>{acento(sub)}</p></div><div class="pie">{html.escape(pie)}</div>'
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={"width":1080,"height":H})
        pg.set_content(f"<html><head><style>{css}</style></head><body>{body}</body></html>")
        pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(300)
        pg.screenshot(path=out); b.close()
if __name__ == "__main__":
    a = argparse.ArgumentParser(); a.add_argument("out"); a.add_argument("--tema", default="oscuro")
    a.add_argument("--titulo"); a.add_argument("--sub", default=""); a.add_argument("--pie", default=""); a.add_argument("--formato", default="post")
    x = a.parse_args(); render(x.out, x.tema, x.titulo, x.sub, x.pie, x.formato)
