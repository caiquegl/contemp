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
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { SelectDefault } from "../Form/Select";
import { TextareaDefault } from "../Form/Textarea";
import Variation from "./Variantion";
import { ViewImage } from "./ViewImage";

const ContainerAddProduct = ({ nextStep, defaultValues }: any) => {
  initFirebase();
  const toast = useToast();
  const formRef = useRef<any>();
  const [hasVariation, setHasVariation] = useState<any>(false);
  const [isActive, setIsActive] = useState<any>(false);
  const [destaque, setDestaque] = useState<any>(false);
  const [listVariation, setListVariation] = useState<any>([{ id: 1 }]);
  const [list, setList] = useState<any>([]);
  const [urls, setUrls] = useState<any>([]);

  const { register, handleSubmit, formState, setValue, reset } = useForm({});

  const { errors } = formState;

  const saveProduct = async (bodyForm: any) => {
    let body = { ...bodyForm, hasVariation, urls, destaque, is_active: isActive };
    if (hasVariation) {
      let falt = false;
      let more = false;
      listVariation.forEach((list: any) => {
        if (!list.name) falt = true;
        if (!list.opt || list.opt.length === 0) more = true;
      });

      if (falt || more) {
        toast({
          title: "Erro",
          description: falt
            ? "Preencha todos os nome de variações"
            : "Adicione ao menos uma opção",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      body = { ...body, listVariation };
    }

    setListVariation([{ id: 1 }]);
    setUrls([]);
    nextStep(body);
    reset();
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
    setValue("key_word_seo", defaultValues?.key_word_seo);
    setValue("description_seo", defaultValues?.description_seo);
    setHasVariation(defaultValues && defaultValues.hasVariation ? true : false);
    setDestaque(defaultValues && defaultValues.destaque ? true : false);
    setIsActive(defaultValues && defaultValues.is_active ? true : false);
    if (defaultValues.listVariation) {
      setListVariation(defaultValues.listVariation);
    }
    if (defaultValues.urls) setUrls(defaultValues.urls);
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
            defaultValue={defaultValues.category}
            opt={list.map((value: any) => {
              return {
                name: value.name,
                value: value.id,
              };
            })}
            {...register("category", { required: "Campo obrigatório" })}
          />
        </HStack>
        <InputsHome
          name="Foto e vídeo do produto"
          typeInput="file"
          getUrls={(values: any) => setUrls([...urls, ...values])}
        />
        <HStack spacing="20px" flexWrap="wrap" w="100%" mt="20px">
          {urls &&
            urls.length > 0 &&
            urls.map((value: any, index: number) => (
              <ViewImage
                url={value}
                remove={() => {
                  let newList: any = [];
                  urls.forEach((value: any, indexRemove: number) => {
                    if (index != indexRemove) newList.push(value);
                  });
                  setUrls(newList);
                }}
              />
            ))}
        </HStack>
        <TextareaDefault
          label="Descrição curta"
          error={errors.description}
          {...register("description", {
            required: "Descrição é obrigatório",
          })}
        />
        <HStack spacing="20px" w="100%">
          <TextareaDefault
            label="Descrição SEO"
            error={errors.description_seo}
            {...register("description_seo", {
              required: "Descrição seo é obrigatório",
            })}
          />
          <TextareaDefault
            label="key Word SEO"
            error={errors.key_word_seo}
            {...register("key_word_seo", {
              required: "Key word seo é obrigatório",
            })}
          />
        </HStack>
        <Flex w="100%">
          <Checkbox
            colorScheme="red"
            color="black.800"
            mr="auto"
            fontSize="20px"
            height="17px"
            checked={hasVariation}
            isChecked={hasVariation}
            onChange={(check) => setHasVariation(check.target.checked)}
          >
            Produto tem variações ?
          </Checkbox>
          <Checkbox
            colorScheme="red"
            color="black.800"
            mr="auto"
            fontSize="20px"
            height="17px"
            ml="50px"
            checked={destaque}
            isChecked={destaque}
            onChange={(check) => setDestaque(check.target.checked)}
          >
            Adicionar ao corrocel de destaque ?
          </Checkbox>
          <Checkbox
            colorScheme="red"
            color="black.800"
            mr="auto"
            fontSize="20px"
            height="17px"
            checked={isActive}
            isChecked={isActive}
            onChange={(check) => setIsActive(check.target.checked)}
          >
            Ativo
          </Checkbox>
        </Flex>
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
                newList[index].name = variation.name;
                if (!variation.addOpt) return
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
