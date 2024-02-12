import { Box, Container, Flex, HStack, Text, Button, Icon, Link, textDecoration, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Heading } from '@chakra-ui/react'
import Iso from '../assets/images/iso.png'
import Image from 'next/image'
import { Header } from '../components/Header'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import GTranslateWrapper from '../components/GTranslateWrapper';
import { FooterCompleto } from '../components/FooterCompleto'
import { Player } from '../components/Player'
import { BiTargetLock } from 'react-icons/bi'
import { AiOutlineLike } from 'react-icons/ai'
import { CiMedal } from 'react-icons/ci'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { CgTrees } from 'react-icons/cg'
import Head from 'next/head'
import Banner1 from '../assets/images/contemp-fachada.webp'
import Banner2 from '../assets/images/contemp-sobre.webp'
import { setContextMenuFalse } from '../utils/setContextMenuFalse'
import { useTransition } from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const  { t } = useTranslation();
  return (
    <>
      <Head>
        <meta
          name='description'
          content='Procurando medição e controle de temperatura em processos industrais? A Contemp é pioneiro no Brasil. Confira!'
        />
        <meta name='keywords' content='controle de temperatura, Contemp, processos industriais' />
        <title>A Contemp</title>
        <link rel='icon' href='/favicon.png' />
      </Head>
      <Header />
      <GTranslateWrapper />
      <Flex w='100%' alignItems='center' justifyContent='center' direction='column' h='80px'>
        <Heading as={'h2'} className='sobre-titulo negrito text-white'>
          {t("titulopagina-sobre")}
        </Heading>
      </Flex>
      <Flex
        w='100%'
        alignItems='center'
        bg='white'
        p={[
          '40px 40px 10px 40px',
          '40px 40px 10px 40px',
          '40px 40px 10px 40px',
          '40px 40px 10px 40px',
          '40px 40px 10px 40px',
        ]}
      >
        <Container maxW='7xl' p='12px 0 31px'>
          <Flex
            alignItems='center'
            justifyContent='space-between'
            mb='60px'
            flexDirection={['column', 'column', 'row', 'row', 'row']}
          >
            <Box>
              <Text fontSize='1rem' maxW='535px' color='black.900' textAlign='justify' mr='40px'>
              {t("paragrafo1-sobre")}
              </Text>
              <Text fontSize='1rem' maxW='535px' color='black.900' textAlign='justify' mr='40px' mt='15px'>
              {t("paragrafo2-sobre")}
              </Text>
              <Text fontSize='1rem' maxW='535px' color='black.900' textAlign='justify' mr='40px' mt='15px'>
              {t("paragrafo3-sobre")}
              </Text>
            </Box>

            <Box w='100%' maxW='788px'>
              <Image src={Banner1} onContextMenu={setContextMenuFalse} />
            </Box>
          </Flex>
          <Flex
            alignItems='center'
            justifyContent='space-between'
            mb='60px'
            flexDirection={['column', 'column', 'row', 'row', 'row']}
          >
            <Box mb={['20px', '20px', '0', '0', '0']}>
              <Text fontSize='1rem' maxW='931px' color='black.900' textAlign='justify' mr='40px'></Text>
              <Text fontSize='1rem' maxW='931px' color='black.900' textAlign='justify' mt='0px'>
              {t("paragrafo4-sobre")}
              </Text>
            </Box>
            <Box ml='40px' backgroundColor={'#ededed'} padding={'44px 60px'} borderRadius={'8px'}>
              <Heading as={'h3'} fontSize='20px' fontWeight='bold' mb='10px' color='black.900'>
              {t("titulo-iso")}
              </Heading>
              <HStack spacing='23px'>
                <Box w='115px' h='115px'>
                  <Image src={Iso} width='115px' height='115px' onContextMenu={setContextMenuFalse} />
                </Box>
                <Text fontSize='1rem' color='black.900' marginTop={'-9%'}>
                {t("descricao-iso")}
                </Text>
              </HStack>
              <Link
                target='_blank'
                href='https://contemp.com.br/Certificado-ISO-9001-OUT24.pdf'
                _hover={{ textDecoration: 'none' }}
              >
                <Button
                  w='263px'
                  h='50px'
                  borderRadius='25px'
                  mr='24px'
                  bg='red.600'
                  fontSize='20px'
                  color='white'
                  _hover={{
                    textDecoration: 'none',
                    transition: 'all 0.5s',
                    bg: 'black.800',
                    color: 'white',
                  }}
                >
                  {t("botao-iso")}
                </Button>
              </Link>
            </Box>
          </Flex>
        </Container>
      </Flex>
      <Flex
        w='100%'
        p={[
          '40px 40px 40px 40px',
          '40px 40px 40px 40px',
          '40px 40px 40px 40px',
          '40px 40px 40px 40px',
          '40px 40px 40px 40px',
        ]}
        alignItems='center'
        bg='red.600'
      >
        <Container maxW='7xl' p='12px 0 31px'>
          <Flex justifyContent='space-between' mb='60px' flexDirection={['column', 'column', 'row', 'row', 'row']}>
            <Box mt='38px'>
              <Text className='paragrafo-branco text-white'>
              {t("paragrafo5-sobre")}
              </Text>
            </Box>
          </Flex>
          <Flex justifyContent='space-between' mb='0px' flexDirection={['column', 'column', 'column', 'row', 'row']}>
            <Box>
              <Flex alignItems='flex-start' mb='43px'>
                <Box w='60px'>
                  <Flex borderRadius='full' bg='white' w='56px' h='56px' alignItems='center' justifyContent='center'>
                    <Icon as={BiTargetLock} fontSize='28px' color='red.600' />
                  </Flex>
                </Box>

                <Box ml='20px' w='100%' maxW={['100%', '100%', '100%', '400px', '500px']}>
                  <Heading as={'h3'} color='var(--white-primary)' fontWeight='bold' fontSize='1rem' mb='10px'>
                  {t("titulo-missao")}
                  </Heading>
                  <Text className='paragrafo-branco text-white' maxW={['100%', '100%', '100%', '530px', '530px']}>
                  {t("descricao-missao")}
                  </Text>
                </Box>
              </Flex>
              <Flex alignItems='flex-start' mb='43px'>
                <Box w='60px'>
                  <Flex borderRadius='full' bg='white' w='56px' h='56px' alignItems='center' justifyContent='center'>
                    <Icon as={AiOutlineLike} fontSize='28px' color='red.600' />
                  </Flex>
                </Box>
                <Box ml='20px' w='100%' maxW={['100%', '100%', '100%', '400px', '500px']}>
                  <Heading as={'h3'} color='var(--white-primary)' fontWeight='bold' fontSize='1rem' mb='10px'>
                  {t("titulo-valores")}
                  </Heading>
                  <Text className='paragrafo-branco text-white' maxW={['100%', '100%', '100%', '530px', '500px']}>
                  {t("descricao-valores")}
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box>
              <Flex alignItems='flex-start' mb='43px'>
                <Box w='60px'>
                  <Flex borderRadius='full' bg='white' w='56px' h='56px' alignItems='center' justifyContent='center'>
                    <Icon as={HiOutlineDocumentText} fontSize='28px' color='red.600' />
                  </Flex>
                </Box>
                <Box ml='20px' w='100%' maxW={['100%', '100%', '100%', '400px', '500px']}>
                  <Heading as={'h3'} color='var(--white-primary)' fontWeight='bold' fontSize='1rem' mb='10px'>
                  {t("titulo-estruturaeficiente")}
                  </Heading>
                  <Text className='paragrafo-branco text-white' maxW={['100%', '100%', '100%', '530px', '500px']}>
                  {t("descricao-estruturaeficiente")}
                  </Text>
                </Box>
              </Flex>
              <Flex alignItems='flex-start' mb='43px'>
                <Box w='60px'>
                  <Flex borderRadius='full' bg='white' w='56px' h='56px' alignItems='center' justifyContent='center'>
                    <Icon as={CgTrees} fontSize='28px' color='red.600' />
                  </Flex>
                </Box>
                <Box ml='20px' w='100%' maxW={['100%', '100%', '100%', '400px', '500px']}>
                  <Heading as={'h3'} color='var(--white-primary)' fontWeight='bold' fontSize='1rem' mb='10px'>
                  {t("titulo-responsabilidadeambiental")}
                  </Heading>
                  <Text className='paragrafo-branco text-white' maxW={['100%', '100%', '100%', '530px', '500px']}>
                  {t("descricao-responsabilidadeambiental")}
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Flex>

          <Flex alignItems='flex-start' mb='43px' w='100%'>
            <Box w='60px'>
              <Flex borderRadius='full' bg='white' w='56px' h='56px' alignItems='center' justifyContent='center'>
                <Icon as={CiMedal} fontSize='28px' color='red.600' />
              </Flex>
            </Box>
            <Box ml='20px' w='calc(100% - 76px)'>
              <Heading as={'h3'} color='var(--white-primary)' fontWeight='bold' fontSize='1rem' mb='10px'>
              {t("titulo-politicadequalidade")}
              </Heading>
              <Text className='paragrafo-branco text-white'>
              {t("descricao-politicadequalidade")}
              </Text>
            </Box>
          </Flex>
        </Container>
      </Flex>
      {/* <Player /> */}
      <Contact
        id='duvidas-e-orcamentos'
        title={t("contact-title")}
        description={t("contact-description")}
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

export default Home
