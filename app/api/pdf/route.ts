import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export const POST = async (req) => {
	try {
		const { htmlArray } = await req.json();
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		const pdfBuffers = [];

		for (const html of htmlArray) {
			await page.setContent(html);
			const pdfBuffer = await page.pdf({
				format: "A4",
				margin: {
					top: "40px",
					bottom: "40px",
					left: "40px",
					right: "40px",
				},
				printBackground: true,
			});
			pdfBuffers.push(pdfBuffer);
		}

		await browser.close();

		// Merge PDFs
		const mergedPdf = await PDFDocument.create();
		for (const pdfBuffer of pdfBuffers) {
			const pdf = await PDFDocument.load(pdfBuffer);
			const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
			copiedPages.forEach((page) => {
				mergedPdf.addPage(page);
			});
		}

		const finalPdfBuffer = await mergedPdf.save();
		return new NextResponse(finalPdfBuffer, {
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": "attachment; filename=generated.pdf",
			},
		});
	} catch (err) {
		console.error(err);
		return new NextResponse(
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 }
		);
	}
};

