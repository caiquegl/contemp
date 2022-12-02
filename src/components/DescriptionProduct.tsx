import { Box, Button, Flex, FlexProps, Text } from "@chakra-ui/react";
import { Image } from "../components/Image";
import Pirometro from "../assets/icons/pritometro_white.svg";
import { pxToRem } from "../utils/pxToRem";
import { ProductCategoryWithIcon } from "./ProductCategoryWithIcon";
import { useRouter } from "next/router";

interface IProps {
  bg: string;
  borderColor: string;
  borderColorButton: string;
  color: string;
  containerProps?: FlexProps;
  dataTab?: any
}
const DescriptionProduct = ({
  bg,
  borderColor,
  color,
  borderColorButton,
  containerProps,
  dataTab
}: IProps) => {
  const router = useRouter();

  if(!dataTab || Object.keys(dataTab).length === 0) return <Box/>
  
  return (
    <Flex
      w="100%"
      minH={pxToRem(630)}
      alignItems="center"
      justifyContent="center"
      bg={bg}
      color={color}
      margin="auto"
    >
      <Flex
        direction={{
          base: "column",
          xl: "row",
        }}
        alignItems="center"
        justifyContent="space-between"
        h="100%"
        w="95%"
        {...containerProps}
      >
        <Image
          src={
            dataTab?.urls ? dataTab.urls[0] : ''
          }
          alt="bateria"
          flex={1}
          minH={pxToRem(300)}
          bgSize={{
            base: "70%",
            md: "90%",
            lg: "70%",
            xl: "85%",
            "2xl": "70%",
          }}
        />

        <Flex
          flexDirection="column"
          alignItems="initial"
          flex={1.3}
          paddingLeft={3}
          mb={5}
        >
          <Text
            fontWeight="bold"
            textTransform="uppercase"
            fontSize={{
              base: pxToRem(30),
              lg: pxToRem(35),
              xl: pxToRem(40),
            }}
          >
            {dataTab?.name}
          </Text>

          <ProductCategoryWithIcon
            title={dataTab?.nameCategory}
            icon={dataTab?.icon}
            containerProps={{
              bg,
              color,
              borderColor,
              margin: `${pxToRem(10)} 0`,
            }}
          />

          <Text fontSize={pxToRem(20)} w="100%" margin={`${pxToRem(10)} 0`}>
            {dataTab?.description}
          </Text>

          <Flex w="75%" maxW={pxToRem(220)} alignItems="center">
            <Button
              borderRadius="25px"
              border="2px solid"
              borderColor={borderColorButton}
              bg="transparent"
              m={`${pxToRem(20)} 0`}
              maxW={pxToRem(157)}
              h={pxToRem(50)}
              flex={6}
              onClick={() => router.push(`/produto/${dataTab?.name}`)}
              _hover={{
                bg: color,
                color: bg,
                transition: "all 0.3s",
              }}
            >
              Veja mais
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DescriptionProduct;
