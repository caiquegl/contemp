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
  Badge
} from '@chakra-ui/react'
import { Table, message, Modal, Form, Input, Avatar, Select } from 'antd'
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
import { ExternalLinkIcon } from '@chakra-ui/icons'

const { Item } = Form


const redirectsPath = path.resolve(__dirname, '../../next.config.js') // ajuste o caminho conforme necessário

const TabCards: React.FC = () => {
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
      const response = await api.post('/getAllCards');
      const redirectsData = response.data;
      setListClone(redirectsData);
      setUsers(redirectsData);
    } catch (error) {
      console.error(error);
      message.error('Erro ao obter cards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tabActive]);

  const changerOrder = async (order: number, card: any) => {
    try {
      setLoading(true)
      const { data, status } = await api.put(`changeOrderCards`, {
        order,
        card: card,
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

  const changeActiveCard = async (id: number, status: any) => {
    try {
      setLoading(true)
      const { data } = await api.put(`changeActiveCard`, {
        id,
        status,
      })

      toast({
        title: 'Sucesso',
        description: 'Sucesso ao atualizar card',
        status: 'success',
      })
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao alterar card',
        status: 'error',
      })
    } finally {
      setLoading(false)
      await fetchData()
    }
  }

  const deleteCard = async (id: number) => {
    try {
      setLoading(true)
      const { data } = await api.post(`deleteCard`, {
        id,
      })

      toast({
        title: 'Sucesso',
        description: 'Sucesso ao deletar card',
        status: 'success',
      })
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao deletar card',
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
      title: 'Icone',
      dataIndex: 'icon',
      key: 'icon',
      render: (icon: any) => (
        <>
          {icon &&
            <Avatar src={icon} />
          }
        </>
      )
    },
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Ativo',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (is_active: any) => (
        <Badge
          className='bagdetabela-default'
          variant="subtle"
          fontSize="0.875rem"
          maxW={'80px'}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {is_active ? 'Ativo' : 'Inativo'}
        </Badge>
      ),
    },
    {
      title: 'Redirecionamento',
      dataIndex: 'redirection',
      key: 'redirection',
      render: (redirect: any) => (
        <Button
          as={ChakraLink}
          className='botao-tabelaprodutos'
          fontWeight={'400'}
          href={redirect}
          isExternal={true}
          _hover={{ color: 'black', textDecoration: 'none' }}
          rightIcon={<Icon as={ExternalLinkIcon} />}
        >
          {redirect}
        </Button>
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
      render: (text: any, card: any) => (
        <HStack spacing='20px'>
          <Tooltip
            placement='top'
            label='Editar card'
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
                  setSelectItem(card)
                  form.setFieldValue('icon', card.icon)
                  form.setFieldValue('title', card.title)
                  form.setFieldValue('description', card.description)
                  form.setFieldValue('redirect', card.redirect)
                  setModalVisible(true)
                }}
              />
            </Box>
          </Tooltip>

          <Tooltip
            placement='top'
            label={`${card.is_active ? 'Inativar' : 'Ativar'} card`}
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
                onClick={() => changeActiveCard(card.id, !card.is_active)}
              />
            </Box>
          </Tooltip>
          <Tooltip
            placement='top'
            label="Deletar card"
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
                onClick={() => deleteCard(card.id)}
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

  const createCard = async (card: any) => {
    try {

      setLoading(true)
      await api.post(`createCard`, card)
      message.success('Sucesso ao criar card')
      fetchData()
      setModalVisibleCreate(false)
      setSelectItem(null)
      form.resetFields(['icon', 'title', 'description', 'redirect'])
    } catch (error) {
      message.error('Erro ao criar card')
    } finally {
      setLoading(false)
    }
  }

  const updateCard = async (card: any) => {
    try {

      setLoading(true)
      await api.post(`updateCard`, { ...card, id: selectItem.id })
      message.success('Sucesso ao criar card')
      fetchData()
      setModalVisible(false)
      setSelectItem(null)
      form.resetFields(['icon', 'title', 'description', 'redirect'])
    } catch (error) {
      message.error('Erro ao criar card')
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
          Cards Home
        </Heading>
        <Text className='paragrafo-preto' mb={'3%'} mr={'5%'}>
          Adicione, edite e exclua cards da home do site.
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
          Adicionar card
        </Button>
      </Flex>

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
          title='Editar card'
          destroyOnClose={true}

        >
          <Form
            key={selectItem?.id}
            layout="horizontal"
            form={form}
            onFinish={updateCard}
          >
            <Form.Item label='Foto' name="icon" rules={[{ required: true, message: 'Campo obrigatório' }]}>
              <InputsHome
                name=''
                question='Não tem limite para adicionar fotos e videos, porém recomendamos comprimir em alta as fotos para reduzir o tempo de carregamento da página. Coloque na ordem que deve aparecer na página do produto.'
                typeInput='fileSingle'
                getUrls={(value: any) => form.setFieldValue('icon', value)}
              />
            </Form.Item>
            <Form.Item label='Título' name="title" >
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
          title='Criar card'
          destroyOnClose={true}

        >
          <Form
            layout="horizontal"
            form={form}
            onFinish={createCard}
          >
            <Form.Item label='Foto' name="icon" rules={[{ required: true, message: 'Campo obrigatório' }]}>
              <InputsHome
                name=''
                question='Não tem limite para adicionar fotos e videos, porém recomendamos comprimir em alta as fotos para reduzir o tempo de carregamento da página. Coloque na ordem que deve aparecer na página do produto.'
                typeInput='fileSingle'
                getUrls={(value: any) => form.setFieldValue('icon', value)}
              />
            </Form.Item>
            <Form.Item label='Título' name="title" >
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

export default TabCards
