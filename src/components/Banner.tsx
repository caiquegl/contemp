import { Box, Container, Flex, Text } from '@chakra-ui/react'
import { Image } from './Image'
import React from 'react'
import Team from '../assets/images/temnacontemp.png'
import { Typewriter } from 'react-simple-typewriter'
import { pxToRem } from '../utils/pxToRem'
import { SearchBar } from './SearchBar'

export const Banner = () => {
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
          marginBottom={pxToRem(87)}
          minH={pxToRem(150)}
        >
          <Text
            color="white"
            textAlign="center"
            fontSize={['1.3rem', '1.3rem', '2.3rem']}
            fontWeight="bold"
          >
            Excelência em produtos:{' '}
          </Text>

          <Text
            color="white"
            textAlign="center"
            fontSize={['1.3rem', '1.3rem', '2.3rem']}
            fontWeight="bold"
            h={pxToRem(130)}
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
  'AQUISITORES DE DADOS',
  'IHM - INTERFACE',
  'CONTADORES',
  'TEMPORIZADORES',
  'PLACAS CONTROLADORAS DE PROCESSO',
  'INDICADORES DE TEMPERATURA E PROCESSOS',
  'TRANSMISSORES DE SINAIS',
  'TRANSMISSORES DE TEMPERATURA E UMIDADE',
  'TRANSMISSORES DE PRESSÃO',
  'INTEGRADOR DE CORRENTE',
  'CONTROLADORES DE PROCESSOS',
  'CONTROLADORES DE TEMPERATURA',
  'CONTROLADORES DE POTÊNCIA',
  'RELÉS DE ESTADO SÓLIDO',
  'DISSIPADOR DE CALOR',
  'CÂMERAS TERMOGRÁFICAS FIXAS OPTRIS',
  'PIRÔMETROS INFRAVERMELHOS FIXOS OPTRIS',
  'PIRÔMETROS INFRAVERMELHOS PORTÁTEIS OPTRIS',
  'TERMORRESISTÊNCIAS',
  'TERMOPARES',
  'SENSORES PT100',
  'SENSORES PT1000',
  'CABOS PARA TERMOPARES',
  'SOFTWARE - CONTEMP CONECCT',
  'SOFTWARE - CONTEMP BRIDGE',
  'SOFTWARE - CONTEMP TOOLS'
]
