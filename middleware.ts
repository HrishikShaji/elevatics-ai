import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
	console.log(process.env.NEXTAUTH_SECRET);
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	console.log(token);
	if (!token) {
		return NextResponse.redirect(new URL("/api/auth/signin", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/researcher"],
};
