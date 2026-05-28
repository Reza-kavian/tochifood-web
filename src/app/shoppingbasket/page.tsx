////zare_nk_050229_okk
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useMemo } from "react";

// import "bootstrap/dist/css/bootstrap.min.css";  //zare_nk_040416_commented(chon enteghalesh dadam be layout.tsx)
// import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
// import * as bootstrap from "bootstrap";  //zare_nk_040417_commented
let cachedBootstrap: typeof import("bootstrap") | null = null; //zare_nk_040417_added
// import Modal from "bootstrap/js/dist/modal";   //age faghat in ra begzaram va kolle bootstarp ra import nakonam kami be sabok boodane barname komak mishe,vali dar terminal errore <<document is not defined>> mideh ke badan tahlilesh mikonam
import { BrowserMultiFormatReader } from "@zxing/browser";  //zare_nk_050211_nokteh(az dele code avordimesh inja impor kardim)
import { NotFoundException } from "@zxing/library";   //zare_nk_050211_nokteh(az dele code avordimesh inja impor kardim)
// import { json } from "stream/consumers";  ////zare_nk_040417_commented(estefadeh ham nashod)


import "@/styles/shoppingbasketCss.css";

import '@zxing/browser'; // Import CSS if needed  //zare_nk_050208_added

import { RefObject } from "react";
import { MouseEvent } from "react";

async function getBootstrap() {
  if (!cachedBootstrap) {
    cachedBootstrap = await import("bootstrap");
  }
  return cachedBootstrap;
}

type MiddleCountTedadSefrType = {
  // SabadRow: SabadRowType | ForCartContInProdDetValType;  //zare_nk_041120_nokteh(in khat commenteh, faghat jahate olgue hazf nakardam)
  ////zare_nk_041120_added_st
  refForfather: RefObject<string | null>;
  fromShowDetails: boolean;
  IdKala: number;
  idTag: string;
  tedadInSabadOrDet: number;
  ////zare_nk_041120_added_end
  handlerForAddClick: (e?: MouseEvent<HTMLAnchorElement>) => void;
  handlerForRemClick: (e?: MouseEvent<HTMLAnchorElement>) => void;
  ForCartContentsDesignType: number;
  bishAzMaxTedadYaMojoodi: number | null;
};

// export function MiddleCountTedadSefr({  //zare_nk_041127_commented
function MiddleCountTedadSefr({  //zare_nk_041127_added
  // SabadRow,  //zare_nk_041120_commented
  ////zare_nk_041120_added_st
  refForfather,
  fromShowDetails,
  IdKala,
  idTag,
  tedadInSabadOrDet,
  ////zare_nk_041120_added_end
  handlerForAddClick,
  handlerForRemClick,
  ForCartContentsDesignType,
  bishAzMaxTedadYaMojoodi,
  ///////////////////////////////////zare_nk_041120_added_end
}: MiddleCountTedadSefrType) {
  console.log('ShallowRoutingExample called-MiddleCountTedadSefr-ForCartContentsDesignType: ' + ForCartContentsDesignType);
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
      <div
        className={`text-center align-items-center justify-content-center ForCart ${idTag}`}
        id={`${idTag}`}
        style={{ width: "100%", display: "flex" }}
      >
        <div
          className="input-group rounded-pill"
          style={{
            backgroundColor: "white",
            height: "35px",
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            border: "1px solid red",
            overflow: "hidden",
            width: 35,  //zare_nk_041127_added
          }}
          dir="ltr"
        >
          <div
            className="addremmCont"
            id={`removeCont-${IdKala}`}
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
                className={`rem-${IdKala}`}
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
              flexFlow: "column",
            }}
          >
            <span
              style={{
                height: "100%",
                border: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                overflow: "hidden",
              }}
            >
              <a
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
              >
                <button
                  id={`inp-${IdKala}`}
                  style={{
                    color: "red",
                    fontSize: "14px",
                    height: "80%",
                    backgroundColor: "white",
                    border: "none",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="plussMinus card-linkk text-dangerr fa fa-plus"
                ></button>
              </a>
            </span>
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
        style={{ width: "100%", display: "flex" }}
      >
        <div
          className="input-group rounded-pill"
          style={{
            backgroundColor: "white",
            height: "35px",
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            border: "1px solid red",
            overflow: "hidden",
            width: "auto",  //zare_nk_041127_added
          }}
          dir="ltr"
        >
          <div
            className="addremmCont"
            id={`removeCont-${IdKala}`}
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
              }}
            >
              <a
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
            style={{ height: "100%", display: "flex", flexFlow: "column" }}
          >
            <span
              id={`inp-${IdKala}`}
              className="text-center titleStyle"
              style={{
                backgroundColor: "white",
                border: "none",
                flex: "1 0 40%",
                width: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              {tedadInSabadOrDet}
            </span>
            <span style={{ border: "none" }}> </span>
          </div>

          <div
            className="addremmCont"
            id={`addCont-${IdKala}`}
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
              }}
            >
              <a
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
              >
                <button
                  title={Number(bishAzMaxTedadYaMojoodi) === 1 ? "موجودی کافی نیست" : ""}
                  style={{
                    height: "80%",
                    backgroundColor: "white",
                    border: "none",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),  //zare_nk_050124_nokteh(y001-in eshtebahe chon { opacity: 0.3 } meghdare true 
                    // barmigardoone va ...(Number(bishAzMaxTedadYaMojoodi) === 1 ham ya true ya false barmigardoone,va darkol ba and(&&) natijeye kolli ya true 
                    // midshe ya false,pas opacity meghdare nemigireh va faghat meghdari boolean barmigardooneh!!  )

                    // opacity: Number(bishAzMaxTedadYaMojoodi) === 1 ? 0.3 : 1, //zare_nk_050124_nokteh(rahe1-in dastoor dorosteh va javab mideh)
                    ...(Number(bishAzMaxTedadYaMojoodi) === 1 ? { opacity: 0.3 } : { opacity: 1 }), //zare_nk_050124_nokteh(rahe2-in jaigozine raveshe eshtebahe y001 hast va dorosteh)
                    ////zare_nk_050124_nokteh(rahe1 age gharare hamin opacity faghat meghdar begire khanatare,vali age bakhaim chandin khasiat ra meghdar bedim rahe2
                    // tosiyeh mishe (masalan ...(Number(bishAzMaxTedadYaMojoodi) === 1 ? { opacity: 0.3,color:'silver' }:{opacity: 1,color:'red'}),))
                  }}
                  className="plussMinus"
                  disabled={Boolean(Number(bishAzMaxTedadYaMojoodi))}
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
  } else if (ForCartContentsDesignType == 2) {
    return (
      <div
        className={`text-center align-items-center justify-content-center ForCart ${idTag}`}
        id={`${idTag}`}
        style={{ width: "100%", display: "flex" }}
      >
        <div
          className="input-group rounded-pill"
          style={{
            backgroundColor: "white",
            height: "35px",
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            border: "1px solid red",
            overflow: "hidden",
            width: "auto",  //zare_nk_041127_added
          }}
          dir="ltr"
        >
          <div
            className="addremmCont"
            id={`removeCont-${IdKala}`}
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
              }}
            >
              <a
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
                    src="https://img.tochikala.com/tochikala/remove-from-cart.svg"
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
            style={{ height: "100%", display: "flex", flexFlow: "column" }}
          >
            <span
              id={`inp-${IdKala}`}
              className="text-center titleStyle"
              style={{
                backgroundColor: "white",
                border: "none",
                flex: "1 0 40%",
                width: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              {tedadInSabadOrDet}
            </span>
            <span style={{ border: "none" }}> </span>
          </div>

          <div
            className="addremmCont"
            id={`addCont-${IdKala}`}
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
              }}
            >
              <a
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
              >
                <button
                  title={Number(bishAzMaxTedadYaMojoodi) === 1 ? "موجودی کافی نیست" : ""}
                  style={{
                    height: "80%",
                    backgroundColor: "white",
                    border: "none",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // ...(Number(bishAzMaxTedadYaMojoodi) === 1 && { opacity: 0.3 }),  //zare_nk_050124_nokteh(y001-in eshtebahe chon { opacity: 0.3 } meghdare true 
                    // barmigardoone va ...(Number(bishAzMaxTedadYaMojoodi) === 1 ham ya true ya false barmigardoone,va darkol ba and(&&) natijeye kolli ya true 
                    // midshe ya false,pas opacity meghdare nemigireh va faghat meghdari boolean barmigardooneh!!  )

                    // opacity: Number(bishAzMaxTedadYaMojoodi) === 1 ? 0.3 : 1, //zare_nk_050124_nokteh(rahe1-in dastoor dorosteh va javab mideh)
                    ...(Number(bishAzMaxTedadYaMojoodi) === 1 ? { opacity: 0.3 } : { opacity: 1 }), //zare_nk_050124_nokteh(rahe2-in jaigozine raveshe eshtebahe y001 hast va dorosteh)
                    ////zare_nk_050124_nokteh(rahe1 age gharare hamin opacity faghat meghdar begire khanatare,vali age bakhaim chandin khasiat ra meghdar bedim rahe2
                    // tosiyeh mishe (masalan ...(Number(bishAzMaxTedadYaMojoodi) === 1 ? { opacity: 0.3,color:'silver' }:{opacity: 1,color:'red'}),))
                  }}
                  className="plussMinus"
                  disabled={Boolean(Number(bishAzMaxTedadYaMojoodi))}
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
  }
}

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
  event?: MouseEvent<HTMLAnchorElement> | null | undefined;
};

// type BaseRow = {
//   IdKala: number;
// };

// type DetailsRow = BaseRow & {
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
};

type SabadTitrType = {
  IdSabadKharidTitr: number;
  SumFeeMasraf: number;
  soodAzKharid: number;
  MablaghNahaee: number;
  [key: string]: any;
};

type SabadRowType = {
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
  refForfather: RefObject<string | null>;
  fromShowDetails: boolean;
  idTag: string;
};

type SabadSatrProps = {
  SabadRow: SabadRowType
  handlerForAddClick: (
    addRemParam: addRemParamType,
  ) => void;
  handlerForRemClick: (
    addRemParam: addRemParamType,
  ) => void;
  openprodDetModal: (barcodeKala: string) => void;
};

// export function SabadSatrComponent({  //zare_nk_041127_commented
function SabadSatrComponent({  //zare_nk_041127_added
  SabadRow,
  handlerForAddClick,
  handlerForRemClick,
  openprodDetModal,
}: SabadSatrProps) {
  var Tedad = SabadRow.tedadInSabadOrDet;
  var bishAzMaxTedadYaMojoodi = 0;
  if (SabadRow.MaxTedad != null) {
    if (SabadRow.MaxTedad <= Tedad) {
      bishAzMaxTedadYaMojoodi = 1;
    }
  } else {
    if (SabadRow.Mojoodi <= Tedad) {
      bishAzMaxTedadYaMojoodi = 1;
    }
  }

  // const ForCartContentsDesignTypeLet = useMemo(() => {
  const tedadInSabadOrDetToNumber = Number(SabadRow.tedadInSabadOrDet);
  const ZaribForooshToNumber = Number(SabadRow.ZaribForoosh);

  const ForCartContentsDesignTypeLet =
    tedadInSabadOrDetToNumber === 0 ? 0 :
      tedadInSabadOrDetToNumber > ZaribForooshToNumber ? 2 :
        tedadInSabadOrDetToNumber === ZaribForooshToNumber ? 1 :
          0;
  // }, [SabadRow]);  


  return (
    <div
      id={`flxpedar2-${SabadRow.IdKala}`}
      className="flxpedar2_new"
      style={{
        display: "flex",
        flexFlow: "column",
        padding: "5px 0px",
        textAlign: "right",
        direction: "rtl",
        position: "relative",
      }}
    >
      <div
        id={`ContInflxpedar2-${SabadRow.IdKala}`}
        className="ContInflxpedar2"
        style={{
          display: "flex",
          flexFlow: "row",
          textAlign: "right",
          direction: "rtl",
          position: "relative",
        }}
      >
        <div
          id={`sath1ImgCont2-${SabadRow.IdKala}`}
          className="sath1ImgCont2_new"
          style={{
            display: "flex",
            flexFlow: "column",
            position: "relative",
            marginLeft: '5px',
          }}
        >
          <button
            type="button"
            onClick={(event) => openprodDetModal(SabadRow.BarcodeKala)}
            style={{
              display: "flex",
              flexFlow: "column",
              flex: "0 0 auto",
              padding: "0px",
              border: "none",
            }}
            className="GotToDet"
          >
            <div
              className="imgcont"
              id={`imgcontainerInSabadKesho-${SabadRow.IdKala}`}
              style={{
                width: "92px",
                display: "flex",
                flexFlow: "column",
                height: "min-content",
                borderRadius: 10,
                overflow: 'hidden',
                boxShadow: "#5e5e5e 0px 0px 3px 0px ",
              }}
            >
              <img
                loading="lazy"
                src={`https://img.tochikala.com/Product/${SabadRow.IdKala}.webp`}
                className="sath1Img2_new"
                alt={SabadRow.NameKala ? SabadRow.NameKala : ''}
                style={{ backgroundColor: "#EFEFEF", width: "100%" }}
                ////zare_nk_041213_added_st
                onError={(e) => {
                  e.currentTarget.src = 'https://img.tochikala.com/Logo/tochi.png';
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              ////zare_nk_041213_added_end
              />
            </div>
          </button>

          <button
            // data-id={j}
            id={`updateTedad-${SabadRow.IdKala}`}
            className="updateTedad btn btn-danger"
            style={{
              display: "none",
              borderRadius: "10px",
              fontSize: "12px",
              marginTop: "10px",
              paddingLeft: "8px",
              paddingRight: "8px",
            }}
          >
            بروزرسانی تعداد
          </button>
        </div>

        <div
          id={`dflx22_new-${SabadRow.IdKala}`}
          style={{
            flex: "1 1 auto",
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexFlow: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              className="titleInsabad text-truncate"
              style={{
                display: "inline-block",
                flexFlow: "column",
                whiteSpace: "nowrap",
                overflow: "hidden",
                marginLeft: "10px",
              }}
            >
              {SabadRow.NameKala}
            </div>

            <div
              id={`darsadTakhfifInsabad-${SabadRow.IdKala}`}
              className="darsadTakhfifInsabad rounded-pill"
              style={{
                backgroundColor: "#dc3545",
                width: "35px",
                height: "20px",
                flex: "0 0 auto",
                display: "none",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
              }}
            >
              <span
                id={`forDiscount-${SabadRow.IdKala}`}
                className="forDiscount"
                style={{
                  fontSize: "75%",
                  color: "white",
                  opacity: 1,
                  borderRadius: "8px",
                }}
              >
                {SabadRow.DarsadTakhfif}٪
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexFlow: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              id={`ForCartContInProdDet-${SabadRow.IdKala}`}
              style={{
                display: "flex",
                flexFlow: "column",
                justifyContent: "center",
              }}
            >
              <MiddleCountTedadSefr
                // SabadRow={SabadRow}  //zare_nk_041120_commented
                ////zare_nk_041120_added_st
                refForfather={SabadRow.refForfather}
                fromShowDetails={SabadRow.fromShowDetails}
                IdKala={SabadRow.IdKala}
                idTag={SabadRow.idTag}
                tedadInSabadOrDet={SabadRow.tedadInSabadOrDet}
                ////zare_nk_041120_added_end
                handlerForAddClick={(e) => {
                  return handlerForAddClick(
                    {
                      tedadInSabadOrDet: SabadRow.tedadInSabadOrDet,
                      ZaribForoosh: SabadRow.ZaribForoosh,
                      IdKala: SabadRow.IdKala,
                      NameKala: SabadRow.NameKala,
                      DarsadTakhfif: SabadRow.DarsadTakhfif,
                      NameBerand: SabadRow.NameBerand,  //zare_nk_041118_nokteh(dar api selectKalaShobeh NameBerand dar pasokh hast pas ma meghdaresh ro dadim)
                      FeeForoosh: SabadRow.FeeForoosh,
                      FeeMasraf: SabadRow.FeeMasraf,
                      BarcodeKala: SabadRow.BarcodeKala,
                      Mojoodi: SabadRow.Mojoodi,
                      MaxTedad: SabadRow.MaxTedad,
                      father: SabadRow.father,
                      bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
                      fromShowDetails: false,
                      event: e,
                    }
                  );
                }}
                handlerForRemClick={(e) => {
                  return handlerForRemClick(
                    {
                      tedadInSabadOrDet: SabadRow.tedadInSabadOrDet,
                      ZaribForoosh: SabadRow.ZaribForoosh,
                      IdKala: SabadRow.IdKala,
                      NameKala: SabadRow.NameKala,
                      DarsadTakhfif: SabadRow.DarsadTakhfif,
                      NameBerand: SabadRow.NameBerand,  //zare_nk_041118_nokteh(dar api selectKalaShobeh NameBerand dar pasokh hast pas ma meghdaresh ro dadim)
                      FeeForoosh: SabadRow.FeeForoosh,
                      FeeMasraf: SabadRow.FeeMasraf,
                      BarcodeKala: SabadRow.BarcodeKala,
                      Mojoodi: SabadRow.Mojoodi,
                      MaxTedad: SabadRow.MaxTedad,
                      father: SabadRow.father,
                      bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
                      fromShowDetails: false,
                      event: e,
                    }
                  );
                }}
                ForCartContentsDesignType={ForCartContentsDesignTypeLet}
                bishAzMaxTedadYaMojoodi={bishAzMaxTedadYaMojoodi}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexFlow: "column",
                paddingTop: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexFlow: "row",
                  marginBottom: "10px",
                  justifyContent: "end",
                }}
              >
                <div
                  className="titleInsabad"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    marginLeft: "10px",
                  }}
                >
                  قیمت کرفو
                </div>
                <div
                  className="gheimatForooshInsabad titleStyle"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    marginLeft: "5px",
                  }}
                >
                  {SabadRow.FeeForoosh != null ? SabadRow.FeeForoosh.toLocaleString() : 0}
                </div>
                <div
                  className="rialInsabad valueStyle"
                  style={{ display: "flex", flexFlow: "row" }}
                >
                  ریال
                </div>
              </div>

              <div style={{ display: "flex", flexFlow: "row" }}>
                <div
                  className="titleInsabad"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    marginLeft: "10px",
                  }}
                >
                  مجموع سطر
                </div>
                <div
                  id={`majmooGheimatForooshSatrInsabad-${SabadRow.IdKala}`}
                  className="majmooGheimatForooshSatrInsabad titleStyle"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    marginLeft: "5px",
                  }}
                >
                  {SabadRow.MasrafSatr ? SabadRow.MasrafSatr.toLocaleString() : 0}
                </div>
                <div
                  className="rialInsabad valueStyle"
                  style={{ display: "flex", flexFlow: "row" }}
                >
                  ریال
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id={`changeFeeWarning-${SabadRow.IdKala}`}
        className="changeFeeWarning"
        style={{
          display: "none",
          flexFlow: "row",
          fontSize: "12px",
          color: "red",
          paddingBottom: "5px",
        }}
      >
        <span style={{ marginRight: "10px" }}>
          قیمت این کالا تغییر کرده است
        </span>
      </div>
    </div>
  );
}

function getCookie(name: any) {
  const value = `; ${document.cookie}`; // برای اطمینان از یافتن کوکی‌ها
  const parts = value.split(`; ${name}=`); // تفکیک کوکی‌ها
  if (parts.length === 2) {
    // return parts.pop().split(";").shift(); //zare_nk_040406_commented
    return parts.pop()?.split(";").shift() ?? null; //zare_nk_040406_added
  }
  return null; // اگر کوکی پیدا نشد
}

export default function ShallowRoutingExample() {
  console.log('ShallowRoutingExample called!!');
  const router = useRouter();
  const [ForCartContInProdDetVal, setForCartContInProdDetVal] =
    useState<ForCartContInProdDetValType>();
  const refForfather = useRef<string | null>(null);
  ////zare_nk_041115_added_st(albate felan niazam nemisheh)
  const [sabadTitr, setSabadTitr] = useState<SabadTitrType[] | null>(null);
  ////zare_nk_041115_added_end(albate felan niazam nemisheh)

  const [bisatr, setBisatr] = useState(true);
  const [sabadRows, setSabadRows] = useState<SabadRowType[]>([]);

  const [addOrRemChanged, setAddOrRemChanged] = useState<string | null>(null);
  const [jamKol, setJamKol] = useState<number | null>(null);
  const [jamKolTakhfif, setJamKolTakhfif] = useState<number | null>(null);
  const [jamKolNahaei, setJamKolNahaei] = useState<number | null>(null);

  const [isOpenedProdDetModal, setIsOpenedProdDetModal] = useState(false);
  const [isOpenedSeePricesModal, setIsOpenedSeePricesModal] = useState(false);

  const refForCodeReader = useRef<BrowserMultiFormatReader | null>(null); //zare_nk_050211_added

  async function openprodDetModal(barcodeKala: string) {
    console.log('ShallowRoutingExample called-openprodDetModal called!!');
    await ShowDetails(barcodeKala);
    setIsOpenedProdDetModal(true);
    setAddOrRemChanged(null);
  }

  // async function ShowCamera() {  //zare_nk_050208_commented
  async function ShowCamera(isClient: boolean) {  //zare_nk_050208_added
    if (!isClient) return;  ////zare_nk_050208_nokteh(albateh midoonim bekhatere neveshtane "use client" ebtedaye file ma dar safheye samte client(yani moroorgare 
    // karbar) hastim, va in shart niazi nist, baraye talangor neveshtam(talangore inke codehaye @zxing/browser makhsoose samte client hast va samte serverSide benvisim error mideh))
    console.log('zare_nk_050208-ShowCamera called!!001');

    // // تنظیم ZXing برای پشتیبانی از QR کد و بارکدهای 1D
    // const { BrowserMultiFormatReader } = await import("@zxing/browser");  //zare_nk_050211_commented(bordimesh dar ebtedaye file import kardim(mesle importe baghiyeye packageha))
    // const codeReader = new BrowserMultiFormatReader();  ////zare_nk_050208_commented 

    ////zare_nk_050208_added_st
    const { DecodeHintType, BarcodeFormat } = await import("@zxing/library");

    // تعریف فرمت‌هایی که می‌خوای پشتیبانی بشن
    const formats = [
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.CODE_128,
      BarcodeFormat.QR_CODE,
    ];

    // ایجاد map مربوط به تنظیمات (hints)
    const hints = new Map();
    // hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);  //zare_nk_050208_nokteh(ba mahdood kardane tedad anvae barcode sorate scan bala miri(pishfarz hameye barcodeha ro barrasi mikoneh))
    // hints.set(DecodeHintType.TRY_HARDER, true);   //zare_nk_050208_nokteh(ba tanzim TRY_HARDER deghate scan bala mire vali kami kond mikoneh sorat ro(pishfarz TRY_HARDER false hast))

    // ساخت Reader با تنظیمات بالا
    const codeReader = new BrowserMultiFormatReader(hints);
    ////zare_nk_050208_added_end

    refForCodeReader.current = codeReader; //zare_nk_050211_added

    codeReader
      .decodeFromVideoDevice(
        undefined,
        "videoForzxing",
        async (result, err, control) => {
          console.log('zare_nk_050208-ShowCamera called!!-002');
          console.log('Decode attempt - result:', result, 'error:', err);
          if (result) {
            console.log('zare_nk_050208-ShowCamera called!!-003');
            const text = result.getText();
            // متوقف کردن اسکن پس از شناسایی
            control.stop();
            const bootstrap = await getBootstrap();
            const modal = new bootstrap.Modal(
              document.getElementById("seePricesModal")
            );
            modal.hide();
            openprodDetModal(/* 6262831000503 */ text);
          } else {
            console.log('zare_nk_050208-ShowCamera called!!-004');
            // const { NotFoundException } = await import("@zxing/library");  //zare_nk_050211_commented(bordimesh dar ebtedaye file import kardim(mesle importe baghiyeye packageha))
            if (err && !(err instanceof NotFoundException)) {
              console.log("zare_nk_040321-in zxing-err: " + err);
            }
          }
        }
      )
      .catch((err) => {
        console.log('zare_nk_050208-in catch-error: ' + err);
      });
  }

  async function ShowDetails(barcodeKala: any) {
    const token = getCookie("token");
    if (token == null) {
      const bootstrap = await getBootstrap();
      const mymodalForWarning = new bootstrap.Modal(
        document.getElementById("mymodalForWarning")
      );
      mymodalForWarning.show();
      const span = document.querySelector(
        "#mymodalForWarning .errorInMymodalForWarning"
      );
      if (span instanceof HTMLElement) {
        span.innerText = "لطفا ابتدا آنلاین شوید";
      }
    }

    let ApiUrl = "https://api.tochikala.com/api/";
    var urlApi_SelectKalaShobeh = ApiUrl + "User/Api_SelectKalaShobeh";
    const response = await fetch(urlApi_SelectKalaShobeh, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        BarcodeKala: barcodeKala,
        IdShobeh: 6,
        // IdKala: 1111 //zare_nk_041115_nokteh(api Api_SelectKalaShobeh ham BarcodeKala ro voroodi migireh ham IdKala ro.ma alan chon dar 
        //// barkode kala hanooz kala va keshi nashodeh va IdKala nadarim pas hamoon BarcodeKala ro miferestim va IdKala ro comment mikonim,meghdare 1111 ha soori neveshtam)
      }),
      // credentials: "include", //zare_nk_040402_commented
    });
    if (response.ok) {
      const data = await response.json();
      var result = data;
      if (result.status != 0) {
        const bootstrap = await getBootstrap();
        const mymodalForWarning = new bootstrap.Modal(
          document.getElementById("mymodalForWarning")
        );
        mymodalForWarning.show();
        const span = document.querySelector(
          "#mymodalForWarning .modal-body span"
        );
        if (span instanceof HTMLElement) {
          span.innerText = result.errors[0];
        }
      } else if (result.status == 0) {
        if (result.data.list == undefined) {
          const bootstrap = await getBootstrap();
          const mymodalForWarning = new bootstrap.Modal(
            document.getElementById("mymodalForWarning")
          );
          mymodalForWarning.show();
          const span = document.querySelector(
            "#mymodalForWarning .modal-body span"
          );
          if (span instanceof HTMLElement) {
            span.innerText =
              result.message.length == 0
                ? "ارتباط با سرور برقرار نشد"
                : result.message;
          }
          return;
        }
        var parsedList = JSON.parse(result.data.list);
        if (parsedList.length == 0) {
          const productExist = document.getElementById("productExist");
          if (productExist instanceof HTMLElement) {
            productExist.style.display = "none";
          }
          const productNotExist = document.getElementById("productNotExist");
          if (productNotExist instanceof HTMLElement) {
            productNotExist.style.display = "flex";
          }
          return;
        }
        const productExist = document.getElementById("productExist");
        if (productExist instanceof HTMLElement) {
          productExist.style.display = "flex";
        }
        const productNotExist = document.getElementById("productNotExist");
        if (productNotExist instanceof HTMLElement) {
          productNotExist.style.display = "none";
        }
        console.log("rr-parsedList: " + JSON.stringify(parsedList) + '-parsedList.length: ' + parsedList.length + '-parsedList[0].IdKala : ' + parsedList[0].IdKala);

        //C:\pub\projects\1.ne…ingExample.tsx:1332 rr-parsedList: [{
        // "IdKala":9354,"BarcodeKala":6260806400020,"IdBerand":81,"IdTaminkonnande":174,"IdG1":6,"IdG2":36,"IdG3":54,"IdG4":88,"Faal":1,"NameKala":"کوکاکولا نوشابه کولا 1.5 لیتری (6)","IsVazni":0,"ZaribForoosh":1,"NameG1":"نوشیدنی","NameG2":"نوشیدنی سرد","NameG3":"نوشابه","NameG4":"نوشابه مشکی","NameBerand":"کوکاکولا","Mojoodi":122,"IdJashnvare":6,"IdShobehJashnvareh":10240,"FeeMasraf":850000,"MaxTedad":12,"FeeForoosh":663000,"DarsadTakhfif":22,"TedadDarSabad":12,"IsJashnvareh":1,"IsFavorite":1,"TedadForooshShobeh":234,"TedadKharidUser":0}]

        // var isChange = null;  zare_nk_041118_commented
        ////zare_nk_041118_added_st
        // var Tedad = parsedList[0].Tedad ? parsedList[0].Tedad : parsedList[0].TedadDarSabad;  //zare_nk_041118_commented
        // var Tedad = parsedList[0].TedadDarSabad;  //zare_nk_041118_added
        var bishAzMaxTedadYaMojoodi = 0;
        if (parsedList[0].MaxTedad != null) {
          if (parsedList[0].MaxTedad <= parsedList[0].TedadDarSabad) {
            bishAzMaxTedadYaMojoodi = 1;
          }
        } else {
          if (parsedList[0].Mojoodi <= parsedList[0].TedadDarSabad) {
            bishAzMaxTedadYaMojoodi = 1;
          }
        }

        refForfather.current = "#DetailsInfoCont";
        let ForCartContentsDesignTypeLet = 0

        if (parsedList[0].TedadDarSabad == 0) {
          ForCartContentsDesignTypeLet = 0;
        }
        else if (parsedList[0].TedadDarSabad > parsedList[0].ZaribForoosh) {
          ForCartContentsDesignTypeLet = 2;
        }
        else if (parsedList[0].TedadDarSabad == parsedList[0].ZaribForoosh) {
          ForCartContentsDesignTypeLet = 1;
        }

        const idTag = "ForCart-" + parsedList[0].IdKala;
        setForCartContInProdDetVal(() => {
          return {
            tedadInSabadOrDet: parsedList[0].TedadDarSabad,
            ZaribForoosh: parsedList[0].ZaribForoosh,
            IdKala: parsedList[0].IdKala,
            NameKala: parsedList[0].NameKala,
            DarsadTakhfif: parsedList[0].DarsadTakhfif,
            NameBerand: parsedList[0].NameBerand,
            FeeForoosh: parsedList[0].FeeForoosh,
            FeeMasraf: parsedList[0].FeeMasraf,
            BarcodeKala: parsedList[0].BarcodeKala,
            Mojoodi: parsedList[0].Mojoodi,
            MaxTedad: parsedList[0].MaxTedad,
            father: "#DetailsInfoCont",
            refForfather: refForfather,
            bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
            fromShowDetails: true,
            ForCartContentsDesignType: ForCartContentsDesignTypeLet,
            idTag: idTag,
          };
        });
      }
    } else {
      if (response.status == 401) {
        const bootstrap = await getBootstrap();
        const mymodalForWarning = new bootstrap.Modal(
          document.getElementById("mymodalForWarning")
        );
        mymodalForWarning.show();
        const span = document.querySelector(
          "#mymodalForWarning .errorInMymodalForWarning"
        );
        if (span instanceof HTMLElement) {
          span.innerText = "لطفا ابتدا آنلاین شوید";
        }
      }
    }
  }

  useEffect(() => {
    if (isOpenedProdDetModal == false) {
      return;
    }
    const productExist = document.getElementById("productExist");
    if (productExist instanceof HTMLElement) {
      productExist.style.display = "flex";
    }
    const productNotExist = document.getElementById("productNotExist");
    if (productNotExist instanceof HTMLElement) {
      productNotExist.style.display = "none";
    }

    const groupsInDetailsPageCont = document.getElementById(
      "groupsInDetailsPageCont"
    );
    if (groupsInDetailsPageCont instanceof HTMLElement) {
      groupsInDetailsPageCont.style.display = "none";
    }
    const handlerForProdDetModal = () => {
      const ImageColectionInDetails = document.getElementById(
        "ImageColectionInDetails"
      );
      if (ImageColectionInDetails instanceof HTMLElement)
        ImageColectionInDetails.style.display = "none";
    };
    const hiddenHandlerForProdDetModal = () => {
      setIsOpenedProdDetModal(false);
      setAddOrRemChanged("notNull");
    };
    const prodDetModal = document.getElementById("prodDetModal");
    async function tempFuncForAsyncGetBootstrap() {
      if (prodDetModal && isOpenedProdDetModal) {
        prodDetModal.addEventListener("shown.bs.modal", handlerForProdDetModal);
        prodDetModal.addEventListener(
          "hidden.bs.modal",
          hiddenHandlerForProdDetModal
        );
        const bootstrap = await getBootstrap();
        const modal = new bootstrap.Modal(prodDetModal);
        modal.show();
      }
    }
    tempFuncForAsyncGetBootstrap();
    const mymodalForWarning = document.getElementById("mymodalForWarning");
    const handlerForMymodalForWarning = () => {
      router.refresh(); //zare_nk_040312_added-kolle safhe refresh nemishe va saritar va behtare
      //  window.location.reload();  //zare_nk_040312_added-faghat dar sourate niaz vaghti ke router.refresh() javab nadad
    };
    if (mymodalForWarning) {
      mymodalForWarning.addEventListener(
        "hidden.bs.modal",
        handlerForMymodalForWarning
      );
    }
    return () => {
      // پاکسازی رویداد در unmount
      if (mymodalForWarning) {
        mymodalForWarning.removeEventListener(
          "hidden.bs.modal",
          handlerForMymodalForWarning
        );
      }
      if (prodDetModal) {
        prodDetModal.removeEventListener(
          "shown.bs.modal",
          handlerForProdDetModal
        );
      }
    };
  }, [isOpenedProdDetModal]);

  useEffect(() => {
    const isClient = typeof window !== 'undefined';  //zare_nk_050208_nokteh(isClient age true beshe mifahmimi ke far mohite client(yani moroorgare karbarim) hastim na dar mohite 
    // codehaye server(in  baraye ine ke bazi az codeha ke samte server vojood nadaran samte server nanevism eshtebahi ke error begirim!(albate make dar in file az "use client" 
    // dar ebtedaye file estefadeh kardim va midoonim ke samte clientim va sharte typeof window !== 'undefined' hamvareh true hast vali jahate olgue gozashtam bemooneh)))
    const seePricesModal = document.getElementById("seePricesModal");
    const handlerForSeePricesModal = () => {
      const input = document.getElementById("manualInputBarcode");
      if (input instanceof HTMLInputElement) {
        input.value = "";
      }

      // ShowCamera();  //zare_nk_050208_commented 
      ShowCamera(isClient);  //zare_nk_050208_added
    };

    const hiddenHandlerForSeePricesModal = () => {
      setIsOpenedSeePricesModal(false);
      setAddOrRemChanged("notNull");
    };
    async function tempFuncForAsyncGetBootstrap() {
      if (seePricesModal) {
        seePricesModal.addEventListener(
          "shown.bs.modal",
          handlerForSeePricesModal
        );
        seePricesModal.addEventListener(
          "hidden.bs.modal",
          hiddenHandlerForSeePricesModal
        );
        const bootstrap = await getBootstrap();
        const modal = new bootstrap.Modal(seePricesModal);
        modal.show();
      }
    }
    tempFuncForAsyncGetBootstrap();

    ////zare_nk_050208_added_st
    // Cleanup function to stop the video stream when the component unmounts
    return () => {
      if (isClient && refForCodeReader.current) {
        console.log('پاکسازی منابع اسکنر...');
        // refForCodeReader.current.reset(); //zare_nk_050220_nokteh(code versione ghadimiye zxing hast va dar versione feli kar nemikoneh(dar versione feli
        ////  hamoon control.stop(); ke dakhele codeReader.decodeFromVideoDevice(...) hast kar mikoneh))
        refForCodeReader.current = null; // پاک کردن ref 
        console.log("Scanner component unmounted, cleaning up.");
      }

      ////zare_nk_050211_added_st
      if (seePricesModal) {
        seePricesModal.removeEventListener(
          "shown.bs.modal",
          handlerForSeePricesModal
        );
        seePricesModal.removeEventListener(
          "hidden.bs.modal",
          hiddenHandlerForSeePricesModal
        );
      }
      ////zare_nk_050211_added_end

    };
    ////zare_nk_050208_added_end

  }, [isOpenedSeePricesModal]);

  ////zare_nk_041119_added_st_testi
  useEffect(() => {
    // console.log('0-041119-sabadRows: ' + JSON.stringify(sabadRows));  //zare_nk_041120_commented
  }, [sabadRows]);

  useEffect(() => {
    console.log('0-041119-ForCartContInProdDetVal: ' + JSON.stringify(ForCartContInProdDetVal));
  }, [ForCartContInProdDetVal]);
  ////zare_nk_041119_added_end_testi

  ////zare_nk_041115_added_st
  async function getSabadItems(IdSabadKharidTitr: number, token: string) {
    ////zare_nk_041129_added_st
    if (IdSabadKharidTitr == -22) {
      // alert('bisatrrre!!!');
      setBisatr(true);
      return;
    }
    ////zare_nk_041129_added_end
    let ApiUrl = "https://api.tochikala.com/api/";
    var urlSelectSabad = ApiUrl + "User/Api_SelectSabadKharidSatr";
    const response = await fetch(urlSelectSabad, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        IdShobe: 6,  //zare_nk_041115_nokteh(dar api tochikala hast.vali dar api testotmapi nemiferestim va pishfarz IdShobe kerfu ra parsafar dar samte api lahaz mikard. IdShobe marboot be shobe 7 ra behesh dadam)
        IdSabadKharidTitr: IdSabadKharidTitr,//zare_nk_041115_nokteh(dar api tochikala hast chon chand sabad az chand shobe mishe dasht. vali dar api testotmapi IdSabadKharidTitr nadarim chon ye sabad ke bishtar nist)
      }),
    });
    const data = await response.json();
    if (response.ok) {
      var result = JSON.parse(data.data.list);
      if (data.status != 0) {
        const bootstrap = await getBootstrap();
        const mymodalForWarning = new bootstrap.Modal(
          document.getElementById("mymodalForWarning")
        );
        mymodalForWarning.show();
        const span = document.querySelector(
          "#mymodalForWarning .errorInMymodalForWarning"
        );
        if (span instanceof HTMLElement) {
          span.innerText = data.errors[0];
        }
      } else if (data.status == 0) {
        if (result.length == 0) {
          setBisatr(true);
          return;
        }
        console.log('041120-result in Api_SelectSabadKharidSatr: ' + JSON.stringify(result));
        setBisatr(false);
        refForfather.current = "#sabadItemsContInSafhe";

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
                refForfather: refForfather,
                fromShowDetails: false,
                idTag: "ForCart-" + item.IdKala,
              })
            })
          )
        });
      }
    } else {
      if (response.status == 401) {
        const bootstrap = await getBootstrap();
        const mymodalForWarning = new bootstrap.Modal(
          document.getElementById("mymodalForWarning")
        );
        mymodalForWarning.show();
        const span = document.querySelector(
          "#mymodalForWarning .errorInMymodalForWarning"
        );
        if (span instanceof HTMLElement) {
          span.innerText = "لطفا ابتدا آنلاین شوید";
        }
      }
    }
  }

  useEffect(() => {
    if (isOpenedProdDetModal == true) {
      return;
    }
    async function tempFuncForAsync() {
      const token = getCookie("token");
      if (token == null) {
        const bootstrap = await getBootstrap();
        const mymodalForWarning = new bootstrap.Modal(
          document.getElementById("mymodalForWarning")
        );
        mymodalForWarning.show();
        const span = document.querySelector(
          "#mymodalForWarning .errorInMymodalForWarning"
        );
        if (span instanceof HTMLElement) {
          span.innerText = "لطفا ابتدا آنلاین شوید";
        }
        return;
      } else {
        let ApiUrl = "https://api.tochikala.com/api/";
        var urlSelectSabadTitr = ApiUrl + "User/Api_SelectSabadKharidTitr";

        const response = await fetch(urlSelectSabadTitr, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            IdShobeh: 6,
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
          console.log('result22: ' + JSON.stringify(result)); //zare_nk_041120_commented
          if (data.status != 0) {
            console.log('data.status: ' + data.status)
            const bootstrap = await getBootstrap();
            const mymodalForWarning = new bootstrap.Modal(
              document.getElementById("mymodalForWarning")
            );
            mymodalForWarning.show();
            const span = document.querySelector(
              "#mymodalForWarning .errorInMymodalForWarning"
            );
            if (span instanceof HTMLElement) {
              span.innerText = data.errors[0];
            }
          } else if (data.status == 0) {
            if (result.length == 0) {
              // alert('result.length ===== 0: ' + result.length);
              ///zare_nk_041129_added_st
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
              getSabadItems(-22, token);
              ///zare_nk_041129_added_end
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
            getSabadItems(IdSabadKharidTitr, token);
          }
        } else {
          console.log('!!response.ok')
          if (response.status == 401) {
            const bootstrap = await getBootstrap();
            const mymodalForWarning = new bootstrap.Modal(
              document.getElementById("mymodalForWarning")
            );
            mymodalForWarning.show();
            const span = document.querySelector(
              "#mymodalForWarning .errorInMymodalForWarning"
            );
            if (span instanceof HTMLElement) {
              span.innerText = "لطفا ابتدا آنلاین شوید";
            }
          }
        }
      }
    }
    tempFuncForAsync();
  }, [addOrRemChanged]);

  async function addDetectedToCart(BarcodeKala: string) {
    // alert('addDetectedToCart001');
    const token = getCookie("token");
    if (token == null) {
      const bootstrap = await getBootstrap();
      const mymodalForWarning = new bootstrap.Modal(
        document.getElementById("mymodalForWarning")
      );
      mymodalForWarning.show();
      const span = document.querySelector(
        "#mymodalForWarning .errorInMymodalForWarning"
      );
      if (span instanceof HTMLElement) {
        span.innerText = "لطفا ابتدا آنلاین شوید";
      }
    }

    let ApiUrl = "https://api.tochikala.com/api/";
    var urlApi_SelectKalaShobeh = ApiUrl + "User/Api_SelectKalaShobeh";

    const response = await fetch(urlApi_SelectKalaShobeh, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        BarcodeKala: BarcodeKala,
        IdShobeh: 6,
        // IdKala: 1111 //zare_nk_041115_nokteh(api Api_SelectKalaShobeh ham BarcodeKala ro voroodi migireh ham IdKala ro.ma alan chon dar 
        //// barkode kala hanooz kala va keshi nashodeh va IdKala nadarim pas hamoon BarcodeKala ro miferestim va IdKala ro comment mikonim,meghdare 1111 ha soori neveshtam)
      }),
      // credentials: "include", //zare_nk_040402_commented
    });
    if (response.ok) {
      const data = await response.json();
      var result = data;
      if (result.status != 0) {
        const bootstrap = await getBootstrap();
        const mymodalForWarning = new bootstrap.Modal(
          document.getElementById("mymodalForWarning")
        );
        mymodalForWarning.show();
        const span = document.querySelector(
          "#mymodalForWarning .modal-body span"
        );
        if (span instanceof HTMLElement) {
          span.innerText = result.errors[0];
        }
      } else if (result.status == 0) {
        if (result.data.list == undefined) {
          const bootstrap = await getBootstrap();
          const mymodalForWarning = new bootstrap.Modal(
            document.getElementById("mymodalForWarning")
          );
          mymodalForWarning.show();
          const span = document.querySelector(
            "#mymodalForWarning .modal-body span"
          );
          if (span instanceof HTMLElement) {
            span.innerText =
              result.message.length == 0
                ? "ارتباط با سرور برقرار نشد"
                : result.message;
          }
          return;
        }
        var parsedList = JSON.parse(result.data.list);
        console.log('041120-result in Api_SelectKalaShobeh: ' + JSON.stringify(parsedList));
        if (parsedList.length == 0) {
          const productNotExist = document.getElementById("productNotExist");
          if (productNotExist) {
            productNotExist.style.display = "flex";
          }
          return;
        }
        console.log('BarcodeKala is: ' + parsedList[0].BarcodeKala + '-BarcodeKala: ' + BarcodeKala)
        const productNotExist = document.getElementById("productNotExist");
        if (productNotExist) {
          productNotExist.style.display = "none";
        }
        ////zare_nk_041120_added_st
        let bishAzMaxTedadYaMojoodi = 0;
        if (parsedList[0].MaxTedad != null) {
          if (parsedList[0].MaxTedad <= parsedList[0].TedadDarSabad) {
            bishAzMaxTedadYaMojoodi = 1;
          }
        } else {
          if (parsedList[0].Mojoodi <= parsedList[0].TedadDarSabad) {
            bishAzMaxTedadYaMojoodi = 1;
          }
        }
        ////zare_nk_041120_added_end

        // handlerForAddClick(parsedList[0]);  //zare_nk_041120_commented
        handlerForAddClick(
          {
            tedadInSabadOrDet: parsedList[0].TedadDarSabad,
            ZaribForoosh: parsedList[0].ZaribForoosh,
            IdKala: parsedList[0].IdKala,
            NameKala: parsedList[0].NameKala,
            DarsadTakhfif: parsedList[0].DarsadTakhfif,
            NameBerand: parsedList[0].NameBerand,  //zare_nk_041118_nokteh(dar api selectKalaShobeh NameBerand dar pasokh hast pas ma meghdaresh ro dadim)
            FeeForoosh: parsedList[0].FeeForoosh,
            FeeMasraf: parsedList[0].FeeMasraf,
            BarcodeKala: parsedList[0].BarcodeKala,
            Mojoodi: parsedList[0].Mojoodi,
            MaxTedad: parsedList[0].MaxTedad,
            father: "#sabadItemsContInSafhe",
            bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
            fromShowDetails: false,
            event: null,  //zare_nk_041120_tahlilshe
          }
        );
      }
    } else {
      if (response.status == 401) {
        const bootstrap = await getBootstrap();
        const mymodalForWarning = new bootstrap.Modal(
          document.getElementById("mymodalForWarning")
        );
        mymodalForWarning.show();
        const span = document.querySelector(
          "#mymodalForWarning .errorInMymodalForWarning"
        );
        if (span instanceof HTMLElement) {
          span.innerText = "لطفا ابتدا آنلاین شوید";
        }
      }
    }
  }

  async function ManualInputBarcode(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    const inputElement = event.target as HTMLInputElement;
    const tagVal = inputElement.value;
    if (
      event.key === "Enter" && // مدرن‌تر و درست‌تر از keyCode
      tagVal.trim().length &&
      inputElement.classList.contains("valid")
    ) {
      let text = parseFloat(tagVal);
      const modalElement = document.getElementById("seePricesModal");
      if (modalElement) {
        const bootstrap = await getBootstrap();
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
      addDetectedToCart(text.toString());
    }
  }

  const seePrices = () => {
    setIsOpenedProdDetModal(false); //zare_nk_040325_nokteh(shayad niaziam nabood!chon baste beshe modalDet setIsOpenedProdDetModal(false) seda zadeh mishe!!)
    setIsOpenedSeePricesModal(true);
    setAddOrRemChanged(null);
  };

  async function addToCartInIndex(
    addRemParam: addRemParamType,
  ) {
    console.log('041120-addToCartInIndex called!-addRemParam: ' + addRemParam.FeeForoosh);
    // console.log('041120-addToCartInIndex called!-addRemParam: ' + JSON.stringify(addRemParam)); //zare_nk_041120_commented(error mideh:    // console.log('041120-addToCartInIndex called!-addRemParam: ' + JSON.stringify(addRemParam)); //zare_nk_041120_commented_tahlilshe(error mideh:TypeError: Converting circular structure to JSON)
    if (addRemParam.event != null) {
      addRemParam.event.stopPropagation();
      addRemParam.event.preventDefault();
    }
    const token = getCookie("token");
    if (token == null) {
      ////zare_nk_041129_added_st
      const bootstrap = await getBootstrap();
      const mymodalForWarning = new bootstrap.Modal(
        document.getElementById("mymodalForWarning")
      );
      mymodalForWarning.show();
      const span = document.querySelector(
        "#mymodalForWarning .errorInMymodalForWarning"
      );
      if (span instanceof HTMLElement) {
        span.innerText = "لطفا ابتدا آنلاین شوید";
      }
      ////zare_nk_041129_added_end
      return;
    } else {
      console.log('041120-addToCartInIndex-else 1');
      var TedadOut = 0;
      var TedadOuttoAjax = 0;
      const zarib = parseFloat(String(addRemParam.ZaribForoosh ?? 0));
      TedadOut = addRemParam.tedadInSabadOrDet + zarib;
      TedadOuttoAjax = addRemParam.ZaribForoosh;
      const token = getCookie("token");
      console.log('041120-addToCartInIndex-tedad: ' + addRemParam.tedadInSabadOrDet + '-zarib: ' + addRemParam.ZaribForoosh + '-TedadOut: ' + TedadOut);

      let ApiUrl = "https://api.tochikala.com/api/";
      var urlInsertToSabad = ApiUrl + "User/Api_AddRemoveSabadKharidSatr";
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
          IdShobeh: 6,
          IdAddress: 23990
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('041120-addToCartInIndex-else 5 IdKala response.ok-data: ' + JSON.stringify(data));
        setAddOrRemChanged(addRemParam.BarcodeKala + "-" + TedadOut);
        var result = data;
        if (result.status != 0) {
          const bootstrap = await getBootstrap();
          const mymodalForWarning = new bootstrap.Modal(
            document.getElementById("mymodalForWarning")
          );
          mymodalForWarning.show();
          const span = document.querySelector(
            "#mymodalForWarning .modal-body span"
          );
          if (span instanceof HTMLElement) {
            span.innerText = result.errors[0];
          }
        } else if (result.status == 0) {
          let satrInoInResult = JSON.parse(result.data.satr)[0];  //zare_nk_041124_added
          let Tedad = satrInoInResult.Tedad;

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
          if (addRemParam.fromShowDetails) {
            setForCartContInProdDetVal(() => {
              const idTag = "ForCart-" + addRemParam.IdKala;
              return {
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
                father: "#DetailsInfoCont",
                refForfather: refForfather,
                bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
                fromShowDetails: addRemParam.fromShowDetails,
                ForCartContentsDesignType: ForCartContentsDesignTypeLet,
                idTag: idTag,
              };
            });

          }
        }
      } else {
        console.log('041120-addToCartInIndex-else 6 IdKala !!!!response.ok');
        if (response.status == 401) {
          const bootstrap = await getBootstrap();
          const mymodalForWarning = new bootstrap.Modal(
            document.getElementById("mymodalForWarning")
          );
          mymodalForWarning.show();
          const span = document.querySelector(
            "#mymodalForWarning .errorInMymodalForWarning"
          );
          if (span instanceof HTMLElement) {
            span.innerText = "لطفا ابتدا آنلاین شوید";
          }
        }
      }
    }
  }

  async function remveFromCartInIndex(
    addRemParam: addRemParamType,
  ) {
    if (addRemParam.event != null) {
      addRemParam.event.stopPropagation();
      addRemParam.event.preventDefault();
    }
    const token = getCookie("token");
    if (token == null) {
      ////zare_nk_041129_added_st
      const bootstrap = await getBootstrap();
      const mymodalForWarning = new bootstrap.Modal(
        document.getElementById("mymodalForWarning")
      );
      mymodalForWarning.show();
      const span = document.querySelector(
        "#mymodalForWarning .errorInMymodalForWarning"
      );
      if (span instanceof HTMLElement) {
        span.innerText = "لطفا ابتدا آنلاین شوید";
      }
      ////zare_nk_041129_added_end
      return;
    } else {
      console.log('041116-001');
      var TedadOut = 0;
      var TedadOuttoAjax = 0;
      const zarib = parseFloat(String(addRemParam.ZaribForoosh ?? 0));
      TedadOut = addRemParam.tedadInSabadOrDet - zarib;
      TedadOuttoAjax = -(addRemParam.ZaribForoosh);
      const token = getCookie("token");

      let ApiUrl = "https://api.tochikala.com/api/";
      var urlInsertToSabad = ApiUrl + "User/Api_AddRemoveSabadKharidSatr";
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
          IdShobeh: 6,
          IdAddress: 23990
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
          var hisFather = null;
          let eventCurrentTargetTag;
          if (addRemParam.event) {
            eventCurrentTargetTag = addRemParam.event.currentTarget as HTMLElement;
          }

          const hisFatherTag = eventCurrentTargetTag?.closest(".gfForAddRemm");
          if (hisFatherTag) {
            hisFather = hisFatherTag.id;
          }
          refForfather.current = addRemParam.father;
          const bootstrap = await getBootstrap();

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
          const mymodalForWarning = new bootstrap.Modal(
            document.getElementById("mymodalForWarning")
          );
          mymodalForWarning.show();
          const span = document.querySelector(
            "#mymodalForWarning .modal-body span"
          );
          if (span instanceof HTMLElement) {
            span.innerText = result.errors[0];
          }
        }
        if (result.status != 0) {
          const bootstrap = await getBootstrap();
          const mymodalForWarning = new bootstrap.Modal(
            document.getElementById("mymodalForWarning")
          );
          mymodalForWarning.show();
          const span = document.querySelector(
            "#mymodalForWarning .modal-body span"
          );
          if (span instanceof HTMLElement) {
            span.innerText = result.errors[0];
          }
        } else if (result.status == 0) {
          console.log('041116-result.status == 0');
          setAddOrRemChanged(addRemParam.BarcodeKala + "-" + TedadOut);   //zare_nk_041129_tahlilshe(vaghti sabad khli misheh)
          alert('TedadOut: ' + TedadOut);
          let satrInoInResult = JSON.parse(result.data.satr)[0];  //zare_nk_041124_added
          let Tedad = satrInoInResult === undefined ? 0 : satrInoInResult.Tedad;

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
          if (addRemParam.fromShowDetails) {

            setForCartContInProdDetVal(() => {
              const idTag = "ForCart-" + addRemParam.IdKala;
              return {
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
                father: "#DetailsInfoCont",
                refForfather: refForfather,
                bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,
                fromShowDetails: addRemParam.fromShowDetails,
                ForCartContentsDesignType: ForCartContentsDesignTypeLet,
                idTag: idTag,
              };
            });
          }

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
          const bootstrap = await getBootstrap();
          const mymodalForWarning = new bootstrap.Modal(
            document.getElementById("mymodalForWarning")
          );
          mymodalForWarning.show();
          const span = document.querySelector(
            "#mymodalForWarning .errorInMymodalForWarning"
          );
          if (span instanceof HTMLElement) {
            span.innerText = "لطفا ابتدا آنلاین شوید";
          }
        }
      }
    }
  }

  const handlerForAddClick: (
    addRemParam: addRemParamType,
  ) => void = (addRemParam) => {
    addRemParam.event && addRemParam.event.stopPropagation();
    addToCartInIndex(
      addRemParam
    );
  };

  const handlerForRemClick: (
    addRemParam: addRemParamType,
  ) => void = (addRemParam) => {
    remveFromCartInIndex(
      addRemParam
    );
  };

  return isOpenedProdDetModal == true ? (
    <div
      className="modal px-0"
      id="prodDetModal"
      style={{ overflow: "hidden" }}
    >
      <div
        className="modal-dialog"
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          alignItems: "center",
        }}
      >
        <div
          className="modal-content"
          style={{
            borderRadius: "10px",
            width: "900px",
            flex: "0 0 900px",
            maxWidth: "100%",
            display: "flex",
            flexFlow: "column",
            height: "fitContent",
            maxHeight: "98vh",
            backgroundColor: "#fcfcfc !important",
          }}
        >
          <div
            className="modal-header"
            style={{ border: "none", padding: "16px 16px 5px 16px" }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexFlow: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                className="spanCont"
                style={{
                  fontFamily: "IRANSansWeb_Medium(adad_fa)",
                  fontSize: "18px",
                }}
              >
                <span>جزئیات محصول</span>
              </div>
              <div className="h4Cont"></div>
              <div
                className="buttonCont buttonHover"
                style={{
                  display: "flex",
                  flexFlow: "row",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    cursor: "pointer",
                    padding: "4px",
                    borderRadius: "8px",
                    border: "1px solid #A5A5A5",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    flexFlow: "row",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                  data-bs-dismiss="modal"
                >
                  <img src="https://img.tochikala.com/tochikala/close-modal.svg" />
                </span>
              </div>
            </div>
          </div>
          <div
            className="modal-body text-center thinScroll"
            style={{ flex: "1 1 auto", display: "flex", flexFlow: "column" }}
          >
            <div
              className="inModalBody"
              style={{ display: "flex", flexFlow: "column", height: "100%" }}
            >
              <div
                className="scrollContInModal"
                id="prodDetCont"
                style={{
                  flex: "1 1 auto",
                  display: "flex",
                  flexFlow: "column",
                  overflow: "hidden",
                }}
              >
                <div
                  id="productExist"
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "30px",
                  }}
                >
                  <div
                    id="DetailsPageCont"
                    style={{
                      marginTop: "10px",
                      overflow: "hidden",
                      width: "100%",
                      paddingTop: "5px",
                      height: "fit-content",
                    }}
                  >
                    <div
                      id="groupsInDetailsPageCont"
                      style={{
                        display: "flex",
                        flexFlow: "row",
                        alignItems: "center",
                        fontSize: "14px",
                        margin: "0px 10px 10px 0px",
                      }}
                    ></div>

                    <div
                      id="DetailsImgAndInfoCont"
                      style={{
                        paddingLeft: "3px",
                        paddingRight: "3px",
                        paddingBottom: "3px",
                      }}
                    >
                      <div
                        id="ImgAndSwiperCont"
                        style={{ marginBottom: "7px", width: "100%" }}
                      >
                        <div
                          id="ImageColectionInDetails"
                          className="swiper"
                          style={{
                            marginLeft: "10px",
                            padding: "7px",
                            borderRadius: "10px",
                            border: "none",
                            boxShadow: "0px 0px 3px 0px silver",
                            marginRight: "0px",
                          }}
                        >
                          <div className="swiper-wrapper"></div>
                          <div className="swiper-pagination"></div>
                          <div className="swiper-scrollbar"></div>
                        </div>
                        <div
                          id="CurrentImgCont"
                          style={{
                            padding: "15px 0px",
                            overflow: "hidden",
                            borderRadius: "15px 15px 0px 0px",
                            position: "relative",
                            border: "none",
                            boxShadow: "0px 0px 3px 0px silver",
                            display: "flex",
                            justifyContent: "center",
                            backgroundColor: "white",
                          }}
                        >
                          <div
                            id="heartContInDetails"
                            style={{
                              display: "none",
                              zIndex: "898",
                              cursor: "pointer",
                              position: "absolute",
                              top: "7px",
                              right: "7px",
                              fontSize: "100%",
                              opacity: "0.7",
                              backgroundColor: "inherit",
                            }}
                          >
                            <img
                              id="heartImgInDetails"
                              style={{ width: "32px" }}
                              src="https://img.tochikala.com/icon/heart/heart01(0).svg"
                              alt="علاقه&zwnj;مندی&zwnj;ها"
                            />
                          </div>
                          {ForCartContInProdDetVal != undefined && (
                            <img
                              loading="lazy"
                              id="CurrentImg"
                              style={{ height: "fit-content" }}
                              src={`https://img.tochikala.com/Product/${ForCartContInProdDetVal.IdKala}.webp`}
                              alt={ForCartContInProdDetVal.NameKala ?? ""}
                              ////zare_nk_041213_added_st
                              onError={(e) => {
                                e.currentTarget.src = 'https://img.tochikala.com/Logo/tochi.png';
                                e.currentTarget.style.backgroundColor = 'white';
                              }}
                            ////zare_nk_041213_added_end
                            />
                          )}
                        </div>
                      </div>

                      <div
                        id="DetailsInfoCont"
                        className="hisGrandFather WantCompress"
                        style={{
                          justifyContent: "space-between",
                          backgroundColor: "white",
                          padding: "10px",
                          borderRadius: "0px 0px 15px 15px",
                          boxShadow: "0px 0px 3px 0px silver",
                        }}
                      >
                        <div
                          id="titleAndGeoupInDetailsInfoCont"
                          style={{
                            display: "flex",
                            flexFlow: "column",
                            width: "100%",
                          }}
                        >
                          {ForCartContInProdDetVal != null && (
                            <h1
                              id="nameKalaInDetailsInfoCont"
                              style={{
                                fontSize: "16px",
                                marginBottom: "30px",
                                fontFamily: "IRANSansWeb_Medium(adad_fa)",
                                lineHeight: "2.0",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: "2",
                                lineClamp: "2",
                                WebkitBoxOrient: "vertical",
                                textAlign: "right",
                              }}
                            >
                              {ForCartContInProdDetVal.NameKala}
                            </h1>
                          )}

                          <div style={{ display: "flex", flexFlow: "row" }}>

                            <div
                              style={{
                                flex: "1 1 30%",
                                display: "flex",
                                flexFlow: "column",
                                paddingLeft: "5px",
                                alignItems: "center",
                                color: "#322E2E",
                                justifyContent: "space-around",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexFlow: "row",
                                  fontFamily: "IRANSansWeb_Medium(adad_fa)",
                                  color: "#888888",
                                }}
                              >
                                <span>برند</span>
                              </div>
                              <div
                                style={{
                                  flex: "0 0 auto",
                                  display: "flex",
                                  flexFlow: "row",
                                  paddingLeft: "5px",
                                  alignItems: "center",
                                }}
                              >
                                {ForCartContInProdDetVal != null && (
                                  <span id="nameBerandInDetailsInfoCont">
                                    {ForCartContInProdDetVal.NameBerand}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexFlow: "row",
                                alignContent: "center",
                                alignItems: "center",
                                padding: "0px 8px 0px 8px",
                              }}
                            >
                              <div
                                style={{
                                  width: "0px",
                                  height: "30px",
                                  borderLeft: "2px solid silver",
                                }}
                              ></div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexFlow: "column",
                                flex: "1 1 30%",
                                alignItems: "center",
                                justifyContent: "space-around",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexFlow: "row",
                                  marginBottom: "10px",
                                }}
                              >
                                {ForCartContInProdDetVal != null &&
                                  ForCartContInProdDetVal.DarsadTakhfif != 0 && (
                                    <div
                                      id="gheimatMasrafInDetailsInfoCont"
                                      className="gheimatMasrafInsabad"
                                      style={{
                                        // display: "none",
                                        display: Number(ForCartContInProdDetVal.DarsadTakhfif) === 0 ? "none" : "flex",
                                        flexFlow: "row",
                                        justifyContent: "end",
                                        textDecoration: "line-through",
                                        fontSize: "14px",
                                        alignItems: "center",
                                      }}
                                    >
                                      {/* {ForCartContInProdDetVal != null && ( */}
                                      <span>
                                        {ForCartContInProdDetVal.FeeMasraf}
                                      </span>
                                      {/* )} */}
                                    </div>
                                  )}
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexFlow: "row-reverse",
                                  height: "35px",
                                  alignContent: "center",
                                  fontSize: "24px",
                                }}
                              >
                                <div
                                  id="gheimatForooshInDetailsInfoCont"
                                  className="gheimatForooshInsabad"
                                  style={{
                                    display: "flex",
                                    flexFlow: "row",
                                    marginLeft: "5px",
                                    alignItems: "center",
                                    fontSize: "16px",
                                  }}
                                >
                                  {ForCartContInProdDetVal != null && (
                                    <span>
                                      {ForCartContInProdDetVal.FeeForoosh}
                                    </span>
                                  )}
                                </div>
                                <div
                                  className="rialInsabad  valueStyle"
                                  style={{
                                    display: "flex",
                                    flexFlow: "row",
                                    alignItems: "center",
                                    fontSize: "14px",
                                  }}
                                >
                                  ریال
                                </div>
                              </div>
                            </div>

                            {ForCartContInProdDetVal != null &&
                              ForCartContInProdDetVal.DarsadTakhfif != 0 && (
                                <div
                                  id="lastDividerInDetails"
                                  style={{
                                    // display: "flex",
                                    display: Number(ForCartContInProdDetVal.DarsadTakhfif) === 0 ? "none" : "flex",
                                    flexFlow: "row",
                                    alignContent: "center",
                                    alignItems: "center",
                                    padding: "0px 8px 0px 8px",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "0px",
                                      height: "30px",
                                      borderLeft: "2px solid silver",
                                    }}
                                  ></div>
                                </div>
                              )}
                            {ForCartContInProdDetVal != null &&
                              ForCartContInProdDetVal.DarsadTakhfif != 0 && (
                                <div
                                  id="DiscountContInDetails"
                                  style={{
                                    // display: "flex",
                                    display: Number(ForCartContInProdDetVal.DarsadTakhfif) === 0 ? "none" : "flex",
                                    flexFlow: "column",
                                    flex: "1 1 30%",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexFlow: "row",
                                      marginBottom: "10px",
                                      width: "100%",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <div
                                      id="darsadTakhfifInDetails"
                                      className="darsadTakhfifInDetails"
                                      style={{
                                        backgroundColor: "red",
                                        flex: "0 0 auto",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginLeft: "15px",
                                        borderRadius: "15px",
                                        width: "100%",
                                        maxWidth: "70px",
                                        height: "50px",
                                      }}
                                    >
                                      <span
                                        style={{
                                          color: "white",
                                          opacity: "1",
                                          fontSize: "18px",
                                        }}
                                      >
                                        %
                                      </span>

                                      {/* {ForCartContInProdDetVal != null && ( */}
                                      <span
                                        id="forDiscountInDetails"
                                        className="forDiscount"
                                        style={{
                                          color: "white",
                                          opacity: "1",
                                          fontSize: "18px",
                                        }}
                                      >
                                        {ForCartContInProdDetVal.DarsadTakhfif}
                                      </span>
                                      {/* )} */}
                                    </div>
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                        <div
                          id="CartAndPriceInDetailsInfoCont"
                          style={{
                            display: "flex",
                            flexFlow: "column",
                            width: "100%",
                            marginTop: "10px",
                            paddingRight: "20px",
                          }}
                        >
                          <div
                            id="InCartAndPriceInDetailsInfoCont"
                            style={{
                              width: "100%",
                              display: "flex",
                              flexFlow: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              id="ForCartContInProdDet"
                              style={{
                                display: "flex",
                                flexFlow: "column",
                                justifyContent: "end",
                              }}
                            >
                              {ForCartContInProdDetVal != null && (
                                <MiddleCountTedadSefr
                                  // SabadRow={ForCartContInProdDetVal}  //zare_nk_041120_commented
                                  ////zare_nk_041120_added_st
                                  refForfather={ForCartContInProdDetVal.refForfather}
                                  fromShowDetails={ForCartContInProdDetVal.fromShowDetails}
                                  IdKala={ForCartContInProdDetVal.IdKala}
                                  idTag={ForCartContInProdDetVal.idTag}
                                  tedadInSabadOrDet={ForCartContInProdDetVal.tedadInSabadOrDet}
                                  ////zare_nk_041120_added_end
                                  handlerForAddClick={(e) => {
                                    return handlerForAddClick(
                                      {
                                        tedadInSabadOrDet: ForCartContInProdDetVal.tedadInSabadOrDet,
                                        ZaribForoosh: ForCartContInProdDetVal.ZaribForoosh,
                                        IdKala: ForCartContInProdDetVal.IdKala,
                                        NameKala: ForCartContInProdDetVal.NameKala,
                                        DarsadTakhfif: ForCartContInProdDetVal.DarsadTakhfif,
                                        NameBerand: ForCartContInProdDetVal.NameBerand,  //zare_nk_041118_nokteh(dar api selectKalaShobeh NameBerand dar pasokh hast pas ma meghdaresh ro dadim)
                                        FeeForoosh: ForCartContInProdDetVal.FeeForoosh,
                                        FeeMasraf: ForCartContInProdDetVal.FeeMasraf,
                                        BarcodeKala: ForCartContInProdDetVal.BarcodeKala,
                                        Mojoodi: ForCartContInProdDetVal.Mojoodi,
                                        MaxTedad: ForCartContInProdDetVal.MaxTedad,
                                        father: refForfather.current,
                                        bishAzMaxTedadYaMojoodi: ForCartContInProdDetVal.bishAzMaxTedadYaMojoodi,
                                        fromShowDetails: true,
                                        event: e,
                                      }
                                    );
                                  }}
                                  handlerForRemClick={(e) => {
                                    return handlerForRemClick(
                                      {
                                        tedadInSabadOrDet: ForCartContInProdDetVal.tedadInSabadOrDet,
                                        ZaribForoosh: ForCartContInProdDetVal.ZaribForoosh,
                                        IdKala: ForCartContInProdDetVal.IdKala,
                                        NameKala: ForCartContInProdDetVal.NameKala,
                                        DarsadTakhfif: ForCartContInProdDetVal.DarsadTakhfif,
                                        NameBerand: ForCartContInProdDetVal.NameBerand,  //zare_nk_041118_nokteh(dar api selectKalaShobeh NameBerand dar pasokh hast pas ma meghdaresh ro dadim)
                                        FeeForoosh: ForCartContInProdDetVal.FeeForoosh,
                                        FeeMasraf: ForCartContInProdDetVal.FeeMasraf,
                                        BarcodeKala: ForCartContInProdDetVal.BarcodeKala,
                                        Mojoodi: ForCartContInProdDetVal.Mojoodi,
                                        MaxTedad: ForCartContInProdDetVal.MaxTedad,
                                        father: refForfather.current,
                                        bishAzMaxTedadYaMojoodi: ForCartContInProdDetVal.bishAzMaxTedadYaMojoodi,
                                        fromShowDetails: true,
                                        event: e,
                                      }
                                    );
                                  }}
                                  ForCartContentsDesignType={ForCartContInProdDetVal.ForCartContentsDesignType}
                                  bishAzMaxTedadYaMojoodi={ForCartContInProdDetVal.bishAzMaxTedadYaMojoodi}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="imgzoomed"></div>
                    </div>
                    <div
                      id="navContInDetCont"
                      style={{
                        display: "none",
                        flexFlow: "column",
                        borderBottom: "1px solid #E7E7E0",
                        padding: "0px 0px 0px 0px",
                      }}
                    >
                      <div className="navContInDet">
                        <ul className="nav nav-tabs" role="tablist">
                          <li
                            className="nav-item"
                            style={{ borderBottom: "2px solid red" }}
                          >
                            <a
                              className="nav-link active"
                              data-bs-toggle="tab"
                              href="#home"
                              style={{ color: "inherit" }}
                            >
                              ویژگی کالا
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-bs-toggle="tab"
                              href="#menu1"
                              style={{ color: "inherit" }}
                            >
                              جزئیات کالا
                            </a>
                          </li>
                          <li className="nav-item" style={{ display: "none" }}>
                            <a
                              className="nav-link"
                              data-bs-toggle="tab"
                              href="#menu2"
                              style={{ color: "inherit" }}
                            >
                              Menu 2
                            </a>
                          </li>
                        </ul>
                        <div
                          className="tab-content"
                          style={{ color: "#545454" }}
                        >
                          <div id="home" className="containerr tab-pane active">
                            <div
                              style={{
                                display: "flex",
                                flexFlow: "row",
                                justifyContent: "center",
                                justifyItems: "center",
                                alignContent: "center",
                                padding: "10px 0px",
                              }}
                            >
                              <p style={{ margin: "0px" }}>
                                ویژگی برای این محصول وجود ندارد
                              </p>
                            </div>
                          </div>
                          <div id="menu1" className="containerr tab-pane fade">
                            <div
                              id="ProductDescription"
                              style={{
                                marginTop: "15px",
                                flexFlow: "column",
                                position: "relative",
                                paddingBottom: "48px",
                              }}
                            >
                              <div
                                id="contentContInProdDes"
                                style={{
                                  marginBottom: "10px",
                                  display: "flex",
                                  flexFlow: "column",
                                  maxHeight: "120px",
                                  overflow: "hidden",
                                }}
                              ></div>
                              <div
                                style={{
                                  display: "flex",
                                  flexFlow: "column",
                                  position: "absolute",
                                  right: "10px",
                                  bottom: "10px",
                                }}
                              >
                                <a
                                  id="bishtarInProdDes"
                                  className="buttonHover"
                                  href="#ProductDescription"
                                  style={{
                                    padding: "10px",
                                    borderRadius: "7px",
                                    display: "flex",
                                    flexFlow: "row",
                                    textDecoration: "none",
                                    color: "rgb(2, 160, 164)",
                                    backgroundColor: "inherit",
                                  }}
                                >
                                  <div
                                    style={{
                                      flex: "0 0 auto",
                                      display: "flex",
                                      flexFlow: "row",
                                      paddingLeft: "5px",
                                      alignItems: "center",
                                    }}
                                  >
                                    <span id="TextInBishtarInProdDes">
                                      نمایش بیشتر{" "}
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexFlow: "column",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <div
                                      className="rounded-pill"
                                      style={{
                                        display: "flex",
                                        flexFlow: "row",
                                        backgroundColor: "inherit",
                                      }}
                                    >
                                      <img
                                        src="https://img.tochikala.com/tochikala/left-arrow.svg"
                                        style={{ width: "15px" }}
                                        alt="نمایش بیشتر"
                                      />
                                    </div>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div id="menu2" className="containerr tab-pane fade">
                            salam menu2
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="productNotExist"
                  style={{
                    height: "100%",
                    display: "none",
                    justifyContent: "center",
                    marginBottom: "30px",
                    color: "red",
                    fontFamily: "IRANSansWeb_Medium(adad_fa)",
                  }}
                >
                  کالای مورد نظر یافت نشد
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : isOpenedSeePricesModal == true ? (
    <div
      className="modal px-0"
      id="seePricesModal"
      style={{ overflow: "hidden" }}
    >
      <div
        className="modal-dialog"
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <div
          className="modal-content"
          style={{
            borderRadius: "10px",
            width: "900px",
            flex: "0 0 900px",
            maxWidth: "100%",
            display: "flex",
            flexFlow: "column",
            height: "fit-content",
            maxHeight: "98vh",
            backgroundColor: "#fcfcfc !important",
          }}
        >
          <div
            className="modal-header"
            style={{ border: "none", padding: "6px 16px 5px 16px" }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexFlow: "row-reverse",
                justifyContent: "space-between",
              }}
            >
              <div
                className="spanCont"
                style={{
                  fontFamily: "IRANSansWeb_Medium(adad_fa)",
                  fontSize: "18px",
                }}
              >
                <span className="valueStyle">اسکن بارکد</span>
              </div>
              <div className="h4Cont"></div>
              <div
                className="buttonCont buttonHover"
                style={{
                  display: "flex",
                  flexFlow: "row",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    cursor: "pointer",
                    padding: "4px",
                    borderRadius: "8px",
                    border: "1px solid #A5A5A5",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    flexFlow: "row",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                  data-bs-dismiss="modal"
                >
                  <img src="https://img.tochikala.com/tochikala/close-modal.svg" />
                </span>
              </div>
            </div>
          </div>
          <div
            className="modal-body text-center thinScroll"
            style={{
              flex: "1 1 auto",
              display: "flex",
              flexFlow: "column",
              paddingTop: "0px",
            }}
          >
            <div
              className="inModalBody"
              style={{ display: "flex", flexFlow: "column", height: "100%" }}
            >
              <div
                className="scrollContInModal"
                id="seePricesCont"
                style={{
                  flex: "1 1 auto",
                  display: "flex",
                  flexFlow: "column",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "30px",
                  }}
                >
                  <video
                    id="videoForzxing"
                    style={{
                      width: "640px",
                      maxWidth: "100%",
                      borderRadius: "10px",
                    }}
                  ></video>
                </div>

                <div
                  className="contAndHoshdarCont"
                  style={{
                    flex: "1 1 auto",
                    display: "flex",
                    flexFlow: "column",
                  }}
                >
                  <div
                    id="productNotExist"
                    style={{
                      height: "100%",
                      display: "none",
                      justifyContent: "center",
                      marginBottom: "30px",
                      color: "red",
                      fontFamily: "IRANSansWeb_Medium(adad_fa)",
                    }}
                  >
                    کالای مورد نظر یافت نشد
                  </div>

                  <div
                    className="cont"
                    style={{
                      position: "relative",
                      width: "100%",
                      display: "flex",
                      flexFlow: "row",
                      justifyContent: "center",
                      justifyItems: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="labelcreator absol"
                      style={{ flex: "0 0 auto" }}
                    >
                      <span className="valueStyle" style={{ width: "100%" }}>
                        بارکد دستی
                      </span>
                    </div>
                    <div style={{ flex: "1 1 auto" }}>
                      <input
                        className="textcreator form-control MatnInput valid" //zare_nk_040304(valid ra pack konam)
                        style={{ width: "100%" }}
                        id="manualInputBarcode"
                        name="manualInputBarcode"
                        type="text"
                        onKeyDown={(event) => {
                          return ManualInputBarcode(event);
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <span
                      className="forError forErrorFormanualBarcode"
                      style={{
                        width: "100%",
                        display: "flex",
                        flexFlow: "row",
                        fontSize: "14px",
                        color: "red",
                      }}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      id="sabadSafhe"
      style={{ width: "100%", overflow: "hidden", display: "flex" }}
    >
      <div
        className="list-groupp"
        id="listGroupAccordionInSafhe"
        style={{
          // marginTop: "5px",
          // paddingTop: "5px",
          direction: "rtl",
          position: "relative",
          display: "flex",
          width: "100%",
          backgroundColor: 'white'
        }}
      >
        <div
          id="sabadHeaderAndItemsCont"
          className="sabadHeaderAndItems"
          style={{
            flex: "1 1 auto",
            border: "2px solid #a9a9a9",
            borderRadius: "10px",
            padding: "7px",
            backgroundColor: "#f6f6f6",
            boxShadow: "#5e5e5e 0px 0px 3px 0px",
          }}
        >
          <div
            className="sabadHeader"
            id="sabadSafheHeader-FORTITR"
            style={{
              display: "flex",
              flexFlow: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexFlow: "row",
                justifyContent: "start",
                fontSize: "14px",
                color: "#322E2E",
                paddingRight: "5px",
              }}
            >
              <span id="adToSabadWidthBarCodeScan">
                <button
                  className="BarCodeScan btn btn-danger"
                  style={{ borderRadius: "10px" }}
                  onClick={seePrices}
                >
                  اضافه به سبد
                </button>
              </span>
            </div>
          </div>

          <div
            className="usersSabad"
            style={{ padding: "0px 5px", flexFlow: "column" }}
          >
            {" "}
          </div>

          <div
            className="addressKharejInSabadCont"
            style={{ display: "none", flexFlow: "row" }}
          >
            <span style={{ color: "red" }} className="addressKharejInSabad">
              شما خارج از محدوده ارسال هستید
            </span>
          </div>

          <div
            className="StoresTitleCont"
            id="sabadSafheHeader"
            style={{ flexFlow: "column" }}
          >
            <div style={{ display: "flex", flexFlow: "row" }}>
              <div
                style={{
                  display: "flex",
                  flexFlow: "column",
                  marginLeft: "10px",
                }}
              >
                <div
                  className="rounded-pilll"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    padding: "10px",
                  }}
                >
                  <img
                    style={{ width: "64px", borderRadius: "12px" }}
                    src="https://img.tochikala.com/Logo/photo14359415832-Copy.jpg"
                    alt="هایپر‌کرفو"
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexFlow: "column",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    flex: "0 0 auto",
                    display: "flex",
                    flexFlow: "row",
                  }}
                >
                  <span className="nameShobe titleStyle">هاپر کرفو</span>
                </div>
              </div>
            </div>
          </div>

          <div
            id="sabadItemsContInSafhe"
            className="sabadItemsCont hisGrandFather"
            style={{ flexFlow: "column", padding: "0px 5px" }}
          >
            {!bisatr && (
              <>
                {sabadRows?.map((item, index) => {
                  return (
                    <SabadSatrComponent
                      key={index || item.IdKala}
                      SabadRow={item}
                      handlerForAddClick={handlerForAddClick}
                      handlerForRemClick={handlerForRemClick}
                      openprodDetModal={openprodDetModal}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>

        <div
          className="FtCollapsi"
          id="footerInSabadSafhe"
          style={{
            flex: "0 1 30%",
            display: "flex",
            flexFlow: "column",
            border: "1px solid #a9a9a9",
            borderRadius: "10px",
            backgroundColor: "#f6f6f6",
            boxShadow: "#5e5e5e 0px 0px 3px 0px",
          }}
        >
          <div
            className="footerInSabadContent"
            id="footerInSabadSafheContent"
            style={{
              padding: "10px",
              flexFlow: "column",
              borderRadius: "10px",
            }}
          >
            <div
              className="footerInSabadContent"
              id="footerInSabadSafheContent"
              style={{
                padding: "10px",
                flexFlow: "column",
                borderRadius: "10px",
              }}
            >
              <div
                className="footerCalc"
                style={{
                  display: "flex",
                  flexFlow: "column",
                  paddingBottom: "10px",
                }}
              >
                <div
                  className="harSefareshCalcCont"
                  style={{
                    display: "none",
                    flexFlow: "row",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                    fontSize: "14px",
                  }}
                >
                  <span id="jamKolSpan">جمع کل:</span>{" "}
                  <span id="kolGheymatInSabad">{jamKol}</span>
                </div>
                <div
                  className="harSefareshCalcCont"
                  style={{
                    display: "none",
                    flexFlow: "row",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                    fontSize: "14px",
                  }}
                >
                  <span>هزینه ارسال:</span>
                  <span id="hazinePostInSabad">۰</span>
                </div>

                <div
                  className="harSefareshCalcCont"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                    fontSize: "15px",
                    color: "#B80000",
                  }}
                >
                  <span className="titleStyle">سود شما از خرید: </span>
                  <span className="valueStyle" id="soodKolInSabad">
                    {jamKolTakhfif ? jamKolTakhfif.toLocaleString() : 0}
                  </span>
                </div>

                <div
                  className="harSefareshCalcCont"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                    fontSize: "15px",
                    color: "#B80000",
                  }}
                >
                  <span className="titleStyle">مبلغ قابل پرداخت:</span>
                  <span className="valueStyle" id="ghabelePardakhtInSabad">
                    {jamKol ? jamKol.toLocaleString() : 0}
                  </span>
                </div>
              </div>

              <div style={{ paddingTop: "10px" }}>
                <button
                  className="btn btn-success"
                  style={{ width: "100%", borderRadius: "10px" }}
                // onClick={(e) => payForSabad(e)}   //zare_nk_040411_commented(felan dar tochi ghasde pardakht dar app nadarim)
                >
                  پرداخت
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
