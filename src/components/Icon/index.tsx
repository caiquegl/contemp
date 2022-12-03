import { CSSProperties, FunctionComponent } from "react";
import { IconBaseProps, IconContext } from "react-icons";
import { pxToRem } from "../../utils/pxToRem";

export type IconProps = {
  icon: FunctionComponent<any>;
  size?: number;
  color?: string;
  iconStyle?: CSSProperties;
} & IconBaseProps;

export default function Icon({
  icon: Icon,
  size,
  color,
  iconStyle,
  ...props
}: IconProps) {
  return (
    <IconContext.Provider
      value={{
        color: color ? color : `#F7F7F7`,
        size: pxToRem(size ?? 20),
        style: {
          ...iconStyle,
        },
      }}
    >
      <Icon {...props} />
    </IconContext.Provider>
  );
}
