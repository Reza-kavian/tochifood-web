////zare_nk_050329_okk(1)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor,RefObject ,ReactNode,ChangeEvent,MouseEvent,memo} from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";

import { Collapse, Button, Box, Paper, Typography, Grow, ClickAwayListener, Drawer } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'; //zare_nk_050204_added(for use Dialog)

import Adressescomponent from '../components/Adressescomponent';  //zare_nk_050328_added


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

type AdressListComponentType = {
  // isEpmtyAdressList: boolean;    //zare_nk_050209_commented
  isEpmtyAdressList: string | null;    //zare_nk_050209_added
  // setIsEpmtyAdressList: React.Dispatch<React.SetStateAction<boolean>>;     //zare_nk_050209_commented
  setIsEpmtyAdressList: React.Dispatch<React.SetStateAction<string | null>>;   //zare_nk_050209_added
  refForBox: RefObject<HTMLDivElement | null>;
  responsedListFromApiSelectAddressList: responsedListFromApiSelectAddressListType[] | null;
  isEpmtyShowAddRemAddress: boolean;    //zare_nk_050207_added
  setIsEpmtyShowAddRemAddress: React.Dispatch<React.SetStateAction<boolean>>;    //zare_nk_050207_added
  // showAddRemAddress: () => void;   //zare_nk_050329_commented
  showAddressListDrawer: () => void;   //zare_nk_050209_added
  // setCurrentAddress: React.Dispatch<React.SetStateAction<responsedListFromApiSelectAddressListType | null>>;  ////zare_nk_050329_commented(currentAddress az useState tabdil shod be createContext)
};

// export const AdressListComponent = function AdressListComponent({      //zare_nk_050209_commented
const AdressListComponent = function AdressListComponent({      //zare_nk_050209_added
  isEpmtyAdressList,
  setIsEpmtyAdressList,
  refForBox,
  responsedListFromApiSelectAddressList,
  isEpmtyShowAddRemAddress,
  setIsEpmtyShowAddRemAddress,
  // showAddRemAddress,   //zare_nk_050329_commented
  showAddressListDrawer,
  // setCurrentAddress,  ////zare_nk_050329_commented(currentAddress az useState tabdil shod be createContext)
}: AdressListComponentType) {
  // console.log('zare_nk_050126_AdressListComponent called!!-isEpmtyAdressList: ' + isEpmtyAdressList);
  console.log('050329-AdressListComponent rendered!!');   ////zare_nk_050329_added

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
        // console.log('zare_nk_050204-Drawer closed!');
        setIsEpmtyAdressList(null)
      }}
      // hideBackdrop={true} //zare_nk_040502(albateh hideBackdrop={true} baes mishe alave bar hazfe tariye poshte drawer, ba click dar fazaye poshtesh,automat 
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
            // showAddRemAddress={showAddRemAddress}  ////zare_nk_050329_commented
            setIsEpmtyAdressList={setIsEpmtyAdressList}
            showAddressListDrawer={showAddressListDrawer}
            // setCurrentAddress={setCurrentAddress}  ////zare_nk_050329_commented(currentAddress az useState tabdil shod be createContext)
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

export default memo(AdressListComponent); 