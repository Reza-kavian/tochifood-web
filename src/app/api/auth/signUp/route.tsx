////zare_nk_050210_okk
import { NextRequest , NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getConnection, sql } from "../../../../../lib/db";
const jwt = require("jsonwebtoken");

export async function POST(request: NextRequest) {
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
    const pool = await getConnection();
    const { username, password } = await request.json();
    const usersFromDb = await pool
      .request()
      .query("SELECT * FROM game.tbl_user where user_name='" + username + "'");  
    if (usersFromDb.rowsAffected[0] != 0) {
      //ya usersFromDb.recordset[0]!=undefined
      const response = NextResponse.json(
        { errorMessage: "Invalid credentials-user existed" },
        { status: 409 }
      );
      response.cookies.delete("token");
      response.cookies.delete("google_Invalid_credentials");
      return response;
    }
    var passwordHashed = await bcrypt.hash(password, 10);
    let insertedUser = await pool
      .request()
      .query(
        "insert into game.tbl_user OUTPUT Inserted.user_id values('" +
          username +
          "',null,null,null,null,null,'" +
          passwordHashed +
          "','null') "
      ); 
    var objectToken = {
      IdUser: insertedUser.recordset[0].user_id,
      email: null,
      user_name: username,
      name: null,
    };
    process.env.JWT_SECRET = "mySecretKey"; //zare_nk_040312_nokteh(process.env.JWT_SECRET ra dar file .env.local meghdar nadadam balke dar inja meghdar dadam,va be soorate BASE64 ham nadadam,vali dar login ba google be soorate BASE64 dadeh boodam(dar khode file .env.local ham dadam) va dar bazyabi ham bayad tabdil be utf-8 konam)
    const token = jwt.sign(objectToken, process.env.JWT_SECRET, {
      expiresIn: "3h", //zare_nk_040214_nokteh(expiresIn ke tamoom she token monghazi mishe)
    }); 

    const response = NextResponse.json(
      {
        message: "Login successful001",
        token: token,
      },
      { status: 200 } //zare_nk_040120_nokteh(mitoonim { status: 200 }  ra comment konim chon age status ra nafrestim be soorate 
      // pishfarz vaziate 200 ersal mishe be darkhaste api client,va samte client dar pasokhe api automat meghdar 200 migirad)
    );

    response.cookies.set("token", token, {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 3, // ۳ دقیقه (۱۸۰ ثانیه)   //zare_nk_040214_nokteh(maxAge ke tamoom she token hazf mishe)
      //  sameSite: 'strict',
      sameSite: "none",
      secure: true, //(secure: true bashe cookie faghat be darkhasthaye https ersal mishe,age secure:false bashe cookie be darkhasthaye http ham ersal mishe )
      //zare_nk_040208_nokteh(vaghti az sameSite: 'none' estefadeh mikonim htman bayad secure: true bashe vagarnah shayad moroorgarha cookie ro napaziran va cookie kar nakoneh)
    });
    response.cookies.delete("google_Invalid_credentials");
    return response;
  } catch (error) {
    console.error("Error in authentication:" + error);
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
      error.message.includes("Cannot read properties of undefined")  //zare_nk_041219_nokteh(ehtemalan dastoore const { username, password } = await request.json(); dar soorate meghdare motabar nagereftane 
      // username, password be inja miad(moadele parametrhaye voroodiye actione api .netcore hast) )
    ) {
      //return NextResponse.json({ message: 'درخواست نامعتبر - برخی داده‌ها ارسال نشده‌اند' }, { status: 400 });
      const response = NextResponse.json(
        { errorMessage: "درخواست نامعتبر - برخی داده‌ها ارسال نشده‌اند" },
        { status: 400 }
      );
      response.cookies.delete("token");
      response.cookies.delete("google_Invalid_credentials");
      return response;
    }
    const response = NextResponse.json(
      { errorMessage: "خطای داخلی سرور" },
      { status: 500 }
    );
    response.cookies.delete("token");
    response.cookies.delete("google_Invalid_credentials");
    return response;
  }
}
