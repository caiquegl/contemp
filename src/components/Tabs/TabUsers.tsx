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
  FormControl
} from '@chakra-ui/react'
import { Table, Space, message, Modal, Form, Input, Button as BtnAtd, Avatar } from 'antd'
import { SearchBar } from '../SearchBar'
import { colors } from '../../styles/theme'
import { pxToRem } from '../../utils/pxToRem'
import { api } from '../../lib/axios'
import { useRouter } from 'next/router'
import * as path from 'path'
import moment from 'moment';
import { PiPencilSimpleBold, PiCrownSimpleFill } from 'react-icons/pi'
import { IoPersonRemoveOutline, IoPersonAddOutline, IoAlert } from "react-icons/io5";
import { FaAngleDown, FaStar } from 'react-icons/fa'
import { TbCrownOff } from "react-icons/tb";
import { FaDeleteLeft, FaCheck } from 'react-icons/fa6'
import InputsHome from '../ContainerHome/inputs'
import { ViewImage } from '../ContainerAddProduct/ViewImage'

const { Item } = Form


const redirectsPath = path.resolve(__dirname, '../../next.config.js') // ajuste o caminho conforme necessário

const TabUsers: React.FC = () => {
  const router = useRouter()
  const [listClone, setListClone] = useState<any[]>([])
  const [redirects, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [selectItem, setSelectItem] = useState<any>({})
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [modalVisibleCreate, setModalVisibleCreate] = useState<boolean>(false)


  const [form] = Form.useForm()

  const fetchUser = async () => {
    try {
      setLoading(true)
      const response = await api.get('/getAllUsers')
      const usersData = response.data
      setUsers(usersData)
    } catch (error) {
      console.error(error)
      message.error('Erro ao obter usuários')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/getAllUsers');
        const redirectsData = response.data;
        setListClone(redirectsData); // Defina listClone ao buscar redirecionamentos
        setUsers(redirectsData);
      } catch (error) {
        console.error(error);
        message.error('Erro ao obter redirecionamentos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleDeleteRedirect = async (redirectId: number) => {
    try {
      setLoading(true)
      await api.post(`deleteUser`, { id: redirectId })
      message.success('Sucesso ao apagar usuário')
      fetchUser()
    } catch (error) {
      message.error('Erro ao excluir usuário')
    } finally {
      setLoading(false)
    }
  }

  const updateUser = async (user: any) => {
    try {
      setLoading(true)
      await api.post(`updateUser`, { id: selectItem.id, ...user })
      message.success('Sucesso ao atualizar usuário')
      fetchUser()
      setModalVisible(false)
      setSelectItem(null)
      form.resetFields(['name', 'email', 'picture'])

    } catch (error) {
      message.error('Erro ao atualizar usuário')
    } finally {
      setLoading(false)
    }
  }

  const createUser = async (user: any) => {
    try {

      setLoading(true)
      await api.post(`createUser`, user)
      message.success('Sucesso ao criar usuário')
      fetchUser()
      setModalVisibleCreate(false)
      setSelectItem(null)
      form.resetFields(['name', 'password', 'email', 'picture'])
    } catch (error) {
      message.error('Erro ao criar redirecionamento')
    } finally {
      setLoading(false)
    }
  }


  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'picture',
      key: 'picture',
      render: (picture: any) =>  (
        <>
          {picture &&
            <Avatar src={picture} />
          }
        </>
      )
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => (a.name || '').localeCompare(b.name || ''),
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
      sorter: (a: any, b: any) => (a.email || '').localeCompare(b.email || ''),
    },
    {
      title: 'Super Admin',
      dataIndex: 'super_adm',
      key: 'super_adm',
      width: '3%',
      sorter: (a: any, b: any) => (a.super_adm || '').localeCompare(b.super_adm || ''),
      render: (adm: any) =>  (
        <>
          {adm ?
            <PiCrownSimpleFill
            color={'var(--chakra-colors-yellow-400)'}
            fill={'var(--chakra-colors-yellow-400)'}
            />
            : <TbCrownOff />

          }
        </>
      )
    },
    {
      title: 'Adicionado em',
      dataIndex: 'created_at',
      key:'created_at',
      render: (a: any) => moment(a).format('DD/MM/YYYY'),
      sorter: (a: any, b: any) => moment(a.created_at).unix() - moment(b.created_at).unix(),
      width: '8%',
    },
    {
      title: 'Atualizado em',
      dataIndex: 'updated_at',
      key:'updated_at',
      render: (a: any) => moment(a).format('DD/MM/YYYY'),
      sorter: (a: any, b: any) => moment(a.updated_at).unix() - moment(b.updated_at).unix(),
      width: '8%',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (text: any, user: any) => (
        <HStack spacing='20px'>
            <Tooltip
              placement='top'
              label={user.super_adm ? 'Remover super admin' : 'Tornar super admin'}
              color={'var(--white-primary)'}
              bg={'var(--red-primary)'}
              borderRadius={'8px'}
              textAlign={'center'}
              hasArrow
            >
              <Box>
                <Icon
                  cursor='pointer'
                  as={user.super_adm ? IoPersonRemoveOutline : IoPersonAddOutline}
                  fontSize='1.15rem'
                  color='var(--gray-text)'
                  onClick={() => {
                    updateSuperAdmin(user.id, !user.super_adm)
                  }}
                />
              </Box>
            </Tooltip>

          <Tooltip
            placement='top'
            label='Editar usuário'
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
                  setSelectItem(user)
                  form.setFieldValue('name', user.name)
                  form.setFieldValue('email', user.email)
                  setModalVisible(true)
                }}
              />
            </Box>
          </Tooltip>

          <Tooltip
            placement='top'
            label='Excluir usuário'
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
                onClick={() => handleDeleteRedirect(user.id)}
              />
            </Box>
          </Tooltip>
        </HStack>
      ),
    },
  ]

  const updateSuperAdmin = async (user_id: any, super_adm: any) => {
    try {
      setLoading(true)
      await api.post(`updateSuperAdmin`, { id: user_id, super_adm })
      message.success('Sucesso ao atualizar usuário')
      fetchUser()
      setModalVisible(false)
      setSelectItem(null)

    } catch (error) {
      message.error('Erro ao atualizar usuário')
    } finally {
      setLoading(false)
    }
  }

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
          Usuários
        </Heading>
        <Text className='paragrafo-preto' mb={'3%'} mr={'5%'}>
          Gerencie todos os usuários do site. Aqui pode adicionar, editar ou excluir de forma prática.
        </Text>
      </Box>
      <Flex w='100%' alignItems='center' justifyContent='space-between' mb='18px'>
        <Button
          bg='red.600'
          color='white'
          borderRadius='8px'
          w='250px'
          isLoading={loading}
          h='40px'
          _hover={{ transition: 'all 0.4s' }}
          onClick={() => setModalVisibleCreate(true)}
        >
          Adicionar usuário
        </Button>

        <SearchBar
          inputProps={{
            placeholder: 'Digite nome ou email...',
            onChange: (evt) => {
              let newList = listClone.filter((item: any) => {
                // Adicionamos uma verificação para garantir que item.source e item.destination estejam definidos
                return (
                  item.name &&
                  item.email &&
                  (item.name.toLowerCase().includes(evt.target.value.toLowerCase()) ||
                    item.email.toLowerCase().includes(evt.target.value.toLowerCase()))
                );
              });
              setUsers([...newList]);
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
      </Flex>
      <Table
      id='tabela-description'
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
          title='Editar usuário'
          destroyOnClose={true}

        >
          <Form
            key={selectItem?.id}
            layout="horizontal"
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
          title='Criar usuário'
          destroyOnClose={true}

        >
          <Form
            layout="horizontal"
            form={form}
            onFinish={createUser}
          >
            <Form.Item label='Nome' rules={[{ required: true, message: 'Campo obrigatório' }]} name="name">
              <Input />
            </Form.Item>
            <Form.Item label='Email' rules={[{ required: true, message: 'Campo obrigatório' }]} name="email">
              <Input type='email'/>
            </Form.Item>
            <Form.Item label='Senha' rules={[{ required: true, message: 'Campo obrigatório' }]} name="password">
              <Input type='password'/>
            </Form.Item>
            <Form.Item label='Foto'  name="picture">
              <InputsHome
                name=''
                question='Não tem limite para adicionar fotos e videos, porém recomendamos comprimir em alta as fotos para reduzir o tempo de carregamento da página. Coloque na ordem que deve aparecer na página do produto.'
                typeInput='fileSingle'
                getUrls={(value: any) => form.setFieldValue('picture', value)}
              />
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

export default TabUsers
