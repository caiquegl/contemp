import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export const Player = () => {
  return (
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
          Logo abaixo nosso vídeo sobre Contemp C504 – Controlador de Processos.
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
  );
};
