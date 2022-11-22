import {
  Container,
  Flex,
  Text,
  Box,
  HStack,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper";
import CardProduct from "./CardProduct";
import { pxToRem } from "../utils/pxToRem";
import { Image } from "./Image";
import { ProductCategoryWithIcon } from "./ProductCategoryWithIcon";
import Pirometro from "../assets/icons/pritometro_white.svg";

const products = [] as number[];

for (let i = 0; i < 10; i++) {
  products.push(i + 1);
}

export const Favorite = () => {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const isTablet = useBreakpointValue({
    md: true,
    lg: false,
  });

  const isDesktop = useBreakpointValue({
    lg: true,
    xl: false,
  });

  const isLargeDesktop = useBreakpointValue({
    xl: true,
    "2xl": false,
  });

  const swiperWidth = () => {
    if (isMobile) {
      return pxToRem(253);
    }

    if (isTablet) {
      return pxToRem(600);
    }

    if (isDesktop) {
      return pxToRem(780);
    }

    if (isLargeDesktop) {
      return pxToRem(1200);
    }

    return "auto";
  };

  const slidesPerView = (): number => {
    if (isMobile) {
      return 1;
    }

    if (isTablet) {
      return 2;
    }

    if (isDesktop) {
      return 3;
    }

    if (isLargeDesktop) {
      return 4;
    }

    return 5;
  };

  return (
    <Container
      maxW="8xl"
      p={[
        "12px 20px 31px 20px",
        "12px 20px 31px 20px",
        "12px 20px 31px 20px",
        "12px 0 31px",
        "12px 0 31px",
      ]}
      position="relative"
    >
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
      <Flex h={pxToRem(250)}>
        <Swiper
          slidesPerView={slidesPerView()}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          spaceBetween={isTablet ? 20 : 30}
          pagination
          modules={[Autoplay, Pagination]}
          className="mySwiper"
          style={{
            margin: "auto",
            width: swiperWidth(),
          }}
        >
          {products.map((item) => (
            <SwiperSlide>
              <CardProduct
                img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
                text={`Teste ${item}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Flex>
      <Flex
        alignItems="center"
        mt="200px"
        mb="53px"
        flexDirection={["column", "column", "row", "row", "row"]}
      >
        <Image
          flex={1}
          src="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
          alt="bateria"
          minH={pxToRem(320)}
          bgSize={{
            base: "95%",
            md: "90%",
            lg: "76%",
            xl: "55%",
          }}
          marginBottom={{
            base: pxToRem(20),
            lg: 0,
          }}
        />

        <Box w="100%" flex={1}>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            w={{
              base: "100%",
              xl: "80%",
              "2xl": "98%",
            }}
          >
            <Text fontWeight="bold" fontSize={pxToRem(60)}>
              C714
            </Text>

            <ProductCategoryWithIcon
              title="Controladores de Temperatura e Processos"
              icon={Pirometro}
              containerProps={{
                borderColor: "red.600",
              }}
            />
          </Flex>
          <Text
            textAlign="justify"
            mt="27px"
            mb="28px"
            fontSize={pxToRem(20)}
            w={{
              base: "95%",
              xl: "80%",
              "2xl": "98%",
            }}
          >
            Os Controladores de Temperatura e Processos C714 – Linha Avançada,
            foram projetados com tecnologia nacional de ponta para serem
            versáteis, robustos e de fácil uso.
          </Text>

          <Flex alignItems="center" w="80%" maxW={pxToRem(220)}>
            <Button
              border="2px solid white"
              borderRadius="25px"
              width="157px"
              height="50px"
              mr="15px"
              bg="transparent"
              _hover={{
                bg: "white",
                color: "black.800",
                transition: "all 0.3s",
              }}
            >
              Veja mais
            </Button>

            <Image src={Pirometro} bgSize={pxToRem(40)} minH={pxToRem(40)} />
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};
