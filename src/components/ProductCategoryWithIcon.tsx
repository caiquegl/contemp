import { Flex, FlexProps, Text } from "@chakra-ui/react";
import { pxToRem } from "../utils/pxToRem";
import { Image } from "./Image";
import { StaticImageData } from "next/image";

type ProductCategoryWithIconProps = {
  title: string;
  icon: string | StaticImageData;
  containerProps?: FlexProps;
};

export const ProductCategoryWithIcon = ({
  title,
  icon,
  containerProps,
}: ProductCategoryWithIconProps) => {
  return (
    <Flex
      p={`${pxToRem(10)}`}
      border="2px solid"
      borderRadius="4px"
      alignItems="center"
      justifyContent="space-between"
      w="100%"
      minW={pxToRem(150)}
      maxW={pxToRem(400)}
      maxH={pxToRem(85)}
      {...containerProps}
    >
      <Text fontSize={pxToRem(18)} flex={8} mr={pxToRem(30)}>
        {title}
      </Text>

      <Image
        src={icon}
        bgSize="contain"
        minH={pxToRem(35)}
        minW={pxToRem(35)}
        flex={1}
      />
    </Flex>
  );
};
