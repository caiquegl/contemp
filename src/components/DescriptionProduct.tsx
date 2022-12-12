import { Box, Button, Flex, FlexProps, Image, Text } from "@chakra-ui/react";
// import { Image } from "../components/Image";
import { pxToRem } from "../utils/pxToRem";
import { ProductCategoryWithIcon } from "./ProductCategoryWithIcon";
import { useRouter } from "next/router";

type DataTabProps = {
  category: string;
  description: string;
  destaque: boolean;
  icon: string;
  indexProduct: number;
  link_name: string;
  name: string;
  nameCategory: string;
  urls: string[];
};

interface IProps {
  bg: string;
  borderColor: string;
  borderColorButton: string;
  color: string;
  containerProps?: FlexProps;
  dataTab?: DataTabProps;
}

const DescriptionProduct = ({
  bg,
  borderColor,
  color,
  borderColorButton,
  containerProps,
  dataTab,
}: IProps) => {
  const router = useRouter();

  if (!dataTab || Object.keys(dataTab).length === 0) return <Box />;

  return (
    <Flex
      w="100%"
      minH={pxToRem(630)}
      alignItems="center"
      justifyContent="center"
      bg={bg}
      color={color}
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
        padding={`${pxToRem(15)}`}
        {...containerProps}
      >
        <Image
          src={dataTab?.urls ? dataTab.urls[0] : ""}
          alt={dataTab?.name}
          // flex={1}
          zIndex={30}
          minH="auto"
          w={{
            base: "55%",
            md: "45%",
            lg: "45%",
            xl: "55%",
          }}
          onClick={() =>
            router.push(`/produto/${dataTab?.name.replaceAll(" ", "_")}`)
          }
          cursor="pointer"
        />

        <Flex flexDirection="column" alignItems="initial" flex={1.07}>
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

          <Text
            fontSize={pxToRem(20)}
            w="100%"
            margin={`${pxToRem(10)} 0`}
            zIndex={90}
            bg={bg}
          >
            {dataTab?.description}
          </Text>

          <Flex w="75%" maxW={pxToRem(220)} alignItems="center">
            <Button
              borderRadius="25px"
              border="2px solid"
              borderColor={borderColorButton}
              bg={bg}
              m={`${pxToRem(20)} 0`}
              maxW={pxToRem(157)}
              h={pxToRem(50)}
              flex={6}
              onClick={() =>
                router.push(`/produto/${dataTab?.name.replaceAll(" ", "_")}`)
              }
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
