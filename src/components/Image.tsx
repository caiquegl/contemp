import { Box, Image as ChakraImage, BoxProps } from '@chakra-ui/react'
import ImageNext, { StaticImageData } from 'next/image'
import { useEffect } from 'react'
import { pxToRem } from '../utils/pxToRem'

type ImageProps = {
  src?: string | StaticImageData
  uri?: string
  alt?: string
  wImg?: number
  hImg?: number
} & BoxProps

export const Image = ({ src, alt, wImg, hImg, uri, ...props }: ImageProps) => {
  const bgImage =
    typeof src === 'string' ? `url('${src}')` : src?.src ? src.src : ''
  console.log(uri)
  return (
    <>
      {uri && wImg ?
        <Box
          w="100%"
          h="100%"
          minH={pxToRem(200)}
          {...props}
          onContextMenu={() => false}
        >
          <ChakraImage src={uri ? uri : bgImage} alt={alt} width={wImg} height={hImg} loading='lazy' />
        </Box>
        :
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
      }
    </>


  )
}
