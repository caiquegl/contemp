import {
  FormControl,
  FormErrorMessage,
  Checkbox as Inpt,
  CheckboxProps as ChakraInputProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InpuptProps extends ChakraInputProps {
  name: string;
  label?: string;
  error: FieldError;
}
const InputBase: ForwardRefRenderFunction<HTMLInputElement, InpuptProps> = (
  { name, label, error, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      <Inpt
        colorScheme="red"
        color="black.800"
        mr="auto"
        fontSize="20px"
        height="17px"
        id={name}
        name={name}
        ref={ref}
        {...rest}
      >
        {label}
      </Inpt>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const CheckboxDefault = forwardRef(InputBase);
