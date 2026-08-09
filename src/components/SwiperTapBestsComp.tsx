////zare_nk_050515_okk(1)
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
    console.log("document !== 'undefined'");
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

////zare_nk_050517_commented_st(api birabt be barabt)
//  type responsedListFromApiSelectGoroohJsonType = {
//         IdG1: number;
//         NameG1: string;
//         AxG1: string;
//         Tozihat: string;

//         [key: string]: any;
//     };
////zare_nk_050517_commented_end(api birabt be barabt)
////zare_nk_050517_added_st(api birabt be barabt)
type responsedListFromApiSelectShobehAtrafUserType = {
    IdShobe: number;
    NameSobe: string;
    KafKharid: number;
    Fasele: number;
    ZarfiatErsal: number;
    Keraye: number;
    NazdikTarinZamanErsal: string;
};
////zare_nk_050517_added_end(api birabt be barabt)


const SwiperTapBestsComp = () => {
    console.log('050329-SwiperTapBestsComp rendered!!');   ////zare_nk_050329_added
    const [errorInSwiperTapBests, setErrorInSwiperTapBests] = useState<string | null>(null);

    const router = useRouter();
    // const [responsedListFromApiSelectGoroohJson, SetResponsedListFromApiSelectGoroohJson] = useState<responsedListFromApiSelectGoroohJsonType[] | null>(null);  ////zare_nk_050517_commented(api birabt be barabt)
    const [responsedListFromApiSelectShobehAtrafUser, SetResponsedListFromApiSelectShobehAtrafUser] = useState<responsedListFromApiSelectShobehAtrafUserType[] | null>(null); ////zare_nk_050517_added(api birabt be barabt)

    const getSwiperTapBests = async () => {  ////zare_nk_050422_nokteh(manteghitar ine ke api be shobehaye atraf bezanam ke tedadi shobeh begirm beonvane behtarin forooshgahhaye 
        ////  tochifood,alan api be groohbandiha mizanam ke manteghi nist!!)
        let token = getCookie("token");
        if (!token) {
            setErrorInSwiperTapBests("lotfan avval online shid");
            return;
        }

        const chosenAddress = await getCookie("chosenAddress");
        var parsedChosenAddress: responsedListFromApiSelectAddressListType | null = chosenAddress ? JSON.parse(chosenAddress) : null;
        // setMycurrentAddressState(parsedChosenAddress);
        // if (parsedurrentShobe != null) {
        //     console.log('050422-parsedurrentShobe is not null');
        //     setCurrentShobeState(parsedurrentShobe);
        //     return;
        // }

        // if (mycurrentAddressState != null) {   ////zare_nk_050517_commented(chon dastoore setState setMycurrentAddressState dar componente jari ke amal nemikoneh 
        //// va meghdare jadide state mycurrentAddressState dar reRendere badidiye component tazeh emal mishe, pas az hamin parsedChosenAddress estefadeh mikonim )
        // if (parsedChosenAddress != null) {
        //     parsedurrentShobe = await getShobehAtrafUser(mycurrentAddressState);
        // }
        // // else if (mycurrentAddressState == null) {   ////zare_nk_050517_commented(chon dastoore setState setMycurrentAddressState dar componente jari ke amal nemikoneh 
        // //// va meghdare jadide state mycurrentAddressState dar reRendere badidiye component tazeh emal mishe, pas az hamin parsedChosenAddress estefadeh mikonim )
        // else if (parsedChosenAddress == null) {
        //     parsedurrentShobe = await getShobehAtrafUser(null);
        // }

        console.log('tokentokentoken: ' + token);
        // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented 
        // const response = await fetch(NextJsApiUrl + "Api_SelectGoroohJson", {  ////zare_nk_050517_commented(api birabt be barabt)
        const response = await fetch(NextJsApiUrl + "Api_SelectShobehAtrafUser", {  ////zare_nk_050517_added(api birabt be barabt)
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            // body: JSON.stringify({}),  ////zare_nk_050407_commented
            body: JSON.stringify({  ////zare_nk_050517_added(api birabt be barabt)
                "Id": parsedChosenAddress != null ? parsedChosenAddress.IdAdress : 1,  ////zare_nk_050416_nokteh(manzoor az Id hamoon IdAddress hast ke ya vaghei midam ya pishfarz hatman 1 mizaram(ehtemalan 1 haman meydoon saate) )
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
                ////zare_nk_050517_commented_st(api birabt be barabt)
                // var Gorooh = parsedList.Gorooh;
                // SetResponsedListFromApiSelectGoroohJson(() => {
                //     return Gorooh
                // });
                ////zare_nk_050517_commented_end(api birabt be barabt)
                ////zare_nk_050517_added_st(api birabt be barabt)
                if (parsedList.length == 0) {
                    return null;
                }
                SetResponsedListFromApiSelectShobehAtrafUser(() => {
                    return parsedList
                });
                ////zare_nk_050517_added_end(api birabt be barabt)

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
        getSwiperTapBests();
    }, []);

    return (
        <div style={{ display: 'flex', flexFlow: 'column', gap: '.5rem', width: '100%', }}>
            <div style={{
                display: 'flex', flexFlow: "row", justifyContent: "space-between",
                width: '100%', paddingLeft: '1rem', paddingRight: '1rem',
                marginTop: '5px',
            }}>
                <h2 style={{ color: '#313335', lineHeight: '1.75rem', fontSize: '1.125rem', fontWeight: '500', margin: '0px', }}>
                    بهترین&zwnj;های توچی&zwnj;فود
                </h2>

                <button id="goShoppingBacketBtn"
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
                    <img src="/images/Icon/see-all.svg" alt="نمایش همه"
                        style={{ width: '1.25rem', height: '1.25rem', }} />
                </button>
            </div>

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}  ////zare_nk_050305_nokteh(moadele 1.5rem(chon spaceBetween adad 1.5rem))  
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
                }}>
                {/* {responsedListFromApiSelectGoroohJson?.map((item, index) => {   */}
                {responsedListFromApiSelectShobehAtrafUser?.map((item, index) => {
                    console.log('00-item.IdAdress: ' + JSON.stringify(item));
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
                                display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%',
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
                                                (index == 0 || index == 1 || index == 4) &&
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
                                                // zare_nk_050228_nokteh_st(birabt be API hast baraye designe gozashtam(badan dar api gonjandeh beshe ya age salah nist hazf besheh))  
                                                ...((index == 0 || index == 1 || index == 4) ? { display: 'flex' } : { display: 'none' }),
                                                // zare_nk_050228_nokteh_end(birabt be API hast baraye designe gozashtam(badan dar api gonjandeh beshe ya age salah nist hazf besheh))  
                                                position: 'absolute',
                                                top: '-5px',
                                                width: '44px', height: '33px',
                                                // border: '1px dashed red',
                                                fontSize: '.625rem',
                                                color: '#ffffff', 
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                تخفیف
                                            </span>
                                        </div>

                                        <div style={{
                                            position: 'absolute', top: '.5rem', left: '-1px',
                                            width: '44px', height: '28px',
                                        }}>
                                            {/* zare_nk_050228_nokteh_st(birabt be API hast baraye designe gozashtam(badan dar api gonjandeh beshe ya age salah nist hazf besheh)) */}
                                            {
                                                (index == 0 || index == 2 || index == 3) &&
                                                <svg style={{ transform: 'scaleX(-1)', }} xmlns="http://www.w3.org/2000/svg" width="51" height="28" viewBox="0 0 51 28" fill="none">
                                                    <path d="M44.159 0H1.00094C0.306976 0 -0.17601 0.689558 0.0611496 1.34174L3.44897 10.6583C3.52925 10.879 3.52925 11.121 3.44897 11.3417L0.0611496 20.6583C-0.17601 21.3104 0.30698 22 1.00094 22H41.5732C42.1255 22 42.5732 22.4477 42.5732 23V26.619C42.5732 27.0866 43.158 27.2983 43.4574 26.9391L47.1097 22.5563C47.4092 22.1968 47.5732 21.7438 47.5732 21.2759V3.41421C47.5732 2.50871 47.2135 1.64029 46.5732 1C45.933 0.359711 45.0645 0 44.159 0Z" fill="url(#paint0_linear_19043_112501)" />
                                                    <defs>
                                                        <linearGradient id="paint0_linear_19043_112501" x1="3.57324" y1="11" x2="47.5732" y2="11" gradientUnits="userSpaceOnUse">
                                                            <stop stopColor="#1747A1" />
                                                            <stop offset="1" stopColor="#2269EE" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                            }
                                            {/* zare_nk_050228_nokteh_end(birabt be API hast baraye designe gozashtam(badan dar api gonjandeh beshe ya age salah nist hazf besheh)) */}

                                            <span style={{
                                                // zare_nk_050228_nokteh_st(birabt be API hast baraye designe gozashtam(badan dar api gonjandeh beshe ya age salah nist hazf besheh))  
                                                ...((index == 0 || index == 2 || index == 3) ? { display: 'flex' } : { display: 'none' }),
                                                // zare_nk_050228_nokteh_end(birabt be API hast baraye designe gozashtam(badan dar api gonjandeh beshe ya age salah nist hazf besheh))  
                                                position: 'absolute',
                                                top: '-5px',
                                                width: '44px', height: '33px',
                                                // border: '1px dashed red',
                                                fontSize: '.625rem',
                                                color: '#ffffff', 
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                قسطی!
                                            </span>
                                        </div>

                                        <img style={{
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
                                            src={`/images/movaghat/SwiperTapBests/${index}.jpg`} />

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
                                                        {/* {item.NameG1} */}
                                                        {item.NameSobe}
                                                    </div>

                                                    <div style={{
                                                        display: 'flex', flexFlow: 'row', gap: '2px', alignItems: 'center',
                                                    }}>
                                                        <span style={{
                                                            color: '#a4aab0',
                                                            fontSize: '10px',
                                                            marginTop: '2px',
                                                        }}>
                                                            (362)
                                                        </span>
                                                        <p style={{
                                                            color: '#1b1c1d',
                                                            fontSize: '.75rem',
                                                            margin: '0px',
                                                        }}>
                                                            4.2
                                                        </p>
                                                        <img src="/images/movaghat/SwiperTapBests/star/star.svg" alt="علاقه مندی"
                                                            style={{ width: '.75rem', height: '.75rem', }} />
                                                    </div>
                                                </div>
                                            </div>

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
                                                        <span style={{
                                                            color: '#878b92',
                                                            fontSize: '.75rem',
                                                        }}>
                                                            {/* پیک توچی&zwnj;فود: */}
                                                            پیک:
                                                        </span>
                                                        <div style={{
                                                            display: 'flex', flexFlow: 'row', alignItems: "center", gap: '2px',
                                                        }}>
                                                            {item.Keraye != 0 ?
                                                                <>
                                                                    <span style={{
                                                                        color: '#3d3d3d',
                                                                        fontSize: '.75rem',
                                                                        margin: '0px',
                                                                    }}>
                                                                        {/* {58000} */}
                                                                        {item.Keraye.toLocaleString()}
                                                                    </span>
                                                                    <span style={{
                                                                        ...(item.Keraye == 0 ? { display: 'none' } : { display: 'inline-block' }),
                                                                        color: '#6d6d6d',
                                                                        fontSize: '0.625rem',
                                                                        marginTop: '2px', ////zare_nk_050517_added
                                                                    }}>
                                                                        تومان
                                                                    </span>
                                                                </> :
                                                                <span style={{
                                                                    color: '#059666',
                                                                    fontSize: '0.875rem',
                                                                    lineHeight: '1.25rem',
                                                                }}>
                                                                    رایگان
                                                                </span>
                                                            }

                                                        </div>

                                                    </div>

                                                    <span style={{
                                                        color: '#878b92',
                                                        fontSize: '.75rem',
                                                        lineHeight: '18px',
                                                    }}>
                                                        {/* تا 50 دقیقه */}
                                                        {(item.NazdikTarinZamanErsal).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    );
}

export default memo(SwiperTapBestsComp); 