import {
  Box,
  Flex,
  Text,
  Button,
  InputGroup,
  Input,
  Link,
  Container,
  Avatar,
  Divider,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  HStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import Logo from "../../assets/icons/logo.png";
import ContainerHome from "../ContainerHome";

const TabHome = () => {
  return (
    <Tabs variant="unstyled">
      <TabList>
        <Tab
          _selected={{
            bg: "red.600",
            color: "white",
            fontWeight: "bold",
          }}
          w="133px"
          color="black.800"
        >
          Produto 1
        </Tab>
        <Tab
          _selected={{
            bg: "red.600",
            color: "white",
            fontWeight: "bold",
          }}
          w="133px"
          color="black.800"
        >
          Produto 2
        </Tab>
        <Tab
          _selected={{
            bg: "red.600",
            color: "white",
            fontWeight: "bold",
          }}
          w="133px"
          color="black.800"
        >
          Produto 3
        </Tab>
        <Tab
          _selected={{
            bg: "red.600",
            color: "white",
            fontWeight: "bold",
          }}
          w="133px"
          color="black.800"
        >
          Produto 4
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ContainerHome />
        </TabPanel>
        <TabPanel>
          <ContainerHome />
        </TabPanel>
        <TabPanel>
          <ContainerHome />
        </TabPanel>
        <TabPanel>
          <ContainerHome />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabHome;
