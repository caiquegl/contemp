import {
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import Search from "../assets/icons/search.svg";
import {
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineInstagram,
} from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { SearchBar } from "./SearchBar";
export const Footer = () => {
  return (
    <Container
      maxW="7xl"
      p={[
        "40px 20px 31px",
        "40px 20px 31px",
        "40px 20px 31px",
        "40px 20px 31px",
        "40px 10px 31px",
      ]}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        marginBottom="32px"
        flexDirection={["column", "column", "row", "row", "row"]}
      >
        <Flex
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          flexDirection={["column", "column", "row", "row", "row"]}
        >
          <Box>
            <Text fontWeight="bold" fontSize="30px" mb="15px">
              Procure o produto que deseja aqui
            </Text>
            <Text fontSize="20px" mb="15px">
              Se ainda não encontrou o produto que esteja procurando é só
              digitar ao lado.
            </Text>
          </Box>
          <SearchBar
            inputProps={{
              placeholder: "Procure aqui seu produto...",
            }}
          />
        </Flex>
      </Flex>
      <Divider mb="100px" />
      <Grid
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
        ]}
        w="100%"
      >
        <GridItem w="100%">
          <Text fontWeight="bold" fontSize="25px" mb="20px">
            Instrumentos
          </Text>
          <Text fontWeight="bold" fontSize="20px" mb="15px">
            Controladores de Temperatura e Processo
          </Text>
          <Box mb="20px">
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
          </Box>
        </GridItem>
        <GridItem w="100%">
          <Text fontWeight="bold" fontSize="25px" mb="20px">
            Sensores
          </Text>
          <Text fontWeight="bold" fontSize="20px" mb="15px">
            Termopares
          </Text>
          <Box mb="20px">
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
          </Box>
        </GridItem>
        <GridItem w="100%">
          <HStack spacing="20px" mb="40px">
            <Flex
              alignItems="center"
              justifyContent="center"
              w="50px"
              h="50px"
              borderRadius="full"
              bg="white.500"
            >
              <Icon as={AiFillLinkedin} fontSize="35px" color="black.200" />
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="center"
              w="50px"
              h="50px"
              borderRadius="full"
              bg="white.500"
            >
              <Icon as={AiFillYoutube} fontSize="35px" color="black.200" />
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="center"
              w="50px"
              h="50px"
              borderRadius="full"
              bg="white.500"
            >
              <Icon as={AiOutlineInstagram} fontSize="35px" color="black.200" />
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="center"
              w="50px"
              h="50px"
              borderRadius="full"
              bg="white.500"
            >
              <Icon as={FaFacebookF} fontSize="35px" color="black.200" />
            </Flex>
          </HStack>
          <Text fontWeight="bold" fontSize="25px" mb="20px">
            Imageamento Térmico Industrial
          </Text>
          <Text fontWeight="bold" fontSize="20px" mb="15px">
            Termopares
          </Text>
          <Box mb="20px">
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
            <Text fontSize="20px">
              I414 - Linha Econômica - Indicador de Temperatura e Processo
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};
