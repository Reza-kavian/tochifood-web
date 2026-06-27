////zare_nk_050303_okk
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, memo, RefObject, ReactNode, ChangeEvent, MouseEvent } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
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

function getCookie(name: any) {
    ////zare_nk_050209_added_st
    if (typeof document === 'undefined') {
        console.log("document === 'undefined'");
        return null; // برای جلوگیری از خطای عدم وجود document
    }
    console.log("document !== 'undefined'");
    ////zare_nk_050209_added_end
    const value = `; ${document.cookie}`; // برای اطمینان از یافتن کوکی‌ها
    console.log("value is: " + value);
    const parts = value.split(`; ${name}=`); // تفکیک کوکی‌ها
    if (parts.length === 2) {
        console.log("dohe-parts.length: " + parts.length);
        const raw = parts.pop();
        if (!raw) throw new Error("No parts found");
        const value = raw.split(";").shift();
        if (!value) throw new Error("Invalid cookie format");
        return decodeURIComponent(value);
    }
    console.log("do nist-parts.length: " + parts.length);
    return null; //اگر کوکی پیدا نشد
}


const SwiperInVendorHeaderComp = ({
    // openCollapseForSorting,
    // openCollapseForRaveshErsal
    scrollToSection,
    activeTab
}: {
    // openCollapseForSorting: () => void;
    // openCollapseForRaveshErsal: () => void;
    scrollToSection: (id:string) => void;
    activeTab: string|null;
}) => {
// const SwiperInVendorHeaderComp = () => {

    console.log('050329-SwiperInVendorHeaderComp rendered!!');   ////zare_nk_050329_added
    const [errorInSwiperTapBests, setErrorInSwiperTapBests] = useState<string | null>(null);

    const router = useRouter();

    type responsedListFromApiSelectGoroohJsonType = {
        IdG1: number;
        NameG1: string;
        AxG1: string;
        Tozihat: string;
        // MetaDesc: string;  //؟؟
        // tbl_Gorooh2
        // .
        // .
        // .
        [key: string]: any;
    };

    const [responsedListFromApiSelectGoroohJson, SetResponsedListFromApiSelectGoroohJson] = useState<responsedListFromApiSelectGoroohJsonType[] | null>(null);

    const getSwiperTapBests = async () => {
        let token = await getCookie("token");
        if (!token) {
            setErrorInSwiperTapBests("lotfan avval online shid");
            return;
        }
        console.log('tokentokentoken: ' + token);
        let ApiUrl = "https://api.tochikala.com/api/";
        const response = await fetch(ApiUrl + "User/Api_SelectGoroohJson", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({}),
        });
        const data = await response.json();

        if (response.ok) {
            console.log("zare_nk_050228-data: " + JSON.stringify(data));
            if (data.status == 0) {
                if (data.data.list == undefined) {
                    return;
                }
                var parsedList = JSON.parse(data.data.list);
                var Gorooh = parsedList.Gorooh;
                SetResponsedListFromApiSelectGoroohJson(() => {
                    return Gorooh
                });
            } else {
                setErrorInSwiperTapBests("متاسفانه خطایی رخ داده است34:" + data.errors);
                console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
            }
        } else {
            console.log("zare_nk_050110-!response.ok" + response.ok);
            setErrorInSwiperTapBests("متاسفانه خطایی رخ داده است35");
        }
    }

    useEffect(() => {
        getSwiperTapBests();  ////zare_nk_050403_nokteh(mthode getSwiperTapBests dar in header bomorede va baraye olgu gozashte shode!)  ////zare_nk_050403_commented_movaghat
    }, []);

    return (
        <>
            {/* <div style={{
                display: 'flex', flexFlow: 'column', width: '100%',

            }} > 
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={12}  ////zare_nk_050305_nokteh(moadele 0.75rem(chon spaceBetween adad 0.75rem))  
                    slidesPerView="auto"  ////zare_nk_050226_nokteh(meghdaresh ro auto dadim ta bar asase arze SwiperSlide ha tedadesh automat tavasoote 
                    //// barnameh moshakhas she(pishfarz slidesPerView={1} hast))
                    // centeredSlides={true}
                    navigation={false}

                    className="SwiperTapBests"
                    style={{
                        width: '100%',
                        //  margin: '0px 19px',
                        //  height: '86px',
                        // height: '95px',
                        // overflow: 'visible', ////zare_nk_050226_nokteh(baraye inke darsade takhfifha ke biroon mizanan dideh beshan)   ////zare_nk_050317_commented(baraye swiper overflow: 'visible' 
                        //// manteghi nist, chon arze colle slideha ro migire, na arze masalan 100% pedaresh ro)ب
                    }}
                >
                    {responsedListFromApiSelectGoroohJson?.map((item, index) => {
                        console.log('00-item.IdAdress: ' + JSON.stringify(item));
                        console.log('00-item.IdAdress: ' + JSON.stringify(item));
                        return (
                            <SwiperSlide
                                key={index}
                                style={{
                                    //  width: '72px',
                                    //  height: '80px',
                                    // height: '89px',
                                    width: 'auto',  ////zare_nk_050331_added
                                    // width: '230px',  ////zare_nk_050331_commented
                                }}>
                                <div className="contInSlide" style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', //// width: '100%', height: '100%',
                                    backgroundColor: 'inherit', borderRadius: '.75rem', border: '1px solid #f6f6f7',
                                }}>
                                    <button style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        // width: '100%', 
                                        // height: '100%',
                                        textDecoration: 'none',
                                        // backgroundColor: '#f1f2f3',
                                        backgroundColor: 'white',
                                        // border: 'none',
                                        border: '1px solid #cdd2d5',
                                        fontSize: '.875rem',
                                        borderRadius: '9999px',
                                        cursor: 'pointer',
                                        // width: '2rem',
                                        // height: '2rem',
                                        padding: '8px 10px',
                                    }}>
                                        <div style={{
                                            display: 'flex', flexFlow: 'row-reverse', position: 'relative', width: '100%', height: '100%',
                                            justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                                            // rowGap: '0.25rem',   ////zare_nk_050304_commented(rowGap nazasht tapsifood)
                                        }}>
                                            <div style={{
                                                display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center',
                                            }}>                                                
                                                <svg style={{ width: '1rem', height: '1rem', }} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-4"><g id="Swap"><path id="Union" fillRule="evenodd" clipRule="evenodd" d="M7.42002 3.28999C7.43002 3.29999 7.44002 3.29999 7.44002 3.29999L11.52 7.39999C11.81 7.68999 11.81 8.16999 11.52 8.45999C11.37 8.60999 11.18 8.67999 10.99 8.67999C10.8 8.67999 10.61 8.60999 10.46 8.45999L7.66002 5.64999V17.45C7.66002 17.86 7.32002 18.2 6.91002 18.2C6.50002 18.2 6.16002 17.86 6.16002 17.45V5.64999L3.36002 8.45999C3.07002 8.74999 2.59002 8.74999 2.30002 8.45999C2.01002 8.16999 2.01002 7.68999 2.30002 7.39999L6.38002 3.29999C6.39002 3.28999 6.40002 3.28999 6.40002 3.28999C6.53002 3.15999 6.71002 3.07999 6.91002 3.07999C7.11002 3.07999 7.29002 3.15999 7.42002 3.28999ZM20.3899 15.54C20.68 15.25 21.16 15.25 21.45 15.54C21.74 15.83 21.74 16.31 21.45 16.6L17.37 20.7C17.3176 20.7524 17.2652 20.7819 17.2062 20.8151C17.1976 20.82 17.1888 20.8249 17.18 20.83C17.1721 20.8339 17.1657 20.8394 17.1597 20.8446C17.1505 20.8527 17.1421 20.86 17.13 20.86C17.04 20.9 16.94 20.92 16.84 20.92C16.74 20.92 16.64 20.9 16.55 20.86C16.54 20.86 16.5325 20.8525 16.525 20.845C16.5175 20.8375 16.51 20.83 16.5 20.83C16.43 20.79 16.36 20.75 16.31 20.7L12.23 16.6C11.94 16.31 11.94 15.83 12.23 15.54C12.52 15.25 13 15.25 13.29 15.54L16.09 18.35V6.54999C16.09 6.13999 16.43 5.79999 16.84 5.79999C17.25 5.79999 17.59 6.13999 17.59 6.54999V18.35L20.3899 15.54Z" fill="#63676e"></path></g></svg>
                                            </div>

                                            <div style={{
                                                display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center',
                                            }}>
                                                <div style={{
                                                    fontSize: '0.875rem',
                                                    // color: '#1b1c1d',    ////zare_nk_050331_commented
                                                    color: '#000',     ////zare_nk_050331_added

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

                                                    textAlign: 'center',
                                                }}>
                                                    {item.NameG1}
                                                </div>
                                            </div>

                                        </div>
                                    </button>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div> */}

            <div style={{
                display: 'flex', flexFlow: 'column', width: '100%', 
            }} >
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={12}  ////zare_nk_050305_nokteh(moadele 0.75rem(chon spaceBetween adad 0.75rem))  
                    slidesPerView="auto"  ////zare_nk_050226_nokteh(meghdaresh ro auto dadim ta bar asase arze SwiperSlide ha tedadesh automat tavasoote 
                    //// barnameh moshakhas she(pishfarz slidesPerView={1} hast))
                    // centeredSlides={true}
                    navigation={false}

                    className="SwiperTapBests"
                    style={{
                        width: '100%',
                        //  margin: '0px 19px',
                        //  height: '86px',
                        // height: '95px',
                        // overflow: 'visible', ////zare_nk_050226_nokteh(baraye inke darsade takhfifha ke biroon mizanan dideh beshan)   ////zare_nk_050317_commented(baraye swiper overflow: 'visible' 
                        //// manteghi nist, chon arze colle slideha ro migire, na arze masalan 100% pedaresh ro)ب
                    }}
                    dir="rtl"  ////zare_nk_050331_added(baraye rtl kardane slide ha)
                >
                    <SwiperSlide
                        style={{
                            //  width: '72px',
                            //  height: '80px',
                            // height: '89px',
                            width: 'auto',  ////zare_nk_050331_added
                            // width: '230px',  ////zare_nk_050331_commented
                        }}>
                        <div className="contInSlide" style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', //// width: '100%', height: '100%',
                            backgroundColor: 'inherit', borderRadius: '.75rem', border: '1px solid #f6f6f7',
                        }}>
                            <button
                                // id="openCollapseForSortingBtn"   
                                // onClick={openCollapseForSorting}  
                                onClick={() => { scrollToSection('111') }}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // width: '100%', 
                                    // height: '100%',
                                    textDecoration: 'none',
                                    // // backgroundColor: '#f1f2f3',
                                    // backgroundColor: 'white',
                                    // border: 'none',
                                    border: '1px solid #cdd2d5',
                                    fontSize: '.875rem',
                                    borderRadius: '9999px',
                                    cursor: 'pointer',
                                    // width: '2rem',
                                    // height: '2rem',
                                    padding: '8px 10px',

                                     backgroundColor: (activeTab == '111' ? '#f1f2f3' : 'white')
                                }}>
                                <div style={{
                                    display: 'flex', flexFlow: 'row', position: 'relative', width: '100%', height: '100%',
                                    justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                                    // rowGap: '0.25rem',   ////zare_nk_050304_commented(rowGap nazasht tapsifood)
                                }}>
                                    <div style={{
                                        display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center',
                                    }}>
                                        <svg style={{ width: '1rem', height: '1rem', }} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-4"><g id="Swap"><path id="Union" fillRule="evenodd" clipRule="evenodd" d="M7.42002 3.28999C7.43002 3.29999 7.44002 3.29999 7.44002 3.29999L11.52 7.39999C11.81 7.68999 11.81 8.16999 11.52 8.45999C11.37 8.60999 11.18 8.67999 10.99 8.67999C10.8 8.67999 10.61 8.60999 10.46 8.45999L7.66002 5.64999V17.45C7.66002 17.86 7.32002 18.2 6.91002 18.2C6.50002 18.2 6.16002 17.86 6.16002 17.45V5.64999L3.36002 8.45999C3.07002 8.74999 2.59002 8.74999 2.30002 8.45999C2.01002 8.16999 2.01002 7.68999 2.30002 7.39999L6.38002 3.29999C6.39002 3.28999 6.40002 3.28999 6.40002 3.28999C6.53002 3.15999 6.71002 3.07999 6.91002 3.07999C7.11002 3.07999 7.29002 3.15999 7.42002 3.28999ZM20.3899 15.54C20.68 15.25 21.16 15.25 21.45 15.54C21.74 15.83 21.74 16.31 21.45 16.6L17.37 20.7C17.3176 20.7524 17.2652 20.7819 17.2062 20.8151C17.1976 20.82 17.1888 20.8249 17.18 20.83C17.1721 20.8339 17.1657 20.8394 17.1597 20.8446C17.1505 20.8527 17.1421 20.86 17.13 20.86C17.04 20.9 16.94 20.92 16.84 20.92C16.74 20.92 16.64 20.9 16.55 20.86C16.54 20.86 16.5325 20.8525 16.525 20.845C16.5175 20.8375 16.51 20.83 16.5 20.83C16.43 20.79 16.36 20.75 16.31 20.7L12.23 16.6C11.94 16.31 11.94 15.83 12.23 15.54C12.52 15.25 13 15.25 13.29 15.54L16.09 18.35V6.54999C16.09 6.13999 16.43 5.79999 16.84 5.79999C17.25 5.79999 17.59 6.13999 17.59 6.54999V18.35L20.3899 15.54Z" fill="#63676e"></path></g></svg>
                                    </div>

                                    <div style={{
                                        display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center',
                                    }}>
                                        <div style={{
                                            fontSize: '0.875rem',
                                            // color: '#1b1c1d',    ////zare_nk_050331_commented
                                            color: '#000',     ////zare_nk_050331_added

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

                                            textAlign: 'center',
                                        }}>
                                            مرتب&zwnj;سازی
                                        </div>
                                    </div>

                                </div>
                            </button>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide
                        style={{
                            //  width: '72px',
                            //  height: '80px',
                            // height: '89px',
                            width: 'auto',  ////zare_nk_050331_added
                            // width: '230px',  ////zare_nk_050331_commented
                        }}>
                        <div className="contInSlide" style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', //// width: '100%', height: '100%',
                            backgroundColor: 'inherit', borderRadius: '.75rem', border: '1px solid #f6f6f7',
                        }}>
                            <button
                                // id="openCollapseForRaveshErsalBtn"  
                                // onClick={openCollapseForRaveshErsal}   
                                onClick={() => { scrollToSection('222') }}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // width: '100%', 
                                    // height: '100%',
                                    textDecoration: 'none',
                                    // // backgroundColor: '#f1f2f3',
                                    // backgroundColor: 'white',
                                    // border: 'none',
                                    border: '1px solid #cdd2d5',
                                    fontSize: '.875rem',
                                    borderRadius: '9999px',
                                    cursor: 'pointer',
                                    // width: '2rem',
                                    // height: '2rem',
                                    padding: '8px 10px',
                                      backgroundColor: (activeTab == '222' ? '#f1f2f3' : 'white')
                                }}>
                                <div style={{
                                    display: 'flex', flexFlow: 'row-reverse', position: 'relative', width: '100%', height: '100%',
                                    justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                                    // rowGap: '0.25rem',   ////zare_nk_050304_commented(rowGap nazasht tapsifood)
                                }}>
                                    {/* <div style={{
                                                display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center',
                                            }}>                                                
                                                <svg style={{ width: '1rem', height: '1rem', }} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-4"><g id="Swap"><path id="Union" fillRule="evenodd" clipRule="evenodd" d="M7.42002 3.28999C7.43002 3.29999 7.44002 3.29999 7.44002 3.29999L11.52 7.39999C11.81 7.68999 11.81 8.16999 11.52 8.45999C11.37 8.60999 11.18 8.67999 10.99 8.67999C10.8 8.67999 10.61 8.60999 10.46 8.45999L7.66002 5.64999V17.45C7.66002 17.86 7.32002 18.2 6.91002 18.2C6.50002 18.2 6.16002 17.86 6.16002 17.45V5.64999L3.36002 8.45999C3.07002 8.74999 2.59002 8.74999 2.30002 8.45999C2.01002 8.16999 2.01002 7.68999 2.30002 7.39999L6.38002 3.29999C6.39002 3.28999 6.40002 3.28999 6.40002 3.28999C6.53002 3.15999 6.71002 3.07999 6.91002 3.07999C7.11002 3.07999 7.29002 3.15999 7.42002 3.28999ZM20.3899 15.54C20.68 15.25 21.16 15.25 21.45 15.54C21.74 15.83 21.74 16.31 21.45 16.6L17.37 20.7C17.3176 20.7524 17.2652 20.7819 17.2062 20.8151C17.1976 20.82 17.1888 20.8249 17.18 20.83C17.1721 20.8339 17.1657 20.8394 17.1597 20.8446C17.1505 20.8527 17.1421 20.86 17.13 20.86C17.04 20.9 16.94 20.92 16.84 20.92C16.74 20.92 16.64 20.9 16.55 20.86C16.54 20.86 16.5325 20.8525 16.525 20.845C16.5175 20.8375 16.51 20.83 16.5 20.83C16.43 20.79 16.36 20.75 16.31 20.7L12.23 16.6C11.94 16.31 11.94 15.83 12.23 15.54C12.52 15.25 13 15.25 13.29 15.54L16.09 18.35V6.54999C16.09 6.13999 16.43 5.79999 16.84 5.79999C17.25 5.79999 17.59 6.13999 17.59 6.54999V18.35L20.3899 15.54Z" fill="#63676e"></path></g></svg>
                                            </div> */}

                                    <div style={{
                                        display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center',
                                    }}>
                                        <div style={{
                                            fontSize: '0.875rem',
                                            // color: '#1b1c1d',    ////zare_nk_050331_commented
                                            color: '#000',     ////zare_nk_050331_added

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

                                            textAlign: 'center',
                                        }}>
                                            روش ارسال
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide
                        style={{
                            //  width: '72px',
                            //  height: '80px',
                            // height: '89px',
                            width: 'auto',  ////zare_nk_050331_added
                            // width: '230px',  ////zare_nk_050331_commented
                        }}>
                        <div className="contInSlide" style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', //// width: '100%', height: '100%',
                            backgroundColor: 'inherit', borderRadius: '.75rem', border: '1px solid #f6f6f7',
                        }}>
                            <button
                                onClick={() => { scrollToSection('333') }}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // width: '100%', 
                                    // height: '100%',
                                    textDecoration: 'none',
                                    // // backgroundColor: '#f1f2f3',
                                    // backgroundColor: 'white',
                                    // border: 'none',
                                    border: '1px solid #cdd2d5',
                                    fontSize: '.875rem',
                                    borderRadius: '9999px',
                                    cursor: 'pointer',
                                    // width: '2rem',
                                    // height: '2rem',
                                    padding: '8px 10px',
                                      backgroundColor: (activeTab == '333' ? '#f1f2f3' : 'white')
                                }}>
                                <div style={{
                                    display: 'flex', flexFlow: 'row-reverse', position: 'relative', width: '100%', height: '100%',
                                    justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                                    // rowGap: '0.25rem',   ////zare_nk_050304_commented(rowGap nazasht tapsifood)
                                }}>
                                    {/* <div style={{
                                                display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center',
                                            }}>                                                
                                                <svg style={{ width: '1rem', height: '1rem', }} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-4"><g id="Swap"><path id="Union" fillRule="evenodd" clipRule="evenodd" d="M7.42002 3.28999C7.43002 3.29999 7.44002 3.29999 7.44002 3.29999L11.52 7.39999C11.81 7.68999 11.81 8.16999 11.52 8.45999C11.37 8.60999 11.18 8.67999 10.99 8.67999C10.8 8.67999 10.61 8.60999 10.46 8.45999L7.66002 5.64999V17.45C7.66002 17.86 7.32002 18.2 6.91002 18.2C6.50002 18.2 6.16002 17.86 6.16002 17.45V5.64999L3.36002 8.45999C3.07002 8.74999 2.59002 8.74999 2.30002 8.45999C2.01002 8.16999 2.01002 7.68999 2.30002 7.39999L6.38002 3.29999C6.39002 3.28999 6.40002 3.28999 6.40002 3.28999C6.53002 3.15999 6.71002 3.07999 6.91002 3.07999C7.11002 3.07999 7.29002 3.15999 7.42002 3.28999ZM20.3899 15.54C20.68 15.25 21.16 15.25 21.45 15.54C21.74 15.83 21.74 16.31 21.45 16.6L17.37 20.7C17.3176 20.7524 17.2652 20.7819 17.2062 20.8151C17.1976 20.82 17.1888 20.8249 17.18 20.83C17.1721 20.8339 17.1657 20.8394 17.1597 20.8446C17.1505 20.8527 17.1421 20.86 17.13 20.86C17.04 20.9 16.94 20.92 16.84 20.92C16.74 20.92 16.64 20.9 16.55 20.86C16.54 20.86 16.5325 20.8525 16.525 20.845C16.5175 20.8375 16.51 20.83 16.5 20.83C16.43 20.79 16.36 20.75 16.31 20.7L12.23 16.6C11.94 16.31 11.94 15.83 12.23 15.54C12.52 15.25 13 15.25 13.29 15.54L16.09 18.35V6.54999C16.09 6.13999 16.43 5.79999 16.84 5.79999C17.25 5.79999 17.59 6.13999 17.59 6.54999V18.35L20.3899 15.54Z" fill="#63676e"></path></g></svg>
                                            </div> */}

                                    <div style={{
                                        display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center',
                                    }}>
                                        <div style={{
                                            fontSize: '0.875rem',
                                            // color: '#1b1c1d',    ////zare_nk_050331_commented
                                            color: '#000',     ////zare_nk_050331_added

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

                                            textAlign: 'center',
                                        }}>
                                            فروشگاه&zwnj;های جدید
                                        </div>
                                    </div>

                                </div>
                            </button>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide
                        style={{
                            //  width: '72px',
                            //  height: '80px',
                            // height: '89px',
                            width: 'auto',  ////zare_nk_050331_added
                            // width: '230px',  ////zare_nk_050331_commented
                        }}>
                        <div className="contInSlide" style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', //// width: '100%', height: '100%',
                            backgroundColor: 'inherit', borderRadius: '.75rem', border: '1px solid #f6f6f7',
                        }}>
                            <button
                                onClick={() => { scrollToSection('444') }}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // width: '100%', 
                                    // height: '100%',
                                    textDecoration: 'none',
                                    // // backgroundColor: '#f1f2f3',
                                    // backgroundColor: 'white',
                                    // border: 'none',
                                    border: '1px solid #cdd2d5',
                                    fontSize: '.875rem',
                                    borderRadius: '9999px',
                                    cursor: 'pointer',
                                    // width: '2rem',
                                    // height: '2rem',
                                    padding: '8px 10px',
                                      backgroundColor: (activeTab == '444' ? '#f1f2f3' : 'white')
                                }}>
                                <div style={{
                                    display: 'flex', flexFlow: 'row-reverse', position: 'relative', width: '100%', height: '100%',
                                    justifyContent: 'center', alignItems: 'center', gap: '0.5rem',
                                    // rowGap: '0.25rem',   ////zare_nk_050304_commented(rowGap nazasht tapsifood)
                                }}>
                                    {/* <div style={{
                                                display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center',
                                            }}>                                                
                                                <svg style={{ width: '1rem', height: '1rem', }} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-4"><g id="Swap"><path id="Union" fillRule="evenodd" clipRule="evenodd" d="M7.42002 3.28999C7.43002 3.29999 7.44002 3.29999 7.44002 3.29999L11.52 7.39999C11.81 7.68999 11.81 8.16999 11.52 8.45999C11.37 8.60999 11.18 8.67999 10.99 8.67999C10.8 8.67999 10.61 8.60999 10.46 8.45999L7.66002 5.64999V17.45C7.66002 17.86 7.32002 18.2 6.91002 18.2C6.50002 18.2 6.16002 17.86 6.16002 17.45V5.64999L3.36002 8.45999C3.07002 8.74999 2.59002 8.74999 2.30002 8.45999C2.01002 8.16999 2.01002 7.68999 2.30002 7.39999L6.38002 3.29999C6.39002 3.28999 6.40002 3.28999 6.40002 3.28999C6.53002 3.15999 6.71002 3.07999 6.91002 3.07999C7.11002 3.07999 7.29002 3.15999 7.42002 3.28999ZM20.3899 15.54C20.68 15.25 21.16 15.25 21.45 15.54C21.74 15.83 21.74 16.31 21.45 16.6L17.37 20.7C17.3176 20.7524 17.2652 20.7819 17.2062 20.8151C17.1976 20.82 17.1888 20.8249 17.18 20.83C17.1721 20.8339 17.1657 20.8394 17.1597 20.8446C17.1505 20.8527 17.1421 20.86 17.13 20.86C17.04 20.9 16.94 20.92 16.84 20.92C16.74 20.92 16.64 20.9 16.55 20.86C16.54 20.86 16.5325 20.8525 16.525 20.845C16.5175 20.8375 16.51 20.83 16.5 20.83C16.43 20.79 16.36 20.75 16.31 20.7L12.23 16.6C11.94 16.31 11.94 15.83 12.23 15.54C12.52 15.25 13 15.25 13.29 15.54L16.09 18.35V6.54999C16.09 6.13999 16.43 5.79999 16.84 5.79999C17.25 5.79999 17.59 6.13999 17.59 6.54999V18.35L20.3899 15.54Z" fill="#63676e"></path></g></svg>
                                            </div> */}

                                    <div style={{
                                        display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center',
                                    }}>
                                        <div style={{
                                            fontSize: '0.875rem',
                                            // color: '#1b1c1d',    ////zare_nk_050331_commented
                                            color: '#000',     ////zare_nk_050331_added

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

                                            textAlign: 'center',
                                        }}>
                                            تخفیف&zwnj;دار
                                        </div>
                                    </div>

                                </div>
                            </button>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </>
    );
}

export default memo(SwiperInVendorHeaderComp); 