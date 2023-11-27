import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  InputGroup,
  Select,
  useToast,
  VStack,
  Text,
  Tooltip,
  Heading,
  Stack,
  Link as ChakraLink,
  Menu as ChakraMenu, MenuItem as ChakraMenuItem, MenuButton as ChakraMenuButton, MenuList as ChakraMenuList
} from '@chakra-ui/react'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai'
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { replaceNameToUrl } from '../../utils/replaceNameToUrl'
import { FaDeleteLeft } from 'react-icons/fa6'
import { v4 as uuidv4 } from 'uuid'
import { InputDefault } from '../Form/Input'
import { Controller, useForm } from 'react-hook-form'
import { TextareaDefault } from '../Form/Textarea'
import { EditOrder } from '../EditOrder'
import InputsHome from '../ContainerHome/inputs'
import { ViewImage } from '../ContainerAddProduct/ViewImage'
import { Badge, Modal, Table } from 'antd'
import { SearchBar } from '../SearchBar'
import { colors } from '../../styles/theme'
import { pxToRem } from '../../utils/pxToRem'
import { AsyncSelect, chakraComponents } from 'chakra-react-select'
import { api } from '../../lib/axios'
import { EditOrderProduct } from '../EditOrderProduct'
import { BiFilterAlt } from 'react-icons/bi'
import { FiHelpCircle } from 'react-icons/fi'
import { PiInfoDuotone } from "react-icons/pi";
import { PiPencilSimpleBold } from "react-icons/pi"
import { ModalAddFilter } from '../modalAddFilter'
import { FiCopy } from 'react-icons/fi';
import { FaAngleDown } from "react-icons/fa";
import saveAs from 'file-saver';
import ExcelJS from 'exceljs';


const { confirm } = Modal

interface IBody {
  id?: number
  name: string
  is_main?: string
  sub_category_id?: string
  description: string
  favorite: boolean
}

const asyncComponents = {
  LoadingIndicator: (props: any) => (
    <chakraComponents.LoadingIndicator
      // The color of the main line which makes up the spinner
      // This could be accomplished using `chakraStyles` but it is also available as a custom prop
      color='currentColor' // <-- This default's to your theme's text color (Light mode: gray.700 | Dark mode: whiteAlpha.900)
      // The color of the remaining space that makes up the spinner
      emptyColor='transparent'
      // The `size` prop on the Chakra spinner
      // Defaults to one size smaller than the Select's size
      spinnerSize='md'
      // A CSS <time> variable (s or ms) which determines the time it takes for the spinner to make one full rotation
      speed='0.45s'
      // A CSS size string representing the thickness of the spinner's line
      thickness='2px'
      // Don't forget to forward the props!
      {...props}
    />
  ),
}

const TabCategory = () => {
  const toast = useToast({
    duration: 3000,
    isClosable: true,
  })
  const [openFilter, setOpenFiter] = useState<boolean>(false)
  const [update, setUpdate] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [isAllProduct, setIsAllProduct] = useState(true)
  const [url, setUrl] = useState('')
  const [urlPicture, setUrlPicture] = useState('')
  const [idSelected, setIdSelected] = useState<any>()
  const [list, setList] = useState<any>([])
  const [listClone, setListClone] = useState<any>([])
  const [selectCategory, setSelectCategory] = useState<any>({})
  const formRef = useRef<any>()
  const { register, handleSubmit, formState, reset, watch, setValue, control } = useForm({})
  const { errors } = formState

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

  const saveCategory = async (bodyForm: any) => {
    try {
      if (bodyForm.sub_category_id) bodyForm = { ...bodyForm, sub_category_id: bodyForm.sub_category_id.value }
      bodyForm = { ...bodyForm, url, urlPicture }
      if (bodyForm.is_main == 'true') delete bodyForm.sub_category_id

      if (Object.keys(update).length > 0) {
        updateCategory(bodyForm)
        return
      }
      setLoading(true)
      const { data, status } = await api.post(`saveCategory`, {
        ...bodyForm,
        favorite: isFavorite,
        is_active: isActive,
        all_product: isAllProduct,
      })

      toast({
        title: status == 201 ? 'Sucesso' : 'Erro',
        description: data.msg,
        status: status == 201 ? 'success' : 'error',
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao salvar categoria',
        status: 'error',
      })
    } finally {
      reset()
      await listCategory()
      setLoading(false)
    }
  }

  const updateCategory = async (bodyForm: any) => {
    try {
      setLoading(true)
      if (bodyForm.is_main == 'true') delete bodyForm.sub_category_id
      const { data, status } = await api.put(`updateCategory`, {
        ...bodyForm,
        favorite: isFavorite,
        is_active: isActive,
        id: idSelected,
        all_product: isAllProduct,
      })

      toast({
        title: status == 201 ? 'Sucesso' : 'Erro',
        description: data.msg,
        status: status == 201 ? 'success' : 'error',
      })

      setUpdate({})
      setUrl('')
      setUrlPicture('')
      setIdSelected(undefined)
      setUpdate({} as IBody)
    } catch (error) {
      console.log(error)
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar categoria',
        status: 'error',
      })
    } finally {
      reset()
      await listCategory()
      setLoading(false)
    }
  }

  const listCategory = async (list?: any) => {
    try {
      const { data } = await api.get('getAllCategory')

      let newList = list
        ? list.sort((a: any, b: any) => a.order < b.order)
        : data.sort((a: any, b: any) => a.order < b.order)
      setListClone([...newList])
      setList([...newList])
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao listar categoria',
        status: 'error',
      })
    }
  }

  const deleteAllCategory = async (category: any) => {
    setLoading(true)
    const { data, status } = await api.post(`deleteCategory`, category)
    toast({
      title: status == 201 ? 'Sucesso' : 'Erro',
      description: data.msg,
      status: status == 201 ? 'success' : 'error',
    })
    setLoading(false)
    reset()
    await listCategory()
  }

  const changerOrder = async (order: number, category: any) => {
    try {
      setLoading(true)
      const { data, status } = await api.put(`changeOrderCategory`, {
        order,
        category: category,
      })

      toast({
        title: status == 201 ? 'Sucesso' : 'Erro',
        description: data.msg,
        status: status == 201 ? 'success' : 'error',
      })
      reset()
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao alterar ordem',
        status: 'error',
      })
    } finally {
      setLoading(false)
      await listCategory()
    }
  }

  const changerOrderProducts = async (order: number, category: any) => {
    try {
      setLoading(true)
      const { data, status } = await api.put(`changeOrderCategoryProduct`, {
        order_all_products: order,
        category: category,
      })

      toast({
        title: status == 201 ? 'Sucesso' : 'Erro',
        description: data.msg,
        status: status == 201 ? 'success' : 'error',
      })
      reset()
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Erro ao alterar ordem',
        status: 'error',
      })
    } finally {
      setLoading(false)
      await listCategory()
    }
  }

  useEffect(() => {
    async function getCategoryList() {
      await listCategory()
    }

    getCategoryList()
  }, [])

  const handleOnEditClick = async (category: any) => {
    setValue('name', category.name)
    setValue('is_main', category.is_main.toString())
    setValue('description', category.description)
    setValue('favorite', category.favorite)
    setValue('key_word_seo', category.key_word_seo)
    setValue('description_seo', category.description_seo)
    setIsFavorite(category.favorite)
    setIsActive(category.is_active)
    setIsAllProduct(category.all_product)
    setUpdate(category)
    setUrl(category.url ? category.url : '')
    setUrlPicture(category.urlPicture ? category.urlPicture : '')
    setIdSelected(category.id)

    const { data } = await api.get(`${category?.sub_category_id}/getCategoryById`)

    if (data.id) {
      setValue('sub_category_id', { value: data.id, label: data.name })
    }
  }

  const column = [
    {
      title: 'Ordem Geral',
      width: 100,
      sorter: (a: any, b: any) => a.order - b.order,
      render: (a: any) => <EditOrder value={a} changerOrder={changerOrder} />,
    },
    {
      title: 'Ordem em todos produtos',
      width: 200,
      sorter: (a: any, b: any) => {
        const orderA = a.order_all_products ?? 999999
        const orderB = b.order_all_products ?? 999999
        return orderA - orderB
      },
      render: (a: any) => <EditOrderProduct value={a} changerOrder={changerOrderProducts} />,
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
      render: (a: any, b: any) => (
        <Button
          as={ChakraLink}
          className='botao-tabelaprodutos'
          href={b.name ? `/category/${replaceNameToUrl(b.name).toLowerCase().replaceAll(' ', '_')}` : ''}
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
      render: (a: any) => (
        <>
          {a.name != 'CATEGORY_SECUNDARY' && (
            <HStack spacing='20px'>
              <Tooltip placement='top' label='Filtros'
                color={'var(--white-primary)'}
                bg={'var(--red-primary)'}
                borderRadius={'8px'}
                textAlign={'center'}>
                <Box>
                  <Badge count={Array.isArray(a.filter) ? a.filter.length : 0} size='small' color='var(--red-primary)' >
                    <Icon
                      cursor='pointer'
                      as={BiFilterAlt}
                      fontSize='1.15rem'
                      onClick={() => {
                        setSelectCategory(a)
                        setOpenFiter(!openFilter)
                      }}
                    />
                  </Badge>
                </Box>
              </Tooltip>

              <Tooltip placement='top' label='Editar Categoria'
                color={'var(--white-primary)'}
                bg={'var(--red-primary)'}
                borderRadius={'8px'}
                textAlign={'center'}>
                <Box>
                  <Icon cursor='pointer' as={PiPencilSimpleBold} fontSize='1.15rem' onClick={() => handleOnEditClick(a)} color='var(--gray-text)' />
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
                  onClick={() =>
                    copiarTexto(
                      `https://contemp.com.br${a && a.name ? `/category/${replaceNameToUrl(a.name).toLowerCase().replaceAll(' ', '_')}` : ''}`
                    )
                  }
                />
                </Box>
              </Tooltip>
              <Tooltip placement='top' label='Excluir Categoria'
                color={'var(--white-primary)'}
                bg={'var(--red-primary)'}
                borderRadius={'8px'}
                textAlign={'center'}>
              <Box>
              <Icon
                cursor='pointer'
                as={FaDeleteLeft}
                fontSize='1.15rem'
                color='var(--gray-text)'
                onClick={() => {
                  confirm({
                    title: 'ATENÇÃO',
                    icon: <ExclamationCircleOutlined />,
                    content:
                      'Você está prestes a pagar todas as sub categorias e produtos vinculados a essa categoria, você tem certeza disso ?',
                    onOk() {
                      deleteAllCategory(a)
                    },
                    onCancel() {
                      console.log('Cancel')
                    },
                  })
                }}
              />
              </Box>
              </Tooltip>
            </HStack>
          )}
        </>
      ),
    },
  ]

  const categoryOptions = listClone?.map((value: any) => {
    return {
      name: value.name,
      value: value.id,
    }
  })

  const isMainOptions = [
    { name: 'SIM', value: 'true' },
    { name: 'NÃO', value: 'false' },
  ]

  const exportarCSV = () => {
    // Obtenha os dados das categorias
    const categorias = listClone;
  
    // Crie o conteúdo CSV
    const csvContent = [
      'Ordem Geral,Ordem em todos produtos,Nome,Url',
      ...categorias.map((categoria: any) => `${categoria.order},${categoria.order_all_products},${categoria.name},https://contemp.com.br/category/${replaceNameToUrl(categoria.name).toLowerCase().replaceAll(' ', '_')},`),
    ].join('\n');
    
  
    // Crie um Blob com o conteúdo CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
    // Crie um link de download e clique nele para baixar o arquivo
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "categorias.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Categorias');
  
    // Adicione cabeçalhos
    sheet.addRow(['Ordem Geral', 'Ordem em todos produtos', 'Nome', 'Url']);
  
    // Adicione dados
    list.forEach((categoria: any) => {
      sheet.addRow([
        categoria.order,
        categoria.order_all_products,
        categoria.name,
        `https://contemp.com.br/category/${replaceNameToUrl(categoria.name).toLowerCase().replaceAll(' ', '_')}`,
      ]);
    });
  
    // Crie um Blob a partir do workbook
    const blob = await workbook.xlsx.writeBuffer();
  
    // Use a biblioteca file-saver para salvar o Blob como um arquivo Excel
    saveAs(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'categorias_export.xlsx');
  };
  

  return (
    <>
      <Flex w='100%' alignItems='center' justifyContent='space-between' mb='18px'>
        <Box w={'60%'}>
          <Heading as={'h3'} className='adm-subtitulo text-black negrito'>
            Categorias & Subcategorias
          </Heading>
          <Text className='paragrafo-preto' mb={'3%'} mr={'5%'}>
            Gerencie todas as categorias do site. Aqui pode adicionar, ativar, desativar, exluir ou editar de forma
            prática.
          </Text>
        </Box>
        <Stack direction='row' spacing={6}>
        <ChakraMenu>
                <ChakraMenuButton
                  as={Button}
                  bg='var(--red-primary)'
                  color='var(--white-primary)'
                  borderRadius='8px'
                  w='280px'
                  h='40px'
                  rightIcon={<FaAngleDown />}
                  _hover={{ transition: 'all 0.4s' }}
                  _focus={{backgroundColor: 'var(--red-primary)!important',}}
                >
                  Exportar Produtos 
                </ChakraMenuButton>
                <ChakraMenuList color={'#242424'}>
                  <ChakraMenuItem onClick={() => exportarCSV()}>
                    Exportar em CSV
                  </ChakraMenuItem>
                  <ChakraMenuItem onClick={() => exportExcel()}>
                    Exportar XSLX
                  </ChakraMenuItem>
                </ChakraMenuList>
              </ChakraMenu>
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
        </Stack>
      </Flex>
      <HStack spacing='20px' alignItems='flex-start'>
        <Box borderRadius='8px' bg='white' p='30px' w='100%'>
          <Table id='tabela-categoria' scroll={{ x: 'fit-content' }} dataSource={loading ? [] : list} columns={column} loading={loading} />
        </Box>
        <Box
          borderRadius='8px'
          bg='white'
          p='30px'
          w='379px'
          as='form'
          onSubmit={handleSubmit(saveCategory)}
          ref={formRef}
        >
          <VStack spacing='20px' w='100%'>
            <FormControl>
              <InputDefault
                label='Nome da categoria'
                type='text'
                question="O nome da categoria será igual na Url."
                error={errors.name}
                {...register('name', { required: 'Nome é obrigatório' })}
              />
            </FormControl>
            <Controller
              control={control}
              name='is_main'
              rules={{
                required: 'Campo obrigatório',
              }}
              render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
                <FormControl isInvalid={!!error} id={name}>
                    <Flex>
                      <FormLabel className='paragrafo-petro text-black negrito' textTransform={'uppercase'} mb='10px'>
                        É principal?
                      </FormLabel>
                      <Tooltip label='Se for Categoria selecione "SIM", se for Subcategoria selecione "NÃO".' cursor={'pointer'}
                    placement="top"
                    color={'var(--white-primary)'}
                    bg={'var(--red-primary)'}
                    borderRadius={'8px'}
                    textAlign={'center'}
                    hasArrow>
                      <Box>
                      <Icon as={PiInfoDuotone} cursor={'pointer'} fontSize={'1.15rem'} color={'var(--red-primary)'} verticalAlign={'middle'} />
                      </Box>
                      </Tooltip>
                    </Flex>
                  <InputGroup
                    borderRadius='6px'
                    bg='white.500'
                    p='3px 7px'
                    w='100%'
                    h='50px'
                    outline='none'
                    border='1px solid'
                    borderColor='black.800'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                  >
                    <Select
                      name={name}
                      ref={ref}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      w='100%'
                      height='100%'
                      border='none'
                      borderRadius='21px'
                      color='black.800'
                      placeholder='Selecione uma opção'
                    >
                      {isMainOptions &&
                        isMainOptions.map((list: any, index: any) => (
                          <option value={list.value} key={index}>
                            {list.name}
                          </option>
                        ))}
                    </Select>
                  </InputGroup>
                  {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
                </FormControl>
              )}
            />

            {watch().is_main === 'false' && (
              <Controller
                control={control}
                name='sub_category_id'
                rules={{ required: 'Campo obrigatório' }}
                render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
                  <FormControl isInvalid={!!error} id={name} color='black.800'>
                    <FormLabel fontSize='20px' mb='10px' color='black.800'>
                      Selecione a categoria
                    </FormLabel>
                    <AsyncSelect
                      placeholder='Selecione'
                      size='lg'
                      name={name}
                      ref={ref}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      components={asyncComponents}
                      useBasicStyles
                      options={categoryOptions.map((el: any) => ({ label: el.name, value: el.value }))}
                      loadOptions={(inputValue, callback) => {
                        setTimeout(() => {
                          let filter = categoryOptions.map((el: any) => ({ label: el.name, value: el.value }))
                          const values = filter.filter((option: any) =>
                            option.label.toLowerCase().includes(inputValue.toLowerCase())
                          )
                          callback(values)
                        }, 1500)
                      }}
                    />
                    {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
                  </FormControl>
                )}
              />
            )}
            <FormControl>
              <TextareaDefault
                label='Descrição'
                question='Essa descrição irá aparecer na página de todos os produtos.'
                error={errors.description}
                {...register('description', {
                  required: 'Descrição é obrigatório',
                })}
              />
            </FormControl>
            <FormControl>
              <TextareaDefault
                label='Descrição SEO'
                question='Esse campo deve ser preenchido pela agência de marketing. Pode colocar "teste".'
                error={errors.description_seo}
                {...register('description_seo', {
                  required: 'Descrição é obrigatório',
                })}
              />
            </FormControl>
            <FormControl>
              <TextareaDefault
                label='Key Word SEO'
                question='Esse campo deve ser preenchido pela agência de marketing. Pode colocar "teste".'
                error={errors.key_word_seo}
                {...register('key_word_seo', {
                  required: 'Key Word Seo é obrigatório',
                })}
              />
            </FormControl>
            <InputsHome
              name='Foto da categoria'
              typeInput='fileSingle'
              getUrls={(values: any) => setUrlPicture(values)}
            />
            <HStack spacing='20px' flexWrap='wrap' w='100%'>
              {urlPicture && (
                <ViewImage
                  url={urlPicture}
                  remove={() => {
                    setUrlPicture('')
                  }}
                />
              )}
            </HStack>
            <InputsHome name='Foto do icone' typeInput='fileSingle' getUrls={(values: any) => setUrl(values)} />
            <HStack spacing='20px' flexWrap='wrap' w='100%'>
              {url && (
                <ViewImage
                  url={url}
                  remove={() => {
                    setUrl('')
                  }}
                />
              )}
            </HStack>
            <Box w='100%'>
              <Flex>
                <Tooltip label='Marque caso queira que a categoria apareça na página de todos os produtos.' cursor={'pointer'}
                  placement="top-end"
                  color={'var(--white-primary)'}
                  bg={'var(--red-primary)'}
                  borderRadius={'8px'}
                  textAlign={'center'}
                  hasArrow>
                  <FormControl>
                    <Checkbox
                      className='paragrafo-preto text-black negrito'
                      colorScheme='red'
                      textTransform={'uppercase'}
                      mr='auto'
                      height='17px'
                      isChecked={isFavorite}
                      onChange={(evt) => setIsFavorite(evt.target.checked)}
                    >
                      Categoria destaque
                    </Checkbox>
                    <Icon as={PiInfoDuotone} cursor={'pointer'} fontSize={'1.15rem'} color={'var(--red-primary)'} ml={'2%'} />

                  </FormControl>
                </Tooltip>
              </Flex>
            </Box>

            <Box w='100%' mt='10px'>
              <Flex>
                <Tooltip label='Marque aqui para que a categoria apareça no site. Caso deixe desmarcado a categoria será cadastrada, mas não ficará online.' cursor={'pointer'}
                  placement="top-end"
                  color={'var(--white-primary)'}
                  bg={'var(--red-primary)'}
                  borderRadius={'8px'}
                  textAlign={'center'}
                  hasArrow>
                  <FormControl>
                    <Checkbox className='paragrafo-preto text-preto negrito'
                      textTransform={'uppercase'}
                      colorScheme='red'
                      mr='auto'
                      fontSize='20px'
                      height='17px'
                      isChecked={isActive}
                      onChange={(evt) => setIsActive(evt.target.checked)}
                    >
                      Ativo
                    </Checkbox>
                    <Icon as={PiInfoDuotone} cursor={'pointer'} fontSize={'1.15rem'} color={'var(--red-primary)'} ml={'2%'} />
                  </FormControl>
                </Tooltip>
              </Flex>
            </Box>
            <Box w='100%' mt='10px'>
              <Flex>
                <Tooltip label='Marque aqui para a categoria aparecer na página de todos os produtos.' cursor={'pointer'}
                  placement="top-end"
                  color={'var(--white-primary)'}
                  bg={'var(--red-primary)'}
                  borderRadius={'8px'}
                  textAlign={'center'}
                  hasArrow>


                  <FormControl>
                    <Checkbox className='paragrafo-preto negrito'
                      textTransform={'uppercase'}
                      colorScheme='red'
                      color='black.800'
                      mr='auto'
                      fontSize='20px'
                      height='17px'
                      isChecked={isAllProduct}
                      onChange={(evt) => setIsAllProduct(evt.target.checked)}
                    >
                      Todos os Produtos
                    </Checkbox>
                    <Icon as={PiInfoDuotone} cursor={'pointer'} fontSize={'1.15rem'} color={'var(--red-primary)'} ml={'2%'} />
                  </FormControl>
                </Tooltip>
              </Flex>
            </Box>
          </VStack>
          <Flex
            alignItems='center'
            justifyContent={Object.keys(update).length > 0 ? 'space-between' : 'flex-end'}
            mt='53px'
            w='100%'
          >
            {Object.keys(update).length > 0 && (
              <Button
                ml='auto'
                bg='transparent'
                color='black.800'
                fontSize='20px'
                borderRadius='4px'
                borderColor='black.800'
                borderWidth='1px'
                w='88px'
                h='47px'
                isLoading={loading}
                _hover={{ transition: 'all 0.4s' }}
                onClick={() => {
                  setUpdate({})
                  setUrl('')
                  reset()
                }}
                type='button'
              >
                Cancelar
              </Button>
            )}
            <Button
              ml='auto'
              bg='red.600'
              color='white'
              fontSize='1rem'
              textTransform={'uppercase'}
              borderRadius='8px'
              w='128px'
              h='40px'
              isLoading={loading}
              _hover={{ transition: 'all 0.4s' }}
              type='submit'
            >
              Salvar
            </Button>
          </Flex>
        </Box>
      </HStack>
      <ModalAddFilter
        isOpen={openFilter}
        onClose={() => {
          setOpenFiter(!openFilter)
          setSelectCategory({})
        }}
        category={selectCategory}
        reload={() => listCategory()}
      />
    </>
  )
}

export default TabCategory
