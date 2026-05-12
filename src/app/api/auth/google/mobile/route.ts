// src/app/api/auth/google/mobile/route.ts  //zare_nk_050220_okk
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = "https://testotm.sarinmehr.com/api/auth/google";
  const res = NextResponse.redirect(url);

  res.cookies.set("oauth_source", "mobile", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 5 * 60,
    path: "/",
  });

  return res;
}
