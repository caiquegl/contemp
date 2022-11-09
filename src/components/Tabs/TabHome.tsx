import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
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
