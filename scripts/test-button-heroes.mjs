import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch();const origin=process.env.PORTFOLIO_URL||'http://127.0.0.1:4173';const report={checks:[],errors:[]};
try{
 for(const reduced of [false,true]){
  const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:reduced?'reduce':'no-preference'});
  page.on('pageerror',e=>report.errors.push(String(e)));
  await page.goto(origin,{waitUntil:'networkidle'});
  const button=page.locator('.hero-actions .button');await button.hover();
  const hero=page.locator('.button-hero[data-shown="true"]');await hero.waitFor();
  const first=await hero.getAttribute('data-hero');
  assert.equal(await hero.evaluate(el=>getComputedStyle(el).pointerEvents),'none');
  assert.equal(await hero.getAttribute('aria-hidden'),'true');
  const sprite=hero.locator('img');
  const before=await sprite.evaluate(el=>getComputedStyle(el).transform);await page.waitForTimeout(200);
  const after=await sprite.evaluate(el=>getComputedStyle(el).transform);
  if(reduced)assert.equal(before,after);else assert.notEqual(before,after);
  await page.locator('.hero-actions .link-action').hover();await page.waitForTimeout(200);
  assert.notEqual(await hero.getAttribute('data-hero'),first);
  await page.mouse.move(700,800);await page.waitForTimeout(180);
  assert.equal(await page.locator('.button-hero').count(),0);
  await button.focus();await page.keyboard.press('Tab');await hero.waitFor();
  assert.equal(await hero.getAttribute('data-quiet'),'true');
  await page.mouse.move(700,800);await button.hover();await button.click();
  await page.waitForURL('**/contact/');await page.waitForTimeout(200);
  assert.equal(await page.locator('.button-hero').count(),0);
  report.checks.push(`${reduced?'reduced':'full'}: different heroes, actual sprite frames, no input interception, quiet keyboard focus, cleanup and working navigation`);
  await page.close();
 }
 for(const reduced of [false,true]) {
  const touch=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true,reducedMotion:reduced?'reduce':'no-preference'});
  touch.on('pageerror',e=>report.errors.push(String(e)));
  await touch.goto(origin,{waitUntil:'networkidle'});
  await touch.locator('.hero-actions .button').tap();
  await touch.waitForURL('**/contact/');
  const cameo=touch.locator('.button-hero[data-shown="true"]');await cameo.waitFor();
  assert.equal(await cameo.getAttribute('data-mode'),'drop');
  assert.equal(await cameo.getAttribute('data-quiet'),String(reduced));
  assert.equal(await cameo.evaluate(e=>getComputedStyle(e).pointerEvents),'none');
  const flight=cameo.locator('.button-hero-flight');
  const first=await flight.boundingBox();await touch.waitForTimeout(110);
  const next=await flight.boundingBox();
  if(reduced)assert.deepEqual(first,next);else assert.notEqual(first.y,next.y);
  assert.equal(await touch.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await touch.waitForTimeout(900);assert.equal(await touch.locator('.button-hero').count(),0);
  await touch.getByRole('button',{name:'Combat & abilities',exact:true}).tap();
  await cameo.waitFor();assert.equal(await cameo.getAttribute('data-mode'),'dash');
  if(!reduced){
   assert((await cameo.locator('img').getAttribute('src')).endsWith('-run.webp'));
   const startX=(await cameo.locator('.button-hero-flight').boundingBox()).x;await touch.waitForTimeout(100);
   assert((await cameo.locator('.button-hero-flight').boundingBox()).x>startX);
  }
  await touch.waitForTimeout(900);assert.equal(await touch.locator('.button-hero').count(),0);
  await touch.getByRole('button',{name:'Add the details',exact:true}).tap();
  await cameo.waitFor();assert.equal(await cameo.getAttribute('data-mode'),'drop');
  await touch.waitForTimeout(900);assert.equal(await touch.locator('.button-hero').count(),0);
  // A cancelled scroll gesture must not count as activation.
  await touch.locator('.quest-track button').first().dispatchEvent('pointerdown',{pointerType:'touch',clientX:50,clientY:300,bubbles:true});
  await touch.locator('.quest-track button').first().dispatchEvent('pointercancel',{pointerType:'touch',bubbles:true});
  await touch.waitForTimeout(150);assert.equal(await touch.locator('.button-hero').count(),0);
  report.checks.push(`${reduced?'reduced':'full'} touch: immediate navigation, drop/dash sprites survive route changes, real animation, automatic cleanup, no overflow, form actions intact and cancelled gesture ignored`);
  await touch.close();
 }
 report.passed=!report.errors.length;
}catch(e){report.errors.push(e.stack);report.passed=false;}finally{await browser.close();await fs.writeFile('audit/button-heroes-results.json',JSON.stringify(report,null,2));}
console.log(JSON.stringify(report,null,2));if(!report.passed)process.exitCode=1;
