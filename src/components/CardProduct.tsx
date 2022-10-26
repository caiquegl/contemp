import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { useState } from "react";

interface IProps {
  img: any;
  text: string;
  alt?: string;
}
const CardProduct = ({ img, text, alt }: IProps) => {
  const [isHovering, setHovering] = useState(false);

  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => setHovering(false);

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      height="100%"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        flexDirection="column"
        borderRadius="8px"
        border="2px solid white"
        w="253px"
        h={isHovering ? "342px" : "253px"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        bg={isHovering ? "white" : "none"}
      >
        <Image src={img} alt={alt} />
        {isHovering && (
          <>
            <Text
              fontSize="20px"
              fontWeight="bold"
              color="black"
              textTransform="uppercase"
            >
              {text}
            </Text>
            <Link>
              <Text fontSize="20px" color="black">
                Veja mais +
              </Text>
            </Link>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default CardProduct;
