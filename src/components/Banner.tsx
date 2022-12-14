import { Box, Container, Flex, Text } from '@chakra-ui/react'
import { Image } from './Image'
import React, { useEffect, useState } from 'react'
import Team from '../assets/images/temnacontemp.png'
import { Typewriter } from 'react-simple-typewriter'
import { pxToRem } from '../utils/pxToRem'
import { SearchBar } from './SearchBar'
import { useWindowSize } from '../utils/useWindowSize'

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
      backgroundImage={`url('./images/Banner.png')`}
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
        <Box marginTop={'5%'}>
          <Image src={Team} width={pxToRem(200)} height={pxToRem(52)} />
        </Box>
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
          >
            ExcelĂȘncia em produtos:{' '}
          </Text>

          <Text
            color="white"
            textAlign="center"
            fontSize={['1.3rem', '1.3rem', '2.3rem']}
            fontWeight="bold"
            h={pxToRem(width > maxWidth ? 130 : 40)}
          >
            <Typewriter words={typewriterWords} loop={0} cursor={true} />
          </Text>
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
  'Controladores de PotĂȘncia',
  'RelĂ©s de Estado SĂłlido',
  'IHM - Interface',
  'TermorresistĂȘncias',
  'Termopares',
  'Sensores pt100',
  'Sensores pt1000',
  'Cabos para Termopares',
  'CĂąmeras TermogrĂĄficas Fixas Ăptris',
  'PirĂŽmetros Infravermelhos Fixos Ăptris',
  'PirĂŽmetros Infravermelhos PortĂĄteis Ăptris',
  'Aquisitores de Dados',
  'Contadores',
  'Temporizadores',
  'Placas controladoras de Processo',
  'Transmissores de Sinais',
  'Transmissores de Temperatura e Umidade',
  'Transmissores de PressĂŁo',
  'Integrador de Corrente',
  'Dissipador de Calor',
  'Software - Contemp Conect',
  'Software - Contemp Bridge',
  'Software - Contemp Tools'

]
