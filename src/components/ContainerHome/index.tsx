import {
  Box,
  HStack,
  VStack,
  Checkbox,
  Button,
  Flex,
  useToast
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
import { useForm } from 'react-hook-form'
import { ViewImage } from '../ContainerAddProduct/ViewImage'

const ContainerHome = ({ indexProduct, defaultValues, reset }: any) => {
  initFirebase()
  const toast = useToast()
  const formRef = useRef<any>()
  const [loading, setLoading] = useState(false)
  const [hasCarrocel, setHasCarrocel] = useState(false)
  const [list, setList] = useState<any>([])
  const [urls, setUrls] = useState<any>([])
  const [icon, setIcon] = useState<any>('')
  const { register, handleSubmit, formState, setValue } = useForm({})

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
    setValue('category', defaultValues?.category)
    setValue('description', defaultValues?.description)
    setValue('link_name', defaultValues?.link_name)
    setHasCarrocel(defaultValues && defaultValues.hasCarrocel ? true : false)
    setUrls(defaultValues && defaultValues.urls ? defaultValues.urls : [])
    setIcon(defaultValues && defaultValues.icon ? defaultValues.icon : '')
  }, [defaultValues])

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
          <SelectDefault
            label="Categoria"
            error={errors.category}
            defaultValue={defaultValues?.category}
            opt={list.map((value: any) => {
              return {
                name: value.name,
                value: value.id
              }
            })}
            {...register('category', { required: 'Campo obrigatório' })}
          />
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
