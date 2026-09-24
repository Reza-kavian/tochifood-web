// src/app/api/auth/google/mobile/route.ts  //zare_nk_050701_okk(1)
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = "https://testotm.sarinmehr.com/api/auth/google";  ////zare_nk_050701_nokteh(darvaghe manzoor haman masire /redirect-mobile dar hamin projeh hast ke 
  //// testotm.sarinmehr.com ham addrese in projeh dar abrarvan hast(felen dar in addresse testiye testotm enteshar dadim) ke badan ba name doroste masallan tochifood.com 
  //// enteshar midim va in const url ham be name jadid virayesh mishe )
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
