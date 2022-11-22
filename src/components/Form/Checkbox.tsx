import {
  FormControl,
  FormErrorMessage,
  Checkbox as Inpt,
  CheckboxProps as ChakraInputProps,
} from "@chakra-ui/react";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useState,
} from "react";
import { FieldError } from "react-hook-form";

interface InpuptProps extends ChakraInputProps {
  name: string;
  label?: string;
  error: FieldError;
  defaultCheck?: any;
}
const InputBase: ForwardRefRenderFunction<HTMLInputElement, InpuptProps> = (
  { name, label, error, defaultCheck = false, ...rest },
  ref
) => {
  const [value, setValue] = useState<any>(defaultCheck);
  useEffect(() => {
    setValue(defaultCheck);
  }, [defaultCheck]);

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
        isChecked={value}
        onChange={(evt) => setValue(evt.target.checked)}
        {...rest}
      >
        {label}
      </Inpt>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const CheckboxDefault = forwardRef(InputBase);
