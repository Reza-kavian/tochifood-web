////zare_nk_041220_okk
"use client";
import { useState, useEffect } from "react";
import { ReactNode } from "react";

import { notFound } from "next/navigation";

interface AlertButtonProps {
  alertButtonClick: () => void; // اگر پارامتر می‌گیره بگو
  mobileVal: string; // یا number اگر عدد بود
  children: ReactNode;
}

function AlertButton({
  alertButtonClick,
  mobileVal,
  children,
}: AlertButtonProps) {
  //   return   (
  //   <>
  //     <span>reza</span>
  //   {children}
  // </>
  // )
  return (
    <>
      {mobileVal.trim().length > 0 && (
        <>
          <span>your mobile number is: </span>
          <span>{mobileVal}</span>
        </>
      )}

      <div>
        <button onClick={alertButtonClick}>{children}</button>
      </div>
    </>
  );
}

interface ShowTextBoxProps {
  mobileVal: string; // یا number اگر عدد بود
  mobileChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  backBtnClick: () => void; // اگر پارامتر می‌گیره بگو
  children: ReactNode;
}

function ShowTextBox({
  mobileVal,
  mobileChanged,
  backBtnClick,
  children,
}: ShowTextBoxProps) {
  return (
    <>
      <div>
        <button id="backToFirsPage" onClick={backBtnClick}>
          back
        </button>
      </div>
      <input
        id="mobileTxt"
        value={mobileVal}
        onChange={mobileChanged}
        placeholder="09350000000"
      />
      {children}
    </>
  );
}

export default function Toolbar() {
  if (process.env.NODE_ENV === "production") {
    notFound(); //نمایش صفحه 404
    // یا redirect("/") // به صفحه اصلی بفرست
    return null;
  }

  const [currentPage, setCurrentPage] = useState("firstPage");
  const [message, setMessage] = useState("Playing!");
  const [mobileVal, setMobileVal] = useState("");
  function alertButtonClick() {
    setCurrentPage("secondPage");
  }
  function mobileChanged(event: React.ChangeEvent<HTMLInputElement>) {
    setMobileVal(event.target.value);
  }
  function backBtnClick() {
    setCurrentPage("firstPage");
  }
  return (
    <div id="rere">
      {currentPage == "firstPage" ? (
        <AlertButton alertButtonClick={alertButtonClick} mobileVal={mobileVal}>
          <div className="firstPageCont">go Second Page</div>
        </AlertButton>
      ) : (
        <ShowTextBox
          mobileVal={mobileVal}
          mobileChanged={mobileChanged}
          backBtnClick={backBtnClick}
        >
          <div className="secondPageCont">
            <span>this is second page</span>
          </div>
        </ShowTextBox>
      )}
    </div>
  );
}
