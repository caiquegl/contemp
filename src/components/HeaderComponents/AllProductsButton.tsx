import { Box, Button, Link, Icon, Text, Heading } from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useTranslation } from 'react-i18next';

export type AllProductsButtonProps = {
  hasLabel?: boolean
}

export function AllProductsButton({ hasLabel }: AllProductsButtonProps) {
  const noLabelTransition = 'opacity 0.5s, width 1s'
  const hasLabelTransition = 'opacity 0.5s, width 1s'
  const { t } = useTranslation();

  return (
    <Box>
      <Link href='/todosProdutos' _hover={{ color: '#fff', textDecoration: 'none' }}>
        <Button
          borderRadius='5px'
          bg='red.600'
          _hover={{
            bg: 'red.600',
          }}
          width={hasLabel ? '100%' : 0}
        >
          <Text
            opacity={hasLabel ? 1 : 0}
            width={hasLabel ? '100%' : 0}
            display={hasLabel ? 'initial' : 'none'}
            transition={hasLabel ? hasLabelTransition : noLabelTransition}
          >
            {t('botao-todososprodutos')}
          </Text>
          <Icon as={BsThreeDotsVertical} ml={hasLabel ? '10px' : 0} color='white' fontSize='20px' />
        </Button>
      </Link>
    </Box>
  )
}
