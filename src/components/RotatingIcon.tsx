import React from 'react';
import { FaCaretDown } from 'react-icons/fa';

interface RotatingIconProps {
  isActive: boolean;
}

const RotatingIcon: React.FC<RotatingIconProps> = ({ isActive }) => {
  const rotationDegree = isActive ? 180 : 0;
  const iconStyle = { '--rotate-deg': `${rotationDegree}deg` } as React.CSSProperties;

  return <FaCaretDown className="rotate-icon" style={iconStyle} />;
};

export default RotatingIcon;
