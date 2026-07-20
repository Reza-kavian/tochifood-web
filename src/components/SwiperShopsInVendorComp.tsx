////zare_nk_050428_okk(2)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, memo, RefObject, ReactNode, ChangeEvent, MouseEvent } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import Styles from "@/styles/components/location.module.css";
import globalsStyles from "@/styles/components/globals.module.css";

import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { Collapse, Button, Box, Paper, Typography, Grow, ClickAwayListener, Drawer } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'; //zare_nk_050204_added(for use Dialog)

import { useAuthentication } from '../context/AuthenticationContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from "next/link";

import { NextJsApiUrl } from "../constants/Urls";

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

const SwiperShopsInVendorComp = () => {
    console.log('050329-SwiperShopsInVendorComp rendered!!');
    const [errorInSwiperShopsInVendorComp, setErrorInSwiperShopsInVendorComp] = useState<string | null>(null);

    const router = useRouter();

    type responsedListFromApiSelectShobehAtrafUserType = {
        IdShobe: number;
        NameSobe: string;
        KafKharid: number;
        Fasele: number;
        ZarfiatErsal: number;
        Keraye: number;
        NazdikTarinZamanErsal: string;
    };

    const [responsedListFromApiSelectShobehAtrafUser, SetResponsedListFromApiSelectShobehAtrafUser] = useState<responsedListFromApiSelectShobehAtrafUserType[] | null>(null);

    const getSwiperShopsInVendorComp = async () => {
        let token = await getCookie("token");
        if (!token) {
            setErrorInSwiperShopsInVendorComp("lotfan avval online shid");
            return;
        }
        console.log('tokentokentoken: ' + token);
        // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented 
        // const response = await fetch(ApiUrl + "Api_SelectGoroohJson", {
        const response = await fetch(NextJsApiUrl + "Api_SelectShobehAtrafUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            // body: JSON.stringify({}),
            body: JSON.stringify({
                "Id": 1,  ////zare_nk_050416_nokteh(manzoor az Id hamoon IdAddress hast ke ya vaghei midam ya pishfarz hatman 1 mizaram(ehtemalan 1 haman meydoon saate) )
            }),
        });
        const data = await response.json();

        if (response.ok) {
            console.log("zare_nk_050404-Api_SelectGoroohJson data1: " + JSON.stringify(data));
            if (data.status == 0) {
                if (data.data.list == undefined) {
                    return;
                }
                // var parsedList = JSON.parse(data.data.list);
                // var Gorooh = parsedList.Gorooh;
                // SetResponsedListFromApiSelectGoroohJson(() => {
                //     return Gorooh
                // });
                var parsedList = JSON.parse(data.data.list);
                SetResponsedListFromApiSelectShobehAtrafUser(() => {
                    return parsedList
                });
            } else {
                setErrorInSwiperShopsInVendorComp("متاسفانه خطایی رخ داده است34:" + data.errors);
                console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
            }
        } else {
            console.log("zare_nk_050110-!response.ok" + response.ok);
            setErrorInSwiperShopsInVendorComp("متاسفانه خطایی رخ داده است35");
        }
    }

    useEffect(() => {
        getSwiperShopsInVendorComp();  ////zare_nk_050403_commented_movaghat
    }, []);

    const goToVendor = async (Shobe: responsedListFromApiSelectShobehAtrafUserType | null) => {
        // alert('IdShobe: ' + IdShobe);
        // router.push("/folder03?tab=comments2");
        // redirect("/login");
        // router.replace("/location");
        // router.push("/vendorlist/");
        //`/vendor/${item.IdShobe}`
        router.push(`/vendor/${Shobe?.IdShobe}`);

        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 5);
        const expiresString = expires.toUTCString();
        document.cookie = Shobe ? (`currentShobe=${encodeURIComponent(JSON.stringify(Shobe))}; path=/; expires=${expiresString};secure; samesite=None`) :
            (`currentShobe=; path=/; expires=${expiresString};secure; samesite=None`)
        ////zare_nk_050422_nokteh_st(ezafi jahate olgu)
        //const currentShobe = await getCookie("currentShobe");
        // var parsedurrentShobe: responsedListFromApiSelectShobehAtrafUserType | null = currentShobe ? JSON.parse(currentShobe) : null;
        // setCurrentShobeState(parsedurrentShobe);   ////zare_nk_050414_commented(be useState felan niazi nadaram) 
        ////zare_nk_050422_nokteh_end(ezafi jahate olgu)
    };

    return (
        <>
            <div style={{
                display: 'flex', flexFlow: 'column', width: '100%', overflow: 'hidden', alignItems: 'center',
            }}>
                {/* <Swiper */}
                <div
                    // modules={[Navigation, Pagination]}
                    // spaceBetween={24}   
                    // slidesPerView="auto"   
                    // navigation={false} 
                    className="SwiperTapBests"
                    style={{
                        // width: '100%',
                        //  margin: '0px 19px',
                        //  height: '86px',
                        // height: '95px',
                        width: '426px',
                        overflow: 'visible', ////zare_nk_050226_nokteh(baraye inke darsade takhfifha ke biroon mizanan dideh beshan)   ////zare_nk_050317_commented(baraye swiper overflow: 'visible' 
                        //// manteghi nist, chon arze colle slideha ro migire, na arze masalan 100% pedaresh ro)ب
                    }}>
                    {/* {responsedListFromApiSelectGoroohJson?.map((item, index) => { */}
                    {responsedListFromApiSelectShobehAtrafUser?.map((item, index) => {
                        console.log('050404-item.IdShobe: ' + item.IdShobe);
                        ////zare_nk_050331_added_st(soori helghehaye badi ra biasar kardam-chon tapsifood faghat yek tasvir dashe va man baraye inke badan betoonam manovr bedam az swipere ye slidi estefadeh kardam)
                        // if (index >= 1) return null;
                        ////zare_nk_050331_added_end(soori helghehaye badi ra biasar kardam-chon tapsifood faghat yek tasvir dashe va man baraye inke badan betoonam manovr bedam az swipere ye slidi estefadeh kardam)
                        return (
                            //  <SwiperSlide
                            <div
                                key={index}
                                style={{
                                    //  width: '72px',
                                    //  height: '80px',
                                    // height: '89px',
                                    // width: 'auto',
                                    // width: '230px',
                                    width: '100%',
                                    marginBottom: '25px',  ////zare_nk_050422_added
                                }}>
                                <div className="contInSlide" style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', //// width: '100%', height: '100%',
                                    backgroundColor: 'inherit', borderRadius: '.75rem', border: '1px solid #f6f6f7',
                                }}>
                                    {/* <Link href={`/vendorlist?IdBaner=${item.IdBaner}`} >	
	
	 <button onClick={() => { goToVendor(item.IdBaner); }} */}
                                    {/* <Link href={`/vendor/${item.IdShobe}`} */}
                                    <button onClick={() => { goToVendor(item); }}
                                        style={{
                                            width: '100%', height: '100%', //textDecoration: 'none',
                                            border: 'none', backgroundColor: 'inherit', padding: '0px',
                                        }}>
                                        <div style={{
                                            display: 'flex', flexFlow: 'column', position: 'relative', width: '100%', height: '100%',
                                            justifyContent: 'center', alignItems: 'center',
                                        }}>
                                            <div style={{
                                                width: '100%',
                                                display: 'flex',
                                                position: 'relative',
                                            }}>
                                                <div style={{
                                                    position: 'absolute', bottom: '-6px', right: '.75rem',
                                                    width: '42px', height: '42px',
                                                }}>
                                                    <img style={{
                                                        width: '100%', height: '100%',
                                                        objectFit: 'cover',
                                                        borderRadius: '.5rem',
                                                        border: '1px solid #efefef',
                                                    }}
                                                        src={`/images/movaghat/vendorPage/restaurant-tag.jpg`} />
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
                                                    src={`/images/movaghat/vendorPage/${index}.jpg`} />

                                                {/* zare_nk_050228_nokteh_st(birabt be API hast baraye designe gozashtam(badan dar api gonjandeh beshe ya age salah nist hazf besheh)) */}
                                                {
                                                    (index == 0 || index == 3 || index == 6) ?
                                                        // <img
                                                        //     style={{
                                                        //         width: '100%',
                                                        //         // height: '105px', objectFit: 'cover',
                                                        //         position: 'absolute',
                                                        //         top: '-5px',
                                                        //     }}
                                                        //     // src={`/images/SwiperGrouplevel1/${item.AxG1}.png`} />  ////zare_nk_050229_nokteh(age az database bekhooneh bade emale database food tavassote parsa)
                                                        //     // src={`/images/SwiperGrouplevel1/${index}.png`} />
                                                        //     src={`/images/Icon/Ghesti_Tile.svg`} />
                                                        <div style={{
                                                            backgroundColor: 'rgb(31, 117, 242)',
                                                            display: 'flex', alignItems: 'center', borderRadius: '.25rem', paddingLeft: '.5rem', paddingRight: '.5rem', paddingTop: '2px',
                                                            color: 'white',  ////zare_nk_050401_nokteh(tapsifood css digeei baraye sefid kardane matn gozasht)
                                                            borderBottomRightRadius: 0, position: 'absolute', right: '-8px', top: '.5rem', zIndex: 10, height: '30px',
                                                        }}>
                                                            <span style={{ fontSize: '.75rem', lineHeight: '1rem', fontWeight: 700, }}>خرید قسطی!</span>
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

                                                                    borderTopColor: 'rgb(19, 60, 135)',
                                                                    borderRightColor: 'transparent',
                                                                    borderBottomColor: 'transparent',
                                                                    borderLeftColor: 'transparent',
                                                                }}>
                                                            </span>
                                                        </div>
                                                        :
                                                        <div style={{
                                                            backgroundColor: '#ff5a00',
                                                            display: 'flex', alignItems: 'center', borderRadius: '.25rem', paddingLeft: '.5rem', paddingRight: '.5rem', paddingTop: '2px',
                                                            color: 'white',  ////zare_nk_050401_nokteh(tapsifood css digeei baraye sefid kardane matn gozasht)
                                                            borderBottomLeftRadius: 0, position: 'absolute', left: '-8px', top: '.5rem', zIndex: 10, height: '30px',
                                                        }}>
                                                            <span style={{ fontSize: '.75rem', lineHeight: '1rem', fontWeight: 700, }}>تا 50%</span>
                                                            <span style={{
                                                                    position: 'absolute',

                                                                    height: 0, width: 0,

                                                                    borderTopWidth: '8px',
                                                                    borderRightWidth: 0,
                                                                    borderBottomWidth: 0,
                                                                    borderLeftWidth: '8px',

                                                                    bottom: '-8px', left: 0,

                                                                    display: 'inline-block',

                                                                    borderStyle: 'solid',

                                                                    borderTopColor: '#b23f00',
                                                                    borderRightColor: 'transparent',
                                                                    borderBottomColor: 'transparent',
                                                                    borderLeftColor: 'transparent',
                                                                }}>
                                                            </span>
                                                        </div>
                                                }
                                                {/* zare_nk_050228_nokteh_end(birabt be API hast baraye designe gozashtam(badan dar api gonjandeh beshe ya age salah nist hazf besheh)) */}
                                            </div>

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
                                                            {item.NameSobe}
                                                        </div>

                                                        <div style={{
                                                            display: 'flex', flexFlow: 'row', gap: '2px', alignItems: 'center',
                                                            // visibility: 'hidden',  ////zare_nk_050331_commented(badan az db mikhoone ke emtiazi baraye namayesh dareh ya na(be jaye visibility ham display ra none ya flex mikonim va visibility comment mishe))
                                                        }}>
                                                            <span style={{
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
                                                                src="/images/movaghat/SwiperTapBests/star/star.svg"
                                                                alt="علاقه مندی"
                                                                style={{ width: '.75rem', height: '.75rem', }}
                                                            />
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
                                                            <span
                                                                style={{
                                                                    color: '#878b92',
                                                                    fontSize: '.75rem',
                                                                }}>
                                                                پیک تپسی&zwnj;فود:
                                                            </span>
                                                            <div style={{
                                                                display: 'flex', flexFlow: 'row', alignItems: "center", gap: '.25rem',
                                                            }}>
                                                                {item.Keraye != 0 ?
                                                                    <>
                                                                        <span style={{
                                                                            color: '#878b92',
                                                                            fontSize: '.75rem',
                                                                            margin: '0px',
                                                                            textDecoration: 'line-through',
                                                                        }}>58000</span>
                                                                        <span style={{
                                                                            color: '#059666',
                                                                            //    fontWeight: 500,
                                                                            fontSize: '.875rem',
                                                                            lineHeight: '1.25rem',
                                                                        }}>رایگان</span>
                                                                    </> :
                                                                    <>
                                                                        <span style={{
                                                                            color: '#878b92',
                                                                            fontSize: '.75rem',
                                                                            margin: '0px',
                                                                        }}>58000</span>
                                                                    </>
                                                                }
                                                            </div>
                                                        </div>

                                                        <span style={{
                                                            color: '#878b92',
                                                            fontSize: '.75rem',
                                                            lineHeight: '18px',
                                                        }}>
                                                            {/* تا 50 دقیقه */}
                                                            {item.NazdikTarinZamanErsal}
                                                        </span>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            //</SwiperSlide> 
                        )
                    })}
                </div>
                {/* </Swiper> */}
            </div>
        </>
    );
}

export default memo(SwiperShopsInVendorComp); 