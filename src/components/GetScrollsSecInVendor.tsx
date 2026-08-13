////zare_nk_050522_okk(1)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, memo, RefObject, ReactNode, ChangeEvent, MouseEvent } from "react";
import { useRouter, useSearchParams, redirect, useParams, } from "next/navigation";
import Styles from "@/styles/components/location.module.css";
import globalsStyles from "@/styles/components/globals.module.css";

import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { Collapse, Button, Box, Paper, Typography, Grow, ClickAwayListener, Drawer } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import { useAuthentication } from '../context/AuthenticationContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from "next/link";
import { red } from "@mui/material/colors";

import { NextJsApiUrl } from "../constants/Urls";  ////zare_nk_050407_added

import AddRemBtnsAndCountPackege from './addRemBtnsAndCountPackege'; ////zare_nk_050417_added

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

const GetScrollsSecInVendor = ({
    sectionRefs,
    IdSabadKharidTitr,
    setJamKol,
    setJamKolTakhfif,
    setJamKolNahaei,
}: {
    sectionRefs: RefObject<Record<string, HTMLDivElement | null>>;
    IdSabadKharidTitr: number | null;
    setJamKol: React.Dispatch<React.SetStateAction<number | null>>;
    setJamKolTakhfif: React.Dispatch<React.SetStateAction<number | null>>;
    setJamKolNahaei: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
    const { vendorId } = useParams();  ////zare_nk_050416_nokteh(ehtemalan chon Componente GetScrollsSecInVendor joze farzandane safheye [vendorId]/page.tsx hast, pas be useParams 
    //// jaddesh dastresi dareh, va niazi be pas dadane parametr be Componente farzand ya tarife useContext nist baraye dastresi dar farzand)
    console.log('050329-GetScrollsSecInVendor rendered!!-vendorId isss: ' + Number(vendorId));

    const [errorInGetScrollsSecInVendor, setErrorInGetScrollsSecInVendor] = useState<string | null>(null);

    const router = useRouter();

    const [isOpenedMymodalForWarning, setIsOpenedMymodalForWarning] = useState(false);
    const [warningTextInMymodalForWarning, setWarningTextInMymodalForWarning] = useState('');

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
    };

    type InputDataType = {
        IdShobeh: number;
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
        IdShobeh: Number(vendorId),
        // IsJashnvareh: 1,  ////zare_nk_050416_nokteh(baraye switch beine satrhaye kam va satrhaye ziad dar pasokhe api baraye lezat az enetaf va sorate site!)
        IsJashnvareh: -1,    ////zare_nk_050416_nokteh(baraye switch beine satrhaye kam va satrhaye ziad dar pasokhe api baraye lezat az enetaf va sorate site!)
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

    // const [mycurrentAddressState, setMycurrentAddressState] = useState<responsedListFromApiSelectAddressListType | null>(null);  ////zare_nk_050510_commented
    const refForMycurrentAddressState = useRef<responsedListFromApiSelectAddressListType | null>(null);  ////zare_nk_050510_added

    // const [responsedListFromApiSelectKalaShobeh, SetResponsedListFromApiSelectKalaShobeh] = useState<ForCartContInProdDetValType[] | null>(null);
    const [responsedListFromApiSelectKalaShobeh, SetResponsedListFromApiSelectKalaShobeh] = useState<ForCartContInProdDetValType[]>([]);
    // const [responsedListFromApiSelectKalaShobeh, SetResponsedListFromApiSelectKalaShobeh] = useState<Record<number, ForCartContInProdDetValType > | null>(null);
    console.log('050417-responsedListFromApiSelectKalaShobeh is: ' + JSON.stringify(responsedListFromApiSelectKalaShobeh));
    const [sabadRows, setSabadRows] = useState<SabadRowType[]>([]);
    // console.log('050417-sabadRows is: ' + JSON.stringify(sabadRows));
    const refForfather = useRef<string | null>(null);  ////zare_nk_050417_added(dar sabade food karbord nadareh, baraye marja boodane componente MiddleCountTedadSefr gozashtam)

    const getResponsedListFromApiSelectKalaShobeh = async () => {
        let token = await getCookie("token");
        if (!token) {
            setErrorInGetScrollsSecInVendor("lotfan avval online shid");
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
            console.log("zare_nk_050228-data: " + JSON.stringify(data));
            if (data.status == 0) {
                if (data.data.list == undefined) {
                    return;
                }
                var parsedList = JSON.parse(data.data.list);
                console.log('050405-parsedList: ' + JSON.stringify(parsedList));
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
                            if (item.MaxTedad <= item.TedadDarSabad) {
                                bishAzMaxTedadYaMojoodi = 1;
                            }
                            if (item.Mojoodi <= item.TedadDarSabad) {
                                bishAzMaxTedadYaMojoodi = 1;
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
                            })
                        })
                    )
                });
                ////zare_nk_050417_commented_end
            } else {
                setErrorInGetScrollsSecInVendor("متاسفانه خطایی رخ داده است34:" + data.errors);
                console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
            }
        } else {
            console.log("zare_nk_050110-!response.ok" + response.ok);
            setErrorInGetScrollsSecInVendor("متاسفانه خطایی رخ داده است35");
        }
    }

    useEffect(() => {
        async function asyncTempFunc() {
            const chosenAddress = await getCookie("chosenAddress");
            var parsedChosenAddress: responsedListFromApiSelectAddressListType | null = chosenAddress ? JSON.parse(chosenAddress) : null;
            // setMycurrentAddressState(parsedChosenAddress);   ////zare_nk_050510_commented(chon dar daome jsx az parsedChosenAddress estefadeh nakardim ke be reRender niazi bashe va az setStae estefadeh konim(pas useRef bekhatere adame reRender kardane component manteghitare inja))
            refForMycurrentAddressState.current = parsedChosenAddress;   ////zare_nk_050510_commented(chon dar daome jsx az parsedChosenAddress estefadeh nakardim ke be reRender niazi bashe va az setStae estefadeh konim(pas useRef bekhatere adame reRender kardane component manteghitare inja))

            getResponsedListFromApiSelectKalaShobeh();
        }
        asyncTempFunc();
    }, []);

    useEffect(() => {
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
            var urlSelectSabad = NextJsApiUrl + "Api_SelectSabadKharidSatr";
            const response = await fetch(urlSelectSabad, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    IdShobe: vendorId,
                    IdSabadKharidTitr: IdSabadKharidTitr,  ////zare_nk_050416_added
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
                                var bishAzMaxTedadYaMojoodi = 0;
                                if (item.MaxTedad <= item.Tedad) {
                                    bishAzMaxTedadYaMojoodi = 1;
                                }
                                if (item.Mojoodi <= item.Tedad) {
                                    bishAzMaxTedadYaMojoodi = 1;
                                }

                                let ForCartContentsDesignTypeLet = 0

                                if (item.Tedad == 0) {
                                    ForCartContentsDesignTypeLet = 0;
                                }
                                else if (item.Tedad > item.ZaribForoosh) {
                                    ForCartContentsDesignTypeLet = 2;
                                }
                                else if (item.Tedad == item.ZaribForoosh) {
                                    ForCartContentsDesignTypeLet = 1;
                                }

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
                                    bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,  ////zare_nk_050416_added
                                    fromShowDetails: false,
                                    ForCartContentsDesignType: ForCartContentsDesignTypeLet,  ////zare_nk_050416_added
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
    }, [IdSabadKharidTitr]);

    // let grouped:ForCartContInProdDetValType[] | null = null;
    // let grouped: Record<number, ForCartContInProdDetValType> | null = null;
    // if (responsedListFromApiSelectKalaShobeh) {
    //     grouped = Object.groupBy(
    //         responsedListFromApiSelectKalaShobeh,
    //         item => item.IdKala
    //     );
    // }

    let grouped: Partial<Record<number, ForCartContInProdDetValType[]>> | null = null;
    if (responsedListFromApiSelectKalaShobeh) {
        console.log('050405-responsedListFromApiSelectKalaShobeh called!!');
        grouped = Object.groupBy(
            responsedListFromApiSelectKalaShobeh,
            item => item.IdG1
        );
        console.log('050405-responsedListFromApiSelectKalaShobeh called!!grouped: ' + JSON.stringify(grouped));
        console.log('050405-responsedListFromApiSelectKalaShobeh.l:' + responsedListFromApiSelectKalaShobeh.length +
            '-responsedListFromApiSelectKalaShobeh2: ' + JSON.stringify(responsedListFromApiSelectKalaShobeh));
    }
    else {
        console.log('050405-responsedListFromApiSelectKalaShobeh called!!');
    }

    async function addToCartInIndex(
        addRemParam: addRemParamType,
    ) {
        console.log('040517-addToCartInIndex called!-addRemParam is: ' + JSON.stringify(addRemParam));
        // console.log('041120-addToCartInIndex called!-addRemParam: ' + JSON.stringify(addRemParam)); //zare_nk_041120_commented(error mideh:    // console.log('041120-addToCartInIndex called!-addRemParam: ' + JSON.stringify(addRemParam)); //zare_nk_041120_commented_tahlilshe(error mideh:TypeError: Converting circular structure to JSON)
        ////zare_nk_050416_commented_st
        // if (addRemParam.event != null) {
        //   addRemParam.event.stopPropagation();
        //   addRemParam.event.preventDefault();
        // }
        ////zare_nk_050416_commented_end
        const token = getCookie("token");
        if (token == null) {
            setIsOpenedMymodalForWarning(true);
            setWarningTextInMymodalForWarning("لطفا ابتدا وارد حساب کاربری خود شوید");
            ////zare_nk_041129_commented_st
            //   const bootstrap = await getBootstrap();
            //   const mymodalForWarning = new bootstrap.Modal(
            //     document.getElementById("mymodalForWarning")
            //   );
            //   mymodalForWarning.show();
            //   const span = document.querySelector(
            //     "#mymodalForWarning .errorInMymodalForWarning"
            //   );
            //   if (span instanceof HTMLElement) {
            //     span.innerText = "لطفا ابتدا لاگین شوید";
            //   }
            ////zare_nk_041129_commented_end
            return;
        }

        try {
            console.log('041120-addToCartInIndex-else 1');
            var TedadOut = 0;
            const zarib = parseFloat(String(addRemParam.ZaribForoosh ?? 0));
            TedadOut = addRemParam.tedadInSabadOrDet + zarib;
            // const token = getCookie("token");  ////zare_nk_050416_commented
            console.log('041120-addToCartInIndex-tedad: ' + addRemParam.tedadInSabadOrDet + '-zarib: ' + addRemParam.ZaribForoosh + '-TedadOut: ' + TedadOut);

            // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented 
            var urlInsertToSabad = NextJsApiUrl + "Api_AddRemoveSabadKharidSatr";
            const response = await fetch(urlInsertToSabad, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    BarcodeKala: addRemParam.BarcodeKala,
                    Tedad: TedadOut,
                    IdKala: addRemParam.IdKala,
                    IdShobeh: vendorId,
                    // IdAddress: mycurrentAddressState?.IdAdress,   ////zare_nk_050510_commented(az useRef bejaye state estefadeh shod)
                    IdAddress: refForMycurrentAddressState.current?.IdAdress,     ////zare_nk_050510_added(az useRef bejaye state estefadeh shod)
                }),
            });
            const data = await response.json();
            console.log('123456-oomad');
            if (response.ok) {
                console.log('041120-addToCartInIndex-else 5 IdKala response.ok-data: ' + JSON.stringify(data));
                // setAddOrRemChanged(addRemParam.BarcodeKala + "-" + TedadOut);  ////zare_nk_050416_commented
                var result = data;
                if (result.status != 0) {
                    setIsOpenedMymodalForWarning(true);
                    setWarningTextInMymodalForWarning(result.errors[0]);
                    // const bootstrap = await getBootstrap();
                    // const mymodalForWarning = new bootstrap.Modal(
                    //     document.getElementById("mymodalForWarning")
                    // );
                    // mymodalForWarning.show();
                    // const span = document.querySelector(
                    //     "#mymodalForWarning .modal-body span"
                    // );
                    // if (span instanceof HTMLElement) {
                    //     span.innerText = result.errors[0];
                    // }
                }
                else if (result.status == 0) {
                    let tittrInoInResult = JSON.parse(result.data.titr)[0];  ////zare_nk_050416_added
                    let satrInoInResult = JSON.parse(result.data.satr)[0];  //zare_nk_041124_added
                    let Tedad: number = satrInoInResult.Tedad;
                    console.log("zare_nk_050416-tittrInoInResult.IdSabadKharidSatr: " + tittrInoInResult.IdSabadKharidTitr +
                        "satrInoInResult.IdSabadKharidSatr: " + satrInoInResult.IdSabadKharidSatr
                    );

                    var bishAzMaxTedadYaMojoodi = 0;
                    if (addRemParam.MaxTedad <= Tedad) {
                        bishAzMaxTedadYaMojoodi = 1;
                    }
                    if (addRemParam.Mojoodi <= Tedad) {
                        bishAzMaxTedadYaMojoodi = 1;
                    }

                    refForfather.current = addRemParam.father;

                    let ForCartContentsDesignTypeLet = 0
                    if (Tedad == 0) {
                        ForCartContentsDesignTypeLet = 0;
                    }
                    else if (Tedad > addRemParam.ZaribForoosh) {
                        ForCartContentsDesignTypeLet = 2;
                    }
                    else if (Tedad == addRemParam.ZaribForoosh) {
                        ForCartContentsDesignTypeLet = 1;
                    }
                    ////zare_nk_050416_commented_st(felan ke modale joziate kala nemikhaim dar in safheh)
                    // if (addRemParam.fromShowDetails) {
                    //     setForCartContInProdDetVal(() => {
                    //         const idTag = "ForCart-" + addRemParam.IdKala;
                    //         return {
                    //             tedadInSabadOrDet: Tedad,
                    //             ZaribForoosh: addRemParam.ZaribForoosh,
                    //             IdKala: addRemParam.IdKala,
                    //             NameKala: addRemParam.NameKala,
                    //             DarsadTakhfif: addRemParam.DarsadTakhfif,
                    //             NameBerand: addRemParam.NameBerand,
                    //             FeeForoosh: addRemParam.FeeForoosh,
                    //             FeeMasraf: addRemParam.FeeMasraf,
                    //             BarcodeKala: addRemParam.BarcodeKala,
                    //             Mojoodi: addRemParam.Mojoodi,
                    //             MaxTedad: addRemParam.MaxTedad,
                    //             father: "#DetailsInfoCont",
                    //             refForfather: refForfather,
                    //             bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
                    //             fromShowDetails: addRemParam.fromShowDetails,
                    //             ForCartContentsDesignType: ForCartContentsDesignTypeLet,
                    //             idTag: idTag,
                    //         };
                    //     });
                    // }
                    ////zare_nk_050416_commented_end(felan ke modale joziate kala nemikhaim dar in safheh)
                    ////zare_nk_050416_added_st(raveshe samte client ke jaigozine setAddOrRemChanged va useEffect(...[addOrRemChanged]) 
                    //// shod(ke dakhele useEffect(...[addOrRemChanged]) api sabadekharid ra mojadad seda mizadim) )
                    // setSabadRows((curRows) => {
                    //     return curRows.map((curItem: any, index: number) => {
                    //         if (curItem.IdKala == addRemParam.IdKala) {
                    //             return (
                    //                 {
                    //                     ...curItem,   ////zare_nk_050322_added(ta age fieldi ra ja gozashtim barnameh az meghdare feli estefadeh koneh, vagarnah an field undefiend mishavad!(masalan 
                    //                     //// midoonim NameKala dar in setState tagheiri nemikoneh, niazi be meghdardehi mojadad nist va age inja dobareh meghdar nadim va az ...curItem ham estefadeh nakonim undegiend mideh ))
                    //                     IdSabadKharidSatr: satrInoInResult.IdSabadKharidSatr,
                    //                     IdSabadKharidTitr: tittrInoInResult.IdSabadKharidTitr,
                    //                     tedadInSabadOrDet: Tedad,
                    //                     ZaribForoosh: addRemParam.ZaribForoosh,
                    //                     IdKala: addRemParam.IdKala,
                    //                     NameKala: addRemParam.NameKala,
                    //                     DarsadTakhfif: addRemParam.DarsadTakhfif,
                    //                     NameBerand: addRemParam.NameBerand,
                    //                     FeeForoosh: addRemParam.FeeForoosh,
                    //                     FeeMasraf: addRemParam.FeeMasraf,
                    //                     BarcodeKala: addRemParam.BarcodeKala,
                    //                     Mojoodi: addRemParam.Mojoodi,
                    //                     MaxTedad: addRemParam.MaxTedad,
                    //                     MasrafSatr: curItem.MasrafSatr,   ////zare_nk_050329_commented
                    //                     father: "",
                    //                     //refForfather: refForfather,
                    //                     bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,  //zare_nk_041121_added(for shopToDiscount)
                    //                     fromShowDetails: false,
                    //                     ForCartContentsDesignType: ForCartContentsDesignTypeLet,  //zare_nk_041121_added(for shopToDiscount)
                    //                     idTag: "ForCart-" + addRemParam.IdKala,
                    //                 }
                    //             )
                    //         }
                    //         // اگر شرط برقرار نبود، حتما باید آیتم قبلی را برگردانید
                    //         return curItem;
                    //     })
                    // })
                    ////zare_nk_050416_added_st(raveshe samte client ke jaigozine setAddOrRemChanged va useEffect(...[addOrRemChanged]) 
                    //// shod(ke dakhele useEffect(...[addOrRemChanged]) api sabadekharid ra mojadad seda mizadim) )
                    SetResponsedListFromApiSelectKalaShobeh((curRows) => {
                        return curRows.map((curItem: any, index: number) => {
                            if (curItem.IdKala == addRemParam.IdKala) {
                                return (
                                    {
                                        ...curItem,   ////zare_nk_050322_added(ta age fieldi ra ja gozashtim barnameh az meghdare feli estefadeh koneh, vagarnah an field undefiend mishavad!(masalan 
                                        //// midoonim NameKala dar in setState tagheiri nemikoneh, niazi be meghdardehi mojadad nist va age inja dobareh meghdar nadim va az ...curItem ham estefadeh nakonim undegiend mideh ))
                                        // IdSabadKharidSatr: satrInoInResult.IdSabadKharidSatr,
                                        // IdSabadKharidTitr: tittrInoInResult.IdSabadKharidTitr,
                                        tedadInSabadOrDet: Tedad,
                                        ZaribForoosh: addRemParam.ZaribForoosh,
                                        IdKala: addRemParam.IdKala,
                                        NameKala: addRemParam.NameKala,
                                        DarsadTakhfif: addRemParam.DarsadTakhfif,
                                        NameBerand: addRemParam.NameBerand,
                                        FeeForoosh: addRemParam.FeeForoosh,
                                        FeeMasraf: addRemParam.FeeMasraf,
                                        BarcodeKala: addRemParam.BarcodeKala,
                                        Mojoodi: addRemParam.Mojoodi,
                                        MaxTedad: addRemParam.MaxTedad,
                                        // MasrafSatr: curItem.MasrafSatr,   ////zare_nk_050329_commented
                                        father: "",
                                        refForfather: refForfather,
                                        bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
                                        fromShowDetails: false,
                                        ForCartContentsDesignType: ForCartContentsDesignTypeLet,
                                        // idTag: "ForCart-" + addRemParam.IdKala,   ////zare_nk_050417_nokteh(ba ...curItem goftam az hamoon meghdare ghablish estefadeh koneh)
                                    }
                                )
                            }
                            // اگر شرط برقرار نبود، حتما باید آیتم قبلی را برگردانید
                            return curItem;
                        })
                    })

                    setJamKol(tittrInoInResult.SumFeeMasraf);
                    setJamKolTakhfif(tittrInoInResult.Sood);
                    setJamKolNahaei(tittrInoInResult.MablaghNahaee);
                }
            } else {
                console.log('041120-addToCartInIndex-else 6 IdKala !!!!response.ok');
                if (response.status == 401) {
                    setIsOpenedMymodalForWarning(true);
                    setWarningTextInMymodalForWarning("لطفا ابتدا لاگین شوید");
                    // const bootstrap = await getBootstrap();
                    // const mymodalForWarning = new bootstrap.Modal(
                    //     document.getElementById("mymodalForWarning")
                    // );
                    // mymodalForWarning.show();
                    // const span = document.querySelector(
                    //     "#mymodalForWarning .errorInMymodalForWarning"
                    // );
                    // if (span instanceof HTMLElement) {
                    //     span.innerText = "لطفا ابتدا لاگین شوید";
                    // }
                }
                ////zare_nk_050311_added_st
                else {
                    setIsOpenedMymodalForWarning(true);
                    setWarningTextInMymodalForWarning("ارتباط با سرور برقرار نشد");
                }
            }
        } catch (error) {
            console.log('123456-catch: ' + error);
            ////zare_nk_050325_commented_st(tahlilshe(catch ra az showDetails coppy kardam, fekr mikonam inha inja ezafian)) 
            // setForCartContInProdDetVal(undefined);
            // setIsOpenedProdDetModal(false);
            ////zare_nk_050325_commented_end(tahlilshe(catch ra az showDetails coppy kardam, fekr mikonam inha inja ezafian)) 
            setIsOpenedMymodalForWarning(true);
            let WarningText = '';
            if (error instanceof Error) {
                WarningText = error.message
                if (error.message === "Failed to fetch") {
                    WarningText = "❌ اتصال اینترنت برقرار نیست یا سرور در دسترس نمی‌باشد";
                }
                else if (error.message === "Network request failed") {
                    WarningText = "درخواست شبکه ناموفق بود";
                }
                else {
                    WarningText = '55درخواست نا موفق بود';
                }
            } else {
                WarningText = String(error);
            }

            setWarningTextInMymodalForWarning(() => {
                return (WarningText)
            });
        }
    }

    async function remveFromCartInIndex(
        addRemParam: addRemParamType,
    ) {
        const token = getCookie("token");
        if (token == null) {
            setIsOpenedMymodalForWarning(true);
            setWarningTextInMymodalForWarning("لطفا ابتدا لاگین شوید");
            ////zare_nk_041129_commented_st
            //   const bootstrap = await getBootstrap();
            //   const mymodalForWarning = new bootstrap.Modal(
            //     document.getElementById("mymodalForWarning")
            //   );
            //   mymodalForWarning.show();
            //   const span = document.querySelector(
            //     "#mymodalForWarning .errorInMymodalForWarning"
            //   );
            //   if (span instanceof HTMLElement) {
            //     span.innerText = "لطفا ابتدا لاگین شوید";
            //   }
            ////zare_nk_041129_commented_end
            return;
            return;
        }

        try {
            console.log('041116-001');
            var TedadOut = 0;
            const zarib = parseFloat(String(addRemParam.ZaribForoosh ?? 0));
            TedadOut = addRemParam.tedadInSabadOrDet - zarib;
            // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented 
            var urlInsertToSabad = NextJsApiUrl + "Api_AddRemoveSabadKharidSatr";
            const response = await fetch(urlInsertToSabad, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    BarcodeKala: addRemParam.BarcodeKala,
                    Tedad: TedadOut,
                    IdKala: addRemParam.IdKala,
                    IdShobeh: vendorId,
                    // IdAddress: mycurrentAddressState?.IdAdress,   ////zare_nk_050510_commented(az useRef bejaye state estefadeh shod)
                    IdAddress: refForMycurrentAddressState.current?.IdAdress,     ////zare_nk_050510_added(az useRef bejaye state estefadeh shod)
                }),
            });

            const data = await response.json();
            if (response.ok) {
                var result = data;
                if (result.status == -1000) {
                    ////zare_nk_041129_commented_st
                    // const inputGroup = document.querySelector(
                    //   ".ForCart-" + addRemParam.IdKala + " .input-group"
                    // );
                    // if (inputGroup) {
                    //   let parent = inputGroup.closest(".flxpedar2_new");
                    //   if (parent) {
                    //     alert('1111111');
                    //     parent.remove();
                    //   }
                    // }
                    ////zare_nk_041129_commented_end
                    // var hisFather = null;
                    // let eventCurrentTargetTag;
                    // if (addRemParam.event) {
                    //     eventCurrentTargetTag = addRemParam.event.currentTarget as HTMLElement;
                    // }

                    // const hisFatherTag = eventCurrentTargetTag?.closest(".gfForAddRemm");
                    // if (hisFatherTag) {
                    //     hisFather = hisFatherTag.id;
                    // }
                    refForfather.current = addRemParam.father;
                    setIsOpenedMymodalForWarning(true);
                    setWarningTextInMymodalForWarning(result.errors[0]);
                    // const bootstrap = await getBootstrap(); 
                    // const adameSabteNahaeiModal = new bootstrap.Modal(
                    //   document.getElementById("adameSabteNahaeiModal")
                    // );
                    // adameSabteNahaeiModal.show();
                    // const HoshdarInAdameSabteNahaeiModalTag = document.getElementById(
                    //   "HoshdarInAdameSabteNahaeiModal"
                    // );
                    // if (HoshdarInAdameSabteNahaeiModalTag instanceof HTMLElement) {
                    //   HoshdarInAdameSabteNahaeiModalTag.innerText = result.errors[0];
                    // } 
                    // const mymodalForWarning = new bootstrap.Modal(
                    //     document.getElementById("mymodalForWarning")
                    // );
                    // mymodalForWarning.show();
                    // const span = document.querySelector(
                    //     "#mymodalForWarning .modal-body span"
                    // );
                    // if (span instanceof HTMLElement) {
                    //     span.innerText = result.errors[0];
                    // }
                }
                if (result.status != 0) {
                    setIsOpenedMymodalForWarning(true);
                    setWarningTextInMymodalForWarning(result.errors[0]);
                    // const bootstrap = await getBootstrap();
                    // const mymodalForWarning = new bootstrap.Modal(
                    //     document.getElementById("mymodalForWarning")
                    // );
                    // mymodalForWarning.show();
                    // const span = document.querySelector(
                    //     "#mymodalForWarning .modal-body span"
                    // );
                    // if (span instanceof HTMLElement) {
                    //     span.innerText = result.errors[0];
                    // }
                } else if (result.status == 0) {
                    console.log('041116-result.status == 0');
                    let tittrInoInResult = JSON.parse(result.data.titr)[0];
                    let satrInoInResult = JSON.parse(result.data.satr)[0];
                    let Tedad = satrInoInResult === undefined ? 0 : satrInoInResult.Tedad;
                    console.log("zare_nk_050416-tittrInoInResult.IdSabadKharidSatr: " + tittrInoInResult.IdSabadKharidTitr +
                        "Tedad: " + Tedad
                    );

                    var bishAzMaxTedadYaMojoodi = 0;
                    if (addRemParam.MaxTedad <= Tedad) {
                        bishAzMaxTedadYaMojoodi = 1;
                    }
                    if (addRemParam.Mojoodi <= Tedad) {
                        bishAzMaxTedadYaMojoodi = 1;
                    }

                    refForfather.current = addRemParam.father;

                    let ForCartContentsDesignTypeLet = 0;
                    if (Tedad == 0) {
                        ForCartContentsDesignTypeLet = 0;
                    }
                    else if (Tedad > addRemParam.ZaribForoosh) {
                        ForCartContentsDesignTypeLet = 2;
                    }
                    else if (Tedad == addRemParam.ZaribForoosh) {
                        ForCartContentsDesignTypeLet = 1;
                    }
                    ////zare_nk_050416_commented_st(felan ke modale joziate kala nemikhaim dar in safheh)
                    // if (addRemParam.fromShowDetails) {
                    //     setForCartContInProdDetVal(() => {
                    //         const idTag = "ForCart-" + addRemParam.IdKala;
                    //         return {
                    //             tedadInSabadOrDet: Tedad,
                    //             ZaribForoosh: addRemParam.ZaribForoosh,
                    //             IdKala: addRemParam.IdKala,
                    //             NameKala: addRemParam.NameKala,
                    //             DarsadTakhfif: addRemParam.DarsadTakhfif,
                    //             NameBerand: addRemParam.NameBerand,
                    //             FeeForoosh: addRemParam.FeeForoosh,
                    //             FeeMasraf: addRemParam.FeeMasraf,
                    //             BarcodeKala: addRemParam.BarcodeKala,
                    //             Mojoodi: addRemParam.Mojoodi,
                    //             MaxTedad: addRemParam.MaxTedad,
                    //             father: "#DetailsInfoCont",
                    //             refForfather: refForfather,
                    //             bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
                    //             fromShowDetails: addRemParam.fromShowDetails,
                    //             ForCartContentsDesignType: ForCartContentsDesignTypeLet,
                    //             idTag: idTag,
                    //         };
                    //     });
                    // }
                    ////zare_nk_050416_commented_end(felan ke modale joziate kala nemikhaim dar in safheh)

                    ////zare_nk_050416_added_st(raveshe samte client ke jaigozine setAddOrRemChanged va useEffect(...[addOrRemChanged]) 
                    //// shod(ke dakhele useEffect(...[addOrRemChanged]) api sabadekharid ra mojadad seda mizadim) )
                    // setSabadRows((curRows) => {
                    //     ////zare_nk_050416_added_st(baraye hazfeh satre tedad sefr)
                    //     if (Tedad === 0) {
                    //         // alert(addRemParam.NameKala);
                    //         return curRows.filter(
                    //             item => item.IdKala !== addRemParam.IdKala
                    //         );
                    //     }
                    //     ////zare_nk_050416_added_st(baraye hazfeh satre tedad sefr)
                    //     return curRows.map((curItem: any, index: number) => {
                    //         if (curItem.IdKala == addRemParam.IdKala) {
                    //             return (
                    //                 {
                    //                     ...curItem,   ////zare_nk_050322_added(ta age fieldi ra ja gozashtim barnameh az meghdare feli estefadeh koneh, vagarnah an field undefiend mishavad!(masalan 
                    //                     //// midoonim NameKala dar in setState tagheiri nemikoneh, niazi be meghdardehi mojadad nist va age inja dobareh meghdar nadim va az ...curItem ham estefadeh nakonim undegiend mideh ))
                    //                     IdSabadKharidSatr: satrInoInResult.IdSabadKharidSatr,
                    //                     IdSabadKharidTitr: tittrInoInResult.IdSabadKharidTitr,
                    //                     tedadInSabadOrDet: Tedad,
                    //                     ZaribForoosh: addRemParam.ZaribForoosh,
                    //                     IdKala: addRemParam.IdKala,
                    //                     NameKala: addRemParam.NameKala,
                    //                     DarsadTakhfif: addRemParam.DarsadTakhfif,
                    //                     NameBerand: addRemParam.NameBerand,
                    //                     FeeForoosh: addRemParam.FeeForoosh,
                    //                     FeeMasraf: addRemParam.FeeMasraf,
                    //                     BarcodeKala: addRemParam.BarcodeKala,
                    //                     Mojoodi: addRemParam.Mojoodi,
                    //                     MaxTedad: addRemParam.MaxTedad,
                    //                     MasrafSatr: curItem.MasrafSatr,   ////zare_nk_050329_commented
                    //                     father: "",
                    //                     //refForfather: refForfather,
                    //                     bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,  //zare_nk_041121_added(for shopToDiscount)
                    //                     fromShowDetails: false,
                    //                     ForCartContentsDesignType: ForCartContentsDesignTypeLet,  //zare_nk_041121_added(for shopToDiscount)
                    //                     idTag: "ForCart-" + addRemParam.IdKala,
                    //                 }
                    //             )
                    //         }
                    //         // اگر شرط برقرار نبود، حتما باید آیتم قبلی را برگردانید
                    //         return curItem;
                    //     })
                    // })

                    SetResponsedListFromApiSelectKalaShobeh((curRows) => {
                        return curRows.map((curItem: any, index: number) => {
                            if (curItem.IdKala == addRemParam.IdKala) {
                                return (
                                    {
                                        ...curItem,   ////zare_nk_050322_added(ta age fieldi ra ja gozashtim barnameh az meghdare feli estefadeh koneh, vagarnah an field undefiend mishavad!(masalan 
                                        //// midoonim NameKala dar in setState tagheiri nemikoneh, niazi be meghdardehi mojadad nist va age inja dobareh meghdar nadim va az ...curItem ham estefadeh nakonim undegiend mideh ))
                                        // IdSabadKharidSatr: satrInoInResult.IdSabadKharidSatr,
                                        // IdSabadKharidTitr: tittrInoInResult.IdSabadKharidTitr,
                                        tedadInSabadOrDet: Tedad,
                                        ZaribForoosh: addRemParam.ZaribForoosh,
                                        IdKala: addRemParam.IdKala,
                                        NameKala: addRemParam.NameKala,
                                        DarsadTakhfif: addRemParam.DarsadTakhfif,
                                        NameBerand: addRemParam.NameBerand,
                                        FeeForoosh: addRemParam.FeeForoosh,
                                        FeeMasraf: addRemParam.FeeMasraf,
                                        BarcodeKala: addRemParam.BarcodeKala,
                                        Mojoodi: addRemParam.Mojoodi,
                                        MaxTedad: addRemParam.MaxTedad,
                                        // MasrafSatr: curItem.MasrafSatr,   ////zare_nk_050329_commented
                                        father: "",
                                        refForfather: refForfather,
                                        bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
                                        fromShowDetails: false,
                                        ForCartContentsDesignType: ForCartContentsDesignTypeLet,
                                        // idTag: "ForCart-" + addRemParam.IdKala,   ////zare_nk_050417_nokteh(ba ...curItem goftam az hamoon meghdare ghablish estefadeh koneh)
                                    }
                                )
                            }
                            // اگر شرط برقرار نبود، حتما باید آیتم قبلی را برگردانید
                            return curItem;
                        })
                    })

                    setJamKol(tittrInoInResult.SumFeeMasraf);
                    setJamKolTakhfif(tittrInoInResult.Sood);
                    setJamKolNahaei(tittrInoInResult.MablaghNahaee);
                    ////zare_nk_050416_added_st(raveshe samte client ke jaigozine setAddOrRemChanged va useEffect(...[addOrRemChanged]) 
                    //// shod(ke dakhele useEffect(...[addOrRemChanged]) api sabadekharid ra mojadad seda mizadim) )                    
                }
            } else {
                console.log('041116-!!response.ok');
                if (response.status == 401) {
                    setIsOpenedMymodalForWarning(true);
                    setWarningTextInMymodalForWarning("لطفا ابتدا لاگین شوید");
                    // const bootstrap = await getBootstrap();
                    // const mymodalForWarning = new bootstrap.Modal(
                    //     document.getElementById("mymodalForWarning")
                    // );
                    // mymodalForWarning.show();
                    // const span = document.querySelector(
                    //     "#mymodalForWarning .errorInMymodalForWarning"
                    // );
                    // if (span instanceof HTMLElement) {
                    //     span.innerText = "لطفا ابتدا لاگین شوید";
                    // }
                }
                ////zare_nk_050311_added_st
                else {
                    setIsOpenedMymodalForWarning(true);
                    setWarningTextInMymodalForWarning("ارتباط با سرور برقرار نشد");
                }
            }

        } catch (error) {
            ////zare_nk_050325_commented_st(tahlilshe(catch ra az showDetails coppy kardam, fekr mikonam inha inja ezafian)) 
            // setForCartContInProdDetVal(undefined);
            // setIsOpenedProdDetModal(false);
            ////zare_nk_050325_commented_end(tahlilshe(catch ra az showDetails coppy kardam, fekr mikonam inha inja ezafian)) 
            setIsOpenedMymodalForWarning(true);
            let WarningText = '';
            if (error instanceof Error) {
                WarningText = error.message
                if (error.message === "Failed to fetch") {
                    WarningText = "❌ اتصال اینترنت برقرار نیست یا سرور در دسترس نمی‌باشد";
                }
                else if (error.message === "Network request failed") {
                    WarningText = "درخواست شبکه ناموفق بود";
                }
                else {
                    WarningText = '66درخواست نا موفق بود';
                    console.log("050329-error.message: " + error.message)
                }
            } else {
                WarningText = String(error);
            }

            setWarningTextInMymodalForWarning(() => {
                return (WarningText)
            });
        }
    }

    // const handlerForAddClick: (
    //     addRemParam: addRemParamType,
    // ) => void = (addRemParam) => {
    //     // addRemParam.event && addRemParam.event.stopPropagation();
    //     addToCartInIndex(
    //         addRemParam
    //     );
    // };
    const handlerForAddClick = useCallback(addToCartInIndex, [addToCartInIndex]);  ////zare_nk_050319_added_st(rahe3- tabee voroodish ke addToCartInIndex hast dige niazi be useCalback nadare)

    // const handlerForRemClick: (
    //     addRemParam: addRemParamType,
    // ) => void = (addRemParam) => {
    //     remveFromCartInIndex(
    //         addRemParam
    //     );
    // };
    const handlerForRemClick = useCallback(remveFromCartInIndex, [remveFromCartInIndex]);

    return (
        <>
            {grouped &&
                Object.entries(grouped).map(([idG1, items]) => {   ////zare_nk_050408_nokteh(chon methode map makhsoose arraye hast az Object.entries estefade kardim baraye tabdile object be arraye)
                    return (
                        <div key={idG1} id={idG1}
                            style={{
                                scrollMarginTop: "40px",  ////zare_nk_050405_nokteh(baes mishe hengame paresh sectione morede nazar zire headere chasboon nare, balke paeinesh bereh)
                            }}
                            ref={el => {
                                sectionRefs.current[idG1.toString()] = el;
                            }} >
                            <div style={{
                                width: '100%',
                                height: '82px',
                                paddingBottom: '1rem',
                                // paddingTop: '1rem',
                                paddingLeft: '1rem',
                                paddingRight: '1rem',
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: "center",
                            }}>
                                {/* <h1 style={{ color: 'red', }}>گروه {idG1}</h1> */}
                                {items &&
                                    <h1 style={{ color: 'black', margin: '0px', fontSize: '18px', }}>{items[0].NameG1}</h1>
                                }
                            </div>

                            {items?.map((item) => {
                                console.log('050417-item: ' + JSON.stringify(item));
                                return (
                                    <div key={item.IdKala} id={item.IdKala.toString()}
                                        style={{
                                            width: '100%',
                                            display: "flex",
                                            flexDirection: 'column',

                                            // borderBottom: '1px solid #e6e9ea', 
                                            // marginBottom: '10px',
                                            // paddingBottom: '10px',
                                        }}
                                    // ref={el => {
                                    //     sectionRefs.current[item.IdKala.toString()] = el;
                                    // }}
                                    >
                                        <div style={{
                                            paddingLeft: '1rem',
                                            paddingRight: '1rem',
                                            gap: '.75rem', justifyContent: 'flex-start',
                                            width: '100%', height: '100px', display: 'flex',
                                        }}>
                                            <div style={{ borderRadius: '.5rem', flexShrink: 0, width: '100px', height: '100%', position: 'relative', }}>
                                                <img style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: '.5rem',
                                                    zIndex: '1',
                                                }}
                                                    // src={`https://img.tochikala.com/Product/${responsedListFromApiSelectKalaShobeh[0].IdKala}.webp`} />
                                                    src={`/images/movaghat/vendorPage/g1Img.jpg`} />
                                                <div style={{
                                                    display: 'flex', flexDirection: 'column', position: 'absolute', right: '11px', bottom: '-1rem',
                                                }}>
                                                    <AddRemBtnsAndCountPackege
                                                        refForfather={refForfather}
                                                        fromShowDetails={false}
                                                        IdKala={item.IdKala}
                                                        idTag=""
                                                        tedadInSabadOrDet={item.tedadInSabadOrDet}
                                                        handlerForAddClick={(e) => {
                                                            return handlerForAddClick(
                                                                {
                                                                    tedadInSabadOrDet: item.tedadInSabadOrDet,
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
                                                                    bishAzMaxTedadYaMojoodi: item.bishAzMaxTedadYaMojoodi,
                                                                    fromShowDetails: item.fromShowDetails,
                                                                    event: null,
                                                                }
                                                            );
                                                        }}
                                                        handlerForRemClick={(e) => {
                                                            return handlerForRemClick(
                                                                {
                                                                    tedadInSabadOrDet: item.tedadInSabadOrDet,
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
                                                                    bishAzMaxTedadYaMojoodi: item.bishAzMaxTedadYaMojoodi,
                                                                    fromShowDetails: false,
                                                                    event: null,
                                                                }
                                                            );
                                                        }}
                                                        ForCartContentsDesignType={item.ForCartContentsDesignType}
                                                        bishAzMaxTedadYaMojoodi={item.bishAzMaxTedadYaMojoodi}
                                                    />
                                                </div>
                                            </div>

                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: '100%',
                                                width: '100%',
                                                gap: '.5rem',
                                            }}>
                                                <div style={{
                                                    display: 'flex', justifyContent: "space-between", width: '100%',
                                                }}>
                                                    <div style={{
                                                        fontSize: '1rem',
                                                        color: '#313335',

                                                        // این بخش برای سه‌نقطه و محدودیت ۲ خط
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 1,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',

                                                        // این بخش برای تثبیت ارتفاع روی ۴۰ پیکسل 
                                                        lineHeight: '1.5rem',
                                                        // height: '2.5rem',
                                                        height: '1.5rem',

                                                        minHeight: '1.5rem',  // minHeight: '2.5rem', // اجبار به کمتر نشدن
                                                        maxHeight: '1.5rem',  // maxHeight: '2.5rem', // اجبار به بیشتر نشدن
                                                        boxSizing: 'border-box', // برای اینکه بُردر (border) به ارتفاع اضافه نشود

                                                        textAlign: 'center',
                                                    }}>
                                                        {item.NameKala}
                                                    </div>

                                                    <div style={{
                                                        display: 'flex', flexFlow: 'row', gap: '0.25rem', alignItems: 'center',
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
                                                    fontSize: '.75rem',
                                                    color: '#a5abb1',

                                                    // این بخش برای سه‌نقطه و محدودیت ۲ خط
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 1,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',

                                                    // این بخش برای تثبیت ارتفاع روی ۴۰ پیکسل 
                                                    lineHeight: '1rem',
                                                    // height: '2.5rem',
                                                    height: '2rem',

                                                    minHeight: '2rem',  // minHeight: '2.5rem', // اجبار به کمتر نشدن
                                                    maxHeight: '2rem',  // maxHeight: '2.5rem', // اجبار به بیشتر نشدن
                                                    boxSizing: 'border-box', // برای اینکه بُردر (border) به ارتفاع اضافه نشود

                                                    textAlign: 'start',
                                                }}>
                                                    خمیر پیتزا آمریکایی، کالباس خشک، هات داگ، قارچ، پنیر پیتزا، فلفل دلمه ای، گوجه
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{
                                            width: '100%',
                                            paddingRight: '1.75rem',
                                            paddingLeft: '1rem',
                                            display: "flex",
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginTop: '1rem',
                                        }}>
                                            <div style={{
                                                display: "flex",
                                                gap: '.75rem', alignItems: 'center', flex: '1 1 0%', width: '100%',
                                            }}>
                                                <span>یک نفره</span>
                                            </div>
                                            <div style={{
                                                justifyContent: 'flex-end', width: '100%', display: "flex", marginTop: '.5rem',
                                            }}>
                                                <div style={{ display: "flex", flexFlow: 'row', alignItems: 'center', }}>
                                                    <span style={{
                                                        fontSize: '0.875rem',
                                                        lineHeight: '1.5rem', color: '#1b1c1d',
                                                    }}>
                                                        {item.FeeMasraf.toLocaleString()}
                                                    </span>

                                                    <span style={{ fontSize: '.625rem', color: '#6d6d6d', marginRight: '3px', }}>
                                                        تومان
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{
                                            display: "flex", borderBottom: '1px solid #e6e9ea', margin: '1rem 0.75rem',
                                        }}>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })
            }
        </>
    );
}

export default memo(GetScrollsSecInVendor); 