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
          onMouseEnter={() =>
            setText({
              title: "Controlador de Processos C715",
              description: [
                "1. Como configurar os sensores?",
                "Segure a tecla ↵ até aparecer CONF aperte a tecla ▼até o parâmetro IN.TY, aperte a tecla ↵ o parâmetro configurado irá piscar, altere para a configuração desejada utilizando as teclas ▼ou ▲, aperte a tecla ↵ para confirmar, segure a tecla ↵ até voltar na tela inicial.",
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
          onMouseEnter={() =>
            setText({
              title: "Controlador de Processos C719",
              description: [
                "1. Como configurar os sensores?",
                "Segure a tecla ↵ até aparecer CONF aperte a tecla ▼até o parâmetro IN.TY, aperte a tecla ↵ o parâmetro configurado irá piscar, altere para a configuração desejada utilizando as teclas ▼ou ▲, aperte a tecla ↵ para confirmar, segure a tecla ↵ até voltar na tela inicial.",
                "       2. Como fazer Auto-Sintonia",
                "       1° Assegurar que o controlador está instalado e configurado corretamente",
                "       2° Assegurar que os alarmes não vão interferir no processo durante a auto-sintonia.",
                "       3° Assegurar que o atuador responde ao comando do controlador.",
                "       4° Não utilizar o programa de rampas e patamares durante este procedimento.",
                "       5° Ajustar o set-point SP mais comum ao processo.",
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
          onMouseEnter={() =>
            setText({
              title: "Controlador de Processos C304",
              description: [
                "1. Como configurar o sensor J, K, PT100?",
                "Segure a tecla * até aparecer CONF aperte a tecla ▼até o parâmetro IN.TY, aperte a tecla ↵ o parâmetro configurado irá piscar, altere para a configuração desejada utilizando as teclas ▼ou ▲, aperte a tecla ↵ para confirmar, segure a tecla * até voltar na tela inicial.",
                "       2. Como fazer Auto-Sintonia",
                "       1° Assegurar que o controlador está instalado e configurado corretamente",
                "       2° Assegurar que os alarmes não vão interferir no processo durante a auto-sintonia.",
                "       3° Assegurar que o atuador responde ao comando do controlador.",
                "       4° Não utilizar o programa de rampas e patamares durante este procedimento.",
                "       5° Ajustar o set-point SP mais comum ao processo.",
                "       6° Segure a tecla * até aparecer CONF aperte a tecla ▼até o parâmetro A.T, aperte a tecla ↵ irá piscar OFF, altere para ON, o led AT vai piscar segure a tecla * até voltar na tela inicial.",
                "       7° Não interferir no processo antes de encerrada a sintonia automática, quando o led A.T, parar de piscar.",
              ],
              index: 4,
            })
          }
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
          onMouseEnter={() =>
            setText({
              title: "Controlador de Processos C414",
              description: [
                "1. Como configurar o sensor J, K, PT100?",
                "Segure a tecla * até aparecer CONF aperte a tecla ▼até o parâmetro IN.TY, aperte a tecla ↵ o parâmetro configurado irá piscar, altere para a configuração desejada utilizando as teclas ▼ou ▲, aperte a tecla ↵ para confirmar, segure a tecla * até voltar na tela inicial.",
                "       2. Como fazer Auto-Sintonia",
                "       1° Assegurar que o controlador está instalado e configurado corretamente. 2° Assegurar que os alarmes não vão interferir no processo durante a auto-sintonia. 3° Assegurar que o atuador responde ao comando do controlador. 4° Não utilizar o programa de rampas e patamares durante este procedimento. 5° Ajustar o set-point SP mais comum ao processo. 6° Segure a tecla * até aparecer CONF aperte a tecla ▼até o parâmetro A.T, aperte a tecla ↵ irá piscar OFF, altere para ON, o led AT vai piscar segure a tecla * até voltar na tela inicial. 7° Não interferir no processo antes de encerrada a sintonia automática, quando o led A.T, parar de piscar.",
              ],
              index: 5,
            })
          }
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
          onMouseEnter={() =>
            setText({
              title: "Controlador de Processos C417",
              description: [
                "1. Como configurar o sensor J, K, PT100?",
                "Segure a tecla * até aparecer CONF aperte a tecla ▼até o parâmetro IN.TY, aperte a tecla ↵ o parâmetro configurado irá piscar, altere para a configuração desejada utilizando as teclas ▼ou ▲, aperte a tecla ↵ para confirmar, segure a tecla * até voltar na tela inicial.",
                "       2. Como fazer Auto-Sintonia",
                "       1° Assegurar que o controlador está instalado e configurado corretamente. 2° Assegurar que os alarmes não vão interferir no processo durante a auto-sintonia. 3° Assegurar que o atuador responde ao comando do controlador. 4° Não utilizar o programa de rampas e patamares durante este procedimento. 5° Ajustar o set-point SP mais comum ao processo. 6° Segure a tecla * até aparecer CONF aperte a tecla ▼até o parâmetro A.T, aperte a tecla ↵ irá piscar OFF, altere para ON, o led AT vai piscar segure a tecla * até voltar na tela inicial. 7° Não interferir no processo antes de encerrada a sintonia automática, quando o led A.T, parar de piscar.",
              ],
              index: 6,
            })
          }
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
          onMouseEnter={() =>
            setText({
              title: "Como configurar o controle 4 a 20ma no C514 e C515?",
              description: [
                "1. Como configurar o controle 4 a 20ma no C514 e C515?",
                "Segure a tecla * até aparecer CONF aperte a tecla ▼até o parâmetro IN.TY, aperte a tecla ↵ o parâmetro configurado irá piscar, altere para a configuração desejada utilizando as teclas ▼ou ▲, aperte a tecla ↵ para confirmar, segure a tecla * até voltar na tela inicial.",
                "       2. Como configurar a saída analógica para controle?",
                "       Segure a tecla * até aparecer CONF aperte a tecla ▼até o parâmetro CONT, aperte a tecla ↵ o parâmetro configurado irá piscar, altere para Ao utilizando as teclas ▼ou ▲, aperte a tecla ↵ para confirmar, aperte a tecla ▼até o parâmetro Aoc, aperte a tecla ↵ o parâmetro configurado irá piscar, altere para a saída desejada Pulso ou 4 a 20ma utilizando as teclas ▼ou ▲, aperte a tecla ↵ para confirmar, segure a tecla * até voltar na tela inicial.",
                "       3. Como configurar a saída analógica para retransmissão?",
                "       Segure a tecla * até aparecer CONF aperte a tecla ▼até o parâmetro CONT, aperte a tecla ↵ o parâmetro configurado irá piscar, altere para RL2 utilizando as teclas ▼ou ▲, aperte a tecla ↵ para confirmar, aperte a tecla ▼até o parâmetro Ao.PV, aperte a tecla ↵",
                "       O parâmetro configurado irá piscar, altere para a saída de retransmissão desejada 0 a 20ma ou 4 a 20ma utilizando as teclas ▼ou ▲, aperte a tecla ↵ para confirmar, segure a tecla * até voltar na tela inicial.",
                "       4. Como configurar a entrada para transmissores de pressão?",
                "       Segure a tecla * até aparecer CONF aperte a tecla ▼até o parâmetro IN.TY, aperte a tecla ↵ o parâmetro configurado irá piscar, altere para 4 – 20, utilizando as teclas ▼ou ▲, aperte a tecla ↵ para confirmar, aperte a tecla ▼até o parâmetro IN.L configure 0 utilizando as teclas ▼ou ▲, aperte a tecla ↵ para confirmar, aperte a tecla ▼até o parâmetro IN.H altere para 10 utilizando as teclas ▼ou ▲ aperte a tecla ↵ para confirmar, segure a tecla * até voltar na tela inicial. Obs: No modelo C514 ligar o positivo do sensor no borne 12 e o negativo do sensor no borne 10, no modelo C515 ligar o positivo do sensor no borne 7, e negativo do sensor no borne 4.",
                "       5. Como configurar a entrada para sensor temperatura/umidade Ambiente S501A?",
                "       CONTROLADOR 1 (TEMPERATURA)",
                "       Segure a tecla * até aparecer CONF aperte a tecla ▼até o parâmetro IN.TY, aperte a tecla ↵ o parâmetro configurado irá piscar, altere para 4 – 20, utilizando as teclas ▼ou ▲, aperte a tecla ↵ para confirmar, aperte a tecla ▼até o parâmetro IN.L configure 0 utilizando as teclas ▼ou ▲, aperte a tecla ↵ para confirmar, aperte a tecla ▼até o parâmetro IN.H altere para 60 utilizando as teclas ▼ou ▲ aperte a tecla ↵ para confirmar, segure a tecla * até voltar na tela inicial. Obs: No modelo C514 ligar o positivo do loop1 no borne 12 e o negativo do loop 1 no borne 10, no modelo C515 ligar o positivo do loop1 no borne 7, e negativo do loop1 no borne.",
                "       CONTROLADOR 2 (UMIDADE)",
                "       Segure a tecla * até aparecer CONF aperte a tecla ▼até o parâmetro IN.TY, aperte a tecla ↵ o parâmetro configurado irá piscar, altere para 4 – 20, utilizando as teclas ▼ou ▲, aperte a tecla ↵ para confirmar, aperte a tecla ▼até o parâmetro IN.L configure 0 utilizando as teclas ▼ou ▲, aperte a tecla ↵ para confirmar, aperte a tecla ▼até o parâmetro IN.H altere para 100 utilizando as teclas ▼ou ▲ aperte a tecla ↵ para confirmar, segure a tecla * até voltar na tela inicial. Obs: No modelo C514 ligar o positivo do loop1 no borne 12 e o negativo do loop 1 no borne 10, no modelo C515 ligar o positivo do loop1 no borne 7, e negativo do loop1 no borne.",
                "       6. Como configurar a entrada para S200?",
                "       EXEMPLO = S201, S202, S211,S212, S221 – PT100, ESCALA 0 A 100°C, 4 A 20ma. Segure a tecla * até aparecer CONF aperte a tecla ▼até o parâmetro IN.TY, aperte a tecla ↵ o parâmetro configurado irá piscar, altere para 4 – 20, utilizando as teclas ▼ou ▲, aperte a tecla ↵ para confirmar, aperte a tecla ▼até o parâmetro IN.L configure 0 utilizando as teclas ▼ou ▲, aperte a tecla ↵ para confirmar, aperte a tecla ▼até o parâmetro IN.H altere para 100 utilizando as teclas ▼ou ▲ aperte a tecla ↵ para confirmar, segure a tecla * até voltar na tela inicial. Obs: No modelo C514 ligar o borne do 5 do S200 no borne 12 do C514 e borne 6 do S200 no borne 10 do C514 e no modelo C515 ligar o borne do 5 do S200 no borne 7 do C515 e borne 6 do S200 no borne 4 do C515",
              ],
              index: 7,
            })
          }
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
