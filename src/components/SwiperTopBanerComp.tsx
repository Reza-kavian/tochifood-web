////zare_nk_050428_okk(1)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, memo, RefObject, ReactNode, ChangeEvent, MouseEvent } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import Styles from "@/styles/components/location.module.css";
import globalsStyles from "@/styles/components/globals.module.css";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { Collapse, Button, Box, Paper, Typography, Grow, ClickAwayListener, Drawer } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import { useAuthentication } from '../context/AuthenticationContext';  ////zare_nk_050408_nokteh(monasebe ine ke age ghablan login shod dar codeHa login boodan ra barrasi
//// va useContext ra seda zadeh va setIsLogin(true) behesh bedim, ya tooye tebeye AuthenticationContext login boodan ra barrasi va setIsLogin ra anjam bedeh va ma faghat isLogin ra dashteh bashim )

////zare_nk_050226_added_st
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from "next/link";
import { none } from "@neshan-maps-platform/ol/centerconstraint";
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

const SwiperTopBanerComp = () => {
    console.log('050329-SwiperTopBanerComp rendered!!');   ////zare_nk_050329_added
    const [errorInSwiperTopBaner, setErrorInSwiperTopBaner] = useState<string | null>(null);

    const router = useRouter();

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

    const getSwiperTopBaner = async () => {
        let token = getCookie("token");
        if (!token) {
            setErrorInSwiperTopBaner("lotfan avval online shid");
            return;
        }
        console.log('tokentokentoken: ' + token);

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
        const data = await response.json();
        if (response.ok) {
            console.log("zare_nk_050228-data: " + JSON.stringify(data));
            if (data.status == 0) {
                if (data.data.list == undefined) {
                    return;
                }
                var parsedList = JSON.parse(data.data.list);
                SetResponsedListFromApiSelectBaner(() => {
                    return parsedList
                });
            } else {
                setErrorInSwiperTopBaner("متاسفانه خطایی رخ داده است34:" + data.errors);
                console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
                ////zare_nk_050221_nokteh(setIsEpmtyAdressList(null); ro bezarim??)
            }
        } else {
            console.log("zare_nk_050110-!response.ok" + response.ok);
            setErrorInSwiperTopBaner("متاسفانه خطایی رخ داده است35");
        }
    }

    useEffect(() => {
        getSwiperTopBaner();
    }, []);

    const goToVendorList = (IdBaner: number) => {
        // alert('IdBaner: ' + IdBaner);
        // router.push("/folder03?tab=comments2");
        // redirect("/login");
        // router.replace("/location");
        // router.push("/vendorlist/");
        router.push(`/vendorlist?IdBaner=${IdBaner}`);
        ////zare_nk_050331_nokteh(age az setState estefadeh konim va dar jsx begim {state && <Vendorlist IdBaner={...}  /> barname Vendorlist ra beonvane yek
        ////  component dar nazar migereh, na yek safhe!! dar url moroorgar ham tagheire address nadarim, dokmeye backe moroorgar ham barash lahaz nemishe!(pas 
        //// farghe component hayei ke dar jsx seda mizanim ba poshehaye masire /src/app/foldername ra deghat konim ke poosheye foldername name safhe ast dar 
        //// moroorgar ke haviye file page.tsx mibashad) } )
    };

    return (
        <>
            {/* zare_nk_050317_nokteh_st(age div pedare Swiper ra bardarim vaghti Swiper dar Dom gharar migire ertefaesh kam mishe!!(ehtemalan bekhatere ertefa dadan be body dar layout hast ke bayad tahlilshe hatman)) */}
            <div style={{
                display: 'flex', flexFlow: 'column', width: '100%',
            }}>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={10}    ////zare_nk_050216_nokteh(faseleye beine slideha dar har ghabele namayesh(be px hast))
                    slidesPerView={1.09}   ////zare_nk_050216_nokteh(tedad slideha dar har ghabele moshahedeh)
                    centeredSlides={true}  ////zare_nk_050226_added(baraye vasat gharar gereftane slide ha dar swiper)
                    ////zare_nk_050215_nokteh_st(dokmeye raftan be badi va ghabli ro modiriat mikoneh, age nazarim pishfarz false hast, mishe ham boolean dad, va ham meghdare objecti dad 
                    //// ke dokmehaye ghablo bad , ... ra sefareshi konim(midoonim useRef age masalan string ya namber ,... bashe tagheiresh bedim dar hamin render tagheiresh ghabale 
                    // moshahedeh hast, vali manzoore ma useRefi hast ke be taghaye jsx nesbat midim ke ta dar dom naran useRef be tage jsx nemichasbe ))
                    navigation={false}
                    // navigation={{
                    //   nextEl: '.swiper-button-next2',  ////zare_nk_050216_nokteh(dorost kar mikoneh)
                    //   // nextEl: null, ////refForwiperButtonNext.current,  

                    //   prevEl: '.swiper-button-prev',  ////zare_nk_050216_nokteh(dorost kar mikoneh)
                    //   // prevEl: null, ////refForwiperButtonPrev.current,   
                    // }}
                    ////zare_nk_050215_nokteh_end(dokmeye raftan be badi va ghabli ro modiriat mikoneh, age nazarim pishfarz false hast, mishe ham boolean dad, va ham meghdare objecti dad 
                    //// ke dokmehaye ghablo bad , ... ra sefareshi konim(midoonim useRef age masalan string ya namber ,... bashe tagheiresh bedim dar hamin render tagheiresh ghabale 
                    // moshahedeh hast, vali manzoore ma useRefi hast ke be taghaye jsx nesbat midim ke ta dar dom naran useRef be tage jsx nemichasbe ))

                    ////zare_nk_050216_nokteh_st(dokmehaye raftan be safhe ke momoolan dar vasat va paeine swiper namayash dadeh mishan, age nazarim pishfarz false hast, mishe ham boolean 
                    //// dad, va ham meghdare objecti dad ke dokmehaye adshodeh ra sefareshi konim)
                    // pagination={true}  ////zare_nk_050226_nokteh(pagination={true} ra gozashtam faghat nameyesh mideh safheye feli ra ba toopor va tookhali kardane bullet ha, vali inke click
                    ////  konim rooshoon amal konan bayad clickable: true, benevisim(chon pishfarz false hast va faghat ba angosht ya mouseclick chaporast mikeshim slide ha ra(na click rooye bullet ha)))
                    // pagination={{
                    //   clickable: true,
                    //   // el: '.swiper-pagination',
                    //   type: 'bullets',
                    // }}
                    ////zare_nk_050216_nokteh_end(dokmehaye raftan be safhe ke momoolan dar vasat va paeine swiper namayash dadeh mishan, age nazarim pishfarz false hast, mishe ham boolean 
                    //// dad, va ham meghdare objecti dad ke dokmehaye yadshodeh ra sefareshi konim)

                    // autoplay={{ delay: 5000, disableOnInteraction: false }}  ////zare_nk_050226_nokteh(age mikhaim barnameh automat slide ha ro varagh bezaneh)
                    className="SwiperTopBaner"
                    style={{
                        width: '100%',
                        //  margin: '0px 19px',
                    }}>
                    {responsedListFromApiSelectBaner?.map((item, index) => {
                        console.log('0-item.IdAdress: ' + JSON.stringify(item));
                        console.log('0-item.IdAdress: ' + JSON.stringify(item));
                        if (item.Size == 1 && item.Type == 'main') {
                            return (
                                <SwiperSlide key={index}>
                                    <div className="contInSlide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {/* <Link href={`https://tapsi.food/vendor-list?vendorListId=${item.IdBaner}`} > */}
                                        {/* zare_nk_050408_nokteh_st(rahe1) */}
                                        {/* <Link href={`/vendorlist?IdBaner=${item.IdBaner}`} >
                                            <img
                                                style={{
                                                    width: '100%',
                                                    borderRadius: '0.5rem',
                                                }}
                                                // src="./images/top-baner/top-baner-slide01.png" />
                                                src={`https://img.tochikala.com/Baners/${item.AxBaner}`} />
                                        </Link> */}
                                        {/* zare_nk_050408_nokteh_end(rahe1) */}
                                        {/* zare_nk_050408_nokteh_st(rahe2) */}
                                        <button onClick={() => {
                                            goToVendorList(item.IdBaner);
                                        }} style={{
                                            border: 'none',
                                            backgroundColor: 'inherit',
                                            padding: '0px',
                                        }}>
                                            <img style={{
                                                    width: '100%',
                                                    borderRadius: '0.5rem',
                                                }}
                                                // src="./images/top-baner/top-baner-slide01.png" />
                                                src={`https://img.tochikala.com/Baners/${item.AxBaner}`} />
                                        </button>
                                        {/* zare_nk_050408_nokteh_end(rahe2) */}
                                    </div>
                                </SwiperSlide>
                            )
                        }
                    })}
                </Swiper>
            </div>
        </>
    );
}

export default memo(SwiperTopBanerComp); 