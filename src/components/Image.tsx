import { Box, Image as ChakraImage, BoxProps, Heading } from "@chakra-ui/react";
import { StaticImageData } from "next/image";
import { pxToRem } from "../utils/pxToRem";

type ImageProps = {
  src: string | StaticImageData
  alt?: string
} & BoxProps

export const Image = ({ src, alt, ...props }: ImageProps) => {
  const bgImage = typeof src === 'string' ? `url('${src}')` : src?.src ? src.src : ''

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
    >
      <ChakraImage opacity="0" src={''} alt={alt} />
    </Box>
  )
}