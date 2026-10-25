import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const origin = "http://127.0.0.1:4173";
const browser = await chromium.launch();
const report = { checks: [], errors: [] };
try {
  const context = await browser.newContext({
    viewport: { width: 1100, height: 850 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => report.errors.push(String(error)));
  await page.addInitScript(() => {
    window.__flybys = [];
    new MutationObserver(() => {
      const sprite = document.querySelector(".hero-flyby[data-hero]");
      if (sprite && !window.__flybys.includes(Number(sprite.dataset.hero)))
        window.__flybys.push(Number(sprite.dataset.hero));
    }).observe(document, { childList: true, subtree: true });
  });
  await page.clock.install();
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.locator('.hero-flyby[data-hero="1"]').waitFor();
  assert.equal(
    await page
      .locator(".hero-flyby-layer")
      .evaluate((el) => getComputedStyle(el).pointerEvents),
    "none",
  );
  assert.equal(
    (
      await page.evaluate(() =>
        JSON.parse(sessionStorage.getItem("scriptlilla-hero-session-v2")),
      )
    ).seen,
    1,
  );
  await page.waitForFunction(
    () => document.querySelector(".hero-flyby")?.getAnimations().length === 1,
  );
  await page.evaluate(() =>
    document
      .querySelector(".hero-flyby")
      .getAnimations()
      .forEach((animation) => animation.finish()),
  );
  await page.waitForFunction(() => !document.querySelector(".hero-flyby"));
  await page.clock.fastForward(14000);
  assert.equal(await page.locator(".hero-flyby").count(), 0);
  for (let index = 2; index <= 7; index++) {
    await page.clock.fastForward(index === 2 ? 1100 : 15100);
    await page.locator(`.hero-flyby[data-hero="${index}"]`).waitFor();
    await page.waitForFunction(
      () => document.querySelector(".hero-flyby")?.getAnimations().length === 1,
    );
    await page.evaluate(() =>
      document
        .querySelector(".hero-flyby")
        .getAnimations()
        .forEach((animation) => animation.finish()),
    );
    await page.waitForFunction(() => !document.querySelector(".hero-flyby"));
  }
  assert.deepEqual(
    await page.evaluate(() => window.__flybys),
    [1, 2, 3, 4, 5, 6, 7],
  );
  await page.clock.fastForward(60000);
  assert.equal(await page.locator(".hero-flyby").count(), 0);
  assert.equal(
    (
      await page.evaluate(() =>
        JSON.parse(sessionStorage.getItem("scriptlilla-hero-session-v2")),
      )
    ).seen,
    7,
  );
  await page.reload({ waitUntil: "networkidle" });
  await page.clock.fastForward(30000);
  assert.equal(await page.locator(".hero-flyby").count(), 0);
  report.checks.push(
    "Seven distinct sprites, fifteen-second spacing, no click interception, no loop, no replay after refresh",
  );
  assert.equal(
    await page
      .getByRole("button", { name: /effects|replay|try again/i })
      .count(),
    0,
  );
  report.checks.push(
    "No floating Effects, replay or try-again buttons are rendered",
  );
  const fresh = await context.newPage();
  await fresh.clock.install();
  await fresh.goto(origin, { waitUntil: "networkidle" });
  await fresh.locator('.hero-flyby[data-hero="1"]').waitFor();
  await fresh.waitForFunction(
    () => document.querySelector(".hero-flyby")?.getAnimations().length === 1,
  );
  await fresh.evaluate(() =>
    document.querySelector(".hero-flyby").getAnimations()[0].finish(),
  );
  await fresh.getByRole("button", { name: "Switch to day mode" }).click();
  await fresh.clock.fastForward(20000);
  assert.equal(
    await fresh.locator(".hero-flyby").count(),
    0,
    "Night characters must pause in Day mode",
  );
  assert.equal(
    await fresh.evaluate(
      () =>
        JSON.parse(sessionStorage.getItem("scriptlilla-hero-session-v2")).seen,
    ),
    1,
  );
  await fresh.getByRole("button", { name: "Switch to night mode" }).click();
  await fresh.locator('.hero-flyby[data-hero="2"]').waitFor();
  await fresh.getByRole("button", { name: "Make ScriptLilla dance" }).click();
  await fresh.getByRole("button", { name: "Stop ScriptLilla dancing" }).click();
  assert.equal(
    await fresh.locator(".hero-flyby-layer").getAttribute("data-enabled"),
    "true",
  );
  assert.equal(
    await fresh.locator(".stage-signals").getAttribute("data-moving"),
    "true",
  );
  await fresh.locator(".profile-story").scrollIntoViewIfNeeded();
  await fresh.waitForFunction(() => !document.querySelector(".hero-flyby"));
  await fresh.clock.fastForward(20000);
  assert.equal(
    await fresh.locator(".hero-flyby").count(),
    0,
    "Fly-bys must not compete with reading the profile",
  );
  assert.equal(
    await fresh.evaluate(
      () =>
        JSON.parse(sessionStorage.getItem("scriptlilla-hero-session-v2")).seen,
    ),
    2,
  );
  await fresh.locator(".hero").scrollIntoViewIfNeeded();
  await fresh.locator('.hero-flyby[data-hero="3"]').waitFor();
  await fresh.emulateMedia({ reducedMotion: "reduce" });
  await fresh.waitForFunction(() => !document.querySelector(".hero-flyby"));
  await fresh.reload({ waitUntil: "networkidle" });
  assert.equal(
    await fresh.locator('.hero-flyby[data-motion="full"]').count(),
    0,
  );
  report.checks.push(
    "A fresh tab starts automatically; Day pauses progression, Night resumes it, dance clicks do not stop ambient effects, live reduced-motion preference stops moving entrances",
  );
  await context.close();
  const quiet = await browser.newContext({ reducedMotion: "reduce" });
  const qp = await quiet.newPage();
  await qp.goto(origin, { waitUntil: "networkidle" });
  await qp.locator('.hero-flyby[data-hero="1"][data-motion="quiet"]').waitFor();
  assert.equal(await qp.locator(".hero-entry-caption").count(), 0);
  assert.equal(
    await qp
      .locator(".hero-flyby")
      .evaluate((el) => getComputedStyle(el).backgroundColor),
    "rgba(0, 0, 0, 0)",
  );
  await qp.waitForFunction(
    () => document.querySelector(".hero-flyby")?.getAnimations().length === 1,
  );
  assert.equal(
    await qp.locator(".hero-flyby .fighter-sprite").getAttribute("data-moving"),
    "false",
  );
  assert.equal(
    await qp.locator(".hero-flyby").evaluate((el) =>
      el
        .getAnimations()[0]
        .effect.getKeyframes()
        .some((frame) => frame.transform),
    ),
    false,
  );
  assert.equal(
    await qp.evaluate(
      () =>
        JSON.parse(sessionStorage.getItem("scriptlilla-hero-session-v2")).seen,
    ),
    1,
  );
  await quiet.close();
  const saver = await browser.newContext();
  const sp = await saver.newPage();
  await sp.addInitScript(() =>
    Object.defineProperty(navigator, "connection", {
      value: { saveData: true },
    }),
  );
  await sp.goto(origin, { waitUntil: "networkidle" });
  await sp.locator('.hero-flyby[data-hero="1"][data-motion="quiet"]').waitFor();
  await sp.waitForFunction(
    () => document.querySelector(".hero-flyby")?.getAnimations().length === 1,
  );
  assert.equal(
    await sp.locator(".hero-flyby .fighter-sprite").getAttribute("data-moving"),
    "false",
  );
  assert.equal(
    await sp.evaluate(
      () =>
        JSON.parse(sessionStorage.getItem("scriptlilla-hero-session-v2")).seen,
    ),
    1,
  );
  await saver.close();
  report.checks.push(
    "Reduced motion and data saving show still characters with opacity-only fades",
  );
  report.passed = !report.errors.length;
} catch (error) {
  report.errors.push(error.stack);
  report.passed = false;
} finally {
  await browser.close();
  await fs.writeFile(
    "audit/flyby-results.json",
    JSON.stringify(report, null, 2),
  );
}
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
