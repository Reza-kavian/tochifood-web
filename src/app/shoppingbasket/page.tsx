////zare_nk_050413_okk(1)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, RefObject, ReactNode, ChangeEvent, MouseEvent, createContext, useContext } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import Styles from "@/styles/components/location.module.css";
import globalsStyles from "@/styles/components/globals.module.css";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { Collapse, Button, Box, Paper, Typography, Grow, ClickAwayListener, Drawer } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

// import "@neshan-maps-platform/ol/ol.css"   ////zare_nk_050328_commented(in safhe be naghshe niazi nist ke)

import { useAuthentication } from '../../context/AuthenticationContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from "next/link";

import SwiperGrouplevel1Comp from '../../components/SwiperGrouplevel1Comp';

import SwiperTapBestsComp from '../../components/SwiperTapBestsComp';  ////zare_nk_050305_added

import SwiperTopBanerComp from '../../components/SwiperTopBanerComp';

import SwiperThinkBanerComp from '../../components/SwiperthinkBanerComp';

import SwiperTapTimeComp from '../../components/SwiperTapTimeComp';

import SwiperSecondBanerComp from '../../components/SwiperSecondBanerComp';  //zare_nk_050305_added

import AdressListComponent from '../../components/AdressListComponent';  //zare_nk_050328_added 

import { currentAddressContext } from '../../context/currentAddressContext';  //zare_nk_050329_added 
import { json } from "node:stream/consumers";
import { relative } from "node:path";

// import TestComponent from '../components/TestComponent';  ////zare_nk_050327_added_movaghat(componente testi tamrini hast)

import { NextJsApiUrl } from "../../constants/Urls";  ////zare_nk_050407_added

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

////zare_nk_050414_added_st
type SabadTitrType = {
    IdSabadKharidTitr: number;
    SumFeeMasraf: number;
    soodAzKharid: number;
    MablaghNahaee: number;
    [key: string]: any;
};

type SabadRowType = {
    IdSabadKharidSatr: number;
    IdSabadKharidTitr: number;
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
    MasrafSatr: number;
    father: any;
    // refForfather: RefObject<string | null>;
    fromShowDetails: boolean;
    idTag: string;
};
////zare_nk_050414_added_end

export default function Shoppingbasket() {
    console.log('050329-Shoppingbasket rendered!!');   ////zare_nk_050329_added
    const [error, setError] = useState<string | null>(null);
    const [isEpmtyAdressList, setIsEpmtyAdressList] = useState<string | null>(null);
    const [isEpmtyShowAddRemAddress, setIsEpmtyShowAddRemAddress] = useState(true);

    const refForBox = useRef<HTMLDivElement | null>(null);

    // const { userData, login, logout } = useAuthentication(); //zare_nk_050111_added
    const { isLogin } = useAuthentication(); //zare_nk_050111_added //zare_nk_050221_tahlilshe(ke chera estefadeh nashod)

    const [responsedListFromApiSelectAddressList, SetResponsedListFromApiSelectAddressList] = useState<responsedListFromApiSelectAddressListType[] | null>(null);

    let currentAddressUseContext = useContext(currentAddressContext);   ////zare_nk_050329_added  

    // const chosenAddress = getCookie("chosenAddress"); 
    // var parsedChosenAddress: responsedListFromApiSelectAddressListType | null = chosenAddress ? JSON.parse(chosenAddress) : null;
    // const [mycurrentAddressState, setMycurrentAddressState] = useState<responsedListFromApiSelectAddressListType | null>(parsedChosenAddress);    
    const [mycurrentAddressState, setMycurrentAddressState] = useState<responsedListFromApiSelectAddressListType | null>(null);

    // const [currentAddress, setCurrentAddress] = useState<responsedListFromApiSelectAddressListType | null>(null);    ////zare_nk_050329_commented(currentAddress az useState 
    //// tabdil shod be createContext(ta beshe az jadde bozorgvar be nave pas dadeh beshe bedoone vasetehha!!))


    ////zare_nk_050413_commented_st(enteghal ba safheye sabadsatr)
    // // const [addOrRemChanged, setAddOrRemChanged] = useState<string | null>(null);  ////zare_nk_050414_commented(jash ro be state page dad(addOrRemChanged baraye seda zadane api 
    // //// pishnahadat va rikhtane pasokh dar setOfferRows estefadeh mishod(addOrRemChanged dar bastane modale joziate kala va dokmehaye + va - meghdar migireh) ke jash ro
    // //// be setPage(setPage dar rendere avval va scroll be entehaye FlatList meghdar migire )))
    // const [page, setPage] = useState<number | null>(1);   ////zare_nk_050414_added(baraye api tebghe paarametre page api haye parsafar(dige be state addOrRemChanged niazi nadarim))
    // const rofForEnteha = useRef<boolean>(false);  ////zare_nk_050414_added(ta entehaye list boodan page ra modiriat konim) 
    ////zare_nk_050413_commented_end(enteghal ba safheye sabadsatr)
    ////zare_nk_050414_added_st
    const [loadSabadTitr, setLoadSabadTitr] = useState<boolean>(true);
    const [sabadTitr, setSabadTitr] = useState<SabadTitrType[] | null>(null);
    const [jamKol, setJamKol] = useState<number | null>(null);
    const [jamKolTakhfif, setJamKolTakhfif] = useState<number | null>(null);
    const [jamKolNahaei, setJamKolNahaei] = useState<number | null>(null);

    const [sabadRows, setSabadRows] = useState<SabadRowType[]>([]);
    ////zare_nk_050414_added_end

    const goToCartDetails=async (IdShobe:number)=>{
        alert('goToCartDetails-IdShobe: '+IdShobe);
         router.push(`/vendor/${IdShobe}/cart-details`);  
    }

    useEffect(() => {
        const chosenAddress = getCookie("chosenAddress");
        var parsedChosenAddress: responsedListFromApiSelectAddressListType | null = chosenAddress ? JSON.parse(chosenAddress) : null;

        setMycurrentAddressState(parsedChosenAddress);
        ////zare_nk_050413_added_st

        async function getSabadTitrs() {
            const token = await getCookie("token");
            if (token == null) {
                ////zare_nk_041120_alan(estefadeh az dialog) 
                // const bootstrap = await getBootstrap();
                // const mymodalForWarning = new bootstrap.Modal(
                //     document.getElementById("mymodalForWarning")
                // );
                // mymodalForWarning.show();
                // const span = document.querySelector(
                //     "#mymodalForWarning .errorInMymodalForWarning"
                // );
                // if (span instanceof HTMLElement) {
                //     span.innerText = "لطفا ابتدا آنلاین شوید";
                // }
                alert("لطفا ابتدا آنلاین شوید");
                return;
            } else {
                // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented
                let ApiUrl = NextJsApiUrl; ////zare_nk_050407_added
                var urlSelectSabadTitr = ApiUrl + "Api_SelectSabadKharidTitr";

                const response = await fetch(urlSelectSabadTitr, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify({
                        // IdShobeh: 6,  ////zare_nk_050414_commented(chon mikhaim sabade hameye shobeha ro biareh baraye karbar)        
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    var majmooeKharidMasraf = 0;
                    var soodAzKharid = 0;
                    var Kerayeh = 0;
                    var MablaghNahaee = 0;
                    var KafKharid = 0;
                    var IdSabadKharidTitr = 0;
                    var result = JSON.parse(data.data.list);
                    console.log('zare_nk_050414_result22: ' + JSON.stringify(result));
                    if (data.status != 0) {
                        console.log('zare_nk_050414_data.status: ' + data.status + '-data.errors[0]: ' + data.errors[0]);
                        ////zare_nk_041120_alan(estefadeh az dialog) 
                        // const bootstrap = await getBootstrap();
                        // const mymodalForWarning = new bootstrap.Modal(
                        //     document.getElementById("mymodalForWarning")
                        // );
                        // mymodalForWarning.show();
                        // const span = document.querySelector(
                        //     "#mymodalForWarning .errorInMymodalForWarning"
                        // );
                        // if (span instanceof HTMLElement) {
                        //     span.innerText = data.errors[0];
                        // }
                    } else if (data.status == 0) {
                        if (result.length == 0) {
                            // alert('result.length ===== 0: ' + result.length); 
                            setSabadTitr(null);  ////zare_nk_050229_added_st(albate felan niazam nemisheh, chon dar hamyare foroosh faghat yek forooshgah va sabadTitr darnazar darim 
                            //// felan va mostaghim barmameh satrhaye hamin titr ro mikhaim baz koneh(va niaz nabashe karbar dasti rooye titr bezaneh satrhash baz she))
                            IdSabadKharidTitr = 0;
                            majmooeKharidMasraf = 0;
                            soodAzKharid = 0;
                            Kerayeh = 0;
                            MablaghNahaee = 0;
                            KafKharid = 0;
                            setJamKol(0);
                            setJamKolTakhfif(0);
                            setJamKolNahaei(0);
                            // getSabadItems(-22, token);  ////zare_nk_050414_commented(chon dar in safhe aslan sabadsatr nadarim) 

                            return;
                        }
                        setSabadTitr(result);
                        IdSabadKharidTitr = result[0].IdSabadKharidTitr;
                        majmooeKharidMasraf = result[0].SumFeeMasraf;
                        soodAzKharid = result[0].Sood;
                        Kerayeh = result[0].HazineErsal;
                        MablaghNahaee = result[0].MablaghNahaee;
                        KafKharid = result[0].KafKharid;

                        setJamKol(majmooeKharidMasraf);
                        setJamKolTakhfif(soodAzKharid);
                        setJamKolNahaei(MablaghNahaee);
                        // console.log('majmooeKharidMasraf: ' + majmooeKharidMasraf + '-soodAzKharid: ' + soodAzKharid + '-MablaghNahaee: ' + MablaghNahaee);  //zare_nk_041120_commented
                        // getSabadItems(IdSabadKharidTitr, token);  ////zare_nk_050414_commented(chon dar in safhe aslan sabadsatr nadarim)
                    }
                } else {
                    console.log('!!response.ok')
                    if (response.status == 401) {
                        ////zare_nk_041120_alan(estefadeh az dialog)
                        // const bootstrap = await getBootstrap();
                        // const mymodalForWarning = new bootstrap.Modal(
                        //     document.getElementById("mymodalForWarning")
                        // );
                        // mymodalForWarning.show();
                        // const span = document.querySelector(
                        //     "#mymodalForWarning .errorInMymodalForWarning"
                        // );
                        // if (span instanceof HTMLElement) {
                        //     span.innerText = "لطفا ابتدا آنلاین شوید";
                        // }
                        alert("لطفا ابتدا آنلاین شوید");
                    }
                }
            }
        }
        getSabadTitrs();

        async function getSabadSatrs() {
            const token = await getCookie("token");
            if (token == null) {
                ////zare_nk_041120_alan(estefadeh az dialog) 
                // const bootstrap = await getBootstrap();
                // const mymodalForWarning = new bootstrap.Modal(
                //     document.getElementById("mymodalForWarning")
                // );
                // mymodalForWarning.show();
                // const span = document.querySelector(
                //     "#mymodalForWarning .errorInMymodalForWarning"
                // );
                // if (span instanceof HTMLElement) {
                //     span.innerText = "لطفا ابتدا آنلاین شوید";
                // }
                alert("لطفا ابتدا آنلاین شوید");
                return;
            }
            // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented
            let ApiUrl = NextJsApiUrl; ////zare_nk_050407_added
            var urlSelectSabad = ApiUrl + "Api_SelectSabadKharidSatr";
            const response = await fetch(urlSelectSabad, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    // IdShobe: 6,  
                    // IdSabadKharidTitr: IdSabadKharidTitr,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                var result = JSON.parse(data.data.list);
                if (data.status != 0) {
                    ////zare_nk_041120_alan(estefadeh az dialog)
                    console.log('data.errors[0] is: ' + data.errors[0]);
                    // const bootstrap = await getBootstrap();
                    // const mymodalForWarning = new bootstrap.Modal(
                    //   document.getElementById("mymodalForWarning")
                    // );
                    // mymodalForWarning.show();
                    // const span = document.querySelector(
                    //   "#mymodalForWarning .errorInMymodalForWarning"
                    // );
                    // if (span instanceof HTMLElement) {
                    //   span.innerText = data.errors[0];
                    // }
                } else if (data.status == 0) {
                    if (result.length == 0) {
                        console.log('satr nadarim');
                        return;
                    }
                    console.log('041120-result in Api_SelectSabadKharidSatr: ' + JSON.stringify(result));
                    // setBisatr(false);
                    // refForfather.current = "#sabadItemsContInSafhe";

                    // ////zare_nk_041119_added_st_olgu_1(dorost ba return va akoolad va parantezbandi)
                    // setSabadRows(() => {
                    //   return (
                    //     result.map((item: any) => {
                    //       return ({
                    //         tedadInSabadOrDet: item.Tedad,
                    //         // بقیه فیلدها
                    //       })
                    //     })
                    //   )
                    // });
                    // ////zare_nk_041119_added_end_olgu_1(dorost ba return va akoolad va parantezbandi)
                    // ////zare_nk_041119_added_st_olgu_2(dorost ba return va akoolad va parantezbandi)
                    // setSabadRows(
                    //   result.map((item: any) => ({
                    //     tedadInSabadOrDet: item.Tedad,
                    //     // بقیه فیلدها اینجا
                    //   }))
                    // );
                    // ////zare_nk_041119_added_end_olgu_2(dorost ba return va akoolad va parantezbandi)
                    ////zare_nk_041119_added_st
                    setSabadRows(() => {
                        return (
                            result.map((item: any) => {
                                return ({ 
                                    IdSabadKharidSatr: item.IdSabadKharidSatr,
                                    IdSabadKharidTitr: item.IdSabadKharidTitr,
                                    tedadInSabadOrDet: item.Tedad,
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
                                    MasrafSatr: item.MasrafSatr,
                                    father: "#sabadItemsContInSafhe",
                                    // refForfather: refForfather,
                                    fromShowDetails: false,
                                    idTag: "ForCart-" + item.IdKala,
                                })
                            })
                        )
                    });
                }
            } else {
                if (response.status == 401) {
                    console.log("لطفا ابتدا آنلاین شوید");
                    // const bootstrap = await getBootstrap();
                    // const mymodalForWarning = new bootstrap.Modal(
                    //   document.getElementById("mymodalForWarning")
                    // );
                    // mymodalForWarning.show();
                    // const span = document.querySelector(
                    //   "#mymodalForWarning .errorInMymodalForWarning"
                    // );
                    // if (span instanceof HTMLElement) {
                    //   span.innerText = "لطفا ابتدا آنلاین شوید";
                    // }
                }
            }
        }
        getSabadSatrs();
        ////zare_nk_050413_added_end
    }, []);

    const router = useRouter();

    const showAddressListDrawer = useCallback(
        async () => {
            let token = getCookie("token");
            if (!token) {
                setError("lotfan avval online shid");
                return;
            }

            // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented
            let ApiUrl = NextJsApiUrl;  ////zare_nk_050407_added
            const response = await fetch(ApiUrl + "Api_SelectAddress", {
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
                    // console.log("zare_nk_050206-parsedList1: " + parsedList[0].Adress);
                    // console.log("zare_nk_050206-parsedList2: " + parsedList[1].Adress);
                    setIsEpmtyAdressList('notNull');

                    SetResponsedListFromApiSelectAddressList(() => {
                        return parsedList
                    });

                } else {
                    setError("متاسفانه خطایی رخ داده است34:" + data.errors);
                    // console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
                    ////zare_nk_050221_nokteh(setIsEpmtyAdressList(null); ro bezarim??)
                }
            } else {
                // console.log("zare_nk_050110-!response.ok" + response.ok);
                setError("متاسفانه خطایی رخ داده است35");
                ////zare_nk_050221_nokteh(setIsEpmtyAdressList(null); ro bezarim??)
            }

            // console.log('zare_nk_050110-token hala is: ' + getCookie("token"));
            if (token) {
                setIsEpmtyAdressList('notNull');   //zare_nk_050221_nokteh(age online bashe va address nadashteh bashe ke manteghi nist setIsEpmtyAdressList('notNull') beshe!!)
            }
            else {
                // alert('lotfan avval online shid');
                ////zare_nk_050221_nokteh(setIsEpmtyAdressList(null); ro bezarim??)
            }
        }
        , [isEpmtyAdressList, responsedListFromApiSelectAddressList])

    ////zare_nk_050226_nokteh_st(baraye dokmehaye navigation va pagination dasti(ke estefadeh nakardim))
    // const refForwiperButtonNext = useRef<HTMLButtonElement | null>(null);
    // const refForwiperButtonPrev = useRef<HTMLButtonElement | null>(null);
    // const swiperRef = useRef(null);

    // useEffect(() => {
    //   // اگر ریفرنس‌ها هنوز پر نشده باشند، کاری نکن
    //   if (!refForwiperButtonNext.current || !refForwiperButtonPrev.current) return;

    //   // اگر swiperRef هنوز ساخته نشده، صبر کن (چون Swiper کمی دیرتر رندر میشه)
    //   if (!swiperRef.current) return;

    //   // ۴. اینجا به Swiper می‌گوییم دکمه‌هایش کدام هستند
    //   // ماژول Navigation را از داخل instance Swiper پیدا می‌کنیم
    //   const swiperInstance = swiperRef.current.swiper;

    //   // تنظیم دکمه‌ها
    //   swiperInstance.params.navigation.nextEl = refForwiperButtonNext.current;
    //   swiperInstance.params.navigation.prevEl = refForwiperButtonPrev.current;

    //   // فعال‌سازی مجدد دکمه‌ها
    //   swiperInstance.navigation.update();
    //   swiperInstance.navigation.init();
    // }, []);
    ////zare_nk_050226_nokteh_end(baraye dokmehaye navigation va pagination dasti(ke estefadeh nakardim))

    ////IsEpmtyAdressList
    ////zare_nk_050226_added_end

    // const showAddRemAddress = useCallback(
    //   async () => {
    //     setIsEpmtyShowAddRemAddress(false);
    //   }
    //   , [isEpmtyShowAddRemAddress]);

    ////zare_nk_050327_added_movaghat_st(pakkardani va tamrini)
    // const [testState, SetTestState] = useState<number>(1);
    // const [testState2, SetTestState2] = useState<number>(1);

    // useEffect(() => {
    //   // SetTestState2(2); 
    //   // useCalback1;
    // }, []);

    // function func33() {
    //   console.log('zare_nk_050327-func33 called!!');
    //   return SetTestState2((c) => c + 1);
    //   // return 200;
    // }

    // const useCalback1 =  useCallback(
    //   () => {  ////zare_nk_050327_nokteh(chon in tabe be farzand pas dadeh shodeh,hamvareh pedar reRender beshe farzand ham reRender mishe
    //     //// nabayad setStati ke seda zadeh nashodeh baese in reRender beshe, vali react injooriyeh! va age pedare reRender beshe ba har setStati hatta gheir az in 
    //     // setState() ke seda zadeh nashod) farzand ham reRender mishe(chareye kar useCallback hast ke react manteghi beshe va faghat zamani ke in setState seda 
    //     //// zadeh mishe farzand ro reRender mikoneh(dar zemn useCalback ham bedoone memo boodane farzand fayedehi nadareh, chon dar in soorat farzand hamvareh seda 
    //     //// zadeh mishe ba rendere pedar)))
    //     // return SetTestState2(2);
    //     SetTestState((cur) => {
    //       return 5;
    //     });
    //   } , [testState]);
    ////zare_nk_050327_added_movaghat_end(pakkardani va tamrini)

    return (
        <currentAddressContext.Provider value={{ mycurrentAddress: mycurrentAddressState, setMycurrentAddress: setMycurrentAddressState }}>
            {/*<button onClick={() => { func33() }}>for func3</button> 
            <TestComponent testState={testState} SetTestState={useCalback1} /> */}
            <div style={{
                // backgroundColor: 'white', 
                width: '100%',
                // height: '100%',  ////height :100% dorost nist, chon shayad dar layout alaveh ba children satrhaye dife ham dashe bashim(mesle footer va header va...)
                display: "flex",
                flexDirection: 'column',
                // border: '3px solid orange',
            }}>
                {/* zare_k_050413_commented(SwiperThinkBanerComp nemikhaim dar sabad) */}
                {/* <SwiperThinkBanerComp /> */}

                <header style={{
                    position: 'sticky',
                    top: '0px',
                    boxShadow: '0px 3px 2px -1px #d7d6d6',
                    display: 'flex',
                    flexFlow: 'row-reverse',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '5px',
                    zIndex: 899,
                    backgroundColor: 'white',
                }}>

                    <button
                        id="showAddressListDrawerBtn"
                        onClick={showAddressListDrawer}
                        style={{
                            borderRadius: 10,
                            display: 'flex',
                            visibility: (mycurrentAddressState?.Adress ? 'visible' : 'hidden'),  ////zare_nk_050329_added
                            flexDirection: 'column',
                            backgroundColor: 'inherit',
                            border: 'none',
                            fontSize: '.875rem',
                            cursor: "pointer",
                        }}>
                        <span
                            style={{
                                fontSize: '.875rem',
                                lineHeight: '1.25rem',
                                color: '#878b92',
                                textAlign: "right",
                            }}
                        >ارسال به</span>
                        <div style={{
                            display: 'flex',
                            flexFlow: 'row',
                            direction: 'rtl',
                            color: '#313335',
                            // minWidth: '124px',   ////zare_nk_050413_commented
                            // maxWidth: '256px',   ////zare_nk_050413_commented
                            width: '100%',    ////zare_nk_050413_added
                            gap: '.5rem',
                        }}>
                            <span style={{ textAlign: "right", }}>
                                {/* zare_nk_050329_nokteh(currentAddress az useState tabdil shod be useContext) */}
                                {mycurrentAddressState?.Adress ? mycurrentAddressState.OnvanAdress : ''}
                                آدرس فعلی
                            </span>

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

                                textAlign: 'right',
                            }}>
                                {/* {currentAddress?.Adress ? currentAddress.Adress : 'آدرسسس'} */}
                                {mycurrentAddressState?.Adress ? mycurrentAddressState.Adress : ''}
                            </div>

                            <img
                                src="/images/header/getAddresses.svg"
                                alt=" ادرس ها"
                            />
                            {/* <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="inherit" class="size-6 shrink-0 fill-gray-950 rotate-90"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.55017 15.5355L12.085 12.0007L8.55017 8.46445L9.96438 7.05023L14.9141 12L9.96438 16.9497L8.55017 15.5355Z" fill="inherit"></path></svg> */}
                        </div>
                    </button>

                    <button
                        id="goShoppingBacketBtn"
                        // onClick={showAddressListDrawer}
                        onClick={() => { setError('goooo!!') }}
                        style={{
                            // display: 'flex',  ////zare_nk_050413_commented
                            display: 'none',  ////zare_nk_050413_added
                            alignItems: 'center',
                            backgroundColor: 'inherit',
                            border: 'none',
                            fontSize: '.875rem',
                            height: '50px',
                            cursor: "pointer",
                        }}>
                        <img
                            src="/images/header/shoppingBacket.svg"
                            alt="سبد خرید"
                        />
                    </button>
                </header >

                <main
                    style={{
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
                        // paddingTop: '10px',   
                    }}>
                    {isEpmtyAdressList &&  ////zare_nk_050329_updated(sharte isEpmtyAdressList emal shod ke isEpmtyAdressList==false bood component ra aslan seda nazanim)
                        <AdressListComponent
                            isEpmtyAdressList={isEpmtyAdressList}
                            setIsEpmtyAdressList={setIsEpmtyAdressList}
                            refForBox={refForBox}
                            responsedListFromApiSelectAddressList={responsedListFromApiSelectAddressList}
                            isEpmtyShowAddRemAddress={isEpmtyShowAddRemAddress}
                            setIsEpmtyShowAddRemAddress={setIsEpmtyShowAddRemAddress}
                            // showAddRemAddress={showAddRemAddress}     //zare_nk_050329_commented
                            showAddressListDrawer={showAddressListDrawer}
                        // setCurrentAddress={setCurrentAddress}  ////zare_nk_050329_commented(currentAddress az seState tabdil shod be useContext)
                        />
                    }

                    <div style={{ marginBottom: '.70rem' }}></div>

                    {/* zare_nk_050413_commented_st(searchBox nadarim dar sabade kharid) */}
                    {/*<a style={{
                            display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: 'calc(100% - 2rem)', height: '40px', marginLeft: '1rem', marginRight: '1rem',
                            position: 'relative', padding: '10px 1rem', backgroundColor: '#f1f2f3', borderRadius: '9999px', gap: '0.25rem', textDecoration: 'none',
                        }}
                        href="/search">
                        <svg style={{ width: '.875rem', height: '.875rem' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#a5abb1" className="size-3.5 shrink-0 fill-gray-500 text-gray"><path d="M22.07 21.47L18.93 18.34C20.52 16.61 21.5 14.3 21.5 11.77C21.5 6.40003 17.13 2.03003 11.76 2.03003C6.39003 2.03003 2.03003 6.40003 2.03003 11.77C2.03003 17.14 6.40003 21.51 11.77 21.51C14.07 21.51 16.18 20.71 17.84 19.37L21.01 22.53C21.16 22.68 21.35 22.75 21.54 22.75C21.73 22.75 21.92 22.68 22.07 22.53C22.36 22.24 22.36 21.76 22.07 21.47ZM3.53003 11.77C3.53003 7.22003 7.22003 3.53003 11.77 3.53003C16.32 3.53003 20.01 7.23003 20.01 11.77C20.01 16.31 16.31 20.01 11.77 20.01C7.23003 20.01 3.53003 16.31 3.53003 11.77Z" fill="inherit"></path></svg>
                        <p style={{ color: '#878b92', fontSize: '.75rem', lineHeight: '1rem', flex: '1 1 0%', }} className="flex-1 text-xs text-gray">جستجوی نام فروشگاه یا محصول...</p>
                    </a> 
                    <div style={{ marginBottom: '.75rem' }}></div>*/}
                    {/* zare_nk_050413_commented_end(searchBox nadarim dar sabade kharid) */}

                    {/* zare_nk_050413_commented_st(in swiperha ra nadarim dar sabade kharid) */}
                    {/* <SwiperTopBanerComp />

                    <div style={{ marginBottom: '.50rem' }}></div>

                    <SwiperGrouplevel1Comp />

                    <SwiperTapBestsComp />

                    <div style={{ marginBottom: '1.5rem' }}></div>

                    <SwiperSecondBanerComp />

                    <div style={{ marginBottom: '1.5rem' }}></div>

                    <SwiperTapTimeComp />

                    <div style={{
                        display: 'flex', flexFlow: 'column', gap: '.5rem', width: '100%',
                        // marginTop: '.75rem',
                        //  marginBottom: '.75rem',   
                        marginBottom: '1rem',
                    }}>
                        <div style={{
                            display: 'flex', flexFlow: "row", justifyContent: "space-between", alignItems: 'center',
                            width: '100%',
                            // paddingLeft: '1rem', paddingRight: '1rem',
                        }}>
                            <img
                                style={{
                                    // width: '137px',  
                                    width: '100%',
                                    // height: '105px',
                                    objectFit: 'cover',
                                    borderTopLeftRadius: '.375rem',
                                    borderTopRightRadius: '.375rem',
                                }}
                                // src={`/images/SwiperGrouplevel1/${item.AxG1}.png`} />  ////zare_nk_050229_nokteh(age az database bekhooneh bade emale database food tavassote parsa)
                                // src={`/images/SwiperGrouplevel1/${index}.png`} />
                                // https://img.tochikala.com/Product/' + item.IdKala
                                // src={`/images/movaghat/SwiperTapTime/${index}.jpg`} />
                                src={`/images/baners/single-punched-banner/single-punched-banner-01.png`} />
                        </div>
                    </div> */}
                    {/* zare_nk_050413_commented_end(in swiperha ra nadarim dar sabade kharid) */}
                    {/* zare_nk_050413_added_st(berim mohtavaye sabad) */}
                    <div id="sabdTitrAndRowsCont" style={{
                        display: 'flex', flexFlow: 'column', width: '100%',
                    }}>
                        {sabadTitr?.map((titrItem, titrIndex) => {
                            return (
                                <div id={`sabdTitrAndRows-${titrItem.IdSabadKharidTitr}`} key={titrItem.IdSabadKharidTitr}
                                    style={{
                                        display: 'flex', flexFlow: 'column', width: '100%', padding: '1rem',
                                    }}>
                                    <div id={`sabdTitrCont-${titrItem.IdSabadKharidTitr}`} style={{
                                        display: 'flex', gap: '.5rem', justifyContent: 'flex-start', alignItems: 'center', width: '100%',
                                    }}>
                                        <div style={{
                                            borderRadius: '.5rem', flexShrink: 0, width: '40px', minWidth: '40px',
                                            height: '40px', position: 'relative',
                                        }}>
                                            <img
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: '.5rem',
                                                    zIndex: '1',
                                                }}
                                                // src={`https://img.tochikala.com/Product/${responsedListFromApiSelectKalaShobeh[0].IdKala}.webp`} />
                                                src={`/images/movaghat/shoppingBasket/pizza-farhang-tag.jpg`} />
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                            width: '100%',
                                            // gap: '.5rem',  ////zare_nk_050413_commented
                                        }}>
                                            <div style={{
                                                display: 'flex', justifyContent: "space-between", width: '100%',
                                            }}>
                                                <div style={{
                                                    fontSize: '.875rem',
                                                    color: '#313335',

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
                                                    {titrItem.NameSobe}
                                                </div>

                                                <div style={{
                                                    // display: 'flex', ////zare_nk_050413_commented 
                                                    display: 'none',    ////zare_nk_050413_added 
                                                    flexFlow: 'row', gap: '0.25rem', alignItems: 'center',
                                                }}>
                                                    <p style={{
                                                        color: '#000000',
                                                        // fontSize: '1rem',  ////zare_nk_050407_commented(ghalebe fonte man bozorge)
                                                        fontSize: '0.875rem',  ////zare_nk_050407_added(ghalebe fonte man bozorge)

                                                        margin: '0px',

                                                    }}>
                                                        4.1
                                                    </p>
                                                    <img
                                                        src="/images/movaghat/SwiperTapBests/star/orange-star.svg"
                                                        alt="علاقه مندی"
                                                        style={{ width: '12px', height: '12px', }}
                                                    />
                                                </div>
                                            </div>

                                            <div style={{
                                                fontSize: '.875rem',
                                                color: '#a5abb1',

                                                // این بخش برای سه‌نقطه و محدودیت ۲ خط
                                                display: '-webkit-box',
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',

                                                // این بخش برای تثبیت ارتفاع روی ۴۰ پیکسل 
                                                lineHeight: '1.25rem',
                                                // height: '2.5rem',
                                                height: '2.5rem',

                                                minHeight: '2.5rem',  // minHeight: '2.5rem', // اجبار به کمتر نشدن
                                                maxHeight: '2.5rem',  // maxHeight: '2.5rem', // اجبار به بیشتر نشدن
                                                boxSizing: 'border-box', // برای اینکه بُردر (border) به ارتفاع اضافه نشود

                                                textAlign: 'start',
                                            }}>
                                                {/* استان مازندران-ساری، دخانیات، شهید عباسی، شهید کنعانی، بین شهید عبدی و گلها */}
                                                {mycurrentAddressState?.Adress}
                                            </div>
                                        </div>
                                    </div>

                                    <div id={`sabdRowsCont-${titrItem.IdSabadKharidTitr}`} style={{
                                        display: 'flex', flexFlow: 'column', width: '100%', //border: '2px dashed red', 
                                    }}>
                                        {sabadRows?.map((rowItem, rowIndex) => {
                                            // alert("titrItem.IdSabadKharidTitr: " + titrItem.IdSabadKharidTitr + "rowItem.IdSabadKharidTitr: " + rowItem.IdSabadKharidTitr);
                                            if (rowItem.IdSabadKharidTitr != titrItem.IdSabadKharidTitr) {
                                                return;
                                            }
                                            else {
                                                // alert("rowItem.IdSabadKharidTitr= titrItem.IdSabadKharidTitr yani: " + rowItem.IdSabadKharidTitr);
                                            }
                                            return (
                                                <div id={`sabdRow-${rowItem.IdSabadKharidSatr}`} key={rowItem.IdSabadKharidSatr}
                                                    style={{
                                                        display: 'flex', flexFlow: 'column', width: '100%',
                                                        //border: '2px dashed blue',
                                                    }}>
                                                    <div style={{
                                                        display: 'flex',
                                                        paddingBottom: '.75rem',
                                                        paddingTop: '.75rem',
                                                        gap: '.5rem', justifyContent: 'space-between', alignItems: 'center',
                                                        width: '100%',  ////zare_nk_050413_commented
                                                        //  height: '100px',  ////zare_nk_050413_commented
                                                    }}>
                                                        <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', gap: '.5rem' }}>
                                                            <div style={{
                                                                borderRadius: '.5rem', flexShrink: 0, width: '40px', minWidth: '40px',
                                                                height: '40px', position: 'relative',
                                                            }}>
                                                                <img
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        objectFit: 'cover',
                                                                        borderRadius: '.5rem',
                                                                        zIndex: '1',
                                                                    }}
                                                                    // src={`https://img.tochikala.com/Product/${responsedListFromApiSelectKalaShobeh[0].IdKala}.webp`} />
                                                                    // src={`/images/movaghat/shoppingBasket/g1Img.jpg`} />
                                                                    src={`https://img.tochikala.com/Product/${rowItem.IdKala}.webp`} />

                                                            </div>
                                                            <div style={{
                                                                fontSize: '.875rem',
                                                                color: '#313335',

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
                                                                {/* پیتزا دهه 60 آمریکایی یک نفره */}
                                                                {rowItem.NameKala}
                                                            </div>
                                                        </div>

                                                        <div style={{
                                                            display: 'flex',
                                                            flexFlow: 'column',
                                                            // width: '100%',  ////zare_nk_050413_commented
                                                            // marginBottom: '2px',
                                                        }}>
                                                            {(rowItem.DarsadTakhfif != null && rowItem.DarsadTakhfif != 0) ? ( //&& (   
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
                                                                        fontSize: '0.65rem',
                                                                        textDecoration: "line-through",
                                                                        color: '#888',
                                                                        fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                                        lineHeight: '10px',
                                                                    }}>
                                                                        {rowItem.FeeMasraf.toLocaleString()}
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
                                                                }}>
                                                                    <span style={{
                                                                        // fontSize: 11,
                                                                        fontSize: '0.65rem',
                                                                        // opacity: 0.7,  
                                                                        textDecorationLine: "line-through",
                                                                        color: '#888',  ////zare_nk_050316_added
                                                                        fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                                        lineHeight: '10px',
                                                                    }}>
                                                                        {rowItem.FeeMasraf.toLocaleString()}
                                                                    </span>
                                                                </div>
                                                            )}

                                                            <div
                                                                style={{
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
                                                                }} >

                                                                {(rowItem.DarsadTakhfif != null && rowItem.DarsadTakhfif != 0) && (
                                                                    <div
                                                                        // id={`darsadTakhfifInsabad-${item.IdKala}`}
                                                                        // className="darsadTakhfifInsabad rounded-pill"
                                                                        style={{
                                                                            // backgroundColor: "#ff3151",  ////zare_nk_050413_commented
                                                                            backgroundColor: "#ff5a00",   ////zare_nk_050413_added
                                                                            // width: 39,  ////zare_nk_050413_commented
                                                                            // height: 20,  ////zare_nk_050413_commented
                                                                            width: '1.5rem',   ////zare_nk_050413_added
                                                                            height: '1.25rem',   ////zare_nk_050413_added

                                                                            // flex: "0 0 auto",
                                                                            display: 'flex',
                                                                            flexDirection: "row",
                                                                            justifyContent: "center",
                                                                            alignItems: 'center',
                                                                            flexGrow: 0,
                                                                            flexShrink: 0,
                                                                            flexBasis: 'auto',
                                                                            marginLeft: 5,
                                                                            // borderRadius: 100,    ////zare_nk_050413_commented
                                                                            borderRadius: '.25rem',  ////zare_nk_050413_added                                             
                                                                        }}>
                                                                        <span
                                                                            // className="forDiscount"
                                                                            style={{
                                                                                //   fontSize: 12,
                                                                                fontSize: '.625rem',
                                                                                color: "white",
                                                                                opacity: 1,
                                                                                fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                                                // borderWidth: 2,
                                                                                // borderStyle: 'dashed',
                                                                                // borderColor: 'black',
                                                                            }}
                                                                        >
                                                                            {`${rowItem.DarsadTakhfif}%`}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                <div
                                                                    style={{
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
                                                                    }}
                                                                >
                                                                    <span
                                                                        //  className="mablagh" 
                                                                        style={{
                                                                            // fontSize: 13,
                                                                            fontSize: '0.75rem',
                                                                            marginLeft: 5,
                                                                            fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                                            color: '#3d3d3d',   ////zare_nk_050316_added
                                                                        }}>
                                                                        {rowItem.FeeForoosh.toLocaleString()}
                                                                    </span>
                                                                    <span
                                                                        style={{
                                                                            //  fontSize: 12,
                                                                            fontSize: '0.70rem',
                                                                            fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#6d6d6d',
                                                                        }}
                                                                    >تومان</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div style={{
                                                        display: 'flex',
                                                        paddingBottom: '.375rem',
                                                        paddingTop: '.375rem',
                                                        gap: '.5rem', justifyContent: 'space-between', alignItems: 'center',
                                                        width: '100%',
                                                    }}>
                                                        <span style={{ color: '#63676e', fontSize: '.875rem', lineHeight: '1.25rem', }}>بدون افزودنی</span>
                                                        <span style={{ color: '#63676e', fontSize: '.875rem', lineHeight: '1.25rem', }}>رایگان</span>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* <div id="sabdRows" style={{
                                            display: 'flex', flexFlow: 'column', width: '100%',
                                            //border: '2px dashed blue',
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                paddingBottom: '.75rem',
                                                paddingTop: '.75rem',
                                                gap: '.5rem', justifyContent: 'space-between', alignItems: 'center',
                                                width: '100%',  ////zare_nk_050413_commented
                                                //  height: '100px',  ////zare_nk_050413_commented
                                            }}>
                                                <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', gap: '.5rem' }}>
                                                    <div style={{
                                                        borderRadius: '.5rem', flexShrink: 0, width: '40px', minWidth: '40px',
                                                        height: '40px', position: 'relative',
                                                    }}>
                                                        <img
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                                borderRadius: '.5rem',
                                                                zIndex: '1',
                                                            }}
                                                            // src={`https://img.tochikala.com/Product/${responsedListFromApiSelectKalaShobeh[0].IdKala}.webp`} />
                                                            src={`/images/movaghat/shoppingBasket/g1Img.jpg`} />
                                                    </div>
                                                    <div style={{
                                                        fontSize: '.875rem',
                                                        color: '#313335',

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
                                                        پیتزا دهه 60 آمریکایی یک نفره
                                                    </div>
                                                </div>

                                                <div style={{
                                                    display: 'flex',
                                                    flexFlow: 'column',
                                                    // width: '100%',  ////zare_nk_050413_commented
                                                    // marginBottom: '2px',
                                                }}>
                                                    {(item.DarsadTakhfif != null && item.DarsadTakhfif != 0) && (
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
                                                                fontSize: '0.65rem',
                                                                textDecoration: "line-through",
                                                                color: '#888',
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
                                                    }}>
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

                                                    <div
                                                        style={{
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
                                                        }} >

                                                        {(item.DarsadTakhfif != null && item.DarsadTakhfif != 0) && (
                                                            <div
                                                                // id={`darsadTakhfifInsabad-${item.IdKala}`}
                                                                // className="darsadTakhfifInsabad rounded-pill"
                                                                style={{
                                                                    // backgroundColor: "#ff3151",  ////zare_nk_050413_commented
                                                                    backgroundColor: "#ff5a00",   ////zare_nk_050413_added
                                                                    // width: 39,  ////zare_nk_050413_commented
                                                                    // height: 20,  ////zare_nk_050413_commented
                                                                    width: '1.5rem',   ////zare_nk_050413_added
                                                                    height: '1.25rem',   ////zare_nk_050413_added

                                                                    // flex: "0 0 auto",
                                                                    display: 'flex',
                                                                    flexDirection: "row",
                                                                    justifyContent: "center",
                                                                    alignItems: 'center',
                                                                    flexGrow: 0,
                                                                    flexShrink: 0,
                                                                    flexBasis: 'auto',
                                                                    marginLeft: 5,
                                                                    // borderRadius: 100,    ////zare_nk_050413_commented
                                                                    borderRadius: '.25rem',  ////zare_nk_050413_added                                             
                                                                }}>
                                                                <span
                                                                    // className="forDiscount"
                                                                    style={{
                                                                        //   fontSize: 12,
                                                                        fontSize: '.625rem',
                                                                        color: "white",
                                                                        opacity: 1,
                                                                        fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                                        // borderWidth: 2,
                                                                        // borderStyle: 'dashed',
                                                                        // borderColor: 'black',
                                                                    }}
                                                                >
                                                                    {`${item.DarsadTakhfif}%`}
                                                                </span>
                                                            </div>
                                                        )}
                                                        <div
                                                            style={{
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
                                                            }}
                                                        >
                                                            <span
                                                                //  className="mablagh" 
                                                                style={{
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
                                                                }}
                                                            >تومان</span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                paddingBottom: '.375rem',
                                                paddingTop: '.375rem',
                                                gap: '.5rem', justifyContent: 'space-between', alignItems: 'center',
                                                width: '100%',
                                            }}>
                                                <span style={{ color: '#63676e', fontSize: '.875rem', lineHeight: '1.25rem', }}>بدون افزودنی</span>
                                                <span style={{ color: '#63676e', fontSize: '.875rem', lineHeight: '1.25rem', }}>رایگان</span>
                                            </div>

                                        </div>
                                        <div id="sabdRows" style={{
                                            display: 'flex', flexFlow: 'column', width: '100%',
                                            // border: '2px dashed blue',
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                paddingBottom: '.75rem',
                                                paddingTop: '.75rem',
                                                gap: '.5rem', justifyContent: 'space-between', alignItems: 'center',
                                                width: '100%',
                                            }}>
                                                <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', gap: '.5rem' }}>
                                                    <div style={{
                                                        borderRadius: '.5rem', flexShrink: 0, width: '40px', minWidth: '40px',
                                                        height: '40px', position: 'relative',
                                                    }}>
                                                        <img
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                                borderRadius: '.5rem',
                                                                zIndex: '1',
                                                            }}
                                                            // src={`https://img.tochikala.com/Product/${responsedListFromApiSelectKalaShobeh[0].IdKala}.webp`} />
                                                            src={`/images/movaghat/shoppingBasket/g1Img.jpg`} />
                                                    </div>
                                                    <div style={{
                                                        fontSize: '.875rem',
                                                        color: '#313335',

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
                                                        پیتزا دهه 60 آمریکایی خانواده
                                                    </div>
                                                </div>

                                                <div style={{
                                                    display: 'flex',
                                                    flexFlow: 'column',
                                                    // width: '100%',  ////zare_nk_050413_commented
                                                    // marginBottom: '2px',
                                                }}>
                                                    {(item.DarsadTakhfif != null && item.DarsadTakhfif != 0) && (
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
                                                                fontSize: '0.65rem',
                                                                textDecoration: "line-through",
                                                                color: '#888',
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
                                                    }}>
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

                                                    <div
                                                        style={{
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
                                                        }} >

                                                        {(item.DarsadTakhfif != null && item.DarsadTakhfif != 0) && (
                                                            <div
                                                                // id={`darsadTakhfifInsabad-${item.IdKala}`}
                                                                // className="darsadTakhfifInsabad rounded-pill"
                                                                style={{
                                                                    // backgroundColor: "#ff3151",  ////zare_nk_050413_commented
                                                                    backgroundColor: "#ff5a00",   ////zare_nk_050413_added
                                                                    // width: 39,  ////zare_nk_050413_commented
                                                                    // height: 20,  ////zare_nk_050413_commented
                                                                    width: '1.5rem',   ////zare_nk_050413_added
                                                                    height: '1.25rem',   ////zare_nk_050413_added

                                                                    // flex: "0 0 auto",
                                                                    display: 'flex',
                                                                    flexDirection: "row",
                                                                    justifyContent: "center",
                                                                    alignItems: 'center',
                                                                    flexGrow: 0,
                                                                    flexShrink: 0,
                                                                    flexBasis: 'auto',
                                                                    marginLeft: 5,
                                                                    // borderRadius: 100,    ////zare_nk_050413_commented
                                                                    borderRadius: '.25rem',  ////zare_nk_050413_added                                             
                                                                }}>
                                                                <span
                                                                    // className="forDiscount"
                                                                    style={{
                                                                        //   fontSize: 12,
                                                                        fontSize: '.625rem',
                                                                        color: "white",
                                                                        opacity: 1,
                                                                        fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                                        // borderWidth: 2,
                                                                        // borderStyle: 'dashed',
                                                                        // borderColor: 'black',
                                                                    }}
                                                                >
                                                                    {`${item.DarsadTakhfif}%`}
                                                                </span>
                                                            </div>
                                                        )}
                                                        <div
                                                            style={{
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
                                                            }}
                                                        >
                                                            <span
                                                                //  className="mablagh" 
                                                                style={{
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
                                                                }}
                                                            >تومان</span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div style={{
                                                display: 'flex',
                                                paddingBottom: '.375rem',
                                                paddingTop: '.375rem',
                                                gap: '.5rem', justifyContent: 'space-between', alignItems: 'center',
                                                width: '100%',
                                            }}>
                                                <span style={{ color: '#63676e', fontSize: '.875rem', lineHeight: '1.25rem', }}>بدون افزودنی</span>
                                                <span style={{ color: '#63676e', fontSize: '.875rem', lineHeight: '1.25rem', }}>رایگان</span>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div id={`btnCont-${titrItem.IdSabadKharidTitr}`} className="btnCont" style={{
                                        display: 'flex', width: '100%', flexFlow: 'row', flexWrap: 'wrap', //marginBottom: '2rem',
                                        columnGap: '1rem', backgroundColor: 'inherit',
                                        marginTop: '.75rem',
                                    }} >
                                        <div style={{ display: 'flex', flex: '1 1 0px' }}>
                                            <button id={`btnDeletSabad-${titrItem.IdSabadKharidTitr}`}
                                                // onClick={(e) => {
                                                //   RemoveAddress(e);
                                                //   setIsEpmtyShowAddRemAddress(true);
                                                // }}
                                                // onClick={RemoveAddress} 
                                                style={{
                                                    borderRadius: '0.5rem',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    paddingBottom: '.75rem',
                                                    paddingTop: '.75rem',
                                                    paddingLeft: '1rem',
                                                    paddingRight: '1rem',
                                                    backgroundColor: 'white',
                                                    color: '#ff5900',
                                                    border: '1px solid #e0e3e5',
                                                    fontSize: '.875rem',
                                                    width: '100%',
                                                    height: '3rem',
                                                    cursor: 'pointer',
                                                }}>
                                                حذف سبد
                                            </button>
                                        </div>
                                        <div style={{ display: 'flex', flex: '1 1 0px' }}>
                                            <button id={`btnTakmilKharid-${titrItem.IdSabadKharidTitr}`}
                                                // onClick={(e) => {
                                                //   goToEdditAddressMap(e);
                                                // }}
                                                onClick={(e) => {
                                                  goToCartDetails(titrItem.IdShobeh);
                                                }}
                                                ///vendor/271r73/cart-details
                                                style={{
                                                    borderRadius: '0.5rem',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    paddingBottom: '.75rem',
                                                    paddingTop: '.75rem',
                                                    paddingLeft: '1rem',
                                                    paddingRight: '1rem',
                                                    backgroundColor: '#1b1c1d',
                                                    color: 'white',
                                                    border: '1px solid #e0e3e5',
                                                    fontSize: '.875rem',
                                                    width: '100%',
                                                    height: '3rem',
                                                    cursor: 'pointer',
                                                }}>
                                                تکمیل خرید
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}


                        {/* <div id="sabdTitrAndRows-1" style={{
                            display: 'flex', flexFlow: 'column', width: '100%', padding: '1rem',
                        }}>
                            <div id="sabdTitrCont" style={{
                                display: 'flex', gap: '.5rem', justifyContent: 'flex-start', alignItems: 'center', width: '100%',
                            }}>
                                <div style={{
                                    borderRadius: '.5rem', flexShrink: 0, width: '40px', minWidth: '40px',
                                    height: '40px', position: 'relative',
                                }}>
                                    <img
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '.5rem',
                                            zIndex: '1',
                                        }}
                                        // src={`https://img.tochikala.com/Product/${responsedListFromApiSelectKalaShobeh[0].IdKala}.webp`} />
                                        src={`/images/movaghat/shoppingBasket/pizza-farhang-tag.jpg`} />
                                </div>

                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    width: '100%',
                                    // gap: '.5rem',  ////zare_nk_050413_commented
                                }}>
                                    <div style={{
                                        display: 'flex', justifyContent: "space-between", width: '100%',
                                    }}>
                                        <div style={{
                                            fontSize: '.875rem',
                                            color: '#313335',

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
                                            // display: 'flex', ////zare_nk_050413_commented 
                                            display: 'none',    ////zare_nk_050413_added 
                                            flexFlow: 'row', gap: '0.25rem', alignItems: 'center',
                                        }}>
                                            <p style={{
                                                color: '#000000',
                                                // fontSize: '1rem',  ////zare_nk_050407_commented(ghalebe fonte man bozorge)
                                                fontSize: '0.875rem',  ////zare_nk_050407_added(ghalebe fonte man bozorge)

                                                margin: '0px',

                                            }}>4.1</p>
                                            <img
                                                src="/images/movaghat/SwiperTapBests/star/orange-star.svg"
                                                alt="علاقه مندی"
                                                style={{ width: '12px', height: '12px', }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{
                                        fontSize: '.875rem',
                                        color: '#a5abb1',

                                        // این بخش برای سه‌نقطه و محدودیت ۲ خط
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',

                                        // این بخش برای تثبیت ارتفاع روی ۴۰ پیکسل 
                                        lineHeight: '1.25rem',
                                        // height: '2.5rem',
                                        height: '2.5rem',

                                        minHeight: '2.5rem',  // minHeight: '2.5rem', // اجبار به کمتر نشدن
                                        maxHeight: '2.5rem',  // maxHeight: '2.5rem', // اجبار به بیشتر نشدن
                                        boxSizing: 'border-box', // برای اینکه بُردر (border) به ارتفاع اضافه نشود

                                        textAlign: 'start',
                                    }}>
                                        استان مازندران-ساری، دخانیات، شهید عباسی، شهید کنعانی، بین شهید عبدی و گلها
                                    </div>
                                </div>
                            </div>

                            <div id="sabdRowsCont" style={{
                                display: 'flex', flexFlow: 'column', width: '100%', //border: '2px dashed red', 
                            }}>
                                <div id="sabdRows" style={{
                                    display: 'flex', flexFlow: 'column', width: '100%',
                                    //border: '2px dashed blue',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        paddingBottom: '.75rem',
                                        paddingTop: '.75rem',
                                        gap: '.5rem', justifyContent: 'space-between', alignItems: 'center',
                                        width: '100%',  ////zare_nk_050413_commented
                                        //  height: '100px',  ////zare_nk_050413_commented
                                    }}>
                                        <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', gap: '.5rem' }}>
                                            <div style={{
                                                borderRadius: '.5rem', flexShrink: 0, width: '40px', minWidth: '40px',
                                                height: '40px', position: 'relative',
                                            }}>
                                                <img
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        borderRadius: '.5rem',
                                                        zIndex: '1',
                                                    }}
                                                    // src={`https://img.tochikala.com/Product/${responsedListFromApiSelectKalaShobeh[0].IdKala}.webp`} />
                                                    src={`/images/movaghat/shoppingBasket/g1Img.jpg`} />
                                            </div>
                                            <div style={{
                                                fontSize: '.875rem',
                                                color: '#313335',

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
                                                پیتزا دهه 60 آمریکایی یک نفره
                                            </div>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            flexFlow: 'column',
                                            // width: '100%',  ////zare_nk_050413_commented
                                            // marginBottom: '2px',
                                        }}>
                                            {(item.DarsadTakhfif != null && item.DarsadTakhfif != 0) && ( 
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
                                                        fontSize: '0.65rem',
                                                        textDecoration: "line-through",
                                                        color: '#888',
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
                                                }}>
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

                                            <div
                                                style={{
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
                                                }} >

                                                {(item.DarsadTakhfif != null && item.DarsadTakhfif != 0) && ( 
                                                    <div
                                                        // id={`darsadTakhfifInsabad-${item.IdKala}`}
                                                        // className="darsadTakhfifInsabad rounded-pill"
                                                        style={{
                                                            // backgroundColor: "#ff3151",  ////zare_nk_050413_commented
                                                            backgroundColor: "#ff5a00",   ////zare_nk_050413_added
                                                            // width: 39,  ////zare_nk_050413_commented
                                                            // height: 20,  ////zare_nk_050413_commented
                                                            width: '1.5rem',   ////zare_nk_050413_added
                                                            height: '1.25rem',   ////zare_nk_050413_added

                                                            // flex: "0 0 auto",
                                                            display: 'flex',
                                                            flexDirection: "row",
                                                            justifyContent: "center",
                                                            alignItems: 'center',
                                                            flexGrow: 0,
                                                            flexShrink: 0,
                                                            flexBasis: 'auto',
                                                            marginLeft: 5,
                                                            // borderRadius: 100,    ////zare_nk_050413_commented
                                                            borderRadius: '.25rem',  ////zare_nk_050413_added                                             
                                                        }}>
                                                        <span
                                                            // className="forDiscount"
                                                            style={{
                                                                //   fontSize: 12,
                                                                fontSize: '.625rem',
                                                                color: "white",
                                                                opacity: 1,
                                                                fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                                // borderWidth: 2,
                                                                // borderStyle: 'dashed',
                                                                // borderColor: 'black',
                                                            }}
                                                        >
                                                            {`${item.DarsadTakhfif}%`} 
                                                        </span>
                                                    </div>
                                                )}
                                                <div
                                                    style={{
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
                                                    }}
                                                >
                                                    <span
                                                        //  className="mablagh" 
                                                        style={{
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
                                                        }}
                                                    >تومان</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        paddingBottom: '.375rem',
                                        paddingTop: '.375rem',
                                        gap: '.5rem', justifyContent: 'space-between', alignItems: 'center',
                                        width: '100%',
                                    }}>
                                        <span style={{ color: '#63676e', fontSize: '.875rem', lineHeight: '1.25rem', }}>بدون افزودنی</span>
                                        <span style={{ color: '#63676e', fontSize: '.875rem', lineHeight: '1.25rem', }}>رایگان</span>
                                    </div>

                                </div>
                                <div id="sabdRows" style={{
                                    display: 'flex', flexFlow: 'column', width: '100%',
                                    // border: '2px dashed blue',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        paddingBottom: '.75rem',
                                        paddingTop: '.75rem',
                                        gap: '.5rem', justifyContent: 'space-between', alignItems: 'center',
                                        width: '100%',
                                    }}>
                                        <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', gap: '.5rem' }}>
                                            <div style={{
                                                borderRadius: '.5rem', flexShrink: 0, width: '40px', minWidth: '40px',
                                                height: '40px', position: 'relative',
                                            }}>
                                                <img
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        borderRadius: '.5rem',
                                                        zIndex: '1',
                                                    }}
                                                    // src={`https://img.tochikala.com/Product/${responsedListFromApiSelectKalaShobeh[0].IdKala}.webp`} />
                                                    src={`/images/movaghat/shoppingBasket/g1Img.jpg`} />
                                            </div>
                                            <div style={{
                                                fontSize: '.875rem',
                                                color: '#313335',

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
                                                پیتزا دهه 60 آمریکایی خانواده
                                            </div>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            flexFlow: 'column',
                                            // width: '100%',  ////zare_nk_050413_commented
                                            // marginBottom: '2px',
                                        }}>
                                            {(item.DarsadTakhfif != null && item.DarsadTakhfif != 0) && ( 
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
                                                        fontSize: '0.65rem',
                                                        textDecoration: "line-through",
                                                        color: '#888',
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
                                                }}>
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

                                            <div
                                                style={{
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
                                                }} >

                                                {(item.DarsadTakhfif != null && item.DarsadTakhfif != 0) && ( 
                                                    <div
                                                        // id={`darsadTakhfifInsabad-${item.IdKala}`}
                                                        // className="darsadTakhfifInsabad rounded-pill"
                                                        style={{
                                                            // backgroundColor: "#ff3151",  ////zare_nk_050413_commented
                                                            backgroundColor: "#ff5a00",   ////zare_nk_050413_added
                                                            // width: 39,  ////zare_nk_050413_commented
                                                            // height: 20,  ////zare_nk_050413_commented
                                                            width: '1.5rem',   ////zare_nk_050413_added
                                                            height: '1.25rem',   ////zare_nk_050413_added

                                                            // flex: "0 0 auto",
                                                            display: 'flex',
                                                            flexDirection: "row",
                                                            justifyContent: "center",
                                                            alignItems: 'center',
                                                            flexGrow: 0,
                                                            flexShrink: 0,
                                                            flexBasis: 'auto',
                                                            marginLeft: 5,
                                                            // borderRadius: 100,    ////zare_nk_050413_commented
                                                            borderRadius: '.25rem',  ////zare_nk_050413_added                                             
                                                        }}>
                                                        <span
                                                            // className="forDiscount"
                                                            style={{
                                                                //   fontSize: 12,
                                                                fontSize: '.625rem',
                                                                color: "white",
                                                                opacity: 1,
                                                                fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                                // borderWidth: 2,
                                                                // borderStyle: 'dashed',
                                                                // borderColor: 'black',
                                                            }}
                                                        >
                                                            {`${item.DarsadTakhfif}%`} 
                                                        </span>
                                                    </div>
                                                )}
                                                <div
                                                    style={{
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
                                                    }}
                                                >
                                                    <span
                                                        //  className="mablagh" 
                                                        style={{
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
                                                        }}
                                                    >تومان</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        paddingBottom: '.375rem',
                                        paddingTop: '.375rem',
                                        gap: '.5rem', justifyContent: 'space-between', alignItems: 'center',
                                        width: '100%',
                                    }}>
                                        <span style={{ color: '#63676e', fontSize: '.875rem', lineHeight: '1.25rem', }}>بدون افزودنی</span>
                                        <span style={{ color: '#63676e', fontSize: '.875rem', lineHeight: '1.25rem', }}>رایگان</span>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-cont" style={{
                                display: 'flex', width: '100%', flexFlow: 'row', flexWrap: 'wrap', //marginBottom: '2rem',
                                columnGap: '1rem', backgroundColor: 'inherit',
                                marginTop: '.75rem',
                            }} >
                                <div style={{ display: 'flex', flex: '1 1 0px' }}>
                                    <button
                                        // onClick={(e) => {
                                        //   RemoveAddress(e);
                                        //   setIsEpmtyShowAddRemAddress(true);
                                        // }}
                                        // onClick={RemoveAddress} 
                                        style={{
                                            borderRadius: '0.5rem',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            paddingBottom: '.75rem',
                                            paddingTop: '.75rem',
                                            paddingLeft: '1rem',
                                            paddingRight: '1rem',
                                            backgroundColor: 'white',
                                            color: '#ff5900',
                                            border: '1px solid #e0e3e5',
                                            fontSize: '.875rem',
                                            width: '100%',
                                            height: '3rem',
                                            cursor: 'pointer',
                                        }}>
                                        حذف سبد
                                    </button>
                                </div>
                                <div style={{ display: 'flex', flex: '1 1 0px' }}>
                                    <button
                                        // onClick={(e) => {
                                        //   goToEdditAddressMap(e);
                                        // }}
                                        style={{
                                            borderRadius: '0.5rem',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            paddingBottom: '.75rem',
                                            paddingTop: '.75rem',
                                            paddingLeft: '1rem',
                                            paddingRight: '1rem',
                                            backgroundColor: '#1b1c1d',
                                            color: 'white',
                                            border: '1px solid #e0e3e5',
                                            fontSize: '.875rem',
                                            width: '100%',
                                            height: '3rem',
                                            cursor: 'pointer',
                                        }}>
                                        تکمیل خرید
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div id="sabdTitrAndRows-2" style={{
                            display: 'flex', flexFlow: 'column', width: '100%', padding: '1rem',
                        }}>
                            <div id="sabdTitrCont" style={{
                                display: 'flex', gap: '.5rem', justifyContent: 'flex-start', alignItems: 'center', width: '100%',
                            }}>
                                <div style={{
                                    borderRadius: '.5rem', flexShrink: 0, width: '40px', minWidth: '40px',
                                    height: '40px', position: 'relative',
                                }}>
                                    <img
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '.5rem',
                                            zIndex: '1',
                                        }}
                                        // src={`https://img.tochikala.com/Product/${responsedListFromApiSelectKalaShobeh[0].IdKala}.webp`} />
                                        src={`/images/movaghat/shoppingBasket/kababkhaneh-daei-tag.jpg`} />
                                </div>

                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    width: '100%',
                                    // gap: '.5rem',  ////zare_nk_050413_commented
                                }}>
                                    <div style={{
                                        display: 'flex', justifyContent: "space-between", width: '100%',
                                    }}>
                                        <div style={{
                                            fontSize: '.875rem',
                                            color: '#313335',

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
                                            کبابخانه دایی
                                        </div>

                                        <div style={{
                                            // display: 'flex', ////zare_nk_050413_commented 
                                            display: 'none',    ////zare_nk_050413_added 
                                            flexFlow: 'row', gap: '0.25rem', alignItems: 'center',
                                        }}>
                                            <p style={{
                                                color: '#000000',
                                                // fontSize: '1rem',  ////zare_nk_050407_commented(ghalebe fonte man bozorge)
                                                fontSize: '0.875rem',  ////zare_nk_050407_added(ghalebe fonte man bozorge)

                                                margin: '0px',

                                            }}>4.5</p>
                                            <img
                                                src="/images/movaghat/SwiperTapBests/star/orange-star.svg"
                                                alt="علاقه مندی"
                                                style={{ width: '12px', height: '12px', }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{
                                        fontSize: '.875rem',
                                        color: '#a5abb1',

                                        // این بخش برای سه‌نقطه و محدودیت ۲ خط
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',

                                        // این بخش برای تثبیت ارتفاع روی ۴۰ پیکسل 
                                        lineHeight: '1.25rem',
                                        // height: '2.5rem',
                                        height: '2.5rem',

                                        minHeight: '2.5rem',  // minHeight: '2.5rem', // اجبار به کمتر نشدن
                                        maxHeight: '2.5rem',  // maxHeight: '2.5rem', // اجبار به بیشتر نشدن
                                        boxSizing: 'border-box', // برای اینکه بُردر (border) به ارتفاع اضافه نشود

                                        textAlign: 'start',
                                    }}>
                                        استان مازندران-ساری، دخانیات، شهید عباسی، شهید کنعانی، بین شهید عبدی و گلها
                                    </div>
                                </div>
                            </div>

                            <div id="sabdRowsCont" style={{
                                display: 'flex', flexFlow: 'column', width: '100%', //border: '2px dashed red', 
                            }}>
                                <div id="sabdRows" style={{
                                    display: 'flex', flexFlow: 'column', width: '100%',
                                    //  border: '2px dashed blue',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        paddingBottom: '.75rem',
                                        paddingTop: '.75rem',
                                        gap: '.5rem', justifyContent: 'space-between', alignItems: 'center',
                                        width: '100%',  ////zare_nk_050413_commented
                                        //  height: '100px',  ////zare_nk_050413_commented
                                    }}>
                                        <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', gap: '.5rem' }}>
                                            <div style={{
                                                borderRadius: '.5rem', flexShrink: 0, width: '40px', minWidth: '40px',
                                                height: '40px', position: 'relative',
                                            }}>
                                                <img
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        borderRadius: '.5rem',
                                                        zIndex: '1',
                                                    }}
                                                    // src={`https://img.tochikala.com/Product/${responsedListFromApiSelectKalaShobeh[0].IdKala}.webp`} />
                                                    src={`/images/movaghat/shoppingBasket/koobideh-momtaz.jpg`} />
                                            </div>
                                            <div style={{
                                                fontSize: '.875rem',
                                                color: '#313335',

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
                                                چلوکباب کوبیده ممتاز
                                            </div>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            flexFlow: 'column',
                                            // width: '100%',  ////zare_nk_050413_commented
                                            // marginBottom: '2px',
                                        }}>
                                            {(item.DarsadTakhfif != null && item.DarsadTakhfif != 0) && ( 
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
                                                        fontSize: '0.65rem',
                                                        textDecoration: "line-through",
                                                        color: '#888',
                                                        fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                        lineHeight: '10px',
                                                    }}> 
                                                        {'890000'.toLocaleString()}
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
                                                }}>
                                                    <span style={{
                                                        // fontSize: 11,
                                                        fontSize: '0.65rem',
                                                        // opacity: 0.7,  
                                                        textDecorationLine: "line-through",
                                                        color: '#888',  ////zare_nk_050316_added
                                                        fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                        lineHeight: '10px',
                                                    }}> 
                                                        {'890000'.toLocaleString()}
                                                    </span>
                                                </div>
                                            )}

                                            <div
                                                style={{
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
                                                }} >

                                                {(item.DarsadTakhfif != null && item.DarsadTakhfif != 0) && (                                              
                                                    <div
                                                        // id={`darsadTakhfifInsabad-${item.IdKala}`}
                                                        // className="darsadTakhfifInsabad rounded-pill"
                                                        style={{
                                                            // backgroundColor: "#ff3151",  ////zare_nk_050413_commented
                                                            backgroundColor: "#ff5a00",   ////zare_nk_050413_added
                                                            // width: 39,  ////zare_nk_050413_commented
                                                            // height: 20,  ////zare_nk_050413_commented
                                                            width: '1.5rem',   ////zare_nk_050413_added
                                                            height: '1.25rem',   ////zare_nk_050413_added

                                                            // flex: "0 0 auto",
                                                            display: 'flex',
                                                            flexDirection: "row",
                                                            justifyContent: "center",
                                                            alignItems: 'center',
                                                            flexGrow: 0,
                                                            flexShrink: 0,
                                                            flexBasis: 'auto',
                                                            marginLeft: 5,
                                                            // borderRadius: 100,    ////zare_nk_050413_commented
                                                            borderRadius: '.25rem',  ////zare_nk_050413_added                                             
                                                        }}>
                                                        <span
                                                            // className="forDiscount"
                                                            style={{
                                                                //   fontSize: 12,
                                                                fontSize: '.625rem',
                                                                color: "white",
                                                                opacity: 1,
                                                                fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                                // borderWidth: 2,
                                                                // borderStyle: 'dashed',
                                                                // borderColor: 'black',
                                                            }}
                                                        > 
                                                            {`30%`}
                                                        </span>
                                                    </div>
                                                )}
                                                <div
                                                    style={{
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
                                                    }}
                                                >
                                                    <span
                                                        //  className="mablagh" 
                                                        style={{
                                                            // fontSize: 13,
                                                            fontSize: '0.75rem',
                                                            marginLeft: 5,
                                                            fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                            color: '#3d3d3d',   ////zare_nk_050316_added
                                                        }}> 
                                                        {'623000'.toLocaleString()}
                                                    </span>
                                                    <span
                                                        style={{
                                                            //  fontSize: 12,
                                                            fontSize: '0.70rem',
                                                            fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#6d6d6d',
                                                        }}
                                                    >تومان</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        paddingBottom: '.375rem',
                                        paddingTop: '.375rem',
                                        gap: '.5rem', justifyContent: 'space-between', alignItems: 'center',
                                        width: '100%',
                                    }}>
                                        <span style={{ color: '#63676e', fontSize: '.875rem', lineHeight: '1.25rem', }}>بدون افزودنی</span>
                                        <span style={{ color: '#63676e', fontSize: '.875rem', lineHeight: '1.25rem', }}>رایگان</span>
                                    </div>

                                </div>
                                <div id="sabdRows" style={{
                                    display: 'flex', flexFlow: 'column', width: '100%',
                                    //  border: '2px dashed blue',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        paddingBottom: '.75rem',
                                        paddingTop: '.75rem',
                                        gap: '.5rem', justifyContent: 'space-between', alignItems: 'center',
                                        width: '100%',
                                    }}>
                                        <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', gap: '.5rem' }}>
                                            <div style={{
                                                borderRadius: '.5rem', flexShrink: 0, width: '40px', minWidth: '40px',
                                                height: '40px', position: 'relative',
                                            }}>
                                                <img
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        borderRadius: '.5rem',
                                                        zIndex: '1',
                                                    }}
                                                    // src={`https://img.tochikala.com/Product/${responsedListFromApiSelectKalaShobeh[0].IdKala}.webp`} />
                                                    src={`/images/movaghat/shoppingBasket/koobideh-momtaz.jpg`} />
                                            </div>
                                            <div style={{
                                                fontSize: '.875rem',
                                                color: '#313335',

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
                                                چلوکباب کوبیده ممتاز
                                            </div>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            flexFlow: 'column',
                                            // width: '100%',  ////zare_nk_050413_commented
                                            // marginBottom: '2px',
                                        }}>
                                            {(item.DarsadTakhfif != null && item.DarsadTakhfif != 0) && ( 
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
                                                        fontSize: '0.65rem',
                                                        textDecoration: "line-through",
                                                        color: '#888',
                                                        fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                        lineHeight: '10px',
                                                    }}> 
                                                        {'890000'.toLocaleString()}
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
                                                }}>
                                                    <span style={{
                                                        // fontSize: 11,
                                                        fontSize: '0.65rem',
                                                        // opacity: 0.7,  
                                                        textDecorationLine: "line-through",
                                                        color: '#888',  ////zare_nk_050316_added
                                                        fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                        lineHeight: '10px',
                                                    }}> 
                                                        {'55000'.toLocaleString()}
                                                    </span>
                                                </div>
                                            )}

                                            <div
                                                style={{
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
                                                }} > 
                                                {(item.DarsadTakhfif != null && item.DarsadTakhfif != 0) && ( 
                                                    <div
                                                        // id={`darsadTakhfifInsabad-${item.IdKala}`}
                                                        // className="darsadTakhfifInsabad rounded-pill"
                                                        style={{
                                                            // backgroundColor: "#ff3151",  ////zare_nk_050413_commented
                                                            backgroundColor: "#ff5a00",   ////zare_nk_050413_added
                                                            // width: 39,  ////zare_nk_050413_commented
                                                            // height: 20,  ////zare_nk_050413_commented
                                                            width: '1.5rem',   ////zare_nk_050413_added
                                                            height: '1.25rem',   ////zare_nk_050413_added

                                                            // flex: "0 0 auto",
                                                            display: 'flex',
                                                            flexDirection: "row",
                                                            justifyContent: "center",
                                                            alignItems: 'center',
                                                            flexGrow: 0,
                                                            flexShrink: 0,
                                                            flexBasis: 'auto',
                                                            marginLeft: 5,
                                                            // borderRadius: 100,    ////zare_nk_050413_commented
                                                            borderRadius: '.25rem',  ////zare_nk_050413_added                                             
                                                        }}>
                                                        <span
                                                            // className="forDiscount"
                                                            style={{
                                                                //   fontSize: 12,
                                                                fontSize: '.625rem',
                                                                color: "white",
                                                                opacity: 1,
                                                                fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                                // borderWidth: 2,
                                                                // borderStyle: 'dashed',
                                                                // borderColor: 'black',
                                                            }}
                                                        > 
                                                            {`10%`}
                                                        </span>
                                                    </div>
                                                )}
                                                <div
                                                    style={{
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
                                                    }}
                                                >
                                                    <span
                                                        //  className="mablagh" 
                                                        style={{
                                                            // fontSize: 13,
                                                            fontSize: '0.75rem',
                                                            marginLeft: 5,
                                                            fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                            color: '#3d3d3d',   ////zare_nk_050316_added
                                                        }}> 
                                                        {'490000'.toLocaleString()}
                                                    </span>
                                                    <span
                                                        style={{
                                                            //  fontSize: 12,
                                                            fontSize: '0.70rem',
                                                            fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#6d6d6d',
                                                        }}
                                                    >تومان</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        paddingBottom: '.375rem',
                                        paddingTop: '.375rem',
                                        gap: '.5rem', justifyContent: 'space-between', alignItems: 'center',
                                        width: '100%',
                                    }}>
                                        <span style={{ color: '#63676e', fontSize: '.875rem', lineHeight: '1.25rem', }}>بدون افزودنی</span>
                                        <span style={{ color: '#63676e', fontSize: '.875rem', lineHeight: '1.25rem', }}>رایگان</span>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-cont" style={{
                                display: 'flex', width: '100%', flexFlow: 'row', flexWrap: 'wrap', //marginBottom: '2rem',
                                columnGap: '1rem', backgroundColor: 'inherit',
                                marginTop: '.75rem',
                            }} >
                                <div style={{ display: 'flex', flex: '1 1 0px' }}>
                                    <button
                                        // onClick={(e) => {
                                        //   RemoveAddress(e);
                                        //   setIsEpmtyShowAddRemAddress(true);
                                        // }}
                                        // onClick={RemoveAddress} 
                                        style={{
                                            borderRadius: '0.5rem',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            paddingBottom: '.75rem',
                                            paddingTop: '.75rem',
                                            paddingLeft: '1rem',
                                            paddingRight: '1rem',
                                            backgroundColor: 'white',
                                            color: '#ff5900',
                                            border: '1px solid #e0e3e5',
                                            fontSize: '.875rem',
                                            width: '100%',
                                            height: '3rem',
                                            cursor: 'pointer',
                                        }}>
                                        حذف سبد
                                    </button>
                                </div>
                                <div style={{ display: 'flex', flex: '1 1 0px' }}>
                                    <button
                                        // onClick={(e) => {
                                        //   goToEdditAddressMap(e);
                                        // }}
                                        style={{
                                            borderRadius: '0.5rem',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            paddingBottom: '.75rem',
                                            paddingTop: '.75rem',
                                            paddingLeft: '1rem',
                                            paddingRight: '1rem',
                                            backgroundColor: '#1b1c1d',
                                            color: 'white',
                                            border: '1px solid #e0e3e5',
                                            fontSize: '.875rem',
                                            width: '100%',
                                            height: '3rem',
                                            cursor: 'pointer',
                                        }}>
                                        تکمیل خرید
                                    </button>
                                </div>
                            </div>
                        </div> */}

                    </div>
                </main>
                <footer></footer>

                <div className="tabIndexOne-in-LayoutWrapper" tabIndex={1}>
                </div>
            </div>
        </currentAddressContext.Provider>
    );
}
