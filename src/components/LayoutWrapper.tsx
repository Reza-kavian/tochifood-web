////zare_nk_041219_okk
"use client";

import React, { useState, useRef, useEffect } from 'react';

import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

import { useAuthentication } from '../context/AuthenticationContext'; //zare_nk_050111_added

////zare_nk_050202_added_st(for use MUI)
// MUI imports
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
////zare_nk_050202_added_end(for use MUI)

import Styles from "@/styles/components/globals.module.css"; //zare_nk_050204_added 

interface RootLayoutProps {
  children: React.ReactNode;
}

////zare_nk_050202_added_st(for use MUI)
// // Define your MUI theme
const theme = createTheme({
  palette: {
    mode: 'light', ////zare_nk_050203_nokteh(shabihe bg-dark bootstrap)
    // primaryDasti: {   //zare_nk_050203_nokteh(range dastiye khodam ke dar palette tarif kardam,baname delkhah(age name tarifshodeye MUI yani primary bedam jaigizine primarye MUI mishe))     
    primary: {   //zare_nk_050203_nokteh(range dastiye khodam ke dar palette tarif kardam,baname delkhah(age name tarifshodeye MUI yani primary bedam jaigizine primarye MUI mishe))     

      light: '#9ea6ad',  //zare_nk_050203_nokteh(light ro nemishnaseh!)
      main: '#724a0e62', //zare_nk_050203_nokteh(lafze primary ra dar propertiye tagha bedam faghat main ro mishnaseh(name dotSubi ham ghabool nemikoneh(masalan primaryDasti.main ya primaryDasti.dark ro ghabool nemikoneh!))) 
      dark: '#c01515',    //zare_nk_050203_nokteh(dark ro nemishnaseh!) 
      contrastText: '#ffffff',     //zare_nk_050203_nokteh(contrastText ro nemishnaseh!) 
    },
    // secondaryDasti: {
    secondary: {
      main: '#7a037a', // رنگ ثانویه بنفش MUI
    },
    ////zare_nk_050203_commented_st(text ro nemikhooneh va zirmajmooash ham emal nemishe pas commentesh kardam)
    // text: {
    //   primary: '#ffffff', // مثال: متن اصلی سفید در حالت دارک
    //   secondary02: '#1926d8', // رنگ خاکستری متوسط دلخواه شما
    //   disabled: '#777777', // مثال: متن غیرفعال
    // },
    ////zare_nk_050203_commented_end(text ro nemikhooneh va zirmajmooash ham emal nemishe pas commentesh kardam)
  },
  // شما می‌توانید تنظیمات بیشتری برای تم اینجا اضافه کنید
  // typography, spacing, components, etc.
});
////zare_nk_050202_added_end(for use MUI)

export default function LayoutWrapper({ children }: RootLayoutProps) {

  const refForBox = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isLoginPageOrPage = pathname === "/login" || pathname === "/";

  // const { userData, login, logout } = useAuthentication(); //zare_nk_050111_added
  const { isLogin } = useAuthentication(); //zare_nk_050111_added

  return (
    //// zare_nk_050202_added_st(for use MUI) 
    <ThemeProvider theme={theme} >
      <CssBaseline />
      {/* zare_nk_050202_added_end(for use MUI) */}
      <body
        className={`${Styles.ISW_Medium_fa}`}
        style={{
          // color: "#3f3f3f",
          // fontFamily: 'IRANSansWeb_Medium(adad_fa)', 
        }}>
        {/* zare_nk_041225_commented_st(tebghe revale tapsifood header ra baraye aksare safahat motefavet ast,pas dar safahat mizaraim) */}
        {/* {!isLoginPageOrPage && (
        <div className="layoutHeader sticky-top">
          <a
            className="headerTitle"
            href="/"
            style={{
              color: "inherit",
              textDecoration: "none",
              fontSize: "32px",
            }}
          > 
            <img
              style={{ width: "40px", borderRadius: "7px" }}
              src="https://img.tochikala.com/Logo/photo14359415832-Copy.jpg"
              alt="هایپر‌کرفو"
            />
          </a>
          <LogoutButton />
        </div>
      )} */}
        {/* zare_nk_041225_commented_end(tebghe revale tapsifood header ra baraye aksare safahat motefavet ast,pas dar safahat mizaraim) */}
        <main className="main-in-LayoutWrapper">
          <section className="section-in-LayoutWrapper">
            {/* {isLogin ? (
            <div>
              <p>شما وارد شده‌اید  -  {isLogin} </p>
            </div>
          ) : (
            <div>
              <p>شما وارد نشده‌اید  -  {isLogin} </p>
            </div>
          )} */}


            {/* {isLogin ? (<>
              {children}
            </>
            ) : (
              <div>
                <p>شما وارد نشده‌اید  -  {isLogin} </p>
              </div>
            )} */}

            {children}
            {/* zare_nk_041225_added_st(baraye collapse paeine safhe(ehtemalan tapsifood dar layout gozashteh!shayad khodam tooye safheh bebaram!)) */}
            <div className="tabIndexOne-in-LayoutWrapper" tabIndex={1}>
            </div>

          </section>
        </main>

        <div
          className="modal px-0"
          id="mymodalForWarning"
          style={{ overflow: "hidden" }}
        >
          <div
            className="modal-dialog"
            style={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
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
                    flexFlow: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    className="spanCont titleStyle"
                    style={{
                      fontFamily: "IRANSansWeb_Medium(adad_fa)",
                      fontSize: "18px",
                      color: "red",
                    }}
                  >
                    <span>خطا</span>
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
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    height: "100%",
                  }}
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
                      className="contAndHoshdarCont"
                      style={{
                        flex: "1 1 auto",
                        display: "flex",
                        flexFlow: "column",
                      }}
                    >
                      <div style={{ margin: "10px 0px" }}>
                        <span
                          className="errorInMymodalForWarning valueStyle"
                          style={{
                            width: "100%",
                            display: "flex",
                            flexFlow: "row",
                            fontSize: "16px",
                            // color: "red",
                            justifyContent: "center",
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
      </body >
      {/* zare_nk_050202_added_st(for use MUI) */}
    </ThemeProvider >
    //// zare_nk_050202_added_end(for use MUI) 
  );
}
