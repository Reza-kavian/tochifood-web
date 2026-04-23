////src\app\api\auth\login  //zare_nk_050124_okk
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getConnection, sql } from "../../../../../lib/db";
export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const path = url.searchParams.get("path");
  if (request.method !== "POST") {
    const response = NextResponse.json(
      { errorMessage: "Only POST requests allowed" },
      { status: 405 }
    );
    response.cookies.delete("token");
    response.cookies.delete("google_Invalid_credentials");
    return response;
  }
  try {
    console.log('040930-b-00')
    const pool = await getConnection();
    const { username, password } = await request.json();
    // ورود با نام کاربری و رمزعبور
    let user = await pool
      .request()
      .query(`SELECT * FROM game.tbl_user WHERE user_name='${username}'`);
    if (user.rowsAffected[0] == 0) {
      //ya user.recordset[0]==undefined
      const response = NextResponse.json(
        { errorMessage: "Invalid credentials-user not found" },
        { status: 404 }
      );
      response.cookies.delete("token");
      response.cookies.delete("google_Invalid_credentials");
      return response;
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      user.recordset[0].user_pass
    );
    if (!isPasswordValid) {
      const response = NextResponse.json(
        { errorMessage: "Invalid credentials-password is incorrect!" },
        { status: 401 }
      );
      response.cookies.delete("token");
      response.cookies.delete("google_Invalid_credentials");
      return response;
    }
    const secretKey = Buffer.from(
      process.env.JWT_SECRET_BASE64!,
      "base64"
    ).toString("utf-8");
    const token = jwt.sign(
      {
        IdUser: user.recordset[0].user_id,
        email: user.recordset[0].email,
        user_name: user.recordset[0].user_name,
        name: null,
      },
      // process.env.JWT_SECRET,   //zare_nk_040404_commented
      secretKey, //zare_nk_040404_added
      // { expiresIn: "60s" }
      { expiresIn: "3h" }
    );
    const response = NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 3, //adad be saniyeh ast  //zare_nk_040214_nokteh(age maxAge az expiresIn bishtar bashe bade expiresIn api verifyToken payame token monghazi shodeh medeh,va vaghti maxAge ham tamam shod token hazf mishe va offline hesab mishim)
      //  sameSite: 'strict',
      sameSite: "none",
      secure: true, //(secure: true bashe cookie faghat be darkhasthaye https ersal mishe,age secure:false bashe cookie be darkhasthaye http ham ersal mishe )
      //zare_nk_040208_nokteh(vaghti az sameSite: 'none' estefadeh mikonim hatman bayad secure: true bashe vagarnah shayad moroorgarha cookie ro napaziran va cookie kar nakoneh)
      //zare_nk_040216_nokteh2(age maxAge ra nadim va browser ra bebandim engar age cookieye token tamoom mishe va token ra hazf mikone,age mojadad moroorgar ra baz konim varede site shim token vojood nadare)
    });
    response.cookies.delete("google_Invalid_credentials");
    return response; //zare_nk_040312_commented_movaghat
  } catch (error) {
    console.error("login POST called 001!!-Error in authentication:", error);
    if (error instanceof sql.RequestError) {
      const response = NextResponse.json(
        { errorMessage: "خطای پایگاه داده" },
        { status: 500 }
      );
      response.cookies.delete("token");
      response.cookies.delete("google_Invalid_credentials");
      return response;
    }
    if (
      error instanceof Error &&
      error.message.includes("Cannot read properties of undefined")
    ) {
      const response = NextResponse.json(
        { errorMessage: "درخواست نامعتبر - برخی داده‌ها ارسال نشده‌اند" },
        { status: 400 }
      );
      response.cookies.delete("token");
      response.cookies.delete("google_Invalid_credentials");
      return response;
    }
    const response = NextResponse.json(
      { errorMessage: "Internal server error" },
      { status: 500 }
    );
    response.cookies.delete("token");
    response.cookies.delete("google_Invalid_credentials");
    return response;
  }
}
