import {
  Container,
  Flex,
  Text,
  Box,
  HStack,
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
import { database, initFirebase } from "../utils/db";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";

export const Favorite = () => {
  initFirebase();
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

  const listProductDestaque = async () => {
    try {
      const dbInstance = collection(database, "products");
      const dbInstanceHome = collection(database, "home");
      let newList: any = [];
      const q = query(dbInstance, where("destaque", "==", true));
      const qHome = query(dbInstanceHome, where("destaque", "==", true));

      await getDocs(q).then(async (data) => {
        for await (let pd of data.docs) {
          const docRef = doc(database, "categories", pd.data().category);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            newList.push({
              ...pd.data(),
              id: pd.id,
              ref: pd.ref,
              nameCategory: docSnap.data().name,
            });
          }
        }
      });

      await getDocs(qHome).then(async (data) => {
        for await (let pd of data.docs) {
          const docRef = doc(database, "categories", pd.data().category);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            newList.push({
              ...pd.data(),
              id: pd.id,
              ref: pd.ref,
              nameCategory: docSnap.data().name,
            });
          }
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
      const dbInstanceHome = collection(database, "home");
      let tab1: any = {};
      const qHome = query(
        dbInstanceHome,
        where("indexProduct", "==", 0),
        limit(1)
      );

      await getDocs(qHome).then(async (data) => {
        if (data.docs.length === 0) return;
        tab1 = data.docs[0].data();
        const docRef = doc(
          database,
          "categories",
          data.docs[0].data().category
        );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          tab1 = { ...tab1, nameCategory: docSnap.data().name };
        }
      });

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
    listProductDestaque();
    getHomeTab1();
  }, []);

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
      <Flex h={pxToRem(250)} w="100%">
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
            width: "100%",
            // maxWidth: swiperWidth(),
          }}
        >
          {products.map((item: any) => (
            <SwiperSlide style={{ width: '100%' }}>
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
              router.push(
                `/produto/${homeTabs.tab1.name.replaceAll(" ", "_")}`
              )
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
              {/* 
              <Image
                src={homeTabs.tab1.icon}
                bgSize={pxToRem(40)}
                minH={pxToRem(40)}
              /> */}
            </Flex>
          </Box>
        </Flex>
      )}
    </Container>
  );
};
