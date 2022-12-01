import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  Button,
  Image as ImageChakra,
  Icon,
} from "@chakra-ui/react";
import Iso from "../assets/images/iso.png";
import Image from "next/image";
import { Header } from "../components/Header";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Player } from "../components/Player";
import { BiTargetLock } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import { CiMedal } from "react-icons/ci";
import { HiOutlineDocumentText } from "react-icons/hi";
import { CgTrees } from "react-icons/cg";

const Home = () => {
  return (
    <>
      <Header />
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="center"
        direction="column"
        h="250px"
      >
        <Text fontSize="45px" fontWeight="bold" textAlign="center">
          Sobre nós
        </Text>
      </Flex>
      <Flex
        w="100%"
        alignItems="center"
        bg="white"
        p={[
          "0 20px 256px 20px",
          "0 20px 256px 20px",
          "0 20px 256px 20px",
          "0 20px 256px 20px",
          "0px 0 256px",
        ]}
      >
        <Container maxW="7xl" p="12px 0 31px">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            mb="60px"
            flexDirection={["column", "column", "row", "row", "row"]}
          >
            <Text
              fontSize="20px"
              maxW="535px"
              color="black.900"
              textAlign="justify"
              mr="40px"
            >
              A certeza de poder confiar sua linha de produção aos produtos e
              serviços da Contemp é algo que não surgiu por acaso. É o resultado
              dos mais de 35 anos de competência, dedicação e conhecimento
              fabricando soluções para medição, controle e monitoramento para os
              mais variados processos industriais.
            </Text>
            <ImageChakra
              src="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
              w="100%"
              maxW="788px"
            />
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            mb="60px"
            flexDirection={["column", "column", "row", "row", "row"]}
          >
            <Box mb={["20px", "20px", "0", "0", "0"]}>
              <Text
                fontSize="20px"
                maxW="931px"
                color="black.900"
                textAlign="justify"
                mr="40px"
              >
                A isso você soma a qualidade, facilidade de operação,
                atendimento e o suporte diferenciado. A Contemp sabe que tudo
                isso não tem preço! E por esse motivo não cobra por aquilo que
                considera sua principal razão de existir: assegurar a
                tranquilidade de seus clientes.
              </Text>
              <Text
                fontSize="20px"
                maxW="931px"
                color="black.900"
                textAlign="justify"
                mt="40px"
              >
                Sua história é uma trajetória de conquistas que se iniciou em
                1984 e continua nos dias atuais. A experiência que adquiriu ao
                longo desse caminho está presente nos processos das principais
                indústrias, dos mais diversos segmentos, o que contribuiu para
                formação de importantes alianças e parcerias de confiança. Cada
                passo visa fazer de seus produtos sinônimos de credibilidade,
                transparecendo segurança e satisfação para o cliente.
              </Text>
            </Box>
            <Box ml="40px">
              <Text
                fontSize="20px"
                fontWeight="bold"
                mb="10px"
                color="black.900"
              >
                QUALIFICAÇÃO
              </Text>
              <HStack spacing="23px">
                <Box w="115px" h="115px">
                  <Image src={Iso} width="115px" height="115px" />
                </Box>
                <Text maxW="249px" fontSize="20px" color="black.900">
                  Sistema de Gestão da Qualidade Certificado ISO 9001
                </Text>
              </HStack>
              <Button
                w="263px"
                h="50px"
                borderRadius="25px"
                mr="24px"
                bg="red.600"
                fontSize="20px"
                _hover={{ transition: "all 0.5s", opacity: 0.7 }}
              >
                Certificado ISO 9001
              </Button>
            </Box>
          </Flex>
        </Container>
      </Flex>
      <Flex
        w="100%"
        p={[
          "0 20px 256px 20px",
          "0 20px 256px 20px",
          "0 20px 256px 20px",
          "0 20px 256px 20px",
          "0px 0 256px",
        ]}
        alignItems="center"
        bg="red.600"
      >
        <Container maxW="7xl" p="12px 0 31px">
          <Flex
            justifyContent="space-between"
            mb="60px"
            flexDirection={["column", "column", "row", "row", "row"]}
          >
            <Box w="100%" maxW="788px">
              <ImageChakra
                src="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
                w="100%"
                maxW="788px"
                mt="-213px"
              />
            </Box>
            <Box mt="83px">
              <Text maxW="535px" fontSize="20px">
                A Contemp disponibiliza uma gama de soluções adequadas para
                diversos segmentos da indústria, e também para fabricantes de
                máquinas e equipamentos, integradores e revendedores, atendendo
                às necessidades e especificidades de cada cliente.
              </Text>
            </Box>
          </Flex>
          <Flex
            justifyContent="space-between"
            mb="60px"
            flexDirection={["column", "column", "column", "row", "row"]}
          >
            <Box>
              <Flex alignItems="flex-start" mb="43px">
                <Flex
                  borderRadius="full"
                  bg="white"
                  w="56px"
                  h="56px"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={BiTargetLock} fontSize="28px" color="red.600" />
                </Flex>
                <Box
                  ml="20px"
                  w="100%"
                  maxW={["100%", "100%", "100%", "400px", "400px"]}
                >
                  <Text fontWeight="bold" fontSize="20px" mb="10px">
                    MISSÃO
                  </Text>
                  <Text
                    fontSize="20px"
                    maxW={["100%", "100%", "100%", "530px", "530px"]}
                  >
                    Garantir a melhor solução para medição e controle de
                    temperatura em processos industriais, com excelência técnica
                    em produtos e atendimento.
                  </Text>
                </Box>
              </Flex>
              <Flex alignItems="flex-start" mb="43px">
                <Flex
                  borderRadius="full"
                  bg="white"
                  w="56px"
                  h="56px"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={AiOutlineLike} fontSize="28px" color="red.600" />
                </Flex>
                <Box
                  ml="20px"
                  w="100%"
                  maxW={["100%", "100%", "100%", "400px", "400px"]}
                >
                  <Text fontWeight="bold" fontSize="20px" mb="10px">
                    VALORES
                  </Text>
                  <Text
                    fontSize="20px"
                    maxW={["100%", "100%", "100%", "530px", "530px"]}
                  >
                    Conhecimento técnico, experiência na indústria, sabe ouvir,
                    ética e transparência nas atitudes, engajamento para
                    entregar o combinado, comprometimento e persistência para
                    atingir a excelência.
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box>
              <Flex alignItems="flex-start" mb="43px">
                <Flex
                  borderRadius="full"
                  bg="white"
                  w="56px"
                  h="56px"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon
                    as={HiOutlineDocumentText}
                    fontSize="28px"
                    color="red.600"
                  />
                </Flex>
                <Box
                  ml="20px"
                  w="100%"
                  maxW={["100%", "100%", "100%", "400px", "400px"]}
                >
                  <Text fontWeight="bold" fontSize="20px" mb="10px">
                    ESTRUTURA EFICIENTE
                  </Text>
                  <Text
                    fontSize="20px"
                    maxW={["100%", "100%", "100%", "530px", "530px"]}
                  >
                    É notável o cumprimento de metas da Contemp. Sua eficiência
                    corresponde a uma estrutura com forte capacidade de resposta
                    ao setor.
                  </Text>
                </Box>
              </Flex>
              <Flex alignItems="flex-start" mb="43px">
                <Flex
                  borderRadius="full"
                  bg="white"
                  w="56px"
                  h="56px"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={CgTrees} fontSize="28px" color="red.600" />
                </Flex>
                <Box
                  ml="20px"
                  w="100%"
                  maxW={["100%", "100%", "100%", "400px", "400px"]}
                >
                  <Text fontWeight="bold" fontSize="20px" mb="10px">
                    RESPONSABILIDADE AMBIENTAL
                  </Text>
                  <Text
                    fontSize="20px"
                    maxW={["100%", "100%", "100%", "530px", "530px"]}
                  >
                    Todo o descarte de lixo eletrônico feito pela Contemp é
                    através de empresa especializada que atua na reciclagem de
                    eletrônicos, os quais, se entrarem em decomposição no meio
                    ambiente, contaminam o solo e os lençóis freáticos.
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Flex>

          <Flex alignItems="flex-start" mb="43px" w="100%">
            <Flex
              borderRadius="full"
              bg="white"
              w="56px"
              h="56px"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={CiMedal} fontSize="28px" color="red.600" />
            </Flex>
            <Box ml="20px" w="calc(100% - 76px)">
              <Text fontWeight="bold" fontSize="20px" mb="10px">
                POLÍTICA DA QUALIDADE
              </Text>
              <Text fontSize="20px">
                Manter e melhorar continuamente o sistema de gestão da qualidade
                conforme norma NBR ISO 9001. Fornecer produtos e serviços que
                atendam às normas aplicáveis e aos requisitos acordados com
                nossos clientes. Proporcionar o crescimento da organização
                através do comprometimento de todos os envolvidos e
                participantes do plano de direcionamento estratégico da Contemp.
              </Text>
            </Box>
          </Flex>
        </Container>
      </Flex>
      <Player />
      <Contact
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

export default Home;
