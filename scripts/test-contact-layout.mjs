import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch();
const origin=process.env.PORTFOLIO_URL||'http://127.0.0.1:4173';
const report={checks:[],errors:[]};
try {
 for(const width of [320,360,390,768,1440]) for(const theme of ['night','day']) {
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  page.on('pageerror',e=>report.errors.push(String(e)));
  let posts=0;await page.route('https://formspree.io/**',r=>{posts++;return r.abort();});
  await page.goto(origin+'/contact/?service=combat',{waitUntil:'networkidle'});
  if(theme==='day')await page.evaluate(()=>{document.documentElement.dataset.theme='day';document.documentElement.dataset.dayPhase='warm';});
  const selected=page.locator('.quest-options label.selected').first();
  assert(await selected.count());
  assert.notEqual(await selected.evaluate(e=>getComputedStyle(e).borderColor),await page.locator('.quest-options label:not(.selected)').first().evaluate(e=>getComputedStyle(e).borderColor));
  await page.getByRole('button',{name:'Add the details',exact:true}).click();
  const geometry=await page.evaluate(()=>{
   const box=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom,right:r.right};};
   const details=document.querySelector('#quest-details'),email=document.querySelector('#quest-email'),consent=document.querySelector('#quest-consent');
   return {fields:[details,email].map(e=>({label:box(e.labels[0]),input:box(e),parent:box(e.closest('.field')),font:parseFloat(getComputedStyle(e).fontSize)})),consent:box(consent),consentLabel:box(consent.labels[0]),panel:box(document.querySelector('.quest-panel')),overflow:document.documentElement.scrollWidth>innerWidth};
  });
  assert.equal(geometry.overflow,false);
  for(const f of geometry.fields){assert(f.input.y>=f.label.bottom+6,'Each label must sit above its field');assert(Math.abs(f.input.width-f.parent.width)<2,'Fields must use the available width');assert(f.input.x>=geometry.panel.x&&f.input.right<=geometry.panel.right);assert(f.font>=16,'Mobile inputs must avoid automatic focus zoom');}
  assert(geometry.fields[0].input.height>=125);
  assert(geometry.fields[1].label.y>=geometry.fields[0].input.bottom+16,'Email follows the text area without overlap');
  assert(geometry.consentLabel.x>=geometry.consent.right+10,'Consent text must wrap beside the checkbox');
  assert(geometry.consent.width>=19&&geometry.consent.height>=19);
  await page.getByRole('button',{name:'Send enquiry',exact:true}).click();
  await page.waitForFunction(()=>document.activeElement?.id==='quest-details');
  assert.equal(posts,0);
  await page.locator('#quest-details').fill('An inventory with equipment slots and item validation.');
  await page.locator('#quest-email').fill('layout-check@example.com');
  await page.locator('#quest-consent').check();
  if(width===360||width===1440) {
   await page.locator('.quest-recap').scrollIntoViewIfNeeded();
   await page.mouse.click(2,850);
   await page.screenshot({path:`audit/screenshots/contact-structure-${width}-${theme}.png`,fullPage:true});
  }
  assert.equal(posts,0);
  report.checks.push(`${width}px ${theme}: labels above full-width fields, no overlap, aligned consent, selected choices visible, validation focus and no horizontal overflow`);
  await page.close();
 }
 report.passed=!report.errors.length;
} catch(e){report.errors.push(e.stack);report.passed=false;}
finally{await browser.close();await fs.writeFile('audit/contact-layout-results.json',JSON.stringify(report,null,2));}
console.log(JSON.stringify(report,null,2));if(!report.passed)process.exitCode=1;
