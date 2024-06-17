import puppeteer from "puppeteer";
import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import nodemailer from "nodemailer";

export const POST = async (req: Request) => {
	let browser;
	try {
		const { htmlArray, email } = await req.json();
		browser = await puppeteer.launch({
			headless: true,
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		});
		const page = await browser.newPage();

		const pdfBuffers = [];

		for (const html of htmlArray) {
			await page.setContent(html);
			const pdfBuffer = await page.pdf({
				format: "A4",
				margin: {
					top: "20px",
					bottom: "20px",
					left: "40px",
					right: "40px",
				},
				printBackground: true,
			});
			pdfBuffers.push(pdfBuffer);
		}

		const mergedPdf = await PDFDocument.create();
		for (const pdfBuffer of pdfBuffers) {
			const pdf = await PDFDocument.load(pdfBuffer);
			const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
			copiedPages.forEach((page) => {
				mergedPdf.addPage(page);
			});
		}

		const finalPdfBuffer = await mergedPdf.save();
		console.log("pdf created", finalPdfBuffer);
		const transporter = nodemailer.createTransport({
			host: "smtp.office365.com",
			port: 587,
			secure: false,
			auth: {
				user: process.env.USER_EMAIL,
				pass: process.env.PASS,
			},
		});

		await transporter.sendMail({
			from: '"full stack" fullstackdeveloper1999@outlook.com',
			to: email,
			subject: "Here is your report",
			text: "",
			attachments: [
				{
					filename: "report.pdf",
					content: finalPdfBuffer,
					contentType: "application/pdf",
				},
			],
		});
		return new NextResponse(
			JSON.stringify({ message: "Email sent Successfully" }),
		);
	} catch (err) {
		console.error(err);
		return new NextResponse(
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 },
		);
	} finally {
		if (browser) {
			console.log("browser closed");
			await browser.close();
		}
	}
};
