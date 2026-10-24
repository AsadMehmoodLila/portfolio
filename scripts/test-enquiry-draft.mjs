import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const browser = await chromium.launch();
const origin = process.env.PORTFOLIO_URL || "http://127.0.0.1:4173";
const key = "scriptlilla-enquiry-draft-v1";
const report = { checks: [], errors: [] };
const details =
  "Draft regression check: inventory equipment, server checks and mobile controls";
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    page.on("pageerror", (error) => report.errors.push(String(error)));
    let posts = 0;
    await page.route("https://formspree.io/f/xgvkvoav", (route) => {
      posts++;
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: '{"ok":true}',
      });
    });
    await page.goto(origin + "/contact/?service=data", {
      waitUntil: "networkidle",
    });
    await page.getByRole("radio", { name: "$300–750", exact: true }).check();
    await page.getByRole("radio", { name: "This month", exact: true }).check();
    await page.getByRole("button", { name: "Add the details" }).click();
    await page.locator("#quest-details").fill(details);
    await page.locator("#quest-email").fill("draft-test@example.com");
    await page.locator("#quest-consent").check();
    await page
      .locator(".form-consent")
      .getByRole("link", { name: "Privacy Policy" })
      .click();
    await page.waitForURL("**/privacy/");
    await page.goBack();
    await page.locator("#quest-details").waitFor();
    assert.equal(await page.locator("#quest-details").inputValue(), details);
    assert.equal(
      await page.locator("#quest-email").inputValue(),
      "draft-test@example.com",
    );
    assert(
      (await page.locator(".quest-recap").textContent()).includes("$300–750"),
    );
    assert(
      (await page.locator(".quest-recap").textContent()).includes("This month"),
    );
    assert.equal(await page.locator("#quest-consent").isChecked(), false);
    const stored = await page.evaluate(
      (k) => JSON.parse(sessionStorage.getItem(k)),
      key,
    );
    assert.equal("consent" in stored, false);
    assert.equal(posts, 0);
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await page.locator("#quest-details").inputValue(), details);
    await page.getByRole("link", { name: "Privacy", exact: true }).click();
    await page.waitForURL("**/privacy/");
    await page.goBack();
    await page.locator("#quest-email").waitFor();
    assert.equal(
      await page.locator("#quest-email").inputValue(),
      "draft-test@example.com",
    );
    await page.locator("#quest-consent").check();
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await page
      .getByRole("heading", { name: "Your brief is on its way" })
      .waitFor();
    assert.equal(posts, 1);
    assert.equal(
      await page.evaluate((k) => sessionStorage.getItem(k), key),
      null,
    );
    await page.reload({ waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Add the details" }).click();
    assert.equal(await page.locator("#quest-details").inputValue(), "");
    await page.locator("#quest-details").fill(details);
    await page.getByRole("button", { name: "Clear draft" }).click();
    await page
      .getByRole("heading", { name: "What are we building?" })
      .waitFor();
    assert.equal(
      await page.evaluate((k) => sessionStorage.getItem(k), key),
      null,
    );
    await page.evaluate(
      (k) =>
        sessionStorage.setItem(
          k,
          JSON.stringify({
            version: 1,
            updatedAt: Date.now() - 25 * 60 * 60 * 1000,
            step: 2,
            service: "data",
            budget: "Let’s discuss",
            timing: "Flexible",
            email: "expired@example.com",
            details: "Expired draft",
          }),
        ),
      key,
    );
    await page.goto(origin + "/contact/", { waitUntil: "networkidle" });
    await page
      .getByRole("heading", { name: "What are we building?" })
      .waitFor();
    assert.equal(
      await page.evaluate((k) => sessionStorage.getItem(k), key),
      null,
    );
    report.checks.push(
      `${width}px: privacy link + Back, footer Privacy + Back, selected service/budget/timing/step, reload, fresh consent, no auto-send, clear on acknowledgement/manual clear and expired draft removal`,
    );
    await page.close();
  }
  const blocked = await browser.newPage({ reducedMotion: "reduce" });
  await blocked.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("Storage blocked", "SecurityError");
    };
  });
  await blocked.goto(origin + "/contact/?service=combat", {
    waitUntil: "networkidle",
  });
  await blocked.getByRole("button", { name: "Add the details" }).click();
  await blocked.locator("#quest-details").fill(details);
  await blocked
    .locator(".form-consent")
    .getByRole("link", { name: "Privacy Policy" })
    .click();
  await blocked.waitForURL("**/privacy/");
  await blocked.goBack();
  await blocked.locator("#quest-details").waitFor();
  assert.equal(await blocked.locator("#quest-details").inputValue(), details);
  report.checks.push(
    "Storage-blocked browsers retain the draft during client-side policy navigation using a memory fallback",
  );
  await blocked.close();
  report.passed = report.errors.length === 0;
} catch (error) {
  report.errors.push(error.stack);
  report.passed = false;
} finally {
  await browser.close();
  await fs.writeFile(
    "audit/enquiry-draft-results.json",
    JSON.stringify(report, null, 2),
  );
}
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
