import "antd/dist/antd.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { AuthProvider } from "../contextAuth/authContext";
import Script from "next/script";
import Hotjar from '@hotjar/browser';
import { useEffect } from "react";
import Head from "next/head";
const siteId = 3290469;
const hotjarVersion = 6;

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    Hotjar.init(siteId, hotjarVersion)
  }, [])


  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Script src="https://www.googleoptimize.com/optimize.js?id=OPT-W2XSF2X" />
        <Head>
          <title>Contemp</title>
        </Head>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
