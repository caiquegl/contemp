import { Box, Container, Divider, Flex, Grid, GridItem, Link, ListItem, Text, UnorderedList, Heading } from '@chakra-ui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { SearchBar } from './SearchBar'
import GTranslateWrapper from './GTranslateWrapper';
import { v4 as uuidv4 } from 'uuid'
import { api } from '../lib/axios'
import { LanguageSwitcher } from '../components/LanguageSwitcher/index';

export const Footer = () => {
  const [list, setList] = useState<any>([])

  const listFooter = async () => {
    const { data } = await api.get('getMenu')
    let newList: any = []

    let order: any = []

    data.forEach((el: any, index: number) => {
      let count = el.children.length

      order.push({
        index,
        count,
      })
    })

    let newOrder = order.sort((a: any, b: any) => a.count - b.count)

    newOrder.forEach((el: any) => {
      newList.push(data[el.index])
    })

    setList([...newList])
  }

  useEffect(() => {
    listFooter()
  }, [])

  return (
    <Container
      maxW='7xl'
      p={['40px 20px 31px', '40px 20px 31px', '40px 20px 31px', '40px 20px 31px', '100px 10px 31px']}
    >
        < LanguageSwitcher/>
       <GTranslateWrapper />
      <Flex
        alignItems='center'
        justifyContent='space-between'
        marginBottom='32px'
        flexDirection={['column', 'column', 'row', 'row', 'row']}
      >
        <Flex
          w='100%'
          justifyContent='space-between'
          alignItems='center'
          flexDirection={['column', 'column', 'row', 'row', 'row']}
        >
          <Box>
            <Text fontWeight='bold' fontSize='20px' mb='15px'>
              Procure o produto que deseja aqui
            </Text>
            <Text fontSize='16px' mb='15px'>
              Se ainda não encontrou o produto que esteja procurando é só digitar ao lado.
            </Text>
          </Box>
          <SearchBar
            inputProps={{
              placeholder: 'Procure aqui seu produto...',
            }}
          />
        </Flex>
      </Flex>
      <Divider mb='100px' />
      <Flex
        direction={['column-reverse', 'row']}
        alignItems={['flex-start', 'center']}
        justifyContent='space-between'
        fontSize='18px'
        flexWrap='wrap'
      >
        <Text color='white' fontSize='16px'>
          Copyright © 2022 - 2023 Contemp. Todos os direitos reservados, feito por <Link href='https://3hub.co'
            _hover={{ color: '#fff', textDecoration: 'none' }}>3 Hub</Link>.
        </Text>
        <UnorderedList color='white' fontSize='16px' display='flex' mb={['20px', 0]} flexDirection={['column', 'row']}>
          <Link href='/todosProdutos' _hover={{ color: '#fff', textDecoration: 'none' }}>
            <ListItem>Todos os Produtos</ListItem>
          </Link>
          <Link
            href='https://contemp.com.br/politica-de-privacidade'
            _hover={{ color: '#fff', textDecoration: 'none' }}
          >
            <ListItem m={[0, '0 0 0 30px']}>Politica de Privacidade</ListItem>
          </Link>
          <Link href='/trabalhe-conosco' _hover={{ color: '#fff', textDecoration: 'none' }}>
            <ListItem m={[0, '0 30px']}>Trabalhe Conosco</ListItem>
          </Link>
          <Link href='/site-map' _hover={{ color: '#fff', textDecoration: 'none' }}>
            <ListItem>Mapa do Site</ListItem>
          </Link>
        </UnorderedList>
      </Flex>
    </Container>
  )
}
