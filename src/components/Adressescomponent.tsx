////zare_nk_050522_okk(1)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, RefObject, ReactNode, ChangeEvent, MouseEvent, memo, useContext, } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";

import ShowAddRemAddressComponent from '../components/ShowAddRemAddressComponent';  //zare_nk_050328_added

import { currentAddressContext } from '../context/currentAddressContext';  //zare_nk_050329_added 

import { NextJsApiUrl } from "../constants/Urls";  ////zare_nk_050407_added

function getCookie(name: any) {
  if (typeof document === 'undefined') {
    // console.log("document === 'undefined'");
    return null; // برای جلوگیری از خطای عدم وجود document
  }
  // console.log("document !== 'undefined'"); 
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

type AdressescomponentType = {
  responsedListFromApiSelectAddressList: responsedListFromApiSelectAddressListType[] | null;
  isEpmtyShowAddRemAddress: boolean;
  setIsEpmtyShowAddRemAddress: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEpmtyAdressList: React.Dispatch<React.SetStateAction<string | null>>;
  showAddressListDrawer: () => Promise<responsedListFromApiSelectAddressListType[] | null>;
  // currentShobeState: responsedListFromApiSelectShobehAtrafUserType | null  ////zare_nk_050525_added
};

type responsedListFromApiSelectShobehAtrafUserType = {
  IdShobe: number;
  NameSobe: string;
  KafKharid: number;
  Fasele: number;
  ZarfiatErsal: number;
  Keraye: number;
  NazdikTarinZamanErsal: string;
};

const Adressescomponent = function Adressescomponent({
  responsedListFromApiSelectAddressList,
  isEpmtyShowAddRemAddress,
  setIsEpmtyShowAddRemAddress,
  setIsEpmtyAdressList,
  showAddressListDrawer,
}: AdressescomponentType) {
  console.log('050329-Adressescomponent rendered!!');
  const router = useRouter();

  const refForShowAddRemAddressBox = useRef<HTMLDivElement | null>(null);

  const [responsedListFromApiRemoveAddress, SetResponsedListFromApiRemoveAddress] = useState<responsedListFromApiRemoveAddressType | null>(null);

  const [rowItem, setRowItem] = useState<responsedListFromApiSelectAddressListType | null>(null);

  const goToEdditAddressMap = useCallback(
    (IdAdress: number) => {
      // router.push("/folder03?tab=comments2");
      // redirect("/login");
      // alert('IdAdress:::: ' + IdAdress);  
      router.push("/editaddress?IdAdress=" + IdAdress);
    }
    , [isEpmtyShowAddRemAddress]);

  const RemoveAddress = useCallback(
    async (IdAdress: number) => {
      const token = getCookie("token");
      // console.log('zare_nk_050110-RemoveAddress-token hala is: ' + getCookie("token"));

      // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented 
      const response = await fetch(NextJsApiUrl + "Api_DeleteAddress", {
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
        // console.log("zare_nk_050208-Api_DeleteAddress-data: " + JSON.stringify(data));
        if (data.status == 0) {
          // console.log("zare_nk_050208-Api_DeleteAddress-data.status is 0");
          setIsEpmtyAdressList('notNull2');

          ////zare_nk_050507_nokteh_st(az responsedListFromApiSelectAddressListBeforeRerender estefadeh kardim, chon meghdarist ke dar hamin khatte sedazadane
          //  showAddressListDrawer() barmigardooneh vali state responsedListFromApiSelectAddressList dar rendere badiye component berooz mishe va dar in render
          //  hanooz meghdare ghabl az seda zadane tabeye showAddressListDrawer() ro dare)
          const responsedListFromApiSelectAddressListBeforeRerender: responsedListFromApiSelectAddressListType[] | null = await showAddressListDrawer();
          if (responsedListFromApiSelectAddressListBeforeRerender == null || responsedListFromApiSelectAddressListBeforeRerender[0] == undefined) {  ////zare_nk_050507_nokteh(yanai age null bashe ya age arayeye khali bashe)
            // alert('khaliye111!!' + responsedListFromApiSelectAddressListBeforeRerender);
            chosenAddress(null);
          }
          else {
            const getchosenAddress = getCookie("chosenAddress");
            var parsedChosenAddress: responsedListFromApiSelectAddressListType | null = getchosenAddress ? JSON.parse(getchosenAddress) : null;
            if (parsedChosenAddress?.IdAdress == IdAdress) {
              //  alert('porre111!!' + JSON.stringify( responsedListFromApiSelectAddressListBeforeRerender)); 
              chosenAddress(responsedListFromApiSelectAddressListBeforeRerender ? responsedListFromApiSelectAddressListBeforeRerender[0] : null)
            }
          }
          ////zare_nk_050507_nokteh_end(az responsedListFromApiSelectAddressListBeforeRerender estefadeh kardim, chon meghdarist ke dar hamin khatte sedazadane
          //  showAddressListDrawer() barmigardooneh vali state responsedListFromApiSelectAddressList dar rendere badiye component berooz mishe va dar in render
          //  hanooz meghdare ghabl az seda zadane tabeye showAddressListDrawer() ro dare)

          ////zare_nk_050507_commented_st
          // const getchosenAddress = getCookie("chosenAddress");
          // var parsedChosenAddress: responsedListFromApiSelectAddressListType | null = getchosenAddress ? JSON.parse(getchosenAddress) : null;
          // if (parsedChosenAddress?.IdAdress == IdAdress) {
          //   alert('porre!!');
          //   // chosenAddress(responsedListFromApiSelectAddressList ? responsedListFromApiSelectAddressList[0] : null)     ////zare_nk_050507_commented
          //   chosenAddress(responsedListFromApiSelectAddressListBeforeRerender ? responsedListFromApiSelectAddressListBeforeRerender[0] : null)    ////zare_nk_050507_added            
          // }
          ////zare_nk_050507_commented_end

        } else {
          // setError("متاسفانه خطایی رخ داده است34:" + data.errors);
          // console.log("zare_nk_050208-Api_DeleteAddress-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
        }
      } else {
        // console.log("zare_nk_050208-Api_DeleteAddress-!response.ok" + response.ok);
        // setError("متاسفانه خطایی رخ داده است35");
      }
    }
    , [isEpmtyShowAddRemAddress]);

  const getSwiperShopsInVendorComp = async (mycurrentAddressState: responsedListFromApiSelectAddressListType | null) => {
    // const getSwiperShopsInVendorComp = async () => { 
    let token = await getCookie("token");
    if (!token) {
      // setErrorInSwiperShopsInVendorComp("lotfan avval online shid");
      return null;
    }
    console.log('tokentokentoken: ' + token);
    // let ApiUrl = "https://api.tochikala.com/api/User/";  ////zare_nk_050407_commented  
    try {
      const response = await fetch(NextJsApiUrl + "Api_SelectShobehAtrafUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        // body: JSON.stringify({}),
        body: JSON.stringify({
          "Id": mycurrentAddressState != null ? mycurrentAddressState.IdAdress : 1,  ////zare_nk_050416_nokteh(manzoor az Id hamoon IdAddress hast ke ya vaghei midam ya pishfarz hatman 1 mizaram(ehtemalan 1 haman meydoon saate) )
        }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("zare_nk_050404-Api_SelectGoroohJson data1: " + JSON.stringify(data));
        if (data.status == 0) {
          if (data.data.list == undefined) {
            // return;  ////zare_nk_050422_commented
            return null;  ////zare_nk_050422_added
          }
          // var parsedList = JSON.parse(data.data.list);
          // var Gorooh = parsedList.Gorooh;
          // SetResponsedListFromApiSelectGoroohJson(() => {
          //     return Gorooh
          // });
          var parsedList = JSON.parse(data.data.list);
          ////zare_nk_050422_added_st
          if (parsedList.length == 0) {
            return null;
          }
          ////zare_nk_050422_added_end
          // SetResponsedListFromApiSelectShobehAtrafUser(() => {
          //     return parsedList
          // });
          // return Number(parsedList[0].IdShobe) ?? null;
          return parsedList[0] ?? null;
        } else {
          // setErrorInSwiperShopsInVendorComp("متاسفانه خطایی رخ داده است34:" + data.errors);
          return null;  ////zare_nk_050422_added
          console.log("zare_nk_050110-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
        }
      } else {
        console.log("zare_nk_050110-!response.ok" + response.ok);
        // setErrorInSwiperShopsInVendorComp("متاسفانه خطایی رخ داده است35");
        return null; ////zare_nk_050422_added
      }
    }
    catch (error) {
      return null; ////zare_nk_050422_added
    }
  }

  var currentAddressUseContext = useContext(currentAddressContext);   ////zare_nk_050329_added 

  // const chosenAddress = useCallback(   ////zare_nk_050526_commented(niazi be useCallback nist,chon chosenAddress ra be componente farzande in component ke pas nemidim!!)
  const chosenAddress =     ////zare_nk_050526_added
    async (chosenAddressItem: responsedListFromApiSelectAddressListType | null) => {
      console.log('chosenAddress called!!-chosenAddressItem: ' + JSON.stringify(chosenAddressItem));
      // document.cookie = `chosenAddress=${JSON.stringify(chosenAddressItem)}; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;  ////zare_nk_050210_nokteh(expires=Thu, 01 Jan 1970 00:00:00 UTC baese monghazi shodane cookie dar hamin khatte tarif mishe! pas 
      //// majboorim ye tarikhe dastiy behesh badim,age mikhaim abadi basshe ye cookiye dastiye toolani behesh midim ke shabiye abadiye(age expires ra dasti nadim 
      //// behesh pishfarz SessionCookie darnazar gerefteh mishe(yani moroorgar ro bebandim cookie hazf mishe) ) )
      //// const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 5);
      const expiresString = expires.toUTCString();
      // document.cookie = `chosenAddress=${JSON.stringify(chosenAddressItem)}; path=/; expires=${expiresString};secure; samesite=None`;
      ////zare_nk_050210_nokteh(mamoolan JSON.stringify kefayat mikoneh, vali age matne cookie shamele characterhaye ; va ... bashe shayad barnameh eshtebahan anra 
      //// beonvane jodakonandeh dar reshteye document.cookie darnazar begire va kharabkari koneh, pas encodeURIComponent tosiye mishavad)    
      var parsedurrentShobe: responsedListFromApiSelectShobehAtrafUserType | null = null;
      if (chosenAddressItem) {
        // alert('1.2');
        document.cookie = `chosenAddress=${encodeURIComponent(JSON.stringify(chosenAddressItem))}; path=/; expires=${expiresString}; secure; samesite=None`;
        parsedurrentShobe = await getSwiperShopsInVendorComp(chosenAddressItem);
        document.cookie = await parsedurrentShobe ? (`currentShobe=${encodeURIComponent(JSON.stringify(parsedurrentShobe))}; path=/; expires=${expiresString};secure; samesite=None`) :
          (`currentShobe=; path=/; expires=${expiresString};secure; samesite=None`);
        //setCurrentShobeState(parsedurrentShobe);   ////zare_nk_050422_commented(be useState felan niazi nadaram) 
      } else {
        // alert('1.3');
        document.cookie = `chosenAddress=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        // document.cookie = `currentShobe=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        parsedurrentShobe = await getSwiperShopsInVendorComp(null);
        document.cookie = await parsedurrentShobe ? (`currentShobe=${encodeURIComponent(JSON.stringify(parsedurrentShobe))}; path=/; expires=${expiresString};secure; samesite=None`) :
          (`currentShobe=; path=/; expires=${expiresString};secure; samesite=None`);
        //setCurrentShobeState(parsedurrentShobe);   ////zare_nk_050422_commented(be useState felan niazi nadaram) 
      }
      setIsEpmtyAdressList(null);
      currentAddressUseContext?.setMycurrentAddress(chosenAddressItem);

      // router.refresh();
      // window.location.reload();  ////zare_nk_050525_commented
    }
  //  , [currentAddressUseContext]);    ////zare_nk_050526_commented(niazi be useCallback nist,chon chosenAddress ra be componente farzande in component ke pas nemidim!!)

  ////zare_nk_050505_added_st
  useEffect(() => {
    // alert('1.3');
    const chosenAddressCookie = getCookie("chosenAddress");
    var parsedChosenAddress: responsedListFromApiSelectAddressListType | null = chosenAddressCookie ? JSON.parse(chosenAddressCookie) : null;

    if (parsedChosenAddress == null && responsedListFromApiSelectAddressList && responsedListFromApiSelectAddressList.length > 0) {
      // alert('2.1');
      chosenAddress(responsedListFromApiSelectAddressList ? responsedListFromApiSelectAddressList[0] : null)
      return;
    }
  }, [responsedListFromApiSelectAddressList]);
  ////zare_nk_050505_added_end

  return (<>
    <div style={{ display: 'flex', flexFlow: 'column', padding: '0px', margin: '0px', }}>
      {responsedListFromApiSelectAddressList?.map((item, index) => {
        return (
          <div key={item.IdAdress}   ////zare_nk_050319_added
            // onClick={() => {
            //   setRowItem(item);
            //   chosenAddress(item);
            // }}
            style={{
              borderTop: '1px solid #2b364f14',
              display: 'flex',
              paddingBottom: '.75rem',
              paddingTop: '.75rem',
              gap: '.5rem',
              justifyContent: 'space-between',
              // cursor: 'pointer',
              height: 'min-content',
              alignItems: 'center',
            }}>
            <div onClick={() => {
              setRowItem(item);
              chosenAddress(item);
            }}
              style={{
                // borderTop: '1px solid #2b364f14',
                display: 'flex',
                flex: '1 1 0%',
                // paddingBottom: '.75rem',
                // paddingTop: '.75rem',
                gap: '.5rem',
                justifyContent: 'space-between',
                cursor: 'pointer',
                height: 'min-content',
                alignItems: 'center',
                // border:'2px dashed red'
              }}>
              <button
                id="locationBtnInEveryAddressRow"   //zare_nk_050208_nokteh(in dokmeh engar karbordi nadare va faghat ye design hast! badan shayad tabdilesh konam be ye tage div)
                style={{
                  backgroundColor: '#1b1c1d',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#eef0f1) 
                  fill: 'white',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#a5abb1)  
                  borderRadius: '9999px', justifyContent: 'center', alignItems: 'center', width: '2rem', height: '2rem', display: "flex", flexFlow: "row", border: 'none',
                  flex: '0 0 auto',
                }} >
                <svg style={{ width: '18px', height: '18px' }} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] fill-inherit"><g id="Location"><path id="Union" d="M11.99 2C7.34 2 3.5 5.72 3.5 10.32C3.5 12.64 4.34 14.79 5.73 16.61C7.25 18.62 9.13 20.37 11.27 21.75C11.8 22.09 12.24 22.07 12.73 21.75C14.85 20.37 16.74 18.62 18.27 16.61C19.66 14.79 20.5 12.63 20.5 10.32C20.5 5.72 16.66 2 11.99 2ZM11.99 13.33C10.45 13.33 9.19 12.12 9.19 10.58C9.19 9.04 10.45 7.78 11.99 7.78C13.53 7.78 14.8 9.05 14.8 10.58C14.8 12.11 13.53 13.33 11.99 13.33Z" fill="inherit"></path></g></svg>
              </button>

              <div style={{
                paddingTop: '.5rem',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flexFlow: 'column',
                flex: '1 1 0%',
                height: 'min-content',
                marginLeft: '.5rem',
              }}>
                <span style={{
                  color: '#1b1c1d',
                  fontWeight: '500',
                  fontSize: '.875rem',
                  lineHeight: '1.25rem',
                }}>
                  {/* خونه */}
                  {item.OnvanAdress ? item.OnvanAdress : 'خونه'}
                </span>
                <p style={{
                  color: '#1b1c1d',  //zare_nk_050206_nokteh(age entekhab nabasheh: color:#a5abb1)   
                  fontSize: '.75rem',
                  lineHeight: '1rem',
                  marginBottom: '0px',
                }}>
                  {/* خ. وحدت اسلامی، نرسیده به خ. مولوی، ک. غلامرضا زندی، خ. صالح زاده */}
                  {item.Adress}
                </p>
              </div>
            </div>

            <button id="showAddRemAddressBtn"
              onClick={() => {
                setIsEpmtyShowAddRemAddress(false);
                setRowItem(item);
              }}
              style={{
                // backgroundColor: '#1b1c1d',   //zare_nk_050206_nokteh(age entekhab nabasheh: backgroundColor:#eef0f1)  
                // backgroundColor: 'white',
                borderRadius: '9999px', justifyContent: 'center', alignItems: 'center', width: '2rem', height: '2rem', display: "flex", flexFlow: "row", border: 'none',
                flex: '0 0 auto',
                cursor: 'pointer',
              }}>
              <svg style={{ width: '18px', height: '18px', fill: '#a5abb1', transform: 'rotate(90deg)', }} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="size-[18px] fill-gray-500 rotate-90"><g id="Info menu"><path id="Union" fill="inherit" fillRule="evenodd" clipRule="evenodd" d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"></path></g></svg>
            </button>
          </div>
        )
      })}
      {rowItem &&
        <ShowAddRemAddressComponent
          key={rowItem.IdAdress}
          refForShowAddRemAddressBox={refForShowAddRemAddressBox}
          goToEdditAddressMap={() => {
            goToEdditAddressMap(rowItem.IdAdress);
          }}
          RemoveAddress={() => {
            RemoveAddress(rowItem.IdAdress);
          }}
          // responsedListFromApiEditAddress={responsedListFromApiEditAddress}  //zare_nk_050207_commented(chon aslan api editeAddresss ra dar in safhe nemizanim va dar safheye editAddress mizanim)
          responsedListFromApiRemoveAddress={responsedListFromApiRemoveAddress}
          isEpmtyShowAddRemAddress={isEpmtyShowAddRemAddress}
          setIsEpmtyShowAddRemAddress={setIsEpmtyShowAddRemAddress}
          setRowItem={setRowItem}
        />
      }
    </div>
  </>);
}

export default memo(Adressescomponent);