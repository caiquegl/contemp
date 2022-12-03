import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { pxToRem } from "../utils/pxToRem";
import { Image } from './Image'

interface IProps {
  bg: string;
  text: string;
  title: string;
  color: string;
}
const CardCatalog = ({ bg, text, title, color }: IProps) => {
  const router = useRouter();

  return (
    <GridItem
      w={["100%", "100%", "300px", "300px", "300px", "335px"]}
      mb={["50px", "50px", "0", "0", "0", "0"]}
      maxH={["860px", "860px", "760px", "760px", "760px", "760px"]}
      bg={bg}
      borderRadius="8px"
      p="27px 17px"
    >
      <Grid h="100%" templateRows="1.5fr 1.5fr 1fr 0.5fr">
        <Box mb={pxToRem(15)}>
          <Box w="41px" h="41px" borderRadius="5px" bg={color} mb={pxToRem(10)}/>

          <Text color={color} fontSize={pxToRem(35)} lineHeight={1.2} fontWeight="bold">
            {title}
          </Text>
        </Box>

        <Text color={color} fontSize="20px">
          {text}
        </Text>

        <Flex w="100%" alignItems="center" justifyContent="center">
          <Button
            color={color}
            border="2px solid"
            borderColor={color}
            borderRadius="25px"
            w="243px"
            h="50px"
            bg="tranparent"
            fontSize="20px"
            onClick={() => router.push(`/category/${title}`)}
            _hover={{
              bg: color,
              color: bg,
              transition: "all 0.3s",
            }}
          >
            Ver produtos
          </Button>
        </Flex>
      </Grid>
    </GridItem>
  );
};

export default CardCatalog;