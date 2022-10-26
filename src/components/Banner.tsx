import {
  Box,
  Container,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import Search from "../assets/icons/search.svg";
import Team from "../assets/images/temnacontemp.png";
import { Typewriter } from "react-simple-typewriter";

export const Banner = () => {
  return (
    <Flex
      w="full"
      bg="black.900"
      h="702px"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      backgroundImage={`url('./images/Banner.png')`}
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
    >
      <Container
        maxW="6xl"
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="100%"
      >
        <Box marginTop="157px" marginBottom="35px">
          <Image src={Team} width="200px" height="52" />
        </Box>
        <Flex alignItems="center" marginBottom="87px" minH="100px">
          <Text
            color="white"
            textAlign="center"
            fontSize={["1.3rem", "1.3rem", "2.3rem"]}
            fontWeight="bold"
          >
            Excelência em produtos:
            <Typewriter
              words={[" Indicadores de Temperatura e Processo"]}
              loop={0}
              cursor={true}
            />
          </Text>
        </Flex>
        <Flex w="100%" alignItems="center" flexDirection="column">
          <InputGroup
            borderRadius="21px"
            bg="red.600"
            p="3px 7px"
            w="100%"
            h="42px"
            maxW="594px"
            outline="none"
          >
            <Input
              w="100%"
              height="100%"
              border="none"
              borderRadius="21px"
              placeholder="Procure aqui seu produto"
              _focusVisible={{
                outline: "none",
              }}
            />
            <InputRightElement
              children={<Image src={Search} width="22px" height="22px" />}
            />
          </InputGroup>
          <Text
            fontSize="20px"
            color="white"
            textAlign="center"
            marginTop="15px"
          >
            Pesquise aqui o produto que precisa.
          </Text>
        </Flex>
      </Container>
    </Flex>
  );
};
