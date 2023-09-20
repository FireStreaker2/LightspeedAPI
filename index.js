const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

app.get("/search/:domain", (req, res) => {
	const domain = req.params.domain;

	if (domain.includes(".") === false) {
		res.status(500).json({ response: 500 });
		return;
	}

	(async () => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		await page.goto("https://archive.lightspeedsystems.com");

		await page.type("#CeleritasInput0", domain);
		await page.click(".CeleritasButton");

		const tableSelector = ".table_double";
		await page.waitForSelector(tableSelector);

		const result = await page.evaluate(() => {
			const element = document.querySelector(".table_double");
			return element.innerHTML;
		});

		result ? res.json({ "response": result }) : res.status(500).json({ "response": "n/a "});

		await browser.close();
	})();
	
});

app.listen(port, () => {
	console.log(`App is running at http://localhost:${port}`);
});
