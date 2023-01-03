import { Box, Image as ChakraImage, BoxProps, Spinner, Center } from '@chakra-ui/react'
import ImageNext, { StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'
import { pxToRem } from '../utils/pxToRem'

type ImageProps = {
  src?: string | StaticImageData
  uri?: string
  alt?: string
  wImg?: number
  hImg?: number
} & BoxProps

export const CustomLoader = () => {
  return <Center h="100%"><Spinner color='red.500' size='xl' /></Center>
}

export const Image = ({ src, alt, wImg, hImg, uri, ...props }: ImageProps) => {
  const bgImage =
    typeof src === 'string' ? `url('${src}')` : src?.src ? src.src : ''
  const [loading, setLoading] = useState(false)
  return (
    <>
      {uri ?
        <Center
          w="100%"
          h="100%"
          minH={pxToRem(200)}
          {...props}
          onContextMenu={() => false}
        >
          {loading ? <CustomLoader /> :
            <ChakraImage onLoad={() => setLoading(false)} onLoadStart={() => setLoading(true)} src={uri ? uri : bgImage} alt={alt} width={wImg} height={hImg} loading='lazy' />
          }
        </Center>
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
