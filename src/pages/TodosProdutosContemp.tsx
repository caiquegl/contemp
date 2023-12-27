import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Input,
  InputGroup,
  Link,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useBreakpointValue,
  useToast,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  Textarea,
  Heading,
  SimpleGrid,
  Image
} from '@chakra-ui/react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import DefaultImg from '../assets/images/image-default.webp'
import { v4 as uuidv4 } from 'uuid'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper'
import ReactHtmlParser from 'react-html-parser'
import { Contact } from '../components/Contact'
import { Player } from '../components/Player'
import { pxToRem } from '../utils/pxToRem'
import CardProductWithDescription3 from '../components/CardProductWithDescription3'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { initFirebase } from '../utils/db'
import { useAuth } from '../contextAuth/authContext'
import Head from 'next/head'
import { Breadcrumb, Slider } from 'antd'
import { customSwiperBullets } from '../utils/customSwiperBullets'
//import { SmoothScroll } from '../components/SmoothScroll'
import NextLink from 'next/link'
import { decodeName } from '../utils/replaceNameToUrl'
import { api } from '../lib/axios'
import { ListAllProducts } from '../components/ListAllProducts'

const TodosProdutosContemp = () => {

  return (
    <>
      <Head>
        <meta name='description' content='' />
        <meta property='og:description' content='' />
        <meta name='keywords' content='' />
        <title>Todos os Produtos - Contemp</title>
        <meta property='og:title' content='' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <Header />
      <Flex w='100%' alignItems='center' justifyContent='center' direction='column' h='90px'>
        <Heading as={'h2'} className='sobre-titulo negrito text-white'>
          Todos os Produtos
        </Heading>
      </Flex>
      <Box className='container-produto'>
        <Box className='card-produto-individual'
          maxW={'1240px'}
          m={'auto'}>
        <SimpleGrid columns={4} spacingX='40px' spacingY='20px'>
            <Box className='card-todososprodutos'>
              <Image
              alt={'nome-do-produto'}
              src={'https://contemp.com.br/api/arquivos/imagedefault.webp'}
              objectFit={'cover'}
              className='imagem-card-todososprodutos'
              />
              <Heading as={'h2'} className='titulo-card-todososprodutos'>Nome do Produto</Heading>
            </Box>
          </SimpleGrid>
          </Box>
      </Box>
      <Footer />
    </>
  )
}

export default TodosProdutosContemp