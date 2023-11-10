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
  Tab,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Heading,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Logo from '../../assets/icons/Logo-Contemp.svg'
import TabCategory from '../../components/Tabs/TabCategory'
import TabHome from '../../components/Tabs/TabHome'
import TabProduct from '../../components/Tabs/TabProduct'
import moment from 'moment'
import { setContextMenuFalse } from '../../utils/setContextMenuFalse'
import { withSSRAuth } from '../../utils/withSSRAuth'
import { AiOutlineHistory } from 'react-icons/ai'
import { Table, Tooltip } from 'antd'
import { api } from '../../lib/axios'
import { parseCookies } from "nookies";
import { getFormattedDateTime } from '../../utils/countdown'
import TabFiles from '../../components/Tabs/TabFiles'

const Adm = () => {
  // const router = useRouter();
  const [activeTab, setActiveTab] = useState(0)
  const [date, setDate] = useState(getFormattedDateTime())
  const [logs, setLogs] = useState<any[]>([])
  const [back, setBack] = useState<boolean>(true)
  const [user, setUser] = useState<any>({})
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

  useEffect(() => {
    const getLogs = async () => {
      const { data } = await api.get('getLogs')
      setLogs(data)
    }

    getLogs()
  }, [])


  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(getFormattedDateTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const cookies = parseCookies();
    let userJson = JSON.parse(cookies['nextAuth.contemp'])
    setUser(userJson.body)
  }, [])

  const btnRef = useRef<any>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const componentsTab = [
    // <TabSeo />,
    <TabHome />,
    <TabCategory />,
    <TabProduct back={back}/>,
    <TabFiles />
  ]

  const emails: any = {
    "marketing@contemp.com.br": 'Marketing',
    "kemelin@3hub.co": 'Kemelin',
    "atendimento@3hub.co": 'Atendimento 3Hub'
  }

  return (
    <>
      <Container maxW='7xl' p='12px 60px 12px 60px'>
        <Flex alignItems='center' maxW={'var(--max-tamanho)'} m={'auto'} justifyContent='space-between'>
          <Link href='/'>
            <Image src={Logo} width={160} height={41} onContextMenu={setContextMenuFalse} />
          </Link>
          <Flex alignItems='center'>
            <Box mr='20px' pr='20px' borderRight='1px solid #eee' h='100%'>
              <Tooltip title='Logs'>
                <AiOutlineHistory size={22} onClick={onOpen} style={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
            <Box mr='16px'>
              <Text fontWeight='bold' fontSize='20px' textAlign='right'>
                Olá {user.email ? emails[user.email] : ''}
              </Text>
              <Text fontSize='20px'>{date}</Text>
            </Box>
            <Avatar
              bg='white'
              color='black.800'
              fontWeight='bold'
              fontSize='30px'
              name='Contemp'
              src='https://bit.ly/broken-link'
            />
          </Flex>
        </Flex>
      </Container>
      <Box bg='white.500' w='100%' minH='100vh' p='31px 60px'>
        <Flex alignItems='center' justifyContent='space-between'>
          <Heading as={'h1'} className='adm-titulo text-black negrito'>
            Painel Administrativo
          </Heading>
          <Tabs variant='unstyled' index={activeTab} onChange={(indexTab) => setActiveTab(indexTab)}>
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
                  fontWeight: 'bold',
                  borderRadius: '5px',
                }}
                w='133px'
                color='black.800'
              >
                Home
              </Tab>
              <Tab
                _selected={{
                  bg: 'red.600',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '5px',
                }}
                w='133px'
                color='black.800'
              >
                Categorias
              </Tab>
              <Tab
                _selected={{
                  bg: 'red.600',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '5px',
                }}
                w='133px'
                color='black.800'
                onClick={() => setBack(!back)}
              >
                Produtos
              </Tab>
              <Tab
              _selected={{
                  bg: 'red.600',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '5px',
                }}
                w='133px'
                color='black.800'
              >
                Arquivos
              </Tab>
            </TabList>
          </Tabs>
        </Flex>
        <Divider mt='20px' mb='20px' bg='black.800' />
        {componentsTab[activeTab]}
      </Box>
      <Flex alignItems='center' justifyContent='flex-end' bg='white.500' w='100%'>
        <Link
          mr={'5%'}
          mb={'3%'}
          isExternal
          href='https://3hub.co/'
          _hover={{ textDecoration: 'none', color: 'black.800' }}
        >
          <Text fontSize='20px' color='black.800'>
            Desenvolvido por{' '}
            <Text as='span' color='red.600' fontWeight='bold'>
              3Hub
            </Text>
          </Text>
        </Link>
      </Flex>

      <Drawer size={'lg'} isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color={'#ccc'} />
          <DrawerHeader color={'#000'}>Logs de atividades</DrawerHeader>

          <DrawerBody>
            <Table
              columns={[
                { title: '#', width: 170, dataIndex: 'created_at', render: (item) => moment(item).fromNow() },
                { title: 'Usuário', width: 200, dataIndex: 'user', ellipsis: true },
                { title: 'Log', dataIndex: 'description', ellipsis: true },
              ]}
              dataSource={logs}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Adm

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  }
})
