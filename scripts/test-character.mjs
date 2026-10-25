import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const browser = await chromium.launch();
const origin = process.env.PORTFOLIO_URL || "http://127.0.0.1:4173";
const report = { checks: [], errors: [] };
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    page.on("pageerror", error => report.errors.push(String(error)));
    const models = [];
    page.on("request", request => { if(request.url().endsWith('.glb')) models.push(request.url()); });
    await page.goto(origin, { waitUntil: "networkidle" });
    const player = page.locator('.character-canvas video');
    await page.waitForFunction(() => { const v=document.querySelector('.character-canvas video');return v && !v.paused && v.currentTime > .15; });
    assert.equal(await player.evaluate(v => v.muted && v.playsInline && v.loop), true);
    assert((await player.getAttribute('src')).includes(width===390 ? '-mobile.mp4' : 'character.mp4'));
    assert.equal(models.length,0);
    const current=await player.evaluate(v=>v.currentTime);
    await page.waitForTimeout(230);
    assert((await player.evaluate(v=>v.currentTime)) > current);
    await page.getByRole('button',{name:'Pause character animation',exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('.character-canvas video').paused);
    const stopped=await player.evaluate(v=>v.currentTime);
    await page.waitForTimeout(220);
    assert.equal(await player.evaluate(v=>v.currentTime),stopped);
    await page.getByRole('button',{name:'Play character animation',exact:true}).focus();
    await page.keyboard.press('Enter');
    await page.waitForFunction(()=>!document.querySelector('.character-canvas video').paused);
    await page.keyboard.press('Space');
    await page.waitForFunction(()=>document.querySelector('.character-canvas video').paused);
    await page.keyboard.press('Enter');
    await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));
    await page.waitForTimeout(300);
    assert(await player.evaluate(v=>v.paused));
    await page.evaluate(()=>scrollTo(0,0));
    await page.waitForFunction(()=>!document.querySelector('.character-canvas video').paused);
    await page.screenshot({path:`audit/screenshots/character-video-${width}.png`});
    report.checks.push(`${width}px: local silent inline video autoplays, native click/Enter/Space pause and play, offscreen suspension/resume, appropriate rendition, no GLB`);
    await context.close();
  }
  for (const preference of ['reduced','save-data']) {
    const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:preference==='reduced'?'reduce':'no-preference'});
    if(preference==='save-data') await context.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true},configurable:true}));
    const page=await context.newPage();const requests=[];
    page.on('request',r=>{if(r.url().endsWith('.mp4'))requests.push(r.url());});
    await page.goto(origin,{waitUntil:'networkidle'});
    assert.equal(requests.length,0);
    assert.equal(await page.locator('.character-canvas video').count(),0);
    await page.getByRole('button',{name:'Play character animation',exact:true}).click();
    await page.waitForFunction(()=>{const v=document.querySelector('.character-canvas video');return v&&!v.paused&&v.currentTime>.1;});
    report.checks.push(`${preference}: poster without video transfer until explicit activation`);
    await context.close();
  }
  const failed=await browser.newPage({viewport:{width:390,height:844}});
  await failed.route('**/media/scriptlilla-character*.mp4',r=>r.abort());
  await failed.goto(origin,{waitUntil:'networkidle'});
  await failed.waitForFunction(()=>document.querySelector('.character-canvas').disabled);
  assert(await failed.locator('.character-film-poster').evaluate(i=>i.complete&&i.naturalWidth>0));
  assert.equal(await failed.locator('.character-canvas video').count(),0);
  report.checks.push('Video failure preserves a still and removes the dead playback action');
  await failed.close();
  report.passed=!report.errors.length;
} catch(error) { report.errors.push(error.stack);report.passed=false; }
finally { await browser.close();await fs.writeFile('audit/character-results.json',JSON.stringify(report,null,2)); }
console.log(JSON.stringify(report,null,2));if(!report.passed)process.exitCode=1;
