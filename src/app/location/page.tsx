////zare_nk_050225_okk
"use client";
import { useState, useEffect, useRef, useCallback, JSXElementConstructor } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Styles from "@/styles/components/location.module.css";
import globalsStyles from "@/styles/components/globals.module.css";
import { RefObject } from "react";
import { ReactNode } from "react";
import { ChangeEvent } from "react";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { factchecktools } from "googleapis/build/src/apis/factchecktools";

import { Collapse, Button, Box, Paper, Typography, Grow, ClickAwayListener, Drawer } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'; //zare_nk_050204_added(for use Dialog(shabihe modal bootstrap))

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

import { useAuthentication } from '../../context/AuthenticationContext';  //zare_nk_050111_added

function getCookie(name: any) {
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

type BoxHtmlComponentType = {
  isEpmtyHeightBox: boolean;
  setIsEpmtyHeightBox: React.Dispatch<React.SetStateAction<boolean>>;
  refForBox: RefObject<HTMLDivElement | null>;
  saveAddress: (isOnline: boolean) => void;
  addressFormInputsVal: any;   //zare_nk_050205_added(noe any update she)
  setAddressFormInputsVal: React.Dispatch<React.SetStateAction<any>>;   //zare_nk_050205_added(noe any update she)
};

function BoxHtmlComponent({
  isEpmtyHeightBox,
  setIsEpmtyHeightBox,
  refForBox,
  saveAddress,
  addressFormInputsVal,
  setAddressFormInputsVal
}: BoxHtmlComponentType) {
  console.log('zare_nk_050126_BoxHtmlComponent called!!-isEpmtyHeightBox: ' + isEpmtyHeightBox);

  const [error, setError] = useState<string | null>(null);

  type AddressFormInputsMatnErrorType = {
    Address: string | null;
    pelak: string | null;
    vahed: string | null;
    addressName: string | null;
  };

  const [addressFormInputsMatnError, setAddressFormInputsMatnError] = useState<AddressFormInputsMatnErrorType>({
    Address: '',
    pelak: '',
    vahed: '',
    addressName: '',
  });

  type IsAddressFormInputsFocusedType = {
    Address: boolean;
    pelak: boolean;
    vahed: boolean;
    addressName: boolean;
  };

  const [isAddressFormInputsFocused, setIsAddressFormInputsFocused] = useState<IsAddressFormInputsFocusedType>({
    Address: false,
    pelak: false,
    vahed: false,
    addressName: false,
  });

  type IsAddressFormInputsTextType = {
    Address: boolean;
    pelak: boolean;
    vahed: boolean;
    addressName: boolean;
  };

  // const [isAddressFormInputsTextEmty, setIsAddressFormInputsTextEmty] = useState<boolean[]>(Array(4).fill(true));   //zare_nk_050208_nokteh(state arayeei)   
  const [isAddressFormInputsTextEmty, setIsAddressFormInputsTextEmty] = useState<IsAddressFormInputsTextType>({   //zare_nk_050208_nokteh(state objecti)
    Address: true,
    pelak: true,
    vahed: true,
    addressName: true,
  });

  type RefForAddressFormInputsType = {
    Address: HTMLTextAreaElement | null;
    pelak: HTMLInputElement | null;
    vahed: HTMLInputElement | null;
    addressName: HTMLInputElement | null;
  };

  // const refForAddressInput = useRef<(HTMLTextAreaElement | null)>(null); //zare_nk_050206_nokteh(chon baraye yek tage na araye lazemeh na object)
  // const refForAddressFormInputs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([]); //zare_nk_050206_nokteh(chon baraye chandin tage araye gozashtim)
  const refForAddressFormInputs = useRef<RefForAddressFormInputsType>({  //zare_nk_050206_nokteh(chon baraye chandin tage object gozashtim)
    Address: null,
    pelak: null,
    vahed: null,
    addressName: null,
  });

  ////zare_nk_050206_nokteh(yek rooydade moshtarak baraye chandin tag(voroodiye chandin tag ro migireh, khoroojiye chandin tag ro mideh))
  const handleAddressFormInputsFocus = (eventOrElement: ChangeEvent<HTMLInputElement> | HTMLInputElement | ChangeEvent<HTMLTextAreaElement> | HTMLTextAreaElement | null) => {
    var inputsName = '';
    let input: HTMLInputElement | HTMLTextAreaElement | null = null;
    // let vall: string = "";
    if (eventOrElement && "target" in eventOrElement) {
      input = eventOrElement.target;
      // vall = input.value;
      inputsName = input.name;
    } else {
      input = eventOrElement;
      // vall = input?.value ?? "";
      inputsName = input?.name ?? "";
    }
    // setIsAddressInputFocused(true);
    setIsAddressFormInputsFocused((cur) => {
      return (
        { ...cur, [inputsName]: true }
      );
    });
  };

  ////zare_nk_050206_nokteh(yek rooydade moshtarak baraye chandin tag(voroodiye chandin tag ro migireh, khoroojiye chandin tag ro mideh))
  const handleAddressFormInputsBlur = (eventOrElement: ChangeEvent<HTMLInputElement> | HTMLInputElement | ChangeEvent<HTMLTextAreaElement> | HTMLTextAreaElement | null) => {
    var inputsName = '';
    let input: HTMLInputElement | HTMLTextAreaElement | null = null;
    // let vall: string = "";
    if (eventOrElement && "target" in eventOrElement) {
      input = eventOrElement.target;
      // vall = input.value;
      inputsName = input.name;
    } else {
      input = eventOrElement;
      // vall = input?.value ?? "";
      inputsName = input?.name ?? "";
    }
    // setIsAddressInputFocused(true);
    setIsAddressFormInputsFocused((cur) => {
      return (
        { ...cur, [inputsName]: false }
      );
    });
  };

  ////zare_nk_050206_nokteh001_st(yek rooydade ekhtesasi baraye yek tag(voroodiye yek tag ro migireh, khoroojiye yek tag ro mideh)) 
  // const handleAddressInputFocus = () => {
  //   // setIsInputFocused(true);
  //   setIsAddressInputFocused(true);
  // };

  // const handleAddressInputBlur = () => {
  //   // setIsInputFocused(false);
  //   setIsAddressInputFocused(false);
  // };

  // const handlePelakInputFocus = () => {
  //   setIsPelakInputFocused(true);
  // };

  // const handlePelakInputBlur = () => {
  //   setIsPelakInputFocused(false);
  // };

  // const handleVahedInputFocus = () => {
  //   setIsVahedInputFocused(true);
  // };

  // const handleVahedInputBlur = () => {
  //   setIsVahedInputFocused(false);
  // };

  // const handleAddressNameInputFocus = () => {
  //   setIsAddressNameInputFocused(true);
  // };

  // const handleAddressNameInputBlur = () => {
  //   setIsAddressNameInputFocused(false);
  // }; 
  ////zare_nk_050206_nokteh001_end(yek rooydade ekhtesasi baraye yek tag(voroodiye yek tag ro migireh, khoroojiye yek tag ro mideh))

  const refForSaveAddressFormInputsBtn = useRef<HTMLButtonElement | null>(null);
  const [isDisabledsaveAddressFormInputsBtn, setIsDisabledsaveAddressFormInputsBtn] = useState(true);

  ////zare_nk_050206_nokteh002(yek rooydade ekhtesasi baraye yek tag(voroodiye yek tag ro migireh, khoroojiye yek tag ro mideh))
  // function addressMatnChanged(
  //   eventOrElement: ChangeEvent<HTMLTextAreaElement> | HTMLTextAreaElement | null
  // ) { 
  ////zare_nk_050206_nokteh002(yek rooydade moshtarak baraye chandin tag(voroodiye chandin tag ro migireh, khoroojiye chandin tag ro mideh))
  function AddressFormInputsChanged(
    eventOrElement: ChangeEvent<HTMLInputElement> | HTMLInputElement | ChangeEvent<HTMLTextAreaElement> | HTMLTextAreaElement | null
  ) {
    var inputsName = '';
    setError(null);
    // let input: HTMLTextAreaElement | null = null;
    let input: HTMLInputElement | HTMLTextAreaElement | null = null;
    let vall: string = "";
    if (eventOrElement && "target" in eventOrElement) {
      input = eventOrElement.target;
      vall = input.value;
      inputsName = input.name;
    } else {
      input = eventOrElement;
      vall = input?.value ?? "";
      inputsName = input?.name ?? "";
    }
    // var pat = new RegExp("^[0]{1}[0123456789]{10}$");
    // var isMobileNum = pat.test(vall);
    if (!vall) {
      // setIsAddressTextEmty(true);   
      setIsAddressFormInputsTextEmty((cur) => {
        return (
          { ...cur, [inputsName]: true }
        );
      });

      if (input) {
        input.classList.remove("valid");
        input.classList.add("invalid");
      }
      // setAddressMatnError("ورود متن آدرس الزامی است");
      setAddressFormInputsMatnError((cur) => {
        return (
          { ...cur, [inputsName]: 'این بخش را خالی نگذارید' }
        );
      });

      // setIsDisabledsaveAddressFormInputsBtn(true);
      // if (refForSaveAddressFormInputsBtn.current) {
      //   refForSaveAddressFormInputsBtn.current.classList.add(Styles.disabledBtn);
      //   refForSaveAddressFormInputsBtn.current.classList.remove(Styles.btn);
      // }
    }
    // else if (!isMobileNum) {
    //   setIsAddressTextEmty(false);
    //   if (input) {
    //     input.classList.remove("valid");
    //     input.classList.add("invalid");
    //   }
    //   setAddressMatnError("فرمت متن آدرس وارده نادرست است");
    //   setAddressFormInputsMatnError((cur) => {
    //     return (
    //       { ...cur, [inputsName]: 'فرمت وارده اشتباه است' }
    //     );
    //   });
    //   setIsDisabledsaveAddressFormInputsBtn(true);
    //   if (refForSaveAddressFormInputsBtn.current) {
    //     refForSaveAddressFormInputsBtn.current.classList.add(Styles.disabledBtn);
    //     refForSaveAddressFormInputsBtn.current.classList.remove(Styles.btn);
    //   }
    // } 
    else {
      // setIsAddressTextEmty(false);  //zare_nk_050201_commented
      ////zare_nk_050201_added_st
      setIsAddressFormInputsTextEmty((cur) => {
        return (
          { ...cur, [inputsName]: false }
        );
      });
      ////zare_nk_050201_added_end
      if (input) {
        input.classList.remove("invalid");
        input.classList.add("valid");
      }
      // setAddressMatnError(null);
      setAddressFormInputsMatnError((cur) => {
        return (
          { ...cur, [inputsName]: null }
        );
      });
      // setIsDisabledsaveAddressFormInputsBtn(false);
      // if (refForSaveAddressFormInputsBtn.current) {
      //   refForSaveAddressFormInputsBtn.current.classList.remove(Styles.disabledBtn);
      //   refForSaveAddressFormInputsBtn.current.classList.add(Styles.btn);
      // }
    }
    if (input) {
      // setAddressVal(input.value);
      setAddressFormInputsVal((cur: any) => {  //zare_nk_050205_nokteh(noe any update she)
        return (
          { ...cur, [inputsName]: vall }
        );
      });
    }

    ////zare_nk_050208_nokteh_st(bekhatere inke addressFormInputsMatnError dar in rendere jari meghdar dadim, vali midoonim bayad reRender beshe component va dar rendere badi
    //// meghdari ke alan dadin ro bepazire, pas dastoorate in nokteh ra be useEffecte rendere badi bordim)
    // const hasNotNullValue = Object.values(addressFormInputsMatnError).some(value => value !== null);
    // if (hasNotNullValue) {
    //   console.log('050205-hasNullValue');
    //   setIsDisabledsaveAddressFormInputsBtn(true);
    //   if (refForSaveAddressFormInputsBtn.current) {
    //     refForSaveAddressFormInputsBtn.current.classList.add(Styles.disabledBtn);
    //     refForSaveAddressFormInputsBtn.current.classList.remove(Styles.btn);
    //   }
    // }
    // else {
    //   console.log('050205-has not NullValue');
    //   setIsDisabledsaveAddressFormInputsBtn(false);
    //   if (refForSaveAddressFormInputsBtn.current) {
    //     refForSaveAddressFormInputsBtn.current.classList.remove(Styles.disabledBtn);
    //     refForSaveAddressFormInputsBtn.current.classList.add(Styles.btn);
    //   }
    // }
    ////zare_nk_050208_nokteh_end(bekhatere inke addressFormInputsMatnError dar in rendere jari meghdar dadim,vali midoonim bayad reRender beshe component va dar rendere badim 
    // meghdari ke alan dadin ro bepazire,pas dastoorate in nokteh ra be useEffecte rendere badi bordim(yani useEffecte u001))
  }

  useEffect(() => {   //u001
    const hasNotNullValue = Object.values(addressFormInputsMatnError).some(value => value !== null);
    console.log('050205-addressFormInputsMatnError: ' + JSON.stringify(addressFormInputsMatnError));
    ////zare_nk_050206_nokteh_st(in dastoorat dar in makan javab dad be khoobi)
    if (hasNotNullValue) {
      console.log('050205-hasNullValue');
      setIsDisabledsaveAddressFormInputsBtn(true);
      if (refForSaveAddressFormInputsBtn.current) {
        refForSaveAddressFormInputsBtn.current.classList.add(Styles.disabledBtn);
        refForSaveAddressFormInputsBtn.current.classList.remove(Styles.btn);
      }
    }
    else {
      console.log('050205-has not NullValue');
      setIsDisabledsaveAddressFormInputsBtn(false);
      if (refForSaveAddressFormInputsBtn.current) {
        refForSaveAddressFormInputsBtn.current.classList.remove(Styles.disabledBtn);
        refForSaveAddressFormInputsBtn.current.classList.add(Styles.btn);
      }
    }
    ////zare_nk_050206_nokteh_end(in dastoorat dar in makan javab dad be khoobi)
  }, [addressFormInputsMatnError]);

  ////zare_nk_050208_nokteh_st(in codeha inja karbordi nadare va baraye olgooye seda zadane tagha gozashtim)
  useEffect(() => {
    // const box = document.getElementById("box");
    // if (box) {
    //   const scrollHeight = box.scrollHeight;
    //   setHeightBox(scrollHeight + "px"); 
    // }
    var refForBoxElement = refForBox.current;
    if (refForBoxElement) {
      const scrollHeight = refForBoxElement.scrollHeight;
      // setHeightBox(scrollHeight + "px");  //zare_nk_050203_commented
    }
  });
  ////zare_nk_050208_nokteh_end(in codeha inja karbordi nadare va baraye olgooye seda zadane tagha gozashtim)

  return (<>
    {/* zare_nk_050204_rahe1_st(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
    {/* zare_nk_050204_nokteh(ClickAwayListener componente MUI hast ke rooyadade click kharej az taghayei ke dar mohtavayash moshakhas mikonim ra modiriat mikonih, 
va jaigozine khoobi baraye neveshtane dastiye rooydade click dar useEffect hast) */}
    <ClickAwayListener
      onClickAway={(event) => {
        const target = event.target as HTMLElement;
        const isToggleButton = target.id === 'bigShooBtn';  //zare_nk_050208_nokteh(tage bigShooBtn alan dar dakhele Collapse hast na dar kharejesh,va in check 
        // kardane isToggleButton inja bimorede va niazi nist,age ye roozi absolutesh konim be kharej az Collapse ya fixed konim be kharaej az Collapse in shart karbordiye)
        if (!isEpmtyHeightBox && !isToggleButton) {
          setIsEpmtyHeightBox(true); // ببند
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
        in={!isEpmtyHeightBox} //zare_nk_050202_nokteh(moadele show() va hide() dar bootstrap) 
        timeout="auto"
        unmountOnExit  //zare_nk_050202_nokteh(age in attribute ra benevisim age in={false} beshe az dom hazf mishe,age in attribute ra nanevisim 
      // age in={false} beshe az dom hazf nemishe va dar inspect vojood dareh va faghat hidden mishe)
      >
        {/* zare_nk_050204_rahe1_end(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
        {/* zare_nk_050204_rahe2_st(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
        {/* <Drawer
        id="box"
        ref={refForBox}
        anchor="bottom"
        open={!isEpmtyHeightBox}
        onClose={() => {
          console.log('zare_nk_050204-Drawer closed!');
          setIsEpmtyHeightBox(true)
        }}
        hideBackdrop={true} //zare_nk_040502(albateh hideBackdrop={true} baes mishe alave bar hazfe tariye poshte drawer,ba click dar fazaye poshtesh,automat 
        // basteh nashe va niaz be modiriate dastiye document.addEventListener dar useEffect dashteh bashim)
        slotProps={{
          paper: {
            sx: {
              borderRadius: '20px 20px 0 0',
              boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
              backgroundColor: 'white',
            },
          },
          ////zare_nk_050204_nokteh(chon ba hideBackdrop={true} goftim range fazaya poshtesh ro nemikhaim tagheir bedim pas backdrop ro comment kardim)
          // backdrop: {
          //   sx: {
          //     backgroundColor: 'rgba(0,0,0,0.3)',  
          //   },
          // },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      > */}
        {/* zare_nk_050204_rahe2_end(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
        {error && <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>{error}</p>}
        {/* <Paper> */}
        <form
          id="addressInfForm"
          className={`${Styles.loginForm} ${Styles.valueStyle}`}
          style={{ padding: '1rem', }}
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div style={{
            paddingTop: '2rem',
            padding: '1rem',
            width: '100',
          }}>
            <p className={`${Styles.titleStyle}`} style={{
              fontSize: '16px',
              color: '#1b1c1d',
              fontWeight: 600,
              marginBottom: '0px',
            }}>ذخیره آدرس</p>
          </div>

          <div style={{
            display: "flex",
            position: 'relative',
            marginBottom: '3.25rem',
          }}>
            {/* <div className={`${Styles.translateDiv} ${isInputFocused || !isMobileTextEmty ? Styles.animateFocus : Styles.animateBlur}`} */}
            <div className={`${Styles.translateDiv} ${isAddressFormInputsFocused.Address || !isAddressFormInputsTextEmty.Address ? Styles.animateFocus : Styles.animateBlur}`} >
              <span style={{ width: '100%' }}>جزئیات آدرس</span>
            </div>

            <textarea
              id="AddressTxt"
              name="Address"
              // value={addressVal}
              value={addressFormInputsVal.Address}
              // onChange={addressMatnChanged}
              onChange={AddressFormInputsChanged}
              // onChange={(e) => {
              //   return AddressFormInputsChanged(0, e);
              // }}
              ref={(e) => {
                // refForAddressFormInputs.current[0] = e;     //zare_nk_050208_nokteh(age ref ra arayeei tarif mikardim)
                refForAddressFormInputs.current.Address = e;   //zare_nk_050208_nokteh(age ref ra objecti tarif mikardim)
              }}

              // onFocus={handleAddressInputFocus}
              onFocus={handleAddressFormInputsFocus}

              // onBlur={handleAddressInputBlur}
              onBlur={handleAddressFormInputsBlur}

              ///////////////////////////////////////zare_nk_nokteh_st(in attributehaye textarea hastan ke dar tapsifood estefadeh shodand, tahlil she age niazan begonjoonam)
              // spellCheck="false"
              // contentEditable="false"
              // name="details"
              // aria-describedby=":r8:-form-item-description"
              // aria-invalid="false"
              // placeholder=" "
              ///////////////////////////////////////zare_nk_nokteh_end(in attributehaye textarea hastan ke dar tapsifood estefadeh shodand, tahlil she age niazan begonjoonam)  

              // className={isAddressTextEmty ? `${Styles.invalid} ` : `${Styles.valid} `}
              //className={isAddressFormInputsTextEmty.Address ? `${Styles.invalid} ` : `${Styles.valid} `}  //zare_nk_050205_commented(ta ebteda ghermez nabashe)
              className={addressFormInputsMatnError.Address ? `${Styles.invalid} ` : `${Styles.valid} `}  //zare_nk_050205_added(ta ebteda ghermez nabashe)
              ////zare_nk_050205_nokteh(addressFormInputsMatnError.Address yani na null va na '')

              style={{
                height: '96px',
                borderRadius: '.75rem',
                // border: '1px solid #e0e3e5',
                width: '186px',
                flex: '1 0 auto',
                outline: 'none',
                textAlign: 'right',
                // padding: '0px 10px', 
                padding: '.75rem',
                fontSize: '.875rem',
              }}

              autoComplete="street-address"
            >
              ب محمد جواد تندگویان جنوب، خانی آباد، خ. مهدی لطیفی
            </textarea>
          </div>

          {/* {addressMatnError && (
              <div className={`${Styles.formsRow} ${Styles.warningCont}`}>
                <span className="forErrorMobile error">{addressMatnError}</span>
              </div>
            )} */}

          <div style={{
            display: "flex",
            flexFlow: 'row',
            columnGap: '1rem',
            marginBottom: '2rem',
          }}>
            <div style={{
              display: "flex",
              position: 'relative',
              flex: '1 1 47%'
            }}>
              {/* <div className={`${Styles.translateDiv} ${isInputFocused || !isMobileTextEmty ? Styles.animateFocus : Styles.animateBlur}`} */}
              <div className={`${Styles.translateDiv} ${isAddressFormInputsFocused.pelak || !isAddressFormInputsTextEmty.pelak ? Styles.animateFocus : Styles.animateBlur}`}
              >
                <span style={{ width: '100%' }}>پلاک</span>
              </div>

              <input
                id="pelakTxt"
                name="pelak"

                // value={pelakVal}  
                value={addressFormInputsVal.pelak}

                // onChange={pelakChanged}
                onChange={AddressFormInputsChanged}

                ref={(e) => {
                  // refForAddressFormInputs.current[1] = e;     //zare_nk_050208_nokteh(age ref ra arayeei tarif mikardim)
                  refForAddressFormInputs.current.pelak = e;     //zare_nk_050208_nokteh(age ref ra objecti tarif mikardim)
                }}

                // onFocus={handlePelakInputFocus}  
                onFocus={handleAddressFormInputsFocus}

                // onBlur={handlePelakInputBlur}  
                onBlur={handleAddressFormInputsBlur}

                // className={isPelakTextEmty ? `${Styles.invalid} ` : `${Styles.valid} `}
                // className={isAddressFormInputsTextEmty.pelak ? `${Styles.invalid} ` : `${Styles.valid} `}  //zare_nk_050205_commented(ta ebteda ghermez nabashe)
                className={addressFormInputsMatnError.pelak ? `${Styles.invalid} ` : `${Styles.valid} `}  //zare_nk_050205_added(ta ebteda ghermez nabashe)

                style={{
                  height: '3rem',
                  borderRadius: '.75rem',
                  // border: '1px solid #e0e3e5',
                  width: '100%',
                  // flex: '1 0 auto',
                  outline: 'none',
                  textAlign: 'right',
                  padding: '.75rem',
                  fontSize: '.875rem',
                }}
              />
            </div>

            <div style={{
              display: "flex",
              position: 'relative',
              flex: '1 1 47%'
            }}>
              {/* <div className={`${Styles.translateDiv} ${isInputFocused || !isMobileTextEmty ? Styles.animateFocus : Styles.animateBlur}`} */}
              <div className={`${Styles.translateDiv} ${isAddressFormInputsFocused.vahed || !isAddressFormInputsTextEmty.vahed ? Styles.animateFocus : Styles.animateBlur}`}
              >
                <span style={{ width: '100%' }}>واحد</span>
              </div>

              <input
                id="vahedTxt"
                name="vahed"

                // value={vahedVal}  
                value={addressFormInputsVal.vahed}

                // onChange={vahedChanged}
                onChange={AddressFormInputsChanged}

                ref={(e) => {
                  // refForAddressFormInputs.current[2] = e;
                  refForAddressFormInputs.current.vahed = e;
                }}

                // onFocus={handleVahedInputFocus} // اضافه کردن onFocus
                onFocus={handleAddressFormInputsFocus}

                // onBlur={handleVahedInputBlur}   // اضافه کردن onBlur 
                onBlur={handleAddressFormInputsBlur}

                // className={isVahedTextEmty ? `${Styles.invalid} ` : `${Styles.valid} `}
                // className={isAddressFormInputsTextEmty.vahed ? `${Styles.invalid} ` : `${Styles.valid} `}   //zare_nk_050205_commented(ta ebteda ghermez nabashe)
                className={addressFormInputsMatnError.vahed ? `${Styles.invalid} ` : `${Styles.valid} `}  //zare_nk_050205_added(ta ebteda ghermez nabashe)

                style={{
                  height: '3rem',
                  borderRadius: '.75rem',
                  // border: '1px solid #e0e3e5',
                  width: '100%',
                  // flex: '1 0 auto',
                  outline: 'none',
                  textAlign: 'right',
                  padding: '.75rem',
                  fontSize: '.875rem',
                }}
              />
            </div>
          </div>

          <div style={{
            display: "flex",
            position: 'relative',
            marginBottom: '1.25rem',
          }}>
            {/* <div className={`${Styles.translateDiv} ${isAddressNameFocused || !isAddressNameTextEmty ? Styles.animateFocus : Styles.animateBlur}`} */}
            <div className={`${Styles.translateDiv} ${isAddressFormInputsFocused.addressName || !isAddressFormInputsTextEmty.addressName ? Styles.animateFocus : Styles.animateBlur}`}
            >
              <span style={{ width: '100%' }}>اسم آدرس (اختیاری)</span>
            </div>
            <input
              id="addressNameTxt"
              name="addressName"

              // value={addressNameVal}  
              value={addressFormInputsVal.addressName}

              // onChange={addressNameChanged}
              onChange={AddressFormInputsChanged}

              ref={(e) => {
                // refForAddressFormInputs.current[3] = e;
                refForAddressFormInputs.current.addressName = e;
              }}

              // onFocus={handleAddressNameInputFocus} 
              onFocus={handleAddressFormInputsFocus}

              // onBlur={handleAddressNameInputBlur}   
              onBlur={handleAddressFormInputsBlur}

              // className={isAddressNameTextEmty ? `${Styles.invalid} ` : `${Styles.valid} `}
              // className={isAddressFormInputsTextEmty.addressName ? `${Styles.invalid} ` : `${Styles.valid} `}  //zare_nk_050205_commented(ta ebteda ghermez nabashe)
              className={addressFormInputsMatnError.addressName ? `${Styles.invalid} ` : `${Styles.valid} `}  //zare_nk_050205_added(ta ebteda ghermez nabashe)

              style={{
                height: '3rem',
                borderRadius: '.75rem',
                // border: '1px solid #e0e3e5',
                width: '100%',
                // flex: '1 0 auto',
                outline: 'none',
                textAlign: 'right',
                padding: '.75rem',
                fontSize: '.875rem',
              }}
            />
          </div>

          <div style={{
            display: "flex",
            position: 'sticky',
            bottom: '0px',
            marginBottom: '1.25rem',
            width: '100%',
            paddingBottom: '.5rem',
          }}>
            <button
              ref={refForSaveAddressFormInputsBtn}
              id="saveAddressFormInputsBtn"
              onClick={() => {
                saveAddress(true);
              }}
              style={{
                width: '100%', color: '#ffffff',
                fontSize: '.875rem',
                padding: '0.75rem 1rem',
                borderRadius: '.75rem', height: '3rem', border: 'none',
              }}
              disabled={isDisabledsaveAddressFormInputsBtn}
            >ذخیره تغییرات</button>
          </div>
        </form >
        {/* </Paper> */}
        {/* zare_nk_050204_rahe2_st(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
        {/* </Drawer> */}
        {/* zare_nk_050204_rahe2_end(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}

        {/* zare_nk_050204_rahe1_st(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
      </Collapse>
    </ClickAwayListener>
    {/* zare_nk_050204_rahe1_end(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
  </>)
}

export default function LocationPage() {
  const [mobileVal, setMobileVal] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [isEpmtyHeightBox, setIsEpmtyHeightBox] = useState(true);
  const refForBox = useRef<HTMLDivElement | null>(null);

  const { isLogin } = useAuthentication();
  console.log('zare_nk_050111-isLogin from context:', isLogin);

  type AddressFormInputsType = {
    Address: string;
    pelak: string;
    vahed: string;
    addressName: string;
  };

  const [addressFormInputsVal, setAddressFormInputsVal] = useState<AddressFormInputsType>({
    Address: '',
    pelak: '',
    vahed: '',
    addressName: '',
  });

  var defZoom: number | undefined = 18;

  var featureToPaskari; var addressMatni = '';

  // const [map, setMap] = useState<Map | null>(null);  //zare_nk_050213_commented
  const refForMap = useRef<Map | null>(null);     //zare_nk_050213_added

  // const [styles1, setStyles1] = useState<Style | null>(null);  //zare_nk_050213_commented
  const refForStyle = useRef<Style | null>(null);  //zare_nk_050213_added

  // const [vSource1, setVSource1] = useState<VectorSource | null>(null);  //zare_nk_050213_commented
  const refForVectorSource = useRef<VectorSource | null>(null);  //zare_nk_050213_added

  //  const [vSource1, setVSource1] = useState<VectorSource<Feature<Point>> | null>(null); 
  //// zare_nk_050208_nokteh(dar asl bayad noe jenerice VectorSource(yani Feature<Point>) ro 
  //// begim,vali chon dar tarife in class tavassote barnamenevisane openlayer behesh voroodiye pishfarze Geometry dadand man nadam error nemideh)

  //// const [vLayer1, setVLayer1] = useState<VectorLayer | null>(null);  //zare_nk_050109_commented(VectorLayer yek classe generic hast)
  ////zare_nk_050126_nokteh_st(VectorLayer yek classe generic hast,va baraye clashaye generic bayad noe manbae(yani source) dakhelash moshakhas shavad,ma ham
  //  ba dastoore VectorLayer<VectorSource> noe soursesh ra VectorSource lahaz kardim(age noe source genericha ro nagim az nazare typeScript khata hast))
  // const [vLayer1, setVLayer1] = useState<VectorLayer<VectorSource> | null>(null);  //zare_nk_050213_commented
  const refForVectorLayer = useRef<VectorLayer<VectorSource> | null>(null);  //zare_nk_050213_added

  ////zare_nk_050126_nokteh_end(VectorLayer yek classe generic hast,va baraye clashaye generic bayad noe manbae(yani source) dakhelash moshakhas shavad,ma ham
  ////  ba dastoore VectorLayer<VectorSource> noe soursesh ra VectorSource lahaz kardim(age noe source genericha ro nagim az nazare typeScript khata hast))

  ////zare_nk_050126_nokteh_st(albate VectorSource ham generice va bayad noe sourcesh ro moshakhas konim,vali chon dar tarife in class tavassote barnamenevisane 
  // openlayer behesh voroodiye pishfarze Geometry dadand man nadam error nemideh,tarife classe VectorSource taghriban intotiye:
  // class VectorSource<G extends Geometry = Geometry> extends Source {
  //     // ...
  // }
  // pas lazem nist kolle ebarat ra hatman be soorate zir benevisim:
  //  const [vLayer1, setVLayer1] = useState<VectorLayer<VectorSource<Geometry>> | null>(null)
  //)

  // const [feature, setFeature] = useState<Feature | null>(null);  //zare_nk_050213_commented
  const refForFeature = useRef<Feature | null>(null);  //zare_nk_050213_added

  useEffect(() => {
    console.log('rezam-first useEffect');

    ////zare_nk_050213_commented_st
    // const newMap = new Map({
    //   mapType: 'neshan',
    //   target: 'id123',
    //   //key: 'web.6646ef4caa574f5484cf4a140d1b1fa7',  //zare_nk_041030_nokteh(keye shakhsiye man baname mapForWeb)
    //   key: 'web.ed314c3159af4e7ab4caf19447b6cf36',   //zare_nk_041030_nokteh(keye sazmaniye tochikala ba name mainTochi)
    //   poi: true,
    //   traffic: true,
    //   //interactions: defaults({
    //   //    dragPan: true,
    //   //    mouseWheelZoom: true,
    //   //}),
    //   view: new View({
    //     //center:/*ol.proj.fromLonLat(*/[firstCoordinates.X, firstCoordinates.Y]/*)*/   //ol.proj.fromLonLat([51.389, 35.6892]), 
    //     center: fromLonLat([52.4152, 39.6872]),    //ol.proj.fromLonLat([51.389, 35.6892]), 
    //     // center:   [52.4152, 39.6872] ,    /
    //     zoom: 18,  //zare_nk_040912_added
    //     projection: "EPSG:3857",
    //   })
    // });

    // setMap(() => {
    //   console.log('rezam-setMap');
    //   return (newMap);
    // });
    ////zare_nk_050213_commented_end 
    ////zare_nk_050213_added_st 

    if (!refForMap.current) {
      const newMap = new Map({
        mapType: 'neshan',
        target: 'id123',
        //key: 'web.6646ef4caa574f5484cf4a140d1b1fa7',  //zare_nk_041030_nokteh(keye shakhsiye man baname mapForWeb)
        key: 'web.ed314c3159af4e7ab4caf19447b6cf36',   //zare_nk_041030_nokteh(keye sazmaniye tochikala ba name mainTochi)
        poi: true,
        traffic: true,
        //interactions: defaults({
        //    dragPan: true,
        //    mouseWheelZoom: true,
        //}),
        view: new View({
          //center:/*ol.proj.fromLonLat(*/[firstCoordinates.X, firstCoordinates.Y]/*)*/   //ol.proj.fromLonLat([51.389, 35.6892]), 
          center: fromLonLat([52.4152, 39.6872]),    //ol.proj.fromLonLat([51.389, 35.6892]), 
          // center:   [52.4152, 39.6872] ,    /
          zoom: 18,  //zare_nk_040912_added
          projection: "EPSG:3857",
        })
      });
      console.log("useeeeeeeeeeeeeeeeeeeeeeeeeeeeee !refForMap.current  in if");
      refForMap.current = newMap;
    }
    else {
      console.log("useeeeeeeeeeeeeeeeeeeeeeeeeeeeee refForMap.current  in else");
    }

    ////zare_nk_050213_added_end 

    ////zare_nk_050213_commented_st 
    // const newStyle = new Style({
    //   fill: new Fill({
    //     color: '#581e88'
    //   }),
    //   stroke: new Stroke({
    //     color: '#581e88',
    //     width: 2
    //   }),
    //   image:
    //     new Icon({
    //       anchorXUnits: 'fraction',
    //       anchorYUnits: 'pixels',
    //       src: "https://img.tochikala.com/Icon/location-icon.png",
    //     }),
    // });

    // setStyles1(() => {
    //   console.log('rezam-setStyles1');
    //   return (newStyle);
    // });
    ////zare_nk_050213_commented_end 
    ////zare_nk_050213_added_st
    if (!refForStyle.current) {
      const newStyle = new Style({
        fill: new Fill({
          color: '#581e88'
        }),
        stroke: new Stroke({
          color: '#581e88',
          width: 2
        }),
        image:
          new Icon({
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: "https://img.tochikala.com/Icon/location-icon.png",
          }),
      });
      refForStyle.current = newStyle;
    }
    else {
      console.log("useeeeeeeeeeeeeeeeeeeeeeeeeeeeee refForStyle.current  in else");
    }
    ////zare_nk_050213_added_end

    ////zare_nk_050213_commented_st
    //  const newVectorSource = new VectorSource({
    //       // projection: 'EPSG:4326', //zare_nk_050109_nokteh(tosiye mishe projection dar View gonjoondeh beshe,baraye hamin comment shod az inja)
    //     });
    //     setVSource1(() => {
    //       console.log('rezam-setVSource1');
    //       return (newVectorSource);
    //     });
    ////zare_nk_050213_commented_end
    ////zare_nk_050213_added_st
    if (!refForVectorSource.current) {
      const newVectorSource = new VectorSource({
        // projection: 'EPSG:4326', //zare_nk_050109_nokteh(tosiye mishe projection dar View gonjoondeh beshe,baraye hamin comment shod az inja)
      });
      refForVectorSource.current = newVectorSource;
    }
    else {
      console.log("useeeeeeeeeeeeeeeeeeeeeeeeeeeeee refForVectorSource.current  in else");
    }
    ////zare_nk_050213_added_end

    ////zare_nk_050213_commented_st
    // //  if (vSource1 && styles1 != null) {
    //       // console.log('useeeeeeeeeeeeeeeeeeeeeeeeeeeeee vSource1  in if');
    //       setVLayer1(() => {
    //         return (
    //           new VectorLayer<VectorSource>({
    //             source: vSource1, // حالا vSource1 قطعاً VectorSource<Geometry> است
    //             style: styles1,
    //             updateWhileAnimating: true,
    //             updateWhileInteracting: true,
    //           }));
    //       });
    //     }
    //   //  else {
    //   //     console.log('useeeeeeeeeeeeeeeeeeeeeeeeeeeeee vSource1 noot in if');
    //   //   }
    ////zare_nk_050213_commented_end
    ////zare_nk_050213_added_st
    if (!refForVectorLayer.current) {
      refForVectorLayer.current = new VectorLayer<VectorSource>({
        source: refForVectorSource.current,
        style: refForStyle.current,
        updateWhileAnimating: true,
        updateWhileInteracting: true,
      });

      if ((refForMap.current.getView().getZoom() ?? 0) < 18) {
        console.log('less than 18');
      }
      else {
        console.log('bigger than 18');
      }
      showPosition([53.0585, 36.5659]);
      
      console.log("002");
      featureToPaskari = refForFeature.current;
      if (refForFeature.current) {
        refForVectorSource.current?.removeFeature(refForFeature.current);
      }

      refForVectorSource.current?.clear();
      refForVectorSource.current?.getFeatures().map(item => {
        refForVectorSource.current?.removeFeature(item);
      });
      if (refForFeature.current) {
        refForVectorSource.current?.addFeature(refForFeature.current);
      }
      featuresArr.push(refForFeature.current);
      console.log("longitude: " + longitude.current + '-latitude: ' + latitude.current);
      LocationArr = [];
      LocationArr.push({
        'loc': {
          'X': longitude.current,
          'Y': latitude.current
        }
      });
      continuation();

      refForMap.current?.on('moveend', function (event) { 
        if ((refForMap.current?.getView().getZoom() ?? 0) < 18) {
          // alert('less than 18');
        }
        else {
          // alert('bigger than 18');
        } 

        let centerCoords3857 = refForMap.current?.getView().getCenter();
        console.log("moveend-feature.get('name').X: " + refForFeature.current);
        if (centerCoords3857) {
          console.log("moveend-feature.get('name').X: " + refForFeature.current?.get('name').X);
          // feature?.getGeometry()?.setCoordinates(centerCoords3857);
          refForFeature.current?.setGeometry(new Point(centerCoords3857));
          let coordinate = transform(centerCoords3857, 'EPSG:3857', 'EPSG:4326');
          let lat = coordinate[1]// ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')[1]; // age age az scripte ol dar view estefade nakonim va az sabke import estefade konim nabayad az ol.proj.transform estefade kard,vagarna bayad az ol.proj.transform estefade kard
          let lng = coordinate[0]// ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')[0];  // age age az scripte ol dar view estefade nakonim va az sabke import estefade konim nabayad az ol.proj.transform estefade kard,vagarna bayad az ol.proj.transform estefade kard
          if (refForFeature.current) {
            refForFeature.current.get('name').X = lng; refForFeature.current.get('name').Y = lat;
          }
        }
      });

      refForMap.current.on('pointerdrag', function () {
        defZoom = refForMap.current?.getView().getZoom();
 
        let centerCoords3857 = refForMap.current?.getView().getCenter();
        if (centerCoords3857) {
          console.log("pointermove-feature.get('name').X: " + refForFeature.current?.get('name').X + '-feature.getGeometry().getCoordinates()[0]: ' + refForFeature.current?.getGeometry() ? [0] : 777
            + "-pointermove-feature.get('name').Y: " + refForFeature.current?.get('name').Y + '-feature.getGeometry().getCoordinates()[1]: ' + refForFeature.current?.getGeometry() ? [1] : 888); //feature.getGeometry().getCoordinates()[1]);
          // feature.getGeometry().setCoordinates(centerCoords3857);
          refForFeature.current?.setGeometry(new Point(centerCoords3857));
          let coordinate = transform(centerCoords3857, 'EPSG:3857', 'EPSG:4326');
          //let coordinate = feature.getGeometry().getCoordinates();  //zare_nk_040911_commented  
          let lat = coordinate[1]//ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')[1]; 
          let lng = coordinate[0]//ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')[0];

          if (refForFeature.current) {
            refForFeature.current.get('name').X = lng; refForFeature.current.get('name').Y = lat;
          }
        }
      }); 
    }
    else {
      console.log("useeeeeeeeeeeeeeeeeeeeeeeeeeeeee refForVectorLayer.current  in else");
    }
    //}
    //  else {
    //     console.log('useeeeeeeeeeeeeeeeeeeeeeeeeeeeee vSource1 noot in if');
    //   }
    ////zare_nk_050213_added_end
 
    if (refForMap.current && refForVectorLayer.current) {
      ////zare_nk_050213_commented_st(movaghat ta motmaen shim)
      // if ((refForMap.current.getView().getZoom() ?? 0) < 18) {
      //   console.log('less than 18');
      // }
      // else {
      //   console.log('bigger than 18');
      // }
      // showPosition([53.0585, 36.5659]);
      ////zare_nk_050213_commented_end(movaghat ta motmaen shim)
    }

    if (refForMap.current && refForFeature.current) {
      ////zare_nk_050213_commented_st(movaghat ta motmaen shim)
      // console.log("002");
      // featureToPaskari = refForFeature.current;
      // refForVectorSource.current?.removeFeature(refForFeature.current);
      // refForVectorSource.current?.clear();
      // refForVectorSource.current?.getFeatures().map(item => {
      //   refForVectorSource.current?.removeFeature(item);
      // });
      // refForVectorSource.current?.addFeature(refForFeature.current);
      // featuresArr.push(refForFeature.current);
      // console.log("longitude: " + longitude.current + '-latitude: ' + latitude.current);
      // LocationArr = [];
      // LocationArr.push({
      //   'loc': {
      //     'X': longitude.current,
      //     'Y': latitude.current
      //   }
      // });
      // continuation();

      // refForMap.current?.on('moveend', function (event) {
      //   ////zare_nk_040912_added_st
      //   if ((refForMap.current?.getView().getZoom() ?? 0) < 18) {
      //     // alert('less than 18');
      //   }
      //   else {
      //     // alert('bigger than 18');
      //   }
      //   ////zare_nk_040912_added_end 

      //   let centerCoords3857 = refForMap.current?.getView().getCenter();
      //   console.log("moveend-feature.get('name').X: " + refForFeature.current);
      //   if (centerCoords3857) {
      //     console.log("moveend-feature.get('name').X: " + refForFeature.current?.get('name').X);
      //     // feature?.getGeometry()?.setCoordinates(centerCoords3857);
      //     refForFeature.current?.setGeometry(new Point(centerCoords3857));
      //     let coordinate = transform(centerCoords3857, 'EPSG:3857', 'EPSG:4326');
      //     let lat = coordinate[1]// ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')[1]; // age age az scripte ol dar view estefade nakonim va az sabke import estefade konim nabayad az ol.proj.transform estefade kard,vagarna bayad az ol.proj.transform estefade kard
      //     let lng = coordinate[0]// ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')[0];  // age age az scripte ol dar view estefade nakonim va az sabke import estefade konim nabayad az ol.proj.transform estefade kard,vagarna bayad az ol.proj.transform estefade kard
      //     if (refForFeature.current) {
      //       refForFeature.current.get('name').X = lng; refForFeature.current.get('name').Y = lat;
      //     }
      //   }
      // });

      // refForMap.current.on('pointerdrag', function () {
      //   defZoom = refForMap.current?.getView().getZoom();

      //   ////zare_nk_040911_added_st
      //   let centerCoords3857 = refForMap.current?.getView().getCenter();
      //   if (centerCoords3857) {
      //     console.log("pointermove-feature.get('name').X: " + refForFeature.current?.get('name').X + '-feature.getGeometry().getCoordinates()[0]: ' + refForFeature.current?.getGeometry() ? [0] : 777
      //       + "-pointermove-feature.get('name').Y: " + refForFeature.current?.get('name').Y + '-feature.getGeometry().getCoordinates()[1]: ' + refForFeature.current?.getGeometry() ? [1] : 888); //feature.getGeometry().getCoordinates()[1]);
      //     // feature.getGeometry().setCoordinates(centerCoords3857);
      //     refForFeature.current?.setGeometry(new Point(centerCoords3857));
      //     let coordinate = transform(centerCoords3857, 'EPSG:3857', 'EPSG:4326');
      //     ////zare_nk_040911_added_end 
      //     //let coordinate = feature.getGeometry().getCoordinates();  //zare_nk_040911_commented  
      //     let lat = coordinate[1]//ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')[1]; // age age az scripte ol dar view estefade nakonim va az sabke import estefade konim nabayad az ol.proj.transform estefade kard,vagarna bayad az ol.proj.transform estefade kard
      //     let lng = coordinate[0]//ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')[0]; // age age az scripte ol dar view estefade nakonim va az sabke import estefade konim nabayad az ol.proj.transform estefade kard,vagarna bayad az ol.proj.transform estefade kard

      //     if (refForFeature.current) {
      //       refForFeature.current.get('name').X = lng; refForFeature.current.get('name').Y = lat;
      //     }
      //   }
      // });
      ////zare_nk_050213_commented_end(movaghat ta motmaen shim)
    }
    else {
      console.log("003");
    }
  }, []);

  var LocationArr: any = []; var featuresArr: any = [];

  type PositionCoords = {
    coords: { // coords دیگه optional نیست، چون اگه آرایه نباشه، باید coords داشته باشه
      longitude: number | null | undefined;
      latitude: number | null | undefined;
    };
  };
  type PositionArray = [number, number];
  type PositionType = PositionCoords | PositionArray;

  // let longitude: number | null | undefined = null;
  // let latitude: number | null | undefined = null; 
  let longitude = useRef<number | null | undefined>(null);
  let latitude = useRef<number | null | undefined>(null);

  ////zare_nk_050213_commented_st
  // useEffect(() => {
  //   console.log('useeeeeeeeeeeeeeeeeeeeeeeeeeeeee vSource1 called!!!!');
  //   if (vSource1 && styles1 != null) {
  //     console.log('useeeeeeeeeeeeeeeeeeeeeeeeeeeeee vSource1  in if');
  //     setVLayer1(() => {
  //       return (
  //         new VectorLayer<VectorSource>({
  //           source: vSource1, // حالا vSource1 قطعاً VectorSource<Geometry> است
  //           style: styles1,
  //           updateWhileAnimating: true,
  //           updateWhileInteracting: true,
  //         }));
  //     });
  //   }
  //   else {
  //     console.log('useeeeeeeeeeeeeeeeeeeeeeeeeeeeee vSource1 noot in if');
  //   }
  // }, [vSource1]);
  ////zare_nk_050213_commented_end

  async function showPosition(position: PositionType) {    //zare_nk_050208_nokteh(tabee showPosition barasase parametre voroodish(position refhaye longitude va 
    // latitude ro meghdar mideh va state feature ra ham ba hamin position meghdar mideh) )
    if (Array.isArray(position)) {
      // اگر آرایه بود، مستقیماً از عناصرش استفاده کن
      let coord = position;
      longitude.current = coord[0];
      latitude.current = coord[1];
      console.log(`1234-Position set from array: Longitude=${longitude.current}, Latitude=${latitude.current}`);
    }
    else {
      if (position.coords !== undefined && position.coords !== null) {
        longitude.current = position.coords.longitude;
        latitude.current = position.coords.latitude;
        console.log(`1234-Position set from coords: Longitude=${longitude.current}, Latitude=${latitude.current}`);
      } else {
        // اگر coords وجود نداشت یا null بود (که با تعریف جدید PositionCoords کمتر پیش میاد ولی باز هم بهتره چک بشه)
        console.log("1234-Coords not available in object, using default.");
        longitude.current = 53.0585;
        latitude.current = 36.5659;
      }
    }

    console.log(`1234-finalyt Longitude=${longitude.current}, Latitude=${latitude.current}`);
    if (longitude.current === null || longitude.current === undefined) {
      longitude.current = 53.0585;
    }
    if (latitude.current === null || latitude.current === undefined) {
      latitude.current = 53.0585;
    }

    ////zare_nk_050213_commented_st
    // setFeature(() => {
    //   return (
    //     new Feature({
    //       // geometry: new /*ol.geom.*/Point(/*ol.proj.fromLonLat(*/[/*longitude.current, latitude.current*/ 52.4152, 39.6872]/*)*/),
    //       // geometry: new /*ol.geom.*/Point(fromLonLat([longitude.current,  latitude.current])),
    //       // geometry: new /*ol.geom.*/Point(fromLonLat([longitude.current ? longitude.current : 53.0585, latitude.current ? latitude.current : 36.5659 /*52.4152, 39.6872*/])),
    //       name: {
    //         "Address": addressMatni,
    //         "X": longitude.current,
    //         "Y": latitude.current,
    //       },
    //       population: 4000,
    //       rainfall: 500,
    //     }));
    // });
    ////zare_nk_050213_commented_end
    ////zare_nk_050213_added_st
    refForFeature.current = new Feature({
      // geometry: new /*ol.geom.*/Point(/*ol.proj.fromLonLat(*/[/*longitude.current, latitude.current*/ 52.4152, 39.6872]/*)*/),
      // geometry: new /*ol.geom.*/Point(fromLonLat([longitude.current,  latitude.current])),
      // geometry: new /*ol.geom.*/Point(fromLonLat([longitude.current ? longitude.current : 53.0585, latitude.current ? latitude.current : 36.5659 /*52.4152, 39.6872*/])),
      name: {
        "Address": addressMatni,
        "X": longitude.current,
        "Y": latitude.current,
      },
      population: 4000,
      rainfall: 500,
    });
    ////zare_nk_050213_added_end

    // featureToPaskari = feature;
    // vSource1?.removeFeature(feature);
    // vSource1?.clear();
    // vSource1?.getFeatures().map(item => {
    //   vSource1.removeFeature(item);
    // });
    // vSource1?.addFeature(feature);
    // featuresArr.push(feature);
    // LocationArr = [];
    // LocationArr.push({
    //   'loc': {
    //     'X': longitude.current,
    //     'Y': latitude.current
    //   }
    // });
    // continuation();
  }

  function continuation() {   //zare_nk_050208_nokteh(tabee continuation center va zoome map ro moshakhas mikoneh, hamchenin vectorLayere map ro ham inja midim behesh)
    var firstCoordinates = LocationArr[0].loc;
    // map?.getView().setCenter(fromLonLat([firstCoordinates.X, firstCoordinates.Y]));      //zare_nk_050213_commented 
    refForMap.current?.getView().setCenter(fromLonLat([firstCoordinates.X, firstCoordinates.Y]));      //zare_nk_050213_added

    // map?.getView().setZoom(18);     //zare_nk_050213_commented 
    refForMap.current?.getView().setZoom(18);     //zare_nk_050213_added

    // if (vLayer1) {       //zare_nk_050213_commented 
    if (refForVectorLayer.current) {     //zare_nk_050213_added  
      console.log("vLayer1 is not null,firstCoordinates.X: " + firstCoordinates.X + '-firstCoordinates.Y: ' + firstCoordinates.Y);
      // if (map) {      //zare_nk_050213_commented 
      if (refForMap.current) {      //zare_nk_050213_added 
        console.log('mapmapmapmapmapmapmap');
      }
      else {
        console.log('nooooo mmapmapmapmapmapmapmap');
      }
      // map?.addLayer(vLayer1);     //zare_nk_050213_commented
      refForMap.current?.addLayer(refForVectorLayer.current);     //zare_nk_050213_added
    } else {
      console.log("vLayer1 is null, cannot add layer to map.");
    }
    //map?.updateSize();    //zare_nk_050213_commented
    refForMap.current?.updateSize();     //zare_nk_050213_added
  }

  ////zare_nk_050213_commented_st
  // useEffect(() => {   //zare_nk_050208_nokteh(dar useEffecte [map, vLayer1] motmaen mishim map va vLayer1 meghdar daran,age daran showPosition ro ba positioni ke inja 
  //   //// behesh midim seda mizanim ta state feature ra meghdardehi koneh)
  //   if (map && vLayer1) {
  //     if ((map.getView().getZoom() ?? 0) < 18) {
  //       console.log('less than 18');
  //     }
  //     else {
  //       console.log('bigger than 18');
  //     }

  //     showPosition([53.0585, 36.5659]);
  //   }
  // }, [map, vLayer1]);
  ////zare_nk_050213_commented_end


  ////zare_nk_050213_commented_st
  // useEffect(() => {   //zare_nk_050208_nokteh(useEffecte [map, feature] check mikoneh age map va vSource1 va feature meghdar daran,feature ra be vSource1 midim, 
  //   // hamchenin modiriat mikonim dar rooydade moveend va pointerdrag feature meghdare jadid begire )
  //   console.log("001");
  //   if (map && feature) {
  //     console.log("002");
  //     featureToPaskari = feature;
  //     vSource1?.removeFeature(feature);
  //     vSource1?.clear();
  //     vSource1?.getFeatures().map(item => {
  //       vSource1.removeFeature(item);
  //     });
  //     vSource1?.addFeature(feature);
  //     featuresArr.push(feature);
  //     console.log("longitude: " + longitude.current + '-latitude: ' + latitude.current);
  //     LocationArr = [];
  //     LocationArr.push({
  //       'loc': {
  //         'X': longitude.current,
  //         'Y': latitude.current
  //       }
  //     });
  //     continuation();

  //     map?.on('moveend', function (event) {
  //       ////zare_nk_040912_added_st
  //       if ((map.getView().getZoom() ?? 0) < 18) {
  //         // alert('less than 18');
  //       }
  //       else {
  //         // alert('bigger than 18');
  //       }
  //       ////zare_nk_040912_added_end 

  //       let centerCoords3857 = map.getView().getCenter();
  //       console.log("moveend-feature.get('name').X: " + feature);
  //       if (centerCoords3857) {
  //         console.log("moveend-feature.get('name').X: " + feature.get('name').X);
  //         // feature?.getGeometry()?.setCoordinates(centerCoords3857);
  //         feature.setGeometry(new Point(centerCoords3857));
  //         let coordinate = transform(centerCoords3857, 'EPSG:3857', 'EPSG:4326');
  //         let lat = coordinate[1]// ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')[1]; // age age az scripte ol dar view estefade nakonim va az sabke import estefade konim nabayad az ol.proj.transform estefade kard,vagarna bayad az ol.proj.transform estefade kard
  //         let lng = coordinate[0]// ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')[0];  // age age az scripte ol dar view estefade nakonim va az sabke import estefade konim nabayad az ol.proj.transform estefade kard,vagarna bayad az ol.proj.transform estefade kard
  //         feature.get('name').X = lng; feature.get('name').Y = lat;
  //       }
  //     });

  //     map.on('pointerdrag', function () {
  //       defZoom = map.getView().getZoom();

  //       ////zare_nk_040911_added_st
  //       let centerCoords3857 = map.getView().getCenter();
  //       if (centerCoords3857) {
  //         console.log("pointermove-feature.get('name').X: " + feature.get('name').X + '-feature.getGeometry().getCoordinates()[0]: ' + feature.getGeometry() ? [0] : 777
  //           + "-pointermove-feature.get('name').Y: " + feature.get('name').Y + '-feature.getGeometry().getCoordinates()[1]: ' + feature.getGeometry() ? [1] : 888); //feature.getGeometry().getCoordinates()[1]);
  //         // feature.getGeometry().setCoordinates(centerCoords3857);
  //         feature.setGeometry(new Point(centerCoords3857));
  //         let coordinate = transform(centerCoords3857, 'EPSG:3857', 'EPSG:4326');
  //         ////zare_nk_040911_added_end 
  //         //let coordinate = feature.getGeometry().getCoordinates();  //zare_nk_040911_commented  
  //         let lat = coordinate[1]//ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')[1]; // age age az scripte ol dar view estefade nakonim va az sabke import estefade konim nabayad az ol.proj.transform estefade kard,vagarna bayad az ol.proj.transform estefade kard
  //         let lng = coordinate[0]//ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')[0]; // age age az scripte ol dar view estefade nakonim va az sabke import estefade konim nabayad az ol.proj.transform estefade kard,vagarna bayad az ol.proj.transform estefade kard
  //         feature.get('name').X = lng; feature.get('name').Y = lat;
  //       }
  //     });

  //   }
  //   else {
  //     console.log("003");
  //   }
  // }, [map, feature]);
  ////zare_nk_050213_commented_end

  async function saveAddress(isOnline: boolean) {
    // if (!feature) {   //zare_nk_050213_commented
    if (!refForFeature.current) {  //zare_nk_050213_added
      return;
    }

    console.log('zare_nk_050110-reza02-feature.get("name").Y: ' + refForFeature.current.get('name').Y + "-feature.get('name').X: " + refForFeature.current.get('name').X +
      '-mobileVal: ' + mobileVal + "-feature.get('name').Address: " + refForFeature.current.get('name').Address);

    let token = getCookie("token");
    console.log('zare_nk_050110-token hala is: ' + getCookie("token"));
    // if (typeof window !== "undefined") {
    //   alert('hhhhhhhhhhhhhhh');
    //   token = localStorage.getItem("Token") || "";
    // }
    console.log('zare_nk_050110-token: ' + token);
    var Api_CreateAddressParams = null;

    Api_CreateAddressParams = isOnline ? (
      {
        'FName': 'reza',
        'LName': 'kavian',
        'CodePosti': '1231231231',
        'Pelak': addressFormInputsVal.pelak, // 1,
        'Vahed': addressFormInputsVal.vahed, // 5,
        'Lat': refForFeature.current.get('name').Y,
        'Lon': refForFeature.current.get('name').X,
        'Mobile': '09999999999',// mobileVal,
        // 'Adress': /*feature.get('name').Address*/ $('#AddressMatni').val(),   
        'Adress': addressFormInputsVal.Address, // 'dokhaniat',    // feature.get('name').Address, //feature.get('name').Address,
        // 'TahvilGirande': TahvilGirande,
        // 'OnvanAdress': $('#OnvanAdress').val(),
      }
    ) : ({
      'FName': 'reza',
      'LName': 'kavian',
      'CodePosti': '1231231231',
      'Pelak': 1,
      'Vahed': 5,
      'Lat': refForFeature.current.get('name').Y,
      'Lon': refForFeature.current.get('name').X,
      'Mobile': '09999999999',// mobileVal,
      // 'Adress': /*feature.get('name').Address*/ $('#AddressMatni').val(),   
      'Adress': 'dokhaniat',    // feature.get('name').Address, //feature.get('name').Address,
      // 'TahvilGirande': TahvilGirande,
      // 'OnvanAdress': $('#OnvanAdress').val(),
    })

    let ApiUrl = "https://api.tochikala.com/api/";
    const response = await fetch(ApiUrl + "User/Api_CreateAddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      // body: JSON.stringify({
      //   Mobile: mobileVal, 
      //   SmsCode: sms, 
      //   Password: ""
      // }),
      body: JSON.stringify(Api_CreateAddressParams),
    });
    const data = await response.json();
    ////zare_nk_050110-data: {"status":0,"message":"افزودن با موفقیت انجام شد","data":"[{\"IdAdress\":24749,\"IdUser\":10006,\"IdKeshvar\":null,\"IdShahr\":null,\"IdOstan\":null,\"Adress\":\"dokhaniat\",\"CodePosti\":\"1231231231\",\"Lon\":53.05861265277862770517,\"Lat\":36.56599047952488490409,\"Mobile\":9999999999,\"FName\":\"reza\",\"LName\":\"kavian\",\"IsDelete\":0,\"Vahed\":5,\"Pelak\":1,\"OnvanAdress\":null,\"FullCityName\":null,\"Keshvar\":null,\"Ostan\":null,\"Shahr\":null,\"Fullname\":\"reza kavian\"}]","errors":[]}
    ////zare_nk_050110-data: {"status":-1,"message":"","data":null,"errors":["اطلاعات را کامل وارد کنید"]}

    if (response.ok) {
      console.log("zare_nk_050110-data: " + JSON.stringify(data));
      //zare_nk_040218-data222: {"status":-8,"message":"","data":null,"errors":["52 دقیقه ی دیگر مجددا تلاش کنید"]}
      //zare_nk_040218-data222:
      // {"status":0,"message":"",
      // "data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwMTA5IiwiQ29kZU1vc2h0YXJpIjoiMjAxMDkiLCJNb2JpbGUiOiI5MzUxMDkxMjg3IiwiTmFtZU1vc2h0YXJpIjoiIiwibmJmIjoxNzQ2NzI1OTI4LCJleHAiOjE3NDczMzA3MjgsImlhdCI6MTc0NjcyNTkyOH0.9Jfv71v3D_s13gSyf3gXqgEfiXaV-lx93hDey4DSLM8"
      // },"errors":[]}
      if (data.status == 0) {

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
  }

  const bigShoo = () => {
    // setIsEpmtyHeightBox(false);  //zare_nk_050205_comemnted
    ////zare_nk_050205_added_st
    let token = getCookie("token");
    console.log('zare_nk_050110-token hala is: ' + getCookie("token"));
    if (token) {
      setIsEpmtyHeightBox(false);
    }
    else {
      saveAddress(false);  //zare_nk_050205_nokteh(age offLine ham bood taraf address ra zakhireh kon ehtemalan ba user movaghat!!)
    }
    ////zare_nk_050205_added_end
  }

  ////zare_nk_050204_commented_st(componente ClickAwayListener jaigozine in handleClickOutside baraye rooydade clicke document baraye modiriate click kharej az collapse shod)
  // useEffect(() => {
  //   console.log('zare_nk_050118_useEffect called-03-isEpmtyHeightBox: ' + isEpmtyHeightBox); //+ '-heightBox: ' + heightBox);
  //   const handleClickOutside = (event: any) => {
  //     const bigShooBtn: boolean = event.target.id === 'bigShooBtn';

  //     console.log('zare_nk_050118_04-handleClickOutside-refForBox.current: ' + refForBox.current + '-contains: ' +
  //       refForBox.current?.contains(event.target) + '-isEpmtyHeightBox: ' + isEpmtyHeightBox + '-heightBox: ' +  // heightBox +
  //       '-bigShooBtn: ' + bigShooBtn);

  //     if (refForBox.current && !refForBox.current.contains(event.target) && !isEpmtyHeightBox
  //       && !bigShooBtn   //zare_nk_050118_commented
  //     ) {
  //       console.log('zare_nk_050118_kharj click-05');
  //       setIsEpmtyHeightBox(true);  
  //       // setHeightBox('0px'); //zare_nk_050203_commented
  //     }
  //     else {
  //       console.log('zare_nk_050118_dakhel click-05');

  //       // const box = document.getElementById("box");
  //       // if (box) { 
  //       // const scrollHeight = box.scrollHeight; 
  //       // } 
  //       var refForBoxElement = refForBox.current;
  //       if (refForBoxElement) {
  //         const scrollHeight = refForBoxElement.scrollHeight;
  //       }
  //     }
  //   };

  //   // اضافه کردن listener به document
  //   document.addEventListener('click', handleClickOutside);

  //   // پاک کردن listener موقع unmount شدن کامپوننت
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  //   // }, [isEpmtyHeightBox, heightBox]);  //zare_nk_050203_commented
  // }, [isEpmtyHeightBox]);   //zare_nk_050203_added
  ////zare_nk_050204_commented_end(componente ClickAwayListener jaigozine in handleClickOutside baraye rooydade clicke document baraye modiriate click kharej az collapse shod)

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
          direction: 'rtl',
        }}>

        <div
          style={{
            flex: '1 1 auto',
            width: '100%',
            position: 'relative',
          }}>

          <div id="id123"
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: '0px',
              left: '0px',
              zIndex: 0,
            }}>
          </div>
        </div>

        <div
          style={{
            flex: '0 0 auto',
            width: '100%',
            paddingTop: '1rem', paddingLeft: '1rem', paddingRight: '1rem',
            display: "flex", flexFlow: "column", gap: '1.25rem',
          }}>

          {/* {isLogin ? (<> */}  {/* zare_nk_050204_commented */}

          {/* zare_nk_050204_nokteh(fontFamily az layoutWraper ers borde va IRANSansWeb_Medium(adad_fa) hast,fontWeight rooye in font asar dare,vali rooye bazi fontha mesle 
          IRANSansWeb_Bold(adad_fa)) asar nadare,ehtemalan chon in font khodesh fontWeighte dakheli dareh ke dar olaviyate balatar az fontWeighte dastiye css hast ke ma midim */}
          <h1 style={{ fontWeight: 600, color: '#1b1c1d', margin: 0, fontSize: 'inherit', }}>موقعیت مکانی</h1>
          {/* <h1 style={{ color: '#1b1c1d', margin: 0, fontSize: 'inherit', }}
             className={`${globalsStyles.ISW_Bold_fa}`} >موقعیت مکانی</h1>   */}

          <div style={{
            width: '100%', display: 'flex', flexFlow: "row",
            padding: '1rem .75rem', height: '3.5rem', alignItems: 'center',
            columnGap: '.25rem', border: '1px solid #e0e3e5', borderRadius: '.75rem',
          }}>
            <button style={{
              flex: '0 0 auto', display: "flex", flexFlow: 'row', alignItems: "center",
              padding: '.5rem 10px', color: '#1b1c1d', height: '2rem', border: 'none', backgroundColor: "inherit",
            }}>
              <span style={{
                fontSize: '.875rem',
              }}>تهران</span>
              <img src="https://img.tochikala.com/tochikala/arrow-in-select-tag.svg" style={{ width: '12px', height: '12px', alignItems: 'center', }} alt="انتخاب شهر" />
            </button>
            <div style={{ flex: '1 1 auto', overflow: 'hidden', display: 'flex', flexFlow: "row", alignItems: "center", }}>
              <span style={{
                width: '100%', display: 'inline-block',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                fontSize: '.875rem', lineHeight: '1.25rem',
              }}>
                حر، خ. امام خمینی، نرسیده به خ. کارگر جنوبی
              </span>
            </div>
            <div style={{ flex: '0 0 auto', display: 'flex', flexFlow: "row", alignItems: "center", }}>
              <img src="/images/pageLocation/shobe-search.svg" style={{ width: '24px', height: '24px', alignItems: 'center', }} alt="جستجوی شهر" />
            </div>
          </div>

          <div style={{ display: "flex", flexFlow: "row", justifyContent: "center", alignItems: "center" }}>
            <button
              id="bigShooBtn"
              onClick={bigShoo}
              style={{
                width: '100%', color: '#ffffff',
                fontSize: '.875rem',
                padding: '0.75rem 1rem',
                backgroundColor: '#ff5900',
                borderRadius: '.75rem', height: '3rem', border: 'none', marginTop: '0.78rem', marginBottom: "1.75rem",
              }}
            >ادامه</button>
          </div>

        </div>

        <BoxHtmlComponent
          isEpmtyHeightBox={isEpmtyHeightBox}
          setIsEpmtyHeightBox={setIsEpmtyHeightBox}
          refForBox={refForBox}
          saveAddress={saveAddress}
          addressFormInputsVal={addressFormInputsVal}
          setAddressFormInputsVal={setAddressFormInputsVal}
        />

      </main >
      <footer></footer>
    </>
  );
}
