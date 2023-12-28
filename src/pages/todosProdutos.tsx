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
import { SearchBar } from '../components/SearchBar'

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
        <Heading as={'h2'} className='todososprodutos-titulo negrito text-white centro'
          maxW='1037px'
          p={['0 20px', '0 20px', '0 20px', '0 20px', '0']}
        >
          Soluções para medição, controle e monitoramento para os mais variados processos industriais.
        </Heading>
        <SearchBar
            inputProps={{
              placeholder: 'Procure aqui seu produto...',
            }}
            containerProps={{
              bg: 'transparent',
              border: '2px solid var(--white-primary)',
            }}
            searchCard='100%'
          />
      </Flex>
      {favorites &&
        favorites.length > 0 &&
        favorites.map((fv: any, index: any) => (
          <Flex
            key={index}
            w='100%'
            alignItems={'center'}
            bg='var(--white-primary)'
            p={['0 20px', '0 20px', '0 20px', '0 20px', '0 20px']}
          >
            <Container maxW='7xl' p='130px 0'>
              <Flex alignItems={['flex-start', 'center']} flexDirection={['column', 'row']}>
                <Text color='var(--black-primary)' fontSize={['35px', '45px']} fontWeight='bold' ml='15px' lineHeight={['40px']}>
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
                    fv.products
                      .sort((a: any, b: any) => {
                        let aOrder = a.order || 999999
                        let bOrder = b.order || 999999
                        return aOrder - bOrder
                      })
                      .map((item: any, index: any) => (
                        <SwiperSlide key={index}>
                          <CardProductWithDescription
                            img={item.urls ? item.urls[0] : ''}
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
      {/*<Box bg='var(--white-primary)' w='100%' p='20px' pt='100px'>
        <AdBanners />
      </Box>*/}
      <Flex w='100%' alignItems='center' bg='var(--graylight-primary)' p='0 20px'>
        <Container maxW='7xl' p='80px 0'>
          <Heading as={'h3'} className='todososprodutos-titulo text-black negrito'
            mb='31px'
            p={['0 20px', '0 20px', '0 20px', '0 20px', '0']}
          >
            Navegue por Categoria
          </Heading>
          <Grid templateColumns='repeat(auto-fit, minmax(260px, 1fr))' gap={pxToRem(15)} padding={`0 ${pxToRem(10)}`}>
            {categories &&
              categories.length > 0 &&
              categories
                .filter((categ: any) => categ.all_product)
                .sort((a: any, b: any) => {
                  const orderA = a.order_all_products ?? 999999
                  const orderB = b.order_all_products ?? 999999
                  return orderA - orderB
                })
                .map((categ: any, index: number) => {
                  const cardIndex = index + 1
                  let bg = 'var(--black-primary)'
                  let color = 'var(--white-primary)'

                  if (cardIndex % 2 === 0) {
                    bg = 'var(--white-primary)'
                    color = 'var(--black-primary)'
                  }
                  if (cardIndex % 3 === 0) {
                    bg = 'var(--red-primary)'
                    color = 'var(--white-primary)'
                  }

                  return (
                    <CardCatalog
                      key={index}
                      bg={bg}
                      color={color}
                      title={categ.name}
                      text={categ.description}
                      img={categ.url}
                      urlPicture={categ.urlPicture}
                    />
                  )
                })}
          </Grid>
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
