import { Box, Image as ChakraImage, BoxProps } from '@chakra-ui/react'
import { StaticImageData } from 'next/image'
import { useEffect } from 'react'
import { pxToRem } from '../utils/pxToRem'

type ImageProps = {
  src: string | StaticImageData
  alt?: string
} & BoxProps

export const Image = ({ src, alt, ...props }: ImageProps) => {
  const bgImage =
    typeof src === 'string' ? `url('${src}')` : src?.src ? src.src : ''

  return (
    <Box
      bgImage={bgImage}
      bgSize="85%"
      bgRepeat="no-repeat"
      bgPosition="center"
      w="100%"
      h="100%"
      minH={pxToRem(200)}
      flex={1}
      {...props}
      userSelect="none"
      onContextMenu={() => false}
    >
      <ChakraImage opacity="0" src={''} alt={alt} userSelect="none" />
    </Box>
  )
}
