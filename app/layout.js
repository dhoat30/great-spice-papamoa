"use client";
//import css file 
import './globals.css'
import './tokens.css'
// Import slick css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";
import { Work_Sans, Cormorant } from 'next/font/google'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../utils/themeSettings'

import { usePathname, useSearchParams } from 'next/navigation';
// import { useState, useEffect, Suspense } from 'react';


import { GoogleTagManager } from '@next/third-parties/google'
// import Loader from '@/components/UI/Loader/Loader';

// fonts settings

const work_sans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
  preload: true
})
const cormorant = Cormorant({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
  preload: true
})

export default function RootLayout({ children }) {

  // const [loading, setLoading] = useState(false);
  // const pathname = usePathname();
  // const searchParams = useSearchParams();

  // useEffect(() => {
  //   setLoading(true);

  //   // Artificially delay the loader visibility to create a better user experience
  //   const timeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 500);

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [pathname, searchParams]);

  return (
    <html lang="en" className={`${work_sans.variable} ${cormorant.variable}`}>
      <GoogleTagManager gtmId="GTM-NMB3V6C" />
      <body >
        <ThemeProvider theme={theme}>
       {/* Wrap main content with Suspense */}
\            {children}

        </ThemeProvider>

      </body>
    </html>
  )
}