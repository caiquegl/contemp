import { Box, Container, Flex, HStack, Text, Button, Icon, Link, textDecoration, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Heading } from '@chakra-ui/react'
import Iso from '../assets/images/iso.png'
import Image from 'next/image'
import { Header } from '../components/Header'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
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

const Home = () => {
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
      <Flex w='100%' alignItems='center' justifyContent='center' direction='column' h='160px'>
        <Heading as={'h2'} className='sobre-titulo negrito text-white'>
          Sobre nós
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
              Sua história é uma trajetória de conquistas que se iniciou em 1984 e continua nos dias atuais.
              A experiência que adquiriu ao longo desse caminho está presente nos processos das principais indústrias,
              dos mais diversos segmentos, o que contribuiu para formação de importantes alianças e parcerias de confiança.
              Cada passo visa fazer de seus produtos sinônimos de credibilidade, transparecendo segurança e satisfação para o cliente.
              </Text>
              <Text fontSize='1rem' maxW='535px' color='black.900' textAlign='justify' mr='40px' mt='15px'>
              A certeza de poder confiar sua linha de produção aos produtos e serviços da Contemp é algo que não surgiu por acaso. Desde 1984,
              trazendo competência, dedicação e conhecimento para a criação de soluções para medição, controle e monitoramento para os mais variados processos industriais
              </Text>
              <Text fontSize='1rem' maxW='535px' color='black.900' textAlign='justify' mr='40px' mt='15px'>
              Além disso, você acrescenta a qualidade, a facilidade de operação, o atendimento personalizado e o suporte diferenciado.
              A Contemp sabe que tudo isso não tem preço! Dessa forma,cobra-se por aquilo que considera a principal razão de sua
              existência: assegurar a tranquilidade dos seus clientes.
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
              A certificação ISO 9001 é um testemunho do nosso compromisso com a qualidade, transparência e melhoria contínua. Na Contemp, cada membro da nossa equipe se orgulha de contribuir para uma cultura organizacional que busca constantemente elevar os padrões, garantindo que nossos clientes recebam sempre o melhor em produtos e serviços. Estamos comprometidos em ser a escolha confiável para aqueles que valorizam a qualidade em cada processo.
              </Text>
            </Box>
            <Box ml='40px' backgroundColor={'#ededed'} padding={'44px 60px'} borderRadius={'8px'}>
              <Heading as={'h3'} fontSize='20px' fontWeight='bold' mb='10px' color='black.900'>
                QUALIFICAÇÃO
              </Heading>
              <HStack spacing='23px'>
                <Box w='115px' h='115px'>
                  <Image src={Iso} width='115px' height='115px' onContextMenu={setContextMenuFalse} />
                </Box>
                <Text fontSize='1rem' color='black.900' marginTop={'-9%'}>
                  Sistema de Gestão da Qualidade Certificado ISO 9001
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
                  Certificado ISO 9001
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
                A Contemp disponibiliza uma gama de soluções adequadas para diversos segmentos da indústria, e também
                para fabricantes de máquinas e equipamentos, integradores e revendedores, atendendo às necessidades e
                especificidades de cada cliente.
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
                    MISSÃO
                  </Heading>
                  <Text className='paragrafo-branco text-white' maxW={['100%', '100%', '100%', '530px', '530px']}>
                    Garantir a melhor solução para medição e controle de temperatura em processos industriais, com
                    excelência técnica em produtos e atendimento.
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
                    VALORES
                  </Heading>
                  <Text className='paragrafo-branco text-white' maxW={['100%', '100%', '100%', '530px', '500px']}>
                    Conhecimento técnico, experiência na indústria, sabe ouvir, ética e transparência nas atitudes,
                    engajamento para entregar o combinado, comprometimento e persistência para atingir a excelência.
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
                    ESTRUTURA EFICIENTE
                  </Heading>
                  <Text className='paragrafo-branco text-white' maxW={['100%', '100%', '100%', '530px', '500px']}>
                    É notável o cumprimento de metas da Contemp. Sua eficiência corresponde a uma estrutura com forte
                    capacidade de resposta ao setor.
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
                    RESPONSABILIDADE AMBIENTAL
                  </Heading>
                  <Text className='paragrafo-branco text-white' maxW={['100%', '100%', '100%', '530px', '500px']}>
                    Todo o descarte de lixo eletrônico feito pela Contemp é através de empresa especializada que atua na
                    reciclagem de eletrônicos, os quais, se entrarem em decomposição no meio ambiente, contaminam o solo
                    e os lençóis freáticos.
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
                POLÍTICA DA QUALIDADE
              </Heading>
              <Text className='paragrafo-branco text-white'>
                Manter e melhorar continuamente o sistema de gestão da qualidade conforme norma NBR ISO 9001. Fornecer
                produtos e serviços que atendam às normas aplicáveis e aos requisitos acordados com nossos clientes.
                Proporcionar o crescimento da organização através do comprometimento de todos os envolvidos e
                participantes do plano de direcionamento estratégico da Contemp.
              </Text>
            </Box>
          </Flex>
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
      <Footer />
    </>
  )
}

export default Home
