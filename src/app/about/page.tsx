////zare_nk_050220_okk
//src\app\about\page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import styles from "@/styles/components/home.module.css";
import Image002 from "../../../public/images/002.jpg";  //zare_nk_041105_nokteh(albateh migan import Image faghat bayad baraye file haye dakhele /src bashe. va baraye file haye dakhele public bayad 
// az tage img mostaghiman estefadeh kard va baraye atribute src ham az / be onvane poosheye public estefadeh mikonim,masalan <img src="/Images/..." /> yani masire /public/Images/...)
import { metadata as layoutMetadata} from "../layout"; //zare_nk_040131_nokteh(mitavan metadata ra az layout import nakard,inja import kardam ta roosh dastkari konam)
// metadata.title = metadata.title + '-abouuttiimm';  //zare_nk_040416_nokteh(in khat az nazare manteghi khatarnake ke metadataye import shodeh ro dastkari konim va momkene dar builde proujeh error bedeh)
export const metadata = { //zare_nk_041013_nokteh(be khatere in dastkari majboor shodim metadata ra az layout import konim vagarnah barnameh automat in const ba lafze metadata(faghat metadata) ra dar tage html title gharar midad)
    title: `${layoutMetadata.title} - About03`, 
};

export default function Page() { 
  if (process.env.NODE_ENV === "production") { 
    console.log('zare_nk_040522_process.env.NODE_ENV === "production"');
    notFound(); //نمایش صفحه 404
    // یا redirect("/") // به صفحه اصلی بفرست
    return null;
  }
  return (
    <>
      {/* <title>{metadata.title}</title> */}  {/*zare_nk_040507_nokteh(neveshtane metadata dakhle tage title osooli nist va pishnahad nemishe,barnameh ham automat metadata ro beonvane mohtavaye tage title safhe dar nazar migire)*/} 
      <h1 className={styles.shape}>salam 002</h1>
      <img src="./images/002.jpg" style={{ border: "4px dashed silver" }} />
      <br />
      <Image alt="ggg" src={Image002} style={{ border: "7px dashed yellow" }} />   {/* zare_nk_041112_nokteh(albateh estefadeh az Image mamoolan makhsoos masir haye dakhele /src 
      hast va baraye masire /public tosiyeh nemishe az nazare standarde nextJs va hatta momkene error ham mideh va javab nadeh,baraye tasavire masire /public behtare az estafadeye
      mostaghime tage <img /> ba src="./..." estefadeh shavad ke ./ neshanaye mohtavaye dakhele public ast ) */}
      <br />
      <img
        src="https://www.tutorialspoint.com/market/public/assets/newDesign/img/heroSliderItem6.svg"
        style={{ border: "6px dotted blue" }}
      />
      <br />
      <img
        src="https://www.netafraz.com//images/standard_service.png"
        style={{ border: "6px dotted blue" }}
      />
      <br />
      {/* zare_nk_041112_nokteh(age masire src be damanaye khareji eshare koneh masir ra manade paein mostaghim dar src minevisim va dar bala import nemikonim ) */}
      <Image
        alt="Image003"
        width="300"
        height="200"
        src="https://www.netafraz.com/images/standard_service.png"
        style={{ border: "4px dashed orange" }}
      />
    </>
  );
}
