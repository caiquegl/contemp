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
} from "@chakra-ui/react";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

const TabProduct = () => {
  return (
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
                  <Text fontWeight="bold">Categoria</Text>
                </Th>
                <Th>
                  <Text fontWeight="bold">Url</Text>
                </Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Nome Completo do produto</Td>
                <Td>Nome Completo da Categoria</Td>
                <Td>url</Td>
                <Td>
                  <HStack spacing="20px">
                    <Icon cursor="pointer" as={AiOutlineEdit} fontSize="17px" />
                    <Icon
                      cursor="pointer"
                      as={AiOutlineClose}
                      fontSize="17px"
                      color="red.500"
                    />
                  </HStack>
                </Td>
              </Tr>
              <Tr>
                <Td>Nome Completo do produto</Td>
                <Td>Nome Completo da Categoria</Td>
                <Td>url</Td>
                <Td>
                  <HStack spacing="20px">
                    <Icon cursor="pointer" as={AiOutlineEdit} fontSize="17px" />
                    <Icon
                      cursor="pointer"
                      as={AiOutlineClose}
                      fontSize="17px"
                      color="red.500"
                    />
                  </HStack>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default TabProduct;
