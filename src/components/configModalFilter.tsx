import { Button, Input, Popover, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { SettingOutlined } from '@ant-design/icons'
import { RiDeleteBinLine } from 'react-icons/ri'
import { api } from '../lib/axios'
import { useToast } from '@chakra-ui/react'

const ConfigModalFilter = ({ filter, setFilter, index, category }: any) => {
  const toast = useToast()

  const [editName, setEditName] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    setEditName('')
  }, [open])
  return (
    <Space size={20}>
      <Popover
      open={open}
        content={() => (
          <>
            <Input
              value={editName}
              onChange={async (evt: any) => {
                let value = evt.target.value
                setEditName(value)
              }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}
            >
              <Button
                onClick={async () => {
                  if(!editName) return toast({
                    title: 'Erro',
                    description: 'Erro, o nome não pode ser vazio.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  })
                  let newFilter = filter
                  newFilter[index].name = editName
                  setFilter([...newFilter])
                  const { data, status } = await api.put(`updateCategory`, {
                    ...category,
                    filter: newFilter,
                  })
                  setOpen(!open)
                }}
                style={{
                  margin: 'auto',
                }}
              >
                Salvar
              </Button>
            </div>
          </>
        )}
        title='Editar título'
        zIndex={999999999999999999999999999999999999999999999999}
      >
        <SettingOutlined onClick={() => setOpen(!open)} />
      </Popover>
      <RiDeleteBinLine
        onClick={async () => {
          let newFilter: any = []
          filter.forEach((el: any, indexR: number) => {
            if (index != indexR) newFilter.push(el)
          })
          setFilter([...newFilter])
          const { data, status } = await api.put(`updateCategory`, {
            ...category,
            filter: newFilter,
          })
        }}
        style={{
          margin: 'auto',
        }}
      />
    </Space>
  )
}

export default ConfigModalFilter
