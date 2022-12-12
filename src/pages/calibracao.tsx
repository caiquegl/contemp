import { Box,
  Button,
  Center,
  Container,
  Flex,
  Link,
  ListItem,
  Text,
  UnorderedList,} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Player } from "../components/Player";
import { SelectConfigCalibration } from "../components/SelectConfigCalibration";
import Head from "next/head";
import Image from "next/image";
import IMGCalibration from "../assets/images/calibration.png"
import Iso from "../assets/images/iso.png";
import Imetro from "../assets/images/imetro.png";

const Calibracao = () => {
  return (
    <>
      <Head>
        <meta name="description" content="Conte com o suporte técnico da Contemp para tirar dúvidas sobre os produtos que comercializamos. Acesse!" />
        <meta name="keywords" content="suporte técnico, Contemp, pós-venda" />
        <title>Contemp</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="center"
        direction="column"
        h="250px"
      >
        <Text fontSize="45px" fontWeight="bold" textAlign="center">
          Calibração
        </Text>
      </Flex>
      <Box
        w="100%"
        bg="white"
        p={["0 20px", "0 20px", "0 20px", "0 20px", "0 20px"]}
        pt="100px"
      >
        <Container maxW="7xl" p="12px 0 77px">
          <Text fontSize="25px" fontWeight="bold" color="red.600" >
            Calibrações efetuadas com símbolo de acreditação – RBC
          </Text>
          <Text fontSize="20px" color="black.900" mt="25px" lineHeight="34px">
            Nossos laboratórios possuem equipamentos e padrões que garantem a qualidade e confiabilidade das medições, as calibrações são efetuadas segundo procedimentos de rotina, avaliados periodicamente, nossos técnicos são treinados e avaliados segundo critérios definidos pelo Inmetro.
          </Text>
          <Flex
            direction={["column", "row"]}
            alignItems="center"
            mt="40px"
            mb="81px"
          >
            <Box maxW="488px">
              <Image src={IMGCalibration} height={426} />
            </Box>
            <Box
              w={["100%", "calc(100% - 488px)"]}
              ml={["0px", "20px"]}
            >
              <Text fontSize="25px" fontWeight="bold" color="red.600" >
                Calibrações realizadas na Contemp ou em sua empresa
              </Text>
              <Text fontSize="20px" color="black.900" mt="25px" lineHeight="34px">
                As calibrações com ou sem símbolo de acreditação podem ser efetuadas no laboratório da Contemp ou nas dependências do cliente, segundo nosso escopo.
              </Text>
            </Box>
          </Flex>
          <Text fontSize="25px" fontWeight="bold" color="red.600" >
            Calibrações efetuadas com símbolo de acreditação – RBC
          </Text>
          <Text fontSize="20px" color="black.900" mt="25px" lineHeight="34px">
            Nossos laboratórios possuem equipamentos e padrões que garantem a qualidade e confiabilidade das medições, as calibrações são efetuadas segundo procedimentos de rotina, avaliados periodicamente, nossos técnicos são treinados e avaliados segundo critérios definidos pelo Inmetro.
          </Text>
        </Container>
      </Box>
      <Box
        w="100%"
        bg="white.500"
        p={["0 20px", "0 20px", "0 20px", "0 20px", "0 20px"]}
        pt="100px"
      >
        <Container maxW="7xl" p="12px 0 77px">
          <Text fontSize="25px" fontWeight="bold" color="red.600" >
            Técnicos
          </Text>
          <Text fontSize="20px" color="black.900" mt="25px" lineHeight="34px">
            Nossos técnicos são altamente capacitados, e avaliados periodicamente, também são habilitados a realizar ajustes com a finalidade de atendimento das características metrológicas de cada instrumento, adequando assim aos critérios de aceitação definidos pelo cliente ou critérios normativos. Devido a experiência, nossos técnicos têm condições de fornecer informações para solução de prováveis problemas com os instrumentos que controlam ou medem seus processos, ou até mesmo indicação para aquisição de instrumentos mais adequados à sua necessidade.
          </Text>
          <Flex
            direction={["column", "row"]}
            mt="61px"
            mb="136px"
          >
            <Box w={["100%", "50%"]}>
              <Text color="black.800" fontWeight="bold" fontSize="25px" mb="25px">
                Sistema de Gerenciamento de Calibração Contemp
              </Text>
              <Text color="black.800" fontSize="20px" mb="25px">
                Para clientes aos quais trabalhamos na modalidade contratual, disponibilizamos gratuitamente nosso sistema de gerenciamento de calibrações com as seguintes facilidades:
              </Text>
              <UnorderedList>
                <ListItem color="black.800" fontSize="20px">Telas específicas;</ListItem>
                <ListItem color="black.800" fontSize="20px">Cadastro de instrumentos;</ListItem>
                <ListItem color="black.800" fontSize="20px">Cadastro de usuários;</ListItem>
                <ListItem color="black.800" fontSize="20px">Controle de manutenção preventiva;</ListItem>
                <ListItem color="black.800" fontSize="20px">Consulta de instrumentos através de filtros específicos;</ListItem>
                <ListItem color="black.800" fontSize="20px">Consulta de agenda de calibração através de filtros específicos;</ListItem>
                <ListItem color="black.800" fontSize="20px">Análise crítica dos certificados;</ListItem>
                <ListItem color="black.800" fontSize="20px">Histórico de calibrações anteriores;</ListItem>
                <ListItem color="black.800" fontSize="20px">Histórico de possíveis defeitos em instrumentos;</ListItem>
                <ListItem color="black.800" fontSize="20px">Acesso por senha individual com controle de permissões;</ListItem>
              </UnorderedList>
            </Box>
            <Box
              w={["100%", "calc(100% - 488px)"]}
              ml={["0px", "20px"]}
            >
              <Text color="black.800" fontWeight="bold" fontSize="25px" mb="25px">
                Atendimento ao requisito CQI 9
              </Text>

              <UnorderedList>
                <ListItem color="black.800" fontSize="20px">Calibração da instrumentação de controle e registro;</ListItem>
                <ListItem color="black.800" fontSize="20px">Calibração de termopares; Testes de precisão do sistema (SAT);</ListItem>
                <ListItem color="black.800" fontSize="20px">Avaliação da uniformidade de temperatura (TUS);</ListItem>
              </UnorderedList>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Flex
        w="100%"
        alignItems="center"
        bg="white"
        p={["0 20px", "0 20px", "0 20px", "0 20px", "0 20px"]}
      >
        <Container maxW="7xl" p="12px 0 77px">
          <SelectConfigCalibration />
          <Text textAlign="center" color="red.600" fontWeight="bold" fontSize="45px" mt="107px">
            QUALIFICAÇÕES
          </Text>
          <Flex
            mt="86px"
            alignItems="center"
            justifyContent="center"
            flexDirection={["column", "row"]}
          >
            <Box>
              <Flex alignItems="center">
                <Box w="115px" h="115px" mr="35px">
                  <Image src={Iso} width="115px" height="115px" />
                </Box>
                <Text maxW="249px" fontSize="20px" color="black.900">
                  Sistema de Gestão da Qualidade Certificado ISO 9001
                </Text>
              </Flex>
              <Center>
                <Link target="_blank" href="/Certificado-ISO-9001-OUT24.pdf" _hover={{ textDecoration: 'none', color: 'white' }}>
                  <Button
                    w="100%"
                    maxW="263px"
                    h="50px"
                    borderRadius="25px"
                    mt="24px"
                    bg="red.600"
                    fontSize="20px"
                    _hover={{ transition: "all 0.5s", opacity: 0.7 }}
                  >
                    Certificado ISO 9001
                  </Button>
                </Link>
              </Center>

            </Box>
            <Box
              mt={["10px", 0]}
            >
              <Flex alignItems="center">
                <Box w="115px" h="115px" mr="35px">
                  <Image src={Imetro} width="115px" height="115px" />
                </Box>
                <Text maxW="249px" fontSize="20px" color="black.900">
                  Rede Brasileira de Calibração (RBC)
                </Text>
              </Flex>
              <Center>
                <Link target="_blank" href="https://contemp.com.br/?jet_download=2921" _hover={{ textDecoration: 'none', color: 'white' }}>
                  <Button
                    w="100%"
                    maxW="344px"
                    h="50px"
                    borderRadius="25px"
                    mt="24px"
                    bg="red.600"
                    fontSize="20px"
                    _hover={{ transition: "all 0.5s", opacity: 0.7 }}
                  >
                    Certificado Acreditação INMETRO
                  </Button>
                </Link>
              </Center>
            </Box>
          </Flex>
        </Container>
      </Flex>
      <Flex
        w="100%"
        alignItems="center"
        bg="red.600"
        p={["0 20px", "0 20px", "0 20px", "0 20px", "0 20px"]}
      >
        <Container maxW="7xl" p="72px 0">
          <Text fontSize="45px" fontWeight="bold" textAlign="center" mb="50px">
            ACESSO AOS PADRÕES DO LABORATÓRIO
          </Text>
          <Text fontSize="20px" textAlign="center" m="50px 0 25px">
            Possui produtos Contemp? Nós temos uma base com todos os padrões de laboratório para consulta. Se preferir pode entrar em contato com nossa equipe técnica. Para consultar basta acessar o botão abaixo.
          </Text>
          <Center>
            <Link href="https://laboratorio.contemp.com.br/" isExternal target={"_blank"} _hover={{ color: '#fff', textDecoration: 'none' }}>
              <Button
                mb="70px"
                border="none"
                color="black.800"
                bg="white"
                borderRadius="25px"
                w="243px"
                h="50px"
                textAlign="center"
              >
                Acessar padrões
              </Button>
            </Link>
          </Center>
        </Container>
      </Flex>
      <Player />
      <Contact
        id="duvidas-e-orcamentos"
        title="DÚVIDAS E ORÇAMENTOS"
        description="Essa é a seleção que a equipe da Contemp escolheu como os
              destaques do mês"
        form={[
          {
            name: "Nome",
            type: "text",
          },
          {
            name: "E-mail",
            type: "text",
          },
          {
            name: "Empresa",
            type: "text",
          },
          {
            name: "Telefone",
            type: "text",
          },
          {
            name: "Mensagem",
            type: "textArea",
          },
        ]}
      />
      <Footer />
    </>
  );
};

export default Calibracao;
