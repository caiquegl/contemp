import { Footer } from '../../components/Footer'
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
  IconButton,
} from '@chakra-ui/react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import DefaultImg from '../../assets/images/image-default.webp'
import { v4 as uuidv4 } from 'uuid'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper'
import ReactHtmlParser from 'react-html-parser'
import { Contact } from '../../components/Contact'
import { Player } from '../../components/Player'
import { pxToRem } from '../../utils/pxToRem'
import CardProductWithDescription from '../../components/CardProductWithDescription'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { initFirebase } from '../../utils/db'
import { useAuth } from '../../contextAuth/authContext'
import Head from 'next/head'
import { Breadcrumb, Slider } from 'antd'
import { customSwiperBullets } from '../../utils/customSwiperBullets'
import { SmoothScroll } from '../../components/SmoothScroll'
import Image from 'next/image'
import NextLink from 'next/link'
import { decodeName } from '../../utils/replaceNameToUrl'
import { api } from '../../lib/axios'
import { FiShare2 } from "react-icons/fi";
import { BsWhatsapp, BsQrCode } from "react-icons/bs";

const Product = () => {
  const router = useRouter()
  initFirebase()
  const toast = useToast()
  const { addCart } = useAuth()

  const { product } = router.query
  const [detail, setDetail] = useState<any>({})
  const [variation, setVariation] = useState<any>({})
  const [bradName, setBradeName] = useState<any>([])
  const [products, setProducts] = useState<any>([])
  const [qtd, setQtd] = useState(1)
  const isTablet = useBreakpointValue({
    base: true,
    lg: false,
  })

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  })

  const getProduct = async () => {
    try {
      let produto = ''
      if (product && typeof product == 'string') produto = decodeName(product).replaceAll('_', ' ').replaceAll('/', '333')
      const { data } = await api.get(`${produto}/getProduct`)

      if (!data.bradName) return router.push('/404')
      setBradeName(data.bradName)

      const changeText = (txt: string) => {
        if (!txt) return
        let val = txt
        val = val.toString().replace('<a', '<a target="_blank"')
        if (val.indexOf(`<figure class=\"media\"><oembed url=`) > -1) {
          val = val.toString().replace('<figure class="media"><oembed url=', '<iframe src=')
          val = val.toString().replace('watch?v=', 'embed/')
          val = val
            .toString()
            .replace(
              '></oembed></figure>',
              'width="560" height="315" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
            )
        }

        let result = txt.substring(0, 2)
        let result2 = txt.substring(0, 5)
        if (result == '<a' || result2 == '<p><a') {
          if (val.indexOf('class=') == -1) {
            val = val.toString().replace('<a', '<a class="editor_button"')
          }
        }

        return val
      }

      setDetail({
        ...data.detail,
        tab: data.detail.tab.map((t: any) => ({
          ...t,
          text: changeText(t.text),
        })),
      })
      setProducts(data.allProducts)
    } catch (e) {
      console.log(e)
    }
  }

  // ...

  const generateBreadcrumbUrl = (index: number) => {
    // Construa a URL com base nas etapas anteriores do Breadcrumb
    const path = bradName.slice(0, index + 1).map((el: string) => el.toLowerCase().replaceAll(' ', '_')).join('/');

    // Adicione o prefixo da categoria principal (ou o caminho da categoria principal, dependendo da sua estrutura de URLs)
    return index === 0 ? `/category/${path}` : `/category/${path.split('/').pop()}`;
  };




  useEffect(() => {
    if (product) {
      getProduct()
    }
  }, [product])

  return (
    <>
      <SmoothScroll>
        {detail && (
          <Head>
            <meta name='description' content={detail.description_seo} />
            <meta property='og:description' content={detail.description_seo} />
            <meta name='keywords' content={detail.key_word_seo} />
            <title>{detail.name}</title>
            <meta property='og:title' content={detail.name} />
            <link rel='icon' href='/favicon.png' />
          </Head>
        )}
        <Box className='container-produto'>
          <Flex className='card-produto-individual'
            maxW={'1240px'}
            m={'auto'}
            mb={'0%'}
            pb={'0%'}
          >
            <Box w='100%' mb='30px'>
              <Breadcrumb>
                {bradName &&
                  bradName.map((el: any, index: number) => (
                    <Fragment key={index}>
                      <Breadcrumb.Item>
                        <NextLink href={generateBreadcrumbUrl(index)} passHref>
                          <a>{el}</a>
                        </NextLink>
                      </Breadcrumb.Item>
                    </Fragment>
                  ))}
              </Breadcrumb>
            </Box>
            <Box w='100%' mb='30px' ml='auto'>
              <Flex>
                <Button
                  rightIcon={<FiShare2 />}
                  ml={'auto'}
                  mr={'1%'}
                  fontSize={'14px !important'}
                  onClick={() => {
                    // Copiar o link para a área de transferência
                    const url = window.location.href;
                    navigator.clipboard.writeText(url);

                    // Exibir uma mensagem de sucesso ou usar o toast
                    toast({
                      title: 'Link copiado com sucesso!',
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    });
                  }}
                >
                  Compartilhar
                </Button>
                <IconButton
                  icon={<BsWhatsapp />}
                  aria-label='Compartilhar no WhatsApp'
                  mr={'1%'}
                  onClick={() => {
                    const productName = detail.name || '';
                    const productDescription = detail.description || '';
                    //const productImage = detail.urls && detail.urls.length > 0 ? detail.urls[0] : '';
                    const url = window.location.href;

                    // Construir a mensagem com o link da imagem
                    const message = `*${productName}*\n\n${productDescription}\n\nAcesse o produto: ${url}`;
                    const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;


                    // Abrir o link no WhatsApp
                    window.open(whatsappLink, '_blank');
                  }}
                >
                </IconButton>
              </Flex>
            </Box>


          </Flex>
          <Flex
            className='card-produto-individual'
            maxW={'1240px'}
            m={'auto'}
            pt={'0%'}
          >
            <Box width={'35%'} p={'0% 2%'}>
              <Center width={'100%'}
                onClick={(evt) => (evt.currentTarget.style.cursor = 'move')}
                className='imagem-produto-individual'
              >
                <Swiper
                  id='unique'
                  initialSlide={0}
                  slidesPerView={1}
                  spaceBetween={30}
                  autoplay={{
                    delay: 2000,
                    pauseOnMouseEnter: true,
                    waitForTransition: true,
                  }}
                  speed={1000}
                  navigation={true}
                  pagination={{ clickable: true }}
                  modules={[Autoplay, Pagination, Navigation]}
                  className='mySwiper'
                >
                  {detail.urls && detail.urls.length > 0 ? (
                    detail.urls.map((photo: any, key: number) => (
                      <SwiperSlide key={key}>
                        <Center h='100%' maxH={pxToRem(765)} width='100%'>
                          <Zoom>
                            <img id='zoom' alt={detail.name ? detail.name : ''} src={photo} width='600' />
                          </Zoom>
                        </Center>
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide>
                      <Center h='100%' maxH={pxToRem(765)} width='100%'>
                        <Image alt={detail.name ? detail.name : ''} src={DefaultImg} width={300} height={300} />
                      </Center>
                    </SwiperSlide>
                  )}
                </Swiper>
              </Center>
            </Box>
            <Box p={'1.5%'} w={'65%'} id='description' className='container-produto-tabs' px='10px'>
              <Box p={'0%'}>
                <Heading as={'h2'} className='titulo-produto-individual'>
                  {detail.name ? detail.name : ''}
                </Heading>
                <Text className='descricao-produto-individual'>
                  <Text as='span' noOfLines={4}>
                    {detail.description ? detail.description : ''}{' '}
                  </Text>
                </Text>
              </Box>
              <Tabs variant='enclosed' maxW='var(--max-tamanho)' w='100%' overflowX='auto'>
                <TabList>
                  {detail.tab &&
                    detail.tab.length > 0 &&
                    detail.tab.map((tab: any, key: number) => (
                      <Tab className='produto-tabs'
                        key={key}
                        _selected={{
                          bg: 'var(--graylight-primary)',
                          color: 'var(--red-primary)',
                          fontWeight: 'bold',
                        }}
                      >
                        {tab.name}
                      </Tab>
                    ))}
                </TabList>
                <TabPanels>
                  {detail.tab &&
                    detail.tab.length > 0 &&
                    detail.tab.map((tab: any, key: number) => (
                      <TabPanel
                        key={key}
                        bg='white.500'
                        color='black.800'
                        p='40px'
                        fontSize={pxToRem(20)}
                        borderBottomRadius='8px'
                        borderTopRightRadius='8px'
                      >
                        {ReactHtmlParser(tab.text)}
                      </TabPanel>
                    ))}
                </TabPanels>
              </Tabs>
            </Box>
          </Flex>


          {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/XxNKL39UnA0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}

          <Flex id='description' className='container-produto-tabs' px='10px'>

          </Flex>
        </Box>
        <Footer />
      </SmoothScroll>
    </>
  )
}

export default Product