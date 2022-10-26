import { Box, Button, Flex, GridItem, Image, Text } from "@chakra-ui/react";
import { useState } from "react";

interface IProps {
  bg: string;
  text: string;
  title: string;
  color: string;
  img: string;
}
const CardCatalog = ({ bg, text, title, color, img }: IProps) => {
  return (
    <GridItem
      w={["100%", "100%", "300px", "300px", "300px", "335px"]}
      mb={["50px", "50px", "0", "0", "0", "0"]}
      h={["860px", "860px", "760px", "760px", "760px", "760px"]}
      bg={bg}
      borderRadius="8px"
      p="27px 17px"
    >
      <Box h="100%" boxSizing="content-box">
        <Image src={img} mb="15px" />
        <Box w="41px" h="41px" borderRadius="5px" bg={color} mb="7px" />
        <Text color={color} fontSize="35px" fontWeight="bold" mb="20px">
          {title}
        </Text>
        <Text color={color} fontSize="20px" mb="30px">
          {text}
        </Text>
        <Flex w="100%" alignItems="center" justifyContent="center">
          <Button
            color={color}
            border="2px solid"
            borderColor={color}
            borderRadius="25px"
            w="243px"
            h="50px"
            bg="tranparent"
            fontSize="20px"
            _hover={{
              transition: "all 0.4s",
              opacity: 0.6,
            }}
          >
            Solicitar orçamento
          </Button>
        </Flex>
      </Box>
    </GridItem>
  );
};

export default CardCatalog;
