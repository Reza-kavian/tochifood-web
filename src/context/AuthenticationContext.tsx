//// context/AuthenticationContext.js   ////zare_nk_050514_okk(1)
'use client';

import { createContext, useState, useContext, useCallback } from 'react';

import { jwtDecode } from "jwt-decode";

interface MyJwtPayload {
    FullName: string | null;
    Mobile: string | null;
    IdUser: number | null;
    exp: number | null;
    // .
    // .
    [key: string]: any;
}

interface setIsLoginAndInfType {
    isLogin: boolean | null;
    FullName: string | null;
    Mobile: string | null;
    IdUser: number | null;
}

function getCookie(name: string) {
    if (typeof document === 'undefined') {
        return null; // برای جلوگیری از خطای عدم وجود document
    }
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

const AuthenticationContext = createContext<{ isLoginAndInf: setIsLoginAndInfType, refreshLoginStatus: () => void, }>({
    isLoginAndInf: {
        isLogin: null,
        FullName: null,
        Mobile: null,
        IdUser: null,
    },
    refreshLoginStatus: () => { },
});

export function AuthenticationProvider({ children }: { children: React.ReactNode }) {
    console.log('050329-AuthenticationProvider rendered!!');
    const [isLoginAndInf, setIsLoginAndInf] = useState<setIsLoginAndInfType>({
        isLogin: null,
        FullName: null,
        Mobile: null,
        IdUser: null,
    });

    const refreshLoginStatus = useCallback(async () => {
        console.log('zare_nk_050505_rere_01.01-refreshLoginStatus called');
        const token = getCookie("token");
        if (token) {
            ////zare_nk_050504_nokteh_st(raveshe 1-estelame samte client(amniate kamtar vali saritar, chon api nemizanim, vali chon baraye hameye api
            ////  haye .netcore ke be token niaz darand parsafar monghazi ya namotabar boodane token ra barrasi mikoneh man baraye amali mesle
            ////  namayeshe login bodan ya logout boodane karbar az hamin raveshe avvale samte client estefadeh mikonam ke saritare va baraye in 
            //// mavarede sadeh be /src/app/api/auth/verifyToken/ api nemizanam))
            try {
                const DecodeToken = jwtDecode<MyJwtPayload>(token);
                console.log('zare_nk_050504_token: ' + JSON.stringify(DecodeToken));
                ////zare_nk_050504_token: {"IdUser":"10006","Mobile":"9351091287","FullName":"رضا کاویان","Type":"User","nbf":1785067797,"exp":1787659797,"iat":1785067797}
                var FullName = DecodeToken.FullName;
                var Mobile = DecodeToken.Mobile;
                var IdUser = DecodeToken.IdUser;
                const expires = (DecodeToken.exp ?? 0) * 1000;
                if (expires) {
                    console.log('zare_nk_050504_1-expires: ' + expires);
                    const expiresTime = Number(expires);
                    if (expiresTime <= Date.now()) {
                        console.log('zare_nk_050504_2-expiresTime <= Date.now()');
                        document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
                        ////zare_nk_050507_added_st
                        document.cookie = `currentShobe=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
                        document.cookie = `chosenAddress=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
                        ////zare_nk_050507_added_end
                        setIsLoginAndInf({
                            isLogin: false,
                            FullName: null,
                            Mobile: null,
                            IdUser: null,
                        });
                    } else {
                        console.log('zare_nk_050504_3-expiresTime > Date.now()');
                        setIsLoginAndInf({
                            isLogin: true,
                            FullName: FullName,
                            Mobile: Mobile,
                            IdUser: IdUser,
                        });
                    }
                }
                else {
                    console.log('zare_nk_050504_4-!expires');
                    document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
                    ////zare_nk_050507_added_st
                    document.cookie = `currentShobe=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
                    document.cookie = `chosenAddress=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
                    ////zare_nk_050507_added_end
                    setIsLoginAndInf({
                        isLogin: false,
                        FullName: null,
                        Mobile: null,
                        IdUser: null,
                    });
                }
            } catch {
                document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                ////zare_nk_050507_added_st
                document.cookie = `currentShobe=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
                document.cookie = `chosenAddress=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
                ////zare_nk_050507_added_end
                setIsLoginAndInf({
                    isLogin: false,
                    FullName: null,
                    Mobile: null,
                    IdUser: null,
                });
            }
            ////zare_nk_050504_nokteh_end(raveshe 1-estelame samte client(amniate kamtar vali saritar, chon api nemizanim, vali chon baraye hameye api
            ////  haye .netcore ke be token niaz darand parsafar monghazi ya namotabar boodane token ra barrasi mikoneh man baraye amali mesle
            ////  namayeshe login bodan ya logout boodane karbar az hamin raveshe avvale samte client estefadeh mikonam ke saritare va baraye in 
            //// mavarede sadeh be /src/app/api/auth/verifyToken/ api nemizanam))
            ////zare_nk_050504_nokteh_st(raveshe 2-estelame samte server(amniate bishtar vali kondtar, chon api mizanim))
            // try {
            //     const response = await fetch("/api/auth/verifyToken", {  //zare_nk_041115_nokteh(methode Api_LoginUser2 tavassote aghaye parsafar chek mishe dar morede dorostiye sms va zamane monghazi shodanesh,
            //         //vali man mikham bedoonam tokeni ke methode Api_LoginUser2 be man mideh ba secretKey amn shodeh bashe,va projeye samte cllient hatman bayad kelide dastresi ro dashteh bashe ta kasi 
            //         //ba sooeestefade token ro natooneh vakeshi koneh(masalan dar proje haye haker ha),pas az methode verifyToken ke ba dastoore jwt.verify az ma secretKey mikhad estefadeh kardam)
            //         method: "POST",
            //         headers: { "Content-Type": "application/json" },
            //         body: JSON.stringify({ token }),
            //     });
            //     const data = await response.json();
            //     if (response.ok) {
            //         console.log("zare_nk_040925-decodedToken: " + JSON.stringify(data.decoded));
            //         setIsLoginAndInf({
            //             isLogin: true,
            //             FullName: data.decoded.FullName,
            //             Mobile: data.decoded.Mobile,
            //             IdUser: data.decoded.IdUser,
            //         });
            //     } else {
            //         document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
            //         setIsLoginAndInf({
            //             isLogin: false,
            //             FullName: null,
            //             Mobile: null,
            //             IdUser: null,
            //         });
            //     }
            // } catch (error) {
            //     document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
            //     setIsLoginAndInf({
            //         isLogin: false,
            //         FullName: null,
            //         Mobile: null,
            //         IdUser: null,
            //     });

            //     if (error instanceof Error) {
            //         console.log("متاسفانه خطایی رخ داده است323:" + error.message);
            //     } else {
            //         console.log("متاسفانه خطایی رخ داده است343:" + String(error));
            //     }
            // }
            ////zare_nk_050504_nokteh_end(raveshe 2-estelame samte server(amniate bishtar vali kondtar, chon api mizanim))
        }
        else {
            console.log('zare_nk_050504_4-!token');
            document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
            ////zare_nk_050507_added_st
            document.cookie = `currentShobe=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
            document.cookie = `chosenAddress=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
            ////zare_nk_050507_added_end
            setIsLoginAndInf({
                isLogin: false,
                FullName: null,
                Mobile: null,
                IdUser: null,
            });
        }
    }, []);

    return (
        <AuthenticationContext.Provider value={{ isLoginAndInf, refreshLoginStatus }}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export const useAuthentication = () => {
    return useContext(AuthenticationContext);
};