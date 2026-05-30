////zare_nk_050309_okk
'use client';

import { useEffect, useState, useRef, useCallback, memo } from "react";  //zare_nk_050216_added

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

export default function HeroSlider() {
  const refForwiperButtonNext = useRef<HTMLButtonElement | null>(null);
  const refForwiperButtonPrev = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    // اگر ریفرنس‌ها هنوز پر نشده باشند، کاری نکن
    if (!refForwiperButtonNext.current || !refForwiperButtonPrev.current) return;

    // اگر swiperRef هنوز ساخته نشده، صبر کن (چون Swiper کمی دیرتر رندر میشه)
    if (!swiperRef.current) return;

    // ۴. اینجا به Swiper می‌گوییم دکمه‌هایش کدام هستند
    // ماژول Navigation را از داخل instance Swiper پیدا می‌کنیم
    const swiperInstance = swiperRef.current.swiper;

    // تنظیم دکمه‌ها
    swiperInstance.params.navigation.nextEl = refForwiperButtonNext.current;
    swiperInstance.params.navigation.prevEl = refForwiperButtonPrev.current;

    // فعال‌سازی مجدد دکمه‌ها
    swiperInstance.navigation.update();
    swiperInstance.navigation.init();
  }, []);

  return (
    <div className="slider-container">
      {/* age lafze swiper-button-next ro be classe dokmeh bedim az nazare designi barname dokmeh ro mibare tooye makane navigationiye swiper, yani dar raste
       ofoghiye swiper va vasate amoodiye swiper */}
      <button className='swiper-button-next2' ref={refForwiperButtonNext}>
        برو بعدی
      </button>
      {/* age lafze swiper-button-prev ro be classe dokmeh bedim az nazare designi barname dokmeh ro mibare tooye makane navigationiye swiper, yani dar chappe
       ofoghiye swiper va vasate amoodiye swiper */}
      <button className='swiper-button-prev' ref={refForwiperButtonPrev}>
        برو قبلی
      </button>

      {/* zare_nk_050216_nokteh(age tage .swiper-pagination ra dasti ijad nakonim, barnameh khodesh automat ijadesh mikoneh(be sharti ke navigation={true} ro gheid konim, 
fargheshoon dar ine ke vaghti barname besaze dakhele swiper misaze va position:absolute;bottom:0; mide behesh ke paeine swiper michasbeh, vali ma inja biroone swiper
 sakhtim, pas barnameh mibine in tag vojood dare nemisazeh va faghat position:absolute;bottom:0; mideh, ke tag dar paeine .slider-container mireh, na paeine swiper, chon 
 pedaresh .slider-container hast va absolute ham nesbat be pedar position migire, dar vaghe aslan dar nevashtane ma tage swiperi vojood nadare ke dive swiper-pagination 
 ro bekhaim toosh benevisim, <Swiper .. /> ke paein neveshtim ham Component hast na tag, va in component tooye khodeshe div.swiper ro automat misazeh )) */}
      {/* zare_nk_050216_nokteh(mitavan name delkhahe digari gheir az swiper-pagination ham bedim, vali dige barnameh css ha ro behesh nemideh(manzoor 
 position:absolute;bottom:0; hast ke dar file haye css marboot be swiper code .swiper-pagination{position:absolute;bottom:0; va css haye dige } vojood dareh )) */}
      <div className="swiper-pagination"></div>

      <Swiper
        ref={swiperRef} // اتصال ریفرنس به Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}   ////zare_nk_050216_nokteh(faseleye beine slideha dar har ghabele namayesh(be px hast))
        slidesPerView={2}   ////zare_nk_050216_nokteh(tedad slideha dar har ghabele moshahedeh)
        //  centeredSlides={true}  ////zare_nk_050226_added(baraye vasat gharar gereftane slide ha dar swiper)
        ////zare_nk_050215_nokteh_st(dokmeye raftan be badi va ghabli ro modiriat mikoneh, age nazarim pishfarz false hast, mishe ham boolean dad, va ham meghdare objecti dad 
        //// ke dokmehaye ghablo bad , ... ra sefareshi konim(midoonim useRef age masalan string ya namber ,... bashe tagheiresh bedim dar hamin render tagheiresh ghabale 
        // moshahedeh hast, vali manzoore ma useRefi hast ke be taghaye jsx nesbat midim ke ta dar dom naran useRef be tage jsx nemichasbe ))
        // navigation={true}  
        navigation={{
          // nextEl: '.swiper-button-next2',  ////zare_nk_050216_nokteh(dorost kar mikoneh)
          nextEl: null, //refForwiperButtonNext.current,  ////zare_nk_050216_nokteh(nextEl=refForwiperButtonNext.current kar nemikone)(refForwiperButtonNext.current dar in lahzeh null
          //// hast(yani meghdare avvaliyeye refForwiperButtonNext) chon useref ha mount shodane html(yani zamani ke tagha dar DOM raftan meghdar migiran, va midoonim enteda rendere 
          //// component soorat migere sepas ke jsx haye return shodehye component dar DOM beravand estelahan migim mount soorat gereteh, ke useRef ha dar hamin lahze meghdari ke dar
          //// jsx midim ro migiran )           

          // prevEl: '.swiper-button-prev',  //zare_nk_050216_nokteh(dorost kar mikoneh)
          prevEl: null, //refForwiperButtonPrev.current,  //zare_nk_050216_nokteh(prevEl=refForwiperButtonPrev.current kar nemikone)(refForwiperButtonPrev.current dar in lahzeh null
          //// hast(yani meghdare avvaliyeye refForwiperButtonPrev) chon useref ha mount shodane html(yani zamani ke tagha der DOM raftan meghdar migiran, va midoonim enteda rendere 
          //// component soorat migere sepas ke jsx haye return shodehye component dar DOM beravand estelahan migim mount soorat gereteh, ke useRef ha dar hamin lahze meghdari ke dar
          //// jsx midim ro migiran )           
        }}
        ////zare_nk_050215_nokteh_end(dokmeye raftan be badi va ghabli ro modiriat mikoneh, age nazarim pishfarz false hast, mishe ham boolean dad, va ham meghdare objecti dad 
        //// ke dokmehaye ghablo bad , ... ra sefareshi konim(midoonim useRef age masalan string ya namber ,... bashe tagheiresh bedim dar hamin render tagheiresh ghabale 
        // moshahedeh hast, vali manzoore ma useRefi hast ke be taghaye jsx nesbat midim ke ta dar dom naran useRef be tage jsx nemichasbe ))

        ////zare_nk_050216_nokteh_st(dokmehaye raftan be safhe ke momoolan dar vasat va paeine swiper namayash dadeh mishan, age nazarim pishfarz false hast, mishe ham boolean 
        //// dad, va ham meghdare objecti dad ke dokmehaye adshodeh ra sefareshi konim)
        // pagination={true}  ////zare_nk_050226_nokteh(pagination={true} ra gozashtam faghat nameyesh mideh safheye feli ra ba toopor va tookhali kardane bullet ha, vali inke click
        ////  konim rooshoon amal konan bayad clickable: true, benevisim(chon pishfarz false hast va faghat ba angosht ya mouseclick chaporast mikeshim slide ha ra(na click rooye bullet ha)))
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          type: 'bullets',
        }}
        ////zare_nk_050216_nokteh_end(dokmehaye raftan be safhe ke momoolan dar vasat va paeine swiper namayash dadeh mishan, age nazarim pishfarz false hast, mishe ham boolean 
        //// dad, va ham meghdare objecti dad ke dokmehaye yadshodeh ra sefareshi konim)

        // autoplay={{ delay: 3000, disableOnInteraction: false }} // اگر می‌خوای اسلایدر خودکار بره، این خط رو از کامنت در بیار
        className="mySwiper"
      >
        {/* اسلاید اول */}
        <SwiperSlide>
          <div className="contInSlide" style={{ backgroundColor: '#ffcccc', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h2>اسلاید اول</h2>
          </div>
        </SwiperSlide>

        {/* اسلاید دوم */}
        <SwiperSlide>
          <div className="contInSlide" style={{ backgroundColor: '#ccffcc', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h2>اسلاید دوم</h2>
          </div>
        </SwiperSlide>

        {/* اسلاید سوم */}
        <SwiperSlide>
          <div className="contInSlide" style={{ backgroundColor: '#ccccff', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h2>اسلاید سوم</h2>
          </div>
        </SwiperSlide>
      </Swiper>
      <>
        {/* zare_nk_050216_nokteh(code zir jahate yadavari hast kr dar rendere avvale component meghdare refForwiperButtonPrev.current meghdare avvaliyeash hast va null hast pas khorooji be soorate: aaaa--bbbb khahad bood) */}
        {/* aaa-{refForwiperButtonPrev.current}-bbbb */}
      </>

    </div>
  );
}
