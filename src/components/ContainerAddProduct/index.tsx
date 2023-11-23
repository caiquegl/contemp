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
  FormErrorMessage,
  FormHelperText,
  Heading,
  Tooltip,
  Icon,

} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import InputsHome from '../ContainerHome/inputs'
import { Controller, useForm } from 'react-hook-form'
import { InputDefault } from '../Form/Input'
import { TextareaDefault } from '../Form/Textarea'
import Variation from './Variantion'
import { ViewImage } from './ViewImage'
import { v4 as uuidv4 } from 'uuid'
import { AsyncSelect, chakraComponents } from 'chakra-react-select'
import { api } from '../../lib/axios'
import { string } from 'yup'
import { PiInfoDuotone } from "react-icons/pi";

const asyncComponents = {
  LoadingIndicator: (props: any) => (
    <chakraComponents.LoadingIndicator
      // The color of the main line which makes up the spinner
      // This could be accomplished using `chakraStyles` but it is also available as a custom prop
      color='currentColor' // <-- This default's to your theme's text color (Light mode: gray.700 | Dark mode: whiteAlpha.900)
      // The color of the remaining space that makes up the spinner
      emptyColor='transparent'
      // The `size` prop on the Chakra spinner
      // Defaults to one size smaller than the Select's size
      spinnerSize='md'
      // A CSS <time> variable (s or ms) which determines the time it takes for the spinner to make one full rotation
      speed='0.45s'
      // A CSS size string representing the thickness of the spinner's line
      thickness='2px'
      // Don't forget to forward the props!
      {...props}
    />
  ),
}

const ContainerAddProduct = ({ nextStep, defaultValues }: any) => {
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
      category: bodyForm.category.value,
    }

    if (hasVariation) {
      let falt = false
      let more = false
      listVariation.forEach((list: any) => {
        if (list.type_view && list.type_view == 'Range' || list.type_view == 'Texto_curto' || list.type_view == 'Texto_longo' || list.type_view == 'numerico') return
        if (!list.name) falt = true
        if (!list.opt || list.opt.length === 0) more = true
      })

      if (falt || more) {
        toast({
          title: 'Erro',
          description: falt ? 'Preencha todos os nome de variações' : 'Adicione ao menos uma opção',
          status: 'error',
          duration: 3000,
          isClosable: true,
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
      const { data } = await api.get('getCategoryActive')

      setList(data)
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao listar categoria',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    listCategory()
  }, [])

  const categoryOptions = list.map((value: any) => {
    return {
      name: value.name,
      value: value.id,
    }
  })

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const updatedUrls = [...urls];
      const temp = updatedUrls[index];
      updatedUrls[index] = updatedUrls[index - 1];
      updatedUrls[index - 1] = temp;
      setUrls(updatedUrls);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < urls.length - 1) {
      const updatedUrls = [...urls];
      const temp = updatedUrls[index];
      updatedUrls[index] = updatedUrls[index + 1];
      updatedUrls[index + 1] = temp;
      setUrls(updatedUrls);
    }
  };

  useEffect(() => {
    console.log(defaultValues)
    setValue('name', defaultValues?.name)
    setValue('name', defaultValues?.name)
    setValue('description', defaultValues?.description)
    setValue('call_product', defaultValues?.call_product)
    setValue('key_word_seo', defaultValues?.key_word_seo)
    setValue('description_seo', defaultValues?.description_seo)
    setHasVariation(defaultValues && defaultValues.hasVariation ? true : false)
    setDestaque(defaultValues && defaultValues.destaque ? true : false)
    setIsActive(defaultValues && defaultValues.isActive ? true : false)
    if (defaultValues.listVariation) {
      setListVariation(typeof defaultValues.listVariation == 'string' ? JSON.parse(defaultValues.listVariation) : defaultValues.listVariation)
    }
    if (defaultValues.urls) setUrls(defaultValues.urls)
  }, [defaultValues])

  const getValues = async () => {
    const { data } = await api.get(`${defaultValues?.category_id}/getCategoryById`)
    if (data) setValue('category', { value: data.id, label: data.name })
  }

  useEffect(() => {
    if (list.length > 0) getValues()
  }, [list.length])

  return (
    <Box mt='30px' bg='white' borderRadius='8px' p='30px 40px' w='100%'>
      <VStack spacing='20px' w='100%' as='form' onSubmit={handleSubmit(saveProduct)} ref={formRef}>
        <Flex alignItems='center' justifyContent='flex-end' w='100%'>
          <Button
            ml='auto'
            bg='red.600'
            color='white'
            fontSize='20px'
            borderRadius='4px'
            w='128px'
            h='47px'
            _hover={{ transition: 'all 0.4s' }}
            type='button'
            onClick={() => formRef.current?.requestSubmit()}
          >
            Avançar
          </Button>
        </Flex>
        <HStack w='100%' spacing='20px'>
          <FormControl>
            <InputDefault
              label='Nome do produto'
              question='O nome do produto será o mesmo que na url e apareceça igual em todos os locais do site em que ele se encontrar.
              '
              type='text'
              placeholder='Nome do produto'
              error={errors.name}
              {...register('name', { required: 'Nome é obrigatório' })}
            />
          </FormControl>
          <FormControl>
            <Controller
              control={control}
              name='category'
              rules={{ required: 'Campo obrigatório' }}
              render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
                <FormControl isInvalid={!!error} id={name} color='black.800'>

                  <Flex alignItems={'baseline'}>
                    <FormLabel className='paragrafo-preto negrito' textTransform={'uppercase'} mb='10px'>
                      Categoria
                    </FormLabel>
                    <Tooltip label='Basta começa a digitar o nome da categoria que ela irá aparecer como opção.' cursor={'pointer'}
                      placement="right"
                      color={'var(--white-primary)'}
                      bg={'var(--red-primary)'}
                      borderRadius={'8px'}
                      textAlign={'center'}
                      hasArrow>
                      <Flex>
                        <Icon ml="auto" as={PiInfoDuotone} cursor={'pointer'} fontSize={'1.15rem'} color={'var(--red-primary)'} verticalAlign={'middle'} />
                      </Flex>
                    </Tooltip>
                  </Flex>
                  <AsyncSelect
                    placeholder='Selecione'
                    size='lg'
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
                        )
                        callback(values)
                      }, 1500)
                    }}
                  />
                  {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
                </FormControl>
              )}
            />

          </FormControl>
        </HStack>
        <FormControl>
          <InputsHome
            name='Foto e vídeo do produto'
            question='Não tem limite para adicionar fotos e videos, porém recomendamos comprimir em alta as fotos para reduzir o tempo de carregamento da página. Coloque na ordem que deve aparecer na página do produto.'
            typeInput='file'
            getUrls={(values: any) => setUrls([...urls, ...values])}
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        <HStack spacing='20px' w='100%' mt='20px'>
          {urls.map((value, index) => (
            <ViewImage
              key={index}
              url={value}
              order={index + 1}
              remove={() => {
                let newList: any = []
                urls.forEach((value: any, indexRemove: number) => {
                  if (index != indexRemove) newList.push(value)
                })
                setUrls(newList)
              }}
              moveUp={() => handleMoveUp(index)}
              moveDown={() => handleMoveDown(index)}
            />
          ))}
        </HStack>
        <FormControl>
          <TextareaDefault
            label='Descrição curta'
            question='Coloque aqui o texto que irá aparecer na descrição curta do produto. Limite de 166 caracteres contando com espaços.
            '
            error={errors.description}
            {...register('description', {
              required: 'Descrição é obrigatório',
            })}
          />
        </FormControl>
        <FormControl>
          <TextareaDefault
            label='Chamada de produto'
            question='A chamada de produto irá aparecer no card (voltada para vendas) e deve ter até 100 caracteres.'
            error={errors.call_product}
            {...register('call_product', {
              required: 'Chamada de produto é obrigatório',
            })}
          />
        </FormControl>
        <HStack spacing='20px' w='100%'>
          <FormControl>
            <TextareaDefault
              label='Descrição SEO'
              question='Esse campo deve ser preenchido pela agência de marketing. Pode colocar "teste".'
              error={errors.description_seo}
              {...register('description_seo', {
                required: 'Descrição seo é obrigatório',
              })}
            />
          </FormControl>
          <FormControl>
            <TextareaDefault
              label='key Word SEO'
              question='Esse campo deve ser preenchido pela agência de marketing. Pode colocar "teste".'
              error={errors.key_word_seo}
              {...register('key_word_seo', {
                required: 'Key word seo é obrigatório',
              })}
            />
          </FormControl>
        </HStack>
        <Flex w='100%'>
          <Checkbox
            colorScheme='red'
            color='black.800'
            mr='auto'
            fontSize='20px'
            height='17px'
            checked={hasVariation}
            isChecked={hasVariation}
            onChange={(check) => {
              setHasVariation(check.target.checked)
              setListVariation([{ id: 1 }])
            }}
          >
            Produto tem opcionais / variações?
          </Checkbox>
          <Checkbox
            colorScheme='red'
            color='black.800'
            mr='auto'
            fontSize='20px'
            height='17px'
            ml='50px'
            checked={destaque}
            isChecked={destaque}
            onChange={(check) => setDestaque(check.target.checked)}
          >
            Novidade?
          </Checkbox>
          <Checkbox
            colorScheme='red'
            color='black.800'
            mr='auto'
            fontSize='20px'
            height='17px'
            checked={isActive}
            isChecked={isActive}
            onChange={(check) => setIsActive(check.target.checked)}
          >
            Ativo
          </Checkbox>
        </Flex>
      </VStack>
      <Divider m='20px 0px' />
      <VStack spacing='30px' divider={<Divider />} w='100%'>
        {hasVariation &&
          Array.isArray(listVariation) && listVariation.map((list: any, index: number) => (
            <div key={list.id} style={{ width: '100%' }}>
              <Variation
                total={listVariation.length - 1}
                key={index}
                newVariation={() => {
                  setListVariation([...listVariation, { id: listVariation.length + 1 }])
                }}
                removeOptVariation={(indexRemove: any) => {
                  let newList: any = listVariation

                  let newListOptions: any = []
                  newList[index].opt.forEach((opt: any, indexOpt: number) => {
                    if (indexRemove != indexOpt) newListOptions.push(opt)
                  })

                  newList[index].opt = newListOptions
                  console.log(newList)
                  setListVariation([...newList])
                }}
                removeVariation={() => {
                  let newList: any = []
                  listVariation.forEach((list: any, indexRemove: number) => {
                    if (index != indexRemove) newList.push(list)
                  })
                  setListVariation([...newList])
                }}
                index={index}
                addVariation={(variation: any) => {
                  let newList = listVariation
                  newList[index].name = variation.name
                  delete newList[index].min_value
                  delete newList[index].max_value

                  if (!variation.addOpt) return
                  if (newList[index].opt) {
                    newList[index].opt.push(variation.addOpt)
                  } else {
                    newList[index].opt = [variation.addOpt]
                  }

                  setListVariation([...newList])
                }}
                saveName={(name: string) => {
                  let newList: any = listVariation
                  delete newList[index].opt

                  newList[index].name = name

                  setListVariation([...newList])
                }}
                setType={(type: string) => {
                  let newList: any = listVariation

                  newList[index].type_view = type

                  setListVariation([...newList])
                }}
                addPlaceholder={(value: any) => {
                  console.log(value)
                  let newList: any = listVariation
                  newList[index].placeholder_name = value

                  setListVariation([...newList])
                }}

                addRange={(value: any, type: string) => {
                  let newList: any = listVariation
                  newList[index].type_view = 'Range'
                  newList[index][type] = value

                  setListVariation([...newList])
                }}
                defaultValues={listVariation[index]}
                upVariation={(index: number) => {
                  let newList: any = listVariation
                  const up = newList[index];
                  const down = newList[index - 1];
                  newList[index - 1] = up;
                  newList[index] = down;
                  setListVariation([...newList])
                }}
                downVariation={(index: number) => {
                  let newList: any = listVariation
                  const up = newList[index];
                  const down = newList[index + 1];
                  newList[index + 1] = up;
                  newList[index] = down;
                  setListVariation([...newList])
                }}

                changeOrderOpt={(index: number, opt: string[]) => {
                  let newList: any = listVariation
                  newList[index].opt = opt
                  setListVariation([...newList])
                }}
              />
            </div>
          ))}
      </VStack>
      <Flex alignItems='center' justifyContent='flex-end' mt='53px' w='100%'>
        <Button
          ml='auto'
          bg='red.600'
          color='white'
          fontSize='20px'
          borderRadius='4px'
          w='128px'
          h='47px'
          _hover={{ transition: 'all 0.4s' }}
          type='button'
          onClick={() => formRef.current?.requestSubmit()}
        >
          Avançar
        </Button>
      </Flex>
    </Box >
  )
}

export default ContainerAddProduct
