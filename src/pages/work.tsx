import { Header } from "../components/Header";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Flex, Text } from "@chakra-ui/react";

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
          Trabalhe Conosco
        </Text>
      </Flex>
      <Contact
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
            options: ["Marketing"],
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
      <Footer />
    </>
  );
};

export default Home;
