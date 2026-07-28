////zare_nk_050505_okk
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, useMemo } from "react";
import { useRouter, useSearchParams, redirect, usePathname } from "next/navigation";
import Styles from "@/styles/components/location.module.css";
import globalsStyles from "@/styles/components/globals.module.css";
import { RefObject } from "react";
import { ReactNode } from "react";
import { ChangeEvent } from "react";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { MouseEvent } from "react";

import { Collapse, Button, Box, Paper, Typography, Grow, ClickAwayListener, Drawer } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'; //zare_nk_050204_added(for use Dialog)

import { useAuthentication } from '../../context/AuthenticationContext';  //zare_nk_050111_added
 

export default function Page() {  
  ////zare_nk_050504_nokteh_st(sabke estadade az context ha baraye barrasiye login boodan ya naboodane karbar)
  const { isLoginAndInf, refreshLoginStatus } = useAuthentication();
  const pathname = usePathname();

  useEffect(() => {
    refreshLoginStatus();
  }, [pathname]); ////zare_nk_050504_nokteh(pathname gozashtim, ta harbar ke masir tagheir mikoneh useEffect seda zadeh beshe.)
  ////zare_nk_050504_nokteh_end(sabke estadade az context ha baraye barrasiye login boodan ya naboodane karbar)
   
  return (
    <> 
      <header style={{
        position: 'sticky',
        top: '0px',
        boxShadow: '0px 3px 2px -1px #d7d6d6',
        display: 'flex',
        flexFlow: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px',
        zIndex: 899,
        backgroundColor: 'white',
      }}> 
        {
        isLoginAndInf.isLogin == true ?
          <span>{isLoginAndInf.FullName}</span> :
          isLoginAndInf.isLogin == false ?
            <span>log outim!!</span> :
            <span></span>
        }
      </header >

      <main
        style={{
          backgroundColor: 'white',
          // height: '100dvh',   ////zare_nk_050317_commented(A001-ba A002 tadakhol dareh)
          width: '100%',
          display: "flex",
          flexDirection: 'column',
          // overflow: 'hidden',        ////zare_nk_050317_commented(A002-ba A001 tadakhol dareh)
          // justifyContent: 'center',  ////zare_nk_050229_nokteh(be lahaze amoodi vasat chin mikoneh mohtavaye safheh ro ke ma inro nemikhaim)
          alignItems: 'center',
          flex: '1 0 auto',
          // border: '3px solid orange',
          direction: 'rtl',
          // paddingTop: '10px',   
        }}>  
      </main>
      <footer></footer>

      <div className="tabIndexOne-in-LayoutWrapper" tabIndex={1}>
      </div>
    </>
  );
}
