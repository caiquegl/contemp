import {
  Box,
  Container,
  Flex,
  GridItem,
  HStack,
  Image,
  Text,
  Grid,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Player } from "../components/Player";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import CardProduct2 from "../components/CardProduct2";
import CardCatalog from "../components/CardCatalog";

const AllProduct = () => {
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
        <Text
          fontSize="40px"
          fontWeight="bold"
          textAlign="center"
          maxW="1037px"
        >
          Soluções para medição, controle e monitoramento para os mais variados
          processos industriais.
        </Text>
      </Flex>
      <Flex w="100%" alignItems="center" bg="white">
        <Container maxW="7xl" p="80px 0">
          <Flex alignItems="center">
            <Box w="70px" h="70px" bg="black.900" borderRadius="5px" />
            <Text color="black.800" fontSize="45px" fontWeight="bold" ml="15px">
              Categoria de Destaque
            </Text>
          </Flex>
          <Box h="650px" mt="31px">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              pagination={true}
              modules={[Autoplay, Pagination]}
              className="mySwiper"
            >
              <SwiperSlide>
                <CardProduct2
                  img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
                  text="teste"
                  description="Use o NFC do seu smartphone para configurar seu Controlador de Temperatura C719!"
                  bg="white"
                  borderColor="black.800"
                  notHover={true}
                />
              </SwiperSlide>
              <SwiperSlide>
                <CardProduct2
                  img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
                  text="teste"
                  description="Use o NFC do seu smartphone para configurar seu Controlador de Temperatura C719!"
                  bg="white"
                  borderColor="black.800"
                  notHover={true}
                />
              </SwiperSlide>
              <SwiperSlide>
                <CardProduct2
                  img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
                  text="teste"
                  description="Use o NFC do seu smartphone para configurar seu Controlador de Temperatura C719!"
                  bg="white"
                  borderColor="black.800"
                  notHover={true}
                />
              </SwiperSlide>
              <SwiperSlide>
                <CardProduct2
                  img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
                  text="teste"
                  description="Use o NFC do seu smartphone para configurar seu Controlador de Temperatura C719!"
                  bg="white"
                  borderColor="black.800"
                  notHover={true}
                />
              </SwiperSlide>
              <SwiperSlide>
                <CardProduct2
                  img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
                  text="teste"
                  description="Use o NFC do seu smartphone para configurar seu Controlador de Temperatura C719!"
                  bg="white"
                  borderColor="black.800"
                  notHover={true}
                />
              </SwiperSlide>
              <SwiperSlide>
                <CardProduct2
                  img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
                  text="teste"
                  description="Use o NFC do seu smartphone para configurar seu Controlador de Temperatura C719!"
                  bg="white"
                  borderColor="black.800"
                  notHover={true}
                />
              </SwiperSlide>
              <SwiperSlide>
                <CardProduct2
                  img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
                  text="teste"
                  description="Use o NFC do seu smartphone para configurar seu Controlador de Temperatura C719!"
                  bg="white"
                  borderColor="black.800"
                  notHover={true}
                />
              </SwiperSlide>
              <SwiperSlide>
                <CardProduct2
                  img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
                  text="teste"
                  description="Use o NFC do seu smartphone para configurar seu Controlador de Temperatura C719!"
                  bg="white"
                  borderColor="black.800"
                  notHover={true}
                />
              </SwiperSlide>
              <SwiperSlide>
                <CardProduct2
                  img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
                  text="teste"
                  description="Use o NFC do seu smartphone para configurar seu Controlador de Temperatura C719!"
                  bg="white"
                  borderColor="black.800"
                  notHover={true}
                />
              </SwiperSlide>
              <SwiperSlide>
                <CardProduct2
                  img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
                  text="teste"
                  description="Use o NFC do seu smartphone para configurar seu Controlador de Temperatura C719!"
                  bg="white"
                  borderColor="black.800"
                  notHover={true}
                />
              </SwiperSlide>
            </Swiper>
          </Box>
          <HStack mt="61px" justifyContent="center" spacing="48px">
            <Image
              src="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
              alt="bateri"
            />
            <Image
              src="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
              alt="bateri"
            />
          </HStack>
        </Container>
      </Flex>
      <Flex w="100%" alignItems="center" bg="white.500">
        <Container maxW="7xl" p="80px 0">
          <Text color="black.800" fontSize="45px" fontWeight="bold" mb="31px">
            Navegue por Categoria
          </Text>
          <Grid templateColumns="repeat(4, 1fr)" gap="15px">
            <CardCatalog
              bg="black.800"
              color="white"
              title="Controladores de Temperatura e Processo"
              text="Os indicadores de processos i414 foram projetados com tecnologia nacional de ponta para serem versáteis, robustos e de fácil uso."
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            />
            <CardCatalog
              bg="white"
              color="black.800"
              title="Indicadores de Temperatura e Processo"
              text="Os indicadores de processos i414 foram projetados com tecnologia nacional de ponta para serem versáteis, robustos e de fácil uso."
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            />
            <CardCatalog
              bg="red.600"
              color="white"
              title="Contadores e Temporizadores"
              text="Os indicadores de processos i414 foram projetados com tecnologia nacional de ponta para serem versáteis, robustos e de fácil uso."
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            />
            <CardCatalog
              bg="white"
              color="black.800"
              title="Placas Controladoras de Temperatura e Processo"
              text="Os indicadores de processos i414 foram projetados com tecnologia nacional de ponta para serem versáteis, robustos e de fácil uso."
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            />
            <CardCatalog
              bg="white"
              color="black.800"
              title="IHM - Interface Contemp"
              text="Os indicadores de processos i414 foram projetados com tecnologia nacional de ponta para serem versáteis, robustos e de fácil uso."
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            />
            <CardCatalog
              bg="black.800"
              color="white"
              title="Transmissores de Umidade e Temperatura"
              text="Os indicadores de processos i414 foram projetados com tecnologia nacional de ponta para serem versáteis, robustos e de fácil uso."
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            />
            <CardCatalog
              bg="white"
              color="black.800"
              title="Transmissores de Pressão"
              text="Os indicadores de processos i414 foram projetados com tecnologia nacional de ponta para serem versáteis, robustos e de fácil uso."
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            />
            <CardCatalog
              bg="red.600"
              color="white"
              title="Aquisitor Analógico Datalogger"
              text="Os indicadores de processos i414 foram projetados com tecnologia nacional de ponta para serem versáteis, robustos e de fácil uso."
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            />
            <CardCatalog
              bg="black.800"
              color="white"
              title="Controladores de Temperatura e Processo"
              text="Os indicadores de processos i414 foram projetados com tecnologia nacional de ponta para serem versáteis, robustos e de fácil uso."
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            />
            <CardCatalog
              bg="white"
              color="black.800"
              title="Indicadores de Temperatura e Processo"
              text="Os indicadores de processos i414 foram projetados com tecnologia nacional de ponta para serem versáteis, robustos e de fácil uso."
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            />
            <CardCatalog
              bg="red.600"
              color="white"
              title="Contadores e Temporizadores"
              text="Os indicadores de processos i414 foram projetados com tecnologia nacional de ponta para serem versáteis, robustos e de fácil uso."
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            />
            <CardCatalog
              bg="white"
              color="black.800"
              title="Placas Controladoras de Temperatura e Processo"
              text="Os indicadores de processos i414 foram projetados com tecnologia nacional de ponta para serem versáteis, robustos e de fácil uso."
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            />
            <CardCatalog
              bg="white"
              color="black.800"
              title="IHM - Interface Contemp"
              text="Os indicadores de processos i414 foram projetados com tecnologia nacional de ponta para serem versáteis, robustos e de fácil uso."
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            />
            <CardCatalog
              bg="black.800"
              color="white"
              title="Transmissores de Umidade e Temperatura"
              text="Os indicadores de processos i414 foram projetados com tecnologia nacional de ponta para serem versáteis, robustos e de fácil uso."
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            />
            <CardCatalog
              bg="white"
              color="black.800"
              title="Transmissores de Pressão"
              text="Os indicadores de processos i414 foram projetados com tecnologia nacional de ponta para serem versáteis, robustos e de fácil uso."
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            />
            <CardCatalog
              bg="red.600"
              color="white"
              title="Aquisitor Analógico Datalogger"
              text="Os indicadores de processos i414 foram projetados com tecnologia nacional de ponta para serem versáteis, robustos e de fácil uso."
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            />
            <CardCatalog
              bg="black.800"
              color="white"
              title="Controladores de Temperatura e Processo"
              text="Os indicadores de processos i414 foram projetados com tecnologia nacional de ponta para serem versáteis, robustos e de fácil uso."
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            />
            <CardCatalog
              bg="white"
              color="black.800"
              title="Indicadores de Temperatura e Processo"
              text="Os indicadores de processos i414 foram projetados com tecnologia nacional de ponta para serem versáteis, robustos e de fácil uso."
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            />
            <CardCatalog
              bg="red.600"
              color="white"
              title="Contadores e Temporizadores"
              text="Os indicadores de processos i414 foram projetados com tecnologia nacional de ponta para serem versáteis, robustos e de fácil uso."
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            />
            <CardCatalog
              bg="white"
              color="black.800"
              title="Placas Controladoras de Temperatura e Processo"
              text="Os indicadores de processos i414 foram projetados com tecnologia nacional de ponta para serem versáteis, robustos e de fácil uso."
              img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
            />
          </Grid>
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

export default AllProduct;
