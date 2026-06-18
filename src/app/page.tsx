'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor,RefObject ,ReactNode,ChangeEvent,MouseEvent} from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import Styles from "@/styles/components/location.module.css";
import globalsStyles from "@/styles/components/globals.module.css";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken"; 

import { Collapse, Button, Box, Paper, Typography, Grow, ClickAwayListener, Drawer } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';  

// import "@neshan-maps-platform/ol/ol.css"   ////zare_nk_050328_commented(in safhe be naghshe niazi nist ke)

import { useAuthentication } from '../context/AuthenticationContext';  

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from "next/link";

import SwiperGrouplevel1Comp from '../components/SwiperGrouplevel1Comp';

import SwiperTapBestsComp from '../components/SwiperTapBestsComp';  //zare_nk_050305_added

import SwiperTopBanerComp from '../components/SwiperTopBanerComp';

import SwiperThinkBanerComp from '../components/SwiperthinkBanerComp';

import SwiperTapTimeComp from '../components/SwiperTapTimeComp';

import SwiperSecondBanerComp from '../components/SwiperSecondBanerComp';  //zare_nk_050305_added

import AdressListComponent from '../components/AdressListComponent';  //zare_nk_050328_added
// import Adressescomponent from '../components/Adressescomponent';  //zare_nk_050328_added

// import TestComponent from '../components/TestComponent';  ////zare_nk_050327_added_movaghat(componente testi tamrini hast)

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

////zare_nk_050328_commented_st
// type AdressescomponentType = {
//   responsedListFromApiSelectAddressList: responsedListFromApiSelectAddressListType[] | null;
//   isEpmtyShowAddRemAddress: boolean;
//   setIsEpmtyShowAddRemAddress: React.Dispatch<React.SetStateAction<boolean>>;
//   showAddRemAddress: () => void;
//   setIsEpmtyAdressList: React.Dispatch<React.SetStateAction<string | null>>;
//   showAddressListDrawer: () => void;
// };

// // export const Adressescomponent = function Adressescomponent({    ////zare_nk_050209_commented
// const Adressescomponent = function Adressescomponent({    ////zare_nk_050209_added
//   responsedListFromApiSelectAddressList,
//   isEpmtyShowAddRemAddress,
//   setIsEpmtyShowAddRemAddress,
//   showAddRemAddress,
//   setIsEpmtyAdressList,
//   showAddressListDrawer,
// }: AdressescomponentType) {

//   const router = useRouter();

//   const refForShowAddRemAddressBox = useRef<HTMLDivElement | null>(null);

//   const [responsedListFromApiRemoveAddress, SetResponsedListFromApiRemoveAddress] = useState<responsedListFromApiRemoveAddressType | null>(null);

//   const [rowItem, setRowItem] = useState<responsedListFromApiSelectAddressListType | null>(null);

//   const goToEdditAddressMap = (IdAdress: number) => {
//     // router.push("/folder03?tab=comments2");
//     // redirect("/login");
//     // alert('IdAdress:::: ' + IdAdress);  
//     router.push("/editaddress?IdAdress=" + IdAdress);
//   };

//   const RemoveAddress = async (IdAdress: number) => {
//     const token = getCookie("token");
//     // console.log('zare_nk_050110-RemoveAddress-token hala is: ' + getCookie("token"));

//     let ApiUrl = "https://api.tochikala.com/api/";
//     const response = await fetch(ApiUrl + "User/Api_DeleteAddress", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + token,
//       },
//       body: JSON.stringify({
//         'IdAdress': IdAdress,
//       }),
//     });
//     const data = await response.json();
//     if (response.ok) {
//       // console.log("zare_nk_050208-Api_DeleteAddress-data: " + JSON.stringify(data));
//       if (data.status == 0) {
//         // console.log("zare_nk_050208-Api_DeleteAddress-data.status is 0");
//         setIsEpmtyAdressList('notNull2');
//         showAddressListDrawer();
//       } else {
//         // setError("متاسفانه خطایی رخ داده است34:" + data.errors);
//         // console.log("zare_nk_050208-Api_DeleteAddress-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
//       }
//     } else {
//       // console.log("zare_nk_050208-Api_DeleteAddress-!response.ok" + response.ok);
//       // setError("متاسفانه خطایی رخ داده است35");
//     }
//   };

//   const chosenAddress = async (chosenAddressItem: responsedListFromApiSelectAddressListType) => {
//     // console.log('chosenAddressItem.IdAdress: ' + chosenAddressItem.IdAdress);
//     // document.cookie = `chosenAddress=${JSON.stringify(chosenAddressItem)}; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;  ////zare_nk_050210_nokteh(expires=Thu, 01 Jan 1970 00:00:00 UTC baese monghazi shodane cookie dar hamin khatte tarif mishe! pas 
//     //// majboorim ye tarikhe dastiy behesh badim,age mikhaim abadi basshe ye cookiye dastiye toolani behesh midim ke shabiye abadiye(age expires ra dasti nadim 
//     //// behesh pishfarz SessionCookie darnazar gerefteh mishe(yani moroorgar ro bebandim cookie hazf mishe) ) )
//     //// const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
//     const expires = new Date();
//     expires.setFullYear(expires.getFullYear() + 5);
//     const expiresString = expires.toUTCString();
//     // document.cookie = `chosenAddress=${JSON.stringify(chosenAddressItem)}; path=/; expires=${expiresString};secure; samesite=None`;
//     ////zare_nk_050210_nokteh(mamoolan JSON.stringify kefayat mikoneh, vali age matne cookie shamele characterhaye ; va ... bashe shayad barnameh eshtebahan anra 
//     //// beonvane jodakonandeh dar reshteye document.cookie darnazar begire va kharabkari koneh, pas encodeURIComponent tosiye mishavad)
//     document.cookie = `chosenAddress=${encodeURIComponent(
//       JSON.stringify(chosenAddressItem)
//     )}; path=/; expires=${expiresString};secure; samesite=None`;

//     const chosenAddress = getCookie("chosenAddress");
//     // alert('chosenAddress is: ' + chosenAddress);
//     var parsedChosenAddress = chosenAddress ? JSON.parse(chosenAddress) : null;
//     // alert('chosenAddress IdAdress is: ' + parsedChosenAddress.IdAdress);
//     setIsEpmtyAdressList(null);
//   }

//   return (<>
//     <div style={{ display: 'flex', flexFlow: 'column', padding: '0px', margin: '0px', }}>
//       {responsedListFromApiSelectAddressList?.map((item, index) => {
//         return (
//           <div
//             key={item.IdAdress}   ////zare_nk_050319_added
//             onClick={() => {
//               setRowItem(item);
//               chosenAddress(item);
//             }}
//             style={{
//               borderTop: '1px solid #2b364f14',
//               display: 'flex',
//               paddingBottom: '.75rem',
//               paddingTop: '.75rem',
//               gap: '.5rem',
//               justifyContent: 'space-between',
//               cursor: 'pointer',
//               height: 'min-content',
//               alignItems: 'center',
//             }}>
//             <button
//               id="locationBtnInEveryAddressRow"   //zare_nk_050208_nokteh(in dokmeh engar karbordi nadare va faghat ye design hast! badan shayad tabdilesh konam be ye tage div)
//               style={{
//                 backgroundColor: '#1b1c1d',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#eef0f1) 
//                 fill: 'white',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#a5abb1)  
//                 borderRadius: '9999px', justifyContent: 'center', alignItems: 'center', width: '2rem', height: '2rem', display: "flex", flexFlow: "row", border: 'none',
//                 flex: '0 0 auto',
//               }}
//             >
//               <svg style={{ width: '18px', height: '18px' }} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] fill-inherit"><g id="Location"><path id="Union" d="M11.99 2C7.34 2 3.5 5.72 3.5 10.32C3.5 12.64 4.34 14.79 5.73 16.61C7.25 18.62 9.13 20.37 11.27 21.75C11.8 22.09 12.24 22.07 12.73 21.75C14.85 20.37 16.74 18.62 18.27 16.61C19.66 14.79 20.5 12.63 20.5 10.32C20.5 5.72 16.66 2 11.99 2ZM11.99 13.33C10.45 13.33 9.19 12.12 9.19 10.58C9.19 9.04 10.45 7.78 11.99 7.78C13.53 7.78 14.8 9.05 14.8 10.58C14.8 12.11 13.53 13.33 11.99 13.33Z" fill="inherit"></path></g></svg>
//             </button>

//             <div
//               style={{
//                 paddingTop: '.5rem',
//                 display: 'flex',
//                 justifyContent: 'flex-start',
//                 alignItems: 'flex-start',
//                 flexFlow: 'column',
//                 flex: '1 1 0%',
//                 height: 'min-content',
//                 marginLeft: '.5rem',
//               }}
//             >
//               <span
//                 style={{
//                   color: '#1b1c1d',
//                   fontWeight: '500',
//                   fontSize: '.875rem',
//                   lineHeight: '1.25rem',
//                 }}
//               >
//                 {/* خونه */}
//                 {item.OnvanAdress ? item.OnvanAdress : 'خونه'}
//               </span>
//               <p
//                 style={{
//                   color: '#1b1c1d',  //zare_nk_050206_nokteh(age entekhab nabasheh: color:#a5abb1)   
//                   fontSize: '.75rem',
//                   lineHeight: '1rem',
//                   marginBottom: '0px',
//                 }}
//               >
//                 {/* خ. وحدت اسلامی، نرسیده به خ. مولوی، ک. غلامرضا زندی، خ. صالح زاده */}
//                 {item.Adress}
//               </p>
//             </div>

//             <button
//               id="showAddRemAddressBtn"
//               onClick={() => {
//                 // showAddRemAddress();  //zare_nk_050209_commented
//                 setIsEpmtyShowAddRemAddress(false);  //zare_nk_050209_added 
//                 setRowItem(item);  //zare_nk_050209_added 
//               }}
//               style={{
//                 // backgroundColor: '#1b1c1d',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#eef0f1)  
//                 backgroundColor: 'white',
//                 borderRadius: '9999px', justifyContent: 'center', alignItems: 'center', width: '2rem', height: '2rem', display: "flex", flexFlow: "row", border: 'none',
//                 flex: '0 0 auto',
//               }}
//             >
//               <svg style={{ width: '18px', height: '18px', fill: '#a5abb1', transform: 'rotate(90deg)', }} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-[18px] fill-gray-500 rotate-90"><g id="Info menu"><path id="Union" fill="inherit" fillRule="evenodd" clipRule="evenodd" d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"></path></g></svg>
//             </button>
//           </div>
//         )
//       })}
//       {rowItem &&
//         <ShowAddRemAddressComponent
//           key={rowItem.IdAdress}
//           refForShowAddRemAddressBox={refForShowAddRemAddressBox}
//           goToEdditAddressMap={() => {
//             // console.log('zare_nk_050209-sh01-edit-rowItem.IdAdress: ' + rowItem.IdAdress + '-rowItem.Fullname: ' + rowItem.Fullname);
//             goToEdditAddressMap(rowItem.IdAdress);
//           }}
//           RemoveAddress={() => {
//             // console.log('zare_nk_050209-sh01-rem-item.IdAdress: ' + rowItem.IdAdress + '-rowItem.Fullname: ' + rowItem.Fullname);   //item.IdAdress dar zamane click dar dom naberooz va notokk
//             RemoveAddress(rowItem.IdAdress);
//           }}

//           // responsedListFromApiEditAddress={responsedListFromApiEditAddress}  //zare_nk_050207_commented(chon aslan api editeAddresss ra dar in safhe nemizanim va dar safheye editAddress mizanim)
//           responsedListFromApiRemoveAddress={responsedListFromApiRemoveAddress}
//           isEpmtyShowAddRemAddress={isEpmtyShowAddRemAddress}
//           setIsEpmtyShowAddRemAddress={setIsEpmtyShowAddRemAddress}
//           showAddRemAddress={showAddRemAddress}
//           setRowItem={setRowItem}
//         />
//       }
//     </div>
//   </>);
// }
////zare_nk_050328_commented_end
////zare_nk_050328_commented_st
// ////zare_nk_050207_added_st(for ShowAddRemAddressList)
// type ShowAddRemAddressComponentType = {
//   refForShowAddRemAddressBox: RefObject<HTMLDivElement | null>;

//   // goToEdditAddressMap: (IdAdress: number) => void;  //zare_nk_050209_commented
//   goToEdditAddressMap: (e?: MouseEvent<HTMLButtonElement>) => void;  //zare_nk_050209_added

//   // RemoveAddress: (IdAdress: number) => void;  //zare_nk_050209_commented(ok fo btn)
//   RemoveAddress: (e?: MouseEvent<HTMLButtonElement>) => void;  //zare_nk_050209_added(ok fo btn)

//   // responsedListFromApiEditAddress: responsedListFromApiEditAddressType | null;         //zare_nk_050207_added(and zare_nk_050207_commented(chon aslan api editeAddresss ra dar in safhe nemizanim va dar safheye editAddress mizanim))           
//   responsedListFromApiRemoveAddress: responsedListFromApiRemoveAddressType | null;     //zare_nk_050207_added         

//   isEpmtyShowAddRemAddress: boolean;
//   setIsEpmtyShowAddRemAddress: React.Dispatch<React.SetStateAction<boolean>>;
//   showAddRemAddress: () => void;
//   setRowItem: React.Dispatch<React.SetStateAction<responsedListFromApiSelectAddressListType | null>>;
// };

// // export const ShowAddRemAddressComponent = function ShowAddRemAddressComponent({    //zare_nk_050209_commented
// const ShowAddRemAddressComponent = function ShowAddRemAddressComponent({     //zare_nk_050209_added
//   refForShowAddRemAddressBox,
//   goToEdditAddressMap,
//   RemoveAddress,

//   // responsedListFromApiEditAddress,   //zare_nk_050207_commented(chon aslan api editeAddresss ra dar in safhe nemizanim va dar safheye editAddress mizanim))
//   responsedListFromApiRemoveAddress,

//   isEpmtyShowAddRemAddress,
//   setIsEpmtyShowAddRemAddress,
//   showAddRemAddress,
//   setRowItem,    //zare_nk_050209_added

// }: ShowAddRemAddressComponentType) {
//   const router = useRouter();

//   // const [error, setError] = useState<string | null>(null);  //zare_nk_050207_commented
//   const [errorInShowAddRemAddressComponent, setErrorInShowAddRemAddressComponent] = useState<string | null>(null);    //zare_nk_050207_added

//   const refForEditAddressBtn = useRef<HTMLButtonElement | null>(null);

//   return (<>
//     <Drawer
//       id="box"
//       ref={refForShowAddRemAddressBox}
//       anchor="bottom"
//       open={!isEpmtyShowAddRemAddress}
//       onClose={() => {
//         setIsEpmtyShowAddRemAddress(true);
//       }}
//       // hideBackdrop={true} ////zare_nk_040502(albateh hideBackdrop={true} baes mishe alave bar hazfe tariye poshte drawer,ba click dar fazaye poshtesh,automat 
//       //// basteh nashe va niaz be modiriate dastiye document.addEventListener dar useEffect dashteh bashim) 
//       slotProps={{
//         paper: {
//           sx: {
//             width: '450px', ////zare_nk_050206_added(chon Drawer dar DOM kharej az componente pedaresh mireh va be risheye body mire, pas 100% body ro migireh na 100% taghi
//             //// ke dar component beonvane tage pedaresh tarif kardim,pas bejaye width:100% majboorim dasti arze 450 ro behesh bedim)
//             ////zare_nk_050206_commented_st(baraye vasat raftane ofoghiye Drawer ke javab nadad(translate kar nakard,chon ba codehaye dakheliye Drawer MUI tadakhol dareh))
//             // left: '50%', 
//             // transform: 'translate(-50%, 0%)', 
//             ////zare_nk_050206_commented_end(baraye vasat raftane ofoghiye Drawer ke javab nadad(translate kar nakard, chon ba codehaye dakheliye Drawer MUI tadakhol dareh))
//             margin: '0 auto',  ////zare_nk_050206_added(baraye vasat raftane ofoghiye Drawer ke javab dad)
//             direction: 'rtl',  //zare_nk_050206_added
//             borderRadius: '20px 20px 0 0',
//             boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
//             backgroundColor: 'white',
//           },
//         },
//         ////zare_nk_050204_nokteh(chon ba hideBackdrop={true} goftim range fazaya poshtesh ro nemikhaim tagheir bedim pas backdrop ro comment kardim)
//         backdrop: {
//           sx: {
//             backgroundColor: 'rgba(0,0,0,0.3)',
//           },
//         },
//       }}
//       ModalProps={{
//         keepMounted: true,
//       }}
//     >
//       {errorInShowAddRemAddressComponent && <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>{errorInShowAddRemAddressComponent}</p>}

//       <Box sx={{
//       }}>
//         <div
//           id="addRemAddressHeader"
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             flexDirection: 'column',
//             flex: '0 0 auto',
//             width: '100%',
//           }}
//         >
//           <div
//             style={{
//               opacity: '1',
//               backgroundColor: '#eaeaeb',
//               borderRadius: '20px',
//               flex: '0 0 auto',
//               width: '2.5rem',
//               height: '.25rem',
//               marginTop: '.75rem',
//             }}
//           ></div>

//           <div style={{ padding: '1rem', justifyContent: 'space-between', alignItems: 'center', flex: '0 0 auto', width: '100%', height: '3.5rem', display: 'flex', }}>
//             <span style={{ color: "#1b1c1d", fontSize: '16px', flex: '0 0 auto', }}>انتخاب آدرس</span>
//             <button
//               id="closeAddRemAddressBtn"
//               onClick={() => {
//                 setIsEpmtyShowAddRemAddress(true);
//                 setRowItem(null);
//               }}
//               style={{
//                 width: '32px', height: '32px', border: 'none', flex: '0 0 auto', display: "flex", flexFlow: "row", justifyContent: 'center',
//                 justifyItems: 'center', alignItems: 'center', borderRadius: '9999px',
//               }}
//             >
//               <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="#ff5900" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-6 fill-gray"><path fillRule="evenodd" clipRule="evenodd" d="M17.6565 7.75735L13.4138 12L17.6565 16.2426L16.2423 17.6568L11.9996 13.4142L7.75699 17.6568L6.34277 16.2426L10.5854 12L6.34277 7.75735L7.75699 6.34314L11.9996 10.5858L16.2423 6.34314L17.6565 7.75735Z" fill="inherit"></path></svg>
//             </button>
//           </div>

//         </div>

//         <div style={{
//           paddingBottom: '1.75rem', paddingLeft: '1rem', paddingRight: '1rem', flex: '1 1 0%', width: '100%', marginTop: '1rem',
//         }}>
//           <div className="btn-cont" style={{
//             display: 'flex', width: '100%', flexFlow: 'row-reverse', flexWrap: 'wrap', marginBottom: '2rem',
//             columnGap: '1rem', backgroundColor: 'inherit',
//           }} >
//             <div style={{ display: 'flex', padding: '0px 10px', flex: '1 1 47%' }}>
//               <button
//                 onClick={(e) => {
//                   RemoveAddress(e);
//                   setIsEpmtyShowAddRemAddress(true);
//                 }}
//                 // onClick={RemoveAddress} 
//                 style={{
//                   borderRadius: 10,
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   flexDirection: 'row',
//                   padding: 7,
//                   // backgroundColor: '#ffffff',
//                   backgroundColor: '#f3f2f2',  //  #ededed 
//                   color: '#242424',
//                   border: 'none',
//                   fontSize: '15px',
//                   width: '100%',
//                   height: '50px',
//                 }}>
//                 حذف
//               </button>
//             </div>
//             <div style={{ display: 'flex', padding: '0px 10px', flex: '1 1 47%' }}>
//               <button
//                 // onClick={goToEdditAddressMap} 
//                 // onClick={() => {
//                 //   goToEdditAddressMap
//                 // }}
//                 onClick={(e) => {
//                   goToEdditAddressMap(e);
//                 }}
//                 style={{
//                   borderRadius: 10,
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   flexDirection: 'row',
//                   padding: 7,
//                   backgroundColor: '#ff5900',
//                   color: 'white',
//                   border: 'none',
//                   fontSize: '15px',
//                   width: '100%',
//                   height: '50px',
//                 }}>
//                 ویرایش ادرس
//               </button>
//             </div>
//           </div>
//         </div>
//       </Box>
//       {/* zare_nk_050204_rahe2_st(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
//     </Drawer >
//   </>)
// }
// ////zare_nk_050207_added_end(for ShowAddRemAddressList)
////zare_nk_050328_commented_end


////zare_nk_050328_commented_st
// type AdressListComponentType = {
//   // isEpmtyAdressList: boolean;    //zare_nk_050209_commented
//   isEpmtyAdressList: string | null;    //zare_nk_050209_added
//   // setIsEpmtyAdressList: React.Dispatch<React.SetStateAction<boolean>>;     //zare_nk_050209_commented
//   setIsEpmtyAdressList: React.Dispatch<React.SetStateAction<string | null>>;   //zare_nk_050209_added
//   refForBox: RefObject<HTMLDivElement | null>;
//   responsedListFromApiSelectAddressList: responsedListFromApiSelectAddressListType[] | null;
//   isEpmtyShowAddRemAddress: boolean;    //zare_nk_050207_added
//   setIsEpmtyShowAddRemAddress: React.Dispatch<React.SetStateAction<boolean>>;    //zare_nk_050207_added
//   showAddRemAddress: () => void;   //zare_nk_050207_added
//   showAddressListDrawer: () => void;   //zare_nk_050209_added
// };

// // export const AdressListComponent = function AdressListComponent({      //zare_nk_050209_commented
// const AdressListComponent = function AdressListComponent({      //zare_nk_050209_added
//   isEpmtyAdressList,
//   setIsEpmtyAdressList,
//   refForBox,
//   responsedListFromApiSelectAddressList,
//   isEpmtyShowAddRemAddress,
//   setIsEpmtyShowAddRemAddress,
//   showAddRemAddress,
//   showAddressListDrawer,
// }: AdressListComponentType) {
//   // console.log('zare_nk_050126_AdressListComponent called!!-isEpmtyAdressList: ' + isEpmtyAdressList);

//   const router = useRouter();

//   const [error, setError] = useState<string | null>(null);

//   const goToMap = () => {
//     // router.push("/folder03?tab=comments2");
//     // redirect("/login");
//     router.replace("/location");
//   };

//   return (<>
//     {/* zare_nk_050204_rahe1_st(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
//     {/* zare_nk_050204_nokteh(ClickAwayListener componente MUI hast ke rooyadade click kharej az taghayei ke dar mohtavayash moshakhas mikonim ra modiriat mikonih, 
// va jaigozine khoobi baraye neveshtane dastiye rooydade click dar useEffect hast) */}
//     {/* <ClickAwayListener
//       onClickAway={(event) => {
//         const target = event.target as HTMLElement;
//         const isToggleButton = target.id === 'showDrawerBtn';
//         if (isEpmtyAdressList!=null && !isToggleButton) {
//           setIsEpmtyAdressList(null); // ببند
//         }
//       }}
//     >
//       <Collapse
//         ref={refForBox}
//         id="box"
//         style={{
//           position: 'absolute',
//           bottom: '0px',
//           backgroundColor: 'white',
//           borderRadius: '20px 20px 0px 0px',
//           boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)',
//         }}
//         in={!isEpmtyAdressList} //zare_nk_050202_nokteh(moadele show() va hide() dar bootstrap) 
//         timeout="auto"
//         unmountOnExit  //zare_nk_050202_nokteh(age in attribute ra benevisim age in={false} beshe az dom hazf mishe,age in attribute ra nanevisim 
//       //// age in={false} beshe az dom hazf nemishe va dar inspect vojood dareh va faghat hidden mishe)
//       > */}
//     {/* zare_nk_050204_rahe1_end(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
//     {/* zare_nk_050204_rahe2_st(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she(taghriban hamkhanevadeye modal hast)) */}
//     <Drawer
//       id="box"
//       ref={refForBox}
//       anchor="bottom"
//       open={isEpmtyAdressList != null}
//       onClose={() => {
//         // console.log('zare_nk_050204-Drawer closed!');
//         setIsEpmtyAdressList(null)
//       }}
//       // hideBackdrop={true} //zare_nk_040502(albateh hideBackdrop={true} baes mishe alave bar hazfe tariye poshte drawer, ba click dar fazaye poshtesh,automat 
//       // basteh nashe va niaz be modiriate dastiye document.addEventListener dar useEffect dashteh bashim) 
//       slotProps={{
//         paper: {
//           sx: {
//             width: '450px', ////zare_nk_050206_added(chon Drawer dar DOM kharej az componente pedaresh mireh va be risheye body mire, pas 100% body ro migireh na 100% taghi
//             //// ke dar component beonvane tage pedaresh tarif kardim,pas bejaye width:100% majboorim dasti arze 450 ro behesh bedim)
//             ////zare_nk_050206_commented_st(baraye vasat raftane ofoghiye Drawer ke javab nadad(translate kar nakard,chon ba codehaye dakheliye Drawer MUI tadakhol dareh))
//             // left: '50%', 
//             // transform: 'translate(-50%, 0%)', 
//             ////zare_nk_050206_commented_end(baraye vasat raftane ofoghiye Drawer ke javab nadad(translate kar nakard,chon ba codehaye dakheliye Drawer MUI tadakhol dareh))
//             margin: '0 auto',  ////zare_nk_050206_added(baraye vasat raftane ofoghiye Drawer ke javab dad)
//             direction: 'rtl',  //zare_nk_050206_added
//             borderRadius: '20px 20px 0 0',
//             boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
//             backgroundColor: 'white',
//           },
//         },
//         ////zare_nk_050204_nokteh(chon ba hideBackdrop={true} goftim range fazaya poshtesh ro nemikhaim tagheir bedim pas backdrop ro comment kardim)
//         backdrop: {
//           sx: {
//             backgroundColor: 'rgba(0,0,0,0.3)',
//           },
//         },
//       }}
//       ModalProps={{
//         keepMounted: true,
//       }}
//     >
//       {/* zare_nk_050204_rahe2_end(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she(taghriban hamkhanevadeye modal hast)) */}
//       {error && <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>{error}</p>}
//       <Box sx={{
//       }}>
//         <div
//           id="addressListHeader"
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             flexDirection: 'column',
//             flex: '0 0 auto',
//             width: '100%',
//           }}
//         >
//           <div
//             style={{
//               opacity: '1',
//               backgroundColor: '#eaeaeb',
//               borderRadius: '20px',
//               flex: '0 0 auto',
//               width: '2.5rem',
//               height: '.25rem',
//               marginTop: '.75rem',
//             }}
//           ></div>

//           <div style={{ padding: '1rem', justifyContent: 'space-between', alignItems: 'center', flex: '0 0 auto', width: '100%', height: '3.5rem', display: 'flex', }}>
//             <span style={{ color: "#1b1c1d", fontSize: '16px', flex: '0 0 auto', }}>انتخاب آدرس</span>
//             <button
//               id="closeAddresListBtn"
//               onClick={() => {
//                 setIsEpmtyAdressList(null);  //zare_nk_050221_nulle alan moadele truye versione ghbli hast-va meghdare stringi ham moadele false versione ghabli hast
//               }}
//               style={{
//                 width: '32px', height: '32px', border: 'none', flex: '0 0 auto', display: "flex", flexFlow: "row", justifyContent: 'center',
//                 justifyItems: 'center', alignItems: 'center', borderRadius: '9999px',
//               }}
//             >
//               <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="#ff5900" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-6 fill-gray"><path fillRule="evenodd" clipRule="evenodd" d="M17.6565 7.75735L13.4138 12L17.6565 16.2426L16.2423 17.6568L11.9996 13.4142L7.75699 17.6568L6.34277 16.2426L10.5854 12L6.34277 7.75735L7.75699 6.34314L11.9996 10.5858L16.2423 6.34314L17.6565 7.75735Z" fill="inherit"></path></svg>
//             </button>
//           </div>

//         </div>

//         <div style={{
//           paddingBottom: '1.75rem', paddingLeft: '1rem', paddingRight: '1rem', flex: '1 1 0%', width: '100%', marginTop: '1rem',
//         }}>

//           <p style={{
//             color: '#63676e',
//             fontSize: '.875rem',
//             lineHeight: '1.25rem',
//             marginBottom: '.5rem',
//           }}>
//             لطفا آدرس تحویل سفارش را انتخاب کنید.
//           </p>

//           <div style={{
//             gap: '.5rem', justifyContent: 'flex-start', alignItems: 'center', cursor: 'pointer', height: '3.5rem', display: 'flex',
//           }}>
//             <button
//               id="goToMapBtn"
//               onClick={goToMap}
//               style={{
//                 backgroundColor: '#fff7eb',
//                 width: '32px', height: '32px', border: 'none', flex: '0 0 auto', display: "flex",
//                 flexFlow: "row", justifyContent: 'center', justifyItems: 'center', alignItems: 'center', borderRadius: '9999px',

//               }}
//             >
//               <svg style={{ height: ' 1.25rem', width: '1.25rem', fill: "#ff5900" }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5 fill-primary-600"><path d="M18 11.25H12.75V6C12.75 5.59 12.41 5.25 12 5.25C11.59 5.25 11.25 5.59 11.25 6V11.25H6C5.59 11.25 5.25 11.59 5.25 12C5.25 12.41 5.59 12.75 6 12.75H11.25V18C11.25 18.41 11.59 18.75 12 18.75C12.41 18.75 12.75 18.41 12.75 18V12.75H18C18.41 12.75 18.75 12.41 18.75 12C18.75 11.59 18.41 11.25 18 11.25Z" fill="inherit"></path></svg>
//             </button>
//             <span style={{
//               color: "#ff5900",
//               flex: '0 0 auto',
//               fontSize: '.875rem',
//               lineHeight: "1.25rem",
//             }}>آدرس جدید</span>
//           </div>

//           {/* zare_nk_050206_added_addressHa_st(behtare dar componenti joda sedash bezanim ke maghadir ra ba api por koneh) */}
//           <Adressescomponent
//             responsedListFromApiSelectAddressList={responsedListFromApiSelectAddressList}
//             isEpmtyShowAddRemAddress={isEpmtyShowAddRemAddress}
//             setIsEpmtyShowAddRemAddress={setIsEpmtyShowAddRemAddress}
//             showAddRemAddress={showAddRemAddress}
//             setIsEpmtyAdressList={setIsEpmtyAdressList}
//             showAddressListDrawer={showAddressListDrawer}
//           />
//           {/* zare_nk_050206_added_addressHa_end(behtare dar componenti joda sedash bezanim ke maghadir ra ba api por koneh) */}
//         </div>
//       </Box>
//       {/* zare_nk_050204_rahe2_st(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
//     </Drawer >
//     {/* zare_nk_050204_rahe2_end(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}

//     {/* zare_nk_050204_rahe1_st(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
//     {/* </Collapse>
//     </ClickAwayListener> */}
//     {/* zare_nk_050204_rahe1_end(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
//   </>)
// }
////zare_nk_050328_commented_end

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

////zare_nk_050328_commented_st
// type responsedListFromApiRemoveAddressType = {
//   IdAdress: number;
//   // IdUser: number;
//   // Adress: string;
//   // CodePosti: string;
//   // Lon: number;
//   // Lat: number;
//   // Mobile: number;
//   // FName: string;
//   // LName: string;
//   // OnvanAdress: string;
//   // Fullname: string;

//   [key: string]: any;
// };
////zare_nk_050328_commented_end

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [isEpmtyAdressList, setIsEpmtyAdressList] = useState<string | null>(null);
  const [isEpmtyShowAddRemAddress, setIsEpmtyShowAddRemAddress] = useState(true);

  const refForBox = useRef<HTMLDivElement | null>(null);

  // const { userData, login, logout } = useAuthentication(); //zare_nk_050111_added
  const { isLogin } = useAuthentication(); //zare_nk_050111_added //zare_nk_050221_tahlilshe(ke chera estefadeh nashod)
  console.log('050329-Page rendered!!');   ////zare_nk_050327_tahlilshe

  const [responsedListFromApiSelectAddressList, SetResponsedListFromApiSelectAddressList] = useState<responsedListFromApiSelectAddressListType[] | null>(null);

  const [currentAddress, setCurrentAddress] = useState<any>(null);   ////zare_nk_050317_added

  const router = useRouter();

  const showAddressListDrawer = async () => {
    let token = getCookie("token");
    if (!token) {
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
      // console.log("zare_nk_050206-data: " + JSON.stringify(data));
      if (data.status == 0) {
        var parsedList = JSON.parse(data.data.list);
        // console.log("zare_nk_050206-parsedList1: " + parsedList[0].Adress);
        // console.log("zare_nk_050206-parsedList2: " + parsedList[1].Adress);
        setIsEpmtyAdressList('notNull');

        SetResponsedListFromApiSelectAddressList(() => {
          return parsedList
        });

      } else {
        setError("متاسفانه خطایی رخ داده است34:" + data.errors);
        // console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
        ////zare_nk_050221_nokteh(setIsEpmtyAdressList(null); ro bezarim??)
      }
    } else {
      // console.log("zare_nk_050110-!response.ok" + response.ok);
      setError("متاسفانه خطایی رخ داده است35");
      ////zare_nk_050221_nokteh(setIsEpmtyAdressList(null); ro bezarim??)
    }

    // console.log('zare_nk_050110-token hala is: ' + getCookie("token"));
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
    ////zare_nk_050317_added_st
    const chosenAddress = getCookie("chosenAddress");
    // alert('chosenAddress is: ' + chosenAddress);
    var parsedChosenAddress = chosenAddress ? JSON.parse(chosenAddress) : null;
    // alert('chosenAddress IdAdress is: ' + parsedChosenAddress.IdAdress);
    setCurrentAddress(parsedChosenAddress);    ////zare_nk_050327_commented_movaghat(baraye teste reRenderhaye componentha movaghat comment shod)
    ////zare_nk_050317_added_end

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
  }, [isEpmtyAdressList]);
  ////IsEpmtyAdressList
  ////zare_nk_050226_added_end

  const showAddRemAddress = async () => {
    setIsEpmtyShowAddRemAddress(false);
  }

  ////zare_nk_050327_added_movaghat_st(pakkardani va tamrini)
  // const [testState, SetTestState] = useState<number>(1);
  // const [testState2, SetTestState2] = useState<number>(1);

  // useEffect(() => {
  //   // SetTestState2(2); 
  //   // useCalback1;
  // }, []);

  // function func33() {
  //   console.log('zare_nk_050327-func33 called!!');
  //   return SetTestState2((c) => c + 1);
  //   // return 200;
  // }

  // const useCalback1 =  useCallback(
  //   () => {  ////zare_nk_050327_nokteh(chon in tabe be farzand pas dadeh shodeh,hamvareh pedar reRender beshe farzand ham reRender mishe
  //     //// nabayad setStati ke seda zadeh nashodeh baese in reRender beshe, vali react injooriyeh! va age pedare reRender beshe ba har setStati hatta gheir az in 
  //     // setState() ke seda zadeh nashod) farzand ham reRender mishe(chareye kar useCallback hast ke react manteghi beshe va faghat zamani ke in setState seda 
  //     //// zadeh mishe farzand ro reRender mikoneh(dar zemn useCalback ham bedoone memo boodane farzand fayedehi nadareh, chon dar in soorat farzand hamvareh seda 
  //     //// zadeh mishe ba rendere pedar)))
  //     // return SetTestState2(2);
  //     SetTestState((cur) => {
  //       return 5;
  //     });
  //   } , [testState]);
  ////zare_nk_050327_added_movaghat_end(pakkardani va tamrini)
 
  return (
    <>
      {/*<button onClick={() => { func33() }}>for func3</button> 
       <TestComponent testState={testState} SetTestState={useCalback1} /> */}       

      <SwiperThinkBanerComp  />      

      <header style={{
        position: 'sticky',
        top: '0px',
        boxShadow: '0px 3px 2px -1px #d7d6d6',
        display: 'flex',
        flexFlow: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px',
        zIndex: 899,
        backgroundColor: 'white',
      }}>

        <button
          id="showAddressListDrawerBtn"
          onClick={showAddressListDrawer}   //zare_nk_050215_commented_movaghat(baraye synce hadafmand)
          style={{
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'inherit',
            border: 'none',
            fontSize: '.875rem',
            cursor: "pointer",
          }}>

          <span
            style={{
              fontSize: '.875rem',
              lineHeight: '1.25rem',
              color: '#878b92',
              textAlign: "right",
            }}
          >ارسال به</span>
          <div style={{
            display: 'flex',
            flexFlow: 'row',
            direction: 'rtl',
            color: '#313335',
            minWidth: '124px',
            maxWidth: '256px',
            gap: '.5rem',
          }}>
            {/* zare_nk_050317_alan */}
            <span style={{ textAlign: "right", }}>
              {/* خونه */}
              {currentAddress?.OnvanAdress ? currentAddress.OnvanAdress : 'خونه'}
            </span>

            {/* <span style={{ textAlign: "right", }}> 
              {currentAddress?.Adress ? currentAddress.Adress : 'آدرسسس'}
            </span> */}

            <div style={{
              fontSize: '0.875rem',
              color: '#1b1c1d',

              // این بخش برای سه‌نقطه و محدودیت ۲ خط
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',

              // این بخش برای تثبیت ارتفاع روی ۴۰ پیکسل 
              lineHeight: '1.25rem',
              // height: '2.5rem',
              height: '1.25rem',

              minHeight: '1.25rem',  // minHeight: '2.5rem', // اجبار به کمتر نشدن
              maxHeight: '1.25rem',  // maxHeight: '2.5rem', // اجبار به بیشتر نشدن
              boxSizing: 'border-box', // برای اینکه بُردر (border) به ارتفاع اضافه نشود

              textAlign: 'right',
            }}>
              {currentAddress?.Adress ? currentAddress.Adress : 'آدرسسس'}
            </div>

            <img
              src="/images/header/getAddresses.svg"
              alt=" ادرس ها"
            />
            {/* <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="inherit" class="size-6 shrink-0 fill-gray-950 rotate-90"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.55017 15.5355L12.085 12.0007L8.55017 8.46445L9.96438 7.05023L14.9141 12L9.96438 16.9497L8.55017 15.5355Z" fill="inherit"></path></svg> */}
          </div>

        </button>

        <button
          id="goShoppingBacketBtn"
          onClick={showAddressListDrawer}
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'inherit',
            border: 'none',
            fontSize: '.875rem',
            height: '50px',
            cursor: "pointer",
          }}>
          <img
            src="/images/header/shoppingBacket.svg"
            alt="سبد خرید"
          />
        </button>
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
          // border: '3px solid orange',
          direction: 'rtl',
          // paddingTop: '10px',   
        }}>

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

        {/* zare_nk_050226_nokteh_st(dokmehaye navigation va pagination dasti(jahate olgu gozashtim)) */}
        {/* <button className='swiper-button-next2' ref={refForwiperButtonNext}>
          برو بعدی
        </button>
        <button className='swiper-button-prev' ref={refForwiperButtonPrev}>
          برو قبلی
        </button> */}

        {/* <div className="swiper-pagination"></div>   */}
        {/* zare_nk_050226_nokteh_end(dokmehaye navigation va pagination dasti(jahate olgu gozashtim)) */}

        <div style={{ marginBottom: '.75rem' }}></div>

        {/* <SwiperTopBanerComp /> */}

        <div style={{ marginBottom: '1.3rem' }}></div>

        {/* <SwiperGrouplevel1Comp /> */}

        {/* <SwiperTapBestsComp /> */}

        <div style={{ marginBottom: '1.5rem' }}></div>

        {/* <SwiperSecondBanerComp /> */}

        <div style={{ marginBottom: '1.5rem' }}></div>

        {/* <SwiperTapTimeComp /> */}
      </main>
      <footer></footer>

      <div className="tabIndexOne-in-LayoutWrapper" tabIndex={1}>
      </div>
    </>
  );
}
