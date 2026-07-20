////zare_nk_050428_okk(2)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, RefObject, ReactNode, ChangeEvent, MouseEvent, createContext, useContext } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import Styles from "@/styles/components/profile-edit.module.css";
import globalsStyles from "@/styles/components/globals.module.css";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { Collapse, Button, Box, Paper, Typography, Grow, ClickAwayListener, Drawer } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

// import "@neshan-maps-platform/ol/ol.css"   ////zare_nk_050328_commented(in safhe be naghshe niazi nist ke)

import { useAuthentication } from '../../../context/AuthenticationContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from "next/link";

import SwiperGrouplevel1Comp from '../../../components/SwiperGrouplevel1Comp';

import SwiperTapBestsComp from '../../../components/SwiperTapBestsComp';  ////zare_nk_050305_added

import SwiperTopBanerComp from '../../../components/SwiperTopBanerComp';

import SwiperThinkBanerComp from '../../../components/SwiperthinkBanerComp';

import SwiperTapTimeComp from '../../../components/SwiperTapTimeComp';

import SwiperSecondBanerComp from '../../../components/SwiperSecondBanerComp';  //zare_nk_050305_added

import AdressListComponent from '../../../components/AdressListComponent';  //zare_nk_050328_added 

import { currentAddressContext } from '../../../context/currentAddressContext';  //zare_nk_050329_added 
import { json } from "node:stream/consumers";
import { relative } from "node:path";

// import TestComponent from '../components/TestComponent';  ////zare_nk_050327_added_movaghat(componente testi tamrini hast)

import { NextJsApiUrl } from "../../../constants/Urls";  ////zare_nk_050407_added

function getCookie(name: any) {
  ////zare_nk_050209_added_st
  if (typeof document === 'undefined') {
    // console.log("document === 'undefined'");
    return null; // برای جلوگیری از خطای عدم وجود document
  }
  // console.log("document !== 'undefined'");
  ////zare_nk_050209_added_end
  const value = `; ${document.cookie}`; // برای اطمینان از یافتن کوکی‌ها
  // console.log("value is: " + value);
  const parts = value.split(`; ${name}=`); // تفکیک کوکی‌ها
  if (parts.length === 2) {
    // console.log("dohe-parts.length: " + parts.length);
    const raw = parts.pop();
    if (!raw) throw new Error("No parts found");
    const value = raw.split(";").shift();
    if (!value) throw new Error("Invalid cookie format");
    return decodeURIComponent(value);
  }
  // console.log("do nist-parts.length: " + parts.length);
  return null; //اگر کوکی پیدا نشد
}

type ProfileFormInputsMatnErrorType = {
  Fname: string | null;
  Lname: string | null;
  mobile: string | null;
};
type IsProfileFormInputsFocusedType = {
  Fname: boolean;
  Lname: boolean;
  mobile: boolean;
};
type IsProfileFormInputsTextType = {
  Fname: boolean;
  Lname: boolean;
  mobile: boolean;
};
type RefForProfileFormInputsType = {
  Fname: HTMLInputElement | null;
  Lname: HTMLInputElement | null;
  mobile: HTMLInputElement | null;
};
type ProfileFormInputsType = {
  Fname: string;
  Lname: string;
  mobile: string;
};
export default function Profile() {
  const router = useRouter();
  type footerBtnClickedType = {
    home: boolean;
    orders: boolean;
    profile: boolean;
  };
  const [footerBtnClicked, setFooterBtnClicked] = useState<footerBtnClickedType>({
    home: false,
    orders: false,
    profile: true,
  });
  ////zare_nk_050429_added_st
  const [error, setError] = useState<string | null>(null);
  const [ProfileFormInputsMatnError, setProfileFormInputsMatnError] = useState<ProfileFormInputsMatnErrorType>({
    Fname: '',
    Lname: '',
    mobile: '',
  });
  const [isProfileFormInputsFocused, setIsProfileFormInputsFocused] = useState<IsProfileFormInputsFocusedType>({
    Fname: false,
    Lname: false,
    mobile: false,
  });
  const [isProfileFormInputsTextEmty, setIsProfileFormInputsTextEmty] = useState<IsProfileFormInputsTextType>({   //zare_nk_050208_nokteh(state objecti)
    Fname: true,
    Lname: true,
    mobile: true,
  });
  const refForProfileFormInputs = useRef<RefForProfileFormInputsType>({  //zare_nk_050206_nokteh(chon baraye chandin tage object gozashtim)
    Fname: null,
    Lname: null,
    mobile: null,
  });

  const handleProfileFormInputsFocus = (eventOrElement: ChangeEvent<HTMLInputElement> | HTMLInputElement | ChangeEvent<HTMLTextAreaElement> | HTMLTextAreaElement | null) => {
    var inputsName = '';
    let input: HTMLInputElement | HTMLTextAreaElement | null = null;
    // let vall: string = "";
    if (eventOrElement && "target" in eventOrElement) {
      input = eventOrElement.target;
      // vall = input.value;
      inputsName = input.name;
    } else {
      input = eventOrElement;
      // vall = input?.value ?? "";
      inputsName = input?.name ?? "";
    }
    // setIsAddressInputFocused(true);
    setIsProfileFormInputsFocused((cur) => {
      return (
        { ...cur, [inputsName]: true }
      );
    });
  };

  ////zare_nk_050206_nokteh(yek rooydade moshtarak baraye chandin tag(voroodiye chandin tag ro migireh, khoroojiye chandin tag ro mideh))
  const handleProfileFormInputsBlur = (eventOrElement: ChangeEvent<HTMLInputElement> | HTMLInputElement | ChangeEvent<HTMLTextAreaElement> | HTMLTextAreaElement | null) => {
    var inputsName = '';
    let input: HTMLInputElement | HTMLTextAreaElement | null = null;
    // let vall: string = "";
    if (eventOrElement && "target" in eventOrElement) {
      input = eventOrElement.target;
      // vall = input.value;
      inputsName = input.name;
    } else {
      input = eventOrElement;
      // vall = input?.value ?? "";
      inputsName = input?.name ?? "";
    }
    // setIsAddressInputFocused(true);
    setIsProfileFormInputsFocused((cur) => {
      return (
        { ...cur, [inputsName]: false }
      );
    });
  };

  const refForSaveProfileFormInputsBtn = useRef<HTMLButtonElement | null>(null);
  const [isDisabledsaveProfileFormInputsBtn, setIsDisabledsaveProfileFormInputsBtn] = useState(true);

  const refForLogOutBtn = useRef<HTMLButtonElement | null>(null);  ////zare_nk_050429_added


  const [ProfileFormInputsVal, setProfileFormInputsVal] = useState<ProfileFormInputsType>({
    Fname: '',
    Lname: '',
    mobile: '',
  });

  function ProfileFormInputsChanged(
    eventOrElement: ChangeEvent<HTMLInputElement> | HTMLInputElement | ChangeEvent<HTMLTextAreaElement> | HTMLTextAreaElement | null
  ) {
    var inputsName = '';
    setError(null);
    // let input: HTMLTextAreaElement | null = null;
    let input: HTMLInputElement | HTMLTextAreaElement | null = null;
    let vall: string = "";
    if (eventOrElement && "target" in eventOrElement) {
      input = eventOrElement.target;
      vall = input.value;
      inputsName = input.name;
    } else {
      input = eventOrElement;
      vall = input?.value ?? "";
      inputsName = input?.name ?? "";
    }
    // var pat = new RegExp("^[0]{1}[0123456789]{10}$");
    // var isMobileNum = pat.test(vall);
    if (!vall) {
      // setIsAddressTextEmty(true);   
      setIsProfileFormInputsTextEmty((cur) => {
        return (
          { ...cur, [inputsName]: true }
        );
      });

      if (input) {
        input.classList.remove("valid");
        input.classList.add("invalid");
      }
      // setAddressMatnError("ورود متن آدرس الزامی است");
      setProfileFormInputsMatnError((cur) => {
        return (
          { ...cur, [inputsName]: 'این بخش را خالی نگذارید' }
        );
      });

      // setIsDisabledsaveAddressFormInputsBtn(true);
      // if (refForSaveAddressFormInputsBtn.current) {
      //   refForSaveAddressFormInputsBtn.current.classList.add(Styles.disabledBtn);
      //   refForSaveAddressFormInputsBtn.current.classList.remove(Styles.btn);
      // }
    }
    // else if (!isMobileNum) {
    //   setIsAddressTextEmty(false);
    //   if (input) {
    //     input.classList.remove("valid");
    //     input.classList.add("invalid");
    //   }
    //   setAddressMatnError("فرمت متن آدرس وارده نادرست است");
    //   setAddressFormInputsMatnError((cur) => {
    //     return (
    //       { ...cur, [inputsName]: 'فرمت وارده اشتباه است' }
    //     );
    //   });
    //   setIsDisabledsaveAddressFormInputsBtn(true);
    //   if (refForSaveAddressFormInputsBtn.current) {
    //     refForSaveAddressFormInputsBtn.current.classList.add(Styles.disabledBtn);
    //     refForSaveAddressFormInputsBtn.current.classList.remove(Styles.btn);
    //   }
    // } 
    else {
      // setIsAddressTextEmty(false);  //zare_nk_050201_commented
      ////zare_nk_050201_added_st
      setIsProfileFormInputsTextEmty((cur) => {
        return (
          { ...cur, [inputsName]: false }
        );
      });
      ////zare_nk_050201_added_end
      if (input) {
        input.classList.remove("invalid");
        input.classList.add("valid");
      }
      // setAddressMatnError(null);
      setProfileFormInputsMatnError((cur) => {
        return (
          { ...cur, [inputsName]: null }
        );
      });
      // setIsDisabledsaveAddressFormInputsBtn(false);
      // if (refForSaveAddressFormInputsBtn.current) {
      //   refForSaveAddressFormInputsBtn.current.classList.remove(Styles.disabledBtn);
      //   refForSaveAddressFormInputsBtn.current.classList.add(Styles.btn);
      // }
    }
    if (input) {
      // setAddressVal(input.value);
      setProfileFormInputsVal((cur: any) => {  //zare_nk_050205_nokteh(noe any update she)
        return (
          { ...cur, [inputsName]: vall }
        );
      });
    }

    ////zare_nk_050208_nokteh_st(bekhatere inke addressFormInputsMatnError dar in rendere jari meghdar dadim, vali midoonim bayad reRender beshe component va dar rendere badi
    //// meghdari ke alan dadin ro bepazire, pas dastoorate in nokteh ra be useEffecte rendere badi bordim)
    // const hasNotNullValue = Object.values(addressFormInputsMatnError).some(value => value !== null);
    // if (hasNotNullValue) {
    //   console.log('050205-hasNullValue');
    //   setIsDisabledsaveAddressFormInputsBtn(true);
    //   if (refForSaveAddressFormInputsBtn.current) {
    //     refForSaveAddressFormInputsBtn.current.classList.add(Styles.disabledBtn);
    //     refForSaveAddressFormInputsBtn.current.classList.remove(Styles.btn);
    //   }
    // }
    // else {
    //   console.log('050205-has not NullValue');
    //   setIsDisabledsaveAddressFormInputsBtn(false);
    //   if (refForSaveAddressFormInputsBtn.current) {
    //     refForSaveAddressFormInputsBtn.current.classList.remove(Styles.disabledBtn);
    //     refForSaveAddressFormInputsBtn.current.classList.add(Styles.btn);
    //   }
    // }
    ////zare_nk_050208_nokteh_end(bekhatere inke addressFormInputsMatnError dar in rendere jari meghdar dadim,vali midoonim bayad reRender beshe component va dar rendere badim 
    // meghdari ke alan dadin ro bepazire,pas dastoorate in nokteh ra be useEffecte rendere badi bordim(yani useEffecte u001))
  }

  useEffect(() => {   //u001
    const hasNotNullValue = Object.values(ProfileFormInputsMatnError).some(value => value !== null);
    console.log('050205-ProfileFormInputsMatnError: ' + JSON.stringify(ProfileFormInputsMatnError));
    ////zare_nk_050206_nokteh_st(in dastoorat dar in makan javab dad be khoobi)
    if (hasNotNullValue) {
      console.log('050205-hasNullValue');
      setIsDisabledsaveProfileFormInputsBtn(true);
      if (refForSaveProfileFormInputsBtn.current) {
        refForSaveProfileFormInputsBtn.current.classList.add(Styles.disabledBtn);
        refForSaveProfileFormInputsBtn.current.classList.remove(Styles.btn);
      }
    }
    else {
      console.log('050205-has not NullValue');
      setIsDisabledsaveProfileFormInputsBtn(false);
      if (refForSaveProfileFormInputsBtn.current) {
        refForSaveProfileFormInputsBtn.current.classList.remove(Styles.disabledBtn);
        refForSaveProfileFormInputsBtn.current.classList.add(Styles.btn);
      }
    }
    ////zare_nk_050206_nokteh_end(in dastoorat dar in makan javab dad be khoobi)
  }, [ProfileFormInputsMatnError]);


  async function saveProfile(isOnline: boolean) {
    // if (!refForFeature.current) {  //zare_nk_050213_added
    //   return;
    // }

    // console.log('zare_nk_050110-reza02-feature.get("name").Y: ' + refForFeature.current.get('name').Y + "-feature.get('name').X: " + refForFeature.current.get('name').X +
    //   '-mobileVal: ' + mobileVal + "-feature.get('name').Address: " + refForFeature.current.get('name').Address);

    let token = getCookie("token");
    console.log('zare_nk_050110-token hala is: ' + getCookie("token"));
    if (token == null) {
      alert('!token-token nadarim!');
    }
    // if (typeof window !== "undefined") {
    //   alert('hhhhhhhhhhhhhhh');
    //   token = localStorage.getItem("Token") || "";
    // }
    console.log('zare_nk_050110-token: ' + token);
    // var Api_CreateProfileParams = null;

    // Api_CreateProfileParams = isOnline ? (
    //   {
    //     'FName': 'reza',
    //     'LName': 'kavian',
    //     'CodePosti': '1231231231',
    //     'Pelak': ProfileFormInputsVal.Lname, // 1,
    //     // 'Vahed': addressFormInputsVal.vahed, // 5,
    //     // 'Lat': refForFeature.current.get('name').Y,
    //     // 'Lon': refForFeature.current.get('name').X,
    //     'Mobile': '09999999999',// mobileVal,
    //     // 'Adress': /*feature.get('name').Address*/ $('#AddressMatni').val(),   
    //     'Adress': ProfileFormInputsVal.Fname, // 'dokhaniat',    // feature.get('name').Address, //feature.get('name').Address,
    //     // 'TahvilGirande': TahvilGirande,
    //     // 'OnvanAdress': $('#OnvanAdress').val(),
    //   }
    // ) 
    // : ({
    //   'FName': 'reza',
    //   'LName': 'kavian',
    //   'CodePosti': '1231231231',
    //   'Pelak': 1,
    //   // 'Vahed': 5,
    //   // 'Lat': refForFeature.current.get('name').Y,
    //   // 'Lon': refForFeature.current.get('name').X,
    //   'Mobile': '09999999999',// mobileVal,
    //   // 'Adress': /*feature.get('name').Address*/ $('#AddressMatni').val(),   
    //   'Adress': 'dokhaniat',    // feature.get('name').Address, //feature.get('name').Address,
    //   // 'TahvilGirande': TahvilGirande,
    //   // 'OnvanAdress': $('#OnvanAdress').val(),
    // })


    // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented 
    // const response = await fetch(NextJsApiUrl + "Api_CreateAddress", {
    const response = await fetch(NextJsApiUrl + "Api_EditProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        // Jensiat: RequestDataForSabtInProfilesDet.Jensiat,
        FName: ProfileFormInputsVal.Fname,
        LName: ProfileFormInputsVal.Lname,
        // TarikhTavallod: RequestDataForSabtInProfilesDet.TarikhTavallod,
        // EMail: RequestDataForSabtInProfilesDet.EMail,
        // Mobile:ProfileFormInputsVal.mobile,
      }),
      // body: JSON.stringify(Api_CreateProfileParams),
    });
    const data = await response.json();
    ////zare_nk_050110-data: {"status":0,"message":"افزودن با موفقیت انجام شد","data":"[{\"IdAdress\":24749,\"IdUser\":10006,\"IdKeshvar\":null,\"IdShahr\":null,\"IdOstan\":null,\"Adress\":\"dokhaniat\",\"CodePosti\":\"1231231231\",\"Lon\":53.05861265277862770517,\"Lat\":36.56599047952488490409,\"Mobile\":9999999999,\"FName\":\"reza\",\"LName\":\"kavian\",\"IsDelete\":0,\"Vahed\":5,\"Pelak\":1,\"OnvanAdress\":null,\"FullCityName\":null,\"Keshvar\":null,\"Ostan\":null,\"Shahr\":null,\"Fullname\":\"reza kavian\"}]","errors":[]}
    ////zare_nk_050110-data: {"status":-1,"message":"","data":null,"errors":["اطلاعات را کامل وارد کنید"]}

    if (response.ok) {
      console.log("zare_nk_050429-data: " + JSON.stringify(data));
      //zare_nk_040218-data222: {"status":-8,"message":"","data":null,"errors":["52 دقیقه ی دیگر مجددا تلاش کنید"]}
      //zare_nk_040218-data222:
      // {"status":0,"message":"",
      // "data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwMTA5IiwiQ29kZU1vc2h0YXJpIjoiMjAxMDkiLCJNb2JpbGUiOiI5MzUxMDkxMjg3IiwiTmFtZU1vc2h0YXJpIjoiIiwibmJmIjoxNzQ2NzI1OTI4LCJleHAiOjE3NDczMzA3MjgsImlhdCI6MTc0NjcyNTkyOH0.9Jfv71v3D_s13gSyf3gXqgEfiXaV-lx93hDey4DSLM8"
      // },"errors":[]}
      if (data.status == 0) {
        // router.push("/");   ////zare_nk_050319_added
        setIsDisabledsaveProfileFormInputsBtn(true);
      } else {
        setError("متاسفانه خطایی رخ داده است34:" + data.errors);
        console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
      }
    } else {
      console.log("zare_nk_050110-!response.ok" + response.ok);
      setError("متاسفانه خطایی رخ داده است35");
    }
  }

  ////zare_nk_050429_added_end
  return (
    <>
      {/*<button onClick={() => { func33() }}>for func3</button> 
       <TestComponent testState={testState} SetTestState={useCalback1} /> */}
      <div style={{
        // backgroundColor: 'white', 
        width: '100%',
        // height: '100%',  ////height :100% dorost nist, chon shayad dar layout alaveh ba children satrhaye dife ham dashe bashim(mesle footer va header va...)
        display: "flex",
        flexDirection: 'column',
        // border: '3px solid orange',
      }}>
        <header style={{
          position: 'sticky',
          backgroundColor: 'white',
          flexShrink: '0px',
          width: '100%',
          top: '0px',
          // boxShadow: '0px 3px 2px -1px #d7d6d6',
          boxShadow: '0px 4px 20px 0px #0000000f',

          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 30,
        }}>
          <div style={{
            display: 'flex',
            flexFlow: 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: '1rem',
            paddingLeft: '1rem',
            // border: '1px dashed blue',
            width: '100%',
            height: '3.5rem',
            position: 'relative',
          }}>
            <button id="goBackBtn" onClick={() => router.back()}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: '#f2f5f7',
                backgroundColor: 'white',
                border: 'none',
                // border: '1px dashed black',
                fontSize: '.875rem',
                width: '2rem',
                height: '2rem',
                borderRadius: '9999px',
                cursor: 'pointer',
                position: 'absolute',
              }}>
              <img
                src="/images/Icon/back-icon.svg"
                alt="بازگشت"
                style={{ width: '1.5rem', height: '1.5rem', }}
              />
            </button>

            <div style={{
              display: 'flex',
              flexFlow: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              // border: '1px dashed orange',
              flex: '1 1 auto',
            }}>
              تغییر اطلاعات
            </div>
          </div>
        </header >

        <main style={{
          backgroundColor: 'white',
          // height: '100dvh',   ////zare_nk_050317_commented(A001-ba A002 tadakhol dareh)
          width: '100%',
          display: "flex",
          flexDirection: 'column',
          // overflow: 'hidden',        ////zare_nk_050317_commented(A002-ba A001 tadakhol dareh)
          // justifyContent: 'center',  ////zare_nk_050229_nokteh(be lahaze amoodi vasat chin mikoneh mohtavaye safheh ro ke ma inro nemikhaim)
          alignItems: 'center',
          flex: '1 0 auto',
          // border: '3px solid orange',
          direction: 'rtl',
          paddingBottom: '96px',
        }}>
          {/* zare_nk_050429_added_st */}
          {error && <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>{error}</p>}

          <form id="ProfileInfForm" className={`${Styles.loginForm} ${Styles.valueStyle}`}
            style={{ padding: '1rem', }}
            onSubmit={(event) => {
              event.preventDefault();
            }}>
            <div style={{
              width: '100',
              paddingTop: '1.5rem',
              marginBottom: '1rem',
            }}>
              <p className={`${Styles.titleStyle}`} style={{
                fontSize: '16px',
                color: '#63676e',
                fontWeight: 600,
                margin: '0px',
              }}>اطلاعات کاربری</p>
            </div>

            <div style={{
              display: 'flex', flexDirection: 'column', rowGap: '.75rem',
            }}>
              <div style={{
                display: "flex",
                position: 'relative',
                marginBottom: '1.25rem',
              }}>
                {/* <div className={`${Styles.translateDiv} ${isInputFocused || !isMobileTextEmty ? Styles.animateFocus : Styles.animateBlur}`} */}
                <div className={`${Styles.translateDiv} ${isProfileFormInputsFocused.Fname || !isProfileFormInputsTextEmty.Fname ? Styles.animateFocus : Styles.animateBlur}`} >
                  <span style={{ width: '100%' }}>نام</span>
                </div>

                <input id="Fname" name="Fname"
                  // value={AddressVal}  
                  value={ProfileFormInputsVal.Fname}

                  // onChange={AddressChanged}
                  onChange={ProfileFormInputsChanged}

                  ref={(e) => {
                    // refForAddressFormInputs.current[0] = e;     //zare_nk_050208_nokteh(age ref ra arayeei tarif mikardim)
                    refForProfileFormInputs.current.Fname = e;     //zare_nk_050208_nokteh(age ref ra objecti tarif mikardim)
                  }}

                  // onFocus={handleAddressInputFocus}  
                  onFocus={handleProfileFormInputsFocus}

                  // onBlur={handleAddressInputBlur}  
                  onBlur={handleProfileFormInputsBlur}

                  // className={isAddressTextEmty ? `${Styles.invalid} ` : `${Styles.valid} `}
                  // className={isAddressFormInputsTextEmty.Address ? `${Styles.invalid} ` : `${Styles.valid} `}  //zare_nk_050205_commented(ta ebteda ghermez nabashe)
                  className={ProfileFormInputsMatnError.Fname ? `${Styles.invalid} ` : `${Styles.valid} `}  //zare_nk_050205_added(ta ebteda ghermez nabashe)

                  style={{
                    height: '3rem',
                    borderRadius: '.75rem',
                    // border: '1px solid #e0e3e5',
                    width: '100%',
                    // flex: '1 0 auto',
                    outline: 'none',
                    textAlign: 'right',
                    padding: '.75rem',
                    fontSize: '.875rem',
                  }}
                />
              </div>

              {/* {addressMatnError && (
              <div className={`${Styles.formsRow} ${Styles.warningCont}`}>
                <span className="forErrorMobile error">{addressMatnError}</span>
              </div>
            )} */}

              <div style={{
                display: "flex",
                position: 'relative',
                marginBottom: '1.25rem',
              }}>
                {/* <div className={`${Styles.translateDiv} ${isInputFocused || !isMobileTextEmty ? Styles.animateFocus : Styles.animateBlur}`} */}
                <div className={`${Styles.translateDiv} ${isProfileFormInputsFocused.Lname || !isProfileFormInputsTextEmty.Lname ? Styles.animateFocus : Styles.animateBlur}`}>
                  <span style={{ width: '100%' }}>پلاک</span>
                </div>

                <input id="Lname" name="Lname"
                  // value={pelakVal}  
                  value={ProfileFormInputsVal.Lname}

                  // onChange={pelakChanged}
                  onChange={ProfileFormInputsChanged}

                  ref={(e) => {
                    // refForAddressFormInputs.current[1] = e;     //zare_nk_050208_nokteh(age ref ra arayeei tarif mikardim)
                    refForProfileFormInputs.current.Lname = e;     //zare_nk_050208_nokteh(age ref ra objecti tarif mikardim)
                  }}

                  // onFocus={handlePelakInputFocus}  
                  onFocus={handleProfileFormInputsFocus}

                  // onBlur={handlePelakInputBlur}  
                  onBlur={handleProfileFormInputsBlur}

                  // className={isPelakTextEmty ? `${Styles.invalid} ` : `${Styles.valid} `}
                  // className={isAddressFormInputsTextEmty.pelak ? `${Styles.invalid} ` : `${Styles.valid} `}  //zare_nk_050205_commented(ta ebteda ghermez nabashe)
                  className={ProfileFormInputsMatnError.Lname ? `${Styles.invalid} ` : `${Styles.valid} `}  //zare_nk_050205_added(ta ebteda ghermez nabashe)

                  style={{
                    height: '3rem',
                    borderRadius: '.75rem',
                    // border: '1px solid #e0e3e5',
                    width: '100%',
                    // flex: '1 0 auto',
                    outline: 'none',
                    textAlign: 'right',
                    padding: '.75rem',
                    fontSize: '.875rem',
                  }}
                />



              </div>

              <div style={{
                display: "flex",
                position: 'relative',
                marginBottom: '1.25rem',
              }}>
                {/* <div className={`${Styles.translateDiv} ${isAddressNameFocused || !isAddressNameTextEmty ? Styles.animateFocus : Styles.animateBlur}`} */}
                <div className={`${Styles.translateDiv} ${isProfileFormInputsFocused.mobile || !isProfileFormInputsTextEmty.mobile ? Styles.animateFocus : Styles.animateBlur}`}>
                  <span style={{ width: '100%' }}>شماره تماس</span>
                </div>
                <input id="mobile" name="mobile"

                  // value={addressNameVal}  
                  value={ProfileFormInputsVal.mobile}

                  // onChange={addressNameChanged}
                  onChange={ProfileFormInputsChanged}

                  ref={(e) => {
                    // refForAddressFormInputs.current[3] = e;
                    refForProfileFormInputs.current.mobile = e;
                  }}

                  // onFocus={handleAddressNameInputFocus} 
                  onFocus={handleProfileFormInputsFocus}

                  // onBlur={handleAddressNameInputBlur}   
                  onBlur={handleProfileFormInputsBlur}

                  // className={isAddressNameTextEmty ? `${Styles.invalid} ` : `${Styles.valid} `}
                  // className={isAddressFormInputsTextEmty.addressName ? `${Styles.invalid} ` : `${Styles.valid} `}  //zare_nk_050205_commented(ta ebteda ghermez nabashe)
                  className={ProfileFormInputsMatnError.mobile ? `${Styles.invalid} ` : `${Styles.valid} `}  //zare_nk_050205_added(ta ebteda ghermez nabashe)

                  style={{
                    height: '3rem',
                    borderRadius: '.75rem',
                    // border: '1px solid #e0e3e5',
                    width: '100%',
                    // flex: '1 0 auto',
                    outline: 'none',
                    textAlign: 'right',
                    padding: '.75rem',
                    fontSize: '.875rem',
                  }}
                />
              </div>

              {/*<div style={{
                display: "flex",
                position: 'sticky',
                bottom: '0px',
                marginBottom: '1.25rem',
                width: '100%',
                paddingBottom: '.5rem',
              }}>
                 {isDisabledsaveAddressFormInputsBtn ?
                  <button
                    ref={refForLogOutBtn}
                    id="LogOutBtn" className={Styles.disabledBtn}
                    onClick={() => {
                      alert('dddd');
                      saveAddress(true);
                    }}
                    style={{
                      width: '100%', //color: '#ffffff',
                      fontSize: '.875rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '.75rem',
                      height: '3rem',
                      border: 'none',

                    }}
                  // disabled={isDisabledLogOutBtn}
                  >خروج از حساب</button> :

                  <button
                    ref={refForSaveAddressFormInputsBtn}
                    id="saveAddressFormInputsBtn"
                    onClick={() => {
                      saveAddress(true);
                    }}
                    style={{
                      width: '100%', //color: '#ffffff',
                      fontSize: '.875rem',
                      padding: '0.75rem 1rem',
                      borderRadius: '.75rem',
                      height: '3rem',
                      border: 'none',

                    }}
                    disabled={isDisabledsaveAddressFormInputsBtn}
                  >ذخیره تغییرات</button>

                } 
              </div>*/}
            </div>

          </form >
          {/* zare_nk_050429_added_end */}
        </main>

        <footer style={{
          maxWidth: '450px', marginLeft: 'auto', marginRight: 'auto', zIndex: 50, bottom: 0, left: 0, right: 0, position: 'fixed',
        }}>
          <div style={{
            position: 'relative',
            boxShadow: '0px 10px 15px -3px #0000001a',
            opacity: 1, backgroundColor: 'white', borderTopLeftRadius: '.375rem', borderTopRightRadius: '.375rem', overflow: 'hidden', height: '100%',

            paddingBottom: '1.5rem', padding: '1rem',
          }}>
            {isDisabledsaveProfileFormInputsBtn ?
              <button ref={refForLogOutBtn} id="LogOutBtn" className={Styles.disabledBtn}
                onClick={() => {
                  // saveAddress(true);
                }}
                style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  width: '100%', height: '3.5rem', borderRadius: '.75rem',
                  fontSize: '1rem', padding: '1rem',



                  border: 'none',

                }}
              // disabled={isDisabledLogOutBtn}
              >خروج از حساب</button> :
              <>
                <button ref={refForSaveProfileFormInputsBtn} id="saveProfileFormInputsBtn"
                  onClick={() => {
                    saveProfile(true);
                  }} style={{
                    color: 'white',
                    fontSize: '1rem',
                    lineHeight: '1.5rem', padding: '1rem', backgroundColor: '#ff5900', borderRadius: '.75rem',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '3.5rem', position: 'relative', cursor: 'pointer',
                    direction: 'rtl', border: 'none',

                    minWidth: '.25rem',
                  }}
                  disabled={isDisabledsaveProfileFormInputsBtn}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', }}>
                    <span style={{ color: "white" }}>ثبت تغییرات</span>
                  </div>
                </button>
              </>
            }











          </div>
        </footer>

        <div className="tabIndexOne-in-LayoutWrapper" tabIndex={1}>
        </div>
      </div>
    </>
  );
}
