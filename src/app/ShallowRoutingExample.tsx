"use client";  //zare_nk_050214_okk
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

//// import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
// import * as bootstrap from "bootstrap";  //zare_nk_040417_commented
let cachedBootstrap: typeof import("bootstrap") | null = null; //zare_nk_040417_added

//// import Modal from "bootstrap/js/dist/modal";   //age faghat in ra begzaram va kolle bootstarp ra import nakonam kami be sabok boodane barname komak mishe
// ,vali dar terminal errore <<document is not defined>> mideh ke badan tahlilesh mikonam
// import { BrowserMultiFormatReader } from "@zxing/browser";   //zare_nk_040417_commented
// import { NotFoundException } from "@zxing/library";    //zare_nk_040417_commented
// import "@/styles/ProductDetailsCss.css";   //zare_nk_040228_commented_movaghat
import "@/styles/shoppingbasketCss.css";
import Link from "next/link"; //zare_nk_040331_added

async function getBootstrap() {
  if (!cachedBootstrap) {
    cachedBootstrap = await import("bootstrap");
  }
  return cachedBootstrap;
}

import { RefObject } from "react";
import { MouseEvent } from "react";

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

  useEffect(() => {
    ////zare_nk_041127_commneted_st
    console.log('refForfather.current iss: ' + refForfather.current);
    // refForfather.current = fromShowDetails
    //   ? "#DetailsInfoCont"
    //   : "#sabadItemsContInSafhe";
    // console.log('041123-MiddleCountTedadSefr called!-refForfather.current: ' + refForfather.current + '-fromShowDetails: ' +
    //   fromShowDetails + '-ForCartContentsDesignType: ' + ForCartContentsDesignType + '-bishAzMaxTedadYaMojoodi: ' + bishAzMaxTedadYaMojoodi);

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
    ////zare_nk_041127_commneted_end
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
              height: "100",
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
            style={{ height: "100", display: "flex", flexFlow: "column" }}
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
                    ...(Number(bishAzMaxTedadYaMojoodi) === 1 ? { opacity: 0.3 }:{opacity: 1}), //zare_nk_050124_nokteh(rahe2-in jaigozine raveshe eshtebahe y001 hast va dorosteh)
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
            style={{ height: "100", display: "flex", flexFlow: "column" }}
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
                    ...(Number(bishAzMaxTedadYaMojoodi) === 1 ? { opacity: 0.3 }:{opacity: 1}), //zare_nk_050124_nokteh(rahe2-in jaigozine raveshe eshtebahe y001 hast va dorosteh)
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

function getCookie(name: any) {
  const value = `; ${document.cookie}`; // برای اطمینان از یافتن کوکی‌ها
  const parts = value.split(`; ${name}=`); // تفکیک کوکی‌ها
  if (parts.length === 2) {
    // return parts.pop().split(";").shift(); //zare_nk_040410_commented
    return parts.pop()?.split(";").shift() ?? null; //zare_nk_040410_added
  }
  return null; // اگر کوکی پیدا نشد
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

type SabadRowType = {
  IdKala: number;
  NameKala: string;
  DarsadTakhfif: string;
  [key: string]: any; //zare_nk_041021_nokteh(yani az IdKala motmaen hastim vali fildhaye digare db ra parsa ina tagheir dadan dar in peroujeh shayad aslan be man nagan va 
  // timi kar nakonim, pas [key: string]: any; gozashtam ke kolli hast)
};

export default function ShallowRoutingExample() {
  console.log('041123-ShallowRoutingExample called!!');
  const router = useRouter();

  const [ForCartContInProdDetVal, setForCartContInProdDetVal] =
    useState<ForCartContInProdDetValType>();
  const refForfather = useRef<string | null>(null);

  var modal: bootstrap.Modal;

  async function openprodDetModal(barcodeKala: string) {
    const bootstrap = await getBootstrap();
    modal = new bootstrap.Modal(document.getElementById("prodDetModal"));
    modal.show();
    await ShowDetails(barcodeKala);
  }

  async function ShowCamera() {
    // تنظیم ZXing برای پشتیبانی از QR کد و بارکدهای 1D
    const { BrowserMultiFormatReader } = await import("@zxing/browser"); //zare_nk_040417_added
    const codeReader = new BrowserMultiFormatReader();
    codeReader
      // .decodeFromVideoDevice(null, "videoForzxing", (result, err, control) => {
      .decodeFromVideoDevice(
        undefined,
        "videoForzxing",
        async (result, err, control) => {
          if (result) {
            // console.log("zare_nk_0730-result.text: " + result.text);
            // متوقف کردن اسکن پس از شناسایی
            const text = result.getText(); //zare_nk_040410_added
            control.stop();
            const bootstrap = await getBootstrap(); //zare_nk_040417_added
            const modal = new bootstrap.Modal(
              document.getElementById("seePricesModal")
            );
            modal.hide();
            // openprodDetModal(/* 6262831000503 */ result.text);  //zare_nk_040410_commented
            openprodDetModal(/* 6262831000503 */ text); //zare_nk_040410_added
          } else {
            const { NotFoundException } = await import("@zxing/library"); //zare_nk_040417_added
            if (err && !(err instanceof NotFoundException)) {
              console.log("zare_nk_0730-err: " + err);
            }
          }
        }
      )
      .catch((err) => {
        console.log("zare_nk_0730-err in catch: " + err);
      });
  }

  useEffect(() => {
    const seePricesModal = document.getElementById("seePricesModal");
    const handlerForSeePricesModal = () => {
      const input = document.getElementById("manualInputBarcode");
      if (input instanceof HTMLInputElement) {
        input.value = "";
      }
      ShowCamera();
    };
    if (seePricesModal) {
      seePricesModal.addEventListener(
        "shown.bs.modal",
        handlerForSeePricesModal
      );
    }

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

    const handlerForProdDetModal = () => {
      const ImageColectionInDetails = document.getElementById(
        "ImageColectionInDetails"
      );
      if (ImageColectionInDetails instanceof HTMLElement)
        ImageColectionInDetails.style.display = "none";
    };
    const prodDetModal = document.getElementById("prodDetModal");
    if (prodDetModal) {
      prodDetModal.addEventListener("shown.bs.modal", handlerForProdDetModal);
    }

    return () => {
      // پاکسازی رویداد در unmount 
      if (seePricesModal) {
        seePricesModal.removeEventListener(
          "shown.bs.modal",
          handlerForSeePricesModal
        ); //zare_nk_040526_added
      }

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
  }, []);

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
        // setAddOrRemChanged(addRemParam.BarcodeKala + "-" + TedadOut);  //zare_nk_041123_commented
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
          let satrInoInResult = JSON.parse(result.data.satr)[0];
          let Tedad = satrInoInResult.Tedad;
          console.log('041124-result.data.satr[0]Tedad: ' + Tedad);
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
        console.log('041120-remveFromCartInIndex-else 5 IdKala response.ok-data: ' + JSON.stringify(data));

        var result = data;

        if (result.status == -1000) {
          const inputGroup = document.querySelector(
            ".ForCart-" + addRemParam.IdKala + " .input-group"
          );
          if (inputGroup) {
            let parent = inputGroup.closest(".flxpedar2_new");
            if (parent) {
              parent.remove();
            }
          }
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
          // setAddOrRemChanged(addRemParam.BarcodeKala + "-" + TedadOut);  //zare_nk_041123_commented
          let satrInoInResult = JSON.parse(result.data.satr)[0];  //zare_nk_041124_added
          let Tedad = satrInoInResult === undefined ? 0 : satrInoInResult.Tedad;
          console.log('041124-Tedad: ' + Tedad);
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
            ////zare_nk_041130_commented_st
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
            ////zare_nk_041130_commented_end
          }
          else if (Tedad == addRemParam.ZaribForoosh) {
            ////zare_nk_041130_commented_st
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
            ////zare_nk_041130_commented_end
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

  async function ShowDetails(barcodeKala: any) {
    const token = getCookie("token");
    if (token == null) {
      const bootstrap = await getBootstrap();
      modal?.hide();  //zare_nk_041115_added
      const mymodalForWarning = new bootstrap.Modal(
        document.getElementById("mymodalForWarning")
      );
      mymodalForWarning.show();
      const span = document.querySelector(
        "#mymodalForWarning .errorInMymodalForWarning"
      );
      if (span instanceof HTMLElement) {
        span.innerText = "لطفا ابتدا آنلاین شوید004";
      }
    }
    let ApiUrl = "https://api.tochikala.com/api/";
    var urlApi_SelectShobehJashnvareh = ApiUrl + "User/Api_SelectKalaShobeh";
    try {
      const response = await fetch(urlApi_SelectShobehJashnvareh, {
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
          modal?.hide();
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
            modal?.hide();
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

          const CurrentImg = document.getElementById("CurrentImg");
          if (CurrentImg instanceof HTMLElement) {
            CurrentImg.setAttribute("onLoad", 'event.target.style.height="auto"');
            CurrentImg.setAttribute("alt", parsedList[0].NameKala);
            CurrentImg.setAttribute(
              "src",
              `https://img.tochikala.com/Product/${parsedList[0].IdKala}.webp`
            );
            CurrentImg.setAttribute("onerror", "this.src='https://img.tochikala.com/Logo/tochi.png'; this.style.backgroundColor = 'white'"); //zare_nk_041213_added
          }
          const nameKalaInDetailsInfoCont = document.getElementById(
            "nameKalaInDetailsInfoCont"
          );
          if (nameKalaInDetailsInfoCont instanceof HTMLElement) {
            nameKalaInDetailsInfoCont.innerText = parsedList[0].NameKala;
          }
          const nameBerandInDetailsInfoCont = document.getElementById(
            "nameBerandInDetailsInfoCont"
          );
          if (nameBerandInDetailsInfoCont) {
            nameBerandInDetailsInfoCont.innerText = parsedList[0].NameBerand;
          }

          const gheimatMasrafInDetailsInfoCont = document.getElementById(
            "gheimatMasrafInDetailsInfoCont"
          );
          if (gheimatMasrafInDetailsInfoCont instanceof HTMLElement) {
            gheimatMasrafInDetailsInfoCont.innerHTML =
              parsedList[0].FeeMasraf.toLocaleString();
          }

          const gheimatForooshInDetailsInfoCont = document.getElementById(
            "gheimatForooshInDetailsInfoCont"
          );
          if (gheimatForooshInDetailsInfoCont instanceof HTMLElement) {
            gheimatForooshInDetailsInfoCont.innerHTML =
              parsedList[0].FeeForoosh.toLocaleString();
          }
          const forDiscountInDetails = document.getElementById(
            "forDiscountInDetails"
          );
          if (forDiscountInDetails) {
            forDiscountInDetails.innerHTML = parsedList[0].DarsadTakhfif;
          }
          if (parsedList[0].DarsadTakhfif == 0) {
            const darsadTakhfifInDetails = document.getElementById(
              "darsadTakhfifInDetails"
            );
            if (darsadTakhfifInDetails instanceof HTMLElement) {
              darsadTakhfifInDetails.style.display = "none";
            }
            const gheimatMasrafInDetailsInfoCont = document.getElementById(
              "gheimatMasrafInDetailsInfoCont"
            );
            if (gheimatMasrafInDetailsInfoCont instanceof HTMLElement) {
              gheimatMasrafInDetailsInfoCont.style.display = "none";
            }
            const lastDividerInDetails = document.getElementById(
              "lastDividerInDetails"
            );
            if (lastDividerInDetails instanceof HTMLElement) {
              lastDividerInDetails.style.display = "none";
            }
            const DiscountContInDetails = document.getElementById(
              "DiscountContInDetails"
            );
            if (DiscountContInDetails instanceof HTMLElement) {
              DiscountContInDetails.style.display = "none";
            }
          } else {
            const darsadTakhfifInDetails = document.getElementById(
              "darsadTakhfifInDetails"
            );
            if (darsadTakhfifInDetails instanceof HTMLElement) {
              darsadTakhfifInDetails.style.display = "flex";
            }
            const forDiscountInDetails = document.getElementById(
              "forDiscountInDetails"
            );
            if (forDiscountInDetails instanceof HTMLSpanElement) {
              forDiscountInDetails.innerText = parsedList[0].DarsadTakhfif;
            }
            const gheimatMasrafInDetailsInfoCont = document.getElementById(
              "gheimatMasrafInDetailsInfoCont"
            );
            if (gheimatMasrafInDetailsInfoCont instanceof HTMLElement) {
              gheimatMasrafInDetailsInfoCont.style.display = "flex";
            }
            const lastDividerInDetails = document.getElementById(
              "lastDividerInDetails"
            );
            if (lastDividerInDetails instanceof HTMLElement) {
              lastDividerInDetails.style.display = "flex";
            }
            const DiscountContInDetails = document.getElementById(
              "DiscountContInDetails"
            );
            if (DiscountContInDetails instanceof HTMLElement) {
              DiscountContInDetails.style.display = "flex";
            }
          }
          const groupsInDetailsPageCont = document.getElementById(
            "groupsInDetailsPageCont"
          );
          if (groupsInDetailsPageCont instanceof HTMLElement) {
            groupsInDetailsPageCont.style.display = "none";
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
          modal?.hide();
          const bootstrap = await getBootstrap();
          const mymodalForWarning = new bootstrap.Modal(
            document.getElementById("mymodalForWarning")
          );
          mymodalForWarning.show();
          const span = document.querySelector(
            "#mymodalForWarning .errorInMymodalForWarning"
          );
          if (span instanceof HTMLElement) {
            span.innerText = "لطفا ابتدا آنلاین شوید001";
          }
        }
      }
    } catch (error) {
      alert('catch: ' + error + 'modal: ' + modal)
      const bootstrap = await getBootstrap();
      modal?.hide();
      const mymodalForWarning = new bootstrap.Modal(
        document.getElementById("mymodalForWarning")
      );
      mymodalForWarning.show();
      const span = document.querySelector(
        "#mymodalForWarning .modal-body span"
      );
      if (span instanceof HTMLElement) {
        if (error instanceof Error) {
          span.innerText = error.message
          if (error.message === "Failed to fetch") {
            span.innerText = "❌ اتصال اینترنت برقرار نیست یا سرور در دسترس نمی‌باشد";
          }
        } else {
          alert('2')
          span.innerText = String(error);
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
      // event.keyCode == 13 &&
      event.key === "Enter" && // مدرن‌تر و درست‌تر از keyCode
      tagVal.trim().length &&
      // event.target.classList.contains("valid") //zare_nk_040408_commented
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
      openprodDetModal(text.toString());
    }
  }

  const seePrices = async () => {
    const token = getCookie("token");
    if (token == null) {
      window.location.href = "/login";
      return;
    }
    const bootstrap = await getBootstrap();
    const modal = new bootstrap.Modal(
      document.getElementById("seePricesModal")
    );
    modal.show();
  };

  return (
    <>
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
                                // backgroundColor: "white",  //zare_nk_040410_commented
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
                            <img
                              loading="lazy"
                              id="CurrentImg"
                            ////zare_nk_040522_commented_st
                            // style={{ height: "fit-content" }}
                            ////zare_nk_040522_commented_end
                            />
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
                            ></h1>

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
                                  <span id="nameBerandInDetailsInfoCont">
                                  </span>
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
                                  <div
                                    id="gheimatMasrafInDetailsInfoCont"
                                    className="gheimatMasrafInsabad"
                                    style={{
                                      display: "none",
                                      flexFlow: "row",
                                      justifyContent: "end",
                                      textDecoration: "line-through",
                                      fontSize: "14px",
                                      alignItems: "center",
                                    }}
                                  ></div>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexFlow: "row",
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
                                  ></div>
                                  <div
                                    className="rialInsabad"
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
                              <div
                                id="lastDividerInDetails"
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
                                id="DiscountContInDetails"
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
                                      display: "none",
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
                                    <span
                                      id="forDiscountInDetails"
                                      className="forDiscount"
                                      style={{
                                        color: "white",
                                        opacity: "1",
                                        fontSize: "18px",
                                      }}
                                    ></span>
                                  </div>
                                </div>
                              </div>
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

                                {/* <MiddleCountTedadSefr
                                  refForMiddleCount={refForMiddleCount}
                                  IdKala={
                                    ForCartContInProdDetVal
                                      ? (ForCartContInProdDetVal as any).IdKala
                                      : null
                                  }
                                  ForCartContentsDesignType={
                                    ForCartContInProdDetVal
                                      ? (ForCartContInProdDetVal as any)
                                        .ForCartContentsDesignType
                                      : null
                                  }
                                  refForfather={refForfather}
                                  refForParsedList={refForParsedList} 
                                  handlerForAddClick={(e) => {
                                    handlerForAddClick(
                                      ForCartContInProdDetVal
                                        ? (ForCartContInProdDetVal as any)
                                          .TedadOut
                                        : null,

                                      0,
                                      BarcodeKala,  
                                      e
                                    );
                                  }}
                                   
                                  handlerForRemClick={(e) => {
                                    return handlerForRemClick(
                                      ForCartContInProdDetVal
                                        ? (ForCartContInProdDetVal as any)
                                          .TedadOut
                                        : null,
                                      BarcodeKala, 
                                      e
                                    );
                                  }}
                                  TedadOut={
                                    ForCartContInProdDetVal
                                      ? (ForCartContInProdDetVal as any)
                                        .TedadOut
                                      : null
                                  }
                                  ForCartContInProdDetVal={
                                    ForCartContInProdDetVal
                                  }
                                  idTag={
                                    ForCartContInProdDetVal
                                      ? (ForCartContInProdDetVal as any).idTag
                                      : null
                                  }
                                  refForInputGroup={refForInputGroup}
                                /> */}

                                {ForCartContInProdDetVal != null && (
                                  <MiddleCountTedadSefr
                                    refForfather={ForCartContInProdDetVal.refForfather}
                                    fromShowDetails={ForCartContInProdDetVal.fromShowDetails}
                                    IdKala={ForCartContInProdDetVal.IdKala}
                                    idTag={ForCartContInProdDetVal.idTag}
                                    tedadInSabadOrDet={ForCartContInProdDetVal.tedadInSabadOrDet}

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
                            <li
                              className="nav-item"
                              style={{ display: "none" }}
                            >
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
                            <div
                              id="home"
                              className="containerr tab-pane active"
                            >
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
                            <div
                              id="menu1"
                              className="containerr tab-pane fade"
                            >
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
                            <div
                              id="menu2"
                              className="containerr tab-pane fade"
                            >
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

      <div style={{ display: "flex", flexFlow: "column", direction: "rtl" }}>
        <div
          id="SubprogramsCont"
          className="SubprogramsCont"
          style={{
            display: "flex",
            flexFlow: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <div
            id="Subprograms-1"
            className="Subprograms"
            style={{
              display: "flex",
              flexFlow: "row",
            }}
          >
            <Link
              className="vorsab"
              href="/shoppingbasket"
              style={{
                width: "100%",
                display: "flex",
                flexFlow: "row",
                justifyContent: "space-between",
                // padding: "15px",
                padding: "10px",
                outline: "none",
                // alignItems: "center", 
                border: "1px solid #a9a9a9",
                boxShadow: "#5e5e5e 0px 0px 2px 0px",
                borderRadius: "25px",
                backgroundColor: "white",
                overflow: "hidden",
              }}
            >
              <div
                className="imgAndTextInSubprograms"
                style={{
                  display: "flex",
                  flex: '1 1 auto',
                }}
              >
                <div
                  className="roundedPillsCont"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    // width: "fit-content",
                  }}
                >
                  <div
                    className="rounded-pill"
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      justifyContent: 'center',
                      border: "1px solid #E7E7E7",
                      padding: "10px",
                      borderRadius: "50%",
                      overflow: 'hidden',
                      minHeight: 85.6,
                    }}
                  >
                    <img
                      style={{ backgroundColor: "#efefef", width: "64px" }}
                      src="/images/Subprograms/superMarket.png"
                      alt="هایپر&zwnj;کرفو"
                    />
                  </div>
                </div>
                <div
                  className="subSysTextCont"
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    // width: "fit-content",
                  }}
                >
                  <div
                    style={{
                      flex: "0 0 auto",
                      display: "flex",
                      flexFlow: "row",
                      marginBottom: 7,
                    }}
                  >
                    <span className="titleStyle"
                      style={{ color: '#4b4949', fontFamily: 'IRANSansWeb_Bold(adad_fa)', }}
                    >سبد خرید</span>
                  </div>
                  <div
                    style={{ flexFlow: "row" }}
                  // className="decsInSubprograms"
                  >
                    <div style={{ display: "flex", flexFlow: "row" }}>
                      <span className="valueStyle"
                        style={{ color: '#4b4949', fontSize: 14, }}>
                        امکان مشاهده و ویرایش سبد خرید
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="leftArrowInSubprograms"
                style={{ display: 'flex', flexFlow: "row", alignItems: 'center', }}
              >
                <img
                  style={{ width: "20px" }}
                  src="https://img.tochikala.com/tochikala/left-arrow-03.svg"
                  alt="بزن بریم"
                />
              </div>
            </Link>
          </div>

          <div
            id="Subprograms-2"
            className="Subprograms"
            style={{
              display: "flex",
              flexFlow: "row",
            }}
          >
            <Link
              onClick={seePrices}
              className="vorsab"
              href="#"
              style={{
                width: "100%",
                display: "flex",
                flexFlow: "row",
                justifyContent: "space-between",
                // padding: "15px",
                padding: "10px",
                outline: "none",
                // alignItems: "center",
                border: "1px solid #a9a9a9",
                boxShadow: "#5e5e5e 0px 0px 2px 0px",
                borderRadius: "25px",
                backgroundColor: "white",
                overflow: "hidden",
              }}
            >
              <div
                className="imgAndTextInSubprograms"
                style={{ display: "flex", flex: '1 1 auto', }}
              >
                <div
                  className="roundedPillsCont"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    // width: "fit-content",
                  }}
                >
                  <div
                    className="rounded-pill"
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      justifyContent: 'center',
                      border: "1px solid #E7E7E7",
                      padding: "10px",
                      borderRadius: "50%",
                      overflow: 'hidden',
                      minHeight: 85.6,
                    }}
                  >
                    <img
                      style={{ backgroundColor: "#efefef", width: "64px" }}
                      src="/images/Subprograms/checklist.png"
                      alt="هایپر&zwnj;کرفو"
                    />
                  </div>
                </div>
                <div
                  className="subSysTextCont"
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    // width: "fit-content",
                  }}
                >
                  <div
                    style={{
                      flex: "0 0 auto",
                      display: "flex",
                      flexFlow: "row",
                      marginBottom: 7,
                    }}
                  >
                    <span className="titleStyle"
                      style={{ color: '#4b4949', fontFamily: 'IRANSansWeb_Bold(adad_fa)', }}
                    >مشاهده قیمت ها</span>
                  </div>
                  <div
                    style={{ flexFlow: "row" }}
                  // className="decsInSubprograms"
                  >
                    <div style={{ display: "flex", flexFlow: "row" }}>
                      <span className="valueStyle"
                        style={{ color: '#4b4949', fontSize: 14, }}>
                        مشاهده اطلاعات کالا با اسکن بارکد
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="leftArrowInSubprograms"
                style={{ display: 'flex', flexFlow: "row", alignItems: 'center', }}
              >
                <img
                  style={{ width: "20px" }}
                  src="https://img.tochikala.com/tochikala/left-arrow-03.svg"
                  alt="بزن بریم"
                />
              </div>
            </Link>
          </div>

          <div
            id="Subprograms-3"
            className="Subprograms"
            style={{
              display: "flex",
              flexFlow: "row",
            }}
          >
            <Link
              className="vorsab"
              href="/ordersHistory"
              style={{
                width: "100%",
                display: "flex",
                flexFlow: "row",
                justifyContent: "space-between",
                // padding: "15px",
                padding: "10px",
                outline: "none",
                // alignItems: "center",
                border: "1px solid #a9a9a9",
                boxShadow: "#5e5e5e 0px 0px 2px 0px",
                borderRadius: "25px",
                backgroundColor: "white",
                overflow: "hidden",
              }}
            >
              <div
                className="imgAndTextInSubprograms"
                style={{ display: "flex", flex: '1 1 auto', }}
              >
                <div
                  className="roundedPillsCont"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    // width: "fit-content",
                  }}
                >
                  <div
                    className="rounded-pill"
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      justifyContent: 'center',
                      border: "1px solid #E7E7E7",
                      padding: "10px",
                      borderRadius: "50%",
                      overflow: 'hidden',
                      minHeight: 85.6,
                    }}
                  >
                    <img
                      style={{ backgroundColor: "#efefef", width: "64px" }}
                      src="/images/Subprograms/order-icon.svg"
                      alt="هایپر&zwnj;کرفو"
                    />
                  </div>
                </div>

                <div
                  className="subSysTextCont"
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    // width: "fit-content",
                  }}
                >
                  <div
                    style={{
                      flex: "0 0 auto",
                      display: "flex",
                      flexFlow: "row",
                      marginBottom: 7,
                    }}
                  >
                    <span className="titleStyle"
                      style={{ color: '#4b4949', fontFamily: 'IRANSansWeb_Bold(adad_fa)', }}
                    >تاریخچه سفارشات</span>
                  </div>
                  <div
                    style={{ flexFlow: "row" }}
                  // className="decsInSubprograms"
                  >
                    <div style={{ display: "flex", flexFlow: "row" }}>
                      <span className="valueStyle"
                        style={{ color: '#4b4949', fontSize: 14, }}>
                        گزارش جزئیات سفارشات قبلی
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="leftArrowInSubprograms"
                style={{ display: 'flex', flexFlow: "row", alignItems: 'center', }}
              >
                <img
                  style={{ width: "20px" }}
                  src="https://img.tochikala.com/tochikala/left-arrow-03.svg"
                  alt="بزن بریم"
                />
              </div>
            </Link>
          </div>

          <div
            id="Subprograms-4"
            className="Subprograms"
            style={{
              display: "flex",
              flexFlow: "row",
            }}
          >
            <Link
              className="vorsab"
              href="/discountsAndOffers"
              style={{
                width: "100%",
                display: "flex",
                flexFlow: "row",
                justifyContent: "space-between",
                // padding: "15px",
                padding: "10px",
                outline: "none",
                // alignItems: "center", 
                border: "1px solid #a9a9a9",
                boxShadow: "#5e5e5e 0px 0px 2px 0px",
                borderRadius: "25px",
                backgroundColor: "white",
                overflow: "hidden",
              }}
            >
              <div
                className="imgAndTextInSubprograms"
                style={{ display: "flex", flex: '1 1 auto', }}
              >
                <div
                  className="roundedPillsCont"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    // width: "fit-content",
                  }}
                >
                  <div
                    className="rounded-pill"
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      justifyContent: 'center',
                      border: "1px solid #E7E7E7",
                      padding: "10px",
                      borderRadius: "50%",
                      overflow: 'hidden',
                      minHeight: 85.6,
                    }}
                  >
                    <img
                      style={{ backgroundColor: "#efefef", width: "64px" }}
                      src="/images/Subprograms/DiscountsAndOffers.png"
                      alt="هایپر&zwnj;کرفو"
                    />
                  </div>
                </div>
                <div
                  className="subSysTextCont"
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    // width: "fit-content",
                  }}
                >
                  <div
                    style={{
                      flex: "0 0 auto",
                      display: "flex",
                      flexFlow: "row",
                      marginBottom: 7,
                    }}
                  >
                    <span className="titleStyle"
                      style={{ color: '#4b4949', fontFamily: 'IRANSansWeb_Bold(adad_fa)', }}>
                      تخفیفات و پیشنهادات
                    </span>
                  </div>
                  <div
                    style={{ flexFlow: "row" }}
                  // className="decsInSubprograms"
                  >
                    <div style={{ display: "flex", flexFlow: "row" }}>
                      <span className="valueStyle"
                        style={{ color: '#4b4949', fontSize: 14, }}>
                        مشاهده کالاهای پیشنهادی و پرتخفیف
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="leftArrowInSubprograms"
                style={{ display: 'flex', flexFlow: "row", alignItems: 'center', }}
              >
                <img
                  style={{ width: "20px" }}
                  src="https://img.tochikala.com/tochikala/left-arrow-03.svg"
                  alt="بزن بریم"
                />
              </div>
            </Link>
          </div>

          <div
            id="Subprograms-5"
            className="Subprograms"
            style={{
              display: "flex",
              flexFlow: "row",
            }}
          >
            <Link
              className="vorsab"
              href="/games"
              style={{
                width: "100%",
                display: "flex",
                flexFlow: "row",
                justifyContent: "space-between",
                // padding: "15px",
                padding: "10px",
                outline: "none",
                // alignItems: "center", 
                border: "1px solid #a9a9a9",
                boxShadow: "#5e5e5e 0px 0px 2px 0px",
                borderRadius: "25px",
                backgroundColor: "white",
                overflow: "hidden",
              }}
            >
              <div
                className="imgAndTextInSubprograms"
                style={{ display: "flex", flex: '1 1 auto', }}
              >
                <div
                  className="roundedPillsCont"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    // width: "fit-content",
                  }}
                >
                  <div
                    className="rounded-pill"
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      justifyContent: 'center',
                      border: "1px solid #E7E7E7",
                      padding: "10px",
                      borderRadius: "50%",
                      overflow: 'hidden',
                      minHeight: 85.6,
                    }}
                  >
                    <img
                      style={{ backgroundColor: "#efefef", width: "64px" }}
                      src="/images/Subprograms/game.png"
                      alt="هایپر&zwnj;کرفو"
                    />
                  </div>
                </div>
                <div
                  className="subSysTextCont"
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    // width: "fit-content",
                  }}
                >
                  <div
                    style={{
                      flex: "0 0 auto",
                      display: "flex",
                      flexFlow: "row",
                      marginBottom: 7,
                    }}
                  >
                    <span className="titleStyle"
                      style={{ color: '#4b4949', fontFamily: 'IRANSansWeb_Bold(adad_fa)', }}
                    >بازی و سرگرمی</span>
                  </div>
                  <div
                    style={{ flexFlow: "row", }}
                  // className="decsInSubprograms"
                  >
                    <div style={{ display: "flex", flexFlow: "row" }}>
                      <span className="valueStyle"
                        style={{ color: '#4b4949', fontSize: 14, }}>
                        لحظات خوش کودکان در محیط هایپر!
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="leftArrowInSubprograms"
                style={{ display: 'flex', flexFlow: "row", alignItems: 'center', }}
              >
                <img
                  style={{ width: "20px" }}
                  src="https://img.tochikala.com/tochikala/left-arrow-03.svg"
                  alt="بزن بریم"
                />
              </div>
            </Link>
          </div>

          <div
            id="Subprograms-6"
            className="Subprograms"
            style={{
              display: "none",
              flexFlow: "row",
            }}
          >
            <Link
              className="vorsab"
              href="/ComparePage"
              style={{
                width: "100%",
                display: "flex",
                flexFlow: "row",
                justifyContent: "space-between",
                // padding: "15px",
                padding: "10px",
                outline: "none",
                // alignItems: "center", 
                border: "1px solid #a9a9a9",
                boxShadow: "#5e5e5e 0px 0px 2px 0px",
                borderRadius: "25px",
                backgroundColor: "white",
                overflow: "hidden",
              }}
            >
              <div
                className="imgAndTextInSubprograms"
                style={{ display: "flex", flex: '1 1 auto', }}
              >
                <div
                  className="roundedPillsCont"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    // width: "fit-content",
                  }}
                >
                  <div
                    className="rounded-pill"
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      justifyContent: 'center',
                      border: "1px solid #E7E7E7",
                      padding: "10px",
                      borderRadius: "50%",
                      overflow: 'hidden',
                      minHeight: 85.6,
                    }}
                  >
                    <img
                      style={{ backgroundColor: "#efefef", width: "64px" }}
                      src="/images/Subprograms/superMarket.png"
                      alt="هایپر&zwnj;کرفو"
                    />
                  </div>
                </div>
                <div
                  className="subSysTextCont"
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    // width: "fit-content",
                  }}
                >
                  <div
                    style={{
                      flex: "0 0 auto",
                      display: "flex",
                      flexFlow: "row",
                      marginBottom: 7,
                    }}
                  >
                    <span className="titleStyle"
                      style={{ color: '#4b4949', fontFamily: 'IRANSansWeb_Bold(adad_fa)', }}
                    >سرچ با تصویر</span>
                  </div>
                  <div
                    style={{ flexFlow: "row" }}
                  // className="decsInSubprograms"
                  >
                    <div style={{ display: "flex", flexFlow: "row" }}>
                      <span className="valueStyle"
                        style={{ color: '#4b4949', fontSize: 14, }}>
                        امکان سرچ کالا با تصویر
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="leftArrowInSubprograms"
                style={{ display: 'flex', flexFlow: "row", alignItems: 'center', }}
              >
                <img
                  style={{ width: "20px" }}
                  src="https://img.tochikala.com/tochikala/left-arrow-03.svg"
                  alt="بزن بریم"
                />
              </div>
            </Link>
          </div>

          <div
            id="Subprograms-temp-1"
            className="Subprograms"
            style={{ display: "flex", flexFlow: "row", border: "none" }}
          ></div>
          <div
            id="Subprograms-temp-2"
            className="Subprograms"
            style={{ display: "flex", flexFlow: "row", border: "none" }}
          ></div>
          <div
            id="Subprograms-temp-3"
            className="Subprograms"
            style={{ display: "flex", flexFlow: "row", border: "none" }}
          ></div>
          <div
            id="Subprograms-temp-4"
            className="Subprograms"
            style={{ display: "flex", flexFlow: "row", border: "none" }}
          ></div>
        </div>
      </div>
    </>
  );
}