import {  Container, Flex, Grid,  useBreakpointValue, Heading } from '@chakra-ui/react'
import { FooterCompleto } from '../components/FooterCompleto'
import CardCatalog from '../components/CardCatalog'
import { pxToRem } from '../utils/pxToRem'
import { SmoothScroll } from '../components/SmoothScroll'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { api } from '../lib/axios'
import { SearchBar } from '../components/SearchBar'
import CardMenu from '../components/CardMenu'

const AllMenus = () => {
  const [menus, setMenus] = useState<any>([])


  const getMenus = async () => {
    try {
      const { data } = await api.get('getMenuActive')
      setMenus(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMenus()

    function findOverflowingElements() {
      const docWidth = document.documentElement.offsetWidth

        ;[].forEach.call(document.querySelectorAll('*'), function (element: HTMLElement) {
          if (element.offsetWidth > docWidth) {
            console.log(element)
          }
        })
    }
    findOverflowingElements()
  }, [])

  return (
    <SmoothScroll>
      <Head>
        <meta
          name='description'
          content='Encontre tudo em soluções para medição, controle e monitoramento para os mais variados processos industrais.'
        />
        <meta
          name='keywords'
          content='soluções para medição, medição, controle de temperatura, monitoramento, processos industriais'
        />
        <title>Todos os manuais</title>
        <link rel='icon' href='/favicon.png' />
      </Head>

      <Flex
        w='100%'
        alignItems='center'
        justifyContent='center'
        direction='column'
        h={['350px', '350px', '180px', '180px', '180px', '180px']}
      >
        <Heading as={'h2'} className='todososprodutos-titulo negrito text-white centro'
          maxW='1037px'
          p={['0 20px', '0 20px', '0 20px', '0 20px', '0']}
        >
          Soluções para medição, controle e monitoramento para os mais variados processos industriais.
        </Heading>
        <SearchBar
          inputProps={{
            placeholder: 'Procure aqui seu manual...',
          }}
          searchCard='100%'
        />
      </Flex>
<Flex w='100%' alignItems='center' bg='var(--graylight-primary)' p='0 20px'>
  <Container maxW='7xl' p='80px 0'>
    <Heading
      as={'h3'}
      className='todososprodutos-titulo text-black negrito'
      mb='31px'
      p={['0 20px', '0 20px', '0 20px', '0 20px', '0']}
    >
      Todos manuais
    </Heading>
    <Grid templateColumns='repeat(auto-fit, minmax(260px, 1fr))' gap={pxToRem(15)} padding={`0 ${pxToRem(10)}`}>
      {menus &&
        menus.length > 0 &&
        menus
          .sort((a: any, b: any) => {
            const orderA = a.order ?? 999999;
            const orderB = b.order ?? 999999;
            return orderA - orderB;
          })
          .map((categ: any, index: number) => {
            const firstLineColors = ['var(--black-primary)', 'var(--white-primary)', 'var(--red-primary)', 'var(--gray-primary)', 'var(--white-primary)', 'var(--red-primary)', 'var(--gray-primary)', 'var(--black-primary)'];
            const secondLineColors = ['var(--red-primary)', 'var(--gray-primary)', 'var(--black-primary)', 'var(--white-primary)'];

            // Alternar as cores com base no índice da linha
            const colors = index % 1 === 0 ? firstLineColors : secondLineColors;

            // Calcular o índice da cor para evitar repetição em sequência
            const bgIndex = Math.floor(index / 1) % colors.length;

            const bg = colors[bgIndex];
            const color = (bg === 'var(--red-primary)' || bg === 'var(--black-primary)') ? 'var(--white-primary)' : 'var(--black-primary)';

            return (
              <CardMenu
                key={index}
                bg={bg}
                color={color}
                title={categ.name}
                url={categ.url}
                urlPicture={categ.picture}
              />
            );
          })}
    </Grid>
  </Container>
</Flex>
      <FooterCompleto />
    </SmoothScroll>
  )
}

export default AllMenus