import { CSSProperties, FunctionComponent } from "react";
import { IconContext } from "react-icons";
import { pxToRem } from "../../utils/pxToRem";

export type IconProps = {
  icon: FunctionComponent<any>;
  size: number;
  color?: string;
  iconStyle?: CSSProperties;
};

export default function Icon({
  icon: Icon,
  size,
  color,
  iconStyle,
}: IconProps) {
  return (
    <IconContext.Provider
      value={{
        color: color ? color : `#F7F7F7`,
        size: pxToRem(size),
        style: {
          ...iconStyle,
        },
      }}
    >
      <Icon />
    </IconContext.Provider>
  );
}
