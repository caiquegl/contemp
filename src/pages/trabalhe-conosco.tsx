import { Header } from "../components/Header";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { FooterCompleto } from "../components/FooterCompleto";
import { Flex, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Box, Heading } from "@chakra-ui/react";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <meta name="description" content="Trabalhe na Contemp. Preencha nosso formulário online e faça parte da indústria que é pioneira no Brasil." />
        <meta name="keywords" content="Contemp, Trabalhe conosco, currículo" />
        <title>Trabalhe Conosco</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="center"
        direction="column"
        h="80px"
      >
        <Heading as={'h2'} className="trabalheconosco-titulo text-white negrito centro">
          Trabalhe Conosco 
        </Heading>
      </Flex>
      
      <Contact
        id="vagas"
        title="VENHA FAZER PARTE DA EQUIPE CONTEMP"
        description="Estamos sempre em busca dos melhores profissionais do Brasil. Preencha o formulário e aguarde a oportunidade mais próxima."
        ocultAddres={true}
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
            name: "Telefone",
            type: "text",
          },
          {
            name: "Área desejada",
            type: "select",
            options: ["Administração","Marketing","Vendas", "Outros"],
          },
          {
            type: "upload",
          },
          {
            name: "Mensagem",
            type: "textArea",
          },
        ]}
      />
      <FooterCompleto />
    </>
  );
};

export default Home;
