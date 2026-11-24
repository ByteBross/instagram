// Uso: OUT=/ruta/salida node reel.js <episodio.js> [stills]
// Renderiza cada fotograma con seek(t) y lo monta con ffmpeg. 'stills' saca solo fotogramas de prueba.
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path'), fs = require('fs');
const { FONTS, ACC } = require('./base');
const spec = require(path.resolve(process.argv[2]));
const mode = process.argv[3];
const OUT = process.env.OUT || path.join(__dirname, 'salida'); // nunca escribe en las carpetas publicadas
fs.mkdirSync(OUT, { recursive: true });
const FPS = 30, T = spec.duration;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden}
body{font-family:'Inter Tight','Noto Color Emoji',sans-serif;background:#14120f;-webkit-font-smoothing:antialiased}
em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:${ACC};letter-spacing:-.01em}
.sc{position:absolute;inset:0;display:none;overflow:hidden}
.dark{background:#14120f;color:#fbfaf8;--sub:#c9c3b8;--mut:#8f887c;--line:#2e2a24;--card:#1f1c18;--fg:#fbfaf8;--bg:#14120f}
.light{background:#fbfaf8;color:#17130a;--sub:#4d4740;--mut:#8a8378;--line:#e7e2d9;--card:#f1ede6;--fg:#17130a;--bg:#fbfaf8}
.acc{background:${ACC};color:#fff;--sub:#ffe3d9;--mut:#ffd0c0;--fg:#fff}
.acc em{color:#14120f}
.logo{position:absolute;left:84px;top:230px;font-size:44px;font-weight:500;letter-spacing:-.02em;z-index:5}
.logo em{letter-spacing:0}
#bar{position:absolute;left:84px;right:84px;top:190px;height:8px;border-radius:4px;background:rgba(140,130,118,.35);z-index:9}
#bar i{display:block;height:100%;width:0;border-radius:4px;background:${ACC}}
.mid{position:absolute;left:84px;right:120px;top:50%;transform:translateY(-54%)}
.h1{font-size:150px;line-height:.96;font-weight:600;letter-spacing:-.05em}
.h1 em{font-size:164px}
.h2{font-size:112px;line-height:.98;font-weight:600;letter-spacing:-.045em}
.h2 em{font-size:124px}
.sub{font-size:58px;line-height:1.22;color:var(--sub);letter-spacing:-.015em;margin-top:44px}
.kick{font-size:36px;font-weight:600;letter-spacing:.08em;color:${ACC};text-transform:uppercase;margin-bottom:28px}
.big{font-family:'Instrument Serif';font-style:italic;color:${ACC};font-size:520px;line-height:.78;margin-left:-14px;margin-bottom:40px}
[data-in]{will-change:transform,opacity}
${spec.css || ''}
</style></head><body>${spec.body}<div id="bar"><i></i></div>
<script>
const T=${T};
const cl=(x)=>Math.max(0,Math.min(1,x)), eo=(x)=>1-Math.pow(1-x,3), back=(x)=>{const c=1.7;return 1+ (c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
document.querySelectorAll('[data-fx=type]').forEach(e=>{e.dataset.text=e.textContent;});
window.seek=(t)=>{
  document.querySelectorAll('.sc').forEach(s=>{
    const a=+s.dataset.s,b=+s.dataset.e; const on=t>=a&&t<b; s.style.display=on?'block':'none';
    if(on){ s.style.opacity = (b>=T?1:cl((b-t)/0.18)) * (a<=0?1:cl((t-a)/0.15+0.4)); }
  });
  document.querySelectorAll('[data-in]').forEach(e=>{
    const t0=+e.dataset.in, d=+(e.dataset.d||0.45), fx=e.dataset.fx||'up'; const x=cl((t-t0)/d);
    if(fx==='up'){e.style.opacity=eo(x);e.style.transform='translateY('+((1-eo(x))*70)+'px)';}
    else if(fx==='pop'){e.style.opacity=cl(x*3);e.style.transform='scale('+(x<=0?0:0.5+0.5*back(x))+')';}
    else if(fx==='left'){e.style.opacity=eo(x);e.style.transform='translateX('+((1-eo(x))*-90)+'px)';}
    else if(fx==='right'){e.style.opacity=eo(x);e.style.transform='translateX('+((1-eo(x))*90)+'px)';}
    else if(fx==='fade'){e.style.opacity=x;}
    else if(fx==='type'){const full=[...e.dataset.text];const n=Math.floor(cl((t-t0)/d)*full.length);e.textContent=full.slice(0,n).join('');e.style.opacity=t>=t0?1:0;}
    else if(fx==='out'){e.style.opacity=1-x;}
  });
  document.querySelector('#bar i').style.width=(cl(t/T)*100)+'%';
  (${spec.tick || '()=>{}'})(t,cl,eo,back);
};
</script></body></html>`;

(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await pg.setContent(html); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(300);
  if (mode === 'stills') {
    for (const t of spec.stills) { await pg.evaluate(t => window.seek(t), t); await pg.screenshot({ path: path.join(__dirname, `still-${spec.name}-${String(t).replace('.', '_')}.jpg`), type: 'jpeg', quality: 80 }); }
    await b.close(); return;
  }
  // cover
  await pg.evaluate(t => window.seek(t), spec.coverAt);
  await pg.evaluate(() => { document.querySelector('#bar').style.display = 'none'; });
  await pg.screenshot({ path: path.join(OUT, spec.name + '-portada.jpg'), type: 'jpeg', quality: 93 });
  await pg.evaluate(() => { document.querySelector('#bar').style.display = ''; });
  const out = path.join(OUT, spec.name + '.mp4');
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    ...(spec.audio ? ['-i', path.join(__dirname, spec.audio), '-af', 'apad,loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', '44100', '-ac', '2', '-t', String(T)] : ['-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=44100']),
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(FPS), '-c:a', 'aac', '-b:a', '128k', '-shortest', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const N = Math.round(T * FPS);
  for (let i = 0; i < N; i++) {
    await pg.evaluate(t => window.seek(t), i / FPS);
    const buf = await pg.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); console.log('done', out);
})();
