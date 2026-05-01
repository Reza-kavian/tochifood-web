// src\app\api\auth\google  //zare_nk_050210  _okk
import { NextResponse } from "next/server";
import { google } from "googleapis";
import { cookies } from "next/headers"; 

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function GET(req: Request) {
////zare_nk_041112_nokteh_st
// req chon az Request import shod faghede req.cookies va req.nextUrl hast chon inha dar req: NextRequest hastand, darvaghe NextRequest az 
// Request ersbari mikoneh va hameye methodhash ro dare mesle req.url va req.method va req.headers vali emkanate bishtari behesh ezafeh shodeh
// mesle req.cookies va req.nextUrl ke dar Request nist(Request male JavaScript hast va marboot be datahaye API fetch hast vali NextRequest az 
// next/server import mishe ke emkanate mokhtasse nextJs hast va emkanate ezafi dareh)
////zare_nk_041112_nokteh_end

  // ✅ خواندن کوکی‌ها (تشخیص موبایل یا وب)
  const cookieStore = await cookies();
  const source =
    cookieStore.get("oauth_source")?.value === "mobile"
      ? "mobile"
      : "web";
  // 🔐 یک‌بار مصرف
  cookieStore.delete("oauth_source");

  const oauthState = crypto.randomUUID();
  const oauthStateObj = { state: oauthState, source: source };
  const oauthStateStr = Buffer.from(JSON.stringify(oauthStateObj)).toString("base64");

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["profile", "email"],  //zare_nk_041011_nokteh(yani man az hesabe googgle daghighan be che ettelaati dastresi mikham?)
    // state: source,     //zare_nk_041002_commented
    state: oauthStateStr,  //zare_nk_041002_added
  });

  console.log("040603-authUrl:", authUrl);   //zare_nk_040519_nokteh-in bakhsh be dorosti dar https://testotm.sarinmehr.com/api/auth/callback/google sakhte mishe
  //authUrl: https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=profile%20email&response_type=code&client_id=733109327570-t2qo3siffjpe5f23kud6inul4n2k4p00.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Ftestotm.sarinmehr.com%2Fapi%2Fauth%2Fcallback%2Fgoogle

  const res = NextResponse.redirect(authUrl);
  res.cookies.set("oauth_state", oauthStateStr, {
    // httpOnly: true,  //zare_nk_041106_commented
    httpOnly: false,  //zare_nk_041106_added
    secure: true,
    sameSite: "lax",
    maxAge: 5 * 60, // ۵ دقیقه
    path: "/",
  });

  return res;
}
