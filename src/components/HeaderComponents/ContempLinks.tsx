import React from 'react'
import { HStack, Link, Text, StackProps, Heading } from '@chakra-ui/react'

export function ContempLinks({ ...props }: StackProps) {
  return (
    <HStack
      alignSelf="center"
      flex={{ base: 1, lg: 1.6, xl: 1 }}
      spacing="20px"
      w="100%"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <Link
        href="/a-contemp"
        _hover={{
          textDecoration: 'none',
          color: 'red.600'
        }}
      >
        <Text w="max-content" fontSize={'1rem'}>
          A Contemp
        </Text>
      </Link>
      <Link
        _hover={{
          textDecoration: 'none',
          color: 'red.600'
        }}
        href="/calibracao"
      >
        <Text w="max-content" fontSize={'1rem'}>
          Calibração
        </Text>
      </Link>
      <Link
        _hover={{
          textDecoration: 'none',
          color: 'red.600'
        }}
        href="/suporte-tecnico"
      >
        <Text w="max-content" fontSize={'1rem'}>
          Suporte Técnico
        </Text>
      </Link>
      <Link
        _hover={{
          textDecoration: 'none',
          color: 'red.600'
        }}
        href="/trabalhe-conosco"
      >
        <Text w="max-content" fontSize={'1rem'}>
          Trabalhe Conosco
        </Text>
      </Link>
      <Link
        _hover={{
          textDecoration: 'none',
          color: 'red.600'
        }}
        href="https://blog.contemp.com.br"
      >
        <Text w="max-content" fontSize={'1rem'}>
          Blog
        </Text>
      </Link>
    </HStack>
  )
}
