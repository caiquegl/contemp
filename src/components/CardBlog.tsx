import React from "react";
import { Box, Button, GridItem, Text } from "@chakra-ui/react";
import { Image } from './Image'
import { pxToRem } from "../utils/pxToRem";

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
        maxW={pxToRem(474)}
        minH={pxToRem(590)}
        borderRadius="8px"
        border="2px solid"
        borderColor={color}
        p={pxToRem(20)}
        margin="auto"
      >
        <Image src={img} alt="bateria" w="100%" h={pxToRem(300)} />

        <Text fontWeight="bold" fontSize={pxToRem(25)} mt="20px" color={color}>
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
            bg: color,
            color: bg,
            transition: "all 0.3s",
          }}
        >
          Veja mais
        </Button>
      </Box>
    </GridItem>
  );
};
