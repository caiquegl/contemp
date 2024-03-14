import React, { useEffect, useState } from 'react'
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
  FormControl,
  Badge,
  Checkbox,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react'
import { Table, Space, message, Modal, Form, Input, Button as BtnAtd, Avatar, Select } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { SearchBar } from '../SearchBar'
import { colors } from '../../styles/theme'
import { pxToRem } from '../../utils/pxToRem'
import { api } from '../../lib/axios'
import { useRouter } from 'next/router'
import * as path from 'path'
import moment from 'moment';
import { PiPencilSimpleBold } from 'react-icons/pi'
import { IoPersonRemoveOutline, IoPersonAddOutline, IoAlert } from "react-icons/io5";
import { FaAngleDown, FaStar } from 'react-icons/fa'
import { FaDeleteLeft, FaTrash } from 'react-icons/fa6'
import InputsHome from '../ContainerHome/inputs'
import { ViewImage } from '../ContainerAddProduct/ViewImage'
import { CgScreen } from "react-icons/cg";
import { EditOrder } from '../EditOrder'
import { replaceNameToUrl } from '../../utils/replaceNameToUrl'

const { Item } = Form
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { FiCopy } from 'react-icons/fi'
import { url } from 'inspector'


const redirectsPath = path.resolve(__dirname, '../../next.config.js') // ajuste o caminho conforme necessário

const TabEmails: React.FC = () => {
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  })
  const router = useRouter()
  const [listClone, setListClone] = useState<any[]>([])
  const [redirects, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [selectItem, setSelectItem] = useState<any>({})
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [modalVisibleCreate, setModalVisibleCreate] = useState<boolean>(false)


  const [form] = Form.useForm()

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.post('/getAllManuais');
      const redirectsData = response.data;
      setListClone(redirectsData); // Defina listClone ao buscar redirecionamentos
      setUsers(redirectsData);
    } catch (error) {
      console.error(error);
      message.error('Erro ao obter Manuais');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const deleteEmail = async (id: number) => {
    try {
      setLoading(true)
      const { data } = await api.post(`deleteEmail`, {
        id,
      })

      toast({
        title: 'Sucesso',
        description: 'Sucesso ao deletar manual',
        status: 'success',
      })
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao deletar manual',
        status: 'error',
      })
    } finally {
      setLoading(false)
      await fetchData()
    }
  }

  function copiarEmail(texto: string) {
    // Cria um elemento de input dinamicamente
    var input = document.createElement('input')

    // Define o valor do input como o texto a ser copiado
    input.value = texto

    // Adiciona o input ao documento
    document.body.appendChild(input)

    // Seleciona o conteúdo do input
    input.select()

    // Copia o conteúdo selecionado para a área de transferência
    document.execCommand('copy')

    // Remove o input do documento
    document.body.removeChild(input)
    toast({
      title: 'Copiado',
      description: 'Link copiado com sucesso.',
      status: 'info',
    })
  }

  const columns = [
    {
      title: 'ID',
      width: '8%',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.order - b.order,
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      width: '300px',
    },
    {
      title: 'E-mail',
      dataIndex: 'url',
      key: 'url',
      width: '380px',
      //sorter: '()',
      render: (a: any, b: any) => (
        <Button
          as={ChakraLink}
          className='botao-tabelaprodutos'
          fontWeight={'400'}
          href={b.url}
          isExternal={true}
          _hover={{ color: 'black', textDecoration: 'none' }}
          rightIcon={<Icon as={ExternalLinkIcon} />}
        >
          {`Abrir`}
        </Button>
      ),
    },

    {
      title: 'Recebido em',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (a: any) => moment(a).format('DD/MM/YYYY'),
      sorter: (a: any, b: any) => moment(a.created_at).unix() - moment(b.created_at).unix(),
      width: 140,
    },
    {
      title: 'Reenviado em',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (a: any) => moment(a).format('DD/MM/YYYY'),
      sorter: (a: any, b: any) => moment(a.updated_at).unix() - moment(b.updated_at).unix(),
      width: 140,
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (text: any, email: any) => (
        <HStack spacing='20px'>
          <Tooltip placement='top' title='Copiar'
                   color={'var(--red-primary)'}>
            <FiCopy
              style={{
                cursor: 'pointer',
              }}
              onClick={() => copiarEmail(email.url)}
            />
          </Tooltip>
          <Tooltip
            placement='top'
            label='Editar manual'
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
                  setSelectItem(email)
                  form.setFieldValue('url', email.url)
                  form.setFieldValue('picture', email.picture)
                  form.setFieldValue('name', email.name)
                  setModalVisible(true)
                }}
              />
            </Box>
          </Tooltip>

          <Tooltip
            placement='top'
            label="Deletar manual"
            color={'var(--white-primary)'}
            bg={'var(--red-primary)'}
            borderRadius={'8px'}
            textAlign={'center'}
            hasArrow
          >
            <Box>
              <Icon
                cursor='pointer'
                as={FaTrash}
                fontSize='1.15rem'
                color='var(--gray-text)'
                onClick={() => deleteEmail(email.id)}
              />
            </Box>
          </Tooltip>
        </HStack>
      ),
    },
  ]

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10, // Número padrão de itens por página
  })

  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
    })
  }

  return (
    <>
      <Box w={'60%'}>
        <Heading as={'h3'} className='adm-subtitulo text-black negrito'>
          E-mails Recebidos
        </Heading>
        <Text className='paragrafo-preto' mb={'3%'} mr={'5%'}>
          Gerencie os e-mails rececibos no site.
        </Text>
      </Box>
      <Flex w='100%' alignItems='center' justifyContent='space-between' mb='18px'>
        <SearchBar
        inputProps={{
          placeholder: 'Digite o id, nome ou e-mail...',
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
          marginLeft: 'auto',
        }}
        >
          
        </SearchBar>
      </Flex>
      <Table
        id='tabela-manuais'
        columns={columns}
        dataSource={redirects}
        loading={loading}
        scroll={{ x: 'fit-content' }}
        word-wrap={'break-word'}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showQuickJumper: false,
          pageSizeOptions: ['10', '20', '50', '100'], // Opções de quantidade de itens por página
          onShowSizeChange: (current: number, pageSize: number) => {
            setPagination({
              ...pagination,
              current,
              pageSize,
            })
          },
        }}
        onChange={handleTableChange}
      />
    </>
  )
}

export default TabEmails
