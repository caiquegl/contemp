import { Box, Container as ContainerChakra } from "@chakra-ui/react";
import React from "react";

export const Container = ({ children }: any) => {
  return (
    <Box w="100%" bg="black.800">
      <ContainerChakra maxW="6xl" p="12px 0 31px">
        {children}
      </ContainerChakra>
    </Box>
  );
};
