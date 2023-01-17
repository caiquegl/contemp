import { InputGroup, Input, InputGroupProps, InputProps } from '@chakra-ui/react'
import { pxToRem } from '../utils/pxToRem'
import { useState } from 'react'
import { useAuth } from '../contextAuth/authContext'
import { ContainerSearch } from './ContainerSearch'
import { useRouter } from 'next/router'
import { BsSearch } from 'react-icons/bs'
import Icon from './Icon'

type SearchBarProps = {
  containerProps?: InputGroupProps
  inputProps?: InputProps
  searchCard?: any
}

export const SearchBar = ({ containerProps, inputProps, searchCard }: SearchBarProps) => {
  const { allProductsActive, allCategoryActive } = useAuth()
  const [listProducts, setListProducts] = useState<any>([])
  const router = useRouter()
  return (
    <InputGroup
      borderRadius='21px'
      bg='black.200'
      p='3px 7px'
      w='100%'
      h={pxToRem(42)}
      maxW={pxToRem(594)}
      outline='none'
      position='relative'
      {...containerProps}
    >
      <Input
        w='100%'
        height='100%'
        border='none'
        borderRadius='21px'
        _focusVisible={{
          outline: 'none',
        }}
        onChange={(evt) => {
          let value = evt.target.value.toLowerCase()
          if (value == '') {
            setListProducts([])
            return
          }
          let list = [...allProductsActive, ...allCategoryActive].filter((el: any) =>
            el.name.toLowerCase().includes(value)
          )
          setListProducts(list)
        }}
        _placeholder={{ color: 'white.500', opacity: '50%' }}
        {...inputProps}
      />
      {listProducts.length > 0 && (
        <ContainerSearch
          list={listProducts}
          searchCard={searchCard}
          click={(product: any) => {
            router.push(
              product.order
                ? `/category/${product.name.replaceAll(' ', '_')}#viewCategory`
                : `/produto/${product.name.replaceAll(' ', '_')}`
            )
            setListProducts([])
          }}
        />
      )}

      <Icon
        icon={BsSearch}
        size={20}
        iconStyle={{
          position: 'absolute',
          right: pxToRem(16),
          top: pxToRem(11),
        }}
        color={containerProps?.color ? (containerProps.color as string) : 'white'}
      />
    </InputGroup>
  )
}
