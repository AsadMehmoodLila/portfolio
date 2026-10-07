// A short real browser recording for reviewing the authored avatar motion.
import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const browser = await chromium.launch();
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference', recordVideo: { dir: 'audit/video', size: { width: 1440, height: 1000 } } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.locator('[data-animation="ready"]').waitFor({ timeout: 45000 });
  await page.waitForTimeout(2000);
  await page.getByRole('button',{name:'Switch to night mode'}).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button',{name:'Turn avatar lights off'}).click();
  await page.waitForTimeout(1500);
  await page.getByRole('button',{name:'Turn avatar lights on'}).click();
  await page.waitForTimeout(2000);
  const video = page.video();
  await context.close();
  await video.saveAs('audit/avatar-dance.webm');
  await fs.unlink(await video.path());
  console.log('Saved audit/avatar-dance.webm');
} finally { await browser.close(); }
