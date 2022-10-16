import { Box, Container, Flex, HStack, Text, Link, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import Phone from '../assets/icons/phone.svg'
import Email from '../assets/icons/envelope.svg'
import Linkedin from '../assets/icons/linkedin.svg'
import Instagram from '../assets/icons/instagram.svg'
import Facebook from '../assets/icons/facebook-f.svg'
import Youtube from '../assets/icons/youtube.svg'
import Logo from '../assets/icons/logo.png'
import Controls from '../assets/icons/Controladores.png'
import Potenci from '../assets/icons/potencia.png'
import Camera from '../assets/icons/cameras.png'
import Pirometro from '../assets/icons/Pirometro-certo.png'
import DeNovo from '../assets/icons/de-novo.png'
import Ultimo from '../assets/icons/ultimo.png'
import Search from '../assets/icons/search.svg'
import Bag from '../assets/icons/shopping-bag.svg'
import Team from '../assets/images/temnacontemp.png'
import Product1 from '../assets/images/bateria.png'
import Image from 'next/image';
import { Typewriter } from 'react-simple-typewriter'
import CardProduct from '../components/CardProduct'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Autoplay } from "swiper";

const Home = () => {
  return (
    <>
      <Box w="100%" bg="black.800">
        <Container maxW='6xl' p="12px 0 31px" >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            marginBottom="32px"
          >
            <Box display="flex">
              <Flex>
                <Image src={Phone} width={20} height={20} />
                <Text
                  fontSize="18px"
                  color="white"
                  ml="10px"
                >
                  (11) 4223-5140
                </Text>
              </Flex>
              <Flex
                ml="30px"
              >
                <Image src={Email} width={20} height={20} />
                <Text
                  fontSize="18px"
                  color="white"
                  ml="10px"
                >
                  vendas@contemp.com.br
                </Text>
              </Flex>
            </Box>

            <HStack divider={<Box borderRadius="full" bg="white" w="5px" h="5px" />}>
              <Text>
                A Contemp
              </Text>
              <Text>
                Blog
              </Text>
              <Text>
                Trabalhe Conosco
              </Text>
              <Text>
                Suporte Técnico
              </Text>
            </HStack>
            <HStack>
              <Link href='https://www.linkedin.com/company/contemp/' isExternal>
                <Box w="28px" h="28px" display="flex" alignItems="center" justifyContent="center">
                  <Image src={Linkedin} width={20} height={20} />
                </Box>
              </Link>
              <Link href='https://www.youtube.com/channel/UC3zq85OUOJLysT-4c_NmDNQ' isExternal>
                <Box w="28px" h="28px" display="flex" alignItems="center" justifyContent="center">
                  <Image src={Youtube} width={20} height={20} />
                </Box>
              </Link>
              <Link href='https://www.instagram.com/contemp.industria/' isExternal>
                <Box w="28px" h="28px" display="flex" alignItems="center" justifyContent="center">
                  <Image src={Instagram} width={20} height={20} />
                </Box>
              </Link>
              <Link href='https://www.facebook.com/Contemp-1001000803330302/' isExternal>
                <Box w="28px" h="28px" display="flex" alignItems="center" justifyContent="center">
                  <Image src={Facebook} width={20} height={20} />
                </Box>
              </Link>
            </HStack>
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="space-between"
          >
            <Image src={Logo} width={160} height={41} />
            <Button
              borderRadius="5px"
              bg="red.600"
              _hover={{
                bg: "red.600",
                opacity: 0.6
              }}
            >
              Todos os produtos
            </Button>
            <HStack>
              <Box w="50px" display="flex" alignItems="center" justifyContent="center">
                <Image src={Controls} width={41} height={41} />
              </Box>
              <Box w="50px" display="flex" alignItems="center" justifyContent="center">
                <Image src={Potenci} width={41} height={41} />
              </Box>
              <Box w="50px" display="flex" alignItems="center" justifyContent="center">
                <Image src={Camera} width={41} height={41} />
              </Box>
              <Box w="50px" display="flex" alignItems="center" justifyContent="center">
                <Image src={Pirometro} width={41} height={41} />
              </Box>
              <Box w="50px" display="flex" alignItems="center" justifyContent="center">
                <Image src={DeNovo} width={41} height={41} />
              </Box>
              <Box w="50px" display="flex" alignItems="center" justifyContent="center">
                <Image src={Ultimo} width={41} height={41} />
              </Box>
            </HStack>
            <InputGroup
              borderRadius="21px"
              bg="black.200"
              p="3px 7px"
              w="191px"
              h="42px"
            >
              <Input w="100%" height="100%" border="none" borderRadius="21px" />
              <InputRightElement children={<Image src={Search} width="22px" height="22px" />} />
            </InputGroup>
            <Image src={Bag} width={30} height={30} />
          </Flex>
        </Container>
      </Box>

      <Flex
        w="full"
        bg="black.900"
        h="702px"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        backgroundImage={`url('./images/Banner.png')`}
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
      >
        <Container
          maxW='6xl'
          display="flex"
          flexDirection="column"
          alignItems="center"
          height="100%"
        >

          <Box
            marginTop="157px"
            marginBottom="35px"
          >
            <Image src={Team} width="200px" height="52" />
          </Box>
          <Flex
            alignItems="center"
            marginBottom="87px"
            minH="100px"
          >
            <Text
              color="white"
              textAlign="center"
              fontSize={['1.3rem', '1.3rem', '2.3rem']}
              fontWeight="bold"
            >
              Excelência em produtos:
              <Typewriter
                words={[' Indicadores de Temperatura e Processo']}
                loop={0}
                cursor={true}
              />
            </Text>

          </Flex>
          <Flex
            w="100%"
            alignItems="center"
            flexDirection="column"
          >
            <InputGroup
              borderRadius="21px"
              bg="red.600"
              p="3px 7px"
              w="100%"
              h="42px"
              maxW="594px"
              outline="none"
            >
              <Input
                w="100%"
                height="100%"
                border="none"
                borderRadius="21px"
                placeholder='Procure aqui seu produto'
                _focusVisible={{
                  outline: "none"
                }}
              />
              <InputRightElement
                children={
                  <Image
                    src={Search}
                    width="22px"
                    height="22px"
                  />
                }
              />
            </InputGroup>
            <Text
              fontSize="20px"
              color="white"
              textAlign="center"
              marginTop="15px"
            >
              Pesquise aqui o produto que precisa.
            </Text>
          </Flex>

        </Container>
      </Flex>
      <Container maxW='6xl' p="12px 0 31px" >
        <Text color="white" fontSize="40px" fontWeight="bold" textAlign="center" mt="80px">
          Confira nossos destaques
        </Text>
        <Text color="white" fontSize="20px" textAlign="center" mt="15px" mb="40px">
          Essa é a seleção que a equipe da Contemp escolheu como os destaques do mês
        </Text>

        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <CardProduct img={Product1} text="teste" />
          </SwiperSlide>
          <SwiperSlide>
            <CardProduct img={Product1} text="teste2" />
          </SwiperSlide>
          <SwiperSlide>
            <CardProduct img={Product1} text="teste3" />
          </SwiperSlide>
          <SwiperSlide>
            <CardProduct img={Product1} text="teste4" />
          </SwiperSlide>
          <SwiperSlide>
            <CardProduct img={Product1} text="teste5" />
          </SwiperSlide>
          <SwiperSlide>
            <CardProduct img={Product1} text="teste6" />
          </SwiperSlide>
          <SwiperSlide>
            <CardProduct img={Product1} text="teste7" />
          </SwiperSlide>
        </Swiper>
        <Flex
          alignItems="center"
          justifyContent="center"
        >

        </Flex>
      </Container>
    </>
  )
}

export default Home
