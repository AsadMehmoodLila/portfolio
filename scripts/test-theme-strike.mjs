import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const browser = await chromium.launch();
const origin = process.env.PORTFOLIO_URL || "http://127.0.0.1:4173";
const report = { checks: [], errors: [] };
try {
  for (const width of [1440, 390])
    for (const reduced of [false, true]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        reducedMotion: reduced ? "reduce" : "no-preference",
      });
      const page = await context.newPage();
      page.on("pageerror", (e) => report.errors.push(String(e)));
      await page.goto(origin, { waitUntil: "networkidle" });
      assert.equal(
        await page.locator("html").getAttribute("data-theme"),
        "night",
      );
      const start = Date.now();
      await page.getByRole("button", { name: "Switch to day mode" }).click();
      await page.locator('.solar-cinematic[data-started="true"]').waitFor();
      assert.equal(
        await page.locator("html").getAttribute("data-day-phase"),
        "cool",
      );
      assert.equal(await page.locator(".solar-ray").count(), 7);
      await page.waitForFunction(() =>
        [...document.querySelectorAll(".solar-ray > span")].every((el) => {
          const style = getComputedStyle(el);
          return (
            Number(style.opacity) >= 0.6 &&
            (style.transform === "none" ||
              new DOMMatrix(style.transform).a >= 0.95)
          );
        }),
      );
      assert.equal(
        await page.locator("html").getAttribute("data-day-phase"),
        "cool",
        "Visible beams must precede warmth",
      );
      assert.equal(
        await page
          .locator(".solar-cinematic")
          .evaluate((el) => getComputedStyle(el).pointerEvents),
        "none",
      );
      await page.waitForFunction(
        () => document.documentElement.dataset.dayPhase === "warm",
      );
      assert.equal(
        await page.locator(".solar-cinematic").getAttribute("data-motion"),
        reduced ? "reduced" : "full",
      );
      await page.waitForFunction(
        () => !document.querySelector(".solar-cinematic"),
      );
      assert(
        Date.now() - start < 6000,
        "The local cue must not occupy a nine-second theme switch",
      );
      await page.getByRole("button", { name: "Switch to night mode" }).click();
      await page.getByRole("button", { name: "Switch to day mode" }).click();
      await page.getByRole("button", { name: "Switch to night mode" }).click();
      await page.waitForTimeout(1600);
      assert.equal(await page.locator(".solar-cinematic").count(), 0);
      assert.equal(
        await page.locator("html").getAttribute("data-theme"),
        "night",
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      report.checks.push(
        `${width}px ${reduced ? "quiet" : "full"}: immediate cue, decoded assets before playback, visible beams before warmth, automatic cleanup and rapid cancellation`,
      );
      await context.close();
    }
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.route("**/media/vfx/**", (route) => route.abort());
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Switch to day mode" }).click();
  await page.waitForFunction(
    () => document.documentElement.dataset.dayPhase === "warm",
  );
  assert.equal(await page.locator(".solar-cinematic").count(), 0);
  report.checks.push(
    "Missing artwork cannot trap the theme in cool mode or leave a broken overlay",
  );
  await context.close();
  report.passed = !report.errors.length;
} catch (error) {
  report.errors.push(error.stack);
  report.passed = false;
} finally {
  await browser.close();
  await fs.writeFile(
    "audit/theme-strike-results.json",
    JSON.stringify(report, null, 2),
  );
}
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
