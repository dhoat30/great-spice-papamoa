"use client";
import {useState, useEffect} from "react"
//import css file 
import './globals.css'
import './tokens.css'
// Import slick css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";
import { Work_Sans, Yeseva_One  } from 'next/font/google'
import Script from 'next/script'

// import { useState, useEffect, Suspense } from 'react';

import ClientProvider from '@/components/Providers/ClientProvider';

import Loader from "@/components/UI/Loader/Loader";
// import Loader from '@/components/UI/Loader/Loader';

// fonts settings

const work_sans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
  preload: true
})
const cormorant = Yeseva_One({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
    weight: '400', // ✅ must specify

  preload: true
})

export default function RootLayout({ children }) {
  const GTM_ID = 'GTM-NMB3V6C'


 

  return (
    <html lang="en" className={`${work_sans.variable} ${cormorant.variable}`}>

      <Script
          id="gtm-script"
          strategy="lazyOnload" // or "lazyOnload" if you prefer
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s);j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `
          }}
        />
      <body >
            {/* 3) GTM noscript fallback */}
            <noscript>
          <iframe 
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} 
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      <ClientProvider>
     
          {children}
        </ClientProvider>
      </body>
    </html>
  )
}