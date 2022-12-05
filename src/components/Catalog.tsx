import {
  Box,
  Button,
  ButtonProps,
  Flex,
  Grid,
  Icon,
  Link,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BiPhone } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { pxToRem } from "../utils/pxToRem";
import CatalogImg from "../assets/images/catalogo-936x1024.png.webp";
import { Image } from "./Image";

export const Catalog = () => {
  return (
    <Grid
      alignItems="center"
      templateColumns={{
        base: "1fr",
        lg: "repeat(2, 1fr)",
      }}
      width={{
        base: "100%",
        xl: "95%",
        "2xl": "65%",
      }}
      margin="auto"
      maxH={{
        base: "auto",
        lg: pxToRem(600),
      }}
      p={{
        base: "123px 10px",
        xl: "123px 0",
      }}
      position="relative"
    >
      <Image
        src={CatalogImg}
        display={{
          base: "none",
          lg: "flex",
        }}
        width={{
          base: pxToRem(400),
          lg: pxToRem(500),
          xl: pxToRem(700),
        }}
        height={{
          lg: pxToRem(1000),
        }}
        gridColumn={1}
        bgSize={{
          base: 0,
          lg: "80%",
          xl: "contain",
        }}
        zIndex={99}
        position="absolute"
      />

      <Flex
        gridColumn={{ base: 1, lg: 2 }}
        flexDirection="column"
        alignItems="center"
      >
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
          fontSize={pxToRem(24)}
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
          maxW={pxToRem(600)}
          margin="auto"
          h={{
            base: pxToRem(200),
          }}
          flexDirection={{
            base: "column",
            md: "row",
          }}
        >
          <Link
            href="tel:1142235140"
            _hover={{ textDecoration: "none", color: "#fff" }}
          >
            <ActionButton label={"Telefonar"} icon={BiPhone} />
          </Link>

          <Link
            href="mailto:vendas@contemp.com.br"
            _hover={{ textDecoration: "none", color: "#fff" }}
          >
            <ActionButton label={"Enviar e-mail"} icon={AiOutlineMail} />
          </Link>

          <ActionButton label={"Download"} icon={FiDownload} />
        </Flex>
      </Flex>
    </Grid>
  );
};

function ActionButton({ label, icon, ...props }: any & ButtonProps) {
  return (
    <Button
      w={{
        lg: "100%",
      }}
      maxW={{
        base: pxToRem(279),
        md: pxToRem(179),
      }}
      h="50px"
      borderRadius="25px"
      bg="red.600"
      fontSize={pxToRem(20)}
      _hover={{ transition: "all 0.5s", opacity: 0.7 }}
      {...props}
    >
      <Icon as={icon} mr="10px" />
      {label}
    </Button>
  );
}
