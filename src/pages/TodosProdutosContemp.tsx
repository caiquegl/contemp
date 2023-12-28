import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { SearchBar } from '../components/SearchBar'
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
  Image,
  transform
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
      <Box backgroundColor={'var(--graylight-primary)'}>
      <Flex maxWidth={'1240px'} p={'0 15px'} m={'auto'} alignItems='center' justifyContent='space-between' direction='row' h='90px' gap={'3'}>
        <Heading as={'h2'} className='sobre-titulo negrito text-white' mb={'0%'} color={'var(--black-primary)'}>
          Todos os Produtos
        </Heading>
        <SearchBar
            inputProps={{
              placeholder: 'Procure aqui seu produto...',
            }}
            containerProps={{
              bg: 'var(--gray-text)',
            }}
            searchCard='100%'
          />
      </Flex>
      </Box>
      <Flex className='container-produto'>
        <Flex
        maxW={'1240px'}
          m={'auto'}>
        <Box className='card-produto-individual' w={'100%'}>
          <SimpleGrid columns={4} spacingX='20px' spacingY='20px'>
            <Box className='card-todososprodutos'
            cursor={'pointer'}>
              <Flex w={'100%'} gap='2'>
                <Box w={'25%'}>
              <Image
                alt={'nome-do-produto'}
                src={'https://contemp.com.br/api/arquivos/imagedefault.webp'}
                objectFit={'cover'}
                className='imagem-card-todososprodutos'
                cursor={'pointer'}
                _hover={{
                  transform: 'scale(1.5)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
              </Box>
                <Box w={'75%'} >
              <Heading as={'h2'} className='titulo-card-todososprodutos'>Nome do Produto Completo c/ mais de duas linhas</Heading>
              </Box>
              </Flex>
            </Box>
            <Box className='card-todososprodutos'
            cursor={'pointer'}>
              <Flex w={'100%'} gap='2'>
                <Box w={'25%'}>
              <Image
                alt={'nome-do-produto'}
                src={'https://contemp.com.br/api/arquivos/imagedefault.webp'}
                objectFit={'cover'}
                className='imagem-card-todososprodutos'
                cursor={'pointer'}
                _hover={{
                  transform: 'scale(1.5)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
              </Box>
                <Box w={'75%'} >
              <Heading as={'h2'} className='titulo-card-todososprodutos'>Nome do Produto Completo c/ mais de duas linhas</Heading>
              </Box>
              </Flex>
            </Box>
            <Box className='card-todososprodutos'
            cursor={'pointer'}>
              <Flex w={'100%'} gap='2'>
                <Box w={'25%'}>
              <Image
                alt={'nome-do-produto'}
                src={'https://contemp.com.br/api/arquivos/imagedefault.webp'}
                objectFit={'cover'}
                className='imagem-card-todososprodutos'
                cursor={'pointer'}
                _hover={{
                  transform: 'scale(1.5)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
              </Box>
                <Box w={'75%'} >
              <Heading as={'h2'} className='titulo-card-todososprodutos'>Nome do Produto Completo c/ mais de duas linhas</Heading>
              </Box>
              </Flex>
            </Box>
            <Box className='card-todososprodutos'
            cursor={'pointer'}>
              <Flex w={'100%'} gap='2'>
                <Box w={'25%'}>
              <Image
                alt={'nome-do-produto'}
                src={'https://contemp.com.br/api/arquivos/imagedefault.webp'}
                objectFit={'cover'}
                className='imagem-card-todososprodutos'
                cursor={'pointer'}
                _hover={{
                  transform: 'scale(1.5)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
              </Box>
                <Box w={'75%'} >
              <Heading as={'h2'} className='titulo-card-todososprodutos'>Nome do Produto Completo c/ mais de duas linhas</Heading>
              </Box>
              </Flex>
            </Box>
            <Box className='card-todososprodutos'
            cursor={'pointer'}>
              <Flex w={'100%'} gap='2'>
                <Box w={'25%'}>
              <Image
                alt={'nome-do-produto'}
                src={'https://contemp.com.br/api/arquivos/imagedefault.webp'}
                objectFit={'cover'}
                className='imagem-card-todososprodutos'
                cursor={'pointer'}
                _hover={{
                  transform: 'scale(1.5)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
              </Box>
                <Box w={'75%'} >
              <Heading as={'h2'} className='titulo-card-todososprodutos'>Nome do Produto Completo c/ mais de duas linhas</Heading>
              </Box>
              </Flex>
            </Box>
            <Box className='card-todososprodutos'
            cursor={'pointer'}>
              <Flex w={'100%'} gap='2'>
                <Box w={'25%'}>
              <Image
                alt={'nome-do-produto'}
                src={'https://contemp.com.br/api/arquivos/imagedefault.webp'}
                objectFit={'cover'}
                className='imagem-card-todososprodutos'
                cursor={'pointer'}
                _hover={{
                  transform: 'scale(1.5)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
              </Box>
                <Box w={'75%'} >
              <Heading as={'h2'} className='titulo-card-todososprodutos'>Nome do Produto Completo c/ mais de duas linhas</Heading>
              </Box>
              </Flex>
            </Box>
            <Box className='card-todososprodutos'
            cursor={'pointer'}>
              <Flex w={'100%'} gap='2'>
                <Box w={'25%'}>
              <Image
                alt={'nome-do-produto'}
                src={'https://contemp.com.br/api/arquivos/imagedefault.webp'}
                objectFit={'cover'}
                className='imagem-card-todososprodutos'
                cursor={'pointer'}
                _hover={{
                  transform: 'scale(1.5)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
              </Box>
                <Box w={'75%'} >
              <Heading as={'h2'} className='titulo-card-todososprodutos'>Nome do Produto Completo c/ mais de duas linhas</Heading>
              </Box>
              </Flex>
            </Box>
            <Box className='card-todososprodutos'
            cursor={'pointer'}>
              <Flex w={'100%'} gap='2'>
                <Box w={'25%'}>
              <Image
                alt={'nome-do-produto'}
                src={'https://contemp.com.br/api/arquivos/imagedefault.webp'}
                objectFit={'cover'}
                className='imagem-card-todososprodutos'
                cursor={'pointer'}
                _hover={{
                  transform: 'scale(1.5)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
              </Box>
                <Box w={'75%'} >
              <Heading as={'h2'} className='titulo-card-todososprodutos'>Nome do Produto Completo c/ mais de duas linhas</Heading>
              </Box>
              </Flex>
            </Box>
            <Box className='card-todososprodutos'
            cursor={'pointer'}>
              <Flex w={'100%'} gap='2'>
                <Box w={'25%'}>
              <Image
                alt={'nome-do-produto'}
                src={'https://contemp.com.br/api/arquivos/imagedefault.webp'}
                objectFit={'cover'}
                className='imagem-card-todososprodutos'
                cursor={'pointer'}
                _hover={{
                  transform: 'scale(1.5)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
              </Box>
                <Box w={'75%'} >
              <Heading as={'h2'} className='titulo-card-todososprodutos'>Nome do Produto Completo c/ mais de duas linhas</Heading>
              </Box>
              </Flex>
            </Box>
            <Box className='card-todososprodutos'
            cursor={'pointer'}>
              <Flex w={'100%'} gap='2'>
                <Box w={'25%'}>
              <Image
                alt={'nome-do-produto'}
                src={'https://contemp.com.br/api/arquivos/imagedefault.webp'}
                objectFit={'cover'}
                className='imagem-card-todososprodutos'
                cursor={'pointer'}
                _hover={{
                  transform: 'scale(1.5)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
              </Box>
                <Box w={'75%'} >
              <Heading as={'h2'} className='titulo-card-todososprodutos'>Nome do Produto Completo c/ mais de duas linhas</Heading>
              </Box>
              </Flex>
            </Box>
            <Box className='card-todososprodutos'
            cursor={'pointer'}>
              <Flex w={'100%'} gap='2'>
                <Box w={'25%'}>
              <Image
                alt={'nome-do-produto'}
                src={'https://contemp.com.br/api/arquivos/imagedefault.webp'}
                objectFit={'cover'}
                className='imagem-card-todososprodutos'
                cursor={'pointer'}
                _hover={{
                  transform: 'scale(1.5)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
              </Box>
                <Box w={'75%'} >
              <Heading as={'h2'} className='titulo-card-todososprodutos'>Nome do Produto Completo c/ mais de duas linhas</Heading>
              </Box>
              </Flex>
            </Box>
            <Box className='card-todososprodutos'
            cursor={'pointer'}>
              <Flex w={'100%'} gap='2'>
                <Box w={'25%'}>
              <Image
                alt={'nome-do-produto'}
                src={'https://contemp.com.br/api/arquivos/imagedefault.webp'}
                objectFit={'cover'}
                className='imagem-card-todososprodutos'
                cursor={'pointer'}
                _hover={{
                  transform: 'scale(1.5)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
              </Box>
                <Box w={'75%'} >
              <Heading as={'h2'} className='titulo-card-todososprodutos'>Nome do Produto Completo c/ mais de duas linhas</Heading>
              </Box>
              </Flex>
            </Box>
            
          </SimpleGrid>
        </Box>
        </Flex>
      </Flex>
      <Footer />
    </>
  )
}

export default TodosProdutosContemp