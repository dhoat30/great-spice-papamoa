"use client";
import {useState, useEffect} from "react"
//import css file 
import './globals.css'
import './tokens.css'
// Import slick css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";
import { Work_Sans, Cormorant } from 'next/font/google'

// import { useState, useEffect, Suspense } from 'react';

import ClientProvider from '@/components/Providers/ClientProvider';

import { GoogleTagManager } from '@next/third-parties/google'
import Loader from "@/components/UI/Loader/Loader";
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


 

  return (
    <html lang="en" className={`${work_sans.variable} ${cormorant.variable}`}>
      <GoogleTagManager gtmId="GTM-NMB3V6C" />
      <body >
      <ClientProvider>
     
          {children}
        </ClientProvider>
      </body>
    </html>
  )
}