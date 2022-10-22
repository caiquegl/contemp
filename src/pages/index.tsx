import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  Link,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Image as ImageChakra,
  Icon,
} from "@chakra-ui/react";
import Phone from "../assets/icons/phone.svg";
import Email from "../assets/icons/envelope.svg";
import Linkedin from "../assets/icons/linkedin.svg";
import Instagram from "../assets/icons/instagram.svg";
import Facebook from "../assets/icons/facebook-f.svg";
import Youtube from "../assets/icons/youtube.svg";
import Logo from "../assets/icons/logo.png";
import Controls from "../assets/icons/Controladores.png";
import Potenci from "../assets/icons/potencia.png";
import Camera from "../assets/icons/cameras.png";
import Pirometro from "../assets/icons/Pirometro-certo.png";
import DeNovo from "../assets/icons/de-novo.png";
import Ultimo from "../assets/icons/ultimo.png";
import Search from "../assets/icons/search.svg";
import Bag from "../assets/icons/shopping-bag.svg";
import Team from "../assets/images/temnacontemp.png";
import Mapa from "../assets/images/MAPA.png";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import CardProduct from "../components/CardProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiPhone } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import "swiper/css";

import { Autoplay } from "swiper";
import ReactPlayer from "react-player";

const Home = () => {
  return (
    <>
      <Box w="100%" bg="black.800">
        <Container maxW="6xl" p="12px 0 31px">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            marginBottom="32px"
          >
            <Box display="flex">
              <Flex>
                <Image src={Phone} width={20} height={20} />
                <Text fontSize="18px" color="white" ml="10px">
                  (11) 4223-5140
                </Text>
              </Flex>
              <Flex ml="30px">
                <Image src={Email} width={20} height={20} />
                <Text fontSize="18px" color="white" ml="10px">
                  vendas@contemp.com.br
                </Text>
              </Flex>
            </Box>

            <HStack
              divider={<Box borderRadius="full" bg="white" w="5px" h="5px" />}
            >
              <Text>A Contemp</Text>
              <Text>Blog</Text>
              <Text>Trabalhe Conosco</Text>
              <Text>Suporte Técnico</Text>
            </HStack>
            <HStack>
              <Link href="https://www.linkedin.com/company/contemp/" isExternal>
                <Box
                  w="28px"
                  h="28px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image src={Linkedin} width={20} height={20} />
                </Box>
              </Link>
              <Link
                href="https://www.youtube.com/channel/UC3zq85OUOJLysT-4c_NmDNQ"
                isExternal
              >
                <Box
                  w="28px"
                  h="28px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image src={Youtube} width={20} height={20} />
                </Box>
              </Link>
              <Link
                href="https://www.instagram.com/contemp.industria/"
                isExternal
              >
                <Box
                  w="28px"
                  h="28px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image src={Instagram} width={20} height={20} />
                </Box>
              </Link>
              <Link
                href="https://www.facebook.com/Contemp-1001000803330302/"
                isExternal
              >
                <Box
                  w="28px"
                  h="28px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image src={Facebook} width={20} height={20} />
                </Box>
              </Link>
            </HStack>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Image src={Logo} width={160} height={41} />
            <Button
              borderRadius="5px"
              bg="red.600"
              _hover={{
                bg: "red.600",
                opacity: 0.6,
              }}
            >
              Todos os produtos
            </Button>
            <HStack>
              <Box
                w="50px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image src={Controls} width={41} height={41} />
              </Box>
              <Box
                w="50px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image src={Potenci} width={41} height={41} />
              </Box>
              <Box
                w="50px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image src={Camera} width={41} height={41} />
              </Box>
              <Box
                w="50px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image src={Pirometro} width={41} height={41} />
              </Box>
              <Box
                w="50px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image src={DeNovo} width={41} height={41} />
              </Box>
              <Box
                w="50px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
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
              <InputRightElement
                children={<Image src={Search} width="22px" height="22px" />}
              />
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
          maxW="6xl"
          display="flex"
          flexDirection="column"
          alignItems="center"
          height="100%"
        >
          <Box marginTop="157px" marginBottom="35px">
            <Image src={Team} width="200px" height="52" />
          </Box>
          <Flex alignItems="center" marginBottom="87px" minH="100px">
            <Text
              color="white"
              textAlign="center"
              fontSize={["1.3rem", "1.3rem", "2.3rem"]}
              fontWeight="bold"
            >
              Excelência em produtos:
              <Typewriter
                words={[" Indicadores de Temperatura e Processo"]}
                loop={0}
                cursor={true}
              />
            </Text>
          </Flex>
          <Flex w="100%" alignItems="center" flexDirection="column">
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
                placeholder="Procure aqui seu produto"
                _focusVisible={{
                  outline: "none",
                }}
              />
              <InputRightElement
                children={<Image src={Search} width="22px" height="22px" />}
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
      <Container maxW="6xl" p="12px 0 31px">
        <Text
          color="white"
          fontSize="40px"
          fontWeight="bold"
          textAlign="center"
          mt="80px"
        >
          Confira nossos destaques
        </Text>
        <Text
          color="white"
          fontSize="20px"
          textAlign="center"
          mt="15px"
          mb="40px"
        >
          Essa é a seleção que a equipe da Contemp escolheu como os destaques do
          mês
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
            <CardProduct
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
              text="teste"
            />
          </SwiperSlide>
          <SwiperSlide>
            <CardProduct
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
              text="teste2"
            />
          </SwiperSlide>
          <SwiperSlide>
            <CardProduct
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
              text="teste3"
            />
          </SwiperSlide>
          <SwiperSlide>
            <CardProduct
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
              text="teste4"
            />
          </SwiperSlide>
          <SwiperSlide>
            <CardProduct
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
              text="teste5"
            />
          </SwiperSlide>
          <SwiperSlide>
            <CardProduct
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
              text="teste6"
            />
          </SwiperSlide>
          <SwiperSlide>
            <CardProduct
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
              text="teste7"
            />
          </SwiperSlide>
        </Swiper>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          mt="200px"
          mb="53px"
        >
          <ImageChakra
            src="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            alt="bateria"
            w="451px"
            h="451px"
          />
          <Box w="100%" ml={["50px", "100px", "100px"]}>
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontWeight="bold" fontSize="60px">
                C714
              </Text>
              <HStack
                p="10px 5px"
                border="2px solid"
                borderColor="red.600"
                borderRadius="4px"
                spacing="5px"
              >
                <Text fontSize="18px">
                  Controladores de Temperatura e Processos
                </Text>
                <Box
                  w="40px"
                  h="40px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image src={Pirometro} width={41} height={41} />
                </Box>
              </HStack>
            </Flex>
            <Text textAlign="justify" mt="27px" mb="28px" fontSize="20px">
              Os Controladores de Temperatura e Processos C714 – Linha Avançada,
              foram projetados com tecnologia nacional de ponta para serem
              versáteis, robustos e de fácil uso.
            </Text>
            <Flex alignItems="center">
              <Button
                border="2px solid white"
                borderRadius="25px"
                width="157px"
                height="50px"
                mr="15px"
                bg="transparent"
                _hover={{
                  bg: "red.600",
                  transition: "all 0.4s",
                }}
              >
                Veja mais
              </Button>
              <Box
                w="50px"
                h="50px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image src={Controls} width={41} height={41} />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Container>
      <Flex w="100%" alignItems="center" justifyContent="space-between">
        <Flex
          w="50%"
          minH="616px"
          alignItems="center"
          justifyContent="center"
          bg="red.600"
        >
          <HStack spacing="40px">
            <ImageChakra
              src="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
              alt="bateria"
              w="451px"
              h="451px"
            />
            <Box pr="40px">
              <Text fontWeight="bold" fontSize="60px">
                P501
              </Text>
              <HStack
                p="10px 5px"
                border="2px solid"
                borderColor="white"
                borderRadius="4px"
                spacing="5px"
                mb="27px"
              >
                <Text fontSize="18px">
                  Controladores de Temperatura e Processos
                </Text>
                <Box
                  w="40px"
                  h="40px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image src={Pirometro} width={41} height={41} />
                </Box>
              </HStack>
              <Text fontSize="20px" mb="41px">
                Desenvolvido para monitorar, controlar e registrar potência,
                corrente e tensão de cargas resistivas e
                transformadores-monofásicos e trifásicos.
              </Text>
              <Button
                borderRadius="25px"
                border="2px solid white"
                bg="transparent"
                w="157px"
                h="50px"
                _hover={{
                  bg: "red.600",
                  transition: "all 0.4s",
                }}
              >
                Veja mais
              </Button>
            </Box>
          </HStack>
        </Flex>
        <Flex
          w="50%"
          minH="616px"
          alignItems="center"
          justifyContent="center"
          bg="white"
          p="0 45px"
        >
          <HStack spacing="40px">
            <ImageChakra
              src="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
              alt="bateria"
              w="451px"
              h="451px"
            />
            <Box pr="40px">
              <Text fontWeight="bold" fontSize="60px" color="black.800">
                P501
              </Text>
              <HStack
                p="10px 5px"
                border="2px solid"
                borderColor="red.600"
                borderRadius="4px"
                spacing="5px"
                mb="27px"
              >
                <Text fontSize="18px" color="black.800">
                  Controladores de Temperatura e Processos
                </Text>
                <Box
                  w="40px"
                  h="40px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image src={Pirometro} width={41} height={41} />
                </Box>
              </HStack>
              <Text fontSize="20px" mb="41px" color="black.800">
                Desenvolvido para monitorar, controlar e registrar potência,
                corrente e tensão de cargas resistivas e
                transformadores-monofásicos e trifásicos.
              </Text>
              <Button
                borderRadius="25px"
                border="2px solid"
                borderColor="black.800"
                color="black.800"
                bg="transparent"
                w="157px"
                h="50px"
                _hover={{
                  bg: "red.600",
                  transition: "all 0.4s",
                }}
              >
                Veja mais
              </Button>
            </Box>
          </HStack>
        </Flex>
      </Flex>
      <Flex w="100%" alignItems="center" justifyContent="space-between">
        <Flex
          w="50%"
          minH="616px"
          alignItems="center"
          justifyContent="center"
          bg="white"
          p="0 45px"
        >
          <HStack spacing="40px">
            <ImageChakra
              src="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
              alt="bateria"
              w="451px"
              h="451px"
            />
            <Box pr="40px">
              <Text fontWeight="bold" fontSize="60px" color="black.800">
                P501
              </Text>
              <HStack
                p="10px 5px"
                border="2px solid"
                borderColor="red.600"
                borderRadius="4px"
                spacing="5px"
                mb="27px"
              >
                <Text fontSize="18px" color="black.800">
                  Controladores de Temperatura e Processos
                </Text>
                <Box
                  w="40px"
                  h="40px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image src={Pirometro} width={41} height={41} />
                </Box>
              </HStack>
              <Text fontSize="20px" mb="41px" color="black.800">
                Desenvolvido para monitorar, controlar e registrar potência,
                corrente e tensão de cargas resistivas e
                transformadores-monofásicos e trifásicos.
              </Text>
              <Button
                borderRadius="25px"
                border="2px solid"
                borderColor="black.800"
                color="black.800"
                bg="transparent"
                w="157px"
                h="50px"
                _hover={{
                  bg: "red.600",
                  transition: "all 0.4s",
                }}
              >
                Veja mais
              </Button>
            </Box>
          </HStack>
        </Flex>
        <Flex
          w="50%"
          minH="616px"
          alignItems="center"
          justifyContent="center"
          bg="red.600"
        >
          <HStack spacing="40px">
            <ImageChakra
              src="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
              alt="bateria"
              w="451px"
              h="451px"
            />
            <Box pr="40px">
              <Text fontWeight="bold" fontSize="60px">
                P501
              </Text>
              <HStack
                p="10px 5px"
                border="2px solid"
                borderColor="white"
                borderRadius="4px"
                spacing="5px"
                mb="27px"
              >
                <Text fontSize="18px">
                  Controladores de Temperatura e Processos
                </Text>
                <Box
                  w="40px"
                  h="40px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image src={Pirometro} width={41} height={41} />
                </Box>
              </HStack>
              <Text fontSize="20px" mb="41px">
                Desenvolvido para monitorar, controlar e registrar potência,
                corrente e tensão de cargas resistivas e
                transformadores-monofásicos e trifásicos.
              </Text>
              <Button
                borderRadius="25px"
                border="2px solid white"
                bg="transparent"
                w="157px"
                h="50px"
                _hover={{
                  bg: "red.600",
                  transition: "all 0.4s",
                }}
              >
                Veja mais
              </Button>
            </Box>
          </HStack>
        </Flex>
      </Flex>
      <Container maxW="6xl" p="12px 0 31px">
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="110px" w="259px">
            CALIBRAÇÃO
          </Text>
          <Box>
            <Flex
              p="10px 5px"
              border="2px solid"
              borderColor="red.600"
              borderRadius="4px"
              alignItems="center"
              w="416px"
            >
              <Text fontSize="18px" mr="5px">
                Controladores de Temperatura e Processos
              </Text>
              <Box
                w="40px"
                h="40px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image src={Pirometro} width={41} height={41} />
              </Box>
            </Flex>
            <Text mt="27px" mb="41px" fontSize="20px" maxW="791px">
              Nossos laboratórios possuem equipamentos e padrões que garantem a
              qualidade e confiabilidade das medições. Podem ser realizadas na
              Contemp ou em sua empresa. Nossas calibrações são efetuadas com
              símbolo de acreditação – RBC e rastreabilidade ao Inmetro.
            </Text>
            <Button
              border="2px solid white"
              borderRadius="25px"
              width="157px"
              height="50px"
              mr="15px"
              bg="transparent"
              _hover={{
                bg: "red.600",
                transition: "all 0.4s",
              }}
            >
              Veja mais
            </Button>
          </Box>
        </Flex>
      </Container>
      <Flex w="100%" alignItems="center" justifyContent="space-between">
        <Flex w="50%" minH="616px" alignItems="center" justifyContent="center">
          <HStack spacing="40px">
            <ImageChakra
              src="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
              alt="bateria"
              w="451px"
              h="451px"
            />
            <Box pr="40px">
              <Text fontWeight="bold" fontSize="60px">
                P501
              </Text>
              <HStack
                p="10px 5px"
                border="2px solid"
                borderColor="white"
                borderRadius="4px"
                spacing="5px"
                mb="27px"
              >
                <Text fontSize="18px">
                  Controladores de Temperatura e Processos
                </Text>
                <Box
                  w="40px"
                  h="40px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image src={Pirometro} width={41} height={41} />
                </Box>
              </HStack>
              <Text fontSize="20px" mb="41px">
                Desenvolvido para monitorar, controlar e registrar potência,
                corrente e tensão de cargas resistivas e
                transformadores-monofásicos e trifásicos.
              </Text>
              <Button
                borderRadius="25px"
                border="2px solid white"
                bg="transparent"
                w="157px"
                h="50px"
                _hover={{
                  bg: "red.600",
                  transition: "all 0.4s",
                }}
              >
                Veja mais
              </Button>
            </Box>
          </HStack>
        </Flex>
        <Flex
          w="50%"
          minH="616px"
          alignItems="center"
          justifyContent="center"
          bg="white"
          p="0 45px"
        >
          <HStack spacing="40px">
            <ImageChakra
              src="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
              alt="bateria"
              w="451px"
              h="451px"
            />
            <Box pr="40px">
              <Text fontWeight="bold" fontSize="60px" color="black.800">
                P501
              </Text>
              <HStack
                p="10px 5px"
                border="2px solid"
                borderColor="red.600"
                borderRadius="4px"
                spacing="5px"
                mb="27px"
              >
                <Text fontSize="18px" color="black.800">
                  Controladores de Temperatura e Processos
                </Text>
                <Box
                  w="40px"
                  h="40px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image src={Pirometro} width={41} height={41} />
                </Box>
              </HStack>
              <Text fontSize="20px" mb="41px" color="black.800">
                Desenvolvido para monitorar, controlar e registrar potência,
                corrente e tensão de cargas resistivas e
                transformadores-monofásicos e trifásicos.
              </Text>
              <Button
                borderRadius="25px"
                border="2px solid"
                borderColor="black.800"
                color="black.800"
                bg="transparent"
                w="157px"
                h="50px"
                _hover={{
                  bg: "red.600",
                  transition: "all 0.4s",
                }}
              >
                Veja mais
              </Button>
            </Box>
          </HStack>
        </Flex>
      </Flex>
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="center"
        h="200px"
        bg="white"
      >
        <Button
          bg="red.600"
          borderRadius="25px"
          w="263px"
          h="50px"
          _hover={{
            transition: "all 0.4s",
            opacity: 0.7,
          }}
        >
          Veja todos os produtos
        </Button>
      </Flex>
      <Flex w="100%" alignItems="center" justifyContent="center" p="123px 0">
        <Box w="100%" maxW={"700px"} mr="40px">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
            height="533px"
            width="700px"
          />
        </Box>
        <Box maxW="359px">
          <Text fontSize="40px" fontWeight="bold" mb="50px">
            Nova Linha de Controles e Indicadores
          </Text>
          <Text fontSize="20px" mb="57px">
            Logo abaixo nosso vídeo sobre Contemp C504 – Controlador de
            Processos.
          </Text>
          <Box w="100%" maxW="359px" h="195px">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
              width="300px"
              height="195px"
            />
          </Box>
        </Box>
      </Flex>
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="center"
        p="70px 0"
        bg="white.500"
      >
        <Flex
          flexDirection="column"
          alignItems="flex-end"
          textAlign="end"
          maxW="693px"
        >
          <Text color="red.600" fontWeight="bold" mb="18px" fontSize="45px">
            ATENDEMOS O BRASIL E A AMÉRICA LATINA
          </Text>
          <Text fontSize="24px" color="black.800" mb="104px" maxW="425px">
            Temos uma equipe de vendedores-técnicos de prontidão para te
            atender.
          </Text>
          <Flex alignItems="center" justifyContent="flex-end">
            <Button
              w="179px"
              h="50px"
              borderRadius="25px"
              mr="24px"
              bg="red.600"
              fontSize="20px"
              _hover={{ transition: "all 0.5s", opacity: 0.7 }}
            >
              <Icon as={BiPhone} />
              Telefonar
            </Button>
            <Button
              w="179px"
              h="50px"
              borderRadius="25px"
              bg="red.600"
              fontSize="20px"
              _hover={{ transition: "all 0.5s", opacity: 0.7 }}
            >
              <Icon as={AiOutlineMail} />
              Enviar e-mail
            </Button>
          </Flex>
        </Flex>
        <Box w="100%" maxW="513px" ml={["20px", "50px", "180px"]}>
          <Image src={Mapa} />
        </Box>
      </Flex>
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        p="80px 0"
        bg="white"
      ></Flex>
    </>
  );
};

export default Home;
