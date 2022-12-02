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
import { useSidebarDrawer } from "../contexts/SidebarDrawerContexts";
import { useAuth } from "../contextAuth/authContext";
export const Footer = () => {
  const { listHeader } = useAuth();

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
        {listHeader && listHeader.length > 0 && listHeader.map((el: any, index: number) => (
          <GridItem w="100%">
            {index === 2 &&
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
            }
            <Text fontWeight="bold" fontSize="25px" mb="20px">
              {el.name}
            </Text>
            {el.list_sub_category && el.list_sub_category.length > 0 && el.list_sub_category.map((el2: any) => (
              <>
                <Text fontWeight="bold" fontSize="20px" mb="15px">
                  {el.name}
                </Text>
                <Box mb="20px">
                  {el2.list_sub_category && el2.list_sub_category.length > 0 && el2.list_sub_category.map((el3: any) => (
                    <Text fontSize="20px">
                      {el3.name}
                    </Text>
                  ))}
                </Box>
              </>
            ))}
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};
