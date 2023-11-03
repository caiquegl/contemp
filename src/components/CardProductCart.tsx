import { Box, Flex, HStack, Icon, Input, Link, Text, Tooltip, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { pxToRem } from '../utils/pxToRem'
import { Image } from './Image'
import DefaultImg from '../assets/images/image-default.webp'
import { v4 as uuidv4 } from 'uuid'
import { api } from '../lib/axios'

const CardProductCart = ({ data, changeQtd, removeCart, getItem }: any) => {
  const [products, setProduct] = useState<any>({})

  const getProduct = async () => {
    const { data: res } = await api.get(`${data.product_id}/getProductById`)
    setProduct(res)
  }

  useEffect(() => {
    getItem(products)
  }, [products])

  useEffect(() => {
    getProduct()
  }, [data])

  if (products === undefined) return <Box />

  return (
    <Flex alignItems={['center', 'flex-start']} width='100%' flexDirection={['column', 'row']}>
      <Link
        href={`/produto/${products?.name?.replaceAll(' ', '_')}`}
        _hover={{ color: 'black', textDecoration: 'none' }}
      >
        <Box
          display='flex'
          alignItems='center'
          borderRadius='8px'
          border='none'
          w={pxToRem(118)}
          h={pxToRem(118)}
          bg='none'
          cursor='pointer'
        >
          <Image src={products.urls && products.urls.length > 0 ? products.urls[0] : DefaultImg} alt={products.name} />
        </Box>
      </Link>
      <Box ml='10px' w={['100%', 'calc(100% - 118px)']}>
        <Text fontSize='20px' fontWeight='bold' color='black' textTransform='uppercase'>
          {products.name}
        </Text>
        {data.variation &&
          Object.keys(data.variation).length > 0 &&
          Object.keys(data.variation).map((key: any, index: any) => (
            <Flex key={index} alignItems='flex-start' m='5px 0' flexDirection='column'>
              <Tooltip label={key} placement='top'>
                <Text
                  fontSize='17px'
                  color='black.800'
                  textTransform='uppercase'
                  fontWeight='bold'
                  noOfLines={1}
                  w='100%'
                >
                  {key}:
                </Text>
              </Tooltip>
              <Text fontSize='17px' color='black.800' textTransform='uppercase' w='100%' mt='5px'>
                {data.variation[key]}
              </Text>
            </Flex>
          ))}
        <Flex alignItems='center' justifyContent='space-between'>
          <Icon as={AiFillDelete} fontSize='20px' cursor='pointer' onClick={() => removeCart()} />
          <HStack>
            <Text fontSize='19px' color='black.800' fontWeight='bold'>
              Quantidade:
            </Text>
            <Input
              type='number'
              value={data.qtd}
              borderRadius='20px'
              maxW='80px'
              border='2px solid'
              borderColor='black'
              textAlign='center'
              onChange={(evt) => changeQtd(evt.target.value)}
            />
          </HStack>
        </Flex>
      </Box>
    </Flex>
  )
}

export default CardProductCart
