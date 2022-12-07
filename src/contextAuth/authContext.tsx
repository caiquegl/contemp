import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { onAuthStateChanged } from 'firebase/auth'
import { auth, database } from "../utils/db";
import { useDisclosure } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
interface AuthProviderProps {
  children: ReactNode;
}

type UserAuthContextData = {
  user: any;
  setUser: any;
  listHeader: any;
  setListHeader: any;
  setAllProducts: any;
  allProducts: any
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
  reload: any
};
const UserAuthContext = createContext({} as UserAuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUserContext] = useState({});
  const [listHeader, setListHeader] = useState<any>([]);
  const [allProducts, setAllProducts] = useState<any>([]);
  const [allCategory, setAllCategory] = useState<any>([]);
  const [cart, setCart] = useState<any>([]);
  const [totalCart, setTotalCart] = useState<any>(0);

  const setUser = (body: any) => {
    setUserContext(body);
    Cookies.set("SET_USER", JSON.stringify(body));
  };

  useEffect(() => {
    async function loadUserFromCookies() {
      const user = Cookies.get("SET_USER");
      if (user) {
        setUser(JSON.parse(user));
      }
    }
    loadUserFromCookies();
  }, []);


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

  const getCategory = async () => {
    try {
      const dbInstanceCategory = collection(database, "categories");

      let list: any = []
      await getDocs(dbInstanceCategory).then(async (data) => {
        data.docs.map((el: any, index: number) => {
          list.push({ ...el.data(), id: data.docs[index].id })
        })
      });

      setAllCategory(list)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllProducts = async () => {
    try {
      const dbInstanceProduct = collection(database, "products");
      // const dbInstanceHome = collection(database, "home");

      let list: any = []
      await getDocs(dbInstanceProduct).then(async (data) => {
        data.docs.map((el: any, index: number) => {
          list.push({ ...el.data(), id: data.docs[index].id })
        })
      });

      // await getDocs(dbInstanceHome).then(async (data) => {
      //   data.docs.map((el: any, index: number) => {
      //     list.push({ ...el.data(), id: data.docs[index].id })
      //   })
      // });


      setAllProducts(list)
    } catch (error) {
      console.log(error)
    }
  }

  const reload = async () => {
    await getCategory()
    await getAllProducts()
  }

  useEffect(() => {
    getCategory()
    getAllProducts()
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

  const disclosure = useDisclosure();

  const { isOpen, onClose, onOpen } = disclosure;

  useEffect(() => {
    getItemLocal()
  }, [])
  return (
    <UserAuthContext.Provider value={{ reload, allCategory, totalCart, isOpen, onClose, onOpen, removeCart, clearCart, addCart, cart, setCart, user, setUser, listHeader, setListHeader, allProducts, setAllProducts }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export const useAuth = () => useContext(UserAuthContext);
