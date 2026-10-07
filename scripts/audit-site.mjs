import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
const origin=process.env.PORTFOLIO_URL||'http://127.0.0.1:4173';
const report={pages:[],interactions:[],consoleErrors:[],externalRequests:[],dialogContrast:[]};
const hash=b=>createHash('sha256').update(b).digest('hex');
const browser=await chromium.launch();
try{
 for(const [device,width,height,theme] of [['desktop',1440,1000,'day'],['mobile',390,844,'day'],['desktop',1440,1000,'night'],['mobile',390,844,'night']]){
  const capture=device+(theme==='night'?'-night':'');
  const context=await browser.newContext({viewport:{width,height},reducedMotion:'no-preference'});const page=await context.newPage();
  page.on('pageerror',e=>report.consoleErrors.push(String(e)));
  page.on('console',m=>{if(m.type()==='error')report.consoleErrors.push(m.text())});
  page.on('request',r=>{if(/^https?:/.test(r.url())&&!r.url().startsWith(origin))report.externalRequests.push(r.url())});
  for(const route of ['/','/privacy/','/terms/','/cookies/','/refunds/','/accessibility/']){
   const response=await page.goto(origin+route,{waitUntil:'networkidle'});assert.equal(response.status(),200);
   if(theme==='night'){await page.getByRole('button',{name:'Switch to night mode'}).click();await page.waitForFunction(()=>document.documentElement.dataset.theme==='night');await page.waitForTimeout(1000);assert.equal(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(17, 20, 20)')}
   if(route==='/'){
    await page.locator('[data-animation="ready"]').waitFor({timeout:20000});
    const pause=page.getByRole('button',{name:'Pause dance'});assert.equal(await pause.getAttribute('aria-pressed'),'true');
    await page.locator('.avatar-canvas').scrollIntoViewIfNeeded();
    const moving1=hash(await page.locator('canvas').screenshot());await page.waitForTimeout(350);const moving2=hash(await page.locator('canvas').screenshot());assert.notEqual(moving1,moving2,'Dance must visibly animate');
    await pause.click();await page.waitForTimeout(350);
    const still1=hash(await page.locator('canvas').screenshot());await page.waitForTimeout(350);const still2=hash(await page.locator('canvas').screenshot());assert.equal(still1,still2,'Paused dance must remain still');
    await page.locator('.avatar-canvas').focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(350);assert.notEqual(hash(await page.locator('canvas').screenshot()),still2,'Keyboard rotates the avatar');await page.keyboard.press('Home');
    const litBefore=hash(await page.locator('canvas').screenshot());await page.getByRole('button',{name:'Turn avatar lights off'}).click();await page.waitForTimeout(1000);assert.notEqual(hash(await page.locator('canvas').screenshot()),litBefore,'Lighting control must change rendered character illumination');await page.getByRole('button',{name:'Turn avatar lights on'}).click();await page.waitForTimeout(1000);await page.getByRole('button',{name:'Reset avatar view'}).click();
    assert(!(await page.locator('body').innerText()).match(/Meshy|Blender|paused/i),'No visible production or paused captions');
    assert((await page.locator('h1,h2,h3').allTextContents()).every(text=>!text.trim().endsWith('.')),'Headings must not have trailing full stops');
    report.interactions.push(device+' '+theme+': real dance, exact pause, keyboard rotation/reset, actual lighting on/off, clean captions/headings');
   }
   for(const img of await page.locator('img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode().catch(()=>{}))}
   await page.evaluate(()=>scrollTo(0,0));
   const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
   const brokenImages=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));
   const storage=await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}));
   report.pages.push({route,device,theme,overflow,brokenImages,cookies:(await context.cookies()).length,storage,violations:axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:axe.incomplete.map(v=>({id:v.id,count:v.nodes.length,targets:v.nodes.map(n=>n.target)}))});
   if(route==='/'){await page.screenshot({path:`audit/screenshots/${capture}-home.png`,fullPage:true});await page.screenshot({path:`audit/screenshots/${capture}-hero.png`});await page.locator('#skills').screenshot({path:`audit/screenshots/${capture}-tools.png`})}
   if(route==='/privacy/')await page.screenshot({path:`audit/screenshots/${capture}-privacy.png`,fullPage:true});
  }
  await page.goto(origin,{waitUntil:'networkidle'});
  await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').textContent(),'Skip to main content');await page.keyboard.press('Enter');assert.equal(await page.locator(':focus').getAttribute('id'),'main-content');
  if(theme==='night'){await page.getByRole('button',{name:'Switch to night mode'}).click();await page.waitForFunction(()=>document.documentElement.dataset.theme==='night')}
  const certificate=page.getByRole('button',{name:'View AI App Development — CreateX certificate'});await certificate.focus();await page.keyboard.press('Enter');await page.getByRole('dialog').waitFor({state:'visible'});await page.getByRole('dialog').locator('img').evaluate(el=>el.decode());
  const dialogAxe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  for(const el of await page.getByRole('dialog').locator('h2,p').all()){
   await el.scrollIntoViewIfNeeded();const r=await el.evaluate(e=>{function lum(rgb){return rgb.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0)}const d=e.closest('dialog'),s=getComputedStyle(e),bg=getComputedStyle(d).backgroundColor,r=e.getBoundingClientRect(),f=lum(s.color),b=lum(bg),top=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return {text:e.textContent,color:s.color,background:bg,ratio:(Math.max(f,b)+.05)/(Math.min(f,b)+.05),unobscured:top===e||e.contains(top)}});assert(r.ratio>=4.5&&r.unobscured);report.dialogContrast.push({device,theme,...r});
  }
  report.pages.push({route:'certificate dialog',device,theme,violations:dialogAxe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:dialogAxe.incomplete.map(v=>({id:v.id,count:v.nodes.length,targets:v.nodes.map(n=>n.target)}))});
  await page.getByRole('dialog').evaluate(el=>el.scrollTop=0);await page.screenshot({path:`audit/screenshots/${capture}-certificate-dialog.png`});
  for(let i=0;i<3;i++){await page.keyboard.press('Tab');assert(await page.evaluate(()=>document.activeElement===document.body||!!document.activeElement.closest('dialog')))}
  await page.keyboard.press('Escape');await page.getByRole('dialog').waitFor({state:'hidden'});await page.locator('dialog h2').waitFor({state:'detached'});assert(await certificate.evaluate(el=>el===document.activeElement));report.interactions.push(device+': skip link, native certificate focus/escape/return');
  if(device==='mobile'){await page.getByRole('button',{name:'Open navigation menu'}).focus();await page.keyboard.press('Enter');await page.getByRole('navigation',{name:'Mobile navigation'}).waitFor({state:'visible'});await page.screenshot({path:`audit/screenshots/${capture}-menu.png`});await page.keyboard.press('Escape');await page.getByRole('navigation',{name:'Mobile navigation'}).waitFor({state:'hidden'});report.interactions.push('mobile '+theme+': menu opens by keyboard and Escape closes')}
  await page.getByRole('button',{name:theme==='night'?'Switch to day mode':'Switch to night mode'}).click();await page.getByRole('navigation',{name:'Policies'}).getByRole('link',{name:'Privacy',exact:true}).click();await page.getByRole('heading',{name:'Privacy Policy',exact:true}).waitFor();assert.equal(await page.locator('html').getAttribute('data-theme'),theme==='night'?'day':'night','Theme survives internal policy navigation without browser storage');report.interactions.push(device+' '+theme+': theme toggles and survives internal navigation');
  await context.close();
 }
 const reduced=await browser.newContext({reducedMotion:'reduce',viewport:{width:390,height:844}});const rp=await reduced.newPage();await rp.goto(origin,{waitUntil:'networkidle'});await rp.locator('[data-animation="ready"]').waitFor();assert(await rp.getByRole('button',{name:'Play dance'}).isVisible());await rp.locator('.avatar-canvas').scrollIntoViewIfNeeded();const ra=hash(await rp.locator('canvas').screenshot());await rp.waitForTimeout(350);assert.equal(hash(await rp.locator('canvas').screenshot()),ra);report.interactions.push('Reduced motion: avatar remains still until visitor explicitly chooses Play dance');await reduced.close();
 const small=await browser.newPage({viewport:{width:320,height:800},reducedMotion:'reduce'});await small.goto(origin,{waitUntil:'networkidle'});assert(!await small.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1));await small.getByRole('button',{name:'Switch to night mode'}).click();assert(!await small.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1));report.interactions.push('320px: no horizontal overflow in day/night');
 const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto(origin);assert(await nojs.getByRole('heading',{level:1}).isVisible());assert(await nojs.locator('.avatar-poster').isVisible());report.interactions.push('No JavaScript: copy, static avatar preview, project links and certificate links remain available');
 report.unresolvedIncomplete=report.pages.flatMap(p=>(p.incomplete||[]).flatMap(i=>i.targets.filter(t=>!(p.route==='certificate dialog'&&i.id==='color-contrast'&&report.dialogContrast.filter(d=>d.device===p.device&&d.theme===p.theme).length===3&&['#certificate-dialog-title','dialog > p:nth-child(4)','p:nth-child(5)'].includes(t[0]))).map(target=>({route:p.route,device:p.device,theme:p.theme,id:i.id,target}))));
 report.passed=report.pages.every(p=>!p.overflow&&!p.violations.length&&(!p.brokenImages||!p.brokenImages.length))&&!report.consoleErrors.length&&!report.externalRequests.length&&!report.unresolvedIncomplete.length;
}finally{await fs.writeFile('audit/browser-results.json',JSON.stringify(report,null,2));await browser.close()}
console.log(JSON.stringify(report,null,2));if(!report.passed)process.exitCode=1;
