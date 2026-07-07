////zare_nk_050413_okk(1)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, RefObject, ReactNode, ChangeEvent, MouseEvent, createContext, useContext } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import Styles from "@/styles/components/location.module.css";
import globalsStyles from "@/styles/components/globals.module.css";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { Collapse, Button, Box, Paper, Typography, Grow, ClickAwayListener, Drawer } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

// import "@neshan-maps-platform/ol/ol.css"   ////zare_nk_050328_commented(in safhe be naghshe niazi nist ke)

import { useAuthentication } from '../context/AuthenticationContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from "next/link";

import SwiperGrouplevel1Comp from '../components/SwiperGrouplevel1Comp';

import SwiperTapBestsComp from '../components/SwiperTapBestsComp';  ////zare_nk_050305_added

import SwiperTopBanerComp from '../components/SwiperTopBanerComp';

import SwiperThinkBanerComp from '../components/SwiperthinkBanerComp';

import SwiperTapTimeComp from '../components/SwiperTapTimeComp';

import SwiperSecondBanerComp from '../components/SwiperSecondBanerComp';  //zare_nk_050305_added

import AdressListComponent from '../components/AdressListComponent';  //zare_nk_050328_added 

import { currentAddressContext } from '../context/currentAddressContext';  //zare_nk_050329_added 
import { json } from "node:stream/consumers";
import { relative } from "node:path";

// import TestComponent from '../components/TestComponent';  ////zare_nk_050327_added_movaghat(componente testi tamrini hast)

import { NextJsApiUrl } from "../constants/Urls";  ////zare_nk_050407_added

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
  console.log('050329-Home rendered!!');   ////zare_nk_050329_added
  const [error, setError] = useState<string | null>(null);
  const [isEpmtyAdressList, setIsEpmtyAdressList] = useState<string | null>(null);
  const [isEpmtyShowAddRemAddress, setIsEpmtyShowAddRemAddress] = useState(true);

  const refForBox = useRef<HTMLDivElement | null>(null);

  // const { userData, login, logout } = useAuthentication(); //zare_nk_050111_added
  const { isLogin } = useAuthentication(); //zare_nk_050111_added //zare_nk_050221_tahlilshe(ke chera estefadeh nashod)

  const [responsedListFromApiSelectAddressList, SetResponsedListFromApiSelectAddressList] = useState<responsedListFromApiSelectAddressListType[] | null>(null);

  let currentAddressUseContext = useContext(currentAddressContext);   ////zare_nk_050329_added  

  // const chosenAddress = getCookie("chosenAddress"); 
  // var parsedChosenAddress: responsedListFromApiSelectAddressListType | null = chosenAddress ? JSON.parse(chosenAddress) : null;
  // const [mycurrentAddressState, setMycurrentAddressState] = useState<responsedListFromApiSelectAddressListType | null>(parsedChosenAddress);    
  const [mycurrentAddressState, setMycurrentAddressState] = useState<responsedListFromApiSelectAddressListType | null>(null);

  // const [currentAddress, setCurrentAddress] = useState<responsedListFromApiSelectAddressListType | null>(null);    ////zare_nk_050329_commented(currentAddress az useState 
  //// tabdil shod be createContext(ta beshe az jadde bozorgvar be nave pas dadeh beshe bedoone vasetehha!!))

  useEffect(() => {
    const chosenAddress = getCookie("chosenAddress");
    var parsedChosenAddress: responsedListFromApiSelectAddressListType | null = chosenAddress ? JSON.parse(chosenAddress) : null;

    setMycurrentAddressState(parsedChosenAddress);
  }, []);

  const router = useRouter();

  const goTosShoppingbasket = () => {
    // router.push("/folder03?tab=comments2");
    // redirect("/login");
    //router.replace("/location");
    router.push("/shoppingbasket");
  };

  const showAddressListDrawer = useCallback(
    async () => {
      let token = getCookie("token");
      if (!token) {
        setError("lotfan avval online shid");
        return;
      }

      // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented
      let ApiUrl = NextJsApiUrl; ////zare_nk_050407_added
      const response = await fetch(ApiUrl + "Api_SelectAddress", {
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
          // console.log("zare_nk_050206-parsedList1: " + parsedList[0].Adress);
          // console.log("zare_nk_050206-parsedList2: " + parsedList[1].Adress);
          setIsEpmtyAdressList('notNull');

          SetResponsedListFromApiSelectAddressList(() => {
            return parsedList
          });

        } else {
          setError("متاسفانه خطایی رخ داده است34:" + data.errors);
          // console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
          ////zare_nk_050221_nokteh(setIsEpmtyAdressList(null); ro bezarim??)
        }
      } else {
        // console.log("zare_nk_050110-!response.ok" + response.ok);
        setError("متاسفانه خطایی رخ داده است35");
        ////zare_nk_050221_nokteh(setIsEpmtyAdressList(null); ro bezarim??)
      }

      // console.log('zare_nk_050110-token hala is: ' + getCookie("token"));
      if (token) {
        setIsEpmtyAdressList('notNull');   //zare_nk_050221_nokteh(age online bashe va address nadashteh bashe ke manteghi nist setIsEpmtyAdressList('notNull') beshe!!)
      }
      else {
        // alert('lotfan avval online shid');
        ////zare_nk_050221_nokteh(setIsEpmtyAdressList(null); ro bezarim??)
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
      }}>
        <SwiperThinkBanerComp />

        <header style={{
          position: 'sticky',
          top: '0px',
          boxShadow: '0px 3px 2px -1px #d7d6d6',
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
            onClick={showAddressListDrawer}   //zare_nk_050329_commented_nokteh(ba setState hayash baese reRendere Home mishe(bayad az reRendere farzandane birabte home jologiri beshe)) 
            style={{
              borderRadius: 10,
              display: 'flex',
              visibility: (mycurrentAddressState?.Adress ? 'visible' : 'hidden'),  ////zare_nk_050329_added
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

              <img
                src="/images/header/getAddresses.svg"
                alt=" ادرس ها"
              />
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

        <main
          style={{
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
            // paddingTop: '10px',   
          }}>
          {isEpmtyAdressList &&  ////zare_nk_050329_updated(sharte isEpmtyAdressList emal shod ke isEpmtyAdressList==false bood component ra aslan seda nazanim)
            <AdressListComponent
              isEpmtyAdressList={isEpmtyAdressList}
              setIsEpmtyAdressList={setIsEpmtyAdressList}
              refForBox={refForBox}
              responsedListFromApiSelectAddressList={responsedListFromApiSelectAddressList}
              isEpmtyShowAddRemAddress={isEpmtyShowAddRemAddress}
              setIsEpmtyShowAddRemAddress={setIsEpmtyShowAddRemAddress}
              // showAddRemAddress={showAddRemAddress}     //zare_nk_050329_commented
              showAddressListDrawer={showAddressListDrawer}
            // setCurrentAddress={setCurrentAddress}  ////zare_nk_050329_commented(currentAddress az seState tabdil shod be useContext)
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
          <Link //className="relative mx-4 flex h-[40px] w-[calc(100%-2rem)] items-center justify-start gap-1 rounded-full bg-gray-75 px-4 py-[10px]"
            style={{
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
            }}
            >

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
        <footer></footer>

        <div className="tabIndexOne-in-LayoutWrapper" tabIndex={1}>
        </div>
      </div>
    </currentAddressContext.Provider>
  );
}
