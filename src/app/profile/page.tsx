////zare_nk_050428_okk(2)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, RefObject, ReactNode, ChangeEvent, MouseEvent, createContext, useContext } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import Styles from "@/styles/components/profile.module.css";
import globalsStyles from "@/styles/components/globals.module.css";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { Collapse, Button, Box, Paper, Typography, Grow, ClickAwayListener, Drawer } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

// import "@neshan-maps-platform/ol/ol.css"   ////zare_nk_050328_commented(in safhe be naghshe niazi nist ke)

import { useAuthentication } from '../../context/AuthenticationContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from "next/link";

import SwiperGrouplevel1Comp from '../../components/SwiperGrouplevel1Comp';

import SwiperTapBestsComp from '../../components/SwiperTapBestsComp';  ////zare_nk_050305_added

import SwiperTopBanerComp from '../../components/SwiperTopBanerComp';

import SwiperThinkBanerComp from '../../components/SwiperthinkBanerComp';

import SwiperTapTimeComp from '../../components/SwiperTapTimeComp';

import SwiperSecondBanerComp from '../../components/SwiperSecondBanerComp';  //zare_nk_050305_added

import AdressListComponent from '../../components/AdressListComponent';  //zare_nk_050328_added 

import { currentAddressContext } from '../../context/currentAddressContext';  //zare_nk_050329_added 
import { json } from "node:stream/consumers";
import { relative } from "node:path";

// import TestComponent from '../components/TestComponent';  ////zare_nk_050327_added_movaghat(componente testi tamrini hast)

import { NextJsApiUrl } from "../../constants/Urls";  ////zare_nk_050407_added

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

type AddressFormInputsMatnErrorType = {
  Address: string | null;
  pelak: string | null;
  vahed: string | null;
  addressName: string | null;
};
type IsAddressFormInputsFocusedType = {
  Address: boolean;
  pelak: boolean;
  vahed: boolean;
  addressName: boolean;
};
type IsAddressFormInputsTextType = {
  Address: boolean;
  pelak: boolean;
  vahed: boolean;
  addressName: boolean;
};
type RefForAddressFormInputsType = {
  Address: HTMLTextAreaElement | null;
  pelak: HTMLInputElement | null;
  vahed: HTMLInputElement | null;
  addressName: HTMLInputElement | null;
};
type AddressFormInputsType = {
  Address: string;
  pelak: string;
  vahed: string;
  addressName: string;
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
  const [addressFormInputsMatnError, setAddressFormInputsMatnError] = useState<AddressFormInputsMatnErrorType>({
    Address: '',
    pelak: '',
    vahed: '',
    addressName: '',
  });
  const [isAddressFormInputsFocused, setIsAddressFormInputsFocused] = useState<IsAddressFormInputsFocusedType>({
    Address: false,
    pelak: false,
    vahed: false,
    addressName: false,
  });
  const [isAddressFormInputsTextEmty, setIsAddressFormInputsTextEmty] = useState<IsAddressFormInputsTextType>({   //zare_nk_050208_nokteh(state objecti)
    Address: true,
    pelak: true,
    vahed: true,
    addressName: true,
  });
  const refForAddressFormInputs = useRef<RefForAddressFormInputsType>({  //zare_nk_050206_nokteh(chon baraye chandin tage object gozashtim)
    Address: null,
    pelak: null,
    vahed: null,
    addressName: null,
  });

  const handleAddressFormInputsFocus = (eventOrElement: ChangeEvent<HTMLInputElement> | HTMLInputElement | ChangeEvent<HTMLTextAreaElement> | HTMLTextAreaElement | null) => {
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
    setIsAddressFormInputsFocused((cur) => {
      return (
        { ...cur, [inputsName]: true }
      );
    });
  };

  ////zare_nk_050206_nokteh(yek rooydade moshtarak baraye chandin tag(voroodiye chandin tag ro migireh, khoroojiye chandin tag ro mideh))
  const handleAddressFormInputsBlur = (eventOrElement: ChangeEvent<HTMLInputElement> | HTMLInputElement | ChangeEvent<HTMLTextAreaElement> | HTMLTextAreaElement | null) => {
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
    setIsAddressFormInputsFocused((cur) => {
      return (
        { ...cur, [inputsName]: false }
      );
    });
  };

  const refForSaveAddressFormInputsBtn = useRef<HTMLButtonElement | null>(null);
  const [isDisabledsaveAddressFormInputsBtn, setIsDisabledsaveAddressFormInputsBtn] = useState(true);


  const [addressFormInputsVal, setAddressFormInputsVal] = useState<AddressFormInputsType>({
    Address: '',
    pelak: '',
    vahed: '',
    addressName: '',
  });

  function AddressFormInputsChanged(
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
      setIsAddressFormInputsTextEmty((cur) => {
        return (
          { ...cur, [inputsName]: true }
        );
      });

      if (input) {
        input.classList.remove("valid");
        input.classList.add("invalid");
      }
      // setAddressMatnError("ورود متن آدرس الزامی است");
      setAddressFormInputsMatnError((cur) => {
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
      setIsAddressFormInputsTextEmty((cur) => {
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
      setAddressFormInputsMatnError((cur) => {
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
      setAddressFormInputsVal((cur: any) => {  //zare_nk_050205_nokteh(noe any update she)
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
    const hasNotNullValue = Object.values(addressFormInputsMatnError).some(value => value !== null);
    console.log('050205-addressFormInputsMatnError: ' + JSON.stringify(addressFormInputsMatnError));
    ////zare_nk_050206_nokteh_st(in dastoorat dar in makan javab dad be khoobi)
    if (hasNotNullValue) {
      console.log('050205-hasNullValue');
      setIsDisabledsaveAddressFormInputsBtn(true);
      if (refForSaveAddressFormInputsBtn.current) {
        refForSaveAddressFormInputsBtn.current.classList.add(Styles.disabledBtn);
        refForSaveAddressFormInputsBtn.current.classList.remove(Styles.btn);
      }
    }
    else {
      console.log('050205-has not NullValue');
      setIsDisabledsaveAddressFormInputsBtn(false);
      if (refForSaveAddressFormInputsBtn.current) {
        refForSaveAddressFormInputsBtn.current.classList.remove(Styles.disabledBtn);
        refForSaveAddressFormInputsBtn.current.classList.add(Styles.btn);
      }
    }
    ////zare_nk_050206_nokteh_end(in dastoorat dar in makan javab dad be khoobi)
  }, [addressFormInputsMatnError]);


  async function saveAddress(isOnline: boolean) {
    // if (!refForFeature.current) {  //zare_nk_050213_added
    //   return;
    // }

    // console.log('zare_nk_050110-reza02-feature.get("name").Y: ' + refForFeature.current.get('name').Y + "-feature.get('name').X: " + refForFeature.current.get('name').X +
    //   '-mobileVal: ' + mobileVal + "-feature.get('name').Address: " + refForFeature.current.get('name').Address);

    let token = getCookie("token");
    console.log('zare_nk_050110-token hala is: ' + getCookie("token"));
    // if (typeof window !== "undefined") {
    //   alert('hhhhhhhhhhhhhhh');
    //   token = localStorage.getItem("Token") || "";
    // }
    console.log('zare_nk_050110-token: ' + token);
    var Api_CreateAddressParams = null;

    Api_CreateAddressParams = isOnline ? (
      {
        'FName': 'reza',
        'LName': 'kavian',
        'CodePosti': '1231231231',
        'Pelak': addressFormInputsVal.pelak, // 1,
        'Vahed': addressFormInputsVal.vahed, // 5,
        // 'Lat': refForFeature.current.get('name').Y,
        // 'Lon': refForFeature.current.get('name').X,
        'Mobile': '09999999999',// mobileVal,
        // 'Adress': /*feature.get('name').Address*/ $('#AddressMatni').val(),   
        'Adress': addressFormInputsVal.Address, // 'dokhaniat',    // feature.get('name').Address, //feature.get('name').Address,
        // 'TahvilGirande': TahvilGirande,
        // 'OnvanAdress': $('#OnvanAdress').val(),
      }
    ) : ({
      'FName': 'reza',
      'LName': 'kavian',
      'CodePosti': '1231231231',
      'Pelak': 1,
      'Vahed': 5,
      // 'Lat': refForFeature.current.get('name').Y,
      // 'Lon': refForFeature.current.get('name').X,
      'Mobile': '09999999999',// mobileVal,
      // 'Adress': /*feature.get('name').Address*/ $('#AddressMatni').val(),   
      'Adress': 'dokhaniat',    // feature.get('name').Address, //feature.get('name').Address,
      // 'TahvilGirande': TahvilGirande,
      // 'OnvanAdress': $('#OnvanAdress').val(),
    })


    // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented 
    const response = await fetch(NextJsApiUrl + "Api_CreateAddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      // body: JSON.stringify({
      //   Mobile: mobileVal, 
      //   SmsCode: sms, 
      //   Password: ""
      // }),
      body: JSON.stringify(Api_CreateAddressParams),
    });
    const data = await response.json();
    ////zare_nk_050110-data: {"status":0,"message":"افزودن با موفقیت انجام شد","data":"[{\"IdAdress\":24749,\"IdUser\":10006,\"IdKeshvar\":null,\"IdShahr\":null,\"IdOstan\":null,\"Adress\":\"dokhaniat\",\"CodePosti\":\"1231231231\",\"Lon\":53.05861265277862770517,\"Lat\":36.56599047952488490409,\"Mobile\":9999999999,\"FName\":\"reza\",\"LName\":\"kavian\",\"IsDelete\":0,\"Vahed\":5,\"Pelak\":1,\"OnvanAdress\":null,\"FullCityName\":null,\"Keshvar\":null,\"Ostan\":null,\"Shahr\":null,\"Fullname\":\"reza kavian\"}]","errors":[]}
    ////zare_nk_050110-data: {"status":-1,"message":"","data":null,"errors":["اطلاعات را کامل وارد کنید"]}

    if (response.ok) {
      console.log("zare_nk_050110-data: " + JSON.stringify(data));
      //zare_nk_040218-data222: {"status":-8,"message":"","data":null,"errors":["52 دقیقه ی دیگر مجددا تلاش کنید"]}
      //zare_nk_040218-data222:
      // {"status":0,"message":"",
      // "data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwMTA5IiwiQ29kZU1vc2h0YXJpIjoiMjAxMDkiLCJNb2JpbGUiOiI5MzUxMDkxMjg3IiwiTmFtZU1vc2h0YXJpIjoiIiwibmJmIjoxNzQ2NzI1OTI4LCJleHAiOjE3NDczMzA3MjgsImlhdCI6MTc0NjcyNTkyOH0.9Jfv71v3D_s13gSyf3gXqgEfiXaV-lx93hDey4DSLM8"
      // },"errors":[]}
      if (data.status == 0) {
        router.push("/");   ////zare_nk_050319_added
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
        color: '#1b1c1d', ////zare_nk_050429_added(range madare site)
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
            {/* <button id="goBackBtn" onClick={() => router.back()}
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
                    </button> */}

            <div style={{
              display: 'flex',
              flexFlow: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              // border: '1px dashed orange',
              flex: '1 1 auto',
            }}>
              حساب کاربری
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
          <div style={{
            display: 'flex', flexDirection: 'column', width: '100%', paddingTop: '1.25rem', paddingLeft: '1rem', paddingRight: '1rem',
            rowGap: '1.25rem', alignItems: 'center',// border: '2px dashed red',
          }}>
            <div style={{
              display: 'flex', width: '100%', boxShadow: '0px 1px 3px 0px #0000001a', backgroundColor: 'white', borderRadius: '.5rem',
              justifyContent: 'space-between', alignItems: 'center',
            }}>

              <Link href="/profile/edit" style={{
                padding: '1rem', justifyContent: 'space-between', alignItems: 'center', width: '100%', display: 'flex', color: 'inherit', textDecoration: 'none',
              }}>
                <div style={{
                  justifyContent: 'space-between', alignItems: 'center', display: 'flex', columnGap: '.5rem',
                }}>
                  <div style={{
                    backgroundColor: '#f7f7f8', borderRadius: '9999px', justifyContent: 'center', alignItems: 'center', height: '2rem', width: '2rem', display: 'flex',
                  }}>
                    <img src="/images/homeFooter/profile-icon-kamrang.svg" alt="پروفایل" style={{
                      height: '1.5rem', width: '1.5rem',
                    }} />

                  </div>

                  <div style={{
                    rowGap: '.125rem', justifyContent: 'space-between', flexDirection: 'column', height: '100%', display: 'flex'
                  }}>
                    <span style={{
                      fontSize: '.875rem', lineHeight: '1.25rem', margin: '0px',
                    }}>
                      رضا کاویان
                    </span>

                    <span style={{
                      color: '#878b92', fontSize: '.75rem', lineHeight: '1rem',
                    }}>
                      09351091287
                    </span>
                  </div>

                </div>


                <img src="/images/profile/go-profile-edit.svg" alt="پروفایل" style={{
                  // height: '1.5rem', width: '1.5rem',
                }} />

              </Link>


            </div>

            <div style={{
              display: 'flex', flexDirection: 'column', width: '100%', boxShadow: '0px 1px 3px 0px #0000001a', backgroundColor: 'white', borderRadius: '.5rem', justifyContent: 'stretch', alignItems: 'center',
            }}>
              <div style={{
                display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', padding: '1rem',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', columnGap: '.5rem',
                }}>
                  <div style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#eff3fe',
                    borderRadius: '9999px', height: '2rem', width: '2rem',
                  }}>
                    <img src="/images/profile/kif-pool.svg" alt="کیف پول" style={{
                      height: '1.5rem', width: '1.5rem',
                    }} />

                  </div>
                  <span>کیف پول</span>
                </div>

                <div style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff7eb', color: '#ff5900',
                  fontSize: '.625rem', paddingBottom: '5px', paddingTop: '5px', paddingLeft: '.5rem', paddingRight: '.5rem',
                  borderRadius: '9999px', minWidth: '58px', height: '1.5rem',
                }}>
                  فاقد اعتبار
                </div>

              </div>
              <Link href="/profile/edit" style={{
                padding: '1rem', justifyContent: 'space-between', alignItems: 'center', width: '100%', display: 'flex', color: 'inherit', textDecoration: 'none',
                borderTop: '1px solid #ececec',
              }}>
                <div style={{
                  justifyContent: 'space-between', alignItems: 'center', display: 'flex', columnGap: '.5rem',
                }}>
                  <div style={{
                    backgroundColor: '#f7f7f8', borderRadius: '9999px', justifyContent: 'center', alignItems: 'center', height: '2rem', width: '2rem', display: 'flex',
                  }}>
                    <img src="/images/profile/poshtibani.svg" alt="پروفایل" style={{
                      height: '1.5rem', width: '1.5rem',
                    }} />
                  </div>
                  <div style={{
                    rowGap: '.125rem', justifyContent: 'space-between', flexDirection: 'column', height: '100%', display: 'flex'
                  }}>
                    <span style={{
                      fontSize: '1rem', lineHeight: '1.25rem', margin: '0px',
                    }}>
                      پشتیبانی
                    </span>
                    {/* <span style={{
                      color: '#878b92', fontSize: '.75rem', lineHeight: '1rem',
                    }}>
                      09351091287
                    </span> */}
                  </div>



                </div>


                <img src="/images/profile/go-profile-edit.svg" alt="پروفایل" style={{
                  // height: '1.5rem', width: '1.5rem',
                }} />

              </Link>

              <Link href="/terms-and-conditions" style={{
                padding: '1rem', justifyContent: 'space-between', alignItems: 'center', width: '100%', display: 'flex', color: 'inherit', textDecoration: 'none',
                borderTop: '1px solid #ececec',
              }}>
                <div style={{
                  justifyContent: 'space-between', alignItems: 'center', display: 'flex', columnGap: '.5rem',
                }}>
                  <div style={{
                    backgroundColor: '#f7f7f8', borderRadius: '9999px', justifyContent: 'center', alignItems: 'center', height: '2rem', width: '2rem', display: 'flex',
                  }}>
                    <img src="/images/profile/ghavanin-ma.svg" alt="قوانین ما" style={{
                      height: '1.5rem', width: '1.5rem',
                    }} />
                  </div>
                  <div style={{
                    rowGap: '.125rem', justifyContent: 'space-between', flexDirection: 'column', height: '100%', display: 'flex'
                  }}>
                    <span style={{
                      fontSize: '1rem', lineHeight: '1.25rem', margin: '0px',
                    }}>
                      قوانین ما
                    </span>

                    {/* <span style={{
                      color: '#878b92', fontSize: '.75rem', lineHeight: '1rem',
                    }}>
                      09351091287
                    </span> */}
                  </div>



                </div>


                <img src="/images/profile/go-profile-edit.svg" alt="پروفایل" style={{
                  // height: '1.5rem', width: '1.5rem',
                }} />

              </Link>
            </div>

          </div>

          {/* zare_nk_050429_added_end */}
        </main>

        <footer style={{
          maxWidth: '450px', marginLeft: 'auto', marginRight: 'auto', zIndex: 50, bottom: 0, left: 0, right: 0, position: 'fixed',
        }}>
          <div style={{
            position: 'relative', boxShadow: '0px -1px 5px 2px #0000000d', opacity: 1, backgroundColor: 'white',
            overflow: 'hidden', height: '100%', padding: '0px 1rem',
          }}>
            <div style={{
              fontSize: '1rem', lineHeight: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              width: '100%', height: '4rem', position: 'relative', direction: 'rtl', border: 'none', minWidth: '.25rem',
            }}>
              <div style={{
                display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', position: 'absolute',
              }}>
                <button onClick={() => {
                  router.replace("/orders");
                  // setFooterBtnClicked(() => {
                  //   return ({
                  //     home: false,
                  //     orders: true,
                  //     profile: false,
                  //   })
                  // })
                }}
                  style={{
                    fontSize: '.875rem', lineHeight: '1.25rem', display: 'flex', flexFlow: 'column', alignItems: 'center',
                    gap: '.25rem', cursor: 'pointer', border: 'none', padding: '0rem', backgroundColor: 'inherit', height: '100%',
                  }}>
                  {
                    footerBtnClicked.orders == true ?
                      <div style={{
                        display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center', margin: '.5rem', marginBottom: '0px',
                      }}>
                        <img src="/images/homeFooter/orders-icon.svg" alt="سفارش‌ها" style={{
                          height: '1.5rem', width: '1.5rem',
                        }} />
                      </div> :
                      <div style={{
                        display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center', margin: '.5rem', marginBottom: '0px',
                      }}>
                        <img src="/images/homeFooter/orders-icon-kamrang.svg" alt="سفارش‌ها" style={{
                          height: '1.5rem', width: '1.5rem',
                        }} />
                      </div>
                  }

                  <span style={{
                    fontSize: '.75rem', lineHeight: '1rem', textAlign: 'center',
                    ...(footerBtnClicked.orders == true ? { color: '#1b1c1d' } : { color: '#878b92' }),
                  }}>
                    سفارش‌ها
                  </span>
                </button>
              </div>

              <div style={{
                display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center', height: '100%', zIndex: '2',
              }}>
                <button onClick={() => {
                  router.replace("/");
                  // setFooterBtnClicked(() => {
                  //   return ({
                  //     home: true,
                  //     orders: false,
                  //     profile: false,
                  //   })
                  // })
                }}
                  style={{
                    fontSize: '.875rem', lineHeight: '1.25rem', display: 'flex', flexFlow: 'column', alignItems: 'center',
                    gap: '.25rem', cursor: 'pointer', border: 'none', padding: '0rem', backgroundColor: 'inherit', width: '4rem', height: '100%',
                  }}>
                  {footerBtnClicked.home == true ?
                    <div style={{
                      display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center', margin: '.5rem', marginBottom: '0px',
                    }}>
                      <img src="/images/homeFooter/home-icon.svg" alt="خانه" style={{
                        height: '1.5rem', width: '1.5rem',
                      }} />
                    </div> :
                    <div style={{
                      display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center', margin: '.5rem', marginBottom: '0px',
                    }}>
                      <img src="/images/homeFooter/home-icon-kamrang.svg" alt="خانه" style={{
                        height: '1.5rem', width: '1.5rem',
                      }} />
                    </div>
                  }

                  <span style={{
                    fontSize: '.75rem', lineHeight: '1rem', textAlign: 'center',
                    ...(footerBtnClicked.home == true ? { color: '#1b1c1d' } : { color: '#878b92' }),
                  }}>
                    خانه
                  </span>
                </button>
              </div>

              <div style={{
                display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center', height: '100%', zIndex: '2',
              }}>
                <button onClick={() => {
                  // setFooterBtnClicked(() => {
                  //   return ({
                  //     home: false,
                  //     orders: false,
                  //     profile: true,
                  //   })
                  // })
                }}
                  style={{
                    fontSize: '.875rem', lineHeight: '1.25rem', display: 'flex', flexFlow: 'column', alignItems: 'center',
                    gap: '.25rem', cursor: 'pointer', border: 'none', padding: '0rem', backgroundColor: 'inherit', width: '4rem', height: '100%',
                  }}>
                  {footerBtnClicked.profile == true ?
                    <div style={{
                      display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center', margin: '.5rem', marginBottom: '0px',
                    }}>
                      <img src="/images/homeFooter/profile-icon.svg" alt="پروفایل" style={{
                        height: '1.5rem', width: '1.5rem',
                      }} />
                    </div> :
                    <div style={{
                      display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center', margin: '.5rem', marginBottom: '0px',
                    }}>
                      <img src="/images/homeFooter/profile-icon-kamrang.svg" alt="پروفایل" style={{
                        height: '1.5rem', width: '1.5rem',
                      }} />
                    </div>
                  }

                  <span style={{
                    fontSize: '.75rem', lineHeight: '1rem', textAlign: 'center',
                    ...(footerBtnClicked.profile == true ? { color: '#1b1c1d' } : { color: '#878b92' }),
                  }}>
                    پروفایل
                  </span>
                </button>
              </div>

            </div>
          </div>
        </footer>

        <div className="tabIndexOne-in-LayoutWrapper" tabIndex={1}>
        </div>
      </div>
    </>
  );
}
