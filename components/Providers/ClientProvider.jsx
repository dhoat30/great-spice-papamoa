'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

import { ThemeProvider } from '@mui/material/styles';
import {theme } from "../../utils/themeSettings"
export default function ClientProvider({ children }) {
  return <>

  <ThemeProvider theme={theme}>
  

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
