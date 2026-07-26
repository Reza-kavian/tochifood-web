////zare_nk_050329_okk(0)
'use client'

import { useState, useEffect, useRef, useCallback, JSXElementConstructor, RefObject, ReactNode, ChangeEvent, MouseEvent, createContext, useContext } from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import Styles from "@/styles/components/location.module.css";
import globalsStyles from "@/styles/components/globals.module.css";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { Collapse, Button, Box, Paper, Typography, Grow, ClickAwayListener, Drawer } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from "next/link";

export default function page() {
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [activeTab, setActiveTab] = useState<string | null>(null);

    console.log('050405-Home rendered!!activeTab: ' + activeTab);

    const scrollToSection = (id: string) => {
        console.log('050405-scrollToSection called!!-id: ' + id);
        console.log('050405-scrollToSection called!!-sectionRefs.current[id] : ' + sectionRefs.current[id]);
        const section = sectionRefs.current[id];
        if (!section) return;

        section.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    useEffect(() => {
        const HEADER_HEIGHT = 34;
        const handleScroll = () => {
            let currentSection = "";
            Object.values(sectionRefs.current).forEach((section) => {
                if (!section) return;

                const rect = section.getBoundingClientRect();  ////zare_nk_050405_nokteh(mogheiyate section ra nesbat be viewport dar har scroll midahad)

                console.log('050405-rect: ' + JSON.stringify(rect));
                ////050405-rect: {"x":612,"y":336,"width":446,"height":300,"top":336,"right":1058,"bottom":636,"left":612}

                if (rect.top <= HEADER_HEIGHT + 5) {  ////zare_nk_050405_nokteh(5 pixel ra baraye teloranse gozashtim)
                    console.log('050405-rect if bargharare-section.id: ' + section.id);
                    currentSection = section.id;
                }
            });

            if (currentSection !== "" && currentSection !== activeTab) {
                setActiveTab(currentSection);
            }
        };

        window.addEventListener("scroll", handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [activeTab]);

    return (
        <div style={{
            width: '100%',
            display: "flex",
            flexDirection: 'column',
            border: '1px dashed red',
        }}>
            <div style={{
                width: '100%',
                display: "flex",
                flexDirection: 'row',
                border: '3px dashed red',
                position: 'sticky',
                top: '0px',
            }}>
                <button onClick={() => { scrollToSection('111') }}
                    style={{
                        backgroundColor: (activeTab == '111' ? 'silver' : 'inherit')
                    }}
                >111</button>
                <button onClick={() => { scrollToSection('222') }}
                    style={{
                        backgroundColor: (activeTab == '222' ? 'silver' : 'inherit')
                    }}
                >222</button>
                <button onClick={() => { scrollToSection('333') }}
                    style={{
                        backgroundColor: (activeTab == '333' ? 'silver' : 'inherit')
                    }}
                >333</button>
                <button onClick={() => { scrollToSection('444') }}
                    style={{
                        backgroundColor: (activeTab == '444' ? 'silver' : 'inherit')
                    }}
                >444</button>
            </div>

            <div style={{
                width: '100%',
                display: "flex",
                flexDirection: 'column',
                border: '1px dashed blue',
                marginTop: '100px',
            }}>
                <div
                    id="111"
                    style={{
                        width: '100%',
                        display: "flex",
                        flexDirection: 'column',
                        border: '1px dashed black',
                        height: '300px',
                        marginTop: '200px',
                        scrollMarginTop: "34px",
                    }}
                    // ref={(el) => sectionRefs.current["111"] = el}
                    ref={(el) => {
                        sectionRefs.current["111"] = el;
                    }}
                >
                    <h2>1111</h2>
                </div>

                <div
                    id="222"
                    style={{
                        width: '100%',
                        display: "flex",
                        flexDirection: 'column',
                        border: '1px dashed black',
                        height: '300px',
                        scrollMarginTop: "34px",
                    }}
                    // ref={(el) => sectionRefs.current["222"] = el}
                    ref={(el) => {
                        sectionRefs.current["222"] = el;
                    }}
                >
                    <h2>2222</h2>
                </div>

                <div
                    id="333"
                    style={{
                        width: '100%',
                        display: "flex",
                        flexDirection: 'column',
                        border: '1px dashed black',
                        height: '300px',
                        scrollMarginTop: "34px",
                    }}
                    // ref={(el) => sectionRefs.current["pizza"] = el}
                    ref={(el) => {
                        sectionRefs.current["333"] = el;
                    }}
                >
                    <h2>3333</h2>
                </div>

                <div
                    id="444"
                    style={{
                        width: '100%',
                        display: "flex",
                        flexDirection: 'column',
                        border: '1px dashed black',
                        height: '300px',
                        scrollMarginTop: "34px",
                    }}
                    // ref={(el) => sectionRefs.current["burger"] = el}
                    ref={(el) => {
                        sectionRefs.current["444"] = el;
                    }}
                >
                    <h2>4444</h2>
                </div>
            </div>

        </div>
    );
}
