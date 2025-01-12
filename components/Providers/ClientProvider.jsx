'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {theme } from "../../utils/themeSettings"
import Loading from "../UI/Loader/Loading";
export default function ClientProvider({ children }) {
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000); // Adjust timing
    return () => clearTimeout(timer);
  }, []);

  return <>

  <ThemeProvider theme={theme}>
  {isLoading && <Loading />}


    {children}
    <ProgressBar
          height="8px"
          color="#fffd00"
          options={{ showSpinner: false }}
          shallowRouting
        />

    </ThemeProvider>
    </>;
}
