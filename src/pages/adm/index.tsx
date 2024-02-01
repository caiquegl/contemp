import { Box, Flex, Text, Button, InputGroup, Input, Link, useToast, Heading } from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'
import Logo from '../../assets/images/170x41.png'
import { useRouter } from 'next/router'
import { setContextMenuFalse } from '../../utils/setContextMenuFalse'
import { setCookie } from 'nookies'
import { withSSRAuthRedirect } from '../../utils/withSSRAuthRedirect'
import { api } from '../../lib/axios'

const Adm = () => {
  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [body, setBody] = useState({ email: '', password: '' })

  const signIn = async () => {
    try {
      setLoading(true)
      const {data} = await api.post(`login`, { email: body.email, password: body.password })
      setCookie(
        undefined,
        'nextAuth.contemp',
        JSON.stringify({
          data,
          body,
        })
      )
      router.push('/adm/home')
    } catch (error: any) {
      console.log(error)
      toast({
        title: 'Erro',
        description: error.message === 'EMAIL_NOT_FOUND' ? 'Email não cadastrado' : 'Senha inválida',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
      backgroundImage={`url('./images/banner-contemp.png')`}
      onContextMenu={setContextMenuFalse}
      minH='100vh'
      minW='100vw'
    >
      <Box mb='30px'>
        <Image src={Logo} onContextMenu={setContextMenuFalse} />
      </Box>
      <Box bg='white' borderRadius='8px' p='30px' w='100%' maxW='463px' minH='364px' textAlign='center' mb='20px'>
        <Text color='black.800' fontSize='30px' fontWeight='bold' mb='30px'>
          Painel Administrativo
        </Text>
        <InputGroup
          borderRadius='25px'
          bg='white.500'
          p='3px 7px'
          w='100%'
          h='50px'
          outline='none'
          border='1px solid'
          borderColor='black.800'
          color='black.800'
          mb='22px'
        >
          <Input
            w='100%'
            height='100%'
            border='none'
            borderRadius='21px'
            autoComplete="off"
            placeholder='Email'
            onChange={(value) => setBody({ ...body, email: value.target.value })}
            _focusVisible={{
              outline: 'none',
            }}
          />
        </InputGroup>
        <InputGroup
          borderRadius='25px'
          bg='white.500'
          p='3px 7px'
          w='100%'
          h='50px'
          outline='none'
          border='1px solid'
          borderColor='black.800'
          color='black.800'
          mb='40px'
        >
          <Input
            w='100%'
            height='100%'
            border='none'
            borderRadius='21px'
            placeholder='Senha'
            type='password'
            autoComplete="off"
            onChange={(value) => setBody({ ...body, password: value.target.value })}
            _focusVisible={{
              outline: 'none',
            }}
          />
        </InputGroup>
        <Flex w='100%' alignItems='center' justifyContent='space-between'>
          <Link
            href='/adm/recover-password'
            textDecoration='none'
            color='black.800'
            textStyle='italic'
            _hover={{
              transition: 'all 0.4s',
              opacity: 0.7,
            }}
          >
            Esqueci a senha
          </Link>
          <Button
            w='128px'
            h='50px'
            borderRadius='25px'
            bg='red.600'
            color='white'
            textAlign='center'
            isLoading={loading}
            onClick={signIn}
            _hover={{
              transition: 'all 0.4s',
              opacity: 0.7,
            }}
          >
            Entrar
          </Button>
        </Flex>
      </Box>
      <Link isExternal href='https://3hub.co/' _hover={{ textDecoration: 'none', color: 'black.800' }}>
        <Text fontSize='20px' color='black.800'>
          Desenvolvido por{' '}
          <Text as='span' color='red.600' fontWeight='bold'>
            3Hub
          </Text>
        </Text>
      </Link>
    </Flex>
  )
}

export default Adm

export const getServerSideProps = withSSRAuthRedirect(async (ctx) => {
  return {
    props: {},
  }
})
