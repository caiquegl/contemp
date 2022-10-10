import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    black: {
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
        bg: 'black.800',
        color: 'white'
      }
    }
  }
})