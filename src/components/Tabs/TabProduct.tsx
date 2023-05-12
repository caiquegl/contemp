import { Box, HStack, Icon, Flex, Button, useToast, Link, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai'
import ContainerAddProduct from '../ContainerAddProduct'
import ContainerAddProductDescription from '../ContainerAddProductDescription'
import { Table } from 'antd'
import { SearchBar } from '../SearchBar'
import { colors } from '../../styles/theme'
import { pxToRem } from '../../utils/pxToRem'
import { replaceNameToUrl } from '../../utils/replaceNameToUrl'
import { api } from '../../lib/axios'

interface IProps {
  back: any
}
const TabProduct = ({back}: IProps) => {
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  })

  const [step, setStep] = useState(1)
  const [list, setList] = useState<any>([])
  const [listClone, setListClone] = useState<any>([])
  const [body, setBody] = useState({})
  const [isUpdate, setIsUpdate] = useState(false)

  const column = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'Categoria',
      render: (a: any, b: any) => <p>{a.category.name}</p>,
      sorter: (a: any, b: any) => a.category.name.localeCompare(b.category.name),
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
      render: (a: any, b: any) => (
        <Link
          href={b.name ? `/produto/${replaceNameToUrl(b.name).replaceAll(' ', '_')}` : ''}
          isExternal={true}
          _hover={{ color: 'black', textDecoration: 'none' }}
        >
          {`https://contemp.com.br/produto/${replaceNameToUrl(b.name).replaceAll(' ', '_')}`}
        </Link>
      ),
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
              setBody(a)
              setIsUpdate(true)
              setStep(2)
            }}
          />
          <Icon cursor='pointer' as={AiOutlineClose} fontSize='17px' color='red.500' onClick={() => deleteProduct(a)} />
        </HStack>
      ),
    },
  ]

  const listProduct = async () => {
    try {
      const { data } = await api.get('getAllProductsWidthCategory')
      setList(data)
      setListClone(data)
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
      const { data, status } = await api.post(`deleteProduct`, product)
      toast({
        title: status == 201 ? 'Sucesso' : 'Erro',
        description: data.msg,
        status: status == 201 ? 'success' : 'error',
      })
      listProduct()
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao deletar produto',
        status: 'error',
      })
    }
  }

  useEffect(() => {
    listProduct()
  }, [])

  const backTab = () => {
    setBody({})
    setStep(1)
  }

  useEffect(() => {
   backTab()
  }, [back])
  return (
    <>
      {step === 1 && (
        <>
          <Box>
            <Text color='black.800' fontSize={'1.5rem'} fontWeight={'black'}>Painel de Produtos</Text>
            <Text color='black.800' fontSize={'1rem'} mb={'5%'}>Gerencie todos os produtos da Contemp de forma prática. Adicione, edite, ative, desative, pesquise ou exclua através do painel. Atenção! Ao excluir um produto não  será possivel recupera-lo.</Text>
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
                setStep(2)
                setIsUpdate(false)
              }}
            >
              Adicionar
            </Button>

            <SearchBar
              inputProps={{
                placeholder: 'Digite o produto...',
                onChange: (evt) => {
                  let newList = listClone.filter((item: any) =>
                    item.name.toLowerCase().includes(evt.target.value.toLowerCase())
                  )
                  setList([...newList])
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

          <Box borderRadius='8px' bg='white' p='30px' w='100%'>
            <Table scroll={{ x: 'fit-content' }} dataSource={list} columns={column} word-wrap={'break-word'}/>
          </Box>
        </>
      )}
      {step === 2 && (
        <>
          <Flex w='100%' alignItems='center' justifyContent='space-between' mb='18px'>
            <Button
              bg='transparent'
              color='black.800'
              fontSize='20px'
              borderRadius='4px'
              w='128px'
              h='47px'
              border='2px solid'
              borderColor='black.800'
              _hover={{ transition: 'all 0.4s' }}
              onClick={() => {
                setBody({})
                setStep(1)
              }}
            >
              Voltar
            </Button>
          </Flex>
          <ContainerAddProduct
            defaultValues={body}
            nextStep={(data: any) => {
              setBody({ ...body, ...data })
              setStep(3)
            }}
          />
        </>
      )}
      {step === 3 && (
        <>
          <Flex w='100%' alignItems='center' justifyContent='space-between' mb='18px'>
            <Button
              bg='transparent'
              color='black.800'
              fontSize='20px'
              borderRadius='4px'
              w='128px'
              h='47px'
              border='2px solid'
              borderColor='black.800'
              _hover={{ transition: 'all 0.4s' }}
              onClick={() => setStep(2)}
            >
              Voltar
            </Button>
          </Flex>
          <ContainerAddProductDescription
            values={body}
            isUpdate={isUpdate}
            reset={() => {
              setStep(1)
              listProduct()
              setIsUpdate(false)
              setBody({})
            }}
          />
        </>
      )}
    </>
  )
}

export default TabProduct
