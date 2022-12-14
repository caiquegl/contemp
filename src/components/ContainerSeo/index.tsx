import { Box, VStack, Button, Flex, Divider, useToast } from '@chakra-ui/react'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { database, initFirebase } from '../../utils/db'
import moment from 'moment'
import { InputDefault } from '../Form/Input'
import { TextareaDefault } from '../Form/Textarea'

const ContainerSeo = ({ nextStep, defaultValues }: any) => {
  initFirebase()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState, setValue, reset } = useForm({})
  const { errors } = formState

  const saveSEO = async (bodyForm: any) => {
    try {
      bodyForm.updated_at = moment().toString()
      if (Object.keys(defaultValues).length > 0) {
        updateSEO(bodyForm)
        return
      }

      setLoading(true)

      const dbInstance = collection(database, 'seo')
      let exist = false
      const q = query(dbInstance, orderBy('order', 'desc'), limit(1))
      const qExist = query(
        dbInstance,
        where('name', '==', bodyForm.name),
        limit(1)
      )

      await getDocs(qExist).then((data) => {
        if (data.docs.length > 0) exist = true
      })

      if (!exist) {
        await addDoc(dbInstance, bodyForm)

        toast({
          title: 'Sucesso',
          description: 'SEO cadastradado com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
        reset()
      } else {
        toast({
          title: 'Erro',
          description: 'SEO já existe',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      }
      nextStep()
    } catch (error) {
      console.log(error)
      toast({
        title: 'Erro',
        description: 'Erro ao salvar SEO',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } finally {
      setLoading(false)
    }
  }

  const updateSEO = async (bodyForm: any) => {
    try {
      setLoading(true)

      const dbInstance = collection(database, 'seo')
      let exist = false
      const qExist = query(
        dbInstance,
        where('name', '==', bodyForm.name),
        limit(1)
      )

      await getDocs(qExist).then((data) => {
        if (data.docs.length > 0 && data.docs[0].id != defaultValues.id)
          exist = true
      })

      if (!exist) {
        const dbInstanceUpdate = doc(database, 'seo', defaultValues.id)
        await updateDoc(dbInstanceUpdate, bodyForm)
        toast({
          title: 'Sucesso',
          description: 'SEO atualizado com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
        reset()
      } else {
        toast({
          title: 'Erro',
          description: 'SEO já existe',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      }
      nextStep()
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar SEO',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setValue('name', defaultValues?.name)
    setValue('title', defaultValues?.title)
    setValue('description', defaultValues?.description)
    setValue('tags', defaultValues?.tags)
  }, [defaultValues])

  return (
    <Box
      mt="30px"
      bg="white"
      borderRadius="8px"
      p="30px 40px"
      as="form"
      onSubmit={handleSubmit(saveSEO)}
    >
      <VStack spacing="20px" w="100%">
        <InputDefault
          label="Nome do produto"
          type="text"
          placeholder="Nome do produto"
          error={errors.name}
          {...register('name', { required: 'Nome é obrigatório' })}
        />
        <InputDefault
          label="Título"
          type="text"
          placeholder="Título"
          error={errors.name}
          {...register('title', { required: 'Título é obrigatório' })}
        />
        <TextareaDefault
          label="Descrição curta"
          error={errors.description}
          {...register('description', {
            required: 'Descrição é obrigatório'
          })}
        />
        <InputDefault
          label="Tags"
          type="text"
          placeholder="tags"
          error={errors.name}
          {...register('tags', { required: 'tag é obrigatório' })}
        />
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
          type="submit"
          isLoading={loading}
          _hover={{ transition: 'all 0.4s', opacity: 0.7 }}
        >
          Salvar
        </Button>
      </Flex>
    </Box>
  )
}

export default ContainerSeo
