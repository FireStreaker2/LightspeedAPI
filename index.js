const puppeteer = require("puppeteer");
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
	res.send(
		`<script>window.location.href = "https://github.com/FireStreaker2/LightspeedAPI";</script>`
	);
});

app.get("/search/:domain", (req, res) => {
	const domain = req.params.domain;

	if (domain.includes(".") === false) {
		res.status(500).json({ response: 500 });
		return;
	}

	(async () => {
		const browser = await puppeteer.launch({
			headless: "new",
		});

		const page = await browser.newPage();

		await page.goto("https://archive.lightspeedsystems.com");

		await page.type("#CeleritasInput0", domain);
		await page.click(".CeleritasButton");

		await page.waitForTimeout(1000);

		const result = await page.evaluate(() => {
			if (document.body.innerHTML.includes("Domain not found")) return "error";

			const element = document.querySelector(".table_double");

			let data = element.innerHTML;
			const results = [];
			const elements = [
				"<table>",
				"<thead>",
				"<td>",
				"<th>",
				"<tr>",
				"<tbody>",
				"<span>",
				"<table>",
				"<div>",
				"</table>",
				"</thead>",
				"</td>",
				"</th>",
				"</tr>",
				"</tbody>",
				"</span>",
				"</table>",
				"</div>",
			];

			try {
				for (let i = 1; i <= elements.length; i++) {
					const element = elements[i];
					data = data.replaceAll(element, "");
				}

				results.push(data.match(/<\/p>(.*?)<span c/)[1]);
				results.push(data.match(/Date\/Time(.*?)<span c/)[1]);
				results.push(data.match(/Categorization Reason(.*?)\./)[1]);

				data = data.substring(data.indexOf("Lightspeed Rocket"));

				results.push(data.match(/<\/p>(.*?)<span c/)[1]);
				results.push(data.match(/Date\/Time(.*?)<span c/)[1]);
				results.push(data.match(/Categorization Reason(.*?)\./)[1]);
			} catch (error) {
				res.json({ error: error });
			}

			return results;
		});

		result && result !== "error"
			? res.json({
					filter: { category: result[0], date: result[1], member: result[2] },
					rocket: { category: result[3], date: result[4], member: result[5] },
			  })
			: res.status(500).json({ error: 500 });

		await browser.close();
	})();
});

app.listen(port, () => {
	console.log(`App is running at http://localhost:${port}`);
});
