import { BackgroundDetail } from "./BackgroundDetail";
import { pxToRem } from "../utils/pxToRem";

import PlusDetail from "../assets/background-details/detail-plus.svg";
import CirclesHorizontalDetail from "../assets/background-details/detail-circle-horizontal.svg";
import TrianglesDetail from "../assets/background-details/detail-triangle.svg";
import PlusDetailDark from "../assets/background-details/detail-plus-dark.svg";
import CriclesDetail from "../assets/background-details/detail-circle.svg";

export const HomeBackgroundDetails = () => {
  return (
    <>
      <BackgroundDetail
        src={PlusDetail}
        top={pxToRem(1440)}
        left={{
          lg: '10%',
          xl: '7%',
          '2xl': '15%'
        }}
        w={20}
        maxH={110}
      />

      <BackgroundDetail
        src={CirclesHorizontalDetail}
        top={pxToRem(1830)}
        left={-20}
        w={300}
        maxH={50}
      />

      <BackgroundDetail
        src={TrianglesDetail}
        top={pxToRem(1915)}
        right="10%"
        w={70}
        maxH={100}
        zIndex={10}
      />

      <BackgroundDetail
        src={PlusDetailDark}
        top={pxToRem(2545)}
        right="15%"
        w={70}
        maxH={100}
        zIndex={10}
      />

      <BackgroundDetail
        src={CriclesDetail}
        top={{
          lg: pxToRem(3220),
          xl: pxToRem(3177)
        }}
        left={{
          lg: '10%',
          xl: '7%',
          '2xl': '10%'
        }}
        w={70}
        maxH={100}
        zIndex={10}
      />

      <BackgroundDetail
        src={CirclesHorizontalDetail}
        top={pxToRem(3555)}
        left={-20}
        w={300}
        maxH={50}
        zIndex={0}
      />

      <BackgroundDetail
        src={CriclesDetail}
        top={pxToRem(4417)}
        left={{
          lg: '10%',
          xl: '7%',
          '2xl': '10%'
        }}
        w={70}
        maxH={100}
        zIndex={10}
      />

      <BackgroundDetail
        src={CirclesHorizontalDetail}
        top={pxToRem(5070)}
        left={-20}
        w={300}
        maxH={50}
        zIndex={0}
      />

      <BackgroundDetail
        src={PlusDetailDark}
        top={pxToRem(5835)}
        left="15%"
        w={70}
        maxH={100}
        zIndex={10}
      />

<BackgroundDetail
        src={PlusDetail}
        top={pxToRem(7255)}
        left="15%"
        w={70}
        maxH={100}
        zIndex={10}
      />
    </>
  )
}