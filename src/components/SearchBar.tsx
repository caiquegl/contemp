import { InputGroup, Input, InputRightElement, InputGroupProps, InputProps } from "@chakra-ui/react"
import { pxToRem } from "../utils/pxToRem"
import Search from "../assets/icons/search.svg";

import { Image } from './Image';
import { useState } from "react";
import { useAuth } from "../contextAuth/authContext";
import { ContainerSearch } from "./ContainerSearch";
import { useRouter } from "next/router";

type SearchBarProps = {
  containerProps?: InputGroupProps
  inputProps?: InputProps
  searchCard?: any
}

export const SearchBar = ({
  containerProps,
  inputProps,
  searchCard
}: SearchBarProps) => {
  const { allProductsActive } = useAuth()
  const [listProducts, setListProducts] = useState<any>([])
  const router = useRouter()
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
        onChange={(evt) => {
          let value = evt.target.value.toLowerCase()
          if (value == '') {
            setListProducts([])
            return
          }
          let list = allProductsActive.filter((el: any) => el.name.toLowerCase().includes(value))
          setListProducts(list)
        }}
        _placeholder={{ color: 'white.500', opacity: '50%' }}
        {...inputProps}
      />
      {listProducts.length > 0 &&
        <ContainerSearch list={listProducts} searchCard={searchCard} click={(product: any) => {
          router.push(`/produto/${product.replaceAll(' ', '_')}`)
          setListProducts([])
        }} />

      }
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