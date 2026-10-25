import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const browser = await chromium.launch();
const origin = process.env.PORTFOLIO_URL || "http://127.0.0.1:4173";
const report = { checks: [], errors: [], layouts: [] };
try {
  for (const width of [320, 390, 1440])
    for (const theme of ["night", "day"]) {
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      page.on("pageerror", (e) => report.errors.push(String(e)));
      const modelRequests = [];
      page.on("request", (r) => {
        if (r.url().endsWith(".glb")) modelRequests.push(r.url());
      });
      await page.addInitScript(() =>
        sessionStorage.setItem(
          "scriptlilla-hero-session-v2",
          '{"seen":7,"nextAt":0}',
        ),
      );
      await page.goto(origin, { waitUntil: "networkidle" });
      await page.waitForFunction(
        () => sessionStorage.getItem("scriptlilla-hero-session-v2") === null,
      );
      if (theme === "day")
        await page.evaluate(() => {
          document.documentElement.dataset.theme = "day";
          document.documentElement.dataset.dayPhase = "warm";
        });
      assert(
        (await page.locator("h1").innerText()).includes("Roblox scripting"),
      );
      assert.equal(
        await page
          .locator(
            ".hero-flyby,.stage-signals,.profile-story,.system-dock,.commission-ticket",
          )
          .count(),
        0,
      );
      const layout = await page.evaluate(() => ({
        width: innerWidth,
        height: document.documentElement.scrollHeight,
        work: Math.round(
          document.querySelector(".work-card-image")?.getBoundingClientRect()
            .top + scrollY,
        ),
        services: Math.round(
          document.querySelector("#services").getBoundingClientRect().top +
            scrollY,
        ),
        overflow: document.documentElement.scrollWidth > innerWidth,
      }));
      assert(
        layout.work < 1100,
        "Real work should appear near the first viewport, not several screens down",
      );
      assert(layout.work < layout.services);
      assert(!layout.overflow);
      assert.equal(modelRequests.length, 0, "No automatic 3D download");
      report.layouts.push({ ...layout, theme });
      await page.locator(".service-scope").first().locator("summary").click();
      assert(
        await page
          .locator(".service-scope")
          .first()
          .evaluate((el) => el.open),
      );
      await page
        .locator(".service")
        .first()
        .getByRole("link", { name: "Discuss Combat & abilities" })
        .click();
      await page
        .getByRole("heading", { name: "Give it a direction" })
        .waitFor();
      assert(
        await page
          .getByRole("link", { name: "Email directly", exact: true })
          .first()
          .isVisible(),
      );
      await page.goto(origin + "/about/", { waitUntil: "networkidle" });
      assert(
        !(await page
          .locator(".credentials-disclosure")
          .evaluate((el) => el.open)),
      );
      await page.locator(".credentials-disclosure > summary").click();
      await page.locator(".certificate-card").first().click();
      await page.getByRole("dialog").waitFor();
      await page.keyboard.press("Escape");
      await page.getByRole("dialog").waitFor({ state: "hidden" });
      assert(
        await page
          .locator(".certificate-card")
          .first()
          .evaluate((el) => el === document.activeElement),
      );
      await page.goto(origin + "/work/escape-tsunami/", {
        waitUntil: "networkidle",
      });
      assert.equal(
        await page.locator("video,iframe").count(),
        0,
        "No fabricated demo or automatic third-party connection",
      );
      assert(
        await page
          .getByRole("link", { name: "Open experience", exact: true })
          .isVisible(),
      );
      await page.locator(".case-references > summary").click();
      assert(
        await page
          .getByText("The cover is the published game's artwork.", {
            exact: false,
          })
          .isVisible(),
      );
      report.checks.push(
        `${width}px ${theme}: work first, readable service scope, prefilled enquiry, direct email, optional certificates with focus return, honest case page and no roaming decorations or automatic 3D`,
      );
      await context.close();
    }
  report.passed = !report.errors.length;
} catch (error) {
  report.errors.push(error.stack);
  report.passed = false;
} finally {
  await browser.close();
  await fs.writeFile(
    "audit/portfolio-readiness-results.json",
    JSON.stringify(report, null, 2),
  );
}
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
