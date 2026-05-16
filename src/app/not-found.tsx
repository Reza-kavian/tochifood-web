// src/app/not-found.tsx  //zare_nk_050225_okk
"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
  useEffect(() => {
    //    const mymodalForWarning = new bootstrap.Modal(document.getElementById("mymodalForWarning"))
  }, []);

  return (
    <div style={{ padding: "3rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", color: "crimson" }}>صفحه پیدا نشد 😢</h1>
      <p>به نظر می‌رسه صفحه‌ای که دنبالش هستی وجود نداره.</p>
      <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
        برگشت به صفحه اصلی
      </Link>
    </div>
  );
}