// ////zare_nk_050413_okk(1)
'use client'
import { useParams } from 'next/navigation';

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, memo, RefObject, ReactNode, ChangeEvent, MouseEvent } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";

import globalsStyles from "@/styles/components/globals.module.css";

import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import SwiperInVendorScrollTabComp from '../../../components/SwiperInVendorScrollTabComp';
import GetScrollsSecInVendor from '../../../components/GetScrollsSecInVendor';
import SwiperBordBordInVendorComp from '../../../components/SwiperBordBordInVendorComp';

import { NextJsApiUrl } from "../../../constants/Urls";  ////zare_nk_050407_added

function getCookie(name: any) {
    ////zare_nk_050209_added_st
    if (typeof document === 'undefined') {
        console.log("document === 'undefined'");
        return null; // برای جلوگیری از خطای عدم وجود document
    }
    console.log("document !== 'undefined'");
    ////zare_nk_050209_added_end
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

////zare_nk_050405_nokteh_st(rahe1- baraye serverComponent)
// type Props2 = {
//     params: Promise<{
//         vendorId: string;
//     }>;
// };
// export default async function VendorPage({ params }: Props2) { 
// // const { vendorId } = await params;
////zare_nk_050405_nokteh_end(rahe1- baraye serverComponent)
////zare_nk_050405_nokteh_st(rahe2- baraye serverComponent)
export default function VendorPage() {
    const { vendorId } = useParams();
    ////zare_nk_050405_nokteh_end(rahe2- baraye serverComponent)
    console.log('050329-VendorPage rendered!!-vendorId: '+vendorId);   ////zare_nk_050329_added
    // ////zare_nk_050404_added_st

    const [errorInVendorPage, setErrorInVendorPage] = useState<string | null>(null);

    const router = useRouter();

    type responsedListFromApiSelectKalaShobehType = {
        IdKala: number;
        BarcodeKala: number;
        IdBerand: number;
        IdTaminkonnande: number;
        IdShobe: number;
        NameSobe: string;
        // .
        // .
        // .
        [key: string]: any;
    };

    const [responsedListFromApiSelectKalaShobeh, SetResponsedListFromApiSelectKalaShobeh] = useState<responsedListFromApiSelectKalaShobehType[] | null>(null);

    // console.log('050404-responsedListFromApiSelectKalaShobeh: ' + responsedListFromApiSelectKalaShobeh?[0].IdKala);   ////zare_nk_050329_added

    type responsedListFromApiSelectShobehAtrafUserType = {
        IdShobe: number;
        NameSobe: string;
        KafKharid: number;
        Fasele: number;
        ZarfiatErsal: number;
        Keraye: number;
        NazdikTarinZamanErsal: string;
    };
    const [currentShobeState, setCurrentShobeState] = useState<responsedListFromApiSelectShobehAtrafUserType | null>(null);

    const getVendorPage = async () => {
        let token = await getCookie("token");
        if (!token) {
            setErrorInVendorPage("lotfan avval online shid");
            return;
        }
        // console.log('tokentokentoken: ' + token);

        // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented
        let ApiUrl = NextJsApiUrl; ////zare_nk_050407_added
        const response = await fetch(ApiUrl + "Api_SelectKalaShobeh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
                // "IdShobeh": 6,
                IdShobeh: vendorId,
                // page: 1,
                // take: 3,
            }),
        });
        const data = await response.json();
        console.log('datadatadata: ' + JSON.stringify(data));
        if (response.ok) {
            if (data.status == 0) {
                if (data.data.list == undefined) {
                    return;
                }
                var parsedList = JSON.parse(data.data.list);

                SetResponsedListFromApiSelectKalaShobeh(() => {
                    return parsedList
                });
            } else {
                setErrorInVendorPage("متاسفانه خطایی رخ داده است34:" + data.errors);
                console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
            }
        } else {
            console.log("zare_nk_050110-!response.ok" + response.ok);
            setErrorInVendorPage("متاسفانه خطایی رخ داده است35");
        }
    }

    useEffect(() => {
        const tempAsync = async () => {
            const currentShobe = await getCookie("currentShobe");
            var parsedurrentShobe: responsedListFromApiSelectShobehAtrafUserType | null = currentShobe ? JSON.parse(currentShobe) : null;
            setCurrentShobeState(parsedurrentShobe);
        }
        tempAsync();

        getVendorPage();  ////zare_nk_050403_commented_movaghat
    }, []);
    // ////zare_nk_050404_added_end 

    ////zare_nk_050405_added_st
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const [activeTab, setActiveTab] = useState<string | null>(null);

    const scrollToSection = useCallback(
        (id: string) => {
            console.log('050405-scrollToSection called!!-id: ' + id);
            console.log('050405-scrollToSection called!!-sectionRefs.current[id] : ' + sectionRefs.current[id]);
            const section = sectionRefs.current[id];
            if (!section) return;

            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
        , [activeTab]);

    useEffect(() => {
        const HEADER_HEIGHT = 40;
        const handleScroll = () => {
            let currentSection = "";
            Object.values(sectionRefs.current).forEach((section) => {
                if (!section) return;

                const rect = section.getBoundingClientRect();  ////zare_nk_050405_nokteh(mogheiyate section ra nesbat be viewport dar har scroll midahad)

                console.log('050405-rect: ' + JSON.stringify(rect));
                ////050405-rect: {"x":612,"y":336,"width":446,"height":300,"top":336,"right":1058,"bottom":636,"left":612}

                if (rect.top <= HEADER_HEIGHT + 5) {  ////zare_nk_050405_nokteh(5 pixel ra baraye teloranse gozashtim)
                    console.log('050405-rect if bargharare-section.id: ' + section.id);
                    currentSection = section.id;
                }
            });

            if (currentSection !== "" && currentSection !== activeTab) {
                setActiveTab(currentSection);
            }
        };

        window.addEventListener("scroll", handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [activeTab]);
    ////zare_nk_050405_added_end

    return (
        <div style={{
            // backgroundColor: 'white', 
            width: '100%',
            // height: '100%',  ////height :100% dorost nist, chon shayad dar layout alaveh ba children satrhaye dife ham dashe bashim(mesle footer va header va...)
            display: "flex",
            flexDirection: 'column',
            // border: '3px solid orange',
            position: 'relative',  ////zare_nk_050404_added
        }}>
            <header style={{
                position: 'sticky',
                top: '0px',
                // boxShadow: '0px 3px 2px -1px #d7d6d6',
                display: 'flex',
                flexFlow: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '5px',
                paddingBottom: '5px',
                zIndex: 899,
                // backgroundColor: 'white',
                // border: '1px dashed red',
            }}>
                <div
                    style={{
                        display: 'flex',
                        flexFlow: 'row-reverse',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingRight: '1rem',
                        paddingLeft: '1rem',
                        // border: '1px dashed blue',
                        width: '100%',
                        height: '3.5rem',
                    }}>
                    <button
                        id="goBackBtn"
                        onClick={() => router.back()}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // backgroundColor: '#f2f5f7',
                            backgroundColor: 'white',
                            border: 'none',
                            // border: '1px dashed black',
                            fontSize: '.875rem',
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '9999px',
                            cursor: 'pointer',
                        }}>
                        <img
                            src="/images/Icon/back-icon.svg"
                            alt="بازگشت"
                            style={{ width: '1.5rem', height: '1.5rem', }}
                        />
                    </button>

                    {/* <div style={{
                        display: 'flex',
                        flexFlow: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // border: '1px dashed orange',
                    }}>
                        فروشگاه‌های اطراف
                    </div>                    
                    <button
                        id="goShoppingBacketBtn"
                        // onClick={showAddressListDrawer}
                        //   onClick={() => { setError('goooo!!') }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'inherit',
                            border: 'none',
                            // border: '2px dashed green',
                            fontSize: '.875rem',
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '9999px',
                            cursor: 'pointer',
                        }}>
                        <img
                            src="/images/header/shoppingBacket.svg"
                            alt="سبد خرید"
                        />
                    </button> */}
                </div>

                {/* <div
                    style={{
                        display: 'flex',
                        flexFlow: 'row-reverse',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingRight: '0.375rem',
                        paddingLeft: '0.375rem',
                        // border: '1px dashed yellow',
                        width: '100%',
                        cursor: 'grab',
                    }}>
                    <SwiperInVendorHeaderComp
                        openCollapseForSorting={openCollapseForSorting}
                        openCollapseForRaveshErsal={openCollapseForRaveshErsal}
                    />
                </div> */}
            </header >

            <main
                style={{
                    backgroundColor: 'white',
                    // height: '100dvh',   ////zare_nk_050317_commented(A001-ba A002 tadakhol dareh)
                    width: '100%',
                    display: "flex",
                    flexDirection: 'column',
                    // overflow: 'hidden',        ////zare_nk_050317_commented(A002-ba A001 tadakhol dareh)
                    // justifyContent: 'center',  ////zare_nk_050229_nokteh(be lahaze amoodi vasat chin mikoneh mohtavaye safheh ro ke ma inro nemikhaim)
                    alignItems: 'center',
                    flex: '1 0 auto',
                    // border: '3px dashed orange',
                    direction: 'rtl',
                    position: 'absolute',  ////zare_nk_050404_added   
                    top: '0px ',  ////zare_nk_050404_added      
                }}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'row',
                    // border: '2px solid red',
                    position: 'relative',
                }}>
                    {responsedListFromApiSelectKalaShobeh && (
                        <img
                            style={{
                                width: '100%',
                                height: '230px',
                                objectFit: 'cover',
                            }}
                            // src={`https://img.tochikala.com/Product/${responsedListFromApiSelectKalaShobeh[0].IdKala}.webp`} />
                            src={`/images/movaghat/vendorPage/1.jpg`} />
                    )}
                    <div style={{
                        position: 'absolute', bottom: '-15px', right: '.8rem',
                        width: '4rem', height: '4rem',
                    }}>
                        <img style={{
                            width: '100%', height: '100%',
                            objectFit: 'cover',
                            borderRadius: '.5rem',
                            // border: '1px solid #efefef',
                        }} src={`/images/movaghat/vendorPage/tupchi-tag.jpg`} />
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    flexFlow: 'column',
                    // border: '1px dashed red',
                    width: '100%',
                    paddingTop: '1rem',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    backgroundColor: 'white',
                    borderTopLeftRadius: '.75rem',
                    borderTopRightRadius: '.75rem',
                    gap: '.5rem',
                }}>
                    <div style={{
                        display: 'flex', flexFlow: 'row', justifyContent: 'start', alignItems: 'center',
                        // border: '1px dashed red', 
                        width: '100%', marginTop: '.5rem',
                    }}>
                        <h2 style={{
                            fontSize: '1.25rem', fontFamily: "'IRANSansWeb_Bold(adad_fa)'",
                            margin: '0rem',
                        }}>
                            {/* فست&zwnj;فود توپچی */}
                            {responsedListFromApiSelectKalaShobeh &&
                                responsedListFromApiSelectKalaShobeh[0].NameSobe
                            }
                        </h2>
                    </div>

                    <div style={{
                        display: 'flex', flexFlow: 'row', width: '100%', justifyContent: 'space-between', marginTop: '.5rem',
                    }}>
                        <div style={{
                            display: 'flex', flexFlow: 'row', gap: '0.25rem', alignItems: 'center',
                        }}>
                            <img
                                src="/images/movaghat/SwiperTapBests/star/orange-star.svg"
                                alt="علاقه مندی"
                                style={{ width: '1rem', height: '1rem', }}
                            />
                            <p style={{
                                color: '#000000',
                                fontSize: '1rem',
                                margin: '0px',

                            }}>4.5</p>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexFlow: 'row',
                            alignItems: 'center',
                            direction: 'rtl',
                            color: '#313335',
                            minWidth: '124px',
                            maxWidth: '256px',
                            gap: '0.25rem',
                        }}>
                            <span style={{
                                textAlign: "right",
                                color: '#ff5900',
                                fontSize: '.875rem',
                                lineHeight: '1.25rem',
                            }}>
                                اطلاعات و نظرات
                            </span>
                            <img
                                src="/images/movaghat/vendorPage/inf-anf-comments.svg"
                                alt=" ادرس ها" />
                        </div>
                    </div>

                    <div style={{
                        display: 'flex', flexFlow: 'row', width: '100%', justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: '1rem',
                        paddingTop: '1rem',
                        padding: '.5rem',
                        backgroundColor: '#f2f5f7',
                        borderRadius: '.5rem',
                        gap: '.75rem',
                        minHeight: '70px',
                        marginTop: '.5rem',
                        // border: '2px dashed red',
                    }}>
                        <div style={{
                            borderLeft: '1px solid #e0e3e5',
                            display: 'flex',
                            flexFlow: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '.25rem',
                            height: '100%',
                            width: '100%',
                        }}>
                            <span style={{
                                color: '#313335', fontSize: '.75rem',
                                lineHeight: '1rem',
                            }}>پیک توچی فود</span>
                            <div style={{
                                fontSize: '.875rem',
                                lineHeight: '1.25rem',
                                display: 'flex',
                                flexFlow: 'row',
                                alignItems: 'center',
                                gap: '.25rem',
                            }}>
                                {currentShobeState?.Keraye != 0 ?
                                    <>
                                        <span style={{
                                            color: '#000000', fontSize: '.875rem',
                                            lineHeight: '1.25rem',
                                        }}>32.800</span>

                                        <span style={{
                                            color: '#63676e', fontSize: '.875rem',
                                            lineHeight: '1.25rem',
                                        }}>تومان</span>
                                    </> : <>
                                        <span style={{
                                            color: '#63676e', fontSize: '.875rem',
                                            lineHeight: '1.25rem',
                                        }}>رایگان</span>
                                    </>
                                }
                            </div>
                        </div>

                        <div style={{
                            borderLeft: '1px solid #e0e3e5',
                            display: 'flex',
                            flexFlow: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '.25rem',
                            height: '100%',
                            width: '100%',
                        }}>
                            <span style={{
                                color: '#313335', fontSize: '.75rem',
                                lineHeight: '1rem',
                            }}>زمان تحویل</span>
                            <div style={{
                                fontSize: '.875rem',
                                lineHeight: '1.25rem',
                                display: 'flex',
                                flexFlow: 'row',
                                alignItems: 'center',
                                gap: '.25rem',
                            }}>
                                {currentShobeState?.NazdikTarinZamanErsal &&
                                    <>
                                        <span style={{
                                            color: '#63676e', fontSize: '.875rem',
                                            lineHeight: '1.25rem',
                                        }}>
                                            {currentShobeState.NazdikTarinZamanErsal}
                                        </span>
                                    </>
                                }
                                {/* <span style={{
                                    color: '#313335', fontSize: '.875rem',
                                    lineHeight: '1.25rem',
                                }}>تا</span>

                                <span style={{
                                    color: '#000000', fontSize: '1rem',
                                    lineHeight: '1.5rem',
                                }}>50</span>

                                <span style={{
                                    color: '#313335', fontSize: '.875rem',
                                    lineHeight: '1.25rem',
                                }}>دقیقه</span> */}
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            flexFlow: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '.25rem',
                            height: '100%',
                            width: '100%',
                        }}>
                            <span style={{
                                color: '#313335', fontSize: '.75rem',
                                lineHeight: '1rem',
                            }}>حداقل مبلغ خرید</span>
                            <div style={{
                                fontSize: '.875rem',
                                lineHeight: '1.25rem',
                                display: 'flex',
                                flexFlow: 'row',
                                alignItems: 'center',
                                gap: '.25rem',
                            }}>
                                {currentShobeState?.KafKharid &&
                                    <>
                                        <span style={{
                                            color: '#000000', fontSize: '.875rem',
                                            lineHeight: '1.25rem',
                                        }}>
                                            {currentShobeState.KafKharid}
                                        </span>

                                        <span style={{
                                            color: '#63676e', fontSize: '.875rem',
                                            lineHeight: '1.25rem',
                                        }}>تومان</span>
                                    </>
                                }
                                {/* <span style={{
                                    color: '#000000', fontSize: '.875rem',
                                    lineHeight: '1.25rem',
                                }}>300000</span>

                                <span style={{
                                    color: '#63676e', fontSize: '.875rem',
                                    lineHeight: '1.25rem',
                                }}>تومان</span> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    paddingTop: '.5rem', marginTop: '.5rem', backgroundColor: '#fff7ec', display: 'flex', flexFlow: 'column', width: '100%', height: 'min-content',
                    paddingBottom: '10px',
                }}>
                    <div style={{
                        padding: '.125rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '.5rem',
                        }}>
                            <img src='/images/movaghat/vendorPage/bord-bord-icon.svg'
                                style={{ width: '20px', height: '20px' }} />

                            <h2 style={{ fontSize: '.875rem', lineHeight: '1.25rem', margin: 0, }}>فرصت برد برد</h2>
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#ff5a00',
                            fontSize: '.875rem',
                            lineHeight: '1.25rem',
                            gap: '1px',
                            cursor: 'pointer',
                        }}>
                            <span>مشاهده همه</span>
                            <img src='/images/movaghat/vendorPage/show-all-bord-bord.svg'
                                style={{ width: '24px', height: '24px' }} />
                        </div>
                    </div>
                    <SwiperBordBordInVendorComp
                    // // openCollapseForSorting={openCollapseForSorting}
                    // // openCollapseForRaveshErsal={openCollapseForRaveshErsal}
                    // scrollToSection={scrollToSection}
                    // activeTab={activeTab}
                    />
                </div>

                <div style={{
                    display: 'flex',
                    flexFlow: 'column', width: '100%', height: 'min-content', paddingTop: '.5rem', marginTop: '.5rem', //backgroundColor: '#fff7ec',
                }}>
                    <div
                        style={{
                            display: 'flex',
                            flexFlow: 'row-reverse',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingRight: '0.375rem',
                            paddingLeft: '0.375rem',
                            // border: '1px dashed black',
                            width: '100%',
                            cursor: 'grab',

                            position: 'sticky',
                            top: '0px',
                            backgroundColor: 'white',

                            height: '60px',   ////zare_nk_050407_added
                            zIndex: 2,
                        }}>
                        <SwiperInVendorScrollTabComp
                            // openCollapseForSorting={openCollapseForSorting}
                            // openCollapseForRaveshErsal={openCollapseForRaveshErsal}
                            scrollToSection={scrollToSection}
                            activeTab={activeTab}
                            IdShobe={currentShobeState?.IdShobe}
                        />
                    </div>

                    <div style={{
                        width: '100%',
                        display: "flex",
                        flexDirection: 'column',
                        // border: '1px dashed blue',
                        // marginTop: '100px',
                    }}>
                        <GetScrollsSecInVendor
                            sectionRefs={sectionRefs}
                        />

                        {/* <div
                            id="111"
                            style={{
                                width: '100%',
                                display: "flex",
                                flexDirection: 'column',
                                border: '1px dashed black',
                                height: '300px',
                                marginTop: '200px',
                                scrollMarginTop: "40px",
                            }} 
                            ref={(el) => {
                                sectionRefs.current["111"] = el;
                            }}
                        >
                            <h2>1111</h2>
                        </div>

                        <div
                            id="222"
                            style={{
                                width: '100%',
                                display: "flex",
                                flexDirection: 'column',
                                border: '1px dashed black',
                                height: '300px',
                                scrollMarginTop: "40px",
                            }} 
                            ref={(el) => {
                                sectionRefs.current["222"] = el;
                            }}
                        >
                            <h2>2222</h2>
                        </div>

                        <div
                            id="333"
                            style={{
                                width: '100%',
                                display: "flex",
                                flexDirection: 'column',
                                border: '1px dashed black',
                                height: '300px',
                                scrollMarginTop: "40px",
                            }} 
                            ref={(el) => {
                                sectionRefs.current["333"] = el;
                            }}
                        >
                            <h2>3333</h2>
                        </div>

                        <div
                            id="444"
                            style={{
                                width: '100%',
                                display: "flex",
                                flexDirection: 'column',
                                border: '1px dashed black',
                                height: '300px',
                                scrollMarginTop: "40px",
                            }} 
                            ref={(el) => {
                                sectionRefs.current["444"] = el;
                            }}
                        >
                            <h2>4444</h2>
                        </div> */}

                    </div>
                </div>

            </main>

            <footer></footer>

            <div className="tabIndexOne-in-LayoutWrapper" tabIndex={1}>
            </div>
        </div>
    );
}