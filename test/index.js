import puppeteer from "puppeteer";
import { startServer } from "../server/index.js";

(async () => {
  const browser = await puppeteer.launch();
  const server = startServer();

  try {
    const page = await browser.newPage();
    await page.goto("http://localhost:5000");

    const innerText = await page.$eval(".main-header", (e) => e.innerText);

    if (innerText !== "Click the button for a Chuck fact!") {
      throw new Error("Failed: .main-header innerText mismatch.");
    }
    console.log("\nAll good :)\n");
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
    server.close();
  }
})();
