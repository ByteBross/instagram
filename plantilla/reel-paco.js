const { char } = require('./chars');
const baseCss = require('./reel-carmen').css;
const lucia = (id, o = {}) => char({ id, skin: '#f0c4a0', shirt: '#e2481b', hair: '#3a2a1e', style: 'bob', mouth: 'big', brows: 'up', ...o });
const paco = (id, o = {}) => char({ id, skin: '#f2d0b0', shirt: '#17130a', pants: '#4d4740', style: 'none', cap: '#e2481b', mouth: 'smile', brows: 'up', ...o });
const floor = '<div class="floor"></div><div class="skirt"></div>';
const tickS = `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.500 12.500l5 5L19.500 7"/></svg>`;
const star = (cls = '', sz = 70, on = true) => `<svg class="st ${cls}" width="${sz}" height="${sz}" viewBox="0 0 24 24"><path fill="${on ? '#e2481b' : '#d3c9b8'}" d="M12 1.800l3.100 6.500 7.100.900-5.200 4.900 1.300 7-6.300-3.500-6.300 3.500 1.300-7L1.800 9.200l7.100-.900z"/></svg>`;
const stars = (n, sz = 54) => [0, 1, 2, 3, 4].map(i => star('', sz, i < n)).join('');
const home = `<div class="frame" style="left:800px;top:820px;width:190px;height:230px"><i style="background:#e9b9a3"></i></div>${floor}<div class="pipe"></div>${[296, 536, 776].map(x => `<div class="joint" style="left:${x - 34}px"></div>`).join('')}<div class="patch" style="left:476px"></div>`;
const phone = (inner, extra = '') => `<div class="phone" ${extra}><div class="scr">${inner}</div></div>`;
const head = (s, n, title) => `<div class="num" data-in="${s}" data-fx="pop" data-d="0.25">${n}</div><div class="ttl" style="left:250px;top:250px;font-size:100px" data-in="${s + 0.1}" data-d="0.25">${title}</div>`;

module.exports = {
  name: 'reel-resenas-historia', out: 'piloto-munecos', duration: 31, coverAt: 4.6, audio: 'audio/paco-a.mp3',
  stills: [1.6, 4.6, 6.3, 8.2, 9.7, 11.4, 13.4, 15.6, 18.2, 19.9, 21.9, 23.6, 25.4, 26.9, 30],
  css: baseCss + `
  .pipe{position:absolute;left:-20px;right:-20px;top:640px;height:44px;background:#8a8378;box-shadow:inset 0 -12px 0 rgba(0,0,0,.15)}
  .joint{position:absolute;top:628px;width:68px;height:68px;border-radius:14px;background:#6b655c}
  .patch{position:absolute;top:630px;width:120px;height:64px;border-radius:12px;background:#e2481b}
  .frame{position:absolute;background:#fff;border-radius:10px;padding:16px;box-shadow:0 4px 0 #d3c9b8}.frame i{display:block;width:100%;height:100%;border-radius:4px}
  .res{position:absolute;left:30px;right:30px;background:#fff;border-radius:36px;padding:30px 34px;box-shadow:0 6px 0 #e7e2d9}
  .res h4{font-size:50px;font-weight:600;letter-spacing:-.03em;margin-bottom:10px}
  .res p{font-size:36px;color:#8a8378;margin-top:8px}
  .res.off{opacity:.55}
  .sbar{margin:34px 30px 0;background:#fff;border-radius:60px;padding:26px 38px;font-size:44px;color:#17130a;border:3px solid #e7e2d9}
  .ring{position:absolute;border:12px solid #e2481b;border-radius:46px;transform-origin:center}
  .rv{position:absolute;left:84px;right:84px;background:#fff;border-radius:40px;padding:34px 40px;box-shadow:0 6px 0 #d3c9b8}
  .rv q{display:block;quotes:none;font-size:52px;font-weight:500;letter-spacing:-.025em;margin-top:12px}
  .rv .rep{margin-top:22px;background:#17130a;color:#fff;border-radius:28px 28px 28px 8px;padding:22px 30px;font-size:42px;line-height:1.2;letter-spacing:-.015em;transform-origin:left top}
  .rv .rep u{display:block;text-decoration:none;font-size:24px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#ff8a63;margin-bottom:4px}
  .rate{background:#fff;border-radius:34px;padding:30px;text-align:center;font-size:40px;font-weight:600;align-self:stretch}
  .rate div{display:flex;justify-content:center;gap:10px;margin-top:16px}
  .bigst{position:absolute;left:84px;top:560px;display:flex;gap:14px}
  .call{position:absolute;left:560px;top:1000px;background:#17130a;color:#fff;border-radius:40px;padding:16px 30px;font-size:38px;font-weight:600;white-space:nowrap;z-index:6}
  `,
  body: `
<div class="sc light" data-s="0" data-e="6.65">${home}
  <div class="ttl" data-in="0" data-d="0.25" id="t_a1">Paco deja la fuga <em>perfecta.</em></div>
  <div class="ttl" data-in="3.0" data-d="0.25">Y se va… <em>sin pedir la reseña.</em></div>
  <div class="w" style="left:30px;top:800px">${lucia('a_lu', { w: 420, armL: 150, armR: -16 })}</div>
  <div class="bub" id="a_b" style="left:250px;top:705px" data-in="1.1" data-fx="pop" data-d="0.25">¡Gracias, Paco!</div>
  <div class="w" id="a_pw" style="left:560px;top:810px">${paco('a_pa', { w: 410, armL: 14, armR: -14, wrench: true })}</div>
  <div class="stamp" style="left:420px;top:1440px;transform:rotate(-4deg)" data-in="5.7" data-fx="pop" data-d="0.3">Le da corte</div>
</div>

<div class="sc acc" data-s="6.65" data-e="10.1">
  <div class="ttl" data-in="6.7" data-d="0.25" style="color:#fff">Quien busca, mira <em style="color:#14120f">las estrellas.</em></div>
  ${phone(`<div class="sbar">🔍 fontanero cerca de mí</div>
    <div class="res" style="top:200px" data-in="7.3" data-d="0.3"><h4>Otro fontanero</h4><div style="display:flex;gap:6px;align-items:center">${stars(5, 50)}</div><p>52 reseñas</p></div>
    <div class="res off" style="top:520px" data-in="7.7" data-d="0.3"><h4>Paco, fontanero</h4><div style="display:flex;gap:6px">${stars(0, 50)}</div><p>Sin reseñas todavía</p></div>
    <div class="ring" style="left:18px;top:188px;width:744px;height:300px" data-in="9.0" data-fx="pop" data-d="0.3"></div>`, 'style="left:120px;top:640px;height:940px"')}
</div>

<div class="sc light" data-s="10.1" data-e="12.45">${floor}
  <div class="ttl" data-in="10.15" data-d="0.25" style="font-size:132px">Así que Paco hace <em>3 cosas.</em></div>
  <div class="w" style="left:300px;top:760px" data-in="10.2" data-d="0.35">${paco('c_pa', { w: 480, mouth: 'big', armL: 150, armR: -150 })}</div>
</div>

<div class="sc light" data-s="12.45" data-e="16.6">${home}${head(12.45, 1, 'La pide <em>en caliente</em>')}
  <div class="w" style="left:30px;top:800px">${lucia('d_lu', { w: 420, armL: 150, armR: -16 })}</div>
  <div class="w" style="left:600px;top:810px">${paco('d_pa', { w: 410, armL: 14, armR: -150, wrench: true })}</div>
  <div class="bub" id="d_b1" style="left:250px;top:705px" data-in="12.7" data-fx="pop" data-d="0.25">¡Gracias!</div>
  <div class="bub" style="left:300px;top:600px;width:700px;font-size:50px;background:#e2481b;border-radius:44px 44px 10px 44px;transform-origin:right bottom" data-in="13.9" data-fx="pop" data-d="0.25">¿Me dejas una reseña? Es un minuto 🙏</div>
</div>

<div class="sc light" data-s="16.6" data-e="20.4">${head(16.6, 2, 'Se lo pone <em>fácil</em>')}
  ${phone(`<div class="bar2"><span class="av"></span>Paco, fontanero</div><div class="chat">
    <div class="b them" data-in="17.4" data-fx="left" data-d="0.25">¡Gracias, Lucía! Deja tu opinión aquí 👉 <span style="color:#e2481b;text-decoration:underline">enlace directo</span><i>18:20</i></div>
    <div class="rate" data-in="18.6" data-d="0.3">Tu valoración<div>${[0, 1, 2, 3, 4].map(i => `<span id="rs${i}">${star('', 96, true)}</span>`).join('')}</div></div></div>`, 'style="top:560px;height:900px"')}
  <div class="w" style="left:760px;top:1150px" data-in="16.6" data-fx="right" data-d="0.3">${lucia('e_lu', { w: 290, armL: 12, armR: 38, phone: true })}</div>
</div>

<div class="sc light" data-s="20.4" data-e="24.0">${head(20.4, 3, '<em>Contesta</em> a todas')}
  <div class="rv" style="top:560px" data-in="20.7" data-d="0.3"><div style="display:flex;gap:6px">${stars(5)}</div><q>«Rápido y claro.»</q><div class="rep" data-in="21.5" data-fx="pop" data-d="0.25"><u>Respuesta de Paco</u>¡Gracias, Lucía!</div></div>
  <div class="rv" style="top:1010px" data-in="22.6" data-d="0.3"><div style="display:flex;gap:6px">${stars(2)}</div><q>«Llegó tarde.»</q><div class="rep" data-in="23.1" data-fx="pop" data-d="0.25"><u>Respuesta de Paco</u>Lo siento. Te llamo hoy y lo arreglamos.</div></div>
</div>

<div class="sc light" data-s="24.0" data-e="27.3">${floor}
  <div class="ttl" data-in="24.05" data-d="0.25">Hoy Paco tiene <em>más estrellas…</em></div>
  <div class="bigst">${[0, 1, 2, 3, 4].map(i => `<div data-in="${24.4 + i * 0.16}" data-fx="pop" data-d="0.3">${star('', 150)}</div>`).join('')}</div>
  <div class="w" style="left:60px;top:800px">${paco('f_pa', { w: 430, mouth: 'big', armL: 150, armR: 38, phone: true })}</div>
  <div class="call" id="call0">📞 Llamada</div><div class="call" id="call1">📞 Llamada</div><div class="call" id="call2">📞 Llamada</div>
  <div class="stamp" style="left:470px;top:1250px;transform:rotate(-4deg);white-space:nowrap;font-size:62px" data-in="26.2" data-fx="pop" data-d="0.3">…y más llamadas</div>
</div>

<div class="sc acc" data-s="27.3" data-e="31">
  <div class="mid"><div class="h1" data-in="27.35" data-d="0.3" style="font-size:128px">Guárdalo y pide hoy tu <em style="font-size:142px">primera reseña.</em></div></div>
  <div class="handle" data-in="29.2">@by.xperiencestudio</div>
</div>`,
  tick: `(t,cl,eo,back)=>{
    const S=Math.sin, $=(q)=>document.querySelector(q);
    document.querySelectorAll('.sc').forEach(s=>{const a=+s.dataset.s,b=+s.dataset.e; if(t>=a&&t<b&&b<31){s.style.transform='scale('+(1+0.04*(t-a)/(b-a))+')';s.style.transformOrigin='50% 60%';}});
    const talk={a_lu:[[1.1,2.4]],d_lu:[[12.7,13.5]],d_pa:[[13.9,16.3]]};
    document.querySelectorAll('.ch').forEach((c,i)=>{
      const ph=i*1.7;
      c.querySelector('.bob').style.transform='translateY('+(S(t*3.2+ph)*6)+'px)';
      c.querySelector('.head').style.transform='rotate('+(S(t*2.1+ph)*2.5)+'deg)';
      c.querySelector('.eyes').style.transform='scaleY('+(((t+ph)%2.7)<0.12?0.12:1)+')';
      const tk=(talk[c.id]||[]).some(r=>t>=r[0]&&t<r[1]) && (Math.floor(t*9)%2===0);
      c.querySelector('.mouthT').style.display=tk?'':'none'; c.querySelector('.mouth').style.display=tk?'none':'';
    });
    const rot=(sel,a)=>{const e=$(sel); if(e) e.style.transform='rotate('+a+'deg)';};
    rot('#a_lu .armL',150+S(t*8)*12); rot('#d_lu .armL',150+S(t*8)*12);
    rot('#c_pa .armL',150+S(t*9)*12); rot('#c_pa .armR',-150+S(t*9+1)*12);
    rot('#d_pa .armR',-150+S(t*7)*8); rot('#f_pa .armL',150+S(t*9)*14);
    // primer título fuera y Paco se marcha andando
    const db=$('#d_b1'); if(db&&t>13.7) db.style.opacity=0;
    const t1=$('#t_a1'); if(t1&&t>2.85) t1.style.opacity=0;
    const ab=$('#a_b'); if(ab&&t>3.2) ab.style.opacity=cl(1-(t-3.2)/0.3);
    const pw=$('#a_pw'); if(pw){const k=cl((t-3.0)/2.4); pw.style.transform='translateX('+(eo(k)*120)+'px)'; const sw=(t>3.0&&t<5.4)?S(t*13)*24:0; rot('#a_pa .legL',sw); rot('#a_pa .legR',-sw); rot('#a_pa .armL',14-sw*0.7);
      if(t>5.4){const m=$('#a_pa .mouth'); m.innerHTML='<path d="M262 262 q13 -14 26 0 t26 0 t26 0" fill="none" stroke="#17130a" stroke-width="9" stroke-linecap="round"/>';}}
    [0,1,2,3,4].forEach(i=>{const s=$('#rs'+i); if(s){const k=cl((t-(18.9+i*0.2))/0.2); s.style.opacity=0.18+0.82*k; s.style.display='inline-block'; s.style.transform='scale('+(k<=0?0.8:0.8+0.2*back(k))+')';}});
    [0,1,2].forEach(i=>{const c=$('#call'+i); if(c){const k=((t*0.6+i*0.333)%1); c.style.transform='translate('+(S(k*6+i)*24)+'px,'+(-k*230)+'px) scale('+(0.7+0.3*cl(k*5))+')'; c.style.opacity=t>25.2?cl(k*6)*cl((1-k)*4):0;}});
  }`,
};
