import { chromium } from '@playwright/test';
const browser=await chromium.launch();
try {
  const page=await browser.newPage({viewport:{width:1440,height:1000}});
  await page.goto('http://127.0.0.1:4173/',{waitUntil:'networkidle'});
  await page.locator('[data-animation="ready"]').waitFor();
  await page.getByRole('button',{name:'Pause dance'}).click();
  await page.locator('.avatar-canvas').screenshot({path:'design/avatar-day-studio.png'});
  await page.getByRole('button',{name:'Switch to night mode'}).click();
  await page.waitForTimeout(1000);
  await page.locator('.avatar-canvas').screenshot({path:'design/avatar-night-studio.png'});
} finally {await browser.close()}
