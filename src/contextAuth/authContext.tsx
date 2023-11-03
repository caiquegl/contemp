import { createContext, ReactNode, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Button, Flex, HStack, Link, Text, useDisclosure, Heading } from '@chakra-ui/react'

interface AuthProviderProps {
  children: ReactNode
}

type UserAuthContextData = {
  cart: any
  setCart: any
  addCart: any
  clearCart: any
  removeCart: any
  isOpen: any
  onClose: any
  onOpen: any
  totalCart: any
  loading: any
}
const UserAuthContext = createContext({} as UserAuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [cart, setCart] = useState<any>([])
  const [totalCart, setTotalCart] = useState<any>(0)
  const [loading, setLoading] = useState<any>(true)
  const [hasCookie, setHasCookie] = useState<any>(false)

  // useLayoutEffect(() => {
  //   let exist = sessionStorage.getItem('set_load')
  //   if (exist) setLoading(false)
  // })

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])
  const acepetCookie = () => {
    localStorage.setItem('acepetCookie', JSON.stringify(true))
    getCookie()
  }

  const getItemLocal = () => {
    let getItem = window.localStorage.getItem('CART-CONTEMP')

    if (getItem) {
      let convert = JSON.parse(getItem)
      setCart(convert)
      window.localStorage.setItem('CART-CONTEMP', JSON.stringify(convert))

      let total = 0
      convert.forEach((el: any) => {
        total = total + parseInt(el.qtd)
      })
      setTotalCart(total)
    }
  }

  const addCart = (body: any) => {
    let getItem = window.localStorage.getItem('CART-CONTEMP')

    if (getItem) {
      let convert = JSON.parse(getItem)
      convert.push(body)
      window.localStorage.setItem('CART-CONTEMP', JSON.stringify(convert))
    } else {
      window.localStorage.setItem('CART-CONTEMP', JSON.stringify([body]))
    }
    getItemLocal()
  }

  const removeCart = (body: any, index: number) => {
    let newList: any = []

    body.forEach((el: any, indexremove: number) => {
      if (indexremove != index) newList.push(el)
    })

    window.localStorage.setItem('CART-CONTEMP', JSON.stringify(newList))
    getItemLocal()
  }

  const clearCart = (body: any) => {
    window.localStorage.removeItem('CART-CONTEMP')
    setCart([])
  }

  const disclosure = useDisclosure()

  const { isOpen, onClose, onOpen } = disclosure

  const getCookie = () => {
    let has = localStorage.getItem('acepetCookie')
    if (!has) {
      setHasCookie(true)
    } else {
      setHasCookie(false)
    }
  }
  useEffect(() => {
    getItemLocal()
    getCookie()
  }, [])
  return (
    <UserAuthContext.Provider
      value={{
        loading,
        totalCart,
        isOpen,
        onClose,
        onOpen,
        removeCart,
        clearCart,
        addCart,
        cart,
        setCart,
      }}
    >
      {hasCookie && (
        <Flex
          w='100%'
          maxW='440px'
          h={['340px', '280px']}
          borderRadius='6px'
          position='fixed'
          bg='red.600'
          bottom='10px'
          left={['0', '20px']}
          p='20px 26px'
          flexDirection='column'
          justifyContent='space-between'
          boxShadow='0 -1px 10px 0 #acabab4d;'
          zIndex={999999999}
        >
          <Text fontWeight='bold' color='white' fontSize='20px' mb='10px'>
            Valorizamos sua privacidade
          </Text>
          <Text color='white' fontSize='18px' mb='10px'>
            Utilizamos cookies para aprimorar sua experiência de navegação, exibir anúncios ou conteúdos personalizado e
            analisar nosso tráfego. Ao clicar em "Aceitar todos", você concorda com nosso uso de cookies.
            <Link
              as='span'
              ml='5px'
              isExternal
              href='https://blog.contemp.com.br/politica-de-privacidade'
              target='_blank'
            >
              Leia mais
            </Link>
          </Text>
          <Flex alignItems='center' justifyContent='flex-end'>
            <HStack spacing='10px'>
              <Button
                onClick={() => acepetCookie()}
                _hover={{
                  opacity: 0.7,
                }}
                bg='transparent'
                border='2px solid white'
                textAlign='center'
                borderRadius='20px'
                height='40px'
                p='10px 20px'
                color='white'
              >
                Rejeitar
              </Button>
              <Button
                w='130px'
                bg='white'
                border='none'
                onClick={() => acepetCookie()}
                _hover={{
                  opacity: 0.7,
                }}
                color='black.800'
                textAlign='center'
                borderRadius='20px'
                height='40px'
                p='10px'
              >
                Aceitar
              </Button>
            </HStack>
          </Flex>
        </Flex>
      )}
      {children}
    </UserAuthContext.Provider>
  )
}

export const useAuth = () => useContext(UserAuthContext)
