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
} from "@chakra-ui/react";
import InputsHome from "./inputs";

const ContainerHome = () => {
  return (
    <Box mt="30px" bg="white" borderRadius="8px" p="30px 40px" maxW="882px">
      <VStack spacing="20px" w="100%">
        <HStack w="100%" spacing="20px">
          <InputsHome name="Nome do produto" typeInput="text" />
          <InputsHome
            name="Categoria"
            typeInput="select"
            options={["p1", "p2"]}
          />
        </HStack>
        <HStack w="100%" spacing="20px">
          <InputsHome name="Link do Produto & Botão" typeInput="text" />
          <InputsHome name="Link da Categoria" typeInput="text" />
        </HStack>
        <HStack w="100%" spacing="20px">
          <InputsHome name="Foto do Produto" typeInput="file" />
          <InputsHome name="Foto Icone da Categoria" typeInput="file" />
        </HStack>
        <InputsHome name="Descrição" typeInput="textArea" />
        <Box w="100%">
          <Checkbox
            colorScheme="red"
            color="black.800"
            mr="auto"
            fontSize="20px"
            height="17px"
          >
            Adicionar ao carrossel de destaque
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
  );
};

export default ContainerHome;
