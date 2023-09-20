const puppeteer = require("puppeteer");

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto("https://archive.lightspeedsystems.com");

	await page.type("#CeleritasInput0", "firestreaker2.gq");
	await page.click(".CeleritasButton");

	const tableSelector = ".table_double";
	await page.waitForSelector(tableSelector);

	const result = await page.evaluate(() => {
		const element = document.querySelector(".table_double");
		return element.innerHTML;
	});

  result ? console.log(result) : console.log("n/a");

	await browser.close();
})();
