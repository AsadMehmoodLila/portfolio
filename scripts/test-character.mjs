import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
const browser = await chromium.launch();
const report = { checks: [], errors: [] };
const origin = process.env.PORTFOLIO_URL || "http://127.0.0.1:4173";
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({
      viewport: { width, height: 1000 },
      reducedMotion: width === 390 ? "reduce" : "no-preference",
    });
    page.on("pageerror", (error) => report.errors.push(String(error)));
    await page.addInitScript(() => {
      window.__drawCalls = 0;
      for (const method of ["drawElements", "drawArrays"]) {
        const original = WebGL2RenderingContext.prototype[method];
        WebGL2RenderingContext.prototype[method] = function (...args) {
          window.__drawCalls++;
          return original.apply(this, args);
        };
      }
    });
    const models = [];
    page.on("request", (r) => {
      if (r.url().endsWith("scriptlilla-dance.glb")) models.push(r.url());
    });
    await page.goto(origin + "/?render-character", {
      waitUntil: "networkidle",
    });
    const character = page.locator("button.character-canvas");
    assert.equal(
      await page
        .locator(".character-controls,.character-activate,.character-toolbar")
        .count(),
      0,
    );
    assert.equal(await character.getAttribute("aria-pressed"), "false");
    assert.equal(models.length, 0, "Every device must show the still without loading a GLB before interaction");
    await character.click();
    await page
      .locator('.character-stage[data-ready="true"]')
      .waitFor({ timeout: 30000 });
    assert.equal(await character.getAttribute("aria-pressed"), "true");
    const canvas = page.locator(".character-canvas canvas");
    const frame = async () =>
      createHash("sha256")
        .update(await canvas.evaluate((el) => el.toDataURL()))
        .digest("hex");
    const moving = await frame();
    await page.waitForTimeout(220);
    assert.notEqual(await frame(), moving);
    await character.click();
    await page.waitForTimeout(120);
    const still = await frame();
    await page.waitForTimeout(200);
    assert.equal(await frame(), still);
    await character.focus();
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(100);
    assert.notEqual(await frame(), still);
    await page.keyboard.press("Home");
    await page.waitForTimeout(100);
    assert.equal(await frame(), still);
    await page.keyboard.press("Enter");
    assert.equal(await character.getAttribute("aria-pressed"), "true");
    await page.keyboard.press("Space");
    assert.equal(await character.getAttribute("aria-pressed"), "false");
    await character.click();
    await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(250);
    const offscreen = await page.evaluate(() => window.__drawCalls);
    await page.waitForTimeout(300);
    assert.equal(await page.evaluate(() => window.__drawCalls), offscreen);
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(250);
    assert((await page.evaluate(() => window.__drawCalls)) > offscreen);
    assert.equal(models.length, 1);
    report.checks.push(
      `${width}px: no toolbar/Explore button, direct click starts real GLB dance and stops it, keyboard Enter/Space/rotation/Home, no offscreen draw calls, model fetched once`,
    );
    await page.close();
  }
  report.passed = !report.errors.length;
} catch (error) {
  report.errors.push(error.stack);
  report.passed = false;
} finally {
  await browser.close();
  await fs.writeFile(
    "audit/character-results.json",
    JSON.stringify(report, null, 2),
  );
}
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
