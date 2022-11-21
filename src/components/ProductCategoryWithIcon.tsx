import { Flex, FlexProps, Text } from "@chakra-ui/react";
import { pxToRem } from "../utils/pxToRem";
import { Image } from './Image'
import { StaticImageData } from "next/image";

type ProductCategoryWithIconProps = {
  title: string
  icon: string | StaticImageData
  containerProps?: FlexProps
}

export const ProductCategoryWithIcon = ({
  title,
  icon,
  containerProps,
}: ProductCategoryWithIconProps) => {
  const containerColor = (containerProps?.color || '') as string

  return (
    <Flex
      p={`${pxToRem(10)}`}
      border="2px solid"
      borderRadius="4px"
      alignItems="center"
      justifyContent="space-between"
      w={{
        base: '90%',
        lg: '100%'
      }}
      maxH={pxToRem(70)}
      maxW={pxToRem(400)}
      {...containerProps}
    >
      <Text
        fontSize={pxToRem(18)}
        flex={8}
        mr={pxToRem(10)}
      >
        {title}
      </Text>

      <Image
        src={icon}
        bgSize="contain"
        minH={pxToRem(35)}
        flex={1}
        filter={
          containerColor ? containerColor.includes('white') ? 'invert(0)' : 'invert(1)' : 'auto'
        }
      />
    </Flex>
  )
}