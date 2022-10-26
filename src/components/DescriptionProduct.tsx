import {
  Box,
  Button,
  Flex,
  HStack,
  Image as ImageChakra,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Pirometro from "../assets/icons/Pirometro-certo.png";

interface IProps {
  bg: string;
  borderColor: string;
  borderColorButton: string;
  color: string;
}
const DescriptionProduct = ({
  bg,
  borderColor,
  color,
  borderColorButton,
}: IProps) => {
  return (
    <Flex
      w="50%"
      minH="616px"
      alignItems="center"
      justifyContent="center"
      bg={bg}
      color={color}
    >
      <Flex
        direction={["column", "column", "column", "column", "row"]}
        alignItems="center"
        justifyContent="space-between"
      >
        <ImageChakra
          src="https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"
          alt="bateria"
          w="50%"
          maxW="451px"
          mr={["0px", "0px", "0px", "0px", "40px"]}
        />
        <Flex
          flexDirection="column"
          alignItems={["center", "center", "center", "center", "initial"]}
          pr={["0px", "0px", "0px", "0px", "40px"]}
        >
          <Text fontWeight="bold" fontSize="60px">
            P501
          </Text>
          <HStack
            p="10px 5px"
            border="2px solid"
            borderColor={borderColor}
            borderRadius="4px"
            spacing="5px"
            mb="27px"
            maxW="277px"
          >
            <Text fontSize="18px">
              Controladores de Temperatura e Processos
            </Text>
            <Box
              w="40px"
              h="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image src={Pirometro} width={41} height={41} />
            </Box>
          </HStack>
          <Text
            fontSize="20px"
            mb="41px"
            textAlign={["center", "center", "center", "center", "initial"]}
          >
            Desenvolvido para monitorar, controlar e registrar potência,
            corrente e tensão de cargas resistivas e transformadores-monofásicos
            e trifásicos.
          </Text>
          <Button
            borderRadius="25px"
            border="2px solid"
            borderColor={borderColorButton}
            bg="transparent"
            w="157px"
            h="50px"
            _hover={{
              bg: "red.600",
              transition: "all 0.4s",
            }}
          >
            Veja mais
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DescriptionProduct;
