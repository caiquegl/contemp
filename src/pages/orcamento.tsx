import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  Button,
  Icon,
  VStack,
  useToast,
  HStack,
  Checkbox,
  Divider,
  Link,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import Mapa from "../assets/images/MAPA.png";
import { Footer } from "../components/Footer";
import { BiPhone } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { Image } from '../components/Image'
import { pxToRem } from "../utils/pxToRem";
import { SmoothScroll } from "../components/SmoothScroll";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { InputDefault } from "../components/Form/inputOrcamento";
import { TextareaDefault } from "../components/Form/TextareaOrcamento";
import CardProductCart from "../components/CardProductCart";
import { addDoc, collection } from "firebase/firestore";
import { database, initFirebase } from "../utils/db";
import { useAuth } from "../contextAuth/authContext";

const Orcamento = () => {
  initFirebase();
  const toast = useToast();
  const formRef = useRef<any>();
  const { clearCart, removeCart } = useAuth()
  const [loading, setLoading] = useState(false)
  const [isAprove, setIsAprove] = useState(false)
  const [cart, setCart] = useState<any>([])
  const [product, setProduct] = useState<any>([])
  const { register, handleSubmit, formState, reset } = useForm(
    {}
  );

  const { errors } = formState;

  const saveCart = async (bodyForm: any) => {
    try {
      bodyForm = { ...bodyForm, isAprove };

      setLoading(true);

      const dbInstance = collection(database, "orcamento");

      console.log(bodyForm)
      await addDoc(dbInstance, bodyForm);

      toast({
        title: "Sucesso",
        description: "Orçamento solicitado com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      await fetch(`${process.env.NEXT_PUBLIC_URL}api/mail`, {
        method: 'POST',
        body: JSON.stringify({ ...bodyForm, product: product })
      });
      // reset();
      // window.localStorage.removeItem('CART-CONTEMP')
      // clearCart()
    } catch (error) {
      console.log(error)
      toast({
        title: "Erro",
        description: "Erro ao salvar categoria",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItem()
  }, []);

  const getItem = () => {
    let getItem = window.localStorage.getItem('CART-CONTEMP')

    if (getItem) {
      let convert = JSON.parse(getItem)
      setCart(convert)
      setProduct(convert)
    }
  }
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
          Solicitar Orçamento
        </Text>
        <Text
          fontSize={"20px"}
          fontWeight="bold"
          textAlign="center"
          maxW="1037px"
          p={["0 20px", "0 20px", "0 20px", "0 20px", "0"]}
        >
          Peça seu orçamento de forma facilitada. Basta adicionar ou excluir os produtos que precisa, preencher seus dados de contato no formulário abaixo e pronto. Um dos especialistas da Contemp irá entrar em contato para passar valores e mais informações.
        </Text>
      </Flex>

      <Flex
        w="100%"
        justifyContent="center"
        bg="white"
        color="black.800"
        padding="80px 0"
        flexDirection={{
          base: "column",
          md: "row",
        }}
      >
        <Box
          bg="white.500"
          borderRadius="8px"
          p="30px"
          w={{
            base: 'row',
            md: "861px"
          }}
        >
          <Text
            fontSize="30px"
            fontWeight="bold"
          >
            Dados para Contato
          </Text>
          <Text
            fontSize="20px"
            margin="20px 0 40px 0"
          >
            Para enviar sua solicitação basta conferir os produtos do carrinho e preencher o formulário e logo você será notificado por e-mail do recebimento.
          </Text>

          <Box
            as="form"
            onSubmit={handleSubmit(saveCart)}
            ref={formRef}
          >
            <VStack spacing="20px" w="100%">
              <HStack spacing={[0, "20px"]} w="100%" flexDirection={['column', 'row']}>
                <InputDefault
                  label="Nome"
                  type="text"
                  error={errors.name}
                  {...register("name", { required: "Nome é obrigatório" })}
                />
                <InputDefault
                  label="Sobrenome"
                  type="text"
                  error={errors.lastName}
                  {...register("lastName", { required: "Sobrenome é obrigatório" })}
                />
              </HStack>
              <InputDefault
                label="E-mail"
                type="text"
                error={errors.email}
                {...register("email", { required: "Email é obrigatório" })}
              />

              <InputDefault
                label="Telefone"
                type="text"
                error={errors.telephone}
                {...register("telephone", { required: "Telefone é obrigatório" })}
              />
              <TextareaDefault
                label="Observaçao"
                error={errors.description}
                {...register("description")}
              />

              <Box w="100%" pt={["30px", 0]}>
                <Checkbox
                  colorScheme="red"
                  color="black.800"
                  mr="auto"
                  fontSize="20px"
                  height="17px"
                  isChecked={isAprove}
                  onChange={(evt) => setIsAprove(evt.target.checked)}
                >
                  Eu aceito que e a Contemp entre em contato comigo pelos canais de contato preenchidos nesse formulário.
                </Checkbox>
              </Box>
            </VStack>
            <Flex
              alignItems="center"
              justifyContent="flex-end"
              mt="53px"
              w="100%"
            >
              <Button
                ml="auto"
                bg="red.600"
                color="white"
                fontSize="20px"
                borderRadius="4px"
                h="47px"
                isLoading={loading}
                _hover={{ transition: "all 0.4s", opacity: 0.7 }}
                type="submit"
              >
                Solicitar orçamento
              </Button>
            </Flex>
          </Box>
        </Box>

        <Box
          w="100%"
          h="100%"
          maxW={pxToRem(495)}
          bg="white.500"
          borderRadius="8px"
          padding="30px"
          ml={{
            base: 0,
            md: pxToRem(30),
          }}
        >
          <Text fontSize="30px" fontWeight="bold">Produtos selecionados</Text>
          <VStack spacing="20px" divider={<Divider />}>
            {
              cart && cart.length > 0 && cart.map((product: any, index: number) => (
                <CardProductCart
                  data={product}
                  changeQtd={(value: any) => {
                    let newList = cart
                    newList[index].qtd = parseFloat(value)
                    setCart([...newList])
                  }}
                  removeCart={() => {
                    removeCart(cart, index)
                    getItem()
                  }}

                  getItem={(pd: any) => {
                    let newList = cart
                    newList[index] = { ...newList[index], ...pd }
                    setProduct(newList)
                  }}
                />
              ))
            }
          </VStack>
        </Box>
      </Flex>
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
            <Link href="tel:1142235140" _hover={{ textDecoration: 'none', color: '#fff' }}>
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
            </Link>
            <Link href="mailto:vendas@contemp.com.br" _hover={{ textDecoration: 'none', color: '#fff' }}>
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
            </Link>
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

export default Orcamento;
