import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

const browser = await chromium.launch();
const report = { checks: [], errors: [] };
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  page.on("pageerror", (e) => report.errors.push(String(e)));
  await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });
  const signals = page.locator(".stage-signals");
  assert.equal(await signals.getAttribute("data-moving"), "false");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.waitForFunction(
    () => document.querySelector(".stage-signals").dataset.moving === "true",
  );
  const sheet = page.locator(".combat-fighter-a img");
  const frame = () => sheet.evaluate((el) => getComputedStyle(el).transform);
  const before = await frame();
  await page.waitForTimeout(220);
  assert.notEqual(
    await frame(),
    before,
    "Original sprite frames must actually advance during automatic playback",
  );
  await page.waitForFunction(
    () =>
      document.querySelector(".combat-fighter-b").dataset.striking === "true",
  );
  await page.waitForFunction(() =>
    document
      .querySelector(".world-id")
      .textContent.includes("Combat & abilities"),
  );
  await page.waitForFunction(() =>
    document.querySelector(".stage-code").textContent.includes("table.insert"),
  );
  report.checks.push(
    "Automatic playback starts real advancing sprite frames, alternating attacks, rotating roles and code snippets",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(
    () => document.querySelector(".stage-signals").dataset.moving === "false",
  );
  const snapshot = await signals.textContent();
  const still = await frame();
  await page.waitForTimeout(3900);
  assert.equal(await frame(), still);
  assert.equal(await signals.textContent(), snapshot);
  assert.equal(
    await page.locator('.hero-flyby[data-motion="full"]').count(),
    0,
  );
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(await signals.getAttribute("data-moving"), "false");
  report.checks.push(
    "Reduced motion stops sprites, roles, code and fly-bys, including after refresh",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator(".profile-story").scrollIntoViewIfNeeded();
  await page.waitForFunction(
    () => document.querySelector(".stage-signals").dataset.moving === "false",
  );
  report.checks.push(
    "Combat and role timers stop when the character stage leaves the viewport",
  );
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const theme of ["night", "day"]) {
      await page.evaluate((value) => {
        document.documentElement.dataset.theme = value;
      }, theme);
      await page.locator(".profile-topic").first().click();
      const next = page.locator("button.profile-next");
      await next.click();
      assert.equal(
        await page.locator(".profile-story-panel").getAttribute("aria-label"),
        "Introduction 2 of 4",
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      await page.screenshot({
        path: `audit/screenshots/effects-cards-${width}-${theme}.png`,
      });
    }
  }
  report.checks.push(
    "Card navigation and layout remain usable at mobile/desktop widths in both themes",
  );
  await page.waitForTimeout(950);
  const portrait = page.locator(".profile-card-art .fighter-sprite");
  await page.waitForFunction(
    () =>
      document.querySelector(".profile-card-art .fighter-sprite").dataset
        .moving === "true",
  );
  const spriteFrame = () =>
    portrait.locator("img").evaluate((el) => getComputedStyle(el).transform);
  const idleFrame = await spriteFrame();
  await page.waitForTimeout(210);
  assert.notEqual(
    await spriteFrame(),
    idleFrame,
    "Visible card idle frames must advance",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(
    () =>
      document.querySelector(".profile-card-art .fighter-sprite").dataset
        .moving === "false",
  );
  await page
    .getByRole("button", { name: "Play this character’s sword move" })
    .click();
  assert(
    (await portrait.locator("img").getAttribute("src")).includes("attack1"),
  );
  const attackFrame = await spriteFrame();
  await page.waitForTimeout(200);
  assert.notEqual(
    await spriteFrame(),
    attackFrame,
    "Explicit quiet-mode click must play a short attack",
  );
  await page.waitForFunction(
    () =>
      document.querySelector(".profile-card-art").dataset.reaction === "false",
  );
  assert.equal(await portrait.getAttribute("data-moving"), "false");
  await page.locator(".profile-topic").last().click();
  assert.equal(
    await page
      .getByRole("link", { name: "Bring your idea" })
      .getAttribute("href"),
    "/contact/",
  );
  assert(
    await page
      .locator(".profile-story-panel h3")
      .evaluate((el) => parseFloat(getComputedStyle(el).fontSize) >= 30),
  );
  report.checks.push(
    "Copy is larger than the supporting sprite; visible idle frames advance, quiet-mode clicks play one short sourced attack, and the final card leads directly to the enquiry",
  );
  await page.close();
  report.passed = report.errors.length === 0;
} catch (e) {
  report.errors.push(e.stack);
  report.passed = false;
} finally {
  await browser.close();
  await fs.writeFile(
    "audit/stage-effects-results.json",
    JSON.stringify(report, null, 2),
  );
}
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
