import { Box } from '@chakra-ui/react'
import React from 'react'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContexts'

import { Header } from './Header'

export const SmoothScroll = ({ children }: any) => {

  return (
    <>
      <SidebarDrawerProvider>
        <Header />
      </SidebarDrawerProvider>

      <Box maxH="100vh" >
        {children}
      </Box>
    </>
  )
}
