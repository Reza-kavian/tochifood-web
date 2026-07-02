////zare_nk_050223_okk
"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Styles from "@/styles/components/login.module.css";
import { RefObject } from "react";
import { ReactNode } from "react";
import { ChangeEvent } from "react";
import jwt from "jsonwebtoken"; //zare_nk_040603_added
import { JwtPayload } from "jsonwebtoken";  //zare_nk_040603_added

import { NextJsApiUrl } from "../../constants/Urls";  ////zare_nk_050407_added

function getCookie(name: any) {
  const value = `; ${document.cookie}`; // برای اطمینان از یافتن کوکی‌ها
  const parts = value.split(`; ${name}=`); // تفکیک کوکی‌ها
  if (parts.length === 2) {
    const raw = parts.pop();
    if (!raw) throw new Error("No parts found");
    const value = raw.split(";").shift();
    if (!value) throw new Error("Invalid cookie format");
    return decodeURIComponent(value);
  }
  return null; //اگر کوکی پیدا نشد
}

type FirstPageProps = {
  mobileButtonClick: () => void; //zare_nk_040527_nokteh(rooydade clicke dokmeye mobileCheckBtn)
  mobileVal: string; //zare_nk_040527_nokteh(state shamele meghdare shomare mobile) 
  mobileChanged: (
    e: ChangeEvent<HTMLInputElement> | HTMLInputElement | null
  ) => void; //zare_nk_040527_nokteh(rooydade onChange textboxe mobile)    
  mobileError: string | null; //zare_nk_040527_nokteh(state shamele errore marboot be format va mohtavaye mobile varedeh)
  refForMobileInput: RefObject<(HTMLInputElement | null)[]>; //zare_nk_040527_nokteh(useRefe textboxe mobile )
  refForMobileCheckBtn: RefObject<HTMLButtonElement | null>; //zare_nk_040527_nokteh(useRefe dokmeye mobileCheckBtn )
  isDisabledMobileCheckBtn: boolean; //zare_nk_040527_nokteh(state shamele meghdare booliane attribute disabled dokmeye mobileCheckBtn )
  setIsDisabledMobileCheckBtn: React.Dispatch<React.SetStateAction<boolean>>; //zare_nk_040527_nokteh(setState meghdardehiye booleane attribute disabled dokmeye mobileCheckBtn )
  backBtnCliked: boolean; //zare_nk_040527_nokteh(state shamele meghdare booliane clicke dokmeye backToFirsPage)
  setBackBtnCliked: React.Dispatch<React.SetStateAction<boolean>>; //zare_nk_040527_nokteh(setState meghdardehiye booleane state backBtnCliked marboot be dokmeye backToFirsPage)
  handleGoogleLogin: () => void; //zare_nk_040527_nokteh(rooydade clicke dokmeye handleGoogleBtn)
  children?: ReactNode; //zare_nk_040527_nokteh(mohtaviati ke dakhele blocke seda zadane componente FirstPageComponent minevisim)
};

function FirstPageComponent({
  mobileButtonClick,
  mobileVal,
  mobileChanged,
  mobileError,
  refForMobileInput,
  refForMobileCheckBtn,
  isDisabledMobileCheckBtn,
  setIsDisabledMobileCheckBtn,
  backBtnCliked,
  setBackBtnCliked,
  handleGoogleLogin,
  children,
}: FirstPageProps) {
  useEffect(() => {
    if (backBtnCliked == true) {
      if (refForMobileInput.current[0]) {
        mobileChanged(refForMobileInput.current[0]); //zare_nk_040527_nokteh(shabihsaziye rooydade onChange textboxe mobile ke metode mobileChanged seda zadeh mishod)
      }
    }
  }, [backBtnCliked]);

  return (
    <>
      <div className={`${Styles.formsRow} ${Styles.titleStyle}`}>
        <span>ورود | ثبت نام</span>
      </div>
      <div
        className={`${Styles.lablAndInputCont}  `}
        style={{ marginBottom: "15px" }}
      >
        <span style={{ marginLeft: "15px", marginBottom: "10px" }}>
          شماره تماس
        </span>
        <input
          style={{ textAlign: "center" }}
          className={Styles.txtBox}
          id="mobileTxt"
          value={mobileVal}
          onChange={mobileChanged}
          ref={(e) => {
            refForMobileInput.current[0] = e;
          }}
        />
      </div>
      {/* zare_nk_040224_added_st(rahe1-ba useRef) */}
      {/* <div className={`${Styles.formsRow} ${Styles.warningCont}`}>
                <span ref={refForforErrorMobile} className="forErrorMobile error" >ورود شماره تماس الزامی است</span>
            </div> */}
      {/* zare_nk_040224_added_end(rahe1-ba useRef) */}
      {/* zare_nk_040224_added_st(rahe1-ba useState-ke reactpasandtare) */}
      {mobileError && (
        <div className={`${Styles.formsRow} ${Styles.warningCont}`}>
          <span className="forErrorMobile error">{mobileError}</span>
        </div>
      )}
      {/* zare_nk_040224_added_end(rahe1-ba useState-ke reactpasandtare) */}
      <div className={Styles.formsRow}>
        <button
          ref={refForMobileCheckBtn}
          id="mobileCheckBtn"
          className={Styles.disabledBtn}
          onClick={mobileButtonClick}
          disabled={isDisabledMobileCheckBtn}
        >
          {children}
        </button>
      </div>
      <div className={Styles.formsRow}>
        <button
          type="button"
          id="handleGoogleBtn"
          className={Styles.btn}
          onClick={handleGoogleLogin}
        >
          ورود با حساب گوگل
        </button>
      </div>
    </>
  );
}

type SecondPageProps = {
  smsVal: string; //zare_nk_040525_nokteh(shamele meghdare sms varedehye karbar)
  smsTxtChanged: (e: ChangeEvent<HTMLInputElement>) => void; //zare_nk_040525_nokteh(rooydade onChange textboxe smsValTxt)
  smsTxtKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void; //zare_nk_040525_nokteh(rooydade onKeyDown textboxe smsValTxt)
  backBtnClick: () => void; //zare_nk_040525_nokteh(rooydade clicke dokmeye backToFirsPage)
  checkSmsForLogin: () => void; //zare_nk_040525_nokteh(rooydade clicke dokmeye vorood)
  ResendCodefunc: () => void; //zare_nk_040525_nokteh(rooydade clicke dokmeye ResendCode)
  isDisabledCheckSmsBtn: boolean; //zare_nk_040527_nokteh(state shamele meghdare booliane attribute disabled dokmeye vorood dar safheye second )
  setIsDisabledCheckSmsBtn: React.Dispatch<React.SetStateAction<boolean>>; //zare_nk_040527_nokteh(setState meghdardehiye booleane attribute disabled dokmeye vorood dar safheye second )
  refForCheckSmsBtn: RefObject<HTMLButtonElement | null>; //zare_nk_040527_nokteh(useRefe dokmeye vorood dar safheye second )
  refForSmsInput: RefObject<(HTMLInputElement | null)[]>; //zare_nk_040527_nokteh(useRefe textboxe sms)
  smsError: string | null; //zare_nk_040527_nokteh(state shamele errore marboot be format va mohtavaye sms varedeh  )
  mobileCheckBtn: boolean; //zare_nk_040527_nokteh(setState meghdardehiye booleane mige dokmeye mobileCheckBtn feshordeh shod ya backToFirsPage)
  setMobileCheckBtn: React.Dispatch<React.SetStateAction<boolean>>; //zare_nk_040527_nokteh(setState meghdardehiye booleane state mobileCheckBtn)
  mobileVal: string; //zare_nk_040527_nokteh(state shamele meghdare shomare mobile )
  setMobileVal: React.Dispatch<React.SetStateAction<string>>;
  error: string | null; //zare_nk_040527_nokteh(state shamele errore balaye safhe )
  setError: React.Dispatch<React.SetStateAction<string | null>>; //zare_nk_040527_nokteh(setState meghdardehiye state error)
  timer: number; //zare_nk_040527_nokteh(state meghdare timer)
  setTimer: React.Dispatch<React.SetStateAction<number>>; //zare_nk_040527_nokteh(setState meghdardehiye state timer)
  isDisabledResendCode: boolean; //zare_nk_040527_nokteh(state shamele meghdare booliane attribute disabled dokmeye ersale mojadade code )
  setIsDisabledResendCode: React.Dispatch<React.SetStateAction<boolean>>; //zare_nk_040527_nokteh(setState meghdardehiye state isDisabledResendCode)
  isDisabledRemovTimerBtn: boolean; //zare_nk_040527_nokteh(state shamele meghdare booliane attribute disabled dokmeye risete timer )
  setIsDisabledRemovTimerBtn: React.Dispatch<React.SetStateAction<boolean>>; //zare_nk_040527_nokteh(setState meghdardehiye state isDisabledRemovTimerBtn)
};

function SecondPageComponent({
  smsVal,
  smsTxtChanged,
  smsTxtKeyDown,
  backBtnClick,
  checkSmsForLogin,
  ResendCodefunc,
  isDisabledCheckSmsBtn,
  setIsDisabledCheckSmsBtn,
  refForCheckSmsBtn,
  refForSmsInput,
  smsError,
  mobileCheckBtn,
  setMobileCheckBtn,
  mobileVal,
  setMobileVal,
  error,
  setError,
  timer,
  setTimer,
  isDisabledResendCode,
  setIsDisabledResendCode,
  isDisabledRemovTimerBtn,
  setIsDisabledRemovTimerBtn,
}: SecondPageProps) {
  var refForResendCode = useRef(null); //zare_nk_040527_nokteh(useRefe dokmeye ersale mojadad )
  var refForRemovTimer = useRef(null); //zare_nk_040527_nokteh(useRefe dokmeye resete timer )
  const [timerDisplay, setTimerDisplay] = useState("flex"); //zare_nk_040527_nokteh(state haviye meghdare flex pedare timer)
  const [removTimer, setRemovTimer] = useState(false); //zare_nk_040527_nokteh(state haviye meghdare boolean baraye taeine reset kardan timer ya na)
  const refForTimer = useRef<HTMLDivElement | null>(null); // zare_nk_040527_nokteh(useRefe tage timermoveOpportunity ke timer ra namayesh midad )
  var refForTimerCont = useRef(null); //zare_nk_040527_nokteh(useRefe tage timermoveOpportunityCont pedare tage timermoveOpportunity ast)
  const intervalRef = useRef<null | ReturnType<typeof setInterval>>(null); //zare_nk_040527_nokteh(useRefe modiriate timer)

  useEffect(() => {
    intervalRef.current = setInterval(function () {
      if (removTimer) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setTimer(0);
        setIsDisabledResendCode(false);
        setIsDisabledRemovTimerBtn(true);
        setRemovTimer(false);
        return;
      }
      setTimer((curTimer) => {
        if (curTimer < 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          if (typeof window !== "undefined") {
            localStorage.setItem("timer", JSON.stringify(curTimer));
          }
          setIsDisabledResendCode(false);
          setIsDisabledRemovTimerBtn(true);
          return curTimer;
        }
        var h = Math.floor(timer / (1000 * 60 * 60));
        var hToString = h.toString();
        hToString = hToString.length === 1 ? "0" + hToString : hToString;
        var m = Math.floor((timer - h * 60 * 60 * 1000) / (60 * 1000));
        var mToString = m.toString();
        mToString = mToString.length === 1 ? "0" + mToString : mToString;
        var s = Math.floor((timer - h * 60 * 60 * 1000 - m * 60 * 1000) / 1000);
        var sToString = s.toString();
        sToString = sToString.length === 1 ? "0" + sToString : sToString;
        try {
          if (refForTimer.current) {
            refForTimer.current.innerHTML =
              hToString != "00"
                ? '<span style="border-radius:5px;width:30px;height:30px;background-color:red;color:white;display:flex;justify-content:center;align-items:center;">' +
                hToString +
                "</span>" +
                '<span style="color:red;padding:0px 5px;display:flex;justify-content:center;align-items:center;">:</span>' +
                '<span style="border-radius:5px;width:30px;height:30px;background-color:red;color:white;display:flex;justify-content:center;align-items:center;">' +
                mToString +
                "</span>" +
                '<span style="color:red;padding:0px 5px;display:flex;justify-content:center;align-items:center;">:</span>' +
                '<span style="border-radius:5px;width:30px;height:30px;background-color:red;color:white;display:flex;justify-content:center;align-items:center;">' +
                sToString +
                "</span>"
                : '<span style="border-radius:5px;width:30px;height:30px;background-color:red;color:white;display:flex;justify-content:center;align-items:center;">' +
                mToString +
                "</span>" +
                '<span style="color:red;padding:0px 5px;display:flex;justify-content:center;align-items:center;">:</span>' +
                '<span style="border-radius:5px;width:30px;height:30px;background-color:red;color:white;display:flex;justify-content:center;align-items:center;">' +
                sToString +
                "</span>";
          }
        } catch (error) {
          if (error instanceof Error) {
            console.log("zare_nk_040123-0004-Error:" + error.message);
          } else {
            console.log("zare_nk_040123-0004-Unknown error", error);
          }
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
        if (typeof window !== "undefined") {
          localStorage.setItem("timer", JSON.stringify(curTimer - 1000));
        }
        return curTimer - 1000;
      });
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timer, removTimer]);

  useEffect(() => {
    if (mobileCheckBtn == true) {
      const input = refForSmsInput.current[0];
      if (input) {
        const fakeEvent = {
          target: input,
        } as React.ChangeEvent<HTMLInputElement>;
        smsTxtChanged(fakeEvent);
      }
      setTimer(40000);
      setIsDisabledResendCode(true);
      setIsDisabledRemovTimerBtn(false);
    }
  }, [mobileCheckBtn]);

  return (
    <>
      <div
        ref={refForTimerCont}
        id="timermoveOpportunityCont"
        style={{
          display: timerDisplay,
          flexFlow: "row",
        }}
      >
        <div
          ref={refForTimer}
          id="timermoveOpportunity"
          style={{ display: "flex", flexFlow: "row", color: "red" }}
        ></div>
      </div>

      <div className={Styles.formsRow} style={{ direction: "rtl" }}>
        <button
          id="backToFirsPage"
          className={`${Styles.BackBtn}  ${Styles.buttonHover}`}
          onClick={backBtnClick}
        >
          <div className={`${Styles.BackImgCont} `}>
            <img
              src="https://img.tochikala.com/tochikala/back-icon-in-cardcontainer.svg"
              style={{ width: "18px" }}
              alt="بازگشت به صفحه شماره تماس"
            />
          </div>
          <div className={`${Styles.BackBtnTitleCont} `}>
            <span>بازگشت</span>
          </div>
        </button>
      </div>

      <div className={`${Styles.formsRow}  ${Styles.darkFont}`}>
        <span>کد تایید را وارد کنید</span>
      </div>

      <div
        className={`${Styles.lablAndInputCont}  `}
        style={{ marginBottom: "15px" }}
      >
        <span style={{ marginLeft: "15px", marginBottom: "10px" }}>
          کد تایید
        </span>
        <input
          className={Styles.txtBox}
          id="smsValTxt"
          value={smsVal}
          onChange={smsTxtChanged}
          onKeyDown={smsTxtKeyDown}
          ref={(e) => {
            refForSmsInput.current[0] = e;
          }}
        />
      </div>

      {smsError && (
        <div className={`${Styles.formsRow} ${Styles.warningCont}`}>
          <span className="forErrorMobile error">{smsError}</span>
        </div>
      )}

      <div className={Styles.formsRow}>
        <button
          ref={refForCheckSmsBtn}
          className={Styles.disabledBtn}
          onClick={checkSmsForLogin}
          disabled={isDisabledCheckSmsBtn}
        >
          ورود
        </button>
      </div>

      <div className={Styles.formsRow}>
        <button
          id="ResendCode"
          ref={refForResendCode}
          className={Styles.btn}
          onClick={ResendCodefunc}
          disabled={isDisabledResendCode}
        >
          ارسال مجدد
        </button>
      </div>

      <div className={Styles.formsRow}>
        <button
          ref={refForRemovTimer}
          className={Styles.btn}
          onClick={() => {
            return setRemovTimer(true);
          }}
          disabled={isDisabledRemovTimerBtn}
        >
          ریست تایمر
        </button>
      </div>
    </>
  );
}

export default function Toolbar() {
  const [currentPage, setCurrentPage] = useState("firstPage");
  const [mobileVal, setMobileVal] = useState("");
  const [smsVal, setSmsVal] = useState("");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [mobileError, setMobileError] = useState("");
  const [smsError, setSmsError] = useState("");
  const refForMobileInput = useRef<(HTMLInputElement | null)[]>([]);
  const refForSmsInput = useRef<(HTMLInputElement | null)[]>([null]);
  const refForMobileCheckBtn = useRef<HTMLButtonElement | null>(null);
  const refForCheckSmsBtn = useRef<HTMLButtonElement | null>(null);
  const [isDisabledMobileCheckBtn, setIsDisabledMobileCheckBtn] =
    useState(true);
  const [isDisabledCheckSmsBtn, setIsDisabledCheckSmsBtn] = useState(true);
  const [backBtnCliked, setBackBtnCliked] = useState(false);
  const [mobileCheckBtn, setMobileCheckBtn] = useState(false);
  let timerStr = null;
  if (typeof window !== "undefined") {
    timerStr = localStorage.getItem("timer");
  }
  const initialTimer = timerStr !== null ? JSON.parse(timerStr) : 40000;
  const [timer, setTimer] = useState(initialTimer);
  const [isDisabledResendCode, setIsDisabledResendCode] = useState(true);
  const [isDisabledRemovTimerBtn, setIsDisabledRemovTimerBtn] = useState(true);

  useEffect(() => {
    const google_Invalid_credentials = getCookie("google_Invalid_credentials");
    document.cookie =
      "google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC"; // حذف کوکی
    if (google_Invalid_credentials != null) {
      setError("خطا در احراز هویت با گوگل");
    }
  }, []);

  async function mobileButtonClick() {
    setError("");
    var errorFree = true;
    const inputs = Array.from(document.querySelectorAll("#loginForm input"))
      .filter((input) => ["mobileTxt"].includes(input.id))
      .map((input, index) => {
        var element = refForMobileInput.current[index];
        let valid = false;
        if (element !== null) {
          valid = element.classList.contains("valid");
        }
        if (!valid) {
          errorFree = false;
          const vall = element?.value;
          if (!vall) {
            setMobileError("ورود شماره تماس الزامی است"); //zare_nk_040224_added(rahe3-ba useState-reactpasandtarine)
          }
        }
      });

    if (!errorFree) {
      return;
    }

    try {
      // let ApiUrl = "https://api.tochikala.com/api/";  ////zare_nk_050407_commented
      let ApiUrl = NextJsApiUrl; ////zare_nk_050407_added
      const response = await fetch(ApiUrl + "User/Api_LoginUser1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //// Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ Mobile: mobileVal }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("zare_nk_040218-data: " + JSON.stringify(data) + '-response.status: ' + response.status);
        ////zare_nk_041114_added_st
        //  console.log("zare_nk_040218-data: " + JSON.stringify(data) + '-response.status: ' + response.status);
        //       //zare_nk_040218-data: {"status":0,"message":"","data":1,"errors":[]}-response.status: 200
        //       //zare_nk_040218-data: {"status":-1,"message":"","data":null,"errors":[]}-response.status: 200
        //       //zare_nk_040218-data: {"status":-2,"message":"","data":null,"errors":["کاربر یافت نشد"]}-response.status: 200
        ////zare_nk_041114_added_end

        if (data.status == 0) {
          setCurrentPage("secondPage");
          setBackBtnCliked(false);
          setMobileCheckBtn(true);
        } else {
          document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
          document.cookie = `google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
          setError("متاسفانه 77 خطایی رخ داده است:" + data.errors);
          //zare_nk_040218-data: {"status":-2,"message":"","data":1,"errors":["6 ثانیه ی دیگر مجددا تلاش کنید"]}
        }
      } else {
        document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        document.cookie = `google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        setError("متاسفانه 22 خطایی رخ داده است");
      }
    } catch (error) {
      // document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      // document.cookie = `google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      console.error("zare_nk_040218-resendcode-in catch:", error);
      // setError("متاسفانه خطایی رخ داده است33:" + error);  //zare_nk_041107_commented
      ////zare_nk_041107_added_st
      if (error instanceof Error) {
        console.error("zare_nk_040218-resendcode-in catch-2:", error.message);
        setError("متاسفانه خطایی رخ داده است222:" + error.message);
      } else {
        console.error("zare_nk_040218-resendcode-in catch-3:", String(error));
        setError("متاسفانه خطایی رخ داده است333:" + String(error));
      }
      ////zare_nk_041107_added_end
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = `/api/auth/google`; // هدایت به گوگل  //zare_nk_040422_commented
    // window.location.href = `https://testotm.sarinmehr.com/api/auth/google`; //zare_nk_040422_added
  };

  async function checkSmsForLogin() {
    setError("");
    var errorFree = true;
    const inputs = Array.from(document.querySelectorAll("#loginForm input"))
      .filter((input) => ["smsValTxt"].includes(input.id))
      .map((input, index) => {
        var element = refForSmsInput.current[index];
        let valid = false;
        if (element !== null) {
          valid = element.classList.contains("valid");
        }
        if (!valid) {
          errorFree = false;
          const vall = element?.value;
          if (!vall) {
            setSmsError("ورود کد پیامکی الزامی است"); //zare_nk_040224_added(rahe3-ba useState-reactpasandtarine)
          }
        }
      });

    if (!errorFree) {
      return;
    }
    // const token = getCookie("token");  //zare_nk_041125_commented(chon token null hast ke be login oomadim digeh!!) 
    // let ApiUrl = "https://api.tochikala.com/api/";  ////zare_nk_050407_commented
    let ApiUrl = NextJsApiUrl; ////zare_nk_050407_added
    const response = await fetch(ApiUrl + "User/Api_LoginUser2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //// Authorization: "Bearer " + token,   
      },
      body: JSON.stringify({
        Mobile: mobileVal,
        SmsCode: smsVal,
        Password: ""
      }),
      // credentials: "include", //zare_nk_040202_commented
    });
    const data = await response.json();
    if (response.ok) {
      console.log("zare_nk_040218-data222: " + JSON.stringify(data));
      //zare_nk_040218-data222: {"status":-8,"message":"","data":null,"errors":["52 دقیقه ی دیگر مجددا تلاش کنید"]}
      //zare_nk_040218-data222:
      // {"status":0,"message":"",
      // "data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwMTA5IiwiQ29kZU1vc2h0YXJpIjoiMjAxMDkiLCJNb2JpbGUiOiI5MzUxMDkxMjg3IiwiTmFtZU1vc2h0YXJpIjoiIiwibmJmIjoxNzQ2NzI1OTI4LCJleHAiOjE3NDczMzA3MjgsImlhdCI6MTc0NjcyNTkyOH0.9Jfv71v3D_s13gSyf3gXqgEfiXaV-lx93hDey4DSLM8"
      // },"errors":[]}
      if (data.status == 0) {
        let token = data.data.token;
        ////zare_nk_040603_added_st 
        // // const secretKey = Buffer.from(
        // //   process.env.JWT_SECRET_BASE64!,
        // //   "base64"
        // // ).toString("utf-8");
        // // const decoded = jwt.verify(token, secretKey);
        // const decoded = jwt.decode(token) as JwtPayload | null;
        // console.log("040530-03-token: " + JSON.stringify(decoded));
        ////zare_nk_040603_added_end        

        try {
          ////zare_nk_041114_added_st(and commented. chon methode HttpContext.SignInAsync rp anjam mideh baraye online kardan be sabke HttpContext marboot be .net core c# 
          // vali man ino nemikham chon hamin cookie token sakhtan baram kafiye be onvane amale online kardan va amale estelame online boodane karbar. dar zemn ma dar view haye c#
          // ke nistim ba hamin emkanate HttpContext mesle(HttpContextAccessor.HttpContext!.User.Identity!.IsAuthenticated)baraye estelame online boodan estefadeh konim!
          // pas az haman sakhte va vakeshiye cookie haviye token ke name token ra behesh dadam baraye moshakhas kardane online shodan va estelame online boodaanesh estefadeh mikonam
          //va in kar ra dar methode verifyToken gonjandim)

          //           let ApiUrl = "https://api.tochikala.com/api/";
          // const responseValidationPost = await fetch(ApiUrl +"/User/ValidationPost", {
          //             method: "POST",
          //             headers: { "Content-Type": "application/json" },
          //             body: JSON.stringify({ token }),
          //           });
          ////zare_nk_041114_added_end(and commented. chon methode HttpContext.SignInAsync rp anjam mideh baraye online kardan be sabke HttpContext marboot be .net core c# 
          // vali man ino nemikham chon hamin cookie token sakhtan baram kafiye be onvane amale online kardan va amale estelame online boodane karbar. dar zemn ma dar view haye c#
          // ke nistim ba hamin emkanate HttpContext mesle(HttpContextAccessor.HttpContext!.User.Identity!.IsAuthenticated)baraye estelame online boodan estefadeh konim!
          // pas az haman sakhte va vakeshiye cookie haviye token ke name token ra behesh dadam baraye moshakhas kardane online shodan va estelame online boodaanesh estefadeh mikonam
          //va in kar ra dar methode verifyToken gonjandim)

          const response = await fetch("/api/auth/verifyToken", {  //zare_nk_041115_nokteh(methode Api_LoginUser2 tavassote aghaye parsafar chek mishe dar morede dorostiye sms va zamane monghazi shodanesh,
            //vali man mikham bedoonam tokeni ke methode Api_LoginUser2 be man mideh ba secretKey amn shodeh bashe,va projeye samte cllient hatman bayad kelide dastresi ro dashteh bashe ta kasi 
            //ba sooeestefade token ro natooneh vakeshi koneh(masalan dar proje haye haker ha),pas az methode verifyToken ke ba dastoore jwt.verify az ma secretKey mikhad estefadeh kardam)
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });
          const data = await response.json();
          if (response.ok) {
            console.log("zare_nk_040925-decodedToken: " + JSON.stringify(data.decoded));
            ////zare_nk_040925-decodedToken: {"IdUser":"10006","Mobile":"9351091287","FullName":"رضا کاویان","Type":"User","nbf":1770193087,"exp":1772785087,"iat":1770193087}  //zare_nk_041115_nokteh(from api tochikala)
            ////zare_nk_040925-decodedToken: {"unique_name":"20109","CodeMoshtari":"20109","Mobile":"9351091287","NameMoshtari":"","nbf":1750740741,"exp":1751345541,"iat":1750740741}  //zare_nk_041115_nokteh(from api testotmapi)

            // const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString(); // 3 ساعت بعد //zare_nk_040219-nokteh(zamane monghazi ra khodam taein kardam)   //zare_nk_040305_updated(dasti ra az 3 be 30 tagheir dadam)
            const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString();
            //  const expires = data.decoded.exp;//zare_nk_040219-nokteh(zamane monghazi ra az dadeye parsafar taein kardam)
            document.cookie = `token=${token}; path=/; expires=${expires}; secure; samesite=None`;
            const redirect = getCookie("redirect") || "/";
            document.cookie =
              "redirect=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC"; // حذف کوکی
            router.replace(redirect); //zare_nk_040228_commented(and zare_nk_040312 uncommented(chon safheh ro refresh nemikoneh va behtare ehtemalan))
            // NextResponse.redirect(new URL("/login", request.url));//zare_nk_040228_added
            // window.location.href = redirect;
            // window.location.replace(redirect); //zare_nk_040312_commented(chon router.replace ya router.push safheh ro kamel refresh nemikonam behtare)
          } else {
            document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
            document.cookie = `google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
            setError("متاسفانه خطایی رخ داده است313:" + (data?.errorMessage ? ": " + data.errorMessage : ""));  //zare_nk_041107_added_tahlilshe(niaz bood??!!)
          }
        } catch (error) {
          document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
          document.cookie = `google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
          console.error("zare_nk_040925-❌ خطااااااااااااااااااای JWT:", error);
          // setError("متاسفانه خطایی رخ داده است33:" + error);  //zare_nk_041107_commented
          ////zare_nk_041107_added_st
          if (error instanceof Error) {
            setError("متاسفانه خطایی رخ داده است323:" + error.message);
          } else {
            setError("متاسفانه خطایی رخ داده است343:" + String(error));
          }
          ////zare_nk_041107_added_end
        }
      } else {
        document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        document.cookie = `google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        setError("متاسفانه خطایی رخ داده است34:" + data.errors);
      }
    } else {
      console.log("zare_nk_040925--!!response.ok");
      document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      document.cookie = `google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      setError("متاسفانه خطایی رخ داده است35");
    }
  }

  async function ResendCodefunc() {
    alert('ResendCodefunc called!!');
    let token = "";
    if (typeof window !== "undefined") {
      token = localStorage.getItem("Token") || "";
    }
    try {
      // let ApiUrl = "https://api.tochikala.com/api/";  ////zare_nk_050407_commented
      let ApiUrl = NextJsApiUrl; ////zare_nk_050407_added
      const response = await fetch(ApiUrl + "User/Api_LoginUser1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ Mobile: mobileVal }),
        // credentials: "include", //zare_nk_040202_commented
      });
      const data = await response.json();
      if (response.ok) {
        console.log("zare_nk_040218-resendcode-data: " + JSON.stringify(data));
        ////zare_nk_041114_added_st
        //zare_nk_040218-resendcode-data: {"status":0,"message":"","data":1,"errors":[]}-response.status: 200
        //zare_nk_040218-resendcode-data: {"status":-1,"message":"","data":null,"errors":[]}-response.status: 200
        //zare_nk_040218-resendcode-data: {"status":-2,"message":"","data":null,"errors":["کاربر یافت نشد"]}-response.status: 200
        ////zare_nk_041114_added_end
        if (data.status == 0) {
          setTimer(40000);
          setError("");
          setIsDisabledResendCode(true);
          setIsDisabledRemovTimerBtn(false);
        } else {
          setError("تتتتتتتمتاسفانه خطایی رخ داده است:" + data.errors);
          //zare_nk_040218-resendcode-data: {"status":-2,"message":"","data":null,"errors":["کاربر یافت نشد"]}-response.status: 200
        }
      } else {
        console.log("zare_nk_040218-resendcode-response not ok");
        setError("متاسفانه  خطایی رخ داده است11");
      }
    } catch (error) {
      // document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      // document.cookie = `google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      console.error("zare_nk_040218-resendcode-in catch:", error);
      // setError("متاسفانه خطایی رخ داده است33:" + error);  //zare_nk_041107_commented
      ////zare_nk_041107_added_st
      if (error instanceof Error) {
        console.error("zare_nk_040218-resendcode-in catch-2:", error.message);
        setError("متاسفانه خطایی رخ داده است22:" + error.message);
      } else {
        console.error("zare_nk_040218-resendcode-in catch-3:", String(error));
        setError("متاسفانه خطایی رخ داده است33:" + String(error));
      }
      ////zare_nk_041107_added_end
    }
  }

  function mobileChanged(
    eventOrElement: ChangeEvent<HTMLInputElement> | HTMLInputElement | null
  ) {
    setError("");
    let input: HTMLInputElement | null = null;
    let vall: string = "";
    if (eventOrElement && "target" in eventOrElement) {
      // alert("11111111111");
      //zare_nk_040224_nokteh(age ba taghire mohtavaye mobileTxt tavasote karbar biaim dar methode mobileChanged)
      input = eventOrElement.target;
      vall = input.value;
    } else {
      // alert("22222222222");
      //zare_nk_040224_nokteh(age ba taghire mohtavaye mobileTxt tavasote dokmeye backBtnClick biaim dar methode mobileChanged)
      ////zare_nk_040409_commented_st
      // input = refForMobileInput.current[0];
      // vall = input.value;
      ////zare_nk_040409_commented_end
      ////zare_nk_040409_added_st
      input = eventOrElement;
      vall = input?.value ?? "";
      ////zare_nk_040409_added_st
    }

    var pat = new RegExp("^[0]{1}[0123456789]{10}$");
    var isMobileNum = pat.test(vall);
    if (!vall) {
      if (input) {
        input.classList.remove("valid");
        input.classList.add("invalid");
      }

      // document.getElementById('forErrorMobile').innerText = 'ورود شماره تماس الزامی است';  //zare_nk_040224_commented(rahe1-ba taghaye tooye dom-reactpasand nist)
      // if (refForforErrorMobile.current) {  //zare_nk_040224_commented(rahe2-ba useRef-reactpasand hast)
      //     refForforErrorMobile.current.innerText = 'ورود شماره تماس الزامی است';
      // }
      setMobileError("ورود شماره تماس الزامی است"); //zare_nk_040224_added(rahe3-ba useState-reactpasandtarine)

      // refForMobileCheckBtn.current.disabled = true;  //zare_nk_040222_commented(javab nadad chon meghdare ebtedaeiye disabled ra dar khate tarife MobileCheckBtn ba lafze mostaghime false dadim va ref dige tavanaeiye tagheiresho nadare,va olaviat ba tarife atribute html hast )
      setIsDisabledMobileCheckBtn(true); //zare_nk_04022_added(javab dad chon meghdare ebtedaeiye disabled ra dar khate tarife MobileCheckBtn ba meghdare isDisabledMobileCheckBtn dadim va setIsDisabledMobileCheckBtn tavanaeiye tagheiresho dare )
      if (refForMobileCheckBtn.current) {
        refForMobileCheckBtn.current.classList.add(Styles.disabledBtn);
        refForMobileCheckBtn.current.classList.remove(Styles.btn);
      }
    } else if (!isMobileNum) {
      if (input) {
        input.classList.remove("valid");
        input.classList.add("invalid");
      }
      // document.getElementById('forErrorMobile').innerText = 'فرمت شماره تماس وارده نادرست است';  //zare_nk_040224_commented(rahe1-ba taghaye tooye dom-reactpasand nist)
      // if (refForforErrorMobile.current) {  //zare_nk_040224_commented(rahe2-ba useRef-reactpasand hast)
      //     refForforErrorMobile.current.innerText = 'فرمت شماره تماس وارده نادرست است';
      // }
      setMobileError("فرمت شماره تماس وارده نادرست است"); //zare_nk_040224_added(rahe3-ba useState-reactpasandtarine)
      setIsDisabledMobileCheckBtn(true);
      if (refForMobileCheckBtn.current) {
        refForMobileCheckBtn.current.classList.add(Styles.disabledBtn);
        refForMobileCheckBtn.current.classList.remove(Styles.btn);
      }
    } else {
      if (input) {
        input.classList.remove("invalid");
        input.classList.add("valid");
      }
      // document.getElementById('forErrorMobile').innerText = '';  //zare_nk_040224_commented(rahe1-ba taghaye tooye dom-reactpasand nist)
      // if (refForforErrorMobile.current) {  //zare_nk_040224_commented(rahe2-ba useRef-reactpasand hast)
      //     refForforErrorMobile.current.innerText = '';
      // }
      setMobileError(""); //zare_nk_040224_added(rahe3-ba useState-reactpasandtarine)

      setIsDisabledMobileCheckBtn(false);
      if (refForMobileCheckBtn.current) {
        refForMobileCheckBtn.current.classList.remove(Styles.disabledBtn);
        refForMobileCheckBtn.current.classList.add(Styles.btn);
      }
    }
    if (input) {
      setMobileVal(input.value);
    }
  }

  function smsTxtChanged(event: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    var input = null;
    var vall = null;
    if (event.target != undefined) {
      //zare_nk_040224_nokteh(age ba taghire mohtavaye smsValTxt tavasote karbar biaim dar methode smsTxtChanged)
      input = event.target;
      vall = input.value;
    } else {
      //zare_nk_040224_nokteh(age ba taghire mohtavaye smsValTxt tavasote dokmeye mobileCheckBtn biaim dar methode smsTxtChanged)
      input = refForSmsInput.current[0];
      vall = input?.value;
    }

    if (!vall) {
      if (input !== null) {
        input.classList.remove("valid");
        input.classList.add("invalid");
      }
      setSmsError("ورود کد پیامکی الزامی است");
      setIsDisabledCheckSmsBtn(true);
      refForCheckSmsBtn.current?.classList.add(Styles.disabledBtn);
      refForCheckSmsBtn.current?.classList.remove(Styles.btn);
    } else {
      if (input !== null) {
        input.classList.remove("invalid");
        input.classList.add("valid");
      }
      setSmsError("");
      setIsDisabledCheckSmsBtn(false);
      refForCheckSmsBtn.current?.classList.remove(Styles.disabledBtn);
      refForCheckSmsBtn.current?.classList.add(Styles.btn);
    }

    if (input) {
      setSmsVal(input.value);
    }
  }

  function smsTxtKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      checkSmsForLogin();
    }
  }

  function backBtnClick() {
    setError("");
    setCurrentPage("firstPage");
    setBackBtnCliked(true);
    setMobileCheckBtn(false);
    // setIsDisabledMobileCheckBtn(false);   //zare_nk_040224_added(ehtemalan niazi nist chon alanam false hast.chon unmount ke nashodim az in component)
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "row",
        justifyContent: "center",
        minHeight: "100vh",
        alignItems: "center",
        backgroundColor: 'white',
      }}
    >
      <form
        id="loginForm"
        onSubmit={(event) => {
          event.preventDefault();
        }}
        className={`${Styles.loginForm} ${Styles.valueStyle}`}
      >
        <div
          className={Styles.formsRow}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img
            src="https://img.tochikala.com/Logo/photo14359415832-Copy.jpg"
            style={{ width: "55px" }}
            alt="کرفو"
          ></img>
        </div>

        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
        {currentPage == "firstPage" ? (
          <FirstPageComponent
            mobileButtonClick={mobileButtonClick}
            mobileVal={mobileVal}
            mobileChanged={mobileChanged}
            mobileError={mobileError}
            refForMobileInput={refForMobileInput}
            refForMobileCheckBtn={refForMobileCheckBtn}
            isDisabledMobileCheckBtn={isDisabledMobileCheckBtn}
            setIsDisabledMobileCheckBtn={setIsDisabledMobileCheckBtn}
            backBtnCliked={backBtnCliked}
            setBackBtnCliked={setBackBtnCliked}
            handleGoogleLogin={handleGoogleLogin}
          >
            تایید
          </FirstPageComponent>
        ) : (
          <SecondPageComponent
            smsVal={smsVal}
            smsTxtChanged={smsTxtChanged}
            smsTxtKeyDown={smsTxtKeyDown}
            backBtnClick={backBtnClick}
            checkSmsForLogin={checkSmsForLogin}
            ResendCodefunc={ResendCodefunc} //zare_nk_040226_added
            isDisabledCheckSmsBtn={isDisabledCheckSmsBtn}
            setIsDisabledCheckSmsBtn={setIsDisabledCheckSmsBtn}
            refForCheckSmsBtn={refForCheckSmsBtn}
            refForSmsInput={refForSmsInput}
            smsError={smsError}
            mobileCheckBtn={mobileCheckBtn}
            setMobileCheckBtn={setMobileCheckBtn}
            mobileVal={mobileVal}
            setMobileVal={setMobileVal}
            error={error}
            setError={setError}
            timer={timer}
            setTimer={setTimer}
            isDisabledResendCode={isDisabledResendCode}
            setIsDisabledResendCode={setIsDisabledResendCode}
            isDisabledRemovTimerBtn={isDisabledRemovTimerBtn}
            setIsDisabledRemovTimerBtn={setIsDisabledRemovTimerBtn}
          ></SecondPageComponent>
        )}
      </form>
    </div>
  );
}
