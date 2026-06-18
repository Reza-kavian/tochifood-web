'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor,RefObject ,ReactNode,ChangeEvent,MouseEvent,memo} from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";

import ShowAddRemAddressComponent from '../components/ShowAddRemAddressComponent';  //zare_nk_050328_added

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
  showAddRemAddress: () => void;
  setIsEpmtyAdressList: React.Dispatch<React.SetStateAction<string | null>>;
  showAddressListDrawer: () => void;
};

// export const Adressescomponent = function Adressescomponent({    ////zare_nk_050209_commented
const Adressescomponent = function Adressescomponent({    ////zare_nk_050209_added
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
    // console.log('zare_nk_050110-RemoveAddress-token hala is: ' + getCookie("token"));

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
      // console.log("zare_nk_050208-Api_DeleteAddress-data: " + JSON.stringify(data));
      if (data.status == 0) {
        // console.log("zare_nk_050208-Api_DeleteAddress-data.status is 0");
        setIsEpmtyAdressList('notNull2');
        showAddressListDrawer();
      } else {
        // setError("متاسفانه خطایی رخ داده است34:" + data.errors);
        // console.log("zare_nk_050208-Api_DeleteAddress-data.status != 0:data.status= " + data.status + '-data.errors: ' + data.errors);
      }
    } else {
      // console.log("zare_nk_050208-Api_DeleteAddress-!response.ok" + response.ok);
      // setError("متاسفانه خطایی رخ داده است35");
    }
  };

  const chosenAddress = async (chosenAddressItem: responsedListFromApiSelectAddressListType) => {
    // console.log('chosenAddressItem.IdAdress: ' + chosenAddressItem.IdAdress);
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
    document.cookie = `chosenAddress=${encodeURIComponent(
      JSON.stringify(chosenAddressItem)
    )}; path=/; expires=${expiresString};secure; samesite=None`;

    const chosenAddress = getCookie("chosenAddress");
    // alert('chosenAddress is: ' + chosenAddress);
    var parsedChosenAddress = chosenAddress ? JSON.parse(chosenAddress) : null;
    // alert('chosenAddress IdAdress is: ' + parsedChosenAddress.IdAdress);
    setIsEpmtyAdressList(null);
  }

  return (<>
    <div style={{ display: 'flex', flexFlow: 'column', padding: '0px', margin: '0px', }}>
      {responsedListFromApiSelectAddressList?.map((item, index) => {
        return (
          <div
            key={item.IdAdress}   ////zare_nk_050319_added
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
        )
      })}
      {rowItem &&
        <ShowAddRemAddressComponent
          key={rowItem.IdAdress}
          refForShowAddRemAddressBox={refForShowAddRemAddressBox}
          goToEdditAddressMap={() => {
            // console.log('zare_nk_050209-sh01-edit-rowItem.IdAdress: ' + rowItem.IdAdress + '-rowItem.Fullname: ' + rowItem.Fullname);
            goToEdditAddressMap(rowItem.IdAdress);
          }}
          RemoveAddress={() => {
            // console.log('zare_nk_050209-sh01-rem-item.IdAdress: ' + rowItem.IdAdress + '-rowItem.Fullname: ' + rowItem.Fullname);   //item.IdAdress dar zamane click dar dom naberooz va notokk
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

export default memo(Adressescomponent);