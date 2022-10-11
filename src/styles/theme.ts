import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    black: {
      "900": "#232323",
      "800": "#242424", // text strong
      "200": "#393939"
    },
    red: {
        "600": "#B60005"
    }
  },
  fonts: {
    heading: 'Nunito',
    body: 'Nunito'
  },
  styles: {
    global: {
      body: {
        bg: 'black.900',
        color: 'white'
      }
    }
  }
})