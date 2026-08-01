////zare_nk_050510_okk(1)
'use client' 

import { useState, useEffect, useRef, useCallback, JSXElementConstructor ,memo} from "react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import { RefObject } from "react";
import { ReactNode } from "react";
import { ChangeEvent } from "react";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { MouseEvent } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from "next/link";
 
const TestComponent = ({ testState, SetTestState }: { testState: number, SetTestState: React.Dispatch<React.SetStateAction<number>> }) => {
    console.log('050329-TestComponent rendered!!');   ////zare_nk_050327_tahlilshe

    const [testStateDakheli, setTestStateDakheli] = useState<number>(1);

    const func1 = () => {
        console.log('zare_nk_050327-func1 called!!');
        return SetTestState(3);
        // return 100;
    }

    function func2() {
        console.log('zare_nk_050327-func2 called!!');
        return setTestStateDakheli(4);
        // return 200;
    }

    useEffect(() => {
        // SetTestState(2);  ////zare_nk_050327_nokteh(baese reRandere Pedaresh mishe ke bad az pedaresh khodesh render mishe(midoonim pedar render beshe farzandanesham reRender mishan(chon dar pedare tarif shodeh shodeh va dar propse farzand pas dadeh shodeh)))
        // setTestStateDakheli(2); ////zare_nk_050327_nokteh(baese reRandere khodesh mishe, vali pedaresh reRender nemishe(setState dar farzand baese reRendere pedare nemishe(magar inke dar pedare tarif shodeh bashe va dar propse farzand pas bedeh)))

        // func1();
    }, []);

    return (
        <>
            <div>in testComponentim@!!!</div>
            <button onClick={() => { func1() }}>for func1</button>
            <button onClick={() => { func2() }}>for func2</button>
        </>
    );
}

export default memo(TestComponent);  ////zare_nk_050327_nokteh(baes mishe age pedar reRender shod farzand re render nashe bimored)