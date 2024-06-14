import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export const POST = async (req: Request) => {
  try {
    const { html } = await req.json();
    console.log(html);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close();

    console.log(pdfBuffer);
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
