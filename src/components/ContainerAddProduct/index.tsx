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
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import InputsHome from "../ContainerHome/inputs";
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";

const ContainerAddProduct = ({ nextStep }: any) => {
  const [hasVariation, setHasVariation] = useState(false);
  const [listVariation, setListVariation] = useState<any>([{ id: 1 }]);

  return (
    <Box mt="30px" bg="white" borderRadius="8px" p="30px 40px" w="100%">
      <VStack spacing="20px" w="100%">
        <HStack w="100%" spacing="20px">
          <InputsHome name="Nome do produto" typeInput="text" />
          <InputsHome
            name="Categoria"
            typeInput="select"
            options={["p1", "p2"]}
          />
        </HStack>
        <InputsHome name="Foto e vídeo do produto" typeInput="file" />
        <InputsHome name="Descrição curta" typeInput="textarea" />
        <Box w="100%">
          <Checkbox
            colorScheme="red"
            color="black.800"
            mr="auto"
            fontSize="20px"
            height="17px"
            defaultChecked={hasVariation}
            onChange={(check) => setHasVariation(check.target.checked)}
          >
            Produto tem variações ?
          </Checkbox>
        </Box>
      </VStack>
      <Divider m="20px 0px" />
      <VStack spacing="30px" divider={<Divider />} w="100%">
        {hasVariation &&
          listVariation.map((list: any, index: number) => (
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
                      Nome da variação {index + 1}
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
                    onClick={() =>
                      setListVariation([
                        ...listVariation,
                        { id: listVariation.length + 1 },
                      ])
                    }
                  />
                  <Icon
                    as={GrSubtractCircle}
                    fontSize="30px"
                    cursor="pointer"
                    onClick={() => {
                      let newList: any = [];
                      listVariation.forEach(
                        (list: any, indexRemove: number) => {
                          if (index != indexRemove) newList.push(list);
                        }
                      );
                      setListVariation(newList);
                    }}
                  />
                </HStack>
              </Flex>
              <InputGroup
                borderRadius="6px"
                bg="white.500"
                p="3px 7px"
                w="100%"
                h="50"
                outline="none"
                border="1px solid"
                borderColor="black.800"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Select
                  w="100%"
                  height="100%"
                  border="none"
                  borderRadius="21px"
                  placeholder="Opções de variação"
                  color="black.800"
                  _placeholder={{
                    color: "black.50",
                  }}
                  _focusVisible={{
                    outline: "none",
                  }}
                >
                  <option>opt 1</option>
                  <option>opt 2</option>
                </Select>
              </InputGroup>
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
          onClick={() => nextStep()}
        >
          Avançar
        </Button>
      </Flex>
    </Box>
  );
};

export default ContainerAddProduct;
