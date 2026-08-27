////zare_nk_050428_okk(2)
// import { strict } from "assert";
// import { ReactNode } from "react";
// import { headers } from "next/headers";   ////zare_nk_050605_commented

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// اگر از افکت‌های خاصی مثل Fade یا Cube استفاده می‌کنی، استایل مربوط به اون رو هم اینجا ایمپورت کن
// مثال: import 'swiper/css/effect-fade';

import "@/styles/globals.css";

import Styles from "@/styles/components/globals.module.css";

import LayoutWrapper from "@/components/LayoutWrapper";
////zare_nk_041011_nokteh(layout.tsx serverComponent hast va dar aan nemitavani mostaghiman az hoock haye client estefadeh koni yani  
//// neveshtane "use client" dar an manteghi nist pas az componente komaki(LayoutWrapper) ke "use client" dashteh bashe baraye estefadeh kardim

import { AuthenticationProvider } from '../context/AuthenticationContext';  ////zare_nk_050111_added

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";

interface RootLayoutProps {
  children: React.ReactNode;
}
export const metadata = {
  title: "TIC-TAC-TOE",
};

// export default function Layout({children}:{children:React.ReactNode}){
export default async function Layout({ children }: RootLayoutProps) {
  console.log('050329-Layout rendered!!');
  // console.log("oo-Layout called[]!!");  //zare_nk_040416_commented(chon dar har safhe seda zadeh mishe typescript hoshdar mide dare ziad seda zadeh mishe va baese sholooghiye log mishe!!)
  ////zare_nk_050605_commented_st(ezafi va baraye olgu bood va hazf shod(await headers() baese kond shodane render shavad))
  // const headersList = await headers();
  // const pathname = headersList.get("x-pathname") || "";
  // const fullUrl = headersList.get("x-url") || "";
  // const isLoginPage = pathname === "/login";
  // const isLoginPageOr = pathname === "/login" || pathname === "/tryreact";
  ////zare_nk_050605_commented_end(ezafi va baraye olgu bood va hazf shod(await headers() baese kond shodane render shavad))
  return (
    // <html lang="fa" dir="rtl">
    <html>
      <body className={`${Styles.ISW_Medium_fa}`}>
        <AppRouterCacheProvider>
          <AuthenticationProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </AuthenticationProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}