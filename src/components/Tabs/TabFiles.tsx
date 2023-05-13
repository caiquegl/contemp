import { Box, HStack, Icon, Flex, Button, useToast, Link, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai'
import { Table } from 'antd'
import { replaceNameToUrl } from '../../utils/replaceNameToUrl'
import { api } from '../../lib/axios'

const TabFiles = () => {
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  })

  const [list, setList] = useState<any>([])

  const column = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'URL',
    },
    {
      title: 'Ação',
      render: (a: any) => (
        <HStack spacing='20px'>
          <Icon
            cursor='pointer'
            as={AiOutlineEdit}
            fontSize='17px'
            onClick={() => {
             
            }}
          />
          <Icon cursor='pointer' as={AiOutlineClose} fontSize='17px' color='red.500' onClick={() => {}} />
        </HStack>
      ),
    },
  ]

  const listFiles = async () => {
    try {
      // const { data } = await api.get('getAllProductsWidthCategory')
      // setList(data)
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao listar produtos',
        status: 'error',
      })
    }
  }

  const deleteProduct = async (product: any) => {
    try {
      // toast({
      //   title: status == 201 ? 'Sucesso' : 'Erro',
      //   description: data.msg,
      //   status: status == 201 ? 'success' : 'error',
      // })
      listFiles()
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao deletar produto',
        status: 'error',
      })
    }
  }

  useEffect(() => {
    listFiles()
  }, [])

  return (
    <>
          <Box>
            <Text color='black.800' fontSize={'1.5rem'} fontWeight={'black'}>Painel de Documentos</Text>
            <Text color='black.800' fontSize={'1rem'} mb={'5%'}>Gerencie todos os documentos da Contemp de forma prática. Adicione, edite, ative, desative, pesquise ou exclua através do painel. Atenção! Ao excluir um documento não  será possivel recupera-lo.</Text>
          </Box>
          <Flex w='100%' alignItems='center' justifyContent='space-between' mb='18px'>
            <Button
              bg='red.600'
              color='white'
              fontSize='20px'
              borderRadius='4px'
              w='128px'
              h='47px'
              _hover={{ transition: 'all 0.4s' }}
              onClick={() => {
               
              }}
            >
              Adicionar
            </Button>
          </Flex>

          <Box borderRadius='8px' bg='white' p='30px' w='100%'>
            <Table scroll={{ x: 'fit-content' }} dataSource={list} columns={column} word-wrap={'break-word'}/>
          </Box>
        
    </>
  )
}

export default TabFiles
