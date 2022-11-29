import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  Icon,
  Grid as GridChakra,
} from "@chakra-ui/react";
import Pirometro from "../assets/icons/pritometro_white.svg";
import Mapa from "../assets/images/MAPA.png";
import { Image } from "../components/Image";
import { BiPhone } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { CardBlog } from "../components/CardBlog";
import { Catalog } from "../components/Catalog";
import { Header } from "../components/Header";
import { Banner } from "../components/Banner";
import { Favorite } from "../components/Favorite";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Player } from "../components/Player";
import DescriptionProduct from "../components/DescriptionProduct";
import { pxToRem } from "../utils/pxToRem";
import { ProductCategoryWithIcon } from "../components/ProductCategoryWithIcon";
import { HomeBackgroundDetails } from "../components/HomeBackgroundDetails";
import { SmoothScroll } from "../components/SmoothScroll";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { database, initFirebase } from "../utils/db";
import { useRouter } from "next/router";

const Home = () => {
  initFirebase();
  const router = useRouter();
  const [tab2, setTab2] = useState<any>({})
  const [tab3, setTab3] = useState<any>({})
  const [tab4, setTab4] = useState<any>({})
  const [tab5, setTab5] = useState<any>({})
  const [tab6, setTab6] = useState<any>({})
  const [tab7, setTab7] = useState<any>({})

  const getHomeTab2 = async () => {
    try {
      const dbInstanceHome = collection(database, "home");
      let tab2:any = {}
      const qHome = query(dbInstanceHome, where("indexProduct", "==", 1), limit(1))

      await getDocs(qHome).then(async (data) => {
        if(data.docs.length === 0) return
        tab2 = data.docs[0].data()

        const docRef = doc(database, 'categories', data.docs[0].data().category);          
          const docSnap = await getDoc(docRef);
          if(docSnap.exists()) {
            tab2 = { ...tab2, nameCategory: docSnap.data().name };
          }
      });

      if(Object.keys(tab2).length === 0) return
      setTab2(tab2)
    } catch (error) {
      console.log(error)
      
    }
  }

  const getHomeTab3 = async () => {
    try {
      const dbInstanceHome = collection(database, "home");
      let tab3:any = {}
      const qHome = query(dbInstanceHome, where("indexProduct", "==", 2), limit(1))

      await getDocs(qHome).then(async (data) => {
        if(data.docs.length === 0) return
        tab3 = data.docs[0].data()

        const docRef = doc(database, 'categories', data.docs[0].data().category);          
          const docSnap = await getDoc(docRef);
          if(docSnap.exists()) {
            tab3 = { ...tab3, nameCategory: docSnap.data().name };
          }
      });

      if(Object.keys(tab3).length === 0) return
      setTab3(tab3)
    } catch (error) {
      console.log(error)
      
    }
  }

  const getHomeTab4 = async () => {
    try {
      const dbInstanceHome = collection(database, "home");
      let tab4:any = {}
      const qHome = query(dbInstanceHome, where("indexProduct", "==", 3), limit(1))

      await getDocs(qHome).then(async (data) => {
        if(data.docs.length === 0) return
        tab4 = data.docs[0].data()

        const docRef = doc(database, 'categories', data.docs[0].data().category);          
          const docSnap = await getDoc(docRef);
          if(docSnap.exists()) {
            tab4 = { ...tab4, nameCategory: docSnap.data().name };
          }
      });

      if(Object.keys(tab4).length === 0) return
      setTab4(tab4)
    } catch (error) {
      console.log(error)
      
    }
  }

  const getHomeTab5 = async () => {
    try {
      const dbInstanceHome = collection(database, "home");
      let tab5:any = {}
      const qHome = query(dbInstanceHome, where("indexProduct", "==", 4), limit(1))

      await getDocs(qHome).then(async (data) => {
        if(data.docs.length === 0) return
        tab5 = data.docs[0].data()

        const docRef = doc(database, 'categories', data.docs[0].data().category);          
          const docSnap = await getDoc(docRef);
          if(docSnap.exists()) {
            tab5 = { ...tab5, nameCategory: docSnap.data().name };
          }
      });

      if(Object.keys(tab5).length === 0) return
      setTab5(tab5)
    } catch (error) {
      console.log(error)
      
    }
  }

  const getHomeTab6 = async () => {
    try {
      const dbInstanceHome = collection(database, "home");
      let tab6:any = {}
      const qHome = query(dbInstanceHome, where("indexProduct", "==", 5), limit(1))

      await getDocs(qHome).then(async (data) => {
        if(data.docs.length === 0) return
        tab6 = data.docs[0].data()

        const docRef = doc(database, 'categories', data.docs[0].data().category);          
          const docSnap = await getDoc(docRef);
          if(docSnap.exists()) {
            tab6 = { ...tab6, nameCategory: docSnap.data().name };
          }
      });

      if(Object.keys(tab6).length === 0) return
      setTab6(tab6)
    } catch (error) {
      console.log(error)
      
    }
  }

  const getHomeTab7 = async () => {
    try {
      const dbInstanceHome = collection(database, "home");
      let tab7:any = {}
      const qHome = query(dbInstanceHome, where("indexProduct", "==", 6), limit(1))

      await getDocs(qHome).then(async (data) => {
        if(data.docs.length === 0) return
        tab7 = data.docs[0].data()

        const docRef = doc(database, 'categories', data.docs[0].data().category);          
          const docSnap = await getDoc(docRef);
          if(docSnap.exists()) {
            tab7 = { ...tab7, nameCategory: docSnap.data().name };
          }
      });

      if(Object.keys(tab7).length === 0) return
      setTab7(tab7)
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(() => {
    getHomeTab2()
    getHomeTab3()
    getHomeTab4()
    getHomeTab5()
    getHomeTab6()
    getHomeTab7()
  }, [])
  return (
    <SmoothScroll>
      <HomeBackgroundDetails />

      <Header />

      <Banner />

      <Favorite />

      <GridChakra
        templateColumns={{
          base: "1fr",
          md: `repeat(2, minmax(${pxToRem(300)}, 1fr))`,
        }}
      >
        <DescriptionProduct
          color="white"
          bg="red.600"
          borderColor="white"
          borderColorButton="white"
          dataTab={tab2}
          />
        <DescriptionProduct
          color="black.800"
          bg="white"
          borderColor="red.600"
          borderColorButton="black.800"
          dataTab={tab3}
        />
        <DescriptionProduct
          color="black.800"
          bg="white"
          borderColor="red.600"
          borderColorButton="black.800"
          containerProps={{
            direction: {
              base: "column",
              xl: "row-reverse",
            },
          }}
          dataTab={tab4}
        />
        <DescriptionProduct
          color="white"
          bg="red.600"
          borderColor="white"
          borderColorButton="white"
          containerProps={{
            direction: {
              base: "column",
              xl: "row-reverse",
            },
          }}
          dataTab={tab5}
        />
      </GridChakra>

      <Container
        maxW="6xl"
        p={[
          "12px 20px 31px 20px",
          "12px 20px 31px 20px",
          "12px 0 31px",
          "12px 0 31px",
          "12px 0 31px",
        ]}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexDirection={["column", "column", "row", "row", "row"]}
        >
          <Box
            flex={{
              base: "none",
              md: 1,
            }}
            textAlign="center"
          >
            <Text
              margin={{
                base: `${pxToRem(40)} auto 0`,
                md: "auto",
              }}
              fontWeight="bold"
              fontSize={{
                base: pxToRem(50),
                md: pxToRem(80),
                lg: pxToRem(110),
              }}
              maxW={{
                base: "100%",
                md: pxToRem(210),
                lg: pxToRem(259),
              }}
              lineHeight={1.05}
              letterSpacing={{
                base: pxToRem(5),
                lg: pxToRem(9.6),
              }}
              textTransform="uppercase"
              zIndex={999}
            >
              Calibração
            </Text>
          </Box>

          <Flex
            flex={1}
            alignItems={{
              base: "center",
              md: "initial",
            }}
            flexDirection="column"
            padding={`0 ${pxToRem(15)}`}
          >
            <ProductCategoryWithIcon
              title="Controladores de Temperatura e Processos"
              icon={Pirometro}
              containerProps={{
                borderColor: "red.600",
                marginTop: 10,
                width: "100%",
              }}
            />

            <Text
              mt="27px"
              mb="41px"
              fontSize={pxToRem(20)}
              maxW={pxToRem(791)}
              textAlign={{
                base: "center",
                md: "initial",
              }}
            >
              Nossos laboratórios possuem equipamentos e padrões que garantem a
              qualidade e confiabilidade das medições. Podem ser realizadas na
              Contemp ou em sua empresa. Nossas calibrações são efetuadas com
              símbolo de acreditação – RBC e rastreabilidade ao Inmetro.
            </Text>

            <Button
              border="2px solid white"
              borderRadius="25px"
              width="157px"
              height="50px"
              mr="15px"
              bg="transparent"
              _hover={{
                bg: "white",
                color: "black.800",
                transition: "all 0.4s",
              }}
            >
              Veja mais
            </Button>
          </Flex>
        </Flex>
      </Container>
      <GridChakra
        templateColumns={{
          base: "1fr",
          md: `repeat(2, minmax(${pxToRem(300)}, 1fr))`,
        }}
      >
        <DescriptionProduct
          color="white"
          bg="black.800"
          borderColor="white"
          borderColorButton="white"
          dataTab={tab6}
        />
        <DescriptionProduct
          color="black.800"
          bg="white"
          borderColor="red.600"
          borderColorButton="black.800"
          dataTab={tab7}
        />
      </GridChakra>
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="center"
        h="200px"
        bg="white"
      >
        <Button
          bg="red.600"
          borderRadius="25px"
          w="263px"
          h="50px"
          _hover={{
            transition: "all 0.4s",
            opacity: 0.7,
          }}
          onClick={() => router.push('allProduct')}
        >
          Veja todos os produtos
        </Button>
      </Flex>

      <Player />

      <Flex
        w="100%"
        alignItems="center"
        justifyContent="center"
        p={`${pxToRem(70)} ${pxToRem(20)}`}
        bg="white.500"
        flexDirection={{
          base: "column",
          md: "row",
        }}
      >
        <Flex
          alignItems="flex-end"
          textAlign="end"
          maxW={pxToRem(693)}
          flexDirection="column"
        >
          <Text
            color="red.600"
            fontWeight="bold"
            mb="18px"
            fontSize={{
              base: pxToRem(30),
              md: pxToRem(45),
            }}
            textAlign={{
              base: "center",
              md: "right",
            }}
          >
            ATENDEMOS O BRASIL E A AMÉRICA LATINA
          </Text>
          <Text
            fontSize={{
              base: pxToRem(17),
              md: pxToRem(24),
            }}
            color="black.800"
            mb="104px"
            maxW="425px"
          >
            Temos uma equipe de vendedores-técnicos de prontidão para te
            atender.
          </Text>

          <Flex
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            w="100%"
            maxW={pxToRem(400)}
            h={{
              base: 120,
            }}
            flexDirection={{
              base: "column",
              md: "row",
            }}
          >
            <Button
              width={{
                base: pxToRem(279),
                md: pxToRem(179),
              }}
              h="50px"
              borderRadius="25px"
              bg="red.600"
              fontSize={pxToRem(20)}
              _hover={{ transition: "all 0.5s", opacity: 0.7 }}
            >
              <Icon as={BiPhone} mr="10px" />
              Telefonar
            </Button>

            <Button
              width={{
                base: pxToRem(279),
                md: pxToRem(179),
              }}
              h="50px"
              borderRadius="25px"
              bg="red.600"
              fontSize={pxToRem(20)}
              _hover={{ transition: "all 0.5s", opacity: 0.7 }}
            >
              <Icon as={AiOutlineMail} mr="10px" />
              Enviar e-mail
            </Button>
          </Flex>
        </Flex>

        <Box
          w="100%"
          maxW={pxToRem(513)}
          ml={{
            base: 0,
            md: pxToRem(50),
            lg: pxToRem(180),
          }}
        >
          <Image src={Mapa} minH={500} bgSize="100%" />
        </Box>
      </Flex>
      <Flex w="100%" p="80px 0" bg="white">
        <GridChakra
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(3, 1fr)",
          ]}
          w="100%"
        >
          <CardBlog
            bg="red.600"
            color="white"
            title="Termopar, onde utilizar ?"
            text="Termopar termopares, são sensores de temperatura composto por
            dois elementos."
            img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
          />
          <CardBlog
            bg="white.500"
            color="black.800"
            title="Termopar, onde utilizar ?"
            text="Termopar termopares, são sensores de temperatura composto por
            dois elementos."
            img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
          />
          <CardBlog
            bg="black.800"
            color="white"
            title="Termopar, onde utilizar ?"
            text="Termopar termopares, são sensores de temperatura composto por
            dois elementos."
            img="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
          />
        </GridChakra>
      </Flex>
      <Catalog />
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
    </SmoothScroll>
  );
};

export default Home;
