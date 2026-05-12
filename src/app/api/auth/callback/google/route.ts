//src\app\api\auth\callback\google  //zare_nk_050220_okk
import { NextRequest, NextResponse } from "next/server";  //zare_nk_041013_nokteh(cookies marboot be NextResponse(mesle res.cookies.set("token", "123");) ham khandani va ham neveshtani hastan )
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";  //zare_nk_041013_nokteh(cookies import shodeh az next/headers faghat khandani hast, va marboot be cooki haei ke az samte karbar ba request mian)

function decodeState(stateStr: string) {
  return JSON.parse(
    Buffer.from(stateStr, "base64").toString("utf-8")
  ) as { state: string; source: "web" | "mobile" };
}

function NextResponseRedirect(location: string) {
  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: location,
      "Cache-Control": "no-store",
      Pragma: "no-cache",
    },
  });
}

export async function GET(req: NextRequest) {
  try {
    ////zare_nk_041013_nokteh_st(Params haye tooye url)
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const returnedParamState = searchParams.get("state");  //zare_nk_041106_nokteh(dar masire src\app\api\auth\google dar be khasiate state dar
    // oauth2Client.generateAuthUrl ezafeh kardim ke google hefzesh kard va dar calback bargardoond)
    ////zare_nk_041013_nokteh_end(Params haye tooye url)
    ////zare_nk_041013_nokteh_st(cooki haye zakhireh shodeh)
    const cookieStore = await cookies();
    const cookieStateStr = cookieStore.get("oauth_state")?.value;
    ////zare_nk_041013_nokteh_end(cooki haye zakhireh shodeh)
    if (!cookieStateStr || !returnedParamState) {
      ////zare_nk_041105_added_st
      cookieStore.delete("oauth_state");
      // let { source } = decodeState(cookieStateStr); //zare_nk_041105_commented
      const source: "web" | "mobile" = cookieStateStr  //zare_nk_041105_added
        ? decodeState(cookieStateStr).source
        : "web"; // fallback امن

      if (source === "mobile") {
        const url = new URL("https://testotm.sarinmehr.com/redirect-mobile");
        url.searchParams.set("error", error ?? "google_login_failed");
        url.searchParams.set("verified", "1"); 
        const res = NextResponseRedirect(url.toString());
        res.cookies.delete("token");
        res.cookies.set("google_Invalid_credentials", "yes", {
          httpOnly: false,
        });
        return res;
      }
      ////zare_nk_041105_added_end
 
      const res = NextResponseRedirect("/login");
      res.cookies.delete("token");
      res.cookies.set("google_Invalid_credentials", "yes", {
        httpOnly: false,
      });
      return res;
    }
 
    if (returnedParamState !== cookieStateStr) {
      cookieStore.delete("oauth_state");
      ////zare_nk_041105_added_st
      // let { source } = decodeState(cookieStateStr); //zare_nk_041105_commented
      const source: "web" | "mobile" = cookieStateStr  //zare_nk_041105_added
        ? decodeState(cookieStateStr).source
        : "web"; // fallback امن
      if (source === "mobile") {
        const url = new URL("https://testotm.sarinmehr.com/redirect-mobile");
        url.searchParams.set("error", error ?? "google_login_failed");
        url.searchParams.set("verified", "1"); 
        const res = NextResponseRedirect(url.toString());
        res.cookies.delete("token");
        res.cookies.set("google_Invalid_credentials", "yes", {
          httpOnly: false,
        });
        return res;
      }
      ////zare_nk_041105_added_end
      // return NextResponseRedirect("/login");
      const res = NextResponseRedirect("/login");
      res.cookies.delete("token");
      res.cookies.set("google_Invalid_credentials", "yes", {
        httpOnly: false,
      });
      return res;
    }

    const { source } = decodeState(cookieStateStr);
    console.log("zare_nk_041010-source: " + source);
    cookieStore.delete("oauth_state");
    /* ---------------- Cancel or Error ---------------- */
    if (!code || error) {
      if (source === "mobile") {
        const url = new URL("https://testotm.sarinmehr.com/redirect-mobile");
        url.searchParams.set("error", error ?? "google_login_failed");
        url.searchParams.set("verified", "1"); 
        const res = NextResponseRedirect(url.toString());
        res.cookies.delete("token");
        res.cookies.set("google_Invalid_credentials", "yes", {
          httpOnly: false,
        });
        return res;
      }
      const res = NextResponseRedirect("/login");
      res.cookies.delete("token");
      res.cookies.set("google_Invalid_credentials", "yes", {
        httpOnly: false,
      });
      return res;
    }
    /* ---------------- Exchange Code ---------------- */
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.id_token) { 
      if (source === "mobile") {
        const url = new URL("https://testotm.sarinmehr.com/redirect-mobile");
        url.searchParams.set("error", error ?? "google_login_failed");
        url.searchParams.set("verified", "1");
        const res = NextResponseRedirect(url.toString());
        res.cookies.delete("token");
        res.cookies.set("google_Invalid_credentials", "yes", {
          httpOnly: false,
        });
        return res;
      } 
      const res = NextResponseRedirect("/login");
      res.cookies.delete("token");
      res.cookies.set("google_Invalid_credentials", "yes", {
        httpOnly: false,
      });
      return res;
    }
    /* ---------------- Create JWT ---------------- */
    const decoded = jwt.decode(tokenData.id_token) as JwtPayload;
    const secretKey = Buffer.from(
      process.env.JWT_SECRET_BASE64!,
      "base64"
    ).toString("utf-8");

    const token = jwt.sign(
      {
        IdUser: null,
        email: decoded?.email ?? null,
        user_name: null,
        name: decoded?.name ?? null,
      },
      secretKey,
      { expiresIn: "3h" }
    );

    /* ---------------- Redirect ---------------- */
    let redirectPath = '';  
    if (source === "mobile") {
      const url = new URL("https://testotm.sarinmehr.com/redirect-mobile");
      url.searchParams.set("token", token);
      url.searchParams.set("verified", "1"); 
      redirectPath = url.toString()  
    }
    else {
      redirectPath = "/redirecting";   
    } 
    const res = NextResponseRedirect(redirectPath);
    // تنظیم کوکی برای کاربر
    res.cookies.set("token", token, {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 3, // ۳ ساعت
      ////  sameSite: 'strict',
      sameSite: "none",
      secure: true, //(secure: true bashe cookie faghat be darkhasthaye https ersal mishe,age secure:false bashe cookie be darkhasthaye http ham ersal mishe )
      //zare_nk_040208_nokteh(vaghti az sameSite: 'none' estefadeh mikonim htman bayad secure: true bashe vagarnah shayad moroorgarha cookie ro napaziran va cookie kar nakoneh)
    });
    res.cookies.delete("google_Invalid_credentials");  
    return res;
  } catch (error) {
    console.error("040930-a-04-Callback error:", error);
    return NextResponseRedirect("/login"); 
  }
}