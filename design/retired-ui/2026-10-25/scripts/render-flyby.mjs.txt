// Render licensed 3D source assets into lightweight transparent web sprites.
import { build } from "esbuild";
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { chromium } from "@playwright/test";
const root = path.resolve(".local-tools/flyby-assets/pack/Models/GLB format");
const source = `import * as THREE from 'three';import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
const scene=new THREE.Scene();const camera=new THREE.OrthographicCamera(-1.9,1.9,1.5,-1.5,.1,30);camera.position.set(3,2.4,6);camera.lookAt(0,1,0);
const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true});renderer.setSize(640,512);renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;document.body.appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xe7f2ff,0x47404b,2.7));const key=new THREE.DirectionalLight(0xffe8d2,3);key.position.set(-3,5,5);scene.add(key);const rim=new THREE.DirectionalLight(0x8bbcff,3);rim.position.set(3,2,-3);scene.add(rim);
let previous;window.renderHero=async(letter,color)=>{if(previous){scene.remove(previous);previous.traverse(o=>{if(o.isMesh){o.geometry.dispose();}})}const gltf=await new GLTFLoader().loadAsync('/models/character-'+letter+'.glb');const model=gltf.scene;const bounds=new THREE.Box3().setFromObject(model);model.scale.multiplyScalar(2/(bounds.max.y-bounds.min.y));const adjusted=new THREE.Box3().setFromObject(model);model.position.y-=adjusted.min.y;model.position.x-=(adjusted.min.x+adjusted.max.x)/2;model.position.z-=(adjusted.min.z+adjusted.max.z)/2;
for(const name of ['arm-left','arm-right']){const arm=model.getObjectByName(name);if(arm)arm.rotation.x=-1.1;}const leg=model.getObjectByName('leg-right');if(leg)leg.rotation.x=.35;
const hero=new THREE.Group();hero.add(model);const capeGeometry=new THREE.BufferGeometry();capeGeometry.setAttribute('position',new THREE.Float32BufferAttribute([-.31,1.55,-.13,.31,1.55,-.13,-.6,.35,-.65,.31,1.55,-.13,.6,.35,-.65,-.6,.35,-.65],3));capeGeometry.computeVertexNormals();const cape=new THREE.Mesh(capeGeometry,new THREE.MeshStandardMaterial({color,side:THREE.DoubleSide,roughness:.65,metalness:.05}));hero.add(cape);hero.rotation.z=-.55;hero.rotation.y=-.25;hero.position.x=-.45;scene.add(hero);previous=hero;renderer.render(scene,camera);return renderer.domElement.toDataURL('image/png');};window.ready=true;`;
const bundled = await build({
  stdin: { contents: source, resolveDir: process.cwd() },
  bundle: true,
  write: false,
  format: "iife",
  platform: "browser",
  define: { "process.env.NODE_ENV": '"production"' },
  banner: { js: 'var process={env:{NODE_ENV:"production"}};' },
  logLevel: "silent",
});
const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/") {
      res.setHeader("Content-Type", "text/html");
      res.end(
        '<body><style>body{margin:0;background:transparent}</style><script src="/render.js"></script>',
      );
      return;
    }
    if (req.url === "/render.js") {
      res.setHeader("Content-Type", "text/javascript");
      res.end(bundled.outputFiles[0].contents);
      return;
    }
    const file = path.resolve(
      root,
      "." + decodeURIComponent(req.url.replace("/models", "")),
    );
    if (!file.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    res.setHeader(
      "Content-Type",
      file.endsWith(".glb") ? "model/gltf-binary" : "image/png",
    );
    res.end(await fs.readFile(file));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const browser = await chromium.launch();
try {
  await fs.mkdir("public/media/flybys", { recursive: true });
  const page = await browser.newPage();
  page.on("pageerror", (error) => console.error(String(error)));
  await page.goto("http://127.0.0.1:" + server.address().port);
  await page.waitForFunction(() => window.ready);
  const variants = [
    ["a", 0x26364c],
    ["j", 0xffad62],
    ["n", 0x9159d4],
    ["o", 0x419f96],
    ["p", 0xc44b54],
    ["q", 0x4c7bce],
    ["r", 0x63a86a],
  ];
  for (let i = 0; i < variants.length; i++) {
    const [letter, color] = variants[i];
    const data = await page.evaluate(
      ([letter, color]) => window.renderHero(letter, color),
      [letter, color],
    );
    await sharp(Buffer.from(data.split(",")[1], "base64"))
      .trim()
      .resize({ width: 280, height: 240, fit: "inside" })
      .webp({ quality: 88 })
      .toFile("public/media/flybys/hero-" + (i + 1) + ".webp");
  }
  console.log("Rendered seven licensed game-character sprites");
} finally {
  await browser.close();
  server.closeAllConnections();
  await new Promise((resolve) => server.close(resolve));
}
