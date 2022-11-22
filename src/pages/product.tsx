import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Input,
  InputGroup,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";
import ReactHtmlParser from "react-html-parser";
import { Contact } from "../components/Contact";
import { Player } from "../components/Player";
import { pxToRem } from "../utils/pxToRem";
import CardProductWithDescription from "../components/CardProductWithDescription";

const products = [] as number[];

for (let i = 0; i < 10; i++) {
  products.push(i + 1);
}

const Product = () => {
  const isTablet = useBreakpointValue({
    base: true,
    lg: false,
  });

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  return (
    <>
      <Header />
      <Flex
        p="10px"
        pt="60px"
        bg="white"
        w="100%"
        h="100%"
        alignItems="flex-start"
        flexDirection={["column", "column", "column", "row", "row"]}
      >
        <Center bg="white.500" w="100%" maxW="564px" h="764px">
          <Swiper
            loop={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Zoom>
                <Center h="764px">
                  <img
                    alt="That Wanaka Tree, New Zealand by Laura Smetsers"
                    src="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
                    width="500"
                  />
                </Center>
              </Zoom>
            </SwiperSlide>
            <SwiperSlide>
              <Zoom>
                <Center h="764px">
                  <img
                    alt="That Wanaka Tree, New Zealand by Laura Smetsers"
                    src="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
                    width="500"
                  />
                </Center>
              </Zoom>
            </SwiperSlide>
          </Swiper>
        </Center>
        <Box ml={[0, 0, 0, "60px", "60px"]}>
          <Text fontWeight="bold" fontSize="35px" color="black.800" mb="30px">
            C719 - CONTROLADOR DE TEMPERATURA E PROCESSO LINHA AVANÇADA
          </Text>
          <Text color="black.800" fontSize="20px" maxW="829px" mb="30px">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit...{" "}
            <Text as="span" color="red.600" cursor="pointer">
              veja descrição completa +
            </Text>
          </Text>
          <VStack spacing="30px">
            <Flex w="100%" alignItems="center" justifyContent="space-between">
              <Text fontWeight="bold" fontSize="20px" color="black.800">
                Nome da variação 1
              </Text>
              <InputGroup
                borderRadius="6px"
                bg="white.500"
                p="3px 7px"
                w="100%"
                maxW="358px"
                h="50"
                outline="none"
                border="none"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Select
                  w="100%"
                  height="100%"
                  border="none"
                  borderRadius="21px"
                  placeholder="Selecione uma opção"
                  color="black.800"
                  _placeholder={{
                    color: "black.50",
                  }}
                  _focusVisible={{
                    outline: "none",
                  }}
                >
                  <option>opt 1</option>
                  <option>opt 2</option>
                </Select>
              </InputGroup>
            </Flex>
            <Flex w="100%" alignItems="center" justifyContent="space-between">
              <Text fontWeight="bold" fontSize="20px" color="black.800">
                Nome da variação 2
              </Text>
              <InputGroup
                borderRadius="6px"
                bg="white.500"
                p="3px 7px"
                w="100%"
                maxW="358px"
                h="50"
                outline="none"
                border="none"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Select
                  w="100%"
                  height="100%"
                  border="none"
                  borderRadius="21px"
                  placeholder="Selecione uma opção"
                  color="black.800"
                  _placeholder={{
                    color: "black.50",
                  }}
                  _focusVisible={{
                    outline: "none",
                  }}
                >
                  <option>opt 1</option>
                  <option>opt 2</option>
                </Select>
              </InputGroup>
            </Flex>
            <Flex w="100%" alignItems="center" justifyContent="space-between">
              <Text fontWeight="bold" fontSize="20px" color="black.800">
                Nome da variação 3
              </Text>
              <InputGroup
                borderRadius="6px"
                bg="white.500"
                p="3px 7px"
                w="100%"
                maxW="358px"
                h="50"
                outline="none"
                border="none"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Select
                  w="100%"
                  height="100%"
                  border="none"
                  borderRadius="21px"
                  placeholder="Selecione uma opção"
                  color="black.800"
                  _placeholder={{
                    color: "black.50",
                  }}
                  _focusVisible={{
                    outline: "none",
                  }}
                >
                  <option>opt 1</option>
                  <option>opt 2</option>
                </Select>
              </InputGroup>
            </Flex>
            <Flex w="100%" alignItems="center" justifyContent="space-between">
              <Text
                fontWeight="bold"
                fontSize="20px"
                color="black.800"
                pr="10px"
              >
                Opcional de comunicação Serial (exemplo de variação)
              </Text>
              <InputGroup
                borderRadius="6px"
                bg="white.500"
                p="3px 7px"
                w="100%"
                maxW="358px"
                h="50"
                outline="none"
                border="none"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Select
                  w="100%"
                  height="100%"
                  border="none"
                  borderRadius="21px"
                  placeholder="Selecione uma opção"
                  color="black.800"
                  _placeholder={{
                    color: "black.50",
                  }}
                  _focusVisible={{
                    outline: "none",
                  }}
                >
                  <option>opt 1</option>
                  <option>opt 2</option>
                </Select>
              </InputGroup>
            </Flex>
            <Center bg="white.500" borderRadius="8px" p="15px">
              <HStack spacing="20px">
                <Text color="black.800" fontWeight="bold" fontSize="20px">
                  Quantidade
                </Text>
                <Input
                  type="number"
                  w="auto"
                  color="black.800"
                  defaultValue="1"
                  border="1px solid"
                  borderColor="black.800"
                  borderRadius="25px"
                  maxW="89px"
                />
                <Button
                  h="50px"
                  bg="red.600"
                  border="none"
                  color="#fff"
                  borderRadius="25px"
                  w="279px"
                >
                  <Center>Adicionar ao orçamento</Center>
                </Button>
              </HStack>
            </Center>
          </VStack>
        </Box>
      </Flex>
      <Box w="100%" bg="white" pt="111px" px="10px">
        <Tabs variant="enclosed" maxW="1386px">
          <TabList>
            <Tab
              _selected={{
                bg: "white.500",
                color: "red.600",
                fontWeight: "bold",
              }}
              w="100%"
              maxW="211px"
              color="black.800"
            >
              Produto 1
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel
              bg="white.500"
              color="black.800"
              p="40px"
              borderBottomRadius="8px"
              borderTopRightRadius="8px"
            >
              {ReactHtmlParser(`<b>caique</b>`)}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Flex
        w="100%"
        alignItems="center"
        bg="white"
        p={["0 20px", "0 20px", "0 20px", "0 20px", "0"]}
      >
        <Container maxW="7xl" p="80px 0">
          <Flex alignItems="center">
            <Text color="black.800" fontSize="45px" fontWeight="bold" ml="15px">
              #temnacontemp
            </Text>
          </Flex>
          <Box h={pxToRem(650)} mt="31px">
            <Swiper
              slidesPerView={isMobile ? 1 : isTablet ? 2 : 3}
              spaceBetween={30}
              autoplay={{
                delay: 2000,
                pauseOnMouseEnter: true,
              }}
              pagination={true}
              modules={[Autoplay, Pagination]}
              className="mySwiper"
            >
              {products.map((item) => (
                <SwiperSlide>
                  <CardProductWithDescription
                    img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
                    text={`Teste ${item}`}
                    description="Use o NFC do seu smartphone para configurar seu Controlador de Temperatura C719!"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Container>
      </Flex>
      <Player />
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

export default Product;
