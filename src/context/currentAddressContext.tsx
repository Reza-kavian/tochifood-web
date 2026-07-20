////zare_nk_050428_okk(1)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, RefObject, ReactNode, ChangeEvent, MouseEvent, createContext, useContext } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";

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

type currentAddressContextType = {
  mycurrentAddress: responsedListFromApiSelectAddressListType | null;
  setMycurrentAddress: React.Dispatch<React.SetStateAction<responsedListFromApiSelectAddressListType | null>>;
}

// export const currentAddressContext = createContext<responsedListFromApiSelectAddressListType | null>(null);
export const currentAddressContext = createContext<currentAddressContextType | null>(null);

//   export const currentAddressUseContext =useContext(currentAddressContext);
//   export const currentAddressUseContext = () => {
//       return useContext(currentAddressContext);
//   };