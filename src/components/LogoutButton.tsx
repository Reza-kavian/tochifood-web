////zare_nk_050423_okk(2)
"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import Styles from "@/styles/components/LogoutButton.module.css";

export default function LogoutButton() {
  const [isLogout, setIsLogout] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  function getCookie(name: any) {
    const value = `; ${document.cookie}`; // برای اطمینان از یافتن کوکی‌ها
    const parts = value.split(`; ${name}=`); // تفکیک کوکی‌ها
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() ?? null;
    }
    return null; //اگر کوکی پیدا نشد
  }

  useEffect(() => {
    const asyncFunctionInUseEffect = async () => {
      const token = getCookie("token");
      if (token != null) {
        try {
          const response = await fetch("/api/auth/verifyToken", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }), // ارسال توکن به سرور
          });

          const data = await response.json();
          if (response.ok) {
            setIsLogout(false);
          } else {
            // document.getElementById("idUSer")!.innerText = data.errorMessage;
            setIsLogout(true);
            // router.push(pathname);  //zare_nk_+041013_commented(in khat bi mani bood va comment shod,chon redirect be hamin safhe ast va rerendere alaki hast!)
          }
        } catch (error) {
          // setIsLogout(true);  //zare_nk_041124_commented(chon shayad bekhatere ghatiye net ya shabake be catch oomadeh bashim pas bayad mojadad talash kard ba nete salem va alaki ghezavat nakonim ke karbar offlineh)
          console.log("❌ خطااااااااااااااااااای JWT:", error);
        }
      } else {
        // document.getElementById("idUSer").innerText = "offlinim";
        setIsLogout(true);
      }
    };
    asyncFunctionInUseEffect(); // اجرای تابع async داخل useEffect
  });

  function forlogout() {
    document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;  //dastoore 134
    setIsLogout(true);
  }

  ////zare_nk_041013_nokteh_st(pishnahade chatgpt, chon dastoore 134 kar nemikoneh age cookie: httpOnly,secure,sameSite bashe, agaram httpOnly:false bashe ke amniate cookie paein miad samte client behesh dastresi dashteh bashim)
  //// /api/auth/logout/route.ts
  // import { NextResponse } from "next/server";

  // export async function POST() {
  //   const res = NextResponse.json({ ok: true });
  //   res.cookies.delete("token");
  //   return res;
  // } 
  // const logout = async () => {
  //   await fetch("/api/auth/logout", { method: "POST" });
  //   setIsLogout(true);
  //   router.refresh(); // اگر layout وابسته است
  // };
  ////zare_nk_041013_nokteh_end(pishnahade chatgpt, chon dastoore 134 kar nemikoneh age cookie: httpOnly,secure,sameSite bashe, agaram httpOnly:false bashe ke amniate cookie paein miad samte client behesh dastresi dashteh bashim)

  function forlogin() {
    // router.replace("/login");  //zare_nk_040328_commented
    location.href = "/login"; //zare_nk_040328_added
  }

  return (
    <>
      {isLogout == true ? (
        <>
          <button
            className={Styles.loginOutBtn}
            id="forlogoutBtnInHeader"
            onClick={forlogin}
          >
            logint
          </button>
          {/* zare_nk_040329_nokteh(ham className={Styles.loginOutBtn} va ham className="loginOutBtn" kar mikoneh,chon dar layout.tsx globals.css ra seda zadm, va dar LogoutButton.tsx ham LogoutButton.module.css ra seda zadim) */}
        </>
      ) : (
        <>
          <button
            className="loginOutBtn"
            id="forlogoutBtnInHeader"
            onClick={forlogout}>
            logout
          </button>
        </>
      )}
    </>
  );
}
