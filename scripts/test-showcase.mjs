import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const origin=process.env.PORTFOLIO_URL || 'http://127.0.0.1:4173';
const browser=await chromium.launch();
const report={checks:[],errors:[]};
try {
 for(const width of [320,390,1440]) {
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});
  page.on('pageerror',e=>report.errors.push(String(e)));
  for(const route of ['/','/about/','/work/stream-a-cheese-pull/']) {
   const response=await page.goto(origin+route,{waitUntil:'networkidle'});
   assert.equal(response.status(),200);
   const text=await page.locator('main').innerText();
   assert(!/Escape Tsunami|billions|1B\+/i.test(text));
   assert(text.includes('Stream A Cheese Pull!'));
   assert(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)),`${width} ${route}: overflow`);
   if(route!='/about/') {
    assert(text.includes('39.5M+'));assert(text.includes('853K+'));assert(text.includes('Food system'));
    assert.equal(await page.locator('.work-facts a').first().getAttribute('href'),'https://www.roblox.com/games/124293095895786/Stream-A-Cheese-Pull');
   }
   await page.locator('main img').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));
   await page.waitForFunction(()=>Array.from(document.querySelectorAll('main img')).every(i=>i.complete&&i.naturalWidth),{},{timeout:10000});
   if(route.startsWith('/work/')) {
    assert.equal(await page.locator('.case-feature-tags li').count(),7);
    assert.equal(await page.getByRole('link',{name:'My Roblox profile'}).getAttribute('href'),'https://www.roblox.com/users/5316217798/profile');
    assert.equal(await page.locator('iframe,video').count(),0);
    await page.locator('.case-references summary').click();
    assert(await page.getByText('My contribution: food system.',{exact:false}).isVisible());
   }
   if(width===1440&&route==='/')await page.locator('#work').screenshot({path:'audit/screenshots/cheese-home-desktop.png'});
   if(route.startsWith('/work/')&&width!==320){await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,0)});await page.waitForTimeout(100);}
   if(route.startsWith('/work/')&&width!==320)await page.screenshot({path:`audit/screenshots/cheese-case-${width}.png`,fullPage:true});
  }
  assert.equal((await page.goto(origin+'/work/escape-tsunami/')).status(),404);
  await page.close();
  report.checks.push(`${width}px: published showcase, food contribution, sourced dated reach, feature tags, linked role, loaded assets, no overflow; previous route removed`);
 }
 const sitemap=await (await fetch(origin+'/sitemap.xml')).text();
 assert(sitemap.includes('/work/stream-a-cheese-pull/'));assert(!sitemap.includes('escape-tsunami'));
 assert.equal((await fetch(origin+'/media/roblox-game.webp')).status,404);
 report.passed=!report.errors.length;
} catch(e){report.errors.push(e.stack);report.passed=false;} finally{await browser.close();await fs.writeFile('audit/showcase-results.json',JSON.stringify(report,null,2));}
console.log(JSON.stringify(report,null,2));if(!report.passed)process.exitCode=1;
