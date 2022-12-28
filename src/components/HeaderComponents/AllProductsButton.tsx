import { Box, Button, Link, Icon, Text } from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'

export type AllProductsButtonProps = {
  hasLabel?: boolean
}

export function AllProductsButton({ hasLabel }: AllProductsButtonProps) {
  const noLabelTransition = 'opacity 0.5s, width 1s'
  const hasLabelTransition = 'opacity 0.5s, width 1s'

  return (
    <Box>
      <Link
        href="/todosProdutos"
        _hover={{ color: '#fff', textDecoration: 'none' }}
      >
        <Button
          borderRadius="5px"
          bg="red.600"
          _hover={{
            bg: 'red.600',
            opacity: 0.6
          }}
          width={hasLabel ? '100%' : 0}
        >
          <Text
            opacity={hasLabel ? 1 : 0}
            width={hasLabel ? '100%' : 0}
            display={hasLabel ? 'initial' : 'none'}
            transition={hasLabel ? hasLabelTransition : noLabelTransition}
          >
            Todos os produtos
          </Text>
          <Icon
            as={BsThreeDotsVertical}
            ml={hasLabel ? '10px' : 0}
            color="white"
            fontSize="20px"
          />
        </Button>
      </Link>
    </Box>
  )
}
