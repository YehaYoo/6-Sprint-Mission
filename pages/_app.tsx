import type { AppProps } from "next/app";
import Header from "../components/Header";
import React from "react";
import "../styles/reset.css";
import "../styles/global.css";
import { AuthProvider } from "@/contexts/AuthProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
