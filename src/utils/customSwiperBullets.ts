import { pxToRem } from "./pxToRem";

export function customSwiperBullets(_index: number, className: string) {
  const width_height = pxToRem(13);

  return `<span z-index: 999; style="width: ${width_height}; height: ${width_height}; bottom: ${pxToRem(
    15
  )}; border-radius: ${pxToRem(100)};" class=${className}></span>`;
}
