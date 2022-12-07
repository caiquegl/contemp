import { Box, Grid } from "@chakra-ui/react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { pxToRem } from "../utils/pxToRem";
import InovacaoContemp from "../assets/banners/inovacao-contemp.png";
import Upgrade from "../assets/images/banner-p501.jpg";
import { useRouter } from "next/router";

export function AdBanners() {
  const router = useRouter();


  return (
    <Grid
      templateColumns={`repeat(auto-fit, minmax(${pxToRem(300)}, 1fr))`}
      maxW={pxToRem(1400)}
      width="100%"
      margin="auto"
      gap="20px"
    >
      <Box position="unset" w="90%" cursor="pointer" onClick={() => router.push(`/produto/${'P501'.replaceAll(" ", "_")}`)}>
        <Image style={{ height: 'unset', position: 'relative', objectFit: 'contain' }} src={Upgrade} alt={'banne'} />
      </Box>


      <Box h="unset" w="90%" onClick={() => router.push(`/produto/${'P501'.replaceAll(" ", "_")}`)}>
        <Image style={{ height: 'unset', position: 'relative', objectFit: 'contain' }} src={InovacaoContemp} alt={'banner'} />
      </Box>
    </Grid>
  );
}

