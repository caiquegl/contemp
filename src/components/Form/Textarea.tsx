import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea as Inpt,
  InputGroup,
  TextareaProps as ChakraInputProps,
  Tooltip,
  Icon,
  Box,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction, useState } from "react";
import { FieldError } from "react-hook-form";
import { FiFile } from "react-icons/fi"; // Importe o ícone necessário
import { PiInfoDuotone } from "react-icons/pi";

interface InpuptProps extends ChakraInputProps {
  name: string;
  label?: string;
  question?: string; // Altere o nome da propriedade para 'question'
  error: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLTextAreaElement, InpuptProps> = (
  { name, label, question, error, ...rest },
  ref
) => {
  const [isTooltipVisible, setTooltipVisibility] = useState(false);
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name} className="paragrafo-preto negrito" textTransform={'uppercase'} mb="10px">
          {label}
        </FormLabel>
      )}
      <InputGroup
        borderRadius="8px"
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
        position="relative"
      >
        <Inpt
          id={name}
          name={name}
          ref={ref}
          w="100%"
          minH="186px"
          border="none"
          borderRadius="21px"
          color="black.800"
          _placeholder={{
            color: "black.50",
          }}
          _focusVisible={{
            outline: "none",
          }}
          {...rest}
        />
        {!!question && (
          <Tooltip
            label={question}
            isOpen={isTooltipVisible}
            placement="top-end"
            color={'var(--white-primary)'}
            bg={'var(--red-primary)'}
            borderRadius={'8px'}
            hasArrow
          >
            <Box
              position="absolute"
              right="8px"
              color="var(--black-primary)"
              cursor="pointer"
              aria-label={question}
              onMouseEnter={() => setTooltipVisibility(true)}
              onMouseLeave={() => setTooltipVisibility(false)}
            >
              <Icon as={PiInfoDuotone} fontSize={'1.15rem'} color={'var(--red-primary)'} />
            </Box>
          </Tooltip>
        )}
      </InputGroup>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const TextareaDefault = forwardRef(InputBase);
