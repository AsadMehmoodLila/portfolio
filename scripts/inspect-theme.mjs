import { chromium } from '@playwright/test';
const browser=await chromium.launch();
try {
  const page=await browser.newPage({viewport:{width:320,height:800},reducedMotion:'reduce'});
  await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
  console.log(JSON.stringify(await page.evaluate(()=>[...document.querySelectorAll('body *')].map(e=>({tag:e.tagName,cls:e.className,text:e.textContent?.slice(0,45),x:e.getBoundingClientRect().x,right:e.getBoundingClientRect().right,width:e.getBoundingClientRect().width})).filter(e=>e.right>321||e.x<0)),null,2));
  await page.screenshot({path:'audit/screenshots/320-theme-debug.png',fullPage:true});
  await page.getByRole('button',{name:'Open navigation menu'}).focus();await page.keyboard.press('Enter');await page.waitForTimeout(200);console.log('Fresh menu',await page.getByRole('button',{name:'Close navigation menu'}).count());
  await page.keyboard.press('Escape');
  const cert=page.getByRole('button',{name:'View AI App Development — CreateX certificate'});await cert.click();await page.keyboard.press('Escape');await page.locator('dialog').waitFor({state:'hidden'});await page.getByRole('button',{name:'Open navigation menu'}).focus();await page.keyboard.press('Enter');await page.waitForTimeout(200);console.log('After dialog',await page.evaluate(()=>({focus:document.activeElement?.outerHTML?.slice(0,200),menu:document.querySelector('.menu-button')?.getAttribute('aria-expanded'),dialog:document.querySelector('dialog')?.open})));
  await page.screenshot({path:'audit/screenshots/menu-theme-debug.png'});
  await page.getByRole('button',{name:'Switch to night mode'}).click();await page.waitForTimeout(1000);await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'audit/screenshots/night-theme-debug.png'});
} finally {await browser.close()}
