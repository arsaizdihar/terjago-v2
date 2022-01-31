import { NextMiddleware, NextResponse } from "next/server";

export const middleware: NextMiddleware = async (req, ev) => {
  const session = req.cookies["next-auth.session-token"];
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  if (!session) {
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};
