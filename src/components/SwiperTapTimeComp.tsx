////zare_nk_050303_okk
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import Styles from "@/styles/components/location.module.css";
import globalsStyles from "@/styles/components/globals.module.css";
import { RefObject } from "react";
import { ReactNode } from "react";
import { ChangeEvent } from "react";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { MouseEvent } from "react";

import { Collapse, Button, Box, Paper, Typography, Grow, ClickAwayListener, Drawer } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'; //zare_nk_050204_added(for use Dialog)

import { useAuthentication } from '../context/AuthenticationContext';  //zare_nk_050111_added

////zare_nk_050226_added_st
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from "next/link";
////zare_nk_050226_added_end

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

export default function SwiperTapTimeComp() {

    ////zare_nk_050305_added_st
    const intervalRef = useRef<null | ReturnType<typeof setInterval>>(null);
    //// React.RefObject<NodeJS.Timeout | null>;
    const [hToString, setHToString] = useState<string | null>(null);
    const [mToString, setMToString] = useState<string | null>(null);
    const [sToString, setSToString] = useState<string | null>(null);
    const refForTimer = useRef<HTMLDivElement | null>(null);
    ////zare_nk_050305_added_end

    const [errorInSwiperTapTime, setErrorInSwiperTapTime] = useState<string | null>(null);

    const router = useRouter();

    type responsedListFromApiSelectShobehJashnvarehType = {
        // IdG1: number;
        // NameG1: string;
        // AxG1: string;
        // Tozihat: string;

        [key: string]: any;
    };

    const [responsedListFromApiSelectShobehJashnvareh, SetResponsedListFromApiSelectShobehJashnvareh] = useState<responsedListFromApiSelectShobehJashnvarehType[] | null>(null);
    const [timer, setTimer] = useState(0);  ////zare_nk_050307_added

    // alert('SwiperTapTimeComp rerendered-timer: ' + timer);

    const getSwiperTapTime = async () => {
        // alert('getSwiperTapTime');
        let token = getCookie("token");
        if (!token) {
            setErrorInSwiperTapTime("lotfan avval online shid");
            return;
        }
        console.log('tokentokentoken: ' + token);
        let ApiUrl = "https://api.tochikala.com/api/";
        const response = await fetch(ApiUrl + "User/Api_SelectShobehJashnvareh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                IdShobeh: 6,
                Take: 12,
            }),
        });
        const data = await response.json();

        if (response.ok) {
            console.log("zare_nk_050307-data: " + JSON.stringify(data));
            if (data.status == 0) {
                if (data.data.list == undefined) {
                    return;
                }

                var parsedList = JSON.parse(data.data.list);

                var parsedTimer = JSON.parse(data.data.timer);
                let timer = parsedTimer[0].Timer;
                // var Gorooh = parsedList.Gorooh;

                SetResponsedListFromApiSelectShobehJashnvareh(() => {
                    return parsedList
                });

                setTimer(timer);  ////zare_nk_050307_added
                // ////zare_nk_050307_added_st
                // setTimer(() => {
                //     return timer
                // });
                // ////zare_nk_050307_added_end

            } else {
                setErrorInSwiperTapTime("متاسفانه خطایی رخ داده است34:" + data.errors);
                console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
            }
        } else {
            console.log("zare_nk_050110-!response.ok" + response.ok);
            setErrorInSwiperTapTime("متاسفانه خطایی رخ داده است35");
        }
    }

    useEffect(() => {
        getSwiperTapTime();
    }, []);

    ////zare_nk_050307_added_st
    useEffect(() => {
        // alert('0');
        if (responsedListFromApiSelectShobehJashnvareh == null) {
            // alert('1');
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            return;
        }
        // alert('2');
        ////zare_nk_050307_added_st
        intervalRef.current = setInterval(function () {
            ////zare_nk_050307_commented_st
            // if (calculateWinner(squares)) {
            //     setTimerDisplay("none");
            //     if (intervalRef.current !== null) {
            //         clearInterval(intervalRef.current);
            //     }
            //     setTimer(-1);
            //     return;
            // }
            ////zare_nk_050307_commented_end

            setTimer((curTimer) => {
                // alert('kkkk' + timer+'-curTimer: '+curTimer);
                if (curTimer < 0) {
                    if (intervalRef.current !== null) {
                        clearInterval(intervalRef.current);
                    }

                    ////zare_nk_050307_commented_st
                    // setXIsNextState(!xIsNextRef.current);
                    // squares[squares.length - 1] = !xIsNextRef.current ? "X" : "O";  
                    // localStorage.setItem(   
                    //     "xIsNextState",
                    //     JSON.stringify(!xIsNextRef.current)
                    // );
                    ////zare_nk_050307_commented_end

                    // localStorage.setItem("timer", JSON.stringify(5000));  ////zare_nk_050307_commented 

                    // return 5000;  ////zare_nk_050307_commented
                    return 0;  ////zare_nk_050307_added
                }
                // let h = Math.floor(timer / (1000 * 60 * 60));    ////zare_nk_050307_commented
                let h = Math.floor(curTimer / (1000 * 60 * 60)); ////zare_nk_050307_added
                let hToString = h.toString();
                hToString = hToString.length === 1 ? "0" + hToString : hToString;
                ////zare_nk_050307_nokteh(hatman tahlilshe chera timer ri inja moghdare avvaliye faghat mideh, vali curTimer ro berooz mideh!!)
                // let m = Math.floor((timer - h * 60 * 60 * 1000) / (60 * 1000));   ////zare_nk_050307_commented 
                let m = Math.floor((curTimer - h * 60 * 60 * 1000) / (60 * 1000));   ////zare_nk_050307_added
                let mToString = m.toString();
                mToString = mToString.length === 1 ? "0" + mToString : mToString;
                // let s = Math.floor((timer - h * 60 * 60 * 1000 - m * 60 * 1000) / 1000);  ////zare_nk_050307_commented
                let s = Math.floor((curTimer - h * 60 * 60 * 1000 - m * 60 * 1000) / 1000);
                let sToString = s.toString();
                sToString = sToString.length === 1 ? "0" + sToString : sToString;

                try {
                    if (hToString != "00") {
                        setHToString(hToString);
                        setMToString(mToString);
                        setSToString(sToString);
                    } else {
                        setMToString(mToString);
                        setSToString(sToString);
                    }

                } catch (error) {
                    if (error instanceof Error) {
                        console.log("zare_nk_040123-0004-Error:" + error.message);
                    } else {
                        console.log("zare_nk_040123-0004-Error: Unknown error");
                    }
                    if (intervalRef.current !== null) {
                        clearInterval(intervalRef.current);
                    }
                }
                // localStorage.setItem("timer", JSON.stringify(curTimer - 1000));
                // alert('timertimertimer:  ' + timer);
                return curTimer - 1000;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
        ////zare_nk_050307_added_end
    }, [responsedListFromApiSelectShobehJashnvareh]);
    ////zare_nk_050307_added_end

    return (
        <>
            {/* <div style={{
                width: '100%', height: '1rem', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 6px 8px 0px',marginBottom:'0.5rem',
                backgroundColor: '#fcfcfc', borderBottomLeftRadius: '.75rem', borderBottomRightRadius: '.75rem',
            }}>
            </div>   */}

            <div style={{
                display: 'flex', flexFlow: 'column', gap: '.5rem', width: '100%',
                backgroundColor: '#a1a8ff',   ////zare_nk_050305_added
            }} >

                <div style={{
                    width: '100%', height: '1rem', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 6px 8px 0px', marginBottom: '0.5rem',
                    backgroundColor: '#fcfcfc', borderBottomLeftRadius: '.75rem', borderBottomRightRadius: '.75rem',
                }}>
                </div>

                <div
                    style={{
                        display: 'flex', flexFlow: "row", justifyContent: "space-between", alignItems: 'center',
                        width: '100%', paddingLeft: '1rem', paddingRight: '1rem',
                    }}
                >
                    {/* <h2 style={{ color: '#313335', lineHeight: '1.75rem', fontSize: '1.125rem', fontWeight: '500', margin: '0px', }}>
                        بهترین&zwnj;های تپسی&zwnj;فود
                    </h2> */}
                    <div style={{
                        display: 'flex', flexFlow: 'row', alignItems: "center", gap: '.25rem',
                    }}>
                        {/* <span style={{
                            color: '#878b92',
                            fontSize: '.75rem',
                            margin: '0px',

                        }}>58000</span> */}
                        <img
                            src="/images/movaghat/SwiperTapBests/peykoff.svg"
                            alt="peykoff"
                            style={{ marginTop: '10px', }}
                        />
                        <span style={{
                            color: '#fffc',
                            //    fontWeight: 500,
                            fontSize: '.875rem',
                            lineHeight: '1.25rem',

                        }}>ارسال رایگان</span>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <img
                            src="/images/movaghat/SwiperTapBests/timer.svg"
                            alt="تایمر"
                            style={{
                                position: 'absolute', width: '4rem', height: '4rem', zIndex: 0, top: '.25rem', left: '.25rem',
                            }}
                        />

                        {/* <div
                            // ref={refForTimer}   ////zare_nk_050305_nokteh(az state bejaye useRef estefadeh shod)
                            id="timermoveOpportunity" style={{ display: "flex", flexFlow: "row", color: "red", cursor: 'not-allowed', }} > 
                            <span style={{ borderRadius: '5px', color: '#b7bdc2', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '.875rem', }}>00</span>
                            <span style={{ color: '#b7bdc2', padding: '0px 3px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '.875rem', }}>:</span>
                            <span style={{ borderRadius: '5px', color: '#b7bdc2', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '.875rem' }}>32</span>
                        </div> */}

                        <div
                            ref={refForTimer}
                            id="timermoveOpportunity"
                            style={{ display: "flex", flexFlow: "row-reverse", color: "red", cursor: 'not-allowed', }}
                        >
                            {hToString != null && (
                                <>
                                    <span
                                        style={{
                                            borderRadius: "5px",
                                            color: "#b7bdc2",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontSize: '.875rem',
                                            // width: "30px",
                                            // height: "30px",
                                            // backgroundColor: "red",  
                                        }}
                                    >
                                        {hToString}
                                    </span>
                                    <span
                                        style={{
                                            color: "#b7bdc2",
                                            padding: "0px 3px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontSize: '.875rem',
                                        }}
                                    >
                                        :
                                    </span>
                                </>
                            )}

                            {mToString && (
                                <span
                                    style={{
                                        borderRadius: "5px",
                                        color: "#b7bdc2",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: '.875rem',
                                        // width: "30px",
                                        // height: "30px",
                                        // backgroundColor: "red",  
                                    }}
                                >
                                    {mToString}
                                </span>
                            )}

                            {sToString && (
                                <>
                                    <span
                                        style={{
                                            color: "#b7bdc2",
                                            padding: "0px 3px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontSize: '.875rem',
                                        }}
                                    >
                                        :
                                    </span>
                                    <span
                                        style={{
                                            borderRadius: "5px",
                                            color: "#b7bdc2",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontSize: '.875rem',
                                            // width: "30px",
                                            // height: "30px",
                                            // backgroundColor: "red",  
                                        }}
                                    >
                                        {sToString}
                                    </span>
                                </>
                            )}
                        </div>



















                    </div>

                    {/* <button
                        id="seeAllBtn"
                        // onClick={showAddressListDrawer}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#f2f5f7',
                            border: 'none',
                            fontSize: '.875rem',
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '9999px',
                            cursor: 'pointer',
                        }}>
                        <img
                            src="/images/Icon/see-all.svg"
                            alt="دیدن همه"
                            style={{ width: '1.25rem', height: '1.25rem', }}
                        />
                    </button> */}


                </div>

                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={24}  ////zare_nk_050305_nokteh(moadele 1.5rem(chon spaceBetween adad 1.5rem))  
                    slidesPerView="auto"  ////zare_nk_050226_nokteh(meghdaresh ro auto dadim ta bar asase arze SwiperSlide ha tedadesh automat tavasoote 
                    //// barnameh moshakhas she(pishfarz slidesPerView={1} hast))
                    // centeredSlides={true}
                    navigation={false}

                    className="SwiperTapTime"
                    style={{
                        width: '100%',
                        //  margin: '0px 19px',
                        //  height: '86px',
                        // height: '95px',
                        overflow: 'visible', ////zare_nk_050226_nokteh(baraye inke darsade takhfifha ke biroon mizanan dideh beshan)
                    }}
                >
                    {responsedListFromApiSelectShobehJashnvareh?.map((item, index) => {
                        console.log('050307-item: ' + JSON.stringify(item));
                        return (
                            <SwiperSlide
                                key={index}
                                style={{
                                    //  width: '72px',
                                    //  height: '80px',
                                    // height: '89px',
                                    // width: 'auto',
                                    width: '230px',
                                }}>



                                <div className="contInSlide" style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', //// width: '100%', height: '100%',
                                    backgroundColor: 'inherit', borderRadius: '.75rem', border: '1px solid #f6f6f7',
                                }}>
                                    <Link href="https://tapsi.food/business-lines?businessTypeId=6" style={{ width: '100%', height: '100%', textDecoration: 'none', }}>
                                        <div style={{
                                            display: 'flex', flexFlow: 'column', position: 'relative', width: '100%', height: '100%',
                                            justifyContent: 'center', alignItems: 'center',
                                            // rowGap: '0.25rem',   ////zare_nk_050304_commented(rowGap nazasht tapsifood)
                                        }}>
                                            <div style={{
                                                position: 'absolute', top: '.5rem', right: '-5px',
                                                width: '44px', height: '28px',
                                            }}>

                                                {/* zare_nk_050228_nokteh_st(birabt be API hast baraye designe gozashtam(badan dar api gonjandeh beshe ya age salah nist hazf besheh)) */}
                                                {
                                                    (index == 2 || index == 3 || index == 6) ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="28" viewBox="0 0 48 28" fill="none">
                                                            <path d="M44.159 0H1.00094C0.306976 0 -0.17601 0.689558 0.0611496 1.34174L3.44897 10.6583C3.52925 10.879 3.52925 11.121 3.44897 11.3417L0.0611496 20.6583C-0.17601 21.3104 0.30698 22 1.00094 22H41.5732C42.1255 22 42.5732 22.4477 42.5732 23V26.619C42.5732 27.0866 43.158 27.2983 43.4574 26.9391L47.1097 22.5563C47.4092 22.1968 47.5732 21.7438 47.5732 21.2759V3.41421C47.5732 2.50871 47.2135 1.64029 46.5732 1C45.933 0.359711 45.0645 0 44.159 0Z" fill="url(#paint0_linear_19043_112501)" />
                                                            <defs>
                                                                <linearGradient id="paint0_linear_19043_112501" x1="3.57324" y1="11" x2="47.5732" y2="11" gradientUnits="userSpaceOnUse">
                                                                    <stop stopColor="#1747A1" />
                                                                    <stop offset="1" stopColor="#2269EE" />
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>
                                                        :
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg" width="44" height="28" viewBox="0 0 44 28" fill="none">
                                                            <path d="M40.159 0H1.00094C0.306976 0 -0.17601 0.689558 0.0611496 1.34174L3.44897 10.6583C3.52925 10.879 3.52925 11.121 3.44897 11.3417L0.0611496 20.6583C-0.17601 21.3104 0.306976 22 1.00094 22H37.5732C38.1255 22 38.5732 22.4477 38.5732 23V26.619C38.5732 27.0866 39.158 27.2983 39.4574 26.9391L43.1097 22.5563C43.4092 22.1968 43.5732 21.7438 43.5732 21.2759V3.41421C43.5732 2.50871 43.2135 1.64029 42.5732 1C41.933 0.359711 41.0645 0 40.159 0Z" fill="url(#paint0_linear_19043_112508)" />
                                                            <defs>
                                                                <linearGradient id="paint0_linear_19043_112508" x1="-8.42676" y1="11" x2="43.5732" y2="11" gradientUnits="userSpaceOnUse">
                                                                    <stop stopColor="#CC4800" />
                                                                    <stop offset="1" stopColor="#FF5A00" />
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>
                                                }
                                                {/* zare_nk_050228_nokteh_end(birabt be API hast baraye designe gozashtam(badan dar api gonjandeh beshe ya age salah nist hazf besheh)) */}

                                                <span style={{
                                                    position: 'absolute',
                                                    top: '-5px',
                                                    width: '44px', height: '33px',
                                                    // border: '1px dashed red',
                                                    fontSize: '.625rem',
                                                    color: '#ffffff',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    {/* zare_nk_050228_nokteh_st(birabt be API hast baraye designe gozashtam(badan dar api gonjandeh beshe ya age salah nist hazf besheh)) */}
                                                    {
                                                        (index == 2 || index == 3 || index == 6) ? 'قسطی!' : 'تخفیف'
                                                    }
                                                    {/* zare_nk_050228_nokteh_end(birabt be API hast baraye designe gozashtam(badan dar api gonjandeh beshe ya age salah nist hazf besheh)) */}
                                                </span>
                                            </div>

                                            {/* zare_nk_050305_added_st */}
                                            <div style={{
                                                position: 'absolute', top: '.5rem', left: '-5px',
                                                width: '44px', height: '28px',
                                            }}>

                                                {/* zare_nk_050228_nokteh_st(birabt be API hast baraye designe gozashtam(badan dar api gonjandeh beshe ya age salah nist hazf besheh)) */}
                                                {
                                                    (index == 2 || index == 3 || index == 6) ?
                                                        <svg style={{ transform: 'scaleX(-1)', }} xmlns="http://www.w3.org/2000/svg" width="48" height="28" viewBox="0 0 48 28" fill="none">
                                                            <path d="M44.159 0H1.00094C0.306976 0 -0.17601 0.689558 0.0611496 1.34174L3.44897 10.6583C3.52925 10.879 3.52925 11.121 3.44897 11.3417L0.0611496 20.6583C-0.17601 21.3104 0.30698 22 1.00094 22H41.5732C42.1255 22 42.5732 22.4477 42.5732 23V26.619C42.5732 27.0866 43.158 27.2983 43.4574 26.9391L47.1097 22.5563C47.4092 22.1968 47.5732 21.7438 47.5732 21.2759V3.41421C47.5732 2.50871 47.2135 1.64029 46.5732 1C45.933 0.359711 45.0645 0 44.159 0Z" fill="url(#paint0_linear_19043_112501)" />
                                                            <defs>
                                                                <linearGradient id="paint0_linear_19043_112501" x1="3.57324" y1="11" x2="47.5732" y2="11" gradientUnits="userSpaceOnUse">
                                                                    <stop stopColor="#1747A1" />
                                                                    <stop offset="1" stopColor="#2269EE" />
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>
                                                        :
                                                        <svg style={{ transform: 'scaleX(-1)', }} xmlns="http://www.w3.org/2000/svg" width="44" height="28" viewBox="0 0 44 28" fill="none">
                                                            <path d="M40.159 0H1.00094C0.306976 0 -0.17601 0.689558 0.0611496 1.34174L3.44897 10.6583C3.52925 10.879 3.52925 11.121 3.44897 11.3417L0.0611496 20.6583C-0.17601 21.3104 0.306976 22 1.00094 22H37.5732C38.1255 22 38.5732 22.4477 38.5732 23V26.619C38.5732 27.0866 39.158 27.2983 39.4574 26.9391L43.1097 22.5563C43.4092 22.1968 43.5732 21.7438 43.5732 21.2759V3.41421C43.5732 2.50871 43.2135 1.64029 42.5732 1C41.933 0.359711 41.0645 0 40.159 0Z" fill="url(#paint0_linear_19043_112508)" />
                                                            <defs>
                                                                <linearGradient id="paint0_linear_19043_112508" x1="-8.42676" y1="11" x2="43.5732" y2="11" gradientUnits="userSpaceOnUse">
                                                                    <stop stopColor="#CC4800" />
                                                                    <stop offset="1" stopColor="#FF5A00" />
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>
                                                }
                                                {/* zare_nk_050228_nokteh_end(birabt be API hast baraye designe gozashtam(badan dar api gonjandeh beshe ya age salah nist hazf besheh)) */}

                                                <span style={{
                                                    position: 'absolute',
                                                    top: '-5px',
                                                    width: '44px', height: '33px',
                                                    // border: '1px dashed red',
                                                    fontSize: '.625rem',
                                                    color: '#ffffff',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    {/* zare_nk_050228_nokteh_st(birabt be API hast baraye designe gozashtam(badan dar api gonjandeh beshe ya age salah nist hazf besheh)) */}
                                                    {
                                                        (index == 2 || index == 3 || index == 6) ? 'قسطی!' : 'تخفیف'
                                                    }
                                                    {/* zare_nk_050228_nokteh_end(birabt be API hast baraye designe gozashtam(badan dar api gonjandeh beshe ya age salah nist hazf besheh)) */}
                                                </span>
                                            </div>
                                            {/* zare_nk_050305_added_enf */}

                                            <img
                                                style={{
                                                    width: '100%',
                                                    // marginTop: '5px', marginBottom: '0px',
                                                    ////zare_nk_050314_added_st
                                                    height: '105px', objectFit: 'cover',
                                                    borderTopLeftRadius: '.5rem',
                                                    borderTopRightRadius: '.5rem',
                                                    ////zare_nk_050314_added_end 
                                                }}
                                                // src={`/images/SwiperGrouplevel1/${item.AxG1}.png`} />  ////zare_nk_050229_nokteh(age az database bekhooneh bade emale database food tavassote parsa)
                                                // src={`/images/SwiperGrouplevel1/${index}.png`} />
                                                // https://img.tochikala.com/Product/' + item.IdKala
                                                src={`/images/movaghat/SwiperTapTime/${index}.jpg`} />


                                            <div style={{
                                                display: 'flex', flexFlow: 'column',
                                                paddingTop: '2px',
                                                gap: '.25rem',
                                                width: '100%',
                                            }}>

                                                <div style={{
                                                    display: 'flex', flexFlow: 'row', width: '100%',
                                                }}>
                                                    <div style={{
                                                        display: 'flex', flexFlow: 'row', width: '100%', padding: '0px .75rem', justifyContent: 'space-between',
                                                        marginTop: '8px',
                                                    }}>

                                                        <div style={{
                                                            fontSize: '0.875rem',
                                                            color: '#1b1c1d',

                                                            // این بخش برای سه‌نقطه و محدودیت ۲ خط
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
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
                                                            {item.NameKala}
                                                        </div>

                                                        <div style={{
                                                            display: 'flex', flexFlow: 'row', gap: '2px', alignItems: 'center',
                                                        }}>
                                                            <span

                                                                style={{
                                                                    color: '#a4aab0',
                                                                    //    fontWeight: 600,
                                                                    fontSize: '10px',

                                                                }}
                                                            >(362)</span>
                                                            <p style={{
                                                                color: '#1b1c1d',
                                                                //    fontWeight: 600,
                                                                fontSize: '.75rem',
                                                                margin: '0px',

                                                            }}>4.2</p>
                                                            <img
                                                                src="/images/movaghat/SwiperTapTime/star/star.svg"
                                                                alt="علاقه مندی"
                                                                style={{ width: '.75rem', height: '.75rem', }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>


                                                {/* zare_nk_050305_added_st */}
                                                <div style={{
                                                    display: 'flex', flexFlow: 'row', width: '100%', marginBottom: '2px',
                                                }}>
                                                    <div style={{
                                                        display: 'flex', flexFlow: 'row', width: '100%', padding: '0px .75rem', justifyContent: 'space-between',
                                                        // marginTop: '8px',
                                                    }}>

                                                        <div style={{
                                                            display: 'flex', flexFlow: 'row', gap: '2px', alignItems: 'center',
                                                        }}>
                                                            <span
                                                                style={{
                                                                    color: '#878b92',
                                                                    fontSize: '.75rem',
                                                                }}
                                                            >
                                                                پیک تپسی&zwnj;فود:
                                                            </span>
                                                            <div style={{
                                                                display: 'flex', flexFlow: 'row', alignItems: "center", gap: '.25rem',
                                                            }}>
                                                                <span style={{
                                                                    color: '#878b92',
                                                                    fontSize: '.75rem',
                                                                    margin: '0px',

                                                                }}>58000</span>
                                                                <span style={{
                                                                    color: '#059666',
                                                                    //    fontWeight: 500,
                                                                    fontSize: '.875rem',
                                                                    lineHeight: '1.25rem',

                                                                }}>رایگان</span>
                                                            </div>

                                                        </div>

                                                        <span style={{
                                                            color: '#878b92',
                                                            fontSize: '.75rem',
                                                            lineHeight: '18px',
                                                        }}>
                                                            تا 50 دقیقه
                                                        </span>

                                                    </div>

                                                </div>
                                                {/* zare_nk_050305_added_end */}




                                            </div>


                                        </div>
                                    </Link>
                                </div>



                            </SwiperSlide>
                        )
                    })}
                </Swiper>




                {/* zare_nk_050307_added_st */}
                <div style={{
                    width: '100%', height: '1rem', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 6px 8px 0px', marginTop: '0.5rem',
                    backgroundColor: '#fcfcfc', borderTopLeftRadius: '.75rem', borderTopRightRadius: '.75rem',
                }}>
                </div>
                {/* zare_nk_050307_added_end */}






            </div>

            {/* </div> */}

        </>
    );
}