import { Box, Button, Center, Container, Flex, Link, Text, Heading, UnorderedList, ListItem } from '@chakra-ui/react'
import Head from 'next/head'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { FooterCompleto } from '../components/FooterCompleto'

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
              A sua privacidade é importante para nós. É política da Contemp respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site da Contemp, e outros sites que possuímos e operamos.
              Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornece um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
            </Text>
            <Text className='paragrafo-preto text-black' mt='15px' lineHeight='34px'>
              Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
            </Text>
            <Text className='paragrafo-preto text-black' mt='15px' lineHeight='34px'>
              Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
            </Text>
            <Text className='paragrafo-preto text-black' mt='15px' lineHeight='34px'>
              O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
            </Text>
            <Text className='paragrafo-preto text-black' mt='15px' lineHeight='34px'>
              Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
            </Text>
            <Text className='paragrafo-preto text-black' mt='15px' lineHeight='34px'>
              O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.
            </Text>

            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
              Coleta de Informações
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              Solicitamos informações pessoais apenas quando necessário para fornecer serviços a você. Essa coleta é realizada de maneira justa e legal, com seu conhecimento e consentimento. Informamos claramente o motivo da coleta e como as informações serão utilizadas. Mantemos apenas as informações pelo tempo necessário para cumprir a finalidade para a qual foram coletadas, protegendo-as contra perdas, roubos, acesso não autorizado, divulgação, cópia, uso ou modificação.
            </Text>

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
              Desativar Cookies
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              Você pode impedir a configuração de cookies ajustando as configurações do seu navegador (consulte a Ajuda do navegador para saber como fazer isso). Esteja ciente de que a desativação de cookies afetará a funcionalidade deste e de muitos outros sites que você visita. A desativação de cookies geralmente resultará na desativação de determinadas funcionalidades e recursos deste site. Portanto, é recomendável que você não desative os cookies.
            </Text>

            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
              Cookies que definimos
            </Heading>
            <Text className='paragrafo-preto text-black negrito' mt='25px' lineHeight='34px'>
              • Cookies relacionados à conta
            </Text>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
              Se você criar uma conta conosco, usaremos cookies para o gerenciamento do processo de inscrição e administração geral. Esses cookies geralmente serão excluídos quando você sair do sistema, porém, em alguns casos, eles poderão permanecer posteriormente para lembrar as preferências do seu site ao sair.
            </Text>
            <Text className='paragrafo-preto text-black negrito' mt='25px' lineHeight='34px'>
              • Cookies relacionados ao login
            </Text>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
              Utilizamos cookies quando você está logado, para que possamos lembrar dessa ação. Isso evita que você precise fazer login sempre que visitar uma nova página. Esses cookies são normalmente removidos ou limpos quando você efetua logout para garantir que você possa acessar apenas a recursos e áreas restritas ao efetuar login.
            </Text>
            <Text className='paragrafo-preto text-black negrito' mt='25px' lineHeight='34px'>
              • Cookies relacionados a boletins por e-mail
            </Text>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
              Este site oferece serviços de assinatura de boletim informativo ou e-mail e os cookies podem ser usados ​​para lembrar se você já está registrado e se deve mostrar determinadas notificações válidas apenas para usuários inscritos / não inscritos.
            </Text>


            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
            Pedidos processando cookies relacionados
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
            Este site oferece facilidades de comércio eletrônico ou pagamento e alguns cookies são essenciais para garantir que seu pedido seja lembrado entre as páginas, para que possamos processá-lo adequadamente.
            </Text>
            <Text className='paragrafo-preto text-black negrito' mt='25px' lineHeight='34px'>
            • Cookies relacionados a pesquisas
            </Text>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
            Periodicamente, oferecemos pesquisas e questionários para fornecer informações interessantes, ferramentas úteis ou para entender nossa base de usuários com mais precisão. Essas pesquisas podem usar cookies para lembrar quem já participou numa pesquisa ou para fornecer resultados precisos após a alteração das páginas.
            </Text>
            <Text className='paragrafo-preto text-black negrito' mt='25px' lineHeight='34px'>
            • Cookies relacionados a formulários
            </Text>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
            Quando você envia dados por meio de um formulário como os encontrados nas páginas de contacto ou nos formulários de comentários, os cookies podem ser configurados para lembrar os detalhes do usuário para correspondência futura.
            </Text>
            <Text className='paragrafo-preto text-black negrito' mt='25px' lineHeight='34px'>
            • Cookies de preferências do site
            </Text>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
            Para proporcionar uma ótima experiência neste site, fornecemos a funcionalidade para definir suas preferências de como esse site é executado quando você o usa. Para lembrar suas preferências, precisamos definir cookies para que essas informações possam ser chamadas sempre que você interagir com uma página for afetada por suas referências.
            </Text>

            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
              Cookies de Terceiros
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              Em alguns casos, contamos com cookies de terceiros confiáveis, como o <Link href="https://analytics.google.com/" color="red.600" isExternal>Google Analytics</Link> e <Link href="https://www.google.com/adsense/" color="red.600" isExternal>Google AdSense</Link>, para análise de desempenho e exibição de anúncios relevantes. Recomendamos a consulta às políticas de privacidade desses terceiros para obter informações detalhadas sobre o uso de cookies.
            </Text>
            <UnorderedList className='paragrafo-preto text-black' lineHeight='34px'>
              <ListItem>Este site usa o Google Analytics, que é uma das soluções de análise mais difundidas e confiáveis ​​da Web, para nos ajudar a entender como você usa o site e como podemos melhorar sua experiência. Esses cookies podem rastrear itens como quanto tempo você gasta no site e as páginas visitadas, para que possamos continuar produzindo conteúdo atraente.</ListItem>
            </UnorderedList>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
              Para mais informações sobre cookies do Google Analytics, consulte a página oficial do Google Analytics.
            </Text>
            <UnorderedList className='paragrafo-preto text-black' lineHeight='34px'>
              <ListItem>
                As análises de terceiros são usadas para rastrear e medir o uso deste site, para que possamos continuar produzindo conteúdo atrativo. Esses cookies podem rastrear itens como o tempo que você passa no site ou as páginas visitadas, o que nos ajuda a entender como podemos melhorar o site para você.
              </ListItem>
              <ListItem>
                Periodicamente, testamos novos recursos e fazemos alterações sutis na maneira como o site se apresenta. Quando ainda estamos testando novos recursos, esses cookies podem ser usados ​​para garantir que você receba uma experiência consistente enquanto estiver no site, enquanto entendemos quais otimizações os nossos usuários mais apreciam.
              </ListItem>
              <ListItem>
                À medida que vendemos produtos, é importante entendermos as estatísticas sobre quantos visitantes de nosso site realmente compram e, portanto, esse é o tipo de dados que esses cookies rastrearão. Isso é importante para você, pois significa que podemos fazer previsões de negócios com precisão que nos permitem analisar nossos custos de publicidade e produtos para garantir o melhor preço possível.
              </ListItem>
              <ListItem>
                O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.
              </ListItem>
            </UnorderedList>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
              Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.
            </Text>
            <UnorderedList className='paragrafo-preto text-black' lineHeight='34px'>
              <ListItem>
                Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados ​​por este site foram projetados para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.
              </ListItem>
              <ListItem>
                Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que possamos creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam qualquer promoção que pode fornecê-lo para fazer uma compra.
              </ListItem>
            </UnorderedList>

            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
              Compromisso do Usuário
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px'>
              O usuário se compromete a fazer uso adequado dos conteúdos e da informação que a Contemp oferece no site e com caráter enunciativo, mas não limitativo:
            </Text>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
              A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;
            </Text>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
              B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, onde dá a Bola ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;
            </Text>
            <Text className='paragrafo-preto text-black' lineHeight='34px'>
              C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) da Contemp, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.
            </Text>

            <Heading as={'h2'} className='calibracao-subtitulo text-red negrito' mt='40px'>
              Mais Informações
            </Heading>
            <Text className='paragrafo-preto text-black' mt='25px' lineHeight='34px' pb={'5%'}>
              Esperamos que estas informações tenham esclarecido nossa abordagem em relação à privacidade. Se houver dúvidas, recomendamos manter os cookies ativados ao interagir com nosso site. Esta política entra em vigor a partir de novembro de 2022. Para mais detalhes, entre em contato conosco.
            </Text>
          </Box>
        </Container>
      </Box>
      <FooterCompleto />
    </>
  )
}

export default PrivacyPolicy;
