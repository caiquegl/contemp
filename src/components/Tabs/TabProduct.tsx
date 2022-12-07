import {
  Box,
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
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import ContainerAddProduct from "../ContainerAddProduct";
import ContainerAddProductDescription from "../ContainerAddProductDescription";
import { database, initFirebase } from "../../utils/db";
import { useAuth } from "../../contextAuth/authContext";
import { Table } from "antd";

const TabProduct = () => {
  initFirebase();
  const toast = useToast();
  const { allCategory, allProducts, reload } = useAuth();

  const [step, setStep] = useState(1);
  const [list, setList] = useState<any>([]);
  const [listClone, setListClone] = useState<any>([]);
  const [body, setBody] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  const column = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name)
    },
    {
      title: 'Categoria',
      dataIndex: 'nameCategory',
      key: 'nameCategory',
      sorter: (a: any, b: any) => a.nameCategory.localeCompare(b.nameCategory)
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Ação',
      render: (a: any) => (
        <HStack spacing="20px">
          <Icon
            cursor="pointer"
            as={AiOutlineEdit}
            fontSize="17px"
            onClick={() => {
              console.log(JSON.stringify(a, null, 2))
              setBody(a);
              setIsUpdate(true);
              setStep(2);
            }}
          />
          <Icon
            cursor="pointer"
            as={AiOutlineClose}
            fontSize="17px"
            color="red.500"
            onClick={() => deleteProduct(a)}
          />
        </HStack>
      )
    }
  ]
  const listProduct = async () => {
    try {
      let newList: any = [];

      allProducts.forEach((el: any) => {
        newList.push({ ...el, nameCategory: allCategory.find((cg: any) => cg.id == el.category).name })
      })

      let sortList = newList.sort((a: any, b: any) => a.name.localeCompare(b.name))
      setList(sortList);
      setListClone(sortList);
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

  const deleteProduct = async (product: any) => {
    try {
      await deleteDoc(product.ref);
      toast({
        title: "Sucesso",
        description: "Produto deletada com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      listProduct();
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao deletar produto",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    listProduct();
  }, [allProducts, allCategory]);

  useEffect(() => {
    reload()
  }, [step])

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
            <Table dataSource={list} columns={column} />
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
          <ContainerAddProduct
            defaultValues={body}
            nextStep={(data: any) => {
              setBody({ ...body, ...data });
              setStep(3);
            }}
          />
        </>
      )}
      {step == 3 && (
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
              onClick={() => setStep(2)}
            >
              Voltar
            </Button>
          </Flex>
          <ContainerAddProductDescription
            values={body}
            isUpdate={isUpdate}
            reset={() => {
              setStep(1);
              listProduct();
              setIsUpdate(false);
              setBody({});
            }}
          />
        </>
      )}
    </>
  );
};

export default TabProduct;
