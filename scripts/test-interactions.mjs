import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const origin = "http://127.0.0.1:4173";
const browser = await chromium.launch();
const report = { checks: [], errors: [] };
try {
  for (const width of [1440, 390])
    for (const theme of ["night", "day"]) {
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
        reducedMotion: "reduce",
        colorScheme: "light",
      });
      const page = await context.newPage();
      page.on("pageerror", (error) => report.errors.push(String(error)));
      let posts = [];
      await page.route("https://formspree.io/f/xgvkvoav", async (route) => {
        posts.push(route.request().postDataJSON());
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: '{"ok":true,"next":"/thanks"}',
        });
      });
      await page.goto(origin + "/contact/", { waitUntil: "networkidle" });
      assert.equal(
        await page.locator("html").getAttribute("data-theme"),
        "night",
      );
      if (theme === "day")
        await page.getByRole("button", { name: "Switch to day mode" }).click();
      for (const stage of [0, 1, 2]) {
        if (stage === 1)
          await page
            .getByRole("button", { name: "Combat & abilities", exact: true })
            .click();
        if (stage === 2) {
          await page
            .getByRole("radio", { name: "$100–300", exact: true })
            .check();
          await page.getByRole("button", { name: "Add the details" }).click();
        }
        const violations = (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
            .analyze()
        ).violations;
        assert.equal(violations.length, 0, JSON.stringify(violations));
        assert(
          !(await page.evaluate(
            () => document.documentElement.scrollWidth > innerWidth + 1,
          )),
        );
        await page.screenshot({
          path: `audit/screenshots/quest-${width}-${theme}-${stage}.png`,
          fullPage: true,
        });
      }
      await page.getByRole("button", { name: "Send enquiry" }).click();
      await page.waitForFunction(
        () => document.activeElement?.id === "quest-details",
      );
      assert.equal(posts.length, 0);
      await page
        .getByLabel("Your idea (required)")
        .fill("A combat loop with a guard state and server-checked skills.");
      await page
        .getByLabel("Where should I reply? (required)")
        .fill("test@example.com");
      await page.getByRole("button", { name: "Send enquiry" }).click();
      await page.waitForFunction(
        () => document.activeElement?.id === "quest-consent",
      );
      assert.equal(posts.length, 0);
      await page.locator("#quest-consent").check();
      await page.getByRole("button", { name: "Send enquiry" }).click();
      await page
        .getByRole("heading", { name: "Your brief is on its way" })
        .waitFor();
      assert.equal(posts.length, 1);
      assert.equal(posts[0].email, "test@example.com");
      assert.equal(posts[0].service, "Combat & abilities");
      assert.equal(posts[0].budget_usd, "$100–300");
      await page.goto(origin + "/contact/?service=data", {
        waitUntil: "networkidle",
      });
      await page
        .getByRole("heading", { name: "Give it a direction" })
        .waitFor();
      await page.getByRole("button", { name: "Add the details" }).click();
      await page
        .getByLabel("Your idea (required)")
        .fill("Player inventory with equipment and server validation.");
      await page
        .getByLabel("Where should I reply? (required)")
        .fill("test@example.com");
      await page.locator("#quest-consent").check();
      await page.unroute("https://formspree.io/f/xgvkvoav");
      await page.route("https://formspree.io/f/xgvkvoav", (route) =>
        route.fulfill({
          status: 429,
          contentType: "application/json",
          body: '{"errors":[{"message":"limit"}]}',
        }),
      );
      await page.getByRole("button", { name: "Send enquiry" }).click();
      await page
        .getByRole("alert")
        .filter({ hasText: "limit has been reached" })
        .waitFor();
      assert(
        (await page.getByLabel("Your idea (required)").inputValue()).includes(
          "Player inventory",
        ),
      );
      assert.equal(
        await page
          .getByRole("link", { name: "Discord", exact: true })
          .getAttribute("href"),
        "https://discord.gg/sKfzTnPVn2",
      );
      await page.goto(origin + "/", { waitUntil: "networkidle" });
      const intro = page.locator(".profile-story");
      await intro.scrollIntoViewIfNeeded();
      for (let i = 1; i < 4; i++)
        await intro
          .getByRole("button", { name: "Next card", exact: true })
          .click();
      await intro.getByText("You’ve met the scripter").waitFor();
      await intro
        .getByRole("button", { name: "Previous introduction card" })
        .focus();
      await page.keyboard.press("Home");
      await intro
        .getByRole("heading", { name: "Asad, a.k.a. ScriptLilla" })
        .waitFor();
      const faq = page.locator(".faq-list details").first();
      await faq.locator("summary").focus();
      await page.keyboard.press("Enter");
      assert(await faq.evaluate((el) => el.open));
      assert.equal(
        await faq.evaluate(
          (el) =>
            el
              .getAnimations()
              .filter((animation) =>
                animation.effect
                  .getKeyframes()
                  .some((frame) => Object.hasOwn(frame, "height")),
              ).length,
        ),
        0,
      );
      await page.keyboard.press("Enter");
      assert(!(await faq.evaluate((el) => el.open)));
      await page.getByRole("button", { name: "Switch to day mode" }).click();
      await page.reload({ waitUntil: "networkidle" });
      assert.equal(
        await page.locator("html").getAttribute("data-theme"),
        "night",
      );
      report.checks.push(
        `${width}px ${theme}: three accessible stages, consent, payload, accepted delivery, rate limit recovery, direct Discord, profile controls, reduced-motion FAQ, default night`,
      );
      await context.close();
    }
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto(origin, { waitUntil: "networkidle" });
  const faq = page.locator(".faq-list details").first();
  await faq.locator("summary").click();
  assert(
    (await faq.evaluate(
      (el) =>
        el
          .getAnimations()
          .filter((animation) =>
            animation.effect
              .getKeyframes()
              .some((frame) => Object.hasOwn(frame, "height")),
          ).length,
    )) > 0,
  );
  await page.waitForTimeout(260);
  const open = await faq.boundingBox();
  await faq.locator("summary").click();
  assert(
    (await faq.evaluate(
      (el) =>
        el
          .getAnimations()
          .filter((animation) =>
            animation.effect
              .getKeyframes()
              .some((frame) => Object.hasOwn(frame, "height")),
          ).length,
    )) > 0,
  );
  await page.waitForTimeout(260);
  assert((await faq.boundingBox()).height < open.height);
  assert(!(await faq.evaluate((el) => el.open)));
  await faq.locator("summary").click();
  await page.waitForTimeout(45);
  await faq.locator("summary").click();
  await page.waitForTimeout(260);
  assert(!(await faq.evaluate((el) => el.open)));
  report.checks.push(
    "Mouse FAQ opening, closing and rapid reversal animate correctly",
  );
  await context.close();
  const nojs = await browser.newContext({ javaScriptEnabled: false });
  const np = await nojs.newPage();
  await np.goto(origin + "/contact/");
  assert(
    await np
      .getByRole("link", { name: "Join the server", exact: true })
      .isVisible(),
  );
  await np.goto(origin);
  assert(
    await np
      .getByText("Logic, learning, debugging", { exact: true })
      .isVisible(),
  );
  report.checks.push(
    "No-JavaScript contact and all profile-card content remain available",
  );
  await nojs.close();
  report.passed = !report.errors.length;
} catch (error) {
  report.errors.push(error.stack);
  report.passed = false;
} finally {
  await browser.close();
  await fs.writeFile(
    "audit/interaction-upgrade-results.json",
    JSON.stringify(report, null, 2),
  );
}
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
