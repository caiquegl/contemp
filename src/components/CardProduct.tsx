import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { StaticImageData } from "next/image";
import { pxToRem } from "../utils/pxToRem";
import { Image } from './Image'

interface IProps {
  img: string | StaticImageData;
  text: string;
  alt?: string;
  categoryName?: string;
}

const CardProduct = ({ img, text, alt, categoryName }: IProps) => {
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
        w={pxToRem(253)}
        h={pxToRem(253)}
        bg="none"
        _hover={{
          h: pxToRem(342),
          bg: 'white.700',
          '.see-more-text': {
            display: 'block'
          }
        }}
        transition="all 0.3s"
        cursor="pointer"
      >
        <Image src={img} alt={alt} />
        
        <Box className="see-more-text" display="none" flex={0.3} textAlign="center">
          <Text
            fontSize="20px"
            fontWeight="bold"
            color="black"
            textTransform="uppercase"
          >
            {text}
          </Text>
          <Link href={text ? `product/${text}` : ''}>
            <Text fontSize="20px" color="black">
              Veja mais +
            </Text>
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};

export default CardProduct;
