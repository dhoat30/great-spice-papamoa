'use client';
import { ThemeProvider } from '@mui/material/styles';
import {theme } from "../../utils/themeSettings"
export default function ClientProvider({ children }) {




  return <>

  <ThemeProvider theme={theme}>
  
    {children}</ThemeProvider>
    </>;
}
