import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
import assert from "node:assert/strict";
const origin = process.env.PORTFOLIO_URL || "http://127.0.0.1:4173";
const routes = [
  "/",
  "/about/",
  "/contact/",
  "/work/escape-tsunami/",
  "/work/combat-system/",
  "/work/inventory-data/",
  "/work/rounds-bosses/",
  "/work/flagship/",
  "/privacy/",
  "/terms/",
  "/cookies/",
  "/refunds/",
  "/accessibility/",
];
const drafts = routes.filter(
  (route) => route.startsWith("/work/") && route !== "/work/escape-tsunami/",
);
const report = {
  pages: [],
  interactions: [],
  errors: [],
  externalRequests: [],
  links: [],
};
await fs.mkdir("audit/screenshots", { recursive: true });
const browser = await chromium.launch();
try {
  const links = new Set();
  for (const [device, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
  ]) {
    for (const theme of ["night", "day"]) {
      const context = await browser.newContext({
        viewport: { width, height },
        reducedMotion: "reduce",
        permissions: ["clipboard-read", "clipboard-write"],
      });
      const page = await context.newPage();
      page.on("pageerror", (error) => report.errors.push(String(error)));
      page.on("request", (request) => {
        if (
          /^https?:/.test(request.url()) &&
          !request.url().startsWith(origin) &&
          !(
            request.url() === "https://formspree.io/f/xgvkvoav" &&
            request.method() === "POST"
          )
        )
          report.externalRequests.push(request.url());
      });
      for (const route of routes) {
        const response = await page.goto(origin + route, {
          waitUntil: "networkidle",
        });
        assert.equal(response.status(), 200, route);
        if (theme === "day") {
          await page
            .getByRole("button", { name: "Switch to day mode" })
            .click();
          await page.waitForFunction(
            () => document.documentElement.dataset.theme === "day",
          );
        }
        if (route === "/about/")
          await page.locator(".credentials-disclosure > summary").click();
        for (const image of await page.locator("img").all()) {
          if (!(await image.isVisible())) continue;
          await image.scrollIntoViewIfNeeded();
          await image.evaluate((image) => image.decode().catch(() => {}));
        }
        await page.evaluate(() => scrollTo(0, 0));
        const violations = (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
            .analyze()
        ).violations.map((item) => ({
          id: item.id,
          nodes: item.nodes.map((node) => ({
            target: node.target,
            summary: node.failureSummary,
          })),
        }));
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 1,
        );
        const brokenImages = await page
          .locator("img")
          .evaluateAll((images) =>
            images
              .filter((image) => image.getClientRects().length > 0 && !image.naturalWidth)
              .map((image) => image.src),
          );
        const storage = await page.evaluate(() => ({
          local: localStorage.length,
          session: sessionStorage.length,
        }));
        assert.equal(await page.locator("h1").count(), 1, route);
        assert(
          (await page.locator("h1,h2,h3").allTextContents()).every(
            (text) => !text.trim().endsWith("."),
          ),
          "Heading punctuation",
        );
        assert(
          (await page.locator('link[rel="canonical"]').getAttribute("href")) ===
            "https://asadlilla.me" + route,
          "Canonical " + route,
        );
        assert.equal((await context.cookies()).length, 0);
        assert.equal(storage.local + storage.session, 0);
        if (drafts.includes(route))
          assert(
            (
              await page.locator('meta[name="robots"]').getAttribute("content")
            ).includes("noindex"),
          );
        for (const href of await page
          .locator("a[href]")
          .evaluateAll((anchors) =>
            anchors.map((anchor) => anchor.getAttribute("href")),
          )) {
          if (href.startsWith("/") || href.startsWith("#"))
            links.add(new URL(href, origin + route).href);
        }
        report.pages.push({
          route,
          device,
          theme,
          overflow,
          brokenImages,
          violations,
        });
        if (
          ["/", "/contact/", "/about/", "/work/escape-tsunami/"].includes(route)
        ) {
          const name =
            route === "/" ? "home" : route.split("/").filter(Boolean).at(-1);
          await page.screenshot({
            path: `audit/screenshots/${device}-${theme}-${name}.png`,
            fullPage: true,
          });
          if (route === "/")
            await page.screenshot({
              path: `audit/screenshots/${device}-${theme}-hero.png`,
            });
        }
      }
      console.log(`${device} ${theme}: ${routes.length} routes checked`);
      await page.goto(origin, { waitUntil: "networkidle" });
      await page.keyboard.press("Tab");
      assert.equal(
        await page.locator(":focus").textContent(),
        "Skip to main content",
      );
      await page.keyboard.press("Enter");
      assert.equal(
        await page.locator(":focus").getAttribute("id"),
        "main-content",
      );
      for (const draft of drafts)
        assert.equal(await page.locator(`a[href="${draft}"]`).count(), 0);
      const faq = page.locator(".faq-list details").first();
      await faq.locator("summary").focus();
      await page.keyboard.press("Enter");
      assert((await faq.getAttribute("open")) !== null);
      if (device === "mobile") {
        const menu = page.getByRole("button", { name: "Open navigation menu" });
        await menu.focus();
        await page.keyboard.press("Enter");
        await page
          .getByRole("navigation", { name: "Mobile navigation" })
          .waitFor({ state: "visible" });
        await page.keyboard.press("Escape");
        assert.equal(await menu.getAttribute("aria-expanded"), "false");
        assert(await menu.evaluate((el) => el === document.activeElement));
      }
      await page.getByRole("button", { name: "Switch to day mode" }).click();
      await page
        .getByRole("navigation", { name: "Policies" })
        .getByRole("link", { name: "Privacy", exact: true })
        .click();
      await page
        .getByRole("heading", { name: "Privacy Policy", exact: true })
        .waitFor();
      assert.equal(
        await page.locator("html").getAttribute("data-theme"),
        "day",
        "Theme survives internal navigation",
      );
      await page.goto(origin + "/about/", { waitUntil: "networkidle" });
      if (theme === "day")
        await page.getByRole("button", { name: "Switch to day mode" }).click();
      await page.locator(".credentials-disclosure > summary").click();
      const certificate = page.locator(".certificate-card").first();
      await certificate.focus();
      await page.keyboard.press("Enter");
      const dialog = page.getByRole("dialog");
      await dialog.waitFor({ state: "visible" });
      const dialogAudit = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      report.pages.push({
        route: "certificate dialog",
        device,
        theme,
        violations: dialogAudit.violations.map((item) => ({
          id: item.id,
          nodes: item.nodes.map((node) => ({
            target: node.target,
            summary: node.failureSummary,
          })),
        })),
      });
      await page.keyboard.press("Tab");
      assert(
        await page.evaluate(
          () =>
            document.activeElement === document.body ||
            !!document.activeElement.closest("dialog"),
        ),
      );
      await page.keyboard.press("Escape");
      await dialog.waitFor({ state: "hidden" });
      assert(await certificate.evaluate((el) => el === document.activeElement));
      report.interactions.push(
        `${device} ${theme}: skip link, FAQ, menu Escape, theme navigation, certificate focus trap and return`,
      );
      await page.route("https://formspree.io/f/xgvkvoav", (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: '{"ok":true}',
        }),
      );
      await page.goto(origin + "/contact/?service=data", {
        waitUntil: "networkidle",
      });
      await page
        .getByRole("heading", { name: "Give it a direction" })
        .waitFor();
      await page.getByRole("button", { name: "Add the details" }).click();
      await page.getByRole("button", { name: "Send enquiry" }).click();
      await page.waitForFunction(
        () => document.activeElement?.id === "quest-details",
      );
      await page
        .getByLabel("Your idea (required)")
        .fill(
          "Players equip inventory items and the server validates each action.",
        );
      await page
        .getByLabel("Where should I reply? (required)")
        .fill("test@example.com");
      await page.getByRole("button", { name: "Send enquiry" }).click();
      await page.waitForFunction(
        () => document.activeElement?.id === "quest-consent",
      );
      await page.locator("#quest-consent").check();
      await page.getByRole("button", { name: "Send enquiry" }).click();
      await page
        .getByRole("heading", { name: "Your brief is on its way" })
        .waitFor();
      await page.reload({ waitUntil: "networkidle" });
      await page.getByRole("button", { name: "Add the details" }).click();
      assert.equal(
        await page.getByLabel("Your idea (required)").inputValue(),
        "",
      );
      assert(!(await page.locator("#quest-consent").isChecked()));
      report.interactions.push(
        `${device} ${theme}: preselection, three-step enquiry, required fields, consent, mocked Formspree acknowledgement, reload clears entries`,
      );
      await context.close();
    }
  }
  for (const url of links) {
    const response = await fetch(url);
    assert.equal(response.status, 200, url);
    const target = new URL(url);
    if (target.hash) {
      const html = await response.text();
      assert(
        html.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`),
        url,
      );
    }
  }
  report.links = [...links];
  const sitemap = await (await fetch(origin + "/sitemap.xml")).text();
  for (const route of drafts)
    assert(!sitemap.includes(route), "Draft excluded from sitemap");
  for (const width of [320, 768, 1024]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    for (const route of [
      "/",
      "/contact/",
      "/about/",
      "/work/escape-tsunami/",
    ]) {
      await page.goto(origin + route, { waitUntil: "networkidle" });
      assert(
        !(await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 1,
        )),
        `${width}px overflow: ${route}`,
      );
    }
    await page.close();
    report.interactions.push(`${width}px: home/contact/about/case reflow`);
  }
  const nojs = await browser.newPage({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  await nojs.goto(origin + "/contact/");
  assert(
    await nojs
      .getByRole("link", { name: "Join the server", exact: true })
      .isVisible(),
  );
  assert(!(await nojs.locator(".contact-quest").isVisible()));
  await nojs.goto(origin + "/about/");
  assert(await nojs.locator("noscript a").first().isVisible());
  report.interactions.push(
    "No JavaScript: contact routes and certificate source links remain accessible",
  );
  const missing = await browser.newPage();
  assert.equal(
    (await missing.goto(origin + "/this-page-does-not-exist/")).status(),
    404,
  );
  assert(
    await missing
      .getByRole("heading", { name: "This page isn’t here" })
      .isVisible(),
  );
  report.passed =
    report.pages.every(
      (item) =>
        !item.overflow && !item.brokenImages?.length && !item.violations.length,
    ) &&
    !report.errors.length &&
    !report.externalRequests.length;
} catch (error) {
  report.errors.push(String(error));
  report.passed = false;
} finally {
  await fs.writeFile(
    "audit/commission-browser-results.json",
    JSON.stringify(report, null, 2),
  );
  await browser.close();
}
console.log(
  JSON.stringify(
    {
      passed: report.passed,
      pages: report.pages.length,
      links: report.links.length,
      interactionGroups: report.interactions.length,
      errors: report.errors,
      externalRequests: report.externalRequests,
      violations: report.pages.filter(
        (item) =>
          item.violations.length || item.overflow || item.brokenImages?.length,
      ),
    },
    null,
    2,
  ),
);
if (!report.passed) process.exitCode = 1;
