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
  TabPanel,
} from '@chakra-ui/react'
import { Table, Space, message, Modal, Form, Input, Button as BtnAtd, Avatar } from 'antd'
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
import { FaDeleteLeft, FaCheck } from 'react-icons/fa6'
import InputsHome from '../ContainerHome/inputs'
import { ViewImage } from '../ContainerAddProduct/ViewImage'
import { CgScreen } from "react-icons/cg";

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
        message.error('Erro ao obter Banners');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: (
        <Checkbox />
      ),
      key: 'selectAll',
      width: 50,
      render: (record: any) => (
        <Checkbox />
      ),
    },
    {
      title: 'Ordem',
      width: 100,
      sorter: (a: any, b: any) => a.order - b.order,
    },
    {
      title: 'Imagem',
      dataIndex: 'picture',
      key: 'picture',
      render: (picture: any) => (
        <>
          {picture &&
            <Avatar src={'https://contemp.com.br/api/arquivos/2.png'} />
          }
        </>
      )
    },
    {
      title: 'Tipo',
      dataIndex: 'Tipo',
      key: 'tipo',
      //sorter: '()',
      render: () => (
        <Badge
          className='bagdetabela-default'
          variant="subtle"
          fontSize="0.875rem"
          maxW={'80px'}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <CgScreen style={{ marginRight: '5px' }} />
          Desktop
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
      render: (text: any, user: any) => (
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
              //onClick={() => {
              //setSelectItem(user)
              //form.setFieldValue('name', user.name)
              // form.setFieldValue('email', user.email)
              //setModalVisible(true)
              //}}
              />
            </Box>
          </Tooltip>

          <Tooltip
            placement='top'
            label='Excluir banner'
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
              //onClick={() => handleDeleteRedirect(user.id)}
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
      <Tabs mt={'5%'} variant='unstyled'>
        <TabList>
          <Tab
            _selected={{
              bg: 'red.600',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '8px',
            }}
            w={pxToRem(133)}
            color='black.800'>
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
          title='Editar usuário'
          destroyOnClose={true}

        >
          <Form
            key={selectItem?.id}
            layout="horizontal"
            form={form}
          //onFinish={updateBanner}
          >
            <Form.Item label='Nome' rules={[{ required: true, message: 'Campo obrigatório' }]} name="name">
              <Input />
            </Form.Item>
            <Form.Item label='Email' rules={[{ required: true, message: 'Campo obrigatório' }]} name="email">
              <Input type='email' />
            </Form.Item>

            <Form.Item label='Imagem' name="picture">
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
          //onFinish={createBanner}
          >
            <Form.Item label='Nome' rules={[{ required: true, message: 'Campo obrigatório' }]} name="name">
              <Input />
            </Form.Item>
            <Form.Item label='Email' rules={[{ required: true, message: 'Campo obrigatório' }]} name="email">
              <Input type='email' />
            </Form.Item>
            <Form.Item label='Senha' rules={[{ required: true, message: 'Campo obrigatório' }]} name="password">
              <Input type='password' />
            </Form.Item>
            <Form.Item label='Foto' name="picture">
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
