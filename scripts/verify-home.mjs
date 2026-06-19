import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "file:///C:/Users/MASTER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/playwright@1.60.0/node_modules/playwright/index.mjs";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const artifacts = join(root, "artifacts");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url || "/", "http://127.0.0.1");
    const pathname = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
    const candidate = normalize(join(root, decodeURIComponent(pathname)));

    if (!candidate.startsWith(root) || !existsSync(candidate)) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, { "content-type": contentTypes[extname(candidate)] || "application/octet-stream" });
    response.end(await readFile(candidate));
  } catch (error) {
    response.writeHead(500);
    response.end(String(error));
  }
});

await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
await mkdir(artifacts, { recursive: true });

const { port } = server.address();
const url = `http://127.0.0.1:${port}/`;
const browserPaths = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];
const executablePath = browserPaths.find((candidate) => existsSync(candidate));
const browser = await chromium.launch({ headless: true, executablePath });

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  await desktop.goto(url, { waitUntil: "networkidle" });

  const desktopChecks = await desktop.evaluate(() => ({
    h1Count: document.querySelectorAll("h1").length,
    hasSearch: Boolean(document.querySelector("#site-search")),
    hasJsonLd: Boolean(document.querySelector('script[type="application/ld+json"]')),
    scrollOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    productCards: document.querySelectorAll(".product-card").length,
  }));

  await desktop.fill("#site-search", "chat");
  await desktop.waitForSelector("#search-suggestions:not([hidden])");
  const suggestions = await desktop.locator(".suggestion").count();
  await desktop.keyboard.press("Escape");
  await desktop.locator("[data-mega-trigger]").first().hover();
  await desktop.waitForTimeout(180);
  const megaState = await desktop.locator("#mega-0").evaluate((node) => {
    const style = getComputedStyle(node);
    const trigger = document.querySelector('[aria-controls="mega-0"]');
    return {
      visible: style.visibility === "visible" && style.opacity !== "0",
      visibility: style.visibility,
      opacity: style.opacity,
      ariaHidden: node.getAttribute("aria-hidden"),
      className: node.className,
      triggerExpanded: trigger?.getAttribute("aria-expanded"),
      itemOpen: trigger?.closest(".nav-item")?.getAttribute("data-open"),
      display: style.display,
    };
  });
  const megaVisible = megaState.visible;
  const hasMedicineEntry = await desktop.locator('.secondary-nav a[href="/medicaments-veterinaires/"]').count();
  await desktop.locator("[data-add-cart]").first().click();
  const cartCount = await desktop.locator("[data-cart-count]").innerText();
  await desktop.screenshot({ path: join(artifacts, "home-desktop.png"), fullPage: true });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 980 }, isMobile: true });
  await mobile.goto(url, { waitUntil: "networkidle" });
  await mobile.locator("[data-menu-button]").click();
  const mobileChecks = await mobile.evaluate(() => ({
    menuOpen: !document.querySelector("[data-mobile-menu]")?.hidden,
    bottomNavVisible: getComputedStyle(document.querySelector(".bottom-nav")).display !== "none",
    scrollOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));
  await mobile.screenshot({ path: join(artifacts, "home-mobile.png"), fullPage: true });

  const result = {
    url,
    desktop: { ...desktopChecks, suggestions, cartCount, megaVisible, megaState, hasMedicineEntry },
    mobile: mobileChecks,
    screenshots: ["artifacts/home-desktop.png", "artifacts/home-mobile.png"],
  };

  if (desktopChecks.h1Count !== 1) throw new Error(`Expected 1 h1, got ${desktopChecks.h1Count}`);
  if (!desktopChecks.hasSearch) throw new Error("Search input missing");
  if (!desktopChecks.hasJsonLd) throw new Error("JSON-LD missing");
  if (desktopChecks.productCards < 12) throw new Error("Expected at least 12 product cards");
  if (suggestions < 1) throw new Error("Search suggestions not rendered");
  if (!megaVisible) throw new Error(`Mega menu did not open on hover: ${JSON.stringify(megaState)}`);
  if (hasMedicineEntry !== 1) throw new Error("Medicine menu entry missing");
  if (cartCount !== "1") throw new Error(`Cart count expected 1, got ${cartCount}`);
  if (!mobileChecks.menuOpen) throw new Error("Mobile menu did not open");
  if (!mobileChecks.bottomNavVisible) throw new Error("Bottom navigation is not visible on mobile");
  if (desktopChecks.scrollOverflow > 2) throw new Error(`Desktop horizontal overflow: ${desktopChecks.scrollOverflow}`);
  if (mobileChecks.scrollOverflow > 2) throw new Error(`Mobile horizontal overflow: ${mobileChecks.scrollOverflow}`);

  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
  server.close();
}
