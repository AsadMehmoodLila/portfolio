import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const browser = await chromium.launch();
const results = [];
try {
  for (const reduced of [false, true]) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 1,
      reducedMotion: reduced ? "reduce" : "no-preference",
    });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: 40,
      downloadThroughput: (1.5 * 1024 * 1024) / 8,
      uploadThroughput: (750 * 1024) / 8,
    });
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await page.addInitScript(() => {
      window.__vitals = { lcp: 0, cls: 0 };
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          window.__vitals.lcp = entry.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          if (!entry.hadRecentInput) window.__vitals.cls += entry.value;
      }).observe({ type: "layout-shift", buffered: true });
    });
    await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1600);
    const metrics = await page.evaluate(() => ({
      ...window.__vitals,
      fcp: performance.getEntriesByName("first-contentful-paint")[0]?.startTime,
      resources: performance
        .getEntriesByType("resource")
        .map((entry) => ({
          url: new URL(entry.name).pathname,
          bytes: entry.transferSize,
          start: Math.round(entry.startTime),
        })),
    }));
    results.push({
      device:
        "390px, 4x CPU throttle, 1.5Mbps/40ms, local static server without compression",
      reducedMotion: reduced,
      lcpMs: Math.round(metrics.lcp),
      fcpMs: Math.round(metrics.fcp),
      cls: metrics.cls,
      bytes: metrics.resources.reduce((sum, entry) => sum + entry.bytes, 0),
      modelRequested: metrics.resources.some((entry) =>
        entry.url.endsWith(".glb"),
      ),
      resources: metrics.resources,
    });
    await context.close();
  }
} finally {
  await browser.close();
}
await fs.writeFile(
  "audit/performance-results.json",
  JSON.stringify(results, null, 2),
);
console.log(
  JSON.stringify(
    results.map(({ resources, ...rest }) => rest),
    null,
    2,
  ),
);
