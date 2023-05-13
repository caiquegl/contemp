import { Box, Container as ContainerChakra } from "@chakra-ui/react";
import React from "react";
import { pxToRem } from "../utils/pxToRem";

export const Container = ({ children }: any) => {
  return (
    <Box w="100%" bg="black.800">
      <ContainerChakra maxW="6xl" p={`${pxToRem(12)} 0 ${pxToRem(31)}`}>
        {children}
      </ContainerChakra>
    </Box>
  );
};
