import { Center, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Icon } from '@chakra-ui/react'
import { Button, Form, Input, Select, Modal as ModalAntd, List } from 'antd'
import React, { useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { AiFillDelete } from 'react-icons/ai';
const { confirm } = ModalAntd;

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
    const [filter, setFilter] = useState<any>([])
    const [options, setOptions] = useState<ISelect[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const getOptions = async () => {
        const { data } = await api.get(`${category.name}/getCategory`)
        setOptions(data.products ? data.products.map((item: any) => ({ label: item.name, value: item.id })) : [])
    }

    const addFilter = async (body: any) => {
        let exist = false

        body.products.forEach((item: any) => {
            if(category.filter?.products?.indexOf(item) > -1) exist = true
        })

        if(exist) return toast({
            title: 'Erro',
            description: 'Já existe produto cadastrado nessa lista',
            status:  'error',
        })
        setLoading(true)
        const { data, status } = await api.put(`updateCategory`, {
            ...category,
            filter: {...body, products: category.filter?.products ? [...body.products, category.filter?.products] : body.products}
        })

        toast({
            title: status == 201 ? 'Sucesso' : 'Erro',
            description: data.msg,
            status: status == 201 ? 'success' : 'error',
        })
        reload()
        setLoading(false)
        onClose()
    }

    const getProductsFilter = async () => {
        setLoading(true)
        const { data } = await api.post('getProductsById', category.filter)
        setFilter(data && data.length > 0 ? data : [])
        setLoading(false)
    }

    useEffect(() => {
        setOptions([])
        if (category.name) getOptions()
        if (category && category.filter && category.filter.products) {
            getProductsFilter()
        } else {
            setFilter([])
        }
    }, [category])

    const removeProduct = async (index: number) => {
        confirm({
            title: 'Deletar',
            icon: <ExclamationCircleFilled />,
            content: 'Deseja remover o produto do filtro ?',
            async onOk() {
                let newIds = category.filter.products.filter((item: any, indexFilter: number) => index != indexFilter)
                setLoading(true)
                const { data, status } = await api.put(`updateCategory`, {
                    ...category,
                    filter: {name: category.filter.name, products: newIds}
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
                console.log('Cancel');
            },
            wrapClassName: 'indexMax'
        });
    };


    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader color="black.800">Adicionar filtro</ModalHeader>
                <ModalCloseButton color="red.700" />
                <ModalBody>
                    <Form
                        onFinish={addFilter}
                        layout='horizontal'
                        initialValues={{
                            name: category.filter?.name || null
                        }}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            marginBottom: 20
                        }}
                    >
                        <Form.Item wrapperCol={{ span: 12 }} label="Nome do filtro" name="name" rules={[{ required: true, message: 'Campo obrigatório' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12 }} label="Produtos" name="products" rules={[{ required: true, message: 'Campo obrigatório' }]}>
                            <Select
                                mode="multiple"
                                options={options}
                                popupClassName='pop-select'
                                style={{ minWidth: 200 }}
                            />
                        </Form.Item>
                        <Center w="100%">
                            <Button size='large' style={{ margin: 'auto' }} htmlType="submit">Adicionar</Button>
                        </Center>
                    </Form>
                    <List
                        header="Produtos"
                        bordered
                        loading={loading}
                        dataSource={filter}
                        renderItem={(item: any, index: number) => (
                            <List.Item actions={[<Icon onClick={() => removeProduct(index)} as={AiFillDelete} fontSize='20px' cursor="pointer" color="red.700" />]}>
                                <Text>{item.name}</Text>
                            </List.Item>
                        )}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
