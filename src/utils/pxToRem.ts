export function pxToRem(pixels: number) {
  const remValue = (pixels / 16).toFixed(4)

  return `${remValue}rem`
}