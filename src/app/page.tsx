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

  const router = useRouter();

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

  ////zare_nk_050206_nokteh002_st(yek rooydade ekhtesasi baraye yek tag(voroodiye yek tag ro migireh, khoroojiye yek tag ro mideh))
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
  ////zare_nk_050206_nokteh002_end(yek rooydade ekhtesasi baraye yek tag(voroodiye yek tag ro migireh, khoroojiye yek tag ro mideh))

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
      ////zare_nk_050206_nokteh_st(in dastoorat dar in makan javab nemideh,baraye login chon har safhe faghat yek tage voroodi dasht javab midad)
      // setIsDisabledsaveAddressFormInputsBtn(true);
      // if (refForSaveAddressFormInputsBtn.current) {
      //   refForSaveAddressFormInputsBtn.current.classList.add(Styles.disabledBtn);
      //   refForSaveAddressFormInputsBtn.current.classList.remove(Styles.btn);
      // }
      ////zare_nk_050206_nokteh_end(in dastoorat dar in makan javab nemideh,baraye login chon har safhe faghat yek tage voroodi dasht javab midad)
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
    ////zare_nk_050206_nokteh_st(in dastoorat dar in makan javab nemideh,baraye login chon har safhe faghat yek tage voroodi dasht javab midad)
    //   setIsDisabledsaveAddressFormInputsBtn(true);
    //   if (refForSaveAddressFormInputsBtn.current) {
    //     refForSaveAddressFormInputsBtn.current.classList.add(Styles.disabledBtn);
    //     refForSaveAddressFormInputsBtn.current.classList.remove(Styles.btn);
    //   }
    ////zare_nk_050206_nokteh_end(in dastoorat dar in makan javab nemideh,baraye login chon har safhe faghat yek tage voroodi dasht javab midad)
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
      ////zare_nk_050206_nokteh_st(in dastoorat dar in makan javab nemideh,baraye login chon har safhe faghat yek tage voroodi dasht javab midad)
      // setIsDisabledsaveAddressFormInputsBtn(false);
      // if (refForSaveAddressFormInputsBtn.current) {
      //   refForSaveAddressFormInputsBtn.current.classList.remove(Styles.disabledBtn);
      //   refForSaveAddressFormInputsBtn.current.classList.add(Styles.btn);
      // }
      ////zare_nk_050206_nokteh_end(in dastoorat dar in makan javab nemideh,baraye login chon har safhe faghat yek tage voroodi dasht javab midad)
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
    ////zare_nk_050206_nokteh_st(in dastoorat dar in makan entezar dashtim javab bedeh, chon chandin tage voroodi ro barresi mikoneh,vali chon addressFormInputsMatnError 
    //// hanooz meghdar nagerefteh va dar rendere badi emel mishe,pas inja meghdare jadidi ke dadim balatar emal nashodeh,baraye dastresi be meghdare jadide state morede 
    //// nazar az useEfffect(()=>{},[addressFormInputsMatnError]) estefadeh kardim ke dar rendere badi dastresi peyda mikoneh )
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
    ////zare_nk_050206_nokteh_end(in dastoorat dar in makan entezar dashtim javab bedeh, chon chandin tage voroodi ro barresi mikoneh,vali chon addressFormInputsMatnError 
    //// hanooz meghdar nagerefteh va dar rendere badi emel mishe,pas inja meghdare jadidi ke dadim balatar emal nashodeh,baraye dastresi be meghdare jadide state morede 
    //// nazar az useEfffect(()=>{},[addressFormInputsMatnError]) estefadeh kardim ke dar rendere badi dastresi peyda mikoneh )
  }

  useEffect(() => {
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

  useEffect(() => {
    ////zare_nk050206__olgu_st(baraye codhaye js dastresi be tagha negah dashtam)
    // console.log('zare_nk_050118_AdressListComponentAdressListComponentAdressListComponentAdressListComponent');
    // // const box = document.getElementById("box");
    // // if (box) {
    // //   const scrollHeight = box.scrollHeight;
    // //   setHeightBox(scrollHeight + "px"); 
    // // }
    // var refForBoxElement = refForBox.current;
    // if (refForBoxElement) {
    //   const scrollHeight = refForBoxElement.scrollHeight;
    //   // setHeightBox(scrollHeight + "px");  //zare_nk_050203_commented
    // }
    ////zare_nk050206__olgu_end(baraye codhaye js dastresi be tagha negah dashtam)
  });

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
      {/* <Paper> */}
      {/* <div style={{ border: '2px dashed red', backgroundColor: 'blueviolet', }}>سلام دراور</div> */}
      <Box sx={{

        // border: '2px dashed red', backgroundColorr: 'green',
      }}>
        {/* <Typography variant="h4" gutterBottom
                            // className={`${Styles.ISW_Medium_fa} ${Styles.corTesti}`}   //zare_nk_050204_nokteh(classhaye filhaye .module.css mamoolan baraye taghaye MUI olaviate paeintari 
                            // darand nesbat be designhaye dakheliye MUI(ke bazi css ha ra dakheli tanzim mikonan),va shayad kar nakonand(masalan baraye fontFamily mamoolan  kar nemikoneh
                            // vali baraye color test kardam kar kard),baraye hamin fonte IRANSansWeb_Medium(adad_fa) ra mostaghiman dar sx ya style neveshtim(dar zemn dar sx ya style
                            // pedareshoon ham benevisim bazam ehtemal dare kar nakonam,va behtare mostaghim dar dar sx ya style khodeshoon benevisim ) )
                            sx={{ border: '2px dashed black', fontFamily: '"IRANSansWeb_ms(adad_fa)", "IRANSansWeb_Medium(adad_fa)"', }}
                            // style={{fontFamily: '"IRANSansWeb_ms(adad_fa)", "IRANSansWeb_Medium(adad_fa)"  '}} 
        
                        >
                            مثال دکمه و Collapse با MUI
                        </Typography> */}
        {/* zare_nk_050206_alan */}
        <div>
          <div>ddd</div>

          <div style={{ padding: '1rem', justifyContent: 'space-between', alignItems: 'center', flex: '0 0 auto', width: '100%', height: '3.5rem', display: 'flex', }}>
            <span style={{ color: "#1b1c1d", fontSize: '16px', flex: '0 0 auto', }}>انتخاب آدرس</span>
            <button
              id="closeAddresListBtn"
              onClick={() => {
                // setCloseAddresList(true);
                setIsEpmtyAdressList(true);
              }}
              style={{
                width: '32px', height: '32px', border: 'none', flex: '0 0 auto', display: "flex",
                flexFlow: "row", justifyContent: 'center', justifyItems: 'center', alignItems: 'center', borderRadius: '9999px',

              }}
            >
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="#ff5900" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-6 fill-gray"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.6565 7.75735L13.4138 12L17.6565 16.2426L16.2423 17.6568L11.9996 13.4142L7.75699 17.6568L6.34277 16.2426L10.5854 12L6.34277 7.75735L7.75699 6.34314L11.9996 10.5858L16.2423 6.34314L17.6565 7.75735Z" fill="inherit"></path></svg>
            </button>
          </div>

        </div>



        <div //className="w-full flex-1 mt-4 px-4 pb-7"
          style={{
            paddingBottom: '1.75rem', paddingLeft: '1rem', paddingRight: '1rem', flex: '1 1 0%', width: '100%', marginTop: '1rem',
          }}>


          <p className="ISW_ms_fa"
            style={{
              color: '#63676e',
              fontSize: '.875rem',
              lineHeight: '1.25rem',
              marginBottom: '.5rem',
              // fontFamily:"IRANSansWeb_ms(adad_fa)",
              // fontFamily:"IRANSansWeb_Medium(adad_fa)",
            }}
          >لطفا آدرس تحویل سفارش را انتخاب کنید.</p>

          <div style={{
            // flex: '0 0 auto', width: '100%',             
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

          {/* zare_nk_050206_added_alan_st(address ha!) */}
          <div style={{ display: 'flex', flexFlow: 'column', padding: '0px', margin: '0px', }}>

            <div style={{
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
                id="closeAddresListBtn"
                onClick={goToMap}
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
                >خونه</span>
                <p
                  style={{
                    color: '#1b1c1d',  //zare_nk_050206_nokteh(age entekhab nabasheh: color:#a5abb1)   
                    fontSize: '.75rem',
                    lineHeight: '1rem',
                    marginBottom: '0px',
                  }}
                >خ. وحدت اسلامی، نرسیده به خ. مولوی، ک. غلامرضا زندی، خ. صالح زاده</p>
              </div>


              <button
                id="closeAddresListBtn"
                onClick={goToMap}
                style={{
                  // backgroundColor: '#1b1c1d',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#eef0f1)  
                  backgroundColor: 'white',
                  borderRadius: '9999px', justifyContent: 'center', alignItems: 'center', width: '2rem', height: '2rem', display: "flex", flexFlow: "row", border: 'none',
                  flex: '0 0 auto',
                }}
              >
                <svg style={{ width: '18px', height: '18px', fill: '#a5abb1', transform: 'rotate(90deg)', }} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-[18px] fill-gray-500 rotate-90"><g id="Info menu"><path id="Union" fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"></path></g></svg>
                {/* transform: translate(0%, -50%) rotate(0deg); */}
              </button>

            </div>

            <div style={{
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
                id="closeAddresListBtn"
                onClick={goToMap}
                style={{
                  backgroundColor: 'eef0f1', // '#1b1c1d',  //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#eef0f1)  
                  fill: '#a5abb1', // 'white',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#a5abb1)  
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
                    color: '#a5abb1', // '#1b1c1d',  //zare_nk_050206_nokteh(age entekhab nabasheh: color:#a5abb1)
                    fontWeight: '500',
                    fontSize: '.875rem',
                    lineHeight: '1.25rem',
                  }}
                >خونه</span>
                <p
                  style={{
                    color: '#a5abb1', // '#1b1c1d',  //zare_nk_050206_nokteh(age entekhab nabasheh: color:#a5abb1)  
                    fontSize: '.75rem',
                    lineHeight: '1rem',
                    marginBottom: '0px',
                  }}
                >خ. وحدت اسلامی، نرسیده به خ. مولوی، ک. غلامرضا زندی، خ. صالح زاده</p>
              </div>


              <button
                id="closeAddresListBtn"
                onClick={goToMap}
                style={{
                  // backgroundColor: '#1b1c1d',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#eef0f1)  
                  backgroundColor: 'white',
                  borderRadius: '9999px', justifyContent: 'center', alignItems: 'center', width: '2rem', height: '2rem', display: "flex", flexFlow: "row", border: 'none',
                  flex: '0 0 auto',
                }}
              >
                <svg style={{ width: '18px', height: '18px', fill: '#a5abb1', transform: 'rotate(90deg)', }} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-[18px] fill-gray-500 rotate-90"><g id="Info menu"><path id="Union" fill="inherit" fill-rule="evenodd" clip-rule="evenodd" d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"></path></g></svg>
                {/* transform: translate(0%, -50%) rotate(0deg); */}
              </button>

            </div>

          </div>
          {/* zare_nk_050206_added_alan_end(address ha!) */}

        </div>

        {/* <Typography
          // variant="h4"
          gutterBottom
          sx={{ border: '2px dashed black', fontFamily: '"IRANSansWeb_ms(adad_fa)", "IRANSansWeb_Medium(adad_fa)"', }} >
          انتخاب آدرس
        </Typography> */}

      </Box>
      {/* <Paper sx={{ border: '2px dashed red', backgroundColor: 'red', }}>سلام دراور</Paper>  */}
      {/* <form
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
        </form > */}
      {/* </Paper> */}
      {/* zare_nk_050204_rahe2_st(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
    </Drawer >
    {/* zare_nk_050204_rahe2_end(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}

    {/* zare_nk_050204_rahe1_st(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
    {/* </Collapse>
    </ClickAwayListener> */}
    {/* zare_nk_050204_rahe1_end(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}


  </>)

  // }  //zare_nk_050203_commented
}

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [isEpmtyAdressList, setIsEpmtyAdressList] = useState(true);
  // const [heightBox, setHeightBox] = useState<string>('0px');   //zare_nk_050203_commented
  const refForBox = useRef<HTMLDivElement | null>(null);
  const [boxHtml, setBoxHtml] = useState<any>(null);
  ////zare_nk_050117_added_end

  // const { userData, login, logout } = useAuthentication(); //zare_nk_050111_added
  const { isLogin } = useAuthentication(); //zare_nk_050111_added
  console.log('zare_nk_050111-isLogin from context:', isLogin);

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

  const [addressFormInputsVal, setAddressFormInputsVal] = useState<AddressFormInputsType>({
    Address: '',
    pelak: '',
    vahed: '',
    addressName: '',
  });









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
    // alert('s: ' + s);
  })

  async function saveAddress(isOnline: boolean) {
    // if (!feature) {
    //   return;
    // }

    // console.log('zare_nk_050110-reza02-feature.get("name").Y: ' + feature.get('name').Y + "-feature.get('name').X: " + feature.get('name').X +
    //   '-mobileVal: ' + mobileVal + "-feature.get('name').Address: " + feature.get('name').Address);

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
    //           //'<div className="addressSatr" id="satr-' + Api_CreateAddressParams.IdAdress +    //zare_nk_030910_commented
    //           '<div className="addressSatr satr-' + Api_CreateAddressParams.IdAdress + '" id="satr-' + Api_CreateAddressParams.IdAdress +    //zare_nk_030910_added
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

    //           '<a className="editAddress" href="#/" onclick="addressLinkClicked(true, true, ' + Api_CreateAddressParams.IdAdress + ')" className="vorsab text-right text-decoration-none d-inline-block rounded mr-1">' +
    //           '<img src="https://img.tochikala.com/Icon/edit-Icon.svg" style="width:20px;" alt="ویرایش آدرس" />' +
    //           '</a>' +

    //           '</div>' +
    //           '<div>' +
    //           '<a className="deleteAddress" href="#/" onclick="hazfeAddress(\'satr-' + Api_CreateAddressParams.IdAdress + '\')" className="vorsab text-right text-decoration-none d-inline-block rounded mr-1">' +
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
    //       //            '<div className="addressSatr" id="satr-' + Api_CreateAddressParams.IdAdress +
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

    //       //            '<a className="editAddress" href="#/" onclick="addressLinkClicked(true, true, ' + Api_CreateAddressParams.IdAdress + ')" className="vorsab text-right text-decoration-none d-inline-block rounded mr-1">' +
    //       //            '<img src="https://img.tochikala.com/Icon/edit-Icon.svg" style="width:20px;" alt="ویرایش آدرس" />' +
    //       //            '</a>'+

    //       //            '</div>' +
    //       //            '<div>' +
    //       //            '<a className="deleteAddress" href="#/" onclick="hazfeAddress(\'satr-' + Api_CreateAddressParams.IdAdress + '\')" className="vorsab text-right text-decoration-none d-inline-block rounded mr-1">' +
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
    var Api_CreateAddressParams = null;
    Api_CreateAddressParams = isOnline ? (
      {
        'FName': 'reza',
        'LName': 'kavian',
        'CodePosti': '1231231231',
        'Pelak': addressFormInputsVal.pelak, // 1,
        'Vahed': addressFormInputsVal.vahed, // 5,
        'Lat': feature.get('name').Y,
        'Lon': feature.get('name').X,
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
      'Lat': feature.get('name').Y,
      'Lon': feature.get('name').X,
      'Mobile': '09999999999',// mobileVal,
      // 'Adress': /*feature.get('name').Address*/ $('#AddressMatni').val(),   
      'Adress': 'dokhaniat',    // feature.get('name').Address, //feature.get('name').Address,
      // 'TahvilGirande': TahvilGirande,
      // 'OnvanAdress': $('#OnvanAdress').val(),
    })
    // var Api_CreateAddressParams = {
    //   'FName': 'reza',
    //   'LName': 'kavian',
    //   'CodePosti': '1231231231',
    //   'Pelak': addressFormInputsVal.pelak, // 1,
    //   'Vahed': addressFormInputsVal.vahed, // 5,
    //   'Lat': feature.get('name').Y,
    //   'Lon': feature.get('name').X,
    //   'Mobile': '09999999999',// mobileVal,
    //   // 'Adress': /*feature.get('name').Address*/ $('#AddressMatni').val(),   
    //   'Adress': addressFormInputsVal.Address, // 'dokhaniat',    // feature.get('name').Address, //feature.get('name').Address,
    //   // 'TahvilGirande': TahvilGirande,
    //   // 'OnvanAdress': $('#OnvanAdress').val(),
    // }
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

  const bigShoo = () => {
    // setIsEpmtyAdressList(false);  //zare_nk_050205_comemnted
    ////zare_nk_050205_added_st
    let token = getCookie("token");
    console.log('zare_nk_050110-token hala is: ' + getCookie("token"));
    if (token) {
      setIsEpmtyAdressList(false);
    }
    else {
      saveAddress(false);  //zare_nk_050205_nokteh(age offLine ham bood taraf address ra zakhireh kon ehtemalan ba user movaghat!!)
    }
    ////zare_nk_050205_added_end
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

        <div style={{ display: 'flex', padding: '0px 10px', flex: '1 1 47%', direction: 'rtl' }}>
          <button
            // onClick={goToLogin}
            onClick={bigShoo}
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
