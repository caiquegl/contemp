import { BackgroundDetail } from "./BackgroundDetail";

import PlusDetail from "../assets/background-details/detail-plus.svg";
import CirclesHorizontalDetail from "../assets/background-details/detail-circle-horizontal.svg";
import TrianglesDetail from "../assets/background-details/detail-triangle.svg";
import PlusDetailDark from "../assets/background-details/detail-plus-dark.svg";
import CriclesDetail from "../assets/background-details/detail-circle.svg";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Parallax, useParallax } from 'react-scroll-parallax'

export const HomeBackgroundDetails = () => {
  const parallax = useParallax<HTMLDivElement>({
    translateY: [0, 150]
  });

  const parallax2 = useParallax<HTMLDivElement>({
    translateY: [0, 150]
  });

  const parallax3 = useParallax<HTMLDivElement>({
    translateY: [0, 150]
  });

  const parallax4 = useParallax<HTMLDivElement>({
    translateY: [0, 150]
  });

  const parallax5 = useParallax<HTMLDivElement>({
    translateY: [0, 150]
  });

  const parallax6 = useParallax<HTMLDivElement>({
    translateY: [0, 150]
  });

  const parallax7 = useParallax<HTMLDivElement>({
    translateY: [0, 150]
  });

  const parallax8 = useParallax<HTMLDivElement>({
    translateY: [0, 150]
  });

  const parallax9 = useParallax<HTMLDivElement>({
    translateY: [0, 150]
  });
  return (
    <Box zIndex={-10}>

      <Box
        className="square"
        bgImage={PlusDetail}
        ref={parallax.ref}
        top={1440}
        left={{
          lg: "10%",
          xl: "7%",
          "2xl": "15%",
        }}
        w={20}
        maxH={110}
        display={{
          base: 'none',
          lg: 'block'
        }}
        zIndex={-10}
        position="absolute"
        minH={0}
        bgSize="85%"
        bgRepeat="no-repeat"
        bgPosition="center"
        h="100%"
        flex={1}
      >
        <Image src={PlusDetail} alt={'lt'} />
      </Box>
      <Box
        bgImage={CirclesHorizontalDetail}
        ref={parallax2.ref}
        top={1930}
        left={-20}
        maxH={100}
        display={{
          base: 'none',
          lg: 'block'
        }}
        zIndex={10}
        position="absolute"
        minH={0}
        bgSize="85%"
        bgRepeat="no-repeat"
        bgPosition="center"
        // w="100%"
        h="100%"
        // minH={200}
        flex={1}
        right="10%"
        w={300}
      >
        <Image src={CirclesHorizontalDetail} alt={'lt'} />
      </Box>

      <Box
        bgImage={TrianglesDetail}
        top={1930}
        right="10%"
        maxH={100}
        ref={parallax3.ref}
        display={{
          base: 'none',
          lg: 'block'
        }}
        zIndex={10}
        position="absolute"
        minH={0}
        bgSize="85%"
        bgRepeat="no-repeat"
        bgPosition="center"
        // w="100%"
        h="100%"
        // minH={200}
        flex={1}
        w={70}
      >
        <Image src={TrianglesDetail} alt={'lt'} />
      </Box>

      <Box
        bgImage={PlusDetailDark}
        top={2545}
        ref={parallax4.ref}

        right="10%"
        maxH={100}
        display={{
          base: 'none',
          lg: 'block'
        }}
        zIndex={10}
        position="absolute"
        minH={0}
        bgSize="85%"
        bgRepeat="no-repeat"
        bgPosition="center"
        // w="100%"
        h="100%"
        // minH={200}
        flex={1}
        w={70}
      >
        <Image src={PlusDetailDark} alt={'lt'} />
      </Box>
      <Box
        ref={parallax5.ref}

      >
        <BackgroundDetail
          src={CriclesDetail}
          top={3220}
          left={{
            lg: "10%",
            xl: "7%",
            "2xl": "10%",
          }}
          w={70}
          maxH={100}
          zIndex={10}
        />
      </Box>


      <Box
        bgImage={CirclesHorizontalDetail}
        top={3555}
        ref={parallax6.ref}

        // right="10%"
        maxH={50}
        display={{
          base: 'none',
          lg: 'block'
        }}
        zIndex={0}
        position="absolute"
        minH={0}
        bgSize="85%"
        bgRepeat="no-repeat"
        bgPosition="center"
        // w="100%"
        h="100%"
        // minH={200}
        flex={1}
        w={300}
        left={-20}
      >
        <Image src={CirclesHorizontalDetail} alt={'lt'} />
      </Box>

      <Box
        bgImage={CriclesDetail}
        top={4417}
        ref={parallax7.ref}

        // right="10%"
        maxH={100}
        display={{
          base: 'none',
          lg: 'block'
        }}
        zIndex={0}
        position="absolute"
        minH={0}
        bgSize="85%"
        bgRepeat="no-repeat"
        bgPosition="center"
        // w="100%"
        h="100%"
        // minH={200}
        flex={1}
        w={70}
        left={"7%"}
      >
        <Image src={CriclesDetail} alt={'lt'} />
      </Box>
      <Box
        ref={parallax8.ref}

      >
        <BackgroundDetail
          src={CirclesHorizontalDetail}
          top={4417}
          left={-20}
          w={300}
          maxH={50}
          zIndex={0}
        />
      </Box>
      <Box
        ref={parallax9.ref}

      >

        <BackgroundDetail
          src={PlusDetail}
          top={6655}
          left="10%"
          w={70}
          maxH={100}
          zIndex={10}
        />
      </Box>
    </Box >
  );
};
