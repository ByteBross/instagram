const { char } = require('./chars');
const carmen = (id, o = {}) => char({ id, skin: '#f0c4a0', shirt: '#e2481b', hair: '#3a2a1e', style: 'bun', ...o });
const client = (id, o = {}) => char({ id, skin: '#e2b089', shirt: '#6f7d8c', hair: '#6b4a2f', style: 'short', cape: '#ffffff', mouth: 'smile', ...o });
const walker = (id, o = {}) => char({ id, skin: '#c98f66', shirt: '#6f7d8c', hair: '#17130a', style: 'curly', ...o });
const floor = '<div class="floor"></div><div class="skirt"></div>';
const tickS = `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.500 12.500l5 5L19.500 7"/></svg>`;

// Peluquería: espejo, estantería, sillón con cliente, Carmen cortando y mostrador con el móvil
const salon = (p, { happy = false, cl = {} } = {}) => `
  <div class="mirror"><i></i><i></i></div>
  <div class="shelf"><b style="height:120px;background:#e2481b"></b><b style="height:90px;background:#17130a"></b><b style="height:140px;background:#c9b79c"></b><b style="height:100px;background:#6f7d8c"></b></div>
  ${floor}
  <div class="back"></div>
  <div class="w" style="left:110px;top:830px">${client(p + 'cl', { w: 400, ...cl })}</div>
  <div class="seat"></div><div class="pole"></div><div class="foot"></div>
  ${[0, 1, 2, 3, 4].map(i => `<div class="hb" data-x="${[210, 300, 380, 250, 420][i]}" data-p="${i * 0.21}"></div>`).join('')}
  <div class="w" style="left:400px;top:770px"><div style="transform:scaleX(-1);width:430px;height:645px">${carmen(p + 'ca', { w: 430, mouth: happy ? 'big' : 'wavy', brows: happy ? 'up' : 'worry', armL: 10, armR: -62, scissors: true })}</div></div>
  <div class="counter"><i></i></div>
  <div class="mob" id="${p}mob"><i></i><b id="${p}badge">1</b></div>`;

const phone = (inner, extra = '') => `<div class="phone" ${extra}><div class="scr">${inner}</div></div>`;
const them = (t, txt, hora) => `<div class="b them" data-in="${t}" data-fx="left" data-d="0.25">${txt}<i>${hora}</i></div>`;
const me = (t, txt, hora, auto = true) => `<div class="b me" data-in="${t}" data-fx="right" data-d="0.25">${auto ? '<u>Automático</u>' : ''}${txt}<i>${hora}</i></div>`;
const ajuste = (s, e, n, title, chat) => `
<div class="sc light" data-s="${s}" data-e="${e}">
  <div class="num" data-in="${s}" data-fx="pop" data-d="0.25">${n}</div>
  <div class="ttl" style="left:250px;top:250px;font-size:96px" data-in="${s + 0.1}" data-d="0.25">${title}</div>
  ${phone(`<div class="bar2"><span class="av"></span>Peluquería Carmen</div><div class="chat">${chat(s)}</div>`, `style="top:600px;height:900px"`)}
  <div class="on" data-in="${s + 0.25}" data-fx="pop" data-d="0.25">${tickS}Activado</div>
  <div class="w" style="left:760px;top:1150px" data-in="${s}" data-fx="right" data-d="0.3">${carmen('e' + n, { w: 290, mouth: 'big', brows: 'up', armL: 150, armR: -10 })}</div>
</div>`;

module.exports = {
  name: 'viernes-reel-historia', out: 'piloto-munecos', duration: 31, coverAt: 3.4, audio: 'audio/carmen-a.mp3',
  stills: [0.9, 3.4, 5.0, 6.7, 8.4, 10.3, 12.2, 13.8, 15.6, 17.6, 19.6, 21.7, 23.6, 25.6, 27.6, 30.2],
  css: `
  .logo,#bar{display:none}
  .sc.light{background:#f6f1ea}
  .floor{position:absolute;left:0;right:0;top:1400px;bottom:0;background:#e4dccf}
  .skirt{position:absolute;left:0;right:0;top:1384px;height:16px;background:#d3c9b8}
  .ttl{position:absolute;left:84px;right:100px;top:230px;font-size:112px;line-height:.98;font-weight:600;letter-spacing:-.045em;z-index:6}
  .ttl em{font-size:1.1em}
  .ch{position:absolute}.w{position:absolute}
  .mirror{position:absolute;left:70px;top:590px;width:400px;height:560px;border:18px solid #fff;border-radius:200px 200px 30px 30px;background:#cfe3ee;box-shadow:0 5px 0 #d3c9b8;overflow:hidden}
  .mirror i{position:absolute;top:-40px;left:90px;width:36px;height:800px;background:rgba(255,255,255,.55);transform:rotate(24deg)}.mirror i+i{left:160px;width:16px}
  .shelf{position:absolute;left:620px;top:600px;width:380px;height:170px;border-bottom:18px solid #b89b6a;display:flex;align-items:flex-end;gap:22px;padding:0 30px}
  .shelf b{width:56px;border-radius:14px 14px 4px 4px;display:block}
  .back{position:absolute;left:170px;top:1010px;width:280px;height:300px;border-radius:50px;background:#4d4740}
  .seat{position:absolute;left:140px;top:1225px;width:340px;height:120px;border-radius:36px;background:#17130a}
  .pole{position:absolute;left:290px;top:1340px;width:40px;height:70px;background:#8a8378}
  .foot{position:absolute;left:210px;top:1400px;width:200px;height:26px;border-radius:13px;background:#8a8378}
  .hb{position:absolute;left:0;top:0;width:22px;height:10px;border-radius:5px;background:#6b4a2f}
  .counter{position:absolute;left:800px;top:1190px;width:300px;height:210px;background:#c9b79c}.counter i{position:absolute;left:-16px;right:0;top:-22px;height:26px;border-radius:10px;background:#b89b6a}
  .mob{position:absolute;left:880px;top:1020px;width:104px;height:160px;border-radius:22px;background:#17130a;transform-origin:center bottom;z-index:5}
  .mob i{position:absolute;inset:11px;border-radius:10px;background:#fbfaf8}
  .mob b{position:absolute;right:-26px;top:-26px;min-width:64px;height:64px;border-radius:32px;background:#e2481b;color:#fff;font-size:38px;font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 12px}
  .wave{position:absolute;left:932px;top:1100px;width:0;height:0;border:8px solid #e2481b;border-radius:50%;opacity:0}
  .chip{position:absolute;left:770px;top:980px;background:#17130a;color:#fff;border-radius:40px;padding:16px 30px;font-size:38px;font-weight:600;display:flex;gap:14px;align-items:center;white-space:nowrap;z-index:6}
  .chip svg{width:34px;height:34px}
  .phone{position:absolute;left:120px;top:330px;width:840px;height:1180px;background:#17130a;border-radius:90px;padding:26px;transform-origin:center}
  .phone .scr{color:#17130a;position:relative;width:100%;height:100%;background:#f1ede6;border-radius:66px;overflow:hidden}
  .clock{font-size:190px;font-weight:600;letter-spacing:-.05em;text-align:center;margin-top:70px;line-height:1}
  .clock span{display:block;font-size:40px;font-weight:400;letter-spacing:0;color:#8a8378;margin-top:10px}
  .noti{position:absolute;left:30px;right:30px;background:#fff;border-radius:38px;padding:28px 32px;display:flex;gap:26px;align-items:center;box-shadow:0 6px 0 #e7e2d9}
  .noti i{width:96px;height:96px;border-radius:26px;background:#e2481b;flex:none;display:flex;align-items:center;justify-content:center;color:#fff;font-style:normal;font-size:50px;font-weight:700}
  .noti div{font-size:52px;font-weight:600;letter-spacing:-.03em;line-height:1.1}
  .noti span{display:block;font-size:32px;font-weight:400;color:#8a8378;letter-spacing:0;margin-bottom:6px}
  .bub{position:absolute;background:#17130a;color:#fbfaf8;border-radius:44px 44px 44px 10px;padding:34px 42px;font-size:56px;line-height:1.18;letter-spacing:-.02em;font-weight:500;transform-origin:left bottom;z-index:6}
  .stamp{position:absolute;border:8px solid #e2481b;color:#e2481b;font-size:72px;font-weight:700;letter-spacing:-.02em;padding:10px 34px;border-radius:26px;transform-origin:center;background:#fbfaf8;z-index:6}
  .door{position:absolute;left:760px;top:640px;width:280px;height:760px;background:#b89b6a;border-radius:22px 22px 0 0;box-shadow:inset 0 0 0 16px #a3875a}
  .door i{position:absolute;left:40px;top:330px;width:34px;height:34px;border-radius:50%;background:#17130a}
  .door b{position:absolute;left:60px;top:90px;width:160px;height:70px;border-radius:12px;background:#fbfaf8;color:#17130a;font-size:30px;font-weight:700;letter-spacing:.06em;display:flex;align-items:center;justify-content:center}
  .trow{position:absolute;left:84px;right:84px;height:136px;background:#1f1c18;border-radius:36px;display:flex;align-items:center;padding:0 40px;font-size:54px;font-weight:500;letter-spacing:-.02em;color:#fbfaf8}
  .tg{margin-left:auto;width:130px;height:74px;border-radius:37px;background:#4d4740;position:relative;flex:none}
  .tg i{position:absolute;left:8px;top:8px;width:58px;height:58px;border-radius:50%;background:#fff}
  .num{position:absolute;left:84px;top:236px;width:130px;height:130px;border-radius:36px;background:#e2481b;color:#fff;font-size:92px;font-weight:700;display:flex;align-items:center;justify-content:center;z-index:6}
  .on{position:absolute;left:84px;top:480px;background:#17130a;color:#fff;border-radius:50px;padding:14px 32px 14px 18px;font-size:40px;font-weight:600;display:flex;align-items:center;gap:14px;transform-origin:left center}
  .on svg{width:44px;height:44px;background:#e2481b;border-radius:50%;padding:8px}
  .bar2{height:130px;background:#fbfaf8;display:flex;align-items:center;gap:22px;padding:0 40px;font-size:46px;font-weight:600;letter-spacing:-.02em;border-bottom:3px solid #e7e2d9}
  .av{width:76px;height:76px;border-radius:50%;background:#e2481b;display:inline-block}
  .chat{padding:34px 30px;display:flex;flex-direction:column;gap:24px;height:700px}
  .b{max-width:600px;padding:24px 30px 20px;font-size:42px;line-height:1.2;letter-spacing:-.012em;position:relative}
  .b i{display:block;font-style:normal;font-size:24px;opacity:.6;margin-top:6px;text-align:right}
  .them{align-self:flex-start;background:#fff;border-radius:30px 30px 30px 8px}
  .me{align-self:flex-end;background:#17130a;color:#fbfaf8;border-radius:30px 30px 8px 30px}
  .me u{display:block;text-decoration:none;font-size:24px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#ff8a63;margin-bottom:6px}
  .field{background:#fff;border-radius:60px;padding:22px 34px;font-size:44px;font-weight:500;min-height:98px;border:3px solid #e2481b}
  .cat{display:flex;gap:16px}
  .cat div{flex:1;background:#fff;border-radius:26px;padding:16px;font-size:32px;font-weight:600;letter-spacing:-.02em}
  .cat b{display:block;height:190px;border-radius:16px;margin-bottom:14px;background:linear-gradient(135deg,#e2481b,#f39a78)}
  .cat div:nth-child(2) b{background:linear-gradient(135deg,#17130a,#5b5348)}.cat div:nth-child(3) b{background:linear-gradient(135deg,#b89b6a,#e4d7bd)}
  .cat span{display:block;font-weight:400;color:#8a8378;font-size:30px;margin-top:4px}
  .spark{position:absolute;color:#e2481b;font-size:90px;line-height:1;z-index:6}
  .path{margin-top:50px;display:flex;flex-direction:column;gap:20px;align-items:flex-start}
  .path div{font-size:50px;font-weight:500;border:3px solid rgba(255,255,255,.5);border-radius:60px;padding:20px 40px}
  .path div.on2{background:#14120f;border-color:#14120f}
  .handle{position:absolute;left:84px;bottom:440px;font-size:46px;font-weight:500}
  `,
  body: `
<div class="sc light" data-s="0" data-e="4.15">${salon('a')}
  <div class="wave" id="wv1"></div><div class="wave" id="wv2"></div>
  <div class="ttl" data-in="0" data-d="0.25">Carmen <em>no da abasto.</em></div>
  <div class="stamp" style="left:650px;top:860px;transform:rotate(4deg);font-size:52px;white-space:nowrap;padding:8px 24px" data-in="2.6" data-fx="pop" data-d="0.3">¡Bzzz! ¡Bzzz!</div>
</div>

<div class="sc acc" data-s="4.15" data-e="7.05">
  ${phone(`<div class="clock">11:42<span>martes</span></div>
    <div class="noti" style="top:440px" data-in="4.3" data-fx="pop" data-d="0.25"><i>1</i><div><span>Mensaje nuevo</span>¿Tenéis hueco?</div></div>
    <div class="noti" style="top:640px" data-in="5.19" data-fx="pop" data-d="0.25"><i>2</i><div><span>Mensaje nuevo</span>¿Abrís mañana?</div></div>
    <div class="noti" style="top:840px" data-in="6.2" data-fx="pop" data-d="0.25"><i>3</i><div><span>Mensaje nuevo</span>¿Cuánto cuesta?</div></div>`, 'id="bigph"')}
</div>

<div class="sc light" data-s="7.05" data-e="10.8"><div class="door"><b>ABIERTO</b><i></i></div>${floor}
  <div class="ttl" data-in="7.1" data-d="0.25">Y cuando por fin contesta…</div>
  <div class="w" style="left:40px;top:800px">${carmen('c_ca', { w: 440, mouth: 'sad', brows: 'worry', armL: 8, armR: 38, phone: true })}</div>
  <div class="w" id="walkw" style="left:430px;top:880px">${walker('c_wk', { w: 360, mouth: 'flat', brows: 'flat', armL: 14, armR: -14 })}</div>
  <div class="bub" style="left:290px;top:650px;width:460px" data-in="9.1" data-fx="pop" data-d="0.25">Ya he ido a otra…</div>
  <div class="stamp" style="left:90px;top:1430px;transform:rotate(-4deg)" data-in="9.9" data-fx="pop" data-d="0.3">Demasiado tarde</div>
</div>

<div class="sc dark" data-s="10.8" data-e="14.2">
  <div class="ttl" data-in="10.85" data-d="0.25" style="font-size:104px">Hasta que activa <em>4 ajustes gratis</em> de WhatsApp Business</div>
  ${['Mensaje de bienvenida', 'Mensaje de ausencia', 'Respuestas rápidas', 'Catálogo'].map((l, i) => `<div class="trow" style="top:${800 + i * 160}px" data-in="${11.3 + i * 0.15}" data-fx="left" data-d="0.3">${l}<div class="tg" id="tg${i}"><i></i></div></div>`).join('')}
</div>

${ajuste(14.2, 16.25, 1, 'Mensaje de <em>bienvenida</em>', s => them(s + 0.3, 'Hola, ¿tenéis hueco?', '10:02') + me(s + 0.75, '¡Hola! Gracias por escribir 👋 Te contestamos enseguida.', '10:02'))}
${ajuste(16.25, 18.2, 2, 'Mensaje de <em>ausencia</em>', s => them(s + 0.3, '¿Abrís mañana?', '23:41') + me(s + 0.75, 'Ahora estamos cerrados. Abrimos de lunes a viernes, de 9 a 19 h.', '23:41'))}
${ajuste(18.2, 20.25, 3, 'Respuestas <em>rápidas</em>', s => `<div class="field" data-in="${s + 0.25}" data-fx="fade" data-d="0.15"><span data-in="${s + 0.3}" data-fx="type" data-d="0.4">/precios</span></div>` + me(s + 0.85, 'Corte 15 € · Corte y barba 22 € · Color desde 35 €', '11:15', false))}
${ajuste(20.25, 22.35, 4, '<em>Catálogo</em> con precios', s => `<div class="cat">${[['Corte', '15 €'], ['Corte y barba', '22 €'], ['Color', 'desde 35 €']].map((c, i) => `<div data-in="${s + 0.3 + i * 0.18}" data-d="0.3"><b></b>${c[0]}<span>${c[1]}</span></div>`).join('')}</div>`)}

<div class="sc light" data-s="22.35" data-e="26.1">${salon('f', { happy: true, cl: { skin: '#c98f66', hair: '#17130a', style: 'curly', mouth: 'big', brows: 'up' } })}
  <div class="ttl" data-in="22.4" data-d="0.25" style="font-size:100px">Ahora su WhatsApp <em>contesta solo.</em></div>
  <div class="chip" id="chip0">${tickS}Respondido</div><div class="chip" id="chip1">${tickS}Respondido</div><div class="chip" id="chip2">${tickS}Respondido</div>
  <div class="spark" id="s_a" style="left:500px;top:720px">✦</div><div class="spark" id="s_b" style="left:60px;top:1200px;font-size:60px">✦</div>
  <div class="stamp" style="left:84px;top:1450px;border-color:#17130a;color:#17130a" data-in="24.6" data-fx="pop" data-d="0.3">Y Carmen, a lo suyo.</div>
</div>

<div class="sc acc" data-s="26.1" data-e="31">
  <div class="mid"><div class="h2" data-in="26.15" data-d="0.25">Los tienes <em>aquí:</em></div>
  <div class="path"><div data-in="26.6" data-fx="left" data-d="0.3">Ajustes</div><div class="on2" data-in="27.1" data-fx="left" data-d="0.3">Herramientas para la empresa</div></div>
  <div class="sub" data-in="28.5" style="color:#fff;font-weight:500">Guárdalo y actívalo hoy.</div></div>
  <div class="handle" data-in="29.2">@by.xperiencestudio</div>
</div>`,
  tick: `(t,cl,eo,back)=>{
    const S=Math.sin, $=(q)=>document.querySelector(q);
    document.querySelectorAll('.sc').forEach(s=>{const a=+s.dataset.s,b=+s.dataset.e; if(t>=a&&t<b&&b<31){s.style.transform='scale('+(1+0.04*(t-a)/(b-a))+')';s.style.transformOrigin='50% 60%';}});
    document.querySelectorAll('.ch').forEach((c,i)=>{
      const ph=i*1.7;
      c.querySelector('.bob').style.transform='translateY('+(S(t*3.2+ph)*6)+'px)';
      c.querySelector('.head').style.transform='rotate('+(S(t*2.1+ph)*2.5)+'deg)';
      c.querySelector('.eyes').style.transform='scaleY('+(((t+ph)%2.7)<0.12?0.12:1)+')';
    });
    const rot=(sel,a)=>{const e=$(sel); if(e) e.style.transform='rotate('+a+'deg)';};
    // Carmen corta el pelo (escenas a y f)
    ['a','f'].forEach(p=>{ rot('#'+p+'ca .armR', -62+S(t*9)*9); const sc=$('#'+p+'ca .sci'); if(sc) sc.style.transform='scaleX('+(0.55+0.45*Math.abs(S(t*9)))+')';
      const c=$('#'+p+'cl'); if(c){c.querySelectorAll('.armL,.armR,.legL,.legR').forEach(e=>e.style.display='none');} });
    document.querySelectorAll('.hb').forEach(d=>{const k=((t*0.8+ +d.dataset.p)%1); d.style.transform='translate('+(+d.dataset.x+S(k*9)*14)+'px,'+(930+k*330)+'px) rotate('+(k*300)+'deg)'; d.style.opacity=k>0.92?0:1;});
    // móvil del mostrador: vibra y suma mensajes (escena a); tranquilo en f
    const am=$('#amob'); if(am){am.style.transform='rotate('+(t>1.6?S(t*48)*8:0)+'deg)'; $('#abadge').textContent=Math.max(1,Math.min(9,Math.floor((t-1.4)*3.2)));}
    const fb=$('#fbadge'); if(fb) fb.style.display='none';
    ['wv1','wv2'].forEach((id,i)=>{const w=$('#'+id); if(w){const k=((t*1.6+i*0.5)%1); const r=30+k*150; w.style.width=w.style.height=(r*2)+'px'; w.style.marginLeft=w.style.marginTop=(-r)+'px'; w.style.opacity=t>1.6?(1-k)*0.8:0;}});
    const bp=$('#bigph'); if(bp){const hit=[4.3,5.19,6.2].map(x=>Math.max(0,1-Math.abs(t-x-0.12)/0.22)).reduce((a,b)=>Math.max(a,b),0); bp.style.transform='rotate('+(S(t*60)*2.5*hit)+'deg) scale('+(1+0.02*hit)+')';}
    // cliente que se marcha andando
    const ww=$('#walkw'); if(ww){const k=cl((t-8.9)/1.9); ww.style.transform='translateX('+(k*k*720)+'px)'; const sw=t>8.9?S(t*13)*26:0; rot('#c_wk .legL',sw); rot('#c_wk .legR',-sw); rot('#c_wk .armL',14-sw*0.8); rot('#c_wk .armR',-14-sw*0.8);}
    rot('#c_ca .armR', 38+S(t*5)*3);
    // interruptores
    [0,1,2,3].forEach(i=>{const g=$('#tg'+i); if(g){const k=eo(cl((t-(12.0+i*0.42))/0.25)); g.style.background=k>0.5?'#e2481b':'#4d4740'; g.firstChild.style.transform='translateX('+(k*56)+'px)';}});
    [1,2,3,4].forEach(n=>rot('#e'+n+' .armL',150+S(t*9)*14));
    // respuestas automáticas flotando (escena f)
    [0,1,2].forEach(i=>{const c=$('#chip'+i); if(c){const k=((t*0.55+i*0.333)%1); c.style.transform='translate('+(S(k*6+i)*20)+'px,'+(-k*230)+'px) scale('+(0.7+0.3*cl(k*5))+')'; c.style.opacity=cl(k*6)*cl((1-k)*4);}});
    ['s_a','s_b'].forEach((id,i)=>{const s=$('#'+id); if(s){s.style.transform='scale('+(0.7+0.4*Math.abs(S(t*3+i*1.3)))+') rotate('+(t*40+i*30)+'deg)';}});
  }`,
};
