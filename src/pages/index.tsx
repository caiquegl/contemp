import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  Icon,
  Grid as GridChakra,
  Link,
  useBreakpointValue,
  Grid,
} from '@chakra-ui/react'
import Pirometro from '../assets/icons/pritometro_white.svg'
import Mapa from '../assets/images/MAPA.png'
import { Image } from '../components/Image'
import { BiPhone } from 'react-icons/bi'
import { AiOutlineMail } from 'react-icons/ai'
import { Catalog } from '../components/Catalog'
import { Banner } from '../components/Banner'
import { Favorite } from '../components/Favorite'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { Player } from '../components/Player'
import DescriptionProduct from '../components/DescriptionProduct'
import { pxToRem } from '../utils/pxToRem'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { SmoothScroll } from '../components/SmoothScroll'
import { CardBlog } from '../components/CardBlog'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { v4 as uuidv4 } from 'uuid'
import { api } from '../lib/axios'
import { collection, getDocs } from 'firebase/firestore'
import { database } from '../utils/db'

type Post = {
  post_title: string
  post_image: string
  post_url: string
  post_content: string
}

const Home = () => {
  const [listTab, setListtAB] = useState<any>([])
  const [post, setPost] = useState<Post[]>([])
  const isTablet = useBreakpointValue({
    base: true,
    lg: false,
  })
  const styles_card = [
    { bg: 'red.600', font: 'white' },
    { bg: 'white.500', font: 'black.800' },
    { bg: 'black.800', font: 'white' },
  ]

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  })
  const getHomeTab = async () => {
    try {
      const { data } = await api.get('getHomeTabs')
      setListtAB(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getHomeTab()
  }, [])

  const getPostsData = async () => {
    const postsData = await fetch('/api/get-posts')
    setPost((await postsData.json()) as Post[])
  }

  useEffect(() => {
    getPostsData()
  }, [])

  return (
    <SmoothScroll>
      <Head>
        <meta
          name='description'
          content='Procurando medição e controle de temperatura em processos industriais? A Contemp é pioneira. Confira!'
        />
        <meta
          name='keywords'
          content='controle de temperatura, processos industriais, contemp, medição de temperatura'
        />
        <title>Contemp</title>
        <link rel='icon' href='/favicon.png' />
      </Head>
      {/* <HomeBackgroundDetails /> */}

      <Banner />

      <Favorite homeTabs={listTab.find((el: any) => el.indexProduct === 0)} />

      <GridChakra
        templateColumns={{
          base: '100%',
          md: `repeat(2, minmax(${pxToRem(300)}, 1fr))`,
        }}
      >
        <DescriptionProduct
          color='white'
          bg='red.600'
          borderColor='white'
          colorButton='red.600'
          bgButton='white'
          colorHoverButton='white'
          bgHoverButton='red.600'
          borderColorButton='white'
          dataTab={listTab.find((el: any) => el.indexProduct === 1)}
        />
        <DescriptionProduct
          color='black.800'
          bg='white'
          borderColor='red.600'
          colorButton='white'
          bgButton='black.800'
          borderColorButton='black.800'
          colorHoverButton='black.800'
          bgHoverButton='white'
          dataTab={listTab.find((el: any) => el.indexProduct === 2)}
        />
        <DescriptionProduct
          color='black.800'
          bg='white'
          borderColor='red.600'
          colorButton='white'
          bgButton='black.800'
          borderColorButton='black.800'
          colorHoverButton='black.800'
          bgHoverButton='white'
          containerProps={{
            direction: {
              base: 'column',
              xl: 'row-reverse',
            },
          }}
          dataTab={listTab.find((el: any) => el.indexProduct === 3)}
        />
        <DescriptionProduct
          color='white'
          bg='red.600'
          borderColor='white'
          colorButton='red.600'
          bgButton='white'
          borderColorButton='white'
          colorHoverButton='white'
          bgHoverButton='red.600'
          containerProps={{
            direction: {
              base: 'column',
              xl: 'row-reverse',
            },
          }}
          dataTab={listTab.find((el: any) => el.indexProduct === 4)}
        />
      </GridChakra>

      <Container
        maxW='6xl'
        p={['12px 20px 31px 20px', '12px 20px 31px 20px', '12px 0 31px', '12px 0 31px', '12px 0 31px']}
      >
        <Flex
          alignItems='center'
          justifyContent='space-between'
          flexDirection={['column', 'column', 'row', 'row', 'row']}
        >
          <Box
            flex={{
              base: 'none',
              md: 1,
            }}
            textAlign='center'
          >
            <Text
              margin={{
                base: `${pxToRem(40)} auto 0`,
                md: 'auto',
              }}
              fontWeight='bold'
              fontSize={{
                base: pxToRem(45),
                md: pxToRem(80),
                lg: pxToRem(110),
              }}
              maxW={{
                base: '100%',
                md: pxToRem(210),
                lg: pxToRem(259),
              }}
              lineHeight={1.05}
              letterSpacing={{
                base: pxToRem(5),
                lg: pxToRem(9.6),
              }}
              textTransform='uppercase'
              zIndex={999}
            >
              Calibração
            </Text>
          </Box>

          <Flex
            flex={1}
            alignItems={{
              base: 'center',
              md: 'initial',
            }}
            flexDirection='column'
            padding={`0 ${pxToRem(15)}`}
          >
            <Flex
              as='a'
              p={`${pxToRem(10)}`}
              border='2px solid'
              borderColor='red.600'
              color='white'
              mt='10'
              w='100%'
              zIndex={20}
              borderRadius='4px'
              alignItems='center'
              justifyContent='space-between'
              minW={pxToRem(150)}
              maxW={pxToRem(400)}
              maxH={pxToRem(85)}
              _hover={{ color: 'white' }}
              href={`/calibracao`}
              cursor='pointer'
            >
              <Text fontSize={pxToRem(18)} flex={8} mr={pxToRem(30)}>
                CALIBRAÇÃO
              </Text>

              <Image src={Pirometro} bgSize='contain' minH={pxToRem(35)} minW={pxToRem(35)} flex={1} />
            </Flex>

            <Text
              mt='27px'
              mb='41px'
              fontSize={pxToRem(20)}
              maxW={pxToRem(791)}
              textAlign={{
                base: 'center',
                md: 'initial',
              }}
            >
              Nossos laboratórios possuem equipamentos e padrões que garantem a qualidade e confiabilidade das medições.
              Podem ser realizadas na Contemp ou em sua empresa. Nossas calibrações são efetuadas com símbolo de
              acreditação – RBC e rastreabilidade ao Inmetro.
            </Text>

            <Link
              textDecoration='none'
              _hover={{
                textDecoration: 'none',
              }}
              href='/calibracao'
            >
              <Button
                border='2px solid white'
                borderRadius='25px'
                width='157px'
                height='50px'
                mr='15px'
                bg='transparent'
                _hover={{
                  bg: 'white',
                  color: 'black.800',
                  transition: 'all 0.4s',
                }}
              >
                Veja mais
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Container>

      <GridChakra
        templateColumns={{
          base: '1fr',
          md: `repeat(2, minmax(${pxToRem(300)}, 1fr))`,
        }}
        w='100%'
      >
        <DescriptionProduct
          color='white'
          bg='red.600'
          borderColor='white'
          borderColorButton='white'
          colorButton='red.600'
          bgButton='white'
          colorHoverButton='white'
          bgHoverButton='red.600'
          dataTab={listTab.find((el: any) => el.indexProduct === 5)}
        />
        <DescriptionProduct
          color='black.800'
          bg='white'
          borderColor='red.600'
          colorButton='white'
          bgButton='black.800'
          borderColorButton='black.800'
          colorHoverButton='black.800'
          bgHoverButton='white'
          dataTab={listTab.find((el: any) => el.indexProduct === 6)}
        />
      </GridChakra>
      <Flex w='100%' alignItems='center' justifyContent='center' h='200px' bg='white'>
        <Link href={`/todosProdutos`} _hover={{ color: 'black', textDecoration: 'none' }}>
          <Button
            bg='red.600'
            borderRadius='25px'
            w='263px'
            h='50px'
            _hover={{
              bg: 'black.800',
              color: 'white',
              transition: 'all 0.4s',
            }}
          >
            Veja todos os produtos
          </Button>
        </Link>
      </Flex>

      <Player />

      <Flex
        w='100%'
        alignItems='center'
        justifyContent='center'
        p={`${pxToRem(70)} ${pxToRem(20)}`}
        bg='white.500'
        flexDirection={{
          base: 'column',
          md: 'row',
        }}
      >
        <Flex alignItems='flex-end' textAlign='end' maxW={pxToRem(693)} flexDirection='column' zIndex={20}>
          <Text
            color='red.600'
            fontWeight='bold'
            mb='18px'
            fontSize={{
              base: pxToRem(30),
              md: pxToRem(45),
            }}
            textAlign={{
              base: 'center',
              md: 'right',
            }}
          >
            ATENDEMOS O BRASIL E A AMÉRICA LATINA
          </Text>
          <Text
            fontSize={{
              base: pxToRem(17),
              md: pxToRem(24),
            }}
            color='black.800'
            mb='1%'
            maxW='425px'
          >
            Temos uma equipe de vendedores-técnicos de prontidão para te atender.
          </Text>

          <Flex
            alignItems='center'
            justifyContent='space-between'
            flexWrap='wrap'
            w='100%'
            maxW={pxToRem(400)}
            h={{
              base: 120,
            }}
            flexDirection={{
              base: 'column',
              md: 'row',
            }}
          >
            <Link href='tel:1142235140' _hover={{ textDecoration: 'none', color: '#fff' }}>
              <Button
                width={{
                  base: pxToRem(279),
                  md: pxToRem(179),
                }}
                h='50px'
                borderRadius='25px'
                bg='red.600'
                fontSize={pxToRem(20)}
                _hover={{
                  bg: 'black.800',
                  color: 'white',
                  transition: 'all 0.4s',
                }}
              >
                <Icon as={BiPhone} mr='10px' />
                Telefonar
              </Button>
            </Link>
            <Link href='mailto:vendas@contemp.com.br' _hover={{ textDecoration: 'none', color: '#fff' }}>
              <Button
                width={{
                  base: pxToRem(279),
                  md: pxToRem(179),
                }}
                h='50px'
                borderRadius='25px'
                bg='red.600'
                fontSize={pxToRem(20)}
                _hover={{
                  bg: 'black.800',
                  color: 'white',
                  transition: 'all 0.4s',
                }}
              >
                <Icon as={AiOutlineMail} mr='10px' />
                Enviar e-mail
              </Button>
            </Link>
          </Flex>
        </Flex>

        <Box
          w='100%'
          maxW={pxToRem(513)}
          ml={{
            base: 0,
            md: pxToRem(50),
            lg: pxToRem(180),
          }}
        >
          <Image src={Mapa} minH={500} bgSize='100%' />
        </Box>
      </Flex>
      <Catalog />
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
      <Flex w='100%' mt='-100px' bg='white' alignItems='center' justifyContent='center'>
        <Container maxW={['100%', '100%', '8xl', '8xl', '8xl']} mb='50px'>
          <Flex h={[pxToRem(500), pxToRem(660)]}>
            {isMobile && (
              <Swiper
                loop={true}
                slidesPerView={1}
                autoplay={{
                  delay: 2000,
                }}
                initialSlide={0}
                speed={1000}
                spaceBetween={isTablet ? 20 : 30}
                modules={[Autoplay, Pagination]}
                className='mySwiper'
                style={{
                  margin: 'auto',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                {post.map((p, index) => {
                  return (
                    <SwiperSlide style={{ width: '100%' }} key={uuidv4()}>
                      <CardBlog
                        color={styles_card[index].font}
                        bg={styles_card[index].bg}
                        title={p.post_title}
                        text={p.post_content}
                        hrefButton={p.post_url}
                        img={p.post_image}
                      />
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            )}{' '}
            {!isMobile && (
              <>
                {post.map((p, index) => {
                  return (
                    <CardBlog
                      color={styles_card[index].font}
                      bg={styles_card[index].bg}
                      title={p.post_title}
                      text={p.post_content}
                      hrefButton={p.post_url}
                      img={p.post_image}
                    />
                  )
                })}
              </>
            )}
          </Flex>
        </Container>
      </Flex>

      <Footer />
    </SmoothScroll>
  )
}

export default Home
