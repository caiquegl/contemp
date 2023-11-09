import { Box, Container, Divider, Flex, Grid, GridItem, Link, ListItem, Text, UnorderedList, Heading } from '@chakra-ui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { SearchBar } from './SearchBar'
import { v4 as uuidv4 } from 'uuid'
import { api } from '../lib/axios'

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
      <Grid
        templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
        w='100%'
      >
        {list &&
          list.length > 0 &&
          list.map((el: any, index: number) => (
            <GridItem w='100%' gap={6} key={index} px='20px'>
              {/* {index === 2 && (
                <HStack spacing="20px" mb="40px" >
                  <Link
                    href="https://www.linkedin.com/company/contemp/"
                    isExternal
                  >
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      w="50px"
                      h="50px"
                      borderRadius="full"
                      bg="white.500"
                    >
                      <Icon
                        as={AiFillLinkedin}
                        fontSize="35px"
                        color="black.200"
                      />
                    </Flex>
                  </Link>
                  <Link
                    href="https://www.youtube.com/channel/UC3zq85OUOJLysT-4c_NmDNQ"
                    isExternal
                  >
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      w="50px"
                      h="50px"
                      borderRadius="full"
                      bg="white.500"
                    >
                      <Icon
                        as={AiFillYoutube}
                        fontSize="35px"
                        color="black.200"
                      />
                    </Flex>
                  </Link>
                  <Link
                    href="https://www.instagram.com/contemp.industria/"
                    isExternal
                  >
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      w="50px"
                      h="50px"
                      borderRadius="full"
                      bg="white.500"
                    >
                      <Icon
                        as={AiOutlineInstagram}
                        fontSize="35px"
                        color="black.200"
                      />
                    </Flex>
                  </Link>
                  <Link
                    href="https://www.facebook.com/Contemp-1001000803330302/"
                    isExternal
                  >
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      w="50px"
                      h="50px"
                      borderRadius="full"
                      bg="white.500"
                    >
                      <Icon
                        as={FaFacebookF}
                        fontSize="35px"
                        color="black.200"
                      />
                    </Flex>
                  </Link>
                </HStack>
              )} */}
              <Link
                href={`/category/${el.name.toLowerCase().replaceAll(' ', '_')}`}
                _hover={{ color: 'white', textDecoration: 'none' }}
              >
                <Heading as={'h2'} fontWeight='bold' fontSize='20px' mb='20px' cursor='pointer'>
                  {el.name}
                </Heading>
              </Link>
              {el.children &&
                el.children.length > 0 &&
                el.children.map((el2: any, index: any) => (
                  <Fragment key={index}>
                    <Link
                      href={`/category/${el2.name.toLowerCase().replaceAll(' ', '_')}`}
                      _hover={{ color: 'white', textDecoration: 'none' }}
                    >
                      <Heading as={'h3'} fontSize='16px' mb='15px' cursor='pointer'>
                        {el2.name}
                      </Heading>
                    </Link>
                    <Box mb='20px'>
                      {el2.children &&
                        el2.children.length > 0 &&
                        el2.children.map((el3: any, index: number) => (
                          <Link
                            href={`/category/${el3.name.toLowerCase().replaceAll(' ', '_')}`}
                            _hover={{ color: 'white', textDecoration: 'none' }}
                          >
                            <Heading as={'h3'} key={index} fontSize='16px' cursor='pointer'>
                              {el3.name}
                            </Heading>
                          </Link>
                        ))}
                    </Box>
                  </Fragment>
                ))}
            </GridItem>
          ))}
      </Grid>
      <Divider m='50px 0' />
      <Flex
        direction={['column-reverse', 'row']}
        alignItems={['flex-start', 'center']}
        justifyContent='space-between'
        fontSize='16px'
        flexWrap='wrap'
      >
        <Text color='white' fontSize='16px'>
          Copyright © 2022 - 2023 Contemp. Todos os direitos reservados.
        </Text>
        <UnorderedList color='white' fontSize='16px' display='flex' mb={['20px', 0]} flexDirection={['column', 'row']}>
          <Link href='/todosProdutos' _hover={{ color: '#fff', textDecoration: 'none' }}>
            <ListItem>Todos os Produtos</ListItem>
          </Link>
          <Link
            href='https://blog.contemp.com.br/politica-de-privacidade'
            _hover={{ color: '#fff', textDecoration: 'none' }}
          >
            <ListItem m={[0, '0 0 0 30px']}>Politica de Privacidade</ListItem>
          </Link>
          <Link href='/trabalhe-conosco' _hover={{ color: '#fff', textDecoration: 'none' }}>
            <ListItem m={[0, '0 30px']}>Trabalhe Conosco</ListItem>
          </Link>
          <Link href='/sitemap.xml' _hover={{ color: '#fff', textDecoration: 'none' }}>
            <ListItem>Mapa do Site</ListItem>
          </Link>
        </UnorderedList>
      </Flex>
    </Container>
  )
}
