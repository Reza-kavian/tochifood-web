////zare_nk_050411_okk(1)
"use client";
import { ReactNode } from "react";
import { notFound } from "next/navigation";

// function AlertButton({ messaged, children }) {
// function AlertButton(props,{children}) {  //raveshe ghalat

interface AlertButtonProps {
  messaged: string;
  children: ReactNode;
}

function AlertButton(props: AlertButtonProps) {
  //raveshe dorost
  return (
    // <button onClick={() => {return alert(messaged+'5')} }>
    //   {children}
    // </button>
    <button onClick={() => alert(props.messaged)}>
      {props.children}
    </button>
  );
}

export default function Toolbar() {
  if (process.env.NODE_ENV === "production") {
    notFound(); //نمایش صفحه 404
    // یا redirect("/") // به صفحه اصلی بفرست
    return null;
  }

  return (
    <div>
      <AlertButton messaged="Playing!">
        <h1>Play Movie</h1>
      </AlertButton>
      <AlertButton messaged="Uploading!">
        Upload Image
      </AlertButton>
    </div>
  );
}
