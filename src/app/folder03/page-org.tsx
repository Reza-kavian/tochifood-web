 ////zare_nk_050223_okk
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "@/styles/components/home.module.css";
import "@/styles/globals.css";

export default function ProductsPage() {
  console.log('ProductsPage called!!');
  const fer1 = useRef("z");
  const router = useRouter();
  const pathname = usePathname();
  var searchParams = useSearchParams(); // خواندن کوئری‌های فعلی

  const changeCategory = () => {
    const params = new URLSearchParams(searchParams); // ایجاد یک کپی از کوئری‌های فعلی  //zare_nk_041011_nokteh(useSearchParams faghat khandani hast va niaz be URLSearchParams darim baraye set kardan dar params)
    params.set("category2", "category2Value"); // تغییر مقدار category
    params.set(fer1.current, "electronics"); // تغییر مقدار category
    alert("full: " + pathname + '---' + searchParams + '----params: ' + params);
     router.push(pathname + "?" + params);
    fer1.current = fer1.current + "a";
  };

  const gofolder02BaPush = () => {
    router.push("/folder02");
  };
  const gofolder02BaRep = () => {
    router.replace("/folder02");
  };  
  return (
    <div>
      <button onClick={changeCategory}>Change Category</button>
      <h2 className={styles.shape}>
        <Link href="/folder02">برو به folder02</Link>
      </h2>
      --------------------------------------------------------------------------------
      <div style={{ backgroundColor: "red" }}>
        <button onClick={gofolder02BaPush}> با پوش folder02</button>
        <br />
        <button onClick={gofolder02BaRep}> با ریپلیس folder02</button>
        <br />    
        <Link href="/folder02">با Link</Link>
        <br />
        <Link href="/folder02" replace>با Link</Link>
        <br />
        <a href="/folder02">تگ a</a>
        <br />  
      </div>
    </div>
  );
}
