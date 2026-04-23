////zare_nk_041220_okk
'use client' 
import { useState } from 'react'
import { useRouter } from 'next/navigation'

////zare_nk_040410(ok from typeScript)

function getCookie(name: any) {
  const value = `; ${document.cookie}`; // برای اطمینان از یافتن کوکی‌ها
  const parts = value.split(`; ${name}=`); // تفکیک کوکی‌ها
  if (parts.length === 2) {
    // return decodeURIComponent(parts.pop().split(";").shift());  //zare_nk_040409_commented
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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (event: React.FormEvent) => { 
    event.preventDefault()
    setError('');

    const response = await fetch('/api/auth/signUp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      //// credentials: "include", //zare_nk_040202_commented
    });
    const data = await response.json() ;
    if (response.ok) {
      alert("response.status: "+response.status+"-data.message: "+data.message);
      document.cookie = `token=${data.token}; path=/;`;  //zare_nk_040210_nokteh(in khat lazem nist chon dar api signUp cookie ye token ra meghdar dadim va alan ke be response.ok omadim meghdar dare)
      const redirect = getCookie("redirect") || "/";
      document.cookie =
        "redirect=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC"; // حذف کوکی
      console.log("zare_nk_040107_redirect:" + redirect);
      router.replace(redirect); // هدایت به مسیر ذخیره‌شده    
    } else {       
      setError(data.errorMessage+'-a011111111111111'); 
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">sign UP</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded mb-2" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-2" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">sign UP</button>
      </form>
    </div>
  )
}