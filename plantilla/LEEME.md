# Plantilla: personajes y motor de vídeo

Todo lo necesario para que los reels y carruseles se vean iguales cada semana.

## Archivos

| Archivo | Qué es |
|---|---|
| `HISTORIA.md` | Personajes, episodios publicados y temas ya usados. **Léelo antes de escribir.** |
| `chars.js` | Los muñecos planos (`char({...})`). Los colores de cada personaje están en HISTORIA.md. |
| `reel.js` | Motor de vídeo: renderiza fotogramas con Playwright y monta el MP4 con ffmpeg. |
| `base.js` | Fuentes incrustadas en base64 y colores de la marca. |
| `reel-lucia.js`, `reel-paco.js`, `reel-carmen.js` | Episodios ya publicados, como ejemplo de guion técnico. |
| `carrusel-ejemplo.js` | Carrusel ilustrado de 7 diapositivas (1080×1350). |
| `render.py` | Plantilla antigua de solo texto (ya no se usa). |

## Uso

```bash
cd plantilla && npm install          # fuentes
mkdir -p audio                        # aquí va el mp3 de la locución (no se sube al repositorio)
OUT=/ruta/de/trabajo node reel.js reel-lucia.js stills   # fotogramas de prueba
OUT=/ruta/de/trabajo node reel.js reel-lucia.js          # vídeo + portada
OUT=/ruta/de/trabajo node carrusel-ejemplo.js            # PNG del carrusel
```

`OUT` es obligatorio en la práctica: si no se indica, escribe en `plantilla/salida/` (ignorada por git). Nunca apuntes `OUT` a una carpeta de semana ya publicada.

## Cómo se escribe un episodio

Un episodio es un módulo con `name`, `duration`, `coverAt`, `audio`, `stills`, `css`, `body` y `tick`.

- `body`: escenas `<div class="sc light|dark|acc" data-s="inicio" data-e="fin">`. Dentro, cada elemento con `data-in="segundo"` entra animado; `data-fx` puede ser `up` (por defecto), `pop`, `left`, `right`, `fade`, `type` u `out`.
- `tick(t)`: código que se ejecuta en cada fotograma para lo que se mueve todo el rato (balanceo, parpadeo, bocas que hablan, piernas que caminan, objetos que caen).
- Sin logotipo y sin línea de tiempo: `.logo,#bar{display:none}`.
- Zona segura: no pongas texto importante por encima de y=200 ni por debajo de y=1500.

## Sincronizar con la voz

1. Genera la locución (ElevenLabs, voz Lydia) y guárdala en `audio/`.
2. Saca las pausas: `ffmpeg -i audio/x.mp3 -af silencedetect=noise=-38dB:d=0.18 -f null -`.
3. Usa esos tiempos para `data-s`, `data-e` y `data-in` de cada escena.
4. No se puede escuchar el resultado desde la sesión: avisa para que lo revise una persona.
