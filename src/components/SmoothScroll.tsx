import { Box, Center, Spinner } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../contextAuth/authContext'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContexts'

import { Header } from './Header'

export const SmoothScroll = ({ children }: any) => {
  const { loading } = useAuth()

  return (
    <>
      {loading ? <Center bg="black.900" h="100vh" w="100%"><Spinner size="xl" /></Center>
        :
        <>
          <Box
            zIndex={9999999999999999999999}
          >
            <SidebarDrawerProvider>
              <Header />
            </SidebarDrawerProvider>
          </Box>

          <Box maxH="100vh" >
            {children}
          </Box>
        </>
      }
    </>
  )
}
