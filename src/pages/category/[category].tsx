import { Box, Container, Flex, Text, Heading, Button, Center } from '@chakra-ui/react'
import { Contact } from '../../components/Contact'
import { Footer } from '../../components/Footer'
import { Player } from '../../components/Player'
import { SmoothScroll } from '../../components/SmoothScroll'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { ListCategory } from '../../components/ListCategory'
import Head from 'next/head'
import { AdBanners } from '../../components/AdBanners'
import { v4 as uuidv4 } from 'uuid'
import { decodeName } from '../../utils/replaceNameToUrl'
import { api } from '../../lib/axios'
import { Space, Tag } from 'antd'
import { AiOutlineClose } from 'react-icons/ai'
import FlatList from 'flatlist-react'
import { pxToRem } from '../../utils/pxToRem'

const Category = () => {
  const router = useRouter()
  const { category } = router.query
  const [list, setList] = useState<any>([])
  const [listOrigin, setListOrigin] = useState<any>([])
  const [categ, setCateg] = useState<any>({})
  const [activeFilter, setActiveFilter] = useState<any>()
  const [startIndex, setStartIndex] = useState(0)
  const itemsPerPage = 3
  const dividerList = (listProduct: any) => {
    let list: any = []

    let insert = 0
    let insertIndex = 0

    listProduct.forEach((pd: any) => {
      if (insert === 0) {
        list.push([])
      }

      list[insertIndex].push(pd)
      insert = insert + 1
      if (insert === 4) insert = 0
      if (insert === 0) {
        insertIndex = insertIndex + 1
      }
    })

    const newData = list.slice(0, itemsPerPage)

    setList([...newData])
    setStartIndex(3)
    setListOrigin(list)
  }

  const getCategoryList = async () => {
    try {
      let nameCategory = ''
      if (category && typeof category === 'string')
        nameCategory = decodeName(category).replaceAll('_', ' ').replaceAll('/', '7777')
      const { data } = await api.get(`${nameCategory}/getCategory`)
      if (!data.category) return router.push('/404')
      setCateg(data.category)
      dividerList(data.products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (category) {
      getCategoryList()
    }
  }, [category])

  useEffect(() => {
    // window.scrollTo({
    //   top: 230,
    //   behavior: 'smooth',
    // })
    // window.addEventListener('scroll', handleScrollToProductList)
    // return () => window.removeEventListener('scroll', handleScrollToProductList)
  }, [])

  return (
    <SmoothScroll>
      {categ && (
        <Head>
          <meta name='description' content={categ.description_seo} />
          <meta name='keywords' content={categ.key_word_seo} />
          <title>{categ.name}</title>
          <link rel='icon' href='/favicon.png' />
        </Head>
      )}
      <Box backgroundColor={'var(--graylight-primary)'} width={'100%'}>
        <Flex
          className='card-titulo-categoria'
          // id="viewCategory"
        >
          <Heading as={'h2'} className='h3-preto titulo-categoria'>
            {category && typeof category === 'string' ? decodeName(category).replaceAll('_', ' ') : ''}
          </Heading>

          <Space size={20}>
            {categ &&
              categ.filter &&
              categ.filter.length > 0 &&
              categ.filter.map((item: any, index: number) => (
                <Box
                  key={item.id}
                  backgroundColor={activeFilter === index ? 'var(--red-primary)' : 'transparent'}
                  border={activeFilter === index ? '2px solid var(--red-primary)' : '2px solid var(--black-primary)'}
                  color={activeFilter === index ? 'var(--white-primary)!important' : 'var(--black-primary)'}
                  className='botao-filtro'
                  onClick={() => {
                    if (activeFilter === index) {
                      setStartIndex(3)
                      const newData = listOrigin.slice(0, itemsPerPage)
                      setList([...newData])
                      setActiveFilter(undefined)
                      return
                    }
                    let newList: any = []
                    listOrigin.forEach((pd: any) => {
                      if (pd && pd.length > 0) {
                        pd.forEach((product: any) => {
                          item.products.forEach((pdFilter: any) => {
                            if (product.id === pdFilter) newList.push(product)
                          })
                        })
                      }
                    })
                    setActiveFilter(index)
                    setList([[...newList]])
                  }}
                >
                  <p style={{ margin: 0 }}>{item.name}</p>
                  {/* {activeFilter === index && <AiOutlineClose style={{marginLeft: 5, marginTop: 5}} color="white" fontSize="17px" />} */}
                </Box>
              ))}
          </Space>
        </Flex>
      </Box>
      <Box w={'100%'} backgroundColor={'white'}>
        <Box className='container-categoria-produtos'>
          {/* <InfiniteScrollComponent /> */}
          {list && list.length > 0 && (
            <>
              {list.map((categ: any, index: number) => {
                index = index + 1
                let bg = 'white'

                if (index % 2 === 0) bg = 'white.500'
                //   // if (index % 3 === 0) bg = 'black.800'
                //   // if (index % 4 === 0) bg = 'red.600'

                return <ListCategory key={index} bg={bg} data={categ} />
              })}
              {list.length < listOrigin.length && isNaN(activeFilter) && <Center>
                  <Button
                    className='botao-vermelho'
                    maxW={pxToRem(279)}
                    w='100%'
                    mt='20px'
                    onClick={() => {
                      const end = startIndex + itemsPerPage
                      const newData = listOrigin.slice(startIndex, end)
                      setStartIndex(end)
                      setList((prevData: any) => [...prevData, ...newData])
                    }}
                  >
                    Carregar Mais
                  </Button>
                </Center> }
            </>
          )}
        </Box>
      </Box>
      <Contact
        id='duvidas-e-orcamentos'
        title='DÚVIDAS E ORÇAMENTOS'
        description='Fale com nossos especialistas pelos canais abaixo ou nos envie um e-mail.'
        form={[
          {
            name: 'Nome',
            type: 'text',
          },
          {
            name: 'E-mail',
            type: 'text',
          },
          {
            name: 'Empresa',
            type: 'text',
          },
          {
            name: 'Telefone',
            type: 'text',
          },
          {
            name: 'Mensagem',
            type: 'textArea',
          },
        ]}
      />
      <Footer />
    </SmoothScroll>
  )
}

export default Category
