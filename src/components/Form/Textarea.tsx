import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea as Inpt,
  InputGroup,
  TextareaProps as ChakraInputProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InpuptProps extends ChakraInputProps {
  name: string;
  label?: string;
  error: FieldError;
}
const InputBase: ForwardRefRenderFunction<HTMLTextAreaElement, InpuptProps> = (
  { name, label, error, ...rest },
  ref
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
        h="196px"
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
          ref={ref}
          w="100%"
          height="100%"
          border="none"
          borderRadius="21px"
          color="black.800"
          minH="186px"
          _placeholder={{
            color: "black.50",
          }}
          _focusVisible={{
            outline: "none",
          }}
          {...rest}
        />
      </InputGroup>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const TextareaDefault = forwardRef(InputBase);
