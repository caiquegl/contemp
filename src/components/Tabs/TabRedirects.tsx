import React, { useEffect, useState } from 'react'
import { Box, HStack, Icon, Flex, Button, useToast, Link as ChakraLink, Text, Heading, Tooltip } from '@chakra-ui/react'
import { Table, Space, message, Modal, Form, Input, Button as BtnAtd } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { api } from '../../lib/axios'
import { useRouter } from 'next/router'
import * as path from 'path'
import { PiPencilSimpleBold } from 'react-icons/pi'
import { FaAngleDown, FaStar } from 'react-icons/fa'
import { FaDeleteLeft, FaCheck } from 'react-icons/fa6'

const { Item } = Form

interface TabRedirectsProps {}

const redirectsPath = path.resolve(__dirname, '../../next.config.js') // ajuste o caminho conforme necessário

const TabRedirects: React.FC<TabRedirectsProps> = () => {
  const router = useRouter()
  const [redirects, setRedirects] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [selectItem, setSelectItem] = useState<any>({})
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [modalVisibleCreate, setModalVisibleCreate] = useState<boolean>(false)

  const [form] = Form.useForm()

  const fetchRedirects = async () => {
    try {
      setLoading(true)
      const response = await api.get('/getAllUrls')
      const redirectsData = response.data
      setRedirects(redirectsData)
    } catch (error) {
      console.error(error)
      message.error('Erro ao obter redirecionamentos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRedirects()
  }, [])


  const handleDeleteRedirect = async (redirectId: number) => {
    try {
      setLoading(true)
      await api.post(`deleteRedirect`, { id: redirectId })
      message.success('Sucesso ao apagar url')
      fetchRedirects()
    } catch (error) {
      message.error('Erro ao excluir redirecionamento')
    } finally {
      setLoading(false)
    }
  }

  const updateRedirect = async (redirect: any) => {
    try {
      console.log(redirect)
      setLoading(true)
      await api.post(`updateRedirect`, { id: selectItem.id, ...redirect })
      message.success('Sucesso ao atualizar url')
      fetchRedirects()
      setModalVisible(false)
      setSelectItem(null)
    } catch (error) {
      message.error('Erro ao atualizar redirecionamento')
    } finally {
      setLoading(false)
    }
  }

  const createRedirect = async (redirect: any) => {
    try {
      console.log(redirect)
      setLoading(true)
      await api.post(`createRedirect`, redirect)
      message.success('Sucesso ao criar url')
      fetchRedirects()
      setModalVisibleCreate(false)
      setSelectItem(null)
    } catch (error) {
      message.error('Erro ao criar redirecionamento')
    } finally {
      setLoading(false)
    }
  }

  const handleAddRedirect = async () => {
    try {
      setLoading(true)
      const { data } = await api.post('addRedirect', {
        /* Dados do novo redirecionamento */
      })
      message.success(data.msg)
      fetchRedirects()
    } catch (error) {
      message.error('Erro ao adicionar redirecionamento')
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      title: 'Origem',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: 'Destino',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (text: any, record: any) => (
        <HStack spacing='20px'>
          <Tooltip
            placement='top'
            label='Editar url'
            color={'var(--white-primary)'}
            bg={'var(--red-primary)'}
            borderRadius={'8px'}
            textAlign={'center'}
          >
            <Box>
              <Icon
                cursor='pointer'
                as={PiPencilSimpleBold}
                fontSize='1.15rem'
                color='var(--gray-text)'
                onClick={() => {
                  setSelectItem(record)
                  form.setFieldValue('destination', record.destination)
                  form.setFieldValue('source', record.source)
                  form.setFieldValue('id', record.id)
                  setModalVisible(true)
                }}
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
          >
            <Box>
              <Icon
                cursor='pointer'
                as={FaDeleteLeft}
                fontSize='1.15rem'
                color='var(--gray-text)'
                onClick={() => handleDeleteRedirect(record.id)}
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
          Redirecionamentos
        </Heading>
        <Text className='paragrafo-preto' mb={'3%'} mr={'5%'}>
          Gerencie todos os redirecionamentos do site. Aqui pode adicionar, editar ou excluir de forma prática.
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
          Adicionar Redirecionamento
        </Button>
      </Flex>
      <Table
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
        title='Editar URL'
        destroyOnClose={true}
        
      >
        <Form
          key={selectItem?.id}
          layout="horizontal"
          form={form}
          onFinish={updateRedirect} 
        >
          <Form.Item  label='Origem' rules={[{ required: true, message: 'Campo obrigatório' }]} name="source">
            <Input />
          </Form.Item>
          <Form.Item label='Destino'rules={[{ required: true, message: 'Campo obrigatório' }]} name="destination">
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
        title='Criar URL'
        destroyOnClose={true}
        
      >
        <Form
          layout="horizontal"
          form={form}
          onFinish={createRedirect} 
        >
          <Form.Item  label='Origem' rules={[{ required: true, message: 'Campo obrigatório' }]} name="source">
            <Input />
          </Form.Item>
          <Form.Item label='Destino'rules={[{ required: true, message: 'Campo obrigatório' }]} name="destination">
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

export default TabRedirects
