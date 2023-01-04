import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Icon,
  useToast,
  VStack
} from '@chakra-ui/react'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react'
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai'
import { database, initFirebase } from '../../utils/db/index'
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc
} from 'firebase/firestore'
import { InputDefault } from '../Form/Input'
import { useForm } from 'react-hook-form'
import { SelectDefault } from '../Form/Select'
import { TextareaDefault } from '../Form/Textarea'
import { EditOrder } from '../EditOrder'
import InputsHome from '../ContainerHome/inputs'
import { ViewImage } from '../ContainerAddProduct/ViewImage'
import { useAuth } from '../../contextAuth/authContext'
import { Modal, Table } from 'antd'
import { SearchBar } from '../SearchBar'
import { colors } from '../../styles/theme'
import { pxToRem } from '../../utils/pxToRem'

const { confirm } = Modal;

interface IBody {
  name: string
  is_main?: string
  sub_categorie?: string
  description: string
  favorite: boolean
}

const TabCategory = () => {
  const toast = useToast({
    duration: 3000,
    isClosable: true
  })

  initFirebase()
  const { allCategory, reload, reloadCategory } = useAuth()

  const [update, setUpdate] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [url, setUrl] = useState('')
  const [list, setList] = useState<any>([])
  const [listClone, setListClone] = useState<any>([])
  const formRef = useRef<any>()

  const { register, handleSubmit, formState, reset, watch, setValue } = useForm(
    {}
  )

  const { errors } = formState

  const saveCategory = async (bodyForm: any) => {
    try {
      bodyForm = { ...bodyForm, url }
      if (Object.keys(update).length > 0) {
        updateCategory(bodyForm)
        return
      }
      setLoading(true)

      const dbInstance = collection(database, 'categories')
      let exist = false
      let order: any = 0
      const q = query(dbInstance, orderBy('order', 'desc'), limit(1))
      const qExist = query(
        dbInstance,
        where('name', '==', bodyForm.name),
        limit(1)
      )

      await getDocs(q).then((data) => {
        if (data.docs.length === 0) return
        order = data.docs[0].data().order
      })

      await getDocs(qExist).then((data) => {
        if (data.docs.length > 0) exist = true
      })

      if (!exist) {
        await addDoc(dbInstance, {
          ...bodyForm,
          favorite: isFavorite,
          is_active: isActive,
          order: order + 1
        })

        toast({
          title: 'Sucesso',
          description: 'Categoria cadastrada com sucesso.',
          status: 'success'
        })
        setUrl('')
        setUpdate({} as IBody)
      } else {
        toast({
          title: 'Erro',
          description: 'Categoria já existe',
          status: 'error'
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Erro',
        description: 'Erro ao salvar categoria',
        status: 'error'
      })
    } finally {
      reset()
      await reload()
      let newList = await reloadCategory()
      await listCategory(newList)
      setLoading(false)
    }
  }

  const updateProducts = async (id: any) => {
    const dbInstanceUpdate = doc(database, 'products', id)
    await updateDoc(dbInstanceUpdate, {
      category: 'ZGRgyNWLIzLRqjwqcdPF'
    })
  }

  const updateHome = async (id: any) => {
    const dbInstanceUpdate = doc(database, 'home', id)
    await updateDoc(dbInstanceUpdate, {
      category: 'ZGRgyNWLIzLRqjwqcdPF'
    })
  }

  const updateCategory = async (bodyForm: any) => {
    try {
      setLoading(true)
      const dbInstance = collection(database, 'categories')
      let exist = false
      const qExist = query(
        dbInstance,
        where('name', '==', bodyForm.name),
        limit(1)
      )

      await getDocs(qExist).then((data) => {
        if (data.docs.length > 0 && data.docs[0]?.data().order != update.order)
          exist = true
      })

      if (!exist) {
        const dbInstanceUpdate = doc(database, 'categories', update.id)
        await updateDoc(dbInstanceUpdate, {
          ...bodyForm,
          favorite: isFavorite,
          is_active: isActive
        })
        setUpdate({})

        toast({
          title: 'Sucesso',
          description: 'Categoria atualizada com sucesso.',
          status: 'success'
        })
        setUrl('')
        setUpdate({} as IBody)
      } else {
        toast({
          title: 'Erro',
          description: 'Categoria já existe',
          status: 'error'
        })
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar categoria',
        status: 'error'
      })
    } finally {
      reset()
      await reload()
      let newList = await reloadCategory()
      await listCategory(newList)
      setLoading(false)

    }
  }

  const listCategory = async (list?: any) => {
    try {
      let newList = list ? list.sort((a: any, b: any) => a.order < b.order) : allCategory.sort((a: any, b: any) => a.order < b.order)
      setListClone([...newList])
      setList([...newList])
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao listar categoria',
        status: 'error'
      })
    }
  }

  const deleteAllCategory = async (category: any) => {
    setLoading(true)
    const dbInstanceCategory = collection(database, 'categories')
    const qExistCategory = query(
      dbInstanceCategory,
      where('sub_categorie', '==', category.id),
    )

    await getDocs(qExistCategory).then(async (categFather) => {

      for await (let [i, categ] of categFather.docs.entries()) {
        // primeira categoria

        const db2Category = collection(database, 'categories')
        const q2Category = query(
          db2Category,
          where('sub_categorie', '==', categFather.docs[i].id),
        )

        await getDocs(q2Category).then(async (categ2Father) => {
          for await (let [i2, categ2] of categ2Father.docs.entries()) {

            const db2Product = collection(database, 'products')
            const q2Product = query(
              db2Product,
              where('category', '==', categ2Father.docs[i2].id),
            )

            await getDocs(q2Product).then(async (prod2Father) => {
              for await (let [iProd2, prod2] of prod2Father.docs.entries()) {
                await updateProducts(prod2Father.docs[iProd2].id)
              }
            })

            const db2Home = collection(database, 'home')
            const q2Home = query(
              db2Home,
              where('category', '==', categ2Father.docs[i2].id),
            )
            await getDocs(q2Home).then(async (home2Father) => {
              for await (let [ihome2, home2] of home2Father.docs.entries()) {
                await updateHome(home2Father.docs[ihome2])
              }
            })
            await deleteDoc(categ2Father.docs[i2].ref)
          }
        })

        const dbProduct = collection(database, 'products')
        const qProduct = query(
          dbProduct,
          where('category', '==', categFather.docs[i].id),
        )

        await getDocs(qProduct).then(async (prod2Father) => {
          for await (let [iProd2, prod2] of prod2Father.docs.entries()) {
            await updateProducts(prod2Father.docs[iProd2].id)
          }
        })

        const dbHome = collection(database, 'home')
        const qHome = query(
          dbHome,
          where('category', '==', categFather.docs[i].id),
        )
        await getDocs(qHome).then(async (home2Father) => {
          for await (let [ihome2, home2] of home2Father.docs.entries()) {
            await updateHome(home2Father.docs[ihome2].id)
          }
        })

        await deleteDoc(categFather.docs[i].ref)
      }
    })

    const dbFatherProduct = collection(database, 'products')
    const qfatherProduct = query(
      dbFatherProduct,
      where('category', '==', category.id),
    )

    await getDocs(qfatherProduct).then(async (prod2Father) => {
      for await (let [iProd2, prod2] of prod2Father.docs.entries()) {
        await updateProducts(prod2Father.docs[iProd2].id)
      }
    })

    const dbFatherHome = collection(database, 'home')
    const qFatherHome = query(
      dbFatherHome,
      where('category', '==', category.id),
    )
    await getDocs(qFatherHome).then(async (home2Father) => {
      for await (let [ihome2, home2] of home2Father.docs.entries()) {
        await updateHome(home2Father.docs[ihome2].id)

      }
    })
    await deleteDoc(category.ref)
    setLoading(false)
    toast({
      title: 'Sucesso',
      description: 'Categoria deletada com sucesso.',
      status: 'success'
    })

    reset()
    await reload()
    let newList = await reloadCategory()
    await listCategory(newList)
  }

  const changerOrder = async (order: number, ref: any) => {
    try {
      const dbInstance = collection(database, 'categories')
      const qExist = query(dbInstance, where('order', '==', order), limit(1))

      let sub: any = {}

      await getDocs(qExist).then((data) => {
        data.docs.forEach((doc) => {
          sub = { ...doc.data(), id: doc.id, ref: doc.ref }
        })
      })

      if (Object.keys(sub).length > 0) {
        const dbInstanceUpdate = doc(database, 'categories', sub.id)
        await updateDoc(dbInstanceUpdate, { order: parseInt(ref.order) })
      }

      const dbInstanceUpdate = doc(database, 'categories', ref.id)
      await updateDoc(dbInstanceUpdate, { order: order })
      await listCategory()
      toast({
        title: 'Sucesso',
        description: 'Sucesso ao alterar ordem.',
        status: 'success'
      })
      await reload()
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao alterar ordem',
        status: 'error'
      })
    }
  }

  useEffect(() => {
    async function getCategoryList() {
      await listCategory()
    }

    getCategoryList()
  }, [])

  const handleOnEditClick = (category: any) => {
    setValue('name', category.name)
    setValue('is_main', category.is_main)
    setValue('description', category.description)
    setValue('favorite', category.favorite)
    setValue('key_word_seo', category.key_word_seo)
    setValue('description_seo', category.description_seo)
    setIsFavorite(category.favorite)
    setIsActive(category.is_active)
    setUpdate(category)
    setUrl(category.url ? category.url : '')

    if (category.sub_categorie)
      setValue('sub_categorie', category.sub_categorie)
  }

  const column = [
    {
      title: 'Order',
      render: (a: any) => <EditOrder value={a} changerOrder={changerOrder} />
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name)
    },
    {
      title: 'Ações',
      render: (a: any) => (
        <>
          {a.id != 'ZGRgyNWLIzLRqjwqcdPF' &&
            <HStack spacing="20px">
              <Icon
                cursor="pointer"
                as={AiOutlineEdit}
                fontSize="17px"
                onClick={() => handleOnEditClick(a)}
              />
              <Icon
                cursor="pointer"
                as={AiOutlineClose}
                fontSize="17px"
                color="red.500"
                onClick={() => {
                  confirm({
                    title: 'ATENÇÃO',
                    icon: <ExclamationCircleOutlined />,
                    content: 'Você está prestes a pagar todas as sub categorias e produtos vinculados a essa categoria, você tem certeza disso ?',
                    onOk() {
                      deleteAllCategory(a)
                    },
                    onCancel() {
                      console.log('Cancel');
                    },
                  });

                }}
              />
            </HStack>
          }
        </>

      )
    }
  ]

  const categoryOptions = listClone?.map((value: any) => {
    return {
      name: value.name,
      value: value.id
    }
  })

  const isMainOptions = [
    { name: 'SIM', value: 'true' },
    { name: 'NÃO', value: 'false' }
  ]

  return (
    <>
      <Flex w="100%" alignItems="center" justifyContent="flex-end" mb="18px">
        <SearchBar
          inputProps={{
            placeholder: 'Digite a categoria...',
            onChange: (evt) => {
              let newList = listClone.filter((item: any) =>
                item.name.toLowerCase().includes(evt.target.value.toLowerCase())
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
      <HStack spacing="20px" alignItems="flex-start">
        <Box borderRadius="8px" bg="white" p="30px" w="100%">
          <Table dataSource={loading ? [] : list} columns={column} loading={loading} />
        </Box>
        <Box
          borderRadius="8px"
          bg="white"
          p="30px"
          w="379px"
          as="form"
          onSubmit={handleSubmit(saveCategory)}
          ref={formRef}
        >
          <VStack spacing="20px" w="100%">
            <InputDefault
              label="Nome da categoria"
              type="text"
              error={errors.name}
              {...register('name', { required: 'Nome é obrigatório' })}
            />
            <SelectDefault
              label="É principal?"
              error={errors.is_main}
              opt={isMainOptions}
              {...register('is_main', { required: 'Campo obrigatório' })}
            />
            {watch().is_main === 'false' && (
              <SelectDefault
                label="Selecione a categoria"
                error={errors.sub_categorie}
                opt={categoryOptions}
                {...register('sub_categorie', {
                  required: 'Campo obrigatório'
                })}
              />
            )}
            <TextareaDefault
              label="Descrição"
              error={errors.description}
              {...register('description', {
                required: 'Descrição é obrigatório'
              })}
            />
            <TextareaDefault
              label="Descrição SEO"
              error={errors.description_seo}
              {...register('description_seo', {
                required: 'Descrição é obrigatório'
              })}
            />
            <TextareaDefault
              label="Key Word SEO"
              error={errors.key_word_seo}
              {...register('key_word_seo', {
                required: 'Key Word Seo é obrigatório'
              })}
            />
            <InputsHome
              name="Foto do icone"
              typeInput="fileSingle"
              getUrls={(values: any) => setUrl(values)}
            />
            <HStack spacing="20px" flexWrap="wrap" w="100%">
              {url && (
                <ViewImage
                  url={url}
                  remove={() => {
                    setUrl('')
                  }}
                />
              )}
            </HStack>
            <Box w="100%">
              <Checkbox
                colorScheme="red"
                color="black.800"
                mr="auto"
                fontSize="20px"
                height="17px"
                isChecked={isFavorite}
                onChange={(evt) => setIsFavorite(evt.target.checked)}
              >
                Categoria destaque
              </Checkbox>
            </Box>

            <Box w="100%" mt="10px">
              <Checkbox
                colorScheme="red"
                color="black.800"
                mr="auto"
                fontSize="20px"
                height="17px"
                isChecked={isActive}
                onChange={(evt) => setIsActive(evt.target.checked)}
              >
                Ativo
              </Checkbox>
            </Box>
          </VStack>
          <Flex
            alignItems="center"
            justifyContent={
              Object.keys(update).length > 0 ? 'space-between' : 'flex-end'
            }
            mt="53px"
            w="100%"
          >
            {Object.keys(update).length > 0 && (
              <Button
                ml="auto"
                bg="transparent"
                color="black.800"
                fontSize="20px"
                borderRadius="4px"
                borderColor="black.800"
                borderWidth="1px"
                w="88px"
                h="47px"
                isLoading={loading}
                _hover={{ transition: 'all 0.4s', opacity: 0.7 }}
                onClick={() => {
                  setUpdate({})
                  setUrl('')
                  reset()
                }}
                type="button"
              >
                Cancelar
              </Button>
            )}
            <Button
              ml="auto"
              bg="red.600"
              color="white"
              fontSize="20px"
              borderRadius="4px"
              w="128px"
              h="47px"
              isLoading={loading}
              _hover={{ transition: 'all 0.4s', opacity: 0.7 }}
              type="submit"
            >
              Salvar
            </Button>
          </Flex>
        </Box>
      </HStack>
    </>
  )
}

export default TabCategory
