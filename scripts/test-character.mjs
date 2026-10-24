import { chromium } from "@playwright/test";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import assert from "node:assert/strict";
const origin = process.env.PORTFOLIO_URL || "http://127.0.0.1:4173";
const hash = (buffer) => createHash("sha256").update(buffer).digest("hex");
const report = { checks: [], errors: [] };
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "no-preference",
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
  const modelRequests = [];
  page.on("request", (request) => {
    if (request.url().includes("avatar-dance.glb"))
      modelRequests.push(request.timing().startTime);
  });
  const started = Date.now();
  await page.goto(origin, { waitUntil: "domcontentloaded" });
  const loadStart = await page.evaluate(() => performance.timeOrigin);
  assert(
    await page
      .getByRole("heading", { name: "Your game Built to play", level: 1 })
      .isVisible(),
  );
  await page
    .locator('.character-stage[data-ready="true"]')
    .waitFor({ timeout: 30000 });
  await page.addStyleTag({
    content: ".character-canvas:focus-visible{outline:none!important}",
  });
  assert.equal(modelRequests.length, 1);
  const modelStart = await page.evaluate(
    () =>
      performance
        .getEntriesByType("resource")
        .find((entry) => entry.name.endsWith("avatar-dance.glb")).startTime,
  );
  assert(
    modelStart >= 1200,
    "3D model should be deferred beyond the initial paint",
  );
  const canvas = page.locator(".character-canvas canvas");
  const moving = hash(await canvas.screenshot());
  await page.waitForTimeout(180);
  assert.notEqual(hash(await canvas.screenshot()), moving);
  report.checks.push(
    "Immediate heading and deferred model request, real animated GLB",
  );
  await page.getByRole("button", { name: "Pause dance" }).click();
  await page.waitForTimeout(100);
  const still = hash(await canvas.screenshot());
  await page.waitForTimeout(180);
  assert.equal(
    hash(await canvas.screenshot()),
    still,
    "Still pose must match after pause or reset",
  );
  await page.locator(".character-canvas").focus();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(100);
  assert.notEqual(hash(await canvas.screenshot()), still);
  await page.keyboard.press("Home");
  await page.waitForTimeout(100);
  assert.equal(
    hash(await canvas.screenshot()),
    still,
    "Still pose must match after pause or reset",
  );
  report.checks.push("Exact motion stop, keyboard rotation and Home reset");
  await page.getByRole("button", { name: "Turn avatar lights off" }).click();
  await page.waitForTimeout(100);
  assert.notEqual(hash(await canvas.screenshot()), still);
  await page.getByRole("button", { name: "Turn avatar lights on" }).click();
  await page.waitForTimeout(100);
  assert.equal(
    hash(await canvas.screenshot()),
    still,
    "Still pose must match after pause or reset",
  );
  await page.getByRole("button", { name: "Switch to day mode" }).click();
  await page.waitForTimeout(100);
  assert.notEqual(hash(await canvas.screenshot()), still);
  report.checks.push("Actual stage lighting and theme-dependent illumination");
  await page.getByRole("button", { name: "Play dance" }).click();
  await page.waitForTimeout(100);
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(200);
  const offscreen = await page.evaluate(() => window.__drawCalls);
  await page.waitForTimeout(450);
  assert.equal(
    await page.evaluate(() => window.__drawCalls),
    offscreen,
    "Offscreen renderer must issue no draw calls",
  );
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(200);
  assert((await page.evaluate(() => window.__drawCalls)) > offscreen);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Play dance" }).waitFor();
  const reduced = await page.evaluate(() => window.__drawCalls);
  await page.waitForTimeout(250);
  assert.equal(await page.evaluate(() => window.__drawCalls), reduced);
  report.checks.push(
    "Offscreen draw calls stop and resume; live reduced-motion changes stop the animation",
  );
  await page.screenshot({
    path: "audit/screenshots/game-live-desktop-hero.png",
  });
  const quiet = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const quietModels = [];
  quiet.on("request", (request) => {
    if (request.url().endsWith(".glb")) quietModels.push(request.url());
  });
  await quiet.goto(origin, { waitUntil: "networkidle" });
  await quiet.waitForTimeout(1600);
  assert.equal(quietModels.length, 0);
  assert(
    await quiet
      .getByRole("button", { name: "Explore character", exact: true })
      .isVisible(),
  );
  await quiet
    .getByRole("button", { name: "Explore character", exact: true })
    .click();
  await quiet
    .locator('.character-stage[data-ready="true"]')
    .waitFor({ timeout: 30000 });
  assert(await quiet.getByRole("button", { name: "Play dance" }).isVisible());
  report.checks.push(
    "Reduced motion uses the still preview without model traffic until explicit activation",
  );
  const saver = await browser.newPage({ reducedMotion: "no-preference" });
  await saver.addInitScript(() =>
    Object.defineProperty(navigator, "connection", {
      value: { saveData: true },
    }),
  );
  const saverModels = [];
  saver.on("request", (request) => {
    if (request.url().endsWith(".glb")) saverModels.push(request.url());
  });
  await saver.goto(origin, { waitUntil: "networkidle" });
  await saver.waitForTimeout(1600);
  assert.equal(saverModels.length, 0);
  report.checks.push("Data-saving preference suppresses automatic 3D loading");
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
