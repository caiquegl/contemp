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

const Product2 = ({detail, bradName}: IProps) => {
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
            <Center width={'30%'}
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

            <Box m={`${pxToRem(10)} auto`} p={'0% 2%'} w={'45%'}>
              <Heading as={'h2'} className='titulo-produto-individual'>
                {detail.name ? detail.name : ''}
              </Heading>
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
            </Box>
            <Box p={'1.5%'} w={'25%'} className='sombra'>
              <Box>
                <Heading as={'h4'} mt={'3%'} className='centro' textTransform={'uppercase'} fontSize={'1.25rem'}>Configure seu produto</Heading>
              </Box>
              <Box>
                <VStack spacing='20px'>
                  {detail.hasVariation &&
                    detail.listVariation &&
                    Array.isArray(detail.listVariation) &&
                    detail.listVariation.map((vr: any, key: number) => (
                      <Flex
                        key={key}
                        w='100%'
                        alignItems={['flex-start', 'flex-start']}
                        justifyContent='space-between'
                        direction={['column', 'column']}
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
                        {vr.opt && !vr.type_view && Array.isArray(vr.opt) && vr.opt.length > 0 && (
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
                <Box bg='white.500' borderRadius='8px' p='15px' mt='30px'>
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
                        min={1}
                        max={50}
                        clampValueOnBlur={false}
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

                    </Flex>
                    <Box>
                    <Button
                        className='botao-vermelho'
                        mt={'auto'}
                        maxW={pxToRem(279)}
                        w='100%'
                        onClick={() => {
                          // Verifique se qtd é maior que 0 antes de adicionar ao orçamento
                          if (qtd <= 0) {
                            toast({
                              title: 'Erro ao adicionar produto',
                              description: 'A quantidade deve ser maior que zero.',
                              status: 'error',
                              duration: 3000,
                              isClosable: true,
                            });
                            return; // Impede a execução do restante do código
                          }

                          addCart({
                            product_id: detail.id,
                            variation: variation,
                            qtd,
                          });

                          toast({
                            title: 'Sucesso',
                            description: 'Produto adicionado com sucesso.',
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                          });
                        }}
                      >
                        <Center>Adicionar ao orçamento</Center>
                      </Button>
                    </Box>
                  </Box>
                <Box>
              </Box>
              </Box>
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
    </>
  )
}

export default Product2