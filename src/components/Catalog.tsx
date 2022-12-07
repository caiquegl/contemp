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
import { Row, Col } from "antd"

export const Catalog = () => {
  return (
    <Box
      h={{
        base: pxToRem(600),
        md: pxToRem(400),
        lg: pxToRem(450),
        xl: pxToRem(500),
      }}

      p={{
        xl: pxToRem(20),
        lg: pxToRem(10),
        base: pxToRem(20)
      }}
    >


      {/* <Grid
          alignItems="center"
          templateColumns={{
            base: "1fr",
            lg: "repeat(2, 1fr)",
          }}
          h={{
            base: pxToRem(600),
            md: pxToRem(400),
            lg: pxToRem(450),
            xl: "max-content",
          }}
          width={{
            base: "100%",
            xl: "95%",
            "2xl": "75%",
          }}
          margin="auto"
          maxH={{
            base: "max-content",
            lg: pxToRem(650),
          }}
          p={{
            base: "70px 10px",
            lg: "75px 15px",
            xl: "120px 0",
            "2xl": "110px 0",
          }}
          position="relative"
          gridGap={{
            lg: 10,
            xl: 0,
          }}
        > */}
      <Row style={{ height: '100%' }}>
        <Col xs={24} sm={24} md={12} lg={12}>
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
              "2xl": pxToRem(750),
            }}
            height={{
              lg: pxToRem(700),
              xl: pxToRem(680),
              "2xl": pxToRem(700),
            }}
            gridColumn={1}
            bgSize={{
              base: 0,
              lg: "100%",
              xl: "contain",
            }}
            zIndex={99}
            position="absolute"
            top="-100px"
          />

        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Flex
            // gridColumn={{ base: 1, lg: 2 }}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            h="100%"
          >
            <Text
              textAlign="center"
              fontSize={{
                base: pxToRem(35),
                xl: pxToRem(45),
              }}
              fontWeight="bold"
              color="white"
            >
              CATÁLOGO
            </Text>
            <Text
              mt={{
                base: 10,
                lg: 5,
                xl: 10,
              }}
              mb={{
                base: pxToRem(20),
                lg: pxToRem(30),
              }}
              maxW={pxToRem(1000)}
              textAlign="center"
              fontSize={{
                base: pxToRem(18),
                xl: pxToRem(20),
                "2xl": pxToRem(24),
              }}
            >
              Quer baixar gratuitamente nosso catalogo digital de produtos? Basta
              entrar em contato e solicitar para um de nossos representantes.
              Através do número (11) 4223-5140 ou pelo e-mail vendas@contemp.com.br
            </Text>

            <Grid
              alignItems="center"
              justifyContent="center"
              w="100%"
              maxW={{
                lg: pxToRem(550),
                xl: pxToRem(720),
              }}

              templateColumns={{
                base: "repeat(auto-fit, minmax(220px, 1fr))",
                xl: "repeat(auto-fit, minmax(200px, 1fr))",
              }}
              autoRows={pxToRem(65)}
              gridGap={2}
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
            </Grid>
          </Flex>
        </Col>

      </Row>
    </Box >

  );
};

function ActionButton({ label, icon, ...props }: any & ButtonProps) {
  return (
    <Button
      w="100%"
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
