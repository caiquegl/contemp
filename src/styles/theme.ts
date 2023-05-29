import { extendTheme } from "@chakra-ui/react";

export const colors = {
  black: {
    "900": "#232323",
    "800": "#242424", // text strong
    "200": "#393939",
    "50": "#D6D6D6",
    "100": "#E2E2E2",
  },
  red: {
    "600": "#B60005",
  },
  white: {
    "500": "#F7F7F7",
    "700": "#EFEFEF",
    "900": "#D1D1D1",
    "0": '#fff'
  },
};

export const theme = extendTheme({
  colors,
  fonts: {
    heading: "PT Sans",
    body: "PT Sans",
  },
  styles: {
    global: {
      body: {
        bg: "black.900",
        color: "white",
      },
    },
  },
});
