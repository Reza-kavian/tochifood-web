////zare_nk_041221_okk
"use client";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

function getCookie(name: any) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() ?? null;
  }
  return null; // اگر کوکی پیدا نشد
}

export default function ProductPage() {
  const idUSerRef = useRef<HTMLHeadingElement | null>(null);
  const router = useRouter();
  useEffect(() => {
    const asyncFunctionInUseEffect = async () => {
      const token = getCookie("token");
      console.log('040530-033-token: ' + token);
      if (token != null) {
        try {
          const response = await fetch("/api/auth/verifyToken", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify({ token }),  //zare_nk_041219_commented_movaghat
            body: JSON.stringify({ a: 1 }),  //zare_nk_041219_added_movaghat
          });

          // const data = await response.json();  //zare_nk_041112_commented
          ////zare_nk_041112_added_st
          let data: any = null;

          try {
            if (response.headers.get("content-type")?.includes("application/json")) {
              data = await response.json();
            }
          } catch (e) {
            data = null;
          }
          ////zare_nk_041112_added_end

          const decoded = data?.decoded;//zare_nk_041113_added
          if (response.ok && decoded) {  //zare_nk_041113_added
            // if (response.ok) {  //zare_nk_041113_commented
            ////zare_nk_041115_commented_st
            // var idUser = data.decoded.IdUser;
            // var email = data.decoded.email;
            ////zare_nk_041115_commented_send
            ////zare_nk_041115_added_st
            var FullName = data.decoded.FullName;
            var Mobile = data.decoded.Mobile;
            var name = data.decoded.name;
            ////zare_nk_041115_added_end       
            if (idUSerRef.current) {
              document.getElementById("idUSer")!.innerText =
                // idUser != null ? idUser : email;  //zare_nk_041115_commented
                FullName ? FullName :
                  (Mobile ? Mobile : name
                  )
            }
          } else {
            const idUSerRefTag = idUSerRef.current;
            if (idUSerRefTag instanceof HTMLElement) {
              idUSerRefTag.innerText = "ffffffferer----" + (data?.errorMessage ?? response.statusText);  //zare_nk_041219_nokteh(midanim age data?.errorMessage darim yani response.ok 
              // hast va be error haye dastimoon tooye verifyToken residim ke name dastiye errorMessage residim. age data?.errorMessage nadarim yani tebghe and(&&), response.ok nist chon age bashe bayad decode nadashteh bashim ke tebghe response dastiye ma 
              // ijad kardimesh ba statuse 200 ke maro ba response.ok mibare!(pas yani response.ok==false hast age data?.errorMessage nadarim ))
              //zare_nk_040224-nokteh(age az useState estefadeh mikardim reactpasandtar bood)
              //zare_nk_041112-nokteh(age ba eshtebah vared kardane voroodihaye fetch va ya name eshtebahe fetch va ... !response.ok beshe, data.errorMessage
              // vojood nadare chon barnameh aslan be api narafteh ke dar codehaye dastiye api bekhaim errorMessage ra ijad konim,pas az alamate ?? estefadeh kardim
              // ke age errorMessage vojood nadasht pas matni ra benevisim
            }
          }
        } catch (error) { //mamoolan mavarede ghtiye shabakeh va net va adame dastrasi be api be catch miad(vali mavarede eshtebah vared kardane name api va paramethaye naghes dadan be api va ... barnameh dar try 
          // mimooneh va automat statuse 4xx ya 5xx tolid mikoneh)
          console.error("❌ خطااااااااااااااااااای JWT:", error);
          if (error instanceof Error) {
            idUSerRef.current!.innerText = error.message;
          } else {
            idUSerRef.current!.innerText = String(error);
          }
        }
      } else {
        if (idUSerRef.current) {
          idUSerRef.current.innerText = "offlinim";
        }
      }
    };
    asyncFunctionInUseEffect();
  });
  // const params = useParams();  //zare_nk_040224_comment(chon makhsoose safahate dynamic hast va inja kar nemikoneh)
  const params = useSearchParams();
  const id = params.get("id") || "Unknown";
  const name = params.get("name") || "Unknown";
  const handleClick = () => {
    router.push("/folder03?tab=comments2");
  };
  const loginClick = () => {
    router.push("/login");
  };
  return (
    <div>
      <h1></h1>
      <h1 id="idUSer" ref={idUSerRef}>
        this is:: /folder02
      </h1>
      <h1>Product {id}</h1>
      <p>This is the product page for name: {name}</p>
      <button onClick={handleClick}>go to folder03 </button>
      <button onClick={loginClick}>go to login </button>
    </div>
  );
}
