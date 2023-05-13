import {
  Box,
  Flex,
  Text,
  Button,
  InputGroup,
  Input,
  Link
} from '@chakra-ui/react'
import Image from 'next/image'
import Logo from '../../assets/icons/logo.png'
import { setContextMenuFalse } from '../../utils/setContextMenuFalse'

const NewPassword = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      backgroundImage={`url('../images/banner-contemp.png')`}
      minH="100vh"
      minW="100vw"
    >
      <Box mb="30px">
        <Image src={Logo} onContextMenu={setContextMenuFalse} />
      </Box>
      <Box
        bg="white"
        borderRadius="8px"
        p="30px"
        w="100%"
        maxW="463px"
        minH="364px"
        textAlign="center"
        mb="20px"
      >
        <Text color="black.800" fontSize="30px" fontWeight="bold" mb="30px">
          Digite sua nova senha
        </Text>
        <Text
          fontSize="20px"
          fontStyle="italic"
          color="black.800"
          textAlign="left"
          mb="20px"
        >
          Defina uma nova senha diferente da anterior para fazer login.
        </Text>
        <InputGroup
          borderRadius="25px"
          bg="white.500"
          p="3px 7px"
          w="100%"
          h="50px"
          outline="none"
          border="1px solid"
          borderColor="black.800"
          color="black.800"
          mb="20px"
        >
          <Input
            w="100%"
            height="100%"
            border="none"
            borderRadius="21px"
            placeholder="Nova senha"
            type="password"
            _focusVisible={{
              outline: 'none'
            }}
          />
        </InputGroup>
        <InputGroup
          borderRadius="25px"
          bg="white.500"
          p="3px 7px"
          w="100%"
          h="50px"
          outline="none"
          border="1px solid"
          borderColor="black.800"
          color="black.800"
          mb="40px"
        >
          <Input
            w="100%"
            height="100%"
            border="none"
            borderRadius="21px"
            placeholder="Confirmar nova senha"
            type="password"
            _focusVisible={{
              outline: 'none'
            }}
          />
        </InputGroup>
        <Flex w="100%" alignItems="center" justifyContent="space-between">
          <Link
            href="/adm"
            textDecoration="none"
            color="black.800"
            textStyle="italic"
            _hover={{
              transition: 'all 0.4s',
              opacity: 0.7
            }}
          >
            Voltar
          </Link>
          <Button
            w="128px"
            h="50px"
            borderRadius="25px"
            bg="red.600"
            color="white"
            textAlign="center"
            _hover={{
              transition: 'all 0.4s',
              opacity: 0.7
            }}
          >
            Enviar
          </Button>
        </Flex>
      </Box>
      <Link
        isExternal
        href="https://3hub.co/"
        _hover={{ textDecoration: 'none', color: 'black.800' }}
      >
        <Text fontSize="20px" color="black.800">
          Desenvolvido por{' '}
          <Text as="span" color="red.600" fontWeight="bold">
            3Hub
          </Text>
        </Text>
      </Link>
    </Flex>
  )
}

export default NewPassword
