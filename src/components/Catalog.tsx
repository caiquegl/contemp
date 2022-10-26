import { Box, Button, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { BiPhone } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";

export const Catalog = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      width="100%"
      bg="black.800"
      minH="400px"
    >
      <Box>
        <Text
          textAlign="center"
          fontSize="45px"
          fontWeight="bold"
          color="white"
        >
          CATÁLOGO
        </Text>
        <Text
          mt="40px"
          maxW="1000px"
          textAlign="center"
          fontSize="24px"
          mb="30px"
        >
          Quer baixar gratuitamente nosso catalogo digital de produtos? Basta
          entrar em contato e solicitar para um de nossos representantes.
          Através do número (11) 4223-5140 ou pelo e-mail vendas@contemp.com.br
        </Text>
        <Flex alignItems="center" justifyContent="center">
          <HStack spacing="24px">
            <Button
              w="179px"
              h="50px"
              borderRadius="25px"
              bg="red.600"
              fontSize="20px"
              _hover={{ transition: "all 0.5s", opacity: 0.7 }}
            >
              <Icon as={BiPhone} mr="10px" />
              Telefonar
            </Button>
            <Button
              w="179px"
              h="50px"
              borderRadius="25px"
              bg="red.600"
              fontSize="20px"
              _hover={{ transition: "all 0.5s", opacity: 0.7 }}
            >
              <Icon as={AiOutlineMail} mr="10px" />
              Enviar e-mail
            </Button>
          </HStack>
        </Flex>
      </Box>
    </Flex>
  );
};
