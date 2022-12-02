import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
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
import { Contact } from "../../components/Contact";
import { Player } from "../../components/Player";
import { pxToRem } from "../../utils/pxToRem";
import CardProductWithDescription from "../../components/CardProductWithDescription";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { database, initFirebase } from "../../utils/db";
import { useAuth } from "../../contextAuth/authContext";

const Product = () => {
  const router = useRouter()
  initFirebase();
  const { addCart } = useAuth();

  const { product } = router.query
  const [detail, setDetail] = useState<any>({})
  const [variation, setVariation] = useState<any>({})
  const [products, setProducts] = useState<any>([])
  const [qtd, setQtd] = useState(1)
  const isTablet = useBreakpointValue({
    base: true,
    lg: false,
  });

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const getProduct = async () => {
    try {
      let produto = '' 
      if(product && typeof product == 'string') produto = product.replaceAll('_', ' ')
      const dbInstanceProducts = collection(database, "products");
      const dbInstanceHome = collection(database, "home");
      const qProduct = query(dbInstanceProducts, where("name", "==", produto), limit(1))
      const qHome = query(dbInstanceHome, where("name", "==", produto), limit(1))

      let exist = false
      await getDocs(qProduct).then(async (data) => {
        if (data.docs.length == 0) return
        if (data.docs.length > 0) {
          exist = true
        }
        setDetail({...data.docs[0].data(), id: data.docs[0].id})
      });

      if (!exist) {
        await getDocs(qHome).then(async (data) => {
          if (data.docs.length == 0) return
          setDetail({...data.docs[0].data(), id: data.docs[0].id})

          const qProductCategory = query(dbInstanceProducts, where("category", "==", data.docs[0].data().category), limit(1))
          const qHomeCategory = query(dbInstanceHome, where("category", "==", data.docs[0].data().category), limit(1))

          let listProducts: any = []
          await getDocs(qHomeCategory).then(async (dataCategory) => {
            if (dataCategory.docs.length == 0) return
            dataCategory.docs.forEach((dt) => {
              listProducts.push(dt.data())
            })
          });

          await getDocs(qProductCategory).then(async (dataCategory) => {
            if (dataCategory.docs.length == 0) return
            dataCategory.docs.forEach((dt) => {
              listProducts.push(dt.data())
            })
          });
          setProducts(listProducts)
        });
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if (product) {
      getProduct()
    }
  }, [product])

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
            {detail.urls && detail.urls.length > 0 && detail.urls.map((photo: any) => (
              <SwiperSlide>
                <Zoom>

                  <Center h="764px">
                    <img
                      alt={detail.name ? detail.name : ''}
                      src={photo}
                      width="500"
                    />
                  </Center>
                </Zoom>
              </SwiperSlide>
            ))}
          </Swiper>
        </Center>
        <Box ml={[0, 0, 0, "60px", "60px"]}>
          <Text fontWeight="bold" fontSize="35px" color="black.800" mb="30px">
            {detail.name ? detail.name : ''}
          </Text>
          <Text color="black.800" fontSize="20px" maxW="829px" mb="30px">
            {detail.description ? detail.description : ''}{" "}
            <Text as="span" color="red.600" cursor="pointer">
              veja descrição completa +
            </Text>
          </Text>
          <VStack spacing="30px">
            {detail.hasVariation && detail.listVariation && detail.listVariation.length > 0 && detail.listVariation.map((vr: any) => (
              <Flex w="100%" alignItems="center" justifyContent="space-between">
                <Text fontWeight="bold" fontSize="20px" color="black.800">
                  {vr.name}
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
                    onChange={(evt) => setVariation({...variation, [vr.name]: evt.target.value})}
                    _placeholder={{
                      color: "black.50",
                    }}
                    _focusVisible={{
                      outline: "none",
                    }}
                  >
                    {vr.opt && vr.opt.length > 0 && vr.opt.map((opt: any) => (
                      <option value={opt}>{opt}</option>
                    ))}
                  </Select>
                </InputGroup>
              </Flex>
            ))}
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
                  value={qtd}
                  onChange={(evt: any) => setQtd(parseFloat(evt.target.value))}
                />
                <Button
                  h="50px"
                  bg="red.600"
                  border="none"
                  color="#fff"
                  borderRadius="25px"
                  w="279px"
                  onClick={() => addCart({
                    product_id: detail.id,
                    variation: variation,
                    qtd
                  })}
                >
                  <Center>Adicionar ao orçamento</Center>
                </Button>
              </HStack>
            </Center>
          </VStack>
        </Box>
      </Flex>
      <Flex justifyContent="center" w="100%" bg="white" pt="111px" px="10px">
        <Tabs variant="enclosed" maxW="1386px" w="100%">
          <TabList>
            {detail.tab && detail.tab.length > 0 && detail.tab.map((tab: any) => (


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
                {tab.name}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {detail.tab && detail.tab.length > 0 && detail.tab.map((tab: any) => (

              <TabPanel
                bg="white.500"
                color="black.800"
                p="40px"
                borderBottomRadius="8px"
                borderTopRightRadius="8px"
              >
                {ReactHtmlParser(tab.text)}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Flex>
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
              {products.map((item: any) => (
                <SwiperSlide>
                  <CardProductWithDescription
                    img={item.urls && item.urls.length > 0 ? item.urls[0] : ''}
                    text={item.name}
                    description={item.description}
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
