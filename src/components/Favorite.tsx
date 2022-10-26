import {
  Container,
  Flex,
  Text,
  Image as ImageChakra,
  Box,
  HStack,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";
import CardProduct from "./CardProduct";
import Image from "next/image";
import Controls from "../assets/icons/Controladores.png";
import Pirometro from "../assets/icons/Pirometro-certo.png";

export const Favorite = () => {
  return (
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
      <Box h="250px">
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
      </Box>
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
  );
};
