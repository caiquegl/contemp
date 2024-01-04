import {
  Box,
  Button,
  Center,
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
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper'
import ReactHtmlParser from 'react-html-parser'
import { pxToRem } from '../../utils/pxToRem'
import { Fragment, useState } from 'react'
import { initFirebase } from '../../utils/db'
import { useAuth } from '../../contextAuth/authContext'
import { Breadcrumb, Slider } from 'antd'
import Image from 'next/image'
import NextLink from 'next/link'
import { BsWhatsapp } from 'react-icons/bs'
import { FiShare2 } from 'react-icons/fi'

interface IProps {
    detail: any;
    bradName: any;
}

const Product4 = ({detail, bradName}: IProps) => {
  initFirebase()
  const toast = useToast()
  const { addCart } = useAuth()

  const [variation, setVariation] = useState<any>({})
  const [qtd, setQtd] = useState(1)


  const generateBreadcrumbUrl = (index: number) => {
    // Construa a URL com base nas etapas anteriores do Breadcrumb
    const path = bradName.slice(0, index + 1).map((el: string) => el.toLowerCase().replaceAll(' ', '_')).join('/');

    // Adicione o prefixo da categoria principal (ou o caminho da categoria principal, dependendo da sua estrutura de URLs)
    return index === 0 ? `/category/${path}` : `/category/${path.split('/').pop()}`;
  };


  return (
    <>
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
    </>
  )
}

export default Product4