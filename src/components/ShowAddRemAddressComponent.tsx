'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor,RefObject ,ReactNode,ChangeEvent,MouseEvent,memo} from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";

import { Collapse, Button, Box, Paper, Typography, Grow, ClickAwayListener, Drawer } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'; //zare_nk_050204_added(for use Dialog)

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

////zare_nk_050207_nokteh(for ShowAddRemAddressList)
type ShowAddRemAddressComponentType = {
  refForShowAddRemAddressBox: RefObject<HTMLDivElement | null>;

  // goToEdditAddressMap: (IdAdress: number) => void;  //zare_nk_050209_commented
  goToEdditAddressMap: (e?: MouseEvent<HTMLButtonElement>) => void;  //zare_nk_050209_added

  // RemoveAddress: (IdAdress: number) => void;  //zare_nk_050209_commented(ok fo btn)
  RemoveAddress: (e?: MouseEvent<HTMLButtonElement>) => void;  //zare_nk_050209_added(ok fo btn)

  // responsedListFromApiEditAddress: responsedListFromApiEditAddressType | null;         //zare_nk_050207_added(and zare_nk_050207_commented(chon aslan api editeAddresss ra dar in safhe nemizanim va dar safheye editAddress mizanim))           
  responsedListFromApiRemoveAddress: responsedListFromApiRemoveAddressType | null;     //zare_nk_050207_added         

  isEpmtyShowAddRemAddress: boolean;
  setIsEpmtyShowAddRemAddress: React.Dispatch<React.SetStateAction<boolean>>;
  showAddRemAddress: () => void;
  setRowItem: React.Dispatch<React.SetStateAction<responsedListFromApiSelectAddressListType | null>>;
};

const ShowAddRemAddressComponent = function ShowAddRemAddressComponent({  
  refForShowAddRemAddressBox,
  goToEdditAddressMap,
  RemoveAddress,

  // responsedListFromApiEditAddress,   //zare_nk_050207_commented(chon aslan api editeAddresss ra dar in safhe nemizanim va dar safheye editAddress mizanim))
  responsedListFromApiRemoveAddress,

  isEpmtyShowAddRemAddress,
  setIsEpmtyShowAddRemAddress,
  showAddRemAddress,
  setRowItem,    //zare_nk_050209_added

}: ShowAddRemAddressComponentType) {
  const router = useRouter();

  // const [error, setError] = useState<string | null>(null);  //zare_nk_050207_commented
  const [errorInShowAddRemAddressComponent, setErrorInShowAddRemAddressComponent] = useState<string | null>(null);    //zare_nk_050207_added

  const refForEditAddressBtn = useRef<HTMLButtonElement | null>(null);

  return (<>
    <Drawer
      id="box"
      ref={refForShowAddRemAddressBox}
      anchor="bottom"
      open={!isEpmtyShowAddRemAddress}
      onClose={() => {
        setIsEpmtyShowAddRemAddress(true);
      }}
      // hideBackdrop={true} ////zare_nk_040502(albateh hideBackdrop={true} baes mishe alave bar hazfe tariye poshte drawer,ba click dar fazaye poshtesh,automat 
      //// basteh nashe va niaz be modiriate dastiye document.addEventListener dar useEffect dashteh bashim) 
      slotProps={{
        paper: {
          sx: {
            width: '450px', ////zare_nk_050206_added(chon Drawer dar DOM kharej az componente pedaresh mireh va be risheye body mire, pas 100% body ro migireh na 100% taghi
            //// ke dar component beonvane tage pedaresh tarif kardim,pas bejaye width:100% majboorim dasti arze 450 ro behesh bedim)
            ////zare_nk_050206_commented_st(baraye vasat raftane ofoghiye Drawer ke javab nadad(translate kar nakard,chon ba codehaye dakheliye Drawer MUI tadakhol dareh))
            // left: '50%', 
            // transform: 'translate(-50%, 0%)', 
            ////zare_nk_050206_commented_end(baraye vasat raftane ofoghiye Drawer ke javab nadad(translate kar nakard, chon ba codehaye dakheliye Drawer MUI tadakhol dareh))
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
                setRowItem(null);
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
          <div className="btn-cont" style={{
            display: 'flex', width: '100%', flexFlow: 'row-reverse', flexWrap: 'wrap', marginBottom: '2rem',
            columnGap: '1rem', backgroundColor: 'inherit',
          }} >
            <div style={{ display: 'flex', padding: '0px 10px', flex: '1 1 47%' }}>
              <button
                onClick={(e) => {
                  RemoveAddress(e);
                  setIsEpmtyShowAddRemAddress(true);
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
                حذف
              </button>
            </div>
            <div style={{ display: 'flex', padding: '0px 10px', flex: '1 1 47%' }}>
              <button
                // onClick={goToEdditAddressMap} 
                // onClick={() => {
                //   goToEdditAddressMap
                // }}
                onClick={(e) => {
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

export default memo(ShowAddRemAddressComponent); 