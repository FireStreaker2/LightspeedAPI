const puppeteer = require("puppeteer");

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto("https://firestreaker2.gq");

	const data = await page.evaluate(() => {
		const element = document.getElementById("pfp");

    return element ? element.innerHTML : null;
	});

	await browser.close();

	console.log(data ? data : "n/a");
})();
