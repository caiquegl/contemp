import {
  Container,
  Flex,
  Text,
  Box,
  Button,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper";
import CardProduct from "./CardProduct";
import { pxToRem } from "../utils/pxToRem";
import { Image } from "./Image";
import { ProductCategoryWithIcon } from "./ProductCategoryWithIcon";
import { useRouter } from "next/router";
import { useAuth } from "../contextAuth/authContext";
import { v4 as uuidv4 } from 'uuid';
import { useWindowSize } from "../utils/useWindowSize";

export const Favorite = () => {
  const windowSize = useWindowSize()

  const [maxWidth] = useState(930)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (windowSize) {
      setWidth(windowSize?.width as number)
    } else {
      setWidth(window.innerWidth)
    }
  }, [windowSize])

  const { allProductsActive, allProductsHome, allCategoryActive } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const [products, setProducts] = useState<any>([]);
  const [homeTabs, setHomeTabs] = useState<any>({});
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

  const listProductDestaque = async () => {
    try {
      let newList: any = [];

      allProductsActive.forEach((el: any) => {
        if (el.destaque) {
          newList.push({
            ...el,
            nameCategory: allCategoryActive.find(
              (ec: any) => ec.id == el.category
            ).name,
          });
        }
      });

      allProductsHome.forEach((el: any) => {
        if (el.destaque) {
          newList.push({
            ...el,
            nameCategory: allCategoryActive.find(
              (ec: any) => ec.id == el.category
            ).name,
          });
        }
      });
      setProducts(newList);
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro",
        description: "Erro ao listar destaques",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getHomeTab1 = async () => {
    try {
      let find = allProductsHome.find((el: any) => el.indexProduct == 0);
      let tab1 = {
        ...find,
        nameCategory: allCategoryActive.find(
          (el: any) => el.id == find.category
        ).name,
      };

      if (Object.keys(tab1).length === 0) return;
      setHomeTabs({ ...homeTabs, tab1 });
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro",
        description: "Erro ao listar destaques",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (
      allCategoryActive.length > 0 &&
      allProductsActive.length > 0 &&
      allProductsHome.length > 0
    ) {
      listProductDestaque();
      getHomeTab1();
    }
  }, [allCategoryActive, allProductsActive, allProductsHome]);

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
        mt={width > maxWidth ? '80px' : '20px'}
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
      <Flex h={pxToRem(250)} w="100%">
        <Swiper
          loop={true}
          slidesPerView={slidesPerView()}
          autoplay={{
            delay: 2000,
          }}
          initialSlide={0}
          speed={1000}
          spaceBetween={isTablet ? 20 : 30}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
          style={{
            margin: "auto",
            width: "100%",
            alignItems: "center",
          }}
        >
          {products.map((item: any) => (
            <SwiperSlide style={{ width: "100%" }} key={uuidv4()}>
              <CardProduct
                img={item.urls && item.urls.length > 0 && item.urls[0]}
                text={item.name}
                categoryName={item.nameCategory}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Flex>
      {homeTabs.tab1 && (
        <Flex
          alignItems="center"
          mt="200px"
          mb="53px"
          flexDirection={["column", "column", "row", "row", "row"]}
        >
          <Image
            flex={1}
            src={homeTabs.tab1.urls[0]}
            alt={homeTabs.tab1.name}
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
            cursor="pointer"
            onClick={() =>
              router.push(`/produto/${homeTabs.tab1.name.replaceAll(" ", "_")}`)
            }
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
                {homeTabs.tab1.name}
              </Text>

              <ProductCategoryWithIcon
                title={homeTabs.tab1.nameCategory}
                icon={homeTabs.tab1.icon}
                containerProps={{
                  borderColor: "red.600",
                  color: "white",
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
              {homeTabs.tab1.description}
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
                onClick={() =>
                  router.push(
                    `/produto/${homeTabs.tab1.name.replaceAll(" ", "_")}`
                  )
                }
              >
                Veja mais
              </Button>
            </Flex>
          </Box>
        </Flex>
      )}
    </Container>
  );
};
