import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export const POST = async (req: Request) => {
	try {
		const { html } = await req.json();
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.setContent(html);
		const pdfBuffer = await page.pdf({
			format: "A4", margin: {
				top: "40px",
				bottom: '40px',
				left: "40px",
				right: "40px"
			}
		});

		await browser.close();

		return new NextResponse(pdfBuffer, {
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": "attachment; filename=generated.pdf",
			},
		});
	} catch (err) {
		console.log(err);
		return new NextResponse(
			JSON.stringify({ message: "Something went wrong" }),
		);
	}
};
