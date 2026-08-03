////zare_nk_050510_okk(1)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, memo, RefObject, ReactNode, ChangeEvent, MouseEvent } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";

import globalsStyles from "@/styles/components/globals.module.css";

import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { useAuthentication } from '../context/AuthenticationContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import { NextJsApiUrl } from "../constants/Urls";

function getCookie(name: any) {
    if (typeof document === 'undefined') {
        console.log("document === 'undefined'");
        return null; // برای جلوگیری از خطای عدم وجود document
    }
    console.log("document !== 'undefined'");
    const value = `; ${document.cookie}`; // برای اطمینان از یافتن کوکی‌ها
    console.log("value is: " + value);
    const parts = value.split(`; ${name}=`); // تفکیک کوکی‌ها
    if (parts.length === 2) {
        console.log("dohe-parts.length: " + parts.length);
        const raw = parts.pop();
        if (!raw) throw new Error("No parts found");
        const value = raw.split(";").shift();
        if (!value) throw new Error("Invalid cookie format");
        return decodeURIComponent(value);
    }
    console.log("do nist-parts.length: " + parts.length);
    return null; //اگر کوکی پیدا نشد
}

const SwiperGetStoresInSearchResault = () => {
    console.log('050329-SwiperGetStoresInSearchResault rendered!!');   ////zare_nk_050329_added
    const [errorInSwiperShopsInSearchComp, setErrorInSwiperShopsInSearchComp] = useState<string | null>(null);

    const router = useRouter();

    type responsedListFromApiSelectAddressListType = {
        IdAdress: number;
        IdUser: number;
        Adress: string;
        CodePosti: string;
        Lon: number;
        Lat: number;
        Mobile: number;
        FName: string;
        LName: string;
        OnvanAdress: string;
        Fullname: string;

        [key: string]: any;
    };

    type responsedListFromApiSelectShobehAtrafUserType = {
        IdShobe: number;
        NameSobe: string;
        KafKharid: number;
        Fasele: number;
        ZarfiatErsal: number;
        Keraye: number;
        NazdikTarinZamanErsal: string;
    };

    const [responsedListFromApiSelectShobehAtrafUser, SetResponsedListFromApiSelectShobehAtrafUser] = useState<responsedListFromApiSelectShobehAtrafUserType[] | null>(null);

    const getSwiperShopsInSearchComp = async () => {
        ////zare_nk_050510_added_st
        const chosenAddress = await getCookie("chosenAddress");
        var parsedChosenAddress: responsedListFromApiSelectAddressListType | null = chosenAddress ? JSON.parse(chosenAddress) : null;
        // setMycurrentAddressState(parsedChosenAddress);  ////zare_nk_050510_commented(chon dar in file,dar haminja faghat be parsedChosenAddress niaz darim va dar jahaye dige va
        ////  jsx niazi be estefadeh azash nist dakhele setState negahesh nadashtam(age dar tavabehe digeh mikham azash estefadeh konam(albateh dar in file felan hich ja azash estefadeh
        ////  nemikonam), vali dar jsx(dar dome html) nemikham azash etefadeh konam mamoolan useRef behtare nesbat be useState ke(useState baese reRender mishe)))
        ////zare_nk_050510_added_end

        let token = await getCookie("token");
        if (!token) {
            setErrorInSwiperShopsInSearchComp("lotfan avval online shid");
            return;
        }
        console.log('tokentokentoken: ' + token);
        // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented 
        const response = await fetch(NextJsApiUrl + "Api_SelectShobehAtrafUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            // body: JSON.stringify({}),
            body: JSON.stringify({
                // "Id": 1,  ////zare_nk_050510_commented(manzoor az Id hamoon IdAddress hast,meghdare 1 ehtemalan meydoon saate sari hast)
                "Id": parsedChosenAddress != null ? parsedChosenAddress.IdAdress : 1, ////zare_nk_050510_added(manzoor az Id hamoon IdAddress hast,meghdare 1 ehtemalan meydoon saate sari hast)
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("zare_nk_050404-Api_SelectGoroohJson data1: " + JSON.stringify(data));
            if (data.status == 0) {
                if (data.data.list == undefined) {
                    return;
                }

                var parsedList = JSON.parse(data.data.list);
                SetResponsedListFromApiSelectShobehAtrafUser(() => {
                    return parsedList
                });
            } else {
                setErrorInSwiperShopsInSearchComp("متاسفانه خطایی رخ داده است34:" + data.errors);
                console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
            }
        } else {
            console.log("zare_nk_050110-!response.ok" + response.ok);
            setErrorInSwiperShopsInSearchComp("متاسفانه خطایی رخ داده است35");
        }
    }

    useEffect(() => {
        getSwiperShopsInSearchComp();
    }, []);

    return (
        <>
            <div style={{
                display: 'flex', flexFlow: 'column', width: '100%', height: 'min-content',
            }} dir="rtl">

                <div style={{
                    padding: '1rem', paddingBottom: '0px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',

                }}>
                    <h2 style={{ color: '#1b1c1d', lineHeight: '2rem', fontSize: '1rem', margin: '0px', }}>
                        فروشگاه&zwnj;ها
                    </h2>
                    <button id="goShoppingBacketBtn"
                        // onClick={showAddressListDrawer}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#f2f5f7',
                            border: 'none',
                            fontSize: '.875rem',
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '9999px',
                            cursor: 'pointer',
                        }}>
                        <img src="/images/Icon/see-all.svg" alt="نمایش همه"
                            style={{ width: '1.25rem', height: '1.25rem', }} />
                    </button>
                </div>

                <div style={{
                    display: 'flex', flexFlow: 'column', width: '100%', paddingTop: '.75rem', paddingBottom: '1rem',
                }}>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={12}  ////zare_nk_050305_nokteh(moadele 0.75rem(chon spaceBetween adad 0.75rem))  
                        slidesPerView="auto"  ////zare_nk_050226_nokteh(meghdaresh ro auto dadim ta bar asase arze SwiperSlide ha tedadesh automat tavasoote 
                        //// barnameh moshakhas she(pishfarz slidesPerView={1} hast))
                        // centeredSlides={true}
                        navigation={false}
                        ////zare_nk_050511_added_st(basteh be tarrahimoon yejooraei mokammele spaceBetween baraye avalin va akharin slai hast)
                        slidesOffsetBefore={12}
                        slidesOffsetAfter={12}
                        ////zare_nk_050511_added_end(basteh be tarrahimoon yejooraei mokammele spaceBetween baraye avalin va akharin slai hast)

                        className="SwiperBordBord"
                        style={{
                            width: '100%',
                            //  margin: '0px 19px',
                            //  height: '86px',
                            // height: '95px',
                            // overflow: 'visible', ////zare_nk_050226_nokteh(baraye inke darsade takhfifha ke biroon mizanan dideh beshan)   ////zare_nk_050317_commented(baraye swiper overflow: 'visible' 
                            //// manteghi nist, chon arze colle slideha ro migire, na arze masalan 100% pedaresh ro)ب
                        }}>
                        {responsedListFromApiSelectShobehAtrafUser?.map((item, index) => {
                            return (
                                <SwiperSlide key={index}
                                    style={{
                                        //  width: '72px',
                                        //  height: '80px',
                                        // height: '89px',
                                        // width: 'auto',  
                                        // width: '396px',  ////zare_nk_050511_commented
                                        width: 'fit-content',  ////zare_nk_050511_added
                                    }}>
                                    <div className="contInSlide" style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', //// width: '100%', height: '100%',
                                        backgroundColor: 'inherit', borderRadius: '.75rem', border: '1px solid #f6f6f7',
                                    }}>
                                        <button
                                            // // id="openCollapseForSortingBtn"   
                                            // // onClick={openCollapseForSorting}  
                                            // onClick={() => { scrollToSection('111') }}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textDecoration: 'none',
                                                fontSize: '.875rem',
                                                borderRadius: '.75rem',
                                                cursor: 'pointer',

                                                width: '17rem',
                                                padding: '5px',
                                                rowGap: '.75rem',
                                                backgroundColor: 'white',
                                                border: '1px solid #fff7ec',
                                            }}>
                                            <div style={{
                                                display: 'flex', flexFlow: 'row', position: 'relative', width: '100%', height: '100%',
                                                justifyContent: 'center', alignItems: 'center', //gap: '0.5rem',
                                                // rowGap: '0.25rem',   ////zare_nk_050304_commented(rowGap nazasht tapsifood)
                                            }}>
                                                <div style={{
                                                    display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, width: '3rem', height: '3rem',
                                                    borderRadius: '9999px', marginLeft: '.5rem', position: 'relative',
                                                }}>
                                                    <img
                                                        src="/images/movaghat/vendorPage/restaurant-tag.jpg"
                                                        alt="resatourant"
                                                        style={{ width: '100%', height: '100%', borderRadius: '9999px', objectFit: 'cover', }}
                                                    />
                                                </div>

                                                <div style={{
                                                    display: 'flex',
                                                    // padding: '.5rem',  ////zare_nk_050511_commented
                                                    // gap: '.5rem',  ////zare_nk_050511_commented
                                                    flexDirection: 'column',
                                                    flex: '1 1 0%',
                                                }}>
                                                    <div style={{
                                                        display: 'flex', flexFlow: 'row', width: '100%',
                                                    }}>
                                                        <div style={{
                                                            display: 'flex', flexFlow: 'row', width: '100%', justifyContent: 'space-between',
                                                        }}>
                                                            <div style={{
                                                                fontSize: '0.875rem',
                                                                color: '#1b1c1d',

                                                                // این بخش برای سه‌نقطه و محدودیت ۲ خط
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 1,
                                                                WebkitBoxOrient: 'vertical',
                                                                overflow: 'hidden',

                                                                // این بخش برای تثبیت ارتفاع روی ۴۰ پیکسل 
                                                                lineHeight: '2rem',
                                                                // height: '2.5rem',
                                                                height: '2rem',

                                                                minHeight: '2rem',  // minHeight: '2.5rem', // اجبار به کمتر نشدن
                                                                maxHeight: '2rem',  // maxHeight: '2.5rem', // اجبار به بیشتر نشدن
                                                                boxSizing: 'border-box', // برای اینکه بُردر (border) به ارتفاع اضافه نشود

                                                                textAlign: 'center',
                                                            }}>
                                                               {item.NameSobe}
                                                            </div>

                                                            <div style={{
                                                                display: 'flex', flexFlow: 'row', alignItems: 'center',
                                                            }}>
                                                                <p style={{
                                                                    color: '#1b1c1d', fontSize: '.75rem', margin: '0px',
                                                                }}>
                                                                    3.1
                                                                </p>
                                                                <img src="/images/movaghat/SwiperTapBests/star/orange-star.svg" alt="علاقه مندی"
                                                                    style={{ width: '.75rem', height: '.75rem', }} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div style={{
                                                        display: 'flex', flexFlow: 'row', width: '100%', marginBottom: '2px',
                                                    }}>
                                                        <div style={{
                                                            display: 'flex', flexFlow: 'row', width: '100%', justifyContent: 'space-between',

                                                        }}>
                                                            <div style={{
                                                                display: 'flex', flexFlow: 'row', gap: '2px', alignItems: 'center',
                                                            }}>
                                                                <span style={{
                                                                    color: '#878b92',
                                                                    fontSize: '.75rem',
                                                                    lineHeight: '1rem',
                                                                }}>
                                                                    {/* پیک تپسی&zwnj;فود: */}
                                                                    پیک:
                                                                </span>

                                                                <div style={{
                                                                    // flex: "1 0 auto", 
                                                                    flexGrow: 1,
                                                                    flexShrink: 0,
                                                                    flexBasis: 'auto',
                                                                    display: "flex",
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'flex-end',
                                                                    lineHeight: '1rem',
                                                                }}>
                                                                     {item.Keraye != 0 ?
                                                                    <>
                                                                        <span style={{
                                                                            fontSize: '0.75rem', marginLeft: 2, fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#878b92',
                                                                        }}>
                                                                            {item.Keraye.toLocaleString()}
                                                                        </span>
                                                                        <span style={{
                                                                            fontSize: '0.625rem', fontFamily: "IRANSansWeb(FaNum)_Medium", color: '#878b92',
                                                                        }}>
                                                                            تومان
                                                                        </span>
                                                                    </> :
                                                                    <>
                                                                        <span style={{
                                                                            color: '#059666', fontSize: '.875rem', lineHeight: '1.25rem',
                                                                        }}>رایگان</span>
                                                                    </>
                                                                }
                                                                </div>

                                                            </div>

                                                            <span style={{
                                                                color: '#878b92',
                                                                fontSize: '.75rem',
                                                                lineHeight: '1rem',
                                                            }}>
                                                               {item.NazdikTarinZamanErsal}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </SwiperSlide>
                            )
                        })}

                    </Swiper>
                </div>

            </div>
        </>
    );
}

export default memo(SwiperGetStoresInSearchResault); 