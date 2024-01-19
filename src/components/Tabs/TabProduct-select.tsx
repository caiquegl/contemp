import { Box, HStack, Icon, Flex, Button, useToast, Link as ChakraLink, Text, Heading, Tooltip, Input } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai'
import ContainerAddProduct from '../ContainerAddProduct'
import ContainerAddProductDescription from '../ContainerAddProductDescription'
import { Table, Select } from 'antd'
import { SearchBar } from '../SearchBar'
import { colors } from '../../styles/theme'
import { pxToRem } from '../../utils/pxToRem'
import { replaceNameToUrl } from '../../utils/replaceNameToUrl'
import { api } from '../../lib/axios'
import { EditOrderTabProduct } from '../EditOrderTabProduct'
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { FiCopy } from 'react-icons/fi'
import { PiInfoDuotone } from "react-icons/pi";
import { PiPencilSimpleBold } from "react-icons/pi"
import { FaDeleteLeft } from 'react-icons/fa6'


interface IProps {
  back: any
}
const TabProduct = ({ back }: IProps) => {
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  })
  function copiarTexto(texto: string) {
    // Cria um elemento de input dinamicamente
    var input = document.createElement('input')

    // Define o valor do input como o texto a ser copiado
    input.value = texto

    // Adiciona o input ao documento
    document.body.appendChild(input)

    // Seleciona o conteúdo do input
    input.select()

    // Copia o conteúdo selecionado para a área de transferência
    document.execCommand('copy')

    // Remove o input do documento
    document.body.removeChild(input)
    toast({
      title: 'Copiado',
      description: 'Link copiado com sucesso.',
      status: 'info',
    })
  }
  const [loading, setLoading] = useState<boolean>(false)

  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);
  const [mostrarSlider, setMostrarSlider] = useState<boolean>(false);

  const [step, setStep] = useState(1)
  const [list, setList] = useState<any>([])
  const [listClone, setListClone] = useState<any>([])
  const [body, setBody] = useState({})
  const [isUpdate, setIsUpdate] = useState(false)

  const changerOrder = async (order: number, category: any) => {
    try {
      setLoading(true)
      const { data, status } = await api.put(`changeOrderProduct`, {
        order,
        product: category,
      })

      toast({
        title: status == 201 ? 'Sucesso' : 'Erro',
        description: data.msg,
        status: status == 201 ? 'success' : 'error',
      })
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao alterar ordem',
        status: 'error',
      })
    } finally {
      setLoading(false)
      await listProduct()
    }
  }

  const column = [
    {
      title: 'Ordem',
      width: 100,
      sorter: (a: any, b: any) => a.order - b.order,
      render: (a: any) => <EditOrderTabProduct value={a} changerOrder={changerOrder} />,
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },

    {
      title: 'Categoria',
      dataIndex: 'category.name',
      key: 'category',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => {
        const { Option } = Select;
    
        const uniqueCategories = [...new Set(list.map((item: any) => item.category.name))];
    
        return (
          <>
            <Select
              showSearch
              placeholder="Filtrar Categoria"
              optionFilterProp="children"
              value={selectedKeys[0]}
              onChange={(value: string | string[]) => {
                setSelectedKeys(value ? [value] : []);
                confirm();
              }}
              filterOption={(input: string, option: any) =>
                option.children && typeof option.children === 'string'
                  ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  : false
              }
              dropdownStyle={{ position: "absolute", zIndex: 1000 }}
              style={{ minWidth: '250px' }}
            >
              {Array.isArray(uniqueCategories) &&
                uniqueCategories.map((category: string, index: number, array: string[]) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
            </Select>
          </>
        );
      },
      onFilter: (value: any, record: any) =>
        record.category.name.toLowerCase().includes(value.toLowerCase()),
      render: (text: any, record: any) => <p>{record.category.name}</p>,
      sorter: (a: any, b: any) => a.category.name.localeCompare(b.category.name),
    },
    
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
      render: (a: any, b: any) => (
        <Button
          as={ChakraLink}
          className='botao-tabelaprodutos'
          href={b.name ? `/produto/${replaceNameToUrl(b.name).toLowerCase().replaceAll(' ', '_')}` : ''}
          isExternal={true}
          _hover={{ color: 'black', textDecoration: 'none' }}
          rightIcon={<Icon as={ExternalLinkIcon} />}
        >
          {`url`}
        </Button>
      ),
    },
    {
      title: 'Ações',
      render: (a: any, b: any) => (
        <HStack spacing='20px'>
          <Tooltip placement='top' label='Editar Produto'
            color={'var(--white-primary)'}
            bg={'var(--red-primary)'}
            borderRadius={'8px'}
            textAlign={'center'}>
            <Box>
              <Icon
                cursor='pointer'
                as={PiPencilSimpleBold}
                fontSize='1.15rem'
                color='var(--gray-text)'
                onClick={() => {
                  setBody(a)
                  setIsUpdate(true)
                  setStep(2)
                }}
              />
            </Box>
          </Tooltip>
          <Tooltip placement='top' label='Copiar'
            color={'var(--white-primary)'}
            bg={'var(--red-primary)'}
            borderRadius={'8px'}
            textAlign={'center'}>
            <Box>
              <FiCopy
                style={{
                  cursor: 'pointer',
                  color: 'var(--gray-text)',
                }}
                onClick={() => copiarTexto(`https://contemp.com.br${b && b.name ? `/produto/${replaceNameToUrl(b.name).toLowerCase().replaceAll(' ', '_')}` : ''}`)}
              />
            </Box>
          </Tooltip>
          <Tooltip placement='top' label='Excluir Produto'
            color={'var(--white-primary)'}
            bg={'var(--red-primary)'}
            borderRadius={'8px'}
            textAlign={'center'}>
            <Box>
              <Icon cursor='pointer' as={FaDeleteLeft}
                fontSize='1.15rem'
                color='var(--gray-text)' onClick={() => deleteProduct(a)} />
            </Box>
          </Tooltip>
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
            <Heading as={'h3'} className='adm-subtitulo text-black negrito'>Painel de Produtos</Heading>
            <Text className='paragrafo-preto' mb={'3%'}>Gerencie todos os produtos da Contemp de forma prática. Adicione, edite, ative, desative, pesquise ou exclua através do painel. Atenção! Ao excluir um produto não  será possivel recupera-lo.</Text>
          </Box>
          <Flex w='100%' alignItems='center' justifyContent='space-between' mb='18px'>
            <Button
              bg='var(--red-primary)'
              color='var(--white-primary)'
              borderRadius='8px'
              w='128px'
              h='40px'
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
            <Table id='tabela-produtos' loading={loading} scroll={{ x: 'fit-content' }} dataSource={list} columns={column} word-wrap={'break-word'} />
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
