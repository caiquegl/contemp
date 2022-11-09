import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Icon,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import InputsHome from "../ContainerHome/inputs";

const TabCategory = () => {
  return (
    <HStack spacing="20px" alignItems="flex-start">
      <Box borderRadius="8px" bg="white" p="30px" w="100%">
        <TableContainer>
          <Table color="black.800">
            <Thead>
              <Tr>
                <Th>
                  <Text fontWeight="bold">Ordem</Text>
                </Th>
                <Th>
                  <Text fontWeight="bold">Nome</Text>
                </Th>
                <Th>
                  <Text fontWeight="bold">Ações</Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>1</Td>
                <Td>Nome Completo da Categoria</Td>
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
                <Td>2</Td>
                <Td>Nome Completo da Categoria</Td>
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
      <Box borderRadius="8px" bg="white" p="30px" w="379px">
        <VStack spacing="20px" w="100%">
          <InputsHome name="Nome da categoria" typeInput="text" />
          <InputsHome
            name="É principal?"
            typeInput="select"
            options={["SIM", "NÃO"]}
          />
          <InputsHome
            name="Pertence a"
            typeInput="select"
            options={["SIM", "NÃO"]}
          />
          <InputsHome name="Descrição" typeInput="textarea" />
          <Box w="100%">
            <Checkbox
              colorScheme="red"
              color="black.800"
              mr="auto"
              fontSize="20px"
              height="17px"
            >
              Categoria destaque
            </Checkbox>
          </Box>
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
          >
            Salvar
          </Button>
        </Flex>
      </Box>
    </HStack>
  );
};

export default TabCategory;
