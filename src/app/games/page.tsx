 ////zare_nk_050428_okk(1)
"use client";   
import "bootstrap/dist/css/bootstrap.min.css";
// import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as bootstrap from "bootstrap";
import Link from "next/link"; //zare_nk_040331_added

export default function ShallowRoutingExample() {
  return (
    <div style={{ display: "flex", flexFlow: "column", direction: "rtl" }}>
      <div
        id="SubprogramsCont"
        style={{
          display: "flex",
          flexFlow: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <div
          id="Subprograms-1"
          className="Subprograms"
          style={{
            display: "flex",
            flexFlow: "row",
          }}
        >
          <Link
            className="vorsab"
            href="/tryreact"
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "row",
              justifyContent: "space-between",
              padding: "15px",
              outline: "none",
              alignItems: "center",
              border: "1px solid #E7E7E7",
              boxShadow: "#D7D6D6 0px 0px 2px 0px",
              borderRadius: "25px",
              backgroundColor: "white",
              overflow: "hidden",
            }}
          >
            <div
              className="imgAndTextInSubprograms"
              style={{ display: "flex" }}
            >
              <div
                className="roundedPillsCont"
                style={{
                  display: "flex",
                  flexFlow: "column",
                  width: "fit-content",
                }}
              >
                <div
                  className="rounded-pill"
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    border: "1px solid #E7E7E7",
                    padding: "10px",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    style={{ width: "64px" }}
                    src="/images/Subprograms/TIC-TAC-TOE.jfif"
                    alt="هایپر&zwnj;کرفو"
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexFlow: "column",
                  justifyContent: "space-around",
                  width: "fit-content",
                }}
              >
                <div
                  style={{
                    flex: "0 0 auto",
                    display: "flex",
                    flexFlow: "row",
                  }}
                >
                  <span className="titleStyle">بازی و سرگرمی</span>
                </div>
                <div
                  style={{ flexFlow: "row", fontSize: "75%" }}
                  className="decsInSubprograms"
                >
                  <div style={{ display: "flex", flexFlow: "row" }}>
                    <span className="valueStyle">
                      لحظات خوش کودکان در محیط هایپر!
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="leftArrowInSubprograms" style={{ flexFlow: "row" }}>
              <img
                style={{ width: "20px" }}
                src="https://img.tochikala.com/tochikala/left-arrow-03.svg"
                alt="بزن بریم"
              />
            </div>
          </Link>
        </div>
        <div
          id="Subprograms-temp-1"
          className="Subprograms"
          style={{ display: "flex", flexFlow: "row", border: "none" }}
        ></div>
        <div
          id="Subprograms-temp-2"
          className="Subprograms"
          style={{ display: "flex", flexFlow: "row", border: "none" }}
        ></div>
        <div
          id="Subprograms-temp-3"
          className="Subprograms"
          style={{ display: "flex", flexFlow: "row", border: "none" }}
        ></div>
        <div
          id="Subprograms-temp-4"
          className="Subprograms"
          style={{ display: "flex", flexFlow: "row", border: "none" }}
        ></div>
      </div>
    </div>
  );
}
