import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useToast,
} from "@chakra-ui/react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database, initFirebase } from "../../utils/db";
import ContainerHome from "../ContainerHome";

const TabHome = () => {
  const toast = useToast();
  initFirebase();
  const [activeTab, setActiveTab] = useState(0);
  const [list, setList] = useState([]);

  const listHome = async () => {
    try {
      const dbInstance = collection(database, "home");
      let newList: any = [];
      const q = query(dbInstance, orderBy("indexProduct", "desc"));
      await getDocs(q).then((data) => {
        data.docs.forEach((doc) => {
          newList.push({ ...doc.data(), id: doc.id, ref: doc.ref });
        });
      });
      console.log(newList);
      setList(newList);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao listar produtos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    listHome();
  }, [activeTab]);
  return (
    <Tabs
      variant="unstyled"
      index={activeTab}
      onChange={(indexTab) => setActiveTab(indexTab)}
    >
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
        <Tab
          _selected={{
            bg: "red.600",
            color: "white",
            fontWeight: "bold",
          }}
          w="133px"
          color="black.800"
        >
          Produto 5
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
          Produto 6
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
          Produto 7
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ContainerHome
            indexProduct={activeTab}
            defaultValues={list[activeTab] ? list[activeTab] : []}
          />
        </TabPanel>
        <TabPanel>
          <ContainerHome
            indexProduct={activeTab}
            defaultValues={list[activeTab] ? list[activeTab] : []}
          />
        </TabPanel>
        <TabPanel>
          <ContainerHome
            indexProduct={activeTab}
            defaultValues={list[activeTab] ? list[activeTab] : []}
          />
        </TabPanel>
        <TabPanel>
          <ContainerHome
            indexProduct={activeTab}
            defaultValues={list[activeTab] ? list[activeTab] : []}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabHome;
