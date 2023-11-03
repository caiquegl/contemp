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
import { decodeName } from '../../utils/replaceNameToUrl'
import { api } from '../../lib/axios'

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
            <meta name='keywords' content={detail.key_word_seo} />
            <title>{detail.name}</title>
            <link rel='icon' href='/favicon.png' />
          </Head>
        )}
        <Box className='container-produto'>
        <Flex
          className='card-produto-individual'
          maxW={'1240px'}
          m={'auto'}
        >
          <Center
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

          <Box m={`${pxToRem(10)} auto`} ml={{ lg: 20 }}>
            <Box w='100%' mb='30px'>
              <Breadcrumb>
                {bradName &&
                  bradName.map((el: any, index: number) => (
                    <Fragment key={index}>
                      {index == bradName.length - 1 && <Breadcrumb.Item>{el}</Breadcrumb.Item>}
                      {index != bradName.length - 1 && (
                        <Breadcrumb.Item>
                          <a href={`/category/${el.replaceAll(' ', '_')}#viewCategory`}>{el}</a>
                        </Breadcrumb.Item>
                      )}
                    </Fragment>
                  ))}
              </Breadcrumb>
            </Box>

            <Text className='titulo-produto-individual'>
              {detail.name ? detail.name : ''}
            </Text>
            <Text className='descricao-produto-individual'>
              <Text as='span' noOfLines={4}>
                {detail.description ? detail.description : ''}{' '}
              </Text>
              {detail.description ? detail.description.length > 300 : '...'}{' '}
              <Link href='#description' _hover={{ textDecoration: 'none' }}>
                <Text as='span' className='link-descricao-produto-individual'>
                  veja descrição completa +
                </Text>
              </Link>
            </Text>

            <VStack spacing='20px'>
              {detail.hasVariation &&
                detail.listVariation &&
                Array.isArray(detail.listVariation) &&
                detail.listVariation.map((vr: any, key: number) => (
                  <Flex
                    key={key}
                    w='100%'
                    alignItems={['flex-start', 'center']}
                    justifyContent='space-between'
                    direction={['column', 'row']}
                  >
                    <Text className='variacao-titulo'>
                      {vr.name}
                    </Text>
                    {vr.type_view && vr.type_view == 'Range' && (
                      <Box className='variacao-opcoes'>
                        <Slider
                          value={variation[vr.name] ? variation[vr.name] : undefined}
                          onChange={(value) =>
                            setVariation({
                              ...variation,
                              [vr.name]: value,
                            })
                          }
                          trackStyle={{
                            backgroundColor: '#B60005',
                          }}
                          handleStyle={{
                            backgroundColor: '#B60005',
                            borderColor: '#fff',
                          }}
                          style={{ width: '100%', marginRight: 10 }}
                          min={vr.min_value ? parseInt(vr.min_value) : 0}
                          max={vr.max_value ? parseInt(vr.max_value) : 1000}
                          tooltip={{ open: true }}
                        />
                        {vr.min_value || vr.max_value ? (
                          <Flex alignItems='center' justifyContent='space-between' mb='10px'>
                            {vr.min_value && (
                              <Text fontSize='13px' color='black.800'>
                                Valor mín. {vr.min_value}
                              </Text>
                            )}
                            {vr.max_value && (
                              <Text fontSize='13px' color='black.800'>
                                Valor max. {vr.max_value}
                              </Text>
                            )}
                          </Flex>
                        ) : null}
                      </Box>
                    )}
                    {vr.type_view}
                      {vr.type_view && vr.type_view == 'numerico' && (
                      <Box className='variacao-opcoes'>
                        <Input
                          defaultValue={variation[vr.name] || ''}
                          placeholder={vr.placeholder_name || 'Selecione uma opção'}
                          maxLength={100}
                          className='variacao-input-select'
                          onKeyPress={(e) => {
                            const allowedChars = /[0-9]|Backspace/;
                            if (!allowedChars.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          onBlur={(e) => {
                            const newValue = e.target.value.slice(0, 100);
                            setVariation({
                              ...variation,
                              [vr.name]: newValue
                            })
                          }}
/>                      
                      </Box>
                    )}
                      {vr.type_view && vr.type_view == 'Number' && (
                      <InputGroup className='variacao-grupo'>
                        <Select
                          placeholder='Selecione uma opção'
                          className='variacao-input-select'                        
                          value={variation[vr.name] ? variation[vr.name] : undefined}
                          onChange={(evt) =>
                            setVariation({
                              ...variation,
                              [vr.name]: evt.target.value,
                            })
                          }
                          _placeholder={{
                            color: 'black.50',
                          }}
                          _focusVisible={{
                            outline: 'none',
                          }}
                        >
                          {vr.opt &&
                            vr.opt.length > 0 &&
                            vr.opt.map((opt: any, key: number) => (
                              <option value={opt} key={key}>
                                {opt}
                              </option>
                            ))}
                        </Select>
                      </InputGroup>
                    )}
                    {vr.opt && !vr.type_view && Array.isArray(vr.opt) && vr.opt.length > 0 &&   (
                      <InputGroup className='variacao-grupo'>
                        <Select className='variacao-input-select'
                          placeholder='Selecione uma opção'
                          color='black.800'
                          value={variation[vr.name] ? variation[vr.name] : undefined}
                          onChange={(evt) =>
                            setVariation({
                              ...variation,
                              [vr.name]: evt.target.value,
                            })
                          }
                          _placeholder={{
                            color: 'black.50',
                          }}
                          _focusVisible={{
                            outline: 'none',
                          }}
                        >
                          {vr.opt &&
                            vr.opt.length > 0 &&
                            vr.opt.map((opt: any, key: number) => (
                              <option value={opt} key={key}>
                                {opt}
                              </option>
                            ))}
                        </Select>
                      </InputGroup>
                    )}
                    {vr.type_view && vr.type_view == 'Texto_curto' && (
                      <Box className='variacao-opcoes' mt={'0px'}>
                        <Input
                        className='variacao-input'
                          defaultValue={variation[vr.name] || ''}
                          placeholder={vr.placeholder_name || 'Selecione uma opção'}
                          color='black.800'
                          maxLength={100}
                          onBlur={(e) => {
                            const newValue = e.target.value.slice(0, 100);
                            setVariation({
                              ...variation,
                              [vr.name]: newValue
                            })
                          }}

                        />
                      </Box>
                    )}
                    {vr.type_view && vr.type_view == 'Texto_longo' && (
                      <Box className='variacao-opcoes' mt={'0'}>
                        <Textarea
                          className='variacao-input-textarea'
                          defaultValue={variation[vr.name] || ''}
                          placeholder={vr.placeholder_name || 'Selecione uma opção'}
                          color='black.800'
                          maxLength={1500}
                          onBlur={(e) => {
                            const newValue = e.target.value.slice(0, 1500);
                            setVariation({
                              ...variation,
                              [vr.name]: newValue
                            })
                          }}

                        />
                      </Box>
                    )}
                  </Flex>
                ))}
            </VStack>
            <Flex alignItems='center' justifyContent='flex-end'>
              <Flex bg='white.500' maxW='536px' borderRadius='8px' p='15px' mt='30px'>
                <Flex
                  gap={pxToRem(20)}
                  flexWrap={{
                    base: 'wrap',
                    lg: 'nowrap',
                  }}
                  justifyContent={{ base: 'center', lg: 'auto' }}
                >
                  <Text className='quantidade' margin='auto'>
                    Quantidade
                  </Text>
                  <NumberInput
                    defaultValue='1'
                    className='quantidade-input'
                    value={qtd}
                    onChange={(evt: any) => {
                      setQtd(parseInt(evt))
                    }}
                  >
                    <NumberInputField
                      borderRadius='8px'
                      border='none'
                      _hover={{ border: 'none' }}
                      _active={{ border: 'none' }}
                      _focus={{ border: 'none' }}
                      outline='none'
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <Button
                    className='botao-vermelho'
                    mt={'0  !important'}
                    maxW={pxToRem(279)}
                    w='100%'
                    onClick={() => {
                      addCart({
                        product_id: detail.id,
                        variation: variation,
                        qtd,
                      })
                      toast({
                        title: 'Sucesso',
                        description: 'Produto adicionado com sucesso.',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                      })
                    }}
                  >
                    <Center>Adicionar ao orçamento</Center>
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </Flex>
        

        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/XxNKL39UnA0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}

        <Flex id='description' className='container-produto-tabs' px='10px'>
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
        </Flex>
        </Box>
        {/* CARROSSEL TEM NA CONTEMP */}
        {/* <Flex w='100%' alignItems='center' bg='white' p={['0 20px', '0 20px', '0 20px', '0 20px', '0 20px']}>
          <Container maxW='7xl' p='80px 0'>
            <Flex alignItems='center' mb={'-5%'}>
              <Text color='black.800' fontSize={'2rem'} fontWeight='bold' ml='15px'>
                #temnacontemp
              </Text>
            </Flex>
            <Flex alignItems='center' h={pxToRem(970)} mt='31px'>
              <Swiper
                slidesPerView={isMobile ? 1 : isTablet ? 2 : 3}
                spaceBetween={30}
                autoplay={{
                  delay: 2000,
                  pauseOnMouseEnter: true,
                }}
                pagination={{
                  enabled: true,
                  clickable: true,
                  renderBullet: customSwiperBullets,
                }}
                modules={[Autoplay, Pagination]}
                className='mySwiper'
                speed={1000}
              >
                {products.sort((a: any, b: any) => {
                  let aOrder = a.order || 999999
                  let bOrder = b.order || 999999
                  return aOrder - bOrder

                }).map((item: any, key: number) => (
                  <SwiperSlide key={key}>
                    <CardProductWithDescription
                      img={item.urls && item.urls.length > 0 ? item.urls[0] : ''}
                      text={item.name}
                      description={item.description}
                      call_product={item.call_product}
                      ocultBottom={true}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Flex>
          </Container>
        </Flex>*/}
        {/* <Player /> */}
        <Footer />
      </SmoothScroll>
    </>
  )
}

export default Product
