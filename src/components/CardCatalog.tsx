import { Box, Button, Flex, GridItem, Image, Link, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { pxToRem } from '../utils/pxToRem'
import { v4 as uuidv4 } from 'uuid'
import ImageNext from 'next/image';
import DefaultImg from '../assets/images/image-default.webp'

interface IProps {
  bg: string
  text: string
  title: string
  color: string
  img?: string
  urlPicture: string
}
const CardCatalog = ({ bg, text, title, color, img, urlPicture }: IProps) => {
  const router = useRouter()

  return (
    <GridItem w={'100%'} bg={bg} borderRadius='8px' p='27px 17px'>
      <Flex h='100%' justifyContent='space-between' flexDirection='column'>
        <Box>
          <Box mb="20px">
            <ImageNext
              src={urlPicture ? urlPicture : DefaultImg}
              alt="Imagem"
              width={500}
              height={500}
              layout="responsive"
            />
          </Box>
          <Box mb={pxToRem(15)}>
            {!img ? (
              <Box w='41px' h='41px' borderRadius='5px' bg={color} mb={pxToRem(10)} />
            ) : (
              <Box w='41px' h='41px' borderRadius='5px'>
                <Image src={img} alt={title} />
              </Box>
            )}
            <Text color={color} fontSize={pxToRem(30)} lineHeight={1.2} fontWeight='bold'>
              {title}
            </Text>
          </Box>

          <Text color={color} fontSize='20px' mt='20px'>
            {text &&
              text.split('').length > 0 &&
              text
                .split('')
                .map((el: any, index: number) => <Fragment key={uuidv4()}>{index < 300 ? el : ''}</Fragment>)}
            {text && text.split('').length > 300 ? '...' : ''}
          </Text>
        </Box>

        <Flex w='100%' alignItems='center' justifyContent='center' mt='20px'>
          <Link
            href={`/category/${title.replaceAll(' ', '_')}#viewCategory`}
            textDecoration='none'
            _hover={{
              textDecoration: 'none',
            }}
          >
            <Button
              color={color}
              border='2px solid'
              borderColor={color}
              borderRadius='25px'
              w='100%'
              maxW='243px'
              h='50px'
              bg={bg}
              fontSize='20px'
              _hover={{
                bg: color,
                color: bg,
                transition: 'all 0.3s',
              }}
            >
              Ver produtos
            </Button>
          </Link>
        </Flex>
      </Flex>
    </GridItem>
  )
}

export default CardCatalog
