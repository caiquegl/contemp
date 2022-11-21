import { InputGroup, Input, InputRightElement, InputGroupProps, InputProps } from "@chakra-ui/react"
import { pxToRem } from "../utils/pxToRem"
import Search from "../assets/icons/search.svg";

import { Image } from './Image';

type SearchBarProps = {
  containerProps?: InputGroupProps
  inputProps?: InputProps
}

export const SearchBar = ({
  containerProps,
  inputProps
}: SearchBarProps) => {
  return (
    <InputGroup
      borderRadius="21px"
      bg="black.200"
      p="3px 7px"
      w="100%"
      h={pxToRem(42)}
      maxW={pxToRem(594)}
      outline="none"
      position="relative"
      {...containerProps}
    >
      <Input
        w="100%"
        height="100%"
        border="none"
        borderRadius="21px"
        _focusVisible={{
          outline: "none",
        }}
        _placeholder={{ color: 'white.500', opacity: '50%' }}
        {...inputProps}
      />
      <InputRightElement
        width={pxToRem(22)}
        height={pxToRem(22)}
        position="absolute"
        right={3}
        top={2.5}
        children={<Image src={Search} width="100%" height="100%" bgSize="contain" />}
      />
    </InputGroup>
  )
}