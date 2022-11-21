import { Box, Button, Link, Text } from "@chakra-ui/react";
import { StaticImageData } from "next/image";
import { useState } from "react";
import { pxToRem } from "../utils/pxToRem";
import { Image } from './Image'

interface IProps {
  img: string | StaticImageData;
  text: string;
  description?: string;
  alt?: string;
}

const CardProductWithDescription = ({ img, text, alt, description }: IProps) => {
  const [isHovering, setIsHovering] = useState(false)

  const handleIsHovering = () =>
    setIsHovering((isHovering) => !isHovering)

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      borderRadius="8px"
      border={isHovering ? '2px solid' : 'none'}
      borderColor="black.800"
      p={`${pxToRem(45)} ${pxToRem(23)}`}
      w={pxToRem(346)}
      h={pxToRem(677)}
      onMouseOver={handleIsHovering}
      onMouseOut={handleIsHovering}
    >
      <Text
        fontSize={pxToRem(60)}
        fontWeight="bold"
        color="black"
        textTransform="uppercase"
        mb="20px"
        width="100%"
      >
        {text}
      </Text>
      <Text fontSize={pxToRem(20)} color="black" mb="20px">
        {description}
      </Text>

      <Image src={img} alt={alt} mb="20px" />

      <Button
        w="243px"
        h="50px"
        borderRadius="25px"
        bg="red.600"
        fontSize="20px"
        _hover={{ transition: "all 0.5s", opacity: 0.7 }}
      >
        Solicitar orçamento
      </Button>
    </Box>
  );
};

export default CardProductWithDescription;
