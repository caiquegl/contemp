import { Box, Flex, FlexProps, Link, Text } from "@chakra-ui/react";
import { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { pxToRem } from "../utils/pxToRem";
import { Image } from "./Image";
import DefaultImg from '../assets/images/image-default.webp'
interface IProps extends FlexProps {
  img: string | StaticImageData;
  text: string;
  alt?: string;
  categoryName?: string;
}

const CardProduct = ({ img, text, alt, categoryName, ...props }: IProps) => {
  const router = useRouter();
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      height="100%"
      {...props}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        flexDirection="column"
        borderRadius="8px"
        border="2px solid white"
        margin="auto"
        w={pxToRem(253)}
        h={pxToRem(253)}
        bg="none"
        _hover={{
          h: pxToRem(342),
          bg: "white.700",
          ".see-more-text": {
            display: "block",
          },
        }}
        transition="all 0.3s"
        cursor="pointer"
      >
        {img && typeof img == 'string' ?
          <Image uri={img} alt={alt} onClick={() => router.push(`/produto/${text.replaceAll(" ", "_")}`)} />
          :
          <Image src={DefaultImg} alt={alt} onClick={() => router.push(`/produto/${text.replaceAll(" ", "_")}`)} />

        }

        <Box
          className="see-more-text"
          display="none"
          flex={0.3}
          textAlign="center"
        >
          <Text
            fontSize="20px"
            fontWeight="bold"
            color="black"
            textTransform="uppercase"
          >
            {text}
          </Text>
          <Link href={text ? `/produto/${text.replaceAll(" ", "_")}` : ""} _hover={{ color: 'black', textDecoration: 'none' }}>
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
