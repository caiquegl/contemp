import { Box, HStack, Flex, Icon, UnorderedList, ListItem, Heading } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { GrAddCircle, GrSubtractCircle } from 'react-icons/gr'
import { useForm } from 'react-hook-form'
import { InputDefault } from '../Form/Input'
import { v4 as uuidv4 } from 'uuid'
import { SelectDefault } from '../Form/Select'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'

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
          {index !== total && <Icon as={AiOutlineArrowDown} color="#cc0b0b" fontSize='30px' cursor='pointer' onClick={() => downVariation(index)} />}
          {index !== 0 && <Icon as={AiOutlineArrowUp} color="#0e9721" fontSize='30px' cursor='pointer' onClick={() => upVariation(index)} />}
          <Icon as={GrAddCircle} fontSize='30px' cursor='pointer' onClick={() => newVariation()} />
          <Icon as={GrSubtractCircle} fontSize='30px' cursor='pointer' onClick={() => removeVariation()} />
        </HStack>
      </Flex>
      {watch().type_view == 'Texto_curto'  && (
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

          
          {watch().type_view == 'numerico'  && (
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
          
           {watch().type_view == 'Texto_longo'  && (
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
          <Flex alignItems='center'>
            <Box w='400px'>
              <InputDefault label='Adicionar opção' type='text' error={errors.addOpt} {...register('addOpt')} />
            </Box>
            <Icon
              as={GrAddCircle}
              fontSize='30px'
              cursor='pointer'
              ml='20px'
              onClick={() => formRefOpt.current?.requestSubmit()}
            />
          </Flex>
          <Box w='100%' ml='50px'>
            <UnorderedList>
              {opt.map((value: any, indexOpt: number) => (
                <ListItem key={uuidv4()} color='black.800' fontSize='18px' mb='6px'>
                  <Flex alignItems='center'>
                    {value}
                    <Icon
                      as={GrSubtractCircle}
                      fontSize='20px'
                      ml='10px'
                      cursor='pointer'
                      onClick={() => {
                        removeOptVariation(indexOpt)
                        let newOpt: any = []
                        opt.forEach((el: any) => {
                          if(el != value) newOpt.push(el)
                        })

                        setOpt(newOpt)
                      }}
                    />
                    {indexOpt !== opt.length - 1 && <Icon as={AiOutlineArrowDown} color="#cc0b0b" fontSize='17px' cursor='pointer' onClick={() => downOpt(indexOpt)} />}
                    {indexOpt !== 0 && <Icon as={AiOutlineArrowUp} color="#0e9721" fontSize='17px' cursor='pointer' onClick={() => upOpt(indexOpt)} />}
                  </Flex>
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </Flex>
      )}
    </Box>
  )
}

export default Variation
