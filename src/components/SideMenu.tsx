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
} from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useRef, useState, useContext } from 'react';
import Logo from '../assets/icons/Logo-Contemp.svg';
import LogoCinza from '../assets/icons/Logo-Contemp-Cinza.svg';
import LogoIcone from '../assets/icons/Logo-Contemp-Icone.svg';
import { AiOutlineHistory } from 'react-icons/ai';
import { DownloadOutlined } from '@ant-design/icons';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BsArchive } from "react-icons/bs";
import { BiExport, BiCarousel } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { FiCompass, FiHexagon } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import React from 'react';
import { api } from '../lib/axios'
import { replaceNameToUrl } from '../utils/replaceNameToUrl'
import InputsHome from './ContainerHome/inputs'
import moment from 'moment';
import saveAs from 'file-saver';
import ExcelJS from 'exceljs';
import { FaCaretDown, FaCaretUp, FaRegUserCircle, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { PiCardholderDuotone } from "react-icons/pi";
import { RiFileExcel2Line, RiCloseCircleLine } from "react-icons/ri";

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


const SideMenu: React.FC<SideMenuProps> = ({ user, date, handleExportCSV, setActiveTab, onOpen, onToggleMenu }) => {

  const [activeSubTab, setActiveSubTab] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isHomeActive, setIsHomeActive] = useState(false);
  const [isCategoriaActive, setIsCategoriaActive] = useState(false);
  const [isProdutoActive, setIsProdutoActive] = useState(false);
  const [isRedirecionamentoActive, setIsRedirecionamentoActive] = useState(false);
  const [isFileActive, setIsFileActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

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
          product.layout,
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

      <Box bg="#fff" width={isExpanded ? "250px" : "80px"} height="100vh" overflowY="auto" position="fixed" zIndex="sticky" boxShadow={'8px 0px 63px -9px rgba(0,0,0,0.1)'}>
        <Flex direction="column" height="100%" p="3">
          <VStack w={'100%'} flex="1" spacing={4}>
            <Flex align="center" mb="0" justifyContent='space-between'>
              <Avatar src={user.photo} name={user.name} bg='white' color='black.800' />
              <VStack flex="1" ml="3" align="start" spacing="0">
                {isExpanded && <Text color="#212121" fontSize="md" fontWeight="bold" noOfLines={1}> {user.name} </Text>}
                {isExpanded && <Text color="#212121" fontSize="sm" noOfLines={1}> {date} </Text>}
              </VStack>
              {isExpanded && <IconButton
                aria-label="EditarMeuPerfil"
                id='EditarMeuPerfil'
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
                justifyContent="start"
              >
                <Flex justifyContent="space-between" width="100%" alignItems="center">
                  <Box display="flex" alignItems="center">
                    {!isExpanded ? (
                      <Tooltip label="Home" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'} >
                        <span>
                          <GoHome />
                        </span>
                      </Tooltip>
                    ) : (
                      <>
                        <GoHome />
                        <Text ml="2">Home</Text>
                      </>
                    )}
                  </Box>
                  {isHomeActive ? <FaCaretUp /> : <FaCaretDown />}
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
                      onClick={() => setActiveTab(2)}
                      justifyContent="start"
                    >
                      <Flex justifyContent="space-between" width="100%" alignItems="center">
                        <Box display="flex" alignItems="center">
                          {!isExpanded ? (
                            <Tooltip label="Cards Home" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                              <span>
                                <FiHexagon />
                              </span>
                            </Tooltip>
                          ) : (
                            <>
                              <FiHexagon />
                              <Text ml="2">Cards Home</Text>
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
                          <PiCardholderDuotone />
                        </span>
                      </Tooltip>
                    ) : (
                      <>
                        <PiCardholderDuotone />
                        <Text ml="2">Categorias</Text>
                      </>
                    )}
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
                    onClick={exportarCSV}
                    justifyContent="start"
                  >
                    <Flex justifyContent="space-between" width="100%" alignItems="center">
                      <Box display="flex" alignItems="center">
                        {!isExpanded ? (
                          <Tooltip label="Exportar CSV" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                            <span>
                              <RiFileExcel2Line />
                            </span>
                          </Tooltip>
                        ) : (
                          <>
                            <RiFileExcel2Line />
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
                          <MdOutlineProductionQuantityLimits />
                        </span>
                      </Tooltip>
                    ) : (
                      <>
                        <MdOutlineProductionQuantityLimits />
                        <Text ml="2">Produtos</Text>
                      </>
                    )}
                  </Box>
                  {isProdutoActive ? <FaCaretUp /> : <FaCaretDown />}
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
                              <RiFileExcel2Line />
                            </span>
                          </Tooltip>
                        ) : (
                          <>
                            <RiFileExcel2Line />
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
                          <BsArchive />
                        </span>
                      </Tooltip>
                    ) : (
                      <>
                        <BsArchive />
                        <Text ml="2">Arquivos</Text>
                      </>
                    )}
                  </Box>
                  {isFileActive ? <FaCaretUp /> : <FaCaretDown />}
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
                              <RiFileExcel2Line />
                            </span>
                          </Tooltip>
                        ) : (
                          <>
                            <RiFileExcel2Line />
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
                              <FiCompass />
                            </span>
                          </Tooltip>
                        ) : (
                          <>
                            <FiCompass />
                            <Text ml="2">URL's</Text>
                          </>
                        )}
                      </Box>
                      {isRedirecionamentoActive ? <FaCaretUp /> : <FaCaretDown />}
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
                                <RiFileExcel2Line />
                              </span>
                            </Tooltip>
                          ) : (
                            <>
                              <RiFileExcel2Line />
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
                            <FaRegUserCircle />
                          </span>
                        </Tooltip>
                      ) : (
                        <>
                          <FaRegUserCircle />
                          <Text ml="2">Usuários</Text>
                        </>
                      )}
                    </Box>
                  </Flex>
                </Button>

              }
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
                <Flex justifyContent="space-between" width="100%" alignItems="center">
                  <Box display="flex" alignItems="center">
                    {!isExpanded ? (
                      <Tooltip label="Baixar Logs" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                        <span>
                          <DownloadOutlined />
                        </span>
                      </Tooltip>
                    ) : (
                      <>
                        <DownloadOutlined />
                        <Text ml="2">Baixar Logs</Text>
                      </>
                    )}
                  </Box>
                </Flex>
              </Button>

              <Button
                className="adm-botao-sidemenu"
                variant="ghost"
                width="100%"
                onClick={onOpen}
                justifyContent="start"
              >
                <Flex justifyContent="space-between" width="100%" alignItems="center">
                  <Box display="flex" alignItems="center">
                    {!isExpanded ? (
                      <Tooltip label="Ver Logs" placement="right" hasArrow borderRadius={'8px'} backgroundColor={'var(--chakra-colors-red-600)'}>
                        <span>
                          <AiOutlineHistory />
                        </span>
                      </Tooltip>
                    ) : (
                      <>
                        <AiOutlineHistory />
                        <Text ml="2">Ver Logs</Text>
                      </>
                    )}
                  </Box>
                </Flex>
              </Button>

            </Stack>
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
    </Flex>
  );
};

export default SideMenu;

function setIsProdutoActive(arg0: boolean) {
  throw new Error('Function not implemented.');
}
