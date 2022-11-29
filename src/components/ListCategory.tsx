import { Box, Container, Flex, HStack } from "@chakra-ui/react";
import React from "react";
import Category from "../pages/category/[category]";
import { pxToRem } from "../utils/pxToRem";
import CardProductWithDescription from "./CardProductWithDescription";


export const ListCategory = ({ bg, data }: any) => {
  
  return (
    <Flex
    w="100%"
    alignItems="center"
    bg={bg}
    p={["0 20px", "0 20px", "0 20px", "0 20px", "0"]}
  >
    <Container maxW="8xl" p="80px 0">
      <HStack spacing="20px">
      {data && data.length > 0 && data.map((catg:any) => (
      <Box h={pxToRem(650)} mt="31px">
        <CardProductWithDescription
          img={catg.urls && catg.urls[0] ? catg.urls[0] : ''}
          text={catg?.name}
          description={catg?.description}
          color={bg == 'red.600' || bg == 'black.800' ? 'white' : undefined}
          buttomBottom={bg == 'red.600' ? 'white' : undefined}
        />
      </Box>
      ))}
      </HStack>
    </Container>
  </Flex>
  );
};
