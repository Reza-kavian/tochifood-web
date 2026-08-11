// ////zare_nk_050510_okk(1)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, memo, RefObject, ReactNode, ChangeEvent, MouseEvent } from "react";
import { useRouter, useSearchParams, redirect, useParams } from "next/navigation";

import globalsStyles from "@/styles/components/globals.module.css";

import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import SwiperInVendorScrollTabComp from './SwiperInVendorScrollTabComp';
import GetScrollsSecInVendor from './GetScrollsSecInVendor';
import SwiperBordBordInVendorComp from './SwiperBordBordInVendorComp';

import { NextJsApiUrl } from "../constants/Urls";  ////zare_nk_050407_added

import Link from "next/link";
import { json } from "stream/consumers";

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

type addRemBtnsAndCountPackegeType = {
    refForfather: RefObject<string | null>;
    fromShowDetails: boolean;
    IdKala: number;
    idTag: string;
    tedadInSabadOrDet: number;
    // handlerForAddClick: (e?: MouseEvent<HTMLAnchorElement>) => void;  ////zare_nk_050510_commented(chon <button> jaigozine <a> shod)
    handlerForAddClick: (e?: MouseEvent<HTMLButtonElement>) => void;   ////zare_nk_050510_added(chon <button> jaigozine <a> shod)
    // handlerForRemClick: (e?: MouseEvent<HTMLAnchorElement>) => void;  ////zare_nk_050510_commented(chon <button> jaigozine <a> shod)
    handlerForRemClick: (e?: MouseEvent<HTMLButtonElement>) => void;   ////zare_nk_050510_added(chon <button> jaigozine <a> shod)
    ForCartContentsDesignType: number;
    bishAzMaxTedadYaMojoodi: number | null;
};

const AddRemBtnsAndCountPackege = ({
    refForfather,
    fromShowDetails,
    IdKala,
    idTag,
    tedadInSabadOrDet,
    handlerForAddClick,
    handlerForRemClick,
    ForCartContentsDesignType,
    bishAzMaxTedadYaMojoodi,
}: addRemBtnsAndCountPackegeType) => {
    console.log('zare_nk_050521_AddRemBtnsAndCountPackege called!!');
    useEffect(() => {
        ////zare_nk_041120_commented_st
        // console.log('2-041119-SabadRow: ' + JSON.stringify(SabadRow));
        // console.log('2-041119-ForCartContentsDesignType: ' + ForCartContentsDesignType);
        // console.log('2-041119-bishAzMaxTedadYaMojoodi: ' + bishAzMaxTedadYaMojoodi);
        ////zare_nk_041120_commented_end
    });

    useEffect(() => {
        // if ("refForfather" in SabadRow) {
        //   SabadRow.refForfather.current = SabadRow.fromShowDetails
        //     ? "#DetailsInfoCont"
        //     : "#sabadItemsContInSafhe";
        // }
        console.log('refForfather.current iss: ' + refForfather.current);
        ////zare_nk_041127_commented_st
        // refForfather.current = fromShowDetails
        //   ? "#DetailsInfoCont"
        //   : "#sabadItemsContInSafhe"; 

        //if (ForCartContentsDesignType == 0) {
        // if (IdKala) {
        //   const ForCartWidth = document.querySelector(
        //     refForfather.current +
        //     " #ForCart-" +
        //     IdKala +
        //     " .input-group"
        //   );
        //   if (ForCartWidth instanceof HTMLElement) {
        //      ForCartWidth.style.width = "35px";
        //   }
        // }
        //} else if (ForCartContentsDesignType == 1) {
        // if (IdKala) {
        //   const ForCartWidth = document.querySelector(
        //     refForfather.current +
        //     " #ForCart-" +
        //     IdKala +
        //     " .input-group"
        //   );
        //   if (ForCartWidth instanceof HTMLElement) {
        //     ForCartWidth.style.width = "auto";
        //   }
        // }
        //} else if (ForCartContentsDesignType == 2) {
        // if (IdKala) {
        //   const ForCartWidth = document.querySelector(
        //     refForfather.current +
        //     " #ForCart-" +
        //     IdKala +
        //     " .input-group"
        //   );
        //   if (ForCartWidth instanceof HTMLElement) {
        //     ForCartWidth.style.width = "auto";
        //   }
        // }
        //}
        ////zare_nk_041127_commented_end
    });

    if (ForCartContentsDesignType == 0) {
        return (
            <div className={`text-center align-items-center justify-content-center ForCart ${idTag}`}
                id={`${idTag}`} style={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: 'center', }} >
                <div className="input-group rounded-pill" style={{
                    backgroundColor: "white",
                    height: "35px",
                    display: "flex",
                    flexWrap: "nowrap",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    // border: "1px solid red",  ////zare_nk_050414_commented
                    boxShadow: '0px 2px 5px rgba(0,0,0,.2)',  ////zare_nk_050414_added
                    overflow: "hidden",
                    width: "35px",  ////zare_nk_050414_added

                    direction: 'rtl',  ////zare_nk_050414_added
                    flexDirection: 'row-reverse',  ////zare_nk_050414_added 
                    borderRadius: 100,   ////zare_nk_050414_added
                }}
                // dir="ltr"  ////zare_nk_050414_commented
                >
                    <div className="addremmCont" id={`removeCont-${IdKala}`} style={{ height: "100%", flex: "1 1 auto", display: "none" }} >
                        <div
                            style={{
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                overflow: "hidden",
                            }} >
                            <a data-baz="0" style={{
                                    flex: "1 1 auto",
                                    height: "100%",
                                    padding: "0px 2px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textDecoration: "none",
                                    borderRadius: "50%",
                                }}
                                className={`rem-${IdKala}`}
                                href="/login" >
                                <button
                                    style={{
                                        height: "80%",
                                        backgroundColor: "white",
                                        border: "none",
                                        padding: "0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    className="plussMinus"
                                >
                                    <img
                                        src="https://img.tochikala.com/tochikala/remove-icon.svg"
                                        alt="حذف از سبد"
                                        className="d-inline-block"
                                        style={{ objectFit: "contain", width: "20px" }}
                                    />
                                </button>
                            </a>
                        </div>
                    </div>

                    <div
                        className={`middleCount-${IdKala}`}
                        style={{
                            height: "100%",
                            flex: "1 1 auto",
                            display: "flex",
                            // flexFlow: "column", ////zare_nk_050414_commented
                        }}>
                        {/* zare_nk_050415_nokteh(span be div tabdil shod) */}
                        <div style={{
                                height: "100%",
                                // border: "none", ////zare_nk_050414_commented
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                overflow: "hidden",
                                padding: "0px 4px", ////zare_nk_050414_added
                            }}>
                            {/* <a
                data-baz="1"
                style={{
                  flex: "1 1 auto",
                  height: "100",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textDecoration: "none",
                  borderRadius: "50%",
                }}
                className={`add-${IdKala}`}
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  handlerForAddClick(e);
                }}
              > */}
                            <button
                                onClick={() => { handlerForAddClick(); }}
                                data-baz="1"
                                id={`inp-${IdKala}`}
                                style={{
                                    flex: "1 1 auto",
                                    flexDirection: 'row',
                                    justifyContent: "center",
                                    alignItems: "center",
                                    opacity: Number(bishAzMaxTedadYaMojoodi) === 1 ? 0.3 : 1,  ////zare_nk_050414_added
                                    display: "flex",
                                    // color: "red",  ////zare_nk_050414_commented
                                    fontSize: "14px",
                                    borderRadius: "100px",////zare_nk_050414_added
                                    width: "28px",////zare_nk_050414_added
                                    height: "28px",////zare_nk_050414_added
                                    backgroundColor: "#1b1c1d",////zare_nk_050414_added
                                    border: "none",  ////zare_nk_050415_nokteh(baraye buttone web niaze ta az css haye dakheliye buttone web jologiri koneh )
                                    padding: "0",  ////zare_nk_050415_nokteh(baraye buttone web niaze ta az css haye dakheliye buttone web jologiri koneh )
                                    cursor: 'pointer',  ////zare_nk_050416_added
                                }}
                                disabled={Boolean(Number(bishAzMaxTedadYaMojoodi))}
                            // className="plussMinus card-linkk text-dangerr fa fa-plus"
                            >
                                {/* <span
                  style={{
                    color: "red",
                    ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),
                    borderRadius: "100px",
                    width: "20px",
                    height: "20px",
                  }}
                > */}
                                {/* <AddToCartTapsiIcon /> */}
                                <img
                                    // src="https://img.tochikala.com/tochikala/add-to-cart.svg"
                                    src="/images/addRemm/add-to-cart-tapsi.svg"
                                    alt="اضافه به سبد"
                                    className="d-inline-block"
                                    style={{ objectFit: "contain", width: "20px" }}
                                />
                                {/* </span> */}
                            </button>
                            {/* </a> */}
                        </div>
                    </div>

                    <div
                        className="addremmCont"
                        id={`addCont-${IdKala}`}
                        style={{ height: "100%", flex: "1 1 auto", display: "none" }}
                    >
                        <div
                            style={{
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                overflow: "hidden",
                            }}
                        >
                            <a
                                data-baz="0"
                                style={{
                                    flex: "1 1 auto",
                                    height: "100%",
                                    padding: "0px 2px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    textDecoration: "none",
                                    borderRadius: "50%",
                                }}
                                className={`add-${IdKala}`}
                                href="/login"
                            >
                                <button
                                    style={{
                                        height: "80%",
                                        backgroundColor: "white",
                                        border: "none",
                                        padding: "0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    className="plussMinus"
                                >
                                    <img
                                        src="https://img.tochikala.com/tochikala/add-to-cart.svg"
                                        alt="اضافه به سبد"
                                        className="d-inline-block"
                                        style={{ objectFit: "contain", width: "20px" }}
                                    />
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (ForCartContentsDesignType == 1) {
        return (
            <div
                className={`text-center align-items-center justify-content-center ForCart ${idTag}`}
                id={`${idTag}`}
                style={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: 'center', }}>
                <div className="input-group rounded-pill"
                    style={{
                        backgroundColor: "white",
                        height: "35px",
                        display: "flex",
                        flexWrap: "nowrap",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        // border: "1px solid red",   ////zare_nk_050415_commented
                        boxShadow: '0px 2px 5px rgba(0,0,0,.2)',   ////zare_nk_050415_added
                        overflow: "hidden",
                        width: "auto",
                        direction: 'rtl',   ////zare_nk_050415_added
                        flexDirection: 'row-reverse',   ////zare_nk_050415_added
                        borderRadius: "100px",   ////zare_nk_050415_added
                    }}
                    dir="ltr"   ////zare_nk_050415_commented
                >
                    <div
                        className="addremmCont"
                        id={`removeCont-${IdKala}`}
                        style={{ height: "100%", flex: "1 1 auto" }}>
                        <div style={{
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                overflow: "hidden",
                                padding: "0px 4px",
                            }} >
                            {/* <a
                data-baz="1"
                style={{
                  flex: "1 1 auto",
                  height: "100%",
                  padding: "0px 2px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
                className={`rem-${IdKala}`}
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  handlerForRemClick(e);
                }}
              > */}
                            <button
                                onClick={() => { handlerForRemClick(); }}   ////zare_nk_050415_added
                                data-baz="1"
                                style={{
                                    // height: "80%",  ////zare_nk_050415_commented
                                    flex: '0 0 auto',
                                    // backgroundColor: "white",  ////zare_nk_050415_commented
                                    backgroundColor: "#e6e9ea",  ////zare_nk_050415_added
                                    border: "none",  ////zare_nk_050415_nokteh(baraye buttone web niaze ta az css haye dakheliye buttone web jologiri koneh )
                                    padding: "0",  ////zare_nk_050415_nokteh(baraye buttone web niaze ta az css haye dakheliye buttone web jologiri koneh )
                                    display: "flex",
                                    flexDirection: 'row',   ////zare_nk_050415_added             
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "100px",   ////zare_nk_050415_added 
                                    width: "28px",
                                    height: "28px",
                                    cursor: 'pointer',  ////zare_nk_050416_added
                                }}
                            // className="plussMinus"  ////zare_nk_050415_commented
                            >
                                {/* <span style={{
                  // height: "80%",  //zare_nk_041202_commented
                  // backgroundColor: "blue",
                  ////zare_nk_041202_commented_st
                  // padding: 0,
                  // alignItems: "center",
                  // justifyContent: "center",
                  ////zare_nk_041202_commented_end
                  ////zare_nk_050316_added_st
                  borderRadius: "100px",
                  width: "20px",
                  height: "20px",
                  ////zare_nk_050316_added_end
                }}> */}
                                <img
                                    // src="https://img.tochikala.com/tochikala/remove-icon.svg"
                                    src="/images/addRemm/recycle-bin.svg"
                                    alt="حذف از سبد"
                                    className="d-inline-block"
                                    style={{ objectFit: "contain", width: "20px" }}
                                />
                                {/* </span> */}
                            </button>
                            {/* </a> */}
                        </div>
                    </div>

                    <div
                        // className={`middleCount-${IdKala}`}  ////zare_nk_050415_commented
                        // style={{ height: "100%", display: "flex", flexFlow: "column" }}  ////zare_nk_050415_commented
                        style={{
                            height: "100%", display: "flex", flexFlow: "row",
                            width: "30px", justifyContent: "center", alignItems: 'center', alignContent: "center",
                        }}>
                        <span
                            // id={`inp-${IdKala}`}  ////zare_nk_050415_commented
                            // className="text-center titleStyle"  ////zare_nk_050415_commented
                            style={{
                                backgroundColor: "white",
                                ////zare_nk_050415_commented_st
                                // border: "none",
                                // flex: "1 0 40%",
                                // width: "40px",
                                // display: "flex",
                                // justifyContent: "center",
                                // alignItems: "center",
                                // alignContent: "center",
                                ////zare_nk_050415_commented_end
                            }}
                        >
                            {tedadInSabadOrDet}
                        </span>
                        {/* zare_nk_050415_commented */}
                        {/* <span style={{ border: "none" }}> </span> */}
                    </div>

                    <div
                        // className="addremmCont"   ////zare_nk_050415_commented
                        // id={`addCont-${IdKala}`}  ////zare_nk_050415_commented
                        style={{ height: "100%", flex: "1 1 auto" }}
                    >
                        <div
                            style={{
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                overflow: "hidden",
                                padding: '0px 4px',  ////zare_nk_050415_added
                            }}
                        >
                            {/* <a
                data-baz="1"
                style={{
                  flex: "1 1 auto",
                  height: "100%",
                  padding: "0px 2px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
                className={`add-${IdKala}`}
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  handlerForAddClick(e);
                }}
              > */}
                            <button
                                onClick={() => { handlerForAddClick(); }}
                                data-baz="1"
                                title={Number(bishAzMaxTedadYaMojoodi) === 1 ? "موجودی کافی نیست" : ""}
                                style={{
                                    flex: '0 0 auto',  ////zare_nk_050415_added
                                    // height: "80%",   ////zare_nk_050415_commented
                                    // backgroundColor: "white",   ////zare_nk_050415_commented
                                    backgroundColor: "#1b1c1d",  ////zare_nk_050415_added
                                    border: "none",  ////zare_nk_050415_nokteh(baraye buttone web niaze ta az css haye dakheliye buttone web jologiri koneh )
                                    padding: "0",  ////zare_nk_050415_nokteh(baraye buttone web niaze ta az css haye dakheliye buttone web jologiri koneh )
                                    display: "flex",
                                    flexDirection: 'row',     ////zare_nk_050415_added            
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "100px",  ////zare_nk_050415_added
                                    // ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),  //zare_nk_050124_nokteh(y001-in eshtebahe chon { opacity: 0.3 } meghdare true 
                                    // barmigardoone va ...(Number(bishAzMaxTedadYaMojoodi) === 1 ham ya true ya false barmigardoone,va darkol ba and(&&) natijeye kolli ya true 
                                    // midshe ya false,pas opacity meghdare nemigireh va faghat meghdari boolean barmigardooneh!!  )

                                    // opacity: Number(bishAzMaxTedadYaMojoodi) === 1 ? 0.3 : 1, //zare_nk_050124_nokteh(rahe1-in dastoor dorosteh va javab mideh)
                                    ...(Number(bishAzMaxTedadYaMojoodi) === 1 ? { opacity: 0.3 } : { opacity: 1 }), //zare_nk_050124_nokteh(rahe2-in jaigozine raveshe eshtebahe y001 hast va dorosteh)
                                    ////zare_nk_050124_nokteh(rahe1 age gharare hamin opacity faghat meghdar begire khanatare,vali age bakhaim chandin khasiat ra meghdar bedim rahe2
                                    // tosiyeh mishe (masalan ...(Number(bishAzMaxTedadYaMojoodi) === 1 ? { opacity: 0.3,color:'silver' }:{opacity: 1,color:'red'}),))
                                    width: "28px",  ////zare_nk_050415_added
                                    height: "28px",  ////zare_nk_050415_added
                                    cursor: 'pointer',  ////zare_nk_050416_added
                                }}
                                className="plussMinus"
                                disabled={Boolean(Number(bishAzMaxTedadYaMojoodi))}
                            >
                                {/* zare_nk_050415_added(spane wrapere img ra az sabade andrpidi elham gereftam(ghablan img dakhele spani nabood)) 
                and zare_nk_041202_commented(be in natijeh residam img tooye span bimoredeh) */}
                                {/* <span style={{
                  // height: "80%",  //zare_nk_041202_commented
                  // backgroundColor: "blue",
                  ////zare_nk_041202_commented_st
                  // padding: 0,
                  // alignItems: "center",
                  // justifyContent: "center",
                  ////zare_nk_041202_commented_end
                  ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),

                  ////zare_nk_050316_added_st
                  // display:'flex',
                  // flexDirection:'row',
                  // justifyContent:'center',
                  // alignItems:'center',
                  borderRadius: "100px",
                  width: "20px",
                  height: "20px",
                  ////zare_nk_050316_added_end
                }}> */}
                                <img
                                    // src="https://img.tochikala.com/tochikala/add-to-cart.svg"
                                    src="/images/addRemm/add-to-cart-tapsi.svg"
                                    alt="اضافه به سبد"
                                    className="d-inline-block"
                                    style={{ objectFit: "contain", width: "20px" }}
                                />
                                {/* </span> */}

                            </button>
                            {/* </a> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (ForCartContentsDesignType == 2) {
        return (
            <div
                className={`text-center align-items-center justify-content-center ForCart ${idTag}`}
                id={`${idTag}`}
                style={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: 'center', }}>
                <div className="input-group rounded-pill"
                    style={{
                        backgroundColor: "white",
                        height: "35px",
                        display: "flex",
                        flexWrap: "nowrap",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        // border: "1px solid red",  ////zare_nk_050415_commented
                        boxShadow: '0px 2px 5px rgba(0,0,0,.2)',   ////zare_nk_050415_added
                        overflow: "hidden",
                        width: "auto",

                        direction: 'rtl',   ////zare_nk_050415_added
                        flexDirection: 'row-reverse',   ////zare_nk_050415_added
                        borderRadius: "100px",     ////zare_nk_050415_added
                    }}
                // dir="ltr"  ////zare_nk_050415_commented
                >
                    <div
                        // className="addremmCont"  ////zare_nk_050415_commented
                        // id={`removeCont-${IdKala}`}  ////zare_nk_050415_commented
                        style={{ height: "100%", flex: "1 1 auto" }}>
                        <div
                            style={{
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                overflow: "hidden",
                                padding: '0px 4px',  ////zare_nk_050415_added
                            }}>
                            {/* <a
                data-baz="1"
                style={{
                  flex: "1 1 auto",
                  height: "100%",
                  padding: "0px 2px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
                className={`rem-${IdKala}`}
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  handlerForRemClick(e);
                }}
              > */}
                            <button
                                onClick={() => { handlerForRemClick(); }}
                                data-baz="1"
                                style={{
                                    flex: '0 0 auto', ////zare_nk_050415_added
                                    // height: "80%", ////zare_nk_050415_commented
                                    // backgroundColor: "white", ////zare_nk_050415_commented
                                    backgroundColor: "#e6e9ea", ////zare_nk_050415_added
                                    border: "none",  ////zare_nk_050415_nokteh(baraye buttone web niaze ta az css haye dakheliye buttone web jologiri koneh )
                                    padding: "0",  ////zare_nk_050415_nokteh(baraye buttone web niaze ta az css haye dakheliye buttone web jologiri koneh )
                                    display: "flex",
                                    flexDirection: 'row', ////zare_nk_050415_added
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "100px", ////zare_nk_050415_added
                                    width: "28px", ////zare_nk_050415_added
                                    height: "28px", ////zare_nk_050415_added
                                    cursor: 'pointer',  ////zare_nk_050416_added
                                }}
                            // className="plussMinus"  ////zare_nk_050415_commented
                            >

                                {/* <span style={{
                  // height: "80%",  //zare_nk_041202_commented
                  // backgroundColor: "white",  ////zare_nk_050316_commented
                  // backgroundColor: "blue",  ////zare_nk_050316_added
                  ////zare_nk_041202_commented_st
                  // padding: 0,
                  // alignItems: "center",
                  // justifyContent: "center",
                  ////zare_nk_041202_commented_end
                  ////zare_nk_050316_added_st  
                  borderRadius: "100px",
                  width: "20px",
                  height: "20px",
                  ////zare_nk_050316_added_end
                }}> */}
                                <img
                                    // src="https://img.tochikala.com/tochikala/remove-from-cart.svg"
                                    src="/images/addRemm/remove-from-cart-tapsi.svg"
                                    alt="حذف از سبد"
                                    className="d-inline-block"
                                    style={{ objectFit: "contain", width: "20px" }}
                                />
                                {/* </span> */}
                            </button>
                            {/* </a> */}
                        </div>
                    </div>

                    <div
                        // className={`middleCount-${IdKala}`}   ////zare_nk_050415_commented
                        // style={{ height: "100%", display: "flex", flexFlow: "column" }}   ////zare_nk_050415_commented
                        style={{   ////zare_nk_050415_added
                            height: "100%", display: "flex", flexFlow: "row", width: "30px",
                            justifyContent: "center", alignItems: 'center', alignContent: "center",
                        }}
                    >
                        <span
                            // id={`inp-${IdKala}`}    ////zare_nk_050415_commented 
                            // className="text-center titleStyle"   ////zare_nk_050415_commented
                            style={{
                                backgroundColor: "white",
                                ////zare_nk_050415_commented_st
                                // border: "none",
                                // flex: "1 0 40%",
                                // width: "40px",
                                // display: "flex",
                                // justifyContent: "center",
                                // alignItems: "center",
                                // alignContent: "center",
                                ////zare_nk_050415_commented_end
                            }}
                        >
                            {tedadInSabadOrDet}
                        </span>
                        <span style={{ border: "none" }}> </span>
                    </div>

                    <div
                        // className="addremmCont"     ////zare_nk_050415_commented
                        // id={`addCont-${IdKala}`}   ////zare_nk_050415_commented
                        style={{ height: "100%", flex: "1 1 auto" }}
                    >
                        <div
                            style={{
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                overflow: "hidden",
                                padding: '0px 4px',     ////zare_nk_050415_added
                            }}
                        >
                            {/* <a
                data-baz="1"
                style={{
                  flex: "1 1 auto",
                  height: "100%",
                  padding: "0px 2px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
                className={`add-${IdKala}`}
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  handlerForAddClick(e);
                }}
              > */}
                            <button
                                onClick={() => { handlerForAddClick(); }}
                                data-baz="1"
                                title={Number(bishAzMaxTedadYaMojoodi) === 1 ? "موجودی کافی نیست" : ""}
                                style={{
                                    flex: '0 0 auto', ////zare_nk_050415_added
                                    // height: "80%", ////zare_nk_050415_commented
                                    // backgroundColor: "white", ////zare_nk_050415_commented
                                    backgroundColor: "#1b1c1d", ////zare_nk_050415_added
                                    border: "none",  ////zare_nk_050415_nokteh(baraye buttone web niaze ta az css haye dakheliye buttone web jologiri koneh )
                                    padding: "0",   ////zare_nk_050415_nokteh(baraye buttone web niaze ta az css haye dakheliye buttone web jologiri koneh )
                                    display: "flex",
                                    flexDirection: 'row', ////zare_nk_050415_added
                                    alignItems: "center",
                                    justifyContent: "center",
                                    // ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),  //zare_nk_050124_nokteh(y001-in eshtebahe chon { opacity: 0.3 } meghdare true 
                                    // barmigardoone va ...(Number(bishAzMaxTedadYaMojoodi) === 1 ham ya true ya false barmigardoone,va darkol ba and(&&) natijeye kolli ya true 
                                    // midshe ya false,pas opacity meghdare nemigireh va faghat meghdari boolean barmigardooneh!!  )

                                    // opacity: Number(bishAzMaxTedadYaMojoodi) === 1 ? 0.3 : 1, //zare_nk_050124_nokteh(rahe1-in dastoor dorosteh va javab mideh)
                                    ...(Number(bishAzMaxTedadYaMojoodi) === 1 ? { opacity: 0.3 } : { opacity: 1 }), //zare_nk_050124_nokteh(rahe2-in jaigozine raveshe eshtebahe y001 hast va dorosteh)
                                    ////zare_nk_050124_nokteh(rahe1 age gharare hamin opacity faghat meghdar begire khanatare,vali age bakhaim chandin khasiat ra meghdar bedim rahe2
                                    // tosiyeh mishe (masalan ...(Number(bishAzMaxTedadYaMojoodi) === 1 ? { opacity: 0.3,color:'silver' }:{opacity: 1,color:'red'}),))

                                    borderRadius: "100px", ////zare_nk_050415_added
                                    width: "28px", ////zare_nk_050415_added
                                    height: "28px", ////zare_nk_050415_added
                                    cursor: 'pointer',  ////zare_nk_050416_added
                                }}
                                // className="plussMinus"  ////zare_nk_050415_commented
                                disabled={Boolean(Number(bishAzMaxTedadYaMojoodi))}
                            >
                                {/* <span style={{
                  // height: "80%",  //zare_nk_041202_commented
                  // backgroundColor: "white",  ////zare_nk_050316_commented
                  // backgroundColor: "blue",  ////zare_nk_050316_added
                  ////zare_nk_041202_commented_st
                  // padding: 0,
                  // alignItems: "center",
                  // justifyContent: "center",
                  ////zare_nk_041202_commented_end
                  ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),

                  // borderWidth: 1,
                  // borderStyle: 'dashed',
                  // borderColor: 'red',
                  ////zare_nk_050316_added_st
                  // display:'flex',
                  // flexDirection:'row',   
                  // justifyContent:'center',
                  // alignItems:'center',
                  borderRadius: "100px",
                  width: "20px",
                  height: "20px",
                  ////zare_nk_050316_added_end
                }}> */}
                                <img
                                    // src="https://img.tochikala.com/tochikala/add-to-cart.svg"
                                    src="/images/addRemm/add-to-cart-tapsi.svg"
                                    alt="اضافه به سبد"
                                    className="d-inline-block"
                                    style={{ objectFit: "contain", width: "20px" }}
                                />
                                {/* </span> */}
                            </button>
                            {/* </a> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default memo(AddRemBtnsAndCountPackege);