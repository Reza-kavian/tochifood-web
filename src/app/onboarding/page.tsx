////zare_nk_050211_okk
'use client'
import { useRouter, redirect } from "next/navigation";
import "@/styles/onboardingCss.css";
import { wrap } from "module";

export default function Page() {
  const router = useRouter();
  const goToLogin = () => {
    // router.push("/folder03?tab=comments2");
    // redirect("/login");
    router.replace("/login");
  };

  const goToMap = () => {
    // router.push("/folder03?tab=comments2");
    // redirect("/login");
    router.replace("/location");
  };

  return (
    <>
      {/* <div className="page-cont"> */}
      {/* <div className="main"> */}
      <div className="whole-cont-without-btn">

        <div className="rotating-relative">
          <div className="rotating-div-cont">
            <div className="rotating-div rotate-0">
              <img className="img-in-rotating-div" src="./images/pageGardoon/0.webp" />
            </div>

            <div className="rotating-div rotate-72">
              <img className="img-in-rotating-div" src="./images/pageGardoon/1.webp" />
            </div>

            <div className="rotating-div rotate-144">
              <img className="img-in-rotating-div" src="./images/pageGardoon/2.webp" />
            </div>

            <div className="rotating-div rotate-216">
              <img className="img-in-rotating-div" src="./images/pageGardoon/3.webp" />
            </div>

            <div className="rotating-div rotate-288">
              <img className="img-in-rotating-div" src="./images/pageGardoon/4.webp" />
            </div>
          </div>

          <div className="big-rotating-div-cont">
            <div className="rotating-div rotate-0">
              <img className="big-img-in-rotating-div" src="./images/pageGardoon/0.webp" />
            </div>

            <div className="rotating-div rotate-72">
              <img className="big-img-in-rotating-div" src="./images/pageGardoon/1.webp" />
            </div>

            <div className="rotating-div rotate-144">
              <img className="big-img-in-rotating-div" src="./images/pageGardoon/2.webp" />
            </div>

            <div className="rotating-div rotate-216">
              <img className="big-img-in-rotating-div" src="./images/pageGardoon/3.webp" />
            </div>

            <div className="rotating-div rotate-288">
              <img className="big-img-in-rotating-div" src="./images/pageGardoon/4.webp" />
            </div>

          </div>
        </div>

        <div className="icon-and-description" >
          <div className="cont-in-icon-and-description"           >
            <div>
              <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1288.24 120.1" data-animate="true" className="relative h-24 w-[250px] fill-primary"><g id="Layer_1-2" data-name="Layer 1"><g><g><path className="animate-jump" d="m295.06,24.04h-37.1V2.18h101.02v21.86h-37.1v94.07h-26.83V24.04Z"></path><path className="animate-jump" d="m446.95,93.27h-53.82l-10.27,24.84h-27.49L407.03,2.18h26.5l51.84,115.93h-28.16l-10.27-24.84Zm-8.44-20.37l-18.39-44.39-18.38,44.39h36.77Z" style={{ animationDelay: '100ms' }}></path><path className="animate-jump" d="m576.3,7.32c7.56,3.42,13.38,8.28,17.47,14.57,4.08,6.29,6.13,13.75,6.13,22.35s-2.05,15.93-6.13,22.28c-4.09,6.35-9.91,11.21-17.47,14.57-7.56,3.37-16.48,5.05-26.75,5.05h-23.35v31.96h-26.83V2.18h50.18c10.27,0,19.18,1.71,26.75,5.14Zm-9.85,51.75c4.19-3.48,6.29-8.42,6.29-14.82s-2.1-11.51-6.29-14.98c-4.2-3.48-10.33-5.22-18.38-5.22h-21.86v40.25h21.86c8.06,0,14.18-1.74,18.38-5.22Z" style={{ animationDelay: '200ms' }}></path><path className="animate-jump" d="m633.51,116.38c-8.56-2.48-15.43-5.72-20.62-9.69l9.11-20.21c4.97,3.65,10.87,6.57,17.72,8.78,6.84,2.21,13.69,3.31,20.53,3.31,7.62,0,13.25-1.13,16.89-3.39,3.64-2.27,5.46-5.27,5.46-9.03,0-2.76-1.07-5.05-3.23-6.87-2.15-1.82-4.91-3.28-8.28-4.39-3.37-1.1-7.92-2.32-13.66-3.65-8.83-2.09-16.07-4.19-21.7-6.29-5.63-2.1-10.46-5.47-14.49-10.1-4.03-4.64-6.04-10.82-6.04-18.55,0-6.74,1.82-12.84,5.46-18.3,3.65-5.47,9.13-9.8,16.48-13,7.34-3.2,16.31-4.8,26.91-4.8,7.4,0,14.63.88,21.69,2.65s13.25,4.3,18.55,7.61l-8.28,20.37c-10.71-6.07-21.42-9.11-32.13-9.11-7.51,0-13.06,1.22-16.64,3.65-3.59,2.43-5.38,5.63-5.38,9.6s2.07,6.93,6.21,8.86c4.14,1.94,10.46,3.84,18.96,5.72,8.83,2.1,16.06,4.19,21.69,6.29,5.63,2.1,10.46,5.41,14.49,9.94,4.03,4.52,6.05,10.65,6.05,18.38,0,6.63-1.85,12.67-5.55,18.13-3.7,5.47-9.25,9.8-16.64,13-7.4,3.2-16.39,4.8-26.99,4.8-9.17,0-18.03-1.25-26.58-3.72Z" style={{ animationDelay: '300ms' }}></path><path className="animate-jump" d="m735.66,2.18h26.83v115.93h-26.83V2.18Z" style={{ animationDelay: '400ms' }}></path><path className="animate-jump" d="m820.42,23.56v30.69h47.75v21.56h-47.75v42.3h-26.87V1.99h81.75v21.56h-54.88Z" style={{ animationDelay: '500ms' }}></path><path className="animate-jump" d="m919.86,112.31c-9.68-5.2-17.25-12.36-22.73-21.49-5.47-9.12-8.21-19.38-8.21-30.77s2.74-21.65,8.21-30.77c5.48-9.13,13.05-16.28,22.73-21.49,9.68-5.2,20.54-7.8,32.6-7.8s22.89,2.6,32.51,7.8c9.62,5.2,17.2,12.36,22.73,21.49,5.53,9.12,8.29,19.38,8.29,30.77s-2.76,21.65-8.29,30.77c-5.53,9.13-13.11,16.29-22.73,21.49-9.62,5.2-20.46,7.8-32.51,7.8s-22.92-2.6-32.6-7.8Zm51.18-19.83c5.53-3.15,9.87-7.55,13.02-13.19,3.15-5.64,4.73-12.06,4.73-19.24s-1.58-13.6-4.73-19.24c-3.15-5.64-7.49-10.04-13.02-13.19-5.53-3.15-11.72-4.73-18.58-4.73s-13.05,1.57-18.58,4.73c-5.53,3.15-9.87,7.55-13.02,13.19-3.15,5.64-4.73,12.06-4.73,19.24s1.58,13.6,4.73,19.24c3.15,5.64,7.49,10.03,13.02,13.19,5.53,3.15,11.72,4.73,18.58,4.73s13.05-1.57,18.58-4.73Z" style={{ animationDelay: '600ms' }}></path><path className="animate-jump" d="m1061.33,112.31c-9.68-5.2-17.25-12.36-22.73-21.49-5.47-9.12-8.21-19.38-8.21-30.77s2.74-21.65,8.21-30.77c5.48-9.13,13.05-16.28,22.73-21.49,9.68-5.2,20.54-7.8,32.6-7.8s22.89,2.6,32.51,7.8c9.62,5.2,17.2,12.36,22.73,21.49,5.53,9.12,8.29,19.38,8.29,30.77s-2.76,21.65-8.29,30.77c-5.53,9.13-13.11,16.29-22.73,21.49-9.62,5.2-20.46,7.8-32.51,7.8s-22.92-2.6-32.6-7.8Zm51.18-19.83c5.53-3.15,9.87-7.55,13.02-13.19,3.15-5.64,4.73-12.06,4.73-19.24s-1.58-13.6-4.73-19.24c-3.15-5.64-7.49-10.04-13.02-13.19-5.53-3.15-11.72-4.73-18.58-4.73s-13.05,1.57-18.58,4.73c-5.53,3.15-9.87,7.55-13.02,13.19-3.15,5.64-4.73,12.06-4.73,19.24s1.58,13.6,4.73,19.24c3.15,5.64,7.49,10.03,13.02,13.19,5.53,3.15,11.72,4.73,18.58,4.73s13.05-1.57,18.58-4.73Z" style={{ animationDelay: '700ms' }}></path><path className="animate-jump" d="m1171.46,1.99h52.75c12.6,0,23.75,2.4,33.43,7.21,9.67,4.82,17.19,11.59,22.56,20.32,5.36,8.74,8.04,18.91,8.04,30.52s-2.68,21.79-8.04,30.52c-5.37,8.74-12.89,15.51-22.56,20.32-9.68,4.81-20.82,7.21-33.43,7.21h-52.75V1.99Zm51.43,94.06c11.61,0,20.87-3.24,27.79-9.7,6.91-6.47,10.37-15.24,10.37-26.3s-3.46-19.83-10.37-26.3c-6.91-6.46-16.17-9.7-27.79-9.7h-24.55v72h24.55Z" style={{ animationDelay: '800ms' }}></path></g><g><polygon id="Fill-2" points="200.4 42.14 80.16 42.14 80.16 2.18 200.4 2.18 200.4 42.14"></polygon><polygon id="Fill-3" points="200.4 118.11 0 118.11 0 78.16 200.4 78.16 200.4 118.11"></polygon></g></g></g></svg>
            </div>

            <div>
              <p>
                <span>...</span>
                <span style={{marginLeft:'5px'}}>سفارش آنلاین قهوه</span>
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className="btn-cont">
        <div style={{ display: 'flex', padding: '0px 10px', flex: '1 1 47%' }}>
          <button
            onClick={goToMap}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 7,
              borderRadius: 10,
              backgroundColor: '#f3f2f2',  //#ededed 
              color: '#242424',
              border: 'none',
              fontSize: '15px',
              width: '100%',
              height: '50px',
            }}>
            ورود به عنوان مهمان
          </button>
        </div>
        <div style={{ display: 'flex', padding: '0px 10px', flex: '1 1 47%' }}>
          <button
            onClick={goToLogin}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 7,
              borderRadius: 10,
              backgroundColor: '#ff5900',
              color: 'white',
              border: 'none',
              fontSize: '15px',
              width: '100%',
              height: '50px',
            }}>
            ورود یا عضویت
          </button>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
