import { Container, Flex, Text } from '@chakra-ui/react'
import { Header } from '../../components/Header'
import { Contact } from '../../components/Contact'
import { Footer } from '../../components/Footer'
import { Player } from '../../components/Player'
import { SmoothScroll } from '../../components/SmoothScroll'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { ListCategory } from '../../components/ListCategory'
import { useAuth } from '../../contextAuth/authContext'
import Head from 'next/head'
import { AdBanners } from '../../components/AdBanners'

const Category = () => {
  const router = useRouter()
  const { allCategoryActive, allProductsActive, loading } = useAuth()

  const { category } = router.query
  const [list, setList] = useState<any>([])
  const [categ, setCateg] = useState<any>({})

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
  }

  const getCategoryList = async () => {
    try {
      // const dbInstanceCategory = collection(database, "categories");
      // const dbInstanceProducts = collection(database, "products");
      // const dbInstanceHome = collection(database, "home");
      // const qCategory = query(dbInstanceCategory, where("name", "==", category), limit(1))

      // await getDocs(qCategory).then(async (data) => {
      //   if (data.docs.length === 0) return
      //   idCategory = data.docs[0].id
      // });
      let idCategory: any = []
      let nameCategory = ''
      if (category && typeof category === 'string')
        nameCategory = category.replaceAll('_', ' ')
      await allCategoryActive.forEach(async (el: any) => {
        if (el.name === nameCategory) {
          idCategory.push(el.id)
          await allCategoryActive.forEach((el2: any) => {
            if (el2.sub_categorie && el2.sub_categorie === el.id) {
              idCategory.push(el2.id)
              allCategoryActive.forEach((el3: any) => {
                if (el3.sub_categorie && el3.sub_categorie === el2.id) {
                  idCategory.push(el3.id)
                }
              })
            }
          })
        }
      })

      let categFind = await allCategoryActive.find(
        (el: any) => el.name === nameCategory
      )
      setCateg(categFind)
      let list: any = []

      await allProductsActive.forEach((el: any) => {
        idCategory.forEach((ct: any) => {
          if (el.category === ct) list.push(el)
        })
      })

      dividerList(list)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (category) {
      getCategoryList()
    }
  }, [category, allCategoryActive, allProductsActive])

  const productListRef = useRef(null)

  const scrollToProductList = () => {
    const productList = document.querySelector('#product-list')
    const productListTop = productList?.getBoundingClientRect().top
    window.scrollTo({ top: productListTop })
  }

  useEffect(() => {
    if (productListRef?.current) {
      const current = productListRef?.current as Element
      const productListTop = current.getBoundingClientRect().top
      window.scrollTo({ top: productListTop })
      return
    }

    if (window && !loading && list.length !== 0) {
      scrollToProductList()
    }
  }, [loading, list])

  return (
    <SmoothScroll>
      {categ && (
        <Head>
          <meta name="description" content={categ.description_seo} />
          <meta name="keywords" content={categ.key_word_seo} />
          <title>Contemp</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
      )}
      <Header />

      <Flex
        w="100%"
        alignItems="center"
        justifyContent="center"
        direction="column"
        h={['350px', '350px', '250px', '250px', '250px', '250px']}
      >
        <Text
          fontSize={['30px', '30px', '40px', '40px', '40px', '40px']}
          fontWeight="bold"
          textAlign="center"
          maxW="1037px"
          p={['0 20px', '0 20px', '0 20px', '0 20px', '0']}
        >
          {category && typeof category === 'string'
            ? category.replaceAll('_', ' ')
            : ''}
        </Text>
      </Flex>
      {list &&
        list.length > 0 &&
        list.map((categ: any, index: number) => {
          index = index + 1
          let bg = 'white'

          if (index % 2 === 0) bg = 'white.500'
          if (index % 3 === 0) bg = 'black.800'
          if (index % 4 === 0) bg = 'red.600'

          return <ListCategory bg={bg} data={categ} ref={productListRef} />
        })}
      <Flex
        w="100%"
        alignItems="center"
        p={['0 20px', '0 20px', '0 20px', '0 20px', '0']}
        bg="white"
      >
        <Container maxW="7xl" p="80px 0">
          <AdBanners />
        </Container>
      </Flex>
      <Player />
      <Contact
        id="duvidas-e-orcamentos"
        title="DÚVIDAS E ORÇAMENTOS"
        description="Essa é a seleção que a equipe da Contemp escolheu como os
              destaques do mês"
        form={[
          {
            name: 'Nome',
            type: 'text'
          },
          {
            name: 'E-mail',
            type: 'text'
          },
          {
            name: 'Empresa',
            type: 'text'
          },
          {
            name: 'Telefone',
            type: 'text'
          },
          {
            name: 'Mensagem',
            type: 'textArea'
          }
        ]}
      />
      <Footer />
    </SmoothScroll>
  )
}

export default Category
