import {
  Box,
  Text,
  InputGroup,
  Input,
  HStack,
  VStack,
  Button,
  Flex,
  Divider,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";
import { database, initFirebase } from "../../utils/db";
import CKeditor from "../CKEditor";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { AiFillEye } from "react-icons/ai";
import EditTab from "./editTab";

const ContainerAddProductDescription = ({ values, reset, isUpdate }: any) => {
  initFirebase();
  const toast = useToast();
  const [editorLoaded, setEditorLoaded] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState<any>([{ id: 1 }]);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const add = () => {
    setEditorLoaded(false);
    setTabs([...tabs, { id: tabs.length + 1 }]);
    setTimeout(() => {
      setEditorLoaded(true);
    }, 500);
  };

  const load = () => {
    setEditorLoaded(false);
    setTimeout(() => {
      setEditorLoaded(true);
    }, 500);
  };

  useEffect(() => {
    if (values.tab) {
      setEditorLoaded(false);
      setTabs(values.tab);
      setTimeout(() => {
        setEditorLoaded(true);
      }, 500);
    }
  }, [values]);

  const remove = (index: number) => {
    let newList: any = [];
    tabs.forEach((list: any, indexRemove: number) => {
      if (index != indexRemove) newList.push(list);
    });
    setTabs(newList);
  };

  const saveProduct = async () => {
    try {
      if (isUpdate) {
        updateProduct({
          ...values,
          tab: tabs,
        });
        return;
      }

      let falt = false;
      tabs.forEach((key: any) => {
        if (!key.name) falt = true;
        if (!key.text) falt = true;
      });

      if (falt || Object.keys(tabs).length === 0) {
        toast({
          title: "Erro",
          description: "Preencha todos os campos",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      setLoading(true);

      const dbInstance = collection(database, "products");
      let exist = false;
      const q = query(dbInstance, orderBy("order", "desc"), limit(1));
      const qExist = query(
        dbInstance,
        where("name", "==", values.name),
        limit(1)
      );

      await getDocs(qExist).then((data) => {
        if (data.docs.length > 0) exist = true;
      });

      if (!exist) {
        await addDoc(dbInstance, {
          ...values,
          tab: tabs,
        });

        toast({
          title: "Sucesso",
          description: "Produto cadastradado com sucesso.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        reset();
      } else {
        toast({
          title: "Erro",
          description: "Produto já existe",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro",
        description: "Erro ao salvar produto",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (bodyForm: any) => {
    try {
      setLoading(true);

      const dbInstance = collection(database, "products");
      let exist = false;
      const qExist = query(
        dbInstance,
        where("name", "==", bodyForm.name),
        limit(1)
      );

      await getDocs(qExist).then((data) => {
        if (data.docs.length > 0 && data.docs[0].id != bodyForm.id)
          exist = true;
      });

      if (!exist) {
        const dbInstanceUpdate = doc(database, "products", bodyForm.id);
        delete bodyForm.id;
        delete bodyForm.ref;
        await updateDoc(dbInstanceUpdate, bodyForm);
        toast({
          title: "Sucesso",
          description: "Produto atualizado com sucesso.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        reset();
      } else {
        toast({
          title: "Erro",
          description: "Produto já existe",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar produto",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOnTabNameChange = (evt: BaseSyntheticEvent, tabIndex: number) => {
    let newList = tabs.map((tab: any, index: number) => {
      if (index === tabIndex)
        return {
          ...tab,
          name: evt.target.value,
        };

      return tab;
    });

    setTabs(newList);
  };

  return (
    <Box mt="30px" bg="white" borderRadius="8px" p="30px 40px" w="100%">
      <VStack spacing="30px" divider={<Divider />} w="100%">
        {tabs.map((list: any, tabIndex: number) => (
          <Box w="100%" key={tabIndex}>
            <Flex
              mb="20px"
              alignItems="center"
              justifyContent="space-between"
              w="100%"
            >
              <Flex alignItems="center" w="100%" maxW="636px">
                <Box w="100%" maxW="636px">
                  <Text color="black.800" fontSize="20px" mb="10px">
                    Nome da tab {tabIndex + 1}
                  </Text>
                  <InputGroup
                    borderRadius="6px"
                    bg="white.500"
                    p="3px 7px"
                    w="100%"
                    maxW="636px"
                    h="50px"
                    outline="none"
                    border="1px solid"
                    borderColor="black.800"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Input
                      w="100%"
                      maxW="636px"
                      height="100%"
                      border="none"
                      borderRadius="21px"
                      color="black.800"
                      placeholder="nome completo"
                      onChange={(evt) => handleOnTabNameChange(evt, tabIndex)}
                      value={tabs[tabIndex]?.name}
                      _focusVisible={{
                        outline: "none",
                      }}
                    />
                  </InputGroup>
                </Box>
              </Flex>
              <HStack spacing="20px">
                <Icon
                  as={GrAddCircle}
                  fontSize="30px"
                  cursor="pointer"
                  onClick={() => add()}
                />
                <Icon
                  as={GrSubtractCircle}
                  fontSize="30px"
                  cursor="pointer"
                  onClick={() => remove(tabIndex)}
                />
              </HStack>
            </Flex>
            {/* <Flex>
              <Text color="black.800" fontSize="20px" mb="10px">
                Conteúdo da tab
              </Text>
              <Icon as={AiFillEye} color="black.800" fontSize="20px" />
            </Flex>

            <Box color="black.800">
              <CKeditor
                name="description"
                onChange={(evt: any) => {
                  let newList = tabs;
                  newList[index].text = evt;
                  setTabs(newList);
                }}
                value={tabs[index]?.text ? tabs[index]?.text : ""}
                editorLoaded={editorLoaded}
              />
            </Box> */}

            <EditTab
              load={() => load()}
              editorLoaded={editorLoaded}
              setTabs={setTabs}
              index={tabIndex}
              tabs={tabs}
            />
          </Box>
        ))}
      </VStack>
      <Flex alignItems="center" justifyContent="flex-end" mt="53px" w="100%">
        <Button
          ml="auto"
          bg="red.600"
          color="white"
          fontSize="20px"
          borderRadius="4px"
          w="128px"
          h="47px"
          _hover={{ transition: "all 0.4s", opacity: 0.7 }}
          isLoading={loading}
          onClick={() => saveProduct()}
        >
          Salvar
        </Button>
      </Flex>
    </Box>
  );
};

export default ContainerAddProductDescription;
