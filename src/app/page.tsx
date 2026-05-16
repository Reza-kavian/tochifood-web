////zare_nk_050225_okk
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import Styles from "@/styles/components/location.module.css";
import globalsStyles from "@/styles/components/globals.module.css";
import { RefObject } from "react";
import { ReactNode } from "react";
import { ChangeEvent } from "react";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { MouseEvent } from "react";

import { Collapse, Button, Box, Paper, Typography, Grow, ClickAwayListener, Drawer } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'; //zare_nk_050204_added(for use Dialog)

// import 'ol/ol.css';   //zare_nk_041025_commented(for used neshan)
import "@neshan-maps-platform/ol/ol.css"

////import Map from 'ol/Map.js';  //zare_nk_041025_commented(for used neshan) 
import Map from '@neshan-maps-platform/ol/Map.js';

////import View from 'ol/View.js'; //zare_nk_041025_commented(for used neshan)  
import View from '@neshan-maps-platform/ol/View.js';

// import { Circle as CircleStyle, Fill, Stroke, Style, Icon, Text } from 'ol/style';  //zare_nk_010509_commented(for used neshan) 
import { Circle as CircleStyle, Fill, Stroke, Style, Icon, Text } from '@neshan-maps-platform/ol/style';

// import OSM from 'ol/source/OSM.js';   //zare_nk_041025_commented(for used neshan) 
import OSM from '@neshan-maps-platform/ol/source/OSM.js';

// import XYZ from 'ol/source/XYZ.js';    //zare_nk_041025_commented(for used neshan)
import XYZ from '@neshan-maps-platform/ol/source/XYZ.js';

// import { transform, fromLonLat } from 'ol/proj';    //zare_nk_041025_commented(for used neshan) 
import { transform, fromLonLat } from '@neshan-maps-platform/ol/proj.js';

// import VectorSource from 'ol/source/Vector.js';   //zare_nk_041025_commented(for used neshan) 
import VectorSource from '@neshan-maps-platform/ol/source/Vector.js';

// import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';   //zare_nk_0501095_commented(for used neshan) 
import { Tile as TileLayer, Vector as VectorLayer } from '@neshan-maps-platform/ol/layer';

// import type { Geometry } from "ol/geom.js";  //zare_nk_0501095_commented(for used neshan)
import type { Geometry } from "@neshan-maps-platform/ol/geom.js";

// import Feature from 'ol/Feature';  //zare_nk_0501095_commented(for used neshan)
import Feature from '@neshan-maps-platform/ol/Feature';

// import Point from 'ol/geom/Point'; //zare_nk_0501095_commented(for used neshan)
import Point from '@neshan-maps-platform/ol/geom/Point';

// import { defaults } from 'ol/interaction/defaults';  //zare_nk_0501095_commented(for used neshan)
import { defaults } from "@neshan-maps-platform/ol/interaction/defaults.js";

// import DragPan from 'ol/interaction/DragPan.js';    //zare_nk_0501095_commented(for used neshan)
import DragPan from "@neshan-maps-platform/ol/interaction/DragPan.js";

// import { parse } from 'ol/xml';  //zare_nk_0501095_commented(for used neshan)
import { parse } from "@neshan-maps-platform/ol/xml.js";

// import MouseWheelZoom from 'ol/interaction/MouseWheelZoom.js';  //zare_nk_0501095_commented(for used neshan)
import MouseWheelZoom from "@neshan-maps-platform/ol/interaction/MouseWheelZoom.js";

import { Console } from "console";

// import Layer from '@neshan-maps-platform/ol/layer/Layer.js'; 

import { useAuthentication } from '../context/AuthenticationContext';  //zare_nk_050111_added

////zare_nk_050226_added_st
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from "next/link";
////zare_nk_050226_added_end

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

type AdressescomponentType = {
  responsedListFromApiSelectAddressList: responsedListFromApiSelectAddressListType[] | null;
  isEpmtyShowAddRemAddress: boolean;
  setIsEpmtyShowAddRemAddress: React.Dispatch<React.SetStateAction<boolean>>;
  showAddRemAddress: () => void;
  setIsEpmtyAdressList: React.Dispatch<React.SetStateAction<string | null>>;
  showAddressListDrawer: () => void;
};

// export const Adressescomponent = function Adressescomponent({    //zare_nk_050209_commented
const Adressescomponent = function Adressescomponent({    //zare_nk_050209_added
  responsedListFromApiSelectAddressList,
  isEpmtyShowAddRemAddress,
  setIsEpmtyShowAddRemAddress,
  showAddRemAddress,
  setIsEpmtyAdressList,
  showAddressListDrawer,
}: AdressescomponentType) {

  const router = useRouter();

  const refForShowAddRemAddressBox = useRef<HTMLDivElement | null>(null);

  const [responsedListFromApiRemoveAddress, SetResponsedListFromApiRemoveAddress] = useState<responsedListFromApiRemoveAddressType | null>(null);

  const [rowItem, setRowItem] = useState<responsedListFromApiSelectAddressListType | null>(null);

  const goToEdditAddressMap = (IdAdress: number) => {
    // router.push("/folder03?tab=comments2");
    // redirect("/login");
    // alert('IdAdress:::: ' + IdAdress);  
    router.push("/editaddress?IdAdress=" + IdAdress);
  };

  const RemoveAddress = async (IdAdress: number) => {
    const token = getCookie("token");
    console.log('zare_nk_050110-RemoveAddress-token hala is: ' + getCookie("token"));

    let ApiUrl = "https://api.tochikala.com/api/";
    const response = await fetch(ApiUrl + "User/Api_DeleteAddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        'IdAdress': IdAdress,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log("zare_nk_050208-Api_DeleteAddress-data: " + JSON.stringify(data));
      if (data.status == 0) {
        console.log("zare_nk_050208-Api_DeleteAddress-data.status is 0");
        setIsEpmtyAdressList('notNull2');
        showAddressListDrawer();
      } else {
        // // document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        // // document.cookie = `google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        // setError("متاسفانه خطایی رخ داده است34:" + data.errors);
        console.log("zare_nk_050208-Api_DeleteAddress-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
      }

    } else {
      console.log("zare_nk_050208-Api_DeleteAddress-!response.ok" + response.ok);
      // // document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      // // document.cookie = `google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      // setError("متاسفانه خطایی رخ داده است35");
    }
  };

  const chosenAddress = async (chosenAddressItem: responsedListFromApiSelectAddressListType) => {
    console.log('chosenAddressItem.IdAdress: ' + chosenAddressItem.IdAdress);
    // document.cookie = `chosenAddress=${JSON.stringify(chosenAddressItem)}; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;  ////zare_nk_050210_nokteh(expires=Thu, 01 Jan 1970 00:00:00 UTC baese monghazi shodane cookie dar hamin khatte tarif mishe! pas 
    //// majboorim ye tarikhe dastiy behesh badim,age mikhaim abadi basshe ye cookiye dastiye toolani behesh midim ke shabiye abadiye(age expires ra dasti nadim 
    // behesh pishfarz SessionCookie darnazar gerefteh mishe(yani moroorgar ro bebandim cookie hazf mishe) ) )
    // const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 5);
    const expiresString = expires.toUTCString();
    // document.cookie = `chosenAddress=${JSON.stringify(chosenAddressItem)}; path=/; expires=${expiresString};secure; samesite=None`;
    ////zare_nk_050210_nokteh(mamoolan JSON.stringify kefayat mikoneh, vali age matne cookie shamele characterhaye ; va ... bashe shayad barnameh eshtebahan anra 
    //// beonvane jodakonandeh dar reshteye document.cookie darnazar begire va kharabkari koneh, pas encodeURIComponent tosiye mishavad)
    document.cookie = `chosenAddress=${encodeURIComponent(
      JSON.stringify(chosenAddressItem)
    )}; path=/; expires=${expiresString};secure; samesite=None`;

    const chosenAddress = getCookie("chosenAddress");
    console.log('chosenAddress is: ' + chosenAddress);
    setIsEpmtyAdressList(null);
  }

  return (<>
    <div style={{ display: 'flex', flexFlow: 'column', padding: '0px', margin: '0px', }}>
      {responsedListFromApiSelectAddressList?.map((item, index) => {
        // alert('0-item.IdAdress: '+JSON.stringify(item));
        return (
          <>
            <div
              onClick={() => {
                setRowItem(item);
                chosenAddress(item);
              }}
              style={{
                borderTop: '1px solid #2b364f14',
                display: 'flex',
                paddingBottom: '.75rem',
                paddingTop: '.75rem',
                gap: '.5rem',
                justifyContent: 'space-between',
                cursor: 'pointer',
                height: 'min-content',
                alignItems: 'center',
              }}>
              <button
                id="locationBtnInEveryAddressRow"   //zare_nk_050208_nokteh(in dokmeh engar karbordi nadare va faghat ye design hast! badan shayad tabdilesh konam be ye tage div)
                style={{
                  backgroundColor: '#1b1c1d',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#eef0f1) 
                  fill: 'white',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#a5abb1)  
                  borderRadius: '9999px', justifyContent: 'center', alignItems: 'center', width: '2rem', height: '2rem', display: "flex", flexFlow: "row", border: 'none',
                  flex: '0 0 auto',
                }}
              >
                <svg style={{ width: '18px', height: '18px' }} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] fill-inherit"><g id="Location"><path id="Union" d="M11.99 2C7.34 2 3.5 5.72 3.5 10.32C3.5 12.64 4.34 14.79 5.73 16.61C7.25 18.62 9.13 20.37 11.27 21.75C11.8 22.09 12.24 22.07 12.73 21.75C14.85 20.37 16.74 18.62 18.27 16.61C19.66 14.79 20.5 12.63 20.5 10.32C20.5 5.72 16.66 2 11.99 2ZM11.99 13.33C10.45 13.33 9.19 12.12 9.19 10.58C9.19 9.04 10.45 7.78 11.99 7.78C13.53 7.78 14.8 9.05 14.8 10.58C14.8 12.11 13.53 13.33 11.99 13.33Z" fill="inherit"></path></g></svg>
              </button>

              <div
                style={{
                  paddingTop: '.5rem',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  flexFlow: 'column',
                  flex: '1 1 0%',
                  height: 'min-content',
                  marginLeft: '.5rem',
                }}
              >
                <span
                  style={{
                    color: '#1b1c1d',
                    fontWeight: '500',
                    fontSize: '.875rem',
                    lineHeight: '1.25rem',
                  }}
                >
                  {/* خونه */}
                  {item.OnvanAdress ? item.OnvanAdress : 'خونه'}
                </span>
                <p
                  style={{
                    color: '#1b1c1d',  //zare_nk_050206_nokteh(age entekhab nabasheh: color:#a5abb1)   
                    fontSize: '.75rem',
                    lineHeight: '1rem',
                    marginBottom: '0px',
                  }}
                >
                  {/* خ. وحدت اسلامی، نرسیده به خ. مولوی، ک. غلامرضا زندی، خ. صالح زاده */}
                  {item.Adress}
                </p>
              </div>

              <button
                id="showAddRemAddressBtn"
                onClick={() => {
                  // showAddRemAddress();  //zare_nk_050209_commented
                  setIsEpmtyShowAddRemAddress(false);  //zare_nk_050209_added 
                  setRowItem(item);  //zare_nk_050209_added 
                }}
                style={{
                  // backgroundColor: '#1b1c1d',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#eef0f1)  
                  backgroundColor: 'white',
                  borderRadius: '9999px', justifyContent: 'center', alignItems: 'center', width: '2rem', height: '2rem', display: "flex", flexFlow: "row", border: 'none',
                  flex: '0 0 auto',
                }}
              >
                <svg style={{ width: '18px', height: '18px', fill: '#a5abb1', transform: 'rotate(90deg)', }} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-[18px] fill-gray-500 rotate-90"><g id="Info menu"><path id="Union" fill="inherit" fillRule="evenodd" clipRule="evenodd" d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"></path></g></svg>
              </button>
            </div>

            {/* <ShowAddRemAddressComponent
              key={index}
              refForShowAddRemAddressBox={refForShowAddRemAddressBox}
              goToEdditAddressMap={() => {
                console.log('zare_nk_050209-sh01-edit-index: ' + index + '-item.IdAdress: ' + item.IdAdress + '-item.Fullname: ' + item.Fullname);
                goToEdditAddressMap(item.IdAdress);
              }}
              RemoveAddress={() => {
                console.log('zare_nk_050209-sh01-index: ' + index + '-item.IdAdress: ' + item.IdAdress + '-item.Fullname: ' + item.Fullname);   //item.IdAdress dar zamane click dar dom naberooz va notokk
                RemoveAddress(item.IdAdress);
              }}


              // responsedListFromApiEditAddress={responsedListFromApiEditAddress}  //zare_nk_050207_commented(chon aslan api editeAddresss ra dar in safhe nemizanim va dar safheye editAddress mizanim)
              responsedListFromApiRemoveAddress={responsedListFromApiRemoveAddress}
              isEpmtyShowAddRemAddress={isEpmtyShowAddRemAddress}
              setIsEpmtyShowAddRemAddress={setIsEpmtyShowAddRemAddress}
              showAddRemAddress={showAddRemAddress}
            /> */}
          </>
        )
      })}
      {rowItem &&
        <ShowAddRemAddressComponent
          key={rowItem.IdAdress}
          refForShowAddRemAddressBox={refForShowAddRemAddressBox}
          goToEdditAddressMap={() => {
            console.log('zare_nk_050209-sh01-edit-rowItem.IdAdress: ' + rowItem.IdAdress + '-rowItem.Fullname: ' + rowItem.Fullname);
            goToEdditAddressMap(rowItem.IdAdress);
          }}
          RemoveAddress={() => {
            console.log('zare_nk_050209-sh01-rem-item.IdAdress: ' + rowItem.IdAdress + '-rowItem.Fullname: ' + rowItem.Fullname);   //item.IdAdress dar zamane click dar dom naberooz va notokk
            RemoveAddress(rowItem.IdAdress);
          }}

          // responsedListFromApiEditAddress={responsedListFromApiEditAddress}  //zare_nk_050207_commented(chon aslan api editeAddresss ra dar in safhe nemizanim va dar safheye editAddress mizanim)
          responsedListFromApiRemoveAddress={responsedListFromApiRemoveAddress}
          isEpmtyShowAddRemAddress={isEpmtyShowAddRemAddress}
          setIsEpmtyShowAddRemAddress={setIsEpmtyShowAddRemAddress}
          showAddRemAddress={showAddRemAddress}
          setRowItem={setRowItem}
        />
      }
    </div>
  </>);
}
////zare_nk_050206_added_end

////zare_nk_050207_added_st(for ShowAddRemAddressList)
type ShowAddRemAddressComponentType = {
  refForShowAddRemAddressBox: RefObject<HTMLDivElement | null>;

  // goToEdditAddressMap: (IdAdress: number) => void;  //zare_nk_050209_commented
  goToEdditAddressMap: (e?: MouseEvent<HTMLButtonElement>) => void;  //zare_nk_050209_added

  // RemoveAddress: (IdAdress: number) => void;  //zare_nk_050209_commented(ok fo btn)
  RemoveAddress: (e?: MouseEvent<HTMLButtonElement>) => void;  //zare_nk_050209_added(ok fo btn)

  // responsedListFromApiEditAddress: responsedListFromApiEditAddressType | null;         //zare_nk_050207_added(and zare_nk_050207_commented(chon aslan api editeAddresss ra dar in safhe nemizanim va dar safheye editAddress mizanim))           
  responsedListFromApiRemoveAddress: responsedListFromApiRemoveAddressType | null;     //zare_nk_050207_added         

  isEpmtyShowAddRemAddress: boolean;
  setIsEpmtyShowAddRemAddress: React.Dispatch<React.SetStateAction<boolean>>;
  showAddRemAddress: () => void;
  setRowItem: React.Dispatch<React.SetStateAction<responsedListFromApiSelectAddressListType | null>>;
};

// export const ShowAddRemAddressComponent = function ShowAddRemAddressComponent({    //zare_nk_050209_commented
const ShowAddRemAddressComponent = function ShowAddRemAddressComponent({     //zare_nk_050209_added
  refForShowAddRemAddressBox,
  goToEdditAddressMap,
  RemoveAddress,

  // responsedListFromApiEditAddress,   //zare_nk_050207_commented(chon aslan api editeAddresss ra dar in safhe nemizanim va dar safheye editAddress mizanim))
  responsedListFromApiRemoveAddress,

  isEpmtyShowAddRemAddress,
  setIsEpmtyShowAddRemAddress,
  showAddRemAddress,
  setRowItem,    //zare_nk_050209_added

}: ShowAddRemAddressComponentType) {
  const router = useRouter();

  // const [error, setError] = useState<string | null>(null);  //zare_nk_050207_commented
  const [errorInShowAddRemAddressComponent, setErrorInShowAddRemAddressComponent] = useState<string | null>(null);    //zare_nk_050207_added

  const refForEditAddressBtn = useRef<HTMLButtonElement | null>(null);

  return (<>
    <Drawer
      id="box"
      ref={refForShowAddRemAddressBox}
      anchor="bottom"
      open={!isEpmtyShowAddRemAddress}
      onClose={() => {
        setIsEpmtyShowAddRemAddress(true);
      }}
      // hideBackdrop={true} //zare_nk_040502(albateh hideBackdrop={true} baes mishe alave bar hazfe tariye poshte drawer,ba click dar fazaye poshtesh,automat 
      // basteh nashe va niaz be modiriate dastiye document.addEventListener dar useEffect dashteh bashim) 
      slotProps={{
        paper: {
          sx: {
            width: '450px', ////zare_nk_050206_added(chon Drawer dar DOM kharej az componente pedaresh mireh va be risheye body mire, pas 100% body ro migireh na 100% taghi
            //// ke dar component beonvane tage pedaresh tarif kardim,pas bejaye width:100% majboorim dasti arze 450 ro behesh bedim)
            ////zare_nk_050206_commented_st(baraye vasat raftane ofoghiye Drawer ke javab nadad(translate kar nakard,chon ba codehaye dakheliye Drawer MUI tadakhol dareh))
            // left: '50%', 
            // transform: 'translate(-50%, 0%)', 
            ////zare_nk_050206_commented_end(baraye vasat raftane ofoghiye Drawer ke javab nadad(translate kar nakard,chon ba codehaye dakheliye Drawer MUI tadakhol dareh))
            margin: '0 auto',  ////zare_nk_050206_added(baraye vasat raftane ofoghiye Drawer ke javab dad)
            direction: 'rtl',  //zare_nk_050206_added
            borderRadius: '20px 20px 0 0',
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
            backgroundColor: 'white',
          },
        },
        ////zare_nk_050204_nokteh(chon ba hideBackdrop={true} goftim range fazaya poshtesh ro nemikhaim tagheir bedim pas backdrop ro comment kardim)
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
        },
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      {errorInShowAddRemAddressComponent && <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>{errorInShowAddRemAddressComponent}</p>}

      <Box sx={{
      }}>
        <div
          id="addRemAddressHeader"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            flex: '0 0 auto',
            width: '100%',
          }}
        >
          <div
            style={{
              opacity: '1',
              backgroundColor: '#eaeaeb',
              borderRadius: '20px',
              flex: '0 0 auto',
              width: '2.5rem',
              height: '.25rem',
              marginTop: '.75rem',
            }}
          ></div>

          <div style={{ padding: '1rem', justifyContent: 'space-between', alignItems: 'center', flex: '0 0 auto', width: '100%', height: '3.5rem', display: 'flex', }}>
            <span style={{ color: "#1b1c1d", fontSize: '16px', flex: '0 0 auto', }}>انتخاب آدرس</span>
            <button
              id="closeAddRemAddressBtn"
              onClick={() => {
                setIsEpmtyShowAddRemAddress(true);
                setRowItem(null);
              }}
              style={{
                width: '32px', height: '32px', border: 'none', flex: '0 0 auto', display: "flex", flexFlow: "row", justifyContent: 'center',
                justifyItems: 'center', alignItems: 'center', borderRadius: '9999px',
              }}
            >
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="#ff5900" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-6 fill-gray"><path fillRule="evenodd" clipRule="evenodd" d="M17.6565 7.75735L13.4138 12L17.6565 16.2426L16.2423 17.6568L11.9996 13.4142L7.75699 17.6568L6.34277 16.2426L10.5854 12L6.34277 7.75735L7.75699 6.34314L11.9996 10.5858L16.2423 6.34314L17.6565 7.75735Z" fill="inherit"></path></svg>
            </button>
          </div>

        </div>

        <div style={{
          paddingBottom: '1.75rem', paddingLeft: '1rem', paddingRight: '1rem', flex: '1 1 0%', width: '100%', marginTop: '1rem',
        }}>
          <div className="btn-cont" style={{
            display: 'flex', width: '100%', flexFlow: 'row-reverse', flexWrap: 'wrap', marginBottom: '2rem',
            columnGap: '1rem', backgroundColor: 'inherit',
          }} >
            <div style={{ display: 'flex', padding: '0px 10px', flex: '1 1 47%' }}>
              <button
                onClick={(e) => {
                  RemoveAddress(e);
                  setIsEpmtyShowAddRemAddress(true);
                }}
                // onClick={RemoveAddress} 
                style={{
                  borderRadius: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  padding: 7,
                  // backgroundColor: '#ffffff',
                  backgroundColor: '#f3f2f2',  //  #ededed 
                  color: '#242424',
                  border: 'none',
                  fontSize: '15px',
                  width: '100%',
                  height: '50px',
                }}>
                حذف
              </button>
            </div>
            <div style={{ display: 'flex', padding: '0px 10px', flex: '1 1 47%' }}>
              <button
                // onClick={goToEdditAddressMap} 
                // onClick={() => {
                //   goToEdditAddressMap
                // }}
                onClick={(e) => {
                  goToEdditAddressMap(e);
                }}
                style={{
                  borderRadius: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  padding: 7,
                  backgroundColor: '#ff5900',
                  color: 'white',
                  border: 'none',
                  fontSize: '15px',
                  width: '100%',
                  height: '50px',
                }}>
                ویرایش ادرس
              </button>
            </div>
          </div>
        </div>
      </Box>
      {/* zare_nk_050204_rahe2_st(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
    </Drawer >
  </>)
}
////zare_nk_050207_added_end(for ShowAddRemAddressList)

type AdressListComponentType = {
  // isEpmtyAdressList: boolean;    //zare_nk_050209_commented
  isEpmtyAdressList: string | null;    //zare_nk_050209_added
  // setIsEpmtyAdressList: React.Dispatch<React.SetStateAction<boolean>>;     //zare_nk_050209_commented
  setIsEpmtyAdressList: React.Dispatch<React.SetStateAction<string | null>>;   //zare_nk_050209_added
  refForBox: RefObject<HTMLDivElement | null>;
  responsedListFromApiSelectAddressList: responsedListFromApiSelectAddressListType[] | null;
  isEpmtyShowAddRemAddress: boolean;    //zare_nk_050207_added
  setIsEpmtyShowAddRemAddress: React.Dispatch<React.SetStateAction<boolean>>;    //zare_nk_050207_added
  showAddRemAddress: () => void;   //zare_nk_050207_added
  showAddressListDrawer: () => void;   //zare_nk_050209_added
};

// export const AdressListComponent = function AdressListComponent({      //zare_nk_050209_commented
const AdressListComponent = function AdressListComponent({      //zare_nk_050209_added
  isEpmtyAdressList,
  setIsEpmtyAdressList,
  refForBox,
  responsedListFromApiSelectAddressList,
  isEpmtyShowAddRemAddress,
  setIsEpmtyShowAddRemAddress,
  showAddRemAddress,
  showAddressListDrawer,
}: AdressListComponentType) {
  console.log('zare_nk_050126_AdressListComponent called!!-isEpmtyAdressList: ' + isEpmtyAdressList);

  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const goToMap = () => {
    // router.push("/folder03?tab=comments2");
    // redirect("/login");
    router.replace("/location");
  };

  return (<>
    {/* zare_nk_050204_rahe1_st(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
    {/* zare_nk_050204_nokteh(ClickAwayListener componente MUI hast ke rooyadade click kharej az taghayei ke dar mohtavayash moshakhas mikonim ra modiriat mikonih, 
va jaigozine khoobi baraye neveshtane dastiye rooydade click dar useEffect hast) */}
    {/* <ClickAwayListener
      onClickAway={(event) => {
        const target = event.target as HTMLElement;
        const isToggleButton = target.id === 'showDrawerBtn';
        if (isEpmtyAdressList!=null && !isToggleButton) {
          setIsEpmtyAdressList(null); // ببند
        }
      }}
    >
      <Collapse
        ref={refForBox}
        id="box"
        style={{
          position: 'absolute',
          bottom: '0px',
          backgroundColor: 'white',
          borderRadius: '20px 20px 0px 0px',
          boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)',
        }}
        in={!isEpmtyAdressList} //zare_nk_050202_nokteh(moadele show() va hide() dar bootstrap) 
        timeout="auto"
        unmountOnExit  //zare_nk_050202_nokteh(age in attribute ra benevisim age in={false} beshe az dom hazf mishe,age in attribute ra nanevisim 
      //// age in={false} beshe az dom hazf nemishe va dar inspect vojood dareh va faghat hidden mishe)
      > */}
    {/* zare_nk_050204_rahe1_end(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
    {/* zare_nk_050204_rahe2_st(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she(taghriban hamkhanevadeye modal hast)) */}
    <Drawer
      id="box"
      ref={refForBox}
      anchor="bottom"
      open={isEpmtyAdressList != null}
      onClose={() => {
        console.log('zare_nk_050204-Drawer closed!');
        setIsEpmtyAdressList(null)
      }}
      // hideBackdrop={true} //zare_nk_040502(albateh hideBackdrop={true} baes mishe alave bar hazfe tariye poshte drawer,ba click dar fazaye poshtesh,automat 
      // basteh nashe va niaz be modiriate dastiye document.addEventListener dar useEffect dashteh bashim) 
      slotProps={{
        paper: {
          sx: {
            width: '450px', ////zare_nk_050206_added(chon Drawer dar DOM kharej az componente pedaresh mireh va be risheye body mire, pas 100% body ro migireh na 100% taghi
            //// ke dar component beonvane tage pedaresh tarif kardim,pas bejaye width:100% majboorim dasti arze 450 ro behesh bedim)
            ////zare_nk_050206_commented_st(baraye vasat raftane ofoghiye Drawer ke javab nadad(translate kar nakard,chon ba codehaye dakheliye Drawer MUI tadakhol dareh))
            // left: '50%', 
            // transform: 'translate(-50%, 0%)', 
            ////zare_nk_050206_commented_end(baraye vasat raftane ofoghiye Drawer ke javab nadad(translate kar nakard,chon ba codehaye dakheliye Drawer MUI tadakhol dareh))
            margin: '0 auto',  ////zare_nk_050206_added(baraye vasat raftane ofoghiye Drawer ke javab dad)
            direction: 'rtl',  //zare_nk_050206_added
            borderRadius: '20px 20px 0 0',
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
            backgroundColor: 'white',
          },
        },
        ////zare_nk_050204_nokteh(chon ba hideBackdrop={true} goftim range fazaya poshtesh ro nemikhaim tagheir bedim pas backdrop ro comment kardim)
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
        },
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      {/* zare_nk_050204_rahe2_end(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she(taghriban hamkhanevadeye modal hast)) */}
      {error && <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>{error}</p>}
      <Box sx={{
      }}>
        <div
          id="addressListHeader"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            flex: '0 0 auto',
            width: '100%',
          }}
        >
          <div
            style={{
              opacity: '1',
              backgroundColor: '#eaeaeb',
              borderRadius: '20px',
              flex: '0 0 auto',
              width: '2.5rem',
              height: '.25rem',
              marginTop: '.75rem',
            }}
          ></div>

          <div style={{ padding: '1rem', justifyContent: 'space-between', alignItems: 'center', flex: '0 0 auto', width: '100%', height: '3.5rem', display: 'flex', }}>
            <span style={{ color: "#1b1c1d", fontSize: '16px', flex: '0 0 auto', }}>انتخاب آدرس</span>
            <button
              id="closeAddresListBtn"
              onClick={() => {
                setIsEpmtyAdressList(null);  //zare_nk_050221_nulle alan moadele truye versione ghbli hast-va meghdare stringi ham moadele false versione ghabli hast
              }}
              style={{
                width: '32px', height: '32px', border: 'none', flex: '0 0 auto', display: "flex", flexFlow: "row", justifyContent: 'center',
                justifyItems: 'center', alignItems: 'center', borderRadius: '9999px',
              }}
            >
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="#ff5900" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-6 fill-gray"><path fillRule="evenodd" clipRule="evenodd" d="M17.6565 7.75735L13.4138 12L17.6565 16.2426L16.2423 17.6568L11.9996 13.4142L7.75699 17.6568L6.34277 16.2426L10.5854 12L6.34277 7.75735L7.75699 6.34314L11.9996 10.5858L16.2423 6.34314L17.6565 7.75735Z" fill="inherit"></path></svg>
            </button>
          </div>

        </div>

        <div style={{
          paddingBottom: '1.75rem', paddingLeft: '1rem', paddingRight: '1rem', flex: '1 1 0%', width: '100%', marginTop: '1rem',
        }}>

          <p style={{
            color: '#63676e',
            fontSize: '.875rem',
            lineHeight: '1.25rem',
            marginBottom: '.5rem',
          }}>
            لطفا آدرس تحویل سفارش را انتخاب کنید.
          </p>

          <div style={{
            gap: '.5rem', justifyContent: 'flex-start', alignItems: 'center', cursor: 'pointer', height: '3.5rem', display: 'flex',
          }}>
            <button
              id="goToMapBtn"
              onClick={goToMap}
              style={{
                backgroundColor: '#fff7eb',
                width: '32px', height: '32px', border: 'none', flex: '0 0 auto', display: "flex",
                flexFlow: "row", justifyContent: 'center', justifyItems: 'center', alignItems: 'center', borderRadius: '9999px',

              }}
            >
              <svg style={{ height: ' 1.25rem', width: '1.25rem', fill: "#ff5900" }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5 fill-primary-600"><path d="M18 11.25H12.75V6C12.75 5.59 12.41 5.25 12 5.25C11.59 5.25 11.25 5.59 11.25 6V11.25H6C5.59 11.25 5.25 11.59 5.25 12C5.25 12.41 5.59 12.75 6 12.75H11.25V18C11.25 18.41 11.59 18.75 12 18.75C12.41 18.75 12.75 18.41 12.75 18V12.75H18C18.41 12.75 18.75 12.41 18.75 12C18.75 11.59 18.41 11.25 18 11.25Z" fill="inherit"></path></svg>
            </button>
            <span style={{
              color: "#ff5900",
              flex: '0 0 auto',
              fontSize: '.875rem',
              lineHeight: "1.25rem",
            }}>آدرس جدید</span>
          </div>

          {/* zare_nk_050206_added_addressHa_st(behtare dar componenti joda sedash bezanim ke maghadir ra ba api por koneh) */}
          <Adressescomponent
            responsedListFromApiSelectAddressList={responsedListFromApiSelectAddressList}
            isEpmtyShowAddRemAddress={isEpmtyShowAddRemAddress}
            setIsEpmtyShowAddRemAddress={setIsEpmtyShowAddRemAddress}
            showAddRemAddress={showAddRemAddress}
            setIsEpmtyAdressList={setIsEpmtyAdressList}
            showAddressListDrawer={showAddressListDrawer}
          />
          {/* zare_nk_050206_added_addressHa_end(behtare dar componenti joda sedash bezanim ke maghadir ra ba api por koneh) */}
        </div>
      </Box>
      {/* zare_nk_050204_rahe2_st(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
    </Drawer >
    {/* zare_nk_050204_rahe2_end(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}

    {/* zare_nk_050204_rahe1_st(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
    {/* </Collapse>
    </ClickAwayListener> */}
    {/* zare_nk_050204_rahe1_end(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
  </>)
}

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

// type responsedListFromApiEditAddressType = {  //zare_nk_050207_commented(chon aslan api editeAddresss ra dar in safhe nemizanim va dar safheye editAddress mizanim)
//   IdAdress: number;
//   IdUser: number;
//   Adress: string;
//   CodePosti: string;
//   Lon: number;
//   Lat: number;
//   Mobile: number;
//   FName: string;
//   LName: string;
//   OnvanAdress: string;
//   Fullname: string;

//   [key: string]: any;
// };

type responsedListFromApiRemoveAddressType = {
  IdAdress: number;
  // IdUser: number;
  // Adress: string;
  // CodePosti: string;
  // Lon: number;
  // Lat: number;
  // Mobile: number;
  // FName: string;
  // LName: string;
  // OnvanAdress: string;
  // Fullname: string;

  [key: string]: any;
};

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [isEpmtyAdressList, setIsEpmtyAdressList] = useState<string | null>(null);
  const [isEpmtyShowAddRemAddress, setIsEpmtyShowAddRemAddress] = useState(true);

  const refForBox = useRef<HTMLDivElement | null>(null);

  // const { userData, login, logout } = useAuthentication(); //zare_nk_050111_added
  const { isLogin } = useAuthentication(); //zare_nk_050111_added //zare_nk_050221_tahlilshe(ke chera estefadeh nashod)
  console.log('zare_nk_050111-Page rendered!!');

  const [responsedListFromApiSelectAddressList, SetResponsedListFromApiSelectAddressList] = useState<responsedListFromApiSelectAddressListType[] | null>(null);

  const router = useRouter();

  const showAddressListDrawer = async () => {
    let token = getCookie("token");
    if (!token) {
      // alert('lotfan avval online shid');
      setError("lotfan avval online shid");
      return;
    }
    console.log('tokentokentoken: ' + token);
    let ApiUrl = "https://api.tochikala.com/api/";
    const response = await fetch(ApiUrl + "User/Api_SelectAddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({}),
    });
    const data = await response.json();

    if (response.ok) {
      console.log("zare_nk_050206-data: " + JSON.stringify(data));
      if (data.status == 0) {
        var parsedList = JSON.parse(data.data.list);
        console.log("zare_nk_050206-parsedList1: " + parsedList[0].Adress);
        console.log("zare_nk_050206-parsedList2: " + parsedList[1].Adress);
        setIsEpmtyAdressList('notNull');

        SetResponsedListFromApiSelectAddressList(() => {
          return parsedList
        });

      } else {
        // document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        // document.cookie = `google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        setError("متاسفانه خطایی رخ داده است34:" + data.errors);
        console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
        ////zare_nk_050221_nokteh(setIsEpmtyAdressList(null); ro bezarim??)
      }
    } else {
      console.log("zare_nk_050110-!response.ok" + response.ok);
      // document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      // document.cookie = `google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      setError("متاسفانه خطایی رخ داده است35");
      ////zare_nk_050221_nokteh(setIsEpmtyAdressList(null); ro bezarim??)
    }

    console.log('zare_nk_050110-token hala is: ' + getCookie("token"));
    if (token) {
      setIsEpmtyAdressList('notNull');   //zare_nk_050221_nokteh(age online bashe va address nadashteh bashe ke manteghi nist setIsEpmtyAdressList('notNull') beshe!!)
    }
    else {
      // alert('lotfan avval online shid');
      ////zare_nk_050221_nokteh(setIsEpmtyAdressList(null); ro bezarim??)
    }
  }

  ////zare_nk_050226_added_st
  const refForwiperButtonNext = useRef<HTMLButtonElement | null>(null);
  const refForwiperButtonPrev = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    // اگر ریفرنس‌ها هنوز پر نشده باشند، کاری نکن
    if (!refForwiperButtonNext.current || !refForwiperButtonPrev.current) return;

    // اگر swiperRef هنوز ساخته نشده، صبر کن (چون Swiper کمی دیرتر رندر میشه)
    if (!swiperRef.current) return;

    // ۴. اینجا به Swiper می‌گوییم دکمه‌هایش کدام هستند
    // ماژول Navigation را از داخل instance Swiper پیدا می‌کنیم
    const swiperInstance = swiperRef.current.swiper;

    // تنظیم دکمه‌ها
    swiperInstance.params.navigation.nextEl = refForwiperButtonNext.current;
    swiperInstance.params.navigation.prevEl = refForwiperButtonPrev.current;

    // فعال‌سازی مجدد دکمه‌ها
    swiperInstance.navigation.update();
    swiperInstance.navigation.init();
  }, []);
  ////zare_nk_050226_added_end

  const showAddRemAddress = async () => {
    setIsEpmtyShowAddRemAddress(false);
  }

  return (
    <>
      <header></header>
      <main
        style={{
          backgroundColor: 'white',
          height: '100dvh',
          width: '100%',
          display: "flex",
          flexDirection: 'column',
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          flex: '1 0 auto',
          // border: '3px solid orange',
          direction: 'rtl',
        }}>

        {/* <div style={{ display: 'flex', padding: '0px 10px', flex: '1 1 47%', direction: 'rtl', }}>
          <button
            id="showAddressListDrawerBtn"
            onClick={showAddressListDrawer}   //zare_nk_050215_commented_movaghat(baraye synce hadafmand)
            style={{
              borderRadius: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 15,
              padding: 7,
              backgroundColor: '#ff5900',
              color: 'white',
              border: 'none',
              fontSize: '15px',
              width: '100%',
              height: '50px',
            }}>
            My Addresses
          </button>
        </div> */}

        <AdressListComponent
          isEpmtyAdressList={isEpmtyAdressList}
          setIsEpmtyAdressList={setIsEpmtyAdressList}
          refForBox={refForBox}
          responsedListFromApiSelectAddressList={responsedListFromApiSelectAddressList}
          isEpmtyShowAddRemAddress={isEpmtyShowAddRemAddress}
          setIsEpmtyShowAddRemAddress={setIsEpmtyShowAddRemAddress}
          showAddRemAddress={showAddRemAddress}
          showAddressListDrawer={showAddressListDrawer}
        />

        {/* zare_nk_050226_added_st */}
        {/* zare_nk_050226_npkteh_st(dokmehaye navigation va pagination dasti(jahate olgu gozashtim)) */}
        {/* <button className='swiper-button-next2' ref={refForwiperButtonNext}>
          برو بعدی
        </button>
        <button className='swiper-button-prev' ref={refForwiperButtonPrev}>
          برو قبلی
        </button> */}

        {/* <div className="swiper-pagination"></div>   */}
        {/* zare_nk_050226_npkteh_end(dokmehaye navigation va pagination dasti(jahate olgu gozashtim)) */}

        <Swiper
          ref={swiperRef} // اتصال ریفرنس به Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}    //zare_nk_050216_nokteh(faseleye beine slideha dar har ghabele namayesh(be px hast))
          slidesPerView={1.09}   //zare_nk_050216_nokteh(tedad slideha dar har ghabele moshahedeh)
          centeredSlides={true}  //zare_nk_050226_added(baraye vasat gharar gereftane slide ha dar swiper)
          ////zare_nk_050215_nokteh_st(dokmeye raftan be badi va ghabli ro modiriat mikoneh, age nazarim pishfarz false hast, mishe ham boolean dad, va ham meghdare objecti dad 
          //// ke dokmehaye ghablo bad , ... ra sefareshi konim(midoonim useRef age masalan string ya namber ,... bashe tagheiresh bedim dar hamin render tagheiresh ghabale 
          // moshahedeh hast, vali manzoore ma useRefi hast ke be taghaye jsx nesbat midim ke ta dar dom naran useRef be tage jsx nemichasbe ))
          navigation={false}
          // navigation={{
          //   nextEl: '.swiper-button-next2',  //zare_nk_050216_nokteh(dorost kar mikoneh)
          //   // nextEl: null, //refForwiperButtonNext.current,  

          //   prevEl: '.swiper-button-prev',  //zare_nk_050216_nokteh(dorost kar mikoneh)
          //   // prevEl: null, //refForwiperButtonPrev.current,   
          // }}
          ////zare_nk_050215_nokteh_end(dokmeye raftan be badi va ghabli ro modiriat mikoneh, age nazarim pishfarz false hast, mishe ham boolean dad, va ham meghdare objecti dad 
          //// ke dokmehaye ghablo bad , ... ra sefareshi konim(midoonim useRef age masalan string ya namber ,... bashe tagheiresh bedim dar hamin render tagheiresh ghabale 
          // moshahedeh hast, vali manzoore ma useRefi hast ke be taghaye jsx nesbat midim ke ta dar dom naran useRef be tage jsx nemichasbe ))

          ////zare_nk_050216_nokteh_st(dokmehaye raftan be safhe ke momoolan dar vasat va paeine swiper namayash dadeh mishan, age nazarim pishfarz false hast, mishe ham boolean 
          //// dad, va ham meghdare objecti dad ke dokmehaye adshodeh ra sefareshi konim)
          // pagination={true}  ////zare_nk_050226_nokteh(pagination={true} ra gozashtam faghat nameyesh mideh safheye feli ra ba toopor va tookhali kardane bullet ha, vali inke click
          ////  konim rooshoon amal konan bayad clickable: true, benevisim(chon pishfarz false hast va faghat ba angosht ya mouseclick chaporast mikeshim slide ha ra(na click rooye bullet ha)))
          // pagination={{
          //   clickable: true,
          //   // el: '.swiper-pagination',
          //   type: 'bullets',
          // }}
          ////zare_nk_050216_nokteh_end(dokmehaye raftan be safhe ke momoolan dar vasat va paeine swiper namayash dadeh mishan, age nazarim pishfarz false hast, mishe ham boolean 
          //// dad, va ham meghdare objecti dad ke dokmehaye yadshodeh ra sefareshi konim)

          // autoplay={{ delay: 5000, disableOnInteraction: false }} //zare_nk_050226_nokteh(age mikhaim barnameh automat slide ha ro varagh bezaneh)
          className="SwiperTopBaner"
          style={{ width: '100%', margin: '0px 19px' }}
        >
          {/* اسلاید اول */}
          <SwiperSlide>
            <div className="contInSlide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link href="https://tapsi.food/vendor-list?vendorListId=banner-1624" >
                <img
                  style={{
                    // width:'412px',
                    width: '100%',
                    borderRadius: '0.5rem',
                  }}
                  src="./images/top-baner/top-baner-slide01.png" />
              </Link>
              {/* <a href="/folder03" style={{}}>
                <h2>اسلاید اول</h2>
              </a> */}
            </div>
          </SwiperSlide>

          {/* اسلاید دوم */}
          <SwiperSlide>
            <div className="contInSlide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link href="https://tapsi.food/business-lines?businessTypeId=6" >
                <img
                  style={{
                    // width:'412px',
                    width: '100%',
                    borderRadius: '0.5rem',
                  }}
                  src="./images/top-baner/top-baner-slide02.png" />
              </Link>
            </div>
          </SwiperSlide>

          {/* اسلاید سوم */}
          <SwiperSlide>
            <div className="contInSlide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link href="https://tapsi.food/vendor-list?vendorListId=banner-1653" >
                <img
                  style={{
                    // width:'412px',
                    width: '100%',
                    borderRadius: '0.5rem',
                  }}
                  src="./images/top-baner/top-baner-slide03.png" />
              </Link>
            </div>
          </SwiperSlide>

          {/* اسلاید چهارم */}
          <SwiperSlide>
            <div className="contInSlide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link href="https://tapsi.food/business-lines?businessTypeId=5" >
                <img
                  style={{
                    // width:'412px',
                    width: '100%',
                    borderRadius: '0.5rem',
                  }}
                  src="./images/top-baner/top-baner-slide04.png" />
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
        {/* zare_nk_0580226_added_end */}

        <br />
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="48" height="28" viewBox="0 0 48 28" fill="none">
                      <path d="M44.159 0H1.00094C0.306976 0 -0.17601 0.689558 0.0611496 1.34174L3.44897 10.6583C3.52925 10.879 3.52925 11.121 3.44897 11.3417L0.0611496 20.6583C-0.17601 21.3104 0.30698 22 1.00094 22H41.5732C42.1255 22 42.5732 22.4477 42.5732 23V26.619C42.5732 27.0866 43.158 27.2983 43.4574 26.9391L47.1097 22.5563C47.4092 22.1968 47.5732 21.7438 47.5732 21.2759V3.41421C47.5732 2.50871 47.2135 1.64029 46.5732 1C45.933 0.359711 45.0645 0 44.159 0Z" fill="url(#paint0_linear_19043_112501)" />
                      <defs>
                        <linearGradient id="paint0_linear_19043_112501" x1="3.57324" y1="11" x2="47.5732" y2="11" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#1747A1" />
                          <stop offset="1" stop-color="#2269EE" />
                        </linearGradient>
                      </defs>
                    </svg> */}
        {/* zare_nk_050226_added_st */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView="auto"  ////zare_nk_050226_nokteh(meghdaresh ro auto dadim ta bar asase arze SwiperSlide ha tedadesh automat tavasoote 
          //// barnameh moshakhas she(pishfarz slidesPerView={1} hast))
          // centeredSlides={true}
          navigation={false}

          className="SwiperGrouplevel1"
          style={{
            width: '100%', margin: '0px 19px', height: '86px',
            overflow: 'visible', ////zare_nk_050226_nokteh(baraye inke darsade takhfifha ke biroon mizanan dideh beshan)
          }}
        >
          {/* اسلاید اول */}
          <SwiperSlide style={{ width: '72px', height: '80px' }}>
            <div className="contInSlide" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%',
              backgroundColor: '#f5f6f7', borderRadius: '.75rem',
            }}>
              <Link href="https://tapsi.food/business-lines?businessTypeId=6" style={{ width: '100%', height: '100%', textDecoration: 'none', }}>
                <div style={{
                  display: 'flex', flexFlow: 'column', position: 'relative', width: '100%', height: '100%',
                  justifyContent: 'center', alignItems: 'center', rowGap: '.25rem',
                }}>
                  <div style={{
                    position: 'absolute', top: '-5px', right: '-5px',
                    width: '44px', height: '28px',
                    //  border: '1px dashed blue',
                  }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg" width="44" height="28" viewBox="0 0 44 28" fill="none">
                      <path d="M40.159 0H1.00094C0.306976 0 -0.17601 0.689558 0.0611496 1.34174L3.44897 10.6583C3.52925 10.879 3.52925 11.121 3.44897 11.3417L0.0611496 20.6583C-0.17601 21.3104 0.306976 22 1.00094 22H37.5732C38.1255 22 38.5732 22.4477 38.5732 23V26.619C38.5732 27.0866 39.158 27.2983 39.4574 26.9391L43.1097 22.5563C43.4092 22.1968 43.5732 21.7438 43.5732 21.2759V3.41421C43.5732 2.50871 43.2135 1.64029 42.5732 1C41.933 0.359711 41.0645 0 40.159 0Z" fill="url(#paint0_linear_19043_112508)" />
                      <defs>
                        <linearGradient id="paint0_linear_19043_112508" x1="-8.42676" y1="11" x2="43.5732" y2="11" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#CC4800" />
                          <stop offset="1" stop-color="#FF5A00" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <span style={{
                      position: 'absolute',
                      top: '-5px',
                      width: '44px', height: '33px',
                      // border: '1px dashed red',
                      fontSize: '.625rem',
                      color: '#ffffff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>تخفیف</span>
                  </div>

                  {/* <div style={{ display: 'flex', flexFlow: 'column', margin: '0.5rem', border: '1px solid black', width: '100%', height: '100%', }}> */}
                  <img
                    style={{
                      // width:'412px',
                      width: '48px',
                      borderRadius: '0.5rem',
                      // position: 'absolute',
                      // bottom: '0px',
                      // border: '1px solid yellow',
                    }}
                    src="./images/SwiperGrouplevel1/Restaurant.png" />
                  <span style={{
                    // border: '1px solid green',
                    fontSize: '.75rem',
                    lineHeight: '1rem',
                    color: '#1b1c1d',
                  }}>
                    رستوران
                  </span>
                  {/* </div> */}
                </div>
              </Link>
            </div>
          </SwiperSlide>
          {/* اسلاید دوم */}
          <SwiperSlide style={{ width: '72px', height: '80px' }}>
            <div className="contInSlide" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%',
              backgroundColor: '#f5f6f7', borderRadius: '.75rem',
            }}>
              <Link href="https://tapsi.food/business-lines?businessTypeId=6" style={{ width: '100%', height: '100%', textDecoration: 'none', }}>
                <div style={{
                  display: 'flex', flexFlow: 'column', position: 'relative', width: '100%', height: '100%',
                  justifyContent: 'center', alignItems: 'center', rowGap: '.25rem',
                }}>
                  <div style={{
                    position: 'absolute', top: '-5px', right: '-5px',
                    width: '44px', height: '28px',
                    //  border: '1px dashed blue',
                    display: 'none',
                  }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg" width="44" height="28" viewBox="0 0 44 28" fill="none">
                      <path d="M40.159 0H1.00094C0.306976 0 -0.17601 0.689558 0.0611496 1.34174L3.44897 10.6583C3.52925 10.879 3.52925 11.121 3.44897 11.3417L0.0611496 20.6583C-0.17601 21.3104 0.306976 22 1.00094 22H37.5732C38.1255 22 38.5732 22.4477 38.5732 23V26.619C38.5732 27.0866 39.158 27.2983 39.4574 26.9391L43.1097 22.5563C43.4092 22.1968 43.5732 21.7438 43.5732 21.2759V3.41421C43.5732 2.50871 43.2135 1.64029 42.5732 1C41.933 0.359711 41.0645 0 40.159 0Z" fill="url(#paint0_linear_19043_112508)" />
                      <defs>
                        <linearGradient id="paint0_linear_19043_112508" x1="-8.42676" y1="11" x2="43.5732" y2="11" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#CC4800" />
                          <stop offset="1" stop-color="#FF5A00" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <span style={{
                      position: 'absolute',
                      top: '-5px',
                      width: '44px', height: '33px',
                      // border: '1px dashed red',
                      fontSize: '.625rem',
                      color: '#ffffff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>تخفیف</span>
                  </div>

                  {/* <div style={{ display: 'flex', flexFlow: 'column', margin: '0.5rem', border: '1px solid black', width: '100%', height: '100%', }}> */}
                  <img
                    style={{
                      // width:'412px',
                      width: '48px',
                      borderRadius: '0.5rem',
                      // position: 'absolute',
                      // bottom: '0px',
                      // border: '1px solid yellow',
                    }}
                    src="./images/SwiperGrouplevel1/CoffeeShop.png" />
                  <span style={{
                    // border: '1px solid green',
                    fontSize: '.75rem',
                    lineHeight: '1rem',
                    color: '#1b1c1d',
                  }}>
                    کافه
                  </span>
                  {/* </div> */}
                </div>
              </Link>
            </div>
          </SwiperSlide>

          {/* اسلاید سوم */}
          <SwiperSlide style={{ width: '72px', height: '80px' }}>
            <div className="contInSlide" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%',
              backgroundColor: '#f5f6f7', borderRadius: '.75rem',
            }}>
              <Link href="https://tapsi.food/business-lines?businessTypeId=6" style={{ width: '100%', height: '100%', textDecoration: 'none', }}>
                <div style={{
                  display: 'flex', flexFlow: 'column', position: 'relative', width: '100%', height: '100%',
                  justifyContent: 'center', alignItems: 'center', rowGap: '.25rem',
                }}>
                  <div style={{
                    position: 'absolute', top: '-5px', right: '-5px',
                    width: '44px', height: '28px',
                    //  border: '1px dashed blue',
                    display: 'none',
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="28" viewBox="0 0 48 28" fill="none">
                      <path d="M44.159 0H1.00094C0.306976 0 -0.17601 0.689558 0.0611496 1.34174L3.44897 10.6583C3.52925 10.879 3.52925 11.121 3.44897 11.3417L0.0611496 20.6583C-0.17601 21.3104 0.30698 22 1.00094 22H41.5732C42.1255 22 42.5732 22.4477 42.5732 23V26.619C42.5732 27.0866 43.158 27.2983 43.4574 26.9391L47.1097 22.5563C47.4092 22.1968 47.5732 21.7438 47.5732 21.2759V3.41421C47.5732 2.50871 47.2135 1.64029 46.5732 1C45.933 0.359711 45.0645 0 44.159 0Z" fill="url(#paint0_linear_19043_112501)" />
                      <defs>
                        <linearGradient id="paint0_linear_19043_112501" x1="3.57324" y1="11" x2="47.5732" y2="11" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#1747A1" />
                          <stop offset="1" stop-color="#2269EE" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <span style={{
                      position: 'absolute',
                      top: '-5px',
                      width: '44px', height: '33px',
                      // border: '1px dashed red',
                      fontSize: '.625rem',
                      color: '#ffffff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>قسطی!</span>
                  </div>

                  {/* <div style={{ display: 'flex', flexFlow: 'column', margin: '0.5rem', border: '1px solid black', width: '100%', height: '100%', }}> */}
                  <img
                    style={{
                      // width:'412px',
                      width: '48px',
                      borderRadius: '0.5rem',
                      // position: 'absolute',
                      // bottom: '0px',
                      // border: '1px solid yellow',
                    }}
                    src="./images/SwiperGrouplevel1/Bakery.png" />
                  <span style={{
                    // border: '1px solid green',
                    fontSize: '.75rem',
                    lineHeight: '1rem',
                    color: '#1b1c1d',
                  }}>
                    نانوایی
                  </span>
                  {/* </div> */}
                </div>
              </Link>
            </div>
          </SwiperSlide>

          {/* اسلاید چهارم */}
          <SwiperSlide style={{ width: '72px', height: '80px' }}>
            <div className="contInSlide" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%',
              backgroundColor: '#f5f6f7', borderRadius: '.75rem',
            }}>
              <Link href="https://tapsi.food/business-lines?businessTypeId=6" style={{ width: '100%', height: '100%', textDecoration: 'none', }}>
                <div style={{
                  display: 'flex', flexFlow: 'column', position: 'relative', width: '100%', height: '100%',
                  justifyContent: 'center', alignItems: 'center', rowGap: '.25rem',
                }}>
                  <div style={{
                    position: 'absolute', top: '-5px', right: '-5px',
                    width: '44px', height: '28px',
                    //  border: '1px dashed blue', 
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="28" viewBox="0 0 48 28" fill="none">
                      <path d="M44.159 0H1.00094C0.306976 0 -0.17601 0.689558 0.0611496 1.34174L3.44897 10.6583C3.52925 10.879 3.52925 11.121 3.44897 11.3417L0.0611496 20.6583C-0.17601 21.3104 0.30698 22 1.00094 22H41.5732C42.1255 22 42.5732 22.4477 42.5732 23V26.619C42.5732 27.0866 43.158 27.2983 43.4574 26.9391L47.1097 22.5563C47.4092 22.1968 47.5732 21.7438 47.5732 21.2759V3.41421C47.5732 2.50871 47.2135 1.64029 46.5732 1C45.933 0.359711 45.0645 0 44.159 0Z" fill="url(#paint0_linear_19043_112501)" />
                      <defs>
                        <linearGradient id="paint0_linear_19043_112501" x1="3.57324" y1="11" x2="47.5732" y2="11" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#1747A1" />
                          <stop offset="1" stop-color="#2269EE" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <span style={{
                      position: 'absolute',
                      top: '-5px',
                      width: '44px', height: '33px',
                      // border: '1px dashed red',
                      fontSize: '.625rem',
                      color: '#ffffff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>قسطی!</span>
                  </div>

                  {/* <div style={{ display: 'flex', flexFlow: 'column', margin: '0.5rem', border: '1px solid black', width: '100%', height: '100%', }}> */}
                  <img
                    style={{
                      // width:'412px',
                      width: '48px',
                      borderRadius: '0.5rem',
                      // position: 'absolute',
                      // bottom: '0px',
                      // border: '1px solid yellow',
                    }}
                    src="./images/SwiperGrouplevel1/Protein.png" />
                  <span style={{
                    // border: '1px solid green',
                    fontSize: '.75rem',
                    lineHeight: '1rem',
                    color: '#1b1c1d',
                  }}>
                    پروتئین
                  </span>
                  {/* </div> */}
                </div>
              </Link>
            </div>
          </SwiperSlide>

          {/* اسلاید پنجم */}
          <SwiperSlide style={{ width: '72px', height: '80px' }}>
            <div className="contInSlide" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%',
              backgroundColor: '#f5f6f7', borderRadius: '.75rem',
            }}>
              <Link href="https://tapsi.food/business-lines?businessTypeId=6" style={{ width: '100%', height: '100%', textDecoration: 'none', }}>
                <div style={{
                  display: 'flex', flexFlow: 'column', position: 'relative', width: '100%', height: '100%',
                  justifyContent: 'center', alignItems: 'center', rowGap: '.25rem',
                }}>
                  <div style={{
                    position: 'absolute', top: '-5px', right: '-5px',
                    width: '44px', height: '28px',
                    //  border: '1px dashed blue',
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="28" viewBox="0 0 48 28" fill="none">
                      <path d="M44.159 0H1.00094C0.306976 0 -0.17601 0.689558 0.0611496 1.34174L3.44897 10.6583C3.52925 10.879 3.52925 11.121 3.44897 11.3417L0.0611496 20.6583C-0.17601 21.3104 0.30698 22 1.00094 22H41.5732C42.1255 22 42.5732 22.4477 42.5732 23V26.619C42.5732 27.0866 43.158 27.2983 43.4574 26.9391L47.1097 22.5563C47.4092 22.1968 47.5732 21.7438 47.5732 21.2759V3.41421C47.5732 2.50871 47.2135 1.64029 46.5732 1C45.933 0.359711 45.0645 0 44.159 0Z" fill="url(#paint0_linear_19043_112501)" />
                      <defs>
                        <linearGradient id="paint0_linear_19043_112501" x1="3.57324" y1="11" x2="47.5732" y2="11" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#1747A1" />
                          <stop offset="1" stop-color="#2269EE" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <span style={{
                      position: 'absolute',
                      top: '-5px',
                      width: '44px', height: '33px',
                      // border: '1px dashed red',
                      fontSize: '.625rem',
                      color: '#ffffff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>قسطی!</span>
                  </div>

                  {/* <div style={{ display: 'flex', flexFlow: 'column', margin: '0.5rem', border: '1px solid black', width: '100%', height: '100%', }}> */}
                  <img
                    style={{
                      // width:'412px',
                      width: '48px',
                      borderRadius: '0.5rem',
                      // position: 'absolute',
                      // bottom: '0px',
                      // border: '1px solid yellow',
                    }}
                    src="./images/SwiperGrouplevel1/Fruit.png" />
                  <span style={{
                    // border: '1px solid green',
                    fontSize: '.75rem',
                    lineHeight: '1rem',
                    color: '#1b1c1d',
                  }}>
                    میوه
                  </span>
                  {/* </div> */}
                </div>
              </Link>
            </div>
          </SwiperSlide>

          {/* اسلاید ششم */}
          <SwiperSlide style={{ width: '72px', height: '80px' }}>
            <div className="contInSlide" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%',
              backgroundColor: '#f5f6f7', borderRadius: '.75rem',
            }}>
              <Link href="https://tapsi.food/business-lines?businessTypeId=6" style={{ width: '100%', height: '100%', textDecoration: 'none', }}>
                <div style={{
                  display: 'flex', flexFlow: 'column', position: 'relative', width: '100%', height: '100%',
                  justifyContent: 'center', alignItems: 'center', rowGap: '.25rem',
                }}>
                  <div style={{
                    position: 'absolute', top: '-5px', right: '-5px',
                    width: '44px', height: '28px',
                    //  border: '1px dashed blue',
                  }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg" width="44" height="28" viewBox="0 0 44 28" fill="none">
                      <path d="M40.159 0H1.00094C0.306976 0 -0.17601 0.689558 0.0611496 1.34174L3.44897 10.6583C3.52925 10.879 3.52925 11.121 3.44897 11.3417L0.0611496 20.6583C-0.17601 21.3104 0.306976 22 1.00094 22H37.5732C38.1255 22 38.5732 22.4477 38.5732 23V26.619C38.5732 27.0866 39.158 27.2983 39.4574 26.9391L43.1097 22.5563C43.4092 22.1968 43.5732 21.7438 43.5732 21.2759V3.41421C43.5732 2.50871 43.2135 1.64029 42.5732 1C41.933 0.359711 41.0645 0 40.159 0Z" fill="url(#paint0_linear_19043_112508)" />
                      <defs>
                        <linearGradient id="paint0_linear_19043_112508" x1="-8.42676" y1="11" x2="43.5732" y2="11" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#CC4800" />
                          <stop offset="1" stop-color="#FF5A00" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span style={{
                      position: 'absolute',
                      top: '-5px',
                      width: '44px', height: '33px',
                      // border: '1px dashed red',
                      fontSize: '.625rem',
                      color: '#ffffff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>تخفیف</span>
                  </div>

                  {/* <div style={{ display: 'flex', flexFlow: 'column', margin: '0.5rem', border: '1px solid black', width: '100%', height: '100%', }}> */}
                  <img
                    style={{
                      // width:'412px',
                      width: '48px',
                      borderRadius: '0.5rem',
                      // position: 'absolute',
                      // bottom: '0px',
                      // border: '1px solid yellow',
                    }}
                    src="./images/SwiperGrouplevel1/Grocery.png" />
                  <span style={{
                    // border: '1px solid green',
                    fontSize: '.75rem',
                    lineHeight: '1rem',
                    color: '#1b1c1d',
                  }}>
                    مایحتاج روزانه
                  </span>
                  {/* </div> */}
                </div>
              </Link>
            </div>
          </SwiperSlide>

          {/* اسلاید هفتم */}
          <SwiperSlide style={{ width: '72px', height: '80px' }}>
            <div className="contInSlide" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%',
              backgroundColor: '#f5f6f7', borderRadius: '.75rem',
            }}>
              <Link href="https://tapsi.food/business-lines?businessTypeId=6" style={{ width: '100%', height: '100%', textDecoration: 'none', }}>
                <div style={{
                  display: 'flex', flexFlow: 'column', position: 'relative', width: '100%', height: '100%',
                  justifyContent: 'center', alignItems: 'center', rowGap: '.25rem',
                }}>
                  <div style={{
                    position: 'absolute', top: '-5px', right: '-5px',
                    width: '44px', height: '28px',
                    //  border: '1px dashed blue',
                  }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg" width="44" height="28" viewBox="0 0 44 28" fill="none">
                      <path d="M40.159 0H1.00094C0.306976 0 -0.17601 0.689558 0.0611496 1.34174L3.44897 10.6583C3.52925 10.879 3.52925 11.121 3.44897 11.3417L0.0611496 20.6583C-0.17601 21.3104 0.306976 22 1.00094 22H37.5732C38.1255 22 38.5732 22.4477 38.5732 23V26.619C38.5732 27.0866 39.158 27.2983 39.4574 26.9391L43.1097 22.5563C43.4092 22.1968 43.5732 21.7438 43.5732 21.2759V3.41421C43.5732 2.50871 43.2135 1.64029 42.5732 1C41.933 0.359711 41.0645 0 40.159 0Z" fill="url(#paint0_linear_19043_112508)" />
                      <defs>
                        <linearGradient id="paint0_linear_19043_112508" x1="-8.42676" y1="11" x2="43.5732" y2="11" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#CC4800" />
                          <stop offset="1" stop-color="#FF5A00" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span style={{
                      position: 'absolute',
                      top: '-5px',
                      width: '44px', height: '33px',
                      // border: '1px dashed red',
                      fontSize: '.625rem',
                      color: '#ffffff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>تخفیف</span>
                  </div>

                  {/* <div style={{ display: 'flex', flexFlow: 'column', margin: '0.5rem', border: '1px solid black', width: '100%', height: '100%', }}> */}
                  <img
                    style={{
                      // width:'412px',
                      width: '48px',
                      borderRadius: '0.5rem',
                      // position: 'absolute',
                      // bottom: '0px',
                      // border: '1px solid yellow',
                    }}
                    src="./images/SwiperGrouplevel1/Confectionery.png" />
                  <span style={{
                    // border: '1px solid green',
                    fontSize: '.75rem',
                    lineHeight: '1rem',
                    color: '#1b1c1d',
                  }}>
                    شیرینی
                  </span>
                  {/* </div> */}
                </div>
              </Link>
            </div>
          </SwiperSlide>

          {/* اسلاید هشتم */}
          <SwiperSlide style={{ width: '72px', height: '80px' }}>
            <div className="contInSlide" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%',
              backgroundColor: '#f5f6f7', borderRadius: '.75rem',
            }}>
              <Link href="https://tapsi.food/business-lines?businessTypeId=6" style={{ width: '100%', height: '100%', textDecoration: 'none', }}>
                <div style={{
                  display: 'flex', flexFlow: 'column', position: 'relative', width: '100%', height: '100%',
                  justifyContent: 'center', alignItems: 'center', rowGap: '.25rem',
                }}>
                  <div style={{
                    position: 'absolute', top: '-5px', right: '-5px',
                    width: '44px', height: '28px',
                    //  border: '1px dashed blue',
                  }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg" width="44" height="28" viewBox="0 0 44 28" fill="none">
                      <path d="M40.159 0H1.00094C0.306976 0 -0.17601 0.689558 0.0611496 1.34174L3.44897 10.6583C3.52925 10.879 3.52925 11.121 3.44897 11.3417L0.0611496 20.6583C-0.17601 21.3104 0.306976 22 1.00094 22H37.5732C38.1255 22 38.5732 22.4477 38.5732 23V26.619C38.5732 27.0866 39.158 27.2983 39.4574 26.9391L43.1097 22.5563C43.4092 22.1968 43.5732 21.7438 43.5732 21.2759V3.41421C43.5732 2.50871 43.2135 1.64029 42.5732 1C41.933 0.359711 41.0645 0 40.159 0Z" fill="url(#paint0_linear_19043_112508)" />
                      <defs>
                        <linearGradient id="paint0_linear_19043_112508" x1="-8.42676" y1="11" x2="43.5732" y2="11" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#CC4800" />
                          <stop offset="1" stop-color="#FF5A00" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span style={{
                      position: 'absolute',
                      top: '-5px',
                      width: '44px', height: '33px',
                      // border: '1px dashed red',
                      fontSize: '.625rem',
                      color: '#ffffff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>تخفیف</span>
                  </div>

                  {/* <div style={{ display: 'flex', flexFlow: 'column', margin: '0.5rem', border: '1px solid black', width: '100%', height: '100%', }}> */}
                  <img
                    style={{
                      // width:'412px',
                      width: '48px',
                      borderRadius: '0.5rem',
                      // position: 'absolute',
                      // bottom: '0px',
                      // border: '1px solid yellow',
                    }}
                    src="./images/SwiperGrouplevel1/Nuts.png" />
                  <span style={{
                    // border: '1px solid green',
                    fontSize: '.75rem',
                    lineHeight: '1rem',
                    color: '#1b1c1d',
                  }}>
                    آجیل
                  </span>
                  {/* </div> */}
                </div>
              </Link>
            </div>
          </SwiperSlide>

          {/* اسلاید نهم */}
          <SwiperSlide style={{ width: '72px', height: '80px' }}>
            <div className="contInSlide" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%',
              backgroundColor: '#f5f6f7', borderRadius: '.75rem',
            }}>
              <Link href="https://tapsi.food/business-lines?businessTypeId=6" style={{ width: '100%', height: '100%', textDecoration: 'none', }}>
                <div style={{
                  display: 'flex', flexFlow: 'column', position: 'relative', width: '100%', height: '100%',
                  justifyContent: 'center', alignItems: 'center', rowGap: '.25rem',
                }}>
                  <div style={{
                    position: 'absolute', top: '-5px', right: '-5px',
                    width: '44px', height: '28px',
                    //  border: '1px dashed blue',
                  }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg" width="44" height="28" viewBox="0 0 44 28" fill="none">
                      <path d="M40.159 0H1.00094C0.306976 0 -0.17601 0.689558 0.0611496 1.34174L3.44897 10.6583C3.52925 10.879 3.52925 11.121 3.44897 11.3417L0.0611496 20.6583C-0.17601 21.3104 0.306976 22 1.00094 22H37.5732C38.1255 22 38.5732 22.4477 38.5732 23V26.619C38.5732 27.0866 39.158 27.2983 39.4574 26.9391L43.1097 22.5563C43.4092 22.1968 43.5732 21.7438 43.5732 21.2759V3.41421C43.5732 2.50871 43.2135 1.64029 42.5732 1C41.933 0.359711 41.0645 0 40.159 0Z" fill="url(#paint0_linear_19043_112508)" />
                      <defs>
                        <linearGradient id="paint0_linear_19043_112508" x1="-8.42676" y1="11" x2="43.5732" y2="11" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#CC4800" />
                          <stop offset="1" stop-color="#FF5A00" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span style={{
                      position: 'absolute',
                      top: '-5px',
                      width: '44px', height: '33px',
                      // border: '1px dashed red',
                      fontSize: '.625rem',
                      color: '#ffffff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>تخفیف</span>
                  </div>

                  {/* <div style={{ display: 'flex', flexFlow: 'column', margin: '0.5rem', border: '1px solid black', width: '100%', height: '100%', }}> */}
                  <img
                    style={{
                      // width:'412px',
                      width: '48px',
                      borderRadius: '0.5rem',
                      // position: 'absolute',
                      // bottom: '0px',
                      // border: '1px solid yellow',
                    }}
                    src="./images/SwiperGrouplevel1/Juice.png" />
                  <span style={{
                    // border: '1px solid green',
                    fontSize: '.75rem',
                    lineHeight: '1rem',
                    color: '#1b1c1d',
                  }}>
                    آبمیوه و بستنی
                  </span>
                  {/* </div> */}
                </div>
              </Link>
            </div>
          </SwiperSlide>

          {/* اسلاید دهم */}
          <SwiperSlide style={{ width: '72px', height: '80px' }}>
            <div className="contInSlide" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%',
              backgroundColor: '#f5f6f7', borderRadius: '.75rem',
            }}>
              <Link href="https://tapsi.food/business-lines?businessTypeId=6" style={{ width: '100%', height: '100%', textDecoration: 'none', }}>
                <div style={{
                  display: 'flex', flexFlow: 'column', position: 'relative', width: '100%', height: '100%',
                  justifyContent: 'center', alignItems: 'center', rowGap: '.25rem',
                }}>
                  <div style={{
                    position: 'absolute', top: '-5px', right: '-5px',
                    width: '44px', height: '28px',
                    //  border: '1px dashed blue',
                  }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg" width="44" height="28" viewBox="0 0 44 28" fill="none">
                      <path d="M40.159 0H1.00094C0.306976 0 -0.17601 0.689558 0.0611496 1.34174L3.44897 10.6583C3.52925 10.879 3.52925 11.121 3.44897 11.3417L0.0611496 20.6583C-0.17601 21.3104 0.306976 22 1.00094 22H37.5732C38.1255 22 38.5732 22.4477 38.5732 23V26.619C38.5732 27.0866 39.158 27.2983 39.4574 26.9391L43.1097 22.5563C43.4092 22.1968 43.5732 21.7438 43.5732 21.2759V3.41421C43.5732 2.50871 43.2135 1.64029 42.5732 1C41.933 0.359711 41.0645 0 40.159 0Z" fill="url(#paint0_linear_19043_112508)" />
                      <defs>
                        <linearGradient id="paint0_linear_19043_112508" x1="-8.42676" y1="11" x2="43.5732" y2="11" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#CC4800" />
                          <stop offset="1" stop-color="#FF5A00" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span style={{
                      position: 'absolute',
                      top: '-5px',
                      width: '44px', height: '33px',
                      // border: '1px dashed red',
                      fontSize: '.625rem',
                      color: '#ffffff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>تخفیف</span>
                  </div>

                  {/* <div style={{ display: 'flex', flexFlow: 'column', margin: '0.5rem', border: '1px solid black', width: '100%', height: '100%', }}> */}
                  <img
                    style={{
                      // width:'412px',
                      width: '48px',
                      borderRadius: '0.5rem',
                      // position: 'absolute',
                      // bottom: '0px',
                      // border: '1px solid yellow',
                    }}
                    src="./images/SwiperGrouplevel1/Petshop.png" />
                  <span style={{
                    // border: '1px solid green',
                    fontSize: '.75rem',
                    lineHeight: '1rem',
                    color: '#1b1c1d',
                  }}>
                    پت شاپ
                  </span>
                  {/* </div> */}
                </div>
              </Link>
            </div>
          </SwiperSlide>

          {/* اسلاید یازدهم */}
          <SwiperSlide style={{ width: '72px', height: '80px' }}>
            <div className="contInSlide" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%',
              backgroundColor: '#f5f6f7', borderRadius: '.75rem',
            }}>
              <Link href="https://tapsi.food/business-lines?businessTypeId=6" style={{ width: '100%', height: '100%', textDecoration: 'none', }}>
                <div style={{
                  display: 'flex', flexFlow: 'column', position: 'relative', width: '100%', height: '100%',
                  justifyContent: 'center', alignItems: 'center', rowGap: '.25rem',
                }}>
                  <div style={{
                    position: 'absolute', top: '-5px', right: '-5px',
                    width: '44px', height: '28px',
                    //  border: '1px dashed blue',
                  }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg" width="44" height="28" viewBox="0 0 44 28" fill="none">
                      <path d="M40.159 0H1.00094C0.306976 0 -0.17601 0.689558 0.0611496 1.34174L3.44897 10.6583C3.52925 10.879 3.52925 11.121 3.44897 11.3417L0.0611496 20.6583C-0.17601 21.3104 0.306976 22 1.00094 22H37.5732C38.1255 22 38.5732 22.4477 38.5732 23V26.619C38.5732 27.0866 39.158 27.2983 39.4574 26.9391L43.1097 22.5563C43.4092 22.1968 43.5732 21.7438 43.5732 21.2759V3.41421C43.5732 2.50871 43.2135 1.64029 42.5732 1C41.933 0.359711 41.0645 0 40.159 0Z" fill="url(#paint0_linear_19043_112508)" />
                      <defs>
                        <linearGradient id="paint0_linear_19043_112508" x1="-8.42676" y1="11" x2="43.5732" y2="11" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#CC4800" />
                          <stop offset="1" stop-color="#FF5A00" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span style={{
                      position: 'absolute',
                      top: '-5px',
                      width: '44px', height: '33px',
                      // border: '1px dashed red',
                      fontSize: '.625rem',
                      color: '#ffffff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>تخفیف</span>
                  </div>

                  {/* <div style={{ display: 'flex', flexFlow: 'column', margin: '0.5rem', border: '1px solid black', width: '100%', height: '100%', }}> */}
                  <img
                    style={{
                      // width:'412px',
                      width: '48px',
                      borderRadius: '0.5rem',
                      // position: 'absolute',
                      // bottom: '0px',
                      // border: '1px solid yellow',
                    }}
                    src="./images/SwiperGrouplevel1/Coffee_&_Chocolate.png" />
                  <span style={{
                    // border: '1px solid green',
                    fontSize: '.75rem',
                    lineHeight: '1rem',
                    color: '#1b1c1d',
                  }}>
                    شکلات و قهوه
                  </span>
                  {/* </div> */}
                </div>
              </Link>
            </div>
          </SwiperSlide>

          {/* اسلاید دوازدهم */}
          <SwiperSlide style={{ width: '72px', height: '80px' }}>
            <div className="contInSlide" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%',
              backgroundColor: '#f5f6f7', borderRadius: '.75rem',
            }}>
              <Link href="https://tapsi.food/business-lines?businessTypeId=6" style={{ width: '100%', height: '100%', textDecoration: 'none', }}>
                <div style={{
                  display: 'flex', flexFlow: 'column', position: 'relative', width: '100%', height: '100%',
                  justifyContent: 'center', alignItems: 'center', rowGap: '.25rem',
                }}>
                  <div style={{
                    position: 'absolute', top: '-5px', right: '-5px',
                    width: '44px', height: '28px',
                    //  border: '1px dashed blue',
                  }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg" width="44" height="28" viewBox="0 0 44 28" fill="none">
                      <path d="M40.159 0H1.00094C0.306976 0 -0.17601 0.689558 0.0611496 1.34174L3.44897 10.6583C3.52925 10.879 3.52925 11.121 3.44897 11.3417L0.0611496 20.6583C-0.17601 21.3104 0.306976 22 1.00094 22H37.5732C38.1255 22 38.5732 22.4477 38.5732 23V26.619C38.5732 27.0866 39.158 27.2983 39.4574 26.9391L43.1097 22.5563C43.4092 22.1968 43.5732 21.7438 43.5732 21.2759V3.41421C43.5732 2.50871 43.2135 1.64029 42.5732 1C41.933 0.359711 41.0645 0 40.159 0Z" fill="url(#paint0_linear_19043_112508)" />
                      <defs>
                        <linearGradient id="paint0_linear_19043_112508" x1="-8.42676" y1="11" x2="43.5732" y2="11" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#CC4800" />
                          <stop offset="1" stop-color="#FF5A00" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span style={{
                      position: 'absolute',
                      top: '-5px',
                      width: '44px', height: '33px',
                      // border: '1px dashed red',
                      fontSize: '.625rem',
                      color: '#ffffff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>تخفیف</span>
                  </div>

                  {/* <div style={{ display: 'flex', flexFlow: 'column', margin: '0.5rem', border: '1px solid black', width: '100%', height: '100%', }}> */}
                  <img
                    style={{
                      // width:'412px',
                      width: '48px',
                      borderRadius: '0.5rem',
                      // position: 'absolute',
                      // bottom: '0px',
                      // border: '1px solid yellow',
                    }}
                    src="./images/SwiperGrouplevel1/Organic.png" />
                  <span style={{
                    // border: '1px solid green',
                    fontSize: '.75rem',
                    lineHeight: '1rem',
                    color: '#1b1c1d',
                  }}>
                    ارگانیک
                  </span>
                  {/* </div> */}
                </div>
              </Link>
            </div>
          </SwiperSlide>

        </Swiper>
        {/* zare_nk_050226_added_end */}

      </main>
      <footer></footer>

      <div className="tabIndexOne-in-LayoutWrapper" tabIndex={1}>
      </div>
    </>
  );
}
