import { Box, Button, Image, Text } from "@chakra-ui/react";
import { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { pxToRem } from "../utils/pxToRem";

interface IProps {
  img: string;
  text: string;
  description?: string;
  alt?: string;
  color?: string;
  buttomBottom?: string
}

const CardProductWithDescription = ({ img, text, alt, description, color, buttomBottom }: IProps) => {
  const router = useRouter()
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
      borderColor={color ? color : "black.800"}
      p={`${pxToRem(45)} ${pxToRem(23)}`}
      w={pxToRem(346)}
      h={pxToRem(677)}
      onMouseOver={handleIsHovering}
      onMouseOut={handleIsHovering}
    >
      <Text
        fontSize={pxToRem(60)}
        fontWeight="bold"
        color={color ? color : "black"}
        textTransform="uppercase"
        mb="20px"
        width="100%"

      >
        {text}
      </Text>
      <Text fontSize={pxToRem(20)} color={color ? color : "black"} mb="20px">
        {description}
      </Text>

      <Image src={img} alt={alt} mb="20px" />

      <Button
        w="243px"
        h="50px"
        borderRadius="25px"
        bg="red.600"
        fontSize="20px"
        borderColor={buttomBottom ? buttomBottom : 'transpares'}
        borderWidth={buttomBottom ? "2px" : '0'}
        _hover={{ transition: "all 0.5s", opacity: 0.7 }}
        onClick={() => router.push(`/produto/${text.replaceAll(' ', '_')}`)}
      >
        Solicitar orçamento
      </Button>
    </Box>
  );
};

export default CardProductWithDescription;
