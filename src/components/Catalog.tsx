import { Box, Button, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { BiPhone } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { pxToRem } from "../utils/pxToRem";
import Image from "next/image";
import CatalogImg from '../assets/images/catalogo-936x1024.png.webp'
export const Catalog = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="row"
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
          maxW={pxToRem(580)}
          margin="auto"
          h={{
            base: 200,
          }}
          flexDirection={{
            base: "column",
            md: "row",
          }}
        >
          <ActionButton label={"Telefonar"} icon={BiPhone} />
          <ActionButton label={"Enviar e-mail"} icon={AiOutlineMail} />
          <ActionButton label={"Download"} icon={FiDownload} />
        </Flex>
      </Box>
    </Flex>
  );
};

function ActionButton({ label, icon }: any) {
  return (
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
      <Icon as={icon} mr="10px" />
      {label}
    </Button>
  );
}
