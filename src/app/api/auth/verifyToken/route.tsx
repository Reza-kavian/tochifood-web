////zare_nk_050325_okk
//src\app\api\auth\verifyToken\  
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  if (!token) {
    return NextResponse.json({ error: "توکن ارسال نشده است" }, { status: 400 });
  }
  const secretKey = Buffer.from(
    process.env.JWT_SECRET_BASE64!,
    "base64"
  ).toString("utf-8"); //zare_nk_040219_added(baraye adame moshkel dar verify kardane secretKey vaghti az lafze $ estefadeh shod dar mohtavaye secretKey)
  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET as string);//zare_nk_040219_commented
    const decoded = jwt.verify(token, secretKey); //zare_nk_040219_added(chon estefadeye mostaghime secretKey dar verify kardan moshkel ijad kard vaghti az lafze $ estefadeh shod dar mohtavaye secretKey)
    ////zare_nk_040925-decoded: {"IdUser":"10006","Mobile":"9351091287","FullName":"رضا کاویان","Type":"User","nbf":1770193087,"exp":1772785087,"iat":1770193087}  //zare_nk_041115_nokteh(from api tochikala)
    ////zare_nk_040925-decoded: {"unique_name":"20109","CodeMoshtari":"20109","Mobile":"9351091287","NameMoshtari":"","nbf":1750740741,"exp":1751345541,"iat":1750740741}  //zare_nk_041115_nokteh(from api testotmapi)

    return NextResponse.json({ decoded }, { status: 200 });
    ////zare_nk_041106_nokteh(ehtemalan revale NextResponse.json intoriye ke dar darkhasth zadanha baraye response.json dar fetch va response.data dar axios pasokhi ke az in api daryaft mikonan barabare akoolade avval khahad bood) 
    // , hamchenin response.status ra az akoolade dovvom mikhoonan)
    // , masalan parsafar sar c# ham vaghti json mikard dadeh ha ra harchi miferestad chon yek akoolad bood fetch va axios dar projeye man anha ra be onvane akoolade avval darnazar migire 
    // va be soorete{data: ... , message:... , errors: ... , status:...} mikhooneh ke data,message,errors ra parsafar neme ekhtiari dad mesle namhaye ekhtiariye decoded,errorMassage man
    // , albateh statusi ke parsafar mideh dasti dakhele khode data mifresteh va joze data hast mesle 0 va -1 va -8 va ... vali status haye 200,401 va ... ra parsafar nasakht pas automat 200 pishfarze ersal mishe,vali vaghti dar darkhast 
    // masalan tedad parametra ha ya noe parametrha ya tartib va ya get va post boodan va ya name api va ... ra eshtebah bezanim barnameh automat khatahaye 4XX ya 5xx ra misazeh. 
    // hatta in khatahaei ke goftam barnameh automat misazeh mokammele khatahaei ke man dar api haye nextjs ba 400 va 401 va 409 va 500 va ... sakhtam mokammel ham mishe.
    // zira tamame khatahaei ke man sakhatm marboot be zamani hast ke barname ve khoobi be api miad va dar codehaye api in khatahaye 4XX va 5xx sakhteh mishan,vali khatahaye eshtebah 
    // neveshtane name api va ... ke dar bala goftam ke aslan barnameh be api nemiamad ke khata besazim dar api balke barnameh automat khodesh misakht mesle 400 va 401 va 405 va ... ke
    //harkodam standarde jahani darand, faghat yek nokteye mohem ke age net ya shabakeh ghat bashe va barnameh natooneh be api biad aslan khataye 4XX ya 5xx va ... sakhateh 
    // nemisheh va error mideh ke behtare try catch besazim ke barname dar mavarede ghatiye shabakeh va net be catch bereh va oonja error ro alert mikonim baraye karbar  
    // vali ma inja dasti dar akoolade dovvom sakhtim mesle { status: 200 }
  } catch (error: any) {
    let tokenErroeMessage = "";
    let errorCode = "";  //zare_nk_041108_added(ijadesh kardam vali estefadehi nakardam azash, mitooneh beonvane code sakhtegiye tekyekalam haye man baraye tafkike tasmimgiri dar request estefadeh beshe,
    // masalan age token monghazi shod che konim ya age token token namotabar ast che konim)
    if (error.name == "TokenExpiredError") {
      tokenErroeMessage = "token monghazi shodeh ast";
      errorCode = "TOKEN_EXPIRED";//zare_nk_041108_added
    } else {
      tokenErroeMessage = "token namotabar ast";
      errorCode = "TOKEN_INVALID";//zare_nk_041108_added
    }
    return NextResponse.json(
      {
        errorCode: errorCode,     //zare_nk_041108_added      
        errorMessage: tokenErroeMessage
      },
      { status: 401 }
    );
  }
}
