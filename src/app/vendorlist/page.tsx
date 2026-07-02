////zare_nk_050411_okk(1)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, RefObject, ReactNode, ChangeEvent, MouseEvent, createContext, useContext } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";

import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { useAuthentication } from '../../context/AuthenticationContext';

import SwiperShopsInVendorComp from '../../components/SwiperShopsInVendorComp';
import SwiperInVendorHeaderComp from '../../components/SwiperInVendorHeaderComp';

import CollapseAndClickAwayForSortingComp from '../../components/CollapseAndClickAwayForSortingComp';  //zare_nk_050401_added 
import CollapseAndClickAwayForRaveshErsalComp from '../../components/CollapseAndClickAwayForRaveshErsalComp';  //zare_nk_050401_added 

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

export default function VendorList() {
    const router = useRouter();
    console.log('050329-VendorList rendered!!');   
    const [isEpmtyCollapseForSorting, setIsEpmtyCollapseForSorting] = useState(true);   
    const [isEpmtyCollapseForRaveshErsal, setIsEpmtyCollapseForRaveshErsal] = useState(true);  

    ////zare_nk_050403_added_movaghat_st(olgoohaye tamrini va pakkardani)
    // const [testState, SetTestState] = useState<number>(1);
    // //   const [testState2, SetTestState2] = useState<number>(1);

    // useEffect(() => {
    //     SetTestState(2);
    //     //// useCalback1;
    // }, []);
    ////zare_nk_050403_added_movaghat_end(olgoohaye tamrini va pakkardani)
  
    // async function saveAddress(isOnline: boolean) {  ////zare_nk_050403_nokteh(rahe1- mamoolan age tabe ra kharej az component tarif mikonim az in sabke tarife tabe estefadeh mishe(dar sorat va karaei har do ravesh taghriban yeki hastan))
    const saveAddress = useCallback(
        async (isOnline: boolean) => {  ////zare_nk_050403_nokteh(rahe2- mamoolan age tabe ra dakhele   component tarif mikonim az in sabke tarife tabe estefadeh mishe(dar sorat va karaei har do ravesh taghriban yeki hastan))
            console.log('saveAddress called!!');
        }
        , [isEpmtyCollapseForSorting, isEpmtyCollapseForRaveshErsal]);  ////zare_nk_050403_nokteh(chon saveAddress baraye har do componente CollapseAndClickAwayForSortingComp va 
    ////CollapseAndClickAwayForRaveshErsalComp estefadeh shod, pas state propse voroodiye hardo component ra dar useEffect gozashtim, pas harkodoom ro ke reRender konim baese reRendere digari niz mishe)
    // , []);  ////zare_nk_050403_nokteh(barakse useEffect dar useCallback zaheran [] mani nadare va dorosteh ke dar reRendere pedar az reRendere bimorede farzand jologiri mikoneh, vali zamane 
    ////seState dar componente farzand baese reRendere ezafiye farzand mishe)

    const openCollapseForSorting = useCallback(
        async () => {   ////zare_nk_050401_nokteh(haman lafze bigShow sabegh)
            console.log('050401-openCollapseForSorting called!!');
            let token = await getCookie("token");
            console.log('050401-token is: ' + getCookie("token"));
            if (token) {
                console.log('050401-token darim-openCollapseForSorting!!');
                setIsEpmtyCollapseForSorting(false);
            }
            else {
                console.log('050401-token nadarim');
                saveAddress(false);  ////zare_nk_050205_nokteh(age offLine ham bood taraf address ra zakhireh kon ehtemalan ba user movaghat!!)
            }
            ////zare_nk_050205_added_end
        }
        , [isEpmtyCollapseForSorting]);

    const openCollapseForRaveshErsal = useCallback(
        async () => {   ////zare_nk_050401_nokteh(haman lafze bigShow sabegh)
            console.log('050401-openCollapseForRaveshErsal called!!');
            let token = await getCookie("token");
            console.log('050401-token is: ' + getCookie("token"));
            if (token) {
                console.log('050401-token darim-openCollapseForRaveshErsal!!');
                setIsEpmtyCollapseForRaveshErsal(false);
            }
            else {
                console.log('050401-token nadarim');
                saveAddress(false);  ////zare_nk_050205_nokteh(age offLine ham bood taraf address ra zakhireh kon ehtemalan ba user movaghat!!)
            }
            ////zare_nk_050205_added_end
        }
        , [isEpmtyCollapseForRaveshErsal]);

    return (
        <div style={{
            // backgroundColor: 'white', 
            width: '100%',
            // height: '100%',  ////height :100% dorost nist, chon shayad dar layout alaveh ba children satrhaye dife ham dashe bashim(mesle footer va header va...)
            display: "flex",
            flexDirection: 'column',
            // border: '3px solid orange',
        }}>
            <header style={{
                position: 'sticky',
                top: '0px',
                boxShadow: '0px 3px 2px -1px #d7d6d6',
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '5px',
                paddingBottom: '5px',
                zIndex: 899,
                backgroundColor: 'white',
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
                        onClick={() => { router.back() }}

                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // backgroundColor: '#f2f5f7',
                            backgroundColor: 'inherit',
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

                    <div style={{
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
                    </button>
                </div>

                <div
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
                }}>
                <div style={{ marginBottom: '.75rem' }}></div>

                <SwiperShopsInVendorComp />

                <div style={{ marginBottom: '1.5rem' }}></div>

                <SwiperShopsInVendorComp />

                <div style={{ marginBottom: '1.5rem' }}></div>

                <SwiperShopsInVendorComp />

                <div style={{ marginBottom: '1.5rem' }}></div>

                <SwiperShopsInVendorComp />

                <div style={{ marginBottom: '1.5rem' }}></div>

                <SwiperShopsInVendorComp />

                <div style={{ marginBottom: '1.5rem' }}></div>

                <SwiperShopsInVendorComp />

                <div style={{ marginBottom: '1.5rem' }}></div>

                <SwiperShopsInVendorComp />

                <div style={{ marginBottom: '1.5rem' }}></div>

                <SwiperShopsInVendorComp />

                <div style={{ marginBottom: '1.5rem' }}></div>

                <SwiperShopsInVendorComp />

                <div style={{ marginBottom: '1.5rem' }}></div>

                <SwiperShopsInVendorComp />

                <div style={{ marginBottom: '1.5rem' }}></div>
                
                <CollapseAndClickAwayForSortingComp
                    isEpmtyCollapseForSorting={isEpmtyCollapseForSorting}
                    setIsEpmtyCollapseForSorting={setIsEpmtyCollapseForSorting}
                    saveAddress={saveAddress}
                    // addressFormInputsVal={addressFormInputsVal}
                    // setAddressFormInputsVal={setAddressFormInputsVal}
                />

                <CollapseAndClickAwayForRaveshErsalComp
                    isEpmtyCollapseForRaveshErsal={isEpmtyCollapseForRaveshErsal}
                    setIsEpmtyCollapseForRaveshErsal={setIsEpmtyCollapseForRaveshErsal}
                    saveAddress={saveAddress}
                    // addressFormInputsVal={addressFormInputsVal}
                    // setAddressFormInputsVal={setAddressFormInputsVal}
                />
            </main>

            <footer></footer>

            <div className="tabIndexOne-in-LayoutWrapper" tabIndex={1}>
            </div>
        </div>
    )
}