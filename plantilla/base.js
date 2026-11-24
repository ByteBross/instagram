const fs = require('fs'), path = require('path');
const b64 = f => fs.readFileSync(path.join(__dirname, 'node_modules', f)).toString('base64');
const FONTS = `
@font-face{font-family:'Inter Tight';font-weight:100 900;font-style:normal;src:url(data:font/woff2;base64,${b64('@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2')}) format('woff2')}
@font-face{font-family:'Instrument Serif';font-weight:400;font-style:italic;src:url(data:font/woff2;base64,${b64('@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2')}) format('woff2')}
`;
const ACC = '#e2481b';
const T = {
  claro: { bg: '#fbfaf8', fg: '#17130a', sub: '#4d4740', mut: '#8a8378', line: '#e7e2d9', card: '#f1ede6' },
  oscuro: { bg: '#14120f', fg: '#fbfaf8', sub: '#c9c3b8', mut: '#8f887c', line: '#2e2a24', card: '#1f1c18' },
};
function css(tema, H = 1350) {
  const c = T[tema];
  return `${FONTS}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:${H}px}
body{background:${c.bg};color:${c.fg};font-family:'Inter Tight',sans-serif;position:relative;overflow:hidden;-webkit-font-smoothing:antialiased}
em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:${ACC};letter-spacing:-.01em}
.logo{position:absolute;left:96px;top:96px;font-size:40px;font-weight:500;letter-spacing:-.02em}
.logo em{letter-spacing:0}
.num{position:absolute;right:96px;top:102px;font-size:32px;color:${c.sub}}
.kick{font-size:30px;font-weight:600;letter-spacing:.08em;color:${ACC};text-transform:uppercase}
.fl,.fr{position:absolute;bottom:92px;font-size:34px;color:${c.sub}}
.fl{left:96px}.fr{right:96px}
.mut{color:${c.mut}}
:root{--bg:${c.bg};--fg:${c.fg};--sub:${c.sub};--mut:${c.mut};--line:${c.line};--card:${c.card};--acc:${ACC}}
`;
}
const page = (tema, extraCss, body, H) => `<!doctype html><html><head><meta charset="utf-8"><style>${css(tema, H)}${extraCss || ''}</style></head><body>${body}</body></html>`;
const logo = '<div class="logo">Xperience <em>Studio</em></div>';
module.exports = { FONTS, ACC, T, css, page, logo };
