import { Container, Divider, Flex, Grid, GridItem, Link, Text, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Header } from '../components/Header'
import { api } from '../lib/axios'

const SiteMapContainer = () => {
  const [listCategory, setListCategory] = useState<any>([])

  const getStatus = async () => {
    const { data } = await api.get(`getSiteMap`)
    setListCategory(
      data.sort(function (a: any, b: any) {
        return a.Products.length - b.Products.length
      })
    )
  }
  useEffect(() => {
    getStatus()
  }, [])

  return (
    <>
      <Header />
      <Flex w='100%' alignItems='center' justifyContent='center' direction='column' h='180px'>
        <Text fontSize='45px' fontWeight='bold' textAlign='center'>
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
              <GridItem w='100%' gap={6} key={index} px='20px'>
                <Link
                  href={`/category/${el.name.replaceAll(' ', '_')}#viewCategory`}
                  _hover={{ color: 'white', textDecoration: 'none' }}
                >
                  <Text fontWeight='bold' fontSize='20px' mb='20px' cursor='pointer'>
                    {el.name}
                  </Text>
                </Link>
                {el.Products &&
                  el.Products.length > 0 &&
                  el.Products.map((el: any, index: number) => (
                    <GridItem w='100%' gap={6} key={index}>
                      <Link
                        href={`/produto/${el.name.replaceAll(' ', '_')}`}
                        _hover={{ color: 'white', textDecoration: 'none' }}
                      >
                        <Text fontSize='15px' mb='20px' cursor='pointer'>
                          {el.name}
                        </Text>
                      </Link>
                    </GridItem>
                  ))}
                {listCategory.length - 1 != index && <Divider mb='20px' />}
              </GridItem>
            ))}
        </Grid>
      </Container>
    </>
  )
}

export default SiteMapContainer
