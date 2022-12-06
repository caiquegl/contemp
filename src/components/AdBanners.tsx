import { Grid } from "@chakra-ui/react";
import { StaticImageData } from "next/image";
import { Image } from "./Image";
import { pxToRem } from "../utils/pxToRem";
import InovacaoContemp from "../assets/banners/inovacao-contemp.png";
import Upgrade from "../assets/banners/upgrade-nova-p501.png";

export function AdBanners() {
  return (
    <Grid
      templateColumns={`repeat(auto-fit, minmax(${pxToRem(300)}, 1fr))`}
      maxW={pxToRem(1400)}
      width="100%"
      margin="auto"
    >
      <AdBanner src={Upgrade} alt="Upgrade Nova P501" />
      <AdBanner src={InovacaoContemp} alt="Banner Inovação Contemp" />
    </Grid>
  );
}

type AdBannerProps = {
  src: string | StaticImageData;
  alt: string;
};

const AdBanner = ({ src, alt }: AdBannerProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      bgSize="cover"
      minH={{
        base: pxToRem(228),
        md: pxToRem(330),
        lg: pxToRem(425),
      }}
      w="100%"
    />
  );
};
