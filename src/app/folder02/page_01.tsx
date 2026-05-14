// app/page.tsx  ////zare_nk_050223_okk
'use client'; // برای استفاده از state و event handlers لازم است

import React, { useState } from 'react';
import { Collapse, Button, Box, Paper, Typography } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'; //zare_nk_050204_added(for use Dialog)

import Styles from "@/styles/components/globals.module.css"; //zare_nk_050204_added 
import { Http2ServerRequest } from 'http2';

// این کامپوننت LayoutWrapper رو هم که در layout.tsx داشتید، اینجا در نظر می‌گیریم
// فرض می‌کنیم LayoutWrapper استایل‌های کلی یا wrapperهای لازم رو اعمال می‌کنه
// اگر LayoutWrapper شما نیاز به padding خاصی داره، می‌تونید اینجا تنظیم کنید.

export default function HomePage() {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box  ////zare_nk_050202_nokteh(tage <Box> shabiye <div class="container"> dar bootstarp has)
                className={`${Styles.ISW_Medium_fa}`}
                sx={{
                    p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px dashed green',
                    // fontFamily: '"IRANSansWeb_ms(adad_fa)", "IRANSansWeb_Medium(adad_fa)", "IRANSansWeb_ms", "IRANSansWeb_Medium", "IranSans", "b nazanin", "IRNazanin"',
                }}
                style={{ fontFamily: '"IRANSansWeb_ms(adad_fa)", "IRANSansWeb_Medium(adad_fa)"  ' }}
            >
                <Typography variant="h4" gutterBottom
                    // className={`${Styles.ISW_Medium_fa} ${Styles.corTesti}`}   //zare_nk_050204_nokteh(classhaye filhaye .module.css mamoolan baraye taghaye MUI olaviate paeintari 
                    // darand nesbat be designhaye dakheliye MUI(ke bazi css ha ra dakheli tanzim mikonan),va shayad kar nakonand(masalan baraye fontFamily mamoolan  kar nemikoneh
                    // vali baraye color test kardam kar kard),baraye hamin fonte IRANSansWeb_Medium(adad_fa) ra mostaghiman dar sx ya style neveshtim(dar zemn dar sx ya style
                    // pedareshoon ham benevisim bazam ehtemal dare kar nakonam,va behtare mostaghim dar dar sx ya style khodeshoon benevisim ) )
                    sx={{ border: '2px dashed black', fontFamily: '"IRANSansWeb_ms(adad_fa)", "IRANSansWeb_Medium(adad_fa)"', }}
                // style={{fontFamily: '"IRANSansWeb_ms(adad_fa)", "IRANSansWeb_Medium(adad_fa)"  '}} 

                >
                    مثال دکمه و Collapse با MUI
                </Typography>

                <p>سلاممی آگاهانه</p>

                <Button
                    variant="contained"  //zare_nk_050202_nokteh(moadele background-color va box-shadow va hover baraye designe zaheri)
                    color="primary"    //zare_nk_050202_nokteh(moadele btn-primary dar bootstrap)
                    onClick={handleToggle}
                    sx={{ mb: 2, fontFamily: '"IRANSansWeb_ms(adad_fa)"' }} //zare_nk_050202_nokteh( margin-bottom)
                >
                    {open ? 'بستن محتوا' : 'باز کردن محتوا'}
                </Button>
                {/* zare_nk_050203_aded_st(for use MUI Collapse) */}
                {/* <Collapse
                style={{
                    position: 'absolute',
                    bottom: 0,
                }}
                in={open} //zare_nk_050202_nokteh(moadele show() va hide() dar bootstrap)
                timeout="auto"
                unmountOnExit  //zare_nk_050202_nokteh(age in attribute ra benevisim age in={false} beshe az dom hazf mishe,age in attribute ra nanevisim 
            // age in={false} beshe az dom hazf nemishe va dar inspect vojood dareh va faghat hidden mishe)
            >
                <Paper  //zare_nk_050202_nokteh(tage Paper manade divi hast ke shaddow dadim behesh,va mesle zahere modal hast(yani engar roye safhe miyad va saye ijad mikoneh))
                    elevation={4}  //zare_nk_050202_nokteh(shabihe opacity dar css)
                    sx={{ p: 3, mt: 3, width: '100%', maxWidth: '500px', textAlign: 'center', border: '2px dashed orange', }}>
                    <Typography
                        variant="body1" //zare_nk_050202_nokteh(inam engar mesle h1 ta h6 rooye andazeye font tasir mizare!)
                        sx={{ p: 3, border: '2px dashed blue', }}>
                        این محتوای درون کامپوننت Collapse است 🌿
                        با انیمیشن نرم باز و بسته می‌شود.
                    </Typography>

                    <Typography
                        variant="body2"
                        // color="primary"   //zare_nk_050203_nokteh(shabihe range primary bootstarp tarif shodeh hast)
                        color="primaryDasti"  //zare_nk_050203_nokteh(range dastiye khodam ke dar palette tarif kardam,baname delkhah(age name tarifshodeye MUI yani primary bedam jaigizine primarye MUI mishe))
                        sx={{ mt: 1 }}>
                        (این بخش تنها زمانی نمایش داده می‌شود که Collapse باز باشد)
                    </Typography>
                </Paper>
            </Collapse> */}
                {/* zare_nk_050203_aded_end(for use MUI Collapse) */}
                {/* zare_nk_050203_aded_st(for use MUI Dialog) */}
                <Dialog open={open} onClose={() => {
                    console.log('Dialog onClose event1!');
                    setOpen(false);
                }}>
                    <DialogTitle>عنوان مودال شما</DialogTitle> {/* zare_nk_050204_nokteh(mesle modalHedeare bootstrap) */}
                    <DialogContent> {/* zare_nk_050204_nokteh(mesle modalContent bootstrap) */}
                        <DialogContentText> {/* zare_nk_050204_nokteh(mesle modalBodye bootstrap(bakhshe mohtavaye gheire dokmehi va gheire rooydadi)) */}
                            اینجا متن توضیحات مودال قرار می‌گیرد که در بوت‌استرپ در بخش modal-body بود.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions> {/* zare_nk_050204_nokteh(mesle modalBodye bootstrap(bakhshe motavaye dokmehi va rooydadi)) */}
                        {/* zare_nk_050204_nokteh(dokmehaye tooye Dialog ro mishe mesle bootstrapModal ke tooye modal-body mizasht,inja masalan tooyeDialogContent  va hamsayaye 
                    DialogContentText bezarim,vali az nazare manteghe MUI dakhele DialogActions khanatar hast,darzemn MUI emkanate zaheri va karbordiye khoobi ham barash lahaz mikoneh) */}
                        <Button onClick={() => {
                            console.log('Dialog onClose event2!');
                            setOpen(false);
                        }}>بستن</Button>
                        <Button onClick={() => {
                            console.log('Dialog onClose event3!');
                            setOpen(false);
                        }} variant="contained">تایید</Button>
                    </DialogActions>
                </Dialog>
                {/* zare_nk_050203_aded_st(for use MUI Dialog) */}

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        محتوای دیگر صفحه...
                    </Typography>
                    <Typography variant="body1">
                        این بخش از صفحه همیشه قابل مشاهده است.
                    </Typography>
                </Box>
            </Box>
        </>
    );
}
