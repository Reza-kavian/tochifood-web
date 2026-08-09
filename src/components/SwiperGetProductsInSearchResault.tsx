////zare_nk_050510_okk(1)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, memo, RefObject, ReactNode, ChangeEvent, MouseEvent } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";

import globalsStyles from "@/styles/components/globals.module.css";

import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { useAuthentication } from '../context/AuthenticationContext';

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

type responsedListFromApiSelectShobehAtrafUserType = {
    IdShobe: number;
    NameSobe: string;
    KafKharid: number;
    Fasele: number;
    ZarfiatErsal: number;
    Keraye: number;
    NazdikTarinZamanErsal: string;
};

type ForCartContInProdDetValType = {
    tedadInSabadOrDet: number;
    ZaribForoosh: number;
    IdKala: number;
    NameKala: string | null;
    DarsadTakhfif: number | null;
    NameBerand: string | null;
    FeeForoosh: number;
    FeeMasraf: number;
    BarcodeKala: string;
    Mojoodi: number;
    MaxTedad: number;
    father: any;
    refForfather: RefObject<string | null>;
    bishAzMaxTedadYaMojoodi: number | null;
    fromShowDetails: boolean;
    ForCartContentsDesignType: number;
    idTag: string;

    IdG1: number;  ////zare_nk_040505_added
    NameG1: string | null;  ////zare_nk_040507_added
    IdShobe: number | null; ////zare_nk_040512_added
};

type InputDataType = {
    IdShobeh: number; 
    // IdShobeh: number[];  ////zare_nk_050512_added(bar asase in(1,2,..) dar SQL WHERE)
    IsJashnvareh: number;
    NameKala: string;
    IdG1: number;
    IdG2: number;
    IdG3: number;
    IdG4: number;
    IsMostBuy: number;
    Sort: number;
    IsFavorite: number;
    IdVitrin: number;
};

const inputData: InputDataType = {
    // IdShobeh: Number(vendorId),
    IdShobeh: 5,
    // IdShobeh: number[5,6,7,8];  ////zare_nk_050512_added(bar asase in(1,2,..) dar SQL WHERE)
    IsJashnvareh: 1,  ////zare_nk_050416_nokteh(baraye switch beine satrhaye kam va satrhaye ziad dar pasokhe api baraye lezat az enetaf va sorate site!)
    // IsJashnvareh: -1,    ////zare_nk_050416_nokteh(baraye switch beine satrhaye kam va satrhaye ziad dar pasokhe api baraye lezat az enetaf va sorate site!)
    NameKala: "",
    IdG1: -1,
    IdG2: -1,
    IdG3: -1,
    IdG4: -1,
    IsMostBuy: -1,
    Sort: -1,
    IsFavorite: -1,
    IdVitrin: -1,
};

const SwiperGetProductsInSearchResault = () => {
    console.log('050329-SwiperGetProductsInSearchResault rendered!!');
    const [errorInSwiperShopsInSearchComp, setErrorInSwiperShopsInSearchComp] = useState<string | null>(null);

    const router = useRouter();

    const [responsedListFromApiSelectShobehAtrafUser, SetResponsedListFromApiSelectShobehAtrafUser] = useState<responsedListFromApiSelectShobehAtrafUserType[] | null>(null);

    const [responsedListFromApiSelectKalaShobeh, SetResponsedListFromApiSelectKalaShobeh] = useState<ForCartContInProdDetValType[]>([]); /////zare_nk_050512_added


    const getSwiperShopsInSearchComp = async () => {
        ////zare_nk_050510_added_st
        const chosenAddress = await getCookie("chosenAddress");
        var parsedChosenAddress: responsedListFromApiSelectAddressListType | null = chosenAddress ? JSON.parse(chosenAddress) : null;
        // setMycurrentAddressState(parsedChosenAddress);  ////zare_nk_050510_commented(chon dar in file,dar haminja faghat be parsedChosenAddress niaz darim va dar jahaye dige va
        ////  jsx niazi be estefadeh azash nist dakhele setState negahesh nadashtam(age dar tavabehe digeh mikham azash estefadeh konam(albateh dar in file felan hich ja azash estefadeh
        ////  nemikonam), vali dar jsx(dar dome html) nemikham azash etefadeh konam mamoolan useRef behtare nesbat be useState ke(useState baese reRender mishe)))
        ////zare_nk_050510_added_end

        let token = await getCookie("token");
        if (!token) {
            setErrorInSwiperShopsInSearchComp("lotfan avval online shid");
            return;
        }
        console.log('tokentokentoken: ' + token);
        // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented 
        const response = await fetch(NextJsApiUrl + "Api_SelectShobehAtrafUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            // body: JSON.stringify({}),
            body: JSON.stringify({
                // "Id": 1,  ////zare_nk_050510_commented(manzoor az Id hamoon IdAddress hast,meghdare 1 ehtemalan meydoon saate sari hast)
                "Id": parsedChosenAddress != null ? parsedChosenAddress.IdAdress : 1, ////zare_nk_050510_added(manzoor az Id hamoon IdAddress hast,meghdare 1 ehtemalan meydoon saate sari hast)
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("zare_nk_050404-Api_SelectGoroohJson data1: " + JSON.stringify(data));
            if (data.status == 0) {
                if (data.data.list == undefined) {
                    return;
                }

                var parsedList = JSON.parse(data.data.list);
                SetResponsedListFromApiSelectShobehAtrafUser(() => {
                    return parsedList
                });
            } else {
                setErrorInSwiperShopsInSearchComp("متاسفانه خطایی رخ داده است34:" + data.errors);
                console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
            }
        } else {
            console.log("zare_nk_050110-!response.ok" + response.ok);
            setErrorInSwiperShopsInSearchComp("متاسفانه خطایی رخ داده است35");
        }
    }

    ////zare_nk_050512_added_st
    const refForfather = useRef<string | null>(null);  ////zare_nk_050512_nokteh(dar sabade food karbord nadareh, baraye marja boodane componente MiddleCountTedadSefr gozashtam)

    const getResponsedListFromApiSelectKalaShobeh = async () => {
        let token = await getCookie("token");
        if (!token) {
            setErrorInSwiperShopsInSearchComp("lotfan avval online shid");
            return;
        }
        console.log('tokentokentoken: ' + token);
        // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented      
        const response = await fetch(NextJsApiUrl + "Api_SelectKalaShobeh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                IdShobeh: inputData.IdShobeh,
                IsJashnvareh: inputData.IsJashnvareh,
                NameKala: inputData.NameKala,
                IdG1: inputData.IdG1,
                IdG2: inputData.IdG2,
                IdG3: inputData.IdG3,
                IdG4: inputData.IdG4,
                IsMostBuy: inputData.IsMostBuy,
                Sort: inputData.Sort,
                IsFavorite: inputData.IsFavorite,
                IdVitrin: inputData.IdVitrin,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("zare_nk_050512-Api_SelectKalaShobeh-data: " + JSON.stringify(data));
            if (data.status == 0) {
                if (data.data.list == undefined) {
                    return;
                }
                var parsedList = JSON.parse(data.data.list);
                console.log('zare_nk_050512-Api_SelectKalaShobeh-parsedList.length: ' +  parsedList.length);
                console.log('zare_nk_050512-Api_SelectKalaShobeh-parsedList: ' + JSON.stringify(parsedList));
                ////zare_nk_050417_commented_st
                // SetResponsedListFromApiSelectKalaShobeh(() => {
                //     return parsedList
                // });
                ////zare_nk_050417_commented_end
                ////zare_nk_050417_commented_st
                SetResponsedListFromApiSelectKalaShobeh(() => {
                    return (
                        parsedList.map((item: any) => {
                            var bishAzMaxTedadYaMojoodi = 0;
                            if (item.MaxTedad != null) {
                                if (item.MaxTedad <= item.TedadDarSabad) {
                                    bishAzMaxTedadYaMojoodi = 1;
                                }
                            }
                            else {
                                if (item.Mojoodi <= item.TedadDarSabad) {
                                    bishAzMaxTedadYaMojoodi = 1;
                                }
                            }

                            let ForCartContentsDesignTypeLet = 0

                            if (item.TedadDarSabad == 0) {
                                ForCartContentsDesignTypeLet = 0;
                            }
                            else if (item.TedadDarSabad > item.ZaribForoosh) {
                                ForCartContentsDesignTypeLet = 2;
                            }
                            else if (item.TedadDarSabad == item.ZaribForoosh) {
                                ForCartContentsDesignTypeLet = 1;
                            }

                            return ({
                                ...item,
                                tedadInSabadOrDet: item.TedadDarSabad,
                                ZaribForoosh: item.ZaribForoosh,
                                IdKala: item.IdKala,
                                NameKala: item.NameKala,
                                DarsadTakhfif: item.DarsadTakhfif,
                                NameBerand: item.NameBerand,
                                FeeForoosh: item.FeeForoosh,
                                FeeMasraf: item.FeeMasraf,
                                BarcodeKala: item.BarcodeKala,
                                Mojoodi: item.Mojoodi,
                                MaxTedad: item.MaxTedad,
                                father: '',
                                refForfather: refForfather,
                                bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
                                fromShowDetails: false,
                                ForCartContentsDesignType: ForCartContentsDesignTypeLet,
                                idTag: '',
                                IdG1: item.IdG1,
                                NameG1: item.NameG1,
                                IdShobe: item.IdShobe,  ////zare_nk_050512_added
                            })
                        })
                    )
                });
                ////zare_nk_050417_commented_end
            } else {
                setErrorInSwiperShopsInSearchComp("متاسفانه خطایی رخ داده است34:" + data.errors);
                console.log("zare_nk_050512-Api_SelectKalaShobeh-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
            }
        } else {
            console.log("zare_nk_050512-Api_SelectKalaShobeh-!response.ok: " + response.ok + '-response.statusText: ' + response.statusText);
            setErrorInSwiperShopsInSearchComp("متاسفانه خطایی رخ داده است35");
        }
    }
    ////zare_nk_050512_added_end

    useEffect(() => {
        const asyncTempFunc = async () => {
            ////zare_nk_050512_nokteh(shayad hamzamaniye getSwiperShopsInSearchComp va getResponsedListFromApiSelectKalaShobeh moshkeli ijad nakonad (masalan
            ////  age manteghe getResponsedListFromApiSelectKalaShobeh bar asase serche karbar bashe, na searche karbar va idShobeei khas ke getSwiperShopsInSearchComp be ma mideh))
            await getSwiperShopsInSearchComp();

            await getResponsedListFromApiSelectKalaShobeh();
        }

        asyncTempFunc();
    }, []);

    ////zare_nk_050512_added_st
    let grouped: Partial<Record<number, ForCartContInProdDetValType[]>> | null = null;
    if (responsedListFromApiSelectKalaShobeh) {
        console.log('050512-responsedListFromApiSelectKalaShobeh called!!');
        grouped = Object.groupBy(
            responsedListFromApiSelectKalaShobeh,
            item => item.IdShobe ? item.IdShobe : 6,
        );
        console.log('050512-responsedListFromApiSelectKalaShobeh called!!grouped: ' + JSON.stringify(grouped));
        console.log('050512-responsedListFromApiSelectKalaShobeh.l:' + responsedListFromApiSelectKalaShobeh.length +
            '-responsedListFromApiSelectKalaShobeh2: ' + JSON.stringify(responsedListFromApiSelectKalaShobeh));
    }
    else {
        console.log('050512-responsedListFromApiSelectKalaShobeh called!!');
    }
    ////zare_nk_050512_added_st

    return (
        <>
            <div style={{
                display: 'flex', flexFlow: 'column', width: '100%', height: 'min-content',
            }} dir="rtl">

                <div style={{
                    padding: '1rem', paddingBottom: '0px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
                }}>
                    <h2 style={{ color: '#1b1c1d', lineHeight: '2rem', fontSize: '1rem', margin: '0px', }}>
                        محصولات
                    </h2>
                </div>

                {responsedListFromApiSelectShobehAtrafUser?.map((item, index) => {
                    // alert('050404-item.IdShobe: ' + item.IdShobe);
                    console.log('050422-item iss: ' + JSON.stringify(item));
                    // console.log('050422-currentShobeState: ' + JSON.stringify(currentShobeState));
                    // console.log('050422-currentShobeState?.IdShobe: ' + currentShobeState?.IdShobe + '-Adress' + mycurrentAddressState?.Adress); 
                    return (
                        <div key={index} style={{
                            display: 'flex', flexFlow: 'column', width: '100%',
                        }}>
                            <div style={{
                                display: 'flex', flexFlow: 'column', width: '100%', paddingTop: '.75rem', paddingBottom: '1rem',
                            }}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%',
                                    backgroundColor: 'inherit',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        textDecoration: 'none',
                                        fontSize: '.875rem',
                                        cursor: 'pointer',

                                        width: '100%',
                                        padding: '1rem',
                                        paddingTop: '0.5rem',
                                        rowGap: '.75rem',
                                        backgroundColor: 'white',
                                    }}>
                                        <div style={{
                                            display: 'flex', flexFlow: 'row', position: 'relative', width: '100%', height: '100%',
                                            justifyContent: 'center', alignItems: 'center', //gap: '0.5rem',
                                            // rowGap: '0.25rem',   ////zare_nk_050304_commented(rowGap nazasht tapsifood)
                                        }}>
                                            <div style={{
                                                display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, width: '3rem', height: '3rem',
                                                borderRadius: '9999px', marginLeft: '.5rem', position: 'relative',
                                            }}>
                                                <img
                                                    src="/images/movaghat/vendorPage/restaurant-tag.jpg"
                                                    alt="resatourant"
                                                    style={{ width: '100%', height: '100%', borderRadius: '9999px', objectFit: 'cover', }} />
                                            </div>

                                            <div style={{
                                                display: 'flex',
                                                // padding: '.5rem',  ////zare_nk_050511_commented
                                                // gap: '.5rem',  ////zare_nk_050511_commented
                                                flexDirection: 'column',
                                                flex: '1 1 0%',
                                            }}>
                                                <div style={{
                                                    display: 'flex', flexFlow: 'row', width: '100%',
                                                }}>
                                                    <div style={{
                                                        display: 'flex', flexFlow: 'row', width: '100%', justifyContent: 'space-between',
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
                                                            lineHeight: '2rem',
                                                            // height: '2.5rem',
                                                            height: '2rem',

                                                            minHeight: '2rem',  // minHeight: '2.5rem', // اجبار به کمتر نشدن
                                                            maxHeight: '2rem',  // maxHeight: '2.5rem', // اجبار به بیشتر نشدن
                                                            boxSizing: 'border-box', // برای اینکه بُردر (border) به ارتفاع اضافه نشود

                                                            textAlign: 'center',
                                                        }}>
                                                            {item.NameSobe}
                                                        </div>

                                                        <div style={{
                                                            display: 'flex', flexFlow: 'row', alignItems: 'center',
                                                        }}>
                                                            <p style={{
                                                                color: '#1b1c1d', fontSize: '.75rem', margin: '0px',
                                                            }}>
                                                                3.1
                                                            </p>
                                                            <img src="/images/movaghat/SwiperTapBests/star/orange-star.svg" alt="علاقه مندی"
                                                                style={{ width: '.75rem', height: '.75rem', }} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div style={{
                                                    display: 'flex', flexFlow: 'row', width: '100%', marginBottom: '2px',
                                                }}>
                                                    <div style={{
                                                        display: 'flex', flexFlow: 'row', width: '100%', justifyContent: 'space-between',

                                                    }}>
                                                        <div style={{
                                                            display: 'flex', flexFlow: 'row', gap: '2px', alignItems: 'center',
                                                        }}>
                                                            <span style={{
                                                                color: '#878b92',
                                                                fontSize: '.75rem',
                                                                lineHeight: '1rem',
                                                            }}>
                                                               {/* پیک توچی&zwnj;فود: */}
                                                                    پیک:
                                                            </span>

                                                            <div style={{
                                                                // flex: "1 0 auto", 
                                                                flexGrow: 1,
                                                                flexShrink: 0,
                                                                flexBasis: 'auto',
                                                                display: "flex",
                                                                flexDirection: 'row',
                                                                justifyContent: 'flex-end',
                                                                lineHeight: '1rem',
                                                            }}>
                                                                {item.Keraye != 0 ?
                                                                    <>
                                                                        <span style={{
                                                                            fontSize: '0.75rem', marginLeft: 2, fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#878b92',
                                                                        }}>
                                                                            {item.Keraye.toLocaleString()}
                                                                        </span>
                                                                        <span style={{
                                                                            fontSize: '0.625rem', fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#878b92',
                                                                        }}>
                                                                            تومان
                                                                        </span>
                                                                    </> :
                                                                    <>
                                                                        <span style={{
                                                                            color: '#059666', fontSize: '.875rem', lineHeight: '1.25rem',
                                                                        }}>رایگان</span>
                                                                    </>
                                                                }
                                                            </div>

                                                        </div>

                                                        <span style={{
                                                            color: '#878b92',
                                                            fontSize: '.75rem',
                                                            lineHeight: '1rem',
                                                        }}>
                                                            {item.NazdikTarinZamanErsal}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                

                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    spaceBetween={12}  ////zare_nk_050305_nokteh(moadele 1.5rem(chon spaceBetween adad 1.5rem))  
                                    slidesPerView="auto"  ////zare_nk_050226_nokteh(meghdaresh ro auto dadim ta bar asase arze SwiperSlide ha tedadesh automat tavasoote 
                                    //// barnameh moshakhas she(pishfarz slidesPerView={1} hast))
                                    // centeredSlides={true}
                                    navigation={false}
                                    ////zare_nk_050511_added_st(basteh be tarrahimoon yejooraei mokammele spaceBetween baraye avalin va akharin slai hast)
                                    slidesOffsetBefore={12}
                                    slidesOffsetAfter={12}
                                    ////zare_nk_050511_added_end(basteh be tarrahimoon yejooraei mokammele spaceBetween baraye avalin va akharin slai hast)

                                    className="SwiperTapTime"
                                    style={{
                                        width: '100%',
                                        //  margin: '0px 19px',
                                        //  height: '86px',
                                        // height: '95px',
                                        // overflow: 'visible', ////zare_nk_050226_nokteh(baraye inke darsade takhfifha ke biroon mizanan dideh beshan)   ////zare_nk_050317_commented(baraye swiper overflow: 'visible' 
                                        //// manteghi nist, chon colle slideha biroon iz swiper namayesh dadeh mishan va be scroll ke mahiate swiper hast digeh ehtiaji nist)
                                    }}>
                                    {/* {responsedListFromApiSelectShobehJashnvareh?.map((item, index) => {
                    console.log('050422-item iss: ' + JSON.stringify(item));
                    console.log('050422-currentShobeState: ' + JSON.stringify(currentShobeState));
                    console.log('050422-currentShobeState?.IdShobe: ' + currentShobeState?.IdShobe + '-Adress' + mycurrentAddressState?.Adress); 
                        return (*/}
                                    {grouped &&
                                        Object.entries(grouped).map(([IdShobe, items]) => {   ////zare_nk_050408_nokteh(chon methode map makhsoose arraye hast az Object.entries estefade kardim baraye tabdile object be arraye)
                                            return (

                                                // {
                                                items?.map((item2) => {
                                                    console.log('050512-item: ' + JSON.stringify(item2));
                                                    if (item2.IdShobe != item.IdShobe) {
                                                        return;
                                                    }
                                                    console.log('050512-item2.IdShobe: ' + item2.IdShobe + '-item.IdShobe: ' + item.IdShobe);
                                                    return (
                                                        <SwiperSlide
                                                            key={item2.IdShobe + '-' + item2.IdKala}
                                                            style={{
                                                                //  width: '72px',
                                                                //  height: '80px',
                                                                // height: '89px',
                                                                width: 'auto',
                                                                // width: '230px',
                                                                // width: '145px',
                                                            }}>
                                                            <div className="contInSlide" style={{
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center', width: '7.5rem', //height: '10.5rem',
                                                                backgroundColor: 'white', borderRadius: '.5rem', boxShadow: '0px 1px 3px 0px #0000001a', 
                                                                //overflow: 'hidden',
                                                            }}>
                                                                <Link href="https://tapsi.food/business-lines?businessTypeId=6" style={{ width: '100%', height: '100%', textDecoration: 'none', }}>
                                                                    <div style={{
                                                                        display: 'flex', flexFlow: 'column', position: 'relative', width: '100%', height: '100%',
                                                                        justifyContent: 'center', alignItems: 'center',
                                                                    }}>
                                                                        <div style={{
                                                                            display: 'flex', width: '7.5rem', height: '5rem', borderTopLeftRadius: '.375rem', borderTopRightRadius: '.375rem',
                                                                            // overflow: "hidden",
                                                                        }}>
                                                                            <img style={{
                                                                                width: '100%', height: '100%',
                                                                                // objectFit: 'cover', 
                                                                                 objectFit: 'contain',
                                                                            }}
                                                                                // src={`/images/SwiperGrouplevel1/${item.AxG1}.png`} />  ////zare_nk_050229_nokteh(age az database bekhooneh bade emale database food tavassote parsa)
                                                                                // src={`/images/SwiperGrouplevel1/${index}.png`} 
                                                                                src={`https://img.tochikala.com/Product/${item2.IdKala}.webp`}
                                                                                // src={`/images/movaghat/SwiperTapTime/1.jpg`}
                                                                                /> 
                                                                                
                                                                        </div>
                                                                        <div style={{
                                                                            display: 'flex', flexFlow: 'column', paddingTop: '2px', gap: '.25rem', width: '100%',
                                                                        }}>
                                                                            <div style={{
                                                                                display: 'flex', flexFlow: 'row', width: '100%',
                                                                            }}>
                                                                                <div style={{
                                                                                    display: 'flex', flexFlow: 'column', width: '100%', padding: '5px', justifyContent: 'space-between',
                                                                                }}>
                                                                                    <div style={{
                                                                                        // fontSize: '0.875rem', 
                                                                                        fontSize: '0.8rem',    
                                                                                        color: '#313335',
                                                                                        // این بخش برای سه‌نقطه و محدودیت ۲ خط
                                                                                        display: '-webkit-box',
                                                                                        WebkitLineClamp: 2,
                                                                                        WebkitBoxOrient: 'vertical',
                                                                                        overflow: 'hidden',

                                                                                        // این بخش برای تثبیت ارتفاع روی ۴۰ پیکسل 
                                                                                        lineHeight: '1.25rem',
                                                                                        // height: '2.5rem',
                                                                                        height: '2.5rem',

                                                                                        minHeight: '2.5rem',  // minHeight: '2.5rem', // اجبار به کمتر نشدن
                                                                                        maxHeight: '2.5rem',  // maxHeight: '2.5rem', // اجبار به بیشتر نشدن
                                                                                        boxSizing: 'border-box', // برای اینکه بُردر (border) به ارتفاع اضافه نشود

                                                                                        textAlign: 'right',
                                                                                    }}>
                                                                                        {item2.NameKala}
                                                                                        {/* زغالی برگر گوشتیران */}
                                                                                    </div>

                                                                                    <div style={{
                                                                                        display: 'flex', flexFlow: 'column', width: '100%', // marginBottom: '2px',
                                                                                    }}>
                                                                                        {(item2.DarsadTakhfif != null && item2.DarsadTakhfif != 0) ? (
                                                                                            <div style={{
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
                                                                                                    fontSize: '.75rem',
                                                                                                    // spanDecorationLine: "line-through",
                                                                                                    textDecoration: "line-through",
                                                                                                    color: '#a5abb1',  ////zare_nk_050316_added
                                                                                                    fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                                                                    lineHeight: '1rem',
                                                                                                }}>
                                                                                                    {item2.FeeMasraf.toLocaleString()}
                                                                                                    {/* {(5400000).toLocaleString()} */}
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
                                                                                                    {item2.FeeMasraf.toLocaleString()}
                                                                                                </span>
                                                                                            </div>
                                                                                        )}

                                                                                        <div style={{
                                                                                            display: "flex",
                                                                                            flexWrap: "wrap",
                                                                                            flexDirection: "row",
                                                                                            marginTop: 0,
                                                                                            marginBottom: 5,
                                                                                            justifyContent: 'flex-start',
                                                                                            alignItems: "center",
                                                                                            width: "100%",
                                                                                        }}>
                                                                                            {(item2.DarsadTakhfif != null && item2.DarsadTakhfif != 0) && (
                                                                                                <div style={{
                                                                                                    backgroundColor: "#ff5a00",
                                                                                                    width: '1.5rem',
                                                                                                    height: '1.25rem',
                                                                                                    // flex: "0 0 auto",
                                                                                                    display: 'flex',
                                                                                                    flexDirection: "row",
                                                                                                    justifyContent: "center",
                                                                                                    alignItems: 'center',
                                                                                                    flexGrow: 0,
                                                                                                    flexShrink: 0,
                                                                                                    flexBasis: 'auto',
                                                                                                    // marginLeft: '2px',
                                                                                                    borderRadius: '.25rem',
                                                                                                }}>
                                                                                                    <span style={{
                                                                                                        fontSize: '.625rem', color: "white", opacity: 1, fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                                                                    }}>
                                                                                                        {`${item2.DarsadTakhfif}%`}
                                                                                                        {/* {`25%`} */}
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
                                                                                            }}>
                                                                                                <span style={{
                                                                                                    fontSize: '0.75rem', lineHeight: '1.25rem', marginLeft: 1, fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#1b1c1d',
                                                                                                }}>
                                                                                                    {item2.FeeForoosh.toLocaleString()}
                                                                                                    {/* {(1399000).toLocaleString()} */}
                                                                                                </span>
                                                                                                <span style={{
                                                                                                    fontSize: '.625rem', fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#6d6d6d',
                                                                                                    paddingTop:'2px',  ////zare_nk_050512_added
                                                                                                }}>
                                                                                                    تومان
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </SwiperSlide>
                                                    )
                                                })
                                                // }


                                            )
                                        })
                                    }

                                    {/*)
                         })} */}
                                </Swiper>




                            </div>
                            <div style={{
                                borderBottom: '1px solid #e6e9ea', width: 'calc(100% - 2rem)', marginLeft: 'auto', marginRight: 'auto',
                                display: (index < responsedListFromApiSelectShobehAtrafUser.length - 1 ? 'flex' : 'none')
                            }}></div>
                        </div>
                    )
                })}
                {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            </div>
        </>
    );
}

export default memo(SwiperGetProductsInSearchResault); 