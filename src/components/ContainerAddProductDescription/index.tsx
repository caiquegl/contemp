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
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";
import CKeditor from "../CKEditor";

const ContainerAddProductDescription = () => {
  const [listVariation, setListVariation] = useState([{ id: 1 }]);
  const [editorLoaded, setEditorLoaded] = useState<any>(false);
  const [data, setData] = useState<any>("");
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

  return (
    <Box mt="30px" bg="white" borderRadius="8px" p="30px 40px" w="100%">
      <VStack spacing="30px" divider={<Divider />} w="100%">
        {listVariation.map((list, index) => (
          <Box w="100%">
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
                      placeholder="nome completo"
                      _focusVisible={{
                        outline: "none",
                      }}
                    />
                  </InputGroup>
                </Box>
                <Flex
                  ml="10px"
                  h="100%"
                  alignItems="center"
                  justifyContent="center"
                  pt="30px"
                >
                  <Checkbox
                    colorScheme="red"
                    color="black.800"
                    fontSize="20px"
                    height="17px"
                  >
                    Ativar
                  </Checkbox>
                </Flex>
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
                onChange={(data: any) => {
                  setData(data);
                }}
                editorLoaded={editorLoaded}
                value={data}
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
          onClick={() => {}}
        >
          Salvar
        </Button>
      </Flex>
    </Box>
  );
};

export default ContainerAddProductDescription;
