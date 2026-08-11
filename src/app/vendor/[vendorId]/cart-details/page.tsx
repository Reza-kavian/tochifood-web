// ////zare_nk_050428_okk(2)
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

import Link from "next/link";
import { json } from "stream/consumers";

import AddRemBtnsAndCountPackege from '../../../../components/addRemBtnsAndCountPackege';

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

////zare_nk_050417_commented_st(baraye enteghal be file addRemBtnsAndCountPackege.tsx)
// type MiddleCountTedadSefrType = {
//     // SabadRow: SabadRowType | ForCartContInProdDetValType;  //zare_nk_041120_nokteh(in khat commenteh, faghat jahate olgue hazf nakardam)
//     ////zare_nk_041120_added_st
//     refForfather: RefObject<string | null>;
//     fromShowDetails: boolean;
//     IdKala: number;
//     idTag: string;
//     tedadInSabadOrDet: number;
//     ////zare_nk_041120_added_end
//     handlerForAddClick: (e?: MouseEvent<HTMLAnchorElement>) => void;
//     handlerForRemClick: (e?: MouseEvent<HTMLAnchorElement>) => void;
//     ForCartContentsDesignType: number;
//     bishAzMaxTedadYaMojoodi: number | null;
// };

// function MiddleCountTedadSefr({  //zare_nk_041127_added
//     // SabadRow,  //zare_nk_041120_commented
//     ////zare_nk_041120_added_st
//     refForfather,
//     fromShowDetails,
//     IdKala,
//     idTag,
//     tedadInSabadOrDet,
//     ////zare_nk_041120_added_end
//     handlerForAddClick,
//     handlerForRemClick,
//     ForCartContentsDesignType,
//     bishAzMaxTedadYaMojoodi,
//     ///////////////////////////////////zare_nk_041120_added_end
// }: MiddleCountTedadSefrType) {
//     console.log('ShallowRoutingExample called-MiddleCountTedadSefr-ForCartContentsDesignType: ' + ForCartContentsDesignType);
//     useEffect(() => {
//         ////zare_nk_041120_commented_st
//         // console.log('2-041119-SabadRow: ' + JSON.stringify(SabadRow));
//         // console.log('2-041119-ForCartContentsDesignType: ' + ForCartContentsDesignType);
//         // console.log('2-041119-bishAzMaxTedadYaMojoodi: ' + bishAzMaxTedadYaMojoodi);
//         ////zare_nk_041120_commented_end
//     });

//     useEffect(() => {
//         // if ("refForfather" in SabadRow) {
//         //   SabadRow.refForfather.current = SabadRow.fromShowDetails
//         //     ? "#DetailsInfoCont"
//         //     : "#sabadItemsContInSafhe";
//         // }
//         console.log('refForfather.current iss: ' + refForfather.current);
//         ////zare_nk_041127_commented_st
//         // refForfather.current = fromShowDetails
//         //   ? "#DetailsInfoCont"
//         //   : "#sabadItemsContInSafhe"; 

//         //if (ForCartContentsDesignType == 0) {
//         // if (IdKala) {
//         //   const ForCartWidth = document.querySelector(
//         //     refForfather.current +
//         //     " #ForCart-" +
//         //     IdKala +
//         //     " .input-group"
//         //   );
//         //   if (ForCartWidth instanceof HTMLElement) {
//         //      ForCartWidth.style.width = "35px";
//         //   }
//         // }
//         //} else if (ForCartContentsDesignType == 1) {
//         // if (IdKala) {
//         //   const ForCartWidth = document.querySelector(
//         //     refForfather.current +
//         //     " #ForCart-" +
//         //     IdKala +
//         //     " .input-group"
//         //   );
//         //   if (ForCartWidth instanceof HTMLElement) {
//         //     ForCartWidth.style.width = "auto";
//         //   }
//         // }
//         //} else if (ForCartContentsDesignType == 2) {
//         // if (IdKala) {
//         //   const ForCartWidth = document.querySelector(
//         //     refForfather.current +
//         //     " #ForCart-" +
//         //     IdKala +
//         //     " .input-group"
//         //   );
//         //   if (ForCartWidth instanceof HTMLElement) {
//         //     ForCartWidth.style.width = "auto";
//         //   }
//         // }
//         //}
//         ////zare_nk_041127_commented_end
//     });

//     if (ForCartContentsDesignType == 0) {
//         return (
//             <div
//                 className={`text-center align-items-center justify-content-center ForCart ${idTag}`}
//                 id={`${idTag}`}
//                 style={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: 'center', }}
//             >
//                 <div
//                     className="input-group rounded-pill"
//                     style={{
//                         backgroundColor: "white",
//                         height: "35px",
//                         display: "flex",
//                         flexWrap: "nowrap",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         alignContent: "center",
//                         // border: "1px solid red",  ////zare_nk_050414_commented
//                         boxShadow: '0px 2px 5px rgba(0,0,0,.2)',  ////zare_nk_050414_added
//                         overflow: "hidden",
//                         width: "35px",  ////zare_nk_050414_added

//                         direction: 'rtl',  ////zare_nk_050414_added
//                         flexDirection: 'row-reverse',  ////zare_nk_050414_added 
//                         borderRadius: 100,   ////zare_nk_050414_added
//                     }}
//                 // dir="ltr"  ////zare_nk_050414_commented
//                 >
//                     <div
//                         className="addremmCont"
//                         id={`removeCont-${IdKala}`}
//                         style={{ height: "100%", flex: "1 1 auto", display: "none" }}
//                     >
//                         <div
//                             style={{
//                                 height: "100%",
//                                 display: "flex",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                                 alignContent: "center",
//                                 overflow: "hidden",
//                             }}
//                         >
//                             <a
//                                 data-baz="0"
//                                 style={{
//                                     flex: "1 1 auto",
//                                     height: "100%",
//                                     padding: "0px 2px",
//                                     display: "flex",
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     textDecoration: "none",
//                                     borderRadius: "50%",
//                                 }}
//                                 className={`rem-${IdKala}`}
//                                 href="/login"
//                             >
//                                 <button
//                                     style={{
//                                         height: "80%",
//                                         backgroundColor: "white",
//                                         border: "none",
//                                         padding: "0",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         justifyContent: "center",
//                                     }}
//                                     className="plussMinus"
//                                 >
//                                     <img
//                                         src="https://img.tochikala.com/tochikala/remove-icon.svg"
//                                         alt="حذف از سبد"
//                                         className="d-inline-block"
//                                         style={{ objectFit: "contain", width: "20px" }}
//                                     />
//                                 </button>
//                             </a>
//                         </div>
//                     </div>

//                     <div
//                         className={`middleCount-${IdKala}`}
//                         style={{
//                             height: "100%",
//                             flex: "1 1 auto",
//                             display: "flex",
//                             // flexFlow: "column", ////zare_nk_050414_commented
//                         }}
//                     >
//                         {/* zare_nk_050415_nokteh(span be div tabdil shod) */}
//                         <div
//                             style={{
//                                 height: "100%",
//                                 // border: "none", ////zare_nk_050414_commented
//                                 display: "flex",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                                 alignContent: "center",
//                                 overflow: "hidden",
//                                 padding: "0px 4px", ////zare_nk_050414_added
//                             }}
//                         >
//                             {/* <a
//                 data-baz="1"
//                 style={{
//                   flex: "1 1 auto",
//                   height: "100",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   textDecoration: "none",
//                   borderRadius: "50%",
//                 }}
//                 className={`add-${IdKala}`}
//                 href="/login"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handlerForAddClick(e);
//                 }}
//               > */}
//                             <button
//                                 onClick={() => { handlerForAddClick(); }}
//                                 data-baz="1"
//                                 id={`inp-${IdKala}`}
//                                 style={{
//                                     flex: "1 1 auto",
//                                     flexDirection: 'row',
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     opacity: Number(bishAzMaxTedadYaMojoodi) === 1 ? 0.3 : 1,  ////zare_nk_050414_added
//                                     display: "flex",
//                                     // color: "red",  ////zare_nk_050414_commented
//                                     fontSize: "14px",
//                                     borderRadius: "100px",////zare_nk_050414_added
//                                     width: "28px",////zare_nk_050414_added
//                                     height: "28px",////zare_nk_050414_added
//                                     backgroundColor: "#1b1c1d",////zare_nk_050414_added
//                                     border: "none",  ////zare_nk_050415_nokteh(baraye buttone web niaze ta az css haye dakheliye buttone web jologiri koneh )
//                                     padding: "0",  ////zare_nk_050415_nokteh(baraye buttone web niaze ta az css haye dakheliye buttone web jologiri koneh )
//                                     cursor: 'pointer',  ////zare_nk_050416_added
//                                 }}
//                                 disabled={Boolean(Number(bishAzMaxTedadYaMojoodi))}
//                             // className="plussMinus card-linkk text-dangerr fa fa-plus"
//                             >
//                                 {/* <span
//                   style={{
//                     color: "red",
//                     ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),
//                     borderRadius: "100px",
//                     width: "20px",
//                     height: "20px",
//                   }}
//                 > */}
//                                 {/* <AddToCartTapsiIcon /> */}
//                                 <img
//                                     // src="https://img.tochikala.com/tochikala/add-to-cart.svg"
//                                     src="/images/addRemm/add-to-cart-tapsi.svg"
//                                     alt="اضافه به سبد"
//                                     className="d-inline-block"
//                                     style={{ objectFit: "contain", width: "20px" }}
//                                 />
//                                 {/* </span> */}
//                             </button>
//                             {/* </a> */}
//                         </div>
//                     </div>

//                     <div
//                         className="addremmCont"
//                         id={`addCont-${IdKala}`}
//                         style={{ height: "100%", flex: "1 1 auto", display: "none" }}
//                     >
//                         <div
//                             style={{
//                                 height: "100%",
//                                 display: "flex",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                                 alignContent: "center",
//                                 overflow: "hidden",
//                             }}
//                         >
//                             <a
//                                 data-baz="0"
//                                 style={{
//                                     flex: "1 1 auto",
//                                     height: "100%",
//                                     padding: "0px 2px",
//                                     display: "flex",
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     textDecoration: "none",
//                                     borderRadius: "50%",
//                                 }}
//                                 className={`add-${IdKala}`}
//                                 href="/login"
//                             >
//                                 <button
//                                     style={{
//                                         height: "80%",
//                                         backgroundColor: "white",
//                                         border: "none",
//                                         padding: "0",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         justifyContent: "center",
//                                     }}
//                                     className="plussMinus"
//                                 >
//                                     <img
//                                         src="https://img.tochikala.com/tochikala/add-to-cart.svg"
//                                         alt="اضافه به سبد"
//                                         className="d-inline-block"
//                                         style={{ objectFit: "contain", width: "20px" }}
//                                     />
//                                 </button>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     } else if (ForCartContentsDesignType == 1) {
//         return (
//             <div
//                 className={`text-center align-items-center justify-content-center ForCart ${idTag}`}
//                 id={`${idTag}`}
//                 style={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: 'center', }}
//             >
//                 <div
//                     className="input-group rounded-pill"
//                     style={{
//                         backgroundColor: "white",
//                         height: "35px",
//                         display: "flex",
//                         flexWrap: "nowrap",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         alignContent: "center",
//                         // border: "1px solid red",   ////zare_nk_050415_commented
//                         boxShadow: '0px 2px 5px rgba(0,0,0,.2)',   ////zare_nk_050415_added
//                         overflow: "hidden",
//                         width: "auto",
//                         direction: 'rtl',   ////zare_nk_050415_added
//                         flexDirection: 'row-reverse',   ////zare_nk_050415_added
//                         borderRadius: "100px",   ////zare_nk_050415_added
//                     }}
//                     dir="ltr"   ////zare_nk_050415_commented
//                 >
//                     <div
//                         className="addremmCont"
//                         id={`removeCont-${IdKala}`}
//                         style={{ height: "100%", flex: "1 1 auto" }}
//                     >
//                         <div
//                             style={{
//                                 height: "100%",
//                                 display: "flex",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                                 alignContent: "center",
//                                 overflow: "hidden",
//                                 padding: "0px 4px",
//                             }}
//                         >
//                             {/* <a
//                 data-baz="1"
//                 style={{
//                   flex: "1 1 auto",
//                   height: "100%",
//                   padding: "0px 2px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   borderRadius: "50%",
//                 }}
//                 className={`rem-${IdKala}`}
//                 href="/login"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handlerForRemClick(e);
//                 }}
//               > */}
//                             <button
//                                 onClick={() => { handlerForRemClick(); }}   ////zare_nk_050415_added
//                                 data-baz="1"
//                                 style={{
//                                     // height: "80%",  ////zare_nk_050415_commented
//                                     flex: '0 0 auto',
//                                     // backgroundColor: "white",  ////zare_nk_050415_commented
//                                     backgroundColor: "#e6e9ea",  ////zare_nk_050415_added
//                                     border: "none",  ////zare_nk_050415_nokteh(baraye buttone web niaze ta az css haye dakheliye buttone web jologiri koneh )
//                                     padding: "0",  ////zare_nk_050415_nokteh(baraye buttone web niaze ta az css haye dakheliye buttone web jologiri koneh )
//                                     display: "flex",
//                                     flexDirection: 'row',   ////zare_nk_050415_added             
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     borderRadius: "100px",   ////zare_nk_050415_added 
//                                     width: "28px",
//                                     height: "28px",
//                                     cursor: 'pointer',  ////zare_nk_050416_added
//                                 }}
//                             // className="plussMinus"  ////zare_nk_050415_commented
//                             >
//                                 {/* <span style={{
//                   // height: "80%",  //zare_nk_041202_commented
//                   // backgroundColor: "blue",
//                   ////zare_nk_041202_commented_st
//                   // padding: 0,
//                   // alignItems: "center",
//                   // justifyContent: "center",
//                   ////zare_nk_041202_commented_end
//                   ////zare_nk_050316_added_st
//                   borderRadius: "100px",
//                   width: "20px",
//                   height: "20px",
//                   ////zare_nk_050316_added_end
//                 }}> */}
//                                 <img
//                                     // src="https://img.tochikala.com/tochikala/remove-icon.svg"
//                                     src="/images/addRemm/recycle-bin.svg"
//                                     alt="حذف از سبد"
//                                     className="d-inline-block"
//                                     style={{ objectFit: "contain", width: "20px" }}
//                                 />
//                                 {/* </span> */}
//                             </button>
//                             {/* </a> */}
//                         </div>
//                     </div>

//                     <div
//                         // className={`middleCount-${IdKala}`}  ////zare_nk_050415_commented
//                         // style={{ height: "100%", display: "flex", flexFlow: "column" }}  ////zare_nk_050415_commented
//                         style={{
//                             height: "100%", display: "flex", flexFlow: "row",
//                             width: "30px", justifyContent: "center", alignItems: 'center', alignContent: "center",
//                         }}>
//                         <span
//                             // id={`inp-${IdKala}`}  ////zare_nk_050415_commented
//                             // className="text-center titleStyle"  ////zare_nk_050415_commented
//                             style={{
//                                 backgroundColor: "white",
//                                 ////zare_nk_050415_commented_st
//                                 // border: "none",
//                                 // flex: "1 0 40%",
//                                 // width: "40px",
//                                 // display: "flex",
//                                 // justifyContent: "center",
//                                 // alignItems: "center",
//                                 // alignContent: "center",
//                                 ////zare_nk_050415_commented_end
//                             }}
//                         >
//                             {tedadInSabadOrDet}
//                         </span>
//                         {/* zare_nk_050415_commented */}
//                         {/* <span style={{ border: "none" }}> </span> */}
//                     </div>

//                     <div
//                         // className="addremmCont"   ////zare_nk_050415_commented
//                         // id={`addCont-${IdKala}`}  ////zare_nk_050415_commented
//                         style={{ height: "100%", flex: "1 1 auto" }}
//                     >
//                         <div
//                             style={{
//                                 height: "100%",
//                                 display: "flex",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                                 alignContent: "center",
//                                 overflow: "hidden",
//                                 padding: '0px 4px',  ////zare_nk_050415_added
//                             }}
//                         >
//                             {/* <a
//                 data-baz="1"
//                 style={{
//                   flex: "1 1 auto",
//                   height: "100%",
//                   padding: "0px 2px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   borderRadius: "50%",
//                 }}
//                 className={`add-${IdKala}`}
//                 href="/login"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handlerForAddClick(e);
//                 }}
//               > */}
//                             <button
//                                 onClick={() => { handlerForAddClick(); }}
//                                 data-baz="1"
//                                 title={Number(bishAzMaxTedadYaMojoodi) === 1 ? "موجودی کافی نیست" : ""}
//                                 style={{
//                                     flex: '0 0 auto',  ////zare_nk_050415_added
//                                     // height: "80%",   ////zare_nk_050415_commented
//                                     // backgroundColor: "white",   ////zare_nk_050415_commented
//                                     backgroundColor: "#1b1c1d",  ////zare_nk_050415_added
//                                     border: "none",  ////zare_nk_050415_nokteh(baraye buttone web niaze ta az css haye dakheliye buttone web jologiri koneh )
//                                     padding: "0",  ////zare_nk_050415_nokteh(baraye buttone web niaze ta az css haye dakheliye buttone web jologiri koneh )
//                                     display: "flex",
//                                     flexDirection: 'row',     ////zare_nk_050415_added            
//                                     justifyContent: "center",
//                                     alignItems: "center",
//                                     borderRadius: "100px",  ////zare_nk_050415_added
//                                     // ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),  //zare_nk_050124_nokteh(y001-in eshtebahe chon { opacity: 0.3 } meghdare true 
//                                     // barmigardoone va ...(Number(bishAzMaxTedadYaMojoodi) === 1 ham ya true ya false barmigardoone,va darkol ba and(&&) natijeye kolli ya true 
//                                     // midshe ya false,pas opacity meghdare nemigireh va faghat meghdari boolean barmigardooneh!!  )

//                                     // opacity: Number(bishAzMaxTedadYaMojoodi) === 1 ? 0.3 : 1, //zare_nk_050124_nokteh(rahe1-in dastoor dorosteh va javab mideh)
//                                     ...(Number(bishAzMaxTedadYaMojoodi) === 1 ? { opacity: 0.3 } : { opacity: 1 }), //zare_nk_050124_nokteh(rahe2-in jaigozine raveshe eshtebahe y001 hast va dorosteh)
//                                     ////zare_nk_050124_nokteh(rahe1 age gharare hamin opacity faghat meghdar begire khanatare,vali age bakhaim chandin khasiat ra meghdar bedim rahe2
//                                     // tosiyeh mishe (masalan ...(Number(bishAzMaxTedadYaMojoodi) === 1 ? { opacity: 0.3,color:'silver' }:{opacity: 1,color:'red'}),))
//                                     width: "28px",  ////zare_nk_050415_added
//                                     height: "28px",  ////zare_nk_050415_added
//                                     cursor: 'pointer',  ////zare_nk_050416_added
//                                 }}
//                                 className="plussMinus"
//                                 disabled={Boolean(Number(bishAzMaxTedadYaMojoodi))}
//                             >
//                                 {/* zare_nk_050415_added(spane wrapere img ra az sabade andrpidi elham gereftam(ghablan img dakhele spani nabood)) 
//                 and zare_nk_041202_commented(be in natijeh residam img tooye span bimoredeh) */}
//                                 {/* <span style={{
//                   // height: "80%",  //zare_nk_041202_commented
//                   // backgroundColor: "blue",
//                   ////zare_nk_041202_commented_st
//                   // padding: 0,
//                   // alignItems: "center",
//                   // justifyContent: "center",
//                   ////zare_nk_041202_commented_end
//                   ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),

//                   ////zare_nk_050316_added_st
//                   // display:'flex',
//                   // flexDirection:'row',
//                   // justifyContent:'center',
//                   // alignItems:'center',
//                   borderRadius: "100px",
//                   width: "20px",
//                   height: "20px",
//                   ////zare_nk_050316_added_end
//                 }}> */}
//                                 <img
//                                     // src="https://img.tochikala.com/tochikala/add-to-cart.svg"
//                                     src="/images/addRemm/add-to-cart-tapsi.svg"
//                                     alt="اضافه به سبد"
//                                     className="d-inline-block"
//                                     style={{ objectFit: "contain", width: "20px" }}
//                                 />
//                                 {/* </span> */}

//                             </button>
//                             {/* </a> */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     } else if (ForCartContentsDesignType == 2) {
//         return (
//             <div
//                 className={`text-center align-items-center justify-content-center ForCart ${idTag}`}
//                 id={`${idTag}`}
//                 style={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: 'center', }}
//             >
//                 <div
//                     className="input-group rounded-pill"
//                     style={{
//                         backgroundColor: "white",
//                         height: "35px",
//                         display: "flex",
//                         flexWrap: "nowrap",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         alignContent: "center",
//                         // border: "1px solid red",  ////zare_nk_050415_commented
//                         boxShadow: '0px 2px 5px rgba(0,0,0,.2)',   ////zare_nk_050415_added
//                         overflow: "hidden",
//                         width: "auto",

//                         direction: 'rtl',   ////zare_nk_050415_added
//                         flexDirection: 'row-reverse',   ////zare_nk_050415_added
//                         borderRadius: "100px",     ////zare_nk_050415_added
//                     }}
//                 // dir="ltr"  ////zare_nk_050415_commented
//                 >
//                     <div
//                         // className="addremmCont"  ////zare_nk_050415_commented
//                         // id={`removeCont-${IdKala}`}  ////zare_nk_050415_commented
//                         style={{ height: "100%", flex: "1 1 auto" }}
//                     >
//                         <div
//                             style={{
//                                 height: "100%",
//                                 display: "flex",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                                 alignContent: "center",
//                                 overflow: "hidden",
//                                 padding: '0px 4px',  ////zare_nk_050415_added
//                             }}
//                         >
//                             {/* <a
//                 data-baz="1"
//                 style={{
//                   flex: "1 1 auto",
//                   height: "100%",
//                   padding: "0px 2px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   borderRadius: "50%",
//                 }}
//                 className={`rem-${IdKala}`}
//                 href="/login"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handlerForRemClick(e);
//                 }}
//               > */}
//                             <button
//                                 onClick={() => { handlerForRemClick(); }}
//                                 data-baz="1"
//                                 style={{
//                                     flex: '0 0 auto', ////zare_nk_050415_added
//                                     // height: "80%", ////zare_nk_050415_commented
//                                     // backgroundColor: "white", ////zare_nk_050415_commented
//                                     backgroundColor: "#e6e9ea", ////zare_nk_050415_added
//                                     border: "none",  ////zare_nk_050415_nokteh(baraye buttone web niaze ta az css haye dakheliye buttone web jologiri koneh )
//                                     padding: "0",  ////zare_nk_050415_nokteh(baraye buttone web niaze ta az css haye dakheliye buttone web jologiri koneh )
//                                     display: "flex",
//                                     flexDirection: 'row', ////zare_nk_050415_added
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     borderRadius: "100px", ////zare_nk_050415_added
//                                     width: "28px", ////zare_nk_050415_added
//                                     height: "28px", ////zare_nk_050415_added
//                                     cursor: 'pointer',  ////zare_nk_050416_added
//                                 }}
//                             // className="plussMinus"  ////zare_nk_050415_commented
//                             >

//                                 {/* <span style={{
//                   // height: "80%",  //zare_nk_041202_commented
//                   // backgroundColor: "white",  ////zare_nk_050316_commented
//                   // backgroundColor: "blue",  ////zare_nk_050316_added
//                   ////zare_nk_041202_commented_st
//                   // padding: 0,
//                   // alignItems: "center",
//                   // justifyContent: "center",
//                   ////zare_nk_041202_commented_end
//                   ////zare_nk_050316_added_st  
//                   borderRadius: "100px",
//                   width: "20px",
//                   height: "20px",
//                   ////zare_nk_050316_added_end
//                 }}> */}
//                                 <img
//                                     // src="https://img.tochikala.com/tochikala/remove-from-cart.svg"
//                                     src="/images/addRemm/remove-from-cart-tapsi.svg"
//                                     alt="حذف از سبد"
//                                     className="d-inline-block"
//                                     style={{ objectFit: "contain", width: "20px" }}
//                                 />
//                                 {/* </span> */}
//                             </button>
//                             {/* </a> */}
//                         </div>
//                     </div>

//                     <div
//                         // className={`middleCount-${IdKala}`}   ////zare_nk_050415_commented
//                         // style={{ height: "100%", display: "flex", flexFlow: "column" }}   ////zare_nk_050415_commented
//                         style={{   ////zare_nk_050415_added
//                             height: "100%", display: "flex", flexFlow: "row", width: "30px",
//                             justifyContent: "center", alignItems: 'center', alignContent: "center",
//                         }}
//                     >
//                         <span
//                             // id={`inp-${IdKala}`}    ////zare_nk_050415_commented 
//                             // className="text-center titleStyle"   ////zare_nk_050415_commented
//                             style={{
//                                 backgroundColor: "white",
//                                 ////zare_nk_050415_commented_st
//                                 // border: "none",
//                                 // flex: "1 0 40%",
//                                 // width: "40px",
//                                 // display: "flex",
//                                 // justifyContent: "center",
//                                 // alignItems: "center",
//                                 // alignContent: "center",
//                                 ////zare_nk_050415_commented_end
//                             }}
//                         >
//                             {tedadInSabadOrDet}
//                         </span>
//                         <span style={{ border: "none" }}> </span>
//                     </div>

//                     <div
//                         // className="addremmCont"     ////zare_nk_050415_commented
//                         // id={`addCont-${IdKala}`}   ////zare_nk_050415_commented
//                         style={{ height: "100%", flex: "1 1 auto" }}
//                     >
//                         <div
//                             style={{
//                                 height: "100%",
//                                 display: "flex",
//                                 justifyContent: "center",
//                                 alignItems: "center",
//                                 alignContent: "center",
//                                 overflow: "hidden",
//                                 padding: '0px 4px',     ////zare_nk_050415_added
//                             }}
//                         >
//                             {/* <a
//                 data-baz="1"
//                 style={{
//                   flex: "1 1 auto",
//                   height: "100%",
//                   padding: "0px 2px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   borderRadius: "50%",
//                 }}
//                 className={`add-${IdKala}`}
//                 href="/login"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handlerForAddClick(e);
//                 }}
//               > */}
//                             <button
//                                 onClick={() => { handlerForAddClick(); }}
//                                 data-baz="1"
//                                 title={Number(bishAzMaxTedadYaMojoodi) === 1 ? "موجودی کافی نیست" : ""}
//                                 style={{
//                                     flex: '0 0 auto', ////zare_nk_050415_added
//                                     // height: "80%", ////zare_nk_050415_commented
//                                     // backgroundColor: "white", ////zare_nk_050415_commented
//                                     backgroundColor: "#1b1c1d", ////zare_nk_050415_added
//                                     border: "none",  ////zare_nk_050415_nokteh(baraye buttone web niaze ta az css haye dakheliye buttone web jologiri koneh )
//                                     padding: "0",   ////zare_nk_050415_nokteh(baraye buttone web niaze ta az css haye dakheliye buttone web jologiri koneh )
//                                     display: "flex",
//                                     flexDirection: 'row', ////zare_nk_050415_added
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     // ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),  //zare_nk_050124_nokteh(y001-in eshtebahe chon { opacity: 0.3 } meghdare true 
//                                     // barmigardoone va ...(Number(bishAzMaxTedadYaMojoodi) === 1 ham ya true ya false barmigardoone,va darkol ba and(&&) natijeye kolli ya true 
//                                     // midshe ya false,pas opacity meghdare nemigireh va faghat meghdari boolean barmigardooneh!!  )

//                                     // opacity: Number(bishAzMaxTedadYaMojoodi) === 1 ? 0.3 : 1, //zare_nk_050124_nokteh(rahe1-in dastoor dorosteh va javab mideh)
//                                     ...(Number(bishAzMaxTedadYaMojoodi) === 1 ? { opacity: 0.3 } : { opacity: 1 }), //zare_nk_050124_nokteh(rahe2-in jaigozine raveshe eshtebahe y001 hast va dorosteh)
//                                     ////zare_nk_050124_nokteh(rahe1 age gharare hamin opacity faghat meghdar begire khanatare,vali age bakhaim chandin khasiat ra meghdar bedim rahe2
//                                     // tosiyeh mishe (masalan ...(Number(bishAzMaxTedadYaMojoodi) === 1 ? { opacity: 0.3,color:'silver' }:{opacity: 1,color:'red'}),))

//                                     borderRadius: "100px", ////zare_nk_050415_added
//                                     width: "28px", ////zare_nk_050415_added
//                                     height: "28px", ////zare_nk_050415_added
//                                     cursor: 'pointer',  ////zare_nk_050416_added
//                                 }}
//                                 // className="plussMinus"  ////zare_nk_050415_commented
//                                 disabled={Boolean(Number(bishAzMaxTedadYaMojoodi))}
//                             >
//                                 {/* <span style={{
//                   // height: "80%",  //zare_nk_041202_commented
//                   // backgroundColor: "white",  ////zare_nk_050316_commented
//                   // backgroundColor: "blue",  ////zare_nk_050316_added
//                   ////zare_nk_041202_commented_st
//                   // padding: 0,
//                   // alignItems: "center",
//                   // justifyContent: "center",
//                   ////zare_nk_041202_commented_end
//                   ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),

//                   // borderWidth: 1,
//                   // borderStyle: 'dashed',
//                   // borderColor: 'red',
//                   ////zare_nk_050316_added_st
//                   // display:'flex',
//                   // flexDirection:'row',   
//                   // justifyContent:'center',
//                   // alignItems:'center',
//                   borderRadius: "100px",
//                   width: "20px",
//                   height: "20px",
//                   ////zare_nk_050316_added_end
//                 }}> */}
//                                 <img
//                                     // src="https://img.tochikala.com/tochikala/add-to-cart.svg"
//                                     src="/images/addRemm/add-to-cart-tapsi.svg"
//                                     alt="اضافه به سبد"
//                                     className="d-inline-block"
//                                     style={{ objectFit: "contain", width: "20px" }}
//                                 />
//                                 {/* </span> */}
//                             </button>
//                             {/* </a> */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
////zare_nk_050417_commented_end(baraye enteghal be file addRemBtnsAndCountPackege.tsx)

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

////zare_nk_050416_added_st
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
////zare_nk_050416_added_end

////zare_nk_050405_nokteh_st(rahe1- baraye serverComponent)
// type Props2 = {
//     params: Promise<{
//         vendorId: string;
//     }>;
// };
// export default async function CartDetails({ params }: Props2) { 
// // const { vendorId } = await params;
////zare_nk_050405_nokteh_end(rahe1- baraye serverComponent)
////zare_nk_050405_nokteh_st(rahe2- baraye serverComponent)
export default function CartDetails() {
    console.log('zare_nk_050521_CartDetails called!!');
    const { vendorId } = useParams();
    const params = useSearchParams();   ////zare_nk_050416_added
    const idTitr = params.get("idTitr") || "Unknown";   ////zare_nk_050416_added

    ////zare_nk_050405_nokteh_end(rahe2- baraye serverComponent)
    console.log('050416-CartDetails rendered!!-vendorId: ' + vendorId + '-idTitr: ' + idTitr);   ////zare_nk_050329_added
    // ////zare_nk_050404_added_st
    const [error, setError] = useState<string | null>(null);
    const [errorInCartDetails, setErrorInCartDetails] = useState<string | null>(null);

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

    const [sabadRows, setSabadRows] = useState<SabadRowType[]>([]);
    console.log('ya ali-sabadRows: ' + JSON.stringify(sabadRows));

    const refForfather = useRef<string | null>(null);  ////zare_nk_050416_added(dar sabade food karbord nadareh,baraye marja boodane componente AddRemBtnsAndCountPackege gozashtam)

    const [isOpenedMymodalForWarning, setIsOpenedMymodalForWarning] = useState(false);
    const [warningTextInMymodalForWarning, setWarningTextInMymodalForWarning] = useState('');

    useEffect(() => {
        const tempAsync = async () => {
            const chosenAddress = await getCookie("chosenAddress");
            var parsedChosenAddress: responsedListFromApiSelectAddressListType | null = chosenAddress ? JSON.parse(chosenAddress) : null;
            setMycurrentAddressState(parsedChosenAddress);

            const currentShobe = await getCookie("currentShobe");
            var parsedurrentShobe: responsedListFromApiSelectShobehAtrafUserType | null = currentShobe ? JSON.parse(currentShobe) : null;
            setCurrentShobeState(parsedurrentShobe);
        }
        tempAsync();

        ////zare_nk_050413_added_st

        //    async function getSabadTitrs() {
        //        const token = await getCookie("token");
        //        if (token == null) {
        //            ////zare_nk_041120_alan(estefadeh az dialog) 
        //            // const bootstrap = await getBootstrap();
        //            // const mymodalForWarning = new bootstrap.Modal(
        //            //     document.getElementById("mymodalForWarning")
        //            // );
        //            // mymodalForWarning.show();
        //            // const span = document.querySelector(
        //            //     "#mymodalForWarning .errorInMymodalForWarning"
        //            // );
        //            // if (span instanceof HTMLElement) {
        //            //     span.innerText = "لطفا ابتدا آنلاین شوید";
        //            // }
        //            alert("لطفا ابتدا آنلاین شوید");
        //            return;
        //        } else {
        //            // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented
        //            let ApiUrl = NextJsApiUrl; ////zare_nk_050407_added
        //            var urlSelectSabadTitr = ApiUrl + "Api_SelectSabadKharidTitr";

        //            const response = await fetch(urlSelectSabadTitr, {
        //                method: "POST",
        //                headers: {
        //                    "Content-Type": "application/json",
        //                    Authorization: "Bearer " + token,
        //                },
        //                body: JSON.stringify({
        //                    // IdShobeh: vendorId,  ////zare_nk_050414_commented(chon mikhaim sabade hameye shobeha ro biareh baraye karbar)        
        //                }),
        //            });

        //            const data = await response.json();
        //            if (response.ok) {
        //                var majmooeKharidMasraf = 0;
        //                var soodAzKharid = 0;
        //                var Kerayeh = 0;
        //                var MablaghNahaee = 0;
        //                var KafKharid = 0;
        //                var IdSabadKharidTitr = 0;
        //                var result = JSON.parse(data.data.list);
        //                console.log('zare_nk_050414_result22: ' + JSON.stringify(result));
        //                if (data.status != 0) {
        //                    console.log('zare_nk_050414_data.status: ' + data.status + '-data.errors[0]: ' + data.errors[0]);
        //                    ////zare_nk_041120_alan(estefadeh az dialog) 
        //                    // const bootstrap = await getBootstrap();
        //                    // const mymodalForWarning = new bootstrap.Modal(
        //                    //     document.getElementById("mymodalForWarning")
        //                    // );
        //                    // mymodalForWarning.show();
        //                    // const span = document.querySelector(
        //                    //     "#mymodalForWarning .errorInMymodalForWarning"
        //                    // );
        //                    // if (span instanceof HTMLElement) {
        //                    //     span.innerText = data.errors[0];
        //                    // }
        //                } else if (data.status == 0) {
        //                    if (result.length == 0) {
        //                        // alert('result.length ===== 0: ' + result.length); 
        //                        setSabadTitr(null);  ////zare_nk_050229_added_st(albate felan niazam nemisheh, chon dar hamyare foroosh faghat yek forooshgah va sabadTitr darnazar darim 
        //                        //// felan va mostaghim barmameh satrhaye hamin titr ro mikhaim baz koneh(va niaz nabashe karbar dasti rooye titr bezaneh satrhash baz she))
        //                        IdSabadKharidTitr = 0;
        //                        majmooeKharidMasraf = 0;
        //                        soodAzKharid = 0;
        //                        Kerayeh = 0;
        //                        MablaghNahaee = 0;
        //                        KafKharid = 0;
        //                        setJamKol(0);
        //                        setJamKolTakhfif(0);
        //                        setJamKolNahaei(0);
        //                        // getSabadItems(-22, token);  ////zare_nk_050414_commented(chon dar in safhe aslan sabadsatr nadarim) 

        //                        return;
        //                    }
        //                    setSabadTitr(result);
        //                    IdSabadKharidTitr = result[0].IdSabadKharidTitr;
        //                    majmooeKharidMasraf = result[0].SumFeeMasraf;
        //                    soodAzKharid = result[0].Sood;
        //                    Kerayeh = result[0].HazineErsal;
        //                    MablaghNahaee = result[0].MablaghNahaee;
        //                    KafKharid = result[0].KafKharid;

        //                    setJamKol(majmooeKharidMasraf);
        //                    setJamKolTakhfif(soodAzKharid);
        //                    setJamKolNahaei(MablaghNahaee);
        //                    // console.log('majmooeKharidMasraf: ' + majmooeKharidMasraf + '-soodAzKharid: ' + soodAzKharid + '-MablaghNahaee: ' + MablaghNahaee);  //zare_nk_041120_commented
        //                    // getSabadItems(IdSabadKharidTitr, token);  ////zare_nk_050414_commented(chon dar in safhe aslan sabadsatr nadarim)
        //                }
        //            } else {
        //                console.log('!!response.ok')
        //                if (response.status == 401) {
        //                    ////zare_nk_041120_alan(estefadeh az dialog)
        //                    // const bootstrap = await getBootstrap();
        //                    // const mymodalForWarning = new bootstrap.Modal(
        //                    //     document.getElementById("mymodalForWarning")
        //                    // );
        //                    // mymodalForWarning.show();
        //                    // const span = document.querySelector(
        //                    //     "#mymodalForWarning .errorInMymodalForWarning"
        //                    // );
        //                    // if (span instanceof HTMLElement) {
        //                    //     span.innerText = "لطفا ابتدا آنلاین شوید";
        //                    // }
        //                    alert("لطفا ابتدا آنلاین شوید");
        //                }
        //            }
        //        }
        //    }
        //    getSabadTitrs();

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
                    IdSabadKharidTitr: idTitr,  ////zare_nk_050416_added
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
                                if (item.MaxTedad != null) {
                                    if (item.MaxTedad <= item.Tedad) {
                                        bishAzMaxTedadYaMojoodi = 1;
                                    }
                                }
                                else {
                                    if (item.Mojoodi <= item.Tedad) {
                                        bishAzMaxTedadYaMojoodi = 1;
                                    }
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

    ////zare_nk_050416_added_st(baraye add va rem va ...)
    async function addToCartInIndex(
        addRemParam: addRemParamType,
    ) {
        console.log('041120-addToCartInIndex called!-addRemParam: ' + addRemParam.FeeForoosh);
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
        }
        //else {  ////zare_nk_050416_commented(dar sharte token == null return gozashtim dige else nemikhaim)
        try {
            console.log('041120-addToCartInIndex-else 1');
            var TedadOut = 0;
            var TedadOuttoAjax = 0;
            const zarib = parseFloat(String(addRemParam.ZaribForoosh ?? 0));
            TedadOut = addRemParam.tedadInSabadOrDet + zarib;
            TedadOuttoAjax = addRemParam.ZaribForoosh;
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
                    IdShobeh: vendorId,  ////zare_nk_050416_nokteh(meghdare dynamic bedam)
                    IdAddress: mycurrentAddressState?.IdAdress,  // 23990,  ////zare_nk_050416_nokteh(meghdare dynamic bedam)
                }),
            });
            const data = await response.json();
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
                    let Tedad = satrInoInResult.Tedad;
                    console.log("zare_nk_050416-tittrInoInResult.IdSabadKharidSatr: " + tittrInoInResult.IdSabadKharidTitr +
                        "satrInoInResult.IdSabadKharidSatr: " + satrInoInResult.IdSabadKharidSatr
                    );
                    var bishAzMaxTedadYaMojoodi = 0;
                    if (addRemParam.MaxTedad != null) {
                        if (addRemParam.MaxTedad <= Tedad) {
                            bishAzMaxTedadYaMojoodi = 1;
                        }
                    } else {
                        if (addRemParam.Mojoodi <= Tedad) {
                            bishAzMaxTedadYaMojoodi = 1;
                        }
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
                    setSabadRows((curRows) => {
                        return curRows.map((curItem: any, index: number) => {
                            if (curItem.IdKala == addRemParam.IdKala) {
                                return (
                                    {
                                        ...curItem,   ////zare_nk_050322_added(ta age fieldi ra ja gozashtim barnameh az meghdare feli estefadeh koneh, vagarnah an field undefiend mishavad!(masalan 
                                        //// midoonim NameKala dar in setState tagheiri nemikoneh, niazi be meghdardehi mojadad nist va age inja dobareh meghdar nadim va az ...curItem ham estefadeh nakonim undegiend mideh ))
                                        IdSabadKharidSatr: satrInoInResult.IdSabadKharidSatr,
                                        IdSabadKharidTitr: tittrInoInResult.IdSabadKharidTitr,
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
                                        MasrafSatr: curItem.MasrafSatr,   ////zare_nk_050329_commented
                                        father: "",
                                        //refForfather: refForfather,
                                        bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,  //zare_nk_041121_added(for shopToDiscount)
                                        fromShowDetails: false,
                                        ForCartContentsDesignType: ForCartContentsDesignTypeLet,  //zare_nk_041121_added(for shopToDiscount)
                                        idTag: "ForCart-" + addRemParam.IdKala,
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
        // } ////zare_nk_050416_commented(dar sharte token == null return gozashtim dige else nemikhaim)
    }

    async function remveFromCartInIndex(
        addRemParam: addRemParamType,
    ) {
        ////zare_nk_050416_commented_st
        // if (addRemParam.event != null) {
        //   addRemParam.event.stopPropagation();
        //   addRemParam.event.preventDefault();
        // }
        ////zare_nk_050416_commented_end
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
        //else {  ////zare_nk_050326_commented(dar sharte token == null return gozashtim dige else nemikhaim)
        try {
            console.log('041116-001');
            var TedadOut = 0;
            var TedadOuttoAjax = 0;
            const zarib = parseFloat(String(addRemParam.ZaribForoosh ?? 0));
            TedadOut = addRemParam.tedadInSabadOrDet - zarib;
            TedadOuttoAjax = -(addRemParam.ZaribForoosh);
            // const token = getCookie("token");

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
                    IdShobeh: vendorId,  ////zare_nk_050416_nokteh(meghdare dynamic bedam)
                    IdAddress: mycurrentAddressState?.IdAdress,  // 23990,  ////zare_nk_050416_nokteh(meghdare dynamic bedam)
                }),
            });

            const data = await response.json();
            if (response.ok) {                
                var result = data;
                console.log('041116-result.status == '+result.status);
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
                    let tittrInoInResult = JSON.parse(result.data.titr)[0];  ////zare_nk_050416_added
                    let satrInoInResult = JSON.parse(result.data.satr)[0];  //zare_nk_041124_added
                    let Tedad = satrInoInResult === undefined ? 0 : satrInoInResult.Tedad;

                    console.log("zare_nk_050416-tittrInoInResult.IdSabadKharidSatr: " + tittrInoInResult.IdSabadKharidTitr +
                        "Tedad: " + Tedad
                    );

                    var bishAzMaxTedadYaMojoodi = 0;
                    if (addRemParam.MaxTedad != null) {
                        if (addRemParam.MaxTedad <= Tedad) {
                            bishAzMaxTedadYaMojoodi = 1;
                        }
                    } else {
                        if (addRemParam.Mojoodi <= Tedad) {
                            bishAzMaxTedadYaMojoodi = 1;
                        }
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
                    setSabadRows((curRows) => {
                        ////zare_nk_050416_added_st(baraye hazfeh satre tedad sefr)
                        if (Tedad === 0) {
                            // alert(addRemParam.NameKala);
                            return curRows.filter(
                                item => item.IdKala !== addRemParam.IdKala
                            );
                        }
                        ////zare_nk_050416_added_st(baraye hazfeh satre tedad sefr)
                        return curRows.map((curItem: any, index: number) => {
                            if (curItem.IdKala == addRemParam.IdKala) {
                                return (
                                    {
                                        ...curItem,   ////zare_nk_050322_added(ta age fieldi ra ja gozashtim barnameh az meghdare feli estefadeh koneh, vagarnah an field undefiend mishavad!(masalan 
                                        //// midoonim NameKala dar in setState tagheiri nemikoneh, niazi be meghdardehi mojadad nist va age inja dobareh meghdar nadim va az ...curItem ham estefadeh nakonim undegiend mideh ))
                                        IdSabadKharidSatr: satrInoInResult.IdSabadKharidSatr,
                                        IdSabadKharidTitr: tittrInoInResult.IdSabadKharidTitr,
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
                                        MasrafSatr: curItem.MasrafSatr,   ////zare_nk_050329_commented
                                        father: "",
                                        //refForfather: refForfather,
                                        bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,  //zare_nk_041121_added(for shopToDiscount)
                                        fromShowDetails: false,
                                        ForCartContentsDesignType: ForCartContentsDesignTypeLet,  //zare_nk_041121_added(for shopToDiscount)
                                        idTag: "ForCart-" + addRemParam.IdKala,
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

                    if (Tedad == 0) {
                        ////zare_nk_041129_commented_st
                        // const inputGroup = document.querySelector(
                        //   ".ForCart-" + addRemParam.IdKala + " .input-group"
                        // );
                        // if (inputGroup) {
                        //   let parent = inputGroup.closest(".flxpedar2_new");
                        //   if (parent) {
                        //     if (JSON.parse(result.data.titr).length == 0) {
                        //       alert('2222222');
                        //       parent.remove();
                        //     }
                        //   }
                        // }
                        ////zare_nk_041129_commented_end
                    }
                    else if (Tedad == addRemParam.ZaribForoosh) {
                        ////zare_nk_041129_commented_st
                        // alert('1 shoddd!!!')
                        // let htmlTag;
                        // if (addRemParam.event) {
                        //   htmlTag = addRemParam.event.target as HTMLElement;
                        // }

                        // const wrapper = htmlTag?.closest(
                        //   ".flxpedar2_new"
                        // ) as HTMLElement | null;
                        // if (wrapper) {
                        //   wrapper.style.backgroundColor = "inherit";
                        // }
                        ////zare_nk_041129_commented_end
                    }
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

        // }  ////zare_nk_050326_commented(dar sharte token == null return gozashtim dige else nemikhaim) 
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
    ////zare_nk_050416_added_st(baraye add va rem va ...)

    ////zare_nk_050421_added_st
    const goToCheckout = async (IdShobe: number, IdSabadKharidTitr: number) => {
        alert('goToCheckout-IdShobe: ' + IdShobe);
        //router.push(`/vendor/${IdShobe}/cart-details`); 
        //router.push(`/vendor/${IdShobe}/checkout?idTitr=${IdSabadKharidTitr}`);  
        router.push(`/vendor/${IdShobe}/checkout`);
    }
    ////zare_nk_050421_added_end

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
                // boxShadow: '0px 3px 2px -1px #d7d6d6',  ////zare_nk_050520_commented
                boxShadow: '0px 4px 20px 0px #0000000f',   ////zare_nk_050520_added
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 30,
            }}>
                <div style={{
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
                    <button id="goBackBtn" onClick={() => router.back()}
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
                        <img src="/images/Icon/back-icon.svg" alt="بازگشت"
                            style={{ width: '1.5rem', height: '1.5rem', }} />
                    </button>

                    <div style={{
                        display: 'flex',
                        flexFlow: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // border: '1px dashed orange',
                        flex: '1 1 auto',
                    }}>
                        سبد خرید
                    </div>
                </div>
            </header >

            <main style={{
                backgroundColor: 'white',
                // height: '100dvh',   ////zare_nk_050317_commented(A001-ba A002 tadakhol dareh)
                width: '100%',
                display: "flex",
                flexDirection: 'column',
                overflow: 'hidden',        ////zare_nk_050317_commented(A002-ba A001 tadakhol dareh)
                // justifyContent: 'center',  ////zare_nk_050229_nokteh(be lahaze amoodi vasat chin mikoneh mohtavaye safheh ro ke ma inro nemikhaim)
                alignItems: 'center',
                flex: '1 0 auto',
                // border: '3px solid orange',
                direction: 'rtl',
                // paddingTop: '10px',     

                paddingLeft: '1rem',  ////zare_nk_050416_added
                paddingRight: '1rem',  ////zare_nk_050416_added

                paddingBottom: '96px',  ////zare_nk_050421_added
            }}>

                {/* zare_nk_050416_added_st(inja address haro niaz nadaram felan) */}
                {/* {isEpmtyAdressList &&   
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
                } */}
                {/* zare_nk_050416_added_end(inja address haro niaz nadaram felan) */}

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
                <div id="sabdRowsCont" style={{
                    display: 'flex', flexFlow: 'column', width: '100%', //border: '2px dashed red', 
                }}>
                    <div style={{// backgroundColor: 'red',
                        paddingBottom: '.75rem', paddingTop: '.75rem', paddingLeft: '.5rem', paddingRight: '.5rem', borderRadius: '.75rem', gap: '.5rem', alignItems: 'center',
                        width: '100%', height: 'min-content', display: 'flex', marginTop: '1.25rem', boxShadow: '0 1px 2px 0 #0000000d',
                    }}>
                        <div style={{
                            border: '2px solid #f7f7f8', borderRadius: '9999px', width: '3.5rem', height: '3.5rem', //position: 'relative',
                        }}>
                            <img
                                style={{
                                    borderRadius: '9999px', width: '100%', height: '100%', inset: 0,
                                    objectFit: 'cover',
                                }}
                                // src={`https://img.tochikala.com/Product/8882.webp`} />
                                src={`/images/movaghat/vendorPage/tupchi-tag.jpg`} />
                        </div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '.25rem',
                            flex: '1 1 0%',
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

                                textAlign: 'start',
                            }}>
                                پیتزا دهه 60 آمریکایی یک نفره
                                {/* {rowItem.NameKala} */}
                            </div>
                            <div style={{
                                display: 'flex',
                                gap: '.25rem',
                                alignItems: 'center',
                                width: '100%',
                            }}>
                                <img
                                    src="/images/cartDetails/zaman-entezar-icon.svg"
                                    alt="زمان انتظار"
                                    style={{ width: '1rem', height: '1rem', }}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                    <span style={{ color: '#313335', fontSize: '.75rem', lineHeight: '1rem', }}>50</span>
                                    <span style={{ color: '#878b92', fontSize: '.625rem', }}>دقیقه</span>
                                </div>
                            </div>
                        </div>

                        <Link href={`/vendor/${vendorId}`}
                            style={{
                                display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#eef0f1', color: '#1b1c1d', fontSize: '.75rem', lineHeight: '1rem', paddingBottom: '.5rem',
                                paddingTop: '.5rem', paddingLeft: '10px', paddingRight: '10px', borderRadius: '.75rem', minWidth: '.25rem', height: '2rem', textDecoration: 'none',
                            }}                            >
                            <span style={{ fontSize: '.75rem', lineHeight: '1rem', }}>مشاهده منو</span>
                            <img src="/images/movaghat/vendorPage/see-vendor-menu.svg" alt="دیدن منو"
                                style={{ width: '1rem', height: '1rem', borderRadius: '.5rem', }}
                            />
                        </Link>
                    </div>

                    <div style={{ color: '#878b92', paddingTop: '1.25rem', paddingBottom: '1rem', }}>اقلام سفارش</div>

                    {sabadRows?.map((rowItem, rowIndex) => {
                        return (
                            <div
                                //id={`sabdRow-${rowItem.IdSabadKharidSatr}`} 
                                id={`sabdRow-${rowItem.IdKala}`}
                                //key={rowItem.IdSabadKharidSatr}
                                key={rowItem.IdKala}
                                style={{
                                    display: 'flex', justifyContent: 'flex-start', paddingLeft: '0px', paddingRight: '0px', backgroundColor: 'white', gap: '.75rem',
                                    width: '100%', height: '100px', marginBottom: '35px', zIndex: 10,
                                }}>
                                <div style={{
                                    borderRadius: '.5rem', flexShrink: 0, width: '100px', height: '100%', position: 'relative',
                                }}>
                                    <img
                                        style={{
                                            objectFit: 'cover', borderRadius: '.5rem', width: '100%', height: '100%', inset: 0, //position: 'absolute',
                                        }}
                                        // src={`https://img.tochikala.com/Product/8882.webp`} />
                                        // src={`https://img.tochikala.com/Product/8882.webp`} 
                                        src={`https://img.tochikala.com/Product/${rowItem.IdKala}.webp`}
                                    />

                                    {/* right: 11px;bottom: -1rem;position: absolute; +++---*/}
                                    <div style={{
                                        display: 'flex', flexDirection: 'column', position: 'absolute', right: '11px', bottom: '-1rem',
                                    }}>
                                        {/* <MiddleCountTedadSefr */}
                                        <AddRemBtnsAndCountPackege
                                            refForfather={refForfather}
                                            fromShowDetails={false}
                                            IdKala={rowItem.IdKala}
                                            idTag=""
                                            tedadInSabadOrDet={rowItem.tedadInSabadOrDet}
                                            handlerForAddClick={(e) => {
                                                return handlerForAddClick(
                                                    {
                                                        tedadInSabadOrDet: rowItem.tedadInSabadOrDet,
                                                        ZaribForoosh: rowItem.ZaribForoosh,
                                                        IdKala: rowItem.IdKala,
                                                        NameKala: rowItem.NameKala,
                                                        DarsadTakhfif: rowItem.DarsadTakhfif,
                                                        NameBerand: rowItem.NameBerand,  //zare_nk_041118_nokteh(dar api selectKalaShobeh NameBerand dar pasokh hast pas ma meghdaresh ro dadim)
                                                        FeeForoosh: rowItem.FeeForoosh,
                                                        FeeMasraf: rowItem.FeeMasraf,
                                                        BarcodeKala: rowItem.BarcodeKala,
                                                        Mojoodi: rowItem.Mojoodi,
                                                        MaxTedad: rowItem.MaxTedad,
                                                        father: rowItem.father,
                                                        bishAzMaxTedadYaMojoodi: rowItem.bishAzMaxTedadYaMojoodi,
                                                        fromShowDetails: false,
                                                        // event: e,  //zare_nk_041127_commented
                                                        event: null,  //zare_nk_041127_added
                                                    }
                                                );
                                            }}
                                            handlerForRemClick={(e) => {
                                                return handlerForRemClick(
                                                    {
                                                        tedadInSabadOrDet: rowItem.tedadInSabadOrDet,
                                                        ZaribForoosh: rowItem.ZaribForoosh,
                                                        IdKala: rowItem.IdKala,
                                                        NameKala: rowItem.NameKala,
                                                        DarsadTakhfif: rowItem.DarsadTakhfif,
                                                        NameBerand: rowItem.NameBerand,  //zare_nk_041118_nokteh(dar api selectKalaShobeh NameBerand dar pasokh hast pas ma meghdaresh ro dadim)
                                                        FeeForoosh: rowItem.FeeForoosh,
                                                        FeeMasraf: rowItem.FeeMasraf,
                                                        BarcodeKala: rowItem.BarcodeKala,
                                                        Mojoodi: rowItem.Mojoodi,
                                                        MaxTedad: rowItem.MaxTedad,
                                                        father: rowItem.father,
                                                        bishAzMaxTedadYaMojoodi: rowItem.bishAzMaxTedadYaMojoodi,
                                                        fromShowDetails: false,
                                                        // event: e,  //zare_nk_041127_commented
                                                        event: null,  //zare_nk_041127_added
                                                    }
                                                );
                                            }}
                                            ForCartContentsDesignType={rowItem.ForCartContentsDesignType}
                                            bishAzMaxTedadYaMojoodi={rowItem.bishAzMaxTedadYaMojoodi}
                                        />
                                    </div>
                                </div>

                                <div style={{
                                    display: 'flex', flexDirection: 'column', width: '100%', height: '100px',
                                }}>
                                    <div style={{
                                        display: 'flex', flexDirection: 'column', gap: '.5rem',
                                    }}>
                                        <div style={{
                                            fontSize: '14px',
                                            color: '#313335',

                                            // این بخش برای سه‌نقطه و محدودیت ۲ خط
                                            display: '-webkit-box',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',

                                            // این بخش برای تثبیت ارتفاع روی ۴۰ پیکسل 
                                            lineHeight: '1.5rem',
                                            // height: '2.5rem',
                                            height: '3rem',

                                            minHeight: '3rem',  // minHeight: '2.5rem', // اجبار به کمتر نشدن
                                            maxHeight: '3rem',  // maxHeight: '2.5rem', // اجبار به بیشتر نشدن
                                            boxSizing: 'border-box', // برای اینکه بُردر (border) به ارتفاع اضافه نشود

                                            textAlign: 'start',
                                        }}>
                                            {rowItem.NameKala}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 'auto', }}>
                                        <div style={{ display: 'flex', flexFlow: 'column', }}>
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
                                                            borderRadius: '.25rem',
                                                        }}>
                                                        <span
                                                            style={{
                                                                fontSize: '.625rem',
                                                                color: "white",
                                                                opacity: 1,
                                                                fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                            }}
                                                        >
                                                            {`${rowItem.DarsadTakhfif}%`}
                                                        </span>
                                                    </div>
                                                )}
                                                <div style={{
                                                    flex: "1 0 auto", display: "flex", flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
                                                }} >
                                                    <span style={{
                                                        fontSize: '1rem', marginLeft: 2, fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#1b1c1d', alignItems: 'center',
                                                        lineHeight: '1.5rem',
                                                    }}>
                                                        {rowItem.FeeForoosh.toLocaleString()}
                                                    </span>
                                                    <span style={{
                                                        fontSize: '.625rem', fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#6d6d6d',
                                                    }}>
                                                        تومان
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* {sabadRows?.map((rowItem, rowIndex) => {                                                      
                        return (
                            <div id={`sabdRow-${rowItem.IdSabadKharidSatr}`} key={rowItem.IdSabadKharidSatr}
                                style={{
                                    display: 'flex', flexFlow: 'column', width: '100%', 
                                }}>
                                <div style={{
                                    display: 'flex', paddingBottom: '.75rem', paddingTop: '.75rem', gap: '.5rem', justifyContent: 'space-between', alignItems: 'center',                                    width: '100%',  
                                }}>
                                    <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', gap: '.5rem' }}>
                                        <div style={{
                                            borderRadius: '.5rem', flexShrink: 0, width: '40px', minWidth: '40px', height: '40px', position: 'relative',
                                        }}>
                                            <img style={{
                                                    width: '100%', height: '100%', objectFit: 'cover', borderRadius: '.5rem', zIndex: '1',
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
                                            {rowItem.NameKala}
                                        </div>
                                    </div>

                                    <div style={{
                                        display: 'flex', flexFlow: 'column',
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
                                            }}>
                                                <span style={{
                                                    fontSize: '0.65rem',
                                                    textDecorationLine: "line-through",
                                                    color: '#888',  ////zare_nk_050316_added
                                                    fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                    lineHeight: '10px',
                                                }}>
                                                    {rowItem.FeeMasraf.toLocaleString()}
                                                </span>
                                            </div>
                                        )}

                                        <div style={{
                                                display: "flex", flexWrap: "wrap", flexDirection: "row", marginTop: 0, marginBottom: 5,                                               
                                                justifyContent: 'flex-start', alignItems: "center", width: "100%",
                                            }}>
                                            {(rowItem.DarsadTakhfif != null && rowItem.DarsadTakhfif != 0) && (
                                                <div style={{
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
                                                        borderRadius: '.25rem',
                                                    }}>
                                                    <span
                                                        style={{
                                                            fontSize: '.625rem',
                                                            color: "white",
                                                            opacity: 1,
                                                            fontFamily: "IRANSansWeb(FaNum)_Medium",
                                                        }}
                                                    >
                                                        {`${rowItem.DarsadTakhfif}%`}
                                                    </span>
                                                </div>
                                            )} 
                                            <div style={{
                                                flex: "1 0 auto", display: "flex", flexDirection: 'row', justifyContent: 'flex-end',
                                            }}>
                                                <span style={{
                                                    fontSize: '0.75rem', marginLeft: 5, fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#3d3d3d', alignItems: 'center',
                                                }}>
                                                    {rowItem.FeeForoosh.toLocaleString()}
                                                </span>
                                                <span
                                                    style={{
                                                        fontSize: '0.70rem', fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#6d6d6d',
                                                    }} >
                                                    تومان
                                                </span>
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
                    })} */}
                </div>
                {/* zare_nk_050413_added_end(berim mohtavaye sabad) */}
                {/* zare_nk_050420_added_st */}
                <div className="-mx-4 my-4 h-3 bg-gray-50" style={{
                    backgroundColor: '#f7f7f8', height: '.75rem', margin: '1rem -1rem', width: '450px',
                }}></div>

                <div className="pb-4 text-gray" style={{
                    display: "flex", flexFlow: 'row', width: '100%', justifyContent: 'start', alignItems: 'center', paddingBottom: '1rem',
                }}>
                    <span style={{ color: '#878b92', }}>
                        جزئیات پرداخت
                    </span>
                </div>

                <div className="flex flex-col gap-y-3 rounded-xl bg-gray-50 p-4 pb-6" style={{
                    display: 'flex', width: '100%', flexDirection: 'column', rowGap: '.75rem',
                    paddingBottom: '1.5rem', padding: '1rem', backgroundColor: '#f7f7f8', borderRadius: '.75rem',
                }}>

                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', }}>
                        <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                            <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#878b92', }}>جمع سفارش</span>
                            <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#878b92', }}>(</span>
                            <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#878b92', }}>4</span>
                            <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#878b92', }}>)</span>
                        </div>
                        <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                            <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#313335', }}>{'4600000'.toLocaleString()}</span>
                            <span style={{ fontSize: '0.625rem', color: '#313335', marginRight: '3px', }}>تومان</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', }}>
                        <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                            <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#878b92', }}>مجموع اقلام پس از تخفیف</span>
                        </div>
                        <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                            <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#313335', }}>{'4360000'.toLocaleString()}</span>
                            <span style={{ fontSize: '0.625rem', color: '#313335', marginRight: '3px', }}>تومان</span>
                        </div>
                    </div>

                    <div style={{
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
                    </div>

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

                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', }}>
                        <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                            <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#878b92', }}>هزینه ارسال</span>
                        </div>
                        <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                            <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#313335', }}>{'37000'.toLocaleString()}</span>
                            <span style={{ fontSize: '0.625rem', color: '#313335', marginRight: '3px', }}>تومان</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', }}>
                        <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                            <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#878b92', }}>هزینه خدمات</span>
                        </div>
                        <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                            <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#313335', }}>رایگان</span>
                            {/* <span style={{ fontSize: '0.625rem', color: '#313335', marginRight: '3px', }}>تومان</span> */}
                        </div>
                    </div>

                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', }}>
                        <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                            <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#878b92', }}>هزینه بسته‌بندی</span>
                        </div>
                        <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                            <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#313335', }}>{'5000'.toLocaleString()}</span>
                            <span style={{ fontSize: '0.625rem', color: '#313335', marginRight: '3px', }}>تومان</span>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem',
                        padding: '.75rem', backgroundColor: 'white', borderRadius: '.5rem', height: '3rem',
                    }}>
                        <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                            <span style={{ fontSize: '0.875rem', lineHeight: '1.25rem', color: '#878b92', }}>جمع کل</span>
                        </div>
                        <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center', }}>
                            <span style={{
                                fontSize: '0.875rem', lineHeight: '1.25rem', color: '#313335',
                            }}>
                                {'612000'.toLocaleString()}
                            </span>
                            <span style={{ fontSize: '0.625rem', color: '#313335', marginRight: '3px', }}>تومان</span>
                        </div>
                    </div>
                </div>
                {/* zare_nk_050420_added_end */}
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

                    <button
                        onClick={() => {
                            // goToCheckout(titrItem.IdShobeh,titrItem.IdSabadKharidTitr);
                            // goToCheckout(vendorId);
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
                            <span style={{ color: "white" }}>نهایی کردن خرید</span>
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
                                {/* {jamKolNahaei &&
                                    jamKolNahaei.toLocaleString()
                                } */}
                                {'612000'.toLocaleString()}
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
        </div >
    );
}