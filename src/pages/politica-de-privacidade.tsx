import { Box, Button, Center, Container, Flex, Link, Text, Heading, UnorderedList, ListItem } from '@chakra-ui/react'
import Head from 'next/head'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { FooterCompleto } from '../components/FooterCompleto'
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Conheça a política de privacidade da Contemp." />
        <title>Política de Privacidade da Contemp</title>
        <link rel='icon' href='/favicon.png' />
      </Head>
      <Header />
      <Box backgroundColor={'var(--white-primary)'} p={'0'}>
        <Box backgroundColor={'var(--black-primary)'} p={'0'}>
          <Flex w='100%' alignItems='center' justifyContent='center' direction='column' h='80px'>
            <Heading as={'h2'} className='calibracao-titulo text-white centro'>
              {t("titulopagina-privacidade")}
            </Heading>
          </Flex>
        </Box>
        <Container maxWidth={'var(--max-tamanho)'}>
          <Box w='100%' bg='white' p={['0 20px', '0 20px', '0 20px', '0 20px', '0 20px']}>
            <Heading as={'h1'} className='calibracao-titulo text-red negrito' mt='100px'>
              {t("titulo1-privacidade")}
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              {t("paragrafo1-privacidade")}
            </Text>
            <Text className='paragrafo-preto text-black' mt='15px' lineHeight='34px'>
              {t("paragrafo2-privacidade")}
            </Text>
            <Text className='paragrafo-preto text-black' mt='15px' lineHeight='34px'>
              {t("paragrafo3-privacidade")}
            </Text>
            <Text className='paragrafo-preto text-black' mt='15px' lineHeight='34px'>
              {t("paragrafo4-privacidade")}
            </Text>
            <Text className='paragrafo-preto text-black' mt='15px' lineHeight='34px'>
              {t("paragrafo5-privacidade")}
            </Text>
            <Text className='paragrafo-preto text-black' mt='15px' lineHeight='34px'>
              {t("paragrafo6-privacidade")}
            </Text>

            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
              {t("titulo2-privacidade")}
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              {t("paragrafo7-privacidade")}
            </Text>

            <Heading as={'h1'} className='calibracao-titulo text-red negrito' mt='100px'>
              {t("titulo3-privacidade")}
            </Heading>
            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
              {t("titulo4-privacidade")}
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              {t("paragrafo8-privacidade")}
            </Text>

            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
              {t("titulo5-privacidade")}
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              {t("paragrafo9-privacidade")}
            </Text>

            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
              {t("titulo6-privacidade")}
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              {t("paragrafo10-privacidade")}
            </Text>

            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
              {t("titulo7-privacidade")}
            </Heading>
            <Text className='paragrafo-preto text-black negrito' mt='25px' lineHeight='34px'>
              {t("titulo8-privacidade")}
            </Text>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
              {t("paragrafo11-privacidade")}
            </Text>
            <Text className='paragrafo-preto text-black negrito' mt='25px' lineHeight='34px'>
              {t("titulo9-privacidade")}
            </Text>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
              {t("paragrafo12-privacidade")}
            </Text>
            <Text className='paragrafo-preto text-black negrito' mt='25px' lineHeight='34px'>
              {t("titulo10-privacidade")}
            </Text>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
              {t("paragrafo13-privacidade")}
            </Text>


            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
              {t("titulo11-privacidade")}
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              {t("paragrafo14-privacidade")}
            </Text>
            <Text className='paragrafo-preto text-black negrito' mt='25px' lineHeight='34px'>
              {t("titulo12-privacidade")}
            </Text>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
              {t("paragrafo15-privacidade")}
            </Text>
            <Text className='paragrafo-preto text-black negrito' mt='25px' lineHeight='34px'>
              {t("titulo13-privacidade")}
            </Text>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
              {t("paragrafo16-privacidade")}
            </Text>
            <Text className='paragrafo-preto text-black negrito' mt='25px' lineHeight='34px'>
              {t("titulo14-privacidade")}
            </Text>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
              {t("paragrafo17-privacidade")}
            </Text>

            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
              {t("titulo15-privacidade")}
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              {t("paragrafo18-privacidade")} {t("paragrafo18.1-privacidade")}
            </Text>
            <UnorderedList className='paragrafo-preto text-black' lineHeight='34px'>
              <ListItem>
                {t("paragrafo19-privacidade")}
              </ListItem>
            </UnorderedList>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
              {t("paragrafo20-privacidade")}
            </Text>
            <UnorderedList className='paragrafo-preto text-black' lineHeight='34px'>
              <ListItem>
                {t("paragrafo21-privacidade")}
              </ListItem>
              <ListItem>
                {t("paragrafo22-privacidade")}
              </ListItem>
              <ListItem>
                {t("paragrafo23-privacidade")}
              </ListItem>
              <ListItem>
                {t("paragrafo24-privacidade")}
              </ListItem>
            </UnorderedList>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
             {t("paragrafo25-privacidade")}
            </Text>
            <UnorderedList className='paragrafo-preto text-black' lineHeight='34px'>
              <ListItem>
                {t("paragrafo26-privacidade")}
              </ListItem>
              <ListItem>
                {t("paragrafo27-privacidade")}
              </ListItem>
            </UnorderedList>

            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
              {t("titulo16-privacidade")}
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              {t("paragrafo28-privacidade")}
            </Text>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
              {t("paragrafo29-privacidade")}
            </Text>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
              {t("paragrafo30-privacidade")}
            </Text>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
              {t("paragrafo31-privacidade")}
            </Text>

            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
            {t("titulo17-privacidade")}
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px' pb={'5%'}>
            {t("paragrafo32-privacidade")}
            </Text>
          </Box>
        </Container>
      </Box>
      <FooterCompleto />
    </>
  )
}

export default PrivacyPolicy;
