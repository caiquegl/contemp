import { Box, Button, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { BiPhone } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { pxToRem } from "../utils/pxToRem";

export const Catalog = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      width="100%"
      bg="black.800"
      minH="400px"
      p={["123px 20px", "123px 20px", "123px 20px", "123px 20px", "123px 0"]}
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

        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          w="100%"
          maxW={pxToRem(380)}
          margin="auto"
          h={{
            base: 120
          }}
          flexDirection={{
            base: 'column',
            md: 'row'
          }}
        >
          <Button
            width={{
              base: pxToRem(279),
              md: pxToRem(179),
            }}
            h="50px"
            borderRadius="25px"
            bg="red.600"
            fontSize={pxToRem(20)}
            _hover={{ transition: "all 0.5s", opacity: 0.7 }}
          >
            <Icon as={BiPhone} mr="10px" />
            Telefonar
          </Button>

          <Button
            width={{
              base: pxToRem(279),
              md: pxToRem(179),
            }}
            h="50px"
            borderRadius="25px"
            bg="red.600"
            fontSize={pxToRem(20)}
            _hover={{ transition: "all 0.5s", opacity: 0.7 }}
          >
            <Icon as={AiOutlineMail} mr="10px" />
            Enviar e-mail
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
