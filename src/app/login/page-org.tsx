////zare_nk_050223_okk
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function getCookie(name: any) {
  const value = `; ${document.cookie}`; // برای اطمینان از یافتن کوکی‌ها
  const parts = value.split(`; ${name}=`); // تفکیک کوکی‌ها
  if (parts.length === 2) {
    // return parts.pop().split(';').shift(); // برگرداندن مقدار کوکی
    // return decodeURIComponent(parts.pop().split(';').shift());  //zare_nk_040409_commented
    ////zare_nk_040409_added_st
    const raw = parts.pop();
    if (!raw) throw new Error("No parts found");
    const value = raw.split(";").shift();
    if (!value) throw new Error("Invalid cookie format");
    return decodeURIComponent(value);
    ////zare_nk_040409_added_end
  }
  return null; // اگر کوکی پیدا نشد
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  //zare_nk_031221_added_st(and commented. chon khastam be jaye gharar dadane request.nextUrl.pathname dar querystring an ra dar sessionStorage ya cookie gharar bedam ke tasmime nahaei cookie shod)
  // const searchParams = useSearchParams();
  // const redirect = searchParams.get('redirect') || '/';
  //zare_nk_031221_added_end(and commented. chon khastam be jaye gharar dadane request.nextUrl.pathname dar querystring an ra dar sessionStorage ya cookie gharar bedam ke tasmime nahaei cookie shod)

  useEffect(() => {
    const google_Invalid_credentials = getCookie("google_Invalid_credentials");
    document.cookie =
      "google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC"; // حذف کوکی
    if (google_Invalid_credentials != null) {
      setError(
        "خطا در احراز هویت با گوگل" 
      );
    }
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      // credentials: "include", // ارسال کوکی‌ها با درخواست //zare_nk_040402_commented
    });
    const data = await response.json();
    if (response.ok) {
      // document.cookie = `token=${data.token}; path=/;`; //zare_nk_040118_tozih(lazem nist token ra dar document.cookies berizim chon alanam token dar document cookies hast tavasote api login/route.js)
      // router.push(redirect);   //zare_nk_031221_added_st(and commented. chon khastam be jaye gharar dadane request.nextUrl.pathname dar querystring an ra dar sessionStorage ya cookie gharar bedam ke tasmime nahaei cookie shod)
      // //zare_nk_031221_added_st(and commented.chon  tasmime nahaei estefadeh az cookie shod)
      // const redirect = sessionStorage.getItem("redirect") || "/";
      // sessionStorage.removeItem("redirect"); // مقدار را حذف کن تا در آینده تداخل ایجاد نکند
      // router.replace(redirect); // هدایت به مسیر ذخیره‌شده
      // //zare_nk_031221_added_end(and commented.chon  tasmime nahaei estefadeh az cookie shod)

      //zare_nk_031221_added_st
      const redirect = getCookie("redirect") || "/";
      document.cookie =
        "redirect=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC"; 
      router.replace(redirect); 
      //zare_nk_031221_added_end
    } else {
      console.log("zare_nk_040107-!!response.ok");      
      setError("invalid in userPass authentication:" + data.errorMessage);  
    }
  };

  const handleGoogleLogin = () => {
    // window.location.href = `/api/auth/google?redirect=${redirect}`; //rahe1(in karbordi nist chon vaghti baraye ehraze hoviat be khode site google
    // ferestede mishe parametre redirect dar site google hazf mishe va vaghti google pas az ehrazehoviat be masire src\app\api\auth\callback\google
    // hedayat mikone parametre redirect ra dar queryStringe src\app\api\auth\callback\google nemifereste va dige dastresi vojood nadare )
    // sessionStorage.setItem('redirect', redirect); //rahe2(baraye rafe moshkele rahe1 az sessionStorage baraye zakhireye moteghayere redirect estefade mikonim)
    //ba lahaz kardane cookie be jaye sessionStorage rahe2 ham comment shod
    window.location.href = `/api/auth/google`; // هدایت به گوگل
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form  
        onSubmit={handleLogin}
        className="p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white p-2 rounded"
        >
          Login with Google
        </button>
        <button
          type="button"
          onClick={() => {
            router.push("/signUp");
          }}
          className="w-full bg-red-500 text-white p-2 rounded"
        >
          signUp
        </button>
      </form>
    </div>
  );
}
