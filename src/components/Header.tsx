import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Fade,
  Flex,
  Grid,
  HStack,
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useBreakpointValue,
  useDisclosure,
  Heading,
} from '@chakra-ui/react'
import { Image } from './Image'
import React, { useEffect, useState } from 'react'
import Phone from '../assets/icons/phone.svg'
import Email from '../assets/icons/envelope.svg'
import Linkedin from '../assets/icons/linkedin.svg'
import Instagram from '../assets/icons/instagram.svg'
import Facebook from '../assets/icons/facebook-f.svg'
import Youtube from '../assets/icons/youtube.svg'
import Logo from '../assets/icons/Logo-Contemp.svg'
import ImageNext from 'next/image'
import { DownOutlined } from '@ant-design/icons'
import { BsBag, BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { AiFillLinkedin, AiFillYoutube, AiOutlineInstagram } from 'react-icons/ai'
import { useAuth } from '../contextAuth/authContext'
import { FaFacebookF } from 'react-icons/fa'
import { SearchBar } from './SearchBar'
import { pxToRem } from '../utils/pxToRem'
import { HeaderMenu, HeaderMenuVertical } from './HeaderMenu'
import { useRouter } from 'next/router'
import { FiAlertTriangle } from 'react-icons/fi'
import { replaceNameToUrl } from '../utils/replaceNameToUrl'
import { api } from '../lib/axios'
import { ButtonAllProducts } from './ButtonAllProducts'
import { Space } from 'antd'

export const Header = () => {
  const router = useRouter()
  const { cart, isOpen, onClose, onOpen, totalCart } = useAuth()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const { isOpen: open, onOpen: oOpen, onClose: oClose } = useDisclosure()
  const [scrollY, setScrollY] = useState(0)

  const isDrawerSiderbar = useBreakpointValue({
    base: true,
    lg: false,
  })

  const listCategory = async () => {
    try {
      const { data } = await api.get('getMenu')

      const listMenu = data.map((el: any) => ({
        ...el,
        onTitleClick: (value: any) => {
          router.push(`/category/${replaceNameToUrl(el.name).toLowerCase().replaceAll(' ', '_')}`)
        },
        children: el.children
          ? el.children.map((el2: any) => {
              if (el2.children)
                el2.onTitleClick = (value: any) => {
                  router.push(`/category/${replaceNameToUrl(el2.name).toLowerCase().replaceAll(' ', '_')}`)
                }
              return el2
            })
          : undefined,
      }))
      setList(listMenu)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    listCategory()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // just trigger this so that the initial state
    // is updated as soon as the component is mounted
    // related: https://stackoverflow.com/a/63408216
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (isDrawerSiderbar) {
    return (
      <Flex
        alignItems='center'
        justifyContent='space-between'
        width='100%'
        h={pxToRem(70)}
        padding={`0 ${pxToRem(10)}`}
      >
        <Link href='/'>
          <ImageNext src={Logo} width={160} />
        </Link>

        <HStack spacing='27px'>
          <Box
            position='relative'
            cursor='pointer'
            onClick={() => {
              if (totalCart == 0 && !totalCart) {
                oOpen()
                return
              }
              router.push('/orcamento')
            }}
          >
            {cart && cart.length > 0 && (
              <Flex
                p={`${pxToRem(2)} ${pxToRem(5)}`}
                bg='red.600'
                borderRadius={50}
                alignItems='center'
                justifyContent='center'
                fontWeight='bold'
                fontSize={pxToRem(14)}
                position='absolute'
                bottom={4}
                left={4}
              >
                {totalCart}
              </Flex>
            )}
            <Icon as={BsBag} w={30} minHeight={30} bgSize={30} flex={1} />
          </Box>
          <Flex
            borderRadius='5px'
            w='40px'
            h='40px'
            alignItems='center'
            justifyContent='center'
            bg='red.600'
            color='white'
            cursor='pointer'
            onClick={onOpen}
            _hover={{
              transition: 'all 0.4s',
            }}
          >
            <Icon as={BsThreeDotsVertical} fontSize='20px' />
          </Flex>
        </HStack>

        <Drawer isOpen={isOpen} placement='left' onClose={onClose} size='md'>
          <DrawerOverlay />
          <DrawerContent bg='black.900' p='12px'>
            <DrawerHeader>
              <Flex alignItems='center' justifyContent='space-between' width='100%'>
                <Link href='/'>
                  <ImageNext src={Logo} width={160} />
                </Link>
                <Flex
                  borderRadius='5px'
                  w='40px'
                  h='40px'
                  alignItems='center'
                  justifyContent='center'
                  bg='red.600'
                  color='white'
                  cursor='pointer'
                  onClick={onClose}
                  _hover={{
                    transition: 'all 0.4s',
                  }}
                >
                  <Icon as={AiOutlineClose} fontSize='20px' />
                </Flex>
              </Flex>
              <Divider bg='white' mt='10px' />
            </DrawerHeader>

            <DrawerBody>
              <Box>
                <Link href='/todosProdutos' _hover={{ color: '#fff', textDecoration: 'none' }}>
                  <Button
                    borderRadius='5px'
                    bg='red.600'
                    w='100%'
                    justifyContent='space-between'
                    _hover={{
                      bg: 'white',
                      color: 'black.800',
                    }}
                  >
                    Todos os produtos
                    <Icon as={BsThreeDotsVertical} ml='10px' color='white' fontSize='20px' />
                  </Button>
                </Link>
              </Box>
              <Box mb='60px'>
                <HeaderMenuVertical menuItems={list} onClose={() => onClose()} />
              </Box>
              <Box>
                <Text m='22px 0' fontSize='20px' fontWeight='bold'>
                  Institucional
                </Text>
                <Link href='/a-contemp'>
                  <Text mb='15px' fontSize='18px'>
                    A Contemp
                  </Text>
                </Link>
                <Link href='https://blog.contemp.com.br'>
                  <Text mb='15px' fontSize='18px'>
                    Blog
                  </Text>
                </Link>
                <Link href='/suporte-tecnico'>
                  <Text mb='15px' fontSize='18px'>
                    Suporte Técnico
                  </Text>
                </Link>
                <Link href='/trabalhe-conosco'>
                  <Text mb='15px' fontSize='18px'>
                    Trabalhe Conosco
                  </Text>
                </Link>
                <Link href='/calibracao'>
                  <Text mb='15px' fontSize='18px'>
                    Calibração
                  </Text>
                </Link>
                <Link href='https://blog.contemp.com.br/politica-de-privacidade/'>
                  <Text mb='15px' fontSize='18px'>
                    Política de Privacidade
                  </Text>
                </Link>
              </Box>
            </DrawerBody>

            <DrawerFooter w='100%'>
              <Grid
                templateColumns='repeat(4, 1fr)'
                w='100%'
                maxW={pxToRem(260)}
                margin='auto'
                gridColumnGap={pxToRem(10)}
              >
                <Link href='https://www.linkedin.com/company/contemp/' isExternal>
                  <CustomIcon icon={AiFillLinkedin} />
                </Link>
                <Link href='https://www.youtube.com/channel/UC3zq85OUOJLysT-4c_NmDNQ' isExternal>
                  <CustomIcon icon={AiFillYoutube} />
                </Link>
                <Link href='https://www.instagram.com/contemp.industria/' isExternal>
                  <CustomIcon icon={AiOutlineInstagram} />
                </Link>
                <Link href='https://www.facebook.com/Contemp-1001000803330302/' isExternal>
                  <CustomIcon icon={FaFacebookF} />
                </Link>
              </Grid>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Modal isOpen={open} onClose={oClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton color='red' />
            <ModalBody p='20px' mt='20px'>
              <Flex alignItems='center'>
                <Flex
                  mr='20px'
                  alignItems='center'
                  justifyContent='center'
                  h='60px'
                  w='60px'
                  borderRadius='30px'
                  bg='red.100'
                >
                  <Icon as={FiAlertTriangle} color='red.700' fontSize='30px' />
                </Flex>
                <Box>
                  <Text fontWeight='bold' fontSize='25px' color='black.800'>
                    Atenção!
                  </Text>
                  <Text fontSize='16px' color='black.800' mt='10px' maxW='350px'>
                    Para poder continuar, é necessário adicionar ao menos um produto no carrinho.
                  </Text>
                </Box>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    )
  }

  return (
    <Box zIndex={9999999999999999}>
      <Fade in={scrollY < 200}>
        <Container className='container-menu' maxW={'1240px'} transition='all 3s' opacity={loading ? 0 : 1}>
          <Flex alignItems='center' justifyContent='space-evenly' marginBottom='32px' display={'none'}>
            <Box display='flex' flex={1}>
              <Link href='tel:1142235140' _hover={{ textDecoration: 'none', color: '#fff' }}>
                <Flex alignItems='center' w='max-content' mr={3}>
                  <Image src={Phone} minWidth={5} minHeight={15} bgSize={20} />
                  <Text fontSize='18px' color='white' ml={pxToRem(10)}>
                    (11) 4223-5140
                  </Text>
                </Flex>
              </Link>
              <Link href='mailto:vendas@contemp.com.br' _hover={{ textDecoration: 'none', color: '#fff' }}>
                <Flex alignItems='center'>
                  <Image src={Email} width={20} minHeight={15} flex={0.3} />
                  <Text fontSize='18px' color='white' ml={pxToRem(10)}>
                    vendas@contemp.com.br
                  </Text>
                </Flex>
              </Link>
            </Box>

            <HStack spacing='20px'>
              <Link href='https://www.linkedin.com/company/contemp/' isExternal>
                <Box w='28px' h='28px' display='flex' alignItems='center' justifyContent='center'>
                  <Image src={Linkedin} width={20} height={20} />
                </Box>
              </Link>
              <Link href='https://www.youtube.com/channel/UC3zq85OUOJLysT-4c_NmDNQ' isExternal>
                <Box w='28px' h='28px' display='flex' alignItems='center' justifyContent='center'>
                  <Image src={Youtube} width={20} height={20} />
                </Box>
              </Link>
              <Link href='https://www.instagram.com/contemp.industria/' isExternal>
                <Box w='28px' h='28px' display='flex' alignItems='center' justifyContent='center'>
                  <Image src={Instagram} width={20} height={20} />
                </Box>
              </Link>
              <Link href='https://www.facebook.com/Contemp-1001000803330302/' isExternal>
                <Box w='28px' h='28px' display='flex' alignItems='center' justifyContent='center'>
                  <Image src={Facebook} width={20} height={20} />
                </Box>
              </Link>
            </HStack>
          </Flex>

          <Flex className='menu-institucional' justifyContent={'space-between !important'} h={70}>
            <Link href={`/`} _hover={{ color: 'black', textDecoration: 'none' }}>
              <Box cursor='pointer' height={41} mr='20px'>
                <Box position='absolute' zIndex={9} bg='transparent' w='160px' h='41px' />
                <ImageNext width={160} height={41} src={Logo} />
              </Box>
            </Link>

            <ButtonAllProducts
              menuItems={list}
              render={
                <Space>
                  TODOS OS PRODUTOS
                  <DownOutlined />
                </Space>
              }
            />

            <HStack
              alignSelf='center'
              flex={{ base: 1, lg: 1.6, xl: 1 }}
              w='100%'
              alignItems='center'
              justifyContent='center'
            >
              <Link
                href='/a-contemp'
                className='menu-institucional-item-link'
                _hover={{
                  textDecoration: 'none',
                  color: 'var(--white-primary)',
                  fontWeight: 'bold',
                  transition: 'all 0',
                }}
              >
                <Text className='menu-institucional-item'>A Contemp</Text>
              </Link>
              <Link
                className='menu-institucional-item-link'
                _hover={{
                  textDecoration: 'none',
                  color: 'var(--white-primary)',
                  fontWeight: 'bold',
                  transition: 'all 0',
                }}
                href='/calibracao'
              >
                <Text className='menu-institucional-item'>Calibração</Text>
              </Link>
              <Link
                className='menu-institucional-item-link'
                _hover={{
                  textDecoration: 'none',
                  color: 'var(--white-primary)',
                  fontWeight: 'bold',
                  transition: 'all 0',
                }}
                href='/suporte-tecnico'
              >
                <Text className='menu-institucional-item'>Suporte Técnico</Text>
              </Link>
              {/*<Link
                className='menu-institucional-item-link'
                _hover={{
                  textDecoration: 'none',
                  color: 'black.800',
                  background: 'white',
                  borderRadius: '4px',
                  transition: 'all 0',
                }}
                href='/trabalhe-conosco'
              >
                <Text className='menu-institucional-item'>
                  Trabalhe Conosco
                </Text>
              </Link>*/}
              <Link
                className='menu-institucional-item-link'
                _hover={{
                  textDecoration: 'none',
                  color: 'var(--white-primary)',
                  fontWeight: 'bold',
                  transition: 'all 0',
                }}
                href='https://blog.contemp.com.br'
              >
                <Text className='menu-institucional-item'>Blog</Text>
              </Link>
            </HStack>

            <Flex alignItems='center'>
              <SearchBar
                containerProps={{
                  w: pxToRem(191),
                  h: pxToRem(42),
                  marginRight: 5,
                }}
              />

              <Box
                position='relative'
                cursor='pointer'
                onClick={() => {
                  if (totalCart == 0 && !totalCart) {
                    oOpen()
                    return
                  }
                  router.push('/orcamento')
                }}
              >
                {cart && cart.length > 0 && (
                  <Flex
                    p={`${pxToRem(2)} ${pxToRem(5)}`}
                    bg='var(--red-primary)'
                    borderRadius={50}
                    alignItems='center'
                    justifyContent='center'
                    fontWeight='bold'
                    fontSize={pxToRem(14)}
                    position='absolute'
                    bottom={4}
                    left={4}
                  >
                    {totalCart}
                  </Flex>
                )}
                <Icon as={BsBag} width={30} height={30} />
              </Box>
            </Flex>
          </Flex>

          <HeaderMenu menuItems={list} />
          <Modal isOpen={open} onClose={oClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton color='red' />
              <ModalBody p='20px' mt='20px'>
                <Flex alignItems='center'>
                  <Flex
                    mr='20px'
                    alignItems='center'
                    justifyContent='center'
                    h='60px'
                    w='60px'
                    borderRadius='30px'
                    bg='red.100'
                  >
                    <Icon as={FiAlertTriangle} color='red.700' fontSize='30px' />
                  </Flex>
                  <Box>
                    <Text fontWeight='bold' fontSize='25px' color='black.800'>
                      Atenção!
                    </Text>
                    <Text fontSize='16px' color='black.800' mt='10px' maxW='350px'>
                      Para poder continuar, é necessário adicionar ao menos um produto no carrinho.
                    </Text>
                  </Box>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Container>
      </Fade>
      {scrollY > 190 && (
        <Box zIndex={99} position='fixed' top='0' w='100%'>
          <Fade in={scrollY > 200}>
            <Box display='flex' alignItems='center' h='80px' bg='black.800'>
              <Container maxW='7xl' p='12px 15px 15px 15px'>
                <Flex alignItems='center' justifyContent='space-between' h={70} boxSizing='border-box'>
                  <Link href={`/`} _hover={{ color: 'black', textDecoration: 'none' }}>
                    <Box cursor='pointer' height={41} mr='20px'>
                      <ImageNext width={160} height={41} src={Logo} />
                    </Box>
                  </Link>
                  <Box>
                    {/* <Link href='/todosProdutos' _hover={{ textDecoration: 'none' }}>
                      <Button
                        borderRadius='5px'
                        bg='red.600'
                        _hover={{
                          bg: 'white',
                          color: 'black.800',
                        }}
                      >
                        <Icon as={BsThreeDotsVertical} fontSize='20px' />
                      </Button>
                    </Link> */}
                    <ButtonAllProducts menuItems={list} render={<Icon as={BsThreeDotsVertical} fontSize='16px' />} />
                  </Box>
                  <Box margin='0 0' w='100%'>
                    <HeaderMenu menuItems={list} maxWidth={true} />
                  </Box>
                  <Box
                    position='relative'
                    cursor='pointer'
                    onClick={() => {
                      if (totalCart == 0 && !totalCart) {
                        oOpen()
                        return
                      }
                      router.push('/orcamento')
                    }}
                  >
                    {cart && cart.length > 0 && (
                      <Flex
                        p={`${pxToRem(2)} ${pxToRem(5)}`}
                        bg='red.600'
                        borderRadius={50}
                        alignItems='center'
                        justifyContent='center'
                        fontWeight='bold'
                        fontSize={pxToRem(14)}
                        position='absolute'
                        bottom={4}
                        left={4}
                      >
                        {totalCart}
                      </Flex>
                    )}
                    <Icon as={BsBag} width={30} height={30} />
                  </Box>
                </Flex>
                <Modal isOpen={open} onClose={oClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalCloseButton color='red' />
                    <ModalBody p='20px' mt='20px'>
                      <Flex alignItems='center'>
                        <Flex
                          mr='20px'
                          alignItems='center'
                          justifyContent='center'
                          h='60px'
                          w='60px'
                          borderRadius='30px'
                          bg='red.100'
                        >
                          <Icon as={FiAlertTriangle} color='red.700' fontSize='30px' />
                        </Flex>
                        <Box>
                          <Text fontWeight='bold' fontSize='25px' color='black.800'>
                            Atenção!
                          </Text>
                          <Text fontSize='16px' color='black.800' mt='10px' maxW='350px'>
                            Para poder continuar, é necessário adicionar ao menos um produto no carrinho.
                          </Text>
                        </Box>
                      </Flex>
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Container>
            </Box>
          </Fade>
        </Box>
      )}
    </Box>
  )
}

function CustomIcon({ icon }: any) {
  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      w={pxToRem(50)}
      h={pxToRem(50)}
      borderRadius='full'
      bg='white.500'
    >
      <Icon as={icon} fontSize={pxToRem(35)} color='black.200' />
    </Flex>
  )
}
