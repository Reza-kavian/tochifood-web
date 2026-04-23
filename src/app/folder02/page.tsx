// app/page.tsx
'use client'; // برای استفاده از state و event handlers لازم است

import React, { useState } from 'react';
import { Collapse, Button, Box, Paper, Typography } from '@mui/material';

// این کامپوننت LayoutWrapper رو هم که در layout.tsx داشتید، اینجا در نظر می‌گیریم
// فرض می‌کنیم LayoutWrapper استایل‌های کلی یا wrapperهای لازم رو اعمال می‌کنه
// اگر LayoutWrapper شما نیاز به padding خاصی داره، می‌تونید اینجا تنظیم کنید.

export default function HomePage() {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <Box  ////zare_nk_050202_nokteh(tage <Box> shabiye <div class="container"> dar bootstarp has)
            sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px dashed green', }}>
            <Typography variant="h4" gutterBottom sx={{ border: '2px dashed black', }}>
                مثال دکمه و Collapse با MUI
            </Typography>

            <Button
                variant="contained"  //zare_nk_050202_nokteh(moadele background-color va box-shadow va hover baraye designe zaheri)
                color="primary"    //zare_nk_050202_nokteh(moadele btn-primary dar bootstrap)
                onClick={handleToggle}
                sx={{ mb: 2 }} //zare_nk_050202_nokteh( margin-bottom)
            >
                {open ? 'بستن محتوا' : 'باز کردن محتوا'}
            </Button>

            <Collapse
                style={{
                    // position: open ? 'absolute' : 'relative', // یا 'fixed' اگر بخواهید روی کل صفحه باشد
                    // bottom: open ? 0 : 'auto', // تنظیم موقعیت بالا (مثلاً 100px از بالا) 
                    position: 'absolute', // یا 'fixed' اگر بخواهید روی کل صفحه باشد
                    bottom: 0, // تنظیم موقعیت بالا (مثلاً 100px از بالا)
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
            </Collapse>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    محتوای دیگر صفحه...
                </Typography>
                <Typography variant="body1">
                    این بخش از صفحه همیشه قابل مشاهده است.
                </Typography>
            </Box>
        </Box>
    );
}
