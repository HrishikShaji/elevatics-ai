import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const { report, reportType, name } = await req.json();
  console.log(report, reportType, name);
  if (!session || !session.user || !session.user.email) {
    return new Response(JSON.stringify({ message: "Not authenticated" }));
  }
  try {
    await prisma.report.create({
      data: {
        userEmail: session.user.email,
        data: report,
        reportType: reportType,
        name: name,
      },
    });
    return new NextResponse(JSON.stringify({ message: "success" }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
    );
  }
};
