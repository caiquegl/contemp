import { Box, Button, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";

interface IProps {
  bg: string;
  color: string;
  title: string;
  text: string;
  img: string;
}

export const CardBlog = ({ bg, color, title, text, img }: IProps) => {
  return (
    <GridItem
      bg={bg}
      minH="651px"
      p="30px"
      alignItems="center"
      justifyContent="space-between"
      w="100%"
      display="flex"
    >
      <Box
        w="100%"
        maxW="474px"
        minH="590px"
        borderRadius="8px"
        border="2px solid"
        borderColor={color}
        p="20px"
        margin="auto"
      >
        <Image src={img} alt="bateria" w="100%" maxH="300px" />
        <Text fontWeight="bold" fontSize="25px" mt="20px" color={color}>
          {title}
        </Text>
        <Text fontSize="18px" mt="20px" color={color}>
          {text}
        </Text>
        <Button
          borderRadius="30px"
          w="200px"
          h="50px"
          textAlign="center"
          mt="20px"
          bg="none"
          border="2px solid"
          borderColor={color}
          color={color}
          _hover={{
            transition: "all 0.4s",
            bg: "none",
            opacity: 0.7,
          }}
        >
          Veja mais
        </Button>
      </Box>
    </GridItem>
  );
};
