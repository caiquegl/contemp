import {
  Box,
  Flex,
  Text,
  Button,
  InputGroup,
  Input,
  Link,
  Heading, useToast
} from '@chakra-ui/react'
import Image from 'next/image'
import Logo from '../../../assets/icons/logo.png'
import { setContextMenuFalse } from '../../../utils/setContextMenuFalse'
import { api } from '../../../lib/axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Adm = () => {
  const router = useRouter();
  const { recover } = router.query;

  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [body, setBody] = useState({ confirmPassword: '', password: '' })

  const changePassword = async () => {
    try {
      if(body.confirmPassword != body.password) {
        toast({
          title: 'Erro',
          description: 'Senhas diferentes uma da outra.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return
      }

      if(!body.confirmPassword || !body.password) {
        toast({
          title: 'Erro',
          description: 'Por favor preencha todos os campos',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return
      }
      setLoading(true)

      let user = {}

      if(recover && typeof recover == 'string') user = JSON.parse(atob(recover))

      const {data} = await api.post(`changePassword`, { password: body.password, user: user })

      toast({
        title: 'Sucesso',
        description: 'Sucesso ao atualizar senha',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      setTimeout(async () => {
        await router.push('/adm')

      }, 1000)

    } catch (error: any) {
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar senha',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(recover && typeof recover == 'string') console.log(atob(recover))
  }, [recover])
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      backgroundImage={`url('../../images/banner-contemp.png')`}
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
          Trocar senha
        </Text>
        <Text color="black.800" w="100%" textAlign="left" ml="20px" mb="5px" fontWeight="bold">Senha</Text>
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
            placeholder="Senha"
            type="password"
            onChange={(value) => setBody({ ...body, password: value.target.value })}
            _focusVisible={{
              outline: 'none'
            }}
          />
        </InputGroup>
        <Text color="black.800" w="100%" textAlign="left" ml="20px" mb="5px" fontWeight="bold">Confirmar Senha</Text>
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
            placeholder="Senha"
            type="password"
            onChange={(value) => setBody({ ...body, confirmPassword: value.target.value })}
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
            isLoading={loading}
            onClick={changePassword}
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

export default Adm
