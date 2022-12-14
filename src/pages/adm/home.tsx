import {
  Box,
  Flex,
  Text,
  Link,
  Container,
  Avatar,
  Divider,
  Tabs,
  TabList,
  Tab
} from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'
import Logo from '../../assets/icons/Logo-Contemp.svg'
import TabCategory from '../../components/Tabs/TabCategory'
import TabHome from '../../components/Tabs/TabHome'
import TabProduct from '../../components/Tabs/TabProduct'

import moment from 'moment'
import { setContextMenuFalse } from '../../utils/setContextMenuFalse'

const Adm = () => {
  // const router = useRouter();
  // const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState(0)

  // useEffect(() => {
  //   async function loadUserFromCookies() {
  //     const userCookies = Cookies.get("SET_USER");
  //     if (userCookies) {
  //       setUser(JSON.parse(userCookies));
  //     }
  //     if (Object.keys(user).length === 0) {
  //       router.push("/adm");
  //     }
  //   }
  //   loadUserFromCookies();
  // }, []);

  const componentsTab = [
    // <TabSeo />,
    <TabHome />,
    <TabCategory />,
    <TabProduct />
  ]
  return (
    <>
      <Container maxW="7xl" p="12px 60px 12px 60px">
        <Flex alignItems="center" justifyContent="space-between">
          <Link href="/">
            <Image
              src={Logo}
              width={160}
              height={41}
              onContextMenu={setContextMenuFalse}
            />
          </Link>
          <Flex alignItems="center">
            <Box mr="16px">
              <Text fontWeight="bold" fontSize="20px" textAlign="right">
                Olá
              </Text>
              <Text fontSize="20px">
                {`${moment().format('DD/MM/YYYY - HH:mm').toString()}`}
              </Text>
            </Box>
            <Avatar
              bg="white"
              color="black.800"
              fontWeight="bold"
              fontSize="30px"
              name="Caique"
              src="https://bit.ly/broken-link"
            />
          </Flex>
        </Flex>
      </Container>
      <Box bg="white.500" w="100%" minH="100vh" p="31px 60px">
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="30px" fontWeight="bold" color="black.800">
            Painel Administrativo
          </Text>
          <Tabs
            variant="unstyled"
            index={activeTab}
            onChange={(indexTab) => setActiveTab(indexTab)}
          >
            <TabList>
              {/* <Tab
                _selected={{
                  bg: "red.600",
                  color: "white",
                  fontWeight: "bold",
                }}
                w="133px"
                color="black.800"
              >
                SEO
              </Tab> */}
              <Tab
                _selected={{
                  bg: 'red.600',
                  color: 'white',
                  fontWeight: 'bold'
                }}
                w="133px"
                color="black.800"
              >
                Home
              </Tab>
              <Tab
                _selected={{
                  bg: 'red.600',
                  color: 'white',
                  fontWeight: 'bold'
                }}
                w="133px"
                color="black.800"
              >
                Categorias
              </Tab>
              <Tab
                _selected={{
                  bg: 'red.600',
                  color: 'white',
                  fontWeight: 'bold'
                }}
                w="133px"
                color="black.800"
              >
                Produtos
              </Tab>
            </TabList>
          </Tabs>
        </Flex>
        <Divider mt="20px" mb="20px" bg="black.800" />
        {componentsTab[activeTab]}
      </Box>
      <Flex
        alignItems="center"
        justifyContent="flex-end"
        bg="white.500"
        w="100%"
      >
        <Link
          mr="50px"
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
    </>
  )
}

export default Adm
