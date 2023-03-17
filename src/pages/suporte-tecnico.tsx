import { Container, Flex, Text } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
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
        <title>Dúvidas e Orçamentos</title>
        <link rel='icon' href='/favicon.png' />
      </Head>
      <Header />
      <Flex w='100%' alignItems='center' justifyContent='center' direction='column' h='180px'>
        <Text fontSize='45px' fontWeight='bold' textAlign='center'>
          Suporte Técnico
        </Text>
      </Flex>
      <Flex w='100%' alignItems='center' bg='white' p={['0 20px', '0 20px', '0 20px', '0 20px', '0 20px']}>
        <Container maxW='7xl' p='12px 0 100px'>
          <Text fontSize='20px' color='black.900' mt='50px' lineHeight='34px'>
            Nós da Contemp nos dedicamos continuamente à melhoria de nossos produtos e processos de fabricação, buscando
            fornecer instrumentos e sensores robustos e de alta durabilidade. Resultado de anos de esforço, conseguimos
            reduzir hoje os retornos em garantia para níveis inigualáveis no mercado, chegando a 0,2% de tudo que
            comercializamos.
          </Text>
          <Text fontSize='20px' color='black.900' mt='50px' lineHeight='34px'>
            Caso precise de apoio técnico com um de nossos produtos, disponibilizamos para você nosso setor de suporte
            técnico. Entre em contato com um de nossos técnicos e acharemos a melhor maneira de lhe auxiliar. Contamos
            com os serviços de suporte telefônico, acesso remoto, visitas a campo, treinamento local e in company e
            consertos em nosso laboratório
          </Text>
          <Text mt='119px' fontWeight='bold' fontSize='45px' textAlign='center' mb='70px' color='red.600'>
            VIDEOS E TUTORIAIS
          </Text>
          <SelectConfig />
        </Container>
      </Flex>
      <Flex w='100%' alignItems='center' bg='red.600' p={['0 20px', '0 20px', '0 20px', '0 20px', '0 20px']}>
        <Container maxW='7xl' p='72px 0 100px'>
          <Text fontSize='45px' fontWeight='bold' textAlign='center' mb='50px'>
            GARANTIA CONTEMP
          </Text>
          <Text fontSize='20px' textAlign='center'>
            A Contemp garante que os equipamentos relacionados na Nota Fiscal de venda estão isentos de defeitos e
            cobertos por garantia de 12 meses a contar da data de emissão da referida Nota Fiscal. Ocorrendo defeito
            dentro do prazo de garantia, os equipamentos devem ser enviados à nossa fábrica, acompanhados de NF de
            remessa para conserto, onde serão reparados ou substituídos sem ônus, desde que comprovado o uso de acordo
            com as especificações técnicas.
          </Text>
          <Text fontSize='20px' textAlign='center'>
            O que a garantia não cobre, despesas indiretas como: fretes, viagens e estadias. A Contemp não assume
            nenhuma responsabilidade por qualquer tipo de perda, dano, acidente, ou lucro cessante decorrentes de falha
            ou defeito no equipamento, tão somente se comprometendo a consertar ou repor os componentes defeituosos
            quando comprovado o uso dentro das especificações técnicas.
          </Text>
          <Text fontSize='20px' textAlign='center'>
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
        description='Essa é a seleção que a equipe da Contemp escolheu como os
              destaques do mês'
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
      <Footer />
    </>
  )
}

export default Support
