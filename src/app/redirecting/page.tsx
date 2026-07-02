////zare_nk_050411_okk(1)
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function getCookie(name:any) {
  const value = `; ${document.cookie}`;  // برای اطمینان از یافتن کوکی‌ها
  const parts = value.split(`; ${name}=`); // تفکیک کوکی‌ها
  if (parts.length === 2){
    // return decodeURIComponent(parts.pop().split(';').shift());  //zare_nk_040410_commented
    ////zare_nk_040409_added_st
    const raw = parts.pop();
    if (!raw) throw new Error("No parts found");

    const value = raw.split(";").shift();
    if (!value) throw new Error("Invalid cookie format");

    return decodeURIComponent(value);
    ////zare_nk_040409_added_end
  }
  return null;  // اگر کوکی پیدا نشد
} 

export default function RedirectingPage() {
  const router = useRouter();
  useEffect(() => {
    // const token = getCookie("token");  //zare_nk_040118_added(inja niazi nist hamintori neveshtam)
    // //zare_nk_031221_commented_st(chon  tasmime nahaei estefadeh az cookie shod)
    // const redirect = sessionStorage.getItem("redirect") || "/";
    // sessionStorage.removeItem("redirect"); // مقدار را حذف کن تا در آینده تداخل ایجاد نکند
    // router.replace(redirect); // هدایت به مسیر ذخیره‌شده
    // //zare_nk_031221_commented_end(chon  tasmime nahaei estefadeh az cookie shod)
 
    //zare_nk_031221_added_st
    const redirect = getCookie('redirect') || "/";   //zare_nk_050222_nokteh(ba getCookie('redirect')? getCookie('redirect'): "/"; moghayeseh she)
    document.cookie = "redirect=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC"; // حذف کوکی
    router.replace(redirect); // هدایت به مسیر ذخیره‌شده
    //zare_nk_031221_added_end
  }, []);
  
  return <p>در حال هدایت...</p>; // متن موقت برای کاربر
}
