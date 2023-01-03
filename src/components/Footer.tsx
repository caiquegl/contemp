import {
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Link,
  ListItem,
  Text,
  UnorderedList
} from '@chakra-ui/react'
import React, { Fragment, useEffect, useState } from 'react'
import {
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineInstagram
} from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'
import { SearchBar } from './SearchBar'
import { useAuth } from '../contextAuth/authContext'
import { useRouter } from 'next/router'

export const Footer = () => {
  const { listHeader } = useAuth()
  const router = useRouter()
  const [list, setList] = useState<any>(listHeader)

  useEffect(() => {
    let newList: any = []
    let first: any = {}
    let second: any = {}
    let thrid: any = {}
    let four: any = {}
    let five: any = {}
    let six: any = {}
    let seven: any = {}

    let order: any = []

    listHeader.forEach((el: any, index: number) => {
      let count = el.list_sub_category.length

      el.list_sub_category.forEach((el2: any) => {
        count = count + el2.list_sub_category.length
      })

      order.push({
        index,
        count
      })
    })

    let newOrder = order.sort((a: any, b: any) => a.count - b.count)

    console.log(newOrder, listHeader)
    newOrder.forEach((el: any) => {
      newList.push(listHeader[el.index])
    })

    // newList.push(first)
    // newList.push(second)
    // newList.push(thrid)
    // newList.push(four)
    // newList.push(five)
    // newList.push(six)
    // newList.push(seven)
    setList(newList)
  }, [listHeader])

  return (
    <Container
      maxW="7xl"
      p={[
        '40px 20px 31px',
        '40px 20px 31px',
        '40px 20px 31px',
        '40px 20px 31px',
        '40px 10px 31px'
      ]}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        marginBottom="32px"
        flexDirection={['column', 'column', 'row', 'row', 'row']}
      >
        <Flex
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          flexDirection={['column', 'column', 'row', 'row', 'row']}
        >
          <Box>
            <Text fontWeight="bold" fontSize="30px" mb="15px">
              Procure o produto que deseja aqui
            </Text>
            <Text fontSize="20px" mb="15px">
              Se ainda não encontrou o produto que esteja procurando é só
              digitar ao lado.
            </Text>
          </Box>
          <SearchBar
            inputProps={{
              placeholder: 'Procure aqui seu produto...'
            }}
          />
        </Flex>
      </Flex>
      <Divider mb="100px" />
      <Grid
        templateColumns={[
          'repeat(1, 1fr)',
          'repeat(1, 1fr)',
          'repeat(2, 1fr)',
          'repeat(2, 1fr)',
          'repeat(3, 1fr)'
        ]}
        w="100%"
      >
        {list &&
          list.length > 0 &&
          list.map((el: any, index: number) => (
            <GridItem w="100%" gap={6} key={index}>
              {index === 2 && (
                <HStack spacing="20px" mb="40px">
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
              )}
              <Text
                fontWeight="bold"
                fontSize="25px"
                mb="20px"
                cursor="pointer"
                onClick={() =>
                  router.push(`/category/${el.name.replaceAll(' ', '_')}#viewCategory`)
                }
              >
                {el.name}
              </Text>
              {el.list_sub_category &&
                el.list_sub_category.length > 0 &&
                el.list_sub_category.map((el2: any) => (
                  <Fragment key={index}>
                    <Text
                      fontWeight="bold"
                      fontSize="20px"
                      mb="15px"
                      cursor="pointer"
                      onClick={() =>
                        router.push(
                          `/category/${el2.name.replaceAll(' ', '_')}#viewCategory`
                        )
                      }
                    >
                      {el2.name}
                    </Text>
                    <Box mb="20px">
                      {el2.list_sub_category &&
                        el2.list_sub_category.length > 0 &&
                        el2.list_sub_category.map((el3: any, index: number) => (
                          <Text
                            key={index}
                            fontSize="20px"
                            cursor="pointer"
                            onClick={() =>
                              router.push(
                                `/category/${el3.name.replaceAll(' ', '_')}#viewCategory`
                              )
                            }
                          >
                            {el3.name}
                          </Text>
                        ))}
                    </Box>
                  </Fragment>
                ))}
            </GridItem>
          ))}
      </Grid>
      <Divider m="50px 0" />
      <Flex
        direction={['column-reverse', 'row']}
        alignItems={['flex-start', 'center']}
        justifyContent="space-between"
        fontSize="18px"
        flexWrap="wrap"
      >
        <Text color="white" fontSize="18px">
          Copyright © 2022 Contemp. Todos os direitos reservados.
        </Text>
        <UnorderedList
          color="white"
          fontSize="18px"
          display="flex"
          mb={['20px', 0]}
          flexDirection={['column', 'row']}
        >
          <Link
            href="/todosProdutos"
            _hover={{ color: '#fff', textDecoration: 'none' }}
          >
            <ListItem>Todos os Produtos</ListItem>
          </Link>
          <Link
            href="https://blog.contemp.com.br/politica-de-privacidade"
            _hover={{ color: '#fff', textDecoration: 'none' }}
          >
            <ListItem m={[0, '0 0 0 30px']}>Politica de Privacidade</ListItem>
          </Link>
          <Link
            href="/trabalhe-conosco"
            _hover={{ color: '#fff', textDecoration: 'none' }}
          >
            <ListItem m={[0, '0 30px']}>Trabalhe Conosco</ListItem>
          </Link>
          <Link href="/sitemap.xml" _hover={{ color: '#fff', textDecoration: 'none' }}>
            <ListItem>Mapa do Site</ListItem>
          </Link>
        </UnorderedList>
      </Flex>
    </Container>
  )
}
