import {
  Box,
  Container,
  Flex,
  Text,
  Grid,
  useBreakpointValue,
  Center,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Player } from "../components/Player";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import CardProductWithDescription from "../components/CardProductWithDescription";
import CardCatalog from "../components/CardCatalog";
import { Image } from "../components/Image";
import { pxToRem } from "../utils/pxToRem";
import { SmoothScroll } from "../components/SmoothScroll";
import { useEffect, useState } from "react";
import Head from "next/head";
import { AdBanners } from "../components/AdBanners";
import { customSwiperBullets } from "../utils/customSwiperBullets";
import { useAuth } from '../contextAuth/authContext'

const AllProduct = () => {
  const { allCategoryActive, allProductsActive, allProductsHome } = useAuth()
  const [favorites, setFavorites] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);

  const isTablet = useBreakpointValue({
    base: true,
    lg: false,
  });

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const getFavorites = async () => {
    try {
      let listFavorite: any = [];

      allCategoryActive.forEach((el: any) => {
        if (el.favorite) {
          listFavorite.push({
            ...el,
            idCategorie: el.id,
            products: []
          })
        }
      })

      if (listFavorite.length === 0) return;
      let index = 0;
      for await (let categories of listFavorite) {
        allProductsActive.filter((el: any) => {
          if (el.category == categories.idCategorie)
            listFavorite[index].products.push(el);
        });

        allProductsHome.filter((el: any) => {
          if (el.category == categories.idCategorie)
            listFavorite[index].products.push(el);
        });

        index = index + 1;
      }
      setFavorites(listFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      let list: any = [];

      allProductsActive.forEach((el: any) => {
        list.push({
          ...el,
          idCategorie: el.id
        })
      })

      if (list.length === 0) return;

      setCategories(list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (allCategoryActive.length > 0 && allProductsHome.length > 0 && allProductsActive.length > 0) {
      getFavorites();
      getCategories();
    }

    function findOverflowingElements() {
      const docWidth = document.documentElement.offsetWidth;

      [].forEach.call(
        document.querySelectorAll("*"),
        function (element: HTMLElement) {
          if (element.offsetWidth > docWidth) {
            console.log(element);
          }
        }
      );
    }
    findOverflowingElements();
  }, [allCategoryActive, allProductsActive, allProductsHome]);

  return (
    <SmoothScroll>
      <Head>
        <meta
          name="description"
          content="Encontre tudo em soluções para medição, controle e monitoramento para os mais variados processos industrais."
        />
        <meta
          name="keywords"
          content="soluções para medição, medição, controle de temperatura, monitoramento, processos industriais"
        />
        <title>Contemp</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="center"
        direction="column"
        h={["350px", "350px", "250px", "250px", "250px", "250px"]}
      >
        <Text
          fontSize={["30px", "30px", "40px", "40px", "40px", "40px"]}
          fontWeight="bold"
          textAlign="center"
          maxW="1037px"
          p={["0 20px", "0 20px", "0 20px", "0 20px", "0"]}
        >
          Soluções para medição, controle e monitoramento para os mais variados
          processos industriais.
        </Text>
      </Flex>
      {favorites &&
        favorites.length > 0 &&
        favorites.map((fv: any) => (
          <Flex
            w="100%"
            alignItems={"center"}
            bg="white"
            p={["0 20px", "0 20px", "0 20px", "0 20px", "0 20px"]}
          >
            <Container maxW="7xl" p="80px 0">
              <Flex alignItems={['flex-start', "center"]} flexDirection={['column', 'row']}>
                {fv.url ? (
                  <Center w="70px" h="70px" borderRadius="5px" mb={["20px", 0]}>
                    <Image
                      src={fv.url}
                      alt={fv.name}
                      bgSize="contain"
                      minH={{
                        base: pxToRem(228),
                        md: pxToRem(330),
                        lg: pxToRem(425),
                      }}
                      flex={0.8}
                    />
                  </Center>
                ) : (
                  <Box w="55px" h="55px" borderRadius="5px" bg="black.800" mb={["20px", 0]} />
                )}
                <Text
                  color="black.800"
                  fontSize={[
                    "35px",
                    "45px",
                  ]}
                  fontWeight="bold"
                  ml="15px"
                  lineHeight={['40px']}
                >
                  {fv.name}
                </Text>
              </Flex>
              <Box h={pxToRem(650)} mt={pxToRem(31)}>
                <Swiper
                  slidesPerView={isMobile ? 1 : isTablet ? 2 : 3}
                  spaceBetween={30}
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
                  className="mySwiper"
                  cssMode={true}
                >
                  {fv.products &&
                    fv.products.length > 0 &&
                    fv.products.map((item: any) => (
                      <SwiperSlide>
                        <CardProductWithDescription
                          img={item.urls[0]}
                          text={item.name}
                          description={item.description}
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </Box>
            </Container>
          </Flex>
        ))}
      <Box bg="white" w="100%" p="20px">
        <AdBanners />
      </Box>
      <Flex w="100%" alignItems="center" bg="white.500" p="0 20px">
        <Container maxW="7xl" p="80px 0">
          <Text
            color="black.800"
            fontSize="45px"
            fontWeight="bold"
            mb="31px"
            p={["0 20px", "0 20px", "0 20px", "0 20px", "0"]}
          >
            Navegue por Categoria
          </Text>
          <Grid
            templateColumns="repeat(auto-fit, minmax(260px, 1fr))"
            // gridAutoRows={pxToRem(360)}
            gap={pxToRem(15)}
            padding={`0 ${pxToRem(10)}`}
          >
            {categories &&
              categories.length > 0 &&
              categories.map((categ: any, index: number) => {
                const cardIndex = index + 1;
                let bg = "black.800";
                let color = "white";

                if (cardIndex % 2 === 0) {
                  bg = "white";
                  color = "black.800";
                }
                if (cardIndex % 3 === 0) {
                  bg = "red.600";
                  color = "white";
                }

                return (
                  <CardCatalog
                    bg={bg}
                    color={color}
                    title={categ.name}
                    text={categ.description}
                  />
                );
              })}
          </Grid>
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
    </SmoothScroll>
  );
};

const AdBanner = () => {
  return (
    <Image
      src="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
      alt="bateria"
      bgSize="contain"
      minH={{
        base: pxToRem(228),
        md: pxToRem(330),
        lg: pxToRem(425),
        xl: pxToRem(400),
      }}
    />
  );
};

export default AllProduct;
