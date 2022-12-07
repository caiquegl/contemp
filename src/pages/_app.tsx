import "antd/dist/antd.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { AuthProvider } from "../contextAuth/authContext";
import { ParallaxProvider } from 'react-scroll-parallax'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <ParallaxProvider>
          <Component {...pageProps} />
        </ParallaxProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
