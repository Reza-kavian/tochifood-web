////zare_nk_050411_okk(1)
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useMemo } from "react";

// import "bootstrap/dist/css/bootstrap.min.css";  //zare_nk_040416_commented(chon enteghalesh dadam be layout.tsx)
// import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
// import * as bootstrap from "bootstrap";  //zare_nk_040417_commented
let cachedBootstrap: typeof import("bootstrap") | null = null; //zare_nk_040417_added
// import Modal from "bootstrap/js/dist/modal";   //age faghat in ra begzaram va kolle bootstarp ra import nakonam kami be sabok boodane barname komak mishe,vali dar terminal errore <<document is not defined>> mideh ke badan tahlilesh mikonam
// import { BrowserMultiFormatReader } from "@zxing/browser";   //zare_nk_040417_commented
// import { NotFoundException } from "@zxing/library";    //zare_nk_040417_commented
// import { json } from "stream/consumers";  ////zare_nk_040417_commented(estefadeh ham nashod)
import "@/styles/DiscountsAndOffersCss.css";

import { RefObject } from "react";
import { MouseEvent } from "react";

import { NextJsApiUrl } from "../../constants/Urls";  ////zare_nk_050407_added

async function getBootstrap() {
  if (!cachedBootstrap) {
    cachedBootstrap = await import("bootstrap");
  }
  return cachedBootstrap;
}

type MiddleCountTedadSefrType = {
  refForfather: RefObject<string | null>;
  fromShowDetails: boolean;
  IdKala: number;
  idTag: string;
  tedadInSabadOrDet: number;
  handlerForAddClick: (e?: MouseEvent<HTMLAnchorElement>) => void;
  handlerForRemClick: (e?: MouseEvent<HTMLAnchorElement>) => void;
  ForCartContentsDesignType: number;
  bishAzMaxTedadYaMojoodi: number | null;
};

export function MiddleCountTedadSefr({
  refForfather,
  fromShowDetails,
  IdKala,
  idTag,
  tedadInSabadOrDet,
  handlerForAddClick,
  handlerForRemClick,
  ForCartContentsDesignType,
  bishAzMaxTedadYaMojoodi,
}: MiddleCountTedadSefrType) {
  console.log('ShallowRoutingExample called-MiddleCountTedadSefr-tedadInSabadOrDet: ' + tedadInSabadOrDet);

  useEffect(() => {
    // if ("refForfather" in SabadRow) {
    //   SabadRow.refForfather.current = SabadRow.fromShowDetails
    //     ? "#DetailsInfoCont"
    //     : "#sabadItemsContInSafhe";
    // }
    ////zare_nk_041127_commented_st
    // refForfather.current = fromShowDetails
    //   ? "#DetailsInfoCont"
    //   : "#cardcontainer2";

    // if (ForCartContentsDesignType == 0) {
    //   if (IdKala) {
    //     const ForCartWidth = document.querySelector(
    //       refForfather.current +
    //       " #ForCart-" +
    //       IdKala +
    //       " .input-group"
    //     );
    //     if (ForCartWidth instanceof HTMLElement) {
    //       ForCartWidth.style.width = "35px";
    //     }
    //   }
    // } else if (ForCartContentsDesignType == 1) {
    //   if (IdKala) {
    //     const ForCartWidth = document.querySelector(
    //       refForfather.current +
    //       " #ForCart-" +
    //       IdKala +
    //       " .input-group"
    //     );
    //     if (ForCartWidth instanceof HTMLElement) {
    //       ForCartWidth.style.width = "auto";
    //     }
    //   }
    // } else if (ForCartContentsDesignType == 2) {
    //   if (IdKala) {
    //     const ForCartWidth = document.querySelector(
    //       refForfather.current +
    //       " #ForCart-" +
    //       IdKala +
    //       " .input-group"
    //     );
    //     if (ForCartWidth instanceof HTMLElement) {
    //       ForCartWidth.style.width = "auto";
    //     }
    //   }
    // }
    ////zare_nk_041127_commented_end
  });

  if (ForCartContentsDesignType == 0) {
    return (
      <div
        className={`text-center align-items-center justify-content-start ForCart ${idTag}`}
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
                <span
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
                </span>
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
                <span
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
                ></span>
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
                <span
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
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (ForCartContentsDesignType == 1) {
    return (
      <div
        className={`text-center align-items-center justify-content-start ForCart ${idTag}`}
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
            width: 'auto',
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
                <span
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
                </span>
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
                color: "red",
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
                <span
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
                // disabled={Boolean(Number(bishAzMaxTedadYaMojoodi))}
                >
                  <img
                    src="https://img.tochikala.com/tochikala/add-to-cart.svg"
                    alt="اضافه به سبد"
                    className="d-inline-block"
                    style={{ objectFit: "contain", width: "20px" }}
                  />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (ForCartContentsDesignType == 2) {
    return (
      <div
        className={`text-center align-items-center justify-content-start ForCart ${idTag}`}
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
            width: 'auto',  //zare_nk_041127_added
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
                <span
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
                </span>
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
                color: "red",
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
                <span
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
                // disabled={Boolean(Number(bishAzMaxTedadYaMojoodi))}
                >
                  <img
                    src="https://img.tochikala.com/tochikala/add-to-cart.svg"
                    alt="اضافه به سبد"
                    className="d-inline-block"
                    style={{ objectFit: "contain", width: "20px" }}
                  />
                </span>
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

////zare_nk_050210_nokteh_st(sabad kharid nadarim dar in safheh va faghat baraye olgue hast in)
// type SabadRowType = {
//   tedadInSabadOrDet: number;
//   ZaribForoosh: number;
//   IdKala: number;
//   NameKala: string | null;
//   DarsadTakhfif: number | null;
//   NameBerand: string | null;
//   FeeForoosh: number;
//   FeeMasraf: number;
//   BarcodeKala: string;
//   Mojoodi: number;
//   MaxTedad: number;
//   MasrafSatr: number;
//   father: any;
//   refForfather: RefObject<string | null>;
//   fromShowDetails: boolean;
//   idTag: string;
// };

// type SabadTitrType = {
//   IdSabadKharidTitr: number;
//   SumFeeMasraf: number;
//   soodAzKharid: number;
//   MablaghNahaee: number;
//   [key: string]: any;
// };
////zare_nk_050210_nokteh_end(sabad kharid nadarim dar in safheh va faghat baraye olgue hast in)

type SabadSatrProps = {
  SabadRow: ForCartContInProdDetValType
  handlerForAddClick: (
    addRemParam: addRemParamType,
  ) => void;
  handlerForRemClick: (
    addRemParam: addRemParamType,
  ) => void;
  openprodDetModal: (barcodeKala: string) => void;
};

export function SabadSatrComponent({
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
  console.log('zare_nk_041121-SabadRow: ' + JSON.stringify(SabadRow));
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
    <button
      id={`cardd-${SabadRow.IdKala}`}
      type="button"
      onClick={(event) => openprodDetModal(SabadRow.BarcodeKala)}
      onMouseEnter={(event) => {
        event.currentTarget.style.boxShadow = "0px 0px 2px 0px #D7D6D6";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.boxShadow = "none";
      }}
      className="cardd Mainslides GotToDet"
      style={{
        color: "inherit",
        textDecoration: "none",
        display: "inline-block",
        width: "0px",
        direction: "rtl",
        padding: "0px 2px 5px 2px",
        marginLeft: "-1px",
        marginBottom: "-1px",
        margin: "3px",
        borderRadius: "17px",
        overflow: "hidden",
        border: "1px solid #e4e4e4",
        backgroundColor: "white",
        height: "auto",
      }}
    >
      <div
        style={{ display: "flex", flexFlow: "column", position: "relative" }}
      >
        {/* {((SabadRow.DarsadTakhfif ?? 0) >= 30) &&(  */}
        {(SabadRow.DarsadTakhfif != null && SabadRow.DarsadTakhfif >= 30) && (
          <div
            className={`specialOffer-${SabadRow.IdKala}`}
            style={{
              display: "flex",
              position: "absolute",
              top: "7px",
              left: "7px",
              fontSize: "100%",
              backgroundColor: "inherit",
              zIndex: '2',
            }}
          >
            <img
              style={{ width: "64px" }}
              src="https://img.tochikala.com/Icon/special-offer.svg"
              alt="علاقه&zwnj;مندی&zwnj;ها"
            />
          </div>
        )}
        <div
          className="imgcontainer"
          id={`imgcontainer-${SabadRow.IdKala}`}
          style={{
            width: "100%",
            display: "flex",
            flexFlow: "column",
            height: "min-content",
            position: 'relative'
          }}
        >
          <img
            loading="lazy"
            src={`https://img.tochikala.com/Product/${SabadRow.IdKala}.webp`}
            id={`card-img-top-${SabadRow.IdKala}`}
            className="card-img-top"
            alt={SabadRow.NameKala ? SabadRow.NameKala : ''}
            style={{ width: "100%", backgroundColor: "#EFEFEF" }}
            ////zare_nk_041213_added_st
            onError={(e) => {
              e.currentTarget.src = 'https://img.tochikala.com/Logo/tochi.png';
              e.currentTarget.style.backgroundColor = 'white';
            }}
          ////zare_nk_041213_added_end
          />
        </div>

        <div
          id={`ForCartContInProdDet-${SabadRow.IdKala}`}
          style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            marginTop: "7px",
            padding: "0px 10px",
            position: 'absolute',
            bottom: '0px',
            right: '0px'
          }}
        >
          <MiddleCountTedadSefr
            refForfather={SabadRow.refForfather}
            fromShowDetails={SabadRow.fromShowDetails}
            IdKala={SabadRow.IdKala}
            idTag={SabadRow.idTag}
            tedadInSabadOrDet={SabadRow.tedadInSabadOrDet}

            handlerForAddClick={(e) => {
              return handlerForAddClick(
                {
                  tedadInSabadOrDet: SabadRow.tedadInSabadOrDet,
                  ZaribForoosh: SabadRow.ZaribForoosh,
                  IdKala: SabadRow.IdKala,
                  NameKala: SabadRow.NameKala,
                  DarsadTakhfif: SabadRow.DarsadTakhfif,
                  NameBerand: SabadRow.NameBerand,
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
                  NameBerand: SabadRow.NameBerand,
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
      </div>

      <div
        style={{
          height: "42px",
          display: "flex",
          flexWrap: "wrap",
          flexFlow: "row",
          marginTop: "7px",
          padding: "0px 10px 0px 10px",
          justifyContent: "start",
          alignItems: "start",
          width: "100%",
        }}
      >
        <h6
          style={{
            fontSize: "13px",
            margin: "0px",
            lineHeight: "1.3",
            textOverflow: "ellipsis",
            overflow: "hidden",
            // display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;text-align:right;">' + parsedList[j].NameKala + '</h6>' +  //zare_nk_0621_updated(add text-align:right;)
            display: "-webkit-box",
            textAlign: "right",
          }}
        >
          {SabadRow.NameKala}
        </h6>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexFlow: "row",
          marginTop: "0px",
          padding: "0px 10px 0px 10px",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >

        {/* {((SabadRow.DarsadTakhfif ?? 0) != 0) &&(  */}
        {(SabadRow.DarsadTakhfif != null && SabadRow.DarsadTakhfif != 0) && (
          <div
            id={`darsadTakhfifInsabad-${SabadRow.IdKala}`}
            className="darsadTakhfifInsabad rounded-pill"
            style={{
              backgroundColor: "#dc3545",
              width: "35px",
              height: "20px",
              flex: "0 0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "5px",
            }}
          >
            <span
              className="forDiscount"
              style={{ fontSize: "75%", color: "white", opacity: "1" }}
            >
              {`${SabadRow.DarsadTakhfif}٪`}
            </span>
          </div>
        )}
        <div
          style={{ flex: "1 0 auto", display: "flex", justifyContent: "end" }}
        >
          <span className="mablagh" style={{ marginLeft: "5px" }}>
            {SabadRow.FeeForoosh.toLocaleString()}
          </span>
          <span style={{ fontSize: "12px" }}>ریال</span>
        </div>
      </div>

      {/* {((SabadRow.DarsadTakhfif ?? 0) != 0) ? ( */}
      {(SabadRow.DarsadTakhfif != null && SabadRow.DarsadTakhfif != 0) ? (
        <div
          id={`PriceBeforeDiscount-${SabadRow.IdKala}`}
          style={{
            visibility: "visible",
            display: "flex",
            flexFlow: "row",
            paddingLeft: "18px",
            justifyContent: "end",
            alignItems: "center",
            marginBottom: "5px",
            width: "100%",
          }}
        >
          <span
            className="PriceBeforeDiscount"
            style={{
              fontSize: "75%",
              opacity: "0.7",
              textDecoration: "line-through",
            }}
          >
            {SabadRow.FeeMasraf.toLocaleString()}
          </span>
        </div>
      ) : (
        <div
          id={`PriceBeforeDiscount-${SabadRow.IdKala}`}
          style={{
            visibility: "hidden",
            display: "flex",
            flexFlow: "row",
            paddingLeft: "18px",
            justifyContent: "end",
            alignItems: "center",
            marginBottom: "5px",
            width: "100%",
          }}
        >
          <span
            className="PriceBeforeDiscount"
            style={{
              fontSize: "75%",
              opacity: "0.7",
              textDecoration: "line-through",
            }}
          >
            {SabadRow.FeeMasraf.toLocaleString()}
          </span>
        </div>
      )}
      {/* zare_nk_041121_commented_st(felan chon fielde TozihatKala ra nagonjandim) */}
      {/* <div
        className="TozihatforKala-' + parsedList[j].IdKala + '"
        style={{
          padding: "5px",
          borderRadius: "15px",
          display: "flex",
          flexWrap: "wrap",
          flexFlow: "row",
          margin: "0px 3px 5px 3px",
          justifyContent: "start",
          color: "red",
          alignItems: "center",
        }}
      >
        <h6
          style={{
            textAlign: "center",
            fontSize: "12px",
            margin: "0px",
            lineHeight: "2.0",
            textOverflow: "ellipsis",
            overflow: "hidden",
            lineClamp: "2",
          }}
        >
          {TozihatKala == null ? "" : TozihatKala}
        </h6>
      </div> */}
      {/* zare_nk_041121_commented_end(felan chon fielde TozihatKala ra nagonjandim) */}
    </button>
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
    useState<ForCartContInProdDetValType>();   //zare_nk_041121_updated(for shopToDiscount)
  const refForfather = useRef<string | null>(null);
  ////zare_nk_041115_added_st(albate felan niazam nemisheh)
  // const [sabadTitr, setSabadTitr] = useState<SabadTitrType[] | null>(null);
  ////zare_nk_041115_added_end(albate felan niazam nemisheh)

  const [bisatr, setBisatr] = useState(true);
  // const [sabadRows, setSabadRows] = useState<SabadRowType[]>([]);   //zare_nk_041121_commented(for shopToDiscount)
  const [sabadRows, setSabadRows] = useState<ForCartContInProdDetValType[]>([]);   //zare_nk_041121_commented(for shopToDiscount)

  const [addOrRemChanged, setAddOrRemChanged] = useState<string | null>(null);
  const [jamKol, setJamKol] = useState<number | null>(null);
  const [jamKolTakhfif, setJamKolTakhfif] = useState<number | null>(null);
  const [jamKolNahaei, setJamKolNahaei] = useState<number | null>(null);

  const [isOpenedProdDetModal, setIsOpenedProdDetModal] = useState(false);
  const [isOpenedSeePricesModal, setIsOpenedSeePricesModal] = useState(false);

  async function openprodDetModal(barcodeKala: string) {
    console.log('ShallowRoutingExample called-openprodDetModal called!!');
    await ShowDetails(barcodeKala);
    setIsOpenedProdDetModal(true);
    setAddOrRemChanged(null);
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
      return;  //zare_nk_041130_added
    }

    // let ApiUrl = "https://api.tochikala.com/api/";  ////zare_nk_050407_commented
    let ApiUrl = NextJsApiUrl; ////zare_nk_050407_added
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
        console.log('parsedList[0].NameKala: ' + parsedList[0].NameKala + '-parsedList[0].TedadDarSabad: ' + parsedList[0].TedadDarSabad);
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
      if (prodDetModal != null && isOpenedProdDetModal != null) {
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
          IdShobeh: 6,
          IsJashnvareh: 1,
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
        // let ApiUrl = "https://api.tochikala.com/api/";  ////zare_nk_050407_commented
        let ApiUrl = NextJsApiUrl; ////zare_nk_050407_added
        var urlSelectKalaShobeh = ApiUrl + "User/Api_SelectKalaShobeh";
        const response = await fetch(urlSelectKalaShobeh, {   //zare_nk_041121_added(for shopToDiscount)
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
              console.log('result.length == 0: ' + result.length)
              setBisatr(true);
              return;
            }
            setBisatr(false);
            refForfather.current = "#cardcontainer2";

            setSabadRows(() => {
              return (
                result.map((item: any) => {
                  var bishAzMaxTedadYaMojoodi = 0;
                  if (item.MaxTedad != null) {
                    if (item.MaxTedad <= item.TedadDarSabad) {
                      bishAzMaxTedadYaMojoodi = 1;
                    }
                  } else {
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
                    MasrafSatr: item.MasrafSatr,
                    father: "#cardcontainer2",
                    refForfather: refForfather,
                    bishAzMaxTedadYaMojoodi: bishAzMaxTedadYaMojoodi,  //zare_nk_041121_added(for shopToDiscount)
                    fromShowDetails: false,
                    ForCartContentsDesignType: ForCartContentsDesignTypeLet,  //zare_nk_041121_added(for shopToDiscount)
                    idTag: "ForCart-" + item.IdKala,
                  })
                })
              )
            });
            ////zare_nk_041121_added_end(for shopToDiscount)
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

      // let ApiUrl = "https://api.tochikala.com/api/";  ////zare_nk_050407_commented
      let ApiUrl = NextJsApiUrl; ////zare_nk_050407_added
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

      // let ApiUrl = "https://api.tochikala.com/api/";  ////zare_nk_050407_commented
      let ApiUrl = NextJsApiUrl; ////zare_nk_050407_added
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
          const adameSabteNahaeiModal = new bootstrap.Modal(
            document.getElementById("adameSabteNahaeiModal")
          );
          adameSabteNahaeiModal.show();
          const HoshdarInAdameSabteNahaeiModalTag = document.getElementById(
            "HoshdarInAdameSabteNahaeiModal"
          );
          if (HoshdarInAdameSabteNahaeiModalTag instanceof HTMLElement) {
            HoshdarInAdameSabteNahaeiModalTag.innerText = result.errors[0];
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
          setAddOrRemChanged(addRemParam.BarcodeKala + "-" + TedadOut);

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
            // alert('areeee');
            ////zare_nk_041129_commented_st
            // const inputGroup = document.querySelector(
            //   ".ForCart-" + addRemParam.IdKala + " .input-group"
            // );
            // if (inputGroup) {
            //   let parent = inputGroup.closest(".flxpedar2_new");
            //   if (parent) {
            //     if (JSON.parse(result.data.titr).length == 0) {
            //       parent.remove();
            //     }
            //   }
            // }
            ////zare_nk_041129_commented_end
          }
          else if (Tedad == addRemParam.ZaribForoosh) {
            ////zare_nk_041129_commented_st
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
                <span style={{ fontFamily: "IRANSansWeb_Medium(adad_fa)" }}>جزئیات محصول</span>
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
                                {ForCartContInProdDetVal != undefined &&
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
                                  {ForCartContInProdDetVal != undefined && (
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

                            {ForCartContInProdDetVal != undefined &&
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
                            {ForCartContInProdDetVal != undefined &&
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
                              {ForCartContInProdDetVal != undefined && (
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
  ) : (
    <div
      id="cardcontainer2"
      className="mtt-1 gfForAddRemm WantCompress hisGrandFather"
      style={{
        display: "flex",
        flexFlow: "row",
        justifyContent: "start",
        flexWrap: "wrap",
        direction: "rtl",
        overflow: "hidden",
        width: "100%",
      }}
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

          {sabadRows?.slice(0, 5).map((item) => (
            <div
              key={item.IdKala}
              className="cardd"
              style={{ height: "0px" }}
            ></div>
          ))}
        </>
      )}
    </div>
  );
}
