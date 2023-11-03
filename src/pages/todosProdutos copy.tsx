import { Box, Container, Flex, Grid, Text, useBreakpointValue, Heading } from '@chakra-ui/react'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { Player } from '../components/Player'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper'
import CardProductWithDescription from '../components/CardProductWithDescription'
import CardCatalog from '../components/CardCatalog'
import { pxToRem } from '../utils/pxToRem'
import { SmoothScroll } from '../components/SmoothScroll'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { AdBanners } from '../components/AdBanners'
import { customSwiperBullets } from '../utils/customSwiperBullets'
import { v4 as uuidv4 } from 'uuid'
import { api } from '../lib/axios'

const AllProduct = () => {
  const [favorites, setFavorites] = useState<any>([])
  const [categories, setCategories] = useState<any>([])

  const isTablet = useBreakpointValue({
    base: true,
    lg: false,
  })

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  })

  const getFavorites = async () => {
    try {
      const { data } = await api.get('getCategoryFavoriteWithProduct')

      setFavorites(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getCategories = async () => {
    try {
      const { data } = await api.get('getCategoryActive')
      setCategories(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFavorites()
    getCategories()

    function findOverflowingElements() {
      const docWidth = document.documentElement.offsetWidth

      ;[].forEach.call(document.querySelectorAll('*'), function (element: HTMLElement) {
        if (element.offsetWidth > docWidth) {
          console.log(element)
        }
      })
    }
    findOverflowingElements()
  }, [])

  return (
    <SmoothScroll>
      <Head>
        <meta
          name='description'
          content='Encontre tudo em soluções para medição, controle e monitoramento para os mais variados processos industrais.'
        />
        <meta
          name='keywords'
          content='soluções para medição, medição, controle de temperatura, monitoramento, processos industriais'
        />
        <title>Todos os Produtos</title>
        <link rel='icon' href='/favicon.png' />
      </Head>

      <Flex
        w='100%'
        alignItems='center'
        justifyContent='center'
        direction='column'
        h={['350px', '350px', '180px', '180px', '180px', '180px']}
      >
        <Text
          fontSize={['30px', '30px', '40px', '40px', '40px', '40px']}
          fontWeight='bold'
          textAlign='center'
          maxW='1037px'
          p={['0 20px', '0 20px', '0 20px', '0 20px', '0']}
        >
          Soluções para medição, controle e monitoramento para os mais variados processos industriais.
        </Text>
      </Flex>
      {favorites &&
        favorites.length > 0 &&
        favorites.map((fv: any, index: any) => (
          <Flex
            key={index}
            w='100%'
            alignItems={'center'}
            bg='white'
            p={['0 20px', '0 20px', '0 20px', '0 20px', '0 20px']}
          >
            <Container maxW='7xl' p='130px 0'>
              <Flex alignItems={['flex-start', 'center']} flexDirection={['column', 'row']}>
                <Text color='black.800' fontSize={['35px', '45px']} fontWeight='bold' ml='15px' lineHeight={['40px']}>
                  {fv.category_name}
                </Text>
              </Flex>
              <Box h={pxToRem(650)} mt={pxToRem(31)}>
                <Swiper
                  slidesPerView={isMobile ? 1 : isTablet ? 2 : 3}
                  spaceBetween={30}
                  initialSlide={0}
                  autoplay={{
                    delay: 2000,
                    pauseOnMouseEnter: true,
                    waitForTransition: true,
                  }}
                  speed={1000}
                  pagination={{
                    clickable: true,
                    enabled: true,
                    renderBullet: customSwiperBullets,
                  }}
                  modules={[Autoplay, Pagination]}
                  className='mySwiper'
                  cssMode={true}
                >
                  {fv.products &&
                    fv.products.length > 0 &&
                    fv.products.map((item: any, index: any) => (
                      <SwiperSlide key={index}>
                        <CardProductWithDescription
                          img={item.urls[0]}
                          text={item.name}
                          description={item.description}
                          call_product={item.call_product}
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </Box>
            </Container>
          </Flex>
        ))}
      {/*<Box bg='white' w='100%' p='20px' pt='100px'>
        <AdBanners />
      </Box>*/}
      <Flex w='100%' alignItems='center' bg='white.500' p='0 20px'>
        <Container maxW='7xl' p='80px 0'>
          <Text
            color='black.800'
            fontSize='45px'
            fontWeight='bold'
            mb='31px'
            p={['0 20px', '0 20px', '0 20px', '0 20px', '0']}
          >
            Navegue por Categoria
          </Text>
          {/* <Grid templateColumns='repeat(auto-fit, minmax(260px, 1fr))' gap={pxToRem(15)} padding={`0 ${pxToRem(10)}`}>
            {categories &&
              categories.length > 0 &&
              categories.map((categ: any, index: number) => {
                const cardIndex = index + 1
                let bg = 'black.800'
                let color = 'white'

                if (cardIndex % 2 === 0) {
                  bg = 'white'
                  color = 'black.800'
                }
                if (cardIndex % 3 === 0) {
                  bg = 'red.600'
                  color = 'white'
                }

                return (
                  <CardCatalog
                    key={uuidv4()}
                    bg={bg}
                    color={color}
                    title={categ.name}
                    text={categ.description}
                    img={categ.url}
                  />
                )
              })}
          </Grid> */}
        </Container>
      </Flex>
      {/* <Player /> */}
      {/*<Contact
        id='duvidas-e-orcamentos'
        title='DÚVIDAS E ORÇAMENTOS'
        description='Fale com nossos especialistas pelos canais abaixo ou nos envie um e-mail.'
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
      />*/}
      <Footer />
    </SmoothScroll>
  )
}

export default AllProduct
