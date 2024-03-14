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
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Heading,
  Button,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Logo from '../../assets/icons/Logo-Contemp.svg';
import TabCategory from '../../components/Tabs/TabCategory';
import TabHome from '../../components/Tabs/TabHome';
import TabProduct from '../../components/Tabs/TabProduct';
import moment from 'moment';
import { setContextMenuFalse } from '../../utils/setContextMenuFalse';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { AiOutlineHistory } from 'react-icons/ai';
import { Table, Tooltip } from 'antd';
import { api } from '../../lib/axios';
import { parseCookies } from 'nookies';
import { getFormattedDateTime } from '../../utils/countdown';
import TabFiles from '../../components/Tabs/TabFiles';
import TabRedirects from '../../components/Tabs/TabRedirects';
import saveAs from 'file-saver';
import { DownloadOutlined } from '@ant-design/icons';
import SideMenu from '../../components/SideMenu';
import TabUsers from '../../components/Tabs/TabUsers'
import TabBanners from '../../components/Tabs/TabBanners'
import TabCards from '../../components/Tabs/TabCards'
import TabManuais from '../../components/Tabs/TabManuais'
import TabEmails from '../../components/Tabs/TabEmails'

const Adm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [date, setDate] = useState(getFormattedDateTime());
  const [logs, setLogs] = useState<any[]>([]);
  const [back, setBack] = useState<boolean>(true);
  const [user, setUser] = useState<any>({});
  const [exportedData, setExportedData] = useState([]);
  const [menuExpanded, setMenuExpanded] = useState(true);

  // Função para lidar com a ação de exportação
  const handleExportCSV = () => {
    // Crie uma string CSV a partir dos dados de logs
    const csvContent = [
      'Timestamp,User,Log Description', // Cabeçalho do CSV
      ...logs.map((log) => `${moment(log.created_at).format('YYYY-MM-DD HH:mm:ss')},${log.user},${log.description}`),
    ].join('\n');

    // Converta a string CSV em um Blob
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

    // Use a biblioteca file-saver para salvar o Blob como um arquivo
    saveAs(blob, 'logs_export.csv');
  };

  const Role = {
    MARKETING: 'Marketing',
    KEMELIN: 'Kemelin',
    ATENDIMENTO: 'Atendimento 3Hub',
  };

  const UserEmail = {
    MARKETING: 'marketing@contemp.com.br',
    KEMELIN: 'kemelin@3hub.co',
    ATENDIMENTO: 'atendimento@3hub.co',
  };

  const userMappings: Record<string, { name: string; photo: string; role: string }> = {
    [UserEmail.MARKETING]: {
      name: 'Marketing Contemp',
      photo: 'https://contemp.com.br/api/arquivos/2.png',
      role: Role.MARKETING,
    },
    [UserEmail.KEMELIN]: {
      name: 'Kemelin Pina',
      photo: 'https://contemp.com.br/api/arquivos/3hub-logo.png',
      role: Role.KEMELIN,
    },
    [UserEmail.ATENDIMENTO]: {
      name: 'Atendimento 3Hub',
      photo: 'https://contemp.com.br/api/arquivos/3hub-logo.png',
      role: Role.ATENDIMENTO,
    },
    // Adicione mais entradas conforme necessário
  };

  const photos: Record<string, string> = {
    [UserEmail.MARKETING]: 'https://contemp.com.br/api/arquivos/2.png',
    [UserEmail.KEMELIN]: 'https://contemp.com.br/api/arquivos/3hub-logo.png',
    [UserEmail.ATENDIMENTO]: 'https://contemp.com.br/api/arquivos/3hub-logo.png',
    // Adicione mais entradas conforme necessário
  };

  useEffect(() => {
    const getLogs = async () => {
      const { data } = await api.get('getLogs');
      setLogs(data);
    };

    getLogs();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(getFormattedDateTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getSueprAdmin = async () => {
    const cookies = parseCookies();
    let userJson = JSON.parse(cookies['nextAuth.contemp']);
    const { data } = await api.post(`getSuperAdm`, { id: userJson.data.id })

    setUser({
      name: data.name,
      email: data.email,
      super_adm: data.super_adm,
      photo: data.picture || 'https://contemp.com.br/api/arquivos/2.png',
    });
  }

  useEffect(() => {
    getSueprAdmin()
  }, []);

  const btnRef = useRef<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const componentsTab = [
    <TabHome />,
    <TabCategory menuExpanded={menuExpanded} />,
    <TabProduct back={back} />,
    <TabFiles />,
    <TabRedirects />,
    <TabUsers />,
    <TabBanners />,
    <TabCards />,
    <TabManuais />,
    <TabEmails />,
  ];

  const emails: any = {
    'marketing@contemp.com.br': 'Marketing Contemp',
    'kemelin@3hub.co': 'Kemelin Pina',
    'atendimento@3hub.co': 'Atendimento 3Hub',
  };

  return (
    <>

      <Flex>
        <Box>
          <SideMenu user={user} date={date} handleExportCSV={handleExportCSV} setActiveTab={setActiveTab} onOpen={onOpen} onToggleMenu={setMenuExpanded} />
        </Box>
        <Box bg='white.500' w='100%' minH='100vh' p='31px 60px' ml={menuExpanded ? "250px" : "80px"}>
          {componentsTab[activeTab]}
          <Box>
            <Flex
              alignItems='center'
              justifyContent='flex-end'
              bg='white.500'
              w='100%'
            >
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
          </Box>
        </Box>

        <Drawer
          size={'lg'}
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent bg={'white'}>
            <DrawerCloseButton color={'#ccc'} />
            <DrawerHeader color={'#000'}>Logs de atividades</DrawerHeader>

            <DrawerBody>
              <Table
                columns={[
                  {
                    title: '#',
                    width: 170,
                    dataIndex: 'created_at',
                    render: (item) => moment(item).fromNow(),
                  },
                  { title: 'Usuário', width: 200, dataIndex: 'user', ellipsis: true },
                  { title: 'Log', dataIndex: 'description', ellipsis: true },
                ]}
                dataSource={logs}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>

    </>
  );
};

export default Adm;

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
