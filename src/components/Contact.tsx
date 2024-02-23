import {
  Box,
  Button,
  Container as ContainerChakra,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Input,
  InputGroup,
  Select,
  Text,
  Textarea,
  VStack,
  Link,
  useToast,
  Spinner,
  Center,
  Heading,
} from '@chakra-ui/react'
import React, { Fragment, useCallback, useRef, useState } from 'react'
import { BsTelephone } from 'react-icons/bs'
import { BiMap } from 'react-icons/bi'
import { TbSend } from 'react-icons/tb'
import { AiOutlineCloseCircle, AiOutlineFile } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import { InputDefault } from './Form/Input'
import { TextareaDefault } from './Form/Textarea'
import { SelectDefault } from './Form/Select'
import { storage } from '../utils/db'
import { v4 as uuidv4 } from 'uuid'
import { Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { api } from '../lib/axios'
const { Dragger } = Upload

interface IProps {
  title: string
  description: string
  ocultAddres?: boolean
  form: any
  id?: string
}
export const Contact = ({ title, description, ocultAddres, form, id }: IProps) => {
  const [loading, setLoading] = useState(false)
  const [loadingUpload, setLoadingUpload] = useState(false)
  const toast = useToast()
  const formRef = useRef<any>()
  const [file, setFile] = useState('')
  const { register, handleSubmit, formState, reset, watch, setValue, control } = useForm({})
  const { errors } = formState

  const sendMail = async (bodyForm: any) => {
    try {
      setLoading(true)
      let newBody: any = { body: bodyForm, id }
      if (file) newBody.arquivo = file
      await fetch(`api/mail`, {
        method: 'POST',
        body: JSON.stringify({
          email: bodyForm['E-mail'],
          name: bodyForm['Nome'],
          empresa: bodyForm['Empresa'],
          telephone: bodyForm['Telefone'],
          description: bodyForm['Mensagem'],
          area: bodyForm['Área desejada'],
          file: file,
          id,
        }),
      })
      reset()
      toast({
        title: 'Sucesso',
        description: 'Sucesso ao enviar email',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao enviar email',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  const onDrop = useCallback(async (acceptedFiles: any) => {
    acceptedFiles.forEach(async (file: any) => {

      const formData = new FormData()
      formData.append('files', file)
      formData.append('picture', true)
      formData.append('nameFile', `${file.name}-${new Date()}`)

      const { data } = await api.post('upload', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      })

      setLoadingUpload(false)
      setFile(data.url)

    })
  }, [])

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    async onChange(info: any) {
      const { status, name } = info.file

      const formData = new FormData()
      formData.append('files', info.file)
      formData.append('picture', true)
      formData.append('nameFile', `${name}-${new Date()}`)

      const { data } = await api.post('upload', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      })

      setFile(data.url)

    },

    // if (status !== 'uploading') {
    //   console.log(info.file, info.fileList);
    // }
    // if (status === 'done') {
    //   message.success(`${info.file.name} file uploaded successfully.`);
    // } else if (status === 'error') {
    //   message.error(`${info.file.name} file upload failed.`);
    // }
    async onDrop(e: any) {
      const { status, name } = info.file

      const formData = new FormData()
      formData.append('files', info.file)
      formData.append('picture', true)
      formData.append('nameFile', `${name}-${new Date()}`)

      const { data } = await api.post('upload', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      })

      setFile(data.url)
    },
  }

  return (
    <Box w='100%' bg='white' pt='100px' pb='100px'>
      <ContainerChakra maxW='6xl' p={['12px 20px', '12px 20px', '12px 20px', '12px 20px', '12px 0 31px']}>
        <Grid
          templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)']}
          w='100%'
          gap='40px'
        >
          <GridItem w='100%'>
            <Heading as={'h3'} className='contato-titulo text-red' mb='15px' mt={['0%', '6%']}>
              {title}
            </Heading>
            <Text mb='19px' className='contato-descricao text-black'>
              {description}
            </Text>
            {!ocultAddres && (
              <>
                <HStack spacing='20px' mb='22px'>
                  <Icon as={BsTelephone} fontSize='20px' color='red.600' />
                  <Link href='tel:1142265140' _hover={{ textDecoration: 'none' }} target='_blank'>
                    <Text className='contato-descricao text-black negrito'>
                      (11) 4223-5140
                    </Text>
                  </Link>
                </HStack>
                <HStack spacing='20px' mb='22px'>
                  <Icon as={BiMap} fontSize='20px' color='red.600' />
                  <Link
                    href='https://goo.gl/maps/6C1R41LG79c9FWyRA'
                    _hover={{ textDecoration: 'none' }}
                    target='_blank'
                  >
                    <Text className='contato-descricao text-black negrito'>
                      Alameda Araguaia, 204 - Santa Maria, São Caetano do Sul - SP, 09560-580
                    </Text>
                  </Link>
                </HStack>
              </>
            )}

            <Box w='100%' h='371px'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.069763786149!2d-46.5562153!3d-23.637672499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce432ae9a65d4d%3A0x7978a4708e7db108!2sAlameda%20Araguaia%2C%20204%20-%20Santa%20Maria%2C%20S%C3%A3o%20Caetano%20do%20Sul%20-%20SP%2C%2009560-580!5e0!3m2!1spt-BR!2sbr!4v1666614335577!5m2!1spt-BR!2sbr'
                width='100%'
                height='100%'
                loading='lazy'
              ></iframe>
            </Box>
          </GridItem>
          <GridItem w='100%'>
            <Box
              border='2px solid'
              borderColor='black.800'
              borderRadius='8px'
              p={{
                base: '15px',
                md: '30px',
              }}
              width='100%'
              height='100%'
            >
              <Box>
                <VStack spacing='18px' id={id} as='form' onSubmit={handleSubmit(sendMail)} ref={formRef}>
                  {form &&
                    form.length > 0 &&
                    form.map((quest: any, index: number) => (
                      <Fragment key={index}>
                        {quest.type === 'text' && (
                          <InputDefault
                            label={quest.name}
                            type='text'
                            error={errors.name}
                            {...register(quest.name, { required: `Campo  obrigatório` })}
                          />
                        )}
                        {quest.type === 'textArea' && (
                          <TextareaDefault
                            label={quest.name}
                            error={errors.description}
                            {...register(quest.name, { required: `${quest.name} é obrigatório` })}
                          />
                        )}
                        {quest.type === 'select' && (
                          <SelectDefault
                            control={control}
                            nameInput={quest.name}
                            label={quest.name}
                            opt={quest.options.map((opt: string) => {
                              return {
                                name: opt,
                                value: opt,
                              }
                            })}
                          />
                        )}

                        {quest.type === 'upload' && (
                          <Box w='100%'>
                            <Dragger {...props}>
                              <p className='ant-upload-drag-icon'>
                                <InboxOutlined rev={undefined} />
                              </p>
                              <p className='ant-upload-text'>Click ou arraste o arquivo para área de upload</p>
                            </Dragger>
                            {file && (
                              <>
                                <Flex
                                  mt='15px'
                                  p='5px'
                                  border='1px solid #E2E8F0'
                                  alignItems='center'
                                  justifyContent='space-between'
                                >
                                  <Link href={file} isExternal={true}>
                                    <Flex alignItems='center' justifyContent='center'>
                                      <Icon as={AiOutlineFile} fontSize={20} color='#232323' />
                                      <Text color='black.900' ml='10px'>
                                        Curriculo anexado
                                      </Text>
                                    </Flex>
                                  </Link>
                                  <Icon
                                    as={AiOutlineCloseCircle}
                                    fontSize={15}
                                    color='#f70c0c'
                                    cursor='pointer'
                                    onClick={() => setFile('')}
                                  />
                                </Flex>
                              </>
                            )}
                            {loadingUpload && (
                              <Center flexDirection='column' mt='10px'>
                                <Text fontSize='14px' color='black.200'>
                                  Carregando arquivo...
                                </Text>
                                <Spinner size='xs' color='red' />
                              </Center>
                            )}
                          </Box>
                        )}
                      </Fragment>
                    ))}
                  <Flex justifyContent='flex-end'>
                    <Button
                    className='botao-vermelho'
                      w='179px'
                      h='50px'
                      mt='40px'
                      borderRadius={'8px'}
                      type='submit'
                      isLoading={loading}
                    >
                      <Icon as={TbSend} mr='10px' />
                      Enviar
                    </Button>
                  </Flex>
                </VStack>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </ContainerChakra>
    </Box>
  )
}
