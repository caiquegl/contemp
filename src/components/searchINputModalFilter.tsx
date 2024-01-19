import React, { useState } from 'react'
import { Button, Form, Select } from 'antd'
import { Center, Heading } from '@chakra-ui/react'

const SearchINputModalFilter = ({ options, addProduct }: any) => {
  const [filter, setFilter] = useState<string>('')

  const handleFilter = (inputValue: any, option: any) => {
    // Verifica se o valor digitado está contido na opção
    return option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
  }

  return (
    <Form
      onFinish={(body) => addProduct(body)}
      layout='horizontal'
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: 20,
      }}
    >
      <Form.Item label='Produtos' name='products' rules={[{ required: true, message: 'Campo obrigatório' }]}>
        <Select
          mode='multiple'
          options={options}
          popupClassName='pop-select'
          style={{ minWidth: 200 }}
          filterOption={handleFilter}
          onSearch={setFilter}
          searchValue={filter}
        />
      </Form.Item>
      <Center w='100%'>
        <Button size='large' style={{ margin: 'auto' }} htmlType='submit'>
          Adicionar produto
        </Button>
      </Center>
    </Form>
  )
}

export default SearchINputModalFilter
