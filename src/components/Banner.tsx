import { Box, Container, Flex, Text, Link } from '@chakra-ui/react'
import { Image } from './Image'
import React, { useEffect, useState } from 'react'
import Team from '../assets/images/temnacontemp.png'
import { Typewriter } from 'react-simple-typewriter'
import { pxToRem } from '../utils/pxToRem'
import { SearchBar } from './SearchBar'
import { useWindowSize } from '../utils/useWindowSize'
import BGFavorite from '../assets/banners/Banner2.png'
export const Banner = () => {
  const windowSize = useWindowSize()

  const [maxWidth] = useState(930)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (windowSize) {
      setWidth(windowSize?.width as number)
    } else {
      setWidth(window.innerWidth)
    }
  }, [windowSize])

  return (
    <Link href="https://contemp.com.br/category/PIRÔMETROS_INFRAVERMELHOS_FIXOS" isExternal>
    <Flex
      w='100%'
      bg='black.900'
      h='auto'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
      // backgroundImage={`url('./images/Banner.png')`}
      backgroundImage={`url(https://contemp.com.br/api/arquivos/bannercontemp.png)`}
      backgroundRepeat='no-repeat'
      backgroundPosition='center'
    >
      <Container maxW='6xl' display='flex' flexDirection='column' alignItems='center' height='100%' padding={'3rem'}>
        {/*<Box marginTop={'5%'}>
          <Image src={Team} width={pxToRem(200)} height={pxToRem(52)} />
        </Box>*/}
        <Flex
          w='100%'
          maxW='650px'
          flexDirection='column'
          marginBottom={pxToRem(width > maxWidth ? 87 : 60)}
          minH={pxToRem(width > maxWidth ? 150 : 40)}
        >
          <Text
            color='white'
            textAlign='center'
            fontSize={['1.3rem', '1.3rem', '2.3rem']}
            fontWeight='bold'
            marginTop={'20%'}
            opacity={'0'}
          >
            PARABÉNS CONTEMP, HÁ 39 ANOS SENDO SOLUÇÃO EM TEMPERATURA INDUSTRIAL.
          </Text>
        </Flex>
      </Container>
    </Flex>
    </Link>
  )
}
