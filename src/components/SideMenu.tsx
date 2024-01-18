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
  Stack,
  Spacer,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Logo from '../assets/icons/Logo-Contemp.svg';
import TabCategory from '../components/Tabs/TabCategory';
import TabHome from '../components/Tabs/TabHome';
import TabProduct from '../components/Tabs/TabProduct';
import moment from 'moment';
import { setContextMenuFalse } from '../utils/setContextMenuFalse';
import { withSSRAuth } from '../utils/withSSRAuth';
import { AiOutlineHistory } from 'react-icons/ai';
import { Table, Tooltip } from 'antd';
import { api } from '../lib/axios';
import { parseCookies } from 'nookies';
import { getFormattedDateTime } from '../utils/countdown';
import TabFiles from '../components/Tabs/TabFiles';
import TabRedirects from '../components/Tabs/TabRedirects';
import saveAs from 'file-saver';
import { DownloadOutlined } from '@ant-design/icons';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BsArchive } from "react-icons/bs";
import { LuMousePointer2 } from "react-icons/lu";
import { BiExport, BiCarousel } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { FiCompass, FiHexagon } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import React from 'react';
import { FaCaretDown, FaCaretUp, FaRegUserCircle } from "react-icons/fa";
import { PiCardholderDuotone } from "react-icons/pi";

interface SideMenuProps {
  user: {
    name: string;
    photo: string;
  };
  date: string;
  handleExportCSV: () => void;
  setActiveTab: (tabIndex: number) => void;
  onOpen: () => void;
}


const SideMenu: React.FC<SideMenuProps> = ({ user, date, handleExportCSV, setActiveTab, onOpen }) => {

  const [activeSubTab, setActiveSubTab] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isHomeActive, setIsHomeActive] = useState(false);
  const [isCategoriaActive, setIsCategoriaActive] = useState(false);

  const handleHomeClick = () => {
    setActiveTab(0); // Mantém a funcionalidade original de navegar para a aba "Home"
    setActiveSubTab(activeSubTab === 'home' ? '' : 'home'); // Alterna a visibilidade do submenu "Home"
  };

  const toggleHomeSubmenu = () => {
    setIsHomeActive(!isHomeActive);
    setActiveTab(0);
    setActiveSubTab(activeSubTab === 'home' ? '' : 'home');
  };

  const toggleCategoriasSubmenu = () => {
    setIsCategoriaActive(!isCategoriaActive);
    setActiveTab(1);
    setActiveSubTab(activeSubTab === 'categoria' ? '' : 'categoria');
  };

  return (
    <Box bg="#fff" width="250px" height="100vh" overflowY="auto" position="fixed" zIndex="sticky">
      <Flex direction="column" height="100%" p="3">
        <VStack w={'100%'} flex="1" spacing={4}>
          <Flex align="center" mb="0" justifyContent='space-between'>
            <Avatar src={user.photo} name={user.name} bg='white' color='black.800' />
            <VStack flex="1" ml="3" align="start" spacing="0">
              <Text color="#212121" fontSize="md" fontWeight="bold" noOfLines={1}>
                {user.name}
              </Text>
              <Text color="#212121" fontSize="sm" noOfLines={1}>
                {date}
              </Text>
            </VStack>
            <IconButton
              aria-label="Opções"
              icon={<RxHamburgerMenu />}
              variant="ghost"
              colorScheme="gray"
              size="sm"
              ml="2"
            />
          </Flex>

          <VStack w={'90%'} spacing={2} align="stretch" mb={'0%'}>
            <Divider my="4" />
            <Box>
              <Flex alignItems='center' justifyContent='space-between'>
                <Heading as={'h1'} className='adm-titulo text-black negrito'>
                  Painel Administrativo
                </Heading>
              </Flex>
            </Box>
            <Button
              className="adm-botao-sidemenu"
              variant="ghost"
              width="100%"
              onClick={toggleHomeSubmenu}
              justifyContent="start" // Alinha o conteúdo à esquerda
            >
              <Flex justifyContent="space-between" width="100%" alignItems="center">
                <Box display="flex" alignItems="center">
                  <GoHome />
                  <Box ml="2">Home</Box>
                </Box>
                {isHomeActive ? <FaCaretUp /> : <FaCaretDown />}
              </Flex>
            </Button>
            {/* Submenu para 'Home' */}
            {activeSubTab === 'home' && (
              <VStack spacing={2} align="stretch" mt="3">
                <Button leftIcon={<BiCarousel />} className="adm-botao-sidemenu" variant="ghost" onClick={() => console.log('Ação Carrossel Home')}>
                  Banner Home
                </Button>
                <Button leftIcon={<FiHexagon />} className="adm-botao-sidemenu" variant="ghost" onClick={() => console.log('Ação Carrossel Home')}>
                  Cards Home
                </Button>
              </VStack>
            )}
            <Button
            className="adm-botao-sidemenu"
            variant="ghost"
            width="100%"
            onClick={toggleCategoriasSubmenu}
            justifyContent="start"
            >
              <Flex justifyContent="space-between" width="100%" alignItems="center">
                <Box display="flex" alignItems="center">
                <PiCardholderDuotone />
                  <Box ml="2">Categorias</Box>
                </Box>
                {isCategoriaActive ? <FaCaretUp /> : <FaCaretDown />}
              </Flex>
            </Button>
            {/* Submenu para 'Categorias' */}
            {activeSubTab === 'categoria' && (
              <VStack spacing={2} align="stretch" mt="3">
                <Button leftIcon={<FiHexagon />} className="adm-botao-sidemenu" variant="ghost" onClick={() => console.log('Ação Carrossel Home')}>
                  Exportar em CSV
                </Button>
              </VStack>
            )}
            <Button leftIcon={<MdOutlineProductionQuantityLimits />} className="adm-botao-sidemenu" variant="ghost" onClick={() => setActiveTab(2)}>
              Produtos
            </Button>
            <Button leftIcon={<BsArchive />} className="adm-botao-sidemenu" variant="ghost" onClick={() => setActiveTab(3)}>
              Arquivos
            </Button>
            <Button leftIcon={<FiCompass />} className="adm-botao-sidemenu" variant="ghost" onClick={() => setActiveTab(4)}>
              URLs
            </Button>
            <Button leftIcon={<FaRegUserCircle />} className="adm-botao-sidemenu" variant="ghost">
              Usuários
            </Button>
          </VStack>


          <Divider my="4" />

          <Stack w={'90%'} spacing={2} align="stretch" mb={'0%'}>
            <Box>
              <Flex justifyContent='space-between'>
                <Heading as={'h1'} className='adm-titulo text-black negrito' textAlign={'left'} >
                  Ferramentas Úteis
                </Heading>
              </Flex>
            </Box>
            <Button leftIcon={<DownloadOutlined />} className="adm-botao-sidemenu" variant="ghost" onClick={handleExportCSV}>
              Baixar Logs
            </Button>
            <Button leftIcon={<AiOutlineHistory />} className="adm-botao-sidemenu" variant="ghost" onClick={onOpen}>
              Ver Logs
            </Button>
          </Stack>
        </VStack>
        <Box textAlign="center">
          <Divider my="4" />
          <Link href='/' mb="5">
            <Image src={Logo} width={160} height={41} />
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default SideMenu;