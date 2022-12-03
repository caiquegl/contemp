import { Box, Flex, HStack, Icon, Input, Link, Text, VStack } from "@chakra-ui/react";
import { collection, doc, getDoc } from "firebase/firestore";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { database, initFirebase } from "../utils/db";
import { pxToRem } from "../utils/pxToRem";
import { Image } from './Image'


const CardProductCart = ({ data, changeQtd, removeCart }: any) => {
  initFirebase();
  const [products, setProduct] = useState<any>({})

  const getProduct = async () => {
    const docRef = doc(database, 'products', data.product_id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProduct({...docSnap.data(), qtd: data.qtd})
    }
  }

  const getHome = async () => {
    const docRef = doc(database, 'home', data.product_id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProduct({...docSnap.data(), qtd: data.td})
    }
  }

  useEffect(() => {
    getProduct()
    getHome()
  }, [data])
  return (
    <Flex
      alignItems="center"
      width="100%"
    >
      <Box
        display="flex"
        alignItems="center"
        borderRadius="8px"
        border="none"
        w={pxToRem(118)}
        h={pxToRem(118)}
        bg="none"
      >
        <Image src={products.urls && products.urls.length > 0 ? products.urls[0] : ''} alt={products.name} />
      </Box>
      <Box ml="10px" w="calc(100% - 118px)">
        <Text
          fontSize="20px"
          fontWeight="bold"
          color="black"
          textTransform="uppercase"
        >
          {products.name}
        </Text>
        {data.variation && Object.keys(data.variation).length > 0 && Object.keys(data.variation).map((key: any) => (
          <VStack spacing="10px">
            <Text
              fontSize="19px"
              color="black.800"
              textTransform="uppercase"
            >
              {key}:
            </Text>
            <Text
              fontSize="19px"
              color="black.800"
              textTransform="uppercase"
            >
              {data.variation[key]}
            </Text>
          </VStack>
        ))}
        <Flex alignItems="center" justifyContent="space-between">
          <Icon as={AiFillDelete} fontSize="20px" cursor="pointer" onClick={() => removeCart()} />
          <HStack>
          <Text
              fontSize="19px"
              color="black.800"
              fontWeight="bold"
            >
              Quantidade:
            </Text>
            <Input type="number" value={data.qtd} borderWidth="2px" borderRadius="20px" maxW="80px" onChange={(evt) => changeQtd(evt.target.value)}/>
          </HStack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CardProductCart;