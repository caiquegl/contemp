import {
  Box,
  HStack,
  VStack,
  Checkbox,
  Button,
  Flex,
  useToast,
  FormControl,
  FormLabel,
  InputGroup,
  Select,
  FormErrorMessage
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { database, initFirebase } from '../../utils/db'
import InputsHome from './inputs'
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  updateDoc,
  doc
} from 'firebase/firestore'
import { InputDefault } from '../Form/Input'
import { SelectDefault } from '../Form/Select'
import { TextareaDefault } from '../Form/Textarea'
import { Controller, useForm } from 'react-hook-form'
import { ViewImage } from '../ContainerAddProduct/ViewImage'
import { v4 as uuidv4 } from 'uuid';

import { AsyncSelect, chakraComponents } from "chakra-react-select";
import category from '../../pages/api/category'
import { useAuth } from '../../contextAuth/authContext'

const asyncComponents = {
  LoadingIndicator: (props: any) => (
    <chakraComponents.LoadingIndicator
      // The color of the main line which makes up the spinner
      // This could be accomplished using `chakraStyles` but it is also available as a custom prop
      color="currentColor" // <-- This default's to your theme's text color (Light mode: gray.700 | Dark mode: whiteAlpha.900)
      // The color of the remaining space that makes up the spinner
      emptyColor="transparent"
      // The `size` prop on the Chakra spinner
      // Defaults to one size smaller than the Select's size
      spinnerSize="md"
      // A CSS <time> variable (s or ms) which determines the time it takes for the spinner to make one full rotation
      speed="0.45s"
      // A CSS size string representing the thickness of the spinner's line
      thickness="2px"

      // Don't forget to forward the props!
      {...props}
    />
  ),
};


const ContainerHome = ({ indexProduct, defaultValues, reset }: any) => {
  initFirebase()
  const { allCategory } = useAuth()

  const toast = useToast()
  const formRef = useRef<any>()
  const [loading, setLoading] = useState(false)
  const [hasCarrocel, setHasCarrocel] = useState(false)
  const [list, setList] = useState<any>([])
  const [urls, setUrls] = useState<any>([])
  const [icon, setIcon] = useState<any>('')
  const { register, handleSubmit, formState, setValue, control } = useForm({})

  const { errors } = formState

  const saveProduct = async (body: any) => {
    try {

      if (urls.length === 0 || !!!icon) {
        toast({
          title: 'Erro',
          description: 'Foto da imagem e icone são obrigatórios',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
        return
      }
      setLoading(true)

      const dbInstance = collection(database, 'home')
      let exist = false
      let bodyExist: any = {}

      const qExist = query(
        dbInstance,
        where('indexProduct', '==', indexProduct),
        limit(1)
      )

      await getDocs(qExist).then((data) => {
        if (data.docs.length > 0) {
          exist = true
          bodyExist = {
            id: data.docs[0].id,
            ref: data.docs[0].ref
          }
        }
      })

      if (!exist) {
        await addDoc(dbInstance, {
          ...body,
          indexProduct,
          destaque: hasCarrocel,
          category: body.category.value,
          urls,
          icon
        })

        toast({
          title: 'Sucesso',
          description: 'Produto cadastradado com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
      } else {
        const dbInstanceUpdate = doc(database, 'home', bodyExist.id)
        await updateDoc(dbInstanceUpdate, {
          ...body,
          category: body.category.value,
          indexProduct,
          destaque: hasCarrocel,
          urls,
          icon
        })
        toast({
          title: 'Sucesso',
          description: 'Produto atualizado com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Erro',
        description: 'Erro ao salvar produto',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } finally {
      setLoading(false)
      reset()
    }
  }

  const listCategory = async () => {
    try {
      const dbInstance = collection(database, 'categories')
      let newList: any = []
      const q = query(dbInstance, orderBy('order', 'asc'))
      await getDocs(q).then((data) => {
        data.docs.forEach((doc) => {
          newList.push({ ...doc.data(), id: doc.id, ref: doc.ref })
        })
      })

      setList(newList)
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao listar categoria',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  }

  useEffect(() => {
    listCategory()
  }, [])

  useEffect(() => {
    setValue('name', defaultValues?.name)
    // setValue('category', defaultValues?.category)
    setValue('description', defaultValues?.description)
    setValue('link_name', defaultValues?.link_name)
    setHasCarrocel(defaultValues && defaultValues.hasCarrocel ? true : false)
    setUrls(defaultValues && defaultValues.urls ? defaultValues.urls : [])
    setIcon(defaultValues && defaultValues.icon ? defaultValues.icon : '')
  }, [defaultValues])

  useEffect(() => {
    if (list.length > 0) {
      let find = allCategory.find((el: any) => el.id == defaultValues?.category)
      console.log(find)
      if (find && Object.keys(find).length > 0) setValue('category', { value: defaultValues?.category, label: find.name })
    }
  }, [list.length, allCategory])

  return (
    <Box
      mt="30px"
      bg="white"
      borderRadius="8px"
      p="30px 40px"
      maxW="882px"
      as="form"
      onSubmit={handleSubmit(saveProduct)}
      ref={formRef}
    >
      <VStack spacing="20px" w="100%">
        <HStack w="100%" spacing="20px">
          <InputDefault
            label="Nome do produto"
            type="text"
            placeholder="Nome do produto"
            error={errors.name}
            {...register('name', { required: 'Nome é obrigatório' })}
          />
          <Controller
            control={control}
            name="category"
            rules={{ required: "Campo obrigatório" }}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { error }
            }) => (
              <FormControl isInvalid={!!error} id={name} color="black.800">
                <FormLabel fontSize="20px" mb="10px" color="black.800">
                  Categoria
                </FormLabel>

                {/* <InputGroup
                  borderRadius="6px"
                  bg="white.500"
                  p="3px 7px"
                  w="100%"
                  h="50px"
                  outline="none"
                  border="1px solid"
                  borderColor="black.800"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                > */}
                <AsyncSelect
                  placeholder="Selecione"
                  size="lg"
                  name={name}
                  ref={ref}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  defaultInputValue={value}
                  components={asyncComponents}
                  useBasicStyles
                  options={list.map((el: any) => ({ label: el.name, value: el.id }))}

                  loadOptions={(inputValue, callback) => {
                    setTimeout(() => {
                      let filter = list.map((el: any) => ({ label: el.name, value: el.id }))
                      const values = filter.filter((option: any) =>
                        option.label.toLowerCase().includes(inputValue.toLowerCase())
                      );
                      callback(values);
                    }, 1500);
                  }}
                />
                {/* <Select
                    name={name}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    w="100%"
                    height="100%"
                    border="none"
                    borderRadius="21px"
                    color="black.800"
                    placeholder="Selecione uma opção"
                  >
                    {list &&
                      list.map((list: any) => (
                        <option value={list.value} key={uuidv4()}>
                          {list.name}
                        </option>
                      ))}
                  </Select> */}
                {/* </InputGroup> */}
                {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
              </FormControl>
            )} />
        </HStack>
        <HStack w="100%" spacing="20px">
          <InputDefault
            label="Link do Produto & Botão"
            type="text"
            placeholder="Link do Produto & Botão"
            error={errors.link_name}
            {...register('link_name', { required: 'Link é obrigatório' })}
          />
        </HStack>
        <HStack w="100%" spacing="20px">
          <Box w="100%">
            <InputsHome
              name="Foto do Produto"
              typeInput="file"
              getUrls={(values: any) => setUrls([...urls, ...values])}
            />
            <HStack spacing="20px" flexWrap="wrap" w="100%" marginTop={5}>
              {urls &&
                urls.length > 0 &&
                urls.map((value: any, index: number) => (
                  <ViewImage
                    key={uuidv4()}
                    url={value}
                    remove={() => {
                      let newList: any = []
                      urls.forEach((value: any, indexRemove: number) => {
                        if (index != indexRemove) newList.push(value)
                      })
                      setUrls(newList)
                    }}
                  />
                ))}
            </HStack>
          </Box>
          <Box w="100%">
            <InputsHome
              name="Foto Icone da Categoria"
              typeInput="fileSingle"
              getUrls={(link: any) => setIcon(link)}
            />
            <Box marginTop={5} w="200px">
              {icon && <ViewImage url={icon} remove={() => setIcon('')} />}
            </Box>
          </Box>
        </HStack>
        <TextareaDefault
          label="Descrição"
          error={errors.description}
          {...register('description', {
            required: 'Descrição é obrigatório'
          })}
        />
        <Box w="100%">
          <Checkbox
            colorScheme="red"
            color="black.800"
            mr="auto"
            fontSize="20px"
            height="17px"
            defaultChecked={hasCarrocel}
            checked={hasCarrocel}
            isChecked={hasCarrocel}
            onChange={(check) => setHasCarrocel(check.target.checked)}
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
          isLoading={loading}
          type="submit"
          _hover={{ transition: 'all 0.4s', opacity: 0.7 }}
        >
          Salvar
        </Button>
      </Flex>
    </Box>
  )
}

export default ContainerHome
