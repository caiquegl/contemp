import { Box, Button, Flex, GridItem, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { pxToRem } from "../utils/pxToRem";

interface IProps {
  bg: string;
  text: string;
  title: string;
  color: string;
  img?: string;
}
const CardCatalog = ({ bg, text, title, color, img }: IProps) => {
  const router = useRouter();

  return (
    <GridItem w={"100%"} bg={bg} borderRadius="8px" p="27px 17px">
      <Flex h="100%" justifyContent="space-between" flexDirection="column">
        <Box>
          <Box mb={pxToRem(15)}>
            {!img ?
              <Box
                w="41px"
                h="41px"
                borderRadius="5px"
                bg={color}
                mb={pxToRem(10)}
              />
              :
              <Box
                w="41px"
                h="41px"
                borderRadius="5px"
              >
                <Image src={img} alt={title} />
              </Box>
            }
            <Text
              color={color}
              fontSize={pxToRem(30)}
              lineHeight={1.2}
              fontWeight="bold"
            >
              {title}
            </Text>
          </Box>

          <Text color={color} fontSize="20px" mt="20px">
            {text && text.split('').length > 0 && text
              .split("")
              .map((el: any, index: number) => <>{index < 300 ? el : ""}</>)}
            {text && text.split("").length > 300 ? "..." : ""}
          </Text>

        </Box>

        <Flex w="100%" alignItems="center" justifyContent="center" mt="20px">
          <Button
            color={color}
            border="2px solid"
            borderColor={color}
            borderRadius="25px"
            w="100%"
            maxW="243px"
            h="50px"
            bg={bg}
            fontSize="20px"
            onClick={() =>
              router.push(`/category/${title.replaceAll(" ", "_")}`)
            }
            _hover={{
              bg: color,
              color: bg,
              transition: "all 0.3s",
            }}
          >
            Ver produtos
          </Button>
        </Flex>
      </Flex>
    </GridItem>
  );
};

export default CardCatalog;
