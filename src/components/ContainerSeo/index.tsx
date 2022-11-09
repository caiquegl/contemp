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
} from "@chakra-ui/react";
import InputsHome from "../ContainerHome/inputs";

const ContainerSeo = () => {
  return (
    <Box mt="30px" bg="white" borderRadius="8px" p="30px 40px">
      <VStack spacing="20px" w="100%">
        <InputsHome name="Nome do produto ou categoria" typeInput="text" />
        <InputsHome name="Título" typeInput="text" />
        <InputsHome name="Descrição" typeInput="textarea" />
        <InputsHome name="Tags" typeInput="text" />
      </VStack>
      <Divider />
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

export default ContainerSeo;
