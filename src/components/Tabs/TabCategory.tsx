import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { database, initFirebase } from "../../utils/db/index";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { InputDefault } from "../Form/Input";
import { useForm } from "react-hook-form";
import { SelectDefault } from "../Form/Select";
import { TextareaDefault } from "../Form/Textarea";
import { CheckboxDefault } from "../Form/Checkbox";
import { EditOrder } from "../EditOrder";
interface IBody {
  name: string;
  is_main?: string;
  sub_categorie?: string;
  description: string;
  favorite: boolean;
}

const TabCategory = () => {
  const toast = useToast();
  initFirebase();
  const [update, setUpdate] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [list, setList] = useState<any>([]);
  const formRef = useRef<any>();

  const { register, handleSubmit, formState, reset, watch, setValue } = useForm(
    {}
  );

  const { errors } = formState;

  const saveCategory = async (bodyForm: any) => {
    try {
      if (Object.keys(update).length > 0) {
        updateCategory(bodyForm);
        return;
      }
      setLoading(false);

      const dbInstance = collection(database, "categories");
      let exist = false;
      let order: any = 0;
      const q = query(dbInstance, orderBy("order", "desc"), limit(1));
      const qExist = query(
        dbInstance,
        where("name", "==", bodyForm.name),
        limit(1)
      );

      await getDocs(q).then((data) => {
        order = data.docs[0].data().order;
      });

      await getDocs(qExist).then((data) => {
        if (data.docs.length > 0) exist = true;
      });

      if (!exist) {
        await addDoc(dbInstance, {
          ...bodyForm,
          favorite: isFavorite,
          order: order + 1,
        });

        toast({
          title: "Sucesso",
          description: "Categoria cadastradado com sucesso.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        reset();
        setUpdate({} as IBody);
        listCategory();
      } else {
        toast({
          title: "Erro",
          description: "Categoria já existe",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar categoria",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (bodyForm: any) => {
    try {
      setLoading(false);

      const dbInstance = collection(database, "categories");
      let exist = false;
      const q = query(dbInstance, orderBy("order", "desc"), limit(1));
      const qExist = query(
        dbInstance,
        where("name", "==", bodyForm.name),
        limit(1)
      );

      await getDocs(qExist).then((data) => {
        console.log(data.docs[0]?.data().order, update.order);
        if (data.docs.length > 0 && data.docs[0]?.data().order != update.order)
          exist = true;
      });

      if (!exist) {
        const dbInstanceUpdate = doc(database, "categories", update.id);
        await updateDoc(dbInstanceUpdate, {
          ...bodyForm,
          favorite: isFavorite,
        });
        setUpdate({});

        toast({
          title: "Sucesso",
          description: "Categoria cadastradado com sucesso.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        reset();
        setUpdate({} as IBody);
        listCategory();
      } else {
        toast({
          title: "Erro",
          description: "Categoria já existe",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar categoria",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
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

  const deleteCategory = async (category: any) => {
    try {
      await deleteDoc(category.ref);
      toast({
        title: "Sucesso",
        description: "Categoria deletada com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      listCategory();
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao deletar categoria",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const changerOrder = async (order: number, ref: any) => {
    try {
      const dbInstance = collection(database, "categories");
      const qExist = query(dbInstance, where("order", "==", order), limit(1));

      let sub: any = {};

      await getDocs(qExist).then((data) => {
        data.docs.forEach((doc) => {
          sub = { ...doc.data(), id: doc.id, ref: doc.ref };
        });
      });

      if (Object.keys(sub).length > 0) {
        const dbInstanceUpdate = doc(database, "categories", sub.id);
        await updateDoc(dbInstanceUpdate, { order: parseInt(ref.order) });
      }

      const dbInstanceUpdate = doc(database, "categories", ref.id);
      await updateDoc(dbInstanceUpdate, { order: order });
      listCategory();
      toast({
        title: "Sucesso",
        description: "Sucesso ao alterar ordem.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao alterar ordem",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useState(() => {
    listCategory();
  }, []);

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
              {list.length > 0 &&
                list.map((value: any) => (
                  <Tr>
                    <Td>
                      <EditOrder value={value} changerOrder={changerOrder} />
                    </Td>
                    <Td>{value.name}</Td>
                    <Td>
                      <HStack spacing="20px">
                        <Icon
                          cursor="pointer"
                          as={AiOutlineEdit}
                          fontSize="17px"
                          onClick={() => {
                            setValue("name", value.name);
                            setValue("is_main", value.is_main);
                            setValue("description", value.description);
                            setValue("favorite", value.favorite);
                            setIsFavorite(value.favorite);
                            setUpdate(value);
                            if (value.sub_categorie)
                              setValue("sub_categorie", value.sub_categorie);
                          }}
                        />
                        <Icon
                          cursor="pointer"
                          as={AiOutlineClose}
                          fontSize="17px"
                          color="red.500"
                          onClick={() => deleteCategory(value)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        borderRadius="8px"
        bg="white"
        p="30px"
        w="379px"
        as="form"
        onSubmit={handleSubmit(saveCategory)}
        ref={formRef}
      >
        <VStack spacing="20px" w="100%">
          <InputDefault
            label="Nome da categoria"
            type="text"
            error={errors.name}
            {...register("name", { required: "Nome é obrigatório" })}
          />
          <SelectDefault
            label="É principal?"
            error={errors.is_main}
            opt={[
              { name: "SIM", value: "true" },
              { name: "NÃO", value: "false" },
            ]}
            {...register("is_main", { required: "Campo obrigatório" })}
          />
          {watch().is_main == "false" && (
            <SelectDefault
              label="Selecione a categoria"
              error={errors.sub_categorie}
              opt={list.map((value: any) => {
                return {
                  name: value.name,
                  value: value.name,
                };
              })}
              {...register("sub_categorie", { required: "Campo obrigatório" })}
            />
          )}
          <TextareaDefault
            label="Descrição"
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
              isChecked={isFavorite}
              onChange={(evt) => setIsFavorite(evt.target.checked)}
            >
              Categoria destaque
            </Checkbox>
          </Box>

          {/* <CheckboxDefault
            label="Categoria destaque"
            error={errors.favorite}
            defaultCheck={update.favorite}
            {...register("favorite")}
          /> */}
        </VStack>
        <Flex
          alignItems="center"
          justifyContent={
            Object.keys(update).length > 0 ? "space-between" : "flex-end"
          }
          mt="53px"
          w="100%"
        >
          {Object.keys(update).length > 0 && (
            <Button
              ml="auto"
              bg="transparent"
              color="black.800"
              fontSize="20px"
              borderRadius="4px"
              borderColor="black.800"
              borderWidth="1px"
              w="88px"
              h="47px"
              isLoading={loading}
              _hover={{ transition: "all 0.4s", opacity: 0.7 }}
              onClick={() => {
                setUpdate({});
                reset();
              }}
              type="button"
            >
              Cancelar
            </Button>
          )}
          <Button
            ml="auto"
            bg="red.600"
            color="white"
            fontSize="20px"
            borderRadius="4px"
            w="128px"
            h="47px"
            isLoading={loading}
            _hover={{ transition: "all 0.4s", opacity: 0.7 }}
            type="submit"
          >
            Salvar
          </Button>
        </Flex>
      </Box>
    </HStack>
  );
};

export default TabCategory;
