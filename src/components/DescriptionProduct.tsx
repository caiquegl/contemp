import { Box, Button, Center, Flex, FlexProps, Link, Text } from '@chakra-ui/react'
import { Image } from '../components/Image'
import { pxToRem } from '../utils/pxToRem'
import { ProductCategoryWithIcon } from './ProductCategoryWithIcon'
import { useRouter } from 'next/router'

type DataTabProps = {
  category: string
  description: string
  destaque: boolean
  icon: string
  indexProduct: number
  link_name: string
  name: string
  nameCategory: string
  urls: string[]
}

interface IProps {
  bg: string
  borderColor: string
  borderColorButton: string
  color: string
  colorHoverButton: string
  bgHoverButton: string
  colorButton: string
  bgButton: string
  containerProps?: FlexProps
  dataTab?: any
}

const DescriptionProduct = ({
  bg,
  borderColor,
  color,
  colorHoverButton,
  bgHoverButton,
  colorButton,
  bgButton,
  borderColorButton,
  containerProps,
  dataTab,
}: IProps) => {
  const router = useRouter()

  if (!dataTab || Object.keys(dataTab).length === 0) return <Box />

  return (
    <Flex w='100%' alignItems='center' justifyContent='center' bg={bg} color={color}>
      <Flex
        direction={{
          base: 'column',
          xl: 'row',
        }}
        alignItems='center'
        justifyContent='space-between'
        h='100%'
        w='95%'
        padding={`${pxToRem(15)}`}
        {...containerProps}
      >
        <Center
          h='100%'
          w={{
            base: '55%',
            md: '45%',
            lg: '45%',
            xl: '55%',
          }}
        >
          <Image
            src={dataTab?.urls ? dataTab.urls[0] : ''}
            alt={dataTab?.name}
            // flex={1}
            zIndex={30}
            minH='auto'
            w={{
              base: '55%',
              md: '45%',
              lg: '45%',
              xl: '55%',
            }}
            onClick={() => router.replace(dataTab.link_name)}
            cursor='pointer'
          />
        </Center>

        <Flex flexDirection='column' alignItems='initial' flex={1.07}>
          <Text
            className='home-produto-titulo'
            textTransform='uppercase'
          >
            {dataTab?.name}
          </Text>

          <ProductCategoryWithIcon
            title={dataTab?.category.name}
            icon={dataTab?.icon}
            containerProps={{
              bg,
              color,
              borderColor,
              margin: `${pxToRem(10)} 0`,
            }}
          />

          <Text className='home-produto-descricao' w='100%' margin={`${pxToRem(10)} 0`} zIndex={90} bg={bg}>
            {dataTab?.description}
          </Text>

          <Flex w='75%' maxW={pxToRem(220)} alignItems='center'>
            <Link
              href={dataTab.link_name}
              _hover={{ color: 'black', textDecoration: 'none' }}
              w='100%'
              maxW={pxToRem(157)}
            >
              <Button
                borderRadius='25px'
                border='2px solid'
                borderColor={borderColorButton}
                color={borderColorButton}
                // bg={bgButton}
                bg='transparent'
                m={`${pxToRem(20)} 0`}
                // maxW={pxToRem(157)}
                width='157px'
                height='50px'
                // h={pxToRem(50)}
                flex={6}
                _hover={{
                  bg: bgButton,
                  color: bgHoverButton,
                  transition: 'all 0.3s',
                }}
              >
                Veja mais
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DescriptionProduct
