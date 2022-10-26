import { Box, Button, Image, Link, Text } from "@chakra-ui/react";
import { useState } from "react";

interface IProps {
  img: any;
  text: string;
  description?: string;
  bg?: string;
  borderColor?: string;
  alt?: string;
  notHover?: boolean;
}
const CardProduct2 = ({
  img,
  text,
  alt,
  description,
  bg,
  borderColor,
  notHover,
}: IProps) => {
  const [isHovering, setHovering] = useState(false);

  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => setHovering(false);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      borderRadius="8px"
      border={isHovering ? "2px solid" : "none"}
      borderColor="black.800"
      p="45px 23px"
      w="346px"
      h="677px"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Text
        fontSize="60px"
        fontWeight="bold"
        color="black"
        textTransform="uppercase"
        mb="20px"
        width="100%"
      >
        {text}
      </Text>
      <Text fontSize="20px" color="black" mb="20px">
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

export default CardProduct2;
