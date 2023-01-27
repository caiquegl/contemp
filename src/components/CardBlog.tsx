import React from "react";
import { Box, Button, Flex, GridItem, Text } from "@chakra-ui/react";
import { Image } from './Image'
import { pxToRem } from "../utils/pxToRem";

interface IProps {
  bg: string;
  color: string;
  title: string;
  text: string;
  img: any;
}

export const CardBlog = ({ bg, color, title, text, img }: IProps) => {
  return (
    <Flex
      bg={bg}
      minH="350px"
      p={['10px 20px', '10px 20px', '10px 20px', '10px 50px', '10px 50px']}
      alignItems="center"
      justifyContent="space-between"
      display="flex"
    >
      <Box
        w="100%"
        maxW={pxToRem(474)}
        minH={[pxToRem(100), pxToRem(150)]}
        borderRadius="8px"
        border="2px solid"
        h={[pxToRem(450), pxToRem(550)]}
        borderColor={color}
        p={pxToRem(20)}
      >
        <Image src={img} alt="bateria" w="100%" h={[pxToRem(150),pxToRem(300)]} />

        <Text fontWeight="bold" fontSize={pxToRem(25)} mt={["5px","15px"]}color={color}>
          {title}
        </Text>

        <Text fontSize={["14px","18px"]} mt={["5px","15px"]} color={color}>
          {text}
        </Text>

        <Button
          borderRadius="30px"
          w="150px"
          h={["30px","40px"]}
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
    </Flex>
  );
};
