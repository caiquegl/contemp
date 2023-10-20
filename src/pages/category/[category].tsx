import { Box, Container, Flex, Text } from '@chakra-ui/react'
import { Contact } from '../../components/Contact'
import { Footer } from '../../components/Footer'
import { Player } from '../../components/Player'
import { SmoothScroll } from '../../components/SmoothScroll'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ListCategory } from '../../components/ListCategory'
import Head from 'next/head'
import { AdBanners } from '../../components/AdBanners'
import { v4 as uuidv4 } from 'uuid'
import { decodeName } from '../../utils/replaceNameToUrl'
import { api } from '../../lib/axios'
import { Space, Tag } from 'antd'
import { AiOutlineClose } from 'react-icons/ai'

const Category = () => {
  const router = useRouter()
  const { category } = router.query
  const [list, setList] = useState<any>([])
  const [listOrigin, setListOrigin] = useState<any>([])
  const [categ, setCateg] = useState<any>({})
  const [activeFilter, setActiveFilter] = useState<any>()
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

    setList(list)
    setListOrigin(list)
  }

  const getCategoryList = async () => {
    try {
      let nameCategory = ''
      if (category && typeof category === 'string') nameCategory = decodeName(category).replaceAll('_', ' ').replaceAll('/', '7777')
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
    window.scrollTo({
      top: 230,
      behavior: 'smooth',
    })
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
      <Flex
        w='100%'
        alignItems='center'
        justifyContent='center'
        direction='column'
        h={['110px', '110px', '140px', '140px', '140px', '140px']}
      // id="viewCategory"
      >
        <Text
          fontSize={['30px', '30px', '40px', '40px', '40px', '40px']}
          fontWeight='bold'
          textAlign='center'
          maxW='1037px'
          p={['0 20px', '0 20px', '0 20px', '0 20px', '0']}
        >
          {category && typeof category === 'string' ? decodeName(category).replaceAll('_', ' ') : ''}
        </Text>
        <Space size={20} style={{ marginTop: 20 }}>
          {categ &&
            categ.filter &&
            categ.filter.length > 0 &&
            categ.filter.map((item: any, index: number) => (
              <Box
                color='white'
                padding='10px 6px'
                borderColor={activeFilter === index ? 'red.600' : 'white'}
                backgroundColor={activeFilter === index ? 'red.600' : 'transparent'}
                borderWidth='2px'
                borderRadius='5px'
                minW='80px'
                h='40px'
                display='flex'
                alignItems='center'
                justifyContent='center'
                fontSize='18px'
                cursor='pointer'
                _hover={{
                  transition: '0.3s',
                  backgroundColor: 'red.600',
                  borderColor: 'red.600',
                }}
                onClick={() => {
                  if(activeFilter === index) {
                    setList([...listOrigin])
                    setActiveFilter(undefined)
                    return
                  }
                  let newList: any = []
                  list.forEach((pd: any) => {
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
                <p style={{margin: 0}}>{item.name}</p>
                {/* {activeFilter === index && <AiOutlineClose style={{marginLeft: 5, marginTop: 5}} color="white" fontSize="17px" />} */}
              </Box>
            ))}
        </Space>
      </Flex>
      <Box>
        {list &&
          list.length > 0 &&
          list.map((categ: any, index: number) => {
            index = index + 1
            let bg = 'white'

            if (index % 2 === 0) bg = 'white.500'
            // if (index % 3 === 0) bg = 'black.800'
            // if (index % 4 === 0) bg = 'red.600'

            return <ListCategory key={index} bg={bg} data={categ} />
          })}
      </Box>
      {/* <Flex w='100%' alignItems='center' p={['0 20px', '0 20px', '0 20px', '0 20px', '0']} bg='white'>
        <Container maxW='7xl' p='80px 0'>
          <AdBanners />
        </Container>
      </Flex>*/}
      {/* <Player /> */}
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
