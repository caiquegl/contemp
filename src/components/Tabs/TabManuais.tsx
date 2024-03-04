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


const redirectsPath = path.resolve(__dirname, '../../next.config.js') // ajuste o caminho conforme necessário

const TabManuais: React.FC = () => {
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

  const changerOrder = async (order: number, manual: any) => {
    try {
      setLoading(true)
      const { data, status } = await api.put(`changeOrderManual`, {
        order,
        manual: manual,
      })

      toast({
        title: status == 201 ? 'Sucesso' : 'Erro',
        description: data.msg,
        status: status == 201 ? 'success' : 'error',
      })
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao alterar ordem',
        status: 'error',
      })
    } finally {
      setLoading(false)
      await fetchData()
    }
  }

  const changeActiveManual = async (id: number, status: any) => {
    try {
      setLoading(true)
      const { data } = await api.put(`changeActiveManual`, {
        id,
        status,
      })

      toast({
        title: 'Sucesso',
        description: 'Sucesso ao atualizar manual',
        status: 'success',
      })
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao alterar ordem',
        status: 'error',
      })
    } finally {
      setLoading(false)
      await fetchData()
    }
  }

  const deleteManual = async (id: number) => {
    try {
      setLoading(true)
      const { data } = await api.post(`deleteManual`, {
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

  function copiarTexto(texto: string) {
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
      title: 'Ordem Geral',
      width: '11%',
      sorter: (a: any, b: any) => a.order - b.order,
      render: (a: any) => <EditOrder value={a} changerOrder={changerOrder} />,
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      width: '400px',
    },
    {
      title: 'Ativo',
      dataIndex: 'isActive',
      key: 'status',
      render: (isActive: boolean) => (
        <Badge
          colorScheme={isActive ? 'green' : 'red'}
          borderRadius={'8px'}
        >
          {isActive ? 'Ativo' : 'Inativo'}
        </Badge>
      ),
      sorter: (a: any, b: any) => {
        const statusA = a.isActive ? 'Ativo' : 'Inativo';
        const statusB = b.isActive ? 'Ativo' : 'Inativo';
        return statusA.localeCompare(statusB);
      },
      width: 120,
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
      //sorter: '()',
      render: (a: any, b: any) => (
        <Button
          as={ChakraLink}
          className='botao-tabelaprodutos'
          fontWeight={'400'}
          href={b.name ? `/api/manuais/${replaceNameToUrl(b.name).toLowerCase().replaceAll(' ', '_')}` : ''}
          isExternal={true}
          _hover={{ color: 'black', textDecoration: 'none' }}
          rightIcon={<Icon as={ExternalLinkIcon} />}
        >
          {`Abrir`}
        </Button>
      ),
      width: 110,
    },

    {
      title: 'Adicionado em',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (a: any) => moment(a).format('DD/MM/YYYY'),
      sorter: (a: any, b: any) => moment(a.created_at).unix() - moment(b.created_at).unix(),
      width: 140,
    },
    {
      title: 'Atualizado em',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (a: any) => moment(a).format('DD/MM/YYYY'),
      sorter: (a: any, b: any) => moment(a.updated_at).unix() - moment(b.updated_at).unix(),
      width: 140,
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (text: any, manual: any) => (
        <HStack spacing='20px'>
          <Tooltip placement='top' title='Copiar'
                   color={'var(--red-primary)'}>
            <FiCopy
              style={{
                cursor: 'pointer',
              }}
              onClick={() => copiarTexto(manual.url)}
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
                  setSelectItem(manual)
                  form.setFieldValue('url', manual.url)
                  form.setFieldValue('picture', manual.picture)
                  form.setFieldValue('name', manual.name)
                  setModalVisible(true)
                }}
              />
            </Box>
          </Tooltip>

          <Tooltip
            placement='top'
            label={`${manual.status ? 'Inativar' : 'Ativar'} manual`}
            color={'var(--white-primary)'}
            bg={'var(--red-primary)'}
            borderRadius={'8px'}
            textAlign={'center'}
            hasArrow
          >
            <Box>
              <Icon
                cursor='pointer'
                as={FaDeleteLeft}
                fontSize='1.15rem'
                color='var(--gray-text)'
                onClick={() => changeActiveManual(manual.id, !manual.status)}
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
                onClick={() => deleteManual(manual.id)}
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

  const createManual = async (manual: any) => {
    try {

      setLoading(true)
      await api.post(`createManual`, manual)
      message.success('Sucesso ao criar manual')
      fetchData()
      setModalVisibleCreate(false)
      setSelectItem(null)
      form.resetFields(['url', 'picture', 'name'])
    } catch (error) {
      message.error('Erro ao criar manual')
    } finally {
      setLoading(false)
    }
  }

  const updateManual = async (manual: any) => {
    try {

      setLoading(true)
      await api.post(`updateManual`, { ...manual, id: selectItem.id })
      message.success('Sucesso ao criar manual')
      fetchData()
      setModalVisible(false)
      setSelectItem(null)
      form.resetFields(['url', 'picture', 'name'])
    } catch (error) {
      message.error('Erro ao criar manual')
    } finally {
      setLoading(false)
    }
  }

  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
    })
  }

  return (
    <>
      <Box w={'60%'}>
        <Heading as={'h3'} className='adm-subtitulo text-black negrito'>
          Manuais
        </Heading>
        <Text className='paragrafo-preto' mb={'3%'} mr={'5%'}>
          Adicione, edite e exclua manuais da home do site.
        </Text>
      </Box>
      <Flex w='100%' alignItems='center' justifyContent='space-between' mb='18px'>
        <Button
          bg='red.600'
          color='white'
          borderRadius='8px'
          w='180px'
          isLoading={loading}
          h='40px'
          _hover={{ transition: 'all 0.4s' }}
          onClick={() => setModalVisibleCreate(true)}
        >
          Adicionar manual
        </Button>
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
      {modalVisible &&
        <Modal
          open={modalVisible}
          onCancel={() => {
            form.resetFields(['url', 'picture', 'name'])
            setSelectItem(null)
            setModalVisible(false)
          }}
          onOk={() => {
            form.resetFields(['url', 'picture', 'name'])
            setSelectItem(null)
            setModalVisible(false)
          }}
          footer={null}
          title='Editar manual'
          destroyOnClose={true}

        >
          <Form
            key={selectItem?.id}
            layout="horizontal"
            form={form}
            onFinish={updateManual}
          >
            <Form.Item label='Foto' name="picture" rules={[{ required: true, message: 'Campo obrigatório' }]}>
              <InputsHome
                name=''
                question='Não tem limite para adicionar fotos e videos, porém recomendamos comprimir em alta as fotos para reduzir o tempo de carregamento da página. Coloque na ordem que deve aparecer na página do produto.'
                typeInput='fileSingle'
                getUrls={(value: any) => form.setFieldValue('picture', value)}
              />
            </Form.Item>
            <Form.Item label='Manual' name="url" rules={[{ required: true, message: 'Campo obrigatório' }]}>
              <InputsHome
                name=''
                folder="upload-manuais"
                question='Não tem limite para adicionar fotos e videos, porém recomendamos comprimir em alta as fotos para reduzir o tempo de carregamento da página. Coloque na ordem que deve aparecer na página do produto.'
                typeInput='fileSingle'
                getUrls={(value: any) => form.setFieldValue('url', value)}
              />
            </Form.Item>
            <Form.Item label='Nome' name="name" >
              <Input />
            </Form.Item>
            <Button type='submit'>
              Atualizar
            </Button>
          </Form>
        </Modal>
      }

      {modalVisibleCreate &&
        <Modal
          open={modalVisibleCreate}
          onCancel={() => {
            form.resetFields(['url', 'picture', 'name'])
            setSelectItem(null)
            setModalVisibleCreate(false)
          }}
          onOk={() => {
            form.resetFields(['url', 'picture', 'name'])
            setSelectItem(null)
            setModalVisibleCreate(false)
          }}
          footer={null}
          title='Criar manual'
          destroyOnClose={true}

        >
          <Form
            layout="horizontal"
            form={form}
            onFinish={createManual}
          >
            <Form.Item label='Foto' name="picture" rules={[{ required: true, message: 'Campo obrigatório' }]}>
              <InputsHome
                name=''
                question='Não tem limite para adicionar fotos e videos, porém recomendamos comprimir em alta as fotos para reduzir o tempo de carregamento da página. Coloque na ordem que deve aparecer na página do produto.'
                typeInput='fileSingle'
                getUrls={(value: any) => form.setFieldValue('picture', value)}
              />
            </Form.Item>
            <Form.Item label='Manual' name="url" rules={[{ required: true, message: 'Campo obrigatório' }]}>
              <InputsHome
                name=''
                question='Não tem limite para adicionar fotos e videos, porém recomendamos comprimir em alta as fotos para reduzir o tempo de carregamento da página. Coloque na ordem que deve aparecer na página do produto.'
                typeInput='fileSingle'
                folder="upload-manuais"
                getUrls={(value: any) => form.setFieldValue('url', value)}
              />
            </Form.Item>
            <Form.Item label='Nome' name="name">
              <Input />
            </Form.Item>
            <Button type='submit'>
              Criar
            </Button>
          </Form>
        </Modal>
      }
    </>
  )
}

export default TabManuais
