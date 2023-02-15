import {
  Box,
  InputGroup,
  HStack,
  Flex,
  Icon,
  Select,
  FormLabel,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";
import { useForm } from "react-hook-form";
import { InputDefault } from "../Form/Input";
import { v4 as uuidv4 } from 'uuid';

const Variation = ({
  index,
  addVariation,
  defaultValues,
  newVariation,
  removeVariation,
  removeOptVariation
}: any) => {
  const [list, setList] = useState<any>([])
  const formRefOpt = useRef<any>();

  const { register, handleSubmit, formState, setValue, resetField } = useForm(
    {}
  );

  const { errors } = formState;

  const insertOptVariation = (variation: any) => {
    addVariation(variation);
    resetField("addOpt");
  };

  useEffect(() => {
    setValue("name", defaultValues?.name);
  }, [defaultValues]);

  return (
    <Box
      w="100%"
      as="form"
      onSubmit={handleSubmit(insertOptVariation)}
      ref={formRefOpt}
    >
      <Flex
        mb="20px"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
      >
        <Flex alignItems="center" w="100%" maxW="636px">
          <Box w="400px">
            <InputDefault
              label={`Nome da variação ${index + 1}`}
              type="text"
              error={errors.name}
              {...register("name", { required: "Nome é obrigatório" })}
            />
          </Box>
        </Flex>
        <HStack spacing="20px">
          <Icon
            as={GrAddCircle}
            fontSize="30px"
            cursor="pointer"
            onClick={() => newVariation()}
          />
          <Icon
            as={GrSubtractCircle}
            fontSize="30px"
            cursor="pointer"
            onClick={() => removeVariation()}
          />
        </HStack>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" w="100%">
        <Flex alignItems="center">
          <Box w="400px">
            <InputDefault
              label="Adicionar opção"
              type="text"
              error={errors.addOpt}
              {...register("addOpt")}
            />
          </Box>
          <Icon
            as={GrAddCircle}
            fontSize="30px"
            cursor="pointer"
            ml="20px"
            onClick={() => formRefOpt.current?.requestSubmit()}
          />
        </Flex>

        <Box w="100%" ml="50px">
          <UnorderedList>
              {defaultValues.opt &&
                defaultValues.opt.map((value: any, index: number) => (
                  <ListItem key={uuidv4()} color="black.800" fontSize="18px" mb="6px">
                    <Flex alignItems="center">
                      {value}
                      <Icon
                        as={GrSubtractCircle}
                        fontSize="20px"
                        ml="10px"
                        cursor="pointer"
                        onClick={() => removeOptVariation(index)}
                      />
                    </Flex>
                  </ListItem>
                ))}
            </UnorderedList>
          {/* <FormLabel fontSize="20px" mb="10px" color="black.800">
            Opções
          </FormLabel>
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
              {defaultValues.opt &&
                defaultValues.opt.map((value: any) => (
                  <option key={uuidv4()}>{value}</option>
                ))}
            </Select>
          </InputGroup> */}
        </Box>
      </Flex>
    </Box>
  );
};

export default Variation;
