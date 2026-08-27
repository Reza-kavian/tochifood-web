////zare_nk_050510_okk(2)
"use client";

import React, { useRef } from 'react';

import { usePathname } from "next/navigation";
// import LogoutButton from "@/components/LogoutButton";

// import { useAuthentication } from '../context/AuthenticationContext';

////zare_nk_050202_added_st(for use MUI)
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
////zare_nk_050202_added_end(for use MUI)

import Styles from "@/styles/components/globals.module.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

////zare_nk_050202_added_st(for use MUI)
const theme = createTheme({
  palette: {
    mode: 'light', ////zare_nk_050203_nokteh(shabihe bg-dark bootstrap)
    // primaryDasti: {   //zare_nk_050203_nokteh(range dastiye khodam ke dar palette tarif kardam, ba name delkhah(age name tarifshodeye MUI yani primary bedam jaigizine primarye MUI mishe))     
    primary: {   ////zare_nk_050203_nokteh(range dastiye khodam ke dar palette tarif kardam, ba name delkhah(age name tarifshodeye MUI yani primary bedam jaigozine primarye MUI mishe))     
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
  //// شما می‌توانید تنظیمات بیشتری برای تم اینجا اضافه کنید
  //// typography, spacing, components, etc.
});
////zare_nk_050202_added_end(for use MUI)

export default function LayoutWrapper({ children }: RootLayoutProps) {
  console.log('zare_nk_050520_LayoutWrapper rendered!!');
  const refForBox = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isLoginPageOrPage = pathname === "/login" || pathname === "/";

  return (
    //// zare_nk_050202_added_st(for use MUI) 
    <ThemeProvider theme={theme} >
      <CssBaseline />
      {/* zare_nk_050202_added_end(for use MUI) */}
      {/* <body className={`${Styles.ISW_Medium_fa}`}>         */}
        <main className="main-in-LayoutWrapper">
          <section className="section-in-LayoutWrapper">
            {children}
            <div className="tabIndexOne-in-LayoutWrapper" tabIndex={1}>
            </div>
          </section>
        </main>
      {/* </body > */}
      {/* zare_nk_050202_added_st(for use MUI) */}
    </ThemeProvider >
    //// zare_nk_050202_added_end(for use MUI) 
  );
}