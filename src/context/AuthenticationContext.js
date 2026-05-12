// context/AuthenticationContext.js   //zare_nk_050222_okk
'use client';

import { createContext, useState, useContext } from 'react';

function getCookie(name) {
    ////zare_nk_050209_added_st
    if (typeof document === 'undefined') {
        return null; // برای جلوگیری از خطای عدم وجود document
    }
    ////zare_nk_050209_added_end
    const value = `; ${document.cookie}`; // برای اطمینان از یافتن کوکی‌ها
    const parts = value.split(`; ${name}=`); // تفکیک کوکی‌ها
    if (parts.length === 2) {
        const raw = parts.pop();
        if (!raw) throw new Error("No parts found");
        const value = raw.split(";").shift();
        if (!value) throw new Error("Invalid cookie format");
        return decodeURIComponent(value);
    }
    return null; //اگر کوکی پیدا نشد
}

// 1. Context را ایجاد کنید
const AuthenticationContext = createContext();

// 2. Provider کامپوننت را بسازید
export function AuthenticationProvider({ children }) {

    let token = getCookie("token");
    let isLog = token != null ? true : false
    const [isLogin, setIsLogin] = useState(isLog);

    // const [userData, setUserData] = useState({ name: 'Ali', role: 'Admin' }); 
    // const login = (user) => setUserData(user);
    // const logout = () => setUserData(null);

    return (
        // <AuthenticationContext.Provider value={{ userData, login, logout }}>
        <AuthenticationContext.Provider value={{ isLogin }}>
            {children}
        </AuthenticationContext.Provider>
    );
}

// 3. Custom Hook برای استفاده آسان از Context
export const useAuthentication = () => {
    return useContext(AuthenticationContext);
};