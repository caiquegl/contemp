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
import { FaCaretDown, FaCaretUp, FaRegUserCircle, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { PiCardholderDuotone } from "react-icons/pi";
import { RiFileExcel2Line, RiCloseCircleLine } from "react-icons/ri";

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
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);  // Alterna entre expandido e contraído
  };

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
    <Flex direction="column" position="relative" height="100vh">
      {/* Botão Flutuante para Alternar a Expansão/Contração do Menu */}
      <IconButton
        aria-label="Toggle Menu"
        icon={isExpanded ? <RiCloseCircleLine /> : <RxHamburgerMenu />}
        onClick={toggleMenu}
        position="absolute"
        top="2"
        left={isExpanded ? "260px" : "90px"} // Ajuste a posição com base no estado do menu
        zIndex="sticky"
      />

      <Box bg="#fff" width={isExpanded ? "250px" : "80px"} height="100vh" overflowY="auto" position="fixed" zIndex="sticky">
        <Flex direction="column" height="100%" p="3">
          <VStack w={'100%'} flex="1" spacing={4}>
            <Flex align="center" mb="0" justifyContent='space-between'>
              <Avatar src={user.photo} name={user.name} bg='white' color='black.800' />
              <VStack flex="1" ml="3" align="start" spacing="0">
                {isExpanded && <Text color="#212121" fontSize="md" fontWeight="bold" noOfLines={1}> {user.name} </Text>}
                {isExpanded && <Text color="#212121" fontSize="sm" noOfLines={1}> {date} </Text>}
              </VStack>
              {isExpanded && <IconButton
                aria-label="Opções"
                icon={<RxHamburgerMenu />}
                variant="ghost"
                colorScheme="gray"
                size="sm"
                ml="2"
              />}

            </Flex>

            <VStack w={'90%'} spacing={2} align="stretch" mb={'0%'}>
              <Divider my="4" />
              <Box>
                <Flex alignItems='center' justifyContent='space-between'>
                  {isExpanded && <Heading as={'h1'} className='adm-titulo text-black negrito' textAlign={'left'}>Painel Administrativo</Heading>}
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
                    {isExpanded && <Text ml="2">Home</Text>}
                  </Box>
                  {isHomeActive ? <FaCaretUp /> : <FaCaretDown />}
                </Flex>
              </Button>
              {/* Submenu para 'Home' */}
              {activeSubTab === 'home' && (
                <VStack spacing={2} align="stretch" mt="3">
                  <Button
                    className="adm-botao-sidemenu"
                    variant="ghost"
                    width="100%"
                    onClick={() => alert('Ação Carrossel Home')}
                    justifyContent="start"
                  >
                    <Flex justifyContent="start" alignItems="center">
                      {isExpanded ? <BiCarousel /> : <BiCarousel />}
                      {isExpanded && <Text ml="2">Banner Home</Text>}
                    </Flex>
                  </Button>
                  <Button
                    className="adm-botao-sidemenu"
                    variant="ghost"
                    width="100%"
                    onClick={() => alert('Ação Cards Home')}
                    justifyContent="start"
                  >
                    <Flex justifyContent="start" alignItems="center">
                      {isExpanded ? <FiHexagon /> : <FiHexagon />}
                      {isExpanded && <Text ml="2">Cards Home</Text>}
                    </Flex>
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
                    {isExpanded && <Text ml="2">Categorias</Text>}
                  </Box>
                  {isCategoriaActive ? <FaCaretUp /> : <FaCaretDown />}
                </Flex>
              </Button>
              {/* Submenu para 'Categorias' */}
              {activeSubTab === 'categoria' && (
                <VStack spacing={2} align="stretch" mt="3">
                  <Button
                    className="adm-botao-sidemenu"
                    variant="ghost"
                    width="100%"
                    onClick={() => alert('Exportar CSV')}
                    justifyContent="start"
                  >
                    <Flex justifyContent="start" alignItems="center">
                      {isExpanded ? <RiFileExcel2Line /> : <RiFileExcel2Line />}
                      {isExpanded && <Text ml="2">Exportar em CSV</Text>}
                    </Flex>
                  </Button>
                </VStack>
              )}
              <Button
                className="adm-botao-sidemenu"
                variant="ghost"
                width="100%"
                onClick={() => setActiveTab(2)}
                justifyContent="start"
              >
                <Flex justifyContent="start" alignItems="center">
                  <MdOutlineProductionQuantityLimits />
                  {isExpanded && <Text ml="2">Produtos</Text>}
                </Flex>
              </Button>
              <Button
                className="adm-botao-sidemenu"
                variant="ghost"
                width="100%"
                onClick={() => setActiveTab(3)}
                justifyContent="start"
              >
                <Flex justifyContent="start" alignItems="center">
                  <BsArchive />
                  {isExpanded && <Text ml="2">Arquivos</Text>}
                </Flex>
              </Button>
              <Button
                className="adm-botao-sidemenu"
                variant="ghost"
                width="100%"
                onClick={() => setActiveTab(4)}
                justifyContent="start"
              >
                <Flex justifyContent="start" alignItems="center">
                  <FiCompass />
                  {isExpanded && <Text ml="2">URL's</Text>}
                </Flex>
              </Button>
              <Button
                className="adm-botao-sidemenu"
                variant="ghost"
                width="100%"
                onClick={() => setActiveTab(5)}
                justifyContent="start"
              >
                <Flex justifyContent="start" alignItems="center">
                  <FaRegUserCircle />
                  {isExpanded && <Text ml="2">Usuários</Text>}
                </Flex>
              </Button>
            </VStack>


            <Divider my="4" />

            <Stack w={'90%'} spacing={2} align="stretch" mb={'0%'}>
              <Box>
                <Flex justifyContent='space-between'>
                  {isExpanded && <Heading as={'h1'} className='adm-titulo text-black negrito' textAlign={'left'}>Ferramentas Úteis</Heading>}
                </Flex>
              </Box>
              <Button
                className="adm-botao-sidemenu"
                variant="ghost"
                width="100%"
                onClick={handleExportCSV}
                justifyContent="start"
              >
                <Flex justifyContent="start" alignItems="center">
                  <DownloadOutlined />
                  {isExpanded && <Text ml="2">Baixar Logs</Text>}
                </Flex>
              </Button>
              <Button
                className="adm-botao-sidemenu"
                variant="ghost"
                width="100%"
                onClick={onOpen}
                justifyContent="start"
              >
                <Flex justifyContent="start" alignItems="center">
                  <AiOutlineHistory />
                  {isExpanded && <Text ml="2">Ver Logs</Text>}
                </Flex>
              </Button>
            </Stack>
          </VStack>
          <Box textAlign="center">
            <Divider my="4" />
            {isExpanded && <Link href='/' mb="5">
              <Image src={Logo} width={160} height={41} />
            </Link>}

          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SideMenu;