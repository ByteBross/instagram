const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const { FONTS } = require('./base');
const { char } = require('./chars');
const OUT = process.env.OUT || path.join(__dirname, 'salida'); fs.mkdirSync(OUT, { recursive: true });
const carmen = (o = {}) => char({ id: 'c', skin: '#f0c4a0', shirt: '#e2481b', hair: '#3a2a1e', style: 'bun', mouth: 'big', brows: 'up', ...o });
const N = 7;
const tick = (s = 44) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4.500 12.500l5 5L19.500 7"/></svg>`;
const CSS = `${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px}
body{background:#f6f1ea;color:#17130a;font-family:'Inter Tight','Noto Color Emoji',sans-serif;position:relative;overflow:hidden;-webkit-font-smoothing:antialiased}
em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#e2481b;letter-spacing:-.01em}
.logo{position:absolute;left:72px;top:64px;font-size:34px;font-weight:500;letter-spacing:-.02em;z-index:5}
.pg{position:absolute;right:72px;top:68px;font-size:30px;color:#8a8378;z-index:5}
.floor{position:absolute;left:0;right:0;top:1090px;bottom:0;background:#e4dccf}
.skirt{position:absolute;left:0;right:0;top:1076px;height:14px;background:#d3c9b8}
.num{position:absolute;left:72px;top:160px;width:120px;height:120px;border-radius:34px;background:#e2481b;color:#fff;font-size:84px;font-weight:700;display:flex;align-items:center;justify-content:center}
h2{position:absolute;left:220px;right:72px;top:152px;font-size:84px;line-height:1;font-weight:600;letter-spacing:-.045em}
h2 em{font-size:92px}
.d{position:absolute;left:72px;right:72px;top:340px;font-size:44px;line-height:1.25;color:#4d4740;letter-spacing:-.015em}
.w{position:absolute}.ch{position:absolute}
.ft{position:absolute;left:72px;right:72px;bottom:52px;display:flex;justify-content:space-between;font-size:32px;color:#6b655c;z-index:5}
.bub{position:absolute;background:#17130a;color:#fbfaf8;border-radius:44px 44px 44px 10px;padding:40px 46px;font-size:60px;line-height:1.14;letter-spacing:-.025em;font-weight:500}
.tag{position:absolute;background:#fff;border-radius:40px;padding:14px 30px;font-size:34px;font-weight:600;box-shadow:0 4px 0 #d3c9b8;display:flex;gap:14px;align-items:center}
.tag i{width:44px;height:44px;border-radius:50%;background:#e2481b;display:inline-flex;align-items:center;justify-content:center}
.card{position:absolute;background:#fff;border-radius:36px;box-shadow:0 6px 0 #d3c9b8}
.row{display:flex;justify-content:space-between;align-items:baseline;font-size:48px;font-weight:500;letter-spacing:-.02em;padding:26px 0;border-bottom:3px solid #eee7dc}
.row:last-child{border:0}.row b{font-weight:700;color:#e2481b}
.pol{position:absolute;background:#fff;padding:18px 18px 64px;border-radius:10px;box-shadow:0 6px 0 #d3c9b8}
.pol i{display:block;width:220px;height:220px;border-radius:4px}
.btn{background:#e2481b;color:#fff;border-radius:60px;padding:30px 40px;font-size:46px;font-weight:600;letter-spacing:-.02em;text-align:center}
.btn2{border:4px solid #d3c9b8;color:#8a8378;border-radius:60px;padding:22px 40px;font-size:40px;font-weight:500;text-align:center;margin-top:20px}
.win{position:absolute;background:#fff;border-radius:26px;box-shadow:0 6px 0 #d3c9b8;overflow:hidden}
.win u{display:flex;gap:10px;padding:18px 20px;background:#eee7dc}.win u b{width:18px;height:18px;border-radius:50%;background:#c9c3b8;display:block}
.win s{display:block;margin:20px;border-radius:12px}
.heart{position:absolute;width:96px;height:96px;border-radius:50%;background:#e2481b;color:#fff;font-size:54px;display:flex;align-items:center;justify-content:center}
.tile{position:absolute;width:150px;height:150px;border-radius:40px;background:#fff;box-shadow:0 6px 0 #d3c9b8;display:flex;align-items:center;justify-content:center;font-size:66px;font-weight:700;letter-spacing:-.04em}
.tile.on{background:#e2481b;color:#fff;box-shadow:0 6px 0 #b83610}
.pill{position:absolute;background:#e2481b;color:#fff;border-radius:100px;padding:26px 44px;font-size:40px;font-weight:600}
`;
const frame = (i, inner, foot = true) => `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>
<div class="pg">${i}/${N}</div><div class="floor"></div><div class="skirt"></div>${inner}
${foot ? `<div class="ft"><span>${i === 1 ? 'Desliza →' : 'Antes de encargar tu web'}</span><span>Guárdalo</span></div>` : ''}</body></html>`;
const item = (i, n, title, desc, scene) => frame(i, `<div class="num">${n}</div><h2>${title}</h2><div class="d">${desc}</div>${scene}`);
const C = (l, t, w, o) => `<div class="w" style="left:${l}px;top:${t}px">${carmen({ w, ...o })}</div>`;

const S = [
  frame(1, `
    <div style="position:absolute;left:72px;top:170px;font-size:30px;font-weight:600;letter-spacing:.08em;color:#e2481b;text-transform:uppercase">Checklist · 5 cosas</div>
    <h2 style="left:72px;top:220px;font-size:112px">Antes de encargar tu web, <em style="font-size:124px">ten esto a mano.</em></h2>
    ${C(560, 560, 420, { armL: 150, armR: -24 })}
    <div class="tile on" style="left:72px;top:640px">${tick(80)}</div>
    <div class="tile on" style="left:250px;top:700px;transform:rotate(-6deg)">${tick(80)}</div>
    <div class="tile" style="left:110px;top:860px;transform:rotate(5deg)">Aa</div>
    <div class="tile" style="left:300px;top:900px">€</div>
    <div class="tile" style="left:430px;top:720px;transform:rotate(8deg)">♥</div>`),
  item(2, 1, 'Qué haces, <em>en una frase</em>', 'Si no cabe en una línea, todavía no está claro.',
    `${C(40, 560, 380, { armL: 12, armR: -120 })}
     <div class="bub" style="left:400px;top:520px;width:610px">«Peluquería en el centro, con cita el mismo día»</div>
     <div class="tag" style="left:560px;top:880px"><i>${tick(26)}</i>Cabe en una línea</div>`),
  item(3, 2, 'Servicios <em>y precios</em>', 'Una lista sencilla. ¿Sin precios? Al menos un «desde».',
    `${C(20, 560, 380, { armL: 12, armR: -105 })}
     <div class="card" style="left:410px;top:540px;width:600px;padding:20px 44px"><div class="row">Corte<b>15 €</b></div><div class="row">Corte y barba<b>22 €</b></div><div class="row">Color<b>desde 35 €</b></div></div>`),
  item(4, 3, 'Fotos <em>reales</em>', 'De tu trabajo o tu local. Con el móvil y buena luz valen.',
    `${C(20, 560, 380, { armL: 12, armR: 40, phone: true, mouth: 'smile' })}
     <div class="pol" style="left:440px;top:540px;transform:rotate(-7deg)"><i style="background:linear-gradient(135deg,#e2481b,#f3a988)"></i></div>
     <div class="pol" style="left:720px;top:600px;transform:rotate(6deg)"><i style="background:linear-gradient(135deg,#6f7d8c,#cfe3ee)"></i></div>
     <div class="pol" style="left:570px;top:780px;transform:rotate(-2deg)"><i style="background:linear-gradient(135deg,#b89b6a,#efe3cc)"></i></div>`),
  item(5, 4, 'Cómo te <em>contactan</em>', 'WhatsApp, llamada, formulario… Elige uno principal.',
    `${C(20, 560, 380, { armL: 150, armR: -14 })}
     <div class="card" style="left:420px;top:540px;width:590px;padding:44px 40px"><div class="btn">Pide cita por WhatsApp</div><div class="btn2">Llamar</div><div class="btn2">Formulario</div></div>
     <div class="tag" style="left:700px;top:500px;transform:rotate(4deg)"><i>${tick(26)}</i>El principal</div>`),
  item(6, 5, 'Dos webs <em>que te gusten</em>', 'No para copiarlas: para explicar tu gusto sin tecnicismos.',
    `${C(20, 560, 380, { armL: 12, armR: -110, mouth: 'smile' })}
     <div class="win" style="left:420px;top:560px;width:300px;height:400px;transform:rotate(-4deg)"><u><b></b><b></b><b></b></u><s style="height:150px;background:#e2481b"></s><s style="height:30px;background:#eee7dc"></s><s style="height:30px;background:#eee7dc;width:60%"></s></div>
     <div class="win" style="left:720px;top:620px;width:300px;height:400px;transform:rotate(5deg)"><u><b></b><b></b><b></b></u><s style="height:90px;background:#17130a"></s><s style="height:110px;background:#cfe3ee"></s><s style="height:30px;background:#eee7dc"></s></div>
     <div class="heart" style="left:640px;top:520px">♥</div><div class="heart" style="left:930px;top:580px">♥</div>`),
  frame(7, `
    <h2 style="left:72px;top:170px;font-size:104px">¿No lo tienes todo? <em style="font-size:116px">No pasa nada.</em></h2>
    <div class="d" style="top:420px;right:120px">Cuéntanoslo con tus palabras y lo ordenamos contigo.</div>
    ${C(620, 520, 400, { armL: 150, armR: -24 })}
    ${['Una frase', 'Servicios y precios', 'Fotos reales', 'Contacto', 'Webs que te gustan'].map((s, i) => `<div class="tag" style="left:72px;top:${600 + i * 84}px"><i>${tick(26)}</i>${s}</div>`).join('')}
    <div class="pill" style="left:72px;bottom:120px">WhatsApp en el enlace del perfil</div>`, false),
];
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (let i = 0; i < S.length; i++) {
    await pg.setContent(S[i]); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(150);
    const bad = await pg.evaluate(() => [...document.querySelectorAll('body > *:not(.w):not(.floor):not(.skirt)')].filter(e => { const r = e.getBoundingClientRect(); return r.width && (r.right > 1081 || r.left < -1) }).map(e => e.className + ':' + e.textContent.slice(0, 20)));
    if (bad.length) console.log('OVERFLOW', i + 1, bad);
    await pg.screenshot({ path: path.join(OUT, `jueves-carrusel-${i + 1}.png`) });
  }
  await b.close(); console.log('ok');
})();
