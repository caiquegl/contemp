import { InputGroup, Input, InputGroupProps, InputProps, Heading } from '@chakra-ui/react'
import { pxToRem } from '../utils/pxToRem'
import { useEffect, useState } from 'react'
import { ContainerSearch } from './ContainerSearch'
import { useRouter } from 'next/router'
import { BsSearch } from 'react-icons/bs'
import Icon from './Icon'
import { replaceNameToUrl } from '../utils/replaceNameToUrl'
import { api } from '../lib/axios'

type SearchBarProps = {
  containerProps?: InputGroupProps
  inputProps?: InputProps
  searchCard?: any
}

export const SearchBar = ({ containerProps, inputProps, searchCard }: SearchBarProps) => {
  const [listProducts, setListProducts] = useState<any>([])
  const [listProductsClone, setListProductsClone] = useState<any>([])
  const router = useRouter()

  const getList = async () => {
    const { data } = await api.get(`getProductAndCategory`)
    setListProductsClone(data)
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <InputGroup
      borderRadius='8px'
      bg='black.200'
      p='3px 7px'
      w='100%'
      h={pxToRem(42)}
      maxW={pxToRem(594)}
      outline='none'
      position='relative'
      zIndex={'8888'}
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
          let list = listProductsClone.filter((el: any) => el.name.toLowerCase().includes(value))
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
              product.order_all_products || product.sub_category_id || product.filter
                ? `/category/${replaceNameToUrl(product.name.toLowerCase().replaceAll(' ', '_'))}`
                : `/produto/${replaceNameToUrl(product.name.toLowerCase().replaceAll(' ', '_'))}`
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
