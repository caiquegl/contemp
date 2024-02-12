import { Header } from "../components/Header";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { FooterCompleto } from "../components/FooterCompleto";
import { Flex, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, Box, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { useTransition } from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const  { t } = useTranslation();
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
        {t("titulopagina-trabalheconosco")}
        </Heading>
      </Flex>
      
      <Contact
        id="vagas"
        title={t("contact-title-trabalheconosco")}
        description={t("contact-description-trabalheconosco")}
        ocultAddres={true}
        form={[
          {
            name: t('label-nome'),
            type: 'text',
          },
          {
            name: t('label-email'),
            type: 'text',
          },
          {
            name: t('label-telefone'),
            type: 'text',
          },
          {
            name: t('label-area-desejada'),
            type: 'select',
            options: [
              t('option-administracao'),
              t('option-marketing'),
              t('option-vendas'),
              t('option-outros'),
            ],
          },
          {
            type: 'upload',
          },
          {
            name: t('label-mensagem'),
            type: 'textArea',
          },
        ]}
        
      />
      <FooterCompleto />
    </>
  );
};

export default Home;
