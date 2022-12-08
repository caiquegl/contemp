import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";

export const SelectConfigCalibration = () => {
  const [text, setText] = useState({
    title: "Calibrações de Termometria",
    description: [
      "Registradores",
      "Controladores",
      "Indicadores",
      "Sensores e Cabos",
      "Aquisitores de dados",
      "Termômetros de Líquido em vidro",
      "Termohigrômetros",
      "Termohigrógrafos",
      "Termômetros infravermelhos"
    ],
    index: 1,
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
              title: "Calibrações de Termometria",
              description: [
                "Registradores",
                "Controladores",
                "Indicadores",
                "Sensores e Cabos",
                "Aquisitores de dados",
                "Termômetros de Líquido em vidro",
                "Termohigrômetros",
                "Termohigrógrafos",
                "Termômetros infravermelhos"
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
          <Text>Calibrações de Termometria</Text>
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
          onMouseEnter={() =>
            setText({
              title: "Calibrações Dimensionais",
              description: [
                "blocos – padrão",
                "calibradores anel liso",
                "calibradores de torquímetro",
                "calibradores tampão liso",
                "calibradores de folga e raio",
                "comparador de diâmetro interno (súbito)",
                "desempenos",
                "dinamômetros",
                "durômetros Brinell",
                "durômetros Rockwell",
                "durômetros Shore",
                "durômetros Vickers",
                "esquadros",
                "goniômetros",
                "máquinas de ensaio de impacto",
                "máquinas de ensaio de tração e compressão",
                "medidores de altura",
                "medidores de espessura",
                "micrômetros",
                "micrômetros internos (imicros)",
                "microscópio",
                "níveis",
                "paquímetros",
                "peneiras granulométricas",
                "projetores de perfil",
                "réguas graduadas",
                "relógios apalpadores",
                "relógios comparadores",
                "torquímetros",
                "transferidores de ângulo",
                "trenas",
              ],
              index: 2,
            })
          }
          _hover={{
            transition: "all 0.4s",
            bg: "white.500",
            color: "red.600",
            fontWeight: "bold",
          }}
        >
          <Text>Calibrações Dimensionais</Text>
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
          onMouseEnter={() =>
            setText({
              title: "Calibrações de Processos",
              description: [
                "manômetros",
                "vacuômetros",
                "transdutores",
                "tensão contínua",
                "tensão alternada",
                "corrente alternada",
                "corrente contínua",
                "cronômetros",
                "temporizador",
                "contadores",
                "medidores de pH",
                "medidores de condutividade",
                "vidrarias",
                "balanças em geral",

              ],
              index: 3,
            })
          }
          _hover={{
            transition: "all 0.4s",
            bg: "white.500",
            color: "red.600",
            fontWeight: "bold",
          }}
        >
          <Text>Calibrações de Processos</Text>
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
