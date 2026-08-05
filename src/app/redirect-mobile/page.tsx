//\src\app\redirect-mobile\page.tsx  //zare_nk_050428_okk(1)
"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation"; 

export default function MobileRedirectPage({ searchParams }: any) {
  if (searchParams?.verified !== "1") {
    console.log('verified !== "1"');
    redirect("/login");
  }
  const deepLink =
    searchParams?.token
      ? `myapp://login?token=${encodeURIComponent(searchParams.token)}`
      : searchParams?.error
        ? `myapp://login?error=${encodeURIComponent(searchParams.error)}`
        : null;

  useEffect(() => {
    if (!deepLink) { console.log('deepLink undefined!!'); return; }

    const t = setTimeout(() => {
      window.location.href = deepLink;
    }, 300);
    return () => clearTimeout(t);
  }, [deepLink]);

  return (
    <div style={{
        padding: "24px",
        fontFamily: "sans-serif",
        textAlign: "center",
        flex: '1 1 auto',  ////zare_nk_050514_added
      }}>
      <h3>در حال بازگشت به اپلیکیشن…</h3>

      {deepLink && (
        <>
          <p>اگر اپلیکیشن به‌صورت خودکار باز نشد، روی دکمه زیر بزنید:</p>
          <a href={deepLink}
            style={{
              display: "inline-block",
              marginTop: 16,
              padding: "12px 20px",
              backgroundColor: searchParams?.error ? "#f44336" : "#4CAF50",
              color: "#fff",
              borderRadius: 6,
              textDecoration: "none",
            }}
          >
            {searchParams?.error
              ? "بازگشت به اپلیکیشن (با خطا)"
              : "باز کردن اپلیکیشن"}
          </a>
        </>
      )}
    </div>
  );
}
