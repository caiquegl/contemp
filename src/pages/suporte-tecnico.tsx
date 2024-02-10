import { Container, Flex, Text, Link, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Box, Heading } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { FooterCompleto } from '../components/FooterCompleto'
import { Player } from '../components/Player'
import { SelectConfig } from '../components/SelectConfig'
import Head from 'next/head'

const Support = () => {
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
          Suporte Técnico
        </Heading>

      </Flex>
      <Flex w='100%' alignItems='center' bg='white' p={['0 20px', '0 20px', '0 20px', '0 20px', '0 20px']}>
        <Container maxW='7xl' p='12px 0 100px'>
          <Text className='text-black paragrafo-preto' mt={'1rem'} lineHeight='34px'>
            Nós da Contemp nos dedicamos continuamente à melhoria de nossos produtos e processos de fabricação, buscando
            fornecer instrumentos e sensores robustos e de alta durabilidade. Resultado de anos de esforço, conseguimos
            reduzir hoje os retornos em garantia para níveis inigualáveis no mercado, chegando a 0,2% de tudo que
            comercializamos.
          </Text>
          <Text className='text-black paragrafo-preto' mt={'1rem'} lineHeight='34px'>
            Caso precise de apoio técnico com um de nossos produtos, disponibilizamos para você nosso setor de suporte
            técnico. Entre em contato com um de nossos técnicos e acharemos a melhor maneira de lhe auxiliar. Contamos
            com os serviços de suporte telefônico, acesso remoto, visitas a campo, treinamento local e in company e
            consertos em nosso laboratório.
          </Text>
          <Text className='text-black paragrafo-preto' mt={'1rem'} lineHeight='34px'>
            Caso precise fale com nosso suporte técnico pelo telefone
            <Link color='black.900' href='tel:+551142235128' ml={'1%'} mr={'1%'} fontWeight={"bold"} _hover={{ color: 'red.600', }}>
              (11) 4223-5128
            </Link>
            ou acesse nosso chat.
          </Text>
          <Heading as={'h3'} className='suporte-titulo centro negrito text-red' mt='119px' mb='70px'>
            VIDEOS E TUTORIAIS
          </Heading>
          <SelectConfig />
        </Container>
      </Flex>
      <Flex w='100%' alignItems='center' bg='red.600' p={['0 20px', '0 20px', '0 20px', '0 20px', '0 20px']}>
        <Container maxW='7xl' p='72px 0 100px'>
          <Heading as={'h3'} className='suporte-titulo negrito centro text-white' mb='50px'>
            GARANTIA CONTEMP
          </Heading>
          <Text className='paragrafo-branco centro text-white' mt={'1rem'}>
            A Contemp garante que os equipamentos relacionados na Nota Fiscal de venda estão isentos de defeitos e
            cobertos por garantia de 12 meses a contar da data de emissão da referida Nota Fiscal. Ocorrendo defeito
            dentro do prazo de garantia, os equipamentos devem ser enviados à nossa fábrica, acompanhados de NF de
            remessa para conserto, onde serão reparados ou substituídos sem ônus, desde que comprovado o uso de acordo
            com as especificações técnicas.
          </Text>
          <Text className='paragrafo-branco centro text-white' mt={'1rem'}>
            O que a garantia não cobre, despesas indiretas como: fretes, viagens e estadias. A Contemp não assume
            nenhuma responsabilidade por qualquer tipo de perda, dano, acidente, ou lucro cessante decorrentes de falha
            ou defeito no equipamento, tão somente se comprometendo a consertar ou repor os componentes defeituosos
            quando comprovado o uso dentro das especificações técnicas.
          </Text>
          <Text className='paragrafo-branco centro text-white' mt={'1rem'}>
            A perda de garantia se processará caso haja algum defeito no equipamento e seja constatado que tal fato
            ocorreu devido à instalação elétrica inadequada e/ou o equipamento ter sido utilizado em ambiente agressivo,
            modificado sem autorização, sofrido violação ou utilizado fora das especificações técnicas.
          </Text>
        </Container>
      </Flex>
      {/* <Player /> */}
      <Contact
        id='duvidas-e-orcamentos'
        title='DÚVIDAS E ORÇAMENTOS'
        description='Fale com nossos especialistas pelos canais abaixo ou nos envie um e-mail.'
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
