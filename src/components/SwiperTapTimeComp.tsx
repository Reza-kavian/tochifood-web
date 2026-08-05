////zare_nk_050514_okk(1)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, memo, RefObject, ReactNode, ChangeEvent, MouseEvent } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import Styles from "@/styles/components/location.module.css";
import globalsStyles from "@/styles/components/globals.module.css";

import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { Collapse, Button, Box, Paper, Typography, Grow, ClickAwayListener, Drawer } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'; //zare_nk_050204_added(for use Dialog)

import { useAuthentication } from '../context/AuthenticationContext';  //zare_nk_050111_added

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from "next/link";

import { NextJsApiUrl } from "../constants/Urls";

function getCookie(name: any) {
    if (typeof document === 'undefined') {
        console.log("document === 'undefined'");
        return null; // برای جلوگیری از خطای عدم وجود document
    }
    const value = `; ${document.cookie}`; // برای اطمینان از یافتن کوکی‌ها
    console.log("value is: " + value);
    const parts = value.split(`; ${name}=`); // تفکیک کوکی‌ها
    if (parts.length === 2) {
        console.log("050422-dohe-parts.length: " + parts.length);
        console.log("050422-dohe-name: " + name + '-document.cookie: ' + document.cookie);
        const raw = parts.pop();
        // if (!raw) throw new Error("No parts found");  ////zare_nk_050422_commented
        if (!raw) { return null; }  ////zare_nk_050422_added
        const value = raw.split(";").shift();
        // if (!value) throw new Error("Invalid cookie format");  ////zare_nk_050422_commented
        if (!value) { return null; }  ////zare_nk_050422_added
        return decodeURIComponent(value);
    }
    console.log("do nist-parts.length: " + parts.length);
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

type responsedListFromApiSelectShobehAtrafUserType = {
    IdShobe: number;
    NameSobe: string;
    KafKharid: number;
    Fasele: number;
    ZarfiatErsal: number;
    Keraye: number;
    NazdikTarinZamanErsal: string;
};

const SwiperTapTimeComp = () => {
    console.log('050329-SwiperTapTimeComp rendered!!');
    const intervalRef = useRef<null | ReturnType<typeof setInterval>>(null);
    //// React.RefObject<NodeJS.Timeout | null>;
    const [hToString, setHToString] = useState<string | null>(null);
    const [mToString, setMToString] = useState<string | null>(null);
    const [sToString, setSToString] = useState<string | null>(null);
    const refForTimer = useRef<HTMLDivElement | null>(null);

    const [errorInSwiperTapTime, setErrorInSwiperTapTime] = useState<string | null>(null);

    const [mycurrentAddressState, setMycurrentAddressState] = useState<responsedListFromApiSelectAddressListType | null>(null);
    const [currentShobeState, setCurrentShobeState] = useState<responsedListFromApiSelectShobehAtrafUserType | null>(null);

    const router = useRouter();

    type responsedListFromApiSelectShobehJashnvarehType = {
        [key: string]: any;
    };

    const [responsedListFromApiSelectShobehJashnvareh, SetResponsedListFromApiSelectShobehJashnvareh] = useState<responsedListFromApiSelectShobehJashnvarehType[] | null>(null);
    const [timer, setTimer] = useState(0);

    const getShobehAtrafUser = async (mycurrentAddressState: responsedListFromApiSelectAddressListType | null) => {
        let token = await getCookie("token");
        if (!token) {
            return null;
        }
        // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented  
        try {
            const response = await fetch(NextJsApiUrl + "Api_SelectShobehAtrafUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                // body: JSON.stringify({}),
                body: JSON.stringify({
                    "Id": mycurrentAddressState != null ? mycurrentAddressState.IdAdress : 1,  ////zare_nk_050416_nokteh(manzoor az Id hamoon IdAddress hast ke ya vaghei midam ya pishfarz hatman 1 mizaram(ehtemalan 1 haman meydoon saate) )
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log("zare_nk_050404-Api_SelectGoroohJson data1: " + JSON.stringify(data));
                if (data.status == 0) {
                    if (data.data.list == undefined) {
                        return null;
                    }
                    var parsedList = JSON.parse(data.data.list);
                    if (parsedList.length == 0) {
                        return null;
                    }
                    return parsedList[0] ?? null;
                } else {
                    console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
                    return null;
                }
            } else {
                console.log("zare_nk_050110-!response.ok" + response.ok);
                return null;
            }
        }
        catch (error) {
            return null;
        }
    }

    const getSwiperTapTime = async (currentShobeState: responsedListFromApiSelectShobehAtrafUserType | null) => {
        console.log("050331-getSwiperTapTime calles!!-currentShobeState: " + JSON.stringify(currentShobeState));
        let token = getCookie("token");
        if (!token) {
            setErrorInSwiperTapTime("lotfan avval online shid");
            return;
        }
        console.log("050331-getSwiperTapTime calles!!-token: " + token);
        // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented 
        const response = await fetch(NextJsApiUrl + "Api_SelectShobehJashnvareh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                IdShobeh: currentShobeState != null ? currentShobeState.IdShobe : 6,
                Take: 12,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            console.log("050331-getSwiperTapTime calles!!-data: " + JSON.stringify(data));
            //050331-getSwiperTapTime calles!!-data: {"status":0,"message":"","data":{"list":"[]","timer":"[{\"Timer\":16492000}]"},"errors":[]}
            if (data.status == 0) {
                if (data.data.list == undefined) {
                    return;
                }
                var parsedList = JSON.parse(data.data.list);
                var parsedTimer = JSON.parse(data.data.timer);
                let timer = parsedTimer[0].Timer;

                SetResponsedListFromApiSelectShobehJashnvareh(() => {
                    return parsedList
                });
                setTimer(timer);
            } else {
                setErrorInSwiperTapTime("متاسفانه خطایی رخ داده است34:" + data.errors);
                console.log("050331-getSwiperTapTime calles!!-data.status != 0: " + data.status + '-data.errors: ' + data.errors);
            }
        } else {
            console.log("050331-getSwiperTapTime calles!!-!response.ok: " + response.ok);
            setErrorInSwiperTapTime("متاسفانه خطایی رخ داده است35");
        }
    }

    useEffect(() => {
        const tempAsync = async () => {
            let currentShobe = await getCookie("currentShobe");
            var parsedurrentShobe: responsedListFromApiSelectShobehAtrafUserType | null = currentShobe ? JSON.parse(currentShobe) : null;

            const chosenAddress = await getCookie("chosenAddress");
            var parsedChosenAddress: responsedListFromApiSelectAddressListType | null = chosenAddress ? JSON.parse(chosenAddress) : null;
            setMycurrentAddressState(parsedChosenAddress);
            if (parsedurrentShobe != null) {
                console.log('050422-parsedurrentShobe is not null');
                setCurrentShobeState(parsedurrentShobe);
                return;
            }

            if (mycurrentAddressState != null) {
                parsedurrentShobe = await getShobehAtrafUser(mycurrentAddressState);
            }
            else if (mycurrentAddressState == null) {
                parsedurrentShobe = await getShobehAtrafUser(null);
            }

            const expires = new Date();
            expires.setFullYear(expires.getFullYear() + 5);
            const expiresString = expires.toUTCString();
            document.cookie = parsedurrentShobe ? (`currentShobe=${encodeURIComponent(JSON.stringify(parsedurrentShobe))}; path=/; expires=${expiresString};secure; samesite=None`) :
                (`currentShobe=; path=/; expires=${expiresString};secure; samesite=None`);

            setCurrentShobeState(parsedurrentShobe);
        }
        tempAsync();
    }, []);

    useEffect(() => {
        getSwiperTapTime(currentShobeState);
    }, [currentShobeState]);

    useEffect(() => {
        if (responsedListFromApiSelectShobehJashnvareh == null) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            return;
        }
        intervalRef.current = setInterval(function () {
            setTimer((curTimer) => {
                if (curTimer < 0) {
                    if (intervalRef.current !== null) {
                        clearInterval(intervalRef.current);
                    }
                    return 0;
                }
                let h = Math.floor(curTimer / (1000 * 60 * 60));
                let hToString = h.toString();
                hToString = hToString.length === 1 ? "0" + hToString : hToString;
                let m = Math.floor((curTimer - h * 60 * 60 * 1000) / (60 * 1000));
                let mToString = m.toString();
                mToString = mToString.length === 1 ? "0" + mToString : mToString;
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

                return curTimer - 1000;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [responsedListFromApiSelectShobehJashnvareh]);

    return (
        <div style={{
            display: 'flex', flexFlow: 'column', gap: '.5rem', width: '100%', backgroundImage: 'linear-gradient(to bottom, #5f69f0, #e8e9fe)',
        }}>
            <div style={{
                width: '100%', height: '1rem',
                boxShadow: '#0000001a 0px 6px 8px 0px', marginBottom: '0.5rem',
                backgroundColor: '#fcfcfc', borderBottomLeftRadius: '.75rem', borderBottomRightRadius: '.75rem',
            }}>
            </div>

            <div style={{
                display: 'flex', flexFlow: "row", justifyContent: "space-between", alignItems: 'center',
                width: '100%', paddingLeft: '1rem', paddingRight: '1rem',
            }}>
                <div style={{
                    display: 'flex', flexFlow: 'row', alignItems: "center", gap: '.25rem',
                }}>
                    <img src="/images/movaghat/SwiperTapBests/peykoff.svg" alt="peykoff"
                        style={{ marginTop: '10px', }} />
                    <span style={{
                        color: '#fffc', fontSize: '.875rem', lineHeight: '1.25rem',
                    }}>
                        ارسال رایگان
                    </span>
                </div>

                <div style={{ position: 'relative' }}>
                    <img src="/images/movaghat/SwiperTapBests/timer.svg" alt="تایمر" style={{
                        position: 'absolute', width: '4rem', height: '4rem', zIndex: 0, top: '.25rem', left: '.25rem',
                    }} />
                    <div ref={refForTimer} id="timermoveOpportunity"
                        style={{ display: "flex", flexFlow: "row-reverse", color: "red", cursor: 'not-allowed', }} >
                        {hToString != null && (
                            <>
                                <span style={{
                                    borderRadius: "5px",
                                    // color: "#b7bdc2",
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: '.875rem',
                                    // width: "30px",
                                    // height: "30px",
                                    // backgroundColor: "red",  
                                }}>
                                    {hToString}
                                </span>
                                <span
                                    style={{
                                        // color: "#b7bdc2",
                                        color: "white",
                                        padding: "0px 3px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: '.875rem',
                                    }}>
                                    :
                                </span>
                            </>
                        )}

                        {mToString && (
                            <span
                                style={{
                                    borderRadius: "5px",
                                    // color: "#b7bdc2",
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: '.875rem',
                                    // width: "30px",
                                    // height: "30px",
                                    // backgroundColor: "red",  
                                }}>
                                {mToString}
                            </span>
                        )}

                        {sToString && (
                            <>
                                <span style={{
                                    // color: "#b7bdc2",
                                    color: "white",
                                    padding: "0px 3px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: '.875rem',
                                }}>
                                    :
                                </span>
                                <span style={{
                                    borderRadius: "5px",
                                    // color: "#b7bdc2",
                                    color: "white",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: '.875rem',
                                    // width: "30px",
                                    // height: "30px",
                                    // backgroundColor: "red",  
                                }}>
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
                    // overflow: 'visible', ////zare_nk_050226_nokteh(baraye inke darsade takhfifha ke biroon mizanan dideh beshan)   ////zare_nk_050317_commented(baraye swiper overflow: 'visible' 
                    //// manteghi nist, chon colle slideha biroon iz swiper namayesh dadeh mishan va be scroll ke mahiate swiper hast digeh ehtiaji nist)
                }}>
                {responsedListFromApiSelectShobehJashnvareh?.map((item, index) => {
                    console.log('050422-item iss: ' + JSON.stringify(item));
                    console.log('050422-currentShobeState: ' + JSON.stringify(currentShobeState));
                    console.log('050422-currentShobeState?.IdShobe: ' + currentShobeState?.IdShobe + '-Adress' + mycurrentAddressState?.Adress);
                    return (
                        <SwiperSlide
                            key={index}
                            style={{
                                //  width: '72px',
                                //  height: '80px',
                                // height: '89px',
                                // width: 'auto',
                                // width: '230px',
                                width: '145px',
                            }}>

                            <div className="contInSlide" style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', //// width: '100%', height: '100%',
                                backgroundColor: 'white', borderRadius: '.5rem',                                    // border: '1px solid #f6f6f7',
                            }}>
                                <Link href="https://tapsi.food/business-lines?businessTypeId=6" style={{ width: '100%', height: '100%', textDecoration: 'none', }}>
                                    <div style={{
                                        display: 'flex', flexFlow: 'column', position: 'relative', width: '100%', height: '100%',
                                        justifyContent: 'center', alignItems: 'center', // rowGap: '0.25rem',   ////zare_nk_050304_commented(rowGap nazasht tapsifood)
                                        padding: '.25rem 0px',   ////zare_nk_050307_added
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

                                        <img style={{
                                            width: '137px', height: '105px', objectFit: 'cover', borderTopLeftRadius: '.375rem', borderTopRightRadius: '.375rem',
                                        }}
                                            // src={`/images/SwiperGrouplevel1/${item.AxG1}.png`} />  ////zare_nk_050229_nokteh(age az database bekhooneh bade emale database food tavassote parsa)
                                            // src={`/images/SwiperGrouplevel1/${index}.png`} />
                                            // https://img.tochikala.com/Product/' + item.IdKala
                                            src={`/images/movaghat/SwiperTapTime/${index}.jpg`} />

                                        <div style={{
                                            display: 'flex', flexFlow: 'column', paddingTop: '2px', gap: '.25rem', width: '100%',
                                        }}>
                                            <div style={{
                                                display: 'flex', flexFlow: 'row', width: '100%',
                                            }}>
                                                <div style={{
                                                    display: 'flex', flexFlow: 'column', width: '100%', padding: '0px .5rem', justifyContent: 'space-between', marginTop: '8px',
                                                }}>
                                                    <div style={{
                                                        // fontSize: '0.875rem',    ////zare_nk_050331_commented
                                                        fontSize: '0.8rem',    ////zare_nk_050331_added
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
                                                        {item.NameKala}
                                                    </div>

                                                    {/* <div style={{
                                                            // display: 'flex',    ////zare_nk_050331_commented
                                                            display: 'none',    ////zare_nk_050331_added
                                                            flexFlow: 'row', gap: '2px', alignItems: 'center',
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
                                                        </div> */}


                                                    {/* zare_nk_050331_added_st */}
                                                    <div style={{
                                                        display: 'flex', flexFlow: 'column', width: '100%', // marginBottom: '2px',
                                                    }}>
                                                        {(item.DarsadTakhfif != null && item.DarsadTakhfif != 0) ? (
                                                            <div //id={`PriceBeforeDiscount-${item.IdKala}`}
                                                                style={{
                                                                    // visibility: "visible",  ////zare_nk_050316_commented(dar react native visibility nadarim)
                                                                    opacity: 1,  ////zare_nk_050316_added(dar react native visibility nadarim)
                                                                    display: "flex",
                                                                    flexDirection: "row",
                                                                    paddingLeft: 10,
                                                                    justifyContent: 'flex-end',
                                                                    alignItems: "center",
                                                                    width: "100%",
                                                                    // borderWidth: 1,
                                                                    // borderStyle: 'dashed',
                                                                    // borderColor: 'red',
                                                                }}>
                                                                <span style={{
                                                                    // fontSize: 11,
                                                                    fontSize: '0.65rem',
                                                                    // spanDecorationLine: "line-through",
                                                                    textDecoration: "line-through",
                                                                    color: '#888',  ////zare_nk_050316_added
                                                                    fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                                    lineHeight: '10px',
                                                                }}>
                                                                    {item.FeeMasraf.toLocaleString()}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <div style={{
                                                                // visibility: "hidden",  ////zare_nk_050316_commented(dar react native visibility nadarim)
                                                                opacity: 0,  ////zare_nk_050316_added(dar react native visibility nadarim)
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                paddingLeft: 10,
                                                                justifyContent: 'flex-end',
                                                                alignItems: "center",
                                                                width: "100%",
                                                                // borderWidth: 1,
                                                                // borderStyle: 'dashed',
                                                                // borderColor: 'blue',
                                                            }}                                                                >
                                                                <span style={{
                                                                    // fontSize: 11,
                                                                    fontSize: '0.65rem',
                                                                    // opacity: 0.7,  
                                                                    textDecorationLine: "line-through",
                                                                    color: '#888',  ////zare_nk_050316_added
                                                                    fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                                    lineHeight: '10px',
                                                                }}>
                                                                    {item.FeeMasraf.toLocaleString()}
                                                                </span>
                                                            </div>
                                                        )}
                                                        <div style={{
                                                            display: "flex",
                                                            flexWrap: "wrap",
                                                            flexDirection: "row",
                                                            marginTop: 0,
                                                            marginBottom: 5,
                                                            // padding: "0px 10px 0px 10px",  ////zare_nk_050331_commented
                                                            // paddingVertical: 0,
                                                            // paddingHorizontal: 10,
                                                            // justifyContent: 'space-between',  ////zare_nk_050316_commented
                                                            justifyContent: 'flex-start',  ////zare_nk_050316_added
                                                            alignItems: "center",
                                                            width: "100%",
                                                            // borderWidth: 1,
                                                            // borderStyle: 'dashed',
                                                            // borderColor: 'black',
                                                        }}>
                                                            {/* {((item.DarsadTakhfif ?? 0) != 0) &&(  */}
                                                            {(item.DarsadTakhfif != null && item.DarsadTakhfif != 0) && (
                                                                <div style={{
                                                                    backgroundColor: "#ff3151",
                                                                    width: 39,
                                                                    height: 20,
                                                                    // flex: "0 0 auto",
                                                                    display: 'flex',
                                                                    flexDirection: "row",
                                                                    justifyContent: "center",
                                                                    alignItems: 'center',
                                                                    flexGrow: 0,
                                                                    flexShrink: 0,
                                                                    flexBasis: 'auto',
                                                                    marginLeft: 5,
                                                                    borderRadius: 100,
                                                                }}>
                                                                    <span style={{
                                                                        //   fontSize: 12,
                                                                        fontSize: '0.70rem',
                                                                        color: "white",
                                                                        opacity: 1,
                                                                        fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                                        // borderWidth: 2,
                                                                        // borderStyle: 'dashed',
                                                                        // borderColor: 'black',
                                                                    }}>
                                                                        {`${item.DarsadTakhfif}%`}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            <div style={{
                                                                // flex: "1 0 auto", 
                                                                flexGrow: 1,
                                                                flexShrink: 0,
                                                                flexBasis: 'auto',
                                                                display: "flex",
                                                                flexDirection: 'row',
                                                                justifyContent: 'flex-end',
                                                                // borderWidth: 1,
                                                                // borderStyle: 'dashed',
                                                                // borderColor: 'green',
                                                            }}>
                                                                <span style={{
                                                                    // fontSize: 13,
                                                                    fontSize: '0.75rem',
                                                                    marginLeft: 5,
                                                                    fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                                    color: '#3d3d3d',   ////zare_nk_050316_added
                                                                }}>
                                                                    {item.FeeForoosh.toLocaleString()}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                        //  fontSize: 12,
                                                                        fontSize: '0.70rem',
                                                                        fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#6d6d6d',
                                                                    }}>
                                                                    تومان
                                                                </span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    {/* zare_nk_050331_added_end */}
                                                </div>
                                            </div>

                                            {/* zare_nk_050305_added_st */}
                                            <div style={{
                                                display: 'flex', flexFlow: 'row', width: '100%', marginBottom: '2px',
                                            }}>
                                                <div style={{
                                                    display: 'flex', flexFlow: 'row', width: '100%', padding: '0px .5rem', justifyContent: 'space-between',
                                                }}>
                                                    <div style={{
                                                        display: 'flex', flexFlow: 'row', gap: '2px', alignItems: 'center',
                                                    }}>
                                                        {/* <span
                                                                style={{
                                                                    color: '#878b92',
                                                                    fontSize: '.75rem',

                                                                }}
                                                            > 
                                                                ارسال:
                                                            </span> */}
                                                        {/* <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-[14px] fill-[#54575B]"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.3399 7.0758C11.5966 7.1283 12.2208 7.3033 12.5883 7.8633V7.87497C12.7166 8.06747 12.6641 8.32997 12.4716 8.4583C12.3958 8.50497 12.3199 8.5283 12.2383 8.5283C12.1041 8.5283 11.9699 8.46413 11.8883 8.34163C11.7599 8.15497 11.5733 8.04997 11.4099 7.9858C11.4063 7.99565 11.4026 8.00576 11.3988 8.01602C11.3848 8.05437 11.37 8.09482 11.3516 8.13163C11.8883 8.45247 12.2441 9.0358 12.2441 9.68913C12.2441 10.6925 11.4274 11.515 10.4183 11.515C9.51995 11.515 8.77328 10.8616 8.62161 10.01H6.29995C6.14245 10.8616 5.40161 11.5091 4.50328 11.5091C3.60495 11.5091 2.86411 10.8616 2.70661 10.01H2.15828C1.92495 10.01 1.73828 9.8233 1.73828 9.58997V8.18997C1.73828 7.5658 1.99495 7.0058 2.40911 6.59747C2.30411 6.5333 2.20495 6.4633 2.12328 6.3758C1.87828 6.1133 1.74411 5.7633 1.74411 5.35497V4.0308C1.74411 3.63413 1.87828 3.27247 2.11745 3.00997C2.36828 2.74163 2.72995 2.58413 3.13245 2.58413H5.19745C5.59995 2.58413 5.96161 2.7358 6.21245 3.00413C6.45745 3.26663 6.59161 3.61663 6.59161 4.02497V5.34913C6.59745 5.80413 6.42828 6.1833 6.14828 6.43997C6.26495 6.55663 6.36995 6.69663 6.45161 6.85413L6.81911 7.6008C6.89495 7.7583 7.05828 7.85747 7.23328 7.85747H7.76995C7.90995 7.85747 8.02661 7.74663 8.03245 7.60663L7.99745 5.1858C7.99161 4.85913 8.11995 4.54997 8.34745 4.31663C8.56328 4.09497 8.84911 3.97247 9.15245 3.95497L8.95995 3.48247C8.93661 3.42413 8.81995 3.3483 8.75578 3.3483H7.56578C7.33245 3.3483 7.14578 3.16163 7.14578 2.9283C7.14578 2.69497 7.33245 2.5083 7.56578 2.5083H8.75578C9.15828 2.5083 9.58412 2.79413 9.73578 3.16747L10.1616 4.2058C10.1674 4.21163 10.1733 4.22913 10.1733 4.22913L10.1908 4.26413C10.4183 3.97247 10.7333 3.75663 11.0716 3.6808C11.2174 3.65163 11.3574 3.69247 11.4624 3.79163C12.1099 4.42747 12.2966 5.2208 11.9874 6.0783C11.9349 6.21247 11.8241 6.31163 11.6841 6.34663C11.5733 6.36997 11.4566 6.38163 11.3399 6.38163C11.2408 6.38163 11.1416 6.36413 11.0424 6.34663L11.3399 7.0758ZM11.0424 4.5908C10.9666 4.6433 10.8966 4.70747 10.8383 4.7833C10.7391 4.91747 10.6924 5.0633 10.7216 5.17997C10.7566 5.33163 10.9024 5.41913 10.9841 5.45997C11.0716 5.5008 11.1649 5.52413 11.2583 5.5358C11.3283 5.1858 11.2583 4.87663 11.0424 4.5908ZM3.12661 3.41247C2.95161 3.41247 2.81745 3.46497 2.72411 3.56413C2.62495 3.66913 2.57828 3.82663 2.57828 4.0133V5.33747C2.57828 5.52413 2.63078 5.68163 2.72995 5.78663C2.82328 5.8858 2.95745 5.9383 3.13245 5.9383H5.19745C5.69911 5.93247 5.74578 5.51247 5.74578 5.33163V4.00747C5.74578 3.8208 5.69328 3.6633 5.59411 3.5583C5.50078 3.45913 5.37828 3.41247 5.19161 3.41247H3.12661ZM3.97245 6.7783C3.19661 6.7783 2.57245 7.4083 2.57245 8.1783H2.57828V9.1583H8.95411C8.98911 9.1583 9.02995 9.14663 9.05911 9.11747L10.5816 7.74663C10.6341 7.69997 10.6458 7.62997 10.6224 7.5658L9.48495 4.7833H9.20495C9.10578 4.7833 9.01245 4.82413 8.94245 4.89413C8.87245 4.96997 8.83745 5.0633 8.83745 5.16247L8.87245 7.61247C8.83745 8.22497 8.35328 8.67997 7.76995 8.67997H7.23328C6.73745 8.67997 6.28828 8.4058 6.06661 7.95663L5.69911 7.20997C5.56495 6.94163 5.30245 6.7783 5.00495 6.7783H3.97245ZM3.56995 9.9983C3.70995 10.3833 4.07161 10.6575 4.49745 10.6575C4.92911 10.6575 5.29078 10.3833 5.42495 9.9983H3.56995ZM9.44411 9.86413C9.53745 10.3191 9.93411 10.6575 10.4124 10.6575L10.4183 10.6458C10.9666 10.6458 11.4099 10.2025 11.4099 9.65997C11.4099 9.23997 11.1358 8.86663 10.7449 8.73247L10.4183 9.02413L10.7391 9.39747C10.8908 9.5783 10.8674 9.8408 10.6924 9.99247C10.6108 10.0566 10.5174 10.0916 10.4183 10.0916C10.2958 10.0916 10.1791 10.045 10.0974 9.9458L9.78828 9.58997L9.63078 9.7358C9.57245 9.7883 9.50828 9.82913 9.44411 9.86413ZM4.61996 4.60825H3.70413C3.4708 4.60825 3.28413 4.42158 3.28413 4.18825C3.28413 3.95492 3.4708 3.76825 3.70413 3.76825H4.61996C4.8533 3.76825 5.03996 3.95492 5.03996 4.18825C5.03996 4.42158 4.8533 4.60825 4.61996 4.60825Z" fill="#54575B"></path></svg> */}
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-[14px] fill-[#54575B]"><path fillRule="evenodd" clipRule="evenodd" d="M11.3399 7.0758C11.5966 7.1283 12.2208 7.3033 12.5883 7.8633V7.87497C12.7166 8.06747 12.6641 8.32997 12.4716 8.4583C12.3958 8.50497 12.3199 8.5283 12.2383 8.5283C12.1041 8.5283 11.9699 8.46413 11.8883 8.34163C11.7599 8.15497 11.5733 8.04997 11.4099 7.9858C11.4063 7.99565 11.4026 8.00576 11.3988 8.01602C11.3848 8.05437 11.37 8.09482 11.3516 8.13163C11.8883 8.45247 12.2441 9.0358 12.2441 9.68913C12.2441 10.6925 11.4274 11.515 10.4183 11.515C9.51995 11.515 8.77328 10.8616 8.62161 10.01H6.29995C6.14245 10.8616 5.40161 11.5091 4.50328 11.5091C3.60495 11.5091 2.86411 10.8616 2.70661 10.01H2.15828C1.92495 10.01 1.73828 9.8233 1.73828 9.58997V8.18997C1.73828 7.5658 1.99495 7.0058 2.40911 6.59747C2.30411 6.5333 2.20495 6.4633 2.12328 6.3758C1.87828 6.1133 1.74411 5.7633 1.74411 5.35497V4.0308C1.74411 3.63413 1.87828 3.27247 2.11745 3.00997C2.36828 2.74163 2.72995 2.58413 3.13245 2.58413H5.19745C5.59995 2.58413 5.96161 2.7358 6.21245 3.00413C6.45745 3.26663 6.59161 3.61663 6.59161 4.02497V5.34913C6.59745 5.80413 6.42828 6.1833 6.14828 6.43997C6.26495 6.55663 6.36995 6.69663 6.45161 6.85413L6.81911 7.6008C6.89495 7.7583 7.05828 7.85747 7.23328 7.85747H7.76995C7.90995 7.85747 8.02661 7.74663 8.03245 7.60663L7.99745 5.1858C7.99161 4.85913 8.11995 4.54997 8.34745 4.31663C8.56328 4.09497 8.84911 3.97247 9.15245 3.95497L8.95995 3.48247C8.93661 3.42413 8.81995 3.3483 8.75578 3.3483H7.56578C7.33245 3.3483 7.14578 3.16163 7.14578 2.9283C7.14578 2.69497 7.33245 2.5083 7.56578 2.5083H8.75578C9.15828 2.5083 9.58412 2.79413 9.73578 3.16747L10.1616 4.2058C10.1674 4.21163 10.1733 4.22913 10.1733 4.22913L10.1908 4.26413C10.4183 3.97247 10.7333 3.75663 11.0716 3.6808C11.2174 3.65163 11.3574 3.69247 11.4624 3.79163C12.1099 4.42747 12.2966 5.2208 11.9874 6.0783C11.9349 6.21247 11.8241 6.31163 11.6841 6.34663C11.5733 6.36997 11.4566 6.38163 11.3399 6.38163C11.2408 6.38163 11.1416 6.36413 11.0424 6.34663L11.3399 7.0758ZM11.0424 4.5908C10.9666 4.6433 10.8966 4.70747 10.8383 4.7833C10.7391 4.91747 10.6924 5.0633 10.7216 5.17997C10.7566 5.33163 10.9024 5.41913 10.9841 5.45997C11.0716 5.5008 11.1649 5.52413 11.2583 5.5358C11.3283 5.1858 11.2583 4.87663 11.0424 4.5908ZM3.12661 3.41247C2.95161 3.41247 2.81745 3.46497 2.72411 3.56413C2.62495 3.66913 2.57828 3.82663 2.57828 4.0133V5.33747C2.57828 5.52413 2.63078 5.68163 2.72995 5.78663C2.82328 5.8858 2.95745 5.9383 3.13245 5.9383H5.19745C5.69911 5.93247 5.74578 5.51247 5.74578 5.33163V4.00747C5.74578 3.8208 5.69328 3.6633 5.59411 3.5583C5.50078 3.45913 5.37828 3.41247 5.19161 3.41247H3.12661ZM3.97245 6.7783C3.19661 6.7783 2.57245 7.4083 2.57245 8.1783H2.57828V9.1583H8.95411C8.98911 9.1583 9.02995 9.14663 9.05911 9.11747L10.5816 7.74663C10.6341 7.69997 10.6458 7.62997 10.6224 7.5658L9.48495 4.7833H9.20495C9.10578 4.7833 9.01245 4.82413 8.94245 4.89413C8.87245 4.96997 8.83745 5.0633 8.83745 5.16247L8.87245 7.61247C8.83745 8.22497 8.35328 8.67997 7.76995 8.67997H7.23328C6.73745 8.67997 6.28828 8.4058 6.06661 7.95663L5.69911 7.20997C5.56495 6.94163 5.30245 6.7783 5.00495 6.7783H3.97245ZM3.56995 9.9983C3.70995 10.3833 4.07161 10.6575 4.49745 10.6575C4.92911 10.6575 5.29078 10.3833 5.42495 9.9983H3.56995ZM9.44411 9.86413C9.53745 10.3191 9.93411 10.6575 10.4124 10.6575L10.4183 10.6458C10.9666 10.6458 11.4099 10.2025 11.4099 9.65997C11.4099 9.23997 11.1358 8.86663 10.7449 8.73247L10.4183 9.02413L10.7391 9.39747C10.8908 9.5783 10.8674 9.8408 10.6924 9.99247C10.6108 10.0566 10.5174 10.0916 10.4183 10.0916C10.2958 10.0916 10.1791 10.045 10.0974 9.9458L9.78828 9.58997L9.63078 9.7358C9.57245 9.7883 9.50828 9.82913 9.44411 9.86413ZM4.61996 4.60825H3.70413C3.4708 4.60825 3.28413 4.42158 3.28413 4.18825C3.28413 3.95492 3.4708 3.76825 3.70413 3.76825H4.61996C4.8533 3.76825 5.03996 3.95492 5.03996 4.18825C5.03996 4.42158 4.8533 4.60825 4.61996 4.60825Z" fill="green"></path></svg>

                                                        <div style={{
                                                            // flex: "1 0 auto", 
                                                            flexGrow: 1,
                                                            flexShrink: 0,
                                                            flexBasis: 'auto',
                                                            display: "flex",
                                                            flexDirection: 'row',
                                                            justifyContent: 'flex-end',
                                                            // borderWidth: 1,
                                                            // borderStyle: 'dashed',
                                                            // borderColor: 'green',
                                                            marginRight: '5px', ////zare_nk_050331_added
                                                        }}>
                                                            <span style={{
                                                                // fontSize: 13,
                                                                fontSize: '0.75rem',
                                                                marginLeft: 5,
                                                                fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                                color: '#3d3d3d',   ////zare_nk_050316_added
                                                            }}>
                                                                {currentShobeState != null ? (currentShobeState.Keraye != 0 ? currentShobeState.Keraye : 'رایگان') :
                                                                    '50000'.toLocaleString()
                                                                }
                                                            </span>
                                                            <span style={{
                                                                ...(currentShobeState != null && currentShobeState.Keraye == 0 ? { display: 'none' } : { display: 'inline-block' }),
                                                                fontSize: '0.70rem',
                                                                fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#6d6d6d',
                                                            }}>
                                                                تومان
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* <span style={{
                                                            color: '#878b92',
                                                            // fontSize: '.75rem',  ////zare_nk_050331_commented
                                                            fontSize: '.70rem',  ////zare_nk_050331_added
                                                            lineHeight: '18px',
                                                        }}>
                                                            تا 50 دقیقه
                                                        </span> */}
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

            <div style={{
                width: '100%', height: '1rem', boxShadow: '#0000001a 0px -6px 8px 0px',
                marginTop: '0.5rem', backgroundColor: '#fcfcfc', borderTopLeftRadius: '.75rem', borderTopRightRadius: '.75rem',
            }}>
            </div>
        </div>
    );
}

export default memo(SwiperTapTimeComp); 