import puppeteer from "puppeteer";
import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import nodemailer from "nodemailer";
import { join } from "path";
import { promises as fs } from "fs";

export const POST = async (req: Request) => {
	try {
		const { email } = await req.json();
		// Create a Nodemailer transporter using SMTP
		const transporter = nodemailer.createTransport({
			host: "smtp.office365.com", // Replace with your SMTP host
			port: 587, // Replace with your SMTP port
			secure: false, // true for 465, false for other ports
			auth: {
				user: "fullstackdeveloper1999@outlook.com", // Replace with your SMTP username
				pass: "Kakakafze@1", // Replace with your SMTP password
			},
		});

		// Send email with PDF attachment
		await transporter.sendMail({
			from: '"full stack" fullstackdeveloper1999@outlook.com', // Sender address
			to: email, // List of recipients
			subject: "Here is your report", // Subject line
			text: "Please find the attached report.", // Plain text body
			attachments: [
				{
					filename: "report.pdf",
					content: "",
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
	}
};
