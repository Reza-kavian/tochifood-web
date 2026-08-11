////zare_nk_050504_okk(1)
"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Styles from "@/styles/components/login.module.css";
import { RefObject } from "react";
import { ReactNode } from "react";
import { ChangeEvent } from "react";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { factchecktools } from "googleapis/build/src/apis/factchecktools";

import { NextJsApiUrl } from "../../constants/Urls";  ////zare_nk_050407_added

import { jwtDecode } from "jwt-decode";

interface MyJwtPayload {
  FullName: string | null;
  Mobile: string | null;
  IdUser: number | null;
  exp: number | null;
  // .
  // .
  [key: string]: any;
}

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
  refForIconInMobileCheckBtn: RefObject<HTMLImageElement | null>;   //zare_nk_050215_added(useRefe icone dakhele dokmeye mobileCheckBtn)
  isDisabledMobileCheckBtn: boolean; //zare_nk_040527_nokteh(state shamele meghdare booliane attribute disabled dokmeye mobileCheckBtn )
  setIsDisabledMobileCheckBtn: React.Dispatch<React.SetStateAction<boolean>>; //zare_nk_040527_nokteh(setState meghdardehiye booleane attribute disabled dokmeye mobileCheckBtn )
  backBtnCliked: boolean; //zare_nk_040527_nokteh(state shamele meghdare booliane clicke dokmeye backToFirsPage)
  setBackBtnCliked: React.Dispatch<React.SetStateAction<boolean>>; //zare_nk_040527_nokteh(setState meghdardehiye booleane state backBtnCliked marboot be dokmeye backToFirsPage)
  handleGoogleLogin: () => void; //zare_nk_040527_nokteh(rooydade clicke dokmeye handleGoogleBtn)
  isMobileTextEmty: boolean  //zare_nk_041227_added
  setIsMobileTextEmty: React.Dispatch<React.SetStateAction<boolean>>;  //zare_nk_041227_added 
  error: string | null;  //zare_nk_050105_added
  children?: ReactNode; //zare_nk_040527_nokteh(mohtaviati ke dakhele blocke seda zadane componente FirstPageComponent minevisim)
};

function FirstPageComponent({
  mobileButtonClick,
  mobileVal,
  mobileChanged,
  mobileError,
  refForMobileInput,
  refForMobileCheckBtn,
  refForIconInMobileCheckBtn,    //zare_nk_050215_added
  isDisabledMobileCheckBtn,
  setIsDisabledMobileCheckBtn,
  backBtnCliked,
  setBackBtnCliked,
  handleGoogleLogin,
  isMobileTextEmty,  //zare_nk_041227_added
  setIsMobileTextEmty,   //zare_nk_041227_added
  error, //zare_nk_050105_added
  children,
}: FirstPageProps) {

  const [isInputFocused, setIsInputFocused] = useState(false); // state برای مدیریت فوکوس

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  useEffect(() => {
    if (backBtnCliked == true) {
      if (refForMobileInput.current[0]) {
        mobileChanged(refForMobileInput.current[0]);   ////zare_nk_040527_nokteh(shabihsaziye rooydade onChange textboxe mobile ke methode mobileChanged seda zadeh mishod, in ra
        ////  be niate berooz shodane mobileError seda mizanim)
      }
    }
  }, [backBtnCliked]);

  return (
    <>
      <div style={{ position: 'absolute', padding: '1rem', width: "100%", backgroundColor: 'white', }}>
        {error && <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>{error}</p>}
        <form
          id="loginForm"
          onSubmit={(event) => {
            event.preventDefault();
          }}
          className={`${Styles.loginForm} ${Styles.valueStyle}`}>

          <div className={`${Styles.formsRow}`}>
            <p className={`${Styles.titleStyle}`} style={{ fontSize: '16px', color: '#1b1c1d', marginBottom: '0px', }}>ثبت&zwnj;نام یا ورود</p>
            <p className={`${Styles.valueStyle}`} style={{ fontSize: '14px', color: '#878b92', marginBottom: '0px', paddingTop: '.25rem' }}>برای آمدن به توچی&zwnj;فود، شماره موبایلت را وارد کن</p>
          </div>

          <div className={`${Styles.MobileInputAndCheckBtnCont}`} >
            <button
              ref={refForMobileCheckBtn}
              id="mobileCheckBtn"
              className={Styles.disabledBtn}
              onClick={mobileButtonClick}
              disabled={isDisabledMobileCheckBtn}>
              {/* #878b92 */}
              <img
                ref={refForIconInMobileCheckBtn}            //zare_nk_050215_added
                // className={`${Styles.IconIndisabledBtn}`}   //zare_nk_050215_added(and commented(chon style fill baraye tage img ke sourcesh 
                //// svg hast amal nemikoneh va barnameh entezar dare ke dar code haye khode svg css fill ro lahaz konim ke amal koneh ))
                // style={{ transform: 'rotate(180deg)' }}  //zare_nk_050215_commented(bordamesh be code svg)
                // src="/images/login/checkMobile.svg"  
                src="/images/login/IconIndisabledBtn.svg"  //zare_nk_050215_added
                alt="ذخیره موبایل"
              />
            </button>

            <div style={{
              display: "flex",
              position: 'relative',
              flex: '1 0 auto'
            }}>
              <div className={`${Styles.translateDiv} ${isInputFocused || !isMobileTextEmty ? Styles.animateFocus : Styles.animateBlur}`}>
                <span style={{ width: '100%' }}>شماره موبایل</span>
              </div>
              <input
                className={Styles.mobileTxtBox}
                id="mobileTxt"
                value={mobileVal}
                onChange={mobileChanged}
                ref={(e) => {
                  refForMobileInput.current[0] = e;
                }}
                onFocus={handleFocus} // اضافه کردن onFocus
                onBlur={handleBlur}   // اضافه کردن onBlur 
              />
            </div>
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
          <p style={{ color: '#878b92', fontSize: '.75rem', lineHeight: '1rem', }}>با ثبت&zwnj;نام در توچی&zwnj;فود، <a style={{ fontWeight: 500, color: '#ff5900', textDecoration: 'none', }} href="/terms-and-conditions">شرایط و قوانین</a> را قبول می&zwnj;کنم</p>
        </form>
      </div>
    </>
  );
}

type SecondPageProps = {
  smsVal: string;  ////zare_nk_040525_nokteh(shamele meghdare sms varedehye karbar)
  smsTxtChanged: (e: ChangeEvent<HTMLInputElement>) => void;  ////zare_nk_040525_nokteh(rooydade onChange textboxe smsValTxt)
  // smsTxtKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void; //zare_nk_040525_nokteh(rooydade onKeyDown textboxe smsValTxt)
  backBtnClick: () => void; //zare_nk_040525_nokteh(rooydade clicke dokmeye backToFirsPage)
  checkSmsForLogin: (sms: string) => void; //zare_nk_040525_nokteh(rooydade clicke dokmeye vorood)
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
  newSmsVal: string,   ////zare_nk_050103_added
  setNewSmsVal: React.Dispatch<React.SetStateAction<string>>;  ////zare_nk_050103_added
  newSmsTxtChanged: (textVaredeh: string, index: number) => void;  ////zare_nk_050103_added
  smsInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;  ////zare_nk_050105_added
  SmsInputRefs: RefObject<(HTMLInputElement | null)[]>;  ////zare_nk_050105_added
};

function SecondPageComponent({
  smsVal,
  smsTxtChanged,
  // smsTxtKeyDown,
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
  newSmsVal,     //zare_nk_050103_added
  setNewSmsVal,  //zare_nk_050103_added
  newSmsTxtChanged,  //zare_nk_050103_added
  smsInputKeyDown,  //zare_nk_050105_added
  SmsInputRefs,  //zare_nk_050105_added 
}: SecondPageProps) {
  var refForResendCode = useRef(null); //zare_nk_040527_nokteh(useRefe dokmeye ersale mojadad )
  var refForRemovTimer = useRef(null); //zare_nk_040527_nokteh(useRefe dokmeye resete timer )
  const [timerDisplay, setTimerDisplay] = useState("flex"); //zare_nk_040527_nokteh(state haviye meghdare flex pedare timer)
  const [removTimer, setRemovTimer] = useState(false); //zare_nk_040527_nokteh(state haviye meghdare boolean baraye taeine reset kardan timer ya na)
  const refForTimer = useRef<HTMLDivElement | null>(null); // zare_nk_040527_nokteh(useRefe tage timermoveOpportunity ke timer ra namayesh midad )
  var refForTimerCont = useRef(null); //zare_nk_040527_nokteh(useRefe tage timermoveOpportunityCont pedare tage timermoveOpportunity ast)
  const intervalRef = useRef<null | ReturnType<typeof setInterval>>(null); //zare_nk_040527_nokteh(useRefe modiriate timer)

  const [arrayForSmsVal, setArrayForSmsVal] = useState(['', '', '', '', '']);  //zare_nk_050103_added
  // const [newSmsVal, setNewSmsVal] = useState('');  //zare_nk_050103_added

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
            // refForTimer.current.innerHTML =
            //   hToString != "00"
            //     ? '<span style="border-radius:5px;width:30px;height:30px;background-color:red;color:white;display:flex;justify-content:center;align-items:center;">' +
            //     hToString +
            //     "</span>" +
            //     '<span style="color:red;padding:0px 5px;display:flex;justify-content:center;align-items:center;">:</span>' +
            //     '<span style="border-radius:5px;width:30px;height:30px;background-color:red;color:white;display:flex;justify-content:center;align-items:center;">' +
            //     mToString +
            //     "</span>" +
            //     '<span style="color:red;padding:0px 5px;display:flex;justify-content:center;align-items:center;">:</span>' +
            //     '<span style="border-radius:5px;width:30px;height:30px;background-color:red;color:white;display:flex;justify-content:center;align-items:center;">' +
            //     sToString +
            //     "</span>"
            //     : '<span style="border-radius:5px;width:30px;height:30px;background-color:red;color:white;display:flex;justify-content:center;align-items:center;">' +
            //     mToString +
            //     "</span>" +
            //     '<span style="color:red;padding:0px 5px;display:flex;justify-content:center;align-items:center;">:</span>' +
            //     '<span style="border-radius:5px;width:30px;height:30px;background-color:red;color:white;display:flex;justify-content:center;align-items:center;">' +
            //     sToString +
            //     "</span>";

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
                :
                '<span style="color:#b7bdc2;padding:0px 5px;display:flex;justify-content:center;align-items:center;font-size: .875rem;">تا درخواست دوباره</span>' +
                // '<span style="border-radius:5px;width:30px;height:30px;background-color:red;color:white;display:flex;justify-content:center;align-items:center;">' +
                // mToString +
                // "</span>" +
                // '<span style="color:red;padding:0px 5px;display:flex;justify-content:center;align-items:center;">:</span>' +
                // '<span style="border-radius:5px;width:30px;height:30px;background-color:red;color:white;display:flex;justify-content:center;align-items:center;">' +
                // sToString +
                // "</span>";
                '<span style="border-radius:5px;widthh:30px;heightt:30px;background-colorr:red;color:#b7bdc2;display:flex;justify-content:center;align-items:center;font-size: .875rem;">' +
                mToString +
                "</span>" +
                '<span style="color:#b7bdc2;padding:0px 3px;display:flex;justify-content:center;align-items:center;font-size: .875rem;">:</span>' +
                '<span style="border-radius:5px;widthh:30px;heightt:30px;background-colorr:red;color:#b7bdc2;display:flex;justify-content:center;align-items:center;font-size: .875rem;">' +
                sToString +
                "</span>";

            refForTimer.current.style.cursor = 'not-allowed';

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

  useEffect(() => {    ////zare_nk_050208_nokteh(dar in useEffect migim age mobileCheckBtn true bood smsTxtChanged ra ba evente sooriye fakeEvent seda bezan(in kar ra 
    //// baraye modiriate khata vaghti karbar az safhe do back zad va mojadad dokmeye checMobb ra zad va sms hast hanooz dar text boxesh vali age khataei dar formatesh 
    //// bood state modiraiate an khata age meghdaresh hazf shod dobare meghdar begireh) )
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
      <div style={{ position: 'absolute', padding: '1rem', width: "100%", backgroundColor: 'white', }}>
        {error && <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>{error}</p>}

        <div className={`${Styles.darkFont}`}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', justifyItems: 'flex-start', textAlign: 'right', }}>

          <p className={`${Styles.titleStyle}`} style={{ fontSize: '16px', color: '#1b1c1d', marginBottom: '0px', }}>تایید شماره موبایل</p>

          <p className={`${Styles.valueStyle}`} style={{ fontSize: '14px', color: '#878b92', marginBottom: '0px', paddingTop: '.25rem' }}>کد تأیید ارسال&zwnj;شده به شماره
            &zwnj;{mobileVal}&zwnj;
            را وارد کن</p>
        </div>

        <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'center', columnGap: '1rem', marginTop: '2.5rem', }}>
          {
            arrayForSmsVal.map((valueAndGrad, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'white', border: '1px solid #e0e3e5', maxWidth: '3.5rem', display: 'flex', justifyContent: 'center',
                    alignItems: 'center', height: '3.5rem', padding: '1rem 0.75rem', borderRadius: '0.75rem',
                  }}>
                  <input
                    key={index}
                    maxLength={1}   // فقط یک کاراکتر مجاز است
                    // className={Styles.txtBox}
                    // id="smsValTxt"
                    // value={arrayForSmsVal[index]}
                    // onChange={newSmsTxtChanged(valueAndGrad, index)}
                    onChange={(e) => {
                      let tempArrayForSmsVal = arrayForSmsVal;
                      // tempArrayForSmsVal[index];  //zare_nk_050128_commented
                      tempArrayForSmsVal[index] = e.target.value;  //zare_nk_050128_added
                      console.log('arrayForSmsVal is: ' + JSON.stringify(arrayForSmsVal));
                      setArrayForSmsVal(tempArrayForSmsVal);
                      newSmsTxtChanged(e.target.value, index);
                    }}
                    onKeyDown={(e) => {
                      smsInputKeyDown(e, index);
                    }}
                    // onKeyDown={smsTxtKeyDown}

                    ref={(e) => {
                      // refForSmsInput.current[0] = e;
                      SmsInputRefs.current[index] = e;
                    }}
                    style={{ border: 'none', width: '100%', color: '#a5abb1', fontSize: '0.875rem', lineHeight: '1.25rem', textAlign: 'center', outline: '2px solid transparent' }}
                    onFocus={(e) => {
                      setTimeout(() => {
                        e.target.select();
                        //  SmsInputRefs.current[index]?.select();
                      }, 0);
                    }}
                  // onBlur={handleBlur}          //zare_nk_050105_olgu
                  />
                </div>
              )
            })
          }
        </div>

        {smsError && (
          <div className={`${Styles.formsRow} ${Styles.warningCont}`}>
            <span className="forErrorMobile error">{smsError}</span>
          </div>
        )}

        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
          paddingBottom: '1.25rem', paddingLeft: '1.25rem', paddingRight: '1.25rem', marginTop: '1.75rem',
        }}>
          {!isDisabledResendCode ?
            (<button
              id="ResendCode"
              ref={refForResendCode}
              onClick={ResendCodefunc}
              disabled={isDisabledResendCode}
              className={`${Styles.BackBtn}  ${Styles.buttonHover}`}

            >
              <div className={`${Styles.BackImgCont} `}>
                <img
                  src="/images/login/request-again.svg"
                  style={{ width: "18px" }}
                  alt="درخواست مجدد"
                />
              </div>
              <div className={`${Styles.BackBtnTitleCont} `}>
                <span style={{ color: '#ff5900' }}>درخواست دوباره</span>
              </div>
            </button>
            ) :
            (<div
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
            </div>)
          }
          {/* zare_nk_050102_added_st */}
          {/* <div className={Styles.formsRow} style={{ direction: "rtl" }}> */}
          <button
            id="backToFirsPage"
            className={`${Styles.BackBtn}  ${Styles.buttonHover}`}
            onClick={backBtnClick}
          >
            <div className={`${Styles.BackImgCont} `}>
              <img
                // src="https://img.tochikala.com/tochikala/back-icon-in-cardcontainer.svg"
                src="/images/login/return-to-mpbilenumber.svg"
                style={{ width: "18px" }}
                alt="ویرایش موبایل"
              />
            </div>
            <div className={`${Styles.BackBtnTitleCont} `}>
              <span style={{ color: '#ff5900' }}>ویرایش موبایل</span>
            </div>
          </button>
          {/* </div> */}
          {/* zare_nk_050102_added_end */}
        </div>

        <div className={Styles.formsRow}>
          {/* <button
            ref={refForRemovTimer}
            className={Styles.btn}
            onClick={() => {
              return setRemovTimer(true);
            }}
            disabled={isDisabledRemovTimerBtn}
          >
            ریست تایمر
          </button> */}

        </div>

      </div>
    </>
  );
}

export default function Login() {
  console.log('zare_nk_050520_Login rendered!!');
  const [currentPage, setCurrentPage] = useState("firstPage");
  const [mobileVal, setMobileVal] = useState("");
  const [isMobileTextEmty, setIsMobileTextEmty] = useState(true);  //zare_nk_041227_added
  const [smsVal, setSmsVal] = useState("");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [mobileError, setMobileError] = useState("");
  const [smsError, setSmsError] = useState("");
  const refForMobileInput = useRef<(HTMLInputElement | null)[]>([]);
  const refForSmsInput = useRef<(HTMLInputElement | null)[]>([null]);
  const refForMobileCheckBtn = useRef<HTMLButtonElement | null>(null);
  const refForIconInMobileCheckBtn = useRef<HTMLImageElement | null>(null);  //zare_nk_050215_added

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

  const [newSmsVal, setNewSmsVal] = useState('');  //zare_nk_050103_added

  const SmsInputRefs = useRef<HTMLInputElement[]>(Array(5).fill(null));   //zare_nk_050105_added(and commented(baraye reactNative mehvar boodan))
  // const [focusArray, setFocusArray] = useState<number[] | null>(Array(5).fill(null));  //zare_nk_050105_added(baraye reactNative mehvar boodan)
  // const inputsRef = Array.from({ length: 5 }, () => React.createRef());  //zare_nk_050105_added(mansookh dar noskhehaye jadide react)
  // const inputRefs = useRef<(number[])[]>(Array(5).fill(null)); //zare_nk_050105_added(modern dar noskhehaye jadide react)
  const [focusItem, setFocusItem] = useState<number>(0);  //zare_nk_050105_added

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
            setMobileError("ورود شماره تماس الزامی است");   ////zare_nk_040224_added(rahe3-ba useState-reactpasandtarine)
          }
        }
      });

    if (!errorFree) {
      return;
    }

    try {
      // var ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented 
      const response = await fetch(NextJsApiUrl + "Api_LoginUser1", {
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

  async function checkSmsForLogin(sms: string) {
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

    // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented 
    console.log('mobileVal: ' + NextJsApiUrl + '-newSmsVal: ' + newSmsVal);
    try {
      const response = await fetch(NextJsApiUrl + "Api_LoginUser2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //// Authorization: "Bearer " + token,   
        },
        body: JSON.stringify({
          Mobile: mobileVal,
          // SmsCode: smsVal,  //zare_nk_050105_commented
          SmsCode: sms,  //zare_nk_050105_added
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

          ////zare_nk_041114_added_st(and commented. chon methode HttpContext.SignInAsync ro anjam mideh baraye online kardan be sabke HttpContext marboot be .net core c# 
          // vali man ino nemikham chon hamin cookie token sakhtan baram kafiye be onvane amale online kardan va amale estelame online boodane karbar. dar zemn ma dar view haye c#
          // ke nistim ba hamin emkanate HttpContext mesle(HttpContextAccessor.HttpContext!.User.Identity!.IsAuthenticated) baraye estelame online boodan estefadeh konim!
          // pas az haman sakhte va vakeshiye cookie haviye token ke name token ra behesh dadam baraye moshakhas kardane online shodan va estelame online boodaanesh estefadeh mikonam
          //va in kar ra dar methode verifyToken gonjandim)

          //           let ApiUrl = "https://api.tochikala.com/api/User/";
          // const responseValidationPost = await fetch(ApiUrl +"ValidationPost", {
          //             method: "POST",
          //             headers: { "Content-Type": "application/json" },
          //             body: JSON.stringify({ token }),
          //           });
          ////zare_nk_041114_added_end(and commented. chon methode HttpContext.SignInAsync ro anjam mideh baraye online kardan be sabke HttpContext marboot be .net core c# 
          // vali man ino nemikham chon hamin cookie token sakhtan baram kafiye be onvane amale online kardan va amale estelame online boodane karbar. dar zemn ma dar view haye c#
          // ke nistim ba hamin emkanate HttpContext mesle(HttpContextAccessor.HttpContext!.User.Identity!.IsAuthenticated)baraye estelame online boodan estefadeh konim!
          // pas az haman sakhte va vakeshiye cookie haviye token ke name token ra behesh dadam baraye moshakhas kardane online shodan va estelame online boodaanesh estefadeh mikonam
          //va in kar ra dar methode verifyToken gonjandim)

          const DecodeToken = jwtDecode<MyJwtPayload>(token);
          console.log('zare_nk_050501_DecodeToken is: ' + JSON.stringify(DecodeToken));
          const expires = (DecodeToken.exp ?? 0) * 1000; ////zare_nk_050501_nokteh(lahaz kardane expires az tokene pasokhe apiye Api_LoginUser2(chon bar hasbe saniye ast 
          //// be milisaniye tabdil kardim ba 1000 barabar kardan))    
 
          ////zare_nk_040925-decodedToken: {"IdUser":"10006","Mobile":"9351091287","FullName":"رضا کاویان","Type":"User","nbf":1770193087,"exp":1772785087,"iat":1770193087}  //zare_nk_041115_nokteh(from api tochikala)
          ////zare_nk_040925-decodedToken: {"unique_name":"20109","CodeMoshtari":"20109","Mobile":"9351091287","NameMoshtari":"","nbf":1750740741,"exp":1751345541,"iat":1750740741}  //zare_nk_041115_nokteh(from api testotmapi)
          // const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString();  //zare_nk_040219-nokteh(zamane monghazi ra khodam taein kardam, 1 saate bad)   
          // const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();  //zare_nk_050118-nokteh(zamane monghazi ra khodam taein kardam, 30 rooze bad) 
          // const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();  //zare_nk_050118-nokteh(zamane monghazi ra khodam taein kardam, 1 rooze bad) 
          // const expires = data.decoded.exp * 1000;   ////zare_nk_050504_nokteh(lahaz kardane expires az tokene pasokhe apiye Api_LoginUser2(chon bar hasbe saniye ast 

          document.cookie = `token=${token}; path=/; expires=${expires}; secure; samesite=None`;
          const redirect = getCookie("redirect") || "/";
          document.cookie = "redirect=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC"; // حذف کوکی
          console.log('redirect iss: ' + getCookie("redirect"));
          console.log('zare_nk_050110-token is: ' + getCookie("token"));
          router.replace(redirect); //zare_nk_040228_commented(and zare_nk_040312 uncommented(chon safheh ro refresh nemikoneh va behtare ehtemalan))
          // NextResponse.redirect(new URL("/login", request.url));//zare_nk_040228_added
          // window.location.href = redirect;
          // window.location.replace(redirect); //zare_nk_040312_commented(chon router.replace ya router.push safheh ro kamel refresh nemikonam behtare)
        }
      } else {
        ////zare_nk_050111_commented_movaghat_st(hengame nayamadane sms az sms.ir bekhatere ekhtelele zirsakht)
        document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        document.cookie = `google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        setError("متاسفانه خطایی رخ داده است34:" + data.errors);
        ////zare_nk_050111_commented_movaghat_end(hengame nayamadane sms az sms.ir bekhatere ekhtelele zirsakht)

        ////zare_nk_050111_added_movaghat_st(hengame nayamadane sms az sms.ir bekhatere ekhtelele zirsakht)
        // alert('ddddddddddddddddd');
        // const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
        // //  const expires = data.decoded.exp;//zare_nk_040219-nokteh(zamane monghazi ra az dadeye parsafar taein kardam)
        // let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwMTA5IiwiQ29kZU1vc2h0YXJpIjoiMjAxMDkiLCJNb2JpbGUiOiI5MzUxMDkxMjg3IiwiTmFtZU1vc2h0YXJpIjoiIiwibmJmIjoxNzQ2NzI1OTI4LCJleHAiOjE3NDczMzA3MjgsImlhdCI6MTc0NjcyNTkyOH0.9Jfv71v3D_s13gSyf3gXqgEfiXaV-lx93hDey4DSLM8";
        // document.cookie = `token=${token}; path=/; expires=${expires}; secure; samesite=None`;
        // const redirect = getCookie("redirect") || "/";
        // document.cookie =
        //   "redirect=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC"; // حذف کوکی
        // console.log('zare_nk_050111-redirect iss: ' + getCookie("redirect"));
        // console.log('zare_nk_050111-token is: ' + getCookie("token"));
        // router.replace(redirect);
        ////zare_nk_050111_added_movaghat_end(hengame nayamadane sms az sms.ir bekhatere ekhtelele zirsakht)
      }
    }
    catch (error) {
      document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      document.cookie = `google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      console.error("zare_nk_040925-❌ خطااااااااااااااااااای JWT:", error); 
      if (error instanceof Error) {
        setError("متاسفانه خطایی رخ داده است323:" + error.message);
      } else {
        setError("متاسفانه خطایی رخ داده است343:" + String(error));
      } 
    } 
  }

  async function ResendCodefunc() {
    // alert('ResendCodefunc called!!');
    let token = "";
    if (typeof window !== "undefined") {
      token = localStorage.getItem("Token") || "";
    }
    try {
      // var ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented 
      const response = await fetch(NextJsApiUrl + "Api_LoginUser1", {
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
      setIsMobileTextEmty(true);
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
      ////zare_nk_050215_added_st
      if (refForIconInMobileCheckBtn.current) {
        refForIconInMobileCheckBtn.current.src = "/images/login/IconIndisabledBtn.svg";
      }
      ////zare_nk_050215_added_end

    } else if (!isMobileNum) {
      setIsMobileTextEmty(false);
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
      ////zare_nk_050215_added_st
      if (refForIconInMobileCheckBtn.current) {
        refForIconInMobileCheckBtn.current.src = "/images/login/IconIndisabledBtn.svg";
      }
      ////zare_nk_050215_added_end
    } else {
      setIsMobileTextEmty(false);
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
      ////zare_nk_050215_added_st
      if (refForIconInMobileCheckBtn.current) {
        refForIconInMobileCheckBtn.current.src = "/images/login/IconInBtn.svg";
      }
      ////zare_nk_050215_added_end
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
      ////zare_nk_050119_nokteh(albateh ba estefadeh az tarfande evente fake hamvare be if balaei mirim yani event.target khahim dasht)
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

  function newSmsTxtChanged(textVaredeh: string, index: number) {
    // alert('newSmsTxtChanged');
    setError("");
    // var input = null;
    // var vall = null;
    // if (event.target != undefined) {
    //   //zare_nk_040224_nokteh(age ba taghire mohtavaye smsValTxt tavasote karbar biaim dar methode smsTxtChanged)
    //   input = event.target;
    //   vall = input.value;
    // } else {
    //   //zare_nk_040224_nokteh(age ba taghire mohtavaye smsValTxt tavasote dokmeye mobileCheckBtn biaim dar methode smsTxtChanged)
    //   input = refForSmsInput.current[0];
    //   vall = input?.value;
    // }

    // let vall: string = textVaredeh;
    let tempnewSmsVal = '';
    ////zare_nk_050211_nokteh_st(rahe smschandtaei01, commnet shod chon faghat be tartib ezafe mikone, age inpute vasatiha ro tagheir bedim charachtere varedeh eshtebahi dar entehaye resheteheye newSmsVal darj mishe)
    // tempnewSmsVal += vall;   
    // setNewSmsVal(tempnewSmsVal);
    ////zare_nk_050211_nokteh_end(rahe smschandtaei01, commnet shod chon faghat be tartib ezafe mikone, age inpute vasatiha ro tagheir bedim charachtere varedeh eshtebahi dar entehaye resheteheye newSmsVal darj mishe)
    console.log('rahe ghabli-tempnewSmsVal: ' + tempnewSmsVal);

    ////zare_nk_050211_nokteh_st(rahe smschandtaei02, rahe doroste-halle taghse smschandtaei01)
    SmsInputRefs.current.map((inputItem, index) => {
      let inputItemVal = SmsInputRefs.current[index].value;
      tempnewSmsVal += inputItemVal;
      console.log('index: ' + index + '-tempnewSmsVal: ' + tempnewSmsVal);
      if (index == 4) {
        console.log('index is chahar-tempnewSmsVal: ' + tempnewSmsVal);
        setNewSmsVal(tempnewSmsVal);
      }
    });
    ////zare_nk_050211_nokteh_end(rahe smschandtaei02, rahe doroste-halle taghse smschandtaei01) 

    if (!tempnewSmsVal) {
      // setFocusItem(0);  //zare_nk_050105_aaded(shayad niazi behesh nabashe!)
      SmsInputRefs.current[0]?.focus();
      // if (input !== null) {
      //   input.classList.remove("valid");
      //   input.classList.add("invalid");
      // }
      setSmsError("ورود کد پیامکی الزامی است");
      setIsDisabledCheckSmsBtn(true);
      // refForCheckSmsBtn.current?.classList.add(Styles.disabledBtn);
      // refForCheckSmsBtn.current?.classList.remove(Styles.btn);
    } else {
      // if (input !== null) {
      //   input.classList.remove("invalid");
      //   input.classList.add("valid");
      // }
      setSmsError("");
      setIsDisabledCheckSmsBtn(false);
      // refForCheckSmsBtn.current?.classList.remove(Styles.disabledBtn);
      // refForCheckSmsBtn.current?.classList.add(Styles.btn);
      if (index < 4) {
        // setFocusItem(index + 1);  //zare_nk_050105_aaded 
        SmsInputRefs.current[index + 1]?.focus();
      }
      else {
        checkSmsForLogin(tempnewSmsVal);
      }
    }

    // if (input) {
    //   setSmsVal(input.value);
    // }
  }

  // alert('Login rerendered!!');
  // useEffect(() => {
  //   // if (backBtnCliked == true) {
  //   //   if (refForMobileInput.current[0]) {
  //   //     mobileChanged(refForMobileInput.current[0]); //zare_nk_040527_nokteh(shabihsaziye rooydade onChange textboxe mobile ke metode mobileChanged seda zadeh mishod)
  //   //   }
  //   // }
  //   alert('useEffect focusItem called!!');
  //   SmsInputRefs.current[focusItem]?.focus();
  // },[focusItem]);

  // function smsTxtKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
  //   if (event.key === "Enter") {
  //     event.preventDefault();
  //     checkSmsForLogin();
  //   }
  // }

  const smsInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // alert('smsInputKeyDown');
    if (event.key === " " || event.key === "Space") {
      event.preventDefault();
    }
    if (event.key === "Enter") {
      // alert('smsInputKeyDown-Enter-index: ' + index);  
      // setFocusItem(index + 1);
      SmsInputRefs.current[index + 1]?.focus();
    }
    if (event.key === "ArrowRight") {
      // alert('smsInputKeyDown-ArrowRight-index: ' + index);
      // setFocusItem(index + 1);
      SmsInputRefs.current[index + 1]?.focus();
    }
    if (event.key === "ArrowLeft") {
      // alert('smsInputKeyDown-ArrowLeft-index: ' + index);
      // setFocusItem(index - 1);
      SmsInputRefs.current[index - 1]?.focus();
    }
  };

  function backBtnClick() {
    setError("");
    setCurrentPage("firstPage");
    setBackBtnCliked(true);
    setMobileCheckBtn(false);
    // setIsDisabledMobileCheckBtn(false);   //zare_nk_040224_added(ehtemalan niazi nist chon alanam false hast.chon unmount ke nashodim az in component)
  }

  return (
    <>
      <header></header>
      <main
        style={{
          backgroundColor: 'white',
          height: '100dvh',
          display: "flex",
          flexDirection: 'column',
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          flex: '1 0 auto',
          // border: '2px dashed red',
        }}>
        <div
          style={{
            width: "100%",
            flexShrink: 0,
            // flexFlow: "row",            
            // display: "flex",
            // justifyContent: "center", 
            // border: '2px solid black',
          }} >
          <svg
            viewBox="0 0 500 500"
            width="500"
            height="500"
            preserveAspectRatio="xMidYMid meet"
            style={{
              width: '100%',
              height: '100%',
              transform: 'translate3d(0px, 0px, 0px)',
              contentVisibility: 'visible',
            }}
          >
            <defs>
              <clipPath id="__lottie_element_2">
                <rect width="500" height="500" x="0" y="0" />
              </clipPath>
            </defs>

            <g clipPath="url(#__lottie_element_2)">
              <g style={{ display: 'block' }} transform="matrix(1,0,0,1,0,0)" opacity="1">
                <g opacity="1" transform="matrix(1,0,0,1,250,194.48699951171875)">
                  <path
                    fill="rgb(223,227,228)"
                    fillOpacity="1"
                    d="M0,-41.6349983215332C-22.89900016784668,-41.6349983215332-41.6349983215332,-22.89900016784668-41.6349983215332,0C-41.6349983215332,22.89900016784668-22.89900016784668,41.6349983215332,0,41.6349983215332C22.89900016784668,41.6349983215332,41.6349983215332,22.89900016784668,41.6349983215332,0C41.6349983215332,-23.593000411987305,22.89900016784668,-41.6349983215332,0,-41.6349983215332z"
                  />
                </g>

                <g opacity="1" transform="matrix(1,0,0,1,250,188.93600463867188)">
                  <path
                    fill="rgb(245,245,246)"
                    fillOpacity="1"
                    d="M0,-16.65399932861328C9.197999954223633,-16.65399932861328,16.65399932861328,-9.197999954223633,16.65399932861328,0C16.65399932861328,9.197999954223633,9.197999954223633,16.65399932861328,0,16.65399932861328C-9.197999954223633,16.65399932861328,-16.65399932861328,9.197999954223633,-16.65399932861328,0C-16.65399932861328,-9.197999954223633,-9.197999954223633,-16.65399932861328,0,-16.65399932861328z"
                  />
                </g>

                <g opacity="1" transform="matrix(1,0,0,1,250,223.28399658203125)">
                  <path
                    fill="rgb(182,189,194)"
                    fillOpacity="1"
                    d="M0,12.836999893188477C10.409000396728516,12.836999893188477,19.43000030517578,9.368000030517578,27.062999725341797,2.428999900817871C24.28700065612793,-8.673999786376953,13.184000015258789,-12.836999893188477,0,-12.836999893188477C-13.184000015258789,-12.836999893188477,-24.28700065612793,-8.673999786376953,-27.062999725341797,2.428999900817871C-20.124000549316406,9.368000030517578,-10.409000396728516,12.836999893188477,0,12.836999893188477z"
                  />
                </g>
              </g>

              <g transform="matrix(1,0,0,1,250,270.8169860839844)" opacity="1" style={{ display: 'block' }}>
                <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                  <path
                    fill="rgb(237,240,241)"
                    fillOpacity="1"
                    d="M76.33049774169922,-13.878499984741211C76.33049774169922,-13.878499984741211,76.33049774169922,13.878499984741211,76.33049774169922,13.878499984741211C76.33049774169922,13.878499984741211,-76.33049774169922,13.878499984741211,-76.33049774169922,13.878499984741211C-76.33049774169922,13.878499984741211,-76.33049774169922,-13.878499984741211,-76.33049774169922,-13.878499984741211C-76.33049774169922,-13.878499984741211,76.33049774169922,-13.878499984741211,76.33049774169922,-13.878499984741211z"
                  />
                </g>
              </g>

              <g
                transform="matrix(0.7697734832763672,0,0,1,226.48165893554688,270.8169860839844)"
                opacity="1"
                style={{ display: 'block' }}
              >
                <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                  <path
                    fill="rgb(204,208,212)"
                    fillOpacity="1"
                    d="M55.92850112915039,-4.800000190734863C55.92850112915039,-4.800000190734863,55.92850112915039,4.800000190734863,55.92850112915039,4.800000190734863C55.92850112915039,4.800000190734863,-55.92850112915039,4.800000190734863,-55.92850112915039,4.800000190734863C-55.92850112915039,4.800000190734863,-55.92850112915039,-4.800000190734863,-55.92850112915039,-4.800000190734863C-55.92850112915039,-4.800000190734863,55.92850112915039,-4.800000190734863,55.92850112915039,-4.800000190734863z"
                  />
                </g>
              </g>
            </g>
          </svg>
        </div>

        <div
          style={{
            width: "100%",
            height: '100%',
            display: "flex",
            flexDirection: 'column',
            // justifyContent: "center",
            // minHeight: "100vh",
            alignItems: 'stretch',
            backgroundColor: 'white',
            // padding: '1rem',
            position: 'relative',
            justifyContent: 'flex-end',
            // border: '2px dashed green',
          }}>
          {/* zare_nk_050102_commented_st(move to FirstPageComponent component) */}
          {/* <div style={{ position: 'absolute', padding: '1rem', width: "100%", backgroundColor: 'white', border:'3px dotted yellow', }}>
            <form
              id="loginForm"
              onSubmit={(event) => {
                event.preventDefault();
              }}
              className={`${Styles.loginForm} ${Styles.valueStyle}`}
            > */}
          {/* zare_nk_050102_commented_end(move to FirstPageComponent component) */}

          {error && <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>{error}</p>}

          {currentPage == "firstPage" ? (
            <FirstPageComponent
              mobileButtonClick={mobileButtonClick}
              mobileVal={mobileVal}
              mobileChanged={mobileChanged}
              mobileError={mobileError}
              refForMobileInput={refForMobileInput}
              refForMobileCheckBtn={refForMobileCheckBtn}
              refForIconInMobileCheckBtn={refForIconInMobileCheckBtn}  // zare_nk_050515_added  
              isDisabledMobileCheckBtn={isDisabledMobileCheckBtn}
              setIsDisabledMobileCheckBtn={setIsDisabledMobileCheckBtn}
              backBtnCliked={backBtnCliked}
              setBackBtnCliked={setBackBtnCliked}
              handleGoogleLogin={handleGoogleLogin}
              isMobileTextEmty={isMobileTextEmty}
              setIsMobileTextEmty={setIsMobileTextEmty}
              error={error}   //zare_nk_050105_added
            >
              تایید
            </FirstPageComponent>
          ) : (
            <SecondPageComponent
              smsVal={smsVal}
              smsTxtChanged={smsTxtChanged}
              // smsTxtKeyDown={smsTxtKeyDown}
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
              newSmsVal={newSmsVal}     //zare_nk_050103_added
              setNewSmsVal={setNewSmsVal}  //zare_nk_050103_added
              newSmsTxtChanged={newSmsTxtChanged}
              smsInputKeyDown={smsInputKeyDown}  //zare_nk_050105_added
              SmsInputRefs={SmsInputRefs}
            ></SecondPageComponent>
          )}
          {/* zare_nk_050102_commented_st(move to FirstPageComponent component) */}
          {/* </form>
          </div> */}
          {/* zare_nk_050102_commented_end(move to FirstPageComponent component) */}
        </div>
      </main >
      <footer></footer>
    </>
  );
}
