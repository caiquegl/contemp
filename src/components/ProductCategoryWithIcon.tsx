import { Flex, FlexProps, Text } from '@chakra-ui/react'
import { pxToRem } from '../utils/pxToRem'
import { Image } from './Image'
import { StaticImageData } from 'next/image'

type ProductCategoryWithIconProps = {
  title: string
  icon: string | StaticImageData
  containerProps?: FlexProps
}

export const ProductCategoryWithIcon = ({ title, icon, containerProps }: ProductCategoryWithIconProps) => {
  return (
    <Flex
      as='a'
      p={`${pxToRem(10)}`}
      border='2px solid'
      bg={containerProps?.bg}
      zIndex={20}
      borderRadius='4px'
      alignItems='center'
      justifyContent='space-between'
      w='100%'
      minW={pxToRem(150)}
      maxW={pxToRem(400)}
      maxH={pxToRem(85)}
      {...containerProps}
      _hover={{ opacity: 0.7, transition: 'all 0.4s', color: containerProps && containerProps.color ? containerProps.color : 'white' }}
      href={`/category/${title.replaceAll(' ', '_')}#viewCategory`}
      cursor='pointer'
    >
      <Text fontSize={pxToRem(18)} flex={8} mr={pxToRem(30)}>
        {title}
      </Text>

      <Image src={icon} bgSize='contain' minH={pxToRem(35)} minW={pxToRem(35)} flex={1} />
    </Flex>
  )
}
