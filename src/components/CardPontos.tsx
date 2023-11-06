'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { ReactElement } from 'react'
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
} from 'react-icons/fc'

import { HiOutlineDocumentText, HiOutlineVideoCamera } from "react-icons/hi";
import { FiInstagram, FiFolder } from "react-icons/fi";



interface CardProps {
  heading: string
  description: string
  icon: ReactElement
  href: string
}

const Card = ({ heading, description, icon, href }: CardProps) => {
  return (
    <Box
      maxW={{ base: 'full', md: '290px' }}
      w={'full'}
      borderWidth="2px"
      borderRadius="8px"
      overflow="hidden"
      p={5}>
      <Stack align={'start'} spacing={2}>
        <Flex verticalAlign={'middle'}>
        <Flex
          align={'center'}
          justify={'center'}
          color={'var(--black-primary)'}
          rounded={'8px'}
          mr={'4%'}
          verticalAlign={'middle'}
          bg={useColorModeValue('var(--white-primary)', 'gray.700')}
          p={['2%', '3%']}>
          {icon}
        </Flex>
        <Box>
        <Box>
          <Heading as={'h3'} className='pontos-titulo text-white'>{heading}</Heading>          
        </Box> 
        </Box>
        </Flex>
        <Box>
        <Text mt={1} className='paragrafo-branco' lineHeight={'1rem'}>
            {description}
          </Text>
          <Button variant={'link'} color={'var(--red-primary)'} className='negrito' size={'sm'}textDecoration={'none !important'} mt={'2%'}>
          Acessar
        </Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default function gridListWith() {
  return (
    <Box p={4}>
      <Container maxW={'1240px'} mt={'2%'} p={'0'}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={"Manual Controlador de Temperatura C714"}
            icon={<Icon as={HiOutlineDocumentText} w={6} h={6} />}
            description={'Baixe o manual acessando o link.'}
            href={'#'}
          />
          <Card
            heading={'Câmera Termográfica CsVision'}
            icon={<Icon as={HiOutlineVideoCamera} w={6} h={6} />}
            description={'Acesse e saiba mais detalhes.'}
            href={'#'}
          />
          <Card
            heading={'Padrões de Laboratório'}
            icon={<Icon as={FiFolder} w={6} h={6} />}
            description={'Confira através do link.'}
            href={'#'}
          />
          <Card
            heading={'Nos siga no Instagram'}
            icon={<Icon as={FiInstagram} w={6} h={6} />}
            description={'Conheça o instagram da Contemp.'}
            href={'#'}
          />
        </Flex>
      </Container>
    </Box>
  )
}