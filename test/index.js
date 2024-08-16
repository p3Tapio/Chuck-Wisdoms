import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto("http://localhost:5000");
    const innerText = await page.$eval(".main-header", (e) => e.innerText);

    if (innerText !== "Hello Bucket!") {
      throw new Error("Failed: innerText mismatch.");
    }
  } catch (e) {
    console.error(e);
  } finally {
    console.log("\nAll good :)\n");
    await browser.close();
  }
})();
