import {
  Box,
  Text,
  InputGroup,
  Input,
  Select,
  InputLeftElement,
  Icon,
  InputRightElement,
  Textarea,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FiFile } from "react-icons/fi";

const InputsHome = ({ name, typeInput, options }: any) => {
  const ref = useRef<any>();

  return (
    <Box w="100%">
      <Text fontSize="20px" mb="10px" color="black.800">
        {name}
      </Text>
      <InputGroup
        borderRadius="6px"
        bg="white.500"
        p="3px 7px"
        w="100%"
        h={typeInput == "textArea" ? "186px" : "50px"}
        outline="none"
        border="1px solid"
        borderColor="black.800"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {typeInput === "text" && (
          <Input
            w="100%"
            height="100%"
            border="none"
            borderRadius="21px"
            placeholder={name}
            _focusVisible={{
              outline: "none",
            }}
          />
        )}

        {typeInput === "select" && (
          <Select
            w="100%"
            height="100%"
            border="none"
            borderRadius="21px"
            placeholder={name}
            color="black.800"
            _placeholder={{
              color: "black.50",
            }}
            _focusVisible={{
              outline: "none",
            }}
          >
            {options &&
              options.length > 0 &&
              options.map((opt: any) => <option value={opt}>{opt}</option>)}
          </Select>
        )}

        {typeInput == "file" && (
          <>
            <InputRightElement
              pointerEvents="none"
              children={<Icon as={FiFile} color="black.800" />}
            />
            <input
              type="file"
              name={name}
              style={{ display: "none" }}
              ref={ref}
            />
            <Input
              placeholder={name || "Your file ..."}
              border="none"
              onClick={() => ref.current.click()}
            />
          </>
        )}
        {typeInput == "textarea" && (
          <Textarea
            w="100%"
            height="100%"
            border="none"
            borderRadius="21px"
            placeholder={name}
            color="black.800"
            minH="186px"
            _placeholder={{
              color: "black.50",
            }}
            _focusVisible={{
              outline: "none",
            }}
          />
        )}
      </InputGroup>
    </Box>
  );
};

export default InputsHome;
