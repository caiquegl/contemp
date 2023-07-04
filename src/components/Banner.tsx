import { Box, Container, Flex, Text } from '@chakra-ui/react'
import { Image } from './Image'
import React, { useEffect, useState } from 'react'
import Team from '../assets/images/temnacontemp.png'
import { Typewriter } from 'react-simple-typewriter'
import { pxToRem } from '../utils/pxToRem'
import { SearchBar } from './SearchBar'
import { useWindowSize } from '../utils/useWindowSize'
import BGFavorite from '../assets/banners/Banner.png'
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
    <Flex
      w="100%"
      bg="black.900"
      h="auto"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      // backgroundImage={`url('./images/Banner.png')`}
      backgroundImage={`url(${BGFavorite.src})`}
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
    >
      <Container
        maxW="6xl"
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="100%"
      >
        {/*<Box marginTop={'5%'}>
          <Image src={Team} width={pxToRem(200)} height={pxToRem(52)} />
        </Box>*/}
        <Flex
          w="100%"
          maxW="650px"
          flexDirection="column"
          marginBottom={pxToRem(width > maxWidth ? 87 : 60)}
          minH={pxToRem(width > maxWidth ? 150 : 40)}
        >
          <Text
            color="white"
            textAlign="center"
            fontSize={['1.3rem', '1.3rem', '2.3rem']}
            fontWeight="bold"
            marginTop={'20%'}
            opacity={'0'}
          >
            PARABÉNS CONTEMP, HÁ 39 ANOS SENDO SOLUÇÃO EM TEMPERATURA INDUSTRIAL.
          </Text>

          {/*<Text
            color="white"
            textAlign="center"
            fontSize={['1.3rem', '1.3rem', '2.3rem']}
            fontWeight="bold"
            h={pxToRem(width > maxWidth ? 130 : 40)}
          >
            <Typewriter words={typewriterWords} loop={0} cursor={true} />
          </Text>*/}
        </Flex>
        <Flex w="100%" alignItems="center" flexDirection="column">
          <SearchBar
            inputProps={{
              placeholder: 'Procure aqui seu produto...'
            }}
            containerProps={{
              bg: 'red.600'
            }}
            searchCard="100%"
          />

          <Text
            fontSize="20px"
            color="white"
            textAlign="center"
            marginTop={pxToRem(15)}
          >
            Pesquise aqui o produto que precisa.
          </Text>
        </Flex>
      </Container>
    </Flex>
  )
}

const typewriterWords = [
  'Controladores de Processos',
  'Controladores de Temperatura',
  'Indicadores de Temperatura e Processos',
  'Controladores de Potência',
  'Relés de Estado Sólido',
  'IHM - Interface',
  'Termorresistências',
  'Termopares',
  'Sensores PT-100',
  'Sensores PT-1000',
  'Cabos para Termopares',
  'Câmeras Termográficas Fixas Optris',
  'Pirômetros Infravermelhos Fixos Optris',
  'Pirômetros Infravermelhos Portáteis Optris',
  'Aquisitores de Dados',
  'Contadores',
  'Temporizadores',
  'Placas Controladoras de Processo',
  'Transmissores de Sinais',
  'Transmissores de Temperatura e Umidade',
  'Transmissores de Pressão',
  'Integrador de Corrente',
  'Dissipador de Calor',
  'Software - Contemp Conect',
  'Software - Contemp Bridge',
  'Software - Contemp Tools'

]
