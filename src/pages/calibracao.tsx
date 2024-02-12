import { Box, Button, Center, Container, Flex, Link, ListItem, Text, UnorderedList, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Heading } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { FooterCompleto } from '../components/FooterCompleto'
import { Player } from '../components/Player'
import { SelectConfigCalibration } from '../components/SelectConfigCalibration'
import Head from 'next/head'
import Image from 'next/image'
import IMGCalibration from '../assets/images/Lab_contemp.png'
import Iso from '../assets/images/iso.png'
import Imetro from '../assets/images/imetro.png'
import { useTransition } from 'react';
import { useTranslation } from 'react-i18next';

const Calibracao = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <meta
          name='description'
          content='Conte com o suporte técnico da Contemp para tirar dúvidas sobre os produtos que comercializamos. Acesse!'
        />
        <meta name='keywords' content='suporte técnico, Contemp, pós-venda' />
        <title>Calibração</title>
        <link rel='icon' href='/favicon.png' />
      </Head>
      <Header />
      <Box backgroundColor={'var(--white-primary)'} p={'0'}>
        <Box backgroundColor={'var(--black-primary)'} p={'0'}>
          <Flex w='100%' alignItems='center' justifyContent='center' direction='column' h='80px'>
            <Heading as={'h2'} className='calibracao-titulo text-white centro'>
              {t("titulopagina-calibracao")}
            </Heading>
          </Flex>
        </Box>
        <Container maxWidth={'var(--max-tamanho)'}>
          <Box w='100%' bg='white' p={['0 20px', '0 20px', '0 20px', '0 20px', '0 20px']}>
            <Container maxW='7xl' p='12px 0 0px' px='20px'>
              <Heading as={'h3'} className='calibracao-subtitulo text-red negrito' mt='100px'>
                {t("titulo1-calibracao")}
              </Heading>
              <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
                {t("paragrafo1-calibracao")}
              </Text>
              <Flex direction={['column', 'row']} alignItems='center' mt='40px' mb='81px'>
                <Box maxW='488px'>
                  <Image src={IMGCalibration} />
                </Box>
                <Box w={['100%', 'calc(100% - 488px)']} ml={['0px', '20px']}>
                  <Heading as={'h3'} className='calibracao-subtitulo text-red negrito'>
                    {t("titulo2-calibracao")}
                  </Heading>
                  <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
                    {t("paragrafo2-calibracao")}
                  </Text>
                </Box>
              </Flex>
            </Container>
          </Box>
          <Box w='100%' bg='white.500' p={['60px 20px', '60px 20px', '60px 20px', '60px 20px', '60px 20px']} pt='100px'>
            <Container maxW='7xl' p='12px 0 40px'>
              <Heading className='calibracao-subtitulo text-red negrito'>
                {t("titulo3-calibracao")}
              </Heading>
              <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
                {t("paragrafo3-calibracao")}
              </Text>
              <Flex direction={['column', 'row']} mt='61px'>
                <Box w={['100%', '50%']}>
                  <Heading className='calibracao-subtitulo text-black negrito' mb='25px'>
                  {t("titulo4-calibracao")}
                  </Heading>
                  <Text className='paragrafo-preto text-black' mb='25px'>
                  {t("paragrafo4-calibracao")}
                  </Text>
                  <UnorderedList>
                    <ListItem className='paragrafo-preto text-black'>
                    {t("paragrafo5-calibracao")}
                    </ListItem>
                    <ListItem className='paragrafo-preto text-black'>
                      C{t("paragrafo6-calibracao")}
                    </ListItem>
                    <ListItem className='paragrafo-preto text-black'>
                      C{t("paragrafo7-calibracao")}
                    </ListItem>
                    <ListItem className='paragrafo-preto text-black'>
                    {t("paragrafo8-calibracao")}
                    </ListItem>
                    <ListItem className='paragrafo-preto text-black'>
                      C{t("paragrafo9-calibracao")}
                    </ListItem>
                    <ListItem className='paragrafo-preto text-black'>
                    {t("paragrafo10-calibracao")}
                    </ListItem>
                    <ListItem className='paragrafo-preto text-black'>
                    {t("paragrafo11-calibracao")}
                    </ListItem>
                    <ListItem className='paragrafo-preto text-black'>
                    {t("paragrafo12-calibracao")}
                    </ListItem>
                    <ListItem className='paragrafo-preto text-black'>
                    {t("paragrafo13-calibracao")}
                    </ListItem>
                    <ListItem className='paragrafo-preto text-black'>
                    {t("paragrafo14-calibracao")}
                    </ListItem>
                  </UnorderedList>
                </Box>
                <Box w={['100%', 'calc(100% - 488px)']} ml={['0px', '20px']}>
                  <Text className='calibracao-subtitulo text-black negrito' mb='25px'>
                  {t("titulo5-calibracao")}
                  </Text>

                  <UnorderedList>
                    <ListItem className='paragrafo-preto text-black'>
                      {t("paragrafo15-calibracao")}
                    </ListItem>
                    <ListItem className='paragrafo-preto text-black'>
                      {t("paragrafo16-calibracao")}
                    </ListItem>
                    <ListItem className='paragrafo-preto text-black'>
                      {t("paragrafo17-calibracao")}
                    </ListItem>
                  </UnorderedList>
                </Box>
              </Flex>
            </Container>
          </Box>
          <Flex w='100%' alignItems='center' bg='white' p={['0 20px', '0 20px', '0 20px', '0 20px', '0 20px']}>
            <Container maxW='7xl' p='0px 0 77px'>
              <Heading as={'h3'} className='calibracao-titulo text-red centro negrito'
                mt='0px'
                mb='70px'
              >
                {t("titulo6-calibracao")}
              </Heading>
              <SelectConfigCalibration />
              <Heading as={'h2'} className='calibracao-titulo text-red centro negrito' mt='0px'>
                {t("titulo7-calibracao")}
              </Heading>
              <Flex mt='86px' alignItems='center' justifyContent='center' flexDirection={['column', 'row']}>
                <Box>
                  <Flex alignItems='center'>
                    <Box w='115px' h='115px' mr='35px'>
                      <Image src={Iso} width='115px' height='115px' />
                    </Box>
                    <Heading as={'h4'} maxW='249px' fontSize='20px' color='black.900'>
                      {t("titulo-iso-calibracao")}
                    </Heading>
                  </Flex>
                  <Center>
                    <Link target='_blank' href='/Certificado-ISO-9001-OUT24.pdf' _hover={{ textDecoration: 'none' }}>
                      <Button
                        w='100%'
                        maxW='263px'
                        h='50px'
                        borderRadius='25px'
                        mt='24px'
                        bg='red.600'
                        fontSize='20px'
                        _hover={{
                          transition: 'all 0.5s',
                          bg: 'black.800',
                          color: 'white',
                        }}
                      >
                        {t("botao-iso-calibracao")}
                      </Button>
                    </Link>
                  </Center>
                </Box>
                <Box mt={['10px', 0]}>
                  <Flex alignItems='center'>
                    <Box w='115px' h='115px' mr='35px'>
                      <Image src={Imetro} width='115px' height='115px' />
                    </Box>
                    <Heading as={'h4'} maxW='249px' fontSize='20px' color='black.900'>
                      {t("titulo-rbc-calibracao")}
                    </Heading>
                  </Flex>
                  <Center>
                    <Link
                      target='_blank'
                      href='https://contemp.com.br/Certificado-Acreditaçao-INMETRO - 24.04.21.pdf'
                      _hover={{ textDecoration: 'none' }}
                    >
                      <Button
                        w='100%'
                        maxW='344px'
                        h='50px'
                        borderRadius='25px'
                        mt='24px'
                        bg='red.600'
                        fontSize='20px'
                        _hover={{
                          transition: 'all 0.5s',
                          bg: 'black.800',
                          color: 'white',
                        }}
                      >
                        {t("Certificado Acreditação INMETRO")}
                      </Button>
                    </Link>
                  </Center>
                </Box>
              </Flex>
            </Container>
          </Flex>
        </Container>
        <Flex w='100%' alignItems='center' bg='red.600' p={['0 20px', '0 20px', '0 20px', '0 20px', '0 20px']}>
          <Container maxW='7xl' p='72px 0'>
            <Heading as={'h2'} className='calibracao-titulo text-white negrito centro' mb='50px'>
              {t("titulo8-calibracao")}
            </Heading>
            <Text className='paragrafo-branco text-white centro' m='50px 0 25px'>
              {t("paragrafo18-calibracao")}
            </Text>
            <Center>
              <Link
                href='https://laboratorio.contemp.com.br/'
                isExternal
                target={'_blank'}
                _hover={{ textDecoration: 'none' }}
              >
                <Button
                  border='none'
                  color='black.800'
                  bg='white'
                  w='243px'
                  h='50px'
                  textAlign='center'
                  _hover={{
                    transition: 'all 0.4s',
                    bg: 'black.800',
                    color: 'white',
                  }}
                >
                  {t("botao-padroes-calibracao")}
                </Button>
              </Link>
            </Center>
          </Container>
        </Flex>
      </Box>
      {/* <Player /> */}
      <Contact
        id='duvidas-e-orcamentos'
        title={t("contact-titulo-calibracao")}
        description={t("contact-descricao-calibracao")}
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
      <FooterCompleto />
    </>
  )
}

export default Calibracao
