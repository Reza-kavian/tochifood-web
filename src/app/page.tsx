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

type AdressListComponentType = {
  isEpmtyAdressList: boolean;
  setIsEpmtyAdressList: React.Dispatch<React.SetStateAction<boolean>>;
  refForBox: RefObject<HTMLDivElement | null>;
  saveAddress: (isOnline: boolean) => void;
  addressFormInputsVal: any;   //zare_nk_050206_nokteh(inpute haye form inja ke nadarim,in felan olgu bemooneh)
  setAddressFormInputsVal: React.Dispatch<React.SetStateAction<any>>;   //zare_nk_050206_nokteh(inpute haye form inja ke nadarim,in felan olgu bemooneh)
};

function AdressListComponent({
  isEpmtyAdressList,
  setIsEpmtyAdressList,
  refForBox,
  saveAddress,
  addressFormInputsVal,     //zare_nk_050206_nokteh(inpute haye form inja ke nadarim,in felan olgu bemooneh
  setAddressFormInputsVal   //zare_nk_050206_nokteh(inpute haye form inja ke nadarim,in felan olgu bemooneh
}: AdressListComponentType) {
  console.log('zare_nk_050126_AdressListComponent called!!-isEpmtyAdressList: ' + isEpmtyAdressList);

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

  // const [isAddressFormInputsTextEmty, setIsAddressFormInputsTextEmty] = useState<boolean[]>(Array(4).fill(true));   //zare_nk_050201_added   
  const [isAddressFormInputsTextEmty, setIsAddressFormInputsTextEmty] = useState<IsAddressFormInputsTextType>({
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
    // onSquareClick: () => void;
    // andis: number;
    // refForBtn: React.RefObject<(HTMLButtonElement | null)[]>;
    // className?: string;
  };

  // const refForAddressInput = useRef<(HTMLTextAreaElement | null)>(null); //zare_nk_050206_nokteh(chon baraye yek tage na araye lazemeh na object)
  // const refForAddressFormInputs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([]); //zare_nk_050206_nokteh(chon baraye chandin tage araye gozashtim)
  const refForAddressFormInputs = useRef<RefForAddressFormInputsType>({  //zare_nk_050206_nokteh(chon baraye chandin tage object gozashtim)
    Address: null,
    pelak: null,
    vahed: null,
    addressName: null,
  });


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
    // setIsAddressInputFocused(true);   //zare_nk_050206_nokteh(chon baraye yek tage na araye lazemeh na object)
    setIsAddressFormInputsFocused((cur) => {  //zare_nk_050206_nokteh(chon baraye chandin tage object gozashtim)
      return (
        { ...cur, [inputsName]: true }
      );
    });
  };

  ////zare_nk_050206_nokteh001_st(yek rooydade moshtarak baraye chandin tag(voroodiye chandin tag ro migireh, khoroojiye chandin tag ro mideh))
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
  ////zare_nk_050206_nokteh001_end(yek rooydade moshtarak baraye chandin tag(voroodiye chandin tag ro migireh, khoroojiye chandin tag ro mideh))

  ////zare_nk_050206_nokteh001_st(yek rooydade ekhtesasi baraye yek tag(voroodiye yek tag ro migireh, khoroojiye yek tag ro mideh))
  ////zare_nk_050201_commented_st
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
  const [isDisabledsaveAddressFormInputsBtn, setIsDisabledsaveAddressFormInputsBtn] =
    useState(true);

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
      // setIsAddressTextEmty(true);   //zare_nk_050206_nokteh002(yek state ekhtesasi baraye yek tag) 
      setIsAddressFormInputsTextEmty((cur) => {    //zare_nk_050206_nokteh002(yek state moshtarak baraye chandin tag)
        return (
          { ...cur, [inputsName]: true }
        );
      }); 

      if (input) {
        input.classList.remove("valid");
        input.classList.add("invalid");
      }
      // setAddressMatnError("ورود متن آدرس الزامی است");     //zare_nk_050206_nokteh002(yek state ekhtesasi baraye yek tag) 
      setAddressFormInputsMatnError((cur) => {     //zare_nk_050206_nokteh002(yek state moshtarak baraye chandin tag)
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
    // setAddressFormInputsMatnError((cur) => {
    //   return (
    //     { ...cur, [inputsName]: 'فرمت وارده اشتباه است' }
    //   );
    // });
    //   setIsDisabledsaveAddressFormInputsBtn(true);
    //   if (refForSaveAddressFormInputsBtn.current) {
    //     refForSaveAddressFormInputsBtn.current.classList.add(Styles.disabledBtn);
    //     refForSaveAddressFormInputsBtn.current.classList.remove(Styles.btn);
    //   }
    // } 
    else {
      // setIsAddressTextEmty(false);     //zare_nk_050206_nokteh002(yek state ekhtesasi baraye yek tag)  
      setIsAddressFormInputsTextEmty((cur) => {   //zare_nk_050206_nokteh002(yek state moshtarak baraye chandin tag)
        return (
          { ...cur, [inputsName]: false }
        );
      });
     
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

    // const hasNotNullValue = Object.values(addressFormInputsMatnError).some(value => value !== null);
    // console.log('050205-addressFormInputsMatnError: ' + JSON.stringify(addressFormInputsMatnError));
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
  }

  useEffect(() => {
    const hasNotNullValue = Object.values(addressFormInputsMatnError).some(value => value !== null);
    console.log('050205-addressFormInputsMatnError: ' + JSON.stringify(addressFormInputsMatnError));
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
  }, [addressFormInputsMatnError]);

  ////zare_nk_050201_commented_st
  // function pelakChanged(
  //   eventOrElement: ChangeEvent<HTMLInputElement> | HTMLInputElement | null
  // ) {
  //   setError("");
  //   let input: HTMLInputElement | null = null;
  //   let vall: string = "";
  //   if (eventOrElement && "target" in eventOrElement) {
  //     input = eventOrElement.target;
  //     vall = input.value;
  //   } else {
  //     input = eventOrElement;
  //     vall = input?.value ?? "";
  //   }

  //   // var pat = new RegExp("^[0]{1}[0123456789]{10}$");
  //   // var isMobileNum = pat.test(vall);
  //   if (!vall) {
  //     setIsPelakTextEmty(true);
  //     if (input) {
  //       input.classList.remove("valid");
  //       input.classList.add("invalid");
  //     }
  //     // setMobileError("ورود شماره تماس الزامی است");
  //     setIsDisabledMobileCheckBtn(true);
  //     if (refForMobileCheckBtn.current) {
  //       refForMobileCheckBtn.current.classList.add(Styles.disabledBtn);
  //       refForMobileCheckBtn.current.classList.remove(Styles.btn);
  //     }
  //   }
  //   // else if (!isMobileNum) {
  //   //   setIsPelakTextEmty(false);
  //   //   if (input) {
  //   //     input.classList.remove("valid");
  //   //     input.classList.add("invalid");
  //   //   }
  //   //   setMobileError("فرمت شماره تماس وارده نادرست است");
  //   //   setIsDisabledMobileCheckBtn(true);
  //   //   if (refForMobileCheckBtn.current) {
  //   //     refForMobileCheckBtn.current.classList.add(Styles.disabledBtn);
  //   //     refForMobileCheckBtn.current.classList.remove(Styles.btn);
  //   //   }
  //   // } 
  //   else {
  //     setIsPelakTextEmty(false);
  //     if (input) {
  //       input.classList.remove("invalid");
  //       input.classList.add("valid");
  //     }
  //     // setMobileError("");
  //     setIsDisabledMobileCheckBtn(false);
  //     if (refForMobileCheckBtn.current) {
  //       refForMobileCheckBtn.current.classList.remove(Styles.disabledBtn);
  //       refForMobileCheckBtn.current.classList.add(Styles.btn);
  //     }
  //   }
  //   if (input) {
  //     setPelakVal(input.value);
  //   }
  // }

  // function vahedChanged(
  //   eventOrElement: ChangeEvent<HTMLInputElement> | HTMLInputElement | null
  // ) {
  //   setError("");
  //   let input: HTMLInputElement | null = null;
  //   let vall: string = "";
  //   if (eventOrElement && "target" in eventOrElement) {
  //     input = eventOrElement.target;
  //     vall = input.value;
  //   } else {
  //     input = eventOrElement;
  //     vall = input?.value ?? "";
  //   }

  //   // var pat = new RegExp("^[0]{1}[0123456789]{10}$");
  //   // var isMobileNum = pat.test(vall);
  //   if (!vall) {
  //     setIsVahedTextEmty(true);
  //     if (input) {
  //       input.classList.remove("valid");
  //       input.classList.add("invalid");
  //     }
  //     // setMobileError("ورود شماره تماس الزامی است");
  //     setIsDisabledMobileCheckBtn(true);
  //     if (refForMobileCheckBtn.current) {
  //       refForMobileCheckBtn.current.classList.add(Styles.disabledBtn);
  //       refForMobileCheckBtn.current.classList.remove(Styles.btn);
  //     }
  //   }
  //   // else if (!isMobileNum) {
  //   //   setIsVahedTextEmty(false);
  //   //   if (input) {
  //   //     input.classList.remove("valid");
  //   //     input.classList.add("invalid");
  //   //   }
  //   //   setMobileError("فرمت شماره تماس وارده نادرست است");
  //   //   setIsDisabledMobileCheckBtn(true);
  //   //   if (refForMobileCheckBtn.current) {
  //   //     refForMobileCheckBtn.current.classList.add(Styles.disabledBtn);
  //   //     refForMobileCheckBtn.current.classList.remove(Styles.btn);
  //   //   }
  //   // } 
  //   else {
  //     setIsVahedTextEmty(false);
  //     if (input) {
  //       input.classList.remove("invalid");
  //       input.classList.add("valid");
  //     }
  //     // setMobileError("");
  //     setIsDisabledMobileCheckBtn(false);
  //     if (refForMobileCheckBtn.current) {
  //       refForMobileCheckBtn.current.classList.remove(Styles.disabledBtn);
  //       refForMobileCheckBtn.current.classList.add(Styles.btn);
  //     }
  //   }
  //   if (input) {
  //     setVahedVal(input.value);
  //   }
  // }

  // function addressNameChanged(
  //   eventOrElement: ChangeEvent<HTMLInputElement> | HTMLInputElement | null
  // ) {
  //   setError("");
  //   let input: HTMLInputElement | null = null;
  //   let vall: string = "";
  //   if (eventOrElement && "target" in eventOrElement) {
  //     input = eventOrElement.target;
  //     vall = input.value;
  //   } else {
  //     input = eventOrElement;
  //     vall = input?.value ?? "";
  //   }

  //   // var pat = new RegExp("^[0]{1}[0123456789]{10}$");
  //   // var isMobileNum = pat.test(vall);
  //   if (!vall) {
  //     setIsAddressNameTextEmty(true);
  //     if (input) {
  //       input.classList.remove("valid");
  //       input.classList.add("invalid");
  //     }
  //     // setMobileError("ورود شماره تماس الزامی است");
  //     setIsDisabledMobileCheckBtn(true);
  //     if (refForMobileCheckBtn.current) {
  //       refForMobileCheckBtn.current.classList.add(Styles.disabledBtn);
  //       refForMobileCheckBtn.current.classList.remove(Styles.btn);
  //     }
  //   }
  //   // else if (!isMobileNum) {
  //   //   setIsAddressNameTextEmty(false);
  //   //   if (input) {
  //   //     input.classList.remove("valid");
  //   //     input.classList.add("invalid");
  //   //   }
  //   //   setMobileError("فرمت شماره تماس وارده نادرست است");
  //   //   setIsDisabledMobileCheckBtn(true);
  //   //   if (refForMobileCheckBtn.current) {
  //   //     refForMobileCheckBtn.current.classList.add(Styles.disabledBtn);
  //   //     refForMobileCheckBtn.current.classList.remove(Styles.btn);
  //   //   }
  //   // } 
  //   else {
  //     setIsAddressNameTextEmty(false);
  //     if (input) {
  //       input.classList.remove("invalid");
  //       input.classList.add("valid");
  //     }
  //     // setMobileError("");
  //     setIsDisabledMobileCheckBtn(false);
  //     if (refForMobileCheckBtn.current) {
  //       refForMobileCheckBtn.current.classList.remove(Styles.disabledBtn);
  //       refForMobileCheckBtn.current.classList.add(Styles.btn);
  //     }
  //   }
  //   if (input) {
  //     setAddressNameVal(input.value);
  //   }
  // }
  ////zare_nk_050201_commented_end

  useEffect(() => {
    console.log('zare_nk_050118_AdressListComponentAdressListComponentAdressListComponentAdressListComponent');
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
  ////zare_nk_050203_commented_st
  // if (isEpmtyAdressList) {
  //   return (null);
  // }
  // else {
  ////zare_nk_050203_commented_end

  // return (<>
  //   <div
  //     // ref={refForBox}
  //     id="box"
  //     style={{
  //       width: '450px',
  //       maxWidth: '100%',
  //       // height: heightBox,
  //       ...(Number(isEpmtyAdressList) === 1 ? { height: '0px' } : { height: '100%' }),
  //       position: 'fixed',
  //       bottom: '0px',
  //       overflow: 'hidden',
  //       // backgroundColor: 'red',
  //       // transition: 'height 3s ease',
  //       // borderRadius: '20px 20px 0px 0px',
  //     }}>
  //     <div
  //       ref={refForBox}
  //       className={`thinScroll`}
  //       style={{
  //         position: 'absolute', bottom: '0px',  //zare_nk_050131_commented
  //         // padding: '1rem',
  //         width: "100%",
  //         ...(Number(isEpmtyAdressList) === 1 ? { height: '0px' } : { height: heightBox }),
  //         maxHeight: '100%',
  //         border: '4px dashed orange',
  //         backgroundColor: 'white',
  //         transition: 'height 0.6s ease',
  //         borderRadius: '20px 20px 0px 0px',
  //       }}>
  //       {error && <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>{error}</p>}
  //       <form
  //         id="addressInfForm"
  //         className={`${Styles.loginForm} ${Styles.valueStyle}`}
  //         style={{ padding: '1rem', }}
  //         onSubmit={(event) => {
  //           event.preventDefault();
  //         }}
  //       >
  //         <div style={{
  //           paddingTop: '2rem',
  //           padding: '1rem',
  //           width: '100',
  //         }}>
  //           {/* <p className={`${Styles.titleStyle}`} style={{ fontSize: '16px', color: '#1b1c1d', marginBottom: '0px', }}>ثبت&zwnj;نام یا ورود</p> */}
  //           <p className={`${Styles.titleStyle}`} style={{
  //             fontSize: '16px',
  //             color: '#1b1c1d',
  //             fontWeight: 600,
  //             marginBottom: '0px',
  //           }}>ذخیره آدرس</p>
  //           {/* <p className={`${Styles.valueStyle}`} style={{ fontSize: '14px', color: '#878b92', marginBottom: '0px', paddingTop: '.25rem' }}>برای آمدن به تپسی&zwnj;فود، شماره موبایلت را وارد کن</p> */}
  //         </div>

  //         <div style={{
  //           display: "flex",
  //           position: 'relative',
  //           marginBottom: '3.25rem',
  //         }}>
  //           {/* <div className={`${Styles.translateDiv} ${isInputFocused || !isMobileTextEmty ? Styles.animateFocus : Styles.animateBlur}`} */}
  //           <div className={`${Styles.translateDiv} ${isAddressFormInputsFocused.Address || !isAddressFormInputsTextEmty.Address ? Styles.animateFocus : Styles.animateBlur}`}
  //           >
  //             <span style={{ width: '100%' }}>جزئیات آدرس</span>
  //           </div>

  //           <textarea
  //             id="AddressTxt"
  //             name="Address"  //zare_nk_050201_added
  //             // value={addressVal}
  //             value={addressFormInputsVal.Address}
  //             // onChange={addressMatnChanged}
  //             onChange={AddressFormInputsChanged}
  //             // onChange={(e) => {
  //             //   return AddressFormInputsChanged(0, e);
  //             // }}
  //             ref={(e) => {
  //               // refForAddressInput.current[0] = e;
  //               // refForAddressFormInputs.current[0] = e;
  //               refForAddressFormInputs.current.Address = e;
  //             }}

  //             // onFocus={handleAddressInputFocus}
  //             onFocus={handleAddressFormInputsFocus}

  //             // onBlur={handleAddressInputBlur}
  //             onBlur={handleAddressFormInputsBlur}

  //             ///////////////////////////////////////
  //             // spellCheck="false"
  //             // contentEditable="false"
  //             // name="details"
  //             // aria-describedby=":r8:-form-item-description"
  //             // aria-invalid="false"
  //             // placeholder=" "
  //             //////////////////////////////////////  
  //             // className={isAddressTextEmty ? `${Styles.invalid} ` : `${Styles.valid} `}
  //             className={isAddressFormInputsTextEmty.Address ? `${Styles.invalid} ` : `${Styles.valid} `}

  //             style={{
  //               //   outline: '2px solid transparent',  // .outline-none
  //               //   outlineOffset: '2px',    //.outline-none
  //               //   color: '#1b1c1d',     //.text-foreground
  //               //   backgroundColor: 'white',  //.bg-white
  //               //   borderStyle: 'none',  //.border-none
  //               //   appearance: 'none',   //.appearance-none
  //               //   resize: 'none',  //.resize-none
  //               //   flex: '1 1 auto',
  //               //   display: 'flex',
  //               //   margin: '0px',
  //               //   padding: '0px',
  //               ////////////////////////////////////
  //               // height: '56px',
  //               height: '96px',
  //               borderRadius: '.75rem',
  //               // border: '1px solid #e0e3e5',
  //               width: '186px',
  //               flex: '1 0 auto',
  //               outline: 'none',
  //               textAlign: 'right',
  //               // padding: '0px 10px', 
  //               padding: '.75rem',
  //               fontSize: '.875rem',
  //             }}
  //           >
  //             ب محمد جواد تندگویان جنوب، خانی آباد، خ. مهدی لطیفی
  //           </textarea>

  //         </div>

  //         {/* {addressMatnError && (
  //           <div className={`${Styles.formsRow} ${Styles.warningCont}`}>
  //             <span className="forErrorMobile error">{addressMatnError}</span>
  //           </div>
  //         )} */}

  //         <div style={{
  //           display: "flex",
  //           flexFlow: 'row',
  //           columnGap: '1rem',
  //           marginBottom: '2rem',
  //         }}>

  //           <div style={{
  //             display: "flex",
  //             position: 'relative',
  //             //marginBottom: '2rem',
  //             flex: '1 1 47%'
  //           }}>
  //             {/* <div className={`${Styles.translateDiv} ${isInputFocused || !isMobileTextEmty ? Styles.animateFocus : Styles.animateBlur}`} */}
  //             <div className={`${Styles.translateDiv} ${isAddressFormInputsFocused.pelak || !isAddressFormInputsTextEmty.pelak ? Styles.animateFocus : Styles.animateBlur}`}
  //             >
  //               <span style={{ width: '100%' }}>پلاک</span>
  //             </div>

  //             <input
  //               id="pelakTxt"
  //               name="pelak"  //zare_nk_050201_added

  //               // value={pelakVal}  
  //               value={addressFormInputsVal.pelak}

  //               // onChange={pelakChanged}
  //               onChange={AddressFormInputsChanged}

  //               ref={(e) => {  //zare_nk_050118_commented_felan(olgu)
  //                 // refForPelakInput.current[0] = e;
  //                 // refForAddressFormInputs.current[1] = e;
  //                 refForAddressFormInputs.current.pelak = e;
  //               }}
  //               // onFocus={handlePelakInputFocus} // اضافه کردن onFocus
  //               onFocus={handleAddressFormInputsFocus}

  //               // onBlur={handlePelakInputBlur}   // اضافه کردن onBlur 
  //               onBlur={handleAddressFormInputsBlur}

  //               // className={isPelakTextEmty ? `${Styles.invalid} ` : `${Styles.valid} `}
  //               className={isAddressFormInputsTextEmty.pelak ? `${Styles.invalid} ` : `${Styles.valid} `}

  //               style={{
  //                 // height: '56px',
  //                 height: '3rem',
  //                 borderRadius: '.75rem',
  //                 // border: '1px solid #e0e3e5',
  //                 width: '100%',
  //                 // flex: '1 0 auto',
  //                 outline: 'none',
  //                 textAlign: 'right',
  //                 padding: '.75rem',
  //                 fontSize: '.875rem',
  //               }}
  //             />
  //           </div>


  //           <div style={{
  //             display: "flex",
  //             position: 'relative',
  //             //marginBottom: '2rem',
  //             flex: '1 1 47%'
  //           }}>
  //             {/* <div className={`${Styles.translateDiv} ${isInputFocused || !isMobileTextEmty ? Styles.animateFocus : Styles.animateBlur}`} */}
  //             <div className={`${Styles.translateDiv} ${isAddressFormInputsFocused.vahed || !isAddressFormInputsTextEmty.vahed ? Styles.animateFocus : Styles.animateBlur}`}
  //             >
  //               <span style={{ width: '100%' }}>واحد</span>
  //             </div>

  //             <input
  //               id="vahedTxt"
  //               name="vahed"  //zare_nk_050201_added

  //               // value={vahedVal}  
  //               value={addressFormInputsVal.vahed}

  //               // onChange={vahedChanged}
  //               onChange={AddressFormInputsChanged}

  //               ref={(e) => {  //zare_nk_050118_commented_felan(olgu)
  //                 // refForVahedInput.current[0] = e;
  //                 // refForAddressFormInputs.current[2] = e;
  //                 refForAddressFormInputs.current.vahed = e;
  //               }}
  //               // onFocus={handleVahedInputFocus} // اضافه کردن onFocus
  //               onFocus={handleAddressFormInputsFocus}

  //               // onBlur={handleVahedInputBlur}   // اضافه کردن onBlur 
  //               onBlur={handleAddressFormInputsBlur}

  //               // className={isVahedTextEmty ? `${Styles.invalid} ` : `${Styles.valid} `}
  //               className={isAddressFormInputsTextEmty.vahed ? `${Styles.invalid} ` : `${Styles.valid} `}

  //               style={{
  //                 // height: '56px',
  //                 height: '3rem',
  //                 borderRadius: '.75rem',
  //                 // border: '1px solid #e0e3e5',
  //                 width: '100%',
  //                 // flex: '1 0 auto',
  //                 outline: 'none',
  //                 textAlign: 'right',
  //                 padding: '.75rem',
  //                 fontSize: '.875rem',
  //               }}
  //             />
  //           </div>


  //         </div>

  //         <div style={{
  //           display: "flex",
  //           position: 'relative',
  //           marginBottom: '1.25rem',
  //         }}>
  //           {/* <div className={`${Styles.translateDiv} ${isAddressNameFocused || !isAddressNameTextEmty ? Styles.animateFocus : Styles.animateBlur}`} */}
  //           <div className={`${Styles.translateDiv} ${isAddressFormInputsFocused.addressName || !isAddressFormInputsTextEmty.addressName ? Styles.animateFocus : Styles.animateBlur}`}
  //           >
  //             <span style={{ width: '100%' }}>اسم آدرس (اختیاری)</span>
  //           </div>
  //           <input
  //             id="addressNameTxt"
  //             name="addressName"  //zare_nk_050201_added

  //             // value={addressNameVal}  
  //             value={addressFormInputsVal.addressName}

  //             // onChange={addressNameChanged}
  //             onChange={AddressFormInputsChanged}

  //             ref={(e) => {  //zare_nk_050118_commented_felan(olgu)
  //               // refForAddressNameInput.current[0] = e;
  //               // refForAddressFormInputs.current[3] = e;
  //               refForAddressFormInputs.current.addressName = e;
  //             }}
  //             // onFocus={handleAddressNameInputFocus} // اضافه کردن onFocus
  //             onFocus={handleAddressFormInputsFocus}

  //             // onBlur={handleAddressNameInputBlur}   // اضافه کردن onBlur 
  //             onBlur={handleAddressFormInputsBlur}

  //             // className={isAddressNameTextEmty ? `${Styles.invalid} ` : `${Styles.valid} `}
  //             className={isAddressFormInputsTextEmty.addressName ? `${Styles.invalid} ` : `${Styles.valid} `}

  //             style={{
  //               // height: '56px',
  //               height: '3rem',
  //               borderRadius: '.75rem',
  //               // border: '1px solid #e0e3e5',
  //               width: '100%',
  //               // flex: '1 0 auto',
  //               outline: 'none',
  //               textAlign: 'right',
  //               padding: '.75rem',
  //               fontSize: '.875rem',
  //             }}
  //           />
  //         </div>

  //         <div style={{
  //           display: "flex",
  //           position: 'sticky',
  //           bottom: '0px',


  //           marginBottom: '1.25rem',
  //           width: '100%',

  //           paddingBottom: '.5rem',
  //         }}>
  //           <button
  //             id="bigShooBtn"
  //             onClick={saveAddress}
  //             style={{
  //               width: '100%', color: '#ffffff',
  //               fontSize: '.875rem', padding: '1rem .75rem', backgroundColor: '#ff5900',
  //               borderRadius: '.75rem', height: '3rem', border: 'none',
  //               // marginTop: '0.78rem', marginBottom: "1.75rem",
  //             }}
  //           >ذخیره تغییرات</button>
  //         </div>

  //         {/* <div
  //         className={`${Styles.MobileInputAndCheckBtnCont}  `}
  //       >
  //         <button
  //           ref={refForMobileCheckBtn}
  //           id="mobileCheckBtn"
  //           className={Styles.disabledBtn}
  //           // onClick={mobileButtonClick}  //zare_nk_050118_commented_felan(olgu)
  //           disabled={isDisabledMobileCheckBtn}
  //         >
  //           <img
  //             style={{ transform: 'rotate(180deg)' }}
  //             src="/images/login/checkMobile.svg"
  //             alt="ذخیره موبایل"
  //           />
  //         </button>

  //         <div style={{
  //           display: "flex",
  //           position: 'relative',
  //           flex: '1 0 auto'
  //         }}>
  //           <div
  //             className={`${Styles.translateDiv} ${isInputFocused || !isMobileTextEmty ? Styles.animateFocus : Styles.animateBlur}`}
  //           >
  //             <span style={{ width: '100%' }}>شماره موبایل</span>
  //           </div>
  //           <input
  //             className={Styles.mobileTxtBox}
  //             id="mobileTxt"
  //             value={mobileVal}  //zare_nk_050118_commented_felan(olgu)
  //             onChange={mobileChanged}
  //             ref={(e) => {  //zare_nk_050118_commented_felan(olgu)
  //               refForMobileInput.current[0] = e;
  //             }}
  //             onFocus={handleFocus} // اضافه کردن onFocus
  //             onBlur={handleBlur}   // اضافه کردن onBlur 
  //           />
  //         </div>
  //       </div> */}



  //         {/* <p style={{ color: '#878b92', fontSize: '.75rem', lineHeight: '1rem', }}>با ثبت&zwnj;نام در تپسی&zwnj;فود، <a style={{ fontWeight: 500, color: '#ff5900', textDecoration: 'none', }} href="/terms-and-conditions">شرایط و قوانین</a> را قبول می&zwnj;کنم</p> */}

  //       </form >
  //     </div>

  //   </div>
  // </>)

  return (<>
    {/* zare_nk_050204_rahe1_st(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
    {/* zare_nk_050204_nokteh(ClickAwayListener componente MUI hast ke rooyadade click kharej az taghayei ke dar mohtavayash moshakhas mikonim ra modiriat mikonih, 
va jaigozine khoobi baraye neveshtane dastiye rooydade click dar useEffect hast) */}
    <ClickAwayListener
      onClickAway={(event) => {
        const target = event.target as HTMLElement;
        const isToggleButton = target.id === 'bigShooBtn';
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
      >
        {/* zare_nk_050204_rahe1_end(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
        {/* zare_nk_050204_rahe2_st(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
        {/* <Drawer
        id="box"
        ref={refForBox}
        anchor="bottom"
        open={!isEpmtyAdressList}
        onClose={() => {
          console.log('zare_nk_050204-Drawer closed!');
          setIsEpmtyAdressList(true)
        }}
        hideBackdrop={true} //zare_nk_040502(albateh hideBackdrop={true} baes mishe alave bar hazfe triye poshte drawer,ba click dar fazaye poshtesh,automat 
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
            {/* <p className={`${Styles.titleStyle}`} style={{ fontSize: '16px', color: '#1b1c1d', marginBottom: '0px', }}>ثبت&zwnj;نام یا ورود</p> */}
            <p className={`${Styles.titleStyle}`} style={{
              fontSize: '16px',
              color: '#1b1c1d',
              fontWeight: 600,
              marginBottom: '0px',
            }}>ذخیره آدرس</p>
            {/* <p className={`${Styles.valueStyle}`} style={{ fontSize: '14px', color: '#878b92', marginBottom: '0px', paddingTop: '.25rem' }}>برای آمدن به تپسی&zwnj;فود، شماره موبایلت را وارد کن</p> */}
          </div>

          <div style={{
            display: "flex",
            position: 'relative',
            marginBottom: '3.25rem',
          }}>
            {/* <div className={`${Styles.translateDiv} ${isInputFocused || !isMobileTextEmty ? Styles.animateFocus : Styles.animateBlur}`} */}
            <div className={`${Styles.translateDiv} ${isAddressFormInputsFocused.Address || !isAddressFormInputsTextEmty.Address ? Styles.animateFocus : Styles.animateBlur}`}
            >
              <span style={{ width: '100%' }}>جزئیات آدرس</span>
            </div>

            <textarea
              id="AddressTxt"
              name="Address"  //zare_nk_050201_added
              // value={addressVal}
              value={addressFormInputsVal.Address}
              // onChange={addressMatnChanged}
              onChange={AddressFormInputsChanged}
              // onChange={(e) => {
              //   return AddressFormInputsChanged(0, e);
              // }}
              ref={(e) => {
                // refForAddressInput.current[0] = e;
                // refForAddressFormInputs.current[0] = e;
                refForAddressFormInputs.current.Address = e;
              }}

              // onFocus={handleAddressInputFocus}
              onFocus={handleAddressFormInputsFocus}

              // onBlur={handleAddressInputBlur}
              onBlur={handleAddressFormInputsBlur}

              ///////////////////////////////////////
              // spellCheck="false"
              // contentEditable="false"
              // name="details"
              // aria-describedby=":r8:-form-item-description"
              // aria-invalid="false"
              // placeholder=" "
              //////////////////////////////////////  
              // className={isAddressTextEmty ? `${Styles.invalid} ` : `${Styles.valid} `}
              //className={isAddressFormInputsTextEmty.Address ? `${Styles.invalid} ` : `${Styles.valid} `}  //zare_nk_050205_commented(ta ebteda ghermez nabashe)
              className={addressFormInputsMatnError.Address ? `${Styles.invalid} ` : `${Styles.valid} `}  //zare_nk_050205_added(ta ebteda ghermez nabashe)
              ////zare_nk_050205_nokteh(addressFormInputsMatnError.Address yani na null va na '')

              style={{
                //   outline: '2px solid transparent',  // .outline-none
                //   outlineOffset: '2px',    //.outline-none
                //   color: '#1b1c1d',     //.text-foreground
                //   backgroundColor: 'white',  //.bg-white
                //   borderStyle: 'none',  //.border-none
                //   appearance: 'none',   //.appearance-none
                //   resize: 'none',  //.resize-none
                //   flex: '1 1 auto',
                //   display: 'flex',
                //   margin: '0px',
                //   padding: '0px',
                ////////////////////////////////////
                // height: '56px',
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
              //marginBottom: '2rem',
              flex: '1 1 47%'
            }}>
              {/* <div className={`${Styles.translateDiv} ${isInputFocused || !isMobileTextEmty ? Styles.animateFocus : Styles.animateBlur}`} */}
              <div className={`${Styles.translateDiv} ${isAddressFormInputsFocused.pelak || !isAddressFormInputsTextEmty.pelak ? Styles.animateFocus : Styles.animateBlur}`}
              >
                <span style={{ width: '100%' }}>پلاک</span>
              </div>

              <input
                id="pelakTxt"
                name="pelak"  //zare_nk_050201_added

                // value={pelakVal}  
                value={addressFormInputsVal.pelak}

                // onChange={pelakChanged}
                onChange={AddressFormInputsChanged}

                ref={(e) => {  //zare_nk_050118_commented_felan(olgu)
                  // refForPelakInput.current[0] = e;
                  // refForAddressFormInputs.current[1] = e;
                  refForAddressFormInputs.current.pelak = e;
                }}
                // onFocus={handlePelakInputFocus} // اضافه کردن onFocus
                onFocus={handleAddressFormInputsFocus}

                // onBlur={handlePelakInputBlur}   // اضافه کردن onBlur 
                onBlur={handleAddressFormInputsBlur}

                // className={isPelakTextEmty ? `${Styles.invalid} ` : `${Styles.valid} `}
                // className={isAddressFormInputsTextEmty.pelak ? `${Styles.invalid} ` : `${Styles.valid} `}  //zare_nk_050205_commented(ta ebteda ghermez nabashe)
                className={addressFormInputsMatnError.pelak ? `${Styles.invalid} ` : `${Styles.valid} `}  //zare_nk_050205_added(ta ebteda ghermez nabashe)

                style={{
                  // height: '56px',
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
              //marginBottom: '2rem',
              flex: '1 1 47%'
            }}>
              {/* <div className={`${Styles.translateDiv} ${isInputFocused || !isMobileTextEmty ? Styles.animateFocus : Styles.animateBlur}`} */}
              <div className={`${Styles.translateDiv} ${isAddressFormInputsFocused.vahed || !isAddressFormInputsTextEmty.vahed ? Styles.animateFocus : Styles.animateBlur}`}
              >
                <span style={{ width: '100%' }}>واحد</span>
              </div>

              <input
                id="vahedTxt"
                name="vahed"  //zare_nk_050201_added

                // value={vahedVal}  
                value={addressFormInputsVal.vahed}

                // onChange={vahedChanged}
                onChange={AddressFormInputsChanged}

                ref={(e) => {  //zare_nk_050118_commented_felan(olgu)
                  // refForVahedInput.current[0] = e;
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
                  // height: '56px',
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
              name="addressName"  //zare_nk_050201_added

              // value={addressNameVal}  
              value={addressFormInputsVal.addressName}

              // onChange={addressNameChanged}
              onChange={AddressFormInputsChanged}

              ref={(e) => {  //zare_nk_050118_commented_felan(olgu)
                // refForAddressNameInput.current[0] = e;
                // refForAddressFormInputs.current[3] = e;
                refForAddressFormInputs.current.addressName = e;
              }}
              // onFocus={handleAddressNameInputFocus} // اضافه کردن onFocus
              onFocus={handleAddressFormInputsFocus}

              // onBlur={handleAddressNameInputBlur}   // اضافه کردن onBlur 
              onBlur={handleAddressFormInputsBlur}

              // className={isAddressNameTextEmty ? `${Styles.invalid} ` : `${Styles.valid} `}
              // className={isAddressFormInputsTextEmty.addressName ? `${Styles.invalid} ` : `${Styles.valid} `}  //zare_nk_050205_commented(ta ebteda ghermez nabashe)
              className={addressFormInputsMatnError.addressName ? `${Styles.invalid} ` : `${Styles.valid} `}  //zare_nk_050205_added(ta ebteda ghermez nabashe)

              style={{
                // height: '56px',
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
                width: '100%', height: '3rem',
                fontSize: '.875rem', padding: '1rem .75rem',
                borderRadius: '.75rem', border: 'none', color: '#ffffff',
                //color: '#ffffff',  backgroundColor: '#ff5900',   //zare_nk_050205_commented
                // marginTop: '0.78rem', marginBottom: "1.75rem",
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

  // }  //zare_nk_050203_commented
}

export default function Page() {
  const router = useRouter();

  const goToLogin = () => {
    // router.push("/folder03?tab=comments2");
    // redirect("/login");
    router.replace("/login");
  };

  const goToMap = () => {
    // router.push("/folder03?tab=comments2");
    // redirect("/login");
    router.replace("/location");
  };

  useEffect(() => {
    var s = document.getElementById('tabIndexOne-in-LayoutWrapper')?.id;
    alert('s: ' + s);
  })

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


        <div style={{ display: 'flex', padding: '0px 10px', flex: '1 1 47%' }}>
          <button
            onClick={goToLogin}
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
          saveAddress={saveAddress}
          addressFormInputsVal={addressFormInputsVal}
          setAddressFormInputsVal={setAddressFormInputsVal}
        />

      </main>
      <footer></footer>

      <div className="tabIndexOne-in-LayoutWrapper" tabIndex={1}>

      </div>
    </>
  );
}
