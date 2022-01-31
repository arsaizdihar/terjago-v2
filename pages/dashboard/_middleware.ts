import { NextMiddleware, NextResponse } from "next/server";

export const middleware: NextMiddleware = async (req, ev) => {
  const cookieName =
    process.env.NODE_ENV === "development"
      ? "next-auth.session-token"
      : "__Secure-next-auth.session-token";
  const session = req.cookies[cookieName];
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  if (!session) {
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};
