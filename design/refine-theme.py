from pathlib import Path

root = Path(__file__).resolve().parents[1]
path = root / 'app/globals.css'
css = path.read_text(encoding='utf-8-sig')
css = css.replace('--blue:#b83e1d;', '--accent:#b83e1d;--blue:var(--accent);')
css = css.replace('--cyan:#b83e1d;--purple:#b83e1d;--green:#b83e1d;', '--cyan:var(--accent);--purple:var(--accent);--green:var(--accent);')
css = css.replace('color:#b83e1d', 'color:var(--accent)').replace('background:#b83e1d', 'background:var(--accent)').replace('border-color:#b83e1d', 'border-color:var(--accent)').replace('solid #b83e1d', 'solid var(--accent)')
css = css.replace('scrollbar-color:#93938a #f5f5f2', 'scrollbar-color:var(--line) var(--bg)')
css = css.replace('::selection{background:var(--accent);color:#fff}', '::selection{background:var(--accent);color:var(--bg)}')
css = css.replace('border-color:var(--accent);color:#fff', 'border-color:var(--accent);color:var(--bg)')
css = css.replace('background:#f5f5f2;color:#20201e', 'background:var(--bg);color:var(--text)')
css = css.replace('height:490px;width:100%;background:var(--bg-soft);cursor:grab;touch-action:pan-y;border-radius:50% 50% 8px 8px;overflow:hidden', 'height:520px;width:100%;background:transparent;cursor:grab;touch-action:pan-y;border-radius:18px;overflow:hidden')
css = css.replace('.avatar-stage-bottom{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:16px}', '.avatar-stage-bottom{display:flex;justify-content:center;align-items:center;margin-top:0}')
css = css.replace('.site-nav{display:grid;grid-template-columns:1fr auto 1fr;', '.site-nav{display:grid;grid-template-columns:1fr auto 1fr;')
css = css.replace('.site-nav{grid-template-columns:1fr auto;min-height:80px}', '.site-nav{grid-template-columns:1fr auto auto;gap:12px;min-height:80px}')
css = css.replace('.nav-links,.site-nav>.nav-cta{display:none}', '.nav-links,.nav-actions>.nav-cta{display:none}')
css = css.replace('height:410px;border-radius:45% 45% 6px 6px', 'height:440px;border-radius:18px')
extra = '''
/* Visitor-controlled atmosphere. These values also theme native browser surfaces. */
:root{color-scheme:light;--avatar-warm:#ecb58a48;--avatar-cool:#bdc6d030}
:root[data-theme="night"]{color-scheme:dark;--bg:#111414;--bg-soft:#1a2020;--surface:#212728;--surface-2:#29312e;--text:#f0eee7;--muted:#c0bcb3;--muted-2:#aeaba2;--line:#626b66;--line-soft:#36423d;--accent:#ff966b;--avatar-warm:#d4673538;--avatar-cool:#4a78a541}
body,.site-nav-wrap{transition:background-color 260ms var(--ease-out),color 260ms var(--ease-out)}
.nav-actions{display:flex;align-items:center;justify-content:flex-end;gap:22px}
.theme-toggle{display:inline-flex;gap:8px;align-items:center;justify-content:center;min-height:44px;min-width:44px;padding:8px 12px;border:1px solid var(--line-soft);border-radius:999px;background:transparent;color:var(--text);font-size:.78rem;transition:background-color 180ms var(--ease-out)}
.theme-toggle svg{width:18px;height:18px}.theme-toggle:hover{background:var(--bg-soft)}
.policy-header-actions{display:flex;gap:24px;align-items:center}.policy-header-actions>a{display:flex;align-items:center;min-height:44px}
.avatar-canvas{background-image:radial-gradient(ellipse 48% 43% at 40% 49%,var(--avatar-warm),transparent 78%),radial-gradient(ellipse 45% 40% at 64% 45%,var(--avatar-cool),transparent 85%);transition:background-color 260ms var(--ease-out)}
.avatar-stage[data-lit="false"] .avatar-canvas{background-image:none}
.avatar-controls{display:flex;align-items:center;gap:4px;background:var(--bg-soft);padding:4px;border-radius:999px}
.avatar-controls button{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:transparent;border:0;border-radius:999px;min-width:44px;min-height:44px;padding:10px;color:var(--muted);transition:background-color 180ms var(--ease-out),color 180ms var(--ease-out)}
.avatar-controls button svg{width:19px;height:19px;flex:none}.avatar-controls .studio-control{padding-inline:14px;font-size:.78rem}
.avatar-controls .studio-control[aria-pressed="true"]{background:var(--text);color:var(--bg)}
.avatar-controls button:hover:not(:disabled){background:var(--surface-2);color:var(--text)}
.avatar-controls .studio-control[aria-pressed="true"]:hover{background:var(--accent);color:var(--bg)}
.avatar-controls button:disabled{opacity:.55;cursor:default}
.tool-wall{display:grid;grid-template-columns:repeat(6,1fr);list-style:none;margin:38px 0 48px;padding:0;border-bottom:1px solid var(--line-soft)}
.tool-wall li{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:28px 8px;border-top:1px solid var(--line-soft);font-size:.82rem;font-weight:500}
.tool-mark{display:block;width:38px;height:38px;background:var(--text);mask-size:contain;mask-position:center;mask-repeat:no-repeat;-webkit-mask-size:contain;-webkit-mask-position:center;-webkit-mask-repeat:no-repeat;transition:background-color 180ms var(--ease-out),transform 180ms var(--ease-out)}
.tool-wall li:first-child .tool-mark,.tool-wall li:nth-child(3) .tool-mark{background:var(--accent)}
@media(hover:hover) and (pointer:fine){.tool-wall li:hover .tool-mark{background:var(--accent);transform:translateY(-3px)}}
@media(max-width:1000px){.nav-actions{gap:12px}.tool-wall{grid-template-columns:repeat(4,1fr)}}
@media(max-width:820px){.nav-actions{justify-content:initial}.theme-toggle{font-size:.75rem;padding-inline:10px}.menu-button{min-width:44px;min-height:44px}}
@media(max-width:640px){.site-nav{gap:8px}.brand{gap:10px}.brand-name{font-size:.84rem}.avatar-canvas{height:440px}.tool-wall{grid-template-columns:repeat(3,1fr);margin:28px 0 36px}.tool-wall li{font-size:.74rem;padding:23px 4px;gap:13px}.tool-mark{width:33px;height:33px}.policy-header-actions{gap:14px}.policy-header-actions>a{font-size:.72rem}}
@media(max-width:360px){.theme-toggle>span{display:none}.brand-name{font-size:.81rem}}
@media(forced-colors:active){.theme-toggle,.avatar-controls button{border:1px solid ButtonText}.tool-mark{background:CanvasText}}
'''
path.write_text(css + extra, encoding='utf-8')
print('Added day/night surfaces, avatar atmosphere and visual tool wall.')
