import { pxToRem } from "./pxToRem";

export function customSwiperBullets(_index: number, className: string) {
  return `<div style="width: ${pxToRem(13)}; height: ${pxToRem(
    13
  )}; bottom: ${pxToRem(15)}; border-radius: ${pxToRem(
    100
  )};" class=${className}></div>`;
}
