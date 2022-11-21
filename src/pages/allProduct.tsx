import {
  Box,
  Container,
  Flex,
  Text,
  Grid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Player } from "../components/Player";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import CardProductWithDescription from "../components/CardProductWithDescription";
import CardCatalog from "../components/CardCatalog";
import { Image } from '../components/Image'
import { pxToRem } from "../utils/pxToRem";

const products = [] as number[]

for (let i = 0; i < 10; i++) {
  products.push(i + 1)
}

const AllProduct = () => {
  const isTablet = useBreakpointValue({
    base: true,
    lg: false,
  });

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  return (
    <>
      <Header />
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="center"
        direction="column"
        h={["350px", "350px", "250px", "250px", "250px", "250px"]}
      >
        <Text
          fontSize={["30px", "30px", "40px", "40px", "40px", "40px"]}
          fontWeight="bold"
          textAlign="center"
          maxW="1037px"
          p={["0 20px", "0 20px", "0 20px", "0 20px", "0"]}
        >
          Soluções para medição, controle e monitoramento para os mais variados
          processos industriais.
        </Text>
      </Flex>
      <Flex
        w="100%"
        alignItems="center"
        bg="white"
        p={["0 20px", "0 20px", "0 20px", "0 20px", "0"]}
      >
        <Container maxW="7xl" p="80px 0">
          <Flex alignItems="center">
            <Box w="70px" h="70px" bg="black.900" borderRadius="5px" />
            <Text color="black.800" fontSize="45px" fontWeight="bold" ml="15px">
              Categoria de Destaque
            </Text>
          </Flex>
          <Box h={pxToRem(650)} mt="31px">
            <Swiper
              slidesPerView={isMobile ? 1 : isTablet ? 2 : 3}
              spaceBetween={30}
              autoplay={{
                delay: 2000,
                pauseOnMouseEnter: true,
              }}
              pagination={true}
              modules={[Autoplay, Pagination]}
              className="mySwiper"
            >
              {products.map((item) => (
                <SwiperSlide>
                  <CardProductWithDescription
                    img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
                    text={`Teste ${item}`}
                    description="Use o NFC do seu smartphone para configurar seu Controlador de Temperatura C719!"
                  />
                </SwiperSlide>
              ))}               
            </Swiper>
          </Box>

          <Flex
            mt={pxToRem(61)}
            alignItems="center"
            justifyContent="space-between"
            direction={["column", "column", "column", "row", "row"]}
          >
            <AdBanner />
            <AdBanner />
          </Flex>

        </Container>
      </Flex>
      <Flex w="100%" alignItems="center" bg="white.500">
        <Container maxW="7xl" p="80px 0">
          <Text
            color="black.800"
            fontSize="45px"
            fontWeight="bold"
            mb="31px"
            p={["0 20px", "0 20px", "0 20px", "0 20px", "0"]}
          >
            Navegue por Categoria
          </Text>
          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
              "repeat(4, 1fr)",
              "repeat(4, 1fr)",
            ]}
            gap={["0", "0", "15px", "15px", "15px", "15px"]}
          >
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

const AdBanner = () => {
  return (
    <Image
      src="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
      alt="bateria"
      bgSize="contain"
      minH={{
        base: pxToRem(228),
        md: pxToRem(330),
        lg: pxToRem(425)
      }}
      flex={0.8}
    />
  )
}

export default AllProduct;
