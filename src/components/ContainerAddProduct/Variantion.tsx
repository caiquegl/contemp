import { Box, HStack, Flex, Icon, UnorderedList, ListItem, Heading, Badge, Wrap, Stack, Tooltip, ChakraProvider, Button, IconButton } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { GrAddCircle, GrSubtractCircle } from 'react-icons/gr'
import { useForm } from 'react-hook-form'
import { InputDefault } from '../Form/Input'
import { v4 as uuidv4 } from 'uuid'
import { SelectDefault } from '../Form/Select'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";


const Variation = ({ index, addVariation, changeOrderOpt, defaultValues, newVariation, removeVariation, removeOptVariation, addRange, saveName, setType, total, upVariation, downVariation, addPlaceholder }: any) => {
  const formRefOpt = useRef<any>()

  const { register, handleSubmit, formState, setValue, resetField, control, watch } = useForm({})

  const { errors } = formState
  const [opt, setOpt] = useState<String[]>([])
  const insertOptVariation = (variation: any) => {
    addVariation(variation)
    resetField('addOpt')
    let neO = opt
    neO.push(variation.addOpt)
    // setOpt(neO)
    console.log(variation, 'variation')

  }

  useEffect(() => {
    setValue('name', defaultValues?.name)
    setValue('type_view', defaultValues?.type_view ? defaultValues?.type_view : 'Number')
    setValue('min_value', defaultValues?.min_value)
    setValue('max_value', defaultValues?.max_value)
    setValue('placeholder_name', defaultValues?.placeholder_name)
    if (defaultValues.opt) {
      setOpt(defaultValues.opt)
    }
  }, [])

  const upOpt = (indexOpt: number) => {
    let newList: any = opt
    const up = newList[indexOpt];
    const down = newList[indexOpt - 1];
    newList[indexOpt - 1] = up;
    newList[indexOpt] = down;
    changeOrderOpt(index, [...newList])

  }

  const downOpt = (indexOpt: number) => {
    let newList: any = opt
    const up = newList[indexOpt];
    const down = newList[indexOpt + 1];
    newList[indexOpt + 1] = up;
    newList[indexOpt] = down;
    changeOrderOpt(index, [...newList])
  }



  return (
    <Box w='100%' as='form' onSubmit={handleSubmit(insertOptVariation)} ref={formRefOpt}>
      <Flex mb='20px' alignItems='center' justifyContent='space-between' w='100%'>
        <Flex alignItems='center' w='100%' maxW='636px'>
          <Box w='400px'>
            <InputDefault
              label={`Nome da variação ${index + 1}`}
              type='text'
              error={errors.name}
              onBlurCapture={(evt) => saveName(evt.target.value)}
              {...register('name', { required: 'Nome é obrigatório' })}
            />
          </Box>


          <Box w='400px' ml='20px'>
            <SelectDefault
              control={control}
              label={`Tipo de visualização`}
              change={(evt: any) => setType(evt)}
              opt={[
                {
                  value: 'Number',
                  name: 'Seleção',
                },
                {
                  value: 'Range',
                  name: 'Ranger',
                },
                {
                  value: 'Texto_curto',
                  name: 'Texto Curto',
                },
                {
                  value: 'Texto_longo',
                  name: 'Área de texto',
                },
                {
                  value: 'numerico',
                  name: 'Numero',
                },
              ]}
              nameInput='type_view'
            />
          </Box>
        </Flex>
        <HStack spacing='20px'>
          <Button className='botao-preto-outline' ml={'auto'} mt={'0%!important'} rightIcon={<GrAddCircle />} fontSize={'1rem'} cursor='pointer' onClick={() => newVariation()}>
            Adicionar Variação
          </Button>
          {index !== total && (
            <IconButton aria-label='' className='botao-preto-outline' mt={'0!important'} ml={'5%!important'} mr={'2%!important'} icon={<AiOutlineArrowDown />} onClick={() => downVariation(index)}>
            </IconButton>
          )}
          {index !== 0 && (
            <IconButton aria-label='' className='botao-preto-outline' mt={'0!important'} ml={'0!important'} icon={<AiOutlineArrowUp />} onClick={() => upVariation(index)}>
            </IconButton>
          )}
          <IconButton aria-label='' className='botao-vermelho' mt={'0!important'} icon={<IoClose />} onClick={() => removeVariation(index)}>
          </IconButton>
        </HStack>

      </Flex>
      {watch().type_view == 'Texto_curto' && (
        <Box w='400px'>
          <InputDefault
            label={`Nome da placeholder ${index + 1}`}
            type='text'
            error={errors.placeholder_name}
            onBlurCapture={(evt) => addPlaceholder(evt.target.value)}
            {...register('placeholder_name')}
          />
        </Box>

      )}


      {watch().type_view == 'numerico' && (
        <Box w='400px'>
          <InputDefault
            label={`Nome da placeholder ${index + 1}`}
            type='text'
            error={errors.placeholder_name}
            onBlurCapture={(evt) => {
              addPlaceholder(evt.target.value)
            }}
            {...register('placeholder_name')}
          />
        </Box>

      )}

      {watch().type_view == 'Texto_longo' && (
        <Box w='400px'>
          <InputDefault
            label={`Nome da placeholder ${index + 1}`}
            type='text'
            error={errors.placeholder_name}
            onBlurCapture={(evt) => addPlaceholder(evt.target.value)}
            {...register('placeholder_name')}
          />
        </Box>

      )}
      {watch().type_view == 'Range' && (
        <Flex alignItems='center' justifyContent='space-between' w='100%'>
          <Box w='35%'>
            <InputDefault label={`Valor mínimo`} type='number' error={errors.min_value} {...register('min_value')} onChange={(e) => {
              let value = e.target.value
              addRange(value, 'min_value')
            }} />
          </Box>
          <Box w='35%'>
            <InputDefault label={`Valor máximo`} type='number' error={errors.max_value} {...register('max_value')} onChange={(e) => {
              let value = e.target.value
              addRange(value, 'max_value')
            }} />
          </Box>
        </Flex>
      )}
      {watch().type_view == 'Number' && (
        <Flex alignItems='center' justifyContent='space-between' w='100%'>
          <Flex alignItems='center' verticalAlign={'middle'}>
            <Box w='400px'>
              <InputDefault label='Adicionar opção' placeholder='Adicione a opção e confirme' question='Adicione a opção e clique no botão ao lado.' type='text' error={errors.addOpt} {...register('addOpt')} />
            </Box>
            <IconButton className='botao-preto' aria-label='' icon={<FaCheck />} mt={'6%'} ml={'2%'} onClick={() => formRefOpt.current?.requestSubmit()}>
              Confirmar e Adicionar
            </IconButton>
          </Flex>
          <Box w='100%' ml='50px'>
            <Flex alignItems='center' justifyContent='space-between' w='100%' ml='50px'>
              <Wrap spacing={2} align='center'>
                {opt.map((value: any, indexOpt: number) => (
                  <Badge
                    key={uuidv4()}
                    colorScheme='teal'
                    fontSize='1rem'
                    pt={1}
                    pb={1}
                    pl={6}
                    pr={6}
                    borderRadius='8px'
                    color={'var(--gray-text)'}
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    bgColor='var(--graylight-primary)'
                    mb={2}
                  >
                    {value}
                    <Flex alignItems='center'>
                      <Icon as={IoClose} p={0} color={'var(--red-primary)'} fontSize='1rem' m={'0 15%'} cursor='pointer'
                        onClick={() => {
                          removeOptVariation(indexOpt);
                          const newOpt = opt.filter((el: any) => el !== value);
                          setOpt(newOpt);
                        }} />
                      {indexOpt !== opt.length - 1 && (
                        <Icon as={AiOutlineArrowDown} fontWeight={'bold'} fontSize='1rem' cursor='pointer'
                          onClick={() => downOpt(indexOpt)}
                          color={'var(--gray-text)'}
                          _hover={{ color: 'var(--red-primary)' }} />
                      )}
                      {indexOpt !== 0 && (
                        <Icon as={AiOutlineArrowUp} fontWeight={'bold'} fontSize='1rem' cursor='pointer'
                          onClick={() => upOpt(indexOpt)}
                          color={'var(--gray-text)'}
                          _hover={{ color: 'green.500' }} />
                      )}
                    </Flex>
                  </Badge>
                ))}
              </Wrap>
            </Flex>

          </Box>
        </Flex>
      )}
    </Box>
  )
}

export default Variation
