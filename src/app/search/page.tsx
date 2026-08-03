////zare_nk_050510_okk(2)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, RefObject, ReactNode, ChangeEvent, MouseEvent, createContext, useContext } from "react";
import { useRouter, useSearchParams, redirect, usePathname } from "next/navigation";
import Styles from "@/styles/components/location.module.css";
import globalsStyles from "@/styles/components/globals.module.css";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { Collapse, Button, Box, Paper, Typography, Grow, ClickAwayListener, Drawer } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import { useAuthentication } from '../../context/AuthenticationContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from "next/link";

import SwiperGrouplevel1Comp from '../../components/SwiperGrouplevel1Comp';

import SwiperTapBestsComp from '../../components/SwiperTapBestsComp';

import SwiperTopBanerComp from '../../components/SwiperTopBanerComp';

import SwiperThinkBanerComp from '../../components/SwiperthinkBanerComp';

import SwiperTapTimeComp from '../../components/SwiperTapTimeComp';

import SwiperSecondBanerComp from '../../components/SwiperSecondBanerComp';

import AdressListComponent from '../../components/AdressListComponent';

import { currentAddressContext } from '../../context/currentAddressContext';

import SwiperGetStoresInSearchResault from '../../components/SwiperGetStoresInSearchResault';
import SwiperGetProductsInSearchResault from '../../components/SwiperGetProductsInSearchResault';

import SwiperInSearchHeaderComp from '../../components/SwiperInSearchHeaderComp';

import { json } from "node:stream/consumers";
import { relative } from "node:path";

import { NextJsApiUrl } from "../../constants/Urls";  ////zare_nk_050407_added

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

export default function Search() {
    console.log('050329-Search rendered!!');
    const [error, setError] = useState<string | null>(null);
    const [isEpmtyAdressList, setIsEpmtyAdressList] = useState<string | null>(null);
    const [isEpmtyShowAddRemAddress, setIsEpmtyShowAddRemAddress] = useState(true);

    const refForBox = useRef<HTMLDivElement | null>(null);

    const [responsedListFromApiSelectAddressList, SetResponsedListFromApiSelectAddressList] = useState<responsedListFromApiSelectAddressListType[] | null>(null);

    let currentAddressUseContext = useContext(currentAddressContext);

    const [mycurrentAddressState, setMycurrentAddressState] = useState<responsedListFromApiSelectAddressListType | null>(null);
    ////zare_nk_050511_commented_st
    //   useEffect(() => {
    //     const chosenAddress = getCookie("chosenAddress");
    //     var parsedChosenAddress: responsedListFromApiSelectAddressListType | null = chosenAddress ? JSON.parse(chosenAddress) : null;

    //     if (parsedChosenAddress == null) {
    //       showAddressListDrawer();
    //       return;
    //     }
    //     if (mycurrentAddressState == null) {
    //       setMycurrentAddressState(parsedChosenAddress);
    //     }
    //   }, [isEpmtyAdressList]);
    ////zare_nk_050511_commented_end
    ////zare_nk_050511_added_st
    useEffect(() => {
        const chosenAddress = getCookie("chosenAddress");
        var parsedChosenAddress: responsedListFromApiSelectAddressListType | null = chosenAddress ? JSON.parse(chosenAddress) : null;

        setMycurrentAddressState(parsedChosenAddress);
    }, []);
    ////zare_nk_050511_added_end

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


    return (
        <currentAddressContext.Provider value={{ mycurrentAddress: mycurrentAddressState, setMycurrentAddress: setMycurrentAddressState }}>
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
                    top: '0px',
                    // boxShadow: '0px 3px 2px -1px #d7d6d6',
                    boxShadow:'0px 4px 20px 0px #0000000f',
                    display: 'flex',
                    flexFlow: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '5px',
                    paddingBottom: '.75rem',
                    zIndex: 899,
                    backgroundColor: 'white',
                    // border: '1px dashed red',
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
                        columnGap: '1rem', ////zare_nk_050512_added
                    }}>
                        <button id="goBackBtn" onClick={() => { router.back() }}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                // backgroundColor: '#f2f5f7',
                                backgroundColor: 'inherit',
                                border: 'none',
                                // border: '1px dashed black',
                                fontSize: '.875rem',
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '9999px',
                                cursor: 'pointer',
                            }}>
                            <img src="/images/Icon/back-icon.svg"
                                alt="بازگشت"
                                style={{ width: '1.5rem', height: '1.5rem', }}
                            />
                        </button>

                        <div style={{
                            display: 'flex',
                            flexFlow: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flex: '1 1 auto', 
                            // border: '1px dashed orange',
                        }}>
                            {/* <Link style={{
                                display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: 'calc(100% - 2rem)', height: '40px', marginLeft: '1rem', marginRight: '1rem',
                                position: 'relative', padding: '10px 1rem', backgroundColor: '#f1f2f3', borderRadius: '9999px', gap: '0.25rem', textDecoration: 'none',
                            }} href="/search">
                                <svg style={{ width: '.875rem', height: '.875rem' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#a5abb1" className="size-3.5 shrink-0 fill-gray-500 text-gray"><path d="M22.07 21.47L18.93 18.34C20.52 16.61 21.5 14.3 21.5 11.77C21.5 6.40003 17.13 2.03003 11.76 2.03003C6.39003 2.03003 2.03003 6.40003 2.03003 11.77C2.03003 17.14 6.40003 21.51 11.77 21.51C14.07 21.51 16.18 20.71 17.84 19.37L21.01 22.53C21.16 22.68 21.35 22.75 21.54 22.75C21.73 22.75 21.92 22.68 22.07 22.53C22.36 22.24 22.36 21.76 22.07 21.47ZM3.53003 11.77C3.53003 7.22003 7.22003 3.53003 11.77 3.53003C16.32 3.53003 20.01 7.23003 20.01 11.77C20.01 16.31 16.31 20.01 11.77 20.01C7.23003 20.01 3.53003 16.31 3.53003 11.77Z" fill="inherit"></path></svg>
                                <p style={{ color: '#878b92', fontSize: '.75rem', lineHeight: '1rem', flex: '1 1 0%', }} className="flex-1 text-xs text-gray">جستجوی نام فروشگاه یا محصول...</p>
                            </Link> */}

                            <input placeholder="جستجوی نام محصول یا فروشگاه..." style={{
                                    width: '100%', outline: '2px solid transparent', outlineOffset: '2px', color: '#1b1c1d',fontFamily:'inherit',
                                    padding:'0px',border:'none', 
                                }} dir="rtl"></input>

                        </div>

                        <button id="goShoppingBacketBtn"
                            // onClick={showAddressListDrawer}
                            //   onClick={() => { setError('goooo!!') }}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'inherit',
                                border: 'none', 
                                fontSize: '.875rem', 
                                borderRadius: '9999px',
                                cursor: 'pointer',
                                padding:'0px',
                            }}>
                            <img src="/images/header/search-icon.svg" alt="جستجو"
                             style={{ width: '24px', height: '24px' }} />
                            
                        </button>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexFlow: 'row-reverse',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingRight: '1rem',
                            paddingLeft: '1rem',
                            // border: '1px dashed yellow',
                            width: '100%',
                            cursor: 'grab',
                        }} dir="rtl">
                        <SwiperInSearchHeaderComp
                        // openCollapseForSorting={openCollapseForSorting}
                        // openCollapseForRaveshErsal={openCollapseForRaveshErsal}
                        />
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

                    <div style={{
                        display: 'flex',
                        flexFlow: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        cursor: 'grab',
                    }}>
                        <SwiperGetStoresInSearchResault
                        // // openCollapseForSorting={openCollapseForSorting}
                        // // openCollapseForRaveshErsal={openCollapseForRaveshErsal}
                        // scrollToSection={scrollToSection}
                        // activeTab={activeTab}
                        />
                    </div>

                    <div className="-mx-4 my-4 h-3 bg-gray-50" style={{
                        backgroundColor: '#f7f7f8', height: '.75rem', width: '450px', //margin: '1rem -1rem',
                    }}></div>

                    <div style={{
                        display: 'flex',
                        flexFlow: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        cursor: 'grab',
                        paddingBottom: '1.25rem',
                    }}>
                        <SwiperGetProductsInSearchResault
                        // // openCollapseForSorting={openCollapseForSorting}
                        // // openCollapseForRaveshErsal={openCollapseForRaveshErsal}
                        // scrollToSection={scrollToSection}
                        // activeTab={activeTab}
                        />
                    </div>

                    {/* <Link style={{
                            display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: 'calc(100% - 2rem)', height: '40px', marginLeft: '1rem', marginRight: '1rem',
                            position: 'relative', padding: '10px 1rem', backgroundColor: '#f1f2f3', borderRadius: '9999px', gap: '0.25rem', textDecoration: 'none',
                        }} href="/search">
                        <svg style={{ width: '.875rem', height: '.875rem' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#a5abb1" className="size-3.5 shrink-0 fill-gray-500 text-gray"><path d="M22.07 21.47L18.93 18.34C20.52 16.61 21.5 14.3 21.5 11.77C21.5 6.40003 17.13 2.03003 11.76 2.03003C6.39003 2.03003 2.03003 6.40003 2.03003 11.77C2.03003 17.14 6.40003 21.51 11.77 21.51C14.07 21.51 16.18 20.71 17.84 19.37L21.01 22.53C21.16 22.68 21.35 22.75 21.54 22.75C21.73 22.75 21.92 22.68 22.07 22.53C22.36 22.24 22.36 21.76 22.07 21.47ZM3.53003 11.77C3.53003 7.22003 7.22003 3.53003 11.77 3.53003C16.32 3.53003 20.01 7.23003 20.01 11.77C20.01 16.31 16.31 20.01 11.77 20.01C7.23003 20.01 3.53003 16.31 3.53003 11.77Z" fill="inherit"></path></svg>
                        <p style={{ color: '#878b92', fontSize: '.75rem', lineHeight: '1rem', flex: '1 1 0%', }} className="flex-1 text-xs text-gray">جستجوی نام فروشگاه یا محصول...</p>
                    </Link> */}

                </main>

                <footer style={{
                    maxWidth: '450px', marginLeft: 'auto', marginRight: 'auto', zIndex: 50, bottom: 0, left: 0, right: 0, position: 'fixed',
                }}>
                </footer>

                <div className="tabIndexOne-in-LayoutWrapper" tabIndex={1}>
                </div>
            </div>
        </currentAddressContext.Provider>
    );
}
