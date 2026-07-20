////zare_nk_050428_okk(2)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, RefObject, ReactNode, ChangeEvent, MouseEvent, createContext, useContext, memo } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";

import Styles from "@/styles/components/location.module.css";

import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { Collapse, Button, Box, Paper, Typography, Grow, ClickAwayListener, Drawer } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from "next/link";

type CollapseAndClickAwayForSortingCompType = {
    //   isEpmtyHeightBox: boolean;
    //   setIsEpmtyHeightBox: React.Dispatch<React.SetStateAction<boolean>>;
    isEpmtyCollapseForSorting: boolean;
    setIsEpmtyCollapseForSorting: React.Dispatch<React.SetStateAction<boolean>>;
    saveAddress: (isOnline: boolean) => void;
    // addressFormInputsVal: any;   //zare_nk_050205_added(noe any update she)
    // setAddressFormInputsVal: React.Dispatch<React.SetStateAction<any>>;   //zare_nk_050205_added(noe any update she) 
};

const CollapseAndClickAwayForSortingComp = ({
    isEpmtyCollapseForSorting,
    setIsEpmtyCollapseForSorting,
    saveAddress,
    // addressFormInputsVal,
    // setAddressFormInputsVal,
}: CollapseAndClickAwayForSortingCompType) => {
    console.log('050329-CollapseAndClickAwayForSortingComp rendered!!');   ////zare_nk_050329_added
    console.log('050401-CollapseAndClickAwayForSortingComp called!!-isEpmtyCollapseForSorting: ' + isEpmtyCollapseForSorting);

    const [error, setError] = useState<string | null>(null);

    ////zare_nk_050402_commented_st
    // type AddressFormInputsMatnErrorType = {
    //     Address: string | null;
    //     pelak: string | null;
    //     vahed: string | null;
    //     addressName: string | null;
    // };

    // const [addressFormInputsMatnError, setAddressFormInputsMatnError] = useState<AddressFormInputsMatnErrorType>({
    //     Address: '',
    //     pelak: '',
    //     vahed: '',
    //     addressName: '',
    // });

    // type IsAddressFormInputsFocusedType = {
    //     Address: boolean;
    //     pelak: boolean;
    //     vahed: boolean;
    //     addressName: boolean;
    // }; 

    // const [isAddressFormInputsFocused, setIsAddressFormInputsFocused] = useState<IsAddressFormInputsFocusedType>({
    //     Address: false,
    //     pelak: false,
    //     vahed: false,
    //     addressName: false,
    // });
    ////zare_nk_050402_commented_end

    ////zare_nk_050408_commented_st
    //  type IsAddressFormInputsTextType = {
    //         Address: boolean;
    //         pelak: boolean;
    //         vahed: boolean;
    //         addressName: boolean;
    //     };
    // // const [isAddressFormInputsTextEmty, setIsAddressFormInputsTextEmty] = useState<boolean[]>(Array(4).fill(true));   //zare_nk_050208_nokteh(state arayeei)   
    // const [isAddressFormInputsTextEmty, setIsAddressFormInputsTextEmty] = useState<IsAddressFormInputsTextType>({   //zare_nk_050208_nokteh(state objecti)
    //     Address: true,
    //     pelak: true,
    //     vahed: true,
    //     addressName: true,
    // });

    // type RefForAddressFormInputsType = {
    //     Address: HTMLTextAreaElement | null;
    //     pelak: HTMLInputElement | null;
    //     vahed: HTMLInputElement | null;
    //     addressName: HTMLInputElement | null;
    // };

    // // const refForAddressInput = useRef<(HTMLTextAreaElement | null)>(null); //zare_nk_050206_nokteh(chon baraye yek tage na araye lazemeh na object)
    // // const refForAddressFormInputs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>([]); //zare_nk_050206_nokteh(chon baraye chandin tage araye gozashtim)
    // const refForAddressFormInputs = useRef<RefForAddressFormInputsType>({  //zare_nk_050206_nokteh(chon baraye chandin tage object gozashtim)
    //     Address: null,
    //     pelak: null,
    //     vahed: null,
    //     addressName: null,
    // });
    ////zare_nk_050408_commented_end
    ////zare_nk_050402_commented_st
    // const refForSaveAddressFormInputsBtn = useRef<HTMLButtonElement | null>(null);
    // const [isDisabledsaveAddressFormInputsBtn, setIsDisabledsaveAddressFormInputsBtn] = useState(true);
    // const handleAddressFormInputsFocus = (eventOrElement: ChangeEvent<HTMLInputElement> | HTMLInputElement | ChangeEvent<HTMLTextAreaElement> | HTMLTextAreaElement | null) => {
    //     var inputsName = '';
    //     let input: HTMLInputElement | HTMLTextAreaElement | null = null;
    //     // let vall: string = "";
    //     if (eventOrElement && "target" in eventOrElement) {
    //         input = eventOrElement.target;
    //         // vall = input.value;
    //         inputsName = input.name;
    //     } else {
    //         input = eventOrElement;
    //         // vall = input?.value ?? "";
    //         inputsName = input?.name ?? "";
    //     }
    //     // setIsAddressInputFocused(true);
    //     setIsAddressFormInputsFocused((cur) => {
    //         return (
    //             { ...cur, [inputsName]: true }
    //         );
    //     });
    // };    

    // const handleAddressFormInputsBlur = (eventOrElement: ChangeEvent<HTMLInputElement> | HTMLInputElement | ChangeEvent<HTMLTextAreaElement> | HTMLTextAreaElement | null) => {
    //     var inputsName = '';
    //     let input: HTMLInputElement | HTMLTextAreaElement | null = null;
    //     // let vall: string = "";
    //     if (eventOrElement && "target" in eventOrElement) {
    //         input = eventOrElement.target;
    //         // vall = input.value;
    //         inputsName = input.name;
    //     } else {
    //         input = eventOrElement;
    //         // vall = input?.value ?? "";
    //         inputsName = input?.name ?? "";
    //     }
    //     // setIsAddressInputFocused(true);
    //     setIsAddressFormInputsFocused((cur) => {
    //         return (
    //             { ...cur, [inputsName]: false }
    //         );
    //     });
    // };
    ////zare_nk_050402_commented_end

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



    ////zare_nk_050408_commented_st
    // useEffect(() => {   //u001
    //     const hasNotNullValue = Object.values(addressFormInputsMatnError).some(value => value !== null);
    //     console.log('050205-addressFormInputsMatnError: ' + JSON.stringify(addressFormInputsMatnError));
    //     ////zare_nk_050206_nokteh_st(in dastoorat dar in makan javab dad be khoobi)
    //     if (hasNotNullValue) {
    //         console.log('050205-hasNullValue');
    //         setIsDisabledsaveAddressFormInputsBtn(true);
    //         if (refForSaveAddressFormInputsBtn.current) {
    //             refForSaveAddressFormInputsBtn.current.classList.add(Styles.disabledBtn);
    //             refForSaveAddressFormInputsBtn.current.classList.remove(Styles.btn);
    //         }
    //     }
    //     else {
    //         console.log('050205-has not NullValue');
    //         setIsDisabledsaveAddressFormInputsBtn(false);
    //         if (refForSaveAddressFormInputsBtn.current) {
    //             refForSaveAddressFormInputsBtn.current.classList.remove(Styles.disabledBtn);
    //             refForSaveAddressFormInputsBtn.current.classList.add(Styles.btn);
    //         }
    //     }
    //     ////zare_nk_050206_nokteh_end(in dastoorat dar in makan javab dad be khoobi)
    // }, [addressFormInputsMatnError]);
    ////zare_nk_050408_commented_end

    const [radionClicked, setRadionClicked] = useState<number>(1);

    const radionClickedFunc = (index: number) => {
        setRadionClicked(index);
    }

    return (<>
        {/* zare_nk_050204_rahe1_st(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
        {/* zare_nk_050204_nokteh(ClickAwayListener componente MUI hast ke rooyadade click kharej az taghayei ke dar mohtavayash moshakhas mikonim ra modiriat mikonih, 
         va jaigozine khoobi baraye neveshtane dastiye rooydade click dar useEffect hast) */}
        {/* <ClickAwayListener
            onClickAway={(event) => {
                const target = event.target as HTMLElement;

                // const isToggleButton = target.id === 'openCollapseForSortingBtn';   ////zare_nk_050401_commented(chon age tage openCollapseForSortingBtn dakhelesh tage digehi mesle span ya img dashteh bashe va karbar 
                ////rooye oona click koneh barnameh target ro onna midoone na openCollapseForSortingBtn, chareye kar estefadeh az !!target.closest('#openCollapseForSortingBtn') hast)
                const isToggleButton = !!target.closest('#openCollapseForSortingBtn');   ////zare_nk_050401_added(amalgare !! meghdar ra be boolean tabdil mikoneh(null => false va HTMLElement=> true))

                console.log('050401-inja click shooodd!!!-isEpmtyCollapseForSorting: ' + isEpmtyCollapseForSorting + '-isToggleButton: ' + isToggleButton);
                if (!isEpmtyCollapseForSorting && !isToggleButton) {
                    console.log('050401-inja click shooodd!!!');
                    setIsEpmtyCollapseForSorting(true); // ببند
                }
            }}
        >
            <Collapse
                id="box"
                style={{
                    position: 'absolute',
                    bottom: '0px',
                    backgroundColor: 'white',
                    borderRadius: '20px 20px 0px 0px',
                    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)',
                    width: '100%',  ////zare_nk_050402_added
                    ...(!isEpmtyCollapseForSorting ? { zIndex: 1 } : { zIndex: 0 })
                }}
                in={!isEpmtyCollapseForSorting} //zare_nk_050202_nokteh(moadele show() va hide() dar bootstrap) 
                timeout="auto"
                unmountOnExit  //zare_nk_050202_nokteh(age in attribute ra benevisim age in={false} beshe az dom hazf mishe,age in attribute ra nanevisim 
            // age in={false} beshe az dom hazf nemishe va dar inspect vojood dareh va faghat hidden mishe)
            > */}
        {/* zare_nk_050204_rahe1_end(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
        {/* zare_nk_050204_rahe2_st(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
        <Drawer
            id="box"
            anchor="bottom"
            open={!isEpmtyCollapseForSorting}
            onClose={() => {
                console.log('zare_nk_050204-Drawer closed!');
                setIsEpmtyCollapseForSorting(true)
            }}
            // hideBackdrop={true} ////zare_nk_040502(albateh hideBackdrop={true} baes mishe alave bar hazfe tariye poshte drawer,ba click dar fazaye poshtesh,automat 
            // // basteh nashe va niaz be modiriate dastiye document.addEventListener dar useEffect dashteh bashim)
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: '20px 20px 0 0',
                        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
                        backgroundColor: 'white',
                        width: '450px', ////zare_nk_050206_added(chon Drawer dar DOM kharej az componente pedaresh mireh va be risheye body mire, pas 100% body ro migireh na 100% taghi
                        //// ke dar component beonvane tage pedaresh tarif kardim,pas bejaye width:100% majboorim dasti arze 450 ro behesh bedim)
                        ////zare_nk_050206_commented_st(baraye vasat raftane ofoghiye Drawer ke javab nadad(translate kar nakard,chon ba codehaye dakheliye Drawer MUI tadakhol dareh))
                        // left: '50%', 
                        // transform: 'translate(-50%, 0%)', 
                        ////zare_nk_050206_commented_end(baraye vasat raftane ofoghiye Drawer ke javab nadad(translate kar nakard,chon ba codehaye dakheliye Drawer MUI tadakhol dareh))
                        margin: '0 auto',  ////zare_nk_050206_added(baraye vasat raftane ofoghiye Drawer ke javab dad)
                        direction: 'rtl',  //zare_nk_050206_added 
                        paddingBottom: '1.5rem',

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
                disableScrollLock: true,  ////zare_nk_050402_nokteh(agge disableScrollLock: true nadim baes mishe hengame baz shodane Drawer barname automat be 
                ////tage <body> style css rooberoo ro bede: padding-right: 10px; overflow: hidden;(pishfarza disableScrollLock: false hast va style yad shode ro migire ke nemikhaim begireh!!  ))
            }}>
            {/* zare_nk_050204_rahe2_end(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
            {error && <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>{error}</p>}
            {/* <Paper> */}
            <form id="addressInfForm" className={`${Styles.loginForm} ${Styles.valueStyle}`}
                style={{ padding: '1rem', }}
                onSubmit={(event) => {
                    event.preventDefault();
                }}>
                <div style={{
                    display: "flex",
                    flexFlow: 'row',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div style={{ marginTop: '.75rem', backgroundColor: '#eaeaeb', height: '.25rem', width: '2.5rem', borderRadius: '20px', }}></div>
                </div>

                <div style={{
                    // paddingTop: '2rem',
                    // padding: '1rem',
                    paddingBottom: '1rem',
                    width: '100',
                }}>
                    <p className={`${Styles.titleStyle}`} style={{
                        fontSize: '16px',
                        color: '#1b1c1d',
                        fontWeight: 600,
                        marginBottom: '0px',
                    }}>
                        مرتب&zwnj;سازی براساس
                        </p>
                </div>

                <div onClick={() => { radionClickedFunc(1) }}
                    style={{
                        display: "flex",
                        flexFlow: 'row',
                        width: '100%',
                        paddingBottom: '.375rem',
                        paddingTop: '.375rem',
                        columnGap: '.5rem',
                        alignItems: 'center',
                        cursor: 'pointer',
                    }}>
                    <button type="button"
                        // onClick={() => { radionClickedFunc(1) }}
                        role="radio"
                        aria-checked="true"
                        data-state="checked"
                        value="distance"
                        className="peer aspect-square rounded-full border border-solid border-gray text-foreground ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 disabled:cursor-not-allowed disabled:!border-gray-200 disabled:text-gray-200 size-5"
                        id="distance" tabIndex={0} data-radix-collection-item=""
                        style={{ borderRadius: '9999px', border: '1px solid #878b92', height: '1.25rem', width: '1.25rem', padding: '0px', backgroundColor: 'transparent', }}>
                        {radionClicked == 1 &&
                            <span id="spanInDistance" data-state="checked" className="flex size-full items-center justify-center"
                                style={{
                                    display: 'flex',
                                    width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
                                }}>
                                <div className="size-3/4 rounded-full bg-current"
                                    style={{ height: '75%', width: '75%', borderRadius: '9999px', backgroundColor: 'currentColor', }}>
                                </div>
                            </span>}
                    </button>
                    <div>
                        <span style={{ width: '100%', color: 'black', fontSize: '1rem', lineHeight: '1.5rem', }}>نزدیک&zwnj;ترین</span>
                    </div>
                </div>

                <div
                    onClick={() => { radionClickedFunc(2) }}
                    style={{
                        display: "flex",
                        flexFlow: 'row',
                        width: '100%',
                        paddingBottom: '.375rem',
                        paddingTop: '.375rem',
                        columnGap: '.5rem',
                        alignItems: 'center',
                        cursor: 'pointer',
                    }}>
                    <button type="button"
                        // onClick={() => { radionClickedFunc(2) }}
                        role="radio"
                        aria-checked="false"
                        data-state="unchecked"
                        value="rate"
                        className="peer aspect-square rounded-full border border-solid border-gray text-foreground ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 disabled:cursor-not-allowed disabled:!border-gray-200 disabled:text-gray-200 size-5"
                        id="rate" tabIndex={0} data-radix-collection-item=""
                        style={{ borderRadius: '9999px', border: '1px solid #878b92', height: '1.25rem', width: '1.25rem', padding: '0px', backgroundColor: 'transparent', }}>
                        {radionClicked == 2 &&
                            <span id="spanInDistance" data-state="checked" className="flex size-full items-center justify-center"
                                style={{
                                    display: 'flex',
                                    width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
                                }}>
                                <div className="size-3/4 rounded-full bg-current"
                                    style={{ height: '75%', width: '75%', borderRadius: '9999px', backgroundColor: 'currentColor', }}>
                                </div>
                            </span>}
                    </button>
                    <div>
                        <span style={{ width: '100%', color: 'black', fontSize: '1rem', lineHeight: '1.5rem', }}>بالاترین امتیاز</span>
                    </div>
                </div>

                <div
                    onClick={() => { radionClickedFunc(3) }}
                    style={{
                        display: "flex",
                        flexFlow: 'row',
                        width: '100%',
                        paddingBottom: '.375rem',
                        paddingTop: '.375rem',
                        columnGap: '.5rem',
                        alignItems: 'center',
                        cursor: 'pointer',
                    }}>
                    <button type="button"
                        // onClick={() => { radionClickedFunc(3) }}
                        role="radio"
                        aria-checked="false"
                        data-state="unchecked"
                        value="popularity"
                        className="peer aspect-square rounded-full border border-solid border-gray text-foreground ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 disabled:cursor-not-allowed disabled:!border-gray-200 disabled:text-gray-200 size-5"
                        id="popularity" tabIndex={0} data-radix-collection-item=""
                        style={{ borderRadius: '9999px', border: '1px solid #878b92', height: '1.25rem', width: '1.25rem', padding: '0px', backgroundColor: 'transparent', }}>
                        {radionClicked == 3 &&
                            <span id="spanInDistance" data-state="checked" className="flex size-full items-center justify-center"
                                style={{
                                    display: 'flex',
                                    width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
                                }}>
                                <div className="size-3/4 rounded-full bg-current"
                                    style={{ height: '75%', width: '75%', borderRadius: '9999px', backgroundColor: 'currentColor', }}>
                                </div>
                            </span>}
                    </button>
                    <div>
                        <span style={{ width: '100%', color: 'black', fontSize: '1rem', lineHeight: '1.5rem', }}>محبوب&zwnj;ترین</span>
                    </div>
                </div>
            </form >
            {/* </Paper> */}
            {/* zare_nk_050204_rahe2_st(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
        </Drawer>
        {/* zare_nk_050204_rahe2_end(Drawer baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}

        {/* zare_nk_050204_rahe1_st(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
        {/* </Collapse>
        </ClickAwayListener> */}
        {/* zare_nk_050204_rahe1_end(ClickAwayListener+Collapse baraye collapse chasboone paeine safhe va baste shodanesh vaghti biroone collapse click she) */}
    </>)
}

export default memo(CollapseAndClickAwayForSortingComp); 