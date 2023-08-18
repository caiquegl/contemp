import { Button, Center, Flex, Text, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

const Page404 = () => {
  const router = useRouter()

  return (
    <>
      <Header />
      <Flex
        p='10px'
        pt='60px'
        bg='white'
        w='100%'
        h='100%'
        alignItems='flex-start'
        flexDirection={['column', 'column', 'column', 'row', 'row']}
      >
        <Center w='100%' minH='500px' flexDirection='column'>
          <Text color='black.800' fontWeight='bold' fontSize={['40px', '60px']} textAlign='center' mb='30px'>
            Conteúdo não encontrado
          </Text>
          <Text color='black.800' fontSize='17px' textAlign='center' mb='20px'>
            Vasculhamos tudo por aqui e não encontramos o conteúdo que está procurando. Você pode:
          </Text>
          <HStack spacing='20px'>
            <Button
              color='black.800'
              border='2px solid'
              borderColor='black.800'
              borderRadius='25px'
              w='100%'
              maxW='243px'
              h='50px'
              bg='white'
              fontSize='20px'
              onClick={() => router.push('/')}
              _hover={{
                bg: 'black.800',
                color: 'white',
                transition: 'all 0.3s',
              }}
            >
              Voltar para a home
            </Button>
            <Button
              color='white'
              border='2px solid'
              borderColor='red.600'
              borderRadius='25px'
              w='100%'
              maxW='243px'
              h='50px'
              bg='red.600'
              fontSize='20px'
              //   onClick={() => router.push('/')}
              _hover={{
                bg: 'white',
                color: 'red.600',
                transition: 'all 0.3s',
              }}
            >
              Falar com vendas
            </Button>
            <Button
              color='white'
              border='2px solid'
              borderColor='black.800'
              borderRadius='25px'
              w='100%'
              maxW='243px'
              h='50px'
              bg='black.800'
              fontSize='20px'
              onClick={() => router.push('/todosProdutos')}
              _hover={{
                bg: 'white',
                color: 'black.800',
                transition: 'all 0.3s',
              }}
            >
              Todos os produtos
            </Button>
          </HStack>
        </Center>
      </Flex>
      <Footer />
    </>
  )
}

export default Page404
