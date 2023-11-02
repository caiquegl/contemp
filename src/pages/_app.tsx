import "antd/dist/antd.css";
import "../styles/globals.css";
import '../styles/customize.css'
import type { AppProps } from "next/app";
import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { AuthProvider } from "../contextAuth/authContext";
import Script from "next/script";
import Hotjar from '@hotjar/browser';
import { useEffect } from "react";
import Head from "next/head";
import { ParallaxProvider } from 'react-scroll-parallax';

const siteId = 3290469;
const hotjarVersion = 6;

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    Hotjar.init(siteId, hotjarVersion)
  }, [])


  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Head>
          <title>Contemp</title>
        </Head>
        <ParallaxProvider>
        <Component {...pageProps} />
        </ParallaxProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
