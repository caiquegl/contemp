import {
  Box,
  HStack,
  VStack,
  Checkbox,
  Button,
  Flex,
  Divider,
  useToast,
  FormControl,
  FormLabel,
  InputGroup,
  Select,
  FormErrorMessage
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import InputsHome from '../ContainerHome/inputs'
import { Controller, useForm } from 'react-hook-form'
import { InputDefault } from '../Form/Input'
import { database, initFirebase } from '../../utils/db/index'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { TextareaDefault } from '../Form/Textarea'
import Variation from './Variantion'
import { ViewImage } from './ViewImage'
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

const ContainerAddProduct = ({ nextStep, defaultValues }: any) => {
  initFirebase()
  const { allCategory } = useAuth()

  const toast = useToast()
  const formRef = useRef<any>()
  const [hasVariation, setHasVariation] = useState<any>(false)
  const [isActive, setIsActive] = useState<any>(false)
  const [destaque, setDestaque] = useState<any>(false)
  const [listVariation, setListVariation] = useState<any>([{ id: 1 }])
  const [list, setList] = useState<any>([])
  const [urls, setUrls] = useState<any>([])

  const { register, handleSubmit, formState, setValue, reset, control } = useForm({})

  const { errors } = formState

  const saveProduct = async (bodyForm: any) => {
    let body = {
      ...bodyForm,
      hasVariation,
      urls,
      destaque,
      is_active: isActive,
      category: bodyForm.category.value
    }

    if (hasVariation) {
      let falt = false
      let more = false
      listVariation.forEach((list: any) => {
        if (!list.name) falt = true
        if (!list.opt || list.opt.length === 0) more = true
      })

      if (falt || more) {
        toast({
          title: 'Erro',
          description: falt
            ? 'Preencha todos os nome de varia????es'
            : 'Adicione ao menos uma op????o',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
        return
      }

      body = { ...body, listVariation }
    }

    setListVariation([{ id: 1 }])
    setUrls([])
    nextStep(body)
    reset()
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

  const categoryOptions = list.map((value: any) => {
    return {
      name: value.name,
      value: value.id
    }
  })

  useEffect(() => {
    setValue('name', defaultValues?.name)
    setValue('name', defaultValues?.name)
    setValue('description', defaultValues?.description)
    setValue('key_word_seo', defaultValues?.key_word_seo)
    setValue('description_seo', defaultValues?.description_seo)
    setHasVariation(defaultValues && defaultValues.hasVariation ? true : false)
    setDestaque(defaultValues && defaultValues.destaque ? true : false)
    setIsActive(defaultValues && defaultValues.is_active ? true : false)
    if (defaultValues.listVariation) {
      setListVariation(defaultValues.listVariation)
    }
    if (defaultValues.urls) setUrls(defaultValues.urls)
  }, [defaultValues])

  useEffect(() => {
    if (list.length > 0) {
      let find = allCategory.find((el: any) => el.id == defaultValues?.category)
      if (find && Object.keys(find).length > 0) setValue('category', { value: defaultValues?.category, label: find.name })
    }
  }, [list.length, allCategory])

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
            placeholder="Nome do produto"
            error={errors.name}
            {...register('name', { required: 'Nome ?? obrigat??rio' })}
          />
          <Controller
            control={control}
            name="category"
            rules={{ required: "Campo obrigat??rio" }}
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
                  components={asyncComponents}
                  useBasicStyles
                  options={categoryOptions.map((el: any) => ({ label: el.name, value: el.value }))}

                  loadOptions={(inputValue, callback) => {
                    setTimeout(() => {
                      let filter = categoryOptions.map((el: any) => ({ label: el.name, value: el.value }))
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
                    placeholder="Selecione uma op????o"
                  >
                    {categoryOptions &&
                      categoryOptions.map((list: any) => (
                        <option value={list.value} key={uuidv4()}>
                          {list.name}
                        </option>
                      ))}
                  </Select>
                </InputGroup> */}
                {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
              </FormControl>
            )} />
          {/* <SelectDefault
            label="Categoria"
            error={errors.category}
            opt={categoryOptions}
            {...register('category', { required: 'Campo obrigat??rio' })}
          /> */}
        </HStack>
        <InputsHome
          name="Foto e v??deo do produto"
          typeInput="file"
          getUrls={(values: any) => setUrls([...urls, ...values])}
        />
        <HStack spacing="20px" flexWrap="wrap" w="100%" mt="20px">
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
        <TextareaDefault
          label="Descri????o curta"
          error={errors.description}
          {...register('description', {
            required: 'Descri????o ?? obrigat??rio'
          })}
        />
        <HStack spacing="20px" w="100%">
          <TextareaDefault
            label="Descri????o SEO"
            error={errors.description_seo}
            {...register('description_seo', {
              required: 'Descri????o seo ?? obrigat??rio'
            })}
          />
          <TextareaDefault
            label="key Word SEO"
            error={errors.key_word_seo}
            {...register('key_word_seo', {
              required: 'Key word seo ?? obrigat??rio'
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
            Produto tem varia????es ?
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
              key={uuidv4()}
              newVariation={() => {
                setListVariation([
                  ...listVariation,
                  { id: listVariation.length + 1 }
                ])
              }}
              removeVariation={() => {
                let newList: any = []
                listVariation.forEach((list: any, indexRemove: number) => {
                  if (index != indexRemove) newList.push(list)
                })
                setListVariation(newList)
              }}
              index={index}
              addVariation={(variation: any) => {
                let newList = listVariation
                newList[index].name = variation.name
                if (!variation.addOpt) return
                if (newList[index].opt) {
                  newList[index].opt.push(variation.addOpt)
                } else {
                  newList[index].opt = [variation.addOpt]
                }

                setListVariation(newList)
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
          _hover={{ transition: 'all 0.4s', opacity: 0.7 }}
          type="button"
          onClick={() => formRef.current?.requestSubmit()}
        >
          Avan??ar
        </Button>
      </Flex>
    </Box>
  )
}

export default ContainerAddProduct
