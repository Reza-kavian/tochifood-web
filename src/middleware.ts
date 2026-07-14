////zare_nk_050423_okk(2) ////zare_nk_050413(az jose baraye samte karbar estefadeh konam(masalan dar login) age javab mideh(ke api be verifytoken nazanam))
import { NextResponse, NextRequest } from "next/server";
// import jwt from "jsonwebtoken";  //chon middleware.ts dar Edge Runtime ejra mishavad, az majoole crypto poshtibani nemikoneh 
// va az jsonwebtoken nemishe dar middleware.ts estefadeh kard, pas api zadim be verifytoken va dar anja az jsonwebtoken estefade kardim 
// va natijeh ra be middleware.ts pasokh dadim.(albateh be api verifyToken ham nazadim va az jwtVerify estefadeh kardim ke moadele jwt hast)
import { jwtVerify } from "jose"; ////zare_nk_040403_added

const publicPaths = [
  "/about",
  "/folder02",
  "/folder03",
  "/login",
  "/signUp",
  "/_next",
  "/api",
  "/static",
  "/favicon.ico",
  "/tryreact",
  "/tryreact2",  //zare_nk_041113_added
  "/tryreact3",
  "/tryreact5",  //zare_nk_041113_added
  "/.well-known",
  // "/.well-known/appspecific/com.chrome.devtools.json"//zare_nk_040220_commented(/.well-known/ neveshtam ke zirshakhehaye digarash ye vaght seda zadeh shodand ham dar in araye begonjand)
  "/images", //zare_nk_040311_nokteh(age in ro nagzarim tamame akshaye ba src="/images/..." ra barname be onvane masir dar nazar migire)
  "/discountsAndOffers",
  "/games", //zare_nk_040331_added
  "/o/oauth2", //zare_nk_040419_added
  "/redirect-mobile", //zare_nk_040930_added_st_testi
  ////zare_nk_040522_added_st_movaghat(pak kardani)
  // "/ordersHistory",
  // "/shoppingbasket",
  ////zare_nk_040522_added_end_movaghat(pak kardani)
  "/location",  //zare_nk_050108_added(and commented)
  "/onboarding", //zare_nk_050205_added 
];

async function verifyToken(token: string) {
  try {
    const secretKey = Buffer.from(
      process.env.JWT_SECRET_BASE64!,
      "base64"
    ).toString("utf-8");  ////zare_nk_040219_added(baraye adame moshkel dar verify kardane secretKey vaghti az lafze $ estefadeh shod dar mohtavaye secretKey)

    console.log(
      "zare_nk_050205-03-POST called!!-decoded secretKey: " + secretKey
    );

    const SECRET = new TextEncoder().encode(secretKey);
    const { payload } = await jwtVerify(token, SECRET);  //zare_nk_041009_nokteh(jwtVerify lafze payload ra barmigardooneh )
    console.log("zare_nk_050205-04-payload: " + JSON.stringify(payload));
    //zare_nk_041009-04-payload: {"unique_name":"20109","CodeMoshtari":"20109","Mobile":"9351091287",
    // "NameMoshtari":"","nbf":1750759349,"exp":1751364149,"iat":1750759349}
    return payload;
  } catch (error) {
    return null;  ////zare_nk)050413_nokteh(catche marboot be verifytoken ro inja begonjoonam)
  }
}

export async function middleware(request: NextRequest) {
  //  const url = new URL(request.url);
  //  const path = url.searchParams.get("path");
  //  url.searchParams.set("goo",14);
  //  const goo= url.searchParams.get("goo");
  //   const kolli= url.searchParams
  // console.log("zare_nk_040317-fullUrl: " + kolli);

  console.log(
    "zare_nk_050205-00-Middleware called!!-All cookies: " +
    request.headers.get("cookie")
  );

  ////zare_nk_040419_added_st(and commented)
  // const isGoogleOAuth = request.nextUrl.pathname.startsWith("/o/oauth2/");
  // if (isGoogleOAuth) {
  //   console.log("✅ Bypassing middleware for Google OAuth callback.");
  //   return NextResponse.next();
  // }
  ////zare_nk_040419_added_end(and commented)

  ////zare_nk_040520_commented_st(baes mishe vaghti "/tryreact" dar arayeye publicPaths bashe barnameh "/tryreact2" ro ham ejazeye dastresi bedoone login ro bedeh,hatta age "/tryreact2" dar araye nabashe!)
  // const isPublic = publicPaths.some((path) => {
  //   return request.nextUrl.pathname.startsWith(path);  //yani ba /tryreact shoroo beshe, masalan /tryreact23244(vali in nadoroste chon masire /tryreact23244 dar araye nist va mikham bedoone login toosh narim vali barname jelogiri nemikone!)
  // });
  ////zare_nk_040520_commented_end
  ////zare_nk_040520_added_st
  const isPublic = publicPaths.some((path) => {
    ////zare_nk_040520_rahe1_st(pichidehtare va faghat baraye masirhaye pichide tosiye mishe)
    // const escapedPath = path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // const regex = new RegExp(`^${escapedPath}(?:/.*)?$`);
    // return regex.test(request.nextUrl.pathname);
    ////zare_nk_040520_rahe1_end(pichidehtare va faghat baraye masirhaye pichide tosiye mishe)
    ////zare_nk_040520_rahe2_st(sadehtare va baraye masirhaye sade mesle projeye man tosiye mishe)
    return (
      request.nextUrl.pathname === path ||  ////yani daghighan khode /tryreact
      request.nextUrl.pathname.startsWith(path + "/") ////yani zir majmooe haye /tryreact, masalan /tryreact/...
    );
  });
  ////zare_nk_040520_rahe2_end(sadehtare va baraye masirhaye sade mesle projeye man tosiye mishe)
  ////zare_nk_040520_added_end

  // if (isPublic || request.nextUrl.pathname == "/") {  //zare_nk_050205_commented
  if (isPublic) {
    ////zare_nk_050205_added
    const response = NextResponse.next();
    const fullUrl = request.nextUrl.href;
    const pathname = request.nextUrl.pathname;
    // ست کردن header برای استفاده در layout
    response.headers.set("x-url", fullUrl);
    response.headers.set("x-pathname", pathname);
    console.log("zare_nk_050205-fullUrl001: " + fullUrl);
    return response;
  }
  console.log("zare_nk_050205 from:", request.nextUrl.pathname);

  const token = request.cookies.get("token")?.value;  //zare_nk_050111_commented_movaghat
  console.log("zare_nk_050205-Cookies in middleware:", request.cookies);
  // console.log("zare_nk_050108-Token from cookie:", token);
  ////zare_nk_050111_added_movaghat_st
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwMTA5IiwiQ29kZU1vc2h0YXJpIjoiMjAxMDkiLCJNb2JpbGUiOiI5MzUxMDkxMjg3IiwiTmFtZU1vc2h0YXJpIjoiIiwibmJmIjoxNzQ2NzI1OTI4LCJleHAiOjE3NDczMzA3MjgsImlhdCI6MTc0NjcyNTkyOH0.9Jfv71v3D_s13gSyf3gXqgEfiXaV-lx93hDey4DSLM8";
  ////zare_nk_050111_added_movaghat_ثدی
  if (token) {
    console.log("zare_nk_050205-01-taghiir-tempTest-inja 004-token daaarim1");
    try {
      console.log("zare_nk_050205-02-taghiir-tempTest-inja 004-token daaarim2");
      console.log(
        "zare_nk_050205-02-taghiir-tempTest-inja 004-token daaarim2.01"
      );
      ////zare_nk_040403_added_st
      const validPayload = await verifyToken(token);

      console.log(
        "zare_nk_050205-04-validPayload is: " + JSON.stringify(validPayload)
      );

      if (!validPayload) {
        var ishomePage: boolean = request.nextUrl.pathname == "/" ? true : false;  //zare_nk_050205_added

        // const response = NextResponse.redirect(new URL("/login", request.url));   //zare_nk_050205_commented
        const response = ishomePage ? NextResponse.redirect(new URL("/onboarding", request.url)) :
          NextResponse.redirect(new URL("/login", request.url));  //zare_nk_050205_added

        const isValidRedirectPath = !publicPaths.some((path) =>
          request.nextUrl.pathname.startsWith(path)
        );
        // if (isValidRedirectPath) {  ////zare_nk_050205_commented
        if (isValidRedirectPath || ishomePage) {  ////zare_nk_050205_added
          response.cookies.set("redirect", request.nextUrl.pathname, {
            path: "/",
            httpOnly: false,
          });
        }
        var tempTest = response.cookies.get("redirect")?.value;
        console.log("zare_nk_050205-taghiir-tempTest: " + tempTest);
        console.log(
          "zare_nk_050205-response.Cookies(not ok) in middleware:",
          response.cookies.get("token")?.value
        );
        //zare_nk_040228_added_st
        const fullUrl = request.nextUrl.href;
        const pathname = request.nextUrl.pathname;
        // ست کردن header برای استفاده در layout
        response.headers.set("x-url", fullUrl);
        response.headers.set("x-pathname", pathname);
        console.log("zare_nk_050205-fullUrl003: " + fullUrl);
        return response;
      }
      // console.log(
      //   "zare_nk_050205-04-taghiir-decodedToken: " +
      //     JSON.stringify(data.decoded)
      // );
      //zare_nk_040209-taghiir-decodedToken: {"unique_name":"20109","CodeMoshtari":"20109",
      // "Mobile":"9351091287","NameMoshtari":"","nbf":1746772412,"exp":1747377212,"iat":1746772412}

      var unique_name = validPayload?.unique_name;
      console.log("zare_nk_041009-taghiir-unique_name: " + unique_name);

      ////zare_nk_040228_added_st
      const response = NextResponse.next();
      const fullUrl = request.nextUrl.href;
      const pathname = request.nextUrl.pathname;
      // ست کردن header برای استفاده در layout
      response.headers.set("x-url", fullUrl);
      response.headers.set("x-pathname", pathname);
      console.log("zare_nk_050205-fullUrl002: " + fullUrl);
      return response;

      ////zare_nk_040403_added_end

      ////zare_nk_040403_commented_st
      // const response = await fetch(
      //   request.nextUrl.origin + "/api/auth/verifyToken",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ token }), // ارسال توکن به سرور
      //   }
      // );
      // console.log("zare_nk_040403-03-taghiir-tempTest-inja 004-token daaarim3");
      // const data = await response.json();
      // console.log(
      //   "zare_nk_040403-04-taghiir-tempTest-inja 004-data: " +
      //     JSON.stringify(data)
      // );
      // if (response.ok) {
      //   console.log(
      //     "zare_nk_040403-04-taghiir-decodedToken: " +
      //       JSON.stringify(data.decoded)
      //   );
      //   //zare_nk_040209-taghiir-decodedToken: {"unique_name":"20109","CodeMoshtari":"20109",
      //   // "Mobile":"9351091287","NameMoshtari":"","nbf":1746772412,"exp":1747377212,"iat":1746772412}

      //   // var idUser = data.decoded.IdUser;
      //   // console.log("zare_nk_040209-taghiir-idUser: " + idUser);
      //   var unique_name = data.decoded.unique_name;
      //   console.log("zare_nk_040209-taghiir-unique_name: " + unique_name);

      //   //zare_nk_040228_added_st
      //   const response = NextResponse.next();
      //   const fullUrl = request.nextUrl.href;
      //   const pathname = request.nextUrl.pathname;
      //   // ست کردن header برای استفاده در layout
      //   response.headers.set("x-url", fullUrl);
      //   response.headers.set("x-pathname", pathname);
      //   console.log("zare_nk_040228-fullUrl002: " + fullUrl);

      //   return response;
      // } else {
      //   console.log(
      //     "zare_nk_040403-05-taghiir-tempTest-inja 002-token namotabare ya monghazi shodeh-data.error: " +
      //       data.errorMessage
      //   );
      //   const response = NextResponse.redirect(new URL("/login", request.url));
      //   const isValidRedirectPath = !publicPaths.some((path) =>
      //     request.nextUrl.pathname.startsWith(path)
      //   );
      //   if (isValidRedirectPath) {
      //     response.cookies.set("redirect", request.nextUrl.pathname, {
      //       path: "/",
      //       httpOnly: false,
      //     });
      //   }
      //   var tempTest = response.cookies.get("redirect")?.value;
      //   console.log("zare_nk_040209-taghiir-tempTest: " + tempTest);
      //   console.log(
      //     "zare_nk_040209-response.Cookies(not ok) in middleware:",
      //     response.cookies.get("token")?.value
      //   );

      //   //zare_nk_040228_added_st
      //   const fullUrl = request.nextUrl.href;
      //   const pathname = request.nextUrl.pathname;
      //   // ست کردن header برای استفاده در layout
      //   response.headers.set("x-url", fullUrl);
      //   response.headers.set("x-pathname", pathname);
      //   console.log("zare_nk_040228-fullUrl003: " + fullUrl);
      //   return response;
      // }
      ////zare_nk_040403_commented_end
    } catch (error) {
      console.log(
        "zare_nk_050205-02-taghiir-tempTest-inja 003-amaliate barrasiye token ba khata movajeh shod-error: " +
        error
        //zare_nk_040403-taghiir-tempTest-inja 003-amaliate barrasiye token ba khata movajeh shod-error: TypeError: fetch failed
      );
      // return NextResponse.json({ error: "توکن نامعتبر است" }, { status: 401 });

      var ishomePage: boolean = request.nextUrl.pathname == "/" ? true : false;  //zare_nk_050205_added

      // const response = NextResponse.redirect(new URL("/login", request.url));  //zare_nk_050205_commented
      const response = ishomePage ? NextResponse.redirect(new URL("/onboarding", request.url)) :
        NextResponse.redirect(new URL("/login", request.url));    //zare_nk_050205_added

      response.cookies.set("redirect", request.nextUrl.pathname, {
        path: "/",
        httpOnly: false,
      });
      var tempTest = response.cookies.get("redirect")?.value;
      console.log("zare_nk_050205-taghiir-tempTest: " + tempTest);

      const fullUrl = request.nextUrl.href;
      const pathname = request.nextUrl.pathname;
      // ست کردن header برای استفاده در layout
      response.headers.set("x-url", fullUrl);
      response.headers.set("x-pathname", pathname);
      console.log("zare_nk_050205-fullUrl004: " + fullUrl);
      return response;
    }
  } else {
    console.log("zare_nk_050205-01-taghiir-tempTest-inja 004-token nadarim!!!");
    // return NextResponse.redirect(new URL(`/login?redirect=${request.nextUrl.pathname}`, request.url));   //zare_nk_031221_added(and commented. chon khastam be jaye gharar dadane request.nextUrl.pathname dar querystring an ra dar cookie gharar bedam)

    var ishomePage: boolean = request.nextUrl.pathname == "/" ? true : false;  //zare_nk_050205_added

    // const response = NextResponse.redirect(new URL("/login", request.url));  //zare_nk_050205_commented
    const response = ishomePage ? NextResponse.redirect(new URL("/onboarding", request.url)) :
      NextResponse.redirect(new URL("/login", request.url));    //zare_nk_050205_added

    response.cookies.set("redirect", request.nextUrl.pathname, {
      path: "/",
      httpOnly: false,
    });
    var tempTest = response.cookies.get("redirect")?.value;
    console.log("zare_nk_050205-tempTest: " + tempTest);

    const fullUrl = request.nextUrl.href;
    const pathname = request.nextUrl.pathname;
    // // ست کردن header برای استفاده در layout
    response.headers.set("x-url", fullUrl);
    response.headers.set("x-pathname", pathname);

    return response;
  }
}

export const config = {
  // matcher: ['/folder03/:path*','/folder02/:path*']
  // matcher: '/folder03',
  matcher: "/:path*", // روی همه صفحات اجرا شود
};
