import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import Cookies from 'js-cookie'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, database } from '../utils/db'
import {
  Button,
  Flex,
  HStack,
  Link,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { collection, getDocs, onSnapshot, disableNetwork, enableNetwork } from 'firebase/firestore'
interface AuthProviderProps {
  children: ReactNode
}

type UserAuthContextData = {
  user: any
  setUser: any
  listHeader: any
  setListHeader: any
  setAllProducts: any
  allProducts: any
  allProductsActive: any
  cart: any
  setCart: any
  addCart: any
  clearCart: any
  removeCart: any
  isOpen: any
  onClose: any
  onOpen: any
  totalCart: any
  allCategory: any
  allCategoryActive: any
  reload: any
  reloadCategory: any
  allProductsHome: any
  loading: any
  reloadProduct: any
}
const UserAuthContext = createContext({} as UserAuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUserContext] = useState({})
  const [listHeader, setListHeader] = useState<any>([])
  const [allProducts, setAllProducts] = useState<any>([])
  const [allProductsActive, setAllProductsActive] = useState<any>([])
  const [allProductsHome, setAllProductsHome] = useState<any>([])
  const [allCategory, setAllCategory] = useState<any>([])
  const [allCategoryActive, setAllCategoryActive] = useState<any>([])
  const [cart, setCart] = useState<any>([])
  const [totalCart, setTotalCart] = useState<any>(0)
  const [loading, setLoading] = useState<any>(false)
  const [hasCookie, setHasCookie] = useState<any>(false)

  const setUser = (body: any) => {
    setUserContext(body)
    Cookies.set('SET_USER', JSON.stringify(body))
  }

  useEffect(() => {
    async function loadUserFromCookies() {
      const user = Cookies.get('SET_USER')
      if (user) {
        setUser(JSON.parse(user))
      }
    }
    loadUserFromCookies()
  }, [])

  const acepetCookie = () => {
    localStorage.setItem('acepetCookie', JSON.stringify(true))
    getCookie()
  }

  useEffect(() => {
    const au = onAuthStateChanged(auth, (use) => {
      if (use) {
        setUser(use)
      } else {
        setUser({})
      }
    })
    return () => au()
  }, [])

  const getCategoryOffiline = async () => {
    try {
      let get = localStorage.getItem('SET_CATEGORY')
      if (get) {
        let list = JSON.parse(get)
        let active = list.filter((el: any) => el.is_active == true)
        setAllCategoryActive([...active])
        setAllCategory([...list])
        return list
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getProductOffiline = async () => {
    try {
      let get = localStorage.getItem('SET_PRODUCTS')
      if (get) {
        let list = JSON.parse(get)
        let active = list.filter((el: any) => el.is_active == true)
        setAllCategoryActive([...active])
        setAllCategory([...list])
        return list
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getProductHomeOffiline = async () => {
    try {
      let get = localStorage.getItem('SET_PRODUCTS_HOME')
      if (get) {
        let list = JSON.parse(get)
        let active = list.filter((el: any) => el.is_active == true)
        setAllCategoryActive([...active])
        setAllCategory([...list])
        return list
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getCategory = async () => {
    try {
      const dbInstanceCategory = collection(database, 'categories')

      let OLDlist: any = []
      await getDocs(dbInstanceCategory).then(async (data) => {
        data.docs.map((el: any, index: number) => {
          OLDlist.push({
            ...el.data(),
            id: data.docs[index].id,
            ref: data.docs[index].ref
          })
        })
      })

      let list = OLDlist.filter((el: any) => !el.NOT_SHOW)

      let active = list.filter((el: any) => el.is_active == true)
      setAllCategoryActive([...active])
      setAllCategory([...list])
      localStorage.setItem('SET_CATEGORY', JSON.stringify([...list]))
      return list
    } catch (error) {
      console.log(error)
    }
  }

  const getAllProducts = async () => {
    try {
      const dbInstanceProduct = collection(database, 'products')

      let listOld: any = []
      await getDocs(dbInstanceProduct).then(async (data) => {
        data.docs.map((el: any, index: number) => {
          listOld.push({
            ...el.data(),
            id: data.docs[index].id,
            ref: data.docs[index].ref
          })
        })
      })

      let list = listOld.filter((el: any) => el.catgeory != 'ZGRgyNWLIzLRqjwqcdPF')

      let active = list.filter((el: any) => el.is_active == true)
      setAllProductsActive([...active])
      setAllProducts([...listOld])
      localStorage.setItem('SET_PRODUCTS', JSON.stringify([...list]))

      return list
    } catch (error) {
      console.log(error)
    }
  }

  const getAllProductsHome = async () => {
    try {
      const dbInstanceHome = collection(database, 'home')

      let listOld: any = []
      await getDocs(dbInstanceHome).then(async (data) => {
        data.docs.map((el: any, index: number) => {
          listOld.push({ ...el.data(), id: data.docs[index].id })
        })
      })

      let list = listOld.filter((el: any) => el.catgeory != 'ZGRgyNWLIzLRqjwqcdPF')


      setAllProductsHome([...list])
      localStorage.setItem('SET_PRODUCTS_HOME', JSON.stringify([...list]))

    } catch (error) {
      console.log(error)
    }
  }

  const reload = async () => {
    setLoading(true)
    getCategoryOffiline()
    getProductOffiline()
    getProductHomeOffiline()
    getCategory()
    getAllProducts()
    getAllProductsHome()
    setLoading(false)
  }

  const reloadCategory = async () => {
    return await getCategory()
  }

  const reloadProduct = async () => {
    return await getAllProducts()
  }

  useEffect(() => {
    reload()
  }, [])

  const getItemLocal = () => {
    let getItem = window.localStorage.getItem('CART-CONTEMP')

    if (getItem) {
      let convert = JSON.parse(getItem)
      setCart(convert)
      window.localStorage.setItem('CART-CONTEMP', JSON.stringify(convert))

      let total = 0
      convert.forEach((el: any) => {
        total = total + el.qtd
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
        reloadProduct,
        reloadCategory,
        allCategoryActive,
        allProductsActive,
        loading,
        allProductsHome,
        reload,
        allCategory,
        totalCart,
        isOpen,
        onClose,
        onOpen,
        removeCart,
        clearCart,
        addCart,
        cart,
        setCart,
        user,
        setUser,
        listHeader,
        setListHeader,
        allProducts,
        setAllProducts
      }}
    >
      {hasCookie && (
        <Flex
          w="100%"
          maxW="440px"
          h={["340px", "280px"]}
          borderRadius="6px"
          position="fixed"
          bg="red.600"
          bottom="10px"
          left={["0", "20px"]}
          p="20px 26px"
          flexDirection="column"
          justifyContent="space-between"
          boxShadow="0 -1px 10px 0 #acabab4d;"
          zIndex={999999999}
        >
          <Text fontWeight="bold" color="white" fontSize="20px" mb="10px">
            Valorizamos sua privacidade
          </Text>
          <Text color="white" fontSize="18px" mb="10px">
            Utilizamos cookies para aprimorar sua experiência de navegação,
            exibir anúncios ou conteúdos personalizado e analisar nosso tráfego.
            Ao clicar em "Aceitar todos", você concorda com nosso uso de
            cookies.
            <Link
              as="span"
              ml="5px"
              isExternal
              href="https://blog.contemp.com.br/politica-de-privacidade"
              target="_blank"
            >
              Leia mais
            </Link>
          </Text>
          <Flex alignItems="center" justifyContent="flex-end">
            <HStack spacing="10px">
              <Button
                onClick={() => acepetCookie()}
                _hover={{
                  opacity: 0.7
                }}
                bg="transparent"
                border="2px solid white"
                textAlign="center"
                borderRadius="20px"
                height="40px"
                p="10px 20px"
                color="white"
              >
                Rejeitar
              </Button>
              <Button
                w="130px"
                bg="white"
                border="none"
                onClick={() => acepetCookie()}
                _hover={{
                  opacity: 0.7
                }}
                color="black.800"
                textAlign="center"
                borderRadius="20px"
                height="40px"
                p="10px"
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
