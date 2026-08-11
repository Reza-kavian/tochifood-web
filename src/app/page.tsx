////zare_nk_050515_okk(2)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, RefObject, ReactNode, ChangeEvent, MouseEvent, createContext, useContext } from "react";
import { useRouter, useSearchParams, redirect, usePathname } from "next/navigation";
import Styles from "@/styles/components/location.module.css";
import globalsStyles from "@/styles/components/globals.module.css";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { Collapse, Button, Box, Paper, Typography, Grow, ClickAwayListener, Drawer } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import { useAuthentication } from '../context/AuthenticationContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from "next/link";

import SwiperGrouplevel1Comp from '../components/SwiperGrouplevel1Comp';

import SwiperTapBestsComp from '../components/SwiperTapBestsComp';

import SwiperTopBanerComp from '../components/SwiperTopBanerComp';

import SwiperThinkBanerComp from '../components/SwiperthinkBanerComp';

import SwiperTapTimeComp from '../components/SwiperTapTimeComp';

import SwiperSecondBanerComp from '../components/SwiperSecondBanerComp';

import AdressListComponent from '../components/AdressListComponent';

import { currentAddressContext } from '../context/currentAddressContext';

import { json } from "node:stream/consumers";
import { relative } from "node:path";

// import TestComponent from '../components/TestComponent';  ////zare_nk_050327_added_movaghat(componente testi tamrini hast)

import { NextJsApiUrl } from "../constants/Urls";  ////zare_nk_050407_added

function getCookie(name: any) {
  if (typeof document === 'undefined') {
    // console.log("document === 'undefined'");
    return null; // برای جلوگیری از خطای عدم وجود document
  }
  // console.log("document !== 'undefined'");
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

type responsedListFromApiSelectAddressListType = {
  IdAdress: number;
  IdUser: number;
  Adress: string;
  CodePosti: string;
  Lon: number;
  Lat: number;
  Mobile: number;
  FName: string;
  LName: string;
  OnvanAdress: string;
  Fullname: string;

  [key: string]: any;
};

export default function Home() {
  console.log('zare_nk_050520_Home rendered!!');
  const [error, setError] = useState<string | null>(null);
  const [isEpmtyAdressList, setIsEpmtyAdressList] = useState<string | null>(null);
  const [isEpmtyShowAddRemAddress, setIsEpmtyShowAddRemAddress] = useState(true);

  const refForBox = useRef<HTMLDivElement | null>(null);

  const [responsedListFromApiSelectAddressList, SetResponsedListFromApiSelectAddressList] = useState<responsedListFromApiSelectAddressListType[] | null>(null);

  let currentAddressUseContext = useContext(currentAddressContext);

  const [mycurrentAddressState, setMycurrentAddressState] = useState<responsedListFromApiSelectAddressListType | null>(null);

  // const [currentAddress, setCurrentAddress] = useState<responsedListFromApiSelectAddressListType | null>(null);    ////zare_nk_050329_commented(currentAddress az useState 
  //// tabdil shod be createContext(ta beshe az jadde bozorgvar be nave pas dadeh beshe bedoone vasetehha!!))

  type footerBtnClickedType = {
    home: boolean;
    orders: boolean;
    profile: boolean;
  };

  const [footerBtnClicked, setFooterBtnClicked] = useState<footerBtnClickedType>({
    home: true,
    orders: false,
    profile: false,
  });

  useEffect(() => {
    const chosenAddress = getCookie("chosenAddress");
    var parsedChosenAddress: responsedListFromApiSelectAddressListType | null = chosenAddress ? JSON.parse(chosenAddress) : null;

    if (parsedChosenAddress == null) {
      showAddressListDrawer();
      return;
    }
    if (mycurrentAddressState == null) {
      setMycurrentAddressState(parsedChosenAddress);
    }
  }, [isEpmtyAdressList]);

  const router = useRouter();

  const goTosShoppingbasket = () => {
    // router.push("/folder03?tab=comments2");
    // redirect("/login"); 
    // router.replace("/testPage");
    router.push("/shoppingbasket");
  };

  ////zare_nk_050506_nokteh_st(chon dar middleware.ts ma baraye masirhaye azad(ke niaz be login nadaran mesle hamin 
  //// editaddress) ejazeye oboor midim va vojoode token va monghazi naboodanesh ro aslan barresi nemikonim pas baraye api haye inja tanha vojoode cookiye token kafi 
  //// nist va bayad monghazi boodanesh ham barrresi she, pas az componente useAuthentication estefadeh kardim baraye estelame token(age monghazi biid cookiye token ro
  //// hazf ham mikoneh va dar api ha hamoon sharte [let token = getCookie("token"); if (!token) {... return;}] kafiye)(useAuthentication 
  //// ham mitooneh be /api/verifytoken api bezaneh va ham samte khodesh barresi koneh(man tarjih dadam samte khodesh barresi koneh(chon ba vojoode amniati
  //// boodane /api/verifytoken ke samte server hast va kamtar emkane hack kardanesh hast man sorate barresi samte karbar bedoone api zadan ro tarjih midam,
  //// amniatesh ham ba tavajoh be inke tamame api haye .net core ke token mohemme parsafar ham etebarsanji mikoneh man dige negarane amniatesh nistam )) ))     
  const { isLoginAndInf, refreshLoginStatus } = useAuthentication();
  const pathname = usePathname();
  useEffect(() => {
    console.log('zare_nk_050505_rere_01-useEffect pathname called');
    refreshLoginStatus();
  }, [pathname]);
  ////zare_nk_050506_nokteh_end(chon dar middleware.ts ma baraye masirhaye azad(ke niaz be login nadaran mesle hamin 
  //// editaddress) ejazeye oboor midim va vojoode token va monghazi naboodanesh ro aslan barresi nemikonim pas baraye api haye inja tanha vojoode cookiye token kafi 
  //// nist va bayad monghazi boodanesh ham barrresi she, pas az componente useAuthentication estefadeh kardim baraye estelame token(age monghazi bood cookiye token ro
  //// hazf ham mikoneh va dar api ha hamoon sharte [let token = getCookie("token"); if (!token) {... return;}] kafiye)(useAuthentication 
  //// ham mitooneh be /api/verifytoken api bezaneh va ham samte khodesh barresi koneh(man tarjih dadam samte khodesh barresi koneh(chon ba vojoode amniati
  //// boodane /api/verifytoken ke samte server hast va kamtar emkane hack kardanesh hast man sorate barresi samte karbar bedoone api zadan ro tarjih midam,
  //// amniatesh ham ba tavajoh be inke tamame api haye .net core ke token mohemme parsafar ham etebarsanji mikoneh man dige negarane amniatesh nistam )) )) 

  const showAddressListDrawer = useCallback(
    async () => {
      let token = getCookie("token");
      ////zare_nk_050506_nokteh_st(chon az componente useAuthentication dar  useEffect(() => {...}, [pathname]); ke dar rendere ebtedaeiye safhe estelam migereh baraye
      ////  estelame vojood va monghazi boodane cookiye token estefadeh kardim, age monghazi bood cookiye token ro hazf ham mikoneh, pas dar api ha hamoon 
      //// sharte [if (!token) {... return;}] kafiye. dar zemn revale karim ine hamon estelam dar rendere ebtedaeiye safhe kafiye va baraye har api mojadad estelam nemigirim
      ////  ta sorat bala bashe(agar ham zamani ke daghayeghi dar safheye jar hastim va token bad az vorood be in safheh monghazi shod age api bezanim bedoone estelam khode 
      //// api .net core zahmate estelam ro mikeshe va statuse manfi mideh va moshkeli pish nemiad)) 
      // if (!token || !isLoginAndInf.isLogin) {  ////zare_nk_050506_nokteh(chon dar useAuthentication age estelam adame token ya monghazi shodan bashe ham token ro hazf
      ////  mikoneh ham isLogin ro false mikoneh pas !token va !isLoginAndInf.isLogin hamishe yek javab midan va yeki ro benevisim kafiye(hamoon !token ro tebghe gozashte mizarim basheh))
      if (!token) {
        setError("lotfan avval online shid");
        return;
      }
      setIsEpmtyAdressList('notNull');   ////zare_nk_050507_nokteh(az entehaye tabe avorder shod inja)

      ////zare_nk_050506_nokteh_end(chon az componente useAuthentication dar  useEffect(() => {...}, [pathname]); ke dar rendere ebtedaeiye safhe estelam migereh baraye
      ////  estelame vojood va monghazi boodane cookiye token estefadeh kardim, age monghazi bood cookiye token ro hazf ham mikoneh, pas dar api ha hamoon 
      //// sharte [if (!token) {... return;}] kafiye. dar zemn revale karim ine hamon estelam dar rendere ebtedaeiye safhe kafiye va baraye har api mojadad estelam nemigirim
      ////  ta sorat bala bashe(agar ham zamani ke daghayeghi dar safheye jar hastim va token bad az vorood be in safheh monghazi shod age api bezanim bedoone estelam khode 
      //// api .net core zahmate estelam ro mikeshe va statuse manfi mideh va moshkeli pish nemiad))

      // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented 
      const response = await fetch(NextJsApiUrl + "Api_SelectAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();

      if (response.ok) {
        // console.log("zare_nk_050206-data: " + JSON.stringify(data));
        if (data.status == 0) {
          var parsedList = JSON.parse(data.data.list);
          SetResponsedListFromApiSelectAddressList(() => {
            return parsedList
          });
          return parsedList;
        } else {
          setError("متاسفانه خطایی رخ داده است34:" + data.errors);
          return null;
        }
      } else {
        setError("متاسفانه خطایی رخ داده است35");
        return null;
      }
    }
    , [isEpmtyAdressList, responsedListFromApiSelectAddressList])

  ////zare_nk_050226_nokteh_st(baraye dokmehaye navigation va pagination dasti(ke estefadeh nakardim))
  // const refForwiperButtonNext = useRef<HTMLButtonElement | null>(null);
  // const refForwiperButtonPrev = useRef<HTMLButtonElement | null>(null);
  // const swiperRef = useRef(null);

  // useEffect(() => {
  //   // اگر ریفرنس‌ها هنوز پر نشده باشند، کاری نکن
  //   if (!refForwiperButtonNext.current || !refForwiperButtonPrev.current) return;

  //   // اگر swiperRef هنوز ساخته نشده، صبر کن (چون Swiper کمی دیرتر رندر میشه)
  //   if (!swiperRef.current) return;

  //   // ۴. اینجا به Swiper می‌گوییم دکمه‌هایش کدام هستند
  //   // ماژول Navigation را از داخل instance Swiper پیدا می‌کنیم
  //   const swiperInstance = swiperRef.current.swiper;

  //   // تنظیم دکمه‌ها
  //   swiperInstance.params.navigation.nextEl = refForwiperButtonNext.current;
  //   swiperInstance.params.navigation.prevEl = refForwiperButtonPrev.current;

  //   // فعال‌سازی مجدد دکمه‌ها
  //   swiperInstance.navigation.update();
  //   swiperInstance.navigation.init();
  // }, []);
  ////zare_nk_050226_nokteh_end(baraye dokmehaye navigation va pagination dasti(ke estefadeh nakardim))

  ////IsEpmtyAdressList
  ////zare_nk_050226_added_end

  // const showAddRemAddress = useCallback(
  //   async () => {
  //     setIsEpmtyShowAddRemAddress(false);
  //   }
  //   , [isEpmtyShowAddRemAddress]);

  ////zare_nk_050327_added_movaghat_st(pakkardani va tamrini)
  // const [testState, SetTestState] = useState<number>(1);
  // const [testState2, SetTestState2] = useState<number>(1);

  // useEffect(() => {
  //   // SetTestState2(2); 
  //   // useCalback1;
  // }, []);

  // function func33() {
  //   console.log('zare_nk_050327-func33 called!!');
  //   return SetTestState2((c) => c + 1);
  //   // return 200;
  // }

  // const useCalback1 =  useCallback(
  //   () => {  ////zare_nk_050327_nokteh(chon in tabe be farzand pas dadeh shodeh,hamvareh pedar reRender beshe farzand ham reRender mishe
  //     //// nabayad setStati ke seda zadeh nashodeh baese in reRender beshe, vali react injooriyeh! va age pedare reRender beshe ba har setStati hatta gheir az in 
  //     // setState() ke seda zadeh nashod) farzand ham reRender mishe(chareye kar useCallback hast ke react manteghi beshe va faghat zamani ke in setState seda 
  //     //// zadeh mishe farzand ro reRender mikoneh(dar zemn useCalback ham bedoone memo boodane farzand fayedehi nadareh, chon dar in soorat farzand hamvareh seda 
  //     //// zadeh mishe ba rendere pedar)))
  //     // return SetTestState2(2);
  //     SetTestState((cur) => {
  //       return 5;
  //     });
  //   } , [testState]);
  ////zare_nk_050327_added_movaghat_end(pakkardani va tamrini)

  return (
    <currentAddressContext.Provider value={{ mycurrentAddress: mycurrentAddressState, setMycurrentAddress: setMycurrentAddressState }}>
      {/*<button onClick={() => { func33() }}>for func3</button> 
       <TestComponent testState={testState} SetTestState={useCalback1} /> */}
      <div style={{
        // backgroundColor: 'white', 
        width: '100%',
        // height: '100%',  ////height :100% dorost nist, chon shayad dar layout alaveh ba children satrhaye dife ham dashe bashim(mesle footer va header va...)
        display: "flex",
        flexDirection: 'column',
        // border: '3px solid orange',
        flex: '1 1 auto',  ////zare_nk_050514_added
      }}>
        <SwiperThinkBanerComp />

        <header style={{
          position: 'sticky',
          top: '0px',
          // boxShadow: '0px 3px 2px -1px #d7d6d6',  ////zare_nk_050520_commented
          boxShadow: '0px 4px 20px 0px #0000000f',   ////zare_nk_050520_added
          display: 'flex',
          flexFlow: 'row-reverse',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '5px',
          zIndex: 899,
          backgroundColor: 'white',
        }}>
          <button
            id="showAddressListDrawerBtn"
            onClick={showAddressListDrawer}
            style={{
              borderRadius: 10,
              display: 'flex',
              visibility: (mycurrentAddressState?.Adress ? 'visible' : 'hidden'),
              flexDirection: 'column',
              backgroundColor: 'inherit',
              border: 'none',
              fontSize: '.875rem',
              cursor: "pointer",
            }}>
            <span
              style={{
                fontSize: '.875rem',
                lineHeight: '1.25rem',
                color: '#878b92',
                textAlign: "right",
              }}
            >ارسال به</span>
            <div style={{
              display: 'flex',
              flexFlow: 'row',
              direction: 'rtl',
              color: '#313335',
              minWidth: '124px',
              maxWidth: '256px',
              gap: '.5rem',
            }}>
              <span style={{ textAlign: "right", }}>
                {/* zare_nk_050329_nokteh(currentAddress az useState tabdil shod be useContext) */}
                {/* {currentAddress?.OnvanAdress ? currentAddress.OnvanAdress : 'خونه'} */}
                {mycurrentAddressState?.Adress ? mycurrentAddressState.OnvanAdress : ''}
              </span>

              <div style={{
                fontSize: '0.875rem',
                color: '#1b1c1d',

                // این بخش برای سه‌نقطه و محدودیت ۲ خط
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',

                // این بخش برای تثبیت ارتفاع روی ۴۰ پیکسل 
                lineHeight: '1.25rem',
                // height: '2.5rem',
                height: '1.25rem',

                minHeight: '1.25rem',  // minHeight: '2.5rem', // اجبار به کمتر نشدن
                maxHeight: '1.25rem',  // maxHeight: '2.5rem', // اجبار به بیشتر نشدن
                boxSizing: 'border-box', // برای اینکه بُردر (border) به ارتفاع اضافه نشود

                textAlign: 'right',
              }}>
                {/* {currentAddress?.Adress ? currentAddress.Adress : 'آدرسسس'} */}
                {mycurrentAddressState?.Adress ? mycurrentAddressState.Adress : ''}
              </div>

              <img src="/images/header/getAddresses.svg" alt=" ادرس ها" />
              {/* <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="inherit" class="size-6 shrink-0 fill-gray-950 rotate-90"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.55017 15.5355L12.085 12.0007L8.55017 8.46445L9.96438 7.05023L14.9141 12L9.96438 16.9497L8.55017 15.5355Z" fill="inherit"></path></svg> */}
            </div>
          </button>

          <button
            id="goShoppingBacketBtn"
            // onClick={showAddressListDrawer}  
            onClick={() => { goTosShoppingbasket(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'inherit',
              border: 'none',
              fontSize: '.875rem',
              height: '50px',
              cursor: "pointer",
            }}>
            <img
              src="/images/header/shoppingBacket.svg"
              alt="سبد خرید"
            />
          </button>
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
          {isEpmtyAdressList &&  ////zare_nk_050329_updated(sharte isEpmtyAdressList emal shod ke isEpmtyAdressList==false bood component ra aslan seda nazanim)
            <AdressListComponent
              isEpmtyAdressList={isEpmtyAdressList}
              setIsEpmtyAdressList={setIsEpmtyAdressList}
              refForBox={refForBox}
              responsedListFromApiSelectAddressList={responsedListFromApiSelectAddressList}
              isEpmtyShowAddRemAddress={isEpmtyShowAddRemAddress}
              setIsEpmtyShowAddRemAddress={setIsEpmtyShowAddRemAddress}
              showAddressListDrawer={showAddressListDrawer}
            />
          }

          {/* zare_nk_050226_nokteh_st(dokmehaye navigation va pagination dasti(jahate olgu gozashtim)) */}
          {/* <button className='swiper-button-next2' ref={refForwiperButtonNext}>
          برو بعدی
        </button>
        <button className='swiper-button-prev' ref={refForwiperButtonPrev}>
          برو قبلی
        </button> */}

          {/* <div className="swiper-pagination"></div>   */}
          {/* zare_nk_050226_nokteh_end(dokmehaye navigation va pagination dasti(jahate olgu gozashtim)) */}

          <div style={{ marginBottom: '.70rem' }}></div>
          <Link style={{
            display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: 'calc(100% - 2rem)', height: '40px', marginLeft: '1rem', marginRight: '1rem',
            position: 'relative', padding: '10px 1rem', backgroundColor: '#f1f2f3', borderRadius: '9999px', gap: '0.25rem', textDecoration: 'none',
          }}
            href="/search">
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="inherit" className="size-3.5 shrink-0 fill-gray-500 text-gray"><path d="M22.07 21.47L18.93 18.34C20.52 16.61 21.5 14.3 21.5 11.77C21.5 6.40003 17.13 2.03003 11.76 2.03003C6.39003 2.03003 2.03003 6.40003 2.03003 11.77C2.03003 17.14 6.40003 21.51 11.77 21.51C14.07 21.51 16.18 20.71 17.84 19.37L21.01 22.53C21.16 22.68 21.35 22.75 21.54 22.75C21.73 22.75 21.92 22.68 22.07 22.53C22.36 22.24 22.36 21.76 22.07 21.47ZM3.53003 11.77C3.53003 7.22003 7.22003 3.53003 11.77 3.53003C16.32 3.53003 20.01 7.23003 20.01 11.77C20.01 16.31 16.31 20.01 11.77 20.01C7.23003 20.01 3.53003 16.31 3.53003 11.77Z" fill="inherit"></path></svg> */}
            <svg style={{ width: '.875rem', height: '.875rem' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#a5abb1" className="size-3.5 shrink-0 fill-gray-500 text-gray"><path d="M22.07 21.47L18.93 18.34C20.52 16.61 21.5 14.3 21.5 11.77C21.5 6.40003 17.13 2.03003 11.76 2.03003C6.39003 2.03003 2.03003 6.40003 2.03003 11.77C2.03003 17.14 6.40003 21.51 11.77 21.51C14.07 21.51 16.18 20.71 17.84 19.37L21.01 22.53C21.16 22.68 21.35 22.75 21.54 22.75C21.73 22.75 21.92 22.68 22.07 22.53C22.36 22.24 22.36 21.76 22.07 21.47ZM3.53003 11.77C3.53003 7.22003 7.22003 3.53003 11.77 3.53003C16.32 3.53003 20.01 7.23003 20.01 11.77C20.01 16.31 16.31 20.01 11.77 20.01C7.23003 20.01 3.53003 16.31 3.53003 11.77Z" fill="inherit"></path></svg>

            <p style={{ color: '#878b92', fontSize: '.75rem', lineHeight: '1rem', flex: '1 1 0%', }} className="flex-1 text-xs text-gray">جستجوی نام فروشگاه یا محصول...</p>
          </Link>

          <div style={{ marginBottom: '.75rem' }}></div>

          <SwiperTopBanerComp />

          {/* <div style={{ marginBottom: '1.3rem' }}></div> */}
          <div style={{ marginBottom: '.50rem' }}></div>

          <SwiperGrouplevel1Comp />

          <SwiperTapBestsComp />

          <div style={{ marginBottom: '1.5rem' }}></div>

          <SwiperSecondBanerComp />

          <div style={{ marginBottom: '1.5rem' }}></div>

          <SwiperTapTimeComp />

          {/* <div style={{ marginBottom: '1.5rem' }}></div> */}

          <div style={{
            display: 'flex', flexFlow: 'column', gap: '.5rem', width: '100%',
            // marginTop: '.75rem',
            //  marginBottom: '.75rem',   
            marginBottom: '1rem',
          }} >
            <div style={{
              display: 'flex', flexFlow: "row", justifyContent: "space-between", alignItems: 'center',
              width: '100%',
              // paddingLeft: '1rem', paddingRight: '1rem',
            }} >
              <img
                style={{
                  // width: '137px',  
                  width: '100%',
                  // height: '105px',
                  objectFit: 'cover',
                  borderTopLeftRadius: '.375rem',
                  borderTopRightRadius: '.375rem',
                }}
                // src={`/images/SwiperGrouplevel1/${item.AxG1}.png`} />  ////zare_nk_050229_nokteh(age az database bekhooneh bade emale database food tavassote parsa)
                // src={`/images/SwiperGrouplevel1/${index}.png`} />
                // https://img.tochikala.com/Product/' + item.IdKala
                // src={`/images/movaghat/SwiperTapTime/${index}.jpg`} />
                src={`/images/baners/single-punched-banner/single-punched-banner-01.png`} />
            </div>
          </div>
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
                  router.replace("/profile");
                  // setFooterBtnClicked(() => {
                  //   return ({
                  //     home: false,
                  //     orders: false,
                  //     profile: true,
                  //   })
                  // });
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
    </currentAddressContext.Provider>
  );
}
