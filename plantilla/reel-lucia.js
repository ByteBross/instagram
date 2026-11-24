const { char } = require('./chars');
const lucia = (id, o = {}) => char({ id, skin: '#f0c4a0', shirt: '#e2481b', hair: '#3a2a1e', style: 'bob', ...o });
const f1 = (id, o = {}) => char({ id, skin: '#e9b98f', shirt: '#6f7d8c', style: 'none', cap: '#4d5863', ...o });
const f2 = (id, o = {}) => char({ id, skin: '#c98f66', shirt: '#b89b6a', style: 'none', cap: '#8c7446', ...o });
const f3 = (id, o = {}) => char({ id, skin: '#f2d0b0', shirt: '#17130a', pants: '#4d4740', style: 'none', cap: '#e2481b', ...o });
const drops = [296, 296, 536, 536, 776, 776].map((x, i) => `<div class="drop" data-x="${x - 13}" data-p="${(i * 0.37) % 1}"></div>`).join('');
const floor = '<div class="floor"></div><div class="skirt"></div>';
const pipe = `<div class="pipe"></div>${[296, 536, 776].map(x => `<div class="joint" style="left:${x - 34}px"></div>`).join('')}`;
const bucket = `<svg style="position:absolute;left:446px;top:1300px" width="180" height="170" viewBox="0 0 180 170"><path d="M20 40 a70 60 0 0 1 140 0" fill="none" stroke="#8a8378" stroke-width="8"/><path d="M14 40 h152 l-18 120 a10 10 0 0 1 -10 8 h-96 a10 10 0 0 1 -10 -8 z" fill="#c9c3b8"/><rect x="8" y="30" width="164" height="22" rx="10" fill="#8a8378"/></svg>`;
const win = (l, t) => `<div class="win" style="left:${l}px;top:${t}px"><i></i><b></b></div>`;
const frame = (l, t, w, h, col) => `<div class="frame" style="left:${l}px;top:${t}px;width:${w}px;height:${h}px"><i style="background:${col}"></i></div>`;
const tick = `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.500 12.500l5 5L19.500 7"/></svg>`;

module.exports = {
  name: 'piloto-reel-historia', out: 'piloto-munecos', duration: 27.2, coverAt: 2.4, audio: 'audio/lucia-a.mp3',
  stills: [0.8, 2.4, 3.6, 5.2, 6.6, 8.2, 10.5, 12.5, 15, 17.2, 18.9, 20.3, 24, 26.5],
  css: `
  .logo,#bar{display:none}
  .sc.light{background:#f6f1ea}
  .floor{position:absolute;left:0;right:0;top:1400px;bottom:0;background:#e4dccf}
  .skirt{position:absolute;left:0;right:0;top:1384px;height:16px;background:#d3c9b8}
  .ttl{position:absolute;left:84px;right:110px;top:270px;font-size:108px;line-height:.98;font-weight:600;letter-spacing:-.045em;z-index:6}
  .ttl em{font-size:120px}
  .ch{position:absolute}
  .w{position:absolute}
  .pipe{position:absolute;left:-20px;right:-20px;top:640px;height:44px;background:#8a8378;box-shadow:inset 0 -12px 0 rgba(0,0,0,.15)}
  .joint{position:absolute;top:628px;width:68px;height:68px;border-radius:14px;background:#6b655c}
  .drop{position:absolute;left:0;top:0;width:26px;height:38px;background:#5aa7d6;border-radius:50% 50% 50% 50%/62% 62% 38% 38%}
  .puddle{position:absolute;left:90px;top:1440px;width:900px;height:60px;border-radius:50%;background:#5aa7d6;opacity:.6}
  .ya{position:absolute;right:70px;top:760px;background:#e2481b;color:#fff;font-size:150px;font-weight:700;letter-spacing:-.04em;padding:6px 44px 14px;border-radius:36px;transform-origin:center;z-index:7}
  .win{position:absolute;width:250px;height:300px;border:14px solid #fff;border-radius:18px;background:#cfe3ee;box-shadow:0 4px 0 #d3c9b8}
  .win i{position:absolute;left:50%;top:0;bottom:0;width:12px;margin-left:-6px;background:#fff}.win b{position:absolute;top:50%;left:0;right:0;height:12px;margin-top:-6px;background:#fff}
  .frame{position:absolute;background:#fff;border-radius:10px;padding:16px;box-shadow:0 4px 0 #d3c9b8}.frame i{display:block;width:100%;height:100%;border-radius:4px}
  .bub{position:absolute;background:#17130a;color:#fbfaf8;border-radius:44px 44px 44px 10px;padding:38px 44px;font-size:58px;line-height:1.18;letter-spacing:-.02em;font-weight:500;transform-origin:left bottom;z-index:6}
  .bub.r{border-radius:44px 44px 44px 10px;transform-origin:left bottom}
  .stamp{position:absolute;border:8px solid #e2481b;color:#e2481b;font-size:72px;font-weight:700;letter-spacing:-.02em;padding:10px 34px;border-radius:26px;transform-origin:center;background:#fbfaf8;z-index:6}
  .zz{position:absolute;font-family:'Instrument Serif';font-style:italic;color:#8a8378;font-size:120px}
  .cal{position:absolute;right:110px;top:640px;width:330px;background:#fff;border-radius:26px;overflow:hidden;box-shadow:0 5px 0 #d3c9b8;text-align:center;transform-origin:top center}
  .cal u{display:block;text-decoration:none;background:#e2481b;color:#fff;font-size:40px;font-weight:600;letter-spacing:.08em;padding:14px 0}
  .cal b{display:block;font-size:150px;font-weight:700;letter-spacing:-.04em;line-height:1.25;color:#17130a}
  .mob{position:absolute;left:640px;top:1260px;width:110px;height:180px;border-radius:22px;background:#17130a;transform-origin:center bottom}
  .mob i{position:absolute;inset:12px;border-radius:10px;background:#fbfaf8}.mob b{position:absolute;right:-18px;top:-18px;width:56px;height:56px;border-radius:50%;background:#e2481b;color:#fff;font-size:34px;font-weight:700;display:flex;align-items:center;justify-content:center}
  .q{position:absolute;font-family:'Instrument Serif';font-style:italic;color:#e2481b;font-size:190px;line-height:1}
  .phone{position:absolute;left:110px;top:560px;width:860px;height:900px;background:#17130a;border-radius:90px;padding:28px}
  .phone .scr{position:relative;width:100%;height:100%;background:#f1ede6;border-radius:66px;overflow:hidden}
  .phone .bar2{height:130px;background:#fbfaf8;display:flex;align-items:center;padding:0 48px;font-size:50px;font-weight:600;letter-spacing:-.02em;border-bottom:3px solid #e7e2d9}
  .row{position:absolute;left:28px;right:28px;height:190px;background:#fff;border-radius:34px;display:flex;align-items:center;gap:26px;padding:0 30px;font-size:48px;font-weight:600;letter-spacing:-.02em}
  .row i{width:104px;height:104px;border-radius:50%;flex:none}
  .row span{display:block;font-size:31px;font-weight:400;color:#8a8378;margin-top:4px;letter-spacing:-.01em}
  .row b{margin-left:auto;color:#5aa7d6;font-size:42px}
  .ring{position:absolute;border:12px solid #e2481b;border-radius:50px;transform-origin:center}
  .ok{position:absolute;display:flex;align-items:center;gap:28px;font-size:84px;font-weight:600;letter-spacing:-.04em;left:84px;z-index:6}
  .ok i{width:92px;height:92px;border-radius:26px;background:#e2481b;display:flex;align-items:center;justify-content:center;flex:none}
  .spark{position:absolute;color:#e2481b;font-size:90px;line-height:1}
  .patch{position:absolute;top:630px;width:120px;height:64px;border-radius:12px;background:#e2481b}
  .handle{position:absolute;left:84px;bottom:440px;font-size:46px;font-weight:500}
  `,
  body: `
<div class="sc light" data-s="0" data-e="2.65">${frame(800, 1010, 190, 230, '#e9b9a3')}${floor}${pipe}
  <div class="ttl" data-in="0" data-d="0.3">Lucía necesita un <em>fontanero.</em></div>
  <div class="puddle" id="puddle"></div>${bucket}${drops}
  <div class="w" style="left:110px;top:760px">${lucia('l0', { mouth: 'o', brows: 'worry', armL: 150, armR: -150, w: 440 })}</div>
  <div class="ya" data-in="2.0" data-fx="pop" data-d="0.3">¡YA!</div>
</div>

<div class="sc light" data-s="2.65" data-e="4.05">
  <div class="ttl" data-in="2.7" data-d="0.3">Escribe a <em>tres.</em></div>
  <div class="phone" data-in="2.7" data-d="0.35"><div class="scr"><div class="bar2">Mensajes</div>
  ${[['#6f7d8c', 'Fontanero 1'], ['#b89b6a', 'Fontanero 2'], ['#17130a', 'Fontanero 3']].map((r, i) => `<div class="row" style="top:${170 + i * 215}px" data-in="${2.95 + i * 0.22}" data-fx="right" data-d="0.3"><i style="background:${r[0]}"></i><div>${r[1]}<span>Hola, tengo una fuga. ¿Cuánto sería?</span></div><b>✓✓</b></div>`).join('')}
  </div></div>
</div>

<div class="sc light" data-s="4.05" data-e="7.05">${frame(90, 700, 180, 220, '#b9c7b0')}${floor}
  <div class="ttl" data-in="4.1" data-d="0.3">El primero contesta…</div>
  <div class="cal" data-in="5.5" data-fx="out" data-d="0.15"><u>LUNES</u><b>23</b></div>
  <div class="cal" data-in="5.65" data-fx="pop" data-d="0.3"><u>MIÉRCOLES</u><b>25</b></div>
  <div class="w" style="left:40px;top:780px" data-in="4.1" data-fx="left" data-d="0.4">${f1('p1', { mouth: 'flat', brows: 'flat', armL: 8, armR: -8, w: 460 })}</div>
  <div class="zz" id="z1" style="left:430px;top:800px">z</div><div class="zz" id="z2" style="left:510px;top:710px;font-size:160px">z</div>
  <div class="mob" id="mob"><i></i><b>1</b></div>
  <div class="stamp" style="right:90px;top:1010px;transform:rotate(-4deg)" data-in="5.75" data-fx="pop" data-d="0.3">2 días después</div>
  <div class="bub" style="left:420px;top:1170px;width:560px" data-in="6.1" data-fx="pop" data-d="0.3">Perdona, lo acabo de ver…</div>
</div>

<div class="sc light" data-s="7.05" data-e="11.4">${win(760, 700)}${floor}
  <div class="ttl" data-in="7.1" data-d="0.3">El segundo le dice:</div>
  <div class="q" id="q_a" style="left:90px;top:640px">?</div><div class="q" id="q_b" style="left:400px;top:600px;font-size:130px">?</div>
  <div class="w" style="left:20px;top:800px" data-in="7.1" data-fx="left" data-d="0.4">${f2('p2', { mouth: 'wavy', brows: 'up', armL: 118, armR: -118, w: 440 })}</div>
  <div class="bub" style="left:440px;top:1010px;width:540px" data-in="8.6" data-fx="pop" data-d="0.3">Uf, depende…</div>
  <div class="bub" style="left:440px;top:1180px;width:540px" data-in="9.7" data-fx="pop" data-d="0.3">Llámame y lo vemos.</div>
  <div class="stamp" style="right:90px;top:1420px;transform:rotate(-5deg)" data-in="10.3" data-fx="pop" data-d="0.3">Sin precio</div>
</div>

<div class="sc light" data-s="11.4" data-e="17.5">${frame(820, 640, 170, 210, '#e9b9a3')}${floor}
  <div class="ttl" data-in="11.45" data-d="0.3">El tercero, en <em>10 minutos:</em></div>
  <div class="w" style="left:20px;top:800px" data-in="11.45" data-fx="left" data-d="0.4">${f3('p3', { mouth: 'smile', brows: 'up', armL: 10, armR: 38, phone: true, w: 440 })}</div>
  <div class="bub" style="left:430px;top:760px;width:560px" data-in="13.6" data-fx="pop" data-d="0.3">Hola, Lucía 👋<br>Son 60 €.</div>
  <div class="bub" style="left:430px;top:1030px;width:560px;background:#e2481b" data-in="15.9" data-fx="pop" data-d="0.3">¿Te va bien mañana a las 9?</div>
</div>

<div class="sc light" data-s="17.5" data-e="19.25">${floor}
  <div class="ttl" data-in="17.55" data-d="0.3">¿A quién crees que <em>llamó?</em></div>
  <div class="w" style="left:20px;top:880px" data-in="17.6" data-d="0.3">${f1('q1', { mouth: 'flat', w: 340 })}</div>
  <div class="w" style="left:370px;top:880px" data-in="17.75" data-d="0.3">${f2('q2', { mouth: 'wavy', brows: 'up', w: 340 })}</div>
  <div class="w" style="left:720px;top:880px" data-in="17.9" data-d="0.3">${f3('q3', { mouth: 'big', brows: 'up', armR: -150, w: 340 })}</div>
  <div class="ring" style="left:716px;top:860px;width:348px;height:550px" data-in="18.6" data-fx="pop" data-d="0.3"></div>
</div>

<div class="sc light" data-s="19.25" data-e="24.75">${floor}
  <div class="ttl" data-in="19.3" data-d="0.3" style="font-size:92px">No ganó el más barato.<br><em style="font-size:102px">Ganó el que contestó:</em></div>
  ${[['Rápido', 21.7], ['Claro', 22.5], ['Con el siguiente paso', 23.2]].map((r, i) => `<div class="ok" style="top:${600 + i * 128}px" data-in="${r[1]}" data-fx="left" data-d="0.3"><i>${tick}</i>${r[0]}</div>`).join('')}
  <div class="spark" id="s_a" style="left:480px;top:1020px">✦</div><div class="spark" id="s_b" style="left:900px;top:1090px;font-size:60px">✦</div><div class="spark" id="s_c" style="left:90px;top:1100px;font-size:60px">✦</div>
  <div class="w" style="left:110px;top:1000px" data-in="19.3" data-fx="left" data-d="0.4">${lucia('l6', { mouth: 'big', brows: 'up', armL: 150, armR: -20, w: 340 })}</div>
  <div class="w" style="left:590px;top:1000px" data-in="19.45" data-fx="right" data-d="0.4">${f3('p6', { mouth: 'big', brows: 'up', armL: 20, armR: -150, wrench: true, w: 340 })}</div>
</div>

<div class="sc acc" data-s="24.75" data-e="27.2">
  <div class="mid"><div class="h1" data-in="24.8" data-d="0.3" style="font-size:136px">Guárdalo para <em style="font-size:150px">tu negocio.</em></div>
  <div class="sub" data-in="25.6">¿Y tú, cuánto tardas en contestar?</div></div>
  <div class="handle" data-in="25.9">@by.xperiencestudio</div>
</div>`,
  tick: `(t,cl,eo,back)=>{
    const S=Math.sin, $=(q)=>document.querySelector(q);
    // cámara: zoom lento por escena
    document.querySelectorAll('.sc').forEach(s=>{const a=+s.dataset.s,b=+s.dataset.e; if(t>=a&&t<b&&!s.classList.contains('acc')){s.style.transform='scale('+(1+0.035*(t-a)/(b-a))+')';s.style.transformOrigin='50% 60%';}});
    const talk={p1:[[6.1,7.0]],p2:[[8.7,11.1]],p3:[[13.75,15.7],[15.96,17.2]]};
    document.querySelectorAll('.ch').forEach((c,i)=>{
      const ph=i*1.7;
      c.querySelector('.bob').style.transform='translateY('+(S(t*3.2+ph)*7)+'px)';
      c.querySelector('.head').style.transform='rotate('+(S(t*2.1+ph)*2.5)+'deg)';
      const sleeping=c.id==='p1'&&t<5.6;
      c.querySelector('.eyes').style.transform='scaleY('+((sleeping||((t+ph)%2.7)<0.12)?0.12:1)+')';
      const tk=(talk[c.id]||[]).some(r=>t>=r[0]&&t<r[1]) && (Math.floor(t*9)%2===0);
      c.querySelector('.mouthT').style.display=tk?'':'none'; c.querySelector('.mouth').style.display=tk?'none':'';
    });
    const arm=(id,cls,base,amp,sp)=>{const e=$('#'+id+' .'+cls); if(e) e.style.transform='rotate('+(base+S(t*sp)*amp)+'deg)';};
    arm('l0','armL',150,14,11); arm('l0','armR',-150,14,11.5);
    arm('p2','armL',112,10,5); arm('p2','armR',-112,10,5);
    arm('q3','armR',-150,16,9);
    arm('l6','armL',150,14,8); arm('p6','armR',-150,10,7);
    arm('p3','armR',38,3,6);
    const p1h=$('#p1 .head'); if(p1h&&t<5.6) p1h.style.transform='rotate('+(10+S(t*1.6)*4)+'deg)';
    document.querySelectorAll('.drop').forEach(d=>{const k=((t*1.25+ +d.dataset.p)%1); d.style.transform='translate('+d.dataset.x+'px,'+(690+k*k*740)+'px)'; d.style.opacity=k>0.96?0:1;});
    const pu=$('#puddle'); if(pu) pu.style.transform='scaleX('+(0.5+cl(t/2.6)*0.5)+')';
    ['z1','z2'].forEach((id,i)=>{const z=$('#'+id); if(!z)return; const k=((t*0.7+i*0.5)%1); z.style.transform='translate('+(k*40)+'px,'+(-k*90)+'px)'; z.style.opacity=t>5.6?0:(1-k);});
    const mob=$('#mob'); if(mob){mob.style.transform='rotate('+(S(t*45)*7)+'deg)';mob.style.opacity=t<5.6?1:0;}
    ['q_a','q_b'].forEach((id,i)=>{const q=$('#'+id); if(q){q.style.transform='translateY('+(S(t*2.4+i*2)*18)+'px) rotate('+(S(t*1.7+i)*10)+'deg)'; q.style.opacity=cl((t-7.5-i*0.3)/0.3);}});
    ['s_a','s_b','s_c'].forEach((id,i)=>{const s=$('#'+id); if(s){s.style.transform='scale('+(0.7+0.4*Math.abs(S(t*3+i*1.3)))+') rotate('+(t*40+i*30)+'deg)'; s.style.opacity=cl((t-19.8)/0.3);}});
  }`,
};
