import { Box, Container, Divider, Flex, Grid, GridItem, Link, ListItem, Text, UnorderedList, Heading, Button } from '@chakra-ui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { SearchBar } from './SearchBar'
import { v4 as uuidv4 } from 'uuid'
import { api } from '../lib/axios'
import { LanguageSwitcher } from '../components/LanguageSwitcher/index';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

export const FooterCompleto = () => {
  const [list, setList] = useState<any>([])
  const { t } = useTranslation();

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
    <>
      <Flex>
      </Flex>
      <Container
        maxW='7xl'
        p={['40px 20px 31px', '40px 20px 31px', '40px 20px 31px', '40px 20px 31px', '100px 10px 31px']}
      >
        < LanguageSwitcher />
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
                {t('footer-titulo')}
              </Text>
              <Text fontSize='1rem' mb='15px'>
                {t('footer-paragrafo')}
              </Text>
            </Box>
            <SearchBar
              inputProps={{
                placeholder: t('placeholder-search'),
              }}
            />
          </Flex>
        </Flex>
        <Divider mb='3%' />
        <Heading as={'h3'} fontSize={'1.5rem'} textTransform={'uppercase'} color={'white'} mb={'3%'}>
          {t('footer-titulo2')}
        </Heading>
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
                  <Heading as={'h2'} color='white' fontWeight={'bold'} fontSize='1rem' mb='2%' cursor='pointer'>
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
                        <Heading as={'h3'} color='white' fontWeight={'bold'} fontSize='0.85rem' mb='15px' cursor='pointer'>
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
                              <Heading as={'h4'} color='white' key={index} fontWeight='400' fontSize='0.85rem' cursor='pointer'>
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
        <Divider mb='3%' />
        <Flex
          direction={['column-reverse', 'row']}
          alignItems={['flex-start', 'center']}
          justifyContent='space-between'
          fontSize='1rem'
          flexWrap='wrap'
        >
          <Text color='white' fontSize='1rem'>
            {t('footer-copywrite')}
            <Link href='https://3hub.co'
              _hover={{ color: '#fff', textDecoration: 'none' }}>3 Hub</Link>.
          </Text>
          <UnorderedList color='white' fontSize='16px' display='flex' mb={['20px', 0]} flexDirection={['column', 'row']}>
            <Link href='/todosProdutos' _hover={{ color: '#fff', textDecoration: 'none' }}>
              <ListItem>{t('footer-todososprodutos')}</ListItem>
            </Link>
            <Link
              href='https://contemp.com.br/politica-de-privacidade'
              _hover={{ color: '#fff', textDecoration: 'none' }}
            >
              <ListItem m={[0, '0 0 0 30px']}>{t('footer-privacidade')}</ListItem>
            </Link>
            <Link href='/trabalhe-conosco' _hover={{ color: '#fff', textDecoration: 'none' }}>
              <ListItem m={[0, '0 30px']}>{t('footer-trabalheconosco')}</ListItem>
            </Link>
            <Link href='/site-map' _hover={{ color: '#fff', textDecoration: 'none' }}>
              <ListItem>{t('footer-mapadosite')}</ListItem>
            </Link>
          </UnorderedList>
        </Flex>
      </Container>
    </>
  )
}
