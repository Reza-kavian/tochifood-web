// ////zare_nk_050423_okk(2)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, memo, RefObject, ReactNode, ChangeEvent, MouseEvent } from "react";
import { useRouter, useSearchParams, redirect, useParams } from "next/navigation";

import globalsStyles from "@/styles/components/globals.module.css";

import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import SwiperInVendorScrollTabComp from '../../../../components/SwiperInVendorScrollTabComp';
import GetScrollsSecInVendor from '../../../../components/GetScrollsSecInVendor';
import SwiperBordBordInVendorComp from '../../../../components/SwiperBordBordInVendorComp';

import { NextJsApiUrl } from "../../../../constants/Urls";  ////zare_nk_050407_added

import AdressListComponent from '../../../../components/AdressListComponent';  ////zare_nk_050421_added

import Link from "next/link";
import { json } from "stream/consumers";

import AddRemBtnsAndCountPackege from '../../../../components/addRemBtnsAndCountPackege';

import Switch from "@mui/material/Switch";

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
    bishAzMaxTedadYaMojoodi: number,  ////zare_nk_050416_added 
    fromShowDetails: boolean;
    ForCartContentsDesignType: number,  ////zare_nk_050416_added
    idTag: string;
};

type addRemParamType = {
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
    bishAzMaxTedadYaMojoodi: number | null;
    fromShowDetails: boolean;
    // event?: MouseEvent<HTMLAnchorElement> | null | undefined;  //zare_nk_041127_commented
    event?: null;  //zare_nk_041127_added
};

////zare_nk_050405_nokteh_st(rahe1- baraye serverComponent)
// type Props2 = {
//     params: Promise<{
//         vendorId: string;
//     }>;
// };
// export default async function Checkout({ params }: Props2) { 
// // const { vendorId } = await params;
////zare_nk_050405_nokteh_end(rahe1- baraye serverComponent)
////zare_nk_050405_nokteh_st(rahe2- baraye serverComponent)
export default function Checkout() {
    const { vendorId } = useParams();
    const params = useSearchParams();   ////zare_nk_050416_added
    const idTitr = params.get("idTitr") || "Unknown";   ////zare_nk_050416_added

    ////zare_nk_050405_nokteh_end(rahe2- baraye serverComponent)
    console.log('050416-Checkout rendered!!-vendorId: ' + vendorId + '-idTitr: ' + idTitr);   ////zare_nk_050329_added
    // ////zare_nk_050404_added_st
    const [error, setError] = useState<string | null>(null);
    const [errorInCheckout, setErrorInCheckout] = useState<string | null>(null);

    const [isEpmtyAdressList, setIsEpmtyAdressList] = useState<string | null>(null);
    const [isEpmtyShowAddRemAddress, setIsEpmtyShowAddRemAddress] = useState(true);

    const refForBox = useRef<HTMLDivElement | null>(null);

    const router = useRouter();

    const [responsedListFromApiSelectAddressList, SetResponsedListFromApiSelectAddressList] = useState<responsedListFromApiSelectAddressListType[] | null>(null);

    const [mycurrentAddressState, setMycurrentAddressState] = useState<responsedListFromApiSelectAddressListType | null>(null);

    const [loadSabadTitr, setLoadSabadTitr] = useState<boolean>(true);
    const [sabadTitr, setSabadTitr] = useState<SabadTitrType[] | null>(null);
    const [jamKol, setJamKol] = useState<number | null>(null);
    const [jamKolTakhfif, setJamKolTakhfif] = useState<number | null>(null);
    const [jamKolNahaei, setJamKolNahaei] = useState<number | null>(null);

    ////zare_nk_050421_commented_st
    // const [sabadRows, setSabadRows] = useState<SabadRowType[]>([]);
    // console.log('ya ali-sabadRows: ' + JSON.stringify(sabadRows));
    // const refForfather = useRef<string | null>(null);  
    ////zare_nk_050421_commented_end

    const [isOpenedMymodalForWarning, setIsOpenedMymodalForWarning] = useState(false);
    const [warningTextInMymodalForWarning, setWarningTextInMymodalForWarning] = useState('');

    useEffect(() => {
        const tempAsync = async () => {
            const chosenAddress = getCookie("chosenAddress");
            var parsedChosenAddress: responsedListFromApiSelectAddressListType | null = chosenAddress ? JSON.parse(chosenAddress) : null;
            setMycurrentAddressState(parsedChosenAddress);

            const currentShobe = await getCookie("currentShobe");
            var parsedurrentShobe: responsedListFromApiSelectShobehAtrafUserType | null = currentShobe ? JSON.parse(currentShobe) : null;
            setCurrentShobeState(parsedurrentShobe);
        }
        tempAsync();

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
                        IdShobeh: vendorId,
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

        // async function getSabadSatrs() {
        //     const token = await getCookie("token");
        //     if (token == null) {
        //         ////zare_nk_041120_alan(estefadeh az dialog) 
        //         // const bootstrap = await getBootstrap();
        //         // const mymodalForWarning = new bootstrap.Modal(
        //         //     document.getElementById("mymodalForWarning")
        //         // );
        //         // mymodalForWarning.show();
        //         // const span = document.querySelector(
        //         //     "#mymodalForWarning .errorInMymodalForWarning"
        //         // );
        //         // if (span instanceof HTMLElement) {
        //         //     span.innerText = "لطفا ابتدا آنلاین شوید";
        //         // }
        //         alert("لطفا ابتدا آنلاین شوید");
        //         return;
        //     }
        //     // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented
        //     let ApiUrl = NextJsApiUrl; ////zare_nk_050407_added
        //     var urlSelectSabad = ApiUrl + "Api_SelectSabadKharidSatr";
        //     const response = await fetch(urlSelectSabad, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: "Bearer " + token,
        //         },
        //         body: JSON.stringify({
        //             IdShobe: vendorId,
        //             IdSabadKharidTitr: idTitr,  ////zare_nk_050416_added
        //         }),
        //     });
        //     const data = await response.json();
        //     if (response.ok) {
        //         var result = JSON.parse(data.data.list);
        //         if (data.status != 0) {
        //             ////zare_nk_041120_alan(estefadeh az dialog)
        //             console.log('data.errors[0] is: ' + data.errors[0]);
        //             // const bootstrap = await getBootstrap();
        //             // const mymodalForWarning = new bootstrap.Modal(
        //             //   document.getElementById("mymodalForWarning")
        //             // );
        //             // mymodalForWarning.show();
        //             // const span = document.querySelector(
        //             //   "#mymodalForWarning .errorInMymodalForWarning"
        //             // );
        //             // if (span instanceof HTMLElement) {
        //             //   span.innerText = data.errors[0];
        //             // }
        //         } else if (data.status == 0) {
        //             if (result.length == 0) {
        //                 console.log('satr nadarim');
        //                 return;
        //             }
        //             console.log('041120-result in Api_SelectSabadKharidSatr: ' + JSON.stringify(result));
        //             // setBisatr(false);
        //             // refForfather.current = "#sabadItemsContInSafhe";

        //             // ////zare_nk_041119_added_st_olgu_1(dorost ba return va akoolad va parantezbandi)
        //             // setSabadRows(() => {
        //             //   return (
        //             //     result.map((item: any) => {
        //             //       return ({
        //             //         tedadInSabadOrDet: item.Tedad,
        //             //         // بقیه فیلدها
        //             //       })
        //             //     })
        //             //   )
        //             // });
        //             // ////zare_nk_041119_added_end_olgu_1(dorost ba return va akoolad va parantezbandi)
        //             // ////zare_nk_041119_added_st_olgu_2(dorost ba return va akoolad va parantezbandi)
        //             // setSabadRows(
        //             //   result.map((item: any) => ({
        //             //     tedadInSabadOrDet: item.Tedad,
        //             //     // بقیه فیلدها اینجا
        //             //   }))
        //             // );
        //             // ////zare_nk_041119_added_end_olgu_2(dorost ba return va akoolad va parantezbandi)
        //             ////zare_nk_041119_added_st
        //             setSabadRows(() => {
        //                 return (
        //                     result.map((item: any) => {
        //                         var bishAzMaxTedadYaMojoodi = 0;
        //                         if (item.MaxTedad != null) {
        //                             if (item.MaxTedad <= item.Tedad) {
        //                                 bishAzMaxTedadYaMojoodi = 1;
        //                             }
        //                         }
        //                         else {
        //                             if (item.Mojoodi <= item.Tedad) {
        //                                 bishAzMaxTedadYaMojoodi = 1;
        //                             }
        //                         }

        //                         let ForCartContentsDesignTypeLet = 0

        //                         if (item.Tedad == 0) {
        //                             ForCartContentsDesignTypeLet = 0;
        //                         }
        //                         else if (item.Tedad > item.ZaribForoosh) {
        //                             ForCartContentsDesignTypeLet = 2;
        //                         }
        //                         else if (item.Tedad == item.ZaribForoosh) {
        //                             ForCartContentsDesignTypeLet = 1;
        //                         }
        //                         console.log()
        //                         return ({
        //                             IdSabadKharidSatr: item.IdSabadKharidSatr,
        //                             IdSabadKharidTitr: item.IdSabadKharidTitr,
        //                             tedadInSabadOrDet: item.Tedad,
        //                             ZaribForoosh: item.ZaribForoosh,
        //                             IdKala: item.IdKala,
        //                             NameKala: item.NameKala,
        //                             DarsadTakhfif: item.DarsadTakhfif,
        //                             NameBerand: item.NameBerand,
        //                             FeeForoosh: item.FeeForoosh,
        //                             FeeMasraf: item.FeeMasraf,
        //                             BarcodeKala: item.BarcodeKala,
        //                             Mojoodi: item.Mojoodi,
        //                             MaxTedad: item.MaxTedad,
        //                             MasrafSatr: item.MasrafSatr,
        //                             father: "#sabadItemsContInSafhe",
        //                             // refForfather: refForfather,
        //                             bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,  ////zare_nk_050416_added
        //                             fromShowDetails: false,
        //                             ForCartContentsDesignType: ForCartContentsDesignTypeLet,  ////zare_nk_050416_added
        //                             idTag: "ForCart-" + item.IdKala,
        //                         })
        //                     })
        //                 )
        //             });
        //         }
        //     } else {
        //         if (response.status == 401) {
        //             console.log("لطفا ابتدا آنلاین شوید");
        //             // const bootstrap = await getBootstrap();
        //             // const mymodalForWarning = new bootstrap.Modal(
        //             //   document.getElementById("mymodalForWarning")
        //             // );
        //             // mymodalForWarning.show();
        //             // const span = document.querySelector(
        //             //   "#mymodalForWarning .errorInMymodalForWarning"
        //             // );
        //             // if (span instanceof HTMLElement) {
        //             //   span.innerText = "لطفا ابتدا آنلاین شوید";
        //             // }
        //         }
        //     }
        // }
        // getSabadSatrs();
        ////zare_nk_050413_added_end
    }, []);

    type responsedListFromApiSelectShobehAtrafUserType = {
        IdShobe: number;
        NameSobe: string;
        KafKharid: number;
        Fasele: number;
        ZarfiatErsal: number;
        Keraye: number;
        NazdikTarinZamanErsal: string;
    };

    const [currentShobeState, setCurrentShobeState] = useState<responsedListFromApiSelectShobehAtrafUserType | null>(null);

    // ////zare_nk_050416_commented_st
    // // useEffect(() => {
    // //     const tempAsync = async () => {
    // //         const currentShobe = await getCookie("currentShobe");
    // //         var parsedurrentShobe: responsedListFromApiSelectShobehAtrafUserType | null = currentShobe ? JSON.parse(currentShobe) : null;
    // //         setCurrentShobeState(parsedurrentShobe);
    // //     }
    // //     tempAsync(); 
    // // }, []);
    // ////zare_nk_050416_commented_end 

    ////zare_nk_050405_added_st

    // const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // const [activeTab, setActiveTab] = useState<string | null>(null);

    // const scrollToSection = useCallback(
    //     (id: string) => {
    //         console.log('050405-scrollToSection called!!-id: ' + id);
    //         console.log('050405-scrollToSection called!!-sectionRefs.current[id] : ' + sectionRefs.current[id]);
    //         const section = sectionRefs.current[id];
    //         if (!section) return;

    //         section.scrollIntoView({
    //             behavior: "smooth",
    //             block: "start",
    //         });
    //     }
    //     , [activeTab]);

    // useEffect(() => {
    //     const HEADER_HEIGHT = 40;
    //     const handleScroll = () => {
    //         let currentSection = "";
    //         Object.values(sectionRefs.current).forEach((section) => {
    //             if (!section) return;

    //             const rect = section.getBoundingClientRect();  ////zare_nk_050405_nokteh(mogheiyate section ra nesbat be viewport dar har scroll midahad)

    //             console.log('050405-rect: ' + JSON.stringify(rect));
    //             ////050405-rect: {"x":612,"y":336,"width":446,"height":300,"top":336,"right":1058,"bottom":636,"left":612}

    //             if (rect.top <= HEADER_HEIGHT + 5) {  ////zare_nk_050405_nokteh(5 pixel ra baraye teloranse gozashtim)
    //                 console.log('050405-rect if bargharare-section.id: ' + section.id);
    //                 currentSection = section.id;
    //             }
    //         });

    //         if (currentSection !== "" && currentSection !== activeTab) {
    //             setActiveTab(currentSection);
    //         }
    //     };

    //     window.addEventListener("scroll", handleScroll);

    //     handleScroll();

    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    // }, [activeTab]);

    ////zare_nk_050416_added_st(baraye add va rem va ...)
    // async function addToCartInIndex(
    //     addRemParam: addRemParamType,
    // ) {
    //     console.log('041120-addToCartInIndex called!-addRemParam: ' + addRemParam.FeeForoosh);
    //     // console.log('041120-addToCartInIndex called!-addRemParam: ' + JSON.stringify(addRemParam)); //zare_nk_041120_commented(error mideh:    // console.log('041120-addToCartInIndex called!-addRemParam: ' + JSON.stringify(addRemParam)); //zare_nk_041120_commented_tahlilshe(error mideh:TypeError: Converting circular structure to JSON)
    //     ////zare_nk_050416_commented_st
    //     // if (addRemParam.event != null) {
    //     //   addRemParam.event.stopPropagation();
    //     //   addRemParam.event.preventDefault();
    //     // }
    //     ////zare_nk_050416_commented_end
    //     const token = getCookie("token");
    //     if (token == null) {
    //         setIsOpenedMymodalForWarning(true);
    //         setWarningTextInMymodalForWarning("لطفا ابتدا لاگین شوید");
    //         ////zare_nk_041129_commented_st
    //         //   const bootstrap = await getBootstrap();
    //         //   const mymodalForWarning = new bootstrap.Modal(
    //         //     document.getElementById("mymodalForWarning")
    //         //   );
    //         //   mymodalForWarning.show();
    //         //   const span = document.querySelector(
    //         //     "#mymodalForWarning .errorInMymodalForWarning"
    //         //   );
    //         //   if (span instanceof HTMLElement) {
    //         //     span.innerText = "لطفا ابتدا لاگین شوید";
    //         //   }
    //         ////zare_nk_041129_commented_end
    //         return;
    //     }
    //     //else {  ////zare_nk_050416_commented(dar sharte token == null return gozashtim dige else nemikhaim)
    //     try {
    //         console.log('041120-addToCartInIndex-else 1');
    //         var TedadOut = 0;
    //         var TedadOuttoAjax = 0;
    //         const zarib = parseFloat(String(addRemParam.ZaribForoosh ?? 0));
    //         TedadOut = addRemParam.tedadInSabadOrDet + zarib;
    //         TedadOuttoAjax = addRemParam.ZaribForoosh;
    //         // const token = getCookie("token");  ////zare_nk_050416_commented
    //         console.log('041120-addToCartInIndex-tedad: ' + addRemParam.tedadInSabadOrDet + '-zarib: ' + addRemParam.ZaribForoosh + '-TedadOut: ' + TedadOut);

    //         // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented 
    //         var urlInsertToSabad = NextJsApiUrl + "Api_AddRemoveSabadKharidSatr";
    //         const response = await fetch(urlInsertToSabad, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: "Bearer " + token,
    //             },
    //             body: JSON.stringify({
    //                 BarcodeKala: addRemParam.BarcodeKala,
    //                 Tedad: TedadOut,
    //                 IdKala: addRemParam.IdKala,
    //                 IdShobeh: vendorId,  ////zare_nk_050416_nokteh(meghdare dynamic bedam)
    //                 IdAddress: mycurrentAddressState?.IdAdress,  // 23990,  ////zare_nk_050416_nokteh(meghdare dynamic bedam)
    //             }),
    //         });
    //         const data = await response.json();
    //         if (response.ok) {
    //             console.log('041120-addToCartInIndex-else 5 IdKala response.ok-data: ' + JSON.stringify(data));
    //             // setAddOrRemChanged(addRemParam.BarcodeKala + "-" + TedadOut);  ////zare_nk_050416_commented
    //             var result = data;
    //             if (result.status != 0) {
    //                 setIsOpenedMymodalForWarning(true);
    //                 setWarningTextInMymodalForWarning(result.errors[0]);
    //                 // const bootstrap = await getBootstrap();
    //                 // const mymodalForWarning = new bootstrap.Modal(
    //                 //     document.getElementById("mymodalForWarning")
    //                 // );
    //                 // mymodalForWarning.show();
    //                 // const span = document.querySelector(
    //                 //     "#mymodalForWarning .modal-body span"
    //                 // );
    //                 // if (span instanceof HTMLElement) {
    //                 //     span.innerText = result.errors[0];
    //                 // }
    //             }
    //             else if (result.status == 0) {
    //                 let tittrInoInResult = JSON.parse(result.data.titr)[0];  ////zare_nk_050416_added
    //                 let satrInoInResult = JSON.parse(result.data.satr)[0];  //zare_nk_041124_added
    //                 let Tedad = satrInoInResult.Tedad;
    //                 console.log("zare_nk_050416-tittrInoInResult.IdSabadKharidSatr: " + tittrInoInResult.IdSabadKharidTitr +
    //                     "satrInoInResult.IdSabadKharidSatr: " + satrInoInResult.IdSabadKharidSatr
    //                 );
    //                 var bishAzMaxTedadYaMojoodi = 0;
    //                 if (addRemParam.MaxTedad != null) {
    //                     if (addRemParam.MaxTedad <= Tedad) {
    //                         bishAzMaxTedadYaMojoodi = 1;
    //                     }
    //                 } else {
    //                     if (addRemParam.Mojoodi <= Tedad) {
    //                         bishAzMaxTedadYaMojoodi = 1;
    //                     }
    //                 }

    //                 refForfather.current = addRemParam.father;

    //                 let ForCartContentsDesignTypeLet = 0

    //                 if (Tedad == 0) {
    //                     ForCartContentsDesignTypeLet = 0;
    //                 }
    //                 else if (Tedad > addRemParam.ZaribForoosh) {
    //                     ForCartContentsDesignTypeLet = 2;
    //                 }
    //                 else if (Tedad == addRemParam.ZaribForoosh) {
    //                     ForCartContentsDesignTypeLet = 1;
    //                 }
    //                 ////zare_nk_050416_commented_st(felan ke modale joziate kala nemikhaim dar in safheh)
    //                 // if (addRemParam.fromShowDetails) {
    //                 //     setForCartContInProdDetVal(() => {
    //                 //         const idTag = "ForCart-" + addRemParam.IdKala;
    //                 //         return {
    //                 //             tedadInSabadOrDet: Tedad,
    //                 //             ZaribForoosh: addRemParam.ZaribForoosh,
    //                 //             IdKala: addRemParam.IdKala,
    //                 //             NameKala: addRemParam.NameKala,
    //                 //             DarsadTakhfif: addRemParam.DarsadTakhfif,
    //                 //             NameBerand: addRemParam.NameBerand,
    //                 //             FeeForoosh: addRemParam.FeeForoosh,
    //                 //             FeeMasraf: addRemParam.FeeMasraf,
    //                 //             BarcodeKala: addRemParam.BarcodeKala,
    //                 //             Mojoodi: addRemParam.Mojoodi,
    //                 //             MaxTedad: addRemParam.MaxTedad,
    //                 //             father: "#DetailsInfoCont",
    //                 //             refForfather: refForfather,
    //                 //             bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
    //                 //             fromShowDetails: addRemParam.fromShowDetails,
    //                 //             ForCartContentsDesignType: ForCartContentsDesignTypeLet,
    //                 //             idTag: idTag,
    //                 //         };
    //                 //     });
    //                 // }
    //                 ////zare_nk_050416_commented_end(felan ke modale joziate kala nemikhaim dar in safheh)
    //                 ////zare_nk_050416_added_st(raveshe samte client ke jaigozine setAddOrRemChanged va useEffect(...[addOrRemChanged]) 
    //                 //// shod(ke dakhele useEffect(...[addOrRemChanged]) api sabadekharid ra mojadad seda mizadim) )
    //                 setSabadRows((curRows) => {
    //                     return curRows.map((curItem: any, index: number) => {
    //                         if (curItem.IdKala == addRemParam.IdKala) {
    //                             return (
    //                                 {
    //                                     ...curItem,   ////zare_nk_050322_added(ta age fieldi ra ja gozashtim barnameh az meghdare feli estefadeh koneh, vagarnah an field undefiend mishavad!(masalan 
    //                                     //// midoonim NameKala dar in setState tagheiri nemikoneh, niazi be meghdardehi mojadad nist va age inja dobareh meghdar nadim va az ...curItem ham estefadeh nakonim undegiend mideh ))
    //                                     IdSabadKharidSatr: satrInoInResult.IdSabadKharidSatr,
    //                                     IdSabadKharidTitr: tittrInoInResult.IdSabadKharidTitr,
    //                                     tedadInSabadOrDet: Tedad,
    //                                     ZaribForoosh: addRemParam.ZaribForoosh,
    //                                     IdKala: addRemParam.IdKala,
    //                                     NameKala: addRemParam.NameKala,
    //                                     DarsadTakhfif: addRemParam.DarsadTakhfif,
    //                                     NameBerand: addRemParam.NameBerand,
    //                                     FeeForoosh: addRemParam.FeeForoosh,
    //                                     FeeMasraf: addRemParam.FeeMasraf,
    //                                     BarcodeKala: addRemParam.BarcodeKala,
    //                                     Mojoodi: addRemParam.Mojoodi,
    //                                     MaxTedad: addRemParam.MaxTedad,
    //                                     MasrafSatr: curItem.MasrafSatr,   ////zare_nk_050329_commented
    //                                     father: "",
    //                                     //refForfather: refForfather,
    //                                     bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,  //zare_nk_041121_added(for shopToDiscount)
    //                                     fromShowDetails: false,
    //                                     ForCartContentsDesignType: ForCartContentsDesignTypeLet,  //zare_nk_041121_added(for shopToDiscount)
    //                                     idTag: "ForCart-" + addRemParam.IdKala,
    //                                 }
    //                             )
    //                         }
    //                         // اگر شرط برقرار نبود، حتما باید آیتم قبلی را برگردانید
    //                         return curItem;
    //                     })
    //                 })

    //                 setJamKol(tittrInoInResult.SumFeeMasraf);
    //                 setJamKolTakhfif(tittrInoInResult.Sood);
    //                 setJamKolNahaei(tittrInoInResult.MablaghNahaee);
    //                 ////zare_nk_050416_added_st(raveshe samte client ke jaigozine setAddOrRemChanged va useEffect(...[addOrRemChanged]) 
    //                 //// shod(ke dakhele useEffect(...[addOrRemChanged]) api sabadekharid ra mojadad seda mizadim) )
    //             }
    //         } else {
    //             console.log('041120-addToCartInIndex-else 6 IdKala !!!!response.ok');
    //             if (response.status == 401) {
    //                 setIsOpenedMymodalForWarning(true);
    //                 setWarningTextInMymodalForWarning("لطفا ابتدا لاگین شوید");
    //                 // const bootstrap = await getBootstrap();
    //                 // const mymodalForWarning = new bootstrap.Modal(
    //                 //     document.getElementById("mymodalForWarning")
    //                 // );
    //                 // mymodalForWarning.show();
    //                 // const span = document.querySelector(
    //                 //     "#mymodalForWarning .errorInMymodalForWarning"
    //                 // );
    //                 // if (span instanceof HTMLElement) {
    //                 //     span.innerText = "لطفا ابتدا لاگین شوید";
    //                 // }
    //             }
    //             ////zare_nk_050311_added_st
    //             else {
    //                 setIsOpenedMymodalForWarning(true);
    //                 setWarningTextInMymodalForWarning("ارتباط با سرور برقرار نشد");
    //             }
    //         }
    //     } catch (error) {
    //         ////zare_nk_050325_commented_st(tahlilshe(catch ra az showDetails coppy kardam, fekr mikonam inha inja ezafian)) 
    //         // setForCartContInProdDetVal(undefined);
    //         // setIsOpenedProdDetModal(false);
    //         ////zare_nk_050325_commented_end(tahlilshe(catch ra az showDetails coppy kardam, fekr mikonam inha inja ezafian)) 
    //         setIsOpenedMymodalForWarning(true);
    //         let WarningText = '';
    //         if (error instanceof Error) {
    //             WarningText = error.message
    //             if (error.message === "Failed to fetch") {
    //                 WarningText = "❌ اتصال اینترنت برقرار نیست یا سرور در دسترس نمی‌باشد";
    //             }
    //             else if (error.message === "Network request failed") {
    //                 WarningText = "درخواست شبکه ناموفق بود";
    //             }
    //             else {
    //                 WarningText = '55درخواست نا موفق بود';
    //             }
    //         } else {
    //             WarningText = String(error);
    //         }

    //         setWarningTextInMymodalForWarning(() => {
    //             return (WarningText)
    //         });
    //     }
    //     // } ////zare_nk_050416_commented(dar sharte token == null return gozashtim dige else nemikhaim)
    // }

    // async function remveFromCartInIndex(
    //     addRemParam: addRemParamType,
    // ) {
    //     ////zare_nk_050416_commented_st
    //     // if (addRemParam.event != null) {
    //     //   addRemParam.event.stopPropagation();
    //     //   addRemParam.event.preventDefault();
    //     // }
    //     ////zare_nk_050416_commented_end
    //     const token = getCookie("token");
    //     if (token == null) {
    //         setIsOpenedMymodalForWarning(true);
    //         setWarningTextInMymodalForWarning("لطفا ابتدا لاگین شوید");
    //         ////zare_nk_041129_commented_st
    //         //   const bootstrap = await getBootstrap();
    //         //   const mymodalForWarning = new bootstrap.Modal(
    //         //     document.getElementById("mymodalForWarning")
    //         //   );
    //         //   mymodalForWarning.show();
    //         //   const span = document.querySelector(
    //         //     "#mymodalForWarning .errorInMymodalForWarning"
    //         //   );
    //         //   if (span instanceof HTMLElement) {
    //         //     span.innerText = "لطفا ابتدا لاگین شوید";
    //         //   }
    //         ////zare_nk_041129_commented_end
    //         return;
    //         return;
    //     }
    //     //else {  ////zare_nk_050326_commented(dar sharte token == null return gozashtim dige else nemikhaim)
    //     try {
    //         console.log('041116-001');
    //         var TedadOut = 0;
    //         var TedadOuttoAjax = 0;
    //         const zarib = parseFloat(String(addRemParam.ZaribForoosh ?? 0));
    //         TedadOut = addRemParam.tedadInSabadOrDet - zarib;
    //         TedadOuttoAjax = -(addRemParam.ZaribForoosh);
    //         // const token = getCookie("token");

    //         // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented 
    //         var urlInsertToSabad = NextJsApiUrl + "Api_AddRemoveSabadKharidSatr";
    //         const response = await fetch(urlInsertToSabad, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: "Bearer " + token,
    //             },
    //             body: JSON.stringify({
    //                 BarcodeKala: addRemParam.BarcodeKala,
    //                 Tedad: TedadOut,
    //                 IdKala: addRemParam.IdKala,
    //                 IdShobeh: vendorId,  ////zare_nk_050416_nokteh(meghdare dynamic bedam)
    //                 IdAddress: mycurrentAddressState?.IdAdress,  // 23990,  ////zare_nk_050416_nokteh(meghdare dynamic bedam)
    //             }),
    //         });

    //         const data = await response.json();
    //         if (response.ok) {
    //             var result = data;
    //             if (result.status == -1000) {
    //                 ////zare_nk_041129_commented_st
    //                 // const inputGroup = document.querySelector(
    //                 //   ".ForCart-" + addRemParam.IdKala + " .input-group"
    //                 // );
    //                 // if (inputGroup) {
    //                 //   let parent = inputGroup.closest(".flxpedar2_new");
    //                 //   if (parent) {
    //                 //     alert('1111111');
    //                 //     parent.remove();
    //                 //   }
    //                 // }
    //                 ////zare_nk_041129_commented_end
    //                 // var hisFather = null;
    //                 // let eventCurrentTargetTag;
    //                 // if (addRemParam.event) {
    //                 //     eventCurrentTargetTag = addRemParam.event.currentTarget as HTMLElement;
    //                 // }

    //                 // const hisFatherTag = eventCurrentTargetTag?.closest(".gfForAddRemm");
    //                 // if (hisFatherTag) {
    //                 //     hisFather = hisFatherTag.id;
    //                 // }
    //                 refForfather.current = addRemParam.father;
    //                 setIsOpenedMymodalForWarning(true);
    //                 setWarningTextInMymodalForWarning(result.errors[0]);
    //                 // const bootstrap = await getBootstrap(); 
    //                 // const adameSabteNahaeiModal = new bootstrap.Modal(
    //                 //   document.getElementById("adameSabteNahaeiModal")
    //                 // );
    //                 // adameSabteNahaeiModal.show();
    //                 // const HoshdarInAdameSabteNahaeiModalTag = document.getElementById(
    //                 //   "HoshdarInAdameSabteNahaeiModal"
    //                 // );
    //                 // if (HoshdarInAdameSabteNahaeiModalTag instanceof HTMLElement) {
    //                 //   HoshdarInAdameSabteNahaeiModalTag.innerText = result.errors[0];
    //                 // } 
    //                 // const mymodalForWarning = new bootstrap.Modal(
    //                 //     document.getElementById("mymodalForWarning")
    //                 // );
    //                 // mymodalForWarning.show();
    //                 // const span = document.querySelector(
    //                 //     "#mymodalForWarning .modal-body span"
    //                 // );
    //                 // if (span instanceof HTMLElement) {
    //                 //     span.innerText = result.errors[0];
    //                 // }
    //             }
    //             if (result.status != 0) {
    //                 setIsOpenedMymodalForWarning(true);
    //                 setWarningTextInMymodalForWarning(result.errors[0]);
    //                 // const bootstrap = await getBootstrap();
    //                 // const mymodalForWarning = new bootstrap.Modal(
    //                 //     document.getElementById("mymodalForWarning")
    //                 // );
    //                 // mymodalForWarning.show();
    //                 // const span = document.querySelector(
    //                 //     "#mymodalForWarning .modal-body span"
    //                 // );
    //                 // if (span instanceof HTMLElement) {
    //                 //     span.innerText = result.errors[0];
    //                 // }
    //             } else if (result.status == 0) {
    //                 console.log('041116-result.status == 0');
    //                 let tittrInoInResult = JSON.parse(result.data.titr)[0];  ////zare_nk_050416_added
    //                 let satrInoInResult = JSON.parse(result.data.satr)[0];  //zare_nk_041124_added
    //                 let Tedad = satrInoInResult === undefined ? 0 : satrInoInResult.Tedad;

    //                 console.log("zare_nk_050416-tittrInoInResult.IdSabadKharidSatr: " + tittrInoInResult.IdSabadKharidTitr +
    //                     "Tedad: " + Tedad
    //                 );

    //                 var bishAzMaxTedadYaMojoodi = 0;
    //                 if (addRemParam.MaxTedad != null) {
    //                     if (addRemParam.MaxTedad <= Tedad) {
    //                         bishAzMaxTedadYaMojoodi = 1;
    //                     }
    //                 } else {
    //                     if (addRemParam.Mojoodi <= Tedad) {
    //                         bishAzMaxTedadYaMojoodi = 1;
    //                     }
    //                 }
    //                 refForfather.current = addRemParam.father;

    //                 let ForCartContentsDesignTypeLet = 0

    //                 if (Tedad == 0) {
    //                     ForCartContentsDesignTypeLet = 0;
    //                 }
    //                 else if (Tedad > addRemParam.ZaribForoosh) {
    //                     ForCartContentsDesignTypeLet = 2;
    //                 }
    //                 else if (Tedad == addRemParam.ZaribForoosh) {
    //                     ForCartContentsDesignTypeLet = 1;
    //                 }
    //                 ////zare_nk_050416_commented_st(felan ke modale joziate kala nemikhaim dar in safheh)
    //                 // if (addRemParam.fromShowDetails) {
    //                 //     setForCartContInProdDetVal(() => {
    //                 //         const idTag = "ForCart-" + addRemParam.IdKala;
    //                 //         return {
    //                 //             tedadInSabadOrDet: Tedad,
    //                 //             ZaribForoosh: addRemParam.ZaribForoosh,
    //                 //             IdKala: addRemParam.IdKala,
    //                 //             NameKala: addRemParam.NameKala,
    //                 //             DarsadTakhfif: addRemParam.DarsadTakhfif,
    //                 //             NameBerand: addRemParam.NameBerand,
    //                 //             FeeForoosh: addRemParam.FeeForoosh,
    //                 //             FeeMasraf: addRemParam.FeeMasraf,
    //                 //             BarcodeKala: addRemParam.BarcodeKala,
    //                 //             Mojoodi: addRemParam.Mojoodi,
    //                 //             MaxTedad: addRemParam.MaxTedad,
    //                 //             father: "#DetailsInfoCont",
    //                 //             refForfather: refForfather,
    //                 //             bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
    //                 //             fromShowDetails: addRemParam.fromShowDetails,
    //                 //             ForCartContentsDesignType: ForCartContentsDesignTypeLet,
    //                 //             idTag: idTag,
    //                 //         };
    //                 //     });
    //                 // }
    //                 ////zare_nk_050416_commented_end(felan ke modale joziate kala nemikhaim dar in safheh)

    //                 ////zare_nk_050416_added_st(raveshe samte client ke jaigozine setAddOrRemChanged va useEffect(...[addOrRemChanged]) 
    //                 //// shod(ke dakhele useEffect(...[addOrRemChanged]) api sabadekharid ra mojadad seda mizadim) )
    //                 setSabadRows((curRows) => {
    //                     ////zare_nk_050416_added_st(baraye hazfeh satre tedad sefr)
    //                     if (Tedad === 0) {
    //                         // alert(addRemParam.NameKala);
    //                         return curRows.filter(
    //                             item => item.IdKala !== addRemParam.IdKala
    //                         );
    //                     }
    //                     ////zare_nk_050416_added_st(baraye hazfeh satre tedad sefr)
    //                     return curRows.map((curItem: any, index: number) => {
    //                         if (curItem.IdKala == addRemParam.IdKala) {
    //                             return (
    //                                 {
    //                                     ...curItem,   ////zare_nk_050322_added(ta age fieldi ra ja gozashtim barnameh az meghdare feli estefadeh koneh, vagarnah an field undefiend mishavad!(masalan 
    //                                     //// midoonim NameKala dar in setState tagheiri nemikoneh, niazi be meghdardehi mojadad nist va age inja dobareh meghdar nadim va az ...curItem ham estefadeh nakonim undegiend mideh ))
    //                                     IdSabadKharidSatr: satrInoInResult.IdSabadKharidSatr,
    //                                     IdSabadKharidTitr: tittrInoInResult.IdSabadKharidTitr,
    //                                     tedadInSabadOrDet: Tedad,
    //                                     ZaribForoosh: addRemParam.ZaribForoosh,
    //                                     IdKala: addRemParam.IdKala,
    //                                     NameKala: addRemParam.NameKala,
    //                                     DarsadTakhfif: addRemParam.DarsadTakhfif,
    //                                     NameBerand: addRemParam.NameBerand,
    //                                     FeeForoosh: addRemParam.FeeForoosh,
    //                                     FeeMasraf: addRemParam.FeeMasraf,
    //                                     BarcodeKala: addRemParam.BarcodeKala,
    //                                     Mojoodi: addRemParam.Mojoodi,
    //                                     MaxTedad: addRemParam.MaxTedad,
    //                                     MasrafSatr: curItem.MasrafSatr,   ////zare_nk_050329_commented
    //                                     father: "",
    //                                     //refForfather: refForfather,
    //                                     bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,  //zare_nk_041121_added(for shopToDiscount)
    //                                     fromShowDetails: false,
    //                                     ForCartContentsDesignType: ForCartContentsDesignTypeLet,  //zare_nk_041121_added(for shopToDiscount)
    //                                     idTag: "ForCart-" + addRemParam.IdKala,
    //                                 }
    //                             )
    //                         }
    //                         // اگر شرط برقرار نبود، حتما باید آیتم قبلی را برگردانید
    //                         return curItem;
    //                     })
    //                 })

    //                 setJamKol(tittrInoInResult.SumFeeMasraf);
    //                 setJamKolTakhfif(tittrInoInResult.Sood);
    //                 setJamKolNahaei(tittrInoInResult.MablaghNahaee);
    //                 ////zare_nk_050416_added_st(raveshe samte client ke jaigozine setAddOrRemChanged va useEffect(...[addOrRemChanged]) 
    //                 //// shod(ke dakhele useEffect(...[addOrRemChanged]) api sabadekharid ra mojadad seda mizadim) )

    //                 if (Tedad == 0) {
    //                     ////zare_nk_041129_commented_st
    //                     // const inputGroup = document.querySelector(
    //                     //   ".ForCart-" + addRemParam.IdKala + " .input-group"
    //                     // );
    //                     // if (inputGroup) {
    //                     //   let parent = inputGroup.closest(".flxpedar2_new");
    //                     //   if (parent) {
    //                     //     if (JSON.parse(result.data.titr).length == 0) {
    //                     //       alert('2222222');
    //                     //       parent.remove();
    //                     //     }
    //                     //   }
    //                     // }
    //                     ////zare_nk_041129_commented_end
    //                 }
    //                 else if (Tedad == addRemParam.ZaribForoosh) {
    //                     ////zare_nk_041129_commented_st
    //                     // alert('1 shoddd!!!')
    //                     // let htmlTag;
    //                     // if (addRemParam.event) {
    //                     //   htmlTag = addRemParam.event.target as HTMLElement;
    //                     // }

    //                     // const wrapper = htmlTag?.closest(
    //                     //   ".flxpedar2_new"
    //                     // ) as HTMLElement | null;
    //                     // if (wrapper) {
    //                     //   wrapper.style.backgroundColor = "inherit";
    //                     // }
    //                     ////zare_nk_041129_commented_end
    //                 }
    //             }
    //         } else {
    //             console.log('041116-!!response.ok');
    //             if (response.status == 401) {
    //                 setIsOpenedMymodalForWarning(true);
    //                 setWarningTextInMymodalForWarning("لطفا ابتدا لاگین شوید");
    //                 // const bootstrap = await getBootstrap();
    //                 // const mymodalForWarning = new bootstrap.Modal(
    //                 //     document.getElementById("mymodalForWarning")
    //                 // );
    //                 // mymodalForWarning.show();
    //                 // const span = document.querySelector(
    //                 //     "#mymodalForWarning .errorInMymodalForWarning"
    //                 // );
    //                 // if (span instanceof HTMLElement) {
    //                 //     span.innerText = "لطفا ابتدا لاگین شوید";
    //                 // }
    //             }
    //             ////zare_nk_050311_added_st
    //             else {
    //                 setIsOpenedMymodalForWarning(true);
    //                 setWarningTextInMymodalForWarning("ارتباط با سرور برقرار نشد");
    //             }
    //         }

    //     } catch (error) {
    //         ////zare_nk_050325_commented_st(tahlilshe(catch ra az showDetails coppy kardam, fekr mikonam inha inja ezafian)) 
    //         // setForCartContInProdDetVal(undefined);
    //         // setIsOpenedProdDetModal(false);
    //         ////zare_nk_050325_commented_end(tahlilshe(catch ra az showDetails coppy kardam, fekr mikonam inha inja ezafian)) 
    //         setIsOpenedMymodalForWarning(true);
    //         let WarningText = '';
    //         if (error instanceof Error) {
    //             WarningText = error.message
    //             if (error.message === "Failed to fetch") {
    //                 WarningText = "❌ اتصال اینترنت برقرار نیست یا سرور در دسترس نمی‌باشد";
    //             }
    //             else if (error.message === "Network request failed") {
    //                 WarningText = "درخواست شبکه ناموفق بود";
    //             }
    //             else {
    //                 WarningText = '66درخواست نا موفق بود';
    //                 console.log("050329-error.message: " + error.message)
    //             }
    //         } else {
    //             WarningText = String(error);
    //         }

    //         setWarningTextInMymodalForWarning(() => {
    //             return (WarningText)
    //         });
    //     }

    //     // }  ////zare_nk_050326_commented(dar sharte token == null return gozashtim dige else nemikhaim) 
    // }

    // // const handlerForAddClick: (
    // //     addRemParam: addRemParamType,
    // // ) => void = (addRemParam) => {
    // //     // addRemParam.event && addRemParam.event.stopPropagation();
    // //     addToCartInIndex(
    // //         addRemParam
    // //     );
    // // };
    // const handlerForAddClick = useCallback(addToCartInIndex, [addToCartInIndex]);  ////zare_nk_050319_added_st(rahe3- tabee voroodish ke addToCartInIndex hast dige niazi be useCalback nadare)

    // // const handlerForRemClick: (
    // //     addRemParam: addRemParamType,
    // // ) => void = (addRemParam) => {
    // //     remveFromCartInIndex(
    // //         addRemParam
    // //     );
    // // };
    // const handlerForRemClick = useCallback(remveFromCartInIndex, [remveFromCartInIndex]);
    ////zare_nk_050416_added_st(baraye add va rem va ...)

    ////zare_nk_050421_added_st
    const showAddressListDrawer = useCallback(
        async () => {
            let token = getCookie("token");
            if (!token) {
                setError("lotfan avval online shid");
                return;
            }
            setIsEpmtyAdressList('notNull');   ////zare_nk_050507_nokteh(az entehaye tabe avorder shod inja)

            // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented 
            const response = await fetch(NextJsApiUrl + "Api_SelectAddress", {
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
                    return parsedList;
                } else {
                    setError("متاسفانه خطایی رخ داده است34:" + data.errors);
                    // console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
                    ////zare_nk_050221_nokteh(setIsEpmtyAdressList(null); ro bezarim??)
                    return null;
                }
            } else {
                // console.log("zare_nk_050110-!response.ok" + response.ok);
                setError("متاسفانه خطایی رخ داده است35");
                ////zare_nk_050221_nokteh(setIsEpmtyAdressList(null); ro bezarim??)
                return null;
            }
        }
        , [isEpmtyAdressList, responsedListFromApiSelectAddressList])
    ////zare_nk_050421_added_end


    const [radionClicked, setRadionClicked] = useState<number>(1);

    const radionClickedFunc = (index: number) => {
        setRadionClicked(index);
    }
    const [switchBtnChecked, setSwitchBtnChecked] = useState<boolean>(false);  ////zare_nk_050423_added

    return (
        <div style={{
            // backgroundColor: 'white', 
            width: '100%',
            // height: '100%',  ////height :100% dorost nist, chon shayad dar layout alaveh ba children satrhaye dife ham dashe bashim(mesle footer va header va...)
            display: "flex",
            flexDirection: 'column',
            position: 'relative',  ////zare_nk_050404_added
            flex: '1 1 auto',  ////zare_nk_050514_added
        }}>
            <header style={{
                position: 'sticky',
                backgroundColor: 'white',
                flexShrink: '0px',
                width: '100%',
                top: '0px',
                // boxShadow: '0px 3px 2px -1px #d7d6d6',
                boxShadow: '0px 4px 20px 0px #0000000f',

                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 30,
            }}>
                <div
                    style={{
                        display: 'flex',
                        flexFlow: 'row-reverse',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingRight: '1rem',
                        paddingLeft: '1rem',
                        // border: '1px dashed blue',
                        width: '100%',
                        height: '3.5rem',
                        position: 'relative',
                    }}>
                    <button
                        id="goBackBtn"
                        onClick={() => router.back()}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // backgroundColor: '#f2f5f7',
                            backgroundColor: 'white',
                            border: 'none',
                            // border: '1px dashed black',
                            fontSize: '.875rem',
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '9999px',
                            cursor: 'pointer',
                            position: 'absolute',
                        }}>
                        <img
                            src="/images/Icon/back-icon.svg"
                            alt="بازگشت"
                            style={{ width: '1.5rem', height: '1.5rem', }}
                        />
                    </button>

                    <div style={{
                        display: 'flex',
                        flexFlow: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // border: '1px dashed orange',
                        flex: '1 1 auto',
                    }}>
                        تأیید نهایی
                    </div>
                </div>
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

                    minHeight: '900px',  ////zare_nk_050416_added_movaghat(pak kardani)

                    paddingLeft: '1rem',  ////zare_nk_050416_added
                    paddingRight: '1rem',  ////zare_nk_050416_added

                    paddingBottom: '96px',  ////zare_nk_050421_added
                }}>
                {/* zare_nk_050421_nokteh(dive zir ra tapsifood gozasht baraye wrapr mohtavahaye toye main(ke tanha farzande main bashe)
                    (man felan azash estefadeh nakardam)) */}
                {/* <div class="h-min w-full relative grid grid-cols-[100%] grid-rows-[auto] gap-0"></div> */}

                {/* zare_nk_050416_added_st(inja address haro niaz nadaram felan) */}
                {isEpmtyAdressList &&
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
                {/* zare_nk_050416_added_end(inja address haro niaz nadaram felan) */}

                <div style={{ marginBottom: '.70rem' }}></div>

                {/* zare_nk_050413_added_st(berim mohtavaye checkout) */}
                <div style={{
                    display: 'flex', flexFlow: 'column', width: '100%', paddingTop: '1.25rem', paddingBottom: '1rem', rowGap: '1rem',
                }}>
                    <div style={{
                        // position: 'sticky',
                        // top: '0px',
                        // boxShadow: '0px 3px 2px -1px #d7d6d6',
                        display: 'flex',
                        flexFlow: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // padding: '5px',
                        zIndex: 899,
                        backgroundColor: 'white',
                        width: '100%',
                    }}>

                        <div style={{
                            display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center',
                        }}>
                            <span
                                style={{
                                    fontSize: '.875rem',
                                    lineHeight: '1.25rem',
                                    color: '#313335',
                                }}>
                                آدرس تحویل
                            </span>
                        </div>

                        <button
                            id="goShoppingBacketBtn"
                            // onClick={showAddressListDrawer}  
                            // onClick={() => { goTosShoppingbasket(); }}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'inherit',
                                border: 'none',
                                fontSize: '.75rem',
                                height: '2rem',
                                cursor: "pointer",
                                padding: '0px',
                                borderRadius: '.75rem',
                            }}>
                            <div style={{
                                display: 'flex',
                                flexFlow: 'row',
                                direction: 'rtl',
                                // minWidth: '124px',
                                // maxWidth: '256px',
                                // gap: '.5rem',
                            }}>
                                <span style={{ lineHeight: '1rem', fontSize: '.75rem', color: '#ff5900', }}>تغییر آدرس</span>

                                <img src="/images/checkout/change-address.svg" alt=" ادرس ها" style={{
                                    height: '1.25rem', width: '1.25rem',
                                }} />
                            </div>
                        </button>
                    </div >

                    <div style={{
                        display: 'flex', flexFlow: 'row', width: '100%', justifyContent: 'start', alignItems: 'center',
                    }}>
                        <span style={{
                            marginLeft: '2px', fontSize: '.875rem', color: '#313335', lineHeight: '1.25rem',
                            alignSelf: 'start',  ////zare_nk_050423_added
                        }}>
                            خونه:
                        </span>
                        <div style={{
                            fontSize: '0.875rem',
                            color: '#64686f',

                            // این بخش برای سه‌نقطه و محدودیت ۲ خط
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',

                            // این بخش برای تثبیت ارتفاع روی ۴۰ پیکسل 
                            lineHeight: '1.25rem',
                            height: '2.5rem',
                            // height: '1.25rem',

                            minHeight: '2.5rem',  // minHeight: '2.5rem', // اجبار به کمتر نشدن
                            maxHeight: '2.5rem',  // maxHeight: '2.5rem', // اجبار به بیشتر نشدن
                            boxSizing: 'border-box', // برای اینکه بُردر (border) به ارتفاع اضافه نشود

                            textAlign: 'right',
                        }}>
                            {/* {currentAddress?.Adress ? currentAddress.Adress : 'آدرسسس'} */}
                            {mycurrentAddressState?.Adress ? mycurrentAddressState.Adress : ''}
                        </div>
                    </div>
                </div>

                <div className="-mx-4 my-4 h-3 bg-gray-50" style={{
                    backgroundColor: '#f7f7f8', height: '.75rem', margin: '1rem -1rem', width: '450px',
                }}></div>

                <div className="flex flex-col gap-y-4 p-4" style={{
                    display: 'flex', flexFlow: 'column', width: '100%', rowGap: '1rem',  //padding: '1rem 0px',  ////zare_nk_050423_commented
                }}>
                    <div style={{
                        display: 'flex', flexFlow: 'row', //justifyContent: 'center', alignItems: 'center',
                    }}>
                        <span
                            style={{
                                fontSize: '1rem',
                                lineHeight: '1.25rem',
                                color: '#313335',
                            }}>
                            روش ارسال
                        </span>
                    </div>

                    <div className="flex gap-x-2" style={{
                        display: 'flex', flexFlow: 'row', columnGap: '.5rem',
                    }}>
                        <img src="/images/checkout/tapsi-peyk.svg" alt="ادرس ها" style={{
                            height: '1.25rem', width: '1.25rem',
                        }} />
                        <span style={{ lineHeight: '1.25rem', fontSize: '.875rem', color: '#ff5900', }}>
                            پیک توچی‌فود
                        </span>
                    </div>
                </div>

                <div className="-mx-4 my-4 h-3 bg-gray-50" style={{
                    backgroundColor: '#f7f7f8', height: '.75rem', margin: '1rem -1rem', width: '450px',
                }}></div>

                <div className="flex flex-col p-4" style={{
                    display: 'flex', width: '100%', flexFlow: 'column', //padding: '1rem 0px',  ////zare_nk_050423_commented
                }}>
                    <div style={{
                        display: 'flex', flexFlow: 'row', //justifyContent: 'center', alignItems: 'center',
                    }}>
                        <span style={{
                            fontSize: '1rem',
                            lineHeight: '1.25rem',
                            color: '#313335',
                        }}>
                            روش پرداخت
                        </span>
                    </div>

                    <div className="grid mt-4 gap-3" style={{
                        display: 'flex', flexFlow: 'column', outline: 'none', gap: '.75rem', marginTop: '1rem',
                    }}>
                        <div
                            onClick={() => { radionClickedFunc(1) }}
                            // key={item.IdAdress}   ////zare_nk_050319_added
                            // // onClick={() => {
                            // //   setRowItem(item);
                            // //   chosenAddress(item);
                            // // }}
                            style={{
                                borderTop: '1px solid #2b364f14',
                                display: 'flex',
                                // paddingBottom: '.75rem',   ////zare_nk_050423_commented
                                // paddingTop: '.75rem',   ////zare_nk_050423_commented
                                gap: '.5rem',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                height: 'min-content',
                                alignItems: 'center',
                            }}>
                            <div
                                //   onClick={() => {
                                //     setRowItem(item);
                                //     chosenAddress(item);
                                //   }}
                                style={{
                                    // borderTop: '1px solid #2b364f14',
                                    display: 'flex',
                                    flex: '1 1 0%',
                                    // paddingBottom: '.75rem',
                                    // paddingTop: '.75rem',
                                    gap: '.5rem',
                                    justifyContent: 'space-between',
                                    // cursor: 'pointer',  ////zare_nk_050421_commented
                                    height: 'min-content',
                                    alignItems: 'center',
                                    // border:'2px dashed red'
                                }}>
                                <button
                                    id="locationBtnInEveryAddressRow"   //zare_nk_050208_nokteh(in dokmeh engar karbordi nadare va faghat ye design hast! badan shayad tabdilesh konam be ye tage div)
                                    style={{
                                        backgroundColor: 'inherit',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#eef0f1) 
                                        fill: 'white',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#a5abb1)  
                                        borderRadius: '9999px', justifyContent: 'center', alignItems: 'center', width: '2rem', height: '2rem', display: "flex", flexFlow: "row", border: 'none',
                                        flex: '0 0 auto',
                                    }}>
                                    <img src="/images/checkout/ravesh-online.svg" alt="پرداخت آنلاین" style={{
                                        // height: '1.25rem', width: '1.25rem',
                                    }} />
                                </button>

                                <div style={{
                                    paddingTop: '.5rem',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    flexFlow: 'column',
                                    flex: '1 1 0%',
                                    height: 'min-content',
                                    marginLeft: '.5rem',
                                    rowGap: '.25rem',  ////zare_nk_050424_added
                                }}>
                                    <span style={{
                                        ...(radionClicked == 1 ? { color: '#059666' } : { color: '#1b1c1d' }),
                                        fontWeight: '500',
                                        fontSize: '.875rem',
                                        lineHeight: '1.25rem',
                                    }}>
                                        آنلاین
                                        {/* {item.OnvanAdress ? item.OnvanAdress : 'خونه'} */}
                                    </span>

                                    <div style={{
                                        display: 'flex', flexFlow: 'row', width: '100%', marginBottom: '2px',
                                    }}>
                                        <div style={{
                                            display: 'flex', flexFlow: 'row', width: '100%', justifyContent: 'space-between',
                                        }}>
                                            <div style={{
                                                display: 'flex', flexFlow: 'row', gap: '.5rem', alignItems: 'center',
                                            }}>
                                                <img src="/images/checkout/ravesh-pardakht-online.svg" alt="پیک" style={{
                                                    width: '1rem', height: '1rem',
                                                }} />
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
                                                        marginRight: '5px', ////zare_nk_050331_added
                                                    }} >
                                                    <span //className="mablagh" 
                                                        style={{
                                                            lineHeight: '1rem',
                                                            fontSize: '0.75rem',
                                                            fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                            color: '#703bed',   ////zare_nk_050316_added
                                                        }}>
                                                        تخفیف {'100000'.toLocaleString()} تومان با پرداخت آنلاین
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <button type="button"
                                // onClick={() => { radionClickedFunc(1) }}
                                role="radio"
                                aria-checked="true"
                                data-state="checked"
                                value="distance"
                                className="peer aspect-square rounded-full border border-solid border-gray text-foreground ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 disabled:cursor-not-allowed disabled:!border-gray-200 disabled:text-gray-200 size-5"
                                id="distance" tabIndex={0} data-radix-collection-item=""
                                style={{ borderRadius: '9999px', border: '1px solid #878b92', height: '1.25rem', width: '1.25rem', padding: '0px', backgroundColor: 'transparent', }}>
                                {radionClicked == 1 &&
                                    <span id="spanInDistance" data-state="checked" className="flex size-full items-center justify-center"
                                        style={{
                                            display: 'flex',
                                            width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
                                        }}>
                                        <div className="size-3/4 rounded-full bg-current"
                                            style={{ height: '75%', width: '75%', borderRadius: '9999px', backgroundColor: '#059666', }}>
                                        </div>
                                    </span>}
                            </button>
                        </div>

                        <div
                            onClick={() => { radionClickedFunc(2) }}
                            // key={item.IdAdress}   ////zare_nk_050319_added
                            // // onClick={() => {
                            // //   setRowItem(item);
                            // //   chosenAddress(item);
                            // // }}
                            style={{
                                borderTop: '1px solid #2b364f14',
                                display: 'flex',
                                // paddingBottom: '.75rem',   ////zare_nk_050423_commented
                                // paddingTop: '.75rem',   ////zare_nk_050423_commented
                                gap: '.5rem',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                height: 'min-content',
                                alignItems: 'center',
                            }}>
                            <div
                                //   onClick={() => {
                                //     setRowItem(item);
                                //     chosenAddress(item);
                                //   }}
                                style={{
                                    // borderTop: '1px solid #2b364f14',
                                    display: 'flex',
                                    flex: '1 1 0%',
                                    // paddingBottom: '.75rem',
                                    // paddingTop: '.75rem',
                                    gap: '.5rem',
                                    justifyContent: 'space-between',
                                    // cursor: 'pointer',  ////zare_nk_050421_commented
                                    height: 'min-content',
                                    alignItems: 'center',
                                    // border:'2px dashed red'
                                }}>
                                <button
                                    id="locationBtnInEveryAddressRow"   //zare_nk_050208_nokteh(in dokmeh engar karbordi nadare va faghat ye design hast! badan shayad tabdilesh konam be ye tage div)
                                    style={{
                                        backgroundColor: 'inherit',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#eef0f1) 
                                        fill: 'white',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#a5abb1)  
                                        borderRadius: '9999px', justifyContent: 'center', alignItems: 'center', width: '2rem', height: '2rem', display: "flex", flexFlow: "row", border: 'none',
                                        flex: '0 0 auto',
                                    }}
                                >

                                    <img src="/images/checkout/taraIcon.png" alt="پرداخت آنلاین" style={{
                                        height: '1rem', width: '1rem',
                                    }} />
                                </button>

                                <div style={{
                                    paddingTop: '.5rem',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    flexFlow: 'column',
                                    flex: '1 1 0%',
                                    height: 'min-content',
                                    marginLeft: '.5rem',
                                    rowGap: '.25rem',  ////zare_nk_050424_added
                                }}>
                                    <span style={{
                                        ...(radionClicked == 2 ? { color: '#059666' } : { color: '#1b1c1d' }),
                                        fontWeight: '500',
                                        fontSize: '.875rem',
                                        lineHeight: '1.25rem',
                                    }}>
                                        تارا
                                        {/* {item.OnvanAdress ? item.OnvanAdress : 'خونه'} */}
                                    </span>

                                    {/* zare_nk_050421_alaaaaaaaan_st */}
                                    <div style={{
                                        display: 'flex', flexFlow: 'row', width: '100%', marginBottom: '2px',
                                    }}>
                                        <div style={{
                                            display: 'flex', flexFlow: 'row', width: '100%', justifyContent: 'space-between',
                                            // marginTop: '8px',
                                        }}>
                                            <div style={{
                                                display: 'flex', flexFlow: 'row', gap: '.5rem', alignItems: 'center',
                                            }}>
                                                {/* <img src="/images/checkout/motor-peyk.svg" alt="پیک" style={{
                                                    height: '1rem', width: '1rem',
                                                }} /> */}
                                                <div style={{
                                                    flex: "1 0 auto",
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-end',
                                                    // marginRight: '5px',  
                                                }} >
                                                    <span //className="mablagh" 
                                                        style={{
                                                            lineHeight: '1rem',
                                                            fontSize: '0.75rem',
                                                            fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                            color: '#703bed',   ////zare_nk_050316_added
                                                        }}>
                                                        پرداخت با اعتبار تارا
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {/* zare_nk_050421_alaaaaaaaan_end */}

                                </div>
                            </div>

                            <button type="button"
                                // onClick={() => { radionClickedFunc(1) }}
                                role="radio"
                                aria-checked="true"
                                data-state="checked"
                                value="distance"
                                className="peer aspect-square rounded-full border border-solid border-gray text-foreground ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 disabled:cursor-not-allowed disabled:!border-gray-200 disabled:text-gray-200 size-5"
                                id="distance" tabIndex={0} data-radix-collection-item=""
                                style={{ borderRadius: '9999px', border: '1px solid #878b92', height: '1.25rem', width: '1.25rem', padding: '0px', backgroundColor: 'transparent', }}>
                                {radionClicked == 2 &&
                                    <span id="spanInDistance" data-state="checked" className="flex size-full items-center justify-center"
                                        style={{
                                            display: 'flex',
                                            width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
                                        }}>
                                        <div className="size-3/4 rounded-full bg-current"
                                            style={{ height: '75%', width: '75%', borderRadius: '9999px', backgroundColor: '#059666', }}>
                                        </div>
                                    </span>}
                            </button>
                        </div>

                        <div
                            onClick={() => { radionClickedFunc(3) }}
                            // key={item.IdAdress}   ////zare_nk_050319_added
                            // // onClick={() => {
                            // //   setRowItem(item);
                            // //   chosenAddress(item);
                            // // }}
                            style={{
                                borderTop: '1px solid #2b364f14',
                                display: 'flex',
                                // paddingBottom: '.75rem',   ////zare_nk_050423_commented
                                // paddingTop: '.75rem',   ////zare_nk_050423_commented
                                gap: '.5rem',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                height: 'min-content',
                                alignItems: 'center',
                            }}>
                            <div
                                //   onClick={() => {
                                //     setRowItem(item);
                                //     chosenAddress(item);
                                //   }}
                                style={{
                                    // borderTop: '1px solid #2b364f14',
                                    display: 'flex',
                                    flex: '1 1 0%',
                                    // paddingBottom: '.75rem',
                                    // paddingTop: '.75rem',
                                    gap: '.5rem',
                                    justifyContent: 'space-between',
                                    // cursor: 'pointer',  ////zare_nk_050421_commented
                                    height: 'min-content',
                                    alignItems: 'center',
                                    // border:'2px dashed red'
                                }}>
                                <button
                                    id="locationBtnInEveryAddressRow"   //zare_nk_050208_nokteh(in dokmeh engar karbordi nadare va faghat ye design hast! badan shayad tabdilesh konam be ye tage div)
                                    style={{
                                        backgroundColor: 'inherit',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#eef0f1) 
                                        fill: 'white',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#a5abb1)  
                                        borderRadius: '9999px', justifyContent: 'center', alignItems: 'center', width: '2rem', height: '2rem', display: "flex", flexFlow: "row", border: 'none',
                                        flex: '0 0 auto',
                                    }}
                                >
                                    {/* <svg style={{ width: '18px', height: '18px' }} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] fill-inherit"><g id="Location"><path id="Union" d="M11.99 2C7.34 2 3.5 5.72 3.5 10.32C3.5 12.64 4.34 14.79 5.73 16.61C7.25 18.62 9.13 20.37 11.27 21.75C11.8 22.09 12.24 22.07 12.73 21.75C14.85 20.37 16.74 18.62 18.27 16.61C19.66 14.79 20.5 12.63 20.5 10.32C20.5 5.72 16.66 2 11.99 2ZM11.99 13.33C10.45 13.33 9.19 12.12 9.19 10.58C9.19 9.04 10.45 7.78 11.99 7.78C13.53 7.78 14.8 9.05 14.8 10.58C14.8 12.11 13.53 13.33 11.99 13.33Z" fill="inherit"></path></g></svg> */}
                                    {/* /images/checkout/ravesh-online.svg */}
                                    <img src="/images/checkout/ozon-icon.svg" alt="پرداخت آنلاین" style={{
                                        // height: '1.25rem', width: '1.25rem',
                                    }} />
                                </button>

                                <div style={{
                                    paddingTop: '.5rem',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    flexFlow: 'column',
                                    flex: '1 1 0%',
                                    height: 'min-content',
                                    marginLeft: '.5rem',
                                    rowGap: '.25rem',  ////zare_nk_050424_added
                                }}>
                                    <span
                                        style={{
                                            ...(radionClicked == 3 ? { color: '#059666' } : { color: '#1b1c1d' }),
                                            fontWeight: '500',
                                            fontSize: '.875rem',
                                            lineHeight: '1.25rem',
                                        }}>
                                        اوزون
                                        {/* {item.OnvanAdress ? item.OnvanAdress : 'خونه'} */}
                                    </span>

                                    <div style={{
                                        display: 'flex', flexFlow: 'row', width: '100%', marginBottom: '2px',
                                    }}>
                                        <div style={{
                                            display: 'flex', flexFlow: 'row', width: '100%', justifyContent: 'space-between',
                                            // marginTop: '8px',
                                        }}>
                                            <div style={{
                                                display: 'flex', flexFlow: 'row', gap: '.5rem', alignItems: 'center',
                                            }}>
                                                {/* <img src="/images/checkout/motor-peyk.svg" alt="پیک" style={{
                                                    height: '1rem', width: '1',
                                                }} /> */}
                                                <div style={{
                                                    flex: "1 0 auto",
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-end',
                                                    // marginRight: '5px',  
                                                }}>
                                                    <span //className="mablagh" 
                                                        style={{
                                                            lineHeight: '1rem',
                                                            fontSize: '0.75rem',
                                                            fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                            color: '#703bed',
                                                        }}>
                                                        پرداخت به‌صورت ترکیبی
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
                                    {/* zare_nk_050421_alaaaaaaaan_end */}

                                </div>
                            </div>

                            <button type="button"
                                // onClick={() => { radionClickedFunc(1) }}
                                role="radio"
                                aria-checked="true"
                                data-state="checked"
                                value="distance"
                                className="peer aspect-square rounded-full border border-solid border-gray text-foreground ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 disabled:cursor-not-allowed disabled:!border-gray-200 disabled:text-gray-200 size-5"
                                id="distance" tabIndex={0} data-radix-collection-item=""
                                style={{ borderRadius: '9999px', border: '1px solid #878b92', height: '1.25rem', width: '1.25rem', padding: '0px', backgroundColor: 'transparent', }}>
                                {radionClicked == 3 &&
                                    <span id="spanInDistance" data-state="checked" className="flex size-full items-center justify-center"
                                        style={{
                                            display: 'flex',
                                            width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
                                        }}>
                                        <div className="size-3/4 rounded-full bg-current"
                                            style={{ height: '75%', width: '75%', borderRadius: '9999px', backgroundColor: '#059666', }}>
                                        </div>
                                    </span>}
                            </button>
                        </div>

                        <div onClick={() => { radionClickedFunc(4) }}
                            // key={item.IdAdress}   ////zare_nk_050319_added
                            // // onClick={() => {
                            // //   setRowItem(item);
                            // //   chosenAddress(item);
                            // // }}
                            style={{
                                borderTop: '1px solid #2b364f14',
                                display: 'flex',
                                // paddingBottom: '.75rem',   ////zare_nk_050423_commented
                                // paddingTop: '.75rem',   ////zare_nk_050423_commented
                                gap: '.5rem',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                height: 'min-content',
                                alignItems: 'center',
                            }}>
                            <div style={{
                                // borderTop: '1px solid #2b364f14',
                                display: 'flex',
                                flex: '1 1 0%',
                                // paddingBottom: '.75rem',
                                // paddingTop: '.75rem',
                                gap: '.5rem',
                                justifyContent: 'space-between',
                                // cursor: 'pointer',  ////zare_nk_050421_commented
                                height: 'min-content',
                                alignItems: 'center',
                                // border:'2px dashed red'
                            }}>
                                <button id="locationBtnInEveryAddressRow" style={{
                                    backgroundColor: 'inherit',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#eef0f1) 
                                    fill: 'white',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#a5abb1)  
                                    borderRadius: '9999px', justifyContent: 'center', alignItems: 'center', width: '2rem', height: '2rem', display: "flex", flexFlow: "row", border: 'none',
                                    flex: '0 0 auto',
                                }} >
                                    <img src="/images/checkout/digipay-Icon.svg" alt="پرداخت آنلاین" style={{
                                        height: '1rem', width: '1rem',
                                    }} />
                                </button>

                                <div style={{
                                    paddingTop: '.5rem',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    flexFlow: 'column',
                                    flex: '1 1 0%',
                                    height: 'min-content',
                                    marginLeft: '.5rem',
                                    rowGap: '.25rem',  ////zare_nk_050424_added
                                }}>
                                    <span style={{
                                        ...(radionClicked == 4 ? { color: '#059666' } : { color: '#1b1c1d' }),
                                        fontWeight: '500',
                                        fontSize: '.875rem',
                                        lineHeight: '1.25rem',
                                    }}>
                                        دیجی‌پی
                                        {/* {item.OnvanAdress ? item.OnvanAdress : 'خونه'} */}
                                    </span>

                                    {/* zare_nk_050421_alaaaaaaaan_st */}
                                    <div style={{
                                        display: 'flex', flexFlow: 'row', width: '100%', marginBottom: '2px',
                                    }}>
                                        <div style={{
                                            display: 'flex', flexFlow: 'row', width: '100%', justifyContent: 'space-between',
                                            // marginTop: '8px',
                                        }}>
                                            <div style={{
                                                display: 'flex', flexFlow: 'row', gap: '.5rem', alignItems: 'center',
                                            }}>
                                                {/* <img src="/images/checkout/motor-peyk.svg" alt="پیک" style={{
                                                    height: '1rem', width: '1',
                                                }} /> */}
                                                <div
                                                    style={{
                                                        flex: "1 0 auto",
                                                        display: "flex",
                                                        flexDirection: 'row',
                                                        justifyContent: 'flex-end',
                                                        // marginRight: '5px', 
                                                    }}>
                                                    <span style={{
                                                        lineHeight: '1rem',
                                                        fontSize: '0.75rem',
                                                        fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                        color: '#703bed',
                                                    }}>
                                                        پرداخت با اعتبار دیجی‌پی
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {/* zare_nk_050421_alaaaaaaaan_end */}

                                </div>
                            </div>

                            <button type="button"
                                // onClick={() => { radionClickedFunc(1) }}
                                role="radio"
                                aria-checked="true"
                                data-state="checked"
                                value="distance"
                                className="peer aspect-square rounded-full border border-solid border-gray text-foreground ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 disabled:cursor-not-allowed disabled:!border-gray-200 disabled:text-gray-200 size-5"
                                id="distance" tabIndex={0} data-radix-collection-item=""
                                style={{ borderRadius: '9999px', border: '1px solid #878b92', height: '1.25rem', width: '1.25rem', padding: '0px', backgroundColor: 'transparent', }}>
                                {radionClicked == 4 &&
                                    <span id="spanInDistance" data-state="checked" className="flex size-full items-center justify-center"
                                        style={{
                                            display: 'flex',
                                            width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
                                        }}>
                                        <div className="size-3/4 rounded-full bg-current"
                                            style={{ height: '75%', width: '75%', borderRadius: '9999px', backgroundColor: '#059666', }}>
                                        </div>
                                    </span>}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="-mx-4 my-4 h-3 bg-gray-50" style={{
                    backgroundColor: '#f7f7f8', height: '.75rem', margin: '1rem -1rem', width: '450px',
                }}></div>

                <div style={{
                    paddingTop: '.5rem', //marginTop: '.5rem', ////zare_nk_050423_commented
                    backgroundColor: '#fff7ec', display: 'flex', flexFlow: 'column', width: '100%', height: 'min-content', paddingBottom: '10px',
                }}>
                    <div style={{
                        padding: '.125rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '.5rem',
                        }}>
                            <img src='/images/movaghat/vendorPage/bord-bord-icon.svg'
                                style={{ width: '20px', height: '20px' }} />

                            <h2 style={{ fontSize: '.875rem', lineHeight: '1.25rem', margin: 0, }}>فرصت برد برد</h2>
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#ff5a00',
                            fontSize: '.875rem',
                            lineHeight: '1.25rem',
                            gap: '1px',
                            cursor: 'pointer',
                        }}>
                            <span>تغییر</span>
                            <img src='/images/movaghat/vendorPage/show-all-bord-bord.svg'
                                style={{ width: '24px', height: '24px' }} />
                        </div>
                    </div>
                    <SwiperBordBordInVendorComp
                    // // openCollapseForSorting={openCollapseForSorting}
                    // // openCollapseForRaveshErsal={openCollapseForRaveshErsal}
                    // scrollToSection={scrollToSection}
                    // activeTab={activeTab}
                    />
                </div>

                <div className="-mx-4 my-4 h-3 bg-gray-50" style={{
                    backgroundColor: '#f7f7f8', height: '.75rem', margin: '1rem -1rem', marginBottom: '0px', width: '450px',
                }}></div>


                {/* zare_nk_050423_added_st */}
                <div className="flex flex-col p-4" style={{
                    display: 'flex', width: '100%', flexFlow: 'column', padding: '1rem 0px',
                }}>
                    <div style={{
                        display: 'flex', flexFlow: 'row', //justifyContent: 'center', alignItems: 'center',
                    }}>
                        <span style={{
                            fontSize: '1rem',
                            lineHeight: '1.25rem',
                            color: '#313335',
                        }}>
                            استفاده از کیف پول
                        </span>
                    </div>

                    <div className="grid mt-4 gap-3" style={{
                        display: 'flex', flexFlow: 'column', outline: 'none', gap: '.75rem', marginTop: '1rem',
                    }}>
                        <div
                            // onClick={() => { radionClickedFunc(1) }}
                            // key={item.IdAdress}   ////zare_nk_050319_added
                            // // onClick={() => {
                            // //   setRowItem(item);
                            // //   chosenAddress(item);
                            // // }}
                            style={{
                                // borderTop: '1px solid #2b364f14',  ////zare_nk_050423_commented
                                display: 'flex',
                                // paddingBottom: '.75rem',   ////zare_nk_050423_commented
                                // paddingTop: '.75rem',   ////zare_nk_050423_commented
                                gap: '.5rem',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                height: 'min-content',
                                alignItems: 'center',
                            }}>
                            <div
                                //   onClick={() => {
                                //     setRowItem(item);
                                //     chosenAddress(item);
                                //   }}
                                style={{
                                    // borderTop: '1px solid #2b364f14',
                                    display: 'flex',
                                    flex: '1 1 0%',
                                    // paddingBottom: '.75rem',
                                    // paddingTop: '.75rem',
                                    gap: '.5rem',
                                    justifyContent: 'space-between',
                                    // cursor: 'pointer',  ////zare_nk_050421_commented
                                    height: 'min-content',
                                    alignItems: 'center',
                                    // border:'2px dashed red'
                                }}>
                                <button
                                    id="locationBtnInEveryAddressRow"   //zare_nk_050208_nokteh(in dokmeh engar karbordi nadare va faghat ye design hast! badan shayad tabdilesh konam be ye tage div)
                                    style={{
                                        backgroundColor: 'inherit',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#eef0f1) 
                                        fill: 'white',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#a5abb1)  
                                        borderRadius: '9999px', justifyContent: 'center', alignItems: 'center', width: '2rem', height: '2rem', display: "flex", flexFlow: "row", border: 'none',
                                        flex: '0 0 auto',
                                    }}
                                >
                                    {/* <svg style={{ width: '18px', height: '18px' }} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] fill-inherit"><g id="Location"><path id="Union" d="M11.99 2C7.34 2 3.5 5.72 3.5 10.32C3.5 12.64 4.34 14.79 5.73 16.61C7.25 18.62 9.13 20.37 11.27 21.75C11.8 22.09 12.24 22.07 12.73 21.75C14.85 20.37 16.74 18.62 18.27 16.61C19.66 14.79 20.5 12.63 20.5 10.32C20.5 5.72 16.66 2 11.99 2ZM11.99 13.33C10.45 13.33 9.19 12.12 9.19 10.58C9.19 9.04 10.45 7.78 11.99 7.78C13.53 7.78 14.8 9.05 14.8 10.58C14.8 12.11 13.53 13.33 11.99 13.33Z" fill="inherit"></path></g></svg> */}
                                    {/* /images/checkout/ravesh-online.svg */}
                                    <img src="/images/checkout/ravesh-online.svg" alt="پرداخت آنلاین" style={{
                                        // height: '1.25rem', width: '1.25rem',
                                    }} />
                                </button>

                                <div style={{
                                    paddingTop: '.5rem',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    flexFlow: 'column',
                                    flex: '1 1 0%',
                                    height: 'min-content',
                                    marginLeft: '.5rem',
                                }}>
                                    <span
                                        style={{
                                            ...(radionClicked == 1 ? { color: '#059666' } : { color: '#1b1c1d' }),
                                            fontWeight: '500',
                                            fontSize: '.875rem',
                                            lineHeight: '1.25rem',
                                        }}>
                                        توچی‌فود
                                        {/* {item.OnvanAdress ? item.OnvanAdress : 'خونه'} */}
                                    </span>

                                    {/* zare_nk_050421_alaaaaaaaan_st */}
                                    <div style={{
                                        display: 'flex', flexFlow: 'row', width: '100%', marginBottom: '2px',
                                    }}>
                                        <div style={{
                                            display: 'flex', flexFlow: 'row', width: '100%', justifyContent: 'space-between',
                                            // marginTop: '8px',
                                        }}>
                                            <div style={{
                                                display: 'flex', flexFlow: 'row', gap: '.25rem', alignItems: 'center', opacity: '0.5',
                                            }}>
                                                <span style={{
                                                    color: '#53565a', fontSize: '.75rem',
                                                }}>
                                                    موجودی:
                                                </span>
                                                {/* <img src="/images/checkout/motor-peyk.svg" alt="پیک" style={{
                                                    height: '1rem', width: '1',
                                                }} /> */}
                                                <div style={{
                                                    // flex: "1 0 auto", 
                                                    flexGrow: 1,
                                                    flexShrink: 0,
                                                    flexBasis: 'auto',
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-end',
                                                    gap: '.25rem',
                                                }}>
                                                    <span style={{
                                                        lineHeight: '1rem',
                                                        fontSize: '0.75rem',
                                                        fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                        color: '#53565a',
                                                    }}>
                                                        0
                                                    </span>
                                                    <span style={{
                                                        lineHeight: '1rem',
                                                        fontSize: '0.75rem',
                                                        fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                        color: '#53565a',
                                                    }}>
                                                        تومان
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {/* zare_nk_050421_alaaaaaaaan_end */}

                                </div>
                            </div>

                            <Switch
                                // color="primary"
                                // color="secondary"
                                // color="warning"
                                // color="error"
                                // color="info"
                                color="success"
                                checked={switchBtnChecked}
                                onChange={(event) => setSwitchBtnChecked(event.target.checked)}
                                sx={{
                                    width: 46,
                                    height: 24,
                                    padding: 0,

                                    "& .MuiSwitch-switchBase": {
                                        padding: "2px",
                                        transitionDuration: "300ms",
                                    },

                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                        transform: "translateX(20px)",
                                        color: "#fff",
                                    },

                                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                        backgroundColor: "#4caf50",
                                        opacity: 1,
                                    },

                                    "& .MuiSwitch-thumb": {
                                        width: 20,
                                        height: 20,
                                        boxSizing: "border-box",
                                    },

                                    "& .MuiSwitch-track": {
                                        borderRadius: 12,
                                        backgroundColor: "#bdbdbd",
                                        opacity: 1,
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
                {/* zare_nk_050423_added_end */}
                <div className="-mx-4 my-4 h-3 bg-gray-50" style={{
                    backgroundColor: '#f7f7f8', height: '.75rem', margin: '0rem -1rem', width: '450px',
                }}></div>

                <div className="flex flex-col gap-y-4 p-4" style={{
                    display: 'flex', flexFlow: 'column', width: '100%', padding: '1rem 0rem',
                }}>

                    <div className="flex gap-x-2" style={{
                        display: 'flex', flexFlow: 'row', columnGap: '.5rem',
                    }}>
                        <img src="/images/checkout/code-takhfif.svg" alt="کد تخفیف" style={{
                            // height: '1.25rem', width: '1.25rem',
                        }} />
                        <span style={{
                            lineHeight: '1.25rem', fontSize: '.875rem', color: '#1b1c1d',
                            paddingTop: '2px',  ////zare_nk_050423_added
                        }}>
                            افزودن کد تخفیف
                        </span>
                    </div>
                </div>

                <div className="-mx-4 my-4 h-3 bg-gray-50" style={{
                    backgroundColor: '#f7f7f8', height: '.75rem', margin: '0rem -1rem', width: '450px',
                }}></div>

                <div className="flex flex-col gap-y-4 p-4" style={{
                    display: 'flex', flexFlow: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '1rem 0rem', cursor: 'pointer',
                }}>

                    <div className="flex gap-x-2" style={{
                        display: 'flex', flexFlow: 'row', columnGap: '.5rem',
                    }}>
                        <img src="/images/checkout/code-takhfif.svg" alt="کد تخفیف" style={{
                            // height: '1.25rem', width: '1.25rem',
                        }} />
                        <span style={{
                            lineHeight: '1.25rem', fontSize: '.875rem', color: '#1b1c1d',
                            paddingTop: '3px',  ////zare_nk_050423_added
                        }}>
                            مشاهده اقلام
                        </span>
                    </div>
                    <div style={{
                        display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center',
                    }}>
                        <img src="/images/checkout/see-aghlam.svg" alt="کد تخفیف" style={{
                            // height: '1.25rem', width: '1.25rem',
                        }} />
                    </div>
                </div>

                <div className="-mx-4 my-4 h-3 bg-gray-50" style={{
                    backgroundColor: '#f7f7f8', height: '.75rem', margin: '0rem -1rem', width: '450px',
                }}></div>

                {/* zare_nk_050424_added_alan */}

                <div className="flex flex-col gap-y-3 rounded-xl bg-gray-50 p-4 pb-6" style={{
                    // paddingBottom: '1.5rem',  backgroundColor: '#f7f7f8', borderRadius: '.75rem',
                    display: 'flex', width: '100%', flexDirection: 'column', padding: '1rem 0rem', rowGap: '1rem',
                }}>
                    <div style={{
                        display: "flex", flexFlow: 'row', width: '100%', justifyContent: 'start', alignItems: 'center',
                    }}>
                        <span style={{ color: '#1b1c1d', }}>
                            جزئیات پرداخت
                        </span>
                    </div>

                    <div style={{
                        display: 'flex', width: '100%', flexDirection: 'column', rowGap: '.75rem',
                    }}>
                        <div style={{
                            display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', //marginTop: '0.5rem',
                        }}>
                            <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                                <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#64686f', }}>جمع سفارش</span>
                                <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#64686f', }}>(</span>
                                <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#64686f', }}>4</span>
                                <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#64686f', }}>)</span>
                            </div>
                            <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                                <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#313335', }}>{'4600000'.toLocaleString()}</span>
                                <span style={{ fontSize: '0.625rem', color: '#313335', marginRight: '3px', }}>تومان</span>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', //marginTop: '0.5rem',
                        }}>
                            <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                                <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#64686f', }}>مجموع اقلام پس از تخفیف</span>
                            </div>
                            <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                                <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#313335', }}>{'4360000'.toLocaleString()}</span>
                                <span style={{ fontSize: '0.625rem', color: '#313335', marginRight: '3px', }}>تومان</span>
                            </div>
                        </div>

                        {/* <div style={{
                            display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', margin: '.75rem 0px', position: 'relative',
                        }}>
                            <div style={{
                                width: '12px', height: '24px', backgroundColor: 'white', borderColor: '#e0e3e5', borderLeftWidth: '0px', borderWidth: '1px',
                                borderBottomRightRadius: '9999px', borderTopRightRadius: '9999px', left: '-16px', position: 'absolute',
                            }}>
                            </div>

                            <div style={{ borderColor: '#e0e3e5', borderStyle: 'dashed', borderWidth: '1px', width: '100%', }}>
                            </div>

                            <div style={{
                                width: '12px', height: '24px', backgroundColor: 'white', borderColor: '#e0e3e5', borderRightWidth: '0px', borderWidth: '1px',
                                borderBottomLeftRadius: '9999px', borderTopLeftRadius: '9999px', right: '-16px', position: 'absolute',
                            }}>
                            </div>
                        </div> */}

                        <button style={{
                            display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem',
                            border: 'none', backgroundColor: 'inherit', cursor: 'pointer', padding: '0px',
                        }}>
                            <div style={{
                                display: 'flex', flexFlow: 'row', alignItems: 'center', direction: 'rtl', color: '#313335',
                                minWidth: '124px', maxWidth: '256px', gap: '0.25rem',
                            }}>
                                <span style={{ textAlign: 'right', color: '#059464', fontSize: '.875rem', lineHeight: '1.25rem', }}>سود شما از این خرید</span>
                                <img src="/images/cartDetails/sood-kharid.svg" alt="ادرس ها" style={{ height: '1rem', width: '1rem', }} />
                            </div>

                            <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                                <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#059464', }}>{'4360000'.toLocaleString()}</span>
                                <span style={{ fontSize: '0.625rem', color: '#059464', marginRight: '3px', }}>تومان</span>
                            </div>
                        </button>

                        <div style={{
                            display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', //marginTop: '0.5rem',
                        }}>
                            <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                                <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#64686F', }}>هزینه ارسال</span>
                            </div>
                            <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                                <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#313335', }}>{'37000'.toLocaleString()}</span>
                                <span style={{ fontSize: '0.625rem', color: '#313335', marginRight: '3px', }}>تومان</span>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', //marginTop: '0.5rem', 
                        }}>
                            <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                                <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#64686F', }}>هزینه خدمات</span>
                            </div>
                            <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                                <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#313335', }}>رایگان</span>
                                {/* <span style={{ fontSize: '0.625rem', color: '#313335', marginRight: '3px', }}>تومان</span> */}
                            </div>
                        </div>

                        <div style={{
                            display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', //marginTop: '0.5rem',
                        }}>
                            <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                                <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#64686F', }}>هزینه بسته‌بندی</span>
                            </div>
                            <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                                <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#313335', }}>{'5000'.toLocaleString()}</span>
                                <span style={{ fontSize: '0.625rem', color: '#313335', marginRight: '3px', }}>تومان</span>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', //marginTop: '0.5rem',
                        }}>
                            <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                                <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#000000', }}>مبلغ قابل پرداخت</span>
                            </div>
                            <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                                <span style={{ fontSize: '1rem', lineHeight: '1.5rem', color: '#000000', }}>{'1678250'.toLocaleString()}</span>
                                <span style={{ fontSize: '0.625rem', color: '#313335', marginRight: '3px', }}>تومان</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* zare_nk_050424_added_alan */}

                {/* zare_nk_050413_added_end(berim mohtavaye checkout) */}
            </main >

            <footer style={{
                maxWidth: '450px', marginLeft: 'auto', marginRight: 'auto', zIndex: 50, bottom: 0, left: 0, right: 0, position: 'fixed',
            }}>
                <div style={{
                    position: 'relative',
                    boxShadow: '0px 10px 15px -3px #0000001a',
                    opacity: 1, backgroundColor: 'white', borderTopLeftRadius: '.375rem', borderTopRightRadius: '.375rem', overflow: 'hidden', height: '100%',

                    paddingBottom: '1.5rem', padding: '1rem',
                }}>
                    <button onClick={() => {
                        // goToCartDetails(Number(vendorId), 67476);
                    }} style={{
                        color: 'white', fontSize: '1rem', lineHeight: '1.5rem', backgroundColor: '#ff5900', borderRadius: '.75rem',
                        display: 'flex', justifyContent: 'end', alignItems: 'center', width: '100%', height: '3.5rem', position: 'relative',
                        cursor: 'pointer', direction: 'rtl', border: 'none', minWidth: '.25rem', padding: '0rem',
                    }}>
                        <div
                            // style={{ flexShrink: 0, gap: '.5rem', justifyContent: 'space-between', alignItems: 'center', display: 'flex', }}
                            style={{
                                display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'absolute',
                            }}>
                            <span style={{ color: "white" }}>پرداخت</span>
                        </div>

                        <div style={{
                            fontSize: '.875rem', lineHeight: '1.25rem', display: 'flex', flexFlow: 'row', alignItems: 'center', gap: '2px', marginLeft: '1rem',
                        }}>
                            <span style={{
                                color: 'white', fontSize: '.875rem', lineHeight: '1.25rem',
                            }}>
                                {'612000'.toLocaleString()}
                            </span>
                            <span style={{ color: 'white', fontSize: '.625rem', }}>
                                تومان
                            </span>
                        </div>
                    </button>
                </div>
            </footer>

            <div className="tabIndexOne-in-LayoutWrapper" tabIndex={1}>
            </div>
        </div >
    );
}