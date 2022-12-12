import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Text,
  Tbody,
  Td,
  HStack,
  Icon,
  Flex,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { collection, getDocs } from "firebase/firestore";
import { database, initFirebase } from "../../utils/db";
import ContainerSeo from "../ContainerSeo";
import moment from "moment";

const TabSeo = () => {
  initFirebase();
  const toast = useToast();

  const [step, setStep] = useState(1);
  const [list, setList] = useState<any>([]);
  const [listClone, setListClone] = useState<any>([]);
  const [body, setBody] = useState({});

  const listSeo = async () => {
    try {
      const dbInstance = collection(database, "seo");
      let newList: any = [];
      await getDocs(dbInstance).then((data) => {
        data.docs.forEach((doc) => {
          newList.push({ ...doc.data(), id: doc.id, ref: doc.ref });
        });
      });

      setList(newList);
      setListClone(newList);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao listar seo",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    listSeo();
  }, []);

  return (
    <>
      {step == 1 && (
        <>
          <Flex
            w="100%"
            alignItems="center"
            justifyContent="space-between"
            mb="18px"
          >
            <Button
              bg="red.600"
              color="white"
              fontSize="20px"
              borderRadius="4px"
              w="128px"
              h="47px"
              _hover={{ transition: "all 0.4s", opacity: 0.7 }}
              onClick={() => setStep(2)}
            >
              Adicionar
            </Button>
            <InputGroup
              borderRadius="25px"
              bg="white.500"
              p="3px 7px"
              w="100%"
              h="50px"
              maxW="288px"
              outline="none"
              border="1px solid"
              borderColor="black.800"
              color="black.800"
              mb="20px"
            >
              <Input
                w="100%"
                height="100%"
                border="none"
                borderRadius="21px"
                placeholder="Digite o produto..."
                type="text"
                onChange={(evt) => {
                  let newList = listClone.filter((item: any) =>
                    item.name
                      .toLowerCase()
                      .includes(evt.target.value.toLowerCase())
                  );
                  setList(newList);
                }}
                _focusVisible={{
                  outline: "none",
                }}
              />
              <InputRightElement
                children={<Icon as={BsSearch} fontSize="20px" />}
              />
            </InputGroup>
          </Flex>
          <Box borderRadius="8px" bg="white" p="30px" w="100%">
            <TableContainer>
              <Table color="black.800">
                <Thead>
                  <Tr>
                    <Th>
                      <Text fontWeight="bold">Nome</Text>
                    </Th>
                    <Th>
                      <Text fontWeight="bold">Título</Text>
                    </Th>
                    <Th>
                      <Text fontWeight="bold">Descrição</Text>
                    </Th>
                    <Th>
                      <Text fontWeight="bold">Tag</Text>
                    </Th>
                    <Th>
                      <Text fontWeight="bold">Atualização</Text>
                    </Th>
                    <Th />
                  </Tr>
                </Thead>
                <Tbody>
                  {list.length > 0 &&
                    list.map((table: any) => (
                      <Tr>
                        <Td>{table.name}</Td>
                        <Td>{table.title}</Td>
                        <Td>{table.description}</Td>
                        <Td>{table.tags}</Td>
                        <Td>
                          {moment(table.updated_at).format(
                            "DD/MM/YYYY HH:mm:ss"
                          )}
                        </Td>
                        <Td>
                          <HStack spacing="20px">
                            <Icon
                              cursor="pointer"
                              as={AiOutlineEdit}
                              fontSize="17px"
                              onClick={() => {
                                setBody(table);
                                setStep(2);
                              }}
                            />
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}
      {step == 2 && (
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
              w="128px"
              h="47px"
              border="2px solid"
              borderColor="black.800"
              _hover={{ transition: "all 0.4s", opacity: 0.7 }}
              onClick={() => {
                setBody({});
                setStep(1);
              }}
            >
              Voltar
            </Button>
          </Flex>
          <ContainerSeo
            defaultValues={body}
            nextStep={(data: any) => {
              setStep(1);
              setBody({});
              listSeo();
            }}
          />
        </>
      )}
    </>
  );
};

export default TabSeo;
