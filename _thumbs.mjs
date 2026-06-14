import { chromium } from "playwright";

const OUT = "F:/Santi Pulse/Santi Pulse/Brain Website/demo-media";
const SITES = [
  ["elevate-barbershop", "https://elevate-barbershop.vercel.app"],
  ["lara-collection", "https://lara-collection.vercel.app"],
  ["tenerife-tourist", "https://tenerife-tourist.vercel.app"],
  ["megasur", "https://megasur-tenerife-react.vercel.app"],
];

const browser = await chromium.launch();
for (const [name, url] of SITES) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.addInitScript(() => {
    try { localStorage.setItem("lara-loaded-at", String(Date.now())); } catch {}
  });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(4500);
  await page.screenshot({ path: `${OUT}/${name}.jpg`, type: "jpeg", quality: 80 });
  console.log("shot", name);
  await page.close();
}
await browser.close();
console.log("done");
