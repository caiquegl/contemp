import { ImageProps } from "@chakra-ui/react";
import { StaticImageData } from "next/image";
import React from "react";
import { Image } from "../components/Image";

export type BackgroundDetailProps = {
  src: string | StaticImageData
} & ImageProps

export const BackgroundDetail = ({ src, ...props }: BackgroundDetailProps) => {
  return (
    <Image
      src={src}
      display={{
        base: 'none',
        lg: 'block'
      }}
      zIndex={-10}
      position="absolute"
      minH={0}
      {...props}
    />
  )
}