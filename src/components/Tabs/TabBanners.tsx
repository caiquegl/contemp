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

const { Item } = Form


const redirectsPath = path.resolve(__dirname, '../../next.config.js') // ajuste o caminho conforme necessário

const TabBanners: React.FC = () => {
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
  const [tabActive, setTab] = useState<'Desktop' | 'Mobile'>('Desktop')


  const [form] = Form.useForm()

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.post('/getAllBanners', {
        tabActive
      });
      const redirectsData = response.data;
      setListClone(redirectsData); // Defina listClone ao buscar redirecionamentos
      setUsers(redirectsData);
    } catch (error) {
      console.error(error);
      message.error('Erro ao obter Banners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tabActive]);

  const changerOrder = async (order: number, banner: any) => {
    try {
      setLoading(true)
      const { data, status } = await api.put(`changeOrderBanner`, {
        order,
        banner: banner,
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

  const changeActiveBanner = async (id: number, status: any) => {
    try {
      setLoading(true)
      const { data } = await api.put(`changeActiveBanner`, {
        id,
        status,
      })

      toast({
        title: 'Sucesso',
        description: 'Sucesso ao atualizar banner',
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

  const deleteBanner = async (id: number) => {
    try {
      setLoading(true)
      const { data } = await api.post(`deleteBanner`, {
        id,
      })

      toast({
        title: 'Sucesso',
        description: 'Sucesso ao deletar banner',
        status: 'success',
      })
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao deletar banner',
        status: 'error',
      })
    } finally {
      setLoading(false)
      await fetchData()
    }
  }


  const columns = [
    {
      title: 'Ordem Geral',
      width: '6%',
      sorter: (a: any, b: any) => a.order - b.order,
      render: (a: any) => <EditOrder value={a} changerOrder={changerOrder} />,
    },
    {
      title: 'Imagem',
      dataIndex: 'url',
      key: 'url',
      render: (url: any) => (
        <>
          {url &&
            <Avatar src={url} />
          }
        </>
      )
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      //sorter: '()',
      render: (type: any) => (
        <Badge
          className='bagdetabela-default'
          variant="subtle"
          fontSize="0.875rem"
          maxW={'80px'}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <CgScreen style={{ marginRight: '5px' }} />
          {type}
        </Badge>
      ),
    },
    {
      title: 'Ativo',
      dataIndex: 'status',
      key: 'status',
      //sorter: '()',
      render: (status: any) => (
        <Badge
          className='bagdetabela-default'
          variant="subtle"
          fontSize="0.875rem"
          maxW={'80px'}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {status ? 'Ativo' : 'Inativo'}
        </Badge>
      ),
    },
    {
      title: 'Adicionado em',
      dataIndex: '',
      key: '',
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
      title: 'Ações',
      key: 'actions',
      render: (text: any, banner: any) => (
        <HStack spacing='20px'>
          <Tooltip
            placement='top'
            label='Editar banner'
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
                  setSelectItem(banner)
                  form.setFieldValue('url_file', banner.url)
                  form.setFieldValue('type', banner.type)
                  form.setFieldValue('title', banner.title)
                  form.setFieldValue('subtitle', banner.subtitle)
                  form.setFieldValue('description', banner.description)
                  form.setFieldValue('redirect', banner.redirect)
                  setModalVisible(true)
                }}
              />
            </Box>
          </Tooltip>

          <Tooltip
            placement='top'
            label={`${banner.status ? 'Inativar' : 'Ativar'} banner`}
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
                onClick={() => changeActiveBanner(banner.id, !banner.status)}
              />
            </Box>
          </Tooltip>
          <Tooltip
            placement='top'
            label="Deletar banner"
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
                onClick={() => deleteBanner(banner.id)}
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

  const createBanner = async (banner: any) => {
    try {

      setLoading(true)
      await api.post(`createBanner`, banner)
      message.success('Sucesso ao criar banner')
      fetchData()
      setModalVisibleCreate(false)
      setSelectItem(null)
      form.resetFields(['url_file', 'type', 'title', 'subtitle', 'description', 'redirect'])
    } catch (error) {
      message.error('Erro ao criar banner')
    } finally {
      setLoading(false)
    }
  }

  const updateBanner = async (banner: any) => {
    try {

      setLoading(true)
      await api.post(`updateBanner`, { ...banner, id: selectItem.id })
      message.success('Sucesso ao criar banner')
      fetchData()
      setModalVisible(false)
      setSelectItem(null)
      form.resetFields(['url_file', 'type', 'title', 'subtitle', 'description', 'redirect'])
    } catch (error) {
      message.error('Erro ao criar banner')
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
          Banners Home
        </Heading>
        <Text className='paragrafo-preto' mb={'3%'} mr={'5%'}>
          Adicione, edite e exclua banners da home do site.
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
          Adicionar banner
        </Button>
      </Flex>
      <Tabs mt={'5%'} variant='unstyled' onChange={(evt) => setTab(evt == 0 ? 'Desktop' : 'Mobile')}>
        <TabList>
          <Tab
            _selected={{
              bg: 'red.600',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '8px',
            }}
            w={pxToRem(133)}
            color='black.800'
          >
            Desktop
          </Tab>
          <Tab
            _selected={{
              bg: 'red.600',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '8px',
            }}
            w={pxToRem(133)}
            color='black.800'>
            Mobile
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Heading as={'h3'} className='adm-subtitulo text-black negrito'>
              Banners Desktop
            </Heading>
            <Table
              id='tabela-banners'
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
          </TabPanel>
          <TabPanel>
            <Heading as={'h3'} className='adm-subtitulo text-black negrito'>
              Banners mobile
            </Heading>
            <Table
              id='tabela-banners'
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
          </TabPanel>
        </TabPanels>
      </Tabs>

      {modalVisible &&
        <Modal
          open={modalVisible}
          onCancel={() => {
            setSelectItem(null)
            setModalVisible(false)
          }}
          onOk={() => {
            setSelectItem(null)
            setModalVisible(false)
          }}
          footer={null}
          title='Editar banner'
          destroyOnClose={true}

        >
          <Form
            key={selectItem?.id}
            layout="horizontal"
            form={form}
            onFinish={updateBanner}
          >
            <Form.Item label='Foto' name="url_file" rules={[{ required: true, message: 'Campo obrigatório' }]}>
              <InputsHome
                name=''
                question='Não tem limite para adicionar fotos e videos, porém recomendamos comprimir em alta as fotos para reduzir o tempo de carregamento da página. Coloque na ordem que deve aparecer na página do produto.'
                typeInput='fileSingle'
                getUrls={(value: any) => form.setFieldValue('url_file', value)}
              />
            </Form.Item>
            <Form.Item label="Tipo" name="type" rules={[{ required: true, message: 'Campo obrigatório' }]}>
              <Select>
                <Select.Option value="Desktop">Desktop</Select.Option>
                <Select.Option value="Mobile">Mobile</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='Título' name="title" >
              <Input />
            </Form.Item>
            <Form.Item label='Subtitulo' name="subtitle" >
              <Input />
            </Form.Item>
            <Form.Item label='Description' name="description">
              <Input />
            </Form.Item>
            <Form.Item label='Redirecionamento' name="redirect">
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
            setSelectItem(null)
            setModalVisibleCreate(false)
          }}
          onOk={() => {
            setSelectItem(null)
            setModalVisibleCreate(false)
          }}
          footer={null}
          title='Criar banner'
          destroyOnClose={true}

        >
          <Form
            layout="horizontal"
            form={form}
            onFinish={createBanner}
          >
            <Form.Item label='Foto' name="url_file" rules={[{ required: true, message: 'Campo obrigatório' }]}>
              <InputsHome
                name=''
                question='Não tem limite para adicionar fotos e videos, porém recomendamos comprimir em alta as fotos para reduzir o tempo de carregamento da página. Coloque na ordem que deve aparecer na página do produto.'
                typeInput='fileSingle'
                getUrls={(value: any) => form.setFieldValue('url_file', value)}
              />
            </Form.Item>
            <Form.Item label="Tipo" name="type" rules={[{ required: true, message: 'Campo obrigatório' }]}>
              <Select>
                <Select.Option value="Desktop">Desktop</Select.Option>
                <Select.Option value="Mobile">Mobile</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label='Título' name="title" >
              <Input />
            </Form.Item>
            <Form.Item label='Subtitulo' name="subtitle" >
              <Input />
            </Form.Item>
            <Form.Item label='Description' name="description">
              <Input />
            </Form.Item>
            <Form.Item label='Redirecionamento' name="redirect">
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

export default TabBanners
