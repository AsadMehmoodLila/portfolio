import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const browser = await chromium.launch();
const report = { checks: [], errors: [] };
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "no-preference",
    });
    page.on("pageerror", (e) => report.errors.push(String(e)));
    await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });
    assert.equal(
      await page
        .getByRole("button", { name: /effects|replay|try again/i })
        .count(),
      0,
    );
    await page.getByRole("button", { name: "Switch to day mode" }).click();
    await page.locator(".sun-strike").waitFor();
    assert.equal(
      await page.evaluate(
        () => getComputedStyle(document.body).backgroundColor,
      ),
      "rgb(238, 226, 201)",
    );
    assert.equal(
      await page.locator(".sun-strike-sun").getAttribute("src"),
      "/media/sun.svg",
    );
    await page.waitForTimeout(600);
    assert(
      await page
        .locator(".sun-strike-message")
        .textContent()
        .then((t) => t.includes("Destroyed that")),
    );
    assert.equal(
      await page
        .locator(".sun-strike")
        .evaluate((el) => getComputedStyle(el).pointerEvents),
      "none",
    );
    await page.screenshot({
      path: `audit/screenshots/warm-sun-strike-${width}.png`,
    });
    await page.getByRole("button", { name: "Switch to night mode" }).click();
    assert.equal(await page.locator(".sun-strike").count(), 0);
    await page.getByRole("button", { name: "Switch to day mode" }).click();
    await page.waitForFunction(() => !document.querySelector(".sun-strike"));
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    await page.screenshot({ path: `audit/screenshots/warm-day-${width}.png` });
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(
      await page.evaluate(() => document.documentElement.dataset.theme),
      "night",
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.getByRole("button", { name: "Switch to day mode" }).focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.locator(".sun-strike").count(), 0);
    await page.waitForFunction(
      () => document.documentElement.dataset.theme === "day",
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
    report.checks.push(
      `${width}px: warm palette, sourced sun/beam/quote, no click interception, cancellation, cleanup, default night and reduced-motion fallback`,
    );
    await page.close();
  }
  report.passed = !report.errors.length;
} catch (e) {
  report.errors.push(e.stack);
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
