import {
  Box,
  Container,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Contact } from "../../components/Contact";
import { Footer } from "../../components/Footer";
import { Player } from "../../components/Player";
import { Image } from '../../components/Image'
import { pxToRem } from "../../utils/pxToRem";
import { SmoothScroll } from "../../components/SmoothScroll";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { ListCategory } from "../../components/ListCategory";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { database, initFirebase } from "../../utils/db";

const products = [] as number[]

for (let i = 0; i < 56; i++) {
  products.push(i + 1)
}

const Category = () => {
  const router = useRouter()
  initFirebase();
  const { category } = router.query
  const [list, setList] = useState<any>([])

  const dividerList = (listProduct: any) => {
    let list: any = []

    let insert = 0
    let insertIndex = 0

    listProduct.forEach((pd: any) => {
      if (insert === 0) {
        list.push([])
      }

      list[insertIndex].push(pd)
      insert = insert + 1
      if (insert == 4) insert = 0
      if (insert === 0) {
        insertIndex = insertIndex + 1
      }
    })

    setList(list)

  }

  const getCategoryList = async () => {
    try {
      const dbInstanceCategory = collection(database, "categories");
      const dbInstanceProducts = collection(database, "products");
      const dbInstanceHome = collection(database, "home");
      const qCategory = query(dbInstanceCategory, where("name", "==", category), limit(1))
      let idCategory = ''

      await getDocs(qCategory).then(async (data) => {
        if (data.docs.length === 0) return
        idCategory = data.docs[0].id
      });

      let list: any = []
      const qProducts = query(dbInstanceProducts, where("category", "==", idCategory))
      await getDocs(qProducts).then(async (data) => {
        if (data.docs.length === 0) return

        data.docs.forEach((pd: any) => {
          list.push(pd.data())
        })
      });

      const qHome = query(dbInstanceHome, where("category", "==", idCategory))
      await getDocs(qHome).then(async (data) => {
        if (data.docs.length === 0) return
        data.docs.forEach((pd: any) => {
          list.push(pd.data())
        })
      });

      dividerList(list)
    } catch (error) {
      console.log(error)

    }
  }


  useEffect(() => {
    if (category) {
      getCategoryList()
    }

  }, [category])

  return (
    <SmoothScroll>
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
          {category}
        </Text>
      </Flex>
      {list && list.length > 0 && list.map((categ: any, index: number) => {
        index = index + 1
        let bg = "white"

        if (index % 2 == 0) bg = 'white.500'
        if (index % 3 == 0) bg = 'black.800'
        if (index % 4 == 0) bg = 'red.600'
        return (<ListCategory bg={bg} data={categ} />)
      })}
      <Flex
        w="100%"
        alignItems="center"
        p={["0 20px", "0 20px", "0 20px", "0 20px", "0"]}
        bg="white"
      >
        <Container maxW="7xl" p="80px 0">
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
    </SmoothScroll>
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

export default Category;