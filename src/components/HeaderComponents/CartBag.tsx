import { Box, Flex, Icon, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { BsBag } from 'react-icons/bs'
import { pxToRem } from '../../utils/pxToRem'

export type CartBagProps = {
  cart: any[]
  totalCart: number
  onOpen(): void
}

export function CartBag({ cart, totalCart, onOpen }: CartBagProps) {
  const router = useRouter()

  return (
    <Box
      position="relative"
      cursor="pointer"
      onClick={() => {
        if (totalCart === 0 && !totalCart) {
          onOpen()
          return
        }
        router.push('/orcamento')
      }}
    >
      {cart && cart.length > 0 && (
        <Flex
          p={`${pxToRem(2)} ${pxToRem(5)}`}
          bg="red.600"
          borderRadius={8}
          alignItems="center"
          justifyContent="center"
          fontWeight="bold"
          fontSize={pxToRem(14)}
          position="absolute"
          bottom={4}
          left={4}
        >
          {totalCart}
        </Flex>
      )}
      <Icon as={BsBag} width={30} height={30} />
    </Box>
  )
}