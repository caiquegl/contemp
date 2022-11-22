import {
  Box,
  HStack,
  VStack,
  Checkbox,
  Button,
  Flex,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import InputsHome from "../ContainerHome/inputs";
import { useForm } from "react-hook-form";
import { InputDefault } from "../Form/Input";
import { database, initFirebase } from "../../utils/db/index";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { SelectDefault } from "../Form/Select";
import { TextareaDefault } from "../Form/Textarea";
import Variation from "./Variantion";

const ContainerAddProduct = ({ nextStep, defaultValues }: any) => {
  initFirebase();
  const toast = useToast();
  const formRef = useRef<any>();
  const [hasVariation, setHasVariation] = useState<any>(false);
  const [listVariation, setListVariation] = useState<any>([{ id: 1 }]);
  const [list, setList] = useState<any>([]);

  const { register, handleSubmit, formState, setValue, reset } = useForm({});

  const { errors } = formState;

  const saveProduct = async (bodyForm: any) => {
    let body = { ...bodyForm, hasVariation };
    if (hasVariation) {
      let falt = false;
      let more = false;
      listVariation.forEach((list: any) => {
        if(!list.name) falt = true
        if(!list.opt || list.opt.length === 0) more = true
      })


      if(falt || more) {
        toast({
          title: "Erro",
          description: falt ? "Preencha todos os nome de variações" : "Adicione ao menos uma opção",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return
      }

      body = { ...body, listVariation };
    }

    let nameCategory = ''

    list.forEach((category: any) => {
      if(category.id == body.category) nameCategory = category.name
    })

    body.nameCategory = nameCategory

    nextStep(body);
    reset()
  };

  const listCategory = async () => {
    try {
      const dbInstance = collection(database, "categories");
      let newList: any = [];
      const q = query(dbInstance, orderBy("order", "asc"));
      await getDocs(q).then((data) => {
        data.docs.forEach((doc) => {
          newList.push({ ...doc.data(), id: doc.id, ref: doc.ref });
        });
      });

      setList(newList);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao listar categoria",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    listCategory();
  }, []);

  useEffect(() => {
    setValue("name", defaultValues?.name);
    setValue("category", defaultValues?.category);
    setValue("description", defaultValues?.description);
    setHasVariation(defaultValues && defaultValues.hasVariation ? true : false);
  }, [defaultValues]);

  return (
    <Box mt="30px" bg="white" borderRadius="8px" p="30px 40px" w="100%">
      <VStack
        spacing="20px"
        w="100%"
        as="form"
        onSubmit={handleSubmit(saveProduct)}
        ref={formRef}
      >
        <HStack w="100%" spacing="20px">
          <InputDefault
            label="Nome do produto"
            type="text"
            placeholder="nome do produto"
            error={errors.name}
            {...register("name", { required: "Nome é obrigatório" })}
          />
          <SelectDefault
            label="Categoria"
            error={errors.category}
            opt={list.map((value: any) => {
              return {
                name: value.name,
                value: value.id,
              };
            })}
            {...register("category", { required: "Campo obrigatório" })}
          />
        </HStack>
        <InputsHome name="Foto e vídeo do produto" typeInput="file" />
        <TextareaDefault
          label="Descrição curta"
          error={errors.description}
          {...register("description", {
            required: "Descrição é obrigatório",
          })}
        />
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
            <Variation
              newVariation={() => {
                setListVariation([
                  ...listVariation,
                  { id: listVariation.length + 1 },
                ]);
              }}
              removeVariation={() => {
                let newList: any = [];
                listVariation.forEach((list: any, indexRemove: number) => {
                  if (index != indexRemove) newList.push(list);
                });
                setListVariation(newList);
              }}
              index={index}
              key={index}
              addVariation={(variation: any) => {
                let newList = listVariation;
                newList[index].name = variation.name

                if (newList[index].opt) {
                  newList[index].opt.push(variation.addOpt);
                } else {
                  newList[index].opt = [variation.addOpt];
                }

                setListVariation(newList);
              }}
              defaultValues={listVariation[index]}
            />
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
          type="button"
          onClick={() => formRef.current?.requestSubmit()}
        >
          Avançar
        </Button>
      </Flex>
    </Box>
  );
};

export default ContainerAddProduct;
