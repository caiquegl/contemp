import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";

export const SelectConfig = () => {
  const [text, setText] = useState({
    title: "",
    description: [""],
    index: 0,
  });
  return (
    <Flex
      w="100%"
      justifyContent="center"
      flexDirection={["column", "column", "row", "row", "row"]}
    >
      <Box>
        <Flex
          p="16px 20px"
          fontSize="20px"
          justifyContent="flex-end"
          borderLeftRadius="5px"
          textAlign="end"
          color={text.index == 1 ? "red.600" : "black.800"}
          maxW="367px"
          w="100%"
          bg={text.index == 1 ? "white.500" : "white"}
          minH="57px"
          fontWeight={text.index == 1 ? "bold" : "normal"}
          onMouseEnter={() =>
            setText({
              title: "Controlador de Processos C714",
              description: [
                "1. Como configurar os sensores?",
                "Segure a tecla ↵ até aparecer CONF aperte a tecla ▼até o parâmetro IN.TY, aperte a tecla ↵ o parâmetro configurado irá piscar, altere para a configuração desejada utilizando as teclas ▼ou ▲, aperte a tecla ↵ para confirmar, segure a tecla ↵ até voltar na tela inicial.",
              ],
              index: 1,
            })
          }
          alignItems="center"
          _hover={{
            transition: "all 0.4s",
            bg: "white.500",
            color: "red.600",
            fontWeight: "bold",
          }}
        >
          <Text>Controlador de Processos C714</Text>
        </Flex>
        <Flex
          p="16px 20px"
          fontSize="20px"
          justifyContent="flex-end"
          borderLeftRadius="5px"
          textAlign="end"
          color="black.800"
          maxW="367px"
          w="100%"
          minH="57px"
          alignItems="center"
          _hover={{
            transition: "all 0.4s",
            bg: "white.500",
            color: "red.600",
            fontWeight: "bold",
          }}
        >
          <Text>Controlador de Processos C715</Text>
        </Flex>
        <Flex
          p="16px 20px"
          fontSize="20px"
          justifyContent="flex-end"
          borderLeftRadius="5px"
          textAlign="end"
          color="black.800"
          maxW="367px"
          w="100%"
          minH="57px"
          alignItems="center"
          _hover={{
            transition: "all 0.4s",
            bg: "white.500",
            color: "red.600",
            fontWeight: "bold",
          }}
        >
          <Text>Controlador de Processos C719</Text>
        </Flex>
        <Flex
          p="16px 20px"
          fontSize="20px"
          justifyContent="flex-end"
          borderLeftRadius="5px"
          textAlign="end"
          color="black.800"
          maxW="367px"
          w="100%"
          minH="57px"
          alignItems="center"
          _hover={{
            transition: "all 0.4s",
            bg: "white.500",
            color: "red.600",
            fontWeight: "bold",
          }}
        >
          <Text>Controlador de Processos C304</Text>
        </Flex>
        <Flex
          p="16px 20px"
          fontSize="20px"
          justifyContent="flex-end"
          borderLeftRadius="5px"
          textAlign="end"
          color="black.800"
          maxW="367px"
          w="100%"
          minH="57px"
          alignItems="center"
          _hover={{
            transition: "all 0.4s",
            bg: "white.500",
            color: "red.600",
            fontWeight: "bold",
          }}
        >
          <Text>Controlador de Processos C414</Text>
        </Flex>
        <Flex
          p="16px 20px"
          fontSize="20px"
          justifyContent="flex-end"
          borderLeftRadius="5px"
          textAlign="end"
          color="black.800"
          maxW="367px"
          w="100%"
          minH="57px"
          alignItems="center"
          _hover={{
            transition: "all 0.4s",
            bg: "white.500",
            color: "red.600",
            fontWeight: "bold",
          }}
        >
          <Text>Controlador de Processos C417</Text>
        </Flex>
        <Flex
          p="16px 20px"
          fontSize="20px"
          justifyContent="flex-end"
          borderLeftRadius="5px"
          textAlign="end"
          color="black.800"
          maxW="367px"
          w="100%"
          minH="57px"
          alignItems="center"
          _hover={{
            transition: "all 0.4s",
            bg: "white.500",
            color: "red.600",
            fontWeight: "bold",
          }}
        >
          <Text>Controlador de Processos C514 e C515</Text>
        </Flex>
      </Box>

      <Box
        w="100%"
        minH="563px"
        borderRightRadius="5px"
        bg="white.500"
        p="58px"
      >
        {text.title && (
          <>
            <Text color="red.600" fontSize="25px" fontWeight="bold" mb="10px">
              {text.title}
            </Text>
            {text.description.length > 0 &&
              text.description.map((value) => (
                <Text color="black.800" fontSize="20px" mb="10px">
                  {value}
                </Text>
              ))}
          </>
        )}
      </Box>
    </Flex>
  );
};
