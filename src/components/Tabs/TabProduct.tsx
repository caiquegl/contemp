import {
  Box,
  HStack,
  Icon,
  Flex,
  Button,
  useToast,
  Link as ChakraLink,
  Text,
  Heading,
  Tooltip,
  Stack,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Menu as ChakraMenu, MenuItem as ChakraMenuItem, MenuButton as ChakraMenuButton, MenuList as ChakraMenuList
} from '@chakra-ui/react';

import { useEffect, useState, useRef } from 'react'
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai'
import ContainerAddProduct from '../ContainerAddProduct'
import ContainerAddProductDescription from '../ContainerAddProductDescription'
import { Table, Select, Checkbox, Dropdown, Menu, Row, Col } from 'antd'
import { SearchBar } from '../SearchBar'
import { colors } from '../../styles/theme'
import { pxToRem } from '../../utils/pxToRem'
import { replaceNameToUrl } from '../../utils/replaceNameToUrl'
import { api } from '../../lib/axios'
import { EditOrderTabProduct } from '../EditOrderTabProduct'
import StaticsProducts from '../StaticsProducts'
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { FiCopy } from 'react-icons/fi'
import { PiInfoDuotone } from "react-icons/pi";
import { PiPencilSimpleBold } from "react-icons/pi"
import { FaAngleDown, FaStar } from "react-icons/fa";
import { FaDeleteLeft, FaCheck } from 'react-icons/fa6'
import { CheckboxOptionType } from 'antd/lib/checkbox/Group';  // Adicionada a importação aqui
import toggleDestaqueProduct from '../../pages/api/toggleDestaqueProduct';
import saveAs from 'file-saver';
import ExcelJS from 'exceljs';
//import jsPDF from 'jspdf';
//import 'jspdf-autotable';
import { DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';



const { SubMenu } = Menu;
const CheckboxGroup = Checkbox.Group;

interface IProps {
  back: any;
}

const TabProduct = ({ back }: IProps) => {
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  });

  const [quantidadeProdutos, setQuantidadeProdutos] = useState<number>(0);
  const [quantidadeProdutosDestacados, setQuantidadeProdutosDestacados] = useState<number>(0);


  function copiarTexto(texto: string) {
    var input = document.createElement('input');
    input.value = texto;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    toast({
      title: 'Copiado',
      description: 'Link copiado com sucesso.',
      status: 'info',
    });
  }

  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState(1);
  const [list, setList] = useState<any>([]);
  const [listClone, setListClone] = useState<any>([]);
  const [body, setBody] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  const changerOrder = async (order: number, category: any) => {
    try {
      setLoading(true);
      const { data, status } = await api.put(`changeOrderProduct`, {
        order,
        product: category,
      });

      toast({
        title: status === 201 ? 'Sucesso' : 'Erro',
        description: data.msg,
        status: status === 201 ? 'success' : 'error',
      });
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao alterar ordem',
        status: 'error',
      });
    } finally {
      setLoading(false);
      await listProduct();
    }
  };

  const column = [
    {
      title: 'Ordem',
      width: 100,
      sorter: (a: any, b: any) => a.order - b.order,
      render: (a: any) => <EditOrderTabProduct value={a} changerOrder={changerOrder} />,
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'Categoria',
      dataIndex: 'category.name',
      key: 'category',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: any) => {
        const uniqueCategories = [...new Set(list.map((item: any) => item.category.name))];

        const menu = (
          <Menu mode='vertical' style={{ maxWidth: '300px', width: '100%', borderRadius: '8px!important', padding: '3%', minHeight: '400px', }}>
            <Heading as={'h4'} fontSize={'1rem'} mb={'3%'}>Categorias</Heading>
            <Checkbox key="all"
              style={{ marginBottom: '2%', }}
              indeterminate={selectedKeys.length > 0 && selectedKeys.length < uniqueCategories.length}
              checked={selectedKeys.length === uniqueCategories.length}
              onChange={() => {
                const newSelectedKeys = selectedKeys.length === uniqueCategories.length ? [] : uniqueCategories;
                setSelectedKeys(newSelectedKeys);
                confirm();
              }}
            >
              Todas as Categorias
            </Checkbox>
            <Menu.Divider />
            <Box>
              <CheckboxGroup
                style={{ marginTop: '3%', }}
                options={(uniqueCategories.map((category) => ({
                  label: category,
                  value: category,
                })) as CheckboxOptionType[])}
                value={selectedKeys}
                onChange={(values) => {
                  setSelectedKeys(values as string[]);
                  confirm();
                }}
              />
            </Box>
          </Menu>
        );

        return menu;
      },
      onFilter: (value: any, record: any) =>
        record.category.name.toLowerCase().includes(value.toLowerCase()),
      render: (text: any, record: any) => <p>{record.category.name}</p>,
      sorter: (a: any, b: any) => a.category.name.localeCompare(b.category.name),
    },
    {
      title: 'Criado em',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (a: any) => moment(a).format('DD/MM/YYYY'),
      sorter: (a: any, b: any) => moment(a.created_at).unix() - moment(b.created_at).unix(),
    },
    {
      title: 'Atualizado em',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (a: any) => moment(a).format('DD/MM/YYYY'),
      sorter: (a: any, b: any) => moment(a.updated_at).unix() - moment(b.updated_at).unix(),
    },
    {
      title: (
        <Tooltip
          placement="top"
          label="Destaque"
          color={'var(--white-primary)'}
          bg={'var(--red-primary)'}
          borderRadius={'8px'}
          textAlign={'center'}
        >
          <Box>
            <Icon as={FaStar} fontSize="1.25rem" color="var(--gray-text)" />
          </Box>
        </Tooltip>
      ),
      dataIndex: 'destaque',
      key: 'destaque',
      sorter: (a: any, b: any) => a.destaque - b.destaque,
      render: (destaque: boolean, product: any) => (
        <IconButton
          aria-label='Alternar Destaque'
          icon={<FaStar />}
          color={destaque ? 'yellow.400' : 'gray.400'}
          onClick={() => toggleDestaque(product.id, destaque)}
        />

      ),
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
      render: (a: any, b: any) => (
        <Button
          as={ChakraLink}
          className='botao-tabelaprodutos'
          href={b.name ? `/produto/${replaceNameToUrl(b.name).toLowerCase().replaceAll(' ', '_')}` : ''}
          isExternal={true}
          _hover={{ color: 'black', textDecoration: 'none' }}
          rightIcon={<Icon as={ExternalLinkIcon} />}
        >
          {`url`}
        </Button>
      ),
    },
    {
      title: 'Ações',
      render: (a: any, b: any) => (
        <HStack spacing='20px'>
          <Tooltip
            placement='top'
            label='Editar Produto'
            color={'var(--white-primary)'}
            bg={'var(--red-primary)'}
            borderRadius={'8px'}
            textAlign={'center'}
            hasArrow
          >
            <Box>
              <Icon
                cursor='pointer'
                as={PiPencilSimpleBold}
                fontSize='1.15rem'
                color='var(--gray-text)'
                onClick={() => {
                  setBody(a);
                  setIsUpdate(true);
                  setStep(2);
                }}
              />
            </Box>
          </Tooltip>
          <Tooltip
            placement='top'
            label='Copiar'
            color={'var(--white-primary)'}
            bg={'var(--red-primary)'}
            borderRadius={'8px'}
            textAlign={'center'}
            hasArrow
          >
            <Box>
              <FiCopy
                style={{
                  cursor: 'pointer',
                  color: 'var(--gray-text)',
                }}
                onClick={() =>
                  copiarTexto(
                    `https://contemp.com.br${b && b.name ? `/produto/${replaceNameToUrl(b.name).toLowerCase().replaceAll(' ', '_')}` : ''}`
                  )
                }
              />
            </Box>
          </Tooltip>
          <Tooltip
            placement='top'
            label='Excluir Produto'
            color={'var(--white-primary)'}
            bg={'var(--red-primary)'}
            borderRadius={'8px'}
            textAlign={'center'}
            hasArrow
          >
            <Box>
              <Icon cursor='pointer' as={FaDeleteLeft} fontSize='1.15rem' color='var(--gray-text)' onClick={() => openDeleteAlert(a)} />
            </Box>
          </Tooltip>
        </HStack>
      ),
    },
  ];

  const listProduct = async () => {
    try {
      const { data } = await api.get('getAllProductsWidthCategory');
      setList(data);
      setListClone(data);
      setQuantidadeProdutos(data.length);
      if (data) { // Verificar se data está definido antes de acessá-lo
        const quantidadeDestacados = data.filter((product: any) => product.destaque).length;
        setQuantidadeProdutosDestacados(quantidadeDestacados);
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao listar produtos',
        status: 'error',
      });
    }
  };

  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [productToDelete, setProductToDelete] = useState<any>(null);

  const openDeleteAlert = (product: any) => {
    setProductToDelete(product);
    setDeleteAlertOpen(true);
  };

  const closeDeleteAlert = () => {
    setDeleteAlertOpen(false);
    setProductToDelete(null);
  };

  const deleteProduct = async (product: any) => {
    try {
      const { data, status } = await api.post(`deleteProduct`, product);
      toast({
        title: status === 201 ? 'Sucesso' : 'Erro',
        description: data.msg,
        status: status === 201 ? 'success' : 'error',
      });
      listProduct();
      closeDeleteAlert(); // Fechar o alerta após a exclusão
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao deletar produto',
        status: 'error',
      });
    }
  };

  useEffect(() => {
    listProduct();
  }, []);

  const backTab = () => {
    setBody({});
    setStep(1);
  };

  useEffect(() => {
    backTab();
  }, [back]);

  const handleExportCSV = () => {
    // Crie uma string CSV a partir dos dados da lista de produtos
    const csvContent = [
      'Ordem, Nome, Categoria, Criado em, Atualizado em, Destaque, Url', // Updated header
      ...list.map((product: any) => `${product.order},${product.name},${product.category.name},${moment(product.created_at).format('DD/MM/YYYY H:mm:s')},${moment(product.updated_at).format('DD/MM/YYYY H:mm:s')},${product.destaque ? 'Destaque' : 'Não Destaque'},https://contemp.com.br/produto/${replaceNameToUrl(product.name).toLowerCase().replaceAll(' ', '_')}`),
    ].join('\n');

    // Converta a string CSV em um Blob
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

    // Use a biblioteca file-saver para salvar o Blob como um arquivo
    saveAs(blob, 'products_export.csv');
  };

  const handleExportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Produtos');

    // Adicione cabeçalhos, incluindo os novos campos 'Criado em' e 'Atualizado em'
    sheet.addRow(['Ordem', 'Nome', 'Categoria', 'Criado em', 'Atualizado em', 'Destaque', 'URL']);

    // Adicione dados, incluindo os novos campos 'Criado em' e 'Atualizado em'
    list.forEach((product: any) => {
      sheet.addRow([product.order, product.name, product.category.name, moment(product.created_at).format('DD/MM/YYYY H:mm:s'), moment(product.updated_at).format('DD/MM/YYYY H:mm:s'), product.destaque ? 'Destaque' : 'Não Destaque', `https://contemp.com.br/produto/${replaceNameToUrl(product.name).toLowerCase().replaceAll(' ', '_')}`]);
    });

    // Crie um Blob a partir do workbook
    const blob = await workbook.xlsx.writeBuffer();

    // Use a biblioteca file-saver para salvar o Blob como um arquivo Excel
    saveAs(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'products_export.xlsx');
  };



  {/*} const handleExportPDF = () => {
      const pdf = new jsPDF();
      
      // Adiciona o conteúdo da tabela no PDF
      const columns = ['Ordem', 'Nome', 'Categoria', 'Url'];
      const data = list.map(product => [product.order, product.name, product.category.name, `https://contemp.com.br/produto/${replaceNameToUrl(product.name).toLowerCase().replaceAll(' ', '_')}`]);
    
      pdf.autoTable({
        head: [columns],
        body: data,
        theme: 'grid',
        styles: { cellPadding: 2, fontSize: 10 },
        margin: { top: 20 },
        columnStyles: {
          0: { cellWidth: 15 },
          1: { cellWidth: 40 },
          2: { cellWidth: 40 },
          3: { cellWidth: 80 },
        },
        bodyStyles: { minCellHeight: 10 },
        startY: pdf.autoTable.previous.finalY + 10,
        pageBreak: 'auto',
        orientation: 'landscape',
        headStyles: { fillColor: [182, 0, 5], textColor: [255, 255, 255] },
        didDrawPage: (data) => {
          const pageCount = pdf.internal.getNumberOfPages();
          pdf.text(`Página ${data.pageNumber} de ${pageCount}`, data.settings.margin.left, pdf.internal.pageSize.height - 10);
        },
      });
      
      // Adiciona informações no rodapé
      const date = new Date();
      const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      const timeString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      const user = 'Nome do Usuário'; // Substitua pelo nome do usuário real
    
      const footerData = [
        ['Usuário:', user],
        ['Data:', dateString],
        ['Hora:', timeString],
      ];
    
      // Adiciona a tabela do rodapé ao PDF
      pdf.autoTable({
        startY: pdf.internal.pageSize.height - 20,
        head: [],
        body: footerData,
        theme: 'grid',
        didDrawPage: (data) => {
          const pageCount = pdf.internal.getNumberOfPages();
          pdf.text(`Página ${data.pageNumber} de ${pageCount}`, data.settings.margin.left, pdf.internal.pageSize.height - 10);
        },
      });
    
      // Salva o arquivo PDF
      pdf.save('produtos-contemp.pdf');
    };*/}

  const toggleDestaque = async (productId: number, currentDestaque: boolean) => {
    try {
      // Use a função fetch para chamar sua API
      const response = await fetch('/api/toggleDestaqueProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, destaque: currentDestaque }),
      });

      const data = await response.json();

      toast({
        title: 'Sucesso',
        description: data.msg,
        status: 'success',
      });
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao alterar destaque',
        status: 'error',
      });
    } finally {
      setLoading(false);
      await listProduct();
    }
  };



  return (
    <>
      {step === 1 && (
        <>
          <Box>
            <Heading as={'h3'} className='adm-subtitulo text-black negrito'>
              Painel de Produtos
            </Heading>
            <Text className='paragrafo-preto' mb={'3%'}>
              Gerencie todos os produtos da Contemp de forma prática. Adicione, edite, ative, desative, pesquise ou exclua através do painel. Atenção! Ao excluir um produto não será possível recupera-lo.
            </Text>
            <StaticsProducts quantidadeProdutos={quantidadeProdutos} quantidadeProdutosDestaque={quantidadeProdutosDestacados} />
          </Box>
          <Flex w='100%' alignItems='center' justifyContent='space-between' mb='18px'>

            <Button
              bg='var(--red-primary)'
              color='var(--white-primary)'
              borderRadius='8px'
              w='128px'
              h='40px'
              _hover={{ transition: 'all 0.4s' }}
              onClick={() => {
                setStep(2);
                setIsUpdate(false);
              }}
            >
              Adicionar
            </Button>
            <Stack direction='row' spacing={6}>
              <ChakraMenu>
                <ChakraMenuButton
                  as={Button}
                  bg='var(--red-primary)'
                  color='var(--white-primary)'
                  borderRadius='8px'
                  w='280px'
                  h='40px'
                  rightIcon={<FaAngleDown />}
                  _hover={{ transition: 'all 0.4s' }}
                  _focus={{ backgroundColor: 'var(--red-primary)!important', }}
                >
                  Exportar Produtos
                </ChakraMenuButton>
                <ChakraMenuList color={'#242424'}>
                  <ChakraMenuItem onClick={() => handleExportCSV()}>
                    Exportar em CSV
                  </ChakraMenuItem>
                  <ChakraMenuItem onClick={() => handleExportExcel()}>
                    Exportar em XSLX
                  </ChakraMenuItem>
                </ChakraMenuList>
              </ChakraMenu>


              <SearchBar
                inputProps={{
                  placeholder: 'Digite o produto...',
                  onChange: (evt) => {
                    let newList = listClone.filter((item: any) => item.name.toLowerCase().includes(evt.target.value.toLowerCase()));
                    setList([...newList]);
                  },
                  _placeholder: {
                    color: 'black.800',
                    opacity: '50%',
                  },
                }}
                containerProps={{
                  bg: 'white.500',
                  border: '1px solid',
                  borderColor: 'black.800',
                  color: colors.black[800],
                  maxW: pxToRem(288),
                }}
              />
            </Stack>
          </Flex>

          <Box borderRadius='8px' bg='white' p='30px' w='100%'>
            <Table id='tabela-produtos' loading={loading} scroll={{ x: 'fit-content' }} dataSource={list} columns={column} word-wrap={'break-word'} />
          </Box>
        </>
      )}
      {step === 2 && (
        <>
          <Flex w='100%' alignItems='center' justifyContent='space-between' mb='18px'>
            <Button
              bg='transparent'
              color='black.800'
              fontSize='20px'
              borderRadius='4px'
              w='128px'
              h='47px'
              border='2px solid'
              borderColor='black.800'
              _hover={{ transition: 'all 0.4s' }}
              onClick={() => {
                setBody({});
                setStep(1);
              }}
            >
              Voltar
            </Button>
          </Flex>
          <ContainerAddProduct
            defaultValues={body}
            nextStep={(data: any) => {
              setBody({ ...body, ...data });
              setStep(3);
            }}
          />
        </>
      )}
      {step === 3 && (
        <>
          <Flex w='100%' alignItems='center' justifyContent='space-between' mb='18px'>
            <Button
              bg='transparent'
              color='black.800'
              fontSize='20px'
              borderRadius='4px'
              w='128px'
              h='47px'
              border='2px solid'
              borderColor='black.800'
              _hover={{ transition: 'all 0.4s' }}
              onClick={() => setStep(2)}
            >
              Voltar
            </Button>
          </Flex>
          <ContainerAddProductDescription
            values={body}
            isUpdate={isUpdate}
            reset={() => {
              setStep(1);
              listProduct();
              setIsUpdate(false);
              setBody({});
            }}
          />
        </>
      )}

      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeDeleteAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent p={'1%'} backgroundColor={'var(--white-primary)'}>
            <AlertDialogHeader className='paragrafo-preto text-black negrito' fontSize="1.15rem" textTransform={'uppercase'} mb={'0'}>
              Confirmar exclusão
            </AlertDialogHeader>

            <AlertDialogBody className='paragrafo-preto text-black'>
              Tem certeza de que deseja excluir este produto? Esta ação não pode ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button className='botao-preto-outline' mr={'2%'} ref={cancelRef} onClick={closeDeleteAlert}>
                Cancelar
              </Button>
              <Button className='botao-vermelho' colorScheme="red" onClick={() => deleteProduct(productToDelete)}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default TabProduct;
