import {
  Button,
  Flex,
  FlexProps,
  Text,
} from "@chakra-ui/react";
import { Image } from "../components/Image";
import Pirometro from "../assets/icons/Pirometro-certo.png";
import { pxToRem } from "../utils/pxToRem";
import { ProductCategoryWithIcon } from "./ProductCategoryWithIcon";

interface IProps {
  bg: string;
  borderColor: string;
  borderColorButton: string;
  color: string;
  containerProps?: FlexProps
}
const DescriptionProduct = ({
  bg,
  borderColor,
  color,
  borderColorButton,
  containerProps
}: IProps) => {
  return (
    <Flex
      w="100%"
      minH={pxToRem(630)}
      alignItems="center"
      justifyContent="center"
      bg={bg}
      color={color}
      margin="auto"
    >
      <Flex
        direction={{
          base: 'column',
          xl: 'row'
        }}
        alignItems="center"
        justifyContent="space-between"
        h="100%"
        w="95%"
        {...containerProps}
      >
        <Image
          src={"https://www.fenixbaterias.com.br/wp-content/uploads/2020/04/bateria-automotiva-america-2-495x400.png"}
          alt="bateria"
          flex={1}
          minH={pxToRem(300)}
          bgSize={{
            base: '70%',
            md: '90%',
            lg: '70%',
            xl: '85%',
            '2xl': '70%'
          }}
        />

        <Flex
          flexDirection="column"
          alignItems="initial"
          flex={1.3}
          paddingLeft={3}
          mb={5}
        >
          <Text
            fontWeight="bold"
            textTransform="uppercase"
            fontSize={{
              base: pxToRem(30),
              lg: pxToRem(35),
              xl: pxToRem(40),
            }}
          >
            Nome do produto
          </Text>

          <ProductCategoryWithIcon
            title="Controladores de Temperatura e Processos"
            icon={Pirometro}
            containerProps={{
              bg,
              color,
              borderColor,
              margin: `${pxToRem(10)} 0`
            }}
          />

          <Text
            fontSize={pxToRem(20)}
            w="100%"
            margin={`${pxToRem(10)} 0`}
          >
            Desenvolvido para monitorar, controlar e registrar potência,
            corrente e tensão de cargas resistivas e transformadores-monofásicos
            e trifásicos.
          </Text>

          <Flex w="75%" maxW={pxToRem(220)} alignItems="center">
            <Button
              borderRadius="25px"
              border="2px solid"
              borderColor={borderColorButton}
              bg="transparent"
              m={`${pxToRem(20)} 0`}
              maxW={pxToRem(157)}
              h={pxToRem(50)}
              flex={6}
              _hover={{
                bg: color,
                color: bg,
                transition: "all 0.3s",
              }}
            >
              Veja mais
            </Button>

            <Image
              src={Pirometro}
              bgSize={pxToRem(40)}
              minH={pxToRem(40)}
              filter={
                color ? color.includes('white') ? 'invert(0)' : 'invert(1)' : 'auto'
              }
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DescriptionProduct;
