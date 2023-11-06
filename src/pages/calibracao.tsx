import { Box, Button, Center, Container, Flex, Link, ListItem, Text, UnorderedList, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Heading } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { Player } from '../components/Player'
import { SelectConfigCalibration } from '../components/SelectConfigCalibration'
import Head from 'next/head'
import Image from 'next/image'
import IMGCalibration from '../assets/images/Lab_contemp.png'
import Iso from '../assets/images/iso.png'
import Imetro from '../assets/images/imetro.png'

const Calibracao = () => {
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
              Calibração
            </Heading>
          </Flex>
        </Box>
        <Container maxWidth={'var(--max-tamanho)'}>
        <Box w='100%' bg='white' p={['0 20px', '0 20px', '0 20px', '0 20px', '0 20px']}>
          <Container maxW='7xl' p='12px 0 0px' px='20px'>
            <Heading as={'h3'} className='calibracao-subtitulo text-red negrito' mt='100px'>
              Calibrações efetuadas com símbolo de acreditação – RBC
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              Nossos laboratórios possuem equipamentos e padrões que garantem a qualidade e confiabilidade das medições,
              as calibrações são efetuadas segundo procedimentos de rotina, avaliados periodicamente, nossos técnicos são
              treinados e avaliados segundo critérios definidos pelo Inmetro.
            </Text>
            <Flex direction={['column', 'row']} alignItems='center' mt='40px' mb='81px'>
              <Box maxW='488px'>
                <Image src={IMGCalibration} />
              </Box>
              <Box w={['100%', 'calc(100% - 488px)']} ml={['0px', '20px']}>
                <Heading as={'h3'} className='calibracao-subtitulo text-red negrito'>
                  Calibrações realizadas na Contemp ou em sua empresa
                </Heading>
                <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
                  As calibrações com ou sem símbolo de acreditação podem ser efetuadas no laboratório da Contemp ou nas
                  dependências do cliente, segundo nosso escopo.
                </Text>
              </Box>
            </Flex>
            <Heading as={'h3'} className='calibracao-subtitulo text-red negrito'>
              Calibrações efetuadas com símbolo de acreditação – RBC
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              Nossos laboratórios possuem equipamentos e padrões que garantem a qualidade e confiabilidade das medições,
              as calibrações são efetuadas segundo procedimentos de rotina, avaliados periodicamente, nossos técnicos são
              treinados e avaliados segundo critérios definidos pelo Inmetro.
            </Text>
          </Container>
        </Box>
        <Box w='100%' bg='white.500' p={['60px 20px', '60px 20px', '60px 20px', '60px 20px', '60px 20px']} pt='100px'>
          <Container maxW='7xl' p='12px 0 40px'>
            <Heading className='calibracao-subtitulo text-red negrito'>
              Técnicos
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              Nossos técnicos são altamente capacitados, e avaliados periodicamente, também são habilitados a realizar
              ajustes com a finalidade de atendimento das características metrológicas de cada instrumento, adequando
              assim aos critérios de aceitação definidos pelo cliente ou critérios normativos. Devido a experiência,
              nossos técnicos têm condições de fornecer informações para solução de prováveis problemas com os
              instrumentos que controlam ou medem seus processos, ou até mesmo indicação para aquisição de instrumentos
              mais adequados à sua necessidade.
            </Text>
            <Flex direction={['column', 'row']} mt='61px'>
              <Box w={['100%', '50%']}>
                <Heading className='calibracao-subtitulo text-black negrito' mb='25px'>
                  Sistema de Gerenciamento de Calibração Contemp
                </Heading>
                <Text className='paragrafo-preto text-black' mb='25px'>
                  Para clientes aos quais trabalhamos na modalidade contratual, disponibilizamos gratuitamente nosso
                  sistema de gerenciamento de calibrações com as seguintes facilidades:
                </Text>
                <UnorderedList>
                  <ListItem className='paragrafo-preto text-black'>
                    Telas específicas;
                  </ListItem>
                  <ListItem className='paragrafo-preto text-black'>
                    Cadastro de instrumentos;
                  </ListItem>
                  <ListItem className='paragrafo-preto text-black'>
                    Cadastro de usuários;
                  </ListItem>
                  <ListItem className='paragrafo-preto text-black'>
                    Controle de manutenção preventiva;
                  </ListItem>
                  <ListItem className='paragrafo-preto text-black'>
                    Consulta de instrumentos através de filtros específicos;
                  </ListItem>
                  <ListItem className='paragrafo-preto text-black'>
                    Consulta de agenda de calibração através de filtros específicos;
                  </ListItem>
                  <ListItem className='paragrafo-preto text-black'>
                    Análise crítica dos certificados;
                  </ListItem>
                  <ListItem className='paragrafo-preto text-black'>
                    Histórico de calibrações anteriores;
                  </ListItem>
                  <ListItem className='paragrafo-preto text-black'>
                    Histórico de possíveis defeitos em instrumentos;
                  </ListItem>
                  <ListItem className='paragrafo-preto text-black'>
                    Acesso por senha individual com controle de permissões;
                  </ListItem>
                </UnorderedList>
              </Box>
              <Box w={['100%', 'calc(100% - 488px)']} ml={['0px', '20px']}>
                <Text className='calibracao-subtitulo text-black negrito' mb='25px'>
                  Atendimento ao requisito CQI 9
                </Text>

                <UnorderedList>
                  <ListItem className='paragrafo-preto text-black'>
                    Calibração da instrumentação de controle e registro;
                  </ListItem>
                  <ListItem className='paragrafo-preto text-black'>
                    Calibração de termopares; Testes de precisão do sistema (SAT);
                  </ListItem>
                  <ListItem className='paragrafo-preto text-black'>
                    Avaliação da uniformidade de temperatura (TUS);
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
              ESCOPO DE CALIBRAÇÃO
            </Heading>
            <SelectConfigCalibration />
            <Heading as={'h2'} className='calibracao-titulo text-red centro negrito' mt='0px'>
              QUALIFICAÇÕES
            </Heading>
            <Flex mt='86px' alignItems='center' justifyContent='center' flexDirection={['column', 'row']}>
              <Box>
                <Flex alignItems='center'>
                  <Box w='115px' h='115px' mr='35px'>
                    <Image src={Iso} width='115px' height='115px' />
                  </Box>
                  <Heading as={'h4'} maxW='249px' fontSize='20px' color='black.900'>
                    Sistema de Gestão da Qualidade Certificado ISO 9001
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
                      Certificado ISO 9001
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
                    Rede Brasileira de Calibração (RBC)
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
                      Certificado Acreditação INMETRO
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
              ACESSO AOS PADRÕES DO LABORATÓRIO
            </Heading>
            <Text className='paragrafo-branco text-white centro' m='50px 0 25px'>
              Possui produtos Contemp? Nós temos uma base com todos os padrões de laboratório para consulta. Se preferir
              pode entrar em contato com nossa equipe técnica. Para consultar basta acessar o botão abaixo.
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
                  Acessar padrões
                </Button>
              </Link>
            </Center>
          </Container>
        </Flex>
      </Box>
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
      <Footer />
    </>
  )
}

export default Calibracao
