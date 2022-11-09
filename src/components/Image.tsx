import { Box, Image as ChakraImage, BoxProps } from "@chakra-ui/react";

type ImageProps = {
  src: string
  alt?: string
} & BoxProps

export const Image = ({ src, alt, ...props }: ImageProps) => {
  return (
    <Box
      bgImage={`url('${src}')`}
      bgSize="85%"
      bgRepeat="no-repeat"
      bgPosition="center"
      w="100%"
      h="100%"
      flex={1}
      {...props}
    >
      <ChakraImage opacity="0" src={''} alt={alt} />
    </Box>
  )
}