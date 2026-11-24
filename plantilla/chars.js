// Muñecos planos de la marca. viewBox 600x900. Cada parte animable lleva clase para tick().
const INK = '#17130a', ACC = '#e2481b';
function char({ id, skin = '#f2c9a5', shirt = ACC, pants = INK, hair = '#3a2a1e', style = 'bob', cap = null, mouth = 'smile', brows = 'flat', armL = 12, armR = -12, phone = false, wrench = false, scissors = false, cape = null, w = 600 }) {
  const mouths = {
    smile: `<path d="M262 250 Q300 288 338 250" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>`,
    big: `<path d="M256 244 Q300 300 344 244 Z" fill="${INK}"/><path d="M276 266 Q300 284 324 266 Z" fill="#fff"/>`,
    flat: `<path d="M270 262 H330" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>`,
    sad: `<path d="M264 272 Q300 240 336 272" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>`,
    o: `<ellipse cx="300" cy="264" rx="17" ry="21" fill="${INK}"/>`,
    wavy: `<path d="M262 262 q13 -14 26 0 t26 0 t26 0" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>`,
  };
  const browsS = {
    flat: `<path d="M240 158 h44 M316 158 h44" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>`,
    worry: `<path d="M240 164 l44 -14 M316 150 l44 14" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>`,
    angry: `<path d="M240 148 l44 16 M316 164 l44 -16" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>`,
    up: `<path d="M240 150 q22 -14 44 0 M316 150 q22 -14 44 0" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>`,
  };
  const hairBack = style === 'bob' ? `<path d="M168 210 a132 132 0 0 1 264 0 v95 a26 26 0 0 1 -26 26 h-212 a26 26 0 0 1 -26 -26 z" fill="${hair}"/>` : '';
  const hairFront = style === 'bob'
    ? `<path d="M186 190 a114 114 0 0 1 228 0 q-70 -8 -110 -52 q-40 44 -118 52 z" fill="${hair}"/>`
    : style === 'short' ? `<path d="M186 176 a114 114 0 0 1 228 0 q-114 -46 -228 0 z" fill="${hair}"/>`
    : style === 'bun' ? `<circle cx="300" cy="72" r="50" fill="${hair}"/><path d="M184 190 a116 116 0 0 1 232 0 q-40 -60 -116 -62 q-76 2 -116 62 z" fill="${hair}"/>`
    : style === 'curly' ? `<path d="M176 196 a44 44 0 0 1 30 -74 a50 50 0 0 1 88 -30 a50 50 0 0 1 96 22 a44 44 0 0 1 34 82 q-60 -50 -124 -46 q-70 0 -124 46 z" fill="${hair}"/>` : '';
  const capS = cap ? `<path d="M182 172 a118 118 0 0 1 236 0 z" fill="${cap}"/><path d="M300 160 h150 a14 14 0 0 1 0 28 h-150 z" fill="${cap}"/><circle cx="300" cy="66" r="12" fill="${cap}"/>` : '';
  const arm = (cls, x, ang, extra = '') => `<g class="${cls}" style="transform-origin:${x}px 372px;transform:rotate(${ang}deg)" data-a="${ang}">
    <path d="M${x} 372 V590" stroke="${shirt}" stroke-width="62" stroke-linecap="round" fill="none"/>
    <circle cx="${x}" cy="604" r="33" fill="${skin}"/>${extra}</g>`;
  const phoneS = phone ? `<rect x="364" y="526" width="80" height="132" rx="16" fill="#fbfaf8"/><rect x="372" y="538" width="64" height="100" rx="6" fill="#5aa7d6"/>` : '';
  const wrenchS = wrench ? `<rect x="392" y="590" width="24" height="130" rx="10" fill="#8a8378"/><path d="M370 716 a34 34 0 1 0 68 0 h-18 a16 16 0 1 1 -32 0 z" fill="#8a8378"/>` : '';
  const scissorsS = scissors ? `<g class="sci" style="transform-origin:404px 640px"><circle cx="388" cy="640" r="15" fill="none" stroke="${INK}" stroke-width="8"/><circle cx="420" cy="640" r="15" fill="none" stroke="${INK}" stroke-width="8"/><path d="M396 654 L414 740 M412 654 L394 740" stroke="#8a8378" stroke-width="10" stroke-linecap="round"/></g>` : '';
  const capeS = cape ? `<path d="M130 700 Q140 345 300 335 Q460 345 470 700 Z" fill="${cape}"/><path d="M250 340 q50 30 100 0" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="8"/>` : '';
  return `<svg class="ch" id="${id}" width="${w}" height="${w * 1.5}" viewBox="0 0 600 900" style="overflow:visible">
  <ellipse cx="300" cy="868" rx="190" ry="22" fill="rgba(0,0,0,.13)"/>
  <g class="bob">
    <g class="legL" style="transform-origin:252px 610px"><path d="M252 600 V820" stroke="${pants}" stroke-width="70" stroke-linecap="round"/><path d="M214 842 h76 a16 16 0 0 1 0 32 h-92 a16 16 0 0 1 16 -32 z" fill="${INK}"/></g>
    <g class="legR" style="transform-origin:348px 610px"><path d="M348 600 V820" stroke="${pants}" stroke-width="70" stroke-linecap="round"/><path d="M386 842 h-76 a16 16 0 0 0 0 32 h92 a16 16 0 0 0 -16 -32 z" fill="${INK}"/></g>
    ${arm('armL', 196, armL)}
    <rect x="184" y="330" width="232" height="330" rx="66" fill="${shirt}"/>
    ${capeS}
    <rect x="270" y="286" width="60" height="70" rx="26" fill="${skin}"/>
    <g class="head" style="transform-origin:300px 300px">
      ${hairBack}
      <circle cx="300" cy="200" r="114" fill="${skin}"/>
      ${hairFront}${capS}
      <g class="eyes" style="transform-origin:300px 204px"><circle cx="262" cy="204" r="13" fill="${INK}"/><circle cx="338" cy="204" r="13" fill="${INK}"/></g>
      <g class="brows">${browsS[brows]}</g>
      <g class="mouth">${mouths[mouth]}</g><g class="mouthT" style="display:none"><ellipse cx="300" cy="266" rx="22" ry="17" fill="${INK}"/></g>
      <circle cx="222" cy="240" r="17" fill="${ACC}" opacity=".22"/><circle cx="378" cy="240" r="17" fill="${ACC}" opacity=".22"/>
    </g>
    ${arm('armR', 404, armR, wrenchS + phoneS + scissorsS)}
  </g></svg>`;
}
module.exports = { char };
