const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(express.json());

app.post('/screenshot', async (req, res) => {
	const ID = (new Date()).getTime().toString(36);
	const path = "./public/screenshots/" + ID + '.png';

	const browser = await puppeteer.launch({
		defaultViewport: {
			width: 1920,
			height: 1080
		},
		ignoreDefaultArgs: ['--disable-extensions']
	});

	const page = await browser.newPage();
	await page.goto(req.body.url);

	// Take a screenshot
	await page.screenshot({ path: path });

	await browser.close();

	res.json({
		success: true,
		ID
	});
});

app.listen(5000, () => {
	console.log("Server started on port 5000");
});