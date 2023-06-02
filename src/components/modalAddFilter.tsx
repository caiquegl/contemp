import {
  Center,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Icon,
} from '@chakra-ui/react'
import { Button, Form, Input, Select, Modal as ModalAntd, List, Collapse, Popover, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { AiFillDelete } from 'react-icons/ai'
import { SettingOutlined } from '@ant-design/icons'
import { RiDeleteBinLine } from 'react-icons/ri'
import ConfigModalFilter from './configModalFilter'

const { Panel } = Collapse
const { confirm } = ModalAntd

interface IProps {
  isOpen: boolean
  onClose: any
  category: any
  reload: any
}

interface ISelect {
  label: string
  value: any
}

export const ModalAddFilter = ({ isOpen, onClose, category, reload }: IProps) => {
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  })
  const [editName, setEditName] = useState<string>('')
  const [filter, setFilter] = useState<any>([])
  const [options, setOptions] = useState<ISelect[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const getOptions = async () => {
    const { data } = await api.get(`${category.name}/getCategory`)
    setOptions(data.products ? data.products.map((item: any) => ({ label: item.name, value: item.id })) : [])
  }

  const addFilter = async (body: any) => {
    let exist = false

    body.products = []
    console.log(filter)
    filter.forEach((item: any) => {
      if (item.name === body.name) exist = true
    })

    if (exist)
      return toast({
        title: 'Erro',
        description: 'Esse nome já está sendo utilizado como filtro.',
        status: 'error',
      })

    setLoading(true)
    const { data, status } = await api.put(`updateCategory`, {
      ...category,
      filter: [...filter, body],
    })
    form2.resetFields()

    setFilter([...filter, body])
    toast({
      title: status == 201 ? 'Sucesso' : 'Erro',
      description: data.msg,
      status: status == 201 ? 'success' : 'error',
    })
    reload()
    setLoading(false)
  }

  const addProduct = async (body: any, index: number) => {
    let exist = false

    let newFilter = filter

    newFilter[index].products.forEach((item: any) => {
      body.products.forEach((pd: number) => {
        if (item === pd) exist = true
      })
    })

    newFilter[index].products = [...newFilter[index].products, ...body.products]

    if (exist)
      return toast({
        title: 'Erro',
        description: 'Produto já existe nessa lista.',
        status: 'error',
      })

    setLoading(true)
    const { data, status } = await api.put(`updateCategory`, {
      ...category,
      filter: newFilter,
    })

    setFilter(newFilter)
    toast({
      title: status == 201 ? 'Sucesso' : 'Erro',
      description: data.msg,
      status: status == 201 ? 'success' : 'error',
    })
    form.resetFields()
    reload()
    setLoading(false)
  }

  useEffect(() => {
    setOptions([])
    if (category.name) getOptions()
    if (category && category.filter && Array.isArray(category.filter)) {
      console.log(Array.isArray(category.filter), 'aqui' )
      setFilter(category.filter)
    } else {
      setFilter([])
    }
    setEditName('')
  }, [category])

  const removeProduct = async (indexProduct: number, indexFilter: number) => {
    confirm({
      title: 'Deletar',
      icon: <ExclamationCircleFilled />,
      content: 'Deseja remover o produto do filtro ?',
      async onOk() {
        let newList = filter
        newList[indexFilter].products = filter[indexFilter].products.filter(
          (item: any, indexFilter: number) => indexProduct != indexFilter
        )
        setLoading(true)
        const { data, status } = await api.put(`updateCategory`, {
          ...category,
          filter: newList,
        })

        toast({
          title: status == 201 ? 'Sucesso' : 'Erro',
          description: data.msg,
          status: status == 201 ? 'success' : 'error',
        })
        reload()
        setLoading(false)
        onClose()
      },
      onCancel() {
        console.log('Cancel')
      },
      wrapClassName: 'indexMax',
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color='black.800'>Adicionar filtro</ModalHeader>
        <ModalCloseButton color='red.700' />
        <ModalBody>
          <Form
            onFinish={addFilter}
            layout='vertical'
            form={form2}
            initialValues={{
              name: category.filter?.name || null,
            }}
            style={{
              marginBottom: 20,
            }}
          >
            <Form.Item label='Nome do filtro' name='name' rules={[{ required: true, message: 'Campo obrigatório' }]}>
              <Input />
            </Form.Item>
            <Center w='100%'>
              <Button size='large' style={{ margin: 'auto' }} htmlType='submit'>
                Adicionar
              </Button>
            </Center>
          </Form>
          <Collapse>
            {filter &&
              filter.length > 0 &&
              filter?.map((item: any, index: number) => (
                <Panel
                  header={item.name}
                  key={index}
                  extra={
                    <ConfigModalFilter filter={filter} setFilter={setFilter} index={index} category={category} />
                  }
                >
                  <Form
                    form={form}
                    onFinish={(body) => addProduct(body, index)}
                    layout='vertical'
                    initialValues={{
                      name: category.filter?.name || null,
                    }}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      marginBottom: 20,
                    }}
                  >
                    <Form.Item
                      label='Produtos'
                      name='products'
                      style={{
                        width: '100%'
                      }}
                      rules={[{ required: true, message: 'Campo obrigatório' }]}
                    >
                      <Select
                        mode='multiple'
                        options={options}
                        popupClassName='pop-select'
                        style={{ width: '100%' }}
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                      />
                    </Form.Item>
                    <Center w='100%'>
                      <Button size='large' style={{ margin: 'auto' }} htmlType='submit'>
                        Adicionar produto
                      </Button>
                    </Center>
                  </Form>
                  <List
                    header='Produtos'
                    bordered
                    loading={loading}
                    dataSource={item.products}
                    renderItem={(product: any, indexProduct: number) => (
                      <List.Item
                        actions={[
                          <Icon
                            onClick={() => removeProduct(indexProduct, index)}
                            as={AiFillDelete}
                            fontSize='20px'
                            cursor='pointer'
                            color='red.700'
                          />,
                        ]}
                      >
                        <Text>{options.find((el: any) => el.value === product)?.label}</Text>
                      </List.Item>
                    )}
                  />
                </Panel>
              ))}
          </Collapse>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
