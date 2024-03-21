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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react'
import { Table, message, Modal, Form, Input } from 'antd'
import { SearchBar } from '../SearchBar'
import { colors } from '../../styles/theme'
import { pxToRem } from '../../utils/pxToRem'
import { api } from '../../lib/axios'
import { useRouter } from 'next/router'
import moment from 'moment';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import {IoIosRefresh} from 'react-icons/io'
import {CiUser} from 'react-icons/ci'
import InputsHome from '../ContainerHome/inputs'
import { AiOutlineDelete } from 'react-icons/ai'
import { HtmlDefault, HtmlOrcamento } from '../../utils/htmlEmail'

const TabEmails: React.FC = () => {
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  })
  const router = useRouter()
  const [listClone, setListClone] = useState<any[]>([])
  const [redirects, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [selectEmail, setSelectEmail] = useState<any>({})
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [modalEmailVisible, setModalEmailVisible] = useState<boolean>(false)


  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.post('/getAllEmails');
      const redirectsData = response.data;
      setListClone(redirectsData); // Defina listClone ao buscar redirecionamentos
      setUsers(redirectsData);

    } catch (error) {
      console.error(error);
      message.error('Erro ao obter emails');
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
        description: 'Sucesso ao deletar e-mail',
        status: 'success',
      })
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao deletar e-mail',
        status: 'error',
      })
    } finally {
      setLoading(false)
      await fetchData()
    }
  }


  const updateEmail = async (body: any) => {
    try {
      setLoading(true)
      let convert = JSON.parse(selectEmail.params)
      await fetch(`/api/mail`, {
        method: 'POST',
        body: JSON.stringify({...convert, resend_to: body.send_email}),
      })

      toast({
        title: 'Sucesso',
        description: 'Sucesso ao enviar e-mail',
        status: 'success',
      })
      setSelectEmail({})
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao deletar manual',
        status: 'error',
      })
    } finally {
      setLoading(false)
      await fetchData()
      setModalVisible(false)
    }
  }

  const columns = [
    {
      title: 'ID',
      width: '8%',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: 'Tipo de e-mail',
      dataIndex: 'type',
      key: 'type',
      width: '200px',
      render: (a: any) => <p style={{textTransform: 'capitalize'}}>{a}</p>
    },
    {
      title: 'E-mail',
      dataIndex: 'url',
      key: 'url',
      width: '380px',
      //sorter: '()',
      render: (a: any, b: any) => (
        <Button
          className='botao-tabelaprodutos'
          fontWeight={'400'}
          isExternal={true}
          onClick={() => {
            setSelectEmail(b)
            setModalEmailVisible(true)
          }}
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
      dataIndex: 'resend',
      key: 'resend',
      render: (a: any) => <>{ a ? moment(a).format('DD/MM/YYYY') : ''}</>,
      sorter: (a: any, b: any) => moment(a.resend).unix() - moment(b.resend).unix(),
      width: 140,
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (text: any, email: any) => (
        <HStack spacing='20px'>
          <Tooltip
            placement='top'
            label='Reenviar e-mail'
            color={'var(--white-primary)'}
            bg={'var(--red-primary)'}
            borderRadius={'8px'}
            textAlign={'center'}
            hasArrow
          >
            <Box>
              <Icon
                cursor='pointer'
                as={IoIosRefresh}
                fontSize='1.15rem'
                color='var(--gray-text)'
                onClick={async () => {
                  setLoading(true);
                  let convert = JSON.parse(email.params)
                  await fetch(`/api/mail`, {
                    method: 'POST',
                    body: JSON.stringify({...convert, resend: true, id_resend: email.id}),
                  })

                  fetchData()
                  setLoading(false);
                }}
              />
            </Box>
          </Tooltip>

          <Tooltip
            placement='top'
            label="Mudar e-mail"
            color={'var(--white-primary)'}
            bg={'var(--red-primary)'}
            borderRadius={'8px'}
            textAlign={'center'}
            hasArrow
          >
            <Box>
              <Icon
                cursor='pointer'
                as={CiUser}
                fontSize='1.15rem'
                color='var(--gray-text)'
                onClick={() => {
                  form.resetFields(['send_email'])
                  setSelectEmail(email)
                  setModalVisible(true)
                }}
              />
            </Box>
          </Tooltip>

          <Tooltip
            placement='top'
            label="Deletar e-mail"
            color={'var(--white-primary)'}
            bg={'var(--red-primary)'}
            borderRadius={'8px'}
            textAlign={'center'}
            hasArrow
          >
            <Box>
              <Icon
                cursor='pointer'
                as={AiOutlineDelete}
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

  const renderEmail = () => {
    if(selectEmail.params) {
      let body = JSON.parse(selectEmail.params)

      return body.id ? HtmlDefault(body.name, body.email, body.empresa, body.telephone, body.description, body.file, body.area) : HtmlOrcamento(body.name, body.email, '', body.telephone, body.description, '', body.products)
    }

    return ''
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
          onChange: (evt) => {
            let newList = listClone.filter((item: any) => {

              let param = item.params
              if(typeof param != 'string') param = JSON.stringify(param)
              return param.toLowerCase().includes(evt.target.value.toLowerCase());
            })
            setUsers([...newList])
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
          marginLeft: 'auto',
        }}
        />
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
            setModalVisible(false)
            setSelectEmail({})
          }}
          onOk={() => {
            setModalVisible(false)
            setSelectEmail({})
          }}
          footer={null}
          title='Editar e-mail'
          destroyOnClose={true}
        >
          <Form
            layout="horizontal"
            form={form}
            onFinish={updateEmail}
          >
            <Form.Item required label='Email' name="send_email" >
              <Input />
            </Form.Item>
            <Button type='submit' backgroundColor={'var(--chakra-colors-red-600)'} color={'white'} _hover={{ color: 'white', backgroundColor: '#242424', }}>
              Reenviar
            </Button>
          </Form>
        </Modal>
      }

      {modalEmailVisible &&
        <Modal
          open={modalEmailVisible}
          onCancel={() => {
            setModalEmailVisible(false)
            setSelectEmail({})
          }}
          onOk={() => {
            setModalEmailVisible(false)
            setSelectEmail({})
          }}
          footer={null}
          title='Visualizar e-mail'
          destroyOnClose={true}
          width={"90vw"}
          zIndex={99999999999999}
        >
          <div dangerouslySetInnerHTML={{ __html: renderEmail() }} />
        </Modal>
      }
    </>
  )
}

export default TabEmails
