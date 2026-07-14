////zare_nk_050423_okk(2)
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

const SwiperThinkBanerComp = () => { 
    console.log('050329-SwiperThinkBanerComp called!!');
    const [errorInSwiperThinkBaner, setErrorInSwiperThinkBaner] = useState<string | null>(null);

    const router = useRouter();

    ////zare_nk_nokteh_st(in api shamele banerhaye barike balaye safhe ham mishe dar tochikala vali felan tarjih dadam ye akse ista az basalam download konam bezaram, ta api motenazerash dar database food ra parsafar besazeh)
    type responsedListFromApiSelectBanerType = {
        IdBaner: number;
        NameBanerFa: string;
        NameBanerEn: string;
        AxBaner: string;
        Size: number;
        IsFaal: boolean;
        Tartib: number;
        Url: string;
        Type: string;
        IdShopCategory: number;

        [key: string]: any;  ////zare_nk_050228_nokteh(noe Width va Height ra nemidoonestam comment kardam va automat daar [key: string]: any; gonjoondeh mishan)
    };

    const [responsedListFromApiSelectBaner, SetResponsedListFromApiSelectBaner] = useState<responsedListFromApiSelectBanerType[] | null>(null);
    ////zare_nk_nokteh_end(in api shamele banerhaye barike balaye safhe ham mishe dar tochikala vali felan tarjih dadam ye akse ista az basalam download konam bezaram, ta api motenazerash dar database food ra parsafar besazeh)

    const getSwiperThinkBaner = async () => {
        let token = getCookie("token");
        if (!token) {
            setErrorInSwiperThinkBaner("lotfan avval online shid");
            return;
        }
        // console.log('tokentokentoken: ' + token);

        // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented 
        const response = await fetch(NextJsApiUrl + "Api_SelectBaner", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                IdShopCategory: 1,
            }),
        });

        const data = await response.json();   ////zare_nk_050422_nokteh(response.json() makhsoose "Content-Type": "application/json" hast(yani pasokhe api json hast) vali
        //// age bejaye application/json az anvae text ya xml , ... bashe pasokhe api response.json() khata mideh ke pasokh nemishe be json tabdil beshe va masalan response.text
        ////  monaseb hast(albateh dar api haye parsafar mamoolan pasokhha shamele satrhaye jadavele database hastand ke jsoni barmegardoone be karbar va ma da client az response.json() estefadeh mikonim))

        if (response.ok) {
            // console.log("zare_nk_050228-data: " + JSON.stringify(data));
            if (data.status == 0) {
                if (data.data.list == undefined) {
                    return;
                }

                var parsedList = JSON.parse(data.data.list);

                SetResponsedListFromApiSelectBaner(() => {
                    return parsedList
                });
            } else {
                setErrorInSwiperThinkBaner("متاسفانه خطایی رخ داده است34:" + data.errors);
                // console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
            }
        } else {
            // console.log("zare_nk_050110-!response.ok" + response.ok);
            setErrorInSwiperThinkBaner("متاسفانه خطایی رخ داده است35");
        }
    }

    useEffect(() => {
        // getSwiperThinkBaner();
    }, []);

    return (
        <>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={1}
                centeredSlides={true}
                navigation={false}
                className="SwiperThinkBaner"
                style={{
                    width: '100%',
                }}>
                <SwiperSlide >
                    <div className="contInSlide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Link href="https://tapsi.food/vendor-list?vendorListId=banner-1624" >
                            <img style={{
                                    width: '100%', display: 'block', ////zare_nk_050303_nokteh(age display:'block' nadam tage pedare img ertefaei hodoode 10px bishtar az img migireh!)
                                }}
                                src={`/images/baners/top-baner/ThinkBanerFromBasalam.gif`} />
                        </Link>

                    </div>
                </SwiperSlide>
                {/* {responsedListFromApiSelectBaner?.map((item, index) => {
                    console.log('0-item.IdAdress: ' + JSON.stringify(item));
                    console.log('0-item.IdAdress: ' + JSON.stringify(item));
                    if (item.Size == 1 && item.Type == 'main') {
                        return (
                            <SwiperSlide key={index}>
                                <div className="contInSlide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Link href="https://tapsi.food/vendor-list?vendorListId=banner-1624" >
                                        <img
                                            style={{
                                                width: '100%',
                                                // borderRadius: '0.5rem',
                                            }}
                                            src={`https://img.tochikala.com/Baners/${item.AxBaner}`} />
                                    </Link>
                                </div>
                            </SwiperSlide>
                        )
                    }
                })} */}
            </Swiper>
        </>
    );
}

export default memo(SwiperThinkBanerComp);  