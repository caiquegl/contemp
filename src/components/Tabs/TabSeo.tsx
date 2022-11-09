import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Button,
} from "@chakra-ui/react";
import ContainerSeo from "../ContainerSeo";

const TabSeo = () => {
  return (
    <>
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        mb="18px"
      >
        <Button
          bg="transparent"
          color="black.800"
          fontSize="20px"
          borderRadius="4px"
          border="2px solid"
          borderColor="black.800"
          w="128px"
          h="47px"
          _hover={{ transition: "all 0.4s", opacity: 0.7 }}
        >
          Voltar
        </Button>
      </Flex>
      <ContainerSeo />
    </>
  );
};

export default TabSeo;
