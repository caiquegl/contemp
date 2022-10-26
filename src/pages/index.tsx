import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  Button,
  Image as ImageChakra,
  Icon,
  Grid as GridChakra,
} from "@chakra-ui/react";
import Pirometro from "../assets/icons/Pirometro-certo.png";
import Mapa from "../assets/images/MAPA.png";
import Image from "next/image";
import { BiPhone } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import ReactPlayer from "react-player";
import { CardBlog } from "../components/CardBlog";
import { Catalog } from "../components/Catalog";
import { Header } from "../components/Header";
import { Banner } from "../components/Banner";
import { Favorite } from "../components/Favorite";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Player } from "../components/Player";

const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <Favorite />
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
      <Player />
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
              <Icon as={BiPhone} mr="10px" />
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
              <Icon as={AiOutlineMail} mr="10px" />
              Enviar e-mail
            </Button>
          </Flex>
        </Flex>
        <Box w="100%" maxW="513px" ml={["20px", "50px", "180px"]}>
          <Image src={Mapa} />
        </Box>
      </Flex>
      <Flex w="100%" p="80px 0" bg="white">
        <GridChakra templateColumns="repeat(3, 1fr)" w="100%">
          <CardBlog
            bg="red.600"
            color="white"
            title="Termopar, onde utilizar ?"
            text="Termopar termopares, são sensores de temperatura composto por
            dois elementos."
            img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
          />
          <CardBlog
            bg="white.500"
            color="black.800"
            title="Termopar, onde utilizar ?"
            text="Termopar termopares, são sensores de temperatura composto por
            dois elementos."
            img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
          />
          <CardBlog
            bg="black.800"
            color="white"
            title="Termopar, onde utilizar ?"
            text="Termopar termopares, são sensores de temperatura composto por
            dois elementos."
            img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
          />
        </GridChakra>
      </Flex>
      <Catalog />
      <Contact
        title="DÚVIDAS E ORÇAMENTOS"
        description="Essa é a seleção que a equipe da Contemp escolheu como os
              destaques do mês"
        form={[
          {
            name: "Nome",
            type: "text",
          },
          {
            name: "E-mail",
            type: "text",
          },
          {
            name: "Empresa",
            type: "text",
          },
          {
            name: "Telefone",
            type: "text",
          },
          {
            name: "Mensagem",
            type: "textArea",
          },
        ]}
      />
      <Footer />
    </>
  );
};

export default Home;
