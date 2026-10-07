"""Update only the owned portfolio references through the existing desktop bridge."""
import base64
import json
import re
from pathlib import Path
import urllib.request

root = Path(__file__).resolve().parents[1]
code = (root / 'design/figma-revision-job.js').read_text()
images = ','.join(f'{key}:figma.createImage(figma.base64Decode("{base64.b64encode((root / file).read_bytes()).decode()}"))' for key, file in [
    ('avatarDay', 'design/avatar-day-studio.png'), ('avatarNight', 'design/avatar-night-studio.png'), ('game', 'public/media/roblox-game.png')])
code = re.sub(r'const images=\{.*?\};const c=', 'const images={' + images + '};const c=', code, count=1, flags=re.S)
code = code.replace('color="#20201e"', 'color=ink').replace('"#20201e"', 'ink').replace('"#f5f5f2"', 'bg').replace('"#595953"', 'muted')
code = code.replace('function frame(', 'let ink,bg,muted;function frame(', 1)
tools = [(name, (root / f'public/icons/tools/{slug}.svg').read_text()) for name, slug in [
    ('Roblox Studio','robloxstudio'), ('Lua','lua'), ('Python','python'), ('TensorFlow','tensorflow'), ('OpenCV','opencv'), ('FastAPI','fastapi'),
    ('Streamlit','streamlit'), ('SQLite','sqlite'), ('JavaScript','javascript'), ('Git','git'), ('GitHub','github'), ('Rider','rider')]]
helpers = '''
function control(parent,label,w){const b=frame(parent,w,0);b.name="Control / "+label;b.paddingTop=b.paddingBottom=10;b.paddingLeft=b.paddingRight=10;b.strokes=[c(muted)];b.cornerRadius=22;text(b,label,13,w-20,ink);return b;}
function toolWall(parent,w,mobile){const wall=frame(parent,w,0);wall.name="Tools / brand visuals";const cols=mobile?3:6;for(let i=0;i<tools.length;i+=cols){const row=frame(wall,w,12,true);row.counterAxisSizingMode="AUTO";for(const [name,svg] of tools.slice(i,i+cols)){const cell=frame(row,(w-(cols-1)*12)/cols,14);cell.name="Tool / "+name;cell.counterAxisAlignItems="CENTER";cell.paddingTop=cell.paddingBottom=24;const mark=figma.createNodeFromSvg(svg);made.push(mark.id);cell.appendChild(mark);mark.resize(36,36);for(const part of mark.findAll(n=>n.type==="VECTOR"))part.fills=[c(ink)];text(cell,name,13,(w-(cols-1)*12)/cols,ink);}}}
const tools=TOOLS;
const ownedDesktop=await figma.getNodeByIdAsync("82:283"),ownedMobile=await figma.getNodeByIdAsync("82:304");
if(!ownedDesktop||ownedDesktop.type!=="FRAME"||!ownedDesktop.name.startsWith("Portfolio /")||!ownedMobile||ownedMobile.type!=="FRAME"||!ownedMobile.name.startsWith("Portfolio /"))throw Error("Owned references not verified");
let nightFrame=figma.currentPage.children.find(n=>n.type==="FRAME"&&n.name==="Portfolio / Desktop / Night");
if(!nightFrame){nightFrame=figma.createFrame();nightFrame.name="Portfolio / Desktop / Night";nightFrame.x=Math.max(ownedDesktop.x+ownedDesktop.width,ownedMobile.x+ownedMobile.width)+120;nightFrame.y=ownedDesktop.y;made.push(nightFrame.id);}
'''.replace('TOOLS', json.dumps(tools))
old_loop = 'for(const [id,mobile] of [["82:283",false],["82:304",true]])'
code = code.replace(old_loop, helpers + 'for(const [id,mobile,isNight] of [["82:283",false,false],["82:304",true,false],[nightFrame.id,false,true]])')
code = code.replace('const width=mobile?390:1440;', 'ink=isNight?"#f0eee7":"#20201e";bg=isNight?"#111414":"#f5f5f2";muted=isNight?"#c0bcb3":"#595953";const width=mobile?390:1440;')
code = code.replace('f.name="Portfolio / "+(mobile?"Mobile":"Desktop")+" / Roblox revision"', 'f.name="Portfolio / "+(mobile?"Mobile":"Desktop")+" / "+(isNight?"Night":"Day")')
old_header = 'text(f,mobile?"AM   Asad Mehmood                        Menu":"AM   Asad Mehmood                      Work     Certificates     Skills     About                       GitHub",mobile?14:16,w,ink,true);'
new_header = 'const header=frame(f,w,20,true);header.counterAxisSizingMode="AUTO";text(header,"AM   Asad Mehmood",mobile?14:16,mobile?150:440,ink,true);if(!mobile)text(header,"Work   Certificates   Skills   About",14,420,muted);control(header,isNight?"Day":"Night",74);if(mobile)control(header,"Menu",60);else text(header,"GitHub",14,90,ink,true);'
code = code.replace(old_header, new_header)
code = code.replace('"Asad\\nMehmood."', '"Asad\\nMehmood"').replace('"Roblox developer & AI student.\\nI build game systems, interactive worlds and practical software."', '"Roblox developer & AI student\\nI build game systems, interactive worlds and practical software"')
code = code.replace('picture(art,"avatar",mobile?w:590,mobile?390:490);', 'picture(art,isNight?"avatarNight":"avatarDay",mobile?w:590,mobile?440:520);const toolbar=frame(art,mobile?w:590,8,true);control(toolbar,"Lights",82);control(toolbar,"Animation",96);control(toolbar,"Reset view",102);')
code = re.sub(r'text\(art,"Drag to rotate[^;]+;', '', code)
code = re.sub(r'text\(art,"Original avatar[^;]+;', '', code)
code = code.replace('"Built to be\\nplayed. And used."', '"Built to be\\nplayed and used"').replace('"Certificates."', '"Certificates"').replace('"Tools I work with."', '"Tools I work with"').replace('"A developer,\\nstill learning."', '"A developer,\\nstill learning"')
code = code.replace('text(f,"Python / FastAPI / Keras / OpenCV / Streamlit\\nLua / Roblox Studio / Git / GitHub",16,w,muted);', 'toolWall(f,w,mobile);text(f,"AI & machine learning / Applications & backend / Game development / Workflow",mobile?13:16,w,muted);')
code = code.replace('portfolio-roblox-revision', 'portfolio-atmosphere-revision')
assert 'picture(art,"avatar",' not in code and 'Meshy + Blender' not in code
(root / 'design/figma-atmosphere-job.js').write_text(code)
request = urllib.request.Request('http://localhost:5000/command', data=json.dumps({'action':'eval','code':code}).encode(), headers={'Content-Type':'application/json'})
with urllib.request.urlopen(request, timeout=20) as response:
    print(response.read().decode())
