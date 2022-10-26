import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import dynamic from "next/dynamic";
import { AiOutlinePlayCircle } from "react-icons/ai";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export const Player = () => {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="center"
      p={["123px 20px", "123px 20px", "123px 20px", "123px 20px", "123px 0"]}
    >
      {!isMobile && (
        <Box w="100%" maxW={"700px"} mr="40px">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
            height="533px"
            width="100%"
          />
        </Box>
      )}
      <Box maxW="359px">
        <Text fontSize="40px" fontWeight="bold" mb="50px">
          Nova Linha de Controles e Indicadores
        </Text>
        <Text fontSize="20px" mb="57px">
          Logo abaixo nosso vídeo sobre Contemp C504 – Controlador de Processos.
        </Text>
        {isMobile ? (
          <VStack spacing="20px" alignItems="center">
            <Button
              w="179px"
              h="50px"
              borderRadius="25px"
              bg="red.600"
              fontSize="20px"
              _hover={{ transition: "all 0.5s", opacity: 0.7 }}
            >
              <Icon as={AiOutlinePlayCircle} mr="10px" />
              Vídeo 1
            </Button>
            <Button
              w="179px"
              h="50px"
              borderRadius="25px"
              bg="red.600"
              fontSize="20px"
              _hover={{ transition: "all 0.5s", opacity: 0.7 }}
            >
              <Icon as={AiOutlinePlayCircle} mr="10px" />
              Vídeo 2
            </Button>
          </VStack>
        ) : (
          <Box w="100%" maxW="359px" h="195px">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
              width="300px"
              height="195px"
            />
          </Box>
        )}
      </Box>
    </Flex>
  );
};
