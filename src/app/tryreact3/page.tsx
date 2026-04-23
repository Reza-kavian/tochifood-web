////zare_nk_041124_okk
"use client";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import { notFound } from "next/navigation";
 
export default function Timer() {
  if (process.env.NODE_ENV === "production") {
    notFound(); //نمایش صفحه 404
    // یا redirect("/") // به صفحه اصلی بفرست
    return null;
  }
  
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval1 = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
    //  return () => clearInterval(interval1);
    clearInterval(interval1);
  }, []);
  return <h1>I've rendered {count} times!</h1>;
}

//dar code bala chon useEffect faghat yek bar ejra mishe dar render haye badi setInterval jadidi sakhte nemishe ke chandin setInterval hamzaman
// ejra beshan va ba ham tadakhol dashte bashan,vali bazam dastoore clearinterVall dar entehaye useEffect niaze,chon age component unmount beshe
// yani masalan ba dastoorate router berim be ye componente dige va sepes mojadad mount beshe yani biaym be component timer reset khahad shod
// va intervale ghabli be khatere raftan az component hazf shode alan vali manzoor az hazf ine ke az barnameye nextjs hazf shode vali dar
// hafezeye system hast va tavassote cpu dare pardazeh mishe(intervale yad shode dar barnameye nextjs hazf shode va bikhasiate vali alaki cpu ra eshghal kardeh)
//baraye hazfe intervale yad shode az hafezeye computer dar hengame unmount shodane moroorgar,az clearInterval dar entehaye useEffect estefadeh mishe ke baese hazfe interval dar rendere badi nemishe,
// va faghat zamane unmount shodan component varede amal mishe va hamchenin hengame seda zadeh shodane mojadade useEfect dar renderhaye badi
//varede amal mishe masalan age parametre dovome useEffect([]) ra hazf mikardim va useEffect dar haman mount dobare seda zadeh mishod in dastoore <<return clearInterval(interval1) amal mikard