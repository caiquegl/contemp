import { Box, HStack, Icon, Flex, Button, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai'
import { deleteDoc } from 'firebase/firestore'
import ContainerAddProduct from '../ContainerAddProduct'
import ContainerAddProductDescription from '../ContainerAddProductDescription'
import { initFirebase } from '../../utils/db'
import { useAuth } from '../../contextAuth/authContext'
import { Table } from 'antd'
import { SearchBar } from '../SearchBar'
import { colors } from '../../styles/theme'
import { pxToRem } from '../../utils/pxToRem'

const TabProduct = () => {
  initFirebase()
  const toast = useToast({
    duration: 3000,
    isClosable: true
  })
  const { allCategory, allProducts, reload, reloadProduct } = useAuth()

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
      sorter: (a: any, b: any) => a.name.localeCompare(b.name)
    },
    {
      title: 'Categoria',
      dataIndex: 'nameCategory',
      key: 'nameCategory',
      sorter: (a: any, b: any) => a.nameCategory.localeCompare(b.nameCategory)
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url'
    },
    {
      title: 'Ação',
      render: (a: any) => (
        <HStack spacing="20px">
          <Icon
            cursor="pointer"
            as={AiOutlineEdit}
            fontSize="17px"
            onClick={() => {
              setBody(a)
              setIsUpdate(true)
              setStep(2)
            }}
          />
          <Icon
            cursor="pointer"
            as={AiOutlineClose}
            fontSize="17px"
            color="red.500"
            onClick={() => deleteProduct(a)}
          />
        </HStack>
      )
    }
  ]

  const listProduct = async () => {
    try {
      let newList: any = []

      allProducts.forEach((el: any) => {
        newList.push({
          ...el,
          nameCategory: allCategory.find((cg: any) => cg.id === el.category)
            .name
        })
      })

      let list = await reloadProduct()

      let sortList = await list.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      )
      setList(sortList)
      setListClone(sortList)
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao listar produtos',
        status: 'error'
      })
    }
  }

  const deleteProduct = async (product: any) => {
    try {
      await deleteDoc(product.ref)
      toast({
        title: 'Sucesso',
        description: 'Produto deletado com sucesso.',
        status: 'success'
      })
      reload()
      listProduct()
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao deletar produto',
        status: 'error'
      })
    }
  }

  useEffect(() => {
    listProduct()
  }, [allProducts, allCategory])

  useEffect(() => {
    reload()
    listProduct()
  }, [step])

  return (
    <>
      {step === 1 && (
        <>
          <Flex
            w="100%"
            alignItems="center"
            justifyContent="space-between"
            mb="18px"
          >
            <Button
              bg="red.600"
              color="white"
              fontSize="20px"
              borderRadius="4px"
              w="128px"
              h="47px"
              _hover={{ transition: 'all 0.4s', opacity: 0.7 }}
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
                    item.name
                      .toLowerCase()
                      .includes(evt.target.value.toLowerCase())
                  )
                  setList(newList)
                },
                _placeholder: {
                  color: 'black.800',
                  opacity: '50%'
                }
              }}
              containerProps={{
                bg: 'white.500',
                border: '1px solid',
                borderColor: 'black.800',
                color: colors.black[800],
                maxW: pxToRem(288)
              }}
            />
          </Flex>

          <Box borderRadius="8px" bg="white" p="30px" w="100%">
            <Table dataSource={list} columns={column} />
          </Box>
        </>
      )}
      {step === 2 && (
        <>
          <Flex
            w="100%"
            alignItems="center"
            justifyContent="space-between"
            mb="18px"
          >
            <Button
              bg="transparent"
              color="black.800"
              fontSize="20px"
              borderRadius="4px"
              w="128px"
              h="47px"
              border="2px solid"
              borderColor="black.800"
              _hover={{ transition: 'all 0.4s', opacity: 0.7 }}
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
          <Flex
            w="100%"
            alignItems="center"
            justifyContent="space-between"
            mb="18px"
          >
            <Button
              bg="transparent"
              color="black.800"
              fontSize="20px"
              borderRadius="4px"
              w="128px"
              h="47px"
              border="2px solid"
              borderColor="black.800"
              _hover={{ transition: 'all 0.4s', opacity: 0.7 }}
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
