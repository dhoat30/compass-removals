"use client";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "../utils/themeSettings";
import { useState, useEffect } from "react";
import Script from "next/script";
import LoadingIndicator from "@/Components/UI/Loader/LoadingIndicator";
import TrackingPersistence from "@/Components/TrackingPersistence/TrackingPersistence";
export default function ClientProvider({ children }) {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => setIsLoading(false), 3000); // Adjust timing
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <LoadingIndicator />
      {/* {isLoading && <Loading />} */}
      {children}
      <TrackingPersistence />
    </ThemeProvider>
  );
}
