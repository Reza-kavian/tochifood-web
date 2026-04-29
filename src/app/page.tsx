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

////zare_nk_050109_added_st

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

function getCookie(name: any) {
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

type AdressescomponentType = {
  responsedListFromApiSelectAddressList: responsedListFromApiSelectAddressListType[] | null;  //zare_nk_050206_added
  isEpmtyShowAddRemAddress: boolean;    //zare_nk_050207_added
  setIsEpmtyShowAddRemAddress: React.Dispatch<React.SetStateAction<boolean>>;    //zare_nk_050207_added
  showAddRemAddress: () => void;   //zare_nk_050207_added
};

////zare_nk_050206_added_st
export const Adressescomponent = function Adressescomponent({
  responsedListFromApiSelectAddressList,
  isEpmtyShowAddRemAddress,
  setIsEpmtyShowAddRemAddress,
  showAddRemAddress,
}: AdressescomponentType) {

  const router = useRouter();

  const refForShowAddRemAddressBox = useRef<HTMLDivElement | null>(null);  //zare_nk_050207_added

  const [responsedListFromApiRemoveAddress, SetResponsedListFromApiRemoveAddress] = useState<responsedListFromApiRemoveAddressType | null>(null);  //zare_nk_050207_added

  const goToEdditAddressMap = (IdAdress: number) => {  //zare_nk_050207_added  
    // router.push("/folder03?tab=comments2");
    // redirect("/login");
    alert('IdAdress:::: ' + IdAdress);
    router.replace("/edditAddressLocation");  //zare_nk_050207_nokteh(in safheye edditAddressLocation ezafeh beshe(dar tapsiFood esmesh safheye edit-address hast))
  };

  const RemoveAddress = async (IdAdress: number) => {
    ////zare_nk_api deleteAddres seda zadeh va ehtemalan setIsEpmtyAdressList(true) mizanim ta dobareh liste Addressha refresh shan

    const token = getCookie("token");
    console.log('zare_nk_050110-token hala is: ' + getCookie("token"));


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

  return (<>
    <div style={{ display: 'flex', flexFlow: 'column', padding: '0px', margin: '0px', }}>
      {responsedListFromApiSelectAddressList?.map((item, index) => {
        // alert('0-item.IdAdress: '+JSON.stringify(item));
        return (
          <>
            <div
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
                id="locationBtnInEveryAddressRow"   //zare_nk_050208_nokteh(in dokmeh engar karbordi nadare va faghat ye design hast!badan shayad tabdilesh konam be ye tage div)
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
                // onClick={showAddRemAddress}
                onClick={() => {
                  alert('01-item.IdAdress: ' + JSON.stringify(item));
                  showAddRemAddress();
                }}
                style={{
                  // backgroundColor: '#1b1c1d',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#eef0f1)  
                  backgroundColor: 'white',
                  borderRadius: '9999px', justifyContent: 'center', alignItems: 'center', width: '2rem', height: '2rem', display: "flex", flexFlow: "row", border: 'none',
                  flex: '0 0 auto',
                }}
              >
                <svg style={{ width: '18px', height: '18px', fill: '#a5abb1', transform: 'rotate(90deg)', }} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-[18px] fill-gray-500 rotate-90"><g id="Info menu"><path id="Union" fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"></path></g></svg>
              </button>
            </div>

            <ShowAddRemAddressComponent
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
            />

          </>
        )
      })}
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

  isEpmtyShowAddRemAddress: boolean;    //zare_nk_050207_added
  setIsEpmtyShowAddRemAddress: React.Dispatch<React.SetStateAction<boolean>>;    //zare_nk_050207_added
  showAddRemAddress: () => void;   //zare_nk_050207_added
};

// export function AdressListComponent({  //zare_nk_050206_commented
export const ShowAddRemAddressComponent = function AdressListComponent({  //zare_nk_050206_added  
  refForShowAddRemAddressBox,
  goToEdditAddressMap,
  RemoveAddress,

  // responsedListFromApiEditAddress,         //zare_nk_050207_added(and zare_nk_050207_commented(chon aslan api editeAddresss ra dar in safhe nemizanim va dar safheye editAddress mizanim))
  responsedListFromApiRemoveAddress,           //zare_nk_050207_added      

  isEpmtyShowAddRemAddress,     //zare_nk_050207_added
  setIsEpmtyShowAddRemAddress,   //zare_nk_050207_added
  showAddRemAddress,   //zare_nk_050207_added 
}: ShowAddRemAddressComponentType) {

  //zare_nk_050208_AdressListComponent called!!-RemoveAddress: ()=>{
  //     alert('1');
  //     RemoveAddress(item.IdAdress);
  // }

  const router = useRouter();

  // const [error, setError] = useState<string | null>(null);  //zare_nk_050207_commented
  const [errorInShowAddRemAddressComponent, setErrorInShowAddRemAddressComponent] = useState<string | null>(null);    //zare_nk_050207_added

  // const refForSaveAddressFormInputsBtn = useRef<HTMLButtonElement | null>(null);  //zare_nk_050207_commented

  const refForEditAddressBtn = useRef<HTMLButtonElement | null>(null);  //zare_nk_050207_added

  // const [isDisabledsaveAddressFormInputsBtn, setIsDisabledsaveAddressFormInputsBtn] =  useState(true);  //zare_nk_050207_commented
  const [isDisabledEditAddressBtn, setIsDisabledEditAddressBtn] = useState(false);  //zare_nk_050207_added(in state contorole disabled bodan ya naboodane dokmeye eddite address ezafi va bimorede,va hamvareh ehtemalan enable bayad bashe)

  return (<>
    <button
      onClick={(e) => {
        RemoveAddress(e);
      }}

      style={{
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 7,
        backgroundColor: '#f3f2f2',
        color: '#242424',
        border: 'none',
        fontSize: '15px',
        width: '100%',
        height: '50px',
      }}>
      حذف تستی
    </button>
    <Drawer
      id="box"
      // ref={refForBox}   //zare_nk_050207_commented
      ref={refForShowAddRemAddressBox}  //zare_nk_050207_added

      anchor="bottom"
      // open={!isEpmtyAdressList}  //zare_nk_050207_commented
      open={!isEpmtyShowAddRemAddress}  //zare_nk_050207_added 

      onClose={() => {
        // setIsEpmtyAdressList(true);  //zare_nk_050207_commented
        setIsEpmtyShowAddRemAddress(true);  //zare_nk_050207_added
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
              }}
              style={{
                width: '32px', height: '32px', border: 'none', flex: '0 0 auto', display: "flex", flexFlow: "row", justifyContent: 'center',
                justifyItems: 'center', alignItems: 'center', borderRadius: '9999px',
              }}
            >
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="#ff5900" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-6 fill-gray"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.6565 7.75735L13.4138 12L17.6565 16.2426L16.2423 17.6568L11.9996 13.4142L7.75699 17.6568L6.34277 16.2426L10.5854 12L6.34277 7.75735L7.75699 6.34314L11.9996 10.5858L16.2423 6.34314L17.6565 7.75735Z" fill="inherit"></path></svg>
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
                33  حذف
              </button>
            </div>
            <div style={{ display: 'flex', padding: '0px 10px', flex: '1 1 47%' }}>
              <button
                // onClick={goToEdditAddressMap} 
                // onClick={() => {
                //   goToEdditAddressMap
                // }}
                onClick={(e) => {
                  alert('2');
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
  isEpmtyAdressList: boolean;
  setIsEpmtyAdressList: React.Dispatch<React.SetStateAction<boolean>>;
  refForBox: RefObject<HTMLDivElement | null>;

  responsedListFromApiSelectAddressList: responsedListFromApiSelectAddressListType[] | null;

  isEpmtyShowAddRemAddress: boolean;    //zare_nk_050207_added
  setIsEpmtyShowAddRemAddress: React.Dispatch<React.SetStateAction<boolean>>;    //zare_nk_050207_added
  showAddRemAddress: () => void;   //zare_nk_050207_added
};

// export function AdressListComponent({  //zare_nk_050206_commented
export const AdressListComponent = function AdressListComponent({  //zare_nk_050206_added
  isEpmtyAdressList,
  setIsEpmtyAdressList,
  refForBox,

  responsedListFromApiSelectAddressList,

  isEpmtyShowAddRemAddress,     //zare_nk_050207_added
  setIsEpmtyShowAddRemAddress,   //zare_nk_050207_added
  showAddRemAddress,   //zare_nk_050207_added
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
        if (!isEpmtyAdressList && !isToggleButton) {
          setIsEpmtyAdressList(true); // ببند
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
      // age in={false} beshe az dom hazf nemishe va dar inspect vojood dareh va faghat hidden mishe)
      > */}
    {/* zare_nk_050204_rahe1_end(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
    {/* zare_nk_050204_rahe2_st(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she(taghriban hamkhanevadeye modal hast)) */}
    <Drawer
      id="box"
      ref={refForBox}
      anchor="bottom"
      open={!isEpmtyAdressList}
      onClose={() => {
        console.log('zare_nk_050204-Drawer closed!');
        setIsEpmtyAdressList(true)
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
              id="closeAddresListBtn"  //zare_nk_050207_okk
              onClick={() => {
                setIsEpmtyAdressList(true);  //zare_nk_050207_okk
              }}
              style={{
                width: '32px', height: '32px', border: 'none', flex: '0 0 auto', display: "flex", flexFlow: "row", justifyContent: 'center',
                justifyItems: 'center', alignItems: 'center', borderRadius: '9999px',
              }}
            >
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="#ff5900" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-6 fill-gray"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.6565 7.75735L13.4138 12L17.6565 16.2426L16.2423 17.6568L11.9996 13.4142L7.75699 17.6568L6.34277 16.2426L10.5854 12L6.34277 7.75735L7.75699 6.34314L11.9996 10.5858L16.2423 6.34314L17.6565 7.75735Z" fill="inherit"></path></svg>
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
              id="closeAddresListBtn"
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

////zare_nk_050206_added_st 
// type SetApiSelectAddressListType = {  //zare_nk_050207_commented(baraye lafze karbordi)
type responsedListFromApiSelectAddressListType = {      //zare_nk_050207_added(baraye lafze karbordi)
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
////zare_nk_050206_added_end

////zare_nk_050207_added_st
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
////zare_nk_050207_added_end

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [isEpmtyAdressList, setIsEpmtyAdressList] = useState(true);
  const [isEpmtyShowAddRemAddress, setIsEpmtyShowAddRemAddress] = useState(true);   //zare_nk_050207_added

  // const [heightBox, setHeightBox] = useState<string>('0px');   //zare_nk_050203_commented
  const refForBox = useRef<HTMLDivElement | null>(null);
  const [boxHtml, setBoxHtml] = useState<any>(null);
  ////zare_nk_050117_add   ed_end

  // const { userData, login, logout } = useAuthentication(); //zare_nk_050111_added
  const { isLogin } = useAuthentication(); //zare_nk_050111_added
  console.log('zare_nk_050111-isLogin from context:', isLogin);

  // const [apiSelectAddressList, SetApiSelectAddressList] = useState<SetApiSelectAddressListType[] | null>(null);  //zare_nk_050206_added(and zare_nk_050207_commented(baraye lafze karbordi))
  const [responsedListFromApiSelectAddressList, SetResponsedListFromApiSelectAddressList] = useState<responsedListFromApiSelectAddressListType[] | null>(null);  //zare_nk_050207_added(baraye lafze karbordi)

  const router = useRouter();

  // const showDrawer = async () => {   //zare_nk_050207_commented(baraye lafze ashenatar)
  const showAddressListDrawer = async () => {     //zare_nk_050207_added(baraye lafze ashenatar)

    // setIsEpmtyAdressList(false);  //zare_nk_050205_comemnted
    ////zare_nk_050205_added_st
    let token = getCookie("token");

    if (!token) {
      alert('lotfan avval online shid');
      setError("lotfan avval online shid");
      return;
    }

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
        setIsEpmtyAdressList(false);  //zare_nk_050206_added

        // SetApiSelectAddressList(() => {  
        SetResponsedListFromApiSelectAddressList(() => {
          return parsedList
        });

      } else {
        // document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        // document.cookie = `google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        setError("متاسفانه خطایی رخ داده است34:" + data.errors);
        console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
      }
    } else {
      console.log("zare_nk_050110-!response.ok" + response.ok);
      // document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      // document.cookie = `google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      setError("متاسفانه خطایی رخ داده است35");
    }

    console.log('zare_nk_050110-token hala is: ' + getCookie("token"));
    if (token) {
      setIsEpmtyAdressList(false);
    }
    else {
      alert('lotfan avval online shid');
    }
    ////zare_nk_050205_added_end
  }

  ////zare_nk_050207_added_st
  const showAddRemAddress = async () => {
    setIsEpmtyShowAddRemAddress(false);
  }
  ////zare_nk_050207_added_end

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

        <div style={{ display: 'flex', padding: '0px 10px', flex: '1 1 47%', direction: 'rtl' }}>
          <button
            id="showAddressListDrawerBtn"
            // onClick={goToLogin}
            onClick={showAddressListDrawer}
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
            ورود یا عضویت
          </button>
        </div>

        <AdressListComponent
          isEpmtyAdressList={isEpmtyAdressList}
          setIsEpmtyAdressList={setIsEpmtyAdressList}
          refForBox={refForBox}

          responsedListFromApiSelectAddressList={responsedListFromApiSelectAddressList}

          isEpmtyShowAddRemAddress={isEpmtyShowAddRemAddress}           //zare_nk_050207_added
          setIsEpmtyShowAddRemAddress={setIsEpmtyShowAddRemAddress}     //zare_nk_050207_added
          showAddRemAddress={showAddRemAddress}
        />

      </main>
      <footer></footer>

      <div className="tabIndexOne-in-LayoutWrapper" tabIndex={1}>

      </div>
    </>
  );
}
