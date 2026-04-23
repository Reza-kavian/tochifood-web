////zare_nk_050202_okk
"use client";
import { useState, useEffect, useRef, useCallback, JSXElementConstructor } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Styles from "@/styles/components/login.module.css";
import { RefObject } from "react";
import { ReactNode } from "react";
import { ChangeEvent } from "react";
import jwt from "jsonwebtoken"; //zare_nk_040603_added
import { JwtPayload } from "jsonwebtoken";  //zare_nk_040603_added
import { factchecktools } from "googleapis/build/src/apis/factchecktools";

import { Collapse, Button, Box, Paper, Typography, Grow } from '@mui/material';  //zare_nk_050203_added

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
  // heightBox: string;   //zare_nk_050203_commented
  // setHeightBox: React.Dispatch<React.SetStateAction<string>>;   //zare_nk_050203_commented
  isEpmtyHeightBox: boolean;
  setIsEpmtyHeightBox: React.Dispatch<React.SetStateAction<boolean>>;
  refForBox: RefObject<HTMLDivElement | null>;
  saveAddress: () => void;
};

function BoxHtmlComponent({
  // heightBox,   //zare_nk_050203_commented
  // setHeightBox,   //zare_nk_050203_commented
  isEpmtyHeightBox,
  setIsEpmtyHeightBox,
  refForBox,
  saveAddress,
}: BoxHtmlComponentType) {
  console.log('zare_nk_050126_BoxHtmlComponent called!!-isEpmtyHeightBox: ' + isEpmtyHeightBox);

  const [error, setError] = useState<string | null>(null);  

  // const [mobileError, setMobileError] = useState("");
  const [addressMatnError, setAddressMatnError] = useState("");


  type IsAddressFormInputsFocusedType = {
    Address: boolean;
    pelak: boolean;
    vahed: boolean;
    addressName: boolean;
  };

  //// const [isInputFocused, setIsInputFocused] = useState(false);
  // const [isAddressInputFocused, setIsAddressInputFocused] = useState(false);
  // const [isPelakInputFocused, setIsPelakInputFocused] = useState(false);
  // const [isVahedInputFocused, setIsVahedInputFocused] = useState(false);
  // const [isAddressNameFocused, setIsAddressNameInputFocused] = useState(false);

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

  //// const [isMobileTextEmty, setIsMobileTextEmty] = useState(true);
  ////zare_nk_050201_commented_st
  // const [isAddressTextEmty, setIsAddressTextEmty] = useState(true);
  // const [isPelakTextEmty, setIsPelakTextEmty] = useState(true);
  // const [isVahedTextEmty, setIsVahedTextEmty] = useState(true);
  // const [isAddressNameTextEmty, setIsAddressNameTextEmty] = useState(true);
  ////zare_nk_050201_commented_end
  // const [isAddressFormInputsTextEmty, setIsAddressFormInputsTextEmty] = useState<boolean[]>(Array(4).fill(true));   //zare_nk_050201_added   
  const [isAddressFormInputsTextEmty, setIsAddressFormInputsTextEmty] = useState<IsAddressFormInputsTextType>({
    Address: false,
    pelak: false,
    vahed: false,
    addressName: false,
  });


  type AddressFormInputsType = {
    Address: string;
    pelak: string;
    vahed: string;
    addressName: string;
    // onSquareClick: () => void;
    // andis: number;
    // refForBtn: React.RefObject<(HTMLButtonElement | null)[]>;
    // className?: string;
  };

  //// const [mobileVal, setMobileVal] = useState("");
  ////zare_nk_050201_commented_st
  // const [addressVal, setAddressVal] = useState("");
  // const [pelakVal, setPelakVal] = useState("");
  // const [vahedVal, setVahedVal] = useState("");
  // const [addressNameVal, setAddressNameVal] = useState("");
  ////zare_nk_050201_commented_end
  ////zare_nk_050201_added_st
  const [addressFormInputsVal, setAddressFormInputsVal] = useState<AddressFormInputsType>({
    Address: '',
    pelak: '',
    vahed: '',
    addressName: '',
  });
  ////zare_nk_050201_added_end


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

  //// const refForMobileInput = useRef<(HTMLInputElement | null)[]>([]);
  ////zare_nk_050201_commented_st
  // const refForAddressInput = useRef<(HTMLTextAreaElement | null)[]>([]);
  // const refForPelakInput = useRef<(HTMLInputElement | null)[]>([]);
  // const refForVahedInput = useRef<(HTMLInputElement | null)[]>([]);
  // const refForAddressNameInput = useRef<(HTMLInputElement | null)[]>([]);
  ////zare_nk_050201_commented_end
  // const refForAddressFormInputs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([]);   //zare_nk_050201_added
  const refForAddressFormInputs = useRef<RefForAddressFormInputsType>({
    Address: null,
    pelak: null,
    vahed: null,
    addressName: null,
  });   //zare_nk_050201_added

  ////zare_nk_050201_added_st
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
  ////zare_nk_050201_added_end


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
  ////zare_nk_050201_commented_end


  const refForMobileCheckBtn = useRef<HTMLButtonElement | null>(null);
  const [isDisabledMobileCheckBtn, setIsDisabledMobileCheckBtn] =
    useState(true);

  // function mobileChanged(
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

  //   var pat = new RegExp("^[0]{1}[0123456789]{10}$");
  //   var isMobileNum = pat.test(vall);
  //   if (!vall) {
  //     setIsMobileTextEmty(true);
  //     if (input) {
  //       input.classList.remove("valid");
  //       input.classList.add("invalid");
  //     }
  //     setMobileError("ورود شماره تماس الزامی است");
  //     setIsDisabledMobileCheckBtn(true);
  //     if (refForMobileCheckBtn.current) {
  //       refForMobileCheckBtn.current.classList.add(Styles.disabledBtn);
  //       refForMobileCheckBtn.current.classList.remove(Styles.btn);
  //     }
  //   } else if (!isMobileNum) {
  //     setIsMobileTextEmty(false);
  //     if (input) {
  //       input.classList.remove("valid");
  //       input.classList.add("invalid");
  //     }
  //     setMobileError("فرمت شماره تماس وارده نادرست است");
  //     setIsDisabledMobileCheckBtn(true);
  //     if (refForMobileCheckBtn.current) {
  //       refForMobileCheckBtn.current.classList.add(Styles.disabledBtn);
  //       refForMobileCheckBtn.current.classList.remove(Styles.btn);
  //     }
  //   } else {
  //     setIsMobileTextEmty(false);
  //     if (input) {
  //       input.classList.remove("invalid");
  //       input.classList.add("valid");
  //     }
  //     setMobileError("");
  //     setIsDisabledMobileCheckBtn(false);
  //     if (refForMobileCheckBtn.current) {
  //       refForMobileCheckBtn.current.classList.remove(Styles.disabledBtn);
  //       refForMobileCheckBtn.current.classList.add(Styles.btn);
  //     }
  //   }
  //   if (input) {
  //     setMobileVal(input.value);
  //   }
  // }



  // function addressMatnChanged(
  //   eventOrElement: ChangeEvent<HTMLTextAreaElement> | HTMLTextAreaElement | null
  // ) { 

  function AddressFormInputsChanged(
    eventOrElement: ChangeEvent<HTMLInputElement> | HTMLInputElement | ChangeEvent<HTMLTextAreaElement> | HTMLTextAreaElement | null
  ) { 
    var inputsName = '';
    //AddressFormInputs
    setError("");
    // let input: HTMLTextAreaElement | null = null;
    let input: HTMLInputElement | HTMLTextAreaElement | null = null;
    let vall: string = "";
    if (eventOrElement && "target" in eventOrElement) {
      input = eventOrElement.target;
      vall = input.value;
      inputsName = input.name;  //zare_nk_050201_added
    } else {
      input = eventOrElement;
      vall = input?.value ?? "";
      inputsName = input?.name ?? "";  //zare_nk_050201_added
    }
    // alert("vall: " + vall);
    // var pat = new RegExp("^[0]{1}[0123456789]{10}$");
    // var isMobileNum = pat.test(vall);
    if (!vall) {
      // setIsAddressTextEmty(true);   ////zare_nk_050201_commented
      ////zare_nk_050201_added_st
      setIsAddressFormInputsTextEmty((cur) => {
        return (
          { ...cur, [inputsName]: true }
        );
      });
      ////zare_nk_050201_added_end

      if (input) {
        input.classList.remove("valid");
        input.classList.add("invalid");
      }
      setAddressMatnError("ورود متن آدرس الزامی است");
      setIsDisabledMobileCheckBtn(true);
      if (refForMobileCheckBtn.current) {
        refForMobileCheckBtn.current.classList.add(Styles.disabledBtn);
        refForMobileCheckBtn.current.classList.remove(Styles.btn);
      }
    }
    // else if (!isMobileNum) {
    //   setIsAddressTextEmty(false);
    //   if (input) {
    //     input.classList.remove("valid");
    //     input.classList.add("invalid");
    //   }
    //   setAddressMatnError("فرمت متن آدرس وارده نادرست است");
    //   setIsDisabledMobileCheckBtn(true);
    //   if (refForMobileCheckBtn.current) {
    //     refForMobileCheckBtn.current.classList.add(Styles.disabledBtn);
    //     refForMobileCheckBtn.current.classList.remove(Styles.btn);
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
      setAddressMatnError("");
      setIsDisabledMobileCheckBtn(false);
      if (refForMobileCheckBtn.current) {
        refForMobileCheckBtn.current.classList.remove(Styles.disabledBtn);
        refForMobileCheckBtn.current.classList.add(Styles.btn);
      }
    }
    if (input) {
      // setAddressVal(input.value);
      setAddressFormInputsVal((cur) => {
        return (
          { ...cur, [inputsName]: vall }
        );
      });
    }
  }
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
    console.log('zare_nk_050118_BoxHtmlComponentBoxHtmlComponentBoxHtmlComponentBoxHtmlComponent');
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
  // if (isEpmtyHeightBox) {
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
  //       ...(Number(isEpmtyHeightBox) === 1 ? { height: '0px' } : { height: '100%' }),
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
  //         ...(Number(isEpmtyHeightBox) === 1 ? { height: '0px' } : { height: heightBox }),
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
    <Collapse
      ref={refForBox}
      id="box"
      style={{
        // overflow: 'hidden',
        // width: '450px',
        // maxWidth: '100%', 
        // ...(Number(isEpmtyHeightBox) === 1 ? { height: '0px' } : { height: '100%' }),
        // position: 'fixed',
        position: 'absolute',
        bottom: '0px',
        backgroundColor: 'white',
        //// backgroundColor: 'red',
        //// transition: 'height 3s ease',
        borderRadius: '20px 20px 0px 0px',
        boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)',
        // boxShadow: '0px 2px 4px 2px rgba(255, 0, 64, 0.2)',
      }}
      in={!isEpmtyHeightBox} //zare_nk_050202_nokteh(moadele show() va hide() dar bootstrap) 
      timeout="auto"
      unmountOnExit  //zare_nk_050202_nokteh(age in attribute ra benevisim age in={false} beshe az dom hazf mishe,age in attribute ra nanevisim 
    // age in={false} beshe az dom hazf nemishe va dar inspect vojood dareh va faghat hidden mishe)
    >
        
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
            className={isAddressFormInputsTextEmty.Address ? `${Styles.invalid} ` : `${Styles.valid} `}

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
              className={isAddressFormInputsTextEmty.pelak ? `${Styles.invalid} ` : `${Styles.valid} `}

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
              className={isAddressFormInputsTextEmty.vahed ? `${Styles.invalid} ` : `${Styles.valid} `}

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
            className={isAddressFormInputsTextEmty.addressName ? `${Styles.invalid} ` : `${Styles.valid} `}

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
            id="bigShooBtn"
            onClick={saveAddress}
            style={{
              width: '100%', color: '#ffffff',
              fontSize: '.875rem', padding: '1rem .75rem', backgroundColor: '#ff5900',
              borderRadius: '.75rem', height: '3rem', border: 'none',
              // marginTop: '0.78rem', marginBottom: "1.75rem",
            }}
          >ذخیره تغییرات</button>
        </div>
      </form >
      {/* </Paper> */}
    </Collapse>
  </>)

  // }  //zare_nk_050203_commented
}

export default function LocationPage() {
  const [currentPage, setCurrentPage] = useState("firstPage");
  const [mobileVal, setMobileVal] = useState("");
  const [isMobileTextEmty, setIsMobileTextEmty] = useState(true);  //zare_nk_041227_added
  const [smsVal, setSmsVal] = useState("");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [mobileError, setMobileError] = useState("");
  const [smsError, setSmsError] = useState("");
  const refForMobileInput = useRef<(HTMLInputElement | null)[]>([]);
  const refForSmsInput = useRef<(HTMLInputElement | null)[]>([null]);
  const refForMobileCheckBtn = useRef<HTMLButtonElement | null>(null);
  const refForCheckSmsBtn = useRef<HTMLButtonElement | null>(null);
  const [isDisabledMobileCheckBtn, setIsDisabledMobileCheckBtn] =
    useState(true);
  const [isDisabledCheckSmsBtn, setIsDisabledCheckSmsBtn] = useState(true);
  const [backBtnCliked, setBackBtnCliked] = useState(false);
  const [mobileCheckBtn, setMobileCheckBtn] = useState(false);
  // let timerStr = null;
  // if (typeof window !== "undefined") {
  //   timerStr = localStorage.getItem("timer");
  // }
  // const initialTimer = timerStr !== null ? JSON.parse(timerStr) : 40000;
  // const [timer, setTimer] = useState(initialTimer);
  const [isDisabledResendCode, setIsDisabledResendCode] = useState(true);
  const [isDisabledRemovTimerBtn, setIsDisabledRemovTimerBtn] = useState(true);

  const [newSmsVal, setNewSmsVal] = useState('');

  const SmsInputRefs = useRef<HTMLInputElement[]>(Array(5).fill(null));
  const [focusItem, setFocusItem] = useState<number>(0);

  ////zare_nk_050117_added_st
  const [isEpmtyHeightBox, setIsEpmtyHeightBox] = useState(true);
  // const [heightBox, setHeightBox] = useState<string>('0px');   //zare_nk_050203_commented
  const refForBox = useRef<HTMLDivElement | null>(null);
  const [boxHtml, setBoxHtml] = useState<any>(null);
  ////zare_nk_050117_added_end

  // const { userData, login, logout } = useAuthentication(); //zare_nk_050111_added
  const { isLogin } = useAuthentication(); //zare_nk_050111_added
  console.log('zare_nk_050111-isLogin from context:', isLogin);

  ////zare_nk_050109_added_st
  var defZoom: number | undefined = 18;

  var featureToPaskari; var addressMatni = '';

  //  var map = null;
  const [map, setMap] = useState<Map | null>(null);

  const [styles1, setStyles1] = useState<Style | null>(null);

  const [vSource1, setVSource1] = useState<VectorSource | null>(null);


  //  const [vSource1, setVSource1] = useState<VectorSource<Feature<Point>> | null>(null);

  //// const [vLayer1, setVLayer1] = useState<VectorLayer | null>(null);  //zare_nk_050109_commented(VectorLayer yek classe generic hast)
  ////zare_nk_050126_nokteh_st(VectorLayer yek classe generic hast,va baraye clashaye generic bayad noe manbae(yani source) dakhelash moshakhas shavad,ma ham
  //  ba dastoore VectorLayer<VectorSource> noe soursesh ra VectorSource lahaz kardim(age noe source genericha ro nagim az nazare typeScript khata hast))
  const [vLayer1, setVLayer1] = useState<VectorLayer<VectorSource> | null>(null);
  ////zare_nk_050126_nokteh_end(VectorLayer yek classe generic hast,va baraye clashaye generic bayad noe manbae(yani source) dakhelash moshakhas shavad,ma ham
  //  ba dastoore VectorLayer<VectorSource> noe soursesh ra VectorSource lahaz kardim(age noe source genericha ro nagim az nazare typeScript khata hast))

  ////zare_nk_050126_nokteh_st(albate VectorSource ham generice va bayad noe sourcesh ro moshakhas konim,vali chon dar tarife in class tavassote barnamenevisane 
  // openlayer behesh voroodiye pishfarze Geometry dadand man nadam error nemideh,tarife classe VectprSource taghriban intotiye:
  // class VectorSource<G extends Geometry = Geometry> extends Source {
  //     // ...
  // }
  // pas lazem nist kolle ebarat ra hatman be soorate zir benevisim:
  //  const [vLayer1, setVLayer1] = useState<VectorLayer<VectorSource<Geometry>> | null>(null)
  //)

  // var feature: (Feature | null) = null;  //zare_nk_050109_commented
  const [feature, setFeature] = useState<Feature | null>(null);  //zare_nk_050109_added

  console.log('rezam-rendered');

  useEffect(() => {
    console.log('rezam-first useEffect');

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
        // center:   [52.4152, 39.6872] ,    //ol.proj.fromLonLat([51.389, 35.6892]), 
        zoom: 18,  //zare_nk_040912_added
        projection: "EPSG:3857",
      })
    })
    ////zare_nk_050110_nokteh(nemidoonam chera vaghti kolle new Map ra dakhele setMapp mirizim do naghshe dar tage #id123 lahaz mishe!
    // albateh midoonim ke react dastoorate dakhele useEffect(...,[]) ra baraye testgiri dobar ejra mikone ba vojoode yek bar seda zadeh shodane useEffecti ke [] dare.
    //pas do bar setMap ejra mishe ke do naghshe ro khahim dash dar ja naghshei(#id123) vali vaghti new Map ra dar moteghayere const mirizim react midoone ke const ra
    // nabayad bad az khatte tarif mojadad meghdar bedeh,pas setMap ba inke dobare sedaa zadeh mishe dastoore returne toosh amal nemikone,chon meghdare moteghayere 
    // const newMap tagheiri nakarde va moshkele do naghshe dar ja naghshei hal mishe ba tarife moteghayere const )
    setMap(() => {
      console.log('rezam-setMap');
      return (newMap);
    });

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


    setStyles1(() => {
      console.log('rezam-setStyles1');
      return (newStyle);
    });


    const newVectorSource = new VectorSource({
      // projection: 'EPSG:4326', //zare_nk_050109_commented(tosiye mishe projection dar View gonjoondeh beshe)
    });
    setVSource1(() => {
      console.log('rezam-setVSource1');
      return (newVectorSource);
    });
    ////zare_nk_050109_commented_st(bordim be useEffecte [vSource1])
    // setVLayer1(() => {
    //   return (
    //     new VectorLayer<VectorSource<Geometry>>({ 
    //      source: vSource1,
    //      style: styles1,
    //      updateWhileAnimating: true,
    //      updateWhileInteracting: true,
    //     }));
    // }); 
    ////zare_nk_050109_commented_en(bordim be useEffecte [vSource1])
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

  useEffect(() => {
    console.log('useeeeeeeeeeeeeeeeeeeeeeeeeeeeee vSource1 called!!!!');
    if (vSource1 && styles1 != null) {
      console.log('useeeeeeeeeeeeeeeeeeeeeeeeeeeeee vSource1  in if');
      setVLayer1(() => {
        return (
          new VectorLayer<VectorSource>({
            source: vSource1, // حالا vSource1 قطعاً VectorSource<Geometry> است
            style: styles1,
            updateWhileAnimating: true,
            updateWhileInteracting: true,
          }));
      });
    }
    else {
      console.log('useeeeeeeeeeeeeeeeeeeeeeeeeeeeee vSource1 noot in if');
    }
  }, [vSource1]);
  // }, []);

  async function showPosition(position: PositionType) {
    if (Array.isArray(position)) {
      // اگر آرایه بود، مستقیماً از عناصرش استفاده کن
      let coord = position;
      longitude.current = coord[0];
      latitude.current = coord[1];
      console.log(`1234-Position set from array: Longitude=${longitude.current}, Latitude=${latitude.current}`);
    }
    else {
      // در غیر این صورت (یعنی آبجکت هست)، مطمئن می‌شیم که coords داره
      // Type guard: TypeScript حالا می‌دونه که 'position' از نوع PositionCoords هست
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

    if (longitude.current == null || latitude.current == null) {
      longitude.current = 53.0585; latitude.current = 36.5659;
    }
    console.log(`1234-finalyt Longitude=${longitude.current}, Latitude=${latitude.current}`);
    //  if (longitude.current === null ||  longitude.current === undefined) {
    //       longitude.current = 53.0585;  
    //     }
    //     if (latitude.current === null ||  latitude.current === undefined ) {
    //       latitude.current = 53.0585;  
    //     }

    setFeature(() => {
      return (
        new Feature({
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
        }));
    });

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

  function continuation() {
    var firstCoordinates = LocationArr[0].loc;
    map?.getView().setCenter(fromLonLat([firstCoordinates.X, firstCoordinates.Y]));
    map?.getView().setZoom(18);
    // map?.addLayer(vLayer1 );  

    if (vLayer1) { // این چک می‌کنه که vLayer1 null یا undefined نباشه
      // alert('continuation-vLayer1');
      console.log("vLayer1 is not null,firstCoordinates.X: " + firstCoordinates.X + '-firstCoordinates.Y: ' + firstCoordinates.Y);
      if (map) {
        console.log('mapmapmapmapmapmapmap');
      }
      else {
        console.log('nooooo mmapmapmapmapmapmapmap');
      }
      map?.addLayer(vLayer1);
    } else {
      // alert('continuation-!vLayer1');
      console.log("vLayer1 is null, cannot add layer to map.");
      // می‌تونید اینجا یه لایه پیش‌فرض بسازید یا کاری انجام بدید
    }
    map?.updateSize();
  }

  useEffect(() => {
    if (map && vLayer1) {
      //  if (map.getView().getZoom() < 18) {
      if ((map.getView().getZoom() ?? 0) < 18) {
        console.log('less than 18');
      }
      else {
        console.log('bigger than 18');
      }

      // //  var LocationArr = []; var featuresArr = [];
      // // document.edditAdderssId = '';  //zare_nk_050108_tahlilshe(ehtemalan bimorede!!)
      // // var longitude = null; var latitude = null;

      showPosition([53.0585, 36.5659]);
    }
  }, [map, vLayer1]);

  useEffect(() => {
    console.log("001");
    if (map && feature) {
      console.log("002");
      featureToPaskari = feature;
      vSource1?.removeFeature(feature);
      vSource1?.clear();
      vSource1?.getFeatures().map(item => {
        vSource1.removeFeature(item);
      });
      vSource1?.addFeature(feature);
      featuresArr.push(feature);
      console.log("longitude: " + longitude.current + '-latitude: ' + latitude.current);
      LocationArr = [];
      LocationArr.push({
        'loc': {
          'X': longitude.current,
          'Y': latitude.current
        }
      });
      continuation();

      map?.on('moveend', function (event) {
        ////zare_nk_040912_added_st
        if ((map.getView().getZoom() ?? 0) < 18) {
          // alert('less than 18');
        }
        else {
          // alert('bigger than 18');
        }
        ////zare_nk_040912_added_end 

        let centerCoords3857 = map.getView().getCenter();
        console.log("moveend-feature.get('name').X: " + feature);
        if (centerCoords3857) {
          console.log("moveend-feature.get('name').X: " + feature.get('name').X);
          // feature?.getGeometry()?.setCoordinates(centerCoords3857);
          feature.setGeometry(new Point(centerCoords3857));
          let coordinate = transform(centerCoords3857, 'EPSG:3857', 'EPSG:4326');
          let lat = coordinate[1]// ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')[1]; // age age az scripte ol dar view estefade nakonim va az sabke import estefade konim nabayad az ol.proj.transform estefade kard,vagarna bayad az ol.proj.transform estefade kard
          let lng = coordinate[0]// ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')[0];  // age age az scripte ol dar view estefade nakonim va az sabke import estefade konim nabayad az ol.proj.transform estefade kard,vagarna bayad az ol.proj.transform estefade kard
          feature.get('name').X = lng; feature.get('name').Y = lat;
        }
      });

      map.on('pointerdrag', function () {
        defZoom = map.getView().getZoom();

        ////zare_nk_040911_added_st
        let centerCoords3857 = map.getView().getCenter();
        if (centerCoords3857) {
          console.log("pointermove-feature.get('name').X: " + feature.get('name').X + '-feature.getGeometry().getCoordinates()[0]: ' + feature.getGeometry() ? [0] : 777
            + "-pointermove-feature.get('name').Y: " + feature.get('name').Y + '-feature.getGeometry().getCoordinates()[1]: ' + feature.getGeometry() ? [1] : 888); //feature.getGeometry().getCoordinates()[1]);
          // feature.getGeometry().setCoordinates(centerCoords3857);
          feature.setGeometry(new Point(centerCoords3857));
          let coordinate = transform(centerCoords3857, 'EPSG:3857', 'EPSG:4326');
          ////zare_nk_040911_added_end 
          //let coordinate = feature.getGeometry().getCoordinates();  //zare_nk_040911_commented  
          let lat = coordinate[1]//ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')[1]; // age age az scripte ol dar view estefade nakonim va az sabke import estefade konim nabayad az ol.proj.transform estefade kard,vagarna bayad az ol.proj.transform estefade kard
          let lng = coordinate[0]//ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')[0]; // age age az scripte ol dar view estefade nakonim va az sabke import estefade konim nabayad az ol.proj.transform estefade kard,vagarna bayad az ol.proj.transform estefade kard
          feature.get('name').X = lng; feature.get('name').Y = lat;
        }
      });
    }
    else {
      console.log("003");
    }
  }, [map, feature]);

  async function saveAddress() {
    if (!feature) {
      return;
    }

    console.log('zare_nk_050110-reza02-feature.get("name").Y: ' + feature.get('name').Y + "-feature.get('name').X: " + feature.get('name').X +
      '-mobileVal: ' + mobileVal + "-feature.get('name').Address: " + feature.get('name').Address);

    // var errorFree = true;
    // $('#anyInputInAdressLocationModal2 .MatnInput').each(function () {
    //   if ($(this).attr('name') == '__RequestVerificationToken' || $(this).attr('name') == 'tahvilNistam') { return; }
    //   if ($('#tahvilNistam').prop('checked') == false && ($(this).attr('name') == 'fName' || $(this).attr('name') == 'lName' || $(this).attr('name') == 'mobile')) {
    //     return;
    //   }
    //   var valid = $(this).hasClass('valid');
    //   var errorElement = $('.forError', $(this).parents('.contAndHoshdarCont'));
    //   if (!valid) {
    //     errorFree = false;
    //     var vall = $(this).val();
    //     if (!vall) {
    //       $(errorElement).text('ورود این فیلد الزامی است');
    //     }
    //   }
    // });
    // if (!errorFree) {
    //   return;
    // }
    // $('#sabtCoordiantInAdressLocationModal2').prop('disabled', true);  //zare_nk_041029_added 

    // var localStorageParsedFortoken = JSON.parse(localStorage.getItem('token'));
    // var FName = ''; var LName = ''; var Mobile = 0; var TahvilGirande = 0;
    // if ($('#tahvilNistam').prop('checked') == true) {
    //   var TahvilGirande = 1;
    //   //FName = $('#fName').val(); LName = $('#lName').val(); Mobile = $('#mobile').val();   //zare_nk_030908_commented
    //   FName = $('#fName').val(); LName = $('#lName').val(); Mobile = ($('#mobile').val().trim() != '' ? $('#mobile').val() : (document.edditAdderssId == '' ? 0 : parseInt($('#Mobile-' + document.edditAdderssId).text())));   //zare_nk_030908_added
    // }
    // //zare_nk_030908_added_st
    // else {
    //   Mobile = (document.edditAdderssId == '' ? 0 : parseInt($('#Mobile-' + document.edditAdderssId).text()));   //'#Mobile-' + Api_CreateAddressParams.IdAdress
    // }
    //zare_nk_030908_added_end
    // var vahedVal = $('#vahed').val();
    // vahedVal = fixNumbers(vahedVal);
    // var Api_CreateAddressParams = {
    //   'FName': FName,
    //   'LName': LName,
    //   'CodePosti': $('#CodePosti').val(),
    //   'Pelak': parseInt($('#pelak').val()),
    //   'Vahed': parseInt(vahedVal),
    //   'Lat': feature.get('name').Y,
    //   'Lon': feature.get('name').X,
    //   'Mobile': Mobile, //age baraye baghiye gereftam
    //   'Adress': /*feature.get('name').Address*/ $('#AddressMatni').val(),  //1808
    //   'TahvilGirande': TahvilGirande,
    //   'OnvanAdress': $('#OnvanAdress').val(),
    // }
    // if (document.edditAdderssId != '') {
    //   Api_CreateAddressParams.IdAdress = document.edditAdderssId;
    //   var urlForCreateOrEdit = PublicApiUrl + "User/Api_EditAddress";
    // }
    // else {
    // var urlForCreateOrEdit = PublicApiUrl + "User/Api_CreateAddress";
    // }

    // $.ajax({
    //   type: "post",
    //   async: false,
    //   url: urlForCreateOrEdit,
    //   headers: {
    //     'Authorization': 'Bearer ' + localStorageParsedFortoken,
    //   },
    //   data: JSON.stringify(Api_CreateAddressParams),
    //   contentType: 'application/json',
    //   dataType: 'json',
    //   beforeSend: function (xhr) {
    //     $('.holder').css('display', 'block');
    //     $('.holder').addClass('opened');
    //   },
    //   error: function (e, ajaxOptions, thrownErrror) {
    //     $('.holder').hide();
    //     $('.holder').removeClass('opened');
    //     checkForError401(e.status);
    //     $('#mymodalForWarning').modal('show');
    //     $('#mymodalForWarning .modal-body span').text('!متاسفانه ارتباط با سرور برقرار نشد');
    //     $('#sabtCoordiantInAdressLocationModal2').prop('disabled', false);  //zare_nk_041029_added
    //   },
    //   success: function (dataa) {
    //     var result = dataa;
    //     if (result.status != 0) {
    //       $('#mymodalForWarning').modal('show');
    //       $('#mymodalForWarning .modal-header').addClass('btn-danger').removeClass('btn-success');
    //       $('#mymodalForWarning .modal-body span').text(result.errors[0]);
    //     }
    //     else if (result.status == 0) {
    //       if (document.edditAdderssId != '') {
    //         var AddAddressVal = JSON.parse(localStorage.getItem('AddAddressVal'));
    //         if (Api_CreateAddressParams.IdAdress == AddAddressVal.IdAddress) {
    //           document.addressSatrSelect('satr-' + Api_CreateAddressParams.IdAdress, Api_CreateAddressParams.IdAdress, Api_CreateAddressParams.Adress, null, null, 1, null, event);  //idshobe==null
    //         }
    //       }
    //       else {
    //         var parsedData = JSON.parse(dataa.data);
    //         document.addressSatrSelect('satr-' + parsedData[0].IdAdress, parsedData[0].IdAdress, parsedData[0].Adress, null, null, 1, null, event);//idshobe==null
    //       }
    //       //$('#AdressLocationModal2').modal('hide');  //zare_nk_030906_added
    //       //$('#AdressLocationModal').modal('hide');  //zare_nk_030906_added
    //       //$('#AdressModal').modal('hide');  //zare_nk_030906_added
    //       //zare_nk_030908_added_st
    //       if (document.edditAdderssId != '' && $('#addressSatrContInProfile').attr('id') != undefined) {  //zare_nk_030908_alan  //Adress-' + item.IdAdress   #addressSatrContInProfile
    //         $('#addressSatrContInProfile #OnvanAdress-' + Api_CreateAddressParams.IdAdress).text(Api_CreateAddressParams.OnvanAdress);
    //         $('#addressSatrContInProfile #Adress-' + Api_CreateAddressParams.IdAdress).text(Api_CreateAddressParams.Adress);
    //         $('#addressSatrContInProfile #Mobile-' + Api_CreateAddressParams.IdAdress).text(Api_CreateAddressParams.Mobile);

    //       }
    //       else if ($('#addressSatrContInProfile').attr('id') != undefined) {
    //         var resultData = JSON.parse(result.data);
    //         Api_CreateAddressParams.Mobile = resultData[0].Mobile;
    //         Api_CreateAddressParams.IdAdress = resultData[0].IdAdress;
    //         $('#addressSatrContInProfile').append('' +
    //           //'<div class="addressSatr" id="satr-' + Api_CreateAddressParams.IdAdress +    //zare_nk_030910_commented
    //           '<div class="addressSatr satr-' + Api_CreateAddressParams.IdAdress + '" id="satr-' + Api_CreateAddressParams.IdAdress +    //zare_nk_030910_added
    //           '" style="display:flex;flex-flow:column; border:2px solid #E7E7E7;padding:15px;margin-top:10px;border-radius:10px;" >' +

    //           '<div style="display:flex;flex-flow:row; padding-bottom:15px;">' +
    //           '<span style="margin-left:7px;">عنوان آدرس :</span>' +
    //           '<span id="OnvanAdress-' + Api_CreateAddressParams.IdAdress + '" style="text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;">' + (Api_CreateAddressParams.OnvanAdress == null ? '' : Api_CreateAddressParams.OnvanAdress) + '</span>' +
    //           '</div>' +

    //           '<div style="display:flex;flex-flow:row; padding-bottom:15px;">' +
    //           '<span style="margin-left:7px;"><img src="https://img.tochikala.com/Icon/home/home-Icon.svg" style="width:20px;" alt="آدرس" /> </span>' +
    //           '<span id="Adress-' + Api_CreateAddressParams.IdAdress + '" style="text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;">' + Api_CreateAddressParams.Adress + '</span>' +
    //           '</div>' +

    //           '<div style="display:flex;flex-flow:row;justify-content:end;justify-items:end;margin-top: 5px;">' +
    //           '<div style="flex: 0 0 auto;display:flex;flex-flow:row;"><span id="Mobile-' + Api_CreateAddressParams.IdAdress + '"  style="justify-self:end;">' + Api_CreateAddressParams.Mobile + '</span></div>' +
    //           '<div style="flex:1 0 auto;display:flex;flex-flow:row;justify-content:end;">' +
    //           '<div style=" margin-left:10px;">' +

    //           '<a class="editAddress" href="#/" onclick="addressLinkClicked(true, true, ' + Api_CreateAddressParams.IdAdress + ')" class="vorsab text-right text-decoration-none d-inline-block rounded mr-1">' +
    //           '<img src="https://img.tochikala.com/Icon/edit-Icon.svg" style="width:20px;" alt="ویرایش آدرس" />' +
    //           '</a>' +

    //           '</div>' +
    //           '<div>' +
    //           '<a class="deleteAddress" href="#/" onclick="hazfeAddress(\'satr-' + Api_CreateAddressParams.IdAdress + '\')" class="vorsab text-right text-decoration-none d-inline-block rounded mr-1">' +
    //           '<img src="https://img.tochikala.com/Icon/RecycleBin.svg" style="width:20px;" alt="حذف آدرس" />' +
    //           '</a>' +
    //           '</div>' +
    //           '</div>' +
    //           '</div>' +

    //           '</div>'
    //         );
    //       }

    //       $('#AdressLocationModal2').modal('hide');  //zare_nk_030906_added
    //       $('#AdressLocationModal').modal('hide');  //zare_nk_030906_added
    //       $('#AdressModal').modal('hide');  //zare_nk_030906_added
    //       //zare_nk_030908_added_st

    //       //zare_nk_030908_commented_st
    //       //if (document.IsProfilee == 0) {

    //       //    //window.history.go(-1);  //zare_nk_030906_commented 
    //       //    $('#AdressLocationModal2').modal('hide');  //zare_nk_030906_added
    //       //    $('#AdressLocationModal').modal('hide');  //zare_nk_030906_added
    //       //    $('#AdressModal').modal('hide');   //zare_nk_030906_added

    //       //}
    //       //else if (document.IsProfilee == 1) {

    //       //    //location.href = "/Profile?IsAddressSec=true&IsOrderSec=false&IsprofilesDetSec=false";  //zare_nk_0630906_commented

    //       //    $('#AdressLocationModal2').modal('hide');  //zare_nk_030906_added
    //       //    $('#AdressLocationModal').modal('hide');  //zare_nk_030906_added
    //       //    $('#AdressModal').modal('hide');  //zare_nk_030906_added

    //       //    if (document.edditAdderssId != '' && $('#addressSatrContInProfile').attr('id')!= undefined) {  //zare_nk_030908_alan  //Adress-' + item.IdAdress   #addressSatrContInProfile
    //       //        $('#addressSatrContInProfile #OnvanAdress-' + Api_CreateAddressParams.IdAdress).text(Api_CreateAddressParams.OnvanAdress);
    //       //        $('#addressSatrContInProfile #Adress-' + Api_CreateAddressParams.IdAdress).text(Api_CreateAddressParams.Adress);

    //       //        $('#addressSatrContInProfile #Mobile-' + Api_CreateAddressParams.IdAdress).text(Api_CreateAddressParams.Mobile);


    //       //    }
    //       //    else if ( $('#addressSatrContInProfile').attr('id') != undefined) {



    //       //        var resultData = JSON.parse(result.data);
    //       //        Api_CreateAddressParams.Mobile = resultData[0].Mobile;




    //       //        $('#addressSatrContInProfile' ).append('' +
    //       //            '<div class="addressSatr" id="satr-' + Api_CreateAddressParams.IdAdress +
    //       //            '" style="display:flex;flex-flow:column; border:2px solid #E7E7E7;padding:15px;margin-top:10px;border-radius:10px;" >' +

    //       //            '<div style="display:flex;flex-flow:row; padding-bottom:15px;">' +
    //       //            '<span style="margin-left:7px;">عنوان آدرس :</span>' +
    //       //            '<span id="OnvanAdress-' + Api_CreateAddressParams.IdAdress + '" style="text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;">' + (Api_CreateAddressParams.OnvanAdress == null ? '' : Api_CreateAddressParams.OnvanAdress) + '</span>' +
    //       //            '</div>' +

    //       //            '<div style="display:flex;flex-flow:row; padding-bottom:15px;">' +
    //       //            '<span style="margin-left:7px;"><img src="https://img.tochikala.com/Icon/home/home-Icon.svg" style="width:20px;" alt="آدرس" /> </span>' +
    //       //            '<span id="Adress-' + Api_CreateAddressParams.IdAdress + '" style="text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;">' + Api_CreateAddressParams.Adress + '</span>' +
    //       //            '</div>' +

    //       //            '<div style="display:flex;flex-flow:row;justify-content:end;justify-items:end;margin-top: 5px;">' +
    //       //            '<div style="flex: 0 0 auto;display:flex;flex-flow:row;"><span style="justify-self:end;">' + Api_CreateAddressParams.Mobile  + '</span></div>' +
    //       //            '<div style="flex:1 0 auto;display:flex;flex-flow:row;justify-content:end;">' +
    //       //            '<div style=" margin-left:10px;">' +

    //       //            '<a class="editAddress" href="#/" onclick="addressLinkClicked(true, true, ' + Api_CreateAddressParams.IdAdress + ')" class="vorsab text-right text-decoration-none d-inline-block rounded mr-1">' +
    //       //            '<img src="https://img.tochikala.com/Icon/edit-Icon.svg" style="width:20px;" alt="ویرایش آدرس" />' +
    //       //            '</a>'+

    //       //            '</div>' +
    //       //            '<div>' +
    //       //            '<a class="deleteAddress" href="#/" onclick="hazfeAddress(\'satr-' + Api_CreateAddressParams.IdAdress + '\')" class="vorsab text-right text-decoration-none d-inline-block rounded mr-1">' +
    //       //            '<img src="https://img.tochikala.com/Icon/RecycleBin.svg" style="width:20px;" alt="حذف آدرس" />' +
    //       //            '</a>' +
    //       //            '</div>' +
    //       //            '</div>' +
    //       //            '</div>' +

    //       //            '</div>'
    //       //        );

    //       //    }
    //       //}
    //       //else {
    //       //    console.log("document.IsProfileechiyeeeehhh????!!!!!");    
    //       //}
    //       //zare_nk_030908_commented_end

    //       document.checkTokenAndOurStoresInScriptAbove(); //zare_nk_030911_added(for call checkTokenAndOurStoresInScriptAbove);
    //     }
    //     $('#sabtCoordiantInAdressLocationModal2').prop('disabled', true);  //zare_nk_041029_added
    //     $('.holder').hide();
    //     $('.holder').removeClass('opened');
    //   }
    // });
    ////zare_nk_050110_added_st

    let token = getCookie("token");
    console.log('zare_nk_050110-token hala is: ' + getCookie("token"));
    // if (typeof window !== "undefined") {
    //   alert('hhhhhhhhhhhhhhh');
    //   token = localStorage.getItem("Token") || "";
    // }
    console.log('zare_nk_050110-token: ' + token);
    var Api_CreateAddressParams = {
      'FName': 'reza',
      'LName': 'kavian',
      'CodePosti': '1231231231',
      'Pelak': 1,
      'Vahed': 5,
      'Lat': feature.get('name').Y,
      'Lon': feature.get('name').X,
      'Mobile': '09999999999',// mobileVal,
      // 'Adress': /*feature.get('name').Address*/ $('#AddressMatni').val(),   
      'Adress': 'dokhaniat',// feature.get('name').Address, //feature.get('name').Address,
      // 'TahvilGirande': TahvilGirande,
      // 'OnvanAdress': $('#OnvanAdress').val(),
    }
    let ApiUrl = "https://api.tochikala.com/api/";
    // console.log('mobileVal: ' + mobileVal + '-newSmsVal: ' + newSmsVal);
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
        // let token = data.data.token;
        //////zare_nk_040603_added_st 
        //// // const secretKey = Buffer.from(
        //// //   process.env.JWT_SECRET_BASE64!,
        //// //   "base64"
        //// // ).toString("utf-8");
        //// // const decoded = jwt.verify(token, secretKey);
        //// const decoded = jwt.decode(token) as JwtPayload | null;
        //// console.log("040530-03-token: " + JSON.stringify(decoded));
        ////zare_nk_040603_added_end        

        // try {
        ////zare_nk_041114_added_st(and commented. chon methode HttpContext.SignInAsync ra anjam mideh baraye online kardan be sabke HttpContext marboot be .net core c# 
        // vali man ino nemikham chon hamin cookie token sakhtan baram kafiye be onvane amale online kardan va amale estelame online boodane karbar. dar zemn ma dar view haye c#
        // ke nistim ba hamin emkanate HttpContext mesle(HttpContextAccessor.HttpContext!.User.Identity!.IsAuthenticated)baraye estelame online boodan estefadeh konim!
        // pas az haman sakhte va vakeshiye cookie haviye token ke name token ra behesh dadam baraye moshakhas kardane online shodan va estelame online boodaanesh estefadeh mikonam
        //va in kar ra dar methode verifyToken gonjandim)

        //           let ApiUrl = "https://api.tochikala.com/api/";
        // const responseValidationPost = await fetch(ApiUrl +"/User/ValidationPost", {
        //             method: "POST",
        //             headers: { "Content-Type": "application/json" },
        //             body: JSON.stringify({ token }),
        //           });
        ////zare_nk_041114_added_end(and commented. chon methode HttpContext.SignInAsync rp anjam mideh baraye online kardan be sabke HttpContext marboot be .net core c# 
        // vali man ino nemikham chon hamin cookie token sakhtan baram kafiye be onvane amale online kardan va amale estelame online boodane karbar. dar zemn ma dar view haye c#
        // ke nistim ba hamin emkanate HttpContext mesle(HttpContextAccessor.HttpContext!.User.Identity!.IsAuthenticated)baraye estelame online boodan estefadeh konim!
        // pas az haman sakhte va vakeshiye cookie haviye token ke name token ra behesh dadam baraye moshakhas kardane online shodan va estelame online boodaanesh estefadeh mikonam
        //va in kar ra dar methode verifyToken gonjandim)

        // const response = await fetch("/api/auth/verifyToken", {  //zare_nk_041115_nokteh(methode Api_LoginUser2 tavassote aghaye parsafar chek mishe dar morede dorostiye sms va zamane monghazi shodanesh,
        //   //vali man mikham bedoonam tokeni ke methode Api_LoginUser2 be man mideh ba secretKey amn shodeh bashe,va projeye samte cllient hatman bayad kelide dastresi ro dashteh bashe ta kasi 
        //   //ba sooeestefade token ro natooneh vakeshi koneh(masalan dar proje haye haker ha),pas az methode verifyToken ke ba dastoore jwt.verify az ma secretKey mikhad estefadeh kardam)
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ token }),
        // });
        // const data = await response.json();
        // if (response.ok) {
        //   console.log("zare_nk_040925-decodedToken: " + JSON.stringify(data.decoded));
        //   ////zare_nk_040925-decodedToken: {"IdUser":"10006","Mobile":"9351091287","FullName":"رضا کاویان","Type":"User","nbf":1770193087,"exp":1772785087,"iat":1770193087}  //zare_nk_041115_nokteh(from api tochikala)
        //   ////zare_nk_040925-decodedToken: {"unique_name":"20109","CodeMoshtari":"20109","Mobile":"9351091287","NameMoshtari":"","nbf":1750740741,"exp":1751345541,"iat":1750740741}  //zare_nk_041115_nokteh(from api testotmapi)

        //   // const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString(); // 3 ساعت بعد //zare_nk_040219-nokteh(zamane monghazi ra khodam taein kardam)   //zare_nk_040305_updated(dasti ra az 3 be 30 tagheir dadam)
        //   const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString();
        //   //  const expires = data.decoded.exp;//zare_nk_040219-nokteh(zamane monghazi ra az dadeye parsafar taein kardam)
        //   document.cookie = `token=${token}; path=/; expires=${expires}; secure; samesite=None`;
        //   const redirect = getCookie("redirect") || "/";
        //   document.cookie =
        //     "redirect=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC"; // حذف کوکی
        //   console.log('redirect iss: ' + getCookie("redirect"));
        //   router.replace(redirect); //zare_nk_040228_commented(and zare_nk_040312 uncommented(chon safheh ro refresh nemikoneh va behtare ehtemalan))
        //   // NextResponse.redirect(new URL("/login", request.url));//zare_nk_040228_added
        //   // window.location.href = redirect;
        //   // window.location.replace(redirect); //zare_nk_040312_commented(chon router.replace ya router.push safheh ro kamel refresh nemikonam behtare)
        // } else {
        //   document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        //   document.cookie = `google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        //   setError("متاسفانه خطایی رخ داده است313:" + (data?.errorMessage ? ": " + data.errorMessage : ""));  //zare_nk_041107_added_tahlilshe(niaz bood??!!)
        // }
        // } catch (error) {
        // document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        // document.cookie = `google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        // console.error("zare_nk_040925-❌ خطااااااااااااااااااای JWT:", error);
        // // setError("متاسفانه خطایی رخ داده است33:" + error);  //zare_nk_041107_commented
        // ////zare_nk_041107_added_st
        // if (error instanceof Error) {
        //   setError("متاسفانه خطایی رخ داده است323:" + error.message);
        // } else {
        //   setError("متاسفانه خطایی رخ داده است343:" + String(error));
        // }
        // ////zare_nk_041107_added_end
        // }
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
    ////zare_nk_050110_added_end
  }

  ////zare_nk_050118_commented_st
  // const bigShoo = () => {
  //   const box = document.getElementById("box");
  //   if (box) { 
  //     setBoxHtml(() => {
  //       return (<> 
  //         <header
  //           style={{
  //             display: "flex",
  //             flexDirection: "column",
  //             alignItems: "center",
  //             flexShrink: "0",
  //             width: "100%",
  //             height: "min-content",

  //           }}>
  //           <div
  //             style={{
  //               backgroundColor: '#eaeaeb',
  //               borderRadius: '20px',
  //               flexShrink: '0',
  //               width: '2.5rem',
  //               height: '.25rem',
  //               marginTop: '.75rem', 
  //             }}
  //           ></div>
  //           <div
  //             style={{
  //               color: '#1b1c1d',
  //               fontWeight: 600,
  //               padding: '1rem',
  //               justifyContent: 'space-between',
  //               alignItems: 'center',
  //               flexShrink: '0',
  //               width: '100%',
  //               height: '3.5rem',
  //               display: 'flex',
  //               scrollbarWidth: 'none',
  //             }}>
  //             انتخاب آدرس
  //           </div>
  //         </header>
  //       </>)
  //     });

  //     const scrollHeight = box.scrollHeight; 
  //     setHeightBox(scrollHeight + "px");
  //     setIsEpmtyHeightBox(false);
  //   }
  // }
  ////zare_nk_050118_commented_end
  ////zare_nk_050118_added_st
  const bigShoo = () => {
    // console.log('zare_nk_050118_bigShoo called-01');
    // const box = document.getElementById("box");
    // if (box) {
    // const scrollHeight = box.scrollHeight;
    // setHeightBox(scrollHeight + "px");
    setIsEpmtyHeightBox(false);
    // }
    // // else{
    // //   setHeightBox('0px');
    // //   setIsEpmtyHeightBox(true);
    // // }
  }

  ////zare_nk_050118_added_end
  console.log('zare_nk_050118_LocationPage reRendered-02!!');
  useEffect(() => {
    console.log('zare_nk_050118_useEffect called-03-isEpmtyHeightBox: ' + isEpmtyHeightBox); //+ '-heightBox: ' + heightBox);
    const handleClickOutside = (event: any) => {
      const bigShooBtn: boolean = event.target.id === 'bigShooBtn';

      console.log('zare_nk_050118_04-handleClickOutside-refForBox.current: ' + refForBox.current + '-contains: ' +
        refForBox.current?.contains(event.target) + '-isEpmtyHeightBox: ' + isEpmtyHeightBox + '-heightBox: ' +  // heightBox +
        '-bigShooBtn: ' + bigShooBtn);

      if (refForBox.current && !refForBox.current.contains(event.target) && !isEpmtyHeightBox
        && !bigShooBtn   //zare_nk_050118_commented
      ) {
        console.log('zare_nk_050118_kharj click-05');
        setIsEpmtyHeightBox(true);
        // setHeightBox('0px'); //zare_nk_050203_commented
      }
      else {
        console.log('zare_nk_050118_dakhel click-05');

        // const box = document.getElementById("box");
        // if (box) { 
        // const scrollHeight = box.scrollHeight; 
        // } 
        var refForBoxElement = refForBox.current;
        if (refForBoxElement) {
          const scrollHeight = refForBoxElement.scrollHeight;
        }
      }
    };

    // اضافه کردن listener به document
    document.addEventListener('click', handleClickOutside);

    // پاک کردن listener موقع unmount شدن کامپوننت
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
    // }, [isEpmtyHeightBox,heightBox]);  
    // }, [isEpmtyHeightBox, heightBox]);  //zare_nk_050203_commented
  }, [isEpmtyHeightBox]);   //zare_nk_050203_added

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

        <div
          style={{
            // border: '2px dashed blue',
            flex: '1 1 auto',
            width: '100%',
            position: 'relative',
          }}>

          <div id="id123"
            style={{
              // border: '2px dashed black',
              // backgroundColor: 'yellow',
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: '0px',
              left: '0px',
              zIndex: 0,
            }}>
          </div>

          {/* <div id="tempiii"
            style={{
              border: '2px dashed black',
              backgroundColor: 'red',
              width: '70px',
              height: '40px',
              position: 'absolute',
              top: '30px',
              right: '10px',
              zIndex: 1,
            }}>
            <button
              // ref={refForMobileCheckBtn}
              id="saveAddress"
              // className={Styles.disabledBtn}
              onClick={saveAddress}
            // disabled={isDisabledMobileCheckBtn}
            >
              ذخیره آدرس
            </button>
          </div> */}

        </div>
 
        <div
          style={{
            // border: '2px dashed yellow',
            flex: '0 0 auto',
            width: '100%',
            paddingTop: '1rem', paddingLeft: '1rem', paddingRight: '1rem',
            display: "flex", flexFlow: "column", gap: '1.25rem',
          }}>

          {isLogin ? (<>
            <h1 style={{ fontWeight: 600, color: '#1b1c1d', margin: 0, fontSize: 'inherit', }}>موقعیت مکانی</h1>

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
                  fontSize: '.875rem', padding: '1rem .75rem', backgroundColor: '#ff5900',
                  borderRadius: '.75rem', height: '3rem', border: 'none', marginTop: '0.78rem', marginBottom: "1.75rem",
                }}
              >ادامه</button>
            </div>
          </>
          ) : (
            <>
              <div>
                <p>شما وارد نشده‌اید  -  {isLogin} </p>
              </div>
            </>
          )}
        </div>

        {/* <div
          ref={refForBox}
          id="box"
          style={{
            // width: '100%',
            width: '450px',
            maxWidth: '100%',
            // height: heightBox, //zare_nk_050131_commented
            // inset:'0',  //zare_nk_050131_added

            // zare_nk_050127_nokteh(chon dar componente farzand(yani BoxHtmlComponent) setHeightBox anjam mishe va heightBox tagheir mikoneh, va 
            // dar componente pedar az heightBox estefadeh mikonim dar khatte bala(height: heightBox) pas barnameh hooshmandaneh componente 
            // pedar(yani LocationPage) ra reRender mikoneh ta ertefae dive#box berooz beshe,vagarna age componente farzand tasiri dar kharej az 
            // htmli ke khodesh barmigardoond dar ghesmathaye digeye html pedaresh tasiri nemizasht, paedaresh reRender nemishod )
            position: 'fixed',
            bottom: '0px',
            overflow: 'hidden',


            backgroundColor: 'white',
            transition: 'height 3s ease',
            borderRadius: '20px 20px 0px 0px',
          }}> */}
        {/* {boxHtml} */}

        {/* {!isEpmtyHeightBox &&  //zare_nk_050203_commented */}

        <BoxHtmlComponent
          // heightBox={heightBox}          //zare_nk_050203_commented
          // setHeightBox={setHeightBox}    //zare_nk_050203_commented
          isEpmtyHeightBox={isEpmtyHeightBox}
          setIsEpmtyHeightBox={setIsEpmtyHeightBox}
          refForBox={refForBox}
          saveAddress={saveAddress}
        />
        {/* }  //zare_nk_050203_commented */}


        {/* </div> */}

      </main>
      <footer></footer>
    </>
  );
}
