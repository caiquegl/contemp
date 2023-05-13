import { FormControl, FormErrorMessage, FormLabel, InputGroup, Select as Inpt } from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { Controller, FieldError } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

interface InpuptProps {
  label?: string
  opt: any
  defaultValue?: any
  control?: any
  change?: any
  nameInput: string
}
const InputBase: ForwardRefRenderFunction<HTMLSelectElement, InpuptProps> = (
  { label, opt, defaultValue, control, nameInput, change,...rest }: any,
  ref: any
) => {
  return (
    <FormControl>
      {!!label && (
        <FormLabel fontSize='20px' mb='10px' color='black.800'>
          {label}
        </FormLabel>
      )}
      <Controller
        control={control}
        name={nameInput}
        rules={{ required: 'Campo obrigatório' }}
        render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
          <>
            <InputGroup
              borderRadius='6px'
              bg='white.500'
              p='3px 7px'
              w='100%'
              h='50px'
              outline='none'
              border='1px solid'
              borderColor='black.800'
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <Inpt
                id={name}
                name={name}
                ref={ref}
                w='100%'
                height='100%'
                border='none'
                borderRadius='21px'
                color='black.800'
                value={value}
                defaultValue={defaultValue}
                placeholder='Selecione uma opção'
                onChange={(evt) => {
                  onChange(evt)
                  if(change) change(evt.target.value)
                }}
              >
                {opt &&
                  opt.map((list: any) => (
                    <option value={list.value} key={uuidv4()}>
                      {list.name}
                    </option>
                  ))}
              </Inpt>
            </InputGroup>
            {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
          </>
        )}
      />
    </FormControl>
  )
}

export const SelectDefault = forwardRef(InputBase)
