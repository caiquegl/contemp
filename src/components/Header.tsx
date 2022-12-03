import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Link,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Image } from "./Image";
import React, { useEffect, useState } from "react";
import Phone from "../assets/icons/phone.svg";
import Email from "../assets/icons/envelope.svg";
import Linkedin from "../assets/icons/linkedin.svg";
import Instagram from "../assets/icons/instagram.svg";
import Facebook from "../assets/icons/facebook-f.svg";
import Youtube from "../assets/icons/youtube.svg";
import Logo from "../assets/icons/logo.png";
import Bag from "../assets/icons/shopping-bag.svg";
import ImageNext from "next/image";
import { useSidebarDrawer } from "../contexts/SidebarDrawerContexts";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import {
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineInstagram,
} from "react-icons/ai";
import { AuthProvider, useAuth } from "../contextAuth/authContext";
import { FaFacebookF } from "react-icons/fa";
import { SearchBar } from "./SearchBar";
import { pxToRem } from "../utils/pxToRem";
import { HeaderMenu, HeaderMenuVertical } from "./HeaderMenu";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { database, initFirebase } from "../utils/db";
import { useRouter } from "next/router";

export const Header = () => {
  initFirebase();
  const router = useRouter();
  // const { isOpen, onClose, onOpen } = useSidebarDrawer();
  const { setListHeader, cart, isOpen, onClose, onOpen } = useAuth();
  const [list, setList] = useState([]);

  const isDrawerSiderbar = useBreakpointValue({
    base: true,
    lg: false,
  });

  const listCategory = async () => {
    try {
      const dbInstance = collection(database, "categories");
      const { docs: allCategories } = await getDocs(dbInstance)


      const q = query(dbInstance, where("is_main", "==", "true"));
      let { docs: categories } = await getDocs(q);

      let newList: any = [];

      for await (let categ of categories) {
        let list_sub_category: any = [];

        allCategories.forEach((el) => {
          if (el.data().sub_categorie == categ.id)
            list_sub_category.push({ ...el.data(), id: el.id });
        });

        let filter: any = [];

        list_sub_category.forEach((el: any) => {
          let list_sub_category2: any = [];

          allCategories.forEach((c) => {
            if (c.data().sub_categorie == el.id)
              list_sub_category2.push({ ...c.data(), id: c.id });
          });
          filter.push({ ...el, list_sub_category: list_sub_category2 });
        });

        newList.push({
          ...categ.data(),
          id: categ.id,
          list_sub_category: filter,
        });
      }
      setList(newList);
      setListHeader(newList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listCategory();
  }, []);

  if (isDrawerSiderbar) {
    return (
      <Flex
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        h={pxToRem(70)}
        padding={`0 ${pxToRem(10)}`}
      >
        <Link href="/">
          <Image src={Logo} width={160} height={41} bgSize="contain" />
        </Link>

        <HStack spacing="27px">
          <Image
            src={Bag}
            width={30}
            height={30}
            bgSize="contain"
            flex="auto"
          />

          <Flex
            borderRadius="5px"
            w="40px"
            h="40px"
            alignItems="center"
            justifyContent="center"
            bg="red.600"
            color="white"
            cursor="pointer"
            onClick={onOpen}
            _hover={{
              transition: "all 0.4s",
              opacity: 0.6,
            }}
          >
            <Icon as={BsThreeDotsVertical} fontSize="20px" />
          </Flex>
        </HStack>

        <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="md">
          <DrawerOverlay />
          <DrawerContent bg="black.900" p="12px">
            <DrawerHeader>
              <Flex
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Link href="/">
                  <ImageNext src={Logo} width={120} height={41} />
                </Link>
                <Flex
                  borderRadius="5px"
                  w="40px"
                  h="40px"
                  alignItems="center"
                  justifyContent="center"
                  bg="red.600"
                  color="white"
                  cursor="pointer"
                  onClick={onClose}
                  _hover={{
                    transition: "all 0.4s",
                    opacity: 0.6,
                  }}
                >
                  <Icon as={AiOutlineClose} fontSize="20px" />
                </Flex>
              </Flex>
              <Divider bg="white" mt="10px" />
            </DrawerHeader>

            <DrawerBody>
              <Box mb="60px">
                <HeaderMenuVertical menuItems={list} />
              </Box>
              <Box>
                <Text m="22px 0" fontSize="20px" fontWeight="bold">
                  Institucional
                </Text>
                <Link href="/sobre">
                  <Text mb="15px" fontSize="18px">
                    A Contemp
                  </Text>
                </Link>
                <Text mb="15px" fontSize="18px">
                  Blog
                </Text>
                <Link href="/suporte">
                  <Text mb="15px" fontSize="18px">
                    Contato
                  </Text>
                </Link>
                <Link href="/work">
                  <Text mb="15px" fontSize="18px">
                    Trabalhe Conosco
                  </Text>
                </Link>
                <Text mb="15px" fontSize="18px">
                  Política de Privacidade
                </Text>
              </Box>
            </DrawerBody>

            <DrawerFooter>
              <HStack justifyContent="center" w="100%">
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  w="50px"
                  h="50px"
                  borderRadius="full"
                  bg="white.500"
                >
                  <Icon as={AiFillLinkedin} fontSize="35px" color="black.200" />
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  w="50px"
                  h="50px"
                  borderRadius="full"
                  bg="white.500"
                >
                  <Icon as={AiFillYoutube} fontSize="35px" color="black.200" />
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  w="50px"
                  h="50px"
                  borderRadius="full"
                  bg="white.500"
                >
                  <Icon
                    as={AiOutlineInstagram}
                    fontSize="35px"
                    color="black.200"
                  />
                </Flex>
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  w="50px"
                  h="50px"
                  borderRadius="full"
                  bg="white.500"
                >
                  <Icon as={FaFacebookF} fontSize="35px" color="black.200" />
                </Flex>
              </HStack>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
    );
  }

  return (
    <Container maxW="7xl" p="12px 15px 31px 15px">
      <Flex
        alignItems="center"
        justifyContent="space-evenly"
        marginBottom="32px"
      >
        <Box display="flex" flex={1}>
          <Flex alignItems="center" w="max-content" mr={3}>
            <Image src={Phone} minWidth={5} minHeight={15} bgSize={20} />

            <Text fontSize="18px" color="white" ml={pxToRem(10)}>
              (11) 4223-5140
            </Text>
          </Flex>

          <Flex alignItems="center">
            <Image src={Email} width={20} minHeight={15} flex={0.3} />
            <Text fontSize="18px" color="white" ml={pxToRem(10)}>
              vendas@contemp.com.br
            </Text>
          </Flex>
        </Box>

        <HStack>
          <Link href="https://www.linkedin.com/company/contemp/" isExternal>
            <Box
              w="28px"
              h="28px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image src={Linkedin} width={20} height={20} />
            </Box>
          </Link>
          <Link
            href="https://www.youtube.com/channel/UC3zq85OUOJLysT-4c_NmDNQ"
            isExternal
          >
            <Box
              w="28px"
              h="28px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image src={Youtube} width={20} height={20} />
            </Box>
          </Link>
          <Link href="https://www.instagram.com/contemp.industria/" isExternal>
            <Box
              w="28px"
              h="28px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image src={Instagram} width={20} height={20} />
            </Box>
          </Link>
          <Link
            href="https://www.facebook.com/Contemp-1001000803330302/"
            isExternal
          >
            <Box
              w="28px"
              h="28px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image src={Facebook} width={20} height={20} />
            </Box>
          </Link>
        </HStack>
      </Flex>

      <Flex alignItems="center" justifyContent="space-between" h={70} mb="30px">
        <Box
          onClick={() => router.push("/")}
          cursor="pointer"
          height={41}
          mr="20px"
        >
          <ImageNext width={160} height={41} src={Logo} />
        </Box>

        <Box flex={1}>
          <Link href="/todosProdutos">
            <Button
              borderRadius="5px"
              bg="red.600"
              _hover={{
                bg: "red.600",
                opacity: 0.6,
              }}
            >
              Todos os produtos
              <Icon
                as={BsThreeDotsVertical}
                ml="10px"
                color="white"
                fontSize="20px"
              />
            </Button>
          </Link>
        </Box>

        <HStack alignSelf="center" flex={1} spacing="10px">
          <Link
            href="/sobre"
            _hover={{
              textDecoration: "none",
              color: "red.600",
            }}
          >
            <Text w="max-content">A Contempp</Text>
          </Link>
          <Text>Blog</Text>
          <Link
            _hover={{
              textDecoration: "none",
              color: "red.600",
            }}
            href="/work"
          >
            <Text w="max-content">Trabalhe Conosco</Text>
          </Link>
          <Link
            _hover={{
              textDecoration: "none",
              color: "red.600",
            }}
            href="/suporte"
          >
            <Text w="max-content">Suporte Técnico</Text>
          </Link>
        </HStack>

        <Flex alignItems="center">
          <SearchBar
            containerProps={{
              w: pxToRem(191),
              h: pxToRem(42),
              marginRight: 5,
            }}
          />

          <Box
            position="relative"
            cursor="pointer"
            onClick={() => router.push("orcamento")}
          >
            {cart.length > 0 && (
              <Flex
                p={`${pxToRem(2)} ${pxToRem(5)}`}
                bg="red.600"
                borderRadius={50}
                alignItems="center"
                justifyContent="center"
                fontWeight="bold"
                fontSize={pxToRem(14)}
                position="absolute"
                bottom={4}
                left={4}
              >
                {cart.length}
              </Flex>
            )}
            <Image src={Bag} w={30} minHeight={30} bgSize={30} flex={1} />
          </Box>
        </Flex>
      </Flex>

      <HeaderMenu menuItems={list} />
    </Container>
  );
};
