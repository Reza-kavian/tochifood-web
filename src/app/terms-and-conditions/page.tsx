////zare_nk_050428_okk(2)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, RefObject, ReactNode, ChangeEvent, MouseEvent, createContext, useContext } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import Styles from "@/styles/components/profile-edit.module.css";
import globalsStyles from "@/styles/components/globals.module.css";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { Collapse, Button, Box, Paper, Typography, Grow, ClickAwayListener, Drawer } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import { useAuthentication } from '../../context/AuthenticationContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from "next/link";

import SwiperGrouplevel1Comp from '../../components/SwiperGrouplevel1Comp';

import SwiperTapBestsComp from '../../components/SwiperTapBestsComp';  ////zare_nk_050305_added

import SwiperTopBanerComp from '../../components/SwiperTopBanerComp';

import SwiperThinkBanerComp from '../../components/SwiperthinkBanerComp';

import SwiperTapTimeComp from '../../components/SwiperTapTimeComp';

import SwiperSecondBanerComp from '../../components/SwiperSecondBanerComp';  //zare_nk_050305_added

import AdressListComponent from '../../components/AdressListComponent';  //zare_nk_050328_added 

import { currentAddressContext } from '../../context/currentAddressContext';  //zare_nk_050329_added 
import { json } from "node:stream/consumers";
import { relative } from "node:path";

import { NextJsApiUrl } from "../../constants/Urls";

function getCookie(name: any) {
  ////zare_nk_050209_added_st
  if (typeof document === 'undefined') {
    // console.log("document === 'undefined'");
    return null; // برای جلوگیری از خطای عدم وجود document
  }
  // console.log("document !== 'undefined'");
  ////zare_nk_050209_added_end
  const value = `; ${document.cookie}`; // برای اطمینان از یافتن کوکی‌ها
  // console.log("value is: " + value);
  const parts = value.split(`; ${name}=`); // تفکیک کوکی‌ها
  if (parts.length === 2) {
    // console.log("dohe-parts.length: " + parts.length);
    const raw = parts.pop();
    if (!raw) throw new Error("No parts found");
    const value = raw.split(";").shift();
    if (!value) throw new Error("Invalid cookie format");
    return decodeURIComponent(value);
  }
  // console.log("do nist-parts.length: " + parts.length);
  return null; //اگر کوکی پیدا نشد
}

export default function Profile() {
  const router = useRouter();

  return (
    <>

      <div style={{
        // backgroundColor: 'white', 
        width: '100%',
        // height: '100%',  ////height :100% dorost nist, chon shayad dar layout alaveh ba children satrhaye dife ham dashe bashim(mesle footer va header va...)
        display: "flex",
        flexDirection: 'column',
        // border: '3px solid orange',
        flex: '1 1 auto',  ////zare_nk_050514_added
      }}>
        <header style={{
          position: 'sticky',
          backgroundColor: 'white',
          flexShrink: '0px',
          width: '100%',
          top: '0px',
          // boxShadow: '0px 3px 2px -1px #d7d6d6',  ////zare_nk_050520_commented
          boxShadow: '0px 4px 20px 0px #0000000f',   ////zare_nk_050520_added
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 30,
        }}>
          <div style={{
            display: 'flex',
            flexFlow: 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: '1rem',
            paddingLeft: '1rem',
            // border: '1px dashed blue',
            width: '100%',
            height: '3.5rem',
            position: 'relative',
          }}>
            <button id="goBackBtn" onClick={() => router.back()}
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
                position: 'absolute',
              }}>
              <img
                src="/images/Icon/back-icon.svg"
                alt="بازگشت"
                style={{ width: '1.5rem', height: '1.5rem', }}
              />
            </button>

            <div style={{
              display: 'flex',
              flexFlow: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              // border: '1px dashed orange',
              flex: '1 1 auto',
            }}>
              قوانین ما
            </div>
          </div>
        </header >

        <main style={{
          backgroundColor: 'white',
          // height: '100dvh',   ////zare_nk_050317_commented(A001-ba A002 tadakhol dareh)
          width: '100%',
          display: "flex",
          flexDirection: 'column',
          // overflow: 'hidden',        ////zare_nk_050317_commented(A002-ba A001 tadakhol dareh)
          // justifyContent: 'center',  ////zare_nk_050229_nokteh(be lahaze amoodi vasat chin mikoneh mohtavaye safheh ro ke ma inro nemikhaim)
          alignItems: 'center',
          flex: '1 0 auto',
          // border: '3px solid orange',
          direction: 'rtl',
          paddingTop: '56px',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}>
          <div style={{ width: '100%', display: "flex", flexDirection: 'column', }}>
            <div style={{ width: '100%', display: "flex", flexDirection: 'column', paddingBottom: '2rem', }}>
              <div style={{ width: '100%', display: "flex", flexDirection: 'column', }}>
                <h2 style={{ color: '#313335', fontSize: '1.25rem', lineHeight: '1.75rem', margin: '0px' }}>
                  شرایط اختصاصی استفاده از خدمات توچی در حوزه سفارش غذا برای مشتری
                </h2>

                <p style={{ color: '#63676e', fontSize: '1rem', lineHeight: '1.75rem', margin: '0px', marginTop: '1rem', }}>
                  این شرایط به‌عنوان ضوابط اختصاصی حاکم بر استفاده از خدمات توچی در حوزه سفارش غذا برای مشتری (از این پس «شرایط استفاده اختصاصی مشتری») در کنار «شرایط عمومی استفاده از سوپراپلیکیشن توچی»، مجموعا شرایط استفاده از توچی‌فود را تشکیل داده و از این رو مشتری با اطلاع و آگاهی از این شرایط نسبت به درخواست سفارش غذا اقدام می‌کند.
                </p>

              </div>

              <div style={{ width: '100%', display: "flex", flexDirection: 'column', marginTop: '1.5rem', }}>
                <h2 style={{ color: '#313335', fontSize: '1.25rem', lineHeight: '1.75rem', margin: '0px' }}>
                  تعاریف
                </h2>

                <p style={{ color: '#63676e', fontSize: '1rem', lineHeight: '1.75rem', margin: '0px', marginTop: '1rem', }}>
                  واژگان و اصطلاحاتی که در شرایط استفاده حاضر مورد استفاده قرار گرفته‌اند، دارای معانی به شرح ذیل هستند:
                </p>

                <div style={{ width: '100%', display: "flex", flexDirection: 'column', marginTop: '1rem', }}>
                  <p style={{ color: '#63676e', fontSize: '1rem', lineHeight: '1.75rem', margin: '0px', }}>
                    <strong style={{ marginLeft: '5px', }}>الف) شرکت:</strong>
                    با توجه به اینکه خدمات هوشمند سفارش غذا از رستوران توسط شرکت توسعه تجارت الکترونیک کوروش (سهامی خاص) ارائه شده، مراد از شرکت در شرایط اختصاصی حاضر، این شرکت است.
                  </p>

                  <p style={{ color: '#63676e', fontSize: '1rem', lineHeight: '1.75rem', margin: '0px', marginTop: '1rem', }}>
                    <strong style={{ marginLeft: '5px', }}>ب) توچی‌فود:</strong>
                    منظور، خدمات هوشمند ارائه‌شده توسط شرکت در حوزه سفارش محصولات غذایی از فروشگاه‌ها از مرحله ثبت درخواست خرید، ایجاد ارتباط بین عرضه‌کننده مواد غذایی و مشتری، قبول درخواست توسط فروشگاه مربوطه، پشتیبانی تلفنی در طول انجام سفارش، ثبت امتیاز طرفین در پایان خرید و پیگیری شکایات است که در سوپراپ ذیل عنوان سفارش غذا ارائه می‌شود.
                  </p>

                  <p style={{ color: '#63676e', fontSize: '1rem', lineHeight: '1.75rem', margin: '0px', marginTop: '1rem', }}>
                    <strong style={{ marginLeft: '5px', }}>ج) کاربر فروشگاه / فروشگاه:</strong>
                    فروشنده محصولات غذایی شامل رستوران‌داران، کافه‌داران، قنادی‌ها، کافه‌قنادی‌ها، نانوایی‌ها، میوه و آبمیوه‌فروشان، ارائه‌دهندگان محصولات پروتئینی که با ایجاد حساب کاربری و رعایت شرایط اختصاصی فروشگاه، نسبت به فروش محصولات خود و حسب مورد ارسال آن به مقصد تعیین‌شده توسط مشتری اقدام می‌کنند.
                  </p>

                  <p style={{ color: '#63676e', fontSize: '1rem', lineHeight: '1.75rem', margin: '0px', marginTop: '1rem', }}>
                    <strong style={{ marginLeft: '5px', }}>د) کاربرمشتری / مشتری:</strong>
                    متقاضی استفاده از سرویس توچی‌فود است که با ایجاد حساب کاربری در سوپراپ و رعایت شرایط اختصاصی مشتری، نسبت به ثبت درخواست خرید محصولات غذایی از یک یا چند فروشگاه و حسب مورد درخواست ارسال آن به مقصد تعیین‌شده اقدام می‌کند.
                  </p>

                </div>

              </div>

              {/* <div>
                ماده 1
              </div> */}

            </div>

            {/* <div style={{ width: '100%', display: "flex", flexDirection: 'column', borderBottomWidth: '1px', border: '2px dashed green' }}>
              تماس با ما
            </div> */}

          </div>


        </main>

        <footer style={{
          maxWidth: '450px', marginLeft: 'auto', marginRight: 'auto', zIndex: 50, bottom: 0, left: 0, right: 0, position: 'fixed',
        }}>
        </footer>

        <div className="tabIndexOne-in-LayoutWrapper" tabIndex={1}>
        </div>
      </div>
    </>
  );
}
