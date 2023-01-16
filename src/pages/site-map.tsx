import { Container, Divider, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import React, { Fragment, useEffect, useState } from 'react'

import { useAuth } from '../contextAuth/authContext'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'
import { Header } from '../components/Header'
import  {updateSiteMapXML}  from './api/site-map-xml'

const SiteMapContainer = () => {
  const router = useRouter()
  const { allCategory } = useAuth()
  const { allProductsActive } = useAuth()

  const [listCategory, setListCategory] = useState<any>([])

  useEffect(() => {
    let newListCategory = allCategory.map((category: any) => {
      return {
        ...category,
        products: allProductsActive.filter((product: { nameCategory: string; category: string }) => {
          return product.category == category.id
        }),
      }
    })
    updateSiteMapXML(allCategory,allProductsActive);
    setListCategory(
    newListCategory.sort(function (a:any, b:any) {
      return a.products.length - b.products.length
    }))

  }, [allCategory, allProductsActive])

  return (
    <>
          {/* <Head>
        <meta
          name="description"
          content="Procurando medição e controle de temperatura em processos industrais? A Contemp é pioneiro no Brasil. Confira!"
        />
        <meta
          name="keywords"
          content="controle de temperatura, Contemp, processos industriais"
        />
        <title>Contemp</title>
        <link rel="icon" href="/favicon.png" />
      </Head> */}
      <Header />
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="center"
        direction="column"
        h="250px"
      >
        <Text fontSize="45px" fontWeight="bold" textAlign="center">
          Site Map
        </Text>
      </Flex>
    <Container
      maxW='7xl'
      p={['40px 20px 31px', '40px 20px 31px', '40px 20px 31px', '40px 20px 31px', '40px 10px 31px']}
    >
      <Grid
        templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
        w='100%'
      >
        {listCategory &&
          listCategory.length > 0 &&
          listCategory.map((el: any, index: number) => (
            <GridItem w='100%' gap={6} key={uuidv4()} px='20px'>
              <Text
                fontWeight='bold'
                fontSize='20px'
                mb='20px'
                cursor='pointer'
                onClick={() => router.push(`/category/${el.name.replaceAll(' ', '_')}#viewCategory`)}
              >
                {el.name}
              </Text>
              {el.products &&
                el.products.length > 0 &&
                el.products.map((el: any, index: number) => (
                  <GridItem w='100%' gap={6} key={uuidv4()}>
                    <Text
                      fontSize='15px'
                      mb='20px'
                      cursor='pointer'
                      onClick={() => router.push(`/produto/${el.name.replaceAll(' ', '_')}`)}
                    >
                      {el.name}
                    </Text>
                  </GridItem>
                ))}
                {
                listCategory.length - 1 != index && <Divider mb='20px' />
                }
            </GridItem>
          ))}
      </Grid>
    </Container>
    </>
  )
}

export default SiteMapContainer


