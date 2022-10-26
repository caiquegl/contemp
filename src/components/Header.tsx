import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import Phone from "../assets/icons/phone.svg";
import Email from "../assets/icons/envelope.svg";
import Linkedin from "../assets/icons/linkedin.svg";
import Instagram from "../assets/icons/instagram.svg";
import Facebook from "../assets/icons/facebook-f.svg";
import Youtube from "../assets/icons/youtube.svg";
import Logo from "../assets/icons/logo.png";
import Potenci from "../assets/icons/potencia.png";
import Camera from "../assets/icons/cameras.png";
import DeNovo from "../assets/icons/de-novo.png";
import Ultimo from "../assets/icons/ultimo.png";
import Bag from "../assets/icons/shopping-bag.svg";
import Controls from "../assets/icons/Controladores.png";
import Pirometro from "../assets/icons/Pirometro-certo.png";
import Search from "../assets/icons/search.svg";

export const Header = () => {
  return (
    <Container maxW="7xl" p="12px 0 31px">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        marginBottom="32px"
      >
        <Box display="flex">
          <Flex>
            <Image src={Phone} width={20} height={20} />
            <Text fontSize="18px" color="white" ml="10px">
              (11) 4223-5140
            </Text>
          </Flex>
          <Flex ml="30px">
            <Image src={Email} width={20} height={20} />
            <Text fontSize="18px" color="white" ml="10px">
              vendas@contemp.com.br
            </Text>
          </Flex>
        </Box>

        <HStack
          divider={<Box borderRadius="full" bg="white" w="5px" h="5px" />}
        >
          <Link href="/about">
            <Text>A Contemp</Text>
          </Link>
          <Text>Blog</Text>
          <Link href="/work">
            <Text>Trabalhe Conosco</Text>
          </Link>
          <Link href="/support">
            <Text>Suporte Técnico</Text>
          </Link>
        </HStack>
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
      <Flex alignItems="center" justifyContent="space-between">
        <Link href="/">
          <Image src={Logo} width={160} height={41} />
        </Link>
        <Link href="/allProduct">
          <Button
            borderRadius="5px"
            bg="red.600"
            _hover={{
              bg: "red.600",
              opacity: 0.6,
            }}
          >
            Todos os produtos
          </Button>
        </Link>
        <HStack>
          <Box
            w="50px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={Controls} width={41} height={41} />
          </Box>
          <Box
            w="50px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={Potenci} width={41} height={41} />
          </Box>
          <Box
            w="50px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={Camera} width={41} height={41} />
          </Box>
          <Box
            w="50px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={Pirometro} width={41} height={41} />
          </Box>
          <Box
            w="50px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={DeNovo} width={41} height={41} />
          </Box>
          <Box
            w="50px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image src={Ultimo} width={41} height={41} />
          </Box>
        </HStack>
        <InputGroup
          borderRadius="21px"
          bg="black.200"
          p="3px 7px"
          w="191px"
          h="42px"
        >
          <Input w="100%" height="100%" border="none" borderRadius="21px" />
          <InputRightElement
            children={<Image src={Search} width="22px" height="22px" />}
          />
        </InputGroup>
        <Image src={Bag} width={30} height={30} />
      </Flex>
    </Container>
  );
};
