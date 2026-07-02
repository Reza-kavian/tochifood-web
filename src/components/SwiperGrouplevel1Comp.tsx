////zare_nk_050411_okk(1)
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

////zare_nk_050226_added_st
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from "next/link";
////zare_nk_050226_added_end

import { NextJsApiUrl } from "../constants/Urls";  ////zare_nk_050407_added

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

const SwiperGrouplevel1Comp = () => {
    console.log('050329-SwiperGrouplevel1Comp rendered!!');   ////zare_nk_050329_added
    const [errorInSwiperGrouplevel1, setErrorInSwiperGrouplevel1] = useState<string | null>(null);

    const router = useRouter();

    type responsedListFromApiSelectGoroohJsonType = {
        IdG1: number;
        NameG1: string;
        AxG1: string;
        Tozihat: string;

        [key: string]: any;
    };

    const [responsedListFromApiSelectGoroohJson, SetResponsedListFromApiSelectGoroohJson] = useState<responsedListFromApiSelectGoroohJsonType[] | null>(null);

    const getSwiperGrouplevel1 = async () => {
        let token = getCookie("token");
        if (!token) {
            setErrorInSwiperGrouplevel1("lotfan avval online shid");
            return;
        }
        console.log('tokentokentoken: ' + token);
        // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented
        let ApiUrl = NextJsApiUrl; ////zare_nk_050407_added
        const response = await fetch(ApiUrl + "Api_SelectGoroohJson", {
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
                setErrorInSwiperGrouplevel1("متاسفانه خطایی رخ داده است34:" + data.errors);
                console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
            }
        } else {
            console.log("zare_nk_050110-!response.ok" + response.ok);
            setErrorInSwiperGrouplevel1("متاسفانه خطایی رخ داده است35");
        }
    }

    useEffect(() => {
        getSwiperGrouplevel1();
    }, []);

    return (
        <>
            <div style={{
                display: 'flex', flexFlow: 'column', width: '100%', overflow: 'hidden', paddingTop: '5px',
            }} >
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={10}
                    slidesPerView="auto"  ////zare_nk_050226_nokteh(meghdaresh ro auto dadim ta bar asase arze SwiperSlide ha tedadesh automat tavasoote 
                    //// barnameh moshakhas she(pishfarz slidesPerView={1} hast))
                    // centeredSlides={true}
                    navigation={false}

                    className="SwiperGrouplevel1"
                    style={{
                        //  margin: '0px 19px',
                        //  height: '86px',
                        // height: '95px',
                        // width: '100%',
                        width: '450px',
                        overflow: 'visible', ////zare_nk_050226_nokteh(baraye inke darsade takhfifha ke biroon mizanan dideh beshan)   ////zare_nk_050317_commented(baraye swiper overflow: 'visible' 
                        //// manteghi nist, chon arze colle slideha ro migire, na arze masalan 100% pedaresh ro) 
                    }}
                >
                    {responsedListFromApiSelectGoroohJson?.map((item, index) => {
                        console.log('000-item.IdAdress: ' + JSON.stringify(item));
                        console.log('000-item.IdAdress: ' + JSON.stringify(item));
                        return (
                            <SwiperSlide
                                key={index}
                                style={{
                                    //  width: '72px',
                                    //  height: '80px',
                                    // height: '89px',
                                    // width: 'auto',
                                    width: '85px',
                                }}>
                                <div className="contInSlide" style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', //// width: '100%', height: '100%',
                                    backgroundColor: '#f5f6f7', borderRadius: '.75rem',
                                }}>
                                    <Link href="https://tapsi.food/business-lines?businessTypeId=6" style={{ width: '100%', height: '100%', textDecoration: 'none', }}>
                                        <div style={{
                                            display: 'flex', flexFlow: 'column', position: 'relative', width: '100%', height: '100%',
                                            justifyContent: 'center', alignItems: 'center', rowGap: '.25rem',
                                        }}>
                                            <div style={{
                                                position: 'absolute', top: '-5px', right: '-5px', width: '44px', height: '28px',
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

                                            <img
                                                style={{
                                                    // width:'412px',
                                                    width: '48px',
                                                    borderRadius: '0.5rem',
                                                    // position: 'absolute',
                                                    // bottom: '0px',
                                                    // border: '1px solid yellow',
                                                    marginTop: '5px', marginBottom: '0px',
                                                }}
                                                // src={`/images/SwiperGrouplevel1/${item.AxG1}.png`} />  ////zare_nk_050229_nokteh(age az database bekhooneh bade emale database food tavassote parsa)
                                                src={`/images/SwiperGrouplevel1/${index}.png`} />

                                            {/* zare_nk_050229_nokteh_st(ebteda az span estefadeh kardam ke moshkel dasht dar gereftane ertefae 40 va 28px migereft! gaogpt goft chon inline-element 
                                        hast ertefa nemigireh ke display: '-webkit-box', va hatta display: 'block' ham kardim nashod, be in natijeh residim ke div behtare baraye in manzoor) */}
                                            <div style={{
                                                // border: '1px solid green',
                                                fontSize: '0.75rem',
                                                color: '#1b1c1d',

                                                // این بخش برای سه‌نقطه و محدودیت ۲ خط
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',

                                                // این بخش برای تثبیت ارتفاع روی ۴۰ پیکسل
                                                lineHeight: '20px',
                                                height: '40px',

                                                minHeight: '40px', // اجبار به کمتر نشدن
                                                maxHeight: '40px', // اجبار به بیشتر نشدن
                                                boxSizing: 'border-box', // برای اینکه بُردر (border) به ارتفاع اضافه نشود

                                                textAlign: 'center',

                                                ////zare_nk_050228_added_st
                                                width: '100%',
                                                padding: '0px 5px',
                                                ////zare_nk_050228_added_end
                                            }}>
                                                {item.NameG1}
                                            </div>
                                            {/* zare_nk_050229_nokteh_end(ebteda az span estefadeh kardam ke moshkel dasht dar gereftane ertefae 40 va 28px migereft! gaogpt goft chon inline-element 
                                        hast ertefa nemigireh ke display: '-webkit-box', va hatta display: 'block' ham kardim nashod,be in natijeh residim ke div behtare baraye in manzoor) */}
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </>
    );
}

export default memo(SwiperGrouplevel1Comp); 