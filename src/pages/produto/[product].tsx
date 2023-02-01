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
import { Breadcrumb } from 'antd'
import { customSwiperBullets } from '../../utils/customSwiperBullets'
import { SmoothScroll } from '../../components/SmoothScroll'
import Image from 'next/image'

const Product = () => {
  const router = useRouter()
  initFirebase()
  const toast = useToast()
  const { allCategoryActive, allProductsActive, addCart, allProductsHome } = useAuth()

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
    // try {
    let produto = ''
    if (product && typeof product == 'string') produto = product.replaceAll('_', ' ')
    let ex = allProductsActive.filter((el: any) => el.name == produto)
    if (ex.length == 0) {
      ex = allProductsHome.filter((el: any) => el.name == produto)
    }

    let cg1 = allCategoryActive.filter((el: any) => el.id == ex[0]?.category)

    let cg2 = allCategoryActive.filter((el: any) => el.id == cg1[0]?.sub_categorie)
    let cg3 = allCategoryActive.filter((el: any) => el.id == cg2[0]?.sub_categorie)
    let cg4 = allCategoryActive.filter((el: any) => el.id == cg3[0]?.sub_categorie)

    let id = ''
    let names: any = []
    if (cg1.length > 0) {
      id = cg1[0].id
      names.push(cg1[0].name)
    }
    if (cg2.length > 0) {
      id = cg2[0].id
      names.push(cg2[0].name)
    }
    if (cg3.length > 0) {
      id = cg3[0].id
      names.push(cg3[0].name)
    }
    if (cg4.length > 0) {
      id = cg4[0].id
      names.push(cg4[0].name)
    }
    if (ex.length == 0) return

    let revertNames: any = []

    names.forEach((el: any) => revertNames.unshift(el))

    setBradeName(revertNames)
    setDetail(ex[0])

    let idCategory: any = []

    allCategoryActive.forEach((el: any) => {
      if (el.id == id) {
        idCategory.push(el.id)
        allCategoryActive.forEach((el2: any) => {
          if (el2.sub_categorie && el2.sub_categorie == el.id) {
            idCategory.push(el2.id)
            allCategoryActive.forEach((el3: any) => {
              if (el3.sub_categorie && el3.sub_categorie == el2.id) {
                idCategory.push(el3.id)
              }
            })
          }
        })
      }
    })

    let list: any = []

    if (idCategory.length > 0) {
      allProductsActive.forEach((el: any) => {
        idCategory.forEach((ct: any) => {
          if (el.category == ct) list.push(el)
        })
      })
    }
    setProducts(list)
  }

  useEffect(() => {
    if (product) {
      getProduct()
    }
  }, [allCategoryActive, allProductsActive, product, allProductsHome])

  return (
    <>
      <SmoothScroll>
        {detail && (
          <Head>
            <meta name='description' content={detail.description_seo} />
            <meta name='keywords' content={detail.key_word_seo} />
            <title>Contemp</title>
            <link rel='icon' href='/favicon.png' />
          </Head>
        )}
        <Flex
          p='10px'
          pt='60px'
          bg='white'
          w='100%'
          h='100%'
          alignItems='flex-start'
          flexDirection={['column', 'column', 'column', 'row', 'row']}
        >
          <Center
            bg='white.500'
            w={{ base: '100%', lg: '40%' }}
            h={['350px', '804px']}
            onClick={(evt) => (evt.currentTarget.style.cursor = 'move')}
          >
            <Swiper
              initialSlide={0}
              slidesPerView={1}
              spaceBetween={30}
              autoplay={{
                delay: 2000,
                pauseOnMouseEnter: true,
                waitForTransition: true,
              }}
              speed={1000}
              pagination={true}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className='mySwiper'
            >
              {detail.urls && detail.urls.length > 0 ? (
                detail.urls.map((photo: any, key: number) => (
                  <SwiperSlide key={uuidv4()}>
                    <Center h='100%' maxH={pxToRem(765)} width='100%'>
                      <Zoom>
                        <img id="zoom" alt={detail.name ? detail.name : ''} src={photo} width='600' />
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
                {bradName.map((el: any, index: number) => (
                  <Fragment key={uuidv4()}>
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
            <Text fontWeight='bold' fontSize='35px' color='black.800' mb='30px'>
              {detail.name ? detail.name : ''}
            </Text>
            <Text color='black.800' fontSize='20px' maxW='829px' mb='30px'>
              <Text as='span' noOfLines={4}>
                {detail.description ? detail.description : ''}{' '}
              </Text>
              {detail.description ? detail.description.length > 300 : '...'}{' '}
              <Link href='#description' _hover={{ textDecoration: 'none' }}>
                <Text as='span' color='red.600' cursor='pointer'>
                  veja descrição completa +
                </Text>
              </Link>
            </Text>
            <VStack spacing='30px'>
              {detail.hasVariation &&
                detail.listVariation &&
                detail.listVariation.length > 0 &&
                detail.listVariation.map((vr: any, key: number) => (
                  <Flex
                    key={uuidv4()}
                    w='100%'
                    alignItems={['flex-start', 'center']}
                    justifyContent='space-between'
                    direction={['column', 'row']}
                  >
                    <Text fontWeight='bold' fontSize='20px' color='black.800'>
                      {vr.name}
                    </Text>
                    <InputGroup
                      borderRadius='6px'
                      bg='white.500'
                      p='3px 7px'
                      w='100%'
                      maxW='358px'
                      h='50'
                      outline='none'
                      border='none'
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                    >
                      <Select
                        w='100%'
                        height='100%'
                        border='none'
                        borderRadius='21px'
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
                            <option value={opt} key={uuidv4()}>
                              {opt}
                            </option>
                          ))}
                      </Select>
                    </InputGroup>
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
                  <Text color='black.800' fontWeight='bold' fontSize={pxToRem(20)} margin='auto'>
                    Quantidade
                  </Text>
                  <Input
                    type='number'
                    w='auto'
                    margin='auto'
                    color='black.800'
                    defaultValue='1'
                    border='1px solid'
                    borderColor='black.800'
                    borderRadius='25px'
                    maxW='89px'
                    value={qtd}
                    onChange={(evt: any) => setQtd(parseFloat(evt.target.value))}
                  />
                  <Button
                    h='50px'
                    bg='red.600'
                    border='none'
                    color='#fff'
                    borderRadius='25px'
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

        <Flex id='description' justifyContent='center' w='100%' bg='white' pt='111px' px='10px'>
          <Tabs variant='enclosed' maxW='1386px' w='100%' overflowX='auto'>
            <TabList>
              {detail.tab &&
                detail.tab.length > 0 &&
                detail.tab.map((tab: any, key: number) => (
                  <Tab
                    key={uuidv4()}
                    _selected={{
                      bg: 'white.500',
                      color: 'red.600',
                      fontWeight: 'bold',
                    }}
                    w='100%'
                    maxW='211px'
                    color='black.800'
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
                    key={uuidv4()}
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
        <Flex w='100%' alignItems='center' bg='white' p={['0 20px', '0 20px', '0 20px', '0 20px', '0 20px']}>
          <Container maxW='7xl' p='80px 0'>
            <Flex alignItems='center' mb='40px'>
              <Text color='black.800' fontSize={{ base: pxToRem(35), lg: pxToRem(45) }} fontWeight='bold' ml='15px'>
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
                {products.map((item: any, key: number) => (
                  <SwiperSlide key={uuidv4()}>
                    <CardProductWithDescription
                      img={item.urls && item.urls.length > 0 ? item.urls[0] : ''}
                      text={item.name}
                      description={item.description}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Flex>
          </Container>
        </Flex>
        <Player />
        <Contact
          id='duvidas-e-orcamentos'
          title='DÚVIDAS E ORÇAMENTOS'
          description='Essa é a seleção que a equipe da Contemp escolheu como os
              destaques do mês'
          form={[
            {
              name: 'Nome',
              type: 'text',
            },
            {
              name: 'E-mail',
              type: 'text',
            },
            {
              name: 'Empresa',
              type: 'text',
            },
            {
              name: 'Telefone',
              type: 'text',
            },
            {
              name: 'Mensagem',
              type: 'textArea',
            },
          ]}
        />
        <Footer />
      </SmoothScroll>
    </>
  )
}

export default Product
