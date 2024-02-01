import {
  Box,
  Flex,
  Text,
  Link,
  Avatar,
  Divider,
  Heading,
  Button,
  IconButton,
  VStack,
  Stack,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  FormControl,
  FormLabel,
  Icon,
  InputGroup,
  Select, FormErrorMessage, HStack, Checkbox
} from '@chakra-ui/react'
import Image from 'next/image';
import { useEffect, useRef, useState, useContext } from 'react';
import Logo from '../assets/icons/Logo-Contemp.svg';
import LogoCinza from '../assets/icons/Logo-Contemp-Cinza.svg';
import LogoIcone from '../assets/icons/Logo-Contemp-Icone.svg';
import React from 'react';
import { api } from '../lib/axios'
import { replaceNameToUrl } from '../utils/replaceNameToUrl'
import InputsHome from './ContainerHome/inputs'
import moment from 'moment';
import saveAs from 'file-saver';
import ExcelJS from 'exceljs';
import RotatingIcon from '../components/RotatingIcon';
import { RiFileExcel2Line, RiCloseCircleLine } from "react-icons/ri";
import { AiOutlineHistory } from 'react-icons/ai';
import { DownloadOutlined } from '@ant-design/icons';
import { BiExport, BiCarousel } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuMailOpen, LuUser, LuCompass, LuHexagon, LuArchive, LuShirt, LuHome, LuLogOut, LuYoutube, LuLayoutDashboard } from "react-icons/lu";
import { PiCardholderBold, PiInfoDuotone } from 'react-icons/pi'
import { TbPencil } from "react-icons/tb";
import { FaMeta } from "react-icons/fa6";
import { SiGoogleanalytics } from "react-icons/si";
import { PDFDocument, rgb } from 'pdf-lib';
import { destroyCookie, parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import { InputDefault } from './Form/Input'
import { Controller } from 'react-hook-form'
import { AsyncSelect } from 'chakra-react-select'
import { TextareaDefault } from './Form/Textarea'
import { ViewImage } from './ContainerAddProduct/ViewImage'
import { Form, Input, message } from 'antd'

interface SideMenuProps {
  user: {
    name: string;
    photo: string;
    email: string;
    super_adm: boolean;
  };
  date: string;
  handleExportCSV: () => void;
  setActiveTab: (tabIndex: number) => void;
  onOpen: () => void;
  onToggleMenu: (isExpanded: boolean) => void;
}

interface Product {
  order: number;
  name: string;
  category: { name: string };
  isActive: boolean;
  created_at: string; // ou Date, dependendo de como você os recebe
  updated_at: string; // ou Date
  destaque: boolean;
  layout: number; // ou number, dependendo de como você os recebe
}


const SideMenu: React.FC<SideMenuProps> = ({ user, date, handleExportCSV, setActiveTab, onOpen, onToggleMenu }) => {
  const router = useRouter()

  const [activeSubTab, setActiveSubTab] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isHomeActive, setIsHomeActive] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [isCategoriaActive, setIsCategoriaActive] = useState(false);
  const [isProdutoActive, setIsProdutoActive] = useState(false);
  const [isRedirecionamentoActive, setIsRedirecionamentoActive] = useState(false);
  const [isFileActive, setIsFileActive] = useState(false);
  const [isDashActive, setIsDashActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [form] = Form.useForm()

  const updateUser = async (user: any) => {
    try {
      await api.post(`updateUser`, { id: user.id, ...user })
      message.success('Sucesso ao atualizar usuário')
      form.resetFields(['name', 'email', 'picture', 'id'])
      location.reload();

    } catch (error) {
      message.error('Erro ao atualizar usuário')
    } finally {
    }
  }

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);  // Alterna entre expandido e contraído
    onToggleMenu(!isExpanded); // Chamada da função callback com o novo estado
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

  const toggleProdutosSubmenu = () => {
    setIsProdutoActive(!isProdutoActive);
    setActiveTab(2);
    setActiveSubTab(activeSubTab === 'produto' ? '' : 'produto');
  };

  const toggleRedirecionamentosSubmenu = () => {
    setIsRedirecionamentoActive(!isRedirecionamentoActive);
    setActiveTab(4);
    setActiveSubTab(activeSubTab === 'url' ? '' : 'url');
  };
  const toggleFilesSubmenu = () => {
    setIsFileActive(!isFileActive);
    setActiveTab(3);
    setActiveSubTab(activeSubTab === 'arquivo' ? '' : 'arquivo');
  };

  const toggleDashsSubmenu = () => {
    setIsDashActive(!isDashActive);
    setActiveTab(4);
    setActiveSubTab(activeSubTab === 'dash' ? '' : 'dash');
  };

  const exportarCSV = async () => {
    try {
      const { data } = await api.get('getAllCategory');

      const csvContent = [
        'Ordem Geral,Ordem em todos produtos,Nome,Status,Categoria Destaque,Url,Adicionado em,Atualizado em',
        ...data.map((categoria: any) => [
          categoria.order,
          categoria.order_all_products ?? '',
          categoria.name,
          categoria.is_active ? 'Ativa' : 'Inativa',
          categoria.favorite ? 'Sim' : 'Não',
          `https://contemp.com.br/category/${replaceNameToUrl(categoria.name).toLowerCase().replaceAll(' ', '_')}`,
          moment(categoria.created_at).format('DD/MM/YYYY'),
          moment(categoria.updated_at).format('DD/MM/YYYY')
        ].join(',')),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "categorias.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao exportar categorias:", error);
      // Adicione aqui o tratamento de erros, como mostrar uma mensagem para o usuário
    }
  };

  const MenuExportProdutoCSV = async () => {
    try {
      const { data } = await api.get('getAllProductsWidthCategory');

      const csvContent = [
        'Ordem,Nome,Categoria,Status,Criado em, Atualizado em,Destaque,Layout,Url',
        ...data.map((product: any) => [
          product.order,
          product.name,
          product.category.name,
          product.isActive ? 'Ativo' : 'Inativo',
          product.destaque ? 'Destaque' : 'Não Destaque',
          `Layout ${product.layout.toString()}`,
          `https://contemp.com.br/produto/${replaceNameToUrl(product.name).toLowerCase().replaceAll(' ', '_')}`,
          moment(product.created_at).format('DD/MM/YYYY'),
          moment(product.updated_at).format('DD/MM/YYYY')
        ].join(',')),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "produtos-contemp.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert("Erro ao exportar produtos:");
      // Adicione aqui o tratamento de erros, como mostrar uma mensagem para o usuário
    }
  };

  const MenuExportUrlCSV = async () => {
    try {
      const { data } = await api.get('/getAllUrls');

      const csvContent = [
        'Id,Origem,Destino, Adicionado em, Atualizado em',
        ...data.map((record: any) => [
          record.id,
          record.source,
          record.destination,
          moment(record.created_at).format('DD/MM/YYYY'),
          moment(record.updated_at).format('DD/MM/YYYY')
        ].join(',')),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "redirecionamentos-contemp.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert("Erro ao exportar redirecionamentos:");
      // Adicione aqui o tratamento de erros, como mostrar uma mensagem para o usuário
    }
  };

  const MenuExportFileCSV = async () => {
    try {
      const { data } = await api.get('getAllFiles');

      const csvContent = [
        'Id, Nome, Url, Adicionado em, Atualizado em',
        ...data.map((file: any) => [
          file.id,
          file.name,
          `https://contemp.com.br/api/arquivos/${replaceNameToUrl(file.name).toLowerCase().replaceAll(' ', '_')}`,
          moment(file.created_at).format('DD/MM/YYYY'),
          moment(file.updated_at).format('DD/MM/YYYY')
        ].join(',')),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "arquivos-contemp.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert("Erro ao exportar arquivos:");
      // Adicione aqui o tratamento de erros, como mostrar uma mensagem para o usuário
    }
  };

  const exportExcel = async () => {
    const { data } = await api.get('getAllCategory');
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Categorias');

    // Adicione cabeçalhos
    sheet.addRow(['Ordem Geral', 'Ordem em todos produtos', 'Nome', 'Status', 'Destaque', 'Url', 'Adicionado em', 'Atualizado em']);

    // Adicione dados
    data.map((categoria: any) => {
      sheet.addRow([
        categoria.order,
        categoria.order_all_products ?? '',
        categoria.name,
        categoria.is_active ? 'Ativa' : 'Inativa',
        categoria.favorite ? 'Sim' : 'Não',
        `https://contemp.com.br/category/${replaceNameToUrl(categoria.name).toLowerCase().replaceAll(' ', '_')}`,
        moment(categoria.created_at).format('DD/MM/YYYY'),
        moment(categoria.updated_at).format('DD/MM/YYYY')
      ]);
    });

    // Crie um Blob a partir do workbook
    const blob = await workbook.xlsx.writeBuffer();

    // Use a biblioteca file-saver para salvar o Blob como um arquivo Excel
    saveAs(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'categorias_export.xlsx');
  };

  const MenuExportProdutoExcel = async () => {
    const { data } = await api.get('getAllProductsWidthCategory');
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Produtos');

    // Cabeçalho atualizado com a coluna "Layout"
    sheet.addRow(['Ordem', 'Nome', 'Categoria', 'Status', 'Criado em', 'Atualizado em', 'Destaque', 'Layout', 'URL']);

    data.map((product: any) => {
      // Adiciona a coluna "Layout" a cada linha
      sheet.addRow([product.order, product.name, product.category.name, product.isActive ? 'Ativo' : 'Inativo', moment(product.created_at).format('DD/MM/YYYY H:mm:s'), moment(product.updated_at).format('DD/MM/YYYY H:mm:s'), product.destaque ? 'Destaque' : 'Não Destaque', `Layout ${product.layout ? product.layout : 1}`, `https://contemp.com.br/produto/${replaceNameToUrl(product.name).toLowerCase().replaceAll(' ', '_')}`]);
    });

    const blob = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'products_export.xlsx');
  };

  const MenuExportUrlExcel = async () => {
    const { data } = await api.get('/getAllUrls');
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Urls');

    sheet.addRow(['Id', 'Origem', 'Destino', 'Adicionado em', 'Atualizado em']);

    data.map((record: any) => {
      sheet.addRow([record.id, record.source, record.destination, moment(record.created_at).format('DD/MM/YYYY'), moment(record.updated_at).format('DD/MM/YYYY')]);
    });

    const blob = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'exportar-urls-contemp.xlsx');
  };

  const MenuExportFileExcel = async () => {
    const { data } = await api.get('getAllFiles');
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Urls');

    sheet.addRow(['Id', 'Nome', 'Adicionado em', 'Atualizado em', 'Url']);

    data.map((file: any) => {
      sheet.addRow([file.id, file.name, moment(file.created_at).format('DD/MM/YYYY'), moment(file.updated_at).format('DD/MM/YYYY'), `https://contemp.com.br/produto/${replaceNameToUrl(file.name).toLowerCase().replaceAll(' ', '_')}`]);
    });

    const blob = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'exportar-arquivos-contemp.xlsx');
  };

  const exportarProdutosPDF = async () => {
    try {
      const { data } = await api.get('getAllProductsWidthCategory');

      const pdfDoc = await PDFDocument.create();
      // Cria uma página com layout horizontal (paisagem)
      const page = pdfDoc.addPage([842, 595]); // Substitua 'width' e 'height' pelos valores desejados

      const fontSize = 10;
      let currentY = page.getHeight() - 40; // Inicia no topo da página

      // Cabeçalhos
      const headers = ['Ordem', 'Nome', 'Categoria', 'Status', 'Criado em', 'Atualizado em', 'Destaque', 'Layout', 'URL'];
      headers.forEach((header, index) => {
        page.drawText(header, {
          x: 50 + index * 50,
          y: currentY,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
      });

      currentY -= 20;

      // Dados dos produtos
      data.forEach((product : any) => {
        const productData = [
          product.order,
          product.name,
          product.category.name,
          product.isActive ? 'Ativo' : 'Inativo',
          moment(product.created_at).format('DD/MM/YYYY'),
          moment(product.updated_at).format('DD/MM/YYYY'),
          product.destaque ? 'Destaque' : 'Não Destaque',
          `Layout ${product.layout}`,
          `https://contemp.com.br/produto/${replaceNameToUrl(product.name).toLowerCase().replaceAll(' ', '_')}`,
        ];

        productData.forEach((text, index) => {
          page.drawText(text, {
            x: 50 + index * 50,
            y: currentY,
            size: fontSize,
            color: rgb(0, 0, 0),
          });
        });

        currentY -= 20;
      });

      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'produtos-contemp.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao exportar produtos em PDF:", error);
      alert("Erro ao exportar produtos em PDF.");
    }
  };

  return (
    <Flex direction="column" position="relative" height="100vh">
      {/* Botão Flutuante para Alternar a Expansão/Contração do Menu */}
      <IconButton
        aria-label="Toggle Menu"
        icon={isExpanded ? <RiCloseCircleLine /> : <RxHamburgerMenu />}
        onClick={toggleMenu}
        position="fixed"
        top="2"
        left={isExpanded ? "calc(250px + 10px)" : "calc(80px + 10px)"}
        zIndex="sticky"
        backgroundColor={'white'}
      />

      <Box bg="#fff" width={isExpanded ? "250px" : "80px"} height="100vh" overflowY="auto" position="fixed" zIndex="sticky" boxShadow={'8px 0px 63px -9px rgba(0,0,0,0.1)'}
        sx={{
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
            background: '#fafafa',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'lightgrey',
            borderRadius: '24px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#b3b3b3',
          },
        }}
      >
        <Flex direction="column" height="100%" p="3">
          <VStack w={'100%'} flex="1" spacing={4}>
            <Flex align="center" mb="0" justifyContent='space-between' w={'100%'} px={'1'}>
              <Avatar src={user.photo} name={user.name} bg='white' color='black.800' />
              <VStack flex="1" ml="3" align="start" spacing="0">
                {isExpanded && <Text color="#212121" fontSize="md" fontWeight="bold" noOfLines={1}> {user.name} </Text>}
                {isExpanded && <Text color="#212121" fontSize="sm" noOfLines={1}> {date} </Text>}
              </VStack>
              {isExpanded && (
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Opções do Perfil"
                    icon={<RxHamburgerMenu />}
                    variant="ghost"
                    colorScheme="gray"
                    size="sm"
                    ml="2"
                  />
                  <MenuList p={'2'} minWidth={'12rem'}>
                    <Box px={4} pt={'2'}>
                      <Heading as={'h4'} fontSize={'1rem'} textTransform={'uppercase'}>Meu Perfil</Heading>
                    </Box>
                    <Divider my="4" />
                    <MenuItem
                      onClick={async () => {
                        const cookies = parseCookies();
                        let userJson = JSON.parse(cookies['nextAuth.contemp']);
                        const { data } = await api.post(`getSuperAdm`, { id: userJson.data.id })

                        form.setFieldValue('name', data.name)
                        form.setFieldValue('email', data.email)
                        form.setFieldValue('id', userJson.data.id)
                        form.setFieldValue('picture', data.picture)

                        setOpenUpdate(!openUpdate)
                      }}
                      color={'#242424'}
                      fontSize={'1rem'}
                      icon={<TbPencil />}
                    >
                      Editar Perfil
                    </MenuItem>
                    <Divider my="4" />
                    <MenuItem
                      color={'#242424'}
                      fontSize={'1rem'}
                      onClick={onOpen}
                      icon={<AiOutlineHistory />}
                    >
                      Ver Log's
                    </MenuItem>
                    <MenuItem
                      color={'#242424'}
                      fontSize={'1rem'}
                      onClick={handleExportCSV}
                      icon={<DownloadOutlined />}
                    >
                      Baixar Log's
                    </MenuItem>
                    <Divider my="4" />
                    <MenuItem
                      onClick={() => {
                        destroyCookie({}, 'nextAuth.contemp', { path: '/' })
                        router.push('/adm')
                      }}
                      color={'#242424'}
                      fontSize={'1rem'}
                      icon={<LuLogOut />}
                    >
                      Sair
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Flex>

            {
              user.super_adm && (
                <VStack w={'90%'} spacing={2} align="stretch" mb={'0%'}>
                  <Divider my="4" />
                  <Box>
                    <Flex alignItems='center' justifyContent='space-between'>
                      {isExpanded && <Heading as={'h1'} className='adm-titulo text-black negrito' textAlign={'left'}>Painel Master</Heading>}
                    </Flex>
                  </Box>
                  <Button
                    className="adm-botao-sidemenu"
                    variant="ghost"
                    width="100%"
                    onClick={toggleDashsSubmenu}
                    justifyContent="start"
                  >
                    <Flex justifyContent="space-between" width="100%" alignItems="center">
                      <Box display="flex" alignItems="center">
                        {!isExpanded ? (
                          <Tooltip label="Dashboard" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                            <span>
                              <LuLayoutDashboard />
                            </span>
                          </Tooltip>
                        ) : (
                          <>
                            <LuLayoutDashboard />
                            <Text ml="2">Dashboard</Text>
                          </>
                        )}
                      </Box>
                      {isExpanded && <RotatingIcon isActive={isDashActive} />}
                    </Flex>
                  </Button>
                  {/* Submenu para 'Dashboard' */}
                  {
                    activeSubTab === 'dash' && (
                      <VStack spacing={2} align="stretch" mt="3">
                        <Button
                          className="adm-botao-sidemenu"
                          variant="ghost"
                          width="100%"
                          justifyContent="start"
                        >
                          <Flex justifyContent="space-between" width="100%" alignItems="center">
                            <Box display="flex" alignItems="center">
                              {!isExpanded ? (
                                <Tooltip label="Dados Instagram e Facebook" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                                  <span>
                                    <FaMeta />
                                  </span>
                                </Tooltip>
                              ) : (
                                <>
                                  <FaMeta />
                                  <Text ml="2">Dados Meta</Text>
                                </>
                              )}
                            </Box>
                          </Flex>
                        </Button>

                        {/* Exportar Redirecionamentos em Excel */}
                        <Button
                          className="adm-botao-sidemenu"
                          variant="ghost"
                          width="100%"
                          justifyContent="start"
                        >
                          <Flex justifyContent="space-between" width="100%" alignItems="center">
                            <Box display="flex" alignItems="center">
                              {!isExpanded ? (
                                <Tooltip label="Dados Site" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                                  <span>
                                    <SiGoogleanalytics />
                                  </span>
                                </Tooltip>
                              ) : (
                                <>
                                  <SiGoogleanalytics />
                                  <Text ml="2">Dados Site</Text>
                                </>
                              )}
                            </Box>
                          </Flex>
                        </Button>
                      </VStack>
                    )
                  }
                </VStack>
              )
            }

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
                justifyContent="start"
              >
                <Flex justifyContent="space-between" width="100%" alignItems="center">
                  <Box display="flex" alignItems="center">
                    {!isExpanded ? (
                      <Tooltip label="Home" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'} >
                        <span>
                          <LuHome />
                        </span>
                      </Tooltip>
                    ) : (
                      <>
                        <LuHome />
                        <Text ml="2">Home</Text>
                      </>
                    )}
                  </Box>
                  {isExpanded && <RotatingIcon isActive={isHomeActive} />}
                </Flex>
              </Button>
              {/* Submenu para 'Home' */}
              {activeSubTab === 'home' && user.super_adm && (
                <VStack spacing={2} align="stretch" mt="3">
                  {user.super_adm &&
                    <Button
                      className="adm-botao-sidemenu"
                      variant="ghost"
                      width="100%"
                      onClick={() => setActiveTab(6)}
                      justifyContent="start"
                    >
                      <Flex justifyContent="space-between" width="100%" alignItems="center">
                        <Box display="flex" alignItems="center">
                          {!isExpanded ? (
                            <Tooltip label="Banner Home" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                              <span>
                                <BiCarousel />
                              </span>
                            </Tooltip>
                          ) : (
                            <>
                              <BiCarousel />
                              <Text ml="2">Banner Home</Text>
                            </>
                          )}
                        </Box>
                      </Flex>
                    </Button>
                  }
                  {user.super_adm &&
                    <Button
                      className="adm-botao-sidemenu"
                      variant="ghost"
                      width="100%"
                      onClick={() => setActiveTab(7)}
                      justifyContent="start"
                    >
                      <Flex justifyContent="space-between" width="100%" alignItems="center">
                        <Box display="flex" alignItems="center">
                          {!isExpanded ? (
                            <Tooltip label="Cards Home" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                              <span>
                                <LuHexagon />
                              </span>
                            </Tooltip>
                          ) : (
                            <>
                              <LuHexagon />
                              <Text ml="2">Cards Home</Text>
                            </>
                          )}
                        </Box>
                      </Flex>
                    </Button>
                  }
                  {user.super_adm &&
                    <Button
                      className="adm-botao-sidemenu"
                      variant="ghost"
                      width="100%"
                      onClick={() => setActiveTab(2)}
                      justifyContent="start"
                    >
                      <Flex justifyContent="space-between" width="100%" alignItems="center">
                        <Box display="flex" alignItems="center">
                          {!isExpanded ? (
                            <Tooltip label="Video Yt" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                              <span>
                                <LuYoutube />
                              </span>
                            </Tooltip>
                          ) : (
                            <>
                              <LuYoutube />
                              <Text ml="2">Video Yt</Text>
                            </>
                          )}
                        </Box>
                      </Flex>
                    </Button>
                  }

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
                    {!isExpanded ? (
                      <Tooltip label="Categorias" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                        <span>
                          <PiCardholderBold />
                        </span>
                      </Tooltip>
                    ) : (
                      <>
                        <PiCardholderBold />
                        <Text ml="2">Categorias</Text>
                      </>
                    )}
                  </Box>
                  {isExpanded && <RotatingIcon isActive={isCategoriaActive} />}
                </Flex>
              </Button>

              {/* Submenu para 'Categorias' */}
              {activeSubTab === 'categoria' && (
                <VStack spacing={2} align="stretch" mt="3">
                  <Button
                    className="adm-botao-sidemenu"
                    variant="ghost"
                    width="100%"
                    onClick={exportarCSV}
                    justifyContent="start"
                  >
                    <Flex justifyContent="space-between" width="100%" alignItems="center">
                      <Box display="flex" alignItems="center">
                        {!isExpanded ? (
                          <Tooltip label="Exportar CSV" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                            <span>
                              <BiExport />
                            </span>
                          </Tooltip>
                        ) : (
                          <>
                            <BiExport />
                            <Text ml="2">Exportar CSV</Text>
                          </>
                        )}
                      </Box>
                    </Flex>
                  </Button>
                  <Button
                    className="adm-botao-sidemenu"
                    variant="ghost"
                    width="100%"
                    onClick={exportExcel}
                    justifyContent="start"
                  >
                    <Flex justifyContent="space-between" width="100%" alignItems="center">
                      <Box display="flex" alignItems="center">
                        {!isExpanded ? (
                          <Tooltip label="Exportar em Excel" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                            <span>
                              <RiFileExcel2Line />
                            </span>
                          </Tooltip>
                        ) : (
                          <>
                            <RiFileExcel2Line />
                            <Text ml="2">Exportar XSLXl</Text>
                          </>
                        )}
                      </Box>
                    </Flex>
                  </Button>

                </VStack>
              )}
              <Button
                className="adm-botao-sidemenu"
                variant="ghost"
                width="100%"
                onClick={toggleProdutosSubmenu}
                justifyContent="start"
              >
                <Flex justifyContent="space-between" width="100%" alignItems="center">
                  <Box display="flex" alignItems="center">
                    {!isExpanded ? (
                      <Tooltip label="Produtos" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                        <span>
                          <LuShirt />
                        </span>
                      </Tooltip>
                    ) : (
                      <>
                        <LuShirt />
                        <Text ml="2">Produtos</Text>
                      </>
                    )}
                  </Box>
                  {isExpanded && <RotatingIcon isActive={isProdutoActive} />}
                </Flex>
              </Button>

              {/* Submenu para 'Produtos' */}
              {activeSubTab === 'produto' && (
                <VStack spacing={2} align="stretch" mt="3">
                  <Button
                    className="adm-botao-sidemenu"
                    variant="ghost"
                    width="100%"
                    onClick={MenuExportProdutoCSV}
                    justifyContent="start"
                  >
                    <Flex justifyContent="space-between" width="100%" alignItems="center">
                      <Box display="flex" alignItems="center">
                        {!isExpanded ? (
                          <Tooltip label="Exportar CSV" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                            <span>
                              <BiExport />
                            </span>
                          </Tooltip>
                        ) : (
                          <>
                            <BiExport />
                            <Text ml="2">Exportar CSV</Text>
                          </>
                        )}
                      </Box>
                    </Flex>
                  </Button>
                  {/*Exportar Produto em Excel*/}
                  <Button
                    className="adm-botao-sidemenu"
                    variant="ghost"
                    width="100%"
                    onClick={MenuExportProdutoExcel}
                    justifyContent="start"
                  >
                    <Flex justifyContent="space-between" width="100%" alignItems="center">
                      <Box display="flex" alignItems="center">
                        {!isExpanded ? (
                          <Tooltip label="Exportar em Excel" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                            <span>
                              <RiFileExcel2Line />
                            </span>
                          </Tooltip>
                        ) : (
                          <>
                            <RiFileExcel2Line />
                            <Text ml="2">Exportar XSLXl</Text>
                          </>
                        )}
                      </Box>
                    </Flex>
                  </Button>
                  {/*Exportar Produto em PDF*/}
                  <Button
                    className="adm-botao-sidemenu"
                    variant="ghost"
                    width="100%"
                    onClick={exportarProdutosPDF}
                    justifyContent="start"
                  >
                    <Flex justifyContent="space-between" width="100%" alignItems="center">
                      <Box display="flex" alignItems="center">
                        {!isExpanded ? (
                          <Tooltip label="Exportar em PDF" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                            <span>
                              <RiFileExcel2Line />
                            </span>
                          </Tooltip>
                        ) : (
                          <>
                            <RiFileExcel2Line />
                            <Text ml="2">Exportar PDF</Text>
                          </>
                        )}
                      </Box>
                    </Flex>
                  </Button>


                </VStack>
              )}


              <Button
                className="adm-botao-sidemenu"
                variant="ghost"
                width="100%"
                onClick={toggleFilesSubmenu}
                justifyContent="start"
              >
                <Flex justifyContent="space-between" width="100%" alignItems="center">
                  <Box display="flex" alignItems="center">
                    {!isExpanded ? (
                      <Tooltip label="Arquivos" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                        <span>
                          <LuArchive />
                        </span>
                      </Tooltip>
                    ) : (
                      <>
                        <LuArchive />
                        <Text ml="2">Arquivos</Text>
                      </>
                    )}
                  </Box>
                  {isExpanded && <RotatingIcon isActive={isFileActive} />}
                </Flex>
              </Button>

              {/* Submenu para 'Arquivos' */}
              {activeSubTab === 'arquivo' && (
                <VStack spacing={2} align="stretch" mt="3">
                  <Button
                    className="adm-botao-sidemenu"
                    variant="ghost"
                    width="100%"
                    onClick={MenuExportFileCSV}
                    justifyContent="start"
                  >
                    <Flex justifyContent="space-between" width="100%" alignItems="center">
                      <Box display="flex" alignItems="center">
                        {!isExpanded ? (
                          <Tooltip label="Exportar Arquivos CSV" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                            <span>
                              <BiExport />
                            </span>
                          </Tooltip>
                        ) : (
                          <>
                            <BiExport />
                            <Text ml="2">Exportar CSV</Text>
                          </>
                        )}
                      </Box>
                    </Flex>
                  </Button>
                  {/*Exportar Produto em Arquivos*/}
                  <Button
                    className="adm-botao-sidemenu"
                    variant="ghost"
                    width="100%"
                    onClick={MenuExportFileExcel}
                    justifyContent="start"
                  >
                    <Flex justifyContent="space-between" width="100%" alignItems="center">
                      <Box display="flex" alignItems="center">
                        {!isExpanded ? (
                          <Tooltip label="Exportar Arquivos em Excel" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                            <span>
                              <RiFileExcel2Line />
                            </span>
                          </Tooltip>
                        ) : (
                          <>
                            <RiFileExcel2Line />
                            <Text ml="2">Exportar XSLXl</Text>
                          </>
                        )}
                      </Box>
                    </Flex>
                  </Button>

                </VStack>
              )}


              {
                user.super_adm && (
                  <Button
                    className="adm-botao-sidemenu"
                    variant="ghost"
                    width="100%"
                    onClick={toggleRedirecionamentosSubmenu}
                    justifyContent="start"
                  >
                    <Flex justifyContent="space-between" width="100%" alignItems="center">
                      <Box display="flex" alignItems="center">
                        {!isExpanded ? (
                          <Tooltip label="URL's" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                            <span>
                              <LuCompass />
                            </span>
                          </Tooltip>
                        ) : (
                          <>
                            <LuCompass />
                            <Text ml="2">URL's</Text>
                          </>
                        )}
                      </Box>
                      {isExpanded && <RotatingIcon isActive={isRedirecionamentoActive} />}
                    </Flex>
                  </Button>
                )
              }

              {/* Submenu para 'Redirecionamentos' */}
              {
                activeSubTab === 'url' && (
                  <VStack spacing={2} align="stretch" mt="3">
                    <Button
                      className="adm-botao-sidemenu"
                      variant="ghost"
                      width="100%"
                      onClick={MenuExportUrlCSV}
                      justifyContent="start"
                    >
                      <Flex justifyContent="space-between" width="100%" alignItems="center">
                        <Box display="flex" alignItems="center">
                          {!isExpanded ? (
                            <Tooltip label="Exportar CSV" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                              <span>
                                <BiExport />
                              </span>
                            </Tooltip>
                          ) : (
                            <>
                              <BiExport />
                              <Text ml="2">Exportar CSV</Text>
                            </>
                          )}
                        </Box>
                      </Flex>
                    </Button>

                    {/* Exportar Redirecionamentos em Excel */}
                    <Button
                      className="adm-botao-sidemenu"
                      variant="ghost"
                      width="100%"
                      onClick={MenuExportUrlExcel}
                      justifyContent="start"
                    >
                      <Flex justifyContent="space-between" width="100%" alignItems="center">
                        <Box display="flex" alignItems="center">
                          {!isExpanded ? (
                            <Tooltip label="Exportar em Excel" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                              <span>
                                <RiFileExcel2Line />
                              </span>
                            </Tooltip>
                          ) : (
                            <>
                              <RiFileExcel2Line />
                              <Text ml="2">Exportar XSLX</Text>
                            </>
                          )}
                        </Box>
                      </Flex>
                    </Button>
                  </VStack>
                )
              }

              {user.super_adm &&
                <Button
                  className="adm-botao-sidemenu"
                  variant="ghost"
                  width="100%"
                  onClick={() => setActiveTab(5)}
                  justifyContent="start"
                >
                  <Flex justifyContent="space-between" width="100%" alignItems="center">
                    <Box display="flex" alignItems="center">
                      {!isExpanded ? (
                        <Tooltip label="Usuários" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                          <span>
                            <LuUser />
                          </span>
                        </Tooltip>
                      ) : (
                        <>
                          <LuUser />
                          <Text ml="2">Usuários</Text>
                        </>
                      )}
                    </Box>
                  </Flex>
                </Button>

              }

              {user.super_adm &&
                <Button
                  className="adm-botao-sidemenu"
                  variant="ghost"
                  width="100%"
                  onClick={() => setActiveTab(5)}
                  justifyContent="start"
                >
                  <Flex justifyContent="space-between" width="100%" alignItems="center">
                    <Box display="flex" alignItems="center">
                      {!isExpanded ? (
                        <Tooltip label="E-mails Recebidos" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                          <span>
                            <LuMailOpen />
                          </span>
                        </Tooltip>
                      ) : (
                        <>
                          <LuMailOpen />
                          <Text ml="2">E-mails Recebidos</Text>
                        </>
                      )}
                    </Box>
                  </Flex>
                </Button>

              }
            </VStack>
          </VStack>
          <Box textAlign="center" mb="10">
            <Divider my="4" />
            <Link href='/'>
              {isExpanded
                ? <Image src={LogoCinza} width={120} height={40} />
                : <Image src={LogoIcone} width={160} height={80} />
              }
            </Link>
          </Box>
        </Flex>
      </Box>
      <Drawer isOpen={openUpdate} placement="right" onClose={() => {
        setOpenUpdate(!openUpdate)
        form.resetFields(['name', 'email', 'id', 'picture'])
      }}>
        <DrawerOverlay />
        <DrawerContent bg={'white'}>
          <DrawerHeader color={'var(--black-primary)'}>Atualizar dados</DrawerHeader>
          <DrawerBody>
            <Form

              layout="vertical"
              form={form}
              onFinish={updateUser}
            >
              <Form.Item label='Nome' rules={[{ required: true, message: 'Campo obrigatório' }]} name="name">
                <Input />
              </Form.Item>
              <Form.Item label='Email' rules={[{ required: true, message: 'Campo obrigatório' }]} name="email">
                <Input type='email'/>
              </Form.Item>
              <Form.Item label='Foto'  name="picture">
                <InputsHome
                  name=''
                  question='Não tem limite para adicionar fotos e videos, porém recomendamos comprimir em alta as fotos para reduzir o tempo de carregamento da página. Coloque na ordem que deve aparecer na página do produto.'
                  typeInput='fileSingle'
                  getUrls={(value: any) => form.setFieldValue('picture', value)}
                />
              </Form.Item>
              <Form.Item label='id' rules={[{ required: true, message: 'Campo obrigatório' }]} name="id" style={{opacity: 0}}>
                <Input  disabled={true}/>
              </Form.Item>
              <Button type='submit' style={{width: '100%'}}>
                Atualizar
              </Button>
            </Form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

    </Flex>
  );
};

export default SideMenu;

function setIsProdutoActive(arg0: boolean) {
  throw new Error('Function not implemented.');
}
