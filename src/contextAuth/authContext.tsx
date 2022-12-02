import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";

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
};
const UserAuthContext = createContext({} as UserAuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUserContext] = useState({});
  const [listHeader, setListHeader] = useState<any>([]);
  const [allProducts, setAllProducts] = useState<any>([]);

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

  return (
    <UserAuthContext.Provider value={{ user, setUser, listHeader, setListHeader, allProducts, setAllProducts }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export const useAuth = () => useContext(UserAuthContext);
