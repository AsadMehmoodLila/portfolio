import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const browser = await chromium.launch();
const report = { checks: [], errors: [] };
const origin = process.env.PORTFOLIO_URL || "http://127.0.0.1:4173";
try {
  for (const width of [1440, 390]) {
    for (const reduced of [false, true]) {
      const page = await browser.newPage({
        viewport: { width, height: 900 },
        reducedMotion: reduced ? "reduce" : "no-preference",
      });
      page.on("pageerror", (e) => report.errors.push(String(e)));
      await page.goto(origin, { waitUntil: "networkidle" });
      assert.equal(
        await page.locator("html").getAttribute("data-theme"),
        "night",
      );
      assert.equal(
        await page
          .getByRole("button", { name: /effects|replay|try again/i })
          .count(),
        0,
      );
      await page.getByRole("button", { name: "Switch to day mode" }).click();
      await page.waitForFunction(
        () => document.documentElement.dataset.dayPhase === "cool",
      );
      await page.waitForFunction(
        () =>
          getComputedStyle(document.body).backgroundColor ===
          "rgb(238, 242, 248)",
      );
      assert.equal(
        await page.evaluate(
          () => getComputedStyle(document.body).backgroundColor,
        ),
        "rgb(238, 242, 248)",
      );
      assert.equal(await page.locator(".sun-strike").count(), 0);
      await page.waitForTimeout(3100);
      assert.equal(
        await page.locator(".sun-strike").count(),
        0,
        "Sun must not arrive early",
      );
      await page.screenshot({
        path: `audit/screenshots/day-before-strike-${width}-${reduced}.png`,
      });
      await page.locator(".sun-strike").waitFor();
      assert.equal(
        await page.locator(".sun-strike").getAttribute("data-motion"),
        reduced ? "reduced" : "full",
      );
      assert.equal(
        await page
          .locator(".sun-strike")
          .evaluate((el) => getComputedStyle(el).pointerEvents),
        "none",
      );
      assert.equal(
        await page.locator("html").getAttribute("data-day-phase"),
        "cool",
        "Sun arrives before warm impact",
      );
      await page.waitForFunction(
        () => document.documentElement.dataset.dayPhase === "warm",
      );
      await page.waitForFunction(
        () =>
          getComputedStyle(document.body).backgroundColor ===
          "rgb(238, 226, 201)",
      );
      assert.equal(
        await page.evaluate(
          () => getComputedStyle(document.body).backgroundColor,
        ),
        "rgb(238, 226, 201)",
      );
      assert(
        (await page.locator(".sun-strike-message").textContent()).includes(
          "Destroyed that",
        ),
      );
      await page.screenshot({
        path: `audit/screenshots/day-impact-${width}-${reduced}.png`,
      });
      await page.waitForFunction(() => !document.querySelector(".sun-strike"));
      await page.getByRole("button", { name: "Switch to night mode" }).click();
      await page.getByRole("button", { name: "Switch to day mode" }).click();
      await page.waitForTimeout(200);
      await page.getByRole("button", { name: "Switch to night mode" }).click();
      await page.waitForTimeout(5000);
      assert.equal(await page.locator(".sun-strike").count(), 0);
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
        `${width}px ${reduced ? "reduced" : "full"}: cool white first, four-second delayed sun, warm impact, sourced star/quote, automatic cleanup, cancelled sequence never reappears`,
      );
      await page.close();
    }
  }
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
