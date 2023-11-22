import { Box, Button, Center, Container, Flex, Link, Text, Heading } from '@chakra-ui/react'
import Head from 'next/head'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const PrivacyPolicy = () => {
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
              Política de Privacidade
            </Heading>
          </Flex>
        </Box>
        <Container maxWidth={'var(--max-tamanho)'}>
          <Box w='100%' bg='white' p={['0 20px', '0 20px', '0 20px', '0 20px', '0 20px']}>
            <Heading as={'h1'} className='calibracao-titulo text-red negrito' mt='100px'>
              Política de Privacidade
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              Na Contemp, reconhecemos a importância da sua privacidade e estamos empenhados em respeitar e proteger as informações que coletamos, seja por meio do nosso site ou de outras plataformas que possuímos e operamos.
            </Text>

            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
              Coleta de Informações
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              Solicitamos informações pessoais apenas quando necessário para fornecer serviços a você. Essa coleta é realizada de maneira justa e legal, com seu conhecimento e consentimento. Informamos claramente o motivo da coleta e como as informações serão utilizadas. Mantemos apenas as informações pelo tempo necessário para cumprir a finalidade para a qual foram coletadas, protegendo-as contra perdas, roubos, acesso não autorizado, divulgação, cópia, uso ou modificação.
            </Text>

            {/* ... (continuar para outras seções) ... */}

            <Heading as={'h1'} className='calibracao-titulo text-red negrito' mt='100px'>
              Política de Cookies Contemp
            </Heading>
            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
              O que são cookies?
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              Este site utiliza cookies, pequenos arquivos baixados em seu computador, para melhorar sua experiência de navegação. Nesta seção, explicamos quais informações esses cookies coletam, como as utilizamos e como você pode gerenciar suas preferências.
            </Text>

            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
              Uso de Cookies
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              Os cookies são utilizados para diversos fins, incluindo o gerenciamento de contas, login eficiente, newsletters por e-mail, processamento de pedidos e pesquisas. Além disso, usamos cookies para lembrar suas preferências de navegação e proporcionar uma experiência personalizada.
            </Text>

            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
              Cookies de Terceiros
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              Em alguns casos, contamos com cookies de terceiros confiáveis, como o <Link href="https://analytics.google.com/" color="red.600" isExternal>Google Analytics</Link> e <Link href="https://www.google.com/adsense/" color="red.600" isExternal>Google AdSense</Link>, para análise de desempenho e exibição de anúncios relevantes. Recomendamos a consulta às políticas de privacidade desses terceiros para obter informações detalhadas sobre o uso de cookies.
            </Text>

            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
              Compromisso do Usuário
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              Ao utilizar nossos serviços, o usuário compromete-se a não realizar atividades ilegais, disseminar conteúdo prejudicial ou causar danos aos sistemas da Contemp, seus fornecedores ou terceiros.
            </Text>

            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
              Mais Informações
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px' pb={'4%'}>
              Esperamos que estas informações tenham esclarecido nossa abordagem em relação à privacidade. Se houver dúvidas, recomendamos manter os cookies ativados ao interagir com nosso site. Esta política entra em vigor a partir de novembro de 2022. Para mais detalhes, entre em contato conosco.
            </Text>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  )
}

export default PrivacyPolicy;
