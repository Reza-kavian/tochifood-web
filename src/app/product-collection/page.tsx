////zare_nk_050428_okk(2)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, RefObject, ReactNode, ChangeEvent, MouseEvent, createContext, useContext } from "react";
import { useRouter, useSearchParams, redirect, usePathname } from "next/navigation";
import Styles from "@/styles/components/location.module.css";
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

import SwiperInVendorListHeaderComp from '../../components/SwiperInVendorListHeaderComp';
import CollapseAndClickAwayForSortingComp from '../../components/CollapseAndClickAwayForSortingComp';
import CollapseAndClickAwayForRaveshErsalComp from '../../components/CollapseAndClickAwayForRaveshErsalComp';

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

    // const { isLogin } = useAuthentication(); //zare_nk_050510_commented 

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
        // router.replace("/testPage");
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

    const [isEpmtyCollapseForSorting, setIsEpmtyCollapseForSorting] = useState(true);
    const [isEpmtyCollapseForRaveshErsal, setIsEpmtyCollapseForRaveshErsal] = useState(true);

    const saveAddress = useCallback(
        async (isOnline: boolean) => {  ////zare_nk_050403_nokteh(rahe2- mamoolan age tabe ra dakhele   component tarif mikonim az in sabke tarife tabe estefadeh mishe(dar sorat va karaei har do ravesh taghriban yeki hastan))
            console.log('saveAddress called!!');
        }
        , [isEpmtyCollapseForSorting, isEpmtyCollapseForRaveshErsal]);

    const openCollapseForSorting = useCallback(
        async () => {
            console.log('050401-openCollapseForSorting called!!');
            let token = await getCookie("token");
            console.log('050401-token is: ' + getCookie("token"));
            if (token) {
                console.log('050401-token darim-openCollapseForSorting!!');
                setIsEpmtyCollapseForSorting(false);
            }
            else {
                console.log('050401-token nadarim');
                saveAddress(false);  ////zare_nk_050205_nokteh(age offLine ham bood taraf address ra zakhireh kon ehtemalan ba user movaghat!!)
            }
            ////zare_nk_050205_added_end
        }
        , [isEpmtyCollapseForSorting]);

    const openCollapseForRaveshErsal = useCallback(
        async () => {
            console.log('050401-openCollapseForRaveshErsal called!!');
            let token = await getCookie("token");
            console.log('050401-token is: ' + getCookie("token"));
            if (token) {
                console.log('050401-token darim-openCollapseForRaveshErsal!!');
                setIsEpmtyCollapseForRaveshErsal(false);
            }
            else {
                console.log('050401-token nadarim');
                saveAddress(false);  ////zare_nk_050205_nokteh(age offLine ham bood taraf address ra zakhireh kon ehtemalan ba user movaghat!!)
            }
        }
        , [isEpmtyCollapseForRaveshErsal]);

    return (
        <div style={{
            // backgroundColor: 'white', 
            width: '100%',
            // height: '100%',  ////height :100% dorost nist, chon shayad dar layout alaveh ba children satrhaye dife ham dashe bashim(mesle footer va header va...)
            display: "flex",
            flexDirection: 'column',
            // border: '3px solid orange',
        }}>
            {/* <SwiperThinkBanerComp /> */}

            <header style={{
                position: 'sticky',
                top: '0px',
                boxShadow: '0px 3px 2px -1px #d7d6d6',
                display: 'flex',
                flexFlow: 'row-reverse',
                justifyContent: 'space-between',
                alignItems: 'center',
                // padding: '5px',
                zIndex: 899,
                backgroundColor: 'white',
            }}>
                <div style={{
                    display: 'flex', flexFlow: 'column', width: '100%', color: '#878b92', padding: '1rem',
                    backgroundColor: '#fcfcfc', rowGap: '1rem', justifyContent: 'space-between', alignItems: 'center',
                }}>


                    <div style={{
                        display: 'flex',
                        flexFlow: 'row-reverse',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // paddingRight: '1rem',
                        // paddingLeft: '1rem',
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
                                // position: 'absolute',
                                padding: '0px',
                            }}>
                            <img
                                src="/images/Icon/back-icon.svg"
                                alt="بازگشت"
                                style={{ width: '1.5rem', height: '1.5rem', }}
                            />
                        </button>

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
                                padding: '0px',
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
                                //   maxWidth: '256px',  ////zare_nk_050429_commented
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
                    </div>


                    <Link style={{
                        display: 'flex', flexFlow: 'row', justifyContent: 'flex-start', alignItems: 'center', width: 'calc(100% - 2rem)', height: '40px', //marginLeft: '1rem', marginRight: '1rem',
                        position: 'relative', padding: '10px 1rem', backgroundColor: '#f1f2f3', borderRadius: '9999px', gap: '0.25rem', textDecoration: 'none', direction: 'rtl',
                    }}
                        href="/search">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="inherit" className="size-3.5 shrink-0 fill-gray-500 text-gray"><path d="M22.07 21.47L18.93 18.34C20.52 16.61 21.5 14.3 21.5 11.77C21.5 6.40003 17.13 2.03003 11.76 2.03003C6.39003 2.03003 2.03003 6.40003 2.03003 11.77C2.03003 17.14 6.40003 21.51 11.77 21.51C14.07 21.51 16.18 20.71 17.84 19.37L21.01 22.53C21.16 22.68 21.35 22.75 21.54 22.75C21.73 22.75 21.92 22.68 22.07 22.53C22.36 22.24 22.36 21.76 22.07 21.47ZM3.53003 11.77C3.53003 7.22003 7.22003 3.53003 11.77 3.53003C16.32 3.53003 20.01 7.23003 20.01 11.77C20.01 16.31 16.31 20.01 11.77 20.01C7.23003 20.01 3.53003 16.31 3.53003 11.77Z" fill="inherit"></path></svg> */}
                        <svg style={{ width: '.875rem', height: '.875rem' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#a5abb1" className="size-3.5 shrink-0 fill-gray-500 text-gray"><path d="M22.07 21.47L18.93 18.34C20.52 16.61 21.5 14.3 21.5 11.77C21.5 6.40003 17.13 2.03003 11.76 2.03003C6.39003 2.03003 2.03003 6.40003 2.03003 11.77C2.03003 17.14 6.40003 21.51 11.77 21.51C14.07 21.51 16.18 20.71 17.84 19.37L21.01 22.53C21.16 22.68 21.35 22.75 21.54 22.75C21.73 22.75 21.92 22.68 22.07 22.53C22.36 22.24 22.36 21.76 22.07 21.47ZM3.53003 11.77C3.53003 7.22003 7.22003 3.53003 11.77 3.53003C16.32 3.53003 20.01 7.23003 20.01 11.77C20.01 16.31 16.31 20.01 11.77 20.01C7.23003 20.01 3.53003 16.31 3.53003 11.77Z" fill="inherit"></path></svg>

                        <p style={{ color: '#878b92', fontSize: '.75rem', lineHeight: '1rem', flex: '1 1 0%', textAlign: 'right' }} className="flex-1 text-xs text-gray">
                            جستجوی محصول
                        </p>
                    </Link>
                    <div
                        style={{
                            display: 'flex',
                            flexFlow: 'row-reverse',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            // paddingRight: '0.375rem',
                            // paddingLeft: '0.375rem',
                            // border: '1px dashed yellow',
                            width: '100%',
                            cursor: 'grab',
                        }}>

                        <SwiperInVendorListHeaderComp
                            openCollapseForSorting={openCollapseForSorting}
                            openCollapseForRaveshErsal={openCollapseForRaveshErsal}
                        />
                    </div>








                </div>
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
                        // showAddRemAddress={showAddRemAddress}     //zare_nk_050329_commented
                        showAddressListDrawer={showAddressListDrawer}
                    // setCurrentAddress={setCurrentAddress}  ////zare_nk_050329_commented(currentAddress az seState tabdil shod be useContext)
                    />
                }
                {/* zare_nk_050429_added_st(sabke gride tapsifoodi be jaye flex(baraye chandsotoone kardane farzandane)) */}
                <div style={{ marginBottom: '1.25rem' }}></div>
                <div style={{
                    // display: 'flex', flexFlow: 'row', flexWrap: 'wrap', paddingLeft: '1rem', paddingRight: '1rem', gap: '0px',position:'relative',
                    display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', paddingBottom: '253px', paddingTop: '0px', width: '100%', paddingRight: '5px', paddingLeft: '5px',
                }}>
                    {
                        [...Array(9)].map((_, index) => {
 

                    return(<div key={index} style={{
                        paddingBottom: '.25rem', padding: '.5rem', backgroundColor: 'white', borderRadius: '.5rem', gap: '.25rem', justifyContent: 'space-between',
                        flexDirection: 'column', height: 'fit-content', display: 'flex', border: '1px solid #ebeef3',
                    }}>
                        <div style={{
                            position: 'relative', border: '1px solid #ebeef3', borderRadius: '.375rem',
                        }}>
                            <div style={{
                                color: '#141414', fontSize: '.75rem', lineHeight: '1rem', paddingLeft: '.25rem', paddingRight: '.25rem', borderRadius: '.25rem',
                                gap: '2px', justifyContent: 'center', alignItems: 'center', display: 'flex', zIndex: 10, top: '.25rem', left: '.25rem', position: 'absolute',
                            }}>
                                <span style={{ marginTop: '2px', }}>5.0</span>
                                <img src="/images/product-collection/gold-start.svg" alt="بازگشت"
                                    style={{ width: '.75rem', height: '.75rem', }} />
                            </div>
                            <div style={{ width: '100%', height: '100px', }}>
                                <img src="/images/product-collection/movaghat/ice-americano.jpg" alt="آیس آمریکانو" style={{
                                    objectFit: 'cover', borderRadius: '.375rem', userSelect: 'none', width: '100%! important', height: '100%', //position: 'absolute',  ////zare_nk_050430_nokteh(tapsifoodabsolute kard vali niazi nist va commentesh kardam)
                                }} />
                            </div>
                        </div>
                        <div style={{
                            flexDirection: 'column', height: 'fit-content', display: 'flex', marginBottom: '.25rem', marginTop: '.25rem', gap: '.25rem',  ////zare_nk_050430_commented
                        }}>
                            <div style={{
                                display: 'flex', flexDirection: 'column', width: '100%',
                            }}>
                                <div style={{
                                    fontSize: '0.875rem',
                                    color: 'black',

                                    // این بخش برای سه‌نقطه و محدودیت ۲ خط
                                    display: '-webkit-box',
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',

                                    // این بخش برای تثبیت ارتفاع روی ۴۰ پیکسل 
                                    lineHeight: '1rem',
                                    // height: '2.5rem',
                                    height: '2rem',

                                    minHeight: '2rem',  // minHeight: '2.5rem', // اجبار به کمتر نشدن
                                    maxHeight: '2rem',  // maxHeight: '2.5rem', // اجبار به بیشتر نشدن
                                    boxSizing: 'border-box', // برای اینکه بُردر (border) به ارتفاع اضافه نشود

                                    textAlign: 'right',
                                    // width: '128px',  ////zare_nk_050430_nokteh(dar safheye product-collection az widthe sabete 128px estefadeh shod(jahate olgu baraye jahaye digeh hatman barrasi she))
                                }}>
                                    آیس آمریکانو
                                </div>

                                <div style={{
                                    fontSize: '0.75rem',
                                    color: '#8e949d',

                                    // این بخش برای سه‌نقطه و محدودیت ۲ خط
                                    display: '-webkit-box',
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',

                                    // این بخش برای تثبیت ارتفاع روی ۴۰ پیکسل 
                                    lineHeight: '1rem',
                                    // height: '2.5rem',
                                    height: '1rem',

                                    minHeight: '1rem',  // minHeight: '2.5rem', // اجبار به کمتر نشدن
                                    maxHeight: '1rem',  // maxHeight: '2.5rem', // اجبار به بیشتر نشدن
                                    boxSizing: 'border-box', // برای اینکه بُردر (border) به ارتفاع اضافه نشود

                                    textAlign: 'right',
                                    // width: '128px',  ////zare_nk_050430_nokteh(dar safheye product-collection az widthe sabete 128px estefadeh shod(jahate olgu baraye jahaye digeh hatman barrasi she))
                                }}>
                                    قهوه چینو
                                </div>
                            </div>
                            <div style={{
                                alignItems: 'center', flexDirection: 'column', display: 'flex', position: 'relative',
                            }}>
                                <span style={{
                                    textDecorationLine: 'line-through', color: '#7d95b3', fontSize: '.75rem',
                                    lineHeight: '1rem', textAlign: 'left', width: '100%', height: '1rem',
                                }}>
                                    {(150000).toLocaleString()}
                                </span>

                                <div style={{
                                    backgroundColor: '#ff5a00',
                                    display: 'flex', alignItems: 'center', borderRadius: '.25rem', paddingLeft: '.5rem', paddingRight: '.5rem', paddingTop: '2px',
                                    color: 'white',  ////zare_nk_050401_nokteh(tapsifood css digeei baraye sefid kardane matn gozasht)
                                    borderBottomRightRadius: 0, position: 'absolute', right: '-17px', bottom: '.5rem', zIndex: 10, height: '30px',
                                }}>
                                    <span style={{ fontSize: '.75rem', lineHeight: '1rem', fontWeight: 700, }}>30%</span>
                                    <span style={{
                                        position: 'absolute',

                                        height: 0, width: 0,

                                        borderTopWidth: '8px',
                                        borderRightWidth: '8px',
                                        borderBottomWidth: 0,
                                        borderLeftWidth: 0,

                                        bottom: '-8px', right: 0,

                                        display: 'inline-block',

                                        borderStyle: 'solid',

                                        borderTopColor: '#ff5a00',
                                        borderRightColor: 'transparent',
                                        borderBottomColor: 'transparent',
                                        borderLeftColor: 'transparent',
                                    }}>
                                    </span>
                                </div>


                                <div style={{
                                    width: "100%", display: "flex", flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
                                }}>
                                    <span style={{
                                        fontSize: '1rem', marginLeft: 2, fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#141414', alignItems: 'center',
                                        lineHeight: '1.5rem',
                                    }}>
                                        {(105000).toLocaleString()}
                                    </span>
                                    <span style={{
                                        fontSize: '.625rem', fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#6d6d6d',
                                    }}>
                                        تومان
                                    </span>
                                </div> 

                            </div>

                            <div style={{ gap: '.5rem', flexDirection: 'column', display: 'flex', }}>
                                <span style={{ borderBottom: '1px solid #ebeef3', }}>
                                </span>

                                <div style={{
                                    display: 'flex', gap: '.25rem', alignItems: 'center', width: '100%',
                                }}>
                                    <img src="/images/product-collection/motor-peyk.svg" alt="زمان انتظار"
                                        style={{ width: '14px', height: '14px', }}
                                    />
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                        <span style={{ color: '#575a63', fontSize: '.75rem', lineHeight: '1rem', }}>{(58000).toLocaleString()}</span>
                                        <span style={{ color: '#575a63', fontSize: '.625rem', }}>تومان</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                             })
                    }
                </div>
                {/* zare_nk_050429_added_end(sabke gride tapsifoodi be jaye flex(baraye chandsotoone kardane farzandane)) */}

                {/* zare_nk_050429_nokteh_st(copy az home baraye olgu) */}
                {/* <div style={{ marginBottom: '.70rem' }}></div>
                <Link style={{
                    display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: 'calc(100% - 2rem)', height: '40px', marginLeft: '1rem', marginRight: '1rem',
                    position: 'relative', padding: '10px 1rem', backgroundColor: '#f1f2f3', borderRadius: '9999px', gap: '0.25rem', textDecoration: 'none',
                }}
                    href="/search">
                    <svg style={{ width: '.875rem', height: '.875rem' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#a5abb1" className="size-3.5 shrink-0 fill-gray-500 text-gray"><path d="M22.07 21.47L18.93 18.34C20.52 16.61 21.5 14.3 21.5 11.77C21.5 6.40003 17.13 2.03003 11.76 2.03003C6.39003 2.03003 2.03003 6.40003 2.03003 11.77C2.03003 17.14 6.40003 21.51 11.77 21.51C14.07 21.51 16.18 20.71 17.84 19.37L21.01 22.53C21.16 22.68 21.35 22.75 21.54 22.75C21.73 22.75 21.92 22.68 22.07 22.53C22.36 22.24 22.36 21.76 22.07 21.47ZM3.53003 11.77C3.53003 7.22003 7.22003 3.53003 11.77 3.53003C16.32 3.53003 20.01 7.23003 20.01 11.77C20.01 16.31 16.31 20.01 11.77 20.01C7.23003 20.01 3.53003 16.31 3.53003 11.77Z" fill="inherit"></path></svg>

                    <p style={{ color: '#878b92', fontSize: '.75rem', lineHeight: '1rem', flex: '1 1 0%', }} className="flex-1 text-xs text-gray">جستجوی نام فروشگاه یا محصول...</p>
                </Link>
                <div style={{ marginBottom: '.75rem' }}></div>
                <SwiperTopBanerComp />
                <div style={{ marginBottom: '.50rem' }}></div>
                <SwiperGrouplevel1Comp />
                <SwiperTapBestsComp />
                <div style={{ marginBottom: '1.5rem' }}></div>
                <SwiperSecondBanerComp />
                <div style={{ marginBottom: '1.5rem' }}></div>
                <SwiperTapTimeComp />
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
                </div> */}
                {/* zare_nk_050429_nokteh_end(copy az home baraye olgu) */}

                <CollapseAndClickAwayForSortingComp
                    isEpmtyCollapseForSorting={isEpmtyCollapseForSorting}
                    setIsEpmtyCollapseForSorting={setIsEpmtyCollapseForSorting}
                    saveAddress={saveAddress}
                // addressFormInputsVal={addressFormInputsVal}
                // setAddressFormInputsVal={setAddressFormInputsVal}
                />

                <CollapseAndClickAwayForRaveshErsalComp
                    isEpmtyCollapseForRaveshErsal={isEpmtyCollapseForRaveshErsal}
                    setIsEpmtyCollapseForRaveshErsal={setIsEpmtyCollapseForRaveshErsal}
                    saveAddress={saveAddress}
                // addressFormInputsVal={addressFormInputsVal}
                // setAddressFormInputsVal={setAddressFormInputsVal}
                />


            </main >

            <footer style={{
                maxWidth: '450px', marginLeft: 'auto', marginRight: 'auto', zIndex: 50, bottom: 0, left: 0, right: 0, position: 'fixed',
            }}>

            </footer>

            <div className="tabIndexOne-in-LayoutWrapper" tabIndex={1}>
            </div>
        </div >
    );
}
