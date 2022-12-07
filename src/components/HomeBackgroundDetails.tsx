import { BackgroundDetail } from "./BackgroundDetail";
import { pxToRem } from "../utils/pxToRem";

import PlusDetail from "../assets/background-details/detail-plus.svg";
import CirclesHorizontalDetail from "../assets/background-details/detail-circle-horizontal.svg";
import TrianglesDetail from "../assets/background-details/detail-triangle.svg";
import PlusDetailDark from "../assets/background-details/detail-plus-dark.svg";
import CriclesDetail from "../assets/background-details/detail-circle.svg";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const HomeBackgroundDetails = () => {
  const [scrollY, setScrollY] = useState(0);
  const [top1, setTop1] = useState(1440)
  const [top2, setTop2] = useState(1930)
  const [top3, setTop3] = useState(2545)
  const [top4, setTop4] = useState(3555)
  const [top5, setTop5] = useState(4417)
  const [top6, setTop6] = useState(4417)
  const [top7, setTop7] = useState(6655)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // just trigger this so that the initial state 
    // is updated as soon as the component is mounted
    // related: https://stackoverflow.com/a/63408216
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scrollY > 610 && scrollY < 670) {
      setTop1(scrollY * 2.3)
    }

    if (scrollY > 820 && scrollY < 920) {
      setTop2(scrollY * 2.3)
    }

    if (scrollY > 1050 && scrollY < 1150) {
      setTop3(scrollY * 2.3)
    }

    if (scrollY > 1716 && scrollY < 1716) {
      setTop4(scrollY * 2.3)
    }

    if (scrollY > 2000 && scrollY < 2200) {
      setTop5(scrollY * 2)
    }

    if (scrollY > 2500 && scrollY < 2700) {
      setTop6(scrollY * 2)
    }

    if (scrollY > 2500 && scrollY < 2700) {
      setTop6(scrollY * 2)
    }

    if (scrollY > 3400 && scrollY < 3500) {
      setTop7(scrollY * 2)
    }


  }, [scrollY])

  return (
    <Box zIndex={-10}>
      <Box
        className="square"
        bgImage={PlusDetail}
        top={scrollY > 610 && scrollY < 670 ? scrollY * 2.3 : top1}
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
        // w="100%"
        h="100%"
        // minH={200}
        flex={1}
      >
        <Image src={PlusDetail} alt={'lt'} />
      </Box>
      <Box
        bgImage={CirclesHorizontalDetail}
        top={scrollY > 820 && scrollY < 920 ? scrollY * 2.3 : top2}
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
        top={top2}
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
        <Image src={TrianglesDetail} alt={'lt'} />
      </Box>

      <Box
        bgImage={PlusDetailDark}
        top={top3}
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

      <Box
        bgImage={CirclesHorizontalDetail}
        top={top4}
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
        top={top5}
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
      <BackgroundDetail
        src={CirclesHorizontalDetail}
        top={top6}
        left={-20}
        w={300}
        maxH={50}
        zIndex={0}
      />

      <BackgroundDetail
        src={PlusDetail}
        top={top7}
        left="10%"
        w={70}
        maxH={100}
        zIndex={10}
      />
    </Box >
  );
};
