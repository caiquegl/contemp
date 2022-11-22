import {
  Box,
  Text,
  InputGroup,
  Input,
  HStack,
  VStack,
  Checkbox,
  Button,
  Flex,
  Divider,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";
import { database, initFirebase } from "../../utils/db";
import CKeditor from "../CKEditor";
import { InputDefault } from "../Form/Input";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const ContainerAddProductDescription = ({ values, reset }: any) => {
  initFirebase();
  const toast = useToast();
  const formRef = useRef<any>();
  const [listVariation, setListVariation] = useState([{ id: 1 }]);
  const [editorLoaded, setEditorLoaded] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState<any>([{ id: 1 }]);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  const add = () => {
    setEditorLoaded(false);
    setListVariation([...listVariation, { id: listVariation.length + 1 }]);
    setTimeout(() => {
      setEditorLoaded(true);
    }, 500);
  };

  const remove = (index: number) => {
    let newList: any = [];
    listVariation.forEach((list, indexRemove) => {
      if (index != indexRemove) newList.push(list);
    });
    setListVariation(newList);
  };

  const saveProduct = async () => {
    try {
      // if (Object.keys(update).length > 0) {
      //   updateCategory()bodyForm);
      //   return;
      // }

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
        reset()

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

  return (
    <Box mt="30px" bg="white" borderRadius="8px" p="30px 40px" w="100%">
      <VStack spacing="30px" divider={<Divider />} w="100%">
        {listVariation.map((list, index) => (
          <Box w="100%" key={index}>
            <Flex
              mb="20px"
              alignItems="center"
              justifyContent="space-between"
              w="100%"
            >
              <Flex alignItems="center" w="100%" maxW="636px">
                <Box w="100%" maxW="636px">
                  <Text color="black.800" fontSize="20px" mb="10px">
                    Nome da tab {index + 1}
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
                      onChange={(evt) => {
                        let newList = tabs;
                        newList[index].name = evt.target.value;
                        setTabs(newList);
                      }}
                      value={tabs[index]?.name}
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
                  onClick={() => remove(index)}
                />
              </HStack>
            </Flex>
            <Text color="black.800" fontSize="20px" mb="10px">
              Conteúdo da tab
            </Text>
            <Box color="black.800">
              <CKeditor
                name="description"
                onChange={(evt: any) => {
                  let newList = tabs;
                  newList[index].text = evt;
                  setTabs(newList);
                }}
                value={tabs[index]?.text}
                editorLoaded={editorLoaded}
              />
            </Box>
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
