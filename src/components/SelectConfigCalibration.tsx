import { Box, Flex, Text, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const SelectConfigCalibration = () => {
  const [text, setText] = useState({
    title: 'Calibrações de Termometria',
    description: [
      'Registradores',
      'Controladores',
      'Indicadores',
      'Sensores e Cabos',
      'Aquisitores de dados',
      'Termômetros de Líquido em vidro',
      'Termohigrômetros',
      'Termohigrógrafos',
      'Termômetros infravermelhos',
    ],
    index: 1,
  })
  return (
    <Flex w='100%' justifyContent='center' flexDirection={['column', 'column', 'row', 'row', 'row']} mt='30px'>
      <Box>
        <Flex
          p='16px 20px'
          fontSize='20px'
          justifyContent='flex-end'
          borderLeftRadius='5px'
          textAlign='end'
          color={text.index == 1 ? 'red.600' : 'black.800'}
          maxW='367px'
          w='100%'
          bg={text.index == 1 ? 'white.500' : 'white'}
          minH='57px'
          fontWeight={text.index == 1 ? 'bold' : 'normal'}
          onMouseEnter={() =>
            setText({
              title: 'Calibrações de Termometria',
              description: [
                '•	Registradores',
                '•	Controladores',
                '•	Indicadores',
                '•	Sensores e Cabos',
                '•	Aquisitores de dados',
                '•	Termômetros de Líquido em vidro',
                '•	Termohigrômetros',
                '•	Termohigrógrafos',
                '•	Termômetros infravermelhos',
              ],
              index: 1,
            })
          }
          alignItems='center'
          _hover={{
            transition: 'all 0.4s',
            bg: 'white.500',
            color: 'red.600',
            fontWeight: 'bold',
          }}
        >
          <Heading as={'h3'} className="suporte-titulotab" cursor={'pointer'}>Calibrações de Termometria</Heading>
        </Flex>
        <Flex
          p='16px 20px'
          fontSize='20px'
          justifyContent='flex-end'
          borderLeftRadius='5px'
          textAlign='end'
          color='black.800'
          maxW='367px'
          w='100%'
          minH='57px'
          alignItems='center'
          onMouseEnter={() =>
            setText({
              title: 'Calibrações Dimensionais',
              description: [
                '•	Blocos – padrão',
                '•	Calibradores anel liso',
                '•	Calibradores de torquímetro',
                '•	Calibradores tampão liso',
                '•	Calibradores de folga e raio',
                '•	Comparador de diâmetro interno (súbito)',
                '•	Desempenos',
                '•	Dinamômetros',
                '•	Durômetros Brinell',
                '•	Durômetros Rockwell',
                '•	Durômetros Shore',
                '•	Durômetros Vickers',
                '•	Esquadros',
                '•	Goniômetros',
                '•	Máquinas de ensaio de impacto',
                '•	Máquinas de ensaio de tração e compressão',
                '•	Medidores de altura',
                '•	Medidores de espessura',
                '•	Micrômetros',
                '•	Micrômetros internos (imicros)',
                '•	Microscópio',
                '•	Níveis',
                '•	Paquímetros',
                '•	Peneiras granulométricas',
                '•	Projetores de perfil',
                '•	Réguas graduadas',
                '•	Relógios apalpadores',
                '•	Relógios comparadores',
                '•	Torquímetros',
                '•	Transferidores de ângulo',
                '•	Trenas',
              ],
              index: 2,
            })
          }
          _hover={{
            transition: 'all 0.4s',
            bg: 'white.500',
            color: 'red.600',
            fontWeight: 'bold',
          }}
        >
          <Heading as={'h3'} className="suporte-titulotab" cursor={'pointer'}>Calibrações Dimensionais</Heading>
        </Flex>
        <Flex
          p='16px 20px'
          fontSize='20px'
          justifyContent='flex-end'
          borderLeftRadius='5px'
          textAlign='end'
          color='black.800'
          maxW='367px'
          w='100%'
          minH='57px'
          alignItems='center'
          onMouseEnter={() =>
            setText({
              title: 'Calibrações de Processos',
              description: [
                '•	Manômetros',
                '•	Vacuômetros',
                '•	Transdutores',
                '•	Tensão Contínua',
                '•	Tensão Alternada',
                '•	Corrente Alternada',
                '•	Corrente Contínua',
                '•	Cronômetros',
                '•	Temporizador',
                '•	Contadores',
                '•	Medidores De Ph',
                '•	Medidores De Condutividade',
                '•	Vidrarias',
                '•	Balanças Em Geral',
              ],
              index: 3,
            })
          }
          _hover={{
            transition: 'all 0.4s',
            bg: 'white.500',
            color: 'red.600',
            fontWeight: 'bold',
          }}
        >
          <Heading as={'h3'} className="suporte-titulotab" cursor={'pointer'}>Calibrações de Processos</Heading>
        </Flex>
      </Box>

      <Box w='100%' minH='563px' borderRightRadius='5px' bg='white.500' p='58px'>
        {text.title && (
          <>
            <Heading as={'h2'} className="suporte-subtitulo negrito text-red" mb='10px'>
              {text.title}
            </Heading>
            {text.description.length > 0 &&
              text.description.map((value, index) => (
                <Text className="paragrafo-preto text-black" mb='10px' key={index}>
                  {value}
                </Text>
              ))}
          </>
        )}
      </Box>
    </Flex>
  )
}
