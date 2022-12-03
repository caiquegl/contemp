import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";

import { useWindowSize } from "../utils/useWindowSize";

export const SmoothScroll = ({ children }: any) => {
  const windowSize = useWindowSize();
  const scrollingContainerRef: any = useRef(null);

  const data = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  useEffect(() => {
    setBodyHeight();
  }, [windowSize?.height]);

  const setBodyHeight = () => {
    if (scrollingContainerRef.current) {
      const newHeight =
        scrollingContainerRef.current.getBoundingClientRect().height;

      document.body.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    requestAnimationFrame(() => smoothScrollingHandler());
  }, []);

  const smoothScrollingHandler = () => {
    data.current = window.scrollY;
    data.previous += (data.current - data.previous) * data.ease;
    data.rounded = Math.round(data.previous * 80) / 80;
    if (scrollingContainerRef && scrollingContainerRef.current)
      scrollingContainerRef.current.style.transform = `translateY(-${data.previous}px)`;

    // Recursive call
    requestAnimationFrame(() => smoothScrollingHandler());
  };

  return <Box ref={scrollingContainerRef}>{children}</Box>;
};
