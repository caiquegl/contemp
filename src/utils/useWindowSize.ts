import { useState, useEffect } from "react";

type WindowSizeProps = {
  width: number
  height: number
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSizeProps | null>(null);

  useEffect(() => {
    const getSize = () => {
      return {
        width: window?.innerWidth,
        height: window?.innerHeight,
      };
    };

    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
