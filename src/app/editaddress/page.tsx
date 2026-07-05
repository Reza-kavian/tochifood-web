////zare_nk_050413_okk(1)
"use client";
import { useState, useEffect, useRef, useCallback, JSXElementConstructor } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

import { NextJsApiUrl } from "../../constants/Urls";  ////zare_nk_050407_added

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

////zare_nk_050213_added_st
// var searchParams = useSearchParams();

// const getIdAdressFromSearchParams = () => {
//   console.log('getIdAdressFromSearchParams called!!');

//   const IdAdress = searchParams.get('IdAdress');
//   console.log('zare_050213_IdAdress: ' + IdAdress);
//   let numberedIdAdress = IdAdress ? Number(IdAdress) : null;
//   return numberedIdAdress;
// };
////zare_nk_050213_added_end

type BoxHtmlComponentType = {
  isEpmtyHeightBox: boolean;
  setIsEpmtyHeightBox: React.Dispatch<React.SetStateAction<boolean>>;
  refForBox: RefObject<HTMLDivElement | null>;
  saveAddress: (idAddress: number | null) => void;
  addressFormInputsVal: any;   //zare_nk_050205_added(noe any update she)
  setAddressFormInputsVal: React.Dispatch<React.SetStateAction<any>>;   //zare_nk_050205_added(noe any update she)
  getIdAdressFromSearchParams: () => number | null; //zare_nk_050213_added
};

function BoxHtmlComponent({
  isEpmtyHeightBox,
  setIsEpmtyHeightBox,
  refForBox,
  saveAddress,
  addressFormInputsVal,
  setAddressFormInputsVal,
  getIdAdressFromSearchParams, //zare_nk_050213_added
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

  type IsAddressFormInputsTextEmtyType = {
    Address: boolean;
    pelak: boolean;
    vahed: boolean;
    addressName: boolean;
  };

  // const [isAddressFormInputsTextEmty, setIsAddressFormInputsTextEmty] = useState<boolean[]>(Array(4).fill(true));   //zare_nk_050208_nokteh(state arayeei)   
  const [isAddressFormInputsTextEmty, setIsAddressFormInputsTextEmty] = useState<IsAddressFormInputsTextEmtyType>({   //zare_nk_050208_nokteh(state objecti)
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

  const refForSaveAddressFormInputsBtn = useRef<HTMLButtonElement | null>(null);
  const [isDisabledsaveAddressFormInputsBtn, setIsDisabledsaveAddressFormInputsBtn] = useState(true);

  function AddressFormInputsChanged(
    eventOrElement: ChangeEvent<HTMLInputElement> | HTMLInputElement | ChangeEvent<HTMLTextAreaElement> | HTMLTextAreaElement | null
  ) {
    var inputsName = '';
    setError(null);
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
      setIsAddressFormInputsTextEmty((cur) => {
        return (
          { ...cur, [inputsName]: true }
        );
      });

      if (input) {
        input.classList.remove("valid");
        input.classList.add("invalid");
      }

      setAddressFormInputsMatnError((cur) => {
        return (
          { ...cur, [inputsName]: 'این بخش را خالی نگذارید' }
        );
      });
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
      setIsAddressFormInputsTextEmty((cur) => {
        return (
          { ...cur, [inputsName]: false }
        );
      });

      if (input) {
        input.classList.remove("invalid");
        input.classList.add("valid");
      }

      setAddressFormInputsMatnError((cur) => {
        return (
          { ...cur, [inputsName]: null }
        );
      });
    }
    if (input) {
      setAddressFormInputsVal((cur: any) => {
        return (
          { ...cur, [inputsName]: vall }
        );
      });
    }
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

  return (<>
    <ClickAwayListener
      onClickAway={(event) => {
        const target = event.target as HTMLElement;
        const isToggleButton = target.id === 'bigShooBtn';  ////zare_nk_050208_nokteh(tage bigShooBtn alan dar dakhele Collapse hast na dar kharejesh,va in check 
        //// kardane isToggleButton inja bimorede va niazi nist,age ye roozi absolutesh konim be kharej az Collapse ya fixed konim be kharaej az Collapse in shart karbordiye)
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
        in={!isEpmtyHeightBox}  ////zare_nk_050202_nokteh(moadele show() va hide() dar bootstrap) 
        timeout="auto"
        unmountOnExit  ////zare_nk_050202_nokteh(age in attribute ra benevisim age in={false} beshe az dom hazf mishe,age in attribute ra nanevisim 
      //// age in={false} beshe az dom hazf nemishe va dar inspect vojood dareh va faghat hidden mishe)
      >
        {error && <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>{error}</p>}
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
            <div className={`${Styles.translateDiv} ${isAddressFormInputsFocused.Address || !isAddressFormInputsTextEmty.Address ? Styles.animateFocus : Styles.animateBlur}`}>
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
              <div className={`${Styles.translateDiv} ${isAddressFormInputsFocused.vahed || !isAddressFormInputsTextEmty.vahed ? Styles.animateFocus : Styles.animateBlur}`}>
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

                className={addressFormInputsMatnError.vahed ? `${Styles.invalid} ` : `${Styles.valid} `}

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
            <div className={`${Styles.translateDiv} ${isAddressFormInputsFocused.addressName || !isAddressFormInputsTextEmty.addressName ? Styles.animateFocus : Styles.animateBlur}`}>
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
                const IdAdressForEddit: number | null = getIdAdressFromSearchParams();
                console.log(IdAdressForEddit);
                saveAddress(IdAdressForEddit);
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
      </Collapse>
    </ClickAwayListener>
  </>)
}

export default function EditPage() {
  const router = useRouter();

  var searchParams = useSearchParams();

  const getIdAdressFromSearchParams = () => {
    console.log('getIdAdressFromSearchParams called!!');
    const IdAdress = searchParams.get('IdAdress');
    console.log('zare_050213_IdAdress: ' + IdAdress);
    let numberedIdAdress = IdAdress ? Number(IdAdress) : null;
    return numberedIdAdress;
  };

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

  const refForMap = useRef<Map | null>(null);

  const refForStyle = useRef<Style | null>(null);

  const refForVectorSource = useRef<VectorSource | null>(null);

  const refForVectorLayer = useRef<VectorLayer<VectorSource> | null>(null);

  const refForFeature = useRef<Feature | null>(null);

  ////zare_nk_050213_added_st
  const getAddressInf = async (IdAdressForEddit: number | null) => {
    console.log('getAddressInf: ' + getAddressInf);
    if (!IdAdressForEddit) {
      setError("addresse peida nashod!");
      return;
    }
    let token = getCookie("token");  //zare_nk_thlilshe(age manteghiye conste isLogin ke az useAuthentication meghdar gereft jaigozine getCookie beshe, methode
    //// getCookie ham comment she(chon niazi nadarim sedah bezanim va be AuthenticationContext.js montaghel shod va in ja ham ba useAuthentication vakeshish kardim))
    if (!token) {
      setError("lotfan avval online shid");
      return;
    }
    console.log('zare_nk_050213-getAddressInf-token: ' + token);

    // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented
    let ApiUrl = NextJsApiUrl; ////zare_nk_050407_added
    const response = await fetch(ApiUrl + "Api_SelectAddress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        'IdAdress': IdAdressForEddit,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      console.log("zare_nk_050213-getAddressInf-data: " + JSON.stringify(data));
      if (data.status == 0) {
        var parsedList = JSON.parse(data.data.list);
        console.log("zare_nk_050213-getAddressInf-parsedList1: " + parsedList[0].Adress);
        // SetResponsedListFromApiSelectAddressList(() => {
        //   return parsedList
        // });
        return parsedList;  //zare_nk_050213_added

      } else {
        // document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        // document.cookie = `google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        setError("متاسفانه خطایی رخ داده است34:" + data.errors);
        console.log("zare_nk_050213-getAddressInf-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
      }
    } else {
      console.log("zare_nk_050213-getAddressInf-!response.ok" + response.ok);
      // document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      // document.cookie = `google_Invalid_credentials=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      setError("متاسفانه خطایی رخ داده است35");
    }
  }
  ////zare_nk_050213_added_end

  useEffect(() => {
    async function tempFuncForAsync() {
      console.log('rezam-first useEffect');

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
              // src: "https://img.tochikala.com/Icon/location-icon.png",
              src: "./images/Icon/location-icon.svg",
            }),
        });
        refForStyle.current = newStyle;
      }
      else {
        console.log("useeeeeeeeeeeeeeeeeeeeeeeeeeeeee refForStyle.current  in else");
      }

      if (!refForVectorSource.current) {
        const newVectorSource = new VectorSource({
          // projection: 'EPSG:4326', //zare_nk_050109_nokteh(tosiye mishe projection dar View gonjoondeh beshe,baraye hamin comment shod az inja)
        });
        refForVectorSource.current = newVectorSource;
      }
      else {
        console.log("useeeeeeeeeeeeeeeeeeeeeeeeeeeeee refForVectorSource.current  in else");
      }

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

        ////zare_nk_050213_added_st
        const IdAdressForEddit: number | null = getIdAdressFromSearchParams();
        console.log("zare_nk_050213-IdAdressForEddit: " + IdAdressForEddit);
        const getAddressInfParsedList = await getAddressInf(IdAdressForEddit);
        console.log("zare_nk_050213-getAddressInfParsedList: " + JSON.stringify(getAddressInfParsedList));
        console.log("zare_nk_050213-getAddressInfParsedList.Lon: " + getAddressInfParsedList[0].Lon + '-getAddressInfParsedList.Lat: ' + getAddressInfParsedList[0].Lat);

        ////zare_nk_050213-getAddressInfParsedList: [{"IdAdress":24756,"IdUser":10006,"IdKeshvar":null,"IdShahr":null,"IdOstan":null,"Adress":"dokhaniat","CodePosti":"1231231231","Lon":53.0585,"Lat":36.56590000000001,"Mobile":9999999999,"FName":"reza","LName":"kavian","IsDelete":0,"Vahed":5,"Pelak":1,"OnvanAdress":null,"FullCityName":null,"Keshvar":null,"Ostan":null,"Shahr":null,"Fullname":"reza kavian"}]

        ////zare_nk_050213_added_end
        // showPosition([53.0585, 36.5659]);  //zare_nk_050213_commented
        showPosition([getAddressInfParsedList[0].Lon, getAddressInfParsedList[0].Lat]);  //zare_nk_050213_added

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
            let lat = coordinate[1]   // ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')[1];  
            let lng = coordinate[0]   // ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326')[0];  
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

            refForFeature.current?.setGeometry(new Point(centerCoords3857));
            let coordinate = transform(centerCoords3857, 'EPSG:3857', 'EPSG:4326');

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

    }

    tempFuncForAsync();
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

  let longitude = useRef<number | null | undefined>(null);
  let latitude = useRef<number | null | undefined>(null);

  async function showPosition(position: PositionType) {    ////zare_nk_050208_nokteh(tabee showPosition barasase parametre voroodish(position) refhaye longitude va 
    //// latitude ro meghdar mideh va state feature ra ham ba hamin position meghdar mideh) )
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
  }

  function continuation() {   ////zare_nk_050208_nokteh(tabee continuation center va zoome map ro moshakhas mikoneh, hamchenin vectorLayere map ro ham inja midim behesh)
    var firstCoordinates = LocationArr[0].loc;
    refForMap.current?.getView().setCenter(fromLonLat([firstCoordinates.X, firstCoordinates.Y]));
    refForMap.current?.getView().setZoom(18);
    if (refForVectorLayer.current) {
      console.log("vLayer1 is not null,firstCoordinates.X: " + firstCoordinates.X + '-firstCoordinates.Y: ' + firstCoordinates.Y);
      if (refForMap.current) {
        console.log('mapmapmapmapmapmapmap');
      }
      else {
        console.log('nooooo mmapmapmapmapmapmapmap');
      }
      refForMap.current?.addLayer(refForVectorLayer.current);
    } else {
      console.log("vLayer1 is null, cannot add layer to map.");
    }

    refForMap.current?.updateSize();
  }

  async function saveAddress(idAddress: number | null) {
    if (!refForFeature.current || !idAddress) {
      setError("متاسفانه خطایی رخ داده است345");
      return;
    }

    console.log('zare_nk_050110-reza02-feature.get("name").Y: ' + refForFeature.current.get('name').Y + "-feature.get('name').X: " + refForFeature.current.get('name').X +
      '-mobileVal: ' + mobileVal + "-feature.get('name').Address: " + refForFeature.current.get('name').Address);

    let token = getCookie("token");
    alert('zare_nk_050110-token hala is: ' + getCookie("token"));
    // if (typeof window !== "undefined") {
    //   alert('hhhhhhhhhhhhhhh');
    //   token = localStorage.getItem("Token") || "";
    // }
    console.log('zare_nk_050110-token: ' + token);
    var Api_CreateAddressParams = null;
    Api_CreateAddressParams =
    {
      'FName': 'reza',
      'LName': 'kavian',
      'CodePosti': '1231231231',
      'Pelak': addressFormInputsVal.pelak, // 1,
      'Vahed': addressFormInputsVal.vahed, // 5,
      'Lat': refForFeature.current.get('name').Y,
      'Lon': refForFeature.current.get('name').X,
      'Mobile': '09999999999', // mobileVal,
      // 'Adress': /*feature.get('name').Address*/ $('#AddressMatni').val(),   
      'Adress': addressFormInputsVal.Address, // 'dokhaniat',    // feature.get('name').Address, //feature.get('name').Address,
      // 'TahvilGirande': TahvilGirande,
      // 'OnvanAdress': $('#OnvanAdress').val(),
      'IdAdress': idAddress,
    }

    // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented
    let ApiUrl = NextJsApiUrl; ////zare_nk_050407_added
    const response = await fetch(ApiUrl + "Api_EditAddress", {
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
    if (response.ok) {
      console.log("zare_nk_050110-inSaveAddress-data: " + JSON.stringify(data));
      //zare_nk_050110-inSaveAddress-data: {"status":0,"message":"ویرایش اطلاعات با موفقیت انجام شد","data":null,"errors":[]}

      if (data.status == 0) {
        router.push("/");
      } else {
        setError("متاسفانه خطایی رخ داده است34:" + data.errors);
        console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
      }
    } else {
      console.log("zare_nk_050110-!response.ok" + response.ok);
      setError("متاسفانه خطایی رخ داده است35");
    }
  }

  const bigShoo = () => {
    let token = getCookie("token");
    console.log('zare_nk_050110-token hala is: ' + getCookie("token"));
    if (token) {
      setIsEpmtyHeightBox(false);
    }
    ////zare_nk_050213_commented_st
    // else {
    //   saveAddress(false);  ////zare_nk_050205_nokteh(age offLine ham bood taraf address ra zakhireh kon ehtemalan ba user movaghat!!)
    // }
    ////zare_nk_050213_commented_st 
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
          {/* zare_nk_050204_nokteh(fontFamily az layoutWraper ers borde va IRANSansWeb_Medium(adad_fa) hast,fontWeight rooye in font asar dare,vali rooye bazi fontha mesle 
          IRANSansWeb_Bold(adad_fa)) asar nadare,ehtemalan chon in font khodesh fontWeighte dakheli dareh ke dar olaviyate balatar az fontWeighte dastiye css hast ke ma midim */}
          <h1 style={{ fontWeight: 600, color: '#1b1c1d', margin: 0, fontSize: 'inherit', }}>ویرایش آدرس</h1>
          {/* <h1 style={{ color: '#1b1c1d', margin: 0, fontSize: 'inherit', }}
             className={`${globalsStyles.ISW_Bold_fa}`} >ویرایش آدرس</h1>   */}

          <p style={{
            color: '#64686f',
            fontSize: '.75rem',
            lineHeight: '1rem',
            margin: '0px',
          }}>ابتدا موقعیت مکانی را روی نقشه مشخص کنید.</p>

          <div style={{ display: "flex", flexFlow: "row", justifyContent: "center", alignItems: "center" }}>
            <button
              id="bigShooBtn"
              onClick={bigShoo}
              style={{
                width: '100%', color: '#ffffff',
                fontSize: '.875rem',
                padding: '0.75rem 1rem',
                backgroundColor: '#1b1c1d',
                borderRadius: '.75rem', height: '3rem', border: 'none', marginTop: '0px', marginBottom: "1.75rem",
              }}
            >تایید</button>
          </div>
        </div>

        <BoxHtmlComponent
          isEpmtyHeightBox={isEpmtyHeightBox}
          setIsEpmtyHeightBox={setIsEpmtyHeightBox}
          refForBox={refForBox}
          saveAddress={saveAddress}
          addressFormInputsVal={addressFormInputsVal}
          setAddressFormInputsVal={setAddressFormInputsVal}
          getIdAdressFromSearchParams={getIdAdressFromSearchParams}  //zare_nk_050213_added
        />
      </main >
      <footer></footer>
    </>
  );
}
