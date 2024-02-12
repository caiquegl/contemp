import { Container, Flex, Text, Link, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Box, Heading } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { FooterCompleto } from '../components/FooterCompleto'
import { Player } from '../components/Player'
import { SelectConfig } from '../components/SelectConfig'
import Head from 'next/head'
import { useTransition } from 'react';
import { useTranslation } from 'react-i18next';

const Support = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <meta
          name='description'
          content='Conte com o suporte técnico da Contemp para tirar dúvidas sobre os produtos que comercializamos. Acesse!'
        />
        <meta name='keywords' content='suporte técnico, Contemp, pós-venda' />
        <title>Suporte Técnico</title>
        <link rel='icon' href='/favicon.png' />
      </Head>
      <Header />
      <Flex w='100%' alignItems='center' justifyContent='center' direction='column' h='160px'>
        <Heading as={'h2'} className='suporte-titulo text-white negrito centro'>
          {t("titulopagina-suportetecnico")}
        </Heading>

      </Flex>
      <Flex w='100%' alignItems='center' bg='white' p={['0 20px', '0 20px', '0 20px', '0 20px', '0 20px']}>
        <Container maxW='7xl' p='12px 0 100px'>
          <Text className='text-black paragrafo-preto' mt={'1rem'} lineHeight='34px'>
            {t("paragrafo1-suportetecnico")}
          </Text>
          <Text className='text-black paragrafo-preto' mt={'1rem'} lineHeight='34px'>
            {t("paragrafo2-suportetecnico")}
          </Text>
          <Text className='text-black paragrafo-preto' mt={'1rem'} lineHeight='34px'>
            {t("paragrafo3-suportetecnico")}
            <Link color='black.900' href='tel:+551142235128' ml={'1%'} mr={'1%'} fontWeight={"bold"} _hover={{ color: 'red.600', }}>
              (11) 4223-5128
            </Link>
            {t("paragrafo3.1-suportetecnico")}
          </Text>
          <Heading as={'h3'} className='suporte-titulo centro negrito text-red' mt='119px' mb='70px'>
            {t("titulo1-suportetecnico")}
          </Heading>
          <SelectConfig />
        </Container>
      </Flex>
      <Flex w='100%' alignItems='center' bg='red.600' p={['0 20px', '0 20px', '0 20px', '0 20px', '0 20px']}>
        <Container maxW='7xl' p='72px 0 100px'>
          <Heading as={'h3'} className='suporte-titulo negrito centro text-white' mb='50px'>
            {t("titulo2-suportetecnico")}
          </Heading>
          <Text className='paragrafo-branco centro text-white' mt={'1rem'}>
            {t("paragrafo4-suportetecnico")}
          </Text>
          <Text className='paragrafo-branco centro text-white' mt={'1rem'}>
            {t("paragrafo5-suportetecnico")}
          </Text>
          <Text className='paragrafo-branco centro text-white' mt={'1rem'}>
            {t("paragrafo6-suportetecnico")}
          </Text>
        </Container>
      </Flex>
      {/* <Player /> */}
      <Contact
        id='duvidas-e-orcamentos'
        title={t("contact-titulo-suportetecnico")}
        description={t("contact-descricao-suportetecnico")}
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

export default Support
