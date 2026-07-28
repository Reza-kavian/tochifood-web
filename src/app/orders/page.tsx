////zare_nk_050428_okk(1)
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

type sumValsForForooshSatrType = {
  ShomarehFaktorForoosh: number;
  IdFaktorForoosh: number;
  TarikhSefaresh: string;
  MablaghMasraf: number;
  JamTakhfifTitr: number;
  JamTakhfifSatr: number;
  MablaghKhales: number;
  forooshTitrRowsLength: number;
};

type ForooshSatrType = {
  IdKala: number;
  NameKala: string;
  Tedad: number;
  IsVazni: number;
  ForooshSatr: number;
  // [key: string]: any; //yani az IdKala motmaen hastim vali fildhaye digare db ra parsa ina tagheir dadan dar in peroujeh shayad aslan
  //  be man nagan va timi kar nakonim,pas [key: string]: any; gozashtam ke kolli hast(chon hameye fieldha ro neveshtam commentesh kardam)
};

type ForooshTitrType = {
  IdFaktorForoosh: number;
  NameSobe: string;
  VaziatFactor: string;
  UserFullName: string;
  TarikhSefaresh: string;
  JamKhales: number;
  ShomareFaktor: number;
  JamMasraf: number;
  JamTakhfifTitr: number;
  JamTakhfifSatr: number;
  // [key: string]: any; //yani az IdKala motmaen hastim vali fildhaye digare db ra parsa ina tagheir dadan dar in peroujeh shayad aslan 
  // be man nagan va timi kar nakonim,pas [key: string]: any; gozashtam ke kolli hast(chon hameye fieldha ro neveshtam commentesh kardam)
};


type ShowForooshSatrHideForooshTitrType = {
  ShomarehFaktorForoosh: number;
  IdFaktorForoosh: number;
  TarikhSefaresh: string;
  MablaghMasraf: number;
  JamTakhfifTitr: number;
  JamTakhfifSatr: number;
  MablaghKhales: number;
  forooshTitrRowsLength: number;
};





















export default function Orders() {
  const router = useRouter();
  type footerBtnClickedType = {
    home: boolean;
    orders: boolean;
    profile: boolean;
  };
  const [footerBtnClicked, setFooterBtnClicked] = useState<footerBtnClickedType>({
    home: false,
    orders: true,
    profile: false,
  });
  ////zare_nk_050429_added_st
  const [ForooshSatrHideForooshTitr, setForooshSatrHideForooshTitr] =
    useState<sumValsForForooshSatrType | null>(null);
  const [bisatr, setBisatr] = useState(true);
  const [bisatrDarSatr, setBisatrDarSatr] = useState(true);

  const [forooshSatrRows, setForooshSatrRows] = useState<ForooshSatrType[] | null>(null);

  const [forooshTitrRows, setForooshTitrRows] = useState<ForooshTitrType[] | null>(null);
  const [isShowFaktorForooshSatr, setIsShowFaktorForooshSatr] = useState(false);

  const [isShowFaktorForooshTitr, setIsShowFaktorForooshTitr] = useState<string | null>(null);

  const [isOpenedMymodalForWarning, setIsOpenedMymodalForWarning] = useState(false);
  const [warningTextInMymodalForWarning, setWarningTextInMymodalForWarning] = useState('');

  async function ShowForooshSatrHideForooshTitr({
    ShomarehFaktorForoosh,
    IdFaktorForoosh,
    TarikhSefaresh,
    MablaghMasraf,
    JamTakhfifTitr,
    JamTakhfifSatr,
    MablaghKhales,
    forooshTitrRowsLength,
  }:
    ShowForooshSatrHideForooshTitrType) {
    setIsShowFaktorForooshSatr(true);
    setIsShowFaktorForooshTitr(null);
    setForooshSatrHideForooshTitr(() => {
      return {
        ShomarehFaktorForoosh: ShomarehFaktorForoosh,
        IdFaktorForoosh: IdFaktorForoosh,
        TarikhSefaresh: TarikhSefaresh,
        MablaghMasraf: MablaghMasraf,
        JamTakhfifTitr: JamTakhfifTitr,
        JamTakhfifSatr: JamTakhfifSatr,
        MablaghKhales: MablaghKhales,
        forooshTitrRowsLength: forooshTitrRowsLength,
      };
    });
    const token = getCookie("token");
    if (token == null) {
      return;
    } else {
      // const token = getCookie("token");  //zare_nk_041130_commented(ezafi hast va token balatar tarif shod)
      // let ApiUrl = "https://testotmapi.sarinmehr.com/api/v1/Hyper/";
      // var urlSelectFaktorForooshSatr = ApiUrl + "Api_SelectFaktorForooshSatr";
      // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented 
      var urlSelectFaktorForooshSatr = NextJsApiUrl + "Api_SelectForooshSatr";
      const response = await fetch(urlSelectFaktorForooshSatr, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          IdForooshTitr: IdFaktorForoosh,
        }),
        // credentials: "include", //zare_nk_040402_commented
      });
      const data = await response.json();
      if (response.ok) {
        if (data.status != 0) {
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
          setIsOpenedMymodalForWarning(true);
          setWarningTextInMymodalForWarning(data.errors[0]);

        } else if (data.status == 0) {
          var result = JSON.parse(data.data.list);
          console.log('zare_nk_041123-resultSatr: ' + JSON.stringify(result));
          console.log('zare_nk_041123-resultSatr.length: ' + result.length);
          if (result.length == 0) {
            setBisatrDarSatr(true);
            return;
          }
          setBisatrDarSatr(false);
          setForooshSatrRows(result);
        }
      } else {
        if (response.status == 401) {
          // const bootstrap = await getBootstrap(); //zare_nk_040417_added
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
          setIsOpenedMymodalForWarning(true);
          setWarningTextInMymodalForWarning("لطفا ابتدا وارد حساب کاربری شوید");
        }
      }
    }
  }

  const handlerForMyDialogForWarning = () => {
    setIsOpenedMymodalForWarning(false);
    router.refresh(); //zare_nk_040312_added-kolle safhe refresh nemishe va saritar va behtare
    //  window.location.reload();  //zare_nk_040312_added-faghat dar sourate niaz vaghti ke router.refresh() javab nadad
  };

  ////zare_nk_050429_commented_st(dialog jaigozine bootstrapModale mansookh shod va niazi be in useEffect nist va khodesh onClose dareh)
  // useEffect(() => {
  //   const mymodalForWarning = document.getElementById("mymodalForWarning");
  //   const handlerForMymodalForWarning = () => {
  //     router.refresh(); //zare_nk_040312_added-kolle safhe refresh nemishe va saritar va behtare
  //     //  window.location.reload();  //zare_nk_040312_added-faghat dar sourate niaz vaghti ke router.refresh() javab nadad
  //   };
  //   if (mymodalForWarning) {
  //     mymodalForWarning.addEventListener(
  //       "hidden.bs.modal",
  //       handlerForMymodalForWarning
  //     );
  //   }
  //   return () => {
  //     // پاکسازی رویداد در unmount
  //     if (mymodalForWarning) {
  //       mymodalForWarning.removeEventListener(
  //         "hidden.bs.modal",
  //         handlerForMymodalForWarning
  //       );
  //     }
  //   };
  // }, []);
  ////zare_nk_050429_commented_end(dialog jaigozine bootstrapModale mansookh shod va niazi be in useEffect nist va khodesh onClose dareh)

  useEffect(() => {
    if (ForooshSatrHideForooshTitr != null) {
      return;
    }
    async function tempFuncForAsync() {
      const token = await getCookie("token");
      if (token == null) {
        return;
      } else {
        // const token = getCookie("token"); //zare_nk_041130_commented(chon ezafiye va balatar tarif shode)
        // let ApiUrl = "https://testotmapi.sarinmehr.com/api/v1/Hyper/";
        // var urlSelectFaktorForooshTitr = ApiUrl + "Api_SelectFaktorForooshTitr";
        // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented 
        var urlSelectFaktorForooshTitr = NextJsApiUrl + "Api_SelectForooshTitr";
        const response = await fetch(urlSelectFaktorForooshTitr, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          // body: JSON.stringify({}),  //zare_nk_0411123_commented
          ////zare_nk_0411123_added_st
          body: JSON.stringify({
            'Sort': 'IdFaktorForoosh',
            'SortDir': 'DESC',
          }),
          ////zare_nk_0411123_added_end
          // credentials: "include", //zare_nk_040402_commented
        });
        const data = await response.json();
        if (response.ok) {
          if (data.status != 0) {
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
            setIsOpenedMymodalForWarning(true);
            setWarningTextInMymodalForWarning(data.errors[0]);
          } else if (data.status == 0) {
            var result = JSON.parse(data.data.list);
            console.log('zare_nk_041123-result: ' + JSON.stringify(result));
            console.log('zare_nk_041123-resresult.lengthult: ' + result.length);
            if (result.length == 0) {
              setBisatr(true);
              return;
            }
            setBisatr(false);
            setForooshTitrRows(result);
          }
        } else {
          if (response.status == 401) {
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
            setIsOpenedMymodalForWarning(true);
            setWarningTextInMymodalForWarning("لطفا ابتدا وارد حساب کاربری شوید");
          }
        }
      }
    }
    tempFuncForAsync();
  }, [isShowFaktorForooshTitr]);

  const onBackClick = () => {
    setIsShowFaktorForooshSatr(false);
    setIsShowFaktorForooshTitr("notNull");
    setForooshSatrHideForooshTitr(null);
  };
  ////zare_nk_050429_added_end

  return (
    <>
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
            paddingBottom: '96px',
          }}>
          {isOpenedMymodalForWarning &&
            <Dialog open={isOpenedMymodalForWarning} onClose={() => {
              handlerForMyDialogForWarning();
              console.log('Dialog onClose event1!');
            }}>
              <DialogTitle>عنوان مودال شما</DialogTitle> {/* zare_nk_050204_nokteh(mesle modalHedeare bootstrap) */}
              <DialogContent> {/* zare_nk_050204_nokteh(mesle modalContent bootstrap) */}
                <DialogContentText> {/* zare_nk_050204_nokteh(mesle modalBodye bootstrap(bakhshe mohtavaye gheire dokmehi va gheire rooydadi)) */}
                  اینجا متن توضیحات مودال قرار می‌گیرد که در بوت‌استرپ در بخش modal-body بود.
                </DialogContentText>
              </DialogContent>
              <DialogActions> {/* zare_nk_050204_nokteh(mesle modalBodye bootstrap(bakhshe motavaye dokmehi va rooydadi)) */}
                {/* zare_nk_050204_nokteh(dokmehaye tooye Dialog ro mishe mesle bootstrapModal ke tooye modal-body mizasht, inja masalan tooye DialogContent  va hamsayaye 
                                DialogContentText bezarim, vali az nazare manteghe MUI dakhele DialogActions khanatar hast, darzemn MUI emkanate zaheri va karbordiye khoobi ham barash lahaz mikoneh) */}
                <Button onClick={() => {
                  console.log('Dialog onClose event2!');
                  setIsOpenedMymodalForWarning(false);
                }}>بستن</Button>
                {/* <Button onClick={() => {
                                        console.log('Dialog onClose event3!');
                                        setIsOpenedMymodalForWarning(false);
                                    }} variant="contained">تایید</Button> */}
              </DialogActions>
            </Dialog>
          }
          {/* zare_nk_050429_added_st */}
          {
            isShowFaktorForooshSatr == true ? (
              <div
                id="MyOrdersDetCont"
                style={{
                  color: "#4B4949",
                  display: "flex",
                  flexFlow: "column",
                  width: "100%",
                  direction: "rtl",
                }}>
                <div
                  id="MyOrderDet"
                  className="MyOrderDet"
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    width: "100%",
                    marginBottom: "40px",
                    marginTop: "10px",
                    direction: "rtl",
                  }}>
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      justifyContent: "space-between",
                      marginBottom: "15px",
                    }}
                  >
                    <div
                      className="titleStyle"
                      style={{
                        fontSize: 18,
                        display: "flex",
                        flexFlow: "row",
                        alignItems: "center",
                      }}>
                      <h6 style={{ marginLeft: 10, fontSize: 18 }}>جزئیات سفارش</h6>
                      {ForooshSatrHideForooshTitr != null && (
                        <span>{ForooshSatrHideForooshTitr.IdFaktorForoosh}</span>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexFlow: "row",
                        justifyContent: "start",
                      }}>
                      <a className="buttonHover titleStyle" href="#" onClick={onBackClick}
                        style={{
                          padding: 10,
                          borderRadius: 7,
                          display: "flex",
                          flexFlow: "row",
                          textDecoration: "none",
                          backgroundColor: "inherit",
                        }}>
                        <div
                          style={{
                            display: "flex",
                            flexFlow: "column",
                            justifyContent: "center",
                            backgroundColor: "inherit",
                            marginLeft: 10,
                          }}
                        >
                          <img
                            src="https://img.tochikala.com/tochikala/back-icon-in-cardcontainer.svg"
                            style={{ width: 18 }}
                            alt="بازگشت به لیست سفارش ها"
                          />
                        </div>
                        <div
                          style={{
                            flex: "0 0 auto",
                            display: "flex",
                            flexFlow: "row",
                            alignItems: "center",
                            fontSize: 14,
                          }}
                        >
                          <span>بازگشت به لیست سفارش ها</span>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Order Date */}
                  <div
                    className="tahvilTarikhCont"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      className="tahvilCont"
                      style={{
                        display: "flex",
                        flexFlow: "column",
                        border: "1px solid #a9a9a9",
                        borderRadius: 10,
                        padding: 16,
                        marginLeft: '0px',
                        boxShadow: "#5e5e5e 0px 0px 3px 0px",
                        backgroundColor: "#f6f6f6",
                      }}
                    >
                      <div style={{ display: "flex", flexFlow: "row", fontSize: 14 }}>
                        <span className="titleStyle">تاریخ سفارش</span>
                        <span style={{ margin: "0 5px" }}>:</span>
                        {ForooshSatrHideForooshTitr != null && (
                          <span className="valueStyle" style={{ marginLeft: 5 }}>
                            {ForooshSatrHideForooshTitr.TarikhSefaresh ?? ""}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Product Section */}
                  <div
                    className="productJoziatCont"
                    style={{ display: "flex", marginTop: "10px" }}
                  >
                    {/* Product Count */}
                    <div
                      className="productContInMyOrderDet valueStyle"
                      style={{
                        border: "1px solid #a9a9a9",
                        borderRadius: 10,
                        display: "flex",
                        flexFlow: "column",
                        padding: 16,
                        backgroundColor: "#f6f6f6",
                        boxShadow: "#5e5e5e 0px 0px 3px 0px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexFlow: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ display: "flex", flexFlow: "row" }}>
                          <h6 className="titleStyle" style={{ fontSize: 16 }}>
                            محصولات
                          </h6>
                        </div>
                        <div style={{ display: "flex", flexFlow: "row", fontSize: 14 }}>
                          {/* zare_nk_041123_commented_st */}
                          {/* {ForooshSatrHideForooshTitr != null && (
                  <span style={{ marginLeft: 7 }}>
                    {ForooshSatrHideForooshTitr.forooshTitrRowsLength}
                  </span>
                )} */}
                          {/* zare_nk_041123_commented_end */}
                          {/* zare_nk_041123_added_st */}
                          {forooshSatrRows != null && (
                            <span style={{ marginLeft: 7 }}>
                              {forooshSatrRows.length}
                            </span>
                          )}
                          {/* zare_nk_041123_added_end */}
                          <span>کالا</span>
                        </div>
                      </div>

                      {!bisatrDarSatr && (
                        <>
                          {forooshSatrRows?.map((item, index) => {
                            return (
                              <div
                                key={index || item.IdKala}
                                style={{
                                  display: "flex",
                                  flexFlow: "row",
                                  borderBottom: "1px solid #F5F5F5",
                                  padding: "10px 0px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexFlow: "column",
                                    marginLeft: "10px",
                                  }}
                                >
                                  <img
                                    loading="lazy"
                                    src={`https://img.tochikala.com/Product/${item.IdKala}.webp`}
                                    alt={item.NameKala || ""}
                                    style={{ width: "64px", height: "64px" }}
                                    ////zare_nk_041213_added_st
                                    onError={(e) => {
                                      e.currentTarget.src = 'https://img.tochikala.com/Logo/tochi.png';
                                      e.currentTarget.style.backgroundColor = 'white';
                                    }}
                                  ////zare_nk_041213_added_end
                                  />
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    flexFlow: "column",
                                    justifyContent: "space-around",
                                  }}
                                >
                                  <div style={{ display: "flex", flexFlow: "row" }}>
                                    <h6
                                      style={{
                                        fontSize: "13px",
                                        fontFamily: "IRANSansWeb_Medium(adad_fa)",
                                      }}
                                    >
                                      {item.NameKala || ""}
                                    </h6>
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      flexFlow: "row",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <span style={{ marginLeft: "5px" }}>
                                      {item.Tedad ?? ""}
                                    </span>
                                    <span>
                                      {item.IsVazni === 0 ? "عدد" : "کیلوگرم"}
                                    </span>

                                    <span
                                      style={{
                                        width: "0px",
                                        height: "25px",
                                        borderLeft: "2px solid silver",
                                        margin: "0px 5px",
                                      }}
                                    ></span>

                                    <div style={{ display: "flex", flexFlow: "row" }}>
                                      <span style={{ marginLeft: "5px" }}>
                                        {item.ForooshSatr != null
                                          ? item.ForooshSatr.toLocaleString()
                                          : ""}
                                      </span>
                                      <span>ریال</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      )}
                    </div>

                    {/* Invoice Details */}
                    <div
                      className="joziatFaktorCont valueStyle"
                      style={{
                        border: "1px solid #a9a9a9",
                        borderRadius: 10,
                        display: "flex",
                        flexFlow: "column",
                        padding: 16,
                        fontSize: 14,
                        backgroundColor: "#f6f6f6",
                        // height: "fit-content",
                        boxShadow: "#5e5e5e 0px 0px 3px 0px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexFlow: "row",
                          borderBottom: "1px solid #F5F5F5",
                          padding: "10px 0",
                        }}
                      >
                        <span className="titleStyle">جزئیات فاکتور</span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexFlow: "row",
                          justifyContent: "space-between",
                          borderBottom: "1px solid #F5F5F5",
                          padding: "12px 0",
                        }}
                      >
                        <div style={{ display: "flex", flexFlow: "row" }}>
                          <span>مجموع خرید شما</span>
                        </div>
                        <div style={{ display: "flex", flexFlow: "row" }}>
                          {ForooshSatrHideForooshTitr != null && (
                            <span style={{ marginLeft: 10, fontSize: 16 }}>
                              {ForooshSatrHideForooshTitr.MablaghMasraf?.toLocaleString() ??
                                ""}
                            </span>
                          )}
                          {/* <span style={{ marginLeft: 10, fontSize: 16 }}>{MablaghMasraf?.toLocaleString() ?? ''}</span> */}
                          <span>ریال</span>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexFlow: "row",
                          justifyContent: "space-between",
                          borderBottom: "1px solid #F5F5F5",
                          padding: "12px 0",
                        }}
                      >
                        <div style={{ display: "flex", flexFlow: "row" }}>
                          <span>سود شما از این خرید</span>
                        </div>
                        <div style={{ display: "flex", flexFlow: "row" }}>
                          {ForooshSatrHideForooshTitr != null && (
                            <span style={{ marginLeft: 10, fontSize: 16 }}>
                              {ForooshSatrHideForooshTitr.JamTakhfifSatr?.toLocaleString() ??
                                0}
                            </span>
                          )}
                          {/* <span style={{ marginLeft: 10, fontSize: 16 }}>{jamTakhfifSatr?.toLocaleString() ?? ''}</span> */}
                          <span>ریال</span>
                        </div>
                      </div>

                      {/* zare_nk_041123_added_st(codeTakhfif zirmajmooeye JamTakhfifTitr hast) */}
                      <div
                        style={{
                          display: "flex",
                          flexFlow: "row",
                          justifyContent: "space-between",
                          borderBottom: "1px solid #F5F5F5",
                          padding: "12px 0",
                        }}
                      >
                        <div style={{ display: "flex", flexFlow: "row" }}>
                          <span>کد تخفیف</span>
                        </div>
                        <div style={{ display: "flex", flexFlow: "row" }}>
                          {ForooshSatrHideForooshTitr != null && (
                            <span style={{ marginLeft: 10, fontSize: 16 }}>
                              {ForooshSatrHideForooshTitr.JamTakhfifTitr?.toLocaleString() ??
                                0}
                            </span>
                          )}
                          {/* <span style={{ marginLeft: 10, fontSize: 16 }}>{JamTakhfifTitr?.toLocaleString() ?? ''}</span> */}
                          <span>ریال</span>
                        </div>
                      </div>
                      {/* zare_nk_041123_added_end(codeTakhfif zirmajmooeye JamTakhfifTitr hast) */}

                      <div
                        style={{
                          display: "flex",
                          flexFlow: "row",
                          justifyContent: "space-between",
                          padding: "12px 0",
                        }}
                      >
                        <div style={{ display: "flex", flexFlow: "row" }}>
                          <span>مبلغ خالص</span>
                        </div>
                        <div style={{ display: "flex", flexFlow: "row" }}>
                          {/* <span style={{ marginLeft: 10, fontSize: 16 }}>{MablaghKhales?.toLocaleString() ?? ''}</span> */}

                          {ForooshSatrHideForooshTitr != null && (
                            <span style={{ marginLeft: 10, fontSize: 16 }}>
                              {ForooshSatrHideForooshTitr.MablaghKhales?.toLocaleString() ??
                                ""}
                            </span>
                          )}
                          <span>ریال</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                id="MyOrdersCont"
                style={{
                  display: "flex",
                  flexFlow: "column",
                  width: "100%",
                  direction: "rtl",
                }}
              >
                {!bisatr && (
                  <>
                    {forooshTitrRows?.map((item, index) => {
                      return (
                        <div
                          key={item.IdFaktorForoosh}
                          id={`MyOrder-${item.IdFaktorForoosh}`}
                          className="MyOrder buttonHoverr"
                          style={{
                            cursor: "default",
                            display: "flex",
                            flexFlow: "column",
                            width: "100%",
                            border: "1px solid #a9a9a9",
                            borderRadius: "10px",
                            color: "#adadad",
                            marginBottom: "15px",
                            boxShadow: "#5e5e5e 0px 0px 3px 0px",
                            backgroundColor: "#f6f6f6",
                          }}
                        >
                          <div
                            className="MyOrderHead"
                            style={{
                              display: "flex",
                              flexFlow: "row",
                              justifyContent: "space-between",
                              borderBottom: "1px solid #E7E7E7",
                              padding: "5px 0px 5px 20px",
                            }}
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
                                    padding: "0px 10px",
                                  }}
                                >
                                  <img
                                    style={{ width: "44px" }}
                                    src="https://img.tochikala.com/Logo/photo14359415832-Copy.jpg"
                                    alt="هایپر&zwnj;کرفو"
                                  />
                                </div>
                              </div>

                              <div
                                style={{
                                  display: "none",
                                  flexFlow: "column",
                                  justifyContent: "space-around",
                                }}
                              >
                                <div
                                  style={{
                                    flex: "0 0 auto",
                                    display: "flex",
                                    flexFlow: "row",
                                    fontSize: "15px",
                                    color: "#322E2E",
                                  }}
                                >
                                  <span
                                    className="nameShobe titleStyle"
                                    style={{ fontSize: "12px" }}
                                  >
                                    {item.NameSobe}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "none",
                                flexFlow: "column",
                                justifyContent: "space-around",
                              }}
                            >
                              <div
                                style={{
                                  flex: "0 0 auto",
                                  display: "flex",
                                  flexFlow: "row",
                                  fontSize: "15px",
                                }}
                              >
                                <span
                                  className="valueStyle"
                                  id={`VaziatFactor-${item.IdFaktorForoosh}`}
                                  style={{
                                    padding: "7px",
                                    borderRadius: "7px",
                                    fontSize: "12px",
                                  }}
                                >
                                  {item.VaziatFactor}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="MyOrderBody"
                            style={{ display: "flex", flexFlow: "column" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexFlow: "row",
                                justifyContent: "space-between",
                                fontSize: "14px",
                                paddingBottom: "10px",
                                width: "100%",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexFlow: "column",
                                  width: "100%",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexFlow: "row",
                                    margin: "7px 0px",
                                  }}
                                >
                                  <span
                                    className="titleStyle"
                                    style={{
                                      whiteSpace: "nowrap",
                                      fontFamily: "IRANSansWeb_Bold(adad_fa)",
                                    }}
                                  >
                                    {" "}
                                    نام شخص{" "}
                                  </span>
                                  <span style={{ margin: "0px 5px" }}>:</span>
                                  {/* <span  style={{textOverflow: 'ellipsis',overflow: 'hidden',display: '-webkit-box',-webkit-line-clamp: '2',lineClamp: '2',-webkit-box-orient: 'vertical'}}>{ item.UserFullName} </span> */}
                                  <span
                                    className="valueStyle"
                                    style={{
                                      textOverflow: "ellipsis",
                                      overflow: "hidden",
                                      display: "-webkit-box",
                                      lineClamp: "2",
                                    }}
                                  >
                                    {item.UserFullName}{" "}
                                  </span>
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    flexFlow: "row",
                                    margin: "7px 0px",
                                  }}
                                >
                                  <span
                                    className="titleStyle"
                                    style={{
                                      whiteSpace: "nowrap",
                                      fontFamily: "IRANSansWeb_Bold(adad_fa)",
                                    }}
                                  >
                                    {" "}
                                    تاریخ سفارش{" "}
                                  </span>
                                  <span style={{ margin: "0px 5px" }}>: </span>
                                  <span className="valueStyle">{item.TarikhSefaresh}</span>
                                </div>
                              </div>
                              <div
                                id={`imgContInMyOrder-${item.IdFaktorForoosh}`}
                                style={{
                                  display: "flex",
                                  flexFlow: "row",
                                  alignItems: "center",
                                }}
                              ></div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexFlow: "row",
                                justifyContent: "end",
                                paddingBottom: "15px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexFlow: "row",
                                  marginLeft: "10px",
                                  alignItems: "center",
                                }}
                              >
                                <span
                                  className="valueStyle"
                                  style={{ marginLeft: "5px" }}
                                >
                                  {item.JamKhales.toLocaleString()}{" "}
                                </span>
                                <span className="valueStyle" style={{ fontSize: "14px" }}>
                                  ریال
                                </span>
                              </div>
                              <button
                                onClick={(e) => {
                                  ShowForooshSatrHideForooshTitr({
                                    ShomarehFaktorForoosh: item.ShomareFaktor,
                                    IdFaktorForoosh: item.IdFaktorForoosh,
                                    TarikhSefaresh: item.TarikhSefaresh,
                                    MablaghMasraf: item.JamMasraf,
                                    JamTakhfifTitr: item.JamTakhfifTitr,
                                    JamTakhfifSatr: item.JamTakhfifSatr,
                                    MablaghKhales: item.JamKhales,
                                    forooshTitrRowsLength: forooshTitrRows.length,
                                  });
                                }}
                                className="btn btn-danger fontSizeLess768 "
                                style={{
                                  flex: "1 1 150px",
                                  maxWidth: "200px",
                                  borderRadius: "10px",
                                  padding: "7px 20px",
                                }}
                              >
                                جزئیات سفارش
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            )
          }
          {/* zare_nk_050429_added_end */}
        </main>

        <footer style={{
          maxWidth: '450px', marginLeft: 'auto', marginRight: 'auto', zIndex: 50, bottom: 0, left: 0, right: 0, position: 'fixed',
        }}>
          <div style={{
            position: 'relative', boxShadow: '0px -1px 5px 2px #0000000d', opacity: 1, backgroundColor: 'white',
            overflow: 'hidden', height: '100%', padding: '0px 1rem',
          }}>
            <div style={{
              fontSize: '1rem', lineHeight: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              width: '100%', height: '4rem', position: 'relative', direction: 'rtl', border: 'none', minWidth: '.25rem',
            }}>
              <div style={{
                display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', position: 'absolute',
              }}>
                <button onClick={() => {
                  // setFooterBtnClicked(() => {
                  //   return ({
                  //     home: false,
                  //     orders: true,
                  //     profile: false,
                  //   })
                  // })
                }}
                  style={{
                    fontSize: '.875rem', lineHeight: '1.25rem', display: 'flex', flexFlow: 'column', alignItems: 'center',
                    gap: '.25rem', cursor: 'pointer', border: 'none', padding: '0rem', backgroundColor: 'inherit', height: '100%',
                  }}>
                  {
                    footerBtnClicked.orders == true ?
                      <div style={{
                        display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center', margin: '.5rem', marginBottom: '0px',
                      }}>
                        <img src="/images/homeFooter/orders-icon.svg" alt="سفارش‌ها" style={{
                          height: '1.5rem', width: '1.5rem',
                        }} />
                      </div> :
                      <div style={{
                        display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center', margin: '.5rem', marginBottom: '0px',
                      }}>
                        <img src="/images/homeFooter/orders-icon-kamrang.svg" alt="سفارش‌ها" style={{
                          height: '1.5rem', width: '1.5rem',
                        }} />
                      </div>
                  }

                  <span style={{
                    fontSize: '.75rem', lineHeight: '1rem', textAlign: 'center',
                    ...(footerBtnClicked.orders == true ? { color: '#1b1c1d' } : { color: '#878b92' }),
                  }}>
                    سفارش‌ها
                  </span>
                </button>
              </div>

              <div style={{
                display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center', height: '100%', zIndex: '2',
              }}>
                <button onClick={() => {
                  router.replace("/");
                  // setFooterBtnClicked(() => {
                  //   return ({
                  //     home: true,
                  //     orders: false,
                  //     profile: false,
                  //   })
                  // })
                }}
                  style={{
                    fontSize: '.875rem', lineHeight: '1.25rem', display: 'flex', flexFlow: 'column', alignItems: 'center',
                    gap: '.25rem', cursor: 'pointer', border: 'none', padding: '0rem', backgroundColor: 'inherit', width: '4rem', height: '100%',
                  }}>
                  {footerBtnClicked.home == true ?
                    <div style={{
                      display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center', margin: '.5rem', marginBottom: '0px',
                    }}>
                      <img src="/images/homeFooter/home-icon.svg" alt="خانه" style={{
                        height: '1.5rem', width: '1.5rem',
                      }} />
                    </div> :
                    <div style={{
                      display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center', margin: '.5rem', marginBottom: '0px',
                    }}>
                      <img src="/images/homeFooter/home-icon-kamrang.svg" alt="خانه" style={{
                        height: '1.5rem', width: '1.5rem',
                      }} />
                    </div>
                  }

                  <span style={{
                    fontSize: '.75rem', lineHeight: '1rem', textAlign: 'center',
                    ...(footerBtnClicked.home == true ? { color: '#1b1c1d' } : { color: '#878b92' }),
                  }}>
                    خانه
                  </span>
                </button>
              </div>

              <div style={{
                display: 'flex', flexFlow: 'row', justifyContent: 'center', alignItems: 'center', height: '100%', zIndex: '2',
              }}>
                <button onClick={() => {
                  router.replace("/profile");
                  // setFooterBtnClicked(() => {
                  //   return ({
                  //     home: false,
                  //     orders: false,
                  //     profile: true,
                  //   })
                  // })
                }}
                  style={{
                    fontSize: '.875rem', lineHeight: '1.25rem', display: 'flex', flexFlow: 'column', alignItems: 'center',
                    gap: '.25rem', cursor: 'pointer', border: 'none', padding: '0rem', backgroundColor: 'inherit', width: '4rem', height: '100%',
                  }}>
                  {footerBtnClicked.profile == true ?
                    <div style={{
                      display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center', margin: '.5rem', marginBottom: '0px',
                    }}>
                      <img src="/images/homeFooter/profile-icon.svg" alt="پروفایل" style={{
                        height: '1.5rem', width: '1.5rem',
                      }} />
                    </div> :
                    <div style={{
                      display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center', margin: '.5rem', marginBottom: '0px',
                    }}>
                      <img src="/images/homeFooter/profile-icon-kamrang.svg" alt="پروفایل" style={{
                        height: '1.5rem', width: '1.5rem',
                      }} />
                    </div>
                  }

                  <span style={{
                    fontSize: '.75rem', lineHeight: '1rem', textAlign: 'center',
                    ...(footerBtnClicked.profile == true ? { color: '#1b1c1d' } : { color: '#878b92' }),
                  }}>
                    پروفایل
                  </span>
                </button>
              </div>

            </div>
          </div>
        </footer>

        <div className="tabIndexOne-in-LayoutWrapper" tabIndex={1}>
        </div>
      </div>
    </>
  );
}
