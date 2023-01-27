import { Box, Center, Fade, Spinner } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useAuth } from '../contextAuth/authContext'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContexts'

import { Header } from './Header'

export const SmoothScroll = ({ children }: any) => {
  const { loading } = useAuth()

  return (
    <>
      <Center
        bg='black.900'
        h='100vh'
        w='100vw'
        zIndex={loading ? 99999999999 : -1}
        position='fixed'
        top='0'
        left='0'
        transition='all 0.5s'
        opacity={loading ? 1 : 0}
      >
        <Spinner size='xl' />
      </Center>
      <>
        <Box zIndex={9999999999999999999999}>
          <SidebarDrawerProvider>
            <Header />
          </SidebarDrawerProvider>
        </Box>

        <Box maxH='100vh'>{children}</Box>
      </>
    </>
  )
}
