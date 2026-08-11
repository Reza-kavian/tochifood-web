// ////zare_nk_050428_okk(2)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, memo, RefObject, ReactNode, ChangeEvent, MouseEvent } from "react";
import { useRouter, useSearchParams, redirect, useParams, } from "next/navigation";

import globalsStyles from "@/styles/components/globals.module.css";

import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import SwiperInVendorScrollTabComp from '../../../components/SwiperInVendorScrollTabComp';
import GetScrollsSecInVendor from '../../../components/GetScrollsSecInVendor';
import SwiperBordBordInVendorComp from '../../../components/SwiperBordBordInVendorComp';

import { NextJsApiUrl } from "../../../constants/Urls";

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

////zare_nk_050417_added_st(for add ren buttons)
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

////zare_nk_050417_added_end(for add rem buttons)

////zare_nk_050405_nokteh_st(rahe1- baraye serverComponent)
// type Props2 = {
//     params: Promise<{
//         vendorId: string;
//     }>;
// };
// export default async function VendorPage({ params }: Props2) { 
// // const { vendorId } = await params;
////zare_nk_050405_nokteh_end(rahe1- baraye serverComponent)
////zare_nk_050405_nokteh_st(rahe2- baraye serverComponent)
export default function VendorPage() {
    const { vendorId } = useParams();
    // const params = useSearchParams();   ////zare_nk_050416_commented(chon az safheye shopping-basket ke ba inja nemiam ke idTitr ra pas bedim,balke az safheye vendorsList miaim ke sabadkharidTitr ro nadare ke be parametrhaye urle in safhe ersal koneh)
    // const idTitr = params.get("idTitr") || "Unknown";   ////zare_nk_050416_commented(chon az safheye shopping-basket ke ba inja nemiam ke idTitr ra pas bedim,balke az safheye vendorsList miaim ke sabadkharidTitr ro nadare ke be parametrhaye urle in safhe ersal koneh)

    ////zare_nk_050405_nokteh_end(rahe2- baraye serverComponent)
    console.log('050329-VendorPage rendered!!-vendorId: ' + vendorId);   ////zare_nk_050329_added
    // ////zare_nk_050404_added_st

    const [errorInVendorPage, setErrorInVendorPage] = useState<string | null>(null);

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

    const [currentShobeState, setCurrentShobeState] = useState<responsedListFromApiSelectShobehAtrafUserType | null>(null);

    const [mycurrentAddressState, setMycurrentAddressState] = useState<responsedListFromApiSelectAddressListType | null>(null);

    ////zare_nk_050417_added_st 
    const [sabadTitr, setSabadTitr] = useState<SabadTitrType[] | null>(null);
    // const [sabadRows, setSabadRows] = useState<SabadRowType[]>([]); ////zare_nk_050417_commented_st 

    const [jamKol, setJamKol] = useState<number | null>(null);
    const [jamKolTakhfif, setJamKolTakhfif] = useState<number | null>(null);
    const [jamKolNahaei, setJamKolNahaei] = useState<number | null>(null);
    const [idSabadKharidTitr, setIdSabadKharidTitr] = useState<number | null>(null);

    // const refForfather = useRef<string | null>(null);  ////zare_nk_050417_added(dar sabade food karbord nadareh,baraye marja boodane componente MiddleCountTedadSefr gozashtam)

    const [isOpenedMymodalForWarning, setIsOpenedMymodalForWarning] = useState(false);
    const [warningTextInMymodalForWarning, setWarningTextInMymodalForWarning] = useState('');

    ////zare_nk_050417_added_end

    ////zare_nk_050416_commented_st
    // type responsedListFromApiSelectKalaShobehType = {
    //     IdKala: number;
    //     BarcodeKala: number;
    //     IdBerand: number;
    //     IdTaminkonnande: number;
    //     IdShobe: number;
    //     NameSobe: string;
    //     // .
    //     // .
    //     // .
    //     [key: string]: any;
    // };
    // const [responsedListFromApiSelectKalaShobeh, SetResponsedListFromApiSelectKalaShobeh] = useState<responsedListFromApiSelectKalaShobehType[] | null>(null);   

    // const getVendorPage = async () => {
    //     let token = await getCookie("token");
    //     if (!token) {
    //         setErrorInVendorPage("lotfan avval online shid");
    //         return;
    //     }
    //     // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented
    //     let ApiUrl = NextJsApiUrl; ////zare_nk_050407_added
    //     const response = await fetch(ApiUrl + "Api_SelectKalaShobeh", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: "Bearer " + token,
    //         },
    //         body: JSON.stringify({
    //             // "IdShobeh": 6,
    //             IdShobeh: vendorId,
    //             // page: 1,
    //             // take: 3,
    //         }),
    //     });
    //     const data = await response.json();
    //     console.log('datadatadata: ' + JSON.stringify(data));
    //     if (response.ok) {
    //         if (data.status == 0) {
    //             if (data.data.list == undefined) {
    //                 return;
    //             }
    //             var parsedList = JSON.parse(data.data.list);

    //             SetResponsedListFromApiSelectKalaShobeh(() => {
    //                 return parsedList
    //             });
    //         } else {
    //             setErrorInVendorPage("متاسفانه خطایی رخ داده است34:" + data.errors);
    //             console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
    //         }
    //     } else {
    //         console.log("zare_nk_050110-!response.ok" + response.ok);
    //         setErrorInVendorPage("متاسفانه خطایی رخ داده است35");
    //     }
    // }
    ////zare_nk_050416_commented_end

    useEffect(() => {
        const tempAsync = async () => {
            const currentShobe = await getCookie("currentShobe");
            var parsedurrentShobe: responsedListFromApiSelectShobehAtrafUserType | null = currentShobe ? JSON.parse(currentShobe) : null;
            setCurrentShobeState(parsedurrentShobe);
        }
        tempAsync();

        // getVendorPage();  ////zare_nk_050416_commented
        ////zare_nk_050417_added_st 

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
                var urlSelectSabadTitr = NextJsApiUrl + "Api_SelectSabadKharidTitr";

                const response = await fetch(urlSelectSabadTitr, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify({
                        // IdShobeh: vendorId,  ////zare_nk_050414_commented(chon mikhaim sabade hameye shobeha ro biareh baraye karbar)        
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
                        setIdSabadKharidTitr(IdSabadKharidTitr);  ////zare_nk_050417_added
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
        ////zare_nk_050417_added_end
    }, []);

    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const [activeTab, setActiveTab] = useState<string | null>(null);

    const scrollToSection = useCallback(
        (id: string) => {
            console.log('050405-scrollToSection called!!-id: ' + id);
            console.log('050405-scrollToSection called!!-sectionRefs.current[id] : ' + sectionRefs.current[id]);
            const section = sectionRefs.current[id];
            if (!section) return;

            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
        , [activeTab]);

    useEffect(() => {
        const HEADER_HEIGHT = 40;
        const handleScroll = () => {
            let currentSection = "";
            Object.values(sectionRefs.current).forEach((section) => {
                if (!section) return;

                const rect = section.getBoundingClientRect();  ////zare_nk_050405_nokteh(mogheiyate section ra nesbat be viewport dar har scroll midahad)

                console.log('050405-rect: ' + JSON.stringify(rect));
                ////050405-rect: {"x":612,"y":336,"width":446,"height":300,"top":336,"right":1058,"bottom":636,"left":612}

                if (rect.top <= HEADER_HEIGHT + 5) {  ////zare_nk_050405_nokteh(5 pixel ra baraye teloranse gozashtim)
                    console.log('050405-rect if bargharare-section.id: ' + section.id);
                    currentSection = section.id;
                }
            });

            if (currentSection !== "" && currentSection !== activeTab) {
                setActiveTab(currentSection);
            }
        };

        window.addEventListener("scroll", handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [activeTab]);
    ////zare_nk_050405_added_end

    const goToCartDetails = async (IdShobe: number, IdSabadKharidTitr: number) => {
        alert('goToCartDetails-IdShobe: ' + IdShobe);
        //  router.push(`/vendor/${IdShobe}/cart-details`); 
        router.push(`/vendor/${IdShobe}/cart-details?idTitr=${IdSabadKharidTitr}`);
    }

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
    ////zare_nk_050416_added_end(baraye add va rem va ...)

    return (
        <div style={{
            // backgroundColor: 'white', 
            width: '100%',
            // height: '100%',  ////height :100% dorost nist, chon shayad dar layout alaveh ba children satrhaye dife ham dashe bashim(mesle footer va header va...)
            display: "flex",
            flexDirection: 'column',
            // border: '3px solid orange',
            position: 'relative',  ////zare_nk_050404_added
            flex: '1 1 auto',  ////zare_nk_050514_added
        }}>
            <header style={{
                position: 'sticky',
                top: '0px',
                // boxShadow: '0px 4px 20px 0px #0000000f',
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '5px',
                paddingBottom: '5px',
                zIndex: 899,
                // backgroundColor: 'white',
                // border: '1px dashed red',
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
                        }}>
                        <img
                            src="/images/Icon/back-icon.svg"
                            alt="بازگشت"
                            style={{ width: '1.5rem', height: '1.5rem', }}
                        />
                    </button>

                    {/* <div style={{
                        display: 'flex',
                        flexFlow: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // border: '1px dashed orange',
                    }}>
                        فروشگاه‌های اطراف
                    </div>                    
                    <button
                        id="goShoppingBacketBtn"
                        // onClick={showAddressListDrawer}
                        //   onClick={() => { setError('goooo!!') }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'inherit',
                            border: 'none',
                            // border: '2px dashed green',
                            fontSize: '.875rem',
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '9999px',
                            cursor: 'pointer',
                        }}>
                        <img
                            src="/images/header/shoppingBacket.svg"
                            alt="سبد خرید"
                        />
                    </button> */}
                </div>

                {/* <div
                    style={{
                        display: 'flex',
                        flexFlow: 'row-reverse',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingRight: '0.375rem',
                        paddingLeft: '0.375rem',
                        // border: '1px dashed yellow',
                        width: '100%',
                        cursor: 'grab',
                    }}>
                    <SwiperInVendorHeaderComp
                        openCollapseForSorting={openCollapseForSorting}
                        openCollapseForRaveshErsal={openCollapseForRaveshErsal}
                    />
                </div> */}
            </header >

            <main style={{
                backgroundColor: 'white',
                // height: '100dvh',   ////zare_nk_050317_commented(A001-ba A002 tadakhol dareh)
                width: '100%',
                display: "flex",
                flexDirection: 'column',
                // overflow: 'hidden',        ////zare_nk_050317_commented(A002-ba A001 tadakhol dareh)
                // justifyContent: 'center',  ////zare_nk_050229_nokteh(be lahaze amoodi vasat chin mikoneh mohtavaye safheh ro ke ma inro nemikhaim)
                alignItems: 'center',
                flex: '1 0 auto',
                // border: '3px dashed orange',
                direction: 'rtl',
                position: 'absolute',  ////zare_nk_050404_added   
                top: '0px ',  ////zare_nk_050404_added      

                paddingBottom: '96px',  ////zare_nk_050421_added
            }}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'row',
                    // border: '2px solid red',
                    position: 'relative',
                }}>
                    {/* {responsedListFromApiSelectKalaShobeh && ( */}
                    {currentShobeState && (
                        <img
                            style={{
                                width: '100%',
                                height: '230px',
                                objectFit: 'cover',
                            }}
                            // src={`https://img.tochikala.com/Product/${currentShobeState.IdKala}.webp`} />   ////zare_nk_050416_nookteh(ehtemalan bayad logoye restaurant ha ro ham dashteh bashim badan)
                            src={`/images/movaghat/vendorPage/1.jpg`} />
                    )}
                    <div style={{
                        position: 'absolute', bottom: '-15px', right: '.8rem',
                        width: '4rem', height: '4rem',
                    }}>
                        <img style={{
                            width: '100%', height: '100%',
                            objectFit: 'cover',
                            borderRadius: '.5rem',
                            // border: '1px solid #efefef',
                        }} src={`/images/movaghat/vendorPage/tupchi-tag.jpg`} />
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    flexFlow: 'column',
                    // border: '1px dashed red',
                    width: '100%',
                    paddingTop: '1rem',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    backgroundColor: 'white',
                    borderTopLeftRadius: '.75rem',
                    borderTopRightRadius: '.75rem',
                    gap: '.5rem',
                }}>
                    <div style={{
                        display: 'flex', flexFlow: 'row', justifyContent: 'start', alignItems: 'center',
                        // border: '1px dashed red', 
                        width: '100%', marginTop: '.5rem',
                    }}>
                        <h2 style={{
                            fontSize: '1.25rem', fontFamily: "'IRANSansWeb_Bold(adad_fa)'",
                            margin: '0rem',
                        }}>
                            {/* فست&zwnj;فود توپچی */}
                            {/* {responsedListFromApiSelectKalaShobeh &&
                                responsedListFromApiSelectKalaShobeh[0].NameSobe
                            } */}
                            {currentShobeState &&
                                currentShobeState.NameSobe
                            }
                        </h2>
                    </div>

                    <div style={{
                        display: 'flex', flexFlow: 'row', width: '100%', justifyContent: 'space-between', marginTop: '.5rem',
                    }}>
                        <div style={{
                            display: 'flex', flexFlow: 'row', gap: '0.25rem', alignItems: 'center',
                        }}>
                            <img
                                src="/images/movaghat/SwiperTapBests/star/orange-star.svg"
                                alt="علاقه مندی"
                                style={{ width: '1rem', height: '1rem', }}
                            />
                            <p style={{
                                color: '#000000',
                                fontSize: '1rem',
                                margin: '0px',

                            }}>4.5</p>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexFlow: 'row',
                            alignItems: 'center',
                            direction: 'rtl',
                            color: '#313335',
                            minWidth: '124px',
                            maxWidth: '256px',
                            gap: '0.25rem',
                        }}>
                            <span style={{
                                textAlign: "right",
                                color: '#ff5900',
                                fontSize: '.875rem',
                                lineHeight: '1.25rem',
                            }}>
                                اطلاعات و نظرات
                            </span>
                            <img
                                src="/images/movaghat/vendorPage/inf-anf-comments.svg"
                                alt=" ادرس ها" />
                        </div>
                    </div>

                    <div style={{
                        display: 'flex', flexFlow: 'row', width: '100%', justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: '1rem',
                        paddingTop: '1rem',
                        padding: '.5rem',
                        backgroundColor: '#f2f5f7',
                        borderRadius: '.5rem',
                        gap: '.75rem',
                        minHeight: '70px',
                        marginTop: '.5rem',
                        // border: '2px dashed red',
                    }}>
                        <div style={{
                            borderLeft: '1px solid #e0e3e5',
                            display: 'flex',
                            flexFlow: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '.25rem',
                            height: '100%',
                            width: '100%',
                        }}>
                            <span style={{
                                color: '#313335', fontSize: '.75rem',
                                lineHeight: '1rem',
                            }}>پیک توچی فود</span>
                            <div style={{
                                fontSize: '.875rem',
                                lineHeight: '1.25rem',
                                display: 'flex',
                                flexFlow: 'row',
                                alignItems: 'center',
                                gap: '.25rem',
                            }}>
                                {currentShobeState?.Keraye != 0 ?
                                    <>
                                        <span style={{
                                            color: '#000000', fontSize: '.875rem',
                                            lineHeight: '1.25rem',
                                        }}>32.800</span>

                                        <span style={{
                                            color: '#63676e', fontSize: '.875rem',
                                            lineHeight: '1.25rem',
                                        }}>تومان</span>
                                    </> : <>
                                        <span style={{
                                            color: '#63676e', fontSize: '.875rem',
                                            lineHeight: '1.25rem',
                                        }}>رایگان</span>
                                    </>
                                }
                            </div>
                        </div>

                        <div style={{
                            borderLeft: '1px solid #e0e3e5',
                            display: 'flex',
                            flexFlow: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '.25rem',
                            height: '100%',
                            width: '100%',
                        }}>
                            <span style={{
                                color: '#313335', fontSize: '.75rem',
                                lineHeight: '1rem',
                            }}>زمان تحویل</span>
                            <div style={{
                                fontSize: '.875rem',
                                lineHeight: '1.25rem',
                                display: 'flex',
                                flexFlow: 'row',
                                alignItems: 'center',
                                gap: '.25rem',
                            }}>
                                {currentShobeState?.NazdikTarinZamanErsal &&
                                    <>
                                        <span style={{
                                            color: '#63676e', fontSize: '.875rem',
                                            lineHeight: '1.25rem',
                                        }}>
                                            {currentShobeState.NazdikTarinZamanErsal}
                                        </span>
                                    </>
                                }
                                {/* <span style={{
                                    color: '#313335', fontSize: '.875rem',
                                    lineHeight: '1.25rem',
                                }}>تا</span>

                                <span style={{
                                    color: '#000000', fontSize: '1rem',
                                    lineHeight: '1.5rem',
                                }}>50</span>

                                <span style={{
                                    color: '#313335', fontSize: '.875rem',
                                    lineHeight: '1.25rem',
                                }}>دقیقه</span> */}
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            flexFlow: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '.25rem',
                            height: '100%',
                            width: '100%',
                        }}>
                            <span style={{
                                color: '#313335', fontSize: '.75rem',
                                lineHeight: '1rem',
                            }}>
                                حداقل مبلغ خرید
                            </span>
                            <div style={{
                                fontSize: '.875rem',
                                lineHeight: '1.25rem',
                                display: 'flex',
                                flexFlow: 'row',
                                alignItems: 'center',
                                gap: '.25rem',
                            }}>
                                {currentShobeState?.KafKharid ?
                                    <>
                                        <span style={{
                                            color: '#000000', fontSize: '.875rem',
                                            lineHeight: '1.25rem',
                                        }}>
                                            {currentShobeState.KafKharid}
                                        </span>

                                        <span style={{
                                            color: '#63676e', fontSize: '.875rem',
                                            lineHeight: '1.25rem',
                                        }}>تومان</span>
                                    </> :
                                    <span style={{
                                        color: '#000000', fontSize: '.875rem',
                                        lineHeight: '1.25rem',
                                    }}>
                                        0
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    paddingTop: '.5rem', marginTop: '.5rem', backgroundColor: '#fff7ec', display: 'flex', flexFlow: 'column', width: '100%', height: 'min-content',
                    paddingBottom: '10px',
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
                            <span>مشاهده همه</span>
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

                <div style={{
                    display: 'flex',
                    flexFlow: 'column', width: '100%', height: 'min-content', paddingTop: '.5rem', marginTop: '.5rem', //backgroundColor: '#fff7ec',
                }}>
                    <div style={{
                        display: 'flex',
                        flexFlow: 'row-reverse',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingRight: '0.375rem',
                        paddingLeft: '0.375rem',
                        // border: '1px dashed black',
                        width: '100%',
                        cursor: 'grab',

                        position: 'sticky',
                        top: '0px',
                        backgroundColor: 'white',

                        height: '60px',   ////zare_nk_050407_added
                        zIndex: 2,
                    }}>
                        <SwiperInVendorScrollTabComp
                            // openCollapseForSorting={openCollapseForSorting}
                            // openCollapseForRaveshErsal={openCollapseForRaveshErsal}
                            scrollToSection={scrollToSection}
                            activeTab={activeTab}
                            IdShobe={currentShobeState?.IdShobe}
                        />
                    </div>

                    <div style={{
                        width: '100%',
                        display: "flex",
                        flexDirection: 'column',
                        // border: '1px dashed blue',
                        // marginTop: '100px',
                    }}>
                        <GetScrollsSecInVendor
                            sectionRefs={sectionRefs}

                            IdSabadKharidTitr={idSabadKharidTitr ? idSabadKharidTitr : null}

                            setJamKol={setJamKol}
                            setJamKolTakhfif={setJamKolTakhfif}
                            setJamKolNahaei={setJamKolNahaei}
                        // MiddleCountTedadSefr={MiddleCountTedadSefr}
                        // refForfather={refForfather}
                        // sabadRows={sabadRows}
                        // handlerForAddClick={handlerForAddClick}
                        // handlerForRemClick={handlerForRemClick}
                        />

                        {/* <div
                            id="111"
                            style={{
                                width: '100%',
                                display: "flex",
                                flexDirection: 'column',
                                border: '1px dashed black',
                                height: '300px',
                                marginTop: '200px',
                                scrollMarginTop: "40px",
                            }} 
                            ref={(el) => {
                                sectionRefs.current["111"] = el;
                            }}
                        >
                            <h2>1111</h2>
                        </div>

                        <div
                            id="222"
                            style={{
                                width: '100%',
                                display: "flex",
                                flexDirection: 'column',
                                border: '1px dashed black',
                                height: '300px',
                                scrollMarginTop: "40px",
                            }} 
                            ref={(el) => {
                                sectionRefs.current["222"] = el;
                            }}
                        >
                            <h2>2222</h2>
                        </div>

                        <div
                            id="333"
                            style={{
                                width: '100%',
                                display: "flex",
                                flexDirection: 'column',
                                border: '1px dashed black',
                                height: '300px',
                                scrollMarginTop: "40px",
                            }} 
                            ref={(el) => {
                                sectionRefs.current["333"] = el;
                            }}
                        >
                            <h2>3333</h2>
                        </div>

                        <div
                            id="444"
                            style={{
                                width: '100%',
                                display: "flex",
                                flexDirection: 'column',
                                border: '1px dashed black',
                                height: '300px',
                                scrollMarginTop: "40px",
                            }} 
                            ref={(el) => {
                                sectionRefs.current["444"] = el;
                            }}
                        >
                            <h2>4444</h2>
                        </div> */}

                    </div>
                </div>

                {/* <div style={{
                    position: 'sticky',
                    bottom: '0px',
                    width: '100%',
                }}>
                    <button
                        onClick={() => {
                            goToCartDetails(Number(vendorId), 67476);
                        }}>
                        برو سبد
                    </button>

                </div> */}

            </main>

            <footer style={{
                maxWidth: '450px', marginLeft: 'auto', marginRight: 'auto', zIndex: 50, bottom: 0, left: 0, right: 0, position: 'fixed',
            }}>
                <div style={{
                    position: 'relative',
                    boxShadow: '0px 10px 15px -3px #0000001a',
                    opacity: 1, backgroundColor: 'white', borderTopLeftRadius: '.375rem', borderTopRightRadius: '.375rem', overflow: 'hidden', height: '100%',

                    paddingBottom: '1.5rem', padding: '1rem',
                }}>

                    <button
                        onClick={() => {
                            goToCartDetails(Number(vendorId), 67476);
                        }} style={{
                            color: 'white',
                            fontSize: '1rem',
                            lineHeight: '1.5rem', padding: '1rem', backgroundColor: '#ff5900', borderRadius: '.75rem',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '3.5rem', position: 'relative', cursor: 'pointer',
                            direction: 'rtl', border: 'none',

                            minWidth: '.25rem',
                        }}>
                        <div style={{ flexShrink: 0, gap: '.5rem', justifyContent: 'space-between', alignItems: 'center', display: 'flex', }}>
                            <span style={{
                                color: '#ff5900', fontSize: '.75rem',
                                lineHeight: '1rem', backgroundColor: 'white', borderRadius: '9999px', justifyContent: 'center', alignItems: 'center', height: '1.25rem',
                                width: '1.25rem', display: 'flex',

                            }}>3</span>
                            <span style={{ color: "white" }}>مشاهده سبد</span>
                        </div>

                        <div style={{
                            fontSize: '.875rem',
                            lineHeight: '1.25rem',
                            display: 'flex',
                            flexFlow: 'row',
                            alignItems: 'center',
                            gap: '2px',
                        }}>
                            <span style={{
                                color: 'white', fontSize: '.875rem',
                                lineHeight: '1.25rem',
                            }}>
                                {jamKolNahaei &&
                                    jamKolNahaei.toLocaleString()
                                }
                            </span>

                            <span style={{
                                color: 'white', fontSize: '.625rem',
                            }}>تومان</span>
                        </div>


                    </button>
                </div>
            </footer>

            <div className="tabIndexOne-in-LayoutWrapper" tabIndex={1}>
            </div>
        </div>
    );
}