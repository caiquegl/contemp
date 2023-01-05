import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  Select as Inpt
} from '@chakra-ui/react'
import {
  forwardRef,
  ForwardRefRenderFunction
} from 'react'
import { FieldError } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid';

interface InpuptProps {
  name: string
  label?: string
  error: FieldError
  opt: any
  defaultValue?: any
  reff?: any
}
const InputBase: ForwardRefRenderFunction<HTMLSelectElement, InpuptProps> = (
  { name, label, opt, error, defaultValue, reff, ...rest }: any,
  ref: any
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name} fontSize="20px" mb="10px" color="black.800">
          {label}
        </FormLabel>
      )}
      <InputGroup
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
      >
        <Inpt
          id={name}
          name={name}
          ref={reff}
          w="100%"
          height="100%"
          border="none"
          borderRadius="21px"
          color="black.800"
          options={opt}
          defaultValue={defaultValue}
          placeholder="Selecione uma opção"
          {...rest}
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
    </FormControl>
  )
}

export const SelectDefault = forwardRef(InputBase)
