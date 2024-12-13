'use client';
import { ThemeProvider } from '@mui/material/styles';
import {theme } from "../../utils/themeSettings"
import { useState, useEffect } from 'react';
import Loading from '../UI/Loader/loading'
export default function ClientProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000); // Adjust timing
    return () => clearTimeout(timer);
  }, []);



  return <ThemeProvider theme={theme}>
    {isLoading && <Loading />}
    {children}</ThemeProvider>;
}
